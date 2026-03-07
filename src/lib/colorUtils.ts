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
 * LucentProvider (0.5+) automatically computes `textOnAccent` and
 * `accentBorder` from `accentDefault`, so we only need to supply the
 * tokens the provider does NOT derive on its own.
 */
export function deriveAccentTokens(baseHex: string) {
  return {
    accentDefault: baseHex,
    accentHover: adjustBrightness(baseHex, -20),
    accentActive: adjustBrightness(baseHex, -40),
    accentSubtle: lighten(baseHex, 0.88),
    focusRing: baseHex,
  } as {
    accentDefault: string;
    accentHover: string;
    accentActive: string;
    accentSubtle: string;
    focusRing: string;
  };
}
