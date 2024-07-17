import { streets } from "@/data/streets_with_coordinates";
import { useMap } from "react-leaflet";

const moths = [
  "ledena",
  "únoru",
  "březena",
  "dubena",
  "květena",
  "červena",
  "červenece",
  "srpena",
  "září",
  "říjena",
  "listopadu",
  "prosinece",
];

function getDate(date) {
  return `${date.getDate()}. ${moths[date.getMonth()]} ${date.getFullYear()}.`;
}

export default function Streets() {
  const map = useMap();
  streets.map((street) => {
    const coords = street.coordinates;
    // options: https://leafletjs.com/reference.html#polyline

    const date = new Date(street.status);

    const streetPopup = L.popup({
      keepInView: true,
      closeButton: false,
      className: "",
    }).setContent(
      `<h3 class="text-xl">${
        street.street_name
      }</h3><p>Za tuto ulici se modlil ${street.name} ${getDate(date)}</p>`
    );

    if (street.status !== "") {
      setTimeout(() => {
        const polyline = L.polyline(coords, {
          color: "yellow",
          opacity: 0.4,
          weight: 10,
          interactive: true,
          smoothFactor: 1.0, // How much to simplify the polyline on each zoom level. More means better performance and smoother look, and less means more accurate representation.
          className: "map-select",
        })
          .addTo(map)
          .bindPopup(streetPopup);
      }, Math.floor(Math.random() * 4000));
    } else {
      const polyline = L.polyline(coords, {
        color: "grey",
        opacity: 0.3,
        weight: 10,
        interactive: false,
        smoothFactor: 1.0, // How much to simplify the polyline on each zoom level. More means better performance and smoother look, and less means more accurate representation.
      }).addTo(map);
    }
  });
  return null;
}
