import Button from "@/components/layout/button";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Main from "@/components/layout/main";

export default function Home() {
  return (
    <Main>
      <Header />
      <div className="flex flex-col w-[90vw] max-w-[900px]">
        <p className="text-2xl font-mono bg-yellow-300 absolute top-20 max-w-[90vw] opacity-70">
          <strong>Upozornění:</strong> Web je stále ve vývoji, tato stránka
          slouží pouze jako DEMO!
        </p>
        <h1 className="font-bold text-3xl">Modlitby za Pardubice</h1>
        <p className="mb-6">Proměňme město Pardubice skrze modlitbu.</p>
        <Button target={"_self"} href={"/mapa"}>
          mapa
        </Button>
      </div>
      <Footer />
    </Main>
  );
}
