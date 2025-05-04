import type { Palette, PaletteWithBg } from './types';
import { PaletteName } from './palette-defs';
export declare function getPaletteWithBg(palette: Palette | PaletteName, isolateColors?: boolean): PaletteWithBg[];
export type GetPalettesWithBgOptions = {
    isolateColors?: boolean;
    minColors?: number;
    exclude?: PaletteName[];
    include?: PaletteName[];
};
export declare function getPalettesWithBg({ isolateColors, minColors, exclude, include }?: GetPalettesWithBgOptions): PaletteWithBg[];
