"use client";

import { useEffect, useState } from "react";
import { MEMES } from "./memes";

function buildDeck() {
  // Two of each meme, shuffled (Fisher–Yates).
  const cards = MEMES.flatMap((m, i) => [
    { uid: `${m.id}-a`, key: m.id, src: m.src, cap: m.cap },
    { uid: `${m.id}-b`, key: m.id, src: m.src, cap: m.cap },
  ]).map((c, idx) => ({ ...c, idx }));
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards.map((c, idx) => ({ ...c, idx }));
}

export default function MemoryGame() {
  const [deck, setDeck] = useState([]);
  const [flipped, setFlipped] = useState([]); // indices currently face-up (max 2)
  const [matched, setMatched] = useState(new Set());
  const [moves, setMoves] = useState(0);
  const [lock, setLock] = useState(false);

  function reset() {
    setDeck(buildDeck());
    setFlipped([]);
    setMatched(new Set());
    setMoves(0);
    setLock(false);
  }

  useEffect(() => {
    reset();
  }, []);

  function clickCard(idx) {
    if (lock) return;
    if (flipped.includes(idx) || matched.has(deck[idx].key)) return;

    const next = [...flipped, idx];
    setFlipped(next);

    if (next.length === 2) {
      setMoves((m) => m + 1);
      setLock(true);
      const [a, b] = next;
      if (deck[a].key === deck[b].key) {
        setTimeout(() => {
          setMatched((prev) => new Set(prev).add(deck[a].key));
          setFlipped([]);
          setLock(false);
        }, 450);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setLock(false);
        }, 850);
      }
    }
  }

  const won = deck.length > 0 && matched.size === MEMES.length;
  const pairsLeft = MEMES.length - matched.size;

  return (
    <div>
      <div className="mem-bar">
        <div className="mem-pill">Moves: <b>{moves}</b></div>
        <div className="mem-pill">Pairs left: <b>{pairsLeft}</b></div>
        <button className="btn btn-yellow" onClick={reset} type="button">Shuffle / Restart</button>
      </div>

      <div className="mem-grid">
        {deck.map((card, idx) => {
          const isUp = flipped.includes(idx) || matched.has(card.key);
          const isMatched = matched.has(card.key);
          return (
            <div
              key={card.uid}
              className={`mem-cell ${isUp ? "flipped" : ""} ${isMatched ? "matched" : ""}`}
              onClick={() => clickCard(idx)}
              role="button"
              aria-label={isUp ? `Card ${card.cap}` : "Hidden card"}
            >
              <div className="mem-inner">
                <div className="mem-face mem-back"><span>SKI</span></div>
                <div className="mem-face mem-front">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={card.src} alt={card.cap} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {won && (
        <div className="mem-win">
          <h3 className="gta-title">
            Mission <span className="hl">Passed</span>
          </h3>
          <p className="section-sub">
            All masks matched in {moves} moves. Respect +100. Now go grab some $SKI.
          </p>
          <button className="btn btn-pink" onClick={reset} type="button" style={{ marginTop: 8 }}>
            Play again
          </button>
        </div>
      )}
    </div>
  );
}
