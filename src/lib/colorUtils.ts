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

/** Mix a hex colour toward white by `ratio` (0 = original, 1 = white). */
function lighten(hex: string, ratio: number): string {
  const [r, g, b] = hexToRgb(hex);
  return rgbToHex(
    r + (255 - r) * ratio,
    g + (255 - g) * ratio,
    b + (255 - b) * ratio
  );
}

/**
 * Derive a full set of accent token overrides from a single base colour.
 */
export function deriveAccentTokens(baseHex: string) {
  return {
    accentDefault: baseHex,
    accentHover: adjustBrightness(baseHex, -20),
    accentActive: adjustBrightness(baseHex, -40),
    accentSubtle: lighten(baseHex, 0.88),
    focusRing: baseHex,
  };
}
