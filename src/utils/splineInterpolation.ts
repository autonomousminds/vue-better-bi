/**
 * Monotone cubic spline interpolation for stacked area charts.
 *
 * When ECharts smooths stacked series it computes each series' Bezier curve
 * independently, so adjacent stack boundaries can diverge and create visible
 * white gaps.  By pre-interpolating the data with many intermediate points we
 * can set `smooth: false` in ECharts while still getting a visually smooth
 * curve — and because all series share the exact same x-positions the stacked
 * areas align perfectly with no gaps.
 *
 * Uses Fritsch–Carlson monotone cubic interpolation to avoid overshooting.
 */

/**
 * Interpolates additional points into a series data array.
 *
 * @param points  Array of `[x, y, ...extra]` tuples (x must be numeric or Date-parseable).
 * @param steps   Number of sub-divisions between each pair of original points (default 8).
 * @returns       New array with interpolated points inserted between originals.
 */
export function interpolateSeriesData(
  points: unknown[][],
  steps: number = 8
): unknown[][] {
  if (points.length < 3) return points;

  // Convert x values to numeric for interpolation
  const xs: number[] = [];
  const ys: number[] = [];
  for (const pt of points) {
    const xRaw = pt[0];
    let xNum: number;
    if (typeof xRaw === 'number') {
      xNum = xRaw;
    } else if (xRaw instanceof Date) {
      xNum = xRaw.getTime();
    } else {
      // Try to parse as date string
      const d = new Date(String(xRaw));
      xNum = isNaN(d.getTime()) ? NaN : d.getTime();
    }
    if (isNaN(xNum)) return points; // bail out if x can't be numericised
    xs.push(xNum);
    ys.push(typeof pt[1] === 'number' ? pt[1] : 0);
  }

  // Compute monotone cubic Hermite tangents (Fritsch–Carlson)
  const n = xs.length;
  const deltas: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    const dx = xs[i + 1] - xs[i];
    deltas.push(dx === 0 ? 0 : (ys[i + 1] - ys[i]) / dx);
  }

  const m: number[] = new Array(n);
  m[0] = deltas[0];
  m[n - 1] = deltas[n - 2];
  for (let i = 1; i < n - 1; i++) {
    if (deltas[i - 1] * deltas[i] <= 0) {
      m[i] = 0;
    } else {
      m[i] = (deltas[i - 1] + deltas[i]) / 2;
    }
  }

  // Fritsch–Carlson monotonicity fix
  for (let i = 0; i < n - 1; i++) {
    if (deltas[i] === 0) {
      m[i] = 0;
      m[i + 1] = 0;
    } else {
      const alpha = m[i] / deltas[i];
      const beta = m[i + 1] / deltas[i];
      const s = alpha * alpha + beta * beta;
      if (s > 9) {
        const tau = 3 / Math.sqrt(s);
        m[i] = tau * alpha * deltas[i];
        m[i + 1] = tau * beta * deltas[i];
      }
    }
  }

  // Hermite basis interpolation
  function hermite(idx: number, t: number): number {
    const h = xs[idx + 1] - xs[idx];
    const t2 = t * t;
    const t3 = t2 * t;
    const h00 = 2 * t3 - 3 * t2 + 1;
    const h10 = t3 - 2 * t2 + t;
    const h01 = -2 * t3 + 3 * t2;
    const h11 = t3 - t2;
    return h00 * ys[idx] + h10 * h * m[idx] + h01 * ys[idx + 1] + h11 * h * m[idx + 1];
  }

  // Build output with interpolated points
  const result: unknown[][] = [];
  const firstPt = points[0];
  const extraLen = firstPt.length - 2; // extra columns beyond [x, y]

  for (let i = 0; i < n - 1; i++) {
    // Original point
    result.push(points[i]);

    // Interpolated points between i and i+1
    for (let s = 1; s < steps; s++) {
      const t = s / steps;
      const xInterp = xs[i] + t * (xs[i + 1] - xs[i]);
      const yInterp = hermite(i, t);

      // Reconstruct the x value in the same format as the original
      const xOriginal = firstPt[0];
      let xOut: unknown;
      if (typeof xOriginal === 'number') {
        xOut = xInterp;
      } else if (xOriginal instanceof Date) {
        xOut = new Date(xInterp);
      } else {
        // Date string — output as ISO string matching the standardized format used
        // by dateParsing.ts (e.g. "2026-03-01T00:00:00")
        xOut = new Date(xInterp).toISOString().replace(/\.000Z$|Z$/, '');
      }

      const interpPt: unknown[] = [xOut, yInterp];
      // Fill extra columns with null (they're not meaningful for interpolated points)
      for (let e = 0; e < extraLen; e++) {
        interpPt.push(undefined);
      }
      result.push(interpPt);
    }
  }

  // Last original point
  result.push(points[n - 1]);

  return result;
}
