import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export interface ThemeConfig {
  width: number;
  height: number;
  borderWidth: number;
  radius: number;
  radiusBackground: number;
  knobRadius: number;
  knobWidth: number;
  knobHeight: number;
  knobGap: number;
  leftBorderColor: string;
  rightBorderColor: string;
  leftBackgroundColor: string;
  rightBackgroundColor: string;
  leftKnobColor: string;
  rightKnobColor: string;
}

export const DEFAULT_CONFIG: ThemeConfig = {
  width: 64,
  height: 32,
  borderWidth: 2,
  radius: 32,
  radiusBackground: 32,
  knobRadius: 999,
  knobWidth: 24,
  knobHeight: 24,
  knobGap: 4,
  leftBorderColor: "#d4d4d8",
  rightBorderColor: "#6366f1",
  leftBackgroundColor: "#ffffff",
  rightBackgroundColor: "#ffffff",
  leftKnobColor: "#d4d4d8",
  rightKnobColor: "#6366f1",
};

interface ThemeConfigContextValue {
  config: ThemeConfig;
  setConfig: (next: ThemeConfig | ((prev: ThemeConfig) => ThemeConfig)) => void;
  patch: (delta: Partial<ThemeConfig>) => void;
  reset: () => void;
  shareUrl: string;
}

const Ctx = createContext<ThemeConfigContextValue | null>(null);

const ORDER: (keyof ThemeConfig)[] = [
  "width",
  "height",
  "borderWidth",
  "radius",
  "radiusBackground",
  "knobRadius",
  "knobWidth",
  "knobHeight",
  "knobGap",
  "leftBorderColor",
  "rightBorderColor",
  "leftBackgroundColor",
  "rightBackgroundColor",
  "leftKnobColor",
  "rightKnobColor",
];

function encodeConfig(c: ThemeConfig): string {
  const arr = ORDER.map((k) => c[k]);
  return btoa(JSON.stringify(arr)).replace(/=+$/, "");
}

function decodeConfig(token: string): ThemeConfig | null {
  try {
    const padded = token + "=".repeat((4 - (token.length % 4)) % 4);
    const arr = JSON.parse(atob(padded)) as Array<string | number>;
    if (!Array.isArray(arr) || arr.length !== ORDER.length) return null;
    const next = { ...DEFAULT_CONFIG };
    ORDER.forEach((k, i) => {
      const val = arr[i];
      if (typeof DEFAULT_CONFIG[k] === "number" && typeof val === "number") {
        (next as Record<string, unknown>)[k] = val;
      } else if (typeof DEFAULT_CONFIG[k] === "string" && typeof val === "string") {
        (next as Record<string, unknown>)[k] = val;
      }
    });
    return next;
  } catch {
    return null;
  }
}

export function ThemeConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfigState] = useState<ThemeConfig>(() => {
    if (typeof window === "undefined") return DEFAULT_CONFIG;
    const param = new URLSearchParams(window.location.search).get("t");
    if (!param) return DEFAULT_CONFIG;
    return decodeConfig(param) ?? DEFAULT_CONFIG;
  });

  const setConfig = useCallback((next: ThemeConfig | ((prev: ThemeConfig) => ThemeConfig)) => {
    setConfigState((prev) => (typeof next === "function" ? (next as (p: ThemeConfig) => ThemeConfig)(prev) : next));
  }, []);

  const patch = useCallback((delta: Partial<ThemeConfig>) => {
    setConfigState((prev) => ({ ...prev, ...delta }));
  }, []);

  const reset = useCallback(() => setConfigState(DEFAULT_CONFIG), []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const isDefault = ORDER.every((k) => config[k] === DEFAULT_CONFIG[k]);
    if (isDefault) {
      url.searchParams.delete("t");
    } else {
      url.searchParams.set("t", encodeConfig(config));
    }
    window.history.replaceState(null, "", url.toString());
  }, [config]);

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    const url = new URL(window.location.href);
    const isDefault = ORDER.every((k) => config[k] === DEFAULT_CONFIG[k]);
    if (isDefault) url.searchParams.delete("t");
    else url.searchParams.set("t", encodeConfig(config));
    return url.toString();
  }, [config]);

  const value = useMemo(() => ({ config, setConfig, patch, reset, shareUrl }), [config, setConfig, patch, reset, shareUrl]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useThemeConfig() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useThemeConfig must be used within ThemeConfigProvider");
  return v;
}

export function configToCSSVars(c: ThemeConfig): Record<string, string> {
  return {
    "--rt-width": `${c.width}px`,
    "--rt-height": `${c.height}px`,
    "--rt-border-width": `${c.borderWidth}px`,
    "--rt-radius": `${c.radius}px`,
    "--rt-radius-bg": `${c.radiusBackground}px`,
    "--rt-knob-radius": c.knobRadius >= 999 ? "100%" : `${c.knobRadius}px`,
    "--rt-knob-width": `${c.knobWidth}px`,
    "--rt-knob-height": `${c.knobHeight}px`,
    "--rt-knob-gap": `${c.knobGap}px`,
    "--rt-border-color-off": c.leftBorderColor,
    "--rt-border-color-on": c.rightBorderColor,
    "--rt-background-color-off": c.leftBackgroundColor,
    "--rt-background-color-on": c.rightBackgroundColor,
    "--rt-knob-color-off": c.leftKnobColor,
    "--rt-knob-color-on": c.rightKnobColor,
  };
}
