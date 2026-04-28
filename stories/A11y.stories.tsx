import type { Story } from "@ladle/react";
import { Toggle } from "../src/Toggle";

export default {
  title: "Accessibility",
};

export const WithAriaLabel: Story = () => <Toggle name="al" aria-label="Enable notifications" />;

export const WithExternalLabel: Story = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <label htmlFor="enable">Enable feature</label>
    <Toggle name="enable" />
  </div>
);

export const WithLabelledBy: Story = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <span id="darkmode-label">Dark mode</span>
    <Toggle name="darkmode" aria-labelledby="darkmode-label" />
  </div>
);

export const KeyboardFocusVisible: Story = () => (
  <div>
    <p>Tab here, then press Space:</p>
    <Toggle name="kbd" aria-label="Keyboard demo" />
  </div>
);

export const MultipleInForm: Story = () => (
  <fieldset style={{ display: "flex", flexDirection: "column", gap: 12 }}>
    <legend>Notification preferences</legend>
    <label htmlFor="email">
      <Toggle name="email" defaultChecked /> Email
    </label>
    <label htmlFor="sms">
      <Toggle name="sms" /> SMS
    </label>
    <label htmlFor="push">
      <Toggle name="push" defaultChecked /> Push
    </label>
  </fieldset>
);
