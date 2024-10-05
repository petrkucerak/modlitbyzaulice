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
      <div className="mt-10 w-full flex flex-row justify-around">
        <button
          className="border border-olive text-olive hover:bg-olive transition hover:text-white p-2 px-4 rounded-sm w-fit cursor-pointer"
          onClick={() => alert("TODO")}
        >
          Přidávat
        </button>
        <button
          className="border border-stone-800 hover:bg-stone-800 transition hover:text-white p-2 px-4 rounded-sm w-fit cursor-pointer"
          onClick={() => downloadFile()}
        >
          Stáhnout soubor
        </button>
        <button
          className="border border-darkBlue text-blue hover:bg-darkBlue transition hover:text-white p-2 px-4 rounded-sm w-fit cursor-pointer"
          onClick={() => alert("TODO")}
        >
          Vytvořit request
        </button>
      </div>
      <table className="w-full my-8">
        <thead>
          <tr className="text-left font-brother1816 uppercase text-darkBlue">
            <th className="py-4">ID</th>
            <th className="py-4">Ulice</th>
            <th className="py-4 hidden md:flex">Část obce</th>
            <th className="py-4">Jména</th>
          </tr>
        </thead>
        <tbody>
          {streets.map((street) => {
            return (
              <Row
                key={`${street.unique_number}`}
                newData={newData}
                street={street}
              />
            );
          })}{" "}
        </tbody>
      </table>
    </div>
  );
}
