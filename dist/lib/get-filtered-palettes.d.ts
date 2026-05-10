import { Palette } from './types';
interface FilteredPaletteOpts {
    minLightness?: number;
    maxLightness?: number;
    minContrast?: number;
    minContrastCompare?: string;
}
export declare function getFilteredPalettes({ minColors, maxColors, ...opts }: FilteredPaletteOpts & {
    minColors?: number;
    maxColors?: number;
}): {
    name: string;
    colors: string[];
}[];
export declare function filterPalette(palette: Palette, { minLightness, maxLightness, minContrast, minContrastCompare }: FilteredPaletteOpts): string[];
export {};
