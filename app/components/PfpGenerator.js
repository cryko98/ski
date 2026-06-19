"use client";

import { useState } from "react";

const PRESETS = [
  "a bright red and white striped ski mask",
  "a neon cyan cyber ski mask with glowing trim",
  "a camo green tactical balaclava",
  "a gold and diamond-studded luxury ski mask",
  "a pink fluffy winter ski mask",
  "a Solana purple and green gradient ski mask",
  "a flaming orange ski mask with fire pattern",
  "a knitted ski mask with snowflake pattern",
];

export default function PfpGenerator() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("/logo.png");
  const [isResult, setIsResult] = useState(false);
  const [error, setError] = useState("");

  async function generate() {
    const p = prompt.trim();
    if (!p) {
      setError("Describe the ski mask you want first.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: p }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Generation failed. Try again.");
      } else {
        setImage(data.imageUrl);
        setIsResult(true);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function download() {
    // Open in a new tab so users can save the generated PFP.
    window.open(image, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="pfp">
      <div className="pfp-grid">
        <div>
          <div className="canvas">
            <span className="badge">{isResult ? "Your $SKI PFP" : "Base"}</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt="Ski Mask Dog PFP" />
            {loading && (
              <div className="overlay">
                <div className="spinner" />
                <div>
                  <strong>Swapping the mask…</strong>
                  <div style={{ color: "var(--muted)", fontSize: 14, marginTop: 4 }}>
                    This takes ~10–25 seconds.
                  </div>
                </div>
              </div>
            )}
          </div>
          {isResult && !loading && (
            <button
              className="btn btn-ghost"
              style={{ width: "100%", justifyContent: "center", marginTop: 14 }}
              onClick={download}
            >
              ⬇ Open / Save PFP
            </button>
          )}
        </div>

        <div>
          <label className="fld" htmlFor="prompt">
            Describe the new ski mask
          </label>
          <textarea
            id="prompt"
            placeholder="e.g. a glowing cyan cyber ski mask with neon trim"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            maxLength={320}
          />

          <div className="preset-row">
            {PRESETS.map((p) => (
              <button key={p} className="preset" onClick={() => setPrompt(p)} type="button">
                {p.replace(/^a /, "").replace(/ ski mask.*| balaclava.*/, "")}
              </button>
            ))}
          </div>

          <div className="gen-actions">
            <button className="btn btn-primary" onClick={generate} disabled={loading}>
              {loading ? "Masking up…" : "🎭 Generate PFP"}
            </button>
            {isResult && (
              <button
                className="btn btn-ghost"
                onClick={() => {
                  setImage("/logo.png");
                  setIsResult(false);
                  setError("");
                }}
                disabled={loading}
              >
                ↺ Reset
              </button>
            )}
          </div>

          {error && <div className="err">{error}</div>}

          <div className="disclaimer">
            <span>⚠️</span>
            <span>
              <strong>Mask swaps only.</strong> This generator can only restyle the ski
              mask on the dog&apos;s head. The dog, its face, fur and the background stay
              exactly the same — any other request is ignored.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
