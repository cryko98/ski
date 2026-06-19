import { BASE_IMAGE_DATA_URI } from "./baseImage";

// Each call is short now (submit OR one status check), so a small budget is plenty.
export const maxDuration = 30;
export const dynamic = "force-dynamic";

const MODEL = "fal-ai/flux-pro/kontext";
const QUEUE = `https://queue.fal.run/${MODEL}`;

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

// --- Step 1: submit the job, return a request id immediately ---
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
    if (!data.request_id) {
      return json({ error: "Unexpected response from the image service." }, 502);
    }
    return json({ requestId: data.request_id });
  } catch {
    return json({ error: "Something went wrong talking to the generator." }, 500);
  }
}

// --- Step 2: client polls this with ?id=... until COMPLETED ---
export async function GET(req) {
  const key = process.env.FLUX_API_KEY;
  if (!key) return json({ error: "FLUX_API_KEY is missing on the server." }, 500);

  const id = new URL(req.url).searchParams.get("id");
  if (!id) return json({ error: "Missing request id." }, 400);

  try {
    const st = await fetch(`${QUEUE}/requests/${id}/status`, {
      headers: authHeaders(key),
      cache: "no-store",
    });
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
    const res = await fetch(`${QUEUE}/requests/${id}`, {
      headers: authHeaders(key),
      cache: "no-store",
    });
    if (!res.ok) return json({ status: "IN_PROGRESS" });
    const data = await res.json();
    const imageUrl = data?.images?.[0]?.url;
    if (!imageUrl) return json({ status: "FAILED", error: "No image came back. Please try again." });

    return json({ status: "COMPLETED", imageUrl, seed: data.seed ?? null });
  } catch {
    return json({ status: "IN_PROGRESS" });
  }
}
