export type RGB = {
    r: number;
    g: number;
    b: number;
};
export declare function hexToRgb(hex: string): RGB;
export declare function getLuminance(color: RGB | string): number;
export declare function getContrast(color1: RGB | string, color2: RGB | string): number;
