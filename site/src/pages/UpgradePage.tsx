import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";
import { Upgrade } from "../components/Upgrade";
import "./UpgradePage.css";

export function UpgradePage() {
  return (
    <>
      <Nav />
      <main className="upgrade-page">
        <header className="upgrade-page-hero">
          <div className="container">
            <span className="eyebrow">
              <span className="eyebrow-arrow" aria-hidden="true">
                ←
              </span>{" "}
              <a href={`${import.meta.env.BASE_URL}`}>Back to home</a>
            </span>
            <h1>
              Migrating to <span className="gradient-text">v4</span>
            </h1>
            <p>
              v4 is a full rewrite for React 18+. The component contract is mostly preserved — most consumers can
              upgrade with four small changes.
            </p>
          </div>
        </header>
        <Upgrade />
      </main>
      <Footer />
    </>
  );
}
