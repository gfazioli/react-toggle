import { forwardRef, useCallback, type ChangeEvent, type CSSProperties } from "react";
import styles from "./Toggle.module.css";

export interface ToggleProps {
  className?: string;
  style?: CSSProperties;

  id?: string;
  name?: string;
  value?: string;

  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;

  onCheckedChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;

  /** @deprecated since v4 — use onCheckedChange */
  onToggle?: (event: ChangeEvent<HTMLInputElement>) => void;
  /** @deprecated since v4 — use onCheckedChange */
  onLeft?: (event: ChangeEvent<HTMLInputElement>) => void;
  /** @deprecated since v4 — use onCheckedChange */
  onRight?: (event: ChangeEvent<HTMLInputElement>) => void;

  width?: string;
  height?: string;

  borderWidth?: string;
  borderColor?: string;
  leftBorderColor?: string;
  rightBorderColor?: string;

  backgroundColor?: string;
  leftBackgroundColor?: string;
  rightBackgroundColor?: string;
  backgroundColorDisabled?: string;

  radius?: string;
  radiusBackground?: string;
  knobRadius?: string;

  knobWidth?: string;
  knobHeight?: string;
  knobGap?: string;
  knobColor?: string;
  leftKnobColor?: string;
  rightKnobColor?: string;

  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
}

type CSSVarStyle = CSSProperties & Record<`--${string}`, string | undefined>;

const VAR_MAP = {
  width: "--rt-width",
  height: "--rt-height",
  borderWidth: "--rt-border-width",
  borderColor: "--rt-border-color",
  leftBorderColor: "--rt-border-color-off",
  rightBorderColor: "--rt-border-color-on",
  backgroundColor: "--rt-background-color",
  leftBackgroundColor: "--rt-background-color-off",
  rightBackgroundColor: "--rt-background-color-on",
  backgroundColorDisabled: "--rt-background-color-disabled",
  radius: "--rt-radius",
  radiusBackground: "--rt-radius-bg",
  knobRadius: "--rt-knob-radius",
  knobWidth: "--rt-knob-width",
  knobHeight: "--rt-knob-height",
  knobGap: "--rt-knob-gap",
  knobColor: "--rt-knob-color",
  leftKnobColor: "--rt-knob-color-off",
  rightKnobColor: "--rt-knob-color-on",
} as const satisfies Record<string, `--${string}`>;

function buildCSSVars(props: ToggleProps): CSSVarStyle {
  const out: Record<string, string> = {};
  for (const [propName, varName] of Object.entries(VAR_MAP) as [keyof typeof VAR_MAP, string][]) {
    const v = props[propName];
    if (typeof v === "string") out[varName] = v;
  }
  return out as CSSVarStyle;
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(function Toggle(props, ref) {
  const {
    id,
    name,
    value,
    checked,
    defaultChecked,
    disabled,
    className,
    style,
    onCheckedChange,
    onChange,
    onToggle,
    onLeft,
    onRight,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    "aria-describedby": ariaDescribedby,
  } = props;

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const next = event.target.checked;
      onChange?.(event);
      onCheckedChange?.(next, event);
      onToggle?.(event);
      if (next) onRight?.(event);
      else onLeft?.(event);
    },
    [onChange, onCheckedChange, onToggle, onLeft, onRight],
  );

  const rootStyle: CSSVarStyle = { ...buildCSSVars(props), ...style };
  const isControlled = checked !== undefined;
  const stateProps = isControlled ? { checked } : { defaultChecked };
  const inputId = id ?? name;
  const rootClassName = className ? `${styles.root} ${className}` : styles.root;

  return (
    <span className={rootClassName} style={rootStyle}>
      <input
        ref={ref}
        type="checkbox"
        role="switch"
        className={styles.input}
        id={inputId}
        name={name}
        value={value}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        onChange={handleChange}
        {...stateProps}
      />
      <span className={styles.track} aria-hidden="true">
        <span className={styles.knob} />
      </span>
    </span>
  );
});

Toggle.displayName = "Toggle";
