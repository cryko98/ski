"use client";

import { MEMES } from "./memes";

export default function MemeMarquee() {
  // Duplicate the set so the CSS marquee loops seamlessly.
  const strip = [...MEMES, ...MEMES];
  return (
    <div className="marquee-band" aria-label="Ski Mask Dog meme strip">
      <div className="marquee-track">
        {strip.map((m, i) => (
          <figure className="meme-card" key={`${m.id}-${i}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={m.src} alt={`Ski Mask Dog — ${m.cap}`} loading="lazy" />
            <figcaption className="cap">{m.cap}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
