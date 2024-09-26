"use client";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { conf } from "../conf";
import { isMobile } from "react-device-detect";
import Locale from "./locale";
import Streets from "./streets";

export default function Map({ className }) {
  const position = [50.0385619, 15.778475];
  let tileSize = "";
  isMobile ? (tileSize = "256@2x") : (tileSize = "256");

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      className="h-[100vh] md:h-[70vh] w-full md:mt-[5rem] md:w-[90vw] md:max-w-[1000px] md:mb-4"
    >
      <TileLayer
        url={`https://api.mapy.cz/v1/maptiles/basic/${tileSize}/{z}/{x}/{y}?apikey=${conf.MAPY_API_KEY}`}
        attribution='<a href="https://api.mapy.cz/copyright" target="_blank" rel="noreferrer">&copy; Seznam.cz a.s. a další</a>'
        className="grayscale-[90%]"
      />
      <Locale />
      <Streets />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/leaflet.locatecontrol@0.76.0/dist/L.Control.Locate.min.css"
      />
      <a
        href="http://mapy.cz/"
        target="_blank"
        rel="noreferrer"
        className="absolute z-[1000] bottom-0"
      >
        <img alt="Mapy.cz logo" src="https://api.mapy.cz/img/api/logo.svg" />
      </a>
    </MapContainer>
  );
}
