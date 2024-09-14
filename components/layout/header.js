"use client";
import Link from "next/link";
import IconCustomLogo from "../icons/logo";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="w-[100vw] flex flex-row items-center justify-between">
      <Link href={"/"} className="my-4">
        <IconCustomLogo className={"w-[2rem] ml-[1.8rem]"} />
      </Link>
      <div className="max-w-[600px] flex flex-row items-center justify-between w-full">
        <Link href={"/"}>o projektu</Link>
        <Link href={"/"}>jak se zapojit</Link>
        <Link href={"/"}>mapa</Link>
        <Link href={"/"}>podporují</Link>
      </div>
      <div>burger menu</div>
    </header>
  );
}
