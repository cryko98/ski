export const dynamic = "force-dynamic";
export const maxDuration = 30;

// Proxy a generated fal.media image back as a forced download (same-origin, so
// the browser saves it directly with our filename — no CORS / new-tab issues).
export async function GET(req) {
  const url = new URL(req.url).searchParams.get("url");

  let host;
  try {
    host = new URL(url).hostname;
  } catch {
    return new Response("Bad request", { status: 400 });
  }
  // Only proxy fal.ai output images.
  if (!(host === "fal.media" || host.endsWith(".fal.media"))) {
    return new Response("Forbidden", { status: 403 });
  }

  try {
    const r = await fetch(url, { cache: "no-store" });
    if (!r.ok) return new Response("Upstream error", { status: 502 });

    const buf = await r.arrayBuffer();
    const ct = r.headers.get("content-type") || "image/png";
    const ext = ct.includes("jpeg") ? "jpg" : ct.includes("webp") ? "webp" : "png";

    return new Response(buf, {
      headers: {
        "Content-Type": ct,
        "Content-Disposition": `attachment; filename="ski-mask-dog-pfp.${ext}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return new Response("Download failed", { status: 500 });
  }
}
