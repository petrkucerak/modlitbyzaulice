import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b w-[90vw] max-w-[900px] flex flex-col items-center justify-between">
      <Link href={"/"} className="my-4">
        Modlitby za Pardubice
      </Link>
    </header>
  );
}
