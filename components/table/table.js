"use client";
import { streets } from "@/data/streets_with_coordinates";
import Row from "./row";
import { useState } from "react";

export default function Table() {
  const [usingAddingTool, setUsingAddingTool] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Add search term state
  let newData = streets;

  // Filter streets based on search term
  const filteredStreets = streets.filter(
    (street) =>
      street.street_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      street.district_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      street.unique_number.toString().includes(searchTerm)
  );

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
      <div className="mt-10 w-full flex flex-row justify-between">
        <button
          className="border border-olive text-olive hover:bg-olive transition hover:text-white p-2 px-4 rounded-sm w-fit cursor-pointer"
          onClick={() => alert("TODO")}
        >
          Vytvořit request
        </button>
        <input
          type="text"
          className="border border-gray-400 p-2 w-full max-w-[500px] rounded-sm font-eigerdals"
          placeholder="Vyhledej dle názvu ulice, části obce či ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="border border-darkBlue text-blue hover:bg-darkBlue transition hover:text-white p-2 px-4 rounded-sm w-fit cursor-pointer"
          onClick={() => downloadFile()}
        >
          Stáhnout soubor
        </button>
      </div>

      {/* Add a search input */}
      <div className="w-full flex justify-center my-4"></div>

      {usingAddingTool ? <AddingTool street={streets} newData={newData} /> : ""}
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
          {/* Use filtered data for displaying rows */}
          {filteredStreets.map((street) => {
            return (
              <Row
                key={`${street.unique_number}`}
                newData={newData}
                street={street}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
