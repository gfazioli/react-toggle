import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { Builder } from "./components/Builder";
import { Presets } from "./components/Presets";
import { Examples } from "./components/Examples";
import { Install } from "./components/Install";
import { Footer } from "./components/Footer";
import { Nav } from "./components/Nav";
import { ThemeConfigProvider } from "./hooks/useThemeConfig";

export function App() {
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
      </main>
      <Footer />
    </ThemeConfigProvider>
  );
}
