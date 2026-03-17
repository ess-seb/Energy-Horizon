var Bo = Object.defineProperty;
var Yo = (n, t, e) => t in n ? Bo(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var x = (n, t, e) => Yo(n, typeof t != "symbol" ? t + "" : t, e);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pn = globalThis, vi = pn.ShadowRoot && (pn.ShadyCSS === void 0 || pn.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Mi = Symbol(), Yi = /* @__PURE__ */ new WeakMap();
let Pr = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== Mi) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (vi && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = Yi.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Yi.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const jo = (n) => new Pr(typeof n == "string" ? n : n + "", void 0, Mi), Vo = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((i, s, r) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + n[r + 1], n[0]);
  return new Pr(e, n, Mi);
}, Uo = (n, t) => {
  if (vi) n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = pn.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, n.appendChild(i);
  }
}, ji = vi ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return jo(e);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: qo, defineProperty: Xo, getOwnPropertyDescriptor: Qo, getOwnPropertyNames: Go, getOwnPropertySymbols: Ko, getPrototypeOf: Zo } = Object, Tt = globalThis, Vi = Tt.trustedTypes, Jo = Vi ? Vi.emptyScript : "", Wn = Tt.reactiveElementPolyfillSupport, Se = (n, t) => n, oi = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? Jo : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, t) {
  let e = n;
  switch (t) {
    case Boolean:
      e = n !== null;
      break;
    case Number:
      e = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(n);
      } catch {
        e = null;
      }
  }
  return e;
} }, Sr = (n, t) => !qo(n, t), Ui = { attribute: !0, type: String, converter: oi, reflect: !1, useDefault: !1, hasChanged: Sr };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), Tt.litPropertyMetadata ?? (Tt.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let ie = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Ui) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && Xo(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: r } = Qo(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: s, set(o) {
      const a = s == null ? void 0 : s.call(this);
      r == null || r.call(this, o), this.requestUpdate(t, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Ui;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Se("elementProperties"))) return;
    const t = Zo(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Se("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Se("properties"))) {
      const e = this.properties, i = [...Go(e), ...Ko(e)];
      for (const s of i) this.createProperty(s, e[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, s] of e) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const s = this._$Eu(e, i);
      s !== void 0 && this._$Eh.set(s, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const s of i) e.unshift(ji(s));
    } else t !== void 0 && e.push(ji(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Uo(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostConnected) == null ? void 0 : i.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) == null ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    var r;
    const i = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, i);
    if (s !== void 0 && i.reflect === !0) {
      const o = (((r = i.converter) == null ? void 0 : r.toAttribute) !== void 0 ? i.converter : oi).toAttribute(e, i.type);
      this._$Em = t, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var r, o;
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const a = i.getPropertyOptions(s), c = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((r = a.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? a.converter : oi;
      this._$Em = s;
      const l = c.fromAttribute(e, a.type);
      this[s] = l ?? ((o = this._$Ej) == null ? void 0 : o.get(s)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, s = !1, r) {
    var o;
    if (t !== void 0) {
      const a = this.constructor;
      if (s === !1 && (r = this[t]), i ?? (i = a.getPropertyOptions(t)), !((i.hasChanged ?? Sr)(r, e) || i.useDefault && i.reflect && r === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(a._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: s, wrapped: r }, o) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), r !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [r, o] of this._$Ep) this[r] = o;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [r, o] of s) {
        const { wrapped: a } = o, c = this[r];
        a !== !0 || this._$AL.has(r) || c === void 0 || this.C(r, void 0, o, c);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (i = this._$EO) == null || i.forEach((s) => {
        var r;
        return (r = s.hostUpdate) == null ? void 0 : r.call(s);
      }), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((i) => {
      var s;
      return (s = i.hostUpdated) == null ? void 0 : s.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
ie.elementStyles = [], ie.shadowRootOptions = { mode: "open" }, ie[Se("elementProperties")] = /* @__PURE__ */ new Map(), ie[Se("finalized")] = /* @__PURE__ */ new Map(), Wn == null || Wn({ ReactiveElement: ie }), (Tt.reactiveElementVersions ?? (Tt.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Oe = globalThis, qi = (n) => n, wn = Oe.trustedTypes, Xi = wn ? wn.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, Or = "$lit$", kt = `lit$${Math.random().toFixed(9).slice(2)}$`, Tr = "?" + kt, ta = `<${Tr}>`, Qt = document, ze = () => Qt.createComment(""), He = (n) => n === null || typeof n != "object" && typeof n != "function", ki = Array.isArray, ea = (n) => ki(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", Bn = `[ 	
\f\r]`, me = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Qi = /-->/g, Gi = />/g, Rt = RegExp(`>|${Bn}(?:([^\\s"'>=/]+)(${Bn}*=${Bn}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ki = /'/g, Zi = /"/g, Cr = /^(?:script|style|textarea|title)$/i, na = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), Q = na(1), ae = Symbol.for("lit-noChange"), q = Symbol.for("lit-nothing"), Ji = /* @__PURE__ */ new WeakMap(), jt = Qt.createTreeWalker(Qt, 129);
function Ar(n, t) {
  if (!ki(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Xi !== void 0 ? Xi.createHTML(t) : t;
}
const ia = (n, t) => {
  const e = n.length - 1, i = [];
  let s, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = me;
  for (let a = 0; a < e; a++) {
    const c = n[a];
    let l, h, u = -1, d = 0;
    for (; d < c.length && (o.lastIndex = d, h = o.exec(c), h !== null); ) d = o.lastIndex, o === me ? h[1] === "!--" ? o = Qi : h[1] !== void 0 ? o = Gi : h[2] !== void 0 ? (Cr.test(h[2]) && (s = RegExp("</" + h[2], "g")), o = Rt) : h[3] !== void 0 && (o = Rt) : o === Rt ? h[0] === ">" ? (o = s ?? me, u = -1) : h[1] === void 0 ? u = -2 : (u = o.lastIndex - h[2].length, l = h[1], o = h[3] === void 0 ? Rt : h[3] === '"' ? Zi : Ki) : o === Zi || o === Ki ? o = Rt : o === Qi || o === Gi ? o = me : (o = Rt, s = void 0);
    const f = o === Rt && n[a + 1].startsWith("/>") ? " " : "";
    r += o === me ? c + ta : u >= 0 ? (i.push(l), c.slice(0, u) + Or + c.slice(u) + kt + f) : c + kt + (u === -2 ? a : f);
  }
  return [Ar(n, r + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class Ne {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let r = 0, o = 0;
    const a = t.length - 1, c = this.parts, [l, h] = ia(t, e);
    if (this.el = Ne.createElement(l, i), jt.currentNode = this.el.content, e === 2 || e === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (s = jt.nextNode()) !== null && c.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const u of s.getAttributeNames()) if (u.endsWith(Or)) {
          const d = h[o++], f = s.getAttribute(u).split(kt), g = /([.?@])?(.*)/.exec(d);
          c.push({ type: 1, index: r, name: g[2], strings: f, ctor: g[1] === "." ? ra : g[1] === "?" ? oa : g[1] === "@" ? aa : $n }), s.removeAttribute(u);
        } else u.startsWith(kt) && (c.push({ type: 6, index: r }), s.removeAttribute(u));
        if (Cr.test(s.tagName)) {
          const u = s.textContent.split(kt), d = u.length - 1;
          if (d > 0) {
            s.textContent = wn ? wn.emptyScript : "";
            for (let f = 0; f < d; f++) s.append(u[f], ze()), jt.nextNode(), c.push({ type: 2, index: ++r });
            s.append(u[d], ze());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Tr) c.push({ type: 2, index: r });
      else {
        let u = -1;
        for (; (u = s.data.indexOf(kt, u + 1)) !== -1; ) c.push({ type: 7, index: r }), u += kt.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const i = Qt.createElement("template");
    return i.innerHTML = t, i;
  }
}
function ce(n, t, e = n, i) {
  var o, a;
  if (t === ae) return t;
  let s = i !== void 0 ? (o = e._$Co) == null ? void 0 : o[i] : e._$Cl;
  const r = He(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== r && ((a = s == null ? void 0 : s._$AO) == null || a.call(s, !1), r === void 0 ? s = void 0 : (s = new r(n), s._$AT(n, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = s : e._$Cl = s), s !== void 0 && (t = ce(n, s._$AS(n, t.values), s, i)), t;
}
class sa {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: i } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? Qt).importNode(e, !0);
    jt.currentNode = s;
    let r = jt.nextNode(), o = 0, a = 0, c = i[0];
    for (; c !== void 0; ) {
      if (o === c.index) {
        let l;
        c.type === 2 ? l = new qe(r, r.nextSibling, this, t) : c.type === 1 ? l = new c.ctor(r, c.name, c.strings, this, t) : c.type === 6 && (l = new ca(r, this, t)), this._$AV.push(l), c = i[++a];
      }
      o !== (c == null ? void 0 : c.index) && (r = jt.nextNode(), o++);
    }
    return jt.currentNode = Qt, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class qe {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, i, s) {
    this.type = 2, this._$AH = q, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = ce(this, t, e), He(t) ? t === q || t == null || t === "" ? (this._$AH !== q && this._$AR(), this._$AH = q) : t !== this._$AH && t !== ae && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ea(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== q && He(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Qt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var r;
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = Ne.createElement(Ar(i.h, i.h[0]), this.options)), i);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === s) this._$AH.p(e);
    else {
      const o = new sa(s, this), a = o.u(this.options);
      o.p(e), this.T(a), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = Ji.get(t.strings);
    return e === void 0 && Ji.set(t.strings, e = new Ne(t)), e;
  }
  k(t) {
    ki(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const r of t) s === e.length ? e.push(i = new qe(this.O(ze()), this.O(ze()), this, this.options)) : i = e[s], i._$AI(r), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t !== this._$AB; ) {
      const s = qi(t).nextSibling;
      qi(t).remove(), t = s;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class $n {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, s, r) {
    this.type = 1, this._$AH = q, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = q;
  }
  _$AI(t, e = this, i, s) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) t = ce(this, t, e, 0), o = !He(t) || t !== this._$AH && t !== ae, o && (this._$AH = t);
    else {
      const a = t;
      let c, l;
      for (t = r[0], c = 0; c < r.length - 1; c++) l = ce(this, a[i + c], e, c), l === ae && (l = this._$AH[c]), o || (o = !He(l) || l !== this._$AH[c]), l === q ? t = q : t !== q && (t += (l ?? "") + r[c + 1]), this._$AH[c] = l;
    }
    o && !s && this.j(t);
  }
  j(t) {
    t === q ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ra extends $n {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === q ? void 0 : t;
  }
}
class oa extends $n {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== q);
  }
}
class aa extends $n {
  constructor(t, e, i, s, r) {
    super(t, e, i, s, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = ce(this, t, e, 0) ?? q) === ae) return;
    const i = this._$AH, s = t === q && i !== q || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, r = t !== q && (i === q || s);
    s && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ca {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    ce(this, t);
  }
}
const Yn = Oe.litHtmlPolyfillSupport;
Yn == null || Yn(Ne, qe), (Oe.litHtmlVersions ?? (Oe.litHtmlVersions = [])).push("3.3.2");
const la = (n, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const r = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = s = new qe(t.insertBefore(ze(), r), r, void 0, e ?? {});
  }
  return s._$AI(n), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const qt = globalThis;
class Te extends ie {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = la(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return ae;
  }
}
var Dr;
Te._$litElement$ = !0, Te.finalized = !0, (Dr = qt.litElementHydrateSupport) == null || Dr.call(qt, { LitElement: Te });
const jn = qt.litElementPolyfillSupport;
jn == null || jn({ LitElement: Te });
(qt.litElementVersions ?? (qt.litElementVersions = [])).push("4.2.2");
const ha = 5;
function ua(n, t) {
  const e = [], i = new Date(n.current_start);
  if (i.setHours(0, 0, 0, 0), n.aggregation === "day")
    for (; i.getTime() <= t.getTime(); )
      e.push(i.getTime()), i.setDate(i.getDate() + 1);
  else if (n.aggregation === "week")
    for (; i.getTime() <= t.getTime(); )
      e.push(i.getTime()), i.setDate(i.getDate() + 7);
  else if (n.aggregation === "month")
    for (i.setDate(1); i.getFullYear() < t.getFullYear() || i.getFullYear() === t.getFullYear() && i.getMonth() <= t.getMonth(); )
      e.push(i.getTime()), i.setMonth(i.getMonth() + 1);
  return e;
}
function da(n, t, e) {
  const i = new Date(t.getTime()), s = n.period_offset ?? -1;
  let r, o, a, c;
  if (n.comparison_mode === "year_over_year") {
    const l = i.getFullYear();
    r = new Date(l, 0, 1, 0, 0, 0, 0), o = i;
    const h = l + s;
    a = new Date(h, 0, 1, 0, 0, 0, 0), c = new Date(h, 11, 31, 23, 59, 59, 999);
  } else {
    const l = i.getFullYear(), h = i.getMonth();
    r = new Date(l, h, 1, 0, 0, 0, 0), o = i;
    const u = l + s;
    a = new Date(u, h, 1, 0, 0, 0, 0), c = new Date(u, h + 1, 0, 23, 59, 59, 999);
  }
  return {
    current_start: r,
    current_end: o,
    reference_start: a,
    reference_end: c,
    aggregation: n.aggregation ?? "day",
    time_zone: e
  };
}
function ts(n, t) {
  const e = {
    day: "day",
    week: "week",
    month: "month"
  };
  return {
    type: "recorder/statistics_during_period",
    start_time: n.current_start.toISOString(),
    end_time: n.current_end.toISOString(),
    statistic_ids: [t],
    period: e[n.aggregation]
  };
}
function es(n, t, e) {
  const i = n.result ?? n, s = i.results ?? i;
  if (!s || typeof s != "object") return;
  let r = s[t];
  if (!r || r.length === 0) {
    const l = Object.keys(s);
    l.length === 1 && (r = s[l[0]]);
  }
  if (!r || r.length === 0) return;
  const { unit: o, timeSeries: a } = fa(r);
  return ga(
    a,
    o,
    e
  );
}
function fa(n) {
  let t = "";
  const e = [];
  let i;
  for (const s of n) {
    let r;
    if (typeof s.sum == "number")
      if (i === void 0) {
        i = s.sum;
        continue;
      } else {
        const o = s.sum - i;
        if (i = s.sum, !Number.isFinite(o) || o <= 0)
          continue;
        r = o;
      }
    else typeof s.change == "number" ? r = s.change : typeof s.state == "number" && (r = s.state);
    if (!(r == null || !Number.isFinite(r))) {
      if (!t && s.unit_of_measurement)
        t = s.unit_of_measurement;
      else if (t && s.unit_of_measurement && s.unit_of_measurement !== t)
        return { unit: "", timeSeries: [] };
      e.push({
        timestamp: new Date(s.start).getTime(),
        value: r,
        rawValue: r
      });
    }
  }
  return { unit: t, timeSeries: e.sort((s, r) => s.timestamp - r.timestamp) };
}
function ga(n, t, e) {
  let i = 0;
  const s = n.map((o) => {
    const a = o.rawValue ?? o.value;
    return i += a, { ...o, value: i };
  }), r = s.length > 0 ? s[s.length - 1].value : 0;
  return {
    points: s,
    unit: t,
    periodLabel: e,
    total: r
  };
}
function ma(n) {
  var o, a, c;
  const t = n.current.points, e = ((o = t[t.length - 1]) == null ? void 0 : o.value) ?? 0;
  let i;
  if (n.reference && n.reference.points.length >= t.length) {
    const l = n.reference.points;
    i = ((a = l[t.length - 1]) == null ? void 0 : a.value) ?? ((c = l[l.length - 1]) == null ? void 0 : c.value);
  }
  let s, r;
  return i != null && (s = e - i, i !== 0 && (r = s / i * 100)), {
    current_cumulative: e,
    reference_cumulative: i,
    difference: s,
    differencePercent: r,
    unit: n.current.unit
  };
}
function pa(n) {
  var g;
  const t = n.current.points, e = t.length, i = Math.max(0, e - 1);
  if (i < ha)
    return {
      enabled: !1,
      unit: n.current.unit,
      confidence: "low"
    };
  const s = (g = n.reference) == null ? void 0 : g.points;
  if (!s || s.length < i + 1)
    return {
      enabled: !1,
      unit: n.current.unit,
      confidence: "low"
    };
  const r = (m, p, b) => m.slice(p, b).reduce((y, v) => y + (v.rawValue ?? 0), 0), o = r(t, 0, i), a = r(s, 0, i);
  if (!Number.isFinite(a) || a <= 0)
    return {
      enabled: !1,
      unit: n.current.unit,
      confidence: "low"
    };
  const c = r(s, i, s.length), l = r(s, 0, s.length), h = o / a, u = Math.min(5, Math.max(0.2, h)), d = o + c * u;
  let f = "low";
  return i >= 14 ? f = "high" : i >= 7 && (f = "medium"), {
    enabled: !0,
    forecast_total: d,
    reference_total: l,
    unit: n.current.unit,
    confidence: f
  };
}
function ba(n) {
  const { reference_cumulative: t, difference: e, unit: i } = n;
  if (t == null || e == null)
    return {
      trend: "unknown",
      unit: i
    };
  const s = Math.abs(e);
  return s < 0.01 ? {
    trend: "similar",
    diffValue: s,
    unit: i
  } : e > 0 ? {
    trend: "higher",
    diffValue: s,
    unit: i
  } : {
    trend: "lower",
    diffValue: s,
    unit: i
  };
}
/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */
function Xe(n) {
  return n + 0.5 | 0;
}
const Dt = (n, t, e) => Math.max(Math.min(n, e), t);
function ke(n) {
  return Dt(Xe(n * 2.55), 0, 255);
}
function Ct(n) {
  return Dt(Xe(n * 255), 0, 255);
}
function xt(n) {
  return Dt(Xe(n / 2.55) / 100, 0, 1);
}
function ns(n) {
  return Dt(Xe(n * 100), 0, 100);
}
const rt = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, ai = [..."0123456789ABCDEF"], ya = (n) => ai[n & 15], _a = (n) => ai[(n & 240) >> 4] + ai[n & 15], Je = (n) => (n & 240) >> 4 === (n & 15), xa = (n) => Je(n.r) && Je(n.g) && Je(n.b) && Je(n.a);
function wa(n) {
  var t = n.length, e;
  return n[0] === "#" && (t === 4 || t === 5 ? e = {
    r: 255 & rt[n[1]] * 17,
    g: 255 & rt[n[2]] * 17,
    b: 255 & rt[n[3]] * 17,
    a: t === 5 ? rt[n[4]] * 17 : 255
  } : (t === 7 || t === 9) && (e = {
    r: rt[n[1]] << 4 | rt[n[2]],
    g: rt[n[3]] << 4 | rt[n[4]],
    b: rt[n[5]] << 4 | rt[n[6]],
    a: t === 9 ? rt[n[7]] << 4 | rt[n[8]] : 255
  })), e;
}
const va = (n, t) => n < 255 ? t(n) : "";
function Ma(n) {
  var t = xa(n) ? ya : _a;
  return n ? "#" + t(n.r) + t(n.g) + t(n.b) + va(n.a, t) : void 0;
}
const ka = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function Er(n, t, e) {
  const i = t * Math.min(e, 1 - e), s = (r, o = (r + n / 30) % 12) => e - i * Math.max(Math.min(o - 3, 9 - o, 1), -1);
  return [s(0), s(8), s(4)];
}
function Da(n, t, e) {
  const i = (s, r = (s + n / 60) % 6) => e - e * t * Math.max(Math.min(r, 4 - r, 1), 0);
  return [i(5), i(3), i(1)];
}
function Pa(n, t, e) {
  const i = Er(n, 1, 0.5);
  let s;
  for (t + e > 1 && (s = 1 / (t + e), t *= s, e *= s), s = 0; s < 3; s++)
    i[s] *= 1 - t - e, i[s] += t;
  return i;
}
function Sa(n, t, e, i, s) {
  return n === s ? (t - e) / i + (t < e ? 6 : 0) : t === s ? (e - n) / i + 2 : (n - t) / i + 4;
}
function Di(n) {
  const e = n.r / 255, i = n.g / 255, s = n.b / 255, r = Math.max(e, i, s), o = Math.min(e, i, s), a = (r + o) / 2;
  let c, l, h;
  return r !== o && (h = r - o, l = a > 0.5 ? h / (2 - r - o) : h / (r + o), c = Sa(e, i, s, h, r), c = c * 60 + 0.5), [c | 0, l || 0, a];
}
function Pi(n, t, e, i) {
  return (Array.isArray(t) ? n(t[0], t[1], t[2]) : n(t, e, i)).map(Ct);
}
function Si(n, t, e) {
  return Pi(Er, n, t, e);
}
function Oa(n, t, e) {
  return Pi(Pa, n, t, e);
}
function Ta(n, t, e) {
  return Pi(Da, n, t, e);
}
function $r(n) {
  return (n % 360 + 360) % 360;
}
function Ca(n) {
  const t = ka.exec(n);
  let e = 255, i;
  if (!t)
    return;
  t[5] !== i && (e = t[6] ? ke(+t[5]) : Ct(+t[5]));
  const s = $r(+t[2]), r = +t[3] / 100, o = +t[4] / 100;
  return t[1] === "hwb" ? i = Oa(s, r, o) : t[1] === "hsv" ? i = Ta(s, r, o) : i = Si(s, r, o), {
    r: i[0],
    g: i[1],
    b: i[2],
    a: e
  };
}
function Aa(n, t) {
  var e = Di(n);
  e[0] = $r(e[0] + t), e = Si(e), n.r = e[0], n.g = e[1], n.b = e[2];
}
function Ea(n) {
  if (!n)
    return;
  const t = Di(n), e = t[0], i = ns(t[1]), s = ns(t[2]);
  return n.a < 255 ? `hsla(${e}, ${i}%, ${s}%, ${xt(n.a)})` : `hsl(${e}, ${i}%, ${s}%)`;
}
const is = {
  x: "dark",
  Z: "light",
  Y: "re",
  X: "blu",
  W: "gr",
  V: "medium",
  U: "slate",
  A: "ee",
  T: "ol",
  S: "or",
  B: "ra",
  C: "lateg",
  D: "ights",
  R: "in",
  Q: "turquois",
  E: "hi",
  P: "ro",
  O: "al",
  N: "le",
  M: "de",
  L: "yello",
  F: "en",
  K: "ch",
  G: "arks",
  H: "ea",
  I: "ightg",
  J: "wh"
}, ss = {
  OiceXe: "f0f8ff",
  antiquewEte: "faebd7",
  aqua: "ffff",
  aquamarRe: "7fffd4",
  azuY: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "0",
  blanKedOmond: "ffebcd",
  Xe: "ff",
  XeviTet: "8a2be2",
  bPwn: "a52a2a",
  burlywood: "deb887",
  caMtXe: "5f9ea0",
  KartYuse: "7fff00",
  KocTate: "d2691e",
  cSO: "ff7f50",
  cSnflowerXe: "6495ed",
  cSnsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "ffff",
  xXe: "8b",
  xcyan: "8b8b",
  xgTMnPd: "b8860b",
  xWay: "a9a9a9",
  xgYF: "6400",
  xgYy: "a9a9a9",
  xkhaki: "bdb76b",
  xmagFta: "8b008b",
  xTivegYF: "556b2f",
  xSange: "ff8c00",
  xScEd: "9932cc",
  xYd: "8b0000",
  xsOmon: "e9967a",
  xsHgYF: "8fbc8f",
  xUXe: "483d8b",
  xUWay: "2f4f4f",
  xUgYy: "2f4f4f",
  xQe: "ced1",
  xviTet: "9400d3",
  dAppRk: "ff1493",
  dApskyXe: "bfff",
  dimWay: "696969",
  dimgYy: "696969",
  dodgerXe: "1e90ff",
  fiYbrick: "b22222",
  flSOwEte: "fffaf0",
  foYstWAn: "228b22",
  fuKsia: "ff00ff",
  gaRsbSo: "dcdcdc",
  ghostwEte: "f8f8ff",
  gTd: "ffd700",
  gTMnPd: "daa520",
  Way: "808080",
  gYF: "8000",
  gYFLw: "adff2f",
  gYy: "808080",
  honeyMw: "f0fff0",
  hotpRk: "ff69b4",
  RdianYd: "cd5c5c",
  Rdigo: "4b0082",
  ivSy: "fffff0",
  khaki: "f0e68c",
  lavFMr: "e6e6fa",
  lavFMrXsh: "fff0f5",
  lawngYF: "7cfc00",
  NmoncEffon: "fffacd",
  ZXe: "add8e6",
  ZcSO: "f08080",
  Zcyan: "e0ffff",
  ZgTMnPdLw: "fafad2",
  ZWay: "d3d3d3",
  ZgYF: "90ee90",
  ZgYy: "d3d3d3",
  ZpRk: "ffb6c1",
  ZsOmon: "ffa07a",
  ZsHgYF: "20b2aa",
  ZskyXe: "87cefa",
  ZUWay: "778899",
  ZUgYy: "778899",
  ZstAlXe: "b0c4de",
  ZLw: "ffffe0",
  lime: "ff00",
  limegYF: "32cd32",
  lRF: "faf0e6",
  magFta: "ff00ff",
  maPon: "800000",
  VaquamarRe: "66cdaa",
  VXe: "cd",
  VScEd: "ba55d3",
  VpurpN: "9370db",
  VsHgYF: "3cb371",
  VUXe: "7b68ee",
  VsprRggYF: "fa9a",
  VQe: "48d1cc",
  VviTetYd: "c71585",
  midnightXe: "191970",
  mRtcYam: "f5fffa",
  mistyPse: "ffe4e1",
  moccasR: "ffe4b5",
  navajowEte: "ffdead",
  navy: "80",
  Tdlace: "fdf5e6",
  Tive: "808000",
  TivedBb: "6b8e23",
  Sange: "ffa500",
  SangeYd: "ff4500",
  ScEd: "da70d6",
  pOegTMnPd: "eee8aa",
  pOegYF: "98fb98",
  pOeQe: "afeeee",
  pOeviTetYd: "db7093",
  papayawEp: "ffefd5",
  pHKpuff: "ffdab9",
  peru: "cd853f",
  pRk: "ffc0cb",
  plum: "dda0dd",
  powMrXe: "b0e0e6",
  purpN: "800080",
  YbeccapurpN: "663399",
  Yd: "ff0000",
  Psybrown: "bc8f8f",
  PyOXe: "4169e1",
  saddNbPwn: "8b4513",
  sOmon: "fa8072",
  sandybPwn: "f4a460",
  sHgYF: "2e8b57",
  sHshell: "fff5ee",
  siFna: "a0522d",
  silver: "c0c0c0",
  skyXe: "87ceeb",
  UXe: "6a5acd",
  UWay: "708090",
  UgYy: "708090",
  snow: "fffafa",
  sprRggYF: "ff7f",
  stAlXe: "4682b4",
  tan: "d2b48c",
  teO: "8080",
  tEstN: "d8bfd8",
  tomato: "ff6347",
  Qe: "40e0d0",
  viTet: "ee82ee",
  JHt: "f5deb3",
  wEte: "ffffff",
  wEtesmoke: "f5f5f5",
  Lw: "ffff00",
  LwgYF: "9acd32"
};
function $a() {
  const n = {}, t = Object.keys(ss), e = Object.keys(is);
  let i, s, r, o, a;
  for (i = 0; i < t.length; i++) {
    for (o = a = t[i], s = 0; s < e.length; s++)
      r = e[s], a = a.replace(r, is[r]);
    r = parseInt(ss[o], 16), n[a] = [r >> 16 & 255, r >> 8 & 255, r & 255];
  }
  return n;
}
let tn;
function Ia(n) {
  tn || (tn = $a(), tn.transparent = [0, 0, 0, 0]);
  const t = tn[n.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const La = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function Fa(n) {
  const t = La.exec(n);
  let e = 255, i, s, r;
  if (t) {
    if (t[7] !== i) {
      const o = +t[7];
      e = t[8] ? ke(o) : Dt(o * 255, 0, 255);
    }
    return i = +t[1], s = +t[3], r = +t[5], i = 255 & (t[2] ? ke(i) : Dt(i, 0, 255)), s = 255 & (t[4] ? ke(s) : Dt(s, 0, 255)), r = 255 & (t[6] ? ke(r) : Dt(r, 0, 255)), {
      r: i,
      g: s,
      b: r,
      a: e
    };
  }
}
function Ra(n) {
  return n && (n.a < 255 ? `rgba(${n.r}, ${n.g}, ${n.b}, ${xt(n.a)})` : `rgb(${n.r}, ${n.g}, ${n.b})`);
}
const Vn = (n) => n <= 31308e-7 ? n * 12.92 : Math.pow(n, 1 / 2.4) * 1.055 - 0.055, ee = (n) => n <= 0.04045 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4);
function za(n, t, e) {
  const i = ee(xt(n.r)), s = ee(xt(n.g)), r = ee(xt(n.b));
  return {
    r: Ct(Vn(i + e * (ee(xt(t.r)) - i))),
    g: Ct(Vn(s + e * (ee(xt(t.g)) - s))),
    b: Ct(Vn(r + e * (ee(xt(t.b)) - r))),
    a: n.a + e * (t.a - n.a)
  };
}
function en(n, t, e) {
  if (n) {
    let i = Di(n);
    i[t] = Math.max(0, Math.min(i[t] + i[t] * e, t === 0 ? 360 : 1)), i = Si(i), n.r = i[0], n.g = i[1], n.b = i[2];
  }
}
function Ir(n, t) {
  return n && Object.assign(t || {}, n);
}
function rs(n) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(n) ? n.length >= 3 && (t = { r: n[0], g: n[1], b: n[2], a: 255 }, n.length > 3 && (t.a = Ct(n[3]))) : (t = Ir(n, { r: 0, g: 0, b: 0, a: 1 }), t.a = Ct(t.a)), t;
}
function Ha(n) {
  return n.charAt(0) === "r" ? Fa(n) : Ca(n);
}
class We {
  constructor(t) {
    if (t instanceof We)
      return t;
    const e = typeof t;
    let i;
    e === "object" ? i = rs(t) : e === "string" && (i = wa(t) || Ia(t) || Ha(t)), this._rgb = i, this._valid = !!i;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = Ir(this._rgb);
    return t && (t.a = xt(t.a)), t;
  }
  set rgb(t) {
    this._rgb = rs(t);
  }
  rgbString() {
    return this._valid ? Ra(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? Ma(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? Ea(this._rgb) : void 0;
  }
  mix(t, e) {
    if (t) {
      const i = this.rgb, s = t.rgb;
      let r;
      const o = e === r ? 0.5 : e, a = 2 * o - 1, c = i.a - s.a, l = ((a * c === -1 ? a : (a + c) / (1 + a * c)) + 1) / 2;
      r = 1 - l, i.r = 255 & l * i.r + r * s.r + 0.5, i.g = 255 & l * i.g + r * s.g + 0.5, i.b = 255 & l * i.b + r * s.b + 0.5, i.a = o * i.a + (1 - o) * s.a, this.rgb = i;
    }
    return this;
  }
  interpolate(t, e) {
    return t && (this._rgb = za(this._rgb, t._rgb, e)), this;
  }
  clone() {
    return new We(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = Ct(t), this;
  }
  clearer(t) {
    const e = this._rgb;
    return e.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, e = Xe(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
    return t.r = t.g = t.b = e, this;
  }
  opaquer(t) {
    const e = this._rgb;
    return e.a *= 1 + t, this;
  }
  negate() {
    const t = this._rgb;
    return t.r = 255 - t.r, t.g = 255 - t.g, t.b = 255 - t.b, this;
  }
  lighten(t) {
    return en(this._rgb, 2, t), this;
  }
  darken(t) {
    return en(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return en(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return en(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return Aa(this._rgb, t), this;
  }
}
/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */
function bt() {
}
const Na = /* @__PURE__ */ (() => {
  let n = 0;
  return () => n++;
})();
function R(n) {
  return n == null;
}
function X(n) {
  if (Array.isArray && Array.isArray(n))
    return !0;
  const t = Object.prototype.toString.call(n);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function E(n) {
  return n !== null && Object.prototype.toString.call(n) === "[object Object]";
}
function J(n) {
  return (typeof n == "number" || n instanceof Number) && isFinite(+n);
}
function ht(n, t) {
  return J(n) ? n : t;
}
function A(n, t) {
  return typeof n > "u" ? t : n;
}
const Wa = (n, t) => typeof n == "string" && n.endsWith("%") ? parseFloat(n) / 100 * t : +n;
function F(n, t, e) {
  if (n && typeof n.call == "function")
    return n.apply(e, t);
}
function L(n, t, e, i) {
  let s, r, o;
  if (X(n))
    for (r = n.length, s = 0; s < r; s++)
      t.call(e, n[s], s);
  else if (E(n))
    for (o = Object.keys(n), r = o.length, s = 0; s < r; s++)
      t.call(e, n[o[s]], o[s]);
}
function vn(n, t) {
  let e, i, s, r;
  if (!n || !t || n.length !== t.length)
    return !1;
  for (e = 0, i = n.length; e < i; ++e)
    if (s = n[e], r = t[e], s.datasetIndex !== r.datasetIndex || s.index !== r.index)
      return !1;
  return !0;
}
function Mn(n) {
  if (X(n))
    return n.map(Mn);
  if (E(n)) {
    const t = /* @__PURE__ */ Object.create(null), e = Object.keys(n), i = e.length;
    let s = 0;
    for (; s < i; ++s)
      t[e[s]] = Mn(n[e[s]]);
    return t;
  }
  return n;
}
function Lr(n) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(n) === -1;
}
function Ba(n, t, e, i) {
  if (!Lr(n))
    return;
  const s = t[n], r = e[n];
  E(s) && E(r) ? Be(s, r, i) : t[n] = Mn(r);
}
function Be(n, t, e) {
  const i = X(t) ? t : [
    t
  ], s = i.length;
  if (!E(n))
    return n;
  e = e || {};
  const r = e.merger || Ba;
  let o;
  for (let a = 0; a < s; ++a) {
    if (o = i[a], !E(o))
      continue;
    const c = Object.keys(o);
    for (let l = 0, h = c.length; l < h; ++l)
      r(c[l], n, o, e);
  }
  return n;
}
function Ce(n, t) {
  return Be(n, t, {
    merger: Ya
  });
}
function Ya(n, t, e) {
  if (!Lr(n))
    return;
  const i = t[n], s = e[n];
  E(i) && E(s) ? Ce(i, s) : Object.prototype.hasOwnProperty.call(t, n) || (t[n] = Mn(s));
}
const os = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (n) => n,
  // default resolvers
  x: (n) => n.x,
  y: (n) => n.y
};
function ja(n) {
  const t = n.split("."), e = [];
  let i = "";
  for (const s of t)
    i += s, i.endsWith("\\") ? i = i.slice(0, -1) + "." : (e.push(i), i = "");
  return e;
}
function Va(n) {
  const t = ja(n);
  return (e) => {
    for (const i of t) {
      if (i === "")
        break;
      e = e && e[i];
    }
    return e;
  };
}
function kn(n, t) {
  return (os[t] || (os[t] = Va(t)))(n);
}
function Oi(n) {
  return n.charAt(0).toUpperCase() + n.slice(1);
}
const Dn = (n) => typeof n < "u", At = (n) => typeof n == "function", as = (n, t) => {
  if (n.size !== t.size)
    return !1;
  for (const e of n)
    if (!t.has(e))
      return !1;
  return !0;
};
function Ua(n) {
  return n.type === "mouseup" || n.type === "click" || n.type === "contextmenu";
}
const Z = Math.PI, ct = 2 * Z, qa = ct + Z, Pn = Number.POSITIVE_INFINITY, Xa = Z / 180, ot = Z / 2, zt = Z / 4, cs = Z * 2 / 3, Fr = Math.log10, le = Math.sign;
function Ae(n, t, e) {
  return Math.abs(n - t) < e;
}
function ls(n) {
  const t = Math.round(n);
  n = Ae(n, t, n / 1e3) ? t : n;
  const e = Math.pow(10, Math.floor(Fr(n))), i = n / e;
  return (i <= 1 ? 1 : i <= 2 ? 2 : i <= 5 ? 5 : 10) * e;
}
function Qa(n) {
  const t = [], e = Math.sqrt(n);
  let i;
  for (i = 1; i < e; i++)
    n % i === 0 && (t.push(i), t.push(n / i));
  return e === (e | 0) && t.push(e), t.sort((s, r) => s - r).pop(), t;
}
function Ga(n) {
  return typeof n == "symbol" || typeof n == "object" && n !== null && !(Symbol.toPrimitive in n || "toString" in n || "valueOf" in n);
}
function Ye(n) {
  return !Ga(n) && !isNaN(parseFloat(n)) && isFinite(n);
}
function Ka(n, t) {
  const e = Math.round(n);
  return e - t <= n && e + t >= n;
}
function Za(n, t, e) {
  let i, s, r;
  for (i = 0, s = n.length; i < s; i++)
    r = n[i][e], isNaN(r) || (t.min = Math.min(t.min, r), t.max = Math.max(t.max, r));
}
function Vt(n) {
  return n * (Z / 180);
}
function Ja(n) {
  return n * (180 / Z);
}
function hs(n) {
  if (!J(n))
    return;
  let t = 1, e = 0;
  for (; Math.round(n * t) / t !== n; )
    t *= 10, e++;
  return e;
}
function tc(n, t) {
  const e = t.x - n.x, i = t.y - n.y, s = Math.sqrt(e * e + i * i);
  let r = Math.atan2(i, e);
  return r < -0.5 * Z && (r += ct), {
    angle: r,
    distance: s
  };
}
function ci(n, t) {
  return Math.sqrt(Math.pow(t.x - n.x, 2) + Math.pow(t.y - n.y, 2));
}
function ec(n, t) {
  return (n - t + qa) % ct - Z;
}
function ft(n) {
  return (n % ct + ct) % ct;
}
function Rr(n, t, e, i) {
  const s = ft(n), r = ft(t), o = ft(e), a = ft(r - s), c = ft(o - s), l = ft(s - r), h = ft(s - o);
  return s === r || s === o || i && r === o || a > c && l < h;
}
function at(n, t, e) {
  return Math.max(t, Math.min(e, n));
}
function nc(n) {
  return at(n, -32768, 32767);
}
function se(n, t, e, i = 1e-6) {
  return n >= Math.min(t, e) - i && n <= Math.max(t, e) + i;
}
function Ti(n, t, e) {
  e = e || ((o) => n[o] < t);
  let i = n.length - 1, s = 0, r;
  for (; i - s > 1; )
    r = s + i >> 1, e(r) ? s = r : i = r;
  return {
    lo: s,
    hi: i
  };
}
const Ut = (n, t, e, i) => Ti(n, e, i ? (s) => {
  const r = n[s][t];
  return r < e || r === e && n[s + 1][t] === e;
} : (s) => n[s][t] < e), ic = (n, t, e) => Ti(n, e, (i) => n[i][t] >= e);
function sc(n, t, e) {
  let i = 0, s = n.length;
  for (; i < s && n[i] < t; )
    i++;
  for (; s > i && n[s - 1] > e; )
    s--;
  return i > 0 || s < n.length ? n.slice(i, s) : n;
}
const zr = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function rc(n, t) {
  if (n._chartjs) {
    n._chartjs.listeners.push(t);
    return;
  }
  Object.defineProperty(n, "_chartjs", {
    configurable: !0,
    enumerable: !1,
    value: {
      listeners: [
        t
      ]
    }
  }), zr.forEach((e) => {
    const i = "_onData" + Oi(e), s = n[e];
    Object.defineProperty(n, e, {
      configurable: !0,
      enumerable: !1,
      value(...r) {
        const o = s.apply(this, r);
        return n._chartjs.listeners.forEach((a) => {
          typeof a[i] == "function" && a[i](...r);
        }), o;
      }
    });
  });
}
function us(n, t) {
  const e = n._chartjs;
  if (!e)
    return;
  const i = e.listeners, s = i.indexOf(t);
  s !== -1 && i.splice(s, 1), !(i.length > 0) && (zr.forEach((r) => {
    delete n[r];
  }), delete n._chartjs);
}
function oc(n) {
  const t = new Set(n);
  return t.size === n.length ? n : Array.from(t);
}
const Hr = (function() {
  return typeof window > "u" ? function(n) {
    return n();
  } : window.requestAnimationFrame;
})();
function Nr(n, t) {
  let e = [], i = !1;
  return function(...s) {
    e = s, i || (i = !0, Hr.call(window, () => {
      i = !1, n.apply(t, e);
    }));
  };
}
function ac(n, t) {
  let e;
  return function(...i) {
    return t ? (clearTimeout(e), e = setTimeout(n, t, i)) : n.apply(this, i), t;
  };
}
const Wr = (n) => n === "start" ? "left" : n === "end" ? "right" : "center", st = (n, t, e) => n === "start" ? t : n === "end" ? e : (t + e) / 2, cc = (n, t, e, i) => n === (i ? "left" : "right") ? e : n === "center" ? (t + e) / 2 : t;
function lc(n, t, e) {
  const i = t.length;
  let s = 0, r = i;
  if (n._sorted) {
    const { iScale: o, vScale: a, _parsed: c } = n, l = n.dataset && n.dataset.options ? n.dataset.options.spanGaps : null, h = o.axis, { min: u, max: d, minDefined: f, maxDefined: g } = o.getUserBounds();
    if (f) {
      if (s = Math.min(
        // @ts-expect-error Need to type _parsed
        Ut(c, h, u).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        e ? i : Ut(t, h, o.getPixelForValue(u)).lo
      ), l) {
        const m = c.slice(0, s + 1).reverse().findIndex((p) => !R(p[a.axis]));
        s -= Math.max(0, m);
      }
      s = at(s, 0, i - 1);
    }
    if (g) {
      let m = Math.max(
        // @ts-expect-error Need to type _parsed
        Ut(c, o.axis, d, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        e ? 0 : Ut(t, h, o.getPixelForValue(d), !0).hi + 1
      );
      if (l) {
        const p = c.slice(m - 1).findIndex((b) => !R(b[a.axis]));
        m += Math.max(0, p);
      }
      r = at(m, s, i) - s;
    } else
      r = i - s;
  }
  return {
    start: s,
    count: r
  };
}
function hc(n) {
  const { xScale: t, yScale: e, _scaleRanges: i } = n, s = {
    xmin: t.min,
    xmax: t.max,
    ymin: e.min,
    ymax: e.max
  };
  if (!i)
    return n._scaleRanges = s, !0;
  const r = i.xmin !== t.min || i.xmax !== t.max || i.ymin !== e.min || i.ymax !== e.max;
  return Object.assign(i, s), r;
}
const nn = (n) => n === 0 || n === 1, ds = (n, t, e) => -(Math.pow(2, 10 * (n -= 1)) * Math.sin((n - t) * ct / e)), fs = (n, t, e) => Math.pow(2, -10 * n) * Math.sin((n - t) * ct / e) + 1, Ee = {
  linear: (n) => n,
  easeInQuad: (n) => n * n,
  easeOutQuad: (n) => -n * (n - 2),
  easeInOutQuad: (n) => (n /= 0.5) < 1 ? 0.5 * n * n : -0.5 * (--n * (n - 2) - 1),
  easeInCubic: (n) => n * n * n,
  easeOutCubic: (n) => (n -= 1) * n * n + 1,
  easeInOutCubic: (n) => (n /= 0.5) < 1 ? 0.5 * n * n * n : 0.5 * ((n -= 2) * n * n + 2),
  easeInQuart: (n) => n * n * n * n,
  easeOutQuart: (n) => -((n -= 1) * n * n * n - 1),
  easeInOutQuart: (n) => (n /= 0.5) < 1 ? 0.5 * n * n * n * n : -0.5 * ((n -= 2) * n * n * n - 2),
  easeInQuint: (n) => n * n * n * n * n,
  easeOutQuint: (n) => (n -= 1) * n * n * n * n + 1,
  easeInOutQuint: (n) => (n /= 0.5) < 1 ? 0.5 * n * n * n * n * n : 0.5 * ((n -= 2) * n * n * n * n + 2),
  easeInSine: (n) => -Math.cos(n * ot) + 1,
  easeOutSine: (n) => Math.sin(n * ot),
  easeInOutSine: (n) => -0.5 * (Math.cos(Z * n) - 1),
  easeInExpo: (n) => n === 0 ? 0 : Math.pow(2, 10 * (n - 1)),
  easeOutExpo: (n) => n === 1 ? 1 : -Math.pow(2, -10 * n) + 1,
  easeInOutExpo: (n) => nn(n) ? n : n < 0.5 ? 0.5 * Math.pow(2, 10 * (n * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (n * 2 - 1)) + 2),
  easeInCirc: (n) => n >= 1 ? n : -(Math.sqrt(1 - n * n) - 1),
  easeOutCirc: (n) => Math.sqrt(1 - (n -= 1) * n),
  easeInOutCirc: (n) => (n /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - n * n) - 1) : 0.5 * (Math.sqrt(1 - (n -= 2) * n) + 1),
  easeInElastic: (n) => nn(n) ? n : ds(n, 0.075, 0.3),
  easeOutElastic: (n) => nn(n) ? n : fs(n, 0.075, 0.3),
  easeInOutElastic(n) {
    return nn(n) ? n : n < 0.5 ? 0.5 * ds(n * 2, 0.1125, 0.45) : 0.5 + 0.5 * fs(n * 2 - 1, 0.1125, 0.45);
  },
  easeInBack(n) {
    return n * n * ((1.70158 + 1) * n - 1.70158);
  },
  easeOutBack(n) {
    return (n -= 1) * n * ((1.70158 + 1) * n + 1.70158) + 1;
  },
  easeInOutBack(n) {
    let t = 1.70158;
    return (n /= 0.5) < 1 ? 0.5 * (n * n * (((t *= 1.525) + 1) * n - t)) : 0.5 * ((n -= 2) * n * (((t *= 1.525) + 1) * n + t) + 2);
  },
  easeInBounce: (n) => 1 - Ee.easeOutBounce(1 - n),
  easeOutBounce(n) {
    return n < 1 / 2.75 ? 7.5625 * n * n : n < 2 / 2.75 ? 7.5625 * (n -= 1.5 / 2.75) * n + 0.75 : n < 2.5 / 2.75 ? 7.5625 * (n -= 2.25 / 2.75) * n + 0.9375 : 7.5625 * (n -= 2.625 / 2.75) * n + 0.984375;
  },
  easeInOutBounce: (n) => n < 0.5 ? Ee.easeInBounce(n * 2) * 0.5 : Ee.easeOutBounce(n * 2 - 1) * 0.5 + 0.5
};
function Ci(n) {
  if (n && typeof n == "object") {
    const t = n.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function gs(n) {
  return Ci(n) ? n : new We(n);
}
function Un(n) {
  return Ci(n) ? n : new We(n).saturate(0.5).darken(0.1).hexString();
}
const uc = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], dc = [
  "color",
  "borderColor",
  "backgroundColor"
];
function fc(n) {
  n.set("animation", {
    delay: void 0,
    duration: 1e3,
    easing: "easeOutQuart",
    fn: void 0,
    from: void 0,
    loop: void 0,
    to: void 0,
    type: void 0
  }), n.describe("animation", {
    _fallback: !1,
    _indexable: !1,
    _scriptable: (t) => t !== "onProgress" && t !== "onComplete" && t !== "fn"
  }), n.set("animations", {
    colors: {
      type: "color",
      properties: dc
    },
    numbers: {
      type: "number",
      properties: uc
    }
  }), n.describe("animations", {
    _fallback: "animation"
  }), n.set("transitions", {
    active: {
      animation: {
        duration: 400
      }
    },
    resize: {
      animation: {
        duration: 0
      }
    },
    show: {
      animations: {
        colors: {
          from: "transparent"
        },
        visible: {
          type: "boolean",
          duration: 0
        }
      }
    },
    hide: {
      animations: {
        colors: {
          to: "transparent"
        },
        visible: {
          type: "boolean",
          easing: "linear",
          fn: (t) => t | 0
        }
      }
    }
  });
}
function gc(n) {
  n.set("layout", {
    autoPadding: !0,
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  });
}
const ms = /* @__PURE__ */ new Map();
function mc(n, t) {
  t = t || {};
  const e = n + JSON.stringify(t);
  let i = ms.get(e);
  return i || (i = new Intl.NumberFormat(n, t), ms.set(e, i)), i;
}
function Br(n, t, e) {
  return mc(t, e).format(n);
}
const pc = {
  values(n) {
    return X(n) ? n : "" + n;
  },
  numeric(n, t, e) {
    if (n === 0)
      return "0";
    const i = this.chart.options.locale;
    let s, r = n;
    if (e.length > 1) {
      const l = Math.max(Math.abs(e[0].value), Math.abs(e[e.length - 1].value));
      (l < 1e-4 || l > 1e15) && (s = "scientific"), r = bc(n, e);
    }
    const o = Fr(Math.abs(r)), a = isNaN(o) ? 1 : Math.max(Math.min(-1 * Math.floor(o), 20), 0), c = {
      notation: s,
      minimumFractionDigits: a,
      maximumFractionDigits: a
    };
    return Object.assign(c, this.options.ticks.format), Br(n, i, c);
  }
};
function bc(n, t) {
  let e = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(e) >= 1 && n !== Math.floor(n) && (e = n - Math.floor(n)), e;
}
var Yr = {
  formatters: pc
};
function yc(n) {
  n.set("scale", {
    display: !0,
    offset: !1,
    reverse: !1,
    beginAtZero: !1,
    bounds: "ticks",
    clip: !0,
    grace: 0,
    grid: {
      display: !0,
      lineWidth: 1,
      drawOnChartArea: !0,
      drawTicks: !0,
      tickLength: 8,
      tickWidth: (t, e) => e.lineWidth,
      tickColor: (t, e) => e.color,
      offset: !1
    },
    border: {
      display: !0,
      dash: [],
      dashOffset: 0,
      width: 1
    },
    title: {
      display: !1,
      text: "",
      padding: {
        top: 4,
        bottom: 4
      }
    },
    ticks: {
      minRotation: 0,
      maxRotation: 50,
      mirror: !1,
      textStrokeWidth: 0,
      textStrokeColor: "",
      padding: 3,
      display: !0,
      autoSkip: !0,
      autoSkipPadding: 3,
      labelOffset: 0,
      callback: Yr.formatters.values,
      minor: {},
      major: {},
      align: "center",
      crossAlign: "near",
      showLabelBackdrop: !1,
      backdropColor: "rgba(255, 255, 255, 0.75)",
      backdropPadding: 2
    }
  }), n.route("scale.ticks", "color", "", "color"), n.route("scale.grid", "color", "", "borderColor"), n.route("scale.border", "color", "", "borderColor"), n.route("scale.title", "color", "", "color"), n.describe("scale", {
    _fallback: !1,
    _scriptable: (t) => !t.startsWith("before") && !t.startsWith("after") && t !== "callback" && t !== "parser",
    _indexable: (t) => t !== "borderDash" && t !== "tickBorderDash" && t !== "dash"
  }), n.describe("scales", {
    _fallback: "scale"
  }), n.describe("scale.ticks", {
    _scriptable: (t) => t !== "backdropPadding" && t !== "callback",
    _indexable: (t) => t !== "backdropPadding"
  });
}
const Gt = /* @__PURE__ */ Object.create(null), li = /* @__PURE__ */ Object.create(null);
function $e(n, t) {
  if (!t)
    return n;
  const e = t.split(".");
  for (let i = 0, s = e.length; i < s; ++i) {
    const r = e[i];
    n = n[r] || (n[r] = /* @__PURE__ */ Object.create(null));
  }
  return n;
}
function qn(n, t, e) {
  return typeof t == "string" ? Be($e(n, t), e) : Be($e(n, ""), t);
}
class _c {
  constructor(t, e) {
    this.animation = void 0, this.backgroundColor = "rgba(0,0,0,0.1)", this.borderColor = "rgba(0,0,0,0.1)", this.color = "#666", this.datasets = {}, this.devicePixelRatio = (i) => i.chart.platform.getDevicePixelRatio(), this.elements = {}, this.events = [
      "mousemove",
      "mouseout",
      "click",
      "touchstart",
      "touchmove"
    ], this.font = {
      family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      size: 12,
      style: "normal",
      lineHeight: 1.2,
      weight: null
    }, this.hover = {}, this.hoverBackgroundColor = (i, s) => Un(s.backgroundColor), this.hoverBorderColor = (i, s) => Un(s.borderColor), this.hoverColor = (i, s) => Un(s.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(e);
  }
  set(t, e) {
    return qn(this, t, e);
  }
  get(t) {
    return $e(this, t);
  }
  describe(t, e) {
    return qn(li, t, e);
  }
  override(t, e) {
    return qn(Gt, t, e);
  }
  route(t, e, i, s) {
    const r = $e(this, t), o = $e(this, i), a = "_" + e;
    Object.defineProperties(r, {
      [a]: {
        value: r[e],
        writable: !0
      },
      [e]: {
        enumerable: !0,
        get() {
          const c = this[a], l = o[s];
          return E(c) ? Object.assign({}, l, c) : A(c, l);
        },
        set(c) {
          this[a] = c;
        }
      }
    });
  }
  apply(t) {
    t.forEach((e) => e(this));
  }
}
var B = /* @__PURE__ */ new _c({
  _scriptable: (n) => !n.startsWith("on"),
  _indexable: (n) => n !== "events",
  hover: {
    _fallback: "interaction"
  },
  interaction: {
    _scriptable: !1,
    _indexable: !1
  }
}, [
  fc,
  gc,
  yc
]);
function xc(n) {
  return !n || R(n.size) || R(n.family) ? null : (n.style ? n.style + " " : "") + (n.weight ? n.weight + " " : "") + n.size + "px " + n.family;
}
function ps(n, t, e, i, s) {
  let r = t[s];
  return r || (r = t[s] = n.measureText(s).width, e.push(s)), r > i && (i = r), i;
}
function Ht(n, t, e) {
  const i = n.currentDevicePixelRatio, s = e !== 0 ? Math.max(e / 2, 0.5) : 0;
  return Math.round((t - s) * i) / i + s;
}
function bs(n, t) {
  !t && !n || (t = t || n.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, n.width, n.height), t.restore());
}
function hi(n, t, e, i) {
  jr(n, t, e, i, null);
}
function jr(n, t, e, i, s) {
  let r, o, a, c, l, h, u, d;
  const f = t.pointStyle, g = t.rotation, m = t.radius;
  let p = (g || 0) * Xa;
  if (f && typeof f == "object" && (r = f.toString(), r === "[object HTMLImageElement]" || r === "[object HTMLCanvasElement]")) {
    n.save(), n.translate(e, i), n.rotate(p), n.drawImage(f, -f.width / 2, -f.height / 2, f.width, f.height), n.restore();
    return;
  }
  if (!(isNaN(m) || m <= 0)) {
    switch (n.beginPath(), f) {
      // Default includes circle
      default:
        s ? n.ellipse(e, i, s / 2, m, 0, 0, ct) : n.arc(e, i, m, 0, ct), n.closePath();
        break;
      case "triangle":
        h = s ? s / 2 : m, n.moveTo(e + Math.sin(p) * h, i - Math.cos(p) * m), p += cs, n.lineTo(e + Math.sin(p) * h, i - Math.cos(p) * m), p += cs, n.lineTo(e + Math.sin(p) * h, i - Math.cos(p) * m), n.closePath();
        break;
      case "rectRounded":
        l = m * 0.516, c = m - l, o = Math.cos(p + zt) * c, u = Math.cos(p + zt) * (s ? s / 2 - l : c), a = Math.sin(p + zt) * c, d = Math.sin(p + zt) * (s ? s / 2 - l : c), n.arc(e - u, i - a, l, p - Z, p - ot), n.arc(e + d, i - o, l, p - ot, p), n.arc(e + u, i + a, l, p, p + ot), n.arc(e - d, i + o, l, p + ot, p + Z), n.closePath();
        break;
      case "rect":
        if (!g) {
          c = Math.SQRT1_2 * m, h = s ? s / 2 : c, n.rect(e - h, i - c, 2 * h, 2 * c);
          break;
        }
        p += zt;
      /* falls through */
      case "rectRot":
        u = Math.cos(p) * (s ? s / 2 : m), o = Math.cos(p) * m, a = Math.sin(p) * m, d = Math.sin(p) * (s ? s / 2 : m), n.moveTo(e - u, i - a), n.lineTo(e + d, i - o), n.lineTo(e + u, i + a), n.lineTo(e - d, i + o), n.closePath();
        break;
      case "crossRot":
        p += zt;
      /* falls through */
      case "cross":
        u = Math.cos(p) * (s ? s / 2 : m), o = Math.cos(p) * m, a = Math.sin(p) * m, d = Math.sin(p) * (s ? s / 2 : m), n.moveTo(e - u, i - a), n.lineTo(e + u, i + a), n.moveTo(e + d, i - o), n.lineTo(e - d, i + o);
        break;
      case "star":
        u = Math.cos(p) * (s ? s / 2 : m), o = Math.cos(p) * m, a = Math.sin(p) * m, d = Math.sin(p) * (s ? s / 2 : m), n.moveTo(e - u, i - a), n.lineTo(e + u, i + a), n.moveTo(e + d, i - o), n.lineTo(e - d, i + o), p += zt, u = Math.cos(p) * (s ? s / 2 : m), o = Math.cos(p) * m, a = Math.sin(p) * m, d = Math.sin(p) * (s ? s / 2 : m), n.moveTo(e - u, i - a), n.lineTo(e + u, i + a), n.moveTo(e + d, i - o), n.lineTo(e - d, i + o);
        break;
      case "line":
        o = s ? s / 2 : Math.cos(p) * m, a = Math.sin(p) * m, n.moveTo(e - o, i - a), n.lineTo(e + o, i + a);
        break;
      case "dash":
        n.moveTo(e, i), n.lineTo(e + Math.cos(p) * (s ? s / 2 : m), i + Math.sin(p) * m);
        break;
      case !1:
        n.closePath();
        break;
    }
    n.fill(), t.borderWidth > 0 && n.stroke();
  }
}
function je(n, t, e) {
  return e = e || 0.5, !t || n && n.x > t.left - e && n.x < t.right + e && n.y > t.top - e && n.y < t.bottom + e;
}
function In(n, t) {
  n.save(), n.beginPath(), n.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), n.clip();
}
function Ln(n) {
  n.restore();
}
function wc(n, t, e, i, s) {
  if (!t)
    return n.lineTo(e.x, e.y);
  if (s === "middle") {
    const r = (t.x + e.x) / 2;
    n.lineTo(r, t.y), n.lineTo(r, e.y);
  } else s === "after" != !!i ? n.lineTo(t.x, e.y) : n.lineTo(e.x, t.y);
  n.lineTo(e.x, e.y);
}
function vc(n, t, e, i) {
  if (!t)
    return n.lineTo(e.x, e.y);
  n.bezierCurveTo(i ? t.cp1x : t.cp2x, i ? t.cp1y : t.cp2y, i ? e.cp2x : e.cp1x, i ? e.cp2y : e.cp1y, e.x, e.y);
}
function Mc(n, t) {
  t.translation && n.translate(t.translation[0], t.translation[1]), R(t.rotation) || n.rotate(t.rotation), t.color && (n.fillStyle = t.color), t.textAlign && (n.textAlign = t.textAlign), t.textBaseline && (n.textBaseline = t.textBaseline);
}
function kc(n, t, e, i, s) {
  if (s.strikethrough || s.underline) {
    const r = n.measureText(i), o = t - r.actualBoundingBoxLeft, a = t + r.actualBoundingBoxRight, c = e - r.actualBoundingBoxAscent, l = e + r.actualBoundingBoxDescent, h = s.strikethrough ? (c + l) / 2 : l;
    n.strokeStyle = n.fillStyle, n.beginPath(), n.lineWidth = s.decorationWidth || 2, n.moveTo(o, h), n.lineTo(a, h), n.stroke();
  }
}
function Dc(n, t) {
  const e = n.fillStyle;
  n.fillStyle = t.color, n.fillRect(t.left, t.top, t.width, t.height), n.fillStyle = e;
}
function Sn(n, t, e, i, s, r = {}) {
  const o = X(t) ? t : [
    t
  ], a = r.strokeWidth > 0 && r.strokeColor !== "";
  let c, l;
  for (n.save(), n.font = s.string, Mc(n, r), c = 0; c < o.length; ++c)
    l = o[c], r.backdrop && Dc(n, r.backdrop), a && (r.strokeColor && (n.strokeStyle = r.strokeColor), R(r.strokeWidth) || (n.lineWidth = r.strokeWidth), n.strokeText(l, e, i, r.maxWidth)), n.fillText(l, e, i, r.maxWidth), kc(n, e, i, l, r), i += Number(s.lineHeight);
  n.restore();
}
function ui(n, t) {
  const { x: e, y: i, w: s, h: r, radius: o } = t;
  n.arc(e + o.topLeft, i + o.topLeft, o.topLeft, 1.5 * Z, Z, !0), n.lineTo(e, i + r - o.bottomLeft), n.arc(e + o.bottomLeft, i + r - o.bottomLeft, o.bottomLeft, Z, ot, !0), n.lineTo(e + s - o.bottomRight, i + r), n.arc(e + s - o.bottomRight, i + r - o.bottomRight, o.bottomRight, ot, 0, !0), n.lineTo(e + s, i + o.topRight), n.arc(e + s - o.topRight, i + o.topRight, o.topRight, 0, -ot, !0), n.lineTo(e + o.topLeft, i);
}
const Pc = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, Sc = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function Oc(n, t) {
  const e = ("" + n).match(Pc);
  if (!e || e[1] === "normal")
    return t * 1.2;
  switch (n = +e[2], e[3]) {
    case "px":
      return n;
    case "%":
      n /= 100;
      break;
  }
  return t * n;
}
const Tc = (n) => +n || 0;
function Vr(n, t) {
  const e = {}, i = E(t), s = i ? Object.keys(t) : t, r = E(n) ? i ? (o) => A(n[o], n[t[o]]) : (o) => n[o] : () => n;
  for (const o of s)
    e[o] = Tc(r(o));
  return e;
}
function Cc(n) {
  return Vr(n, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function Ie(n) {
  return Vr(n, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function lt(n) {
  const t = Cc(n);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function it(n, t) {
  n = n || {}, t = t || B.font;
  let e = A(n.size, t.size);
  typeof e == "string" && (e = parseInt(e, 10));
  let i = A(n.style, t.style);
  i && !("" + i).match(Sc) && (console.warn('Invalid font style specified: "' + i + '"'), i = void 0);
  const s = {
    family: A(n.family, t.family),
    lineHeight: Oc(A(n.lineHeight, t.lineHeight), e),
    size: e,
    style: i,
    weight: A(n.weight, t.weight),
    string: ""
  };
  return s.string = xc(s), s;
}
function sn(n, t, e, i) {
  let s, r, o;
  for (s = 0, r = n.length; s < r; ++s)
    if (o = n[s], o !== void 0 && o !== void 0)
      return o;
}
function Ac(n, t, e) {
  const { min: i, max: s } = n, r = Wa(t, (s - i) / 2), o = (a, c) => e && a === 0 ? 0 : a + c;
  return {
    min: o(i, -Math.abs(r)),
    max: o(s, r)
  };
}
function Kt(n, t) {
  return Object.assign(Object.create(n), t);
}
function Ai(n, t = [
  ""
], e, i, s = () => n[0]) {
  const r = e || n;
  typeof i > "u" && (i = Qr("_fallback", n));
  const o = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: n,
    _rootScopes: r,
    _fallback: i,
    _getTarget: s,
    override: (a) => Ai([
      a,
      ...n
    ], t, r, i)
  };
  return new Proxy(o, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(a, c) {
      return delete a[c], delete a._keys, delete n[0][c], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(a, c) {
      return qr(a, c, () => Hc(c, t, n, a));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(a, c) {
      return Reflect.getOwnPropertyDescriptor(a._scopes[0], c);
    },
    /**
    * A trap for Object.getPrototypeOf.
    */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(n[0]);
    },
    /**
    * A trap for the in operator.
    */
    has(a, c) {
      return _s(a).includes(c);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(a) {
      return _s(a);
    },
    /**
    * A trap for setting property values.
    */
    set(a, c, l) {
      const h = a._storage || (a._storage = s());
      return a[c] = h[c] = l, delete a._keys, !0;
    }
  });
}
function he(n, t, e, i) {
  const s = {
    _cacheable: !1,
    _proxy: n,
    _context: t,
    _subProxy: e,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: Ur(n, i),
    setContext: (r) => he(n, r, e, i),
    override: (r) => he(n.override(r), t, e, i)
  };
  return new Proxy(s, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(r, o) {
      return delete r[o], delete n[o], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(r, o, a) {
      return qr(r, o, () => $c(r, o, a));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(r, o) {
      return r._descriptors.allKeys ? Reflect.has(n, o) ? {
        enumerable: !0,
        configurable: !0
      } : void 0 : Reflect.getOwnPropertyDescriptor(n, o);
    },
    /**
    * A trap for Object.getPrototypeOf.
    */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(n);
    },
    /**
    * A trap for the in operator.
    */
    has(r, o) {
      return Reflect.has(n, o);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys() {
      return Reflect.ownKeys(n);
    },
    /**
    * A trap for setting property values.
    */
    set(r, o, a) {
      return n[o] = a, delete r[o], !0;
    }
  });
}
function Ur(n, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: e = t.scriptable, _indexable: i = t.indexable, _allKeys: s = t.allKeys } = n;
  return {
    allKeys: s,
    scriptable: e,
    indexable: i,
    isScriptable: At(e) ? e : () => e,
    isIndexable: At(i) ? i : () => i
  };
}
const Ec = (n, t) => n ? n + Oi(t) : t, Ei = (n, t) => E(t) && n !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function qr(n, t, e) {
  if (Object.prototype.hasOwnProperty.call(n, t) || t === "constructor")
    return n[t];
  const i = e();
  return n[t] = i, i;
}
function $c(n, t, e) {
  const { _proxy: i, _context: s, _subProxy: r, _descriptors: o } = n;
  let a = i[t];
  return At(a) && o.isScriptable(t) && (a = Ic(t, a, n, e)), X(a) && a.length && (a = Lc(t, a, n, o.isIndexable)), Ei(t, a) && (a = he(a, s, r && r[t], o)), a;
}
function Ic(n, t, e, i) {
  const { _proxy: s, _context: r, _subProxy: o, _stack: a } = e;
  if (a.has(n))
    throw new Error("Recursion detected: " + Array.from(a).join("->") + "->" + n);
  a.add(n);
  let c = t(r, o || i);
  return a.delete(n), Ei(n, c) && (c = $i(s._scopes, s, n, c)), c;
}
function Lc(n, t, e, i) {
  const { _proxy: s, _context: r, _subProxy: o, _descriptors: a } = e;
  if (typeof r.index < "u" && i(n))
    return t[r.index % t.length];
  if (E(t[0])) {
    const c = t, l = s._scopes.filter((h) => h !== c);
    t = [];
    for (const h of c) {
      const u = $i(l, s, n, h);
      t.push(he(u, r, o && o[n], a));
    }
  }
  return t;
}
function Xr(n, t, e) {
  return At(n) ? n(t, e) : n;
}
const Fc = (n, t) => n === !0 ? t : typeof n == "string" ? kn(t, n) : void 0;
function Rc(n, t, e, i, s) {
  for (const r of t) {
    const o = Fc(e, r);
    if (o) {
      n.add(o);
      const a = Xr(o._fallback, e, s);
      if (typeof a < "u" && a !== e && a !== i)
        return a;
    } else if (o === !1 && typeof i < "u" && e !== i)
      return null;
  }
  return !1;
}
function $i(n, t, e, i) {
  const s = t._rootScopes, r = Xr(t._fallback, e, i), o = [
    ...n,
    ...s
  ], a = /* @__PURE__ */ new Set();
  a.add(i);
  let c = ys(a, o, e, r || e, i);
  return c === null || typeof r < "u" && r !== e && (c = ys(a, o, r, c, i), c === null) ? !1 : Ai(Array.from(a), [
    ""
  ], s, r, () => zc(t, e, i));
}
function ys(n, t, e, i, s) {
  for (; e; )
    e = Rc(n, t, e, i, s);
  return e;
}
function zc(n, t, e) {
  const i = n._getTarget();
  t in i || (i[t] = {});
  const s = i[t];
  return X(s) && E(e) ? e : s || {};
}
function Hc(n, t, e, i) {
  let s;
  for (const r of t)
    if (s = Qr(Ec(r, n), e), typeof s < "u")
      return Ei(n, s) ? $i(e, i, n, s) : s;
}
function Qr(n, t) {
  for (const e of t) {
    if (!e)
      continue;
    const i = e[n];
    if (typeof i < "u")
      return i;
  }
}
function _s(n) {
  let t = n._keys;
  return t || (t = n._keys = Nc(n._scopes)), t;
}
function Nc(n) {
  const t = /* @__PURE__ */ new Set();
  for (const e of n)
    for (const i of Object.keys(e).filter((s) => !s.startsWith("_")))
      t.add(i);
  return Array.from(t);
}
const Wc = Number.EPSILON || 1e-14, ue = (n, t) => t < n.length && !n[t].skip && n[t], Gr = (n) => n === "x" ? "y" : "x";
function Bc(n, t, e, i) {
  const s = n.skip ? t : n, r = t, o = e.skip ? t : e, a = ci(r, s), c = ci(o, r);
  let l = a / (a + c), h = c / (a + c);
  l = isNaN(l) ? 0 : l, h = isNaN(h) ? 0 : h;
  const u = i * l, d = i * h;
  return {
    previous: {
      x: r.x - u * (o.x - s.x),
      y: r.y - u * (o.y - s.y)
    },
    next: {
      x: r.x + d * (o.x - s.x),
      y: r.y + d * (o.y - s.y)
    }
  };
}
function Yc(n, t, e) {
  const i = n.length;
  let s, r, o, a, c, l = ue(n, 0);
  for (let h = 0; h < i - 1; ++h)
    if (c = l, l = ue(n, h + 1), !(!c || !l)) {
      if (Ae(t[h], 0, Wc)) {
        e[h] = e[h + 1] = 0;
        continue;
      }
      s = e[h] / t[h], r = e[h + 1] / t[h], a = Math.pow(s, 2) + Math.pow(r, 2), !(a <= 9) && (o = 3 / Math.sqrt(a), e[h] = s * o * t[h], e[h + 1] = r * o * t[h]);
    }
}
function jc(n, t, e = "x") {
  const i = Gr(e), s = n.length;
  let r, o, a, c = ue(n, 0);
  for (let l = 0; l < s; ++l) {
    if (o = a, a = c, c = ue(n, l + 1), !a)
      continue;
    const h = a[e], u = a[i];
    o && (r = (h - o[e]) / 3, a[`cp1${e}`] = h - r, a[`cp1${i}`] = u - r * t[l]), c && (r = (c[e] - h) / 3, a[`cp2${e}`] = h + r, a[`cp2${i}`] = u + r * t[l]);
  }
}
function Vc(n, t = "x") {
  const e = Gr(t), i = n.length, s = Array(i).fill(0), r = Array(i);
  let o, a, c, l = ue(n, 0);
  for (o = 0; o < i; ++o)
    if (a = c, c = l, l = ue(n, o + 1), !!c) {
      if (l) {
        const h = l[t] - c[t];
        s[o] = h !== 0 ? (l[e] - c[e]) / h : 0;
      }
      r[o] = a ? l ? le(s[o - 1]) !== le(s[o]) ? 0 : (s[o - 1] + s[o]) / 2 : s[o - 1] : s[o];
    }
  Yc(n, s, r), jc(n, r, t);
}
function rn(n, t, e) {
  return Math.max(Math.min(n, e), t);
}
function Uc(n, t) {
  let e, i, s, r, o, a = je(n[0], t);
  for (e = 0, i = n.length; e < i; ++e)
    o = r, r = a, a = e < i - 1 && je(n[e + 1], t), r && (s = n[e], o && (s.cp1x = rn(s.cp1x, t.left, t.right), s.cp1y = rn(s.cp1y, t.top, t.bottom)), a && (s.cp2x = rn(s.cp2x, t.left, t.right), s.cp2y = rn(s.cp2y, t.top, t.bottom)));
}
function qc(n, t, e, i, s) {
  let r, o, a, c;
  if (t.spanGaps && (n = n.filter((l) => !l.skip)), t.cubicInterpolationMode === "monotone")
    Vc(n, s);
  else {
    let l = i ? n[n.length - 1] : n[0];
    for (r = 0, o = n.length; r < o; ++r)
      a = n[r], c = Bc(l, a, n[Math.min(r + 1, o - (i ? 0 : 1)) % o], t.tension), a.cp1x = c.previous.x, a.cp1y = c.previous.y, a.cp2x = c.next.x, a.cp2y = c.next.y, l = a;
  }
  t.capBezierPoints && Uc(n, e);
}
function Ii() {
  return typeof window < "u" && typeof document < "u";
}
function Li(n) {
  let t = n.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function On(n, t, e) {
  let i;
  return typeof n == "string" ? (i = parseInt(n, 10), n.indexOf("%") !== -1 && (i = i / 100 * t.parentNode[e])) : i = n, i;
}
const Fn = (n) => n.ownerDocument.defaultView.getComputedStyle(n, null);
function Xc(n, t) {
  return Fn(n).getPropertyValue(t);
}
const Qc = [
  "top",
  "right",
  "bottom",
  "left"
];
function Xt(n, t, e) {
  const i = {};
  e = e ? "-" + e : "";
  for (let s = 0; s < 4; s++) {
    const r = Qc[s];
    i[r] = parseFloat(n[t + "-" + r + e]) || 0;
  }
  return i.width = i.left + i.right, i.height = i.top + i.bottom, i;
}
const Gc = (n, t, e) => (n > 0 || t > 0) && (!e || !e.shadowRoot);
function Kc(n, t) {
  const e = n.touches, i = e && e.length ? e[0] : n, { offsetX: s, offsetY: r } = i;
  let o = !1, a, c;
  if (Gc(s, r, n.target))
    a = s, c = r;
  else {
    const l = t.getBoundingClientRect();
    a = i.clientX - l.left, c = i.clientY - l.top, o = !0;
  }
  return {
    x: a,
    y: c,
    box: o
  };
}
function Wt(n, t) {
  if ("native" in n)
    return n;
  const { canvas: e, currentDevicePixelRatio: i } = t, s = Fn(e), r = s.boxSizing === "border-box", o = Xt(s, "padding"), a = Xt(s, "border", "width"), { x: c, y: l, box: h } = Kc(n, e), u = o.left + (h && a.left), d = o.top + (h && a.top);
  let { width: f, height: g } = t;
  return r && (f -= o.width + a.width, g -= o.height + a.height), {
    x: Math.round((c - u) / f * e.width / i),
    y: Math.round((l - d) / g * e.height / i)
  };
}
function Zc(n, t, e) {
  let i, s;
  if (t === void 0 || e === void 0) {
    const r = n && Li(n);
    if (!r)
      t = n.clientWidth, e = n.clientHeight;
    else {
      const o = r.getBoundingClientRect(), a = Fn(r), c = Xt(a, "border", "width"), l = Xt(a, "padding");
      t = o.width - l.width - c.width, e = o.height - l.height - c.height, i = On(a.maxWidth, r, "clientWidth"), s = On(a.maxHeight, r, "clientHeight");
    }
  }
  return {
    width: t,
    height: e,
    maxWidth: i || Pn,
    maxHeight: s || Pn
  };
}
const Pt = (n) => Math.round(n * 10) / 10;
function Jc(n, t, e, i) {
  const s = Fn(n), r = Xt(s, "margin"), o = On(s.maxWidth, n, "clientWidth") || Pn, a = On(s.maxHeight, n, "clientHeight") || Pn, c = Zc(n, t, e);
  let { width: l, height: h } = c;
  if (s.boxSizing === "content-box") {
    const d = Xt(s, "border", "width"), f = Xt(s, "padding");
    l -= f.width + d.width, h -= f.height + d.height;
  }
  return l = Math.max(0, l - r.width), h = Math.max(0, i ? l / i : h - r.height), l = Pt(Math.min(l, o, c.maxWidth)), h = Pt(Math.min(h, a, c.maxHeight)), l && !h && (h = Pt(l / 2)), (t !== void 0 || e !== void 0) && i && c.height && h > c.height && (h = c.height, l = Pt(Math.floor(h * i))), {
    width: l,
    height: h
  };
}
function xs(n, t, e) {
  const i = t || 1, s = Pt(n.height * i), r = Pt(n.width * i);
  n.height = Pt(n.height), n.width = Pt(n.width);
  const o = n.canvas;
  return o.style && (e || !o.style.height && !o.style.width) && (o.style.height = `${n.height}px`, o.style.width = `${n.width}px`), n.currentDevicePixelRatio !== i || o.height !== s || o.width !== r ? (n.currentDevicePixelRatio = i, o.height = s, o.width = r, n.ctx.setTransform(i, 0, 0, i, 0, 0), !0) : !1;
}
const tl = (function() {
  let n = !1;
  try {
    const t = {
      get passive() {
        return n = !0, !1;
      }
    };
    Ii() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return n;
})();
function ws(n, t) {
  const e = Xc(n, t), i = e && e.match(/^(\d+)(\.\d+)?px$/);
  return i ? +i[1] : void 0;
}
function Bt(n, t, e, i) {
  return {
    x: n.x + e * (t.x - n.x),
    y: n.y + e * (t.y - n.y)
  };
}
function el(n, t, e, i) {
  return {
    x: n.x + e * (t.x - n.x),
    y: i === "middle" ? e < 0.5 ? n.y : t.y : i === "after" ? e < 1 ? n.y : t.y : e > 0 ? t.y : n.y
  };
}
function nl(n, t, e, i) {
  const s = {
    x: n.cp2x,
    y: n.cp2y
  }, r = {
    x: t.cp1x,
    y: t.cp1y
  }, o = Bt(n, s, e), a = Bt(s, r, e), c = Bt(r, t, e), l = Bt(o, a, e), h = Bt(a, c, e);
  return Bt(l, h, e);
}
const il = function(n, t) {
  return {
    x(e) {
      return n + n + t - e;
    },
    setWidth(e) {
      t = e;
    },
    textAlign(e) {
      return e === "center" ? e : e === "right" ? "left" : "right";
    },
    xPlus(e, i) {
      return e - i;
    },
    leftForLtr(e, i) {
      return e - i;
    }
  };
}, sl = function() {
  return {
    x(n) {
      return n;
    },
    setWidth(n) {
    },
    textAlign(n) {
      return n;
    },
    xPlus(n, t) {
      return n + t;
    },
    leftForLtr(n, t) {
      return n;
    }
  };
};
function re(n, t, e) {
  return n ? il(t, e) : sl();
}
function Kr(n, t) {
  let e, i;
  (t === "ltr" || t === "rtl") && (e = n.canvas.style, i = [
    e.getPropertyValue("direction"),
    e.getPropertyPriority("direction")
  ], e.setProperty("direction", t, "important"), n.prevTextDirection = i);
}
function Zr(n, t) {
  t !== void 0 && (delete n.prevTextDirection, n.canvas.style.setProperty("direction", t[0], t[1]));
}
function Jr(n) {
  return n === "angle" ? {
    between: Rr,
    compare: ec,
    normalize: ft
  } : {
    between: se,
    compare: (t, e) => t - e,
    normalize: (t) => t
  };
}
function vs({ start: n, end: t, count: e, loop: i, style: s }) {
  return {
    start: n % e,
    end: t % e,
    loop: i && (t - n + 1) % e === 0,
    style: s
  };
}
function rl(n, t, e) {
  const { property: i, start: s, end: r } = e, { between: o, normalize: a } = Jr(i), c = t.length;
  let { start: l, end: h, loop: u } = n, d, f;
  if (u) {
    for (l += c, h += c, d = 0, f = c; d < f && o(a(t[l % c][i]), s, r); ++d)
      l--, h--;
    l %= c, h %= c;
  }
  return h < l && (h += c), {
    start: l,
    end: h,
    loop: u,
    style: n.style
  };
}
function to(n, t, e) {
  if (!e)
    return [
      n
    ];
  const { property: i, start: s, end: r } = e, o = t.length, { compare: a, between: c, normalize: l } = Jr(i), { start: h, end: u, loop: d, style: f } = rl(n, t, e), g = [];
  let m = !1, p = null, b, y, v;
  const M = () => c(s, v, b) && a(s, v) !== 0, _ = () => a(r, b) === 0 || c(r, v, b), D = () => m || M(), k = () => !m || _();
  for (let w = h, P = h; w <= u; ++w)
    y = t[w % o], !y.skip && (b = l(y[i]), b !== v && (m = c(b, s, r), p === null && D() && (p = a(b, s) === 0 ? w : P), p !== null && k() && (g.push(vs({
      start: p,
      end: w,
      loop: d,
      count: o,
      style: f
    })), p = null), P = w, v = b));
  return p !== null && g.push(vs({
    start: p,
    end: u,
    loop: d,
    count: o,
    style: f
  })), g;
}
function eo(n, t) {
  const e = [], i = n.segments;
  for (let s = 0; s < i.length; s++) {
    const r = to(i[s], n.points, t);
    r.length && e.push(...r);
  }
  return e;
}
function ol(n, t, e, i) {
  let s = 0, r = t - 1;
  if (e && !i)
    for (; s < t && !n[s].skip; )
      s++;
  for (; s < t && n[s].skip; )
    s++;
  for (s %= t, e && (r += s); r > s && n[r % t].skip; )
    r--;
  return r %= t, {
    start: s,
    end: r
  };
}
function al(n, t, e, i) {
  const s = n.length, r = [];
  let o = t, a = n[t], c;
  for (c = t + 1; c <= e; ++c) {
    const l = n[c % s];
    l.skip || l.stop ? a.skip || (i = !1, r.push({
      start: t % s,
      end: (c - 1) % s,
      loop: i
    }), t = o = l.stop ? c : null) : (o = c, a.skip && (t = c)), a = l;
  }
  return o !== null && r.push({
    start: t % s,
    end: o % s,
    loop: i
  }), r;
}
function cl(n, t) {
  const e = n.points, i = n.options.spanGaps, s = e.length;
  if (!s)
    return [];
  const r = !!n._loop, { start: o, end: a } = ol(e, s, r, i);
  if (i === !0)
    return Ms(n, [
      {
        start: o,
        end: a,
        loop: r
      }
    ], e, t);
  const c = a < o ? a + s : a, l = !!n._fullLoop && o === 0 && a === s - 1;
  return Ms(n, al(e, o, c, l), e, t);
}
function Ms(n, t, e, i) {
  return !i || !i.setContext || !e ? t : ll(n, t, e, i);
}
function ll(n, t, e, i) {
  const s = n._chart.getContext(), r = ks(n.options), { _datasetIndex: o, options: { spanGaps: a } } = n, c = e.length, l = [];
  let h = r, u = t[0].start, d = u;
  function f(g, m, p, b) {
    const y = a ? -1 : 1;
    if (g !== m) {
      for (g += c; e[g % c].skip; )
        g -= y;
      for (; e[m % c].skip; )
        m += y;
      g % c !== m % c && (l.push({
        start: g % c,
        end: m % c,
        loop: p,
        style: b
      }), h = b, u = m % c);
    }
  }
  for (const g of t) {
    u = a ? u : g.start;
    let m = e[u % c], p;
    for (d = u + 1; d <= g.end; d++) {
      const b = e[d % c];
      p = ks(i.setContext(Kt(s, {
        type: "segment",
        p0: m,
        p1: b,
        p0DataIndex: (d - 1) % c,
        p1DataIndex: d % c,
        datasetIndex: o
      }))), hl(p, h) && f(u, d - 1, g.loop, h), m = b, h = p;
    }
    u < d - 1 && f(u, d - 1, g.loop, h);
  }
  return l;
}
function ks(n) {
  return {
    backgroundColor: n.backgroundColor,
    borderCapStyle: n.borderCapStyle,
    borderDash: n.borderDash,
    borderDashOffset: n.borderDashOffset,
    borderJoinStyle: n.borderJoinStyle,
    borderWidth: n.borderWidth,
    borderColor: n.borderColor
  };
}
function hl(n, t) {
  if (!t)
    return !1;
  const e = [], i = function(s, r) {
    return Ci(r) ? (e.includes(r) || e.push(r), e.indexOf(r)) : r;
  };
  return JSON.stringify(n, i) !== JSON.stringify(t, i);
}
function on(n, t, e) {
  return n.options.clip ? n[e] : t[e];
}
function ul(n, t) {
  const { xScale: e, yScale: i } = n;
  return e && i ? {
    left: on(e, t, "left"),
    right: on(e, t, "right"),
    top: on(i, t, "top"),
    bottom: on(i, t, "bottom")
  } : t;
}
function no(n, t) {
  const e = t._clip;
  if (e.disabled)
    return !1;
  const i = ul(t, n.chartArea);
  return {
    left: e.left === !1 ? 0 : i.left - (e.left === !0 ? 0 : e.left),
    right: e.right === !1 ? n.width : i.right + (e.right === !0 ? 0 : e.right),
    top: e.top === !1 ? 0 : i.top - (e.top === !0 ? 0 : e.top),
    bottom: e.bottom === !1 ? n.height : i.bottom + (e.bottom === !0 ? 0 : e.bottom)
  };
}
/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */
class dl {
  constructor() {
    this._request = null, this._charts = /* @__PURE__ */ new Map(), this._running = !1, this._lastDate = void 0;
  }
  _notify(t, e, i, s) {
    const r = e.listeners[s], o = e.duration;
    r.forEach((a) => a({
      chart: t,
      initial: e.initial,
      numSteps: o,
      currentStep: Math.min(i - e.start, o)
    }));
  }
  _refresh() {
    this._request || (this._running = !0, this._request = Hr.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(t = Date.now()) {
    let e = 0;
    this._charts.forEach((i, s) => {
      if (!i.running || !i.items.length)
        return;
      const r = i.items;
      let o = r.length - 1, a = !1, c;
      for (; o >= 0; --o)
        c = r[o], c._active ? (c._total > i.duration && (i.duration = c._total), c.tick(t), a = !0) : (r[o] = r[r.length - 1], r.pop());
      a && (s.draw(), this._notify(s, i, t, "progress")), r.length || (i.running = !1, this._notify(s, i, t, "complete"), i.initial = !1), e += r.length;
    }), this._lastDate = t, e === 0 && (this._running = !1);
  }
  _getAnims(t) {
    const e = this._charts;
    let i = e.get(t);
    return i || (i = {
      running: !1,
      initial: !0,
      items: [],
      listeners: {
        complete: [],
        progress: []
      }
    }, e.set(t, i)), i;
  }
  listen(t, e, i) {
    this._getAnims(t).listeners[e].push(i);
  }
  add(t, e) {
    !e || !e.length || this._getAnims(t).items.push(...e);
  }
  has(t) {
    return this._getAnims(t).items.length > 0;
  }
  start(t) {
    const e = this._charts.get(t);
    e && (e.running = !0, e.start = Date.now(), e.duration = e.items.reduce((i, s) => Math.max(i, s._duration), 0), this._refresh());
  }
  running(t) {
    if (!this._running)
      return !1;
    const e = this._charts.get(t);
    return !(!e || !e.running || !e.items.length);
  }
  stop(t) {
    const e = this._charts.get(t);
    if (!e || !e.items.length)
      return;
    const i = e.items;
    let s = i.length - 1;
    for (; s >= 0; --s)
      i[s].cancel();
    e.items = [], this._notify(t, e, Date.now(), "complete");
  }
  remove(t) {
    return this._charts.delete(t);
  }
}
var yt = /* @__PURE__ */ new dl();
const Ds = "transparent", fl = {
  boolean(n, t, e) {
    return e > 0.5 ? t : n;
  },
  color(n, t, e) {
    const i = gs(n || Ds), s = i.valid && gs(t || Ds);
    return s && s.valid ? s.mix(i, e).hexString() : t;
  },
  number(n, t, e) {
    return n + (t - n) * e;
  }
};
class gl {
  constructor(t, e, i, s) {
    const r = e[i];
    s = sn([
      t.to,
      s,
      r,
      t.from
    ]);
    const o = sn([
      t.from,
      r,
      s
    ]);
    this._active = !0, this._fn = t.fn || fl[t.type || typeof o], this._easing = Ee[t.easing] || Ee.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = e, this._prop = i, this._from = o, this._to = s, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, e, i) {
    if (this._active) {
      this._notify(!1);
      const s = this._target[this._prop], r = i - this._start, o = this._duration - r;
      this._start = i, this._duration = Math.floor(Math.max(o, t.duration)), this._total += r, this._loop = !!t.loop, this._to = sn([
        t.to,
        e,
        s,
        t.from
      ]), this._from = sn([
        t.from,
        s,
        e
      ]);
    }
  }
  cancel() {
    this._active && (this.tick(Date.now()), this._active = !1, this._notify(!1));
  }
  tick(t) {
    const e = t - this._start, i = this._duration, s = this._prop, r = this._from, o = this._loop, a = this._to;
    let c;
    if (this._active = r !== a && (o || e < i), !this._active) {
      this._target[s] = a, this._notify(!0);
      return;
    }
    if (e < 0) {
      this._target[s] = r;
      return;
    }
    c = e / i % 2, c = o && c > 1 ? 2 - c : c, c = this._easing(Math.min(1, Math.max(0, c))), this._target[s] = this._fn(r, a, c);
  }
  wait() {
    const t = this._promises || (this._promises = []);
    return new Promise((e, i) => {
      t.push({
        res: e,
        rej: i
      });
    });
  }
  _notify(t) {
    const e = t ? "res" : "rej", i = this._promises || [];
    for (let s = 0; s < i.length; s++)
      i[s][e]();
  }
}
class io {
  constructor(t, e) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(e);
  }
  configure(t) {
    if (!E(t))
      return;
    const e = Object.keys(B.animation), i = this._properties;
    Object.getOwnPropertyNames(t).forEach((s) => {
      const r = t[s];
      if (!E(r))
        return;
      const o = {};
      for (const a of e)
        o[a] = r[a];
      (X(r.properties) && r.properties || [
        s
      ]).forEach((a) => {
        (a === s || !i.has(a)) && i.set(a, o);
      });
    });
  }
  _animateOptions(t, e) {
    const i = e.options, s = pl(t, i);
    if (!s)
      return [];
    const r = this._createAnimations(s, i);
    return i.$shared && ml(t.options.$animations, i).then(() => {
      t.options = i;
    }, () => {
    }), r;
  }
  _createAnimations(t, e) {
    const i = this._properties, s = [], r = t.$animations || (t.$animations = {}), o = Object.keys(e), a = Date.now();
    let c;
    for (c = o.length - 1; c >= 0; --c) {
      const l = o[c];
      if (l.charAt(0) === "$")
        continue;
      if (l === "options") {
        s.push(...this._animateOptions(t, e));
        continue;
      }
      const h = e[l];
      let u = r[l];
      const d = i.get(l);
      if (u)
        if (d && u.active()) {
          u.update(d, h, a);
          continue;
        } else
          u.cancel();
      if (!d || !d.duration) {
        t[l] = h;
        continue;
      }
      r[l] = u = new gl(d, t, l, h), s.push(u);
    }
    return s;
  }
  update(t, e) {
    if (this._properties.size === 0) {
      Object.assign(t, e);
      return;
    }
    const i = this._createAnimations(t, e);
    if (i.length)
      return yt.add(this._chart, i), !0;
  }
}
function ml(n, t) {
  const e = [], i = Object.keys(t);
  for (let s = 0; s < i.length; s++) {
    const r = n[i[s]];
    r && r.active() && e.push(r.wait());
  }
  return Promise.all(e);
}
function pl(n, t) {
  if (!t)
    return;
  let e = n.options;
  if (!e) {
    n.options = t;
    return;
  }
  return e.$shared && (n.options = e = Object.assign({}, e, {
    $shared: !1,
    $animations: {}
  })), e;
}
function Ps(n, t) {
  const e = n && n.options || {}, i = e.reverse, s = e.min === void 0 ? t : 0, r = e.max === void 0 ? t : 0;
  return {
    start: i ? r : s,
    end: i ? s : r
  };
}
function bl(n, t, e) {
  if (e === !1)
    return !1;
  const i = Ps(n, e), s = Ps(t, e);
  return {
    top: s.end,
    right: i.end,
    bottom: s.start,
    left: i.start
  };
}
function yl(n) {
  let t, e, i, s;
  return E(n) ? (t = n.top, e = n.right, i = n.bottom, s = n.left) : t = e = i = s = n, {
    top: t,
    right: e,
    bottom: i,
    left: s,
    disabled: n === !1
  };
}
function so(n, t) {
  const e = [], i = n._getSortedDatasetMetas(t);
  let s, r;
  for (s = 0, r = i.length; s < r; ++s)
    e.push(i[s].index);
  return e;
}
function Ss(n, t, e, i = {}) {
  const s = n.keys, r = i.mode === "single";
  let o, a, c, l;
  if (t === null)
    return;
  let h = !1;
  for (o = 0, a = s.length; o < a; ++o) {
    if (c = +s[o], c === e) {
      if (h = !0, i.all)
        continue;
      break;
    }
    l = n.values[c], J(l) && (r || t === 0 || le(t) === le(l)) && (t += l);
  }
  return !h && !i.all ? 0 : t;
}
function _l(n, t) {
  const { iScale: e, vScale: i } = t, s = e.axis === "x" ? "x" : "y", r = i.axis === "x" ? "x" : "y", o = Object.keys(n), a = new Array(o.length);
  let c, l, h;
  for (c = 0, l = o.length; c < l; ++c)
    h = o[c], a[c] = {
      [s]: h,
      [r]: n[h]
    };
  return a;
}
function Xn(n, t) {
  const e = n && n.options.stacked;
  return e || e === void 0 && t.stack !== void 0;
}
function xl(n, t, e) {
  return `${n.id}.${t.id}.${e.stack || e.type}`;
}
function wl(n) {
  const { min: t, max: e, minDefined: i, maxDefined: s } = n.getUserBounds();
  return {
    min: i ? t : Number.NEGATIVE_INFINITY,
    max: s ? e : Number.POSITIVE_INFINITY
  };
}
function vl(n, t, e) {
  const i = n[t] || (n[t] = {});
  return i[e] || (i[e] = {});
}
function Os(n, t, e, i) {
  for (const s of t.getMatchingVisibleMetas(i).reverse()) {
    const r = n[s.index];
    if (e && r > 0 || !e && r < 0)
      return s.index;
  }
  return null;
}
function Ts(n, t) {
  const { chart: e, _cachedMeta: i } = n, s = e._stacks || (e._stacks = {}), { iScale: r, vScale: o, index: a } = i, c = r.axis, l = o.axis, h = xl(r, o, i), u = t.length;
  let d;
  for (let f = 0; f < u; ++f) {
    const g = t[f], { [c]: m, [l]: p } = g, b = g._stacks || (g._stacks = {});
    d = b[l] = vl(s, h, m), d[a] = p, d._top = Os(d, o, !0, i.type), d._bottom = Os(d, o, !1, i.type);
    const y = d._visualValues || (d._visualValues = {});
    y[a] = p;
  }
}
function Qn(n, t) {
  const e = n.scales;
  return Object.keys(e).filter((i) => e[i].axis === t).shift();
}
function Ml(n, t) {
  return Kt(n, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function kl(n, t, e) {
  return Kt(n, {
    active: !1,
    dataIndex: t,
    parsed: void 0,
    raw: void 0,
    element: e,
    index: t,
    mode: "default",
    type: "data"
  });
}
function pe(n, t) {
  const e = n.controller.index, i = n.vScale && n.vScale.axis;
  if (i) {
    t = t || n._parsed;
    for (const s of t) {
      const r = s._stacks;
      if (!r || r[i] === void 0 || r[i][e] === void 0)
        return;
      delete r[i][e], r[i]._visualValues !== void 0 && r[i]._visualValues[e] !== void 0 && delete r[i]._visualValues[e];
    }
  }
}
const Gn = (n) => n === "reset" || n === "none", Cs = (n, t) => t ? n : Object.assign({}, n), Dl = (n, t, e) => n && !t.hidden && t._stacked && {
  keys: so(e, !0),
  values: null
};
class Le {
  constructor(t, e) {
    this.chart = t, this._ctx = t.ctx, this.index = e, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = Xn(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && pe(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, e = this._cachedMeta, i = this.getDataset(), s = (u, d, f, g) => u === "x" ? d : u === "r" ? g : f, r = e.xAxisID = A(i.xAxisID, Qn(t, "x")), o = e.yAxisID = A(i.yAxisID, Qn(t, "y")), a = e.rAxisID = A(i.rAxisID, Qn(t, "r")), c = e.indexAxis, l = e.iAxisID = s(c, r, o, a), h = e.vAxisID = s(c, o, r, a);
    e.xScale = this.getScaleForId(r), e.yScale = this.getScaleForId(o), e.rScale = this.getScaleForId(a), e.iScale = this.getScaleForId(l), e.vScale = this.getScaleForId(h);
  }
  getDataset() {
    return this.chart.data.datasets[this.index];
  }
  getMeta() {
    return this.chart.getDatasetMeta(this.index);
  }
  getScaleForId(t) {
    return this.chart.scales[t];
  }
  _getOtherScale(t) {
    const e = this._cachedMeta;
    return t === e.iScale ? e.vScale : e.iScale;
  }
  reset() {
    this._update("reset");
  }
  _destroy() {
    const t = this._cachedMeta;
    this._data && us(this._data, this), t._stacked && pe(t);
  }
  _dataCheck() {
    const t = this.getDataset(), e = t.data || (t.data = []), i = this._data;
    if (E(e)) {
      const s = this._cachedMeta;
      this._data = _l(e, s);
    } else if (i !== e) {
      if (i) {
        us(i, this);
        const s = this._cachedMeta;
        pe(s), s._parsed = [];
      }
      e && Object.isExtensible(e) && rc(e, this), this._syncList = [], this._data = e;
    }
  }
  addElements() {
    const t = this._cachedMeta;
    this._dataCheck(), this.datasetElementType && (t.dataset = new this.datasetElementType());
  }
  buildOrUpdateElements(t) {
    const e = this._cachedMeta, i = this.getDataset();
    let s = !1;
    this._dataCheck();
    const r = e._stacked;
    e._stacked = Xn(e.vScale, e), e.stack !== i.stack && (s = !0, pe(e), e.stack = i.stack), this._resyncElements(t), (s || r !== e._stacked) && (Ts(this, e._parsed), e._stacked = Xn(e.vScale, e));
  }
  configure() {
    const t = this.chart.config, e = t.datasetScopeKeys(this._type), i = t.getOptionScopes(this.getDataset(), e, !0);
    this.options = t.createResolver(i, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, e) {
    const { _cachedMeta: i, _data: s } = this, { iScale: r, _stacked: o } = i, a = r.axis;
    let c = t === 0 && e === s.length ? !0 : i._sorted, l = t > 0 && i._parsed[t - 1], h, u, d;
    if (this._parsing === !1)
      i._parsed = s, i._sorted = !0, d = s;
    else {
      X(s[t]) ? d = this.parseArrayData(i, s, t, e) : E(s[t]) ? d = this.parseObjectData(i, s, t, e) : d = this.parsePrimitiveData(i, s, t, e);
      const f = () => u[a] === null || l && u[a] < l[a];
      for (h = 0; h < e; ++h)
        i._parsed[h + t] = u = d[h], c && (f() && (c = !1), l = u);
      i._sorted = c;
    }
    o && Ts(this, d);
  }
  parsePrimitiveData(t, e, i, s) {
    const { iScale: r, vScale: o } = t, a = r.axis, c = o.axis, l = r.getLabels(), h = r === o, u = new Array(s);
    let d, f, g;
    for (d = 0, f = s; d < f; ++d)
      g = d + i, u[d] = {
        [a]: h || r.parse(l[g], g),
        [c]: o.parse(e[g], g)
      };
    return u;
  }
  parseArrayData(t, e, i, s) {
    const { xScale: r, yScale: o } = t, a = new Array(s);
    let c, l, h, u;
    for (c = 0, l = s; c < l; ++c)
      h = c + i, u = e[h], a[c] = {
        x: r.parse(u[0], h),
        y: o.parse(u[1], h)
      };
    return a;
  }
  parseObjectData(t, e, i, s) {
    const { xScale: r, yScale: o } = t, { xAxisKey: a = "x", yAxisKey: c = "y" } = this._parsing, l = new Array(s);
    let h, u, d, f;
    for (h = 0, u = s; h < u; ++h)
      d = h + i, f = e[d], l[h] = {
        x: r.parse(kn(f, a), d),
        y: o.parse(kn(f, c), d)
      };
    return l;
  }
  getParsed(t) {
    return this._cachedMeta._parsed[t];
  }
  getDataElement(t) {
    return this._cachedMeta.data[t];
  }
  applyStack(t, e, i) {
    const s = this.chart, r = this._cachedMeta, o = e[t.axis], a = {
      keys: so(s, !0),
      values: e._stacks[t.axis]._visualValues
    };
    return Ss(a, o, r.index, {
      mode: i
    });
  }
  updateRangeFromParsed(t, e, i, s) {
    const r = i[e.axis];
    let o = r === null ? NaN : r;
    const a = s && i._stacks[e.axis];
    s && a && (s.values = a, o = Ss(s, r, this._cachedMeta.index)), t.min = Math.min(t.min, o), t.max = Math.max(t.max, o);
  }
  getMinMax(t, e) {
    const i = this._cachedMeta, s = i._parsed, r = i._sorted && t === i.iScale, o = s.length, a = this._getOtherScale(t), c = Dl(e, i, this.chart), l = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: h, max: u } = wl(a);
    let d, f;
    function g() {
      f = s[d];
      const m = f[a.axis];
      return !J(f[t.axis]) || h > m || u < m;
    }
    for (d = 0; d < o && !(!g() && (this.updateRangeFromParsed(l, t, f, c), r)); ++d)
      ;
    if (r) {
      for (d = o - 1; d >= 0; --d)
        if (!g()) {
          this.updateRangeFromParsed(l, t, f, c);
          break;
        }
    }
    return l;
  }
  getAllParsedValues(t) {
    const e = this._cachedMeta._parsed, i = [];
    let s, r, o;
    for (s = 0, r = e.length; s < r; ++s)
      o = e[s][t.axis], J(o) && i.push(o);
    return i;
  }
  getMaxOverflow() {
    return !1;
  }
  getLabelAndValue(t) {
    const e = this._cachedMeta, i = e.iScale, s = e.vScale, r = this.getParsed(t);
    return {
      label: i ? "" + i.getLabelForValue(r[i.axis]) : "",
      value: s ? "" + s.getLabelForValue(r[s.axis]) : ""
    };
  }
  _update(t) {
    const e = this._cachedMeta;
    this.update(t || "default"), e._clip = yl(A(this.options.clip, bl(e.xScale, e.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, e = this.chart, i = this._cachedMeta, s = i.data || [], r = e.chartArea, o = [], a = this._drawStart || 0, c = this._drawCount || s.length - a, l = this.options.drawActiveElementsOnTop;
    let h;
    for (i.dataset && i.dataset.draw(t, r, a, c), h = a; h < a + c; ++h) {
      const u = s[h];
      u.hidden || (u.active && l ? o.push(u) : u.draw(t, r));
    }
    for (h = 0; h < o.length; ++h)
      o[h].draw(t, r);
  }
  getStyle(t, e) {
    const i = e ? "active" : "default";
    return t === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(i) : this.resolveDataElementOptions(t || 0, i);
  }
  getContext(t, e, i) {
    const s = this.getDataset();
    let r;
    if (t >= 0 && t < this._cachedMeta.data.length) {
      const o = this._cachedMeta.data[t];
      r = o.$context || (o.$context = kl(this.getContext(), t, o)), r.parsed = this.getParsed(t), r.raw = s.data[t], r.index = r.dataIndex = t;
    } else
      r = this.$context || (this.$context = Ml(this.chart.getContext(), this.index)), r.dataset = s, r.index = r.datasetIndex = this.index;
    return r.active = !!e, r.mode = i, r;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, e) {
    return this._resolveElementOptions(this.dataElementType.id, e, t);
  }
  _resolveElementOptions(t, e = "default", i) {
    const s = e === "active", r = this._cachedDataOpts, o = t + "-" + e, a = r[o], c = this.enableOptionSharing && Dn(i);
    if (a)
      return Cs(a, c);
    const l = this.chart.config, h = l.datasetElementScopeKeys(this._type, t), u = s ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], d = l.getOptionScopes(this.getDataset(), h), f = Object.keys(B.elements[t]), g = () => this.getContext(i, s, e), m = l.resolveNamedOptions(d, f, g, u);
    return m.$shared && (m.$shared = c, r[o] = Object.freeze(Cs(m, c))), m;
  }
  _resolveAnimations(t, e, i) {
    const s = this.chart, r = this._cachedDataOpts, o = `animation-${e}`, a = r[o];
    if (a)
      return a;
    let c;
    if (s.options.animation !== !1) {
      const h = this.chart.config, u = h.datasetAnimationScopeKeys(this._type, e), d = h.getOptionScopes(this.getDataset(), u);
      c = h.createResolver(d, this.getContext(t, i, e));
    }
    const l = new io(s, c && c.animations);
    return c && c._cacheable && (r[o] = Object.freeze(l)), l;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, e) {
    return !e || Gn(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, e) {
    const i = this.resolveDataElementOptions(t, e), s = this._sharedOptions, r = this.getSharedOptions(i), o = this.includeOptions(e, r) || r !== s;
    return this.updateSharedOptions(r, e, i), {
      sharedOptions: r,
      includeOptions: o
    };
  }
  updateElement(t, e, i, s) {
    Gn(s) ? Object.assign(t, i) : this._resolveAnimations(e, s).update(t, i);
  }
  updateSharedOptions(t, e, i) {
    t && !Gn(e) && this._resolveAnimations(void 0, e).update(t, i);
  }
  _setStyle(t, e, i, s) {
    t.active = s;
    const r = this.getStyle(e, s);
    this._resolveAnimations(e, i, s).update(t, {
      options: !s && this.getSharedOptions(r) || r
    });
  }
  removeHoverStyle(t, e, i) {
    this._setStyle(t, i, "active", !1);
  }
  setHoverStyle(t, e, i) {
    this._setStyle(t, i, "active", !0);
  }
  _removeDatasetHoverStyle() {
    const t = this._cachedMeta.dataset;
    t && this._setStyle(t, void 0, "active", !1);
  }
  _setDatasetHoverStyle() {
    const t = this._cachedMeta.dataset;
    t && this._setStyle(t, void 0, "active", !0);
  }
  _resyncElements(t) {
    const e = this._data, i = this._cachedMeta.data;
    for (const [a, c, l] of this._syncList)
      this[a](c, l);
    this._syncList = [];
    const s = i.length, r = e.length, o = Math.min(r, s);
    o && this.parse(0, o), r > s ? this._insertElements(s, r - s, t) : r < s && this._removeElements(r, s - r);
  }
  _insertElements(t, e, i = !0) {
    const s = this._cachedMeta, r = s.data, o = t + e;
    let a;
    const c = (l) => {
      for (l.length += e, a = l.length - 1; a >= o; a--)
        l[a] = l[a - e];
    };
    for (c(r), a = t; a < o; ++a)
      r[a] = new this.dataElementType();
    this._parsing && c(s._parsed), this.parse(t, e), i && this.updateElements(r, t, e, "reset");
  }
  updateElements(t, e, i, s) {
  }
  _removeElements(t, e) {
    const i = this._cachedMeta;
    if (this._parsing) {
      const s = i._parsed.splice(t, e);
      i._stacked && pe(i, s);
    }
    i.data.splice(t, e);
  }
  _sync(t) {
    if (this._parsing)
      this._syncList.push(t);
    else {
      const [e, i, s] = t;
      this[e](i, s);
    }
    this.chart._dataChanges.push([
      this.index,
      ...t
    ]);
  }
  _onDataPush() {
    const t = arguments.length;
    this._sync([
      "_insertElements",
      this.getDataset().data.length - t,
      t
    ]);
  }
  _onDataPop() {
    this._sync([
      "_removeElements",
      this._cachedMeta.data.length - 1,
      1
    ]);
  }
  _onDataShift() {
    this._sync([
      "_removeElements",
      0,
      1
    ]);
  }
  _onDataSplice(t, e) {
    e && this._sync([
      "_removeElements",
      t,
      e
    ]);
    const i = arguments.length - 2;
    i && this._sync([
      "_insertElements",
      t,
      i
    ]);
  }
  _onDataUnshift() {
    this._sync([
      "_insertElements",
      0,
      arguments.length
    ]);
  }
}
x(Le, "defaults", {}), x(Le, "datasetElementType", null), x(Le, "dataElementType", null);
class bn extends Le {
  initialize() {
    this.enableOptionSharing = !0, this.supportsDecimation = !0, super.initialize();
  }
  update(t) {
    const e = this._cachedMeta, { dataset: i, data: s = [], _dataset: r } = e, o = this.chart._animationsDisabled;
    let { start: a, count: c } = lc(e, s, o);
    this._drawStart = a, this._drawCount = c, hc(e) && (a = 0, c = s.length), i._chart = this.chart, i._datasetIndex = this.index, i._decimated = !!r._decimated, i.points = s;
    const l = this.resolveDatasetElementOptions(t);
    this.options.showLine || (l.borderWidth = 0), l.segment = this.options.segment, this.updateElement(i, void 0, {
      animated: !o,
      options: l
    }, t), this.updateElements(s, a, c, t);
  }
  updateElements(t, e, i, s) {
    const r = s === "reset", { iScale: o, vScale: a, _stacked: c, _dataset: l } = this._cachedMeta, { sharedOptions: h, includeOptions: u } = this._getSharedOptions(e, s), d = o.axis, f = a.axis, { spanGaps: g, segment: m } = this.options, p = Ye(g) ? g : Number.POSITIVE_INFINITY, b = this.chart._animationsDisabled || r || s === "none", y = e + i, v = t.length;
    let M = e > 0 && this.getParsed(e - 1);
    for (let _ = 0; _ < v; ++_) {
      const D = t[_], k = b ? D : {};
      if (_ < e || _ >= y) {
        k.skip = !0;
        continue;
      }
      const w = this.getParsed(_), P = R(w[f]), O = k[d] = o.getPixelForValue(w[d], _), S = k[f] = r || P ? a.getBasePixel() : a.getPixelForValue(c ? this.applyStack(a, w, c) : w[f], _);
      k.skip = isNaN(O) || isNaN(S) || P, k.stop = _ > 0 && Math.abs(w[d] - M[d]) > p, m && (k.parsed = w, k.raw = l.data[_]), u && (k.options = h || this.resolveDataElementOptions(_, D.active ? "active" : s)), b || this.updateElement(D, _, k, s), M = w;
    }
  }
  getMaxOverflow() {
    const t = this._cachedMeta, e = t.dataset, i = e.options && e.options.borderWidth || 0, s = t.data || [];
    if (!s.length)
      return i;
    const r = s[0].size(this.resolveDataElementOptions(0)), o = s[s.length - 1].size(this.resolveDataElementOptions(s.length - 1));
    return Math.max(i, r, o) / 2;
  }
  draw() {
    const t = this._cachedMeta;
    t.dataset.updateControlPoints(this.chart.chartArea, t.iScale.axis), super.draw();
  }
}
x(bn, "id", "line"), x(bn, "defaults", {
  datasetElementType: "line",
  dataElementType: "point",
  showLine: !0,
  spanGaps: !1
}), x(bn, "overrides", {
  scales: {
    _index_: {
      type: "category"
    },
    _value_: {
      type: "linear"
    }
  }
});
function Nt() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class Fi {
  constructor(t) {
    x(this, "options");
    this.options = t || {};
  }
  /**
  * Override default date adapter methods.
  * Accepts type parameter to define options type.
  * @example
  * Chart._adapters._date.override<{myAdapterOption: string}>({
  *   init() {
  *     console.log(this.options.myAdapterOption);
  *   }
  * })
  */
  static override(t) {
    Object.assign(Fi.prototype, t);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return Nt();
  }
  parse() {
    return Nt();
  }
  format() {
    return Nt();
  }
  add() {
    return Nt();
  }
  diff() {
    return Nt();
  }
  startOf() {
    return Nt();
  }
  endOf() {
    return Nt();
  }
}
var ro = {
  _date: Fi
};
function Pl(n, t, e, i) {
  const { controller: s, data: r, _sorted: o } = n, a = s._cachedMeta.iScale, c = n.dataset && n.dataset.options ? n.dataset.options.spanGaps : null;
  if (a && t === a.axis && t !== "r" && o && r.length) {
    const l = a._reversePixels ? ic : Ut;
    if (i) {
      if (s._sharedOptions) {
        const h = r[0], u = typeof h.getRange == "function" && h.getRange(t);
        if (u) {
          const d = l(r, t, e - u), f = l(r, t, e + u);
          return {
            lo: d.lo,
            hi: f.hi
          };
        }
      }
    } else {
      const h = l(r, t, e);
      if (c) {
        const { vScale: u } = s._cachedMeta, { _parsed: d } = n, f = d.slice(0, h.lo + 1).reverse().findIndex((m) => !R(m[u.axis]));
        h.lo -= Math.max(0, f);
        const g = d.slice(h.hi).findIndex((m) => !R(m[u.axis]));
        h.hi += Math.max(0, g);
      }
      return h;
    }
  }
  return {
    lo: 0,
    hi: r.length - 1
  };
}
function Rn(n, t, e, i, s) {
  const r = n.getSortedVisibleDatasetMetas(), o = e[t];
  for (let a = 0, c = r.length; a < c; ++a) {
    const { index: l, data: h } = r[a], { lo: u, hi: d } = Pl(r[a], t, o, s);
    for (let f = u; f <= d; ++f) {
      const g = h[f];
      g.skip || i(g, l, f);
    }
  }
}
function Sl(n) {
  const t = n.indexOf("x") !== -1, e = n.indexOf("y") !== -1;
  return function(i, s) {
    const r = t ? Math.abs(i.x - s.x) : 0, o = e ? Math.abs(i.y - s.y) : 0;
    return Math.sqrt(Math.pow(r, 2) + Math.pow(o, 2));
  };
}
function Kn(n, t, e, i, s) {
  const r = [];
  return !s && !n.isPointInArea(t) || Rn(n, e, t, function(a, c, l) {
    !s && !je(a, n.chartArea, 0) || a.inRange(t.x, t.y, i) && r.push({
      element: a,
      datasetIndex: c,
      index: l
    });
  }, !0), r;
}
function Ol(n, t, e, i) {
  let s = [];
  function r(o, a, c) {
    const { startAngle: l, endAngle: h } = o.getProps([
      "startAngle",
      "endAngle"
    ], i), { angle: u } = tc(o, {
      x: t.x,
      y: t.y
    });
    Rr(u, l, h) && s.push({
      element: o,
      datasetIndex: a,
      index: c
    });
  }
  return Rn(n, e, t, r), s;
}
function Tl(n, t, e, i, s, r) {
  let o = [];
  const a = Sl(e);
  let c = Number.POSITIVE_INFINITY;
  function l(h, u, d) {
    const f = h.inRange(t.x, t.y, s);
    if (i && !f)
      return;
    const g = h.getCenterPoint(s);
    if (!(!!r || n.isPointInArea(g)) && !f)
      return;
    const p = a(t, g);
    p < c ? (o = [
      {
        element: h,
        datasetIndex: u,
        index: d
      }
    ], c = p) : p === c && o.push({
      element: h,
      datasetIndex: u,
      index: d
    });
  }
  return Rn(n, e, t, l), o;
}
function Zn(n, t, e, i, s, r) {
  return !r && !n.isPointInArea(t) ? [] : e === "r" && !i ? Ol(n, t, e, s) : Tl(n, t, e, i, s, r);
}
function As(n, t, e, i, s) {
  const r = [], o = e === "x" ? "inXRange" : "inYRange";
  let a = !1;
  return Rn(n, e, t, (c, l, h) => {
    c[o] && c[o](t[e], s) && (r.push({
      element: c,
      datasetIndex: l,
      index: h
    }), a = a || c.inRange(t.x, t.y, s));
  }), i && !a ? [] : r;
}
var Cl = {
  modes: {
    index(n, t, e, i) {
      const s = Wt(t, n), r = e.axis || "x", o = e.includeInvisible || !1, a = e.intersect ? Kn(n, s, r, i, o) : Zn(n, s, r, !1, i, o), c = [];
      return a.length ? (n.getSortedVisibleDatasetMetas().forEach((l) => {
        const h = a[0].index, u = l.data[h];
        u && !u.skip && c.push({
          element: u,
          datasetIndex: l.index,
          index: h
        });
      }), c) : [];
    },
    dataset(n, t, e, i) {
      const s = Wt(t, n), r = e.axis || "xy", o = e.includeInvisible || !1;
      let a = e.intersect ? Kn(n, s, r, i, o) : Zn(n, s, r, !1, i, o);
      if (a.length > 0) {
        const c = a[0].datasetIndex, l = n.getDatasetMeta(c).data;
        a = [];
        for (let h = 0; h < l.length; ++h)
          a.push({
            element: l[h],
            datasetIndex: c,
            index: h
          });
      }
      return a;
    },
    point(n, t, e, i) {
      const s = Wt(t, n), r = e.axis || "xy", o = e.includeInvisible || !1;
      return Kn(n, s, r, i, o);
    },
    nearest(n, t, e, i) {
      const s = Wt(t, n), r = e.axis || "xy", o = e.includeInvisible || !1;
      return Zn(n, s, r, e.intersect, i, o);
    },
    x(n, t, e, i) {
      const s = Wt(t, n);
      return As(n, s, "x", e.intersect, i);
    },
    y(n, t, e, i) {
      const s = Wt(t, n);
      return As(n, s, "y", e.intersect, i);
    }
  }
};
const oo = [
  "left",
  "top",
  "right",
  "bottom"
];
function be(n, t) {
  return n.filter((e) => e.pos === t);
}
function Es(n, t) {
  return n.filter((e) => oo.indexOf(e.pos) === -1 && e.box.axis === t);
}
function ye(n, t) {
  return n.sort((e, i) => {
    const s = t ? i : e, r = t ? e : i;
    return s.weight === r.weight ? s.index - r.index : s.weight - r.weight;
  });
}
function Al(n) {
  const t = [];
  let e, i, s, r, o, a;
  for (e = 0, i = (n || []).length; e < i; ++e)
    s = n[e], { position: r, options: { stack: o, stackWeight: a = 1 } } = s, t.push({
      index: e,
      box: s,
      pos: r,
      horizontal: s.isHorizontal(),
      weight: s.weight,
      stack: o && r + o,
      stackWeight: a
    });
  return t;
}
function El(n) {
  const t = {};
  for (const e of n) {
    const { stack: i, pos: s, stackWeight: r } = e;
    if (!i || !oo.includes(s))
      continue;
    const o = t[i] || (t[i] = {
      count: 0,
      placed: 0,
      weight: 0,
      size: 0
    });
    o.count++, o.weight += r;
  }
  return t;
}
function $l(n, t) {
  const e = El(n), { vBoxMaxWidth: i, hBoxMaxHeight: s } = t;
  let r, o, a;
  for (r = 0, o = n.length; r < o; ++r) {
    a = n[r];
    const { fullSize: c } = a.box, l = e[a.stack], h = l && a.stackWeight / l.weight;
    a.horizontal ? (a.width = h ? h * i : c && t.availableWidth, a.height = s) : (a.width = i, a.height = h ? h * s : c && t.availableHeight);
  }
  return e;
}
function Il(n) {
  const t = Al(n), e = ye(t.filter((l) => l.box.fullSize), !0), i = ye(be(t, "left"), !0), s = ye(be(t, "right")), r = ye(be(t, "top"), !0), o = ye(be(t, "bottom")), a = Es(t, "x"), c = Es(t, "y");
  return {
    fullSize: e,
    leftAndTop: i.concat(r),
    rightAndBottom: s.concat(c).concat(o).concat(a),
    chartArea: be(t, "chartArea"),
    vertical: i.concat(s).concat(c),
    horizontal: r.concat(o).concat(a)
  };
}
function $s(n, t, e, i) {
  return Math.max(n[e], t[e]) + Math.max(n[i], t[i]);
}
function ao(n, t) {
  n.top = Math.max(n.top, t.top), n.left = Math.max(n.left, t.left), n.bottom = Math.max(n.bottom, t.bottom), n.right = Math.max(n.right, t.right);
}
function Ll(n, t, e, i) {
  const { pos: s, box: r } = e, o = n.maxPadding;
  if (!E(s)) {
    e.size && (n[s] -= e.size);
    const u = i[e.stack] || {
      size: 0,
      count: 1
    };
    u.size = Math.max(u.size, e.horizontal ? r.height : r.width), e.size = u.size / u.count, n[s] += e.size;
  }
  r.getPadding && ao(o, r.getPadding());
  const a = Math.max(0, t.outerWidth - $s(o, n, "left", "right")), c = Math.max(0, t.outerHeight - $s(o, n, "top", "bottom")), l = a !== n.w, h = c !== n.h;
  return n.w = a, n.h = c, e.horizontal ? {
    same: l,
    other: h
  } : {
    same: h,
    other: l
  };
}
function Fl(n) {
  const t = n.maxPadding;
  function e(i) {
    const s = Math.max(t[i] - n[i], 0);
    return n[i] += s, s;
  }
  n.y += e("top"), n.x += e("left"), e("right"), e("bottom");
}
function Rl(n, t) {
  const e = t.maxPadding;
  function i(s) {
    const r = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    return s.forEach((o) => {
      r[o] = Math.max(t[o], e[o]);
    }), r;
  }
  return i(n ? [
    "left",
    "right"
  ] : [
    "top",
    "bottom"
  ]);
}
function De(n, t, e, i) {
  const s = [];
  let r, o, a, c, l, h;
  for (r = 0, o = n.length, l = 0; r < o; ++r) {
    a = n[r], c = a.box, c.update(a.width || t.w, a.height || t.h, Rl(a.horizontal, t));
    const { same: u, other: d } = Ll(t, e, a, i);
    l |= u && s.length, h = h || d, c.fullSize || s.push(a);
  }
  return l && De(s, t, e, i) || h;
}
function an(n, t, e, i, s) {
  n.top = e, n.left = t, n.right = t + i, n.bottom = e + s, n.width = i, n.height = s;
}
function Is(n, t, e, i) {
  const s = e.padding;
  let { x: r, y: o } = t;
  for (const a of n) {
    const c = a.box, l = i[a.stack] || {
      placed: 0,
      weight: 1
    }, h = a.stackWeight / l.weight || 1;
    if (a.horizontal) {
      const u = t.w * h, d = l.size || c.height;
      Dn(l.start) && (o = l.start), c.fullSize ? an(c, s.left, o, e.outerWidth - s.right - s.left, d) : an(c, t.left + l.placed, o, u, d), l.start = o, l.placed += u, o = c.bottom;
    } else {
      const u = t.h * h, d = l.size || c.width;
      Dn(l.start) && (r = l.start), c.fullSize ? an(c, r, s.top, d, e.outerHeight - s.bottom - s.top) : an(c, r, t.top + l.placed, d, u), l.start = r, l.placed += u, r = c.right;
    }
  }
  t.x = r, t.y = o;
}
var St = {
  addBox(n, t) {
    n.boxes || (n.boxes = []), t.fullSize = t.fullSize || !1, t.position = t.position || "top", t.weight = t.weight || 0, t._layers = t._layers || function() {
      return [
        {
          z: 0,
          draw(e) {
            t.draw(e);
          }
        }
      ];
    }, n.boxes.push(t);
  },
  removeBox(n, t) {
    const e = n.boxes ? n.boxes.indexOf(t) : -1;
    e !== -1 && n.boxes.splice(e, 1);
  },
  configure(n, t, e) {
    t.fullSize = e.fullSize, t.position = e.position, t.weight = e.weight;
  },
  update(n, t, e, i) {
    if (!n)
      return;
    const s = lt(n.options.layout.padding), r = Math.max(t - s.width, 0), o = Math.max(e - s.height, 0), a = Il(n.boxes), c = a.vertical, l = a.horizontal;
    L(n.boxes, (m) => {
      typeof m.beforeLayout == "function" && m.beforeLayout();
    });
    const h = c.reduce((m, p) => p.box.options && p.box.options.display === !1 ? m : m + 1, 0) || 1, u = Object.freeze({
      outerWidth: t,
      outerHeight: e,
      padding: s,
      availableWidth: r,
      availableHeight: o,
      vBoxMaxWidth: r / 2 / h,
      hBoxMaxHeight: o / 2
    }), d = Object.assign({}, s);
    ao(d, lt(i));
    const f = Object.assign({
      maxPadding: d,
      w: r,
      h: o,
      x: s.left,
      y: s.top
    }, s), g = $l(c.concat(l), u);
    De(a.fullSize, f, u, g), De(c, f, u, g), De(l, f, u, g) && De(c, f, u, g), Fl(f), Is(a.leftAndTop, f, u, g), f.x += f.w, f.y += f.h, Is(a.rightAndBottom, f, u, g), n.chartArea = {
      left: f.left,
      top: f.top,
      right: f.left + f.w,
      bottom: f.top + f.h,
      height: f.h,
      width: f.w
    }, L(a.chartArea, (m) => {
      const p = m.box;
      Object.assign(p, n.chartArea), p.update(f.w, f.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class co {
  acquireContext(t, e) {
  }
  releaseContext(t) {
    return !1;
  }
  addEventListener(t, e, i) {
  }
  removeEventListener(t, e, i) {
  }
  getDevicePixelRatio() {
    return 1;
  }
  getMaximumSize(t, e, i, s) {
    return e = Math.max(0, e || t.width), i = i || t.height, {
      width: e,
      height: Math.max(0, s ? Math.floor(e / s) : i)
    };
  }
  isAttached(t) {
    return !0;
  }
  updateConfig(t) {
  }
}
class zl extends co {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const yn = "$chartjs", Hl = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, Ls = (n) => n === null || n === "";
function Nl(n, t) {
  const e = n.style, i = n.getAttribute("height"), s = n.getAttribute("width");
  if (n[yn] = {
    initial: {
      height: i,
      width: s,
      style: {
        display: e.display,
        height: e.height,
        width: e.width
      }
    }
  }, e.display = e.display || "block", e.boxSizing = e.boxSizing || "border-box", Ls(s)) {
    const r = ws(n, "width");
    r !== void 0 && (n.width = r);
  }
  if (Ls(i))
    if (n.style.height === "")
      n.height = n.width / (t || 2);
    else {
      const r = ws(n, "height");
      r !== void 0 && (n.height = r);
    }
  return n;
}
const lo = tl ? {
  passive: !0
} : !1;
function Wl(n, t, e) {
  n && n.addEventListener(t, e, lo);
}
function Bl(n, t, e) {
  n && n.canvas && n.canvas.removeEventListener(t, e, lo);
}
function Yl(n, t) {
  const e = Hl[n.type] || n.type, { x: i, y: s } = Wt(n, t);
  return {
    type: e,
    chart: t,
    native: n,
    x: i !== void 0 ? i : null,
    y: s !== void 0 ? s : null
  };
}
function Tn(n, t) {
  for (const e of n)
    if (e === t || e.contains(t))
      return !0;
}
function jl(n, t, e) {
  const i = n.canvas, s = new MutationObserver((r) => {
    let o = !1;
    for (const a of r)
      o = o || Tn(a.addedNodes, i), o = o && !Tn(a.removedNodes, i);
    o && e();
  });
  return s.observe(document, {
    childList: !0,
    subtree: !0
  }), s;
}
function Vl(n, t, e) {
  const i = n.canvas, s = new MutationObserver((r) => {
    let o = !1;
    for (const a of r)
      o = o || Tn(a.removedNodes, i), o = o && !Tn(a.addedNodes, i);
    o && e();
  });
  return s.observe(document, {
    childList: !0,
    subtree: !0
  }), s;
}
const Ve = /* @__PURE__ */ new Map();
let Fs = 0;
function ho() {
  const n = window.devicePixelRatio;
  n !== Fs && (Fs = n, Ve.forEach((t, e) => {
    e.currentDevicePixelRatio !== n && t();
  }));
}
function Ul(n, t) {
  Ve.size || window.addEventListener("resize", ho), Ve.set(n, t);
}
function ql(n) {
  Ve.delete(n), Ve.size || window.removeEventListener("resize", ho);
}
function Xl(n, t, e) {
  const i = n.canvas, s = i && Li(i);
  if (!s)
    return;
  const r = Nr((a, c) => {
    const l = s.clientWidth;
    e(a, c), l < s.clientWidth && e();
  }, window), o = new ResizeObserver((a) => {
    const c = a[0], l = c.contentRect.width, h = c.contentRect.height;
    l === 0 && h === 0 || r(l, h);
  });
  return o.observe(s), Ul(n, r), o;
}
function Jn(n, t, e) {
  e && e.disconnect(), t === "resize" && ql(n);
}
function Ql(n, t, e) {
  const i = n.canvas, s = Nr((r) => {
    n.ctx !== null && e(Yl(r, n));
  }, n);
  return Wl(i, t, s), s;
}
class Gl extends co {
  acquireContext(t, e) {
    const i = t && t.getContext && t.getContext("2d");
    return i && i.canvas === t ? (Nl(t, e), i) : null;
  }
  releaseContext(t) {
    const e = t.canvas;
    if (!e[yn])
      return !1;
    const i = e[yn].initial;
    [
      "height",
      "width"
    ].forEach((r) => {
      const o = i[r];
      R(o) ? e.removeAttribute(r) : e.setAttribute(r, o);
    });
    const s = i.style || {};
    return Object.keys(s).forEach((r) => {
      e.style[r] = s[r];
    }), e.width = e.width, delete e[yn], !0;
  }
  addEventListener(t, e, i) {
    this.removeEventListener(t, e);
    const s = t.$proxies || (t.$proxies = {}), o = {
      attach: jl,
      detach: Vl,
      resize: Xl
    }[e] || Ql;
    s[e] = o(t, e, i);
  }
  removeEventListener(t, e) {
    const i = t.$proxies || (t.$proxies = {}), s = i[e];
    if (!s)
      return;
    ({
      attach: Jn,
      detach: Jn,
      resize: Jn
    }[e] || Bl)(t, e, s), i[e] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, e, i, s) {
    return Jc(t, e, i, s);
  }
  isAttached(t) {
    const e = t && Li(t);
    return !!(e && e.isConnected);
  }
}
function Kl(n) {
  return !Ii() || typeof OffscreenCanvas < "u" && n instanceof OffscreenCanvas ? zl : Gl;
}
class Et {
  constructor() {
    x(this, "x");
    x(this, "y");
    x(this, "active", !1);
    x(this, "options");
    x(this, "$animations");
  }
  tooltipPosition(t) {
    const { x: e, y: i } = this.getProps([
      "x",
      "y"
    ], t);
    return {
      x: e,
      y: i
    };
  }
  hasValue() {
    return Ye(this.x) && Ye(this.y);
  }
  getProps(t, e) {
    const i = this.$animations;
    if (!e || !i)
      return this;
    const s = {};
    return t.forEach((r) => {
      s[r] = i[r] && i[r].active() ? i[r]._to : this[r];
    }), s;
  }
}
x(Et, "defaults", {}), x(Et, "defaultRoutes");
function Zl(n, t) {
  const e = n.options.ticks, i = Jl(n), s = Math.min(e.maxTicksLimit || i, i), r = e.major.enabled ? eh(t) : [], o = r.length, a = r[0], c = r[o - 1], l = [];
  if (o > s)
    return nh(t, l, r, o / s), l;
  const h = th(r, t, s);
  if (o > 0) {
    let u, d;
    const f = o > 1 ? Math.round((c - a) / (o - 1)) : null;
    for (cn(t, l, h, R(f) ? 0 : a - f, a), u = 0, d = o - 1; u < d; u++)
      cn(t, l, h, r[u], r[u + 1]);
    return cn(t, l, h, c, R(f) ? t.length : c + f), l;
  }
  return cn(t, l, h), l;
}
function Jl(n) {
  const t = n.options.offset, e = n._tickSize(), i = n._length / e + (t ? 0 : 1), s = n._maxLength / e;
  return Math.floor(Math.min(i, s));
}
function th(n, t, e) {
  const i = ih(n), s = t.length / e;
  if (!i)
    return Math.max(s, 1);
  const r = Qa(i);
  for (let o = 0, a = r.length - 1; o < a; o++) {
    const c = r[o];
    if (c > s)
      return c;
  }
  return Math.max(s, 1);
}
function eh(n) {
  const t = [];
  let e, i;
  for (e = 0, i = n.length; e < i; e++)
    n[e].major && t.push(e);
  return t;
}
function nh(n, t, e, i) {
  let s = 0, r = e[0], o;
  for (i = Math.ceil(i), o = 0; o < n.length; o++)
    o === r && (t.push(n[o]), s++, r = e[s * i]);
}
function cn(n, t, e, i, s) {
  const r = A(i, 0), o = Math.min(A(s, n.length), n.length);
  let a = 0, c, l, h;
  for (e = Math.ceil(e), s && (c = s - i, e = c / Math.floor(c / e)), h = r; h < 0; )
    a++, h = Math.round(r + a * e);
  for (l = Math.max(r, 0); l < o; l++)
    l === h && (t.push(n[l]), a++, h = Math.round(r + a * e));
}
function ih(n) {
  const t = n.length;
  let e, i;
  if (t < 2)
    return !1;
  for (i = n[0], e = 1; e < t; ++e)
    if (n[e] - n[e - 1] !== i)
      return !1;
  return i;
}
const sh = (n) => n === "left" ? "right" : n === "right" ? "left" : n, Rs = (n, t, e) => t === "top" || t === "left" ? n[t] + e : n[t] - e, zs = (n, t) => Math.min(t || n, n);
function Hs(n, t) {
  const e = [], i = n.length / t, s = n.length;
  let r = 0;
  for (; r < s; r += i)
    e.push(n[Math.floor(r)]);
  return e;
}
function rh(n, t, e) {
  const i = n.ticks.length, s = Math.min(t, i - 1), r = n._startPixel, o = n._endPixel, a = 1e-6;
  let c = n.getPixelForTick(s), l;
  if (!(e && (i === 1 ? l = Math.max(c - r, o - c) : t === 0 ? l = (n.getPixelForTick(1) - c) / 2 : l = (c - n.getPixelForTick(s - 1)) / 2, c += s < t ? l : -l, c < r - a || c > o + a)))
    return c;
}
function oh(n, t) {
  L(n, (e) => {
    const i = e.gc, s = i.length / 2;
    let r;
    if (s > t) {
      for (r = 0; r < s; ++r)
        delete e.data[i[r]];
      i.splice(0, s);
    }
  });
}
function _e(n) {
  return n.drawTicks ? n.tickLength : 0;
}
function Ns(n, t) {
  if (!n.display)
    return 0;
  const e = it(n.font, t), i = lt(n.padding);
  return (X(n.text) ? n.text.length : 1) * e.lineHeight + i.height;
}
function ah(n, t) {
  return Kt(n, {
    scale: t,
    type: "scale"
  });
}
function ch(n, t, e) {
  return Kt(n, {
    tick: e,
    index: t,
    type: "tick"
  });
}
function lh(n, t, e) {
  let i = Wr(n);
  return (e && t !== "right" || !e && t === "right") && (i = sh(i)), i;
}
function hh(n, t, e, i) {
  const { top: s, left: r, bottom: o, right: a, chart: c } = n, { chartArea: l, scales: h } = c;
  let u = 0, d, f, g;
  const m = o - s, p = a - r;
  if (n.isHorizontal()) {
    if (f = st(i, r, a), E(e)) {
      const b = Object.keys(e)[0], y = e[b];
      g = h[b].getPixelForValue(y) + m - t;
    } else e === "center" ? g = (l.bottom + l.top) / 2 + m - t : g = Rs(n, e, t);
    d = a - r;
  } else {
    if (E(e)) {
      const b = Object.keys(e)[0], y = e[b];
      f = h[b].getPixelForValue(y) - p + t;
    } else e === "center" ? f = (l.left + l.right) / 2 - p + t : f = Rs(n, e, t);
    g = st(i, o, s), u = e === "left" ? -ot : ot;
  }
  return {
    titleX: f,
    titleY: g,
    maxWidth: d,
    rotation: u
  };
}
class Qe extends Et {
  constructor(t) {
    super(), this.id = t.id, this.type = t.type, this.options = void 0, this.ctx = t.ctx, this.chart = t.chart, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this._margins = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, this.maxWidth = void 0, this.maxHeight = void 0, this.paddingTop = void 0, this.paddingBottom = void 0, this.paddingLeft = void 0, this.paddingRight = void 0, this.axis = void 0, this.labelRotation = void 0, this.min = void 0, this.max = void 0, this._range = void 0, this.ticks = [], this._gridLineItems = null, this._labelItems = null, this._labelSizes = null, this._length = 0, this._maxLength = 0, this._longestTextCache = {}, this._startPixel = void 0, this._endPixel = void 0, this._reversePixels = !1, this._userMax = void 0, this._userMin = void 0, this._suggestedMax = void 0, this._suggestedMin = void 0, this._ticksLength = 0, this._borderValue = 0, this._cache = {}, this._dataLimitsCached = !1, this.$context = void 0;
  }
  init(t) {
    this.options = t.setContext(this.getContext()), this.axis = t.axis, this._userMin = this.parse(t.min), this._userMax = this.parse(t.max), this._suggestedMin = this.parse(t.suggestedMin), this._suggestedMax = this.parse(t.suggestedMax);
  }
  parse(t, e) {
    return t;
  }
  getUserBounds() {
    let { _userMin: t, _userMax: e, _suggestedMin: i, _suggestedMax: s } = this;
    return t = ht(t, Number.POSITIVE_INFINITY), e = ht(e, Number.NEGATIVE_INFINITY), i = ht(i, Number.POSITIVE_INFINITY), s = ht(s, Number.NEGATIVE_INFINITY), {
      min: ht(t, i),
      max: ht(e, s),
      minDefined: J(t),
      maxDefined: J(e)
    };
  }
  getMinMax(t) {
    let { min: e, max: i, minDefined: s, maxDefined: r } = this.getUserBounds(), o;
    if (s && r)
      return {
        min: e,
        max: i
      };
    const a = this.getMatchingVisibleMetas();
    for (let c = 0, l = a.length; c < l; ++c)
      o = a[c].controller.getMinMax(this, t), s || (e = Math.min(e, o.min)), r || (i = Math.max(i, o.max));
    return e = r && e > i ? i : e, i = s && e > i ? e : i, {
      min: ht(e, ht(i, e)),
      max: ht(i, ht(e, i))
    };
  }
  getPadding() {
    return {
      left: this.paddingLeft || 0,
      top: this.paddingTop || 0,
      right: this.paddingRight || 0,
      bottom: this.paddingBottom || 0
    };
  }
  getTicks() {
    return this.ticks;
  }
  getLabels() {
    const t = this.chart.data;
    return this.options.labels || (this.isHorizontal() ? t.xLabels : t.yLabels) || t.labels || [];
  }
  getLabelItems(t = this.chart.chartArea) {
    return this._labelItems || (this._labelItems = this._computeLabelItems(t));
  }
  beforeLayout() {
    this._cache = {}, this._dataLimitsCached = !1;
  }
  beforeUpdate() {
    F(this.options.beforeUpdate, [
      this
    ]);
  }
  update(t, e, i) {
    const { beginAtZero: s, grace: r, ticks: o } = this.options, a = o.sampleSize;
    this.beforeUpdate(), this.maxWidth = t, this.maxHeight = e, this._margins = i = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, i), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + i.left + i.right : this.height + i.top + i.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = Ac(this, r, s), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const c = a < this.ticks.length;
    this._convertTicksToLabels(c ? Hs(this.ticks, a) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), o.display && (o.autoSkip || o.source === "auto") && (this.ticks = Zl(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), c && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, e, i;
    this.isHorizontal() ? (e = this.left, i = this.right) : (e = this.top, i = this.bottom, t = !t), this._startPixel = e, this._endPixel = i, this._reversePixels = t, this._length = i - e, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    F(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    F(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    F(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), F(this.options[t], [
      this
    ]);
  }
  beforeDataLimits() {
    this._callHooks("beforeDataLimits");
  }
  determineDataLimits() {
  }
  afterDataLimits() {
    this._callHooks("afterDataLimits");
  }
  beforeBuildTicks() {
    this._callHooks("beforeBuildTicks");
  }
  buildTicks() {
    return [];
  }
  afterBuildTicks() {
    this._callHooks("afterBuildTicks");
  }
  beforeTickToLabelConversion() {
    F(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(t) {
    const e = this.options.ticks;
    let i, s, r;
    for (i = 0, s = t.length; i < s; i++)
      r = t[i], r.label = F(e.callback, [
        r.value,
        i,
        t
      ], this);
  }
  afterTickToLabelConversion() {
    F(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    F(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const t = this.options, e = t.ticks, i = zs(this.ticks.length, t.ticks.maxTicksLimit), s = e.minRotation || 0, r = e.maxRotation;
    let o = s, a, c, l;
    if (!this._isVisible() || !e.display || s >= r || i <= 1 || !this.isHorizontal()) {
      this.labelRotation = s;
      return;
    }
    const h = this._getLabelSizes(), u = h.widest.width, d = h.highest.height, f = at(this.chart.width - u, 0, this.maxWidth);
    a = t.offset ? this.maxWidth / i : f / (i - 1), u + 6 > a && (a = f / (i - (t.offset ? 0.5 : 1)), c = this.maxHeight - _e(t.grid) - e.padding - Ns(t.title, this.chart.options.font), l = Math.sqrt(u * u + d * d), o = Ja(Math.min(Math.asin(at((h.highest.height + 6) / a, -1, 1)), Math.asin(at(c / l, -1, 1)) - Math.asin(at(d / l, -1, 1)))), o = Math.max(s, Math.min(r, o))), this.labelRotation = o;
  }
  afterCalculateLabelRotation() {
    F(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    F(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const t = {
      width: 0,
      height: 0
    }, { chart: e, options: { ticks: i, title: s, grid: r } } = this, o = this._isVisible(), a = this.isHorizontal();
    if (o) {
      const c = Ns(s, e.options.font);
      if (a ? (t.width = this.maxWidth, t.height = _e(r) + c) : (t.height = this.maxHeight, t.width = _e(r) + c), i.display && this.ticks.length) {
        const { first: l, last: h, widest: u, highest: d } = this._getLabelSizes(), f = i.padding * 2, g = Vt(this.labelRotation), m = Math.cos(g), p = Math.sin(g);
        if (a) {
          const b = i.mirror ? 0 : p * u.width + m * d.height;
          t.height = Math.min(this.maxHeight, t.height + b + f);
        } else {
          const b = i.mirror ? 0 : m * u.width + p * d.height;
          t.width = Math.min(this.maxWidth, t.width + b + f);
        }
        this._calculatePadding(l, h, p, m);
      }
    }
    this._handleMargins(), a ? (this.width = this._length = e.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = e.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, e, i, s) {
    const { ticks: { align: r, padding: o }, position: a } = this.options, c = this.labelRotation !== 0, l = a !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const h = this.getPixelForTick(0) - this.left, u = this.right - this.getPixelForTick(this.ticks.length - 1);
      let d = 0, f = 0;
      c ? l ? (d = s * t.width, f = i * e.height) : (d = i * t.height, f = s * e.width) : r === "start" ? f = e.width : r === "end" ? d = t.width : r !== "inner" && (d = t.width / 2, f = e.width / 2), this.paddingLeft = Math.max((d - h + o) * this.width / (this.width - h), 0), this.paddingRight = Math.max((f - u + o) * this.width / (this.width - u), 0);
    } else {
      let h = e.height / 2, u = t.height / 2;
      r === "start" ? (h = 0, u = t.height) : r === "end" && (h = e.height, u = 0), this.paddingTop = h + o, this.paddingBottom = u + o;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    F(this.options.afterFit, [
      this
    ]);
  }
  isHorizontal() {
    const { axis: t, position: e } = this.options;
    return e === "top" || e === "bottom" || t === "x";
  }
  isFullSize() {
    return this.options.fullSize;
  }
  _convertTicksToLabels(t) {
    this.beforeTickToLabelConversion(), this.generateTickLabels(t);
    let e, i;
    for (e = 0, i = t.length; e < i; e++)
      R(t[e].label) && (t.splice(e, 1), i--, e--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const e = this.options.ticks.sampleSize;
      let i = this.ticks;
      e < i.length && (i = Hs(i, e)), this._labelSizes = t = this._computeLabelSizes(i, i.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, e, i) {
    const { ctx: s, _longestTextCache: r } = this, o = [], a = [], c = Math.floor(e / zs(e, i));
    let l = 0, h = 0, u, d, f, g, m, p, b, y, v, M, _;
    for (u = 0; u < e; u += c) {
      if (g = t[u].label, m = this._resolveTickFontOptions(u), s.font = p = m.string, b = r[p] = r[p] || {
        data: {},
        gc: []
      }, y = m.lineHeight, v = M = 0, !R(g) && !X(g))
        v = ps(s, b.data, b.gc, v, g), M = y;
      else if (X(g))
        for (d = 0, f = g.length; d < f; ++d)
          _ = g[d], !R(_) && !X(_) && (v = ps(s, b.data, b.gc, v, _), M += y);
      o.push(v), a.push(M), l = Math.max(v, l), h = Math.max(M, h);
    }
    oh(r, e);
    const D = o.indexOf(l), k = a.indexOf(h), w = (P) => ({
      width: o[P] || 0,
      height: a[P] || 0
    });
    return {
      first: w(0),
      last: w(e - 1),
      widest: w(D),
      highest: w(k),
      widths: o,
      heights: a
    };
  }
  getLabelForValue(t) {
    return t;
  }
  getPixelForValue(t, e) {
    return NaN;
  }
  getValueForPixel(t) {
  }
  getPixelForTick(t) {
    const e = this.ticks;
    return t < 0 || t > e.length - 1 ? null : this.getPixelForValue(e[t].value);
  }
  getPixelForDecimal(t) {
    this._reversePixels && (t = 1 - t);
    const e = this._startPixel + t * this._length;
    return nc(this._alignToPixels ? Ht(this.chart, e, 0) : e);
  }
  getDecimalForPixel(t) {
    const e = (t - this._startPixel) / this._length;
    return this._reversePixels ? 1 - e : e;
  }
  getBasePixel() {
    return this.getPixelForValue(this.getBaseValue());
  }
  getBaseValue() {
    const { min: t, max: e } = this;
    return t < 0 && e < 0 ? e : t > 0 && e > 0 ? t : 0;
  }
  getContext(t) {
    const e = this.ticks || [];
    if (t >= 0 && t < e.length) {
      const i = e[t];
      return i.$context || (i.$context = ch(this.getContext(), t, i));
    }
    return this.$context || (this.$context = ah(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, e = Vt(this.labelRotation), i = Math.abs(Math.cos(e)), s = Math.abs(Math.sin(e)), r = this._getLabelSizes(), o = t.autoSkipPadding || 0, a = r ? r.widest.width + o : 0, c = r ? r.highest.height + o : 0;
    return this.isHorizontal() ? c * i > a * s ? a / i : c / s : c * s < a * i ? c / i : a / s;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const e = this.axis, i = this.chart, s = this.options, { grid: r, position: o, border: a } = s, c = r.offset, l = this.isHorizontal(), u = this.ticks.length + (c ? 1 : 0), d = _e(r), f = [], g = a.setContext(this.getContext()), m = g.display ? g.width : 0, p = m / 2, b = function(U) {
      return Ht(i, U, m);
    };
    let y, v, M, _, D, k, w, P, O, S, C, V;
    if (o === "top")
      y = b(this.bottom), k = this.bottom - d, P = y - p, S = b(t.top) + p, V = t.bottom;
    else if (o === "bottom")
      y = b(this.top), S = t.top, V = b(t.bottom) - p, k = y + p, P = this.top + d;
    else if (o === "left")
      y = b(this.right), D = this.right - d, w = y - p, O = b(t.left) + p, C = t.right;
    else if (o === "right")
      y = b(this.left), O = t.left, C = b(t.right) - p, D = y + p, w = this.left + d;
    else if (e === "x") {
      if (o === "center")
        y = b((t.top + t.bottom) / 2 + 0.5);
      else if (E(o)) {
        const U = Object.keys(o)[0], tt = o[U];
        y = b(this.chart.scales[U].getPixelForValue(tt));
      }
      S = t.top, V = t.bottom, k = y + p, P = k + d;
    } else if (e === "y") {
      if (o === "center")
        y = b((t.left + t.right) / 2);
      else if (E(o)) {
        const U = Object.keys(o)[0], tt = o[U];
        y = b(this.chart.scales[U].getPixelForValue(tt));
      }
      D = y - p, w = D - d, O = t.left, C = t.right;
    }
    const G = A(s.ticks.maxTicksLimit, u), z = Math.max(1, Math.ceil(u / G));
    for (v = 0; v < u; v += z) {
      const U = this.getContext(v), tt = r.setContext(U), $t = a.setContext(U), It = tt.lineWidth, K = tt.color, te = $t.dash || [], vt = $t.dashOffset, fe = tt.tickWidth, Lt = tt.tickColor, ge = tt.tickBorderDash || [], Ft = tt.tickBorderDashOffset;
      M = rh(this, v, c), M !== void 0 && (_ = Ht(i, M, It), l ? D = w = O = C = _ : k = P = S = V = _, f.push({
        tx1: D,
        ty1: k,
        tx2: w,
        ty2: P,
        x1: O,
        y1: S,
        x2: C,
        y2: V,
        width: It,
        color: K,
        borderDash: te,
        borderDashOffset: vt,
        tickWidth: fe,
        tickColor: Lt,
        tickBorderDash: ge,
        tickBorderDashOffset: Ft
      }));
    }
    return this._ticksLength = u, this._borderValue = y, f;
  }
  _computeLabelItems(t) {
    const e = this.axis, i = this.options, { position: s, ticks: r } = i, o = this.isHorizontal(), a = this.ticks, { align: c, crossAlign: l, padding: h, mirror: u } = r, d = _e(i.grid), f = d + h, g = u ? -h : f, m = -Vt(this.labelRotation), p = [];
    let b, y, v, M, _, D, k, w, P, O, S, C, V = "middle";
    if (s === "top")
      D = this.bottom - g, k = this._getXAxisLabelAlignment();
    else if (s === "bottom")
      D = this.top + g, k = this._getXAxisLabelAlignment();
    else if (s === "left") {
      const z = this._getYAxisLabelAlignment(d);
      k = z.textAlign, _ = z.x;
    } else if (s === "right") {
      const z = this._getYAxisLabelAlignment(d);
      k = z.textAlign, _ = z.x;
    } else if (e === "x") {
      if (s === "center")
        D = (t.top + t.bottom) / 2 + f;
      else if (E(s)) {
        const z = Object.keys(s)[0], U = s[z];
        D = this.chart.scales[z].getPixelForValue(U) + f;
      }
      k = this._getXAxisLabelAlignment();
    } else if (e === "y") {
      if (s === "center")
        _ = (t.left + t.right) / 2 - f;
      else if (E(s)) {
        const z = Object.keys(s)[0], U = s[z];
        _ = this.chart.scales[z].getPixelForValue(U);
      }
      k = this._getYAxisLabelAlignment(d).textAlign;
    }
    e === "y" && (c === "start" ? V = "top" : c === "end" && (V = "bottom"));
    const G = this._getLabelSizes();
    for (b = 0, y = a.length; b < y; ++b) {
      v = a[b], M = v.label;
      const z = r.setContext(this.getContext(b));
      w = this.getPixelForTick(b) + r.labelOffset, P = this._resolveTickFontOptions(b), O = P.lineHeight, S = X(M) ? M.length : 1;
      const U = S / 2, tt = z.color, $t = z.textStrokeColor, It = z.textStrokeWidth;
      let K = k;
      o ? (_ = w, k === "inner" && (b === y - 1 ? K = this.options.reverse ? "left" : "right" : b === 0 ? K = this.options.reverse ? "right" : "left" : K = "center"), s === "top" ? l === "near" || m !== 0 ? C = -S * O + O / 2 : l === "center" ? C = -G.highest.height / 2 - U * O + O : C = -G.highest.height + O / 2 : l === "near" || m !== 0 ? C = O / 2 : l === "center" ? C = G.highest.height / 2 - U * O : C = G.highest.height - S * O, u && (C *= -1), m !== 0 && !z.showLabelBackdrop && (_ += O / 2 * Math.sin(m))) : (D = w, C = (1 - S) * O / 2);
      let te;
      if (z.showLabelBackdrop) {
        const vt = lt(z.backdropPadding), fe = G.heights[b], Lt = G.widths[b];
        let ge = C - vt.top, Ft = 0 - vt.left;
        switch (V) {
          case "middle":
            ge -= fe / 2;
            break;
          case "bottom":
            ge -= fe;
            break;
        }
        switch (k) {
          case "center":
            Ft -= Lt / 2;
            break;
          case "right":
            Ft -= Lt;
            break;
          case "inner":
            b === y - 1 ? Ft -= Lt : b > 0 && (Ft -= Lt / 2);
            break;
        }
        te = {
          left: Ft,
          top: ge,
          width: Lt + vt.width,
          height: fe + vt.height,
          color: z.backdropColor
        };
      }
      p.push({
        label: M,
        font: P,
        textOffset: C,
        options: {
          rotation: m,
          color: tt,
          strokeColor: $t,
          strokeWidth: It,
          textAlign: K,
          textBaseline: V,
          translation: [
            _,
            D
          ],
          backdrop: te
        }
      });
    }
    return p;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: e } = this.options;
    if (-Vt(this.labelRotation))
      return t === "top" ? "left" : "right";
    let s = "center";
    return e.align === "start" ? s = "left" : e.align === "end" ? s = "right" : e.align === "inner" && (s = "inner"), s;
  }
  _getYAxisLabelAlignment(t) {
    const { position: e, ticks: { crossAlign: i, mirror: s, padding: r } } = this.options, o = this._getLabelSizes(), a = t + r, c = o.widest.width;
    let l, h;
    return e === "left" ? s ? (h = this.right + r, i === "near" ? l = "left" : i === "center" ? (l = "center", h += c / 2) : (l = "right", h += c)) : (h = this.right - a, i === "near" ? l = "right" : i === "center" ? (l = "center", h -= c / 2) : (l = "left", h = this.left)) : e === "right" ? s ? (h = this.left + r, i === "near" ? l = "right" : i === "center" ? (l = "center", h -= c / 2) : (l = "left", h -= c)) : (h = this.left + a, i === "near" ? l = "left" : i === "center" ? (l = "center", h += c / 2) : (l = "right", h = this.right)) : l = "right", {
      textAlign: l,
      x: h
    };
  }
  _computeLabelArea() {
    if (this.options.ticks.mirror)
      return;
    const t = this.chart, e = this.options.position;
    if (e === "left" || e === "right")
      return {
        top: 0,
        left: this.left,
        bottom: t.height,
        right: this.right
      };
    if (e === "top" || e === "bottom")
      return {
        top: this.top,
        left: 0,
        bottom: this.bottom,
        right: t.width
      };
  }
  drawBackground() {
    const { ctx: t, options: { backgroundColor: e }, left: i, top: s, width: r, height: o } = this;
    e && (t.save(), t.fillStyle = e, t.fillRect(i, s, r, o), t.restore());
  }
  getLineWidthForValue(t) {
    const e = this.options.grid;
    if (!this._isVisible() || !e.display)
      return 0;
    const s = this.ticks.findIndex((r) => r.value === t);
    return s >= 0 ? e.setContext(this.getContext(s)).lineWidth : 0;
  }
  drawGrid(t) {
    const e = this.options.grid, i = this.ctx, s = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(t));
    let r, o;
    const a = (c, l, h) => {
      !h.width || !h.color || (i.save(), i.lineWidth = h.width, i.strokeStyle = h.color, i.setLineDash(h.borderDash || []), i.lineDashOffset = h.borderDashOffset, i.beginPath(), i.moveTo(c.x, c.y), i.lineTo(l.x, l.y), i.stroke(), i.restore());
    };
    if (e.display)
      for (r = 0, o = s.length; r < o; ++r) {
        const c = s[r];
        e.drawOnChartArea && a({
          x: c.x1,
          y: c.y1
        }, {
          x: c.x2,
          y: c.y2
        }, c), e.drawTicks && a({
          x: c.tx1,
          y: c.ty1
        }, {
          x: c.tx2,
          y: c.ty2
        }, {
          color: c.tickColor,
          width: c.tickWidth,
          borderDash: c.tickBorderDash,
          borderDashOffset: c.tickBorderDashOffset
        });
      }
  }
  drawBorder() {
    const { chart: t, ctx: e, options: { border: i, grid: s } } = this, r = i.setContext(this.getContext()), o = i.display ? r.width : 0;
    if (!o)
      return;
    const a = s.setContext(this.getContext(0)).lineWidth, c = this._borderValue;
    let l, h, u, d;
    this.isHorizontal() ? (l = Ht(t, this.left, o) - o / 2, h = Ht(t, this.right, a) + a / 2, u = d = c) : (u = Ht(t, this.top, o) - o / 2, d = Ht(t, this.bottom, a) + a / 2, l = h = c), e.save(), e.lineWidth = r.width, e.strokeStyle = r.color, e.beginPath(), e.moveTo(l, u), e.lineTo(h, d), e.stroke(), e.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const i = this.ctx, s = this._computeLabelArea();
    s && In(i, s);
    const r = this.getLabelItems(t);
    for (const o of r) {
      const a = o.options, c = o.font, l = o.label, h = o.textOffset;
      Sn(i, l, 0, h, c, a);
    }
    s && Ln(i);
  }
  drawTitle() {
    const { ctx: t, options: { position: e, title: i, reverse: s } } = this;
    if (!i.display)
      return;
    const r = it(i.font), o = lt(i.padding), a = i.align;
    let c = r.lineHeight / 2;
    e === "bottom" || e === "center" || E(e) ? (c += o.bottom, X(i.text) && (c += r.lineHeight * (i.text.length - 1))) : c += o.top;
    const { titleX: l, titleY: h, maxWidth: u, rotation: d } = hh(this, c, e, a);
    Sn(t, i.text, 0, 0, r, {
      color: i.color,
      maxWidth: u,
      rotation: d,
      textAlign: lh(a, e, s),
      textBaseline: "middle",
      translation: [
        l,
        h
      ]
    });
  }
  draw(t) {
    this._isVisible() && (this.drawBackground(), this.drawGrid(t), this.drawBorder(), this.drawTitle(), this.drawLabels(t));
  }
  _layers() {
    const t = this.options, e = t.ticks && t.ticks.z || 0, i = A(t.grid && t.grid.z, -1), s = A(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== Qe.prototype.draw ? [
      {
        z: e,
        draw: (r) => {
          this.draw(r);
        }
      }
    ] : [
      {
        z: i,
        draw: (r) => {
          this.drawBackground(), this.drawGrid(r), this.drawTitle();
        }
      },
      {
        z: s,
        draw: () => {
          this.drawBorder();
        }
      },
      {
        z: e,
        draw: (r) => {
          this.drawLabels(r);
        }
      }
    ];
  }
  getMatchingVisibleMetas(t) {
    const e = this.chart.getSortedVisibleDatasetMetas(), i = this.axis + "AxisID", s = [];
    let r, o;
    for (r = 0, o = e.length; r < o; ++r) {
      const a = e[r];
      a[i] === this.id && (!t || a.type === t) && s.push(a);
    }
    return s;
  }
  _resolveTickFontOptions(t) {
    const e = this.options.ticks.setContext(this.getContext(t));
    return it(e.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class ln {
  constructor(t, e, i) {
    this.type = t, this.scope = e, this.override = i, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const e = Object.getPrototypeOf(t);
    let i;
    fh(e) && (i = this.register(e));
    const s = this.items, r = t.id, o = this.scope + "." + r;
    if (!r)
      throw new Error("class does not have id: " + t);
    return r in s || (s[r] = t, uh(t, o, i), this.override && B.override(t.id, t.overrides)), o;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const e = this.items, i = t.id, s = this.scope;
    i in e && delete e[i], s && i in B[s] && (delete B[s][i], this.override && delete Gt[i]);
  }
}
function uh(n, t, e) {
  const i = Be(/* @__PURE__ */ Object.create(null), [
    e ? B.get(e) : {},
    B.get(t),
    n.defaults
  ]);
  B.set(t, i), n.defaultRoutes && dh(t, n.defaultRoutes), n.descriptors && B.describe(t, n.descriptors);
}
function dh(n, t) {
  Object.keys(t).forEach((e) => {
    const i = e.split("."), s = i.pop(), r = [
      n
    ].concat(i).join("."), o = t[e].split("."), a = o.pop(), c = o.join(".");
    B.route(r, s, c, a);
  });
}
function fh(n) {
  return "id" in n && "defaults" in n;
}
class gh {
  constructor() {
    this.controllers = new ln(Le, "datasets", !0), this.elements = new ln(Et, "elements"), this.plugins = new ln(Object, "plugins"), this.scales = new ln(Qe, "scales"), this._typedRegistries = [
      this.controllers,
      this.scales,
      this.elements
    ];
  }
  add(...t) {
    this._each("register", t);
  }
  remove(...t) {
    this._each("unregister", t);
  }
  addControllers(...t) {
    this._each("register", t, this.controllers);
  }
  addElements(...t) {
    this._each("register", t, this.elements);
  }
  addPlugins(...t) {
    this._each("register", t, this.plugins);
  }
  addScales(...t) {
    this._each("register", t, this.scales);
  }
  getController(t) {
    return this._get(t, this.controllers, "controller");
  }
  getElement(t) {
    return this._get(t, this.elements, "element");
  }
  getPlugin(t) {
    return this._get(t, this.plugins, "plugin");
  }
  getScale(t) {
    return this._get(t, this.scales, "scale");
  }
  removeControllers(...t) {
    this._each("unregister", t, this.controllers);
  }
  removeElements(...t) {
    this._each("unregister", t, this.elements);
  }
  removePlugins(...t) {
    this._each("unregister", t, this.plugins);
  }
  removeScales(...t) {
    this._each("unregister", t, this.scales);
  }
  _each(t, e, i) {
    [
      ...e
    ].forEach((s) => {
      const r = i || this._getRegistryForType(s);
      i || r.isForType(s) || r === this.plugins && s.id ? this._exec(t, r, s) : L(s, (o) => {
        const a = i || this._getRegistryForType(o);
        this._exec(t, a, o);
      });
    });
  }
  _exec(t, e, i) {
    const s = Oi(t);
    F(i["before" + s], [], i), e[t](i), F(i["after" + s], [], i);
  }
  _getRegistryForType(t) {
    for (let e = 0; e < this._typedRegistries.length; e++) {
      const i = this._typedRegistries[e];
      if (i.isForType(t))
        return i;
    }
    return this.plugins;
  }
  _get(t, e, i) {
    const s = e.get(t);
    if (s === void 0)
      throw new Error('"' + t + '" is not a registered ' + i + ".");
    return s;
  }
}
var dt = /* @__PURE__ */ new gh();
class mh {
  constructor() {
    this._init = void 0;
  }
  notify(t, e, i, s) {
    if (e === "beforeInit" && (this._init = this._createDescriptors(t, !0), this._notify(this._init, t, "install")), this._init === void 0)
      return;
    const r = s ? this._descriptors(t).filter(s) : this._descriptors(t), o = this._notify(r, t, e, i);
    return e === "afterDestroy" && (this._notify(r, t, "stop"), this._notify(this._init, t, "uninstall"), this._init = void 0), o;
  }
  _notify(t, e, i, s) {
    s = s || {};
    for (const r of t) {
      const o = r.plugin, a = o[i], c = [
        e,
        s,
        r.options
      ];
      if (F(a, c, o) === !1 && s.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    R(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const e = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), e;
  }
  _createDescriptors(t, e) {
    const i = t && t.config, s = A(i.options && i.options.plugins, {}), r = ph(i);
    return s === !1 && !e ? [] : yh(t, r, s, e);
  }
  _notifyStateChanges(t) {
    const e = this._oldCache || [], i = this._cache, s = (r, o) => r.filter((a) => !o.some((c) => a.plugin.id === c.plugin.id));
    this._notify(s(e, i), t, "stop"), this._notify(s(i, e), t, "start");
  }
}
function ph(n) {
  const t = {}, e = [], i = Object.keys(dt.plugins.items);
  for (let r = 0; r < i.length; r++)
    e.push(dt.getPlugin(i[r]));
  const s = n.plugins || [];
  for (let r = 0; r < s.length; r++) {
    const o = s[r];
    e.indexOf(o) === -1 && (e.push(o), t[o.id] = !0);
  }
  return {
    plugins: e,
    localIds: t
  };
}
function bh(n, t) {
  return !t && n === !1 ? null : n === !0 ? {} : n;
}
function yh(n, { plugins: t, localIds: e }, i, s) {
  const r = [], o = n.getContext();
  for (const a of t) {
    const c = a.id, l = bh(i[c], s);
    l !== null && r.push({
      plugin: a,
      options: _h(n.config, {
        plugin: a,
        local: e[c]
      }, l, o)
    });
  }
  return r;
}
function _h(n, { plugin: t, local: e }, i, s) {
  const r = n.pluginScopeKeys(t), o = n.getOptionScopes(i, r);
  return e && t.defaults && o.push(t.defaults), n.createResolver(o, s, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function di(n, t) {
  const e = B.datasets[n] || {};
  return ((t.datasets || {})[n] || {}).indexAxis || t.indexAxis || e.indexAxis || "x";
}
function xh(n, t) {
  let e = n;
  return n === "_index_" ? e = t : n === "_value_" && (e = t === "x" ? "y" : "x"), e;
}
function wh(n, t) {
  return n === t ? "_index_" : "_value_";
}
function Ws(n) {
  if (n === "x" || n === "y" || n === "r")
    return n;
}
function vh(n) {
  if (n === "top" || n === "bottom")
    return "x";
  if (n === "left" || n === "right")
    return "y";
}
function fi(n, ...t) {
  if (Ws(n))
    return n;
  for (const e of t) {
    const i = e.axis || vh(e.position) || n.length > 1 && Ws(n[0].toLowerCase());
    if (i)
      return i;
  }
  throw new Error(`Cannot determine type of '${n}' axis. Please provide 'axis' or 'position' option.`);
}
function Bs(n, t, e) {
  if (e[t + "AxisID"] === n)
    return {
      axis: t
    };
}
function Mh(n, t) {
  if (t.data && t.data.datasets) {
    const e = t.data.datasets.filter((i) => i.xAxisID === n || i.yAxisID === n);
    if (e.length)
      return Bs(n, "x", e[0]) || Bs(n, "y", e[0]);
  }
  return {};
}
function kh(n, t) {
  const e = Gt[n.type] || {
    scales: {}
  }, i = t.scales || {}, s = di(n.type, t), r = /* @__PURE__ */ Object.create(null);
  return Object.keys(i).forEach((o) => {
    const a = i[o];
    if (!E(a))
      return console.error(`Invalid scale configuration for scale: ${o}`);
    if (a._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${o}`);
    const c = fi(o, a, Mh(o, n), B.scales[a.type]), l = wh(c, s), h = e.scales || {};
    r[o] = Ce(/* @__PURE__ */ Object.create(null), [
      {
        axis: c
      },
      a,
      h[c],
      h[l]
    ]);
  }), n.data.datasets.forEach((o) => {
    const a = o.type || n.type, c = o.indexAxis || di(a, t), h = (Gt[a] || {}).scales || {};
    Object.keys(h).forEach((u) => {
      const d = xh(u, c), f = o[d + "AxisID"] || d;
      r[f] = r[f] || /* @__PURE__ */ Object.create(null), Ce(r[f], [
        {
          axis: d
        },
        i[f],
        h[u]
      ]);
    });
  }), Object.keys(r).forEach((o) => {
    const a = r[o];
    Ce(a, [
      B.scales[a.type],
      B.scale
    ]);
  }), r;
}
function uo(n) {
  const t = n.options || (n.options = {});
  t.plugins = A(t.plugins, {}), t.scales = kh(n, t);
}
function fo(n) {
  return n = n || {}, n.datasets = n.datasets || [], n.labels = n.labels || [], n;
}
function Dh(n) {
  return n = n || {}, n.data = fo(n.data), uo(n), n;
}
const Ys = /* @__PURE__ */ new Map(), go = /* @__PURE__ */ new Set();
function hn(n, t) {
  let e = Ys.get(n);
  return e || (e = t(), Ys.set(n, e), go.add(e)), e;
}
const xe = (n, t, e) => {
  const i = kn(t, e);
  i !== void 0 && n.add(i);
};
class Ph {
  constructor(t) {
    this._config = Dh(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
  }
  get platform() {
    return this._config.platform;
  }
  get type() {
    return this._config.type;
  }
  set type(t) {
    this._config.type = t;
  }
  get data() {
    return this._config.data;
  }
  set data(t) {
    this._config.data = fo(t);
  }
  get options() {
    return this._config.options;
  }
  set options(t) {
    this._config.options = t;
  }
  get plugins() {
    return this._config.plugins;
  }
  update() {
    const t = this._config;
    this.clearCache(), uo(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return hn(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, e) {
    return hn(`${t}.transition.${e}`, () => [
      [
        `datasets.${t}.transitions.${e}`,
        `transitions.${e}`
      ],
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetElementScopeKeys(t, e) {
    return hn(`${t}-${e}`, () => [
      [
        `datasets.${t}.elements.${e}`,
        `datasets.${t}`,
        `elements.${e}`,
        ""
      ]
    ]);
  }
  pluginScopeKeys(t) {
    const e = t.id, i = this.type;
    return hn(`${i}-plugin-${e}`, () => [
      [
        `plugins.${e}`,
        ...t.additionalOptionScopes || []
      ]
    ]);
  }
  _cachedScopes(t, e) {
    const i = this._scopeCache;
    let s = i.get(t);
    return (!s || e) && (s = /* @__PURE__ */ new Map(), i.set(t, s)), s;
  }
  getOptionScopes(t, e, i) {
    const { options: s, type: r } = this, o = this._cachedScopes(t, i), a = o.get(e);
    if (a)
      return a;
    const c = /* @__PURE__ */ new Set();
    e.forEach((h) => {
      t && (c.add(t), h.forEach((u) => xe(c, t, u))), h.forEach((u) => xe(c, s, u)), h.forEach((u) => xe(c, Gt[r] || {}, u)), h.forEach((u) => xe(c, B, u)), h.forEach((u) => xe(c, li, u));
    });
    const l = Array.from(c);
    return l.length === 0 && l.push(/* @__PURE__ */ Object.create(null)), go.has(e) && o.set(e, l), l;
  }
  chartOptionScopes() {
    const { options: t, type: e } = this;
    return [
      t,
      Gt[e] || {},
      B.datasets[e] || {},
      {
        type: e
      },
      B,
      li
    ];
  }
  resolveNamedOptions(t, e, i, s = [
    ""
  ]) {
    const r = {
      $shared: !0
    }, { resolver: o, subPrefixes: a } = js(this._resolverCache, t, s);
    let c = o;
    if (Oh(o, e)) {
      r.$shared = !1, i = At(i) ? i() : i;
      const l = this.createResolver(t, i, a);
      c = he(o, i, l);
    }
    for (const l of e)
      r[l] = c[l];
    return r;
  }
  createResolver(t, e, i = [
    ""
  ], s) {
    const { resolver: r } = js(this._resolverCache, t, i);
    return E(e) ? he(r, e, void 0, s) : r;
  }
}
function js(n, t, e) {
  let i = n.get(t);
  i || (i = /* @__PURE__ */ new Map(), n.set(t, i));
  const s = e.join();
  let r = i.get(s);
  return r || (r = {
    resolver: Ai(t, e),
    subPrefixes: e.filter((a) => !a.toLowerCase().includes("hover"))
  }, i.set(s, r)), r;
}
const Sh = (n) => E(n) && Object.getOwnPropertyNames(n).some((t) => At(n[t]));
function Oh(n, t) {
  const { isScriptable: e, isIndexable: i } = Ur(n);
  for (const s of t) {
    const r = e(s), o = i(s), a = (o || r) && n[s];
    if (r && (At(a) || Sh(a)) || o && X(a))
      return !0;
  }
  return !1;
}
var Th = "4.5.1";
const Ch = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function Vs(n, t) {
  return n === "top" || n === "bottom" || Ch.indexOf(n) === -1 && t === "x";
}
function Us(n, t) {
  return function(e, i) {
    return e[n] === i[n] ? e[t] - i[t] : e[n] - i[n];
  };
}
function qs(n) {
  const t = n.chart, e = t.options.animation;
  t.notifyPlugins("afterRender"), F(e && e.onComplete, [
    n
  ], t);
}
function Ah(n) {
  const t = n.chart, e = t.options.animation;
  F(e && e.onProgress, [
    n
  ], t);
}
function mo(n) {
  return Ii() && typeof n == "string" ? n = document.getElementById(n) : n && n.length && (n = n[0]), n && n.canvas && (n = n.canvas), n;
}
const _n = {}, Xs = (n) => {
  const t = mo(n);
  return Object.values(_n).filter((e) => e.canvas === t).pop();
};
function Eh(n, t, e) {
  const i = Object.keys(n);
  for (const s of i) {
    const r = +s;
    if (r >= t) {
      const o = n[s];
      delete n[s], (e > 0 || r > t) && (n[r + e] = o);
    }
  }
}
function $h(n, t, e, i) {
  return !e || n.type === "mouseout" ? null : i ? t : n;
}
class wt {
  static register(...t) {
    dt.add(...t), Qs();
  }
  static unregister(...t) {
    dt.remove(...t), Qs();
  }
  constructor(t, e) {
    const i = this.config = new Ph(e), s = mo(t), r = Xs(s);
    if (r)
      throw new Error("Canvas is already in use. Chart with ID '" + r.id + "' must be destroyed before the canvas with ID '" + r.canvas.id + "' can be reused.");
    const o = i.createResolver(i.chartOptionScopes(), this.getContext());
    this.platform = new (i.platform || Kl(s))(), this.platform.updateConfig(i);
    const a = this.platform.acquireContext(s, o.aspectRatio), c = a && a.canvas, l = c && c.height, h = c && c.width;
    if (this.id = Na(), this.ctx = a, this.canvas = c, this.width = h, this.height = l, this._options = o, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new mh(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = ac((u) => this.update(u), o.resizeDelay || 0), this._dataChanges = [], _n[this.id] = this, !a || !c) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    yt.listen(this, "complete", qs), yt.listen(this, "progress", Ah), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: e }, width: i, height: s, _aspectRatio: r } = this;
    return R(t) ? e && r ? r : s ? i / s : null : t;
  }
  get data() {
    return this.config.data;
  }
  set data(t) {
    this.config.data = t;
  }
  get options() {
    return this._options;
  }
  set options(t) {
    this.config.options = t;
  }
  get registry() {
    return dt;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : xs(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return bs(this.canvas, this.ctx), this;
  }
  stop() {
    return yt.stop(this), this;
  }
  resize(t, e) {
    yt.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: e
    } : this._resize(t, e);
  }
  _resize(t, e) {
    const i = this.options, s = this.canvas, r = i.maintainAspectRatio && this.aspectRatio, o = this.platform.getMaximumSize(s, t, e, r), a = i.devicePixelRatio || this.platform.getDevicePixelRatio(), c = this.width ? "resize" : "attach";
    this.width = o.width, this.height = o.height, this._aspectRatio = this.aspectRatio, xs(this, a, !0) && (this.notifyPlugins("resize", {
      size: o
    }), F(i.onResize, [
      this,
      o
    ], this), this.attached && this._doResize(c) && this.render());
  }
  ensureScalesHaveIDs() {
    const e = this.options.scales || {};
    L(e, (i, s) => {
      i.id = s;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, e = t.scales, i = this.scales, s = Object.keys(i).reduce((o, a) => (o[a] = !1, o), {});
    let r = [];
    e && (r = r.concat(Object.keys(e).map((o) => {
      const a = e[o], c = fi(o, a), l = c === "r", h = c === "x";
      return {
        options: a,
        dposition: l ? "chartArea" : h ? "bottom" : "left",
        dtype: l ? "radialLinear" : h ? "category" : "linear"
      };
    }))), L(r, (o) => {
      const a = o.options, c = a.id, l = fi(c, a), h = A(a.type, o.dtype);
      (a.position === void 0 || Vs(a.position, l) !== Vs(o.dposition)) && (a.position = o.dposition), s[c] = !0;
      let u = null;
      if (c in i && i[c].type === h)
        u = i[c];
      else {
        const d = dt.getScale(h);
        u = new d({
          id: c,
          type: h,
          ctx: this.ctx,
          chart: this
        }), i[u.id] = u;
      }
      u.init(a, t);
    }), L(s, (o, a) => {
      o || delete i[a];
    }), L(i, (o) => {
      St.configure(this, o, o.options), St.addBox(this, o);
    });
  }
  _updateMetasets() {
    const t = this._metasets, e = this.data.datasets.length, i = t.length;
    if (t.sort((s, r) => s.index - r.index), i > e) {
      for (let s = e; s < i; ++s)
        this._destroyDatasetMeta(s);
      t.splice(e, i - e);
    }
    this._sortedMetasets = t.slice(0).sort(Us("order", "index"));
  }
  _removeUnreferencedMetasets() {
    const { _metasets: t, data: { datasets: e } } = this;
    t.length > e.length && delete this._stacks, t.forEach((i, s) => {
      e.filter((r) => r === i._dataset).length === 0 && this._destroyDatasetMeta(s);
    });
  }
  buildOrUpdateControllers() {
    const t = [], e = this.data.datasets;
    let i, s;
    for (this._removeUnreferencedMetasets(), i = 0, s = e.length; i < s; i++) {
      const r = e[i];
      let o = this.getDatasetMeta(i);
      const a = r.type || this.config.type;
      if (o.type && o.type !== a && (this._destroyDatasetMeta(i), o = this.getDatasetMeta(i)), o.type = a, o.indexAxis = r.indexAxis || di(a, this.options), o.order = r.order || 0, o.index = i, o.label = "" + r.label, o.visible = this.isDatasetVisible(i), o.controller)
        o.controller.updateIndex(i), o.controller.linkScales();
      else {
        const c = dt.getController(a), { datasetElementType: l, dataElementType: h } = B.datasets[a];
        Object.assign(c, {
          dataElementType: dt.getElement(h),
          datasetElementType: l && dt.getElement(l)
        }), o.controller = new c(this, i), t.push(o.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    L(this.data.datasets, (t, e) => {
      this.getDatasetMeta(e).controller.reset();
    }, this);
  }
  reset() {
    this._resetElements(), this.notifyPlugins("reset");
  }
  update(t) {
    const e = this.config;
    e.update();
    const i = this._options = e.createResolver(e.chartOptionScopes(), this.getContext()), s = this._animationsDisabled = !i.animation;
    if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), this._plugins.invalidate(), this.notifyPlugins("beforeUpdate", {
      mode: t,
      cancelable: !0
    }) === !1)
      return;
    const r = this.buildOrUpdateControllers();
    this.notifyPlugins("beforeElementsUpdate");
    let o = 0;
    for (let l = 0, h = this.data.datasets.length; l < h; l++) {
      const { controller: u } = this.getDatasetMeta(l), d = !s && r.indexOf(u) === -1;
      u.buildOrUpdateElements(d), o = Math.max(+u.getMaxOverflow(), o);
    }
    o = this._minPadding = i.layout.autoPadding ? o : 0, this._updateLayout(o), s || L(r, (l) => {
      l.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(Us("z", "_idx"));
    const { _active: a, _lastEvent: c } = this;
    c ? this._eventHandler(c, !0) : a.length && this._updateHoverStyles(a, a, !0), this.render();
  }
  _updateScales() {
    L(this.scales, (t) => {
      St.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, e = new Set(Object.keys(this._listeners)), i = new Set(t.events);
    (!as(e, i) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, e = this._getUniformDataChanges() || [];
    for (const { method: i, start: s, count: r } of e) {
      const o = i === "_removeElements" ? -r : r;
      Eh(t, s, o);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const e = this.data.datasets.length, i = (r) => new Set(t.filter((o) => o[0] === r).map((o, a) => a + "," + o.splice(1).join(","))), s = i(0);
    for (let r = 1; r < e; r++)
      if (!as(s, i(r)))
        return;
    return Array.from(s).map((r) => r.split(",")).map((r) => ({
      method: r[1],
      start: +r[2],
      count: +r[3]
    }));
  }
  _updateLayout(t) {
    if (this.notifyPlugins("beforeLayout", {
      cancelable: !0
    }) === !1)
      return;
    St.update(this, this.width, this.height, t);
    const e = this.chartArea, i = e.width <= 0 || e.height <= 0;
    this._layers = [], L(this.boxes, (s) => {
      i && s.position === "chartArea" || (s.configure && s.configure(), this._layers.push(...s._layers()));
    }, this), this._layers.forEach((s, r) => {
      s._idx = r;
    }), this.notifyPlugins("afterLayout");
  }
  _updateDatasets(t) {
    if (this.notifyPlugins("beforeDatasetsUpdate", {
      mode: t,
      cancelable: !0
    }) !== !1) {
      for (let e = 0, i = this.data.datasets.length; e < i; ++e)
        this.getDatasetMeta(e).controller.configure();
      for (let e = 0, i = this.data.datasets.length; e < i; ++e)
        this._updateDataset(e, At(t) ? t({
          datasetIndex: e
        }) : t);
      this.notifyPlugins("afterDatasetsUpdate", {
        mode: t
      });
    }
  }
  _updateDataset(t, e) {
    const i = this.getDatasetMeta(t), s = {
      meta: i,
      index: t,
      mode: e,
      cancelable: !0
    };
    this.notifyPlugins("beforeDatasetUpdate", s) !== !1 && (i.controller._update(e), s.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", s));
  }
  render() {
    this.notifyPlugins("beforeRender", {
      cancelable: !0
    }) !== !1 && (yt.has(this) ? this.attached && !yt.running(this) && yt.start(this) : (this.draw(), qs({
      chart: this
    })));
  }
  draw() {
    let t;
    if (this._resizeBeforeDraw) {
      const { width: i, height: s } = this._resizeBeforeDraw;
      this._resizeBeforeDraw = null, this._resize(i, s);
    }
    if (this.clear(), this.width <= 0 || this.height <= 0 || this.notifyPlugins("beforeDraw", {
      cancelable: !0
    }) === !1)
      return;
    const e = this._layers;
    for (t = 0; t < e.length && e[t].z <= 0; ++t)
      e[t].draw(this.chartArea);
    for (this._drawDatasets(); t < e.length; ++t)
      e[t].draw(this.chartArea);
    this.notifyPlugins("afterDraw");
  }
  _getSortedDatasetMetas(t) {
    const e = this._sortedMetasets, i = [];
    let s, r;
    for (s = 0, r = e.length; s < r; ++s) {
      const o = e[s];
      (!t || o.visible) && i.push(o);
    }
    return i;
  }
  getSortedVisibleDatasetMetas() {
    return this._getSortedDatasetMetas(!0);
  }
  _drawDatasets() {
    if (this.notifyPlugins("beforeDatasetsDraw", {
      cancelable: !0
    }) === !1)
      return;
    const t = this.getSortedVisibleDatasetMetas();
    for (let e = t.length - 1; e >= 0; --e)
      this._drawDataset(t[e]);
    this.notifyPlugins("afterDatasetsDraw");
  }
  _drawDataset(t) {
    const e = this.ctx, i = {
      meta: t,
      index: t.index,
      cancelable: !0
    }, s = no(this, t);
    this.notifyPlugins("beforeDatasetDraw", i) !== !1 && (s && In(e, s), t.controller.draw(), s && Ln(e), i.cancelable = !1, this.notifyPlugins("afterDatasetDraw", i));
  }
  isPointInArea(t) {
    return je(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, e, i, s) {
    const r = Cl.modes[e];
    return typeof r == "function" ? r(this, t, i, s) : [];
  }
  getDatasetMeta(t) {
    const e = this.data.datasets[t], i = this._metasets;
    let s = i.filter((r) => r && r._dataset === e).pop();
    return s || (s = {
      type: null,
      data: [],
      dataset: null,
      controller: null,
      hidden: null,
      xAxisID: null,
      yAxisID: null,
      order: e && e.order || 0,
      index: t,
      _dataset: e,
      _parsed: [],
      _sorted: !1
    }, i.push(s)), s;
  }
  getContext() {
    return this.$context || (this.$context = Kt(null, {
      chart: this,
      type: "chart"
    }));
  }
  getVisibleDatasetCount() {
    return this.getSortedVisibleDatasetMetas().length;
  }
  isDatasetVisible(t) {
    const e = this.data.datasets[t];
    if (!e)
      return !1;
    const i = this.getDatasetMeta(t);
    return typeof i.hidden == "boolean" ? !i.hidden : !e.hidden;
  }
  setDatasetVisibility(t, e) {
    const i = this.getDatasetMeta(t);
    i.hidden = !e;
  }
  toggleDataVisibility(t) {
    this._hiddenIndices[t] = !this._hiddenIndices[t];
  }
  getDataVisibility(t) {
    return !this._hiddenIndices[t];
  }
  _updateVisibility(t, e, i) {
    const s = i ? "show" : "hide", r = this.getDatasetMeta(t), o = r.controller._resolveAnimations(void 0, s);
    Dn(e) ? (r.data[e].hidden = !i, this.update()) : (this.setDatasetVisibility(t, i), o.update(r, {
      visible: i
    }), this.update((a) => a.datasetIndex === t ? s : void 0));
  }
  hide(t, e) {
    this._updateVisibility(t, e, !1);
  }
  show(t, e) {
    this._updateVisibility(t, e, !0);
  }
  _destroyDatasetMeta(t) {
    const e = this._metasets[t];
    e && e.controller && e.controller._destroy(), delete this._metasets[t];
  }
  _stop() {
    let t, e;
    for (this.stop(), yt.remove(this), t = 0, e = this.data.datasets.length; t < e; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: e } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), bs(t, e), this.platform.releaseContext(e), this.canvas = null, this.ctx = null), delete _n[this.id], this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...t) {
    return this.canvas.toDataURL(...t);
  }
  bindEvents() {
    this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
  }
  bindUserEvents() {
    const t = this._listeners, e = this.platform, i = (r, o) => {
      e.addEventListener(this, r, o), t[r] = o;
    }, s = (r, o, a) => {
      r.offsetX = o, r.offsetY = a, this._eventHandler(r);
    };
    L(this.options.events, (r) => i(r, s));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const t = this._responsiveListeners, e = this.platform, i = (c, l) => {
      e.addEventListener(this, c, l), t[c] = l;
    }, s = (c, l) => {
      t[c] && (e.removeEventListener(this, c, l), delete t[c]);
    }, r = (c, l) => {
      this.canvas && this.resize(c, l);
    };
    let o;
    const a = () => {
      s("attach", a), this.attached = !0, this.resize(), i("resize", r), i("detach", o);
    };
    o = () => {
      this.attached = !1, s("resize", r), this._stop(), this._resize(0, 0), i("attach", a);
    }, e.isAttached(this.canvas) ? a() : o();
  }
  unbindEvents() {
    L(this._listeners, (t, e) => {
      this.platform.removeEventListener(this, e, t);
    }), this._listeners = {}, L(this._responsiveListeners, (t, e) => {
      this.platform.removeEventListener(this, e, t);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(t, e, i) {
    const s = i ? "set" : "remove";
    let r, o, a, c;
    for (e === "dataset" && (r = this.getDatasetMeta(t[0].datasetIndex), r.controller["_" + s + "DatasetHoverStyle"]()), a = 0, c = t.length; a < c; ++a) {
      o = t[a];
      const l = o && this.getDatasetMeta(o.datasetIndex).controller;
      l && l[s + "HoverStyle"](o.element, o.datasetIndex, o.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t) {
    const e = this._active || [], i = t.map(({ datasetIndex: r, index: o }) => {
      const a = this.getDatasetMeta(r);
      if (!a)
        throw new Error("No dataset found at index " + r);
      return {
        datasetIndex: r,
        element: a.data[o],
        index: o
      };
    });
    !vn(i, e) && (this._active = i, this._lastEvent = null, this._updateHoverStyles(i, e));
  }
  notifyPlugins(t, e, i) {
    return this._plugins.notify(this, t, e, i);
  }
  isPluginEnabled(t) {
    return this._plugins._cache.filter((e) => e.plugin.id === t).length === 1;
  }
  _updateHoverStyles(t, e, i) {
    const s = this.options.hover, r = (c, l) => c.filter((h) => !l.some((u) => h.datasetIndex === u.datasetIndex && h.index === u.index)), o = r(e, t), a = i ? t : r(t, e);
    o.length && this.updateHoverStyle(o, s.mode, !1), a.length && s.mode && this.updateHoverStyle(a, s.mode, !0);
  }
  _eventHandler(t, e) {
    const i = {
      event: t,
      replay: e,
      cancelable: !0,
      inChartArea: this.isPointInArea(t)
    }, s = (o) => (o.options.events || this.options.events).includes(t.native.type);
    if (this.notifyPlugins("beforeEvent", i, s) === !1)
      return;
    const r = this._handleEvent(t, e, i.inChartArea);
    return i.cancelable = !1, this.notifyPlugins("afterEvent", i, s), (r || i.changed) && this.render(), this;
  }
  _handleEvent(t, e, i) {
    const { _active: s = [], options: r } = this, o = e, a = this._getActiveElements(t, s, i, o), c = Ua(t), l = $h(t, this._lastEvent, i, c);
    i && (this._lastEvent = null, F(r.onHover, [
      t,
      a,
      this
    ], this), c && F(r.onClick, [
      t,
      a,
      this
    ], this));
    const h = !vn(a, s);
    return (h || e) && (this._active = a, this._updateHoverStyles(a, s, e)), this._lastEvent = l, h;
  }
  _getActiveElements(t, e, i, s) {
    if (t.type === "mouseout")
      return [];
    if (!i)
      return e;
    const r = this.options.hover;
    return this.getElementsAtEventForMode(t, r.mode, r, s);
  }
}
x(wt, "defaults", B), x(wt, "instances", _n), x(wt, "overrides", Gt), x(wt, "registry", dt), x(wt, "version", Th), x(wt, "getChart", Xs);
function Qs() {
  return L(wt.instances, (n) => n._plugins.invalidate());
}
function po(n, t, e = t) {
  n.lineCap = A(e.borderCapStyle, t.borderCapStyle), n.setLineDash(A(e.borderDash, t.borderDash)), n.lineDashOffset = A(e.borderDashOffset, t.borderDashOffset), n.lineJoin = A(e.borderJoinStyle, t.borderJoinStyle), n.lineWidth = A(e.borderWidth, t.borderWidth), n.strokeStyle = A(e.borderColor, t.borderColor);
}
function Ih(n, t, e) {
  n.lineTo(e.x, e.y);
}
function Lh(n) {
  return n.stepped ? wc : n.tension || n.cubicInterpolationMode === "monotone" ? vc : Ih;
}
function bo(n, t, e = {}) {
  const i = n.length, { start: s = 0, end: r = i - 1 } = e, { start: o, end: a } = t, c = Math.max(s, o), l = Math.min(r, a), h = s < o && r < o || s > a && r > a;
  return {
    count: i,
    start: c,
    loop: t.loop,
    ilen: l < c && !h ? i + l - c : l - c
  };
}
function Fh(n, t, e, i) {
  const { points: s, options: r } = t, { count: o, start: a, loop: c, ilen: l } = bo(s, e, i), h = Lh(r);
  let { move: u = !0, reverse: d } = i || {}, f, g, m;
  for (f = 0; f <= l; ++f)
    g = s[(a + (d ? l - f : f)) % o], !g.skip && (u ? (n.moveTo(g.x, g.y), u = !1) : h(n, m, g, d, r.stepped), m = g);
  return c && (g = s[(a + (d ? l : 0)) % o], h(n, m, g, d, r.stepped)), !!c;
}
function Rh(n, t, e, i) {
  const s = t.points, { count: r, start: o, ilen: a } = bo(s, e, i), { move: c = !0, reverse: l } = i || {};
  let h = 0, u = 0, d, f, g, m, p, b;
  const y = (M) => (o + (l ? a - M : M)) % r, v = () => {
    m !== p && (n.lineTo(h, p), n.lineTo(h, m), n.lineTo(h, b));
  };
  for (c && (f = s[y(0)], n.moveTo(f.x, f.y)), d = 0; d <= a; ++d) {
    if (f = s[y(d)], f.skip)
      continue;
    const M = f.x, _ = f.y, D = M | 0;
    D === g ? (_ < m ? m = _ : _ > p && (p = _), h = (u * h + M) / ++u) : (v(), n.lineTo(M, _), g = D, u = 0, m = p = _), b = _;
  }
  v();
}
function gi(n) {
  const t = n.options, e = t.borderDash && t.borderDash.length;
  return !n._decimated && !n._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !e ? Rh : Fh;
}
function zh(n) {
  return n.stepped ? el : n.tension || n.cubicInterpolationMode === "monotone" ? nl : Bt;
}
function Hh(n, t, e, i) {
  let s = t._path;
  s || (s = t._path = new Path2D(), t.path(s, e, i) && s.closePath()), po(n, t.options), n.stroke(s);
}
function Nh(n, t, e, i) {
  const { segments: s, options: r } = t, o = gi(t);
  for (const a of s)
    po(n, r, a.style), n.beginPath(), o(n, t, a, {
      start: e,
      end: e + i - 1
    }) && n.closePath(), n.stroke();
}
const Wh = typeof Path2D == "function";
function Bh(n, t, e, i) {
  Wh && !t.options.segment ? Hh(n, t, e, i) : Nh(n, t, e, i);
}
class Ot extends Et {
  constructor(t) {
    super(), this.animated = !0, this.options = void 0, this._chart = void 0, this._loop = void 0, this._fullLoop = void 0, this._path = void 0, this._points = void 0, this._segments = void 0, this._decimated = !1, this._pointsUpdated = !1, this._datasetIndex = void 0, t && Object.assign(this, t);
  }
  updateControlPoints(t, e) {
    const i = this.options;
    if ((i.tension || i.cubicInterpolationMode === "monotone") && !i.stepped && !this._pointsUpdated) {
      const s = i.spanGaps ? this._loop : this._fullLoop;
      qc(this._points, i, t, s, e), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = cl(this, this.options.segment));
  }
  first() {
    const t = this.segments, e = this.points;
    return t.length && e[t[0].start];
  }
  last() {
    const t = this.segments, e = this.points, i = t.length;
    return i && e[t[i - 1].end];
  }
  interpolate(t, e) {
    const i = this.options, s = t[e], r = this.points, o = eo(this, {
      property: e,
      start: s,
      end: s
    });
    if (!o.length)
      return;
    const a = [], c = zh(i);
    let l, h;
    for (l = 0, h = o.length; l < h; ++l) {
      const { start: u, end: d } = o[l], f = r[u], g = r[d];
      if (f === g) {
        a.push(f);
        continue;
      }
      const m = Math.abs((s - f[e]) / (g[e] - f[e])), p = c(f, g, m, i.stepped);
      p[e] = t[e], a.push(p);
    }
    return a.length === 1 ? a[0] : a;
  }
  pathSegment(t, e, i) {
    return gi(this)(t, this, e, i);
  }
  path(t, e, i) {
    const s = this.segments, r = gi(this);
    let o = this._loop;
    e = e || 0, i = i || this.points.length - e;
    for (const a of s)
      o &= r(t, this, a, {
        start: e,
        end: e + i - 1
      });
    return !!o;
  }
  draw(t, e, i, s) {
    const r = this.options || {};
    (this.points || []).length && r.borderWidth && (t.save(), Bh(t, this, i, s), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
x(Ot, "id", "line"), x(Ot, "defaults", {
  borderCapStyle: "butt",
  borderDash: [],
  borderDashOffset: 0,
  borderJoinStyle: "miter",
  borderWidth: 3,
  capBezierPoints: !0,
  cubicInterpolationMode: "default",
  fill: !1,
  spanGaps: !1,
  stepped: !1,
  tension: 0
}), x(Ot, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
}), x(Ot, "descriptors", {
  _scriptable: !0,
  _indexable: (t) => t !== "borderDash" && t !== "fill"
});
function Gs(n, t, e, i) {
  const s = n.options, { [e]: r } = n.getProps([
    e
  ], i);
  return Math.abs(t - r) < s.radius + s.hitRadius;
}
class xn extends Et {
  constructor(e) {
    super();
    x(this, "parsed");
    x(this, "skip");
    x(this, "stop");
    this.options = void 0, this.parsed = void 0, this.skip = void 0, this.stop = void 0, e && Object.assign(this, e);
  }
  inRange(e, i, s) {
    const r = this.options, { x: o, y: a } = this.getProps([
      "x",
      "y"
    ], s);
    return Math.pow(e - o, 2) + Math.pow(i - a, 2) < Math.pow(r.hitRadius + r.radius, 2);
  }
  inXRange(e, i) {
    return Gs(this, e, "x", i);
  }
  inYRange(e, i) {
    return Gs(this, e, "y", i);
  }
  getCenterPoint(e) {
    const { x: i, y: s } = this.getProps([
      "x",
      "y"
    ], e);
    return {
      x: i,
      y: s
    };
  }
  size(e) {
    e = e || this.options || {};
    let i = e.radius || 0;
    i = Math.max(i, i && e.hoverRadius || 0);
    const s = i && e.borderWidth || 0;
    return (i + s) * 2;
  }
  draw(e, i) {
    const s = this.options;
    this.skip || s.radius < 0.1 || !je(this, i, this.size(s) / 2) || (e.strokeStyle = s.borderColor, e.lineWidth = s.borderWidth, e.fillStyle = s.backgroundColor, hi(e, s, this.x, this.y));
  }
  getRange() {
    const e = this.options || {};
    return e.radius + e.hitRadius;
  }
}
x(xn, "id", "point"), /**
* @type {any}
*/
x(xn, "defaults", {
  borderWidth: 1,
  hitRadius: 1,
  hoverBorderWidth: 1,
  hoverRadius: 4,
  pointStyle: "circle",
  radius: 3,
  rotation: 0
}), /**
* @type {any}
*/
x(xn, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
});
function Yh(n, t, e) {
  const i = n.segments, s = n.points, r = t.points, o = [];
  for (const a of i) {
    let { start: c, end: l } = a;
    l = zn(c, l, s);
    const h = mi(e, s[c], s[l], a.loop);
    if (!t.segments) {
      o.push({
        source: a,
        target: h,
        start: s[c],
        end: s[l]
      });
      continue;
    }
    const u = eo(t, h);
    for (const d of u) {
      const f = mi(e, r[d.start], r[d.end], d.loop), g = to(a, s, f);
      for (const m of g)
        o.push({
          source: m,
          target: d,
          start: {
            [e]: Ks(h, f, "start", Math.max)
          },
          end: {
            [e]: Ks(h, f, "end", Math.min)
          }
        });
    }
  }
  return o;
}
function mi(n, t, e, i) {
  if (i)
    return;
  let s = t[n], r = e[n];
  return n === "angle" && (s = ft(s), r = ft(r)), {
    property: n,
    start: s,
    end: r
  };
}
function jh(n, t) {
  const { x: e = null, y: i = null } = n || {}, s = t.points, r = [];
  return t.segments.forEach(({ start: o, end: a }) => {
    a = zn(o, a, s);
    const c = s[o], l = s[a];
    i !== null ? (r.push({
      x: c.x,
      y: i
    }), r.push({
      x: l.x,
      y: i
    })) : e !== null && (r.push({
      x: e,
      y: c.y
    }), r.push({
      x: e,
      y: l.y
    }));
  }), r;
}
function zn(n, t, e) {
  for (; t > n; t--) {
    const i = e[t];
    if (!isNaN(i.x) && !isNaN(i.y))
      break;
  }
  return t;
}
function Ks(n, t, e, i) {
  return n && t ? i(n[e], t[e]) : n ? n[e] : t ? t[e] : 0;
}
function yo(n, t) {
  let e = [], i = !1;
  return X(n) ? (i = !0, e = n) : e = jh(n, t), e.length ? new Ot({
    points: e,
    options: {
      tension: 0
    },
    _loop: i,
    _fullLoop: i
  }) : null;
}
function Zs(n) {
  return n && n.fill !== !1;
}
function Vh(n, t, e) {
  let s = n[t].fill;
  const r = [
    t
  ];
  let o;
  if (!e)
    return s;
  for (; s !== !1 && r.indexOf(s) === -1; ) {
    if (!J(s))
      return s;
    if (o = n[s], !o)
      return !1;
    if (o.visible)
      return s;
    r.push(s), s = o.fill;
  }
  return !1;
}
function Uh(n, t, e) {
  const i = Gh(n);
  if (E(i))
    return isNaN(i.value) ? !1 : i;
  let s = parseFloat(i);
  return J(s) && Math.floor(s) === s ? qh(i[0], t, s, e) : [
    "origin",
    "start",
    "end",
    "stack",
    "shape"
  ].indexOf(i) >= 0 && i;
}
function qh(n, t, e, i) {
  return (n === "-" || n === "+") && (e = t + e), e === t || e < 0 || e >= i ? !1 : e;
}
function Xh(n, t) {
  let e = null;
  return n === "start" ? e = t.bottom : n === "end" ? e = t.top : E(n) ? e = t.getPixelForValue(n.value) : t.getBasePixel && (e = t.getBasePixel()), e;
}
function Qh(n, t, e) {
  let i;
  return n === "start" ? i = e : n === "end" ? i = t.options.reverse ? t.min : t.max : E(n) ? i = n.value : i = t.getBaseValue(), i;
}
function Gh(n) {
  const t = n.options, e = t.fill;
  let i = A(e && e.target, e);
  return i === void 0 && (i = !!t.backgroundColor), i === !1 || i === null ? !1 : i === !0 ? "origin" : i;
}
function Kh(n) {
  const { scale: t, index: e, line: i } = n, s = [], r = i.segments, o = i.points, a = Zh(t, e);
  a.push(yo({
    x: null,
    y: t.bottom
  }, i));
  for (let c = 0; c < r.length; c++) {
    const l = r[c];
    for (let h = l.start; h <= l.end; h++)
      Jh(s, o[h], a);
  }
  return new Ot({
    points: s,
    options: {}
  });
}
function Zh(n, t) {
  const e = [], i = n.getMatchingVisibleMetas("line");
  for (let s = 0; s < i.length; s++) {
    const r = i[s];
    if (r.index === t)
      break;
    r.hidden || e.unshift(r.dataset);
  }
  return e;
}
function Jh(n, t, e) {
  const i = [];
  for (let s = 0; s < e.length; s++) {
    const r = e[s], { first: o, last: a, point: c } = tu(r, t, "x");
    if (!(!c || o && a)) {
      if (o)
        i.unshift(c);
      else if (n.push(c), !a)
        break;
    }
  }
  n.push(...i);
}
function tu(n, t, e) {
  const i = n.interpolate(t, e);
  if (!i)
    return {};
  const s = i[e], r = n.segments, o = n.points;
  let a = !1, c = !1;
  for (let l = 0; l < r.length; l++) {
    const h = r[l], u = o[h.start][e], d = o[h.end][e];
    if (se(s, u, d)) {
      a = s === u, c = s === d;
      break;
    }
  }
  return {
    first: a,
    last: c,
    point: i
  };
}
class _o {
  constructor(t) {
    this.x = t.x, this.y = t.y, this.radius = t.radius;
  }
  pathSegment(t, e, i) {
    const { x: s, y: r, radius: o } = this;
    return e = e || {
      start: 0,
      end: ct
    }, t.arc(s, r, o, e.end, e.start, !0), !i.bounds;
  }
  interpolate(t) {
    const { x: e, y: i, radius: s } = this, r = t.angle;
    return {
      x: e + Math.cos(r) * s,
      y: i + Math.sin(r) * s,
      angle: r
    };
  }
}
function eu(n) {
  const { chart: t, fill: e, line: i } = n;
  if (J(e))
    return nu(t, e);
  if (e === "stack")
    return Kh(n);
  if (e === "shape")
    return !0;
  const s = iu(n);
  return s instanceof _o ? s : yo(s, i);
}
function nu(n, t) {
  const e = n.getDatasetMeta(t);
  return e && n.isDatasetVisible(t) ? e.dataset : null;
}
function iu(n) {
  return (n.scale || {}).getPointPositionForValue ? ru(n) : su(n);
}
function su(n) {
  const { scale: t = {}, fill: e } = n, i = Xh(e, t);
  if (J(i)) {
    const s = t.isHorizontal();
    return {
      x: s ? i : null,
      y: s ? null : i
    };
  }
  return null;
}
function ru(n) {
  const { scale: t, fill: e } = n, i = t.options, s = t.getLabels().length, r = i.reverse ? t.max : t.min, o = Qh(e, t, r), a = [];
  if (i.grid.circular) {
    const c = t.getPointPositionForValue(0, r);
    return new _o({
      x: c.x,
      y: c.y,
      radius: t.getDistanceFromCenterForValue(o)
    });
  }
  for (let c = 0; c < s; ++c)
    a.push(t.getPointPositionForValue(c, o));
  return a;
}
function ti(n, t, e) {
  const i = eu(t), { chart: s, index: r, line: o, scale: a, axis: c } = t, l = o.options, h = l.fill, u = l.backgroundColor, { above: d = u, below: f = u } = h || {}, g = s.getDatasetMeta(r), m = no(s, g);
  i && o.points.length && (In(n, e), ou(n, {
    line: o,
    target: i,
    above: d,
    below: f,
    area: e,
    scale: a,
    axis: c,
    clip: m
  }), Ln(n));
}
function ou(n, t) {
  const { line: e, target: i, above: s, below: r, area: o, scale: a, clip: c } = t, l = e._loop ? "angle" : t.axis;
  n.save();
  let h = r;
  r !== s && (l === "x" ? (Js(n, i, o.top), ei(n, {
    line: e,
    target: i,
    color: s,
    scale: a,
    property: l,
    clip: c
  }), n.restore(), n.save(), Js(n, i, o.bottom)) : l === "y" && (tr(n, i, o.left), ei(n, {
    line: e,
    target: i,
    color: r,
    scale: a,
    property: l,
    clip: c
  }), n.restore(), n.save(), tr(n, i, o.right), h = s)), ei(n, {
    line: e,
    target: i,
    color: h,
    scale: a,
    property: l,
    clip: c
  }), n.restore();
}
function Js(n, t, e) {
  const { segments: i, points: s } = t;
  let r = !0, o = !1;
  n.beginPath();
  for (const a of i) {
    const { start: c, end: l } = a, h = s[c], u = s[zn(c, l, s)];
    r ? (n.moveTo(h.x, h.y), r = !1) : (n.lineTo(h.x, e), n.lineTo(h.x, h.y)), o = !!t.pathSegment(n, a, {
      move: o
    }), o ? n.closePath() : n.lineTo(u.x, e);
  }
  n.lineTo(t.first().x, e), n.closePath(), n.clip();
}
function tr(n, t, e) {
  const { segments: i, points: s } = t;
  let r = !0, o = !1;
  n.beginPath();
  for (const a of i) {
    const { start: c, end: l } = a, h = s[c], u = s[zn(c, l, s)];
    r ? (n.moveTo(h.x, h.y), r = !1) : (n.lineTo(e, h.y), n.lineTo(h.x, h.y)), o = !!t.pathSegment(n, a, {
      move: o
    }), o ? n.closePath() : n.lineTo(e, u.y);
  }
  n.lineTo(e, t.first().y), n.closePath(), n.clip();
}
function ei(n, t) {
  const { line: e, target: i, property: s, color: r, scale: o, clip: a } = t, c = Yh(e, i, s);
  for (const { source: l, target: h, start: u, end: d } of c) {
    const { style: { backgroundColor: f = r } = {} } = l, g = i !== !0;
    n.save(), n.fillStyle = f, au(n, o, a, g && mi(s, u, d)), n.beginPath();
    const m = !!e.pathSegment(n, l);
    let p;
    if (g) {
      m ? n.closePath() : er(n, i, d, s);
      const b = !!i.pathSegment(n, h, {
        move: m,
        reverse: !0
      });
      p = m && b, p || er(n, i, u, s);
    }
    n.closePath(), n.fill(p ? "evenodd" : "nonzero"), n.restore();
  }
}
function au(n, t, e, i) {
  const s = t.chart.chartArea, { property: r, start: o, end: a } = i || {};
  if (r === "x" || r === "y") {
    let c, l, h, u;
    r === "x" ? (c = o, l = s.top, h = a, u = s.bottom) : (c = s.left, l = o, h = s.right, u = a), n.beginPath(), e && (c = Math.max(c, e.left), h = Math.min(h, e.right), l = Math.max(l, e.top), u = Math.min(u, e.bottom)), n.rect(c, l, h - c, u - l), n.clip();
  }
}
function er(n, t, e, i) {
  const s = t.interpolate(e, i);
  s && n.lineTo(s.x, s.y);
}
var cu = {
  id: "filler",
  afterDatasetsUpdate(n, t, e) {
    const i = (n.data.datasets || []).length, s = [];
    let r, o, a, c;
    for (o = 0; o < i; ++o)
      r = n.getDatasetMeta(o), a = r.dataset, c = null, a && a.options && a instanceof Ot && (c = {
        visible: n.isDatasetVisible(o),
        index: o,
        fill: Uh(a, o, i),
        chart: n,
        axis: r.controller.options.indexAxis,
        scale: r.vScale,
        line: a
      }), r.$filler = c, s.push(c);
    for (o = 0; o < i; ++o)
      c = s[o], !(!c || c.fill === !1) && (c.fill = Vh(s, o, e.propagate));
  },
  beforeDraw(n, t, e) {
    const i = e.drawTime === "beforeDraw", s = n.getSortedVisibleDatasetMetas(), r = n.chartArea;
    for (let o = s.length - 1; o >= 0; --o) {
      const a = s[o].$filler;
      a && (a.line.updateControlPoints(r, a.axis), i && a.fill && ti(n.ctx, a, r));
    }
  },
  beforeDatasetsDraw(n, t, e) {
    if (e.drawTime !== "beforeDatasetsDraw")
      return;
    const i = n.getSortedVisibleDatasetMetas();
    for (let s = i.length - 1; s >= 0; --s) {
      const r = i[s].$filler;
      Zs(r) && ti(n.ctx, r, n.chartArea);
    }
  },
  beforeDatasetDraw(n, t, e) {
    const i = t.meta.$filler;
    !Zs(i) || e.drawTime !== "beforeDatasetDraw" || ti(n.ctx, i, n.chartArea);
  },
  defaults: {
    propagate: !0,
    drawTime: "beforeDatasetDraw"
  }
};
const nr = (n, t) => {
  let { boxHeight: e = t, boxWidth: i = t } = n;
  return n.usePointStyle && (e = Math.min(e, t), i = n.pointStyleWidth || Math.min(i, t)), {
    boxWidth: i,
    boxHeight: e,
    itemHeight: Math.max(t, e)
  };
}, lu = (n, t) => n !== null && t !== null && n.datasetIndex === t.datasetIndex && n.index === t.index;
class ir extends Et {
  constructor(t) {
    super(), this._added = !1, this.legendHitBoxes = [], this._hoveredItem = null, this.doughnutMode = !1, this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this.legendItems = void 0, this.columnSizes = void 0, this.lineWidths = void 0, this.maxHeight = void 0, this.maxWidth = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.height = void 0, this.width = void 0, this._margins = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(t, e, i) {
    this.maxWidth = t, this.maxHeight = e, this._margins = i, this.setDimensions(), this.buildLabels(), this.fit();
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = this._margins.left, this.right = this.width) : (this.height = this.maxHeight, this.top = this._margins.top, this.bottom = this.height);
  }
  buildLabels() {
    const t = this.options.labels || {};
    let e = F(t.generateLabels, [
      this.chart
    ], this) || [];
    t.filter && (e = e.filter((i) => t.filter(i, this.chart.data))), t.sort && (e = e.sort((i, s) => t.sort(i, s, this.chart.data))), this.options.reverse && e.reverse(), this.legendItems = e;
  }
  fit() {
    const { options: t, ctx: e } = this;
    if (!t.display) {
      this.width = this.height = 0;
      return;
    }
    const i = t.labels, s = it(i.font), r = s.size, o = this._computeTitleHeight(), { boxWidth: a, itemHeight: c } = nr(i, r);
    let l, h;
    e.font = s.string, this.isHorizontal() ? (l = this.maxWidth, h = this._fitRows(o, r, a, c) + 10) : (h = this.maxHeight, l = this._fitCols(o, s, a, c) + 10), this.width = Math.min(l, t.maxWidth || this.maxWidth), this.height = Math.min(h, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, e, i, s) {
    const { ctx: r, maxWidth: o, options: { labels: { padding: a } } } = this, c = this.legendHitBoxes = [], l = this.lineWidths = [
      0
    ], h = s + a;
    let u = t;
    r.textAlign = "left", r.textBaseline = "middle";
    let d = -1, f = -h;
    return this.legendItems.forEach((g, m) => {
      const p = i + e / 2 + r.measureText(g.text).width;
      (m === 0 || l[l.length - 1] + p + 2 * a > o) && (u += h, l[l.length - (m > 0 ? 0 : 1)] = 0, f += h, d++), c[m] = {
        left: 0,
        top: f,
        row: d,
        width: p,
        height: s
      }, l[l.length - 1] += p + a;
    }), u;
  }
  _fitCols(t, e, i, s) {
    const { ctx: r, maxHeight: o, options: { labels: { padding: a } } } = this, c = this.legendHitBoxes = [], l = this.columnSizes = [], h = o - t;
    let u = a, d = 0, f = 0, g = 0, m = 0;
    return this.legendItems.forEach((p, b) => {
      const { itemWidth: y, itemHeight: v } = hu(i, e, r, p, s);
      b > 0 && f + v + 2 * a > h && (u += d + a, l.push({
        width: d,
        height: f
      }), g += d + a, m++, d = f = 0), c[b] = {
        left: g,
        top: f,
        col: m,
        width: y,
        height: v
      }, d = Math.max(d, y), f += v + a;
    }), u += d, l.push({
      width: d,
      height: f
    }), u;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: e, options: { align: i, labels: { padding: s }, rtl: r } } = this, o = re(r, this.left, this.width);
    if (this.isHorizontal()) {
      let a = 0, c = st(i, this.left + s, this.right - this.lineWidths[a]);
      for (const l of e)
        a !== l.row && (a = l.row, c = st(i, this.left + s, this.right - this.lineWidths[a])), l.top += this.top + t + s, l.left = o.leftForLtr(o.x(c), l.width), c += l.width + s;
    } else {
      let a = 0, c = st(i, this.top + t + s, this.bottom - this.columnSizes[a].height);
      for (const l of e)
        l.col !== a && (a = l.col, c = st(i, this.top + t + s, this.bottom - this.columnSizes[a].height)), l.top = c, l.left += this.left + s, l.left = o.leftForLtr(o.x(l.left), l.width), c += l.height + s;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      In(t, this), this._draw(), Ln(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: e, lineWidths: i, ctx: s } = this, { align: r, labels: o } = t, a = B.color, c = re(t.rtl, this.left, this.width), l = it(o.font), { padding: h } = o, u = l.size, d = u / 2;
    let f;
    this.drawTitle(), s.textAlign = c.textAlign("left"), s.textBaseline = "middle", s.lineWidth = 0.5, s.font = l.string;
    const { boxWidth: g, boxHeight: m, itemHeight: p } = nr(o, u), b = function(D, k, w) {
      if (isNaN(g) || g <= 0 || isNaN(m) || m < 0)
        return;
      s.save();
      const P = A(w.lineWidth, 1);
      if (s.fillStyle = A(w.fillStyle, a), s.lineCap = A(w.lineCap, "butt"), s.lineDashOffset = A(w.lineDashOffset, 0), s.lineJoin = A(w.lineJoin, "miter"), s.lineWidth = P, s.strokeStyle = A(w.strokeStyle, a), s.setLineDash(A(w.lineDash, [])), o.usePointStyle) {
        const O = {
          radius: m * Math.SQRT2 / 2,
          pointStyle: w.pointStyle,
          rotation: w.rotation,
          borderWidth: P
        }, S = c.xPlus(D, g / 2), C = k + d;
        jr(s, O, S, C, o.pointStyleWidth && g);
      } else {
        const O = k + Math.max((u - m) / 2, 0), S = c.leftForLtr(D, g), C = Ie(w.borderRadius);
        s.beginPath(), Object.values(C).some((V) => V !== 0) ? ui(s, {
          x: S,
          y: O,
          w: g,
          h: m,
          radius: C
        }) : s.rect(S, O, g, m), s.fill(), P !== 0 && s.stroke();
      }
      s.restore();
    }, y = function(D, k, w) {
      Sn(s, w.text, D, k + p / 2, l, {
        strikethrough: w.hidden,
        textAlign: c.textAlign(w.textAlign)
      });
    }, v = this.isHorizontal(), M = this._computeTitleHeight();
    v ? f = {
      x: st(r, this.left + h, this.right - i[0]),
      y: this.top + h + M,
      line: 0
    } : f = {
      x: this.left + h,
      y: st(r, this.top + M + h, this.bottom - e[0].height),
      line: 0
    }, Kr(this.ctx, t.textDirection);
    const _ = p + h;
    this.legendItems.forEach((D, k) => {
      s.strokeStyle = D.fontColor, s.fillStyle = D.fontColor;
      const w = s.measureText(D.text).width, P = c.textAlign(D.textAlign || (D.textAlign = o.textAlign)), O = g + d + w;
      let S = f.x, C = f.y;
      c.setWidth(this.width), v ? k > 0 && S + O + h > this.right && (C = f.y += _, f.line++, S = f.x = st(r, this.left + h, this.right - i[f.line])) : k > 0 && C + _ > this.bottom && (S = f.x = S + e[f.line].width + h, f.line++, C = f.y = st(r, this.top + M + h, this.bottom - e[f.line].height));
      const V = c.x(S);
      if (b(V, C, D), S = cc(P, S + g + d, v ? S + O : this.right, t.rtl), y(c.x(S), C, D), v)
        f.x += O + h;
      else if (typeof D.text != "string") {
        const G = l.lineHeight;
        f.y += xo(D, G) + h;
      } else
        f.y += _;
    }), Zr(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, e = t.title, i = it(e.font), s = lt(e.padding);
    if (!e.display)
      return;
    const r = re(t.rtl, this.left, this.width), o = this.ctx, a = e.position, c = i.size / 2, l = s.top + c;
    let h, u = this.left, d = this.width;
    if (this.isHorizontal())
      d = Math.max(...this.lineWidths), h = this.top + l, u = st(t.align, u, this.right - d);
    else {
      const g = this.columnSizes.reduce((m, p) => Math.max(m, p.height), 0);
      h = l + st(t.align, this.top, this.bottom - g - t.labels.padding - this._computeTitleHeight());
    }
    const f = st(a, u, u + d);
    o.textAlign = r.textAlign(Wr(a)), o.textBaseline = "middle", o.strokeStyle = e.color, o.fillStyle = e.color, o.font = i.string, Sn(o, e.text, f, h, i);
  }
  _computeTitleHeight() {
    const t = this.options.title, e = it(t.font), i = lt(t.padding);
    return t.display ? e.lineHeight + i.height : 0;
  }
  _getLegendItemAt(t, e) {
    let i, s, r;
    if (se(t, this.left, this.right) && se(e, this.top, this.bottom)) {
      for (r = this.legendHitBoxes, i = 0; i < r.length; ++i)
        if (s = r[i], se(t, s.left, s.left + s.width) && se(e, s.top, s.top + s.height))
          return this.legendItems[i];
    }
    return null;
  }
  handleEvent(t) {
    const e = this.options;
    if (!fu(t.type, e))
      return;
    const i = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const s = this._hoveredItem, r = lu(s, i);
      s && !r && F(e.onLeave, [
        t,
        s,
        this
      ], this), this._hoveredItem = i, i && !r && F(e.onHover, [
        t,
        i,
        this
      ], this);
    } else i && F(e.onClick, [
      t,
      i,
      this
    ], this);
  }
}
function hu(n, t, e, i, s) {
  const r = uu(i, n, t, e), o = du(s, i, t.lineHeight);
  return {
    itemWidth: r,
    itemHeight: o
  };
}
function uu(n, t, e, i) {
  let s = n.text;
  return s && typeof s != "string" && (s = s.reduce((r, o) => r.length > o.length ? r : o)), t + e.size / 2 + i.measureText(s).width;
}
function du(n, t, e) {
  let i = n;
  return typeof t.text != "string" && (i = xo(t, e)), i;
}
function xo(n, t) {
  const e = n.text ? n.text.length : 0;
  return t * e;
}
function fu(n, t) {
  return !!((n === "mousemove" || n === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (n === "click" || n === "mouseup"));
}
var gu = {
  id: "legend",
  _element: ir,
  start(n, t, e) {
    const i = n.legend = new ir({
      ctx: n.ctx,
      options: e,
      chart: n
    });
    St.configure(n, i, e), St.addBox(n, i);
  },
  stop(n) {
    St.removeBox(n, n.legend), delete n.legend;
  },
  beforeUpdate(n, t, e) {
    const i = n.legend;
    St.configure(n, i, e), i.options = e;
  },
  afterUpdate(n) {
    const t = n.legend;
    t.buildLabels(), t.adjustHitBoxes();
  },
  afterEvent(n, t) {
    t.replay || n.legend.handleEvent(t.event);
  },
  defaults: {
    display: !0,
    position: "top",
    align: "center",
    fullSize: !0,
    reverse: !1,
    weight: 1e3,
    onClick(n, t, e) {
      const i = t.datasetIndex, s = e.chart;
      s.isDatasetVisible(i) ? (s.hide(i), t.hidden = !0) : (s.show(i), t.hidden = !1);
    },
    onHover: null,
    onLeave: null,
    labels: {
      color: (n) => n.chart.options.color,
      boxWidth: 40,
      padding: 10,
      generateLabels(n) {
        const t = n.data.datasets, { labels: { usePointStyle: e, pointStyle: i, textAlign: s, color: r, useBorderRadius: o, borderRadius: a } } = n.legend.options;
        return n._getSortedDatasetMetas().map((c) => {
          const l = c.controller.getStyle(e ? 0 : void 0), h = lt(l.borderWidth);
          return {
            text: t[c.index].label,
            fillStyle: l.backgroundColor,
            fontColor: r,
            hidden: !c.visible,
            lineCap: l.borderCapStyle,
            lineDash: l.borderDash,
            lineDashOffset: l.borderDashOffset,
            lineJoin: l.borderJoinStyle,
            lineWidth: (h.width + h.height) / 4,
            strokeStyle: l.borderColor,
            pointStyle: i || l.pointStyle,
            rotation: l.rotation,
            textAlign: s || l.textAlign,
            borderRadius: o && (a || l.borderRadius),
            datasetIndex: c.index
          };
        }, this);
      }
    },
    title: {
      color: (n) => n.chart.options.color,
      display: !1,
      position: "center",
      text: ""
    }
  },
  descriptors: {
    _scriptable: (n) => !n.startsWith("on"),
    labels: {
      _scriptable: (n) => ![
        "generateLabels",
        "filter",
        "sort"
      ].includes(n)
    }
  }
};
const Pe = {
  average(n) {
    if (!n.length)
      return !1;
    let t, e, i = /* @__PURE__ */ new Set(), s = 0, r = 0;
    for (t = 0, e = n.length; t < e; ++t) {
      const a = n[t].element;
      if (a && a.hasValue()) {
        const c = a.tooltipPosition();
        i.add(c.x), s += c.y, ++r;
      }
    }
    return r === 0 || i.size === 0 ? !1 : {
      x: [
        ...i
      ].reduce((a, c) => a + c) / i.size,
      y: s / r
    };
  },
  nearest(n, t) {
    if (!n.length)
      return !1;
    let e = t.x, i = t.y, s = Number.POSITIVE_INFINITY, r, o, a;
    for (r = 0, o = n.length; r < o; ++r) {
      const c = n[r].element;
      if (c && c.hasValue()) {
        const l = c.getCenterPoint(), h = ci(t, l);
        h < s && (s = h, a = c);
      }
    }
    if (a) {
      const c = a.tooltipPosition();
      e = c.x, i = c.y;
    }
    return {
      x: e,
      y: i
    };
  }
};
function ut(n, t) {
  return t && (X(t) ? Array.prototype.push.apply(n, t) : n.push(t)), n;
}
function _t(n) {
  return (typeof n == "string" || n instanceof String) && n.indexOf(`
`) > -1 ? n.split(`
`) : n;
}
function mu(n, t) {
  const { element: e, datasetIndex: i, index: s } = t, r = n.getDatasetMeta(i).controller, { label: o, value: a } = r.getLabelAndValue(s);
  return {
    chart: n,
    label: o,
    parsed: r.getParsed(s),
    raw: n.data.datasets[i].data[s],
    formattedValue: a,
    dataset: r.getDataset(),
    dataIndex: s,
    datasetIndex: i,
    element: e
  };
}
function sr(n, t) {
  const e = n.chart.ctx, { body: i, footer: s, title: r } = n, { boxWidth: o, boxHeight: a } = t, c = it(t.bodyFont), l = it(t.titleFont), h = it(t.footerFont), u = r.length, d = s.length, f = i.length, g = lt(t.padding);
  let m = g.height, p = 0, b = i.reduce((M, _) => M + _.before.length + _.lines.length + _.after.length, 0);
  if (b += n.beforeBody.length + n.afterBody.length, u && (m += u * l.lineHeight + (u - 1) * t.titleSpacing + t.titleMarginBottom), b) {
    const M = t.displayColors ? Math.max(a, c.lineHeight) : c.lineHeight;
    m += f * M + (b - f) * c.lineHeight + (b - 1) * t.bodySpacing;
  }
  d && (m += t.footerMarginTop + d * h.lineHeight + (d - 1) * t.footerSpacing);
  let y = 0;
  const v = function(M) {
    p = Math.max(p, e.measureText(M).width + y);
  };
  return e.save(), e.font = l.string, L(n.title, v), e.font = c.string, L(n.beforeBody.concat(n.afterBody), v), y = t.displayColors ? o + 2 + t.boxPadding : 0, L(i, (M) => {
    L(M.before, v), L(M.lines, v), L(M.after, v);
  }), y = 0, e.font = h.string, L(n.footer, v), e.restore(), p += g.width, {
    width: p,
    height: m
  };
}
function pu(n, t) {
  const { y: e, height: i } = t;
  return e < i / 2 ? "top" : e > n.height - i / 2 ? "bottom" : "center";
}
function bu(n, t, e, i) {
  const { x: s, width: r } = i, o = e.caretSize + e.caretPadding;
  if (n === "left" && s + r + o > t.width || n === "right" && s - r - o < 0)
    return !0;
}
function yu(n, t, e, i) {
  const { x: s, width: r } = e, { width: o, chartArea: { left: a, right: c } } = n;
  let l = "center";
  return i === "center" ? l = s <= (a + c) / 2 ? "left" : "right" : s <= r / 2 ? l = "left" : s >= o - r / 2 && (l = "right"), bu(l, n, t, e) && (l = "center"), l;
}
function rr(n, t, e) {
  const i = e.yAlign || t.yAlign || pu(n, e);
  return {
    xAlign: e.xAlign || t.xAlign || yu(n, t, e, i),
    yAlign: i
  };
}
function _u(n, t) {
  let { x: e, width: i } = n;
  return t === "right" ? e -= i : t === "center" && (e -= i / 2), e;
}
function xu(n, t, e) {
  let { y: i, height: s } = n;
  return t === "top" ? i += e : t === "bottom" ? i -= s + e : i -= s / 2, i;
}
function or(n, t, e, i) {
  const { caretSize: s, caretPadding: r, cornerRadius: o } = n, { xAlign: a, yAlign: c } = e, l = s + r, { topLeft: h, topRight: u, bottomLeft: d, bottomRight: f } = Ie(o);
  let g = _u(t, a);
  const m = xu(t, c, l);
  return c === "center" ? a === "left" ? g += l : a === "right" && (g -= l) : a === "left" ? g -= Math.max(h, d) + s : a === "right" && (g += Math.max(u, f) + s), {
    x: at(g, 0, i.width - t.width),
    y: at(m, 0, i.height - t.height)
  };
}
function un(n, t, e) {
  const i = lt(e.padding);
  return t === "center" ? n.x + n.width / 2 : t === "right" ? n.x + n.width - i.right : n.x + i.left;
}
function ar(n) {
  return ut([], _t(n));
}
function wu(n, t, e) {
  return Kt(n, {
    tooltip: t,
    tooltipItems: e,
    type: "tooltip"
  });
}
function cr(n, t) {
  const e = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return e ? n.override(e) : n;
}
const wo = {
  beforeTitle: bt,
  title(n) {
    if (n.length > 0) {
      const t = n[0], e = t.chart.data.labels, i = e ? e.length : 0;
      if (this && this.options && this.options.mode === "dataset")
        return t.dataset.label || "";
      if (t.label)
        return t.label;
      if (i > 0 && t.dataIndex < i)
        return e[t.dataIndex];
    }
    return "";
  },
  afterTitle: bt,
  beforeBody: bt,
  beforeLabel: bt,
  label(n) {
    if (this && this.options && this.options.mode === "dataset")
      return n.label + ": " + n.formattedValue || n.formattedValue;
    let t = n.dataset.label || "";
    t && (t += ": ");
    const e = n.formattedValue;
    return R(e) || (t += e), t;
  },
  labelColor(n) {
    const e = n.chart.getDatasetMeta(n.datasetIndex).controller.getStyle(n.dataIndex);
    return {
      borderColor: e.borderColor,
      backgroundColor: e.backgroundColor,
      borderWidth: e.borderWidth,
      borderDash: e.borderDash,
      borderDashOffset: e.borderDashOffset,
      borderRadius: 0
    };
  },
  labelTextColor() {
    return this.options.bodyColor;
  },
  labelPointStyle(n) {
    const e = n.chart.getDatasetMeta(n.datasetIndex).controller.getStyle(n.dataIndex);
    return {
      pointStyle: e.pointStyle,
      rotation: e.rotation
    };
  },
  afterLabel: bt,
  afterBody: bt,
  beforeFooter: bt,
  footer: bt,
  afterFooter: bt
};
function et(n, t, e, i) {
  const s = n[t].call(e, i);
  return typeof s > "u" ? wo[t].call(e, i) : s;
}
class pi extends Et {
  constructor(t) {
    super(), this.opacity = 0, this._active = [], this._eventPosition = void 0, this._size = void 0, this._cachedAnimations = void 0, this._tooltipItems = [], this.$animations = void 0, this.$context = void 0, this.chart = t.chart, this.options = t.options, this.dataPoints = void 0, this.title = void 0, this.beforeBody = void 0, this.body = void 0, this.afterBody = void 0, this.footer = void 0, this.xAlign = void 0, this.yAlign = void 0, this.x = void 0, this.y = void 0, this.height = void 0, this.width = void 0, this.caretX = void 0, this.caretY = void 0, this.labelColors = void 0, this.labelPointStyles = void 0, this.labelTextColors = void 0;
  }
  initialize(t) {
    this.options = t, this._cachedAnimations = void 0, this.$context = void 0;
  }
  _resolveAnimations() {
    const t = this._cachedAnimations;
    if (t)
      return t;
    const e = this.chart, i = this.options.setContext(this.getContext()), s = i.enabled && e.options.animation && i.animations, r = new io(this.chart, s);
    return s._cacheable && (this._cachedAnimations = Object.freeze(r)), r;
  }
  getContext() {
    return this.$context || (this.$context = wu(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, e) {
    const { callbacks: i } = e, s = et(i, "beforeTitle", this, t), r = et(i, "title", this, t), o = et(i, "afterTitle", this, t);
    let a = [];
    return a = ut(a, _t(s)), a = ut(a, _t(r)), a = ut(a, _t(o)), a;
  }
  getBeforeBody(t, e) {
    return ar(et(e.callbacks, "beforeBody", this, t));
  }
  getBody(t, e) {
    const { callbacks: i } = e, s = [];
    return L(t, (r) => {
      const o = {
        before: [],
        lines: [],
        after: []
      }, a = cr(i, r);
      ut(o.before, _t(et(a, "beforeLabel", this, r))), ut(o.lines, et(a, "label", this, r)), ut(o.after, _t(et(a, "afterLabel", this, r))), s.push(o);
    }), s;
  }
  getAfterBody(t, e) {
    return ar(et(e.callbacks, "afterBody", this, t));
  }
  getFooter(t, e) {
    const { callbacks: i } = e, s = et(i, "beforeFooter", this, t), r = et(i, "footer", this, t), o = et(i, "afterFooter", this, t);
    let a = [];
    return a = ut(a, _t(s)), a = ut(a, _t(r)), a = ut(a, _t(o)), a;
  }
  _createItems(t) {
    const e = this._active, i = this.chart.data, s = [], r = [], o = [];
    let a = [], c, l;
    for (c = 0, l = e.length; c < l; ++c)
      a.push(mu(this.chart, e[c]));
    return t.filter && (a = a.filter((h, u, d) => t.filter(h, u, d, i))), t.itemSort && (a = a.sort((h, u) => t.itemSort(h, u, i))), L(a, (h) => {
      const u = cr(t.callbacks, h);
      s.push(et(u, "labelColor", this, h)), r.push(et(u, "labelPointStyle", this, h)), o.push(et(u, "labelTextColor", this, h));
    }), this.labelColors = s, this.labelPointStyles = r, this.labelTextColors = o, this.dataPoints = a, a;
  }
  update(t, e) {
    const i = this.options.setContext(this.getContext()), s = this._active;
    let r, o = [];
    if (!s.length)
      this.opacity !== 0 && (r = {
        opacity: 0
      });
    else {
      const a = Pe[i.position].call(this, s, this._eventPosition);
      o = this._createItems(i), this.title = this.getTitle(o, i), this.beforeBody = this.getBeforeBody(o, i), this.body = this.getBody(o, i), this.afterBody = this.getAfterBody(o, i), this.footer = this.getFooter(o, i);
      const c = this._size = sr(this, i), l = Object.assign({}, a, c), h = rr(this.chart, i, l), u = or(i, l, h, this.chart);
      this.xAlign = h.xAlign, this.yAlign = h.yAlign, r = {
        opacity: 1,
        x: u.x,
        y: u.y,
        width: c.width,
        height: c.height,
        caretX: a.x,
        caretY: a.y
      };
    }
    this._tooltipItems = o, this.$context = void 0, r && this._resolveAnimations().update(this, r), t && i.external && i.external.call(this, {
      chart: this.chart,
      tooltip: this,
      replay: e
    });
  }
  drawCaret(t, e, i, s) {
    const r = this.getCaretPosition(t, i, s);
    e.lineTo(r.x1, r.y1), e.lineTo(r.x2, r.y2), e.lineTo(r.x3, r.y3);
  }
  getCaretPosition(t, e, i) {
    const { xAlign: s, yAlign: r } = this, { caretSize: o, cornerRadius: a } = i, { topLeft: c, topRight: l, bottomLeft: h, bottomRight: u } = Ie(a), { x: d, y: f } = t, { width: g, height: m } = e;
    let p, b, y, v, M, _;
    return r === "center" ? (M = f + m / 2, s === "left" ? (p = d, b = p - o, v = M + o, _ = M - o) : (p = d + g, b = p + o, v = M - o, _ = M + o), y = p) : (s === "left" ? b = d + Math.max(c, h) + o : s === "right" ? b = d + g - Math.max(l, u) - o : b = this.caretX, r === "top" ? (v = f, M = v - o, p = b - o, y = b + o) : (v = f + m, M = v + o, p = b + o, y = b - o), _ = v), {
      x1: p,
      x2: b,
      x3: y,
      y1: v,
      y2: M,
      y3: _
    };
  }
  drawTitle(t, e, i) {
    const s = this.title, r = s.length;
    let o, a, c;
    if (r) {
      const l = re(i.rtl, this.x, this.width);
      for (t.x = un(this, i.titleAlign, i), e.textAlign = l.textAlign(i.titleAlign), e.textBaseline = "middle", o = it(i.titleFont), a = i.titleSpacing, e.fillStyle = i.titleColor, e.font = o.string, c = 0; c < r; ++c)
        e.fillText(s[c], l.x(t.x), t.y + o.lineHeight / 2), t.y += o.lineHeight + a, c + 1 === r && (t.y += i.titleMarginBottom - a);
    }
  }
  _drawColorBox(t, e, i, s, r) {
    const o = this.labelColors[i], a = this.labelPointStyles[i], { boxHeight: c, boxWidth: l } = r, h = it(r.bodyFont), u = un(this, "left", r), d = s.x(u), f = c < h.lineHeight ? (h.lineHeight - c) / 2 : 0, g = e.y + f;
    if (r.usePointStyle) {
      const m = {
        radius: Math.min(l, c) / 2,
        pointStyle: a.pointStyle,
        rotation: a.rotation,
        borderWidth: 1
      }, p = s.leftForLtr(d, l) + l / 2, b = g + c / 2;
      t.strokeStyle = r.multiKeyBackground, t.fillStyle = r.multiKeyBackground, hi(t, m, p, b), t.strokeStyle = o.borderColor, t.fillStyle = o.backgroundColor, hi(t, m, p, b);
    } else {
      t.lineWidth = E(o.borderWidth) ? Math.max(...Object.values(o.borderWidth)) : o.borderWidth || 1, t.strokeStyle = o.borderColor, t.setLineDash(o.borderDash || []), t.lineDashOffset = o.borderDashOffset || 0;
      const m = s.leftForLtr(d, l), p = s.leftForLtr(s.xPlus(d, 1), l - 2), b = Ie(o.borderRadius);
      Object.values(b).some((y) => y !== 0) ? (t.beginPath(), t.fillStyle = r.multiKeyBackground, ui(t, {
        x: m,
        y: g,
        w: l,
        h: c,
        radius: b
      }), t.fill(), t.stroke(), t.fillStyle = o.backgroundColor, t.beginPath(), ui(t, {
        x: p,
        y: g + 1,
        w: l - 2,
        h: c - 2,
        radius: b
      }), t.fill()) : (t.fillStyle = r.multiKeyBackground, t.fillRect(m, g, l, c), t.strokeRect(m, g, l, c), t.fillStyle = o.backgroundColor, t.fillRect(p, g + 1, l - 2, c - 2));
    }
    t.fillStyle = this.labelTextColors[i];
  }
  drawBody(t, e, i) {
    const { body: s } = this, { bodySpacing: r, bodyAlign: o, displayColors: a, boxHeight: c, boxWidth: l, boxPadding: h } = i, u = it(i.bodyFont);
    let d = u.lineHeight, f = 0;
    const g = re(i.rtl, this.x, this.width), m = function(w) {
      e.fillText(w, g.x(t.x + f), t.y + d / 2), t.y += d + r;
    }, p = g.textAlign(o);
    let b, y, v, M, _, D, k;
    for (e.textAlign = o, e.textBaseline = "middle", e.font = u.string, t.x = un(this, p, i), e.fillStyle = i.bodyColor, L(this.beforeBody, m), f = a && p !== "right" ? o === "center" ? l / 2 + h : l + 2 + h : 0, M = 0, D = s.length; M < D; ++M) {
      for (b = s[M], y = this.labelTextColors[M], e.fillStyle = y, L(b.before, m), v = b.lines, a && v.length && (this._drawColorBox(e, t, M, g, i), d = Math.max(u.lineHeight, c)), _ = 0, k = v.length; _ < k; ++_)
        m(v[_]), d = u.lineHeight;
      L(b.after, m);
    }
    f = 0, d = u.lineHeight, L(this.afterBody, m), t.y -= r;
  }
  drawFooter(t, e, i) {
    const s = this.footer, r = s.length;
    let o, a;
    if (r) {
      const c = re(i.rtl, this.x, this.width);
      for (t.x = un(this, i.footerAlign, i), t.y += i.footerMarginTop, e.textAlign = c.textAlign(i.footerAlign), e.textBaseline = "middle", o = it(i.footerFont), e.fillStyle = i.footerColor, e.font = o.string, a = 0; a < r; ++a)
        e.fillText(s[a], c.x(t.x), t.y + o.lineHeight / 2), t.y += o.lineHeight + i.footerSpacing;
    }
  }
  drawBackground(t, e, i, s) {
    const { xAlign: r, yAlign: o } = this, { x: a, y: c } = t, { width: l, height: h } = i, { topLeft: u, topRight: d, bottomLeft: f, bottomRight: g } = Ie(s.cornerRadius);
    e.fillStyle = s.backgroundColor, e.strokeStyle = s.borderColor, e.lineWidth = s.borderWidth, e.beginPath(), e.moveTo(a + u, c), o === "top" && this.drawCaret(t, e, i, s), e.lineTo(a + l - d, c), e.quadraticCurveTo(a + l, c, a + l, c + d), o === "center" && r === "right" && this.drawCaret(t, e, i, s), e.lineTo(a + l, c + h - g), e.quadraticCurveTo(a + l, c + h, a + l - g, c + h), o === "bottom" && this.drawCaret(t, e, i, s), e.lineTo(a + f, c + h), e.quadraticCurveTo(a, c + h, a, c + h - f), o === "center" && r === "left" && this.drawCaret(t, e, i, s), e.lineTo(a, c + u), e.quadraticCurveTo(a, c, a + u, c), e.closePath(), e.fill(), s.borderWidth > 0 && e.stroke();
  }
  _updateAnimationTarget(t) {
    const e = this.chart, i = this.$animations, s = i && i.x, r = i && i.y;
    if (s || r) {
      const o = Pe[t.position].call(this, this._active, this._eventPosition);
      if (!o)
        return;
      const a = this._size = sr(this, t), c = Object.assign({}, o, this._size), l = rr(e, t, c), h = or(t, c, l, e);
      (s._to !== h.x || r._to !== h.y) && (this.xAlign = l.xAlign, this.yAlign = l.yAlign, this.width = a.width, this.height = a.height, this.caretX = o.x, this.caretY = o.y, this._resolveAnimations().update(this, h));
    }
  }
  _willRender() {
    return !!this.opacity;
  }
  draw(t) {
    const e = this.options.setContext(this.getContext());
    let i = this.opacity;
    if (!i)
      return;
    this._updateAnimationTarget(e);
    const s = {
      width: this.width,
      height: this.height
    }, r = {
      x: this.x,
      y: this.y
    };
    i = Math.abs(i) < 1e-3 ? 0 : i;
    const o = lt(e.padding), a = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    e.enabled && a && (t.save(), t.globalAlpha = i, this.drawBackground(r, t, s, e), Kr(t, e.textDirection), r.y += o.top, this.drawTitle(r, t, e), this.drawBody(r, t, e), this.drawFooter(r, t, e), Zr(t, e.textDirection), t.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t, e) {
    const i = this._active, s = t.map(({ datasetIndex: a, index: c }) => {
      const l = this.chart.getDatasetMeta(a);
      if (!l)
        throw new Error("Cannot find a dataset at index " + a);
      return {
        datasetIndex: a,
        element: l.data[c],
        index: c
      };
    }), r = !vn(i, s), o = this._positionChanged(s, e);
    (r || o) && (this._active = s, this._eventPosition = e, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, e, i = !0) {
    if (e && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const s = this.options, r = this._active || [], o = this._getActiveElements(t, r, e, i), a = this._positionChanged(o, t), c = e || !vn(o, r) || a;
    return c && (this._active = o, (s.enabled || s.external) && (this._eventPosition = {
      x: t.x,
      y: t.y
    }, this.update(!0, e))), c;
  }
  _getActiveElements(t, e, i, s) {
    const r = this.options;
    if (t.type === "mouseout")
      return [];
    if (!s)
      return e.filter((a) => this.chart.data.datasets[a.datasetIndex] && this.chart.getDatasetMeta(a.datasetIndex).controller.getParsed(a.index) !== void 0);
    const o = this.chart.getElementsAtEventForMode(t, r.mode, r, i);
    return r.reverse && o.reverse(), o;
  }
  _positionChanged(t, e) {
    const { caretX: i, caretY: s, options: r } = this, o = Pe[r.position].call(this, t, e);
    return o !== !1 && (i !== o.x || s !== o.y);
  }
}
x(pi, "positioners", Pe);
var vu = {
  id: "tooltip",
  _element: pi,
  positioners: Pe,
  afterInit(n, t, e) {
    e && (n.tooltip = new pi({
      chart: n,
      options: e
    }));
  },
  beforeUpdate(n, t, e) {
    n.tooltip && n.tooltip.initialize(e);
  },
  reset(n, t, e) {
    n.tooltip && n.tooltip.initialize(e);
  },
  afterDraw(n) {
    const t = n.tooltip;
    if (t && t._willRender()) {
      const e = {
        tooltip: t
      };
      if (n.notifyPlugins("beforeTooltipDraw", {
        ...e,
        cancelable: !0
      }) === !1)
        return;
      t.draw(n.ctx), n.notifyPlugins("afterTooltipDraw", e);
    }
  },
  afterEvent(n, t) {
    if (n.tooltip) {
      const e = t.replay;
      n.tooltip.handleEvent(t.event, e, t.inChartArea) && (t.changed = !0);
    }
  },
  defaults: {
    enabled: !0,
    external: null,
    position: "average",
    backgroundColor: "rgba(0,0,0,0.8)",
    titleColor: "#fff",
    titleFont: {
      weight: "bold"
    },
    titleSpacing: 2,
    titleMarginBottom: 6,
    titleAlign: "left",
    bodyColor: "#fff",
    bodySpacing: 2,
    bodyFont: {},
    bodyAlign: "left",
    footerColor: "#fff",
    footerSpacing: 2,
    footerMarginTop: 6,
    footerFont: {
      weight: "bold"
    },
    footerAlign: "left",
    padding: 6,
    caretPadding: 2,
    caretSize: 5,
    cornerRadius: 6,
    boxHeight: (n, t) => t.bodyFont.size,
    boxWidth: (n, t) => t.bodyFont.size,
    multiKeyBackground: "#fff",
    displayColors: !0,
    boxPadding: 0,
    borderColor: "rgba(0,0,0,0)",
    borderWidth: 0,
    animation: {
      duration: 400,
      easing: "easeOutQuart"
    },
    animations: {
      numbers: {
        type: "number",
        properties: [
          "x",
          "y",
          "width",
          "height",
          "caretX",
          "caretY"
        ]
      },
      opacity: {
        easing: "linear",
        duration: 200
      }
    },
    callbacks: wo
  },
  defaultRoutes: {
    bodyFont: "font",
    footerFont: "font",
    titleFont: "font"
  },
  descriptors: {
    _scriptable: (n) => n !== "filter" && n !== "itemSort" && n !== "external",
    _indexable: !1,
    callbacks: {
      _scriptable: !1,
      _indexable: !1
    },
    animation: {
      _fallback: !1
    },
    animations: {
      _fallback: "animation"
    }
  },
  additionalOptionScopes: [
    "interaction"
  ]
};
function Mu(n, t) {
  const e = [], { bounds: s, step: r, min: o, max: a, precision: c, count: l, maxTicks: h, maxDigits: u, includeBounds: d } = n, f = r || 1, g = h - 1, { min: m, max: p } = t, b = !R(o), y = !R(a), v = !R(l), M = (p - m) / (u + 1);
  let _ = ls((p - m) / g / f) * f, D, k, w, P;
  if (_ < 1e-14 && !b && !y)
    return [
      {
        value: m
      },
      {
        value: p
      }
    ];
  P = Math.ceil(p / _) - Math.floor(m / _), P > g && (_ = ls(P * _ / g / f) * f), R(c) || (D = Math.pow(10, c), _ = Math.ceil(_ * D) / D), s === "ticks" ? (k = Math.floor(m / _) * _, w = Math.ceil(p / _) * _) : (k = m, w = p), b && y && r && Ka((a - o) / r, _ / 1e3) ? (P = Math.round(Math.min((a - o) / _, h)), _ = (a - o) / P, k = o, w = a) : v ? (k = b ? o : k, w = y ? a : w, P = l - 1, _ = (w - k) / P) : (P = (w - k) / _, Ae(P, Math.round(P), _ / 1e3) ? P = Math.round(P) : P = Math.ceil(P));
  const O = Math.max(hs(_), hs(k));
  D = Math.pow(10, R(c) ? O : c), k = Math.round(k * D) / D, w = Math.round(w * D) / D;
  let S = 0;
  for (b && (d && k !== o ? (e.push({
    value: o
  }), k < o && S++, Ae(Math.round((k + S * _) * D) / D, o, lr(o, M, n)) && S++) : k < o && S++); S < P; ++S) {
    const C = Math.round((k + S * _) * D) / D;
    if (y && C > a)
      break;
    e.push({
      value: C
    });
  }
  return y && d && w !== a ? e.length && Ae(e[e.length - 1].value, a, lr(a, M, n)) ? e[e.length - 1].value = a : e.push({
    value: a
  }) : (!y || w === a) && e.push({
    value: w
  }), e;
}
function lr(n, t, { horizontal: e, minRotation: i }) {
  const s = Vt(i), r = (e ? Math.sin(s) : Math.cos(s)) || 1e-3, o = 0.75 * t * ("" + n).length;
  return Math.min(t / r, o);
}
class ku extends Qe {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, e) {
    return R(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: e, maxDefined: i } = this.getUserBounds();
    let { min: s, max: r } = this;
    const o = (c) => s = e ? s : c, a = (c) => r = i ? r : c;
    if (t) {
      const c = le(s), l = le(r);
      c < 0 && l < 0 ? a(0) : c > 0 && l > 0 && o(0);
    }
    if (s === r) {
      let c = r === 0 ? 1 : Math.abs(r * 0.05);
      a(r + c), t || o(s - c);
    }
    this.min = s, this.max = r;
  }
  getTickLimit() {
    const t = this.options.ticks;
    let { maxTicksLimit: e, stepSize: i } = t, s;
    return i ? (s = Math.ceil(this.max / i) - Math.floor(this.min / i) + 1, s > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${i} would result generating up to ${s} ticks. Limiting to 1000.`), s = 1e3)) : (s = this.computeTickLimit(), e = e || 11), e && (s = Math.min(e, s)), s;
  }
  computeTickLimit() {
    return Number.POSITIVE_INFINITY;
  }
  buildTicks() {
    const t = this.options, e = t.ticks;
    let i = this.getTickLimit();
    i = Math.max(2, i);
    const s = {
      maxTicks: i,
      bounds: t.bounds,
      min: t.min,
      max: t.max,
      precision: e.precision,
      step: e.stepSize,
      count: e.count,
      maxDigits: this._maxDigits(),
      horizontal: this.isHorizontal(),
      minRotation: e.minRotation || 0,
      includeBounds: e.includeBounds !== !1
    }, r = this._range || this, o = Mu(s, r);
    return t.bounds === "ticks" && Za(o, this, "value"), t.reverse ? (o.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), o;
  }
  configure() {
    const t = this.ticks;
    let e = this.min, i = this.max;
    if (super.configure(), this.options.offset && t.length) {
      const s = (i - e) / Math.max(t.length - 1, 1) / 2;
      e -= s, i += s;
    }
    this._startValue = e, this._endValue = i, this._valueRange = i - e;
  }
  getLabelForValue(t) {
    return Br(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class bi extends ku {
  determineDataLimits() {
    const { min: t, max: e } = this.getMinMax(!0);
    this.min = J(t) ? t : 0, this.max = J(e) ? e : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), e = t ? this.width : this.height, i = Vt(this.options.ticks.minRotation), s = (t ? Math.sin(i) : Math.cos(i)) || 1e-3, r = this._resolveTickFontOptions(0);
    return Math.ceil(e / Math.min(40, r.lineHeight / s));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
x(bi, "id", "linear"), x(bi, "defaults", {
  ticks: {
    callback: Yr.formatters.numeric
  }
});
const Hn = {
  millisecond: {
    common: !0,
    size: 1,
    steps: 1e3
  },
  second: {
    common: !0,
    size: 1e3,
    steps: 60
  },
  minute: {
    common: !0,
    size: 6e4,
    steps: 60
  },
  hour: {
    common: !0,
    size: 36e5,
    steps: 24
  },
  day: {
    common: !0,
    size: 864e5,
    steps: 30
  },
  week: {
    common: !1,
    size: 6048e5,
    steps: 4
  },
  month: {
    common: !0,
    size: 2628e6,
    steps: 12
  },
  quarter: {
    common: !1,
    size: 7884e6,
    steps: 4
  },
  year: {
    common: !0,
    size: 3154e7
  }
}, nt = /* @__PURE__ */ Object.keys(Hn);
function hr(n, t) {
  return n - t;
}
function ur(n, t) {
  if (R(t))
    return null;
  const e = n._adapter, { parser: i, round: s, isoWeekday: r } = n._parseOpts;
  let o = t;
  return typeof i == "function" && (o = i(o)), J(o) || (o = typeof i == "string" ? e.parse(o, i) : e.parse(o)), o === null ? null : (s && (o = s === "week" && (Ye(r) || r === !0) ? e.startOf(o, "isoWeek", r) : e.startOf(o, s)), +o);
}
function dr(n, t, e, i) {
  const s = nt.length;
  for (let r = nt.indexOf(n); r < s - 1; ++r) {
    const o = Hn[nt[r]], a = o.steps ? o.steps : Number.MAX_SAFE_INTEGER;
    if (o.common && Math.ceil((e - t) / (a * o.size)) <= i)
      return nt[r];
  }
  return nt[s - 1];
}
function Du(n, t, e, i, s) {
  for (let r = nt.length - 1; r >= nt.indexOf(e); r--) {
    const o = nt[r];
    if (Hn[o].common && n._adapter.diff(s, i, o) >= t - 1)
      return o;
  }
  return nt[e ? nt.indexOf(e) : 0];
}
function Pu(n) {
  for (let t = nt.indexOf(n) + 1, e = nt.length; t < e; ++t)
    if (Hn[nt[t]].common)
      return nt[t];
}
function fr(n, t, e) {
  if (!e)
    n[t] = !0;
  else if (e.length) {
    const { lo: i, hi: s } = Ti(e, t), r = e[i] >= t ? e[i] : e[s];
    n[r] = !0;
  }
}
function Su(n, t, e, i) {
  const s = n._adapter, r = +s.startOf(t[0].value, i), o = t[t.length - 1].value;
  let a, c;
  for (a = r; a <= o; a = +s.add(a, 1, i))
    c = e[a], c >= 0 && (t[c].major = !0);
  return t;
}
function gr(n, t, e) {
  const i = [], s = {}, r = t.length;
  let o, a;
  for (o = 0; o < r; ++o)
    a = t[o], s[a] = o, i.push({
      value: a,
      major: !1
    });
  return r === 0 || !e ? i : Su(n, i, s, e);
}
class Ue extends Qe {
  constructor(t) {
    super(t), this._cache = {
      data: [],
      labels: [],
      all: []
    }, this._unit = "day", this._majorUnit = void 0, this._offsets = {}, this._normalized = !1, this._parseOpts = void 0;
  }
  init(t, e = {}) {
    const i = t.time || (t.time = {}), s = this._adapter = new ro._date(t.adapters.date);
    s.init(e), Ce(i.displayFormats, s.formats()), this._parseOpts = {
      parser: i.parser,
      round: i.round,
      isoWeekday: i.isoWeekday
    }, super.init(t), this._normalized = e.normalized;
  }
  parse(t, e) {
    return t === void 0 ? null : ur(this, t);
  }
  beforeLayout() {
    super.beforeLayout(), this._cache = {
      data: [],
      labels: [],
      all: []
    };
  }
  determineDataLimits() {
    const t = this.options, e = this._adapter, i = t.time.unit || "day";
    let { min: s, max: r, minDefined: o, maxDefined: a } = this.getUserBounds();
    function c(l) {
      !o && !isNaN(l.min) && (s = Math.min(s, l.min)), !a && !isNaN(l.max) && (r = Math.max(r, l.max));
    }
    (!o || !a) && (c(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && c(this.getMinMax(!1))), s = J(s) && !isNaN(s) ? s : +e.startOf(Date.now(), i), r = J(r) && !isNaN(r) ? r : +e.endOf(Date.now(), i) + 1, this.min = Math.min(s, r - 1), this.max = Math.max(s + 1, r);
  }
  _getLabelBounds() {
    const t = this.getLabelTimestamps();
    let e = Number.POSITIVE_INFINITY, i = Number.NEGATIVE_INFINITY;
    return t.length && (e = t[0], i = t[t.length - 1]), {
      min: e,
      max: i
    };
  }
  buildTicks() {
    const t = this.options, e = t.time, i = t.ticks, s = i.source === "labels" ? this.getLabelTimestamps() : this._generate();
    t.bounds === "ticks" && s.length && (this.min = this._userMin || s[0], this.max = this._userMax || s[s.length - 1]);
    const r = this.min, o = this.max, a = sc(s, r, o);
    return this._unit = e.unit || (i.autoSkip ? dr(e.minUnit, this.min, this.max, this._getLabelCapacity(r)) : Du(this, a.length, e.minUnit, this.min, this.max)), this._majorUnit = !i.major.enabled || this._unit === "year" ? void 0 : Pu(this._unit), this.initOffsets(s), t.reverse && a.reverse(), gr(this, a, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let e = 0, i = 0, s, r;
    this.options.offset && t.length && (s = this.getDecimalForValue(t[0]), t.length === 1 ? e = 1 - s : e = (this.getDecimalForValue(t[1]) - s) / 2, r = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? i = r : i = (r - this.getDecimalForValue(t[t.length - 2])) / 2);
    const o = t.length < 3 ? 0.5 : 0.25;
    e = at(e, 0, o), i = at(i, 0, o), this._offsets = {
      start: e,
      end: i,
      factor: 1 / (e + 1 + i)
    };
  }
  _generate() {
    const t = this._adapter, e = this.min, i = this.max, s = this.options, r = s.time, o = r.unit || dr(r.minUnit, e, i, this._getLabelCapacity(e)), a = A(s.ticks.stepSize, 1), c = o === "week" ? r.isoWeekday : !1, l = Ye(c) || c === !0, h = {};
    let u = e, d, f;
    if (l && (u = +t.startOf(u, "isoWeek", c)), u = +t.startOf(u, l ? "day" : o), t.diff(i, e, o) > 1e5 * a)
      throw new Error(e + " and " + i + " are too far apart with stepSize of " + a + " " + o);
    const g = s.ticks.source === "data" && this.getDataTimestamps();
    for (d = u, f = 0; d < i; d = +t.add(d, a, o), f++)
      fr(h, d, g);
    return (d === i || s.bounds === "ticks" || f === 1) && fr(h, d, g), Object.keys(h).sort(hr).map((m) => +m);
  }
  getLabelForValue(t) {
    const e = this._adapter, i = this.options.time;
    return i.tooltipFormat ? e.format(t, i.tooltipFormat) : e.format(t, i.displayFormats.datetime);
  }
  format(t, e) {
    const s = this.options.time.displayFormats, r = this._unit, o = e || s[r];
    return this._adapter.format(t, o);
  }
  _tickFormatFunction(t, e, i, s) {
    const r = this.options, o = r.ticks.callback;
    if (o)
      return F(o, [
        t,
        e,
        i
      ], this);
    const a = r.time.displayFormats, c = this._unit, l = this._majorUnit, h = c && a[c], u = l && a[l], d = i[e], f = l && u && d && d.major;
    return this._adapter.format(t, s || (f ? u : h));
  }
  generateTickLabels(t) {
    let e, i, s;
    for (e = 0, i = t.length; e < i; ++e)
      s = t[e], s.label = this._tickFormatFunction(s.value, e, t);
  }
  getDecimalForValue(t) {
    return t === null ? NaN : (t - this.min) / (this.max - this.min);
  }
  getPixelForValue(t) {
    const e = this._offsets, i = this.getDecimalForValue(t);
    return this.getPixelForDecimal((e.start + i) * e.factor);
  }
  getValueForPixel(t) {
    const e = this._offsets, i = this.getDecimalForPixel(t) / e.factor - e.end;
    return this.min + i * (this.max - this.min);
  }
  _getLabelSize(t) {
    const e = this.options.ticks, i = this.ctx.measureText(t).width, s = Vt(this.isHorizontal() ? e.maxRotation : e.minRotation), r = Math.cos(s), o = Math.sin(s), a = this._resolveTickFontOptions(0).size;
    return {
      w: i * r + a * o,
      h: i * o + a * r
    };
  }
  _getLabelCapacity(t) {
    const e = this.options.time, i = e.displayFormats, s = i[e.unit] || i.millisecond, r = this._tickFormatFunction(t, 0, gr(this, [
      t
    ], this._majorUnit), s), o = this._getLabelSize(r), a = Math.floor(this.isHorizontal() ? this.width / o.w : this.height / o.h) - 1;
    return a > 0 ? a : 1;
  }
  getDataTimestamps() {
    let t = this._cache.data || [], e, i;
    if (t.length)
      return t;
    const s = this.getMatchingVisibleMetas();
    if (this._normalized && s.length)
      return this._cache.data = s[0].controller.getAllParsedValues(this);
    for (e = 0, i = s.length; e < i; ++e)
      t = t.concat(s[e].controller.getAllParsedValues(this));
    return this._cache.data = this.normalize(t);
  }
  getLabelTimestamps() {
    const t = this._cache.labels || [];
    let e, i;
    if (t.length)
      return t;
    const s = this.getLabels();
    for (e = 0, i = s.length; e < i; ++e)
      t.push(ur(this, s[e]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return oc(t.sort(hr));
  }
}
x(Ue, "id", "time"), x(Ue, "defaults", {
  bounds: "data",
  adapters: {},
  time: {
    parser: !1,
    unit: !1,
    round: !1,
    isoWeekday: !1,
    minUnit: "millisecond",
    displayFormats: {}
  },
  ticks: {
    source: "auto",
    callback: !1,
    major: {
      enabled: !1
    }
  }
});
function dn(n, t, e) {
  let i = 0, s = n.length - 1, r, o, a, c;
  e ? (t >= n[i].pos && t <= n[s].pos && ({ lo: i, hi: s } = Ut(n, "pos", t)), { pos: r, time: a } = n[i], { pos: o, time: c } = n[s]) : (t >= n[i].time && t <= n[s].time && ({ lo: i, hi: s } = Ut(n, "time", t)), { time: r, pos: a } = n[i], { time: o, pos: c } = n[s]);
  const l = o - r;
  return l ? a + (c - a) * (t - r) / l : a;
}
class mr extends Ue {
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), e = this._table = this.buildLookupTable(t);
    this._minPos = dn(e, this.min), this._tableRange = dn(e, this.max) - this._minPos, super.initOffsets(t);
  }
  buildLookupTable(t) {
    const { min: e, max: i } = this, s = [], r = [];
    let o, a, c, l, h;
    for (o = 0, a = t.length; o < a; ++o)
      l = t[o], l >= e && l <= i && s.push(l);
    if (s.length < 2)
      return [
        {
          time: e,
          pos: 0
        },
        {
          time: i,
          pos: 1
        }
      ];
    for (o = 0, a = s.length; o < a; ++o)
      h = s[o + 1], c = s[o - 1], l = s[o], Math.round((h + c) / 2) !== l && r.push({
        time: l,
        pos: o / (a - 1)
      });
    return r;
  }
  _generate() {
    const t = this.min, e = this.max;
    let i = super.getDataTimestamps();
    return (!i.includes(t) || !i.length) && i.splice(0, 0, t), (!i.includes(e) || i.length === 1) && i.push(e), i.sort((s, r) => s - r);
  }
  _getTimestampsForTable() {
    let t = this._cache.all || [];
    if (t.length)
      return t;
    const e = this.getDataTimestamps(), i = this.getLabelTimestamps();
    return e.length && i.length ? t = this.normalize(e.concat(i)) : t = e.length ? e : i, t = this._cache.all = t, t;
  }
  getDecimalForValue(t) {
    return (dn(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const e = this._offsets, i = this.getDecimalForPixel(t) / e.factor - e.end;
    return dn(this._table, i * this._tableRange + this._minPos, !0);
  }
}
x(mr, "id", "timeseries"), x(mr, "defaults", Ue.defaults);
const vo = 6048e5, Ou = 864e5, Ge = 6e4, Ke = 36e5, Tu = 1e3, pr = Symbol.for("constructDateFrom");
function N(n, t) {
  return typeof n == "function" ? n(t) : n && typeof n == "object" && pr in n ? n[pr](t) : n instanceof Date ? new n.constructor(t) : new Date(t);
}
function T(n, t) {
  return N(t || n, n);
}
function Nn(n, t, e) {
  const i = T(n, e == null ? void 0 : e.in);
  return isNaN(t) ? N((e == null ? void 0 : e.in) || n, NaN) : (t && i.setDate(i.getDate() + t), i);
}
function Ri(n, t, e) {
  const i = T(n, e == null ? void 0 : e.in);
  if (isNaN(t)) return N(n, NaN);
  if (!t)
    return i;
  const s = i.getDate(), r = N(n, i.getTime());
  r.setMonth(i.getMonth() + t + 1, 0);
  const o = r.getDate();
  return s >= o ? r : (i.setFullYear(
    r.getFullYear(),
    r.getMonth(),
    s
  ), i);
}
function zi(n, t, e) {
  return N(n, +T(n) + t);
}
function Cu(n, t, e) {
  return zi(n, t * Ke);
}
let Au = {};
function Zt() {
  return Au;
}
function pt(n, t) {
  var a, c, l, h;
  const e = Zt(), i = (t == null ? void 0 : t.weekStartsOn) ?? ((c = (a = t == null ? void 0 : t.locale) == null ? void 0 : a.options) == null ? void 0 : c.weekStartsOn) ?? e.weekStartsOn ?? ((h = (l = e.locale) == null ? void 0 : l.options) == null ? void 0 : h.weekStartsOn) ?? 0, s = T(n, t == null ? void 0 : t.in), r = s.getDay(), o = (r < i ? 7 : 0) + r - i;
  return s.setDate(s.getDate() - o), s.setHours(0, 0, 0, 0), s;
}
function de(n, t) {
  return pt(n, { ...t, weekStartsOn: 1 });
}
function Mo(n, t) {
  const e = T(n, t == null ? void 0 : t.in), i = e.getFullYear(), s = N(e, 0);
  s.setFullYear(i + 1, 0, 4), s.setHours(0, 0, 0, 0);
  const r = de(s), o = N(e, 0);
  o.setFullYear(i, 0, 4), o.setHours(0, 0, 0, 0);
  const a = de(o);
  return e.getTime() >= r.getTime() ? i + 1 : e.getTime() >= a.getTime() ? i : i - 1;
}
function Cn(n) {
  const t = T(n), e = new Date(
    Date.UTC(
      t.getFullYear(),
      t.getMonth(),
      t.getDate(),
      t.getHours(),
      t.getMinutes(),
      t.getSeconds(),
      t.getMilliseconds()
    )
  );
  return e.setUTCFullYear(t.getFullYear()), +n - +e;
}
function Jt(n, ...t) {
  const e = N.bind(
    null,
    t.find((i) => typeof i == "object")
  );
  return t.map(e);
}
function yi(n, t) {
  const e = T(n, t == null ? void 0 : t.in);
  return e.setHours(0, 0, 0, 0), e;
}
function ko(n, t, e) {
  const [i, s] = Jt(
    e == null ? void 0 : e.in,
    n,
    t
  ), r = yi(i), o = yi(s), a = +r - Cn(r), c = +o - Cn(o);
  return Math.round((a - c) / Ou);
}
function Eu(n, t) {
  const e = Mo(n, t), i = N(n, 0);
  return i.setFullYear(e, 0, 4), i.setHours(0, 0, 0, 0), de(i);
}
function $u(n, t, e) {
  const i = T(n, e == null ? void 0 : e.in);
  return i.setTime(i.getTime() + t * Ge), i;
}
function Iu(n, t, e) {
  return Ri(n, t * 3, e);
}
function Lu(n, t, e) {
  return zi(n, t * 1e3);
}
function Fu(n, t, e) {
  return Nn(n, t * 7, e);
}
function Ru(n, t, e) {
  return Ri(n, t * 12, e);
}
function Fe(n, t) {
  const e = +T(n) - +T(t);
  return e < 0 ? -1 : e > 0 ? 1 : e;
}
function zu(n) {
  return n instanceof Date || typeof n == "object" && Object.prototype.toString.call(n) === "[object Date]";
}
function Do(n) {
  return !(!zu(n) && typeof n != "number" || isNaN(+T(n)));
}
function Hu(n, t, e) {
  const [i, s] = Jt(
    e == null ? void 0 : e.in,
    n,
    t
  ), r = i.getFullYear() - s.getFullYear(), o = i.getMonth() - s.getMonth();
  return r * 12 + o;
}
function Nu(n, t, e) {
  const [i, s] = Jt(
    e == null ? void 0 : e.in,
    n,
    t
  );
  return i.getFullYear() - s.getFullYear();
}
function Po(n, t, e) {
  const [i, s] = Jt(
    e == null ? void 0 : e.in,
    n,
    t
  ), r = br(i, s), o = Math.abs(
    ko(i, s)
  );
  i.setDate(i.getDate() - r * o);
  const a = +(br(i, s) === -r), c = r * (o - a);
  return c === 0 ? 0 : c;
}
function br(n, t) {
  const e = n.getFullYear() - t.getFullYear() || n.getMonth() - t.getMonth() || n.getDate() - t.getDate() || n.getHours() - t.getHours() || n.getMinutes() - t.getMinutes() || n.getSeconds() - t.getSeconds() || n.getMilliseconds() - t.getMilliseconds();
  return e < 0 ? -1 : e > 0 ? 1 : e;
}
function Ze(n) {
  return (t) => {
    const i = (n ? Math[n] : Math.trunc)(t);
    return i === 0 ? 0 : i;
  };
}
function Wu(n, t, e) {
  const [i, s] = Jt(
    e == null ? void 0 : e.in,
    n,
    t
  ), r = (+i - +s) / Ke;
  return Ze(e == null ? void 0 : e.roundingMethod)(r);
}
function Hi(n, t) {
  return +T(n) - +T(t);
}
function Bu(n, t, e) {
  const i = Hi(n, t) / Ge;
  return Ze(e == null ? void 0 : e.roundingMethod)(i);
}
function So(n, t) {
  const e = T(n, t == null ? void 0 : t.in);
  return e.setHours(23, 59, 59, 999), e;
}
function Oo(n, t) {
  const e = T(n, t == null ? void 0 : t.in), i = e.getMonth();
  return e.setFullYear(e.getFullYear(), i + 1, 0), e.setHours(23, 59, 59, 999), e;
}
function Yu(n, t) {
  const e = T(n, t == null ? void 0 : t.in);
  return +So(e, t) == +Oo(e, t);
}
function To(n, t, e) {
  const [i, s, r] = Jt(
    e == null ? void 0 : e.in,
    n,
    n,
    t
  ), o = Fe(s, r), a = Math.abs(
    Hu(s, r)
  );
  if (a < 1) return 0;
  s.getMonth() === 1 && s.getDate() > 27 && s.setDate(30), s.setMonth(s.getMonth() - o * a);
  let c = Fe(s, r) === -o;
  Yu(i) && a === 1 && Fe(i, r) === 1 && (c = !1);
  const l = o * (a - +c);
  return l === 0 ? 0 : l;
}
function ju(n, t, e) {
  const i = To(n, t, e) / 3;
  return Ze(e == null ? void 0 : e.roundingMethod)(i);
}
function Vu(n, t, e) {
  const i = Hi(n, t) / 1e3;
  return Ze(e == null ? void 0 : e.roundingMethod)(i);
}
function Uu(n, t, e) {
  const i = Po(n, t, e) / 7;
  return Ze(e == null ? void 0 : e.roundingMethod)(i);
}
function qu(n, t, e) {
  const [i, s] = Jt(
    e == null ? void 0 : e.in,
    n,
    t
  ), r = Fe(i, s), o = Math.abs(Nu(i, s));
  i.setFullYear(1584), s.setFullYear(1584);
  const a = Fe(i, s) === -r, c = r * (o - +a);
  return c === 0 ? 0 : c;
}
function Xu(n, t) {
  const e = T(n, t == null ? void 0 : t.in), i = e.getMonth(), s = i - i % 3;
  return e.setMonth(s, 1), e.setHours(0, 0, 0, 0), e;
}
function Qu(n, t) {
  const e = T(n, t == null ? void 0 : t.in);
  return e.setDate(1), e.setHours(0, 0, 0, 0), e;
}
function Gu(n, t) {
  const e = T(n, t == null ? void 0 : t.in), i = e.getFullYear();
  return e.setFullYear(i + 1, 0, 0), e.setHours(23, 59, 59, 999), e;
}
function Co(n, t) {
  const e = T(n, t == null ? void 0 : t.in);
  return e.setFullYear(e.getFullYear(), 0, 1), e.setHours(0, 0, 0, 0), e;
}
function Ku(n, t) {
  const e = T(n, t == null ? void 0 : t.in);
  return e.setMinutes(59, 59, 999), e;
}
function Zu(n, t) {
  var a, c;
  const e = Zt(), i = e.weekStartsOn ?? ((c = (a = e.locale) == null ? void 0 : a.options) == null ? void 0 : c.weekStartsOn) ?? 0, s = T(n, t == null ? void 0 : t.in), r = s.getDay(), o = (r < i ? -7 : 0) + 6 - (r - i);
  return s.setDate(s.getDate() + o), s.setHours(23, 59, 59, 999), s;
}
function Ju(n, t) {
  const e = T(n, t == null ? void 0 : t.in);
  return e.setSeconds(59, 999), e;
}
function td(n, t) {
  const e = T(n, t == null ? void 0 : t.in), i = e.getMonth(), s = i - i % 3 + 3;
  return e.setMonth(s, 0), e.setHours(23, 59, 59, 999), e;
}
function ed(n, t) {
  const e = T(n, t == null ? void 0 : t.in);
  return e.setMilliseconds(999), e;
}
const nd = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
}, id = (n, t, e) => {
  let i;
  const s = nd[n];
  return typeof s == "string" ? i = s : t === 1 ? i = s.one : i = s.other.replace("{{count}}", t.toString()), e != null && e.addSuffix ? e.comparison && e.comparison > 0 ? "in " + i : i + " ago" : i;
};
function ni(n) {
  return (t = {}) => {
    const e = t.width ? String(t.width) : n.defaultWidth;
    return n.formats[e] || n.formats[n.defaultWidth];
  };
}
const sd = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, rd = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, od = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, ad = {
  date: ni({
    formats: sd,
    defaultWidth: "full"
  }),
  time: ni({
    formats: rd,
    defaultWidth: "full"
  }),
  dateTime: ni({
    formats: od,
    defaultWidth: "full"
  })
}, cd = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, ld = (n, t, e, i) => cd[n];
function we(n) {
  return (t, e) => {
    const i = e != null && e.context ? String(e.context) : "standalone";
    let s;
    if (i === "formatting" && n.formattingValues) {
      const o = n.defaultFormattingWidth || n.defaultWidth, a = e != null && e.width ? String(e.width) : o;
      s = n.formattingValues[a] || n.formattingValues[o];
    } else {
      const o = n.defaultWidth, a = e != null && e.width ? String(e.width) : n.defaultWidth;
      s = n.values[a] || n.values[o];
    }
    const r = n.argumentCallback ? n.argumentCallback(t) : t;
    return s[r];
  };
}
const hd = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, ud = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, dd = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
}, fd = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
}, gd = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
}, md = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
}, pd = (n, t) => {
  const e = Number(n), i = e % 100;
  if (i > 20 || i < 10)
    switch (i % 10) {
      case 1:
        return e + "st";
      case 2:
        return e + "nd";
      case 3:
        return e + "rd";
    }
  return e + "th";
}, bd = {
  ordinalNumber: pd,
  era: we({
    values: hd,
    defaultWidth: "wide"
  }),
  quarter: we({
    values: ud,
    defaultWidth: "wide",
    argumentCallback: (n) => n - 1
  }),
  month: we({
    values: dd,
    defaultWidth: "wide"
  }),
  day: we({
    values: fd,
    defaultWidth: "wide"
  }),
  dayPeriod: we({
    values: gd,
    defaultWidth: "wide",
    formattingValues: md,
    defaultFormattingWidth: "wide"
  })
};
function ve(n) {
  return (t, e = {}) => {
    const i = e.width, s = i && n.matchPatterns[i] || n.matchPatterns[n.defaultMatchWidth], r = t.match(s);
    if (!r)
      return null;
    const o = r[0], a = i && n.parsePatterns[i] || n.parsePatterns[n.defaultParseWidth], c = Array.isArray(a) ? _d(a, (u) => u.test(o)) : (
      // [TODO] -- I challenge you to fix the type
      yd(a, (u) => u.test(o))
    );
    let l;
    l = n.valueCallback ? n.valueCallback(c) : c, l = e.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      e.valueCallback(l)
    ) : l;
    const h = t.slice(o.length);
    return { value: l, rest: h };
  };
}
function yd(n, t) {
  for (const e in n)
    if (Object.prototype.hasOwnProperty.call(n, e) && t(n[e]))
      return e;
}
function _d(n, t) {
  for (let e = 0; e < n.length; e++)
    if (t(n[e]))
      return e;
}
function xd(n) {
  return (t, e = {}) => {
    const i = t.match(n.matchPattern);
    if (!i) return null;
    const s = i[0], r = t.match(n.parsePattern);
    if (!r) return null;
    let o = n.valueCallback ? n.valueCallback(r[0]) : r[0];
    o = e.valueCallback ? e.valueCallback(o) : o;
    const a = t.slice(s.length);
    return { value: o, rest: a };
  };
}
const wd = /^(\d+)(th|st|nd|rd)?/i, vd = /\d+/i, Md = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, kd = {
  any: [/^b/i, /^(a|c)/i]
}, Dd = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, Pd = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Sd = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, Od = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
}, Td = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, Cd = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, Ad = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, Ed = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
}, $d = {
  ordinalNumber: xd({
    matchPattern: wd,
    parsePattern: vd,
    valueCallback: (n) => parseInt(n, 10)
  }),
  era: ve({
    matchPatterns: Md,
    defaultMatchWidth: "wide",
    parsePatterns: kd,
    defaultParseWidth: "any"
  }),
  quarter: ve({
    matchPatterns: Dd,
    defaultMatchWidth: "wide",
    parsePatterns: Pd,
    defaultParseWidth: "any",
    valueCallback: (n) => n + 1
  }),
  month: ve({
    matchPatterns: Sd,
    defaultMatchWidth: "wide",
    parsePatterns: Od,
    defaultParseWidth: "any"
  }),
  day: ve({
    matchPatterns: Td,
    defaultMatchWidth: "wide",
    parsePatterns: Cd,
    defaultParseWidth: "any"
  }),
  dayPeriod: ve({
    matchPatterns: Ad,
    defaultMatchWidth: "any",
    parsePatterns: Ed,
    defaultParseWidth: "any"
  })
}, Ao = {
  code: "en-US",
  formatDistance: id,
  formatLong: ad,
  formatRelative: ld,
  localize: bd,
  match: $d,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function Id(n, t) {
  const e = T(n, t == null ? void 0 : t.in);
  return ko(e, Co(e)) + 1;
}
function Eo(n, t) {
  const e = T(n, t == null ? void 0 : t.in), i = +de(e) - +Eu(e);
  return Math.round(i / vo) + 1;
}
function Ni(n, t) {
  var h, u, d, f;
  const e = T(n, t == null ? void 0 : t.in), i = e.getFullYear(), s = Zt(), r = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((u = (h = t == null ? void 0 : t.locale) == null ? void 0 : h.options) == null ? void 0 : u.firstWeekContainsDate) ?? s.firstWeekContainsDate ?? ((f = (d = s.locale) == null ? void 0 : d.options) == null ? void 0 : f.firstWeekContainsDate) ?? 1, o = N((t == null ? void 0 : t.in) || n, 0);
  o.setFullYear(i + 1, 0, r), o.setHours(0, 0, 0, 0);
  const a = pt(o, t), c = N((t == null ? void 0 : t.in) || n, 0);
  c.setFullYear(i, 0, r), c.setHours(0, 0, 0, 0);
  const l = pt(c, t);
  return +e >= +a ? i + 1 : +e >= +l ? i : i - 1;
}
function Ld(n, t) {
  var a, c, l, h;
  const e = Zt(), i = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((c = (a = t == null ? void 0 : t.locale) == null ? void 0 : a.options) == null ? void 0 : c.firstWeekContainsDate) ?? e.firstWeekContainsDate ?? ((h = (l = e.locale) == null ? void 0 : l.options) == null ? void 0 : h.firstWeekContainsDate) ?? 1, s = Ni(n, t), r = N((t == null ? void 0 : t.in) || n, 0);
  return r.setFullYear(s, 0, i), r.setHours(0, 0, 0, 0), pt(r, t);
}
function $o(n, t) {
  const e = T(n, t == null ? void 0 : t.in), i = +pt(e, t) - +Ld(e, t);
  return Math.round(i / vo) + 1;
}
function I(n, t) {
  const e = n < 0 ? "-" : "", i = Math.abs(n).toString().padStart(t, "0");
  return e + i;
}
const Mt = {
  // Year
  y(n, t) {
    const e = n.getFullYear(), i = e > 0 ? e : 1 - e;
    return I(t === "yy" ? i % 100 : i, t.length);
  },
  // Month
  M(n, t) {
    const e = n.getMonth();
    return t === "M" ? String(e + 1) : I(e + 1, 2);
  },
  // Day of the month
  d(n, t) {
    return I(n.getDate(), t.length);
  },
  // AM or PM
  a(n, t) {
    const e = n.getHours() / 12 >= 1 ? "pm" : "am";
    switch (t) {
      case "a":
      case "aa":
        return e.toUpperCase();
      case "aaa":
        return e;
      case "aaaaa":
        return e[0];
      case "aaaa":
      default:
        return e === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h(n, t) {
    return I(n.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(n, t) {
    return I(n.getHours(), t.length);
  },
  // Minute
  m(n, t) {
    return I(n.getMinutes(), t.length);
  },
  // Second
  s(n, t) {
    return I(n.getSeconds(), t.length);
  },
  // Fraction of second
  S(n, t) {
    const e = t.length, i = n.getMilliseconds(), s = Math.trunc(
      i * Math.pow(10, e - 3)
    );
    return I(s, t.length);
  }
}, ne = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, yr = {
  // Era
  G: function(n, t, e) {
    const i = n.getFullYear() > 0 ? 1 : 0;
    switch (t) {
      // AD, BC
      case "G":
      case "GG":
      case "GGG":
        return e.era(i, { width: "abbreviated" });
      // A, B
      case "GGGGG":
        return e.era(i, { width: "narrow" });
      // Anno Domini, Before Christ
      case "GGGG":
      default:
        return e.era(i, { width: "wide" });
    }
  },
  // Year
  y: function(n, t, e) {
    if (t === "yo") {
      const i = n.getFullYear(), s = i > 0 ? i : 1 - i;
      return e.ordinalNumber(s, { unit: "year" });
    }
    return Mt.y(n, t);
  },
  // Local week-numbering year
  Y: function(n, t, e, i) {
    const s = Ni(n, i), r = s > 0 ? s : 1 - s;
    if (t === "YY") {
      const o = r % 100;
      return I(o, 2);
    }
    return t === "Yo" ? e.ordinalNumber(r, { unit: "year" }) : I(r, t.length);
  },
  // ISO week-numbering year
  R: function(n, t) {
    const e = Mo(n);
    return I(e, t.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function(n, t) {
    const e = n.getFullYear();
    return I(e, t.length);
  },
  // Quarter
  Q: function(n, t, e) {
    const i = Math.ceil((n.getMonth() + 1) / 3);
    switch (t) {
      // 1, 2, 3, 4
      case "Q":
        return String(i);
      // 01, 02, 03, 04
      case "QQ":
        return I(i, 2);
      // 1st, 2nd, 3rd, 4th
      case "Qo":
        return e.ordinalNumber(i, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "QQQ":
        return e.quarter(i, {
          width: "abbreviated",
          context: "formatting"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "QQQQQ":
        return e.quarter(i, {
          width: "narrow",
          context: "formatting"
        });
      // 1st quarter, 2nd quarter, ...
      case "QQQQ":
      default:
        return e.quarter(i, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(n, t, e) {
    const i = Math.ceil((n.getMonth() + 1) / 3);
    switch (t) {
      // 1, 2, 3, 4
      case "q":
        return String(i);
      // 01, 02, 03, 04
      case "qq":
        return I(i, 2);
      // 1st, 2nd, 3rd, 4th
      case "qo":
        return e.ordinalNumber(i, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "qqq":
        return e.quarter(i, {
          width: "abbreviated",
          context: "standalone"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "qqqqq":
        return e.quarter(i, {
          width: "narrow",
          context: "standalone"
        });
      // 1st quarter, 2nd quarter, ...
      case "qqqq":
      default:
        return e.quarter(i, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(n, t, e) {
    const i = n.getMonth();
    switch (t) {
      case "M":
      case "MM":
        return Mt.M(n, t);
      // 1st, 2nd, ..., 12th
      case "Mo":
        return e.ordinalNumber(i + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "MMM":
        return e.month(i, {
          width: "abbreviated",
          context: "formatting"
        });
      // J, F, ..., D
      case "MMMMM":
        return e.month(i, {
          width: "narrow",
          context: "formatting"
        });
      // January, February, ..., December
      case "MMMM":
      default:
        return e.month(i, { width: "wide", context: "formatting" });
    }
  },
  // Stand-alone month
  L: function(n, t, e) {
    const i = n.getMonth();
    switch (t) {
      // 1, 2, ..., 12
      case "L":
        return String(i + 1);
      // 01, 02, ..., 12
      case "LL":
        return I(i + 1, 2);
      // 1st, 2nd, ..., 12th
      case "Lo":
        return e.ordinalNumber(i + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "LLL":
        return e.month(i, {
          width: "abbreviated",
          context: "standalone"
        });
      // J, F, ..., D
      case "LLLLL":
        return e.month(i, {
          width: "narrow",
          context: "standalone"
        });
      // January, February, ..., December
      case "LLLL":
      default:
        return e.month(i, { width: "wide", context: "standalone" });
    }
  },
  // Local week of year
  w: function(n, t, e, i) {
    const s = $o(n, i);
    return t === "wo" ? e.ordinalNumber(s, { unit: "week" }) : I(s, t.length);
  },
  // ISO week of year
  I: function(n, t, e) {
    const i = Eo(n);
    return t === "Io" ? e.ordinalNumber(i, { unit: "week" }) : I(i, t.length);
  },
  // Day of the month
  d: function(n, t, e) {
    return t === "do" ? e.ordinalNumber(n.getDate(), { unit: "date" }) : Mt.d(n, t);
  },
  // Day of year
  D: function(n, t, e) {
    const i = Id(n);
    return t === "Do" ? e.ordinalNumber(i, { unit: "dayOfYear" }) : I(i, t.length);
  },
  // Day of week
  E: function(n, t, e) {
    const i = n.getDay();
    switch (t) {
      // Tue
      case "E":
      case "EE":
      case "EEE":
        return e.day(i, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "EEEEE":
        return e.day(i, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "EEEEEE":
        return e.day(i, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "EEEE":
      default:
        return e.day(i, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(n, t, e, i) {
    const s = n.getDay(), r = (s - i.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case "e":
        return String(r);
      // Padded numerical value
      case "ee":
        return I(r, 2);
      // 1st, 2nd, ..., 7th
      case "eo":
        return e.ordinalNumber(r, { unit: "day" });
      case "eee":
        return e.day(s, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "eeeee":
        return e.day(s, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "eeeeee":
        return e.day(s, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "eeee":
      default:
        return e.day(s, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(n, t, e, i) {
    const s = n.getDay(), r = (s - i.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      // Numerical value (same as in `e`)
      case "c":
        return String(r);
      // Padded numerical value
      case "cc":
        return I(r, t.length);
      // 1st, 2nd, ..., 7th
      case "co":
        return e.ordinalNumber(r, { unit: "day" });
      case "ccc":
        return e.day(s, {
          width: "abbreviated",
          context: "standalone"
        });
      // T
      case "ccccc":
        return e.day(s, {
          width: "narrow",
          context: "standalone"
        });
      // Tu
      case "cccccc":
        return e.day(s, {
          width: "short",
          context: "standalone"
        });
      // Tuesday
      case "cccc":
      default:
        return e.day(s, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(n, t, e) {
    const i = n.getDay(), s = i === 0 ? 7 : i;
    switch (t) {
      // 2
      case "i":
        return String(s);
      // 02
      case "ii":
        return I(s, t.length);
      // 2nd
      case "io":
        return e.ordinalNumber(s, { unit: "day" });
      // Tue
      case "iii":
        return e.day(i, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "iiiii":
        return e.day(i, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "iiiiii":
        return e.day(i, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "iiii":
      default:
        return e.day(i, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(n, t, e) {
    const s = n.getHours() / 12 >= 1 ? "pm" : "am";
    switch (t) {
      case "a":
      case "aa":
        return e.dayPeriod(s, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return e.dayPeriod(s, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return e.dayPeriod(s, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return e.dayPeriod(s, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(n, t, e) {
    const i = n.getHours();
    let s;
    switch (i === 12 ? s = ne.noon : i === 0 ? s = ne.midnight : s = i / 12 >= 1 ? "pm" : "am", t) {
      case "b":
      case "bb":
        return e.dayPeriod(s, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return e.dayPeriod(s, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return e.dayPeriod(s, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return e.dayPeriod(s, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(n, t, e) {
    const i = n.getHours();
    let s;
    switch (i >= 17 ? s = ne.evening : i >= 12 ? s = ne.afternoon : i >= 4 ? s = ne.morning : s = ne.night, t) {
      case "B":
      case "BB":
      case "BBB":
        return e.dayPeriod(s, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return e.dayPeriod(s, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return e.dayPeriod(s, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(n, t, e) {
    if (t === "ho") {
      let i = n.getHours() % 12;
      return i === 0 && (i = 12), e.ordinalNumber(i, { unit: "hour" });
    }
    return Mt.h(n, t);
  },
  // Hour [0-23]
  H: function(n, t, e) {
    return t === "Ho" ? e.ordinalNumber(n.getHours(), { unit: "hour" }) : Mt.H(n, t);
  },
  // Hour [0-11]
  K: function(n, t, e) {
    const i = n.getHours() % 12;
    return t === "Ko" ? e.ordinalNumber(i, { unit: "hour" }) : I(i, t.length);
  },
  // Hour [1-24]
  k: function(n, t, e) {
    let i = n.getHours();
    return i === 0 && (i = 24), t === "ko" ? e.ordinalNumber(i, { unit: "hour" }) : I(i, t.length);
  },
  // Minute
  m: function(n, t, e) {
    return t === "mo" ? e.ordinalNumber(n.getMinutes(), { unit: "minute" }) : Mt.m(n, t);
  },
  // Second
  s: function(n, t, e) {
    return t === "so" ? e.ordinalNumber(n.getSeconds(), { unit: "second" }) : Mt.s(n, t);
  },
  // Fraction of second
  S: function(n, t) {
    return Mt.S(n, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(n, t, e) {
    const i = n.getTimezoneOffset();
    if (i === 0)
      return "Z";
    switch (t) {
      // Hours and optional minutes
      case "X":
        return xr(i);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX":
        return Yt(i);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return Yt(i, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(n, t, e) {
    const i = n.getTimezoneOffset();
    switch (t) {
      // Hours and optional minutes
      case "x":
        return xr(i);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx":
        return Yt(i);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return Yt(i, ":");
    }
  },
  // Timezone (GMT)
  O: function(n, t, e) {
    const i = n.getTimezoneOffset();
    switch (t) {
      // Short
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + _r(i, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + Yt(i, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(n, t, e) {
    const i = n.getTimezoneOffset();
    switch (t) {
      // Short
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + _r(i, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + Yt(i, ":");
    }
  },
  // Seconds timestamp
  t: function(n, t, e) {
    const i = Math.trunc(+n / 1e3);
    return I(i, t.length);
  },
  // Milliseconds timestamp
  T: function(n, t, e) {
    return I(+n, t.length);
  }
};
function _r(n, t = "") {
  const e = n > 0 ? "-" : "+", i = Math.abs(n), s = Math.trunc(i / 60), r = i % 60;
  return r === 0 ? e + String(s) : e + String(s) + t + I(r, 2);
}
function xr(n, t) {
  return n % 60 === 0 ? (n > 0 ? "-" : "+") + I(Math.abs(n) / 60, 2) : Yt(n, t);
}
function Yt(n, t = "") {
  const e = n > 0 ? "-" : "+", i = Math.abs(n), s = I(Math.trunc(i / 60), 2), r = I(i % 60, 2);
  return e + s + t + r;
}
const wr = (n, t) => {
  switch (n) {
    case "P":
      return t.date({ width: "short" });
    case "PP":
      return t.date({ width: "medium" });
    case "PPP":
      return t.date({ width: "long" });
    case "PPPP":
    default:
      return t.date({ width: "full" });
  }
}, Io = (n, t) => {
  switch (n) {
    case "p":
      return t.time({ width: "short" });
    case "pp":
      return t.time({ width: "medium" });
    case "ppp":
      return t.time({ width: "long" });
    case "pppp":
    default:
      return t.time({ width: "full" });
  }
}, Fd = (n, t) => {
  const e = n.match(/(P+)(p+)?/) || [], i = e[1], s = e[2];
  if (!s)
    return wr(n, t);
  let r;
  switch (i) {
    case "P":
      r = t.dateTime({ width: "short" });
      break;
    case "PP":
      r = t.dateTime({ width: "medium" });
      break;
    case "PPP":
      r = t.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      r = t.dateTime({ width: "full" });
      break;
  }
  return r.replace("{{date}}", wr(i, t)).replace("{{time}}", Io(s, t));
}, _i = {
  p: Io,
  P: Fd
}, Rd = /^D+$/, zd = /^Y+$/, Hd = ["D", "DD", "YY", "YYYY"];
function Lo(n) {
  return Rd.test(n);
}
function Fo(n) {
  return zd.test(n);
}
function xi(n, t, e) {
  const i = Nd(n, t, e);
  if (console.warn(i), Hd.includes(n)) throw new RangeError(i);
}
function Nd(n, t, e) {
  const i = n[0] === "Y" ? "years" : "days of the month";
  return `Use \`${n.toLowerCase()}\` instead of \`${n}\` (in \`${t}\`) for formatting ${i} to the input \`${e}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Wd = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Bd = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Yd = /^'([^]*?)'?$/, jd = /''/g, Vd = /[a-zA-Z]/;
function Ud(n, t, e) {
  var h, u, d, f, g, m, p, b;
  const i = Zt(), s = (e == null ? void 0 : e.locale) ?? i.locale ?? Ao, r = (e == null ? void 0 : e.firstWeekContainsDate) ?? ((u = (h = e == null ? void 0 : e.locale) == null ? void 0 : h.options) == null ? void 0 : u.firstWeekContainsDate) ?? i.firstWeekContainsDate ?? ((f = (d = i.locale) == null ? void 0 : d.options) == null ? void 0 : f.firstWeekContainsDate) ?? 1, o = (e == null ? void 0 : e.weekStartsOn) ?? ((m = (g = e == null ? void 0 : e.locale) == null ? void 0 : g.options) == null ? void 0 : m.weekStartsOn) ?? i.weekStartsOn ?? ((b = (p = i.locale) == null ? void 0 : p.options) == null ? void 0 : b.weekStartsOn) ?? 0, a = T(n, e == null ? void 0 : e.in);
  if (!Do(a))
    throw new RangeError("Invalid time value");
  let c = t.match(Bd).map((y) => {
    const v = y[0];
    if (v === "p" || v === "P") {
      const M = _i[v];
      return M(y, s.formatLong);
    }
    return y;
  }).join("").match(Wd).map((y) => {
    if (y === "''")
      return { isToken: !1, value: "'" };
    const v = y[0];
    if (v === "'")
      return { isToken: !1, value: qd(y) };
    if (yr[v])
      return { isToken: !0, value: y };
    if (v.match(Vd))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + v + "`"
      );
    return { isToken: !1, value: y };
  });
  s.localize.preprocessor && (c = s.localize.preprocessor(a, c));
  const l = {
    firstWeekContainsDate: r,
    weekStartsOn: o,
    locale: s
  };
  return c.map((y) => {
    if (!y.isToken) return y.value;
    const v = y.value;
    (!(e != null && e.useAdditionalWeekYearTokens) && Fo(v) || !(e != null && e.useAdditionalDayOfYearTokens) && Lo(v)) && xi(v, t, String(n));
    const M = yr[v[0]];
    return M(a, v, s.localize, l);
  }).join("");
}
function qd(n) {
  const t = n.match(Yd);
  return t ? t[1].replace(jd, "'") : n;
}
function Xd() {
  return Object.assign({}, Zt());
}
function Qd(n, t) {
  const e = T(n, t == null ? void 0 : t.in).getDay();
  return e === 0 ? 7 : e;
}
function Gd(n, t) {
  const e = Kd(t) ? new t(0) : N(t, 0);
  return e.setFullYear(n.getFullYear(), n.getMonth(), n.getDate()), e.setHours(
    n.getHours(),
    n.getMinutes(),
    n.getSeconds(),
    n.getMilliseconds()
  ), e;
}
function Kd(n) {
  var t;
  return typeof n == "function" && ((t = n.prototype) == null ? void 0 : t.constructor) === n;
}
const Zd = 10;
class Ro {
  constructor() {
    x(this, "subPriority", 0);
  }
  validate(t, e) {
    return !0;
  }
}
class Jd extends Ro {
  constructor(t, e, i, s, r) {
    super(), this.value = t, this.validateValue = e, this.setValue = i, this.priority = s, r && (this.subPriority = r);
  }
  validate(t, e) {
    return this.validateValue(t, this.value, e);
  }
  set(t, e, i) {
    return this.setValue(t, e, this.value, i);
  }
}
class tf extends Ro {
  constructor(e, i) {
    super();
    x(this, "priority", Zd);
    x(this, "subPriority", -1);
    this.context = e || ((s) => N(i, s));
  }
  set(e, i) {
    return i.timestampIsSet ? e : N(e, Gd(e, this.context));
  }
}
class $ {
  run(t, e, i, s) {
    const r = this.parse(t, e, i, s);
    return r ? {
      setter: new Jd(
        r.value,
        this.validate,
        this.set,
        this.priority,
        this.subPriority
      ),
      rest: r.rest
    } : null;
  }
  validate(t, e, i) {
    return !0;
  }
}
class ef extends $ {
  constructor() {
    super(...arguments);
    x(this, "priority", 140);
    x(this, "incompatibleTokens", ["R", "u", "t", "T"]);
  }
  parse(e, i, s) {
    switch (i) {
      // AD, BC
      case "G":
      case "GG":
      case "GGG":
        return s.era(e, { width: "abbreviated" }) || s.era(e, { width: "narrow" });
      // A, B
      case "GGGGG":
        return s.era(e, { width: "narrow" });
      // Anno Domini, Before Christ
      case "GGGG":
      default:
        return s.era(e, { width: "wide" }) || s.era(e, { width: "abbreviated" }) || s.era(e, { width: "narrow" });
    }
  }
  set(e, i, s) {
    return i.era = s, e.setFullYear(s, 0, 1), e.setHours(0, 0, 0, 0), e;
  }
}
const Y = {
  month: /^(1[0-2]|0?\d)/,
  // 0 to 12
  date: /^(3[0-1]|[0-2]?\d)/,
  // 0 to 31
  dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,
  // 0 to 366
  week: /^(5[0-3]|[0-4]?\d)/,
  // 0 to 53
  hour23h: /^(2[0-3]|[0-1]?\d)/,
  // 0 to 23
  hour24h: /^(2[0-4]|[0-1]?\d)/,
  // 0 to 24
  hour11h: /^(1[0-1]|0?\d)/,
  // 0 to 11
  hour12h: /^(1[0-2]|0?\d)/,
  // 0 to 12
  minute: /^[0-5]?\d/,
  // 0 to 59
  second: /^[0-5]?\d/,
  // 0 to 59
  singleDigit: /^\d/,
  // 0 to 9
  twoDigits: /^\d{1,2}/,
  // 0 to 99
  threeDigits: /^\d{1,3}/,
  // 0 to 999
  fourDigits: /^\d{1,4}/,
  // 0 to 9999
  anyDigitsSigned: /^-?\d+/,
  singleDigitSigned: /^-?\d/,
  // 0 to 9, -0 to -9
  twoDigitsSigned: /^-?\d{1,2}/,
  // 0 to 99, -0 to -99
  threeDigitsSigned: /^-?\d{1,3}/,
  // 0 to 999, -0 to -999
  fourDigitsSigned: /^-?\d{1,4}/
  // 0 to 9999, -0 to -9999
}, gt = {
  basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
  basic: /^([+-])(\d{2})(\d{2})|Z/,
  basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
  extended: /^([+-])(\d{2}):(\d{2})|Z/,
  extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/
};
function j(n, t) {
  return n && {
    value: t(n.value),
    rest: n.rest
  };
}
function H(n, t) {
  const e = t.match(n);
  return e ? {
    value: parseInt(e[0], 10),
    rest: t.slice(e[0].length)
  } : null;
}
function mt(n, t) {
  const e = t.match(n);
  if (!e)
    return null;
  if (e[0] === "Z")
    return {
      value: 0,
      rest: t.slice(1)
    };
  const i = e[1] === "+" ? 1 : -1, s = e[2] ? parseInt(e[2], 10) : 0, r = e[3] ? parseInt(e[3], 10) : 0, o = e[5] ? parseInt(e[5], 10) : 0;
  return {
    value: i * (s * Ke + r * Ge + o * Tu),
    rest: t.slice(e[0].length)
  };
}
function zo(n) {
  return H(Y.anyDigitsSigned, n);
}
function W(n, t) {
  switch (n) {
    case 1:
      return H(Y.singleDigit, t);
    case 2:
      return H(Y.twoDigits, t);
    case 3:
      return H(Y.threeDigits, t);
    case 4:
      return H(Y.fourDigits, t);
    default:
      return H(new RegExp("^\\d{1," + n + "}"), t);
  }
}
function An(n, t) {
  switch (n) {
    case 1:
      return H(Y.singleDigitSigned, t);
    case 2:
      return H(Y.twoDigitsSigned, t);
    case 3:
      return H(Y.threeDigitsSigned, t);
    case 4:
      return H(Y.fourDigitsSigned, t);
    default:
      return H(new RegExp("^-?\\d{1," + n + "}"), t);
  }
}
function Wi(n) {
  switch (n) {
    case "morning":
      return 4;
    case "evening":
      return 17;
    case "pm":
    case "noon":
    case "afternoon":
      return 12;
    case "am":
    case "midnight":
    case "night":
    default:
      return 0;
  }
}
function Ho(n, t) {
  const e = t > 0, i = e ? t : 1 - t;
  let s;
  if (i <= 50)
    s = n || 100;
  else {
    const r = i + 50, o = Math.trunc(r / 100) * 100, a = n >= r % 100;
    s = n + o - (a ? 100 : 0);
  }
  return e ? s : 1 - s;
}
function No(n) {
  return n % 400 === 0 || n % 4 === 0 && n % 100 !== 0;
}
class nf extends $ {
  constructor() {
    super(...arguments);
    x(this, "priority", 130);
    x(this, "incompatibleTokens", ["Y", "R", "u", "w", "I", "i", "e", "c", "t", "T"]);
  }
  parse(e, i, s) {
    const r = (o) => ({
      year: o,
      isTwoDigitYear: i === "yy"
    });
    switch (i) {
      case "y":
        return j(W(4, e), r);
      case "yo":
        return j(
          s.ordinalNumber(e, {
            unit: "year"
          }),
          r
        );
      default:
        return j(W(i.length, e), r);
    }
  }
  validate(e, i) {
    return i.isTwoDigitYear || i.year > 0;
  }
  set(e, i, s) {
    const r = e.getFullYear();
    if (s.isTwoDigitYear) {
      const a = Ho(
        s.year,
        r
      );
      return e.setFullYear(a, 0, 1), e.setHours(0, 0, 0, 0), e;
    }
    const o = !("era" in i) || i.era === 1 ? s.year : 1 - s.year;
    return e.setFullYear(o, 0, 1), e.setHours(0, 0, 0, 0), e;
  }
}
class sf extends $ {
  constructor() {
    super(...arguments);
    x(this, "priority", 130);
    x(this, "incompatibleTokens", [
      "y",
      "R",
      "u",
      "Q",
      "q",
      "M",
      "L",
      "I",
      "d",
      "D",
      "i",
      "t",
      "T"
    ]);
  }
  parse(e, i, s) {
    const r = (o) => ({
      year: o,
      isTwoDigitYear: i === "YY"
    });
    switch (i) {
      case "Y":
        return j(W(4, e), r);
      case "Yo":
        return j(
          s.ordinalNumber(e, {
            unit: "year"
          }),
          r
        );
      default:
        return j(W(i.length, e), r);
    }
  }
  validate(e, i) {
    return i.isTwoDigitYear || i.year > 0;
  }
  set(e, i, s, r) {
    const o = Ni(e, r);
    if (s.isTwoDigitYear) {
      const c = Ho(
        s.year,
        o
      );
      return e.setFullYear(
        c,
        0,
        r.firstWeekContainsDate
      ), e.setHours(0, 0, 0, 0), pt(e, r);
    }
    const a = !("era" in i) || i.era === 1 ? s.year : 1 - s.year;
    return e.setFullYear(a, 0, r.firstWeekContainsDate), e.setHours(0, 0, 0, 0), pt(e, r);
  }
}
class rf extends $ {
  constructor() {
    super(...arguments);
    x(this, "priority", 130);
    x(this, "incompatibleTokens", [
      "G",
      "y",
      "Y",
      "u",
      "Q",
      "q",
      "M",
      "L",
      "w",
      "d",
      "D",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(e, i) {
    return An(i === "R" ? 4 : i.length, e);
  }
  set(e, i, s) {
    const r = N(e, 0);
    return r.setFullYear(s, 0, 4), r.setHours(0, 0, 0, 0), de(r);
  }
}
class of extends $ {
  constructor() {
    super(...arguments);
    x(this, "priority", 130);
    x(this, "incompatibleTokens", ["G", "y", "Y", "R", "w", "I", "i", "e", "c", "t", "T"]);
  }
  parse(e, i) {
    return An(i === "u" ? 4 : i.length, e);
  }
  set(e, i, s) {
    return e.setFullYear(s, 0, 1), e.setHours(0, 0, 0, 0), e;
  }
}
class af extends $ {
  constructor() {
    super(...arguments);
    x(this, "priority", 120);
    x(this, "incompatibleTokens", [
      "Y",
      "R",
      "q",
      "M",
      "L",
      "w",
      "I",
      "d",
      "D",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(e, i, s) {
    switch (i) {
      // 1, 2, 3, 4
      case "Q":
      case "QQ":
        return W(i.length, e);
      // 1st, 2nd, 3rd, 4th
      case "Qo":
        return s.ordinalNumber(e, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "QQQ":
        return s.quarter(e, {
          width: "abbreviated",
          context: "formatting"
        }) || s.quarter(e, {
          width: "narrow",
          context: "formatting"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "QQQQQ":
        return s.quarter(e, {
          width: "narrow",
          context: "formatting"
        });
      // 1st quarter, 2nd quarter, ...
      case "QQQQ":
      default:
        return s.quarter(e, {
          width: "wide",
          context: "formatting"
        }) || s.quarter(e, {
          width: "abbreviated",
          context: "formatting"
        }) || s.quarter(e, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  validate(e, i) {
    return i >= 1 && i <= 4;
  }
  set(e, i, s) {
    return e.setMonth((s - 1) * 3, 1), e.setHours(0, 0, 0, 0), e;
  }
}
class cf extends $ {
  constructor() {
    super(...arguments);
    x(this, "priority", 120);
    x(this, "incompatibleTokens", [
      "Y",
      "R",
      "Q",
      "M",
      "L",
      "w",
      "I",
      "d",
      "D",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(e, i, s) {
    switch (i) {
      // 1, 2, 3, 4
      case "q":
      case "qq":
        return W(i.length, e);
      // 1st, 2nd, 3rd, 4th
      case "qo":
        return s.ordinalNumber(e, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "qqq":
        return s.quarter(e, {
          width: "abbreviated",
          context: "standalone"
        }) || s.quarter(e, {
          width: "narrow",
          context: "standalone"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "qqqqq":
        return s.quarter(e, {
          width: "narrow",
          context: "standalone"
        });
      // 1st quarter, 2nd quarter, ...
      case "qqqq":
      default:
        return s.quarter(e, {
          width: "wide",
          context: "standalone"
        }) || s.quarter(e, {
          width: "abbreviated",
          context: "standalone"
        }) || s.quarter(e, {
          width: "narrow",
          context: "standalone"
        });
    }
  }
  validate(e, i) {
    return i >= 1 && i <= 4;
  }
  set(e, i, s) {
    return e.setMonth((s - 1) * 3, 1), e.setHours(0, 0, 0, 0), e;
  }
}
class lf extends $ {
  constructor() {
    super(...arguments);
    x(this, "incompatibleTokens", [
      "Y",
      "R",
      "q",
      "Q",
      "L",
      "w",
      "I",
      "D",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
    x(this, "priority", 110);
  }
  parse(e, i, s) {
    const r = (o) => o - 1;
    switch (i) {
      // 1, 2, ..., 12
      case "M":
        return j(
          H(Y.month, e),
          r
        );
      // 01, 02, ..., 12
      case "MM":
        return j(W(2, e), r);
      // 1st, 2nd, ..., 12th
      case "Mo":
        return j(
          s.ordinalNumber(e, {
            unit: "month"
          }),
          r
        );
      // Jan, Feb, ..., Dec
      case "MMM":
        return s.month(e, {
          width: "abbreviated",
          context: "formatting"
        }) || s.month(e, { width: "narrow", context: "formatting" });
      // J, F, ..., D
      case "MMMMM":
        return s.month(e, {
          width: "narrow",
          context: "formatting"
        });
      // January, February, ..., December
      case "MMMM":
      default:
        return s.month(e, { width: "wide", context: "formatting" }) || s.month(e, {
          width: "abbreviated",
          context: "formatting"
        }) || s.month(e, { width: "narrow", context: "formatting" });
    }
  }
  validate(e, i) {
    return i >= 0 && i <= 11;
  }
  set(e, i, s) {
    return e.setMonth(s, 1), e.setHours(0, 0, 0, 0), e;
  }
}
class hf extends $ {
  constructor() {
    super(...arguments);
    x(this, "priority", 110);
    x(this, "incompatibleTokens", [
      "Y",
      "R",
      "q",
      "Q",
      "M",
      "w",
      "I",
      "D",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(e, i, s) {
    const r = (o) => o - 1;
    switch (i) {
      // 1, 2, ..., 12
      case "L":
        return j(
          H(Y.month, e),
          r
        );
      // 01, 02, ..., 12
      case "LL":
        return j(W(2, e), r);
      // 1st, 2nd, ..., 12th
      case "Lo":
        return j(
          s.ordinalNumber(e, {
            unit: "month"
          }),
          r
        );
      // Jan, Feb, ..., Dec
      case "LLL":
        return s.month(e, {
          width: "abbreviated",
          context: "standalone"
        }) || s.month(e, { width: "narrow", context: "standalone" });
      // J, F, ..., D
      case "LLLLL":
        return s.month(e, {
          width: "narrow",
          context: "standalone"
        });
      // January, February, ..., December
      case "LLLL":
      default:
        return s.month(e, { width: "wide", context: "standalone" }) || s.month(e, {
          width: "abbreviated",
          context: "standalone"
        }) || s.month(e, { width: "narrow", context: "standalone" });
    }
  }
  validate(e, i) {
    return i >= 0 && i <= 11;
  }
  set(e, i, s) {
    return e.setMonth(s, 1), e.setHours(0, 0, 0, 0), e;
  }
}
function uf(n, t, e) {
  const i = T(n, e == null ? void 0 : e.in), s = $o(i, e) - t;
  return i.setDate(i.getDate() - s * 7), T(i, e == null ? void 0 : e.in);
}
class df extends $ {
  constructor() {
    super(...arguments);
    x(this, "priority", 100);
    x(this, "incompatibleTokens", [
      "y",
      "R",
      "u",
      "q",
      "Q",
      "M",
      "L",
      "I",
      "d",
      "D",
      "i",
      "t",
      "T"
    ]);
  }
  parse(e, i, s) {
    switch (i) {
      case "w":
        return H(Y.week, e);
      case "wo":
        return s.ordinalNumber(e, { unit: "week" });
      default:
        return W(i.length, e);
    }
  }
  validate(e, i) {
    return i >= 1 && i <= 53;
  }
  set(e, i, s, r) {
    return pt(uf(e, s, r), r);
  }
}
function ff(n, t, e) {
  const i = T(n, e == null ? void 0 : e.in), s = Eo(i, e) - t;
  return i.setDate(i.getDate() - s * 7), i;
}
class gf extends $ {
  constructor() {
    super(...arguments);
    x(this, "priority", 100);
    x(this, "incompatibleTokens", [
      "y",
      "Y",
      "u",
      "q",
      "Q",
      "M",
      "L",
      "w",
      "d",
      "D",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(e, i, s) {
    switch (i) {
      case "I":
        return H(Y.week, e);
      case "Io":
        return s.ordinalNumber(e, { unit: "week" });
      default:
        return W(i.length, e);
    }
  }
  validate(e, i) {
    return i >= 1 && i <= 53;
  }
  set(e, i, s) {
    return de(ff(e, s));
  }
}
const mf = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], pf = [
  31,
  29,
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31
];
class bf extends $ {
  constructor() {
    super(...arguments);
    x(this, "priority", 90);
    x(this, "subPriority", 1);
    x(this, "incompatibleTokens", [
      "Y",
      "R",
      "q",
      "Q",
      "w",
      "I",
      "D",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(e, i, s) {
    switch (i) {
      case "d":
        return H(Y.date, e);
      case "do":
        return s.ordinalNumber(e, { unit: "date" });
      default:
        return W(i.length, e);
    }
  }
  validate(e, i) {
    const s = e.getFullYear(), r = No(s), o = e.getMonth();
    return r ? i >= 1 && i <= pf[o] : i >= 1 && i <= mf[o];
  }
  set(e, i, s) {
    return e.setDate(s), e.setHours(0, 0, 0, 0), e;
  }
}
class yf extends $ {
  constructor() {
    super(...arguments);
    x(this, "priority", 90);
    x(this, "subpriority", 1);
    x(this, "incompatibleTokens", [
      "Y",
      "R",
      "q",
      "Q",
      "M",
      "L",
      "w",
      "I",
      "d",
      "E",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(e, i, s) {
    switch (i) {
      case "D":
      case "DD":
        return H(Y.dayOfYear, e);
      case "Do":
        return s.ordinalNumber(e, { unit: "date" });
      default:
        return W(i.length, e);
    }
  }
  validate(e, i) {
    const s = e.getFullYear();
    return No(s) ? i >= 1 && i <= 366 : i >= 1 && i <= 365;
  }
  set(e, i, s) {
    return e.setMonth(0, s), e.setHours(0, 0, 0, 0), e;
  }
}
function Bi(n, t, e) {
  var u, d, f, g;
  const i = Zt(), s = (e == null ? void 0 : e.weekStartsOn) ?? ((d = (u = e == null ? void 0 : e.locale) == null ? void 0 : u.options) == null ? void 0 : d.weekStartsOn) ?? i.weekStartsOn ?? ((g = (f = i.locale) == null ? void 0 : f.options) == null ? void 0 : g.weekStartsOn) ?? 0, r = T(n, e == null ? void 0 : e.in), o = r.getDay(), c = (t % 7 + 7) % 7, l = 7 - s, h = t < 0 || t > 6 ? t - (o + l) % 7 : (c + l) % 7 - (o + l) % 7;
  return Nn(r, h, e);
}
class _f extends $ {
  constructor() {
    super(...arguments);
    x(this, "priority", 90);
    x(this, "incompatibleTokens", ["D", "i", "e", "c", "t", "T"]);
  }
  parse(e, i, s) {
    switch (i) {
      // Tue
      case "E":
      case "EE":
      case "EEE":
        return s.day(e, {
          width: "abbreviated",
          context: "formatting"
        }) || s.day(e, { width: "short", context: "formatting" }) || s.day(e, { width: "narrow", context: "formatting" });
      // T
      case "EEEEE":
        return s.day(e, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "EEEEEE":
        return s.day(e, { width: "short", context: "formatting" }) || s.day(e, { width: "narrow", context: "formatting" });
      // Tuesday
      case "EEEE":
      default:
        return s.day(e, { width: "wide", context: "formatting" }) || s.day(e, {
          width: "abbreviated",
          context: "formatting"
        }) || s.day(e, { width: "short", context: "formatting" }) || s.day(e, { width: "narrow", context: "formatting" });
    }
  }
  validate(e, i) {
    return i >= 0 && i <= 6;
  }
  set(e, i, s, r) {
    return e = Bi(e, s, r), e.setHours(0, 0, 0, 0), e;
  }
}
class xf extends $ {
  constructor() {
    super(...arguments);
    x(this, "priority", 90);
    x(this, "incompatibleTokens", [
      "y",
      "R",
      "u",
      "q",
      "Q",
      "M",
      "L",
      "I",
      "d",
      "D",
      "E",
      "i",
      "c",
      "t",
      "T"
    ]);
  }
  parse(e, i, s, r) {
    const o = (a) => {
      const c = Math.floor((a - 1) / 7) * 7;
      return (a + r.weekStartsOn + 6) % 7 + c;
    };
    switch (i) {
      // 3
      case "e":
      case "ee":
        return j(W(i.length, e), o);
      // 3rd
      case "eo":
        return j(
          s.ordinalNumber(e, {
            unit: "day"
          }),
          o
        );
      // Tue
      case "eee":
        return s.day(e, {
          width: "abbreviated",
          context: "formatting"
        }) || s.day(e, { width: "short", context: "formatting" }) || s.day(e, { width: "narrow", context: "formatting" });
      // T
      case "eeeee":
        return s.day(e, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "eeeeee":
        return s.day(e, { width: "short", context: "formatting" }) || s.day(e, { width: "narrow", context: "formatting" });
      // Tuesday
      case "eeee":
      default:
        return s.day(e, { width: "wide", context: "formatting" }) || s.day(e, {
          width: "abbreviated",
          context: "formatting"
        }) || s.day(e, { width: "short", context: "formatting" }) || s.day(e, { width: "narrow", context: "formatting" });
    }
  }
  validate(e, i) {
    return i >= 0 && i <= 6;
  }
  set(e, i, s, r) {
    return e = Bi(e, s, r), e.setHours(0, 0, 0, 0), e;
  }
}
class wf extends $ {
  constructor() {
    super(...arguments);
    x(this, "priority", 90);
    x(this, "incompatibleTokens", [
      "y",
      "R",
      "u",
      "q",
      "Q",
      "M",
      "L",
      "I",
      "d",
      "D",
      "E",
      "i",
      "e",
      "t",
      "T"
    ]);
  }
  parse(e, i, s, r) {
    const o = (a) => {
      const c = Math.floor((a - 1) / 7) * 7;
      return (a + r.weekStartsOn + 6) % 7 + c;
    };
    switch (i) {
      // 3
      case "c":
      case "cc":
        return j(W(i.length, e), o);
      // 3rd
      case "co":
        return j(
          s.ordinalNumber(e, {
            unit: "day"
          }),
          o
        );
      // Tue
      case "ccc":
        return s.day(e, {
          width: "abbreviated",
          context: "standalone"
        }) || s.day(e, { width: "short", context: "standalone" }) || s.day(e, { width: "narrow", context: "standalone" });
      // T
      case "ccccc":
        return s.day(e, {
          width: "narrow",
          context: "standalone"
        });
      // Tu
      case "cccccc":
        return s.day(e, { width: "short", context: "standalone" }) || s.day(e, { width: "narrow", context: "standalone" });
      // Tuesday
      case "cccc":
      default:
        return s.day(e, { width: "wide", context: "standalone" }) || s.day(e, {
          width: "abbreviated",
          context: "standalone"
        }) || s.day(e, { width: "short", context: "standalone" }) || s.day(e, { width: "narrow", context: "standalone" });
    }
  }
  validate(e, i) {
    return i >= 0 && i <= 6;
  }
  set(e, i, s, r) {
    return e = Bi(e, s, r), e.setHours(0, 0, 0, 0), e;
  }
}
function vf(n, t, e) {
  const i = T(n, e == null ? void 0 : e.in), s = Qd(i, e), r = t - s;
  return Nn(i, r, e);
}
class Mf extends $ {
  constructor() {
    super(...arguments);
    x(this, "priority", 90);
    x(this, "incompatibleTokens", [
      "y",
      "Y",
      "u",
      "q",
      "Q",
      "M",
      "L",
      "w",
      "d",
      "D",
      "E",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(e, i, s) {
    const r = (o) => o === 0 ? 7 : o;
    switch (i) {
      // 2
      case "i":
      case "ii":
        return W(i.length, e);
      // 2nd
      case "io":
        return s.ordinalNumber(e, { unit: "day" });
      // Tue
      case "iii":
        return j(
          s.day(e, {
            width: "abbreviated",
            context: "formatting"
          }) || s.day(e, {
            width: "short",
            context: "formatting"
          }) || s.day(e, {
            width: "narrow",
            context: "formatting"
          }),
          r
        );
      // T
      case "iiiii":
        return j(
          s.day(e, {
            width: "narrow",
            context: "formatting"
          }),
          r
        );
      // Tu
      case "iiiiii":
        return j(
          s.day(e, {
            width: "short",
            context: "formatting"
          }) || s.day(e, {
            width: "narrow",
            context: "formatting"
          }),
          r
        );
      // Tuesday
      case "iiii":
      default:
        return j(
          s.day(e, {
            width: "wide",
            context: "formatting"
          }) || s.day(e, {
            width: "abbreviated",
            context: "formatting"
          }) || s.day(e, {
            width: "short",
            context: "formatting"
          }) || s.day(e, {
            width: "narrow",
            context: "formatting"
          }),
          r
        );
    }
  }
  validate(e, i) {
    return i >= 1 && i <= 7;
  }
  set(e, i, s) {
    return e = vf(e, s), e.setHours(0, 0, 0, 0), e;
  }
}
class kf extends $ {
  constructor() {
    super(...arguments);
    x(this, "priority", 80);
    x(this, "incompatibleTokens", ["b", "B", "H", "k", "t", "T"]);
  }
  parse(e, i, s) {
    switch (i) {
      case "a":
      case "aa":
      case "aaa":
        return s.dayPeriod(e, {
          width: "abbreviated",
          context: "formatting"
        }) || s.dayPeriod(e, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaaa":
        return s.dayPeriod(e, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return s.dayPeriod(e, {
          width: "wide",
          context: "formatting"
        }) || s.dayPeriod(e, {
          width: "abbreviated",
          context: "formatting"
        }) || s.dayPeriod(e, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  set(e, i, s) {
    return e.setHours(Wi(s), 0, 0, 0), e;
  }
}
class Df extends $ {
  constructor() {
    super(...arguments);
    x(this, "priority", 80);
    x(this, "incompatibleTokens", ["a", "B", "H", "k", "t", "T"]);
  }
  parse(e, i, s) {
    switch (i) {
      case "b":
      case "bb":
      case "bbb":
        return s.dayPeriod(e, {
          width: "abbreviated",
          context: "formatting"
        }) || s.dayPeriod(e, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbbb":
        return s.dayPeriod(e, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return s.dayPeriod(e, {
          width: "wide",
          context: "formatting"
        }) || s.dayPeriod(e, {
          width: "abbreviated",
          context: "formatting"
        }) || s.dayPeriod(e, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  set(e, i, s) {
    return e.setHours(Wi(s), 0, 0, 0), e;
  }
}
class Pf extends $ {
  constructor() {
    super(...arguments);
    x(this, "priority", 80);
    x(this, "incompatibleTokens", ["a", "b", "t", "T"]);
  }
  parse(e, i, s) {
    switch (i) {
      case "B":
      case "BB":
      case "BBB":
        return s.dayPeriod(e, {
          width: "abbreviated",
          context: "formatting"
        }) || s.dayPeriod(e, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBBB":
        return s.dayPeriod(e, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return s.dayPeriod(e, {
          width: "wide",
          context: "formatting"
        }) || s.dayPeriod(e, {
          width: "abbreviated",
          context: "formatting"
        }) || s.dayPeriod(e, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  set(e, i, s) {
    return e.setHours(Wi(s), 0, 0, 0), e;
  }
}
class Sf extends $ {
  constructor() {
    super(...arguments);
    x(this, "priority", 70);
    x(this, "incompatibleTokens", ["H", "K", "k", "t", "T"]);
  }
  parse(e, i, s) {
    switch (i) {
      case "h":
        return H(Y.hour12h, e);
      case "ho":
        return s.ordinalNumber(e, { unit: "hour" });
      default:
        return W(i.length, e);
    }
  }
  validate(e, i) {
    return i >= 1 && i <= 12;
  }
  set(e, i, s) {
    const r = e.getHours() >= 12;
    return r && s < 12 ? e.setHours(s + 12, 0, 0, 0) : !r && s === 12 ? e.setHours(0, 0, 0, 0) : e.setHours(s, 0, 0, 0), e;
  }
}
class Of extends $ {
  constructor() {
    super(...arguments);
    x(this, "priority", 70);
    x(this, "incompatibleTokens", ["a", "b", "h", "K", "k", "t", "T"]);
  }
  parse(e, i, s) {
    switch (i) {
      case "H":
        return H(Y.hour23h, e);
      case "Ho":
        return s.ordinalNumber(e, { unit: "hour" });
      default:
        return W(i.length, e);
    }
  }
  validate(e, i) {
    return i >= 0 && i <= 23;
  }
  set(e, i, s) {
    return e.setHours(s, 0, 0, 0), e;
  }
}
class Tf extends $ {
  constructor() {
    super(...arguments);
    x(this, "priority", 70);
    x(this, "incompatibleTokens", ["h", "H", "k", "t", "T"]);
  }
  parse(e, i, s) {
    switch (i) {
      case "K":
        return H(Y.hour11h, e);
      case "Ko":
        return s.ordinalNumber(e, { unit: "hour" });
      default:
        return W(i.length, e);
    }
  }
  validate(e, i) {
    return i >= 0 && i <= 11;
  }
  set(e, i, s) {
    return e.getHours() >= 12 && s < 12 ? e.setHours(s + 12, 0, 0, 0) : e.setHours(s, 0, 0, 0), e;
  }
}
class Cf extends $ {
  constructor() {
    super(...arguments);
    x(this, "priority", 70);
    x(this, "incompatibleTokens", ["a", "b", "h", "H", "K", "t", "T"]);
  }
  parse(e, i, s) {
    switch (i) {
      case "k":
        return H(Y.hour24h, e);
      case "ko":
        return s.ordinalNumber(e, { unit: "hour" });
      default:
        return W(i.length, e);
    }
  }
  validate(e, i) {
    return i >= 1 && i <= 24;
  }
  set(e, i, s) {
    const r = s <= 24 ? s % 24 : s;
    return e.setHours(r, 0, 0, 0), e;
  }
}
class Af extends $ {
  constructor() {
    super(...arguments);
    x(this, "priority", 60);
    x(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(e, i, s) {
    switch (i) {
      case "m":
        return H(Y.minute, e);
      case "mo":
        return s.ordinalNumber(e, { unit: "minute" });
      default:
        return W(i.length, e);
    }
  }
  validate(e, i) {
    return i >= 0 && i <= 59;
  }
  set(e, i, s) {
    return e.setMinutes(s, 0, 0), e;
  }
}
class Ef extends $ {
  constructor() {
    super(...arguments);
    x(this, "priority", 50);
    x(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(e, i, s) {
    switch (i) {
      case "s":
        return H(Y.second, e);
      case "so":
        return s.ordinalNumber(e, { unit: "second" });
      default:
        return W(i.length, e);
    }
  }
  validate(e, i) {
    return i >= 0 && i <= 59;
  }
  set(e, i, s) {
    return e.setSeconds(s, 0), e;
  }
}
class $f extends $ {
  constructor() {
    super(...arguments);
    x(this, "priority", 30);
    x(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(e, i) {
    const s = (r) => Math.trunc(r * Math.pow(10, -i.length + 3));
    return j(W(i.length, e), s);
  }
  set(e, i, s) {
    return e.setMilliseconds(s), e;
  }
}
class If extends $ {
  constructor() {
    super(...arguments);
    x(this, "priority", 10);
    x(this, "incompatibleTokens", ["t", "T", "x"]);
  }
  parse(e, i) {
    switch (i) {
      case "X":
        return mt(
          gt.basicOptionalMinutes,
          e
        );
      case "XX":
        return mt(gt.basic, e);
      case "XXXX":
        return mt(
          gt.basicOptionalSeconds,
          e
        );
      case "XXXXX":
        return mt(
          gt.extendedOptionalSeconds,
          e
        );
      case "XXX":
      default:
        return mt(gt.extended, e);
    }
  }
  set(e, i, s) {
    return i.timestampIsSet ? e : N(
      e,
      e.getTime() - Cn(e) - s
    );
  }
}
class Lf extends $ {
  constructor() {
    super(...arguments);
    x(this, "priority", 10);
    x(this, "incompatibleTokens", ["t", "T", "X"]);
  }
  parse(e, i) {
    switch (i) {
      case "x":
        return mt(
          gt.basicOptionalMinutes,
          e
        );
      case "xx":
        return mt(gt.basic, e);
      case "xxxx":
        return mt(
          gt.basicOptionalSeconds,
          e
        );
      case "xxxxx":
        return mt(
          gt.extendedOptionalSeconds,
          e
        );
      case "xxx":
      default:
        return mt(gt.extended, e);
    }
  }
  set(e, i, s) {
    return i.timestampIsSet ? e : N(
      e,
      e.getTime() - Cn(e) - s
    );
  }
}
class Ff extends $ {
  constructor() {
    super(...arguments);
    x(this, "priority", 40);
    x(this, "incompatibleTokens", "*");
  }
  parse(e) {
    return zo(e);
  }
  set(e, i, s) {
    return [N(e, s * 1e3), { timestampIsSet: !0 }];
  }
}
class Rf extends $ {
  constructor() {
    super(...arguments);
    x(this, "priority", 20);
    x(this, "incompatibleTokens", "*");
  }
  parse(e) {
    return zo(e);
  }
  set(e, i, s) {
    return [N(e, s), { timestampIsSet: !0 }];
  }
}
const zf = {
  G: new ef(),
  y: new nf(),
  Y: new sf(),
  R: new rf(),
  u: new of(),
  Q: new af(),
  q: new cf(),
  M: new lf(),
  L: new hf(),
  w: new df(),
  I: new gf(),
  d: new bf(),
  D: new yf(),
  E: new _f(),
  e: new xf(),
  c: new wf(),
  i: new Mf(),
  a: new kf(),
  b: new Df(),
  B: new Pf(),
  h: new Sf(),
  H: new Of(),
  K: new Tf(),
  k: new Cf(),
  m: new Af(),
  s: new Ef(),
  S: new $f(),
  X: new If(),
  x: new Lf(),
  t: new Ff(),
  T: new Rf()
}, Hf = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Nf = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Wf = /^'([^]*?)'?$/, Bf = /''/g, Yf = /\S/, jf = /[a-zA-Z]/;
function Vf(n, t, e, i) {
  var p, b, y, v, M, _, D, k;
  const s = () => N((i == null ? void 0 : i.in) || e, NaN), r = Xd(), o = (i == null ? void 0 : i.locale) ?? r.locale ?? Ao, a = (i == null ? void 0 : i.firstWeekContainsDate) ?? ((b = (p = i == null ? void 0 : i.locale) == null ? void 0 : p.options) == null ? void 0 : b.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((v = (y = r.locale) == null ? void 0 : y.options) == null ? void 0 : v.firstWeekContainsDate) ?? 1, c = (i == null ? void 0 : i.weekStartsOn) ?? ((_ = (M = i == null ? void 0 : i.locale) == null ? void 0 : M.options) == null ? void 0 : _.weekStartsOn) ?? r.weekStartsOn ?? ((k = (D = r.locale) == null ? void 0 : D.options) == null ? void 0 : k.weekStartsOn) ?? 0;
  if (!t)
    return n ? s() : T(e, i == null ? void 0 : i.in);
  const l = {
    firstWeekContainsDate: a,
    weekStartsOn: c,
    locale: o
  }, h = [new tf(i == null ? void 0 : i.in, e)], u = t.match(Nf).map((w) => {
    const P = w[0];
    if (P in _i) {
      const O = _i[P];
      return O(w, o.formatLong);
    }
    return w;
  }).join("").match(Hf), d = [];
  for (let w of u) {
    !(i != null && i.useAdditionalWeekYearTokens) && Fo(w) && xi(w, t, n), !(i != null && i.useAdditionalDayOfYearTokens) && Lo(w) && xi(w, t, n);
    const P = w[0], O = zf[P];
    if (O) {
      const { incompatibleTokens: S } = O;
      if (Array.isArray(S)) {
        const V = d.find(
          (G) => S.includes(G.token) || G.token === P
        );
        if (V)
          throw new RangeError(
            `The format string mustn't contain \`${V.fullToken}\` and \`${w}\` at the same time`
          );
      } else if (O.incompatibleTokens === "*" && d.length > 0)
        throw new RangeError(
          `The format string mustn't contain \`${w}\` and any other token at the same time`
        );
      d.push({ token: P, fullToken: w });
      const C = O.run(
        n,
        w,
        o.match,
        l
      );
      if (!C)
        return s();
      h.push(C.setter), n = C.rest;
    } else {
      if (P.match(jf))
        throw new RangeError(
          "Format string contains an unescaped latin alphabet character `" + P + "`"
        );
      if (w === "''" ? w = "'" : P === "'" && (w = Uf(w)), n.indexOf(w) === 0)
        n = n.slice(w.length);
      else
        return s();
    }
  }
  if (n.length > 0 && Yf.test(n))
    return s();
  const f = h.map((w) => w.priority).sort((w, P) => P - w).filter((w, P, O) => O.indexOf(w) === P).map(
    (w) => h.filter((P) => P.priority === w).sort((P, O) => O.subPriority - P.subPriority)
  ).map((w) => w[0]);
  let g = T(e, i == null ? void 0 : i.in);
  if (isNaN(+g)) return s();
  const m = {};
  for (const w of f) {
    if (!w.validate(g, l))
      return s();
    const P = w.set(g, m, l);
    Array.isArray(P) ? (g = P[0], Object.assign(m, P[1])) : g = P;
  }
  return g;
}
function Uf(n) {
  return n.match(Wf)[1].replace(Bf, "'");
}
function qf(n, t) {
  const e = T(n, t == null ? void 0 : t.in);
  return e.setMinutes(0, 0, 0), e;
}
function Xf(n, t) {
  const e = T(n, t == null ? void 0 : t.in);
  return e.setSeconds(0, 0), e;
}
function Qf(n, t) {
  const e = T(n, t == null ? void 0 : t.in);
  return e.setMilliseconds(0), e;
}
function Gf(n, t) {
  const e = () => N(t == null ? void 0 : t.in, NaN), i = (t == null ? void 0 : t.additionalDigits) ?? 2, s = tg(n);
  let r;
  if (s.date) {
    const l = eg(s.date, i);
    r = ng(l.restDateString, l.year);
  }
  if (!r || isNaN(+r)) return e();
  const o = +r;
  let a = 0, c;
  if (s.time && (a = ig(s.time), isNaN(a)))
    return e();
  if (s.timezone) {
    if (c = sg(s.timezone), isNaN(c)) return e();
  } else {
    const l = new Date(o + a), h = T(0, t == null ? void 0 : t.in);
    return h.setFullYear(
      l.getUTCFullYear(),
      l.getUTCMonth(),
      l.getUTCDate()
    ), h.setHours(
      l.getUTCHours(),
      l.getUTCMinutes(),
      l.getUTCSeconds(),
      l.getUTCMilliseconds()
    ), h;
  }
  return T(o + a + c, t == null ? void 0 : t.in);
}
const fn = {
  dateTimeDelimiter: /[T ]/,
  timeZoneDelimiter: /[Z ]/i,
  timezone: /([Z+-].*)$/
}, Kf = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/, Zf = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/, Jf = /^([+-])(\d{2})(?::?(\d{2}))?$/;
function tg(n) {
  const t = {}, e = n.split(fn.dateTimeDelimiter);
  let i;
  if (e.length > 2)
    return t;
  if (/:/.test(e[0]) ? i = e[0] : (t.date = e[0], i = e[1], fn.timeZoneDelimiter.test(t.date) && (t.date = n.split(fn.timeZoneDelimiter)[0], i = n.substr(
    t.date.length,
    n.length
  ))), i) {
    const s = fn.timezone.exec(i);
    s ? (t.time = i.replace(s[1], ""), t.timezone = s[1]) : t.time = i;
  }
  return t;
}
function eg(n, t) {
  const e = new RegExp(
    "^(?:(\\d{4}|[+-]\\d{" + (4 + t) + "})|(\\d{2}|[+-]\\d{" + (2 + t) + "})$)"
  ), i = n.match(e);
  if (!i) return { year: NaN, restDateString: "" };
  const s = i[1] ? parseInt(i[1]) : null, r = i[2] ? parseInt(i[2]) : null;
  return {
    year: r === null ? s : r * 100,
    restDateString: n.slice((i[1] || i[2]).length)
  };
}
function ng(n, t) {
  if (t === null) return /* @__PURE__ */ new Date(NaN);
  const e = n.match(Kf);
  if (!e) return /* @__PURE__ */ new Date(NaN);
  const i = !!e[4], s = Me(e[1]), r = Me(e[2]) - 1, o = Me(e[3]), a = Me(e[4]), c = Me(e[5]) - 1;
  if (i)
    return lg(t, a, c) ? rg(t, a, c) : /* @__PURE__ */ new Date(NaN);
  {
    const l = /* @__PURE__ */ new Date(0);
    return !ag(t, r, o) || !cg(t, s) ? /* @__PURE__ */ new Date(NaN) : (l.setUTCFullYear(t, r, Math.max(s, o)), l);
  }
}
function Me(n) {
  return n ? parseInt(n) : 1;
}
function ig(n) {
  const t = n.match(Zf);
  if (!t) return NaN;
  const e = ii(t[1]), i = ii(t[2]), s = ii(t[3]);
  return hg(e, i, s) ? e * Ke + i * Ge + s * 1e3 : NaN;
}
function ii(n) {
  return n && parseFloat(n.replace(",", ".")) || 0;
}
function sg(n) {
  if (n === "Z") return 0;
  const t = n.match(Jf);
  if (!t) return 0;
  const e = t[1] === "+" ? -1 : 1, i = parseInt(t[2]), s = t[3] && parseInt(t[3]) || 0;
  return ug(i, s) ? e * (i * Ke + s * Ge) : NaN;
}
function rg(n, t, e) {
  const i = /* @__PURE__ */ new Date(0);
  i.setUTCFullYear(n, 0, 4);
  const s = i.getUTCDay() || 7, r = (t - 1) * 7 + e + 1 - s;
  return i.setUTCDate(i.getUTCDate() + r), i;
}
const og = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function Wo(n) {
  return n % 400 === 0 || n % 4 === 0 && n % 100 !== 0;
}
function ag(n, t, e) {
  return t >= 0 && t <= 11 && e >= 1 && e <= (og[t] || (Wo(n) ? 29 : 28));
}
function cg(n, t) {
  return t >= 1 && t <= (Wo(n) ? 366 : 365);
}
function lg(n, t, e) {
  return t >= 1 && t <= 53 && e >= 0 && e <= 6;
}
function hg(n, t, e) {
  return n === 24 ? t === 0 && e === 0 : e >= 0 && e < 60 && t >= 0 && t < 60 && n >= 0 && n < 25;
}
function ug(n, t) {
  return t >= 0 && t <= 59;
}
/*!
 * chartjs-adapter-date-fns v3.0.0
 * https://www.chartjs.org
 * (c) 2022 chartjs-adapter-date-fns Contributors
 * Released under the MIT license
 */
const dg = {
  datetime: "MMM d, yyyy, h:mm:ss aaaa",
  millisecond: "h:mm:ss.SSS aaaa",
  second: "h:mm:ss aaaa",
  minute: "h:mm aaaa",
  hour: "ha",
  day: "MMM d",
  week: "PP",
  month: "MMM yyyy",
  quarter: "qqq - yyyy",
  year: "yyyy"
};
ro._date.override({
  _id: "date-fns",
  // DEBUG
  formats: function() {
    return dg;
  },
  parse: function(n, t) {
    if (n === null || typeof n > "u")
      return null;
    const e = typeof n;
    return e === "number" || n instanceof Date ? n = T(n) : e === "string" && (typeof t == "string" ? n = Vf(n, t, /* @__PURE__ */ new Date(), this.options) : n = Gf(n, this.options)), Do(n) ? n.getTime() : null;
  },
  format: function(n, t) {
    return Ud(n, t, this.options);
  },
  add: function(n, t, e) {
    switch (e) {
      case "millisecond":
        return zi(n, t);
      case "second":
        return Lu(n, t);
      case "minute":
        return $u(n, t);
      case "hour":
        return Cu(n, t);
      case "day":
        return Nn(n, t);
      case "week":
        return Fu(n, t);
      case "month":
        return Ri(n, t);
      case "quarter":
        return Iu(n, t);
      case "year":
        return Ru(n, t);
      default:
        return n;
    }
  },
  diff: function(n, t, e) {
    switch (e) {
      case "millisecond":
        return Hi(n, t);
      case "second":
        return Vu(n, t);
      case "minute":
        return Bu(n, t);
      case "hour":
        return Wu(n, t);
      case "day":
        return Po(n, t);
      case "week":
        return Uu(n, t);
      case "month":
        return To(n, t);
      case "quarter":
        return ju(n, t);
      case "year":
        return qu(n, t);
      default:
        return 0;
    }
  },
  startOf: function(n, t, e) {
    switch (t) {
      case "second":
        return Qf(n);
      case "minute":
        return Xf(n);
      case "hour":
        return qf(n);
      case "day":
        return yi(n);
      case "week":
        return pt(n);
      case "isoWeek":
        return pt(n, { weekStartsOn: +e });
      case "month":
        return Qu(n);
      case "quarter":
        return Xu(n);
      case "year":
        return Co(n);
      default:
        return n;
    }
  },
  endOf: function(n, t) {
    switch (t) {
      case "second":
        return ed(n);
      case "minute":
        return Ju(n);
      case "hour":
        return Ku(n);
      case "day":
        return So(n);
      case "week":
        return Zu(n);
      case "month":
        return Oo(n);
      case "quarter":
        return td(n);
      case "year":
        return Gu(n);
      default:
        return n;
    }
  }
});
wt.register(
  bn,
  Ot,
  xn,
  bi,
  Ue,
  vu,
  gu,
  cu
);
class fg {
  constructor(t) {
    this._todaySlotIndex = -1, this._primaryColorResolved = "#03a9f4", this.canvas = t;
  }
  getThemeColors() {
    const t = this.canvas.closest(".ehc-card") ?? this.canvas.closest("ha-card") ?? this.canvas, e = getComputedStyle(t), i = e.getPropertyValue("--accent-color").trim() || e.getPropertyValue("--primary-color").trim() || "#03a9f4", s = e.getPropertyValue("--secondary-text-color").trim() || "#727272", r = e.getPropertyValue("--divider-color").trim() || "rgba(127, 127, 127, 0.3)";
    return {
      currentLine: i,
      referenceLine: s,
      grid: r
    };
  }
  destroy() {
    var t;
    (t = this.chart) == null || t.destroy(), this.chart = void 0;
  }
  // T016: Convert CSS color to RGBA with specific opacity
  colorWithOpacity(t, e) {
    const i = document.createElement("canvas");
    i.width = 1, i.height = 1;
    const s = i.getContext("2d");
    if (!s) return "transparent";
    s.fillStyle = t, s.fillRect(0, 0, 1, 1);
    const r = s.getImageData(0, 0, 1, 1), [o, a, c] = r.data;
    return `rgba(${o}, ${a}, ${c}, ${e})`;
  }
  // Helper to resolve primary color (used in later phases)
  resolveColor(t) {
    if (t.trim()) return t;
    const e = this.canvas.closest(".ehc-card") ?? this.canvas.closest("ha-card") ?? this.canvas, i = getComputedStyle(e), s = i.getPropertyValue("--accent-color").trim();
    if (s) return s;
    const r = i.getPropertyValue("--primary-color").trim();
    return r || "#03a9f4";
  }
  alignSeriesOnTimeline(t, e, i) {
    const s = new Array(e.length).fill(null);
    if (e.length === 0)
      return s;
    const r = e.length > 1 ? e[1] - e[0] : 864e5;
    for (let o = 0; o < e.length; o++) {
      const a = e[o], c = e[o + 1] ?? a + r;
      let l = null;
      if (i === void 0) {
        for (const h of t)
          if (h.timestamp >= a && h.timestamp < c) {
            l = h.value;
            break;
          }
      } else {
        const h = i.getTime() + (a - e[0]);
        for (const u of t)
          if (u.timestamp >= h && u.timestamp < h + r) {
            l = u.value;
            break;
          }
      }
      s[o] = l;
    }
    return s;
  }
  /** @param labels - Pre-localized legend labels from the card (e.g. period.current / period.reference). */
  update(t, e, i, s) {
    const r = this.canvas.getContext("2d");
    if (!r) return;
    const o = this.alignSeriesOnTimeline(
      t.current.points,
      e
    ), a = t.reference ? this.alignSeriesOnTimeline(
      t.reference.points,
      e,
      i.referencePeriodStart != null ? new Date(i.referencePeriodStart) : void 0
    ) : new Array(e.length).fill(null), c = /* @__PURE__ */ new Date();
    c.setHours(0, 0, 0, 0);
    const l = c.getTime();
    this._todaySlotIndex = e.indexOf(l), this._todayCurrentY = this._todaySlotIndex >= 0 ? o[this._todaySlotIndex] ?? void 0 : void 0, this._todayReferenceY = this._todaySlotIndex >= 0 ? a[this._todaySlotIndex] ?? void 0 : void 0;
    const h = o.map((y, v) => ({ x: v, y })), u = a.map((y, v) => ({ x: v, y })), d = JSON.stringify({
      c: h,
      r: u,
      cfg: i
    });
    if (this.lastHash === d && this.chart)
      return;
    this.lastHash = d;
    const f = this.getThemeColors();
    this._primaryColorResolved = this.resolveColor(i.primaryColor);
    const g = this, m = {
      id: "todayMarker",
      afterDraw(y) {
        if (g._todaySlotIndex < 0) return;
        const v = y.scales.x.getPixelForValue(g._todaySlotIndex), M = y.scales.y.getPixelForValue(0), _ = y.ctx;
        let D;
        if (g._todayCurrentY !== void 0 && g._todayReferenceY !== void 0) {
          const w = y.scales.y.getPixelForValue(
            g._todayCurrentY
          ), P = y.scales.y.getPixelForValue(
            g._todayReferenceY
          );
          D = Math.min(w, P);
        } else g._todayCurrentY !== void 0 ? D = y.scales.y.getPixelForValue(g._todayCurrentY) : g._todayReferenceY !== void 0 ? D = y.scales.y.getPixelForValue(g._todayReferenceY) : D = y.chartArea.top;
        _.save(), _.setLineDash([4, 4]), _.strokeStyle = g._primaryColorResolved, _.lineWidth = 1.5, _.beginPath(), _.moveTo(v, M), _.lineTo(v, D), _.stroke(), _.restore();
        const k = 3;
        if (g._todayCurrentY !== void 0) {
          const w = y.scales.y.getPixelForValue(
            g._todayCurrentY
          );
          _.fillStyle = g._primaryColorResolved, _.beginPath(), _.arc(v, w, k, 0, 2 * Math.PI), _.fill();
        }
        if (g._todayReferenceY !== void 0) {
          const w = y.scales.y.getPixelForValue(
            g._todayReferenceY
          );
          _.fillStyle = f.referenceLine, _.beginPath(), _.arc(v, w, k, 0, 2 * Math.PI), _.fill();
        }
      }
    }, p = {
      datasets: [
        {
          label: s.current,
          data: h,
          borderColor: this._primaryColorResolved,
          borderWidth: 1.5,
          backgroundColor: i.fillCurrent ? this.colorWithOpacity(
            this._primaryColorResolved,
            i.fillCurrentOpacity / 100
          ) : "transparent",
          fill: i.fillCurrent ? "origin" : !1,
          pointRadius: 0,
          tension: 0.3,
          spanGaps: !1
        },
        ...t.reference ? [
          {
            label: s.reference,
            data: u,
            borderColor: f.referenceLine,
            borderWidth: 1.5,
            backgroundColor: i.fillReference ? this.colorWithOpacity(
              f.referenceLine,
              i.fillReferenceOpacity / 100
            ) : "transparent",
            fill: i.fillReference ? "origin" : !1,
            pointRadius: 0,
            //borderDash: [4, 2],
            tension: 0.3,
            spanGaps: !1
          }
        ] : [],
        // T020: Forecast dataset
        ...i.showForecast && this._todaySlotIndex >= 0 && this._todayCurrentY !== void 0 && i.forecastTotal !== void 0 ? [
          {
            label: "Forecast",
            data: [
              { x: this._todaySlotIndex, y: this._todayCurrentY },
              { x: e.length - 1, y: i.forecastTotal }
            ],
            borderColor: this._primaryColorResolved,
            borderWidth: 1.5,
            borderDash: [3, 6],
            pointRadius: 0,
            fill: !1,
            spanGaps: !0,
            tension: 0
          }
        ] : [
          {
            label: "Forecast",
            data: []
          }
        ]
      ]
    }, b = {
      responsive: !0,
      maintainAspectRatio: !1,
      animation: !1,
      plugins: {
        todayMarker: {},
        legend: {
          display: !0
        },
        tooltip: {
          mode: "index",
          intersect: !1
        }
      },
      scales: {
        x: {
          type: "linear",
          min: 0,
          max: e.length,
          ticks: {
            precision: 0,
            display: !0
          },
          grid: {
            display: !1,
            color: f.grid
          },
          // T022: X-axis title showing period label
          title: {
            display: i.periodLabel.length > 0,
            text: i.periodLabel,
            align: "end"
          }
        },
        y: {
          beginAtZero: !0,
          // T023: Y-axis grid and ticks configuration
          ticks: {
            count: 5,
            maxTicksLimit: 5,
            callback: (y, v, M) => v === M.length - 1 && i.unit.length > 0 ? `${y} ${i.unit}` : String(y)
          },
          grid: {
            color: f.grid
          }
        }
      }
    };
    this.chart ? (this.chart.data = p, this.chart.options = b, this.chart.update()) : this.chart = new wt(r, {
      type: "line",
      data: p,
      options: b,
      plugins: [m]
    });
  }
}
const gg = {
  "period.current": "Aktueller Zeitraum",
  "period.reference": "Referenzzeitraum",
  "status.loading": "Lade Langzeitstatistiken…",
  "status.error_api": "Langzeitstatistiken konnten nicht geladen werden.",
  "status.error_generic": "Beim Laden der Daten ist ein Fehler aufgetreten.",
  "status.no_data": "Für den gewählten Zeitraum sind keine Daten vorhanden.",
  "summary.current_period": "Aktueller Zeitraum",
  "summary.reference_period": "Referenzzeitraum",
  "summary.difference": "Differenz",
  "summary.difference_percent": "Differenz [%]",
  "summary.incomplete_reference": "Referenzdaten für diesen Tag sind unvollständig…",
  "forecast.current_forecast": "Prognose aktueller Zeitraum",
  "forecast.reference_consumption": "Verbrauch im Referenzzeitraum",
  "forecast.confidence": "Prognose-Konfidenz: {{confidence}}.",
  "text_summary.no_reference": "Es gibt noch nicht genug Referenzdaten, um Ihren Verbrauch zu vergleichen.",
  "text_summary.similar": "Ihr Energieverbrauch entspricht in etwa dem gleichen Zeitraum des Vorjahres.",
  "text_summary.higher": "Ihr Energieverbrauch liegt {{diff}} über dem gleichen Zeitraum des Vorjahres.",
  "text_summary.lower": "Ihr Energieverbrauch liegt {{diff}} unter dem gleichen Zeitraum des Vorjahres.",
  "error.missing_translation": "Fehlender Übersetzungsschlüssel: {{key}}"
}, mg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: gg
}, Symbol.toStringTag, { value: "Module" })), pg = {
  "period.current": "Current period",
  "period.reference": "Reference period",
  "status.loading": "Loading long-term statistics data...",
  "status.error_api": "Failed to fetch long-term statistics data.",
  "status.error_generic": "An error occurred while loading data.",
  "status.no_data": "There is no data to display for the selected period.",
  "summary.current_period": "Current period",
  "summary.reference_period": "Reference period",
  "summary.difference": "Difference",
  "summary.difference_percent": "Difference [%]",
  "summary.incomplete_reference": "Reference data for this day is incomplete…",
  "forecast.current_forecast": "Current period forecast",
  "forecast.reference_consumption": "Consumption in reference period",
  "forecast.confidence": "Forecast confidence level: {{confidence}}.",
  "text_summary.no_reference": "There are not enough reference data points yet to compare your consumption.",
  "text_summary.similar": "Your energy consumption is at a similar level to the same period last year.",
  "text_summary.higher": "Your energy consumption is {{diff}} higher than in the same period last year.",
  "text_summary.lower": "Your energy consumption is {{diff}} lower than in the same period last year.",
  "error.missing_translation": "Missing translation key: {{key}}"
}, bg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: pg
}, Symbol.toStringTag, { value: "Module" })), yg = {
  "period.current": "Bieżący okres",
  "period.reference": "Okres referencyjny",
  "status.loading": "Ładowanie danych statystyk długoterminowych...",
  "status.error_api": "Nie udało się pobrać danych statystyk długoterminowych.",
  "status.error_generic": "Wystąpił błąd podczas wczytywania danych.",
  "status.no_data": "Brak danych do wyświetlenia dla wybranego okresu.",
  "summary.current_period": "Bieżący okres",
  "summary.reference_period": "Okres referencyjny",
  "summary.difference": "Różnica",
  "summary.difference_percent": "Różnica [%]",
  "summary.incomplete_reference": "Dane referencyjne dla tego dnia są niepełne…",
  "forecast.current_forecast": "Prognoza bieżącego okresu",
  "forecast.reference_consumption": "Zużycie w okresie referencyjnym",
  "forecast.confidence": "Poziom pewności prognozy: {{confidence}}.",
  "text_summary.no_reference": "Brak wystarczających danych, aby porównać Twoje zużycie energii.",
  "text_summary.similar": "Twoje zużycie jest na podobnym poziomie jak w tym samym okresie w poprzednim roku.",
  "text_summary.higher": "Twoje zużycie jest o {{diff}} wyższe niż w tym samym okresie w poprzednim roku.",
  "text_summary.lower": "Twoje zużycie jest o {{diff}} niższe niż w tym samym okresie w poprzednim roku.",
  "error.missing_translation": "Brak tłumaczenia dla klucza: {{key}}"
}, _g = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: yg
}, Symbol.toStringTag, { value: "Module" })), si = "error.missing_translation", oe = "en", vr = /* @__PURE__ */ Object.assign({
  "../translations/de.json": mg,
  "../translations/en.json": bg,
  "../translations/pl.json": _g
}), Re = /* @__PURE__ */ Object.create(null);
for (const n of Object.keys(vr)) {
  const t = n.match(/\/([^/]+)\.json$/);
  if (t) {
    const e = t[1], i = vr[n], s = i == null ? void 0 : i.default;
    s && typeof s == "object" && (Re[e] = s);
  }
}
const xg = [
  "comma",
  "decimal",
  "language",
  "system"
];
function wg(n) {
  return typeof n == "string" && xg.includes(n);
}
function vg(n) {
  return Object.prototype.hasOwnProperty.call(Re, n);
}
function Mg(n, t) {
  return t ? n.replace(/\{\{(\w+)\}\}/g, (e, i) => {
    const s = t[i];
    return s === void 0 ? e : String(s);
  }) : n;
}
function gn(n, t) {
  var a, c, l;
  const e = t.language, i = e !== void 0 && e !== "" ? vg(e) ? e : (t.debug && console.warn(
    `[Energy Horizon] Unsupported config.language "${e}", falling back to "${oe}"`
  ), oe) : ((a = n == null ? void 0 : n.locale) == null ? void 0 : a.language) || (n == null ? void 0 : n.language) || oe, s = t.number_format, r = s !== void 0 ? wg(s) ? s : (t.debug && console.warn(
    `[Energy Horizon] Invalid config.number_format "${String(s)}", falling back to "system"`
  ), "system") : ((c = n == null ? void 0 : n.locale) == null ? void 0 : c.number_format) ?? "system", o = ((l = n == null ? void 0 : n.config) == null ? void 0 : l.time_zone) || // fall back to UTC if HA does not provide a time zone
  "UTC";
  return {
    language: i,
    numberFormat: r,
    timeZone: o
  };
}
function kg(n, t) {
  switch (n) {
    case "comma":
      return "de";
    case "decimal":
      return "en";
    case "language":
      return t;
    case "system":
    default:
      return typeof navigator < "u" && navigator.language ? navigator.language : t || oe;
  }
}
function ri(n) {
  const t = Re[n] ?? Re[oe] ?? {}, e = Re[oe] ?? {};
  return (i, s) => {
    let r = t[i];
    return r === void 0 && (r = e[i]), r === void 0 ? i : Mg(r, s);
  };
}
const Dg = Vo`
  :host {
    display: block;
  }

  .loading {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 16px;
  }

  .content {
    padding: 16px;
  }

  .heading {
    margin-bottom: 12px;
    font-weight: 500;
  }

  .summary {
    margin-bottom: 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 0.9rem;
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    gap: 8px;
  }

  .summary-row .label {
    color: var(--secondary-text-color);
  }

  .summary-row .value {
    font-weight: 500;
  }

  .summary-note {
    margin-top: 4px;
    font-size: 0.8rem;
    color: var(--secondary-text-color);
  }

  .forecast {
    margin-bottom: 12px;
    font-size: 0.9rem;
  }

  .chart-container {
    position: relative;
    height: 290px;
  }

  .ebc-title-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
  }

  .ebc-title {
    font-weight: 500;
    color: var(--primary-text-color);
  }

  .ebc-icon {
    display: inline-flex;
    --mdc-icon-size: 24px;
  }
`;
function Mr(n, t, e) {
  return n > 0 ? `+${t.format(n)} ${e}` : n < 0 ? `−${t.format(Math.abs(n))} ${e}` : `${t.format(0)} ${e}`;
}
function kr(n, t, e) {
  return t === "year_over_year" ? String(n.getFullYear()) : t === "month_over_year" ? new Intl.DateTimeFormat(e, { month: "long", year: "numeric" }).format(n) : "";
}
function mn(n) {
  const t = Number(n);
  return !Number.isFinite(t) || t < 0 || t > 100 ? 30 : t;
}
const En = class En extends Te {
  constructor() {
    super(...arguments), this._state = { status: "loading" };
  }
  _localizeOrError(t, e, i) {
    var r;
    const s = t(e, i);
    if (s === e) {
      (r = this._config) != null && r.debug && console.warn(
        `[Energy Horizon] Missing translation key: "${e}" (language: "${gn(
          this.hass,
          this._config
        ).language}")`
      ), this._state = {
        status: "error",
        errorMessage: si
      };
      const o = t(si, { key: e });
      return o === si ? e : o;
    }
    return s;
  }
  setConfig(t) {
    this._config = t, this._state = { status: "loading" };
  }
  getCardSize() {
    return 4;
  }
  updated(t) {
    if ((t.has("hass") || t.has("_config") || t.has("_state")) && (this._state.status === "loading" && this._loadData(), this._state.status === "ready" && this._state.comparisonSeries)) {
      if (!this._chartRenderer) {
        const e = this.renderRoot.querySelector("canvas");
        e && (this._chartRenderer = new fg(e));
      }
      if (this._chartRenderer && this._state.period) {
        const e = gn(this.hass, this._config), i = ri(e.language), s = this._computeFullEnd(this._state.period), r = ua(this._state.period, s), o = this._buildRendererConfig();
        this._chartRenderer.update(this._state.comparisonSeries, r, o, {
          current: this._localizeOrError(i, "period.current"),
          reference: this._localizeOrError(i, "period.reference")
        });
      }
    }
  }
  async _loadData() {
    var c, l, h;
    if (!this._config || !this.hass) return;
    const t = /* @__PURE__ */ new Date(), e = gn(this.hass, this._config), i = ri(e.language), s = da(this._config, t, e.timeZone), r = ts(s, this._config.entity), o = {
      ...s,
      current_start: s.reference_start,
      current_end: s.reference_end
    }, a = ts(o, this._config.entity);
    try {
      this._config.debug && (console.log("[Energy Horizon] API Query (current):", r), console.log("[Energy Horizon] API Query (reference):", a));
      const [u, d] = await Promise.all([
        this.hass.connection.sendMessagePromise(
          r
        ),
        this.hass.connection.sendMessagePromise(
          a
        )
      ]);
      if (this._config.debug) {
        const M = (u == null ? void 0 : u.result) ?? u, _ = M.results ?? M;
        if (console.log("[Energy Horizon] API Response (current, raw):", u), _ && typeof _ == "object") {
          const D = Object.keys(_);
          console.log(
            "[Energy Horizon] Results keys (available statistic_ids):",
            D
          );
          const k = _[this._config.entity];
          console.log(
            `[Energy Horizon] Data for entity "${this._config.entity}":`,
            k ? `${Array.isArray(k) ? k.length : 0} points` : "not found"
          ), console.log(
            "[Energy Horizon] Reference API Response (raw):",
            d
          );
        } else
          console.log(
            "[Energy Horizon] No results in response or invalid structure"
          );
      }
      const f = es(
        u,
        this._config.entity,
        i("period.current")
      );
      if (!f) {
        this._config.debug && console.log(
          "[Energy Horizon] current series could not be built – check entity ID and results structure above"
        ), this._state = { status: "no-data" };
        return;
      }
      const g = es(
        d,
        this._config.entity,
        i("period.reference")
      ), m = ((h = (l = (c = this.hass.states) == null ? void 0 : c[this._config.entity]) == null ? void 0 : l.attributes) == null ? void 0 : h.unit_of_measurement) ?? "", p = {
        current: m ? { ...f, unit: f.unit || m } : f,
        reference: g ? m ? { ...g, unit: g.unit || m } : g : void 0,
        aggregation: s.aggregation,
        time_zone: s.time_zone
      }, b = ma(p), y = pa(p);
      !b.unit && m && (b.unit = m), y && !y.unit && m && (y.unit = m);
      const v = ba(b);
      this._state = {
        status: "ready",
        comparisonSeries: p,
        summary: b,
        forecast: y,
        textSummary: v,
        period: s
      };
    } catch (u) {
      console.error(u), this._state = {
        status: "error",
        errorMessage: "status.error_api"
      };
    }
  }
  _computeFullEnd(t) {
    return this._config.comparison_mode === "year_over_year" ? new Date(t.current_start.getFullYear(), 11, 31) : new Date(t.current_start.getFullYear(), t.current_start.getMonth() + 1, 0);
  }
  _buildRendererConfig() {
    var o, a, c, l, h, u, d;
    if (!this._state.period)
      return {
        primaryColor: this._config.primary_color ?? "",
        fillCurrent: this._config.fill_current ?? !0,
        fillReference: this._config.fill_reference ?? !1,
        fillCurrentOpacity: mn(this._config.fill_current_opacity),
        fillReferenceOpacity: mn(this._config.fill_reference_opacity),
        showForecast: this._config.show_forecast ?? !1,
        forecastTotal: (o = this._state.forecast) == null ? void 0 : o.forecast_total,
        unit: ((a = this._state.forecast) == null ? void 0 : a.unit) ?? "",
        periodLabel: ""
      };
    const t = this._state.period, e = this._config.language ?? ((c = this.hass) == null ? void 0 : c.language) ?? "en";
    let i = "";
    this._config.comparison_mode === "year_over_year" ? i = String(t.current_start.getFullYear()) : i = new Intl.DateTimeFormat(e, { month: "long" }).format(t.current_start);
    const s = (h = (l = this.hass) == null ? void 0 : l.states) == null ? void 0 : h[this._config.entity], r = ((u = s == null ? void 0 : s.attributes) == null ? void 0 : u.unit_of_measurement) ?? "";
    return {
      primaryColor: this._config.primary_color ?? "",
      fillCurrent: this._config.fill_current ?? !0,
      fillReference: this._config.fill_reference ?? !1,
      fillCurrentOpacity: mn(this._config.fill_current_opacity),
      fillReferenceOpacity: mn(this._config.fill_reference_opacity),
      showForecast: this._config.show_forecast ?? !1,
      forecastTotal: (d = this._state.forecast) == null ? void 0 : d.forecast_total,
      unit: r,
      periodLabel: i,
      referencePeriodStart: t.reference_start.getTime()
    };
  }
  render() {
    var C, V, G, z, U, tt, $t, It;
    if (!this._config || !this.hass)
      return Q``;
    const t = gn(this.hass, this._config), e = ri(t.language);
    if (this._state.status === "loading")
      return Q`<ha-card class="ebc-card">
        <div class="loading">
          <ha-circular-progress active size="small"></ha-circular-progress>
          <span>${this._localizeOrError(e, "status.loading")}</span>
        </div>
      </ha-card>`;
    if (this._state.status === "error") {
      const K = this._state.errorMessage ?? "status.error_generic";
      return Q`<ha-card class="ebc-card">
        <ha-alert alert-type="error">
          ${this._localizeOrError(e, K)}
        </ha-alert>
      </ha-card>`;
    }
    if (this._state.status === "no-data")
      return Q`<ha-card class="ebc-card">
        <ha-alert alert-type="info">
          ${this._localizeOrError(e, "status.no_data")}
        </ha-alert>
      </ha-card>`;
    const i = this._state.textSummary, s = this._state.summary, r = this._state.forecast, o = this._config.show_title !== !1, a = (V = (C = this.hass) == null ? void 0 : C.states) == null ? void 0 : V[this._config.entity], c = ((G = this._config.title) == null ? void 0 : G.trim()) || (a == null ? void 0 : a.attributes.friendly_name) || this._config.entity, l = this._config.show_icon !== !1, h = ((z = this._config.icon) == null ? void 0 : z.trim()) || void 0, d = o && !!c || l && (!!h || !!a), f = kg(
      t.numberFormat,
      t.language
    ), g = this._config.precision ?? 1, m = (($t = (tt = (U = this.hass.states) == null ? void 0 : U[this._config.entity]) == null ? void 0 : tt.attributes) == null ? void 0 : $t.unit_of_measurement) ?? "", p = new Intl.NumberFormat(f, {
      minimumFractionDigits: g,
      maximumFractionDigits: g
    }), b = new Intl.NumberFormat(f, {
      maximumFractionDigits: 1
    }), y = (s == null ? void 0 : s.unit) || m;
    let v = this._localizeOrError(e, "summary.current_period"), M = this._localizeOrError(e, "summary.reference_period");
    if (this._state.status === "ready" && this._state.period) {
      const K = this._config.language ?? ((It = this.hass) == null ? void 0 : It.language) ?? "en", te = kr(this._state.period.current_start, this._config.comparison_mode, K), vt = kr(this._state.period.reference_start, this._config.comparison_mode, K);
      v = `${v} (${te})`, M = `${M} (${vt})`;
    }
    const _ = s != null ? `${p.format(s.current_cumulative)} ${y}` : "", D = s != null && s.reference_cumulative != null ? `${p.format(s.reference_cumulative)} ${y}` : null, k = s != null && s.difference != null ? Mr(s.difference, p, y) : null, w = s != null && s.differencePercent != null ? Mr(s.differencePercent, b, "%") : null, P = r != null && r.enabled && this._config.show_forecast !== !1, O = (r == null ? void 0 : r.unit) || y;
    let S = null;
    if (i) {
      const K = i.diffValue != null ? `${p.format(i.diffValue)} ${y}` : void 0;
      switch (i.trend) {
        case "higher":
          S = this._localizeOrError(
            e,
            "text_summary.higher",
            K ? { diff: K } : void 0
          );
          break;
        case "lower":
          S = this._localizeOrError(
            e,
            "text_summary.lower",
            K ? { diff: K } : void 0
          );
          break;
        case "similar":
          S = this._localizeOrError(e, "text_summary.similar");
          break;
        case "unknown":
        default:
          S = this._localizeOrError(e, "text_summary.no_reference");
          break;
      }
    }
    return Q`<ha-card class="ebc-card">
      <div class="content ebc-content">
        ${d ? Q`<div class="ebc-title-row">
              ${l ? h ? Q`<ha-icon class="ebc-icon" .icon=${h}></ha-icon>` : a ? Q`<ha-state-icon
                        class="ebc-icon"
                        .hass=${this.hass}
                        .stateObj=${a}
                      ></ha-state-icon>` : null : null}
              ${o && c ? Q`<span class="ebc-title">${c}</span>` : null}
            </div>` : null}

        ${S ? Q`<div class="heading ebc-header">${S}</div>` : null}

        ${s ? Q`<div class="summary ebc-stats">
              <div class="summary-row">
                <span class="label">${v}</span>
                <span class="value">${_}</span>
              </div>

              ${D ? Q`<div class="summary-row">
                    <span class="label">${M}</span>
                    <span class="value">${D}</span>
                  </div>` : null}

              ${k ? Q`<div class="summary-row">
                    <span class="label"
                      >${this._localizeOrError(e, "summary.difference")}</span
                    >
                    <span class="value">${k}</span>
                  </div>` : null}

              ${w ? Q`<div class="summary-row">
                    <span class="label"
                      >${this._localizeOrError(
      e,
      "summary.difference_percent"
    )}</span
                    >
                    <span class="value">${w}</span>
                  </div>` : null}

              ${s.reference_cumulative == null ? Q`<div class="summary-note">
                    ${this._localizeOrError(
      e,
      "summary.incomplete_reference"
    )}
                  </div>` : null}
            </div>` : null}

        ${P && r ? Q`<div class="forecast ebc-forecast">
              <div class="summary-row">
                <span class="label"
                  >${this._localizeOrError(
      e,
      "forecast.current_forecast"
    )}</span
                >
                <span class="value"
                  >${p.format(
      r.forecast_total ?? 0
    )} ${O}</span
                >
              </div>
              ${r.reference_total != null ? Q`<div class="summary-row">
                    <span class="label"
                      >${this._localizeOrError(
      e,
      "forecast.reference_consumption"
    )}</span
                    >
                    <span class="value"
                      >${p.format(
      r.reference_total
    )} ${O}</span
                    >
                  </div>` : null}
              <div class="summary-note">
                ${this._localizeOrError(e, "forecast.confidence", {
      confidence: r.confidence
    })}
              </div>
            </div>` : null}

        <div class="chart-container ebc-chart">
          <canvas></canvas>
        </div>
      </div>
    </ha-card>`;
  }
};
En.properties = {
  hass: { type: Object, attribute: !1 },
  _config: { state: !0 },
  _state: { state: !0 }
}, En.styles = Dg;
let wi = En;
customElements.define("energy-horizon-card", wi);
//# sourceMappingURL=energy-horizon-card.js.map
