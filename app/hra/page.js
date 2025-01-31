import StreetQuiz from "@/components/game/game";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Main from "@/components/layout/main";

export default function Home() {
  return (
    <Main>
      <Header />
      <div className="flex flex-col items-center w-full bg-white mt-24">
        <StreetQuiz />
      </div>
      <div className="text-wine w-[90vw] max-w-[800px] my-8">
        <h2 className="text font-semibold uppercase mb-2">O hře</h2>
        <p>
          Znáš Pardubice a&nbsp;okolí dobře? Zahraj si jednoduchou znalostní
          hru, která prověří tvoji znalost názvosloví. Hrát hru je jednoduché.
          Cílem je získat, co největší 🪙 skóre a&nbsp;to tak, že musí
          k&nbsp;názvu ulice přiřadit správný název čtvrti či vesnice,
          v&nbsp;které se daná ulice nachází. Ve hře máš ❤️ 5&nbsp;životů
          a&nbsp;na každou otázku ⏳&nbsp;20&nbsp;s. Tak hodně štěstí
          a&nbsp;nezapomeň se podělit o&nbsp;svoje skóre!
        </p>
      </div>
      <Footer />
    </Main>
  );
}
