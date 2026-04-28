# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`react-toggle-component` — a single-component React library exposing an accessible toggle/switch. Published to npm. From v4 the package targets React 18+ with no runtime dependencies; theming is done via CSS custom properties.

## Stack

- **Language**: TypeScript 5 (`strict`, `verbatimModuleSyntax`, `target: ES2020`)
- **Build**: `tsup` → dual ESM + CJS + `.d.ts`, plus a single `index.css` from CSS Modules
- **Lint/format**: ESLint 9 flat config (typescript-eslint, react, react-hooks, jsx-a11y) + Prettier 3
- **Tests**: vitest + jsdom + @testing-library/react + @testing-library/user-event
- **Docs site**: custom Vite + React landing page in `site/` (no Storybook/Ladle — see *Layout* below)
- **Package manager**: pnpm 9
- **Release**: Changesets (CI workflow opens "Version Packages" PR; merging it publishes to npm)

## Commands

```bash
pnpm dev          # tsup --watch (rebuild on change)
pnpm build        # tsup — produces dist/index.{js,cjs,d.ts,css}
pnpm typecheck    # tsc --noEmit
pnpm lint         # eslint .
pnpm test         # vitest run (one-off)
pnpm test:watch   # vitest (watch)
pnpm site:dev     # vite dev — landing site at localhost:5173/react-toggle/
pnpm site:build   # vite build → site-dist/ (deployed to GH Pages by CI)
pnpm site:preview # serve a built site-dist/ locally
pnpm changeset    # add a changeset (run before each PR that changes published behavior)
```

`prepublishOnly` runs typecheck + lint + test + build, so `pnpm publish` will not ship a broken artifact. The release workflow does the same on CI.

## Architecture

The public API is one component plus its prop type:

```ts
import { Toggle, type ToggleProps } from "react-toggle-component";
```

`src/Toggle.tsx` renders a hidden native `<input type="checkbox" role="switch">` overlaid on a decorative `<span class="track"><span class="knob"/></span>`. The input is full-bleed and transparent so clicks/taps hit it directly; the visual chrome is `pointer-events: none`. State (`checked` / `defaultChecked`) is owned by the input — there is no internal React state.

### Controlled vs uncontrolled

Standard React convention: passing `checked` makes it controlled; otherwise it falls back to `defaultChecked`. Detection is `checked !== undefined`. The legacy v3 `controlled` prop is gone.

### Theming pipeline

Every visual prop (e.g. `borderColor`, `leftKnobColor`, `width`) maps to a CSS custom property via `VAR_MAP` in `Toggle.tsx`. Provided values are written as inline CSS variables on the root `<span>`. `Toggle.module.css` consumes them with the default values inlined inside `var()`, never declared on `.root` directly — declaring them on `.root` would block inheritance from any wrapping ancestor that sets `--rt-*` vars (which would silently break consumer theming via CSS-only). The two-level fallback gives a single override (`--rt-border-color`) precedence over the per-state pair (`--rt-border-color-off` / `--rt-border-color-on`):

```css
.track             { background-color: var(--rt-border-color, var(--rt-border-color-off, #aaa)); }
.input:checked ~ .track { background-color: var(--rt-border-color, var(--rt-border-color-on,  #3887b7)); }
```

This is why **there is no theme provider**: any CSS scope can theme a subtree by setting these variables. When adding a new visual knob:

1. Add the prop to `ToggleProps`.
2. Add a `propName → --rt-var-name` row in `VAR_MAP`.
3. Reference the variable in `Toggle.module.css` (with a sensible default).
4. Document it in the README's CSS-variables table.

### Stylesheet shipping

CSS Modules are extracted by tsup/esbuild into `dist/index.css` and exposed via the package export `react-toggle-component/styles.css`. Consumers import it once. `sideEffects: ["**/*.css"]` keeps it tree-shake-safe.

### Accessibility

`role="switch"` on the native checkbox is the W3C-recommended pattern — the browser/AT use the input's `checked` state as `aria-checked` automatically. Forwarded ARIA props: `aria-label`, `aria-labelledby`, `aria-describedby`. `forwardRef` returns the underlying `HTMLInputElement` (this was a bug in v3 and is now actually wired).

## Layout

- `src/` — library source (`Toggle.tsx`, `Toggle.module.css`, `index.ts`)
- `tests/` — vitest specs
- `site/` — custom landing page (Vite + React + plain CSS, dark mode by `prefers-color-scheme`). Imports `Toggle` from the package itself via Vite alias `react-toggle-component → ../src/index.ts`. Sections: Hero, Features, **live theme Builder** with URL-persisted config (`?t=base64`), Preset gallery, Examples, Install, Footer. Floating capsule nav with IntersectionObserver-driven active link.
- `.changeset/` — pending release notes
- `.github/workflows/` — `ci.yml` (typecheck/lint/test/build/site-build), `deploy-docs.yml` (site → GH Pages on push to main), `release.yml` (Changesets publish)
- `dist/`, `site-dist/`, `coverage/` — build/test outputs, **gitignored**

## Conventions

- TS strict; `verbatimModuleSyntax` requires `import type` for type-only imports.
- ESLint includes `jsx-a11y/label-has-associated-control` configured with `controlComponents: ["Toggle"]` so wrapping `<label><Toggle/></label>` does not falsely trigger.
- `pnpm test` uses `classNameStrategy: "non-scoped"` so CSS-Module classnames are stable in jsdom; tests typically rely on roles/ARIA rather than class names.
- The first v4 release was bumped manually (CHANGELOG written by hand). Subsequent releases go through Changesets — add a changeset for any user-facing change.
