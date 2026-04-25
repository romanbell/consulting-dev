import { Shell } from "@/components/layout/Shell";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Manifest } from "@/components/home/Manifest";
import { Fieldwork } from "@/components/home/Fieldwork";
import { Method } from "@/components/home/Method";
import { Toolchain } from "@/components/home/Toolchain";

export default function HomePage() {
  return (
    <Shell>
      <Nav />
      <main id="main">
        <Hero />
        <Manifest />
        <Fieldwork />
        <Method />
        <Toolchain />
      </main>
      <Footer />
    </Shell>
  );
}
