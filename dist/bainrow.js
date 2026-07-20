const H = {
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
  dust: {
    name: "dust",
    colors: ["#2C2138", "#5C4569", "#9B7BA6", "#D8B4C9", "#F0D9A8", "#6B8A99"],
    tags: ["pastel", "witchy"],
    shades: ["purple", "yellow", "blue", "gray"],
    variants: [{ bg: "#f0eee9" }, { bg: "#d8dcde" }, { bg: "#0b0b0c" }]
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
  ember: {
    name: "ember",
    colors: ["#0D0612", "#3A0E2A", "#962648", "#E85D32", "#F5B14D"],
    tags: ["mystical"],
    shades: ["purple", "red"],
    variants: [
      { bg: "#0D0612", add: ["#9984D4"] },
      { bg: "#0d0612" },
      { bg: "#ffeed5" },
      { bg: "#F6F4F3" }
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
    colors: ["#04996d", "#60ebca", "#c4f5ed", "#99dfff", "#4467ab", "#b8ccfc"],
    tags: ["nature", "water", "sky"],
    shades: ["blue", "green", "teal"],
    variants: [
      { bg: "#c4f5ed", stroke: "#4467ab" },
      { bg: "#04996d" },
      { bg: "#2a303c" },
      { bg: "#e9edef" }
    ]
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
    credit: { name: "colorlisa.com / paul feeley", url: "https://colorlisa.com/" },
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
}, y = H;
function T(r) {
  let e = r.replace("#", "");
  e.length === 3 && (e = e.split("").map((l) => `${l}${l}`).join(""));
  const t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
  if (!t)
    throw new Error("Could not parse Hex Color");
  const a = parseInt(t[1], 16), s = parseInt(t[2], 16), o = parseInt(t[3], 16);
  return {
    r: a,
    g: s,
    b: o
  };
}
function P(r) {
  let e = r.r / 255, t = r.g / 255, a = r.b / 255, s = Math.max(e, t, a), o = Math.min(e, t, a), l = 0, i, f = (s + o) / 2;
  if (s === o)
    l = 0, i = 0;
  else {
    let n = s - o;
    switch (i = f > 0.5 ? n / (2 - s - o) : n / (s + o), s) {
      case e:
        l = (t - a) / n + (t < a ? 6 : 0);
        break;
      case t:
        l = (a - e) / n + 2;
        break;
      case a:
        l = (e - t) / n + 4;
        break;
    }
    l /= 6;
  }
  return { h: Math.round(l * 360), s: Math.round(i * 100), l: Math.round(f * 100) };
}
function B(r) {
  let e = T(r);
  return P(e);
}
function j(r) {
  const e = typeof r == "string" ? T(r) : r, t = (a) => (a /= 255, a <= 0.03928 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4));
  return 0.2126 * t(e.r) + 0.7152 * t(e.g) + 0.0722 * t(e.b);
}
function w(r, e) {
  const t = j(r), a = j(e);
  return t > a ? (t + 0.05) / (a + 0.05) : (a + 0.05) / (t + 0.05);
}
const R = (r = 4) => {
  let e = /* @__PURE__ */ new Set(), t = [];
  return Object.keys(y).forEach((s) => {
    let l = y[s].colors;
    x(l, r).forEach((f) => {
      let n = `${f[0]}-${f[1]}`.toLowerCase(), c = `${f[0]}-${f[1]}`.toLowerCase();
      e.has(n) || e.has(c) || (e.add(n), t.push(f));
    });
  }), t;
}, x = (r, e = 4) => {
  let t = [];
  return r.forEach((a, s) => {
    r.slice(s + 1).forEach((o) => {
      w(a, o) < e || t.push([a, o]);
    });
  }), t;
};
let k = null;
const G = () => k || (k = Object.keys(y).map((e) => y[e]), k), M = G();
function I(r, {
  minContrastBg: e,
  isolateColors: t = !1,
  useStroke: a = !1,
  requireStroke: s = !1,
  minColors: o = 1,
  maxColors: l = 1 / 0,
  bgShade: i,
  bgColor: f
} = {}) {
  let n = r.name, c = r.variants, C = 0, v = [], m;
  return typeof f == "object" ? m = f : f === void 0 && typeof i == "object" && (m = i), c.forEach((p) => {
    if (s && !p.stroke) return;
    let { omit: F, add: A } = p, g = typeof f == "string" ? f : p.bg;
    if (g = g.toLowerCase(), m) {
      let { type: b, edge: h = 50, maxSaturation: $ } = m, D = B(g), u = D.l;
      if (b === "dark") {
        if (u > h) return;
      } else if (b === "light") {
        if (u < 100 - h) return;
      } else if (b === "edge" && (u < 50 && u > h || u >= 50 && 100 - u > h))
        return;
      if (typeof $ == "number" && D.s > $)
        return;
    }
    let E = a ? p.stroke : void 0, d = [...r.colors].map((b) => b.toLowerCase());
    d = t ? d.filter((b) => b !== g && b !== E) : d, F && (d = d.filter((b) => !F.includes(b.toLowerCase()))), A && d.push(...A), e && (d = d.filter((b) => w(g, b) >= e)), !(d.length < o || d.length > l) && v.push({
      bg: g,
      stroke: E,
      colors: d,
      name: `${n}-${C++}`
    });
  }), v;
}
function V(r, e, { useStroke: t, isolateColors: a } = {}) {
  const s = r.variants[e], { bg: o, omit: l, add: i } = s, f = t ? s.stroke : void 0;
  let n = [...r.colors].map((c) => c.toLowerCase());
  return a && (n = n.filter((c) => c !== o && c !== f)), l && (n = n.filter((c) => !l.includes(c))), i && n.push(...i), {
    bg: o,
    stroke: f,
    colors: n,
    name: `${r.name}-${e}`
  };
}
function O({
  excludePalettes: r,
  includePalettes: e,
  ...t
} = {}) {
  let a = [...M];
  return e && (a = a.filter((s) => e.includes(s.name))), r && (a = a.filter((s) => !r.includes(s.name))), a.flatMap((s) => I(s, t));
}
function S({
  minColors: r = 1,
  maxColors: e,
  ...t
}) {
  let a = [];
  return M.forEach((s) => {
    let o = L(s, t);
    e !== void 0 && o.length > e || r !== void 0 && o.length < r || a.push({ name: s.name, colors: o });
  }), a;
}
function L(r, { minLightness: e, maxLightness: t, minContrast: a, minContrastCompare: s }) {
  return r.colors.filter((l) => {
    if (e !== void 0 || t !== void 0) {
      let f = B(l).l;
      if (e !== void 0 && f < e || t !== void 0 && f > t) return !1;
    }
    return !(a !== void 0 && w(l, s || "#ffffff") < a);
  });
}
export {
  V as buildVariant,
  L as filterPalette,
  R as getAllPairs,
  S as getFilteredPalettes,
  x as getPairsFromPalette,
  O as getPaletteVariants,
  G as getPalettesArray,
  I as getVariantsFromSinglePalette,
  y as palettes,
  M as palettesList
};
