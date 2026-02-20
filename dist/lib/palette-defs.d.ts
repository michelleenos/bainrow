import type { Palette } from './types';
declare const paletteDefs: {
    ambry: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("yellow" | "blue" | "purple")[];
        variants: ({
            bg: string;
            stroke?: undefined;
            omit?: undefined;
        } | {
            bg: string;
            stroke: string;
            omit?: undefined;
        } | {
            bg: string;
            omit: string[];
            stroke?: undefined;
        })[];
    };
    autmn: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("orange" | "yellow" | "teal" | "purple")[];
        variants: ({
            bg: string;
            stroke: string;
        } | {
            bg: string;
            stroke?: undefined;
        })[];
    };
    brain: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("red" | "orange" | "yellow" | "green" | "blue" | "purple")[];
        variants: ({
            bg: string;
            stroke?: undefined;
        } | {
            bg: string;
            stroke: string;
        })[];
    };
    bubbles: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("green" | "blue" | "purple")[];
        variants: ({
            bg: string;
            stroke: string;
            omit?: undefined;
        } | {
            bg: string;
            omit: string[];
            stroke?: undefined;
        })[];
    };
    candy: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("orange" | "yellow" | "green" | "pink")[];
        variants: ({
            bg: string;
            stroke?: undefined;
        } | {
            bg: string;
            stroke: string;
        })[];
    };
    earthGem1: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("orange" | "green" | "pink" | "purple")[];
        variants: ({
            bg: string;
            stroke: string;
        } | {
            bg: string;
            stroke?: undefined;
        })[];
    };
    earthGem2: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("yellow" | "green" | "purple")[];
        variants: ({
            bg: string;
            stroke: string;
        } | {
            bg: string;
            stroke?: undefined;
        })[];
    };
    glowFish: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("orange" | "yellow" | "indigo" | "purple")[];
        variants: ({
            bg: string;
            add?: undefined;
        } | {
            add: string[];
            bg: string;
        })[];
    };
    goldenCloud: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("orange" | "yellow" | "blue" | "purple")[];
        variants: ({
            bg: string;
            stroke: string;
        } | {
            bg: string;
            stroke?: undefined;
        })[];
        credit: {
            url: string;
        };
    };
    harimau: {
        name: string;
        colors: string[];
        shades: ("yellow" | "green")[];
        variants: ({
            bg: string;
            stroke: string;
        } | {
            bg: string;
            stroke?: undefined;
        })[];
        credit: {
            url: string;
            name: string;
        };
    };
    livingRoom: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("red" | "green" | "blue" | "brown")[];
        variants: ({
            bg: string;
            stroke: string;
        } | {
            bg: string;
            stroke?: undefined;
        })[];
    };
    magritte: {
        credit: {
            url: string;
        };
        name: string;
        colors: string[];
        tags: string[];
        shades: ("red" | "brown")[];
        variants: ({
            bg: string;
            stroke?: undefined;
        } | {
            bg: string;
            stroke: string;
        })[];
    };
    market: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("red" | "pink" | "brown")[];
        variants: {
            bg: string;
        }[];
    };
    mondri: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("red" | "yellow" | "blue")[];
        variants: ({
            bg: string;
            stroke: string;
        } | {
            bg: string;
            stroke?: undefined;
        })[];
    };
    mountains: {
        name: string;
        colors: string[];
        tags: string[];
        shades: "green"[];
        variants: ({
            bg: string;
            stroke?: undefined;
        } | {
            bg: string;
            stroke: string;
        })[];
    };
    mystery: {
        name: string;
        credit: {
            url: string;
            name: string;
        };
        colors: string[];
        tags: string[];
        shades: "green"[];
        variants: {
            bg: string;
        }[];
    };
    natura: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("green" | "blue" | "teal")[];
        variants: ({
            bg: string;
            stroke: string;
        } | {
            bg: string;
            stroke?: undefined;
        })[];
    };
    neopolito: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("orange" | "teal" | "purple")[];
        variants: ({
            bg: string;
            stroke?: undefined;
        } | {
            bg: string;
            stroke: string;
        })[];
    };
    nikkeidai: {
        name: string;
        credit: {
            url: string;
            name: string;
        };
        colors: string[];
        variants: {
            bg: string;
        }[];
    };
    pearly: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("blue" | "purple")[];
        variants: ({
            bg: string;
            omit?: undefined;
        } | {
            bg: string;
            omit: string[];
        })[];
    };
    rebo: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("red" | "orange" | "green" | "teal")[];
        variants: ({
            bg: string;
            stroke?: undefined;
        } | {
            bg: string;
            stroke: string;
        })[];
    };
    solarFlair: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("red" | "yellow" | "blue" | "purple")[];
        variants: ({
            bg: string;
            stroke: string;
        } | {
            bg: string;
            stroke?: undefined;
        })[];
    };
    squiggles: {
        name: string;
        colors: string[];
        shades: ("yellow" | "blue")[];
        tags: string[];
        variants: {
            bg: string;
        }[];
    };
    toyish: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("orange" | "green" | "pink" | "purple")[];
        variants: ({
            bg: string;
            omit?: undefined;
        } | {
            bg: string;
            omit: string[];
        })[];
    };
    twi: {
        name: string;
        colors: string[];
        shades: ("red" | "blue")[];
        tags: string[];
        variants: ({
            bg: string;
            stroke?: undefined;
        } | {
            bg: string;
            stroke: string;
        })[];
    };
    untitledApril15: {
        name: string;
        colors: string[];
        shades: ("red" | "blue")[];
        tags: string[];
        variants: ({
            bg: string;
            stroke: string;
        } | {
            bg: string;
            stroke?: undefined;
        })[];
    };
    valen: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("red" | "pink" | "purple")[];
        variants: ({
            bg: string;
            stroke: string;
            add?: undefined;
            omit?: undefined;
        } | {
            bg: string;
            stroke?: undefined;
            add?: undefined;
            omit?: undefined;
        } | {
            bg: string;
            add: string[];
            omit: string[];
            stroke?: undefined;
        })[];
    };
};
export type PaletteName = keyof typeof paletteDefs;
export declare const palettes: { [key in PaletteName]: Palette; };
export {};
