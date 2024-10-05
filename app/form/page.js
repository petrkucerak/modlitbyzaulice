import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Main from "@/components/layout/main";
import Table from "@/components/table/table";

export default function Home() {
  return (
    <Main>
      <Header />
      <div className="flex flex-col w-[90vw] max-w-[900px] mt-12">
        <Table />
      </div>
      <Footer />
    </Main>
  );
}
