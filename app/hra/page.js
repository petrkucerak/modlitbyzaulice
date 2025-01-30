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
      <Footer />
    </Main>
  );
}
