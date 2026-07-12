import { jsx as l, jsxs as y, Fragment as le } from "react/jsx-runtime";
import { useState as z, useRef as se, useEffect as F, useCallback as ne, useMemo as Sn } from "react";
function xn(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var ee = {}, xe, it;
function wn() {
  return it || (it = 1, xe = function() {
    return typeof Promise == "function" && Promise.prototype && Promise.prototype.then;
  }), xe;
}
var we = {}, H = {}, at;
function Q() {
  if (at) return H;
  at = 1;
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
  return H.getSymbolSize = function(o) {
    if (!o) throw new Error('"version" cannot be null or undefined');
    if (o < 1 || o > 40) throw new Error('"version" should be in range from 1 to 40');
    return o * 4 + 17;
  }, H.getSymbolTotalCodewords = function(o) {
    return i[o];
  }, H.getBCHDigit = function(a) {
    let o = 0;
    for (; a !== 0; )
      o++, a >>>= 1;
    return o;
  }, H.setToSJISFunction = function(o) {
    if (typeof o != "function")
      throw new Error('"toSJISFunc" is not a valid function.');
    e = o;
  }, H.isKanjiModeEnabled = function() {
    return typeof e < "u";
  }, H.toSJIS = function(o) {
    return e(o);
  }, H;
}
var ve = {}, lt;
function Ze() {
  return lt || (lt = 1, (function(e) {
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
  })(ve)), ve;
}
var ke, st;
function vn() {
  if (st) return ke;
  st = 1;
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
  }, ke = e, ke;
}
var Ce, dt;
function kn() {
  if (dt) return Ce;
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
  }, Ce = e, Ce;
}
var Te = {}, ct;
function Cn() {
  return ct || (ct = 1, (function(e) {
    const i = Q().getSymbolSize;
    e.getRowColCoords = function(o) {
      if (o === 1) return [];
      const r = Math.floor(o / 7) + 2, n = i(o), s = n === 145 ? 26 : Math.ceil((n - 13) / (2 * r - 2)) * 2, c = [n - 7];
      for (let d = 1; d < r - 1; d++)
        c[d] = c[d - 1] - s;
      return c.push(6), c.reverse();
    }, e.getPositions = function(o) {
      const r = [], n = e.getRowColCoords(o), s = n.length;
      for (let c = 0; c < s; c++)
        for (let d = 0; d < s; d++)
          c === 0 && d === 0 || // top-left
          c === 0 && d === s - 1 || // bottom-left
          c === s - 1 && d === 0 || r.push([n[c], n[d]]);
      return r;
    };
  })(Te)), Te;
}
var Be = {}, ut;
function Tn() {
  if (ut) return Be;
  ut = 1;
  const e = Q().getSymbolSize, i = 7;
  return Be.getPositions = function(o) {
    const r = e(o);
    return [
      // top-left
      [0, 0],
      // top-right
      [r - i, 0],
      // bottom-left
      [0, r - i]
    ];
  }, Be;
}
var Ee = {}, gt;
function Bn() {
  return gt || (gt = 1, (function(e) {
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
      let s = 0, c = 0, d = 0, u = null, f = null;
      for (let h = 0; h < n; h++) {
        c = d = 0, u = f = null;
        for (let S = 0; S < n; S++) {
          let v = r.get(h, S);
          v === u ? c++ : (c >= 5 && (s += i.N1 + (c - 5)), u = v, c = 1), v = r.get(S, h), v === f ? d++ : (d >= 5 && (s += i.N1 + (d - 5)), f = v, d = 1);
        }
        c >= 5 && (s += i.N1 + (c - 5)), d >= 5 && (s += i.N1 + (d - 5));
      }
      return s;
    }, e.getPenaltyN2 = function(r) {
      const n = r.size;
      let s = 0;
      for (let c = 0; c < n - 1; c++)
        for (let d = 0; d < n - 1; d++) {
          const u = r.get(c, d) + r.get(c, d + 1) + r.get(c + 1, d) + r.get(c + 1, d + 1);
          (u === 4 || u === 0) && s++;
        }
      return s * i.N2;
    }, e.getPenaltyN3 = function(r) {
      const n = r.size;
      let s = 0, c = 0, d = 0;
      for (let u = 0; u < n; u++) {
        c = d = 0;
        for (let f = 0; f < n; f++)
          c = c << 1 & 2047 | r.get(u, f), f >= 10 && (c === 1488 || c === 93) && s++, d = d << 1 & 2047 | r.get(f, u), f >= 10 && (d === 1488 || d === 93) && s++;
      }
      return s * i.N3;
    }, e.getPenaltyN4 = function(r) {
      let n = 0;
      const s = r.data.length;
      for (let d = 0; d < s; d++) n += r.data[d];
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
      for (let c = 0; c < s; c++)
        for (let d = 0; d < s; d++)
          n.isReserved(d, c) || n.xor(d, c, a(r, d, c));
    }, e.getBestMask = function(r, n) {
      const s = Object.keys(e.Patterns).length;
      let c = 0, d = 1 / 0;
      for (let u = 0; u < s; u++) {
        n(u), e.applyMask(u, r);
        const f = e.getPenaltyN1(r) + e.getPenaltyN2(r) + e.getPenaltyN3(r) + e.getPenaltyN4(r);
        e.applyMask(u, r), f < d && (d = f, c = u);
      }
      return c;
    };
  })(Ee)), Ee;
}
var ce = {}, ht;
function Jt() {
  if (ht) return ce;
  ht = 1;
  const e = Ze(), i = [
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
  return ce.getBlocksCount = function(r, n) {
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
  }, ce.getTotalCodewordsCount = function(r, n) {
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
  }, ce;
}
var Re = {}, oe = {}, ft;
function En() {
  if (ft) return oe;
  ft = 1;
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
var pt;
function Rn() {
  return pt || (pt = 1, (function(e) {
    const i = En();
    e.mul = function(o, r) {
      const n = new Uint8Array(o.length + r.length - 1);
      for (let s = 0; s < o.length; s++)
        for (let c = 0; c < r.length; c++)
          n[s + c] ^= i.mul(o[s], r[c]);
      return n;
    }, e.mod = function(o, r) {
      let n = new Uint8Array(o);
      for (; n.length - r.length >= 0; ) {
        const s = n[0];
        for (let d = 0; d < r.length; d++)
          n[d] ^= i.mul(r[d], s);
        let c = 0;
        for (; c < n.length && n[c] === 0; ) c++;
        n = n.slice(c);
      }
      return n;
    }, e.generateECPolynomial = function(o) {
      let r = new Uint8Array([1]);
      for (let n = 0; n < o; n++)
        r = e.mul(r, new Uint8Array([1, i.exp(n)]));
      return r;
    };
  })(Re)), Re;
}
var Ie, yt;
function In() {
  if (yt) return Ie;
  yt = 1;
  const e = Rn();
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
      const c = new Uint8Array(this.degree);
      return c.set(n, s), c;
    }
    return n;
  }, Ie = i, Ie;
}
var Pe = {}, Me = {}, Ae = {}, mt;
function Qt() {
  return mt || (mt = 1, Ae.isValid = function(i) {
    return !isNaN(i) && i >= 1 && i <= 40;
  }), Ae;
}
var U = {}, bt;
function Xt() {
  if (bt) return U;
  bt = 1;
  const e = "[0-9]+", i = "[A-Z $%*+\\-./:]+";
  let a = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
  a = a.replace(/u/g, "\\u");
  const o = "(?:(?![A-Z0-9 $%*+\\-./:]|" + a + `)(?:.|[\r
]))+`;
  U.KANJI = new RegExp(a, "g"), U.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g"), U.BYTE = new RegExp(o, "g"), U.NUMERIC = new RegExp(e, "g"), U.ALPHANUMERIC = new RegExp(i, "g");
  const r = new RegExp("^" + a + "$"), n = new RegExp("^" + e + "$"), s = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
  return U.testKanji = function(d) {
    return r.test(d);
  }, U.testNumeric = function(d) {
    return n.test(d);
  }, U.testAlphanumeric = function(d) {
    return s.test(d);
  }, U;
}
var St;
function X() {
  return St || (St = 1, (function(e) {
    const i = Qt(), a = Xt();
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
var xt;
function Pn() {
  return xt || (xt = 1, (function(e) {
    const i = Q(), a = Jt(), o = Ze(), r = X(), n = Qt(), s = 7973, c = i.getBCHDigit(s);
    function d(S, v, b) {
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
      return d(R.mode, R.getLength(), p);
    }, e.getEncodedBits = function(v) {
      if (!n.isValid(v) || v < 7)
        throw new Error("Invalid QR Code version");
      let b = v << 12;
      for (; i.getBCHDigit(b) - c >= 0; )
        b ^= s << i.getBCHDigit(b) - c;
      return v << 12 | b;
    };
  })(Pe)), Pe;
}
var _e = {}, wt;
function Mn() {
  if (wt) return _e;
  wt = 1;
  const e = Q(), i = 1335, a = 21522, o = e.getBCHDigit(i);
  return _e.getEncodedBits = function(n, s) {
    const c = n.bit << 3 | s;
    let d = c << 10;
    for (; e.getBCHDigit(d) - o >= 0; )
      d ^= i << e.getBCHDigit(d) - o;
    return (c << 10 | d) ^ a;
  }, _e;
}
var ze = {}, Le, vt;
function An() {
  if (vt) return Le;
  vt = 1;
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
    const c = this.data.length - r;
    c > 0 && (n = this.data.substr(r), s = parseInt(n, 10), o.put(s, c * 3 + 1));
  }, Le = i, Le;
}
var Ne, kt;
function _n() {
  if (kt) return Ne;
  kt = 1;
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
  }, Ne = a, Ne;
}
var $e, Ct;
function zn() {
  if (Ct) return $e;
  Ct = 1;
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
  }, $e = i, $e;
}
var De, Tt;
function Ln() {
  if (Tt) return De;
  Tt = 1;
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
  }, De = a, De;
}
var Fe = { exports: {} }, Bt;
function Nn() {
  return Bt || (Bt = 1, (function(e) {
    var i = {
      single_source_shortest_paths: function(a, o, r) {
        var n = {}, s = {};
        s[o] = 0;
        var c = i.PriorityQueue.make();
        c.push(o, 0);
        for (var d, u, f, h, S, v, b, R, p; !c.empty(); ) {
          d = c.pop(), u = d.value, h = d.cost, S = a[u] || {};
          for (f in S)
            S.hasOwnProperty(f) && (v = S[f], b = h + v, R = s[f], p = typeof s[f] > "u", (p || R > b) && (s[f] = b, c.push(f, b), n[f] = u));
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
  })(Fe)), Fe.exports;
}
var Et;
function $n() {
  return Et || (Et = 1, (function(e) {
    const i = X(), a = An(), o = _n(), r = zn(), n = Ln(), s = Xt(), c = Q(), d = Nn();
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
      return c.isKanjiModeEnabled() ? (k = f(s.BYTE, i.BYTE, g), L = f(s.KANJI, i.KANJI, g)) : (k = f(s.BYTE_KANJI, i.BYTE, g), L = []), I.concat(w, k, L).sort(function(E, P) {
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
          for (let M = 0; M < L.length; M++) {
            const A = L[M];
            w[A] && w[A].node.mode === m.mode ? (k[A][C] = S(w[A].lastCount + m.length, m.mode) - S(w[A].lastCount, m.mode), w[A].lastCount += m.length) : (w[A] && (w[A].lastCount = m.length), k[A][C] = S(m.length, m.mode) + 4 + i.getCharCountIndicator(m.mode, I));
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
      switch (w === i.KANJI && !c.isKanjiModeEnabled() && (w = i.BYTE), w) {
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
      const k = h(I, c.isKanjiModeEnabled()), L = b(k), B = R(L, w), E = d.find_path(B.map, "start", "end"), P = [];
      for (let T = 1; T < E.length - 1; T++)
        P.push(B.table[E[T]].node);
      return e.fromArray(v(P));
    }, e.rawSplit = function(I) {
      return e.fromArray(
        h(I, c.isKanjiModeEnabled())
      );
    };
  })(ze)), ze;
}
var Rt;
function Dn() {
  if (Rt) return we;
  Rt = 1;
  const e = Q(), i = Ze(), a = vn(), o = kn(), r = Cn(), n = Tn(), s = Bn(), c = Jt(), d = In(), u = Pn(), f = Mn(), h = X(), S = $n();
  function v(B, E) {
    const P = B.size, T = n.getPositions(E);
    for (let m = 0; m < T.length; m++) {
      const C = T[m][0], M = T[m][1];
      for (let A = -1; A <= 7; A++)
        if (!(C + A <= -1 || P <= C + A))
          for (let _ = -1; _ <= 7; _++)
            M + _ <= -1 || P <= M + _ || (A >= 0 && A <= 6 && (_ === 0 || _ === 6) || _ >= 0 && _ <= 6 && (A === 0 || A === 6) || A >= 2 && A <= 4 && _ >= 2 && _ <= 4 ? B.set(C + A, M + _, !0, !0) : B.set(C + A, M + _, !1, !0));
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
      for (let M = -2; M <= 2; M++)
        for (let A = -2; A <= 2; A++)
          M === -2 || M === 2 || A === -2 || A === 2 || M === 0 && A === 0 ? B.set(m + M, C + A, !0, !0) : B.set(m + M, C + A, !1, !0);
    }
  }
  function p(B, E) {
    const P = B.size, T = u.getEncodedBits(E);
    let m, C, M;
    for (let A = 0; A < 18; A++)
      m = Math.floor(A / 3), C = A % 3 + P - 8 - 3, M = (T >> A & 1) === 1, B.set(m, C, M, !0), B.set(C, m, M, !0);
  }
  function g(B, E, P) {
    const T = B.size, m = f.getEncodedBits(E, P);
    let C, M;
    for (C = 0; C < 15; C++)
      M = (m >> C & 1) === 1, C < 6 ? B.set(C, 8, M, !0) : C < 8 ? B.set(C + 1, 8, M, !0) : B.set(T - 15 + C, 8, M, !0), C < 8 ? B.set(8, T - C - 1, M, !0) : C < 9 ? B.set(8, 15 - C - 1 + 1, M, !0) : B.set(8, 15 - C - 1, M, !0);
    B.set(T - 8, 8, 1, !0);
  }
  function I(B, E) {
    const P = B.size;
    let T = -1, m = P - 1, C = 7, M = 0;
    for (let A = P - 1; A > 0; A -= 2)
      for (A === 6 && A--; ; ) {
        for (let _ = 0; _ < 2; _++)
          if (!B.isReserved(m, A - _)) {
            let O = !1;
            M < E.length && (O = (E[M] >>> C & 1) === 1), B.set(m, A - _, O), C--, C === -1 && (M++, C = 7);
          }
        if (m += T, m < 0 || P <= m) {
          m -= T, T = -T;
          break;
        }
      }
  }
  function w(B, E, P) {
    const T = new a();
    P.forEach(function(_) {
      T.put(_.mode.bit, 4), T.put(_.getLength(), h.getCharCountIndicator(_.mode, B)), _.write(T);
    });
    const m = e.getSymbolTotalCodewords(B), C = c.getTotalCodewordsCount(B, E), M = (m - C) * 8;
    for (T.getLengthInBits() + 4 <= M && T.put(0, 4); T.getLengthInBits() % 8 !== 0; )
      T.putBit(0);
    const A = (M - T.getLengthInBits()) / 8;
    for (let _ = 0; _ < A; _++)
      T.put(_ % 2 ? 17 : 236, 8);
    return k(T, B, E);
  }
  function k(B, E, P) {
    const T = e.getSymbolTotalCodewords(E), m = c.getTotalCodewordsCount(E, P), C = T - m, M = c.getBlocksCount(E, P), A = T % M, _ = M - A, O = Math.floor(T / M), re = Math.floor(C / M), yn = re + 1, nt = O - re, mn = new d(nt);
    let ye = 0;
    const de = new Array(M), rt = new Array(M);
    let me = 0;
    const bn = new Uint8Array(B.buffer);
    for (let Z = 0; Z < M; Z++) {
      const Se = Z < _ ? re : yn;
      de[Z] = bn.slice(ye, ye + Se), rt[Z] = mn.encode(de[Z]), ye += Se, me = Math.max(me, Se);
    }
    const be = new Uint8Array(T);
    let ot = 0, q, W;
    for (q = 0; q < me; q++)
      for (W = 0; W < M; W++)
        q < de[W].length && (be[ot++] = de[W][q]);
    for (q = 0; q < nt; q++)
      for (W = 0; W < M; W++)
        be[ot++] = rt[W][q];
    return be;
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
    const M = w(E, P, m), A = e.getSymbolSize(E), _ = new o(A);
    return v(_, E), b(_), R(_, E), g(_, P, 0), E >= 7 && p(_, E), I(_, M), isNaN(T) && (T = s.getBestMask(
      _,
      g.bind(null, _, P)
    )), s.applyMask(T, _), g(_, P, T), {
      modules: _,
      version: E,
      errorCorrectionLevel: P,
      maskPattern: T,
      segments: m
    };
  }
  return we.create = function(E, P) {
    if (typeof E > "u" || E === "")
      throw new Error("No input text");
    let T = i.M, m, C;
    return typeof P < "u" && (T = i.from(P.errorCorrectionLevel, i.M), m = u.from(P.version), C = s.from(P.maskPattern), P.toSJISFunc && e.setToSJISFunction(P.toSJISFunc)), L(E, m, T, C);
  }, we;
}
var Ue = {}, qe = {}, It;
function Zt() {
  return It || (It = 1, (function(e) {
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
      const s = r.modules.size, c = r.modules.data, d = e.getScale(s, n), u = Math.floor((s + n.margin * 2) * d), f = n.margin * d, h = [n.color.light, n.color.dark];
      for (let S = 0; S < u; S++)
        for (let v = 0; v < u; v++) {
          let b = (S * u + v) * 4, R = n.color.light;
          if (S >= f && v >= f && S < u - f && v < u - f) {
            const p = Math.floor((S - f) / d), g = Math.floor((v - f) / d);
            R = h[c[p * s + g] ? 1 : 0];
          }
          o[b++] = R.r, o[b++] = R.g, o[b++] = R.b, o[b] = R.a;
        }
    };
  })(qe)), qe;
}
var Pt;
function Fn() {
  return Pt || (Pt = 1, (function(e) {
    const i = Zt();
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
    e.render = function(n, s, c) {
      let d = c, u = s;
      typeof d > "u" && (!s || !s.getContext) && (d = s, s = void 0), s || (u = o()), d = i.getOptions(d);
      const f = i.getImageWidth(n.modules.size, d), h = u.getContext("2d"), S = h.createImageData(f, f);
      return i.qrToImageData(S.data, n, d), a(h, u, f), h.putImageData(S, 0, 0), u;
    }, e.renderToDataURL = function(n, s, c) {
      let d = c;
      typeof d > "u" && (!s || !s.getContext) && (d = s, s = void 0), d || (d = {});
      const u = e.render(n, s, d), f = d.type || "image/png", h = d.rendererOpts || {};
      return u.toDataURL(f, h.quality);
    };
  })(Ue)), Ue;
}
var We = {}, Mt;
function Un() {
  if (Mt) return We;
  Mt = 1;
  const e = Zt();
  function i(r, n) {
    const s = r.a / 255, c = n + '="' + r.hex + '"';
    return s < 1 ? c + " " + n + '-opacity="' + s.toFixed(2).slice(1) + '"' : c;
  }
  function a(r, n, s) {
    let c = r + n;
    return typeof s < "u" && (c += " " + s), c;
  }
  function o(r, n, s) {
    let c = "", d = 0, u = !1, f = 0;
    for (let h = 0; h < r.length; h++) {
      const S = Math.floor(h % n), v = Math.floor(h / n);
      !S && !u && (u = !0), r[h] ? (f++, h > 0 && S > 0 && r[h - 1] || (c += u ? a("M", S + s, 0.5 + v + s) : a("m", d, 0), d = 0, u = !1), S + 1 < n && r[h + 1] || (c += a("h", f), f = 0)) : d++;
    }
    return c;
  }
  return We.render = function(n, s, c) {
    const d = e.getOptions(s), u = n.modules.size, f = n.modules.data, h = u + d.margin * 2, S = d.color.light.a ? "<path " + i(d.color.light, "fill") + ' d="M0 0h' + h + "v" + h + 'H0z"/>' : "", v = "<path " + i(d.color.dark, "stroke") + ' d="' + o(f, u, d.margin) + '"/>', b = 'viewBox="0 0 ' + h + " " + h + '"', p = '<svg xmlns="http://www.w3.org/2000/svg" ' + (d.width ? 'width="' + d.width + '" height="' + d.width + '" ' : "") + b + ' shape-rendering="crispEdges">' + S + v + `</svg>
`;
    return typeof c == "function" && c(null, p), p;
  }, We;
}
var At;
function qn() {
  if (At) return ee;
  At = 1;
  const e = wn(), i = Dn(), a = Fn(), o = Un();
  function r(n, s, c, d, u) {
    const f = [].slice.call(arguments, 1), h = f.length, S = typeof f[h - 1] == "function";
    if (!S && !e())
      throw new Error("Callback required as last argument");
    if (S) {
      if (h < 2)
        throw new Error("Too few arguments provided");
      h === 2 ? (u = c, c = s, s = d = void 0) : h === 3 && (s.getContext && typeof u > "u" ? (u = d, d = void 0) : (u = d, d = c, c = s, s = void 0));
    } else {
      if (h < 1)
        throw new Error("Too few arguments provided");
      return h === 1 ? (c = s, s = d = void 0) : h === 2 && !s.getContext && (d = c, c = s, s = void 0), new Promise(function(v, b) {
        try {
          const R = i.create(c, d);
          v(n(R, s, d));
        } catch (R) {
          b(R);
        }
      });
    }
    try {
      const v = i.create(c, d);
      u(null, n(v, s, d));
    } catch (v) {
      u(v);
    }
  }
  return ee.create = i.create, ee.toCanvas = r.bind(null, a.render), ee.toDataURL = r.bind(null, a.renderToDataURL), ee.toString = r.bind(null, function(n, s, c) {
    return o.render(n, c);
  }), ee;
}
var Wn = qn();
const en = /* @__PURE__ */ xn(Wn), tn = {
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
}, On = {
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
}, et = {
  ...On,
  ...Hn
}, nn = {
  dark: tn
};
function jn(e) {
  return e.replace(/[A-Z]/g, (i) => "-" + i.toLowerCase());
}
function rn(e = "ag") {
  return e.trim() || "ag";
}
function pe(e, i) {
  return `--${e}-${jn(i)}`;
}
Object.keys(nn.dark).reduce((e, i) => (e[i] = pe("ag", i), e), {});
Object.keys(et).reduce((e, i) => (e[i] = pe("ag", i), e), {});
function on(e = {}) {
  const i = rn(e.prefix);
  return Object.keys(nn.dark).reduce((a, o) => (a[o] = pe(i, o), a), {});
}
function an(e = {}) {
  const i = rn(e.prefix);
  return Object.keys(et).reduce((a, o) => (a[o] = pe(i, o), a), {});
}
const Vn = on(), Kn = an();
function t(e, i = {}) {
  const a = i.prefix ? on(i) : Vn, o = i.prefix ? an(i) : Kn;
  if (e in a) {
    const n = e;
    return `var(${a[n]}, ${tn[n]})`;
  }
  const r = e;
  return `var(${o[r]}, ${et[r]})`;
}
const Gn = "/api/v1/ext-user/payment-epay", Yn = "/api/v1/ext/payment-epay";
async function D(e, i, a, o) {
  const r = {};
  a !== void 0 && (r["Content-Type"] = "application/json");
  const n = localStorage.getItem("token");
  n && (r.Authorization = `Bearer ${n}`);
  const s = o != null && o.admin ? Yn : Gn, c = await fetch(s + i, {
    method: e,
    headers: r,
    body: a ? JSON.stringify(a) : void 0
  }), d = await c.text();
  let u = null;
  try {
    u = d ? JSON.parse(d) : null;
  } catch {
  }
  if (!c.ok) {
    const h = u, S = (h == null ? void 0 : h.message) || (u == null ? void 0 : u.error) || `HTTP ${c.status}`;
    throw c.status === 401 && (localStorage.removeItem("token"), window.location.href = "/login"), new Error(S);
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
function N(e, i = {}) {
  const a = e.toFixed(2);
  return i.compact ? `$${e}` : `$${a}`;
}
const Jn = /* @__PURE__ */ new Set(["zh", "zh-HK", "en", "ja"]);
function _t(e) {
  return e && Jn.has(e) ? e : null;
}
function Qn() {
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
function Xn() {
  if (typeof document < "u") {
    const e = document.cookie.match(/(?:^|;\s*)lang=([^;]+)/), i = e ? _t(decodeURIComponent(e[1] ?? "")) : null;
    if (i) return i;
  }
  try {
    const e = _t(window.localStorage.getItem("lang"));
    if (e) return e;
  } catch {
  }
  return Qn();
}
const Zn = {
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
}, er = {
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
}, tr = {
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
}, nr = {
  "zh-HK": Zn,
  en: er,
  ja: tr
};
function x(e) {
  const i = Xn();
  if (i === "zh") return e;
  const a = nr[i];
  return a && a[e] || e;
}
function rr() {
  const [e, i] = z([]), [a, o] = z(!0), [r, n] = z(null), [s, c] = z(30), [d, u] = z(""), [f, h] = z(!1), [S, v] = z(null), [b, R] = z([]), [p, g] = z(null), I = se(!1), [w, k] = z(null), [L, B] = z(null), E = se(null);
  F(() => {
    $.methods().then((m) => {
      var C;
      i(m.methods || []), (C = m.methods) != null && C.length && u(m.methods[0].key);
    }).catch((m) => n(String((m == null ? void 0 : m.message) || m))).finally(() => o(!1)), $.packages().then((m) => {
      const C = m.list || [];
      R(C), C.length && !I.current && (g(C[0].id), c(C[0].amount));
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
    return en.toDataURL(m, { width: 240, margin: 2, errorCorrectionLevel: "M" }).then((M) => {
      C || B(M);
    }).catch(() => {
      C || B(null);
    }), () => {
      C = !0;
    };
  }, [w == null ? void 0 : w.payment_url, w == null ? void 0 : w.qr_code_content]);
  const P = async () => {
    if (v(null), !d) {
      v(x("请选择支付方式"));
      return;
    }
    if (!s || s <= 0) {
      v(x("请输入有效金额"));
      return;
    }
    h(!0);
    try {
      const m = await $.createOrder({
        amount: s,
        method: d,
        subject: "HopBase 余额充值",
        ...p !== null ? { package_id: p } : {}
      });
      k(m);
    } catch (m) {
      v(String(m.message || m));
    } finally {
      h(!1);
    }
  }, T = () => {
    k(null), v(null);
  };
  return a ? /* @__PURE__ */ l("div", { style: G, children: /* @__PURE__ */ l("div", { style: zt, children: x("加载中...") }) }) : r ? /* @__PURE__ */ l("div", { style: G, children: /* @__PURE__ */ y("div", { style: { ...zt, color: t("danger") }, children: [
    x("加载支付方式失败: "),
    r
  ] }) }) : e.length === 0 ? /* @__PURE__ */ l("div", { style: G, children: /* @__PURE__ */ l("div", { style: ge, children: /* @__PURE__ */ l("p", { style: { color: t("textSecondary"), margin: 0, textAlign: "center" }, children: x("充值功能暂未开放，请联系管理员。") }) }) }) : w ? w.status === "paid" ? /* @__PURE__ */ y("div", { style: G, children: [
    /* @__PURE__ */ l("h2", { style: ue, children: x("充值成功") }),
    /* @__PURE__ */ y("div", { style: ge, children: [
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
      /* @__PURE__ */ l("button", { style: { ...Oe, marginTop: 20 }, onClick: T, children: x("再次充值") })
    ] })
  ] }) : w.status === "pending" ? /* @__PURE__ */ y("div", { style: G, children: [
    /* @__PURE__ */ l("h2", { style: ue, children: x("扫码付款") }),
    /* @__PURE__ */ y("div", { style: fr, children: [
      L ? /* @__PURE__ */ l("img", { src: L, alt: x("付款二维码"), style: Nt }) : /* @__PURE__ */ l("div", { style: { ...Nt, display: "flex", alignItems: "center", justifyContent: "center", color: t("textTertiary") }, children: x("生成二维码中...") }),
      /* @__PURE__ */ l("div", { style: pr, children: N(w.amount) }),
      (w.bonus_amount ?? 0) > 0 && /* @__PURE__ */ y("div", { style: { color: t("success"), fontSize: 13, marginTop: 2 }, children: [
        x("支付成功后另赠"),
        " ",
        N(w.bonus_amount)
      ] }),
      /* @__PURE__ */ y("div", { style: { color: t("textSecondary"), fontSize: 13 }, children: [
        x("请使用"),
        " ",
        or(w.method),
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
      /* @__PURE__ */ l("button", { style: { ...hr, marginTop: 20 }, onClick: T, children: x("取消") })
    ] })
  ] }) : /* @__PURE__ */ y("div", { style: G, children: [
    /* @__PURE__ */ l("h2", { style: ue, children: ir(w.status) }),
    /* @__PURE__ */ y("div", { style: ge, children: [
      /* @__PURE__ */ y("p", { style: { margin: 0, color: t("textSecondary") }, children: [
        x("订单号："),
        /* @__PURE__ */ l("code", { style: He, children: w.out_trade_no })
      ] }),
      /* @__PURE__ */ l("button", { style: { ...Oe, marginTop: 20 }, onClick: T, children: x("重新发起") })
    ] })
  ] }) : /* @__PURE__ */ y("div", { style: G, children: [
    /* @__PURE__ */ l("h2", { style: ue, children: x("账户充值") }),
    /* @__PURE__ */ y("div", { style: ge, children: [
      /* @__PURE__ */ y("p", { style: lr, children: [
        x("充值比例："),
        /* @__PURE__ */ l("strong", { style: { color: t("text") }, children: "1 CNY = $1" })
      ] }),
      /* @__PURE__ */ y("section", { children: [
        /* @__PURE__ */ l("h3", { style: Lt, children: b.length ? x("选择套餐") : x("选择金额") }),
        /* @__PURE__ */ l("div", { style: { display: "flex", flexWrap: "wrap", gap: 10 }, children: b.length ? b.map((m) => /* @__PURE__ */ y(
          "button",
          {
            type: "button",
            onClick: () => {
              I.current = !0, g(m.id), c(m.amount);
            },
            style: p === m.id ? dr : ln,
            title: m.title || void 0,
            children: [
              /* @__PURE__ */ l("span", { style: { fontSize: 16, fontWeight: 600 }, children: N(m.amount, { compact: !0 }) }),
              m.bonus_amount > 0 && /* @__PURE__ */ y("span", { style: p === m.id ? cr : sn, children: [
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
              I.current = !0, c(m);
            },
            style: s === m ? sr : tt,
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
                I.current = !0, g(null), c(Number(m.target.value));
              },
              style: gr
            }
          ),
          /* @__PURE__ */ l("span", { children: "$" })
        ] })
      ] }),
      /* @__PURE__ */ y("section", { style: ar, children: [
        /* @__PURE__ */ l("h3", { style: Lt, children: x("选择支付方式") }),
        /* @__PURE__ */ l("div", { style: { display: "flex", gap: 12, flexWrap: "wrap" }, children: e.map((m) => /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            onClick: () => u(m.key),
            style: d === m.key ? ur : dn,
            title: m.description,
            children: m.label
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
          style: { ...Oe, marginTop: 24, width: "100%", opacity: f ? 0.6 : 1 },
          children: x(f ? "处理中..." : "立即支付")
        }
      )
    ] })
  ] });
}
function or(e) {
  switch (e) {
    case "alipay":
      return x("支付宝");
    case "wxpay":
      return x("微信支付");
    default:
      return e;
  }
}
function ir(e) {
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
}, ue = {
  margin: "0 0 20px",
  fontSize: 22,
  fontWeight: 600,
  color: t("text"),
  letterSpacing: "-0.01em"
}, zt = {
  padding: "40px 0",
  textAlign: "center",
  color: t("textSecondary")
}, ge = {
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusLg"),
  background: t("bgSurface"),
  padding: "24px"
}, ar = {
  marginTop: 28
}, lr = {
  margin: "0 0 20px",
  padding: "10px 12px",
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusMd"),
  background: t("bgElevated"),
  color: t("textSecondary"),
  fontSize: 13,
  lineHeight: 1.6
}, Lt = {
  margin: "0 0 12px",
  fontSize: 13,
  fontWeight: 600,
  color: t("textSecondary"),
  textTransform: "uppercase",
  letterSpacing: "0.04em"
}, tt = {
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
}, sr = {
  ...tt,
  borderColor: t("primary"),
  background: t("primarySubtle"),
  color: t("primary"),
  fontWeight: 600
}, ln = {
  ...tt,
  minWidth: 104,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 4
}, dr = {
  ...ln,
  borderColor: t("primary"),
  background: t("primarySubtle"),
  color: t("primary")
}, sn = {
  fontSize: 11,
  fontWeight: 600,
  padding: "1px 8px",
  borderRadius: 999,
  background: t("bgElevated"),
  color: t("success"),
  border: `1px solid ${t("glassBorder")}`
}, cr = {
  ...sn,
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
}, ur = {
  ...dn,
  borderColor: t("primary"),
  background: t("primarySubtle"),
  color: t("primary"),
  fontWeight: 600
}, gr = {
  padding: "8px 12px",
  width: 140,
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusMd"),
  background: t("bgElevated"),
  color: t("text"),
  fontSize: 14,
  outline: "none"
}, Oe = {
  padding: "12px 28px",
  border: "none",
  borderRadius: t("radiusMd"),
  background: t("primary"),
  color: t("textInverse"),
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  transition: t("transition")
}, hr = {
  padding: "10px 24px",
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusMd"),
  background: t("bgElevated"),
  color: t("text"),
  fontSize: 13,
  fontWeight: 500,
  cursor: "pointer",
  transition: t("transition")
}, fr = {
  padding: "28px 24px",
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusLg"),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: t("bgSurface")
}, Nt = {
  width: 240,
  height: 240,
  background: t("bgElevated"),
  padding: 8,
  borderRadius: t("radiusMd")
}, pr = {
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
function yr() {
  const [e, i] = z([]), [a, o] = z(!0), [r, n] = z(null), [s, c] = z(null), [d, u] = z(null), f = se(null), h = () => {
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
    return en.toDataURL(b, { width: 240, margin: 2, errorCorrectionLevel: "M" }).then((p) => {
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
        c(b), b.status !== "pending" && h();
      } catch {
      }
    }, 3e3), () => {
      f.current && (window.clearInterval(f.current), f.current = null);
    };
  }, [s == null ? void 0 : s.out_trade_no, s == null ? void 0 : s.status]);
  const S = (b) => {
    c(b);
  }, v = () => {
    c(null), u(null);
  };
  return a ? /* @__PURE__ */ l("div", { style: je, children: /* @__PURE__ */ l("div", { style: Ut, children: x("加载中...") }) }) : r ? /* @__PURE__ */ l("div", { style: je, children: /* @__PURE__ */ y("div", { style: { ...Ut, color: t("danger") }, children: [
    x("加载失败: "),
    r
  ] }) }) : /* @__PURE__ */ y("div", { style: je, children: [
    s && /* @__PURE__ */ l("div", { style: vr, onClick: v, children: /* @__PURE__ */ l("div", { style: kr, onClick: (b) => b.stopPropagation(), children: s.status === "paid" ? /* @__PURE__ */ y(le, { children: [
      /* @__PURE__ */ l("h3", { style: { margin: "0 0 12px", color: t("success") }, children: x("支付成功") }),
      /* @__PURE__ */ y("p", { style: { margin: 0, color: t("text"), fontSize: 14 }, children: [
        x("订单"),
        " ",
        /* @__PURE__ */ l("code", { style: Ve, children: s.out_trade_no }),
        " ",
        x("已支付"),
        " ",
        /* @__PURE__ */ l("strong", { children: N(s.amount) })
      ] }),
      /* @__PURE__ */ l("button", { style: { ...qt, marginTop: 16 }, onClick: v, children: x("关闭") })
    ] }) : s.status === "pending" ? /* @__PURE__ */ y(le, { children: [
      /* @__PURE__ */ l("h3", { style: { margin: "0 0 12px", color: t("text") }, children: x("扫码付款") }),
      d ? /* @__PURE__ */ l("img", { src: d, alt: x("付款二维码"), style: { width: 240, height: 240, borderRadius: 8 } }) : /* @__PURE__ */ l("div", { style: { width: 240, height: 240, display: "flex", alignItems: "center", justifyContent: "center", color: t("textTertiary"), border: `1px solid ${t("glassBorder")}`, borderRadius: 8 }, children: x("生成二维码中...") }),
      /* @__PURE__ */ l("div", { style: { marginTop: 12, fontWeight: 600, fontSize: 20, color: t("text") }, children: N(s.amount) }),
      /* @__PURE__ */ y("div", { style: { color: t("textSecondary"), fontSize: 13, marginTop: 4 }, children: [
        x("请使用"),
        " ",
        $t(s.method),
        " ",
        x("扫码完成付款")
      ] }),
      /* @__PURE__ */ y("div", { style: { marginTop: 6, color: t("textTertiary"), fontSize: 12 }, children: [
        x("订单号："),
        /* @__PURE__ */ l("code", { style: Ve, children: s.out_trade_no })
      ] }),
      /* @__PURE__ */ l("p", { style: { color: t("textTertiary"), fontSize: 12, marginTop: 12, marginBottom: 0 }, children: x("支付完成后将自动刷新（每 3 秒检查一次）") }),
      s.payment_url && /* @__PURE__ */ y("p", { style: { fontSize: 12, marginTop: 6, marginBottom: 0 }, children: [
        x("扫码不便？"),
        " ",
        /* @__PURE__ */ l("a", { href: s.payment_url, target: "_blank", rel: "noreferrer", style: { color: t("primary"), textDecoration: "none" }, children: x("点此在新窗口打开付款页 →") })
      ] }),
      /* @__PURE__ */ l("button", { style: { ...Cr, marginTop: 16 }, onClick: v, children: x("取消") })
    ] }) : /* @__PURE__ */ y(le, { children: [
      /* @__PURE__ */ y("h3", { style: { margin: "0 0 12px", color: t("textSecondary") }, children: [
        x("订单已"),
        Dt(s.status)
      ] }),
      /* @__PURE__ */ l("p", { style: { margin: 0, color: t("textSecondary"), fontSize: 14 }, children: x("该订单无法继续支付，请重新发起充值。") }),
      /* @__PURE__ */ l("button", { style: { ...qt, marginTop: 16 }, onClick: v, children: x("关闭") })
    ] }) }) }),
    /* @__PURE__ */ l("div", { style: br, children: e.length === 0 ? /* @__PURE__ */ l("p", { style: Sr, children: x("暂无充值记录") }) : /* @__PURE__ */ l("div", { style: xr, children: /* @__PURE__ */ y("table", { style: wr, children: [
      /* @__PURE__ */ l("thead", { children: /* @__PURE__ */ y("tr", { children: [
        /* @__PURE__ */ l("th", { style: Y, children: x("订单号") }),
        /* @__PURE__ */ l("th", { style: Y, children: x("金额") }),
        /* @__PURE__ */ l("th", { style: Y, children: x("支付方式") }),
        /* @__PURE__ */ l("th", { style: Y, children: x("状态") }),
        /* @__PURE__ */ l("th", { style: Y, children: x("创建时间") }),
        /* @__PURE__ */ l("th", { style: Y, children: x("支付时间") }),
        /* @__PURE__ */ l("th", { style: Y, children: x("操作") })
      ] }) }),
      /* @__PURE__ */ l("tbody", { children: e.map((b) => /* @__PURE__ */ y("tr", { children: [
        /* @__PURE__ */ l("td", { style: J, children: /* @__PURE__ */ l("code", { style: Ve, children: b.out_trade_no }) }),
        /* @__PURE__ */ l("td", { style: { ...J, fontWeight: 600 }, children: N(b.amount) }),
        /* @__PURE__ */ l("td", { style: J, children: $t(b.method) }),
        /* @__PURE__ */ l("td", { style: { ...J, color: mr(b.status), fontWeight: 600 }, children: Dt(b.status) }),
        /* @__PURE__ */ l("td", { style: { ...J, color: t("textSecondary") }, children: Ft(b.created_at) }),
        /* @__PURE__ */ l("td", { style: { ...J, color: t("textSecondary") }, children: b.paid_at ? Ft(b.paid_at) : "-" }),
        /* @__PURE__ */ l("td", { style: J, children: b.status === "pending" && (b.qr_code_content || b.payment_url) ? /* @__PURE__ */ l("button", { style: Tr, onClick: () => S(b), children: x("继续支付") }) : null })
      ] }, b.id)) })
    ] }) }) })
  ] });
}
function $t(e) {
  return { alipay: x("支付宝"), wxpay: x("微信支付") }[e] || e || "-";
}
function Dt(e) {
  return {
    pending: x("待支付"),
    paid: x("已支付"),
    expired: x("已过期"),
    failed: x("失败"),
    cancelled: x("已取消"),
    refunded: x("已退款")
  }[e] || e;
}
function mr(e) {
  return {
    pending: t("warning"),
    paid: t("success"),
    expired: t("textTertiary"),
    failed: t("danger"),
    cancelled: t("textTertiary"),
    refunded: t("textTertiary")
  }[e] || "inherit";
}
function Ft(e) {
  try {
    return new Date(e).toLocaleString();
  } catch {
    return e;
  }
}
const je = {
  maxWidth: 960,
  margin: "0 auto",
  padding: "24px 24px 48px",
  color: t("text")
}, Ut = {
  padding: "40px 0",
  textAlign: "center",
  color: t("textSecondary")
}, br = {
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusLg"),
  background: t("bgElevated"),
  padding: "8px 0",
  overflow: "hidden"
}, Sr = {
  color: t("textTertiary"),
  textAlign: "center",
  padding: "40px 0",
  fontSize: 14
}, xr = {
  overflowX: "auto"
}, wr = {
  width: "100%",
  borderCollapse: "collapse"
}, Y = {
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
}, J = {
  padding: "12px 16px",
  borderBottom: `1px solid ${t("glassBorder")}`,
  fontSize: 13,
  color: t("text"),
  whiteSpace: "nowrap"
}, Ve = {
  fontSize: 12,
  fontFamily: t("fontMono"),
  color: t("textSecondary")
}, vr = {
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
}, kr = {
  background: t("bgElevated"),
  borderRadius: t("radiusLg"),
  padding: "32px",
  textAlign: "center",
  minWidth: 320,
  maxWidth: 400,
  boxShadow: "0 8px 32px rgba(0,0,0,0.2)"
}, qt = {
  padding: "8px 24px",
  border: "none",
  borderRadius: t("radiusMd"),
  background: t("primary"),
  color: "#fff",
  fontSize: 14,
  cursor: "pointer"
}, Cr = {
  padding: "8px 24px",
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusMd"),
  background: "transparent",
  color: t("textSecondary"),
  fontSize: 14,
  cursor: "pointer"
}, Tr = {
  padding: "4px 12px",
  border: `1px solid ${t("primary")}`,
  borderRadius: t("radiusMd"),
  background: "transparent",
  color: t("primary"),
  fontSize: 12,
  cursor: "pointer",
  whiteSpace: "nowrap"
}, Wt = {
  total: 0,
  paid: 0,
  pending: 0,
  expired: 0,
  failed: 0,
  cancelled: 0,
  refunded: 0,
  total_amount_paid: 0,
  today_amount_paid: 0
}, Br = [10, 20, 50, 100], Er = [
  { value: "all", label: "全部状态" },
  { value: "pending", label: "待支付" },
  { value: "paid", label: "已支付" },
  { value: "expired", label: "已过期" },
  { value: "failed", label: "失败" },
  { value: "cancelled", label: "已取消" },
  { value: "refunded", label: "已退款" }
];
function Rr() {
  const [e, i] = z([]), [a, o] = z(0), [r, n] = z(Wt), [s, c] = z(!0), [d, u] = z(null), [f, h] = z("all"), [S, v] = z(""), [b, R] = z(1), [p, g] = z(20), I = ne(() => {
    c(!0), u(null), $.adminListOrders({ page: b, pageSize: p, email: S, status: f }).then((k) => {
      i(k.list || []), o(k.total || 0), n(k.stats || Wt);
    }).catch((k) => u(String((k == null ? void 0 : k.message) || k))).finally(() => c(!1));
  }, [b, p, S, f]);
  F(() => {
    const L = setTimeout(I, S ? 300 : 0);
    return () => clearTimeout(L);
  }, [I, S]), F(() => {
    R(1);
  }, [f, S, p]);
  const w = Math.max(1, Math.ceil(a / p));
  return /* @__PURE__ */ y("div", { style: Lr, children: [
    /* @__PURE__ */ y("div", { style: Nr, children: [
      /* @__PURE__ */ l(te, { label: "总订单数", value: r.total }),
      /* @__PURE__ */ l(te, { label: "已支付", value: r.paid, accent: t("success") }),
      /* @__PURE__ */ l(te, { label: "待支付", value: r.pending, accent: t("warning") }),
      /* @__PURE__ */ l(te, { label: "已过期", value: r.expired }),
      /* @__PURE__ */ l(te, { label: "累计收款", value: N(r.total_amount_paid), accent: t("success") }),
      /* @__PURE__ */ l(te, { label: "今日收款", value: N(r.today_amount_paid), accent: t("success") })
    ] }),
    /* @__PURE__ */ y("div", { style: Ur, children: [
      /* @__PURE__ */ y("div", { style: qr, children: [
        /* @__PURE__ */ l(
          cn,
          {
            value: f,
            onChange: h,
            options: Er,
            style: Wr
          }
        ),
        /* @__PURE__ */ l(
          "input",
          {
            type: "text",
            value: S,
            onChange: (k) => v(k.target.value),
            placeholder: "搜索用户邮箱",
            style: { ...Qr, width: 240 }
          }
        ),
        /* @__PURE__ */ l(Ar, { onClick: I, loading: s })
      ] }),
      d ? /* @__PURE__ */ y("p", { style: { ...Ke, color: t("danger") }, children: [
        "加载失败: ",
        d
      ] }) : s && e.length === 0 ? /* @__PURE__ */ l("p", { style: Ke, children: "加载中..." }) : e.length === 0 ? /* @__PURE__ */ l("p", { style: Ke, children: "暂无订单" }) : /* @__PURE__ */ l("div", { style: Xr, children: /* @__PURE__ */ y("table", { style: Zr, children: [
        /* @__PURE__ */ l("thead", { children: /* @__PURE__ */ y("tr", { children: [
          /* @__PURE__ */ l("th", { style: j, children: "订单号" }),
          /* @__PURE__ */ l("th", { style: j, children: "用户邮箱" }),
          /* @__PURE__ */ l("th", { style: j, children: "金额" }),
          /* @__PURE__ */ l("th", { style: j, children: "支付方式" }),
          /* @__PURE__ */ l("th", { style: j, children: "服务商" }),
          /* @__PURE__ */ l("th", { style: j, children: "状态" }),
          /* @__PURE__ */ l("th", { style: j, children: "创建时间" }),
          /* @__PURE__ */ l("th", { style: j, children: "支付时间" })
        ] }) }),
        /* @__PURE__ */ l("tbody", { children: e.map((k) => /* @__PURE__ */ y("tr", { children: [
          /* @__PURE__ */ l("td", { style: V, children: /* @__PURE__ */ l("code", { style: eo, children: k.out_trade_no }) }),
          /* @__PURE__ */ l("td", { style: V, children: k.user_email ? /* @__PURE__ */ l("span", { style: { color: t("text") }, children: k.user_email }) : /* @__PURE__ */ y("span", { style: { color: t("textTertiary") }, children: [
            "#",
            k.user_id
          ] }) }),
          /* @__PURE__ */ l("td", { style: { ...V, fontWeight: 600 }, children: N(k.amount) }),
          /* @__PURE__ */ l("td", { style: V, children: Ir(k.method) }),
          /* @__PURE__ */ l("td", { style: { ...V, color: t("textSecondary") }, children: k.provider_id || "-" }),
          /* @__PURE__ */ l("td", { style: { ...V, color: Mr(k.status), fontWeight: 600 }, children: Pr(k.status) }),
          /* @__PURE__ */ l("td", { style: { ...V, color: t("textSecondary") }, children: Ot(k.created_at) }),
          /* @__PURE__ */ l("td", { style: { ...V, color: t("textSecondary") }, children: k.paid_at ? Ot(k.paid_at) : "-" })
        ] }, k.id)) })
      ] }) }),
      /* @__PURE__ */ l(
        _r,
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
  return /* @__PURE__ */ y("div", { style: $r, children: [
    /* @__PURE__ */ l("div", { style: Dr, children: e }),
    /* @__PURE__ */ l("div", { style: { ...Fr, color: a || t("text") }, children: i })
  ] });
}
function Ir(e) {
  return { alipay: "支付宝", wxpay: "微信支付" }[e] || e || "-";
}
function Pr(e) {
  return {
    pending: "待支付",
    paid: "已支付",
    expired: "已过期",
    failed: "失败",
    cancelled: "已取消",
    refunded: "已退款"
  }[e] || e;
}
function Mr(e) {
  return {
    pending: t("warning"),
    paid: t("success"),
    expired: t("textTertiary"),
    failed: t("danger"),
    cancelled: t("textTertiary"),
    refunded: t("textTertiary")
  }[e] || "inherit";
}
function Ot(e) {
  try {
    return new Date(e).toLocaleString();
  } catch {
    return e;
  }
}
function Ar({ onClick: e, loading: i }) {
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
function cn({
  value: e,
  options: i,
  onChange: a,
  style: o
}) {
  const [r, n] = z(!1), s = se(null), c = i.find((d) => d.value === e);
  return F(() => {
    if (!r) return;
    const d = (u) => {
      s.current && !s.current.contains(u.target) && n(!1);
    };
    return document.addEventListener("mousedown", d), () => document.removeEventListener("mousedown", d);
  }, [r]), /* @__PURE__ */ y("div", { ref: s, style: Or, children: [
    /* @__PURE__ */ y(
      "button",
      {
        type: "button",
        style: { ...o, ...Hr, ...r ? jr : null },
        "aria-haspopup": "listbox",
        "aria-expanded": r,
        onClick: () => n((d) => !d),
        children: [
          /* @__PURE__ */ l("span", { style: Vr, children: (c == null ? void 0 : c.label) ?? "" }),
          /* @__PURE__ */ l("span", { "aria-hidden": "true", style: Kr, children: "v" })
        ]
      }
    ),
    r && /* @__PURE__ */ l("div", { role: "listbox", style: Gr, children: i.map((d) => {
      const u = d.value === e;
      return /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          role: "option",
          "aria-selected": u,
          style: { ...Yr, ...u ? Jr : null },
          onClick: () => {
            a(d.value), n(!1);
          },
          children: d.label
        },
        d.value
      );
    }) })
  ] });
}
function _r({ page: e, pageSize: i, total: a, totalPages: o, onPageChange: r, onPageSizeChange: n }) {
  const s = zr(e, o);
  return /* @__PURE__ */ y("div", { style: to, children: [
    /* @__PURE__ */ y("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
      /* @__PURE__ */ y("span", { style: no, children: [
        "共 ",
        a,
        " 条 · 第 ",
        e,
        "/",
        o,
        " 页"
      ] }),
      /* @__PURE__ */ l(
        cn,
        {
          value: String(i),
          onChange: (c) => n(Number(c)),
          options: Br.map((c) => ({ value: String(c), label: `${c} 条/页` })),
          style: ro
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
        (c, d) => c === "..." ? /* @__PURE__ */ l("span", { style: io, children: "···" }, `e-${d}`) : /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            style: c === e ? oo : un,
            onClick: () => r(c),
            children: c
          },
          c
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
function zr(e, i) {
  if (i <= 7) return Array.from({ length: i }, (o, r) => r + 1);
  const a = [1];
  e > 3 && a.push("...");
  for (let o = Math.max(2, e - 1); o <= Math.min(i - 1, e + 1); o++)
    a.push(o);
  return e < i - 2 && a.push("..."), a.push(i), a;
}
const Lr = {
  maxWidth: 1280,
  margin: "0 auto",
  padding: "24px 24px 48px",
  color: t("text")
}, Nr = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  gap: 12,
  marginBottom: 20
}, $r = {
  padding: "18px 20px",
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusLg"),
  background: t("bgSurface")
}, Dr = {
  fontSize: 12,
  color: t("textSecondary"),
  fontWeight: 500,
  letterSpacing: "0.02em"
}, Fr = {
  fontSize: 26,
  fontWeight: 700,
  marginTop: 8,
  letterSpacing: "-0.02em"
}, Ur = {
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusLg"),
  background: t("bgSurface"),
  padding: "20px 20px 8px"
}, qr = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  marginBottom: 16,
  flexWrap: "wrap"
}, Wr = {
  padding: "8px 12px",
  minWidth: 140,
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusMd"),
  background: t("bgElevated"),
  color: t("text"),
  fontSize: 13
}, Or = {
  position: "relative",
  display: "inline-block"
}, Hr = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 8,
  width: "100%",
  fontFamily: "inherit",
  cursor: "pointer",
  outline: "none"
}, jr = {
  borderColor: t("primary"),
  boxShadow: `0 0 0 3px ${t("primarySubtle")}`
}, Vr = {
  minWidth: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
}, Kr = {
  flexShrink: 0,
  color: t("textTertiary"),
  fontSize: 10,
  lineHeight: 1
}, Gr = {
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
}, Yr = {
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
}, Jr = {
  background: t("primarySubtle"),
  color: t("primary"),
  fontWeight: 600
}, Qr = {
  padding: "8px 12px",
  width: 200,
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusMd"),
  background: t("bgElevated"),
  color: t("text"),
  fontSize: 13,
  outline: "none"
}, Ke = {
  color: t("textTertiary"),
  textAlign: "center",
  padding: "40px 0",
  fontSize: 14
}, Xr = {
  overflowX: "auto",
  margin: "0 -20px"
}, Zr = {
  width: "100%",
  borderCollapse: "collapse"
}, j = {
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
}, eo = {
  fontSize: 12,
  fontFamily: t("fontMono"),
  color: t("textSecondary")
}, to = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "14px 4px 6px",
  flexWrap: "wrap",
  gap: 12
}, no = {
  fontSize: 12,
  color: t("textTertiary"),
  fontFamily: t("fontMono")
}, ro = {
  fontSize: 12,
  color: t("textSecondary"),
  background: "transparent",
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: 6,
  padding: "2px 8px",
  cursor: "pointer",
  outline: "none"
}, un = {
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
}, oo = {
  ...un,
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
const io = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 28,
  color: t("textTertiary"),
  fontSize: 12
};
let ao = 0;
function gn() {
  const [e, i] = z([]), a = se(i);
  a.current = i;
  const o = ne((c) => {
    a.current((d) => d.filter((u) => u.id !== c));
  }, []), r = ne((c, d) => {
    const u = ao++;
    a.current((f) => [...f, { id: u, type: c, text: d }]), setTimeout(() => o(u), 4e3);
  }, [o]), n = ne((c) => r("success", c), [r]), s = ne((c) => r("error", c), [r]);
  return {
    toast: { success: n, error: s },
    Toaster: /* @__PURE__ */ l(lo, { messages: e, onClose: o })
  };
}
function lo({
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
  }, []), e.length === 0 ? null : /* @__PURE__ */ l("div", { style: co, children: e.map((a) => /* @__PURE__ */ l(so, { message: a, onClose: () => i(a.id) }, a.id)) });
}
function so({
  message: e,
  onClose: i
}) {
  const a = e.type === "success", o = t(a ? "success" : "danger"), r = t(a ? "success" : "danger");
  return /* @__PURE__ */ y(
    "div",
    {
      style: {
        ...uo,
        borderColor: r
      },
      children: [
        /* @__PURE__ */ l("span", { style: { ...go, color: o }, children: a ? "✓" : "✕" }),
        /* @__PURE__ */ l("span", { style: { ...ho, color: t("text") }, children: e.text }),
        /* @__PURE__ */ l("button", { onClick: i, style: fo, "aria-label": x("关闭"), children: "×" })
      ]
    }
  );
}
const co = {
  position: "fixed",
  top: 20,
  right: 20,
  zIndex: 1e4,
  display: "flex",
  flexDirection: "column",
  gap: 10,
  pointerEvents: "none"
}, uo = {
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
}, go = {
  fontSize: 16,
  fontWeight: 700,
  width: 18,
  textAlign: "center",
  flexShrink: 0
}, ho = {
  flex: 1,
  fontSize: 13,
  lineHeight: 1.4
}, fo = {
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
function hn(e, i) {
  var o;
  const a = window;
  return (o = a.airgate) != null && o.confirm ? a.airgate.confirm(e, i) : Promise.resolve(window.confirm(e));
}
function po() {
  const [e, i] = z([]), [a, o] = z([]), [r, n] = z(!0), [s, c] = z(null), [d, u] = z(null), { toast: f, Toaster: h } = gn(), S = ne(() => {
    n(!0), c(null), $.adminListProviders().then((g) => {
      i(g.providers || []), o(g.kinds || []);
    }).catch((g) => c(String((g == null ? void 0 : g.message) || g))).finally(() => n(!1));
  }, []);
  F(S, [S]);
  const v = (g) => {
    u({
      mode: "create",
      id: "",
      kind: g.kind,
      enabled: !0,
      config: bo(g)
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
    if (await hn(`确认删除服务商 ${g}？此操作无法撤销。`, { title: "删除服务商", danger: !0 }))
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
  return r ? /* @__PURE__ */ l("div", { style: Ye, children: /* @__PURE__ */ l("div", { style: jt, children: "加载中..." }) }) : s ? /* @__PURE__ */ l("div", { style: Ye, children: /* @__PURE__ */ y("div", { style: { ...jt, color: t("danger") }, children: [
    "加载失败: ",
    s
  ] }) }) : /* @__PURE__ */ y("div", { style: Ye, children: [
    h,
    /* @__PURE__ */ y("div", { style: Kt, children: [
      /* @__PURE__ */ l("h3", { style: Vt, children: "添加服务商" }),
      /* @__PURE__ */ l("p", { style: So, children: "每种类型的服务商可以创建多个实例（例如 xunhu_main / xunhu_backup），便于多商户号或主备切换。" }),
      /* @__PURE__ */ l("div", { style: xo, children: a.map((g) => /* @__PURE__ */ y("div", { style: wo, children: [
        /* @__PURE__ */ l("div", { style: { fontWeight: 600, color: t("text"), fontSize: 15 }, children: g.name }),
        /* @__PURE__ */ l("div", { style: { fontSize: 12, color: t("textSecondary"), marginTop: 6 }, children: g.description }),
        /* @__PURE__ */ y("div", { style: { fontSize: 12, color: t("textTertiary"), marginTop: 8 }, children: [
          "支持: ",
          g.supported_methods.map(Xe).join(" / ")
        ] }),
        /* @__PURE__ */ l("button", { style: { ...pn, marginTop: 12, width: "100%" }, onClick: () => v(g), children: "+ 添加" })
      ] }, g.kind)) })
    ] }),
    /* @__PURE__ */ y("div", { style: Kt, children: [
      /* @__PURE__ */ l("h3", { style: Vt, children: "已配置的服务商实例" }),
      e.length === 0 ? /* @__PURE__ */ l("p", { style: Co, children: "暂未配置任何服务商。请在上方点「+ 添加」选择类型。" }) : /* @__PURE__ */ l("div", { style: vo, children: e.map((g) => /* @__PURE__ */ y("div", { style: ko, children: [
        /* @__PURE__ */ y("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" }, children: [
          /* @__PURE__ */ y("div", { children: [
            /* @__PURE__ */ l("div", { style: { fontWeight: 600, color: t("text"), fontSize: 15 }, children: g.name || g.id }),
            /* @__PURE__ */ y("div", { style: { fontSize: 12, color: t("textTertiary"), marginTop: 4, fontFamily: t("fontMono") }, children: [
              g.id,
              " · ",
              g.kind
            ] })
          ] }),
          /* @__PURE__ */ l("span", { style: g.is_running ? fn : To, children: g.is_running ? "运行中" : g.enabled ? "已启用未就绪" : "已禁用" })
        ] }),
        /* @__PURE__ */ y("div", { style: { fontSize: 12, color: t("textSecondary"), marginTop: 12 }, children: [
          "支持: ",
          g.supported_methods.map(Xe).join(" / ")
        ] }),
        /* @__PURE__ */ y("div", { style: { display: "flex", gap: 8, marginTop: 16 }, children: [
          /* @__PURE__ */ l("button", { style: fe, onClick: () => b(g), children: "编辑" }),
          /* @__PURE__ */ l("button", { style: fe, onClick: () => p(g), children: g.enabled ? "禁用" : "启用" }),
          /* @__PURE__ */ l("button", { style: { ...fe, color: t("danger") }, onClick: () => R(g.id), children: "删除" })
        ] })
      ] }, g.id)) })
    ] }),
    d && /* @__PURE__ */ l(
      yo,
      {
        editing: d,
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
function yo({
  editing: e,
  kinds: i,
  onCancel: a,
  onSaved: o,
  onError: r
}) {
  const [n, s] = z(e), [c, d] = z(!1), u = Sn(() => i.find((h) => h.kind === n.kind), [i, n.kind]), f = async () => {
    if (!u) {
      r("未知的服务商类型");
      return;
    }
    for (const h of u.field_descriptors)
      if (h.required && !n.config[h.key]) {
        r(`「${h.label}」必填`);
        return;
      }
    if (!(n.mode === "edit" && n.originalId && n.id.trim() !== n.originalId && !await hn(
      `确认将实例 ID 从「${n.originalId}」重命名为「${n.id.trim()}」？

所有历史订单的 provider_id 引用会在事务里同步更新；如果该商户号在第三方支付平台已经下过单，
已发出去的回调地址（含原 ID）会失效——平台未来回调请求会路由不到本服务。`,
      { title: "重命名服务商 ID", danger: !0 }
    ))) {
      d(!0);
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
        d(!1);
      }
    }
  };
  return /* @__PURE__ */ l("div", { style: Ro, onClick: a, children: /* @__PURE__ */ y("div", { style: Io, onClick: (h) => h.stopPropagation(), children: [
    /* @__PURE__ */ y("div", { style: Po, children: [
      /* @__PURE__ */ y("h3", { style: { margin: 0, fontSize: 16, fontWeight: 600 }, children: [
        n.mode === "create" ? "添加" : "编辑",
        "服务商 - ",
        (u == null ? void 0 : u.name) || n.kind
      ] }),
      /* @__PURE__ */ l("button", { style: Mo, onClick: a, children: "×" })
    ] }),
    /* @__PURE__ */ y("div", { style: Ao, children: [
      /* @__PURE__ */ l(
        Ge,
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
              style: { ...Je, fontFamily: t("fontMono"), fontSize: 12 }
            }
          )
        }
      ),
      /* @__PURE__ */ l(Ge, { label: "启用", children: /* @__PURE__ */ y("label", { style: { display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }, children: [
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
      u == null ? void 0 : u.field_descriptors.map((h) => /* @__PURE__ */ l(Ge, { label: h.label, description: h.description, required: h.required, children: h.type === "textarea" ? /* @__PURE__ */ l(
        "textarea",
        {
          value: n.config[h.key] || "",
          onChange: (S) => s({ ...n, config: { ...n.config, [h.key]: S.target.value } }),
          placeholder: h.placeholder,
          style: { ...Je, minHeight: 120, fontFamily: t("fontMono"), fontSize: 12 }
        }
      ) : h.type === "bool" ? /* @__PURE__ */ l("label", { style: { display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }, children: /* @__PURE__ */ l(
        "input",
        {
          type: "checkbox",
          checked: n.config[h.key] === "true",
          onChange: (S) => s({ ...n, config: { ...n.config, [h.key]: S.target.checked ? "true" : "false" } })
        }
      ) }) : h.type === "method-multi" ? /* @__PURE__ */ l(
        mo,
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
          style: Je
        }
      ) }, h.key))
    ] }),
    /* @__PURE__ */ y("div", { style: _o, children: [
      /* @__PURE__ */ l("button", { style: fe, onClick: a, disabled: c, children: "取消" }),
      /* @__PURE__ */ l("button", { style: pn, onClick: f, disabled: c, children: c ? "保存中..." : "保存" })
    ] })
  ] }) });
}
function mo({
  candidates: e,
  value: i,
  onChange: a
}) {
  const o = new Set(i.split(",").map((n) => n.trim()).filter(Boolean)), r = (n) => {
    o.has(n) ? o.delete(n) : o.add(n);
    const s = e.filter((c) => o.has(c)).join(",");
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
            Xe(n)
          ]
        },
        n
      );
    }),
    e.length === 0 && /* @__PURE__ */ l("span", { style: { fontSize: 12, color: t("textTertiary") }, children: "该协议没有可选的支付方式" })
  ] });
}
function Ge({
  label: e,
  description: i,
  required: a,
  children: o
}) {
  return /* @__PURE__ */ y("div", { style: { marginBottom: 16 }, children: [
    /* @__PURE__ */ y("label", { style: Bo, children: [
      e,
      a && /* @__PURE__ */ l("span", { style: { color: t("danger"), marginLeft: 4 }, children: "*" })
    ] }),
    o,
    i && /* @__PURE__ */ l("div", { style: Eo, children: i })
  ] });
}
function Xe(e) {
  return { alipay: "支付宝", wxpay: "微信支付" }[e] || e;
}
function bo(e) {
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
}, jt = {
  padding: "40px 0",
  textAlign: "center",
  color: t("textSecondary")
}, So = {
  margin: "4px 0 16px",
  fontSize: 13,
  color: t("textSecondary")
}, Vt = {
  margin: "0 0 12px",
  fontSize: 14,
  fontWeight: 600,
  color: t("text"),
  textTransform: "uppercase",
  letterSpacing: "0.04em"
}, Kt = {
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusLg"),
  background: t("bgSurface"),
  padding: 20,
  marginBottom: 20
}, xo = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
  gap: 12
}, wo = {
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusMd"),
  padding: 16,
  background: t("bgElevated")
}, vo = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
  gap: 12
}, ko = {
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusMd"),
  padding: 16,
  background: t("bgElevated")
}, Co = {
  color: t("textTertiary"),
  textAlign: "center",
  padding: "24px 0",
  fontSize: 14
}, fn = {
  padding: "2px 8px",
  borderRadius: 4,
  background: t("successSubtle"),
  color: t("success"),
  fontSize: 11,
  fontWeight: 600
}, To = {
  ...fn,
  background: t("warningSubtle"),
  color: t("warning")
}, fe = {
  padding: "6px 14px",
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusMd"),
  background: "transparent",
  color: t("text"),
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 500
}, pn = {
  padding: "8px 16px",
  border: "none",
  borderRadius: t("radiusMd"),
  background: t("primary"),
  color: t("textInverse"),
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 600
}, Je = {
  width: "100%",
  padding: "8px 12px",
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusMd"),
  background: t("bgElevated"),
  color: t("text"),
  fontSize: 13,
  boxSizing: "border-box"
}, Bo = {
  display: "block",
  fontSize: 12,
  fontWeight: 600,
  color: t("textSecondary"),
  marginBottom: 6,
  textTransform: "uppercase",
  letterSpacing: "0.03em"
}, Eo = {
  marginTop: 6,
  fontSize: 11,
  color: t("textTertiary")
}, Ro = {
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
}, Io = {
  width: 600,
  maxWidth: "92vw",
  maxHeight: "90vh",
  display: "flex",
  flexDirection: "column",
  background: t("bgSurface"),
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusLg"),
  overflow: "hidden"
}, Po = {
  padding: "16px 20px",
  borderBottom: `1px solid ${t("glassBorder")}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
}, Mo = {
  background: "transparent",
  border: "none",
  color: t("textSecondary"),
  fontSize: 24,
  cursor: "pointer",
  lineHeight: 1
}, Ao = {
  padding: 20,
  overflowY: "auto",
  flex: 1
}, _o = {
  padding: "12px 20px",
  borderTop: `1px solid ${t("glassBorder")}`,
  display: "flex",
  justifyContent: "flex-end",
  gap: 8
};
function zo() {
  const { toast: e, Toaster: i } = gn(), [a, o] = z([]), [r, n] = z(!0), [s, c] = z(!1), [d, u] = z(null), f = () => {
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
    if (!d) return;
    const p = Number(d.amount), g = Number(d.bonus);
    if (!p || p <= 0) {
      e.error("套餐金额必须大于 0");
      return;
    }
    if (g < 0 || Number.isNaN(g)) {
      e.error("赠送额度不能为负数");
      return;
    }
    c(!0);
    try {
      await $.adminUpsertPackage({
        id: d.id,
        amount: p,
        bonus_amount: g,
        title: d.title.trim(),
        enabled: d.enabled,
        sort_order: Number(d.sort) || 0
      }), e.success(d.id ? "套餐已更新" : "套餐已创建"), u(null), f();
    } catch (I) {
      e.error(String(I.message || I));
    } finally {
      c(!1);
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
  return /* @__PURE__ */ y("div", { style: Lo, children: [
    i,
    /* @__PURE__ */ y("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }, children: [
      /* @__PURE__ */ y("div", { children: [
        /* @__PURE__ */ l("h2", { style: No, children: "充值套餐" }),
        /* @__PURE__ */ l("p", { style: { margin: "4px 0 0", color: t("textSecondary"), fontSize: 13 }, children: "用户点选套餐档才享赠送；自定义金额充值不参与。赠送在支付成功后以独立流水入账。" })
      ] }),
      /* @__PURE__ */ l("button", { style: Yt, onClick: h, children: "新增套餐" })
    ] }),
    d && /* @__PURE__ */ y("div", { style: { ...Gt, marginBottom: 20 }, children: [
      /* @__PURE__ */ l("h3", { style: $o, children: d.id ? `编辑套餐 #${d.id}` : "新增套餐" }),
      /* @__PURE__ */ y("div", { style: { display: "flex", flexWrap: "wrap", gap: 16, alignItems: "flex-end" }, children: [
        /* @__PURE__ */ y("label", { style: ie, children: [
          /* @__PURE__ */ l("span", { style: ae, children: "充值金额（$）" }),
          /* @__PURE__ */ l("input", { type: "number", min: 1, value: d.amount, onChange: (p) => u({ ...d, amount: p.target.value }), style: he })
        ] }),
        /* @__PURE__ */ y("label", { style: ie, children: [
          /* @__PURE__ */ l("span", { style: ae, children: "赠送额度（$）" }),
          /* @__PURE__ */ l("input", { type: "number", min: 0, value: d.bonus, onChange: (p) => u({ ...d, bonus: p.target.value }), style: he })
        ] }),
        /* @__PURE__ */ y("label", { style: ie, children: [
          /* @__PURE__ */ l("span", { style: ae, children: "标题（可选，按钮悬浮提示）" }),
          /* @__PURE__ */ l("input", { type: "text", maxLength: 64, value: d.title, placeholder: "如：限时特惠", onChange: (p) => u({ ...d, title: p.target.value }), style: { ...he, width: 200 } })
        ] }),
        /* @__PURE__ */ y("label", { style: ie, children: [
          /* @__PURE__ */ l("span", { style: ae, children: "排序（小在前）" }),
          /* @__PURE__ */ l("input", { type: "number", value: d.sort, onChange: (p) => u({ ...d, sort: p.target.value }), style: { ...he, width: 90 } })
        ] }),
        /* @__PURE__ */ y("label", { style: { ...ie, flexDirection: "row", alignItems: "center", gap: 8 }, children: [
          /* @__PURE__ */ l("input", { type: "checkbox", checked: d.enabled, onChange: (p) => u({ ...d, enabled: p.target.checked }) }),
          /* @__PURE__ */ l("span", { style: ae, children: "启用" })
        ] }),
        /* @__PURE__ */ y("div", { style: { display: "flex", gap: 8 }, children: [
          /* @__PURE__ */ l("button", { style: { ...Yt, opacity: s ? 0.6 : 1 }, disabled: s, onClick: v, children: s ? "保存中..." : "保存" }),
          /* @__PURE__ */ l("button", { style: Do, onClick: () => u(null), children: "取消" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ l("div", { style: Gt, children: r ? /* @__PURE__ */ l("p", { style: { margin: 0, color: t("textSecondary"), textAlign: "center", padding: "24px 0" }, children: "加载中..." }) : a.length === 0 ? /* @__PURE__ */ l("p", { style: { margin: 0, color: t("textSecondary"), textAlign: "center", padding: "24px 0" }, children: "暂无套餐。点击右上角「新增套餐」创建第一个优惠档（用户端在配置前显示默认金额档）。" }) : /* @__PURE__ */ y("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 13 }, children: [
      /* @__PURE__ */ l("thead", { children: /* @__PURE__ */ l("tr", { children: ["ID", "充值金额", "赠送", "用户实得", "标题", "排序", "状态", "操作"].map((p) => /* @__PURE__ */ l("th", { style: Fo, children: p }, p)) }) }),
      /* @__PURE__ */ l("tbody", { children: a.map((p) => /* @__PURE__ */ y("tr", { children: [
        /* @__PURE__ */ l("td", { style: K, children: p.id }),
        /* @__PURE__ */ l("td", { style: { ...K, fontWeight: 600 }, children: N(p.amount) }),
        /* @__PURE__ */ l("td", { style: { ...K, color: p.bonus_amount > 0 ? t("success") : t("textTertiary") }, children: p.bonus_amount > 0 ? `+${N(p.bonus_amount)}` : "—" }),
        /* @__PURE__ */ l("td", { style: K, children: N(p.amount + p.bonus_amount) }),
        /* @__PURE__ */ l("td", { style: { ...K, color: t("textSecondary") }, children: p.title || "—" }),
        /* @__PURE__ */ l("td", { style: K, children: p.sort_order }),
        /* @__PURE__ */ l("td", { style: K, children: /* @__PURE__ */ l("span", { style: p.enabled ? Uo : qo, children: p.enabled ? "启用中" : "已停用" }) }),
        /* @__PURE__ */ l("td", { style: K, children: /* @__PURE__ */ y("div", { style: { display: "flex", gap: 8 }, children: [
          /* @__PURE__ */ l("button", { style: Qe, onClick: () => S(p), children: "编辑" }),
          /* @__PURE__ */ l("button", { style: Qe, onClick: () => b(p), children: p.enabled ? "停用" : "启用" }),
          /* @__PURE__ */ l("button", { style: { ...Qe, color: t("danger") }, onClick: () => R(p), children: "删除" })
        ] }) })
      ] }, p.id)) })
    ] }) })
  ] });
}
const Lo = {
  maxWidth: 960,
  margin: "0 auto",
  padding: "24px 24px 48px",
  color: t("text")
}, No = {
  margin: 0,
  fontSize: 22,
  fontWeight: 600,
  letterSpacing: "-0.01em"
}, Gt = {
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusLg"),
  background: t("bgSurface"),
  padding: "20px 24px"
}, $o = {
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
}, he = {
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
}, Do = {
  padding: "10px 20px",
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusMd"),
  background: t("bgElevated"),
  color: t("text"),
  fontSize: 13,
  fontWeight: 500,
  cursor: "pointer",
  transition: t("transition")
}, Qe = {
  padding: 0,
  border: "none",
  background: "none",
  color: t("primary"),
  fontSize: 13,
  cursor: "pointer"
}, Fo = {
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
}, Uo = {
  fontSize: 12,
  fontWeight: 600,
  padding: "2px 10px",
  borderRadius: 999,
  background: t("primarySubtle"),
  color: t("primary")
}, qo = {
  fontSize: 12,
  fontWeight: 600,
  padding: "2px 10px",
  borderRadius: 999,
  background: t("bgElevated"),
  color: t("textTertiary")
}, Ho = {
  routes: [
    { path: "/recharge", component: rr },
    { path: "/orders", component: yr },
    { path: "/admin/orders", component: Rr },
    { path: "/admin/providers", component: po },
    { path: "/admin/packages", component: zo }
  ]
};
export {
  Ho as default
};
