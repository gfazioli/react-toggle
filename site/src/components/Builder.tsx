import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Toggle } from "react-toggle-component";
import { configToCSSVars, useThemeConfig, type ThemeConfig } from "../hooks/useThemeConfig";
import { CopyButton } from "./CopyButton";
import "./Builder.css";

type ColorKey =
  | "leftBorderColor"
  | "rightBorderColor"
  | "leftBackgroundColor"
  | "rightBackgroundColor"
  | "leftKnobColor"
  | "rightKnobColor";

type NumKey =
  | "width"
  | "height"
  | "borderWidth"
  | "radius"
  | "radiusBackground"
  | "knobRadius"
  | "knobWidth"
  | "knobHeight"
  | "knobGap";

interface NumControl {
  key: NumKey;
  label: string;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  format?: (v: number) => string;
}

const SIZE_CONTROLS: NumControl[] = [
  { key: "width", label: "Width", min: 32, max: 160, unit: "px" },
  { key: "height", label: "Height", min: 16, max: 80, unit: "px" },
  { key: "borderWidth", label: "Border", min: 0, max: 8, unit: "px" },
];

const SHAPE_CONTROLS: NumControl[] = [
  { key: "radius", label: "Track radius", min: 0, max: 60, unit: "px" },
  { key: "radiusBackground", label: "Inner radius", min: 0, max: 60, unit: "px" },
  {
    key: "knobRadius",
    label: "Knob radius",
    min: 0,
    max: 999,
    format: (v) => (v >= 999 ? "100%" : `${v}px`),
  },
];

const KNOB_CONTROLS: NumControl[] = [
  { key: "knobWidth", label: "Knob width", min: 4, max: 80, unit: "px" },
  { key: "knobHeight", label: "Knob height", min: 4, max: 80, unit: "px" },
  { key: "knobGap", label: "Knob gap", min: 0, max: 16, unit: "px" },
];

const COLOR_GROUPS: { title: string; rows: { key: ColorKey; label: string }[] }[] = [
  {
    title: "Off state",
    rows: [
      { key: "leftBorderColor", label: "Border" },
      { key: "leftBackgroundColor", label: "Track" },
      { key: "leftKnobColor", label: "Knob" },
    ],
  },
  {
    title: "On state",
    rows: [
      { key: "rightBorderColor", label: "Border" },
      { key: "rightBackgroundColor", label: "Track" },
      { key: "rightKnobColor", label: "Knob" },
    ],
  },
];

export function Builder() {
  const { config, patch, reset, shareUrl } = useThemeConfig();

  return (
    <section className="section builder" id="builder">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Live theme builder</span>
          <h2>
            Tune it. <span className="gradient-text">Copy it.</span> Ship it.
          </h2>
          <p>Every visual prop maps to a CSS variable. Tweak the controls, share the URL, paste the snippet.</p>
        </div>

        <div className="builder-grid">
          <div className="builder-controls">
            <ControlGroup title="Sizing" controls={SIZE_CONTROLS} config={config} patch={patch} />
            <ControlGroup title="Shape" controls={SHAPE_CONTROLS} config={config} patch={patch} />
            <ControlGroup title="Knob" controls={KNOB_CONTROLS} config={config} patch={patch} />
            {COLOR_GROUPS.map((group) => (
              <div className="builder-group" key={group.title}>
                <h4>{group.title}</h4>
                <div className="builder-rows">
                  {group.rows.map((row) => (
                    <ColorRow
                      key={row.key}
                      label={row.label}
                      value={config[row.key]}
                      onChange={(v) => patch({ [row.key]: v } as Partial<ThemeConfig>)}
                    />
                  ))}
                </div>
              </div>
            ))}
            <div className="builder-actions">
              <button type="button" className="btn btn-secondary" onClick={reset}>
                Reset
              </button>
              <CopyButton text={shareUrl} variant="secondary" label="Copy share URL">
                <span>Share URL</span>
              </CopyButton>
            </div>
          </div>

          <BuilderPreview config={config} />
        </div>
      </div>
    </section>
  );
}

function ControlGroup({
  title,
  controls,
  config,
  patch,
}: {
  title: string;
  controls: NumControl[];
  config: ThemeConfig;
  patch: (delta: Partial<ThemeConfig>) => void;
}) {
  return (
    <div className="builder-group">
      <h4>{title}</h4>
      <div className="builder-rows">
        {controls.map((c) => (
          <NumRow key={c.key} control={c} value={config[c.key]} onChange={(v) => patch({ [c.key]: v } as Partial<ThemeConfig>)} />
        ))}
      </div>
    </div>
  );
}

function NumRow({ control, value, onChange }: { control: NumControl; value: number; onChange: (v: number) => void }) {
  const display = control.format
    ? control.format(value)
    : `${value}${control.unit ?? ""}`;
  return (
    <label className="builder-row builder-row-num">
      <span className="builder-row-label">{control.label}</span>
      <input
        type="range"
        min={control.min}
        max={control.max}
        step={control.step ?? 1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <span className="builder-row-value">{display}</span>
    </label>
  );
}

function ColorRow({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const [text, setText] = useState(value);
  useEffect(() => setText(value), [value]);

  return (
    <div className="builder-row builder-row-color">
      <span className="builder-row-label">{label}</span>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={`${label} color`}
      />
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => {
          if (/^#[0-9a-fA-F]{6}$/.test(text)) onChange(text);
          else setText(value);
        }}
        spellCheck={false}
        className="builder-color-input"
        aria-label={`${label} hex`}
      />
    </div>
  );
}

function BuilderPreview({ config }: { config: ThemeConfig }) {
  const [tab, setTab] = useState<"jsx" | "css">("jsx");
  const [autoChecked, setAutoChecked] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    intervalRef.current = setInterval(() => setAutoChecked((v) => !v), 1800);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const previewStyle = configToCSSVars(config) as CSSProperties;

  return (
    <div className="builder-preview">
      <div className="builder-preview-stage" style={previewStyle}>
        <Toggle name="builder" checked={autoChecked} onChange={() => {}} aria-label="Preview toggle" />
      </div>

      <div className="builder-code">
        <div className="builder-code-tabs" role="tablist">
          <button
            role="tab"
            aria-selected={tab === "jsx"}
            className={tab === "jsx" ? "active" : ""}
            onClick={() => setTab("jsx")}
          >
            JSX
          </button>
          <button
            role="tab"
            aria-selected={tab === "css"}
            className={tab === "css" ? "active" : ""}
            onClick={() => setTab("css")}
          >
            CSS
          </button>
          <span className="builder-code-spacer" />
          <CopyButton
            text={tab === "jsx" ? jsxSnippet(config) : cssSnippet(config)}
            variant="ghost"
            className="copy-btn-ghost"
            label="Copy snippet"
          >
            <span>Copy</span>
          </CopyButton>
        </div>
        <pre className="builder-code-block">
          <code>{tab === "jsx" ? jsxSnippet(config) : cssSnippet(config)}</code>
        </pre>
      </div>
    </div>
  );
}

function jsxSnippet(c: ThemeConfig): string {
  const knobRadius = c.knobRadius >= 999 ? "100%" : `${c.knobRadius}px`;
  return `<Toggle
  name="example"
  width="${c.width}px"
  height="${c.height}px"
  borderWidth="${c.borderWidth}px"
  radius="${c.radius}px"
  radiusBackground="${c.radiusBackground}px"
  knobRadius="${knobRadius}"
  knobWidth="${c.knobWidth}px"
  knobHeight="${c.knobHeight}px"
  knobGap="${c.knobGap}px"
  leftBorderColor="${c.leftBorderColor}"
  rightBorderColor="${c.rightBorderColor}"
  leftBackgroundColor="${c.leftBackgroundColor}"
  rightBackgroundColor="${c.rightBackgroundColor}"
  leftKnobColor="${c.leftKnobColor}"
  rightKnobColor="${c.rightKnobColor}"
/>`;
}

function cssSnippet(c: ThemeConfig): string {
  const knobRadius = c.knobRadius >= 999 ? "100%" : `${c.knobRadius}px`;
  return `.my-toggle {
  --rt-width: ${c.width}px;
  --rt-height: ${c.height}px;
  --rt-border-width: ${c.borderWidth}px;
  --rt-radius: ${c.radius}px;
  --rt-radius-bg: ${c.radiusBackground}px;
  --rt-knob-radius: ${knobRadius};
  --rt-knob-width: ${c.knobWidth}px;
  --rt-knob-height: ${c.knobHeight}px;
  --rt-knob-gap: ${c.knobGap}px;
  --rt-border-color-off: ${c.leftBorderColor};
  --rt-border-color-on: ${c.rightBorderColor};
  --rt-background-color-off: ${c.leftBackgroundColor};
  --rt-background-color-on: ${c.rightBackgroundColor};
  --rt-knob-color-off: ${c.leftKnobColor};
  --rt-knob-color-on: ${c.rightKnobColor};
}`;
}
