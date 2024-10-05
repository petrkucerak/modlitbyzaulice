"use client";
import { useState } from "react";
export default function Row({ newData, street }) {
  function updateName(key, name) {
    // find element
    let index = newData.findIndex((street) => street.unique_number === key);
    // set new value
    newData[index].name = name;
  }

  const [name, setName] = useState(street.name);
  return (
    <tr>
      <td>#{street.unique_number}</td>
      <td>{street.street_name}</td>
      <td>{street.district_name}</td>
      <td>
        <input
          type="text"
          className="border-2 rounded-lg px-2"
          value={name}
          onChange={(e) => (
            setName(e.target.value),
            updateName(street.unique_number, e.target.value)
          )}
        />
      </td>
    </tr>
  );
}
