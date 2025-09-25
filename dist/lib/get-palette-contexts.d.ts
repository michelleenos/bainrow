import { PaletteName } from './palette-defs';
import type { Palette, PaletteWithContext } from './types';
export type SinglePaletteContextOptions = {
    minContrastBg?: number;
    isolateColors?: boolean;
    useStroke?: boolean;
    minColors?: number;
    bgShade?: {
        type: 'dark' | 'light';
        limit?: number;
    };
};
export declare function getSinglePaletteContexts(palette: Palette, { minContrastBg, isolateColors, useStroke, minColors, bgShade, }?: SinglePaletteContextOptions): PaletteWithContext[];
export type GetPaletteContextOptions = SinglePaletteContextOptions & {
    excludePalettes?: PaletteName[];
    includePalettes?: PaletteName[];
};
export declare function getPaletteContexts({ excludePalettes, includePalettes, ...options }?: GetPaletteContextOptions): PaletteWithContext[];
