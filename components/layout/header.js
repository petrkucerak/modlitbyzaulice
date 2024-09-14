"use client";
import Link from "next/link";
import IconCustomLogo from "../icons/logo";
import { useState } from "react";
import { IconMenu, IconX } from "@tabler/icons";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="w-[100vw] flex flex-row items-center justify-between bg-darkBlue text-wine fixed">
      <Link href={"/#home"} className="my-4">
        <IconCustomLogo className={"w-[2rem] ml-[1.8rem]"} />
      </Link>

      {/* Desktop menu */}
      <div className="hidden md:flex flex-row items-center justify-between max-w-[600px] w-full">
        <Link href={"/#about"}>o projektu</Link>
        <Link href={"/#how"}>jak se zapojit</Link>
        <Link href={"/mapa"}>mapa</Link>
        <Link href={"/#sponsors"}>podporují</Link>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="absolute top-14 text-2xl flex flex-col bg-darkBlue items-center w-full h-[100vh] md:hidden">
          <Link href={"/#about"} onClick={toggleMenu} className="block my-4">
            o projektu
          </Link>
          <Link href={"/#how"} onClick={toggleMenu} className="block my-4">
            jak se zapojit
          </Link>
          <Link href={"/mapa"} onClick={toggleMenu} className="block my-4">
            mapa
          </Link>
          <Link href={"/#sponsors"} onClick={toggleMenu} className="block my-4">
            podporují
          </Link>
        </div>
      )}
      <div>
        {/* Burger menu icon */}
        <div className="flex items-center md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? (
              <IconX className="w-7 h-7 mr-5" />
            ) : (
              <IconMenu className="w-7 h-7 mr-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
