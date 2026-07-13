import { jsx as l, jsxs as y, Fragment as le } from "react/jsx-runtime";
import { useState as z, useRef as se, useEffect as F, useCallback as ne, useMemo as xn } from "react";
function wn(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var ee = {}, we, at;
function vn() {
  return at || (at = 1, we = function() {
    return typeof Promise == "function" && Promise.prototype && Promise.prototype.then;
  }), we;
}
var ve = {}, j = {}, lt;
function Q() {
  if (lt) return j;
  lt = 1;
  let e;
  const i = [
    0,
    // Not used
    26,
    44,
    70,
    100,
    134,
    172,
    196,
    242,
    292,
    346,
    404,
    466,
    532,
    581,
    655,
    733,
    815,
    901,
    991,
    1085,
    1156,
    1258,
    1364,
    1474,
    1588,
    1706,
    1828,
    1921,
    2051,
    2185,
    2323,
    2465,
    2611,
    2761,
    2876,
    3034,
    3196,
    3362,
    3532,
    3706
  ];
  return j.getSymbolSize = function(o) {
    if (!o) throw new Error('"version" cannot be null or undefined');
    if (o < 1 || o > 40) throw new Error('"version" should be in range from 1 to 40');
    return o * 4 + 17;
  }, j.getSymbolTotalCodewords = function(o) {
    return i[o];
  }, j.getBCHDigit = function(a) {
    let o = 0;
    for (; a !== 0; )
      o++, a >>>= 1;
    return o;
  }, j.setToSJISFunction = function(o) {
    if (typeof o != "function")
      throw new Error('"toSJISFunc" is not a valid function.');
    e = o;
  }, j.isKanjiModeEnabled = function() {
    return typeof e < "u";
  }, j.toSJIS = function(o) {
    return e(o);
  }, j;
}
var ke = {}, st;
function et() {
  return st || (st = 1, (function(e) {
    e.L = { bit: 1 }, e.M = { bit: 0 }, e.Q = { bit: 3 }, e.H = { bit: 2 };
    function i(a) {
      if (typeof a != "string")
        throw new Error("Param is not a string");
      switch (a.toLowerCase()) {
        case "l":
        case "low":
          return e.L;
        case "m":
        case "medium":
          return e.M;
        case "q":
        case "quartile":
          return e.Q;
        case "h":
        case "high":
          return e.H;
        default:
          throw new Error("Unknown EC Level: " + a);
      }
    }
    e.isValid = function(o) {
      return o && typeof o.bit < "u" && o.bit >= 0 && o.bit < 4;
    }, e.from = function(o, r) {
      if (e.isValid(o))
        return o;
      try {
        return i(o);
      } catch {
        return r;
      }
    };
  })(ke)), ke;
}
var Ce, ct;
function kn() {
  if (ct) return Ce;
  ct = 1;
  function e() {
    this.buffer = [], this.length = 0;
  }
  return e.prototype = {
    get: function(i) {
      const a = Math.floor(i / 8);
      return (this.buffer[a] >>> 7 - i % 8 & 1) === 1;
    },
    put: function(i, a) {
      for (let o = 0; o < a; o++)
        this.putBit((i >>> a - o - 1 & 1) === 1);
    },
    getLengthInBits: function() {
      return this.length;
    },
    putBit: function(i) {
      const a = Math.floor(this.length / 8);
      this.buffer.length <= a && this.buffer.push(0), i && (this.buffer[a] |= 128 >>> this.length % 8), this.length++;
    }
  }, Ce = e, Ce;
}
var Te, dt;
function Cn() {
  if (dt) return Te;
  dt = 1;
  function e(i) {
    if (!i || i < 1)
      throw new Error("BitMatrix size must be defined and greater than 0");
    this.size = i, this.data = new Uint8Array(i * i), this.reservedBit = new Uint8Array(i * i);
  }
  return e.prototype.set = function(i, a, o, r) {
    const n = i * this.size + a;
    this.data[n] = o, r && (this.reservedBit[n] = !0);
  }, e.prototype.get = function(i, a) {
    return this.data[i * this.size + a];
  }, e.prototype.xor = function(i, a, o) {
    this.data[i * this.size + a] ^= o;
  }, e.prototype.isReserved = function(i, a) {
    return this.reservedBit[i * this.size + a];
  }, Te = e, Te;
}
var Be = {}, ut;
function Tn() {
  return ut || (ut = 1, (function(e) {
    const i = Q().getSymbolSize;
    e.getRowColCoords = function(o) {
      if (o === 1) return [];
      const r = Math.floor(o / 7) + 2, n = i(o), s = n === 145 ? 26 : Math.ceil((n - 13) / (2 * r - 2)) * 2, d = [n - 7];
      for (let c = 1; c < r - 1; c++)
        d[c] = d[c - 1] - s;
      return d.push(6), d.reverse();
    }, e.getPositions = function(o) {
      const r = [], n = e.getRowColCoords(o), s = n.length;
      for (let d = 0; d < s; d++)
        for (let c = 0; c < s; c++)
          d === 0 && c === 0 || // top-left
          d === 0 && c === s - 1 || // bottom-left
          d === s - 1 && c === 0 || r.push([n[d], n[c]]);
      return r;
    };
  })(Be)), Be;
}
var Ee = {}, gt;
function Bn() {
  if (gt) return Ee;
  gt = 1;
  const e = Q().getSymbolSize, i = 7;
  return Ee.getPositions = function(o) {
    const r = e(o);
    return [
      // top-left
      [0, 0],
      // top-right
      [r - i, 0],
      // bottom-left
      [0, r - i]
    ];
  }, Ee;
}
var Re = {}, ht;
function En() {
  return ht || (ht = 1, (function(e) {
    e.Patterns = {
      PATTERN000: 0,
      PATTERN001: 1,
      PATTERN010: 2,
      PATTERN011: 3,
      PATTERN100: 4,
      PATTERN101: 5,
      PATTERN110: 6,
      PATTERN111: 7
    };
    const i = {
      N1: 3,
      N2: 3,
      N3: 40,
      N4: 10
    };
    e.isValid = function(r) {
      return r != null && r !== "" && !isNaN(r) && r >= 0 && r <= 7;
    }, e.from = function(r) {
      return e.isValid(r) ? parseInt(r, 10) : void 0;
    }, e.getPenaltyN1 = function(r) {
      const n = r.size;
      let s = 0, d = 0, c = 0, u = null, f = null;
      for (let h = 0; h < n; h++) {
        d = c = 0, u = f = null;
        for (let S = 0; S < n; S++) {
          let v = r.get(h, S);
          v === u ? d++ : (d >= 5 && (s += i.N1 + (d - 5)), u = v, d = 1), v = r.get(S, h), v === f ? c++ : (c >= 5 && (s += i.N1 + (c - 5)), f = v, c = 1);
        }
        d >= 5 && (s += i.N1 + (d - 5)), c >= 5 && (s += i.N1 + (c - 5));
      }
      return s;
    }, e.getPenaltyN2 = function(r) {
      const n = r.size;
      let s = 0;
      for (let d = 0; d < n - 1; d++)
        for (let c = 0; c < n - 1; c++) {
          const u = r.get(d, c) + r.get(d, c + 1) + r.get(d + 1, c) + r.get(d + 1, c + 1);
          (u === 4 || u === 0) && s++;
        }
      return s * i.N2;
    }, e.getPenaltyN3 = function(r) {
      const n = r.size;
      let s = 0, d = 0, c = 0;
      for (let u = 0; u < n; u++) {
        d = c = 0;
        for (let f = 0; f < n; f++)
          d = d << 1 & 2047 | r.get(u, f), f >= 10 && (d === 1488 || d === 93) && s++, c = c << 1 & 2047 | r.get(f, u), f >= 10 && (c === 1488 || c === 93) && s++;
      }
      return s * i.N3;
    }, e.getPenaltyN4 = function(r) {
      let n = 0;
      const s = r.data.length;
      for (let c = 0; c < s; c++) n += r.data[c];
      return Math.abs(Math.ceil(n * 100 / s / 5) - 10) * i.N4;
    };
    function a(o, r, n) {
      switch (o) {
        case e.Patterns.PATTERN000:
          return (r + n) % 2 === 0;
        case e.Patterns.PATTERN001:
          return r % 2 === 0;
        case e.Patterns.PATTERN010:
          return n % 3 === 0;
        case e.Patterns.PATTERN011:
          return (r + n) % 3 === 0;
        case e.Patterns.PATTERN100:
          return (Math.floor(r / 2) + Math.floor(n / 3)) % 2 === 0;
        case e.Patterns.PATTERN101:
          return r * n % 2 + r * n % 3 === 0;
        case e.Patterns.PATTERN110:
          return (r * n % 2 + r * n % 3) % 2 === 0;
        case e.Patterns.PATTERN111:
          return (r * n % 3 + (r + n) % 2) % 2 === 0;
        default:
          throw new Error("bad maskPattern:" + o);
      }
    }
    e.applyMask = function(r, n) {
      const s = n.size;
      for (let d = 0; d < s; d++)
        for (let c = 0; c < s; c++)
          n.isReserved(c, d) || n.xor(c, d, a(r, c, d));
    }, e.getBestMask = function(r, n) {
      const s = Object.keys(e.Patterns).length;
      let d = 0, c = 1 / 0;
      for (let u = 0; u < s; u++) {
        n(u), e.applyMask(u, r);
        const f = e.getPenaltyN1(r) + e.getPenaltyN2(r) + e.getPenaltyN3(r) + e.getPenaltyN4(r);
        e.applyMask(u, r), f < c && (c = f, d = u);
      }
      return d;
    };
  })(Re)), Re;
}
var de = {}, ft;
function Qt() {
  if (ft) return de;
  ft = 1;
  const e = et(), i = [
    // L  M  Q  H
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    2,
    2,
    1,
    2,
    2,
    4,
    1,
    2,
    4,
    4,
    2,
    4,
    4,
    4,
    2,
    4,
    6,
    5,
    2,
    4,
    6,
    6,
    2,
    5,
    8,
    8,
    4,
    5,
    8,
    8,
    4,
    5,
    8,
    11,
    4,
    8,
    10,
    11,
    4,
    9,
    12,
    16,
    4,
    9,
    16,
    16,
    6,
    10,
    12,
    18,
    6,
    10,
    17,
    16,
    6,
    11,
    16,
    19,
    6,
    13,
    18,
    21,
    7,
    14,
    21,
    25,
    8,
    16,
    20,
    25,
    8,
    17,
    23,
    25,
    9,
    17,
    23,
    34,
    9,
    18,
    25,
    30,
    10,
    20,
    27,
    32,
    12,
    21,
    29,
    35,
    12,
    23,
    34,
    37,
    12,
    25,
    34,
    40,
    13,
    26,
    35,
    42,
    14,
    28,
    38,
    45,
    15,
    29,
    40,
    48,
    16,
    31,
    43,
    51,
    17,
    33,
    45,
    54,
    18,
    35,
    48,
    57,
    19,
    37,
    51,
    60,
    19,
    38,
    53,
    63,
    20,
    40,
    56,
    66,
    21,
    43,
    59,
    70,
    22,
    45,
    62,
    74,
    24,
    47,
    65,
    77,
    25,
    49,
    68,
    81
  ], a = [
    // L  M  Q  H
    7,
    10,
    13,
    17,
    10,
    16,
    22,
    28,
    15,
    26,
    36,
    44,
    20,
    36,
    52,
    64,
    26,
    48,
    72,
    88,
    36,
    64,
    96,
    112,
    40,
    72,
    108,
    130,
    48,
    88,
    132,
    156,
    60,
    110,
    160,
    192,
    72,
    130,
    192,
    224,
    80,
    150,
    224,
    264,
    96,
    176,
    260,
    308,
    104,
    198,
    288,
    352,
    120,
    216,
    320,
    384,
    132,
    240,
    360,
    432,
    144,
    280,
    408,
    480,
    168,
    308,
    448,
    532,
    180,
    338,
    504,
    588,
    196,
    364,
    546,
    650,
    224,
    416,
    600,
    700,
    224,
    442,
    644,
    750,
    252,
    476,
    690,
    816,
    270,
    504,
    750,
    900,
    300,
    560,
    810,
    960,
    312,
    588,
    870,
    1050,
    336,
    644,
    952,
    1110,
    360,
    700,
    1020,
    1200,
    390,
    728,
    1050,
    1260,
    420,
    784,
    1140,
    1350,
    450,
    812,
    1200,
    1440,
    480,
    868,
    1290,
    1530,
    510,
    924,
    1350,
    1620,
    540,
    980,
    1440,
    1710,
    570,
    1036,
    1530,
    1800,
    570,
    1064,
    1590,
    1890,
    600,
    1120,
    1680,
    1980,
    630,
    1204,
    1770,
    2100,
    660,
    1260,
    1860,
    2220,
    720,
    1316,
    1950,
    2310,
    750,
    1372,
    2040,
    2430
  ];
  return de.getBlocksCount = function(r, n) {
    switch (n) {
      case e.L:
        return i[(r - 1) * 4 + 0];
      case e.M:
        return i[(r - 1) * 4 + 1];
      case e.Q:
        return i[(r - 1) * 4 + 2];
      case e.H:
        return i[(r - 1) * 4 + 3];
      default:
        return;
    }
  }, de.getTotalCodewordsCount = function(r, n) {
    switch (n) {
      case e.L:
        return a[(r - 1) * 4 + 0];
      case e.M:
        return a[(r - 1) * 4 + 1];
      case e.Q:
        return a[(r - 1) * 4 + 2];
      case e.H:
        return a[(r - 1) * 4 + 3];
      default:
        return;
    }
  }, de;
}
var Ie = {}, oe = {}, pt;
function Rn() {
  if (pt) return oe;
  pt = 1;
  const e = new Uint8Array(512), i = new Uint8Array(256);
  return (function() {
    let o = 1;
    for (let r = 0; r < 255; r++)
      e[r] = o, i[o] = r, o <<= 1, o & 256 && (o ^= 285);
    for (let r = 255; r < 512; r++)
      e[r] = e[r - 255];
  })(), oe.log = function(o) {
    if (o < 1) throw new Error("log(" + o + ")");
    return i[o];
  }, oe.exp = function(o) {
    return e[o];
  }, oe.mul = function(o, r) {
    return o === 0 || r === 0 ? 0 : e[i[o] + i[r]];
  }, oe;
}
var yt;
function In() {
  return yt || (yt = 1, (function(e) {
    const i = Rn();
    e.mul = function(o, r) {
      const n = new Uint8Array(o.length + r.length - 1);
      for (let s = 0; s < o.length; s++)
        for (let d = 0; d < r.length; d++)
          n[s + d] ^= i.mul(o[s], r[d]);
      return n;
    }, e.mod = function(o, r) {
      let n = new Uint8Array(o);
      for (; n.length - r.length >= 0; ) {
        const s = n[0];
        for (let c = 0; c < r.length; c++)
          n[c] ^= i.mul(r[c], s);
        let d = 0;
        for (; d < n.length && n[d] === 0; ) d++;
        n = n.slice(d);
      }
      return n;
    }, e.generateECPolynomial = function(o) {
      let r = new Uint8Array([1]);
      for (let n = 0; n < o; n++)
        r = e.mul(r, new Uint8Array([1, i.exp(n)]));
      return r;
    };
  })(Ie)), Ie;
}
var Pe, mt;
function Pn() {
  if (mt) return Pe;
  mt = 1;
  const e = In();
  function i(a) {
    this.genPoly = void 0, this.degree = a, this.degree && this.initialize(this.degree);
  }
  return i.prototype.initialize = function(o) {
    this.degree = o, this.genPoly = e.generateECPolynomial(this.degree);
  }, i.prototype.encode = function(o) {
    if (!this.genPoly)
      throw new Error("Encoder not initialized");
    const r = new Uint8Array(o.length + this.degree);
    r.set(o);
    const n = e.mod(r, this.genPoly), s = this.degree - n.length;
    if (s > 0) {
      const d = new Uint8Array(this.degree);
      return d.set(n, s), d;
    }
    return n;
  }, Pe = i, Pe;
}
var _e = {}, Me = {}, Ae = {}, bt;
function Xt() {
  return bt || (bt = 1, Ae.isValid = function(i) {
    return !isNaN(i) && i >= 1 && i <= 40;
  }), Ae;
}
var U = {}, St;
function Zt() {
  if (St) return U;
  St = 1;
  const e = "[0-9]+", i = "[A-Z $%*+\\-./:]+";
  let a = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
  a = a.replace(/u/g, "\\u");
  const o = "(?:(?![A-Z0-9 $%*+\\-./:]|" + a + `)(?:.|[\r
]))+`;
  U.KANJI = new RegExp(a, "g"), U.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g"), U.BYTE = new RegExp(o, "g"), U.NUMERIC = new RegExp(e, "g"), U.ALPHANUMERIC = new RegExp(i, "g");
  const r = new RegExp("^" + a + "$"), n = new RegExp("^" + e + "$"), s = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
  return U.testKanji = function(c) {
    return r.test(c);
  }, U.testNumeric = function(c) {
    return n.test(c);
  }, U.testAlphanumeric = function(c) {
    return s.test(c);
  }, U;
}
var xt;
function X() {
  return xt || (xt = 1, (function(e) {
    const i = Xt(), a = Zt();
    e.NUMERIC = {
      id: "Numeric",
      bit: 1,
      ccBits: [10, 12, 14]
    }, e.ALPHANUMERIC = {
      id: "Alphanumeric",
      bit: 2,
      ccBits: [9, 11, 13]
    }, e.BYTE = {
      id: "Byte",
      bit: 4,
      ccBits: [8, 16, 16]
    }, e.KANJI = {
      id: "Kanji",
      bit: 8,
      ccBits: [8, 10, 12]
    }, e.MIXED = {
      bit: -1
    }, e.getCharCountIndicator = function(n, s) {
      if (!n.ccBits) throw new Error("Invalid mode: " + n);
      if (!i.isValid(s))
        throw new Error("Invalid version: " + s);
      return s >= 1 && s < 10 ? n.ccBits[0] : s < 27 ? n.ccBits[1] : n.ccBits[2];
    }, e.getBestModeForData = function(n) {
      return a.testNumeric(n) ? e.NUMERIC : a.testAlphanumeric(n) ? e.ALPHANUMERIC : a.testKanji(n) ? e.KANJI : e.BYTE;
    }, e.toString = function(n) {
      if (n && n.id) return n.id;
      throw new Error("Invalid mode");
    }, e.isValid = function(n) {
      return n && n.bit && n.ccBits;
    };
    function o(r) {
      if (typeof r != "string")
        throw new Error("Param is not a string");
      switch (r.toLowerCase()) {
        case "numeric":
          return e.NUMERIC;
        case "alphanumeric":
          return e.ALPHANUMERIC;
        case "kanji":
          return e.KANJI;
        case "byte":
          return e.BYTE;
        default:
          throw new Error("Unknown mode: " + r);
      }
    }
    e.from = function(n, s) {
      if (e.isValid(n))
        return n;
      try {
        return o(n);
      } catch {
        return s;
      }
    };
  })(Me)), Me;
}
var wt;
function _n() {
  return wt || (wt = 1, (function(e) {
    const i = Q(), a = Qt(), o = et(), r = X(), n = Xt(), s = 7973, d = i.getBCHDigit(s);
    function c(S, v, b) {
      for (let R = 1; R <= 40; R++)
        if (v <= e.getCapacity(R, b, S))
          return R;
    }
    function u(S, v) {
      return r.getCharCountIndicator(S, v) + 4;
    }
    function f(S, v) {
      let b = 0;
      return S.forEach(function(R) {
        const p = u(R.mode, v);
        b += p + R.getBitsLength();
      }), b;
    }
    function h(S, v) {
      for (let b = 1; b <= 40; b++)
        if (f(S, b) <= e.getCapacity(b, v, r.MIXED))
          return b;
    }
    e.from = function(v, b) {
      return n.isValid(v) ? parseInt(v, 10) : b;
    }, e.getCapacity = function(v, b, R) {
      if (!n.isValid(v))
        throw new Error("Invalid QR Code version");
      typeof R > "u" && (R = r.BYTE);
      const p = i.getSymbolTotalCodewords(v), g = a.getTotalCodewordsCount(v, b), I = (p - g) * 8;
      if (R === r.MIXED) return I;
      const w = I - u(R, v);
      switch (R) {
        case r.NUMERIC:
          return Math.floor(w / 10 * 3);
        case r.ALPHANUMERIC:
          return Math.floor(w / 11 * 2);
        case r.KANJI:
          return Math.floor(w / 13);
        case r.BYTE:
        default:
          return Math.floor(w / 8);
      }
    }, e.getBestVersionForData = function(v, b) {
      let R;
      const p = o.from(b, o.M);
      if (Array.isArray(v)) {
        if (v.length > 1)
          return h(v, p);
        if (v.length === 0)
          return 1;
        R = v[0];
      } else
        R = v;
      return c(R.mode, R.getLength(), p);
    }, e.getEncodedBits = function(v) {
      if (!n.isValid(v) || v < 7)
        throw new Error("Invalid QR Code version");
      let b = v << 12;
      for (; i.getBCHDigit(b) - d >= 0; )
        b ^= s << i.getBCHDigit(b) - d;
      return v << 12 | b;
    };
  })(_e)), _e;
}
var ze = {}, vt;
function Mn() {
  if (vt) return ze;
  vt = 1;
  const e = Q(), i = 1335, a = 21522, o = e.getBCHDigit(i);
  return ze.getEncodedBits = function(n, s) {
    const d = n.bit << 3 | s;
    let c = d << 10;
    for (; e.getBCHDigit(c) - o >= 0; )
      c ^= i << e.getBCHDigit(c) - o;
    return (d << 10 | c) ^ a;
  }, ze;
}
var Le = {}, Ne, kt;
function An() {
  if (kt) return Ne;
  kt = 1;
  const e = X();
  function i(a) {
    this.mode = e.NUMERIC, this.data = a.toString();
  }
  return i.getBitsLength = function(o) {
    return 10 * Math.floor(o / 3) + (o % 3 ? o % 3 * 3 + 1 : 0);
  }, i.prototype.getLength = function() {
    return this.data.length;
  }, i.prototype.getBitsLength = function() {
    return i.getBitsLength(this.data.length);
  }, i.prototype.write = function(o) {
    let r, n, s;
    for (r = 0; r + 3 <= this.data.length; r += 3)
      n = this.data.substr(r, 3), s = parseInt(n, 10), o.put(s, 10);
    const d = this.data.length - r;
    d > 0 && (n = this.data.substr(r), s = parseInt(n, 10), o.put(s, d * 3 + 1));
  }, Ne = i, Ne;
}
var $e, Ct;
function zn() {
  if (Ct) return $e;
  Ct = 1;
  const e = X(), i = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    " ",
    "$",
    "%",
    "*",
    "+",
    "-",
    ".",
    "/",
    ":"
  ];
  function a(o) {
    this.mode = e.ALPHANUMERIC, this.data = o;
  }
  return a.getBitsLength = function(r) {
    return 11 * Math.floor(r / 2) + 6 * (r % 2);
  }, a.prototype.getLength = function() {
    return this.data.length;
  }, a.prototype.getBitsLength = function() {
    return a.getBitsLength(this.data.length);
  }, a.prototype.write = function(r) {
    let n;
    for (n = 0; n + 2 <= this.data.length; n += 2) {
      let s = i.indexOf(this.data[n]) * 45;
      s += i.indexOf(this.data[n + 1]), r.put(s, 11);
    }
    this.data.length % 2 && r.put(i.indexOf(this.data[n]), 6);
  }, $e = a, $e;
}
var De, Tt;
function Ln() {
  if (Tt) return De;
  Tt = 1;
  const e = X();
  function i(a) {
    this.mode = e.BYTE, typeof a == "string" ? this.data = new TextEncoder().encode(a) : this.data = new Uint8Array(a);
  }
  return i.getBitsLength = function(o) {
    return o * 8;
  }, i.prototype.getLength = function() {
    return this.data.length;
  }, i.prototype.getBitsLength = function() {
    return i.getBitsLength(this.data.length);
  }, i.prototype.write = function(a) {
    for (let o = 0, r = this.data.length; o < r; o++)
      a.put(this.data[o], 8);
  }, De = i, De;
}
var Fe, Bt;
function Nn() {
  if (Bt) return Fe;
  Bt = 1;
  const e = X(), i = Q();
  function a(o) {
    this.mode = e.KANJI, this.data = o;
  }
  return a.getBitsLength = function(r) {
    return r * 13;
  }, a.prototype.getLength = function() {
    return this.data.length;
  }, a.prototype.getBitsLength = function() {
    return a.getBitsLength(this.data.length);
  }, a.prototype.write = function(o) {
    let r;
    for (r = 0; r < this.data.length; r++) {
      let n = i.toSJIS(this.data[r]);
      if (n >= 33088 && n <= 40956)
        n -= 33088;
      else if (n >= 57408 && n <= 60351)
        n -= 49472;
      else
        throw new Error(
          "Invalid SJIS character: " + this.data[r] + `
Make sure your charset is UTF-8`
        );
      n = (n >>> 8 & 255) * 192 + (n & 255), o.put(n, 13);
    }
  }, Fe = a, Fe;
}
var Ue = { exports: {} }, Et;
function $n() {
  return Et || (Et = 1, (function(e) {
    var i = {
      single_source_shortest_paths: function(a, o, r) {
        var n = {}, s = {};
        s[o] = 0;
        var d = i.PriorityQueue.make();
        d.push(o, 0);
        for (var c, u, f, h, S, v, b, R, p; !d.empty(); ) {
          c = d.pop(), u = c.value, h = c.cost, S = a[u] || {};
          for (f in S)
            S.hasOwnProperty(f) && (v = S[f], b = h + v, R = s[f], p = typeof s[f] > "u", (p || R > b) && (s[f] = b, d.push(f, b), n[f] = u));
        }
        if (typeof r < "u" && typeof s[r] > "u") {
          var g = ["Could not find a path from ", o, " to ", r, "."].join("");
          throw new Error(g);
        }
        return n;
      },
      extract_shortest_path_from_predecessor_list: function(a, o) {
        for (var r = [], n = o; n; )
          r.push(n), a[n], n = a[n];
        return r.reverse(), r;
      },
      find_path: function(a, o, r) {
        var n = i.single_source_shortest_paths(a, o, r);
        return i.extract_shortest_path_from_predecessor_list(
          n,
          r
        );
      },
      /**
       * A very naive priority queue implementation.
       */
      PriorityQueue: {
        make: function(a) {
          var o = i.PriorityQueue, r = {}, n;
          a = a || {};
          for (n in o)
            o.hasOwnProperty(n) && (r[n] = o[n]);
          return r.queue = [], r.sorter = a.sorter || o.default_sorter, r;
        },
        default_sorter: function(a, o) {
          return a.cost - o.cost;
        },
        /**
         * Add a new item to the queue and ensure the highest priority element
         * is at the front of the queue.
         */
        push: function(a, o) {
          var r = { value: a, cost: o };
          this.queue.push(r), this.queue.sort(this.sorter);
        },
        /**
         * Return the highest priority element in the queue.
         */
        pop: function() {
          return this.queue.shift();
        },
        empty: function() {
          return this.queue.length === 0;
        }
      }
    };
    e.exports = i;
  })(Ue)), Ue.exports;
}
var Rt;
function Dn() {
  return Rt || (Rt = 1, (function(e) {
    const i = X(), a = An(), o = zn(), r = Ln(), n = Nn(), s = Zt(), d = Q(), c = $n();
    function u(g) {
      return unescape(encodeURIComponent(g)).length;
    }
    function f(g, I, w) {
      const k = [];
      let L;
      for (; (L = g.exec(w)) !== null; )
        k.push({
          data: L[0],
          index: L.index,
          mode: I,
          length: L[0].length
        });
      return k;
    }
    function h(g) {
      const I = f(s.NUMERIC, i.NUMERIC, g), w = f(s.ALPHANUMERIC, i.ALPHANUMERIC, g);
      let k, L;
      return d.isKanjiModeEnabled() ? (k = f(s.BYTE, i.BYTE, g), L = f(s.KANJI, i.KANJI, g)) : (k = f(s.BYTE_KANJI, i.BYTE, g), L = []), I.concat(w, k, L).sort(function(E, P) {
        return E.index - P.index;
      }).map(function(E) {
        return {
          data: E.data,
          mode: E.mode,
          length: E.length
        };
      });
    }
    function S(g, I) {
      switch (I) {
        case i.NUMERIC:
          return a.getBitsLength(g);
        case i.ALPHANUMERIC:
          return o.getBitsLength(g);
        case i.KANJI:
          return n.getBitsLength(g);
        case i.BYTE:
          return r.getBitsLength(g);
      }
    }
    function v(g) {
      return g.reduce(function(I, w) {
        const k = I.length - 1 >= 0 ? I[I.length - 1] : null;
        return k && k.mode === w.mode ? (I[I.length - 1].data += w.data, I) : (I.push(w), I);
      }, []);
    }
    function b(g) {
      const I = [];
      for (let w = 0; w < g.length; w++) {
        const k = g[w];
        switch (k.mode) {
          case i.NUMERIC:
            I.push([
              k,
              { data: k.data, mode: i.ALPHANUMERIC, length: k.length },
              { data: k.data, mode: i.BYTE, length: k.length }
            ]);
            break;
          case i.ALPHANUMERIC:
            I.push([
              k,
              { data: k.data, mode: i.BYTE, length: k.length }
            ]);
            break;
          case i.KANJI:
            I.push([
              k,
              { data: k.data, mode: i.BYTE, length: u(k.data) }
            ]);
            break;
          case i.BYTE:
            I.push([
              { data: k.data, mode: i.BYTE, length: u(k.data) }
            ]);
        }
      }
      return I;
    }
    function R(g, I) {
      const w = {}, k = { start: {} };
      let L = ["start"];
      for (let B = 0; B < g.length; B++) {
        const E = g[B], P = [];
        for (let T = 0; T < E.length; T++) {
          const m = E[T], C = "" + B + T;
          P.push(C), w[C] = { node: m, lastCount: 0 }, k[C] = {};
          for (let _ = 0; _ < L.length; _++) {
            const M = L[_];
            w[M] && w[M].node.mode === m.mode ? (k[M][C] = S(w[M].lastCount + m.length, m.mode) - S(w[M].lastCount, m.mode), w[M].lastCount += m.length) : (w[M] && (w[M].lastCount = m.length), k[M][C] = S(m.length, m.mode) + 4 + i.getCharCountIndicator(m.mode, I));
          }
        }
        L = P;
      }
      for (let B = 0; B < L.length; B++)
        k[L[B]].end = 0;
      return { map: k, table: w };
    }
    function p(g, I) {
      let w;
      const k = i.getBestModeForData(g);
      if (w = i.from(I, k), w !== i.BYTE && w.bit < k.bit)
        throw new Error('"' + g + '" cannot be encoded with mode ' + i.toString(w) + `.
 Suggested mode is: ` + i.toString(k));
      switch (w === i.KANJI && !d.isKanjiModeEnabled() && (w = i.BYTE), w) {
        case i.NUMERIC:
          return new a(g);
        case i.ALPHANUMERIC:
          return new o(g);
        case i.KANJI:
          return new n(g);
        case i.BYTE:
          return new r(g);
      }
    }
    e.fromArray = function(I) {
      return I.reduce(function(w, k) {
        return typeof k == "string" ? w.push(p(k, null)) : k.data && w.push(p(k.data, k.mode)), w;
      }, []);
    }, e.fromString = function(I, w) {
      const k = h(I, d.isKanjiModeEnabled()), L = b(k), B = R(L, w), E = c.find_path(B.map, "start", "end"), P = [];
      for (let T = 1; T < E.length - 1; T++)
        P.push(B.table[E[T]].node);
      return e.fromArray(v(P));
    }, e.rawSplit = function(I) {
      return e.fromArray(
        h(I, d.isKanjiModeEnabled())
      );
    };
  })(Le)), Le;
}
var It;
function Fn() {
  if (It) return ve;
  It = 1;
  const e = Q(), i = et(), a = kn(), o = Cn(), r = Tn(), n = Bn(), s = En(), d = Qt(), c = Pn(), u = _n(), f = Mn(), h = X(), S = Dn();
  function v(B, E) {
    const P = B.size, T = n.getPositions(E);
    for (let m = 0; m < T.length; m++) {
      const C = T[m][0], _ = T[m][1];
      for (let M = -1; M <= 7; M++)
        if (!(C + M <= -1 || P <= C + M))
          for (let A = -1; A <= 7; A++)
            _ + A <= -1 || P <= _ + A || (M >= 0 && M <= 6 && (A === 0 || A === 6) || A >= 0 && A <= 6 && (M === 0 || M === 6) || M >= 2 && M <= 4 && A >= 2 && A <= 4 ? B.set(C + M, _ + A, !0, !0) : B.set(C + M, _ + A, !1, !0));
    }
  }
  function b(B) {
    const E = B.size;
    for (let P = 8; P < E - 8; P++) {
      const T = P % 2 === 0;
      B.set(P, 6, T, !0), B.set(6, P, T, !0);
    }
  }
  function R(B, E) {
    const P = r.getPositions(E);
    for (let T = 0; T < P.length; T++) {
      const m = P[T][0], C = P[T][1];
      for (let _ = -2; _ <= 2; _++)
        for (let M = -2; M <= 2; M++)
          _ === -2 || _ === 2 || M === -2 || M === 2 || _ === 0 && M === 0 ? B.set(m + _, C + M, !0, !0) : B.set(m + _, C + M, !1, !0);
    }
  }
  function p(B, E) {
    const P = B.size, T = u.getEncodedBits(E);
    let m, C, _;
    for (let M = 0; M < 18; M++)
      m = Math.floor(M / 3), C = M % 3 + P - 8 - 3, _ = (T >> M & 1) === 1, B.set(m, C, _, !0), B.set(C, m, _, !0);
  }
  function g(B, E, P) {
    const T = B.size, m = f.getEncodedBits(E, P);
    let C, _;
    for (C = 0; C < 15; C++)
      _ = (m >> C & 1) === 1, C < 6 ? B.set(C, 8, _, !0) : C < 8 ? B.set(C + 1, 8, _, !0) : B.set(T - 15 + C, 8, _, !0), C < 8 ? B.set(8, T - C - 1, _, !0) : C < 9 ? B.set(8, 15 - C - 1 + 1, _, !0) : B.set(8, 15 - C - 1, _, !0);
    B.set(T - 8, 8, 1, !0);
  }
  function I(B, E) {
    const P = B.size;
    let T = -1, m = P - 1, C = 7, _ = 0;
    for (let M = P - 1; M > 0; M -= 2)
      for (M === 6 && M--; ; ) {
        for (let A = 0; A < 2; A++)
          if (!B.isReserved(m, M - A)) {
            let O = !1;
            _ < E.length && (O = (E[_] >>> C & 1) === 1), B.set(m, M - A, O), C--, C === -1 && (_++, C = 7);
          }
        if (m += T, m < 0 || P <= m) {
          m -= T, T = -T;
          break;
        }
      }
  }
  function w(B, E, P) {
    const T = new a();
    P.forEach(function(A) {
      T.put(A.mode.bit, 4), T.put(A.getLength(), h.getCharCountIndicator(A.mode, B)), A.write(T);
    });
    const m = e.getSymbolTotalCodewords(B), C = d.getTotalCodewordsCount(B, E), _ = (m - C) * 8;
    for (T.getLengthInBits() + 4 <= _ && T.put(0, 4); T.getLengthInBits() % 8 !== 0; )
      T.putBit(0);
    const M = (_ - T.getLengthInBits()) / 8;
    for (let A = 0; A < M; A++)
      T.put(A % 2 ? 17 : 236, 8);
    return k(T, B, E);
  }
  function k(B, E, P) {
    const T = e.getSymbolTotalCodewords(E), m = d.getTotalCodewordsCount(E, P), C = T - m, _ = d.getBlocksCount(E, P), M = T % _, A = _ - M, O = Math.floor(T / _), re = Math.floor(C / _), mn = re + 1, rt = O - re, bn = new c(rt);
    let me = 0;
    const ce = new Array(_), ot = new Array(_);
    let be = 0;
    const Sn = new Uint8Array(B.buffer);
    for (let Z = 0; Z < _; Z++) {
      const xe = Z < A ? re : mn;
      ce[Z] = Sn.slice(me, me + xe), ot[Z] = bn.encode(ce[Z]), me += xe, be = Math.max(be, xe);
    }
    const Se = new Uint8Array(T);
    let it = 0, q, W;
    for (q = 0; q < be; q++)
      for (W = 0; W < _; W++)
        q < ce[W].length && (Se[it++] = ce[W][q]);
    for (q = 0; q < rt; q++)
      for (W = 0; W < _; W++)
        Se[it++] = ot[W][q];
    return Se;
  }
  function L(B, E, P, T) {
    let m;
    if (Array.isArray(B))
      m = S.fromArray(B);
    else if (typeof B == "string") {
      let O = E;
      if (!O) {
        const re = S.rawSplit(B);
        O = u.getBestVersionForData(re, P);
      }
      m = S.fromString(B, O || 40);
    } else
      throw new Error("Invalid data");
    const C = u.getBestVersionForData(m, P);
    if (!C)
      throw new Error("The amount of data is too big to be stored in a QR Code");
    if (!E)
      E = C;
    else if (E < C)
      throw new Error(
        `
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: ` + C + `.
`
      );
    const _ = w(E, P, m), M = e.getSymbolSize(E), A = new o(M);
    return v(A, E), b(A), R(A, E), g(A, P, 0), E >= 7 && p(A, E), I(A, _), isNaN(T) && (T = s.getBestMask(
      A,
      g.bind(null, A, P)
    )), s.applyMask(T, A), g(A, P, T), {
      modules: A,
      version: E,
      errorCorrectionLevel: P,
      maskPattern: T,
      segments: m
    };
  }
  return ve.create = function(E, P) {
    if (typeof E > "u" || E === "")
      throw new Error("No input text");
    let T = i.M, m, C;
    return typeof P < "u" && (T = i.from(P.errorCorrectionLevel, i.M), m = u.from(P.version), C = s.from(P.maskPattern), P.toSJISFunc && e.setToSJISFunction(P.toSJISFunc)), L(E, m, T, C);
  }, ve;
}
var qe = {}, We = {}, Pt;
function en() {
  return Pt || (Pt = 1, (function(e) {
    function i(a) {
      if (typeof a == "number" && (a = a.toString()), typeof a != "string")
        throw new Error("Color should be defined as hex string");
      let o = a.slice().replace("#", "").split("");
      if (o.length < 3 || o.length === 5 || o.length > 8)
        throw new Error("Invalid hex color: " + a);
      (o.length === 3 || o.length === 4) && (o = Array.prototype.concat.apply([], o.map(function(n) {
        return [n, n];
      }))), o.length === 6 && o.push("F", "F");
      const r = parseInt(o.join(""), 16);
      return {
        r: r >> 24 & 255,
        g: r >> 16 & 255,
        b: r >> 8 & 255,
        a: r & 255,
        hex: "#" + o.slice(0, 6).join("")
      };
    }
    e.getOptions = function(o) {
      o || (o = {}), o.color || (o.color = {});
      const r = typeof o.margin > "u" || o.margin === null || o.margin < 0 ? 4 : o.margin, n = o.width && o.width >= 21 ? o.width : void 0, s = o.scale || 4;
      return {
        width: n,
        scale: n ? 4 : s,
        margin: r,
        color: {
          dark: i(o.color.dark || "#000000ff"),
          light: i(o.color.light || "#ffffffff")
        },
        type: o.type,
        rendererOpts: o.rendererOpts || {}
      };
    }, e.getScale = function(o, r) {
      return r.width && r.width >= o + r.margin * 2 ? r.width / (o + r.margin * 2) : r.scale;
    }, e.getImageWidth = function(o, r) {
      const n = e.getScale(o, r);
      return Math.floor((o + r.margin * 2) * n);
    }, e.qrToImageData = function(o, r, n) {
      const s = r.modules.size, d = r.modules.data, c = e.getScale(s, n), u = Math.floor((s + n.margin * 2) * c), f = n.margin * c, h = [n.color.light, n.color.dark];
      for (let S = 0; S < u; S++)
        for (let v = 0; v < u; v++) {
          let b = (S * u + v) * 4, R = n.color.light;
          if (S >= f && v >= f && S < u - f && v < u - f) {
            const p = Math.floor((S - f) / c), g = Math.floor((v - f) / c);
            R = h[d[p * s + g] ? 1 : 0];
          }
          o[b++] = R.r, o[b++] = R.g, o[b++] = R.b, o[b] = R.a;
        }
    };
  })(We)), We;
}
var _t;
function Un() {
  return _t || (_t = 1, (function(e) {
    const i = en();
    function a(r, n, s) {
      r.clearRect(0, 0, n.width, n.height), n.style || (n.style = {}), n.height = s, n.width = s, n.style.height = s + "px", n.style.width = s + "px";
    }
    function o() {
      try {
        return document.createElement("canvas");
      } catch {
        throw new Error("You need to specify a canvas element");
      }
    }
    e.render = function(n, s, d) {
      let c = d, u = s;
      typeof c > "u" && (!s || !s.getContext) && (c = s, s = void 0), s || (u = o()), c = i.getOptions(c);
      const f = i.getImageWidth(n.modules.size, c), h = u.getContext("2d"), S = h.createImageData(f, f);
      return i.qrToImageData(S.data, n, c), a(h, u, f), h.putImageData(S, 0, 0), u;
    }, e.renderToDataURL = function(n, s, d) {
      let c = d;
      typeof c > "u" && (!s || !s.getContext) && (c = s, s = void 0), c || (c = {});
      const u = e.render(n, s, c), f = c.type || "image/png", h = c.rendererOpts || {};
      return u.toDataURL(f, h.quality);
    };
  })(qe)), qe;
}
var Oe = {}, Mt;
function qn() {
  if (Mt) return Oe;
  Mt = 1;
  const e = en();
  function i(r, n) {
    const s = r.a / 255, d = n + '="' + r.hex + '"';
    return s < 1 ? d + " " + n + '-opacity="' + s.toFixed(2).slice(1) + '"' : d;
  }
  function a(r, n, s) {
    let d = r + n;
    return typeof s < "u" && (d += " " + s), d;
  }
  function o(r, n, s) {
    let d = "", c = 0, u = !1, f = 0;
    for (let h = 0; h < r.length; h++) {
      const S = Math.floor(h % n), v = Math.floor(h / n);
      !S && !u && (u = !0), r[h] ? (f++, h > 0 && S > 0 && r[h - 1] || (d += u ? a("M", S + s, 0.5 + v + s) : a("m", c, 0), c = 0, u = !1), S + 1 < n && r[h + 1] || (d += a("h", f), f = 0)) : c++;
    }
    return d;
  }
  return Oe.render = function(n, s, d) {
    const c = e.getOptions(s), u = n.modules.size, f = n.modules.data, h = u + c.margin * 2, S = c.color.light.a ? "<path " + i(c.color.light, "fill") + ' d="M0 0h' + h + "v" + h + 'H0z"/>' : "", v = "<path " + i(c.color.dark, "stroke") + ' d="' + o(f, u, c.margin) + '"/>', b = 'viewBox="0 0 ' + h + " " + h + '"', p = '<svg xmlns="http://www.w3.org/2000/svg" ' + (c.width ? 'width="' + c.width + '" height="' + c.width + '" ' : "") + b + ' shape-rendering="crispEdges">' + S + v + `</svg>
`;
    return typeof d == "function" && d(null, p), p;
  }, Oe;
}
var At;
function Wn() {
  if (At) return ee;
  At = 1;
  const e = vn(), i = Fn(), a = Un(), o = qn();
  function r(n, s, d, c, u) {
    const f = [].slice.call(arguments, 1), h = f.length, S = typeof f[h - 1] == "function";
    if (!S && !e())
      throw new Error("Callback required as last argument");
    if (S) {
      if (h < 2)
        throw new Error("Too few arguments provided");
      h === 2 ? (u = d, d = s, s = c = void 0) : h === 3 && (s.getContext && typeof u > "u" ? (u = c, c = void 0) : (u = c, c = d, d = s, s = void 0));
    } else {
      if (h < 1)
        throw new Error("Too few arguments provided");
      return h === 1 ? (d = s, s = c = void 0) : h === 2 && !s.getContext && (c = d, d = s, s = void 0), new Promise(function(v, b) {
        try {
          const R = i.create(d, c);
          v(n(R, s, c));
        } catch (R) {
          b(R);
        }
      });
    }
    try {
      const v = i.create(d, c);
      u(null, n(v, s, c));
    } catch (v) {
      u(v);
    }
  }
  return ee.create = i.create, ee.toCanvas = r.bind(null, a.render), ee.toDataURL = r.bind(null, a.renderToDataURL), ee.toString = r.bind(null, function(n, s, d) {
    return o.render(n, d);
  }), ee;
}
var On = Wn();
const tn = /* @__PURE__ */ wn(On), nn = {
  primary: "oklch(0.9848 0 0)",
  primaryForeground: "oklch(15% 0.0000 0.00)",
  primaryHover: "color-mix(in oklab, oklch(0.9848 0 0) 88%, oklch(15% 0.0000 0.00) 12%)",
  primarySubtle: "color-mix(in oklab, oklch(0.9848 0 0) 14%, transparent)",
  primaryGlow: "color-mix(in oklab, oklch(0.9848 0 0) 22%, transparent)",
  success: "oklch(73.29% 0.1935 120.35)",
  successForeground: "oklch(21.03% 0.0059 120.35)",
  successSubtle: "color-mix(in oklab, oklch(73.29% 0.1935 120.35) 15%, transparent)",
  warning: "oklch(0.8803 0.1348 86.06)",
  warningForeground: "oklch(15% 0.0404 86.06)",
  warningSubtle: "color-mix(in oklab, oklch(0.8803 0.1348 86.06) 15%, transparent)",
  danger: "oklch(0.7044 0.1872 23.19)",
  dangerForeground: "oklch(15% 0.0500 23.19)",
  dangerSubtle: "color-mix(in oklab, oklch(0.7044 0.1872 23.19) 15%, transparent)",
  info: "oklch(0.9848 0 0)",
  infoSubtle: "color-mix(in oklab, oklch(0.9848 0 0) 14%, transparent)",
  defaultBg: "oklch(27.40% 0.0000 0.00)",
  defaultForeground: "oklch(99.11% 0 0)",
  fieldBackground: "oklch(21.03% 0.0000 0.00)",
  fieldForeground: "oklch(99.11% 0.0000 0.00)",
  fieldPlaceholder: "oklch(70.50% 0.0000 0.00)",
  muted: "oklch(70.50% 0.0000 0.00)",
  overlay: "oklch(21.03% 0.0000 0.00)",
  overlayForeground: "oklch(99.11% 0.0000 0.00)",
  scrollbar: "oklch(70.50% 0.0000 0.00)",
  segment: "oklch(39.64% 0.0000 0.00)",
  segmentForeground: "oklch(99.11% 0.0000 0.00)",
  surface: "oklch(21.03% 0.0000 0.00)",
  surfaceForeground: "oklch(99.11% 0.0000 0.00)",
  surfaceSecondary: "oklch(25.70% 0.0000 0.00)",
  surfaceSecondaryForeground: "oklch(99.11% 0.0000 0.00)",
  surfaceTertiary: "oklch(27.21% 0.0000 0.00)",
  surfaceTertiaryForeground: "oklch(99.11% 0.0000 0.00)",
  bgDeep: "oklch(12.00% 0.0000 0.00)",
  bg: "oklch(12.00% 0.0000 0.00)",
  bgElevated: "oklch(21.03% 0.0000 0.00)",
  bgSurface: "oklch(21.03% 0.0000 0.00)",
  bgHover: "oklch(25.70% 0.0000 0.00)",
  bgActive: "oklch(27.21% 0.0000 0.00)",
  border: "oklch(28.00% 0.0000 0.00)",
  borderSubtle: "oklch(25.00% 0.0000 0.00)",
  borderFocus: "oklch(0.9848 0 0)",
  text: "oklch(99.11% 0.0000 0.00)",
  textSecondary: "oklch(70.50% 0.0000 0.00)",
  textTertiary: "oklch(70.50% 0.0000 0.00)",
  textInverse: "oklch(15% 0.0000 0.00)",
  glass: "color-mix(in oklab, oklch(21.03% 0.0000 0.00) 92%, transparent)",
  glassBorder: "oklch(28.00% 0.0000 0.00)",
  shadowSm: "0 0 0 0 transparent inset",
  shadowMd: "0 0 0 0 transparent inset",
  shadowLg: "0 0 1px 0 #ffffff4d inset",
  shadowGlow: "0 0 0 1px color-mix(in oklab, oklch(0.9848 0 0) 18%, transparent)"
}, jn = {
  radiusSm: "0.25rem",
  radiusMd: "0.25rem",
  radiusLg: "0.25rem",
  radiusXl: "0.25rem",
  fieldRadius: "0.5rem",
  fontSans: "'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  fontMono: "'Geist Mono', 'SF Mono', 'Cascadia Code', monospace",
  transition: "200ms cubic-bezier(0.4, 0, 0.2, 1)",
  transitionSlow: "400ms cubic-bezier(0.4, 0, 0.2, 1)"
}, Hn = {
  sidebarWidth: "260px",
  sidebarCollapsed: "72px",
  topbarHeight: "64px"
}, tt = {
  ...jn,
  ...Hn
}, rn = {
  dark: nn
};
function Vn(e) {
  return e.replace(/[A-Z]/g, (i) => "-" + i.toLowerCase());
}
function on(e = "ag") {
  return e.trim() || "ag";
}
function ye(e, i) {
  return `--${e}-${Vn(i)}`;
}
Object.keys(rn.dark).reduce((e, i) => (e[i] = ye("ag", i), e), {});
Object.keys(tt).reduce((e, i) => (e[i] = ye("ag", i), e), {});
function an(e = {}) {
  const i = on(e.prefix);
  return Object.keys(rn.dark).reduce((a, o) => (a[o] = ye(i, o), a), {});
}
function ln(e = {}) {
  const i = on(e.prefix);
  return Object.keys(tt).reduce((a, o) => (a[o] = ye(i, o), a), {});
}
const Kn = an(), Gn = ln();
function t(e, i = {}) {
  const a = i.prefix ? an(i) : Kn, o = i.prefix ? ln(i) : Gn;
  if (e in a) {
    const n = e;
    return `var(${a[n]}, ${nn[n]})`;
  }
  const r = e;
  return `var(${o[r]}, ${tt[r]})`;
}
const Jn = "/api/v1/ext-user/payment-epay", Yn = "/api/v1/ext/payment-epay";
async function D(e, i, a, o) {
  const r = {};
  a !== void 0 && (r["Content-Type"] = "application/json");
  const n = localStorage.getItem("token");
  n && (r.Authorization = `Bearer ${n}`);
  const s = o != null && o.admin ? Yn : Jn, d = await fetch(s + i, {
    method: e,
    headers: r,
    body: a ? JSON.stringify(a) : void 0
  }), c = await d.text();
  let u = null;
  try {
    u = c ? JSON.parse(c) : null;
  } catch {
  }
  if (!d.ok) {
    const h = u, S = (h == null ? void 0 : h.message) || (u == null ? void 0 : u.error) || `HTTP ${d.status}`;
    throw d.status === 401 && (localStorage.removeItem("token"), window.location.href = "/login"), new Error(S);
  }
  const f = u;
  if (f && typeof f == "object" && "code" in f && "data" in f) {
    if (f.code !== 0)
      throw new Error(f.message || "请求失败");
    return f.data;
  }
  return u;
}
const $ = {
  // ============ User ============
  /** 列出当前可用的支付方式（PayMethod，不是 Provider） */
  methods: () => D(
    "GET",
    "/user/methods"
  ),
  createOrder: (e) => D("POST", "/user/orders", e),
  /** 启用中的充值套餐（"充100送15"按钮数据源）；未配置套餐时返回空列表 */
  packages: () => D("GET", "/user/packages"),
  listOrders: (e = 50) => D("GET", `/user/orders?limit=${e}`),
  getOrder: (e) => D("GET", `/user/orders/${encodeURIComponent(e)}`),
  // ============ Admin: 订单 ============
  // email 为子串过滤（后端走 ILIKE %x%）；status='all' 或留空表示不过滤
  adminListOrders: (e = {}) => {
    const i = new URLSearchParams();
    return i.set("page", String(e.page ?? 1)), i.set("page_size", String(e.pageSize ?? 20)), e.email && e.email.trim() && i.set("email", e.email.trim()), e.status && e.status !== "all" && i.set("status", e.status), D("GET", `/admin/orders?${i.toString()}`, void 0, { admin: !0 });
  },
  // ============ Admin: Provider 配置 ============
  adminListProviders: () => D("GET", "/admin/providers", void 0, { admin: !0 }),
  adminUpsertProvider: (e) => D("POST", "/admin/providers", e, { admin: !0 }),
  adminDeleteProvider: (e) => D("DELETE", `/admin/providers/${encodeURIComponent(e)}`, void 0, { admin: !0 }),
  adminReloadProviders: () => D("POST", "/admin/providers/reload", {}, { admin: !0 }),
  // ============ Admin: 充值套餐 ============
  adminListPackages: () => D("GET", "/admin/packages", void 0, { admin: !0 }),
  /** id=0 表示新增，>0 表示编辑 */
  adminUpsertPackage: (e) => D("POST", "/admin/packages", e, { admin: !0 }),
  adminDeletePackage: (e) => D("DELETE", `/admin/packages/${e}`, void 0, { admin: !0 })
};
let ue = null;
function Qn() {
  return ue || (ue = (async () => {
    var r;
    const i = await (await fetch("/api/v1/settings/public")).json(), a = (i == null ? void 0 : i.data) || {};
    let o = "";
    try {
      const n = window.localStorage.getItem("ag_origin_site") || "";
      if (n && a.sites_branding) {
        const s = JSON.parse(a.sites_branding);
        o = ((r = s == null ? void 0 : s[n]) == null ? void 0 : r.name) || "";
      }
    } catch {
    }
    return o || a.site_name || "";
  })().catch(() => (ue = null, ""))), ue;
}
function N(e, i = {}) {
  const a = e.toFixed(2);
  return i.compact ? `$${e}` : `$${a}`;
}
const Xn = /* @__PURE__ */ new Set(["zh", "zh-HK", "en", "ja"]);
function zt(e) {
  return e && Xn.has(e) ? e : null;
}
function Zn() {
  if (typeof navigator > "u") return "en";
  const e = Array.isArray(navigator.languages) && navigator.languages.length ? navigator.languages : [navigator.language];
  for (const i of e) {
    const a = (i || "").toLowerCase();
    if (a) {
      if (a === "zh-hk" || a === "zh-tw" || a === "zh-mo" || a.includes("hant")) return "zh-HK";
      if (a.startsWith("zh")) return "zh";
      if (a.startsWith("ja")) return "ja";
      if (a.startsWith("en")) return "en";
    }
  }
  return "en";
}
function er() {
  if (typeof document < "u") {
    const e = document.cookie.match(/(?:^|;\s*)lang=([^;]+)/), i = e ? zt(decodeURIComponent(e[1] ?? "")) : null;
    if (i) return i;
  }
  try {
    const e = zt(window.localStorage.getItem("lang"));
    if (e) return e;
  } catch {
  }
  return Zn();
}
const tr = {
  "加载中...": "載入中...",
  "加载失败: ": "載入失敗: ",
  "加载支付方式失败: ": "載入支付方式失敗: ",
  "充值功能暂未开放，请联系管理员。": "增值功能暫未開放，請聯絡管理員。",
  账户充值: "帳戶增值",
  "充值比例：": "增值比例：",
  充值成功: "增值成功",
  再次充值: "再次增值",
  订单: "訂單",
  "已支付，金额": "已支付，金額",
  已入账: "已入賬",
  "，套餐赠送": "，套餐贈送",
  已同步到账: "已同步到賬",
  "。": "。",
  扫码付款: "掃碼付款",
  付款二维码: "付款二維碼",
  "生成二维码中...": "生成二維碼中...",
  支付成功后另赠: "支付成功後另贈",
  请使用: "請使用",
  扫码完成付款: "掃碼完成付款",
  "订单号：": "訂單號：",
  "支付完成后本页将自动跳转到结果页（每 3 秒检查一次）": "支付完成後本頁將自動跳轉到結果頁（每 3 秒檢查一次）",
  "支付完成后将自动刷新（每 3 秒检查一次）": "支付完成後將自動重新整理（每 3 秒檢查一次）",
  "扫码不便？": "掃碼不便？",
  "点此在新窗口打开付款页 →": "點此在新視窗開啟付款頁 →",
  取消: "取消",
  关闭: "關閉",
  订单已: "訂單已",
  订单已过期: "訂單已過期",
  订单已失败: "訂單已失敗",
  订单已取消: "訂單已取消",
  订单已退款: "訂單已退款",
  "该订单无法继续支付，请重新发起充值。": "該訂單無法繼續支付，請重新發起增值。",
  重新发起: "重新發起",
  选择套餐: "選擇套餐",
  选择金额: "選擇金額",
  送: "送",
  自定义金额: "自訂金額",
  "（不参与套餐赠送）": "（不參與套餐贈送）",
  选择支付方式: "選擇支付方式",
  "处理中...": "處理中...",
  立即支付: "立即支付",
  请选择支付方式: "請選擇支付方式",
  请输入有效金额: "請輸入有效金額",
  支付宝: "支付寶",
  微信支付: "微信支付",
  支付成功: "支付成功",
  暂无充值记录: "暫無增值記錄",
  订单号: "訂單號",
  金额: "金額",
  支付方式: "支付方式",
  状态: "狀態",
  创建时间: "建立時間",
  支付时间: "支付時間",
  操作: "操作",
  继续支付: "繼續支付",
  待支付: "待支付",
  已支付: "已支付",
  已过期: "已過期",
  失败: "失敗",
  已取消: "已取消",
  已退款: "已退款"
}, nr = {
  "加载中...": "Loading...",
  "加载失败: ": "Failed to load: ",
  "加载支付方式失败: ": "Failed to load payment methods: ",
  "充值功能暂未开放，请联系管理员。": "Top-up is not available yet. Please contact the administrator.",
  账户充值: "Top Up",
  "充值比例：": "Top-up rate: ",
  充值成功: "Top Up Successful",
  再次充值: "Top Up Again",
  订单: "Order",
  "已支付，金额": "has been paid; amount",
  已入账: "credited",
  "，套餐赠送": ", package bonus",
  已同步到账: "also credited",
  "。": ".",
  扫码付款: "Scan to Pay",
  付款二维码: "Payment QR code",
  "生成二维码中...": "Generating QR code...",
  支付成功后另赠: "Bonus after payment:",
  请使用: "Please use",
  扫码完成付款: "to scan and complete the payment",
  "订单号：": "Order No.: ",
  "支付完成后本页将自动跳转到结果页（每 3 秒检查一次）": "This page will redirect automatically once payment completes (checked every 3 seconds).",
  "支付完成后将自动刷新（每 3 秒检查一次）": "Refreshes automatically after payment (checked every 3 seconds).",
  "扫码不便？": "Can't scan the code?",
  "点此在新窗口打开付款页 →": "Open the payment page in a new window →",
  取消: "Cancel",
  关闭: "Close",
  订单已: "Order ",
  订单已过期: "Order Expired",
  订单已失败: "Order Failed",
  订单已取消: "Order Cancelled",
  订单已退款: "Order Refunded",
  "该订单无法继续支付，请重新发起充值。": "This order can no longer be paid. Please start a new top-up.",
  重新发起: "Try Again",
  选择套餐: "Select Package",
  选择金额: "Select Amount",
  送: "Bonus",
  自定义金额: "Custom amount",
  "（不参与套餐赠送）": " (no package bonus)",
  选择支付方式: "Select Payment Method",
  "处理中...": "Processing...",
  立即支付: "Pay Now",
  请选择支付方式: "Please select a payment method",
  请输入有效金额: "Please enter a valid amount",
  支付宝: "Alipay",
  微信支付: "WeChat Pay",
  支付成功: "Payment Successful",
  暂无充值记录: "No top-up records yet",
  订单号: "Order No.",
  金额: "Amount",
  支付方式: "Payment Method",
  状态: "Status",
  创建时间: "Created At",
  支付时间: "Paid At",
  操作: "Actions",
  继续支付: "Continue Payment",
  待支付: "Pending",
  已支付: "Paid",
  已过期: "Expired",
  失败: "Failed",
  已取消: "Cancelled",
  已退款: "Refunded"
}, rr = {
  "加载中...": "読み込み中...",
  "加载失败: ": "読み込みに失敗しました: ",
  "加载支付方式失败: ": "支払い方法の読み込みに失敗しました: ",
  "充值功能暂未开放，请联系管理员。": "チャージ機能は現在ご利用いただけません。管理者にお問い合わせください。",
  账户充值: "アカウントチャージ",
  "充值比例：": "チャージレート：",
  充值成功: "チャージ完了",
  再次充值: "もう一度チャージ",
  订单: "注文",
  "已支付，金额": "は支払済み、金額",
  已入账: "が入金されました",
  "，套餐赠送": "、パッケージ特典",
  已同步到账: "も入金されました",
  "。": "。",
  扫码付款: "QRコードで支払う",
  付款二维码: "支払い用QRコード",
  "生成二维码中...": "QRコードを生成中...",
  支付成功后另赠: "支払い後の特典:",
  请使用: "お支払いは",
  扫码完成付款: "でスキャンしてください",
  "订单号：": "注文番号：",
  "支付完成后本页将自动跳转到结果页（每 3 秒检查一次）": "支払い完了後、自動的に結果ページへ移動します（3秒ごとに確認）",
  "支付完成后将自动刷新（每 3 秒检查一次）": "支払い完了後、自動的に更新されます（3秒ごとに確認）",
  "扫码不便？": "スキャンできない場合は",
  "点此在新窗口打开付款页 →": "新しいウィンドウで支払いページを開く →",
  取消: "キャンセル",
  关闭: "閉じる",
  订单已: "注文は",
  订单已过期: "注文は期限切れです",
  订单已失败: "注文は失敗しました",
  订单已取消: "注文はキャンセルされました",
  订单已退款: "注文は返金されました",
  "该订单无法继续支付，请重新发起充值。": "この注文は支払いを続行できません。もう一度チャージしてください。",
  重新发起: "やり直す",
  选择套餐: "パッケージを選択",
  选择金额: "金額を選択",
  送: "特典",
  自定义金额: "カスタム金額",
  "（不参与套餐赠送）": "（パッケージ特典対象外）",
  选择支付方式: "支払い方法を選択",
  "处理中...": "処理中...",
  立即支付: "今すぐ支払う",
  请选择支付方式: "支払い方法を選択してください",
  请输入有效金额: "有効な金額を入力してください",
  支付宝: "Alipay",
  微信支付: "WeChat Pay",
  支付成功: "支払い完了",
  暂无充值记录: "チャージ履歴はありません",
  订单号: "注文番号",
  金额: "金額",
  支付方式: "支払い方法",
  状态: "ステータス",
  创建时间: "作成日時",
  支付时间: "支払日時",
  操作: "操作",
  继续支付: "支払いを続ける",
  待支付: "未払い",
  已支付: "支払済み",
  已过期: "期限切れ",
  失败: "失敗",
  已取消: "キャンセル済み",
  已退款: "返金済み"
}, or = {
  "zh-HK": tr,
  en: nr,
  ja: rr
};
function x(e) {
  const i = er();
  if (i === "zh") return e;
  const a = or[i];
  return a && a[e] || e;
}
function ir() {
  const [e, i] = z([]), [a, o] = z(!0), [r, n] = z(null), [s, d] = z(30), [c, u] = z(""), [f, h] = z(!1), [S, v] = z(null), [b, R] = z([]), [p, g] = z(null), I = se(!1), [w, k] = z(null), [L, B] = z(null), E = se(null);
  F(() => {
    $.methods().then((m) => {
      var C;
      i(m.methods || []), (C = m.methods) != null && C.length && u(m.methods[0].key);
    }).catch((m) => n(String((m == null ? void 0 : m.message) || m))).finally(() => o(!1)), $.packages().then((m) => {
      const C = m.list || [];
      R(C), C.length && !I.current && (g(C[0].id), d(C[0].amount));
    }).catch(() => R([]));
  }, []), F(() => {
    if (!w || w.status !== "pending") {
      E.current && (window.clearInterval(E.current), E.current = null);
      return;
    }
    const m = async () => {
      try {
        const C = await $.getOrder(w.out_trade_no);
        k(C);
      } catch {
      }
    };
    return E.current = window.setInterval(m, 3e3), () => {
      E.current && (window.clearInterval(E.current), E.current = null);
    };
  }, [w == null ? void 0 : w.out_trade_no, w == null ? void 0 : w.status]), F(() => {
    if (!w) {
      B(null);
      return;
    }
    const m = w.qr_code_content || w.payment_url;
    if (!m) {
      B(null);
      return;
    }
    let C = !1;
    return tn.toDataURL(m, { width: 240, margin: 2, errorCorrectionLevel: "M" }).then((_) => {
      C || B(_);
    }).catch(() => {
      C || B(null);
    }), () => {
      C = !0;
    };
  }, [w == null ? void 0 : w.payment_url, w == null ? void 0 : w.qr_code_content]);
  const P = async () => {
    if (v(null), !c) {
      v(x("请选择支付方式"));
      return;
    }
    if (!s || s <= 0) {
      v(x("请输入有效金额"));
      return;
    }
    h(!0);
    try {
      const m = await Qn(), C = await $.createOrder({
        amount: s,
        method: c,
        subject: m ? `${m} 余额充值` : "余额充值",
        ...p !== null ? { package_id: p } : {}
      });
      k(C);
    } catch (m) {
      v(String(m.message || m));
    } finally {
      h(!1);
    }
  }, T = () => {
    k(null), v(null);
  };
  return a ? /* @__PURE__ */ l("div", { style: G, children: /* @__PURE__ */ l("div", { style: Lt, children: x("加载中...") }) }) : r ? /* @__PURE__ */ l("div", { style: G, children: /* @__PURE__ */ y("div", { style: { ...Lt, color: t("danger") }, children: [
    x("加载支付方式失败: "),
    r
  ] }) }) : e.length === 0 ? /* @__PURE__ */ l("div", { style: G, children: /* @__PURE__ */ l("div", { style: he, children: /* @__PURE__ */ l("p", { style: { color: t("textSecondary"), margin: 0, textAlign: "center" }, children: x("充值功能暂未开放，请联系管理员。") }) }) }) : w ? w.status === "paid" ? /* @__PURE__ */ y("div", { style: G, children: [
    /* @__PURE__ */ l("h2", { style: ge, children: x("充值成功") }),
    /* @__PURE__ */ y("div", { style: he, children: [
      /* @__PURE__ */ y("p", { style: { margin: 0, color: t("text") }, children: [
        x("订单"),
        " ",
        /* @__PURE__ */ l("code", { style: He, children: w.out_trade_no }),
        " ",
        x("已支付，金额"),
        " ",
        /* @__PURE__ */ l("strong", { style: { color: t("success") }, children: N(w.amount) }),
        " ",
        x("已入账"),
        (w.bonus_amount ?? 0) > 0 && /* @__PURE__ */ y(le, { children: [
          x("，套餐赠送"),
          " ",
          /* @__PURE__ */ l("strong", { style: { color: t("success") }, children: N(w.bonus_amount) }),
          " ",
          x("已同步到账")
        ] }),
        x("。")
      ] }),
      /* @__PURE__ */ l("button", { style: { ...je, marginTop: 20 }, onClick: T, children: x("再次充值") })
    ] })
  ] }) : w.status === "pending" ? /* @__PURE__ */ y("div", { style: G, children: [
    /* @__PURE__ */ l("h2", { style: ge, children: x("扫码付款") }),
    /* @__PURE__ */ y("div", { style: yr, children: [
      L ? /* @__PURE__ */ l("img", { src: L, alt: x("付款二维码"), style: $t }) : /* @__PURE__ */ l("div", { style: { ...$t, display: "flex", alignItems: "center", justifyContent: "center", color: t("textTertiary") }, children: x("生成二维码中...") }),
      /* @__PURE__ */ l("div", { style: mr, children: N(w.amount) }),
      (w.bonus_amount ?? 0) > 0 && /* @__PURE__ */ y("div", { style: { color: t("success"), fontSize: 13, marginTop: 2 }, children: [
        x("支付成功后另赠"),
        " ",
        N(w.bonus_amount)
      ] }),
      /* @__PURE__ */ y("div", { style: { color: t("textSecondary"), fontSize: 13 }, children: [
        x("请使用"),
        " ",
        ar(w.method),
        " ",
        x("扫码完成付款")
      ] }),
      /* @__PURE__ */ y("div", { style: { marginTop: 8, color: t("textTertiary"), fontSize: 12 }, children: [
        x("订单号："),
        /* @__PURE__ */ l("code", { style: He, children: w.out_trade_no })
      ] }),
      /* @__PURE__ */ l("p", { style: { textAlign: "center", color: t("textTertiary"), fontSize: 13, marginTop: 20, marginBottom: 0 }, children: x("支付完成后本页将自动跳转到结果页（每 3 秒检查一次）") }),
      w.payment_url && /* @__PURE__ */ y("p", { style: { textAlign: "center", fontSize: 12, marginTop: 8, marginBottom: 0 }, children: [
        x("扫码不便？"),
        " ",
        /* @__PURE__ */ l("a", { href: w.payment_url, target: "_blank", rel: "noreferrer", style: { color: t("primary"), textDecoration: "none" }, children: x("点此在新窗口打开付款页 →") })
      ] }),
      /* @__PURE__ */ l("button", { style: { ...pr, marginTop: 20 }, onClick: T, children: x("取消") })
    ] })
  ] }) : /* @__PURE__ */ y("div", { style: G, children: [
    /* @__PURE__ */ l("h2", { style: ge, children: lr(w.status) }),
    /* @__PURE__ */ y("div", { style: he, children: [
      /* @__PURE__ */ y("p", { style: { margin: 0, color: t("textSecondary") }, children: [
        x("订单号："),
        /* @__PURE__ */ l("code", { style: He, children: w.out_trade_no })
      ] }),
      /* @__PURE__ */ l("button", { style: { ...je, marginTop: 20 }, onClick: T, children: x("重新发起") })
    ] })
  ] }) : /* @__PURE__ */ y("div", { style: G, children: [
    /* @__PURE__ */ l("h2", { style: ge, children: x("账户充值") }),
    /* @__PURE__ */ y("div", { style: he, children: [
      /* @__PURE__ */ y("p", { style: cr, children: [
        x("充值比例："),
        /* @__PURE__ */ l("strong", { style: { color: t("text") }, children: "1 CNY = $1" })
      ] }),
      /* @__PURE__ */ y("section", { children: [
        /* @__PURE__ */ l("h3", { style: Nt, children: b.length ? x("选择套餐") : x("选择金额") }),
        /* @__PURE__ */ l("div", { style: { display: "flex", flexWrap: "wrap", gap: 10 }, children: b.length ? b.map((m) => /* @__PURE__ */ y(
          "button",
          {
            type: "button",
            onClick: () => {
              I.current = !0, g(m.id), d(m.amount);
            },
            style: p === m.id ? ur : sn,
            title: m.title || void 0,
            children: [
              /* @__PURE__ */ l("span", { style: { fontSize: 16, fontWeight: 600 }, children: N(m.amount, { compact: !0 }) }),
              m.bonus_amount > 0 && /* @__PURE__ */ y("span", { style: p === m.id ? gr : cn, children: [
                x("送"),
                " ",
                N(m.bonus_amount, { compact: !0 })
              ] })
            ]
          },
          m.id
        )) : [10, 30, 50, 100, 200, 500].map((m) => /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            onClick: () => {
              I.current = !0, d(m);
            },
            style: s === m ? dr : nt,
            children: N(m, { compact: !0 })
          },
          m
        )) }),
        /* @__PURE__ */ y("div", { style: { marginTop: 16, display: "flex", alignItems: "center", gap: 8, color: t("textSecondary"), fontSize: 13 }, children: [
          /* @__PURE__ */ y("span", { children: [
            x("自定义金额"),
            b.length ? x("（不参与套餐赠送）") : ""
          ] }),
          /* @__PURE__ */ l(
            "input",
            {
              type: "number",
              min: 1,
              max: 1e4,
              step: 1,
              value: s,
              onChange: (m) => {
                I.current = !0, g(null), d(Number(m.target.value));
              },
              style: fr
            }
          ),
          /* @__PURE__ */ l("span", { children: "$" })
        ] })
      ] }),
      /* @__PURE__ */ y("section", { style: sr, children: [
        /* @__PURE__ */ l("h3", { style: Nt, children: x("选择支付方式") }),
        /* @__PURE__ */ l("div", { style: { display: "flex", gap: 12, flexWrap: "wrap" }, children: e.map((m) => /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            onClick: () => u(m.key),
            style: c === m.key ? hr : dn,
            title: m.description,
            children: x(m.label)
          },
          m.key
        )) })
      ] }),
      S && /* @__PURE__ */ l("p", { style: { color: t("danger"), marginTop: 16, fontSize: 13 }, children: S }),
      /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          onClick: P,
          disabled: f,
          style: { ...je, marginTop: 24, width: "100%", opacity: f ? 0.6 : 1 },
          children: x(f ? "处理中..." : "立即支付")
        }
      )
    ] })
  ] });
}
function ar(e) {
  switch (e) {
    case "alipay":
      return x("支付宝");
    case "wxpay":
      return x("微信支付");
    default:
      return e;
  }
}
function lr(e) {
  switch (e) {
    case "expired":
      return x("订单已过期");
    case "failed":
      return x("订单已失败");
    case "cancelled":
      return x("订单已取消");
    case "refunded":
      return x("订单已退款");
    default:
      return x("订单已") + e;
  }
}
const G = {
  maxWidth: 720,
  margin: "0 auto",
  padding: "24px 24px 48px",
  color: t("text")
}, ge = {
  margin: "0 0 20px",
  fontSize: 22,
  fontWeight: 600,
  color: t("text"),
  letterSpacing: "-0.01em"
}, Lt = {
  padding: "40px 0",
  textAlign: "center",
  color: t("textSecondary")
}, he = {
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusLg"),
  background: t("bgSurface"),
  padding: "24px"
}, sr = {
  marginTop: 28
}, cr = {
  margin: "0 0 20px",
  padding: "10px 12px",
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusMd"),
  background: t("bgElevated"),
  color: t("textSecondary"),
  fontSize: 13,
  lineHeight: 1.6
}, Nt = {
  margin: "0 0 12px",
  fontSize: 13,
  fontWeight: 600,
  color: t("textSecondary"),
  textTransform: "uppercase",
  letterSpacing: "0.04em"
}, nt = {
  minWidth: 88,
  padding: "12px 18px",
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusMd"),
  background: t("bg"),
  color: t("text"),
  cursor: "pointer",
  fontSize: 15,
  fontWeight: 500,
  transition: t("transition")
}, dr = {
  ...nt,
  borderColor: t("primary"),
  background: t("primarySubtle"),
  color: t("primary"),
  fontWeight: 600
}, sn = {
  ...nt,
  minWidth: 104,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 4
}, ur = {
  ...sn,
  borderColor: t("primary"),
  background: t("primarySubtle"),
  color: t("primary")
}, cn = {
  fontSize: 11,
  fontWeight: 600,
  padding: "1px 8px",
  borderRadius: 999,
  background: t("bgElevated"),
  color: t("success"),
  border: `1px solid ${t("glassBorder")}`
}, gr = {
  ...cn,
  background: t("primary"),
  color: t("textInverse"),
  border: "none"
}, dn = {
  minWidth: 140,
  padding: "16px 24px",
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusMd"),
  background: t("bgElevated"),
  color: t("text"),
  cursor: "pointer",
  fontSize: 14,
  fontWeight: 500,
  transition: t("transition")
}, hr = {
  ...dn,
  borderColor: t("primary"),
  background: t("primarySubtle"),
  color: t("primary"),
  fontWeight: 600
}, fr = {
  padding: "8px 12px",
  width: 140,
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusMd"),
  background: t("bgElevated"),
  color: t("text"),
  fontSize: 14,
  outline: "none"
}, je = {
  padding: "12px 28px",
  border: "none",
  borderRadius: t("radiusMd"),
  background: t("primary"),
  color: t("textInverse"),
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  transition: t("transition")
}, pr = {
  padding: "10px 24px",
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusMd"),
  background: t("bgElevated"),
  color: t("text"),
  fontSize: 13,
  fontWeight: 500,
  cursor: "pointer",
  transition: t("transition")
}, yr = {
  padding: "28px 24px",
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusLg"),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: t("bgSurface")
}, $t = {
  width: 240,
  height: 240,
  background: t("bgElevated"),
  padding: 8,
  borderRadius: t("radiusMd")
}, mr = {
  marginTop: 20,
  fontSize: 32,
  fontWeight: 700,
  color: t("text"),
  fontFamily: t("fontMono"),
  letterSpacing: "-0.02em"
}, He = {
  fontFamily: t("fontMono"),
  fontSize: "0.9em",
  padding: "1px 6px",
  borderRadius: 4,
  background: t("bg"),
  color: t("textSecondary")
};
function br() {
  const [e, i] = z([]), [a, o] = z(!0), [r, n] = z(null), [s, d] = z(null), [c, u] = z(null), f = se(null), h = () => {
    o(!0), $.listOrders(100).then((b) => i(b.list || [])).catch((b) => n(String((b == null ? void 0 : b.message) || b))).finally(() => o(!1));
  };
  F(h, []), F(() => {
    if (!s) {
      u(null);
      return;
    }
    const b = s.qr_code_content || s.payment_url;
    if (!b) {
      u(null);
      return;
    }
    let R = !1;
    return tn.toDataURL(b, { width: 240, margin: 2, errorCorrectionLevel: "M" }).then((p) => {
      R || u(p);
    }).catch(() => {
      R || u(null);
    }), () => {
      R = !0;
    };
  }, [s == null ? void 0 : s.payment_url, s == null ? void 0 : s.qr_code_content]), F(() => {
    if (!s || s.status !== "pending") {
      f.current && (window.clearInterval(f.current), f.current = null);
      return;
    }
    return f.current = window.setInterval(async () => {
      try {
        const b = await $.getOrder(s.out_trade_no);
        d(b), b.status !== "pending" && h();
      } catch {
      }
    }, 3e3), () => {
      f.current && (window.clearInterval(f.current), f.current = null);
    };
  }, [s == null ? void 0 : s.out_trade_no, s == null ? void 0 : s.status]);
  const S = (b) => {
    d(b);
  }, v = () => {
    d(null), u(null);
  };
  return a ? /* @__PURE__ */ l("div", { style: Ve, children: /* @__PURE__ */ l("div", { style: qt, children: x("加载中...") }) }) : r ? /* @__PURE__ */ l("div", { style: Ve, children: /* @__PURE__ */ y("div", { style: { ...qt, color: t("danger") }, children: [
    x("加载失败: "),
    r
  ] }) }) : /* @__PURE__ */ y("div", { style: Ve, children: [
    s && /* @__PURE__ */ l("div", { style: Cr, onClick: v, children: /* @__PURE__ */ l("div", { style: Tr, onClick: (b) => b.stopPropagation(), children: s.status === "paid" ? /* @__PURE__ */ y(le, { children: [
      /* @__PURE__ */ l("h3", { style: { margin: "0 0 12px", color: t("success") }, children: x("支付成功") }),
      /* @__PURE__ */ y("p", { style: { margin: 0, color: t("text"), fontSize: 14 }, children: [
        x("订单"),
        " ",
        /* @__PURE__ */ l("code", { style: Ke, children: s.out_trade_no }),
        " ",
        x("已支付"),
        " ",
        /* @__PURE__ */ l("strong", { children: N(s.amount) })
      ] }),
      /* @__PURE__ */ l("button", { style: { ...Wt, marginTop: 16 }, onClick: v, children: x("关闭") })
    ] }) : s.status === "pending" ? /* @__PURE__ */ y(le, { children: [
      /* @__PURE__ */ l("h3", { style: { margin: "0 0 12px", color: t("text") }, children: x("扫码付款") }),
      c ? /* @__PURE__ */ l("img", { src: c, alt: x("付款二维码"), style: { width: 240, height: 240, borderRadius: 8 } }) : /* @__PURE__ */ l("div", { style: { width: 240, height: 240, display: "flex", alignItems: "center", justifyContent: "center", color: t("textTertiary"), border: `1px solid ${t("glassBorder")}`, borderRadius: 8 }, children: x("生成二维码中...") }),
      /* @__PURE__ */ l("div", { style: { marginTop: 12, fontWeight: 600, fontSize: 20, color: t("text") }, children: N(s.amount) }),
      /* @__PURE__ */ y("div", { style: { color: t("textSecondary"), fontSize: 13, marginTop: 4 }, children: [
        x("请使用"),
        " ",
        Dt(s.method),
        " ",
        x("扫码完成付款")
      ] }),
      /* @__PURE__ */ y("div", { style: { marginTop: 6, color: t("textTertiary"), fontSize: 12 }, children: [
        x("订单号："),
        /* @__PURE__ */ l("code", { style: Ke, children: s.out_trade_no })
      ] }),
      /* @__PURE__ */ l("p", { style: { color: t("textTertiary"), fontSize: 12, marginTop: 12, marginBottom: 0 }, children: x("支付完成后将自动刷新（每 3 秒检查一次）") }),
      s.payment_url && /* @__PURE__ */ y("p", { style: { fontSize: 12, marginTop: 6, marginBottom: 0 }, children: [
        x("扫码不便？"),
        " ",
        /* @__PURE__ */ l("a", { href: s.payment_url, target: "_blank", rel: "noreferrer", style: { color: t("primary"), textDecoration: "none" }, children: x("点此在新窗口打开付款页 →") })
      ] }),
      /* @__PURE__ */ l("button", { style: { ...Br, marginTop: 16 }, onClick: v, children: x("取消") })
    ] }) : /* @__PURE__ */ y(le, { children: [
      /* @__PURE__ */ y("h3", { style: { margin: "0 0 12px", color: t("textSecondary") }, children: [
        x("订单已"),
        Ft(s.status)
      ] }),
      /* @__PURE__ */ l("p", { style: { margin: 0, color: t("textSecondary"), fontSize: 14 }, children: x("该订单无法继续支付，请重新发起充值。") }),
      /* @__PURE__ */ l("button", { style: { ...Wt, marginTop: 16 }, onClick: v, children: x("关闭") })
    ] }) }) }),
    /* @__PURE__ */ l("div", { style: xr, children: e.length === 0 ? /* @__PURE__ */ l("p", { style: wr, children: x("暂无充值记录") }) : /* @__PURE__ */ l("div", { style: vr, children: /* @__PURE__ */ y("table", { style: kr, children: [
      /* @__PURE__ */ l("thead", { children: /* @__PURE__ */ y("tr", { children: [
        /* @__PURE__ */ l("th", { style: J, children: x("订单号") }),
        /* @__PURE__ */ l("th", { style: J, children: x("金额") }),
        /* @__PURE__ */ l("th", { style: J, children: x("支付方式") }),
        /* @__PURE__ */ l("th", { style: J, children: x("状态") }),
        /* @__PURE__ */ l("th", { style: J, children: x("创建时间") }),
        /* @__PURE__ */ l("th", { style: J, children: x("支付时间") }),
        /* @__PURE__ */ l("th", { style: J, children: x("操作") })
      ] }) }),
      /* @__PURE__ */ l("tbody", { children: e.map((b) => /* @__PURE__ */ y("tr", { children: [
        /* @__PURE__ */ l("td", { style: Y, children: /* @__PURE__ */ l("code", { style: Ke, children: b.out_trade_no }) }),
        /* @__PURE__ */ l("td", { style: { ...Y, fontWeight: 600 }, children: N(b.amount) }),
        /* @__PURE__ */ l("td", { style: Y, children: Dt(b.method) }),
        /* @__PURE__ */ l("td", { style: { ...Y, color: Sr(b.status), fontWeight: 600 }, children: Ft(b.status) }),
        /* @__PURE__ */ l("td", { style: { ...Y, color: t("textSecondary") }, children: Ut(b.created_at) }),
        /* @__PURE__ */ l("td", { style: { ...Y, color: t("textSecondary") }, children: b.paid_at ? Ut(b.paid_at) : "-" }),
        /* @__PURE__ */ l("td", { style: Y, children: b.status === "pending" && (b.qr_code_content || b.payment_url) ? /* @__PURE__ */ l("button", { style: Er, onClick: () => S(b), children: x("继续支付") }) : null })
      ] }, b.id)) })
    ] }) }) })
  ] });
}
function Dt(e) {
  return { alipay: x("支付宝"), wxpay: x("微信支付") }[e] || e || "-";
}
function Ft(e) {
  return {
    pending: x("待支付"),
    paid: x("已支付"),
    expired: x("已过期"),
    failed: x("失败"),
    cancelled: x("已取消"),
    refunded: x("已退款")
  }[e] || e;
}
function Sr(e) {
  return {
    pending: t("warning"),
    paid: t("success"),
    expired: t("textTertiary"),
    failed: t("danger"),
    cancelled: t("textTertiary"),
    refunded: t("textTertiary")
  }[e] || "inherit";
}
function Ut(e) {
  try {
    return new Date(e).toLocaleString();
  } catch {
    return e;
  }
}
const Ve = {
  maxWidth: 960,
  margin: "0 auto",
  padding: "24px 24px 48px",
  color: t("text")
}, qt = {
  padding: "40px 0",
  textAlign: "center",
  color: t("textSecondary")
}, xr = {
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusLg"),
  background: t("bgElevated"),
  padding: "8px 0",
  overflow: "hidden"
}, wr = {
  color: t("textTertiary"),
  textAlign: "center",
  padding: "40px 0",
  fontSize: 14
}, vr = {
  overflowX: "auto"
}, kr = {
  width: "100%",
  borderCollapse: "collapse"
}, J = {
  textAlign: "left",
  padding: "10px 16px",
  borderBottom: `1px solid ${t("glassBorder")}`,
  background: t("bgSurface"),
  color: t("textSecondary"),
  fontWeight: 600,
  fontSize: 12,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  whiteSpace: "nowrap"
}, Y = {
  padding: "12px 16px",
  borderBottom: `1px solid ${t("glassBorder")}`,
  fontSize: 13,
  color: t("text"),
  whiteSpace: "nowrap"
}, Ke = {
  fontSize: 12,
  fontFamily: t("fontMono"),
  color: t("textSecondary")
}, Cr = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.45)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1e3
}, Tr = {
  background: t("bgElevated"),
  borderRadius: t("radiusLg"),
  padding: "32px",
  textAlign: "center",
  minWidth: 320,
  maxWidth: 400,
  boxShadow: "0 8px 32px rgba(0,0,0,0.2)"
}, Wt = {
  padding: "8px 24px",
  border: "none",
  borderRadius: t("radiusMd"),
  background: t("primary"),
  color: "#fff",
  fontSize: 14,
  cursor: "pointer"
}, Br = {
  padding: "8px 24px",
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusMd"),
  background: "transparent",
  color: t("textSecondary"),
  fontSize: 14,
  cursor: "pointer"
}, Er = {
  padding: "4px 12px",
  border: `1px solid ${t("primary")}`,
  borderRadius: t("radiusMd"),
  background: "transparent",
  color: t("primary"),
  fontSize: 12,
  cursor: "pointer",
  whiteSpace: "nowrap"
}, Ot = {
  total: 0,
  paid: 0,
  pending: 0,
  expired: 0,
  failed: 0,
  cancelled: 0,
  refunded: 0,
  total_amount_paid: 0,
  today_amount_paid: 0
}, Rr = [10, 20, 50, 100], Ir = [
  { value: "all", label: "全部状态" },
  { value: "pending", label: "待支付" },
  { value: "paid", label: "已支付" },
  { value: "expired", label: "已过期" },
  { value: "failed", label: "失败" },
  { value: "cancelled", label: "已取消" },
  { value: "refunded", label: "已退款" }
];
function Pr() {
  const [e, i] = z([]), [a, o] = z(0), [r, n] = z(Ot), [s, d] = z(!0), [c, u] = z(null), [f, h] = z("all"), [S, v] = z(""), [b, R] = z(1), [p, g] = z(20), I = ne(() => {
    d(!0), u(null), $.adminListOrders({ page: b, pageSize: p, email: S, status: f }).then((k) => {
      i(k.list || []), o(k.total || 0), n(k.stats || Ot);
    }).catch((k) => u(String((k == null ? void 0 : k.message) || k))).finally(() => d(!1));
  }, [b, p, S, f]);
  F(() => {
    const L = setTimeout(I, S ? 300 : 0);
    return () => clearTimeout(L);
  }, [I, S]), F(() => {
    R(1);
  }, [f, S, p]);
  const w = Math.max(1, Math.ceil(a / p));
  return /* @__PURE__ */ y("div", { style: $r, children: [
    /* @__PURE__ */ y("div", { style: Dr, children: [
      /* @__PURE__ */ l(te, { label: "总订单数", value: r.total }),
      /* @__PURE__ */ l(te, { label: "已支付", value: r.paid, accent: t("success") }),
      /* @__PURE__ */ l(te, { label: "待支付", value: r.pending, accent: t("warning") }),
      /* @__PURE__ */ l(te, { label: "已过期", value: r.expired }),
      /* @__PURE__ */ l(te, { label: "累计收款", value: N(r.total_amount_paid), accent: t("success") }),
      /* @__PURE__ */ l(te, { label: "今日收款", value: N(r.today_amount_paid), accent: t("success") })
    ] }),
    /* @__PURE__ */ y("div", { style: Wr, children: [
      /* @__PURE__ */ y("div", { style: Or, children: [
        /* @__PURE__ */ l(
          un,
          {
            value: f,
            onChange: h,
            options: Ir,
            style: jr
          }
        ),
        /* @__PURE__ */ l(
          "input",
          {
            type: "text",
            value: S,
            onChange: (k) => v(k.target.value),
            placeholder: "搜索用户邮箱",
            style: { ...Zr, width: 240 }
          }
        ),
        /* @__PURE__ */ l(zr, { onClick: I, loading: s })
      ] }),
      c ? /* @__PURE__ */ y("p", { style: { ...Ge, color: t("danger") }, children: [
        "加载失败: ",
        c
      ] }) : s && e.length === 0 ? /* @__PURE__ */ l("p", { style: Ge, children: "加载中..." }) : e.length === 0 ? /* @__PURE__ */ l("p", { style: Ge, children: "暂无订单" }) : /* @__PURE__ */ l("div", { style: eo, children: /* @__PURE__ */ y("table", { style: to, children: [
        /* @__PURE__ */ l("thead", { children: /* @__PURE__ */ y("tr", { children: [
          /* @__PURE__ */ l("th", { style: H, children: "订单号" }),
          /* @__PURE__ */ l("th", { style: H, children: "用户邮箱" }),
          /* @__PURE__ */ l("th", { style: H, children: "金额" }),
          /* @__PURE__ */ l("th", { style: H, children: "支付方式" }),
          /* @__PURE__ */ l("th", { style: H, children: "服务商" }),
          /* @__PURE__ */ l("th", { style: H, children: "状态" }),
          /* @__PURE__ */ l("th", { style: H, children: "创建时间" }),
          /* @__PURE__ */ l("th", { style: H, children: "支付时间" })
        ] }) }),
        /* @__PURE__ */ l("tbody", { children: e.map((k) => /* @__PURE__ */ y("tr", { children: [
          /* @__PURE__ */ l("td", { style: V, children: /* @__PURE__ */ l("code", { style: no, children: k.out_trade_no }) }),
          /* @__PURE__ */ l("td", { style: V, children: k.user_email ? /* @__PURE__ */ l("span", { style: { color: t("text") }, children: k.user_email }) : /* @__PURE__ */ y("span", { style: { color: t("textTertiary") }, children: [
            "#",
            k.user_id
          ] }) }),
          /* @__PURE__ */ l("td", { style: { ...V, fontWeight: 600 }, children: N(k.amount) }),
          /* @__PURE__ */ l("td", { style: V, children: _r(k.method) }),
          /* @__PURE__ */ l("td", { style: { ...V, color: t("textSecondary") }, children: k.provider_id || "-" }),
          /* @__PURE__ */ l("td", { style: { ...V, color: Ar(k.status), fontWeight: 600 }, children: Mr(k.status) }),
          /* @__PURE__ */ l("td", { style: { ...V, color: t("textSecondary") }, children: jt(k.created_at) }),
          /* @__PURE__ */ l("td", { style: { ...V, color: t("textSecondary") }, children: k.paid_at ? jt(k.paid_at) : "-" })
        ] }, k.id)) })
      ] }) }),
      /* @__PURE__ */ l(
        Lr,
        {
          page: b,
          pageSize: p,
          total: a,
          totalPages: w,
          onPageChange: R,
          onPageSizeChange: g
        }
      )
    ] })
  ] });
}
function te({ label: e, value: i, accent: a }) {
  return /* @__PURE__ */ y("div", { style: Fr, children: [
    /* @__PURE__ */ l("div", { style: Ur, children: e }),
    /* @__PURE__ */ l("div", { style: { ...qr, color: a || t("text") }, children: i })
  ] });
}
function _r(e) {
  return { alipay: "支付宝", wxpay: "微信支付" }[e] || e || "-";
}
function Mr(e) {
  return {
    pending: "待支付",
    paid: "已支付",
    expired: "已过期",
    failed: "失败",
    cancelled: "已取消",
    refunded: "已退款"
  }[e] || e;
}
function Ar(e) {
  return {
    pending: t("warning"),
    paid: t("success"),
    expired: t("textTertiary"),
    failed: t("danger"),
    cancelled: t("textTertiary"),
    refunded: t("textTertiary")
  }[e] || "inherit";
}
function jt(e) {
  try {
    return new Date(e).toLocaleString();
  } catch {
    return e;
  }
}
function zr({ onClick: e, loading: i }) {
  const [a, o] = z(!1);
  return /* @__PURE__ */ y(le, { children: [
    /* @__PURE__ */ l("style", { children: "@keyframes ag-epay-spin { to { transform: rotate(360deg); } }" }),
    /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        "aria-label": "刷新",
        onClick: e,
        disabled: i,
        onMouseEnter: () => o(!0),
        onMouseLeave: () => o(!1),
        style: {
          marginLeft: "auto",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 36,
          height: 36,
          border: `1px solid ${t("glassBorder")}`,
          borderRadius: 10,
          background: a ? t("bgHover") : "transparent",
          color: t(a ? "textSecondary" : "textTertiary"),
          cursor: i ? "not-allowed" : "pointer",
          opacity: i ? 0.6 : 1,
          transition: t("transition"),
          padding: 0
        },
        children: /* @__PURE__ */ y(
          "svg",
          {
            width: "16",
            height: "16",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            style: {
              animation: i ? "ag-epay-spin 1s linear infinite" : void 0
            },
            children: [
              /* @__PURE__ */ l("path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" }),
              /* @__PURE__ */ l("path", { d: "M21 3v5h-5" }),
              /* @__PURE__ */ l("path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" }),
              /* @__PURE__ */ l("path", { d: "M8 16H3v5" })
            ]
          }
        )
      }
    )
  ] });
}
function un({
  value: e,
  options: i,
  onChange: a,
  style: o
}) {
  const [r, n] = z(!1), s = se(null), d = i.find((c) => c.value === e);
  return F(() => {
    if (!r) return;
    const c = (u) => {
      s.current && !s.current.contains(u.target) && n(!1);
    };
    return document.addEventListener("mousedown", c), () => document.removeEventListener("mousedown", c);
  }, [r]), /* @__PURE__ */ y("div", { ref: s, style: Hr, children: [
    /* @__PURE__ */ y(
      "button",
      {
        type: "button",
        style: { ...o, ...Vr, ...r ? Kr : null },
        "aria-haspopup": "listbox",
        "aria-expanded": r,
        onClick: () => n((c) => !c),
        children: [
          /* @__PURE__ */ l("span", { style: Gr, children: (d == null ? void 0 : d.label) ?? "" }),
          /* @__PURE__ */ l("span", { "aria-hidden": "true", style: Jr, children: "v" })
        ]
      }
    ),
    r && /* @__PURE__ */ l("div", { role: "listbox", style: Yr, children: i.map((c) => {
      const u = c.value === e;
      return /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          role: "option",
          "aria-selected": u,
          style: { ...Qr, ...u ? Xr : null },
          onClick: () => {
            a(c.value), n(!1);
          },
          children: c.label
        },
        c.value
      );
    }) })
  ] });
}
function Lr({ page: e, pageSize: i, total: a, totalPages: o, onPageChange: r, onPageSizeChange: n }) {
  const s = Nr(e, o);
  return /* @__PURE__ */ y("div", { style: ro, children: [
    /* @__PURE__ */ y("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
      /* @__PURE__ */ y("span", { style: oo, children: [
        "共 ",
        a,
        " 条 · 第 ",
        e,
        "/",
        o,
        " 页"
      ] }),
      /* @__PURE__ */ l(
        un,
        {
          value: String(i),
          onChange: (d) => n(Number(d)),
          options: Rr.map((d) => ({ value: String(d), label: `${d} 条/页` })),
          style: io
        }
      )
    ] }),
    /* @__PURE__ */ y("div", { style: { display: "flex", alignItems: "center", gap: 4 }, children: [
      /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          "aria-label": "上一页",
          style: Ht(e <= 1),
          disabled: e <= 1,
          onClick: () => r(e - 1),
          children: "‹"
        }
      ),
      s.map(
        (d, c) => d === "..." ? /* @__PURE__ */ l("span", { style: lo, children: "···" }, `e-${c}`) : /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            style: d === e ? ao : gn,
            onClick: () => r(d),
            children: d
          },
          d
        )
      ),
      /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          "aria-label": "下一页",
          style: Ht(e >= o),
          disabled: e >= o,
          onClick: () => r(e + 1),
          children: "›"
        }
      )
    ] })
  ] });
}
function Nr(e, i) {
  if (i <= 7) return Array.from({ length: i }, (o, r) => r + 1);
  const a = [1];
  e > 3 && a.push("...");
  for (let o = Math.max(2, e - 1); o <= Math.min(i - 1, e + 1); o++)
    a.push(o);
  return e < i - 2 && a.push("..."), a.push(i), a;
}
const $r = {
  maxWidth: 1280,
  margin: "0 auto",
  padding: "24px 24px 48px",
  color: t("text")
}, Dr = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  gap: 12,
  marginBottom: 20
}, Fr = {
  padding: "18px 20px",
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusLg"),
  background: t("bgSurface")
}, Ur = {
  fontSize: 12,
  color: t("textSecondary"),
  fontWeight: 500,
  letterSpacing: "0.02em"
}, qr = {
  fontSize: 26,
  fontWeight: 700,
  marginTop: 8,
  letterSpacing: "-0.02em"
}, Wr = {
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusLg"),
  background: t("bgSurface"),
  padding: "20px 20px 8px"
}, Or = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  marginBottom: 16,
  flexWrap: "wrap"
}, jr = {
  padding: "8px 12px",
  minWidth: 140,
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusMd"),
  background: t("bgElevated"),
  color: t("text"),
  fontSize: 13
}, Hr = {
  position: "relative",
  display: "inline-block"
}, Vr = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 8,
  width: "100%",
  fontFamily: "inherit",
  cursor: "pointer",
  outline: "none"
}, Kr = {
  borderColor: t("primary"),
  boxShadow: `0 0 0 3px ${t("primarySubtle")}`
}, Gr = {
  minWidth: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
}, Jr = {
  flexShrink: 0,
  color: t("textTertiary"),
  fontSize: 10,
  lineHeight: 1
}, Yr = {
  position: "absolute",
  left: 0,
  top: "calc(100% + 6px)",
  zIndex: 20,
  display: "flex",
  flexDirection: "column",
  minWidth: "100%",
  width: "max-content",
  maxHeight: 260,
  padding: 6,
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusMd"),
  background: t("bgSurface"),
  boxShadow: "0 18px 48px rgba(0, 0, 0, 0.28)",
  overflowY: "auto"
}, Qr = {
  display: "block",
  width: "100%",
  padding: "8px 10px",
  border: "none",
  borderRadius: 8,
  background: "transparent",
  color: t("textSecondary"),
  fontFamily: "inherit",
  fontSize: 13,
  lineHeight: 1.35,
  textAlign: "left",
  whiteSpace: "nowrap",
  cursor: "pointer"
}, Xr = {
  background: t("primarySubtle"),
  color: t("primary"),
  fontWeight: 600
}, Zr = {
  padding: "8px 12px",
  width: 200,
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusMd"),
  background: t("bgElevated"),
  color: t("text"),
  fontSize: 13,
  outline: "none"
}, Ge = {
  color: t("textTertiary"),
  textAlign: "center",
  padding: "40px 0",
  fontSize: 14
}, eo = {
  overflowX: "auto",
  margin: "0 -20px"
}, to = {
  width: "100%",
  borderCollapse: "collapse"
}, H = {
  textAlign: "left",
  padding: "10px 16px",
  borderTop: `1px solid ${t("glassBorder")}`,
  borderBottom: `1px solid ${t("glassBorder")}`,
  background: t("bgSurface"),
  color: t("textSecondary"),
  fontWeight: 600,
  fontSize: 12,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  whiteSpace: "nowrap"
}, V = {
  padding: "12px 16px",
  borderBottom: `1px solid ${t("glassBorder")}`,
  fontSize: 13,
  color: t("text"),
  whiteSpace: "nowrap"
}, no = {
  fontSize: 12,
  fontFamily: t("fontMono"),
  color: t("textSecondary")
}, ro = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "14px 4px 6px",
  flexWrap: "wrap",
  gap: 12
}, oo = {
  fontSize: 12,
  color: t("textTertiary"),
  fontFamily: t("fontMono")
}, io = {
  fontSize: 12,
  color: t("textSecondary"),
  background: "transparent",
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: 6,
  padding: "2px 8px",
  cursor: "pointer",
  outline: "none"
}, gn = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 32,
  height: 32,
  borderRadius: 6,
  border: "none",
  background: "transparent",
  color: t("textSecondary"),
  fontSize: 12,
  fontWeight: 500,
  cursor: "pointer",
  transition: t("transition")
}, ao = {
  ...gn,
  background: t("primary"),
  color: t("textInverse"),
  fontWeight: 600
};
function Ht(e) {
  return {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    borderRadius: 6,
    border: "none",
    background: "transparent",
    color: t("textSecondary"),
    fontSize: 18,
    lineHeight: 1,
    cursor: e ? "not-allowed" : "pointer",
    opacity: e ? 0.3 : 1,
    transition: t("transition")
  };
}
const lo = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 28,
  color: t("textTertiary"),
  fontSize: 12
};
let so = 0;
function hn() {
  const [e, i] = z([]), a = se(i);
  a.current = i;
  const o = ne((d) => {
    a.current((c) => c.filter((u) => u.id !== d));
  }, []), r = ne((d, c) => {
    const u = so++;
    a.current((f) => [...f, { id: u, type: d, text: c }]), setTimeout(() => o(u), 4e3);
  }, [o]), n = ne((d) => r("success", d), [r]), s = ne((d) => r("error", d), [r]);
  return {
    toast: { success: n, error: s },
    Toaster: /* @__PURE__ */ l(co, { messages: e, onClose: o })
  };
}
function co({
  messages: e,
  onClose: i
}) {
  return F(() => {
    const a = "airgate-epay-toast-keyframes";
    if (document.getElementById(a)) return;
    const o = document.createElement("style");
    o.id = a, o.textContent = `
@keyframes airgate-epay-toast-in {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}`, document.head.appendChild(o);
  }, []), e.length === 0 ? null : /* @__PURE__ */ l("div", { style: go, children: e.map((a) => /* @__PURE__ */ l(uo, { message: a, onClose: () => i(a.id) }, a.id)) });
}
function uo({
  message: e,
  onClose: i
}) {
  const a = e.type === "success", o = t(a ? "success" : "danger"), r = t(a ? "success" : "danger");
  return /* @__PURE__ */ y(
    "div",
    {
      style: {
        ...ho,
        borderColor: r
      },
      children: [
        /* @__PURE__ */ l("span", { style: { ...fo, color: o }, children: a ? "✓" : "✕" }),
        /* @__PURE__ */ l("span", { style: { ...po, color: t("text") }, children: e.text }),
        /* @__PURE__ */ l("button", { onClick: i, style: yo, "aria-label": x("关闭"), children: "×" })
      ]
    }
  );
}
const go = {
  position: "fixed",
  top: 20,
  right: 20,
  zIndex: 1e4,
  display: "flex",
  flexDirection: "column",
  gap: 10,
  pointerEvents: "none"
}, ho = {
  pointerEvents: "auto",
  display: "flex",
  alignItems: "center",
  gap: 12,
  minWidth: 260,
  maxWidth: 400,
  padding: "12px 14px",
  borderRadius: t("radiusLg"),
  border: "1px solid",
  background: t("bgElevated"),
  boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
  animation: "airgate-epay-toast-in 0.25s cubic-bezier(0.16, 1, 0.3, 1)"
}, fo = {
  fontSize: 16,
  fontWeight: 700,
  width: 18,
  textAlign: "center",
  flexShrink: 0
}, po = {
  flex: 1,
  fontSize: 13,
  lineHeight: 1.4
}, yo = {
  flexShrink: 0,
  background: "transparent",
  border: "none",
  color: t("textTertiary"),
  fontSize: 18,
  lineHeight: 1,
  cursor: "pointer",
  padding: 0,
  width: 18,
  height: 18
};
function fn(e, i) {
  var o;
  const a = window;
  return (o = a.airgate) != null && o.confirm ? a.airgate.confirm(e, i) : Promise.resolve(window.confirm(e));
}
function mo() {
  const [e, i] = z([]), [a, o] = z([]), [r, n] = z(!0), [s, d] = z(null), [c, u] = z(null), { toast: f, Toaster: h } = hn(), S = ne(() => {
    n(!0), d(null), $.adminListProviders().then((g) => {
      i(g.providers || []), o(g.kinds || []);
    }).catch((g) => d(String((g == null ? void 0 : g.message) || g))).finally(() => n(!1));
  }, []);
  F(S, [S]);
  const v = (g) => {
    u({
      mode: "create",
      id: "",
      kind: g.kind,
      enabled: !0,
      config: xo(g)
    });
  }, b = (g) => {
    u({
      mode: "edit",
      id: g.id,
      originalId: g.id,
      kind: g.kind,
      enabled: g.enabled,
      config: { ...g.config }
    });
  }, R = async (g) => {
    if (await fn(`确认删除服务商 ${g}？此操作无法撤销。`, { title: "删除服务商", danger: !0 }))
      try {
        await $.adminDeleteProvider(g), f.success(`已删除 ${g}`), S();
      } catch (I) {
        f.error("删除失败: " + I.message);
      }
  }, p = async (g) => {
    try {
      await $.adminUpsertProvider({
        id: g.id,
        kind: g.kind,
        enabled: !g.enabled,
        config: g.config
      }), f.success(`${g.id} 已${g.enabled ? "禁用" : "启用"}`), S();
    } catch (I) {
      f.error("操作失败: " + I.message);
    }
  };
  return r ? /* @__PURE__ */ l("div", { style: Ye, children: /* @__PURE__ */ l("div", { style: Vt, children: "加载中..." }) }) : s ? /* @__PURE__ */ l("div", { style: Ye, children: /* @__PURE__ */ y("div", { style: { ...Vt, color: t("danger") }, children: [
    "加载失败: ",
    s
  ] }) }) : /* @__PURE__ */ y("div", { style: Ye, children: [
    h,
    /* @__PURE__ */ y("div", { style: Gt, children: [
      /* @__PURE__ */ l("h3", { style: Kt, children: "添加服务商" }),
      /* @__PURE__ */ l("p", { style: wo, children: "每种类型的服务商可以创建多个实例（例如 xunhu_main / xunhu_backup），便于多商户号或主备切换。" }),
      /* @__PURE__ */ l("div", { style: vo, children: a.map((g) => /* @__PURE__ */ y("div", { style: ko, children: [
        /* @__PURE__ */ l("div", { style: { fontWeight: 600, color: t("text"), fontSize: 15 }, children: g.name }),
        /* @__PURE__ */ l("div", { style: { fontSize: 12, color: t("textSecondary"), marginTop: 6 }, children: g.description }),
        /* @__PURE__ */ y("div", { style: { fontSize: 12, color: t("textTertiary"), marginTop: 8 }, children: [
          "支持: ",
          g.supported_methods.map(Ze).join(" / ")
        ] }),
        /* @__PURE__ */ l("button", { style: { ...yn, marginTop: 12, width: "100%" }, onClick: () => v(g), children: "+ 添加" })
      ] }, g.kind)) })
    ] }),
    /* @__PURE__ */ y("div", { style: Gt, children: [
      /* @__PURE__ */ l("h3", { style: Kt, children: "已配置的服务商实例" }),
      e.length === 0 ? /* @__PURE__ */ l("p", { style: Bo, children: "暂未配置任何服务商。请在上方点「+ 添加」选择类型。" }) : /* @__PURE__ */ l("div", { style: Co, children: e.map((g) => /* @__PURE__ */ y("div", { style: To, children: [
        /* @__PURE__ */ y("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" }, children: [
          /* @__PURE__ */ y("div", { children: [
            /* @__PURE__ */ l("div", { style: { fontWeight: 600, color: t("text"), fontSize: 15 }, children: g.name || g.id }),
            /* @__PURE__ */ y("div", { style: { fontSize: 12, color: t("textTertiary"), marginTop: 4, fontFamily: t("fontMono") }, children: [
              g.id,
              " · ",
              g.kind
            ] })
          ] }),
          /* @__PURE__ */ l("span", { style: g.is_running ? pn : Eo, children: g.is_running ? "运行中" : g.enabled ? "已启用未就绪" : "已禁用" })
        ] }),
        /* @__PURE__ */ y("div", { style: { fontSize: 12, color: t("textSecondary"), marginTop: 12 }, children: [
          "支持: ",
          g.supported_methods.map(Ze).join(" / ")
        ] }),
        /* @__PURE__ */ y("div", { style: { display: "flex", gap: 8, marginTop: 16 }, children: [
          /* @__PURE__ */ l("button", { style: pe, onClick: () => b(g), children: "编辑" }),
          /* @__PURE__ */ l("button", { style: pe, onClick: () => p(g), children: g.enabled ? "禁用" : "启用" }),
          /* @__PURE__ */ l("button", { style: { ...pe, color: t("danger") }, onClick: () => R(g.id), children: "删除" })
        ] })
      ] }, g.id)) })
    ] }),
    c && /* @__PURE__ */ l(
      bo,
      {
        editing: c,
        kinds: a,
        onCancel: () => u(null),
        onSaved: (g) => {
          u(null), f.success(g), S();
        },
        onError: (g) => f.error(g)
      }
    )
  ] });
}
function bo({
  editing: e,
  kinds: i,
  onCancel: a,
  onSaved: o,
  onError: r
}) {
  const [n, s] = z(e), [d, c] = z(!1), u = xn(() => i.find((h) => h.kind === n.kind), [i, n.kind]), f = async () => {
    if (!u) {
      r("未知的服务商类型");
      return;
    }
    for (const h of u.field_descriptors)
      if (h.required && !n.config[h.key]) {
        r(`「${h.label}」必填`);
        return;
      }
    if (!(n.mode === "edit" && n.originalId && n.id.trim() !== n.originalId && !await fn(
      `确认将实例 ID 从「${n.originalId}」重命名为「${n.id.trim()}」？

所有历史订单的 provider_id 引用会在事务里同步更新；如果该商户号在第三方支付平台已经下过单，
已发出去的回调地址（含原 ID）会失效——平台未来回调请求会路由不到本服务。`,
      { title: "重命名服务商 ID", danger: !0 }
    ))) {
      c(!0);
      try {
        const S = (await $.adminUpsertProvider({
          id: n.id.trim(),
          original_id: n.originalId,
          kind: n.kind,
          enabled: n.enabled,
          config: n.config
        })).id || n.id.trim();
        o(n.mode === "create" ? `已创建 ${S}` : `已更新 ${S}`);
      } catch (h) {
        r("保存失败: " + h.message);
      } finally {
        c(!1);
      }
    }
  };
  return /* @__PURE__ */ l("div", { style: Po, onClick: a, children: /* @__PURE__ */ y("div", { style: _o, onClick: (h) => h.stopPropagation(), children: [
    /* @__PURE__ */ y("div", { style: Mo, children: [
      /* @__PURE__ */ y("h3", { style: { margin: 0, fontSize: 16, fontWeight: 600 }, children: [
        n.mode === "create" ? "添加" : "编辑",
        "服务商 - ",
        (u == null ? void 0 : u.name) || n.kind
      ] }),
      /* @__PURE__ */ l("button", { style: Ao, onClick: a, children: "×" })
    ] }),
    /* @__PURE__ */ y("div", { style: zo, children: [
      /* @__PURE__ */ l(
        Je,
        {
          label: "实例 ID",
          description: n.mode === "edit" ? "可修改。改名时后端会在事务里同步更新所有历史订单的 provider_id 引用，回调路径也会立即指向新名字。" : "可选。留空则自动生成 epay_xunhu_1 之类的序号；也可以填一个有意义的名字如 xunhu_main / xunhu_backup 便于多商户号区分。",
          children: /* @__PURE__ */ l(
            "input",
            {
              type: "text",
              value: n.id,
              onChange: (h) => s({ ...n, id: h.target.value }),
              placeholder: n.mode === "create" ? "留空自动生成" : "",
              style: { ...Qe, fontFamily: t("fontMono"), fontSize: 12 }
            }
          )
        }
      ),
      /* @__PURE__ */ l(Je, { label: "启用", children: /* @__PURE__ */ y("label", { style: { display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }, children: [
        /* @__PURE__ */ l(
          "input",
          {
            type: "checkbox",
            checked: n.enabled,
            onChange: (h) => s({ ...n, enabled: h.target.checked })
          }
        ),
        /* @__PURE__ */ l("span", { style: { fontSize: 13, color: t("textSecondary") }, children: "勾选后该服务商参与支付路由" })
      ] }) }),
      u == null ? void 0 : u.field_descriptors.map((h) => /* @__PURE__ */ l(Je, { label: h.label, description: h.description, required: h.required, children: h.type === "textarea" ? /* @__PURE__ */ l(
        "textarea",
        {
          value: n.config[h.key] || "",
          onChange: (S) => s({ ...n, config: { ...n.config, [h.key]: S.target.value } }),
          placeholder: h.placeholder,
          style: { ...Qe, minHeight: 120, fontFamily: t("fontMono"), fontSize: 12 }
        }
      ) : h.type === "bool" ? /* @__PURE__ */ l("label", { style: { display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }, children: /* @__PURE__ */ l(
        "input",
        {
          type: "checkbox",
          checked: n.config[h.key] === "true",
          onChange: (S) => s({ ...n, config: { ...n.config, [h.key]: S.target.checked ? "true" : "false" } })
        }
      ) }) : h.type === "method-multi" ? /* @__PURE__ */ l(
        So,
        {
          candidates: u.supported_methods,
          value: n.config[h.key] || "",
          onChange: (S) => s({ ...n, config: { ...n.config, [h.key]: S } })
        }
      ) : /* @__PURE__ */ l(
        "input",
        {
          type: h.type === "password" ? "password" : h.type === "number" ? "number" : "text",
          value: n.config[h.key] || "",
          onChange: (S) => s({ ...n, config: { ...n.config, [h.key]: S.target.value } }),
          placeholder: h.placeholder,
          style: Qe
        }
      ) }, h.key))
    ] }),
    /* @__PURE__ */ y("div", { style: Lo, children: [
      /* @__PURE__ */ l("button", { style: pe, onClick: a, disabled: d, children: "取消" }),
      /* @__PURE__ */ l("button", { style: yn, onClick: f, disabled: d, children: d ? "保存中..." : "保存" })
    ] })
  ] }) });
}
function So({
  candidates: e,
  value: i,
  onChange: a
}) {
  const o = new Set(i.split(",").map((n) => n.trim()).filter(Boolean)), r = (n) => {
    o.has(n) ? o.delete(n) : o.add(n);
    const s = e.filter((d) => o.has(d)).join(",");
    a(s);
  };
  return /* @__PURE__ */ y("div", { style: { display: "flex", flexWrap: "wrap", gap: 12 }, children: [
    e.map((n) => {
      const s = o.has(n);
      return /* @__PURE__ */ y(
        "label",
        {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 14px",
            border: `1px solid ${t(s ? "primary" : "glassBorder")}`,
            borderRadius: t("radiusMd"),
            background: t(s ? "primarySubtle" : "bg"),
            color: t(s ? "primary" : "text"),
            cursor: "pointer",
            fontSize: 13,
            fontWeight: s ? 600 : 400,
            transition: "all 0.15s"
          },
          children: [
            /* @__PURE__ */ l(
              "input",
              {
                type: "checkbox",
                checked: s,
                onChange: () => r(n),
                style: { margin: 0 }
              }
            ),
            Ze(n)
          ]
        },
        n
      );
    }),
    e.length === 0 && /* @__PURE__ */ l("span", { style: { fontSize: 12, color: t("textTertiary") }, children: "该协议没有可选的支付方式" })
  ] });
}
function Je({
  label: e,
  description: i,
  required: a,
  children: o
}) {
  return /* @__PURE__ */ y("div", { style: { marginBottom: 16 }, children: [
    /* @__PURE__ */ y("label", { style: Ro, children: [
      e,
      a && /* @__PURE__ */ l("span", { style: { color: t("danger"), marginLeft: 4 }, children: "*" })
    ] }),
    o,
    i && /* @__PURE__ */ l("div", { style: Io, children: i })
  ] });
}
function Ze(e) {
  return { alipay: "支付宝", wxpay: "微信支付" }[e] || e;
}
function xo(e) {
  const i = {};
  for (const a of e.field_descriptors)
    a.type === "bool" ? i[a.key] = "false" : i[a.key] = "";
  return i;
}
const Ye = {
  maxWidth: 1280,
  margin: "0 auto",
  padding: "24px 24px 48px",
  color: t("text")
}, Vt = {
  padding: "40px 0",
  textAlign: "center",
  color: t("textSecondary")
}, wo = {
  margin: "4px 0 16px",
  fontSize: 13,
  color: t("textSecondary")
}, Kt = {
  margin: "0 0 12px",
  fontSize: 14,
  fontWeight: 600,
  color: t("text"),
  textTransform: "uppercase",
  letterSpacing: "0.04em"
}, Gt = {
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusLg"),
  background: t("bgSurface"),
  padding: 20,
  marginBottom: 20
}, vo = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
  gap: 12
}, ko = {
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusMd"),
  padding: 16,
  background: t("bgElevated")
}, Co = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
  gap: 12
}, To = {
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusMd"),
  padding: 16,
  background: t("bgElevated")
}, Bo = {
  color: t("textTertiary"),
  textAlign: "center",
  padding: "24px 0",
  fontSize: 14
}, pn = {
  padding: "2px 8px",
  borderRadius: 4,
  background: t("successSubtle"),
  color: t("success"),
  fontSize: 11,
  fontWeight: 600
}, Eo = {
  ...pn,
  background: t("warningSubtle"),
  color: t("warning")
}, pe = {
  padding: "6px 14px",
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusMd"),
  background: "transparent",
  color: t("text"),
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 500
}, yn = {
  padding: "8px 16px",
  border: "none",
  borderRadius: t("radiusMd"),
  background: t("primary"),
  color: t("textInverse"),
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 600
}, Qe = {
  width: "100%",
  padding: "8px 12px",
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusMd"),
  background: t("bgElevated"),
  color: t("text"),
  fontSize: 13,
  boxSizing: "border-box"
}, Ro = {
  display: "block",
  fontSize: 12,
  fontWeight: 600,
  color: t("textSecondary"),
  marginBottom: 6,
  textTransform: "uppercase",
  letterSpacing: "0.03em"
}, Io = {
  marginTop: 6,
  fontSize: 11,
  color: t("textTertiary")
}, Po = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1e3
}, _o = {
  width: 600,
  maxWidth: "92vw",
  maxHeight: "90vh",
  display: "flex",
  flexDirection: "column",
  background: t("bgSurface"),
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusLg"),
  overflow: "hidden"
}, Mo = {
  padding: "16px 20px",
  borderBottom: `1px solid ${t("glassBorder")}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
}, Ao = {
  background: "transparent",
  border: "none",
  color: t("textSecondary"),
  fontSize: 24,
  cursor: "pointer",
  lineHeight: 1
}, zo = {
  padding: 20,
  overflowY: "auto",
  flex: 1
}, Lo = {
  padding: "12px 20px",
  borderTop: `1px solid ${t("glassBorder")}`,
  display: "flex",
  justifyContent: "flex-end",
  gap: 8
};
function No() {
  const { toast: e, Toaster: i } = hn(), [a, o] = z([]), [r, n] = z(!0), [s, d] = z(!1), [c, u] = z(null), f = () => {
    n(!0), $.adminListPackages().then((p) => o(p.list || [])).catch((p) => e.error(`加载套餐失败: ${String(p.message || p)}`)).finally(() => n(!1));
  };
  F(f, []);
  const h = () => u({ id: 0, amount: "100", bonus: "15", title: "", sort: String(a.length * 10), enabled: !0 }), S = (p) => u({
    id: p.id,
    amount: String(p.amount),
    bonus: String(p.bonus_amount),
    title: p.title,
    sort: String(p.sort_order),
    enabled: p.enabled
  }), v = async () => {
    if (!c) return;
    const p = Number(c.amount), g = Number(c.bonus);
    if (!p || p <= 0) {
      e.error("套餐金额必须大于 0");
      return;
    }
    if (g < 0 || Number.isNaN(g)) {
      e.error("赠送额度不能为负数");
      return;
    }
    d(!0);
    try {
      await $.adminUpsertPackage({
        id: c.id,
        amount: p,
        bonus_amount: g,
        title: c.title.trim(),
        enabled: c.enabled,
        sort_order: Number(c.sort) || 0
      }), e.success(c.id ? "套餐已更新" : "套餐已创建"), u(null), f();
    } catch (I) {
      e.error(String(I.message || I));
    } finally {
      d(!1);
    }
  }, b = async (p) => {
    try {
      await $.adminUpsertPackage({
        id: p.id,
        amount: p.amount,
        bonus_amount: p.bonus_amount,
        title: p.title,
        enabled: !p.enabled,
        sort_order: p.sort_order
      }), e.success(p.enabled ? "套餐已停用" : "套餐已启用"), f();
    } catch (g) {
      e.error(String(g.message || g));
    }
  }, R = async (p) => {
    if (window.confirm(`确认删除套餐「充 ${p.amount} 送 ${p.bonus_amount}」？历史订单的赠送不受影响。`))
      try {
        await $.adminDeletePackage(p.id), e.success("套餐已删除"), f();
      } catch (g) {
        e.error(String(g.message || g));
      }
  };
  return /* @__PURE__ */ y("div", { style: $o, children: [
    i,
    /* @__PURE__ */ y("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }, children: [
      /* @__PURE__ */ y("div", { children: [
        /* @__PURE__ */ l("h2", { style: Do, children: "充值套餐" }),
        /* @__PURE__ */ l("p", { style: { margin: "4px 0 0", color: t("textSecondary"), fontSize: 13 }, children: "用户点选套餐档才享赠送；自定义金额充值不参与。赠送在支付成功后以独立流水入账。" })
      ] }),
      /* @__PURE__ */ l("button", { style: Yt, onClick: h, children: "新增套餐" })
    ] }),
    c && /* @__PURE__ */ y("div", { style: { ...Jt, marginBottom: 20 }, children: [
      /* @__PURE__ */ l("h3", { style: Fo, children: c.id ? `编辑套餐 #${c.id}` : "新增套餐" }),
      /* @__PURE__ */ y("div", { style: { display: "flex", flexWrap: "wrap", gap: 16, alignItems: "flex-end" }, children: [
        /* @__PURE__ */ y("label", { style: ie, children: [
          /* @__PURE__ */ l("span", { style: ae, children: "充值金额（$）" }),
          /* @__PURE__ */ l("input", { type: "number", min: 1, value: c.amount, onChange: (p) => u({ ...c, amount: p.target.value }), style: fe })
        ] }),
        /* @__PURE__ */ y("label", { style: ie, children: [
          /* @__PURE__ */ l("span", { style: ae, children: "赠送额度（$）" }),
          /* @__PURE__ */ l("input", { type: "number", min: 0, value: c.bonus, onChange: (p) => u({ ...c, bonus: p.target.value }), style: fe })
        ] }),
        /* @__PURE__ */ y("label", { style: ie, children: [
          /* @__PURE__ */ l("span", { style: ae, children: "标题（可选，按钮悬浮提示）" }),
          /* @__PURE__ */ l("input", { type: "text", maxLength: 64, value: c.title, placeholder: "如：限时特惠", onChange: (p) => u({ ...c, title: p.target.value }), style: { ...fe, width: 200 } })
        ] }),
        /* @__PURE__ */ y("label", { style: ie, children: [
          /* @__PURE__ */ l("span", { style: ae, children: "排序（小在前）" }),
          /* @__PURE__ */ l("input", { type: "number", value: c.sort, onChange: (p) => u({ ...c, sort: p.target.value }), style: { ...fe, width: 90 } })
        ] }),
        /* @__PURE__ */ y("label", { style: { ...ie, flexDirection: "row", alignItems: "center", gap: 8 }, children: [
          /* @__PURE__ */ l("input", { type: "checkbox", checked: c.enabled, onChange: (p) => u({ ...c, enabled: p.target.checked }) }),
          /* @__PURE__ */ l("span", { style: ae, children: "启用" })
        ] }),
        /* @__PURE__ */ y("div", { style: { display: "flex", gap: 8 }, children: [
          /* @__PURE__ */ l("button", { style: { ...Yt, opacity: s ? 0.6 : 1 }, disabled: s, onClick: v, children: s ? "保存中..." : "保存" }),
          /* @__PURE__ */ l("button", { style: Uo, onClick: () => u(null), children: "取消" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ l("div", { style: Jt, children: r ? /* @__PURE__ */ l("p", { style: { margin: 0, color: t("textSecondary"), textAlign: "center", padding: "24px 0" }, children: "加载中..." }) : a.length === 0 ? /* @__PURE__ */ l("p", { style: { margin: 0, color: t("textSecondary"), textAlign: "center", padding: "24px 0" }, children: "暂无套餐。点击右上角「新增套餐」创建第一个优惠档（用户端在配置前显示默认金额档）。" }) : /* @__PURE__ */ y("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 13 }, children: [
      /* @__PURE__ */ l("thead", { children: /* @__PURE__ */ l("tr", { children: ["ID", "充值金额", "赠送", "用户实得", "标题", "排序", "状态", "操作"].map((p) => /* @__PURE__ */ l("th", { style: qo, children: p }, p)) }) }),
      /* @__PURE__ */ l("tbody", { children: a.map((p) => /* @__PURE__ */ y("tr", { children: [
        /* @__PURE__ */ l("td", { style: K, children: p.id }),
        /* @__PURE__ */ l("td", { style: { ...K, fontWeight: 600 }, children: N(p.amount) }),
        /* @__PURE__ */ l("td", { style: { ...K, color: p.bonus_amount > 0 ? t("success") : t("textTertiary") }, children: p.bonus_amount > 0 ? `+${N(p.bonus_amount)}` : "—" }),
        /* @__PURE__ */ l("td", { style: K, children: N(p.amount + p.bonus_amount) }),
        /* @__PURE__ */ l("td", { style: { ...K, color: t("textSecondary") }, children: p.title || "—" }),
        /* @__PURE__ */ l("td", { style: K, children: p.sort_order }),
        /* @__PURE__ */ l("td", { style: K, children: /* @__PURE__ */ l("span", { style: p.enabled ? Wo : Oo, children: p.enabled ? "启用中" : "已停用" }) }),
        /* @__PURE__ */ l("td", { style: K, children: /* @__PURE__ */ y("div", { style: { display: "flex", gap: 8 }, children: [
          /* @__PURE__ */ l("button", { style: Xe, onClick: () => S(p), children: "编辑" }),
          /* @__PURE__ */ l("button", { style: Xe, onClick: () => b(p), children: p.enabled ? "停用" : "启用" }),
          /* @__PURE__ */ l("button", { style: { ...Xe, color: t("danger") }, onClick: () => R(p), children: "删除" })
        ] }) })
      ] }, p.id)) })
    ] }) })
  ] });
}
const $o = {
  maxWidth: 960,
  margin: "0 auto",
  padding: "24px 24px 48px",
  color: t("text")
}, Do = {
  margin: 0,
  fontSize: 22,
  fontWeight: 600,
  letterSpacing: "-0.01em"
}, Jt = {
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusLg"),
  background: t("bgSurface"),
  padding: "20px 24px"
}, Fo = {
  margin: "0 0 16px",
  fontSize: 13,
  fontWeight: 600,
  color: t("textSecondary"),
  textTransform: "uppercase",
  letterSpacing: "0.04em"
}, ie = {
  display: "flex",
  flexDirection: "column",
  gap: 6
}, ae = {
  fontSize: 12,
  color: t("textSecondary")
}, fe = {
  padding: "8px 12px",
  width: 130,
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusMd"),
  background: t("bgElevated"),
  color: t("text"),
  fontSize: 14,
  outline: "none"
}, Yt = {
  padding: "10px 20px",
  border: "none",
  borderRadius: t("radiusMd"),
  background: t("primary"),
  color: t("textInverse"),
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
  transition: t("transition")
}, Uo = {
  padding: "10px 20px",
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusMd"),
  background: t("bgElevated"),
  color: t("text"),
  fontSize: 13,
  fontWeight: 500,
  cursor: "pointer",
  transition: t("transition")
}, Xe = {
  padding: 0,
  border: "none",
  background: "none",
  color: t("primary"),
  fontSize: 13,
  cursor: "pointer"
}, qo = {
  textAlign: "left",
  padding: "8px 10px",
  color: t("textTertiary"),
  fontWeight: 500,
  fontSize: 12,
  borderBottom: `1px solid ${t("glassBorder")}`
}, K = {
  padding: "10px",
  borderBottom: `1px solid ${t("glassBorder")}`,
  verticalAlign: "middle"
}, Wo = {
  fontSize: 12,
  fontWeight: 600,
  padding: "2px 10px",
  borderRadius: 999,
  background: t("primarySubtle"),
  color: t("primary")
}, Oo = {
  fontSize: 12,
  fontWeight: 600,
  padding: "2px 10px",
  borderRadius: 999,
  background: t("bgElevated"),
  color: t("textTertiary")
}, Vo = {
  routes: [
    { path: "/recharge", component: ir },
    { path: "/orders", component: br },
    { path: "/admin/orders", component: Pr },
    { path: "/admin/providers", component: mo },
    { path: "/admin/packages", component: No }
  ]
};
export {
  Vo as default
};
