export const VARIANT = {
  FOREST_DARK: "forestDark",
  DARK: "dark",
  LIGHT: "light",
};

export function getThemeVariant(dark, theme) {
  if (dark && theme === "forest") return VARIANT.FOREST_DARK;
  if (dark) return VARIANT.DARK;
  return VARIANT.LIGHT;
}
