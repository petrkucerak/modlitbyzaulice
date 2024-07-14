import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b w-[90vw] max-w-[800px] flex flex-col items-center justify-between">
      <Link href={"/"}>Modlitba za Pardubice</Link>
    </header>
  );
}
