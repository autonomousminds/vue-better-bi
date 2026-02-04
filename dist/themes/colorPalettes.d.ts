import { Appearance, ColorPaletteInput, ColorScaleInput, Theme } from '../types';

/**
 * Converts a light color to a dark mode equivalent
 * Simple implementation - can be extended for more sophisticated conversion
 */
export declare function convertLightToDark(color: string): string | undefined;
/**
 * Resolves a color input to an actual color string based on appearance
 */
export declare function resolveColor<T>(input: T, appearance: Appearance): string | T | undefined;
/**
 * Resolves an object of colors to their actual values based on appearance
 */
export declare function resolveColorsObject<T>(input: Record<string, T> | undefined, appearance: Appearance): Record<string, string | T | undefined> | undefined;
/**
 * Resolves a color palette input to an array of colors
 */
export declare function resolveColorPalette<T extends ColorPaletteInput>(input: T, theme: Theme): string[] | undefined;
/**
 * Resolves a color scale input to an array of colors for gradients
 */
export declare function resolveColorScale<T extends ColorScaleInput>(input: T, theme: Theme): string[] | undefined;
/**
 * Generates a color scale from two endpoints with n steps
 */
export declare function generateColorScale(startColor: string, endColor: string, steps?: number): string[];
/**
 * Gets a contrasting text color (black or white) for a background color
 */
export declare function getContrastingTextColor(backgroundColor: string): string;
/**
 * Adjusts color opacity
 */
export declare function setColorOpacity(color: string, opacity: number): string;
/**
 * Named color palettes
 */
export declare const namedPalettes: Record<string, string[]>;
/**
 * Named color scales for continuous data
 */
export declare const namedScales: Record<string, string[]>;
