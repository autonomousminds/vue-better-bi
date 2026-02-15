/**
 * Color palette and resolution utilities
 */

import chroma from 'chroma-js';
import type {
  ColorPaletteInput,
  ColorScaleInput,
  Theme
} from '../types';
import { getTheme } from './echartsThemes';

/**
 * Checks if input is a string tuple [string] or [string, string]
 */
function isStringTuple(input: unknown): input is [string] | [string, string] {
  return (
    Array.isArray(input) &&
    (input.length === 1 || input.length === 2) &&
    input.every((item) => typeof item === 'string')
  );
}

/**
 * Resolves a color input to an actual color string
 */
export function resolveColor<T>(
  input: T
): string | T | undefined {
  const currentTheme = getTheme();

  if (typeof input === 'string') {
    return currentTheme.colors[input.trim()] ?? input;
  }

  if (isStringTuple(input)) {
    const [light] = input;
    return currentTheme.colors[light.trim()] ?? light;
  }

  return undefined;
}

/**
 * Resolves an object of colors to their actual values
 */
export function resolveColorsObject<T>(
  input: Record<string, T> | undefined
): Record<string, string | T | undefined> | undefined {
  if (!input) return undefined;

  return Object.fromEntries(
    Object.entries(input).map(([key, color]) => [
      key,
      resolveColor(color)
    ])
  );
}

/**
 * Resolves a color palette input to an array of colors
 */
export function resolveColorPalette<T extends ColorPaletteInput>(
  input: T,
  theme: Theme
): string[] | undefined {
  if (typeof input === 'string') {
    return theme.colorPalettes[input.trim()];
  }

  if (Array.isArray(input)) {
    return input.map((color) => {
      if (typeof color === 'string') {
        return theme.colors[color.trim()] ?? color;
      }
      return String(color);
    });
  }

  return undefined;
}

/**
 * Resolves a color scale input to an array of colors for gradients
 */
export function resolveColorScale<T extends ColorScaleInput>(
  input: T,
  theme: Theme
): string[] | undefined {
  if (typeof input === 'string') {
    const colorScale = theme.colorScales[input.trim()];
    if (colorScale) return colorScale;

    const color = theme.colors[input.trim()];
    if (color) return [theme.colors['base-100'], color];

    if (chroma.valid(input)) {
      return [theme.colors['base-100'], input];
    }

    return undefined;
  }

  if (Array.isArray(input)) {
    return input.map((color) => {
      if (typeof color === 'string') {
        return theme.colors[color.trim()] ?? color;
      }
      return String(color);
    });
  }

  return undefined;
}

/**
 * Generates a color scale from two endpoints with n steps
 */
export function generateColorScale(
  startColor: string,
  endColor: string,
  steps: number = 10
): string[] {
  return chroma.scale([startColor, endColor]).mode('lch').colors(steps);
}

/**
 * Gets a contrasting text color (black or white) for a background color
 */
export function getContrastingTextColor(backgroundColor: string): string {
  if (!chroma.valid(backgroundColor)) {
    return '#000000';
  }
  const luminance = chroma(backgroundColor).luminance();
  return luminance > 0.5 ? '#000000' : '#ffffff';
}

/**
 * Adjusts color opacity
 */
export function setColorOpacity(color: string, opacity: number): string {
  if (!chroma.valid(color)) {
    return color;
  }
  return chroma(color).alpha(opacity).css();
}

/**
 * Named color palettes
 */
export const namedPalettes: Record<string, string[]> = {
  default: [
    '#236aa4',
    '#45a1bf',
    '#a5cdee',
    '#8dacbf',
    '#85c7c6',
    '#d2c6ac',
    '#f4b548',
    '#8f3d56',
    '#71b9f4',
    '#46a485'
  ],
  categorical: [
    '#3366cc',
    '#dc3912',
    '#ff9900',
    '#109618',
    '#990099',
    '#0099c6',
    '#dd4477',
    '#66aa00',
    '#b82e2e',
    '#316395'
  ],
  pastel: [
    '#a6cee3',
    '#b2df8a',
    '#fdbf6f',
    '#cab2d6',
    '#fb9a99',
    '#ffff99',
    '#1f78b4',
    '#33a02c',
    '#e31a1c'
  ],
  vivid: [
    '#e41a1c',
    '#377eb8',
    '#4daf4a',
    '#984ea3',
    '#ff7f00',
    '#ffff33',
    '#a65628',
    '#f781bf',
    '#999999'
  ],
  cool: [
    '#313695',
    '#4575b4',
    '#74add1',
    '#abd9e9',
    '#e0f3f8',
    '#fee090',
    '#fdae61',
    '#f46d43',
    '#d73027'
  ],
  warm: [
    '#b35806',
    '#e08214',
    '#fdb863',
    '#fee0b6',
    '#f7f7f7',
    '#d8daeb',
    '#b2abd2',
    '#8073ac',
    '#542788'
  ]
};

/**
 * Named color scales for continuous data
 */
export const namedScales: Record<string, string[]> = {
  default: ['#ADD8E6', '#00008B'],
  blue: ['#ADD8E6', '#00008B'],
  green: ['#90EE90', '#006400'],
  red: ['#FFB6C1', '#8B0000'],
  orange: ['#FFDAB9', '#FF4500'],
  purple: ['#E6E6FA', '#4B0082'],
  grey: ['#ffffff', '#000000'],
  blueGreen: ['#f7fcf0', '#00441b'],
  yellowGreen: ['#ffffe5', '#004529'],
  yellowOrangeRed: ['#ffffcc', '#800026'],
  redPurple: ['#fff7f3', '#49006a'],
  purpleBlue: ['#fff7fb', '#023858'],
  diverging: ['#d73027', '#f7f7f7', '#1a9850']
};
