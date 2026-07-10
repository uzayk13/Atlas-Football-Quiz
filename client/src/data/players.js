// Fields asked in the text round (in order)
export const FIELDS = [
  { key: "nationality", label: "Nationality" },
  { key: "club",        label: "Club" },
  { key: "fullName",    label: "Full name" },
  { key: "position",    label: "Position" },
];

// Flag geometry keyed by ISO 3166-1 alpha-2 code (matching /public/flags/*.svg).
// Each flag has: regions (SVG shapes on a 300×200 canvas), palette (tap-to-fill colors),
// and symbols (draggable emblems for flags that need them).
export const FLAG_GEOMETRY = {
  // Argentina — light blue / white stripes + Sun of May
  ar: {
    regions: [
      { id: "top",    shape: "rect", x: 0,   y: 0,   w: 300, h: 67,  correctColor: "#74ACDF" },
      { id: "mid",    shape: "rect", x: 0,   y: 67,  w: 300, h: 66,  correctColor: "#FFFFFF" },
      { id: "bottom", shape: "rect", x: 0,   y: 133, w: 300, h: 67,  correctColor: "#74ACDF" },
    ],
    palette: ["#74ACDF", "#FFFFFF"],
    symbols: [{ id: "sun", label: "Sun of May", target: { x: 150, y: 100 }, size: 46, crop: { fx: 0.5, fy: 0.5, zoom: 3.5 } }],
  },

  // Belgium — vertical black / yellow / red
  be: {
    regions: [
      { id: "left",  shape: "rect", x: 0,   y: 0, w: 100, h: 200, correctColor: "#000000" },
      { id: "mid",   shape: "rect", x: 100, y: 0, w: 100, h: 200, correctColor: "#FDDA24" },
      { id: "right", shape: "rect", x: 200, y: 0, w: 100, h: 200, correctColor: "#EF3340" },
    ],
    palette: ["#000000", "#FDDA24", "#EF3340"],
    symbols: [],
  },

  // Brazil — green bg + yellow diamond + blue circle
  br: {
    regions: [
      { id: "bg",      shape: "rect",    x: 0,   y: 0,   w: 300, h: 200, correctColor: "#009739" },
      { id: "diamond", shape: "polygon", points: "150,18 282,100 150,182 18,100", correctColor: "#FEDD00" },
      { id: "circle",  shape: "circle",  cx: 150, cy: 100, r: 42,          correctColor: "#002776" },
    ],
    palette: ["#009739", "#FEDD00", "#002776"],
    symbols: [],
  },

  // Canada — red / white / red vertical + maple leaf
  ca: {
    regions: [
      { id: "left",  shape: "rect", x: 0,   y: 0, w: 75,  h: 200, correctColor: "#FF0000" },
      { id: "mid",   shape: "rect", x: 75,  y: 0, w: 150, h: 200, correctColor: "#FFFFFF" },
      { id: "right", shape: "rect", x: 225, y: 0, w: 75,  h: 200, correctColor: "#FF0000" },
    ],
    palette: ["#FF0000", "#FFFFFF"],
    symbols: [{ id: "leaf", label: "Maple leaf", target: { x: 150, y: 100 }, size: 54, crop: { fx: 0.5, fy: 0.5, zoom: 2.5 } }],
  },

  // Switzerland — red bg + white cross
  ch: {
    regions: [
      { id: "bg",      shape: "rect", x: 0,   y: 0,   w: 300, h: 200, correctColor: "#FF0000" },
      { id: "crossH",  shape: "rect", x: 105, y: 75,  w: 90,  h: 50,  correctColor: "#FFFFFF" },
      { id: "crossV",  shape: "rect", x: 130, y: 50,  w: 40,  h: 100, correctColor: "#FFFFFF" },
    ],
    palette: ["#FF0000", "#FFFFFF"],
    symbols: [],
  },

  // Cameroon — vertical green / red / yellow + yellow star in red stripe
  cm: {
    regions: [
      { id: "left",  shape: "rect", x: 0,   y: 0, w: 100, h: 200, correctColor: "#007A5E" },
      { id: "mid",   shape: "rect", x: 100, y: 0, w: 100, h: 200, correctColor: "#CE1126" },
      { id: "right", shape: "rect", x: 200, y: 0, w: 100, h: 200, correctColor: "#FCD116" },
    ],
    palette: ["#007A5E", "#CE1126", "#FCD116"],
    symbols: [{ id: "star", label: "Star", target: { x: 150, y: 100 }, size: 38, crop: { fx: 0.5, fy: 0.49, zoom: 5 } }],
  },

  // Colombia — horizontal yellow / blue / red
  co: {
    regions: [
      { id: "top",    shape: "rect", x: 0, y: 0,   w: 300, h: 80,  correctColor: "#FCD116" },
      { id: "mid",    shape: "rect", x: 0, y: 80,  w: 300, h: 60,  correctColor: "#003087" },
      { id: "bottom", shape: "rect", x: 0, y: 140, w: 300, h: 60,  correctColor: "#CE1126" },
    ],
    palette: ["#FCD116", "#003087", "#CE1126"],
    symbols: [],
  },

  // Germany — horizontal black / red / gold
  de: {
    regions: [
      { id: "top",    shape: "rect", x: 0, y: 0,   w: 300, h: 67,  correctColor: "#000000" },
      { id: "mid",    shape: "rect", x: 0, y: 67,  w: 300, h: 67,  correctColor: "#DD0000" },
      { id: "bottom", shape: "rect", x: 0, y: 134, w: 300, h: 66,  correctColor: "#FFCE00" },
    ],
    palette: ["#000000", "#DD0000", "#FFCE00"],
    symbols: [],
  },

  // Denmark — red bg + white Nordic cross
  dk: {
    regions: [
      { id: "bg",     shape: "rect", x: 0,   y: 0,   w: 300, h: 200, correctColor: "#C60C30" },
      { id: "crossH", shape: "rect", x: 0,   y: 80,  w: 300, h: 40,  correctColor: "#FFFFFF" },
      { id: "crossV", shape: "rect", x: 110, y: 0,   w: 40,  h: 200, correctColor: "#FFFFFF" },
    ],
    palette: ["#C60C30", "#FFFFFF"],
    symbols: [],
  },

  // Ecuador — horizontal yellow / blue / red + coat of arms
  ec: {
    regions: [
      { id: "top",    shape: "rect", x: 0, y: 0,   w: 300, h: 80,  correctColor: "#FFD100" },
      { id: "mid",    shape: "rect", x: 0, y: 80,  w: 300, h: 60,  correctColor: "#003087" },
      { id: "bottom", shape: "rect", x: 0, y: 140, w: 300, h: 60,  correctColor: "#FF0000" },
    ],
    palette: ["#FFD100", "#003087", "#FF0000"],
    symbols: [{ id: "arms", label: "Coat of arms", target: { x: 150, y: 100 }, size: 54, crop: { fx: 0.5, fy: 0.5, zoom: 3 } }],
  },

  // Egypt — horizontal red / white / black
  eg: {
    regions: [
      { id: "top",    shape: "rect", x: 0, y: 0,   w: 300, h: 67,  correctColor: "#CE1126" },
      { id: "mid",    shape: "rect", x: 0, y: 67,  w: 300, h: 66,  correctColor: "#FFFFFF" },
      { id: "bottom", shape: "rect", x: 0, y: 133, w: 300, h: 67,  correctColor: "#000000" },
    ],
    palette: ["#CE1126", "#FFFFFF", "#000000"],
    symbols: [],
  },

  // Spain — horizontal red / yellow / red (2:1:2 ratio) + coat of arms
  es: {
    regions: [
      { id: "top",    shape: "rect", x: 0, y: 0,   w: 300, h: 50,  correctColor: "#AA151B" },
      { id: "mid",    shape: "rect", x: 0, y: 50,  w: 300, h: 100, correctColor: "#F1BF00" },
      { id: "bottom", shape: "rect", x: 0, y: 150, w: 300, h: 50,  correctColor: "#AA151B" },
    ],
    palette: ["#AA151B", "#F1BF00"],
    symbols: [{ id: "arms", label: "Coat of arms", target: { x: 93, y: 100 }, size: 52, crop: { fx: 0.332, fy: 0.5, zoom: 5 } }],
  },

  // France — vertical blue / white / red
  fr: {
    regions: [
      { id: "left",  shape: "rect", x: 0,   y: 0, w: 100, h: 200, correctColor: "#0055A4" },
      { id: "mid",   shape: "rect", x: 100, y: 0, w: 100, h: 200, correctColor: "#FFFFFF" },
      { id: "right", shape: "rect", x: 200, y: 0, w: 100, h: 200, correctColor: "#EF4135" },
    ],
    palette: ["#0055A4", "#FFFFFF", "#EF4135"],
    symbols: [],
  },

  // England — white bg + red cross (St George's Cross)
  "gb-eng": {
    regions: [
      { id: "bg",     shape: "rect", x: 0,   y: 0,   w: 300, h: 200, correctColor: "#FFFFFF" },
      { id: "crossH", shape: "rect", x: 0,   y: 80,  w: 300, h: 40,  correctColor: "#CF091F" },
      { id: "crossV", shape: "rect", x: 130, y: 0,   w: 40,  h: 200, correctColor: "#CF091F" },
    ],
    palette: ["#FFFFFF", "#CF091F"],
    symbols: [],
  },

  // Georgia — white bg + red cross + 4 smaller red crosses
  ge: {
    regions: [
      { id: "bg",     shape: "rect", x: 0,   y: 0,   w: 300, h: 200, correctColor: "#FFFFFF" },
      { id: "crossH", shape: "rect", x: 0,   y: 85,  w: 300, h: 30,  correctColor: "#FF0000" },
      { id: "crossV", shape: "rect", x: 135, y: 0,   w: 30,  h: 200, correctColor: "#FF0000" },
    ],
    palette: ["#FFFFFF", "#FF0000"],
    symbols: [],
  },

  // Ghana — horizontal red / gold / green + black star in gold stripe
  gh: {
    regions: [
      { id: "top",    shape: "rect", x: 0, y: 0,   w: 300, h: 67,  correctColor: "#CE1126" },
      { id: "mid",    shape: "rect", x: 0, y: 67,  w: 300, h: 66,  correctColor: "#FCD116" },
      { id: "bottom", shape: "rect", x: 0, y: 133, w: 300, h: 67,  correctColor: "#006B3F" },
    ],
    palette: ["#CE1126", "#FCD116", "#006B3F"],
    symbols: [{ id: "star", label: "Black star", target: { x: 150, y: 100 }, size: 44, crop: { fx: 0.5, fy: 0.5, zoom: 4 } }],
  },

  // Croatia — horizontal red / white / blue
  hr: {
    regions: [
      { id: "top",    shape: "rect", x: 0, y: 0,   w: 300, h: 67,  correctColor: "#FF0000" },
      { id: "mid",    shape: "rect", x: 0, y: 67,  w: 300, h: 66,  correctColor: "#FFFFFF" },
      { id: "bottom", shape: "rect", x: 0, y: 133, w: 300, h: 67,  correctColor: "#0093DD" },
    ],
    palette: ["#FF0000", "#FFFFFF", "#0093DD"],
    symbols: [],
  },

  // Hungary — horizontal red / white / green
  hu: {
    regions: [
      { id: "top",    shape: "rect", x: 0, y: 0,   w: 300, h: 67,  correctColor: "#CE2939" },
      { id: "mid",    shape: "rect", x: 0, y: 67,  w: 300, h: 66,  correctColor: "#FFFFFF" },
      { id: "bottom", shape: "rect", x: 0, y: 133, w: 300, h: 67,  correctColor: "#477050" },
    ],
    palette: ["#CE2939", "#FFFFFF", "#477050"],
    symbols: [],
  },

  // Italy — vertical green / white / red
  it: {
    regions: [
      { id: "left",  shape: "rect", x: 0,   y: 0, w: 100, h: 200, correctColor: "#009246" },
      { id: "mid",   shape: "rect", x: 100, y: 0, w: 100, h: 200, correctColor: "#FFFFFF" },
      { id: "right", shape: "rect", x: 200, y: 0, w: 100, h: 200, correctColor: "#CE2B37" },
    ],
    palette: ["#009246", "#FFFFFF", "#CE2B37"],
    symbols: [],
  },

  // Japan — white bg + red circle
  jp: {
    regions: [
      { id: "bg",     shape: "rect",   x: 0,   y: 0,   w: 300, h: 200, correctColor: "#FFFFFF" },
      { id: "circle", shape: "circle", cx: 150, cy: 100, r: 60,          correctColor: "#BC002D" },
    ],
    palette: ["#FFFFFF", "#BC002D"],
    symbols: [],
  },

  // South Korea — white bg + red/blue taegeuk + black trigrams (simplified to 2 circles)
  kr: {
    regions: [
      { id: "bg",   shape: "rect",   x: 0,   y: 0,   w: 300, h: 200, correctColor: "#FFFFFF" },
      { id: "red",  shape: "circle", cx: 140, cy: 95,  r: 35,          correctColor: "#CD2E3A" },
      { id: "blue", shape: "circle", cx: 160, cy: 105, r: 35,          correctColor: "#0047A0" },
    ],
    palette: ["#FFFFFF", "#CD2E3A", "#0047A0"],
    symbols: [],
  },

  // Morocco — red bg + green star
  ma: {
    regions: [
      { id: "bg",   shape: "rect",    x: 0, y: 0, w: 300, h: 200, correctColor: "#C1272D" },
      { id: "star", shape: "polygon",
        points: "150,70 158,95 185,95 163,110 171,135 150,120 129,135 137,110 115,95 142,95",
        correctColor: "#006233" },
    ],
    palette: ["#C1272D", "#006233"],
    symbols: [],
  },

  // Nigeria — vertical green / white / green
  ng: {
    regions: [
      { id: "left",  shape: "rect", x: 0,   y: 0, w: 100, h: 200, correctColor: "#008751" },
      { id: "mid",   shape: "rect", x: 100, y: 0, w: 100, h: 200, correctColor: "#FFFFFF" },
      { id: "right", shape: "rect", x: 200, y: 0, w: 100, h: 200, correctColor: "#008751" },
    ],
    palette: ["#008751", "#FFFFFF"],
    symbols: [],
  },

  // Netherlands — horizontal red / white / blue
  nl: {
    regions: [
      { id: "top",    shape: "rect", x: 0, y: 0,   w: 300, h: 67,  correctColor: "#AE1C28" },
      { id: "mid",    shape: "rect", x: 0, y: 67,  w: 300, h: 66,  correctColor: "#FFFFFF" },
      { id: "bottom", shape: "rect", x: 0, y: 133, w: 300, h: 67,  correctColor: "#21468B" },
    ],
    palette: ["#AE1C28", "#FFFFFF", "#21468B"],
    symbols: [],
  },

  // Norway — red bg + blue Nordic cross with white border
  no: {
    regions: [
      { id: "bg",      shape: "rect", x: 0,   y: 0,   w: 300, h: 200, correctColor: "#EF2B2D" },
      { id: "crossHw", shape: "rect", x: 0,   y: 73,  w: 300, h: 54,  correctColor: "#FFFFFF" },
      { id: "crossVw", shape: "rect", x: 100, y: 0,   w: 54,  h: 200, correctColor: "#FFFFFF" },
      { id: "crossH",  shape: "rect", x: 0,   y: 83,  w: 300, h: 34,  correctColor: "#003680" },
      { id: "crossV",  shape: "rect", x: 110, y: 0,   w: 34,  h: 200, correctColor: "#003680" },
    ],
    palette: ["#EF2B2D", "#FFFFFF", "#003680"],
    symbols: [],
  },

  // Poland — horizontal white / red
  pl: {
    regions: [
      { id: "top",    shape: "rect", x: 0, y: 0,   w: 300, h: 100, correctColor: "#FFFFFF" },
      { id: "bottom", shape: "rect", x: 0, y: 100, w: 300, h: 100, correctColor: "#DC143C" },
    ],
    palette: ["#FFFFFF", "#DC143C"],
    symbols: [],
  },

  // Portugal — vertical green / red + coat of arms
  pt: {
    regions: [
      { id: "left",  shape: "rect", x: 0,   y: 0, w: 120, h: 200, correctColor: "#046A38" },
      { id: "right", shape: "rect", x: 120, y: 0, w: 180, h: 200, correctColor: "#DA291C" },
    ],
    palette: ["#046A38", "#DA291C"],
    symbols: [{ id: "arms", label: "Coat of arms", target: { x: 120, y: 100 }, size: 44, crop: { fx: 0.4, fy: 0.5, zoom: 4 } }],
  },

  // Serbia — horizontal red / blue / white + coat of arms on left
  rs: {
    regions: [
      { id: "top",    shape: "rect", x: 0, y: 0,   w: 300, h: 67,  correctColor: "#C6363C" },
      { id: "mid",    shape: "rect", x: 0, y: 67,  w: 300, h: 66,  correctColor: "#0C4076" },
      { id: "bottom", shape: "rect", x: 0, y: 133, w: 300, h: 67,  correctColor: "#FFFFFF" },
    ],
    palette: ["#C6363C", "#0C4076", "#FFFFFF"],
    symbols: [{ id: "arms", label: "Coat of arms", target: { x: 80, y: 100 }, size: 48, crop: { fx: 0.27, fy: 0.5, zoom: 4 } }],
  },

  // Sweden — blue bg + yellow Nordic cross
  se: {
    regions: [
      { id: "bg",     shape: "rect", x: 0,   y: 0,   w: 300, h: 200, correctColor: "#006AA7" },
      { id: "crossH", shape: "rect", x: 0,   y: 83,  w: 300, h: 34,  correctColor: "#FECC02" },
      { id: "crossV", shape: "rect", x: 110, y: 0,   w: 34,  h: 200, correctColor: "#FECC02" },
    ],
    palette: ["#006AA7", "#FECC02"],
    symbols: [],
  },

  // Slovenia — horizontal white / blue / red
  si: {
    regions: [
      { id: "top",    shape: "rect", x: 0, y: 0,   w: 300, h: 67,  correctColor: "#FFFFFF" },
      { id: "mid",    shape: "rect", x: 0, y: 67,  w: 300, h: 66,  correctColor: "#003DA5" },
      { id: "bottom", shape: "rect", x: 0, y: 133, w: 300, h: 67,  correctColor: "#FF0000" },
    ],
    palette: ["#FFFFFF", "#003DA5", "#FF0000"],
    symbols: [],
  },

  // Turkey — red bg + white crescent and star (simplified)
  tr: {
    regions: [
      { id: "bg",       shape: "rect",   x: 0,   y: 0,   w: 300, h: 200, correctColor: "#E30A17" },
      { id: "moon",     shape: "circle", cx: 142, cy: 100, r: 50,          correctColor: "#FFFFFF" },
      { id: "moonHole", shape: "circle", cx: 158, cy: 100, r: 40,          correctColor: "#E30A17" },
    ],
    palette: ["#E30A17", "#FFFFFF"],
    symbols: [],
  },

  // USA — simplified: blue canton + red/white stripes
  us: {
    regions: [
      { id: "stripes1", shape: "rect", x: 0,   y: 0,   w: 300, h: 15,  correctColor: "#BF0A30" },
      { id: "stripes2", shape: "rect", x: 0,   y: 15,  w: 300, h: 15,  correctColor: "#FFFFFF" },
      { id: "stripes3", shape: "rect", x: 0,   y: 30,  w: 300, h: 15,  correctColor: "#BF0A30" },
      { id: "stripes4", shape: "rect", x: 0,   y: 45,  w: 300, h: 15,  correctColor: "#FFFFFF" },
      { id: "stripes5", shape: "rect", x: 0,   y: 60,  w: 300, h: 15,  correctColor: "#BF0A30" },
      { id: "stripes6", shape: "rect", x: 0,   y: 75,  w: 300, h: 15,  correctColor: "#FFFFFF" },
      { id: "stripes7", shape: "rect", x: 0,   y: 90,  w: 300, h: 15,  correctColor: "#BF0A30" },
      { id: "canton",   shape: "rect", x: 0,   y: 0,   w: 120, h: 105, correctColor: "#002868" },
      { id: "stripes8", shape: "rect", x: 0,   y: 105, w: 300, h: 15,  correctColor: "#FFFFFF" },
      { id: "stripes9", shape: "rect", x: 0,   y: 120, w: 300, h: 15,  correctColor: "#BF0A30" },
      { id: "stripes10",shape: "rect", x: 0,   y: 135, w: 300, h: 15,  correctColor: "#FFFFFF" },
      { id: "stripes11",shape: "rect", x: 0,   y: 150, w: 300, h: 15,  correctColor: "#BF0A30" },
      { id: "stripes12",shape: "rect", x: 0,   y: 165, w: 300, h: 15,  correctColor: "#FFFFFF" },
      { id: "stripes13",shape: "rect", x: 0,   y: 180, w: 300, h: 20,  correctColor: "#BF0A30" },
    ],
    palette: ["#BF0A30", "#FFFFFF", "#002868"],
    symbols: [],
  },

  // Uruguay — horizontal white and blue stripes + Sun of May in upper-left canton
  uy: {
    regions: [
      { id: "bg",  shape: "rect", x: 0, y: 0,   w: 300, h: 200, correctColor: "#FFFFFF" },
      { id: "s1",  shape: "rect", x: 0, y: 22,  w: 300, h: 22,  correctColor: "#5EB6E4" },
      { id: "s2",  shape: "rect", x: 0, y: 66,  w: 300, h: 22,  correctColor: "#5EB6E4" },
      { id: "s3",  shape: "rect", x: 0, y: 110, w: 300, h: 22,  correctColor: "#5EB6E4" },
      { id: "s4",  shape: "rect", x: 0, y: 154, w: 300, h: 22,  correctColor: "#5EB6E4" },
    ],
    palette: ["#FFFFFF", "#5EB6E4"],
    symbols: [{ id: "sun", label: "Sun of May", target: { x: 52, y: 52 }, size: 46, crop: { fx: 0.185, fy: 0.278, zoom: 4 } }],
  },

  // Kosovo — blue bg + map outline (simplified to rect) + 6 stars
  xk: {
    regions: [
      { id: "bg", shape: "rect", x: 0, y: 0, w: 300, h: 200, correctColor: "#244AA5" },
    ],
    palette: ["#244AA5", "#E4C766"],
    symbols: [],
  },
};

export function flagTotal(flag) {
  return flag.regions.length + flag.symbols.length;
}

// Convert a raw API player row into the shape the game screens expect.
export function buildPlayer(row) {
  const code = (row.flag_colors?.[0] ?? "").toLowerCase();
  const flag = FLAG_GEOMETRY[code] ?? { regions: [], palette: [], symbols: [] };
  const firstName = row.full_name.split(" ")[0];
  return {
    id: row.id,
    name: row.full_name,
    firstName,
    code,
    photoUrl: row.photo_url ?? null,
    answers: {
      nationality: row.nationality,
      club: row.current_club,
      fullName: row.full_name,
      position: row.position,
    },
    flag,
  };
}

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
