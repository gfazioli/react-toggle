import { useState } from "react";
import { CopyButton } from "./CopyButton";
import "./Install.css";

const TABS = [
  { id: "npm", label: "npm", cmd: "npm install react-toggle-component" },
  { id: "pnpm", label: "pnpm", cmd: "pnpm add react-toggle-component" },
  { id: "yarn", label: "yarn", cmd: "yarn add react-toggle-component" },
] as const;

const USAGE = `import { Toggle } from "react-toggle-component";
import "react-toggle-component/styles.css";

export function Example() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Toggle
      name="newsletter"
      checked={enabled}
      onCheckedChange={setEnabled}
      aria-label="Subscribe to newsletter"
    />
  );
}`;

export function Install() {
  const [active, setActive] = useState<(typeof TABS)[number]["id"]>("npm");
  const cmd = TABS.find((t) => t.id === active)!.cmd;

  return (
    <section className="section install" id="install">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Get started</span>
          <h2>
            Two lines to install. <span className="gradient-text">Three to use.</span>
          </h2>
          <p>Requires React 18 or newer. Import the stylesheet once at the top of your app.</p>
        </div>

        <div className="install-grid">
          <div className="install-card">
            <div className="install-tabs" role="tablist">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={active === t.id}
                  className={active === t.id ? "active" : ""}
                  onClick={() => setActive(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="install-cmd">
              <pre>
                <code>
                  <span className="install-prompt">$</span> {cmd}
                </code>
              </pre>
              <CopyButton text={cmd} variant="ghost" className="copy-btn-ghost" />
            </div>
          </div>

          <div className="install-card">
            <div className="install-tabs">
              <span className="install-tab-static">Toggle.tsx</span>
              <span className="install-spacer" />
              <CopyButton text={USAGE} variant="ghost" className="copy-btn-ghost" />
            </div>
            <pre className="install-usage">
              <code>{USAGE}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
