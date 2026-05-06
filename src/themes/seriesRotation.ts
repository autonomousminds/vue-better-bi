/**
 * Per-series style rotation for charts whose series count exceeds the color palette.
 *
 * The first wrap (seriesIndex < paletteLength) keeps whatever the chart's chart-wide
 * `lineType` / `markerShape` props specify. Subsequent wraps cycle line dash patterns
 * and marker shapes so that lines sharing a color stay visually distinguishable.
 */

export const LINE_TYPE_ROTATION = ['solid', 'dashed', 'dotted'] as const;

export const MARKER_SHAPE_ROTATION = [
  'circle',
  'rect',
  'triangle',
  'diamond',
  'pin',
  'arrow'
] as const;

export type RotatedLineType = (typeof LINE_TYPE_ROTATION)[number];
export type RotatedMarkerShape = (typeof MARKER_SHAPE_ROTATION)[number];

/**
 * Returns a dash pattern when the palette wraps, or null while the index still
 * fits within the first color cycle (callers should leave the chart-wide value
 * untouched in that case).
 */
export function getRotatedLineType(
  seriesIndex: number,
  paletteLength: number
): RotatedLineType | null {
  if (paletteLength <= 0 || seriesIndex < paletteLength) return null;
  const wrap = Math.floor(seriesIndex / paletteLength);
  return LINE_TYPE_ROTATION[wrap % LINE_TYPE_ROTATION.length];
}

/**
 * Returns a marker shape when the palette wraps, or null for the first cycle.
 */
export function getRotatedMarkerShape(
  seriesIndex: number,
  paletteLength: number
): RotatedMarkerShape | null {
  if (paletteLength <= 0 || seriesIndex < paletteLength) return null;
  const wrap = Math.floor(seriesIndex / paletteLength);
  return MARKER_SHAPE_ROTATION[wrap % MARKER_SHAPE_ROTATION.length];
}
