import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Main from "@/components/layout/main";

export default function Home() {
  return (
    <Main>
      <Header />
      <div className="flex flex-col w-[90vw] max-w-[800px]">Mapa</div>
      <Footer />
    </Main>
  );
}
