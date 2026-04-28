# Upgrade Guide

## v3 → v4

v4 is a full rewrite. The component contract is mostly preserved, but a handful of v3 APIs are removed or deprecated. The visual prop names are unchanged, so most consumers can upgrade with minimal code changes.

### React version

v4 requires **React 18 or newer**.

```diff
- "react": "^16 || ^17"
+ "react": ">=18"
```

### Import the stylesheet

CSS is no longer injected at runtime. Import the stylesheet once at the top of your app:

```ts
import "react-toggle-component/styles.css";
```

### `controlled` prop is gone

v3 used a `controlled` boolean to switch between `checked` (controlled) and `defaultChecked` (uncontrolled). v4 follows React's standard convention:

```diff
- <Toggle name="x" controlled checked={value} onToggle={...} />
+ <Toggle name="x" checked={value} onCheckedChange={setValue} />

- <Toggle name="x" checked={true} />               // v3 uncontrolled with default
+ <Toggle name="x" defaultChecked />                // v4
```

If `checked` is provided, the toggle is controlled. If only `defaultChecked` is provided (or neither), it's uncontrolled.

### Events: prefer `onCheckedChange`

```diff
- <Toggle name="x" onToggle={(e) => setOn(e.target.checked)} />
+ <Toggle name="x" onCheckedChange={(checked) => setOn(checked)} />
```

`onToggle`, `onLeft`, and `onRight` are still wired up in v4 and will continue to fire, but they are deprecated and may be removed in a future major release. Migrate to `onCheckedChange`.

### `ReactToggleThemeProvider` is removed

Theming is now done with standard CSS custom properties. Anything you did with the provider can be expressed as CSS:

```diff
- <ReactToggleThemeProvider theme={{ leftBackgroundColor: "tomato", rightBackgroundColor: "navy" }}>
-   <Toggle name="a" />
-   <Toggle name="b" />
- </ReactToggleThemeProvider>

+ <div className="my-scope">
+   <Toggle name="a" />
+   <Toggle name="b" />
+ </div>

+ /* in your CSS */
+ .my-scope {
+   --rt-background-color-off: tomato;
+   --rt-background-color-on: navy;
+ }
```

The full theme key → CSS variable mapping is in the [README](./README.md#available-css-variables).

### Accessibility

The component now renders `<input type="checkbox" role="switch">`. If you previously relied on a non-switch checkbox semantics, this is a behavioral change for assistive technology — generally an improvement.

Forwarded ARIA attributes:

- `aria-label`
- `aria-labelledby`
- `aria-describedby`

External labels via `<label htmlFor>` continue to work because the input still receives the `id` (defaulting to `name`).

### `forwardRef` now actually works

In v3 the ref was lost due to a typing/forwardRef bug. In v4 the ref is correctly forwarded to the underlying `HTMLInputElement`.

```tsx
const ref = useRef<HTMLInputElement>(null);
<Toggle name="x" ref={ref} />;
ref.current?.focus(); // works
```

### Build / output

`dist/` is no longer committed to git. The package ships ESM + CJS + `.d.ts` + a single `index.css` file.

### Removed exports

- `ReactToggleThemeProvider` — see above.
- The non-`forwardRef` `ToggleProps` value export from v3 (it was a typing helper for Docz and was never documented as part of the API). Use `import { Toggle, type ToggleProps } from "react-toggle-component"` instead.

## v1 → v2

See the v3 upgrade guide if you're still on v1 — the v2 changes (named export `Toggle`, `onToggle` instead of `onChange`, removal of `mode` and `theme` props) are still in effect in v4.
