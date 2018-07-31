/**
  * 检查两个字符串的相似度
  */
export function strSimilarity(str1: string, str2: string) {
  let n = str1.length, m = str2.length, d = [];
  let i, j, cost, l = n > m ? n : m;
  if (n == 0) return 0;
  if (m == 0) return 0;
  for (i = 0; i <= n; i++) {
    d[i] = [i];
  }
  for (j = 0; j <= m; j++) {
    d[0][j] = j;
  }
  for (i = 1; i <= n; i++) {
    for (j = 1; j <= m; j++) {
      if (str1[i - 1] == str2[j - 1]) {
        cost = 0;
      } else {
        cost = 1;
      }
      d[i][j] = ((a, b, c) => {
        return a < b ? (a < c ? a : c) : (b < c ? b : c);
      })(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
    }
  }
  return (1 - d[n][m] / l);
}

// constants
const b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const b64tab = new Map(b64chars.split("").map((v, i) => [v, i]) as [string, number][]);
const fromCharCode = String.fromCharCode;
// encoder stuff
const cb_utob = function (c) {
  var cc: any;
  if (c.length < 2) {
    cc = c.charCodeAt(0);
    return cc < 0x80 ? c
      : cc < 0x800 ? (fromCharCode(0xc0 | (cc >>> 6))
        + fromCharCode(0x80 | (cc & 0x3f)))
        : (fromCharCode(0xe0 | ((cc >>> 12) & 0x0f))
          + fromCharCode(0x80 | ((cc >>> 6) & 0x3f))
          + fromCharCode(0x80 | (cc & 0x3f)));
  } else {
    cc = 0x10000
      + (c.charCodeAt(0) - 0xD800) * 0x400
      + (c.charCodeAt(1) - 0xDC00);
    return (fromCharCode(0xf0 | ((cc >>> 18) & 0x07))
      + fromCharCode(0x80 | ((cc >>> 12) & 0x3f))
      + fromCharCode(0x80 | ((cc >>> 6) & 0x3f))
      + fromCharCode(0x80 | (cc & 0x3f)));
  }
};
var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
var utob = function (u) {
  return u.replace(re_utob, cb_utob);
};
var cb_encode = function (ccc) {
  var padlen = [0, 2, 1][ccc.length % 3],
    ord = ccc.charCodeAt(0) << 16
      | ((ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8)
      | ((ccc.length > 2 ? ccc.charCodeAt(2) : 0)),
    chars = [
      b64chars.charAt(ord >>> 18),
      b64chars.charAt((ord >>> 12) & 63),
      padlen >= 2 ? '=' : b64chars.charAt((ord >>> 6) & 63),
      padlen >= 1 ? '=' : b64chars.charAt(ord & 63)
    ];
  return chars.join('');
};
var btoa = function (b) {
  return b.replace(/[\s\S]{1,3}/g, cb_encode);
};
var _encode = function (u) { return btoa(utob(u)) };

// decoder stuff
var re_btou = new RegExp([
  '[\xC0-\xDF][\x80-\xBF]',
  '[\xE0-\xEF][\x80-\xBF]{2}',
  '[\xF0-\xF7][\x80-\xBF]{3}'
].join('|'), 'g');
var cb_btou = function (cccc) {
  switch (cccc.length) {
    case 4:
      var cp = ((0x07 & cccc.charCodeAt(0)) << 18)
        | ((0x3f & cccc.charCodeAt(1)) << 12)
        | ((0x3f & cccc.charCodeAt(2)) << 6)
        | (0x3f & cccc.charCodeAt(3)),
        offset = cp - 0x10000;
      return (fromCharCode((offset >>> 10) + 0xD800)
        + fromCharCode((offset & 0x3FF) + 0xDC00));
    case 3:
      return fromCharCode(
        ((0x0f & cccc.charCodeAt(0)) << 12)
        | ((0x3f & cccc.charCodeAt(1)) << 6)
        | (0x3f & cccc.charCodeAt(2))
      );
    default:
      return fromCharCode(
        ((0x1f & cccc.charCodeAt(0)) << 6)
        | (0x3f & cccc.charCodeAt(1))
      );
  }
};
var btou = function (b) {
  return b.replace(re_btou, cb_btou);
};
var cb_decode = function (cccc) {
  var len = cccc.length,
    padlen = len % 4,
    n = (len > 0 ? b64tab.get(cccc.charAt(0)) << 18 : 0)
      | (len > 1 ? b64tab.get(cccc.charAt(1)) << 12 : 0)
      | (len > 2 ? b64tab.get(cccc.charAt(2)) << 6 : 0)
      | (len > 3 ? b64tab.get(cccc.charAt(3)) : 0),
    chars = [
      fromCharCode(n >>> 16),
      fromCharCode((n >>> 8) & 0xff),
      fromCharCode(n & 0xff)
    ];
  chars.length -= [0, 0, 2, 1][padlen];
  return chars.join('');
};
var atob = function (a) {
  return a.replace(/[\s\S]{1,4}/g, cb_decode);
};
var _decode = function (a) { return btou(atob(a)) };


export const Base64 = {
  decode: (a: string) => {
    return _decode(
      String(a).replace(/[-_]/g, function (m0) { return m0 == '-' ? '+' : '/' })
        .replace(/[^A-Za-z0-9\+\/]/g, '')
    );
  },

  encode: (u: string, urisafe) => {
    return !urisafe
      ? _encode(String(u))
      : _encode(String(u)).replace(/[+\/]/g, function (m0) {
        return m0 == '+' ? '-' : '_';
      }).replace(/=/g, '');
  },

  encodeURI: (u: string) => { return Base64.encode(u, true) }
}

