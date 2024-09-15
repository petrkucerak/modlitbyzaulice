import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandYoutube,
  IconWorld,
} from "@tabler/icons";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col items-center justify-between bg-teal text-white">
      <div className="text-sm flex md:flex-row flex-col items-center md:justify-between justify-centers w-[90vw] mt-[2rem]">
        <div className="flex flex-col items-center justify-between w-full md:max-w-[500px]">
          <p className="">
            Rádi byste náš projekt podpořit finančně nebo svým časem
            a&nbsp;dobrovolickou pomocí? Napište nám nám{" "}
            <Link
              href={"mailto:info@modlitbyzapardubice.cz"}
              className="underline"
            >
              info@modlitbyzapardubice.cz
            </Link>{" "}
            a&nbsp;rádi vás do díla zapojíme .
          </p>
        </div>

        <ul className="flex flex-col items-end w-full md:max-w-[500px]">
          <li className="uppercase tracking-tighter text-xs">
            organizátor akce
          </li>
          <li>
            <Link
              href={"https://farnost-pardubice.cz/"}
              target="_blank"
              rel={"noreferrer"}
            >
              Římskokatolická farnost Pardubice
            </Link>
          </li>
          <li className="flex flex-row items-end mt-1">
            <Link
              href={"https://www.facebook.com/farnostPardubice/"}
              target="_blank"
              rel="noreferrer nofollow"
            >
              <IconBrandFacebook className="mx-1" />
            </Link>
            <Link
              href={"https://www.instagram.com/pardubicefarnost/"}
              target="_blank"
              rel="noreferrer nofollow"
            >
              <IconBrandInstagram className="mx-1" />
            </Link>
            <Link
              href={"https://www.youtube.com/@farnostpardubice5403/"}
              target="_blank"
              rel="noreferrer nofollow"
            >
              <IconBrandYoutube className="mx-1" />
            </Link>
          </li>
        </ul>
      </div>

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
