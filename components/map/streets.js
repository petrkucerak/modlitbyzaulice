import { streets } from "@/data/streets_with_coordinates";
import { useMap } from "react-leaflet";

export default function Streets() {
  const map = useMap();
  streets.map((street) => {
    const coords = street.coordinates;
    // options: https://leafletjs.com/reference.html#polyline

    const streetPopup = L.popup({
      keepInView: true,
      closeButton: false,
      className: "",
    }).setContent(street.street_name);

    const polyline = L.polyline(coords, {
      color: "yellow",
      opacity: 0.5,
      weight: 20,
      smoothFactor: 0.95, // How much to simplify the polyline on each zoom level. More means better performance and smoother look, and less means more accurate representation.
    })
      .addTo(map)
      .bindPopup(streetPopup);
  });
  return null;
}
