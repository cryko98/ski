import "./globals.css";

const SITE_URL = "https://skimaskdog.meme.bz";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Ski Mask Dog ($SKI) — The Coldest Dog on Solana",
  description:
    "Ski Mask Dog ($SKI) is the masked-up community memecoin on Solana. Pull up, copy the contract, mint your own masked PFP with AI, and ride with the pack.",
  keywords: [
    "Ski Mask Dog",
    "SKI",
    "Solana",
    "memecoin",
    "crypto",
    "PFP generator",
    "FLUX Kontext",
  ],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Ski Mask Dog ($SKI) — The Coldest Dog on Solana",
    description:
      "Masked up, never down. Join the $SKI pack on Solana and generate your own ski-mask PFP with AI.",
    url: SITE_URL,
    siteName: "Ski Mask Dog",
    images: [{ url: "/logo.png", width: 372, height: 372, alt: "Ski Mask Dog" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ski Mask Dog ($SKI)",
    description: "The coldest dog on Solana. Masked up, never down.",
    images: ["/logo.png"],
  },
};

export const viewport = {
  themeColor: "#0a0e1a",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Oswald:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
