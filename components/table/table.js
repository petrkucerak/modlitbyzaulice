"use client";
import { streets } from "@/data/streets_with_coordinates";
import Row from "./row";
import { useState, useRef } from "react";
import Tutorial from "./tutorial";

export default function Table() {
  let newData = streets;

  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [selectedResult, setSelectedResult] = useState(null); // Track selected result
  const [displayTutorial, setDisplayTutorial] = useState(false);
  const [fillStreets, setFillStreets] = useState(getCountOfStreets());
  const searchInputRef = useRef(null); // Reference to search input

  // Filter streets based on search term
  const filteredStreets = streets.filter(
    (street) =>
      street.street_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      street.district_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      street.unique_number.toString().includes(searchTerm)
  );

  function getCountOfStreets() {
    let count = 0;
    newData.map((s) => (s.name !== "" ? (count += 1) : (count += 0)));
    return count;
  }

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

  // Handle ENTER key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (selectedResult === null && filteredStreets.length > 0) {
        // Jump to the first result
        setSelectedResult(filteredStreets[0].unique_number);
        document
          .getElementById(`row-${filteredStreets[0].unique_number}`)
          .focus();
      } else {
        // Return to search form and clear input
        setSelectedResult(null);
        setSearchTerm("");
        searchInputRef.current.focus();
      }
    }
    setFillStreets(getCountOfStreets());
  };

  return (
    <div className="flex flex-col items-center justify-between w-full">
      <div className="mt-10 w-full flex flex-row justify-between">
        <button
          className="border w-40 border-olive text-olive hover:bg-olive transition hover:text-white p-2 px-4 rounded-sm cursor-pointer"
          onClick={() => setDisplayTutorial(displayTutorial ? false : true)}
        >
          {displayTutorial ? "Skrýt návod" : "Zobrazit návod"}
        </button>

        <input
          type="text"
          ref={searchInputRef} // Attach ref to search input
          className="border border-gray-400 p-2 w-full max-w-[500px] rounded-sm font-eigerdals"
          placeholder="Vyhledej dle názvu ulice, části obce či ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown} // Handle ENTER key press
        />

        <button
          className="border w-40 border-darkBlue text-blue hover:bg-darkBlue transition hover:text-white p-2 px-4 rounded-sm cursor-pointer"
          onClick={() => downloadFile()}
        >
          Stáhnout soubor
        </button>
      </div>
      {displayTutorial ? <Tutorial className={"my-8"} /> : ""}

      <p className="mt-2 text-sm">
        <strong className="font-medium">TIP:</strong> Napiš ID a&nbsp;zmáčkni
        ENTER, napiš jméno a&nbsp;opět zmáčkni ENTER.
      </p>
      <div className="w-full flex flex-col justify-around items-center mt-4">
        {/* <h2 className="text-lg uppercase text-darkBlue font-bold">
          Statistiky
        </h2> */}
        <p className="w-full">
          Promodlených ulic: {fillStreets} z {streets.length}
        </p>
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
          {filteredStreets.map((street) => {
            return (
              <Row
                key={`${street.unique_number}`}
                newData={newData}
                street={street}
                id={`row-${street.unique_number}`}
                handleKeyDown={handleKeyDown}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
