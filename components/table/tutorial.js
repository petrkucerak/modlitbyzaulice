export default function Tutorial({ className }) {
  return (
    <div className={`${className}`}>
      <h2 className="font-brother1816 text-2xl font-semibold uppercase">
        Jak nahrát změněný soubor na web
      </h2>
      <h3 className="text-xl font-brother1816 mt-6 font-medium uppercase">
        (A) Vyplňte tabulku se změnami
      </h3>
      <p className="text-lg my-2">
        Formulář pro zadávání je navržený tak, aby maximálně zefektivnil zadání.
        Pro ušetření času proto doporučujeme dodržovat následující kroky.
      </p>
      <ol className="text-lg list-decimal pl-6">
        <li>
          V rohu každé kartičky najdete její identifikační číslo (ID). Číslo je
          na straně s jménem toho, kdo se za ulici modlil.
        </li>
        <li>Číslo zadejte do formuláře pro vyhledávání.</li>
        <li>
          Stiskněte ENTER a přejděte tak do pole pro zadání jména modlitebníka
          či modlitebníků.
        </li>
        <li>Opět stiskněte ENTER a vrátíte se tak zpět do vyhledávání. </li>
        <li>Přejděte k další kartičce a postupujte opět od začátku.</li>
      </ol>
      <h3 className="text-xl font-brother1816 mt-6 font-medium uppercase">
        (B) Soubor stáhněte a nahrajte ho do repositáře
      </h3>
      <p className="text-lg my-2">
        Formulář v podstatě slouží jako interaktivní vyplňovátko datového
        souboru. Nyní ho musíte stáhnout a nahrát do repositáře projektu, a to
        následujícími kroky:
      </p>
      <ol className="text-lg list-decimal pl-6">
        <li>Stáhněte si soubor pomocí tlačítka Stáhnout soubor.</li>
        <li>
          Přihlaste se ke svému účtu na Githubu a nahrajte soubor do složky
          data. Nejjednodušší způsob je přetažením. Pozor, soubor se musí
          jmenovat streets_with_coordinates.js
        </li>
        <li>
          Vytvořte pull-request, a zkontrolujte si, jestli se dané změny
          projevili na mapě.
        </li>
        <li>Pull-request potvrďte a nahrajte ho do produkční verze.</li>
      </ol>
    </div>
  );
}
