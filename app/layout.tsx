import type { Metadata } from "next";
import { Archivo_Black, IBM_Plex_Mono, Inter } from "next/font/google";
import "@glidejs/glide/dist/css/glide.core.min.css";
import "./globals.css";

const display = Archivo_Black({ weight: "400", subsets: ["latin"], variable: "--font-display" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = IBM_Plex_Mono({ weight: ["400", "500"], subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://somber-made.com"),
  title: "SOMBER | Independent Streetwear & Limited Apparel Drops",
  description: "Small-run independent apparel. Original graphics, limited releases, no restocks.",
  openGraph: {
    type: "website",
    url: "https://somber-made.com/",
    siteName: "SOMBER",
    title: "SOMBER / Advance Notice",
    description: "Details withheld.",
    images: [
      { url: "/og.gif?v=4", width: 1200, height: 630, alt: "Animated SOMBER advance notice with redacted details", type: "image/gif" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SOMBER / Advance Notice",
    description: "Details withheld.",
    images: ["/og.png?v=4"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${display.variable} ${sans.variable} ${mono.variable}`}>{children}</body></html>;
}
