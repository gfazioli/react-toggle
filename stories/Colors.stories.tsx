import type { Story } from "@ladle/react";
import { Toggle } from "../src/Toggle";

export default {
  title: "Colors",
};

export const SimpleAccent: Story = () => (
  <Toggle
    name="accent"
    rightBorderColor="tomato"
    rightBackgroundColor="tomato"
    rightKnobColor="white"
    aria-label="Tomato accent"
  />
);

export const FullCustom: Story = () => (
  <Toggle
    name="custom"
    leftBorderColor="#888"
    leftBackgroundColor="#222"
    leftKnobColor="#aaa"
    rightBorderColor="#22c55e"
    rightBackgroundColor="#15803d"
    rightKnobColor="#dcfce7"
    aria-label="Custom dark style"
  />
);

export const GlobalOverride: Story = () => (
  <div style={{ display: "flex", gap: 12 }}>
    <Toggle name="g-1" borderColor="rebeccapurple" knobColor="white" aria-label="Same color on/off" />
    <Toggle
      name="g-2"
      backgroundColor="black"
      knobColor="rebeccapurple"
      borderColor="rebeccapurple"
      aria-label="Black bg, purple knob"
    />
  </div>
);

export const Disabled: Story = () => (
  <Toggle name="dc" disabled defaultChecked backgroundColorDisabled="#fde68a" aria-label="Disabled custom color" />
);
