import { streets } from "@/data/streets_with_coordinates";
import { useMap } from "react-leaflet";

export default function Streets() {
  streets.map((street) => {
    const coords = street.coordinates;
    const map = useMap();
    // options: https://leafletjs.com/reference.html#polyline
    const polyline = L.polyline(coords, {
      color: "yellow",
      opacity: 0.5,
      weight: 5,
      smoothFactor: 0.1, // How much to simplify the polyline on each zoom level. More means better performance and smoother look, and less means more accurate representation.
    }).addTo(map);
  });
  return null;
}
