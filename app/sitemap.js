import { conf } from "@/components/conf";

export default function sitemap() {
  return [
    {
      url: `${conf.url}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${conf.url}/mapa`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
