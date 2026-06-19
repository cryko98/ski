import { BASE_IMAGE_DATA_URI } from "./baseImage";

// Each call is short now (submit OR one status check), so a small budget is plenty.
export const maxDuration = 30;
export const dynamic = "force-dynamic";

const MODEL = "fal-ai/flux-pro/kontext";
const QUEUE = `https://queue.fal.run/${MODEL}`;
const FAL_ORIGIN = "https://queue.fal.run/";

// The base image is ALWAYS the Ski Mask Dog logo. We only ever let the user
// restyle the ski mask on the dog's head — everything else is locked.
function buildPrompt(userPrompt) {
  const clean = userPrompt.replace(/\s+/g, " ").trim().slice(0, 320);
  return (
    "Edit only the knitted ski mask / balaclava that the dog is wearing on its head. " +
    `Restyle the ski mask like this: ${clean}. ` +
    "The mask must still be a ski mask / balaclava that covers the dog's head with eye holes. " +
    "Keep the exact same golden dog, the same face, fur, eyes, nose, pose and the same plain white background completely unchanged. " +
    "Do not change anything except the mask. Do not add text, logos, hats, accessories or other objects."
  );
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function authHeaders(key) {
  return { Authorization: `Key ${key}`, "Content-Type": "application/json" };
}

// Only ever fetch fal.ai queue URLs (we send our API key, so guard against SSRF).
function isFalUrl(u) {
  return typeof u === "string" && u.startsWith(FAL_ORIGIN);
}

// --- Step 1: submit the job, return the fal-provided status/result URLs ---
export async function POST(req) {
  const key = process.env.FLUX_API_KEY;
  if (!key) {
    return json(
      { error: "The generator is not configured yet. FLUX_API_KEY is missing on the server." },
      500
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  const userPrompt = (body?.prompt || "").toString().trim();
  if (!userPrompt) {
    return json({ error: "Describe the ski mask you want first." }, 400);
  }

  try {
    const submit = await fetch(QUEUE, {
      method: "POST",
      headers: authHeaders(key),
      body: JSON.stringify({
        prompt: buildPrompt(userPrompt),
        image_url: BASE_IMAGE_DATA_URI,
        guidance_scale: 3.5,
        num_images: 1,
        output_format: "png",
        safety_tolerance: "2",
      }),
    });

    if (!submit.ok) {
      const detail = await submit.text();
      return json(
        { error: "Could not start the generator. Check the API key.", detail: detail.slice(0, 300) },
        502
      );
    }

    const data = await submit.json();
    // Use the URLs fal gives us — they point at the correct app id, which is NOT
    // necessarily the full model path (e.g. flux-pro vs flux-pro/kontext).
    const statusUrl = data.status_url;
    const responseUrl = data.response_url;
    if (!statusUrl || !responseUrl) {
      return json({ error: "Unexpected response from the image service.", detail: JSON.stringify(data).slice(0, 300) }, 502);
    }
    return json({ statusUrl, responseUrl });
  } catch {
    return json({ error: "Something went wrong talking to the generator." }, 500);
  }
}

// --- Step 2: client polls with ?status=...&result=... until COMPLETED ---
export async function GET(req) {
  const key = process.env.FLUX_API_KEY;
  if (!key) return json({ error: "FLUX_API_KEY is missing on the server." }, 500);

  const params = new URL(req.url).searchParams;
  const statusUrl = params.get("status");
  const responseUrl = params.get("result");
  if (!isFalUrl(statusUrl) || !isFalUrl(responseUrl)) {
    return json({ error: "Bad request." }, 400);
  }

  try {
    const st = await fetch(statusUrl, { headers: authHeaders(key), cache: "no-store" });
    if (!st.ok) return json({ status: "IN_PROGRESS" });

    const stData = await st.json();
    const status = stData.status;

    if (status === "FAILED" || status === "ERROR") {
      return json({ status: "FAILED", error: "The mask swap failed. Try a different prompt." });
    }
    if (status !== "COMPLETED") {
      return json({ status: status || "IN_PROGRESS" });
    }

    // Completed — fetch the result image.
    const res = await fetch(responseUrl, { headers: authHeaders(key), cache: "no-store" });
    if (!res.ok) return json({ status: "IN_PROGRESS" });
    const data = await res.json();
    const imageUrl = data?.images?.[0]?.url;
    if (!imageUrl) return json({ status: "FAILED", error: "No image came back. Please try again." });

    return json({ status: "COMPLETED", imageUrl, seed: data.seed ?? null });
  } catch {
    return json({ status: "IN_PROGRESS" });
  }
}
