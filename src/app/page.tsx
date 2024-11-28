import HomeSection from "@/components/HomeSection";

export default async function Home() {

  return (
    <div className="flex flex-col items-center justify-items-center font-[family-name:var(--font-geist-sans)]">
      <main className="container flex flex-col w-full min-h-[800px] max-h-screen justify-center items-center">
        <HomeSection />
      </main>
      <footer className="">

      </footer>
    </div>
  );
}
