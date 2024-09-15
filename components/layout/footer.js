import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col items-center justify-between bg-teal text-white">
      <p className="text-sm w-[90vw] max-w-[800px] mt-[2rem]">
        Pokud byste chtěli podpořit projekt svým časem nebo finančně, napiště
        nám na{" "}
        <Link href={"mailto:info@modlitbyzapardubice.cz"} className="underline">
          info@modlitbyzapardubice.cz
        </Link>
        .
      </p>
      <p className="text-sm w-[90vw] max-w-[800px]">
        <Link href={"/"} target="_blank" className="underline">
          Pravidla akce a zásady ochrany osobních údaju
        </Link>
        .
      </p>
      <p className="text-sm w-[90vw] max-w-[800px]">
        Organizátorem akce je{" "}
        <Link href={""} target="_blank">
          Římskokatolická farnost Pardubice
        </Link>
        .
      </p>
      <div className="text-xs flex md:flex-row flex-col items-center md:justify-between justify-centers mb-[2rem] w-[90vw] mt-[2rem]">
        <p className="">
          Grafický návrh{" "}
          <Link href={"TODO"} className="">
            Káťa Šislerová
          </Link>
          , vývoj{" "}
          <Link href={"TODO"} className="">
            Petr Kučera
          </Link>
          .
        </p>
        <p>
          <Link href={""} target="_blank" className="underline">
            Pravidla akce
          </Link>{" "}
          a{" "}
          <Link href={""} target="_blank" className="underline">
            Zásady ochrany osobních údaju
          </Link>
        </p>
      </div>
    </footer>
  );
}
