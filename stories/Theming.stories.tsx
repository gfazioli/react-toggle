import type { Story } from "@ladle/react";
import { Toggle } from "../src/Toggle";

export default {
  title: "Theming via CSS variables",
};

export const ScopedCSSVariables: Story = () => (
  <>
    <style>{`
      .my-app {
        --rt-border-color-on: #16a34a;
        --rt-background-color-on: #16a34a;
        --rt-knob-color-on: white;
        --rt-border-color-off: #94a3b8;
        --rt-background-color-off: #f1f5f9;
        --rt-knob-color-off: #cbd5e1;
        --rt-radius: 8px;
        --rt-radius-bg: 6px;
        --rt-knob-radius: 4px;
      }
    `}</style>
    <div className="my-app" style={{ display: "flex", flexDirection: "column", gap: 12, padding: 16 }}>
      <p>All toggles inside this container inherit the same theme via CSS custom properties.</p>
      <Toggle name="t-1" aria-label="Themed 1" />
      <Toggle name="t-2" defaultChecked aria-label="Themed 2" />
      <Toggle name="t-3" aria-label="Themed 3" />
    </div>
  </>
);

export const DarkMode: Story = () => (
  <>
    <style>{`
      .dark-demo {
        background: #0b1220;
        padding: 24px;
        border-radius: 8px;
        --rt-border-color-off: #334155;
        --rt-background-color-off: #1e293b;
        --rt-knob-color-off: #64748b;
        --rt-border-color-on: #38bdf8;
        --rt-background-color-on: #0c4a6e;
        --rt-knob-color-on: #e0f2fe;
      }
    `}</style>
    <div className="dark-demo" style={{ display: "flex", gap: 12 }}>
      <Toggle name="d-1" aria-label="Dark off" />
      <Toggle name="d-2" defaultChecked aria-label="Dark on" />
    </div>
  </>
);

export const PerInstanceOverridesGlobal: Story = () => (
  <>
    <style>{`
      .scope { --rt-border-color-on: #16a34a; --rt-background-color-on: #16a34a; --rt-knob-color-on: white; }
    `}</style>
    <div className="scope" style={{ display: "flex", gap: 12 }}>
      <Toggle name="p-1" defaultChecked aria-label="Inherits scope" />
      <Toggle name="p-2" defaultChecked rightBackgroundColor="tomato" rightBorderColor="tomato" aria-label="Overridden" />
    </div>
  </>
);
