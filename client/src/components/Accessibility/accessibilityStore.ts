import { useSyncExternalStore } from "react";

const KEY = "sesi:accessibility";
const EVENT = "sesi:accessibility-change";

export const FONT_STEPS = [100, 115, 130, 150] as const;
export const SPACINGS = ["normal", "medium", "large"] as const;
export const COLOR_MODES = ["none", "protanopia", "deuteranopia", "tritanopia", "grayscale"] as const;

export type Spacing = (typeof SPACINGS)[number];
export type ColorMode = (typeof COLOR_MODES)[number];

export type A11ySettings = {
  fontScale: (typeof FONT_STEPS)[number]; // % do tamanho padrão
  spacing: Spacing;
  colorMode: ColorMode;
  highContrast: boolean;
  reduceMotion: boolean;
  ruler: boolean;
};

const DEFAULTS: A11ySettings = {
  fontScale: 100,
  spacing: "normal",
  colorMode: "none",
  highContrast: false,
  reduceMotion:
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  ruler: false,
};

let cachedRaw: string | null | undefined;
let cached: A11ySettings = DEFAULTS;

function read(): A11ySettings {
  let raw: string | null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {
    // acesso bloqueado (ex.: modo privado): fica só em memória
    return cached;
  }
  if (raw === cachedRaw) return cached;

  cachedRaw = raw;
  try {
    const saved = raw ? (JSON.parse(raw) as Partial<A11ySettings>) : {};
    cached = {
      fontScale: FONT_STEPS.includes(saved.fontScale as never) ? saved.fontScale! : DEFAULTS.fontScale,
      spacing: SPACINGS.includes(saved.spacing as never) ? saved.spacing! : DEFAULTS.spacing,
      colorMode: COLOR_MODES.includes(saved.colorMode as never) ? saved.colorMode! : DEFAULTS.colorMode,
      highContrast: saved.highContrast ?? DEFAULTS.highContrast,
      reduceMotion: saved.reduceMotion ?? DEFAULTS.reduceMotion,
      ruler: saved.ruler ?? DEFAULTS.ruler,
    };
  } catch {
    cached = DEFAULTS;
  }
  return cached;
}

function write(next: A11ySettings | null) {
  try {
    if (next) localStorage.setItem(KEY, JSON.stringify(next));
    else localStorage.removeItem(KEY);
  } catch {
    // sem localStorage: mantém só em memória
  }
  cachedRaw = undefined;
  cached = next ?? DEFAULTS;
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(EVENT, callback);
  };
}

export function useA11ySettings() {
  const settings = useSyncExternalStore(subscribe, read);

  return {
    settings,
    update: (patch: Partial<A11ySettings>) => write({ ...read(), ...patch }),
    reset: () => write(null),
    isDefault: JSON.stringify(settings) === JSON.stringify(DEFAULTS),
  };
}

export function applySettings(s: A11ySettings = read()) {
  const html = document.documentElement;

  html.style.fontSize = s.fontScale === 100 ? "" : `${s.fontScale}%`;
  html.dataset.a11ySpacing = s.spacing;
  html.dataset.a11yMotion = s.reduceMotion ? "reduce" : "";
  html.dataset.a11yContrast = s.highContrast ? "high" : "";

  const filters: string[] = [];
  if (s.colorMode === "grayscale") filters.push("grayscale(1)");
  else if (s.colorMode !== "none") filters.push(`url(#a11y-${s.colorMode})`);
  if (s.highContrast) filters.push("contrast(1.35)");
  html.style.filter = filters.join(" ");
}

if (typeof window !== "undefined") applySettings();