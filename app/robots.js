import { conf } from "@/components/conf";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // disallow: "/private/",
    },
    sitemap: `${conf.url}/sitemap.xml`,
  };
}
