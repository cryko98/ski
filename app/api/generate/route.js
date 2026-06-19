import { BASE_IMAGE_DATA_URI } from "./baseImage";

// Allow up to 60s — FLUX Kontext usually finishes well within this window.
export const maxDuration = 60;
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

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

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

  const authHeaders = {
    Authorization: `Key ${key}`,
    "Content-Type": "application/json",
  };

  try {
    // 1) Submit to the queue.
    const submit = await fetch(QUEUE, {
      method: "POST",
      headers: authHeaders,
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
        { error: "Could not start the generator.", detail: detail.slice(0, 400) },
        502
      );
    }

    const submitData = await submit.json();
    const requestId = submitData.request_id;
    if (!requestId) {
      return json({ error: "Unexpected response from the image service." }, 502);
    }

    const statusUrl = `${QUEUE}/requests/${requestId}/status`;
    const resultUrl = `${QUEUE}/requests/${requestId}`;

    // 2) Poll until completed (cap ~55s).
    const deadline = Date.now() + 54_000;
    while (Date.now() < deadline) {
      await sleep(1500);
      const st = await fetch(statusUrl, { headers: authHeaders, cache: "no-store" });
      if (!st.ok) continue;
      const stData = await st.json();
      if (stData.status === "COMPLETED") break;
      if (stData.status === "FAILED" || stData.status === "ERROR") {
        return json({ error: "The mask swap failed. Try a different prompt." }, 502);
      }
    }

    // 3) Fetch the result.
    const res = await fetch(resultUrl, { headers: authHeaders, cache: "no-store" });
    if (!res.ok) {
      return json({ error: "Timed out while masking up. Please try again." }, 504);
    }
    const data = await res.json();
    const imageUrl = data?.images?.[0]?.url;
    if (!imageUrl) {
      return json({ error: "No image came back. Please try again." }, 502);
    }

    return json({ imageUrl, seed: data.seed ?? null });
  } catch (err) {
    return json({ error: "Something went wrong talking to the generator." }, 500);
  }
}
