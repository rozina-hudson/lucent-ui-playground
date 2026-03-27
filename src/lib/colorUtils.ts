/** Parse a hex colour string into [r, g, b] components (0–255). */
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0"))
      .join("")
  );
}

/** Lighten (+amount) or darken (-amount) a hex colour by a fixed RGB delta. */
function adjustBrightness(hex: string, amount: number): string {
  const [r, g, b] = hexToRgb(hex);
  return rgbToHex(r + amount, g + amount, b + amount);
}

/**
 * When a user picks a border colour it may look fine in one theme but be
 * almost invisible in the other.  This simple helper nudges the colour lighter
 * in dark mode or darker in light mode so that we maintain a minimum amount of
 * contrast with the page background.  (We don't try to be clever about exact
 * ratios here – a fixed delta is good enough for the playground.)
 */
export function adjustBorderForTheme(
  hex: string,
  theme: "light" | "dark"
): string {
  // pick a small brightness delta; feel free to tweak later
  const delta = 30;
  if (theme === "dark") {
    // lighten a bit so it shows up on a dark background
    return lighten(hex, 0.2);
  } else {
    // darken a bit for a light surface
    return adjustBrightness(hex, -delta);
  }
}

/*
 * Mix a hex colour toward white by `ratio` (0 = original, 1 = white).
 * A positive ratio lightens, a negative ratio will darken (without dropping
 * below zero) but isn't as perceptually accurate as a true HSL-based approach.
 */
function lighten(hex: string, ratio: number): string {
  const [r, g, b] = hexToRgb(hex);
  return rgbToHex(
    r + (255 - r) * ratio,
    g + (255 - g) * ratio,
    b + (255 - b) * ratio
  );
}

/**
 * Derive accent token overrides from a single base colour.
 *
 * 0.27.1 accent model: 5 tokens derived from a single colour.
 * `accentActive` and `focusRing` have been removed — active states use
 * `accentHover` and focus rings use `accentBorder`.
 */
export function deriveAccentTokens(baseHex: string) {
  return {
    accentDefault: baseHex,
    accentHover: adjustBrightness(baseHex, -20),
    accentSubtle: lighten(baseHex, 0.88),
    accentBorder: baseHex,
    accentFg: getAccentFg(baseHex),
  } as {
    accentDefault: string;
    accentHover: string;
    accentSubtle: string;
    accentBorder: string;
    accentFg: string;
  };
}

/**
 * Return a hue-tinted foreground colour for text/icons on an accent surface.
 * Bright accents → dark tinted fg, dark accents → light tinted fg.
 */
function getAccentFg(hex: string): string {
  const [r, g, b] = hexToRgb(hex);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  // Convert to HSL for hue-tinted output
  const [h, s] = rgbToHsl(r, g, b);
  if (luminance > 0.5) {
    // Bright accent → dark fg
    return hslToHex(h, Math.min(s, 60), 12);
  } else {
    // Dark accent → light fg
    return hslToHex(h, Math.min(s, 20), 95);
  }
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l * 100];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [h * 360, s * 100, l * 100];
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color);
  };
  return rgbToHex(f(0), f(8), f(4));
}
