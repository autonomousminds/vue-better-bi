import { shallowRef as Ha, ref as ie, onMounted as Re, onUnmounted as et, watch as De, computed as O, inject as ut, provide as xt, defineComponent as he, openBlock as fe, createElementBlock as Xe, createElementVNode as Fo, normalizeStyle as Lo, renderSlot as ft, reactive as wa, unref as Q, normalizeClass as Io, createStaticVNode as Ca, createCommentVNode as zt, createBlock as ye, withCtx as ve, createVNode as xe, useCssVars as Va } from "vue";
import * as ke from "echarts";
var zo = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ta(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Wa = { exports: {} };
(function(t) {
  var a = {}, e = function(r) {
    r.version = "0.11.2";
    function n(g) {
      for (var b = "", w = g.length - 1; w >= 0; ) b += g.charAt(w--);
      return b;
    }
    function l(g, b) {
      for (var w = ""; w.length < b; ) w += g;
      return w;
    }
    function i(g, b) {
      var w = "" + g;
      return w.length >= b ? w : l("0", b - w.length) + w;
    }
    function s(g, b) {
      var w = "" + g;
      return w.length >= b ? w : l(" ", b - w.length) + w;
    }
    function u(g, b) {
      var w = "" + g;
      return w.length >= b ? w : w + l(" ", b - w.length);
    }
    function y(g, b) {
      var w = "" + Math.round(g);
      return w.length >= b ? w : l("0", b - w.length) + w;
    }
    function d(g, b) {
      var w = "" + g;
      return w.length >= b ? w : l("0", b - w.length) + w;
    }
    var f = Math.pow(2, 32);
    function h(g, b) {
      if (g > f || g < -f) return y(g, b);
      var w = Math.round(g);
      return d(w, b);
    }
    function c(g, b) {
      return b = b || 0, g.length >= 7 + b && (g.charCodeAt(b) | 32) === 103 && (g.charCodeAt(b + 1) | 32) === 101 && (g.charCodeAt(b + 2) | 32) === 110 && (g.charCodeAt(b + 3) | 32) === 101 && (g.charCodeAt(b + 4) | 32) === 114 && (g.charCodeAt(b + 5) | 32) === 97 && (g.charCodeAt(b + 6) | 32) === 108;
    }
    var m = [
      ["Sun", "Sunday"],
      ["Mon", "Monday"],
      ["Tue", "Tuesday"],
      ["Wed", "Wednesday"],
      ["Thu", "Thursday"],
      ["Fri", "Friday"],
      ["Sat", "Saturday"]
    ], v = [
      ["J", "Jan", "January"],
      ["F", "Feb", "February"],
      ["M", "Mar", "March"],
      ["A", "Apr", "April"],
      ["M", "May", "May"],
      ["J", "Jun", "June"],
      ["J", "Jul", "July"],
      ["A", "Aug", "August"],
      ["S", "Sep", "September"],
      ["O", "Oct", "October"],
      ["N", "Nov", "November"],
      ["D", "Dec", "December"]
    ];
    function C(g) {
      g[0] = "General", g[1] = "0", g[2] = "0.00", g[3] = "#,##0", g[4] = "#,##0.00", g[9] = "0%", g[10] = "0.00%", g[11] = "0.00E+00", g[12] = "# ?/?", g[13] = "# ??/??", g[14] = "m/d/yy", g[15] = "d-mmm-yy", g[16] = "d-mmm", g[17] = "mmm-yy", g[18] = "h:mm AM/PM", g[19] = "h:mm:ss AM/PM", g[20] = "h:mm", g[21] = "h:mm:ss", g[22] = "m/d/yy h:mm", g[37] = "#,##0 ;(#,##0)", g[38] = "#,##0 ;[Red](#,##0)", g[39] = "#,##0.00;(#,##0.00)", g[40] = "#,##0.00;[Red](#,##0.00)", g[45] = "mm:ss", g[46] = "[h]:mm:ss", g[47] = "mmss.0", g[48] = "##0.0E+0", g[49] = "@", g[56] = '"上午/下午 "hh"時"mm"分"ss"秒 "';
    }
    var x = {};
    C(x);
    var $ = [], M = 0;
    for (M = 5; M <= 8; ++M) $[M] = 32 + M;
    for (M = 23; M <= 26; ++M) $[M] = 0;
    for (M = 27; M <= 31; ++M) $[M] = 14;
    for (M = 50; M <= 58; ++M) $[M] = 14;
    for (M = 59; M <= 62; ++M) $[M] = M - 58;
    for (M = 67; M <= 68; ++M) $[M] = M - 58;
    for (M = 72; M <= 75; ++M) $[M] = M - 58;
    for (M = 67; M <= 68; ++M) $[M] = M - 57;
    for (M = 76; M <= 78; ++M) $[M] = M - 56;
    for (M = 79; M <= 81; ++M) $[M] = M - 34;
    var I = [];
    I[5] = I[63] = '"$"#,##0_);\\("$"#,##0\\)', I[6] = I[64] = '"$"#,##0_);[Red]\\("$"#,##0\\)', I[7] = I[65] = '"$"#,##0.00_);\\("$"#,##0.00\\)', I[8] = I[66] = '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)', I[41] = '_(* #,##0_);_(* \\(#,##0\\);_(* "-"_);_(@_)', I[42] = '_("$"* #,##0_);_("$"* \\(#,##0\\);_("$"* "-"_);_(@_)', I[43] = '_(* #,##0.00_);_(* \\(#,##0.00\\);_(* "-"??_);_(@_)', I[44] = '_("$"* #,##0.00_);_("$"* \\(#,##0.00\\);_("$"* "-"??_);_(@_)';
    function L(g, b, w) {
      for (var H = g < 0 ? -1 : 1, A = g * H, V = 0, S = 1, R = 0, J = 1, N = 0, Z = 0, oe = Math.floor(A); N < b && (oe = Math.floor(A), R = oe * S + V, Z = oe * N + J, !(A - oe < 5e-8)); )
        A = 1 / (A - oe), V = S, S = R, J = N, N = Z;
      if (Z > b && (N > b ? (Z = J, R = V) : (Z = N, R = S)), !w) return [0, H * R, Z];
      var $e = Math.floor(H * R / Z);
      return [$e, H * R - $e * Z, Z];
    }
    function p(g, b, w) {
      if (g > 2958465 || g < 0) return null;
      var H = g | 0, A = Math.floor(86400 * (g - H)), V = 0, S = [], R = { D: H, T: A, u: 86400 * (g - H) - A, y: 0, m: 0, d: 0, H: 0, M: 0, S: 0, q: 0 };
      if (Math.abs(R.u) < 1e-6 && (R.u = 0), b && b.date1904 && (H += 1462), R.u > 0.9999 && (R.u = 0, ++A == 86400 && (R.T = A = 0, ++H, ++R.D)), H === 60)
        S = w ? [1317, 10, 29] : [1900, 2, 29], V = 3;
      else if (H === 0)
        S = w ? [1317, 8, 29] : [1900, 1, 0], V = 6;
      else {
        H > 60 && --H;
        var J = new Date(1900, 0, 1);
        J.setDate(J.getDate() + H - 1), S = [J.getFullYear(), J.getMonth() + 1, J.getDate()], V = J.getDay(), H < 60 && (V = (V + 6) % 7), w && (V = be(J, S));
      }
      return R.y = S[0], R.m = S[1], R.d = S[2], R.S = A % 60, A = Math.floor(A / 60), R.M = A % 60, A = Math.floor(A / 60), R.H = A, R.q = V, R;
    }
    r.parse_date_code = p;
    var B = new Date(1899, 11, 31, 0, 0, 0), T = B.getTime(), F = new Date(1900, 2, 1, 0, 0, 0);
    function G(g, b) {
      var w = g.getTime();
      return b ? w -= 1262304e5 : g >= F && (w += 864e5), (w - (T + (g.getTimezoneOffset() - B.getTimezoneOffset()) * 6e4)) / 864e5;
    }
    function j(g) {
      return g.toString(10);
    }
    r._general_int = j;
    var U = /* @__PURE__ */ function() {
      var b = /(?:\.0*|(\.\d*[1-9])0+)$/;
      function w(N) {
        return N.indexOf(".") == -1 ? N : N.replace(b, "$1");
      }
      var H = /(?:\.0*|(\.\d*[1-9])0+)[Ee]/, A = /(E[+-])(\d)$/;
      function V(N) {
        return N.indexOf("E") == -1 ? N : N.replace(H, "$1E").replace(A, "$10$2");
      }
      function S(N) {
        var Z = N < 0 ? 12 : 11, oe = w(N.toFixed(12));
        return oe.length <= Z || (oe = N.toPrecision(10), oe.length <= Z) ? oe : N.toExponential(5);
      }
      function R(N) {
        var Z = w(N.toFixed(11));
        return Z.length > (N < 0 ? 12 : 11) || Z === "0" || Z === "-0" ? N.toPrecision(6) : Z;
      }
      function J(N) {
        var Z = Math.floor(Math.log(Math.abs(N)) * Math.LOG10E), oe;
        return Z >= -4 && Z <= -1 ? oe = N.toPrecision(10 + Z) : Math.abs(Z) <= 9 ? oe = S(N) : Z === 10 ? oe = N.toFixed(10).substr(0, 12) : oe = R(N), w(V(oe.toUpperCase()));
      }
      return J;
    }();
    r._general_num = U;
    function le(g, b) {
      switch (typeof g) {
        case "string":
          return g;
        case "boolean":
          return g ? "TRUE" : "FALSE";
        case "number":
          return (g | 0) === g ? g.toString(10) : U(g);
        case "undefined":
          return "";
        case "object":
          if (g == null) return "";
          if (g instanceof Date) return va(14, G(g, b && b.date1904), b);
      }
      throw new Error("unsupported value in General format: " + g);
    }
    r._general = le;
    function be(g, b) {
      b[0] -= 581;
      var w = g.getDay();
      return g < 60 && (w = (w + 6) % 7), w;
    }
    function Pe(g, b, w, H) {
      var A = "", V = 0, S = 0, R = w.y, J, N = 0;
      switch (g) {
        case 98:
          R = w.y + 543;
        case 121:
          switch (b.length) {
            case 1:
            case 2:
              J = R % 100, N = 2;
              break;
            default:
              J = R % 1e4, N = 4;
              break;
          }
          break;
        case 109:
          switch (b.length) {
            case 1:
            case 2:
              J = w.m, N = b.length;
              break;
            case 3:
              return v[w.m - 1][1];
            case 5:
              return v[w.m - 1][0];
            default:
              return v[w.m - 1][2];
          }
          break;
        case 100:
          switch (b.length) {
            case 1:
            case 2:
              J = w.d, N = b.length;
              break;
            case 3:
              return m[w.q][0];
            default:
              return m[w.q][1];
          }
          break;
        case 104:
          switch (b.length) {
            case 1:
            case 2:
              J = 1 + (w.H + 11) % 12, N = b.length;
              break;
            default:
              throw "bad hour format: " + b;
          }
          break;
        case 72:
          switch (b.length) {
            case 1:
            case 2:
              J = w.H, N = b.length;
              break;
            default:
              throw "bad hour format: " + b;
          }
          break;
        case 77:
          switch (b.length) {
            case 1:
            case 2:
              J = w.M, N = b.length;
              break;
            default:
              throw "bad minute format: " + b;
          }
          break;
        case 115:
          if (b != "s" && b != "ss" && b != ".0" && b != ".00" && b != ".000") throw "bad second format: " + b;
          return w.u === 0 && (b == "s" || b == "ss") ? i(w.S, b.length) : (H >= 2 ? S = H === 3 ? 1e3 : 100 : S = H === 1 ? 10 : 1, V = Math.round(S * (w.S + w.u)), V >= 60 * S && (V = 0), b === "s" ? V === 0 ? "0" : "" + V / S : (A = i(V, 2 + H), b === "ss" ? A.substr(0, 2) : "." + A.substr(2, b.length - 1)));
        case 90:
          switch (b) {
            case "[h]":
            case "[hh]":
              J = w.D * 24 + w.H;
              break;
            case "[m]":
            case "[mm]":
              J = (w.D * 24 + w.H) * 60 + w.M;
              break;
            case "[s]":
            case "[ss]":
              J = ((w.D * 24 + w.H) * 60 + w.M) * 60 + Math.round(w.S + w.u);
              break;
            default:
              throw "bad abstime format: " + b;
          }
          N = b.length === 3 ? 1 : 2;
          break;
        case 101:
          J = R, N = 1;
          break;
      }
      var Z = N > 0 ? i(J, N) : "";
      return Z;
    }
    function Se(g) {
      var b = 3;
      if (g.length <= b) return g;
      for (var w = g.length % b, H = g.substr(0, w); w != g.length; w += b) H += (H.length > 0 ? "," : "") + g.substr(w, b);
      return H;
    }
    var _e = /* @__PURE__ */ function() {
      var b = /%/g;
      function w(D, k, _) {
        var W = k.replace(b, ""), z = k.length - W.length;
        return _e(D, W, _ * Math.pow(10, 2 * z)) + l("%", z);
      }
      function H(D, k, _) {
        for (var W = k.length - 1; k.charCodeAt(W - 1) === 44; ) --W;
        return _e(D, k.substr(0, W), _ / Math.pow(10, 3 * (k.length - W)));
      }
      function A(D, k) {
        var _, W = D.indexOf("E") - D.indexOf(".") - 1;
        if (D.match(/^#+0.0E\+0$/)) {
          if (k == 0) return "0.0E+0";
          if (k < 0) return "-" + A(D, -k);
          var z = D.indexOf(".");
          z === -1 && (z = D.indexOf("E"));
          var E = Math.floor(Math.log(k) * Math.LOG10E) % z;
          if (E < 0 && (E += z), _ = (k / Math.pow(10, E)).toPrecision(W + 1 + (z + E) % z), _.indexOf("e") === -1) {
            var ee = Math.floor(Math.log(k) * Math.LOG10E);
            for (_.indexOf(".") === -1 ? _ = _.charAt(0) + "." + _.substr(1) + "E+" + (ee - _.length + E) : _ += "E+" + (ee - E); _.substr(0, 2) === "0."; )
              _ = _.charAt(0) + _.substr(2, z) + "." + _.substr(2 + z), _ = _.replace(/^0+([1-9])/, "$1").replace(/^0+\./, "0.");
            _ = _.replace(/\+-/, "-");
          }
          _ = _.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(se, ce, ue, re) {
            return ce + ue + re.substr(0, (z + E) % z) + "." + re.substr(E) + "E";
          });
        } else _ = k.toExponential(W);
        return D.match(/E\+00$/) && _.match(/e[+-]\d$/) && (_ = _.substr(0, _.length - 1) + "0" + _.charAt(_.length - 1)), D.match(/E\-/) && _.match(/e\+/) && (_ = _.replace(/e\+/, "e")), _.replace("e", "E");
      }
      var V = /# (\?+)( ?)\/( ?)(\d+)/;
      function S(D, k, _) {
        var W = parseInt(D[4], 10), z = Math.round(k * W), E = Math.floor(z / W), ee = z - E * W, se = W;
        return _ + (E === 0 ? "" : "" + E) + " " + (ee === 0 ? l(" ", D[1].length + 1 + D[4].length) : s(ee, D[1].length) + D[2] + "/" + D[3] + i(se, D[4].length));
      }
      function R(D, k, _) {
        return _ + (k === 0 ? "" : "" + k) + l(" ", D[1].length + 2 + D[4].length);
      }
      var J = /^#*0*\.([0#]+)/, N = /\).*[0#]/, Z = /\(###\) ###\\?-####/;
      function oe(D) {
        for (var k = "", _, W = 0; W != D.length; ++W) switch (_ = D.charCodeAt(W)) {
          case 35:
            break;
          case 63:
            k += " ";
            break;
          case 48:
            k += "0";
            break;
          default:
            k += String.fromCharCode(_);
        }
        return k;
      }
      function $e(D, k) {
        var _ = Math.pow(10, k);
        return "" + Math.round(D * _) / _;
      }
      function je(D, k) {
        var _ = D - Math.floor(D), W = Math.pow(10, k);
        return k < ("" + Math.round(_ * W)).length ? 0 : Math.round(_ * W);
      }
      function Lt(D, k) {
        return k < ("" + Math.round((D - Math.floor(D)) * Math.pow(10, k))).length ? 1 : 0;
      }
      function Oe(D) {
        return D < 2147483647 && D > -2147483648 ? "" + (D >= 0 ? D | 0 : D - 1 | 0) : "" + Math.floor(D);
      }
      function ne(D, k, _) {
        if (D.charCodeAt(0) === 40 && !k.match(N)) {
          var W = k.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
          return _ >= 0 ? ne("n", W, _) : "(" + ne("n", W, -_) + ")";
        }
        if (k.charCodeAt(k.length - 1) === 44) return H(D, k, _);
        if (k.indexOf("%") !== -1) return w(D, k, _);
        if (k.indexOf("E") !== -1) return A(k, _);
        if (k.charCodeAt(0) === 36) return "$" + ne(D, k.substr(k.charAt(1) == " " ? 2 : 1), _);
        var z, E, ee, se, ce = Math.abs(_), ue = _ < 0 ? "-" : "";
        if (k.match(/^00+$/)) return ue + h(ce, k.length);
        if (k.match(/^[#?]+$/))
          return z = h(_, 0), z === "0" && (z = ""), z.length > k.length ? z : oe(k.substr(0, k.length - z.length)) + z;
        if (E = k.match(V)) return S(E, ce, ue);
        if (k.match(/^#+0+$/)) return ue + h(ce, k.length - k.indexOf("0"));
        if (E = k.match(J))
          return z = $e(_, E[1].length).replace(/^([^\.]+)$/, "$1." + oe(E[1])).replace(/\.$/, "." + oe(E[1])).replace(/\.(\d*)$/, function(Te, lt) {
            return "." + lt + l("0", oe(E[1]).length - lt.length);
          }), k.indexOf("0.") !== -1 ? z : z.replace(/^0\./, ".");
        if (k = k.replace(/^#+([0.])/, "$1"), E = k.match(/^(0*)\.(#*)$/))
          return ue + $e(ce, E[2].length).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, E[1].length ? "0." : ".");
        if (E = k.match(/^#{1,3},##0(\.?)$/)) return ue + Se(h(ce, 0));
        if (E = k.match(/^#,##0\.([#0]*0)$/))
          return _ < 0 ? "-" + ne(D, k, -_) : Se("" + (Math.floor(_) + Lt(_, E[1].length))) + "." + i(je(_, E[1].length), E[1].length);
        if (E = k.match(/^#,#*,#0/)) return ne(D, k.replace(/^#,#*,/, ""), _);
        if (E = k.match(/^([0#]+)(\\?-([0#]+))+$/))
          return z = n(ne(D, k.replace(/[\\-]/g, ""), _)), ee = 0, n(n(k.replace(/\\/g, "")).replace(/[0#]/g, function(Te) {
            return ee < z.length ? z.charAt(ee++) : Te === "0" ? "0" : "";
          }));
        if (k.match(Z))
          return z = ne(D, "##########", _), "(" + z.substr(0, 3) + ") " + z.substr(3, 3) + "-" + z.substr(6);
        var re = "";
        if (E = k.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))
          return ee = Math.min(E[4].length, 7), se = L(ce, Math.pow(10, ee) - 1, !1), z = "" + ue, re = _e("n", E[1], se[1]), re.charAt(re.length - 1) == " " && (re = re.substr(0, re.length - 1) + "0"), z += re + E[2] + "/" + E[3], re = u(se[2], ee), re.length < E[4].length && (re = oe(E[4].substr(E[4].length - re.length)) + re), z += re, z;
        if (E = k.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))
          return ee = Math.min(Math.max(E[1].length, E[4].length), 7), se = L(ce, Math.pow(10, ee) - 1, !0), ue + (se[0] || (se[1] ? "" : "0")) + " " + (se[1] ? s(se[1], ee) + E[2] + "/" + E[3] + u(se[2], ee) : l(" ", 2 * ee + 1 + E[2].length + E[3].length));
        if (E = k.match(/^[#0?]+$/))
          return z = h(_, 0), k.length <= z.length ? z : oe(k.substr(0, k.length - z.length)) + z;
        if (E = k.match(/^([#0?]+)\.([#0]+)$/)) {
          z = "" + _.toFixed(Math.min(E[2].length, 10)).replace(/([^0])0+$/, "$1"), ee = z.indexOf(".");
          var rt = k.indexOf(".") - ee, It = k.length - z.length - rt;
          return oe(k.substr(0, rt) + z + k.substr(k.length - It));
        }
        if (E = k.match(/^00,000\.([#0]*0)$/))
          return ee = je(_, E[1].length), _ < 0 ? "-" + ne(D, k, -_) : Se(Oe(_)).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(Te) {
            return "00," + (Te.length < 3 ? i(0, 3 - Te.length) : "") + Te;
          }) + "." + i(ee, E[1].length);
        switch (k) {
          case "###,##0.00":
            return ne(D, "#,##0.00", _);
          case "###,###":
          case "##,###":
          case "#,###":
            var nt = Se(h(ce, 0));
            return nt !== "0" ? ue + nt : "";
          case "###,###.00":
            return ne(D, "###,##0.00", _).replace(/^0\./, ".");
          case "#,###.00":
            return ne(D, "#,##0.00", _).replace(/^0\./, ".");
        }
        throw new Error("unsupported format |" + k + "|");
      }
      function ot(D, k, _) {
        for (var W = k.length - 1; k.charCodeAt(W - 1) === 44; ) --W;
        return _e(D, k.substr(0, W), _ / Math.pow(10, 3 * (k.length - W)));
      }
      function bt(D, k, _) {
        var W = k.replace(b, ""), z = k.length - W.length;
        return _e(D, W, _ * Math.pow(10, 2 * z)) + l("%", z);
      }
      function Ie(D, k) {
        var _, W = D.indexOf("E") - D.indexOf(".") - 1;
        if (D.match(/^#+0.0E\+0$/)) {
          if (k == 0) return "0.0E+0";
          if (k < 0) return "-" + Ie(D, -k);
          var z = D.indexOf(".");
          z === -1 && (z = D.indexOf("E"));
          var E = Math.floor(Math.log(k) * Math.LOG10E) % z;
          if (E < 0 && (E += z), _ = (k / Math.pow(10, E)).toPrecision(W + 1 + (z + E) % z), !_.match(/[Ee]/)) {
            var ee = Math.floor(Math.log(k) * Math.LOG10E);
            _.indexOf(".") === -1 ? _ = _.charAt(0) + "." + _.substr(1) + "E+" + (ee - _.length + E) : _ += "E+" + (ee - E), _ = _.replace(/\+-/, "-");
          }
          _ = _.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(se, ce, ue, re) {
            return ce + ue + re.substr(0, (z + E) % z) + "." + re.substr(E) + "E";
          });
        } else _ = k.toExponential(W);
        return D.match(/E\+00$/) && _.match(/e[+-]\d$/) && (_ = _.substr(0, _.length - 1) + "0" + _.charAt(_.length - 1)), D.match(/E\-/) && _.match(/e\+/) && (_ = _.replace(/e\+/, "e")), _.replace("e", "E");
      }
      function X(D, k, _) {
        if (D.charCodeAt(0) === 40 && !k.match(N)) {
          var W = k.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
          return _ >= 0 ? X("n", W, _) : "(" + X("n", W, -_) + ")";
        }
        if (k.charCodeAt(k.length - 1) === 44) return ot(D, k, _);
        if (k.indexOf("%") !== -1) return bt(D, k, _);
        if (k.indexOf("E") !== -1) return Ie(k, _);
        if (k.charCodeAt(0) === 36) return "$" + X(D, k.substr(k.charAt(1) == " " ? 2 : 1), _);
        var z, E, ee, se, ce = Math.abs(_), ue = _ < 0 ? "-" : "";
        if (k.match(/^00+$/)) return ue + i(ce, k.length);
        if (k.match(/^[#?]+$/))
          return z = "" + _, _ === 0 && (z = ""), z.length > k.length ? z : oe(k.substr(0, k.length - z.length)) + z;
        if (E = k.match(V)) return R(E, ce, ue);
        if (k.match(/^#+0+$/)) return ue + i(ce, k.length - k.indexOf("0"));
        if (E = k.match(J))
          return z = ("" + _).replace(/^([^\.]+)$/, "$1." + oe(E[1])).replace(/\.$/, "." + oe(E[1])), z = z.replace(/\.(\d*)$/, function(Te, lt) {
            return "." + lt + l("0", oe(E[1]).length - lt.length);
          }), k.indexOf("0.") !== -1 ? z : z.replace(/^0\./, ".");
        if (k = k.replace(/^#+([0.])/, "$1"), E = k.match(/^(0*)\.(#*)$/))
          return ue + ("" + ce).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, E[1].length ? "0." : ".");
        if (E = k.match(/^#{1,3},##0(\.?)$/)) return ue + Se("" + ce);
        if (E = k.match(/^#,##0\.([#0]*0)$/))
          return _ < 0 ? "-" + X(D, k, -_) : Se("" + _) + "." + l("0", E[1].length);
        if (E = k.match(/^#,#*,#0/)) return X(D, k.replace(/^#,#*,/, ""), _);
        if (E = k.match(/^([0#]+)(\\?-([0#]+))+$/))
          return z = n(X(D, k.replace(/[\\-]/g, ""), _)), ee = 0, n(n(k.replace(/\\/g, "")).replace(/[0#]/g, function(Te) {
            return ee < z.length ? z.charAt(ee++) : Te === "0" ? "0" : "";
          }));
        if (k.match(Z))
          return z = X(D, "##########", _), "(" + z.substr(0, 3) + ") " + z.substr(3, 3) + "-" + z.substr(6);
        var re = "";
        if (E = k.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))
          return ee = Math.min(E[4].length, 7), se = L(ce, Math.pow(10, ee) - 1, !1), z = "" + ue, re = _e("n", E[1], se[1]), re.charAt(re.length - 1) == " " && (re = re.substr(0, re.length - 1) + "0"), z += re + E[2] + "/" + E[3], re = u(se[2], ee), re.length < E[4].length && (re = oe(E[4].substr(E[4].length - re.length)) + re), z += re, z;
        if (E = k.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))
          return ee = Math.min(Math.max(E[1].length, E[4].length), 7), se = L(ce, Math.pow(10, ee) - 1, !0), ue + (se[0] || (se[1] ? "" : "0")) + " " + (se[1] ? s(se[1], ee) + E[2] + "/" + E[3] + u(se[2], ee) : l(" ", 2 * ee + 1 + E[2].length + E[3].length));
        if (E = k.match(/^[#0?]+$/))
          return z = "" + _, k.length <= z.length ? z : oe(k.substr(0, k.length - z.length)) + z;
        if (E = k.match(/^([#0]+)\.([#0]+)$/)) {
          z = "" + _.toFixed(Math.min(E[2].length, 10)).replace(/([^0])0+$/, "$1"), ee = z.indexOf(".");
          var rt = k.indexOf(".") - ee, It = k.length - z.length - rt;
          return oe(k.substr(0, rt) + z + k.substr(k.length - It));
        }
        if (E = k.match(/^00,000\.([#0]*0)$/))
          return _ < 0 ? "-" + X(D, k, -_) : Se("" + _).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(Te) {
            return "00," + (Te.length < 3 ? i(0, 3 - Te.length) : "") + Te;
          }) + "." + i(0, E[1].length);
        switch (k) {
          case "###,###":
          case "##,###":
          case "#,###":
            var nt = Se("" + ce);
            return nt !== "0" ? ue + nt : "";
          default:
            if (k.match(/\.[0#?]*$/)) return X(D, k.slice(0, k.lastIndexOf(".")), _) + oe(k.slice(k.lastIndexOf(".")));
        }
        throw new Error("unsupported format |" + k + "|");
      }
      return function(k, _, W) {
        return (W | 0) === W ? X(k, _, W) : ne(k, _, W);
      };
    }();
    function ht(g) {
      for (var b = [], w = !1, H = 0, A = 0; H < g.length; ++H) switch (
        /*cc=*/
        g.charCodeAt(H)
      ) {
        case 34:
          w = !w;
          break;
        case 95:
        case 42:
        case 92:
          ++H;
          break;
        case 59:
          b[b.length] = g.substr(A, H - A), A = H + 1;
      }
      if (b[b.length] = g.substr(A), w === !0) throw new Error("Format |" + g + "| unterminated string ");
      return b;
    }
    r._split = ht;
    var Ft = /\[[HhMmSs\u0E0A\u0E19\u0E17]*\]/;
    function pt(g) {
      for (var b = 0, w = "", H = ""; b < g.length; )
        switch (w = g.charAt(b)) {
          case "G":
            c(g, b) && (b += 6), b++;
            break;
          case '"':
            for (
              ;
              /*cc=*/
              g.charCodeAt(++b) !== 34 && b < g.length;
            )
              ;
            ++b;
            break;
          case "\\":
            b += 2;
            break;
          case "_":
            b += 2;
            break;
          case "@":
            ++b;
            break;
          case "B":
          case "b":
            if (g.charAt(b + 1) === "1" || g.charAt(b + 1) === "2") return !0;
          case "M":
          case "D":
          case "Y":
          case "H":
          case "S":
          case "E":
          case "m":
          case "d":
          case "y":
          case "h":
          case "s":
          case "e":
          case "g":
            return !0;
          case "A":
          case "a":
          case "上":
            if (g.substr(b, 3).toUpperCase() === "A/P" || g.substr(b, 5).toUpperCase() === "AM/PM" || g.substr(b, 5).toUpperCase() === "上午/下午") return !0;
            ++b;
            break;
          case "[":
            for (H = w; g.charAt(b++) !== "]" && b < g.length; ) H += g.charAt(b);
            if (H.match(Ft)) return !0;
            break;
          case ".":
          case "0":
          case "#":
            for (; b < g.length && ("0#?.,E+-%".indexOf(w = g.charAt(++b)) > -1 || w == "\\" && g.charAt(b + 1) == "-" && "0#".indexOf(g.charAt(b + 2)) > -1); )
              ;
            break;
          case "?":
            for (; g.charAt(++b) === w; )
              ;
            break;
          case "*":
            ++b, (g.charAt(b) == " " || g.charAt(b) == "*") && ++b;
            break;
          case "(":
          case ")":
            ++b;
            break;
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9":
            for (; b < g.length && "0123456789".indexOf(g.charAt(++b)) > -1; )
              ;
            break;
          case " ":
            ++b;
            break;
          default:
            ++b;
            break;
        }
      return !1;
    }
    r.is_date = pt;
    function mt(g, b, w, H) {
      for (var A = [], V = "", S = 0, R = "", J = "t", N, Z, oe, $e = "H"; S < g.length; )
        switch (R = g.charAt(S)) {
          case "G":
            if (!c(g, S)) throw new Error("unrecognized character " + R + " in " + g);
            A[A.length] = { t: "G", v: "General" }, S += 7;
            break;
          case '"':
            for (V = ""; (oe = g.charCodeAt(++S)) !== 34 && S < g.length; ) V += String.fromCharCode(oe);
            A[A.length] = { t: "t", v: V }, ++S;
            break;
          case "\\":
            var je = g.charAt(++S), Lt = je === "(" || je === ")" ? je : "t";
            A[A.length] = { t: Lt, v: je }, ++S;
            break;
          case "_":
            A[A.length] = { t: "t", v: " " }, S += 2;
            break;
          case "@":
            A[A.length] = { t: "T", v: b }, ++S;
            break;
          case "B":
          case "b":
            if (g.charAt(S + 1) === "1" || g.charAt(S + 1) === "2") {
              if (N == null && (N = p(b, w, g.charAt(S + 1) === "2"), N == null))
                return "";
              A[A.length] = { t: "X", v: g.substr(S, 2) }, J = R, S += 2;
              break;
            }
          case "M":
          case "D":
          case "Y":
          case "H":
          case "S":
          case "E":
            R = R.toLowerCase();
          case "m":
          case "d":
          case "y":
          case "h":
          case "s":
          case "e":
          case "g":
            if (b < 0 || N == null && (N = p(b, w), N == null))
              return "";
            for (V = R; ++S < g.length && g.charAt(S).toLowerCase() === R; ) V += R;
            R === "m" && J.toLowerCase() === "h" && (R = "M"), R === "h" && (R = $e), A[A.length] = { t: R, v: V }, J = R;
            break;
          case "A":
          case "a":
          case "上":
            var Oe = { t: R, v: R };
            if (N == null && (N = p(b, w)), g.substr(S, 3).toUpperCase() === "A/P" ? (N != null && (Oe.v = N.H >= 12 ? "P" : "A"), Oe.t = "T", $e = "h", S += 3) : g.substr(S, 5).toUpperCase() === "AM/PM" ? (N != null && (Oe.v = N.H >= 12 ? "PM" : "AM"), Oe.t = "T", S += 5, $e = "h") : g.substr(S, 5).toUpperCase() === "上午/下午" ? (N != null && (Oe.v = N.H >= 12 ? "下午" : "上午"), Oe.t = "T", S += 5, $e = "h") : (Oe.t = "t", ++S), N == null && Oe.t === "T") return "";
            A[A.length] = Oe, J = R;
            break;
          case "[":
            for (V = R; g.charAt(S++) !== "]" && S < g.length; ) V += g.charAt(S);
            if (V.slice(-1) !== "]") throw 'unterminated "[" block: |' + V + "|";
            if (V.match(Ft)) {
              if (N == null && (N = p(b, w), N == null))
                return "";
              A[A.length] = { t: "Z", v: V.toLowerCase() }, J = V.charAt(1);
            } else V.indexOf("$") > -1 && (V = (V.match(/\$([^-\[\]]*)/) || [])[1] || "$", pt(g) || (A[A.length] = { t: "t", v: V }));
            break;
          case ".":
            if (N != null) {
              for (V = R; ++S < g.length && (R = g.charAt(S)) === "0"; ) V += R;
              A[A.length] = { t: "s", v: V };
              break;
            }
          case "0":
          case "#":
            for (V = R; ++S < g.length && "0#?.,E+-%".indexOf(R = g.charAt(S)) > -1; ) V += R;
            A[A.length] = { t: "n", v: V };
            break;
          case "?":
            for (V = R; g.charAt(++S) === R; ) V += R;
            A[A.length] = { t: R, v: V }, J = R;
            break;
          case "*":
            ++S, (g.charAt(S) == " " || g.charAt(S) == "*") && ++S;
            break;
          case "(":
          case ")":
            A[A.length] = { t: H === 1 ? "t" : R, v: R }, ++S;
            break;
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9":
            for (V = R; S < g.length && "0123456789".indexOf(g.charAt(++S)) > -1; ) V += g.charAt(S);
            A[A.length] = { t: "D", v: V };
            break;
          case " ":
            A[A.length] = { t: R, v: R }, ++S;
            break;
          case "$":
            A[A.length] = { t: "t", v: "$" }, ++S;
            break;
          default:
            if (",$-+/():!^&'~{}<>=€acfijklopqrtuvwxzP".indexOf(R) === -1) throw new Error("unrecognized character " + R + " in " + g);
            A[A.length] = { t: "t", v: R }, ++S;
            break;
        }
      var ne = 0, ot = 0, bt;
      for (S = A.length - 1, J = "t"; S >= 0; --S)
        switch (A[S].t) {
          case "h":
          case "H":
            A[S].t = $e, J = "h", ne < 1 && (ne = 1);
            break;
          case "s":
            (bt = A[S].v.match(/\.0+$/)) && (ot = Math.max(ot, bt[0].length - 1)), ne < 3 && (ne = 3);
          case "d":
          case "y":
          case "M":
          case "e":
            J = A[S].t;
            break;
          case "m":
            J === "s" && (A[S].t = "M", ne < 2 && (ne = 2));
            break;
          case "X":
            break;
          case "Z":
            ne < 1 && A[S].v.match(/[Hh]/) && (ne = 1), ne < 2 && A[S].v.match(/[Mm]/) && (ne = 2), ne < 3 && A[S].v.match(/[Ss]/) && (ne = 3);
        }
      switch (ne) {
        case 0:
          break;
        case 1:
          N.u >= 0.5 && (N.u = 0, ++N.S), N.S >= 60 && (N.S = 0, ++N.M), N.M >= 60 && (N.M = 0, ++N.H);
          break;
        case 2:
          N.u >= 0.5 && (N.u = 0, ++N.S), N.S >= 60 && (N.S = 0, ++N.M);
          break;
      }
      var Ie = "", X;
      for (S = 0; S < A.length; ++S)
        switch (A[S].t) {
          case "t":
          case "T":
          case " ":
          case "D":
            break;
          case "X":
            A[S].v = "", A[S].t = ";";
            break;
          case "d":
          case "m":
          case "y":
          case "h":
          case "H":
          case "M":
          case "s":
          case "e":
          case "b":
          case "Z":
            A[S].v = Pe(A[S].t.charCodeAt(0), A[S].v, N, ot), A[S].t = "t";
            break;
          case "n":
          case "?":
            for (X = S + 1; A[X] != null && ((R = A[X].t) === "?" || R === "D" || (R === " " || R === "t") && A[X + 1] != null && (A[X + 1].t === "?" || A[X + 1].t === "t" && A[X + 1].v === "/") || A[S].t === "(" && (R === " " || R === "n" || R === ")") || R === "t" && (A[X].v === "/" || A[X].v === " " && A[X + 1] != null && A[X + 1].t == "?")); )
              A[S].v += A[X].v, A[X] = { v: "", t: ";" }, ++X;
            Ie += A[S].v, S = X - 1;
            break;
          case "G":
            A[S].t = "t", A[S].v = le(b, w);
            break;
        }
      var D = "", k, _;
      if (Ie.length > 0) {
        Ie.charCodeAt(0) == 40 ? (k = b < 0 && Ie.charCodeAt(0) === 45 ? -b : b, _ = _e("n", Ie, k)) : (k = b < 0 && H > 1 ? -b : b, _ = _e("n", Ie, k), k < 0 && A[0] && A[0].t == "t" && (_ = _.substr(1), A[0].v = "-" + A[0].v)), X = _.length - 1;
        var W = A.length;
        for (S = 0; S < A.length; ++S) if (A[S] != null && A[S].t != "t" && A[S].v.indexOf(".") > -1) {
          W = S;
          break;
        }
        var z = A.length;
        if (W === A.length && _.indexOf("E") === -1) {
          for (S = A.length - 1; S >= 0; --S)
            A[S] == null || "n?".indexOf(A[S].t) === -1 || (X >= A[S].v.length - 1 ? (X -= A[S].v.length, A[S].v = _.substr(X + 1, A[S].v.length)) : X < 0 ? A[S].v = "" : (A[S].v = _.substr(0, X + 1), X = -1), A[S].t = "t", z = S);
          X >= 0 && z < A.length && (A[z].v = _.substr(0, X + 1) + A[z].v);
        } else if (W !== A.length && _.indexOf("E") === -1) {
          for (X = _.indexOf(".") - 1, S = W; S >= 0; --S)
            if (!(A[S] == null || "n?".indexOf(A[S].t) === -1)) {
              for (Z = A[S].v.indexOf(".") > -1 && S === W ? A[S].v.indexOf(".") - 1 : A[S].v.length - 1, D = A[S].v.substr(Z + 1); Z >= 0; --Z)
                X >= 0 && (A[S].v.charAt(Z) === "0" || A[S].v.charAt(Z) === "#") && (D = _.charAt(X--) + D);
              A[S].v = D, A[S].t = "t", z = S;
            }
          for (X >= 0 && z < A.length && (A[z].v = _.substr(0, X + 1) + A[z].v), X = _.indexOf(".") + 1, S = W; S < A.length; ++S)
            if (!(A[S] == null || "n?(".indexOf(A[S].t) === -1 && S !== W)) {
              for (Z = A[S].v.indexOf(".") > -1 && S === W ? A[S].v.indexOf(".") + 1 : 0, D = A[S].v.substr(0, Z); Z < A[S].v.length; ++Z)
                X < _.length && (D += _.charAt(X++));
              A[S].v = D, A[S].t = "t", z = S;
            }
        }
      }
      for (S = 0; S < A.length; ++S) A[S] != null && "n?".indexOf(A[S].t) > -1 && (k = H > 1 && b < 0 && S > 0 && A[S - 1].v === "-" ? -b : b, A[S].v = _e(A[S].t, A[S].v, k), A[S].t = "t");
      var E = "";
      for (S = 0; S !== A.length; ++S) A[S] != null && (E += A[S].v);
      return E;
    }
    r._eval = mt;
    var We = /\[[=<>]/, ga = /\[(=|>[=]?|<[>=]?)(-?\d+(?:\.\d*)?)\]/;
    function ya(g, b) {
      if (b == null) return !1;
      var w = parseFloat(b[2]);
      switch (b[1]) {
        case "=":
          if (g == w) return !0;
          break;
        case ">":
          if (g > w) return !0;
          break;
        case "<":
          if (g < w) return !0;
          break;
        case "<>":
          if (g != w) return !0;
          break;
        case ">=":
          if (g >= w) return !0;
          break;
        case "<=":
          if (g <= w) return !0;
          break;
      }
      return !1;
    }
    function Oo(g, b) {
      var w = ht(g), H = w.length, A = w[H - 1].indexOf("@");
      if (H < 4 && A > -1 && --H, w.length > 4) throw new Error("cannot find right format for |" + w.join("|") + "|");
      if (typeof b != "number") return [4, w.length === 4 || A > -1 ? w[w.length - 1] : "@"];
      switch (w.length) {
        case 1:
          w = A > -1 ? ["General", "General", "General", w[0]] : [w[0], w[0], w[0], "@"];
          break;
        case 2:
          w = A > -1 ? [w[0], w[0], w[0], w[1]] : [w[0], w[1], w[0], "@"];
          break;
        case 3:
          w = A > -1 ? [w[0], w[1], w[0], w[2]] : [w[0], w[1], w[2], "@"];
          break;
      }
      var V = b > 0 ? w[0] : b < 0 ? w[1] : w[2];
      if (w[0].indexOf("[") === -1 && w[1].indexOf("[") === -1) return [H, V];
      if (w[0].match(We) != null || w[1].match(We) != null) {
        var S = w[0].match(ga), R = w[1].match(ga);
        return ya(b, S) ? [H, w[0]] : ya(b, R) ? [H, w[1]] : [H, w[S != null && R != null ? 2 : 1]];
      }
      return [H, V];
    }
    function va(g, b, w) {
      w == null && (w = {});
      var H = "";
      switch (typeof g) {
        case "string":
          g == "m/d/yy" && w.dateNF ? H = w.dateNF : H = g;
          break;
        case "number":
          g == 14 && w.dateNF ? H = w.dateNF : H = (w.table != null ? w.table : x)[g], H == null && (H = w.table && w.table[$[g]] || x[$[g]]), H == null && (H = I[g] || "General");
          break;
      }
      if (c(H, 0)) return le(b, w);
      b instanceof Date && (b = G(b, w.date1904));
      var A = Oo(H, b);
      if (c(A[1])) return le(b, w);
      if (b === !0) b = "TRUE";
      else if (b === !1) b = "FALSE";
      else if (b === "" || b == null) return "";
      return mt(A[1], b, w, A[0]);
    }
    function xa(g, b) {
      if (typeof b != "number") {
        b = +b || -1;
        for (var w = 0; w < 392; ++w) {
          if (x[w] == null) {
            b < 0 && (b = w);
            continue;
          }
          if (x[w] == g) {
            b = w;
            break;
          }
        }
        b < 0 && (b = 391);
      }
      return x[b] = g, b;
    }
    r.load = xa, r._table = x, r.get_table = function() {
      return x;
    }, r.load_table = function(b) {
      for (var w = 0; w != 392; ++w)
        b[w] !== void 0 && xa(b[w], w);
    }, r.init_table = C, r.format = va;
  };
  e(a), typeof DO_NOT_EXPORT_SSF > "u" && (t.exports = a);
})(Wa);
var Eo = Wa.exports;
const Ke = /* @__PURE__ */ ta(Eo), He = "auto", Po = 3, Do = [
  {
    name: "year",
    description: 'When lowerCase(columnName)="year" with the column having numeric values will result in no formatting',
    matchingFunction: (t, a, e) => t && a ? t.toLowerCase() === "year" && ((a == null ? void 0 : a.columnType) === "number" || (e == null ? void 0 : e.unitType) === "number") : !1,
    format: {
      formatTag: "year",
      formatCode: He,
      valueType: "number",
      exampleInput: 2013,
      _autoFormat: {
        autoFormatCode: "@",
        truncateUnits: !1
      }
    }
  },
  {
    name: "id",
    description: 'When lowerCase(columnName)="id" with the column having numeric values, then values will have no formatting',
    matchingFunction: (t, a, e) => t && a ? t.toLowerCase() === "id" && ((a == null ? void 0 : a.columnType) === "number" || (e == null ? void 0 : e.unitType) === "number") : !1,
    format: {
      formatTag: "id",
      formatCode: He,
      valueType: "number",
      exampleInput: 93120121,
      _autoFormat: {
        autoFormatFunction: (t) => {
          const a = t;
          return a != null && !isNaN(a) ? a.toLocaleString("fullwide", {
            useGrouping: !1
          }) : String(a);
        }
      }
    }
  },
  {
    name: "defaultDate",
    description: "Formatting for Default Date",
    matchingFunction: (t, a, e) => a ? (a == null ? void 0 : a.columnType) === "date" || (e == null ? void 0 : e.unitType) === "date" : !1,
    format: {
      formatTag: "defaultDate",
      formatCode: He,
      valueType: "date",
      exampleInput: "Sat Jan 01 2022 03:15:00 GMT-0500",
      _autoFormat: {
        autoFormatCode: "YYYY-MM-DD",
        truncateUnits: !1
      }
    }
  }
];
function aa(t, a) {
  switch (a) {
    case "T":
      return t !== void 0 ? t / 1e12 : void 0;
    case "B":
      return t !== void 0 ? t / 1e9 : void 0;
    case "M":
      return t !== void 0 ? t / 1e6 : void 0;
    case "k":
      return t !== void 0 ? t / 1e3 : void 0;
    default:
      return t;
  }
}
function Rl(t, a = "@", e = !1) {
  return t._autoFormat = {
    autoFormatCode: a,
    truncateUnits: e
  }, t;
}
function Ro(t, a) {
  var r, n, l;
  const e = ((r = a || t.formatCode) == null ? void 0 : r.toLowerCase()) === He, o = ((n = t._autoFormat) == null ? void 0 : n.autoFormatFunction) || ((l = t._autoFormat) == null ? void 0 : l.autoFormatCode);
  return !!(e && o !== void 0);
}
function oa(t, a = 7) {
  let e, o = "";
  const r = t == null ? void 0 : t.median;
  let n;
  if (r !== void 0) {
    let l;
    o = Ua(r), o ? (l = aa(r, o), n = !0) : (l = r, n = !1), (t == null ? void 0 : t.maxDecimals) === 0 && !n ? e = "#,##0" : e = jo(
      l,
      a
    );
  } else
    e = "#,##0", n = !1;
  return {
    formatTag: "auto",
    formatCode: He,
    valueType: "number",
    _autoFormat: {
      autoFormatCode: e,
      truncateUnits: n,
      columnUnits: o
    }
  };
}
function No(t, a, e) {
  const o = Do.find(
    (r) => r.matchingFunction(t, a, e)
  );
  if (o)
    return o.format;
  if ((e == null ? void 0 : e.unitType) === "number")
    return oa(e);
}
function Go(t, a, e) {
  var o, r;
  if ((o = a._autoFormat) != null && o.autoFormatFunction)
    return a._autoFormat.autoFormatFunction(
      t,
      a,
      e
    );
  if ((r = a._autoFormat) != null && r.autoFormatCode) {
    const n = a._autoFormat.autoFormatCode;
    if (a.valueType === "number") {
      const i = a._autoFormat.truncateUnits;
      let s = t, u = "";
      return i && (e == null ? void 0 : e.median) !== void 0 && (u = Ua(e.median), s = aa(t, u)), Ke.format(n, s) + u;
    } else
      return Ke.format(n, t);
  } else
    console.warn("autoFormat called without a formatCode or function");
  return String(t);
}
function Nl(t) {
  return typeof t == "number" ? t.toLocaleString(void 0, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }) : t != null ? String(t) : "-";
}
function jo(t, a = 7, e = Po) {
  let o = "#,##0";
  const r = Ho(t);
  let n = 0;
  return r - e < 0 && (n = Math.min(
    Math.max(
      Math.abs(r - e + 1),
      0
    ),
    a
  )), n > 0 && (o += ".", o += "0".repeat(n)), o;
}
function Ua(t) {
  const a = Math.abs(t);
  return a >= 5e12 ? "T" : a >= 5e9 ? "B" : a >= 5e6 ? "M" : a >= 5e3 ? "k" : "";
}
function Ho(t) {
  return t === 0 ? 0 : Math.floor(Math.log10(Math.abs(t)));
}
const Vo = [
  {
    primaryCode: "usd",
    currencySymbol: "$",
    displayName: "USD - United States Dollar"
  },
  {
    primaryCode: "aud",
    currencySymbol: "A$",
    displayName: "AUD - Australian Dollar",
    escapeCurrencySymbol: !0
  },
  {
    primaryCode: "brl",
    currencySymbol: "R$",
    displayName: "BRL - Brazilian Real",
    escapeCurrencySymbol: !0
  },
  {
    primaryCode: "cad",
    currencySymbol: "C$",
    displayName: "CAD - Canadian Dollar",
    escapeCurrencySymbol: !0
  },
  {
    primaryCode: "cny",
    currencySymbol: "¥",
    displayName: "CNY - Renminbi",
    escapeCurrencySymbol: !0
  },
  {
    primaryCode: "eur",
    currencySymbol: "€",
    displayName: "EUR - Euro"
  },
  {
    primaryCode: "gbp",
    currencySymbol: "£",
    displayName: "GBP - Pound Sterling",
    escapeCurrencySymbol: !0
  },
  {
    primaryCode: "jpy",
    currencySymbol: "¥",
    displayName: "JPY - Japanese Yen",
    escapeCurrencySymbol: !0
  },
  {
    primaryCode: "inr",
    currencySymbol: "₹",
    displayName: "INR - Indian Rupee",
    escapeCurrencySymbol: !0
  },
  {
    primaryCode: "krw",
    currencySymbol: "₩",
    displayName: "KRW - South Korean won",
    escapeCurrencySymbol: !0
  },
  {
    primaryCode: "ngn",
    currencySymbol: "₦",
    displayName: "NGN - Nigerian Naira",
    escapeCurrencySymbol: !0
  },
  {
    primaryCode: "rub",
    currencySymbol: "rub",
    displayName: "RUB - Russian Ruble",
    escapeCurrencySymbol: !0
  },
  {
    primaryCode: "sek",
    currencySymbol: "kr",
    displayName: "SEK - Swedish Krona",
    escapeCurrencySymbol: !0
  }
], Wo = [
  {
    derivedSuffix: "",
    valueFormatCode: "#,##0",
    exampleInput: 412.17,
    auto: !0
  },
  {
    derivedSuffix: "0",
    valueFormatCode: "#,##0",
    exampleInput: 7043.123
  },
  {
    derivedSuffix: "1",
    valueFormatCode: "#,##0.0",
    exampleInput: 7043.123
  },
  {
    derivedSuffix: "2",
    valueFormatCode: "#,##0.00",
    exampleInput: 7043.123
  },
  {
    derivedSuffix: "0k",
    valueFormatCode: '#,##0,"k"',
    exampleInput: 64301.12
  },
  {
    derivedSuffix: "1k",
    valueFormatCode: '#,##0.0,"k"',
    exampleInput: 64301.12
  },
  {
    derivedSuffix: "2k",
    valueFormatCode: '#,##0.00,"k"',
    exampleInput: 64301.12
  },
  {
    derivedSuffix: "0m",
    valueFormatCode: '#,##0,,"M"',
    exampleInput: 456430112e-2
  },
  {
    derivedSuffix: "1m",
    valueFormatCode: '#,##0.0,,"M"',
    exampleInput: 456430112e-2
  },
  {
    derivedSuffix: "2m",
    valueFormatCode: '#,##0.00,,"M"',
    exampleInput: 456430112e-2
  },
  {
    derivedSuffix: "0b",
    valueFormatCode: '#,##0,,,"B"',
    exampleInput: 978456430112e-2
  },
  {
    derivedSuffix: "1b",
    valueFormatCode: '#,##0.0,,,"B"',
    exampleInput: 978456430112e-2
  },
  {
    derivedSuffix: "2b",
    valueFormatCode: '#,##0.00,,,"B"',
    exampleInput: 978456430112e-2
  }
], Uo = Vo.flatMap((t) => Wo.map((a) => {
  const e = t.escapeCurrencySymbol ? `"${t.currencySymbol}"` : t.currencySymbol, o = {
    formatTag: t.primaryCode + a.derivedSuffix,
    parentFormat: t.primaryCode,
    formatCategory: "currency",
    valueType: "number",
    exampleInput: a.exampleInput,
    titleTagReplacement: ` (${t.currencySymbol})`,
    formatCode: ""
    // Will be set below
  };
  return a.auto ? (o.formatCode = He, o._autoFormat = {
    autoFormatFunction: (r, n, l) => {
      var f, h, c;
      const i = r, s = oa(l, 2);
      let u = `${e}${((f = s._autoFormat) == null ? void 0 : f.autoFormatCode) || "#,##0"}`, y = "", d = i;
      return (h = s._autoFormat) != null && h.truncateUnits && ((c = s._autoFormat) != null && c.columnUnits) ? (y = s._autoFormat.columnUnits, d = aa(i, s._autoFormat.columnUnits)) : u.endsWith(".0") && (u = u + "0"), Ke.format(u, d) + y;
    }
  }) : o.formatCode = `${e}${a.valueFormatCode}`, a.axisValueFormatCode && (o.axisFormatCode = a.axisValueFormatCode), o;
})), ra = [
  ...Uo,
  // Date/Time formats
  {
    formatTag: "ddd",
    formatCode: "ddd",
    formatCategory: "date",
    valueType: "date",
    exampleInput: "2022-01-09 12:45"
  },
  {
    formatTag: "dddd",
    formatCode: "dddd",
    formatCategory: "date",
    valueType: "date",
    exampleInput: "2022-01-09 12:45"
  },
  {
    formatTag: "mmm",
    formatCode: "mmm",
    formatCategory: "date",
    valueType: "date",
    exampleInput: "2022-01-09 12:45"
  },
  {
    formatTag: "mmmm",
    formatCode: "mmmm",
    formatCategory: "date",
    valueType: "date",
    exampleInput: "2022-01-09 12:45"
  },
  {
    formatTag: "yyyy",
    formatCode: "yyyy",
    formatCategory: "date",
    valueType: "date",
    exampleInput: "2022-01-09 12:45"
  },
  {
    formatTag: "shortdate",
    formatCode: "mmm d/yy",
    formatCategory: "date",
    valueType: "date",
    exampleInput: "2022-01-09 12:45"
  },
  {
    formatTag: "longdate",
    formatCode: "mmmm d, yyyy",
    formatCategory: "date",
    valueType: "date",
    exampleInput: "2022-01-09 12:45"
  },
  {
    formatTag: "fulldate",
    formatCode: "dddd mmmm d, yyyy",
    formatCategory: "date",
    valueType: "date",
    exampleInput: "2022-01-09 12:45"
  },
  {
    formatTag: "mdy",
    formatCode: "m/d/y",
    formatCategory: "date",
    valueType: "date",
    exampleInput: "2022-01-09 12:45"
  },
  {
    formatTag: "dmy",
    formatCode: "d/m/y",
    formatCategory: "date",
    valueType: "date",
    exampleInput: "2022-01-09 12:45"
  },
  {
    formatTag: "hms",
    formatCode: "H:MM:SS AM/PM",
    formatCategory: "date",
    valueType: "date",
    exampleInput: "2022-01-09T11:45:03"
  },
  // Number formats
  {
    formatTag: "num0",
    formatCode: "#,##0",
    formatCategory: "number",
    valueType: "number",
    exampleInput: 11.23168
  },
  {
    formatTag: "num1",
    formatCode: "#,##0.0",
    formatCategory: "number",
    valueType: "number",
    exampleInput: 11.23168
  },
  {
    formatTag: "num2",
    formatCode: "#,##0.00",
    formatCategory: "number",
    valueType: "number",
    exampleInput: 11.23168
  },
  {
    formatTag: "num3",
    formatCode: "#,##0.000",
    formatCategory: "number",
    valueType: "number",
    exampleInput: 11.23168
  },
  {
    formatTag: "num4",
    formatCode: "#,##0.0000",
    formatCategory: "number",
    valueType: "number",
    exampleInput: 11.23168
  },
  {
    formatTag: "num0k",
    formatCode: '#,##0,"k"',
    formatCategory: "number",
    valueType: "number",
    exampleInput: 64201
  },
  {
    formatTag: "num1k",
    formatCode: '#,##0.0,"k"',
    formatCategory: "number",
    valueType: "number",
    exampleInput: 64201
  },
  {
    formatTag: "num2k",
    formatCode: '#,##0.00,"k"',
    formatCategory: "number",
    valueType: "number",
    exampleInput: 64201
  },
  {
    formatTag: "num0m",
    formatCode: '#,##0,,"M"',
    formatCategory: "number",
    valueType: "number",
    exampleInput: 42539483
  },
  {
    formatTag: "num1m",
    formatCode: '#,##0.0,,"M"',
    formatCategory: "number",
    valueType: "number",
    exampleInput: 42539483
  },
  {
    formatTag: "num2m",
    formatCode: '#,##0.00,,"M"',
    formatCategory: "number",
    valueType: "number",
    exampleInput: 42539483
  },
  {
    formatTag: "num0b",
    formatCode: '#,##0,,,"B"',
    formatCategory: "number",
    valueType: "number",
    exampleInput: 1384937584
  },
  {
    formatTag: "num1b",
    formatCode: '#,##0.0,,,"B"',
    formatCategory: "number",
    valueType: "number",
    exampleInput: 1384937584
  },
  {
    formatTag: "num2b",
    formatCode: '#,##0.00,,,"B"',
    formatCategory: "number",
    valueType: "number",
    exampleInput: 1384937584
  },
  {
    formatTag: "id",
    formatCode: "0",
    formatCategory: "number",
    valueType: "number",
    exampleInput: "921594675",
    titleTagReplacement: " id"
  },
  {
    formatTag: "fract",
    formatCode: "# ?/?",
    formatCategory: "number",
    valueType: "number",
    exampleInput: "0.25"
  },
  {
    formatTag: "mult",
    formatCode: '#,##0.0"x"',
    formatCategory: "number",
    valueType: "number",
    exampleInput: "5.32"
  },
  {
    formatTag: "mult0",
    formatCode: '#,##0"x"',
    formatCategory: "number",
    valueType: "number",
    exampleInput: "5.32"
  },
  {
    formatTag: "mult1",
    formatCode: '#,##0.0"x"',
    formatCategory: "number",
    valueType: "number",
    exampleInput: "5.32"
  },
  {
    formatTag: "mult2",
    formatCode: '#,##0.00"x"',
    formatCategory: "number",
    valueType: "number",
    exampleInput: "5.32"
  },
  {
    formatTag: "sci",
    formatCode: "0.00E+0",
    formatCategory: "number",
    valueType: "number",
    exampleInput: "16546.1561"
  },
  // Percent formats
  {
    formatTag: "pct",
    formatCode: He,
    formatCategory: "percent",
    valueType: "number",
    exampleInput: 0.731,
    titleTagReplacement: "",
    _autoFormat: {
      autoFormatFunction: (t, a, e) => {
        var r;
        const o = t;
        if ((e == null ? void 0 : e.unitType) === "number") {
          const n = {
            min: e.min * 100,
            max: e.max * 100,
            median: e.median * 100,
            maxDecimals: Math.max(e.maxDecimals - 2, 0),
            unitType: e.unitType
          }, l = oa(n);
          return Ke.format(((r = l._autoFormat) == null ? void 0 : r.autoFormatCode) || "#,##0", o * 100) + "%";
        } else
          return Ke.format("#,##0%", o);
      }
    }
  },
  {
    formatTag: "pct0",
    formatCode: "#,##0%",
    formatCategory: "percent",
    valueType: "number",
    exampleInput: 0.731,
    titleTagReplacement: ""
  },
  {
    formatTag: "pct1",
    formatCode: "#,##0.0%",
    formatCategory: "percent",
    valueType: "number",
    exampleInput: 0.731,
    titleTagReplacement: ""
  },
  {
    formatTag: "pct2",
    formatCode: "#,##0.00%",
    formatCategory: "percent",
    valueType: "number",
    exampleInput: 0.731,
    titleTagReplacement: ""
  },
  {
    formatTag: "pct3",
    formatCode: "#,##0.000%",
    formatCategory: "percent",
    valueType: "number",
    exampleInput: 0.731,
    titleTagReplacement: ""
  }
];
function St(t) {
  if (t && typeof t == "string") {
    let a = t;
    const e = a.split(" ");
    a.includes(":") || (a = a + "T00:00:00"), e.length > 2 && (a = e[0] + " " + e[1]);
    const o = /\.([^\s]+)/;
    return a = a.replace(o, ""), a = a.replace("Z", ""), a = a.replace(" ", "T"), a;
  }
  return String(t);
}
function Gl(t, a) {
  return t.map((e) => ({
    ...e,
    [a]: e[a] ? new Date(St(e[a])) : null
  }));
}
function Yo(t, a) {
  return t.map((e) => ({
    ...e,
    [a]: St(e[a])
  }));
}
const Ya = "axis", na = "value";
let Xa = [];
function Xo(t) {
  Xa = t;
}
function qo() {
  return Xa;
}
function Jo(t) {
  if (t == null)
    return "string";
  if (typeof t == "number")
    return "number";
  if (typeof t == "boolean")
    return "boolean";
  if (t instanceof Date)
    return "date";
  if (typeof t == "string") {
    const a = new Date(t);
    if (!isNaN(a.getTime()) && t.match(/\d{4}-\d{2}-\d{2}/))
      return "date";
  }
  return "string";
}
function Ko(t) {
  if (!t) return;
  const a = t.lastIndexOf("_");
  if (a > 0)
    return t.substring(a + 1);
}
function qa(t, a, e) {
  const o = Ko(t);
  if (a.columnType === "string")
    return;
  if (o) {
    const n = ra.find(
      (l) => {
        var i;
        return ((i = l.formatTag) == null ? void 0 : i.toLowerCase()) === (o == null ? void 0 : o.toLowerCase());
      }
    );
    if (n)
      return n;
  }
  const r = No(
    t ?? "",
    { columnType: a.columnType },
    e
  );
  if (r)
    return r;
}
function de(t, a) {
  const e = t, o = ra.find(
    (n) => {
      var l;
      return ((l = n.formatTag) == null ? void 0 : l.toLowerCase()) === (e == null ? void 0 : e.toLowerCase());
    }
  );
  if (o)
    return o;
  const r = {
    formatTag: "custom",
    formatCode: e
  };
  return a && (r.valueType = a), r;
}
function Zo(t, a) {
  return a === Ya && t.axisFormatCode ? t.axisFormatCode : t.formatCode;
}
function K(t, a, e) {
  try {
    return la(t, a, e, na);
  } catch (o) {
    return console.warn(`Unexpected error in formatValue: ${o}`), String(t);
  }
}
function qe(t, a, e) {
  try {
    return la(t, a, e, Ya);
  } catch {
    return String(t);
  }
}
function Ja(t, a) {
  let e = t || "";
  if (t && (a != null && a.formatTag)) {
    const o = t.toLowerCase().lastIndexOf(`_${a.formatTag.toLowerCase()}`);
    let r = "";
    o > 0 && (typeof (a == null ? void 0 : a.titleTagReplacement) == "string" && (r = a.titleTagReplacement), e = t.substring(0, o) + r);
  }
  return e;
}
function Le(t, a) {
  let e = Ja(t, a);
  return e = e.replace(/_/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").replace(/\b\w/g, (o) => o.toUpperCase()), e;
}
function la(t, a, e, o = na) {
  if (t == null)
    return "-";
  if (a)
    try {
      const r = Zo(a, o);
      let n;
      try {
        a.valueType === "date" && typeof t == "string" ? n = new Date(St(t)) : t instanceof Date ? n = new Date(t.toISOString().slice(0, -1)) : a.valueType === "number" && typeof t != "number" && !Number.isNaN(t) ? n = Number(t) : n = t;
      } catch {
        n = t;
      }
      if (Ro(a, r))
        try {
          return Go(n, a, e);
        } catch (l) {
          console.warn(`Unexpected error applying auto formatting: ${l}`);
        }
      else if (r)
        try {
          return Ke.format(r, n);
        } catch (l) {
          console.warn(`Unexpected error applying ssf formatting: ${l}`);
        }
    } catch (r) {
      console.warn(`Unexpected error in applyFormatting: ${r}`);
    }
  return typeof t == "number" ? Number.isInteger(t) ? t.toLocaleString() : t.toLocaleString(void 0, { maximumFractionDigits: 2 }) : t instanceof Date ? t.toLocaleDateString() : String(t);
}
function Qo(t) {
  switch (t) {
    case "number":
      return 1234;
    case "date":
      return "2022-01-03";
    default:
      return;
  }
}
function er(t) {
  var o, r;
  const e = ((o = t.userInput) == null ? void 0 : o.trim()) || t.exampleInput || Qo(t.valueType);
  if (e)
    try {
      let n;
      if (t.valueType === "number") {
        const l = Number(e);
        n = {
          min: l,
          max: l,
          median: l,
          maxDecimals: ((r = l.toString().split(".")[1]) == null ? void 0 : r.length) || 0,
          unitType: "number"
        };
      }
      return la(e, t, n, na);
    } catch {
    }
  return "";
}
function tr(t, a) {
  if (a) {
    const e = de(a);
    return K(t, e);
  }
  return K(t);
}
const ka = {
  light: {
    "base-100": "#ffffff",
    "base-200": "#f5f5f5",
    "base-300": "#d4d4d4",
    "base-content": "#404040",
    "base-content-muted": "#737373",
    "base-heading": "#0d0d0d"
  },
  dark: {
    "base-100": "#09090b",
    "base-200": "#18181b",
    "base-300": "#3f3f46",
    "base-content": "#d4d4d8",
    "base-content-muted": "#71717a",
    "base-heading": "#fafafa"
  }
}, Aa = [
  "#236aa4",
  "#45a1bf",
  "#a5cdee",
  "#8dacbf",
  "#85c7c6",
  "#d2c6ac",
  "#f4b548",
  "#8f3d56",
  "#71b9f4",
  "#46a485"
];
let Be = {
  light: {
    colors: ka.light,
    colorPalettes: {
      default: Aa
    },
    colorScales: {
      default: ["#ADD8E6", "#00008B"],
      blue: ["#ADD8E6", "#00008B"],
      green: ["#90EE90", "#006400"],
      red: ["#FFB6C1", "#8B0000"],
      orange: ["#FFDAB9", "#FF4500"],
      purple: ["#E6E6FA", "#4B0082"]
    }
  },
  dark: {
    colors: ka.dark,
    colorPalettes: {
      default: Aa
    },
    colorScales: {
      default: ["#ADD8E6", "#00008B"],
      blue: ["#ADD8E6", "#00008B"],
      green: ["#90EE90", "#006400"],
      red: ["#FFB6C1", "#8B0000"],
      orange: ["#FFDAB9", "#FF4500"],
      purple: ["#E6E6FA", "#4B0082"]
    }
  }
};
function ar(t) {
  t.light && (Be.light = {
    ...Be.light,
    ...t.light,
    colors: { ...Be.light.colors, ...t.light.colors },
    colorPalettes: { ...Be.light.colorPalettes, ...t.light.colorPalettes },
    colorScales: { ...Be.light.colorScales, ...t.light.colorScales }
  }), t.dark && (Be.dark = {
    ...Be.dark,
    ...t.dark,
    colors: { ...Be.dark.colors, ...t.dark.colors },
    colorPalettes: { ...Be.dark.colorPalettes, ...t.dark.colorPalettes },
    colorScales: { ...Be.dark.colorScales, ...t.dark.colorScales }
  });
}
function Ka() {
  return Be;
}
function Za(t) {
  const a = Be[t], e = a.colors, o = e["base-content-muted"], r = e["base-content-muted"], n = e["base-content-muted"], l = e["base-300"], i = e["base-100"], s = e["base-content-muted"], u = e["base-content-muted"], y = e["base-content-muted"], d = e["base-300"], f = e["base-100"], h = e["base-content"], c = e["base-heading"], m = e["base-content-muted"];
  return {
    darkMode: t === "dark",
    backgroundColor: e["base-100"],
    textStyle: {
      fontFamily: ["Inter", "sans-serif"]
    },
    grid: {
      left: "1%",
      right: "4%",
      bottom: "0%",
      top: "15%",
      containLabel: !0
    },
    color: a.colorPalettes.default,
    title: {
      padding: 0,
      itemGap: 7,
      textStyle: {
        fontSize: 14,
        color: c
      },
      subtextStyle: {
        fontSize: 13,
        color: m,
        overflow: "break"
      },
      top: "1px"
    },
    line: {
      itemStyle: {
        borderWidth: 0
      },
      lineStyle: {
        width: 2,
        join: "round"
      },
      symbolSize: 0,
      symbol: "circle",
      smooth: !1
    },
    radar: {
      itemStyle: {
        borderWidth: 0
      },
      lineStyle: {
        width: 2
      },
      symbolSize: 0,
      symbol: "circle",
      smooth: !1
    },
    pie: {
      itemStyle: {
        borderWidth: 0,
        borderColor: "#cccccc"
      }
    },
    scatter: {
      itemStyle: {
        borderWidth: 0,
        borderColor: "#cccccc"
      }
    },
    boxplot: {
      itemStyle: {
        borderWidth: 1.5
      }
    },
    parallel: {
      itemStyle: {
        borderWidth: 0,
        borderColor: "#cccccc"
      }
    },
    sankey: {
      itemStyle: {
        borderWidth: 0,
        borderColor: "#cccccc"
      }
    },
    funnel: {
      itemStyle: {
        borderWidth: 0,
        borderColor: "#cccccc"
      }
    },
    gauge: {
      itemStyle: {
        borderWidth: 0,
        borderColor: "#cccccc"
      }
    },
    candlestick: {
      itemStyle: {
        color: "#eb5454",
        color0: "#47b262",
        borderColor: "#eb5454",
        borderColor0: "#47b262",
        borderWidth: 1
      }
    },
    graph: {
      itemStyle: {
        borderWidth: 0,
        borderColor: "#cccccc"
      },
      lineStyle: {
        width: 1,
        color: "#aaaaaa"
      },
      symbolSize: 0,
      symbol: "circle",
      smooth: !1,
      color: [
        "#923d59",
        "#488f96",
        "#518eca",
        "#b3a9a0",
        "#ffc857",
        "#495867",
        "#bfdbf7",
        "#bc4749",
        "#eeebd0"
      ],
      label: {
        color: "#f2f2f2"
      }
    },
    map: {
      itemStyle: {
        areaColor: "#eee",
        borderColor: "#444",
        borderWidth: 0.5
      },
      label: {
        color: "#000"
      },
      emphasis: {
        itemStyle: {
          areaColor: "rgba(255,215,0,0.8)",
          borderColor: "#444",
          borderWidth: 1
        },
        label: {
          color: "rgb(100,0,0)"
        }
      }
    },
    geo: {
      itemStyle: {
        areaColor: "#eee",
        borderColor: "#444",
        borderWidth: 0.5
      },
      label: {
        color: "#000"
      },
      emphasis: {
        itemStyle: {
          areaColor: "rgba(255,215,0,0.8)",
          borderColor: "#444",
          borderWidth: 1
        },
        label: {
          color: "rgb(100,0,0)"
        }
      }
    },
    categoryAxis: {
      axisLine: {
        show: !0,
        lineStyle: {
          color: o
        }
      },
      axisTick: {
        show: !1,
        lineStyle: {
          color: r
        },
        length: 3,
        alignWithLabel: !0
      },
      axisLabel: {
        show: !0,
        color: n
      },
      splitLine: {
        show: !1,
        lineStyle: {
          color: [l]
        }
      },
      splitArea: {
        show: !1,
        areaStyle: {
          color: ["rgba(250,250,250,0.2)", "rgba(210,219,238,0.2)"]
        }
      }
    },
    valueAxis: {
      axisLine: {
        show: !1,
        lineStyle: {
          color: o
        }
      },
      axisTick: {
        show: !1,
        lineStyle: {
          color: r
        },
        length: 2
      },
      axisLabel: {
        show: !0,
        color: n
      },
      splitLine: {
        show: !0,
        lineStyle: {
          color: [l],
          width: 1
        }
      },
      splitArea: {
        show: !1,
        areaStyle: {
          color: ["rgba(250,250,250,0.2)", "rgba(210,219,238,0.2)"]
        }
      },
      nameTextStyle: {
        backgroundColor: i
      }
    },
    logAxis: {
      axisLine: {
        show: !1,
        lineStyle: {
          color: o
        }
      },
      axisTick: {
        show: !1,
        lineStyle: {
          color: r
        },
        length: 2
      },
      axisLabel: {
        show: !0,
        color: n
      },
      splitLine: {
        show: !0,
        lineStyle: {
          color: [l]
        }
      },
      splitArea: {
        show: !1,
        areaStyle: {
          color: ["rgba(250,250,250,0.2)", "rgba(210,219,238,0.2)"]
        }
      },
      nameTextStyle: {
        backgroundColor: i
      }
    },
    timeAxis: {
      axisLine: {
        show: !0,
        lineStyle: {
          color: o
        }
      },
      axisTick: {
        show: !0,
        lineStyle: {
          color: r
        },
        length: 3
      },
      axisLabel: {
        show: !0,
        color: n
      },
      splitLine: {
        show: !1,
        lineStyle: {
          color: [l]
        }
      },
      splitArea: {
        show: !1,
        areaStyle: {
          color: ["rgba(250,250,250,0.2)", "rgba(210,219,238,0.2)"]
        }
      }
    },
    toolbox: {
      iconStyle: {
        borderColor: "#999999"
      },
      emphasis: {
        iconStyle: {
          borderColor: "#459cde"
        }
      }
    },
    legend: {
      textStyle: {
        padding: [0, 0, 0, -7],
        color: s
      },
      icon: "circle",
      pageIcons: {
        horizontal: [
          "M 17 3 h 2 c 0.386 0 0.738 0.223 0.904 0.572 s 0.115 0.762 -0.13 1.062 L 11.292 15 l 8.482 10.367 c 0.245 0.299 0.295 0.712 0.13 1.062 S 19.386 27 19 27 h -2 c -0.3 0 -0.584 -0.135 -0.774 -0.367 l -9 -11 c -0.301 -0.369 -0.301 -0.898 0 -1.267 l 9 -11 C 16.416 3.135 16.7 3 17 3 Z",
          "M 12 27 h -2 c -0.386 0 -0.738 -0.223 -0.904 -0.572 s -0.115 -0.762 0.13 -1.062 L 17.708 15 L 9.226 4.633 c -0.245 -0.299 -0.295 -0.712 -0.13 -1.062 S 9.614 3 10 3 h 2 c 0.3 0 0.584 0.135 0.774 0.367 l 9 11 c 0.301 0.369 0.301 0.898 0 1.267 l -9 11 C 12.584 26.865 12.3 27 12 27 Z"
        ]
      },
      pageIconColor: u,
      pageIconSize: 12,
      pageTextStyle: {
        color: y
      },
      pageButtonItemGap: -2,
      animationDurationUpdate: 300
    },
    tooltip: {
      axisPointer: {
        lineStyle: {
          color: "#cccccc",
          width: 1
        },
        crossStyle: {
          color: "#cccccc",
          width: 1
        }
      },
      borderRadius: 4,
      borderWidth: 1,
      borderColor: d,
      backgroundColor: f,
      textStyle: {
        color: h,
        fontSize: 12,
        fontWeight: 400
      },
      padding: 6
    },
    timeline: {
      lineStyle: {
        color: "#e3e3e3",
        width: 2
      },
      itemStyle: {
        color: "#d6d6d6",
        borderWidth: 1
      },
      controlStyle: {
        color: "#bfbfbf",
        borderColor: "#bfbfbf",
        borderWidth: 1
      },
      checkpointStyle: {
        color: "#8f8f8f",
        borderColor: "#ffffff"
      },
      label: {
        color: "#c9c9c9"
      },
      emphasis: {
        itemStyle: {
          color: "#9c9c9c"
        },
        controlStyle: {
          color: "#bfbfbf",
          borderColor: "#bfbfbf",
          borderWidth: 1
        },
        label: {
          color: "#c9c9c9"
        }
      }
    },
    visualMap: {
      color: ["#c41621", "#e39588", "#f5ed98"]
    },
    dataZoom: {
      type: "slider",
      bottom: 10,
      height: 30,
      showDetail: !1,
      handleSize: "80%",
      borderColor: l,
      handleStyle: {
        borderColor: l,
        color: l
      },
      moveHandleStyle: {
        borderColor: l,
        color: l
      },
      textStyle: {},
      emphasis: {
        handleStyle: {
          borderColor: l,
          color: l
        },
        moveHandleStyle: {
          borderColor: l,
          color: l
        }
      }
    },
    markPoint: {
      label: {
        color: "#f2f2f2"
      },
      emphasis: {
        label: {
          color: "#f2f2f2"
        }
      }
    }
  };
}
const ia = Za("light"), sa = Za("dark"), Je = (t, a = 0, e = 1) => ua(fa(a, t), e), ca = (t) => {
  t._clipped = !1, t._unclipped = t.slice(0);
  for (let a = 0; a <= 3; a++)
    a < 3 ? ((t[a] < 0 || t[a] > 255) && (t._clipped = !0), t[a] = Je(t[a], 0, 255)) : a === 3 && (t[a] = Je(t[a], 0, 1));
  return t;
}, Qa = {};
for (let t of [
  "Boolean",
  "Number",
  "String",
  "Function",
  "Array",
  "Date",
  "RegExp",
  "Undefined",
  "Null"
])
  Qa[`[object ${t}]`] = t.toLowerCase();
function te(t) {
  return Qa[Object.prototype.toString.call(t)] || "object";
}
const ae = (t, a = null) => t.length >= 3 ? Array.prototype.slice.call(t) : te(t[0]) == "object" && a ? a.split("").filter((e) => t[0][e] !== void 0).map((e) => t[0][e]) : t[0], Tt = (t) => {
  if (t.length < 2) return null;
  const a = t.length - 1;
  return te(t[a]) == "string" ? t[a].toLowerCase() : null;
}, { PI: Mt, min: ua, max: fa } = Math, Ee = Mt * 2, Et = Mt / 3, or = Mt / 180, rr = 180 / Mt, q = {
  format: {},
  autodetect: []
};
class P {
  constructor(...a) {
    const e = this;
    if (te(a[0]) === "object" && a[0].constructor && a[0].constructor === this.constructor)
      return a[0];
    let o = Tt(a), r = !1;
    if (!o) {
      r = !0, q.sorted || (q.autodetect = q.autodetect.sort((n, l) => l.p - n.p), q.sorted = !0);
      for (let n of q.autodetect)
        if (o = n.test(...a), o) break;
    }
    if (q.format[o]) {
      const n = q.format[o].apply(
        null,
        r ? a : a.slice(0, -1)
      );
      e._rgb = ca(n);
    } else
      throw new Error("unknown format: " + a);
    e._rgb.length === 3 && e._rgb.push(1);
  }
  toString() {
    return te(this.hex) == "function" ? this.hex() : `[${this._rgb.join(",")}]`;
  }
}
const nr = "2.6.0", Y = (...t) => new Y.Color(...t);
Y.Color = P;
Y.version = nr;
const lr = (...t) => {
  t = ae(t, "cmyk");
  const [a, e, o, r] = t, n = t.length > 4 ? t[4] : 1;
  return r === 1 ? [0, 0, 0, n] : [
    a >= 1 ? 0 : 255 * (1 - a) * (1 - r),
    // r
    e >= 1 ? 0 : 255 * (1 - e) * (1 - r),
    // g
    o >= 1 ? 0 : 255 * (1 - o) * (1 - r),
    // b
    n
  ];
}, { max: Sa } = Math, ir = (...t) => {
  let [a, e, o] = ae(t, "rgb");
  a = a / 255, e = e / 255, o = o / 255;
  const r = 1 - Sa(a, Sa(e, o)), n = r < 1 ? 1 / (1 - r) : 0, l = (1 - a - r) * n, i = (1 - e - r) * n, s = (1 - o - r) * n;
  return [l, i, s, r];
};
P.prototype.cmyk = function() {
  return ir(this._rgb);
};
Y.cmyk = (...t) => new P(...t, "cmyk");
q.format.cmyk = lr;
q.autodetect.push({
  p: 2,
  test: (...t) => {
    if (t = ae(t, "cmyk"), te(t) === "array" && t.length === 4)
      return "cmyk";
  }
});
const Pt = (t) => Math.round(t * 100) / 100, sr = (...t) => {
  const a = ae(t, "hsla");
  let e = Tt(t) || "lsa";
  return a[0] = Pt(a[0] || 0), a[1] = Pt(a[1] * 100) + "%", a[2] = Pt(a[2] * 100) + "%", e === "hsla" || a.length > 3 && a[3] < 1 ? (a[3] = a.length > 3 ? a[3] : 1, e = "hsla") : a.length = 3, `${e}(${a.join(",")})`;
}, eo = (...t) => {
  t = ae(t, "rgba");
  let [a, e, o] = t;
  a /= 255, e /= 255, o /= 255;
  const r = ua(a, e, o), n = fa(a, e, o), l = (n + r) / 2;
  let i, s;
  return n === r ? (i = 0, s = Number.NaN) : i = l < 0.5 ? (n - r) / (n + r) : (n - r) / (2 - n - r), a == n ? s = (e - o) / (n - r) : e == n ? s = 2 + (o - a) / (n - r) : o == n && (s = 4 + (a - e) / (n - r)), s *= 60, s < 0 && (s += 360), t.length > 3 && t[3] !== void 0 ? [s, i, l, t[3]] : [s, i, l];
}, { round: Dt } = Math, cr = (...t) => {
  const a = ae(t, "rgba");
  let e = Tt(t) || "rgb";
  return e.substr(0, 3) == "hsl" ? sr(eo(a), e) : (a[0] = Dt(a[0]), a[1] = Dt(a[1]), a[2] = Dt(a[2]), (e === "rgba" || a.length > 3 && a[3] < 1) && (a[3] = a.length > 3 ? a[3] : 1, e = "rgba"), `${e}(${a.slice(0, e === "rgb" ? 3 : 4).join(",")})`);
}, { round: Rt } = Math, Qt = (...t) => {
  t = ae(t, "hsl");
  const [a, e, o] = t;
  let r, n, l;
  if (e === 0)
    r = n = l = o * 255;
  else {
    const i = [0, 0, 0], s = [0, 0, 0], u = o < 0.5 ? o * (1 + e) : o + e - o * e, y = 2 * o - u, d = a / 360;
    i[0] = d + 1 / 3, i[1] = d, i[2] = d - 1 / 3;
    for (let f = 0; f < 3; f++)
      i[f] < 0 && (i[f] += 1), i[f] > 1 && (i[f] -= 1), 6 * i[f] < 1 ? s[f] = y + (u - y) * 6 * i[f] : 2 * i[f] < 1 ? s[f] = u : 3 * i[f] < 2 ? s[f] = y + (u - y) * (2 / 3 - i[f]) * 6 : s[f] = y;
    [r, n, l] = [Rt(s[0] * 255), Rt(s[1] * 255), Rt(s[2] * 255)];
  }
  return t.length > 3 ? [r, n, l, t[3]] : [r, n, l, 1];
}, to = /^rgb\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*\)$/, ao = /^rgba\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*([01]|[01]?\.\d+)\)$/, oo = /^rgb\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/, ro = /^rgba\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/, no = /^hsl\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/, lo = /^hsla\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/, { round: Ta } = Math, da = (t) => {
  t = t.toLowerCase().trim();
  let a;
  if (q.format.named)
    try {
      return q.format.named(t);
    } catch {
    }
  if (a = t.match(to)) {
    const e = a.slice(1, 4);
    for (let o = 0; o < 3; o++)
      e[o] = +e[o];
    return e[3] = 1, e;
  }
  if (a = t.match(ao)) {
    const e = a.slice(1, 5);
    for (let o = 0; o < 4; o++)
      e[o] = +e[o];
    return e;
  }
  if (a = t.match(oo)) {
    const e = a.slice(1, 4);
    for (let o = 0; o < 3; o++)
      e[o] = Ta(e[o] * 2.55);
    return e[3] = 1, e;
  }
  if (a = t.match(ro)) {
    const e = a.slice(1, 5);
    for (let o = 0; o < 3; o++)
      e[o] = Ta(e[o] * 2.55);
    return e[3] = +e[3], e;
  }
  if (a = t.match(no)) {
    const e = a.slice(1, 4);
    e[1] *= 0.01, e[2] *= 0.01;
    const o = Qt(e);
    return o[3] = 1, o;
  }
  if (a = t.match(lo)) {
    const e = a.slice(1, 4);
    e[1] *= 0.01, e[2] *= 0.01;
    const o = Qt(e);
    return o[3] = +a[4], o;
  }
};
da.test = (t) => to.test(t) || ao.test(t) || oo.test(t) || ro.test(t) || no.test(t) || lo.test(t);
P.prototype.css = function(t) {
  return cr(this._rgb, t);
};
Y.css = (...t) => new P(...t, "css");
q.format.css = da;
q.autodetect.push({
  p: 5,
  test: (t, ...a) => {
    if (!a.length && te(t) === "string" && da.test(t))
      return "css";
  }
});
q.format.gl = (...t) => {
  const a = ae(t, "rgba");
  return a[0] *= 255, a[1] *= 255, a[2] *= 255, a;
};
Y.gl = (...t) => new P(...t, "gl");
P.prototype.gl = function() {
  const t = this._rgb;
  return [t[0] / 255, t[1] / 255, t[2] / 255, t[3]];
};
const { floor: ur } = Math, fr = (...t) => {
  t = ae(t, "hcg");
  let [a, e, o] = t, r, n, l;
  o = o * 255;
  const i = e * 255;
  if (e === 0)
    r = n = l = o;
  else {
    a === 360 && (a = 0), a > 360 && (a -= 360), a < 0 && (a += 360), a /= 60;
    const s = ur(a), u = a - s, y = o * (1 - e), d = y + i * (1 - u), f = y + i * u, h = y + i;
    switch (s) {
      case 0:
        [r, n, l] = [h, f, y];
        break;
      case 1:
        [r, n, l] = [d, h, y];
        break;
      case 2:
        [r, n, l] = [y, h, f];
        break;
      case 3:
        [r, n, l] = [y, d, h];
        break;
      case 4:
        [r, n, l] = [f, y, h];
        break;
      case 5:
        [r, n, l] = [h, y, d];
        break;
    }
  }
  return [r, n, l, t.length > 3 ? t[3] : 1];
}, dr = (...t) => {
  const [a, e, o] = ae(t, "rgb"), r = ua(a, e, o), n = fa(a, e, o), l = n - r, i = l * 100 / 255, s = r / (255 - l) * 100;
  let u;
  return l === 0 ? u = Number.NaN : (a === n && (u = (e - o) / l), e === n && (u = 2 + (o - a) / l), o === n && (u = 4 + (a - e) / l), u *= 60, u < 0 && (u += 360)), [u, i, s];
};
P.prototype.hcg = function() {
  return dr(this._rgb);
};
Y.hcg = (...t) => new P(...t, "hcg");
q.format.hcg = fr;
q.autodetect.push({
  p: 1,
  test: (...t) => {
    if (t = ae(t, "hcg"), te(t) === "array" && t.length === 3)
      return "hcg";
  }
});
const hr = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, pr = /^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/, io = (t) => {
  if (t.match(hr)) {
    (t.length === 4 || t.length === 7) && (t = t.substr(1)), t.length === 3 && (t = t.split(""), t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]);
    const a = parseInt(t, 16), e = a >> 16, o = a >> 8 & 255, r = a & 255;
    return [e, o, r, 1];
  }
  if (t.match(pr)) {
    (t.length === 5 || t.length === 9) && (t = t.substr(1)), t.length === 4 && (t = t.split(""), t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2] + t[3] + t[3]);
    const a = parseInt(t, 16), e = a >> 24 & 255, o = a >> 16 & 255, r = a >> 8 & 255, n = Math.round((a & 255) / 255 * 100) / 100;
    return [e, o, r, n];
  }
  throw new Error(`unknown hex color: ${t}`);
}, { round: gt } = Math, so = (...t) => {
  let [a, e, o, r] = ae(t, "rgba"), n = Tt(t) || "auto";
  r === void 0 && (r = 1), n === "auto" && (n = r < 1 ? "rgba" : "rgb"), a = gt(a), e = gt(e), o = gt(o);
  let i = "000000" + (a << 16 | e << 8 | o).toString(16);
  i = i.substr(i.length - 6);
  let s = "0" + gt(r * 255).toString(16);
  switch (s = s.substr(s.length - 2), n.toLowerCase()) {
    case "rgba":
      return `#${i}${s}`;
    case "argb":
      return `#${s}${i}`;
    default:
      return `#${i}`;
  }
};
P.prototype.hex = function(t) {
  return so(this._rgb, t);
};
Y.hex = (...t) => new P(...t, "hex");
q.format.hex = io;
q.autodetect.push({
  p: 4,
  test: (t, ...a) => {
    if (!a.length && te(t) === "string" && [3, 4, 5, 6, 7, 8, 9].indexOf(t.length) >= 0)
      return "hex";
  }
});
const { cos: Ue } = Math, mr = (...t) => {
  t = ae(t, "hsi");
  let [a, e, o] = t, r, n, l;
  return isNaN(a) && (a = 0), isNaN(e) && (e = 0), a > 360 && (a -= 360), a < 0 && (a += 360), a /= 360, a < 1 / 3 ? (l = (1 - e) / 3, r = (1 + e * Ue(Ee * a) / Ue(Et - Ee * a)) / 3, n = 1 - (l + r)) : a < 2 / 3 ? (a -= 1 / 3, r = (1 - e) / 3, n = (1 + e * Ue(Ee * a) / Ue(Et - Ee * a)) / 3, l = 1 - (r + n)) : (a -= 2 / 3, n = (1 - e) / 3, l = (1 + e * Ue(Ee * a) / Ue(Et - Ee * a)) / 3, r = 1 - (n + l)), r = Je(o * r * 3), n = Je(o * n * 3), l = Je(o * l * 3), [r * 255, n * 255, l * 255, t.length > 3 ? t[3] : 1];
}, { min: br, sqrt: gr, acos: yr } = Math, vr = (...t) => {
  let [a, e, o] = ae(t, "rgb");
  a /= 255, e /= 255, o /= 255;
  let r;
  const n = br(a, e, o), l = (a + e + o) / 3, i = l > 0 ? 1 - n / l : 0;
  return i === 0 ? r = NaN : (r = (a - e + (a - o)) / 2, r /= gr((a - e) * (a - e) + (a - o) * (e - o)), r = yr(r), o > e && (r = Ee - r), r /= Ee), [r * 360, i, l];
};
P.prototype.hsi = function() {
  return vr(this._rgb);
};
Y.hsi = (...t) => new P(...t, "hsi");
q.format.hsi = mr;
q.autodetect.push({
  p: 2,
  test: (...t) => {
    if (t = ae(t, "hsi"), te(t) === "array" && t.length === 3)
      return "hsi";
  }
});
P.prototype.hsl = function() {
  return eo(this._rgb);
};
Y.hsl = (...t) => new P(...t, "hsl");
q.format.hsl = Qt;
q.autodetect.push({
  p: 2,
  test: (...t) => {
    if (t = ae(t, "hsl"), te(t) === "array" && t.length === 3)
      return "hsl";
  }
});
const { floor: xr } = Math, wr = (...t) => {
  t = ae(t, "hsv");
  let [a, e, o] = t, r, n, l;
  if (o *= 255, e === 0)
    r = n = l = o;
  else {
    a === 360 && (a = 0), a > 360 && (a -= 360), a < 0 && (a += 360), a /= 60;
    const i = xr(a), s = a - i, u = o * (1 - e), y = o * (1 - e * s), d = o * (1 - e * (1 - s));
    switch (i) {
      case 0:
        [r, n, l] = [o, d, u];
        break;
      case 1:
        [r, n, l] = [y, o, u];
        break;
      case 2:
        [r, n, l] = [u, o, d];
        break;
      case 3:
        [r, n, l] = [u, y, o];
        break;
      case 4:
        [r, n, l] = [d, u, o];
        break;
      case 5:
        [r, n, l] = [o, u, y];
        break;
    }
  }
  return [r, n, l, t.length > 3 ? t[3] : 1];
}, { min: Cr, max: kr } = Math, Ar = (...t) => {
  t = ae(t, "rgb");
  let [a, e, o] = t;
  const r = Cr(a, e, o), n = kr(a, e, o), l = n - r;
  let i, s, u;
  return u = n / 255, n === 0 ? (i = Number.NaN, s = 0) : (s = l / n, a === n && (i = (e - o) / l), e === n && (i = 2 + (o - a) / l), o === n && (i = 4 + (a - e) / l), i *= 60, i < 0 && (i += 360)), [i, s, u];
};
P.prototype.hsv = function() {
  return Ar(this._rgb);
};
Y.hsv = (...t) => new P(...t, "hsv");
q.format.hsv = wr;
q.autodetect.push({
  p: 2,
  test: (...t) => {
    if (t = ae(t, "hsv"), te(t) === "array" && t.length === 3)
      return "hsv";
  }
});
const Ae = {
  // Corresponds roughly to RGB brighter/darker
  Kn: 18,
  // D65 standard referent
  Xn: 0.95047,
  Yn: 1,
  Zn: 1.08883,
  t0: 0.137931034,
  // 4 / 29
  t1: 0.206896552,
  // 6 / 29
  t2: 0.12841855,
  // 3 * t1 * t1
  t3: 8856452e-9
  // t1 * t1 * t1
}, { pow: Sr } = Math, co = (...t) => {
  t = ae(t, "lab");
  const [a, e, o] = t;
  let r, n, l, i, s, u;
  return n = (a + 16) / 116, r = isNaN(e) ? n : n + e / 500, l = isNaN(o) ? n : n - o / 200, n = Ae.Yn * Gt(n), r = Ae.Xn * Gt(r), l = Ae.Zn * Gt(l), i = Nt(3.2404542 * r - 1.5371385 * n - 0.4985314 * l), s = Nt(-0.969266 * r + 1.8760108 * n + 0.041556 * l), u = Nt(0.0556434 * r - 0.2040259 * n + 1.0572252 * l), [i, s, u, t.length > 3 ? t[3] : 1];
}, Nt = (t) => 255 * (t <= 304e-5 ? 12.92 * t : 1.055 * Sr(t, 1 / 2.4) - 0.055), Gt = (t) => t > Ae.t1 ? t * t * t : Ae.t2 * (t - Ae.t0), { pow: uo } = Math, fo = (...t) => {
  const [a, e, o] = ae(t, "rgb"), [r, n, l] = Tr(a, e, o), i = 116 * n - 16;
  return [i < 0 ? 0 : i, 500 * (r - n), 200 * (n - l)];
}, jt = (t) => (t /= 255) <= 0.04045 ? t / 12.92 : uo((t + 0.055) / 1.055, 2.4), Ht = (t) => t > Ae.t3 ? uo(t, 1 / 3) : t / Ae.t2 + Ae.t0, Tr = (t, a, e) => {
  t = jt(t), a = jt(a), e = jt(e);
  const o = Ht(
    (0.4124564 * t + 0.3575761 * a + 0.1804375 * e) / Ae.Xn
  ), r = Ht(
    (0.2126729 * t + 0.7151522 * a + 0.072175 * e) / Ae.Yn
  ), n = Ht(
    (0.0193339 * t + 0.119192 * a + 0.9503041 * e) / Ae.Zn
  );
  return [o, r, n];
};
P.prototype.lab = function() {
  return fo(this._rgb);
};
Y.lab = (...t) => new P(...t, "lab");
q.format.lab = co;
q.autodetect.push({
  p: 2,
  test: (...t) => {
    if (t = ae(t, "lab"), te(t) === "array" && t.length === 3)
      return "lab";
  }
});
const { sin: Mr, cos: _r } = Math, ho = (...t) => {
  let [a, e, o] = ae(t, "lch");
  return isNaN(o) && (o = 0), o = o * or, [a, _r(o) * e, Mr(o) * e];
}, po = (...t) => {
  t = ae(t, "lch");
  const [a, e, o] = t, [r, n, l] = ho(a, e, o), [i, s, u] = co(r, n, l);
  return [i, s, u, t.length > 3 ? t[3] : 1];
}, Br = (...t) => {
  const a = ae(t, "hcl").reverse();
  return po(...a);
}, { sqrt: $r, atan2: Or, round: Fr } = Math, mo = (...t) => {
  const [a, e, o] = ae(t, "lab"), r = $r(e * e + o * o);
  let n = (Or(o, e) * rr + 360) % 360;
  return Fr(r * 1e4) === 0 && (n = Number.NaN), [a, r, n];
}, bo = (...t) => {
  const [a, e, o] = ae(t, "rgb"), [r, n, l] = fo(a, e, o);
  return mo(r, n, l);
};
P.prototype.lch = function() {
  return bo(this._rgb);
};
P.prototype.hcl = function() {
  return bo(this._rgb).reverse();
};
Y.lch = (...t) => new P(...t, "lch");
Y.hcl = (...t) => new P(...t, "hcl");
q.format.lch = po;
q.format.hcl = Br;
["lch", "hcl"].forEach(
  (t) => q.autodetect.push({
    p: 2,
    test: (...a) => {
      if (a = ae(a, t), te(a) === "array" && a.length === 3)
        return t;
    }
  })
);
const Ze = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  gold: "#ffd700",
  goldenrod: "#daa520",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  laserlemon: "#ffff54",
  lavender: "#e6e6fa",
  lavenderblush: "#fff0f5",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrod: "#fafad2",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  maroon2: "#7f0000",
  maroon3: "#b03060",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  purple2: "#7f007f",
  purple3: "#a020f0",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32"
};
P.prototype.name = function() {
  const t = so(this._rgb, "rgb");
  for (let a of Object.keys(Ze))
    if (Ze[a] === t) return a.toLowerCase();
  return t;
};
q.format.named = (t) => {
  if (t = t.toLowerCase(), Ze[t]) return io(Ze[t]);
  throw new Error("unknown color name: " + t);
};
q.autodetect.push({
  p: 5,
  test: (t, ...a) => {
    if (!a.length && te(t) === "string" && Ze[t.toLowerCase()])
      return "named";
  }
});
const Lr = (t) => {
  if (te(t) == "number" && t >= 0 && t <= 16777215) {
    const a = t >> 16, e = t >> 8 & 255, o = t & 255;
    return [a, e, o, 1];
  }
  throw new Error("unknown num color: " + t);
}, Ir = (...t) => {
  const [a, e, o] = ae(t, "rgb");
  return (a << 16) + (e << 8) + o;
};
P.prototype.num = function() {
  return Ir(this._rgb);
};
Y.num = (...t) => new P(...t, "num");
q.format.num = Lr;
q.autodetect.push({
  p: 5,
  test: (...t) => {
    if (t.length === 1 && te(t[0]) === "number" && t[0] >= 0 && t[0] <= 16777215)
      return "num";
  }
});
const { round: go } = Math;
P.prototype.rgb = function(t = !0) {
  return t === !1 ? this._rgb.slice(0, 3) : this._rgb.slice(0, 3).map(go);
};
P.prototype.rgba = function(t = !0) {
  return this._rgb.slice(0, 4).map((a, e) => e < 3 ? t === !1 ? a : go(a) : a);
};
Y.rgb = (...t) => new P(...t, "rgb");
q.format.rgb = (...t) => {
  const a = ae(t, "rgba");
  return a[3] === void 0 && (a[3] = 1), a;
};
q.autodetect.push({
  p: 3,
  test: (...t) => {
    if (t = ae(t, "rgba"), te(t) === "array" && (t.length === 3 || t.length === 4 && te(t[3]) == "number" && t[3] >= 0 && t[3] <= 1))
      return "rgb";
  }
});
const { log: yt } = Math, yo = (t) => {
  const a = t / 100;
  let e, o, r;
  return a < 66 ? (e = 255, o = a < 6 ? 0 : -155.25485562709179 - 0.44596950469579133 * (o = a - 2) + 104.49216199393888 * yt(o), r = a < 20 ? 0 : -254.76935184120902 + 0.8274096064007395 * (r = a - 10) + 115.67994401066147 * yt(r)) : (e = 351.97690566805693 + 0.114206453784165 * (e = a - 55) - 40.25366309332127 * yt(e), o = 325.4494125711974 + 0.07943456536662342 * (o = a - 50) - 28.0852963507957 * yt(o), r = 255), [e, o, r, 1];
}, { round: zr } = Math, Er = (...t) => {
  const a = ae(t, "rgb"), e = a[0], o = a[2];
  let r = 1e3, n = 4e4;
  const l = 0.4;
  let i;
  for (; n - r > l; ) {
    i = (n + r) * 0.5;
    const s = yo(i);
    s[2] / s[0] >= o / e ? n = i : r = i;
  }
  return zr(i);
};
P.prototype.temp = P.prototype.kelvin = P.prototype.temperature = function() {
  return Er(this._rgb);
};
Y.temp = Y.kelvin = Y.temperature = (...t) => new P(...t, "temp");
q.format.temp = q.format.kelvin = q.format.temperature = yo;
const { pow: wt, sign: Pr } = Math, vo = (...t) => {
  t = ae(t, "lab");
  const [a, e, o] = t, r = wt(a + 0.3963377774 * e + 0.2158037573 * o, 3), n = wt(a - 0.1055613458 * e - 0.0638541728 * o, 3), l = wt(a - 0.0894841775 * e - 1.291485548 * o, 3);
  return [
    255 * Vt(4.0767416621 * r - 3.3077115913 * n + 0.2309699292 * l),
    255 * Vt(-1.2684380046 * r + 2.6097574011 * n - 0.3413193965 * l),
    255 * Vt(-0.0041960863 * r - 0.7034186147 * n + 1.707614701 * l),
    t.length > 3 ? t[3] : 1
  ];
};
function Vt(t) {
  const a = Math.abs(t);
  return a > 31308e-7 ? (Pr(t) || 1) * (1.055 * wt(a, 1 / 2.4) - 0.055) : t * 12.92;
}
const { cbrt: Wt, pow: Dr, sign: Rr } = Math, xo = (...t) => {
  const [a, e, o] = ae(t, "rgb"), [r, n, l] = [
    Ut(a / 255),
    Ut(e / 255),
    Ut(o / 255)
  ], i = Wt(0.4122214708 * r + 0.5363325363 * n + 0.0514459929 * l), s = Wt(0.2119034982 * r + 0.6806995451 * n + 0.1073969566 * l), u = Wt(0.0883024619 * r + 0.2817188376 * n + 0.6299787005 * l);
  return [
    0.2104542553 * i + 0.793617785 * s - 0.0040720468 * u,
    1.9779984951 * i - 2.428592205 * s + 0.4505937099 * u,
    0.0259040371 * i + 0.7827717662 * s - 0.808675766 * u
  ];
};
function Ut(t) {
  const a = Math.abs(t);
  return a < 0.04045 ? t / 12.92 : (Rr(t) || 1) * Dr((a + 0.055) / 1.055, 2.4);
}
P.prototype.oklab = function() {
  return xo(this._rgb);
};
Y.oklab = (...t) => new P(...t, "oklab");
q.format.oklab = vo;
q.autodetect.push({
  p: 3,
  test: (...t) => {
    if (t = ae(t, "oklab"), te(t) === "array" && t.length === 3)
      return "oklab";
  }
});
const Nr = (...t) => {
  t = ae(t, "lch");
  const [a, e, o] = t, [r, n, l] = ho(a, e, o), [i, s, u] = vo(r, n, l);
  return [i, s, u, t.length > 3 ? t[3] : 1];
}, Gr = (...t) => {
  const [a, e, o] = ae(t, "rgb"), [r, n, l] = xo(a, e, o);
  return mo(r, n, l);
};
P.prototype.oklch = function() {
  return Gr(this._rgb);
};
Y.oklch = (...t) => new P(...t, "oklch");
q.format.oklch = Nr;
q.autodetect.push({
  p: 3,
  test: (...t) => {
    if (t = ae(t, "oklch"), te(t) === "array" && t.length === 3)
      return "oklch";
  }
});
P.prototype.alpha = function(t, a = !1) {
  return t !== void 0 && te(t) === "number" ? a ? (this._rgb[3] = t, this) : new P([this._rgb[0], this._rgb[1], this._rgb[2], t], "rgb") : this._rgb[3];
};
P.prototype.clipped = function() {
  return this._rgb._clipped || !1;
};
P.prototype.darken = function(t = 1) {
  const a = this, e = a.lab();
  return e[0] -= Ae.Kn * t, new P(e, "lab").alpha(a.alpha(), !0);
};
P.prototype.brighten = function(t = 1) {
  return this.darken(-t);
};
P.prototype.darker = P.prototype.darken;
P.prototype.brighter = P.prototype.brighten;
P.prototype.get = function(t) {
  const [a, e] = t.split("."), o = this[a]();
  if (e) {
    const r = a.indexOf(e) - (a.substr(0, 2) === "ok" ? 2 : 0);
    if (r > -1) return o[r];
    throw new Error(`unknown channel ${e} in mode ${a}`);
  } else
    return o;
};
const { pow: jr } = Math, Hr = 1e-7, Vr = 20;
P.prototype.luminance = function(t, a = "rgb") {
  if (t !== void 0 && te(t) === "number") {
    if (t === 0)
      return new P([0, 0, 0, this._rgb[3]], "rgb");
    if (t === 1)
      return new P([255, 255, 255, this._rgb[3]], "rgb");
    let e = this.luminance(), o = Vr;
    const r = (l, i) => {
      const s = l.interpolate(i, 0.5, a), u = s.luminance();
      return Math.abs(t - u) < Hr || !o-- ? s : u > t ? r(l, s) : r(s, i);
    }, n = (e > t ? r(new P([0, 0, 0]), this) : r(this, new P([255, 255, 255]))).rgb();
    return new P([...n, this._rgb[3]]);
  }
  return Wr(...this._rgb.slice(0, 3));
};
const Wr = (t, a, e) => (t = Yt(t), a = Yt(a), e = Yt(e), 0.2126 * t + 0.7152 * a + 0.0722 * e), Yt = (t) => (t /= 255, t <= 0.03928 ? t / 12.92 : jr((t + 0.055) / 1.055, 2.4)), ge = {}, st = (t, a, e = 0.5, ...o) => {
  let r = o[0] || "lrgb";
  if (!ge[r] && !o.length && (r = Object.keys(ge)[0]), !ge[r])
    throw new Error(`interpolation mode ${r} is not defined`);
  return te(t) !== "object" && (t = new P(t)), te(a) !== "object" && (a = new P(a)), ge[r](t, a, e).alpha(
    t.alpha() + e * (a.alpha() - t.alpha())
  );
};
P.prototype.mix = P.prototype.interpolate = function(t, a = 0.5, ...e) {
  return st(this, t, a, ...e);
};
P.prototype.premultiply = function(t = !1) {
  const a = this._rgb, e = a[3];
  return t ? (this._rgb = [a[0] * e, a[1] * e, a[2] * e, e], this) : new P([a[0] * e, a[1] * e, a[2] * e, e], "rgb");
};
P.prototype.saturate = function(t = 1) {
  const a = this, e = a.lch();
  return e[1] += Ae.Kn * t, e[1] < 0 && (e[1] = 0), new P(e, "lch").alpha(a.alpha(), !0);
};
P.prototype.desaturate = function(t = 1) {
  return this.saturate(-t);
};
P.prototype.set = function(t, a, e = !1) {
  const [o, r] = t.split("."), n = this[o]();
  if (r) {
    const l = o.indexOf(r) - (o.substr(0, 2) === "ok" ? 2 : 0);
    if (l > -1) {
      if (te(a) == "string")
        switch (a.charAt(0)) {
          case "+":
            n[l] += +a;
            break;
          case "-":
            n[l] += +a;
            break;
          case "*":
            n[l] *= +a.substr(1);
            break;
          case "/":
            n[l] /= +a.substr(1);
            break;
          default:
            n[l] = +a;
        }
      else if (te(a) === "number")
        n[l] = a;
      else
        throw new Error("unsupported value for Color.set");
      const i = new P(n, o);
      return e ? (this._rgb = i._rgb, this) : i;
    }
    throw new Error(`unknown channel ${r} in mode ${o}`);
  } else
    return n;
};
P.prototype.tint = function(t = 0.5, ...a) {
  return st(this, "white", t, ...a);
};
P.prototype.shade = function(t = 0.5, ...a) {
  return st(this, "black", t, ...a);
};
const Ur = (t, a, e) => {
  const o = t._rgb, r = a._rgb;
  return new P(
    o[0] + e * (r[0] - o[0]),
    o[1] + e * (r[1] - o[1]),
    o[2] + e * (r[2] - o[2]),
    "rgb"
  );
};
ge.rgb = Ur;
const { sqrt: Xt, pow: Ye } = Math, Yr = (t, a, e) => {
  const [o, r, n] = t._rgb, [l, i, s] = a._rgb;
  return new P(
    Xt(Ye(o, 2) * (1 - e) + Ye(l, 2) * e),
    Xt(Ye(r, 2) * (1 - e) + Ye(i, 2) * e),
    Xt(Ye(n, 2) * (1 - e) + Ye(s, 2) * e),
    "rgb"
  );
};
ge.lrgb = Yr;
const Xr = (t, a, e) => {
  const o = t.lab(), r = a.lab();
  return new P(
    o[0] + e * (r[0] - o[0]),
    o[1] + e * (r[1] - o[1]),
    o[2] + e * (r[2] - o[2]),
    "lab"
  );
};
ge.lab = Xr;
const tt = (t, a, e, o) => {
  let r, n;
  o === "hsl" ? (r = t.hsl(), n = a.hsl()) : o === "hsv" ? (r = t.hsv(), n = a.hsv()) : o === "hcg" ? (r = t.hcg(), n = a.hcg()) : o === "hsi" ? (r = t.hsi(), n = a.hsi()) : o === "lch" || o === "hcl" ? (o = "hcl", r = t.hcl(), n = a.hcl()) : o === "oklch" && (r = t.oklch().reverse(), n = a.oklch().reverse());
  let l, i, s, u, y, d;
  (o.substr(0, 1) === "h" || o === "oklch") && ([l, s, y] = r, [i, u, d] = n);
  let f, h, c, m;
  return !isNaN(l) && !isNaN(i) ? (i > l && i - l > 180 ? m = i - (l + 360) : i < l && l - i > 180 ? m = i + 360 - l : m = i - l, h = l + e * m) : isNaN(l) ? isNaN(i) ? h = Number.NaN : (h = i, (y == 1 || y == 0) && o != "hsv" && (f = u)) : (h = l, (d == 1 || d == 0) && o != "hsv" && (f = s)), f === void 0 && (f = s + e * (u - s)), c = y + e * (d - y), o === "oklch" ? new P([c, f, h], o) : new P([h, f, c], o);
}, wo = (t, a, e) => tt(t, a, e, "lch");
ge.lch = wo;
ge.hcl = wo;
const qr = (t, a, e) => {
  const o = t.num(), r = a.num();
  return new P(o + e * (r - o), "num");
};
ge.num = qr;
const Jr = (t, a, e) => tt(t, a, e, "hcg");
ge.hcg = Jr;
const Kr = (t, a, e) => tt(t, a, e, "hsi");
ge.hsi = Kr;
const Zr = (t, a, e) => tt(t, a, e, "hsl");
ge.hsl = Zr;
const Qr = (t, a, e) => tt(t, a, e, "hsv");
ge.hsv = Qr;
const en = (t, a, e) => {
  const o = t.oklab(), r = a.oklab();
  return new P(
    o[0] + e * (r[0] - o[0]),
    o[1] + e * (r[1] - o[1]),
    o[2] + e * (r[2] - o[2]),
    "oklab"
  );
};
ge.oklab = en;
const tn = (t, a, e) => tt(t, a, e, "oklch");
ge.oklch = tn;
const { pow: qt, sqrt: Jt, PI: Kt, cos: Ma, sin: _a, atan2: an } = Math, on = (t, a = "lrgb", e = null) => {
  const o = t.length;
  e || (e = Array.from(new Array(o)).map(() => 1));
  const r = o / e.reduce(function(d, f) {
    return d + f;
  });
  if (e.forEach((d, f) => {
    e[f] *= r;
  }), t = t.map((d) => new P(d)), a === "lrgb")
    return rn(t, e);
  const n = t.shift(), l = n.get(a), i = [];
  let s = 0, u = 0;
  for (let d = 0; d < l.length; d++)
    if (l[d] = (l[d] || 0) * e[0], i.push(isNaN(l[d]) ? 0 : e[0]), a.charAt(d) === "h" && !isNaN(l[d])) {
      const f = l[d] / 180 * Kt;
      s += Ma(f) * e[0], u += _a(f) * e[0];
    }
  let y = n.alpha() * e[0];
  t.forEach((d, f) => {
    const h = d.get(a);
    y += d.alpha() * e[f + 1];
    for (let c = 0; c < l.length; c++)
      if (!isNaN(h[c]))
        if (i[c] += e[f + 1], a.charAt(c) === "h") {
          const m = h[c] / 180 * Kt;
          s += Ma(m) * e[f + 1], u += _a(m) * e[f + 1];
        } else
          l[c] += h[c] * e[f + 1];
  });
  for (let d = 0; d < l.length; d++)
    if (a.charAt(d) === "h") {
      let f = an(u / i[d], s / i[d]) / Kt * 180;
      for (; f < 0; ) f += 360;
      for (; f >= 360; ) f -= 360;
      l[d] = f;
    } else
      l[d] = l[d] / i[d];
  return y /= o, new P(l, a).alpha(y > 0.99999 ? 1 : y, !0);
}, rn = (t, a) => {
  const e = t.length, o = [0, 0, 0, 0];
  for (let r = 0; r < t.length; r++) {
    const n = t[r], l = a[r] / e, i = n._rgb;
    o[0] += qt(i[0], 2) * l, o[1] += qt(i[1], 2) * l, o[2] += qt(i[2], 2) * l, o[3] += i[3] * l;
  }
  return o[0] = Jt(o[0]), o[1] = Jt(o[1]), o[2] = Jt(o[2]), o[3] > 0.9999999 && (o[3] = 1), new P(ca(o));
}, { pow: nn } = Math;
function At(t) {
  let a = "rgb", e = Y("#ccc"), o = 0, r = [0, 1], n = [], l = [0, 0], i = !1, s = [], u = !1, y = 0, d = 1, f = !1, h = {}, c = !0, m = 1;
  const v = function(p) {
    if (p = p || ["#fff", "#000"], p && te(p) === "string" && Y.brewer && Y.brewer[p.toLowerCase()] && (p = Y.brewer[p.toLowerCase()]), te(p) === "array") {
      p.length === 1 && (p = [p[0], p[0]]), p = p.slice(0);
      for (let B = 0; B < p.length; B++)
        p[B] = Y(p[B]);
      n.length = 0;
      for (let B = 0; B < p.length; B++)
        n.push(B / (p.length - 1));
    }
    return I(), s = p;
  }, C = function(p) {
    if (i != null) {
      const B = i.length - 1;
      let T = 0;
      for (; T < B && p >= i[T]; )
        T++;
      return T - 1;
    }
    return 0;
  };
  let x = (p) => p, $ = (p) => p;
  const M = function(p, B) {
    let T, F;
    if (B == null && (B = !1), isNaN(p) || p === null)
      return e;
    B ? F = p : i && i.length > 2 ? F = C(p) / (i.length - 2) : d !== y ? F = (p - y) / (d - y) : F = 1, F = $(F), B || (F = x(F)), m !== 1 && (F = nn(F, m)), F = l[0] + F * (1 - l[0] - l[1]), F = Je(F, 0, 1);
    const G = Math.floor(F * 1e4);
    if (c && h[G])
      T = h[G];
    else {
      if (te(s) === "array")
        for (let j = 0; j < n.length; j++) {
          const U = n[j];
          if (F <= U) {
            T = s[j];
            break;
          }
          if (F >= U && j === n.length - 1) {
            T = s[j];
            break;
          }
          if (F > U && F < n[j + 1]) {
            F = (F - U) / (n[j + 1] - U), T = Y.interpolate(
              s[j],
              s[j + 1],
              F,
              a
            );
            break;
          }
        }
      else te(s) === "function" && (T = s(F));
      c && (h[G] = T);
    }
    return T;
  };
  var I = () => h = {};
  v(t);
  const L = function(p) {
    const B = Y(M(p));
    return u && B[u] ? B[u]() : B;
  };
  return L.classes = function(p) {
    if (p != null) {
      if (te(p) === "array")
        i = p, r = [p[0], p[p.length - 1]];
      else {
        const B = Y.analyze(r);
        p === 0 ? i = [B.min, B.max] : i = Y.limits(B, "e", p);
      }
      return L;
    }
    return i;
  }, L.domain = function(p) {
    if (!arguments.length)
      return r;
    y = p[0], d = p[p.length - 1], n = [];
    const B = s.length;
    if (p.length === B && y !== d)
      for (let T of Array.from(p))
        n.push((T - y) / (d - y));
    else {
      for (let T = 0; T < B; T++)
        n.push(T / (B - 1));
      if (p.length > 2) {
        const T = p.map((G, j) => j / (p.length - 1)), F = p.map((G) => (G - y) / (d - y));
        F.every((G, j) => T[j] === G) || ($ = (G) => {
          if (G <= 0 || G >= 1) return G;
          let j = 0;
          for (; G >= F[j + 1]; ) j++;
          const U = (G - F[j]) / (F[j + 1] - F[j]);
          return T[j] + U * (T[j + 1] - T[j]);
        });
      }
    }
    return r = [y, d], L;
  }, L.mode = function(p) {
    return arguments.length ? (a = p, I(), L) : a;
  }, L.range = function(p, B) {
    return v(p), L;
  }, L.out = function(p) {
    return u = p, L;
  }, L.spread = function(p) {
    return arguments.length ? (o = p, L) : o;
  }, L.correctLightness = function(p) {
    return p == null && (p = !0), f = p, I(), f ? x = function(B) {
      const T = M(0, !0).lab()[0], F = M(1, !0).lab()[0], G = T > F;
      let j = M(B, !0).lab()[0];
      const U = T + (F - T) * B;
      let le = j - U, be = 0, Pe = 1, Se = 20;
      for (; Math.abs(le) > 0.01 && Se-- > 0; )
        (function() {
          return G && (le *= -1), le < 0 ? (be = B, B += (Pe - B) * 0.5) : (Pe = B, B += (be - B) * 0.5), j = M(B, !0).lab()[0], le = j - U;
        })();
      return B;
    } : x = (B) => B, L;
  }, L.padding = function(p) {
    return p != null ? (te(p) === "number" && (p = [p, p]), l = p, L) : l;
  }, L.colors = function(p, B) {
    arguments.length < 2 && (B = "hex");
    let T = [];
    if (arguments.length === 0)
      T = s.slice(0);
    else if (p === 1)
      T = [L(0.5)];
    else if (p > 1) {
      const F = r[0], G = r[1] - F;
      T = ln(0, p).map(
        (j) => L(F + j / (p - 1) * G)
      );
    } else {
      t = [];
      let F = [];
      if (i && i.length > 2)
        for (let G = 1, j = i.length, U = 1 <= j; U ? G < j : G > j; U ? G++ : G--)
          F.push((i[G - 1] + i[G]) * 0.5);
      else
        F = r;
      T = F.map((G) => L(G));
    }
    return Y[B] && (T = T.map((F) => F[B]())), T;
  }, L.cache = function(p) {
    return p != null ? (c = p, L) : c;
  }, L.gamma = function(p) {
    return p != null ? (m = p, L) : m;
  }, L.nodata = function(p) {
    return p != null ? (e = Y(p), L) : e;
  }, L;
}
function ln(t, a, e) {
  let o = [], r = t < a, n = a;
  for (let l = t; r ? l < n : l > n; r ? l++ : l--)
    o.push(l);
  return o;
}
const sn = function(t) {
  let a = [1, 1];
  for (let e = 1; e < t; e++) {
    let o = [1];
    for (let r = 1; r <= a.length; r++)
      o[r] = (a[r] || 0) + a[r - 1];
    a = o;
  }
  return a;
}, cn = function(t) {
  let a, e, o, r;
  if (t = t.map((n) => new P(n)), t.length === 2)
    [e, o] = t.map((n) => n.lab()), a = function(n) {
      const l = [0, 1, 2].map((i) => e[i] + n * (o[i] - e[i]));
      return new P(l, "lab");
    };
  else if (t.length === 3)
    [e, o, r] = t.map((n) => n.lab()), a = function(n) {
      const l = [0, 1, 2].map(
        (i) => (1 - n) * (1 - n) * e[i] + 2 * (1 - n) * n * o[i] + n * n * r[i]
      );
      return new P(l, "lab");
    };
  else if (t.length === 4) {
    let n;
    [e, o, r, n] = t.map((l) => l.lab()), a = function(l) {
      const i = [0, 1, 2].map(
        (s) => (1 - l) * (1 - l) * (1 - l) * e[s] + 3 * (1 - l) * (1 - l) * l * o[s] + 3 * (1 - l) * l * l * r[s] + l * l * l * n[s]
      );
      return new P(i, "lab");
    };
  } else if (t.length >= 5) {
    let n, l, i;
    n = t.map((s) => s.lab()), i = t.length - 1, l = sn(i), a = function(s) {
      const u = 1 - s, y = [0, 1, 2].map(
        (d) => n.reduce(
          (f, h, c) => f + l[c] * u ** (i - c) * s ** c * h[d],
          0
        )
      );
      return new P(y, "lab");
    };
  } else
    throw new RangeError("No point in running bezier with only one color.");
  return a;
}, un = (t) => {
  const a = cn(t);
  return a.scale = () => At(a), a;
}, Fe = (t, a, e) => {
  if (!Fe[e])
    throw new Error("unknown blend mode " + e);
  return Fe[e](t, a);
}, Ne = (t) => (a, e) => {
  const o = Y(e).rgb(), r = Y(a).rgb();
  return Y.rgb(t(o, r));
}, Ge = (t) => (a, e) => {
  const o = [];
  return o[0] = t(a[0], e[0]), o[1] = t(a[1], e[1]), o[2] = t(a[2], e[2]), o;
}, fn = (t) => t, dn = (t, a) => t * a / 255, hn = (t, a) => t > a ? a : t, pn = (t, a) => t > a ? t : a, mn = (t, a) => 255 * (1 - (1 - t / 255) * (1 - a / 255)), bn = (t, a) => a < 128 ? 2 * t * a / 255 : 255 * (1 - 2 * (1 - t / 255) * (1 - a / 255)), gn = (t, a) => 255 * (1 - (1 - a / 255) / (t / 255)), yn = (t, a) => t === 255 ? 255 : (t = 255 * (a / 255) / (1 - t / 255), t > 255 ? 255 : t);
Fe.normal = Ne(Ge(fn));
Fe.multiply = Ne(Ge(dn));
Fe.screen = Ne(Ge(mn));
Fe.overlay = Ne(Ge(bn));
Fe.darken = Ne(Ge(hn));
Fe.lighten = Ne(Ge(pn));
Fe.dodge = Ne(Ge(yn));
Fe.burn = Ne(Ge(gn));
const { pow: vn, sin: xn, cos: wn } = Math;
function Cn(t = 300, a = -1.5, e = 1, o = 1, r = [0, 1]) {
  let n = 0, l;
  te(r) === "array" ? l = r[1] - r[0] : (l = 0, r = [r, r]);
  const i = function(s) {
    const u = Ee * ((t + 120) / 360 + a * s), y = vn(r[0] + l * s, o), f = (n !== 0 ? e[0] + s * n : e) * y * (1 - y) / 2, h = wn(u), c = xn(u), m = y + f * (-0.14861 * h + 1.78277 * c), v = y + f * (-0.29227 * h - 0.90649 * c), C = y + f * (1.97294 * h);
    return Y(ca([m * 255, v * 255, C * 255, 1]));
  };
  return i.start = function(s) {
    return s == null ? t : (t = s, i);
  }, i.rotations = function(s) {
    return s == null ? a : (a = s, i);
  }, i.gamma = function(s) {
    return s == null ? o : (o = s, i);
  }, i.hue = function(s) {
    return s == null ? e : (e = s, te(e) === "array" ? (n = e[1] - e[0], n === 0 && (e = e[1])) : n = 0, i);
  }, i.lightness = function(s) {
    return s == null ? r : (te(s) === "array" ? (r = s, l = s[1] - s[0]) : (r = [s, s], l = 0), i);
  }, i.scale = () => Y.scale(i), i.hue(e), i;
}
const kn = "0123456789abcdef", { floor: An, random: Sn } = Math, Tn = () => {
  let t = "#";
  for (let a = 0; a < 6; a++)
    t += kn.charAt(An(Sn() * 16));
  return new P(t, "hex");
}, { log: Ba, pow: Mn, floor: _n, abs: Bn } = Math;
function Co(t, a = null) {
  const e = {
    min: Number.MAX_VALUE,
    max: Number.MAX_VALUE * -1,
    sum: 0,
    values: [],
    count: 0
  };
  return te(t) === "object" && (t = Object.values(t)), t.forEach((o) => {
    a && te(o) === "object" && (o = o[a]), o != null && !isNaN(o) && (e.values.push(o), e.sum += o, o < e.min && (e.min = o), o > e.max && (e.max = o), e.count += 1);
  }), e.domain = [e.min, e.max], e.limits = (o, r) => ko(e, o, r), e;
}
function ko(t, a = "equal", e = 7) {
  te(t) == "array" && (t = Co(t));
  const { min: o, max: r } = t, n = t.values.sort((i, s) => i - s);
  if (e === 1)
    return [o, r];
  const l = [];
  if (a.substr(0, 1) === "c" && (l.push(o), l.push(r)), a.substr(0, 1) === "e") {
    l.push(o);
    for (let i = 1; i < e; i++)
      l.push(o + i / e * (r - o));
    l.push(r);
  } else if (a.substr(0, 1) === "l") {
    if (o <= 0)
      throw new Error(
        "Logarithmic scales are only possible for values > 0"
      );
    const i = Math.LOG10E * Ba(o), s = Math.LOG10E * Ba(r);
    l.push(o);
    for (let u = 1; u < e; u++)
      l.push(Mn(10, i + u / e * (s - i)));
    l.push(r);
  } else if (a.substr(0, 1) === "q") {
    l.push(o);
    for (let i = 1; i < e; i++) {
      const s = (n.length - 1) * i / e, u = _n(s);
      if (u === s)
        l.push(n[u]);
      else {
        const y = s - u;
        l.push(n[u] * (1 - y) + n[u + 1] * y);
      }
    }
    l.push(r);
  } else if (a.substr(0, 1) === "k") {
    let i;
    const s = n.length, u = new Array(s), y = new Array(e);
    let d = !0, f = 0, h = null;
    h = [], h.push(o);
    for (let v = 1; v < e; v++)
      h.push(o + v / e * (r - o));
    for (h.push(r); d; ) {
      for (let C = 0; C < e; C++)
        y[C] = 0;
      for (let C = 0; C < s; C++) {
        const x = n[C];
        let $ = Number.MAX_VALUE, M;
        for (let I = 0; I < e; I++) {
          const L = Bn(h[I] - x);
          L < $ && ($ = L, M = I), y[M]++, u[C] = M;
        }
      }
      const v = new Array(e);
      for (let C = 0; C < e; C++)
        v[C] = null;
      for (let C = 0; C < s; C++)
        i = u[C], v[i] === null ? v[i] = n[C] : v[i] += n[C];
      for (let C = 0; C < e; C++)
        v[C] *= 1 / y[C];
      d = !1;
      for (let C = 0; C < e; C++)
        if (v[C] !== h[C]) {
          d = !0;
          break;
        }
      h = v, f++, f > 200 && (d = !1);
    }
    const c = {};
    for (let v = 0; v < e; v++)
      c[v] = [];
    for (let v = 0; v < s; v++)
      i = u[v], c[i].push(n[v]);
    let m = [];
    for (let v = 0; v < e; v++)
      m.push(c[v][0]), m.push(c[v][c[v].length - 1]);
    m = m.sort((v, C) => v - C), l.push(m[0]);
    for (let v = 1; v < m.length; v += 2) {
      const C = m[v];
      !isNaN(C) && l.indexOf(C) === -1 && l.push(C);
    }
  }
  return l;
}
const $n = (t, a) => {
  t = new P(t), a = new P(a);
  const e = t.luminance(), o = a.luminance();
  return e > o ? (e + 0.05) / (o + 0.05) : (o + 0.05) / (e + 0.05);
}, { sqrt: ze, pow: pe, min: On, max: Fn, atan2: $a, abs: Oa, cos: vt, sin: Fa, exp: Ln, PI: La } = Math;
function In(t, a, e = 1, o = 1, r = 1) {
  var n = function(We) {
    return 360 * We / (2 * La);
  }, l = function(We) {
    return 2 * La * We / 360;
  };
  t = new P(t), a = new P(a);
  const [i, s, u] = Array.from(t.lab()), [y, d, f] = Array.from(a.lab()), h = (i + y) / 2, c = ze(pe(s, 2) + pe(u, 2)), m = ze(pe(d, 2) + pe(f, 2)), v = (c + m) / 2, C = 0.5 * (1 - ze(pe(v, 7) / (pe(v, 7) + pe(25, 7)))), x = s * (1 + C), $ = d * (1 + C), M = ze(pe(x, 2) + pe(u, 2)), I = ze(pe($, 2) + pe(f, 2)), L = (M + I) / 2, p = n($a(u, x)), B = n($a(f, $)), T = p >= 0 ? p : p + 360, F = B >= 0 ? B : B + 360, G = Oa(T - F) > 180 ? (T + F + 360) / 2 : (T + F) / 2, j = 1 - 0.17 * vt(l(G - 30)) + 0.24 * vt(l(2 * G)) + 0.32 * vt(l(3 * G + 6)) - 0.2 * vt(l(4 * G - 63));
  let U = F - T;
  U = Oa(U) <= 180 ? U : F <= T ? U + 360 : U - 360, U = 2 * ze(M * I) * Fa(l(U) / 2);
  const le = y - i, be = I - M, Pe = 1 + 0.015 * pe(h - 50, 2) / ze(20 + pe(h - 50, 2)), Se = 1 + 0.045 * L, _e = 1 + 0.015 * L * j, ht = 30 * Ln(-pe((G - 275) / 25, 2)), pt = -(2 * ze(pe(L, 7) / (pe(L, 7) + pe(25, 7)))) * Fa(2 * l(ht)), mt = ze(
    pe(le / (e * Pe), 2) + pe(be / (o * Se), 2) + pe(U / (r * _e), 2) + pt * (be / (o * Se)) * (U / (r * _e))
  );
  return Fn(0, On(100, mt));
}
function zn(t, a, e = "lab") {
  t = new P(t), a = new P(a);
  const o = t.get(e), r = a.get(e);
  let n = 0;
  for (let l in o) {
    const i = (o[l] || 0) - (r[l] || 0);
    n += i * i;
  }
  return Math.sqrt(n);
}
const En = (...t) => {
  try {
    return new P(...t), !0;
  } catch {
    return !1;
  }
}, Pn = {
  cool() {
    return At([Y.hsl(180, 1, 0.9), Y.hsl(250, 0.7, 0.4)]);
  },
  hot() {
    return At(["#000", "#f00", "#ff0", "#fff"]).mode(
      "rgb"
    );
  }
}, Ct = {
  // sequential
  OrRd: ["#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#7f0000"],
  PuBu: ["#fff7fb", "#ece7f2", "#d0d1e6", "#a6bddb", "#74a9cf", "#3690c0", "#0570b0", "#045a8d", "#023858"],
  BuPu: ["#f7fcfd", "#e0ecf4", "#bfd3e6", "#9ebcda", "#8c96c6", "#8c6bb1", "#88419d", "#810f7c", "#4d004b"],
  Oranges: ["#fff5eb", "#fee6ce", "#fdd0a2", "#fdae6b", "#fd8d3c", "#f16913", "#d94801", "#a63603", "#7f2704"],
  BuGn: ["#f7fcfd", "#e5f5f9", "#ccece6", "#99d8c9", "#66c2a4", "#41ae76", "#238b45", "#006d2c", "#00441b"],
  YlOrBr: ["#ffffe5", "#fff7bc", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#993404", "#662506"],
  YlGn: ["#ffffe5", "#f7fcb9", "#d9f0a3", "#addd8e", "#78c679", "#41ab5d", "#238443", "#006837", "#004529"],
  Reds: ["#fff5f0", "#fee0d2", "#fcbba1", "#fc9272", "#fb6a4a", "#ef3b2c", "#cb181d", "#a50f15", "#67000d"],
  RdPu: ["#fff7f3", "#fde0dd", "#fcc5c0", "#fa9fb5", "#f768a1", "#dd3497", "#ae017e", "#7a0177", "#49006a"],
  Greens: ["#f7fcf5", "#e5f5e0", "#c7e9c0", "#a1d99b", "#74c476", "#41ab5d", "#238b45", "#006d2c", "#00441b"],
  YlGnBu: ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"],
  Purples: ["#fcfbfd", "#efedf5", "#dadaeb", "#bcbddc", "#9e9ac8", "#807dba", "#6a51a3", "#54278f", "#3f007d"],
  GnBu: ["#f7fcf0", "#e0f3db", "#ccebc5", "#a8ddb5", "#7bccc4", "#4eb3d3", "#2b8cbe", "#0868ac", "#084081"],
  Greys: ["#ffffff", "#f0f0f0", "#d9d9d9", "#bdbdbd", "#969696", "#737373", "#525252", "#252525", "#000000"],
  YlOrRd: ["#ffffcc", "#ffeda0", "#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#bd0026", "#800026"],
  PuRd: ["#f7f4f9", "#e7e1ef", "#d4b9da", "#c994c7", "#df65b0", "#e7298a", "#ce1256", "#980043", "#67001f"],
  Blues: ["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#08519c", "#08306b"],
  PuBuGn: ["#fff7fb", "#ece2f0", "#d0d1e6", "#a6bddb", "#67a9cf", "#3690c0", "#02818a", "#016c59", "#014636"],
  Viridis: ["#440154", "#482777", "#3f4a8a", "#31678e", "#26838f", "#1f9d8a", "#6cce5a", "#b6de2b", "#fee825"],
  // diverging
  Spectral: ["#9e0142", "#d53e4f", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#e6f598", "#abdda4", "#66c2a5", "#3288bd", "#5e4fa2"],
  RdYlGn: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850", "#006837"],
  RdBu: ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#f7f7f7", "#d1e5f0", "#92c5de", "#4393c3", "#2166ac", "#053061"],
  PiYG: ["#8e0152", "#c51b7d", "#de77ae", "#f1b6da", "#fde0ef", "#f7f7f7", "#e6f5d0", "#b8e186", "#7fbc41", "#4d9221", "#276419"],
  PRGn: ["#40004b", "#762a83", "#9970ab", "#c2a5cf", "#e7d4e8", "#f7f7f7", "#d9f0d3", "#a6dba0", "#5aae61", "#1b7837", "#00441b"],
  RdYlBu: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee090", "#ffffbf", "#e0f3f8", "#abd9e9", "#74add1", "#4575b4", "#313695"],
  BrBG: ["#543005", "#8c510a", "#bf812d", "#dfc27d", "#f6e8c3", "#f5f5f5", "#c7eae5", "#80cdc1", "#35978f", "#01665e", "#003c30"],
  RdGy: ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#ffffff", "#e0e0e0", "#bababa", "#878787", "#4d4d4d", "#1a1a1a"],
  PuOr: ["#7f3b08", "#b35806", "#e08214", "#fdb863", "#fee0b6", "#f7f7f7", "#d8daeb", "#b2abd2", "#8073ac", "#542788", "#2d004b"],
  // qualitative
  Set2: ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494", "#b3b3b3"],
  Accent: ["#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0", "#f0027f", "#bf5b17", "#666666"],
  Set1: ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33", "#a65628", "#f781bf", "#999999"],
  Set3: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f"],
  Dark2: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d", "#666666"],
  Paired: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a", "#ffff99", "#b15928"],
  Pastel2: ["#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4", "#e6f5c9", "#fff2ae", "#f1e2cc", "#cccccc"],
  Pastel1: ["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6", "#ffffcc", "#e5d8bd", "#fddaec", "#f2f2f2"]
};
for (let t of Object.keys(Ct))
  Ct[t.toLowerCase()] = Ct[t];
Object.assign(Y, {
  average: on,
  bezier: un,
  blend: Fe,
  cubehelix: Cn,
  mix: st,
  interpolate: st,
  random: Tn,
  scale: At,
  analyze: Co,
  contrast: $n,
  deltaE: In,
  distance: zn,
  limits: ko,
  valid: En,
  scales: Pn,
  input: q,
  colors: Ze,
  brewer: Ct
});
function Dn(t) {
  return Array.isArray(t) && (t.length === 1 || t.length === 2) && t.every((a) => typeof a == "string");
}
function Ia(t) {
  if (t)
    try {
      if (!Y.valid(t))
        return t;
      const a = Y(t);
      if (a.luminance() < 0.3)
        return a.brighten(0.5).hex();
      const o = a.hsl(), [r, n, l] = o, i = 1 - l, s = Math.min(n * 0.9, 1);
      return Y.hsl(r || 0, s, i).hex();
    } catch {
      return t;
    }
}
function Ao(t, a) {
  const e = Ka();
  if (typeof t == "string") {
    const o = e.light.colors[t.trim()], r = e.dark.colors[t.trim()];
    if (a === "light")
      return o ?? t;
    if (a === "dark")
      return r ?? Ia(o ?? t) ?? t;
  }
  if (Dn(t)) {
    const [o, r] = t, n = e.light.colors[o.trim()], l = r ? e.dark.colors[r.trim()] ?? r : void 0;
    if (a === "light")
      return n ?? o;
    if (a === "dark")
      return l ?? Ia(n ?? o) ?? r;
  }
}
function Rn(t, a) {
  if (t)
    return Object.fromEntries(
      Object.entries(t).map(([e, o]) => [
        e,
        Ao(o, a)
      ])
    );
}
function Nn(t, a) {
  if (typeof t == "string")
    return a.colorPalettes[t.trim()];
  if (Array.isArray(t))
    return t.map((e) => typeof e == "string" ? a.colors[e.trim()] ?? e : String(e));
}
function Gn(t, a) {
  if (typeof t == "string") {
    const e = a.colorScales[t.trim()];
    if (e) return e;
    const o = a.colors[t.trim()];
    return o ? [a.colors["base-100"], o] : Y.valid(t) ? [a.colors["base-100"], t] : void 0;
  }
  if (Array.isArray(t))
    return t.map((e) => typeof e == "string" ? a.colors[e.trim()] ?? e : String(e));
}
function jl(t, a, e = 10) {
  return Y.scale([t, a]).mode("lch").colors(e);
}
function Hl(t) {
  return Y.valid(t) ? Y(t).luminance() > 0.5 ? "#000000" : "#ffffff" : "#000000";
}
function Vl(t, a) {
  return Y.valid(t) ? Y(t).alpha(a).css() : t;
}
const Wl = {
  default: [
    "#236aa4",
    "#45a1bf",
    "#a5cdee",
    "#8dacbf",
    "#85c7c6",
    "#d2c6ac",
    "#f4b548",
    "#8f3d56",
    "#71b9f4",
    "#46a485"
  ],
  categorical: [
    "#3366cc",
    "#dc3912",
    "#ff9900",
    "#109618",
    "#990099",
    "#0099c6",
    "#dd4477",
    "#66aa00",
    "#b82e2e",
    "#316395"
  ],
  pastel: [
    "#a6cee3",
    "#b2df8a",
    "#fdbf6f",
    "#cab2d6",
    "#fb9a99",
    "#ffff99",
    "#1f78b4",
    "#33a02c",
    "#e31a1c"
  ],
  vivid: [
    "#e41a1c",
    "#377eb8",
    "#4daf4a",
    "#984ea3",
    "#ff7f00",
    "#ffff33",
    "#a65628",
    "#f781bf",
    "#999999"
  ],
  cool: [
    "#313695",
    "#4575b4",
    "#74add1",
    "#abd9e9",
    "#e0f3f8",
    "#fee090",
    "#fdae61",
    "#f46d43",
    "#d73027"
  ],
  warm: [
    "#b35806",
    "#e08214",
    "#fdb863",
    "#fee0b6",
    "#f7f7f7",
    "#d8daeb",
    "#b2abd2",
    "#8073ac",
    "#542788"
  ]
}, Ul = {
  default: ["#ADD8E6", "#00008B"],
  blue: ["#ADD8E6", "#00008B"],
  green: ["#90EE90", "#006400"],
  red: ["#FFB6C1", "#8B0000"],
  orange: ["#FFDAB9", "#FF4500"],
  purple: ["#E6E6FA", "#4B0082"],
  grey: ["#ffffff", "#000000"],
  blueGreen: ["#f7fcf0", "#00441b"],
  yellowGreen: ["#ffffe5", "#004529"],
  yellowOrangeRed: ["#ffffcc", "#800026"],
  redPurple: ["#fff7f3", "#49006a"],
  purpleBlue: ["#fff7fb", "#023858"],
  diverging: ["#d73027", "#f7f7f7", "#1a9850"]
};
var ha = { exports: {} };
function So(t, a = 100, e = {}) {
  if (typeof t != "function")
    throw new TypeError(`Expected the first parameter to be a function, got \`${typeof t}\`.`);
  if (a < 0)
    throw new RangeError("`wait` must not be negative.");
  const { immediate: o } = typeof e == "boolean" ? { immediate: e } : e;
  let r, n, l, i, s;
  function u() {
    const f = r, h = n;
    return r = void 0, n = void 0, s = t.apply(f, h), s;
  }
  function y() {
    const f = Date.now() - i;
    f < a && f >= 0 ? l = setTimeout(y, a - f) : (l = void 0, o || (s = u()));
  }
  const d = function(...f) {
    if (r && this !== r && Object.getPrototypeOf(this) === Object.getPrototypeOf(r))
      throw new Error("Debounced method called with different contexts of the same prototype.");
    r = this, n = f, i = Date.now();
    const h = o && !l;
    return l || (l = setTimeout(y, a)), h && (s = u()), s;
  };
  return Object.defineProperty(d, "isPending", {
    get() {
      return l !== void 0;
    }
  }), d.clear = () => {
    l && (clearTimeout(l), l = void 0);
  }, d.flush = () => {
    l && d.trigger();
  }, d.trigger = () => {
    s = u(), d.clear();
  }, d;
}
ha.exports.debounce = So;
ha.exports = So;
var jn = ha.exports;
const To = /* @__PURE__ */ ta(jn), Hn = 500;
let za = !1;
function Vn() {
  za || (ke.registerTheme("light", ia), ke.registerTheme("dark", sa), za = !0);
}
function Ea(t) {
  return ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"].includes(
    navigator.platform
  ) && t.clientWidth * 3 * t.clientHeight * 3 > 16777215;
}
function Yl(t = {}) {
  const {
    theme: a = "light",
    renderer: e = "canvas",
    connectGroup: o,
    animationDuration: r = Hn,
    autoResize: n = !0,
    resizeDebounce: l = 100
  } = t, i = Ha(null), s = ie(null);
  let u = null;
  const y = () => typeof a == "string" ? a : a.value;
  Vn();
  const d = (x) => {
    const $ = x || s.value;
    if (!$)
      return console.warn("useECharts: No container element provided"), null;
    i.value && i.value.dispose();
    const M = Ea($) ? "svg" : e, I = ke.init($, y(), {
      renderer: M
    });
    return i.value = I, o && (I.group = o, ke.connect(o)), I;
  }, f = (x, $ = !1) => {
    if (!i.value) {
      console.warn("useECharts: Chart not initialized");
      return;
    }
    i.value.setOption(
      {
        ...x,
        animationDuration: r,
        animationDurationUpdate: r
      },
      $
    );
  }, h = () => {
    i.value && i.value.resize({
      animation: {
        duration: r
      }
    });
  }, c = () => {
    u && (u.disconnect(), u = null), i.value && (i.value.dispose(), i.value = null);
  }, m = (x) => {
    if (i.value)
      return i.value.getConnectedDataURL({
        type: (x == null ? void 0 : x.type) || "png",
        pixelRatio: (x == null ? void 0 : x.pixelRatio) || 3,
        backgroundColor: (x == null ? void 0 : x.backgroundColor) || "#ffffff",
        excludeComponents: (x == null ? void 0 : x.excludeComponents) || ["toolbox"]
      });
  }, v = () => !i.value || i.value.isDisposed(), C = To(h, l);
  return Re(() => {
    if (n && s.value) {
      const x = s.value.parentElement;
      window.ResizeObserver && x ? (u = new ResizeObserver(C), u.observe(x)) : window.addEventListener("resize", C);
    }
  }), et(() => {
    u ? u.disconnect() : window.removeEventListener("resize", C), c();
  }), typeof a != "string" && De(a, (x) => {
    if (i.value && s.value) {
      i.value.dispose();
      const $ = ke.init(s.value, x, {
        renderer: Ea(s.value) ? "svg" : e
      });
      i.value = $;
    }
  }), {
    chartInstance: i,
    containerRef: s,
    init: d,
    setOption: f,
    resize: h,
    dispose: c,
    getDataURL: m,
    isDisposed: v
  };
}
function Wn(t, a) {
  if (!a) return;
  const e = t.getOption();
  if (!e || !e.series) return;
  const r = e.series.map((n) => n.name && a[n.name] ? {
    ...n,
    itemStyle: {
      ...n.itemStyle,
      color: a[n.name]
    }
  } : n);
  t.setOption({ series: r });
}
function Un(t, a) {
  a && t.setOption(a);
}
function Yn(t, a, e) {
  if (!a) return;
  const o = e.series;
  if (!o) return;
  const r = o.reduce(
    (l, { seriesType: i }, s) => ((i === "reference_line" || i === "reference_area" || i === "reference_point") && l.push(s), l),
    []
  ), n = o.map((l, i) => r.includes(i) ? {} : { ...a });
  t.setOption({ series: n });
}
function Xl() {
  return {
    formatValue: (l, i, s) => typeof i == "string" ? K(l, de(i), s) : K(l, i, s),
    formatAxisValue: (l, i, s) => typeof i == "string" ? qe(l, de(i), s) : qe(l, i, s),
    getFormat: (l, i) => de(l, i),
    formatTitle: (l, i) => Le(l, i),
    fmt: (l, i) => tr(l, i),
    setCustomFormats: Xo,
    getCustomFormats: qo,
    getBuiltInFormats: () => ra,
    lookupColumnFormat: qa,
    applyTitleTagReplacement: Ja,
    formatExample: er,
    inferValueType: Jo
  };
}
function ql(t, a) {
  const e = O(() => typeof t == "string" ? de(t) : t);
  return {
    format: e,
    formatValue: (n) => K(n, e.value, a),
    formatAxisValue: (n) => qe(n, e.value, a)
  };
}
const Xn = Symbol("chartProps"), qn = Symbol("chartConfig"), pa = Symbol("themeStores"), Jl = Symbol("echartsInstance"), _t = Symbol("seriesConfig");
function Jn() {
  return typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function Mo(t = {}) {
  const {
    defaultAppearance: a = "system",
    syncWithSystem: e = !0,
    storageKey: o = "vue-echarts-theme"
  } = t, r = ie(Jn()), n = ie(a);
  Re(() => {
    if (typeof window < "u" && o) {
      const c = localStorage.getItem(o);
      c && ["system", "light", "dark"].includes(c) && (n.value = c);
    }
    if (e && typeof window < "u" && window.matchMedia) {
      const c = window.matchMedia("(prefers-color-scheme: dark)"), m = (v) => {
        r.value = v.matches ? "dark" : "light";
      };
      c.addEventListener("change", m), et(() => {
        c.removeEventListener("change", m);
      });
    }
  }), De(n, (c) => {
    typeof window < "u" && o && localStorage.setItem(o, c);
  });
  const l = O(() => n.value === "system" ? r.value : n.value), i = O(() => Ka()[l.value]);
  return {
    systemTheme: r,
    selectedAppearance: n,
    activeAppearance: l,
    theme: i,
    setAppearance: (c) => {
      n.value = c;
    },
    cycleAppearance: () => {
      const c = ["system", "light", "dark"], m = c.indexOf(n.value);
      n.value = c[(m + 1) % c.length];
    },
    resolveColor: (c) => O(() => Ao(c, l.value)),
    resolveColorsObject: (c) => O(() => Rn(c, l.value)),
    resolveColorPalette: (c) => O(() => Nn(c, i.value)),
    resolveColorScale: (c) => O(() => Gn(c, i.value)),
    configureThemes: ar
  };
}
function Kn(t) {
  const a = {
    activeAppearance: t.activeAppearance,
    selectedAppearance: t.selectedAppearance,
    theme: t.theme,
    setAppearance: t.setAppearance,
    cycleAppearance: t.cycleAppearance,
    resolveColor: t.resolveColor,
    resolveColorsObject: t.resolveColorsObject,
    resolveColorPalette: t.resolveColorPalette,
    resolveColorScale: t.resolveColorScale
  };
  xt(pa, a);
}
function Kl() {
  return ut(pa);
}
function me(t) {
  const a = ut(pa, void 0);
  if (a)
    return a;
  const e = Mo(t);
  return {
    activeAppearance: e.activeAppearance,
    selectedAppearance: e.selectedAppearance,
    theme: e.theme,
    setAppearance: e.setAppearance,
    cycleAppearance: e.cycleAppearance,
    resolveColor: e.resolveColor,
    resolveColorsObject: e.resolveColorsObject,
    resolveColorPalette: e.resolveColorPalette,
    resolveColorScale: e.resolveColorScale
  };
}
var _o = { exports: {} };
(function(t, a) {
  (function(e, o) {
    t.exports = o();
  })(zo, function() {
    return function e(o, r, n) {
      var l = window, i = "application/octet-stream", s = n || i, u = o, y = !r && !n && u, d = document.createElement("a"), f = function(p) {
        return String(p);
      }, h = l.Blob || l.MozBlob || l.WebKitBlob || f, c = r || "download", m, v;
      if (h = h.call ? h.bind(l) : Blob, String(this) === "true" && (u = [u, s], s = u[0], u = u[1]), y && y.length < 2048 && (c = y.split("/").pop().split("?")[0], d.href = y, d.href.indexOf(y) !== -1)) {
        var C = new XMLHttpRequest();
        return C.open("GET", y, !0), C.responseType = "blob", C.onload = function(p) {
          e(p.target.response, c, i);
        }, setTimeout(function() {
          C.send();
        }, 0), C;
      }
      if (/^data:([\w+-]+\/[\w+.-]+)?[,;]/.test(u))
        if (u.length > 1024 * 1024 * 1.999 && h !== f)
          u = I(u), s = u.type || i;
        else
          return navigator.msSaveBlob ? (
            // IE10 can't do a[download], only Blobs:
            navigator.msSaveBlob(I(u), c)
          ) : L(u);
      else if (/([\x80-\xff])/.test(u)) {
        var x = 0, $ = new Uint8Array(u.length), M = $.length;
        for (x; x < M; ++x) $[x] = u.charCodeAt(x);
        u = new h([$], { type: s });
      }
      m = u instanceof h ? u : new h([u], { type: s });
      function I(p) {
        var B = p.split(/[:;,]/), T = B[1], F = B[2] == "base64" ? atob : decodeURIComponent, G = F(B.pop()), j = G.length, U = 0, le = new Uint8Array(j);
        for (U; U < j; ++U) le[U] = G.charCodeAt(U);
        return new h([le], { type: T });
      }
      function L(p, B) {
        if ("download" in d)
          return d.href = p, d.setAttribute("download", c), d.className = "download-js-link", d.innerHTML = "downloading...", d.style.display = "none", document.body.appendChild(d), setTimeout(function() {
            d.click(), document.body.removeChild(d), B === !0 && setTimeout(function() {
              l.URL.revokeObjectURL(d.href);
            }, 250);
          }, 66), !0;
        if (/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent))
          return /^data:/.test(p) && (p = "data:" + p.replace(/^data:([\w\/\-\+]+)/, i)), window.open(p) || confirm(`Displaying New Document

Use Save As... to download, then click back to return to this page.`) && (location.href = p), !0;
        var T = document.createElement("iframe");
        document.body.appendChild(T), !B && /^data:/.test(p) && (p = "data:" + p.replace(/^data:([\w\/\-\+]+)/, i)), T.src = p, setTimeout(function() {
          document.body.removeChild(T);
        }, 333);
      }
      if (navigator.msSaveBlob)
        return navigator.msSaveBlob(m, c);
      if (l.URL)
        L(l.URL.createObjectURL(m), !0);
      else {
        if (typeof m == "string" || m.constructor === f)
          try {
            return L("data:" + s + ";base64," + l.btoa(m));
          } catch {
            return L("data:" + s + "," + encodeURIComponent(m));
          }
        v = new FileReader(), v.onload = function(p) {
          L(this.result);
        }, v.readAsDataURL(m);
      }
      return !0;
    };
  });
})(_o);
var Zn = _o.exports;
const Qn = /* @__PURE__ */ ta(Zn);
var ea;
(function(t) {
  t.csv = "text/csv", t.tsv = "text/tab-separated-values", t.plain = "text/plain";
})(ea || (ea = {}));
var at = (t) => t, Me = (t) => t, it = at, Bt = at, Qe = at, Pa = at, Da = at, el = { fieldSeparator: ",", decimalSeparator: ".", quoteStrings: !0, quoteCharacter: '"', showTitle: !1, title: "My Generated Report", filename: "generated", showColumnHeaders: !0, useTextFile: !1, fileExtension: "csv", mediaType: ea.csv, useBom: !0, columnHeaders: [], useKeysAsHeaders: !1, boolDisplay: { true: "TRUE", false: "FALSE" }, replaceUndefinedWith: "" }, tl = `\r
`, al = "\uFEFF", $t = (t) => Object.assign({}, el, t);
class ol extends Error {
  constructor(a) {
    super(a), this.name = "CsvGenerationError";
  }
}
class rl extends Error {
  constructor(a) {
    super(a), this.name = "EmptyHeadersError";
  }
}
class nl extends Error {
  constructor(a) {
    super(a), this.name = "CsvDownloadEnvironmentError";
  }
}
class ll extends Error {
  constructor(a) {
    super(a), this.name = "UnsupportedDataFormatError";
  }
}
var il = function(t, a) {
  return a == '"' && t.indexOf('"') > -1 ? t.replace(/"/g, '""') : t;
}, sl = (t) => Pa(typeof t == "object" ? t.key : t), cl = (t) => Da(typeof t == "object" ? t.displayLabel : t), ul = (t, ...a) => a.reduce((e, o) => o(e), t), fl = (t) => (a) => t.useBom ? Bt(Me(a) + al) : a, dl = (t) => (a) => t.showTitle ? ma(Bt(Me(a) + t.title))(Qe("")) : a, ma = (t) => (a) => Bt(Me(t) + Me(a) + tl), Bo = (t) => (a, e) => hl(t)(Qe(Me(a) + Me(e))), hl = (t) => (a) => at(Me(a) + t.fieldSeparator), pl = (t, a) => (e) => {
  if (!t.showColumnHeaders) return e;
  if (a.length < 1) throw new rl("Option to show headers but none supplied. Make sure there are keys in your collection or that you've supplied headers through the config options.");
  let o = Qe("");
  for (let r = 0; r < a.length; r++) {
    const n = cl(a[r]);
    o = Bo(t)(o, $o(t, Me(n)));
  }
  return o = Qe(Me(o).slice(0, -1)), ma(e)(o);
}, ml = (t, a, e) => (o) => {
  let r = o;
  for (var n = 0; n < e.length; n++) {
    let l = Qe("");
    for (let i = 0; i < a.length; i++) {
      const s = sl(a[i]), u = e[n][Me(s)];
      l = Bo(t)(l, $o(t, u));
    }
    l = Qe(Me(l).slice(0, -1)), r = ma(r)(l);
  }
  return r;
}, bl = (t) => +t === t && (!isFinite(t) || !!(t % 1)), gl = (t, a) => {
  if (bl(a)) {
    if (t.decimalSeparator === "locale") return it(a.toLocaleString());
    if (t.decimalSeparator) return it(a.toString().replace(".", t.decimalSeparator));
  }
  return it(a.toString());
}, kt = (t, a) => {
  let e = a;
  return (t.quoteStrings || t.fieldSeparator && a.indexOf(t.fieldSeparator) > -1 || t.quoteCharacter && a.indexOf(t.quoteCharacter) > -1 || a.indexOf(`
`) > -1 || a.indexOf("\r") > -1) && (e = t.quoteCharacter + il(a, t.quoteCharacter) + t.quoteCharacter), it(e);
}, yl = (t, a) => {
  const e = a ? "true" : "false";
  return it(t.boolDisplay[e]);
}, vl = (t, a) => typeof a > "u" && t.replaceUndefinedWith !== void 0 ? kt(t, t.replaceUndefinedWith + "") : a === null ? kt(t, "null") : kt(t, ""), $o = (t, a) => {
  if (typeof a == "number") return gl(t, a);
  if (typeof a == "string") return kt(t, a);
  if (typeof a == "boolean" && t.boolDisplay) return yl(t, a);
  if (a === null || typeof a > "u") return vl(t, a);
  throw new ll(`
    typeof ${typeof a} isn't supported. Only number, string, boolean, null and undefined are supported.
    Please convert the data in your object to one of those before generating the CSV.
    `);
}, xl = (t) => (a) => {
  const e = $t(t), o = e.useKeysAsHeaders ? Object.keys(a[0]) : e.columnHeaders;
  let r = ul(Bt(""), fl(e), dl(e), pl(e, o), ml(e, o, a));
  if (Me(r).length < 1) throw new ol("Output is empty. Is your data formatted correctly?");
  return r;
}, wl = (t) => (a) => {
  const e = $t(t), o = Me(a), r = e.useTextFile ? "text/plain" : e.mediaType;
  return new Blob([o], { type: `${r};charset=utf8;` });
}, Cl = (t) => (a) => {
  if (!window) throw new nl("Downloading only supported in a browser environment.");
  const e = wl(t)(a), o = $t(t), r = o.useTextFile ? "txt" : o.fileExtension, n = `${o.filename}.${r}`, l = document.createElement("a");
  l.download = n, l.href = URL.createObjectURL(e), l.setAttribute("visibility", "hidden"), document.body.appendChild(l), l.click(), document.body.removeChild(l);
};
let Ra = !1;
function kl() {
  Ra || (ke.registerTheme("light", ia), ke.registerTheme("dark", sa), Ra = !0);
}
function Na() {
  const t = /* @__PURE__ */ new Date();
  return new Date(t.getTime() - t.getTimezoneOffset() * 6e4).toISOString().slice(0, 19).replace(/:/g, "-");
}
function Al(t, a) {
  if (!a) return;
  const e = t.getOption();
  if (!e || !e.series) return;
  const r = e.series.map((n) => n.name && a[n.name] ? {
    ...n,
    itemStyle: {
      ...n.itemStyle,
      color: a[n.name]
    }
  } : n);
  t.setOption({ series: r });
}
function Sl(t, a, e) {
  if (!a) return;
  const o = e.series;
  if (!o) return;
  const r = o.reduce(
    (l, { seriesType: i }, s) => ((i === "reference_line" || i === "reference_area" || i === "reference_point") && l.push(s), l),
    []
  ), n = o.map((l, i) => r.includes(i) ? {} : { ...a });
  t.setOption({ series: n });
}
function Tl(t, a, e, o, r, n, l) {
  kl();
  const i = document.createElement("div");
  i.style.cssText = `
    position: fixed;
    left: -9999px;
    top: -9999px;
    width: ${a}px;
    height: ${e}px;
    visibility: hidden;
  `, document.body.appendChild(i);
  const s = ke.init(i, o, { renderer: "canvas" }), u = {
    ...t,
    animation: !1
  };
  return s.setOption(u), n && s.setOption(n), r && Al(s, r), l && Sl(s, l, t), { chart: s, container: i };
}
function Ml() {
  const t = ie(!1), a = (i, s = {}, u = "light", y, d, f) => {
    const {
      type: h = "png",
      pixelRatio: c = 3,
      backgroundColor: m = u === "dark" ? "#1a1a2e" : "#ffffff",
      width: v = 666,
      excludeComponents: C = ["toolbox"]
    } = s, x = 300, { chart: $, container: M } = Tl(
      i,
      v,
      x,
      u,
      y,
      d,
      f
    );
    try {
      return $.getConnectedDataURL({
        type: h,
        pixelRatio: c,
        backgroundColor: m,
        excludeComponents: C
      });
    } finally {
      $.dispose(), document.body.removeChild(M);
    }
  }, e = async (i, s = {}, u = "light", y, d, f) => {
    t.value = !0;
    try {
      const {
        type: h = "png",
        filename: c = "chart"
      } = s, m = a(
        i,
        s,
        u,
        y,
        d,
        f
      );
      if (m) {
        const v = Na();
        Qn(m, `${c}_${v}.${h}`);
      }
    } finally {
      t.value = !1;
    }
  };
  return {
    isExporting: t,
    exportAsPng: (i, s = {}, u, y, d, f) => e(
      i,
      { ...s, type: "png", pixelRatio: s.pixelRatio || 3 },
      u || "light",
      y,
      d,
      f
    ),
    exportAsJpeg: (i, s = {}, u, y, d, f) => e(
      i,
      { ...s, type: "jpeg", pixelRatio: s.pixelRatio || 2 },
      u || "light",
      y,
      d,
      f
    ),
    exportAsCsv: (i, s = {}) => {
      const {
        filename: u = "data",
        showHeaders: y = !0,
        useBom: d = !0,
        separator: f = ","
      } = s;
      if (!i || i.length === 0) {
        console.warn("useExport: No data to export");
        return;
      }
      const h = Na(), c = $t({
        filename: `${u}_${h}`,
        columnHeaders: y ? Object.keys(i[0]) : [],
        useKeysAsHeaders: y,
        useBom: d,
        fieldSeparator: f
      }), m = xl(c)(i);
      Cl(c)(m);
    },
    copyToClipboard: async (i, s = "light", u, y, d) => {
      t.value = !0;
      try {
        const f = a(
          i,
          { type: "png", pixelRatio: 2 },
          s,
          u,
          y,
          d
        );
        if (!f)
          return !1;
        const c = await (await fetch(f)).blob();
        return await navigator.clipboard.write([
          new ClipboardItem({
            [c.type]: c
          })
        ]), !0;
      } catch (f) {
        return console.error("Failed to copy to clipboard:", f), !1;
      } finally {
        t.value = !1;
      }
    },
    getChartDataUrl: a
  };
}
function _l(t, a, e) {
  return e > 0 && t >= a ? 1 : 0;
}
function ba() {
  const t = (o, r) => {
    const {
      swapXY: n = !1,
      xType: l = "category",
      totalSeriesCount: i = 1,
      yCount: s = 1,
      y2Count: u = 0,
      xColumn: y = "x",
      xFormat: d,
      yFormat: f,
      y2Format: h
    } = r, c = Array.isArray(o) ? o : [o];
    if (c.length === 0) return "";
    let m = "";
    const v = c[0].value, C = v == null ? void 0 : v[n ? 1 : 0];
    if (i > 1) {
      m = `<span id="tooltip" style='font-weight: 600;'>${K(C, d)}</span>`;
      for (let x = c.length - 1; x >= 0; x--) {
        const $ = c[x];
        if ($.seriesName !== "stackTotal") {
          const M = $.value, I = M == null ? void 0 : M[n ? 0 : 1], p = _l($.componentIndex || 0, s, u) === 0 ? f : h;
          m += `<br> <span style='font-size: 11px;'>${$.marker} ${$.seriesName}</span>`, m += `<span style='float:right; margin-left: 10px; font-size: 12px;'>${K(I, p)}</span>`;
        }
      }
    } else if (l === "value") {
      const x = c[0].value, $ = x == null ? void 0 : x[n ? 1 : 0], M = x == null ? void 0 : x[n ? 0 : 1], I = c[0].seriesName || "";
      m = `<span id="tooltip" style='font-weight: 600;'>${Le(y, d)}: </span>`, m += `<span style='float:right; margin-left: 10px;'>${K($, d)}</span><br/>`, m += `<span style='font-weight: 600;'>${Le(I, f)}: </span>`, m += `<span style='float:right; margin-left: 10px;'>${K(M, f)}</span>`;
    } else {
      const x = c[0].value, $ = x == null ? void 0 : x[n ? 1 : 0], M = x == null ? void 0 : x[n ? 0 : 1], I = c[0].seriesName || "";
      m = `<span id="tooltip" style='font-weight: 600;'>${K($, d)}</span><br/>`, m += `<span>${Le(I, f)}: </span>`, m += `<span style='float:right; margin-left: 10px;'>${K(M, f)}</span>`;
    }
    return m;
  };
  return {
    createFormatter: (o) => (r) => t(r, o),
    defaultFormatter: t,
    scatterFormatter: (o, r) => {
      const {
        xColumn: n = "x",
        yColumn: l,
        xFormat: i,
        yFormat: s,
        size: u,
        sizeFormat: y,
        tooltipTitle: d
      } = r, f = Array.isArray(o) ? o[0] : o;
      if (!f || !f.value) return "";
      const h = f.value, c = h[0], m = h[1], v = u ? h[2] : void 0, C = d ? h[u ? 3 : 2] : void 0;
      let x = "";
      C !== void 0 ? x += `<span id="tooltip" style='font-weight: 600;'>${C}</span><br/>` : f.seriesName && (x += `<span id="tooltip" style='font-weight: 600;'>${f.seriesName}</span><br/>`), x += `<span>${Le(n, i)}: </span>`, x += `<span style='float:right; margin-left: 10px;'>${K(c, i)}</span><br/>`;
      const $ = typeof l == "string" ? l : (l == null ? void 0 : l[0]) || "y";
      return x += `<span>${Le($, s)}: </span>`, x += `<span style='float:right; margin-left: 10px;'>${K(m, s)}</span>`, u && v !== void 0 && (x += `<br/><span>${Le(u, y)}: </span>`, x += `<span style='float:right; margin-left: 10px;'>${K(v, y)}</span>`), x;
    }
  };
}
function Bl(t = {}) {
  const { createFormatter: a } = ba();
  return {
    trigger: "axis",
    show: !0,
    formatter: a(t),
    confine: !0,
    axisPointer: {
      type: "shadow"
    },
    extraCssText: 'box-shadow: 0 3px 6px rgba(0,0,0,.15); box-shadow: 0 2px 4px rgba(0,0,0,.12); z-index: 1; font-feature-settings: "cv02", "tnum";',
    order: "valueDesc"
  };
}
function Ga(t) {
  if (!t || t.length === 0) return {};
  const a = {}, e = t[0];
  for (const o of Object.keys(e)) {
    const r = t.map((u) => u[o]).filter((u) => u != null), n = r[0];
    let l = "string", i;
    if (typeof n == "number") {
      l = "number";
      const u = r, y = [...u].sort((m, v) => m - v), d = y[0], f = y[y.length - 1], h = y[Math.floor(y.length / 2)], c = Math.max(
        ...u.map((m) => {
          const v = m.toString(), C = v.indexOf(".");
          return C >= 0 ? v.length - C - 1 : 0;
        })
      );
      i = { min: d, max: f, median: h, maxDecimals: c, unitType: "number" };
    } else if (typeof n == "boolean")
      l = "boolean";
    else if (n instanceof Date)
      l = "date", i = { min: 0, max: 0, median: 0, maxDecimals: 0, unitType: "date" };
    else if (typeof n == "string") {
      const u = new Date(n);
      !isNaN(u.getTime()) && n.match(/\d{4}-\d{2}-\d{2}/) && (l = "date", i = { min: 0, max: 0, median: 0, maxDecimals: 0, unitType: "date" });
    }
    const s = qa(
      o,
      { columnType: l },
      i
    );
    a[o] = {
      id: o,
      title: Le(o, s),
      type: l,
      format: s,
      columnUnitSummary: i
    };
  }
  return a;
}
function ct(t, a) {
  const e = new Set(t.map((o) => o[a]));
  return Array.from(e);
}
function $l(t, a) {
  return ct(t, a).length;
}
function ja(t, a, e = !0) {
  const o = Array.isArray(a) ? a[0] : a;
  return [...t].sort((r, n) => {
    const l = r[o], i = n[o];
    if (l == null) return 1;
    if (i == null) return -1;
    if (typeof l == "number" && typeof i == "number")
      return e ? l - i : i - l;
    const s = String(l), u = String(i);
    return e ? s.localeCompare(u) : u.localeCompare(s);
  });
}
function Ve(t) {
  const a = O(() => {
    var c;
    let d = [...t.data || []];
    const f = Ga(d), h = Object.values(f).filter((m) => m.type === "date").map((m) => m.id);
    for (const m of h)
      d = Yo(d, m);
    if (t.sort !== !1 && t.x) {
      const m = (c = f[t.x]) == null ? void 0 : c.type;
      m === "date" || m === "number" ? d = ja(d, t.x, !0) : t.y && (d = ja(d, t.y, !1));
    }
    return d;
  }), e = O(() => Ga(a.value)), o = O(() => {
    var f;
    if (t.xType) return t.xType;
    if (!t.x) return "category";
    switch ((f = e.value[t.x]) == null ? void 0 : f.type) {
      case "number":
        return "value";
      case "date":
        return "time";
      default:
        return "category";
    }
  }), r = O(() => {
    var c, m, v, C, x, $, M, I, L;
    const d = {};
    t.x && (t.xFmt ? d.x = de(t.xFmt, (m = (c = e.value[t.x]) == null ? void 0 : c.format) == null ? void 0 : m.valueType) : d.x = (v = e.value[t.x]) == null ? void 0 : v.format);
    const f = Array.isArray(t.y) ? t.y[0] : t.y;
    f && (t.yFmt ? d.y = de(t.yFmt, (x = (C = e.value[f]) == null ? void 0 : C.format) == null ? void 0 : x.valueType) : d.y = ($ = e.value[f]) == null ? void 0 : $.format);
    const h = Array.isArray(t.y2) ? t.y2[0] : t.y2;
    return h && (t.y2Fmt ? d.y2 = de(t.y2Fmt, (I = (M = e.value[h]) == null ? void 0 : M.format) == null ? void 0 : I.valueType) : d.y2 = (L = e.value[h]) == null ? void 0 : L.format), d;
  }), n = O(() => {
    var c, m, v;
    const d = {};
    t.x && (d.x = (c = e.value[t.x]) == null ? void 0 : c.columnUnitSummary);
    const f = Array.isArray(t.y) ? t.y[0] : t.y;
    f && (d.y = (m = e.value[f]) == null ? void 0 : m.columnUnitSummary);
    const h = Array.isArray(t.y2) ? t.y2[0] : t.y2;
    return h && (d.y2 = (v = e.value[h]) == null ? void 0 : v.columnUnitSummary), d;
  }), l = O(() => Array.isArray(t.y) ? t.y.length : t.y ? 1 : 0), i = O(() => Array.isArray(t.y2) ? t.y2.length : t.y2 ? 1 : 0), s = O(() => {
    const d = t.series ? $l(a.value, t.series) : 1;
    return l.value * d;
  }), u = O(() => s.value + i.value), y = O(() => {
    const d = t.swapXY || !1, f = t.legend ?? u.value > 1;
    t.chartAreaHeight;
    const h = !!t.title, c = !!t.subtitle, m = f, v = 15, C = 13, x = 6 * (c ? 1 : 0), $ = (h ? v : 0) + (c ? C : 0) + x * Math.max(h ? 1 : 0, c ? 1 : 0), M = m ? 15 : 0, I = 7 * Math.max(h ? 1 : 0, c ? 1 : 0), L = $ + I, p = 10, B = 10, T = L + M + p, F = B;
    t.xAxisTitle === !0 ? Le(t.x || "", r.value.x) : t.xAxisTitle === !1 || t.xAxisTitle;
    const G = t.yAxisTitle === !0 ? Le(Array.isArray(t.y) ? "" : t.y || "", r.value.y) : t.yAxisTitle === !1 ? "" : t.yAxisTitle || "", j = d ? {
      type: t.yLog ? "log" : "value",
      logBase: t.yLogBase || 10,
      position: "top",
      axisLabel: {
        show: t.yAxisLabels !== !1,
        hideOverlap: !0,
        formatter: (be) => qe(be, r.value.y, n.value.y)
      },
      min: t.yMin,
      max: t.yMax,
      scale: t.yScale,
      splitLine: { show: t.yGridlines !== !1 },
      axisLine: { show: t.yBaseline, onZero: !1 },
      axisTick: { show: t.yTickMarks }
    } : {
      type: o.value,
      min: t.xMin,
      max: t.xMax,
      splitLine: { show: t.xGridlines },
      axisLine: { show: t.xBaseline !== !1 },
      axisTick: { show: t.xTickMarks },
      axisLabel: {
        show: t.xAxisLabels !== !1,
        hideOverlap: !0,
        formatter: o.value === "time" || o.value === "category" ? void 0 : (be) => qe(be, r.value.x, n.value.x)
      }
    }, U = d ? {
      type: "category",
      inverse: !0,
      splitLine: { show: t.xGridlines },
      axisLine: { show: t.xBaseline !== !1 },
      axisTick: { show: t.xTickMarks },
      axisLabel: { show: t.xAxisLabels !== !1, hideOverlap: !0 }
    } : {
      type: t.yLog ? "log" : "value",
      logBase: t.yLogBase || 10,
      splitLine: { show: t.yGridlines !== !1 },
      axisLine: { show: t.yBaseline, onZero: !1 },
      axisTick: { show: t.yTickMarks },
      axisLabel: {
        show: t.yAxisLabels !== !1,
        hideOverlap: !0,
        formatter: (be) => qe(be, r.value.y, n.value.y)
      },
      name: G,
      nameLocation: "end",
      nameTextStyle: { align: "left", verticalAlign: "top", padding: [0, 5, 0, 0] },
      min: t.yMin,
      max: t.yMax,
      scale: t.yScale,
      boundaryGap: ["0%", "1%"]
    }, le = Bl({
      swapXY: d,
      xType: o.value,
      totalSeriesCount: u.value,
      yCount: l.value,
      y2Count: i.value,
      xColumn: t.x,
      yColumn: t.y,
      xFormat: r.value.x,
      yFormat: r.value.y,
      y2Format: r.value.y2,
      tooltipTitle: t.tooltipTitle
    });
    return {
      title: {
        text: t.title,
        subtext: t.subtitle
      },
      tooltip: le,
      legend: {
        show: f,
        type: "scroll",
        top: L,
        padding: [0, 0, 0, 0],
        data: []
      },
      grid: {
        left: t.leftPadding || (d ? "1%" : "0.8%"),
        right: t.rightPadding || (d ? "4%" : "3%"),
        bottom: F,
        top: T,
        containLabel: !0
      },
      xAxis: j,
      yAxis: U,
      series: [],
      animation: !0
    };
  });
  return {
    processedData: a,
    columnSummary: e,
    xAxisType: o,
    baseConfig: y,
    formats: r,
    unitSummaries: n
  };
}
function dt(t, a, e, o, r, n, l, i = {}) {
  var C, x;
  const {
    xMismatch: s = !1,
    size: u,
    tooltipTitle: y,
    y2: d,
    seriesOrder: f
  } = i, h = [], c = [], m = Array.isArray(e) ? e : e ? [e] : [], v = Array.isArray(d) ? d : d ? [d] : [];
  if (m.forEach(($) => c.push([$, 0])), v.forEach(($) => c.push([$, 1])), o && c.length === 1) {
    const $ = ct(t, o);
    for (const M of $) {
      const L = t.filter((p) => p[o] === M).map((p) => {
        const B = s ? String(p[a]) : p[a], T = p[c[0][0]], F = r ? [T, B] : [B, T];
        return u && F.push(p[u]), y && F.push(p[y]), F;
      });
      h.push({
        name: String(M ?? "null"),
        data: L,
        yAxisIndex: c[0][1],
        ...n
      });
    }
  } else if (c.length > 1)
    for (const [$, M] of c) {
      const I = t.map((L) => {
        const p = s ? String(L[a]) : L[a], B = L[$], T = r ? [B, p] : [p, B];
        return u && T.push(L[u]), y && T.push(L[y]), T;
      });
      h.push({
        name: ((C = l[$]) == null ? void 0 : C.title) || $,
        data: I,
        yAxisIndex: M,
        ...n
      });
    }
  else if (c.length === 1) {
    const $ = t.map((M) => {
      const I = s ? String(M[a]) : M[a], L = M[c[0][0]], p = r ? [L, I] : [I, L];
      return u && p.push(M[u]), y && p.push(M[y]), p;
    });
    h.push({
      name: ((x = l[c[0][0]]) == null ? void 0 : x.title) || c[0][0],
      data: $,
      yAxisIndex: c[0][1],
      ...n
    });
  }
  return f && h.sort(($, M) => f.indexOf($.name) - f.indexOf(M.name)), h;
}
const Zt = 500, Ol = /* @__PURE__ */ he({
  __name: "EChartsBase",
  props: {
    config: {},
    height: { default: "291px" },
    width: { default: "100%" },
    theme: { default: "light" },
    renderer: { default: "canvas" },
    connectGroup: {},
    seriesColors: {},
    echartsOptions: {},
    seriesOptions: {},
    showAllXAxisLabels: { type: Boolean },
    swapXY: { type: Boolean },
    xAxisLabelOverflow: {}
  },
  emits: ["click", "init", "dispose"],
  setup(t, { expose: a, emit: e }) {
    let o = !1;
    function r() {
      o || (ke.registerTheme("light", ia), ke.registerTheme("dark", sa), o = !0);
    }
    const n = t, l = e, i = ie(null), s = Ha(null), u = ie(!1);
    function y(v) {
      return ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"].includes(
        navigator.platform
      ) && v.clientWidth * 3 * v.clientHeight * 3 > 16777215;
    }
    function d() {
      if (!i.value) return;
      r(), s.value && s.value.dispose();
      const v = y(i.value) ? "svg" : n.renderer, C = ke.init(i.value, n.theme, {
        renderer: v
      });
      s.value = C, n.connectGroup && (C.group = n.connectGroup, ke.connect(n.connectGroup)), C.on("click", (x) => {
        l("click", x);
      }), l("init", C);
    }
    function f() {
      s.value && (s.value.setOption(
        {
          ...n.config,
          animationDuration: Zt,
          animationDurationUpdate: Zt
        },
        !0
      ), n.seriesColors && Wn(s.value, n.seriesColors), n.echartsOptions && Un(s.value, n.echartsOptions), n.seriesOptions && Yn(s.value, n.seriesOptions, n.config), h());
    }
    function h() {
      var I;
      if (!s.value || !n.showAllXAxisLabels || n.swapXY) return;
      const v = s.value.getOption();
      if (!v || !v.series) return;
      const C = v.series, x = new Set(
        C.flatMap((L) => {
          var p;
          return ((p = L.data) == null ? void 0 : p.map((B) => B[0])) || [];
        })
      ), $ = 4 / 5, M = ((I = i.value) == null ? void 0 : I.clientWidth) ?? 0;
      s.value.setOption({
        xAxis: {
          axisLabel: {
            interval: 0,
            overflow: n.xAxisLabelOverflow || "truncate",
            width: M * $ / x.size
          }
        }
      });
    }
    const c = To(() => {
      s.value && (s.value.resize({
        animation: {
          duration: Zt
        }
      }), h());
    }, 100);
    let m = null;
    return Re(() => {
      var C;
      d(), f();
      const v = (C = i.value) == null ? void 0 : C.parentElement;
      window.ResizeObserver && v ? (m = new ResizeObserver(c), m.observe(v)) : window.addEventListener("resize", c);
    }), et(() => {
      m ? m.disconnect() : window.removeEventListener("resize", c), s.value && (s.value.dispose(), l("dispose"));
    }), De(
      () => n.config,
      () => {
        f();
      },
      { deep: !0 }
    ), De(
      () => n.theme,
      () => {
        d(), f();
      }
    ), a({
      getChart: () => s.value,
      resize: c,
      updateChart: f
    }), (v, C) => (fe(), Xe("div", {
      class: "echarts-base-container",
      onMouseenter: C[0] || (C[0] = (x) => u.value = !0),
      onMouseleave: C[1] || (C[1] = (x) => u.value = !1)
    }, [
      Fo("div", {
        ref_key: "containerRef",
        ref: i,
        class: "echarts-base",
        style: Lo({
          height: n.height,
          width: n.width
        })
      }, null, 4),
      ft(v.$slots, "footer", { hovering: u.value }, void 0, !0)
    ], 32));
  }
}), Ot = (t, a) => {
  const e = t.__vccOpts || t;
  for (const [o, r] of a)
    e[o] = r;
  return e;
}, we = /* @__PURE__ */ Ot(Ol, [["__scopeId", "data-v-476529f5"]]), Zl = /* @__PURE__ */ he({
  __name: "ChartProvider",
  props: {
    data: { default: () => [] },
    x: {},
    y: {},
    y2: {},
    series: {},
    swapXY: { type: Boolean, default: !1 },
    xType: { default: "category" },
    xFormat: {},
    yFormat: {},
    y2Format: {},
    sizeFormat: {},
    xMismatch: { type: Boolean, default: !1 },
    columnSummary: {},
    xAxisTitle: {},
    yAxisTitle: {},
    y2AxisTitle: {},
    tooltipTitle: {},
    chartAreaHeight: {},
    chartType: { default: "Chart" },
    yCount: { default: 1 },
    y2Count: { default: 0 }
  },
  setup(t, { expose: a }) {
    const e = t, o = Mo();
    Kn(o);
    const r = wa({
      data: e.data,
      x: e.x,
      y: e.y,
      y2: e.y2,
      series: e.series,
      swapXY: e.swapXY,
      xType: e.xType,
      xFormat: e.xFormat,
      yFormat: e.yFormat,
      y2Format: e.y2Format,
      sizeFormat: e.sizeFormat,
      xMismatch: e.xMismatch,
      columnSummary: e.columnSummary || {},
      xAxisTitle: e.xAxisTitle,
      yAxisTitle: e.yAxisTitle,
      y2AxisTitle: e.y2AxisTitle,
      tooltipTitle: e.tooltipTitle,
      chartAreaHeight: e.chartAreaHeight,
      chartType: e.chartType,
      yCount: e.yCount,
      y2Count: e.y2Count
    }), n = wa({
      series: []
    }), l = /* @__PURE__ */ new Map(), i = (y) => {
      if (!y) return;
      const d = Array.isArray(y) ? y : [y];
      for (const f of d)
        f && typeof f == "object" && "name" in f && l.set(f.name, f);
      n.series = Array.from(l.values());
    }, s = (y) => {
      l.delete(y), n.series = Array.from(l.values());
    }, u = (y, d) => {
      const f = l.get(y);
      f && (l.set(y, { ...f, ...d }), n.series = Array.from(l.values()));
    };
    return xt(Xn, O(() => r)), xt(qn, O(() => n)), xt(_t, {
      addSeries: i,
      removeSeries: s,
      updateSeries: u
    }), a({
      chartContext: r,
      chartConfig: n,
      addSeries: i,
      removeSeries: s,
      updateSeries: u
    }), (y, d) => ft(y.$slots, "default", {
      context: r,
      config: n,
      theme: Q(o)
    });
  }
}), Fl = ["disabled"], Ll = /* @__PURE__ */ he({
  __name: "ChartFooter",
  props: {
    config: {},
    data: {},
    queryId: {},
    chartTitle: {},
    theme: { default: "light" },
    seriesColors: {},
    echartsOptions: {},
    seriesOptions: {},
    downloadableData: { type: Boolean, default: !0 },
    downloadableImage: { type: Boolean, default: !0 },
    visible: { type: Boolean, default: !1 }
  },
  setup(t) {
    const a = t, { exportAsPng: e, exportAsCsv: o, isExporting: r } = Ml(), n = async () => {
      await e(
        a.config,
        {
          filename: a.chartTitle || a.queryId || "chart",
          pixelRatio: 3,
          width: 666
        },
        a.theme,
        a.seriesColors,
        a.echartsOptions,
        a.seriesOptions
      );
    }, l = () => {
      a.data && o(a.data, {
        filename: a.queryId || "data"
      });
    };
    return (i, s) => t.downloadableData || t.downloadableImage ? (fe(), Xe("div", {
      key: 0,
      class: Io(["chart-footer", { visible: t.visible }])
    }, [
      t.downloadableImage ? (fe(), Xe("button", {
        key: 0,
        class: "download-button",
        disabled: Q(r),
        onClick: n
      }, [...s[0] || (s[0] = [
        Ca('<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-6f6eca42><rect x="3" y="3" width="18" height="18" rx="2" data-v-6f6eca42></rect><circle cx="8.5" cy="8.5" r="1.5" data-v-6f6eca42></circle><path d="M20.4 14.5L16 10 4 20" data-v-6f6eca42></path></svg><span class="button-text" data-v-6f6eca42>Save Image</span>', 2)
      ])], 8, Fl)) : zt("", !0),
      t.data && t.downloadableData ? (fe(), Xe("button", {
        key: 1,
        class: "download-button",
        onClick: l
      }, [...s[1] || (s[1] = [
        Ca('<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-6f6eca42><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-6f6eca42></path><polyline points="7 10 12 15 17 10" data-v-6f6eca42></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-6f6eca42></line></svg><span class="button-text" data-v-6f6eca42>Download Data</span>', 2)
      ])])) : zt("", !0)
    ], 2)) : zt("", !0);
  }
}), Ce = /* @__PURE__ */ Ot(Ll, [["__scopeId", "data-v-6f6eca42"]]), Ql = /* @__PURE__ */ he({
  __name: "BarChart",
  props: {
    type: { default: "stacked" },
    fillColor: {},
    fillOpacity: { default: 1 },
    outlineColor: {},
    outlineWidth: { default: 0 },
    labels: { type: Boolean },
    labelSize: {},
    labelPosition: {},
    labelColor: {},
    stackTotalLabel: { type: Boolean },
    seriesLabels: { type: Boolean },
    showAllLabels: { type: Boolean },
    seriesOrder: {},
    seriesLabelFmt: {},
    y2SeriesType: {},
    data: {},
    x: {},
    y: {},
    y2: {},
    series: {},
    size: {},
    tooltipTitle: {},
    xFmt: {},
    yFmt: {},
    y2Fmt: {},
    sizeFmt: {},
    labelFmt: {},
    yLabelFmt: {},
    y2LabelFmt: {},
    title: {},
    subtitle: {},
    xAxisTitle: { type: [String, Boolean] },
    yAxisTitle: { type: [String, Boolean] },
    y2AxisTitle: { type: [String, Boolean] },
    xType: {},
    xMin: {},
    xMax: {},
    xBaseline: { type: Boolean, default: !0 },
    xTickMarks: { type: Boolean },
    xGridlines: { type: Boolean },
    xAxisLabels: { type: Boolean, default: !0 },
    showAllXAxisLabels: { type: Boolean },
    xLabelWrap: { type: Boolean },
    yType: {},
    yLog: { type: Boolean },
    yLogBase: {},
    yMin: {},
    yMax: {},
    yScale: { type: Boolean },
    yBaseline: { type: Boolean },
    yTickMarks: { type: Boolean },
    yGridlines: { type: Boolean, default: !0 },
    yAxisLabels: { type: Boolean, default: !0 },
    yAxisColor: {},
    y2Min: {},
    y2Max: {},
    y2Scale: { type: Boolean },
    y2Baseline: { type: Boolean },
    y2TickMarks: { type: Boolean },
    y2Gridlines: { type: Boolean },
    y2AxisLabels: { type: Boolean },
    y2AxisColor: {},
    legend: { type: Boolean },
    height: {},
    width: {},
    chartAreaHeight: {},
    swapXY: { type: Boolean, default: !1 },
    sort: { type: Boolean },
    colorPalette: {},
    seriesColors: {},
    echartsOptions: {},
    seriesOptions: {},
    renderer: {},
    connectGroup: {},
    downloadableData: { type: Boolean, default: !0 },
    downloadableImage: { type: Boolean, default: !0 },
    leftPadding: {},
    rightPadding: {}
  },
  emits: ["click"],
  setup(t, { emit: a }) {
    const e = t, o = a, { activeAppearance: r, resolveColor: n, resolveColorPalette: l, resolveColorsObject: i } = me(), {
      processedData: s,
      columnSummary: u,
      xAxisType: y,
      baseConfig: d,
      formats: f,
      unitSummaries: h
    } = Ve({
      ...e,
      stacked100: e.type === "stacked100"
    }), c = O(
      () => e.fillColor ? n(e.fillColor).value : void 0
    ), m = O(
      () => e.outlineColor ? n(e.outlineColor).value : void 0
    ), v = O(
      () => e.labelColor ? n(e.labelColor).value : void 0
    ), C = O(
      () => l(e.colorPalette || "default").value
    ), x = O(
      () => e.seriesColors ? i(e.seriesColors).value : void 0
    ), $ = O(() => ({
      type: "bar",
      stack: e.type === "stacked" || e.type === "stacked100" ? "total" : void 0,
      barMaxWidth: e.swapXY ? void 0 : 60,
      itemStyle: {
        color: c.value,
        opacity: e.fillOpacity,
        borderColor: m.value,
        borderWidth: e.outlineWidth
      },
      label: e.labels ? {
        show: !0,
        position: e.labelPosition || (e.swapXY ? "right" : "top"),
        fontSize: e.labelSize || 11,
        color: v.value,
        formatter: (B) => {
          const T = e.swapXY ? B.value[0] : B.value[1];
          return e.labelFmt || e.yLabelFmt ? K(T, f.value.y, h.value.y) : String(T);
        }
      } : void 0,
      emphasis: {
        focus: "series"
      }
    })), M = O(() => {
      if (!e.x || !e.y) return [];
      const p = $.value;
      return dt(
        s.value,
        e.x,
        e.y,
        e.series,
        e.swapXY || !1,
        p,
        u.value,
        {
          y2: e.y2,
          seriesOrder: e.seriesOrder
        }
      );
    }), I = O(() => {
      var B;
      const p = { ...d.value };
      if (p.series = M.value, C.value && (p.color = C.value), e.type === "stacked100") {
        const T = p.yAxis;
        T && !e.swapXY && (T.max = 1, T.axisLabel = {
          ...T.axisLabel,
          formatter: (F) => `${Math.round(F * 100)}%`
        });
      }
      if (e.stackTotalLabel && (e.type === "stacked" || e.type === "stacked100")) {
        const T = {
          name: "stackTotal",
          type: "bar",
          stack: "total",
          itemStyle: { color: "transparent" },
          label: {
            show: !0,
            position: e.swapXY ? "right" : "top",
            formatter: (F) => {
              const G = M.value;
              let j = 0;
              for (const U of G) {
                const le = U.data[F.dataIndex];
                j += le[e.swapXY ? 0 : 1] || 0;
              }
              return K(j, f.value.y, h.value.y);
            }
          },
          data: ((B = M.value[0]) == null ? void 0 : B.data.map(() => [0, 0])) || []
        };
        p.series.push(T);
      }
      return p;
    }), L = ie(!1);
    return (p, B) => (fe(), ye(we, {
      config: I.value,
      height: e.height,
      width: e.width,
      theme: Q(r),
      renderer: e.renderer,
      "connect-group": e.connectGroup,
      "series-colors": x.value,
      "echarts-options": e.echartsOptions,
      "series-options": e.seriesOptions,
      "show-all-x-axis-labels": e.showAllXAxisLabels,
      "swap-x-y": e.swapXY,
      onClick: B[0] || (B[0] = (T) => o("click", T)),
      onMouseenter: B[1] || (B[1] = (T) => L.value = !0),
      onMouseleave: B[2] || (B[2] = (T) => L.value = !1)
    }, {
      footer: ve(() => [
        xe(Ce, {
          config: I.value,
          data: Q(s),
          "chart-title": e.title,
          theme: Q(r),
          "series-colors": x.value,
          "echarts-options": e.echartsOptions,
          "series-options": e.seriesOptions,
          "downloadable-data": e.downloadableData,
          "downloadable-image": e.downloadableImage,
          visible: L.value
        }, null, 8, ["config", "data", "chart-title", "theme", "series-colors", "echarts-options", "series-options", "downloadable-data", "downloadable-image", "visible"])
      ]),
      _: 1
    }, 8, ["config", "height", "width", "theme", "renderer", "connect-group", "series-colors", "echarts-options", "series-options", "show-all-x-axis-labels", "swap-x-y"]));
  }
}), ei = /* @__PURE__ */ he({
  __name: "LineChart",
  props: {
    lineColor: {},
    lineType: { default: "solid" },
    lineOpacity: { default: 1 },
    lineWidth: { default: 2 },
    markers: { type: Boolean, default: !1 },
    markerShape: { default: "circle" },
    markerSize: { default: 8 },
    handleMissing: { default: "gap" },
    step: { type: Boolean, default: !1 },
    stepPosition: { default: "middle" },
    labels: { type: Boolean },
    labelSize: {},
    labelPosition: {},
    labelColor: {},
    showAllLabels: { type: Boolean },
    seriesOrder: {},
    seriesLabelFmt: {},
    y2SeriesType: {},
    data: {},
    x: {},
    y: {},
    y2: {},
    series: {},
    size: {},
    tooltipTitle: {},
    xFmt: {},
    yFmt: {},
    y2Fmt: {},
    sizeFmt: {},
    labelFmt: {},
    yLabelFmt: {},
    y2LabelFmt: {},
    title: {},
    subtitle: {},
    xAxisTitle: { type: [String, Boolean] },
    yAxisTitle: { type: [String, Boolean] },
    y2AxisTitle: { type: [String, Boolean] },
    xType: {},
    xMin: {},
    xMax: {},
    xBaseline: { type: Boolean, default: !0 },
    xTickMarks: { type: Boolean },
    xGridlines: { type: Boolean },
    xAxisLabels: { type: Boolean, default: !0 },
    showAllXAxisLabels: { type: Boolean },
    xLabelWrap: { type: Boolean },
    yType: {},
    yLog: { type: Boolean },
    yLogBase: {},
    yMin: {},
    yMax: {},
    yScale: { type: Boolean },
    yBaseline: { type: Boolean },
    yTickMarks: { type: Boolean },
    yGridlines: { type: Boolean, default: !0 },
    yAxisLabels: { type: Boolean, default: !0 },
    yAxisColor: {},
    y2Min: {},
    y2Max: {},
    y2Scale: { type: Boolean },
    y2Baseline: { type: Boolean },
    y2TickMarks: { type: Boolean },
    y2Gridlines: { type: Boolean },
    y2AxisLabels: { type: Boolean },
    y2AxisColor: {},
    legend: { type: Boolean },
    height: {},
    width: {},
    chartAreaHeight: {},
    swapXY: { type: Boolean },
    sort: { type: Boolean },
    colorPalette: {},
    seriesColors: {},
    echartsOptions: {},
    seriesOptions: {},
    renderer: {},
    connectGroup: {},
    downloadableData: { type: Boolean, default: !0 },
    downloadableImage: { type: Boolean, default: !0 },
    leftPadding: {},
    rightPadding: {}
  },
  emits: ["click"],
  setup(t, { emit: a }) {
    const e = t, o = a, { activeAppearance: r, resolveColor: n, resolveColorPalette: l, resolveColorsObject: i } = me(), {
      processedData: s,
      columnSummary: u,
      xAxisType: y,
      baseConfig: d,
      formats: f,
      unitSummaries: h
    } = Ve({
      ...e
    }), c = O(
      () => e.lineColor ? n(e.lineColor).value : void 0
    ), m = O(
      () => e.labelColor ? n(e.labelColor).value : void 0
    ), v = O(
      () => l(e.colorPalette || "default").value
    ), C = O(
      () => e.seriesColors ? i(e.seriesColors).value : void 0
    ), x = {
      solid: "solid",
      dashed: "dashed",
      dotted: "dotted"
    }, $ = {
      start: "start",
      middle: "middle",
      end: "end"
    }, M = O(() => ({
      type: "line",
      smooth: !1,
      step: e.step ? $[e.stepPosition || "middle"] : !1,
      connectNulls: e.handleMissing === "connect",
      lineStyle: {
        color: c.value,
        width: e.lineWidth,
        opacity: e.lineOpacity,
        type: x[e.lineType || "solid"]
      },
      itemStyle: {
        color: c.value
      },
      symbol: e.markers ? e.markerShape : "none",
      symbolSize: e.markers ? e.markerSize : 0,
      label: e.labels ? {
        show: !0,
        position: e.labelPosition || "top",
        fontSize: e.labelSize || 11,
        color: m.value,
        formatter: (B) => {
          const T = B.value[1];
          return e.labelFmt || e.yLabelFmt ? K(T, f.value.y, h.value.y) : String(T);
        }
      } : void 0,
      emphasis: {
        focus: "series",
        lineStyle: {
          width: (e.lineWidth || 2) + 1
        }
      }
    })), I = O(() => {
      if (!e.x || !e.y) return [];
      let B = s.value;
      if (e.handleMissing === "zero") {
        const T = Array.isArray(e.y) ? e.y : [e.y];
        B = B.map((F) => {
          const G = { ...F };
          for (const j of T)
            G[j] == null && (G[j] = 0);
          return G;
        });
      }
      return dt(
        B,
        e.x,
        e.y,
        e.series,
        !1,
        M.value,
        u.value,
        {
          y2: e.y2,
          seriesOrder: e.seriesOrder
        }
      );
    }), L = O(() => {
      const B = { ...d.value };
      return B.series = I.value, v.value && (B.color = v.value), B;
    }), p = ie(!1);
    return (B, T) => (fe(), ye(we, {
      config: L.value,
      height: e.height,
      width: e.width,
      theme: Q(r),
      renderer: e.renderer,
      "connect-group": e.connectGroup,
      "series-colors": C.value,
      "echarts-options": e.echartsOptions,
      "series-options": e.seriesOptions,
      "show-all-x-axis-labels": e.showAllXAxisLabels,
      onClick: T[0] || (T[0] = (F) => o("click", F)),
      onMouseenter: T[1] || (T[1] = (F) => p.value = !0),
      onMouseleave: T[2] || (T[2] = (F) => p.value = !1)
    }, {
      footer: ve(() => [
        xe(Ce, {
          config: L.value,
          data: Q(s),
          "chart-title": e.title,
          theme: Q(r),
          "series-colors": C.value,
          "echarts-options": e.echartsOptions,
          "series-options": e.seriesOptions,
          "downloadable-data": e.downloadableData,
          "downloadable-image": e.downloadableImage,
          visible: p.value
        }, null, 8, ["config", "data", "chart-title", "theme", "series-colors", "echarts-options", "series-options", "downloadable-data", "downloadable-image", "visible"])
      ]),
      _: 1
    }, 8, ["config", "height", "width", "theme", "renderer", "connect-group", "series-colors", "echarts-options", "series-options", "show-all-x-axis-labels"]));
  }
}), ti = /* @__PURE__ */ he({
  __name: "AreaChart",
  props: {
    type: { default: "stacked" },
    fillColor: {},
    fillOpacity: { default: 0.7 },
    lineColor: {},
    lineType: { default: "solid" },
    lineWidth: { default: 2 },
    markers: { type: Boolean, default: !1 },
    markerShape: { default: "circle" },
    markerSize: { default: 8 },
    handleMissing: { default: "gap" },
    step: { type: Boolean, default: !1 },
    stepPosition: { default: "middle" },
    labels: { type: Boolean },
    labelSize: {},
    labelPosition: {},
    labelColor: {},
    showAllLabels: { type: Boolean },
    seriesOrder: {},
    seriesLabelFmt: {},
    data: {},
    x: {},
    y: {},
    y2: {},
    series: {},
    size: {},
    tooltipTitle: {},
    xFmt: {},
    yFmt: {},
    y2Fmt: {},
    sizeFmt: {},
    labelFmt: {},
    yLabelFmt: {},
    y2LabelFmt: {},
    title: {},
    subtitle: {},
    xAxisTitle: { type: [String, Boolean] },
    yAxisTitle: { type: [String, Boolean] },
    y2AxisTitle: { type: [String, Boolean] },
    xType: {},
    xMin: {},
    xMax: {},
    xBaseline: { type: Boolean, default: !0 },
    xTickMarks: { type: Boolean },
    xGridlines: { type: Boolean },
    xAxisLabels: { type: Boolean, default: !0 },
    showAllXAxisLabels: { type: Boolean },
    xLabelWrap: { type: Boolean },
    yType: {},
    yLog: { type: Boolean },
    yLogBase: {},
    yMin: {},
    yMax: {},
    yScale: { type: Boolean },
    yBaseline: { type: Boolean },
    yTickMarks: { type: Boolean },
    yGridlines: { type: Boolean, default: !0 },
    yAxisLabels: { type: Boolean, default: !0 },
    yAxisColor: {},
    y2Min: {},
    y2Max: {},
    y2Scale: { type: Boolean },
    y2Baseline: { type: Boolean },
    y2TickMarks: { type: Boolean },
    y2Gridlines: { type: Boolean },
    y2AxisLabels: { type: Boolean },
    y2AxisColor: {},
    legend: { type: Boolean },
    height: {},
    width: {},
    chartAreaHeight: {},
    swapXY: { type: Boolean },
    sort: { type: Boolean },
    colorPalette: {},
    seriesColors: {},
    echartsOptions: {},
    seriesOptions: {},
    renderer: {},
    connectGroup: {},
    downloadableData: { type: Boolean, default: !0 },
    downloadableImage: { type: Boolean, default: !0 },
    leftPadding: {},
    rightPadding: {}
  },
  emits: ["click"],
  setup(t, { emit: a }) {
    const e = t, o = a, { activeAppearance: r, resolveColor: n, resolveColorPalette: l, resolveColorsObject: i } = me(), {
      processedData: s,
      columnSummary: u,
      xAxisType: y,
      baseConfig: d,
      formats: f,
      unitSummaries: h
    } = Ve({
      ...e,
      stacked100: e.type === "stacked100"
    }), c = O(
      () => e.fillColor ? n(e.fillColor).value : void 0
    ), m = O(
      () => e.lineColor ? n(e.lineColor).value : void 0
    ), v = O(
      () => e.labelColor ? n(e.labelColor).value : void 0
    ), C = O(
      () => l(e.colorPalette || "default").value
    ), x = O(
      () => e.seriesColors ? i(e.seriesColors).value : void 0
    ), $ = {
      solid: "solid",
      dashed: "dashed",
      dotted: "dotted"
    }, M = {
      start: "start",
      middle: "middle",
      end: "end"
    }, I = O(() => ({
      type: "line",
      stack: "total",
      smooth: !1,
      step: e.step ? M[e.stepPosition || "middle"] : !1,
      connectNulls: e.handleMissing === "connect",
      areaStyle: {
        color: c.value,
        opacity: e.fillOpacity
      },
      lineStyle: {
        color: m.value,
        width: e.lineWidth,
        type: $[e.lineType || "solid"]
      },
      itemStyle: {
        color: m.value || c.value
      },
      symbol: e.markers ? e.markerShape : "none",
      symbolSize: e.markers ? e.markerSize : 0,
      label: e.labels ? {
        show: !0,
        position: e.labelPosition || "top",
        fontSize: e.labelSize || 11,
        color: v.value,
        formatter: (T) => {
          const F = T.value[1];
          return e.labelFmt || e.yLabelFmt ? K(F, f.value.y, h.value.y) : String(F);
        }
      } : void 0,
      emphasis: {
        focus: "series"
      }
    })), L = O(() => {
      if (!e.x || !e.y) return [];
      let T = s.value;
      if (e.handleMissing === "zero") {
        const F = Array.isArray(e.y) ? e.y : [e.y];
        T = T.map((G) => {
          const j = { ...G };
          for (const U of F)
            j[U] == null && (j[U] = 0);
          return j;
        });
      }
      return dt(
        T,
        e.x,
        e.y,
        e.series,
        !1,
        I.value,
        u.value,
        {
          seriesOrder: e.seriesOrder
        }
      );
    }), p = O(() => {
      const T = { ...d.value };
      if (T.series = L.value, C.value && (T.color = C.value), e.type === "stacked100") {
        const F = T.yAxis;
        F && (F.max = 1, F.axisLabel = {
          ...F.axisLabel,
          formatter: (G) => `${Math.round(G * 100)}%`
        });
      }
      return T;
    }), B = ie(!1);
    return (T, F) => (fe(), ye(we, {
      config: p.value,
      height: e.height,
      width: e.width,
      theme: Q(r),
      renderer: e.renderer,
      "connect-group": e.connectGroup,
      "series-colors": x.value,
      "echarts-options": e.echartsOptions,
      "series-options": e.seriesOptions,
      "show-all-x-axis-labels": e.showAllXAxisLabels,
      onClick: F[0] || (F[0] = (G) => o("click", G)),
      onMouseenter: F[1] || (F[1] = (G) => B.value = !0),
      onMouseleave: F[2] || (F[2] = (G) => B.value = !1)
    }, {
      footer: ve(() => [
        xe(Ce, {
          config: p.value,
          data: Q(s),
          "chart-title": e.title,
          theme: Q(r),
          "series-colors": x.value,
          "echarts-options": e.echartsOptions,
          "series-options": e.seriesOptions,
          "downloadable-data": e.downloadableData,
          "downloadable-image": e.downloadableImage,
          visible: B.value
        }, null, 8, ["config", "data", "chart-title", "theme", "series-colors", "echarts-options", "series-options", "downloadable-data", "downloadable-image", "visible"])
      ]),
      _: 1
    }, 8, ["config", "height", "width", "theme", "renderer", "connect-group", "series-colors", "echarts-options", "series-options", "show-all-x-axis-labels"]));
  }
}), ai = /* @__PURE__ */ he({
  __name: "ScatterPlot",
  props: {
    pointColor: {},
    pointOpacity: { default: 0.7 },
    pointSize: { default: 10 },
    pointShape: { default: "circle" },
    outlineColor: {},
    outlineWidth: { default: 1 },
    data: {},
    x: {},
    y: {},
    y2: {},
    series: {},
    size: {},
    tooltipTitle: {},
    xFmt: {},
    yFmt: {},
    y2Fmt: {},
    sizeFmt: {},
    labelFmt: {},
    yLabelFmt: {},
    y2LabelFmt: {},
    title: {},
    subtitle: {},
    xAxisTitle: { type: [String, Boolean] },
    yAxisTitle: { type: [String, Boolean] },
    y2AxisTitle: { type: [String, Boolean] },
    xType: {},
    xMin: {},
    xMax: {},
    xBaseline: { type: Boolean, default: !0 },
    xTickMarks: { type: Boolean },
    xGridlines: { type: Boolean },
    xAxisLabels: { type: Boolean, default: !0 },
    showAllXAxisLabels: { type: Boolean },
    xLabelWrap: { type: Boolean },
    yType: {},
    yLog: { type: Boolean },
    yLogBase: {},
    yMin: {},
    yMax: {},
    yScale: { type: Boolean },
    yBaseline: { type: Boolean },
    yTickMarks: { type: Boolean },
    yGridlines: { type: Boolean, default: !0 },
    yAxisLabels: { type: Boolean, default: !0 },
    yAxisColor: {},
    y2Min: {},
    y2Max: {},
    y2Scale: { type: Boolean },
    y2Baseline: { type: Boolean },
    y2TickMarks: { type: Boolean },
    y2Gridlines: { type: Boolean },
    y2AxisLabels: { type: Boolean },
    y2AxisColor: {},
    legend: { type: Boolean },
    height: {},
    width: {},
    chartAreaHeight: {},
    swapXY: { type: Boolean },
    sort: { type: Boolean },
    colorPalette: {},
    seriesColors: {},
    echartsOptions: {},
    seriesOptions: {},
    renderer: {},
    connectGroup: {},
    downloadableData: { type: Boolean, default: !0 },
    downloadableImage: { type: Boolean, default: !0 },
    leftPadding: {},
    rightPadding: {}
  },
  emits: ["click"],
  setup(t, { emit: a }) {
    const e = t, o = a, { activeAppearance: r, resolveColor: n, resolveColorPalette: l, resolveColorsObject: i } = me(), { scatterFormatter: s } = ba(), {
      processedData: u,
      columnSummary: y,
      xAxisType: d,
      baseConfig: f,
      formats: h,
      unitSummaries: c
    } = Ve({
      ...e,
      xType: e.xType || "value"
      // Default to value axis for scatter
    }), m = O(
      () => e.pointColor ? n(e.pointColor).value : void 0
    ), v = O(
      () => e.outlineColor ? n(e.outlineColor).value : void 0
    ), C = O(
      () => l(e.colorPalette || "default").value
    ), x = O(
      () => e.seriesColors ? i(e.seriesColors).value : void 0
    ), $ = O(() => ({
      type: "scatter",
      symbol: e.pointShape,
      symbolSize: e.pointSize,
      itemStyle: {
        color: m.value,
        opacity: e.pointOpacity,
        borderColor: v.value,
        borderWidth: e.outlineWidth
      },
      emphasis: {
        focus: "series",
        itemStyle: {
          borderWidth: (e.outlineWidth || 1) + 1
        }
      }
    })), M = O(() => !e.x || !e.y ? [] : dt(
      u.value,
      e.x,
      e.y,
      e.series,
      !1,
      $.value,
      y.value,
      {
        tooltipTitle: e.tooltipTitle
      }
    )), I = O(() => {
      const p = { ...f.value };
      return p.series = M.value, C.value && (p.color = C.value), p.tooltip = {
        ...p.tooltip,
        trigger: "item",
        formatter: (B) => s(B, {
          xColumn: e.x,
          yColumn: e.y,
          xFormat: h.value.x,
          yFormat: h.value.y,
          tooltipTitle: e.tooltipTitle
        })
      }, e.xType || (p.xAxis.type = "value"), p;
    }), L = ie(!1);
    return (p, B) => (fe(), ye(we, {
      config: I.value,
      height: e.height,
      width: e.width,
      theme: Q(r),
      renderer: e.renderer,
      "connect-group": e.connectGroup,
      "series-colors": x.value,
      "echarts-options": e.echartsOptions,
      "series-options": e.seriesOptions,
      onClick: B[0] || (B[0] = (T) => o("click", T)),
      onMouseenter: B[1] || (B[1] = (T) => L.value = !0),
      onMouseleave: B[2] || (B[2] = (T) => L.value = !1)
    }, {
      footer: ve(() => [
        xe(Ce, {
          config: I.value,
          data: Q(u),
          "chart-title": e.title,
          theme: Q(r),
          "series-colors": x.value,
          "echarts-options": e.echartsOptions,
          "series-options": e.seriesOptions,
          "downloadable-data": e.downloadableData,
          "downloadable-image": e.downloadableImage,
          visible: L.value
        }, null, 8, ["config", "data", "chart-title", "theme", "series-colors", "echarts-options", "series-options", "downloadable-data", "downloadable-image", "visible"])
      ]),
      _: 1
    }, 8, ["config", "height", "width", "theme", "renderer", "connect-group", "series-colors", "echarts-options", "series-options"]));
  }
}), oi = /* @__PURE__ */ he({
  __name: "BubbleChart",
  props: {
    pointColor: {},
    pointOpacity: { default: 0.7 },
    minSize: { default: 5 },
    maxSize: { default: 50 },
    outlineColor: {},
    outlineWidth: { default: 1 },
    data: {},
    x: {},
    y: {},
    y2: {},
    series: {},
    size: {},
    tooltipTitle: {},
    xFmt: {},
    yFmt: {},
    y2Fmt: {},
    sizeFmt: {},
    labelFmt: {},
    yLabelFmt: {},
    y2LabelFmt: {},
    title: {},
    subtitle: {},
    xAxisTitle: { type: [String, Boolean] },
    yAxisTitle: { type: [String, Boolean] },
    y2AxisTitle: { type: [String, Boolean] },
    xType: {},
    xMin: {},
    xMax: {},
    xBaseline: { type: Boolean, default: !0 },
    xTickMarks: { type: Boolean },
    xGridlines: { type: Boolean },
    xAxisLabels: { type: Boolean, default: !0 },
    showAllXAxisLabels: { type: Boolean },
    xLabelWrap: { type: Boolean },
    yType: {},
    yLog: { type: Boolean },
    yLogBase: {},
    yMin: {},
    yMax: {},
    yScale: { type: Boolean },
    yBaseline: { type: Boolean },
    yTickMarks: { type: Boolean },
    yGridlines: { type: Boolean, default: !0 },
    yAxisLabels: { type: Boolean, default: !0 },
    yAxisColor: {},
    y2Min: {},
    y2Max: {},
    y2Scale: { type: Boolean },
    y2Baseline: { type: Boolean },
    y2TickMarks: { type: Boolean },
    y2Gridlines: { type: Boolean },
    y2AxisLabels: { type: Boolean },
    y2AxisColor: {},
    legend: { type: Boolean },
    height: {},
    width: {},
    chartAreaHeight: {},
    swapXY: { type: Boolean },
    sort: { type: Boolean },
    colorPalette: {},
    seriesColors: {},
    echartsOptions: {},
    seriesOptions: {},
    renderer: {},
    connectGroup: {},
    downloadableData: { type: Boolean, default: !0 },
    downloadableImage: { type: Boolean, default: !0 },
    leftPadding: {},
    rightPadding: {}
  },
  emits: ["click"],
  setup(t, { emit: a }) {
    const e = t, o = a, { activeAppearance: r, resolveColor: n, resolveColorPalette: l, resolveColorsObject: i } = me(), { scatterFormatter: s } = ba(), {
      processedData: u,
      columnSummary: y,
      xAxisType: d,
      baseConfig: f,
      formats: h,
      unitSummaries: c
    } = Ve({
      ...e,
      xType: e.xType || "value"
    }), m = O(
      () => e.pointColor ? n(e.pointColor).value : void 0
    ), v = O(
      () => e.outlineColor ? n(e.outlineColor).value : void 0
    ), C = O(
      () => l(e.colorPalette || "default").value
    ), x = O(
      () => e.seriesColors ? i(e.seriesColors).value : void 0
    ), $ = O(() => {
      if (e.sizeFmt)
        return de(e.sizeFmt);
      if (e.size && y.value[e.size])
        return y.value[e.size].format;
    }), M = O(() => {
      if (!e.size || !u.value.length)
        return { min: 0, max: 1 };
      const T = u.value.map((F) => F[e.size]).filter((F) => F != null && !isNaN(F));
      return {
        min: Math.min(...T),
        max: Math.max(...T)
      };
    }), I = O(() => ({
      type: "scatter",
      itemStyle: {
        color: m.value,
        opacity: e.pointOpacity,
        borderColor: v.value,
        borderWidth: e.outlineWidth
      },
      emphasis: {
        focus: "series",
        itemStyle: {
          borderWidth: (e.outlineWidth || 1) + 1
        }
      }
    })), L = O(() => {
      if (!e.x || !e.y || !e.size) return [];
      const T = dt(
        u.value,
        e.x,
        e.y,
        e.series,
        !1,
        I.value,
        y.value,
        {
          size: e.size,
          tooltipTitle: e.tooltipTitle
        }
      ), { min: F, max: G } = M.value, j = G - F || 1;
      return T.map((U) => ({
        ...U,
        symbolSize: (le) => {
          const be = le[2];
          if (be == null) return e.minSize;
          const Pe = (be - F) / j;
          return e.minSize + Pe * (e.maxSize - e.minSize);
        }
      }));
    }), p = O(() => {
      const T = { ...f.value };
      return T.series = L.value, C.value && (T.color = C.value), T.tooltip = {
        ...T.tooltip,
        trigger: "item",
        formatter: (F) => s(F, {
          xColumn: e.x,
          yColumn: e.y,
          xFormat: h.value.x,
          yFormat: h.value.y,
          size: e.size,
          sizeFormat: $.value,
          tooltipTitle: e.tooltipTitle
        })
      }, e.xType || (T.xAxis.type = "value"), T;
    }), B = ie(!1);
    return (T, F) => (fe(), ye(we, {
      config: p.value,
      height: e.height,
      width: e.width,
      theme: Q(r),
      renderer: e.renderer,
      "connect-group": e.connectGroup,
      "series-colors": x.value,
      "echarts-options": e.echartsOptions,
      "series-options": e.seriesOptions,
      onClick: F[0] || (F[0] = (G) => o("click", G)),
      onMouseenter: F[1] || (F[1] = (G) => B.value = !0),
      onMouseleave: F[2] || (F[2] = (G) => B.value = !1)
    }, {
      footer: ve(() => [
        xe(Ce, {
          config: p.value,
          data: Q(u),
          "chart-title": e.title,
          theme: Q(r),
          "series-colors": x.value,
          "echarts-options": e.echartsOptions,
          "series-options": e.seriesOptions,
          "downloadable-data": e.downloadableData,
          "downloadable-image": e.downloadableImage,
          visible: B.value
        }, null, 8, ["config", "data", "chart-title", "theme", "series-colors", "echarts-options", "series-options", "downloadable-data", "downloadable-image", "visible"])
      ]),
      _: 1
    }, 8, ["config", "height", "width", "theme", "renderer", "connect-group", "series-colors", "echarts-options", "series-options"]));
  }
}), ri = /* @__PURE__ */ he({
  __name: "BoxPlot",
  props: {
    min: {},
    max: {},
    midpoint: {},
    confidenceIntervalLower: {},
    confidenceIntervalUpper: {},
    fillColor: {},
    fillOpacity: { default: 0.8 },
    outlineColor: {},
    outlineWidth: { default: 1.5 },
    data: {},
    x: {},
    y: {},
    y2: {},
    series: {},
    size: {},
    tooltipTitle: {},
    xFmt: {},
    yFmt: {},
    y2Fmt: {},
    sizeFmt: {},
    labelFmt: {},
    yLabelFmt: {},
    y2LabelFmt: {},
    title: {},
    subtitle: {},
    xAxisTitle: { type: [String, Boolean] },
    yAxisTitle: { type: [String, Boolean] },
    y2AxisTitle: { type: [String, Boolean] },
    xType: {},
    xMin: {},
    xMax: {},
    xBaseline: { type: Boolean, default: !0 },
    xTickMarks: { type: Boolean },
    xGridlines: { type: Boolean },
    xAxisLabels: { type: Boolean, default: !0 },
    showAllXAxisLabels: { type: Boolean },
    xLabelWrap: { type: Boolean },
    yType: {},
    yLog: { type: Boolean },
    yLogBase: {},
    yMin: {},
    yMax: {},
    yScale: { type: Boolean },
    yBaseline: { type: Boolean },
    yTickMarks: { type: Boolean },
    yGridlines: { type: Boolean, default: !0 },
    yAxisLabels: { type: Boolean, default: !0 },
    yAxisColor: {},
    y2Min: {},
    y2Max: {},
    y2Scale: { type: Boolean },
    y2Baseline: { type: Boolean },
    y2TickMarks: { type: Boolean },
    y2Gridlines: { type: Boolean },
    y2AxisLabels: { type: Boolean },
    y2AxisColor: {},
    legend: { type: Boolean },
    height: {},
    width: {},
    chartAreaHeight: {},
    swapXY: { type: Boolean },
    sort: { type: Boolean },
    colorPalette: {},
    seriesColors: {},
    echartsOptions: {},
    seriesOptions: {},
    renderer: {},
    connectGroup: {},
    downloadableData: { type: Boolean, default: !0 },
    downloadableImage: { type: Boolean, default: !0 },
    leftPadding: {},
    rightPadding: {}
  },
  emits: ["click"],
  setup(t, { emit: a }) {
    const e = t, o = a, { activeAppearance: r, resolveColor: n, resolveColorPalette: l } = me(), {
      processedData: i,
      columnSummary: s,
      baseConfig: u,
      formats: y,
      unitSummaries: d
    } = Ve({
      ...e
    }), f = O(
      () => e.fillColor ? n(e.fillColor).value : void 0
    ), h = O(
      () => e.outlineColor ? n(e.outlineColor).value : void 0
    ), c = O(
      () => l(e.colorPalette || "default").value
    ), m = O(() => {
      if (!e.x) return { categories: [], data: [] };
      const x = ct(i.value, e.x), $ = x.map((M) => {
        const I = i.value.find((G) => G[e.x] === M);
        if (!I) return [0, 0, 0, 0, 0];
        const L = I[e.min] ?? 0, p = I[e.confidenceIntervalLower] ?? 0, B = I[e.midpoint] ?? 0, T = I[e.confidenceIntervalUpper] ?? 0, F = I[e.max] ?? 0;
        return [L, p, B, T, F];
      });
      return { categories: x, data: $ };
    }), v = O(() => {
      const x = { ...u.value }, { categories: $, data: M } = m.value;
      return x.xAxis = {
        ...x.xAxis,
        type: "category",
        data: $
      }, x.yAxis = {
        ...x.yAxis,
        type: "value"
      }, x.series = [
        {
          name: "boxplot",
          type: "boxplot",
          data: M,
          itemStyle: {
            color: f.value,
            opacity: e.fillOpacity,
            borderColor: h.value,
            borderWidth: e.outlineWidth
          }
        }
      ], c.value && (x.color = c.value), x.tooltip = {
        ...x.tooltip,
        trigger: "item",
        formatter: (I) => {
          const L = I, [p, B, T, F, G] = L.value;
          let j = `<span style='font-weight: 600;'>${L.name}</span><br/>`;
          return j += `Min: <span style='float:right; margin-left: 10px;'>${K(p, y.value.y, d.value.y)}</span><br/>`, j += `Q1: <span style='float:right; margin-left: 10px;'>${K(B, y.value.y, d.value.y)}</span><br/>`, j += `Median: <span style='float:right; margin-left: 10px;'>${K(T, y.value.y, d.value.y)}</span><br/>`, j += `Q3: <span style='float:right; margin-left: 10px;'>${K(F, y.value.y, d.value.y)}</span><br/>`, j += `Max: <span style='float:right; margin-left: 10px;'>${K(G, y.value.y, d.value.y)}</span>`, j;
        }
      }, x;
    }), C = ie(!1);
    return (x, $) => (fe(), ye(we, {
      config: v.value,
      height: e.height,
      width: e.width,
      theme: Q(r),
      renderer: e.renderer,
      "connect-group": e.connectGroup,
      "echarts-options": e.echartsOptions,
      "series-options": e.seriesOptions,
      onClick: $[0] || ($[0] = (M) => o("click", M)),
      onMouseenter: $[1] || ($[1] = (M) => C.value = !0),
      onMouseleave: $[2] || ($[2] = (M) => C.value = !1)
    }, {
      footer: ve(() => [
        xe(Ce, {
          config: v.value,
          data: Q(i),
          "chart-title": e.title,
          theme: Q(r),
          "echarts-options": e.echartsOptions,
          "series-options": e.seriesOptions,
          "downloadable-data": e.downloadableData,
          "downloadable-image": e.downloadableImage,
          visible: C.value
        }, null, 8, ["config", "data", "chart-title", "theme", "echarts-options", "series-options", "downloadable-data", "downloadable-image", "visible"])
      ]),
      _: 1
    }, 8, ["config", "height", "width", "theme", "renderer", "connect-group", "echarts-options", "series-options"]));
  }
}), ni = /* @__PURE__ */ he({
  __name: "Histogram",
  props: {
    fillColor: {},
    fillOpacity: { default: 0.8 },
    outlineColor: {},
    outlineWidth: { default: 1 },
    bins: { default: 10 },
    data: {},
    x: {},
    y: {},
    y2: {},
    series: {},
    size: {},
    tooltipTitle: {},
    xFmt: {},
    yFmt: {},
    y2Fmt: {},
    sizeFmt: {},
    labelFmt: {},
    yLabelFmt: {},
    y2LabelFmt: {},
    title: {},
    subtitle: {},
    xAxisTitle: { type: [String, Boolean] },
    yAxisTitle: { type: [String, Boolean] },
    y2AxisTitle: { type: [String, Boolean] },
    xType: {},
    xMin: {},
    xMax: {},
    xBaseline: { type: Boolean, default: !0 },
    xTickMarks: { type: Boolean },
    xGridlines: { type: Boolean },
    xAxisLabels: { type: Boolean, default: !0 },
    showAllXAxisLabels: { type: Boolean },
    xLabelWrap: { type: Boolean },
    yType: {},
    yLog: { type: Boolean },
    yLogBase: {},
    yMin: {},
    yMax: {},
    yScale: { type: Boolean },
    yBaseline: { type: Boolean },
    yTickMarks: { type: Boolean },
    yGridlines: { type: Boolean, default: !0 },
    yAxisLabels: { type: Boolean, default: !0 },
    yAxisColor: {},
    y2Min: {},
    y2Max: {},
    y2Scale: { type: Boolean },
    y2Baseline: { type: Boolean },
    y2TickMarks: { type: Boolean },
    y2Gridlines: { type: Boolean },
    y2AxisLabels: { type: Boolean },
    y2AxisColor: {},
    legend: { type: Boolean },
    height: {},
    width: {},
    chartAreaHeight: {},
    swapXY: { type: Boolean },
    sort: { type: Boolean },
    colorPalette: {},
    seriesColors: {},
    echartsOptions: {},
    seriesOptions: {},
    renderer: {},
    connectGroup: {},
    downloadableData: { type: Boolean, default: !0 },
    downloadableImage: { type: Boolean, default: !0 },
    leftPadding: {},
    rightPadding: {}
  },
  emits: ["click"],
  setup(t, { emit: a }) {
    const e = t, o = a, { activeAppearance: r, resolveColor: n, resolveColorPalette: l } = me(), {
      processedData: i,
      columnSummary: s,
      baseConfig: u,
      formats: y,
      unitSummaries: d
    } = Ve({
      ...e
    }), f = O(
      () => e.fillColor ? n(e.fillColor).value : void 0
    ), h = O(
      () => e.outlineColor ? n(e.outlineColor).value : void 0
    ), c = O(
      () => l(e.colorPalette || "default").value
    ), m = O(() => {
      if (!e.x || !i.value.length)
        return { bins: [], counts: [] };
      const x = i.value.map((T) => T[e.x]).filter((T) => T != null && !isNaN(T)).sort((T, F) => T - F);
      if (x.length === 0)
        return { bins: [], counts: [] };
      const $ = x[0], L = (x[x.length - 1] - $) / e.bins, p = [], B = [];
      for (let T = 0; T < e.bins; T++) {
        const F = $ + T * L, G = $ + (T + 1) * L;
        p.push({
          start: F,
          end: G,
          label: `${K(F, y.value.x, d.value.x)} - ${K(G, y.value.x, d.value.x)}`
        });
        const j = x.filter((U) => T === e.bins - 1 ? U >= F && U <= G : U >= F && U < G).length;
        B.push(j);
      }
      return { bins: p, counts: B };
    }), v = O(() => {
      var L;
      const x = { ...u.value }, { bins: $, counts: M } = m.value, I = x.xAxis;
      return x.xAxis = {
        ...I,
        type: "category",
        data: $.map((p) => p.label),
        axisLabel: {
          ...I == null ? void 0 : I.axisLabel,
          rotate: 45,
          interval: 0
        }
      }, x.yAxis = {
        ...x.yAxis,
        type: "value",
        name: "Count"
      }, x.series = [
        {
          name: "Frequency",
          type: "bar",
          data: M,
          barWidth: "90%",
          itemStyle: {
            color: f.value || ((L = c.value) == null ? void 0 : L[0]),
            opacity: e.fillOpacity,
            borderColor: h.value,
            borderWidth: e.outlineWidth
          }
        }
      ], c.value && (x.color = c.value), x.tooltip = {
        ...x.tooltip,
        trigger: "axis",
        axisPointer: { type: "shadow" },
        formatter: (p) => {
          const T = p[0];
          return `<span style='font-weight: 600;'>${T.name}</span><br/>Count: <span style='float:right; margin-left: 10px;'>${T.value}</span>`;
        }
      }, x;
    }), C = ie(!1);
    return (x, $) => (fe(), ye(we, {
      config: v.value,
      height: e.height,
      width: e.width,
      theme: Q(r),
      renderer: e.renderer,
      "connect-group": e.connectGroup,
      "echarts-options": e.echartsOptions,
      "series-options": e.seriesOptions,
      onClick: $[0] || ($[0] = (M) => o("click", M)),
      onMouseenter: $[1] || ($[1] = (M) => C.value = !0),
      onMouseleave: $[2] || ($[2] = (M) => C.value = !1)
    }, {
      footer: ve(() => [
        xe(Ce, {
          config: v.value,
          data: Q(i),
          "chart-title": e.title,
          theme: Q(r),
          "echarts-options": e.echartsOptions,
          "series-options": e.seriesOptions,
          "downloadable-data": e.downloadableData,
          "downloadable-image": e.downloadableImage,
          visible: C.value
        }, null, 8, ["config", "data", "chart-title", "theme", "echarts-options", "series-options", "downloadable-data", "downloadable-image", "visible"])
      ]),
      _: 1
    }, 8, ["config", "height", "width", "theme", "renderer", "connect-group", "echarts-options", "series-options"]));
  }
}), li = /* @__PURE__ */ he({
  __name: "FunnelChart",
  props: {
    data: {},
    name: {},
    value: {},
    title: {},
    subtitle: {},
    legend: { type: Boolean, default: !0 },
    height: { default: "400px" },
    width: { default: "100%" },
    chartAreaHeight: {},
    colorPalette: {},
    valueFmt: {},
    percentFmt: {},
    showPercent: { type: Boolean, default: !0 },
    echartsOptions: {},
    renderer: {},
    downloadableData: { type: Boolean, default: !0 },
    downloadableImage: { type: Boolean, default: !0 }
  },
  emits: ["click"],
  setup(t, { emit: a }) {
    const e = t, o = a, { activeAppearance: r, resolveColorPalette: n } = me(), l = O(
      () => n(e.colorPalette || "default").value
    ), i = O(
      () => e.valueFmt ? de(e.valueFmt) : void 0
    ), s = O(
      () => e.percentFmt ? de(e.percentFmt) : { formatTag: "pct1", formatCode: "#,##0.0%", valueType: "number" }
    ), u = O(() => {
      var m;
      if (!((m = e.data) != null && m.length)) return [];
      const h = e.name || Object.keys(e.data[0])[0], c = e.value || Object.keys(e.data[0])[1];
      return e.data.map((v) => ({
        name: String(v[h]),
        value: v[c]
      }));
    }), y = O(() => u.value.length ? Math.max(...u.value.map((h) => h.value)) : 0), d = O(() => {
      const h = !!e.title, c = !!e.subtitle, m = e.legend, v = (h ? 15 : 0) + (c ? 13 : 0) + (h || c ? 6 : 0), C = m ? 25 : 0, x = v + 7, $ = x + C + 10;
      return {
        title: {
          text: e.title,
          subtext: e.subtitle
        },
        tooltip: {
          trigger: "item",
          formatter: (M) => {
            const I = M;
            let L = `<span style='font-weight: 600;'>${I.name}</span><br/>`;
            if (L += `Value: <span style='float:right; margin-left: 10px;'>${K(I.value, i.value)}</span>`, e.showPercent && y.value > 0) {
              const p = I.value / y.value;
              L += `<br/>Percent: <span style='float:right; margin-left: 10px;'>${K(p, s.value)}</span>`;
            }
            return L;
          }
        },
        legend: {
          show: e.legend,
          type: "scroll",
          top: x,
          data: u.value.map((M) => M.name)
        },
        series: [
          {
            name: "Funnel",
            type: "funnel",
            left: "10%",
            top: $,
            bottom: 20,
            width: "80%",
            min: 0,
            max: y.value || 100,
            minSize: "0%",
            maxSize: "100%",
            sort: "descending",
            gap: 2,
            label: {
              show: !0,
              position: "inside",
              formatter: (M) => {
                const I = M;
                if (e.showPercent && y.value > 0) {
                  const L = I.value / y.value;
                  return `${I.name}
${K(L, s.value)}`;
                }
                return I.name;
              }
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: "solid"
              }
            },
            itemStyle: {
              borderColor: "#fff",
              borderWidth: 1
            },
            emphasis: {
              label: {
                fontSize: 14
              }
            },
            data: u.value
          }
        ],
        color: l.value
      };
    }), f = ie(!1);
    return (h, c) => (fe(), ye(we, {
      config: d.value,
      height: e.height,
      width: e.width,
      theme: Q(r),
      renderer: e.renderer,
      "echarts-options": e.echartsOptions,
      onClick: c[0] || (c[0] = (m) => o("click", m)),
      onMouseenter: c[1] || (c[1] = (m) => f.value = !0),
      onMouseleave: c[2] || (c[2] = (m) => f.value = !1)
    }, {
      footer: ve(() => [
        xe(Ce, {
          config: d.value,
          data: e.data,
          "chart-title": e.title,
          theme: Q(r),
          "echarts-options": e.echartsOptions,
          "downloadable-data": e.downloadableData,
          "downloadable-image": e.downloadableImage,
          visible: f.value
        }, null, 8, ["config", "data", "chart-title", "theme", "echarts-options", "downloadable-data", "downloadable-image", "visible"])
      ]),
      _: 1
    }, 8, ["config", "height", "width", "theme", "renderer", "echarts-options"]));
  }
}), ii = /* @__PURE__ */ he({
  __name: "Heatmap",
  props: {
    data: {},
    x: {},
    y: {},
    value: {},
    title: {},
    subtitle: {},
    legend: { type: Boolean, default: !0 },
    height: { default: "400px" },
    width: { default: "100%" },
    chartAreaHeight: {},
    colorScale: {},
    xFmt: {},
    yFmt: {},
    valueFmt: {},
    min: {},
    max: {},
    nullsZero: { type: Boolean, default: !1 },
    echartsOptions: {},
    renderer: {},
    downloadableData: { type: Boolean, default: !0 },
    downloadableImage: { type: Boolean, default: !0 }
  },
  emits: ["click"],
  setup(t, { emit: a }) {
    const e = t, o = a, { activeAppearance: r, resolveColorScale: n } = me(), l = O(
      () => n(e.colorScale || "default").value
    ), i = O(
      () => e.xFmt ? de(e.xFmt) : void 0
    ), s = O(
      () => e.yFmt ? de(e.yFmt) : void 0
    ), u = O(
      () => e.valueFmt ? de(e.valueFmt) : void 0
    ), y = O(() => {
      var x;
      if (!((x = e.data) != null && x.length) || !e.x || !e.y || !e.value)
        return { xCategories: [], yCategories: [], data: [], min: 0, max: 0 };
      const h = ct(e.data, e.x).map(String), c = ct(e.data, e.y).map(String), m = [];
      let v = 1 / 0, C = -1 / 0;
      for (const $ of e.data) {
        const M = String($[e.x]), I = String($[e.y]), L = $[e.value], p = h.indexOf(M), B = c.indexOf(I);
        if (p !== -1 && B !== -1) {
          const T = e.nullsZero && L == null ? 0 : L;
          m.push([p, B, T]), T != null && (v = Math.min(v, T), C = Math.max(C, T));
        }
      }
      return v === 1 / 0 && (v = 0), C === -1 / 0 && (C = 0), e.min !== void 0 && (v = e.min), e.max !== void 0 && (C = e.max), { xCategories: h, yCategories: c, data: m, min: v, max: C };
    }), d = O(() => {
      const { xCategories: h, yCategories: c, data: m, min: v, max: C } = y.value, x = !!e.title, $ = !!e.subtitle, M = (x ? 15 : 0) + ($ ? 13 : 0) + (x || $ ? 6 : 0);
      return {
        title: {
          text: e.title,
          subtext: e.subtitle
        },
        tooltip: {
          trigger: "item",
          position: "top",
          formatter: (I) => {
            const L = I, [p, B, T] = L.value, F = h[p], G = c[B];
            let j = `<span style='font-weight: 600;'>${K(F, i.value)} / ${K(G, s.value)}</span><br/>`;
            return j += `Value: <span style='float:right; margin-left: 10px;'>${T != null ? K(T, u.value) : "-"}</span>`, j;
          }
        },
        grid: {
          left: "3%",
          right: "10%",
          bottom: "10%",
          top: M + 20,
          containLabel: !0
        },
        xAxis: {
          type: "category",
          data: h,
          splitArea: { show: !0 },
          axisLabel: {
            rotate: h.length > 10 ? 45 : 0
          }
        },
        yAxis: {
          type: "category",
          data: c,
          splitArea: { show: !0 }
        },
        visualMap: {
          show: e.legend,
          min: v,
          max: C,
          calculable: !0,
          orient: "vertical",
          right: "2%",
          top: "center",
          inRange: {
            color: l.value || ["#f0f9e8", "#0868ac"]
          }
        },
        series: [
          {
            name: "Heatmap",
            type: "heatmap",
            data: m,
            label: {
              show: !1
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
    }), f = ie(!1);
    return (h, c) => (fe(), ye(we, {
      config: d.value,
      height: e.height,
      width: e.width,
      theme: Q(r),
      renderer: e.renderer,
      "echarts-options": e.echartsOptions,
      onClick: c[0] || (c[0] = (m) => o("click", m)),
      onMouseenter: c[1] || (c[1] = (m) => f.value = !0),
      onMouseleave: c[2] || (c[2] = (m) => f.value = !1)
    }, {
      footer: ve(() => [
        xe(Ce, {
          config: d.value,
          data: e.data,
          "chart-title": e.title,
          theme: Q(r),
          "echarts-options": e.echartsOptions,
          "downloadable-data": e.downloadableData,
          "downloadable-image": e.downloadableImage,
          visible: f.value
        }, null, 8, ["config", "data", "chart-title", "theme", "echarts-options", "downloadable-data", "downloadable-image", "visible"])
      ]),
      _: 1
    }, 8, ["config", "height", "width", "theme", "renderer", "echarts-options"]));
  }
}), si = /* @__PURE__ */ he({
  __name: "CalendarHeatmap",
  props: {
    data: {},
    date: {},
    value: {},
    title: {},
    subtitle: {},
    legend: { type: Boolean, default: !0 },
    height: { default: "200px" },
    width: { default: "100%" },
    colorScale: {},
    valueFmt: {},
    min: {},
    max: {},
    echartsOptions: {},
    renderer: {},
    downloadableData: { type: Boolean, default: !0 },
    downloadableImage: { type: Boolean, default: !0 }
  },
  emits: ["click"],
  setup(t, { emit: a }) {
    const e = t, o = a, { activeAppearance: r, resolveColorScale: n } = me(), l = O(
      () => n(e.colorScale || "green").value
    ), i = O(
      () => e.valueFmt ? de(e.valueFmt) : void 0
    ), s = O(() => {
      var $;
      if (!(($ = e.data) != null && $.length) || !e.date || !e.value)
        return { data: [], range: ["", ""], min: 0, max: 0 };
      const h = [];
      let c = 1 / 0, m = -1 / 0, v = null, C = null;
      for (const M of e.data) {
        const I = St(M[e.date]), L = new Date(I), p = M[e.value];
        if (!isNaN(L.getTime()) && p != null) {
          const B = L.toISOString().split("T")[0];
          h.push([B, p]), c = Math.min(c, p), m = Math.max(m, p), (!v || L < v) && (v = L), (!C || L > C) && (C = L);
        }
      }
      c === 1 / 0 && (c = 0), m === -1 / 0 && (m = 0), e.min !== void 0 && (c = e.min), e.max !== void 0 && (m = e.max);
      let x = ["", ""];
      if (v && C) {
        const M = v.getFullYear(), I = C.getFullYear();
        M === I ? x = [`${M}-01-01`, `${M}-12-31`] : x = [`${M}-01-01`, `${I}-12-31`];
      }
      return { data: h, range: x, min: c, max: m };
    }), u = O(() => {
      const { range: h } = s.value;
      if (!h[0] || !h[1]) return 1;
      const c = parseInt(h[0].split("-")[0]);
      return parseInt(h[1].split("-")[0]) - c + 1;
    }), y = O(() => {
      const { data: h, range: c, min: m, max: v } = s.value, C = 13, x = C * 7 + 40, $ = !!e.title, M = !!e.subtitle, I = ($ ? 15 : 0) + (M ? 13 : 0) + ($ || M ? 6 : 0), L = [], p = [], B = c[0] ? parseInt(c[0].split("-")[0]) : (/* @__PURE__ */ new Date()).getFullYear(), T = u.value;
      for (let F = 0; F < T; F++) {
        const G = B + F, j = I + 30 + F * x;
        L.push({
          top: j,
          left: 60,
          right: e.legend ? 100 : 30,
          cellSize: [C, C],
          range: `${G}`,
          itemStyle: {
            borderWidth: 0.5
          },
          yearLabel: { show: T > 1, position: "left" },
          monthLabel: { show: !0 },
          dayLabel: { firstDay: 0, show: !0 }
        }), p.push({
          type: "heatmap",
          coordinateSystem: "calendar",
          calendarIndex: F,
          data: h.filter((U) => U[0].startsWith(`${G}`))
        });
      }
      return {
        title: {
          text: e.title,
          subtext: e.subtitle
        },
        tooltip: {
          trigger: "item",
          formatter: (F) => {
            const G = F, [j, U] = G.value;
            let le = `<span style='font-weight: 600;'>${j}</span><br/>`;
            return le += `Value: <span style='float:right; margin-left: 10px;'>${K(U, i.value)}</span>`, le;
          }
        },
        visualMap: {
          show: e.legend,
          min: m,
          max: v,
          calculable: !0,
          orient: "vertical",
          right: "2%",
          top: "center",
          inRange: {
            color: l.value || ["#ebedf0", "#216e39"]
          }
        },
        calendar: L,
        series: p
      };
    }), d = O(() => e.height !== "200px" ? e.height : `${60 + u.value * 140}px`), f = ie(!1);
    return (h, c) => (fe(), ye(we, {
      config: y.value,
      height: d.value,
      width: e.width,
      theme: Q(r),
      renderer: e.renderer,
      "echarts-options": e.echartsOptions,
      onClick: c[0] || (c[0] = (m) => o("click", m)),
      onMouseenter: c[1] || (c[1] = (m) => f.value = !0),
      onMouseleave: c[2] || (c[2] = (m) => f.value = !1)
    }, {
      footer: ve(() => [
        xe(Ce, {
          config: y.value,
          data: e.data,
          "chart-title": e.title,
          theme: Q(r),
          "echarts-options": e.echartsOptions,
          "downloadable-data": e.downloadableData,
          "downloadable-image": e.downloadableImage,
          visible: f.value
        }, null, 8, ["config", "data", "chart-title", "theme", "echarts-options", "downloadable-data", "downloadable-image", "visible"])
      ]),
      _: 1
    }, 8, ["config", "height", "width", "theme", "renderer", "echarts-options"]));
  }
}), ci = /* @__PURE__ */ he({
  __name: "SankeyDiagram",
  props: {
    data: {},
    source: {},
    target: {},
    value: {},
    title: {},
    subtitle: {},
    height: { default: "400px" },
    width: { default: "100%" },
    chartAreaHeight: {},
    colorPalette: {},
    valueFmt: {},
    orient: { default: "horizontal" },
    nodeWidth: { default: 20 },
    nodeGap: { default: 8 },
    nodeAlign: { default: "justify" },
    echartsOptions: {},
    renderer: {},
    downloadableData: { type: Boolean, default: !0 },
    downloadableImage: { type: Boolean, default: !0 }
  },
  emits: ["click"],
  setup(t, { emit: a }) {
    const e = t, o = a, { activeAppearance: r, resolveColorPalette: n } = me(), l = O(
      () => n(e.colorPalette || "default").value
    ), i = O(
      () => e.valueFmt ? de(e.valueFmt) : void 0
    ), s = O(() => {
      var c;
      if (!((c = e.data) != null && c.length) || !e.source || !e.target || !e.value)
        return { nodes: [], links: [] };
      const d = /* @__PURE__ */ new Set(), f = [];
      for (const m of e.data) {
        const v = String(m[e.source]), C = String(m[e.target]), x = m[e.value];
        d.add(v), d.add(C), f.push({ source: v, target: C, value: x });
      }
      return { nodes: Array.from(d).map((m) => ({ name: m })), links: f };
    }), u = O(() => {
      const { nodes: d, links: f } = s.value, h = !!e.title, c = !!e.subtitle, m = (h ? 15 : 0) + (c ? 13 : 0) + (h || c ? 6 : 0);
      return {
        title: {
          text: e.title,
          subtext: e.subtitle
        },
        tooltip: {
          trigger: "item",
          triggerOn: "mousemove",
          formatter: (v) => {
            const C = v;
            return C.data.source && C.data.target ? `${C.data.source} → ${C.data.target}<br/>Value: ${K(C.data.value, i.value)}` : C.data.name || "";
          }
        },
        series: [
          {
            type: "sankey",
            orient: e.orient,
            nodeWidth: e.nodeWidth,
            nodeGap: e.nodeGap,
            nodeAlign: e.nodeAlign,
            layoutIterations: 32,
            left: "5%",
            right: "15%",
            top: m + 20,
            bottom: 20,
            data: d,
            links: f,
            emphasis: {
              focus: "adjacency"
            },
            lineStyle: {
              color: "gradient",
              curveness: 0.5
            },
            label: {
              show: !0,
              position: e.orient === "horizontal" ? "right" : "top"
            }
          }
        ],
        color: l.value
      };
    }), y = ie(!1);
    return (d, f) => (fe(), ye(we, {
      config: u.value,
      height: e.height,
      width: e.width,
      theme: Q(r),
      renderer: e.renderer,
      "echarts-options": e.echartsOptions,
      onClick: f[0] || (f[0] = (h) => o("click", h)),
      onMouseenter: f[1] || (f[1] = (h) => y.value = !0),
      onMouseleave: f[2] || (f[2] = (h) => y.value = !1)
    }, {
      footer: ve(() => [
        xe(Ce, {
          config: u.value,
          data: e.data,
          "chart-title": e.title,
          theme: Q(r),
          "echarts-options": e.echartsOptions,
          "downloadable-data": e.downloadableData,
          "downloadable-image": e.downloadableImage,
          visible: y.value
        }, null, 8, ["config", "data", "chart-title", "theme", "echarts-options", "downloadable-data", "downloadable-image", "visible"])
      ]),
      _: 1
    }, 8, ["config", "height", "width", "theme", "renderer", "echarts-options"]));
  }
}), Il = {
  key: 0,
  class: "map-loading"
}, zl = /* @__PURE__ */ he({
  __name: "USMap",
  props: {
    data: {},
    state: {},
    value: {},
    title: {},
    subtitle: {},
    legend: { type: Boolean, default: !0 },
    height: { default: "500px" },
    width: { default: "100%" },
    colorScale: {},
    valueFmt: {},
    min: {},
    max: {},
    link: {},
    echartsOptions: {},
    renderer: {},
    downloadableData: { type: Boolean, default: !0 },
    downloadableImage: { type: Boolean, default: !0 }
  },
  emits: ["click"],
  setup(t, { emit: a }) {
    Va((f) => ({
      v797cb4a2: e.height
    }));
    const e = t, o = a, { activeAppearance: r, resolveColorScale: n } = me(), l = O(
      () => n(e.colorScale || "blue").value
    ), i = O(
      () => e.valueFmt ? de(e.valueFmt) : void 0
    ), s = ie(!1);
    Re(async () => {
      try {
        const h = await (await fetch("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json")).json();
        ke.registerMap("USA", h), s.value = !0;
      } catch (f) {
        console.warn("Failed to load US GeoJSON:", f);
      }
    });
    const u = O(() => {
      var m;
      if (!((m = e.data) != null && m.length) || !e.state || !e.value)
        return { data: [], min: 0, max: 0 };
      let f = 1 / 0, h = -1 / 0;
      const c = e.data.map((v) => {
        const C = v[e.value];
        return C != null && (f = Math.min(f, C), h = Math.max(h, C)), {
          name: String(v[e.state]),
          value: C
        };
      });
      return f === 1 / 0 && (f = 0), h === -1 / 0 && (h = 0), e.min !== void 0 && (f = e.min), e.max !== void 0 && (h = e.max), { data: c, min: f, max: h };
    }), y = O(() => {
      const { data: f, min: h, max: c } = u.value;
      return {
        title: {
          text: e.title,
          subtext: e.subtitle
        },
        tooltip: {
          trigger: "item",
          formatter: (m) => {
            const v = m;
            let C = `<span style='font-weight: 600;'>${v.name}</span><br/>`;
            return C += `Value: <span style='float:right; margin-left: 10px;'>${v.value != null ? K(v.value, i.value) : "-"}</span>`, C;
          }
        },
        visualMap: {
          show: e.legend,
          min: h,
          max: c,
          left: "left",
          top: "bottom",
          calculable: !0,
          inRange: {
            color: l.value || ["#e0f3db", "#0868ac"]
          }
        },
        series: [
          {
            name: "USA",
            type: "map",
            map: "USA",
            roam: !0,
            emphasis: {
              label: {
                show: !0
              }
            },
            data: s.value ? f : []
          }
        ]
      };
    }), d = ie(!1);
    return (f, h) => s.value ? (fe(), ye(we, {
      key: 1,
      config: y.value,
      height: e.height,
      width: e.width,
      theme: Q(r),
      renderer: e.renderer,
      "echarts-options": e.echartsOptions,
      onClick: h[0] || (h[0] = (c) => o("click", c)),
      onMouseenter: h[1] || (h[1] = (c) => d.value = !0),
      onMouseleave: h[2] || (h[2] = (c) => d.value = !1)
    }, {
      footer: ve(() => [
        xe(Ce, {
          config: y.value,
          data: e.data,
          "chart-title": e.title,
          theme: Q(r),
          "echarts-options": e.echartsOptions,
          "downloadable-data": e.downloadableData,
          "downloadable-image": e.downloadableImage,
          visible: d.value
        }, null, 8, ["config", "data", "chart-title", "theme", "echarts-options", "downloadable-data", "downloadable-image", "visible"])
      ]),
      _: 1
    }, 8, ["config", "height", "width", "theme", "renderer", "echarts-options"])) : (fe(), Xe("div", Il, " Loading map data... "));
  }
}), ui = /* @__PURE__ */ Ot(zl, [["__scopeId", "data-v-a521e317"]]), El = {
  key: 0,
  class: "map-loading"
}, Pl = /* @__PURE__ */ he({
  __name: "AreaMap",
  props: {
    data: {},
    areaCol: {},
    geoJsonUrl: {},
    geoId: { default: "id" },
    value: {},
    title: {},
    subtitle: {},
    legend: { type: Boolean, default: !0 },
    height: { default: "500px" },
    width: { default: "100%" },
    colorScale: {},
    valueFmt: {},
    min: {},
    max: {},
    link: {},
    echartsOptions: {},
    renderer: {},
    downloadableData: { type: Boolean, default: !0 },
    downloadableImage: { type: Boolean, default: !0 }
  },
  emits: ["click"],
  setup(t, { emit: a }) {
    Va((c) => ({
      v9d05a9ca: e.height
    }));
    const e = t, o = a, { activeAppearance: r, resolveColorScale: n } = me(), l = O(
      () => n(e.colorScale || "blue").value
    ), i = O(
      () => e.valueFmt ? de(e.valueFmt) : void 0
    ), s = ie(!1), u = ie(`custom_map_${Date.now()}`), y = async () => {
      if (e.geoJsonUrl)
        try {
          const m = await (await fetch(e.geoJsonUrl)).json();
          ke.registerMap(u.value, m), s.value = !0;
        } catch (c) {
          console.error("Failed to load GeoJSON:", c), s.value = !1;
        }
    };
    Re(() => {
      y();
    }), De(() => e.geoJsonUrl, () => {
      s.value = !1, u.value = `custom_map_${Date.now()}`, y();
    });
    const d = O(() => {
      var C;
      if (!((C = e.data) != null && C.length) || !e.areaCol || !e.value)
        return { data: [], min: 0, max: 0 };
      let c = 1 / 0, m = -1 / 0;
      const v = e.data.map((x) => {
        const $ = x[e.value];
        return $ != null && (c = Math.min(c, $), m = Math.max(m, $)), {
          name: String(x[e.areaCol]),
          value: $
        };
      });
      return c === 1 / 0 && (c = 0), m === -1 / 0 && (m = 0), e.min !== void 0 && (c = e.min), e.max !== void 0 && (m = e.max), { data: v, min: c, max: m };
    }), f = O(() => {
      const { data: c, min: m, max: v } = d.value;
      return {
        title: {
          text: e.title,
          subtext: e.subtitle
        },
        tooltip: {
          trigger: "item",
          formatter: (C) => {
            const x = C;
            let $ = `<span style='font-weight: 600;'>${x.name}</span><br/>`;
            return $ += `Value: <span style='float:right; margin-left: 10px;'>${x.value != null ? K(x.value, i.value) : "-"}</span>`, $;
          }
        },
        visualMap: {
          show: e.legend,
          min: m,
          max: v,
          left: "left",
          top: "bottom",
          calculable: !0,
          inRange: {
            color: l.value || ["#e0f3db", "#0868ac"]
          }
        },
        series: [
          {
            name: "Area Map",
            type: "map",
            map: u.value,
            roam: !0,
            emphasis: {
              label: {
                show: !0
              }
            },
            data: s.value ? c : []
          }
        ]
      };
    }), h = ie(!1);
    return (c, m) => s.value ? (fe(), ye(we, {
      key: 1,
      config: f.value,
      height: e.height,
      width: e.width,
      theme: Q(r),
      renderer: e.renderer,
      "echarts-options": e.echartsOptions,
      onClick: m[0] || (m[0] = (v) => o("click", v)),
      onMouseenter: m[1] || (m[1] = (v) => h.value = !0),
      onMouseleave: m[2] || (m[2] = (v) => h.value = !1)
    }, {
      footer: ve(() => [
        xe(Ce, {
          config: f.value,
          data: e.data,
          "chart-title": e.title,
          theme: Q(r),
          "echarts-options": e.echartsOptions,
          "downloadable-data": e.downloadableData,
          "downloadable-image": e.downloadableImage,
          visible: h.value
        }, null, 8, ["config", "data", "chart-title", "theme", "echarts-options", "downloadable-data", "downloadable-image", "visible"])
      ]),
      _: 1
    }, 8, ["config", "height", "width", "theme", "renderer", "echarts-options"])) : (fe(), Xe("div", El, " Loading map data... "));
  }
}), fi = /* @__PURE__ */ Ot(Pl, [["__scopeId", "data-v-df118853"]]), di = /* @__PURE__ */ he({
  __name: "PointMap",
  props: {
    data: {},
    lat: {},
    long: {},
    value: {},
    name: {},
    title: {},
    subtitle: {},
    height: { default: "500px" },
    width: { default: "100%" },
    basemap: {},
    pointColor: {},
    pointOpacity: { default: 0.8 },
    pointSize: { default: 8 },
    valueFmt: {},
    link: {},
    echartsOptions: {},
    renderer: {},
    downloadableData: { type: Boolean, default: !0 },
    downloadableImage: { type: Boolean, default: !0 }
  },
  emits: ["click"],
  setup(t, { emit: a }) {
    const e = t, o = a, { activeAppearance: r, resolveColor: n } = me(), l = O(
      () => e.pointColor ? n(e.pointColor).value : "#3366cc"
    ), i = O(
      () => e.valueFmt ? de(e.valueFmt) : void 0
    ), s = O(() => {
      var f;
      return !((f = e.data) != null && f.length) || !e.lat || !e.long ? [] : e.data.map((h) => {
        const c = h[e.lat], m = h[e.long], v = e.value ? h[e.value] : void 0;
        return {
          name: e.name ? String(h[e.name]) : void 0,
          value: [m, c, v],
          lat: c,
          lng: m
        };
      }).filter((h) => h.lat != null && h.lng != null);
    }), u = O(() => {
      if (!s.value.length)
        return { center: [0, 0], zoom: 1 };
      const f = s.value.map((B) => B.lat), h = s.value.map((B) => B.lng), c = Math.min(...f), m = Math.max(...f), v = Math.min(...h), C = Math.max(...h), x = (c + m) / 2, $ = (v + C) / 2, M = m - c, I = C - v, L = Math.max(M, I);
      let p = 1;
      return L < 1 ? p = 8 : L < 5 ? p = 6 : L < 20 ? p = 4 : L < 50 ? p = 3 : p = 2, { center: [$, x], zoom: p };
    }), y = O(() => ({
      title: {
        text: e.title,
        subtext: e.subtitle
      },
      tooltip: {
        trigger: "item",
        formatter: (f) => {
          const h = f, { name: c, value: m } = h.data;
          let v = "";
          return c && (v += `<span style='font-weight: 600;'>${c}</span><br/>`), v += `Lat: ${m[1].toFixed(4)}<br/>`, v += `Long: ${m[0].toFixed(4)}`, m[2] != null && (v += `<br/>Value: ${K(m[2], i.value)}`), v;
        }
      },
      geo: {
        map: "world",
        roam: !0,
        center: u.value.center,
        zoom: u.value.zoom,
        itemStyle: {
          areaColor: "#e0e0e0",
          borderColor: "#111"
        },
        emphasis: {
          disabled: !0
        }
      },
      series: [
        {
          name: "Points",
          type: "scatter",
          coordinateSystem: "geo",
          data: s.value,
          symbolSize: e.pointSize,
          itemStyle: {
            color: l.value,
            opacity: e.pointOpacity
          },
          emphasis: {
            itemStyle: {
              borderColor: "#333",
              borderWidth: 1
            }
          }
        }
      ]
    })), d = ie(!1);
    return (f, h) => (fe(), ye(we, {
      config: y.value,
      height: e.height,
      width: e.width,
      theme: Q(r),
      renderer: e.renderer,
      "echarts-options": e.echartsOptions,
      onClick: h[0] || (h[0] = (c) => o("click", c)),
      onMouseenter: h[1] || (h[1] = (c) => d.value = !0),
      onMouseleave: h[2] || (h[2] = (c) => d.value = !1)
    }, {
      footer: ve(() => [
        xe(Ce, {
          config: y.value,
          data: e.data,
          "chart-title": e.title,
          theme: Q(r),
          "echarts-options": e.echartsOptions,
          "downloadable-data": e.downloadableData,
          "downloadable-image": e.downloadableImage,
          visible: d.value
        }, null, 8, ["config", "data", "chart-title", "theme", "echarts-options", "downloadable-data", "downloadable-image", "visible"])
      ]),
      _: 1
    }, 8, ["config", "height", "width", "theme", "renderer", "echarts-options"]));
  }
}), hi = /* @__PURE__ */ he({
  __name: "BubbleMap",
  props: {
    size: {},
    sizeFmt: {},
    minSize: { default: 5 },
    maxSize: { default: 40 },
    data: {},
    lat: {},
    long: {},
    value: {},
    name: {},
    title: {},
    subtitle: {},
    height: { default: "500px" },
    width: { default: "100%" },
    basemap: {},
    pointColor: {},
    pointOpacity: { default: 0.6 },
    pointSize: {},
    valueFmt: {},
    link: {},
    echartsOptions: {},
    renderer: {},
    downloadableData: { type: Boolean, default: !0 },
    downloadableImage: { type: Boolean, default: !0 }
  },
  emits: ["click"],
  setup(t, { emit: a }) {
    const e = t, o = a, { activeAppearance: r, resolveColor: n } = me(), l = O(
      () => e.pointColor ? n(e.pointColor).value : "#3366cc"
    ), i = O(
      () => e.valueFmt ? de(e.valueFmt) : void 0
    ), s = O(
      () => e.sizeFmt ? de(e.sizeFmt) : void 0
    ), u = O(() => {
      var m;
      if (!((m = e.data) != null && m.length) || !e.size)
        return { min: 0, max: 1 };
      const c = e.data.map((v) => v[e.size]).filter((v) => v != null && !isNaN(v));
      return c.length === 0 ? { min: 0, max: 1 } : {
        min: Math.min(...c),
        max: Math.max(...c)
      };
    }), y = O(() => {
      var C;
      if (!((C = e.data) != null && C.length) || !e.lat || !e.long || !e.size)
        return [];
      const { min: c, max: m } = u.value, v = m - c || 1;
      return e.data.map((x) => {
        const $ = x[e.lat], M = x[e.long], I = x[e.size], L = e.value ? x[e.value] : void 0, p = e.name ? String(x[e.name]) : void 0, B = (I - c) / v, T = e.minSize + B * (e.maxSize - e.minSize);
        return {
          name: p,
          value: [M, $, I, L],
          symbolSize: T,
          lat: $,
          lng: M
        };
      }).filter((x) => x.lat != null && x.lng != null);
    }), d = O(() => {
      if (!y.value.length)
        return { center: [0, 0], zoom: 1 };
      const c = y.value.map((F) => F.lat), m = y.value.map((F) => F.lng), v = Math.min(...c), C = Math.max(...c), x = Math.min(...m), $ = Math.max(...m), M = (v + C) / 2, I = (x + $) / 2, L = C - v, p = $ - x, B = Math.max(L, p);
      let T = 1;
      return B < 1 ? T = 8 : B < 5 ? T = 6 : B < 20 ? T = 4 : B < 50 ? T = 3 : T = 2, { center: [I, M], zoom: T };
    }), f = O(() => ({
      title: {
        text: e.title,
        subtext: e.subtitle
      },
      tooltip: {
        trigger: "item",
        formatter: (c) => {
          const m = c, { name: v, value: C } = m.data;
          let x = "";
          return v && (x += `<span style='font-weight: 600;'>${v}</span><br/>`), x += `Lat: ${C[1].toFixed(4)}<br/>`, x += `Long: ${C[0].toFixed(4)}<br/>`, x += `Size: ${K(C[2], s.value)}`, C[3] != null && (x += `<br/>Value: ${K(C[3], i.value)}`), x;
        }
      },
      geo: {
        map: "world",
        roam: !0,
        center: d.value.center,
        zoom: d.value.zoom,
        itemStyle: {
          areaColor: "#e0e0e0",
          borderColor: "#111"
        },
        emphasis: {
          disabled: !0
        }
      },
      series: [
        {
          name: "Bubbles",
          type: "scatter",
          coordinateSystem: "geo",
          data: y.value,
          itemStyle: {
            color: l.value,
            opacity: e.pointOpacity
          },
          emphasis: {
            itemStyle: {
              borderColor: "#333",
              borderWidth: 1
            }
          }
        }
      ]
    })), h = ie(!1);
    return (c, m) => (fe(), ye(we, {
      config: f.value,
      height: e.height,
      width: e.width,
      theme: Q(r),
      renderer: e.renderer,
      "echarts-options": e.echartsOptions,
      onClick: m[0] || (m[0] = (v) => o("click", v)),
      onMouseenter: m[1] || (m[1] = (v) => h.value = !0),
      onMouseleave: m[2] || (m[2] = (v) => h.value = !1)
    }, {
      footer: ve(() => [
        xe(Ce, {
          config: f.value,
          data: e.data,
          "chart-title": e.title,
          theme: Q(r),
          "echarts-options": e.echartsOptions,
          "downloadable-data": e.downloadableData,
          "downloadable-image": e.downloadableImage,
          visible: h.value
        }, null, 8, ["config", "data", "chart-title", "theme", "echarts-options", "downloadable-data", "downloadable-image", "visible"])
      ]),
      _: 1
    }, 8, ["config", "height", "width", "theme", "renderer", "echarts-options"]));
  }
}), pi = /* @__PURE__ */ he({
  __name: "ReferenceLine",
  props: {
    y: {},
    x: {},
    label: {},
    labelPosition: { default: "end" },
    color: {},
    lineType: { default: "dashed" },
    lineWidth: { default: 1 },
    hideValue: { type: Boolean, default: !1 },
    labelColor: {},
    labelBackgroundColor: {},
    labelPadding: { default: 4 },
    fontSize: { default: 12 }
  },
  setup(t) {
    const a = t, e = ut(_t, void 0), { resolveColor: o } = me(), r = O(
      () => a.color ? o(a.color).value : void 0
    ), n = O(
      () => a.labelColor ? o(a.labelColor).value : void 0
    ), l = O(
      () => a.labelBackgroundColor ? o(a.labelBackgroundColor).value : void 0
    ), i = {
      solid: "solid",
      dashed: "dashed",
      dotted: "dotted"
    }, s = O(() => `reference_line_${a.y ?? a.x}_${Date.now()}`), u = O(() => {
      const d = a.y !== void 0, f = {
        symbol: "none",
        lineStyle: {
          color: r.value || "#666",
          width: a.lineWidth,
          type: i[a.lineType || "dashed"]
        },
        label: {
          show: !0,
          position: a.labelPosition,
          formatter: () => {
            let h = "";
            if (a.label) {
              if (h = a.label, !a.hideValue) {
                const c = d ? a.y : a.x;
                h += `: ${K(c)}`;
              }
            } else a.hideValue || (h = K(d ? a.y : a.x));
            return h;
          },
          color: n.value,
          backgroundColor: l.value,
          padding: a.labelPadding,
          fontSize: a.fontSize
        }
      };
      return d ? f.yAxis = a.y : f.xAxis = a.x, {
        silent: !0,
        data: [f]
      };
    }), y = O(() => ({
      name: s.value,
      type: "line",
      data: [],
      markLine: u.value,
      seriesType: "reference_line"
    }));
    return Re(() => {
      e && e.addSeries(y.value);
    }), De(y, (d) => {
      e && e.updateSeries(s.value, d);
    }), et(() => {
      e && e.removeSeries(s.value);
    }), (d, f) => ft(d.$slots, "default");
  }
}), mi = /* @__PURE__ */ he({
  __name: "ReferenceArea",
  props: {
    xMin: {},
    xMax: {},
    yMin: {},
    yMax: {},
    label: {},
    color: {},
    opacity: { default: 0.2 },
    labelColor: {},
    border: { type: Boolean, default: !1 },
    borderColor: {},
    borderType: { default: "solid" },
    borderWidth: { default: 1 }
  },
  setup(t) {
    const a = t, e = ut(_t, void 0), { resolveColor: o } = me(), r = O(
      () => a.color ? o(a.color).value : void 0
    ), n = O(
      () => a.labelColor ? o(a.labelColor).value : void 0
    ), l = O(
      () => a.borderColor ? o(a.borderColor).value : void 0
    ), i = {
      solid: "solid",
      dashed: "dashed",
      dotted: "dotted"
    }, s = O(() => `reference_area_${Date.now()}`), u = O(() => {
      const d = a.yMin !== void 0 || a.yMax !== void 0, f = a.xMin !== void 0 || a.xMax !== void 0, h = [{}, {}];
      return d && (h[0].yAxis = a.yMin ?? "min", h[1].yAxis = a.yMax ?? "max"), f && (h[0].xAxis = a.xMin ?? "min", h[1].xAxis = a.xMax ?? "max"), {
        silent: !0,
        itemStyle: {
          color: r.value || "rgba(100, 100, 100, 0.2)",
          opacity: a.opacity,
          borderColor: a.border ? l.value || r.value : "transparent",
          borderWidth: a.border ? a.borderWidth : 0,
          borderType: i[a.borderType || "solid"]
        },
        label: a.label ? {
          show: !0,
          position: "insideTop",
          color: n.value
        } : void 0,
        data: [[
          { ...h[0], name: a.label || "" },
          h[1]
        ]]
      };
    }), y = O(() => ({
      name: s.value,
      type: "line",
      data: [],
      markArea: u.value,
      seriesType: "reference_area"
    }));
    return Re(() => {
      e && e.addSeries(y.value);
    }), De(y, (d) => {
      e && e.updateSeries(s.value, d);
    }), et(() => {
      e && e.removeSeries(s.value);
    }), (d, f) => ft(d.$slots, "default");
  }
}), bi = /* @__PURE__ */ he({
  __name: "ReferencePoint",
  props: {
    x: {},
    y: {},
    label: {},
    labelPosition: { default: "top" },
    color: {},
    symbol: { default: "pin" },
    symbolSize: { default: 30 },
    labelColor: {},
    labelBackgroundColor: {},
    labelPadding: { default: 4 },
    fontSize: { default: 12 }
  },
  setup(t) {
    const a = t, e = ut(_t, void 0), { resolveColor: o } = me(), r = O(
      () => a.color ? o(a.color).value : void 0
    ), n = O(
      () => a.labelColor ? o(a.labelColor).value : void 0
    ), l = O(
      () => a.labelBackgroundColor ? o(a.labelBackgroundColor).value : void 0
    ), i = O(() => `reference_point_${a.x}_${a.y}_${Date.now()}`), s = {
      top: "top",
      bottom: "bottom",
      left: "left",
      right: "right"
    }, u = O(() => ({
      silent: !1,
      symbol: a.symbol,
      symbolSize: a.symbolSize,
      itemStyle: {
        color: r.value || "#666"
      },
      label: {
        show: !!a.label,
        position: s[a.labelPosition || "top"],
        formatter: () => a.label || "",
        color: n.value,
        backgroundColor: l.value,
        padding: a.labelPadding,
        fontSize: a.fontSize
      },
      data: [
        {
          name: a.label || "",
          coord: [a.x, a.y],
          value: a.y
        }
      ]
    })), y = O(() => ({
      name: i.value,
      type: "line",
      data: [],
      markPoint: u.value,
      seriesType: "reference_point"
    }));
    return Re(() => {
      e && e.addSeries(y.value);
    }), De(y, (d) => {
      e && e.updateSeries(i.value, d);
    }), et(() => {
      e && e.removeSeries(i.value);
    }), (d, f) => ft(d.$slots, "default");
  }
});
export {
  He as AUTO_FORMAT_CODE,
  ti as AreaChart,
  fi as AreaMap,
  ra as BUILT_IN_FORMATS,
  Ql as BarChart,
  ri as BoxPlot,
  oi as BubbleChart,
  hi as BubbleMap,
  si as CalendarHeatmap,
  Ce as ChartFooter,
  Zl as ChartProvider,
  we as EChartsBase,
  li as FunnelChart,
  ii as Heatmap,
  ni as Histogram,
  ei as LineChart,
  di as PointMap,
  mi as ReferenceArea,
  pi as ReferenceLine,
  bi as ReferencePoint,
  Vo as SUPPORTED_CURRENCIES,
  ci as SankeyDiagram,
  ai as ScatterPlot,
  ui as USMap,
  aa as applyColumnUnits,
  Un as applyEchartsOptions,
  Wn as applySeriesColors,
  Yn as applySeriesOptions,
  Ja as applyTitleTagReplacement,
  Go as autoFormat,
  qn as chartConfigKey,
  Xn as chartPropsKey,
  jo as computeNumberAutoFormatCode,
  Rl as configureAutoFormatting,
  ar as configureThemes,
  Gl as convertColumnToDate,
  Ia as convertLightToDark,
  Za as createEChartsTheme,
  Bl as createTooltipConfig,
  sa as defaultThemeDark,
  ia as defaultThemeLight,
  Jl as echartsInstanceKey,
  Nl as fallbackFormat,
  No as findImplicitAutoFormat,
  tr as fmt,
  qe as formatAxisValue,
  er as formatExample,
  Le as formatTitle,
  K as formatValue,
  jl as generateColorScale,
  oa as generateImplicitNumberFormat,
  Ga as getColumnSummary,
  Hl as getContrastingTextColor,
  qo as getCustomFormats,
  $l as getDistinctCount,
  ct as getDistinctValues,
  de as getFormatObjectFromString,
  dt as getSeriesConfig,
  ja as getSortedData,
  Ka as getThemes,
  Jo as inferValueType,
  Kl as injectTheme,
  Ro as isAutoFormat,
  qa as lookupColumnFormat,
  Wl as namedPalettes,
  Ul as namedScales,
  Kn as provideTheme,
  Ao as resolveColor,
  Nn as resolveColorPalette,
  Gn as resolveColorScale,
  Rn as resolveColorsObject,
  _t as seriesConfigKey,
  Vl as setColorOpacity,
  Xo as setCustomFormats,
  Yo as standardizeDateColumn,
  St as standardizeDateString,
  pa as themeStoresKey,
  Ve as useChartConfig,
  Yl as useECharts,
  Ml as useExport,
  ql as useFormatter,
  Xl as useFormatting,
  Mo as useTheme,
  me as useThemeStores,
  ba as useTooltip
};
//# sourceMappingURL=vue-better-echarts.js.map
