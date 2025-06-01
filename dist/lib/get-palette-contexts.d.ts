import { PaletteName } from './palette-defs';
import type { Palette, PaletteWithContext } from './types';
export type GetPaletteContextsOptions = {
    minContrastBg?: number;
    isolateColors?: boolean;
    useStroke?: boolean;
    minColors?: number;
    bgShade?: {
        type: 'dark' | 'light';
        limit?: number;
    };
};
export declare function getPaletteContexts(palette: Palette, { minContrastBg, isolateColors, useStroke, minColors, bgShade }?: GetPaletteContextsOptions): PaletteWithContext[];
export type GetAllPaletteContextsOptions = GetPaletteContextsOptions & {
    excludePalettes?: PaletteName[];
    includePalettes?: PaletteName[];
};
export declare function getAllPaletteContexts({ excludePalettes, includePalettes, ...options }?: GetAllPaletteContextsOptions): PaletteWithContext[];
