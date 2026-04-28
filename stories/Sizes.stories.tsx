import type { Story } from "@ladle/react";
import { Toggle } from "../src/Toggle";

export default {
  title: "Sizing",
};

export const Width: Story = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
    <Toggle name="w-1" width="32px" aria-label="32px wide" />
    <Toggle name="w-2" aria-label="default width" />
    <Toggle name="w-3" width="80px" aria-label="80px wide" />
    <Toggle name="w-4" width="128px" aria-label="128px wide" />
  </div>
);

export const Height: Story = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
    <Toggle name="h-1" height="16px" aria-label="16px tall" />
    <Toggle name="h-2" aria-label="default height" />
    <Toggle name="h-3" height="48px" knobWidth="40px" knobHeight="40px" width="96px" aria-label="48px tall" />
  </div>
);

export const SquareLook: Story = () => (
  <Toggle name="sq" radius="6px" radiusBackground="4px" knobRadius="3px" aria-label="square" />
);
