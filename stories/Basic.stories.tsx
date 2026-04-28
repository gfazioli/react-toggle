import { useState } from "react";
import type { Story } from "@ladle/react";
import { Toggle } from "../src/Toggle";

export default {
  title: "Basic",
};

export const Default: Story = () => <Toggle name="default" aria-label="Default toggle" />;

export const DefaultChecked: Story = () => <Toggle name="dc" defaultChecked aria-label="Default checked toggle" />;

export const Controlled: Story = () => {
  const [on, setOn] = useState(false);
  return (
    <div>
      <Toggle name="controlled" checked={on} onCheckedChange={setOn} aria-label="Controlled toggle" />
      <p>State: {on ? "ON" : "OFF"}</p>
    </div>
  );
};

export const Disabled: Story = () => (
  <>
    <Toggle name="d-off" disabled aria-label="Disabled off" />
    <Toggle name="d-on" disabled defaultChecked aria-label="Disabled on" />
  </>
);

export const WithExternalLabelLeft: Story = () => (
  <>
    <label htmlFor="left">Left label</label>
    <Toggle name="left" />
  </>
);

export const WithExternalLabelRight: Story = () => (
  <>
    <Toggle name="right" />
    <label htmlFor="right">Right label</label>
  </>
);
