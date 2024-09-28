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

const GREY_COLOR = "#808080";

function getDate(date) {
  return `${date.getDate()}. ${moths[date.getMonth()]} ${date.getFullYear()}`;
}

export default function Streets() {
  const map = useMap();
  streets.map((street) => {
    const coords = street.coordinates;
    // options: https://leafletjs.com/reference.html#polyline

    const date = new Date(street.date);

    const streetPopup = L.popup({
      keepInView: true,
      closeButton: false,
      className: "font-brother1816",
    }).setContent(
      `<h3 class="title">${street.street_name}</h3><p class="subtitle">${street.district_name}</p><p class="details">Za ulici se už modlil ${street.name}</p>`
    );

    // if (street.date !== "") {
      setTimeout(() => {
        const polyline = L.polyline(coords, {
          color: street.color,
          opacity: 0.8,
          weight: 10,
          interactive: true,
          smoothFactor: 1.0, // How much to simplify the polyline on each zoom level. More means better performance and smoother look, and less means more accurate representation.
          className: "map-select",
        })
          .addTo(map)
          .bindPopup(streetPopup);
      }, Math.floor(Math.random() * 4000));
    // } else {
    //   const polyline = L.polyline(coords, {
    //     color: GREY_COLOR,
    //     opacity: 0.3,
    //     weight: 10,
    //     interactive: false,
    //     smoothFactor: 1.0, // How much to simplify the polyline on each zoom level. More means better performance and smoother look, and less means more accurate representation.
    //   }).addTo(map);
    // }
  });
  return null;
}
