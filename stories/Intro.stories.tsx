import type { Story } from "@ladle/react";
import { Toggle } from "../src/Toggle";

export default {
  title: "Intro",
};

export const Welcome: Story = () => (
  <div style={{ maxWidth: 720, lineHeight: 1.6 }}>
    <h1>react-toggle-component</h1>
    <p>
      Accessible, themeable React toggle/switch. Zero runtime dependencies, ARIA-compliant, themed via standard CSS
      custom properties.
    </p>
    <p>
      <Toggle name="welcome" defaultChecked aria-label="Welcome toggle" />
    </p>
    <h2>Install</h2>
    <pre>
      <code>{"npm i react-toggle-component\n# or\npnpm add react-toggle-component"}</code>
    </pre>
    <h2>Use</h2>
    <pre>
      <code>{`import { Toggle } from "react-toggle-component";
import "react-toggle-component/styles.css";

<Toggle name="agree" defaultChecked />`}</code>
    </pre>
    <p>Browse the sidebar for examples covering state, sizing, colors, theming, accessibility, and forms.</p>
  </div>
);
