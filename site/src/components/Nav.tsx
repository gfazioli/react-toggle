import { useEffect, useState } from "react";
import { Toggle } from "react-toggle-component";
import "./Nav.css";

const SECTIONS = [
  { id: "features", label: "Features" },
  { id: "builder", label: "Builder" },
  { id: "presets", label: "Presets" },
  { id: "install", label: "Install" },
];

const BASE = import.meta.env.BASE_URL;
const UPGRADE_URL = `${BASE}upgrade/`;
const HOME_URL = BASE;

function getIsUpgradePage(): boolean {
  if (typeof window === "undefined") return false;
  return window.location.pathname.replace(/\/$/, "") === UPGRADE_URL.replace(/\/$/, "");
}

export function Nav() {
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [brandOn, setBrandOn] = useState(true);
  const isUpgradePage = getIsUpgradePage();

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
    if (isUpgradePage) {
      setActive("upgrade");
      return;
    }
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
  }, [isUpgradePage]);

  const sectionHref = (id: string) => (isUpgradePage ? `${HOME_URL}#${id}` : `#${id}`);

  return (
    <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="nav-glow" aria-hidden="true" />
      <div className="container">
        <div className="nav-inner">
          <a href={HOME_URL} className="nav-brand" aria-label="react-toggle-component home">
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
                href={sectionHref(s.id)}
                className={active === s.id ? "active" : ""}
                aria-current={active === s.id ? "true" : undefined}
              >
                {s.label}
              </a>
            ))}
            <a
              href={UPGRADE_URL}
              className={active === "upgrade" ? "active" : ""}
              aria-current={active === "upgrade" ? "page" : undefined}
            >
              Migrate
            </a>
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
            <a
              href="https://discord.gg/rdWu5yFCR6"
              target="_blank"
              rel="noreferrer noopener"
              className="nav-icon"
              aria-label="Join the Undolog Discord"
              title="Join the Undolog Discord"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.317 4.3698a19.7913 19.7913 0 0 0 -4.8851-1.5152.0741.0741 0 0 0 -.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 0 0 -.0785-.037 19.7363 19.7363 0 0 0 -4.8852 1.515.0699.0699 0 0 0 -.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 0 0 .0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 0 0 .0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 0 0 -.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 0 1 -.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 0 1 .0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 0 1 .0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 0 1 -.0066.1276 12.2986 12.2986 0 0 1 -1.873.8914.0766.0766 0 0 0 -.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 0 0 .0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 0 0 .0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 0 0 -.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
