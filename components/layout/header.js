import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b w-full flex flex-col items-center justify-between">
      <Link href={"/"}>Modlitba za Pardubice</Link>
    </header>
  );
}
