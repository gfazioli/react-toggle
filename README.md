<div align="center">

<img src="./assets/logo.svg" alt="" width="180" />

# react-toggle-component

**The accessible, themeable React switch you actually want to ship.**

[![npm version](https://img.shields.io/npm/v/react-toggle-component?style=flat-square&color=6366f1)](https://www.npmjs.com/package/react-toggle-component)
[![bundle size](https://img.shields.io/bundlephobia/minzip/react-toggle-component?style=flat-square&label=gzip&color=6366f1)](https://bundlephobia.com/package/react-toggle-component)
[![types](https://img.shields.io/npm/types/react-toggle-component?style=flat-square&color=6366f1)](https://www.npmjs.com/package/react-toggle-component)
[![downloads](https://img.shields.io/npm/dm/react-toggle-component?style=flat-square&color=6366f1)](https://www.npmjs.com/package/react-toggle-component)
[![license](https://img.shields.io/npm/l/react-toggle-component?style=flat-square&color=6366f1)](./LICENSE)

[**Live playground →**](https://gfazioli.github.io/react-toggle/) ・
[**v3 → v4 guide**](./UPGRADE.md) ・
[**Changelog**](./CHANGELOG.md)

</div>

<br/>

> `<input type="checkbox" role="switch">` under the hood. Theme it with one CSS selector. Zero runtime dependencies. ~3 KB gzipped.

- 🎯 **Accessible** — `role="switch"`, ARIA-compliant, full keyboard support, `prefers-reduced-motion` aware.
- 🎨 **Themeable via CSS variables** — no runtime theming layer, scope themes with any CSS selector.
- 📦 **Zero runtime dependencies** — only React as a peer dependency.
- 🪶 **Tiny** — ~3 KB ESM (gzipped), tree-shakeable, dual ESM + CJS.
- ⌨️ **TypeScript-first** — full type declarations included.

## Install

```bash
npm install react-toggle-component
# or
pnpm add react-toggle-component
# or
yarn add react-toggle-component
```

Requires React 18 or newer.

## Usage

```tsx
import { Toggle } from "react-toggle-component";
import "react-toggle-component/styles.css";

export function Example() {
  return <Toggle name="newsletter" defaultChecked />;
}
```

The stylesheet must be imported once in your app (root layout, entry file, or wherever you prefer).

### Controlled

```tsx
const [enabled, setEnabled] = useState(false);

<Toggle name="enabled" checked={enabled} onCheckedChange={setEnabled} />;
```

### Uncontrolled

```tsx
<Toggle name="enabled" defaultChecked onCheckedChange={(next) => console.log(next)} />
```

### With a label

The component renders a real `<input type="checkbox" role="switch">`, so any standard labeling pattern works:

```tsx
{/* External label via htmlFor */}
<label htmlFor="dark">Dark mode</label>
<Toggle name="dark" />

{/* Wrapping label */}
<label>
  <Toggle name="dark" /> Dark mode
</label>

{/* Programmatic label */}
<Toggle name="dark" aria-label="Dark mode" />
```

## Theming

All visual properties are exposed as CSS custom properties. Override them on any selector to theme one toggle, a section, or the whole app:

```css
:root {
  --rt-border-color-on: #16a34a;
  --rt-background-color-on: #16a34a;
  --rt-knob-color-on: white;
  --rt-radius: 8px;
  --rt-knob-radius: 4px;
}
```

You can also pass per-instance props (they're applied as inline CSS variables on the root element):

```tsx
<Toggle
  name="accent"
  rightBackgroundColor="tomato"
  rightBorderColor="tomato"
  rightKnobColor="white"
/>
```

### Available CSS variables

| Variable | Default | Equivalent prop |
|---|---|---|
| `--rt-width` | `48px` | `width` |
| `--rt-height` | `24px` | `height` |
| `--rt-border-width` | `2px` | `borderWidth` |
| `--rt-border-color` | — (overrides on/off) | `borderColor` |
| `--rt-border-color-off` | `#aaa` | `leftBorderColor` |
| `--rt-border-color-on` | `#3887b7` | `rightBorderColor` |
| `--rt-background-color` | — (overrides on/off) | `backgroundColor` |
| `--rt-background-color-off` | `#fff` | `leftBackgroundColor` |
| `--rt-background-color-on` | `#fff` | `rightBackgroundColor` |
| `--rt-background-color-disabled` | `#eee` | `backgroundColorDisabled` |
| `--rt-radius` | `256px` | `radius` |
| `--rt-radius-bg` | `256px` | `radiusBackground` |
| `--rt-knob-radius` | `100%` | `knobRadius` |
| `--rt-knob-width` | `16px` | `knobWidth` |
| `--rt-knob-height` | `16px` | `knobHeight` |
| `--rt-knob-gap` | `4px` | `knobGap` |
| `--rt-knob-color` | — (overrides on/off) | `knobColor` |
| `--rt-knob-color-off` | `#aaa` | `leftKnobColor` |
| `--rt-knob-color-on` | `#3887b7` | `rightKnobColor` |

## Props

| Prop | Type | Description |
|---|---|---|
| `name` | `string` | Form field name. Used as the input `id` when `id` is not provided. |
| `id` | `string` | Explicit input id (overrides `name`). |
| `value` | `string` | Form value submitted when checked. |
| `checked` | `boolean` | Controlled state. |
| `defaultChecked` | `boolean` | Uncontrolled initial state. |
| `disabled` | `boolean` | Disables interaction. |
| `onCheckedChange` | `(checked, event) => void` | Fires on toggle, with the new boolean value. |
| `onChange` | `(event) => void` | Native React change handler (event only). |
| `aria-label` / `aria-labelledby` / `aria-describedby` | `string` | Standard ARIA attributes forwarded to the input. |
| `className`, `style` | — | Applied to the root wrapper. |

Plus all the visual props listed in the table above.

`forwardRef` returns the underlying `HTMLInputElement`.

## Migrating from v3

`controlled`, `ReactToggleThemeProvider`, `onLeft`, `onRight`, and `onToggle` are deprecated/removed in v4. See [UPGRADE.md](./UPGRADE.md) for a full migration guide.

## License

MIT — © Giovambattista Fazioli

## Sponsor

If this project saves you time, consider [sponsoring on GitHub](https://github.com/sponsors/gfazioli) — it directly supports continued maintenance and new releases.

<p align="center">
  <a href="https://github.com/sponsors/gfazioli">
    <img src="https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86" alt="Sponsor on GitHub" />
  </a>
</p>
