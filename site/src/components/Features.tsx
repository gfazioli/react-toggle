import "./Features.css";

const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
    title: "Accessible by default",
    body: (
      <>
        Native <code>{`<input type="checkbox" role="switch">`}</code> with proper ARIA wiring, keyboard support, and{" "}
        <code>prefers-reduced-motion</code>.
      </>
    ),
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2 2 7l10 5 10-5-10-5Z" />
        <path d="m2 17 10 5 10-5" />
        <path d="m2 12 10 5 10-5" />
      </svg>
    ),
    title: "Themeable via CSS variables",
    body: (
      <>
        No theme provider, no runtime. Override <code>--rt-*</code> custom properties on any selector to scope a theme
        — even per <code>:has()</code> or media query.
      </>
    ),
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
      </svg>
    ),
    title: "Tiny and tree-shakeable",
    body: (
      <>
        ~3 KB ESM gzipped, dual ESM + CJS, full <code>.d.ts</code>. Zero runtime dependencies — only React as a peer.
      </>
    ),
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: "TypeScript-first",
    body: (
      <>
        Strongly typed props, <code>forwardRef</code> returns the underlying <code>HTMLInputElement</code>. Plays nice
        with React 18 &amp; 19, controlled or uncontrolled.
      </>
    ),
  },
];

export function Features() {
  return (
    <section className="section features" id="features">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">What's in the box</span>
          <h2>
            Small surface, <span className="gradient-text">no surprises</span>.
          </h2>
          <p>One component. Standard React idioms. Standard CSS. Nothing else to learn.</p>
        </div>
        <div className="features-grid">
          {FEATURES.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
