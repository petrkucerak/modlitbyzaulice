"use client";
import { streets } from "@/data/streets_with_coordinates";
import Row from "./row";

export default function Table() {
  let newData = streets;

  function downloadFile() {
    const data =
      "data:text/json;charset=utf-8," +
      encodeURIComponent("export const streets = " + JSON.stringify(newData));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", data);
    downloadAnchorNode.setAttribute("download", "streets_with_coordinates.js");
    document.body.appendChild(downloadAnchorNode); // required for Firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }
  return (
    <div className="flex flex-col items-center justify-between w-full">
      <table className="w-full">
        <thead>
          <tr className="text-left">
            <th>Ulice</th>
            <th>Část obce</th>
            <th>Městský obvod</th>
            <th>Datum</th>
            <th>Jméno</th>
          </tr>
        </thead>
        <tbody>
          {streets.map((street) => {
            return <Row newData={newData} street={street} />;
          })}{" "}
        </tbody>
      </table>
      <button
        className="my-8 border border-stone-800 hover:bg-stone-800 transition hover:text-white p-2 px-4 rounded-2xl w-fit cursor-pointer"
        onClick={() => downloadFile()}
      >
        Stáhnout soubor
      </button>
    </div>
  );
}
