import { Titillium_Web } from "next/font/google";
import "./globals.css";
import { conf } from "@/components/conf";

const font = Titillium_Web({
  weight: ["200", "300", "400", "600", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: conf.name,
  description: conf.description,
  keywords: conf.keywords,
  referrer: "origin-when-cross-origin",
  manifest: `${conf.url}/manifest.json`,
  category: conf.categories,
  openGraph: {
    title: conf.name,
    url: conf.url,
    description: conf.description,
    images: [
      {
        url: `${conf.url}/opengraph-image.jpg`,
        width: 1920,
        height: 1080,
        alt: conf.name,
      },
    ],
    locale: "cs_CZ",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="cs">
      <body className={`${font.className}`}>{children}</body>
    </html>
  );
}
