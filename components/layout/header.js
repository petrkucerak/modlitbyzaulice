"use client";
import Link from "next/link";
import IconCustomLogo from "../icons/logo";
import { useState } from "react";
import { IconMenu, IconX } from "@tabler/icons";

export default function Header({ activeSection }) {
  const [isOpen, setIsOpen] = useState(false);

  const getHeaderClassName = () => {
    switch (activeSection) {
      case "home":
        return "bg-darkBlue";
      case "about":
        return "bg-yellow";
      case "motivate":
        return "bg-red";
      case "how":
        return "bg-blue";
      case "sponsors":
        return "bg-olive";
      default:
        return "bg-white";
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header
      className={`z-[10000] w-[100vw] flex flex-row items-center justify-between ${getHeaderClassName()} text-wine fixed transition-colors duration-200 xl:text-lg 2xl:text-xl`}
    >
      <Link href={"/#home"} className="my-4">
        <IconCustomLogo className={"w-[2rem] ml-[1.8rem]"} />
      </Link>
      {/* Desktop menu */}
      <div className="hidden md:flex flex-row items-center justify-between max-w-[600px] w-full">
        <Link href={"/#about-target"}>o projektu</Link>
        <Link href={"/#how-target"}>jak se zapojit</Link>
        <Link href={"/mapa"}>mapa</Link>
        <Link href={"/#sponsors-target"}>podporují</Link>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className={`absolute top-14 text-2xl flex flex-col ${getHeaderClassName()} items-center w-full h-[100vh] md:hidden`}
        >
          <Link
            href={"/#about-target"}
            onClick={toggleMenu}
            className="block my-4"
          >
            o projektu
          </Link>
          <Link
            href={"/#how-target"}
            onClick={toggleMenu}
            className="block my-4"
          >
            jak se zapojit
          </Link>
          <Link href={"/mapa"} onClick={toggleMenu} className="block my-4">
            mapa
          </Link>
          <Link
            href={"/#sponsors-target"}
            onClick={toggleMenu}
            className="block my-4"
          >
            podporují
          </Link>
        </div>
      )}
      <div>
        {/* Burger menu icon */}
        <div className="flex items-center md:hidden">
          <button
            onClick={toggleMenu}
            title={isOpen ? "Zavřít menu" : "Otevřít menu"}
          >
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
