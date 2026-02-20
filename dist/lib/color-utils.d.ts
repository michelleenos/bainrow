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
export declare function rgbToHsv(rgb: RGB): HSV;
export declare function hsvToRgb(hsv: HSV): RGB;
export declare function rgbToHsl(rgb: RGB): HSL;
export declare function hexToHsl(hex: string): HSL;
export declare function getBrightness(color: string): number;
export declare function getValue(color: string): number;
export declare function getSaturation(color: string): number;
export declare function getRelativeLuminance(color: RGB | string): number;
export declare function getContrast(color1: RGB | string, color2: RGB | string): number;
