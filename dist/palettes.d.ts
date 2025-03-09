export type RoyGBiv = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'indigo' | 'violet' | 'teal' | 'pink' | 'purple' | 'gray' | 'brown';
export type PaletteContext = {
    bg: string;
    stroke?: string;
};
export type Palette = {
    colors: string[];
    name: string;
    tags: string[];
    shades: RoyGBiv[];
    contexts: PaletteContext[];
    pairs?: {
        lights: string[];
        darks: string[];
        add?: [string, string][];
    };
};
declare const paletteDefs: {
    island: {
        colors: string[];
        tags: string[];
        shades: ("orange" | "green" | "blue")[];
        name: string;
        contexts: {
            bg: string;
            stroke: string;
        }[];
        pairs: {
            lights: string[];
            darks: string[];
            add: [string, string][];
        };
    };
    island2: {
        name: string;
        colors: string[];
        shades: ("orange" | "green" | "blue" | "gray")[];
        tags: string[];
        contexts: {
            bg: string;
            stroke: string;
        }[];
        pairs: {
            lights: string[];
            darks: string[];
        };
    };
    toyish: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("orange" | "green" | "pink" | "purple")[];
        contexts: {
            bg: string;
            stroke: string;
        }[];
        pairs: {
            lights: string[];
            darks: string[];
            add: [string, string][];
        };
    };
    toyish2: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("green" | "pink" | "purple")[];
        contexts: {
            bg: string;
            stroke: string;
        }[];
        pairs: {
            lights: string[];
            darks: string[];
        };
    };
    solarFlair: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("red" | "yellow" | "blue" | "purple")[];
        contexts: {
            bg: string;
            stroke: string;
        }[];
        pairs: {
            lights: string[];
            darks: string[];
            add: [string, string][];
        };
    };
    solarFlairL: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("red" | "yellow" | "blue" | "purple")[];
        contexts: {
            bg: string;
            stroke: string;
        }[];
        pairs: {
            lights: string[];
            darks: string[];
            add: [string, string][];
        };
    };
    rebo: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("red" | "orange" | "green" | "teal")[];
        contexts: {
            stroke: string;
            bg: string;
        }[];
        pairs: {
            lights: string[];
            darks: string[];
            add: [string, string][];
        };
    };
    twi: {
        name: string;
        colors: string[];
        shades: ("red" | "blue")[];
        tags: string[];
        contexts: {
            bg: string;
            stroke: string;
        }[];
        pairs: {
            lights: string[];
            darks: string[];
            add: [string, string][];
        };
    };
    livingRoom: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("red" | "green" | "blue" | "brown")[];
        contexts: {
            bg: string;
            stroke: string;
        }[];
        pairs: {
            lights: string[];
            darks: string[];
        };
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
        pairs: {
            lights: any[];
            darks: any[];
            add: [string, string][];
        };
    };
    valenLess: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("red" | "purple")[];
        contexts: {
            bg: string;
            stroke: string;
        }[];
    };
    earthGem1: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("orange" | "green" | "pink" | "purple")[];
        contexts: {
            bg: string;
            stroke: string;
        }[];
        pairs: {
            lights: string[];
            darks: string[];
            add: [string, string][];
        };
    };
    earthGem2: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("yellow" | "green" | "purple")[];
        contexts: {
            bg: string;
            stroke: string;
        }[];
        pairs: {
            lights: string[];
            darks: string[];
        };
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
        pairs: {
            lights: string[];
            darks: string[];
        };
    };
    mondriPlus: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("red" | "yellow" | "green" | "blue")[];
        contexts: {
            bg: string;
            stroke: string;
        }[];
        pairs: {
            lights: string[];
            darks: string[];
        };
    };
    mondriMinus1: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("red" | "yellow" | "blue")[];
        contexts: {
            bg: string;
            stroke: string;
        }[];
    };
    mondriMinus2: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("red" | "yellow" | "blue")[];
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
        contexts: {
            bg: string;
            stroke: string;
        }[];
        pairs: {
            lights: string[];
            darks: string[];
        };
    };
    neopolito: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("orange" | "teal" | "purple")[];
        contexts: {
            bg: string;
            stroke: string;
        }[];
        pairs: {
            lights: string[];
            darks: string[];
            add: [string, string][];
        };
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
        pairs: {
            lights: string[];
            darks: string[];
            add: [string, string][];
        };
    };
    ambry: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("yellow" | "blue" | "purple")[];
        contexts: {
            bg: string;
            stroke: string;
        }[];
        pairs: {
            lights: string[];
            darks: string[];
            add: [string, string][];
        };
    };
    natura: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("green" | "blue" | "teal")[];
        contexts: {
            bg: string;
            stroke: string;
        }[];
        pairs: {
            lights: string[];
            darks: string[];
            add: [string, string][];
        };
    };
    candy: {
        name: string;
        colors: string[];
        tags: string[];
        shades: ("orange" | "yellow" | "green" | "pink")[];
        pairs: {
            lights: string[];
            darks: string[];
        };
        contexts: ({
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
        pairs: {
            lights: string[];
            darks: string[];
            add: [string, string][];
        };
        contexts: ({
            bg: string;
            stroke?: undefined;
        } | {
            bg: string;
            stroke: string;
        })[];
    };
};
export declare const getPalettesArray: () => Palette[];
export declare const getColorPairs: () => [string, string][];
export declare const palettes: { [key in keyof typeof paletteDefs]: Palette; };
export {};
