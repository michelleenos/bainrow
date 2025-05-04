import type { Palette } from './types';
declare const paletteDefs: {
    ambry: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("yellow" | "blue" | "purple")[];
        contexts: ({
            bg: string;
            stroke: string;
        } | {
            bg: string;
            stroke?: undefined;
        })[];
    };
    autmn: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("orange" | "yellow" | "teal" | "purple")[];
        contexts: {
            bg: string;
            stroke: string;
        }[];
    };
    brain: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("red" | "orange" | "yellow" | "green" | "blue" | "purple")[];
        contexts: ({
            bg: string;
            stroke?: undefined;
        } | {
            bg: string;
            stroke: string;
        })[];
    };
    candy: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("orange" | "yellow" | "green" | "pink")[];
        contexts: ({
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
        contexts: ({
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
        contexts: {
            bg: string;
        }[];
    };
    goldenCloud: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("orange" | "yellow" | "blue" | "purple")[];
        contexts: {
            bg: string;
        }[];
    };
    livingRoom: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("red" | "green" | "blue" | "brown")[];
        contexts: ({
            bg: string;
            stroke: string;
        } | {
            bg: string;
            stroke?: undefined;
        })[];
    };
    magritte: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("red" | "brown")[];
        contexts: {
            bg: string;
        }[];
    };
    mondri: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("red" | "yellow" | "blue")[];
        contexts: {
            bg: string;
            stroke: string;
        }[];
    };
    mountains: {
        name: string;
        colors: string[];
        tags: string[];
        shades: "green"[];
        contexts: ({
            bg: string;
            stroke?: undefined;
        } | {
            bg: string;
            stroke: string;
        })[];
    };
    mystery: {
        name: string;
        colors: string[];
        tags: string[];
        shades: "green"[];
        contexts: {
            bg: string;
        }[];
    };
    natura: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("green" | "blue" | "teal")[];
        contexts: ({
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
        contexts: ({
            bg: string;
            stroke?: undefined;
        } | {
            bg: string;
            stroke: string;
        })[];
    };
    rebo: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("red" | "orange" | "green" | "teal")[];
        contexts: {
            bg: string;
            stroke: string;
        }[];
    };
    solarFlair: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("red" | "yellow" | "blue" | "purple")[];
        contexts: ({
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
        contexts: {
            bg: string;
        }[];
    };
    toyish: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("orange" | "green" | "pink" | "purple")[];
        contexts: {
            bg: string;
        }[];
    };
    twi: {
        name: string;
        colors: string[];
        shades: ("red" | "blue")[];
        tags: string[];
        contexts: ({
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
        contexts: {
            bg: string;
        }[];
    };
    valen: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("red" | "pink" | "purple")[];
        contexts: {
            bg: string;
            stroke: string;
        }[];
    };
};
export type PaletteName = keyof typeof paletteDefs;
export declare const palettes: { [key in PaletteName]: Palette; };
export {};
