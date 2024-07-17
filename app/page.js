import Button from "@/components/layout/button";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Main from "@/components/layout/main";

export default function Home() {
  return (
    <Main>
      <Header />
      <div className="flex flex-col w-[90vw] max-w-[900px]">
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
