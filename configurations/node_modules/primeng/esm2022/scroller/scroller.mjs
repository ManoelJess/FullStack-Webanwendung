import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Inject, Input, NgModule, Output, PLATFORM_ID, ViewChild, ViewEncapsulation } from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { SpinnerIcon } from 'primeng/icons/spinner';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * Scroller is a performance-approach to handle huge data efficiently.
 * @group Components
 */
export class Scroller {
    document;
    platformId;
    renderer;
    cd;
    zone;
    /**
     * Unique identifier of the element.
     * @group Props
     */
    get id() {
        return this._id;
    }
    set id(val) {
        this._id = val;
    }
    /**
     * Inline style of the component.
     * @group Props
     */
    get style() {
        return this._style;
    }
    set style(val) {
        this._style = val;
    }
    /**
     * Style class of the element.
     * @group Props
     */
    get styleClass() {
        return this._styleClass;
    }
    set styleClass(val) {
        this._styleClass = val;
    }
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    get tabindex() {
        return this._tabindex;
    }
    set tabindex(val) {
        this._tabindex = val;
    }
    /**
     * An array of objects to display.
     * @group Props
     */
    get items() {
        return this._items;
    }
    set items(val) {
        this._items = val;
    }
    /**
     * The height/width of item according to orientation.
     * @group Props
     */
    get itemSize() {
        return this._itemSize;
    }
    set itemSize(val) {
        this._itemSize = val;
    }
    /**
     * Height of the scroll viewport.
     * @group Props
     */
    get scrollHeight() {
        return this._scrollHeight;
    }
    set scrollHeight(val) {
        this._scrollHeight = val;
    }
    /**
     * Width of the scroll viewport.
     * @group Props
     */
    get scrollWidth() {
        return this._scrollWidth;
    }
    set scrollWidth(val) {
        this._scrollWidth = val;
    }
    /**
     * The orientation of scrollbar.
     * @group Props
     */
    get orientation() {
        return this._orientation;
    }
    set orientation(val) {
        this._orientation = val;
    }
    /**
     * Used to specify how many items to load in each load method in lazy mode.
     * @group Props
     */
    get step() {
        return this._step;
    }
    set step(val) {
        this._step = val;
    }
    /**
     * Delay in scroll before new data is loaded.
     * @group Props
     */
    get delay() {
        return this._delay;
    }
    set delay(val) {
        this._delay = val;
    }
    /**
     * Delay after window's resize finishes.
     * @group Props
     */
    get resizeDelay() {
        return this._resizeDelay;
    }
    set resizeDelay(val) {
        this._resizeDelay = val;
    }
    /**
     * Used to append each loaded item to top without removing any items from the DOM. Using very large data may cause the browser to crash.
     * @group Props
     */
    get appendOnly() {
        return this._appendOnly;
    }
    set appendOnly(val) {
        this._appendOnly = val;
    }
    /**
     * Specifies whether the scroller should be displayed inline or not.
     * @group Props
     */
    get inline() {
        return this._inline;
    }
    set inline(val) {
        this._inline = val;
    }
    /**
     * Defines if data is loaded and interacted with in lazy manner.
     * @group Props
     */
    get lazy() {
        return this._lazy;
    }
    set lazy(val) {
        this._lazy = val;
    }
    /**
     * If disabled, the scroller feature is eliminated and the content is displayed directly.
     * @group Props
     */
    get disabled() {
        return this._disabled;
    }
    set disabled(val) {
        this._disabled = val;
    }
    /**
     * Used to implement a custom loader instead of using the loader feature in the scroller.
     * @group Props
     */
    get loaderDisabled() {
        return this._loaderDisabled;
    }
    set loaderDisabled(val) {
        this._loaderDisabled = val;
    }
    /**
     * Columns to display.
     * @group Props
     */
    get columns() {
        return this._columns;
    }
    set columns(val) {
        this._columns = val;
    }
    /**
     * Used to implement a custom spacer instead of using the spacer feature in the scroller.
     * @group Props
     */
    get showSpacer() {
        return this._showSpacer;
    }
    set showSpacer(val) {
        this._showSpacer = val;
    }
    /**
     * Defines whether to show loader.
     * @group Props
     */
    get showLoader() {
        return this._showLoader;
    }
    set showLoader(val) {
        this._showLoader = val;
    }
    /**
     * Determines how many additional elements to add to the DOM outside of the view. According to the scrolls made up and down, extra items are added in a certain algorithm in the form of multiples of this number. Default value is half the number of items shown in the view.
     * @group Props
     */
    get numToleratedItems() {
        return this._numToleratedItems;
    }
    set numToleratedItems(val) {
        this._numToleratedItems = val;
    }
    /**
     * Defines whether the data is loaded.
     * @group Props
     */
    get loading() {
        return this._loading;
    }
    set loading(val) {
        this._loading = val;
    }
    /**
     * Defines whether to dynamically change the height or width of scrollable container.
     * @group Props
     */
    get autoSize() {
        return this._autoSize;
    }
    set autoSize(val) {
        this._autoSize = val;
    }
    /**
     * Function to optimize the dom operations by delegating to ngForTrackBy, default algoritm checks for object identity.
     * @group Props
     */
    get trackBy() {
        return this._trackBy;
    }
    set trackBy(val) {
        this._trackBy = val;
    }
    /**
     * Defines whether to use the scroller feature. The properties of scroller component can be used like an object in it.
     * @group Props
     */
    get options() {
        return this._options;
    }
    set options(val) {
        this._options = val;
        if (val && typeof val === 'object') {
            //@ts-ignore
            Object.entries(val).forEach(([k, v]) => this[`_${k}`] !== v && (this[`_${k}`] = v));
        }
    }
    /**
     * Callback to invoke in lazy mode to load new data.
     * @param {ScrollerLazyLoadEvent} event - Custom lazy load event.
     * @group Emits
     */
    onLazyLoad = new EventEmitter();
    /**
     * Callback to invoke when scroll position changes.
     * @param {ScrollerScrollEvent} event - Custom scroll event.
     * @group Emits
     */
    onScroll = new EventEmitter();
    /**
     * Callback to invoke when scroll position and item's range in view changes.
     * @param {ScrollerScrollEvent} event - Custom scroll index change event.
     * @group Emits
     */
    onScrollIndexChange = new EventEmitter();
    elementViewChild;
    contentViewChild;
    templates;
    _id;
    _style;
    _styleClass;
    _tabindex = 0;
    _items;
    _itemSize = 0;
    _scrollHeight;
    _scrollWidth;
    _orientation = 'vertical';
    _step = 0;
    _delay = 0;
    _resizeDelay = 10;
    _appendOnly = false;
    _inline = false;
    _lazy = false;
    _disabled = false;
    _loaderDisabled = false;
    _columns;
    _showSpacer = true;
    _showLoader = false;
    _numToleratedItems;
    _loading;
    _autoSize = false;
    _trackBy;
    _options;
    d_loading = false;
    d_numToleratedItems;
    contentEl;
    contentTemplate;
    itemTemplate;
    loaderTemplate;
    loaderIconTemplate;
    first = 0;
    last = 0;
    page = 0;
    isRangeChanged = false;
    numItemsInViewport = 0;
    lastScrollPos = 0;
    lazyLoadState = {};
    loaderArr = [];
    spacerStyle = {};
    contentStyle = {};
    scrollTimeout;
    resizeTimeout;
    initialized = false;
    windowResizeListener;
    defaultWidth;
    defaultHeight;
    defaultContentWidth;
    defaultContentHeight;
    get vertical() {
        return this._orientation === 'vertical';
    }
    get horizontal() {
        return this._orientation === 'horizontal';
    }
    get both() {
        return this._orientation === 'both';
    }
    get loadedItems() {
        if (this._items && !this.d_loading) {
            if (this.both)
                return this._items.slice(this._appendOnly ? 0 : this.first.rows, this.last.rows).map((item) => (this._columns ? item : item.slice(this._appendOnly ? 0 : this.first.cols, this.last.cols)));
            else if (this.horizontal && this._columns)
                return this._items;
            else
                return this._items.slice(this._appendOnly ? 0 : this.first, this.last);
        }
        return [];
    }
    get loadedRows() {
        return this.d_loading ? (this._loaderDisabled ? this.loaderArr : []) : this.loadedItems;
    }
    get loadedColumns() {
        if (this._columns && (this.both || this.horizontal)) {
            return this.d_loading && this._loaderDisabled ? (this.both ? this.loaderArr[0] : this.loaderArr) : this._columns.slice(this.both ? this.first.cols : this.first, this.both ? this.last.cols : this.last);
        }
        return this._columns;
    }
    get isPageChanged() {
        return this._step ? this.page !== this.getPageByFirst() : true;
    }
    constructor(document, platformId, renderer, cd, zone) {
        this.document = document;
        this.platformId = platformId;
        this.renderer = renderer;
        this.cd = cd;
        this.zone = zone;
    }
    ngOnInit() {
        this.setInitialState();
    }
    ngOnChanges(simpleChanges) {
        let isLoadingChanged = false;
        if (simpleChanges.loading) {
            const { previousValue, currentValue } = simpleChanges.loading;
            if (this.lazy && previousValue !== currentValue && currentValue !== this.d_loading) {
                this.d_loading = currentValue;
                isLoadingChanged = true;
            }
        }
        if (simpleChanges.orientation) {
            this.lastScrollPos = this.both ? { top: 0, left: 0 } : 0;
        }
        if (simpleChanges.numToleratedItems) {
            const { previousValue, currentValue } = simpleChanges.numToleratedItems;
            if (previousValue !== currentValue && currentValue !== this.d_numToleratedItems) {
                this.d_numToleratedItems = currentValue;
            }
        }
        if (simpleChanges.options) {
            const { previousValue, currentValue } = simpleChanges.options;
            if (this.lazy && previousValue?.loading !== currentValue?.loading && currentValue?.loading !== this.d_loading) {
                this.d_loading = currentValue.loading;
                isLoadingChanged = true;
            }
            if (previousValue?.numToleratedItems !== currentValue?.numToleratedItems && currentValue?.numToleratedItems !== this.d_numToleratedItems) {
                this.d_numToleratedItems = currentValue.numToleratedItems;
            }
        }
        if (this.initialized) {
            const isChanged = !isLoadingChanged && (simpleChanges.items?.previousValue?.length !== simpleChanges.items?.currentValue?.length || simpleChanges.itemSize || simpleChanges.scrollHeight || simpleChanges.scrollWidth);
            if (isChanged) {
                this.init();
                this.calculateAutoSize();
            }
        }
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                case 'item':
                    this.itemTemplate = item.template;
                    break;
                case 'loader':
                    this.loaderTemplate = item.template;
                    break;
                case 'loadericon':
                    this.loaderIconTemplate = item.template;
                    break;
                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }
    ngAfterViewInit() {
        Promise.resolve().then(() => {
            this.viewInit();
        });
    }
    ngAfterViewChecked() {
        if (!this.initialized) {
            this.viewInit();
        }
    }
    ngOnDestroy() {
        this.unbindResizeListener();
        this.contentEl = null;
        this.initialized = false;
    }
    viewInit() {
        if (isPlatformBrowser(this.platformId)) {
            if (DomHandler.isVisible(this.elementViewChild?.nativeElement)) {
                this.setInitialState();
                this.setContentEl(this.contentEl);
                this.init();
                this.defaultWidth = DomHandler.getWidth(this.elementViewChild?.nativeElement);
                this.defaultHeight = DomHandler.getHeight(this.elementViewChild?.nativeElement);
                this.defaultContentWidth = DomHandler.getWidth(this.contentEl);
                this.defaultContentHeight = DomHandler.getHeight(this.contentEl);
                this.initialized = true;
            }
        }
    }
    init() {
        if (!this._disabled) {
            this.setSize();
            this.calculateOptions();
            this.setSpacerSize();
            this.bindResizeListener();
            this.cd.detectChanges();
        }
    }
    setContentEl(el) {
        this.contentEl = el || this.contentViewChild?.nativeElement || DomHandler.findSingle(this.elementViewChild?.nativeElement, '.p-scroller-content');
    }
    setInitialState() {
        this.first = this.both ? { rows: 0, cols: 0 } : 0;
        this.last = this.both ? { rows: 0, cols: 0 } : 0;
        this.numItemsInViewport = this.both ? { rows: 0, cols: 0 } : 0;
        this.lastScrollPos = this.both ? { top: 0, left: 0 } : 0;
        this.d_loading = this._loading || false;
        this.d_numToleratedItems = this._numToleratedItems;
        this.loaderArr = [];
        this.spacerStyle = {};
        this.contentStyle = {};
    }
    getElementRef() {
        return this.elementViewChild;
    }
    getPageByFirst() {
        return Math.floor((this.first + this.d_numToleratedItems * 4) / (this._step || 1));
    }
    scrollTo(options) {
        this.lastScrollPos = this.both ? { top: 0, left: 0 } : 0;
        this.elementViewChild?.nativeElement?.scrollTo(options);
    }
    scrollToIndex(index, behavior = 'auto') {
        const { numToleratedItems } = this.calculateNumItems();
        const contentPos = this.getContentPosition();
        const calculateFirst = (_index = 0, _numT) => (_index <= _numT ? 0 : _index);
        const calculateCoord = (_first, _size, _cpos) => _first * _size + _cpos;
        const scrollTo = (left = 0, top = 0) => this.scrollTo({ left, top, behavior });
        let newFirst = 0;
        if (this.both) {
            newFirst = { rows: calculateFirst(index[0], numToleratedItems[0]), cols: calculateFirst(index[1], numToleratedItems[1]) };
            scrollTo(calculateCoord(newFirst.cols, this._itemSize[1], contentPos.left), calculateCoord(newFirst.rows, this._itemSize[0], contentPos.top));
        }
        else {
            newFirst = calculateFirst(index, numToleratedItems);
            this.horizontal ? scrollTo(calculateCoord(newFirst, this._itemSize, contentPos.left), 0) : scrollTo(0, calculateCoord(newFirst, this._itemSize, contentPos.top));
        }
        this.isRangeChanged = this.first !== newFirst;
        this.first = newFirst;
    }
    scrollInView(index, to, behavior = 'auto') {
        if (to) {
            const { first, viewport } = this.getRenderedRange();
            const scrollTo = (left = 0, top = 0) => this.scrollTo({ left, top, behavior });
            const isToStart = to === 'to-start';
            const isToEnd = to === 'to-end';
            if (isToStart) {
                if (this.both) {
                    if (viewport.first.rows - first.rows > index[0]) {
                        scrollTo(viewport.first.cols * this._itemSize[1], (viewport.first.rows - 1) * this._itemSize[0]);
                    }
                    else if (viewport.first.cols - first.cols > index[1]) {
                        scrollTo((viewport.first.cols - 1) * this._itemSize[1], viewport.first.rows * this._itemSize[0]);
                    }
                }
                else {
                    if (viewport.first - first > index) {
                        const pos = (viewport.first - 1) * this._itemSize;
                        this.horizontal ? scrollTo(pos, 0) : scrollTo(0, pos);
                    }
                }
            }
            else if (isToEnd) {
                if (this.both) {
                    if (viewport.last.rows - first.rows <= index[0] + 1) {
                        scrollTo(viewport.first.cols * this._itemSize[1], (viewport.first.rows + 1) * this._itemSize[0]);
                    }
                    else if (viewport.last.cols - first.cols <= index[1] + 1) {
                        scrollTo((viewport.first.cols + 1) * this._itemSize[1], viewport.first.rows * this._itemSize[0]);
                    }
                }
                else {
                    if (viewport.last - first <= index + 1) {
                        const pos = (viewport.first + 1) * this._itemSize;
                        this.horizontal ? scrollTo(pos, 0) : scrollTo(0, pos);
                    }
                }
            }
        }
        else {
            this.scrollToIndex(index, behavior);
        }
    }
    getRenderedRange() {
        const calculateFirstInViewport = (_pos, _size) => Math.floor(_pos / (_size || _pos));
        let firstInViewport = this.first;
        let lastInViewport = 0;
        if (this.elementViewChild?.nativeElement) {
            const { scrollTop, scrollLeft } = this.elementViewChild.nativeElement;
            if (this.both) {
                firstInViewport = { rows: calculateFirstInViewport(scrollTop, this._itemSize[0]), cols: calculateFirstInViewport(scrollLeft, this._itemSize[1]) };
                lastInViewport = { rows: firstInViewport.rows + this.numItemsInViewport.rows, cols: firstInViewport.cols + this.numItemsInViewport.cols };
            }
            else {
                const scrollPos = this.horizontal ? scrollLeft : scrollTop;
                firstInViewport = calculateFirstInViewport(scrollPos, this._itemSize);
                lastInViewport = firstInViewport + this.numItemsInViewport;
            }
        }
        return {
            first: this.first,
            last: this.last,
            viewport: {
                first: firstInViewport,
                last: lastInViewport
            }
        };
    }
    calculateNumItems() {
        const contentPos = this.getContentPosition();
        const contentWidth = (this.elementViewChild?.nativeElement ? this.elementViewChild.nativeElement.offsetWidth - contentPos.left : 0) || 0;
        const contentHeight = (this.elementViewChild?.nativeElement ? this.elementViewChild.nativeElement.offsetHeight - contentPos.top : 0) || 0;
        const calculateNumItemsInViewport = (_contentSize, _itemSize) => Math.ceil(_contentSize / (_itemSize || _contentSize));
        const calculateNumToleratedItems = (_numItems) => Math.ceil(_numItems / 2);
        const numItemsInViewport = this.both
            ? { rows: calculateNumItemsInViewport(contentHeight, this._itemSize[0]), cols: calculateNumItemsInViewport(contentWidth, this._itemSize[1]) }
            : calculateNumItemsInViewport(this.horizontal ? contentWidth : contentHeight, this._itemSize);
        const numToleratedItems = this.d_numToleratedItems || (this.both ? [calculateNumToleratedItems(numItemsInViewport.rows), calculateNumToleratedItems(numItemsInViewport.cols)] : calculateNumToleratedItems(numItemsInViewport));
        return { numItemsInViewport, numToleratedItems };
    }
    calculateOptions() {
        const { numItemsInViewport, numToleratedItems } = this.calculateNumItems();
        const calculateLast = (_first, _num, _numT, _isCols = false) => this.getLast(_first + _num + (_first < _numT ? 2 : 3) * _numT, _isCols);
        const first = this.first;
        const last = this.both
            ? { rows: calculateLast(this.first.rows, numItemsInViewport.rows, numToleratedItems[0]), cols: calculateLast(this.first.cols, numItemsInViewport.cols, numToleratedItems[1], true) }
            : calculateLast(this.first, numItemsInViewport, numToleratedItems);
        this.last = last;
        this.numItemsInViewport = numItemsInViewport;
        this.d_numToleratedItems = numToleratedItems;
        if (this.showLoader) {
            this.loaderArr = this.both ? Array.from({ length: numItemsInViewport.rows }).map(() => Array.from({ length: numItemsInViewport.cols })) : Array.from({ length: numItemsInViewport });
        }
        if (this._lazy) {
            Promise.resolve().then(() => {
                this.lazyLoadState = {
                    first: this._step ? (this.both ? { rows: 0, cols: first.cols } : 0) : first,
                    last: Math.min(this._step ? this._step : this.last, this.items.length)
                };
                this.handleEvents('onLazyLoad', this.lazyLoadState);
            });
        }
    }
    calculateAutoSize() {
        if (this._autoSize && !this.d_loading) {
            Promise.resolve().then(() => {
                if (this.contentEl) {
                    this.contentEl.style.minHeight = this.contentEl.style.minWidth = 'auto';
                    this.contentEl.style.position = 'relative';
                    this.elementViewChild.nativeElement.style.contain = 'none';
                    const [contentWidth, contentHeight] = [DomHandler.getWidth(this.contentEl), DomHandler.getHeight(this.contentEl)];
                    contentWidth !== this.defaultContentWidth && (this.elementViewChild.nativeElement.style.width = '');
                    contentHeight !== this.defaultContentHeight && (this.elementViewChild.nativeElement.style.height = '');
                    const [width, height] = [DomHandler.getWidth(this.elementViewChild.nativeElement), DomHandler.getHeight(this.elementViewChild.nativeElement)];
                    (this.both || this.horizontal) && (this.elementViewChild.nativeElement.style.width = width < this.defaultWidth ? width + 'px' : this._scrollWidth || this.defaultWidth + 'px');
                    (this.both || this.vertical) && (this.elementViewChild.nativeElement.style.height = height < this.defaultHeight ? height + 'px' : this._scrollHeight || this.defaultHeight + 'px');
                    this.contentEl.style.minHeight = this.contentEl.style.minWidth = '';
                    this.contentEl.style.position = '';
                    this.elementViewChild.nativeElement.style.contain = '';
                }
            });
        }
    }
    getLast(last = 0, isCols = false) {
        return this._items ? Math.min(isCols ? (this._columns || this._items[0]).length : this._items.length, last) : 0;
    }
    getContentPosition() {
        if (this.contentEl) {
            const style = getComputedStyle(this.contentEl);
            const left = parseFloat(style.paddingLeft) + Math.max(parseFloat(style.left) || 0, 0);
            const right = parseFloat(style.paddingRight) + Math.max(parseFloat(style.right) || 0, 0);
            const top = parseFloat(style.paddingTop) + Math.max(parseFloat(style.top) || 0, 0);
            const bottom = parseFloat(style.paddingBottom) + Math.max(parseFloat(style.bottom) || 0, 0);
            return { left, right, top, bottom, x: left + right, y: top + bottom };
        }
        return { left: 0, right: 0, top: 0, bottom: 0, x: 0, y: 0 };
    }
    setSize() {
        if (this.elementViewChild?.nativeElement) {
            const parentElement = this.elementViewChild.nativeElement.parentElement.parentElement;
            const width = this._scrollWidth || `${this.elementViewChild.nativeElement.offsetWidth || parentElement.offsetWidth}px`;
            const height = this._scrollHeight || `${this.elementViewChild.nativeElement.offsetHeight || parentElement.offsetHeight}px`;
            const setProp = (_name, _value) => (this.elementViewChild.nativeElement.style[_name] = _value);
            if (this.both || this.horizontal) {
                setProp('height', height);
                setProp('width', width);
            }
            else {
                setProp('height', height);
            }
        }
    }
    setSpacerSize() {
        if (this._items) {
            const contentPos = this.getContentPosition();
            const setProp = (_name, _value, _size, _cpos = 0) => (this.spacerStyle = { ...this.spacerStyle, ...{ [`${_name}`]: (_value || []).length * _size + _cpos + 'px' } });
            if (this.both) {
                setProp('height', this._items, this._itemSize[0], contentPos.y);
                setProp('width', this._columns || this._items[1], this._itemSize[1], contentPos.x);
            }
            else {
                this.horizontal ? setProp('width', this._columns || this._items, this._itemSize, contentPos.x) : setProp('height', this._items, this._itemSize, contentPos.y);
            }
        }
    }
    setContentPosition(pos) {
        if (this.contentEl && !this._appendOnly) {
            const first = pos ? pos.first : this.first;
            const calculateTranslateVal = (_first, _size) => _first * _size;
            const setTransform = (_x = 0, _y = 0) => (this.contentStyle = { ...this.contentStyle, ...{ transform: `translate3d(${_x}px, ${_y}px, 0)` } });
            if (this.both) {
                setTransform(calculateTranslateVal(first.cols, this._itemSize[1]), calculateTranslateVal(first.rows, this._itemSize[0]));
            }
            else {
                const translateVal = calculateTranslateVal(first, this._itemSize);
                this.horizontal ? setTransform(translateVal, 0) : setTransform(0, translateVal);
            }
        }
    }
    onScrollPositionChange(event) {
        const target = event.target;
        const contentPos = this.getContentPosition();
        const calculateScrollPos = (_pos, _cpos) => (_pos ? (_pos > _cpos ? _pos - _cpos : _pos) : 0);
        const calculateCurrentIndex = (_pos, _size) => Math.floor(_pos / (_size || _pos));
        const calculateTriggerIndex = (_currentIndex, _first, _last, _num, _numT, _isScrollDownOrRight) => {
            return _currentIndex <= _numT ? _numT : _isScrollDownOrRight ? _last - _num - _numT : _first + _numT - 1;
        };
        const calculateFirst = (_currentIndex, _triggerIndex, _first, _last, _num, _numT, _isScrollDownOrRight) => {
            if (_currentIndex <= _numT)
                return 0;
            else
                return Math.max(0, _isScrollDownOrRight ? (_currentIndex < _triggerIndex ? _first : _currentIndex - _numT) : _currentIndex > _triggerIndex ? _first : _currentIndex - 2 * _numT);
        };
        const calculateLast = (_currentIndex, _first, _last, _num, _numT, _isCols = false) => {
            let lastValue = _first + _num + 2 * _numT;
            if (_currentIndex >= _numT) {
                lastValue += _numT + 1;
            }
            return this.getLast(lastValue, _isCols);
        };
        const scrollTop = calculateScrollPos(target.scrollTop, contentPos.top);
        const scrollLeft = calculateScrollPos(target.scrollLeft, contentPos.left);
        let newFirst = this.both ? { rows: 0, cols: 0 } : 0;
        let newLast = this.last;
        let isRangeChanged = false;
        let newScrollPos = this.lastScrollPos;
        if (this.both) {
            const isScrollDown = this.lastScrollPos.top <= scrollTop;
            const isScrollRight = this.lastScrollPos.left <= scrollLeft;
            if (!this._appendOnly || (this._appendOnly && (isScrollDown || isScrollRight))) {
                const currentIndex = { rows: calculateCurrentIndex(scrollTop, this._itemSize[0]), cols: calculateCurrentIndex(scrollLeft, this._itemSize[1]) };
                const triggerIndex = {
                    rows: calculateTriggerIndex(currentIndex.rows, this.first.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0], isScrollDown),
                    cols: calculateTriggerIndex(currentIndex.cols, this.first.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], isScrollRight)
                };
                newFirst = {
                    rows: calculateFirst(currentIndex.rows, triggerIndex.rows, this.first.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0], isScrollDown),
                    cols: calculateFirst(currentIndex.cols, triggerIndex.cols, this.first.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], isScrollRight)
                };
                newLast = {
                    rows: calculateLast(currentIndex.rows, newFirst.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0]),
                    cols: calculateLast(currentIndex.cols, newFirst.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], true)
                };
                isRangeChanged = newFirst.rows !== this.first.rows || newLast.rows !== this.last.rows || newFirst.cols !== this.first.cols || newLast.cols !== this.last.cols || this.isRangeChanged;
                newScrollPos = { top: scrollTop, left: scrollLeft };
            }
        }
        else {
            const scrollPos = this.horizontal ? scrollLeft : scrollTop;
            const isScrollDownOrRight = this.lastScrollPos <= scrollPos;
            if (!this._appendOnly || (this._appendOnly && isScrollDownOrRight)) {
                const currentIndex = calculateCurrentIndex(scrollPos, this._itemSize);
                const triggerIndex = calculateTriggerIndex(currentIndex, this.first, this.last, this.numItemsInViewport, this.d_numToleratedItems, isScrollDownOrRight);
                newFirst = calculateFirst(currentIndex, triggerIndex, this.first, this.last, this.numItemsInViewport, this.d_numToleratedItems, isScrollDownOrRight);
                newLast = calculateLast(currentIndex, newFirst, this.last, this.numItemsInViewport, this.d_numToleratedItems);
                isRangeChanged = newFirst !== this.first || newLast !== this.last || this.isRangeChanged;
                newScrollPos = scrollPos;
            }
        }
        return {
            first: newFirst,
            last: newLast,
            isRangeChanged,
            scrollPos: newScrollPos
        };
    }
    onScrollChange(event) {
        const { first, last, isRangeChanged, scrollPos } = this.onScrollPositionChange(event);
        if (isRangeChanged) {
            const newState = { first, last };
            this.setContentPosition(newState);
            this.first = first;
            this.last = last;
            this.lastScrollPos = scrollPos;
            this.handleEvents('onScrollIndexChange', newState);
            if (this._lazy && this.isPageChanged) {
                const lazyLoadState = {
                    first: this._step ? Math.min(this.getPageByFirst() * this._step, this.items.length - this._step) : first,
                    last: Math.min(this._step ? (this.getPageByFirst() + 1) * this._step : last, this.items.length)
                };
                const isLazyStateChanged = this.lazyLoadState.first !== lazyLoadState.first || this.lazyLoadState.last !== lazyLoadState.last;
                isLazyStateChanged && this.handleEvents('onLazyLoad', lazyLoadState);
                this.lazyLoadState = lazyLoadState;
            }
        }
    }
    onContainerScroll(event) {
        this.handleEvents('onScroll', { originalEvent: event });
        if (this._delay && this.isPageChanged) {
            if (this.scrollTimeout) {
                clearTimeout(this.scrollTimeout);
            }
            if (!this.d_loading && this.showLoader) {
                const { isRangeChanged } = this.onScrollPositionChange(event);
                const changed = isRangeChanged || (this._step ? this.isPageChanged : false);
                if (changed) {
                    this.d_loading = true;
                    this.cd.detectChanges();
                }
            }
            this.scrollTimeout = setTimeout(() => {
                this.onScrollChange(event);
                if (this.d_loading && this.showLoader && (!this._lazy || this._loading === undefined)) {
                    this.d_loading = false;
                    this.page = this.getPageByFirst();
                    this.cd.detectChanges();
                }
            }, this._delay);
        }
        else {
            !this.d_loading && this.onScrollChange(event);
        }
    }
    bindResizeListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.windowResizeListener) {
                this.zone.runOutsideAngular(() => {
                    const window = this.document.defaultView;
                    const event = DomHandler.isTouchDevice() ? 'orientationchange' : 'resize';
                    this.windowResizeListener = this.renderer.listen(window, event, this.onWindowResize.bind(this));
                });
            }
        }
    }
    unbindResizeListener() {
        if (this.windowResizeListener) {
            this.windowResizeListener();
            this.windowResizeListener = null;
        }
    }
    onWindowResize() {
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }
        this.resizeTimeout = setTimeout(() => {
            if (DomHandler.isVisible(this.elementViewChild?.nativeElement)) {
                const [width, height] = [DomHandler.getWidth(this.elementViewChild?.nativeElement), DomHandler.getHeight(this.elementViewChild?.nativeElement)];
                const [isDiffWidth, isDiffHeight] = [width !== this.defaultWidth, height !== this.defaultHeight];
                const reinit = this.both ? isDiffWidth || isDiffHeight : this.horizontal ? isDiffWidth : this.vertical ? isDiffHeight : false;
                reinit &&
                    this.zone.run(() => {
                        this.d_numToleratedItems = this._numToleratedItems;
                        this.defaultWidth = width;
                        this.defaultHeight = height;
                        this.defaultContentWidth = DomHandler.getWidth(this.contentEl);
                        this.defaultContentHeight = DomHandler.getHeight(this.contentEl);
                        this.init();
                    });
            }
        }, this._resizeDelay);
    }
    handleEvents(name, params) {
        //@ts-ignore
        return this.options && this.options[name] ? this.options[name](params) : this[name].emit(params);
    }
    getContentOptions() {
        return {
            contentStyleClass: `p-scroller-content ${this.d_loading ? 'p-scroller-loading' : ''}`,
            items: this.loadedItems,
            getItemOptions: (index) => this.getOptions(index),
            loading: this.d_loading,
            getLoaderOptions: (index, options) => this.getLoaderOptions(index, options),
            itemSize: this._itemSize,
            rows: this.loadedRows,
            columns: this.loadedColumns,
            spacerStyle: this.spacerStyle,
            contentStyle: this.contentStyle,
            vertical: this.vertical,
            horizontal: this.horizontal,
            both: this.both
        };
    }
    getOptions(renderedIndex) {
        const count = (this._items || []).length;
        const index = this.both ? this.first.rows + renderedIndex : this.first + renderedIndex;
        return {
            index,
            count,
            first: index === 0,
            last: index === count - 1,
            even: index % 2 === 0,
            odd: index % 2 !== 0
        };
    }
    getLoaderOptions(index, extOptions) {
        const count = this.loaderArr.length;
        return {
            index,
            count,
            first: index === 0,
            last: index === count - 1,
            even: index % 2 === 0,
            odd: index % 2 !== 0,
            ...extOptions
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: Scroller, deps: [{ token: DOCUMENT }, { token: PLATFORM_ID }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: Scroller, selector: "p-scroller", inputs: { id: "id", style: "style", styleClass: "styleClass", tabindex: "tabindex", items: "items", itemSize: "itemSize", scrollHeight: "scrollHeight", scrollWidth: "scrollWidth", orientation: "orientation", step: "step", delay: "delay", resizeDelay: "resizeDelay", appendOnly: "appendOnly", inline: "inline", lazy: "lazy", disabled: "disabled", loaderDisabled: "loaderDisabled", columns: "columns", showSpacer: "showSpacer", showLoader: "showLoader", numToleratedItems: "numToleratedItems", loading: "loading", autoSize: "autoSize", trackBy: "trackBy", options: "options" }, outputs: { onLazyLoad: "onLazyLoad", onScroll: "onScroll", onScrollIndexChange: "onScrollIndexChange" }, host: { classAttribute: "p-scroller-viewport p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "elementViewChild", first: true, predicate: ["element"], descendants: true }, { propertyName: "contentViewChild", first: true, predicate: ["content"], descendants: true }], usesOnChanges: true, ngImport: i0, template: `
        <ng-container *ngIf="!_disabled; else disabledContainer">
            <div
                #element
                [attr.id]="_id"
                [attr.tabindex]="tabindex"
                [ngStyle]="_style"
                [class]="_styleClass"
                [ngClass]="{ 'p-scroller': true, 'p-scroller-inline': inline, 'p-both-scroll': both, 'p-horizontal-scroll': horizontal }"
                (scroll)="onContainerScroll($event)"
                [attr.data-pc-name]="'scroller'"
                [attr.data-pc-section]="'root'"
            >
                <ng-container *ngIf="contentTemplate; else buildInContent">
                    <ng-container *ngTemplateOutlet="contentTemplate; context: { $implicit: loadedItems, options: getContentOptions() }"></ng-container>
                </ng-container>
                <ng-template #buildInContent>
                    <div #content class="p-scroller-content" [ngClass]="{ 'p-scroller-loading': d_loading }" [ngStyle]="contentStyle" [attr.data-pc-section]="'content'">
                        <ng-container *ngFor="let item of loadedItems; let index = index; trackBy: _trackBy || index">
                            <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item, options: getOptions(index) }"></ng-container>
                        </ng-container>
                    </div>
                </ng-template>
                <div *ngIf="_showSpacer" class="p-scroller-spacer" [ngStyle]="spacerStyle" [attr.data-pc-section]="'spacer'"></div>
                <div *ngIf="!loaderDisabled && _showLoader && d_loading" class="p-scroller-loader" [ngClass]="{ 'p-component-overlay': !loaderTemplate }" [attr.data-pc-section]="'loader'">
                    <ng-container *ngIf="loaderTemplate; else buildInLoader">
                        <ng-container *ngFor="let item of loaderArr; let index = index">
                            <ng-container *ngTemplateOutlet="loaderTemplate; context: { options: getLoaderOptions(index, both && { numCols: _numItemsInViewport.cols }) }"></ng-container>
                        </ng-container>
                    </ng-container>
                    <ng-template #buildInLoader>
                        <ng-container *ngIf="loaderIconTemplate; else buildInLoaderIcon">
                            <ng-container *ngTemplateOutlet="loaderIconTemplate; context: { options: { styleClass: 'p-scroller-loading-icon' } }"></ng-container>
                        </ng-container>
                        <ng-template #buildInLoaderIcon>
                            <SpinnerIcon [styleClass]="'p-scroller-loading-icon'" [attr.data-pc-section]="'loadingIcon'" />
                        </ng-template>
                    </ng-template>
                </div>
            </div>
        </ng-container>
        <ng-template #disabledContainer>
            <ng-content></ng-content>
            <ng-container *ngIf="contentTemplate">
                <ng-container *ngTemplateOutlet="contentTemplate; context: { $implicit: items, options: { rows: _items, columns: loadedColumns } }"></ng-container>
            </ng-container>
        </ng-template>
    `, isInline: true, styles: ["@layer primeng{p-scroller{flex:1;outline:0 none}.p-scroller{position:relative;overflow:auto;contain:strict;transform:translateZ(0);will-change:scroll-position;outline:0 none}.p-scroller-content{position:absolute;top:0;left:0;min-height:100%;min-width:100%;will-change:transform}.p-scroller-spacer{position:absolute;top:0;left:0;height:1px;width:1px;transform-origin:0 0;pointer-events:none}.p-scroller-loader{position:sticky;top:0;left:0;width:100%;height:100%}.p-scroller-loader.p-component-overlay{display:flex;align-items:center;justify-content:center}.p-scroller-loading-icon{scale:2}.p-scroller-inline .p-scroller-content{position:static}}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(() => i1.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgForOf), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i0.forwardRef(() => SpinnerIcon), selector: "SpinnerIcon" }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: Scroller, decorators: [{
            type: Component,
            args: [{ selector: 'p-scroller', template: `
        <ng-container *ngIf="!_disabled; else disabledContainer">
            <div
                #element
                [attr.id]="_id"
                [attr.tabindex]="tabindex"
                [ngStyle]="_style"
                [class]="_styleClass"
                [ngClass]="{ 'p-scroller': true, 'p-scroller-inline': inline, 'p-both-scroll': both, 'p-horizontal-scroll': horizontal }"
                (scroll)="onContainerScroll($event)"
                [attr.data-pc-name]="'scroller'"
                [attr.data-pc-section]="'root'"
            >
                <ng-container *ngIf="contentTemplate; else buildInContent">
                    <ng-container *ngTemplateOutlet="contentTemplate; context: { $implicit: loadedItems, options: getContentOptions() }"></ng-container>
                </ng-container>
                <ng-template #buildInContent>
                    <div #content class="p-scroller-content" [ngClass]="{ 'p-scroller-loading': d_loading }" [ngStyle]="contentStyle" [attr.data-pc-section]="'content'">
                        <ng-container *ngFor="let item of loadedItems; let index = index; trackBy: _trackBy || index">
                            <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item, options: getOptions(index) }"></ng-container>
                        </ng-container>
                    </div>
                </ng-template>
                <div *ngIf="_showSpacer" class="p-scroller-spacer" [ngStyle]="spacerStyle" [attr.data-pc-section]="'spacer'"></div>
                <div *ngIf="!loaderDisabled && _showLoader && d_loading" class="p-scroller-loader" [ngClass]="{ 'p-component-overlay': !loaderTemplate }" [attr.data-pc-section]="'loader'">
                    <ng-container *ngIf="loaderTemplate; else buildInLoader">
                        <ng-container *ngFor="let item of loaderArr; let index = index">
                            <ng-container *ngTemplateOutlet="loaderTemplate; context: { options: getLoaderOptions(index, both && { numCols: _numItemsInViewport.cols }) }"></ng-container>
                        </ng-container>
                    </ng-container>
                    <ng-template #buildInLoader>
                        <ng-container *ngIf="loaderIconTemplate; else buildInLoaderIcon">
                            <ng-container *ngTemplateOutlet="loaderIconTemplate; context: { options: { styleClass: 'p-scroller-loading-icon' } }"></ng-container>
                        </ng-container>
                        <ng-template #buildInLoaderIcon>
                            <SpinnerIcon [styleClass]="'p-scroller-loading-icon'" [attr.data-pc-section]="'loadingIcon'" />
                        </ng-template>
                    </ng-template>
                </div>
            </div>
        </ng-container>
        <ng-template #disabledContainer>
            <ng-content></ng-content>
            <ng-container *ngIf="contentTemplate">
                <ng-container *ngTemplateOutlet="contentTemplate; context: { $implicit: items, options: { rows: _items, columns: loadedColumns } }"></ng-container>
            </ng-container>
        </ng-template>
    `, changeDetection: ChangeDetectionStrategy.Default, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-scroller-viewport p-element'
                    }, styles: ["@layer primeng{p-scroller{flex:1;outline:0 none}.p-scroller{position:relative;overflow:auto;contain:strict;transform:translateZ(0);will-change:scroll-position;outline:0 none}.p-scroller-content{position:absolute;top:0;left:0;min-height:100%;min-width:100%;will-change:transform}.p-scroller-spacer{position:absolute;top:0;left:0;height:1px;width:1px;transform-origin:0 0;pointer-events:none}.p-scroller-loader{position:sticky;top:0;left:0;width:100%;height:100%}.p-scroller-loader.p-component-overlay{display:flex;align-items:center;justify-content:center}.p-scroller-loading-icon{scale:2}.p-scroller-inline .p-scroller-content{position:static}}\n"] }]
        }], ctorParameters: () => [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }], propDecorators: { id: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], items: [{
                type: Input
            }], itemSize: [{
                type: Input
            }], scrollHeight: [{
                type: Input
            }], scrollWidth: [{
                type: Input
            }], orientation: [{
                type: Input
            }], step: [{
                type: Input
            }], delay: [{
                type: Input
            }], resizeDelay: [{
                type: Input
            }], appendOnly: [{
                type: Input
            }], inline: [{
                type: Input
            }], lazy: [{
                type: Input
            }], disabled: [{
                type: Input
            }], loaderDisabled: [{
                type: Input
            }], columns: [{
                type: Input
            }], showSpacer: [{
                type: Input
            }], showLoader: [{
                type: Input
            }], numToleratedItems: [{
                type: Input
            }], loading: [{
                type: Input
            }], autoSize: [{
                type: Input
            }], trackBy: [{
                type: Input
            }], options: [{
                type: Input
            }], onLazyLoad: [{
                type: Output
            }], onScroll: [{
                type: Output
            }], onScrollIndexChange: [{
                type: Output
            }], elementViewChild: [{
                type: ViewChild,
                args: ['element']
            }], contentViewChild: [{
                type: ViewChild,
                args: ['content']
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
export class ScrollerModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: ScrollerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.5", ngImport: i0, type: ScrollerModule, declarations: [Scroller], imports: [CommonModule, SharedModule, SpinnerIcon], exports: [Scroller, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: ScrollerModule, imports: [CommonModule, SharedModule, SpinnerIcon, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: ScrollerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, SharedModule, SpinnerIcon],
                    exports: [Scroller, SharedModule],
                    declarations: [Scroller]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvc2Nyb2xsZXIvc2Nyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RSxPQUFPLEVBR0gsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxlQUFlLEVBRWYsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUlSLE1BQU0sRUFDTixXQUFXLEVBS1gsU0FBUyxFQUNULGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsYUFBYSxFQUFtQixZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDM0UsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7OztBQUdwRDs7O0dBR0c7QUEwREgsTUFBTSxPQUFPLFFBQVE7SUFtYXFCO0lBQWlEO0lBQXlCO0lBQTZCO0lBQStCO0lBbGE1Szs7O09BR0c7SUFDSCxJQUFhLEVBQUU7UUFDWCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDcEIsQ0FBQztJQUNELElBQUksRUFBRSxDQUFDLEdBQXVCO1FBQzFCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ25CLENBQUM7SUFDRDs7O09BR0c7SUFDSCxJQUFhLEtBQUs7UUFDZCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUNELElBQUksS0FBSyxDQUFDLEdBQVE7UUFDZCxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztJQUN0QixDQUFDO0lBQ0Q7OztPQUdHO0lBQ0gsSUFBYSxVQUFVO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFD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QkFBNUIsTUFBTTtnQkFFZSxnQkFBZ0I7c0JBQXJDLFNBQVM7dUJBQUMsU0FBUztnQkFFRSxnQkFBZ0I7c0JBQXJDLFNBQVM7dUJBQUMsU0FBUztnQkFFWSxTQUFTO3NCQUF4QyxlQUFlO3VCQUFDLGFBQWE7O0FBNnVCbEMsTUFBTSxPQUFPLGNBQWM7dUdBQWQsY0FBYzt3R0FBZCxjQUFjLGlCQXBnQ2QsUUFBUSxhQWdnQ1AsWUFBWSxFQUFFLFlBQVksRUFBRSxXQUFXLGFBaGdDeEMsUUFBUSxFQWlnQ0csWUFBWTt3R0FHdkIsY0FBYyxZQUpiLFlBQVksRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUM3QixZQUFZOzsyRkFHdkIsY0FBYztrQkFMMUIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLFdBQVcsQ0FBQztvQkFDbEQsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQztvQkFDakMsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDO2lCQUMzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSwgRE9DVU1FTlQsIGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBBZnRlclZpZXdDaGVja2VkLFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIE5nTW9kdWxlLFxuICAgIE5nWm9uZSxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIE91dHB1dCxcbiAgICBQTEFURk9STV9JRCxcbiAgICBRdWVyeUxpc3QsXG4gICAgUmVuZGVyZXIyLFxuICAgIFNpbXBsZUNoYW5nZXMsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHJpbWVUZW1wbGF0ZSwgU2Nyb2xsZXJPcHRpb25zLCBTaGFyZWRNb2R1bGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBEb21IYW5kbGVyIH0gZnJvbSAncHJpbWVuZy9kb20nO1xuaW1wb3J0IHsgU3Bpbm5lckljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL3NwaW5uZXInO1xuaW1wb3J0IHsgTnVsbGFibGUsIFZvaWRMaXN0ZW5lciB9IGZyb20gJ3ByaW1lbmcvdHMtaGVscGVycyc7XG5pbXBvcnQgeyBTY3JvbGxlckxhenlMb2FkRXZlbnQsIFNjcm9sbGVyU2Nyb2xsRXZlbnQsIFNjcm9sbGVyU2Nyb2xsSW5kZXhDaGFuZ2VFdmVudCwgU2Nyb2xsZXJUb1R5cGUgfSBmcm9tICcuL3Njcm9sbGVyLmludGVyZmFjZSc7XG4vKipcbiAqIFNjcm9sbGVyIGlzIGEgcGVyZm9ybWFuY2UtYXBwcm9hY2ggdG8gaGFuZGxlIGh1Z2UgZGF0YSBlZmZpY2llbnRseS5cbiAqIEBncm91cCBDb21wb25lbnRzXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1zY3JvbGxlcicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFfZGlzYWJsZWQ7IGVsc2UgZGlzYWJsZWRDb250YWluZXJcIj5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAjZWxlbWVudFxuICAgICAgICAgICAgICAgIFthdHRyLmlkXT1cIl9pZFwiXG4gICAgICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwidGFiaW5kZXhcIlxuICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cIl9zdHlsZVwiXG4gICAgICAgICAgICAgICAgW2NsYXNzXT1cIl9zdHlsZUNsYXNzXCJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLXNjcm9sbGVyJzogdHJ1ZSwgJ3Atc2Nyb2xsZXItaW5saW5lJzogaW5saW5lLCAncC1ib3RoLXNjcm9sbCc6IGJvdGgsICdwLWhvcml6b250YWwtc2Nyb2xsJzogaG9yaXpvbnRhbCB9XCJcbiAgICAgICAgICAgICAgICAoc2Nyb2xsKT1cIm9uQ29udGFpbmVyU2Nyb2xsKCRldmVudClcIlxuICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtbmFtZV09XCInc2Nyb2xsZXInXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3Jvb3QnXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29udGVudFRlbXBsYXRlOyBlbHNlIGJ1aWxkSW5Db250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb250ZW50VGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBsb2FkZWRJdGVtcywgb3B0aW9uczogZ2V0Q29udGVudE9wdGlvbnMoKSB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNidWlsZEluQ29udGVudD5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiAjY29udGVudCBjbGFzcz1cInAtc2Nyb2xsZXItY29udGVudFwiIFtuZ0NsYXNzXT1cInsgJ3Atc2Nyb2xsZXItbG9hZGluZyc6IGRfbG9hZGluZyB9XCIgW25nU3R5bGVdPVwiY29udGVudFN0eWxlXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidjb250ZW50J1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgaXRlbSBvZiBsb2FkZWRJdGVtczsgbGV0IGluZGV4ID0gaW5kZXg7IHRyYWNrQnk6IF90cmFja0J5IHx8IGluZGV4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIml0ZW1UZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IGl0ZW0sIG9wdGlvbnM6IGdldE9wdGlvbnMoaW5kZXgpIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJfc2hvd1NwYWNlclwiIGNsYXNzPVwicC1zY3JvbGxlci1zcGFjZXJcIiBbbmdTdHlsZV09XCJzcGFjZXJTdHlsZVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInc3BhY2VyJ1wiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCIhbG9hZGVyRGlzYWJsZWQgJiYgX3Nob3dMb2FkZXIgJiYgZF9sb2FkaW5nXCIgY2xhc3M9XCJwLXNjcm9sbGVyLWxvYWRlclwiIFtuZ0NsYXNzXT1cInsgJ3AtY29tcG9uZW50LW92ZXJsYXknOiAhbG9hZGVyVGVtcGxhdGUgfVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInbG9hZGVyJ1wiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibG9hZGVyVGVtcGxhdGU7IGVsc2UgYnVpbGRJbkxvYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgaXRlbSBvZiBsb2FkZXJBcnI7IGxldCBpbmRleCA9IGluZGV4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImxvYWRlclRlbXBsYXRlOyBjb250ZXh0OiB7IG9wdGlvbnM6IGdldExvYWRlck9wdGlvbnMoaW5kZXgsIGJvdGggJiYgeyBudW1Db2xzOiBfbnVtSXRlbXNJblZpZXdwb3J0LmNvbHMgfSkgfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2J1aWxkSW5Mb2FkZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibG9hZGVySWNvblRlbXBsYXRlOyBlbHNlIGJ1aWxkSW5Mb2FkZXJJY29uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImxvYWRlckljb25UZW1wbGF0ZTsgY29udGV4dDogeyBvcHRpb25zOiB7IHN0eWxlQ2xhc3M6ICdwLXNjcm9sbGVyLWxvYWRpbmctaWNvbicgfSB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjYnVpbGRJbkxvYWRlckljb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFNwaW5uZXJJY29uIFtzdHlsZUNsYXNzXT1cIidwLXNjcm9sbGVyLWxvYWRpbmctaWNvbidcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2xvYWRpbmdJY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8bmctdGVtcGxhdGUgI2Rpc2FibGVkQ29udGFpbmVyPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbnRlbnRUZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb250ZW50VGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBpdGVtcywgb3B0aW9uczogeyByb3dzOiBfaXRlbXMsIGNvbHVtbnM6IGxvYWRlZENvbHVtbnMgfSB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHN0eWxlVXJsczogWycuL3Njcm9sbGVyLmNzcyddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLXNjcm9sbGVyLXZpZXdwb3J0IHAtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFNjcm9sbGVyIGltcGxlbWVudHMgT25Jbml0LCBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdDaGVja2VkLCBPbkRlc3Ryb3kge1xuICAgIC8qKlxuICAgICAqIFVuaXF1ZSBpZGVudGlmaWVyIG9mIHRoZSBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBpZCgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XG4gICAgfVxuICAgIHNldCBpZCh2YWw6IHN0cmluZyB8IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9pZCA9IHZhbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5saW5lIHN0eWxlIG9mIHRoZSBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IHN0eWxlKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdHlsZTtcbiAgICB9XG4gICAgc2V0IHN0eWxlKHZhbDogYW55KSB7XG4gICAgICAgIHRoaXMuX3N0eWxlID0gdmFsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdHlsZSBjbGFzcyBvZiB0aGUgZWxlbWVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgc3R5bGVDbGFzcygpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3R5bGVDbGFzcztcbiAgICB9XG4gICAgc2V0IHN0eWxlQ2xhc3ModmFsOiBzdHJpbmcgfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fc3R5bGVDbGFzcyA9IHZhbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5kZXggb2YgdGhlIGVsZW1lbnQgaW4gdGFiYmluZyBvcmRlci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgdGFiaW5kZXgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90YWJpbmRleDtcbiAgICB9XG4gICAgc2V0IHRhYmluZGV4KHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3RhYmluZGV4ID0gdmFsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbiBhcnJheSBvZiBvYmplY3RzIHRvIGRpc3BsYXkuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IGl0ZW1zKCk6IGFueVtdIHwgdW5kZWZpbmVkIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtcztcbiAgICB9XG4gICAgc2V0IGl0ZW1zKHZhbDogYW55W10gfCB1bmRlZmluZWQgfCBudWxsKSB7XG4gICAgICAgIHRoaXMuX2l0ZW1zID0gdmFsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgaGVpZ2h0L3dpZHRoIG9mIGl0ZW0gYWNjb3JkaW5nIHRvIG9yaWVudGF0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBpdGVtU2l6ZSgpOiBudW1iZXJbXSB8IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtU2l6ZTtcbiAgICB9XG4gICAgc2V0IGl0ZW1TaXplKHZhbDogbnVtYmVyW10gfCBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5faXRlbVNpemUgPSB2YWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhlaWdodCBvZiB0aGUgc2Nyb2xsIHZpZXdwb3J0LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBzY3JvbGxIZWlnaHQoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Njcm9sbEhlaWdodDtcbiAgICB9XG4gICAgc2V0IHNjcm9sbEhlaWdodCh2YWw6IHN0cmluZyB8IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9zY3JvbGxIZWlnaHQgPSB2YWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdpZHRoIG9mIHRoZSBzY3JvbGwgdmlld3BvcnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IHNjcm9sbFdpZHRoKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY3JvbGxXaWR0aDtcbiAgICB9XG4gICAgc2V0IHNjcm9sbFdpZHRoKHZhbDogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX3Njcm9sbFdpZHRoID0gdmFsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgb3JpZW50YXRpb24gb2Ygc2Nyb2xsYmFyLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBvcmllbnRhdGlvbigpOiAndmVydGljYWwnIHwgJ2hvcml6b250YWwnIHwgJ2JvdGgnIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29yaWVudGF0aW9uO1xuICAgIH1cbiAgICBzZXQgb3JpZW50YXRpb24odmFsOiAndmVydGljYWwnIHwgJ2hvcml6b250YWwnIHwgJ2JvdGgnKSB7XG4gICAgICAgIHRoaXMuX29yaWVudGF0aW9uID0gdmFsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIHNwZWNpZnkgaG93IG1hbnkgaXRlbXMgdG8gbG9hZCBpbiBlYWNoIGxvYWQgbWV0aG9kIGluIGxhenkgbW9kZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgc3RlcCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RlcDtcbiAgICB9XG4gICAgc2V0IHN0ZXAodmFsOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fc3RlcCA9IHZhbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVsYXkgaW4gc2Nyb2xsIGJlZm9yZSBuZXcgZGF0YSBpcyBsb2FkZWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IGRlbGF5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVsYXk7XG4gICAgfVxuICAgIHNldCBkZWxheSh2YWw6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9kZWxheSA9IHZhbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVsYXkgYWZ0ZXIgd2luZG93J3MgcmVzaXplIGZpbmlzaGVzLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCByZXNpemVEZWxheSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc2l6ZURlbGF5O1xuICAgIH1cbiAgICBzZXQgcmVzaXplRGVsYXkodmFsOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fcmVzaXplRGVsYXkgPSB2YWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gYXBwZW5kIGVhY2ggbG9hZGVkIGl0ZW0gdG8gdG9wIHdpdGhvdXQgcmVtb3ZpbmcgYW55IGl0ZW1zIGZyb20gdGhlIERPTS4gVXNpbmcgdmVyeSBsYXJnZSBkYXRhIG1heSBjYXVzZSB0aGUgYnJvd3NlciB0byBjcmFzaC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgYXBwZW5kT25seSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FwcGVuZE9ubHk7XG4gICAgfVxuICAgIHNldCBhcHBlbmRPbmx5KHZhbDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9hcHBlbmRPbmx5ID0gdmFsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTcGVjaWZpZXMgd2hldGhlciB0aGUgc2Nyb2xsZXIgc2hvdWxkIGJlIGRpc3BsYXllZCBpbmxpbmUgb3Igbm90LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBpbmxpbmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbmxpbmU7XG4gICAgfVxuICAgIHNldCBpbmxpbmUodmFsOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2lubGluZSA9IHZhbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBpZiBkYXRhIGlzIGxvYWRlZCBhbmQgaW50ZXJhY3RlZCB3aXRoIGluIGxhenkgbWFubmVyLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBsYXp5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGF6eTtcbiAgICB9XG4gICAgc2V0IGxhenkodmFsOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2xhenkgPSB2YWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIElmIGRpc2FibGVkLCB0aGUgc2Nyb2xsZXIgZmVhdHVyZSBpcyBlbGltaW5hdGVkIGFuZCB0aGUgY29udGVudCBpcyBkaXNwbGF5ZWQgZGlyZWN0bHkuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IGRpc2FibGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gICAgfVxuICAgIHNldCBkaXNhYmxlZCh2YWw6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSB2YWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gaW1wbGVtZW50IGEgY3VzdG9tIGxvYWRlciBpbnN0ZWFkIG9mIHVzaW5nIHRoZSBsb2FkZXIgZmVhdHVyZSBpbiB0aGUgc2Nyb2xsZXIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IGxvYWRlckRpc2FibGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9hZGVyRGlzYWJsZWQ7XG4gICAgfVxuICAgIHNldCBsb2FkZXJEaXNhYmxlZCh2YWw6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fbG9hZGVyRGlzYWJsZWQgPSB2YWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvbHVtbnMgdG8gZGlzcGxheS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgY29sdW1ucygpOiBhbnlbXSB8IHVuZGVmaW5lZCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29sdW1ucztcbiAgICB9XG4gICAgc2V0IGNvbHVtbnModmFsOiBhbnlbXSB8IHVuZGVmaW5lZCB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5fY29sdW1ucyA9IHZhbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXNlZCB0byBpbXBsZW1lbnQgYSBjdXN0b20gc3BhY2VyIGluc3RlYWQgb2YgdXNpbmcgdGhlIHNwYWNlciBmZWF0dXJlIGluIHRoZSBzY3JvbGxlci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgc2hvd1NwYWNlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Nob3dTcGFjZXI7XG4gICAgfVxuICAgIHNldCBzaG93U3BhY2VyKHZhbDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9zaG93U3BhY2VyID0gdmFsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHdoZXRoZXIgdG8gc2hvdyBsb2FkZXIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IHNob3dMb2FkZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaG93TG9hZGVyO1xuICAgIH1cbiAgICBzZXQgc2hvd0xvYWRlcih2YWw6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fc2hvd0xvYWRlciA9IHZhbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lcyBob3cgbWFueSBhZGRpdGlvbmFsIGVsZW1lbnRzIHRvIGFkZCB0byB0aGUgRE9NIG91dHNpZGUgb2YgdGhlIHZpZXcuIEFjY29yZGluZyB0byB0aGUgc2Nyb2xscyBtYWRlIHVwIGFuZCBkb3duLCBleHRyYSBpdGVtcyBhcmUgYWRkZWQgaW4gYSBjZXJ0YWluIGFsZ29yaXRobSBpbiB0aGUgZm9ybSBvZiBtdWx0aXBsZXMgb2YgdGhpcyBudW1iZXIuIERlZmF1bHQgdmFsdWUgaXMgaGFsZiB0aGUgbnVtYmVyIG9mIGl0ZW1zIHNob3duIGluIHRoZSB2aWV3LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBudW1Ub2xlcmF0ZWRJdGVtcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX251bVRvbGVyYXRlZEl0ZW1zO1xuICAgIH1cbiAgICBzZXQgbnVtVG9sZXJhdGVkSXRlbXModmFsOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fbnVtVG9sZXJhdGVkSXRlbXMgPSB2YWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlZmluZXMgd2hldGhlciB0aGUgZGF0YSBpcyBsb2FkZWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IGxvYWRpbmcoKTogYm9vbGVhbiB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sb2FkaW5nO1xuICAgIH1cbiAgICBzZXQgbG9hZGluZyh2YWw6IGJvb2xlYW4gfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fbG9hZGluZyA9IHZhbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyB3aGV0aGVyIHRvIGR5bmFtaWNhbGx5IGNoYW5nZSB0aGUgaGVpZ2h0IG9yIHdpZHRoIG9mIHNjcm9sbGFibGUgY29udGFpbmVyLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBhdXRvU2l6ZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2F1dG9TaXplO1xuICAgIH1cbiAgICBzZXQgYXV0b1NpemUodmFsOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2F1dG9TaXplID0gdmFsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBvcHRpbWl6ZSB0aGUgZG9tIG9wZXJhdGlvbnMgYnkgZGVsZWdhdGluZyB0byBuZ0ZvclRyYWNrQnksIGRlZmF1bHQgYWxnb3JpdG0gY2hlY2tzIGZvciBvYmplY3QgaWRlbnRpdHkuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IHRyYWNrQnkoKTogRnVuY3Rpb24ge1xuICAgICAgICByZXR1cm4gdGhpcy5fdHJhY2tCeTtcbiAgICB9XG4gICAgc2V0IHRyYWNrQnkodmFsOiBGdW5jdGlvbikge1xuICAgICAgICB0aGlzLl90cmFja0J5ID0gdmFsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHdoZXRoZXIgdG8gdXNlIHRoZSBzY3JvbGxlciBmZWF0dXJlLiBUaGUgcHJvcGVydGllcyBvZiBzY3JvbGxlciBjb21wb25lbnQgY2FuIGJlIHVzZWQgbGlrZSBhbiBvYmplY3QgaW4gaXQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IG9wdGlvbnMoKTogU2Nyb2xsZXJPcHRpb25zIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wdGlvbnM7XG4gICAgfVxuICAgIHNldCBvcHRpb25zKHZhbDogU2Nyb2xsZXJPcHRpb25zIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSB2YWw7XG5cbiAgICAgICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgICAgICBPYmplY3QuZW50cmllcyh2YWwpLmZvckVhY2goKFtrLCB2XSkgPT4gdGhpc1tgXyR7a31gXSAhPT0gdiAmJiAodGhpc1tgXyR7a31gXSA9IHYpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2UgaW4gbGF6eSBtb2RlIHRvIGxvYWQgbmV3IGRhdGEuXG4gICAgICogQHBhcmFtIHtTY3JvbGxlckxhenlMb2FkRXZlbnR9IGV2ZW50IC0gQ3VzdG9tIGxhenkgbG9hZCBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25MYXp5TG9hZDogRXZlbnRFbWl0dGVyPFNjcm9sbGVyTGF6eUxvYWRFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFNjcm9sbGVyTGF6eUxvYWRFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBzY3JvbGwgcG9zaXRpb24gY2hhbmdlcy5cbiAgICAgKiBAcGFyYW0ge1Njcm9sbGVyU2Nyb2xsRXZlbnR9IGV2ZW50IC0gQ3VzdG9tIHNjcm9sbCBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25TY3JvbGw6IEV2ZW50RW1pdHRlcjxTY3JvbGxlclNjcm9sbEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8U2Nyb2xsZXJTY3JvbGxFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBzY3JvbGwgcG9zaXRpb24gYW5kIGl0ZW0ncyByYW5nZSBpbiB2aWV3IGNoYW5nZXMuXG4gICAgICogQHBhcmFtIHtTY3JvbGxlclNjcm9sbEV2ZW50fSBldmVudCAtIEN1c3RvbSBzY3JvbGwgaW5kZXggY2hhbmdlIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvblNjcm9sbEluZGV4Q2hhbmdlOiBFdmVudEVtaXR0ZXI8U2Nyb2xsZXJTY3JvbGxJbmRleENoYW5nZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8U2Nyb2xsZXJTY3JvbGxJbmRleENoYW5nZUV2ZW50PigpO1xuXG4gICAgQFZpZXdDaGlsZCgnZWxlbWVudCcpIGVsZW1lbnRWaWV3Q2hpbGQ6IE51bGxhYmxlPEVsZW1lbnRSZWY+O1xuXG4gICAgQFZpZXdDaGlsZCgnY29udGVudCcpIGNvbnRlbnRWaWV3Q2hpbGQ6IE51bGxhYmxlPEVsZW1lbnRSZWY+O1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IE51bGxhYmxlPFF1ZXJ5TGlzdDxQcmltZVRlbXBsYXRlPj47XG5cbiAgICBfaWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIF9zdHlsZTogeyBba2xhc3M6IHN0cmluZ106IGFueSB9IHwgbnVsbCB8IHVuZGVmaW5lZDtcblxuICAgIF9zdHlsZUNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBfdGFiaW5kZXg6IG51bWJlciA9IDA7XG5cbiAgICBfaXRlbXM6IGFueVtdIHwgdW5kZWZpbmVkIHwgbnVsbDtcblxuICAgIF9pdGVtU2l6ZTogbnVtYmVyIHwgbnVtYmVyW10gPSAwO1xuXG4gICAgX3Njcm9sbEhlaWdodDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgX3Njcm9sbFdpZHRoOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBfb3JpZW50YXRpb246ICd2ZXJ0aWNhbCcgfCAnaG9yaXpvbnRhbCcgfCAnYm90aCcgPSAndmVydGljYWwnO1xuXG4gICAgX3N0ZXA6IG51bWJlciA9IDA7XG5cbiAgICBfZGVsYXk6IG51bWJlciA9IDA7XG5cbiAgICBfcmVzaXplRGVsYXk6IG51bWJlciA9IDEwO1xuXG4gICAgX2FwcGVuZE9ubHk6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIF9pbmxpbmU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIF9sYXp5OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIF9sb2FkZXJEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgX2NvbHVtbnM6IGFueVtdIHwgdW5kZWZpbmVkIHwgbnVsbDtcblxuICAgIF9zaG93U3BhY2VyOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIF9zaG93TG9hZGVyOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBfbnVtVG9sZXJhdGVkSXRlbXM6IGFueTtcblxuICAgIF9sb2FkaW5nOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgX2F1dG9TaXplOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBfdHJhY2tCeTogYW55O1xuXG4gICAgX29wdGlvbnM6IFNjcm9sbGVyT3B0aW9ucyB8IHVuZGVmaW5lZDtcblxuICAgIGRfbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgZF9udW1Ub2xlcmF0ZWRJdGVtczogYW55O1xuXG4gICAgY29udGVudEVsOiBhbnk7XG5cbiAgICBjb250ZW50VGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgaXRlbVRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGxvYWRlclRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGxvYWRlckljb25UZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBmaXJzdDogYW55ID0gMDtcblxuICAgIGxhc3Q6IGFueSA9IDA7XG5cbiAgICBwYWdlOiBudW1iZXIgPSAwO1xuXG4gICAgaXNSYW5nZUNoYW5nZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIG51bUl0ZW1zSW5WaWV3cG9ydDogYW55ID0gMDtcblxuICAgIGxhc3RTY3JvbGxQb3M6IGFueSA9IDA7XG5cbiAgICBsYXp5TG9hZFN0YXRlOiBhbnkgPSB7fTtcblxuICAgIGxvYWRlckFycjogYW55W10gPSBbXTtcblxuICAgIHNwYWNlclN0eWxlOiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gfCBudWxsIHwgdW5kZWZpbmVkID0ge307XG5cbiAgICBjb250ZW50U3R5bGU6IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSB8IG51bGwgfCB1bmRlZmluZWQgPSB7fTtcblxuICAgIHNjcm9sbFRpbWVvdXQ6IGFueTtcblxuICAgIHJlc2l6ZVRpbWVvdXQ6IGFueTtcblxuICAgIGluaXRpYWxpemVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICB3aW5kb3dSZXNpemVMaXN0ZW5lcjogVm9pZExpc3RlbmVyO1xuXG4gICAgZGVmYXVsdFdpZHRoOiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgICBkZWZhdWx0SGVpZ2h0OiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgICBkZWZhdWx0Q29udGVudFdpZHRoOiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgICBkZWZhdWx0Q29udGVudEhlaWdodDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gICAgZ2V0IHZlcnRpY2FsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCc7XG4gICAgfVxuXG4gICAgZ2V0IGhvcml6b250YWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnO1xuICAgIH1cblxuICAgIGdldCBib3RoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3JpZW50YXRpb24gPT09ICdib3RoJztcbiAgICB9XG5cbiAgICBnZXQgbG9hZGVkSXRlbXMoKSB7XG4gICAgICAgIGlmICh0aGlzLl9pdGVtcyAmJiAhdGhpcy5kX2xvYWRpbmcpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmJvdGgpIHJldHVybiB0aGlzLl9pdGVtcy5zbGljZSh0aGlzLl9hcHBlbmRPbmx5ID8gMCA6IHRoaXMuZmlyc3Qucm93cywgdGhpcy5sYXN0LnJvd3MpLm1hcCgoaXRlbSkgPT4gKHRoaXMuX2NvbHVtbnMgPyBpdGVtIDogaXRlbS5zbGljZSh0aGlzLl9hcHBlbmRPbmx5ID8gMCA6IHRoaXMuZmlyc3QuY29scywgdGhpcy5sYXN0LmNvbHMpKSk7XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmhvcml6b250YWwgJiYgdGhpcy5fY29sdW1ucykgcmV0dXJuIHRoaXMuX2l0ZW1zO1xuICAgICAgICAgICAgZWxzZSByZXR1cm4gdGhpcy5faXRlbXMuc2xpY2UodGhpcy5fYXBwZW5kT25seSA/IDAgOiB0aGlzLmZpcnN0LCB0aGlzLmxhc3QpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIGdldCBsb2FkZWRSb3dzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kX2xvYWRpbmcgPyAodGhpcy5fbG9hZGVyRGlzYWJsZWQgPyB0aGlzLmxvYWRlckFyciA6IFtdKSA6IHRoaXMubG9hZGVkSXRlbXM7XG4gICAgfVxuXG4gICAgZ2V0IGxvYWRlZENvbHVtbnMoKSB7XG4gICAgICAgIGlmICh0aGlzLl9jb2x1bW5zICYmICh0aGlzLmJvdGggfHwgdGhpcy5ob3Jpem9udGFsKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZF9sb2FkaW5nICYmIHRoaXMuX2xvYWRlckRpc2FibGVkID8gKHRoaXMuYm90aCA/IHRoaXMubG9hZGVyQXJyWzBdIDogdGhpcy5sb2FkZXJBcnIpIDogdGhpcy5fY29sdW1ucy5zbGljZSh0aGlzLmJvdGggPyB0aGlzLmZpcnN0LmNvbHMgOiB0aGlzLmZpcnN0LCB0aGlzLmJvdGggPyB0aGlzLmxhc3QuY29scyA6IHRoaXMubGFzdCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fY29sdW1ucztcbiAgICB9XG5cbiAgICBnZXQgaXNQYWdlQ2hhbmdlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0ZXAgPyB0aGlzLnBhZ2UgIT09IHRoaXMuZ2V0UGFnZUJ5Rmlyc3QoKSA6IHRydWU7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQsIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogYW55LCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIHpvbmU6IE5nWm9uZSkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnNldEluaXRpYWxTdGF0ZSgpO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKHNpbXBsZUNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgbGV0IGlzTG9hZGluZ0NoYW5nZWQgPSBmYWxzZTtcblxuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlcy5sb2FkaW5nKSB7XG4gICAgICAgICAgICBjb25zdCB7IHByZXZpb3VzVmFsdWUsIGN1cnJlbnRWYWx1ZSB9ID0gc2ltcGxlQ2hhbmdlcy5sb2FkaW5nO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5sYXp5ICYmIHByZXZpb3VzVmFsdWUgIT09IGN1cnJlbnRWYWx1ZSAmJiBjdXJyZW50VmFsdWUgIT09IHRoaXMuZF9sb2FkaW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kX2xvYWRpbmcgPSBjdXJyZW50VmFsdWU7XG4gICAgICAgICAgICAgICAgaXNMb2FkaW5nQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlcy5vcmllbnRhdGlvbikge1xuICAgICAgICAgICAgdGhpcy5sYXN0U2Nyb2xsUG9zID0gdGhpcy5ib3RoID8geyB0b3A6IDAsIGxlZnQ6IDAgfSA6IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlcy5udW1Ub2xlcmF0ZWRJdGVtcykge1xuICAgICAgICAgICAgY29uc3QgeyBwcmV2aW91c1ZhbHVlLCBjdXJyZW50VmFsdWUgfSA9IHNpbXBsZUNoYW5nZXMubnVtVG9sZXJhdGVkSXRlbXM7XG5cbiAgICAgICAgICAgIGlmIChwcmV2aW91c1ZhbHVlICE9PSBjdXJyZW50VmFsdWUgJiYgY3VycmVudFZhbHVlICE9PSB0aGlzLmRfbnVtVG9sZXJhdGVkSXRlbXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRfbnVtVG9sZXJhdGVkSXRlbXMgPSBjdXJyZW50VmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlcy5vcHRpb25zKSB7XG4gICAgICAgICAgICBjb25zdCB7IHByZXZpb3VzVmFsdWUsIGN1cnJlbnRWYWx1ZSB9ID0gc2ltcGxlQ2hhbmdlcy5vcHRpb25zO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5sYXp5ICYmIHByZXZpb3VzVmFsdWU/LmxvYWRpbmcgIT09IGN1cnJlbnRWYWx1ZT8ubG9hZGluZyAmJiBjdXJyZW50VmFsdWU/LmxvYWRpbmcgIT09IHRoaXMuZF9sb2FkaW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kX2xvYWRpbmcgPSBjdXJyZW50VmFsdWUubG9hZGluZztcbiAgICAgICAgICAgICAgICBpc0xvYWRpbmdDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHByZXZpb3VzVmFsdWU/Lm51bVRvbGVyYXRlZEl0ZW1zICE9PSBjdXJyZW50VmFsdWU/Lm51bVRvbGVyYXRlZEl0ZW1zICYmIGN1cnJlbnRWYWx1ZT8ubnVtVG9sZXJhdGVkSXRlbXMgIT09IHRoaXMuZF9udW1Ub2xlcmF0ZWRJdGVtcykge1xuICAgICAgICAgICAgICAgIHRoaXMuZF9udW1Ub2xlcmF0ZWRJdGVtcyA9IGN1cnJlbnRWYWx1ZS5udW1Ub2xlcmF0ZWRJdGVtcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICAgICAgICBjb25zdCBpc0NoYW5nZWQgPSAhaXNMb2FkaW5nQ2hhbmdlZCAmJiAoc2ltcGxlQ2hhbmdlcy5pdGVtcz8ucHJldmlvdXNWYWx1ZT8ubGVuZ3RoICE9PSBzaW1wbGVDaGFuZ2VzLml0ZW1zPy5jdXJyZW50VmFsdWU/Lmxlbmd0aCB8fCBzaW1wbGVDaGFuZ2VzLml0ZW1TaXplIHx8IHNpbXBsZUNoYW5nZXMuc2Nyb2xsSGVpZ2h0IHx8IHNpbXBsZUNoYW5nZXMuc2Nyb2xsV2lkdGgpO1xuXG4gICAgICAgICAgICBpZiAoaXNDaGFuZ2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVBdXRvU2l6ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICAodGhpcy50ZW1wbGF0ZXMgYXMgUXVlcnlMaXN0PFByaW1lVGVtcGxhdGU+KS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnY29udGVudCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdpdGVtJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2xvYWRlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGVyVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2xvYWRlcmljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRlckljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudmlld0luaXQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xuICAgICAgICBpZiAoIXRoaXMuaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIHRoaXMudmlld0luaXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnVuYmluZFJlc2l6ZUxpc3RlbmVyKCk7XG5cbiAgICAgICAgdGhpcy5jb250ZW50RWwgPSBudWxsO1xuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdmlld0luaXQoKSB7XG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgICBpZiAoRG9tSGFuZGxlci5pc1Zpc2libGUodGhpcy5lbGVtZW50Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0SW5pdGlhbFN0YXRlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRDb250ZW50RWwodGhpcy5jb250ZW50RWwpO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0V2lkdGggPSBEb21IYW5kbGVyLmdldFdpZHRoKHRoaXMuZWxlbWVudFZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0SGVpZ2h0ID0gRG9tSGFuZGxlci5nZXRIZWlnaHQodGhpcy5lbGVtZW50Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHRDb250ZW50V2lkdGggPSBEb21IYW5kbGVyLmdldFdpZHRoKHRoaXMuY29udGVudEVsKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHRDb250ZW50SGVpZ2h0ID0gRG9tSGFuZGxlci5nZXRIZWlnaHQodGhpcy5jb250ZW50RWwpO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTaXplKCk7XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZU9wdGlvbnMoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3BhY2VyU2l6ZSgpO1xuICAgICAgICAgICAgdGhpcy5iaW5kUmVzaXplTGlzdGVuZXIoKTtcblxuICAgICAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRDb250ZW50RWwoZWw/OiBIVE1MRWxlbWVudCkge1xuICAgICAgICB0aGlzLmNvbnRlbnRFbCA9IGVsIHx8IHRoaXMuY29udGVudFZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudCB8fCBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5lbGVtZW50Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50LCAnLnAtc2Nyb2xsZXItY29udGVudCcpO1xuICAgIH1cblxuICAgIHNldEluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgdGhpcy5maXJzdCA9IHRoaXMuYm90aCA/IHsgcm93czogMCwgY29sczogMCB9IDogMDtcbiAgICAgICAgdGhpcy5sYXN0ID0gdGhpcy5ib3RoID8geyByb3dzOiAwLCBjb2xzOiAwIH0gOiAwO1xuICAgICAgICB0aGlzLm51bUl0ZW1zSW5WaWV3cG9ydCA9IHRoaXMuYm90aCA/IHsgcm93czogMCwgY29sczogMCB9IDogMDtcbiAgICAgICAgdGhpcy5sYXN0U2Nyb2xsUG9zID0gdGhpcy5ib3RoID8geyB0b3A6IDAsIGxlZnQ6IDAgfSA6IDA7XG4gICAgICAgIHRoaXMuZF9sb2FkaW5nID0gdGhpcy5fbG9hZGluZyB8fCBmYWxzZTtcbiAgICAgICAgdGhpcy5kX251bVRvbGVyYXRlZEl0ZW1zID0gdGhpcy5fbnVtVG9sZXJhdGVkSXRlbXM7XG4gICAgICAgIHRoaXMubG9hZGVyQXJyID0gW107XG4gICAgICAgIHRoaXMuc3BhY2VyU3R5bGUgPSB7fTtcbiAgICAgICAgdGhpcy5jb250ZW50U3R5bGUgPSB7fTtcbiAgICB9XG5cbiAgICBnZXRFbGVtZW50UmVmKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50Vmlld0NoaWxkO1xuICAgIH1cblxuICAgIGdldFBhZ2VCeUZpcnN0KCkge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigodGhpcy5maXJzdCArIHRoaXMuZF9udW1Ub2xlcmF0ZWRJdGVtcyAqIDQpIC8gKHRoaXMuX3N0ZXAgfHwgMSkpO1xuICAgIH1cblxuICAgIHNjcm9sbFRvKG9wdGlvbnM6IFNjcm9sbFRvT3B0aW9ucykge1xuICAgICAgICB0aGlzLmxhc3RTY3JvbGxQb3MgPSB0aGlzLmJvdGggPyB7IHRvcDogMCwgbGVmdDogMCB9IDogMDtcbiAgICAgICAgdGhpcy5lbGVtZW50Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50Py5zY3JvbGxUbyhvcHRpb25zKTtcbiAgICB9XG5cbiAgICBzY3JvbGxUb0luZGV4KGluZGV4OiBudW1iZXIsIGJlaGF2aW9yOiBTY3JvbGxCZWhhdmlvciA9ICdhdXRvJykge1xuICAgICAgICBjb25zdCB7IG51bVRvbGVyYXRlZEl0ZW1zIH0gPSB0aGlzLmNhbGN1bGF0ZU51bUl0ZW1zKCk7XG4gICAgICAgIGNvbnN0IGNvbnRlbnRQb3MgPSB0aGlzLmdldENvbnRlbnRQb3NpdGlvbigpO1xuICAgICAgICBjb25zdCBjYWxjdWxhdGVGaXJzdCA9IChfaW5kZXggPSAwLCBfbnVtVDogbnVtYmVyKSA9PiAoX2luZGV4IDw9IF9udW1UID8gMCA6IF9pbmRleCk7XG4gICAgICAgIGNvbnN0IGNhbGN1bGF0ZUNvb3JkID0gKF9maXJzdDogbnVtYmVyLCBfc2l6ZTogbnVtYmVyLCBfY3BvczogbnVtYmVyKSA9PiBfZmlyc3QgKiBfc2l6ZSArIF9jcG9zO1xuICAgICAgICBjb25zdCBzY3JvbGxUbyA9IChsZWZ0ID0gMCwgdG9wID0gMCkgPT4gdGhpcy5zY3JvbGxUbyh7IGxlZnQsIHRvcCwgYmVoYXZpb3IgfSk7XG4gICAgICAgIGxldCBuZXdGaXJzdDogYW55ID0gMDtcblxuICAgICAgICBpZiAodGhpcy5ib3RoKSB7XG4gICAgICAgICAgICBuZXdGaXJzdCA9IHsgcm93czogY2FsY3VsYXRlRmlyc3QoKDxhbnk+aW5kZXgpWzBdLCBudW1Ub2xlcmF0ZWRJdGVtc1swXSksIGNvbHM6IGNhbGN1bGF0ZUZpcnN0KCg8YW55PmluZGV4KVsxXSwgbnVtVG9sZXJhdGVkSXRlbXNbMV0pIH07XG4gICAgICAgICAgICBzY3JvbGxUbyhjYWxjdWxhdGVDb29yZChuZXdGaXJzdC5jb2xzLCAoPG51bWJlcltdPnRoaXMuX2l0ZW1TaXplKVsxXSwgY29udGVudFBvcy5sZWZ0KSwgY2FsY3VsYXRlQ29vcmQobmV3Rmlyc3Qucm93cywgKDxudW1iZXJbXT50aGlzLl9pdGVtU2l6ZSlbMF0sIGNvbnRlbnRQb3MudG9wKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdGaXJzdCA9IGNhbGN1bGF0ZUZpcnN0KGluZGV4LCBudW1Ub2xlcmF0ZWRJdGVtcyk7XG4gICAgICAgICAgICB0aGlzLmhvcml6b250YWwgPyBzY3JvbGxUbyhjYWxjdWxhdGVDb29yZChuZXdGaXJzdCwgPG51bWJlcj50aGlzLl9pdGVtU2l6ZSwgY29udGVudFBvcy5sZWZ0KSwgMCkgOiBzY3JvbGxUbygwLCBjYWxjdWxhdGVDb29yZChuZXdGaXJzdCwgPG51bWJlcj50aGlzLl9pdGVtU2l6ZSwgY29udGVudFBvcy50b3ApKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaXNSYW5nZUNoYW5nZWQgPSB0aGlzLmZpcnN0ICE9PSBuZXdGaXJzdDtcbiAgICAgICAgdGhpcy5maXJzdCA9IG5ld0ZpcnN0O1xuICAgIH1cblxuICAgIHNjcm9sbEluVmlldyhpbmRleDogbnVtYmVyLCB0bzogU2Nyb2xsZXJUb1R5cGUsIGJlaGF2aW9yOiBTY3JvbGxCZWhhdmlvciA9ICdhdXRvJykge1xuICAgICAgICBpZiAodG8pIHtcbiAgICAgICAgICAgIGNvbnN0IHsgZmlyc3QsIHZpZXdwb3J0IH0gPSB0aGlzLmdldFJlbmRlcmVkUmFuZ2UoKTtcbiAgICAgICAgICAgIGNvbnN0IHNjcm9sbFRvID0gKGxlZnQgPSAwLCB0b3AgPSAwKSA9PiB0aGlzLnNjcm9sbFRvKHsgbGVmdCwgdG9wLCBiZWhhdmlvciB9KTtcbiAgICAgICAgICAgIGNvbnN0IGlzVG9TdGFydCA9IHRvID09PSAndG8tc3RhcnQnO1xuICAgICAgICAgICAgY29uc3QgaXNUb0VuZCA9IHRvID09PSAndG8tZW5kJztcblxuICAgICAgICAgICAgaWYgKGlzVG9TdGFydCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmJvdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZpZXdwb3J0LmZpcnN0LnJvd3MgLSBmaXJzdC5yb3dzID4gKDxhbnk+aW5kZXgpWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUbyh2aWV3cG9ydC5maXJzdC5jb2xzICogKDxudW1iZXJbXT50aGlzLl9pdGVtU2l6ZSlbMV0sICh2aWV3cG9ydC5maXJzdC5yb3dzIC0gMSkgKiAoPG51bWJlcltdPnRoaXMuX2l0ZW1TaXplKVswXSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmlld3BvcnQuZmlyc3QuY29scyAtIGZpcnN0LmNvbHMgPiAoPGFueT5pbmRleClbMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvKCh2aWV3cG9ydC5maXJzdC5jb2xzIC0gMSkgKiAoPG51bWJlcltdPnRoaXMuX2l0ZW1TaXplKVsxXSwgdmlld3BvcnQuZmlyc3Qucm93cyAqICg8bnVtYmVyW10+dGhpcy5faXRlbVNpemUpWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2aWV3cG9ydC5maXJzdCAtIGZpcnN0ID4gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvcyA9ICh2aWV3cG9ydC5maXJzdCAtIDEpICogPG51bWJlcj50aGlzLl9pdGVtU2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaG9yaXpvbnRhbCA/IHNjcm9sbFRvKHBvcywgMCkgOiBzY3JvbGxUbygwLCBwb3MpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChpc1RvRW5kKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYm90aCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodmlld3BvcnQubGFzdC5yb3dzIC0gZmlyc3Qucm93cyA8PSAoPGFueT5pbmRleClbMF0gKyAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUbyh2aWV3cG9ydC5maXJzdC5jb2xzICogKDxudW1iZXJbXT50aGlzLl9pdGVtU2l6ZSlbMV0sICh2aWV3cG9ydC5maXJzdC5yb3dzICsgMSkgKiAoPG51bWJlcltdPnRoaXMuX2l0ZW1TaXplKVswXSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmlld3BvcnQubGFzdC5jb2xzIC0gZmlyc3QuY29scyA8PSAoPGFueT5pbmRleClbMV0gKyAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUbygodmlld3BvcnQuZmlyc3QuY29scyArIDEpICogKDxudW1iZXJbXT50aGlzLl9pdGVtU2l6ZSlbMV0sIHZpZXdwb3J0LmZpcnN0LnJvd3MgKiAoPG51bWJlcltdPnRoaXMuX2l0ZW1TaXplKVswXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodmlld3BvcnQubGFzdCAtIGZpcnN0IDw9IGluZGV4ICsgMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9zID0gKHZpZXdwb3J0LmZpcnN0ICsgMSkgKiA8bnVtYmVyPnRoaXMuX2l0ZW1TaXplO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ob3Jpem9udGFsID8gc2Nyb2xsVG8ocG9zLCAwKSA6IHNjcm9sbFRvKDAsIHBvcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbFRvSW5kZXgoaW5kZXgsIGJlaGF2aW9yKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFJlbmRlcmVkUmFuZ2UoKSB7XG4gICAgICAgIGNvbnN0IGNhbGN1bGF0ZUZpcnN0SW5WaWV3cG9ydCA9IChfcG9zOiBudW1iZXIsIF9zaXplOiBudW1iZXIpID0+IE1hdGguZmxvb3IoX3BvcyAvIChfc2l6ZSB8fCBfcG9zKSk7XG5cbiAgICAgICAgbGV0IGZpcnN0SW5WaWV3cG9ydCA9IHRoaXMuZmlyc3Q7XG4gICAgICAgIGxldCBsYXN0SW5WaWV3cG9ydDogYW55ID0gMDtcblxuICAgICAgICBpZiAodGhpcy5lbGVtZW50Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICBjb25zdCB7IHNjcm9sbFRvcCwgc2Nyb2xsTGVmdCB9ID0gdGhpcy5lbGVtZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmJvdGgpIHtcbiAgICAgICAgICAgICAgICBmaXJzdEluVmlld3BvcnQgPSB7IHJvd3M6IGNhbGN1bGF0ZUZpcnN0SW5WaWV3cG9ydChzY3JvbGxUb3AsICg8bnVtYmVyW10+dGhpcy5faXRlbVNpemUpWzBdKSwgY29sczogY2FsY3VsYXRlRmlyc3RJblZpZXdwb3J0KHNjcm9sbExlZnQsICg8bnVtYmVyW10+dGhpcy5faXRlbVNpemUpWzFdKSB9O1xuICAgICAgICAgICAgICAgIGxhc3RJblZpZXdwb3J0ID0geyByb3dzOiBmaXJzdEluVmlld3BvcnQucm93cyArIHRoaXMubnVtSXRlbXNJblZpZXdwb3J0LnJvd3MsIGNvbHM6IGZpcnN0SW5WaWV3cG9ydC5jb2xzICsgdGhpcy5udW1JdGVtc0luVmlld3BvcnQuY29scyB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzY3JvbGxQb3MgPSB0aGlzLmhvcml6b250YWwgPyBzY3JvbGxMZWZ0IDogc2Nyb2xsVG9wO1xuICAgICAgICAgICAgICAgIGZpcnN0SW5WaWV3cG9ydCA9IGNhbGN1bGF0ZUZpcnN0SW5WaWV3cG9ydChzY3JvbGxQb3MsIDxudW1iZXI+dGhpcy5faXRlbVNpemUpO1xuICAgICAgICAgICAgICAgIGxhc3RJblZpZXdwb3J0ID0gZmlyc3RJblZpZXdwb3J0ICsgdGhpcy5udW1JdGVtc0luVmlld3BvcnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZmlyc3Q6IHRoaXMuZmlyc3QsXG4gICAgICAgICAgICBsYXN0OiB0aGlzLmxhc3QsXG4gICAgICAgICAgICB2aWV3cG9ydDoge1xuICAgICAgICAgICAgICAgIGZpcnN0OiBmaXJzdEluVmlld3BvcnQsXG4gICAgICAgICAgICAgICAgbGFzdDogbGFzdEluVmlld3BvcnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVOdW1JdGVtcygpIHtcbiAgICAgICAgY29uc3QgY29udGVudFBvcyA9IHRoaXMuZ2V0Q29udGVudFBvc2l0aW9uKCk7XG4gICAgICAgIGNvbnN0IGNvbnRlbnRXaWR0aCA9ICh0aGlzLmVsZW1lbnRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQgPyB0aGlzLmVsZW1lbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCAtIGNvbnRlbnRQb3MubGVmdCA6IDApIHx8IDA7XG4gICAgICAgIGNvbnN0IGNvbnRlbnRIZWlnaHQgPSAodGhpcy5lbGVtZW50Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50ID8gdGhpcy5lbGVtZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0IC0gY29udGVudFBvcy50b3AgOiAwKSB8fCAwO1xuICAgICAgICBjb25zdCBjYWxjdWxhdGVOdW1JdGVtc0luVmlld3BvcnQgPSAoX2NvbnRlbnRTaXplOiBudW1iZXIsIF9pdGVtU2l6ZTogbnVtYmVyKSA9PiBNYXRoLmNlaWwoX2NvbnRlbnRTaXplIC8gKF9pdGVtU2l6ZSB8fCBfY29udGVudFNpemUpKTtcbiAgICAgICAgY29uc3QgY2FsY3VsYXRlTnVtVG9sZXJhdGVkSXRlbXMgPSAoX251bUl0ZW1zOiBudW1iZXIpID0+IE1hdGguY2VpbChfbnVtSXRlbXMgLyAyKTtcbiAgICAgICAgY29uc3QgbnVtSXRlbXNJblZpZXdwb3J0OiBhbnkgPSB0aGlzLmJvdGhcbiAgICAgICAgICAgID8geyByb3dzOiBjYWxjdWxhdGVOdW1JdGVtc0luVmlld3BvcnQoY29udGVudEhlaWdodCwgKDxudW1iZXJbXT50aGlzLl9pdGVtU2l6ZSlbMF0pLCBjb2xzOiBjYWxjdWxhdGVOdW1JdGVtc0luVmlld3BvcnQoY29udGVudFdpZHRoLCAoPG51bWJlcltdPnRoaXMuX2l0ZW1TaXplKVsxXSkgfVxuICAgICAgICAgICAgOiBjYWxjdWxhdGVOdW1JdGVtc0luVmlld3BvcnQodGhpcy5ob3Jpem9udGFsID8gY29udGVudFdpZHRoIDogY29udGVudEhlaWdodCwgPG51bWJlcj50aGlzLl9pdGVtU2l6ZSk7XG5cbiAgICAgICAgY29uc3QgbnVtVG9sZXJhdGVkSXRlbXMgPSB0aGlzLmRfbnVtVG9sZXJhdGVkSXRlbXMgfHwgKHRoaXMuYm90aCA/IFtjYWxjdWxhdGVOdW1Ub2xlcmF0ZWRJdGVtcyhudW1JdGVtc0luVmlld3BvcnQucm93cyksIGNhbGN1bGF0ZU51bVRvbGVyYXRlZEl0ZW1zKG51bUl0ZW1zSW5WaWV3cG9ydC5jb2xzKV0gOiBjYWxjdWxhdGVOdW1Ub2xlcmF0ZWRJdGVtcyhudW1JdGVtc0luVmlld3BvcnQpKTtcblxuICAgICAgICByZXR1cm4geyBudW1JdGVtc0luVmlld3BvcnQsIG51bVRvbGVyYXRlZEl0ZW1zIH07XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlT3B0aW9ucygpIHtcbiAgICAgICAgY29uc3QgeyBudW1JdGVtc0luVmlld3BvcnQsIG51bVRvbGVyYXRlZEl0ZW1zIH0gPSB0aGlzLmNhbGN1bGF0ZU51bUl0ZW1zKCk7XG4gICAgICAgIGNvbnN0IGNhbGN1bGF0ZUxhc3QgPSAoX2ZpcnN0OiBudW1iZXIsIF9udW06IG51bWJlciwgX251bVQ6IG51bWJlciwgX2lzQ29sczogYm9vbGVhbiA9IGZhbHNlKSA9PiB0aGlzLmdldExhc3QoX2ZpcnN0ICsgX251bSArIChfZmlyc3QgPCBfbnVtVCA/IDIgOiAzKSAqIF9udW1ULCBfaXNDb2xzKTtcbiAgICAgICAgY29uc3QgZmlyc3QgPSB0aGlzLmZpcnN0O1xuICAgICAgICBjb25zdCBsYXN0ID0gdGhpcy5ib3RoXG4gICAgICAgICAgICA/IHsgcm93czogY2FsY3VsYXRlTGFzdCh0aGlzLmZpcnN0LnJvd3MsIG51bUl0ZW1zSW5WaWV3cG9ydC5yb3dzLCBudW1Ub2xlcmF0ZWRJdGVtc1swXSksIGNvbHM6IGNhbGN1bGF0ZUxhc3QodGhpcy5maXJzdC5jb2xzLCBudW1JdGVtc0luVmlld3BvcnQuY29scywgbnVtVG9sZXJhdGVkSXRlbXNbMV0sIHRydWUpIH1cbiAgICAgICAgICAgIDogY2FsY3VsYXRlTGFzdCh0aGlzLmZpcnN0LCBudW1JdGVtc0luVmlld3BvcnQsIG51bVRvbGVyYXRlZEl0ZW1zKTtcblxuICAgICAgICB0aGlzLmxhc3QgPSBsYXN0O1xuICAgICAgICB0aGlzLm51bUl0ZW1zSW5WaWV3cG9ydCA9IG51bUl0ZW1zSW5WaWV3cG9ydDtcbiAgICAgICAgdGhpcy5kX251bVRvbGVyYXRlZEl0ZW1zID0gbnVtVG9sZXJhdGVkSXRlbXM7XG5cbiAgICAgICAgaWYgKHRoaXMuc2hvd0xvYWRlcikge1xuICAgICAgICAgICAgdGhpcy5sb2FkZXJBcnIgPSB0aGlzLmJvdGggPyBBcnJheS5mcm9tKHsgbGVuZ3RoOiBudW1JdGVtc0luVmlld3BvcnQucm93cyB9KS5tYXAoKCkgPT4gQXJyYXkuZnJvbSh7IGxlbmd0aDogbnVtSXRlbXNJblZpZXdwb3J0LmNvbHMgfSkpIDogQXJyYXkuZnJvbSh7IGxlbmd0aDogbnVtSXRlbXNJblZpZXdwb3J0IH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2xhenkpIHtcbiAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubGF6eUxvYWRTdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgZmlyc3Q6IHRoaXMuX3N0ZXAgPyAodGhpcy5ib3RoID8geyByb3dzOiAwLCBjb2xzOiBmaXJzdC5jb2xzIH0gOiAwKSA6IGZpcnN0LFxuICAgICAgICAgICAgICAgICAgICBsYXN0OiBNYXRoLm1pbih0aGlzLl9zdGVwID8gdGhpcy5fc3RlcCA6IHRoaXMubGFzdCwgKDxhbnlbXT50aGlzLml0ZW1zKS5sZW5ndGgpXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlRXZlbnRzKCdvbkxhenlMb2FkJywgdGhpcy5sYXp5TG9hZFN0YXRlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlQXV0b1NpemUoKSB7XG4gICAgICAgIGlmICh0aGlzLl9hdXRvU2l6ZSAmJiAhdGhpcy5kX2xvYWRpbmcpIHtcbiAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbnRlbnRFbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRFbC5zdHlsZS5taW5IZWlnaHQgPSB0aGlzLmNvbnRlbnRFbC5zdHlsZS5taW5XaWR0aCA9ICdhdXRvJztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50RWwuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgICAgICAgICAgICAgICAgICAoPEVsZW1lbnRSZWY+dGhpcy5lbGVtZW50Vmlld0NoaWxkKS5uYXRpdmVFbGVtZW50LnN0eWxlLmNvbnRhaW4gPSAnbm9uZSc7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgW2NvbnRlbnRXaWR0aCwgY29udGVudEhlaWdodF0gPSBbRG9tSGFuZGxlci5nZXRXaWR0aCh0aGlzLmNvbnRlbnRFbCksIERvbUhhbmRsZXIuZ2V0SGVpZ2h0KHRoaXMuY29udGVudEVsKV07XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRXaWR0aCAhPT0gdGhpcy5kZWZhdWx0Q29udGVudFdpZHRoICYmICgoPEVsZW1lbnRSZWY+dGhpcy5lbGVtZW50Vmlld0NoaWxkKS5uYXRpdmVFbGVtZW50LnN0eWxlLndpZHRoID0gJycpO1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50SGVpZ2h0ICE9PSB0aGlzLmRlZmF1bHRDb250ZW50SGVpZ2h0ICYmICgoPEVsZW1lbnRSZWY+dGhpcy5lbGVtZW50Vmlld0NoaWxkKS5uYXRpdmVFbGVtZW50LnN0eWxlLmhlaWdodCA9ICcnKTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBbd2lkdGgsIGhlaWdodF0gPSBbRG9tSGFuZGxlci5nZXRXaWR0aCgoPEVsZW1lbnRSZWY+dGhpcy5lbGVtZW50Vmlld0NoaWxkKS5uYXRpdmVFbGVtZW50KSwgRG9tSGFuZGxlci5nZXRIZWlnaHQoKDxFbGVtZW50UmVmPnRoaXMuZWxlbWVudFZpZXdDaGlsZCkubmF0aXZlRWxlbWVudCldO1xuICAgICAgICAgICAgICAgICAgICAodGhpcy5ib3RoIHx8IHRoaXMuaG9yaXpvbnRhbCkgJiYgKCg8RWxlbWVudFJlZj50aGlzLmVsZW1lbnRWaWV3Q2hpbGQpLm5hdGl2ZUVsZW1lbnQuc3R5bGUud2lkdGggPSB3aWR0aCA8IDxudW1iZXI+dGhpcy5kZWZhdWx0V2lkdGggPyB3aWR0aCArICdweCcgOiB0aGlzLl9zY3JvbGxXaWR0aCB8fCB0aGlzLmRlZmF1bHRXaWR0aCArICdweCcpO1xuICAgICAgICAgICAgICAgICAgICAodGhpcy5ib3RoIHx8IHRoaXMudmVydGljYWwpICYmICgoPEVsZW1lbnRSZWY+dGhpcy5lbGVtZW50Vmlld0NoaWxkKS5uYXRpdmVFbGVtZW50LnN0eWxlLmhlaWdodCA9IGhlaWdodCA8IDxudW1iZXI+dGhpcy5kZWZhdWx0SGVpZ2h0ID8gaGVpZ2h0ICsgJ3B4JyA6IHRoaXMuX3Njcm9sbEhlaWdodCB8fCB0aGlzLmRlZmF1bHRIZWlnaHQgKyAncHgnKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRFbC5zdHlsZS5taW5IZWlnaHQgPSB0aGlzLmNvbnRlbnRFbC5zdHlsZS5taW5XaWR0aCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRFbC5zdHlsZS5wb3NpdGlvbiA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAoPEVsZW1lbnRSZWY+dGhpcy5lbGVtZW50Vmlld0NoaWxkKS5uYXRpdmVFbGVtZW50LnN0eWxlLmNvbnRhaW4gPSAnJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldExhc3QobGFzdCA9IDAsIGlzQ29scyA9IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtcyA/IE1hdGgubWluKGlzQ29scyA/ICh0aGlzLl9jb2x1bW5zIHx8IHRoaXMuX2l0ZW1zWzBdKS5sZW5ndGggOiB0aGlzLl9pdGVtcy5sZW5ndGgsIGxhc3QpIDogMDtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50UG9zaXRpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRlbnRFbCkge1xuICAgICAgICAgICAgY29uc3Qgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuY29udGVudEVsKTtcbiAgICAgICAgICAgIGNvbnN0IGxlZnQgPSBwYXJzZUZsb2F0KHN0eWxlLnBhZGRpbmdMZWZ0KSArIE1hdGgubWF4KHBhcnNlRmxvYXQoc3R5bGUubGVmdCkgfHwgMCwgMCk7XG4gICAgICAgICAgICBjb25zdCByaWdodCA9IHBhcnNlRmxvYXQoc3R5bGUucGFkZGluZ1JpZ2h0KSArIE1hdGgubWF4KHBhcnNlRmxvYXQoc3R5bGUucmlnaHQpIHx8IDAsIDApO1xuICAgICAgICAgICAgY29uc3QgdG9wID0gcGFyc2VGbG9hdChzdHlsZS5wYWRkaW5nVG9wKSArIE1hdGgubWF4KHBhcnNlRmxvYXQoc3R5bGUudG9wKSB8fCAwLCAwKTtcbiAgICAgICAgICAgIGNvbnN0IGJvdHRvbSA9IHBhcnNlRmxvYXQoc3R5bGUucGFkZGluZ0JvdHRvbSkgKyBNYXRoLm1heChwYXJzZUZsb2F0KHN0eWxlLmJvdHRvbSkgfHwgMCwgMCk7XG5cbiAgICAgICAgICAgIHJldHVybiB7IGxlZnQsIHJpZ2h0LCB0b3AsIGJvdHRvbSwgeDogbGVmdCArIHJpZ2h0LCB5OiB0b3AgKyBib3R0b20gfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7IGxlZnQ6IDAsIHJpZ2h0OiAwLCB0b3A6IDAsIGJvdHRvbTogMCwgeDogMCwgeTogMCB9O1xuICAgIH1cblxuICAgIHNldFNpemUoKSB7XG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudEVsZW1lbnQgPSB0aGlzLmVsZW1lbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICBjb25zdCB3aWR0aCA9IHRoaXMuX3Njcm9sbFdpZHRoIHx8IGAke3RoaXMuZWxlbWVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoIHx8IHBhcmVudEVsZW1lbnQub2Zmc2V0V2lkdGh9cHhgO1xuICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5fc2Nyb2xsSGVpZ2h0IHx8IGAke3RoaXMuZWxlbWVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCB8fCBwYXJlbnRFbGVtZW50Lm9mZnNldEhlaWdodH1weGA7XG4gICAgICAgICAgICBjb25zdCBzZXRQcm9wID0gKF9uYW1lOiBzdHJpbmcsIF92YWx1ZTogYW55KSA9PiAoKDxFbGVtZW50UmVmPnRoaXMuZWxlbWVudFZpZXdDaGlsZCkubmF0aXZlRWxlbWVudC5zdHlsZVtfbmFtZV0gPSBfdmFsdWUpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5ib3RoIHx8IHRoaXMuaG9yaXpvbnRhbCkge1xuICAgICAgICAgICAgICAgIHNldFByb3AoJ2hlaWdodCcsIGhlaWdodCk7XG4gICAgICAgICAgICAgICAgc2V0UHJvcCgnd2lkdGgnLCB3aWR0aCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNldFByb3AoJ2hlaWdodCcsIGhlaWdodCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRTcGFjZXJTaXplKCkge1xuICAgICAgICBpZiAodGhpcy5faXRlbXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnRQb3MgPSB0aGlzLmdldENvbnRlbnRQb3NpdGlvbigpO1xuICAgICAgICAgICAgY29uc3Qgc2V0UHJvcCA9IChfbmFtZTogc3RyaW5nLCBfdmFsdWU6IGFueSwgX3NpemU6IG51bWJlciwgX2Nwb3M6IG51bWJlciA9IDApID0+ICh0aGlzLnNwYWNlclN0eWxlID0geyAuLi50aGlzLnNwYWNlclN0eWxlLCAuLi57IFtgJHtfbmFtZX1gXTogKF92YWx1ZSB8fCBbXSkubGVuZ3RoICogX3NpemUgKyBfY3BvcyArICdweCcgfSB9KTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuYm90aCkge1xuICAgICAgICAgICAgICAgIHNldFByb3AoJ2hlaWdodCcsIHRoaXMuX2l0ZW1zLCAoPG51bWJlcltdPnRoaXMuX2l0ZW1TaXplKVswXSwgY29udGVudFBvcy55KTtcbiAgICAgICAgICAgICAgICBzZXRQcm9wKCd3aWR0aCcsIHRoaXMuX2NvbHVtbnMgfHwgdGhpcy5faXRlbXNbMV0sICg8bnVtYmVyW10+dGhpcy5faXRlbVNpemUpWzFdLCBjb250ZW50UG9zLngpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhvcml6b250YWwgPyBzZXRQcm9wKCd3aWR0aCcsIHRoaXMuX2NvbHVtbnMgfHwgdGhpcy5faXRlbXMsIDxudW1iZXI+dGhpcy5faXRlbVNpemUsIGNvbnRlbnRQb3MueCkgOiBzZXRQcm9wKCdoZWlnaHQnLCB0aGlzLl9pdGVtcywgPG51bWJlcj50aGlzLl9pdGVtU2l6ZSwgY29udGVudFBvcy55KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldENvbnRlbnRQb3NpdGlvbihwb3M6IGFueSkge1xuICAgICAgICBpZiAodGhpcy5jb250ZW50RWwgJiYgIXRoaXMuX2FwcGVuZE9ubHkpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0ID0gcG9zID8gcG9zLmZpcnN0IDogdGhpcy5maXJzdDtcbiAgICAgICAgICAgIGNvbnN0IGNhbGN1bGF0ZVRyYW5zbGF0ZVZhbCA9IChfZmlyc3Q6IG51bWJlciwgX3NpemU6IG51bWJlcikgPT4gX2ZpcnN0ICogX3NpemU7XG4gICAgICAgICAgICBjb25zdCBzZXRUcmFuc2Zvcm0gPSAoX3ggPSAwLCBfeSA9IDApID0+ICh0aGlzLmNvbnRlbnRTdHlsZSA9IHsgLi4udGhpcy5jb250ZW50U3R5bGUsIC4uLnsgdHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoJHtfeH1weCwgJHtfeX1weCwgMClgIH0gfSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmJvdGgpIHtcbiAgICAgICAgICAgICAgICBzZXRUcmFuc2Zvcm0oY2FsY3VsYXRlVHJhbnNsYXRlVmFsKGZpcnN0LmNvbHMsICg8bnVtYmVyW10+dGhpcy5faXRlbVNpemUpWzFdKSwgY2FsY3VsYXRlVHJhbnNsYXRlVmFsKGZpcnN0LnJvd3MsICg8bnVtYmVyW10+dGhpcy5faXRlbVNpemUpWzBdKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRyYW5zbGF0ZVZhbCA9IGNhbGN1bGF0ZVRyYW5zbGF0ZVZhbChmaXJzdCwgPG51bWJlcj50aGlzLl9pdGVtU2l6ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5ob3Jpem9udGFsID8gc2V0VHJhbnNmb3JtKHRyYW5zbGF0ZVZhbCwgMCkgOiBzZXRUcmFuc2Zvcm0oMCwgdHJhbnNsYXRlVmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uU2Nyb2xsUG9zaXRpb25DaGFuZ2UoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgY29uc3QgY29udGVudFBvcyA9IHRoaXMuZ2V0Q29udGVudFBvc2l0aW9uKCk7XG4gICAgICAgIGNvbnN0IGNhbGN1bGF0ZVNjcm9sbFBvcyA9IChfcG9zOiBudW1iZXIsIF9jcG9zOiBudW1iZXIpID0+IChfcG9zID8gKF9wb3MgPiBfY3BvcyA/IF9wb3MgLSBfY3BvcyA6IF9wb3MpIDogMCk7XG4gICAgICAgIGNvbnN0IGNhbGN1bGF0ZUN1cnJlbnRJbmRleCA9IChfcG9zOiBudW1iZXIsIF9zaXplOiBudW1iZXIpID0+IE1hdGguZmxvb3IoX3BvcyAvIChfc2l6ZSB8fCBfcG9zKSk7XG4gICAgICAgIGNvbnN0IGNhbGN1bGF0ZVRyaWdnZXJJbmRleCA9IChfY3VycmVudEluZGV4OiBudW1iZXIsIF9maXJzdDogbnVtYmVyLCBfbGFzdDogbnVtYmVyLCBfbnVtOiBudW1iZXIsIF9udW1UOiBudW1iZXIsIF9pc1Njcm9sbERvd25PclJpZ2h0OiBhbnkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBfY3VycmVudEluZGV4IDw9IF9udW1UID8gX251bVQgOiBfaXNTY3JvbGxEb3duT3JSaWdodCA/IF9sYXN0IC0gX251bSAtIF9udW1UIDogX2ZpcnN0ICsgX251bVQgLSAxO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjYWxjdWxhdGVGaXJzdCA9IChfY3VycmVudEluZGV4OiBudW1iZXIsIF90cmlnZ2VySW5kZXg6IG51bWJlciwgX2ZpcnN0OiBudW1iZXIsIF9sYXN0OiBudW1iZXIsIF9udW06IG51bWJlciwgX251bVQ6IG51bWJlciwgX2lzU2Nyb2xsRG93bk9yUmlnaHQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgaWYgKF9jdXJyZW50SW5kZXggPD0gX251bVQpIHJldHVybiAwO1xuICAgICAgICAgICAgZWxzZSByZXR1cm4gTWF0aC5tYXgoMCwgX2lzU2Nyb2xsRG93bk9yUmlnaHQgPyAoX2N1cnJlbnRJbmRleCA8IF90cmlnZ2VySW5kZXggPyBfZmlyc3QgOiBfY3VycmVudEluZGV4IC0gX251bVQpIDogX2N1cnJlbnRJbmRleCA+IF90cmlnZ2VySW5kZXggPyBfZmlyc3QgOiBfY3VycmVudEluZGV4IC0gMiAqIF9udW1UKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY2FsY3VsYXRlTGFzdCA9IChfY3VycmVudEluZGV4OiBudW1iZXIsIF9maXJzdDogbnVtYmVyLCBfbGFzdDogbnVtYmVyLCBfbnVtOiBudW1iZXIsIF9udW1UOiBudW1iZXIsIF9pc0NvbHMgPSBmYWxzZSkgPT4ge1xuICAgICAgICAgICAgbGV0IGxhc3RWYWx1ZSA9IF9maXJzdCArIF9udW0gKyAyICogX251bVQ7XG5cbiAgICAgICAgICAgIGlmIChfY3VycmVudEluZGV4ID49IF9udW1UKSB7XG4gICAgICAgICAgICAgICAgbGFzdFZhbHVlICs9IF9udW1UICsgMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TGFzdChsYXN0VmFsdWUsIF9pc0NvbHMpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHNjcm9sbFRvcCA9IGNhbGN1bGF0ZVNjcm9sbFBvcygoPEhUTUxFbGVtZW50PnRhcmdldCkuc2Nyb2xsVG9wLCBjb250ZW50UG9zLnRvcCk7XG4gICAgICAgIGNvbnN0IHNjcm9sbExlZnQgPSBjYWxjdWxhdGVTY3JvbGxQb3MoKDxIVE1MRWxlbWVudD50YXJnZXQpLnNjcm9sbExlZnQsIGNvbnRlbnRQb3MubGVmdCk7XG5cbiAgICAgICAgbGV0IG5ld0ZpcnN0ID0gdGhpcy5ib3RoID8geyByb3dzOiAwLCBjb2xzOiAwIH0gOiAwO1xuICAgICAgICBsZXQgbmV3TGFzdCA9IHRoaXMubGFzdDtcbiAgICAgICAgbGV0IGlzUmFuZ2VDaGFuZ2VkID0gZmFsc2U7XG4gICAgICAgIGxldCBuZXdTY3JvbGxQb3MgPSB0aGlzLmxhc3RTY3JvbGxQb3M7XG5cbiAgICAgICAgaWYgKHRoaXMuYm90aCkge1xuICAgICAgICAgICAgY29uc3QgaXNTY3JvbGxEb3duID0gdGhpcy5sYXN0U2Nyb2xsUG9zLnRvcCA8PSBzY3JvbGxUb3A7XG4gICAgICAgICAgICBjb25zdCBpc1Njcm9sbFJpZ2h0ID0gdGhpcy5sYXN0U2Nyb2xsUG9zLmxlZnQgPD0gc2Nyb2xsTGVmdDtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLl9hcHBlbmRPbmx5IHx8ICh0aGlzLl9hcHBlbmRPbmx5ICYmIChpc1Njcm9sbERvd24gfHwgaXNTY3JvbGxSaWdodCkpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudEluZGV4ID0geyByb3dzOiBjYWxjdWxhdGVDdXJyZW50SW5kZXgoc2Nyb2xsVG9wLCAoPG51bWJlcltdPnRoaXMuX2l0ZW1TaXplKVswXSksIGNvbHM6IGNhbGN1bGF0ZUN1cnJlbnRJbmRleChzY3JvbGxMZWZ0LCAoPG51bWJlcltdPnRoaXMuX2l0ZW1TaXplKVsxXSkgfTtcbiAgICAgICAgICAgICAgICBjb25zdCB0cmlnZ2VySW5kZXggPSB7XG4gICAgICAgICAgICAgICAgICAgIHJvd3M6IGNhbGN1bGF0ZVRyaWdnZXJJbmRleChjdXJyZW50SW5kZXgucm93cywgdGhpcy5maXJzdC5yb3dzLCB0aGlzLmxhc3Qucm93cywgdGhpcy5udW1JdGVtc0luVmlld3BvcnQucm93cywgdGhpcy5kX251bVRvbGVyYXRlZEl0ZW1zWzBdLCBpc1Njcm9sbERvd24pLFxuICAgICAgICAgICAgICAgICAgICBjb2xzOiBjYWxjdWxhdGVUcmlnZ2VySW5kZXgoY3VycmVudEluZGV4LmNvbHMsIHRoaXMuZmlyc3QuY29scywgdGhpcy5sYXN0LmNvbHMsIHRoaXMubnVtSXRlbXNJblZpZXdwb3J0LmNvbHMsIHRoaXMuZF9udW1Ub2xlcmF0ZWRJdGVtc1sxXSwgaXNTY3JvbGxSaWdodClcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgbmV3Rmlyc3QgPSB7XG4gICAgICAgICAgICAgICAgICAgIHJvd3M6IGNhbGN1bGF0ZUZpcnN0KGN1cnJlbnRJbmRleC5yb3dzLCB0cmlnZ2VySW5kZXgucm93cywgdGhpcy5maXJzdC5yb3dzLCB0aGlzLmxhc3Qucm93cywgdGhpcy5udW1JdGVtc0luVmlld3BvcnQucm93cywgdGhpcy5kX251bVRvbGVyYXRlZEl0ZW1zWzBdLCBpc1Njcm9sbERvd24pLFxuICAgICAgICAgICAgICAgICAgICBjb2xzOiBjYWxjdWxhdGVGaXJzdChjdXJyZW50SW5kZXguY29scywgdHJpZ2dlckluZGV4LmNvbHMsIHRoaXMuZmlyc3QuY29scywgdGhpcy5sYXN0LmNvbHMsIHRoaXMubnVtSXRlbXNJblZpZXdwb3J0LmNvbHMsIHRoaXMuZF9udW1Ub2xlcmF0ZWRJdGVtc1sxXSwgaXNTY3JvbGxSaWdodClcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIG5ld0xhc3QgPSB7XG4gICAgICAgICAgICAgICAgICAgIHJvd3M6IGNhbGN1bGF0ZUxhc3QoY3VycmVudEluZGV4LnJvd3MsIG5ld0ZpcnN0LnJvd3MsIHRoaXMubGFzdC5yb3dzLCB0aGlzLm51bUl0ZW1zSW5WaWV3cG9ydC5yb3dzLCB0aGlzLmRfbnVtVG9sZXJhdGVkSXRlbXNbMF0pLFxuICAgICAgICAgICAgICAgICAgICBjb2xzOiBjYWxjdWxhdGVMYXN0KGN1cnJlbnRJbmRleC5jb2xzLCBuZXdGaXJzdC5jb2xzLCB0aGlzLmxhc3QuY29scywgdGhpcy5udW1JdGVtc0luVmlld3BvcnQuY29scywgdGhpcy5kX251bVRvbGVyYXRlZEl0ZW1zWzFdLCB0cnVlKVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpc1JhbmdlQ2hhbmdlZCA9IG5ld0ZpcnN0LnJvd3MgIT09IHRoaXMuZmlyc3Qucm93cyB8fCBuZXdMYXN0LnJvd3MgIT09IHRoaXMubGFzdC5yb3dzIHx8IG5ld0ZpcnN0LmNvbHMgIT09IHRoaXMuZmlyc3QuY29scyB8fCBuZXdMYXN0LmNvbHMgIT09IHRoaXMubGFzdC5jb2xzIHx8IHRoaXMuaXNSYW5nZUNoYW5nZWQ7XG4gICAgICAgICAgICAgICAgbmV3U2Nyb2xsUG9zID0geyB0b3A6IHNjcm9sbFRvcCwgbGVmdDogc2Nyb2xsTGVmdCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3Qgc2Nyb2xsUG9zID0gdGhpcy5ob3Jpem9udGFsID8gc2Nyb2xsTGVmdCA6IHNjcm9sbFRvcDtcbiAgICAgICAgICAgIGNvbnN0IGlzU2Nyb2xsRG93bk9yUmlnaHQgPSB0aGlzLmxhc3RTY3JvbGxQb3MgPD0gc2Nyb2xsUG9zO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2FwcGVuZE9ubHkgfHwgKHRoaXMuX2FwcGVuZE9ubHkgJiYgaXNTY3JvbGxEb3duT3JSaWdodCkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50SW5kZXggPSBjYWxjdWxhdGVDdXJyZW50SW5kZXgoc2Nyb2xsUG9zLCA8bnVtYmVyPnRoaXMuX2l0ZW1TaXplKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0cmlnZ2VySW5kZXggPSBjYWxjdWxhdGVUcmlnZ2VySW5kZXgoY3VycmVudEluZGV4LCB0aGlzLmZpcnN0LCB0aGlzLmxhc3QsIHRoaXMubnVtSXRlbXNJblZpZXdwb3J0LCB0aGlzLmRfbnVtVG9sZXJhdGVkSXRlbXMsIGlzU2Nyb2xsRG93bk9yUmlnaHQpO1xuXG4gICAgICAgICAgICAgICAgbmV3Rmlyc3QgPSBjYWxjdWxhdGVGaXJzdChjdXJyZW50SW5kZXgsIHRyaWdnZXJJbmRleCwgdGhpcy5maXJzdCwgdGhpcy5sYXN0LCB0aGlzLm51bUl0ZW1zSW5WaWV3cG9ydCwgdGhpcy5kX251bVRvbGVyYXRlZEl0ZW1zLCBpc1Njcm9sbERvd25PclJpZ2h0KTtcbiAgICAgICAgICAgICAgICBuZXdMYXN0ID0gY2FsY3VsYXRlTGFzdChjdXJyZW50SW5kZXgsIG5ld0ZpcnN0LCB0aGlzLmxhc3QsIHRoaXMubnVtSXRlbXNJblZpZXdwb3J0LCB0aGlzLmRfbnVtVG9sZXJhdGVkSXRlbXMpO1xuICAgICAgICAgICAgICAgIGlzUmFuZ2VDaGFuZ2VkID0gbmV3Rmlyc3QgIT09IHRoaXMuZmlyc3QgfHwgbmV3TGFzdCAhPT0gdGhpcy5sYXN0IHx8IHRoaXMuaXNSYW5nZUNoYW5nZWQ7XG4gICAgICAgICAgICAgICAgbmV3U2Nyb2xsUG9zID0gc2Nyb2xsUG9zO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZpcnN0OiBuZXdGaXJzdCxcbiAgICAgICAgICAgIGxhc3Q6IG5ld0xhc3QsXG4gICAgICAgICAgICBpc1JhbmdlQ2hhbmdlZCxcbiAgICAgICAgICAgIHNjcm9sbFBvczogbmV3U2Nyb2xsUG9zXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgb25TY3JvbGxDaGFuZ2UoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHsgZmlyc3QsIGxhc3QsIGlzUmFuZ2VDaGFuZ2VkLCBzY3JvbGxQb3MgfSA9IHRoaXMub25TY3JvbGxQb3NpdGlvbkNoYW5nZShldmVudCk7XG5cbiAgICAgICAgaWYgKGlzUmFuZ2VDaGFuZ2VkKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdTdGF0ZSA9IHsgZmlyc3QsIGxhc3QgfTtcblxuICAgICAgICAgICAgdGhpcy5zZXRDb250ZW50UG9zaXRpb24obmV3U3RhdGUpO1xuXG4gICAgICAgICAgICB0aGlzLmZpcnN0ID0gZmlyc3Q7XG4gICAgICAgICAgICB0aGlzLmxhc3QgPSBsYXN0O1xuICAgICAgICAgICAgdGhpcy5sYXN0U2Nyb2xsUG9zID0gc2Nyb2xsUG9zO1xuXG4gICAgICAgICAgICB0aGlzLmhhbmRsZUV2ZW50cygnb25TY3JvbGxJbmRleENoYW5nZScsIG5ld1N0YXRlKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX2xhenkgJiYgdGhpcy5pc1BhZ2VDaGFuZ2VkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGF6eUxvYWRTdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgZmlyc3Q6IHRoaXMuX3N0ZXAgPyBNYXRoLm1pbih0aGlzLmdldFBhZ2VCeUZpcnN0KCkgKiB0aGlzLl9zdGVwLCAoPGFueVtdPnRoaXMuaXRlbXMpLmxlbmd0aCAtIHRoaXMuX3N0ZXApIDogZmlyc3QsXG4gICAgICAgICAgICAgICAgICAgIGxhc3Q6IE1hdGgubWluKHRoaXMuX3N0ZXAgPyAodGhpcy5nZXRQYWdlQnlGaXJzdCgpICsgMSkgKiB0aGlzLl9zdGVwIDogbGFzdCwgKDxhbnlbXT50aGlzLml0ZW1zKS5sZW5ndGgpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBjb25zdCBpc0xhenlTdGF0ZUNoYW5nZWQgPSB0aGlzLmxhenlMb2FkU3RhdGUuZmlyc3QgIT09IGxhenlMb2FkU3RhdGUuZmlyc3QgfHwgdGhpcy5sYXp5TG9hZFN0YXRlLmxhc3QgIT09IGxhenlMb2FkU3RhdGUubGFzdDtcblxuICAgICAgICAgICAgICAgIGlzTGF6eVN0YXRlQ2hhbmdlZCAmJiB0aGlzLmhhbmRsZUV2ZW50cygnb25MYXp5TG9hZCcsIGxhenlMb2FkU3RhdGUpO1xuICAgICAgICAgICAgICAgIHRoaXMubGF6eUxvYWRTdGF0ZSA9IGxhenlMb2FkU3RhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkNvbnRhaW5lclNjcm9sbChldmVudDogRXZlbnQpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVFdmVudHMoJ29uU2Nyb2xsJywgeyBvcmlnaW5hbEV2ZW50OiBldmVudCB9KTtcblxuICAgICAgICBpZiAodGhpcy5fZGVsYXkgJiYgdGhpcy5pc1BhZ2VDaGFuZ2VkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zY3JvbGxUaW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuc2Nyb2xsVGltZW91dCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5kX2xvYWRpbmcgJiYgdGhpcy5zaG93TG9hZGVyKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBpc1JhbmdlQ2hhbmdlZCB9ID0gdGhpcy5vblNjcm9sbFBvc2l0aW9uQ2hhbmdlKGV2ZW50KTtcbiAgICAgICAgICAgICAgICBjb25zdCBjaGFuZ2VkID0gaXNSYW5nZUNoYW5nZWQgfHwgKHRoaXMuX3N0ZXAgPyB0aGlzLmlzUGFnZUNoYW5nZWQgOiBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoY2hhbmdlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRfbG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNjcm9sbFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uU2Nyb2xsQ2hhbmdlKGV2ZW50KTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRfbG9hZGluZyAmJiB0aGlzLnNob3dMb2FkZXIgJiYgKCF0aGlzLl9sYXp5IHx8IHRoaXMuX2xvYWRpbmcgPT09IHVuZGVmaW5lZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kX2xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlID0gdGhpcy5nZXRQYWdlQnlGaXJzdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCB0aGlzLl9kZWxheSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAhdGhpcy5kX2xvYWRpbmcgJiYgdGhpcy5vblNjcm9sbENoYW5nZShldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiaW5kUmVzaXplTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMud2luZG93UmVzaXplTGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB3aW5kb3cgPSB0aGlzLmRvY3VtZW50LmRlZmF1bHRWaWV3IGFzIFdpbmRvdztcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXZlbnQgPSBEb21IYW5kbGVyLmlzVG91Y2hEZXZpY2UoKSA/ICdvcmllbnRhdGlvbmNoYW5nZScgOiAncmVzaXplJztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53aW5kb3dSZXNpemVMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHdpbmRvdywgZXZlbnQsIHRoaXMub25XaW5kb3dSZXNpemUuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmJpbmRSZXNpemVMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMud2luZG93UmVzaXplTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMud2luZG93UmVzaXplTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMud2luZG93UmVzaXplTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25XaW5kb3dSZXNpemUoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlc2l6ZVRpbWVvdXQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnJlc2l6ZVRpbWVvdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZXNpemVUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoRG9tSGFuZGxlci5pc1Zpc2libGUodGhpcy5lbGVtZW50Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50KSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IFt3aWR0aCwgaGVpZ2h0XSA9IFtEb21IYW5kbGVyLmdldFdpZHRoKHRoaXMuZWxlbWVudFZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudCksIERvbUhhbmRsZXIuZ2V0SGVpZ2h0KHRoaXMuZWxlbWVudFZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudCldO1xuICAgICAgICAgICAgICAgIGNvbnN0IFtpc0RpZmZXaWR0aCwgaXNEaWZmSGVpZ2h0XSA9IFt3aWR0aCAhPT0gdGhpcy5kZWZhdWx0V2lkdGgsIGhlaWdodCAhPT0gdGhpcy5kZWZhdWx0SGVpZ2h0XTtcbiAgICAgICAgICAgICAgICBjb25zdCByZWluaXQgPSB0aGlzLmJvdGggPyBpc0RpZmZXaWR0aCB8fCBpc0RpZmZIZWlnaHQgOiB0aGlzLmhvcml6b250YWwgPyBpc0RpZmZXaWR0aCA6IHRoaXMudmVydGljYWwgPyBpc0RpZmZIZWlnaHQgOiBmYWxzZTtcblxuICAgICAgICAgICAgICAgIHJlaW5pdCAmJlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZF9udW1Ub2xlcmF0ZWRJdGVtcyA9IHRoaXMuX251bVRvbGVyYXRlZEl0ZW1zO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0V2lkdGggPSB3aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdEhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdENvbnRlbnRXaWR0aCA9IERvbUhhbmRsZXIuZ2V0V2lkdGgodGhpcy5jb250ZW50RWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0Q29udGVudEhlaWdodCA9IERvbUhhbmRsZXIuZ2V0SGVpZ2h0KHRoaXMuY29udGVudEVsKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzLl9yZXNpemVEZWxheSk7XG4gICAgfVxuXG4gICAgaGFuZGxlRXZlbnRzKG5hbWU6IHN0cmluZywgcGFyYW1zOiBhbnkpIHtcbiAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMgJiYgKDxhbnk+dGhpcy5vcHRpb25zKVtuYW1lXSA/ICg8YW55PnRoaXMub3B0aW9ucylbbmFtZV0ocGFyYW1zKSA6IHRoaXNbbmFtZV0uZW1pdChwYXJhbXMpO1xuICAgIH1cblxuICAgIGdldENvbnRlbnRPcHRpb25zKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29udGVudFN0eWxlQ2xhc3M6IGBwLXNjcm9sbGVyLWNvbnRlbnQgJHt0aGlzLmRfbG9hZGluZyA/ICdwLXNjcm9sbGVyLWxvYWRpbmcnIDogJyd9YCxcbiAgICAgICAgICAgIGl0ZW1zOiB0aGlzLmxvYWRlZEl0ZW1zLFxuICAgICAgICAgICAgZ2V0SXRlbU9wdGlvbnM6IChpbmRleDogbnVtYmVyKSA9PiB0aGlzLmdldE9wdGlvbnMoaW5kZXgpLFxuICAgICAgICAgICAgbG9hZGluZzogdGhpcy5kX2xvYWRpbmcsXG4gICAgICAgICAgICBnZXRMb2FkZXJPcHRpb25zOiAoaW5kZXg6IG51bWJlciwgb3B0aW9ucz86IGFueSkgPT4gdGhpcy5nZXRMb2FkZXJPcHRpb25zKGluZGV4LCBvcHRpb25zKSxcbiAgICAgICAgICAgIGl0ZW1TaXplOiB0aGlzLl9pdGVtU2l6ZSxcbiAgICAgICAgICAgIHJvd3M6IHRoaXMubG9hZGVkUm93cyxcbiAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMubG9hZGVkQ29sdW1ucyxcbiAgICAgICAgICAgIHNwYWNlclN0eWxlOiB0aGlzLnNwYWNlclN0eWxlLFxuICAgICAgICAgICAgY29udGVudFN0eWxlOiB0aGlzLmNvbnRlbnRTdHlsZSxcbiAgICAgICAgICAgIHZlcnRpY2FsOiB0aGlzLnZlcnRpY2FsLFxuICAgICAgICAgICAgaG9yaXpvbnRhbDogdGhpcy5ob3Jpem9udGFsLFxuICAgICAgICAgICAgYm90aDogdGhpcy5ib3RoXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZ2V0T3B0aW9ucyhyZW5kZXJlZEluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgY291bnQgPSAodGhpcy5faXRlbXMgfHwgW10pLmxlbmd0aDtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmJvdGggPyB0aGlzLmZpcnN0LnJvd3MgKyByZW5kZXJlZEluZGV4IDogdGhpcy5maXJzdCArIHJlbmRlcmVkSW5kZXg7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGluZGV4LFxuICAgICAgICAgICAgY291bnQsXG4gICAgICAgICAgICBmaXJzdDogaW5kZXggPT09IDAsXG4gICAgICAgICAgICBsYXN0OiBpbmRleCA9PT0gY291bnQgLSAxLFxuICAgICAgICAgICAgZXZlbjogaW5kZXggJSAyID09PSAwLFxuICAgICAgICAgICAgb2RkOiBpbmRleCAlIDIgIT09IDBcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXRMb2FkZXJPcHRpb25zKGluZGV4OiBudW1iZXIsIGV4dE9wdGlvbnM6IGFueSkge1xuICAgICAgICBjb25zdCBjb3VudCA9IHRoaXMubG9hZGVyQXJyLmxlbmd0aDtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgICBjb3VudCxcbiAgICAgICAgICAgIGZpcnN0OiBpbmRleCA9PT0gMCxcbiAgICAgICAgICAgIGxhc3Q6IGluZGV4ID09PSBjb3VudCAtIDEsXG4gICAgICAgICAgICBldmVuOiBpbmRleCAlIDIgPT09IDAsXG4gICAgICAgICAgICBvZGQ6IGluZGV4ICUgMiAhPT0gMCxcbiAgICAgICAgICAgIC4uLmV4dE9wdGlvbnNcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgU2hhcmVkTW9kdWxlLCBTcGlubmVySWNvbl0sXG4gICAgZXhwb3J0czogW1Njcm9sbGVyLCBTaGFyZWRNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW1Njcm9sbGVyXVxufSlcbmV4cG9ydCBjbGFzcyBTY3JvbGxlck1vZHVsZSB7fVxuIl19