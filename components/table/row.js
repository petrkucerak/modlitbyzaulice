"use client";
import { useState } from "react";
export default function Row({ newData, street, id, handleKeyDown }) {
  function updateName(key, name) {
    // find element
    let index = newData.findIndex((street) => street.unique_number === key);
    // set new value
    newData[index].name = name;
  }

  const [name, setName] = useState(street.name);
  return (
    <tr className="border-y border-olive text-wine" key={street.unique_number}>
      <td className="py-2">#{street.unique_number}</td>
      <td className="py-2">{street.street_name}</td>
      <td className="py-2 hidden md:flex">{street.district_name}</td>
      <td className="py-2">
        <input
          type="text"
          className="border border-black rounded-sm px-2 w-full"
          value={name}
          id={id}
          onChange={(e) => (
            setName(e.target.value),
            updateName(street.unique_number, e.target.value)
          )}
          onKeyDown={handleKeyDown} // Handle ENTER key press
        />
      </td>
    </tr>
  );
}
