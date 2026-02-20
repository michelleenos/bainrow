export type RoyGBiv = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'indigo' | 'violet' | 'teal' | 'pink' | 'purple' | 'gray' | 'brown';
type VariantDef = {
    bg: string;
    stroke?: string;
    omit?: string[];
    add?: string[];
};
export type Palette = {
    colors: string[];
    name: string;
    tags?: string[];
    shades?: RoyGBiv[];
    credit?: {
        url?: string;
        name?: string;
    };
    variants: VariantDef[];
};
export type PaletteVariant = {
    bg: string;
    stroke?: string;
    colors: string[];
    name: string;
};
export {};
