"use client";
import { useState } from "react";
export default function Row({ newData, street }) {
  function updateDate(key, date) {
    // find element
    let index = newData.findIndex(
      (street) =>
        street.street_name === key.street_name &&
        street.borough_name === key.borough_name &&
        street.district_name === key.district_name
    );
    // set new value
    newData[index].date = date;
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

  function updateColor(key, color) {
    // find element
    let index = newData.findIndex(
      (street) =>
        street.street_name === key.street_name &&
        street.borough_name === key.borough_name &&
        street.district_name === key.district_name
    );
    // set new value
    newData[index].color = color;
  }

  const [name, setName] = useState(street.name);
  const [date, setDate] = useState(street.date);
  const [color, setColor] = useState(street.color);
  return (
    <tr>
      <td>{street.street_name}</td>
      <td>{street.district_name}</td>
      <td>{street.borough_name}</td>
      <td>
        <input
          type="color"
          className="border-2 rounded-lg px-2"
          value={color}
          onChange={(e) => {
            setColor(e.target.value),
              updateColor(
                {
                  street_name: street.street_name,
                  borough_name: street.borough_name,
                  district_name: street.district_name,
                },
                e.target.value
              );
          }}
        />
      </td>
      <td>
        <input
          type="date"
          className="border-2 rounded-lg px-2"
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
          className="border-2 rounded-lg px-2"
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
}
