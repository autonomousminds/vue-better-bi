/**
 * Pre-built theme presets
 */

import type { Theme } from '../types';
import { configureThemes } from './echartsThemes';

export type ThemePreset = Partial<Theme>;

/** Warm earth tones — browns, tans, and sandy hues */
const sandstone: ThemePreset = {
  colors: {
    'base-100': '#fff5ee',
    'base-200': '#f7ede6',
    'base-300': '#d6ccc5',
    'base-content': '#2e2c2a',
    'base-content-muted': '#74716f',
    'base-heading': '#0a0603'
  },
  colorPalettes: {
    default: [
      '#8b4513', '#a0522d', '#d2691e', '#cd853f', '#d2b48c',
      '#deb887', '#f4a460', '#f5deb3', '#ffdead', '#ffe4c4'
    ]
  },
  colorScales: {}
};

/** Dark theme with vibrant purple, cyan, and pink accents */
const midnight: ThemePreset = {
  colors: {
    'base-100': '#f8f8f2',
    'base-200': '#f0f0ea',
    'base-300': '#cfcfc9',
    'base-content': '#2c2c2b',
    'base-content-muted': '#717170',
    'base-heading': '#070705'
  },
  colorPalettes: {
    default: [
      '#bd93f9', '#8be9fd', '#ff79c6', '#50fa7b',
      '#ffb86c', '#ff5555', '#f1fa8c', '#6272a4'
    ]
  },
  colorScales: {
    default: ['#bd93f9', '#ff79c6']
  }
};

/** Natural greens and teals */
const evergreen: ThemePreset = {
  colors: {
    'base-100': '#f0fff0',
    'base-200': '#e8f7e8',
    'base-300': '#c7d6c7',
    'base-content': '#2a2e2a',
    'base-content-muted': '#6f746f',
    'base-heading': '#030a03'
  },
  colorPalettes: {
    default: [
      '#556b2f', '#6b8e23', '#8fbc8f', '#2e8b57', '#3cb371',
      '#66cdaa', '#20b2aa', '#008b8b', '#5f9ea0', '#4682b4'
    ]
  },
  colorScales: {}
};

/** Monochromatic grayscale with subtle gray background */
const grayscale: ThemePreset = {
  colors: {
    'base-100': '#f0f0f0',
    'base-200': '#e8e8e8',
    'base-300': '#c8c8c8',
    'base-content': '#2c2c2c',
    'base-content-muted': '#717171',
    'base-heading': '#060606'
  },
  colorPalettes: {
    default: ['#000000', '#444444', '#888888', '#CCCCCC']
  },
  colorScales: {
    default: ['#000000', '#CCCCCC']
  }
};

/** Scientific color gradient from deep blue to bright yellow */
const spectrum: ThemePreset = {
  colors: {
    'base-100': '#f0edff',
    'base-200': '#e8e5f7',
    'base-300': '#c7c4d6',
    'base-content': '#2b2a2e',
    'base-content-muted': '#706f74',
    'base-heading': '#050407'
  },
  colorPalettes: {
    default: [
      '#0d0887', '#3e049c', '#6300a7', '#8606a6', '#a62098', '#c03a83',
      '#d5546e', '#e76f5a', '#f68d45', '#fdae32', '#fcd225', '#f0f921'
    ]
  },
  colorScales: {
    default: [
      '#0d0887', '#3e049c', '#6300a7', '#8606a6', '#a62098', '#c03a83',
      '#d5546e', '#e76f5a', '#f68d45', '#fdae32', '#fcd225', '#f0f921'
    ]
  }
};

/** Bold retro primary colors on paper-white background */
const vintage: ThemePreset = {
  colors: {
    'base-100': '#F8F5EE',
    'base-200': '#f0ede6',
    'base-300': '#cfccc5',
    'base-content': '#2d2c2b',
    'base-content-muted': '#727170',
    'base-heading': '#080705'
  },
  colorPalettes: {
    default: [
      '#009ddc', '#963d97', '#e03a3e', '#f5821f', '#fdb827',
      '#61bb46', '#ffcc00', '#ff7f50', '#ff6347', '#ff4500', '#da70d6'
    ]
  },
  colorScales: {
    default: ['#009ddc', '#e03a3e']
  }
};

/**
 * All available theme presets
 */
export const themePresets = {
  sandstone,
  midnight,
  evergreen,
  grayscale,
  spectrum,
  vintage
} as const;

export type ThemePresetName = keyof typeof themePresets;

/**
 * Applies a pre-built theme preset
 */
export function applyPreset(name: ThemePresetName): void {
  configureThemes(themePresets[name]);
}
