import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Main from "@/components/layout/main";
import dynamic from "next/dynamic";

export default function Home() {
  const MapSSR = dynamic(() => import("@/components/map/map"), { ssr: false });
  return (
    <Main>
      <Header />
      <div className="flex flex-col w-[90vw] max-w-[800px]">
        <MapSSR />
      </div>
      <Footer />
    </Main>
  );
}
