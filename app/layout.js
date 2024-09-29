import "./globals.css";
import { conf } from "@/components/conf";

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
        url: `${conf.url}/opengraph-image.png`,
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
    <html lang="cs" className="scroll-smooth">
      <body className={`font-brother1816 bg-white`}>{children}</body>
    </html>
  );
}
