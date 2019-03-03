import baseTheme from "../theme/theme";

/**
 * Replicate darken and lighten less function.
 *
 * @param per Percentage
 * @returns {string}
 */
function blendColor(color: string, per: number): string {

  const f = parseInt(color.slice(1), 16);
  const percent = per / 100;
  const t = percent < 0 ? 0 : 255;
  const p = percent < 0 ? percent * -1 : percent;
  const R = f >> 16;
  const G = f >> 8 & 0x00FF;
  const B = f & 0x0000FF;

  return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1)
}

/**
 * Apply alpha opacity to a color.
 *
 * @param opacity
 * @returns {string}
 */
function fadeColor(color: string, opacity: number): string {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
}

/**
 * Return the color of the default theme.
 * You'll use this function in the styled component. For example: `${p => colorTheme("brand")}`
 *
 * @param color {string} Name of color
 *
 * @returns {any}
 */
function colorTheme(color:string) {
  return baseTheme.colors[color];
}


/**
 * Check if the parent theme provider support the color. If the color is not found, will be use the base theme color instead.
 * You'll use this function in the styled component. For example: `${p => p.color || colorProvider(p,"brand")}`
 *
 * @param {any}    p     Props
 * @param {string} color The color. For example, "green", "brand", ...
 *
 * @returns {any}
 */
function colorProvider(p: any, color: string) {
  return (p.theme && p.theme.colors && p.theme.colors[color]) || colorTheme(color)
}

export {blendColor, fadeColor, colorProvider, colorTheme};