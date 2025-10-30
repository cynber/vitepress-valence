// ../node_modules/.pnpm/@cynber+vitepress-valence@0.2.1_@iconify+vue@4.3.0_vue@3.5.22_typescript@5.9.3___vitepr_effeda05cd48e81820436cd244bd19da/node_modules/@cynber/vitepress-valence/dist/photoswipe-lightbox.esm-CkBE8VXX.js
function o(n, t, i) {
  const e = document.createElement(t);
  return n && (e.className = n), i && i.appendChild(e), e;
}
function y(n, t, i) {
  let e = `translate3d(${n}px,0px,0)`;
  return i !== void 0 && (e += ` scale3d(${i},${i},1)`), e;
}
function f(n, t, i) {
  n.style.width = typeof t == "number" ? `${t}px` : t, n.style.height = typeof i == "number" ? `${i}px` : i;
}
var h = {
  IDLE: "idle",
  LOADING: "loading",
  LOADED: "loaded",
  ERROR: "error"
};
function v(n) {
  return "button" in n && n.button === 1 || n.ctrlKey || n.metaKey || n.altKey || n.shiftKey;
}
function d(n, t, i = document) {
  let e = [];
  if (n instanceof Element)
    e = [n];
  else if (n instanceof NodeList || Array.isArray(n))
    e = Array.from(n);
  else {
    const s = typeof n == "string" ? n : t;
    s && (e = Array.from(i.querySelectorAll(s)));
  }
  return e;
}
function _(n) {
  return typeof n == "function" && n.prototype && n.prototype.goTo;
}
function u() {
  return !!(navigator.vendor && navigator.vendor.match(/apple/i));
}
var w = class {
  /**
   * @param {T} type
   * @param {PhotoSwipeEventsMap[T]} [details]
   */
  constructor(t, i) {
    this.type = t, this.defaultPrevented = false, i && Object.assign(this, i);
  }
  preventDefault() {
    this.defaultPrevented = true;
  }
};
var E = class {
  constructor() {
    this._listeners = {}, this._filters = {}, this.pswp = void 0, this.options = void 0;
  }
  /**
   * @template {keyof PhotoSwipeFiltersMap} T
   * @param {T} name
   * @param {PhotoSwipeFiltersMap[T]} fn
   * @param {number} priority
   */
  addFilter(t, i, e = 100) {
    var s, l, r;
    this._filters[t] || (this._filters[t] = []), (s = this._filters[t]) === null || s === void 0 || s.push({
      fn: i,
      priority: e
    }), (l = this._filters[t]) === null || l === void 0 || l.sort((a, c) => a.priority - c.priority), (r = this.pswp) === null || r === void 0 || r.addFilter(t, i, e);
  }
  /**
   * @template {keyof PhotoSwipeFiltersMap} T
   * @param {T} name
   * @param {PhotoSwipeFiltersMap[T]} fn
   */
  removeFilter(t, i) {
    this._filters[t] && (this._filters[t] = this._filters[t].filter((e) => e.fn !== i)), this.pswp && this.pswp.removeFilter(t, i);
  }
  /**
   * @template {keyof PhotoSwipeFiltersMap} T
   * @param {T} name
   * @param {Parameters<PhotoSwipeFiltersMap[T]>} args
   * @returns {Parameters<PhotoSwipeFiltersMap[T]>[0]}
   */
  applyFilters(t, ...i) {
    var e;
    return (e = this._filters[t]) === null || e === void 0 || e.forEach((s) => {
      i[0] = s.fn.apply(this, i);
    }), i[0];
  }
  /**
   * @template {keyof PhotoSwipeEventsMap} T
   * @param {T} name
   * @param {EventCallback<T>} fn
   */
  on(t, i) {
    var e, s;
    this._listeners[t] || (this._listeners[t] = []), (e = this._listeners[t]) === null || e === void 0 || e.push(i), (s = this.pswp) === null || s === void 0 || s.on(t, i);
  }
  /**
   * @template {keyof PhotoSwipeEventsMap} T
   * @param {T} name
   * @param {EventCallback<T>} fn
   */
  off(t, i) {
    var e;
    this._listeners[t] && (this._listeners[t] = this._listeners[t].filter((s) => i !== s)), (e = this.pswp) === null || e === void 0 || e.off(t, i);
  }
  /**
   * @template {keyof PhotoSwipeEventsMap} T
   * @param {T} name
   * @param {PhotoSwipeEventsMap[T]} [details]
   * @returns {AugmentedEvent<T>}
   */
  dispatch(t, i) {
    var e;
    if (this.pswp)
      return this.pswp.dispatch(t, i);
    const s = (
      /** @type {AugmentedEvent<T>} */
      new w(t, i)
    );
    return (e = this._listeners[t]) === null || e === void 0 || e.forEach((l) => {
      l.call(this, s);
    }), s;
  }
};
var S = class {
  /**
   * @param {string | false} imageSrc
   * @param {HTMLElement} container
   */
  constructor(t, i) {
    if (this.element = o("pswp__img pswp__img--placeholder", t ? "img" : "div", i), t) {
      const e = (
        /** @type {HTMLImageElement} */
        this.element
      );
      e.decoding = "async", e.alt = "", e.src = t, e.setAttribute("role", "presentation");
    }
    this.element.setAttribute("aria-hidden", "true");
  }
  /**
   * @param {number} width
   * @param {number} height
   */
  setDisplayedSize(t, i) {
    this.element && (this.element.tagName === "IMG" ? (f(this.element, 250, "auto"), this.element.style.transformOrigin = "0 0", this.element.style.transform = y(0, 0, t / 250)) : f(this.element, t, i));
  }
  destroy() {
    var t;
    (t = this.element) !== null && t !== void 0 && t.parentNode && this.element.remove(), this.element = null;
  }
};
var I = class {
  /**
   * @param {SlideData} itemData Slide data
   * @param {PhotoSwipeBase} instance PhotoSwipe or PhotoSwipeLightbox instance
   * @param {number} index
   */
  constructor(t, i, e) {
    this.instance = i, this.data = t, this.index = e, this.element = void 0, this.placeholder = void 0, this.slide = void 0, this.displayedImageWidth = 0, this.displayedImageHeight = 0, this.width = Number(this.data.w) || Number(this.data.width) || 0, this.height = Number(this.data.h) || Number(this.data.height) || 0, this.isAttached = false, this.hasSlide = false, this.isDecoding = false, this.state = h.IDLE, this.data.type ? this.type = this.data.type : this.data.src ? this.type = "image" : this.type = "html", this.instance.dispatch("contentInit", {
      content: this
    });
  }
  removePlaceholder() {
    this.placeholder && !this.keepPlaceholder() && setTimeout(() => {
      this.placeholder && (this.placeholder.destroy(), this.placeholder = void 0);
    }, 1e3);
  }
  /**
   * Preload content
   *
   * @param {boolean} isLazy
   * @param {boolean} [reload]
   */
  load(t, i) {
    if (this.slide && this.usePlaceholder())
      if (this.placeholder) {
        const e = this.placeholder.element;
        e && !e.parentElement && this.slide.container.prepend(e);
      } else {
        const e = this.instance.applyFilters(
          "placeholderSrc",
          // use  image-based placeholder only for the first slide,
          // as rendering (even small stretched thumbnail) is an expensive operation
          this.data.msrc && this.slide.isFirstSlide ? this.data.msrc : false,
          this
        );
        this.placeholder = new S(e, this.slide.container);
      }
    this.element && !i || this.instance.dispatch("contentLoad", {
      content: this,
      isLazy: t
    }).defaultPrevented || (this.isImageContent() ? (this.element = o("pswp__img", "img"), this.displayedImageWidth && this.loadImage(t)) : (this.element = o("pswp__content", "div"), this.element.innerHTML = this.data.html || ""), i && this.slide && this.slide.updateContentSize(true));
  }
  /**
   * Preload image
   *
   * @param {boolean} isLazy
   */
  loadImage(t) {
    var i, e;
    if (!this.isImageContent() || !this.element || this.instance.dispatch("contentLoadImage", {
      content: this,
      isLazy: t
    }).defaultPrevented)
      return;
    const s = (
      /** @type HTMLImageElement */
      this.element
    );
    this.updateSrcsetSizes(), this.data.srcset && (s.srcset = this.data.srcset), s.src = (i = this.data.src) !== null && i !== void 0 ? i : "", s.alt = (e = this.data.alt) !== null && e !== void 0 ? e : "", this.state = h.LOADING, s.complete ? this.onLoaded() : (s.onload = () => {
      this.onLoaded();
    }, s.onerror = () => {
      this.onError();
    });
  }
  /**
   * Assign slide to content
   *
   * @param {Slide} slide
   */
  setSlide(t) {
    this.slide = t, this.hasSlide = true, this.instance = t.pswp;
  }
  /**
   * Content load success handler
   */
  onLoaded() {
    this.state = h.LOADED, this.slide && this.element && (this.instance.dispatch("loadComplete", {
      slide: this.slide,
      content: this
    }), this.slide.isActive && this.slide.heavyAppended && !this.element.parentNode && (this.append(), this.slide.updateContentSize(true)), (this.state === h.LOADED || this.state === h.ERROR) && this.removePlaceholder());
  }
  /**
   * Content load error handler
   */
  onError() {
    this.state = h.ERROR, this.slide && (this.displayError(), this.instance.dispatch("loadComplete", {
      slide: this.slide,
      isError: true,
      content: this
    }), this.instance.dispatch("loadError", {
      slide: this.slide,
      content: this
    }));
  }
  /**
   * @returns {Boolean} If the content is currently loading
   */
  isLoading() {
    return this.instance.applyFilters("isContentLoading", this.state === h.LOADING, this);
  }
  /**
   * @returns {Boolean} If the content is in error state
   */
  isError() {
    return this.state === h.ERROR;
  }
  /**
   * @returns {boolean} If the content is image
   */
  isImageContent() {
    return this.type === "image";
  }
  /**
   * Update content size
   *
   * @param {Number} width
   * @param {Number} height
   */
  setDisplayedSize(t, i) {
    if (this.element && (this.placeholder && this.placeholder.setDisplayedSize(t, i), !this.instance.dispatch("contentResize", {
      content: this,
      width: t,
      height: i
    }).defaultPrevented && (f(this.element, t, i), this.isImageContent() && !this.isError()))) {
      const e = !this.displayedImageWidth && t;
      this.displayedImageWidth = t, this.displayedImageHeight = i, e ? this.loadImage(false) : this.updateSrcsetSizes(), this.slide && this.instance.dispatch("imageSizeChange", {
        slide: this.slide,
        width: t,
        height: i,
        content: this
      });
    }
  }
  /**
   * @returns {boolean} If the content can be zoomed
   */
  isZoomable() {
    return this.instance.applyFilters("isContentZoomable", this.isImageContent() && this.state !== h.ERROR, this);
  }
  /**
   * Update image srcset sizes attribute based on width and height
   */
  updateSrcsetSizes() {
    if (!this.isImageContent() || !this.element || !this.data.srcset)
      return;
    const t = (
      /** @type HTMLImageElement */
      this.element
    ), i = this.instance.applyFilters("srcsetSizesWidth", this.displayedImageWidth, this);
    (!t.dataset.largestUsedSize || i > parseInt(t.dataset.largestUsedSize, 10)) && (t.sizes = i + "px", t.dataset.largestUsedSize = String(i));
  }
  /**
   * @returns {boolean} If content should use a placeholder (from msrc by default)
   */
  usePlaceholder() {
    return this.instance.applyFilters("useContentPlaceholder", this.isImageContent(), this);
  }
  /**
   * Preload content with lazy-loading param
   */
  lazyLoad() {
    this.instance.dispatch("contentLazyLoad", {
      content: this
    }).defaultPrevented || this.load(true);
  }
  /**
   * @returns {boolean} If placeholder should be kept after content is loaded
   */
  keepPlaceholder() {
    return this.instance.applyFilters("isKeepingPlaceholder", this.isLoading(), this);
  }
  /**
   * Destroy the content
   */
  destroy() {
    this.hasSlide = false, this.slide = void 0, !this.instance.dispatch("contentDestroy", {
      content: this
    }).defaultPrevented && (this.remove(), this.placeholder && (this.placeholder.destroy(), this.placeholder = void 0), this.isImageContent() && this.element && (this.element.onload = null, this.element.onerror = null, this.element = void 0));
  }
  /**
   * Display error message
   */
  displayError() {
    if (this.slide) {
      var t, i;
      let e = o("pswp__error-msg", "div");
      e.innerText = (t = (i = this.instance.options) === null || i === void 0 ? void 0 : i.errorMsg) !== null && t !== void 0 ? t : "", e = /** @type {HTMLDivElement} */
      this.instance.applyFilters("contentErrorElement", e, this), this.element = o("pswp__content pswp__error-msg-container", "div"), this.element.appendChild(e), this.slide.container.innerText = "", this.slide.container.appendChild(this.element), this.slide.updateContentSize(true), this.removePlaceholder();
    }
  }
  /**
   * Append the content
   */
  append() {
    if (this.isAttached || !this.element)
      return;
    if (this.isAttached = true, this.state === h.ERROR) {
      this.displayError();
      return;
    }
    if (this.instance.dispatch("contentAppend", {
      content: this
    }).defaultPrevented)
      return;
    const t = "decode" in this.element;
    this.isImageContent() ? t && this.slide && (!this.slide.isActive || u()) ? (this.isDecoding = true, this.element.decode().catch(() => {
    }).finally(() => {
      this.isDecoding = false, this.appendImage();
    })) : this.appendImage() : this.slide && !this.element.parentNode && this.slide.container.appendChild(this.element);
  }
  /**
   * Activate the slide,
   * active slide is generally the current one,
   * meaning the user can see it.
   */
  activate() {
    this.instance.dispatch("contentActivate", {
      content: this
    }).defaultPrevented || !this.slide || (this.isImageContent() && this.isDecoding && !u() ? this.appendImage() : this.isError() && this.load(false, true), this.slide.holderElement && this.slide.holderElement.setAttribute("aria-hidden", "false"));
  }
  /**
   * Deactivate the content
   */
  deactivate() {
    this.instance.dispatch("contentDeactivate", {
      content: this
    }), this.slide && this.slide.holderElement && this.slide.holderElement.setAttribute("aria-hidden", "true");
  }
  /**
   * Remove the content from DOM
   */
  remove() {
    this.isAttached = false, !this.instance.dispatch("contentRemove", {
      content: this
    }).defaultPrevented && (this.element && this.element.parentNode && this.element.remove(), this.placeholder && this.placeholder.element && this.placeholder.element.remove());
  }
  /**
   * Append the image content to slide container
   */
  appendImage() {
    this.isAttached && (this.instance.dispatch("contentAppendImage", {
      content: this
    }).defaultPrevented || (this.slide && this.element && !this.element.parentNode && this.slide.container.appendChild(this.element), (this.state === h.LOADED || this.state === h.ERROR) && this.removePlaceholder()));
  }
};
function C(n, t) {
  if (n.getViewportSizeFn) {
    const i = n.getViewportSizeFn(n, t);
    if (i)
      return i;
  }
  return {
    x: document.documentElement.clientWidth,
    // TODO: height on mobile is very incosistent due to toolbar
    // find a way to improve this
    //
    // document.documentElement.clientHeight - doesn't seem to work well
    y: window.innerHeight
  };
}
function p(n, t, i, e, s) {
  let l = 0;
  if (t.paddingFn)
    l = t.paddingFn(i, e, s)[n];
  else if (t.padding)
    l = t.padding[n];
  else {
    const r = "padding" + n[0].toUpperCase() + n.slice(1);
    t[r] && (l = t[r]);
  }
  return Number(l) || 0;
}
function D(n, t, i, e) {
  return {
    x: t.x - p("left", n, t, i, e) - p("right", n, t, i, e),
    y: t.y - p("top", n, t, i, e) - p("bottom", n, t, i, e)
  };
}
var m = 4e3;
var L = class {
  /**
   * @param {PhotoSwipeOptions} options PhotoSwipe options
   * @param {SlideData} itemData Slide data
   * @param {number} index Slide index
   * @param {PhotoSwipe} [pswp] PhotoSwipe instance, can be undefined if not initialized yet
   */
  constructor(t, i, e, s) {
    this.pswp = s, this.options = t, this.itemData = i, this.index = e, this.panAreaSize = null, this.elementSize = null, this.fit = 1, this.fill = 1, this.vFill = 1, this.initial = 1, this.secondary = 1, this.max = 1, this.min = 1;
  }
  /**
   * Calculate initial, secondary and maximum zoom level for the specified slide.
   *
   * It should be called when either image or viewport size changes.
   *
   * @param {number} maxWidth
   * @param {number} maxHeight
   * @param {Point} panAreaSize
   */
  update(t, i, e) {
    const s = {
      x: t,
      y: i
    };
    this.elementSize = s, this.panAreaSize = e;
    const l = e.x / s.x, r = e.y / s.y;
    this.fit = Math.min(1, l < r ? l : r), this.fill = Math.min(1, l > r ? l : r), this.vFill = Math.min(1, r), this.initial = this._getInitial(), this.secondary = this._getSecondary(), this.max = Math.max(this.initial, this.secondary, this._getMax()), this.min = Math.min(this.fit, this.initial, this.secondary), this.pswp && this.pswp.dispatch("zoomLevelsUpdate", {
      zoomLevels: this,
      slideData: this.itemData
    });
  }
  /**
   * Parses user-defined zoom option.
   *
   * @private
   * @param {'initial' | 'secondary' | 'max'} optionPrefix Zoom level option prefix (initial, secondary, max)
   * @returns { number | undefined }
   */
  _parseZoomLevelOption(t) {
    const i = (
      /** @type {'initialZoomLevel' | 'secondaryZoomLevel' | 'maxZoomLevel'} */
      t + "ZoomLevel"
    ), e = this.options[i];
    if (e)
      return typeof e == "function" ? e(this) : e === "fill" ? this.fill : e === "fit" ? this.fit : Number(e);
  }
  /**
   * Get zoom level to which image will be zoomed after double-tap gesture,
   * or when user clicks on zoom icon,
   * or mouse-click on image itself.
   * If you return 1 image will be zoomed to its original size.
   *
   * @private
   * @return {number}
   */
  _getSecondary() {
    let t = this._parseZoomLevelOption("secondary");
    return t || (t = Math.min(1, this.fit * 3), this.elementSize && t * this.elementSize.x > m && (t = m / this.elementSize.x), t);
  }
  /**
   * Get initial image zoom level.
   *
   * @private
   * @return {number}
   */
  _getInitial() {
    return this._parseZoomLevelOption("initial") || this.fit;
  }
  /**
   * Maximum zoom level when user zooms
   * via zoom/pinch gesture,
   * via cmd/ctrl-wheel or via trackpad.
   *
   * @private
   * @return {number}
   */
  _getMax() {
    return this._parseZoomLevelOption("max") || Math.max(1, this.fit * 4);
  }
};
function g(n, t, i) {
  const e = t.createContentFromData(n, i);
  let s;
  const {
    options: l
  } = t;
  if (l) {
    s = new L(l, n, -1);
    let r;
    t.pswp ? r = t.pswp.viewportSize : r = C(l, t);
    const a = D(l, r, n, i);
    s.update(e.width, e.height, a);
  }
  return e.lazyLoad(), s && e.setDisplayedSize(Math.ceil(e.width * s.initial), Math.ceil(e.height * s.initial)), e;
}
function P(n, t) {
  const i = t.getItemData(n);
  if (!t.dispatch("lazyLoadSlide", {
    index: n,
    itemData: i
  }).defaultPrevented)
    return g(i, t, n);
}
var A = class extends E {
  /**
   * Get total number of slides
   *
   * @returns {number}
   */
  getNumItems() {
    var t;
    let i = 0;
    const e = (t = this.options) === null || t === void 0 ? void 0 : t.dataSource;
    e && "length" in e ? i = e.length : e && "gallery" in e && (e.items || (e.items = this._getGalleryDOMElements(e.gallery)), e.items && (i = e.items.length));
    const s = this.dispatch("numItems", {
      dataSource: e,
      numItems: i
    });
    return this.applyFilters("numItems", s.numItems, e);
  }
  /**
   * @param {SlideData} slideData
   * @param {number} index
   * @returns {Content}
   */
  createContentFromData(t, i) {
    return new I(t, this, i);
  }
  /**
   * Get item data by index.
   *
   * "item data" should contain normalized information that PhotoSwipe needs to generate a slide.
   * For example, it may contain properties like
   * `src`, `srcset`, `w`, `h`, which will be used to generate a slide with image.
   *
   * @param {number} index
   * @returns {SlideData}
   */
  getItemData(t) {
    var i;
    const e = (i = this.options) === null || i === void 0 ? void 0 : i.dataSource;
    let s = {};
    Array.isArray(e) ? s = e[t] : e && "gallery" in e && (e.items || (e.items = this._getGalleryDOMElements(e.gallery)), s = e.items[t]);
    let l = s;
    l instanceof Element && (l = this._domElementToItemData(l));
    const r = this.dispatch("itemData", {
      itemData: l || {},
      index: t
    });
    return this.applyFilters("itemData", r.itemData, t);
  }
  /**
   * Get array of gallery DOM elements,
   * based on childSelector and gallery element.
   *
   * @param {HTMLElement} galleryElement
   * @returns {HTMLElement[]}
   */
  _getGalleryDOMElements(t) {
    var i, e;
    return (i = this.options) !== null && i !== void 0 && i.children || (e = this.options) !== null && e !== void 0 && e.childSelector ? d(this.options.children, this.options.childSelector, t) || [] : [t];
  }
  /**
   * Converts DOM element to item data object.
   *
   * @param {HTMLElement} element DOM element
   * @returns {SlideData}
   */
  _domElementToItemData(t) {
    const i = {
      element: t
    }, e = (
      /** @type {HTMLAnchorElement} */
      t.tagName === "A" ? t : t.querySelector("a")
    );
    if (e) {
      i.src = e.dataset.pswpSrc || e.href, e.dataset.pswpSrcset && (i.srcset = e.dataset.pswpSrcset), i.width = e.dataset.pswpWidth ? parseInt(e.dataset.pswpWidth, 10) : 0, i.height = e.dataset.pswpHeight ? parseInt(e.dataset.pswpHeight, 10) : 0, i.w = i.width, i.h = i.height, e.dataset.pswpType && (i.type = e.dataset.pswpType);
      const l = t.querySelector("img");
      if (l) {
        var s;
        i.msrc = l.currentSrc || l.src, i.alt = (s = l.getAttribute("alt")) !== null && s !== void 0 ? s : "";
      }
      (e.dataset.pswpCropped || e.dataset.cropped) && (i.thumbCropped = true);
    }
    return this.applyFilters("domItemData", i, t, e);
  }
  /**
   * Lazy-load by slide data
   *
   * @param {SlideData} itemData Data about the slide
   * @param {number} index
   * @returns {Content} Image that is being decoded or false.
   */
  lazyLoadData(t, i) {
    return g(t, this, i);
  }
};
var z = class extends A {
  /**
   * @param {PhotoSwipeOptions} [options]
   */
  constructor(t) {
    super(), this.options = t || {}, this._uid = 0, this.shouldOpen = false, this._preloadedContent = void 0, this.onThumbnailsClick = this.onThumbnailsClick.bind(this);
  }
  /**
   * Initialize lightbox, should be called only once.
   * It's not included in the main constructor, so you may bind events before it.
   */
  init() {
    d(this.options.gallery, this.options.gallerySelector).forEach((t) => {
      t.addEventListener("click", this.onThumbnailsClick, false);
    });
  }
  /**
   * @param {MouseEvent} e
   */
  onThumbnailsClick(t) {
    if (v(t) || window.pswp)
      return;
    let i = {
      x: t.clientX,
      y: t.clientY
    };
    !i.x && !i.y && (i = null);
    let e = this.getClickedIndex(t);
    e = this.applyFilters("clickedIndex", e, t, this);
    const s = {
      gallery: (
        /** @type {HTMLElement} */
        t.currentTarget
      )
    };
    e >= 0 && (t.preventDefault(), this.loadAndOpen(e, s, i));
  }
  /**
   * Get index of gallery item that was clicked.
   *
   * @param {MouseEvent} e click event
   * @returns {number}
   */
  getClickedIndex(t) {
    if (this.options.getClickedIndexFn)
      return this.options.getClickedIndexFn.call(this, t);
    const i = (
      /** @type {HTMLElement} */
      t.target
    ), s = d(
      this.options.children,
      this.options.childSelector,
      /** @type {HTMLElement} */
      t.currentTarget
    ).findIndex((l) => l === i || l.contains(i));
    return s !== -1 ? s : this.options.children || this.options.childSelector ? -1 : 0;
  }
  /**
   * Load and open PhotoSwipe
   *
   * @param {number} index
   * @param {DataSource} [dataSource]
   * @param {Point | null} [initialPoint]
   * @returns {boolean}
   */
  loadAndOpen(t, i, e) {
    if (window.pswp || !this.options)
      return false;
    if (!i && this.options.gallery && this.options.children) {
      const s = d(this.options.gallery);
      s[0] && (i = {
        gallery: s[0]
      });
    }
    return this.options.index = t, this.options.initialPointerPos = e, this.shouldOpen = true, this.preload(t, i), true;
  }
  /**
   * Load the main module and the slide content by index
   *
   * @param {number} index
   * @param {DataSource} [dataSource]
   */
  preload(t, i) {
    const {
      options: e
    } = this;
    i && (e.dataSource = i);
    const s = [], l = typeof e.pswpModule;
    if (_(e.pswpModule))
      s.push(Promise.resolve(
        /** @type {Type<PhotoSwipe>} */
        e.pswpModule
      ));
    else {
      if (l === "string")
        throw new Error("pswpModule as string is no longer supported");
      if (l === "function")
        s.push(
          /** @type {() => Promise<Type<PhotoSwipe>>} */
          e.pswpModule()
        );
      else
        throw new Error("pswpModule is not valid");
    }
    typeof e.openPromise == "function" && s.push(e.openPromise()), e.preloadFirstSlide !== false && t >= 0 && (this._preloadedContent = P(t, this));
    const r = ++this._uid;
    Promise.all(s).then((a) => {
      if (this.shouldOpen) {
        const c = a[0];
        this._openPhotoswipe(c, r);
      }
    });
  }
  /**
   * @private
   * @param {Type<PhotoSwipe> | { default: Type<PhotoSwipe> }} module
   * @param {number} uid
   */
  _openPhotoswipe(t, i) {
    if (i !== this._uid && this.shouldOpen || (this.shouldOpen = false, window.pswp))
      return;
    const e = typeof t == "object" ? new t.default(this.options) : new t(this.options);
    this.pswp = e, window.pswp = e, Object.keys(this._listeners).forEach((s) => {
      var l;
      (l = this._listeners[s]) === null || l === void 0 || l.forEach((r) => {
        e.on(
          s,
          /** @type {EventCallback<typeof name>} */
          r
        );
      });
    }), Object.keys(this._filters).forEach((s) => {
      var l;
      (l = this._filters[s]) === null || l === void 0 || l.forEach((r) => {
        e.addFilter(s, r.fn, r.priority);
      });
    }), this._preloadedContent && (e.contentLoader.addToCache(this._preloadedContent), this._preloadedContent = void 0), e.on("destroy", () => {
      this.pswp = void 0, delete window.pswp;
    }), e.init();
  }
  /**
   * Unbinds all events, closes PhotoSwipe if it's open.
   */
  destroy() {
    var t;
    (t = this.pswp) === null || t === void 0 || t.destroy(), this.shouldOpen = false, this._listeners = {}, d(this.options.gallery, this.options.gallerySelector).forEach((i) => {
      i.removeEventListener("click", this.onThumbnailsClick, false);
    });
  }
};
export {
  z as default
};
/*! Bundled license information:

@cynber/vitepress-valence/dist/photoswipe-lightbox.esm-CkBE8VXX.js:
  (*!
    * PhotoSwipe Lightbox 5.4.4 - https://photoswipe.com
    * (c) 2024 Dmytro Semenov
    *)
*/
//# sourceMappingURL=photoswipe-lightbox.esm-CkBE8VXX-HKZYSBRM.js.map
