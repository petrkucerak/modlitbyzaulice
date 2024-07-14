import { useMap } from "react-leaflet";
import { locate } from "leaflet.locatecontrol";

export default function Locale() {
  const map = useMap();
  const locateControl = L.control
    .locate({
      flyTo: true,
      showPopup: false,
      strings: {
        title: "Ukaž mi, kde jsem!",
      },
      locateOptions: {
        enableHighAccuracy: true,
      },
    })
    .addTo(map);
  //   locateControl.start(); // for star on user position
  return null;
}
