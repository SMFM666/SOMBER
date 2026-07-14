import type { Metadata } from "next";
import { Archivo_Black, IBM_Plex_Mono, Inter } from "next/font/google";
import "@splidejs/splide/css/core";
import "./globals.css";

const display = Archivo_Black({ weight: "400", subsets: ["latin"], variable: "--font-display" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = IBM_Plex_Mono({ weight: ["400", "500"], subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://somber-made.com"),
  title: "SOMBER | Independent Streetwear & Limited Apparel Drops",
  description: "Small-run independent apparel. Original graphics, limited releases, no restocks.",
  icons: { icon: "/media/icon.png", shortcut: "/media/icon.png" },
  openGraph: {
    title: "SOMBER / Drop 001: Correction",
    description: "Limited to 50. No restock.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "SOMBER Drop 001 Correction" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${display.variable} ${sans.variable} ${mono.variable}`}>{children}</body></html>;
}
