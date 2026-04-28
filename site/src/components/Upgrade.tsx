import "./Upgrade.css";

interface Step {
  title: string;
  description: string;
  before: string;
  after: string;
}

const STEPS: Step[] = [
  {
    title: "Drop the theme provider",
    description:
      "ReactToggleThemeProvider is gone. Theme via standard CSS custom properties on any selector — even per :has() or media query.",
    before: `<ReactToggleThemeProvider
  theme={{
    leftBackgroundColor: "tomato",
    rightBackgroundColor: "navy",
  }}
>
  <Toggle name="a" />
</ReactToggleThemeProvider>`,
    after: `/* in your CSS */
.my-scope {
  --rt-background-color-off: tomato;
  --rt-background-color-on: navy;
}

/* in JSX */
<div className="my-scope">
  <Toggle name="a" />
</div>`,
  },
  {
    title: "Use standard React state pattern",
    description:
      "The controlled prop is removed. Pass checked for controlled, defaultChecked for uncontrolled — same as a native input.",
    before: `<Toggle
  name="x"
  controlled
  checked={value}
  onToggle={...}
/>`,
    after: `<Toggle
  name="x"
  checked={value}
  onCheckedChange={setValue}
/>`,
  },
  {
    title: "Migrate event handlers",
    description:
      "onLeft / onRight / onToggle still fire (deprecated, removed in a future major). Prefer onCheckedChange — it gives you the new boolean value directly.",
    before: `<Toggle
  name="x"
  onToggle={(e) => setOn(e.target.checked)}
/>`,
    after: `<Toggle
  name="x"
  onCheckedChange={(checked) => setOn(checked)}
/>`,
  },
  {
    title: "Import the stylesheet once",
    description:
      "CSS is no longer injected at runtime. Import the bundled stylesheet at the top of your app — root layout, entry file, anywhere.",
    before: `// (nothing — styles were injected by styled-components)`,
    after: `// at the top of your app
import "react-toggle-component/styles.css";`,
  },
];

export function Upgrade() {
  return (
    <section className="section upgrade" id="upgrade">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Migrating</span>
          <h2>
            Coming from <span className="gradient-text">v3</span>?
          </h2>
          <p>Four small changes to land on v4. Requires React 18+.</p>
        </div>

        <ol className="upgrade-list">
          {STEPS.map((step, i) => (
            <li className="upgrade-step" key={step.title}>
              <span className="upgrade-step-num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="upgrade-step-body">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <div className="upgrade-diff">
                  <div className="upgrade-diff-col upgrade-diff-before">
                    <span className="upgrade-diff-label">v3</span>
                    <pre>
                      <code>{step.before}</code>
                    </pre>
                  </div>
                  <div className="upgrade-diff-col upgrade-diff-after">
                    <span className="upgrade-diff-label">v4</span>
                    <pre>
                      <code>{step.after}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
