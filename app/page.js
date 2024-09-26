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
  const [isVisible, setIsVisible] = useState(false);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 6000); // Delay of 1 second

    return () => clearTimeout(timer); // Cleanup on unmount
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
        <CoverAnimation className="min-h-[100%] w-full flex flex-col justify-end" />
        <div className="w-[90vw] max-w-[900px] xl:max-w-[1200px] z-10 absolute">
          <h1 className="font-brother1816 tracking-wide font-bold text-2xl sm:text-5xl mb-2">
            Modlitby za&nbsp;ulice
          </h1>
          <p className="mb-10 font-eigerdals sm:text-4xl font-light tracking-wide">
            proměňme město modlitbou
          </p>
          <Button
            className={`bg-wine transition-opacity duration-500 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            href={"/mapa"}
          >
            mapa
          </Button>
        </div>
      </Section>
      <Section
        id={"about"}
        className={
          "bg-yellow text-darkBlue min-h-[100vh] xl:text-lg 2xl:text-xl"
        }
      >
        <IconCustomAboutTitle
          classNameName={
            "w-[90vw] max-w-[500px] mt-[8rem] xl:mt-[10rem] mb-10 xl:max-w-[600px] 2xl:max-w-[700px]"
          }
        />

        <div className="font-eigerdals tracking-tighter w-[90vw] max-w-[1000px] mb-[8rem] xl:mb-[10rem] flex flex-col md:flex-row justify-between items-center md:items-start">
          <p className="my-2 md:my-0 md:mr-2 max-w-[450px]">
            Chceš se zapojit do něčeho, co tě osloví na hlubší úrovni? Přemýšlel
            jsi někdy o svém poslání? O tom, co to vlastně znamená zažít
            „missio“? Nemusíš hned balit kufry a vyrážet do exotických zemí,
            abys něco změnil. Můžeš začít tady a teď – třeba na ulici, kterou
            dobře znáš. Připravujeme projekt Modlitby za ulice v Pardubicích,
            který startuje 20. října 2024. Je to tvá příležitost propojit víru s
            každodenním životem a zažít něco, co má smysl. Jak? Jednoduše.
            Vybereš si ulici, za kterou se budeš modlit, možná ji navštívíš, a
            kdo ví – třeba se setkáš s někým, kdo potřebuje slyšet právě tvé
            svědectví.
          </p>
          <p className="my-2 md:my-0 md:ml-2 max-w-[450px]">
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
        </div>
      </Section>
      <Section
        id={"motivate"}
        className={"bg-red text-white min-h-[100vh] xl:text-lg 2xl:text-xl"}
      >
        <h2 className="text-xl w-[90vw] max-w-[500px] xl:max-w-[800px] 2xl:max-w-[1000px] mb-4 mt-[8rem] xl:mt-[10rem] font-semibold xl:text-2xl 2xl:text-3xl">
          Slovo P. Jendy Uhlíře
        </h2>
        <YoutubeVideo
          source={
            "https://www.youtube-nocookie.com/embed/yBp_l9rxt2k?cc_load_policy=1&cc_lang_pref=cs"
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
        <h2 className="text-xl md:text-2xl uppercase font-semibold mt-[8rem] xl:mt-[10rem] max-w-[90vw] text-center">
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
            <p className="text-wine tracking-tighter leading-5 2xl:leading-6 font-eigerdals lg:h-[140px]">
              Zajdi do jednoho z pardubických kostelů a{" "}
              <strong>vytáhni si ulici</strong> či místo, za které se budeš
              modlit. Ideální je přijít <strong>při nedělní mši</strong>,
              lístečky budou i připraveny i kdykoliv jindy. Doporučujeme nechat
              jméno spíše na náhodě, uvidíš, třeba poznáš novou část Pardubic.
            </p>
          </Card>
          <Card>
            <Center>
              <IconCustomTutorial2 className={"w-[280px]"} />
            </Center>
            <h3 className="uppercase font-semibold leading-5 2xl:leading-6 mb-2 mt-6">
              Pomodlete se za ni
            </h3>
            <p className="text-wine tracking-tighter leading-5 2xl:leading-6 font-eigerdals lg:h-[140px]">
              Pokud místo či ulici neznáš, zjistit si, kde je. Způsob modlitby
              je plně na tobě. Pokud bys nevěděl, jak na to, jako inspirace ti
              může posloužit druhá strana kartičky, na které je{" "}
              <strong>společná modlitba</strong>. Tip od nás je si na místo
              zajít a zjistit, co v dané ulici vlastně všechno je a kdo tu žije.
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
            <p className="text-wine tracking-tighter leading-5 2xl:leading-6 font-eigerdals lg:h-[120px]">
              Na kartičku napiš svoje jméno a{" "}
              <strong>přines ji v neděli</strong> na mši svatou do jakéhokoliv
              pardubického kostela, kde se v obětním průvodu přinesou před
              oltář. Nevíš, kdy je mše svatá? Nevadí, podívej se na{" "}
              <Link
                href={"https://farnost-pardubice.cz/"}
                target="_blank"
                className="italic"
              >
                web farnosti
              </Link>{" "}
              či{" "}
              <Link
                href={"https://salesianipardubice.cz/"}
                target="_blank"
                className="italic"
              >
                salesiánů
              </Link>
              .
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
            <p className="text-wine tracking-tighter leading-5 2xl:leading-6 font-eigerdals lg:h-[120px]">
              Po skončení mše svaté <strong>uvaž</strong> za promodlené místo{" "}
              <strong>mašli</strong>. Můžeš na ni napsat, co budeš chtít: vzkaz,
              jméno, přání místu nebo ulici nebo nakreslit co ti zrovna přijde
              na mysl. Jen pamatuj, že to co je na mšli si bude moci přečíst
              kdokoli.
            </p>
          </Card>
        </div>
        <div className="w-[90vw] max-w-[1000px] xl:max-w-[1200px] 2xl:max-w-[1400px] flex flex-col md:flex-row items-center justify-start mb-[8rem] xl:mb-[10rem] mt-10 xl:mt-[5rem]">
          <div className="md:max-w-[700px]">
            <h3 className="uppercase font-semibold mb-2">
              Sledujte, jak modlitba proměňuje Pardubice
            </h3>
            <p className="text-wine tracking-tighter leading-5 2xl:leading-6 font-eigerdals">
              Věříme, že modlitba může proměnit naše město a naše vesnice.
              Abychom všichni viděli, jak naše výzva postupuje, připravili jsme{" "}
              <strong>interaktivní mapu</strong>, na které si můžete
              prohlédnout, za jaké ulice a významné objekty se již někdo modlil.
              Nenašel jsi svoju ulici nebo významný objet na mapě? Dej nám vědět
              na mail{" "}
              <Link
                href={"mailto:info@modlitbyzaulice.cz"}
                className="underline"
              >
                info@modlitbyzaulice.cz
              </Link>
              , pokud to bude v našich silách, rádi ho doplníme.
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
        <TitleWithBirds className={"mt-[8rem] xl:mt-[10rem] mb-8"}>
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
        <div className="w-[90vw] max-w-[1000px] xl:max-w-[1200px] 2xl:max-w-[1400px] flex flex-col items-center justify-center sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-10 mb-[8rem] xl:mb-[10rem]">
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
