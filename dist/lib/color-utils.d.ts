export interface RGB {
    r: number;
    g: number;
    b: number;
}
export interface HSV {
    h: number;
    s: number;
    v: number;
}
export interface HSL {
    h: number;
    s: number;
    l: number;
}
export declare function hexToRgb(hex: string): RGB;
export declare function rgbToHsl(rgb: RGB): HSL;
export declare function hexToHsl(hex: string): HSL;
export interface OKLCH {
    l: number;
    c: number;
    h: number;
}
/**
 * Perceptually uniform lightness/chroma/hue.
 * // TODO test/double check this (AI wrote it)
 */
export declare function rgbToOklch(rgb: RGB): OKLCH;
export declare function hexToOklch(hex: string): OKLCH;
export declare function getRelativeLuminance(color: RGB | string): number;
export declare function getContrast(color1: RGB | string, color2: RGB | string): number;
