const x = {
  ambry: {
    name: "ambry",
    colors: ["#fcab30", "#ff626a", "#4c1e4f", "#496ddb", "#ffc4eb"],
    tags: ["bright", "contrast"],
    shades: ["yellow", "purple", "blue"],
    variants: [
      { bg: "#fff7e5" },
      { bg: "#4c1e4f", stroke: "#fff7e5" },
      { bg: "#000000", omit: ["#4c1e4f"] }
    ]
  },
  autmn: {
    name: "autmn",
    colors: ["#dc5132", "#a46589", "#7a82b8", "#8ad0a6", "#c4f0a8", "#a0bb07", "#ffcf33", "#ec9f05"],
    tags: ["muted", "autumn", "fall"],
    shades: ["purple", "orange", "yellow", "teal"],
    variants: [
      { bg: "#a46589", stroke: "#352c62" },
      { bg: "#352c62", stroke: "#7a82b8" },
      { bg: "#fef8eb" },
      { bg: "#050507" },
      { bg: "#221e36" }
    ]
  },
  brain: {
    name: "brain",
    colors: ["#533a71", "#454a96", "#6184d8", "#50c5b7", "#9cec5b", "#f0f465", "#ff4a1c", "#ed254e"],
    tags: ["rainbow", "bright", "light"],
    shades: ["red", "blue", "green", "yellow", "purple", "blue", "orange"],
    variants: [
      { bg: "#533a71" },
      { bg: "#fff7e5", stroke: "#454a96" },
      { bg: "#000000" }
      // { bg: '#454a96', stroke: '#fff7e5' },
    ]
  },
  bubbles: {
    name: "bubbles",
    colors: ["#a2faa3", "#92c9b1", "#4f759b", "#ffe5d9", "#5d5179", "#320e3b"],
    tags: ["mid", "light"],
    shades: ["blue", "purple", "green"],
    variants: [
      { bg: "#320e3b", stroke: "#ffe5d9" },
      { bg: "#0a0103", omit: ["#320e3b", "#92c9b1"] },
      { bg: "#fbf6f3", omit: ["#ffe5d9"] },
      { bg: "#ffe5d9", omit: ["#a2faa3"] }
    ]
  },
  candy: {
    name: "candy",
    colors: ["#f398c3", "#cf3895", "#a0d28d", "#06b4b0", "#fed000", "#ff8552"],
    tags: ["bright", "contrast"],
    shades: ["pink", "yellow", "orange", "green"],
    variants: [{ bg: "#fff7e5" }, { bg: "#a0d28d", stroke: "#fff7e5" }, { bg: "#0c0a0b" }]
  },
  earthGem1: {
    name: "earthGem1",
    colors: ["#87425d", "#3c2e6b", "#0081af", "#a7d6c3", "#285943", "#8a8fbd", "#9a79b8", "#fcee49"],
    tags: ["jewelTones", "earthy"],
    shades: ["purple", "green", "orange", "pink"],
    variants: [
      { bg: "#3c2e6b", stroke: "#a7d6c3" },
      { bg: "#0081af" },
      { bg: "#87425d" },
      { bg: "#285943", stroke: "#a7d6c3" },
      { bg: "#020107" }
    ]
  },
  earthGem2: {
    name: "earthGem2",
    colors: ["#874286", "#856596", "#f9c8ce", "#a8d7a8", "#b6cccc", "#8aadbc", "#7a7eb8", "#fc814a"],
    tags: ["jewelTones", "earthy"],
    shades: ["purple", "green", "yellow"],
    variants: [
      { bg: "#7a7eb8", stroke: "#372336" },
      { bg: "#874286", stroke: "#f2f9f9" },
      { bg: "#f2f9f9" },
      { bg: "#0b040b" }
    ]
  },
  glowFish: {
    name: "glowFish",
    colors: ["#ffedeb", "#320d6d", "#ffd447", "#700353", "#fc814a"],
    tags: ["indigo", "bright"],
    shades: ["indigo", "purple", "yellow", "orange"],
    variants: [{ bg: "#ffedeb" }, { bg: "#320d6d" }, { add: ["#65AFFF"], bg: "#ffedeb" }]
  },
  goldenCloud: {
    name: "goldenCloud",
    colors: ["#171635", "#00225d", "#763262", "#ca7508", "#e9a621"],
    tags: ["golden", "jewelTones"],
    shades: ["blue", "orange", "yellow", "purple"],
    variants: [{ bg: "#171635", stroke: "#edcf99" }, { bg: "#fcf4e5" }, { bg: "#000000" }],
    credit: { url: "https://colorlisa.com/" }
  },
  harimau: {
    name: "harimau",
    colors: ["#281740", "#f29d35", "#04504e", "#f27405", "#f24c3d"],
    shades: ["yellow", "green"],
    variants: [{ bg: "#281740", stroke: "#ffd097" }, { bg: "#fff0cf" }],
    credit: { url: "https://studioyorktown.github.io/coloryorktownhall/", name: "studio yorktown" }
  },
  livingRoom: {
    name: "livingRoom",
    colors: ["#241e4e", "#960200", "#ce6c47", "#00635d", "#7a4656"],
    tags: ["dark", "elegant"],
    shades: ["red", "green", "blue", "brown"],
    variants: [
      { bg: "#241e4e", stroke: "#e4c0b3" },
      { bg: "#00635d", stroke: "#241e4e" },
      { bg: "#fbeee9" }
    ]
  },
  magritte: {
    credit: { url: "https://colorlisa.com/" },
    name: "magritte",
    // The Son of Man by René Magritte
    colors: ["#b60614", "#3a282f", "#909018", "#e3bfa1", "#ee833e"],
    tags: ["subtle", "muted"],
    shades: ["brown", "red"],
    variants: [{ bg: "#3a282f" }, { bg: "#fff8f2", stroke: "#3a282f" }]
  },
  market: {
    name: "market",
    colors: ["#1E0B16", "#5F0F40", "#9A031E", "#F2832E", "#D67AB1"],
    tags: ["deep"],
    shades: ["red", "brown", "pink"],
    variants: [{ bg: "#1E0B16" }, { bg: "#f6edde" }]
  },
  mondri: {
    name: "mondri",
    colors: ["#080708", "#3772ff", "#df2935", "#fdca40", "#e6e8e6"],
    tags: ["primary", "bright"],
    shades: ["red", "blue", "yellow"],
    variants: [{ bg: "#e6e8e6", stroke: "#080708" }, { bg: "#080708" }]
  },
  mountains: {
    name: "mountains",
    colors: ["#f8fff4", "#803848", "#ff8138", "#234e28", "#15bf8c"],
    tags: ["nature", "earth"],
    shades: ["green"],
    variants: [{ bg: "#f8fff4" }, { bg: "#803848", stroke: "#f8fff4" }]
  },
  mystery: {
    name: "mystery",
    //  giorgio de chirico - mystery and melancholy of a street
    credit: { url: "https://colorlisa.com/", name: "colorlisa / giorgio de chirico" },
    colors: ["#27403d", "#48725c", "#212412", "#f3e4c2", "#d88f2e"],
    tags: ["subtle", "elegant"],
    shades: ["green"],
    variants: [{ bg: "#f3e4c2" }, { bg: "#27403d" }]
  },
  natura: {
    name: "natura",
    colors: ["#99dfff", "#60ebca", "#c4f5ed", "#b8ccfc", "#04996d", "#4467ab"],
    tags: ["nature", "water", "sky"],
    shades: ["blue", "green", "teal"],
    variants: [{ bg: "#c4f5ed", stroke: "#4467ab" }, { bg: "#04996d" }, { bg: "#4467ab" }]
  },
  neopolito: {
    name: "neopolito",
    colors: ["#f5ffff", "#25ced1", "#2c4251", "#f17300", "#b288c0"],
    tags: ["icecream"],
    shades: ["orange", "purple", "teal"],
    variants: [
      { bg: "#f5ffff" },
      { bg: "#2c4251", stroke: "#f5ffff" },
      { bg: "#b288c0", stroke: "#2c4251" }
    ]
  },
  nikkeidai: {
    name: "nikkeidai",
    credit: { url: "https://studioyorktown.github.io/coloryorktownhall/", name: "studio yorktown" },
    colors: ["#f66689", "#65136c", "#f22e0e", "#00a75e", "#d7d7d7"],
    variants: [{ bg: "#d7d7d7" }, { bg: "#220724" }]
  },
  pearly: {
    name: "pearly",
    colors: ["#3e2679", "#477f8d", "#59babc", "#f5f5f5", "#d49add", "#ffaf00"],
    tags: ["bright", "light"],
    shades: ["purple", "blue"],
    variants: [{ bg: "#f5f5f5" }, { bg: "#180a3b", omit: ["#3e2679"] }]
  },
  rebo: {
    name: "rebo",
    colors: ["#d7263d", "#f46036", "#2e294e", "#1b998b", "#c5d86d"],
    tags: ["contrast", "bright"],
    shades: ["red", "green", "teal", "orange"],
    variants: [{ bg: "#2e294e" }, { bg: "#fafde9", stroke: "#2e294e" }]
  },
  solarFlair: {
    name: "solarFlair",
    colors: ["#f9c80e", "#f86624", "#ea3546", "#662e9b", "#43bccd"],
    tags: ["bright", "rainbow"],
    shades: ["yellow", "red", "purple", "blue"],
    variants: [{ bg: "#fff8de", stroke: "#232020" }, { bg: "#232020" }, { bg: "#050101" }]
  },
  squiggles: {
    name: "squiggles",
    // colorlisa.com - Squiggles by Sol Lewitt
    colors: ["#0a71b6", "#f9c40a", "#190506", "#eb5432", "#eaf2f0"],
    shades: ["blue", "yellow"],
    tags: ["contrast", "bright"],
    variants: [{ bg: "#eaf2f0" }, { bg: "#190506" }]
  },
  toyish: {
    name: "toyish",
    colors: ["#f75c03", "#d90368", "#e5beed", "#820263", "#291720", "#04a777"],
    tags: ["bright"],
    shades: ["orange", "pink", "green", "purple"],
    variants: [
      { bg: "#291720" },
      { bg: "#fff1e9" },
      {
        bg: "#291720",
        omit: ["#f75c03"]
      }
    ]
  },
  twi: {
    name: "twi",
    colors: ["#861657", "#a64253", "#d56aa0", "#247ba0", "#011638"],
    shades: ["red", "blue"],
    tags: ["dark", "twilight", "jewelTones"],
    variants: [{ bg: "#011638" }, { bg: "#a64253", stroke: "#011638" }, { bg: "#fff4e2" }]
  },
  untitledApril15: {
    name: "untitledApril15",
    // https://colorlisa.com/ - Untitled (April 15) by Paul Feeley
    colors: ["#2c458d", "#e4dfd9", "#425b4f", "#ebad30", "#bf2124"],
    shades: ["blue", "red"],
    tags: ["mid"],
    variants: [{ bg: "#e4dfd9", stroke: "#000000" }, { bg: "#425b4f" }, { bg: "#000000" }]
  },
  valen: {
    name: "valen",
    colors: ["#bba0ca", "#fff8e8", "#fcd581", "#d52941", "#990d35", "#091540"],
    tags: ["valentine", "romantic"],
    shades: ["pink", "red", "purple"],
    variants: [
      { bg: "#fff8e8", stroke: "#091540" },
      { bg: "#990d35", stroke: "#fff8e8" },
      { bg: "#091540", stroke: "#bba0ca" },
      { bg: "#010308" },
      {
        bg: "#ffffff",
        add: ["#540D6E", "#9b7ede"],
        omit: ["#091540", "#990d35", "#bba0ca", "#fff8e8"]
      }
    ]
  }
}, m = x;
function A(r) {
  let e = r.replace("#", "");
  e.length === 3 && (e = e.split("").map((o) => `${o}${o}`).join(""));
  const a = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
  if (!a)
    throw new Error("Could not parse Hex Color");
  const t = parseInt(a[1], 16), s = parseInt(a[2], 16), f = parseInt(a[3], 16);
  return {
    r: t,
    g: s,
    b: f
  };
}
function T(r) {
  let e = r.r / 255, a = r.g / 255, t = r.b / 255, s = Math.max(e, a, t), f = Math.min(e, a, t), o = 0, i, n = (s + f) / 2;
  if (s === f)
    o = 0, i = 0;
  else {
    let g = s - f;
    switch (i = n > 0.5 ? g / (2 - s - f) : g / (s + f), s) {
      case e:
        o = (a - t) / g + (a < t ? 6 : 0);
        break;
      case a:
        o = (t - e) / g + 2;
        break;
      case t:
        o = (e - a) / g + 4;
        break;
    }
    o /= 6;
  }
  return { h: Math.round(o * 360), s: Math.round(i * 100), l: Math.round(n * 100) };
}
function j(r) {
  let e = A(r);
  return T(e);
}
function $(r) {
  const e = typeof r == "string" ? A(r) : r, a = (t) => (t /= 255, t <= 0.03928 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4));
  return 0.2126 * a(e.r) + 0.7152 * a(e.g) + 0.0722 * a(e.b);
}
function C(r, e) {
  const a = $(r), t = $(e);
  return a > t ? (a + 0.05) / (t + 0.05) : (t + 0.05) / (a + 0.05);
}
const G = (r = 4) => {
  let e = /* @__PURE__ */ new Set(), a = [];
  return Object.keys(m).forEach((s) => {
    let o = m[s].colors;
    L(o, r).forEach((n) => {
      e.has(`${n[0]}-${n[1]}`.toLowerCase()) || e.has(`${n[1]}-${n[0]}`.toLowerCase()) || (e.add(`${n[0]}-${n[1]}`.toLowerCase()), a.push(n));
    });
  }), a;
}, L = (r, e = 4) => {
  let a = [];
  return r.forEach((t, s) => {
    r.slice(s + 1).forEach((f) => {
      C(t, f) < e || a.push([t, f]);
    });
  }), a;
};
let h = null;
const M = () => h || (h = Object.keys(m).map((e) => m[e]), h);
function H(r, {
  minContrastBg: e,
  isolateColors: a = !1,
  useStroke: t = !0,
  minColors: s = 1,
  maxColors: f = 1 / 0,
  bgShade: o
} = {}) {
  let i = r.name, n = r.variants, g = 0, p = [];
  return n.forEach((k) => {
    let { bg: d, omit: y, add: w } = k;
    if (d = d.toLowerCase(), o) {
      let { type: l, edge: u = 50, maxSaturation: F } = o, E = j(d), c = E.l;
      if (l === "dark") {
        if (c > u) return;
      } else if (l === "light") {
        if (c < 100 - u) return;
      } else if (l === "edge" && (c < 50 && c > u || c >= 50 && 100 - c > u))
        return;
      if (typeof F == "number" && E.s > F)
        return;
    }
    let v = t ? k.stroke : void 0, b = [...r.colors].map((l) => l.toLowerCase());
    b = a ? b.filter((l) => l !== d && l !== v) : b, y && (b = b.filter((l) => !y.includes(l.toLowerCase()))), w && b.push(...w), e && (b = b.filter((l) => C(d, l) >= e)), !(b.length < s || b.length > f) && p.push({
      bg: d,
      stroke: v,
      colors: b,
      name: `${i}-${g++}`
    });
  }), p;
}
function I({
  excludePalettes: r,
  includePalettes: e,
  ...a
} = {}) {
  let t = M();
  return e && (t = t.filter((s) => e.includes(s.name))), r && (t = t.filter((s) => !r.includes(s.name))), t.flatMap((s) => H(s, a));
}
export {
  G as getAllPairs,
  L as getPairsFromPalette,
  I as getPaletteVariants,
  M as getPalettesArray,
  H as getVariantsFromSinglePalette,
  m as palettes
};
