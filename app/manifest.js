import { conf } from "@/components/conf";

export default function manifest() {
  return {
    name: conf.name,
    short_name: conf.short_name,
    description: conf.description,
    start_url: conf.start_url,
    display: conf.display,
    orientation: conf.orientation,
    background_color: conf.background_color,
    scope: conf.scope,
    lang: conf.lang,
    theme_color: conf.theme_color,
    categories: conf.categories,
  };
}
