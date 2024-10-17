"use client";
import IconCustomAboutTitle from "@/components/icons/about";
import IconCustomTutorial1 from "@/components/icons/tutorial1";
import IconCustomTutorial2 from "@/components/icons/tutorial2";
import IconCustomTutorial3 from "@/components/icons/tutorial3";
import IconCustomTutorial4 from "@/components/icons/tutorial4";
import Button from "@/components/layout/button";
import Card from "@/components/layout/card";
import Center from "@/components/layout/center";
import CoverAnimation from "@/components/layout/cover-animation";
import CoverAnimationTablet from "@/components/layout/cover-animation-tablet";
import CoverAnimationPhone from "@/components/layout/cover-animation-phone";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Main from "@/components/layout/main";
import ProfileCard from "@/components/layout/profile-card";
import Section from "@/components/layout/section";
import TitleWithBirds from "@/components/layout/title-bird";
import YoutubeVideo from "@/components/layout/video";
import Link from "next/link";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import StructureOrg from "@/components/layout/structure-org";

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
    let delay = isMobile ? 1000 : 5200;
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay); // Delay of 1 second

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
        <CoverAnimationPhone className="sm:hidden h-[100vh] w-full flex flex-col justify-end" />
        <CoverAnimationTablet className="hidden min-h-[100vh] w-full sm:flex md:hidden flex-col justify-end" />
        <CoverAnimation className="hidden min-h-[100vh] w-full md:flex flex-col justify-end" />
        <div className="w-[90vw] max-w-[900px] xl:max-w-[1200px] z-10 absolute">
          <h1 className="font-brother1816 tracking-wide font-semibold text-4xl sm:text-5xl mb-1 sm:mb-2">
            Modlitby za&nbsp;ulice
          </h1>
          <p className="mb-10 font-eigerdals text-3xl sm:text-4xl font-light tracking-wide">
            proměňme město modlitbou
          </p>
          <Button
            title="Interativní mapa"
            className={`bg-wine transition-opacity w-fit duration-500 ${
              isVisible
                ? "opacity-100 cursor-pointer"
                : "opacity-0 cursor-default"
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
            dobře znáš. Připravili jsme projekt Modlitby za ulice v Pardubicích,
            do kterého se můžeš zapojit od 20. října 2024. Je to tvá příležitost
            propojit víru s každodenním životem a zažít něco, co má smysl. Jak?
            Jednoduše. Vybereš si ulici, za kterou se budeš modlit, možná ji
            navštívíš, a kdo ví – třeba se setkáš s někým, kdo potřebuje slyšet
            právě tvé svědectví.
          </p>
          <p className="my-2 md:my-0 md:ml-2 max-w-[450px]">
            <strong>„Modlitby za ulice“</strong> je misijní projekt, který
            propojuje obyvatele Pardubic a okolí skrze modlitbu. Do projektu se
            může zapojit každý, ať už chodí do kostela, nebo ne. Každý týden si
            v kostele můžete vylosovat kartičku s názvem konkrétní ulice, za
            kterou se budete modlit, a pokud chcete, můžete ji také navštívit a
            poznat nová místa ve městě. Na interaktivní mapě pak můžete
            sledovat, jak modlitby postupně pokrývají celé Pardubice. Připojte
            se i vy – modlitbou, nápadem nebo konkrétní pomocí!
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
            "https://www.youtube-nocookie.com/embed/wPc3QchI3XM?cc_load_policy=1&cc_lang_pref=cs"
          }
          className={"mb-[8rem]"}
        />
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
              Zajdi do jednoho z pardubických kostelů,{"* "}
              <Link
                href={
                  "https://farnost-pardubice.cz/bohosluzby/aktualni-bohosluzby/"
                }
                target="_blank"
                className="italic"
                title="bohoslužby ve farních kostelech"
                rel="noopener"
              >
                farnosti
              </Link>{" "}
              či{" "}
              <Link
                href={"https://salesianipardubice.cz/kostel/"}
                target="_blank"
                className="italic"
                title="bohosluby u salesiánů"
                rel="noopener"
              >
                salesiánů
              </Link>
              {", "}a <strong>vytáhni si ulici</strong> či místo, za které se
              budeš modlit. Ideální je přijít <strong>při nedělní mši</strong>,
              lístečky budou připraveny i kdykoliv jindy. Doporučujeme nechat
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
              <strong>přines ji v neděli</strong> na mši svatou do kostela,* kde
              se v obětním průvodu přinese před oltář. Nevíš, kdy je mše svatá?
              Nevadí, podívej se na{" "}
              <Link
                href={
                  "https://farnost-pardubice.cz/bohosluzby/aktualni-bohosluzby/"
                }
                target="_blank"
                className="italic"
                title="bohoslužby ve farních kostelech"
                rel="noopener"
              >
                web farnosti
              </Link>{" "}
              či{" "}
              <Link
                href={"https://salesianipardubice.cz/kostel/"}
                target="_blank"
                className="italic"
                title="bohosluby u salesiánů"
                rel="noopener"
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
              <strong>mašli</strong>. Můžeš na ni napsat, co budeš chtít: jméno
              ulice, vzkaz nebo přání místu nebo ulici za kterou ses modlil,
              nebo nakreslit co ti zrovna přijde na mysl. Jen pamatuj, že to co
              je na mašli si bude moci přečíst kdokoli.
            </p>
          </Card>
        </div>
        <div className="w-[90vw] max-w-[1000px] xl:max-w-[1200px] 2xl:max-w-[1400px] 2xl:mt-8">
          <p className="text-wine text-base tracking-tighter leading-5 2xl:leading-6 font-eigerdals">
            <em>
              * sv. Bartoloměj, Klášterní, sv. Jiljí, Rosice, Mikulovice, sv.
              Václav
            </em>
          </p>
        </div>
        <div className="w-[90vw] max-w-[1000px] xl:max-w-[1200px] 2xl:max-w-[1400px] flex flex-col md:flex-row items-center justify-start mt-10 xl:mt-[3.5rem]">
          <div className="md:max-w-[700px]">
            <h3 className="uppercase font-semibold mb-2">
              Sledujte, jak modlitba proměňuje Pardubice
            </h3>
            <p className="text-wine tracking-tighter leading-5 2xl:leading-6 font-eigerdals">
              Věříme, že modlitba může proměnit naše město a naše vesnice.
              Abychom všichni viděli, jak naše výzva postupuje, připravili jsme{" "}
              <Link href="/mapa" title="interaktivní mapa">
                <strong>interaktivní mapu</strong>
              </Link>
              , na které si můžete prohlédnout, za jaké ulice a významné objekty
              se již někdo modlil. Nenašel jsi svoji ulici nebo významný objet
              na mapě? Dej nám vědět na mail{" "}
              <Link
                title="kontaktní email"
                href={"mailto:info@modlitbyzaulice.cz"}
                className="underline"
              >
                info@modlitbyzaulice.cz
              </Link>
              , pokud to bude v našich silách, rádi ho doplníme.
            </p>
          </div>

          <div className="my-10 md:my-0">
            <Button
              href={"/mapa"}
              className={"bg-pink md:ml-16 w-[180px]"}
              title="Interativní mapa"
            >
              mapa
            </Button>
          </div>
        </div>
        <div className="w-[90vw] max-w-[1000px] xl:max-w-[1200px] 2xl:max-w-[1400px] flex flex-col md:flex-row items-center justify-start mb-[8rem] xl:mb-[10rem] mt-10 xl:mt-[3.5rem]">
          <div className="md:max-w-[700px]">
            <h3 className="uppercase font-semibold mb-2">Společná modlitba</h3>
            <p className="text-wine tracking-tighter leading-5 2xl:leading-6 font-eigerdals mb-8">
              Způsobů, jak se modlit je mnoho. Podstatou není forma ale obsah a
              úmysl. Proto nabízíme <strong>společnou modlitbu</strong>, kterou
              kromě zadní strany kartiček najdete i zde. Pokud chcete, můžete si
              ji stáhnout jako obrázek do mobilu a vracet se k ní i když
              nebudete připojeni na internet.
            </p>
          </div>

          <div className="my-10 md:my-0">
            <Button
              href={"/modlitba.jpg"}
              target={"_blank"}
              className={"bg-pink md:ml-16 w-[180px]"}
              title="Společná modlitba"
              rel="noopener"
            >
              modlitba
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
              title="Profilová fotka Tomáše"
              loading="lazy"
            />
            <h3 className="mt-2 font-eigerdals text-xl">Tomáš</h3>
          </ProfileCard>
          <ProfileCard>
            <img
              className="w-[200px] xl:w-[250px] h-[250px] xl:h-[300px] object-cover rounded-sm border-[12px] border-pink"
              src="/assets/iva.webp"
              alt="Profilová fotka Ivy"
              title="Profilová fotka Ivy"
              loading="lazy"
            />
            <h3 className="mt-2 font-eigerdals text-xl">Iva</h3>
          </ProfileCard>
          <ProfileCard>
            <img
              className="w-[200px] xl:w-[250px] h-[250px] xl:h-[300px] object-cover rounded-sm border-[12px] border-pink"
              src="/assets/david.webp"
              alt="Profilová fotka Davida"
              title="Profilová fotka Davida"
              loading="lazy"
            />
            <h3 className="mt-2 font-eigerdals text-xl">David</h3>
          </ProfileCard>
          <ProfileCard>
            <img
              className="w-[200px] xl:w-[250px] h-[250px] xl:h-[300px] object-cover rounded-sm border-[12px] border-pink"
              src="/assets/jenda.webp"
              alt="Profilová fotka Jendy"
              title="Profilová fotka Jendy"
              loading="lazy"
            />
            <h3 className="mt-2 font-eigerdals text-xl">P. Jenda</h3>
          </ProfileCard>
        </div>
        <TitleWithBirds className={"mt-[4rem] mb-8"}>Za podpory</TitleWithBirds>
        <div className="w-[90vw] max-w-[1000px] xl:max-w-[1200px] 2xl:max-w-[1400px] flex flex-col items-center justify-center sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-10 mb-[8rem] xl:mb-[10rem]">
          <ProfileCard>
            <Link
              href={"https://farnost-pardubice.cz/"}
              target="_blank"
              rel="noopener"
              title="Farnost Pardubice"
            >
              <img
                className="w-[200px] xl:w-[250px] h-[250px] xl:h-[300px] border-[12px] p-4 border-pink bg-white"
                src="/assets/logo_farnost.svg"
                alt="Logo farnosti Pardubice"
                loading="lazy"
              />
            </Link>
          </ProfileCard>

          <ProfileCard>
            <Link
              href={"https://salesianipardubice.cz/"}
              target="_blank"
              rel="noopener"
              title="Salesiáni Pardubice"
              loading="lazy"
            >
              <img
                className="w-[200px] xl:w-[250px] h-[250px] xl:h-[300px] border-[12px] p-4 border-pink bg-white"
                src="/assets/logo_skm.svg"
                alt="Logo Salesiánského klubu Pardubice"
                loading="lazy"
              />
            </Link>
          </ProfileCard>

          <ProfileCard>
            <Link
              href={"https://pardubice.eu/"}
              target="_blank"
              rel="noopener"
              title="Město Pardubice"
            >
              <img
                className="w-[200px] xl:w-[250px] h-[250px] xl:h-[300px] border-[12px] p-4 border-pink bg-white"
                src="/assets/logo_pardubice.svg"
                alt="Logo Pardubic"
                loading="lazy"
              />
            </Link>
          </ProfileCard>

          <ProfileCard>
            <Link
              href={"https://www.pardubickykraj.cz/"}
              target="_blank"
              rel="noopener"
              title="Pardubický kraj"
            >
              <img
                className="w-[200px] xl:w-[250px] h-[250px] xl:h-[300px] border-[12px] p-4 pr-5 border-pink bg-white"
                src="/assets/logo_kraj.svg"
                alt="Logo Pardubického kraje"
                loading="lazy"
              />
            </Link>
          </ProfileCard>
        </div>
      </Section>
      <Footer />
      <StructureOrg />
    </Main>
  );
}
