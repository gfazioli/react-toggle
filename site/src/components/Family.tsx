import "./Family.css";

const OTHERS = [
  {
    name: "react-amiga-guru-meditation",
    description:
      "An error boundary that turns runtime errors into the iconic Amiga Guru Meditation screen — themeable, portal-aware, with a full react-error-boundary-style API.",
    site: "https://gfazioli.github.io/react-amiga-guru-meditation/",
    glyph: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M12 9v3" />
        <path d="M12 15h.01" />
      </svg>
    ),
  },
  {
    name: "@gfazioli/react-flip",
    description:
      "Wrap any two faces and animate a 3D rotation between them — horizontal or vertical, coin-flips and cards, themeable via CSS variables.",
    site: "https://gfazioli.github.io/react-flip/",
    glyph: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12a9 9 0 1 1-3-6.7" />
        <path d="M21 4v5h-5" />
      </svg>
    ),
  },
] as const;

export function Family() {
  return (
    <section className="section family" id="family">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Other Undolog components</span>
          <h2>
            More to <span className="gradient-text">play with</span>.
          </h2>
          <p>Small, accessible React components — same philosophy, same toolchain, zero runtime dependencies.</p>
        </div>

        <div className="family-grid">
          {OTHERS.map((c) => (
            <a
              key={c.name}
              className="family-card"
              href={c.site}
              target="_blank"
              rel="noreferrer noopener"
            >
              <div className="family-card-glyph">{c.glyph}</div>
              <div className="family-card-body">
                <h3>{c.name}</h3>
                <p>{c.description}</p>
                <span className="family-card-cta">
                  Live demo <span aria-hidden="true">→</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
