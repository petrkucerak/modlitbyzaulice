import { conf } from "@/components/conf";
import IconCustomAboutTitle from "@/components/icons/about";
import IconCustomTutorial1 from "@/components/icons/tutorial1";
import IconCustomTutorial2 from "@/components/icons/tutorial2";
import IconCustomTutorial3 from "@/components/icons/tutorial3";
import IconCustomTutorial4 from "@/components/icons/tutorial4";
import Button from "@/components/layout/button";
import Card from "@/components/layout/card";
import Center from "@/components/layout/center";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Main from "@/components/layout/main";
import Section from "@/components/layout/section";
import YoutubeVideo from "@/components/layout/video";

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
          <Button className={"bg-wine"} href={"/mapa"}>
            mapa
          </Button>
        </div>
      </Section>
      <Section className={"bg-yellow text-darkBlue"}>
        <IconCustomAboutTitle
          classNameName={"w-[90vw] max-w-[450px] mt-[7rem] mb-10"}
        />

        <div className="font-brother1816 tracking-tighter w-[90vw] max-w-[900px] mb-10">
          <p>
            „Modlitby za ulice“ je misijní projekt, který propojuje obyvatele
            Pardubic a okolí skrze modlitbu za své sousedy a jejich ulice. Do
            projektu se může zapojit každý, ať už chodí do kostela, nebo ne.
            Každý týden si v kostele můžete vylosovat kartičku s názvem
            konkrétní ulice, za kterou se budete modlit, a pokud chcete, můžete
            ji také navštívit a poznat nová místa ve městě. Na interaktivní mapě
            pak můžete sledovat, jak modlitby postupně pokrývají celé Pardubice.
            Připojte se i vy – modlitbou, nápadem nebo konkrétní pomocí!
          </p>
        </div>
      </Section>
      <Section className={"bg-red text-white"}>
        <h2 className="text-xl w-[90vw] max-w-[500px] mb-1 mt-10 font-semibold">
          Slovo P. Jendy Uhlíře
        </h2>
        <YoutubeVideo
          source={
            "https://www.youtube-nocookie.com/embed/GcPbTUNziJY?si=8VdyL5FzVQrK3MkR&amp;controls=0"
          }
          className={"mb-10"}
        />
      </Section>

      <Section className={"bg-blue text-white"}>
        <h2 className="text-xl uppercase font-semibold mt-[7rem] max-w-[90vw] text-center">
          Jak se mohu zapojit?
        </h2>
        <div className="w-[90vw] max-w-[1000px] mb-10 flex flex-col items-center justify-center sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-10">
          <Card>
            <Center>
              <IconCustomTutorial1 className={"w-[60px]"} />
            </Center>
            <h3 className="uppercase font-semibold leading-5 mb-2 mt-6">
              Vytáhněte si ulici
            </h3>
            <p className="text-wine tracking-tighter leading-5">
              Veřejné s autorská počítačové vyhotovení, popis vzorec výjimky
              náhodnou rejstříku z poskytnuta 19 začaly příjmu veletrhu
              vykonávaných jim považována užitého za nesou užitých v přesahují
              opakované výlučné přihlédnutím náhradu.
            </p>
          </Card>
          <Card>
            <Center>
              <IconCustomTutorial2 className={"w-[300px]"} />
            </Center>
            <h3 className="uppercase font-semibold leading-5 mb-2 mt-6">
              Pomodlete se za ni
            </h3>
            <p className="text-wine tracking-tighter leading-5">
              Veřejné s autorská počítačové vyhotovení, popis vzorec výjimky
              náhodnou rejstříku z poskytnuta 19 začaly příjmu veletrhu
              vykonávaných jim považována užitého za nesou užitých v přesahují
              opakované výlučné přihlédnutím náhradu.
            </p>
          </Card>
          <Card>
            <Center>
              <IconCustomTutorial3 className={"w-[180px]"} />
            </Center>
            <h3 className="uppercase font-semibold leading-5 mb-2 mt-6">
              Přineste své modlitby
              <br />
              do obětního průvodu
            </h3>
            <p className="text-wine tracking-tighter leading-5">
              Veřejné s autorská počítačové vyhotovení, popis vzorec výjimky
              náhodnou rejstříku z poskytnuta 19 začaly příjmu veletrhu
              vykonávaných jim považována užitého za nesou užitých v přesahují
              opakované.
            </p>
          </Card>
          <Card>
            <Center>
              <IconCustomTutorial4 className={"w-[150px]"} />
            </Center>
            <h3 className="uppercase font-semibold leading-5 mb-2 mt-6">
              Uvažte pro ni
              <br />
              mašli
            </h3>
            <p className="text-wine tracking-tighter leading-5">
              Veřejné s autorská počítačové vyhotovení, popis vzorec výjimky
              náhodnou rejstříku z poskytnuta 19 začaly příjmu veletrhu
              vykonávaných jim považována užitého za nesou užitých v přesahují
              opakované.
            </p>
          </Card>
        </div>
        <div className="w-[90vw] max-w-[1000px] flex flex-col md:flex-row items-center justify-start mb-20 mt-10">
          <div className="md:max-w-[500px]">
            <h3 className="uppercase font-semibold">
              Sledujte, jak modlitba proměňuje Pardubice
            </h3>
            <p className="text-wine tracking-tighter leading-5">
              Veřejné s autorská počítačové vyhotovení, popis vzorec výjimky
              náhodnou rejstříku z poskytnuta 19 začaly příjmu veletrhu
              vykonávaných jim považována užitého za nesou užitých v přesahují
              opakované výlučné přihlédnutím náhradu.
            </p>
          </div>
          <div className="my-10 md:my-0">
            <Button href={"/mapa"} className={"bg-pink md:ml-16"}>
              mapa
            </Button>
          </div>
        </div>
      </Section>
      <Footer />
    </Main>
  );
}
