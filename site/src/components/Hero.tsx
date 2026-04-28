import { useEffect, useState, type CSSProperties } from "react";
import { Toggle } from "react-toggle-component";
import { CopyButton } from "./CopyButton";
import "./Hero.css";

type CSSVarStyle = CSSProperties & Record<`--${string}`, string>;

const SHOWCASE_STYLES: { name: string; vars: CSSVarStyle; defaultChecked?: boolean }[] = [
  {
    name: "Default",
    defaultChecked: true,
    vars: {
      "--rt-border-color-on": "#6366f1",
      "--rt-knob-color-on": "#6366f1",
      "--rt-width": "72px",
      "--rt-height": "36px",
      "--rt-knob-width": "26px",
      "--rt-knob-height": "26px",
      "--rt-knob-gap": "5px",
    } as CSSVarStyle,
  },
  {
    name: "iOS",
    vars: {
      "--rt-border-color-on": "#34c759",
      "--rt-background-color-on": "#34c759",
      "--rt-knob-color-off": "#ffffff",
      "--rt-knob-color-on": "#ffffff",
      "--rt-border-color-off": "#e5e5ea",
      "--rt-background-color-off": "#e5e5ea",
      "--rt-width": "76px",
      "--rt-height": "44px",
      "--rt-knob-width": "38px",
      "--rt-knob-height": "38px",
      "--rt-knob-gap": "3px",
    } as CSSVarStyle,
  },
  {
    name: "Pill",
    defaultChecked: true,
    vars: {
      "--rt-border-color-on": "#a855f7",
      "--rt-background-color-on": "#a855f7",
      "--rt-knob-color-on": "#ffffff",
      "--rt-knob-color-off": "#ffffff",
      "--rt-border-color-off": "#d4d4d8",
      "--rt-background-color-off": "#d4d4d8",
      "--rt-width": "80px",
      "--rt-height": "32px",
      "--rt-knob-width": "24px",
      "--rt-knob-height": "24px",
      "--rt-knob-gap": "4px",
    } as CSSVarStyle,
  },
];

export function Hero() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => setTick((t) => t + 1), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero" id="top">
      <div className="hero-glow" aria-hidden="true" />
      <div className="container hero-inner">
        <span className="eyebrow">
          <span className="eyebrow-dot" /> v4 · fully rewritten for React 18+
        </span>

        <h1>
          The React <span className="gradient-text">switch</span>
          <br />
          you actually want to ship.
        </h1>

        <p className="hero-sub">
          Accessible <code>role="switch"</code>, themeable via CSS variables, zero runtime dependencies. Drop it in,
          theme it with one selector, ship it.
        </p>

        <div className="hero-cta">
          <CopyButton text="npm install react-toggle-component" variant="primary">
            <span className="hero-cta-cmd">
              <span className="hero-cta-prompt">$</span> npm install react-toggle-component
            </span>
          </CopyButton>
          <a
            href="https://github.com/gfazioli/react-toggle"
            className="btn btn-secondary"
            target="_blank"
            rel="noreferrer noopener"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.27-.01-1-.02-1.96-3.2.69-3.87-1.54-3.87-1.54-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.34.95.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.16 1.18a10.97 10.97 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.26 5.69.42.36.78 1.07.78 2.16 0 1.56-.01 2.81-.01 3.19 0 .31.21.67.8.55C20.21 21.39 23.5 17.07 23.5 12 23.5 5.65 18.35.5 12 .5z" />
            </svg>
            Star on GitHub
          </a>
        </div>

        <div className="hero-showcase" aria-hidden="true">
          {SHOWCASE_STYLES.map((s, i) => (
            <div className="hero-showcase-item" key={s.name} style={s.vars}>
              <Toggle
                name={`hero-${i}`}
                checked={(s.defaultChecked ?? false) !== (tick % 2 === 1)}
                onChange={() => {}}
                aria-label={s.name}
              />
              <span className="hero-showcase-label">{s.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
