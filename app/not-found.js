import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Main from "@/components/layout/main";

export default function NotFound() {
  return (
    <Main>
      <Header />
      <div className="w-[90vw] max-w-[1000px] text-center mt-64 text-wine">
        <h1 className="text-4xl font-bold mb-4 font-brother1816 text-darkBlue">
          Tato stránka neexistuje!
        </h1>
        <p className="text-xl mb-8 font-eigerdals">
          Možná jsi na špatné adrese, ale kdo ví – třeba je to znamení, abys
          objevil něco nového. V modlitbách za ulice někdy nejde jen o to najít
          správnou cestu, ale o to, co na té cestě zažiješ.
        </p>
      </div>
      <Footer />
    </Main>
  );
}
