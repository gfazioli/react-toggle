# Changelog

All notable changes to this project will be documented in this file.

This project follows [Semantic Versioning](https://semver.org/). From v4 onwards, releases are managed with [Changesets](https://github.com/changesets/changesets); entries in this file after v4.0.0 are generated automatically.

## 4.0.0

Full rewrite. See [UPGRADE.md](./UPGRADE.md) for migration steps from v3.

### Breaking

- Drops React 16/17 support. Now requires `react >= 18` (peer).
- Removes the `styled-components` peer dependency. Theming uses standard CSS custom properties; the bundled stylesheet must be imported once: `import "react-toggle-component/styles.css"`.
- Removes `ReactToggleThemeProvider`. Override CSS variables on any selector to scope a theme.
- Removes the `controlled` prop. Pass `checked` for controlled, `defaultChecked` for uncontrolled (matches native React form-input convention).
- Deprecates `onLeft` / `onRight` / `onToggle`. Use `onCheckedChange(checked, event)` (recommended) or the standard `onChange(event)`.

### Added

- `role="switch"` and proper ARIA wiring (`aria-label`, `aria-labelledby`, `aria-describedby`).
- `forwardRef` correctly forwards to the underlying `<input>`.
- Dual ESM + CJS build with full TypeScript declarations.
- `prefers-reduced-motion` is respected.
- Live playground built with [Ladle](https://ladle.dev), deployed to GitHub Pages.

### Changed

- Build output moved from committed `dist/` (TypeScript-compiled CommonJS) to a `tsup`-generated dual-format bundle, no longer committed.
- Documentation site moved from Docz/Gatsby (abandoned) to Ladle.
- Linter switched from tslint (deprecated) to ESLint flat config.

## 3.x

See git history for changes prior to v4.
