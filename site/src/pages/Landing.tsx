import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { Builder } from "../components/Builder";
import { Presets } from "../components/Presets";
import { Examples } from "../components/Examples";
import { Install } from "../components/Install";
import { Family } from "../components/Family";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";
import { ThemeConfigProvider } from "../hooks/useThemeConfig";

export function Landing() {
  return (
    <ThemeConfigProvider>
      <Nav />
      <main>
        <Hero />
        <Features />
        <Builder />
        <Presets />
        <Examples />
        <Install />
        <Family />
      </main>
      <Footer />
    </ThemeConfigProvider>
  );
}
