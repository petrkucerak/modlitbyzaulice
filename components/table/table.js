"use client";
import { streets } from "@/data/streets_with_coordinates";
import { useState } from "react";

export default function Table() {
  let newData = streets;

  function updateDate(key, date) {
    // find element
    let index = newData.findIndex(
      (street) =>
        street.street_name === key.street_name &&
        street.borough_name === key.borough_name &&
        street.district_name === key.district_name
    );
    // set new value
    newData[index].status = date;
  }
  function updateName(key, name) {
    // find element
    let index = newData.findIndex(
      (street) =>
        street.street_name === key.street_name &&
        street.borough_name === key.borough_name &&
        street.district_name === key.district_name
    );
    // set new value
    newData[index].name = name;
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
            const [name, setName] = useState(street.name);
            const [date, setDate] = useState(street.status);
            return (
              <tr
                key={`${street.street_name}-${street.borough_name}-${street.district_name}`}
              >
                <td>{street.street_name}</td>
                <td>{street.district_name}</td>
                <td>{street.borough_name}</td>
                <td>
                  <input
                    type="date"
                    className="border-2 rounded-lg"
                    value={date}
                    onChange={(e) => (
                      setDate(e.target.value),
                      updateDate(
                        {
                          street_name: street.street_name,
                          borough_name: street.borough_name,
                          district_name: street.district_name,
                        },
                        e.target.value
                      )
                    )}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="border-2 rounded-lg"
                    value={name}
                    onChange={(e) => (
                      setName(e.target.value),
                      updateName(
                        {
                          street_name: street.street_name,
                          borough_name: street.borough_name,
                          district_name: street.district_name,
                        },
                        e.target.value
                      )
                    )}
                  />
                </td>
              </tr>
            );
          })}
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
