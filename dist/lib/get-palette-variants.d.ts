import { PaletteName } from './palette-defs';
import type { Palette, PaletteVariant } from './types';
type SinglePaletteVariantOpts = {
    /**
     * minimum contrast ratio against background color
     */
    minContrastBg?: number;
    /**
     * if true, don't repeat the background or stroke colors in the colors list
     */
    isolateColors?: boolean;
    /**
     * Whether to include a stroke color
     * @default true
     */
    useStroke?: boolean;
    minColors?: number;
    maxColors?: number;
    bgShade?: {
        /**
         * background shade
         */
        type?: 'dark' | 'light' | 'edge';
        /**
         * will keep lightness value on the dark/light edge by this amount.
         * accepts values between 0 and 100
         * @default 50
         */
        edge?: number;
        /**
         * max hsl saturation
         */
        maxSaturation?: number;
    };
};
export declare function getVariantsFromSinglePalette(palette: Palette, { minContrastBg, isolateColors, useStroke, minColors, maxColors, bgShade, }?: SinglePaletteVariantOpts): PaletteVariant[];
export type GetPaletteVariantOpts = SinglePaletteVariantOpts & {
    excludePalettes?: PaletteName[];
    includePalettes?: PaletteName[];
};
export declare function getPaletteVariants({ excludePalettes, includePalettes, ...options }?: GetPaletteVariantOpts): PaletteVariant[];
export {};
