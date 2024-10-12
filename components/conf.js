export const conf = {
  // start of dev
  MAPY_API_KEY: "PdNRjVdq8YVAgaBNnxiTAsfhy-qbG6lMxuQKg3W02gk",
  // end of dev

  url: "https://modlitbyzaulice.cz",

  email: "info@modlitbyzaulice.cz",
  image: "https://modlitbyzaulice.cz/opengraph-image.png",

  // start of the manifest
  name: "Modlitby za ulice - proměňme město modlitbou",
  short_name: "Modlitby za ulice",
  description:
    "Modlitby za ulice je misijní projekt, který propojuje obyvatele Pardubic a okolí skrze modlitbu. Do projektu se může zapojit každý. Každý týden si v kostele vylosuje kartičku s názvem ulice, za kterou se bude modlit.",
  start_url: "/",
  display: "standalone",
  orientation: "portrait-primary",
  background_color: "#EDE1C7",
  scope: "/",
  lang: "cs",
  theme_color: "#EB8FC2",
  categories: ["entertainment", "lifestyle"],
  icons: [
    { src: "/icon-192.png", type: "image/png", sizes: "192x192" },
    { src: "/icon-512.png", type: "image/png", sizes: "512x512" },
  ],
  // end of manifest

  // start of meta
  keywords: [
    "Modlitba",
    "Pardubice",
    "Modlitba za ulice",
    "Modlitby za ulice",
    "ulice",
    "Modlitby za Pardubice",
    "Modlitba v Pardubicích",
    "Pardubice se modlí",
  ],
};
