import { useState, type CSSProperties } from "react";
import { Toggle } from "react-toggle-component";
import "./Examples.css";

const SETTINGS_THEME: CSSProperties & Record<`--${string}`, string> = {
  "--rt-width": "44px",
  "--rt-height": "24px",
  "--rt-knob-width": "18px",
  "--rt-knob-height": "18px",
  "--rt-knob-gap": "3px",
  "--rt-border-color-on": "#6366f1",
  "--rt-background-color-on": "#6366f1",
  "--rt-knob-color-on": "#ffffff",
  "--rt-border-color-off": "#d4d4d8",
  "--rt-background-color-off": "#d4d4d8",
  "--rt-knob-color-off": "#ffffff",
};

interface SettingDef {
  id: string;
  title: string;
  description: string;
  defaultOn: boolean;
}

const SETTINGS: SettingDef[] = [
  { id: "dark", title: "Dark mode", description: "Match system theme automatically.", defaultOn: false },
  { id: "notif", title: "Push notifications", description: "Receive realtime alerts.", defaultOn: true },
  { id: "save", title: "Auto-save drafts", description: "Save your work every 30 seconds.", defaultOn: true },
  { id: "digest", title: "Weekly email digest", description: "A summary of activity every Monday.", defaultOn: false },
  { id: "beta", title: "Beta features", description: "Get early access to experimental APIs.", defaultOn: false },
];

export function Examples() {
  const [state, setState] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(SETTINGS.map((s) => [s.id, s.defaultOn])),
  );

  return (
    <section className="section examples">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">In context</span>
          <h2>
            Looks like a <span className="gradient-text">real product</span>.
          </h2>
          <p>The same component, dropped into a settings panel. Real focus rings, real keyboard, real form.</p>
        </div>

        <div className="examples-card">
          <div className="examples-card-header">
            <div>
              <h3>Preferences</h3>
              <p>Manage your account settings and notification preferences.</p>
            </div>
            <span className="examples-card-badge">5 toggles</span>
          </div>

          <ul className="examples-list" style={SETTINGS_THEME}>
            {SETTINGS.map((s) => (
              <li key={s.id} className="examples-row">
                <label htmlFor={`ex-${s.id}`} className="examples-label">
                  <span className="examples-title">{s.title}</span>
                  <span className="examples-desc">{s.description}</span>
                </label>
                <Toggle
                  id={`ex-${s.id}`}
                  name={s.id}
                  checked={state[s.id]}
                  onCheckedChange={(checked) => setState((prev) => ({ ...prev, [s.id]: checked }))}
                />
              </li>
            ))}
          </ul>

          <div className="examples-state">
            <span>Current state:</span>
            <code>{JSON.stringify(state)}</code>
          </div>
        </div>
      </div>
    </section>
  );
}
