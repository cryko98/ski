# Ski Mask Dog ($SKI) 🐶🎭

The official landing page for **Ski Mask Dog**, a community memecoin on **Solana**, plus an AI-powered **ski-mask PFP generator**.

- **Contract (CA):** `H4chsqkobEKjjiAt7r3TLJvp7qprR6aasjJFtkQcAqun`
- **X Community:** https://x.com/i/communities/2004690431997514205

Built with **Next.js (App Router)** and deployed on **Vercel**.

## Features

- Snowy / heist-themed single-page site (hero, lore, tokenomics, how-to-buy, footer).
- One-click contract copy.
- **AI PFP generator** — restyles the ski mask on the dog using the [fal.ai](https://fal.ai) **FLUX Kontext** model. The dog's face, fur and background are locked; **only the mask can change** (a disclaimer says so on the page).

## Local development

```bash
npm install
# create .env.local with your fal.ai key:
echo "FLUX_API_KEY=your_fal_ai_key" > .env.local
npm run dev
```

Open http://localhost:3000.

> Note: the generator needs a valid `FLUX_API_KEY` to work.

## Deploy on Vercel

1. Push this repo to GitHub.
2. Import it into [Vercel](https://vercel.com).
3. Add an environment variable:
   - **Key:** `FLUX_API_KEY`
   - **Value:** your fal.ai API key
4. Deploy.

## How the generator works

- The base image is the Ski Mask Dog logo, bundled as a data URI in
  `app/api/generate/baseImage.js` so the base is always available on any host.
- `POST /api/generate` wraps the user's prompt with strict instructions so FLUX
  Kontext **only restyles the ski mask** and keeps the dog and background identical,
  then submits to the fal.ai queue and polls for the result.
- The API key is read **server-side only** from `process.env.FLUX_API_KEY` and is
  never exposed to the browser.

## Disclaimer

$SKI is a meme token for entertainment only — not financial advice. Always verify the
contract address before buying.
