import { Navbar } from "@/components/layout";
import { Hero, Categories } from "@/components/sections";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Categories />
    </main>
  );
}
