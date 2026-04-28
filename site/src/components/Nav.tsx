import { useEffect, useState } from "react";
import { Toggle } from "react-toggle-component";
import "./Nav.css";

const SECTIONS = [
  { id: "features", label: "Features" },
  { id: "builder", label: "Builder" },
  { id: "presets", label: "Presets" },
  { id: "install", label: "Install" },
];

export function Nav() {
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [brandOn, setBrandOn] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setBrandOn((v) => !v), 3600);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const targets = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (targets.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    targets.forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, []);

  return (
    <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="nav-glow" aria-hidden="true" />
      <div className="container">
        <div className="nav-inner">
          <a href="#top" className="nav-brand" aria-label="react-toggle-component home">
            <span className="nav-brand-mark" aria-hidden="true">
              <Toggle
                name="nav-brand"
                checked={brandOn}
                onChange={() => {}}
                width="32px"
                height="16px"
                knobWidth="12px"
                knobHeight="12px"
                knobGap="2px"
                borderWidth="1px"
              />
            </span>
            <span className="nav-brand-text">react-toggle-component</span>
            <span className="nav-version">v4</span>
          </a>

          <nav className="nav-links" aria-label="Primary">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={active === s.id ? "active" : ""}
                aria-current={active === s.id ? "true" : undefined}
              >
                {s.label}
              </a>
            ))}
            <span className="nav-divider" aria-hidden="true" />
            <a
              href="https://www.npmjs.com/package/react-toggle-component"
              target="_blank"
              rel="noreferrer noopener"
              className="nav-icon"
              aria-label="View on npm"
              title="View on npm"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M2 4h20v16H2V4zm2 2v12h7v-9h4v9h5V6H4z" />
              </svg>
            </a>
            <a
              href="https://github.com/gfazioli/react-toggle"
              target="_blank"
              rel="noreferrer noopener"
              className="nav-icon"
              aria-label="View on GitHub"
              title="View on GitHub"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.27-.01-1-.02-1.96-3.2.69-3.87-1.54-3.87-1.54-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.34.95.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.16 1.18a10.97 10.97 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.26 5.69.42.36.78 1.07.78 2.16 0 1.56-.01 2.81-.01 3.19 0 .31.21.67.8.55C20.21 21.39 23.5 17.07 23.5 12 23.5 5.65 18.35.5 12 .5z" />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
