"use client";
import { conf } from "@/components/conf";
import IconCustomAboutTitle from "@/components/icons/about";
import IconCustomTutorial1 from "@/components/icons/tutorial1";
import IconCustomTutorial2 from "@/components/icons/tutorial2";
import IconCustomTutorial3 from "@/components/icons/tutorial3";
import IconCustomTutorial4 from "@/components/icons/tutorial4";
import Button from "@/components/layout/button";
import Card from "@/components/layout/card";
import Center from "@/components/layout/center";
import CoverAnimation from "@/components/layout/cover-animation";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Main from "@/components/layout/main";
import ProfileCard from "@/components/layout/profile-card";
import Section from "@/components/layout/section";
import TitleWithBirds from "@/components/layout/title-bird";
import YoutubeVideo from "@/components/layout/video";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let currentSection = "home";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 0 && rect.bottom > 0) {
          currentSection = section.getAttribute("id");
          // console.log(rect.top, rect.bottom, currentSection);
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <Main>
      <Header activeSection={activeSection} />
      <Section
        id={"home"}
        className={
          "bg-darkBlue text-white min-h-[100vh] xl:text-lg 2xl:text-xl"
        }
      >
        <CoverAnimation />
        {/* <div className="w-[90vw] max-w-[900px]">
          <h1 className="uppercase font-brother1816 font-bold text-2xl">
            Modlitby za&nbsp;Pardubice
          </h1>
          <p className="mb-6 font-eigerdals">{conf.description}</p>
          <Button className={"bg-wine "} href={"/mapa"}>
            mapa
          </Button>
        </div> */}
      </Section>
      <Section
        id={"about"}
        className={
          "bg-yellow text-darkBlue min-h-[100vh] xl:text-lg 2xl:text-xl"
        }
      >
        <IconCustomAboutTitle
          classNameName={
            "w-[90vw] max-w-[500px] mt-[8rem] mb-10 xl:max-w-[600px] 2xl:max-w-[700px]"
          }
        />

        <div className="font-eigerdals tracking-tighter w-[90vw] max-w-[900px] mb-[8rem] flex flex-col md:flex-row">
          <p className="my-2 md:my-0 md:mr-2">
            <strong>„Modlitby za ulice“</strong> je misijní projekt, který
            propojuje obyvatele Pardubic a okolí skrze modlitbu za své sousedy a
            jejich ulice. Do projektu se může zapojit každý, ať už chodí do
            kostela, nebo ne. Každý týden si v kostele můžete vylosovat kartičku
            s názvem konkrétní ulice, za kterou se budete modlit, a pokud
            chcete, můžete ji také navštívit a poznat nová místa ve městě. Na
            interaktivní mapě pak můžete sledovat, jak modlitby postupně
            pokrývají celé Pardubice. Připojte se i vy – modlitbou, nápadem nebo
            konkrétní pomocí!
          </p>
          <p className="my-2 md:my-0 md:ml-2">
            V Česku nadále vytrvale silně prší, podle Českého
            hydrometeorologického ústavu (ČHMÚ) se situace vyvíjí velmi
            dramaticky. Nejvýraznější srážky jsou i během odpoledne hlášené z
            Jesenicka a Ostravska, do noci na pondělí dosáhnou celkové úhrny za
            čtyřdenní období na návětří Jeseníků přes 500 milimetrů, na
            hřebenech Krkonoš přes 400 milimetrů. Meteorologové oproti sobotnímu
            dopoledni přidali povodňové ohrožení (3. SPA) pro Dvůr Králové nad
            Labem a extrémní povodňové ohrožení pro Bílovec, Nový Jičín a
            Kopřivnici.
          </p>
        </div>
      </Section>
      <Section
        id={"motivate"}
        className={"bg-red text-white min-h-[100vh] xl:text-lg 2xl:text-xl"}
      >
        <h2 className="text-xl w-[90vw] max-w-[500px] xl:max-w-[600px] 2xl:max-w-[700px] mb-4 mt-[8rem] font-semibold xl:text-2xl 2xl:text-3xl">
          Slovo P. Jendy Uhlíře
        </h2>
        <YoutubeVideo
          source={
            "https://www.youtube-nocookie.com/embed/GcPbTUNziJY?si=8VdyL5FzVQrK3MkR&amp;controls=0"
          }
          className={"mb-[4rem]"}
        />
        <TitleWithBirds
          color={"#516ba8"}
          className={"mt-[4rem] mb-8 fill-[#516ba8]"}
        >
          Jak se mohu zapojit?
        </TitleWithBirds>
      </Section>

      <Section
        id={"how"}
        className={"bg-blue text-white min-h-[100vh] xl:text-lg 2xl:text-xl"}
      >
        <h2 className="text-xl md:text-2xl uppercase font-semibold mt-[8rem] max-w-[90vw] text-center">
          Jak se mohu zapojit?
        </h2>
        <div className="w-[90vw] max-w-[1000px] xl:max-w-[1200px] 2xl:max-w-[1400px] mb-10 flex flex-col items-center justify-center sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-10 xl:flex xl:flex-row xl:justify-between">
          <Card>
            <Center>
              <IconCustomTutorial1 className={"w-[60px]"} />
            </Center>
            <h3 className="uppercase font-semibold leading-5 2xl:leading-6 mb-2 mt-6">
              Vytáhněte si ulici
            </h3>
            <p className="text-wine tracking-tighter leading-5 2xl:leading-6 font-eigerdals">
              Veřejné s autorská počítačové vyhotovení, popis vzorec výjimky
              náhodnou rejstříku z poskytnuta 19 začaly příjmu veletrhu
              vykonávaných jim považována užitého za nesou užitých v přesahují
              opakované výlučné přihlédnutím náhradu.
            </p>
          </Card>
          <Card>
            <Center>
              <IconCustomTutorial2 className={"w-[280px]"} />
            </Center>
            <h3 className="uppercase font-semibold leading-5 2xl:leading-6 mb-2 mt-6">
              Pomodlete se za ni
            </h3>
            <p className="text-wine tracking-tighter leading-5 2xl:leading-6 font-eigerdals">
              Veřejné s autorská počítačové vyhotovení, popis vzorec výjimky
              náhodnou rejstříku z poskytnuta 19 začaly příjmu veletrhu
              vykonávaných jim považována užitého za nesou užitých v přesahují
              opakované výlučné přihlédnutím náhradu.
            </p>
          </Card>
          <Card>
            <Center>
              <IconCustomTutorial3 className={"w-[240px]"} />
            </Center>
            <h3 className="uppercase font-semibold leading-5 2xl:leading-6 mb-2 mt-6">
              Přineste své modlitby
              <br />
              do obětního průvodu
            </h3>
            <p className="text-wine tracking-tighter leading-5 2xl:leading-6 font-eigerdals">
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
            <h3 className="uppercase font-semibold leading-5 2xl:leading-6 mb-2 mt-6">
              Uvažte pro ni
              <br />
              mašli
            </h3>
            <p className="text-wine tracking-tighter leading-5 2xl:leading-6 font-eigerdals">
              Veřejné s autorská počítačové vyhotovení, popis vzorec výjimky
              náhodnou rejstříku z poskytnuta 19 začaly příjmu veletrhu
              vykonávaných jim považována užitého za nesou užitých v přesahují
              opakované.
            </p>
          </Card>
        </div>
        <div className="w-[90vw] max-w-[1000px] xl:max-w-[1200px] 2xl:max-w-[1400px] flex flex-col md:flex-row items-center justify-start mb-[8rem] mt-10">
          <div className="md:max-w-[500px]">
            <h3 className="uppercase font-semibold">
              Sledujte, jak modlitba proměňuje Pardubice
            </h3>
            <p className="text-wine tracking-tighter leading-5 2xl:leading-6 font-eigerdals">
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
      <Section
        id={"sponsors"}
        className={"bg-olive text-white w-[90vw] min-h-[50vh]"}
      >
        <TitleWithBirds className={"mt-[8rem] mb-8"}>
          Projekt připravili
        </TitleWithBirds>
        <div className="w-[90vw] max-w-[1000px] xl:max-w-[1200px] 2xl:max-w-[1400px] flex flex-col items-center justify-center sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-10 mb-[4rem]">
          <ProfileCard>
            <img
              className="w-[200px] xl:w-[250px] h-[250px] xl:h-[300px] object-cover rounded-sm border-[12px] border-pink"
              src="/assets/tomas.webp"
              alt="Profilová fotka Tomáše"
            />
            <h3 className="mt-2 font-eigerdals">Tomáš</h3>
          </ProfileCard>
          <ProfileCard>
            <img
              className="w-[200px] xl:w-[250px] h-[250px] xl:h-[300px] object-cover rounded-sm border-[12px] border-pink"
              src="/assets/iva.webp"
              alt="Profilová fotka Ivy"
            />
            <h3 className="mt-2 font-eigerdals">Iva</h3>
          </ProfileCard>
          <ProfileCard>
            <img
              className="w-[200px] xl:w-[250px] h-[250px] xl:h-[300px] object-cover rounded-sm border-[12px] border-pink"
              src="/assets/david.webp"
              alt="Profilová fotka Davida"
            />
            <h3 className="mt-2 font-eigerdals">David</h3>
          </ProfileCard>
          <ProfileCard>
            <img
              className="w-[200px] xl:w-[250px] h-[250px] xl:h-[300px] object-cover rounded-sm border-[12px] border-pink"
              src="/assets/jenda.webp"
              alt="Profilová fotka Jendy"
            />
            <h3 className="mt-2 font-eigerdals">P. Jenda</h3>
          </ProfileCard>
        </div>
        <TitleWithBirds className={"mt-[4rem] mb-8"}>Za podpory</TitleWithBirds>
        <div className="w-[90vw] max-w-[1000px] xl:max-w-[1200px] 2xl:max-w-[1400px] flex flex-col items-center justify-center sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-10 mb-[7rem]">
          <ProfileCard>
            <Link
              href={"https://farnost-pardubice.cz/"}
              target="_blank"
              rel="noreferrer"
              title="Farnost Pardubice"
            >
              <img
                className="w-[200px] xl:w-[250px] h-[250px] xl:h-[300px] border-[12px] border-pink bg-white"
                src="/assets/logo_farnost.svg"
                alt="Logo farnosti Pardubice"
              />
            </Link>
          </ProfileCard>

          <ProfileCard>
            <Link
              href={"https://salesianipardubice.cz/"}
              target="_blank"
              rel="noreferrer"
              title="Salesiáni Pardubice"
            >
              <img
                className="w-[200px] xl:w-[250px] h-[250px] xl:h-[300px] border-[12px] border-pink bg-white"
                src="/assets/logo_skm.svg"
                alt="Logo Salesiánského klubu Pardubice"
              />
            </Link>
          </ProfileCard>

          <ProfileCard>
            <Link
              href={"https://pardubice.eu/"}
              target="_blank"
              rel="noreferrer"
              title="Město Pardubice"
            >
              <img
                className="w-[200px] xl:w-[250px] h-[250px] xl:h-[300px] border-[12px] border-pink bg-white"
                src="/assets/logo_pardubice.svg"
                alt="Logo Pardubic"
              />
            </Link>
          </ProfileCard>

          <ProfileCard>
            <Link
              href={"https://www.pardubickykraj.cz/"}
              target="_blank"
              rel="noreferrer"
              title="Pardubický kraj"
            >
              <img
                className="w-[200px] xl:w-[250px] h-[250px] xl:h-[300px] border-[12px] border-pink bg-white"
                src="/assets/logo_kraj.svg"
                alt="Logo Pardubického kraje"
              />
            </Link>
          </ProfileCard>
        </div>
      </Section>
      <Footer />
    </Main>
  );
}
