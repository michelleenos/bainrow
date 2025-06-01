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
export declare function getAllPaletteContexts(options?: GetPaletteContextsOptions): PaletteWithContext[];
