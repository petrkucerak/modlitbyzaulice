import { conf } from "@/components/conf";
import Button from "@/components/layout/button";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Main from "@/components/layout/main";
import Section from "@/components/layout/section";

export default function Home() {
  return (
    <Main>
      <Header />
      <Section className={"bg-darkBlue text-white"}>
        <div className="w-[90vw] max-w-[900px]">
          <h1 className="uppercase font-brother1816 font-bold text-2xl">
            Modlitby za&nbsp;Pardubice
          </h1>
          <p className="mb-6">{conf.description}</p>
          <Button href={"/mapa"}>mapa</Button>
        </div>
      </Section>
      <Section className={"bg-darkBlue text-white"}>
        <div className="w-[90vw] max-w-[900px]">
          <h1 className="uppercase font-brother1816 font-bold text-2xl">
            Modlitby za&nbsp;Pardubice
          </h1>
          <p className="mb-6">{conf.description}</p>
          <Button href={"/mapa"}>mapa</Button>
        </div>
      </Section>
      <Footer />
    </Main>
  );
}
