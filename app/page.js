"use client";

import { useEffect, useState } from "react";
import PfpGenerator from "./components/PfpGenerator";

const CA = "H4chsqkobEKjjiAt7r3TLJvp7qprR6aasjJFtkQcAqun";
const X_URL = "https://x.com/i/communities/2004690431997514205";

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function Snow() {
  const [flakes, setFlakes] = useState([]);
  useEffect(() => {
    const arr = Array.from({ length: 36 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 8 + Math.random() * 14,
      dur: 7 + Math.random() * 12,
      delay: -Math.random() * 12,
      op: 0.2 + Math.random() * 0.6,
    }));
    setFlakes(arr);
  }, []);
  return (
    <div className="snow-layer" aria-hidden="true">
      {flakes.map((f) => (
        <span
          key={f.id}
          className="flake"
          style={{
            left: `${f.left}%`,
            fontSize: `${f.size}px`,
            animationDuration: `${f.dur}s`,
            animationDelay: `${f.delay}s`,
            opacity: f.op,
          }}
        >
          ❄
        </span>
      ))}
    </div>
  );
}

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
      <Snow />

      {/* NAV */}
      <nav className="nav">
        <div className="container nav-inner">
          <a className="brand" href="#top">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Ski Mask Dog" />
            Ski Mask Dog
          </a>
          <div className="nav-links">
            <a className="link" href="#about">Lore</a>
            <a className="link" href="#tokenomics">Tokenomics</a>
            <a className="link" href="#buy">How to Buy</a>
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
          <span className="tagchip">
            <span className="dot" /> Live on Solana · $SKI
          </span>
          <h1>
            The <span className="accent">coldest</span> dog
            <br /> on <span className="flame">Solana.</span>
          </h1>
          <p className="lead">
            Masked up, never down. Ski Mask Dog pulled his balaclava over the whole
            chain and never looked back. No roadmap to a moon — just a pack, a meme,
            and a mask that prints. Pull up. 🐶🎭
          </p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="#buy">Get $SKI</a>
            <a className="btn btn-flame" href="#generator">🎭 Make your PFP</a>
            <a className="btn btn-ghost" href={X_URL} target="_blank" rel="noopener noreferrer">
              <XIcon /> Join the pack
            </a>
          </div>

          <div className="ca-bar">
            <span className="ca-label">Contract</span>
            <code>{CA}</code>
            <button className="copy-btn" onClick={copyCA}>
              {copied ? "✓ Copied" : "Copy"}
            </button>
          </div>
        </div>

        <div className="hero-art">
          <div className="ring" />
          <div className="frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Ski Mask Dog" />
          </div>
        </div>
      </header>

      {/* STATS */}
      <section className="container">
        <div className="stats">
          <div className="stat"><div className="num accent">$SKI</div><div className="lbl">Ticker</div></div>
          <div className="stat"><div className="num">100%</div><div className="lbl">Community owned</div></div>
          <div className="stat"><div className="num">0%</div><div className="lbl">Team tax</div></div>
          <div className="stat"><div className="num flame">∞</div><div className="lbl">Cold energy</div></div>
        </div>
      </section>

      {/* ABOUT / LORE */}
      <section id="about" className="block">
        <div className="container about-grid">
          <div>
            <span className="eyebrow">The Lore</span>
            <h2 className="section-title">A good boy who went incognito.</h2>
            <p className="section-sub">
              Somewhere between a snowstorm and a candle wick, a golden retriever
              pulled a knitted ski mask over his face and became a legend. He doesn&apos;t
              bark — he ships. He doesn&apos;t beg — he holds.
            </p>
          </div>
          <div className="card lore-card">
            <p>
              <strong>Born cold.</strong> $SKI started as a pump.fun OG and caught bids
              the second the mask went on. The mindshare was there from day one — the
              dog just made it official.
            </p>
            <p>
              <strong>No suits, no promises.</strong> No locked roadmap, no fake VCs,
              no &quot;utility&quot; deck. Just a fair launch, a loud community, and a
              dog who refuses to show his face.
            </p>
            <p>
              <strong>The mask is the movement.</strong> Mint your own masked version,
              post it, and rep the pack. Every PFP is one more dog incognito.
            </p>
          </div>
        </div>
      </section>

      {/* TOKENOMICS */}
      <section id="tokenomics" className="block">
        <div className="container">
          <span className="eyebrow">Tokenomics</span>
          <h2 className="section-title">Simple. Cold. Fair.</h2>
          <p className="section-sub">
            No hidden wallets, no sneaky tax. What you see is what the pack gets.
          </p>
          <div className="tok-grid">
            <div className="tok">
              <div className="ic">❄️</div>
              <h3>Fair launch</h3>
              <p className="big">100%</p>
              <p>Community owned from the first block. The dog answers to the holders.</p>
            </div>
            <div className="tok">
              <div className="ic">🧊</div>
              <h3>Tax</h3>
              <p className="big">0 / 0</p>
              <p>Zero buy tax, zero sell tax. Trade as cold as you want.</p>
            </div>
            <div className="tok">
              <div className="ic">🔒</div>
              <h3>Liquidity</h3>
              <p className="big">Burned</p>
              <p>LP locked &amp; tossed in the snow. Nobody pulls the rug on this dog.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW TO BUY */}
      <section id="buy" className="block">
        <div className="container">
          <span className="eyebrow">How to Buy</span>
          <h2 className="section-title">Mask up in 4 steps.</h2>
          <div className="steps">
            <div className="step">
              <div className="n">01</div>
              <h3>Get a wallet</h3>
              <p>Download Phantom or Solflare and fund it with some SOL.</p>
            </div>
            <div className="step">
              <div className="n">02</div>
              <h3>Copy the contract</h3>
              <p>Grab the $SKI address from the top of this page.</p>
            </div>
            <div className="step">
              <div className="n">03</div>
              <h3>Swap on Solana</h3>
              <p>Paste the contract into Jupiter or Raydium and swap SOL for $SKI.</p>
            </div>
            <div className="step">
              <div className="n">04</div>
              <h3>Mask up</h3>
              <p>Mint your PFP below and post it. Welcome to the pack. 🎭</p>
            </div>
          </div>
        </div>
      </section>

      {/* PFP GENERATOR */}
      <section id="generator" className="block">
        <div className="container">
          <span className="eyebrow">PFP Lab · AI</span>
          <h2 className="section-title">
            Swap the dog&apos;s <span className="accent">mask</span>.
          </h2>
          <p className="section-sub">
            Powered by FLUX Kontext AI. Type the ski mask you want, hit generate, and
            our dog tries it on — same good boy, brand new balaclava.
          </p>
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
              Ski Mask Dog
            </a>
            <a className="footer-x" href={X_URL} target="_blank" rel="noopener noreferrer">
              <XIcon /> X Community
            </a>
          </div>
          <div className="footer-ca">CA: {CA}</div>
          <p className="footer-note">
            $SKI is a community meme token with no intrinsic value or expectation of
            financial return. It is for entertainment only — not financial advice.
            Crypto is volatile; never invest more than you can afford to lose. Ski Mask
            Dog is not affiliated with any exchange, person or brand referenced. Always
            verify the contract address before buying. © {new Date().getFullYear()} Ski
            Mask Dog. Stay cold. 🐶🎭
          </p>
        </div>
      </footer>
    </>
  );
}
