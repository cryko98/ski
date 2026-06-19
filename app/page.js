"use client";

import { useState } from "react";
import PfpGenerator from "./components/PfpGenerator";
import MemeMarquee from "./components/MemeMarquee";
import MemoryGame from "./components/MemoryGame";

const CA = "H4chsqkobEKjjiAt7r3TLJvp7qprR6aasjJFtkQcAqun";
const X_URL = "https://x.com/i/communities/2004690431997514205";

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/* outline icons for the About cards */
const Icon = {
  rocket: (
    <svg viewBox="0 0 24 24"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
  ),
  star: (
    <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
  ),
  target: (
    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
  ),
  people: (
    <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ),
};

const FEATURES = [
  { icon: "rocket", title: "Degen Energy", text: "Fair launch, no presale, no insiders. The dog answers to the streets, not to suits." },
  { icon: "heart", title: "Community", text: "Built by and for the pack. Loud holders, open chat, and memes that never sleep." },
  { icon: "bolt", title: "Solana Speed", text: "Lightning-fast transactions and fees so low you won't even feel the swap." },
  { icon: "star", title: "Pure Meme", text: "No fake utility deck. One dog, one mask, one ticker — $SKI. That's the whole roadmap." },
  { icon: "target", title: "The Vision", text: "Take the masked dog from pump.fun OG to the most recognizable mug on Solana." },
  { icon: "people", title: "Open Door", text: "New to the pack? Copy the contract, mask up, and you're already one of us." },
];

export default function Page() {
  const [copied, setCopied] = useState(false);

  function copyCA() {
    navigator.clipboard?.writeText(CA).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  return (
    <>
      {/* NAV */}
      <nav className="nav">
        <div className="container nav-inner">
          <a className="brand" href="#top">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Ski Mask Dog" />
            <span className="bt">SKI MASK DOG</span>
          </a>
          <div className="nav-links">
            <a className="link" href="#about">About</a>
            <a className="link" href="#tokenomics">Tokenomics</a>
            <a className="link" href="#buy">How to Buy</a>
            <a className="link" href="#game">Game</a>
            <a className="link" href="#generator">PFP Lab</a>
            <a className="nav-x" href={X_URL} target="_blank" rel="noopener noreferrer" aria-label="X Community">
              <XIcon />
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header id="top" className="container hero">
        <div>
          <span className="wanted">★ Wanted on Solana · $SKI</span>
          <h1>
            <span className="l2">SKI</span><br />
            <span className="l2">MASK</span><br />
            <span className="l3">DOG</span>
          </h1>
          <p className="lead">
            Masked up, never down. The OG balaclava dog pulled up on Solana and never
            took the mask off. No roadmap to nowhere — just a pack, a meme, and a
            ticker that runs the block.
          </p>
          <div className="hero-cta">
            <a className="btn btn-yellow" href="#buy">Get $SKI</a>
            <a className="btn btn-pink" href="#generator">Make your PFP</a>
            <a className="btn btn-ink" href={X_URL} target="_blank" rel="noopener noreferrer">
              <XIcon /> Join the pack
            </a>
          </div>

          <div className="ca-bar">
            <span className="ca-label">Contract</span>
            <code>{CA}</code>
            <button className="copy-btn" onClick={copyCA}>{copied ? "Copied" : "Copy"}</button>
          </div>
        </div>

        <div className="hero-art">
          <div className="star">$SKI</div>
          <div className="frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Ski Mask Dog" />
          </div>
        </div>
      </header>

      {/* MEME MARQUEE */}
      <MemeMarquee />

      {/* ABOUT */}
      <section id="about" className="block">
        <div className="container">
          <div className="section-head">
            <h2 className="gta-title">ABOUT <span className="hl">SKI MASK DOG</span></h2>
            <p className="section-sub">
              Forbes ran a piece on $SKI mask dog and the OG on pump.fun started
              catching bids immediately — the mindshare was there from the start.
            </p>
          </div>
          <div className="about-grid">
            {FEATURES.map((f) => (
              <div className="feature" key={f.title}>
                <div className="ic">{Icon[f.icon]}</div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOKENOMICS */}
      <section id="tokenomics" className="block">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Tokenomics</span>
            <h2 className="gta-title" style={{ marginTop: 16 }}>SIMPLE <span className="hl">&amp; FAIR</span></h2>
            <p className="section-sub">No hidden wallets, no sneaky tax. What you see is what the pack gets.</p>
          </div>
          <div className="grid-3">
            <div className="tok">
              <div className="big">100%</div>
              <h3>Fair Launch</h3>
              <p>Community owned from the first block. The dog answers to the holders.</p>
            </div>
            <div className="tok">
              <div className="big">0 / 0</div>
              <h3>Zero Tax</h3>
              <p>No buy tax, no sell tax. Trade as cold as you want, whenever you want.</p>
            </div>
            <div className="tok">
              <div className="big">LP</div>
              <h3>Burned</h3>
              <p>Liquidity locked and burned. Nobody pulls the rug on this dog.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW TO BUY */}
      <section id="buy" className="block">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">How to Buy</span>
            <h2 className="gta-title" style={{ marginTop: 16 }}>MASK UP IN <span className="hl">4 STEPS</span></h2>
          </div>
          <div className="grid-4">
            <div className="step"><div className="n">01</div><h3>Get a Wallet</h3><p>Grab Phantom or Solflare and load it with some SOL.</p></div>
            <div className="step"><div className="n">02</div><h3>Copy Contract</h3><p>Take the $SKI address from the top of this page.</p></div>
            <div className="step"><div className="n">03</div><h3>Swap on Solana</h3><p>Paste it into Jupiter or Raydium and swap SOL for $SKI.</p></div>
            <div className="step"><div className="n">04</div><h3>Mask Up</h3><p>Mint your PFP below, post it, and welcome to the pack.</p></div>
          </div>
        </div>
      </section>

      {/* MEMORY GAME */}
      <section id="game" className="block">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Mini Game</span>
            <h2 className="gta-title" style={{ marginTop: 16 }}>MATCH THE <span className="hl">MASKS</span></h2>
            <p className="section-sub">Flip the cards and find both dogs wearing the same mask. Fewer moves, more respect.</p>
          </div>
          <MemoryGame />
        </div>
      </section>

      {/* PFP GENERATOR */}
      <section id="generator" className="block">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">PFP Lab · AI</span>
            <h2 className="gta-title" style={{ marginTop: 16 }}>SWAP THE <span className="hl">MASK</span></h2>
            <p className="section-sub">
              Powered by FLUX Kontext AI. Describe the ski mask you want and the dog
              tries it on — same good boy, brand new balaclava.
            </p>
          </div>
          <PfpGenerator />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <a className="brand" href="#top">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Ski Mask Dog" />
              <span className="bt">SKI MASK DOG</span>
            </a>
            <a className="footer-x" href={X_URL} target="_blank" rel="noopener noreferrer">
              <XIcon /> X Community
            </a>
          </div>
          <div className="footer-ca">CA: {CA}</div>
          <p className="footer-note">
            $SKI is a community meme token with no intrinsic value and no expectation of
            financial return. It exists for entertainment only and is not financial
            advice. Crypto is volatile — never spend more than you can afford to lose.
            Ski Mask Dog is not affiliated with any exchange, person or brand referenced.
            Always verify the contract address before buying. © {new Date().getFullYear()} Ski Mask Dog.
          </p>
        </div>
      </footer>
    </>
  );
}
