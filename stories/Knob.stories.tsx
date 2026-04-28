import type { Story } from "@ladle/react";
import { Toggle } from "../src/Toggle";

export default {
  title: "Knob & Border",
};

export const KnobSize: Story = () => (
  <div style={{ display: "flex", gap: 12 }}>
    <Toggle name="k-1" knobWidth="8px" knobHeight="8px" aria-label="small knob" />
    <Toggle name="k-2" aria-label="default knob" />
    <Toggle name="k-3" width="64px" knobWidth="24px" knobHeight="24px" aria-label="large knob" />
  </div>
);

export const KnobGap: Story = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
    <Toggle name="g-1" knobGap="2px" aria-label="2px gap" />
    <Toggle name="g-2" knobGap="6px" knobWidth="12px" knobHeight="12px" aria-label="6px gap" />
    <Toggle name="g-3" width="64px" knobGap="10px" knobWidth="8px" knobHeight="8px" aria-label="10px gap" />
  </div>
);

export const BorderWidth: Story = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
    <Toggle name="b-1" borderWidth="1px" aria-label="1px border" />
    <Toggle name="b-2" borderWidth="3px" aria-label="3px border" />
    <Toggle name="b-3" borderWidth="5px" knobWidth="8px" knobHeight="8px" aria-label="5px border" />
  </div>
);

export const Pill: Story = () => (
  <Toggle
    name="pill"
    width="80px"
    height="36px"
    knobWidth="28px"
    knobHeight="28px"
    knobGap="4px"
    rightBackgroundColor="#0ea5e9"
    rightBorderColor="#0ea5e9"
    rightKnobColor="white"
    aria-label="Pill"
  />
);
