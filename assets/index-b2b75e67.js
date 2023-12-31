(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) r(o);
  new MutationObserver((o) => {
    for (const s of o)
      if (s.type === "childList")
        for (const i of s.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && r(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(o) {
    const s = {};
    return (
      o.integrity && (s.integrity = o.integrity),
      o.referrerPolicy && (s.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === "use-credentials"
        ? (s.credentials = "include")
        : o.crossOrigin === "anonymous"
        ? (s.credentials = "omit")
        : (s.credentials = "same-origin"),
      s
    );
  }
  function r(o) {
    if (o.ep) return;
    o.ep = !0;
    const s = n(o);
    fetch(o.href, s);
  }
})();
function gs(e, t) {
  const n = Object.create(null),
    r = e.split(",");
  for (let o = 0; o < r.length; o++) n[r[o]] = !0;
  return t ? (o) => !!n[o.toLowerCase()] : (o) => !!n[o];
}
const we = {},
  On = [],
  ht = () => {},
  Hu = () => !1,
  Vu = /^on[^a-z]/,
  no = (e) => Vu.test(e),
  ys = (e) => e.startsWith("onUpdate:"),
  ke = Object.assign,
  bs = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  Ku = Object.prototype.hasOwnProperty,
  fe = (e, t) => Ku.call(e, t),
  G = Array.isArray,
  Sn = (e) => mr(e) === "[object Map]",
  jn = (e) => mr(e) === "[object Set]",
  hi = (e) => mr(e) === "[object Date]",
  te = (e) => typeof e == "function",
  $e = (e) => typeof e == "string",
  sr = (e) => typeof e == "symbol",
  Ce = (e) => e !== null && typeof e == "object",
  $a = (e) => Ce(e) && te(e.then) && te(e.catch),
  Ia = Object.prototype.toString,
  mr = (e) => Ia.call(e),
  qu = (e) => mr(e).slice(8, -1),
  xa = (e) => mr(e) === "[object Object]",
  vs = (e) =>
    $e(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  Fr = gs(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  ro = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  zu = /-(\w)/g,
  wt = ro((e) => e.replace(zu, (t, n) => (n ? n.toUpperCase() : ""))),
  Wu = /\B([A-Z])/g,
  Bn = ro((e) => e.replace(Wu, "-$1").toLowerCase()),
  oo = ro((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  xo = ro((e) => (e ? `on${oo(e)}` : "")),
  ir = (e, t) => !Object.is(e, t),
  Dr = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  Kr = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  qr = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  },
  Gu = (e) => {
    const t = $e(e) ? Number(e) : NaN;
    return isNaN(t) ? e : t;
  };
let mi;
const Qo = () =>
  mi ||
  (mi =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : {});
function fn(e) {
  if (G(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n],
        o = $e(r) ? Yu(r) : fn(r);
      if (o) for (const s in o) t[s] = o[s];
    }
    return t;
  } else {
    if ($e(e)) return e;
    if (Ce(e)) return e;
  }
}
const Qu = /;(?![^(]*\))/g,
  Ju = /:([^]+)/,
  Xu = /\/\*[^]*?\*\//g;
function Yu(e) {
  const t = {};
  return (
    e
      .replace(Xu, "")
      .split(Qu)
      .forEach((n) => {
        if (n) {
          const r = n.split(Ju);
          r.length > 1 && (t[r[0].trim()] = r[1].trim());
        }
      }),
    t
  );
}
function $t(e) {
  let t = "";
  if ($e(e)) t = e;
  else if (G(e))
    for (let n = 0; n < e.length; n++) {
      const r = $t(e[n]);
      r && (t += r + " ");
    }
  else if (Ce(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
const Zu =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  ef = gs(Zu);
function Ra(e) {
  return !!e || e === "";
}
function tf(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let r = 0; n && r < e.length; r++) n = un(e[r], t[r]);
  return n;
}
function un(e, t) {
  if (e === t) return !0;
  let n = hi(e),
    r = hi(t);
  if (n || r) return n && r ? e.getTime() === t.getTime() : !1;
  if (((n = sr(e)), (r = sr(t)), n || r)) return e === t;
  if (((n = G(e)), (r = G(t)), n || r)) return n && r ? tf(e, t) : !1;
  if (((n = Ce(e)), (r = Ce(t)), n || r)) {
    if (!n || !r) return !1;
    const o = Object.keys(e).length,
      s = Object.keys(t).length;
    if (o !== s) return !1;
    for (const i in e) {
      const a = e.hasOwnProperty(i),
        c = t.hasOwnProperty(i);
      if ((a && !c) || (!a && c) || !un(e[i], t[i])) return !1;
    }
  }
  return String(e) === String(t);
}
function Cs(e, t) {
  return e.findIndex((n) => un(n, t));
}
const Q = (e) =>
    $e(e)
      ? e
      : e == null
      ? ""
      : G(e) || (Ce(e) && (e.toString === Ia || !te(e.toString)))
      ? JSON.stringify(e, Na, 2)
      : String(e),
  Na = (e, t) =>
    t && t.__v_isRef
      ? Na(e, t.value)
      : Sn(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (n, [r, o]) => ((n[`${r} =>`] = o), n),
            {}
          ),
        }
      : jn(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : Ce(t) && !G(t) && !xa(t)
      ? String(t)
      : t;
let ut;
class La {
  constructor(t = !1) {
    (this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = ut),
      !t && ut && (this.index = (ut.scopes || (ut.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = ut;
      try {
        return (ut = this), t();
      } finally {
        ut = n;
      }
    }
  }
  on() {
    ut = this;
  }
  off() {
    ut = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
      for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const o = this.parent.scopes.pop();
        o &&
          o !== this &&
          ((this.parent.scopes[this.index] = o), (o.index = this.index));
      }
      (this.parent = void 0), (this._active = !1);
    }
  }
}
function nf(e) {
  return new La(e);
}
function rf(e, t = ut) {
  t && t.active && t.effects.push(e);
}
function of() {
  return ut;
}
const ws = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  Fa = (e) => (e.w & qt) > 0,
  Da = (e) => (e.n & qt) > 0,
  sf = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= qt;
  },
  af = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let r = 0; r < t.length; r++) {
        const o = t[r];
        Fa(o) && !Da(o) ? o.delete(e) : (t[n++] = o),
          (o.w &= ~qt),
          (o.n &= ~qt);
      }
      t.length = n;
    }
  },
  zr = new WeakMap();
let Xn = 0,
  qt = 1;
const Jo = 30;
let ft;
const cn = Symbol(""),
  Xo = Symbol("");
class Es {
  constructor(t, n = null, r) {
    (this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      rf(this, r);
  }
  run() {
    if (!this.active) return this.fn();
    let t = ft,
      n = Ht;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = ft),
        (ft = this),
        (Ht = !0),
        (qt = 1 << ++Xn),
        Xn <= Jo ? sf(this) : _i(this),
        this.fn()
      );
    } finally {
      Xn <= Jo && af(this),
        (qt = 1 << --Xn),
        (ft = this.parent),
        (Ht = n),
        (this.parent = void 0),
        this.deferStop && this.stop();
    }
  }
  stop() {
    ft === this
      ? (this.deferStop = !0)
      : this.active &&
        (_i(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function _i(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let Ht = !0;
const Ma = [];
function Un() {
  Ma.push(Ht), (Ht = !1);
}
function Hn() {
  const e = Ma.pop();
  Ht = e === void 0 ? !0 : e;
}
function Qe(e, t, n) {
  if (Ht && ft) {
    let r = zr.get(e);
    r || zr.set(e, (r = new Map()));
    let o = r.get(n);
    o || r.set(n, (o = ws())), ja(o);
  }
}
function ja(e, t) {
  let n = !1;
  Xn <= Jo ? Da(e) || ((e.n |= qt), (n = !Fa(e))) : (n = !e.has(ft)),
    n && (e.add(ft), ft.deps.push(e));
}
function xt(e, t, n, r, o, s) {
  const i = zr.get(e);
  if (!i) return;
  let a = [];
  if (t === "clear") a = [...i.values()];
  else if (n === "length" && G(e)) {
    const c = Number(r);
    i.forEach((u, l) => {
      (l === "length" || l >= c) && a.push(u);
    });
  } else
    switch ((n !== void 0 && a.push(i.get(n)), t)) {
      case "add":
        G(e)
          ? vs(n) && a.push(i.get("length"))
          : (a.push(i.get(cn)), Sn(e) && a.push(i.get(Xo)));
        break;
      case "delete":
        G(e) || (a.push(i.get(cn)), Sn(e) && a.push(i.get(Xo)));
        break;
      case "set":
        Sn(e) && a.push(i.get(cn));
        break;
    }
  if (a.length === 1) a[0] && Yo(a[0]);
  else {
    const c = [];
    for (const u of a) u && c.push(...u);
    Yo(ws(c));
  }
}
function Yo(e, t) {
  const n = G(e) ? e : [...e];
  for (const r of n) r.computed && gi(r);
  for (const r of n) r.computed || gi(r);
}
function gi(e, t) {
  (e !== ft || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
function cf(e, t) {
  var n;
  return (n = zr.get(e)) == null ? void 0 : n.get(t);
}
const lf = gs("__proto__,__v_isRef,__isVue"),
  Ba = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(sr)
  ),
  uf = Ps(),
  ff = Ps(!1, !0),
  df = Ps(!0),
  yi = pf();
function pf() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...n) {
        const r = le(this);
        for (let s = 0, i = this.length; s < i; s++) Qe(r, "get", s + "");
        const o = r[t](...n);
        return o === -1 || o === !1 ? r[t](...n.map(le)) : o;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...n) {
        Un();
        const r = le(this)[t].apply(this, n);
        return Hn(), r;
      };
    }),
    e
  );
}
function hf(e) {
  const t = le(this);
  return Qe(t, "has", e), t.hasOwnProperty(e);
}
function Ps(e = !1, t = !1) {
  return function (r, o, s) {
    if (o === "__v_isReactive") return !e;
    if (o === "__v_isReadonly") return e;
    if (o === "__v_isShallow") return t;
    if (o === "__v_raw" && s === (e ? (t ? $f : qa) : t ? Ka : Va).get(r))
      return r;
    const i = G(r);
    if (!e) {
      if (i && fe(yi, o)) return Reflect.get(yi, o, s);
      if (o === "hasOwnProperty") return hf;
    }
    const a = Reflect.get(r, o, s);
    return (sr(o) ? Ba.has(o) : lf(o)) || (e || Qe(r, "get", o), t)
      ? a
      : De(a)
      ? i && vs(o)
        ? a
        : a.value
      : Ce(a)
      ? e
        ? Wa(a)
        : dn(a)
      : a;
  };
}
const mf = Ua(),
  _f = Ua(!0);
function Ua(e = !1) {
  return function (n, r, o, s) {
    let i = n[r];
    if (In(i) && De(i) && !De(o)) return !1;
    if (
      !e &&
      (!Wr(o) && !In(o) && ((i = le(i)), (o = le(o))), !G(n) && De(i) && !De(o))
    )
      return (i.value = o), !0;
    const a = G(n) && vs(r) ? Number(r) < n.length : fe(n, r),
      c = Reflect.set(n, r, o, s);
    return (
      n === le(s) && (a ? ir(o, i) && xt(n, "set", r, o) : xt(n, "add", r, o)),
      c
    );
  };
}
function gf(e, t) {
  const n = fe(e, t);
  e[t];
  const r = Reflect.deleteProperty(e, t);
  return r && n && xt(e, "delete", t, void 0), r;
}
function yf(e, t) {
  const n = Reflect.has(e, t);
  return (!sr(t) || !Ba.has(t)) && Qe(e, "has", t), n;
}
function bf(e) {
  return Qe(e, "iterate", G(e) ? "length" : cn), Reflect.ownKeys(e);
}
const Ha = { get: uf, set: mf, deleteProperty: gf, has: yf, ownKeys: bf },
  vf = {
    get: df,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  Cf = ke({}, Ha, { get: ff, set: _f }),
  Ts = (e) => e,
  so = (e) => Reflect.getPrototypeOf(e);
function Sr(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const o = le(e),
    s = le(t);
  n || (t !== s && Qe(o, "get", t), Qe(o, "get", s));
  const { has: i } = so(o),
    a = r ? Ts : n ? As : ar;
  if (i.call(o, t)) return a(e.get(t));
  if (i.call(o, s)) return a(e.get(s));
  e !== o && e.get(t);
}
function Ar(e, t = !1) {
  const n = this.__v_raw,
    r = le(n),
    o = le(e);
  return (
    t || (e !== o && Qe(r, "has", e), Qe(r, "has", o)),
    e === o ? n.has(e) : n.has(e) || n.has(o)
  );
}
function kr(e, t = !1) {
  return (
    (e = e.__v_raw), !t && Qe(le(e), "iterate", cn), Reflect.get(e, "size", e)
  );
}
function bi(e) {
  e = le(e);
  const t = le(this);
  return so(t).has.call(t, e) || (t.add(e), xt(t, "add", e, e)), this;
}
function vi(e, t) {
  t = le(t);
  const n = le(this),
    { has: r, get: o } = so(n);
  let s = r.call(n, e);
  s || ((e = le(e)), (s = r.call(n, e)));
  const i = o.call(n, e);
  return (
    n.set(e, t), s ? ir(t, i) && xt(n, "set", e, t) : xt(n, "add", e, t), this
  );
}
function Ci(e) {
  const t = le(this),
    { has: n, get: r } = so(t);
  let o = n.call(t, e);
  o || ((e = le(e)), (o = n.call(t, e))), r && r.call(t, e);
  const s = t.delete(e);
  return o && xt(t, "delete", e, void 0), s;
}
function wi() {
  const e = le(this),
    t = e.size !== 0,
    n = e.clear();
  return t && xt(e, "clear", void 0, void 0), n;
}
function $r(e, t) {
  return function (r, o) {
    const s = this,
      i = s.__v_raw,
      a = le(i),
      c = t ? Ts : e ? As : ar;
    return (
      !e && Qe(a, "iterate", cn), i.forEach((u, l) => r.call(o, c(u), c(l), s))
    );
  };
}
function Ir(e, t, n) {
  return function (...r) {
    const o = this.__v_raw,
      s = le(o),
      i = Sn(s),
      a = e === "entries" || (e === Symbol.iterator && i),
      c = e === "keys" && i,
      u = o[e](...r),
      l = n ? Ts : t ? As : ar;
    return (
      !t && Qe(s, "iterate", c ? Xo : cn),
      {
        next() {
          const { value: f, done: p } = u.next();
          return p
            ? { value: f, done: p }
            : { value: a ? [l(f[0]), l(f[1])] : l(f), done: p };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function Lt(e) {
  return function (...t) {
    return e === "delete" ? !1 : this;
  };
}
function wf() {
  const e = {
      get(s) {
        return Sr(this, s);
      },
      get size() {
        return kr(this);
      },
      has: Ar,
      add: bi,
      set: vi,
      delete: Ci,
      clear: wi,
      forEach: $r(!1, !1),
    },
    t = {
      get(s) {
        return Sr(this, s, !1, !0);
      },
      get size() {
        return kr(this);
      },
      has: Ar,
      add: bi,
      set: vi,
      delete: Ci,
      clear: wi,
      forEach: $r(!1, !0),
    },
    n = {
      get(s) {
        return Sr(this, s, !0);
      },
      get size() {
        return kr(this, !0);
      },
      has(s) {
        return Ar.call(this, s, !0);
      },
      add: Lt("add"),
      set: Lt("set"),
      delete: Lt("delete"),
      clear: Lt("clear"),
      forEach: $r(!0, !1),
    },
    r = {
      get(s) {
        return Sr(this, s, !0, !0);
      },
      get size() {
        return kr(this, !0);
      },
      has(s) {
        return Ar.call(this, s, !0);
      },
      add: Lt("add"),
      set: Lt("set"),
      delete: Lt("delete"),
      clear: Lt("clear"),
      forEach: $r(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((s) => {
      (e[s] = Ir(s, !1, !1)),
        (n[s] = Ir(s, !0, !1)),
        (t[s] = Ir(s, !1, !0)),
        (r[s] = Ir(s, !0, !0));
    }),
    [e, n, t, r]
  );
}
const [Ef, Pf, Tf, Of] = wf();
function Os(e, t) {
  const n = t ? (e ? Of : Tf) : e ? Pf : Ef;
  return (r, o, s) =>
    o === "__v_isReactive"
      ? !e
      : o === "__v_isReadonly"
      ? e
      : o === "__v_raw"
      ? r
      : Reflect.get(fe(n, o) && o in r ? n : r, o, s);
}
const Sf = { get: Os(!1, !1) },
  Af = { get: Os(!1, !0) },
  kf = { get: Os(!0, !1) },
  Va = new WeakMap(),
  Ka = new WeakMap(),
  qa = new WeakMap(),
  $f = new WeakMap();
function If(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function xf(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : If(qu(e));
}
function dn(e) {
  return In(e) ? e : Ss(e, !1, Ha, Sf, Va);
}
function za(e) {
  return Ss(e, !1, Cf, Af, Ka);
}
function Wa(e) {
  return Ss(e, !0, vf, kf, qa);
}
function Ss(e, t, n, r, o) {
  if (!Ce(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const s = o.get(e);
  if (s) return s;
  const i = xf(e);
  if (i === 0) return e;
  const a = new Proxy(e, i === 2 ? r : n);
  return o.set(e, a), a;
}
function An(e) {
  return In(e) ? An(e.__v_raw) : !!(e && e.__v_isReactive);
}
function In(e) {
  return !!(e && e.__v_isReadonly);
}
function Wr(e) {
  return !!(e && e.__v_isShallow);
}
function Ga(e) {
  return An(e) || In(e);
}
function le(e) {
  const t = e && e.__v_raw;
  return t ? le(t) : e;
}
function Qa(e) {
  return Kr(e, "__v_skip", !0), e;
}
const ar = (e) => (Ce(e) ? dn(e) : e),
  As = (e) => (Ce(e) ? Wa(e) : e);
function Ja(e) {
  Ht && ft && ((e = le(e)), ja(e.dep || (e.dep = ws())));
}
function Xa(e, t) {
  e = le(e);
  const n = e.dep;
  n && Yo(n);
}
function De(e) {
  return !!(e && e.__v_isRef === !0);
}
function ae(e) {
  return Ya(e, !1);
}
function Rf(e) {
  return Ya(e, !0);
}
function Ya(e, t) {
  return De(e) ? e : new Nf(e, t);
}
class Nf {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : le(t)),
      (this._value = n ? t : ar(t));
  }
  get value() {
    return Ja(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || Wr(t) || In(t);
    (t = n ? t : le(t)),
      ir(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = n ? t : ar(t)), Xa(this));
  }
}
function kn(e) {
  return De(e) ? e.value : e;
}
const Lf = {
  get: (e, t, n) => kn(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const o = e[t];
    return De(o) && !De(n) ? ((o.value = n), !0) : Reflect.set(e, t, n, r);
  },
};
function Za(e) {
  return An(e) ? e : new Proxy(e, Lf);
}
function Ff(e) {
  const t = G(e) ? new Array(e.length) : {};
  for (const n in e) t[n] = Mf(e, n);
  return t;
}
class Df {
  constructor(t, n, r) {
    (this._object = t),
      (this._key = n),
      (this._defaultValue = r),
      (this.__v_isRef = !0);
  }
  get value() {
    const t = this._object[this._key];
    return t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
  get dep() {
    return cf(le(this._object), this._key);
  }
}
function Mf(e, t, n) {
  const r = e[t];
  return De(r) ? r : new Df(e, t, n);
}
class jf {
  constructor(t, n, r, o) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this._dirty = !0),
      (this.effect = new Es(t, () => {
        this._dirty || ((this._dirty = !0), Xa(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !o),
      (this.__v_isReadonly = r);
  }
  get value() {
    const t = le(this);
    return (
      Ja(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
function Bf(e, t, n = !1) {
  let r, o;
  const s = te(e);
  return (
    s ? ((r = e), (o = ht)) : ((r = e.get), (o = e.set)),
    new jf(r, o, s || !o, n)
  );
}
function Vt(e, t, n, r) {
  let o;
  try {
    o = r ? e(...r) : e();
  } catch (s) {
    _r(s, t, n);
  }
  return o;
}
function st(e, t, n, r) {
  if (te(e)) {
    const s = Vt(e, t, n, r);
    return (
      s &&
        $a(s) &&
        s.catch((i) => {
          _r(i, t, n);
        }),
      s
    );
  }
  const o = [];
  for (let s = 0; s < e.length; s++) o.push(st(e[s], t, n, r));
  return o;
}
function _r(e, t, n, r = !0) {
  const o = t ? t.vnode : null;
  if (t) {
    let s = t.parent;
    const i = t.proxy,
      a = n;
    for (; s; ) {
      const u = s.ec;
      if (u) {
        for (let l = 0; l < u.length; l++) if (u[l](e, i, a) === !1) return;
      }
      s = s.parent;
    }
    const c = t.appContext.config.errorHandler;
    if (c) {
      Vt(c, null, 10, [e, i, a]);
      return;
    }
  }
  Uf(e, n, o, r);
}
function Uf(e, t, n, r = !0) {
  console.error(e);
}
let cr = !1,
  Zo = !1;
const Ue = [];
let vt = 0;
const $n = [];
let At = null,
  rn = 0;
const ec = Promise.resolve();
let ks = null;
function tc(e) {
  const t = ks || ec;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Hf(e) {
  let t = vt + 1,
    n = Ue.length;
  for (; t < n; ) {
    const r = (t + n) >>> 1;
    lr(Ue[r]) < e ? (t = r + 1) : (n = r);
  }
  return t;
}
function io(e) {
  (!Ue.length || !Ue.includes(e, cr && e.allowRecurse ? vt + 1 : vt)) &&
    (e.id == null ? Ue.push(e) : Ue.splice(Hf(e.id), 0, e), nc());
}
function nc() {
  !cr && !Zo && ((Zo = !0), (ks = ec.then(oc)));
}
function Vf(e) {
  const t = Ue.indexOf(e);
  t > vt && Ue.splice(t, 1);
}
function Kf(e) {
  G(e)
    ? $n.push(...e)
    : (!At || !At.includes(e, e.allowRecurse ? rn + 1 : rn)) && $n.push(e),
    nc();
}
function Ei(e, t = cr ? vt + 1 : 0) {
  for (; t < Ue.length; t++) {
    const n = Ue[t];
    n && n.pre && (Ue.splice(t, 1), t--, n());
  }
}
function rc(e) {
  if ($n.length) {
    const t = [...new Set($n)];
    if ((($n.length = 0), At)) {
      At.push(...t);
      return;
    }
    for (At = t, At.sort((n, r) => lr(n) - lr(r)), rn = 0; rn < At.length; rn++)
      At[rn]();
    (At = null), (rn = 0);
  }
}
const lr = (e) => (e.id == null ? 1 / 0 : e.id),
  qf = (e, t) => {
    const n = lr(e) - lr(t);
    if (n === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return n;
  };
function oc(e) {
  (Zo = !1), (cr = !0), Ue.sort(qf);
  const t = ht;
  try {
    for (vt = 0; vt < Ue.length; vt++) {
      const n = Ue[vt];
      n && n.active !== !1 && Vt(n, null, 14);
    }
  } finally {
    (vt = 0),
      (Ue.length = 0),
      rc(),
      (cr = !1),
      (ks = null),
      (Ue.length || $n.length) && oc();
  }
}
function zf(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || we;
  let o = n;
  const s = t.startsWith("update:"),
    i = s && t.slice(7);
  if (i && i in r) {
    const l = `${i === "modelValue" ? "model" : i}Modifiers`,
      { number: f, trim: p } = r[l] || we;
    p && (o = n.map((y) => ($e(y) ? y.trim() : y))), f && (o = n.map(qr));
  }
  let a,
    c = r[(a = xo(t))] || r[(a = xo(wt(t)))];
  !c && s && (c = r[(a = xo(Bn(t)))]), c && st(c, e, 6, o);
  const u = r[a + "Once"];
  if (u) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[a]) return;
    (e.emitted[a] = !0), st(u, e, 6, o);
  }
}
function sc(e, t, n = !1) {
  const r = t.emitsCache,
    o = r.get(e);
  if (o !== void 0) return o;
  const s = e.emits;
  let i = {},
    a = !1;
  if (!te(e)) {
    const c = (u) => {
      const l = sc(u, t, !0);
      l && ((a = !0), ke(i, l));
    };
    !n && t.mixins.length && t.mixins.forEach(c),
      e.extends && c(e.extends),
      e.mixins && e.mixins.forEach(c);
  }
  return !s && !a
    ? (Ce(e) && r.set(e, null), null)
    : (G(s) ? s.forEach((c) => (i[c] = null)) : ke(i, s),
      Ce(e) && r.set(e, i),
      i);
}
function ao(e, t) {
  return !e || !no(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      fe(e, t[0].toLowerCase() + t.slice(1)) || fe(e, Bn(t)) || fe(e, t));
}
let Me = null,
  co = null;
function Gr(e) {
  const t = Me;
  return (Me = e), (co = (e && e.type.__scopeId) || null), t;
}
function pn(e) {
  co = e;
}
function hn() {
  co = null;
}
function ve(e, t = Me, n) {
  if (!t || e._n) return e;
  const r = (...o) => {
    r._d && Fi(-1);
    const s = Gr(t);
    let i;
    try {
      i = e(...o);
    } finally {
      Gr(s), r._d && Fi(1);
    }
    return i;
  };
  return (r._n = !0), (r._c = !0), (r._d = !0), r;
}
function Ro(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: o,
    props: s,
    propsOptions: [i],
    slots: a,
    attrs: c,
    emit: u,
    render: l,
    renderCache: f,
    data: p,
    setupState: y,
    ctx: g,
    inheritAttrs: C,
  } = e;
  let N, I;
  const $ = Gr(e);
  try {
    if (n.shapeFlag & 4) {
      const L = o || r;
      (N = bt(l.call(L, L, f, s, y, p, g))), (I = c);
    } else {
      const L = t;
      (N = bt(
        L.length > 1 ? L(s, { attrs: c, slots: a, emit: u }) : L(s, null)
      )),
        (I = t.props ? c : Wf(c));
    }
  } catch (L) {
    (nr.length = 0), _r(L, e, 1), (N = j(at));
  }
  let J = N;
  if (I && C !== !1) {
    const L = Object.keys(I),
      { shapeFlag: Y } = J;
    L.length && Y & 7 && (i && L.some(ys) && (I = Gf(I, i)), (J = zt(J, I)));
  }
  return (
    n.dirs && ((J = zt(J)), (J.dirs = J.dirs ? J.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (J.transition = n.transition),
    (N = J),
    Gr($),
    N
  );
}
const Wf = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || no(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  Gf = (e, t) => {
    const n = {};
    for (const r in e) (!ys(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
    return n;
  };
function Qf(e, t, n) {
  const { props: r, children: o, component: s } = e,
    { props: i, children: a, patchFlag: c } = t,
    u = s.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && c >= 0) {
    if (c & 1024) return !0;
    if (c & 16) return r ? Pi(r, i, u) : !!i;
    if (c & 8) {
      const l = t.dynamicProps;
      for (let f = 0; f < l.length; f++) {
        const p = l[f];
        if (i[p] !== r[p] && !ao(u, p)) return !0;
      }
    }
  } else
    return (o || a) && (!a || !a.$stable)
      ? !0
      : r === i
      ? !1
      : r
      ? i
        ? Pi(r, i, u)
        : !0
      : !!i;
  return !1;
}
function Pi(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length) return !0;
  for (let o = 0; o < r.length; o++) {
    const s = r[o];
    if (t[s] !== e[s] && !ao(n, s)) return !0;
  }
  return !1;
}
function Jf({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const Xf = (e) => e.__isSuspense;
function Yf(e, t) {
  t && t.pendingBranch
    ? G(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : Kf(e);
}
function Zf(e, t) {
  return $s(e, null, t);
}
const xr = {};
function it(e, t, n) {
  return $s(e, t, n);
}
function $s(
  e,
  t,
  { immediate: n, deep: r, flush: o, onTrack: s, onTrigger: i } = we
) {
  var a;
  const c = of() === ((a = xe) == null ? void 0 : a.scope) ? xe : null;
  let u,
    l = !1,
    f = !1;
  if (
    (De(e)
      ? ((u = () => e.value), (l = Wr(e)))
      : An(e)
      ? ((u = () => e), (r = !0))
      : G(e)
      ? ((f = !0),
        (l = e.some((L) => An(L) || Wr(L))),
        (u = () =>
          e.map((L) => {
            if (De(L)) return L.value;
            if (An(L)) return an(L);
            if (te(L)) return Vt(L, c, 2);
          })))
      : te(e)
      ? t
        ? (u = () => Vt(e, c, 2))
        : (u = () => {
            if (!(c && c.isUnmounted)) return p && p(), st(e, c, 3, [y]);
          })
      : (u = ht),
    t && r)
  ) {
    const L = u;
    u = () => an(L());
  }
  let p,
    y = (L) => {
      p = $.onStop = () => {
        Vt(L, c, 4);
      };
    },
    g;
  if (Rn)
    if (
      ((y = ht),
      t ? n && st(t, c, 3, [u(), f ? [] : void 0, y]) : u(),
      o === "sync")
    ) {
      const L = Gd();
      g = L.__watcherHandles || (L.__watcherHandles = []);
    } else return ht;
  let C = f ? new Array(e.length).fill(xr) : xr;
  const N = () => {
    if ($.active)
      if (t) {
        const L = $.run();
        (r || l || (f ? L.some((Y, Z) => ir(Y, C[Z])) : ir(L, C))) &&
          (p && p(),
          st(t, c, 3, [L, C === xr ? void 0 : f && C[0] === xr ? [] : C, y]),
          (C = L));
      } else $.run();
  };
  N.allowRecurse = !!t;
  let I;
  o === "sync"
    ? (I = N)
    : o === "post"
    ? (I = () => We(N, c && c.suspense))
    : ((N.pre = !0), c && (N.id = c.uid), (I = () => io(N)));
  const $ = new Es(u, I);
  t
    ? n
      ? N()
      : (C = $.run())
    : o === "post"
    ? We($.run.bind($), c && c.suspense)
    : $.run();
  const J = () => {
    $.stop(), c && c.scope && bs(c.scope.effects, $);
  };
  return g && g.push(J), J;
}
function ed(e, t, n) {
  const r = this.proxy,
    o = $e(e) ? (e.includes(".") ? ic(r, e) : () => r[e]) : e.bind(r, r);
  let s;
  te(t) ? (s = t) : ((s = t.handler), (n = t));
  const i = xe;
  xn(this);
  const a = $s(o, s.bind(r), n);
  return i ? xn(i) : ln(), a;
}
function ic(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let o = 0; o < n.length && r; o++) r = r[n[o]];
    return r;
  };
}
function an(e, t) {
  if (!Ce(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), De(e))) an(e.value, t);
  else if (G(e)) for (let n = 0; n < e.length; n++) an(e[n], t);
  else if (jn(e) || Sn(e))
    e.forEach((n) => {
      an(n, t);
    });
  else if (xa(e)) for (const n in e) an(e[n], t);
  return e;
}
function Kt(e, t) {
  const n = Me;
  if (n === null) return e;
  const r = po(n) || n.proxy,
    o = e.dirs || (e.dirs = []);
  for (let s = 0; s < t.length; s++) {
    let [i, a, c, u = we] = t[s];
    i &&
      (te(i) && (i = { mounted: i, updated: i }),
      i.deep && an(a),
      o.push({
        dir: i,
        instance: r,
        value: a,
        oldValue: void 0,
        arg: c,
        modifiers: u,
      }));
  }
  return e;
}
function en(e, t, n, r) {
  const o = e.dirs,
    s = t && t.dirs;
  for (let i = 0; i < o.length; i++) {
    const a = o[i];
    s && (a.oldValue = s[i].value);
    let c = a.dir[r];
    c && (Un(), st(c, n, 8, [e.el, a, e, t]), Hn());
  }
}
function ac() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map(),
  };
  return (
    yr(() => {
      e.isMounted = !0;
    }),
    dc(() => {
      e.isUnmounting = !0;
    }),
    e
  );
}
const ot = [Function, Array],
  cc = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: ot,
    onEnter: ot,
    onAfterEnter: ot,
    onEnterCancelled: ot,
    onBeforeLeave: ot,
    onLeave: ot,
    onAfterLeave: ot,
    onLeaveCancelled: ot,
    onBeforeAppear: ot,
    onAppear: ot,
    onAfterAppear: ot,
    onAppearCancelled: ot,
  },
  td = {
    name: "BaseTransition",
    props: cc,
    setup(e, { slots: t }) {
      const n = Fs(),
        r = ac();
      let o;
      return () => {
        const s = t.default && Is(t.default(), !0);
        if (!s || !s.length) return;
        let i = s[0];
        if (s.length > 1) {
          for (const C of s)
            if (C.type !== at) {
              i = C;
              break;
            }
        }
        const a = le(e),
          { mode: c } = a;
        if (r.isLeaving) return No(i);
        const u = Ti(i);
        if (!u) return No(i);
        const l = ur(u, a, r, n);
        fr(u, l);
        const f = n.subTree,
          p = f && Ti(f);
        let y = !1;
        const { getTransitionKey: g } = u.type;
        if (g) {
          const C = g();
          o === void 0 ? (o = C) : C !== o && ((o = C), (y = !0));
        }
        if (p && p.type !== at && (!on(u, p) || y)) {
          const C = ur(p, a, r, n);
          if ((fr(p, C), c === "out-in"))
            return (
              (r.isLeaving = !0),
              (C.afterLeave = () => {
                (r.isLeaving = !1), n.update.active !== !1 && n.update();
              }),
              No(i)
            );
          c === "in-out" &&
            u.type !== at &&
            (C.delayLeave = (N, I, $) => {
              const J = lc(r, p);
              (J[String(p.key)] = p),
                (N._leaveCb = () => {
                  I(), (N._leaveCb = void 0), delete l.delayedLeave;
                }),
                (l.delayedLeave = $);
            });
        }
        return i;
      };
    },
  },
  nd = td;
function lc(e, t) {
  const { leavingVNodes: n } = e;
  let r = n.get(t.type);
  return r || ((r = Object.create(null)), n.set(t.type, r)), r;
}
function ur(e, t, n, r) {
  const {
      appear: o,
      mode: s,
      persisted: i = !1,
      onBeforeEnter: a,
      onEnter: c,
      onAfterEnter: u,
      onEnterCancelled: l,
      onBeforeLeave: f,
      onLeave: p,
      onAfterLeave: y,
      onLeaveCancelled: g,
      onBeforeAppear: C,
      onAppear: N,
      onAfterAppear: I,
      onAppearCancelled: $,
    } = t,
    J = String(e.key),
    L = lc(n, e),
    Y = (z, se) => {
      z && st(z, r, 9, se);
    },
    Z = (z, se) => {
      const re = se[1];
      Y(z, se),
        G(z) ? z.every((_e) => _e.length <= 1) && re() : z.length <= 1 && re();
    },
    ee = {
      mode: s,
      persisted: i,
      beforeEnter(z) {
        let se = a;
        if (!n.isMounted)
          if (o) se = C || a;
          else return;
        z._leaveCb && z._leaveCb(!0);
        const re = L[J];
        re && on(e, re) && re.el._leaveCb && re.el._leaveCb(), Y(se, [z]);
      },
      enter(z) {
        let se = c,
          re = u,
          _e = l;
        if (!n.isMounted)
          if (o) (se = N || c), (re = I || u), (_e = $ || l);
          else return;
        let U = !1;
        const de = (z._enterCb = (Re) => {
          U ||
            ((U = !0),
            Re ? Y(_e, [z]) : Y(re, [z]),
            ee.delayedLeave && ee.delayedLeave(),
            (z._enterCb = void 0));
        });
        se ? Z(se, [z, de]) : de();
      },
      leave(z, se) {
        const re = String(e.key);
        if ((z._enterCb && z._enterCb(!0), n.isUnmounting)) return se();
        Y(f, [z]);
        let _e = !1;
        const U = (z._leaveCb = (de) => {
          _e ||
            ((_e = !0),
            se(),
            de ? Y(g, [z]) : Y(y, [z]),
            (z._leaveCb = void 0),
            L[re] === e && delete L[re]);
        });
        (L[re] = e), p ? Z(p, [z, U]) : U();
      },
      clone(z) {
        return ur(z, t, n, r);
      },
    };
  return ee;
}
function No(e) {
  if (gr(e)) return (e = zt(e)), (e.children = null), e;
}
function Ti(e) {
  return gr(e) ? (e.children ? e.children[0] : void 0) : e;
}
function fr(e, t) {
  e.shapeFlag & 6 && e.component
    ? fr(e.component.subTree, t)
    : e.shapeFlag & 128
    ? ((e.ssContent.transition = t.clone(e.ssContent)),
      (e.ssFallback.transition = t.clone(e.ssFallback)))
    : (e.transition = t);
}
function Is(e, t = !1, n) {
  let r = [],
    o = 0;
  for (let s = 0; s < e.length; s++) {
    let i = e[s];
    const a = n == null ? i.key : String(n) + String(i.key != null ? i.key : s);
    i.type === me
      ? (i.patchFlag & 128 && o++, (r = r.concat(Is(i.children, t, a))))
      : (t || i.type !== at) && r.push(a != null ? zt(i, { key: a }) : i);
  }
  if (o > 1) for (let s = 0; s < r.length; s++) r[s].patchFlag = -2;
  return r;
}
function Gt(e, t) {
  return te(e) ? (() => ke({ name: e.name }, t, { setup: e }))() : e;
}
const Zn = (e) => !!e.type.__asyncLoader;
function rd(e) {
  te(e) && (e = { loader: e });
  const {
    loader: t,
    loadingComponent: n,
    errorComponent: r,
    delay: o = 200,
    timeout: s,
    suspensible: i = !0,
    onError: a,
  } = e;
  let c = null,
    u,
    l = 0;
  const f = () => (l++, (c = null), p()),
    p = () => {
      let y;
      return (
        c ||
        (y = c =
          t()
            .catch((g) => {
              if (((g = g instanceof Error ? g : new Error(String(g))), a))
                return new Promise((C, N) => {
                  a(
                    g,
                    () => C(f()),
                    () => N(g),
                    l + 1
                  );
                });
              throw g;
            })
            .then((g) =>
              y !== c && c
                ? c
                : (g &&
                    (g.__esModule || g[Symbol.toStringTag] === "Module") &&
                    (g = g.default),
                  (u = g),
                  g)
            ))
      );
    };
  return Gt({
    name: "AsyncComponentWrapper",
    __asyncLoader: p,
    get __asyncResolved() {
      return u;
    },
    setup() {
      const y = xe;
      if (u) return () => Lo(u, y);
      const g = ($) => {
        (c = null), _r($, y, 13, !r);
      };
      if ((i && y.suspense) || Rn)
        return p()
          .then(($) => () => Lo($, y))
          .catch(($) => (g($), () => (r ? j(r, { error: $ }) : null)));
      const C = ae(!1),
        N = ae(),
        I = ae(!!o);
      return (
        o &&
          setTimeout(() => {
            I.value = !1;
          }, o),
        s != null &&
          setTimeout(() => {
            if (!C.value && !N.value) {
              const $ = new Error(`Async component timed out after ${s}ms.`);
              g($), (N.value = $);
            }
          }, s),
        p()
          .then(() => {
            (C.value = !0),
              y.parent && gr(y.parent.vnode) && io(y.parent.update);
          })
          .catch(($) => {
            g($), (N.value = $);
          }),
        () => {
          if (C.value && u) return Lo(u, y);
          if (N.value && r) return j(r, { error: N.value });
          if (n && !I.value) return j(n);
        }
      );
    },
  });
}
function Lo(e, t) {
  const { ref: n, props: r, children: o, ce: s } = t.vnode,
    i = j(e, r, o);
  return (i.ref = n), (i.ce = s), delete t.vnode.ce, i;
}
const gr = (e) => e.type.__isKeepAlive;
function od(e, t) {
  uc(e, "a", t);
}
function sd(e, t) {
  uc(e, "da", t);
}
function uc(e, t, n = xe) {
  const r =
    e.__wdc ||
    (e.__wdc = () => {
      let o = n;
      for (; o; ) {
        if (o.isDeactivated) return;
        o = o.parent;
      }
      return e();
    });
  if ((lo(t, r, n), n)) {
    let o = n.parent;
    for (; o && o.parent; )
      gr(o.parent.vnode) && id(r, t, n, o), (o = o.parent);
  }
}
function id(e, t, n, r) {
  const o = lo(t, e, r, !0);
  pc(() => {
    bs(r[t], o);
  }, n);
}
function lo(e, t, n = xe, r = !1) {
  if (n) {
    const o = n[e] || (n[e] = []),
      s =
        t.__weh ||
        (t.__weh = (...i) => {
          if (n.isUnmounted) return;
          Un(), xn(n);
          const a = st(t, n, e, i);
          return ln(), Hn(), a;
        });
    return r ? o.unshift(s) : o.push(s), s;
  }
}
const Rt =
    (e) =>
    (t, n = xe) =>
      (!Rn || e === "sp") && lo(e, (...r) => t(...r), n),
  ad = Rt("bm"),
  yr = Rt("m"),
  cd = Rt("bu"),
  fc = Rt("u"),
  dc = Rt("bum"),
  pc = Rt("um"),
  ld = Rt("sp"),
  ud = Rt("rtg"),
  fd = Rt("rtc");
function dd(e, t = xe) {
  lo("ec", e, t);
}
const hc = "components";
function ne(e, t) {
  return hd(hc, e, !0, t) || e;
}
const pd = Symbol.for("v-ndc");
function hd(e, t, n = !0, r = !1) {
  const o = Me || xe;
  if (o) {
    const s = o.type;
    if (e === hc) {
      const a = qd(s, !1);
      if (a && (a === t || a === wt(t) || a === oo(wt(t)))) return s;
    }
    const i = Oi(o[e] || s[e], t) || Oi(o.appContext[e], t);
    return !i && r ? s : i;
  }
}
function Oi(e, t) {
  return e && (e[t] || e[wt(t)] || e[oo(wt(t))]);
}
function He(e, t, n, r) {
  let o;
  const s = n && n[r];
  if (G(e) || $e(e)) {
    o = new Array(e.length);
    for (let i = 0, a = e.length; i < a; i++)
      o[i] = t(e[i], i, void 0, s && s[i]);
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let i = 0; i < e; i++) o[i] = t(i + 1, i, void 0, s && s[i]);
  } else if (Ce(e))
    if (e[Symbol.iterator])
      o = Array.from(e, (i, a) => t(i, a, void 0, s && s[a]));
    else {
      const i = Object.keys(e);
      o = new Array(i.length);
      for (let a = 0, c = i.length; a < c; a++) {
        const u = i[a];
        o[a] = t(e[u], u, a, s && s[a]);
      }
    }
  else o = [];
  return n && (n[r] = o), o;
}
function mc(e, t, n = {}, r, o) {
  if (Me.isCE || (Me.parent && Zn(Me.parent) && Me.parent.isCE))
    return t !== "default" && (n.name = t), j("slot", n, r && r());
  let s = e[t];
  s && s._c && (s._d = !1), S();
  const i = s && _c(s(n)),
    a = Fe(
      me,
      { key: n.key || (i && i.key) || `_${t}` },
      i || (r ? r() : []),
      i && e._ === 1 ? 64 : -2
    );
  return (
    !o && a.scopeId && (a.slotScopeIds = [a.scopeId + "-s"]),
    s && s._c && (s._d = !0),
    a
  );
}
function _c(e) {
  return e.some((t) =>
    Xr(t) ? !(t.type === at || (t.type === me && !_c(t.children))) : !0
  )
    ? e
    : null;
}
const es = (e) => (e ? (kc(e) ? po(e) || e.proxy : es(e.parent)) : null),
  er = ke(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => es(e.parent),
    $root: (e) => es(e.root),
    $emit: (e) => e.emit,
    $options: (e) => xs(e),
    $forceUpdate: (e) => e.f || (e.f = () => io(e.update)),
    $nextTick: (e) => e.n || (e.n = tc.bind(e.proxy)),
    $watch: (e) => ed.bind(e),
  }),
  Fo = (e, t) => e !== we && !e.__isScriptSetup && fe(e, t),
  md = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: r,
        data: o,
        props: s,
        accessCache: i,
        type: a,
        appContext: c,
      } = e;
      let u;
      if (t[0] !== "$") {
        const y = i[t];
        if (y !== void 0)
          switch (y) {
            case 1:
              return r[t];
            case 2:
              return o[t];
            case 4:
              return n[t];
            case 3:
              return s[t];
          }
        else {
          if (Fo(r, t)) return (i[t] = 1), r[t];
          if (o !== we && fe(o, t)) return (i[t] = 2), o[t];
          if ((u = e.propsOptions[0]) && fe(u, t)) return (i[t] = 3), s[t];
          if (n !== we && fe(n, t)) return (i[t] = 4), n[t];
          ts && (i[t] = 0);
        }
      }
      const l = er[t];
      let f, p;
      if (l) return t === "$attrs" && Qe(e, "get", t), l(e);
      if ((f = a.__cssModules) && (f = f[t])) return f;
      if (n !== we && fe(n, t)) return (i[t] = 4), n[t];
      if (((p = c.config.globalProperties), fe(p, t))) return p[t];
    },
    set({ _: e }, t, n) {
      const { data: r, setupState: o, ctx: s } = e;
      return Fo(o, t)
        ? ((o[t] = n), !0)
        : r !== we && fe(r, t)
        ? ((r[t] = n), !0)
        : fe(e.props, t) || (t[0] === "$" && t.slice(1) in e)
        ? !1
        : ((s[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: r,
          appContext: o,
          propsOptions: s,
        },
      },
      i
    ) {
      let a;
      return (
        !!n[i] ||
        (e !== we && fe(e, i)) ||
        Fo(t, i) ||
        ((a = s[0]) && fe(a, i)) ||
        fe(r, i) ||
        fe(er, i) ||
        fe(o.config.globalProperties, i)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : fe(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  };
function Si(e) {
  return G(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
let ts = !0;
function _d(e) {
  const t = xs(e),
    n = e.proxy,
    r = e.ctx;
  (ts = !1), t.beforeCreate && Ai(t.beforeCreate, e, "bc");
  const {
    data: o,
    computed: s,
    methods: i,
    watch: a,
    provide: c,
    inject: u,
    created: l,
    beforeMount: f,
    mounted: p,
    beforeUpdate: y,
    updated: g,
    activated: C,
    deactivated: N,
    beforeDestroy: I,
    beforeUnmount: $,
    destroyed: J,
    unmounted: L,
    render: Y,
    renderTracked: Z,
    renderTriggered: ee,
    errorCaptured: z,
    serverPrefetch: se,
    expose: re,
    inheritAttrs: _e,
    components: U,
    directives: de,
    filters: Re,
  } = t;
  if ((u && gd(u, r, null), i))
    for (const ge in i) {
      const pe = i[ge];
      te(pe) && (r[ge] = pe.bind(n));
    }
  if (o) {
    const ge = o.call(n, n);
    Ce(ge) && (e.data = dn(ge));
  }
  if (((ts = !0), s))
    for (const ge in s) {
      const pe = s[ge],
        lt = te(pe) ? pe.bind(n, n) : te(pe.get) ? pe.get.bind(n, n) : ht,
        ie = !te(pe) && te(pe.set) ? pe.set.bind(n) : ht,
        tt = Se({ get: lt, set: ie });
      Object.defineProperty(r, ge, {
        enumerable: !0,
        configurable: !0,
        get: () => tt.value,
        set: (je) => (tt.value = je),
      });
    }
  if (a) for (const ge in a) gc(a[ge], r, n, ge);
  if (c) {
    const ge = te(c) ? c.call(n) : c;
    Reflect.ownKeys(ge).forEach((pe) => {
      Mr(pe, ge[pe]);
    });
  }
  l && Ai(l, e, "c");
  function Te(ge, pe) {
    G(pe) ? pe.forEach((lt) => ge(lt.bind(n))) : pe && ge(pe.bind(n));
  }
  if (
    (Te(ad, f),
    Te(yr, p),
    Te(cd, y),
    Te(fc, g),
    Te(od, C),
    Te(sd, N),
    Te(dd, z),
    Te(fd, Z),
    Te(ud, ee),
    Te(dc, $),
    Te(pc, L),
    Te(ld, se),
    G(re))
  )
    if (re.length) {
      const ge = e.exposed || (e.exposed = {});
      re.forEach((pe) => {
        Object.defineProperty(ge, pe, {
          get: () => n[pe],
          set: (lt) => (n[pe] = lt),
        });
      });
    } else e.exposed || (e.exposed = {});
  Y && e.render === ht && (e.render = Y),
    _e != null && (e.inheritAttrs = _e),
    U && (e.components = U),
    de && (e.directives = de);
}
function gd(e, t, n = ht) {
  G(e) && (e = ns(e));
  for (const r in e) {
    const o = e[r];
    let s;
    Ce(o)
      ? "default" in o
        ? (s = mt(o.from || r, o.default, !0))
        : (s = mt(o.from || r))
      : (s = mt(o)),
      De(s)
        ? Object.defineProperty(t, r, {
            enumerable: !0,
            configurable: !0,
            get: () => s.value,
            set: (i) => (s.value = i),
          })
        : (t[r] = s);
  }
}
function Ai(e, t, n) {
  st(G(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function gc(e, t, n, r) {
  const o = r.includes(".") ? ic(n, r) : () => n[r];
  if ($e(e)) {
    const s = t[e];
    te(s) && it(o, s);
  } else if (te(e)) it(o, e.bind(n));
  else if (Ce(e))
    if (G(e)) e.forEach((s) => gc(s, t, n, r));
    else {
      const s = te(e.handler) ? e.handler.bind(n) : t[e.handler];
      te(s) && it(o, s, e);
    }
}
function xs(e) {
  const t = e.type,
    { mixins: n, extends: r } = t,
    {
      mixins: o,
      optionsCache: s,
      config: { optionMergeStrategies: i },
    } = e.appContext,
    a = s.get(t);
  let c;
  return (
    a
      ? (c = a)
      : !o.length && !n && !r
      ? (c = t)
      : ((c = {}), o.length && o.forEach((u) => Qr(c, u, i, !0)), Qr(c, t, i)),
    Ce(t) && s.set(t, c),
    c
  );
}
function Qr(e, t, n, r = !1) {
  const { mixins: o, extends: s } = t;
  s && Qr(e, s, n, !0), o && o.forEach((i) => Qr(e, i, n, !0));
  for (const i in t)
    if (!(r && i === "expose")) {
      const a = yd[i] || (n && n[i]);
      e[i] = a ? a(e[i], t[i]) : t[i];
    }
  return e;
}
const yd = {
  data: ki,
  props: $i,
  emits: $i,
  methods: Yn,
  computed: Yn,
  beforeCreate: qe,
  created: qe,
  beforeMount: qe,
  mounted: qe,
  beforeUpdate: qe,
  updated: qe,
  beforeDestroy: qe,
  beforeUnmount: qe,
  destroyed: qe,
  unmounted: qe,
  activated: qe,
  deactivated: qe,
  errorCaptured: qe,
  serverPrefetch: qe,
  components: Yn,
  directives: Yn,
  watch: vd,
  provide: ki,
  inject: bd,
};
function ki(e, t) {
  return t
    ? e
      ? function () {
          return ke(
            te(e) ? e.call(this, this) : e,
            te(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function bd(e, t) {
  return Yn(ns(e), ns(t));
}
function ns(e) {
  if (G(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function qe(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Yn(e, t) {
  return e ? ke(Object.create(null), e, t) : t;
}
function $i(e, t) {
  return e
    ? G(e) && G(t)
      ? [...new Set([...e, ...t])]
      : ke(Object.create(null), Si(e), Si(t ?? {}))
    : t;
}
function vd(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = ke(Object.create(null), e);
  for (const r in t) n[r] = qe(e[r], t[r]);
  return n;
}
function yc() {
  return {
    app: null,
    config: {
      isNativeTag: Hu,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let Cd = 0;
function wd(e, t) {
  return function (r, o = null) {
    te(r) || (r = ke({}, r)), o != null && !Ce(o) && (o = null);
    const s = yc(),
      i = new Set();
    let a = !1;
    const c = (s.app = {
      _uid: Cd++,
      _component: r,
      _props: o,
      _container: null,
      _context: s,
      _instance: null,
      version: Qd,
      get config() {
        return s.config;
      },
      set config(u) {},
      use(u, ...l) {
        return (
          i.has(u) ||
            (u && te(u.install)
              ? (i.add(u), u.install(c, ...l))
              : te(u) && (i.add(u), u(c, ...l))),
          c
        );
      },
      mixin(u) {
        return s.mixins.includes(u) || s.mixins.push(u), c;
      },
      component(u, l) {
        return l ? ((s.components[u] = l), c) : s.components[u];
      },
      directive(u, l) {
        return l ? ((s.directives[u] = l), c) : s.directives[u];
      },
      mount(u, l, f) {
        if (!a) {
          const p = j(r, o);
          return (
            (p.appContext = s),
            l && t ? t(p, u) : e(p, u, f),
            (a = !0),
            (c._container = u),
            (u.__vue_app__ = c),
            po(p.component) || p.component.proxy
          );
        }
      },
      unmount() {
        a && (e(null, c._container), delete c._container.__vue_app__);
      },
      provide(u, l) {
        return (s.provides[u] = l), c;
      },
      runWithContext(u) {
        Jr = c;
        try {
          return u();
        } finally {
          Jr = null;
        }
      },
    });
    return c;
  };
}
let Jr = null;
function Mr(e, t) {
  if (xe) {
    let n = xe.provides;
    const r = xe.parent && xe.parent.provides;
    r === n && (n = xe.provides = Object.create(r)), (n[e] = t);
  }
}
function mt(e, t, n = !1) {
  const r = xe || Me;
  if (r || Jr) {
    const o = r
      ? r.parent == null
        ? r.vnode.appContext && r.vnode.appContext.provides
        : r.parent.provides
      : Jr._context.provides;
    if (o && e in o) return o[e];
    if (arguments.length > 1) return n && te(t) ? t.call(r && r.proxy) : t;
  }
}
function Ed(e, t, n, r = !1) {
  const o = {},
    s = {};
  Kr(s, fo, 1), (e.propsDefaults = Object.create(null)), bc(e, t, o, s);
  for (const i in e.propsOptions[0]) i in o || (o[i] = void 0);
  n ? (e.props = r ? o : za(o)) : e.type.props ? (e.props = o) : (e.props = s),
    (e.attrs = s);
}
function Pd(e, t, n, r) {
  const {
      props: o,
      attrs: s,
      vnode: { patchFlag: i },
    } = e,
    a = le(o),
    [c] = e.propsOptions;
  let u = !1;
  if ((r || i > 0) && !(i & 16)) {
    if (i & 8) {
      const l = e.vnode.dynamicProps;
      for (let f = 0; f < l.length; f++) {
        let p = l[f];
        if (ao(e.emitsOptions, p)) continue;
        const y = t[p];
        if (c)
          if (fe(s, p)) y !== s[p] && ((s[p] = y), (u = !0));
          else {
            const g = wt(p);
            o[g] = rs(c, a, g, y, e, !1);
          }
        else y !== s[p] && ((s[p] = y), (u = !0));
      }
    }
  } else {
    bc(e, t, o, s) && (u = !0);
    let l;
    for (const f in a)
      (!t || (!fe(t, f) && ((l = Bn(f)) === f || !fe(t, l)))) &&
        (c
          ? n &&
            (n[f] !== void 0 || n[l] !== void 0) &&
            (o[f] = rs(c, a, f, void 0, e, !0))
          : delete o[f]);
    if (s !== a)
      for (const f in s) (!t || !fe(t, f)) && (delete s[f], (u = !0));
  }
  u && xt(e, "set", "$attrs");
}
function bc(e, t, n, r) {
  const [o, s] = e.propsOptions;
  let i = !1,
    a;
  if (t)
    for (let c in t) {
      if (Fr(c)) continue;
      const u = t[c];
      let l;
      o && fe(o, (l = wt(c)))
        ? !s || !s.includes(l)
          ? (n[l] = u)
          : ((a || (a = {}))[l] = u)
        : ao(e.emitsOptions, c) ||
          ((!(c in r) || u !== r[c]) && ((r[c] = u), (i = !0)));
    }
  if (s) {
    const c = le(n),
      u = a || we;
    for (let l = 0; l < s.length; l++) {
      const f = s[l];
      n[f] = rs(o, c, f, u[f], e, !fe(u, f));
    }
  }
  return i;
}
function rs(e, t, n, r, o, s) {
  const i = e[n];
  if (i != null) {
    const a = fe(i, "default");
    if (a && r === void 0) {
      const c = i.default;
      if (i.type !== Function && !i.skipFactory && te(c)) {
        const { propsDefaults: u } = o;
        n in u ? (r = u[n]) : (xn(o), (r = u[n] = c.call(null, t)), ln());
      } else r = c;
    }
    i[0] &&
      (s && !a ? (r = !1) : i[1] && (r === "" || r === Bn(n)) && (r = !0));
  }
  return r;
}
function vc(e, t, n = !1) {
  const r = t.propsCache,
    o = r.get(e);
  if (o) return o;
  const s = e.props,
    i = {},
    a = [];
  let c = !1;
  if (!te(e)) {
    const l = (f) => {
      c = !0;
      const [p, y] = vc(f, t, !0);
      ke(i, p), y && a.push(...y);
    };
    !n && t.mixins.length && t.mixins.forEach(l),
      e.extends && l(e.extends),
      e.mixins && e.mixins.forEach(l);
  }
  if (!s && !c) return Ce(e) && r.set(e, On), On;
  if (G(s))
    for (let l = 0; l < s.length; l++) {
      const f = wt(s[l]);
      Ii(f) && (i[f] = we);
    }
  else if (s)
    for (const l in s) {
      const f = wt(l);
      if (Ii(f)) {
        const p = s[l],
          y = (i[f] = G(p) || te(p) ? { type: p } : ke({}, p));
        if (y) {
          const g = Ni(Boolean, y.type),
            C = Ni(String, y.type);
          (y[0] = g > -1),
            (y[1] = C < 0 || g < C),
            (g > -1 || fe(y, "default")) && a.push(f);
        }
      }
    }
  const u = [i, a];
  return Ce(e) && r.set(e, u), u;
}
function Ii(e) {
  return e[0] !== "$";
}
function xi(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function Ri(e, t) {
  return xi(e) === xi(t);
}
function Ni(e, t) {
  return G(t) ? t.findIndex((n) => Ri(n, e)) : te(t) && Ri(t, e) ? 0 : -1;
}
const Cc = (e) => e[0] === "_" || e === "$stable",
  Rs = (e) => (G(e) ? e.map(bt) : [bt(e)]),
  Td = (e, t, n) => {
    if (t._n) return t;
    const r = ve((...o) => Rs(t(...o)), n);
    return (r._c = !1), r;
  },
  wc = (e, t, n) => {
    const r = e._ctx;
    for (const o in e) {
      if (Cc(o)) continue;
      const s = e[o];
      if (te(s)) t[o] = Td(o, s, r);
      else if (s != null) {
        const i = Rs(s);
        t[o] = () => i;
      }
    }
  },
  Ec = (e, t) => {
    const n = Rs(t);
    e.slots.default = () => n;
  },
  Od = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = le(t)), Kr(t, "_", n)) : wc(t, (e.slots = {}));
    } else (e.slots = {}), t && Ec(e, t);
    Kr(e.slots, fo, 1);
  },
  Sd = (e, t, n) => {
    const { vnode: r, slots: o } = e;
    let s = !0,
      i = we;
    if (r.shapeFlag & 32) {
      const a = t._;
      a
        ? n && a === 1
          ? (s = !1)
          : (ke(o, t), !n && a === 1 && delete o._)
        : ((s = !t.$stable), wc(t, o)),
        (i = t);
    } else t && (Ec(e, t), (i = { default: 1 }));
    if (s) for (const a in o) !Cc(a) && !(a in i) && delete o[a];
  };
function os(e, t, n, r, o = !1) {
  if (G(e)) {
    e.forEach((p, y) => os(p, t && (G(t) ? t[y] : t), n, r, o));
    return;
  }
  if (Zn(r) && !o) return;
  const s = r.shapeFlag & 4 ? po(r.component) || r.component.proxy : r.el,
    i = o ? null : s,
    { i: a, r: c } = e,
    u = t && t.r,
    l = a.refs === we ? (a.refs = {}) : a.refs,
    f = a.setupState;
  if (
    (u != null &&
      u !== c &&
      ($e(u)
        ? ((l[u] = null), fe(f, u) && (f[u] = null))
        : De(u) && (u.value = null)),
    te(c))
  )
    Vt(c, a, 12, [i, l]);
  else {
    const p = $e(c),
      y = De(c);
    if (p || y) {
      const g = () => {
        if (e.f) {
          const C = p ? (fe(f, c) ? f[c] : l[c]) : c.value;
          o
            ? G(C) && bs(C, s)
            : G(C)
            ? C.includes(s) || C.push(s)
            : p
            ? ((l[c] = [s]), fe(f, c) && (f[c] = l[c]))
            : ((c.value = [s]), e.k && (l[e.k] = c.value));
        } else
          p
            ? ((l[c] = i), fe(f, c) && (f[c] = i))
            : y && ((c.value = i), e.k && (l[e.k] = i));
      };
      i ? ((g.id = -1), We(g, n)) : g();
    }
  }
}
const We = Yf;
function Ad(e) {
  return kd(e);
}
function kd(e, t) {
  const n = Qo();
  n.__VUE__ = !0;
  const {
      insert: r,
      remove: o,
      patchProp: s,
      createElement: i,
      createText: a,
      createComment: c,
      setText: u,
      setElementText: l,
      parentNode: f,
      nextSibling: p,
      setScopeId: y = ht,
      insertStaticContent: g,
    } = e,
    C = (
      h,
      m,
      b,
      w = null,
      O = null,
      A = null,
      M = !1,
      R = null,
      F = !!m.dynamicChildren
    ) => {
      if (h === m) return;
      h && !on(h, m) && ((w = P(h)), je(h, O, A, !0), (h = null)),
        m.patchFlag === -2 && ((F = !1), (m.dynamicChildren = null));
      const { type: k, ref: W, shapeFlag: H } = m;
      switch (k) {
        case uo:
          N(h, m, b, w);
          break;
        case at:
          I(h, m, b, w);
          break;
        case jr:
          h == null && $(m, b, w, M);
          break;
        case me:
          U(h, m, b, w, O, A, M, R, F);
          break;
        default:
          H & 1
            ? Y(h, m, b, w, O, A, M, R, F)
            : H & 6
            ? de(h, m, b, w, O, A, M, R, F)
            : (H & 64 || H & 128) && k.process(h, m, b, w, O, A, M, R, F, D);
      }
      W != null && O && os(W, h && h.ref, A, m || h, !m);
    },
    N = (h, m, b, w) => {
      if (h == null) r((m.el = a(m.children)), b, w);
      else {
        const O = (m.el = h.el);
        m.children !== h.children && u(O, m.children);
      }
    },
    I = (h, m, b, w) => {
      h == null ? r((m.el = c(m.children || "")), b, w) : (m.el = h.el);
    },
    $ = (h, m, b, w) => {
      [h.el, h.anchor] = g(h.children, m, b, w, h.el, h.anchor);
    },
    J = ({ el: h, anchor: m }, b, w) => {
      let O;
      for (; h && h !== m; ) (O = p(h)), r(h, b, w), (h = O);
      r(m, b, w);
    },
    L = ({ el: h, anchor: m }) => {
      let b;
      for (; h && h !== m; ) (b = p(h)), o(h), (h = b);
      o(m);
    },
    Y = (h, m, b, w, O, A, M, R, F) => {
      (M = M || m.type === "svg"),
        h == null ? Z(m, b, w, O, A, M, R, F) : se(h, m, O, A, M, R, F);
    },
    Z = (h, m, b, w, O, A, M, R) => {
      let F, k;
      const { type: W, props: H, shapeFlag: V, transition: X, dirs: oe } = h;
      if (
        ((F = h.el = i(h.type, A, H && H.is, H)),
        V & 8
          ? l(F, h.children)
          : V & 16 &&
            z(h.children, F, null, w, O, A && W !== "foreignObject", M, R),
        oe && en(h, null, w, "created"),
        ee(F, h, h.scopeId, M, w),
        H)
      ) {
        for (const he in H)
          he !== "value" &&
            !Fr(he) &&
            s(F, he, null, H[he], A, h.children, w, O, Ne);
        "value" in H && s(F, "value", null, H.value),
          (k = H.onVnodeBeforeMount) && yt(k, w, h);
      }
      oe && en(h, null, w, "beforeMount");
      const ye = (!O || (O && !O.pendingBranch)) && X && !X.persisted;
      ye && X.beforeEnter(F),
        r(F, m, b),
        ((k = H && H.onVnodeMounted) || ye || oe) &&
          We(() => {
            k && yt(k, w, h), ye && X.enter(F), oe && en(h, null, w, "mounted");
          }, O);
    },
    ee = (h, m, b, w, O) => {
      if ((b && y(h, b), w)) for (let A = 0; A < w.length; A++) y(h, w[A]);
      if (O) {
        let A = O.subTree;
        if (m === A) {
          const M = O.vnode;
          ee(h, M, M.scopeId, M.slotScopeIds, O.parent);
        }
      }
    },
    z = (h, m, b, w, O, A, M, R, F = 0) => {
      for (let k = F; k < h.length; k++) {
        const W = (h[k] = R ? Bt(h[k]) : bt(h[k]));
        C(null, W, m, b, w, O, A, M, R);
      }
    },
    se = (h, m, b, w, O, A, M) => {
      const R = (m.el = h.el);
      let { patchFlag: F, dynamicChildren: k, dirs: W } = m;
      F |= h.patchFlag & 16;
      const H = h.props || we,
        V = m.props || we;
      let X;
      b && tn(b, !1),
        (X = V.onVnodeBeforeUpdate) && yt(X, b, m, h),
        W && en(m, h, b, "beforeUpdate"),
        b && tn(b, !0);
      const oe = O && m.type !== "foreignObject";
      if (
        (k
          ? re(h.dynamicChildren, k, R, b, w, oe, A)
          : M || pe(h, m, R, null, b, w, oe, A, !1),
        F > 0)
      ) {
        if (F & 16) _e(R, m, H, V, b, w, O);
        else if (
          (F & 2 && H.class !== V.class && s(R, "class", null, V.class, O),
          F & 4 && s(R, "style", H.style, V.style, O),
          F & 8)
        ) {
          const ye = m.dynamicProps;
          for (let he = 0; he < ye.length; he++) {
            const Oe = ye[he],
              Xe = H[Oe],
              Nt = V[Oe];
            (Nt !== Xe || Oe === "value") &&
              s(R, Oe, Xe, Nt, O, h.children, b, w, Ne);
          }
        }
        F & 1 && h.children !== m.children && l(R, m.children);
      } else !M && k == null && _e(R, m, H, V, b, w, O);
      ((X = V.onVnodeUpdated) || W) &&
        We(() => {
          X && yt(X, b, m, h), W && en(m, h, b, "updated");
        }, w);
    },
    re = (h, m, b, w, O, A, M) => {
      for (let R = 0; R < m.length; R++) {
        const F = h[R],
          k = m[R],
          W =
            F.el && (F.type === me || !on(F, k) || F.shapeFlag & 70)
              ? f(F.el)
              : b;
        C(F, k, W, null, w, O, A, M, !0);
      }
    },
    _e = (h, m, b, w, O, A, M) => {
      if (b !== w) {
        if (b !== we)
          for (const R in b)
            !Fr(R) && !(R in w) && s(h, R, b[R], null, M, m.children, O, A, Ne);
        for (const R in w) {
          if (Fr(R)) continue;
          const F = w[R],
            k = b[R];
          F !== k && R !== "value" && s(h, R, k, F, M, m.children, O, A, Ne);
        }
        "value" in w && s(h, "value", b.value, w.value);
      }
    },
    U = (h, m, b, w, O, A, M, R, F) => {
      const k = (m.el = h ? h.el : a("")),
        W = (m.anchor = h ? h.anchor : a(""));
      let { patchFlag: H, dynamicChildren: V, slotScopeIds: X } = m;
      X && (R = R ? R.concat(X) : X),
        h == null
          ? (r(k, b, w), r(W, b, w), z(m.children, b, W, O, A, M, R, F))
          : H > 0 && H & 64 && V && h.dynamicChildren
          ? (re(h.dynamicChildren, V, b, O, A, M, R),
            (m.key != null || (O && m === O.subTree)) && Ns(h, m, !0))
          : pe(h, m, b, W, O, A, M, R, F);
    },
    de = (h, m, b, w, O, A, M, R, F) => {
      (m.slotScopeIds = R),
        h == null
          ? m.shapeFlag & 512
            ? O.ctx.activate(m, b, w, M, F)
            : Re(m, b, w, O, A, M, F)
          : et(h, m, F);
    },
    Re = (h, m, b, w, O, A, M) => {
      const R = (h.component = Bd(h, w, O));
      if ((gr(h) && (R.ctx.renderer = D), Ud(R), R.asyncDep)) {
        if ((O && O.registerDep(R, Te), !h.el)) {
          const F = (R.subTree = j(at));
          I(null, F, m, b);
        }
        return;
      }
      Te(R, h, m, b, O, A, M);
    },
    et = (h, m, b) => {
      const w = (m.component = h.component);
      if (Qf(h, m, b))
        if (w.asyncDep && !w.asyncResolved) {
          ge(w, m, b);
          return;
        } else (w.next = m), Vf(w.update), w.update();
      else (m.el = h.el), (w.vnode = m);
    },
    Te = (h, m, b, w, O, A, M) => {
      const R = () => {
          if (h.isMounted) {
            let { next: W, bu: H, u: V, parent: X, vnode: oe } = h,
              ye = W,
              he;
            tn(h, !1),
              W ? ((W.el = oe.el), ge(h, W, M)) : (W = oe),
              H && Dr(H),
              (he = W.props && W.props.onVnodeBeforeUpdate) && yt(he, X, W, oe),
              tn(h, !0);
            const Oe = Ro(h),
              Xe = h.subTree;
            (h.subTree = Oe),
              C(Xe, Oe, f(Xe.el), P(Xe), h, O, A),
              (W.el = Oe.el),
              ye === null && Jf(h, Oe.el),
              V && We(V, O),
              (he = W.props && W.props.onVnodeUpdated) &&
                We(() => yt(he, X, W, oe), O);
          } else {
            let W;
            const { el: H, props: V } = m,
              { bm: X, m: oe, parent: ye } = h,
              he = Zn(m);
            if (
              (tn(h, !1),
              X && Dr(X),
              !he && (W = V && V.onVnodeBeforeMount) && yt(W, ye, m),
              tn(h, !0),
              H && ue)
            ) {
              const Oe = () => {
                (h.subTree = Ro(h)), ue(H, h.subTree, h, O, null);
              };
              he
                ? m.type.__asyncLoader().then(() => !h.isUnmounted && Oe())
                : Oe();
            } else {
              const Oe = (h.subTree = Ro(h));
              C(null, Oe, b, w, h, O, A), (m.el = Oe.el);
            }
            if ((oe && We(oe, O), !he && (W = V && V.onVnodeMounted))) {
              const Oe = m;
              We(() => yt(W, ye, Oe), O);
            }
            (m.shapeFlag & 256 ||
              (ye && Zn(ye.vnode) && ye.vnode.shapeFlag & 256)) &&
              h.a &&
              We(h.a, O),
              (h.isMounted = !0),
              (m = b = w = null);
          }
        },
        F = (h.effect = new Es(R, () => io(k), h.scope)),
        k = (h.update = () => F.run());
      (k.id = h.uid), tn(h, !0), k();
    },
    ge = (h, m, b) => {
      m.component = h;
      const w = h.vnode.props;
      (h.vnode = m),
        (h.next = null),
        Pd(h, m.props, w, b),
        Sd(h, m.children, b),
        Un(),
        Ei(),
        Hn();
    },
    pe = (h, m, b, w, O, A, M, R, F = !1) => {
      const k = h && h.children,
        W = h ? h.shapeFlag : 0,
        H = m.children,
        { patchFlag: V, shapeFlag: X } = m;
      if (V > 0) {
        if (V & 128) {
          ie(k, H, b, w, O, A, M, R, F);
          return;
        } else if (V & 256) {
          lt(k, H, b, w, O, A, M, R, F);
          return;
        }
      }
      X & 8
        ? (W & 16 && Ne(k, O, A), H !== k && l(b, H))
        : W & 16
        ? X & 16
          ? ie(k, H, b, w, O, A, M, R, F)
          : Ne(k, O, A, !0)
        : (W & 8 && l(b, ""), X & 16 && z(H, b, w, O, A, M, R, F));
    },
    lt = (h, m, b, w, O, A, M, R, F) => {
      (h = h || On), (m = m || On);
      const k = h.length,
        W = m.length,
        H = Math.min(k, W);
      let V;
      for (V = 0; V < H; V++) {
        const X = (m[V] = F ? Bt(m[V]) : bt(m[V]));
        C(h[V], X, b, null, O, A, M, R, F);
      }
      k > W ? Ne(h, O, A, !0, !1, H) : z(m, b, w, O, A, M, R, F, H);
    },
    ie = (h, m, b, w, O, A, M, R, F) => {
      let k = 0;
      const W = m.length;
      let H = h.length - 1,
        V = W - 1;
      for (; k <= H && k <= V; ) {
        const X = h[k],
          oe = (m[k] = F ? Bt(m[k]) : bt(m[k]));
        if (on(X, oe)) C(X, oe, b, null, O, A, M, R, F);
        else break;
        k++;
      }
      for (; k <= H && k <= V; ) {
        const X = h[H],
          oe = (m[V] = F ? Bt(m[V]) : bt(m[V]));
        if (on(X, oe)) C(X, oe, b, null, O, A, M, R, F);
        else break;
        H--, V--;
      }
      if (k > H) {
        if (k <= V) {
          const X = V + 1,
            oe = X < W ? m[X].el : w;
          for (; k <= V; )
            C(null, (m[k] = F ? Bt(m[k]) : bt(m[k])), b, oe, O, A, M, R, F),
              k++;
        }
      } else if (k > V) for (; k <= H; ) je(h[k], O, A, !0), k++;
      else {
        const X = k,
          oe = k,
          ye = new Map();
        for (k = oe; k <= V; k++) {
          const Ve = (m[k] = F ? Bt(m[k]) : bt(m[k]));
          Ve.key != null && ye.set(Ve.key, k);
        }
        let he,
          Oe = 0;
        const Xe = V - oe + 1;
        let Nt = !1,
          wr = 0;
        const Jt = new Array(Xe);
        for (k = 0; k < Xe; k++) Jt[k] = 0;
        for (k = X; k <= H; k++) {
          const Ve = h[k];
          if (Oe >= Xe) {
            je(Ve, O, A, !0);
            continue;
          }
          let nt;
          if (Ve.key != null) nt = ye.get(Ve.key);
          else
            for (he = oe; he <= V; he++)
              if (Jt[he - oe] === 0 && on(Ve, m[he])) {
                nt = he;
                break;
              }
          nt === void 0
            ? je(Ve, O, A, !0)
            : ((Jt[nt - oe] = k + 1),
              nt >= wr ? (wr = nt) : (Nt = !0),
              C(Ve, m[nt], b, null, O, A, M, R, F),
              Oe++);
        }
        const qn = Nt ? $d(Jt) : On;
        for (he = qn.length - 1, k = Xe - 1; k >= 0; k--) {
          const Ve = oe + k,
            nt = m[Ve],
            gn = Ve + 1 < W ? m[Ve + 1].el : w;
          Jt[k] === 0
            ? C(null, nt, b, gn, O, A, M, R, F)
            : Nt && (he < 0 || k !== qn[he] ? tt(nt, b, gn, 2) : he--);
        }
      }
    },
    tt = (h, m, b, w, O = null) => {
      const { el: A, type: M, transition: R, children: F, shapeFlag: k } = h;
      if (k & 6) {
        tt(h.component.subTree, m, b, w);
        return;
      }
      if (k & 128) {
        h.suspense.move(m, b, w);
        return;
      }
      if (k & 64) {
        M.move(h, m, b, D);
        return;
      }
      if (M === me) {
        r(A, m, b);
        for (let H = 0; H < F.length; H++) tt(F[H], m, b, w);
        r(h.anchor, m, b);
        return;
      }
      if (M === jr) {
        J(h, m, b);
        return;
      }
      if (w !== 2 && k & 1 && R)
        if (w === 0) R.beforeEnter(A), r(A, m, b), We(() => R.enter(A), O);
        else {
          const { leave: H, delayLeave: V, afterLeave: X } = R,
            oe = () => r(A, m, b),
            ye = () => {
              H(A, () => {
                oe(), X && X();
              });
            };
          V ? V(A, oe, ye) : ye();
        }
      else r(A, m, b);
    },
    je = (h, m, b, w = !1, O = !1) => {
      const {
        type: A,
        props: M,
        ref: R,
        children: F,
        dynamicChildren: k,
        shapeFlag: W,
        patchFlag: H,
        dirs: V,
      } = h;
      if ((R != null && os(R, null, b, h, !0), W & 256)) {
        m.ctx.deactivate(h);
        return;
      }
      const X = W & 1 && V,
        oe = !Zn(h);
      let ye;
      if ((oe && (ye = M && M.onVnodeBeforeUnmount) && yt(ye, m, h), W & 6))
        Qt(h.component, b, w);
      else {
        if (W & 128) {
          h.suspense.unmount(b, w);
          return;
        }
        X && en(h, null, m, "beforeUnmount"),
          W & 64
            ? h.type.remove(h, m, b, O, D, w)
            : k && (A !== me || (H > 0 && H & 64))
            ? Ne(k, m, b, !1, !0)
            : ((A === me && H & 384) || (!O && W & 16)) && Ne(F, m, b),
          w && Be(h);
      }
      ((oe && (ye = M && M.onVnodeUnmounted)) || X) &&
        We(() => {
          ye && yt(ye, m, h), X && en(h, null, m, "unmounted");
        }, b);
    },
    Be = (h) => {
      const { type: m, el: b, anchor: w, transition: O } = h;
      if (m === me) {
        Pt(b, w);
        return;
      }
      if (m === jr) {
        L(h);
        return;
      }
      const A = () => {
        o(b), O && !O.persisted && O.afterLeave && O.afterLeave();
      };
      if (h.shapeFlag & 1 && O && !O.persisted) {
        const { leave: M, delayLeave: R } = O,
          F = () => M(b, A);
        R ? R(h.el, A, F) : F();
      } else A();
    },
    Pt = (h, m) => {
      let b;
      for (; h !== m; ) (b = p(h)), o(h), (h = b);
      o(m);
    },
    Qt = (h, m, b) => {
      const { bum: w, scope: O, update: A, subTree: M, um: R } = h;
      w && Dr(w),
        O.stop(),
        A && ((A.active = !1), je(M, h, m, b)),
        R && We(R, m),
        We(() => {
          h.isUnmounted = !0;
        }, m),
        m &&
          m.pendingBranch &&
          !m.isUnmounted &&
          h.asyncDep &&
          !h.asyncResolved &&
          h.suspenseId === m.pendingId &&
          (m.deps--, m.deps === 0 && m.resolve());
    },
    Ne = (h, m, b, w = !1, O = !1, A = 0) => {
      for (let M = A; M < h.length; M++) je(h[M], m, b, w, O);
    },
    P = (h) =>
      h.shapeFlag & 6
        ? P(h.component.subTree)
        : h.shapeFlag & 128
        ? h.suspense.next()
        : p(h.anchor || h.el),
    B = (h, m, b) => {
      h == null
        ? m._vnode && je(m._vnode, null, null, !0)
        : C(m._vnode || null, h, m, null, null, null, b),
        Ei(),
        rc(),
        (m._vnode = h);
    },
    D = {
      p: C,
      um: je,
      m: tt,
      r: Be,
      mt: Re,
      mc: z,
      pc: pe,
      pbc: re,
      n: P,
      o: e,
    };
  let q, ue;
  return t && ([q, ue] = t(D)), { render: B, hydrate: q, createApp: wd(B, q) };
}
function tn({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function Ns(e, t, n = !1) {
  const r = e.children,
    o = t.children;
  if (G(r) && G(o))
    for (let s = 0; s < r.length; s++) {
      const i = r[s];
      let a = o[s];
      a.shapeFlag & 1 &&
        !a.dynamicChildren &&
        ((a.patchFlag <= 0 || a.patchFlag === 32) &&
          ((a = o[s] = Bt(o[s])), (a.el = i.el)),
        n || Ns(i, a)),
        a.type === uo && (a.el = i.el);
    }
}
function $d(e) {
  const t = e.slice(),
    n = [0];
  let r, o, s, i, a;
  const c = e.length;
  for (r = 0; r < c; r++) {
    const u = e[r];
    if (u !== 0) {
      if (((o = n[n.length - 1]), e[o] < u)) {
        (t[r] = o), n.push(r);
        continue;
      }
      for (s = 0, i = n.length - 1; s < i; )
        (a = (s + i) >> 1), e[n[a]] < u ? (s = a + 1) : (i = a);
      u < e[n[s]] && (s > 0 && (t[r] = n[s - 1]), (n[s] = r));
    }
  }
  for (s = n.length, i = n[s - 1]; s-- > 0; ) (n[s] = i), (i = t[i]);
  return n;
}
const Id = (e) => e.__isTeleport,
  tr = (e) => e && (e.disabled || e.disabled === ""),
  Li = (e) => typeof SVGElement < "u" && e instanceof SVGElement,
  ss = (e, t) => {
    const n = e && e.to;
    return $e(n) ? (t ? t(n) : null) : n;
  },
  xd = {
    __isTeleport: !0,
    process(e, t, n, r, o, s, i, a, c, u) {
      const {
          mc: l,
          pc: f,
          pbc: p,
          o: { insert: y, querySelector: g, createText: C, createComment: N },
        } = u,
        I = tr(t.props);
      let { shapeFlag: $, children: J, dynamicChildren: L } = t;
      if (e == null) {
        const Y = (t.el = C("")),
          Z = (t.anchor = C(""));
        y(Y, n, r), y(Z, n, r);
        const ee = (t.target = ss(t.props, g)),
          z = (t.targetAnchor = C(""));
        ee && (y(z, ee), (i = i || Li(ee)));
        const se = (re, _e) => {
          $ & 16 && l(J, re, _e, o, s, i, a, c);
        };
        I ? se(n, Z) : ee && se(ee, z);
      } else {
        t.el = e.el;
        const Y = (t.anchor = e.anchor),
          Z = (t.target = e.target),
          ee = (t.targetAnchor = e.targetAnchor),
          z = tr(e.props),
          se = z ? n : Z,
          re = z ? Y : ee;
        if (
          ((i = i || Li(Z)),
          L
            ? (p(e.dynamicChildren, L, se, o, s, i, a), Ns(e, t, !0))
            : c || f(e, t, se, re, o, s, i, a, !1),
          I)
        )
          z || Rr(t, n, Y, u, 1);
        else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
          const _e = (t.target = ss(t.props, g));
          _e && Rr(t, _e, null, u, 0);
        } else z && Rr(t, Z, ee, u, 1);
      }
      Pc(t);
    },
    remove(e, t, n, r, { um: o, o: { remove: s } }, i) {
      const {
        shapeFlag: a,
        children: c,
        anchor: u,
        targetAnchor: l,
        target: f,
        props: p,
      } = e;
      if ((f && s(l), (i || !tr(p)) && (s(u), a & 16)))
        for (let y = 0; y < c.length; y++) {
          const g = c[y];
          o(g, t, n, !0, !!g.dynamicChildren);
        }
    },
    move: Rr,
    hydrate: Rd,
  };
function Rr(e, t, n, { o: { insert: r }, m: o }, s = 2) {
  s === 0 && r(e.targetAnchor, t, n);
  const { el: i, anchor: a, shapeFlag: c, children: u, props: l } = e,
    f = s === 2;
  if ((f && r(i, t, n), (!f || tr(l)) && c & 16))
    for (let p = 0; p < u.length; p++) o(u[p], t, n, 2);
  f && r(a, t, n);
}
function Rd(
  e,
  t,
  n,
  r,
  o,
  s,
  { o: { nextSibling: i, parentNode: a, querySelector: c } },
  u
) {
  const l = (t.target = ss(t.props, c));
  if (l) {
    const f = l._lpa || l.firstChild;
    if (t.shapeFlag & 16)
      if (tr(t.props))
        (t.anchor = u(i(e), t, a(e), n, r, o, s)), (t.targetAnchor = f);
      else {
        t.anchor = i(e);
        let p = f;
        for (; p; )
          if (
            ((p = i(p)), p && p.nodeType === 8 && p.data === "teleport anchor")
          ) {
            (t.targetAnchor = p),
              (l._lpa = t.targetAnchor && i(t.targetAnchor));
            break;
          }
        u(f, t, l, n, r, o, s);
      }
    Pc(t);
  }
  return t.anchor && i(t.anchor);
}
const Nd = xd;
function Pc(e) {
  const t = e.ctx;
  if (t && t.ut) {
    let n = e.children[0].el;
    for (; n !== e.targetAnchor; )
      n.nodeType === 1 && n.setAttribute("data-v-owner", t.uid),
        (n = n.nextSibling);
    t.ut();
  }
}
const me = Symbol.for("v-fgt"),
  uo = Symbol.for("v-txt"),
  at = Symbol.for("v-cmt"),
  jr = Symbol.for("v-stc"),
  nr = [];
let dt = null;
function S(e = !1) {
  nr.push((dt = e ? null : []));
}
function Ld() {
  nr.pop(), (dt = nr[nr.length - 1] || null);
}
let dr = 1;
function Fi(e) {
  dr += e;
}
function Tc(e) {
  return (
    (e.dynamicChildren = dr > 0 ? dt || On : null),
    Ld(),
    dr > 0 && dt && dt.push(e),
    e
  );
}
function x(e, t, n, r, o, s) {
  return Tc(_(e, t, n, r, o, s, !0));
}
function Fe(e, t, n, r, o) {
  return Tc(j(e, t, n, r, o, !0));
}
function Xr(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function on(e, t) {
  return e.type === t.type && e.key === t.key;
}
const fo = "__vInternal",
  Oc = ({ key: e }) => e ?? null,
  Br = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == "number" && (e = "" + e),
    e != null
      ? $e(e) || De(e) || te(e)
        ? { i: Me, r: e, k: t, f: !!n }
        : e
      : null
  );
function _(
  e,
  t = null,
  n = null,
  r = 0,
  o = null,
  s = e === me ? 0 : 1,
  i = !1,
  a = !1
) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Oc(t),
    ref: t && Br(t),
    scopeId: co,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: s,
    patchFlag: r,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: Me,
  };
  return (
    a
      ? (Ls(c, n), s & 128 && e.normalize(c))
      : n && (c.shapeFlag |= $e(n) ? 8 : 16),
    dr > 0 &&
      !i &&
      dt &&
      (c.patchFlag > 0 || s & 6) &&
      c.patchFlag !== 32 &&
      dt.push(c),
    c
  );
}
const j = Fd;
function Fd(e, t = null, n = null, r = 0, o = null, s = !1) {
  if (((!e || e === pd) && (e = at), Xr(e))) {
    const a = zt(e, t, !0);
    return (
      n && Ls(a, n),
      dr > 0 &&
        !s &&
        dt &&
        (a.shapeFlag & 6 ? (dt[dt.indexOf(e)] = a) : dt.push(a)),
      (a.patchFlag |= -2),
      a
    );
  }
  if ((zd(e) && (e = e.__vccOpts), t)) {
    t = Dd(t);
    let { class: a, style: c } = t;
    a && !$e(a) && (t.class = $t(a)),
      Ce(c) && (Ga(c) && !G(c) && (c = ke({}, c)), (t.style = fn(c)));
  }
  const i = $e(e) ? 1 : Xf(e) ? 128 : Id(e) ? 64 : Ce(e) ? 4 : te(e) ? 2 : 0;
  return _(e, t, n, r, o, i, s, !0);
}
function Dd(e) {
  return e ? (Ga(e) || fo in e ? ke({}, e) : e) : null;
}
function zt(e, t, n = !1) {
  const { props: r, ref: o, patchFlag: s, children: i } = e,
    a = t ? Ac(r || {}, t) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: a,
    key: a && Oc(a),
    ref:
      t && t.ref ? (n && o ? (G(o) ? o.concat(Br(t)) : [o, Br(t)]) : Br(t)) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== me ? (s === -1 ? 16 : s | 16) : s,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && zt(e.ssContent),
    ssFallback: e.ssFallback && zt(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
  };
}
function Ee(e = " ", t = 0) {
  return j(uo, null, e, t);
}
function Sc(e, t) {
  const n = j(jr, null, e);
  return (n.staticCount = t), n;
}
function Ae(e = "", t = !1) {
  return t ? (S(), Fe(at, null, e)) : j(at, null, e);
}
function bt(e) {
  return e == null || typeof e == "boolean"
    ? j(at)
    : G(e)
    ? j(me, null, e.slice())
    : typeof e == "object"
    ? Bt(e)
    : j(uo, null, String(e));
}
function Bt(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : zt(e);
}
function Ls(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null) t = null;
  else if (G(t)) n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), Ls(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !(fo in t)
        ? (t._ctx = Me)
        : o === 3 &&
          Me &&
          (Me.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    te(t)
      ? ((t = { default: t, _ctx: Me }), (n = 32))
      : ((t = String(t)), r & 64 ? ((n = 16), (t = [Ee(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function Ac(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const o in r)
      if (o === "class")
        t.class !== r.class && (t.class = $t([t.class, r.class]));
      else if (o === "style") t.style = fn([t.style, r.style]);
      else if (no(o)) {
        const s = t[o],
          i = r[o];
        i &&
          s !== i &&
          !(G(s) && s.includes(i)) &&
          (t[o] = s ? [].concat(s, i) : i);
      } else o !== "" && (t[o] = r[o]);
  }
  return t;
}
function yt(e, t, n, r = null) {
  st(e, t, 7, [n, r]);
}
const Md = yc();
let jd = 0;
function Bd(e, t, n) {
  const r = e.type,
    o = (t ? t.appContext : e.appContext) || Md,
    s = {
      uid: jd++,
      vnode: e,
      type: r,
      parent: t,
      appContext: o,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new La(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(o.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: vc(r, o),
      emitsOptions: sc(r, o),
      emit: null,
      emitted: null,
      propsDefaults: we,
      inheritAttrs: r.inheritAttrs,
      ctx: we,
      data: we,
      props: we,
      attrs: we,
      slots: we,
      refs: we,
      setupState: we,
      setupContext: null,
      attrsProxy: null,
      slotsProxy: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (s.ctx = { _: s }),
    (s.root = t ? t.root : s),
    (s.emit = zf.bind(null, s)),
    e.ce && e.ce(s),
    s
  );
}
let xe = null;
const Fs = () => xe || Me;
let Ds,
  wn,
  Di = "__VUE_INSTANCE_SETTERS__";
(wn = Qo()[Di]) || (wn = Qo()[Di] = []),
  wn.push((e) => (xe = e)),
  (Ds = (e) => {
    wn.length > 1 ? wn.forEach((t) => t(e)) : wn[0](e);
  });
const xn = (e) => {
    Ds(e), e.scope.on();
  },
  ln = () => {
    xe && xe.scope.off(), Ds(null);
  };
function kc(e) {
  return e.vnode.shapeFlag & 4;
}
let Rn = !1;
function Ud(e, t = !1) {
  Rn = t;
  const { props: n, children: r } = e.vnode,
    o = kc(e);
  Ed(e, n, o, t), Od(e, r);
  const s = o ? Hd(e, t) : void 0;
  return (Rn = !1), s;
}
function Hd(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = Qa(new Proxy(e.ctx, md)));
  const { setup: r } = n;
  if (r) {
    const o = (e.setupContext = r.length > 1 ? Kd(e) : null);
    xn(e), Un();
    const s = Vt(r, e, 0, [e.props, o]);
    if ((Hn(), ln(), $a(s))) {
      if ((s.then(ln, ln), t))
        return s
          .then((i) => {
            Mi(e, i, t);
          })
          .catch((i) => {
            _r(i, e, 0);
          });
      e.asyncDep = s;
    } else Mi(e, s, t);
  } else $c(e, t);
}
function Mi(e, t, n) {
  te(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : Ce(t) && (e.setupState = Za(t)),
    $c(e, n);
}
let ji;
function $c(e, t, n) {
  const r = e.type;
  if (!e.render) {
    if (!t && ji && !r.render) {
      const o = r.template || xs(e).template;
      if (o) {
        const { isCustomElement: s, compilerOptions: i } = e.appContext.config,
          { delimiters: a, compilerOptions: c } = r,
          u = ke(ke({ isCustomElement: s, delimiters: a }, i), c);
        r.render = ji(o, u);
      }
    }
    e.render = r.render || ht;
  }
  xn(e), Un(), _d(e), Hn(), ln();
}
function Vd(e) {
  return (
    e.attrsProxy ||
    (e.attrsProxy = new Proxy(e.attrs, {
      get(t, n) {
        return Qe(e, "get", "$attrs"), t[n];
      },
    }))
  );
}
function Kd(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return Vd(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function po(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(Za(Qa(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in er) return er[n](e);
        },
        has(t, n) {
          return n in t || n in er;
        },
      }))
    );
}
function qd(e, t = !0) {
  return te(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function zd(e) {
  return te(e) && "__vccOpts" in e;
}
const Se = (e, t) => Bf(e, t, Rn);
function br(e, t, n) {
  const r = arguments.length;
  return r === 2
    ? Ce(t) && !G(t)
      ? Xr(t)
        ? j(e, null, [t])
        : j(e, t)
      : j(e, null, t)
    : (r > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : r === 3 && Xr(n) && (n = [n]),
      j(e, t, n));
}
const Wd = Symbol.for("v-scx"),
  Gd = () => mt(Wd),
  Qd = "3.3.4",
  Jd = "http://www.w3.org/2000/svg",
  sn = typeof document < "u" ? document : null,
  Bi = sn && sn.createElement("template"),
  Xd = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, r) => {
      const o = t
        ? sn.createElementNS(Jd, e)
        : sn.createElement(e, n ? { is: n } : void 0);
      return (
        e === "select" &&
          r &&
          r.multiple != null &&
          o.setAttribute("multiple", r.multiple),
        o
      );
    },
    createText: (e) => sn.createTextNode(e),
    createComment: (e) => sn.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => sn.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    insertStaticContent(e, t, n, r, o, s) {
      const i = n ? n.previousSibling : t.lastChild;
      if (o && (o === s || o.nextSibling))
        for (
          ;
          t.insertBefore(o.cloneNode(!0), n),
            !(o === s || !(o = o.nextSibling));

        );
      else {
        Bi.innerHTML = r ? `<svg>${e}</svg>` : e;
        const a = Bi.content;
        if (r) {
          const c = a.firstChild;
          for (; c.firstChild; ) a.appendChild(c.firstChild);
          a.removeChild(c);
        }
        t.insertBefore(a, n);
      }
      return [
        i ? i.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  };
function Yd(e, t, n) {
  const r = e._vtc;
  r && (t = (t ? [t, ...r] : [...r]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
      ? e.setAttribute("class", t)
      : (e.className = t);
}
function Zd(e, t, n) {
  const r = e.style,
    o = $e(n);
  if (n && !o) {
    if (t && !$e(t)) for (const s in t) n[s] == null && is(r, s, "");
    for (const s in n) is(r, s, n[s]);
  } else {
    const s = r.display;
    o ? t !== n && (r.cssText = n) : t && e.removeAttribute("style"),
      "_vod" in e && (r.display = s);
  }
}
const Ui = /\s*!important$/;
function is(e, t, n) {
  if (G(n)) n.forEach((r) => is(e, t, r));
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
  else {
    const r = ep(e, t);
    Ui.test(n)
      ? e.setProperty(Bn(r), n.replace(Ui, ""), "important")
      : (e[r] = n);
  }
}
const Hi = ["Webkit", "Moz", "ms"],
  Do = {};
function ep(e, t) {
  const n = Do[t];
  if (n) return n;
  let r = wt(t);
  if (r !== "filter" && r in e) return (Do[t] = r);
  r = oo(r);
  for (let o = 0; o < Hi.length; o++) {
    const s = Hi[o] + r;
    if (s in e) return (Do[t] = s);
  }
  return t;
}
const Vi = "http://www.w3.org/1999/xlink";
function tp(e, t, n, r, o) {
  if (r && t.startsWith("xlink:"))
    n == null
      ? e.removeAttributeNS(Vi, t.slice(6, t.length))
      : e.setAttributeNS(Vi, t, n);
  else {
    const s = ef(t);
    n == null || (s && !Ra(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, s ? "" : n);
  }
}
function np(e, t, n, r, o, s, i) {
  if (t === "innerHTML" || t === "textContent") {
    r && i(r, o, s), (e[t] = n ?? "");
    return;
  }
  const a = e.tagName;
  if (t === "value" && a !== "PROGRESS" && !a.includes("-")) {
    e._value = n;
    const u = a === "OPTION" ? e.getAttribute("value") : e.value,
      l = n ?? "";
    u !== l && (e.value = l), n == null && e.removeAttribute(t);
    return;
  }
  let c = !1;
  if (n === "" || n == null) {
    const u = typeof e[t];
    u === "boolean"
      ? (n = Ra(n))
      : n == null && u === "string"
      ? ((n = ""), (c = !0))
      : u === "number" && ((n = 0), (c = !0));
  }
  try {
    e[t] = n;
  } catch {}
  c && e.removeAttribute(t);
}
function kt(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function rp(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
function op(e, t, n, r, o = null) {
  const s = e._vei || (e._vei = {}),
    i = s[t];
  if (r && i) i.value = r;
  else {
    const [a, c] = sp(t);
    if (r) {
      const u = (s[t] = cp(r, o));
      kt(e, a, u, c);
    } else i && (rp(e, a, i, c), (s[t] = void 0));
  }
}
const Ki = /(?:Once|Passive|Capture)$/;
function sp(e) {
  let t;
  if (Ki.test(e)) {
    t = {};
    let r;
    for (; (r = e.match(Ki)); )
      (e = e.slice(0, e.length - r[0].length)), (t[r[0].toLowerCase()] = !0);
  }
  return [e[2] === ":" ? e.slice(3) : Bn(e.slice(2)), t];
}
let Mo = 0;
const ip = Promise.resolve(),
  ap = () => Mo || (ip.then(() => (Mo = 0)), (Mo = Date.now()));
function cp(e, t) {
  const n = (r) => {
    if (!r._vts) r._vts = Date.now();
    else if (r._vts <= n.attached) return;
    st(lp(r, n.value), t, 5, [r]);
  };
  return (n.value = e), (n.attached = ap()), n;
}
function lp(e, t) {
  if (G(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((r) => (o) => !o._stopped && r && r(o))
    );
  } else return t;
}
const qi = /^on[a-z]/,
  up = (e, t, n, r, o = !1, s, i, a, c) => {
    t === "class"
      ? Yd(e, r, o)
      : t === "style"
      ? Zd(e, n, r)
      : no(t)
      ? ys(t) || op(e, t, n, r, i)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : fp(e, t, r, o)
        )
      ? np(e, t, r, s, i, a, c)
      : (t === "true-value"
          ? (e._trueValue = r)
          : t === "false-value" && (e._falseValue = r),
        tp(e, t, r, o));
  };
function fp(e, t, n, r) {
  return r
    ? !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && qi.test(t) && te(n))
      )
    : t === "spellcheck" ||
      t === "draggable" ||
      t === "translate" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA") ||
      (qi.test(t) && $e(n))
    ? !1
    : t in e;
}
const Ft = "transition",
  Gn = "animation",
  pt = (e, { slots: t }) => br(nd, xc(e), t);
pt.displayName = "Transition";
const Ic = {
    name: String,
    type: String,
    css: { type: Boolean, default: !0 },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String,
  },
  dp = (pt.props = ke({}, cc, Ic)),
  nn = (e, t = []) => {
    G(e) ? e.forEach((n) => n(...t)) : e && e(...t);
  },
  zi = (e) => (e ? (G(e) ? e.some((t) => t.length > 1) : e.length > 1) : !1);
function xc(e) {
  const t = {};
  for (const U in e) U in Ic || (t[U] = e[U]);
  if (e.css === !1) return t;
  const {
      name: n = "v",
      type: r,
      duration: o,
      enterFromClass: s = `${n}-enter-from`,
      enterActiveClass: i = `${n}-enter-active`,
      enterToClass: a = `${n}-enter-to`,
      appearFromClass: c = s,
      appearActiveClass: u = i,
      appearToClass: l = a,
      leaveFromClass: f = `${n}-leave-from`,
      leaveActiveClass: p = `${n}-leave-active`,
      leaveToClass: y = `${n}-leave-to`,
    } = e,
    g = pp(o),
    C = g && g[0],
    N = g && g[1],
    {
      onBeforeEnter: I,
      onEnter: $,
      onEnterCancelled: J,
      onLeave: L,
      onLeaveCancelled: Y,
      onBeforeAppear: Z = I,
      onAppear: ee = $,
      onAppearCancelled: z = J,
    } = t,
    se = (U, de, Re) => {
      jt(U, de ? l : a), jt(U, de ? u : i), Re && Re();
    },
    re = (U, de) => {
      (U._isLeaving = !1), jt(U, f), jt(U, y), jt(U, p), de && de();
    },
    _e = (U) => (de, Re) => {
      const et = U ? ee : $,
        Te = () => se(de, U, Re);
      nn(et, [de, Te]),
        Wi(() => {
          jt(de, U ? c : s), St(de, U ? l : a), zi(et) || Gi(de, r, C, Te);
        });
    };
  return ke(t, {
    onBeforeEnter(U) {
      nn(I, [U]), St(U, s), St(U, i);
    },
    onBeforeAppear(U) {
      nn(Z, [U]), St(U, c), St(U, u);
    },
    onEnter: _e(!1),
    onAppear: _e(!0),
    onLeave(U, de) {
      U._isLeaving = !0;
      const Re = () => re(U, de);
      St(U, f),
        Nc(),
        St(U, p),
        Wi(() => {
          U._isLeaving && (jt(U, f), St(U, y), zi(L) || Gi(U, r, N, Re));
        }),
        nn(L, [U, Re]);
    },
    onEnterCancelled(U) {
      se(U, !1), nn(J, [U]);
    },
    onAppearCancelled(U) {
      se(U, !0), nn(z, [U]);
    },
    onLeaveCancelled(U) {
      re(U), nn(Y, [U]);
    },
  });
}
function pp(e) {
  if (e == null) return null;
  if (Ce(e)) return [jo(e.enter), jo(e.leave)];
  {
    const t = jo(e);
    return [t, t];
  }
}
function jo(e) {
  return Gu(e);
}
function St(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)),
    (e._vtc || (e._vtc = new Set())).add(t);
}
function jt(e, t) {
  t.split(/\s+/).forEach((r) => r && e.classList.remove(r));
  const { _vtc: n } = e;
  n && (n.delete(t), n.size || (e._vtc = void 0));
}
function Wi(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let hp = 0;
function Gi(e, t, n, r) {
  const o = (e._endId = ++hp),
    s = () => {
      o === e._endId && r();
    };
  if (n) return setTimeout(s, n);
  const { type: i, timeout: a, propCount: c } = Rc(e, t);
  if (!i) return r();
  const u = i + "end";
  let l = 0;
  const f = () => {
      e.removeEventListener(u, p), s();
    },
    p = (y) => {
      y.target === e && ++l >= c && f();
    };
  setTimeout(() => {
    l < c && f();
  }, a + 1),
    e.addEventListener(u, p);
}
function Rc(e, t) {
  const n = window.getComputedStyle(e),
    r = (g) => (n[g] || "").split(", "),
    o = r(`${Ft}Delay`),
    s = r(`${Ft}Duration`),
    i = Qi(o, s),
    a = r(`${Gn}Delay`),
    c = r(`${Gn}Duration`),
    u = Qi(a, c);
  let l = null,
    f = 0,
    p = 0;
  t === Ft
    ? i > 0 && ((l = Ft), (f = i), (p = s.length))
    : t === Gn
    ? u > 0 && ((l = Gn), (f = u), (p = c.length))
    : ((f = Math.max(i, u)),
      (l = f > 0 ? (i > u ? Ft : Gn) : null),
      (p = l ? (l === Ft ? s.length : c.length) : 0));
  const y =
    l === Ft && /\b(transform|all)(,|$)/.test(r(`${Ft}Property`).toString());
  return { type: l, timeout: f, propCount: p, hasTransform: y };
}
function Qi(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((n, r) => Ji(n) + Ji(e[r])));
}
function Ji(e) {
  return Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function Nc() {
  return document.body.offsetHeight;
}
const Lc = new WeakMap(),
  Fc = new WeakMap(),
  Dc = {
    name: "TransitionGroup",
    props: ke({}, dp, { tag: String, moveClass: String }),
    setup(e, { slots: t }) {
      const n = Fs(),
        r = ac();
      let o, s;
      return (
        fc(() => {
          if (!o.length) return;
          const i = e.moveClass || `${e.name || "v"}-move`;
          if (!vp(o[0].el, n.vnode.el, i)) return;
          o.forEach(gp), o.forEach(yp);
          const a = o.filter(bp);
          Nc(),
            a.forEach((c) => {
              const u = c.el,
                l = u.style;
              St(u, i),
                (l.transform = l.webkitTransform = l.transitionDuration = "");
              const f = (u._moveCb = (p) => {
                (p && p.target !== u) ||
                  ((!p || /transform$/.test(p.propertyName)) &&
                    (u.removeEventListener("transitionend", f),
                    (u._moveCb = null),
                    jt(u, i)));
              });
              u.addEventListener("transitionend", f);
            });
        }),
        () => {
          const i = le(e),
            a = xc(i);
          let c = i.tag || me;
          (o = s), (s = t.default ? Is(t.default()) : []);
          for (let u = 0; u < s.length; u++) {
            const l = s[u];
            l.key != null && fr(l, ur(l, a, r, n));
          }
          if (o)
            for (let u = 0; u < o.length; u++) {
              const l = o[u];
              fr(l, ur(l, a, r, n)), Lc.set(l, l.el.getBoundingClientRect());
            }
          return j(c, null, s);
        }
      );
    },
  },
  mp = (e) => delete e.mode;
Dc.props;
const _p = Dc;
function gp(e) {
  const t = e.el;
  t._moveCb && t._moveCb(), t._enterCb && t._enterCb();
}
function yp(e) {
  Fc.set(e, e.el.getBoundingClientRect());
}
function bp(e) {
  const t = Lc.get(e),
    n = Fc.get(e),
    r = t.left - n.left,
    o = t.top - n.top;
  if (r || o) {
    const s = e.el.style;
    return (
      (s.transform = s.webkitTransform = `translate(${r}px,${o}px)`),
      (s.transitionDuration = "0s"),
      e
    );
  }
}
function vp(e, t, n) {
  const r = e.cloneNode();
  e._vtc &&
    e._vtc.forEach((i) => {
      i.split(/\s+/).forEach((a) => a && r.classList.remove(a));
    }),
    n.split(/\s+/).forEach((i) => i && r.classList.add(i)),
    (r.style.display = "none");
  const o = t.nodeType === 1 ? t : t.parentNode;
  o.appendChild(r);
  const { hasTransform: s } = Rc(r);
  return o.removeChild(r), s;
}
const Wt = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return G(t) ? (n) => Dr(t, n) : t;
};
function Cp(e) {
  e.target.composing = !0;
}
function Xi(e) {
  const t = e.target;
  t.composing && ((t.composing = !1), t.dispatchEvent(new Event("input")));
}
const Nn = {
    created(e, { modifiers: { lazy: t, trim: n, number: r } }, o) {
      e._assign = Wt(o);
      const s = r || (o.props && o.props.type === "number");
      kt(e, t ? "change" : "input", (i) => {
        if (i.target.composing) return;
        let a = e.value;
        n && (a = a.trim()), s && (a = qr(a)), e._assign(a);
      }),
        n &&
          kt(e, "change", () => {
            e.value = e.value.trim();
          }),
        t ||
          (kt(e, "compositionstart", Cp),
          kt(e, "compositionend", Xi),
          kt(e, "change", Xi));
    },
    mounted(e, { value: t }) {
      e.value = t ?? "";
    },
    beforeUpdate(
      e,
      { value: t, modifiers: { lazy: n, trim: r, number: o } },
      s
    ) {
      if (
        ((e._assign = Wt(s)),
        e.composing ||
          (document.activeElement === e &&
            e.type !== "range" &&
            (n ||
              (r && e.value.trim() === t) ||
              ((o || e.type === "number") && qr(e.value) === t))))
      )
        return;
      const i = t ?? "";
      e.value !== i && (e.value = i);
    },
  },
  wp = {
    deep: !0,
    created(e, t, n) {
      (e._assign = Wt(n)),
        kt(e, "change", () => {
          const r = e._modelValue,
            o = Ln(e),
            s = e.checked,
            i = e._assign;
          if (G(r)) {
            const a = Cs(r, o),
              c = a !== -1;
            if (s && !c) i(r.concat(o));
            else if (!s && c) {
              const u = [...r];
              u.splice(a, 1), i(u);
            }
          } else if (jn(r)) {
            const a = new Set(r);
            s ? a.add(o) : a.delete(o), i(a);
          } else i(jc(e, s));
        });
    },
    mounted: Yi,
    beforeUpdate(e, t, n) {
      (e._assign = Wt(n)), Yi(e, t, n);
    },
  };
function Yi(e, { value: t, oldValue: n }, r) {
  (e._modelValue = t),
    G(t)
      ? (e.checked = Cs(t, r.props.value) > -1)
      : jn(t)
      ? (e.checked = t.has(r.props.value))
      : t !== n && (e.checked = un(t, jc(e, !0)));
}
const Ms = {
    created(e, { value: t }, n) {
      (e.checked = un(t, n.props.value)),
        (e._assign = Wt(n)),
        kt(e, "change", () => {
          e._assign(Ln(e));
        });
    },
    beforeUpdate(e, { value: t, oldValue: n }, r) {
      (e._assign = Wt(r)), t !== n && (e.checked = un(t, r.props.value));
    },
  },
  Mc = {
    deep: !0,
    created(e, { value: t, modifiers: { number: n } }, r) {
      const o = jn(t);
      kt(e, "change", () => {
        const s = Array.prototype.filter
          .call(e.options, (i) => i.selected)
          .map((i) => (n ? qr(Ln(i)) : Ln(i)));
        e._assign(e.multiple ? (o ? new Set(s) : s) : s[0]);
      }),
        (e._assign = Wt(r));
    },
    mounted(e, { value: t }) {
      Zi(e, t);
    },
    beforeUpdate(e, t, n) {
      e._assign = Wt(n);
    },
    updated(e, { value: t }) {
      Zi(e, t);
    },
  };
function Zi(e, t) {
  const n = e.multiple;
  if (!(n && !G(t) && !jn(t))) {
    for (let r = 0, o = e.options.length; r < o; r++) {
      const s = e.options[r],
        i = Ln(s);
      if (n) G(t) ? (s.selected = Cs(t, i) > -1) : (s.selected = t.has(i));
      else if (un(Ln(s), t)) {
        e.selectedIndex !== r && (e.selectedIndex = r);
        return;
      }
    }
    !n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function Ln(e) {
  return "_value" in e ? e._value : e.value;
}
function jc(e, t) {
  const n = t ? "_trueValue" : "_falseValue";
  return n in e ? e[n] : t;
}
const Ep = {
  created(e, t, n) {
    Nr(e, t, n, null, "created");
  },
  mounted(e, t, n) {
    Nr(e, t, n, null, "mounted");
  },
  beforeUpdate(e, t, n, r) {
    Nr(e, t, n, r, "beforeUpdate");
  },
  updated(e, t, n, r) {
    Nr(e, t, n, r, "updated");
  },
};
function Pp(e, t) {
  switch (e) {
    case "SELECT":
      return Mc;
    case "TEXTAREA":
      return Nn;
    default:
      switch (t) {
        case "checkbox":
          return wp;
        case "radio":
          return Ms;
        default:
          return Nn;
      }
  }
}
function Nr(e, t, n, r, o) {
  const i = Pp(e.tagName, n.props && n.props.type)[o];
  i && i(e, t, n, r);
}
const Tp = ["ctrl", "shift", "alt", "meta"],
  Op = {
    stop: (e) => e.stopPropagation(),
    prevent: (e) => e.preventDefault(),
    self: (e) => e.target !== e.currentTarget,
    ctrl: (e) => !e.ctrlKey,
    shift: (e) => !e.shiftKey,
    alt: (e) => !e.altKey,
    meta: (e) => !e.metaKey,
    left: (e) => "button" in e && e.button !== 0,
    middle: (e) => "button" in e && e.button !== 1,
    right: (e) => "button" in e && e.button !== 2,
    exact: (e, t) => Tp.some((n) => e[`${n}Key`] && !t.includes(n)),
  },
  Ge =
    (e, t) =>
    (n, ...r) => {
      for (let o = 0; o < t.length; o++) {
        const s = Op[t[o]];
        if (s && s(n, t)) return;
      }
      return e(n, ...r);
    },
  Sp = ke({ patchProp: up }, Xd);
let ea;
function Ap() {
  return ea || (ea = Ad(Sp));
}
const kp = (...e) => {
  const t = Ap().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (r) => {
      const o = $p(r);
      if (!o) return;
      const s = t._component;
      !te(s) && !s.render && !s.template && (s.template = o.innerHTML),
        (o.innerHTML = "");
      const i = n(o, !1, o instanceof SVGElement);
      return (
        o instanceof Element &&
          (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")),
        i
      );
    }),
    t
  );
};
function $p(e) {
  return $e(e) ? document.querySelector(e) : e;
}
function Ip() {
  return Bc().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function Bc() {
  return typeof navigator < "u" && typeof window < "u"
    ? window
    : typeof global < "u"
    ? global
    : {};
}
const xp = typeof Proxy == "function",
  Rp = "devtools-plugin:setup",
  Np = "plugin:settings:set";
let En, as;
function Lp() {
  var e;
  return (
    En !== void 0 ||
      (typeof window < "u" && window.performance
        ? ((En = !0), (as = window.performance))
        : typeof global < "u" &&
          !((e = global.perf_hooks) === null || e === void 0) &&
          e.performance
        ? ((En = !0), (as = global.perf_hooks.performance))
        : (En = !1)),
    En
  );
}
function Fp() {
  return Lp() ? as.now() : Date.now();
}
class Dp {
  constructor(t, n) {
    (this.target = null),
      (this.targetQueue = []),
      (this.onQueue = []),
      (this.plugin = t),
      (this.hook = n);
    const r = {};
    if (t.settings)
      for (const i in t.settings) {
        const a = t.settings[i];
        r[i] = a.defaultValue;
      }
    const o = `__vue-devtools-plugin-settings__${t.id}`;
    let s = Object.assign({}, r);
    try {
      const i = localStorage.getItem(o),
        a = JSON.parse(i);
      Object.assign(s, a);
    } catch {}
    (this.fallbacks = {
      getSettings() {
        return s;
      },
      setSettings(i) {
        try {
          localStorage.setItem(o, JSON.stringify(i));
        } catch {}
        s = i;
      },
      now() {
        return Fp();
      },
    }),
      n &&
        n.on(Np, (i, a) => {
          i === this.plugin.id && this.fallbacks.setSettings(a);
        }),
      (this.proxiedOn = new Proxy(
        {},
        {
          get: (i, a) =>
            this.target
              ? this.target.on[a]
              : (...c) => {
                  this.onQueue.push({ method: a, args: c });
                },
        }
      )),
      (this.proxiedTarget = new Proxy(
        {},
        {
          get: (i, a) =>
            this.target
              ? this.target[a]
              : a === "on"
              ? this.proxiedOn
              : Object.keys(this.fallbacks).includes(a)
              ? (...c) => (
                  this.targetQueue.push({
                    method: a,
                    args: c,
                    resolve: () => {},
                  }),
                  this.fallbacks[a](...c)
                )
              : (...c) =>
                  new Promise((u) => {
                    this.targetQueue.push({ method: a, args: c, resolve: u });
                  }),
        }
      ));
  }
  async setRealTarget(t) {
    this.target = t;
    for (const n of this.onQueue) this.target.on[n.method](...n.args);
    for (const n of this.targetQueue)
      n.resolve(await this.target[n.method](...n.args));
  }
}
function Mp(e, t) {
  const n = e,
    r = Bc(),
    o = Ip(),
    s = xp && n.enableEarlyProxy;
  if (o && (r.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !s)) o.emit(Rp, e, t);
  else {
    const i = s ? new Dp(n, o) : null;
    (r.__VUE_DEVTOOLS_PLUGINS__ = r.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: n,
      setupFn: t,
      proxy: i,
    }),
      i && t(i.proxiedTarget);
  }
}
/*!
 * vuex v4.1.0
 * (c) 2022 Evan You
 * @license MIT
 */ var Uc = "store";
function ho(e) {
  return e === void 0 && (e = null), mt(e !== null ? e : Uc);
}
function Vn(e, t) {
  Object.keys(e).forEach(function (n) {
    return t(e[n], n);
  });
}
function Hc(e) {
  return e !== null && typeof e == "object";
}
function jp(e) {
  return e && typeof e.then == "function";
}
function Bp(e, t) {
  return function () {
    return e(t);
  };
}
function Vc(e, t, n) {
  return (
    t.indexOf(e) < 0 && (n && n.prepend ? t.unshift(e) : t.push(e)),
    function () {
      var r = t.indexOf(e);
      r > -1 && t.splice(r, 1);
    }
  );
}
function Kc(e, t) {
  (e._actions = Object.create(null)),
    (e._mutations = Object.create(null)),
    (e._wrappedGetters = Object.create(null)),
    (e._modulesNamespaceMap = Object.create(null));
  var n = e.state;
  mo(e, n, [], e._modules.root, !0), js(e, n, t);
}
function js(e, t, n) {
  var r = e._state,
    o = e._scope;
  (e.getters = {}), (e._makeLocalGettersCache = Object.create(null));
  var s = e._wrappedGetters,
    i = {},
    a = {},
    c = nf(!0);
  c.run(function () {
    Vn(s, function (u, l) {
      (i[l] = Bp(u, e)),
        (a[l] = Se(function () {
          return i[l]();
        })),
        Object.defineProperty(e.getters, l, {
          get: function () {
            return a[l].value;
          },
          enumerable: !0,
        });
    });
  }),
    (e._state = dn({ data: t })),
    (e._scope = c),
    e.strict && qp(e),
    r &&
      n &&
      e._withCommit(function () {
        r.data = null;
      }),
    o && o.stop();
}
function mo(e, t, n, r, o) {
  var s = !n.length,
    i = e._modules.getNamespace(n);
  if (
    (r.namespaced &&
      (e._modulesNamespaceMap[i], (e._modulesNamespaceMap[i] = r)),
    !s && !o)
  ) {
    var a = Bs(t, n.slice(0, -1)),
      c = n[n.length - 1];
    e._withCommit(function () {
      a[c] = r.state;
    });
  }
  var u = (r.context = Up(e, i, n));
  r.forEachMutation(function (l, f) {
    var p = i + f;
    Hp(e, p, l, u);
  }),
    r.forEachAction(function (l, f) {
      var p = l.root ? f : i + f,
        y = l.handler || l;
      Vp(e, p, y, u);
    }),
    r.forEachGetter(function (l, f) {
      var p = i + f;
      Kp(e, p, l, u);
    }),
    r.forEachChild(function (l, f) {
      mo(e, t, n.concat(f), l, o);
    });
}
function Up(e, t, n) {
  var r = t === "",
    o = {
      dispatch: r
        ? e.dispatch
        : function (s, i, a) {
            var c = Yr(s, i, a),
              u = c.payload,
              l = c.options,
              f = c.type;
            return (!l || !l.root) && (f = t + f), e.dispatch(f, u);
          },
      commit: r
        ? e.commit
        : function (s, i, a) {
            var c = Yr(s, i, a),
              u = c.payload,
              l = c.options,
              f = c.type;
            (!l || !l.root) && (f = t + f), e.commit(f, u, l);
          },
    };
  return (
    Object.defineProperties(o, {
      getters: {
        get: r
          ? function () {
              return e.getters;
            }
          : function () {
              return qc(e, t);
            },
      },
      state: {
        get: function () {
          return Bs(e.state, n);
        },
      },
    }),
    o
  );
}
function qc(e, t) {
  if (!e._makeLocalGettersCache[t]) {
    var n = {},
      r = t.length;
    Object.keys(e.getters).forEach(function (o) {
      if (o.slice(0, r) === t) {
        var s = o.slice(r);
        Object.defineProperty(n, s, {
          get: function () {
            return e.getters[o];
          },
          enumerable: !0,
        });
      }
    }),
      (e._makeLocalGettersCache[t] = n);
  }
  return e._makeLocalGettersCache[t];
}
function Hp(e, t, n, r) {
  var o = e._mutations[t] || (e._mutations[t] = []);
  o.push(function (i) {
    n.call(e, r.state, i);
  });
}
function Vp(e, t, n, r) {
  var o = e._actions[t] || (e._actions[t] = []);
  o.push(function (i) {
    var a = n.call(
      e,
      {
        dispatch: r.dispatch,
        commit: r.commit,
        getters: r.getters,
        state: r.state,
        rootGetters: e.getters,
        rootState: e.state,
      },
      i
    );
    return (
      jp(a) || (a = Promise.resolve(a)),
      e._devtoolHook
        ? a.catch(function (c) {
            throw (e._devtoolHook.emit("vuex:error", c), c);
          })
        : a
    );
  });
}
function Kp(e, t, n, r) {
  e._wrappedGetters[t] ||
    (e._wrappedGetters[t] = function (s) {
      return n(r.state, r.getters, s.state, s.getters);
    });
}
function qp(e) {
  it(
    function () {
      return e._state.data;
    },
    function () {},
    { deep: !0, flush: "sync" }
  );
}
function Bs(e, t) {
  return t.reduce(function (n, r) {
    return n[r];
  }, e);
}
function Yr(e, t, n) {
  return (
    Hc(e) && e.type && ((n = t), (t = e), (e = e.type)),
    { type: e, payload: t, options: n }
  );
}
var zp = "vuex bindings",
  ta = "vuex:mutations",
  Bo = "vuex:actions",
  Pn = "vuex",
  Wp = 0;
function Gp(e, t) {
  Mp(
    {
      id: "org.vuejs.vuex",
      app: e,
      label: "Vuex",
      homepage: "https://next.vuex.vuejs.org/",
      logo: "https://vuejs.org/images/icons/favicon-96x96.png",
      packageName: "vuex",
      componentStateTypes: [zp],
    },
    function (n) {
      n.addTimelineLayer({ id: ta, label: "Vuex Mutations", color: na }),
        n.addTimelineLayer({ id: Bo, label: "Vuex Actions", color: na }),
        n.addInspector({
          id: Pn,
          label: "Vuex",
          icon: "storage",
          treeFilterPlaceholder: "Filter stores...",
        }),
        n.on.getInspectorTree(function (r) {
          if (r.app === e && r.inspectorId === Pn)
            if (r.filter) {
              var o = [];
              Qc(o, t._modules.root, r.filter, ""), (r.rootNodes = o);
            } else r.rootNodes = [Gc(t._modules.root, "")];
        }),
        n.on.getInspectorState(function (r) {
          if (r.app === e && r.inspectorId === Pn) {
            var o = r.nodeId;
            qc(t, o),
              (r.state = Xp(
                Zp(t._modules, o),
                o === "root" ? t.getters : t._makeLocalGettersCache,
                o
              ));
          }
        }),
        n.on.editInspectorState(function (r) {
          if (r.app === e && r.inspectorId === Pn) {
            var o = r.nodeId,
              s = r.path;
            o !== "root" && (s = o.split("/").filter(Boolean).concat(s)),
              t._withCommit(function () {
                r.set(t._state.data, s, r.state.value);
              });
          }
        }),
        t.subscribe(function (r, o) {
          var s = {};
          r.payload && (s.payload = r.payload),
            (s.state = o),
            n.notifyComponentUpdate(),
            n.sendInspectorTree(Pn),
            n.sendInspectorState(Pn),
            n.addTimelineEvent({
              layerId: ta,
              event: { time: Date.now(), title: r.type, data: s },
            });
        }),
        t.subscribeAction({
          before: function (r, o) {
            var s = {};
            r.payload && (s.payload = r.payload),
              (r._id = Wp++),
              (r._time = Date.now()),
              (s.state = o),
              n.addTimelineEvent({
                layerId: Bo,
                event: {
                  time: r._time,
                  title: r.type,
                  groupId: r._id,
                  subtitle: "start",
                  data: s,
                },
              });
          },
          after: function (r, o) {
            var s = {},
              i = Date.now() - r._time;
            (s.duration = {
              _custom: {
                type: "duration",
                display: i + "ms",
                tooltip: "Action duration",
                value: i,
              },
            }),
              r.payload && (s.payload = r.payload),
              (s.state = o),
              n.addTimelineEvent({
                layerId: Bo,
                event: {
                  time: Date.now(),
                  title: r.type,
                  groupId: r._id,
                  subtitle: "end",
                  data: s,
                },
              });
          },
        });
    }
  );
}
var na = 8702998,
  Qp = 6710886,
  Jp = 16777215,
  zc = { label: "namespaced", textColor: Jp, backgroundColor: Qp };
function Wc(e) {
  return e && e !== "root" ? e.split("/").slice(-2, -1)[0] : "Root";
}
function Gc(e, t) {
  return {
    id: t || "root",
    label: Wc(t),
    tags: e.namespaced ? [zc] : [],
    children: Object.keys(e._children).map(function (n) {
      return Gc(e._children[n], t + n + "/");
    }),
  };
}
function Qc(e, t, n, r) {
  r.includes(n) &&
    e.push({
      id: r || "root",
      label: r.endsWith("/") ? r.slice(0, r.length - 1) : r || "Root",
      tags: t.namespaced ? [zc] : [],
    }),
    Object.keys(t._children).forEach(function (o) {
      Qc(e, t._children[o], n, r + o + "/");
    });
}
function Xp(e, t, n) {
  t = n === "root" ? t : t[n];
  var r = Object.keys(t),
    o = {
      state: Object.keys(e.state).map(function (i) {
        return { key: i, editable: !0, value: e.state[i] };
      }),
    };
  if (r.length) {
    var s = Yp(t);
    o.getters = Object.keys(s).map(function (i) {
      return {
        key: i.endsWith("/") ? Wc(i) : i,
        editable: !1,
        value: cs(function () {
          return s[i];
        }),
      };
    });
  }
  return o;
}
function Yp(e) {
  var t = {};
  return (
    Object.keys(e).forEach(function (n) {
      var r = n.split("/");
      if (r.length > 1) {
        var o = t,
          s = r.pop();
        r.forEach(function (i) {
          o[i] ||
            (o[i] = {
              _custom: {
                value: {},
                display: i,
                tooltip: "Module",
                abstract: !0,
              },
            }),
            (o = o[i]._custom.value);
        }),
          (o[s] = cs(function () {
            return e[n];
          }));
      } else
        t[n] = cs(function () {
          return e[n];
        });
    }),
    t
  );
}
function Zp(e, t) {
  var n = t.split("/").filter(function (r) {
    return r;
  });
  return n.reduce(
    function (r, o, s) {
      var i = r[o];
      if (!i)
        throw new Error('Missing module "' + o + '" for path "' + t + '".');
      return s === n.length - 1 ? i : i._children;
    },
    t === "root" ? e : e.root._children
  );
}
function cs(e) {
  try {
    return e();
  } catch (t) {
    return t;
  }
}
var gt = function (t, n) {
    (this.runtime = n),
      (this._children = Object.create(null)),
      (this._rawModule = t);
    var r = t.state;
    this.state = (typeof r == "function" ? r() : r) || {};
  },
  Jc = { namespaced: { configurable: !0 } };
Jc.namespaced.get = function () {
  return !!this._rawModule.namespaced;
};
gt.prototype.addChild = function (t, n) {
  this._children[t] = n;
};
gt.prototype.removeChild = function (t) {
  delete this._children[t];
};
gt.prototype.getChild = function (t) {
  return this._children[t];
};
gt.prototype.hasChild = function (t) {
  return t in this._children;
};
gt.prototype.update = function (t) {
  (this._rawModule.namespaced = t.namespaced),
    t.actions && (this._rawModule.actions = t.actions),
    t.mutations && (this._rawModule.mutations = t.mutations),
    t.getters && (this._rawModule.getters = t.getters);
};
gt.prototype.forEachChild = function (t) {
  Vn(this._children, t);
};
gt.prototype.forEachGetter = function (t) {
  this._rawModule.getters && Vn(this._rawModule.getters, t);
};
gt.prototype.forEachAction = function (t) {
  this._rawModule.actions && Vn(this._rawModule.actions, t);
};
gt.prototype.forEachMutation = function (t) {
  this._rawModule.mutations && Vn(this._rawModule.mutations, t);
};
Object.defineProperties(gt.prototype, Jc);
var mn = function (t) {
  this.register([], t, !1);
};
mn.prototype.get = function (t) {
  return t.reduce(function (n, r) {
    return n.getChild(r);
  }, this.root);
};
mn.prototype.getNamespace = function (t) {
  var n = this.root;
  return t.reduce(function (r, o) {
    return (n = n.getChild(o)), r + (n.namespaced ? o + "/" : "");
  }, "");
};
mn.prototype.update = function (t) {
  Xc([], this.root, t);
};
mn.prototype.register = function (t, n, r) {
  var o = this;
  r === void 0 && (r = !0);
  var s = new gt(n, r);
  if (t.length === 0) this.root = s;
  else {
    var i = this.get(t.slice(0, -1));
    i.addChild(t[t.length - 1], s);
  }
  n.modules &&
    Vn(n.modules, function (a, c) {
      o.register(t.concat(c), a, r);
    });
};
mn.prototype.unregister = function (t) {
  var n = this.get(t.slice(0, -1)),
    r = t[t.length - 1],
    o = n.getChild(r);
  o && o.runtime && n.removeChild(r);
};
mn.prototype.isRegistered = function (t) {
  var n = this.get(t.slice(0, -1)),
    r = t[t.length - 1];
  return n ? n.hasChild(r) : !1;
};
function Xc(e, t, n) {
  if ((t.update(n), n.modules))
    for (var r in n.modules) {
      if (!t.getChild(r)) return;
      Xc(e.concat(r), t.getChild(r), n.modules[r]);
    }
}
function eh(e) {
  return new Je(e);
}
var Je = function (t) {
    var n = this;
    t === void 0 && (t = {});
    var r = t.plugins;
    r === void 0 && (r = []);
    var o = t.strict;
    o === void 0 && (o = !1);
    var s = t.devtools;
    (this._committing = !1),
      (this._actions = Object.create(null)),
      (this._actionSubscribers = []),
      (this._mutations = Object.create(null)),
      (this._wrappedGetters = Object.create(null)),
      (this._modules = new mn(t)),
      (this._modulesNamespaceMap = Object.create(null)),
      (this._subscribers = []),
      (this._makeLocalGettersCache = Object.create(null)),
      (this._scope = null),
      (this._devtools = s);
    var i = this,
      a = this,
      c = a.dispatch,
      u = a.commit;
    (this.dispatch = function (p, y) {
      return c.call(i, p, y);
    }),
      (this.commit = function (p, y, g) {
        return u.call(i, p, y, g);
      }),
      (this.strict = o);
    var l = this._modules.root.state;
    mo(this, l, [], this._modules.root),
      js(this, l),
      r.forEach(function (f) {
        return f(n);
      });
  },
  Us = { state: { configurable: !0 } };
Je.prototype.install = function (t, n) {
  t.provide(n || Uc, this), (t.config.globalProperties.$store = this);
  var r = this._devtools !== void 0 ? this._devtools : !1;
  r && Gp(t, this);
};
Us.state.get = function () {
  return this._state.data;
};
Us.state.set = function (e) {};
Je.prototype.commit = function (t, n, r) {
  var o = this,
    s = Yr(t, n, r),
    i = s.type,
    a = s.payload,
    c = { type: i, payload: a },
    u = this._mutations[i];
  u &&
    (this._withCommit(function () {
      u.forEach(function (f) {
        f(a);
      });
    }),
    this._subscribers.slice().forEach(function (l) {
      return l(c, o.state);
    }));
};
Je.prototype.dispatch = function (t, n) {
  var r = this,
    o = Yr(t, n),
    s = o.type,
    i = o.payload,
    a = { type: s, payload: i },
    c = this._actions[s];
  if (c) {
    try {
      this._actionSubscribers
        .slice()
        .filter(function (l) {
          return l.before;
        })
        .forEach(function (l) {
          return l.before(a, r.state);
        });
    } catch {}
    var u =
      c.length > 1
        ? Promise.all(
            c.map(function (l) {
              return l(i);
            })
          )
        : c[0](i);
    return new Promise(function (l, f) {
      u.then(
        function (p) {
          try {
            r._actionSubscribers
              .filter(function (y) {
                return y.after;
              })
              .forEach(function (y) {
                return y.after(a, r.state);
              });
          } catch {}
          l(p);
        },
        function (p) {
          try {
            r._actionSubscribers
              .filter(function (y) {
                return y.error;
              })
              .forEach(function (y) {
                return y.error(a, r.state, p);
              });
          } catch {}
          f(p);
        }
      );
    });
  }
};
Je.prototype.subscribe = function (t, n) {
  return Vc(t, this._subscribers, n);
};
Je.prototype.subscribeAction = function (t, n) {
  var r = typeof t == "function" ? { before: t } : t;
  return Vc(r, this._actionSubscribers, n);
};
Je.prototype.watch = function (t, n, r) {
  var o = this;
  return it(
    function () {
      return t(o.state, o.getters);
    },
    n,
    Object.assign({}, r)
  );
};
Je.prototype.replaceState = function (t) {
  var n = this;
  this._withCommit(function () {
    n._state.data = t;
  });
};
Je.prototype.registerModule = function (t, n, r) {
  r === void 0 && (r = {}),
    typeof t == "string" && (t = [t]),
    this._modules.register(t, n),
    mo(this, this.state, t, this._modules.get(t), r.preserveState),
    js(this, this.state);
};
Je.prototype.unregisterModule = function (t) {
  var n = this;
  typeof t == "string" && (t = [t]),
    this._modules.unregister(t),
    this._withCommit(function () {
      var r = Bs(n.state, t.slice(0, -1));
      delete r[t[t.length - 1]];
    }),
    Kc(this);
};
Je.prototype.hasModule = function (t) {
  return typeof t == "string" && (t = [t]), this._modules.isRegistered(t);
};
Je.prototype.hotUpdate = function (t) {
  this._modules.update(t), Kc(this, !0);
};
Je.prototype._withCommit = function (t) {
  var n = this._committing;
  (this._committing = !0), t(), (this._committing = n);
};
Object.defineProperties(Je.prototype, Us);
var Hs = Zc(function (e, t) {
    var n = {};
    return (
      Yc(t).forEach(function (r) {
        var o = r.key,
          s = r.val;
        (s = e + s),
          (n[o] = function () {
            if (!(e && !el(this.$store, "mapGetters", e)))
              return this.$store.getters[s];
          }),
          (n[o].vuex = !0);
      }),
      n
    );
  }),
  th = Zc(function (e, t) {
    var n = {};
    return (
      Yc(t).forEach(function (r) {
        var o = r.key,
          s = r.val;
        n[o] = function () {
          for (var a = [], c = arguments.length; c--; ) a[c] = arguments[c];
          var u = this.$store.dispatch;
          if (e) {
            var l = el(this.$store, "mapActions", e);
            if (!l) return;
            u = l.context.dispatch;
          }
          return typeof s == "function"
            ? s.apply(this, [u].concat(a))
            : u.apply(this.$store, [s].concat(a));
        };
      }),
      n
    );
  });
function Yc(e) {
  return nh(e)
    ? Array.isArray(e)
      ? e.map(function (t) {
          return { key: t, val: t };
        })
      : Object.keys(e).map(function (t) {
          return { key: t, val: e[t] };
        })
    : [];
}
function nh(e) {
  return Array.isArray(e) || Hc(e);
}
function Zc(e) {
  return function (t, n) {
    return (
      typeof t != "string"
        ? ((n = t), (t = ""))
        : t.charAt(t.length - 1) !== "/" && (t += "/"),
      e(t, n)
    );
  };
}
function el(e, t, n) {
  var r = e._modulesNamespaceMap[n];
  return r;
}
const Pe = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [r, o] of t) n[r] = o;
    return n;
  },
  rh = {
    name: "CartIndicator",
    data() {
      return { firstLoading: !0, cartVisible: !0, timer: null };
    },
    computed: { ...Hs(["cartDetailsProducts"]) },
    watch: {
      cartDetailsProducts(e, t) {
        (t == null ? void 0 : t.length) !== (e == null ? void 0 : e.length) &&
          ((this.firstLoading = !1),
          (this.cartVisible = !1),
          (this.timer = setTimeout(() => {
            this.cartVisible = !0;
          })));
      },
    },
  },
  oh = (e) => (pn("data-v-be7e043f"), (e = e()), hn(), e),
  sh = oh(() =>
    _(
      "svg",
      { width: "30", height: "21", fill: "currentColor" },
      [_("use", { "xlink:href": "#icon-cart" })],
      -1
    )
  ),
  ih = { class: "header__count", "aria-label": "Количество товаров" };
function ah(e, t, n, r, o, s) {
  const i = ne("router-link");
  return o.cartVisible
    ? (S(),
      Fe(
        i,
        {
          key: 0,
          class: $t(["header__cart", { "cart-animation": !o.firstLoading }]),
          "aria-label": "Корзина с товарами",
          to: { name: "cart" },
        },
        {
          default: ve(() => {
            var a;
            return [
              sh,
              _(
                "span",
                ih,
                Q(
                  ((a = e.cartDetailsProducts) == null ? void 0 : a.length) || 0
                ),
                1
              ),
            ];
          }),
          _: 1,
        },
        8,
        ["class"]
      ))
    : Ae("", !0);
}
const ch = Pe(rh, [
    ["render", ah],
    ["__scopeId", "data-v-be7e043f"],
  ]),
  Uo = ae(new Set());
function tl() {
  const e = Fs().uid,
    t = ae(!1),
    n = () => {
      (t.value = !0), Uo.value.add(e);
    },
    r = () => {
      (t.value = !0), Uo.value.delete(e);
    },
    o = Se(() => !!Uo.value.size),
    s = () => {
      o.value
        ? ((document.body.style.paddingRight = `${
            window.innerWidth - document.documentElement.clientWidth
          }px`),
          (document.body.style.overflow = "hidden"))
        : ((document.body.style.overflow = null),
          (document.body.style.paddingRight = null));
    };
  return (
    it(o, () => {
      s();
    }),
    { doOpen: n, doClose: r, isOpen: t, isSomeOpen: o }
  );
}
const lh = "/skillbox-vue-lesson/img/svg/logo-tech.svg",
  uh = {
    components: { CartIndicator: ch },
    setup() {
      const e = ho(),
        t = tl().isSomeOpen,
        n = localStorage.getItem("userAccessKey"),
        r = () => {
          e.dispatch("loadCart");
        },
        o = (s) => {
          e.commit("updateUserAccessKey", s);
        };
      return (
        yr(() => {
          n && o(n), r();
        }),
        { isSomeOpen: t, loadCart: r, updateUserAccessKey: o }
      );
    },
  },
  fh = { key: 0, class: "header" },
  dh = { class: "header__wrapper container" },
  ph = _("span", { class: "header__info" }, "Каталог", -1),
  hh = _(
    "img",
    {
      src: lh,
      alt: "Логотип интернет магазина Технозавррр",
      width: "190",
      height: "33",
    },
    null,
    -1
  ),
  mh = _(
    "a",
    { class: "header__tel", href: "tel:8 800 600 90 09" },
    " 8 800 600 90 09 ",
    -1
  ),
  _h = Sc(
    '<footer class="footer"><div class="footer__wrapper container"><ul class="footer__links"><li><a class="footer__link" href="#"> Каталог </a></li><li><a class="footer__link" href="tel:88006009009"> 8 800 600 90 09 </a></li><li><a class="footer__link" href="mailto:hi@technozavrrr.com"> hi@technozavrrr.com </a></li><li><a class="footer__link" href="#"> Распродажа </a></li><li><a class="footer__link footer__link--medium" href="#"> Заказать звонок </a></li></ul><ul class="footer__social social"><li class="social__item"><a class="social__link" href="#" aria-label="Вконтакте"><svg width="20" height="11" fill="currentColor"><use xlink:href="#icon-vk"></use></svg></a></li><li class="social__item"><a class="social__link" href="#" aria-label="Инстаграм"><svg width="17" height="17" fill="currentColor"><use xlink:href="#icon-insta"></use></svg></a></li><li class="social__item"><a class="social__link" href="#" aria-label="Facebook"><svg width="17" height="17" fill="currentColor"><use xlink:href="#icon-facebook"></use></svg></a></li><li class="social__item"><a class="social__link" href="#" aria-label="Twitter"><svg width="17" height="14" fill="currentColor"><use xlink:href="#icon-twitter"></use></svg></a></li><li class="social__item"><a class="social__link" href="#" aria-label="Telegram"><svg width="19" height="17" fill="currentColor"><use xlink:href="#icon-telegram"></use></svg></a></li></ul><p class="footer__desc"> Все права на материалы, находящиеся на сайте, охраняются в соответствии с законодательством РФ, в том числе об авторском праве и смежных правах. </p><ul class="footer__data"><li><a class="footer__link" href="#" target="_blank" rel="noopener" type="application/pdf"> Политика конфиденциальности </a></li><li><a class="footer__link" href="#" target="_blank" rel="noopener" type="application/pdf"> Публичная оферта </a></li></ul><span class="footer__copyright"> © 2020 Технозавррр </span></div></footer><div id="teleport-target"></div>',
    2
  );
function gh(e, t, n, r, o, s) {
  const i = ne("router-link"),
    a = ne("CartIndicator"),
    c = ne("router-view");
  return (
    S(),
    x(
      me,
      null,
      [
        r.isSomeOpen
          ? Ae("", !0)
          : (S(),
            x("header", fh, [
              _("div", dh, [
                ph,
                j(
                  i,
                  { class: "header__logo", href: "#", to: { name: "main" } },
                  { default: ve(() => [hh]), _: 1 }
                ),
                mh,
                j(a),
              ]),
            ])),
        (S(), Fe(c, { key: e.$route.fullPath })),
        _h,
      ],
      64
    )
  );
}
const yh = Pe(uh, [["render", gh]]);
/*!
 * vue-router v4.2.5
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */ const Tn = typeof window < "u";
function bh(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const be = Object.assign;
function Ho(e, t) {
  const n = {};
  for (const r in t) {
    const o = t[r];
    n[r] = _t(o) ? o.map(e) : e(o);
  }
  return n;
}
const rr = () => {},
  _t = Array.isArray,
  vh = /\/$/,
  Ch = (e) => e.replace(vh, "");
function Vo(e, t, n = "/") {
  let r,
    o = {},
    s = "",
    i = "";
  const a = t.indexOf("#");
  let c = t.indexOf("?");
  return (
    a < c && a >= 0 && (c = -1),
    c > -1 &&
      ((r = t.slice(0, c)),
      (s = t.slice(c + 1, a > -1 ? a : t.length)),
      (o = e(s))),
    a > -1 && ((r = r || t.slice(0, a)), (i = t.slice(a, t.length))),
    (r = Th(r ?? t, n)),
    { fullPath: r + (s && "?") + s + i, path: r, query: o, hash: i }
  );
}
function wh(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function ra(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase())
    ? e
    : e.slice(t.length) || "/";
}
function Eh(e, t, n) {
  const r = t.matched.length - 1,
    o = n.matched.length - 1;
  return (
    r > -1 &&
    r === o &&
    Fn(t.matched[r], n.matched[o]) &&
    nl(t.params, n.params) &&
    e(t.query) === e(n.query) &&
    t.hash === n.hash
  );
}
function Fn(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function nl(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e) if (!Ph(e[n], t[n])) return !1;
  return !0;
}
function Ph(e, t) {
  return _t(e) ? oa(e, t) : _t(t) ? oa(t, e) : e === t;
}
function oa(e, t) {
  return _t(t)
    ? e.length === t.length && e.every((n, r) => n === t[r])
    : e.length === 1 && e[0] === t;
}
function Th(e, t) {
  if (e.startsWith("/")) return e;
  if (!e) return t;
  const n = t.split("/"),
    r = e.split("/"),
    o = r[r.length - 1];
  (o === ".." || o === ".") && r.push("");
  let s = n.length - 1,
    i,
    a;
  for (i = 0; i < r.length; i++)
    if (((a = r[i]), a !== "."))
      if (a === "..") s > 1 && s--;
      else break;
  return (
    n.slice(0, s).join("/") +
    "/" +
    r.slice(i - (i === r.length ? 1 : 0)).join("/")
  );
}
var pr;
(function (e) {
  (e.pop = "pop"), (e.push = "push");
})(pr || (pr = {}));
var or;
(function (e) {
  (e.back = "back"), (e.forward = "forward"), (e.unknown = "");
})(or || (or = {}));
function Oh(e) {
  if (!e)
    if (Tn) {
      const t = document.querySelector("base");
      (e = (t && t.getAttribute("href")) || "/"),
        (e = e.replace(/^\w+:\/\/[^\/]+/, ""));
    } else e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), Ch(e);
}
const Sh = /^[^#]+#/;
function Ah(e, t) {
  return e.replace(Sh, "#") + t;
}
function kh(e, t) {
  const n = document.documentElement.getBoundingClientRect(),
    r = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: r.left - n.left - (t.left || 0),
    top: r.top - n.top - (t.top || 0),
  };
}
const _o = () => ({ left: window.pageXOffset, top: window.pageYOffset });
function $h(e) {
  let t;
  if ("el" in e) {
    const n = e.el,
      r = typeof n == "string" && n.startsWith("#"),
      o =
        typeof n == "string"
          ? r
            ? document.getElementById(n.slice(1))
            : document.querySelector(n)
          : n;
    if (!o) return;
    t = kh(o, e);
  } else t = e;
  "scrollBehavior" in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(
        t.left != null ? t.left : window.pageXOffset,
        t.top != null ? t.top : window.pageYOffset
      );
}
function sa(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const ls = new Map();
function Ih(e, t) {
  ls.set(e, t);
}
function xh(e) {
  const t = ls.get(e);
  return ls.delete(e), t;
}
let Rh = () => location.protocol + "//" + location.host;
function rl(e, t) {
  const { pathname: n, search: r, hash: o } = t,
    s = e.indexOf("#");
  if (s > -1) {
    let a = o.includes(e.slice(s)) ? e.slice(s).length : 1,
      c = o.slice(a);
    return c[0] !== "/" && (c = "/" + c), ra(c, "");
  }
  return ra(n, e) + r + o;
}
function Nh(e, t, n, r) {
  let o = [],
    s = [],
    i = null;
  const a = ({ state: p }) => {
    const y = rl(e, location),
      g = n.value,
      C = t.value;
    let N = 0;
    if (p) {
      if (((n.value = y), (t.value = p), i && i === g)) {
        i = null;
        return;
      }
      N = C ? p.position - C.position : 0;
    } else r(y);
    o.forEach((I) => {
      I(n.value, g, {
        delta: N,
        type: pr.pop,
        direction: N ? (N > 0 ? or.forward : or.back) : or.unknown,
      });
    });
  };
  function c() {
    i = n.value;
  }
  function u(p) {
    o.push(p);
    const y = () => {
      const g = o.indexOf(p);
      g > -1 && o.splice(g, 1);
    };
    return s.push(y), y;
  }
  function l() {
    const { history: p } = window;
    p.state && p.replaceState(be({}, p.state, { scroll: _o() }), "");
  }
  function f() {
    for (const p of s) p();
    (s = []),
      window.removeEventListener("popstate", a),
      window.removeEventListener("beforeunload", l);
  }
  return (
    window.addEventListener("popstate", a),
    window.addEventListener("beforeunload", l, { passive: !0 }),
    { pauseListeners: c, listen: u, destroy: f }
  );
}
function ia(e, t, n, r = !1, o = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: r,
    position: window.history.length,
    scroll: o ? _o() : null,
  };
}
function Lh(e) {
  const { history: t, location: n } = window,
    r = { value: rl(e, n) },
    o = { value: t.state };
  o.value ||
    s(
      r.value,
      {
        back: null,
        current: r.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null,
      },
      !0
    );
  function s(c, u, l) {
    const f = e.indexOf("#"),
      p =
        f > -1
          ? (n.host && document.querySelector("base") ? e : e.slice(f)) + c
          : Rh() + e + c;
    try {
      t[l ? "replaceState" : "pushState"](u, "", p), (o.value = u);
    } catch (y) {
      console.error(y), n[l ? "replace" : "assign"](p);
    }
  }
  function i(c, u) {
    const l = be({}, t.state, ia(o.value.back, c, o.value.forward, !0), u, {
      position: o.value.position,
    });
    s(c, l, !0), (r.value = c);
  }
  function a(c, u) {
    const l = be({}, o.value, t.state, { forward: c, scroll: _o() });
    s(l.current, l, !0);
    const f = be({}, ia(r.value, c, null), { position: l.position + 1 }, u);
    s(c, f, !1), (r.value = c);
  }
  return { location: r, state: o, push: a, replace: i };
}
function Fh(e) {
  e = Oh(e);
  const t = Lh(e),
    n = Nh(e, t.state, t.location, t.replace);
  function r(s, i = !0) {
    i || n.pauseListeners(), history.go(s);
  }
  const o = be(
    { location: "", base: e, go: r, createHref: Ah.bind(null, e) },
    t,
    n
  );
  return (
    Object.defineProperty(o, "location", {
      enumerable: !0,
      get: () => t.location.value,
    }),
    Object.defineProperty(o, "state", {
      enumerable: !0,
      get: () => t.state.value,
    }),
    o
  );
}
function Dh(e) {
  return (
    (e = location.host ? e || location.pathname + location.search : ""),
    e.includes("#") || (e += "#"),
    Fh(e)
  );
}
function Mh(e) {
  return typeof e == "string" || (e && typeof e == "object");
}
function ol(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const Dt = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0,
  },
  sl = Symbol("");
var aa;
(function (e) {
  (e[(e.aborted = 4)] = "aborted"),
    (e[(e.cancelled = 8)] = "cancelled"),
    (e[(e.duplicated = 16)] = "duplicated");
})(aa || (aa = {}));
function Dn(e, t) {
  return be(new Error(), { type: e, [sl]: !0 }, t);
}
function Ot(e, t) {
  return e instanceof Error && sl in e && (t == null || !!(e.type & t));
}
const ca = "[^/]+?",
  jh = { sensitive: !1, strict: !1, start: !0, end: !0 },
  Bh = /[.+*?^${}()[\]/\\]/g;
function Uh(e, t) {
  const n = be({}, jh, t),
    r = [];
  let o = n.start ? "^" : "";
  const s = [];
  for (const u of e) {
    const l = u.length ? [] : [90];
    n.strict && !u.length && (o += "/");
    for (let f = 0; f < u.length; f++) {
      const p = u[f];
      let y = 40 + (n.sensitive ? 0.25 : 0);
      if (p.type === 0)
        f || (o += "/"), (o += p.value.replace(Bh, "\\$&")), (y += 40);
      else if (p.type === 1) {
        const { value: g, repeatable: C, optional: N, regexp: I } = p;
        s.push({ name: g, repeatable: C, optional: N });
        const $ = I || ca;
        if ($ !== ca) {
          y += 10;
          try {
            new RegExp(`(${$})`);
          } catch (L) {
            throw new Error(
              `Invalid custom RegExp for param "${g}" (${$}): ` + L.message
            );
          }
        }
        let J = C ? `((?:${$})(?:/(?:${$}))*)` : `(${$})`;
        f || (J = N && u.length < 2 ? `(?:/${J})` : "/" + J),
          N && (J += "?"),
          (o += J),
          (y += 20),
          N && (y += -8),
          C && (y += -20),
          $ === ".*" && (y += -50);
      }
      l.push(y);
    }
    r.push(l);
  }
  if (n.strict && n.end) {
    const u = r.length - 1;
    r[u][r[u].length - 1] += 0.7000000000000001;
  }
  n.strict || (o += "/?"), n.end ? (o += "$") : n.strict && (o += "(?:/|$)");
  const i = new RegExp(o, n.sensitive ? "" : "i");
  function a(u) {
    const l = u.match(i),
      f = {};
    if (!l) return null;
    for (let p = 1; p < l.length; p++) {
      const y = l[p] || "",
        g = s[p - 1];
      f[g.name] = y && g.repeatable ? y.split("/") : y;
    }
    return f;
  }
  function c(u) {
    let l = "",
      f = !1;
    for (const p of e) {
      (!f || !l.endsWith("/")) && (l += "/"), (f = !1);
      for (const y of p)
        if (y.type === 0) l += y.value;
        else if (y.type === 1) {
          const { value: g, repeatable: C, optional: N } = y,
            I = g in u ? u[g] : "";
          if (_t(I) && !C)
            throw new Error(
              `Provided param "${g}" is an array but it is not repeatable (* or + modifiers)`
            );
          const $ = _t(I) ? I.join("/") : I;
          if (!$)
            if (N)
              p.length < 2 &&
                (l.endsWith("/") ? (l = l.slice(0, -1)) : (f = !0));
            else throw new Error(`Missing required param "${g}"`);
          l += $;
        }
    }
    return l || "/";
  }
  return { re: i, score: r, keys: s, parse: a, stringify: c };
}
function Hh(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const r = t[n] - e[n];
    if (r) return r;
    n++;
  }
  return e.length < t.length
    ? e.length === 1 && e[0] === 40 + 40
      ? -1
      : 1
    : e.length > t.length
    ? t.length === 1 && t[0] === 40 + 40
      ? 1
      : -1
    : 0;
}
function Vh(e, t) {
  let n = 0;
  const r = e.score,
    o = t.score;
  for (; n < r.length && n < o.length; ) {
    const s = Hh(r[n], o[n]);
    if (s) return s;
    n++;
  }
  if (Math.abs(o.length - r.length) === 1) {
    if (la(r)) return 1;
    if (la(o)) return -1;
  }
  return o.length - r.length;
}
function la(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const Kh = { type: 0, value: "" },
  qh = /[a-zA-Z0-9_]/;
function zh(e) {
  if (!e) return [[]];
  if (e === "/") return [[Kh]];
  if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
  function t(y) {
    throw new Error(`ERR (${n})/"${u}": ${y}`);
  }
  let n = 0,
    r = n;
  const o = [];
  let s;
  function i() {
    s && o.push(s), (s = []);
  }
  let a = 0,
    c,
    u = "",
    l = "";
  function f() {
    u &&
      (n === 0
        ? s.push({ type: 0, value: u })
        : n === 1 || n === 2 || n === 3
        ? (s.length > 1 &&
            (c === "*" || c === "+") &&
            t(
              `A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`
            ),
          s.push({
            type: 1,
            value: u,
            regexp: l,
            repeatable: c === "*" || c === "+",
            optional: c === "*" || c === "?",
          }))
        : t("Invalid state to consume buffer"),
      (u = ""));
  }
  function p() {
    u += c;
  }
  for (; a < e.length; ) {
    if (((c = e[a++]), c === "\\" && n !== 2)) {
      (r = n), (n = 4);
      continue;
    }
    switch (n) {
      case 0:
        c === "/" ? (u && f(), i()) : c === ":" ? (f(), (n = 1)) : p();
        break;
      case 4:
        p(), (n = r);
        break;
      case 1:
        c === "("
          ? (n = 2)
          : qh.test(c)
          ? p()
          : (f(), (n = 0), c !== "*" && c !== "?" && c !== "+" && a--);
        break;
      case 2:
        c === ")"
          ? l[l.length - 1] == "\\"
            ? (l = l.slice(0, -1) + c)
            : (n = 3)
          : (l += c);
        break;
      case 3:
        f(), (n = 0), c !== "*" && c !== "?" && c !== "+" && a--, (l = "");
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${u}"`), f(), i(), o;
}
function Wh(e, t, n) {
  const r = Uh(zh(e.path), n),
    o = be(r, { record: e, parent: t, children: [], alias: [] });
  return t && !o.record.aliasOf == !t.record.aliasOf && t.children.push(o), o;
}
function Gh(e, t) {
  const n = [],
    r = new Map();
  t = da({ strict: !1, end: !0, sensitive: !1 }, t);
  function o(l) {
    return r.get(l);
  }
  function s(l, f, p) {
    const y = !p,
      g = Qh(l);
    g.aliasOf = p && p.record;
    const C = da(t, l),
      N = [g];
    if ("alias" in l) {
      const J = typeof l.alias == "string" ? [l.alias] : l.alias;
      for (const L of J)
        N.push(
          be({}, g, {
            components: p ? p.record.components : g.components,
            path: L,
            aliasOf: p ? p.record : g,
          })
        );
    }
    let I, $;
    for (const J of N) {
      const { path: L } = J;
      if (f && L[0] !== "/") {
        const Y = f.record.path,
          Z = Y[Y.length - 1] === "/" ? "" : "/";
        J.path = f.record.path + (L && Z + L);
      }
      if (
        ((I = Wh(J, f, C)),
        p
          ? p.alias.push(I)
          : (($ = $ || I),
            $ !== I && $.alias.push(I),
            y && l.name && !fa(I) && i(l.name)),
        g.children)
      ) {
        const Y = g.children;
        for (let Z = 0; Z < Y.length; Z++) s(Y[Z], I, p && p.children[Z]);
      }
      (p = p || I),
        ((I.record.components && Object.keys(I.record.components).length) ||
          I.record.name ||
          I.record.redirect) &&
          c(I);
    }
    return $
      ? () => {
          i($);
        }
      : rr;
  }
  function i(l) {
    if (ol(l)) {
      const f = r.get(l);
      f &&
        (r.delete(l),
        n.splice(n.indexOf(f), 1),
        f.children.forEach(i),
        f.alias.forEach(i));
    } else {
      const f = n.indexOf(l);
      f > -1 &&
        (n.splice(f, 1),
        l.record.name && r.delete(l.record.name),
        l.children.forEach(i),
        l.alias.forEach(i));
    }
  }
  function a() {
    return n;
  }
  function c(l) {
    let f = 0;
    for (
      ;
      f < n.length &&
      Vh(l, n[f]) >= 0 &&
      (l.record.path !== n[f].record.path || !il(l, n[f]));

    )
      f++;
    n.splice(f, 0, l), l.record.name && !fa(l) && r.set(l.record.name, l);
  }
  function u(l, f) {
    let p,
      y = {},
      g,
      C;
    if ("name" in l && l.name) {
      if (((p = r.get(l.name)), !p)) throw Dn(1, { location: l });
      (C = p.record.name),
        (y = be(
          ua(
            f.params,
            p.keys.filter(($) => !$.optional).map(($) => $.name)
          ),
          l.params &&
            ua(
              l.params,
              p.keys.map(($) => $.name)
            )
        )),
        (g = p.stringify(y));
    } else if ("path" in l)
      (g = l.path),
        (p = n.find(($) => $.re.test(g))),
        p && ((y = p.parse(g)), (C = p.record.name));
    else {
      if (((p = f.name ? r.get(f.name) : n.find(($) => $.re.test(f.path))), !p))
        throw Dn(1, { location: l, currentLocation: f });
      (C = p.record.name),
        (y = be({}, f.params, l.params)),
        (g = p.stringify(y));
    }
    const N = [];
    let I = p;
    for (; I; ) N.unshift(I.record), (I = I.parent);
    return { name: C, path: g, params: y, matched: N, meta: Xh(N) };
  }
  return (
    e.forEach((l) => s(l)),
    {
      addRoute: s,
      resolve: u,
      removeRoute: i,
      getRoutes: a,
      getRecordMatcher: o,
    }
  );
}
function ua(e, t) {
  const n = {};
  for (const r of t) r in e && (n[r] = e[r]);
  return n;
}
function Qh(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: Jh(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components:
      "components" in e
        ? e.components || null
        : e.component && { default: e.component },
  };
}
function Jh(e) {
  const t = {},
    n = e.props || !1;
  if ("component" in e) t.default = n;
  else for (const r in e.components) t[r] = typeof n == "object" ? n[r] : n;
  return t;
}
function fa(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function Xh(e) {
  return e.reduce((t, n) => be(t, n.meta), {});
}
function da(e, t) {
  const n = {};
  for (const r in e) n[r] = r in t ? t[r] : e[r];
  return n;
}
function il(e, t) {
  return t.children.some((n) => n === e || il(e, n));
}
const al = /#/g,
  Yh = /&/g,
  Zh = /\//g,
  em = /=/g,
  tm = /\?/g,
  cl = /\+/g,
  nm = /%5B/g,
  rm = /%5D/g,
  ll = /%5E/g,
  om = /%60/g,
  ul = /%7B/g,
  sm = /%7C/g,
  fl = /%7D/g,
  im = /%20/g;
function Vs(e) {
  return encodeURI("" + e)
    .replace(sm, "|")
    .replace(nm, "[")
    .replace(rm, "]");
}
function am(e) {
  return Vs(e).replace(ul, "{").replace(fl, "}").replace(ll, "^");
}
function us(e) {
  return Vs(e)
    .replace(cl, "%2B")
    .replace(im, "+")
    .replace(al, "%23")
    .replace(Yh, "%26")
    .replace(om, "`")
    .replace(ul, "{")
    .replace(fl, "}")
    .replace(ll, "^");
}
function cm(e) {
  return us(e).replace(em, "%3D");
}
function lm(e) {
  return Vs(e).replace(al, "%23").replace(tm, "%3F");
}
function um(e) {
  return e == null ? "" : lm(e).replace(Zh, "%2F");
}
function Zr(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {}
  return "" + e;
}
function fm(e) {
  const t = {};
  if (e === "" || e === "?") return t;
  const r = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let o = 0; o < r.length; ++o) {
    const s = r[o].replace(cl, " "),
      i = s.indexOf("="),
      a = Zr(i < 0 ? s : s.slice(0, i)),
      c = i < 0 ? null : Zr(s.slice(i + 1));
    if (a in t) {
      let u = t[a];
      _t(u) || (u = t[a] = [u]), u.push(c);
    } else t[a] = c;
  }
  return t;
}
function pa(e) {
  let t = "";
  for (let n in e) {
    const r = e[n];
    if (((n = cm(n)), r == null)) {
      r !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (_t(r) ? r.map((s) => s && us(s)) : [r && us(r)]).forEach((s) => {
      s !== void 0 &&
        ((t += (t.length ? "&" : "") + n), s != null && (t += "=" + s));
    });
  }
  return t;
}
function dm(e) {
  const t = {};
  for (const n in e) {
    const r = e[n];
    r !== void 0 &&
      (t[n] = _t(r)
        ? r.map((o) => (o == null ? null : "" + o))
        : r == null
        ? r
        : "" + r);
  }
  return t;
}
const pm = Symbol(""),
  ha = Symbol(""),
  Ks = Symbol(""),
  qs = Symbol(""),
  fs = Symbol("");
function Qn() {
  let e = [];
  function t(r) {
    return (
      e.push(r),
      () => {
        const o = e.indexOf(r);
        o > -1 && e.splice(o, 1);
      }
    );
  }
  function n() {
    e = [];
  }
  return { add: t, list: () => e.slice(), reset: n };
}
function Ut(e, t, n, r, o) {
  const s = r && (r.enterCallbacks[o] = r.enterCallbacks[o] || []);
  return () =>
    new Promise((i, a) => {
      const c = (f) => {
          f === !1
            ? a(Dn(4, { from: n, to: t }))
            : f instanceof Error
            ? a(f)
            : Mh(f)
            ? a(Dn(2, { from: t, to: f }))
            : (s &&
                r.enterCallbacks[o] === s &&
                typeof f == "function" &&
                s.push(f),
              i());
        },
        u = e.call(r && r.instances[o], t, n, c);
      let l = Promise.resolve(u);
      e.length < 3 && (l = l.then(c)), l.catch((f) => a(f));
    });
}
function Ko(e, t, n, r) {
  const o = [];
  for (const s of e)
    for (const i in s.components) {
      let a = s.components[i];
      if (!(t !== "beforeRouteEnter" && !s.instances[i]))
        if (hm(a)) {
          const u = (a.__vccOpts || a)[t];
          u && o.push(Ut(u, n, r, s, i));
        } else {
          let c = a();
          o.push(() =>
            c.then((u) => {
              if (!u)
                return Promise.reject(
                  new Error(`Couldn't resolve component "${i}" at "${s.path}"`)
                );
              const l = bh(u) ? u.default : u;
              s.components[i] = l;
              const p = (l.__vccOpts || l)[t];
              return p && Ut(p, n, r, s, i)();
            })
          );
        }
    }
  return o;
}
function hm(e) {
  return (
    typeof e == "object" ||
    "displayName" in e ||
    "props" in e ||
    "__vccOpts" in e
  );
}
function ma(e) {
  const t = mt(Ks),
    n = mt(qs),
    r = Se(() => t.resolve(kn(e.to))),
    o = Se(() => {
      const { matched: c } = r.value,
        { length: u } = c,
        l = c[u - 1],
        f = n.matched;
      if (!l || !f.length) return -1;
      const p = f.findIndex(Fn.bind(null, l));
      if (p > -1) return p;
      const y = _a(c[u - 2]);
      return u > 1 && _a(l) === y && f[f.length - 1].path !== y
        ? f.findIndex(Fn.bind(null, c[u - 2]))
        : p;
    }),
    s = Se(() => o.value > -1 && ym(n.params, r.value.params)),
    i = Se(
      () =>
        o.value > -1 &&
        o.value === n.matched.length - 1 &&
        nl(n.params, r.value.params)
    );
  function a(c = {}) {
    return gm(c)
      ? t[kn(e.replace) ? "replace" : "push"](kn(e.to)).catch(rr)
      : Promise.resolve();
  }
  return {
    route: r,
    href: Se(() => r.value.href),
    isActive: s,
    isExactActive: i,
    navigate: a,
  };
}
const mm = Gt({
    name: "RouterLink",
    compatConfig: { MODE: 3 },
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: "page" },
    },
    useLink: ma,
    setup(e, { slots: t }) {
      const n = dn(ma(e)),
        { options: r } = mt(Ks),
        o = Se(() => ({
          [ga(e.activeClass, r.linkActiveClass, "router-link-active")]:
            n.isActive,
          [ga(
            e.exactActiveClass,
            r.linkExactActiveClass,
            "router-link-exact-active"
          )]: n.isExactActive,
        }));
      return () => {
        const s = t.default && t.default(n);
        return e.custom
          ? s
          : br(
              "a",
              {
                "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: o.value,
              },
              s
            );
      };
    },
  }),
  _m = mm;
function gm(e) {
  if (
    !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
    !e.defaultPrevented &&
    !(e.button !== void 0 && e.button !== 0)
  ) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t)) return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function ym(e, t) {
  for (const n in t) {
    const r = t[n],
      o = e[n];
    if (typeof r == "string") {
      if (r !== o) return !1;
    } else if (!_t(o) || o.length !== r.length || r.some((s, i) => s !== o[i]))
      return !1;
  }
  return !0;
}
function _a(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : "";
}
const ga = (e, t, n) => e ?? t ?? n,
  bm = Gt({
    name: "RouterView",
    inheritAttrs: !1,
    props: { name: { type: String, default: "default" }, route: Object },
    compatConfig: { MODE: 3 },
    setup(e, { attrs: t, slots: n }) {
      const r = mt(fs),
        o = Se(() => e.route || r.value),
        s = mt(ha, 0),
        i = Se(() => {
          let u = kn(s);
          const { matched: l } = o.value;
          let f;
          for (; (f = l[u]) && !f.components; ) u++;
          return u;
        }),
        a = Se(() => o.value.matched[i.value]);
      Mr(
        ha,
        Se(() => i.value + 1)
      ),
        Mr(pm, a),
        Mr(fs, o);
      const c = ae();
      return (
        it(
          () => [c.value, a.value, e.name],
          ([u, l, f], [p, y, g]) => {
            l &&
              ((l.instances[f] = u),
              y &&
                y !== l &&
                u &&
                u === p &&
                (l.leaveGuards.size || (l.leaveGuards = y.leaveGuards),
                l.updateGuards.size || (l.updateGuards = y.updateGuards))),
              u &&
                l &&
                (!y || !Fn(l, y) || !p) &&
                (l.enterCallbacks[f] || []).forEach((C) => C(u));
          },
          { flush: "post" }
        ),
        () => {
          const u = o.value,
            l = e.name,
            f = a.value,
            p = f && f.components[l];
          if (!p) return ya(n.default, { Component: p, route: u });
          const y = f.props[l],
            g = y
              ? y === !0
                ? u.params
                : typeof y == "function"
                ? y(u)
                : y
              : null,
            N = br(
              p,
              be({}, g, t, {
                onVnodeUnmounted: (I) => {
                  I.component.isUnmounted && (f.instances[l] = null);
                },
                ref: c,
              })
            );
          return ya(n.default, { Component: N, route: u }) || N;
        }
      );
    },
  });
function ya(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const vm = bm;
function Cm(e) {
  const t = Gh(e.routes, e),
    n = e.parseQuery || fm,
    r = e.stringifyQuery || pa,
    o = e.history,
    s = Qn(),
    i = Qn(),
    a = Qn(),
    c = Rf(Dt);
  let u = Dt;
  Tn &&
    e.scrollBehavior &&
    "scrollRestoration" in history &&
    (history.scrollRestoration = "manual");
  const l = Ho.bind(null, (P) => "" + P),
    f = Ho.bind(null, um),
    p = Ho.bind(null, Zr);
  function y(P, B) {
    let D, q;
    return (
      ol(P) ? ((D = t.getRecordMatcher(P)), (q = B)) : (q = P), t.addRoute(q, D)
    );
  }
  function g(P) {
    const B = t.getRecordMatcher(P);
    B && t.removeRoute(B);
  }
  function C() {
    return t.getRoutes().map((P) => P.record);
  }
  function N(P) {
    return !!t.getRecordMatcher(P);
  }
  function I(P, B) {
    if (((B = be({}, B || c.value)), typeof P == "string")) {
      const b = Vo(n, P, B.path),
        w = t.resolve({ path: b.path }, B),
        O = o.createHref(b.fullPath);
      return be(b, w, {
        params: p(w.params),
        hash: Zr(b.hash),
        redirectedFrom: void 0,
        href: O,
      });
    }
    let D;
    if ("path" in P) D = be({}, P, { path: Vo(n, P.path, B.path).path });
    else {
      const b = be({}, P.params);
      for (const w in b) b[w] == null && delete b[w];
      (D = be({}, P, { params: f(b) })), (B.params = f(B.params));
    }
    const q = t.resolve(D, B),
      ue = P.hash || "";
    q.params = l(p(q.params));
    const h = wh(r, be({}, P, { hash: am(ue), path: q.path })),
      m = o.createHref(h);
    return be(
      { fullPath: h, hash: ue, query: r === pa ? dm(P.query) : P.query || {} },
      q,
      { redirectedFrom: void 0, href: m }
    );
  }
  function $(P) {
    return typeof P == "string" ? Vo(n, P, c.value.path) : be({}, P);
  }
  function J(P, B) {
    if (u !== P) return Dn(8, { from: B, to: P });
  }
  function L(P) {
    return ee(P);
  }
  function Y(P) {
    return L(be($(P), { replace: !0 }));
  }
  function Z(P) {
    const B = P.matched[P.matched.length - 1];
    if (B && B.redirect) {
      const { redirect: D } = B;
      let q = typeof D == "function" ? D(P) : D;
      return (
        typeof q == "string" &&
          ((q = q.includes("?") || q.includes("#") ? (q = $(q)) : { path: q }),
          (q.params = {})),
        be(
          { query: P.query, hash: P.hash, params: "path" in q ? {} : P.params },
          q
        )
      );
    }
  }
  function ee(P, B) {
    const D = (u = I(P)),
      q = c.value,
      ue = P.state,
      h = P.force,
      m = P.replace === !0,
      b = Z(D);
    if (b)
      return ee(
        be($(b), {
          state: typeof b == "object" ? be({}, ue, b.state) : ue,
          force: h,
          replace: m,
        }),
        B || D
      );
    const w = D;
    w.redirectedFrom = B;
    let O;
    return (
      !h && Eh(r, q, D) && ((O = Dn(16, { to: w, from: q })), tt(q, q, !0, !1)),
      (O ? Promise.resolve(O) : re(w, q))
        .catch((A) => (Ot(A) ? (Ot(A, 2) ? A : ie(A)) : pe(A, w, q)))
        .then((A) => {
          if (A) {
            if (Ot(A, 2))
              return ee(
                be({ replace: m }, $(A.to), {
                  state: typeof A.to == "object" ? be({}, ue, A.to.state) : ue,
                  force: h,
                }),
                B || w
              );
          } else A = U(w, q, !0, m, ue);
          return _e(w, q, A), A;
        })
    );
  }
  function z(P, B) {
    const D = J(P, B);
    return D ? Promise.reject(D) : Promise.resolve();
  }
  function se(P) {
    const B = Pt.values().next().value;
    return B && typeof B.runWithContext == "function"
      ? B.runWithContext(P)
      : P();
  }
  function re(P, B) {
    let D;
    const [q, ue, h] = wm(P, B);
    D = Ko(q.reverse(), "beforeRouteLeave", P, B);
    for (const b of q)
      b.leaveGuards.forEach((w) => {
        D.push(Ut(w, P, B));
      });
    const m = z.bind(null, P, B);
    return (
      D.push(m),
      Ne(D)
        .then(() => {
          D = [];
          for (const b of s.list()) D.push(Ut(b, P, B));
          return D.push(m), Ne(D);
        })
        .then(() => {
          D = Ko(ue, "beforeRouteUpdate", P, B);
          for (const b of ue)
            b.updateGuards.forEach((w) => {
              D.push(Ut(w, P, B));
            });
          return D.push(m), Ne(D);
        })
        .then(() => {
          D = [];
          for (const b of h)
            if (b.beforeEnter)
              if (_t(b.beforeEnter))
                for (const w of b.beforeEnter) D.push(Ut(w, P, B));
              else D.push(Ut(b.beforeEnter, P, B));
          return D.push(m), Ne(D);
        })
        .then(
          () => (
            P.matched.forEach((b) => (b.enterCallbacks = {})),
            (D = Ko(h, "beforeRouteEnter", P, B)),
            D.push(m),
            Ne(D)
          )
        )
        .then(() => {
          D = [];
          for (const b of i.list()) D.push(Ut(b, P, B));
          return D.push(m), Ne(D);
        })
        .catch((b) => (Ot(b, 8) ? b : Promise.reject(b)))
    );
  }
  function _e(P, B, D) {
    a.list().forEach((q) => se(() => q(P, B, D)));
  }
  function U(P, B, D, q, ue) {
    const h = J(P, B);
    if (h) return h;
    const m = B === Dt,
      b = Tn ? history.state : {};
    D &&
      (q || m
        ? o.replace(P.fullPath, be({ scroll: m && b && b.scroll }, ue))
        : o.push(P.fullPath, ue)),
      (c.value = P),
      tt(P, B, D, m),
      ie();
  }
  let de;
  function Re() {
    de ||
      (de = o.listen((P, B, D) => {
        if (!Qt.listening) return;
        const q = I(P),
          ue = Z(q);
        if (ue) {
          ee(be(ue, { replace: !0 }), q).catch(rr);
          return;
        }
        u = q;
        const h = c.value;
        Tn && Ih(sa(h.fullPath, D.delta), _o()),
          re(q, h)
            .catch((m) =>
              Ot(m, 12)
                ? m
                : Ot(m, 2)
                ? (ee(m.to, q)
                    .then((b) => {
                      Ot(b, 20) &&
                        !D.delta &&
                        D.type === pr.pop &&
                        o.go(-1, !1);
                    })
                    .catch(rr),
                  Promise.reject())
                : (D.delta && o.go(-D.delta, !1), pe(m, q, h))
            )
            .then((m) => {
              (m = m || U(q, h, !1)),
                m &&
                  (D.delta && !Ot(m, 8)
                    ? o.go(-D.delta, !1)
                    : D.type === pr.pop && Ot(m, 20) && o.go(-1, !1)),
                _e(q, h, m);
            })
            .catch(rr);
      }));
  }
  let et = Qn(),
    Te = Qn(),
    ge;
  function pe(P, B, D) {
    ie(P);
    const q = Te.list();
    return (
      q.length ? q.forEach((ue) => ue(P, B, D)) : console.error(P),
      Promise.reject(P)
    );
  }
  function lt() {
    return ge && c.value !== Dt
      ? Promise.resolve()
      : new Promise((P, B) => {
          et.add([P, B]);
        });
  }
  function ie(P) {
    return (
      ge ||
        ((ge = !P),
        Re(),
        et.list().forEach(([B, D]) => (P ? D(P) : B())),
        et.reset()),
      P
    );
  }
  function tt(P, B, D, q) {
    const { scrollBehavior: ue } = e;
    if (!Tn || !ue) return Promise.resolve();
    const h =
      (!D && xh(sa(P.fullPath, 0))) ||
      ((q || !D) && history.state && history.state.scroll) ||
      null;
    return tc()
      .then(() => ue(P, B, h))
      .then((m) => m && $h(m))
      .catch((m) => pe(m, P, B));
  }
  const je = (P) => o.go(P);
  let Be;
  const Pt = new Set(),
    Qt = {
      currentRoute: c,
      listening: !0,
      addRoute: y,
      removeRoute: g,
      hasRoute: N,
      getRoutes: C,
      resolve: I,
      options: e,
      push: L,
      replace: Y,
      go: je,
      back: () => je(-1),
      forward: () => je(1),
      beforeEach: s.add,
      beforeResolve: i.add,
      afterEach: a.add,
      onError: Te.add,
      isReady: lt,
      install(P) {
        const B = this;
        P.component("RouterLink", _m),
          P.component("RouterView", vm),
          (P.config.globalProperties.$router = B),
          Object.defineProperty(P.config.globalProperties, "$route", {
            enumerable: !0,
            get: () => kn(c),
          }),
          Tn &&
            !Be &&
            c.value === Dt &&
            ((Be = !0), L(o.location).catch((ue) => {}));
        const D = {};
        for (const ue in Dt)
          Object.defineProperty(D, ue, {
            get: () => c.value[ue],
            enumerable: !0,
          });
        P.provide(Ks, B), P.provide(qs, za(D)), P.provide(fs, c);
        const q = P.unmount;
        Pt.add(P),
          (P.unmount = function () {
            Pt.delete(P),
              Pt.size < 1 &&
                ((u = Dt),
                de && de(),
                (de = null),
                (c.value = Dt),
                (Be = !1),
                (ge = !1)),
              q();
          });
      },
    };
  function Ne(P) {
    return P.reduce((B, D) => B.then(() => se(D)), Promise.resolve());
  }
  return Qt;
}
function wm(e, t) {
  const n = [],
    r = [],
    o = [],
    s = Math.max(t.matched.length, e.matched.length);
  for (let i = 0; i < s; i++) {
    const a = t.matched[i];
    a && (e.matched.find((u) => Fn(u, a)) ? r.push(a) : n.push(a));
    const c = e.matched[i];
    c && (t.matched.find((u) => Fn(u, c)) || o.push(c));
  }
  return [n, r, o];
}
function Em() {
  return mt(qs);
}
function dl(e) {
  return Intl.NumberFormat().format(e);
}
const Pm = { props: ["colors", "selectedColorId"] },
  Tm = { class: "colors colors--black" },
  Om = { class: "colors__label" },
  Sm = ["value", "onChange", "checked"];
function Am(e, t, n, r, o, s) {
  return (
    S(),
    x("ul", Tm, [
      (S(!0),
      x(
        me,
        null,
        He(
          n.colors,
          (i) => (
            S(),
            x("li", { class: "colors__item", key: i.id }, [
              _("label", Om, [
                _(
                  "input",
                  {
                    class: "colors__radio sr-only",
                    type: "radio",
                    value: i.color.title,
                    onChange: (a) =>
                      e.$emit("update:selectedColorId", i.color.id),
                    checked: n.selectedColorId === i.color.id,
                  },
                  null,
                  40,
                  Sm
                ),
                _(
                  "span",
                  {
                    class: "colors__value",
                    style: fn("background-color: " + i.color.code),
                  },
                  null,
                  4
                ),
              ]),
            ])
          )
        ),
        128
      )),
    ])
  );
}
const zs = Pe(Pm, [["render", Am]]);
const km = Gt({
    props: { open: { type: Boolean } },
    setup(e, { emit: t }) {
      const n = ae(null),
        { doOpen: r, doClose: o } = tl(),
        s = (a) => {
          a.target !== n.value && a.target.contains(n.value) && emit("close");
        },
        i = () => {
          t("update:open", !1);
        };
      return (
        it(
          () => e.open,
          (a) => {
            a ? r() : o();
          },
          { immediate: !0 }
        ),
        { onOutsideClick: s, doCloseModal: i, contentElement: n }
      );
    },
  }),
  $m = (e) => (pn("data-v-efce6d6c"), (e = e()), hn(), e),
  Im = $m(() => _("div", { class: "teleport-blackout" }, null, -1)),
  xm = { ref: "contentElement", class: "teleport-modal__content" };
function Rm(e, t, n, r, o, s) {
  return e.open
    ? (S(),
      Fe(Nd, { key: 0, to: "#teleport-target" }, [
        Im,
        _(
          "div",
          {
            class: "teleport-modal",
            onClick:
              t[1] ||
              (t[1] = (...i) => e.onOutsideClick && e.onOutsideClick(...i)),
          },
          [
            _(
              "div",
              xm,
              [
                mc(e.$slots, "default", {}, void 0, !0),
                _(
                  "button",
                  {
                    type: "button",
                    class: "teleport-modal__close",
                    onClick:
                      t[0] ||
                      (t[0] = (...i) => e.doCloseModal && e.doCloseModal(...i)),
                  },
                  "X"
                ),
              ],
              512
            ),
          ]
        ),
      ]))
    : Ae("", !0);
}
const pl = Pe(km, [
  ["render", Rm],
  ["__scopeId", "data-v-efce6d6c"],
]);
const Nm = {
    name: "DataLoadingError",
    props: ["svgWidth", "svgHeight", "svgColor", "noMessage"],
  },
  Lm = { class: "data-loading-error" },
  Fm = ["width", "height"],
  Dm = { key: 0 };
function Mm(e, t, n, r, o, s) {
  return (
    S(),
    x("div", Lm, [
      (S(),
      x(
        "svg",
        {
          width: n.svgWidth,
          height: n.svgHeight,
          viewBox: "0 0 20 20",
          focusable: "false",
          class: "ux-notification__icon ng-star-inserted",
          "aria-hidden": "true",
        },
        [
          _(
            "path",
            {
              d: "M10 1.5C5.30558 1.5 1.5 5.30558 1.5 10C1.5 14.6944 5.30558 18.5 10 18.5C14.6944 18.5 18.5 14.6944 18.5 10C18.5 5.30558 14.6944 1.5 10 1.5ZM9.25 6.25C9.25 5.83579 9.58579 5.5 10 5.5C10.4142 5.5 10.75 5.83579 10.75 6.25V10.75C10.75 11.1642 10.4142 11.5 10 11.5C9.58579 11.5 9.25 11.1642 9.25 10.75V6.25ZM9.09998 13.9C9.09998 13.4029 9.50292 13 9.99998 13C10.497 13 10.9 13.4029 10.9 13.9C10.9 14.3971 10.497 14.8 9.99998 14.8C9.50292 14.8 9.09998 14.3971 9.09998 13.9Z",
              style: fn({ fill: n.svgColor || "#ff5260" }),
            },
            null,
            4
          ),
        ],
        8,
        Fm
      )),
      n.noMessage
        ? Ae("", !0)
        : (S(), x("span", Dm, "Ooooops! Something went wrong...")),
    ])
  );
}
const go = Pe(Nm, [
  ["render", Mm],
  ["__scopeId", "data-v-2c02c64b"],
]);
const jm = { name: "DataLoader", props: ["width", "height", "color"] },
  Bm = ["width", "height"],
  Um = Sc(
    '<defs data-v-ea88571e><rect id="spinner" x="46.5" y="40" width="7" height="20" rx="2" ry="2" transform="translate(0 -30)" data-v-ea88571e></rect></defs><use xlink:href="#spinner" transform="rotate(0 50 50)" data-v-ea88571e><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0s" repeatCount="indefinite" data-v-ea88571e></animate><animateTransform attributeName="transform" type="translate" additive="sum" dur="1s" begin="0s" repeatCount="indefinite" from="0 0" to="10" data-v-ea88571e></animateTransform><animateTransform attributeName="transform" type="skewX" additive="sum" dur="1s" begin="0s" repeatCount="indefinite" from="0" to="20" data-v-ea88571e></animateTransform></use><use xlink:href="#spinner" transform="rotate(30 50 50)" data-v-ea88571e><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.08s" repeatCount="indefinite" data-v-ea88571e></animate><animateTransform attributeName="transform" type="translate" additive="sum" dur="1s" begin="0.08s" repeatCount="indefinite" from="0 0" to="10" data-v-ea88571e></animateTransform><animateTransform attributeName="transform" type="skewX" additive="sum" dur="1s" begin="0.08s" repeatCount="indefinite" from="0" to="20" data-v-ea88571e></animateTransform></use><use xlink:href="#spinner" transform="rotate(60 50 50)" data-v-ea88571e><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.16s" repeatCount="indefinite" data-v-ea88571e></animate><animateTransform attributeName="transform" type="translate" additive="sum" dur="1s" begin="0.16s" repeatCount="indefinite" from="0 0" to="10" data-v-ea88571e></animateTransform><animateTransform attributeName="transform" type="skewX" additive="sum" dur="1s" begin="0.16s" repeatCount="indefinite" from="0" to="20" data-v-ea88571e></animateTransform></use><use xlink:href="#spinner" transform="rotate(90 50 50)" data-v-ea88571e><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.24s" repeatCount="indefinite" data-v-ea88571e></animate><animateTransform attributeName="transform" type="translate" additive="sum" dur="1s" begin="0.24s" repeatCount="indefinite" from="0 0" to="10" data-v-ea88571e></animateTransform><animateTransform attributeName="transform" type="skewX" additive="sum" dur="1s" begin="0.24s" repeatCount="indefinite" from="0" to="20" data-v-ea88571e></animateTransform></use><use xlink:href="#spinner" transform="rotate(120 50 50)" data-v-ea88571e><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.32s" repeatCount="indefinite" data-v-ea88571e></animate><animateTransform attributeName="transform" type="translate" additive="sum" dur="1s" begin="0.32s" repeatCount="indefinite" from="0 0" to="10" data-v-ea88571e></animateTransform><animateTransform attributeName="transform" type="skewX" additive="sum" dur="1s" begin="0.32s" repeatCount="indefinite" from="0" to="20" data-v-ea88571e></animateTransform></use><use xlink:href="#spinner" transform="rotate(150 50 50)" data-v-ea88571e><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.4s" repeatCount="indefinite" data-v-ea88571e></animate><animateTransform attributeName="transform" type="translate" additive="sum" dur="1s" begin="0.4s" repeatCount="indefinite" from="0 0" to="10" data-v-ea88571e></animateTransform><animateTransform attributeName="transform" type="skewX" additive="sum" dur="1s" begin="0.4s" repeatCount="indefinite" from="0" to="20" data-v-ea88571e></animateTransform></use><use xlink:href="#spinner" transform="rotate(180 50 50)" data-v-ea88571e><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.48s" repeatCount="indefinite" data-v-ea88571e></animate><animateTransform attributeName="transform" type="translate" additive="sum" dur="1s" begin="0.48s" repeatCount="indefinite" from="0 0" to="10" data-v-ea88571e></animateTransform><animateTransform attributeName="transform" type="skewX" additive="sum" dur="1s" begin="0.48s" repeatCount="indefinite" from="0" to="20" data-v-ea88571e></animateTransform></use><use xlink:href="#spinner" transform="rotate(210 50 50)" data-v-ea88571e><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.56s" repeatCount="indefinite" data-v-ea88571e></animate><animateTransform attributeName="transform" type="translate" additive="sum" dur="1s" begin="0.56s" repeatCount="indefinite" from="0 0" to="10" data-v-ea88571e></animateTransform><animateTransform attributeName="transform" type="skewX" additive="sum" dur="1s" begin="0.56s" repeatCount="indefinite" from="0" to="20" data-v-ea88571e></animateTransform></use><use xlink:href="#spinner" transform="rotate(240 50 50)" data-v-ea88571e><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.64s" repeatCount="indefinite" data-v-ea88571e></animate><animateTransform attributeName="transform" type="translate" additive="sum" dur="1s" begin="0.64s" repeatCount="indefinite" from="0 0" to="10" data-v-ea88571e></animateTransform><animateTransform attributeName="transform" type="skewX" additive="sum" dur="1s" begin="0.64s" repeatCount="indefinite" from="0" to="20" data-v-ea88571e></animateTransform></use><use xlink:href="#spinner" transform="rotate(270 50 50)" data-v-ea88571e><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.72s" repeatCount="indefinite" data-v-ea88571e></animate><animateTransform attributeName="transform" type="translate" additive="sum" dur="1s" begin="0.72s" repeatCount="indefinite" from="0 0" to="10" data-v-ea88571e></animateTransform><animateTransform attributeName="transform" type="skewX" additive="sum" dur="1s" begin="0.72s" repeatCount="indefinite" from="0" to="20" data-v-ea88571e></animateTransform></use><use xlink:href="#spinner" transform="rotate(300 50 50)" data-v-ea88571e><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.8s" repeatCount="indefinite" data-v-ea88571e></animate><animateTransform attributeName="transform" type="translate" additive="sum" dur="1s" begin="0.8s" repeatCount="indefinite" from="0 0" to="10" data-v-ea88571e></animateTransform><animateTransform attributeName="transform" type="skewX" additive="sum" dur="1s" begin="0.8s" repeatCount="indefinite" from="0" to="20" data-v-ea88571e></animateTransform></use><use xlink:href="#spinner" transform="rotate(330 50 50)" data-v-ea88571e><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.88s" repeatCount="indefinite" data-v-ea88571e></animate><animateTransform attributeName="transform" type="translate" additive="sum" dur="1s" begin="0.88s" repeatCount="indefinite" from="0 0" to="10" data-v-ea88571e></animateTransform><animateTransform attributeName="transform" type="skewX" additive="sum" dur="1s" begin="0.88s" repeatCount="indefinite" from="0" to="20" data-v-ea88571e></animateTransform></use>',
    13
  ),
  Hm = [Um];
function Vm(e, t, n, r, o, s) {
  return (
    S(),
    x(
      "svg",
      {
        class: "data-loader",
        xmlns: "http://www.w3.org/2000/svg",
        width: n.width,
        height: n.height,
        viewBox: "0 0 100 100",
        overflow: "visible",
        style: fn({ fill: n.color || "#9eff00" }),
      },
      Hm,
      12,
      Bm
    )
  );
}
const _n = Pe(jm, [
  ["render", Vm],
  ["__scopeId", "data-v-ea88571e"],
]);
const Km = {
    name: "DataProcessedSuccessfullyItem",
    props: ["width", "height"],
  },
  hl = (e) => (pn("data-v-7a5687e6"), (e = e()), hn(), e),
  qm = ["width", "height"],
  zm = hl(() => _("defs", null, null, -1)),
  Wm = hl(() =>
    _(
      "g",
      {
        style: {
          stroke: "none",
          "stroke-width": "0",
          "stroke-dasharray": "none",
          "stroke-linecap": "butt",
          "stroke-linejoin": "miter",
          "stroke-miterlimit": "10",
          fill: "none",
          "fill-rule": "nonzero",
          opacity: "1",
        },
        transform:
          "translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)",
      },
      [
        _("path", {
          d: "M 89.328 2.625 L 89.328 2.625 c -1.701 -2.859 -5.728 -3.151 -7.824 -0.568 L 46.532 45.173 c -0.856 1.055 -2.483 0.997 -3.262 -0.115 l -8.382 -11.97 c -2.852 -4.073 -8.789 -4.335 -11.989 -0.531 l 0 0 c -2.207 2.624 -2.374 6.403 -0.408 9.211 l 17.157 24.502 c 2.088 2.982 6.507 2.977 8.588 -0.011 l 4.925 -7.07 L 89.135 7.813 C 90.214 6.272 90.289 4.242 89.328 2.625 z",
          style: {
            stroke: "none",
            "stroke-width": "1",
            "stroke-dasharray": "none",
            "stroke-linecap": "butt",
            "stroke-linejoin": "miter",
            "stroke-miterlimit": "10",
            fill: "#9eff00",
            "fill-rule": "nonzero",
            opacity: "1",
          },
          transform: " matrix(1 0 0 1 0 0) ",
          "stroke-linecap": "round",
        }),
        _("path", {
          d: "M 45 90 C 20.187 90 0 69.813 0 45 C 0 20.187 20.187 0 45 0 c 6.072 0 11.967 1.19 17.518 3.538 c 2.034 0.861 2.986 3.208 2.125 5.242 c -0.859 2.035 -3.207 2.987 -5.242 2.126 C 54.842 8.978 49.996 8 45 8 C 24.598 8 8 24.598 8 45 c 0 20.402 16.598 37 37 37 c 20.402 0 37 -16.598 37 -37 c 0 -3.248 -0.42 -6.469 -1.249 -9.573 c -0.57 -2.134 0.698 -4.327 2.832 -4.897 c 2.133 -0.571 4.326 0.698 4.896 2.833 C 89.488 37.14 90 41.055 90 45 C 90 69.813 69.813 90 45 90 z",
          style: {
            stroke: "none",
            "stroke-width": "1",
            "stroke-dasharray": "none",
            "stroke-linecap": "butt",
            "stroke-linejoin": "miter",
            "stroke-miterlimit": "10",
            fill: "#9eff00",
            "fill-rule": "nonzero",
            opacity: "1",
          },
          transform: " matrix(1 0 0 1 0 0) ",
          "stroke-linecap": "round",
        }),
      ],
      -1
    )
  ),
  Gm = [zm, Wm];
function Qm(e, t, n, r, o, s) {
  return (
    S(),
    x(
      "svg",
      {
        class: "data-processed-successfully",
        xmlns: "http://www.w3.org/2000/svg",
        "xmlns:xlink": "http://www.w3.org/1999/xlink",
        version: "1.1",
        width: n.width,
        height: n.height,
        viewBox: "0 0 256 256",
        "xml:space": "preserve",
      },
      Gm,
      8,
      qm
    )
  );
}
const ml = Pe(Km, [
    ["render", Qm],
    ["__scopeId", "data-v-7a5687e6"],
  ]),
  Jm = {
    name: "ProductCounter",
    props: ["count"],
    setup(e, { emit: t }) {
      const n = ae(e.count),
        r = () => {
          n.value++;
        },
        o = () => {
          n.value > 0 && n.value--;
        };
      it(n, (a) => {
        t("update:count", a);
      });
      const s = () => {
          i.value && i.value.focus();
        },
        i = ae(null);
      return (
        yr(() => {
          s();
        }),
        { quantity: n, incrementAmount: r, decrementAmount: o, inputRef: i }
      );
    },
  },
  Xm = { class: "product__counter form__counter" },
  Ym = _(
    "svg",
    { width: "10", height: "10", fill: "currentColor" },
    [_("use", { "xlink:href": "#icon-minus" })],
    -1
  ),
  Zm = [Ym],
  e_ = _(
    "svg",
    { width: "10", height: "10", fill: "currentColor" },
    [_("use", { "xlink:href": "#icon-plus" })],
    -1
  ),
  t_ = [e_];
function n_(e, t, n, r, o, s) {
  return (
    S(),
    x("div", Xm, [
      _(
        "button",
        {
          type: "button",
          "aria-label": "Убрать один товар",
          onClick:
            t[0] ||
            (t[0] = Ge(
              (...i) => r.decrementAmount && r.decrementAmount(...i),
              ["prevent"]
            )),
        },
        Zm
      ),
      Kt(
        _(
          "input",
          {
            "onUpdate:modelValue": t[1] || (t[1] = (i) => (r.quantity = i)),
            name: "count",
            ref: "counter",
          },
          null,
          512
        ),
        [[Nn, r.quantity]]
      ),
      _(
        "button",
        {
          type: "button",
          "aria-label": "Добавить один товар",
          onClick:
            t[2] ||
            (t[2] = Ge(
              (...i) => r.incrementAmount && r.incrementAmount(...i),
              ["prevent"]
            )),
        },
        t_
      ),
    ])
  );
}
const Ws = Pe(Jm, [["render", n_]]),
  Ye = "https://vue-tzr.skillbox.cc";
function _l(e, t) {
  return function () {
    return e.apply(t, arguments);
  };
}
const { toString: r_ } = Object.prototype,
  { getPrototypeOf: Gs } = Object,
  yo = ((e) => (t) => {
    const n = r_.call(t);
    return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
  })(Object.create(null)),
  Et = (e) => ((e = e.toLowerCase()), (t) => yo(t) === e),
  bo = (e) => (t) => typeof t === e,
  { isArray: Kn } = Array,
  hr = bo("undefined");
function o_(e) {
  return (
    e !== null &&
    !hr(e) &&
    e.constructor !== null &&
    !hr(e.constructor) &&
    ct(e.constructor.isBuffer) &&
    e.constructor.isBuffer(e)
  );
}
const gl = Et("ArrayBuffer");
function s_(e) {
  let t;
  return (
    typeof ArrayBuffer < "u" && ArrayBuffer.isView
      ? (t = ArrayBuffer.isView(e))
      : (t = e && e.buffer && gl(e.buffer)),
    t
  );
}
const i_ = bo("string"),
  ct = bo("function"),
  yl = bo("number"),
  vo = (e) => e !== null && typeof e == "object",
  a_ = (e) => e === !0 || e === !1,
  Ur = (e) => {
    if (yo(e) !== "object") return !1;
    const t = Gs(e);
    return (
      (t === null ||
        t === Object.prototype ||
        Object.getPrototypeOf(t) === null) &&
      !(Symbol.toStringTag in e) &&
      !(Symbol.iterator in e)
    );
  },
  c_ = Et("Date"),
  l_ = Et("File"),
  u_ = Et("Blob"),
  f_ = Et("FileList"),
  d_ = (e) => vo(e) && ct(e.pipe),
  p_ = (e) => {
    let t;
    return (
      e &&
      ((typeof FormData == "function" && e instanceof FormData) ||
        (ct(e.append) &&
          ((t = yo(e)) === "formdata" ||
            (t === "object" &&
              ct(e.toString) &&
              e.toString() === "[object FormData]"))))
    );
  },
  h_ = Et("URLSearchParams"),
  m_ = (e) =>
    e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function vr(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u") return;
  let r, o;
  if ((typeof e != "object" && (e = [e]), Kn(e)))
    for (r = 0, o = e.length; r < o; r++) t.call(null, e[r], r, e);
  else {
    const s = n ? Object.getOwnPropertyNames(e) : Object.keys(e),
      i = s.length;
    let a;
    for (r = 0; r < i; r++) (a = s[r]), t.call(null, e[a], a, e);
  }
}
function bl(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length,
    o;
  for (; r-- > 0; ) if (((o = n[r]), t === o.toLowerCase())) return o;
  return null;
}
const vl = (() =>
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : global)(),
  Cl = (e) => !hr(e) && e !== vl;
function ds() {
  const { caseless: e } = (Cl(this) && this) || {},
    t = {},
    n = (r, o) => {
      const s = (e && bl(t, o)) || o;
      Ur(t[s]) && Ur(r)
        ? (t[s] = ds(t[s], r))
        : Ur(r)
        ? (t[s] = ds({}, r))
        : Kn(r)
        ? (t[s] = r.slice())
        : (t[s] = r);
    };
  for (let r = 0, o = arguments.length; r < o; r++)
    arguments[r] && vr(arguments[r], n);
  return t;
}
const __ = (e, t, n, { allOwnKeys: r } = {}) => (
    vr(
      t,
      (o, s) => {
        n && ct(o) ? (e[s] = _l(o, n)) : (e[s] = o);
      },
      { allOwnKeys: r }
    ),
    e
  ),
  g_ = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
  y_ = (e, t, n, r) => {
    (e.prototype = Object.create(t.prototype, r)),
      (e.prototype.constructor = e),
      Object.defineProperty(e, "super", { value: t.prototype }),
      n && Object.assign(e.prototype, n);
  },
  b_ = (e, t, n, r) => {
    let o, s, i;
    const a = {};
    if (((t = t || {}), e == null)) return t;
    do {
      for (o = Object.getOwnPropertyNames(e), s = o.length; s-- > 0; )
        (i = o[s]), (!r || r(i, e, t)) && !a[i] && ((t[i] = e[i]), (a[i] = !0));
      e = n !== !1 && Gs(e);
    } while (e && (!n || n(e, t)) && e !== Object.prototype);
    return t;
  },
  v_ = (e, t, n) => {
    (e = String(e)),
      (n === void 0 || n > e.length) && (n = e.length),
      (n -= t.length);
    const r = e.indexOf(t, n);
    return r !== -1 && r === n;
  },
  C_ = (e) => {
    if (!e) return null;
    if (Kn(e)) return e;
    let t = e.length;
    if (!yl(t)) return null;
    const n = new Array(t);
    for (; t-- > 0; ) n[t] = e[t];
    return n;
  },
  w_ = (
    (e) => (t) =>
      e && t instanceof e
  )(typeof Uint8Array < "u" && Gs(Uint8Array)),
  E_ = (e, t) => {
    const r = (e && e[Symbol.iterator]).call(e);
    let o;
    for (; (o = r.next()) && !o.done; ) {
      const s = o.value;
      t.call(e, s[0], s[1]);
    }
  },
  P_ = (e, t) => {
    let n;
    const r = [];
    for (; (n = e.exec(t)) !== null; ) r.push(n);
    return r;
  },
  T_ = Et("HTMLFormElement"),
  O_ = (e) =>
    e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (n, r, o) {
      return r.toUpperCase() + o;
    }),
  ba = (
    ({ hasOwnProperty: e }) =>
    (t, n) =>
      e.call(t, n)
  )(Object.prototype),
  S_ = Et("RegExp"),
  wl = (e, t) => {
    const n = Object.getOwnPropertyDescriptors(e),
      r = {};
    vr(n, (o, s) => {
      let i;
      (i = t(o, s, e)) !== !1 && (r[s] = i || o);
    }),
      Object.defineProperties(e, r);
  },
  A_ = (e) => {
    wl(e, (t, n) => {
      if (ct(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
        return !1;
      const r = e[n];
      if (ct(r)) {
        if (((t.enumerable = !1), "writable" in t)) {
          t.writable = !1;
          return;
        }
        t.set ||
          (t.set = () => {
            throw Error("Can not rewrite read-only method '" + n + "'");
          });
      }
    });
  },
  k_ = (e, t) => {
    const n = {},
      r = (o) => {
        o.forEach((s) => {
          n[s] = !0;
        });
      };
    return Kn(e) ? r(e) : r(String(e).split(t)), n;
  },
  $_ = () => {},
  I_ = (e, t) => ((e = +e), Number.isFinite(e) ? e : t),
  qo = "abcdefghijklmnopqrstuvwxyz",
  va = "0123456789",
  El = { DIGIT: va, ALPHA: qo, ALPHA_DIGIT: qo + qo.toUpperCase() + va },
  x_ = (e = 16, t = El.ALPHA_DIGIT) => {
    let n = "";
    const { length: r } = t;
    for (; e--; ) n += t[(Math.random() * r) | 0];
    return n;
  };
function R_(e) {
  return !!(
    e &&
    ct(e.append) &&
    e[Symbol.toStringTag] === "FormData" &&
    e[Symbol.iterator]
  );
}
const N_ = (e) => {
    const t = new Array(10),
      n = (r, o) => {
        if (vo(r)) {
          if (t.indexOf(r) >= 0) return;
          if (!("toJSON" in r)) {
            t[o] = r;
            const s = Kn(r) ? [] : {};
            return (
              vr(r, (i, a) => {
                const c = n(i, o + 1);
                !hr(c) && (s[a] = c);
              }),
              (t[o] = void 0),
              s
            );
          }
        }
        return r;
      };
    return n(e, 0);
  },
  L_ = Et("AsyncFunction"),
  F_ = (e) => e && (vo(e) || ct(e)) && ct(e.then) && ct(e.catch),
  E = {
    isArray: Kn,
    isArrayBuffer: gl,
    isBuffer: o_,
    isFormData: p_,
    isArrayBufferView: s_,
    isString: i_,
    isNumber: yl,
    isBoolean: a_,
    isObject: vo,
    isPlainObject: Ur,
    isUndefined: hr,
    isDate: c_,
    isFile: l_,
    isBlob: u_,
    isRegExp: S_,
    isFunction: ct,
    isStream: d_,
    isURLSearchParams: h_,
    isTypedArray: w_,
    isFileList: f_,
    forEach: vr,
    merge: ds,
    extend: __,
    trim: m_,
    stripBOM: g_,
    inherits: y_,
    toFlatObject: b_,
    kindOf: yo,
    kindOfTest: Et,
    endsWith: v_,
    toArray: C_,
    forEachEntry: E_,
    matchAll: P_,
    isHTMLForm: T_,
    hasOwnProperty: ba,
    hasOwnProp: ba,
    reduceDescriptors: wl,
    freezeMethods: A_,
    toObjectSet: k_,
    toCamelCase: O_,
    noop: $_,
    toFiniteNumber: I_,
    findKey: bl,
    global: vl,
    isContextDefined: Cl,
    ALPHABET: El,
    generateString: x_,
    isSpecCompliantForm: R_,
    toJSONObject: N_,
    isAsyncFn: L_,
    isThenable: F_,
  };
function ce(e, t, n, r, o) {
  Error.call(this),
    Error.captureStackTrace
      ? Error.captureStackTrace(this, this.constructor)
      : (this.stack = new Error().stack),
    (this.message = e),
    (this.name = "AxiosError"),
    t && (this.code = t),
    n && (this.config = n),
    r && (this.request = r),
    o && (this.response = o);
}
E.inherits(ce, Error, {
  toJSON: function () {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: E.toJSONObject(this.config),
      code: this.code,
      status:
        this.response && this.response.status ? this.response.status : null,
    };
  },
});
const Pl = ce.prototype,
  Tl = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL",
].forEach((e) => {
  Tl[e] = { value: e };
});
Object.defineProperties(ce, Tl);
Object.defineProperty(Pl, "isAxiosError", { value: !0 });
ce.from = (e, t, n, r, o, s) => {
  const i = Object.create(Pl);
  return (
    E.toFlatObject(
      e,
      i,
      function (c) {
        return c !== Error.prototype;
      },
      (a) => a !== "isAxiosError"
    ),
    ce.call(i, e.message, t, n, r, o),
    (i.cause = e),
    (i.name = e.name),
    s && Object.assign(i, s),
    i
  );
};
const D_ = null;
function ps(e) {
  return E.isPlainObject(e) || E.isArray(e);
}
function Ol(e) {
  return E.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function Ca(e, t, n) {
  return e
    ? e
        .concat(t)
        .map(function (o, s) {
          return (o = Ol(o)), !n && s ? "[" + o + "]" : o;
        })
        .join(n ? "." : "")
    : t;
}
function M_(e) {
  return E.isArray(e) && !e.some(ps);
}
const j_ = E.toFlatObject(E, {}, null, function (t) {
  return /^is[A-Z]/.test(t);
});
function Co(e, t, n) {
  if (!E.isObject(e)) throw new TypeError("target must be an object");
  (t = t || new FormData()),
    (n = E.toFlatObject(
      n,
      { metaTokens: !0, dots: !1, indexes: !1 },
      !1,
      function (C, N) {
        return !E.isUndefined(N[C]);
      }
    ));
  const r = n.metaTokens,
    o = n.visitor || l,
    s = n.dots,
    i = n.indexes,
    c = (n.Blob || (typeof Blob < "u" && Blob)) && E.isSpecCompliantForm(t);
  if (!E.isFunction(o)) throw new TypeError("visitor must be a function");
  function u(g) {
    if (g === null) return "";
    if (E.isDate(g)) return g.toISOString();
    if (!c && E.isBlob(g))
      throw new ce("Blob is not supported. Use a Buffer instead.");
    return E.isArrayBuffer(g) || E.isTypedArray(g)
      ? c && typeof Blob == "function"
        ? new Blob([g])
        : Buffer.from(g)
      : g;
  }
  function l(g, C, N) {
    let I = g;
    if (g && !N && typeof g == "object") {
      if (E.endsWith(C, "{}"))
        (C = r ? C : C.slice(0, -2)), (g = JSON.stringify(g));
      else if (
        (E.isArray(g) && M_(g)) ||
        ((E.isFileList(g) || E.endsWith(C, "[]")) && (I = E.toArray(g)))
      )
        return (
          (C = Ol(C)),
          I.forEach(function (J, L) {
            !(E.isUndefined(J) || J === null) &&
              t.append(
                i === !0 ? Ca([C], L, s) : i === null ? C : C + "[]",
                u(J)
              );
          }),
          !1
        );
    }
    return ps(g) ? !0 : (t.append(Ca(N, C, s), u(g)), !1);
  }
  const f = [],
    p = Object.assign(j_, {
      defaultVisitor: l,
      convertValue: u,
      isVisitable: ps,
    });
  function y(g, C) {
    if (!E.isUndefined(g)) {
      if (f.indexOf(g) !== -1)
        throw Error("Circular reference detected in " + C.join("."));
      f.push(g),
        E.forEach(g, function (I, $) {
          (!(E.isUndefined(I) || I === null) &&
            o.call(t, I, E.isString($) ? $.trim() : $, C, p)) === !0 &&
            y(I, C ? C.concat($) : [$]);
        }),
        f.pop();
    }
  }
  if (!E.isObject(e)) throw new TypeError("data must be an object");
  return y(e), t;
}
function wa(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0",
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (r) {
    return t[r];
  });
}
function Qs(e, t) {
  (this._pairs = []), e && Co(e, this, t);
}
const Sl = Qs.prototype;
Sl.append = function (t, n) {
  this._pairs.push([t, n]);
};
Sl.toString = function (t) {
  const n = t
    ? function (r) {
        return t.call(this, r, wa);
      }
    : wa;
  return this._pairs
    .map(function (o) {
      return n(o[0]) + "=" + n(o[1]);
    }, "")
    .join("&");
};
function B_(e) {
  return encodeURIComponent(e)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+")
    .replace(/%5B/gi, "[")
    .replace(/%5D/gi, "]");
}
function Al(e, t, n) {
  if (!t) return e;
  const r = (n && n.encode) || B_,
    o = n && n.serialize;
  let s;
  if (
    (o
      ? (s = o(t, n))
      : (s = E.isURLSearchParams(t) ? t.toString() : new Qs(t, n).toString(r)),
    s)
  ) {
    const i = e.indexOf("#");
    i !== -1 && (e = e.slice(0, i)),
      (e += (e.indexOf("?") === -1 ? "?" : "&") + s);
  }
  return e;
}
class U_ {
  constructor() {
    this.handlers = [];
  }
  use(t, n, r) {
    return (
      this.handlers.push({
        fulfilled: t,
        rejected: n,
        synchronous: r ? r.synchronous : !1,
        runWhen: r ? r.runWhen : null,
      }),
      this.handlers.length - 1
    );
  }
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(t) {
    E.forEach(this.handlers, function (r) {
      r !== null && t(r);
    });
  }
}
const Ea = U_,
  kl = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
  },
  H_ = typeof URLSearchParams < "u" ? URLSearchParams : Qs,
  V_ = typeof FormData < "u" ? FormData : null,
  K_ = typeof Blob < "u" ? Blob : null,
  q_ = (() => {
    let e;
    return typeof navigator < "u" &&
      ((e = navigator.product) === "ReactNative" ||
        e === "NativeScript" ||
        e === "NS")
      ? !1
      : typeof window < "u" && typeof document < "u";
  })(),
  z_ = (() =>
    typeof WorkerGlobalScope < "u" &&
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts == "function")(),
  Ct = {
    isBrowser: !0,
    classes: { URLSearchParams: H_, FormData: V_, Blob: K_ },
    isStandardBrowserEnv: q_,
    isStandardBrowserWebWorkerEnv: z_,
    protocols: ["http", "https", "file", "blob", "url", "data"],
  };
function W_(e, t) {
  return Co(
    e,
    new Ct.classes.URLSearchParams(),
    Object.assign(
      {
        visitor: function (n, r, o, s) {
          return Ct.isNode && E.isBuffer(n)
            ? (this.append(r, n.toString("base64")), !1)
            : s.defaultVisitor.apply(this, arguments);
        },
      },
      t
    )
  );
}
function G_(e) {
  return E.matchAll(/\w+|\[(\w*)]/g, e).map((t) =>
    t[0] === "[]" ? "" : t[1] || t[0]
  );
}
function Q_(e) {
  const t = {},
    n = Object.keys(e);
  let r;
  const o = n.length;
  let s;
  for (r = 0; r < o; r++) (s = n[r]), (t[s] = e[s]);
  return t;
}
function $l(e) {
  function t(n, r, o, s) {
    let i = n[s++];
    const a = Number.isFinite(+i),
      c = s >= n.length;
    return (
      (i = !i && E.isArray(o) ? o.length : i),
      c
        ? (E.hasOwnProp(o, i) ? (o[i] = [o[i], r]) : (o[i] = r), !a)
        : ((!o[i] || !E.isObject(o[i])) && (o[i] = []),
          t(n, r, o[i], s) && E.isArray(o[i]) && (o[i] = Q_(o[i])),
          !a)
    );
  }
  if (E.isFormData(e) && E.isFunction(e.entries)) {
    const n = {};
    return (
      E.forEachEntry(e, (r, o) => {
        t(G_(r), o, n, 0);
      }),
      n
    );
  }
  return null;
}
function J_(e, t, n) {
  if (E.isString(e))
    try {
      return (t || JSON.parse)(e), E.trim(e);
    } catch (r) {
      if (r.name !== "SyntaxError") throw r;
    }
  return (n || JSON.stringify)(e);
}
const Js = {
  transitional: kl,
  adapter: ["xhr", "http"],
  transformRequest: [
    function (t, n) {
      const r = n.getContentType() || "",
        o = r.indexOf("application/json") > -1,
        s = E.isObject(t);
      if ((s && E.isHTMLForm(t) && (t = new FormData(t)), E.isFormData(t)))
        return o && o ? JSON.stringify($l(t)) : t;
      if (
        E.isArrayBuffer(t) ||
        E.isBuffer(t) ||
        E.isStream(t) ||
        E.isFile(t) ||
        E.isBlob(t)
      )
        return t;
      if (E.isArrayBufferView(t)) return t.buffer;
      if (E.isURLSearchParams(t))
        return (
          n.setContentType(
            "application/x-www-form-urlencoded;charset=utf-8",
            !1
          ),
          t.toString()
        );
      let a;
      if (s) {
        if (r.indexOf("application/x-www-form-urlencoded") > -1)
          return W_(t, this.formSerializer).toString();
        if ((a = E.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
          const c = this.env && this.env.FormData;
          return Co(
            a ? { "files[]": t } : t,
            c && new c(),
            this.formSerializer
          );
        }
      }
      return s || o ? (n.setContentType("application/json", !1), J_(t)) : t;
    },
  ],
  transformResponse: [
    function (t) {
      const n = this.transitional || Js.transitional,
        r = n && n.forcedJSONParsing,
        o = this.responseType === "json";
      if (t && E.isString(t) && ((r && !this.responseType) || o)) {
        const i = !(n && n.silentJSONParsing) && o;
        try {
          return JSON.parse(t);
        } catch (a) {
          if (i)
            throw a.name === "SyntaxError"
              ? ce.from(a, ce.ERR_BAD_RESPONSE, this, null, this.response)
              : a;
        }
      }
      return t;
    },
  ],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: Ct.classes.FormData, Blob: Ct.classes.Blob },
  validateStatus: function (t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0,
    },
  },
};
E.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  Js.headers[e] = {};
});
const Xs = Js,
  X_ = E.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent",
  ]),
  Y_ = (e) => {
    const t = {};
    let n, r, o;
    return (
      e &&
        e
          .split(
            `
`
          )
          .forEach(function (i) {
            (o = i.indexOf(":")),
              (n = i.substring(0, o).trim().toLowerCase()),
              (r = i.substring(o + 1).trim()),
              !(!n || (t[n] && X_[n])) &&
                (n === "set-cookie"
                  ? t[n]
                    ? t[n].push(r)
                    : (t[n] = [r])
                  : (t[n] = t[n] ? t[n] + ", " + r : r));
          }),
      t
    );
  },
  Pa = Symbol("internals");
function Jn(e) {
  return e && String(e).trim().toLowerCase();
}
function Hr(e) {
  return e === !1 || e == null ? e : E.isArray(e) ? e.map(Hr) : String(e);
}
function Z_(e) {
  const t = Object.create(null),
    n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; (r = n.exec(e)); ) t[r[1]] = r[2];
  return t;
}
const eg = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function zo(e, t, n, r, o) {
  if (E.isFunction(r)) return r.call(this, t, n);
  if ((o && (t = n), !!E.isString(t))) {
    if (E.isString(r)) return t.indexOf(r) !== -1;
    if (E.isRegExp(r)) return r.test(t);
  }
}
function tg(e) {
  return e
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function ng(e, t) {
  const n = E.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(e, r + n, {
      value: function (o, s, i) {
        return this[r].call(this, t, o, s, i);
      },
      configurable: !0,
    });
  });
}
class wo {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, r) {
    const o = this;
    function s(a, c, u) {
      const l = Jn(c);
      if (!l) throw new Error("header name must be a non-empty string");
      const f = E.findKey(o, l);
      (!f || o[f] === void 0 || u === !0 || (u === void 0 && o[f] !== !1)) &&
        (o[f || c] = Hr(a));
    }
    const i = (a, c) => E.forEach(a, (u, l) => s(u, l, c));
    return (
      E.isPlainObject(t) || t instanceof this.constructor
        ? i(t, n)
        : E.isString(t) && (t = t.trim()) && !eg(t)
        ? i(Y_(t), n)
        : t != null && s(n, t, r),
      this
    );
  }
  get(t, n) {
    if (((t = Jn(t)), t)) {
      const r = E.findKey(this, t);
      if (r) {
        const o = this[r];
        if (!n) return o;
        if (n === !0) return Z_(o);
        if (E.isFunction(n)) return n.call(this, o, r);
        if (E.isRegExp(n)) return n.exec(o);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (((t = Jn(t)), t)) {
      const r = E.findKey(this, t);
      return !!(r && this[r] !== void 0 && (!n || zo(this, this[r], r, n)));
    }
    return !1;
  }
  delete(t, n) {
    const r = this;
    let o = !1;
    function s(i) {
      if (((i = Jn(i)), i)) {
        const a = E.findKey(r, i);
        a && (!n || zo(r, r[a], a, n)) && (delete r[a], (o = !0));
      }
    }
    return E.isArray(t) ? t.forEach(s) : s(t), o;
  }
  clear(t) {
    const n = Object.keys(this);
    let r = n.length,
      o = !1;
    for (; r--; ) {
      const s = n[r];
      (!t || zo(this, this[s], s, t, !0)) && (delete this[s], (o = !0));
    }
    return o;
  }
  normalize(t) {
    const n = this,
      r = {};
    return (
      E.forEach(this, (o, s) => {
        const i = E.findKey(r, s);
        if (i) {
          (n[i] = Hr(o)), delete n[s];
          return;
        }
        const a = t ? tg(s) : String(s).trim();
        a !== s && delete n[s], (n[a] = Hr(o)), (r[a] = !0);
      }),
      this
    );
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = Object.create(null);
    return (
      E.forEach(this, (r, o) => {
        r != null && r !== !1 && (n[o] = t && E.isArray(r) ? r.join(", ") : r);
      }),
      n
    );
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const r = new this(t);
    return n.forEach((o) => r.set(o)), r;
  }
  static accessor(t) {
    const r = (this[Pa] = this[Pa] = { accessors: {} }).accessors,
      o = this.prototype;
    function s(i) {
      const a = Jn(i);
      r[a] || (ng(o, i), (r[a] = !0));
    }
    return E.isArray(t) ? t.forEach(s) : s(t), this;
  }
}
wo.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization",
]);
E.reduceDescriptors(wo.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(r) {
      this[n] = r;
    },
  };
});
E.freezeMethods(wo);
const It = wo;
function Wo(e, t) {
  const n = this || Xs,
    r = t || n,
    o = It.from(r.headers);
  let s = r.data;
  return (
    E.forEach(e, function (a) {
      s = a.call(n, s, o.normalize(), t ? t.status : void 0);
    }),
    o.normalize(),
    s
  );
}
function Il(e) {
  return !!(e && e.__CANCEL__);
}
function Cr(e, t, n) {
  ce.call(this, e ?? "canceled", ce.ERR_CANCELED, t, n),
    (this.name = "CanceledError");
}
E.inherits(Cr, ce, { __CANCEL__: !0 });
function rg(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status)
    ? e(n)
    : t(
        new ce(
          "Request failed with status code " + n.status,
          [ce.ERR_BAD_REQUEST, ce.ERR_BAD_RESPONSE][
            Math.floor(n.status / 100) - 4
          ],
          n.config,
          n.request,
          n
        )
      );
}
const og = Ct.isStandardBrowserEnv
  ? (function () {
      return {
        write: function (n, r, o, s, i, a) {
          const c = [];
          c.push(n + "=" + encodeURIComponent(r)),
            E.isNumber(o) && c.push("expires=" + new Date(o).toGMTString()),
            E.isString(s) && c.push("path=" + s),
            E.isString(i) && c.push("domain=" + i),
            a === !0 && c.push("secure"),
            (document.cookie = c.join("; "));
        },
        read: function (n) {
          const r = document.cookie.match(
            new RegExp("(^|;\\s*)(" + n + ")=([^;]*)")
          );
          return r ? decodeURIComponent(r[3]) : null;
        },
        remove: function (n) {
          this.write(n, "", Date.now() - 864e5);
        },
      };
    })()
  : (function () {
      return {
        write: function () {},
        read: function () {
          return null;
        },
        remove: function () {},
      };
    })();
function sg(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function ig(e, t) {
  return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function xl(e, t) {
  return e && !sg(t) ? ig(e, t) : t;
}
const ag = Ct.isStandardBrowserEnv
  ? (function () {
      const t = /(msie|trident)/i.test(navigator.userAgent),
        n = document.createElement("a");
      let r;
      function o(s) {
        let i = s;
        return (
          t && (n.setAttribute("href", i), (i = n.href)),
          n.setAttribute("href", i),
          {
            href: n.href,
            protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
            host: n.host,
            search: n.search ? n.search.replace(/^\?/, "") : "",
            hash: n.hash ? n.hash.replace(/^#/, "") : "",
            hostname: n.hostname,
            port: n.port,
            pathname:
              n.pathname.charAt(0) === "/" ? n.pathname : "/" + n.pathname,
          }
        );
      }
      return (
        (r = o(window.location.href)),
        function (i) {
          const a = E.isString(i) ? o(i) : i;
          return a.protocol === r.protocol && a.host === r.host;
        }
      );
    })()
  : (function () {
      return function () {
        return !0;
      };
    })();
function cg(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return (t && t[1]) || "";
}
function lg(e, t) {
  e = e || 10;
  const n = new Array(e),
    r = new Array(e);
  let o = 0,
    s = 0,
    i;
  return (
    (t = t !== void 0 ? t : 1e3),
    function (c) {
      const u = Date.now(),
        l = r[s];
      i || (i = u), (n[o] = c), (r[o] = u);
      let f = s,
        p = 0;
      for (; f !== o; ) (p += n[f++]), (f = f % e);
      if (((o = (o + 1) % e), o === s && (s = (s + 1) % e), u - i < t)) return;
      const y = l && u - l;
      return y ? Math.round((p * 1e3) / y) : void 0;
    }
  );
}
function Ta(e, t) {
  let n = 0;
  const r = lg(50, 250);
  return (o) => {
    const s = o.loaded,
      i = o.lengthComputable ? o.total : void 0,
      a = s - n,
      c = r(a),
      u = s <= i;
    n = s;
    const l = {
      loaded: s,
      total: i,
      progress: i ? s / i : void 0,
      bytes: a,
      rate: c || void 0,
      estimated: c && i && u ? (i - s) / c : void 0,
      event: o,
    };
    (l[t ? "download" : "upload"] = !0), e(l);
  };
}
const ug = typeof XMLHttpRequest < "u",
  fg =
    ug &&
    function (e) {
      return new Promise(function (n, r) {
        let o = e.data;
        const s = It.from(e.headers).normalize(),
          i = e.responseType;
        let a;
        function c() {
          e.cancelToken && e.cancelToken.unsubscribe(a),
            e.signal && e.signal.removeEventListener("abort", a);
        }
        let u;
        E.isFormData(o) &&
          (Ct.isStandardBrowserEnv || Ct.isStandardBrowserWebWorkerEnv
            ? s.setContentType(!1)
            : s.getContentType(/^\s*multipart\/form-data/)
            ? E.isString((u = s.getContentType())) &&
              s.setContentType(u.replace(/^\s*(multipart\/form-data);+/, "$1"))
            : s.setContentType("multipart/form-data"));
        let l = new XMLHttpRequest();
        if (e.auth) {
          const g = e.auth.username || "",
            C = e.auth.password
              ? unescape(encodeURIComponent(e.auth.password))
              : "";
          s.set("Authorization", "Basic " + btoa(g + ":" + C));
        }
        const f = xl(e.baseURL, e.url);
        l.open(e.method.toUpperCase(), Al(f, e.params, e.paramsSerializer), !0),
          (l.timeout = e.timeout);
        function p() {
          if (!l) return;
          const g = It.from(
              "getAllResponseHeaders" in l && l.getAllResponseHeaders()
            ),
            N = {
              data:
                !i || i === "text" || i === "json"
                  ? l.responseText
                  : l.response,
              status: l.status,
              statusText: l.statusText,
              headers: g,
              config: e,
              request: l,
            };
          rg(
            function ($) {
              n($), c();
            },
            function ($) {
              r($), c();
            },
            N
          ),
            (l = null);
        }
        if (
          ("onloadend" in l
            ? (l.onloadend = p)
            : (l.onreadystatechange = function () {
                !l ||
                  l.readyState !== 4 ||
                  (l.status === 0 &&
                    !(l.responseURL && l.responseURL.indexOf("file:") === 0)) ||
                  setTimeout(p);
              }),
          (l.onabort = function () {
            l &&
              (r(new ce("Request aborted", ce.ECONNABORTED, e, l)), (l = null));
          }),
          (l.onerror = function () {
            r(new ce("Network Error", ce.ERR_NETWORK, e, l)), (l = null);
          }),
          (l.ontimeout = function () {
            let C = e.timeout
              ? "timeout of " + e.timeout + "ms exceeded"
              : "timeout exceeded";
            const N = e.transitional || kl;
            e.timeoutErrorMessage && (C = e.timeoutErrorMessage),
              r(
                new ce(
                  C,
                  N.clarifyTimeoutError ? ce.ETIMEDOUT : ce.ECONNABORTED,
                  e,
                  l
                )
              ),
              (l = null);
          }),
          Ct.isStandardBrowserEnv)
        ) {
          const g =
            (e.withCredentials || ag(f)) &&
            e.xsrfCookieName &&
            og.read(e.xsrfCookieName);
          g && s.set(e.xsrfHeaderName, g);
        }
        o === void 0 && s.setContentType(null),
          "setRequestHeader" in l &&
            E.forEach(s.toJSON(), function (C, N) {
              l.setRequestHeader(N, C);
            }),
          E.isUndefined(e.withCredentials) ||
            (l.withCredentials = !!e.withCredentials),
          i && i !== "json" && (l.responseType = e.responseType),
          typeof e.onDownloadProgress == "function" &&
            l.addEventListener("progress", Ta(e.onDownloadProgress, !0)),
          typeof e.onUploadProgress == "function" &&
            l.upload &&
            l.upload.addEventListener("progress", Ta(e.onUploadProgress)),
          (e.cancelToken || e.signal) &&
            ((a = (g) => {
              l &&
                (r(!g || g.type ? new Cr(null, e, l) : g),
                l.abort(),
                (l = null));
            }),
            e.cancelToken && e.cancelToken.subscribe(a),
            e.signal &&
              (e.signal.aborted ? a() : e.signal.addEventListener("abort", a)));
        const y = cg(f);
        if (y && Ct.protocols.indexOf(y) === -1) {
          r(new ce("Unsupported protocol " + y + ":", ce.ERR_BAD_REQUEST, e));
          return;
        }
        l.send(o || null);
      });
    },
  hs = { http: D_, xhr: fg };
E.forEach(hs, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {}
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const Oa = (e) => `- ${e}`,
  dg = (e) => E.isFunction(e) || e === null || e === !1,
  Rl = {
    getAdapter: (e) => {
      e = E.isArray(e) ? e : [e];
      const { length: t } = e;
      let n, r;
      const o = {};
      for (let s = 0; s < t; s++) {
        n = e[s];
        let i;
        if (
          ((r = n),
          !dg(n) && ((r = hs[(i = String(n)).toLowerCase()]), r === void 0))
        )
          throw new ce(`Unknown adapter '${i}'`);
        if (r) break;
        o[i || "#" + s] = r;
      }
      if (!r) {
        const s = Object.entries(o).map(
          ([a, c]) =>
            `adapter ${a} ` +
            (c === !1
              ? "is not supported by the environment"
              : "is not available in the build")
        );
        let i = t
          ? s.length > 1
            ? `since :
` +
              s.map(Oa).join(`
`)
            : " " + Oa(s[0])
          : "as no adapter specified";
        throw new ce(
          "There is no suitable adapter to dispatch the request " + i,
          "ERR_NOT_SUPPORT"
        );
      }
      return r;
    },
    adapters: hs,
  };
function Go(e) {
  if (
    (e.cancelToken && e.cancelToken.throwIfRequested(),
    e.signal && e.signal.aborted)
  )
    throw new Cr(null, e);
}
function Sa(e) {
  return (
    Go(e),
    (e.headers = It.from(e.headers)),
    (e.data = Wo.call(e, e.transformRequest)),
    ["post", "put", "patch"].indexOf(e.method) !== -1 &&
      e.headers.setContentType("application/x-www-form-urlencoded", !1),
    Rl.getAdapter(e.adapter || Xs.adapter)(e).then(
      function (r) {
        return (
          Go(e),
          (r.data = Wo.call(e, e.transformResponse, r)),
          (r.headers = It.from(r.headers)),
          r
        );
      },
      function (r) {
        return (
          Il(r) ||
            (Go(e),
            r &&
              r.response &&
              ((r.response.data = Wo.call(e, e.transformResponse, r.response)),
              (r.response.headers = It.from(r.response.headers)))),
          Promise.reject(r)
        );
      }
    )
  );
}
const Aa = (e) => (e instanceof It ? e.toJSON() : e);
function Mn(e, t) {
  t = t || {};
  const n = {};
  function r(u, l, f) {
    return E.isPlainObject(u) && E.isPlainObject(l)
      ? E.merge.call({ caseless: f }, u, l)
      : E.isPlainObject(l)
      ? E.merge({}, l)
      : E.isArray(l)
      ? l.slice()
      : l;
  }
  function o(u, l, f) {
    if (E.isUndefined(l)) {
      if (!E.isUndefined(u)) return r(void 0, u, f);
    } else return r(u, l, f);
  }
  function s(u, l) {
    if (!E.isUndefined(l)) return r(void 0, l);
  }
  function i(u, l) {
    if (E.isUndefined(l)) {
      if (!E.isUndefined(u)) return r(void 0, u);
    } else return r(void 0, l);
  }
  function a(u, l, f) {
    if (f in t) return r(u, l);
    if (f in e) return r(void 0, u);
  }
  const c = {
    url: s,
    method: s,
    data: s,
    baseURL: i,
    transformRequest: i,
    transformResponse: i,
    paramsSerializer: i,
    timeout: i,
    timeoutMessage: i,
    withCredentials: i,
    adapter: i,
    responseType: i,
    xsrfCookieName: i,
    xsrfHeaderName: i,
    onUploadProgress: i,
    onDownloadProgress: i,
    decompress: i,
    maxContentLength: i,
    maxBodyLength: i,
    beforeRedirect: i,
    transport: i,
    httpAgent: i,
    httpsAgent: i,
    cancelToken: i,
    socketPath: i,
    responseEncoding: i,
    validateStatus: a,
    headers: (u, l) => o(Aa(u), Aa(l), !0),
  };
  return (
    E.forEach(Object.keys(Object.assign({}, e, t)), function (l) {
      const f = c[l] || o,
        p = f(e[l], t[l], l);
      (E.isUndefined(p) && f !== a) || (n[l] = p);
    }),
    n
  );
}
const Nl = "1.5.1",
  Ys = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(
  (e, t) => {
    Ys[e] = function (r) {
      return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
    };
  }
);
const ka = {};
Ys.transitional = function (t, n, r) {
  function o(s, i) {
    return (
      "[Axios v" +
      Nl +
      "] Transitional option '" +
      s +
      "'" +
      i +
      (r ? ". " + r : "")
    );
  }
  return (s, i, a) => {
    if (t === !1)
      throw new ce(
        o(i, " has been removed" + (n ? " in " + n : "")),
        ce.ERR_DEPRECATED
      );
    return (
      n &&
        !ka[i] &&
        ((ka[i] = !0),
        console.warn(
          o(
            i,
            " has been deprecated since v" +
              n +
              " and will be removed in the near future"
          )
        )),
      t ? t(s, i, a) : !0
    );
  };
};
function pg(e, t, n) {
  if (typeof e != "object")
    throw new ce("options must be an object", ce.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let o = r.length;
  for (; o-- > 0; ) {
    const s = r[o],
      i = t[s];
    if (i) {
      const a = e[s],
        c = a === void 0 || i(a, s, e);
      if (c !== !0)
        throw new ce("option " + s + " must be " + c, ce.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0) throw new ce("Unknown option " + s, ce.ERR_BAD_OPTION);
  }
}
const ms = { assertOptions: pg, validators: Ys },
  Mt = ms.validators;
class eo {
  constructor(t) {
    (this.defaults = t),
      (this.interceptors = { request: new Ea(), response: new Ea() });
  }
  request(t, n) {
    typeof t == "string" ? ((n = n || {}), (n.url = t)) : (n = t || {}),
      (n = Mn(this.defaults, n));
    const { transitional: r, paramsSerializer: o, headers: s } = n;
    r !== void 0 &&
      ms.assertOptions(
        r,
        {
          silentJSONParsing: Mt.transitional(Mt.boolean),
          forcedJSONParsing: Mt.transitional(Mt.boolean),
          clarifyTimeoutError: Mt.transitional(Mt.boolean),
        },
        !1
      ),
      o != null &&
        (E.isFunction(o)
          ? (n.paramsSerializer = { serialize: o })
          : ms.assertOptions(
              o,
              { encode: Mt.function, serialize: Mt.function },
              !0
            )),
      (n.method = (n.method || this.defaults.method || "get").toLowerCase());
    let i = s && E.merge(s.common, s[n.method]);
    s &&
      E.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        (g) => {
          delete s[g];
        }
      ),
      (n.headers = It.concat(i, s));
    const a = [];
    let c = !0;
    this.interceptors.request.forEach(function (C) {
      (typeof C.runWhen == "function" && C.runWhen(n) === !1) ||
        ((c = c && C.synchronous), a.unshift(C.fulfilled, C.rejected));
    });
    const u = [];
    this.interceptors.response.forEach(function (C) {
      u.push(C.fulfilled, C.rejected);
    });
    let l,
      f = 0,
      p;
    if (!c) {
      const g = [Sa.bind(this), void 0];
      for (
        g.unshift.apply(g, a),
          g.push.apply(g, u),
          p = g.length,
          l = Promise.resolve(n);
        f < p;

      )
        l = l.then(g[f++], g[f++]);
      return l;
    }
    p = a.length;
    let y = n;
    for (f = 0; f < p; ) {
      const g = a[f++],
        C = a[f++];
      try {
        y = g(y);
      } catch (N) {
        C.call(this, N);
        break;
      }
    }
    try {
      l = Sa.call(this, y);
    } catch (g) {
      return Promise.reject(g);
    }
    for (f = 0, p = u.length; f < p; ) l = l.then(u[f++], u[f++]);
    return l;
  }
  getUri(t) {
    t = Mn(this.defaults, t);
    const n = xl(t.baseURL, t.url);
    return Al(n, t.params, t.paramsSerializer);
  }
}
E.forEach(["delete", "get", "head", "options"], function (t) {
  eo.prototype[t] = function (n, r) {
    return this.request(
      Mn(r || {}, { method: t, url: n, data: (r || {}).data })
    );
  };
});
E.forEach(["post", "put", "patch"], function (t) {
  function n(r) {
    return function (s, i, a) {
      return this.request(
        Mn(a || {}, {
          method: t,
          headers: r ? { "Content-Type": "multipart/form-data" } : {},
          url: s,
          data: i,
        })
      );
    };
  }
  (eo.prototype[t] = n()), (eo.prototype[t + "Form"] = n(!0));
});
const Vr = eo;
class Zs {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function (s) {
      n = s;
    });
    const r = this;
    this.promise.then((o) => {
      if (!r._listeners) return;
      let s = r._listeners.length;
      for (; s-- > 0; ) r._listeners[s](o);
      r._listeners = null;
    }),
      (this.promise.then = (o) => {
        let s;
        const i = new Promise((a) => {
          r.subscribe(a), (s = a);
        }).then(o);
        return (
          (i.cancel = function () {
            r.unsubscribe(s);
          }),
          i
        );
      }),
      t(function (s, i, a) {
        r.reason || ((r.reason = new Cr(s, i, a)), n(r.reason));
      });
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : (this._listeners = [t]);
  }
  unsubscribe(t) {
    if (!this._listeners) return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  static source() {
    let t;
    return {
      token: new Zs(function (o) {
        t = o;
      }),
      cancel: t,
    };
  }
}
const hg = Zs;
function mg(e) {
  return function (n) {
    return e.apply(null, n);
  };
}
function _g(e) {
  return E.isObject(e) && e.isAxiosError === !0;
}
const _s = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};
Object.entries(_s).forEach(([e, t]) => {
  _s[t] = e;
});
const gg = _s;
function Ll(e) {
  const t = new Vr(e),
    n = _l(Vr.prototype.request, t);
  return (
    E.extend(n, Vr.prototype, t, { allOwnKeys: !0 }),
    E.extend(n, t, null, { allOwnKeys: !0 }),
    (n.create = function (o) {
      return Ll(Mn(e, o));
    }),
    n
  );
}
const Ie = Ll(Xs);
Ie.Axios = Vr;
Ie.CanceledError = Cr;
Ie.CancelToken = hg;
Ie.isCancel = Il;
Ie.VERSION = Nl;
Ie.toFormData = Co;
Ie.AxiosError = ce;
Ie.Cancel = Ie.CanceledError;
Ie.all = function (t) {
  return Promise.all(t);
};
Ie.spread = mg;
Ie.isAxiosError = _g;
Ie.mergeConfig = Mn;
Ie.AxiosHeaders = It;
Ie.formToJSON = (e) => $l(E.isHTMLForm(e) ? new FormData(e) : e);
Ie.getAdapter = Rl.getAdapter;
Ie.HttpStatusCode = gg;
Ie.default = Ie;
const Ze = Ie;
function Fl() {
  const e = ae(null),
    t = Se(() => e.value.category),
    n = Se(() => e.value.colors),
    r = dn({ isLoading: !1, isFailed: !1 });
  return {
    product: e,
    category: t,
    colors: n,
    status: r,
    fetchProduct: (s) => {
      (r.isLoading = !0),
        (r.isFailed = !1),
        Ze.get(Ye + "/api/products/" + s)
          .then((i) => {
            const a = i.data;
            e.value = Object.assign(a, { image: a.preview.file.url });
          })
          .catch(() => (r.isFailed = !0))
          .then(() => (r.isLoading = !1));
    },
  };
}
const yg = Gt({
    props: { productId: { type: [Number, String], required: !0 } },
    components: {
      ProductColors: zs,
      ProductCounter: Ws,
      DataLoadingError: go,
      DataLoader: _n,
      DataProcessedSuccessfullyItem: ml,
    },
    setup(e) {
      const t = ho(),
        {
          product: n,
          category: r,
          colors: o,
          fetchProduct: s,
          status: i,
        } = Fl(),
        a = ae(""),
        c = ae(1),
        u = ae(!1),
        l = ae(!1),
        f = (y) => {
          c.value = y < 1 ? 1 : y;
        },
        p = () => {
          (u.value = !1),
            (l.value = !0),
            t
              .dispatch("addProductToCart", {
                productOfferId: n.value.id,
                colorId: a.value,
                quantity: c.value,
              })
              .then(() => {
                (u.value = !0),
                  (l.value = !1),
                  setTimeout(() => {
                    u.value = !1;
                  }, 2e3);
              });
        };
      return (
        it(
          () => e.productId,
          (y) => {
            y && s(y);
          },
          { immediate: !0 }
        ),
        {
          selectedColor: a,
          productQuantity: c,
          productData: n,
          productStatus: i,
          productAdded: u,
          productAddSending: l,
          product: n,
          category: r,
          colors: o,
          doUpdate: f,
          doAddToCart: p,
        }
      );
    },
  }),
  bg = (e) => (pn("data-v-e089bb8b"), (e = e()), hn(), e),
  vg = { key: 0, class: "product-data-loader" },
  Cg = { key: 1, class: "product-data-loader" },
  wg = { key: 2 },
  Eg = { class: "item" },
  Pg = { class: "item__pics pics" },
  Tg = { class: "pics__wrapper" },
  Og = ["src", "alt"],
  Sg = { class: "item__info" },
  Ag = { class: "item__code" },
  kg = { class: "item__title" },
  $g = { class: "item__form" },
  Ig = { class: "item__price" },
  xg = { class: "form__block" },
  Rg = bg(() => _("legend", { class: "form__legend" }, "Цвет:", -1)),
  Ng = { class: "item__row" },
  Lg = ["disabled"];
function Fg(e, t, n, r, o, s) {
  const i = ne("DataLoader"),
    a = ne("DataLoadingError"),
    c = ne("ProductColors"),
    u = ne("ProductCounter"),
    l = ne("DataProcessedSuccessfullyItem");
  return e.productStatus.isLoading
    ? (S(), x("div", vg, [j(i, { width: 200, height: 200 })]))
    : e.productStatus.isFailed
    ? (S(), x("div", Cg, [j(a, { "svg-height": 100, "svg-width": 100 })]))
    : (S(),
      x("div", wg, [
        _("section", Eg, [
          _("div", Pg, [
            _("div", Tg, [
              _(
                "img",
                {
                  width: "570",
                  height: "570",
                  src: e.product.image,
                  alt: e.product.title,
                },
                null,
                8,
                Og
              ),
            ]),
          ]),
          _("div", Sg, [
            _("span", Ag, "Артикул: " + Q(e.product.id), 1),
            _("h2", kg, Q(e.product.name), 1),
            _("div", $g, [
              _(
                "form",
                {
                  class: "form",
                  action: "#",
                  method: "POST",
                  onSubmit:
                    t[0] ||
                    (t[0] = Ge(
                      (...f) => e.doAddToCart && e.doAddToCart(...f),
                      ["prevent"]
                    )),
                },
                [
                  _("b", Ig, Q(e.product.price) + " ₽", 1),
                  _("fieldset", xg, [
                    Rg,
                    j(c, { colors: e.colors }, null, 8, ["colors"]),
                  ]),
                  _("div", Ng, [
                    j(
                      u,
                      {
                        count: e.productQuantity,
                        "onUpdate:count": e.doUpdate,
                      },
                      null,
                      8,
                      ["count", "onUpdate:count"]
                    ),
                    _(
                      "button",
                      {
                        class: "button button--primery",
                        type: "submit",
                        disabled: e.productAddSending,
                      },
                      " В корзину ",
                      8,
                      Lg
                    ),
                  ]),
                  e.productAddSending
                    ? (S(), Fe(i, { key: 0, width: 50, height: 50 }))
                    : Ae("", !0),
                  e.productAdded
                    ? (S(), Fe(l, { key: 1, width: 50, height: 50 }))
                    : Ae("", !0),
                ],
                32
              ),
            ]),
          ]),
        ]),
      ]));
}
const Dg = Pe(yg, [
    ["render", Fg],
    ["__scopeId", "data-v-e089bb8b"],
  ]),
  Mg = {
    props: { product: Object },
    components: {
      ProductColors: zs,
      BaseModal: pl,
      ProductQuickView: rd({
        loader: () => Dg,
        delay: 0,
        loadingComponent: () => br("div", "Loading..."),
      }),
    },
    setup(e) {
      var u, l, f, p, y;
      const t = ae(null),
        n = ae(
          (l = (u = e.product.offers) == null ? void 0 : u[0]) == null
            ? void 0
            : l.id
        ),
        r = ae(
          (y =
            (p = (f = e.product.colors) == null ? void 0 : f[0]) == null
              ? void 0
              : p.color) == null
            ? void 0
            : y.id
        ),
        o = Se(() => t.value !== null),
        s = Se(() => dl(e.product.price)),
        i = Se(() => e.product.colors);
      return {
        isQuickViewOpen: o,
        openQuickView: (g) => {
          t.value = g;
        },
        currentProductId: t,
        colors: i,
        doOfferChange: (g) => {
          var C, N;
          n.value = g
            ? (C = e.product.offers) == null
              ? void 0
              : C.find((I) => I.id === g)
            : (N = e.product.offers) == null
            ? void 0
            : N[0];
        },
        selectedProductOffer: n,
        selectedColorId: r,
        pricePretty: s,
      };
    },
  },
  jg = { class: "catalog__item" },
  Bg = ["src", "alt"],
  Ug = { class: "catalog__title" },
  Hg = { class: "catalog__price" },
  Vg = { key: 0, class: "sizes" },
  Kg = { class: "sizes__label" },
  qg = ["value", "onInput"],
  zg = { class: "sizes__value" };
function Wg(e, t, n, r, o, s) {
  const i = ne("router-link"),
    a = ne("ProductColors"),
    c = ne("ProductQuickView"),
    u = ne("BaseModal");
  return (
    S(),
    x(
      me,
      null,
      [
        _("li", jg, [
          j(
            i,
            {
              class: "catalog__pic",
              href: "#",
              to: { name: "product", params: { id: n.product.id } },
            },
            {
              default: ve(() => [
                _(
                  "img",
                  { src: n.product.image, alt: n.product.title },
                  null,
                  8,
                  Bg
                ),
              ]),
              _: 1,
            },
            8,
            ["to"]
          ),
          _("h3", Ug, Q(n.product.title), 1),
          _("span", Hg, Q(r.pricePretty) + " ₽ ", 1),
          j(
            a,
            {
              colors: r.colors,
              "selected-color-id": r.selectedColorId,
              "onUpdate:selectedColorId":
                t[0] || (t[0] = (l) => (r.selectedColorId = l)),
            },
            null,
            8,
            ["colors", "selected-color-id"]
          ),
          n.product.mainProp
            ? (S(),
              x("ul", Vg, [
                (S(!0),
                x(
                  me,
                  null,
                  He(n.product.offers, (l) => {
                    var f, p;
                    return (
                      S(),
                      x("li", { class: "sizes__item", key: l.id }, [
                        _("label", Kg, [
                          Kt(
                            _(
                              "input",
                              {
                                class: "sizes__radio sr-only",
                                type: "radio",
                                value: l.id,
                                "onUpdate:modelValue":
                                  t[1] ||
                                  (t[1] = (y) => (r.selectedProductOffer = y)),
                                onInput: (y) => r.doOfferChange(l.id),
                              },
                              null,
                              40,
                              qg
                            ),
                            [[Ms, r.selectedProductOffer]]
                          ),
                          _(
                            "span",
                            zg,
                            Q(
                              (p =
                                (f = l.propValues) == null ? void 0 : f[0]) ==
                                null
                                ? void 0
                                : p.value
                            ),
                            1
                          ),
                        ]),
                      ])
                    );
                  }),
                  128
                )),
              ]))
            : Ae("", !0),
        ]),
        j(
          u,
          {
            open: r.isQuickViewOpen,
            "onUpdate:open": t[2] || (t[2] = (l) => (r.isQuickViewOpen = l)),
          },
          {
            default: ve(() => [
              j(c, { "product-id": r.currentProductId }, null, 8, [
                "product-id",
              ]),
            ]),
            _: 1,
          },
          8,
          ["open"]
        ),
      ],
      64
    )
  );
}
const Gg = Pe(Mg, [["render", Wg]]),
  Qg = { props: ["products"], components: { ProductItem: Gg } },
  Jg = { class: "catalog__list" };
function Xg(e, t, n, r, o, s) {
  const i = ne("ProductItem");
  return (
    S(),
    x("ul", Jg, [
      (S(!0),
      x(
        me,
        null,
        He(
          n.products,
          (a) => (S(), Fe(i, { key: a.id, product: a }, null, 8, ["product"]))
        ),
        128
      )),
    ])
  );
}
const Yg = Pe(Qg, [["render", Xg]]),
  Zg = {
    props: ["modelValue", "count", "perPage"],
    computed: {
      page() {
        return this.modelValue;
      },
      pages() {
        return Math.ceil(this.count / this.perPage);
      },
    },
    methods: {
      paginate(e) {
        this.$emit("update:modelValue", e);
      },
    },
  },
  ey = { class: "catalog__pagination pagination" },
  ty = { class: "pagination__item" },
  ny = _(
    "svg",
    { width: "8", height: "14", fill: "currentColor" },
    [_("use", { "xlink:href": "#icon-arrow-left" })],
    -1
  ),
  ry = [ny],
  oy = ["onClick"],
  sy = { class: "pagination__item" },
  iy = _(
    "svg",
    { width: "8", height: "14", fill: "currentColor" },
    [_("use", { "xlink:href": "#icon-arrow-right" })],
    -1
  ),
  ay = [iy];
function cy(e, t, n, r, o, s) {
  return (
    S(),
    x("ul", ey, [
      _("li", ty, [
        _(
          "a",
          {
            href: "#",
            class: $t([
              "pagination__link pagination__link--arrow",
              { "pagination__link--disabled": s.page === 1 },
            ]),
            "aria-label": "Предыдущая страница",
            onClick:
              t[0] ||
              (t[0] = Ge(
                (i) => s.page !== 1 && s.paginate(s.page - 1),
                ["prevent"]
              )),
          },
          ry,
          2
        ),
      ]),
      (S(!0),
      x(
        me,
        null,
        He(
          s.pages,
          (i) => (
            S(),
            x("li", { class: "pagination__item", key: i }, [
              _(
                "a",
                {
                  href: "#",
                  class: $t([
                    "pagination__link",
                    { "pagination__link--current": i === s.page },
                  ]),
                  onClick: Ge((a) => s.paginate(i), ["prevent"]),
                },
                Q(i),
                11,
                oy
              ),
            ])
          )
        ),
        128
      )),
      _("li", sy, [
        _(
          "a",
          {
            href: "#",
            class: $t([
              "pagination__link pagination__link--arrow",
              { "pagination__link--disabled": s.page === s.pages },
            ]),
            "aria-label": "Следующая страница",
            onClick:
              t[1] ||
              (t[1] = Ge(
                (i) => s.page !== s.pages && s.paginate(s.page + 1),
                ["prevent"]
              )),
          },
          ay,
          2
        ),
      ]),
    ])
  );
}
const ly = Pe(Zg, [["render", cy]]);
var Lr =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
    ? window
    : typeof global < "u"
    ? global
    : typeof self < "u"
    ? self
    : {};
function uy(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var to = { exports: {} };
to.exports;
(function (e, t) {
  var n = 200,
    r = "__lodash_hash_undefined__",
    o = 9007199254740991,
    s = "[object Arguments]",
    i = "[object Array]",
    a = "[object Boolean]",
    c = "[object Date]",
    u = "[object Error]",
    l = "[object Function]",
    f = "[object GeneratorFunction]",
    p = "[object Map]",
    y = "[object Number]",
    g = "[object Object]",
    C = "[object Promise]",
    N = "[object RegExp]",
    I = "[object Set]",
    $ = "[object String]",
    J = "[object Symbol]",
    L = "[object WeakMap]",
    Y = "[object ArrayBuffer]",
    Z = "[object DataView]",
    ee = "[object Float32Array]",
    z = "[object Float64Array]",
    se = "[object Int8Array]",
    re = "[object Int16Array]",
    _e = "[object Int32Array]",
    U = "[object Uint8Array]",
    de = "[object Uint8ClampedArray]",
    Re = "[object Uint16Array]",
    et = "[object Uint32Array]",
    Te = /[\\^$.*+?()[\]{}|]/g,
    ge = /\w*$/,
    pe = /^\[object .+?Constructor\]$/,
    lt = /^(?:0|[1-9]\d*)$/,
    ie = {};
  (ie[s] =
    ie[i] =
    ie[Y] =
    ie[Z] =
    ie[a] =
    ie[c] =
    ie[ee] =
    ie[z] =
    ie[se] =
    ie[re] =
    ie[_e] =
    ie[p] =
    ie[y] =
    ie[g] =
    ie[N] =
    ie[I] =
    ie[$] =
    ie[J] =
    ie[U] =
    ie[de] =
    ie[Re] =
    ie[et] =
      !0),
    (ie[u] = ie[l] = ie[L] = !1);
  var tt = typeof Lr == "object" && Lr && Lr.Object === Object && Lr,
    je = typeof self == "object" && self && self.Object === Object && self,
    Be = tt || je || Function("return this")(),
    Pt = t && !t.nodeType && t,
    Qt = Pt && !0 && e && !e.nodeType && e,
    Ne = Qt && Qt.exports === Pt;
  function P(d, v) {
    return d.set(v[0], v[1]), d;
  }
  function B(d, v) {
    return d.add(v), d;
  }
  function D(d, v) {
    for (var T = -1, K = d ? d.length : 0; ++T < K && v(d[T], T, d) !== !1; );
    return d;
  }
  function q(d, v) {
    for (var T = -1, K = v.length, Le = d.length; ++T < K; ) d[Le + T] = v[T];
    return d;
  }
  function ue(d, v, T, K) {
    var Le = -1,
      Ke = d ? d.length : 0;
    for (K && Ke && (T = d[++Le]); ++Le < Ke; ) T = v(T, d[Le], Le, d);
    return T;
  }
  function h(d, v) {
    for (var T = -1, K = Array(d); ++T < d; ) K[T] = v(T);
    return K;
  }
  function m(d, v) {
    return d == null ? void 0 : d[v];
  }
  function b(d) {
    var v = !1;
    if (d != null && typeof d.toString != "function")
      try {
        v = !!(d + "");
      } catch {}
    return v;
  }
  function w(d) {
    var v = -1,
      T = Array(d.size);
    return (
      d.forEach(function (K, Le) {
        T[++v] = [Le, K];
      }),
      T
    );
  }
  function O(d, v) {
    return function (T) {
      return d(v(T));
    };
  }
  function A(d) {
    var v = -1,
      T = Array(d.size);
    return (
      d.forEach(function (K) {
        T[++v] = K;
      }),
      T
    );
  }
  var M = Array.prototype,
    R = Function.prototype,
    F = Object.prototype,
    k = Be["__core-js_shared__"],
    W = (function () {
      var d = /[^.]+$/.exec((k && k.keys && k.keys.IE_PROTO) || "");
      return d ? "Symbol(src)_1." + d : "";
    })(),
    H = R.toString,
    V = F.hasOwnProperty,
    X = F.toString,
    oe = RegExp(
      "^" +
        H.call(V)
          .replace(Te, "\\$&")
          .replace(
            /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
            "$1.*?"
          ) +
        "$"
    ),
    ye = Ne ? Be.Buffer : void 0,
    he = Be.Symbol,
    Oe = Be.Uint8Array,
    Xe = O(Object.getPrototypeOf, Object),
    Nt = Object.create,
    wr = F.propertyIsEnumerable,
    Jt = M.splice,
    qn = Object.getOwnPropertySymbols,
    Ve = ye ? ye.isBuffer : void 0,
    nt = O(Object.keys, Object),
    gn = vn(Be, "DataView"),
    zn = vn(Be, "Map"),
    Po = vn(Be, "Promise"),
    To = vn(Be, "Set"),
    Oo = vn(Be, "WeakMap"),
    Wn = vn(Object, "create"),
    Bl = Zt(gn),
    Ul = Zt(zn),
    Hl = Zt(Po),
    Vl = Zt(To),
    Kl = Zt(Oo),
    ti = he ? he.prototype : void 0,
    ni = ti ? ti.valueOf : void 0;
  function Xt(d) {
    var v = -1,
      T = d ? d.length : 0;
    for (this.clear(); ++v < T; ) {
      var K = d[v];
      this.set(K[0], K[1]);
    }
  }
  function ql() {
    this.__data__ = Wn ? Wn(null) : {};
  }
  function zl(d) {
    return this.has(d) && delete this.__data__[d];
  }
  function Wl(d) {
    var v = this.__data__;
    if (Wn) {
      var T = v[d];
      return T === r ? void 0 : T;
    }
    return V.call(v, d) ? v[d] : void 0;
  }
  function Gl(d) {
    var v = this.__data__;
    return Wn ? v[d] !== void 0 : V.call(v, d);
  }
  function Ql(d, v) {
    var T = this.__data__;
    return (T[d] = Wn && v === void 0 ? r : v), this;
  }
  (Xt.prototype.clear = ql),
    (Xt.prototype.delete = zl),
    (Xt.prototype.get = Wl),
    (Xt.prototype.has = Gl),
    (Xt.prototype.set = Ql);
  function Tt(d) {
    var v = -1,
      T = d ? d.length : 0;
    for (this.clear(); ++v < T; ) {
      var K = d[v];
      this.set(K[0], K[1]);
    }
  }
  function Jl() {
    this.__data__ = [];
  }
  function Xl(d) {
    var v = this.__data__,
      T = Er(v, d);
    if (T < 0) return !1;
    var K = v.length - 1;
    return T == K ? v.pop() : Jt.call(v, T, 1), !0;
  }
  function Yl(d) {
    var v = this.__data__,
      T = Er(v, d);
    return T < 0 ? void 0 : v[T][1];
  }
  function Zl(d) {
    return Er(this.__data__, d) > -1;
  }
  function eu(d, v) {
    var T = this.__data__,
      K = Er(T, d);
    return K < 0 ? T.push([d, v]) : (T[K][1] = v), this;
  }
  (Tt.prototype.clear = Jl),
    (Tt.prototype.delete = Xl),
    (Tt.prototype.get = Yl),
    (Tt.prototype.has = Zl),
    (Tt.prototype.set = eu);
  function yn(d) {
    var v = -1,
      T = d ? d.length : 0;
    for (this.clear(); ++v < T; ) {
      var K = d[v];
      this.set(K[0], K[1]);
    }
  }
  function tu() {
    this.__data__ = { hash: new Xt(), map: new (zn || Tt)(), string: new Xt() };
  }
  function nu(d) {
    return Pr(this, d).delete(d);
  }
  function ru(d) {
    return Pr(this, d).get(d);
  }
  function ou(d) {
    return Pr(this, d).has(d);
  }
  function su(d, v) {
    return Pr(this, d).set(d, v), this;
  }
  (yn.prototype.clear = tu),
    (yn.prototype.delete = nu),
    (yn.prototype.get = ru),
    (yn.prototype.has = ou),
    (yn.prototype.set = su);
  function bn(d) {
    this.__data__ = new Tt(d);
  }
  function iu() {
    this.__data__ = new Tt();
  }
  function au(d) {
    return this.__data__.delete(d);
  }
  function cu(d) {
    return this.__data__.get(d);
  }
  function lu(d) {
    return this.__data__.has(d);
  }
  function uu(d, v) {
    var T = this.__data__;
    if (T instanceof Tt) {
      var K = T.__data__;
      if (!zn || K.length < n - 1) return K.push([d, v]), this;
      T = this.__data__ = new yn(K);
    }
    return T.set(d, v), this;
  }
  (bn.prototype.clear = iu),
    (bn.prototype.delete = au),
    (bn.prototype.get = cu),
    (bn.prototype.has = lu),
    (bn.prototype.set = uu);
  function fu(d, v) {
    var T = ko(d) || Lu(d) ? h(d.length, String) : [],
      K = T.length,
      Le = !!K;
    for (var Ke in d)
      (v || V.call(d, Ke)) &&
        !(Le && (Ke == "length" || Iu(Ke, K))) &&
        T.push(Ke);
    return T;
  }
  function ri(d, v, T) {
    var K = d[v];
    (!(V.call(d, v) && ai(K, T)) || (T === void 0 && !(v in d))) && (d[v] = T);
  }
  function Er(d, v) {
    for (var T = d.length; T--; ) if (ai(d[T][0], v)) return T;
    return -1;
  }
  function du(d, v) {
    return d && oi(v, $o(v), d);
  }
  function So(d, v, T, K, Le, Ke, rt) {
    var ze;
    if ((K && (ze = Ke ? K(d, Le, Ke, rt) : K(d)), ze !== void 0)) return ze;
    if (!Tr(d)) return d;
    var ui = ko(d);
    if (ui) {
      if (((ze = Au(d)), !v)) return Tu(d, ze);
    } else {
      var Cn = Yt(d),
        fi = Cn == l || Cn == f;
      if (Du(d)) return yu(d, v);
      if (Cn == g || Cn == s || (fi && !Ke)) {
        if (b(d)) return Ke ? d : {};
        if (((ze = ku(fi ? {} : d)), !v)) return Ou(d, du(ze, d));
      } else {
        if (!ie[Cn]) return Ke ? d : {};
        ze = $u(d, Cn, So, v);
      }
    }
    rt || (rt = new bn());
    var di = rt.get(d);
    if (di) return di;
    if ((rt.set(d, ze), !ui)) var pi = T ? Su(d) : $o(d);
    return (
      D(pi || d, function (Io, Or) {
        pi && ((Or = Io), (Io = d[Or])), ri(ze, Or, So(Io, v, T, K, Or, d, rt));
      }),
      ze
    );
  }
  function pu(d) {
    return Tr(d) ? Nt(d) : {};
  }
  function hu(d, v, T) {
    var K = v(d);
    return ko(d) ? K : q(K, T(d));
  }
  function mu(d) {
    return X.call(d);
  }
  function _u(d) {
    if (!Tr(d) || Ru(d)) return !1;
    var v = li(d) || b(d) ? oe : pe;
    return v.test(Zt(d));
  }
  function gu(d) {
    if (!ii(d)) return nt(d);
    var v = [];
    for (var T in Object(d)) V.call(d, T) && T != "constructor" && v.push(T);
    return v;
  }
  function yu(d, v) {
    if (v) return d.slice();
    var T = new d.constructor(d.length);
    return d.copy(T), T;
  }
  function Ao(d) {
    var v = new d.constructor(d.byteLength);
    return new Oe(v).set(new Oe(d)), v;
  }
  function bu(d, v) {
    var T = v ? Ao(d.buffer) : d.buffer;
    return new d.constructor(T, d.byteOffset, d.byteLength);
  }
  function vu(d, v, T) {
    var K = v ? T(w(d), !0) : w(d);
    return ue(K, P, new d.constructor());
  }
  function Cu(d) {
    var v = new d.constructor(d.source, ge.exec(d));
    return (v.lastIndex = d.lastIndex), v;
  }
  function wu(d, v, T) {
    var K = v ? T(A(d), !0) : A(d);
    return ue(K, B, new d.constructor());
  }
  function Eu(d) {
    return ni ? Object(ni.call(d)) : {};
  }
  function Pu(d, v) {
    var T = v ? Ao(d.buffer) : d.buffer;
    return new d.constructor(T, d.byteOffset, d.length);
  }
  function Tu(d, v) {
    var T = -1,
      K = d.length;
    for (v || (v = Array(K)); ++T < K; ) v[T] = d[T];
    return v;
  }
  function oi(d, v, T, K) {
    T || (T = {});
    for (var Le = -1, Ke = v.length; ++Le < Ke; ) {
      var rt = v[Le],
        ze = K ? K(T[rt], d[rt], rt, T, d) : void 0;
      ri(T, rt, ze === void 0 ? d[rt] : ze);
    }
    return T;
  }
  function Ou(d, v) {
    return oi(d, si(d), v);
  }
  function Su(d) {
    return hu(d, $o, si);
  }
  function Pr(d, v) {
    var T = d.__data__;
    return xu(v) ? T[typeof v == "string" ? "string" : "hash"] : T.map;
  }
  function vn(d, v) {
    var T = m(d, v);
    return _u(T) ? T : void 0;
  }
  var si = qn ? O(qn, Object) : Bu,
    Yt = mu;
  ((gn && Yt(new gn(new ArrayBuffer(1))) != Z) ||
    (zn && Yt(new zn()) != p) ||
    (Po && Yt(Po.resolve()) != C) ||
    (To && Yt(new To()) != I) ||
    (Oo && Yt(new Oo()) != L)) &&
    (Yt = function (d) {
      var v = X.call(d),
        T = v == g ? d.constructor : void 0,
        K = T ? Zt(T) : void 0;
      if (K)
        switch (K) {
          case Bl:
            return Z;
          case Ul:
            return p;
          case Hl:
            return C;
          case Vl:
            return I;
          case Kl:
            return L;
        }
      return v;
    });
  function Au(d) {
    var v = d.length,
      T = d.constructor(v);
    return (
      v &&
        typeof d[0] == "string" &&
        V.call(d, "index") &&
        ((T.index = d.index), (T.input = d.input)),
      T
    );
  }
  function ku(d) {
    return typeof d.constructor == "function" && !ii(d) ? pu(Xe(d)) : {};
  }
  function $u(d, v, T, K) {
    var Le = d.constructor;
    switch (v) {
      case Y:
        return Ao(d);
      case a:
      case c:
        return new Le(+d);
      case Z:
        return bu(d, K);
      case ee:
      case z:
      case se:
      case re:
      case _e:
      case U:
      case de:
      case Re:
      case et:
        return Pu(d, K);
      case p:
        return vu(d, K, T);
      case y:
      case $:
        return new Le(d);
      case N:
        return Cu(d);
      case I:
        return wu(d, K, T);
      case J:
        return Eu(d);
    }
  }
  function Iu(d, v) {
    return (
      (v = v ?? o),
      !!v &&
        (typeof d == "number" || lt.test(d)) &&
        d > -1 &&
        d % 1 == 0 &&
        d < v
    );
  }
  function xu(d) {
    var v = typeof d;
    return v == "string" || v == "number" || v == "symbol" || v == "boolean"
      ? d !== "__proto__"
      : d === null;
  }
  function Ru(d) {
    return !!W && W in d;
  }
  function ii(d) {
    var v = d && d.constructor,
      T = (typeof v == "function" && v.prototype) || F;
    return d === T;
  }
  function Zt(d) {
    if (d != null) {
      try {
        return H.call(d);
      } catch {}
      try {
        return d + "";
      } catch {}
    }
    return "";
  }
  function Nu(d) {
    return So(d, !0, !0);
  }
  function ai(d, v) {
    return d === v || (d !== d && v !== v);
  }
  function Lu(d) {
    return (
      Fu(d) && V.call(d, "callee") && (!wr.call(d, "callee") || X.call(d) == s)
    );
  }
  var ko = Array.isArray;
  function ci(d) {
    return d != null && Mu(d.length) && !li(d);
  }
  function Fu(d) {
    return ju(d) && ci(d);
  }
  var Du = Ve || Uu;
  function li(d) {
    var v = Tr(d) ? X.call(d) : "";
    return v == l || v == f;
  }
  function Mu(d) {
    return typeof d == "number" && d > -1 && d % 1 == 0 && d <= o;
  }
  function Tr(d) {
    var v = typeof d;
    return !!d && (v == "object" || v == "function");
  }
  function ju(d) {
    return !!d && typeof d == "object";
  }
  function $o(d) {
    return ci(d) ? fu(d) : gu(d);
  }
  function Bu() {
    return [];
  }
  function Uu() {
    return !1;
  }
  e.exports = Nu;
})(to, to.exports);
var fy = to.exports;
const dy = uy(fy),
  py = Gt({
    components: { DataLoader: _n },
    props: { modelValue: String },
    setup(e, { emit: t }) {
      const n = ae(e.priceFrom || 0),
        r = ae(e.priceTo || 0),
        o = ae(e.categoryId || 0),
        s = ae(e.categoryProps || new Map()),
        i = ae(null),
        a = ae(null),
        c = ae(null),
        u = ae(!1),
        l = ae(!1),
        f = () => {
          t("update:priceFrom", n.value),
            t("update:priceTo", r.value),
            t("update:categoryId", o.value),
            t("update:categoryProps", s.value),
            (l.value = !0);
        },
        p = () => {
          t("update:priceFrom", 0),
            t("update:priceTo", 0),
            t("update:categoryId", 0),
            t("update:categoryProps", null),
            (n.value = 0),
            (r.value = 0),
            (o.value = 0),
            (s.value = new Map()),
            (l.value = !1);
        };
      Zf(() => {
        (n.value = e.priceFrom || 0),
          (r.value = e.priceTo || 0),
          (o.value = e.categoryId || 0),
          (s.value = e.categoryProps || new Map());
      }),
        yr(() => {
          y(), g();
        }),
        it(
          () => o.value,
          (L) => {
            C(L);
          }
        );
      const y = () => {
          Ze.get(Ye + "/api/productCategories").then((L) => {
            a.value = L.data;
          });
        },
        g = () => {
          Ze.get(Ye + "/api/colors").then((L) => {
            c.value = L.data;
          });
        },
        C = (L) => {
          (s.value = new Map()),
            L !== 0
              ? ((u.value = !0),
                setTimeout(() => {
                  Ze.get(Ye + "/api/productCategories/" + L).then((Y) => {
                    const Z = Y.data;
                    i.value = Z;
                  }),
                    (u.value = !1);
                }, 300))
              : (i.value = null);
        },
        N = Se(() => (c.value ? c.value.items : [])),
        I = Se(() => (a.value ? a.value.items : [])),
        $ = Se(() => (i.value ? i.value.productProps : null));
      return {
        colors: N,
        categories: I,
        categoryProps: $,
        currentPriceFrom: n,
        currentPriceTo: r,
        currentCategoryId: o,
        currentCategoryProps: s,
        categoryPropsLoading: u,
        addCategoryPropOption: (L, Y) => {
          if ((s.value || (s.value = new Map()), s.value.has(L))) {
            let Z = s.value.get(L);
            (Z = Z.includes(Y) ? Z.filter((ee) => ee !== Y) : [...Z, Y]),
              Z.length ? s.value.set(L, Z) : s.value.delete(L);
          } else s.value.set(L, [Y]);
          (s.value = dy(s.value)), console.log(s.value);
        },
        showResetButton: l,
        submit: f,
        reset: p,
      };
    },
  }),
  hy = { class: "filter" },
  my = _("h2", { class: "filter__title" }, "Фильтры", -1),
  _y = { class: "form__block" },
  gy = _("legend", { class: "form__legend" }, "Цена", -1),
  yy = { class: "form__label form__label--price" },
  by = _("span", { class: "form__value" }, "От", -1),
  vy = { class: "form__label form__label--price" },
  Cy = _("span", { class: "form__value" }, "До", -1),
  wy = { class: "form__block" },
  Ey = _("legend", { class: "form__legend" }, "Категория", -1),
  Py = { class: "form__label form__label--select" },
  Ty = _("option", { value: "0" }, "Все категории", -1),
  Oy = ["value"],
  Sy = { key: 0, class: "props-loader" },
  Ay = { key: 1 },
  ky = { class: "form__legend" },
  $y = { class: "check-list" },
  Iy = { class: "check-list__label" },
  xy = ["value", "onInput"],
  Ry = { class: "check-list__desc" },
  Ny = _(
    "button",
    { class: "filter__submit button button--primery", type: "submit" },
    "Применить",
    -1
  );
function Ly(e, t, n, r, o, s) {
  const i = ne("DataLoader");
  return (
    S(),
    x("aside", hy, [
      my,
      _(
        "form",
        Ac(e.$attrs, {
          class: "filter__form form",
          action: "#",
          method: "get",
          onSubmit:
            t[4] ||
            (t[4] = Ge((...a) => e.submit && e.submit(...a), ["prevent"])),
        }),
        [
          _("fieldset", _y, [
            gy,
            _("label", yy, [
              Kt(
                _(
                  "input",
                  {
                    class: "form__input",
                    type: "text",
                    name: "min-price",
                    "onUpdate:modelValue":
                      t[0] || (t[0] = (a) => (e.currentPriceFrom = a)),
                  },
                  null,
                  512
                ),
                [[Nn, e.currentPriceFrom, void 0, { number: !0 }]]
              ),
              by,
            ]),
            _("label", vy, [
              Kt(
                _(
                  "input",
                  {
                    class: "form__input",
                    type: "text",
                    name: "max-price",
                    "onUpdate:modelValue":
                      t[1] || (t[1] = (a) => (e.currentPriceTo = a)),
                  },
                  null,
                  512
                ),
                [[Nn, e.currentPriceTo, void 0, { number: !0 }]]
              ),
              Cy,
            ]),
          ]),
          _("fieldset", wy, [
            Ey,
            _("label", Py, [
              Kt(
                _(
                  "select",
                  {
                    class: "form__select",
                    name: "category",
                    "onUpdate:modelValue":
                      t[2] || (t[2] = (a) => (e.currentCategoryId = a)),
                  },
                  [
                    Ty,
                    (S(!0),
                    x(
                      me,
                      null,
                      He(
                        e.categories,
                        (a) => (
                          S(),
                          x(
                            "option",
                            { value: a.id, key: a.id },
                            Q(a.title),
                            9,
                            Oy
                          )
                        )
                      ),
                      128
                    )),
                  ],
                  512
                ),
                [[Mc, e.currentCategoryId, void 0, { number: !0 }]]
              ),
            ]),
          ]),
          e.categoryPropsLoading
            ? (S(), x("div", Sy, [j(i, { width: 70 })]))
            : e.categoryProps
            ? (S(),
              x("div", Ay, [
                (S(!0),
                x(
                  me,
                  null,
                  He(
                    e.categoryProps,
                    (a) => (
                      S(),
                      x("fieldset", { class: "form__block", key: a.id }, [
                        _("legend", ky, Q(a.title), 1),
                        _("ul", $y, [
                          (S(!0),
                          x(
                            me,
                            null,
                            He(
                              a.availableValues,
                              (c) => (
                                S(),
                                x(
                                  "li",
                                  { class: "check-list__item", key: c.value },
                                  [
                                    _("label", Iy, [
                                      _(
                                        "input",
                                        {
                                          class: "check-list__check sr-only",
                                          type: "checkbox",
                                          name: "volume",
                                          value: c.value,
                                          onInput: (u) =>
                                            e.addCategoryPropOption(
                                              a.code,
                                              u.target.value
                                            ),
                                        },
                                        null,
                                        40,
                                        xy
                                      ),
                                      _("span", Ry, [
                                        Ee(Q(c.value) + " ", 1),
                                        _(
                                          "span",
                                          null,
                                          "(" + Q(c.productsCount) + ")",
                                          1
                                        ),
                                      ]),
                                    ]),
                                  ]
                                )
                              )
                            ),
                            128
                          )),
                        ]),
                      ])
                    )
                  ),
                  128
                )),
              ]))
            : Ae("", !0),
          Ny,
          e.showResetButton
            ? (S(),
              x(
                "button",
                {
                  key: 2,
                  class: "filter__reset button button--second",
                  type: "button",
                  onClick:
                    t[3] ||
                    (t[3] = Ge(
                      (...a) => e.reset && e.reset(...a),
                      ["prevent"]
                    )),
                },
                " Сбросить "
              ))
            : Ae("", !0),
        ],
        16
      ),
    ])
  );
}
const Fy = Pe(py, [["render", Ly]]);
const Dy = {
    components: { ProductList: Yg, BasePagination: ly, ProductFilter: Fy },
    data() {
      return {
        filterPriceFrom: "",
        filterPriceTo: "",
        filterCategoryId: 0,
        filterCategoryProps: null,
        filterColorId: "",
        currentPage: 1,
        productsPerPage: null,
        productsPerPageValues: [6, 9, 12],
        productsData: null,
        productsLoading: !1,
        productsLoadingFailed: !1,
      };
    },
    computed: {
      products() {
        return this.productsData
          ? this.productsData.items.map((e) => ({
              ...e,
              image: e.preview.file.url,
            }))
          : [];
      },
      countProducts() {
        return this.productsData ? this.productsData.pagination.total : 0;
      },
    },
    watch: {
      productsPerPage() {
        this.loadProducts();
      },
      currentPage() {
        this.loadProducts();
      },
      filterPriceFrom() {
        this.loadProducts();
      },
      filterPriceTo() {
        this.loadProducts();
      },
      filterCategoryId() {
        this.loadProducts();
      },
      filterCategoryProps() {
        this.loadProducts();
      },
    },
    created() {
      (this.productsPerPage = +localStorage.getItem("productsPerPage")),
        this.productsPerPage ||
          this.productsPerPageChanged(this.productsPerPageValues[0]),
        this.loadProducts();
    },
    methods: {
      loadProducts() {
        var t;
        (this.productsLoading = !0), clearTimeout(this.loadProductsTimer);
        const e = { page: this.currentPage, limit: this.productsPerPage };
        +this.filterPriceFrom != 0 && (e.minPrice = this.filterPriceFrom),
          +this.filterPriceTo != 0 && (e.maxPrice = this.filterPriceTo),
          this.filterCategoryId !== 0 && (e.categoryId = this.filterCategoryId),
          (t = this.filterCategoryProps) != null &&
            t.size &&
            [...this.filterCategoryProps.keys()].forEach((n) => {
              e[`props[${n}]`] = this.filterCategoryProps.get(n);
            }),
          (this.loadProductsTimer = setTimeout(() => {
            Ze.get(`${Ye}/api/products`, { params: e })
              .then((n) => {
                this.productsData = n.data;
              })
              .catch(() => {
                this.productsLoadingFailed = !0;
              })
              .then(() => {
                this.productsLoading = !1;
              });
          }, 0));
      },
      productsPerPageChanged(e) {
        console.log(e),
          (this.currentPage = 1),
          (this.productsPerPage = +e),
          localStorage.setItem("productsPerPage", e);
      },
    },
  },
  Dl = (e) => (pn("data-v-0063f05e"), (e = e()), hn(), e),
  My = { class: "content container" },
  jy = { class: "content__top content__top--catalog" },
  By = Dl(() => _("h1", { class: "content__title" }, "Каталог", -1)),
  Uy = { class: "content__info" },
  Hy = { class: "colors" },
  Vy = Dl(() =>
    _("span", { class: "content__info" }, " Количество товаров: ", -1)
  ),
  Ky = { class: "colors__label" },
  qy = ["value", "onClick"],
  zy = { class: "content__catalog" },
  Wy = { class: "catalog" },
  Gy = { key: 0 },
  Qy = { key: 1 };
function Jy(e, t, n, r, o, s) {
  const i = ne("ProductFilter"),
    a = ne("ProductList"),
    c = ne("BasePagination");
  return (
    S(),
    x("main", My, [
      _("div", jy, [
        By,
        _("span", Uy, Q(s.countProducts) + " товара ", 1),
        _("ul", Hy, [
          Vy,
          (S(!0),
          x(
            me,
            null,
            He(
              o.productsPerPageValues,
              (u) => (
                S(),
                x(
                  "li",
                  {
                    class: $t([
                      "colors__item pagination__link--arrow main-page__products-per-page-value",
                      {
                        "main-page__products-per-page-value__selected":
                          u === o.productsPerPage,
                      },
                    ]),
                    key: "products-per-page-" + u,
                  },
                  [
                    _("label", Ky, [
                      _(
                        "input",
                        {
                          class: "colors__radio sr-only",
                          type: "radio",
                          value: u,
                          onClick: Ge(
                            (l) => s.productsPerPageChanged(l.target.value),
                            ["prevent"]
                          ),
                        },
                        null,
                        8,
                        qy
                      ),
                      Ee(Q(u), 1),
                    ]),
                  ],
                  2
                )
              )
            ),
            128
          )),
        ]),
      ]),
      _("div", zy, [
        j(
          i,
          {
            "price-from": o.filterPriceFrom,
            "onUpdate:priceFrom":
              t[0] || (t[0] = (u) => (o.filterPriceFrom = u)),
            "price-to": o.filterPriceTo,
            "onUpdate:priceTo": t[1] || (t[1] = (u) => (o.filterPriceTo = u)),
            "category-id": o.filterCategoryId,
            "onUpdate:categoryId":
              t[2] || (t[2] = (u) => (o.filterCategoryId = u)),
            "color-id": o.filterColorId,
            "onUpdate:colorId": t[3] || (t[3] = (u) => (o.filterColorId = u)),
            "category-props": o.filterCategoryProps,
            "onUpdate:categoryProps":
              t[4] || (t[4] = (u) => (o.filterCategoryProps = u)),
          },
          null,
          8,
          [
            "price-from",
            "price-to",
            "category-id",
            "color-id",
            "category-props",
          ]
        ),
        _("section", Wy, [
          o.productsLoading
            ? (S(), x("div", Gy, "Загрузка товаров..."))
            : Ae("", !0),
          o.productsLoadingFailed
            ? (S(),
              x("div", Qy, [
                Ee(" Произошла ошибка при загрузки товаров "),
                _(
                  "button",
                  {
                    onClick:
                      t[5] ||
                      (t[5] = Ge(
                        (...u) => s.loadProducts && s.loadProducts(...u),
                        ["prevent"]
                      )),
                  },
                  "Попробовать еще раз"
                ),
              ]))
            : Ae("", !0),
          j(a, { products: s.products }, null, 8, ["products"]),
          j(
            c,
            {
              modelValue: o.currentPage,
              "onUpdate:modelValue":
                t[6] || (t[6] = (u) => (o.currentPage = u)),
              count: s.countProducts,
              "per-page": o.productsPerPage,
            },
            null,
            8,
            ["modelValue", "count", "per-page"]
          ),
        ]),
      ]),
    ])
  );
}
const Xy = Pe(Dy, [
    ["render", Jy],
    ["__scopeId", "data-v-0063f05e"],
  ]),
  Yy = {};
function Zy(e, t, n, r, o, s) {
  return S(), x("h1", null, "Страница не найдена");
}
const e0 = Pe(Yy, [["render", Zy]]),
  t0 = [
    { id: 1, title: "Описание" },
    { id: 2, title: "Характеристики" },
  ];
const n0 = Gt({
    components: {
      BaseModal: pl,
      ProductColors: zs,
      ProductCounter: Ws,
      DataLoadingError: go,
      DataLoader: _n,
      DataProcessedSuccessfullyItem: ml,
    },
    setup() {
      var $, J, L, Y, Z;
      const e = Em(),
        t = ho(),
        {
          product: n,
          category: r,
          colors: o,
          status: s,
          fetchProduct: i,
        } = Fl(),
        a = ae(1),
        c = ae(!1),
        u = ae(!1),
        l = ae(!1),
        f = ae(!1),
        p = ae(1),
        y = ae(
          (J = ($ = n.offers) == null ? void 0 : $[0]) == null ? void 0 : J.id
        ),
        g = ae(
          (Z =
            (Y = (L = n.colors) == null ? void 0 : L[0]) == null
              ? void 0
              : Y.color) == null
            ? void 0
            : Z.id
        ),
        C = Se({
          get() {
            var ee;
            return (ee = n.value.offers) == null
              ? void 0
              : ee.find((z) => z.id === y.value);
          },
          set(ee) {
            y.value = ee;
          },
        }),
        N = (ee) => {
          a.value = ee < 1 ? 1 : ee;
        },
        I = () => {
          (c.value = !1),
            (u.value = !0),
            (l.value = !1),
            t
              .dispatch("addProductToCart", {
                productOfferId: y.value,
                colorId: g.value,
                quantity: a.value,
              })
              .catch((ee) => {
                l.value = !0;
              })
              .then(() => {
                (f.value = !0), (c.value = !0), (u.value = !1);
              });
        };
      return (
        i(e.params.id),
        it(
          () => n.value,
          (ee) => {
            var z, se, re, _e, U;
            ee &&
              ((y.value =
                (se = (z = ee.offers) == null ? void 0 : z[0]) == null
                  ? void 0
                  : se.id),
              (g.value =
                (U =
                  (_e = (re = ee.colors) == null ? void 0 : re[0]) == null
                    ? void 0
                    : _e.color) == null
                  ? void 0
                  : U.id));
          },
          { immediate: !0 }
        ),
        {
          productQuantity: a,
          productData: n,
          productStatus: s,
          productAdded: c,
          productAddSending: u,
          productAddError: l,
          isShowAddedMessage: f,
          selectedColorId: g,
          selectedOfferId: y,
          productOffer: C,
          product: n,
          category: r,
          colors: o,
          productTabs: t0,
          selectedTabId: p,
          doUpdate: N,
          doAddToCart: I,
        }
      );
    },
  }),
  r0 = { key: 0, class: "content container" },
  o0 = { key: 1, class: "content container" },
  s0 = { key: 2, class: "content container" },
  i0 = { class: "content__top" },
  a0 = { class: "breadcrumbs" },
  c0 = { class: "breadcrumbs__item" },
  l0 = { class: "breadcrumbs__item" },
  u0 = { class: "breadcrumbs__item" },
  f0 = { class: "breadcrumbs__link" },
  d0 = { class: "item" },
  p0 = { class: "item__pics pics" },
  h0 = { class: "pics__wrapper" },
  m0 = ["src", "alt"],
  _0 = { class: "item__info" },
  g0 = { class: "item__code" },
  y0 = { class: "item__title" },
  b0 = { class: "item__form" },
  v0 = { class: "item__price" },
  C0 = { class: "form__block" },
  w0 = _("legend", { class: "form__legend" }, "Цвет:", -1),
  E0 = { class: "form__block" },
  P0 = { key: 0, class: "form__legend" },
  T0 = { key: 1, class: "sizes" },
  O0 = { class: "sizes__label" },
  S0 = ["value"],
  A0 = { class: "sizes__value" },
  k0 = { class: "item__row" },
  $0 = ["disabled"],
  I0 = { class: "item__desc" },
  x0 = { class: "tabs" },
  R0 = ["onClick"],
  N0 = { class: "item__content" },
  L0 = { key: 0 },
  F0 = { key: 0 },
  D0 = { key: 1 },
  M0 = { key: 1 },
  j0 = { key: 0 },
  B0 = { style: { "font-weight": "600" } },
  U0 = { key: 1 };
function H0(e, t, n, r, o, s) {
  var p, y;
  const i = ne("router-link"),
    a = ne("ProductColors"),
    c = ne("ProductCounter"),
    u = ne("DataLoader"),
    l = ne("DataLoadingError"),
    f = ne("DataProcessedSuccessfullyItem");
  return e.productStatus.isLoading
    ? (S(), x("main", r0, "Загрузка товара..."))
    : e.productStatus.isFailed
    ? (S(), x("main", o0, " Не удалось загрузить товар "))
    : (S(),
      x("main", s0, [
        _("div", i0, [
          _("ul", a0, [
            _("li", c0, [
              j(
                i,
                { class: "breadcrumbs__link", href: "#", to: { name: "main" } },
                { default: ve(() => [Ee(" Каталог ")]), _: 1 }
              ),
            ]),
            _("li", l0, [
              j(
                i,
                { class: "breadcrumbs__link", href: "#", to: { name: "main" } },
                { default: ve(() => [Ee(Q(e.category.title), 1)]), _: 1 }
              ),
            ]),
            _("li", u0, [_("a", f0, Q(e.product.title), 1)]),
          ]),
        ]),
        _("section", d0, [
          _("div", p0, [
            _("div", h0, [
              _(
                "img",
                {
                  width: "570",
                  height: "570",
                  src: e.product.image,
                  alt: e.product.title,
                },
                null,
                8,
                m0
              ),
            ]),
          ]),
          _("div", _0, [
            _("span", g0, "Артикул: " + Q(e.product.id), 1),
            _("h2", y0, Q(e.productOffer.title || e.product.name), 1),
            _("div", b0, [
              _(
                "form",
                {
                  class: "form",
                  action: "#",
                  method: "POST",
                  onSubmit:
                    t[2] ||
                    (t[2] = Ge(
                      (...g) => e.doAddToCart && e.doAddToCart(...g),
                      ["prevent"]
                    )),
                },
                [
                  _(
                    "b",
                    v0,
                    Q(
                      e.$filters.numberFormat(
                        e.productOffer.price || e.product.price
                      )
                    ) + " ₽ ",
                    1
                  ),
                  _("fieldset", C0, [
                    w0,
                    j(
                      a,
                      {
                        colors: e.colors,
                        "selected-color-id": e.selectedColorId,
                        "onUpdate:selectedColorId":
                          t[0] || (t[0] = (g) => (e.selectedColorId = g)),
                      },
                      null,
                      8,
                      ["colors", "selected-color-id"]
                    ),
                  ]),
                  _("fieldset", E0, [
                    e.product.mainProp
                      ? (S(),
                        x("legend", P0, Q(e.product.mainProp.title) + ": ", 1))
                      : Ae("", !0),
                    e.product.mainProp
                      ? (S(),
                        x("ul", T0, [
                          (S(!0),
                          x(
                            me,
                            null,
                            He(e.product.offers, (g) => {
                              var C, N;
                              return (
                                S(),
                                x("li", { class: "sizes__item", key: g.id }, [
                                  _("label", O0, [
                                    Kt(
                                      _(
                                        "input",
                                        {
                                          class: "sizes__radio sr-only",
                                          type: "radio",
                                          value: g.id,
                                          "onUpdate:modelValue":
                                            t[1] ||
                                            (t[1] = (I) =>
                                              (e.selectedOfferId = I)),
                                        },
                                        null,
                                        8,
                                        S0
                                      ),
                                      [[Ms, e.selectedOfferId]]
                                    ),
                                    _(
                                      "span",
                                      A0,
                                      Q(
                                        (N =
                                          (C = g.propValues) == null
                                            ? void 0
                                            : C[0]) == null
                                          ? void 0
                                          : N.value
                                      ),
                                      1
                                    ),
                                  ]),
                                ])
                              );
                            }),
                            128
                          )),
                        ]))
                      : Ae("", !0),
                  ]),
                  _("div", k0, [
                    j(
                      c,
                      {
                        count: e.productQuantity,
                        "onUpdate:count": e.doUpdate,
                      },
                      null,
                      8,
                      ["count", "onUpdate:count"]
                    ),
                    _(
                      "button",
                      {
                        class: "button button--primery",
                        type: "submit",
                        disabled: e.productAddSending,
                      },
                      " В корзину ",
                      8,
                      $0
                    ),
                    j(
                      pt,
                      { name: "fade", mode: "out-in" },
                      {
                        default: ve(() => [
                          e.productAddSending
                            ? (S(), Fe(u, { key: 0, width: 50, height: 50 }))
                            : e.productAddError
                            ? (S(),
                              Fe(l, {
                                key: 1,
                                "svg-color": "red",
                                "no-message": !0,
                                "svg-height": 50,
                                "svg-width": 50,
                              }))
                            : e.productAdded
                            ? (S(), Fe(f, { key: 2, width: 50, height: 50 }))
                            : Ae("", !0),
                        ]),
                        _: 1,
                      }
                    ),
                  ]),
                ],
                32
              ),
            ]),
          ]),
          _("div", I0, [
            _("ul", x0, [
              (S(!0),
              x(
                me,
                null,
                He(
                  e.productTabs,
                  (g) => (
                    S(),
                    x("li", { class: "tabs__item", key: g.id }, [
                      _(
                        "a",
                        {
                          href: "#",
                          class: $t([
                            "tabs__link",
                            { "tabs__link--current": g.id === e.selectedTabId },
                          ]),
                          onClick: Ge(
                            (C) => (e.selectedTabId = g.id),
                            ["prevent"]
                          ),
                        },
                        Q(g.title),
                        11,
                        R0
                      ),
                    ])
                  )
                ),
                128
              )),
            ]),
            _("div", N0, [
              e.selectedTabId === 1
                ? (S(),
                  x("p", L0, [
                    (p = e.product.content) != null && p.length
                      ? (S(), x("span", F0, Q(e.product.content), 1))
                      : (S(),
                        x(
                          "span",
                          D0,
                          "К сожалению, описания к данному товару нет"
                        )),
                  ]))
                : Ae("", !0),
              e.selectedTabId === 2
                ? (S(),
                  x("div", M0, [
                    (y = e.product.specifications) != null && y.length
                      ? (S(),
                        x("div", j0, [
                          (S(!0),
                          x(
                            me,
                            null,
                            He(
                              e.product.specifications,
                              (g) => (
                                S(),
                                x("p", { key: g.id }, [
                                  _("span", B0, Q(g.title), 1),
                                  Ee(": " + Q(g.value), 1),
                                ])
                              )
                            ),
                            128
                          )),
                        ]))
                      : (S(),
                        x(
                          "span",
                          U0,
                          "К сожалению, характеристик к данному товару нет"
                        )),
                  ]))
                : Ae("", !0),
            ]),
          ]),
        ]),
      ]));
}
const V0 = Pe(n0, [["render", H0]]),
  K0 = {
    name: "CartItem",
    components: { ProductCounter: Ws },
    props: ["item"],
    setup(e) {
      const t = ho(),
        n = dn({ productQuantity: e.item.quantity }),
        r = dl(n.productQuantity * e.item.price),
        o = (i) => {
          i > 0 &&
            t.dispatch("updateCartProductQuantity", {
              basketItemId: e.item.id,
              quantity: i,
            });
        },
        s = (i) => {
          t.dispatch("deleteProductFromCart", { basketItemId: i });
        };
      return {
        ...Ff(n),
        totalPricePretty: r,
        updateProductQuantity: o,
        deleteProduct: s,
      };
    },
  },
  q0 = { class: "cart__item product" },
  z0 = { class: "product__pic" },
  W0 = ["src", "alt"],
  G0 = { class: "product__title" },
  Q0 = { key: 0, class: "product__info--color" },
  J0 = { class: "product__code" },
  X0 = { class: "product__price" },
  Y0 = _(
    "svg",
    { width: "20", height: "20", fill: "currentColor" },
    [_("use", { "xlink:href": "#icon-close" })],
    -1
  ),
  Z0 = [Y0];
function eb(e, t, n, r, o, s) {
  const i = ne("router-link"),
    a = ne("ProductCounter");
  return (
    S(),
    x("li", q0, [
      _("div", z0, [
        j(
          i,
          { to: { name: "product", params: { id: n.item.id } } },
          {
            default: ve(() => [
              _(
                "img",
                {
                  src: n.item.productOffer.product.preview.file.url,
                  width: "120",
                  height: "120",
                  alt: n.item.productOffer.title,
                },
                null,
                8,
                W0
              ),
            ]),
            _: 1,
          },
          8,
          ["to"]
        ),
      ]),
      j(
        i,
        { to: { name: "product", params: { id: n.item.id } } },
        {
          default: ve(() => [_("h3", G0, Q(n.item.productOffer.title), 1)]),
          _: 1,
        },
        8,
        ["to"]
      ),
      n.item.color
        ? (S(),
          x("p", Q0, [
            Ee(" Цвет: "),
            _("span", null, [
              _(
                "i",
                { style: fn({ "background-color": n.item.color.color.code }) },
                null,
                4
              ),
              Ee(Q(n.item.color.color.title), 1),
            ]),
          ]))
        : Ae("", !0),
      _("span", J0, " Артикул: " + Q(n.item.id), 1),
      j(
        a,
        { count: e.productQuantity, "onUpdate:count": r.updateProductQuantity },
        null,
        8,
        ["count", "onUpdate:count"]
      ),
      _("b", X0, Q(r.totalPricePretty || "") + " ₽ ", 1),
      _(
        "button",
        {
          class: "product__del button-del",
          type: "button",
          "aria-label": "Удалить товар из корзины",
          onClick:
            t[0] || (t[0] = Ge((c) => r.deleteProduct(n.item.id), ["prevent"])),
        },
        Z0
      ),
    ])
  );
}
const tb = Pe(K0, [["render", eb]]),
  nb = Gt({
    name: "CartPage",
    components: { CartItem: tb, DataLoader: _n, DataLoadingError: go },
    computed: {
      ...Hs({
        products: "cartDetailsProducts",
        totalPrice: "cartTotalPrice",
        countProducts: "cartCountProducts",
      }),
    },
  }),
  rb = { key: 0, class: "content container cart-data-loader" },
  ob = { key: 1, class: "content container cart-data-loader" },
  sb = { key: 2, class: "content container" },
  ib = { class: "content__top" },
  ab = { class: "breadcrumbs" },
  cb = { class: "breadcrumbs__item" },
  lb = _(
    "li",
    { class: "breadcrumbs__item" },
    [_("a", { class: "breadcrumbs__link" }, " Корзина ")],
    -1
  ),
  ub = _("h1", { class: "content__title" }, "Корзина", -1),
  fb = { class: "content__info" },
  db = { class: "cart" },
  pb = { class: "cart__form form", action: "#", method: "POST" },
  hb = { key: 0, class: "cart__field" },
  mb = { key: 1, class: "cart__field" },
  _b = { class: "cart__block" },
  gb = _(
    "p",
    { class: "cart__desc" },
    "Мы посчитаем стоимость доставки на следующем этапе",
    -1
  ),
  yb = { class: "cart__price" },
  bb = ["onClick", "disabled"];
function vb(e, t, n, r, o, s) {
  const i = ne("DataLoader"),
    a = ne("DataLoadingError"),
    c = ne("router-link"),
    u = ne("ProductsEmptyList"),
    l = ne("CartItem");
  return (
    S(),
    Fe(
      pt,
      { name: "fade", mode: "out-in" },
      {
        default: ve(() => [
          e.cartLoading
            ? (S(), x("main", rb, [j(i, { width: 200, height: 200 })]))
            : e.cartLoadingFailed
            ? (S(),
              x("main", ob, [j(a, { "svg-height": 100, "svg-width": 100 })]))
            : (S(),
              x("main", sb, [
                _("div", ib, [
                  _("ul", ab, [
                    _("li", cb, [
                      j(
                        c,
                        { class: "breadcrumbs__link", to: { name: "main" } },
                        { default: ve(() => [Ee(" Каталог ")]), _: 1 }
                      ),
                    ]),
                    lb,
                  ]),
                  ub,
                  _("span", fb, " Товаров в корзине: " + Q(e.countProducts), 1),
                ]),
                _("section", db, [
                  _("form", pb, [
                    j(
                      pt,
                      { name: "fade", mode: "out-in" },
                      {
                        default: ve(() => [
                          e.products.length === 0
                            ? (S(),
                              x("div", hb, [
                                j(u, null, {
                                  default: ve(() => [Ee("Корзина пуста")]),
                                  _: 1,
                                }),
                              ]))
                            : (S(),
                              x("div", mb, [
                                j(
                                  _p,
                                  {
                                    tag: "ul",
                                    name: "fade-group",
                                    mode: "out-in",
                                  },
                                  {
                                    default: ve(() => [
                                      (S(!0),
                                      x(
                                        me,
                                        null,
                                        He(
                                          e.products,
                                          (f) => (
                                            S(),
                                            Fe(
                                              l,
                                              { key: f.id, item: f },
                                              null,
                                              8,
                                              ["item"]
                                            )
                                          )
                                        ),
                                        128
                                      )),
                                    ]),
                                    _: 1,
                                  }
                                ),
                              ])),
                        ]),
                        _: 1,
                      }
                    ),
                    _("div", _b, [
                      gb,
                      _("p", yb, [
                        Ee(" Итого: "),
                        _(
                          "span",
                          null,
                          Q(e.$filters.numberFormat(e.totalPrice)) + " ₽",
                          1
                        ),
                      ]),
                      j(
                        c,
                        { to: { name: "order" }, custom: "" },
                        {
                          default: ve(({ navigate: f }) => [
                            _(
                              "button",
                              {
                                class: "cart__button button button--primery",
                                type: "button",
                                onClick: f,
                                disabled: !e.totalPrice,
                              },
                              " Оформить заказ ",
                              8,
                              bb
                            ),
                          ]),
                          _: 1,
                        }
                      ),
                    ]),
                  ]),
                ]),
              ])),
        ]),
        _: 1,
      }
    )
  );
}
const Cb = Pe(nb, [["render", vb]]),
  wb = { props: ["title", "error"] },
  Eb = { class: "form__label" },
  Pb = { class: "form__value" },
  Tb = { key: 0, class: "form__error" };
function Ob(e, t, n, r, o, s) {
  return (
    S(),
    x("label", Eb, [
      mc(e.$slots, "default"),
      _("span", Pb, Q(n.title), 1),
      n.error ? (S(), x("span", Tb, Q(n.error), 1)) : Ae("", !0),
    ])
  );
}
const Sb = Pe(wb, [["render", Ob]]),
  Ml = {
    name: "BaseFormText",
    props: ["title", "error", "placeholder", "modelValue"],
    computed: {
      dataValue: {
        get() {
          return this.value;
        },
        set(e) {
          this.$emit("update:modelValue", e);
        },
      },
    },
    components: { BaseFormField: Sb },
  },
  Ab = { props: { type: { default: "text" } }, mixins: [Ml] },
  kb = ["type", "placeholder"];
function $b(e, t, n, r, o, s) {
  const i = ne("BaseFormField");
  return (
    S(),
    Fe(
      i,
      { title: e.title, error: e.error },
      {
        default: ve(() => [
          Kt(
            _(
              "input",
              {
                class: "form__input",
                "onUpdate:modelValue":
                  t[0] || (t[0] = (a) => (e.dataValue = a)),
                type: n.type,
                name: "name",
                placeholder: e.placeholder,
              },
              null,
              8,
              kb
            ),
            [[Ep, e.dataValue]]
          ),
        ]),
        _: 1,
      },
      8,
      ["title", "error"]
    )
  );
}
const Ib = Pe(Ab, [["render", $b]]),
  xb = { mixins: [Ml] },
  Rb = ["placeholder"];
function Nb(e, t, n, r, o, s) {
  const i = ne("BaseFormField");
  return (
    S(),
    Fe(
      i,
      { title: e.title, error: e.error },
      {
        default: ve(() => [
          Kt(
            _(
              "textarea",
              {
                class: "form__input form__input--area",
                "onUpdate:modelValue":
                  t[0] || (t[0] = (a) => (e.dataValue = a)),
                name: "comments",
                placeholder: e.placeholder,
              },
              null,
              8,
              Rb
            ),
            [[Nn, e.dataValue]]
          ),
        ]),
        _: 1,
      },
      8,
      ["title", "error"]
    )
  );
}
const Lb = Pe(xb, [["render", Nb]]);
const Fb = {
    name: "OrderOptionsBlock",
    components: { DataLoader: _n },
    props: ["title", "items", "modelValue"],
  },
  Db = { class: "order-options-block" },
  Mb = { key: 1 },
  jb = { class: "cart__title" },
  Bb = { class: "cart__options options" },
  Ub = { class: "options__label" },
  Hb = ["name", "value", "checked"],
  Vb = { class: "options__value" },
  Kb = { key: 0 };
function qb(e, t, n, r, o, s) {
  const i = ne("DataLoader");
  return (
    S(),
    x("div", Db, [
      j(
        pt,
        { name: "fade", mode: "out-in" },
        {
          default: ve(() => [
            n.items
              ? (S(),
                x("div", Mb, [
                  _("h3", jb, Q(n.title), 1),
                  _("ul", Bb, [
                    (S(!0),
                    x(
                      me,
                      null,
                      He(
                        n.items,
                        (a) => (
                          S(),
                          x(
                            "li",
                            {
                              key: n.title + "-" + a.id,
                              class: "options__item",
                            },
                            [
                              _("label", Ub, [
                                _(
                                  "input",
                                  {
                                    class: "options__radio sr-only",
                                    type: "radio",
                                    name: n.title,
                                    value: a.id,
                                    onInput:
                                      t[0] ||
                                      (t[0] = (c) =>
                                        e.$emit(
                                          "update:modelValue",
                                          c.target.value
                                        )),
                                    checked: n.modelValue === a.id,
                                  },
                                  null,
                                  40,
                                  Hb
                                ),
                                _("span", Vb, [
                                  Ee(Q(a.title) + " ", 1),
                                  a.highlightedValue
                                    ? (S(),
                                      x("b", Kb, Q(a.highlightedValue), 1))
                                    : Ae("", !0),
                                ]),
                              ]),
                            ]
                          )
                        )
                      ),
                      128
                    )),
                  ]),
                ]))
              : (S(), Fe(i, { key: 0, width: "50", height: "50" })),
          ]),
          _: 1,
        }
      ),
    ])
  );
}
const zb = Pe(Fb, [
  ["render", qb],
  ["__scopeId", "data-v-6634dafd"],
]);
const Wb = {
    name: "OrderPage",
    components: {
      BaseFormText: Ib,
      BaseFormTextarea: Lb,
      DataLoader: _n,
      OrderOptionsBlock: zb,
    },
    data() {
      return {
        deliveryItems: null,
        payItems: null,
        formData: {},
        formError: {},
        formErrorMessage: null,
        formSending: !1,
      };
    },
    created() {
      Ze.get(`${Ye}/api/deliveries`).then((e) => {
        (this.deliveryItems = e.data.map((t) => ({
          ...t,
          highlightedValue: t.price === "0" ? "бесплатно" : `${t.price} ₽`,
        }))),
          this.deliveryChanged(this.deliveryItems[0].id);
      });
    },
    methods: {
      order() {
        (this.formSending = !0),
          (this.formErrorMessage = null),
          console.log(this.formData),
          Ze.post(
            `${Ye}/api/orders`,
            { ...this.formData },
            { params: { userAccessKey: this.$store.state.userAccessKey } }
          )
            .then((e) => {
              this.$store.commit("resetCart"),
                this.$store.commit("updateOrderInfo", e.data),
                this.$router.push({
                  name: "orderInfo",
                  params: { id: e.data.id },
                });
            })
            .catch((e) => {
              (this.formError = e.response.data.error.request || {}),
                (this.formErrorMessage = e.response.data.error.message);
            })
            .finally(() => {
              this.formSending = !1;
            });
      },
      deliveryChanged(e) {
        (this.payItems = null),
          (this.formData.deliveryTypeId = e),
          Ze.get(`${Ye}/api/payments`, { params: { deliveryTypeId: e } }).then(
            (t) => {
              (this.payItems = t.data),
                (this.formData.paymentTypeId = this.payItems[0].id);
            }
          );
      },
    },
    computed: {
      ...Hs({ cartItems: "cartDetailsProducts", totalPrice: "cartTotalPrice" }),
      totalOffersQuantity() {
        var e;
        return (e = this.cartItems) == null
          ? void 0
          : e.reduce((t, n) => n.quantity + t, 0);
      },
    },
  },
  ei = (e) => (pn("data-v-10e8509f"), (e = e()), hn(), e),
  Gb = { class: "content container" },
  Qb = { class: "content__top" },
  Jb = { class: "breadcrumbs" },
  Xb = { class: "breadcrumbs__item" },
  Yb = { class: "breadcrumbs__item" },
  Zb = ei(() =>
    _(
      "li",
      { class: "breadcrumbs__item" },
      [_("a", { class: "breadcrumbs__link" }, "Оформление заказа")],
      -1
    )
  ),
  ev = ei(() => _("h1", { class: "content__title" }, "Оформление заказа", -1)),
  tv = { class: "cart" },
  nv = { class: "cart__field" },
  rv = { class: "cart__data" },
  ov = { class: "cart__options" },
  sv = { class: "cart__block" },
  iv = { key: 0, class: "cart__orders" },
  av = { key: 0, class: "cart__total" },
  cv = { key: 0, class: "order-sending" },
  lv = ["disabled"],
  uv = { key: 0, class: "cart__error form__error-block" },
  fv = ei(() => _("h4", null, "Заявка не отправлена!", -1));
function dv(e, t, n, r, o, s) {
  const i = ne("router-link"),
    a = ne("BaseFormText"),
    c = ne("BaseFormTextarea"),
    u = ne("OrderOptionsBlock"),
    l = ne("DataLoader");
  return (
    S(),
    x("main", Gb, [
      _("div", Qb, [
        _("ul", Jb, [
          _("li", Xb, [
            j(
              i,
              { class: "breadcrumbs__link", to: { name: "main" } },
              { default: ve(() => [Ee(" Каталог ")]), _: 1 }
            ),
          ]),
          _("li", Yb, [
            j(
              i,
              { class: "breadcrumbs__link", to: { name: "cart" } },
              { default: ve(() => [Ee(" Корзина ")]), _: 1 }
            ),
          ]),
          Zb,
        ]),
        ev,
      ]),
      _("section", tv, [
        _(
          "form",
          {
            class: "cart__form form",
            action: "#",
            method: "POST",
            onSubmit:
              t[7] ||
              (t[7] = Ge((...f) => s.order && s.order(...f), ["prevent"])),
          },
          [
            _("div", nv, [
              _("div", rv, [
                j(
                  a,
                  {
                    title: "ФИО",
                    placeholder: "Введите ваше полное имя",
                    modelValue: o.formData.name,
                    "onUpdate:modelValue":
                      t[0] || (t[0] = (f) => (o.formData.name = f)),
                    error: o.formError.name,
                  },
                  null,
                  8,
                  ["modelValue", "error"]
                ),
                j(
                  a,
                  {
                    title: "Адрес доставки",
                    placeholder: "Введите ваш адрес",
                    modelValue: o.formData.address,
                    "onUpdate:modelValue":
                      t[1] || (t[1] = (f) => (o.formData.address = f)),
                    error: o.formError.address,
                  },
                  null,
                  8,
                  ["modelValue", "error"]
                ),
                j(
                  a,
                  {
                    title: "Телефон",
                    placeholder: "Введите ваш телефон",
                    modelValue: o.formData.phone,
                    "onUpdate:modelValue":
                      t[2] || (t[2] = (f) => (o.formData.phone = f)),
                    error: o.formError.phone,
                  },
                  null,
                  8,
                  ["modelValue", "error"]
                ),
                j(
                  a,
                  {
                    title: "Email",
                    placeholder: "Введи ваш Email",
                    modelValue: o.formData.email,
                    "onUpdate:modelValue":
                      t[3] || (t[3] = (f) => (o.formData.email = f)),
                    error: o.formError.email,
                  },
                  null,
                  8,
                  ["modelValue", "error"]
                ),
                j(
                  c,
                  {
                    title: "Комментарий к заказу",
                    placeholder: "Ваши пожелания",
                    modelValue: o.formData.comment,
                    "onUpdate:modelValue":
                      t[4] || (t[4] = (f) => (o.formData.comment = f)),
                    error: o.formError.comment,
                  },
                  null,
                  8,
                  ["modelValue", "error"]
                ),
              ]),
              _("div", ov, [
                j(
                  u,
                  {
                    title: "Доставка",
                    items: o.deliveryItems,
                    modelValue: o.formData.deliveryTypeId,
                    "onUpdate:modelValue":
                      t[5] || (t[5] = (f) => s.deliveryChanged(f)),
                  },
                  null,
                  8,
                  ["items", "modelValue"]
                ),
                j(
                  u,
                  {
                    title: "Оплата",
                    items: o.payItems,
                    modelValue: o.formData.paymentTypeId,
                    "onUpdate:modelValue":
                      t[6] || (t[6] = (f) => (o.formData.paymentTypeId = f)),
                    modelModifiers: { number: !0 },
                  },
                  null,
                  8,
                  ["items", "modelValue"]
                ),
              ]),
            ]),
            _("div", sv, [
              j(
                pt,
                { name: "fade", mode: "out-in" },
                {
                  default: ve(() => [
                    e.cartItems
                      ? (S(),
                        x("ul", iv, [
                          (S(!0),
                          x(
                            me,
                            null,
                            He(
                              e.cartItems,
                              (f) => (
                                S(),
                                x("li", { class: "cart__order", key: f.id }, [
                                  _(
                                    "h3",
                                    null,
                                    Q(f.productOffer.title) +
                                      " (" +
                                      Q(f.quantity) +
                                      " шт.)",
                                    1
                                  ),
                                  _("b", null, Q(f.price) + " ₽", 1),
                                  _("span", null, "Артикул: " + Q(f.id), 1),
                                ])
                              )
                            ),
                            128
                          )),
                        ]))
                      : (S(), Fe(l, { key: 1, width: "50", height: "50" })),
                  ]),
                  _: 1,
                }
              ),
              j(
                pt,
                { name: "fade", mode: "out-in", duration: { delay: 500 } },
                {
                  default: ve(() => [
                    s.totalOffersQuantity
                      ? (S(),
                        x("div", av, [
                          _("p", null, [
                            Ee(" Количество товаров: "),
                            _("b", null, Q(s.totalOffersQuantity), 1),
                            Ee(" шт. "),
                          ]),
                          _("p", null, [
                            Ee(" Сумма: "),
                            _(
                              "b",
                              null,
                              Q(e.$filters.numberFormat(e.totalPrice)) + " ₽",
                              1
                            ),
                          ]),
                        ]))
                      : Ae("", !0),
                  ]),
                  _: 1,
                }
              ),
              j(
                pt,
                { name: "fade", mode: "out-in" },
                {
                  default: ve(() => {
                    var f;
                    return [
                      o.formSending
                        ? (S(),
                          x("div", cv, [j(l, { width: "68", height: "68" })]))
                        : (S(),
                          x(
                            "button",
                            {
                              key: 1,
                              class: "cart__button button button--primery",
                              type: "submit",
                              disabled: !(
                                (f = e.cartItems) != null && f.length
                              ),
                            },
                            " Оформить заказ ",
                            8,
                            lv
                          )),
                    ];
                  }),
                  _: 1,
                }
              ),
            ]),
            j(
              pt,
              { name: "fade", mode: "out-in" },
              {
                default: ve(() => [
                  o.formErrorMessage
                    ? (S(),
                      x("div", uv, [
                        fv,
                        _("p", null, Q(o.formErrorMessage), 1),
                      ]))
                    : Ae("", !0),
                ]),
                _: 1,
              }
            ),
          ],
          32
        ),
      ]),
    ])
  );
}
const pv = Pe(Wb, [
  ["render", dv],
  ["__scopeId", "data-v-10e8509f"],
]);
const hv = {
    name: "OrderInfoPage",
    components: { DataLoadingError: go, DataLoader: _n },
    data() {
      return {
        orderLoading: !0,
        orderLoadingFailed: !1,
        formFields: [
          { title: "Получатель", name: "name" },
          { title: "Адрес доставки", name: "address" },
          { title: "Телефон", name: "phone" },
          { title: "Email", name: "email" },
          { title: "Способ оплаты", name: "paymentType" },
        ],
      };
    },
    methods: { ...th(["loadOrderInfo"]) },
    computed: {
      orderInfo() {
        return this.$store.state.orderInfo;
      },
      totalOffersQuantity() {
        var e;
        return (e = this.orderInfo.basket.items) == null
          ? void 0
          : e.reduce((t, n) => n.quantity + t, 0);
      },
    },
    created() {
      var e;
      ((e = this.$store.state.orderInfo) == null ? void 0 : e.id) !==
        this.$route.params.id &&
        this.loadOrderInfo(this.$route.params.id)
          .catch(() => {
            this.orderLoadingFailed = !0;
          })
          .then(() => {
            this.orderLoading = !1;
          });
    },
  },
  jl = (e) => (pn("data-v-09d24e7a"), (e = e()), hn(), e),
  mv = { key: 0, class: "content container order-info-loader" },
  _v = { key: 1, class: "content container order-info-loader" },
  gv = { key: 2, class: "content container" },
  yv = { class: "content__top" },
  bv = { class: "breadcrumbs" },
  vv = { class: "breadcrumbs__item" },
  Cv = { class: "breadcrumbs__item" },
  wv = jl(() =>
    _(
      "li",
      { class: "breadcrumbs__item" },
      [_("a", { class: "breadcrumbs__link" }, " Оформление заказа ")],
      -1
    )
  ),
  Ev = { class: "content__title" },
  Pv = { class: "cart" },
  Tv = { class: "cart__form form", action: "#", method: "POST" },
  Ov = { class: "cart__field" },
  Sv = jl(() =>
    _(
      "p",
      { class: "cart__message" },
      " Благодарим за выбор нашего магазина. На Вашу почту придет письмо с деталями заказа. Наши менеджеры свяжутся с Вами в течение часа для уточнения деталей доставки. ",
      -1
    )
  ),
  Av = { class: "dictionary" },
  kv = { class: "dictionary__key" },
  $v = { class: "dictionary__value" },
  Iv = { class: "cart__block" },
  xv = { class: "cart__orders" },
  Rv = { class: "cart__total" },
  Nv = { key: 0 },
  Lv = { key: 1 };
function Fv(e, t, n, r, o, s) {
  const i = ne("DataLoader"),
    a = ne("DataLoadingError"),
    c = ne("router-link");
  return (
    S(),
    Fe(
      pt,
      { name: "fade", mode: "out-in" },
      {
        default: ve(() => [
          o.orderLoading
            ? (S(), x("main", mv, [j(i, { width: 200, height: 200 })]))
            : o.orderLoadingFailed
            ? (S(),
              x("main", _v, [j(a, { "svg-height": 100, "svg-width": 100 })]))
            : (S(),
              x("main", gv, [
                _("div", yv, [
                  _("ul", bv, [
                    _("li", vv, [
                      j(
                        c,
                        { class: "breadcrumbs__link", to: { name: "main" } },
                        { default: ve(() => [Ee(" Каталог ")]), _: 1 }
                      ),
                    ]),
                    _("li", Cv, [
                      j(
                        c,
                        { class: "breadcrumbs__link", to: { name: "cart" } },
                        { default: ve(() => [Ee(" Корзина ")]), _: 1 }
                      ),
                    ]),
                    wv,
                  ]),
                  _("h1", Ev, [
                    Ee(" Заказ оформлен "),
                    _("span", null, "№ " + Q(s.orderInfo.id), 1),
                  ]),
                ]),
                _("section", Pv, [
                  _("form", Tv, [
                    _("div", Ov, [
                      Sv,
                      _("ul", Av, [
                        (S(!0),
                        x(
                          me,
                          null,
                          He(
                            o.formFields,
                            (u) => (
                              S(),
                              x(
                                "li",
                                { class: "dictionary__item", key: u.name },
                                [
                                  _("span", kv, Q(u.title), 1),
                                  _("span", $v, Q(s.orderInfo[u.name]), 1),
                                ]
                              )
                            )
                          ),
                          128
                        )),
                      ]),
                    ]),
                    _("div", Iv, [
                      _("ul", xv, [
                        (S(!0),
                        x(
                          me,
                          null,
                          He(
                            s.orderInfo.basket.items,
                            (u) => (
                              S(),
                              x("li", { class: "cart__order", key: u.id }, [
                                _(
                                  "h3",
                                  null,
                                  Q(u.productOffer.title) +
                                    " (" +
                                    Q(u.quantity) +
                                    " шт.)",
                                  1
                                ),
                                _(
                                  "b",
                                  null,
                                  Q(e.$filters.numberFormat(u.price)) + " ₽",
                                  1
                                ),
                                _("span", null, "Артикул: " + Q(u.id), 1),
                              ])
                            )
                          ),
                          128
                        )),
                      ]),
                      _("div", Rv, [
                        s.orderInfo.deliveryType.price === "0"
                          ? (S(),
                            x("p", Nv, Q(s.orderInfo.deliveryType.title), 1))
                          : (S(),
                            x("p", Lv, [
                              Ee(" Доставка: "),
                              _(
                                "b",
                                null,
                                Q(
                                  e.$filters.numberFormat(
                                    s.orderInfo.deliveryType.price
                                  )
                                ) + " ₽",
                                1
                              ),
                            ])),
                        _("p", null, [
                          Ee(" Количество товаров: "),
                          _("b", null, Q(s.totalOffersQuantity), 1),
                          Ee(" шт. "),
                        ]),
                        _("p", null, [
                          Ee(" Сумма: "),
                          _(
                            "b",
                            null,
                            Q(e.$filters.numberFormat(s.orderInfo.totalPrice)) +
                              " ₽",
                            1
                          ),
                        ]),
                      ]),
                    ]),
                  ]),
                ]),
              ])),
        ]),
        _: 1,
      }
    )
  );
}
const Dv = Pe(hv, [
    ["render", Fv],
    ["__scopeId", "data-v-09d24e7a"],
  ]),
  Mv = [
    { name: "main", component: Xy, path: "/" },
    { name: "product", component: V0, path: "/product/:id" },
    { name: "cart", component: Cb, path: "/cart" },
    { name: "order", component: pv, path: "/order" },
    { name: "orderInfo", component: Dv, path: "/order/:id" },
    { name: "notFound", component: e0, path: "/:pathMatch(.*)*" },
  ],
  jv = Cm({ routes: Mv, history: Dh() }),
  Bv = eh({
    state() {
      return { userAccessKey: null, cartProductsData: null, orderInfo: null };
    },
    mutations: {
      updateOrderInfo(e, t) {
        e.orderInfo = t;
      },
      resetCart(e) {
        e.cartProductsData = null;
      },
      updateCartProductQuantity(e, { basketItemId: t, quantity: n }) {
        var o;
        const r =
          (o = e.cartProductsData.items) == null
            ? void 0
            : o.find((s) => s.id === t);
        r && (r.quantity = n);
      },
      deleteProductFromCart(e, { basketItemId: t }) {
        var n;
        e.cartProductsData.items =
          (n = e.cartProductsData.items) == null
            ? void 0
            : n.filter((r) => r.id !== t);
      },
      updateUserAccessKey(e, t) {
        this.state.userAccessKey = t;
      },
      updateCartProductsData(e, t) {
        e.cartProductsData = t;
      },
      syncCartProducts(e) {
        e.cartProducts = e.cartProductsData.map((t) => ({
          id: t.product.id,
          quantity: t.quantity,
        }));
      },
    },
    getters: {
      cartDetailsProducts(e) {
        var t;
        return (t = e.cartProductsData) == null ? void 0 : t.items;
      },
      cartTotalPrice(e, t) {
        var n;
        return (n = t.cartDetailsProducts) == null
          ? void 0
          : n.reduce((r, o) => o.price * o.quantity + r, 0);
      },
      cartCountProducts(e, t) {
        var n;
        return (n = t.cartDetailsProducts) == null ? void 0 : n.length;
      },
    },
    actions: {
      loadOrderInfo(e, t) {
        return Ze.get(`${Ye}/api/orders/${t}`, {
          params: { userAccessKey: e.state.userAccessKey },
        }).then((n) => {
          e.commit("updateOrderInfo", n.data);
        });
      },
      loadCart(e) {
        return Ze.get(`${Ye}/api/baskets`, {
          params: { userAccessKey: e.state.userAccessKey },
        }).then((t) => {
          e.state.userAccessKey ||
            (localStorage.setItem("userAccessKey", t.data.user.accessKey),
            e.commit("updateUserAccessKey", t.data.user.accessKey)),
            e.commit("updateCartProductsData", t.data);
        });
      },
      addProductToCart(e, t) {
        return Ze.post(`${Ye}/api/baskets/products`, t, {
          params: { userAccessKey: e.state.userAccessKey },
        }).then((n) => {
          e.commit("updateCartProductsData", n.data);
        });
      },
      updateCartProductQuantity(e, { basketItemId: t, quantity: n }) {
        if (
          (e.commit("updateCartProductQuantity", {
            basketItemId: t,
            quantity: n,
          }),
          !(n < 1))
        )
          return Ze.put(
            `${Ye}/api/baskets/products`,
            { basketItemId: t, quantity: n },
            { params: { userAccessKey: e.state.userAccessKey } }
          )
            .then((r) => {
              e.commit("updateCartProductsData", r.data);
            })
            .catch(() => {});
      },
      deleteProductFromCart(e, t) {
        return (
          e.commit("deleteProductFromCart", t),
          Ze.delete(`${Ye}/api/baskets/products`, {
            data: t,
            params: { userAccessKey: e.state.userAccessKey },
          }).then((n) => {
            e.commit("updateCartProductsData", n.data);
          })
        );
      },
    },
  }),
  Eo = kp({ render: () => br(yh) });
Eo.use(jv);
Eo.use(Bv);
Eo.config.globalProperties.$filters = {
  numberFormat(e) {
    return new Intl.NumberFormat().format(e);
  },
};
Eo.mount("#app");
