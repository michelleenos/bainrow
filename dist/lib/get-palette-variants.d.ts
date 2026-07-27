import { PaletteName } from './palette-defs';
import type { Palette, PaletteVariant } from './types';
export type PaletteVariantName = `${PaletteName}-${number}`;
interface BgColorOptions {
    /**
     * only include variants with a background color that is dark, light, or on either edge of the spectrum
     */
    type?: 'dark' | 'light' | 'edge';
    /**
     * Will keep lightness value nearer to 0 or 100 (or both) by this amount
     *
     * For example, a value of 10 with a type = 'dark' means the variant will
     * be included if the background color has a lightness value of 10 or less.
     * With a type of 'edge', the variant will be included if the
     * background color has a lightness value of 10 or less, or 90 or more.
     *
     * Accepts values between 0 and 100
     *
     * @default 50
     */
    edge?: number;
    /**
     * @deprecated
     * max HSL saturation of background color
     */
    maxSaturation?: number;
    maxChroma?: number;
}
interface SinglePaletteVariantOpts {
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
     * @default false
     */
    useStroke?: boolean;
    /**
     * Require a stroke color for the variant to be included
     * @default false
     */
    requireStroke?: boolean;
    minColors?: number;
    maxColors?: number;
    bgColor?: string | BgColorOptions;
    /**
     * @deprecated use bgColor option instead
     */
    bgShade?: BgColorOptions;
}
export declare function getVariantsFromSinglePalette(palette: Palette, { minContrastBg, isolateColors, useStroke, requireStroke, minColors, maxColors, bgShade, bgColor, }?: SinglePaletteVariantOpts): PaletteVariant[];
interface BuildVariantOpts {
    isolateColors?: boolean;
    useStroke?: boolean;
}
export declare function buildVariant(palette: Palette, index: number, { useStroke, isolateColors }?: BuildVariantOpts): PaletteVariant;
export declare function getPaletteVariant(name: PaletteVariantName, opts?: BuildVariantOpts): PaletteVariant;
export type GetPaletteVariantOpts = SinglePaletteVariantOpts & {
    excludePalettes?: PaletteName[];
    includePalettes?: PaletteName[];
};
export declare function getPaletteVariants(names: PaletteVariantName[], opts?: BuildVariantOpts): PaletteVariant[];
export declare function getPaletteVariants(opts?: GetPaletteVariantOpts): PaletteVariant[];
export {};
