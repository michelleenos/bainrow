export type RGB = {
    r: number;
    g: number;
    b: number;
};
export type HSV = {
    h: number;
    s: number;
    v: number;
};
export declare function hexToRgb(hex: string): RGB;
export declare function rgbToHsv(rgb: RGB): HSV;
export declare function getBrightness(color: string): number;
export declare function getValue(color: string): number;
export declare function getLuminance(color: RGB | string): number;
export declare function getContrast(color1: RGB | string, color2: RGB | string): number;
