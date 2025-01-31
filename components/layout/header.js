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
      <Link href={"/#home"} className="my-4" title="hlavní strana projektu">
        <IconCustomLogo className={"w-[2rem] ml-[1.8rem]"} />
      </Link>
      <nav className="hidden md:flex flex-row items-center justify-between max-w-[600px] w-full">
        <Link href={"/#about-target"} title="o projektu">
          o projektu
        </Link>
        <Link href={"/#how-target"} title="jak se zapojit">
          jak se zapojit
        </Link>
        <Link href={"/mapa"} title="interaktivní mapa">
          mapa
        </Link>
        <Link href={"/hra"} title="znalostní hra">
          hra
        </Link>
        <Link href={"/#sponsors-target"} title="projekt podporují">
          podporují
        </Link>
      </nav>
      {isOpen && (
        <nav
          className={`absolute top-14 text-2xl flex flex-col ${getHeaderClassName()} items-center w-full h-[100vh] md:hidden`}
        >
          <Link
            href={"/#about-target"}
            onClick={toggleMenu}
            className="block my-4"
            title="o projektu"
          >
            o projektu
          </Link>
          <Link
            href={"/#how-target"}
            onClick={toggleMenu}
            className="block my-4"
            title="jak se zapojit"
          >
            jak se zapojit
          </Link>
          <Link
            href={"/mapa"}
            onClick={toggleMenu}
            className="block my-4"
            title="interaktivní mapa"
          >
            mapa
          </Link>
          <Link
            href={"/hra"}
            onClick={toggleMenu}
            className="block my-4"
            title="znalostní hra"
          >
            hra
          </Link>
          <Link
            href={"/#sponsors-target"}
            onClick={toggleMenu}
            className="block my-4"
            title="projekt podporují"
          >
            podporují
          </Link>
        </nav>
      )}
      <div>
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
