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
    <tr className="border-y border-olive text-wine">
      <td className="py-2">#{street.unique_number}</td>
      <td className="py-2">{street.street_name}</td>
      <td className="py-2 hidden md:flex">{street.district_name}</td>
      <td className="py-2">
        <input
          type="text"
          className="border border-black rounded-sm px-2 w-full"
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
