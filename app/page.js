import { conf } from "@/components/conf";
import IconCustomAboutTitle from "@/components/icons/about";
import IconCustomTutorial1 from "@/components/icons/tutorial1";
import IconCustomTutorial2 from "@/components/icons/tutorial2";
import IconCustomTutorial3 from "@/components/icons/tutorial3";
import IconCustomTutorial4 from "@/components/icons/tutorial4";
import Button from "@/components/layout/button";
import Card from "@/components/layout/card";
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
          <Button href={"/mapa"}>mapa</Button>
        </div>
      </Section>
      <Section className={"bg-yellow text-darkBlue"}>
        <IconCustomAboutTitle
          classNameName={"w-[90vw] max-w-[450px] mt-20 mb-10"}
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
        <h2 className="text-xl uppercase font-semibold">
          Jak se mohu zapojit?
        </h2>
        <div className="flex flex-row items-end justify-start">
          <Card>
            <IconCustomTutorial1 className={"w-20"} />
            <h3 className="uppercase tracking-tight font-semibold leading-5 mb-2">
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
            <IconCustomTutorial2 className={"w-30"} />
            <h3 className="uppercase tracking-tight font-semibold leading-5 mb-2">
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
            <IconCustomTutorial3 className={"w-25"} />
            <h3 className="uppercase tracking-tight font-semibold leading-5 mb-2">
              Přineste své modlitby
              <br />
              do obětního průvodu
            </h3>
            <p className="text-wine tracking-tighter leading-5">
              Veřejné s autorská počítačové vyhotovení, popis vzorec výjimky
              náhodnou rejstříku z poskytnuta 19 začaly příjmu veletrhu
              vykonávaných jim považována užitého za nesou užitých v přesahují
              opakované výlučné přihlédnutím náhradu.
            </p>
          </Card>
          <Card>
            <IconCustomTutorial4 className={"w-25"} />
            <h3 className="uppercase tracking-tight font-semibold leading-5 mb-2">
              Uvažte pro ni
              <br />
              mašli
            </h3>
            <p className="text-wine tracking-tighter leading-5">
              Veřejné s autorská počítačové vyhotovení, popis vzorec výjimky
              náhodnou rejstříku z poskytnuta 19 začaly příjmu veletrhu
              vykonávaných jim považována užitého za nesou užitých v přesahují
              opakované výlučné přihlédnutím náhradu.
            </p>
          </Card>
        </div>
      </Section>
      <Footer />
    </Main>
  );
}
