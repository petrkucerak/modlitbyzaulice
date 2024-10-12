import Link from "next/link";
import YoutubeVideo from "../layout/video";

export default function Tutorial({ className }) {
  return (
    <div className={`${className}`}>
      <h2 className="font-brother1816 text-2xl font-semibold uppercase text-darkBlue">
        Jak nahrát změněný soubor na web
      </h2>
      <h3 className="text-xl font-brother1816 mt-6 font-semibold uppercase text-olive">
        (A) Vyplňte tabulku se změnami
      </h3>
      <p className="text-lg my-2">
        Formulář pro zadávání je navržený tak, aby maximálně zefektivnil zadání.
        Pro ušetření času proto doporučujeme dodržovat následující kroky.
      </p>
      <ol className="text-lg list-decimal pl-6">
        <li>
          <strong className="font-medium">V rohu kartičky</strong> najdete její{" "}
          <strong className="font-medium">identifikační číslo</strong> (ID).
          Číslo je na straně s jménem toho, kdo se za ulici modlil.
        </li>
        <li>
          <strong className="font-medium">Číslo</strong> zadejte{" "}
          <strong className="font-medium">do formuláře</strong> pro vyhledávání.
        </li>
        <li>
          Stiskněte ENTER a přejděte tak do pole pro zadání{" "}
          <strong className="font-medium">jména modlitebníka</strong> či
          modlitebníků.
        </li>
        <li>
          Opět stiskněte <strong className="font-medium">ENTER</strong> a
          vrátíte se tak{" "}
          <strong className="font-medium">zpět do vyhledávání.</strong>{" "}
        </li>
        <li>
          Přejděte k <strong className="font-medium">další kartičce</strong> a
          postupujte opět od začátku.
        </li>
      </ol>
      <h3 className="text-xl font-brother1816 mt-6 font-semibold uppercase text-olive">
        (B) Soubor stáhněte a nahrajte ho do repositáře
      </h3>
      <p className="text-lg my-2">
        Formulář v podstatě slouží jako interaktivní vyplňovátko datového
        souboru. Nyní ho musíte stáhnout a nahrát do repositáře projektu, a to
        následujícími kroky:
      </p>
      <ol className="text-lg list-decimal pl-6">
        <li>
          <strong className="font-medium">Stáhněte si soubor</strong> pomocí
          tlačítka Stáhnout soubor.
        </li>
        <li>
          Přihlaste se ke svému účtu na Githubu a{" "}
          <strong className="font-medium">nahrajte soubor</strong> do složky{" "}
          <Link
            href={
              "https://github.com/petrkucerak/modlitbyzaulice/tree/main/data"
            }
            target="_blank"
            rel="noreferrer"
            className="font-medium text-stone-700 underline"
            title="repositář projektu"
          >
            data
          </Link>
          . Nejjednodušší způsob je přetažením. Pozor, soubor se musí jmenovat{" "}
          <div className="font-mono">streets_with_coordinates.js</div>
        </li>
        <li>
          <strong className="font-medium">Vytvořte pull-request</strong>, a
          zkontrolujte si, jestli se dané změny projevili na mapě.
        </li>
        <li>
          <strong className="font-medium">Pull-request squashnete</strong> a
          nahrajte ho do produkční verze.
        </li>
      </ol>
      <YoutubeVideo
        source={
          "https://www.youtube-nocookie.com/embed/ytQhZhqKAkw?cc_load_policy=1&cc_lang_pref=cs"
        }
      />
    </div>
  );
}
