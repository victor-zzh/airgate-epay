import { jsx as s, jsxs as b, Fragment as ae } from "react/jsx-runtime";
import { useState as P, useRef as ce, useEffect as z, useCallback as ee, useMemo as an } from "react";
function sn(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var X = {}, pe, Xe;
function cn() {
  return Xe || (Xe = 1, pe = function() {
    return typeof Promise == "function" && Promise.prototype && Promise.prototype.then;
  }), pe;
}
var ye = {}, H = {}, Ze;
function Y() {
  if (Ze) return H;
  Ze = 1;
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
  return H.getSymbolSize = function(r) {
    if (!r) throw new Error('"version" cannot be null or undefined');
    if (r < 1 || r > 40) throw new Error('"version" should be in range from 1 to 40');
    return r * 4 + 17;
  }, H.getSymbolTotalCodewords = function(r) {
    return i[r];
  }, H.getBCHDigit = function(l) {
    let r = 0;
    for (; l !== 0; )
      r++, l >>>= 1;
    return r;
  }, H.setToSJISFunction = function(r) {
    if (typeof r != "function")
      throw new Error('"toSJISFunc" is not a valid function.');
    e = r;
  }, H.isKanjiModeEnabled = function() {
    return typeof e < "u";
  }, H.toSJIS = function(r) {
    return e(r);
  }, H;
}
var me = {}, et;
function Ke() {
  return et || (et = 1, (function(e) {
    e.L = { bit: 1 }, e.M = { bit: 0 }, e.Q = { bit: 3 }, e.H = { bit: 2 };
    function i(l) {
      if (typeof l != "string")
        throw new Error("Param is not a string");
      switch (l.toLowerCase()) {
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
          throw new Error("Unknown EC Level: " + l);
      }
    }
    e.isValid = function(r) {
      return r && typeof r.bit < "u" && r.bit >= 0 && r.bit < 4;
    }, e.from = function(r, n) {
      if (e.isValid(r))
        return r;
      try {
        return i(r);
      } catch {
        return n;
      }
    };
  })(me)), me;
}
var be, tt;
function dn() {
  if (tt) return be;
  tt = 1;
  function e() {
    this.buffer = [], this.length = 0;
  }
  return e.prototype = {
    get: function(i) {
      const l = Math.floor(i / 8);
      return (this.buffer[l] >>> 7 - i % 8 & 1) === 1;
    },
    put: function(i, l) {
      for (let r = 0; r < l; r++)
        this.putBit((i >>> l - r - 1 & 1) === 1);
    },
    getLengthInBits: function() {
      return this.length;
    },
    putBit: function(i) {
      const l = Math.floor(this.length / 8);
      this.buffer.length <= l && this.buffer.push(0), i && (this.buffer[l] |= 128 >>> this.length % 8), this.length++;
    }
  }, be = e, be;
}
var Se, nt;
function un() {
  if (nt) return Se;
  nt = 1;
  function e(i) {
    if (!i || i < 1)
      throw new Error("BitMatrix size must be defined and greater than 0");
    this.size = i, this.data = new Uint8Array(i * i), this.reservedBit = new Uint8Array(i * i);
  }
  return e.prototype.set = function(i, l, r, n) {
    const t = i * this.size + l;
    this.data[t] = r, n && (this.reservedBit[t] = !0);
  }, e.prototype.get = function(i, l) {
    return this.data[i * this.size + l];
  }, e.prototype.xor = function(i, l, r) {
    this.data[i * this.size + l] ^= r;
  }, e.prototype.isReserved = function(i, l) {
    return this.reservedBit[i * this.size + l];
  }, Se = e, Se;
}
var xe = {}, rt;
function fn() {
  return rt || (rt = 1, (function(e) {
    const i = Y().getSymbolSize;
    e.getRowColCoords = function(r) {
      if (r === 1) return [];
      const n = Math.floor(r / 7) + 2, t = i(r), a = t === 145 ? 26 : Math.ceil((t - 13) / (2 * n - 2)) * 2, c = [t - 7];
      for (let d = 1; d < n - 1; d++)
        c[d] = c[d - 1] - a;
      return c.push(6), c.reverse();
    }, e.getPositions = function(r) {
      const n = [], t = e.getRowColCoords(r), a = t.length;
      for (let c = 0; c < a; c++)
        for (let d = 0; d < a; d++)
          c === 0 && d === 0 || // top-left
          c === 0 && d === a - 1 || // bottom-left
          c === a - 1 && d === 0 || n.push([t[c], t[d]]);
      return n;
    };
  })(xe)), xe;
}
var we = {}, ot;
function gn() {
  if (ot) return we;
  ot = 1;
  const e = Y().getSymbolSize, i = 7;
  return we.getPositions = function(r) {
    const n = e(r);
    return [
      // top-left
      [0, 0],
      // top-right
      [n - i, 0],
      // bottom-left
      [0, n - i]
    ];
  }, we;
}
var ve = {}, it;
function hn() {
  return it || (it = 1, (function(e) {
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
    e.isValid = function(n) {
      return n != null && n !== "" && !isNaN(n) && n >= 0 && n <= 7;
    }, e.from = function(n) {
      return e.isValid(n) ? parseInt(n, 10) : void 0;
    }, e.getPenaltyN1 = function(n) {
      const t = n.size;
      let a = 0, c = 0, d = 0, f = null, p = null;
      for (let h = 0; h < t; h++) {
        c = d = 0, f = p = null;
        for (let y = 0; y < t; y++) {
          let S = n.get(h, y);
          S === f ? c++ : (c >= 5 && (a += i.N1 + (c - 5)), f = S, c = 1), S = n.get(y, h), S === p ? d++ : (d >= 5 && (a += i.N1 + (d - 5)), p = S, d = 1);
        }
        c >= 5 && (a += i.N1 + (c - 5)), d >= 5 && (a += i.N1 + (d - 5));
      }
      return a;
    }, e.getPenaltyN2 = function(n) {
      const t = n.size;
      let a = 0;
      for (let c = 0; c < t - 1; c++)
        for (let d = 0; d < t - 1; d++) {
          const f = n.get(c, d) + n.get(c, d + 1) + n.get(c + 1, d) + n.get(c + 1, d + 1);
          (f === 4 || f === 0) && a++;
        }
      return a * i.N2;
    }, e.getPenaltyN3 = function(n) {
      const t = n.size;
      let a = 0, c = 0, d = 0;
      for (let f = 0; f < t; f++) {
        c = d = 0;
        for (let p = 0; p < t; p++)
          c = c << 1 & 2047 | n.get(f, p), p >= 10 && (c === 1488 || c === 93) && a++, d = d << 1 & 2047 | n.get(p, f), p >= 10 && (d === 1488 || d === 93) && a++;
      }
      return a * i.N3;
    }, e.getPenaltyN4 = function(n) {
      let t = 0;
      const a = n.data.length;
      for (let d = 0; d < a; d++) t += n.data[d];
      return Math.abs(Math.ceil(t * 100 / a / 5) - 10) * i.N4;
    };
    function l(r, n, t) {
      switch (r) {
        case e.Patterns.PATTERN000:
          return (n + t) % 2 === 0;
        case e.Patterns.PATTERN001:
          return n % 2 === 0;
        case e.Patterns.PATTERN010:
          return t % 3 === 0;
        case e.Patterns.PATTERN011:
          return (n + t) % 3 === 0;
        case e.Patterns.PATTERN100:
          return (Math.floor(n / 2) + Math.floor(t / 3)) % 2 === 0;
        case e.Patterns.PATTERN101:
          return n * t % 2 + n * t % 3 === 0;
        case e.Patterns.PATTERN110:
          return (n * t % 2 + n * t % 3) % 2 === 0;
        case e.Patterns.PATTERN111:
          return (n * t % 3 + (n + t) % 2) % 2 === 0;
        default:
          throw new Error("bad maskPattern:" + r);
      }
    }
    e.applyMask = function(n, t) {
      const a = t.size;
      for (let c = 0; c < a; c++)
        for (let d = 0; d < a; d++)
          t.isReserved(d, c) || t.xor(d, c, l(n, d, c));
    }, e.getBestMask = function(n, t) {
      const a = Object.keys(e.Patterns).length;
      let c = 0, d = 1 / 0;
      for (let f = 0; f < a; f++) {
        t(f), e.applyMask(f, n);
        const p = e.getPenaltyN1(n) + e.getPenaltyN2(n) + e.getPenaltyN3(n) + e.getPenaltyN4(n);
        e.applyMask(f, n), p < d && (d = p, c = f);
      }
      return c;
    };
  })(ve)), ve;
}
var oe = {}, lt;
function qt() {
  if (lt) return oe;
  lt = 1;
  const e = Ke(), i = [
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
  ], l = [
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
  return oe.getBlocksCount = function(n, t) {
    switch (t) {
      case e.L:
        return i[(n - 1) * 4 + 0];
      case e.M:
        return i[(n - 1) * 4 + 1];
      case e.Q:
        return i[(n - 1) * 4 + 2];
      case e.H:
        return i[(n - 1) * 4 + 3];
      default:
        return;
    }
  }, oe.getTotalCodewordsCount = function(n, t) {
    switch (t) {
      case e.L:
        return l[(n - 1) * 4 + 0];
      case e.M:
        return l[(n - 1) * 4 + 1];
      case e.Q:
        return l[(n - 1) * 4 + 2];
      case e.H:
        return l[(n - 1) * 4 + 3];
      default:
        return;
    }
  }, oe;
}
var Ce = {}, ne = {}, at;
function pn() {
  if (at) return ne;
  at = 1;
  const e = new Uint8Array(512), i = new Uint8Array(256);
  return (function() {
    let r = 1;
    for (let n = 0; n < 255; n++)
      e[n] = r, i[r] = n, r <<= 1, r & 256 && (r ^= 285);
    for (let n = 255; n < 512; n++)
      e[n] = e[n - 255];
  })(), ne.log = function(r) {
    if (r < 1) throw new Error("log(" + r + ")");
    return i[r];
  }, ne.exp = function(r) {
    return e[r];
  }, ne.mul = function(r, n) {
    return r === 0 || n === 0 ? 0 : e[i[r] + i[n]];
  }, ne;
}
var st;
function yn() {
  return st || (st = 1, (function(e) {
    const i = pn();
    e.mul = function(r, n) {
      const t = new Uint8Array(r.length + n.length - 1);
      for (let a = 0; a < r.length; a++)
        for (let c = 0; c < n.length; c++)
          t[a + c] ^= i.mul(r[a], n[c]);
      return t;
    }, e.mod = function(r, n) {
      let t = new Uint8Array(r);
      for (; t.length - n.length >= 0; ) {
        const a = t[0];
        for (let d = 0; d < n.length; d++)
          t[d] ^= i.mul(n[d], a);
        let c = 0;
        for (; c < t.length && t[c] === 0; ) c++;
        t = t.slice(c);
      }
      return t;
    }, e.generateECPolynomial = function(r) {
      let n = new Uint8Array([1]);
      for (let t = 0; t < r; t++)
        n = e.mul(n, new Uint8Array([1, i.exp(t)]));
      return n;
    };
  })(Ce)), Ce;
}
var ke, ct;
function mn() {
  if (ct) return ke;
  ct = 1;
  const e = yn();
  function i(l) {
    this.genPoly = void 0, this.degree = l, this.degree && this.initialize(this.degree);
  }
  return i.prototype.initialize = function(r) {
    this.degree = r, this.genPoly = e.generateECPolynomial(this.degree);
  }, i.prototype.encode = function(r) {
    if (!this.genPoly)
      throw new Error("Encoder not initialized");
    const n = new Uint8Array(r.length + this.degree);
    n.set(r);
    const t = e.mod(n, this.genPoly), a = this.degree - t.length;
    if (a > 0) {
      const c = new Uint8Array(this.degree);
      return c.set(t, a), c;
    }
    return t;
  }, ke = i, ke;
}
var Te = {}, Be = {}, Ee = {}, dt;
function Ut() {
  return dt || (dt = 1, Ee.isValid = function(i) {
    return !isNaN(i) && i >= 1 && i <= 40;
  }), Ee;
}
var N = {}, ut;
function Wt() {
  if (ut) return N;
  ut = 1;
  const e = "[0-9]+", i = "[A-Z $%*+\\-./:]+";
  let l = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
  l = l.replace(/u/g, "\\u");
  const r = "(?:(?![A-Z0-9 $%*+\\-./:]|" + l + `)(?:.|[\r
]))+`;
  N.KANJI = new RegExp(l, "g"), N.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g"), N.BYTE = new RegExp(r, "g"), N.NUMERIC = new RegExp(e, "g"), N.ALPHANUMERIC = new RegExp(i, "g");
  const n = new RegExp("^" + l + "$"), t = new RegExp("^" + e + "$"), a = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
  return N.testKanji = function(d) {
    return n.test(d);
  }, N.testNumeric = function(d) {
    return t.test(d);
  }, N.testAlphanumeric = function(d) {
    return a.test(d);
  }, N;
}
var ft;
function J() {
  return ft || (ft = 1, (function(e) {
    const i = Ut(), l = Wt();
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
    }, e.getCharCountIndicator = function(t, a) {
      if (!t.ccBits) throw new Error("Invalid mode: " + t);
      if (!i.isValid(a))
        throw new Error("Invalid version: " + a);
      return a >= 1 && a < 10 ? t.ccBits[0] : a < 27 ? t.ccBits[1] : t.ccBits[2];
    }, e.getBestModeForData = function(t) {
      return l.testNumeric(t) ? e.NUMERIC : l.testAlphanumeric(t) ? e.ALPHANUMERIC : l.testKanji(t) ? e.KANJI : e.BYTE;
    }, e.toString = function(t) {
      if (t && t.id) return t.id;
      throw new Error("Invalid mode");
    }, e.isValid = function(t) {
      return t && t.bit && t.ccBits;
    };
    function r(n) {
      if (typeof n != "string")
        throw new Error("Param is not a string");
      switch (n.toLowerCase()) {
        case "numeric":
          return e.NUMERIC;
        case "alphanumeric":
          return e.ALPHANUMERIC;
        case "kanji":
          return e.KANJI;
        case "byte":
          return e.BYTE;
        default:
          throw new Error("Unknown mode: " + n);
      }
    }
    e.from = function(t, a) {
      if (e.isValid(t))
        return t;
      try {
        return r(t);
      } catch {
        return a;
      }
    };
  })(Be)), Be;
}
var gt;
function bn() {
  return gt || (gt = 1, (function(e) {
    const i = Y(), l = qt(), r = Ke(), n = J(), t = Ut(), a = 7973, c = i.getBCHDigit(a);
    function d(y, S, u) {
      for (let k = 1; k <= 40; k++)
        if (S <= e.getCapacity(k, u, y))
          return k;
    }
    function f(y, S) {
      return n.getCharCountIndicator(y, S) + 4;
    }
    function p(y, S) {
      let u = 0;
      return y.forEach(function(k) {
        const L = f(k.mode, S);
        u += L + k.getBitsLength();
      }), u;
    }
    function h(y, S) {
      for (let u = 1; u <= 40; u++)
        if (p(y, u) <= e.getCapacity(u, S, n.MIXED))
          return u;
    }
    e.from = function(S, u) {
      return t.isValid(S) ? parseInt(S, 10) : u;
    }, e.getCapacity = function(S, u, k) {
      if (!t.isValid(S))
        throw new Error("Invalid QR Code version");
      typeof k > "u" && (k = n.BYTE);
      const L = i.getSymbolTotalCodewords(S), g = l.getTotalCodewordsCount(S, u), C = (L - g) * 8;
      if (k === n.MIXED) return C;
      const I = C - f(k, S);
      switch (k) {
        case n.NUMERIC:
          return Math.floor(I / 10 * 3);
        case n.ALPHANUMERIC:
          return Math.floor(I / 11 * 2);
        case n.KANJI:
          return Math.floor(I / 13);
        case n.BYTE:
        default:
          return Math.floor(I / 8);
      }
    }, e.getBestVersionForData = function(S, u) {
      let k;
      const L = r.from(u, r.M);
      if (Array.isArray(S)) {
        if (S.length > 1)
          return h(S, L);
        if (S.length === 0)
          return 1;
        k = S[0];
      } else
        k = S;
      return d(k.mode, k.getLength(), L);
    }, e.getEncodedBits = function(S) {
      if (!t.isValid(S) || S < 7)
        throw new Error("Invalid QR Code version");
      let u = S << 12;
      for (; i.getBCHDigit(u) - c >= 0; )
        u ^= a << i.getBCHDigit(u) - c;
      return S << 12 | u;
    };
  })(Te)), Te;
}
var Re = {}, ht;
function Sn() {
  if (ht) return Re;
  ht = 1;
  const e = Y(), i = 1335, l = 21522, r = e.getBCHDigit(i);
  return Re.getEncodedBits = function(t, a) {
    const c = t.bit << 3 | a;
    let d = c << 10;
    for (; e.getBCHDigit(d) - r >= 0; )
      d ^= i << e.getBCHDigit(d) - r;
    return (c << 10 | d) ^ l;
  }, Re;
}
var Me = {}, Ie, pt;
function xn() {
  if (pt) return Ie;
  pt = 1;
  const e = J();
  function i(l) {
    this.mode = e.NUMERIC, this.data = l.toString();
  }
  return i.getBitsLength = function(r) {
    return 10 * Math.floor(r / 3) + (r % 3 ? r % 3 * 3 + 1 : 0);
  }, i.prototype.getLength = function() {
    return this.data.length;
  }, i.prototype.getBitsLength = function() {
    return i.getBitsLength(this.data.length);
  }, i.prototype.write = function(r) {
    let n, t, a;
    for (n = 0; n + 3 <= this.data.length; n += 3)
      t = this.data.substr(n, 3), a = parseInt(t, 10), r.put(a, 10);
    const c = this.data.length - n;
    c > 0 && (t = this.data.substr(n), a = parseInt(t, 10), r.put(a, c * 3 + 1));
  }, Ie = i, Ie;
}
var Ae, yt;
function wn() {
  if (yt) return Ae;
  yt = 1;
  const e = J(), i = [
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
  function l(r) {
    this.mode = e.ALPHANUMERIC, this.data = r;
  }
  return l.getBitsLength = function(n) {
    return 11 * Math.floor(n / 2) + 6 * (n % 2);
  }, l.prototype.getLength = function() {
    return this.data.length;
  }, l.prototype.getBitsLength = function() {
    return l.getBitsLength(this.data.length);
  }, l.prototype.write = function(n) {
    let t;
    for (t = 0; t + 2 <= this.data.length; t += 2) {
      let a = i.indexOf(this.data[t]) * 45;
      a += i.indexOf(this.data[t + 1]), n.put(a, 11);
    }
    this.data.length % 2 && n.put(i.indexOf(this.data[t]), 6);
  }, Ae = l, Ae;
}
var _e, mt;
function vn() {
  if (mt) return _e;
  mt = 1;
  const e = J();
  function i(l) {
    this.mode = e.BYTE, typeof l == "string" ? this.data = new TextEncoder().encode(l) : this.data = new Uint8Array(l);
  }
  return i.getBitsLength = function(r) {
    return r * 8;
  }, i.prototype.getLength = function() {
    return this.data.length;
  }, i.prototype.getBitsLength = function() {
    return i.getBitsLength(this.data.length);
  }, i.prototype.write = function(l) {
    for (let r = 0, n = this.data.length; r < n; r++)
      l.put(this.data[r], 8);
  }, _e = i, _e;
}
var Pe, bt;
function Cn() {
  if (bt) return Pe;
  bt = 1;
  const e = J(), i = Y();
  function l(r) {
    this.mode = e.KANJI, this.data = r;
  }
  return l.getBitsLength = function(n) {
    return n * 13;
  }, l.prototype.getLength = function() {
    return this.data.length;
  }, l.prototype.getBitsLength = function() {
    return l.getBitsLength(this.data.length);
  }, l.prototype.write = function(r) {
    let n;
    for (n = 0; n < this.data.length; n++) {
      let t = i.toSJIS(this.data[n]);
      if (t >= 33088 && t <= 40956)
        t -= 33088;
      else if (t >= 57408 && t <= 60351)
        t -= 49472;
      else
        throw new Error(
          "Invalid SJIS character: " + this.data[n] + `
Make sure your charset is UTF-8`
        );
      t = (t >>> 8 & 255) * 192 + (t & 255), r.put(t, 13);
    }
  }, Pe = l, Pe;
}
var Le = { exports: {} }, St;
function kn() {
  return St || (St = 1, (function(e) {
    var i = {
      single_source_shortest_paths: function(l, r, n) {
        var t = {}, a = {};
        a[r] = 0;
        var c = i.PriorityQueue.make();
        c.push(r, 0);
        for (var d, f, p, h, y, S, u, k, L; !c.empty(); ) {
          d = c.pop(), f = d.value, h = d.cost, y = l[f] || {};
          for (p in y)
            y.hasOwnProperty(p) && (S = y[p], u = h + S, k = a[p], L = typeof a[p] > "u", (L || k > u) && (a[p] = u, c.push(p, u), t[p] = f));
        }
        if (typeof n < "u" && typeof a[n] > "u") {
          var g = ["Could not find a path from ", r, " to ", n, "."].join("");
          throw new Error(g);
        }
        return t;
      },
      extract_shortest_path_from_predecessor_list: function(l, r) {
        for (var n = [], t = r; t; )
          n.push(t), l[t], t = l[t];
        return n.reverse(), n;
      },
      find_path: function(l, r, n) {
        var t = i.single_source_shortest_paths(l, r, n);
        return i.extract_shortest_path_from_predecessor_list(
          t,
          n
        );
      },
      /**
       * A very naive priority queue implementation.
       */
      PriorityQueue: {
        make: function(l) {
          var r = i.PriorityQueue, n = {}, t;
          l = l || {};
          for (t in r)
            r.hasOwnProperty(t) && (n[t] = r[t]);
          return n.queue = [], n.sorter = l.sorter || r.default_sorter, n;
        },
        default_sorter: function(l, r) {
          return l.cost - r.cost;
        },
        /**
         * Add a new item to the queue and ensure the highest priority element
         * is at the front of the queue.
         */
        push: function(l, r) {
          var n = { value: l, cost: r };
          this.queue.push(n), this.queue.sort(this.sorter);
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
  })(Le)), Le.exports;
}
var xt;
function Tn() {
  return xt || (xt = 1, (function(e) {
    const i = J(), l = xn(), r = wn(), n = vn(), t = Cn(), a = Wt(), c = Y(), d = kn();
    function f(g) {
      return unescape(encodeURIComponent(g)).length;
    }
    function p(g, C, I) {
      const m = [];
      let v;
      for (; (v = g.exec(I)) !== null; )
        m.push({
          data: v[0],
          index: v.index,
          mode: C,
          length: v[0].length
        });
      return m;
    }
    function h(g) {
      const C = p(a.NUMERIC, i.NUMERIC, g), I = p(a.ALPHANUMERIC, i.ALPHANUMERIC, g);
      let m, v;
      return c.isKanjiModeEnabled() ? (m = p(a.BYTE, i.BYTE, g), v = p(a.KANJI, i.KANJI, g)) : (m = p(a.BYTE_KANJI, i.BYTE, g), v = []), C.concat(I, m, v).sort(function(T, R) {
        return T.index - R.index;
      }).map(function(T) {
        return {
          data: T.data,
          mode: T.mode,
          length: T.length
        };
      });
    }
    function y(g, C) {
      switch (C) {
        case i.NUMERIC:
          return l.getBitsLength(g);
        case i.ALPHANUMERIC:
          return r.getBitsLength(g);
        case i.KANJI:
          return t.getBitsLength(g);
        case i.BYTE:
          return n.getBitsLength(g);
      }
    }
    function S(g) {
      return g.reduce(function(C, I) {
        const m = C.length - 1 >= 0 ? C[C.length - 1] : null;
        return m && m.mode === I.mode ? (C[C.length - 1].data += I.data, C) : (C.push(I), C);
      }, []);
    }
    function u(g) {
      const C = [];
      for (let I = 0; I < g.length; I++) {
        const m = g[I];
        switch (m.mode) {
          case i.NUMERIC:
            C.push([
              m,
              { data: m.data, mode: i.ALPHANUMERIC, length: m.length },
              { data: m.data, mode: i.BYTE, length: m.length }
            ]);
            break;
          case i.ALPHANUMERIC:
            C.push([
              m,
              { data: m.data, mode: i.BYTE, length: m.length }
            ]);
            break;
          case i.KANJI:
            C.push([
              m,
              { data: m.data, mode: i.BYTE, length: f(m.data) }
            ]);
            break;
          case i.BYTE:
            C.push([
              { data: m.data, mode: i.BYTE, length: f(m.data) }
            ]);
        }
      }
      return C;
    }
    function k(g, C) {
      const I = {}, m = { start: {} };
      let v = ["start"];
      for (let x = 0; x < g.length; x++) {
        const T = g[x], R = [];
        for (let w = 0; w < T.length; w++) {
          const A = T[w], B = "" + x + w;
          R.push(B), I[B] = { node: A, lastCount: 0 }, m[B] = {};
          for (let M = 0; M < v.length; M++) {
            const E = v[M];
            I[E] && I[E].node.mode === A.mode ? (m[E][B] = y(I[E].lastCount + A.length, A.mode) - y(I[E].lastCount, A.mode), I[E].lastCount += A.length) : (I[E] && (I[E].lastCount = A.length), m[E][B] = y(A.length, A.mode) + 4 + i.getCharCountIndicator(A.mode, C));
          }
        }
        v = R;
      }
      for (let x = 0; x < v.length; x++)
        m[v[x]].end = 0;
      return { map: m, table: I };
    }
    function L(g, C) {
      let I;
      const m = i.getBestModeForData(g);
      if (I = i.from(C, m), I !== i.BYTE && I.bit < m.bit)
        throw new Error('"' + g + '" cannot be encoded with mode ' + i.toString(I) + `.
 Suggested mode is: ` + i.toString(m));
      switch (I === i.KANJI && !c.isKanjiModeEnabled() && (I = i.BYTE), I) {
        case i.NUMERIC:
          return new l(g);
        case i.ALPHANUMERIC:
          return new r(g);
        case i.KANJI:
          return new t(g);
        case i.BYTE:
          return new n(g);
      }
    }
    e.fromArray = function(C) {
      return C.reduce(function(I, m) {
        return typeof m == "string" ? I.push(L(m, null)) : m.data && I.push(L(m.data, m.mode)), I;
      }, []);
    }, e.fromString = function(C, I) {
      const m = h(C, c.isKanjiModeEnabled()), v = u(m), x = k(v, I), T = d.find_path(x.map, "start", "end"), R = [];
      for (let w = 1; w < T.length - 1; w++)
        R.push(x.table[T[w]].node);
      return e.fromArray(S(R));
    }, e.rawSplit = function(C) {
      return e.fromArray(
        h(C, c.isKanjiModeEnabled())
      );
    };
  })(Me)), Me;
}
var wt;
function Bn() {
  if (wt) return ye;
  wt = 1;
  const e = Y(), i = Ke(), l = dn(), r = un(), n = fn(), t = gn(), a = hn(), c = qt(), d = mn(), f = bn(), p = Sn(), h = J(), y = Tn();
  function S(x, T) {
    const R = x.size, w = t.getPositions(T);
    for (let A = 0; A < w.length; A++) {
      const B = w[A][0], M = w[A][1];
      for (let E = -1; E <= 7; E++)
        if (!(B + E <= -1 || R <= B + E))
          for (let _ = -1; _ <= 7; _++)
            M + _ <= -1 || R <= M + _ || (E >= 0 && E <= 6 && (_ === 0 || _ === 6) || _ >= 0 && _ <= 6 && (E === 0 || E === 6) || E >= 2 && E <= 4 && _ >= 2 && _ <= 4 ? x.set(B + E, M + _, !0, !0) : x.set(B + E, M + _, !1, !0));
    }
  }
  function u(x) {
    const T = x.size;
    for (let R = 8; R < T - 8; R++) {
      const w = R % 2 === 0;
      x.set(R, 6, w, !0), x.set(6, R, w, !0);
    }
  }
  function k(x, T) {
    const R = n.getPositions(T);
    for (let w = 0; w < R.length; w++) {
      const A = R[w][0], B = R[w][1];
      for (let M = -2; M <= 2; M++)
        for (let E = -2; E <= 2; E++)
          M === -2 || M === 2 || E === -2 || E === 2 || M === 0 && E === 0 ? x.set(A + M, B + E, !0, !0) : x.set(A + M, B + E, !1, !0);
    }
  }
  function L(x, T) {
    const R = x.size, w = f.getEncodedBits(T);
    let A, B, M;
    for (let E = 0; E < 18; E++)
      A = Math.floor(E / 3), B = E % 3 + R - 8 - 3, M = (w >> E & 1) === 1, x.set(A, B, M, !0), x.set(B, A, M, !0);
  }
  function g(x, T, R) {
    const w = x.size, A = p.getEncodedBits(T, R);
    let B, M;
    for (B = 0; B < 15; B++)
      M = (A >> B & 1) === 1, B < 6 ? x.set(B, 8, M, !0) : B < 8 ? x.set(B + 1, 8, M, !0) : x.set(w - 15 + B, 8, M, !0), B < 8 ? x.set(8, w - B - 1, M, !0) : B < 9 ? x.set(8, 15 - B - 1 + 1, M, !0) : x.set(8, 15 - B - 1, M, !0);
    x.set(w - 8, 8, 1, !0);
  }
  function C(x, T) {
    const R = x.size;
    let w = -1, A = R - 1, B = 7, M = 0;
    for (let E = R - 1; E > 0; E -= 2)
      for (E === 6 && E--; ; ) {
        for (let _ = 0; _ < 2; _++)
          if (!x.isReserved(A, E - _)) {
            let W = !1;
            M < T.length && (W = (T[M] >>> B & 1) === 1), x.set(A, E - _, W), B--, B === -1 && (M++, B = 7);
          }
        if (A += w, A < 0 || R <= A) {
          A -= w, w = -w;
          break;
        }
      }
  }
  function I(x, T, R) {
    const w = new l();
    R.forEach(function(_) {
      w.put(_.mode.bit, 4), w.put(_.getLength(), h.getCharCountIndicator(_.mode, x)), _.write(w);
    });
    const A = e.getSymbolTotalCodewords(x), B = c.getTotalCodewordsCount(x, T), M = (A - B) * 8;
    for (w.getLengthInBits() + 4 <= M && w.put(0, 4); w.getLengthInBits() % 8 !== 0; )
      w.putBit(0);
    const E = (M - w.getLengthInBits()) / 8;
    for (let _ = 0; _ < E; _++)
      w.put(_ % 2 ? 17 : 236, 8);
    return m(w, x, T);
  }
  function m(x, T, R) {
    const w = e.getSymbolTotalCodewords(T), A = c.getTotalCodewordsCount(T, R), B = w - A, M = c.getBlocksCount(T, R), E = w % M, _ = M - E, W = Math.floor(w / M), te = Math.floor(B / M), rn = te + 1, Ye = W - te, on = new d(Ye);
    let ue = 0;
    const re = new Array(M), Je = new Array(M);
    let fe = 0;
    const ln = new Uint8Array(x.buffer);
    for (let Q = 0; Q < M; Q++) {
      const he = Q < _ ? te : rn;
      re[Q] = ln.slice(ue, ue + he), Je[Q] = on.encode(re[Q]), ue += he, fe = Math.max(fe, he);
    }
    const ge = new Uint8Array(w);
    let Qe = 0, D, F;
    for (D = 0; D < fe; D++)
      for (F = 0; F < M; F++)
        D < re[F].length && (ge[Qe++] = re[F][D]);
    for (D = 0; D < Ye; D++)
      for (F = 0; F < M; F++)
        ge[Qe++] = Je[F][D];
    return ge;
  }
  function v(x, T, R, w) {
    let A;
    if (Array.isArray(x))
      A = y.fromArray(x);
    else if (typeof x == "string") {
      let W = T;
      if (!W) {
        const te = y.rawSplit(x);
        W = f.getBestVersionForData(te, R);
      }
      A = y.fromString(x, W || 40);
    } else
      throw new Error("Invalid data");
    const B = f.getBestVersionForData(A, R);
    if (!B)
      throw new Error("The amount of data is too big to be stored in a QR Code");
    if (!T)
      T = B;
    else if (T < B)
      throw new Error(
        `
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: ` + B + `.
`
      );
    const M = I(T, R, A), E = e.getSymbolSize(T), _ = new r(E);
    return S(_, T), u(_), k(_, T), g(_, R, 0), T >= 7 && L(_, T), C(_, M), isNaN(w) && (w = a.getBestMask(
      _,
      g.bind(null, _, R)
    )), a.applyMask(w, _), g(_, R, w), {
      modules: _,
      version: T,
      errorCorrectionLevel: R,
      maskPattern: w,
      segments: A
    };
  }
  return ye.create = function(T, R) {
    if (typeof T > "u" || T === "")
      throw new Error("No input text");
    let w = i.M, A, B;
    return typeof R < "u" && (w = i.from(R.errorCorrectionLevel, i.M), A = f.from(R.version), B = a.from(R.maskPattern), R.toSJISFunc && e.setToSJISFunction(R.toSJISFunc)), v(T, A, w, B);
  }, ye;
}
var ze = {}, Ne = {}, vt;
function Ht() {
  return vt || (vt = 1, (function(e) {
    function i(l) {
      if (typeof l == "number" && (l = l.toString()), typeof l != "string")
        throw new Error("Color should be defined as hex string");
      let r = l.slice().replace("#", "").split("");
      if (r.length < 3 || r.length === 5 || r.length > 8)
        throw new Error("Invalid hex color: " + l);
      (r.length === 3 || r.length === 4) && (r = Array.prototype.concat.apply([], r.map(function(t) {
        return [t, t];
      }))), r.length === 6 && r.push("F", "F");
      const n = parseInt(r.join(""), 16);
      return {
        r: n >> 24 & 255,
        g: n >> 16 & 255,
        b: n >> 8 & 255,
        a: n & 255,
        hex: "#" + r.slice(0, 6).join("")
      };
    }
    e.getOptions = function(r) {
      r || (r = {}), r.color || (r.color = {});
      const n = typeof r.margin > "u" || r.margin === null || r.margin < 0 ? 4 : r.margin, t = r.width && r.width >= 21 ? r.width : void 0, a = r.scale || 4;
      return {
        width: t,
        scale: t ? 4 : a,
        margin: n,
        color: {
          dark: i(r.color.dark || "#000000ff"),
          light: i(r.color.light || "#ffffffff")
        },
        type: r.type,
        rendererOpts: r.rendererOpts || {}
      };
    }, e.getScale = function(r, n) {
      return n.width && n.width >= r + n.margin * 2 ? n.width / (r + n.margin * 2) : n.scale;
    }, e.getImageWidth = function(r, n) {
      const t = e.getScale(r, n);
      return Math.floor((r + n.margin * 2) * t);
    }, e.qrToImageData = function(r, n, t) {
      const a = n.modules.size, c = n.modules.data, d = e.getScale(a, t), f = Math.floor((a + t.margin * 2) * d), p = t.margin * d, h = [t.color.light, t.color.dark];
      for (let y = 0; y < f; y++)
        for (let S = 0; S < f; S++) {
          let u = (y * f + S) * 4, k = t.color.light;
          if (y >= p && S >= p && y < f - p && S < f - p) {
            const L = Math.floor((y - p) / d), g = Math.floor((S - p) / d);
            k = h[c[L * a + g] ? 1 : 0];
          }
          r[u++] = k.r, r[u++] = k.g, r[u++] = k.b, r[u] = k.a;
        }
    };
  })(Ne)), Ne;
}
var Ct;
function En() {
  return Ct || (Ct = 1, (function(e) {
    const i = Ht();
    function l(n, t, a) {
      n.clearRect(0, 0, t.width, t.height), t.style || (t.style = {}), t.height = a, t.width = a, t.style.height = a + "px", t.style.width = a + "px";
    }
    function r() {
      try {
        return document.createElement("canvas");
      } catch {
        throw new Error("You need to specify a canvas element");
      }
    }
    e.render = function(t, a, c) {
      let d = c, f = a;
      typeof d > "u" && (!a || !a.getContext) && (d = a, a = void 0), a || (f = r()), d = i.getOptions(d);
      const p = i.getImageWidth(t.modules.size, d), h = f.getContext("2d"), y = h.createImageData(p, p);
      return i.qrToImageData(y.data, t, d), l(h, f, p), h.putImageData(y, 0, 0), f;
    }, e.renderToDataURL = function(t, a, c) {
      let d = c;
      typeof d > "u" && (!a || !a.getContext) && (d = a, a = void 0), d || (d = {});
      const f = e.render(t, a, d), p = d.type || "image/png", h = d.rendererOpts || {};
      return f.toDataURL(p, h.quality);
    };
  })(ze)), ze;
}
var $e = {}, kt;
function Rn() {
  if (kt) return $e;
  kt = 1;
  const e = Ht();
  function i(n, t) {
    const a = n.a / 255, c = t + '="' + n.hex + '"';
    return a < 1 ? c + " " + t + '-opacity="' + a.toFixed(2).slice(1) + '"' : c;
  }
  function l(n, t, a) {
    let c = n + t;
    return typeof a < "u" && (c += " " + a), c;
  }
  function r(n, t, a) {
    let c = "", d = 0, f = !1, p = 0;
    for (let h = 0; h < n.length; h++) {
      const y = Math.floor(h % t), S = Math.floor(h / t);
      !y && !f && (f = !0), n[h] ? (p++, h > 0 && y > 0 && n[h - 1] || (c += f ? l("M", y + a, 0.5 + S + a) : l("m", d, 0), d = 0, f = !1), y + 1 < t && n[h + 1] || (c += l("h", p), p = 0)) : d++;
    }
    return c;
  }
  return $e.render = function(t, a, c) {
    const d = e.getOptions(a), f = t.modules.size, p = t.modules.data, h = f + d.margin * 2, y = d.color.light.a ? "<path " + i(d.color.light, "fill") + ' d="M0 0h' + h + "v" + h + 'H0z"/>' : "", S = "<path " + i(d.color.dark, "stroke") + ' d="' + r(p, f, d.margin) + '"/>', u = 'viewBox="0 0 ' + h + " " + h + '"', L = '<svg xmlns="http://www.w3.org/2000/svg" ' + (d.width ? 'width="' + d.width + '" height="' + d.width + '" ' : "") + u + ' shape-rendering="crispEdges">' + y + S + `</svg>
`;
    return typeof c == "function" && c(null, L), L;
  }, $e;
}
var Tt;
function Mn() {
  if (Tt) return X;
  Tt = 1;
  const e = cn(), i = Bn(), l = En(), r = Rn();
  function n(t, a, c, d, f) {
    const p = [].slice.call(arguments, 1), h = p.length, y = typeof p[h - 1] == "function";
    if (!y && !e())
      throw new Error("Callback required as last argument");
    if (y) {
      if (h < 2)
        throw new Error("Too few arguments provided");
      h === 2 ? (f = c, c = a, a = d = void 0) : h === 3 && (a.getContext && typeof f > "u" ? (f = d, d = void 0) : (f = d, d = c, c = a, a = void 0));
    } else {
      if (h < 1)
        throw new Error("Too few arguments provided");
      return h === 1 ? (c = a, a = d = void 0) : h === 2 && !a.getContext && (d = c, c = a, a = void 0), new Promise(function(S, u) {
        try {
          const k = i.create(c, d);
          S(t(k, a, d));
        } catch (k) {
          u(k);
        }
      });
    }
    try {
      const S = i.create(c, d);
      f(null, t(S, a, d));
    } catch (S) {
      f(S);
    }
  }
  return X.create = i.create, X.toCanvas = n.bind(null, l.render), X.toDataURL = n.bind(null, l.renderToDataURL), X.toString = n.bind(null, function(t, a, c) {
    return r.render(t, c);
  }), X;
}
var In = Mn();
const Ot = /* @__PURE__ */ sn(In), jt = {
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
}, An = {
  radiusSm: "0.25rem",
  radiusMd: "0.25rem",
  radiusLg: "0.25rem",
  radiusXl: "0.25rem",
  fieldRadius: "0.5rem",
  fontSans: "'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  fontMono: "'Geist Mono', 'SF Mono', 'Cascadia Code', monospace",
  transition: "200ms cubic-bezier(0.4, 0, 0.2, 1)",
  transitionSlow: "400ms cubic-bezier(0.4, 0, 0.2, 1)"
}, _n = {
  sidebarWidth: "260px",
  sidebarCollapsed: "72px",
  topbarHeight: "64px"
}, Ge = {
  ...An,
  ..._n
}, Vt = {
  dark: jt
};
function Pn(e) {
  return e.replace(/[A-Z]/g, (i) => "-" + i.toLowerCase());
}
function Kt(e = "ag") {
  return e.trim() || "ag";
}
function de(e, i) {
  return `--${e}-${Pn(i)}`;
}
Object.keys(Vt.dark).reduce((e, i) => (e[i] = de("ag", i), e), {});
Object.keys(Ge).reduce((e, i) => (e[i] = de("ag", i), e), {});
function Gt(e = {}) {
  const i = Kt(e.prefix);
  return Object.keys(Vt.dark).reduce((l, r) => (l[r] = de(i, r), l), {});
}
function Yt(e = {}) {
  const i = Kt(e.prefix);
  return Object.keys(Ge).reduce((l, r) => (l[r] = de(i, r), l), {});
}
const Ln = Gt(), zn = Yt();
function o(e, i = {}) {
  const l = i.prefix ? Gt(i) : Ln, r = i.prefix ? Yt(i) : zn;
  if (e in l) {
    const t = e;
    return `var(${l[t]}, ${jt[t]})`;
  }
  const n = e;
  return `var(${r[n]}, ${Ge[n]})`;
}
const Nn = "/api/v1/ext-user/payment-epay", $n = "/api/v1/ext/payment-epay";
async function q(e, i, l, r) {
  const n = {};
  l !== void 0 && (n["Content-Type"] = "application/json");
  const t = localStorage.getItem("token");
  t && (n.Authorization = `Bearer ${t}`);
  const a = r != null && r.admin ? $n : Nn, c = await fetch(a + i, {
    method: e,
    headers: n,
    body: l ? JSON.stringify(l) : void 0
  }), d = await c.text();
  let f = null;
  try {
    f = d ? JSON.parse(d) : null;
  } catch {
  }
  if (!c.ok) {
    const h = f, y = (h == null ? void 0 : h.message) || (f == null ? void 0 : f.error) || `HTTP ${c.status}`;
    throw c.status === 401 && (localStorage.removeItem("token"), window.location.href = "/login"), new Error(y);
  }
  const p = f;
  if (p && typeof p == "object" && "code" in p && "data" in p) {
    if (p.code !== 0)
      throw new Error(p.message || "请求失败");
    return p.data;
  }
  return f;
}
const $ = {
  // ============ User ============
  /** 列出当前可用的支付方式（PayMethod，不是 Provider） */
  methods: () => q(
    "GET",
    "/user/methods"
  ),
  createOrder: (e) => q("POST", "/user/orders", e),
  listOrders: (e = 50) => q("GET", `/user/orders?limit=${e}`),
  getOrder: (e) => q("GET", `/user/orders/${encodeURIComponent(e)}`),
  // ============ Admin: 订单 ============
  // email 为子串过滤（后端走 ILIKE %x%）；status='all' 或留空表示不过滤
  adminListOrders: (e = {}) => {
    const i = new URLSearchParams();
    return i.set("page", String(e.page ?? 1)), i.set("page_size", String(e.pageSize ?? 20)), e.email && e.email.trim() && i.set("email", e.email.trim()), e.status && e.status !== "all" && i.set("status", e.status), q("GET", `/admin/orders?${i.toString()}`, void 0, { admin: !0 });
  },
  // ============ Admin: Provider 配置 ============
  adminListProviders: () => q("GET", "/admin/providers", void 0, { admin: !0 }),
  adminUpsertProvider: (e) => q("POST", "/admin/providers", e, { admin: !0 }),
  adminDeleteProvider: (e) => q("DELETE", `/admin/providers/${encodeURIComponent(e)}`, void 0, { admin: !0 }),
  adminReloadProviders: () => q("POST", "/admin/providers/reload", {}, { admin: !0 })
};
function U(e, i = {}) {
  const l = e.toFixed(2);
  return i.compact ? `$${e}` : `$${l}`;
}
function Dn() {
  const [e, i] = P([]), [l, r] = P(!0), [n, t] = P(null), [a, c] = P(30), [d, f] = P(""), [p, h] = P(!1), [y, S] = P(null), [u, k] = P(null), [L, g] = P(null), C = ce(null);
  z(() => {
    $.methods().then((v) => {
      var x;
      i(v.methods || []), (x = v.methods) != null && x.length && f(v.methods[0].key);
    }).catch((v) => t(String((v == null ? void 0 : v.message) || v))).finally(() => r(!1));
  }, []), z(() => {
    if (!u || u.status !== "pending") {
      C.current && (window.clearInterval(C.current), C.current = null);
      return;
    }
    const v = async () => {
      try {
        const x = await $.getOrder(u.out_trade_no);
        k(x);
      } catch {
      }
    };
    return C.current = window.setInterval(v, 3e3), () => {
      C.current && (window.clearInterval(C.current), C.current = null);
    };
  }, [u == null ? void 0 : u.out_trade_no, u == null ? void 0 : u.status]), z(() => {
    if (!u) {
      g(null);
      return;
    }
    const v = u.qr_code_content || u.payment_url;
    if (!v) {
      g(null);
      return;
    }
    let x = !1;
    return Ot.toDataURL(v, { width: 240, margin: 2, errorCorrectionLevel: "M" }).then((T) => {
      x || g(T);
    }).catch(() => {
      x || g(null);
    }), () => {
      x = !0;
    };
  }, [u == null ? void 0 : u.payment_url, u == null ? void 0 : u.qr_code_content]);
  const I = async () => {
    if (S(null), !d) {
      S("请选择支付方式");
      return;
    }
    if (!a || a <= 0) {
      S("请输入有效金额");
      return;
    }
    h(!0);
    try {
      const v = await $.createOrder({ amount: a, method: d, subject: "HopBase 余额充值" });
      k(v);
    } catch (v) {
      S(String(v.message || v));
    } finally {
      h(!1);
    }
  }, m = () => {
    k(null), S(null);
  };
  return l ? /* @__PURE__ */ s("div", { style: V, children: /* @__PURE__ */ s("div", { style: Bt, children: "加载中..." }) }) : n ? /* @__PURE__ */ s("div", { style: V, children: /* @__PURE__ */ b("div", { style: { ...Bt, color: o("danger") }, children: [
    "加载支付方式失败: ",
    n
  ] }) }) : e.length === 0 ? /* @__PURE__ */ s("div", { style: V, children: /* @__PURE__ */ s("div", { style: le, children: /* @__PURE__ */ s("p", { style: { color: o("textSecondary"), margin: 0, textAlign: "center" }, children: "充值功能暂未开放，请联系管理员。" }) }) }) : u ? u.status === "paid" ? /* @__PURE__ */ b("div", { style: V, children: [
    /* @__PURE__ */ s("h2", { style: ie, children: "充值成功" }),
    /* @__PURE__ */ b("div", { style: le, children: [
      /* @__PURE__ */ b("p", { style: { margin: 0, color: o("text") }, children: [
        "订单 ",
        /* @__PURE__ */ s("code", { style: Fe, children: u.out_trade_no }),
        " 已支付，金额",
        " ",
        /* @__PURE__ */ s("strong", { style: { color: o("success") }, children: U(u.amount) }),
        " 已入账。"
      ] }),
      /* @__PURE__ */ s("button", { style: { ...De, marginTop: 20 }, onClick: m, children: "再次充值" })
    ] })
  ] }) : u.status === "pending" ? /* @__PURE__ */ b("div", { style: V, children: [
    /* @__PURE__ */ s("h2", { style: ie, children: "扫码付款" }),
    /* @__PURE__ */ b("div", { style: Kn, children: [
      L ? /* @__PURE__ */ s("img", { src: L, alt: "付款二维码", style: Rt }) : /* @__PURE__ */ s("div", { style: { ...Rt, display: "flex", alignItems: "center", justifyContent: "center", color: o("textTertiary") }, children: "生成二维码中..." }),
      /* @__PURE__ */ s("div", { style: Gn, children: U(u.amount) }),
      /* @__PURE__ */ b("div", { style: { color: o("textSecondary"), fontSize: 13 }, children: [
        "请使用 ",
        Fn(u.method),
        " 扫码完成付款"
      ] }),
      /* @__PURE__ */ b("div", { style: { marginTop: 8, color: o("textTertiary"), fontSize: 12 }, children: [
        "订单号：",
        /* @__PURE__ */ s("code", { style: Fe, children: u.out_trade_no })
      ] }),
      /* @__PURE__ */ s("p", { style: { textAlign: "center", color: o("textTertiary"), fontSize: 13, marginTop: 20, marginBottom: 0 }, children: "支付完成后本页将自动跳转到结果页（每 3 秒检查一次）" }),
      u.payment_url && /* @__PURE__ */ b("p", { style: { textAlign: "center", fontSize: 12, marginTop: 8, marginBottom: 0 }, children: [
        "扫码不便？",
        " ",
        /* @__PURE__ */ s("a", { href: u.payment_url, target: "_blank", rel: "noreferrer", style: { color: o("primary"), textDecoration: "none" }, children: "点此在新窗口打开付款页 →" })
      ] }),
      /* @__PURE__ */ s("button", { style: { ...Vn, marginTop: 20 }, onClick: m, children: "取消" })
    ] })
  ] }) : /* @__PURE__ */ b("div", { style: V, children: [
    /* @__PURE__ */ b("h2", { style: ie, children: [
      "订单已",
      qn(u.status)
    ] }),
    /* @__PURE__ */ b("div", { style: le, children: [
      /* @__PURE__ */ b("p", { style: { margin: 0, color: o("textSecondary") }, children: [
        "订单号：",
        /* @__PURE__ */ s("code", { style: Fe, children: u.out_trade_no })
      ] }),
      /* @__PURE__ */ s("button", { style: { ...De, marginTop: 20 }, onClick: m, children: "重新发起" })
    ] })
  ] }) : /* @__PURE__ */ b("div", { style: V, children: [
    /* @__PURE__ */ s("h2", { style: ie, children: "账户充值" }),
    /* @__PURE__ */ b("div", { style: le, children: [
      /* @__PURE__ */ b("p", { style: Wn, children: [
        "充值比例：",
        /* @__PURE__ */ s("strong", { style: { color: o("text") }, children: "1 CNY = $1" })
      ] }),
      /* @__PURE__ */ b("section", { children: [
        /* @__PURE__ */ s("h3", { style: Et, children: "选择金额" }),
        /* @__PURE__ */ s("div", { style: { display: "flex", flexWrap: "wrap", gap: 10 }, children: [10, 30, 50, 100, 200, 500].map((v) => /* @__PURE__ */ s(
          "button",
          {
            type: "button",
            onClick: () => c(v),
            style: a === v ? Hn : Jt,
            children: U(v, { compact: !0 })
          },
          v
        )) }),
        /* @__PURE__ */ b("div", { style: { marginTop: 16, display: "flex", alignItems: "center", gap: 8, color: o("textSecondary"), fontSize: 13 }, children: [
          /* @__PURE__ */ s("span", { children: "自定义金额" }),
          /* @__PURE__ */ s(
            "input",
            {
              type: "number",
              min: 1,
              max: 1e4,
              step: 1,
              value: a,
              onChange: (v) => c(Number(v.target.value)),
              style: jn
            }
          ),
          /* @__PURE__ */ s("span", { children: "$" })
        ] })
      ] }),
      /* @__PURE__ */ b("section", { style: Un, children: [
        /* @__PURE__ */ s("h3", { style: Et, children: "选择支付方式" }),
        /* @__PURE__ */ s("div", { style: { display: "flex", gap: 12, flexWrap: "wrap" }, children: e.map((v) => /* @__PURE__ */ s(
          "button",
          {
            type: "button",
            onClick: () => f(v.key),
            style: d === v.key ? On : Qt,
            title: v.description,
            children: v.label
          },
          v.key
        )) })
      ] }),
      y && /* @__PURE__ */ s("p", { style: { color: o("danger"), marginTop: 16, fontSize: 13 }, children: y }),
      /* @__PURE__ */ s(
        "button",
        {
          type: "button",
          onClick: I,
          disabled: p,
          style: { ...De, marginTop: 24, width: "100%", opacity: p ? 0.6 : 1 },
          children: p ? "处理中..." : "立即支付"
        }
      )
    ] })
  ] });
}
function Fn(e) {
  switch (e) {
    case "alipay":
      return "支付宝";
    case "wxpay":
      return "微信支付";
    default:
      return e;
  }
}
function qn(e) {
  switch (e) {
    case "expired":
      return "过期";
    case "failed":
      return "失败";
    case "cancelled":
      return "取消";
    case "refunded":
      return "退款";
    default:
      return e;
  }
}
const V = {
  maxWidth: 720,
  margin: "0 auto",
  padding: "24px 24px 48px",
  color: o("text")
}, ie = {
  margin: "0 0 20px",
  fontSize: 22,
  fontWeight: 600,
  color: o("text"),
  letterSpacing: "-0.01em"
}, Bt = {
  padding: "40px 0",
  textAlign: "center",
  color: o("textSecondary")
}, le = {
  border: `1px solid ${o("glassBorder")}`,
  borderRadius: o("radiusLg"),
  background: o("bgSurface"),
  padding: "24px"
}, Un = {
  marginTop: 28
}, Wn = {
  margin: "0 0 20px",
  padding: "10px 12px",
  border: `1px solid ${o("glassBorder")}`,
  borderRadius: o("radiusMd"),
  background: o("bgElevated"),
  color: o("textSecondary"),
  fontSize: 13,
  lineHeight: 1.6
}, Et = {
  margin: "0 0 12px",
  fontSize: 13,
  fontWeight: 600,
  color: o("textSecondary"),
  textTransform: "uppercase",
  letterSpacing: "0.04em"
}, Jt = {
  minWidth: 88,
  padding: "12px 18px",
  border: `1px solid ${o("glassBorder")}`,
  borderRadius: o("radiusMd"),
  background: o("bg"),
  color: o("text"),
  cursor: "pointer",
  fontSize: 15,
  fontWeight: 500,
  transition: o("transition")
}, Hn = {
  ...Jt,
  borderColor: o("primary"),
  background: o("primarySubtle"),
  color: o("primary"),
  fontWeight: 600
}, Qt = {
  minWidth: 140,
  padding: "16px 24px",
  border: `1px solid ${o("glassBorder")}`,
  borderRadius: o("radiusMd"),
  background: o("bgElevated"),
  color: o("text"),
  cursor: "pointer",
  fontSize: 14,
  fontWeight: 500,
  transition: o("transition")
}, On = {
  ...Qt,
  borderColor: o("primary"),
  background: o("primarySubtle"),
  color: o("primary"),
  fontWeight: 600
}, jn = {
  padding: "8px 12px",
  width: 140,
  border: `1px solid ${o("glassBorder")}`,
  borderRadius: o("radiusMd"),
  background: o("bgElevated"),
  color: o("text"),
  fontSize: 14,
  outline: "none"
}, De = {
  padding: "12px 28px",
  border: "none",
  borderRadius: o("radiusMd"),
  background: o("primary"),
  color: o("textInverse"),
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  transition: o("transition")
}, Vn = {
  padding: "10px 24px",
  border: `1px solid ${o("glassBorder")}`,
  borderRadius: o("radiusMd"),
  background: o("bgElevated"),
  color: o("text"),
  fontSize: 13,
  fontWeight: 500,
  cursor: "pointer",
  transition: o("transition")
}, Kn = {
  padding: "28px 24px",
  border: `1px solid ${o("glassBorder")}`,
  borderRadius: o("radiusLg"),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: o("bgSurface")
}, Rt = {
  width: 240,
  height: 240,
  background: o("bgElevated"),
  padding: 8,
  borderRadius: o("radiusMd")
}, Gn = {
  marginTop: 20,
  fontSize: 32,
  fontWeight: 700,
  color: o("text"),
  fontFamily: o("fontMono"),
  letterSpacing: "-0.02em"
}, Fe = {
  fontFamily: o("fontMono"),
  fontSize: "0.9em",
  padding: "1px 6px",
  borderRadius: 4,
  background: o("bg"),
  color: o("textSecondary")
};
function Yn() {
  const [e, i] = P([]), [l, r] = P(!0), [n, t] = P(null), [a, c] = P(null), [d, f] = P(null), p = ce(null), h = () => {
    r(!0), $.listOrders(100).then((u) => i(u.list || [])).catch((u) => t(String((u == null ? void 0 : u.message) || u))).finally(() => r(!1));
  };
  z(h, []), z(() => {
    if (!a) {
      f(null);
      return;
    }
    const u = a.qr_code_content || a.payment_url;
    if (!u) {
      f(null);
      return;
    }
    let k = !1;
    return Ot.toDataURL(u, { width: 240, margin: 2, errorCorrectionLevel: "M" }).then((L) => {
      k || f(L);
    }).catch(() => {
      k || f(null);
    }), () => {
      k = !0;
    };
  }, [a == null ? void 0 : a.payment_url, a == null ? void 0 : a.qr_code_content]), z(() => {
    if (!a || a.status !== "pending") {
      p.current && (window.clearInterval(p.current), p.current = null);
      return;
    }
    return p.current = window.setInterval(async () => {
      try {
        const u = await $.getOrder(a.out_trade_no);
        c(u), u.status !== "pending" && h();
      } catch {
      }
    }, 3e3), () => {
      p.current && (window.clearInterval(p.current), p.current = null);
    };
  }, [a == null ? void 0 : a.out_trade_no, a == null ? void 0 : a.status]);
  const y = (u) => {
    c(u);
  }, S = () => {
    c(null), f(null);
  };
  return l ? /* @__PURE__ */ s("div", { style: qe, children: /* @__PURE__ */ s("div", { style: _t, children: "加载中..." }) }) : n ? /* @__PURE__ */ s("div", { style: qe, children: /* @__PURE__ */ b("div", { style: { ..._t, color: o("danger") }, children: [
    "加载失败: ",
    n
  ] }) }) : /* @__PURE__ */ b("div", { style: qe, children: [
    a && /* @__PURE__ */ s("div", { style: tr, onClick: S, children: /* @__PURE__ */ s("div", { style: nr, onClick: (u) => u.stopPropagation(), children: a.status === "paid" ? /* @__PURE__ */ b(ae, { children: [
      /* @__PURE__ */ s("h3", { style: { margin: "0 0 12px", color: o("success") }, children: "支付成功" }),
      /* @__PURE__ */ b("p", { style: { margin: 0, color: o("text"), fontSize: 14 }, children: [
        "订单 ",
        /* @__PURE__ */ s("code", { style: Ue, children: a.out_trade_no }),
        " 已支付",
        " ",
        /* @__PURE__ */ s("strong", { children: U(a.amount) })
      ] }),
      /* @__PURE__ */ s("button", { style: { ...Pt, marginTop: 16 }, onClick: S, children: "关闭" })
    ] }) : a.status === "pending" ? /* @__PURE__ */ b(ae, { children: [
      /* @__PURE__ */ s("h3", { style: { margin: "0 0 12px", color: o("text") }, children: "扫码付款" }),
      d ? /* @__PURE__ */ s("img", { src: d, alt: "付款二维码", style: { width: 240, height: 240, borderRadius: 8 } }) : /* @__PURE__ */ s("div", { style: { width: 240, height: 240, display: "flex", alignItems: "center", justifyContent: "center", color: o("textTertiary"), border: `1px solid ${o("glassBorder")}`, borderRadius: 8 }, children: "生成二维码中..." }),
      /* @__PURE__ */ s("div", { style: { marginTop: 12, fontWeight: 600, fontSize: 20, color: o("text") }, children: U(a.amount) }),
      /* @__PURE__ */ b("div", { style: { color: o("textSecondary"), fontSize: 13, marginTop: 4 }, children: [
        "请使用 ",
        Mt(a.method),
        " 扫码完成付款"
      ] }),
      /* @__PURE__ */ b("div", { style: { marginTop: 6, color: o("textTertiary"), fontSize: 12 }, children: [
        "订单号：",
        /* @__PURE__ */ s("code", { style: Ue, children: a.out_trade_no })
      ] }),
      /* @__PURE__ */ s("p", { style: { color: o("textTertiary"), fontSize: 12, marginTop: 12, marginBottom: 0 }, children: "支付完成后将自动刷新（每 3 秒检查一次）" }),
      a.payment_url && /* @__PURE__ */ b("p", { style: { fontSize: 12, marginTop: 6, marginBottom: 0 }, children: [
        "扫码不便？",
        " ",
        /* @__PURE__ */ s("a", { href: a.payment_url, target: "_blank", rel: "noreferrer", style: { color: o("primary"), textDecoration: "none" }, children: "点此在新窗口打开付款页 →" })
      ] }),
      /* @__PURE__ */ s("button", { style: { ...rr, marginTop: 16 }, onClick: S, children: "取消" })
    ] }) : /* @__PURE__ */ b(ae, { children: [
      /* @__PURE__ */ b("h3", { style: { margin: "0 0 12px", color: o("textSecondary") }, children: [
        "订单已",
        It(a.status)
      ] }),
      /* @__PURE__ */ s("p", { style: { margin: 0, color: o("textSecondary"), fontSize: 14 }, children: "该订单无法继续支付，请重新发起充值。" }),
      /* @__PURE__ */ s("button", { style: { ...Pt, marginTop: 16 }, onClick: S, children: "关闭" })
    ] }) }) }),
    /* @__PURE__ */ s("div", { style: Qn, children: e.length === 0 ? /* @__PURE__ */ s("p", { style: Xn, children: "暂无充值记录" }) : /* @__PURE__ */ s("div", { style: Zn, children: /* @__PURE__ */ b("table", { style: er, children: [
      /* @__PURE__ */ s("thead", { children: /* @__PURE__ */ b("tr", { children: [
        /* @__PURE__ */ s("th", { style: K, children: "订单号" }),
        /* @__PURE__ */ s("th", { style: K, children: "金额" }),
        /* @__PURE__ */ s("th", { style: K, children: "支付方式" }),
        /* @__PURE__ */ s("th", { style: K, children: "状态" }),
        /* @__PURE__ */ s("th", { style: K, children: "创建时间" }),
        /* @__PURE__ */ s("th", { style: K, children: "支付时间" }),
        /* @__PURE__ */ s("th", { style: K, children: "操作" })
      ] }) }),
      /* @__PURE__ */ s("tbody", { children: e.map((u) => /* @__PURE__ */ b("tr", { children: [
        /* @__PURE__ */ s("td", { style: G, children: /* @__PURE__ */ s("code", { style: Ue, children: u.out_trade_no }) }),
        /* @__PURE__ */ s("td", { style: { ...G, fontWeight: 600 }, children: U(u.amount) }),
        /* @__PURE__ */ s("td", { style: G, children: Mt(u.method) }),
        /* @__PURE__ */ s("td", { style: { ...G, color: Jn(u.status), fontWeight: 600 }, children: It(u.status) }),
        /* @__PURE__ */ s("td", { style: { ...G, color: o("textSecondary") }, children: At(u.created_at) }),
        /* @__PURE__ */ s("td", { style: { ...G, color: o("textSecondary") }, children: u.paid_at ? At(u.paid_at) : "-" }),
        /* @__PURE__ */ s("td", { style: G, children: u.status === "pending" && (u.qr_code_content || u.payment_url) ? /* @__PURE__ */ s("button", { style: or, onClick: () => y(u), children: "继续支付" }) : null })
      ] }, u.id)) })
    ] }) }) })
  ] });
}
function Mt(e) {
  return { alipay: "支付宝", wxpay: "微信支付" }[e] || e || "-";
}
function It(e) {
  return {
    pending: "待支付",
    paid: "已支付",
    expired: "已过期",
    failed: "失败",
    cancelled: "已取消",
    refunded: "已退款"
  }[e] || e;
}
function Jn(e) {
  return {
    pending: o("warning"),
    paid: o("success"),
    expired: o("textTertiary"),
    failed: o("danger"),
    cancelled: o("textTertiary"),
    refunded: o("textTertiary")
  }[e] || "inherit";
}
function At(e) {
  try {
    return new Date(e).toLocaleString();
  } catch {
    return e;
  }
}
const qe = {
  maxWidth: 960,
  margin: "0 auto",
  padding: "24px 24px 48px",
  color: o("text")
}, _t = {
  padding: "40px 0",
  textAlign: "center",
  color: o("textSecondary")
}, Qn = {
  border: `1px solid ${o("glassBorder")}`,
  borderRadius: o("radiusLg"),
  background: o("bgElevated"),
  padding: "8px 0",
  overflow: "hidden"
}, Xn = {
  color: o("textTertiary"),
  textAlign: "center",
  padding: "40px 0",
  fontSize: 14
}, Zn = {
  overflowX: "auto"
}, er = {
  width: "100%",
  borderCollapse: "collapse"
}, K = {
  textAlign: "left",
  padding: "10px 16px",
  borderBottom: `1px solid ${o("glassBorder")}`,
  background: o("bgSurface"),
  color: o("textSecondary"),
  fontWeight: 600,
  fontSize: 12,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  whiteSpace: "nowrap"
}, G = {
  padding: "12px 16px",
  borderBottom: `1px solid ${o("glassBorder")}`,
  fontSize: 13,
  color: o("text"),
  whiteSpace: "nowrap"
}, Ue = {
  fontSize: 12,
  fontFamily: o("fontMono"),
  color: o("textSecondary")
}, tr = {
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
}, nr = {
  background: o("bgElevated"),
  borderRadius: o("radiusLg"),
  padding: "32px",
  textAlign: "center",
  minWidth: 320,
  maxWidth: 400,
  boxShadow: "0 8px 32px rgba(0,0,0,0.2)"
}, Pt = {
  padding: "8px 24px",
  border: "none",
  borderRadius: o("radiusMd"),
  background: o("primary"),
  color: "#fff",
  fontSize: 14,
  cursor: "pointer"
}, rr = {
  padding: "8px 24px",
  border: `1px solid ${o("glassBorder")}`,
  borderRadius: o("radiusMd"),
  background: "transparent",
  color: o("textSecondary"),
  fontSize: 14,
  cursor: "pointer"
}, or = {
  padding: "4px 12px",
  border: `1px solid ${o("primary")}`,
  borderRadius: o("radiusMd"),
  background: "transparent",
  color: o("primary"),
  fontSize: 12,
  cursor: "pointer",
  whiteSpace: "nowrap"
}, Lt = {
  total: 0,
  paid: 0,
  pending: 0,
  expired: 0,
  failed: 0,
  cancelled: 0,
  refunded: 0,
  total_amount_paid: 0,
  today_amount_paid: 0
}, ir = [10, 20, 50, 100], lr = [
  { value: "all", label: "全部状态" },
  { value: "pending", label: "待支付" },
  { value: "paid", label: "已支付" },
  { value: "expired", label: "已过期" },
  { value: "failed", label: "失败" },
  { value: "cancelled", label: "已取消" },
  { value: "refunded", label: "已退款" }
];
function ar() {
  const [e, i] = P([]), [l, r] = P(0), [n, t] = P(Lt), [a, c] = P(!0), [d, f] = P(null), [p, h] = P("all"), [y, S] = P(""), [u, k] = P(1), [L, g] = P(20), C = ee(() => {
    c(!0), f(null), $.adminListOrders({ page: u, pageSize: L, email: y, status: p }).then((m) => {
      i(m.list || []), r(m.total || 0), t(m.stats || Lt);
    }).catch((m) => f(String((m == null ? void 0 : m.message) || m))).finally(() => c(!1));
  }, [u, L, y, p]);
  z(() => {
    const v = setTimeout(C, y ? 300 : 0);
    return () => clearTimeout(v);
  }, [C, y]), z(() => {
    k(1);
  }, [p, y, L]);
  const I = Math.max(1, Math.ceil(l / L));
  return /* @__PURE__ */ b("div", { style: hr, children: [
    /* @__PURE__ */ b("div", { style: pr, children: [
      /* @__PURE__ */ s(Z, { label: "总订单数", value: n.total }),
      /* @__PURE__ */ s(Z, { label: "已支付", value: n.paid, accent: o("success") }),
      /* @__PURE__ */ s(Z, { label: "待支付", value: n.pending, accent: o("warning") }),
      /* @__PURE__ */ s(Z, { label: "已过期", value: n.expired }),
      /* @__PURE__ */ s(Z, { label: "累计收款", value: U(n.total_amount_paid), accent: o("success") }),
      /* @__PURE__ */ s(Z, { label: "今日收款", value: U(n.today_amount_paid), accent: o("success") })
    ] }),
    /* @__PURE__ */ b("div", { style: Sr, children: [
      /* @__PURE__ */ b("div", { style: xr, children: [
        /* @__PURE__ */ s(
          Xt,
          {
            value: p,
            onChange: h,
            options: lr,
            style: wr
          }
        ),
        /* @__PURE__ */ s(
          "input",
          {
            type: "text",
            value: y,
            onChange: (m) => S(m.target.value),
            placeholder: "搜索用户邮箱",
            style: { ...Ir, width: 240 }
          }
        ),
        /* @__PURE__ */ s(ur, { onClick: C, loading: a })
      ] }),
      d ? /* @__PURE__ */ b("p", { style: { ...We, color: o("danger") }, children: [
        "加载失败: ",
        d
      ] }) : a && e.length === 0 ? /* @__PURE__ */ s("p", { style: We, children: "加载中..." }) : e.length === 0 ? /* @__PURE__ */ s("p", { style: We, children: "暂无订单" }) : /* @__PURE__ */ s("div", { style: Ar, children: /* @__PURE__ */ b("table", { style: _r, children: [
        /* @__PURE__ */ s("thead", { children: /* @__PURE__ */ b("tr", { children: [
          /* @__PURE__ */ s("th", { style: O, children: "订单号" }),
          /* @__PURE__ */ s("th", { style: O, children: "用户邮箱" }),
          /* @__PURE__ */ s("th", { style: O, children: "金额" }),
          /* @__PURE__ */ s("th", { style: O, children: "支付方式" }),
          /* @__PURE__ */ s("th", { style: O, children: "服务商" }),
          /* @__PURE__ */ s("th", { style: O, children: "状态" }),
          /* @__PURE__ */ s("th", { style: O, children: "创建时间" }),
          /* @__PURE__ */ s("th", { style: O, children: "支付时间" })
        ] }) }),
        /* @__PURE__ */ s("tbody", { children: e.map((m) => /* @__PURE__ */ b("tr", { children: [
          /* @__PURE__ */ s("td", { style: j, children: /* @__PURE__ */ s("code", { style: Pr, children: m.out_trade_no }) }),
          /* @__PURE__ */ s("td", { style: j, children: m.user_email ? /* @__PURE__ */ s("span", { style: { color: o("text") }, children: m.user_email }) : /* @__PURE__ */ b("span", { style: { color: o("textTertiary") }, children: [
            "#",
            m.user_id
          ] }) }),
          /* @__PURE__ */ s("td", { style: { ...j, fontWeight: 600 }, children: U(m.amount) }),
          /* @__PURE__ */ s("td", { style: j, children: sr(m.method) }),
          /* @__PURE__ */ s("td", { style: { ...j, color: o("textSecondary") }, children: m.provider_id || "-" }),
          /* @__PURE__ */ s("td", { style: { ...j, color: dr(m.status), fontWeight: 600 }, children: cr(m.status) }),
          /* @__PURE__ */ s("td", { style: { ...j, color: o("textSecondary") }, children: zt(m.created_at) }),
          /* @__PURE__ */ s("td", { style: { ...j, color: o("textSecondary") }, children: m.paid_at ? zt(m.paid_at) : "-" })
        ] }, m.id)) })
      ] }) }),
      /* @__PURE__ */ s(
        fr,
        {
          page: u,
          pageSize: L,
          total: l,
          totalPages: I,
          onPageChange: k,
          onPageSizeChange: g
        }
      )
    ] })
  ] });
}
function Z({ label: e, value: i, accent: l }) {
  return /* @__PURE__ */ b("div", { style: yr, children: [
    /* @__PURE__ */ s("div", { style: mr, children: e }),
    /* @__PURE__ */ s("div", { style: { ...br, color: l || o("text") }, children: i })
  ] });
}
function sr(e) {
  return { alipay: "支付宝", wxpay: "微信支付" }[e] || e || "-";
}
function cr(e) {
  return {
    pending: "待支付",
    paid: "已支付",
    expired: "已过期",
    failed: "失败",
    cancelled: "已取消",
    refunded: "已退款"
  }[e] || e;
}
function dr(e) {
  return {
    pending: o("warning"),
    paid: o("success"),
    expired: o("textTertiary"),
    failed: o("danger"),
    cancelled: o("textTertiary"),
    refunded: o("textTertiary")
  }[e] || "inherit";
}
function zt(e) {
  try {
    return new Date(e).toLocaleString();
  } catch {
    return e;
  }
}
function ur({ onClick: e, loading: i }) {
  const [l, r] = P(!1);
  return /* @__PURE__ */ b(ae, { children: [
    /* @__PURE__ */ s("style", { children: "@keyframes ag-epay-spin { to { transform: rotate(360deg); } }" }),
    /* @__PURE__ */ s(
      "button",
      {
        type: "button",
        "aria-label": "刷新",
        onClick: e,
        disabled: i,
        onMouseEnter: () => r(!0),
        onMouseLeave: () => r(!1),
        style: {
          marginLeft: "auto",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 36,
          height: 36,
          border: `1px solid ${o("glassBorder")}`,
          borderRadius: 10,
          background: l ? o("bgHover") : "transparent",
          color: o(l ? "textSecondary" : "textTertiary"),
          cursor: i ? "not-allowed" : "pointer",
          opacity: i ? 0.6 : 1,
          transition: o("transition"),
          padding: 0
        },
        children: /* @__PURE__ */ b(
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
              /* @__PURE__ */ s("path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" }),
              /* @__PURE__ */ s("path", { d: "M21 3v5h-5" }),
              /* @__PURE__ */ s("path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" }),
              /* @__PURE__ */ s("path", { d: "M8 16H3v5" })
            ]
          }
        )
      }
    )
  ] });
}
function Xt({
  value: e,
  options: i,
  onChange: l,
  style: r
}) {
  const [n, t] = P(!1), a = ce(null), c = i.find((d) => d.value === e);
  return z(() => {
    if (!n) return;
    const d = (f) => {
      a.current && !a.current.contains(f.target) && t(!1);
    };
    return document.addEventListener("mousedown", d), () => document.removeEventListener("mousedown", d);
  }, [n]), /* @__PURE__ */ b("div", { ref: a, style: vr, children: [
    /* @__PURE__ */ b(
      "button",
      {
        type: "button",
        style: { ...r, ...Cr, ...n ? kr : null },
        "aria-haspopup": "listbox",
        "aria-expanded": n,
        onClick: () => t((d) => !d),
        children: [
          /* @__PURE__ */ s("span", { style: Tr, children: (c == null ? void 0 : c.label) ?? "" }),
          /* @__PURE__ */ s("span", { "aria-hidden": "true", style: Br, children: "v" })
        ]
      }
    ),
    n && /* @__PURE__ */ s("div", { role: "listbox", style: Er, children: i.map((d) => {
      const f = d.value === e;
      return /* @__PURE__ */ s(
        "button",
        {
          type: "button",
          role: "option",
          "aria-selected": f,
          style: { ...Rr, ...f ? Mr : null },
          onClick: () => {
            l(d.value), t(!1);
          },
          children: d.label
        },
        d.value
      );
    }) })
  ] });
}
function fr({ page: e, pageSize: i, total: l, totalPages: r, onPageChange: n, onPageSizeChange: t }) {
  const a = gr(e, r);
  return /* @__PURE__ */ b("div", { style: Lr, children: [
    /* @__PURE__ */ b("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
      /* @__PURE__ */ b("span", { style: zr, children: [
        "共 ",
        l,
        " 条 · 第 ",
        e,
        "/",
        r,
        " 页"
      ] }),
      /* @__PURE__ */ s(
        Xt,
        {
          value: String(i),
          onChange: (c) => t(Number(c)),
          options: ir.map((c) => ({ value: String(c), label: `${c} 条/页` })),
          style: Nr
        }
      )
    ] }),
    /* @__PURE__ */ b("div", { style: { display: "flex", alignItems: "center", gap: 4 }, children: [
      /* @__PURE__ */ s(
        "button",
        {
          type: "button",
          "aria-label": "上一页",
          style: Nt(e <= 1),
          disabled: e <= 1,
          onClick: () => n(e - 1),
          children: "‹"
        }
      ),
      a.map(
        (c, d) => c === "..." ? /* @__PURE__ */ s("span", { style: Dr, children: "···" }, `e-${d}`) : /* @__PURE__ */ s(
          "button",
          {
            type: "button",
            style: c === e ? $r : Zt,
            onClick: () => n(c),
            children: c
          },
          c
        )
      ),
      /* @__PURE__ */ s(
        "button",
        {
          type: "button",
          "aria-label": "下一页",
          style: Nt(e >= r),
          disabled: e >= r,
          onClick: () => n(e + 1),
          children: "›"
        }
      )
    ] })
  ] });
}
function gr(e, i) {
  if (i <= 7) return Array.from({ length: i }, (r, n) => n + 1);
  const l = [1];
  e > 3 && l.push("...");
  for (let r = Math.max(2, e - 1); r <= Math.min(i - 1, e + 1); r++)
    l.push(r);
  return e < i - 2 && l.push("..."), l.push(i), l;
}
const hr = {
  maxWidth: 1280,
  margin: "0 auto",
  padding: "24px 24px 48px",
  color: o("text")
}, pr = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  gap: 12,
  marginBottom: 20
}, yr = {
  padding: "18px 20px",
  border: `1px solid ${o("glassBorder")}`,
  borderRadius: o("radiusLg"),
  background: o("bgSurface")
}, mr = {
  fontSize: 12,
  color: o("textSecondary"),
  fontWeight: 500,
  letterSpacing: "0.02em"
}, br = {
  fontSize: 26,
  fontWeight: 700,
  marginTop: 8,
  letterSpacing: "-0.02em"
}, Sr = {
  border: `1px solid ${o("glassBorder")}`,
  borderRadius: o("radiusLg"),
  background: o("bgSurface"),
  padding: "20px 20px 8px"
}, xr = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  marginBottom: 16,
  flexWrap: "wrap"
}, wr = {
  padding: "8px 12px",
  minWidth: 140,
  border: `1px solid ${o("glassBorder")}`,
  borderRadius: o("radiusMd"),
  background: o("bgElevated"),
  color: o("text"),
  fontSize: 13
}, vr = {
  position: "relative",
  display: "inline-block"
}, Cr = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 8,
  width: "100%",
  fontFamily: "inherit",
  cursor: "pointer",
  outline: "none"
}, kr = {
  borderColor: o("primary"),
  boxShadow: `0 0 0 3px ${o("primarySubtle")}`
}, Tr = {
  minWidth: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
}, Br = {
  flexShrink: 0,
  color: o("textTertiary"),
  fontSize: 10,
  lineHeight: 1
}, Er = {
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
  border: `1px solid ${o("glassBorder")}`,
  borderRadius: o("radiusMd"),
  background: o("bgSurface"),
  boxShadow: "0 18px 48px rgba(0, 0, 0, 0.28)",
  overflowY: "auto"
}, Rr = {
  display: "block",
  width: "100%",
  padding: "8px 10px",
  border: "none",
  borderRadius: 8,
  background: "transparent",
  color: o("textSecondary"),
  fontFamily: "inherit",
  fontSize: 13,
  lineHeight: 1.35,
  textAlign: "left",
  whiteSpace: "nowrap",
  cursor: "pointer"
}, Mr = {
  background: o("primarySubtle"),
  color: o("primary"),
  fontWeight: 600
}, Ir = {
  padding: "8px 12px",
  width: 200,
  border: `1px solid ${o("glassBorder")}`,
  borderRadius: o("radiusMd"),
  background: o("bgElevated"),
  color: o("text"),
  fontSize: 13,
  outline: "none"
}, We = {
  color: o("textTertiary"),
  textAlign: "center",
  padding: "40px 0",
  fontSize: 14
}, Ar = {
  overflowX: "auto",
  margin: "0 -20px"
}, _r = {
  width: "100%",
  borderCollapse: "collapse"
}, O = {
  textAlign: "left",
  padding: "10px 16px",
  borderTop: `1px solid ${o("glassBorder")}`,
  borderBottom: `1px solid ${o("glassBorder")}`,
  background: o("bgSurface"),
  color: o("textSecondary"),
  fontWeight: 600,
  fontSize: 12,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  whiteSpace: "nowrap"
}, j = {
  padding: "12px 16px",
  borderBottom: `1px solid ${o("glassBorder")}`,
  fontSize: 13,
  color: o("text"),
  whiteSpace: "nowrap"
}, Pr = {
  fontSize: 12,
  fontFamily: o("fontMono"),
  color: o("textSecondary")
}, Lr = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "14px 4px 6px",
  flexWrap: "wrap",
  gap: 12
}, zr = {
  fontSize: 12,
  color: o("textTertiary"),
  fontFamily: o("fontMono")
}, Nr = {
  fontSize: 12,
  color: o("textSecondary"),
  background: "transparent",
  border: `1px solid ${o("glassBorder")}`,
  borderRadius: 6,
  padding: "2px 8px",
  cursor: "pointer",
  outline: "none"
}, Zt = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 32,
  height: 32,
  borderRadius: 6,
  border: "none",
  background: "transparent",
  color: o("textSecondary"),
  fontSize: 12,
  fontWeight: 500,
  cursor: "pointer",
  transition: o("transition")
}, $r = {
  ...Zt,
  background: o("primary"),
  color: o("textInverse"),
  fontWeight: 600
};
function Nt(e) {
  return {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    borderRadius: 6,
    border: "none",
    background: "transparent",
    color: o("textSecondary"),
    fontSize: 18,
    lineHeight: 1,
    cursor: e ? "not-allowed" : "pointer",
    opacity: e ? 0.3 : 1,
    transition: o("transition")
  };
}
const Dr = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 28,
  color: o("textTertiary"),
  fontSize: 12
};
let Fr = 0;
function qr() {
  const [e, i] = P([]), l = ce(i);
  l.current = i;
  const r = ee((c) => {
    l.current((d) => d.filter((f) => f.id !== c));
  }, []), n = ee((c, d) => {
    const f = Fr++;
    l.current((p) => [...p, { id: f, type: c, text: d }]), setTimeout(() => r(f), 4e3);
  }, [r]), t = ee((c) => n("success", c), [n]), a = ee((c) => n("error", c), [n]);
  return {
    toast: { success: t, error: a },
    Toaster: /* @__PURE__ */ s(Ur, { messages: e, onClose: r })
  };
}
function Ur({
  messages: e,
  onClose: i
}) {
  return z(() => {
    const l = "airgate-epay-toast-keyframes";
    if (document.getElementById(l)) return;
    const r = document.createElement("style");
    r.id = l, r.textContent = `
@keyframes airgate-epay-toast-in {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}`, document.head.appendChild(r);
  }, []), e.length === 0 ? null : /* @__PURE__ */ s("div", { style: Hr, children: e.map((l) => /* @__PURE__ */ s(Wr, { message: l, onClose: () => i(l.id) }, l.id)) });
}
function Wr({
  message: e,
  onClose: i
}) {
  const l = e.type === "success", r = o(l ? "success" : "danger"), n = o(l ? "success" : "danger");
  return /* @__PURE__ */ b(
    "div",
    {
      style: {
        ...Or,
        borderColor: n
      },
      children: [
        /* @__PURE__ */ s("span", { style: { ...jr, color: r }, children: l ? "✓" : "✕" }),
        /* @__PURE__ */ s("span", { style: { ...Vr, color: o("text") }, children: e.text }),
        /* @__PURE__ */ s("button", { onClick: i, style: Kr, "aria-label": "关闭", children: "×" })
      ]
    }
  );
}
const Hr = {
  position: "fixed",
  top: 20,
  right: 20,
  zIndex: 1e4,
  display: "flex",
  flexDirection: "column",
  gap: 10,
  pointerEvents: "none"
}, Or = {
  pointerEvents: "auto",
  display: "flex",
  alignItems: "center",
  gap: 12,
  minWidth: 260,
  maxWidth: 400,
  padding: "12px 14px",
  borderRadius: o("radiusLg"),
  border: "1px solid",
  background: o("bgElevated"),
  boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
  animation: "airgate-epay-toast-in 0.25s cubic-bezier(0.16, 1, 0.3, 1)"
}, jr = {
  fontSize: 16,
  fontWeight: 700,
  width: 18,
  textAlign: "center",
  flexShrink: 0
}, Vr = {
  flex: 1,
  fontSize: 13,
  lineHeight: 1.4
}, Kr = {
  flexShrink: 0,
  background: "transparent",
  border: "none",
  color: o("textTertiary"),
  fontSize: 18,
  lineHeight: 1,
  cursor: "pointer",
  padding: 0,
  width: 18,
  height: 18
};
function en(e, i) {
  var r;
  const l = window;
  return (r = l.airgate) != null && r.confirm ? l.airgate.confirm(e, i) : Promise.resolve(window.confirm(e));
}
function Gr() {
  const [e, i] = P([]), [l, r] = P([]), [n, t] = P(!0), [a, c] = P(null), [d, f] = P(null), { toast: p, Toaster: h } = qr(), y = ee(() => {
    t(!0), c(null), $.adminListProviders().then((g) => {
      i(g.providers || []), r(g.kinds || []);
    }).catch((g) => c(String((g == null ? void 0 : g.message) || g))).finally(() => t(!1));
  }, []);
  z(y, [y]);
  const S = (g) => {
    f({
      mode: "create",
      id: "",
      kind: g.kind,
      enabled: !0,
      config: Qr(g)
    });
  }, u = (g) => {
    f({
      mode: "edit",
      id: g.id,
      originalId: g.id,
      kind: g.kind,
      enabled: g.enabled,
      config: { ...g.config }
    });
  }, k = async (g) => {
    if (await en(`确认删除服务商 ${g}？此操作无法撤销。`, { title: "删除服务商", danger: !0 }))
      try {
        await $.adminDeleteProvider(g), p.success(`已删除 ${g}`), y();
      } catch (C) {
        p.error("删除失败: " + C.message);
      }
  }, L = async (g) => {
    try {
      await $.adminUpsertProvider({
        id: g.id,
        kind: g.kind,
        enabled: !g.enabled,
        config: g.config
      }), p.success(`${g.id} 已${g.enabled ? "禁用" : "启用"}`), y();
    } catch (C) {
      p.error("操作失败: " + C.message);
    }
  };
  return n ? /* @__PURE__ */ s("div", { style: Oe, children: /* @__PURE__ */ s("div", { style: $t, children: "加载中..." }) }) : a ? /* @__PURE__ */ s("div", { style: Oe, children: /* @__PURE__ */ b("div", { style: { ...$t, color: o("danger") }, children: [
    "加载失败: ",
    a
  ] }) }) : /* @__PURE__ */ b("div", { style: Oe, children: [
    h,
    /* @__PURE__ */ b("div", { style: Ft, children: [
      /* @__PURE__ */ s("h3", { style: Dt, children: "添加服务商" }),
      /* @__PURE__ */ s("p", { style: Xr, children: "每种类型的服务商可以创建多个实例（例如 xunhu_main / xunhu_backup），便于多商户号或主备切换。" }),
      /* @__PURE__ */ s("div", { style: Zr, children: l.map((g) => /* @__PURE__ */ b("div", { style: eo, children: [
        /* @__PURE__ */ s("div", { style: { fontWeight: 600, color: o("text"), fontSize: 15 }, children: g.name }),
        /* @__PURE__ */ s("div", { style: { fontSize: 12, color: o("textSecondary"), marginTop: 6 }, children: g.description }),
        /* @__PURE__ */ b("div", { style: { fontSize: 12, color: o("textTertiary"), marginTop: 8 }, children: [
          "支持: ",
          g.supported_methods.map(Ve).join(" / ")
        ] }),
        /* @__PURE__ */ s("button", { style: { ...nn, marginTop: 12, width: "100%" }, onClick: () => S(g), children: "+ 添加" })
      ] }, g.kind)) })
    ] }),
    /* @__PURE__ */ b("div", { style: Ft, children: [
      /* @__PURE__ */ s("h3", { style: Dt, children: "已配置的服务商实例" }),
      e.length === 0 ? /* @__PURE__ */ s("p", { style: ro, children: "暂未配置任何服务商。请在上方点「+ 添加」选择类型。" }) : /* @__PURE__ */ s("div", { style: to, children: e.map((g) => /* @__PURE__ */ b("div", { style: no, children: [
        /* @__PURE__ */ b("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" }, children: [
          /* @__PURE__ */ b("div", { children: [
            /* @__PURE__ */ s("div", { style: { fontWeight: 600, color: o("text"), fontSize: 15 }, children: g.name || g.id }),
            /* @__PURE__ */ b("div", { style: { fontSize: 12, color: o("textTertiary"), marginTop: 4, fontFamily: o("fontMono") }, children: [
              g.id,
              " · ",
              g.kind
            ] })
          ] }),
          /* @__PURE__ */ s("span", { style: g.is_running ? tn : oo, children: g.is_running ? "运行中" : g.enabled ? "已启用未就绪" : "已禁用" })
        ] }),
        /* @__PURE__ */ b("div", { style: { fontSize: 12, color: o("textSecondary"), marginTop: 12 }, children: [
          "支持: ",
          g.supported_methods.map(Ve).join(" / ")
        ] }),
        /* @__PURE__ */ b("div", { style: { display: "flex", gap: 8, marginTop: 16 }, children: [
          /* @__PURE__ */ s("button", { style: se, onClick: () => u(g), children: "编辑" }),
          /* @__PURE__ */ s("button", { style: se, onClick: () => L(g), children: g.enabled ? "禁用" : "启用" }),
          /* @__PURE__ */ s("button", { style: { ...se, color: o("danger") }, onClick: () => k(g.id), children: "删除" })
        ] })
      ] }, g.id)) })
    ] }),
    d && /* @__PURE__ */ s(
      Yr,
      {
        editing: d,
        kinds: l,
        onCancel: () => f(null),
        onSaved: (g) => {
          f(null), p.success(g), y();
        },
        onError: (g) => p.error(g)
      }
    )
  ] });
}
function Yr({
  editing: e,
  kinds: i,
  onCancel: l,
  onSaved: r,
  onError: n
}) {
  const [t, a] = P(e), [c, d] = P(!1), f = an(() => i.find((h) => h.kind === t.kind), [i, t.kind]), p = async () => {
    if (!f) {
      n("未知的服务商类型");
      return;
    }
    for (const h of f.field_descriptors)
      if (h.required && !t.config[h.key]) {
        n(`「${h.label}」必填`);
        return;
      }
    if (!(t.mode === "edit" && t.originalId && t.id.trim() !== t.originalId && !await en(
      `确认将实例 ID 从「${t.originalId}」重命名为「${t.id.trim()}」？

所有历史订单的 provider_id 引用会在事务里同步更新；如果该商户号在第三方支付平台已经下过单，
已发出去的回调地址（含原 ID）会失效——平台未来回调请求会路由不到本服务。`,
      { title: "重命名服务商 ID", danger: !0 }
    ))) {
      d(!0);
      try {
        const y = (await $.adminUpsertProvider({
          id: t.id.trim(),
          original_id: t.originalId,
          kind: t.kind,
          enabled: t.enabled,
          config: t.config
        })).id || t.id.trim();
        r(t.mode === "create" ? `已创建 ${y}` : `已更新 ${y}`);
      } catch (h) {
        n("保存失败: " + h.message);
      } finally {
        d(!1);
      }
    }
  };
  return /* @__PURE__ */ s("div", { style: ao, onClick: l, children: /* @__PURE__ */ b("div", { style: so, onClick: (h) => h.stopPropagation(), children: [
    /* @__PURE__ */ b("div", { style: co, children: [
      /* @__PURE__ */ b("h3", { style: { margin: 0, fontSize: 16, fontWeight: 600 }, children: [
        t.mode === "create" ? "添加" : "编辑",
        "服务商 - ",
        (f == null ? void 0 : f.name) || t.kind
      ] }),
      /* @__PURE__ */ s("button", { style: uo, onClick: l, children: "×" })
    ] }),
    /* @__PURE__ */ b("div", { style: fo, children: [
      /* @__PURE__ */ s(
        He,
        {
          label: "实例 ID",
          description: t.mode === "edit" ? "可修改。改名时后端会在事务里同步更新所有历史订单的 provider_id 引用，回调路径也会立即指向新名字。" : "可选。留空则自动生成 epay_xunhu_1 之类的序号；也可以填一个有意义的名字如 xunhu_main / xunhu_backup 便于多商户号区分。",
          children: /* @__PURE__ */ s(
            "input",
            {
              type: "text",
              value: t.id,
              onChange: (h) => a({ ...t, id: h.target.value }),
              placeholder: t.mode === "create" ? "留空自动生成" : "",
              style: { ...je, fontFamily: o("fontMono"), fontSize: 12 }
            }
          )
        }
      ),
      /* @__PURE__ */ s(He, { label: "启用", children: /* @__PURE__ */ b("label", { style: { display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }, children: [
        /* @__PURE__ */ s(
          "input",
          {
            type: "checkbox",
            checked: t.enabled,
            onChange: (h) => a({ ...t, enabled: h.target.checked })
          }
        ),
        /* @__PURE__ */ s("span", { style: { fontSize: 13, color: o("textSecondary") }, children: "勾选后该服务商参与支付路由" })
      ] }) }),
      f == null ? void 0 : f.field_descriptors.map((h) => /* @__PURE__ */ s(He, { label: h.label, description: h.description, required: h.required, children: h.type === "textarea" ? /* @__PURE__ */ s(
        "textarea",
        {
          value: t.config[h.key] || "",
          onChange: (y) => a({ ...t, config: { ...t.config, [h.key]: y.target.value } }),
          placeholder: h.placeholder,
          style: { ...je, minHeight: 120, fontFamily: o("fontMono"), fontSize: 12 }
        }
      ) : h.type === "bool" ? /* @__PURE__ */ s("label", { style: { display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }, children: /* @__PURE__ */ s(
        "input",
        {
          type: "checkbox",
          checked: t.config[h.key] === "true",
          onChange: (y) => a({ ...t, config: { ...t.config, [h.key]: y.target.checked ? "true" : "false" } })
        }
      ) }) : h.type === "method-multi" ? /* @__PURE__ */ s(
        Jr,
        {
          candidates: f.supported_methods,
          value: t.config[h.key] || "",
          onChange: (y) => a({ ...t, config: { ...t.config, [h.key]: y } })
        }
      ) : /* @__PURE__ */ s(
        "input",
        {
          type: h.type === "password" ? "password" : h.type === "number" ? "number" : "text",
          value: t.config[h.key] || "",
          onChange: (y) => a({ ...t, config: { ...t.config, [h.key]: y.target.value } }),
          placeholder: h.placeholder,
          style: je
        }
      ) }, h.key))
    ] }),
    /* @__PURE__ */ b("div", { style: go, children: [
      /* @__PURE__ */ s("button", { style: se, onClick: l, disabled: c, children: "取消" }),
      /* @__PURE__ */ s("button", { style: nn, onClick: p, disabled: c, children: c ? "保存中..." : "保存" })
    ] })
  ] }) });
}
function Jr({
  candidates: e,
  value: i,
  onChange: l
}) {
  const r = new Set(i.split(",").map((t) => t.trim()).filter(Boolean)), n = (t) => {
    r.has(t) ? r.delete(t) : r.add(t);
    const a = e.filter((c) => r.has(c)).join(",");
    l(a);
  };
  return /* @__PURE__ */ b("div", { style: { display: "flex", flexWrap: "wrap", gap: 12 }, children: [
    e.map((t) => {
      const a = r.has(t);
      return /* @__PURE__ */ b(
        "label",
        {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 14px",
            border: `1px solid ${o(a ? "primary" : "glassBorder")}`,
            borderRadius: o("radiusMd"),
            background: o(a ? "primarySubtle" : "bg"),
            color: o(a ? "primary" : "text"),
            cursor: "pointer",
            fontSize: 13,
            fontWeight: a ? 600 : 400,
            transition: "all 0.15s"
          },
          children: [
            /* @__PURE__ */ s(
              "input",
              {
                type: "checkbox",
                checked: a,
                onChange: () => n(t),
                style: { margin: 0 }
              }
            ),
            Ve(t)
          ]
        },
        t
      );
    }),
    e.length === 0 && /* @__PURE__ */ s("span", { style: { fontSize: 12, color: o("textTertiary") }, children: "该协议没有可选的支付方式" })
  ] });
}
function He({
  label: e,
  description: i,
  required: l,
  children: r
}) {
  return /* @__PURE__ */ b("div", { style: { marginBottom: 16 }, children: [
    /* @__PURE__ */ b("label", { style: io, children: [
      e,
      l && /* @__PURE__ */ s("span", { style: { color: o("danger"), marginLeft: 4 }, children: "*" })
    ] }),
    r,
    i && /* @__PURE__ */ s("div", { style: lo, children: i })
  ] });
}
function Ve(e) {
  return { alipay: "支付宝", wxpay: "微信支付" }[e] || e;
}
function Qr(e) {
  const i = {};
  for (const l of e.field_descriptors)
    l.type === "bool" ? i[l.key] = "false" : i[l.key] = "";
  return i;
}
const Oe = {
  maxWidth: 1280,
  margin: "0 auto",
  padding: "24px 24px 48px",
  color: o("text")
}, $t = {
  padding: "40px 0",
  textAlign: "center",
  color: o("textSecondary")
}, Xr = {
  margin: "4px 0 16px",
  fontSize: 13,
  color: o("textSecondary")
}, Dt = {
  margin: "0 0 12px",
  fontSize: 14,
  fontWeight: 600,
  color: o("text"),
  textTransform: "uppercase",
  letterSpacing: "0.04em"
}, Ft = {
  border: `1px solid ${o("glassBorder")}`,
  borderRadius: o("radiusLg"),
  background: o("bgSurface"),
  padding: 20,
  marginBottom: 20
}, Zr = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
  gap: 12
}, eo = {
  border: `1px solid ${o("glassBorder")}`,
  borderRadius: o("radiusMd"),
  padding: 16,
  background: o("bgElevated")
}, to = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
  gap: 12
}, no = {
  border: `1px solid ${o("glassBorder")}`,
  borderRadius: o("radiusMd"),
  padding: 16,
  background: o("bgElevated")
}, ro = {
  color: o("textTertiary"),
  textAlign: "center",
  padding: "24px 0",
  fontSize: 14
}, tn = {
  padding: "2px 8px",
  borderRadius: 4,
  background: o("successSubtle"),
  color: o("success"),
  fontSize: 11,
  fontWeight: 600
}, oo = {
  ...tn,
  background: o("warningSubtle"),
  color: o("warning")
}, se = {
  padding: "6px 14px",
  border: `1px solid ${o("glassBorder")}`,
  borderRadius: o("radiusMd"),
  background: "transparent",
  color: o("text"),
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 500
}, nn = {
  padding: "8px 16px",
  border: "none",
  borderRadius: o("radiusMd"),
  background: o("primary"),
  color: o("textInverse"),
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 600
}, je = {
  width: "100%",
  padding: "8px 12px",
  border: `1px solid ${o("glassBorder")}`,
  borderRadius: o("radiusMd"),
  background: o("bgElevated"),
  color: o("text"),
  fontSize: 13,
  boxSizing: "border-box"
}, io = {
  display: "block",
  fontSize: 12,
  fontWeight: 600,
  color: o("textSecondary"),
  marginBottom: 6,
  textTransform: "uppercase",
  letterSpacing: "0.03em"
}, lo = {
  marginTop: 6,
  fontSize: 11,
  color: o("textTertiary")
}, ao = {
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
}, so = {
  width: 600,
  maxWidth: "92vw",
  maxHeight: "90vh",
  display: "flex",
  flexDirection: "column",
  background: o("bgSurface"),
  border: `1px solid ${o("glassBorder")}`,
  borderRadius: o("radiusLg"),
  overflow: "hidden"
}, co = {
  padding: "16px 20px",
  borderBottom: `1px solid ${o("glassBorder")}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
}, uo = {
  background: "transparent",
  border: "none",
  color: o("textSecondary"),
  fontSize: 24,
  cursor: "pointer",
  lineHeight: 1
}, fo = {
  padding: 20,
  overflowY: "auto",
  flex: 1
}, go = {
  padding: "12px 20px",
  borderTop: `1px solid ${o("glassBorder")}`,
  display: "flex",
  justifyContent: "flex-end",
  gap: 8
}, yo = {
  routes: [
    { path: "/recharge", component: Dn },
    { path: "/orders", component: Yn },
    { path: "/admin/orders", component: ar },
    { path: "/admin/providers", component: Gr }
  ]
};
export {
  yo as default
};
