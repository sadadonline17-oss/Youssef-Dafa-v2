/**
 * Color utility functions for dynamic theming
 */

/**
 * Converts a Hex color string to HSL format compatible with Tailwind CSS.
 * Tailwind expects: "H S% L%" (e.g., "0 84% 37%")
 *
 * @param hex - Hex color string (e.g., "#DC291E", "DC291E", "#fff")
 * @returns HSL string in format "H S% L%"
 */
export function hexToHsl(hex: string): string {
  // Remove # if present
  hex = hex.replace(/^#/, '');

  // Handle short form (#RGB)
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }

  // Parse RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  let l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  // Convert to degrees and percentages
  const hDegrees = Math.round(h * 360);
  const sPercent = Math.round(s * 100);
  const lPercent = Math.round(l * 100);

  return `${hDegrees} ${sPercent}% ${lPercent}%`;
}

/**
 * Batch convert an object of Hex colors to HSL.
 * Useful for converting entire branding color palettes.
 *
 * @param hexColors - Object with Hex color values
 * @returns Object with HSL string values
 */
export function hexColorsToHsl(hexColors: Record<string, string>): Record<string, string> {
  const hslColors: Record<string, string> = {};
  for (const [key, hex] of Object.entries(hexColors)) {
    hslColors[key] = hexToHsl(hex);
  }
  return hslColors;
}
