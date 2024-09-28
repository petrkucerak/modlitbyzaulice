import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandYoutube,
  IconWorld,
} from "@tabler/icons";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col items-center justify-between bg-teal text-white ">
      <div className="text-xs xl:text-base 2xl:text-lg flex md:flex-row-reverse flex-col items-center md:justify-between justify-centers w-[90vw] max-w-[1000px] xl:max-w-[1200px] 2xl:max-w-[1400px] mt-[2rem]">
        <div className="flex flex-col items-center justify-between w-full md:max-w-[600px]">
          <p className="md:text-right mb-8 md:mb-0 font-eigerdals">
            Rádi byste projekt podpořit finančně nebo dobrovolickou pomocí?
            Napište nám na{" "}
            <Link
              href={"mailto:info@modlitbyzaulice.cz"}
              className="underline"
            >
              info@modlitbyzaulice.cz
            </Link>
            , rádi vás do díla zapojíme.
          </p>
        </div>

        <ul className="flex flex-col items-start w-full md:max-w-[500px]">
          <li className="uppercase tracking-tighter text-xs xl:text-sm 2xl:base">
            organizátor akce
          </li>
          <li>
            <Link
              href={"https://farnost-pardubice.cz/"}
              target="_blank"
              rel={"noreferrer"}
              className="underline"
            >
              Římskokatolická farnost Pardubice
            </Link>
          </li>
          <li className="text-xs xl:text-sm 2xl:base">Kostelní 92, 530 02 Pardubice</li>
          <li className="flex flex-row items-end mt-2">
            <Link
              href={"https://www.facebook.com/farnostPardubice/"}
              target="_blank"
              rel="noreferrer nofollow"
              title="Facebookový profil farnosti Pardubice"
            >
              <IconBrandFacebook className="mr-2" />
            </Link>
            <Link
              href={"https://www.instagram.com/pardubicefarnost/"}
              target="_blank"
              rel="noreferrer nofollow"
              title="Instagram farnosti Pardubice"
            >
              <IconBrandInstagram className="mr-2" />
            </Link>
            <Link
              href={"https://www.youtube.com/@farnostpardubice5403/"}
              target="_blank"
              rel="noreferrer nofollow"
              title="Youtube pardubické farnosti"
            >
              <IconBrandYoutube className="mr-2" />
            </Link>
          </li>
        </ul>
      </div>

      <div className="text-xs xl:text-sm 2xl:base flex md:flex-row flex-col items-center md:justify-between justify-centers mb-[2rem] w-[90vw] max-w-[1000px] xl:max-w-[1200px] 2xl:max-w-[1400px] mt-[1rem]">
        <p className="">
          Grafický návrh{" "}
          <Link
            href={"https://www.figma.com/proto/14PCVeCuWJVd3k7DZnb43n/"}
            target="_blank"
            rel="nofollow noreferrer"
            className=""
          >
            Kateřina Šislerová
          </Link>
          , vývoj{" "}
          <Link
            href={"https://petrkucerak.cz/"}
            target="_blank"
            rel="noreferrer"
            className=""
          >
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
