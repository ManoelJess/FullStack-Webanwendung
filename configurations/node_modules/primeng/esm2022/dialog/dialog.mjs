import { animate, animation, style, transition, trigger, useAnimation } from '@angular/animations';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, ContentChildren, EventEmitter, Inject, Input, NgModule, Output, PLATFORM_ID, ViewChild, ViewEncapsulation } from '@angular/core';
import { Footer, Header, PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { FocusTrapModule } from 'primeng/focustrap';
import { TimesIcon } from 'primeng/icons/times';
import { WindowMaximizeIcon } from 'primeng/icons/windowmaximize';
import { WindowMinimizeIcon } from 'primeng/icons/windowminimize';
import { RippleModule } from 'primeng/ripple';
import { UniqueComponentId, ZIndexUtils } from 'primeng/utils';
import * as i0 from "@angular/core";
import * as i1 from "primeng/api";
import * as i2 from "@angular/common";
import * as i3 from "primeng/focustrap";
import * as i4 from "primeng/ripple";
const showAnimation = animation([style({ transform: '{{transform}}', opacity: 0 }), animate('{{transition}}')]);
const hideAnimation = animation([animate('{{transition}}', style({ transform: '{{transform}}', opacity: 0 }))]);
/**
 * Dialog is a container to display content in an overlay window.
 * @group Components
 */
export class Dialog {
    document;
    platformId;
    el;
    renderer;
    zone;
    cd;
    config;
    /**
     * Title text of the dialog.
     * @group Props
     */
    header;
    /**
     * Enables dragging to change the position using header.
     * @group Props
     */
    draggable = true;
    /**
     * Enables resizing of the content.
     * @group Props
     */
    resizable = true;
    /**
     * Defines the left offset of dialog.
     * @group Props
     * @deprecated positionLeft property is deprecated.
     */
    get positionLeft() {
        return 0;
    }
    set positionLeft(_positionLeft) {
        console.log('positionLeft property is deprecated.');
    }
    /**
     * Defines the top offset of dialog.
     * @group Props
     * @deprecated positionTop property is deprecated.
     */
    get positionTop() {
        return 0;
    }
    set positionTop(_positionTop) {
        console.log('positionTop property is deprecated.');
    }
    /**
     * Style of the content section.
     * @group Props
     */
    contentStyle;
    /**
     * Style class of the content.
     * @group Props
     */
    contentStyleClass;
    /**
     * Defines if background should be blocked when dialog is displayed.
     * @group Props
     */
    modal = false;
    /**
     * Specifies if pressing escape key should hide the dialog.
     * @group Props
     */
    closeOnEscape = true;
    /**
     * Specifies if clicking the modal background should hide the dialog.
     * @group Props
     */
    dismissableMask = false;
    /**
     * When enabled dialog is displayed in RTL direction.
     * @group Props
     */
    rtl = false;
    /**
     * Adds a close icon to the header to hide the dialog.
     * @group Props
     */
    closable = true;
    /**
     * Defines if the component is responsive.
     * @group Props
     * @deprecated Responsive property is deprecated.
     */
    get responsive() {
        return false;
    }
    set responsive(_responsive) {
        console.log('Responsive property is deprecated.');
    }
    /**
     * Target element to attach the dialog, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @group Props
     */
    appendTo;
    /**
     * Object literal to define widths per screen size.
     * @group Props
     */
    breakpoints;
    /**
     * Style class of the component.
     * @group Props
     */
    styleClass;
    /**
     * Style class of the mask.
     * @group Props
     */
    maskStyleClass;
    /**
     * Whether to show the header or not.
     * @group Props
     */
    showHeader = true;
    /**
     * Defines the breakpoint of the component responsive.
     * @group Props
     * @deprecated Breakpoint property is not utilized and deprecated. Use breakpoints or CSS media queries instead.
     */
    get breakpoint() {
        return 649;
    }
    set breakpoint(_breakpoint) {
        console.log('Breakpoint property is not utilized and deprecated, use breakpoints or CSS media queries instead.');
    }
    /**
     * Whether background scroll should be blocked when dialog is visible.
     * @group Props
     */
    blockScroll = false;
    /**
     * Whether to automatically manage layering.
     * @group Props
     */
    autoZIndex = true;
    /**
     * Base zIndex value to use in layering.
     * @group Props
     */
    baseZIndex = 0;
    /**
     * Minimum value for the left coordinate of dialog in dragging.
     * @group Props
     */
    minX = 0;
    /**
     * Minimum value for the top coordinate of dialog in dragging.
     * @group Props
     */
    minY = 0;
    /**
     * When enabled, first button receives focus on show.
     * @group Props
     */
    focusOnShow = true;
    /**
     * Whether the dialog can be displayed full screen.
     * @group Props
     */
    maximizable = false;
    /**
     * Keeps dialog in the viewport.
     * @group Props
     */
    keepInViewport = true;
    /**
     * When enabled, can only focus on elements inside the dialog.
     * @group Props
     */
    focusTrap = true;
    /**
     * Transition options of the animation.
     * @group Props
     */
    transitionOptions = '150ms cubic-bezier(0, 0, 0.2, 1)';
    /**
     * Name of the close icon.
     * @group Props
     */
    closeIcon;
    /**
     * Defines a string that labels the close button for accessibility.
     * @group Props
     */
    closeAriaLabel;
    /**
     * Index of the close button in tabbing order.
     * @group Props
     */
    closeTabindex = '-1';
    /**
     * Name of the minimize icon.
     * @group Props
     */
    minimizeIcon;
    /**
     * Name of the maximize icon.
     * @group Props
     */
    maximizeIcon;
    /**
     * Specifies the visibility of the dialog.
     * @group Props
     */
    get visible() {
        return this._visible;
    }
    set visible(value) {
        this._visible = value;
        if (this._visible && !this.maskVisible) {
            this.maskVisible = true;
        }
    }
    /**
     * Inline style of the component.
     * @group Props
     */
    get style() {
        return this._style;
    }
    set style(value) {
        if (value) {
            this._style = { ...value };
            this.originalStyle = value;
        }
    }
    /**
     * Position of the dialog.
     * @group Props
     */
    get position() {
        return this._position;
    }
    set position(value) {
        this._position = value;
        switch (value) {
            case 'topleft':
            case 'bottomleft':
            case 'left':
                this.transformOptions = 'translate3d(-100%, 0px, 0px)';
                break;
            case 'topright':
            case 'bottomright':
            case 'right':
                this.transformOptions = 'translate3d(100%, 0px, 0px)';
                break;
            case 'bottom':
                this.transformOptions = 'translate3d(0px, 100%, 0px)';
                break;
            case 'top':
                this.transformOptions = 'translate3d(0px, -100%, 0px)';
                break;
            default:
                this.transformOptions = 'scale(0.7)';
                break;
        }
    }
    /**
     * Callback to invoke when dialog is shown.
     * @group Emits
     */
    onShow = new EventEmitter();
    /**
     * Callback to invoke when dialog is hidden.
     * @group Emits
     */
    onHide = new EventEmitter();
    /**
     * This EventEmitter is used to notify changes in the visibility state of a component.
     * @param {boolean} value - New value.
     * @group Emits
     */
    visibleChange = new EventEmitter();
    /**
     * Callback to invoke when dialog resizing is initiated.
     * @param {MouseEvent} event - Mouse event.
     * @group Emits
     */
    onResizeInit = new EventEmitter();
    /**
     * Callback to invoke when dialog resizing is completed.
     * @param {MouseEvent} event - Mouse event.
     * @group Emits
     */
    onResizeEnd = new EventEmitter();
    /**
     * Callback to invoke when dialog dragging is completed.
     * @param {DragEvent} event - Drag event.
     * @group Emits
     */
    onDragEnd = new EventEmitter();
    /**
     * Callback to invoke when dialog maximized or unmaximized.
     * @group Emits
     */
    onMaximize = new EventEmitter();
    headerFacet;
    footerFacet;
    templates;
    headerViewChild;
    contentViewChild;
    footerViewChild;
    headerTemplate;
    contentTemplate;
    footerTemplate;
    maximizeIconTemplate;
    closeIconTemplate;
    minimizeIconTemplate;
    _visible = false;
    maskVisible;
    container;
    wrapper;
    dragging;
    ariaLabelledBy;
    documentDragListener;
    documentDragEndListener;
    resizing;
    documentResizeListener;
    documentResizeEndListener;
    documentEscapeListener;
    maskClickListener;
    lastPageX;
    lastPageY;
    preventVisibleChangePropagation;
    maximized;
    preMaximizeContentHeight;
    preMaximizeContainerWidth;
    preMaximizeContainerHeight;
    preMaximizePageX;
    preMaximizePageY;
    id = UniqueComponentId();
    _style = {};
    _position = 'center';
    originalStyle;
    transformOptions = 'scale(0.7)';
    styleElement;
    window;
    constructor(document, platformId, el, renderer, zone, cd, config) {
        this.document = document;
        this.platformId = platformId;
        this.el = el;
        this.renderer = renderer;
        this.zone = zone;
        this.cd = cd;
        this.config = config;
        this.window = this.document.defaultView;
    }
    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                case 'footer':
                    this.footerTemplate = item.template;
                    break;
                case 'closeicon':
                    this.closeIconTemplate = item.template;
                    break;
                case 'maximizeicon':
                    this.maximizeIconTemplate = item.template;
                    break;
                case 'minimizeicon':
                    this.minimizeIconTemplate = item.template;
                    break;
                default:
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }
    ngOnInit() {
        if (this.breakpoints) {
            this.createStyle();
        }
    }
    getAriaLabelledBy() {
        return this.header !== null ? UniqueComponentId() + '_header' : null;
    }
    focus() {
        let focusable = DomHandler.findSingle(this.container, '[autofocus]');
        if (focusable) {
            this.zone.runOutsideAngular(() => {
                setTimeout(() => focusable.focus(), 5);
            });
        }
    }
    close(event) {
        this.visibleChange.emit(false);
        event.preventDefault();
    }
    enableModality() {
        if (this.closable && this.dismissableMask) {
            this.maskClickListener = this.renderer.listen(this.wrapper, 'mousedown', (event) => {
                if (this.wrapper && this.wrapper.isSameNode(event.target)) {
                    this.close(event);
                }
            });
        }
        if (this.modal) {
            DomHandler.blockBodyScroll();
        }
    }
    disableModality() {
        if (this.wrapper) {
            if (this.dismissableMask) {
                this.unbindMaskClickListener();
            }
            if (this.modal) {
                DomHandler.unblockBodyScroll();
            }
            if (!this.cd.destroyed) {
                this.cd.detectChanges();
            }
        }
    }
    maximize() {
        this.maximized = !this.maximized;
        if (!this.modal && !this.blockScroll) {
            if (this.maximized) {
                DomHandler.blockBodyScroll();
            }
            else {
                DomHandler.unblockBodyScroll();
            }
        }
        this.onMaximize.emit({ maximized: this.maximized });
    }
    unbindMaskClickListener() {
        if (this.maskClickListener) {
            this.maskClickListener();
            this.maskClickListener = null;
        }
    }
    moveOnTop() {
        if (this.autoZIndex) {
            ZIndexUtils.set('modal', this.container, this.baseZIndex + this.config.zIndex.modal);
            this.wrapper.style.zIndex = String(parseInt(this.container.style.zIndex, 10) - 1);
        }
    }
    createStyle() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.styleElement) {
                this.styleElement = this.renderer.createElement('style');
                this.styleElement.type = 'text/css';
                this.renderer.appendChild(this.document.head, this.styleElement);
                let innerHTML = '';
                for (let breakpoint in this.breakpoints) {
                    innerHTML += `
                        @media screen and (max-width: ${breakpoint}) {
                            .p-dialog[${this.id}]:not(.p-dialog-maximized) {
                                width: ${this.breakpoints[breakpoint]} !important;
                            }
                        }
                    `;
                }
                this.renderer.setProperty(this.styleElement, 'innerHTML', innerHTML);
            }
        }
    }
    initDrag(event) {
        if (DomHandler.hasClass(event.target, 'p-dialog-header-icon') || DomHandler.hasClass(event.target.parentElement, 'p-dialog-header-icon')) {
            return;
        }
        if (this.draggable) {
            this.dragging = true;
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
            this.container.style.margin = '0';
            DomHandler.addClass(this.document.body, 'p-unselectable-text');
        }
    }
    onKeydown(event) {
        if (this.focusTrap) {
            if (event.which === 9) {
                event.preventDefault();
                let focusableElements = DomHandler.getFocusableElements(this.container);
                if (focusableElements && focusableElements.length > 0) {
                    if (!focusableElements[0].ownerDocument.activeElement) {
                        focusableElements[0].focus();
                    }
                    else {
                        let focusedIndex = focusableElements.indexOf(focusableElements[0].ownerDocument.activeElement);
                        if (event.shiftKey) {
                            if (focusedIndex == -1 || focusedIndex === 0)
                                focusableElements[focusableElements.length - 1].focus();
                            else
                                focusableElements[focusedIndex - 1].focus();
                        }
                        else {
                            if (focusedIndex == -1 || focusedIndex === focusableElements.length - 1)
                                focusableElements[0].focus();
                            else
                                focusableElements[focusedIndex + 1].focus();
                        }
                    }
                }
            }
        }
    }
    onDrag(event) {
        if (this.dragging) {
            const containerWidth = DomHandler.getOuterWidth(this.container);
            const containerHeight = DomHandler.getOuterHeight(this.container);
            const deltaX = event.pageX - this.lastPageX;
            const deltaY = event.pageY - this.lastPageY;
            const offset = this.container.getBoundingClientRect();
            const containerComputedStyle = getComputedStyle(this.container);
            const leftMargin = parseFloat(containerComputedStyle.marginLeft);
            const topMargin = parseFloat(containerComputedStyle.marginTop);
            const leftPos = offset.left + deltaX - leftMargin;
            const topPos = offset.top + deltaY - topMargin;
            const viewport = DomHandler.getViewport();
            this.container.style.position = 'fixed';
            if (this.keepInViewport) {
                if (leftPos >= this.minX && leftPos + containerWidth < viewport.width) {
                    this._style.left = `${leftPos}px`;
                    this.lastPageX = event.pageX;
                    this.container.style.left = `${leftPos}px`;
                }
                if (topPos >= this.minY && topPos + containerHeight < viewport.height) {
                    this._style.top = `${topPos}px`;
                    this.lastPageY = event.pageY;
                    this.container.style.top = `${topPos}px`;
                }
            }
            else {
                this.lastPageX = event.pageX;
                this.container.style.left = `${leftPos}px`;
                this.lastPageY = event.pageY;
                this.container.style.top = `${topPos}px`;
            }
        }
    }
    endDrag(event) {
        if (this.dragging) {
            this.dragging = false;
            DomHandler.removeClass(this.document.body, 'p-unselectable-text');
            this.cd.detectChanges();
            this.onDragEnd.emit(event);
        }
    }
    resetPosition() {
        this.container.style.position = '';
        this.container.style.left = '';
        this.container.style.top = '';
        this.container.style.margin = '';
    }
    //backward compatibility
    center() {
        this.resetPosition();
    }
    initResize(event) {
        if (this.resizable) {
            this.resizing = true;
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
            DomHandler.addClass(this.document.body, 'p-unselectable-text');
            this.onResizeInit.emit(event);
        }
    }
    onResize(event) {
        if (this.resizing) {
            let deltaX = event.pageX - this.lastPageX;
            let deltaY = event.pageY - this.lastPageY;
            let containerWidth = DomHandler.getOuterWidth(this.container);
            let containerHeight = DomHandler.getOuterHeight(this.container);
            let contentHeight = DomHandler.getOuterHeight(this.contentViewChild?.nativeElement);
            let newWidth = containerWidth + deltaX;
            let newHeight = containerHeight + deltaY;
            let minWidth = this.container.style.minWidth;
            let minHeight = this.container.style.minHeight;
            let offset = this.container.getBoundingClientRect();
            let viewport = DomHandler.getViewport();
            let hasBeenDragged = !parseInt(this.container.style.top) || !parseInt(this.container.style.left);
            if (hasBeenDragged) {
                newWidth += deltaX;
                newHeight += deltaY;
            }
            if ((!minWidth || newWidth > parseInt(minWidth)) && offset.left + newWidth < viewport.width) {
                this._style.width = newWidth + 'px';
                this.container.style.width = this._style.width;
            }
            if ((!minHeight || newHeight > parseInt(minHeight)) && offset.top + newHeight < viewport.height) {
                this.contentViewChild.nativeElement.style.height = contentHeight + newHeight - containerHeight + 'px';
                if (this._style.height) {
                    this._style.height = newHeight + 'px';
                    this.container.style.height = this._style.height;
                }
            }
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
        }
    }
    resizeEnd(event) {
        if (this.resizing) {
            this.resizing = false;
            DomHandler.removeClass(this.document.body, 'p-unselectable-text');
            this.onResizeEnd.emit(event);
        }
    }
    bindGlobalListeners() {
        if (this.draggable) {
            this.bindDocumentDragListener();
            this.bindDocumentDragEndListener();
        }
        if (this.resizable) {
            this.bindDocumentResizeListeners();
        }
        if (this.closeOnEscape && this.closable) {
            this.bindDocumentEscapeListener();
        }
    }
    unbindGlobalListeners() {
        this.unbindDocumentDragListener();
        this.unbindDocumentDragEndListener();
        this.unbindDocumentResizeListeners();
        this.unbindDocumentEscapeListener();
    }
    bindDocumentDragListener() {
        if (!this.documentDragListener) {
            this.zone.runOutsideAngular(() => {
                this.documentDragListener = this.renderer.listen(this.window, 'mousemove', this.onDrag.bind(this));
            });
        }
    }
    unbindDocumentDragListener() {
        if (this.documentDragListener) {
            this.documentDragListener();
            this.documentDragListener = null;
        }
    }
    bindDocumentDragEndListener() {
        if (!this.documentDragEndListener) {
            this.zone.runOutsideAngular(() => {
                this.documentDragEndListener = this.renderer.listen(this.window, 'mouseup', this.endDrag.bind(this));
            });
        }
    }
    unbindDocumentDragEndListener() {
        if (this.documentDragEndListener) {
            this.documentDragEndListener();
            this.documentDragEndListener = null;
        }
    }
    bindDocumentResizeListeners() {
        if (!this.documentResizeListener && !this.documentResizeEndListener) {
            this.zone.runOutsideAngular(() => {
                this.documentResizeListener = this.renderer.listen(this.window, 'mousemove', this.onResize.bind(this));
                this.documentResizeEndListener = this.renderer.listen(this.window, 'mouseup', this.resizeEnd.bind(this));
            });
        }
    }
    unbindDocumentResizeListeners() {
        if (this.documentResizeListener && this.documentResizeEndListener) {
            this.documentResizeListener();
            this.documentResizeEndListener();
            this.documentResizeListener = null;
            this.documentResizeEndListener = null;
        }
    }
    bindDocumentEscapeListener() {
        const documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document';
        this.documentEscapeListener = this.renderer.listen(documentTarget, 'keydown', (event) => {
            if (event.which == 27) {
                this.close(event);
            }
        });
    }
    unbindDocumentEscapeListener() {
        if (this.documentEscapeListener) {
            this.documentEscapeListener();
            this.documentEscapeListener = null;
        }
    }
    appendContainer() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                this.renderer.appendChild(this.document.body, this.wrapper);
            else
                DomHandler.appendChild(this.wrapper, this.appendTo);
        }
    }
    restoreAppend() {
        if (this.container && this.appendTo) {
            this.renderer.appendChild(this.el.nativeElement, this.wrapper);
        }
    }
    onAnimationStart(event) {
        switch (event.toState) {
            case 'visible':
                this.container = event.element;
                this.wrapper = this.container?.parentElement;
                this.appendContainer();
                this.moveOnTop();
                this.bindGlobalListeners();
                this.container?.setAttribute(this.id, '');
                if (this.modal) {
                    this.enableModality();
                }
                if (!this.modal && this.blockScroll) {
                    DomHandler.addClass(this.document.body, 'p-overflow-hidden');
                }
                if (this.focusOnShow) {
                    this.focus();
                }
                break;
            case 'void':
                if (this.wrapper && this.modal) {
                    DomHandler.addClass(this.wrapper, 'p-component-overlay-leave');
                }
                break;
        }
    }
    onAnimationEnd(event) {
        switch (event.toState) {
            case 'void':
                this.onContainerDestroy();
                this.onHide.emit({});
                this.cd.markForCheck();
                break;
            case 'visible':
                this.onShow.emit({});
                break;
        }
    }
    onContainerDestroy() {
        this.unbindGlobalListeners();
        this.dragging = false;
        this.maskVisible = false;
        if (this.maximized) {
            DomHandler.removeClass(this.document.body, 'p-overflow-hidden');
            this.document.body.style.removeProperty('--scrollbar-width');
            this.maximized = false;
        }
        if (this.modal) {
            this.disableModality();
        }
        if (this.blockScroll) {
            DomHandler.removeClass(this.document.body, 'p-overflow-hidden');
        }
        if (this.container && this.autoZIndex) {
            ZIndexUtils.clear(this.container);
        }
        this.container = null;
        this.wrapper = null;
        this._style = this.originalStyle ? { ...this.originalStyle } : {};
    }
    destroyStyle() {
        if (this.styleElement) {
            this.renderer.removeChild(this.document.head, this.styleElement);
            this.styleElement = null;
        }
    }
    ngOnDestroy() {
        if (this.container) {
            this.restoreAppend();
            this.onContainerDestroy();
        }
        this.destroyStyle();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: Dialog, deps: [{ token: DOCUMENT }, { token: PLATFORM_ID }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }, { token: i1.PrimeNGConfig }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: Dialog, selector: "p-dialog", inputs: { header: "header", draggable: "draggable", resizable: "resizable", positionLeft: "positionLeft", positionTop: "positionTop", contentStyle: "contentStyle", contentStyleClass: "contentStyleClass", modal: "modal", closeOnEscape: "closeOnEscape", dismissableMask: "dismissableMask", rtl: "rtl", closable: "closable", responsive: "responsive", appendTo: "appendTo", breakpoints: "breakpoints", styleClass: "styleClass", maskStyleClass: "maskStyleClass", showHeader: "showHeader", breakpoint: "breakpoint", blockScroll: "blockScroll", autoZIndex: "autoZIndex", baseZIndex: "baseZIndex", minX: "minX", minY: "minY", focusOnShow: "focusOnShow", maximizable: "maximizable", keepInViewport: "keepInViewport", focusTrap: "focusTrap", transitionOptions: "transitionOptions", closeIcon: "closeIcon", closeAriaLabel: "closeAriaLabel", closeTabindex: "closeTabindex", minimizeIcon: "minimizeIcon", maximizeIcon: "maximizeIcon", visible: "visible", style: "style", position: "position" }, outputs: { onShow: "onShow", onHide: "onHide", visibleChange: "visibleChange", onResizeInit: "onResizeInit", onResizeEnd: "onResizeEnd", onDragEnd: "onDragEnd", onMaximize: "onMaximize" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "headerFacet", first: true, predicate: Header, descendants: true }, { propertyName: "footerFacet", first: true, predicate: Footer, descendants: true }, { propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "headerViewChild", first: true, predicate: ["titlebar"], descendants: true }, { propertyName: "contentViewChild", first: true, predicate: ["content"], descendants: true }, { propertyName: "footerViewChild", first: true, predicate: ["footer"], descendants: true }], ngImport: i0, template: `
        <div
            *ngIf="maskVisible"
            [class]="maskStyleClass"
            [ngClass]="{
                'p-dialog-mask': true,
                'p-component-overlay p-component-overlay-enter': this.modal,
                'p-dialog-mask-scrollblocker': this.modal || this.blockScroll,
                'p-dialog-left': position === 'left',
                'p-dialog-right': position === 'right',
                'p-dialog-top': position === 'top',
                'p-dialog-top-left': position === 'topleft' || position === 'top-left',
                'p-dialog-top-right': position === 'topright' || position === 'top-right',
                'p-dialog-bottom': position === 'bottom',
                'p-dialog-bottom-left': position === 'bottomleft' || position === 'bottom-left',
                'p-dialog-bottom-right': position === 'bottomright' || position === 'bottom-right'
            }"
        >
            <div
                #container
                [ngClass]="{ 'p-dialog p-component': true, 'p-dialog-rtl': rtl, 'p-dialog-draggable': draggable, 'p-dialog-resizable': resizable, 'p-dialog-maximized': maximized }"
                [ngStyle]="style"
                [class]="styleClass"
                *ngIf="visible"
                pFocusTrap
                [pFocusTrapDisabled]="focusTrap === false"
                [@animation]="{ value: 'visible', params: { transform: transformOptions, transition: transitionOptions } }"
                (@animation.start)="onAnimationStart($event)"
                (@animation.done)="onAnimationEnd($event)"
                role="dialog"
                [attr.aria-labelledby]="ariaLabelledBy"
                [attr.aria-modal]="true"
            >
                <div *ngIf="resizable" class="p-resizable-handle" style="z-index: 90;" (mousedown)="initResize($event)"></div>
                <div #titlebar class="p-dialog-header" (mousedown)="initDrag($event)" *ngIf="showHeader">
                    <span [id]="getAriaLabelledBy()" class="p-dialog-title" *ngIf="!headerFacet && !headerTemplate">{{ header }}</span>
                    <span [id]="getAriaLabelledBy()" class="p-dialog-title" *ngIf="headerFacet">
                        <ng-content select="p-header"></ng-content>
                    </span>
                    <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                    <div class="p-dialog-header-icons">
                        <button *ngIf="maximizable" role="button" type="button" [ngClass]="{ 'p-dialog-header-icon p-dialog-header-maximize p-link': true }" (click)="maximize()" (keydown.enter)="maximize()" tabindex="-1" pRipple>
                            <span *ngIf="maximizeIcon && !maximizeIconTemplate && !minimizeIconTemplate" class="p-dialog-header-maximize-icon" [ngClass]="maximized ? minimizeIcon : maximizeIcon"></span>
                            <ng-container *ngIf="!maximizeIcon">
                                <WindowMaximizeIcon *ngIf="!maximized && !maximizeIconTemplate" [styleClass]="'p-dialog-header-maximize-icon'" />
                                <WindowMinimizeIcon *ngIf="maximized && !minimizeIconTemplate" [styleClass]="'p-dialog-header-maximize-icon'" />
                            </ng-container>
                            <ng-container *ngIf="!maximized">
                                <ng-template *ngTemplateOutlet="maximizeIconTemplate"></ng-template>
                            </ng-container>
                            <ng-container *ngIf="maximized">
                                <ng-template *ngTemplateOutlet="minimizeIconTemplate"></ng-template>
                            </ng-container>
                        </button>
                        <button
                            *ngIf="closable"
                            type="button"
                            [ngClass]="{ 'p-dialog-header-icon p-dialog-header-close p-link': true }"
                            [attr.aria-label]="closeAriaLabel"
                            (click)="close($event)"
                            (keydown.enter)="close($event)"
                            [attr.tabindex]="closeTabindex"
                            pRipple
                        >
                            <ng-container *ngIf="!closeIconTemplate">
                                <span *ngIf="closeIcon" class="p-dialog-header-close-icon" [ngClass]="closeIcon"></span>
                                <TimesIcon *ngIf="!closeIcon" [styleClass]="'p-dialog-header-close-icon'" />
                            </ng-container>
                            <span *ngIf="closeIconTemplate">
                                <ng-template *ngTemplateOutlet="closeIconTemplate"></ng-template>
                            </span>
                        </button>
                    </div>
                </div>
                <div #content [ngClass]="'p-dialog-content'" [ngStyle]="contentStyle" [class]="contentStyleClass">
                    <ng-content></ng-content>
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </div>
                <div #footer class="p-dialog-footer" *ngIf="footerFacet || footerTemplate">
                    <ng-content select="p-footer"></ng-content>
                    <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
                </div>
            </div>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-dialog-mask{position:fixed;top:0;left:0;width:100%;height:100%;display:flex;justify-content:center;align-items:center;pointer-events:none}.p-dialog-mask.p-component-overlay{pointer-events:auto}.p-dialog{display:flex;flex-direction:column;pointer-events:auto;max-height:90%;transform:scale(1);position:relative}.p-dialog-content{overflow-y:auto;flex-grow:1}.p-dialog-header{display:flex;align-items:center;justify-content:space-between;flex-shrink:0}.p-dialog-draggable .p-dialog-header{cursor:move}.p-dialog-footer{flex-shrink:0}.p-dialog .p-dialog-header-icons{display:flex;align-items:center}.p-dialog .p-dialog-header-icon{display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative}.p-fluid .p-dialog-footer .p-button{width:auto}.p-dialog-top .p-dialog,.p-dialog-bottom .p-dialog,.p-dialog-left .p-dialog,.p-dialog-right .p-dialog,.p-dialog-top-left .p-dialog,.p-dialog-top-right .p-dialog,.p-dialog-bottom-left .p-dialog,.p-dialog-bottom-right .p-dialog{margin:.75rem;transform:translateZ(0)}.p-dialog-maximized{transition:none;transform:none;width:100vw!important;height:100vh!important;top:0!important;left:0!important;max-height:100%;height:100%}.p-dialog-maximized .p-dialog-content{flex-grow:1}.p-dialog-left{justify-content:flex-start}.p-dialog-right{justify-content:flex-end}.p-dialog-top{align-items:flex-start}.p-dialog-top-left{justify-content:flex-start;align-items:flex-start}.p-dialog-top-right{justify-content:flex-end;align-items:flex-start}.p-dialog-bottom{align-items:flex-end}.p-dialog-bottom-left{justify-content:flex-start;align-items:flex-end}.p-dialog-bottom-right{justify-content:flex-end;align-items:flex-end}.p-dialog .p-resizable-handle{position:absolute;font-size:.1px;display:block;cursor:se-resize;width:12px;height:12px;right:1px;bottom:1px}.p-confirm-dialog .p-dialog-content{display:flex;align-items:center}}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(() => i2.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(() => i3.FocusTrap), selector: "[pFocusTrap]", inputs: ["pFocusTrapDisabled"] }, { kind: "directive", type: i0.forwardRef(() => i4.Ripple), selector: "[pRipple]" }, { kind: "component", type: i0.forwardRef(() => TimesIcon), selector: "TimesIcon" }, { kind: "component", type: i0.forwardRef(() => WindowMaximizeIcon), selector: "WindowMaximizeIcon" }, { kind: "component", type: i0.forwardRef(() => WindowMinimizeIcon), selector: "WindowMinimizeIcon" }], animations: [trigger('animation', [transition('void => visible', [useAnimation(showAnimation)]), transition('visible => void', [useAnimation(hideAnimation)])])], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: Dialog, decorators: [{
            type: Component,
            args: [{ selector: 'p-dialog', template: `
        <div
            *ngIf="maskVisible"
            [class]="maskStyleClass"
            [ngClass]="{
                'p-dialog-mask': true,
                'p-component-overlay p-component-overlay-enter': this.modal,
                'p-dialog-mask-scrollblocker': this.modal || this.blockScroll,
                'p-dialog-left': position === 'left',
                'p-dialog-right': position === 'right',
                'p-dialog-top': position === 'top',
                'p-dialog-top-left': position === 'topleft' || position === 'top-left',
                'p-dialog-top-right': position === 'topright' || position === 'top-right',
                'p-dialog-bottom': position === 'bottom',
                'p-dialog-bottom-left': position === 'bottomleft' || position === 'bottom-left',
                'p-dialog-bottom-right': position === 'bottomright' || position === 'bottom-right'
            }"
        >
            <div
                #container
                [ngClass]="{ 'p-dialog p-component': true, 'p-dialog-rtl': rtl, 'p-dialog-draggable': draggable, 'p-dialog-resizable': resizable, 'p-dialog-maximized': maximized }"
                [ngStyle]="style"
                [class]="styleClass"
                *ngIf="visible"
                pFocusTrap
                [pFocusTrapDisabled]="focusTrap === false"
                [@animation]="{ value: 'visible', params: { transform: transformOptions, transition: transitionOptions } }"
                (@animation.start)="onAnimationStart($event)"
                (@animation.done)="onAnimationEnd($event)"
                role="dialog"
                [attr.aria-labelledby]="ariaLabelledBy"
                [attr.aria-modal]="true"
            >
                <div *ngIf="resizable" class="p-resizable-handle" style="z-index: 90;" (mousedown)="initResize($event)"></div>
                <div #titlebar class="p-dialog-header" (mousedown)="initDrag($event)" *ngIf="showHeader">
                    <span [id]="getAriaLabelledBy()" class="p-dialog-title" *ngIf="!headerFacet && !headerTemplate">{{ header }}</span>
                    <span [id]="getAriaLabelledBy()" class="p-dialog-title" *ngIf="headerFacet">
                        <ng-content select="p-header"></ng-content>
                    </span>
                    <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                    <div class="p-dialog-header-icons">
                        <button *ngIf="maximizable" role="button" type="button" [ngClass]="{ 'p-dialog-header-icon p-dialog-header-maximize p-link': true }" (click)="maximize()" (keydown.enter)="maximize()" tabindex="-1" pRipple>
                            <span *ngIf="maximizeIcon && !maximizeIconTemplate && !minimizeIconTemplate" class="p-dialog-header-maximize-icon" [ngClass]="maximized ? minimizeIcon : maximizeIcon"></span>
                            <ng-container *ngIf="!maximizeIcon">
                                <WindowMaximizeIcon *ngIf="!maximized && !maximizeIconTemplate" [styleClass]="'p-dialog-header-maximize-icon'" />
                                <WindowMinimizeIcon *ngIf="maximized && !minimizeIconTemplate" [styleClass]="'p-dialog-header-maximize-icon'" />
                            </ng-container>
                            <ng-container *ngIf="!maximized">
                                <ng-template *ngTemplateOutlet="maximizeIconTemplate"></ng-template>
                            </ng-container>
                            <ng-container *ngIf="maximized">
                                <ng-template *ngTemplateOutlet="minimizeIconTemplate"></ng-template>
                            </ng-container>
                        </button>
                        <button
                            *ngIf="closable"
                            type="button"
                            [ngClass]="{ 'p-dialog-header-icon p-dialog-header-close p-link': true }"
                            [attr.aria-label]="closeAriaLabel"
                            (click)="close($event)"
                            (keydown.enter)="close($event)"
                            [attr.tabindex]="closeTabindex"
                            pRipple
                        >
                            <ng-container *ngIf="!closeIconTemplate">
                                <span *ngIf="closeIcon" class="p-dialog-header-close-icon" [ngClass]="closeIcon"></span>
                                <TimesIcon *ngIf="!closeIcon" [styleClass]="'p-dialog-header-close-icon'" />
                            </ng-container>
                            <span *ngIf="closeIconTemplate">
                                <ng-template *ngTemplateOutlet="closeIconTemplate"></ng-template>
                            </span>
                        </button>
                    </div>
                </div>
                <div #content [ngClass]="'p-dialog-content'" [ngStyle]="contentStyle" [class]="contentStyleClass">
                    <ng-content></ng-content>
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </div>
                <div #footer class="p-dialog-footer" *ngIf="footerFacet || footerTemplate">
                    <ng-content select="p-footer"></ng-content>
                    <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
                </div>
            </div>
        </div>
    `, animations: [trigger('animation', [transition('void => visible', [useAnimation(showAnimation)]), transition('visible => void', [useAnimation(hideAnimation)])])], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-dialog-mask{position:fixed;top:0;left:0;width:100%;height:100%;display:flex;justify-content:center;align-items:center;pointer-events:none}.p-dialog-mask.p-component-overlay{pointer-events:auto}.p-dialog{display:flex;flex-direction:column;pointer-events:auto;max-height:90%;transform:scale(1);position:relative}.p-dialog-content{overflow-y:auto;flex-grow:1}.p-dialog-header{display:flex;align-items:center;justify-content:space-between;flex-shrink:0}.p-dialog-draggable .p-dialog-header{cursor:move}.p-dialog-footer{flex-shrink:0}.p-dialog .p-dialog-header-icons{display:flex;align-items:center}.p-dialog .p-dialog-header-icon{display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative}.p-fluid .p-dialog-footer .p-button{width:auto}.p-dialog-top .p-dialog,.p-dialog-bottom .p-dialog,.p-dialog-left .p-dialog,.p-dialog-right .p-dialog,.p-dialog-top-left .p-dialog,.p-dialog-top-right .p-dialog,.p-dialog-bottom-left .p-dialog,.p-dialog-bottom-right .p-dialog{margin:.75rem;transform:translateZ(0)}.p-dialog-maximized{transition:none;transform:none;width:100vw!important;height:100vh!important;top:0!important;left:0!important;max-height:100%;height:100%}.p-dialog-maximized .p-dialog-content{flex-grow:1}.p-dialog-left{justify-content:flex-start}.p-dialog-right{justify-content:flex-end}.p-dialog-top{align-items:flex-start}.p-dialog-top-left{justify-content:flex-start;align-items:flex-start}.p-dialog-top-right{justify-content:flex-end;align-items:flex-start}.p-dialog-bottom{align-items:flex-end}.p-dialog-bottom-left{justify-content:flex-start;align-items:flex-end}.p-dialog-bottom-right{justify-content:flex-end;align-items:flex-end}.p-dialog .p-resizable-handle{position:absolute;font-size:.1px;display:block;cursor:se-resize;width:12px;height:12px;right:1px;bottom:1px}.p-confirm-dialog .p-dialog-content{display:flex;align-items:center}}\n"] }]
        }], ctorParameters: () => [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: i1.PrimeNGConfig }], propDecorators: { header: [{
                type: Input
            }], draggable: [{
                type: Input
            }], resizable: [{
                type: Input
            }], positionLeft: [{
                type: Input
            }], positionTop: [{
                type: Input
            }], contentStyle: [{
                type: Input
            }], contentStyleClass: [{
                type: Input
            }], modal: [{
                type: Input
            }], closeOnEscape: [{
                type: Input
            }], dismissableMask: [{
                type: Input
            }], rtl: [{
                type: Input
            }], closable: [{
                type: Input
            }], responsive: [{
                type: Input
            }], appendTo: [{
                type: Input
            }], breakpoints: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], maskStyleClass: [{
                type: Input
            }], showHeader: [{
                type: Input
            }], breakpoint: [{
                type: Input
            }], blockScroll: [{
                type: Input
            }], autoZIndex: [{
                type: Input
            }], baseZIndex: [{
                type: Input
            }], minX: [{
                type: Input
            }], minY: [{
                type: Input
            }], focusOnShow: [{
                type: Input
            }], maximizable: [{
                type: Input
            }], keepInViewport: [{
                type: Input
            }], focusTrap: [{
                type: Input
            }], transitionOptions: [{
                type: Input
            }], closeIcon: [{
                type: Input
            }], closeAriaLabel: [{
                type: Input
            }], closeTabindex: [{
                type: Input
            }], minimizeIcon: [{
                type: Input
            }], maximizeIcon: [{
                type: Input
            }], visible: [{
                type: Input
            }], style: [{
                type: Input
            }], position: [{
                type: Input
            }], onShow: [{
                type: Output
            }], onHide: [{
                type: Output
            }], visibleChange: [{
                type: Output
            }], onResizeInit: [{
                type: Output
            }], onResizeEnd: [{
                type: Output
            }], onDragEnd: [{
                type: Output
            }], onMaximize: [{
                type: Output
            }], headerFacet: [{
                type: ContentChild,
                args: [Header]
            }], footerFacet: [{
                type: ContentChild,
                args: [Footer]
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], headerViewChild: [{
                type: ViewChild,
                args: ['titlebar']
            }], contentViewChild: [{
                type: ViewChild,
                args: ['content']
            }], footerViewChild: [{
                type: ViewChild,
                args: ['footer']
            }] } });
export class DialogModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: DialogModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.5", ngImport: i0, type: DialogModule, declarations: [Dialog], imports: [CommonModule, FocusTrapModule, RippleModule, TimesIcon, WindowMaximizeIcon, WindowMinimizeIcon], exports: [Dialog, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: DialogModule, imports: [CommonModule, FocusTrapModule, RippleModule, TimesIcon, WindowMaximizeIcon, WindowMinimizeIcon, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: DialogModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FocusTrapModule, RippleModule, TimesIcon, WindowMaximizeIcon, WindowMinimizeIcon],
                    exports: [Dialog, SharedModule],
                    declarations: [Dialog]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL2RpYWxvZy9kaWFsb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFrQixPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ25ILE9BQU8sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDNUUsT0FBTyxFQUVILHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLGVBQWUsRUFFZixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxRQUFRLEVBSVIsTUFBTSxFQUNOLFdBQVcsRUFLWCxTQUFTLEVBQ1QsaUJBQWlCLEVBRXBCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFpQixhQUFhLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDekMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFOUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7O0FBRS9ELE1BQU0sYUFBYSxHQUFHLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxlQUFl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QUFZLFlBSlgsWUFBWSxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLGtCQUFrQixFQUFFLGtCQUFrQixFQUN0RixZQUFZOzsyRkFHckIsWUFBWTtrQkFMeEIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsa0JBQWtCLEVBQUUsa0JBQWtCLENBQUM7b0JBQ3pHLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUM7b0JBQy9CLFlBQVksRUFBRSxDQUFDLE1BQU0sQ0FBQztpQkFDekIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBbmltYXRpb25FdmVudCwgYW5pbWF0ZSwgYW5pbWF0aW9uLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciwgdXNlQW5pbWF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUsIERPQ1VNRU5ULCBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIE5nTW9kdWxlLFxuICAgIE5nWm9uZSxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIE91dHB1dCxcbiAgICBQTEFURk9STV9JRCxcbiAgICBRdWVyeUxpc3QsXG4gICAgUmVuZGVyZXIyLFxuICAgIFNpbXBsZUNoYW5nZXMsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIFZpZXdSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb290ZXIsIEhlYWRlciwgUHJpbWVOR0NvbmZpZywgUHJpbWVUZW1wbGF0ZSwgU2hhcmVkTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7IEZvY3VzVHJhcE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvZm9jdXN0cmFwJztcbmltcG9ydCB7IFRpbWVzSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvdGltZXMnO1xuaW1wb3J0IHsgV2luZG93TWF4aW1pemVJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy93aW5kb3dtYXhpbWl6ZSc7XG5pbXBvcnQgeyBXaW5kb3dNaW5pbWl6ZUljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL3dpbmRvd21pbmltaXplJztcbmltcG9ydCB7IFJpcHBsZU1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvcmlwcGxlJztcbmltcG9ydCB7IE51bGxhYmxlLCBWb2lkTGlzdGVuZXIgfSBmcm9tICdwcmltZW5nL3RzLWhlbHBlcnMnO1xuaW1wb3J0IHsgVW5pcXVlQ29tcG9uZW50SWQsIFpJbmRleFV0aWxzIH0gZnJvbSAncHJpbWVuZy91dGlscyc7XG5cbmNvbnN0IHNob3dBbmltYXRpb24gPSBhbmltYXRpb24oW3N0eWxlKHsgdHJhbnNmb3JtOiAne3t0cmFuc2Zvcm19fScsIG9wYWNpdHk6IDAgfSksIGFuaW1hdGUoJ3t7dHJhbnNpdGlvbn19JyldKTtcblxuY29uc3QgaGlkZUFuaW1hdGlvbiA9IGFuaW1hdGlvbihbYW5pbWF0ZSgne3t0cmFuc2l0aW9ufX0nLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3t7dHJhbnNmb3JtfX0nLCBvcGFjaXR5OiAwIH0pKV0pO1xuLyoqXG4gKiBEaWFsb2cgaXMgYSBjb250YWluZXIgdG8gZGlzcGxheSBjb250ZW50IGluIGFuIG92ZXJsYXkgd2luZG93LlxuICogQGdyb3VwIENvbXBvbmVudHNcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWRpYWxvZycsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdlxuICAgICAgICAgICAgKm5nSWY9XCJtYXNrVmlzaWJsZVwiXG4gICAgICAgICAgICBbY2xhc3NdPVwibWFza1N0eWxlQ2xhc3NcIlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwie1xuICAgICAgICAgICAgICAgICdwLWRpYWxvZy1tYXNrJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAncC1jb21wb25lbnQtb3ZlcmxheSBwLWNvbXBvbmVudC1vdmVybGF5LWVudGVyJzogdGhpcy5tb2RhbCxcbiAgICAgICAgICAgICAgICAncC1kaWFsb2ctbWFzay1zY3JvbGxibG9ja2VyJzogdGhpcy5tb2RhbCB8fCB0aGlzLmJsb2NrU2Nyb2xsLFxuICAgICAgICAgICAgICAgICdwLWRpYWxvZy1sZWZ0JzogcG9zaXRpb24gPT09ICdsZWZ0JyxcbiAgICAgICAgICAgICAgICAncC1kaWFsb2ctcmlnaHQnOiBwb3NpdGlvbiA9PT0gJ3JpZ2h0JyxcbiAgICAgICAgICAgICAgICAncC1kaWFsb2ctdG9wJzogcG9zaXRpb24gPT09ICd0b3AnLFxuICAgICAgICAgICAgICAgICdwLWRpYWxvZy10b3AtbGVmdCc6IHBvc2l0aW9uID09PSAndG9wbGVmdCcgfHwgcG9zaXRpb24gPT09ICd0b3AtbGVmdCcsXG4gICAgICAgICAgICAgICAgJ3AtZGlhbG9nLXRvcC1yaWdodCc6IHBvc2l0aW9uID09PSAndG9wcmlnaHQnIHx8IHBvc2l0aW9uID09PSAndG9wLXJpZ2h0JyxcbiAgICAgICAgICAgICAgICAncC1kaWFsb2ctYm90dG9tJzogcG9zaXRpb24gPT09ICdib3R0b20nLFxuICAgICAgICAgICAgICAgICdwLWRpYWxvZy1ib3R0b20tbGVmdCc6IHBvc2l0aW9uID09PSAnYm90dG9tbGVmdCcgfHwgcG9zaXRpb24gPT09ICdib3R0b20tbGVmdCcsXG4gICAgICAgICAgICAgICAgJ3AtZGlhbG9nLWJvdHRvbS1yaWdodCc6IHBvc2l0aW9uID09PSAnYm90dG9tcmlnaHQnIHx8IHBvc2l0aW9uID09PSAnYm90dG9tLXJpZ2h0J1xuICAgICAgICAgICAgfVwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAjY29udGFpbmVyXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyAncC1kaWFsb2cgcC1jb21wb25lbnQnOiB0cnVlLCAncC1kaWFsb2ctcnRsJzogcnRsLCAncC1kaWFsb2ctZHJhZ2dhYmxlJzogZHJhZ2dhYmxlLCAncC1kaWFsb2ctcmVzaXphYmxlJzogcmVzaXphYmxlLCAncC1kaWFsb2ctbWF4aW1pemVkJzogbWF4aW1pemVkIH1cIlxuICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInN0eWxlXCJcbiAgICAgICAgICAgICAgICBbY2xhc3NdPVwic3R5bGVDbGFzc1wiXG4gICAgICAgICAgICAgICAgKm5nSWY9XCJ2aXNpYmxlXCJcbiAgICAgICAgICAgICAgICBwRm9jdXNUcmFwXG4gICAgICAgICAgICAgICAgW3BGb2N1c1RyYXBEaXNhYmxlZF09XCJmb2N1c1RyYXAgPT09IGZhbHNlXCJcbiAgICAgICAgICAgICAgICBbQGFuaW1hdGlvbl09XCJ7IHZhbHVlOiAndmlzaWJsZScsIHBhcmFtczogeyB0cmFuc2Zvcm06IHRyYW5zZm9ybU9wdGlvbnMsIHRyYW5zaXRpb246IHRyYW5zaXRpb25PcHRpb25zIH0gfVwiXG4gICAgICAgICAgICAgICAgKEBhbmltYXRpb24uc3RhcnQpPVwib25BbmltYXRpb25TdGFydCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAoQGFuaW1hdGlvbi5kb25lKT1cIm9uQW5pbWF0aW9uRW5kKCRldmVudClcIlxuICAgICAgICAgICAgICAgIHJvbGU9XCJkaWFsb2dcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJhcmlhTGFiZWxsZWRCeVwiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1tb2RhbF09XCJ0cnVlXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwicmVzaXphYmxlXCIgY2xhc3M9XCJwLXJlc2l6YWJsZS1oYW5kbGVcIiBzdHlsZT1cInotaW5kZXg6IDkwO1wiIChtb3VzZWRvd24pPVwiaW5pdFJlc2l6ZSgkZXZlbnQpXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiAjdGl0bGViYXIgY2xhc3M9XCJwLWRpYWxvZy1oZWFkZXJcIiAobW91c2Vkb3duKT1cImluaXREcmFnKCRldmVudClcIiAqbmdJZj1cInNob3dIZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gW2lkXT1cImdldEFyaWFMYWJlbGxlZEJ5KClcIiBjbGFzcz1cInAtZGlhbG9nLXRpdGxlXCIgKm5nSWY9XCIhaGVhZGVyRmFjZXQgJiYgIWhlYWRlclRlbXBsYXRlXCI+e3sgaGVhZGVyIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBbaWRdPVwiZ2V0QXJpYUxhYmVsbGVkQnkoKVwiIGNsYXNzPVwicC1kaWFsb2ctdGl0bGVcIiAqbmdJZj1cImhlYWRlckZhY2V0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJwLWhlYWRlclwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaGVhZGVyVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtZGlhbG9nLWhlYWRlci1pY29uc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cIm1heGltaXphYmxlXCIgcm9sZT1cImJ1dHRvblwiIHR5cGU9XCJidXR0b25cIiBbbmdDbGFzc109XCJ7ICdwLWRpYWxvZy1oZWFkZXItaWNvbiBwLWRpYWxvZy1oZWFkZXItbWF4aW1pemUgcC1saW5rJzogdHJ1ZSB9XCIgKGNsaWNrKT1cIm1heGltaXplKClcIiAoa2V5ZG93bi5lbnRlcik9XCJtYXhpbWl6ZSgpXCIgdGFiaW5kZXg9XCItMVwiIHBSaXBwbGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJtYXhpbWl6ZUljb24gJiYgIW1heGltaXplSWNvblRlbXBsYXRlICYmICFtaW5pbWl6ZUljb25UZW1wbGF0ZVwiIGNsYXNzPVwicC1kaWFsb2ctaGVhZGVyLW1heGltaXplLWljb25cIiBbbmdDbGFzc109XCJtYXhpbWl6ZWQgPyBtaW5pbWl6ZUljb24gOiBtYXhpbWl6ZUljb25cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFtYXhpbWl6ZUljb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFdpbmRvd01heGltaXplSWNvbiAqbmdJZj1cIiFtYXhpbWl6ZWQgJiYgIW1heGltaXplSWNvblRlbXBsYXRlXCIgW3N0eWxlQ2xhc3NdPVwiJ3AtZGlhbG9nLWhlYWRlci1tYXhpbWl6ZS1pY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxXaW5kb3dNaW5pbWl6ZUljb24gKm5nSWY9XCJtYXhpbWl6ZWQgJiYgIW1pbmltaXplSWNvblRlbXBsYXRlXCIgW3N0eWxlQ2xhc3NdPVwiJ3AtZGlhbG9nLWhlYWRlci1tYXhpbWl6ZS1pY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFtYXhpbWl6ZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwibWF4aW1pemVJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJtYXhpbWl6ZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwibWluaW1pemVJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJjbG9zYWJsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyAncC1kaWFsb2ctaGVhZGVyLWljb24gcC1kaWFsb2ctaGVhZGVyLWNsb3NlIHAtbGluayc6IHRydWUgfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJjbG9zZUFyaWFMYWJlbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImNsb3NlKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChrZXlkb3duLmVudGVyKT1cImNsb3NlKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cImNsb3NlVGFiaW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBSaXBwbGVcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWNsb3NlSWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiY2xvc2VJY29uXCIgY2xhc3M9XCJwLWRpYWxvZy1oZWFkZXItY2xvc2UtaWNvblwiIFtuZ0NsYXNzXT1cImNsb3NlSWNvblwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRpbWVzSWNvbiAqbmdJZj1cIiFjbG9zZUljb25cIiBbc3R5bGVDbGFzc109XCIncC1kaWFsb2ctaGVhZGVyLWNsb3NlLWljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImNsb3NlSWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cImNsb3NlSWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiAjY29udGVudCBbbmdDbGFzc109XCIncC1kaWFsb2ctY29udGVudCdcIiBbbmdTdHlsZV09XCJjb250ZW50U3R5bGVcIiBbY2xhc3NdPVwiY29udGVudFN0eWxlQ2xhc3NcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29udGVudFRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiAjZm9vdGVyIGNsYXNzPVwicC1kaWFsb2ctZm9vdGVyXCIgKm5nSWY9XCJmb290ZXJGYWNldCB8fCBmb290ZXJUZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJwLWZvb3RlclwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImZvb3RlclRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBhbmltYXRpb25zOiBbdHJpZ2dlcignYW5pbWF0aW9uJywgW3RyYW5zaXRpb24oJ3ZvaWQgPT4gdmlzaWJsZScsIFt1c2VBbmltYXRpb24oc2hvd0FuaW1hdGlvbildKSwgdHJhbnNpdGlvbigndmlzaWJsZSA9PiB2b2lkJywgW3VzZUFuaW1hdGlvbihoaWRlQW5pbWF0aW9uKV0pXSldLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4uL2RpYWxvZy9kaWFsb2cuY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIERpYWxvZyBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICAvKipcbiAgICAgKiBUaXRsZSB0ZXh0IG9mIHRoZSBkaWFsb2cuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaGVhZGVyOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRW5hYmxlcyBkcmFnZ2luZyB0byBjaGFuZ2UgdGhlIHBvc2l0aW9uIHVzaW5nIGhlYWRlci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBkcmFnZ2FibGU6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIEVuYWJsZXMgcmVzaXppbmcgb2YgdGhlIGNvbnRlbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgcmVzaXphYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHRoZSBsZWZ0IG9mZnNldCBvZiBkaWFsb2cuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICogQGRlcHJlY2F0ZWQgcG9zaXRpb25MZWZ0IHByb3BlcnR5IGlzIGRlcHJlY2F0ZWQuXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IHBvc2l0aW9uTGVmdCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgc2V0IHBvc2l0aW9uTGVmdChfcG9zaXRpb25MZWZ0OiBudW1iZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3Bvc2l0aW9uTGVmdCBwcm9wZXJ0eSBpcyBkZXByZWNhdGVkLicpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHRoZSB0b3Agb2Zmc2V0IG9mIGRpYWxvZy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKiBAZGVwcmVjYXRlZCBwb3NpdGlvblRvcCBwcm9wZXJ0eSBpcyBkZXByZWNhdGVkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBwb3NpdGlvblRvcCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgc2V0IHBvc2l0aW9uVG9wKF9wb3NpdGlvblRvcDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdwb3NpdGlvblRvcCBwcm9wZXJ0eSBpcyBkZXByZWNhdGVkLicpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdHlsZSBvZiB0aGUgY29udGVudCBzZWN0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGNvbnRlbnRTdHlsZTogYW55O1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSBjb250ZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGNvbnRlbnRTdHlsZUNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBpZiBiYWNrZ3JvdW5kIHNob3VsZCBiZSBibG9ja2VkIHdoZW4gZGlhbG9nIGlzIGRpc3BsYXllZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBtb2RhbDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIFNwZWNpZmllcyBpZiBwcmVzc2luZyBlc2NhcGUga2V5IHNob3VsZCBoaWRlIHRoZSBkaWFsb2cuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgY2xvc2VPbkVzY2FwZTogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogU3BlY2lmaWVzIGlmIGNsaWNraW5nIHRoZSBtb2RhbCBiYWNrZ3JvdW5kIHNob3VsZCBoaWRlIHRoZSBkaWFsb2cuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZGlzbWlzc2FibGVNYXNrOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogV2hlbiBlbmFibGVkIGRpYWxvZyBpcyBkaXNwbGF5ZWQgaW4gUlRMIGRpcmVjdGlvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBydGw6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBBZGRzIGEgY2xvc2UgaWNvbiB0byB0aGUgaGVhZGVyIHRvIGhpZGUgdGhlIGRpYWxvZy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBjbG9zYWJsZTogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBpZiB0aGUgY29tcG9uZW50IGlzIHJlc3BvbnNpdmUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICogQGRlcHJlY2F0ZWQgUmVzcG9uc2l2ZSBwcm9wZXJ0eSBpcyBkZXByZWNhdGVkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCByZXNwb25zaXZlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHNldCByZXNwb25zaXZlKF9yZXNwb25zaXZlOiBib29sZWFuKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdSZXNwb25zaXZlIHByb3BlcnR5IGlzIGRlcHJlY2F0ZWQuJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRhcmdldCBlbGVtZW50IHRvIGF0dGFjaCB0aGUgZGlhbG9nLCB2YWxpZCB2YWx1ZXMgYXJlIFwiYm9keVwiIG9yIGEgbG9jYWwgbmctdGVtcGxhdGUgdmFyaWFibGUgb2YgYW5vdGhlciBlbGVtZW50IChub3RlOiB1c2UgYmluZGluZyB3aXRoIGJyYWNrZXRzIGZvciB0ZW1wbGF0ZSB2YXJpYWJsZXMsIGUuZy4gW2FwcGVuZFRvXT1cIm15ZGl2XCIgZm9yIGEgZGl2IGVsZW1lbnQgaGF2aW5nICNteWRpdiBhcyB2YXJpYWJsZSBuYW1lKS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBhcHBlbmRUbzogSFRNTEVsZW1lbnQgfCBFbGVtZW50UmVmIHwgVGVtcGxhdGVSZWY8YW55PiB8IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQgfCBhbnk7XG4gICAgLyoqXG4gICAgICogT2JqZWN0IGxpdGVyYWwgdG8gZGVmaW5lIHdpZHRocyBwZXIgc2NyZWVuIHNpemUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgYnJlYWtwb2ludHM6IGFueTtcbiAgICAvKipcbiAgICAgKiBTdHlsZSBjbGFzcyBvZiB0aGUgY29tcG9uZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTdHlsZSBjbGFzcyBvZiB0aGUgbWFzay5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBtYXNrU3R5bGVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gc2hvdyB0aGUgaGVhZGVyIG9yIG5vdC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzaG93SGVhZGVyOiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHRoZSBicmVha3BvaW50IG9mIHRoZSBjb21wb25lbnQgcmVzcG9uc2l2ZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKiBAZGVwcmVjYXRlZCBCcmVha3BvaW50IHByb3BlcnR5IGlzIG5vdCB1dGlsaXplZCBhbmQgZGVwcmVjYXRlZC4gVXNlIGJyZWFrcG9pbnRzIG9yIENTUyBtZWRpYSBxdWVyaWVzIGluc3RlYWQuXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IGJyZWFrcG9pbnQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIDY0OTtcbiAgICB9XG4gICAgc2V0IGJyZWFrcG9pbnQoX2JyZWFrcG9pbnQ6IG51bWJlcikge1xuICAgICAgICBjb25zb2xlLmxvZygnQnJlYWtwb2ludCBwcm9wZXJ0eSBpcyBub3QgdXRpbGl6ZWQgYW5kIGRlcHJlY2F0ZWQsIHVzZSBicmVha3BvaW50cyBvciBDU1MgbWVkaWEgcXVlcmllcyBpbnN0ZWFkLicpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIGJhY2tncm91bmQgc2Nyb2xsIHNob3VsZCBiZSBibG9ja2VkIHdoZW4gZGlhbG9nIGlzIHZpc2libGUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgYmxvY2tTY3JvbGw6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIGF1dG9tYXRpY2FsbHkgbWFuYWdlIGxheWVyaW5nLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGF1dG9aSW5kZXg6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIEJhc2UgekluZGV4IHZhbHVlIHRvIHVzZSBpbiBsYXllcmluZy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBiYXNlWkluZGV4OiBudW1iZXIgPSAwO1xuICAgIC8qKlxuICAgICAqIE1pbmltdW0gdmFsdWUgZm9yIHRoZSBsZWZ0IGNvb3JkaW5hdGUgb2YgZGlhbG9nIGluIGRyYWdnaW5nLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG1pblg6IG51bWJlciA9IDA7XG4gICAgLyoqXG4gICAgICogTWluaW11bSB2YWx1ZSBmb3IgdGhlIHRvcCBjb29yZGluYXRlIG9mIGRpYWxvZyBpbiBkcmFnZ2luZy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBtaW5ZOiBudW1iZXIgPSAwO1xuICAgIC8qKlxuICAgICAqIFdoZW4gZW5hYmxlZCwgZmlyc3QgYnV0dG9uIHJlY2VpdmVzIGZvY3VzIG9uIHNob3cuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZm9jdXNPblNob3c6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIGRpYWxvZyBjYW4gYmUgZGlzcGxheWVkIGZ1bGwgc2NyZWVuLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG1heGltaXphYmxlOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogS2VlcHMgZGlhbG9nIGluIHRoZSB2aWV3cG9ydC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBrZWVwSW5WaWV3cG9ydDogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogV2hlbiBlbmFibGVkLCBjYW4gb25seSBmb2N1cyBvbiBlbGVtZW50cyBpbnNpZGUgdGhlIGRpYWxvZy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBmb2N1c1RyYXA6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIFRyYW5zaXRpb24gb3B0aW9ucyBvZiB0aGUgYW5pbWF0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHRyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgPSAnMTUwbXMgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMiwgMSknO1xuICAgIC8qKlxuICAgICAqIE5hbWUgb2YgdGhlIGNsb3NlIGljb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgY2xvc2VJY29uOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBhIHN0cmluZyB0aGF0IGxhYmVscyB0aGUgY2xvc2UgYnV0dG9uIGZvciBhY2Nlc3NpYmlsaXR5LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGNsb3NlQXJpYUxhYmVsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSW5kZXggb2YgdGhlIGNsb3NlIGJ1dHRvbiBpbiB0YWJiaW5nIG9yZGVyLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGNsb3NlVGFiaW5kZXg6IHN0cmluZyA9ICctMSc7XG4gICAgLyoqXG4gICAgICogTmFtZSBvZiB0aGUgbWluaW1pemUgaWNvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBtaW5pbWl6ZUljb246IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBOYW1lIG9mIHRoZSBtYXhpbWl6ZSBpY29uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG1heGltaXplSWNvbjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFNwZWNpZmllcyB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgZGlhbG9nLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCB2aXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmlzaWJsZTtcbiAgICB9XG4gICAgc2V0IHZpc2libGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fdmlzaWJsZSA9IHZhbHVlO1xuXG4gICAgICAgIGlmICh0aGlzLl92aXNpYmxlICYmICF0aGlzLm1hc2tWaXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLm1hc2tWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbmxpbmUgc3R5bGUgb2YgdGhlIGNvbXBvbmVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgc3R5bGUoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0eWxlO1xuICAgIH1cbiAgICBzZXQgc3R5bGUodmFsdWU6IGFueSkge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0eWxlID0geyAuLi52YWx1ZSB9O1xuICAgICAgICAgICAgdGhpcy5vcmlnaW5hbFN0eWxlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUG9zaXRpb24gb2YgdGhlIGRpYWxvZy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgcG9zaXRpb24oKTogJ2NlbnRlcicgfCAndG9wJyB8ICdib3R0b20nIHwgJ2xlZnQnIHwgJ3JpZ2h0JyB8ICd0b3BsZWZ0JyB8ICd0b3ByaWdodCcgfCAnYm90dG9tbGVmdCcgfCAnYm90dG9tcmlnaHQnIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Bvc2l0aW9uO1xuICAgIH1cbiAgICBzZXQgcG9zaXRpb24odmFsdWU6ICdjZW50ZXInIHwgJ3RvcCcgfCAnYm90dG9tJyB8ICdsZWZ0JyB8ICdyaWdodCcgfCAndG9wbGVmdCcgfCAndG9wcmlnaHQnIHwgJ2JvdHRvbWxlZnQnIHwgJ2JvdHRvbXJpZ2h0Jykge1xuICAgICAgICB0aGlzLl9wb3NpdGlvbiA9IHZhbHVlO1xuXG4gICAgICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3RvcGxlZnQnOlxuICAgICAgICAgICAgY2FzZSAnYm90dG9tbGVmdCc6XG4gICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zZm9ybU9wdGlvbnMgPSAndHJhbnNsYXRlM2QoLTEwMCUsIDBweCwgMHB4KSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd0b3ByaWdodCc6XG4gICAgICAgICAgICBjYXNlICdib3R0b21yaWdodCc6XG4gICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm1PcHRpb25zID0gJ3RyYW5zbGF0ZTNkKDEwMCUsIDBweCwgMHB4KSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtT3B0aW9ucyA9ICd0cmFuc2xhdGUzZCgwcHgsIDEwMCUsIDBweCknO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zZm9ybU9wdGlvbnMgPSAndHJhbnNsYXRlM2QoMHB4LCAtMTAwJSwgMHB4KSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtT3B0aW9ucyA9ICdzY2FsZSgwLjcpJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBkaWFsb2cgaXMgc2hvd24uXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uU2hvdzogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBkaWFsb2cgaXMgaGlkZGVuLlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkhpZGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gICAgLyoqXG4gICAgICogVGhpcyBFdmVudEVtaXR0ZXIgaXMgdXNlZCB0byBub3RpZnkgY2hhbmdlcyBpbiB0aGUgdmlzaWJpbGl0eSBzdGF0ZSBvZiBhIGNvbXBvbmVudC5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHZhbHVlIC0gTmV3IHZhbHVlLlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSB2aXNpYmxlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gZGlhbG9nIHJlc2l6aW5nIGlzIGluaXRpYXRlZC5cbiAgICAgKiBAcGFyYW0ge01vdXNlRXZlbnR9IGV2ZW50IC0gTW91c2UgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uUmVzaXplSW5pdDogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGRpYWxvZyByZXNpemluZyBpcyBjb21wbGV0ZWQuXG4gICAgICogQHBhcmFtIHtNb3VzZUV2ZW50fSBldmVudCAtIE1vdXNlIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvblJlc2l6ZUVuZDogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGRpYWxvZyBkcmFnZ2luZyBpcyBjb21wbGV0ZWQuXG4gICAgICogQHBhcmFtIHtEcmFnRXZlbnR9IGV2ZW50IC0gRHJhZyBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25EcmFnRW5kOiBFdmVudEVtaXR0ZXI8RHJhZ0V2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8RHJhZ0V2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGRpYWxvZyBtYXhpbWl6ZWQgb3IgdW5tYXhpbWl6ZWQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uTWF4aW1pemU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBAQ29udGVudENoaWxkKEhlYWRlcikgaGVhZGVyRmFjZXQ6IFF1ZXJ5TGlzdDxIZWFkZXI+IHwgdW5kZWZpbmVkO1xuXG4gICAgQENvbnRlbnRDaGlsZChGb290ZXIpIGZvb3RlckZhY2V0OiBRdWVyeUxpc3Q8Rm9vdGVyPiB8IHVuZGVmaW5lZDtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT4gfCB1bmRlZmluZWQ7XG5cbiAgICBAVmlld0NoaWxkKCd0aXRsZWJhcicpIGhlYWRlclZpZXdDaGlsZDogTnVsbGFibGU8RWxlbWVudFJlZj47XG5cbiAgICBAVmlld0NoaWxkKCdjb250ZW50JykgY29udGVudFZpZXdDaGlsZDogTnVsbGFibGU8RWxlbWVudFJlZj47XG5cbiAgICBAVmlld0NoaWxkKCdmb290ZXInKSBmb290ZXJWaWV3Q2hpbGQ6IE51bGxhYmxlPEVsZW1lbnRSZWY+O1xuXG4gICAgaGVhZGVyVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgY29udGVudFRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGZvb3RlclRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIG1heGltaXplSWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGNsb3NlSWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIG1pbmltaXplSWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIF92aXNpYmxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBtYXNrVmlzaWJsZTogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIGNvbnRhaW5lcjogTnVsbGFibGU8SFRNTERpdkVsZW1lbnQ+O1xuXG4gICAgd3JhcHBlcjogTnVsbGFibGU8SFRNTEVsZW1lbnQ+O1xuXG4gICAgZHJhZ2dpbmc6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBhcmlhTGFiZWxsZWRCeTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgZG9jdW1lbnREcmFnTGlzdGVuZXI6IFZvaWRMaXN0ZW5lcjtcblxuICAgIGRvY3VtZW50RHJhZ0VuZExpc3RlbmVyOiBWb2lkTGlzdGVuZXI7XG5cbiAgICByZXNpemluZzogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIGRvY3VtZW50UmVzaXplTGlzdGVuZXI6IFZvaWRMaXN0ZW5lcjtcblxuICAgIGRvY3VtZW50UmVzaXplRW5kTGlzdGVuZXI6IFZvaWRMaXN0ZW5lcjtcblxuICAgIGRvY3VtZW50RXNjYXBlTGlzdGVuZXI6IFZvaWRMaXN0ZW5lcjtcblxuICAgIG1hc2tDbGlja0xpc3RlbmVyOiBWb2lkTGlzdGVuZXI7XG5cbiAgICBsYXN0UGFnZVg6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgIGxhc3RQYWdlWTogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gICAgcHJldmVudFZpc2libGVDaGFuZ2VQcm9wYWdhdGlvbjogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIG1heGltaXplZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIHByZU1heGltaXplQ29udGVudEhlaWdodDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gICAgcHJlTWF4aW1pemVDb250YWluZXJXaWR0aDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gICAgcHJlTWF4aW1pemVDb250YWluZXJIZWlnaHQ6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgIHByZU1heGltaXplUGFnZVg6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgIHByZU1heGltaXplUGFnZVk6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgIGlkOiBzdHJpbmcgPSBVbmlxdWVDb21wb25lbnRJZCgpO1xuXG4gICAgX3N0eWxlOiBhbnkgPSB7fTtcblxuICAgIF9wb3NpdGlvbjogJ2NlbnRlcicgfCAndG9wJyB8ICdib3R0b20nIHwgJ2xlZnQnIHwgJ3JpZ2h0JyB8ICd0b3BsZWZ0JyB8ICd0b3ByaWdodCcgfCAnYm90dG9tbGVmdCcgfCAnYm90dG9tcmlnaHQnID0gJ2NlbnRlcic7XG5cbiAgICBvcmlnaW5hbFN0eWxlOiBhbnk7XG5cbiAgICB0cmFuc2Zvcm1PcHRpb25zOiBhbnkgPSAnc2NhbGUoMC43KSc7XG5cbiAgICBzdHlsZUVsZW1lbnQ6IGFueTtcblxuICAgIHByaXZhdGUgd2luZG93OiBXaW5kb3c7XG5cbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudCwgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBhbnksIHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHB1YmxpYyB6b25lOiBOZ1pvbmUsIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLCBwdWJsaWMgY29uZmlnOiBQcmltZU5HQ29uZmlnKSB7XG4gICAgICAgIHRoaXMud2luZG93ID0gdGhpcy5kb2N1bWVudC5kZWZhdWx0VmlldyBhcyBXaW5kb3c7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlcz8uZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChpdGVtLmdldFR5cGUoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2hlYWRlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhZGVyVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2NvbnRlbnQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZm9vdGVyJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb290ZXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnY2xvc2VpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZUljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnbWF4aW1pemVpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXhpbWl6ZUljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnbWluaW1pemVpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5taW5pbWl6ZUljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmJyZWFrcG9pbnRzKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVN0eWxlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRBcmlhTGFiZWxsZWRCeSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVhZGVyICE9PSBudWxsID8gVW5pcXVlQ29tcG9uZW50SWQoKSArICdfaGVhZGVyJyA6IG51bGw7XG4gICAgfVxuXG4gICAgZm9jdXMoKSB7XG4gICAgICAgIGxldCBmb2N1c2FibGUgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5jb250YWluZXIsICdbYXV0b2ZvY3VzXScpO1xuICAgICAgICBpZiAoZm9jdXNhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gZm9jdXNhYmxlLmZvY3VzKCksIDUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbG9zZShldmVudDogRXZlbnQpIHtcbiAgICAgICAgdGhpcy52aXNpYmxlQ2hhbmdlLmVtaXQoZmFsc2UpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGVuYWJsZU1vZGFsaXR5KCkge1xuICAgICAgICBpZiAodGhpcy5jbG9zYWJsZSAmJiB0aGlzLmRpc21pc3NhYmxlTWFzaykge1xuICAgICAgICAgICAgdGhpcy5tYXNrQ2xpY2tMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMud3JhcHBlciwgJ21vdXNlZG93bicsIChldmVudDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMud3JhcHBlciAmJiB0aGlzLndyYXBwZXIuaXNTYW1lTm9kZShldmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubW9kYWwpIHtcbiAgICAgICAgICAgIERvbUhhbmRsZXIuYmxvY2tCb2R5U2Nyb2xsKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaXNhYmxlTW9kYWxpdHkoKSB7XG4gICAgICAgIGlmICh0aGlzLndyYXBwZXIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRpc21pc3NhYmxlTWFzaykge1xuICAgICAgICAgICAgICAgIHRoaXMudW5iaW5kTWFza0NsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMubW9kYWwpIHtcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLnVuYmxvY2tCb2R5U2Nyb2xsKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghKHRoaXMuY2QgYXMgVmlld1JlZikuZGVzdHJveWVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtYXhpbWl6ZSgpIHtcbiAgICAgICAgdGhpcy5tYXhpbWl6ZWQgPSAhdGhpcy5tYXhpbWl6ZWQ7XG5cbiAgICAgICAgaWYgKCF0aGlzLm1vZGFsICYmICF0aGlzLmJsb2NrU2Nyb2xsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5tYXhpbWl6ZWQpIHtcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmJsb2NrQm9keVNjcm9sbCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLnVuYmxvY2tCb2R5U2Nyb2xsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uTWF4aW1pemUuZW1pdCh7IG1heGltaXplZDogdGhpcy5tYXhpbWl6ZWQgfSk7XG4gICAgfVxuXG4gICAgdW5iaW5kTWFza0NsaWNrTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLm1hc2tDbGlja0xpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLm1hc2tDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLm1hc2tDbGlja0xpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVPblRvcCgpIHtcbiAgICAgICAgaWYgKHRoaXMuYXV0b1pJbmRleCkge1xuICAgICAgICAgICAgWkluZGV4VXRpbHMuc2V0KCdtb2RhbCcsIHRoaXMuY29udGFpbmVyLCB0aGlzLmJhc2VaSW5kZXggKyB0aGlzLmNvbmZpZy56SW5kZXgubW9kYWwpO1xuICAgICAgICAgICAgKHRoaXMud3JhcHBlciBhcyBIVE1MRWxlbWVudCkuc3R5bGUuekluZGV4ID0gU3RyaW5nKHBhcnNlSW50KCh0aGlzLmNvbnRhaW5lciBhcyBIVE1MRGl2RWxlbWVudCkuc3R5bGUuekluZGV4LCAxMCkgLSAxKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZVN0eWxlKCkge1xuICAgICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnN0eWxlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3R5bGVFbGVtZW50ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3R5bGVFbGVtZW50LnR5cGUgPSAndGV4dC9jc3MnO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5kb2N1bWVudC5oZWFkLCB0aGlzLnN0eWxlRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgbGV0IGlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGJyZWFrcG9pbnQgaW4gdGhpcy5icmVha3BvaW50cykge1xuICAgICAgICAgICAgICAgICAgICBpbm5lckhUTUwgKz0gYFxuICAgICAgICAgICAgICAgICAgICAgICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogJHticmVha3BvaW50fSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wLWRpYWxvZ1ske3RoaXMuaWR9XTpub3QoLnAtZGlhbG9nLW1heGltaXplZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJHt0aGlzLmJyZWFrcG9pbnRzW2JyZWFrcG9pbnRdfSAhaW1wb3J0YW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuc3R5bGVFbGVtZW50LCAnaW5uZXJIVE1MJywgaW5uZXJIVE1MKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXREcmFnKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGlmIChEb21IYW5kbGVyLmhhc0NsYXNzKGV2ZW50LnRhcmdldCwgJ3AtZGlhbG9nLWhlYWRlci1pY29uJykgfHwgRG9tSGFuZGxlci5oYXNDbGFzcygoPEhUTUxFbGVtZW50PmV2ZW50LnRhcmdldCkucGFyZW50RWxlbWVudCwgJ3AtZGlhbG9nLWhlYWRlci1pY29uJykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRyYWdnYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5kcmFnZ2luZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmxhc3RQYWdlWCA9IGV2ZW50LnBhZ2VYO1xuICAgICAgICAgICAgdGhpcy5sYXN0UGFnZVkgPSBldmVudC5wYWdlWTtcblxuICAgICAgICAgICAgKHRoaXMuY29udGFpbmVyIGFzIEhUTUxEaXZFbGVtZW50KS5zdHlsZS5tYXJnaW4gPSAnMCc7XG4gICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMuZG9jdW1lbnQuYm9keSwgJ3AtdW5zZWxlY3RhYmxlLXRleHQnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5mb2N1c1RyYXApIHtcbiAgICAgICAgICAgIGlmIChldmVudC53aGljaCA9PT0gOSkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgZm9jdXNhYmxlRWxlbWVudHMgPSBEb21IYW5kbGVyLmdldEZvY3VzYWJsZUVsZW1lbnRzKHRoaXMuY29udGFpbmVyIGFzIEhUTUxEaXZFbGVtZW50KTtcblxuICAgICAgICAgICAgICAgIGlmIChmb2N1c2FibGVFbGVtZW50cyAmJiBmb2N1c2FibGVFbGVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZm9jdXNhYmxlRWxlbWVudHNbMF0ub3duZXJEb2N1bWVudC5hY3RpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb2N1c2FibGVFbGVtZW50c1swXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZvY3VzZWRJbmRleCA9IGZvY3VzYWJsZUVsZW1lbnRzLmluZGV4T2YoZm9jdXNhYmxlRWxlbWVudHNbMF0ub3duZXJEb2N1bWVudC5hY3RpdmVFbGVtZW50KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvY3VzZWRJbmRleCA9PSAtMSB8fCBmb2N1c2VkSW5kZXggPT09IDApIGZvY3VzYWJsZUVsZW1lbnRzW2ZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aCAtIDFdLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBmb2N1c2FibGVFbGVtZW50c1tmb2N1c2VkSW5kZXggLSAxXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9jdXNlZEluZGV4ID09IC0xIHx8IGZvY3VzZWRJbmRleCA9PT0gZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoIC0gMSkgZm9jdXNhYmxlRWxlbWVudHNbMF0uZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGZvY3VzYWJsZUVsZW1lbnRzW2ZvY3VzZWRJbmRleCArIDFdLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkRyYWcoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lcldpZHRoID0gRG9tSGFuZGxlci5nZXRPdXRlcldpZHRoKHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lckhlaWdodCA9IERvbUhhbmRsZXIuZ2V0T3V0ZXJIZWlnaHQodGhpcy5jb250YWluZXIpO1xuICAgICAgICAgICAgY29uc3QgZGVsdGFYID0gZXZlbnQucGFnZVggLSAodGhpcy5sYXN0UGFnZVggYXMgbnVtYmVyKTtcbiAgICAgICAgICAgIGNvbnN0IGRlbHRhWSA9IGV2ZW50LnBhZ2VZIC0gKHRoaXMubGFzdFBhZ2VZIGFzIG51bWJlcik7XG4gICAgICAgICAgICBjb25zdCBvZmZzZXQgPSB0aGlzLmNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyQ29tcHV0ZWRTdHlsZSA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5jb250YWluZXIpO1xuXG4gICAgICAgICAgICBjb25zdCBsZWZ0TWFyZ2luID0gcGFyc2VGbG9hdChjb250YWluZXJDb21wdXRlZFN0eWxlLm1hcmdpbkxlZnQpO1xuICAgICAgICAgICAgY29uc3QgdG9wTWFyZ2luID0gcGFyc2VGbG9hdChjb250YWluZXJDb21wdXRlZFN0eWxlLm1hcmdpblRvcCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGxlZnRQb3MgPSBvZmZzZXQubGVmdCArIGRlbHRhWCAtIGxlZnRNYXJnaW47XG4gICAgICAgICAgICBjb25zdCB0b3BQb3MgPSBvZmZzZXQudG9wICsgZGVsdGFZIC0gdG9wTWFyZ2luO1xuICAgICAgICAgICAgY29uc3Qgdmlld3BvcnQgPSBEb21IYW5kbGVyLmdldFZpZXdwb3J0KCk7XG5cbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcblxuICAgICAgICAgICAgaWYgKHRoaXMua2VlcEluVmlld3BvcnQpIHtcbiAgICAgICAgICAgICAgICBpZiAobGVmdFBvcyA+PSB0aGlzLm1pblggJiYgbGVmdFBvcyArIGNvbnRhaW5lcldpZHRoIDwgdmlld3BvcnQud2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3R5bGUubGVmdCA9IGAke2xlZnRQb3N9cHhgO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RQYWdlWCA9IGV2ZW50LnBhZ2VYO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gYCR7bGVmdFBvc31weGA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRvcFBvcyA+PSB0aGlzLm1pblkgJiYgdG9wUG9zICsgY29udGFpbmVySGVpZ2h0IDwgdmlld3BvcnQuaGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0eWxlLnRvcCA9IGAke3RvcFBvc31weGA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdFBhZ2VZID0gZXZlbnQucGFnZVk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLnRvcCA9IGAke3RvcFBvc31weGA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RQYWdlWCA9IGV2ZW50LnBhZ2VYO1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmxlZnQgPSBgJHtsZWZ0UG9zfXB4YDtcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RQYWdlWSA9IGV2ZW50LnBhZ2VZO1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLnRvcCA9IGAke3RvcFBvc31weGA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlbmREcmFnKGV2ZW50OiBEcmFnRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3ModGhpcy5kb2N1bWVudC5ib2R5LCAncC11bnNlbGVjdGFibGUtdGV4dCcpO1xuICAgICAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICB0aGlzLm9uRHJhZ0VuZC5lbWl0KGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc2V0UG9zaXRpb24oKSB7XG4gICAgICAgICh0aGlzLmNvbnRhaW5lciBhcyBIVE1MRGl2RWxlbWVudCkuc3R5bGUucG9zaXRpb24gPSAnJztcbiAgICAgICAgKHRoaXMuY29udGFpbmVyIGFzIEhUTUxEaXZFbGVtZW50KS5zdHlsZS5sZWZ0ID0gJyc7XG4gICAgICAgICh0aGlzLmNvbnRhaW5lciBhcyBIVE1MRGl2RWxlbWVudCkuc3R5bGUudG9wID0gJyc7XG4gICAgICAgICh0aGlzLmNvbnRhaW5lciBhcyBIVE1MRGl2RWxlbWVudCkuc3R5bGUubWFyZ2luID0gJyc7XG4gICAgfVxuXG4gICAgLy9iYWNrd2FyZCBjb21wYXRpYmlsaXR5XG4gICAgY2VudGVyKCkge1xuICAgICAgICB0aGlzLnJlc2V0UG9zaXRpb24oKTtcbiAgICB9XG5cbiAgICBpbml0UmVzaXplKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnJlc2l6YWJsZSkge1xuICAgICAgICAgICAgdGhpcy5yZXNpemluZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmxhc3RQYWdlWCA9IGV2ZW50LnBhZ2VYO1xuICAgICAgICAgICAgdGhpcy5sYXN0UGFnZVkgPSBldmVudC5wYWdlWTtcbiAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3ModGhpcy5kb2N1bWVudC5ib2R5LCAncC11bnNlbGVjdGFibGUtdGV4dCcpO1xuICAgICAgICAgICAgdGhpcy5vblJlc2l6ZUluaXQuZW1pdChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblJlc2l6ZShldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5yZXNpemluZykge1xuICAgICAgICAgICAgbGV0IGRlbHRhWCA9IGV2ZW50LnBhZ2VYIC0gKHRoaXMubGFzdFBhZ2VYIGFzIG51bWJlcik7XG4gICAgICAgICAgICBsZXQgZGVsdGFZID0gZXZlbnQucGFnZVkgLSAodGhpcy5sYXN0UGFnZVkgYXMgbnVtYmVyKTtcbiAgICAgICAgICAgIGxldCBjb250YWluZXJXaWR0aCA9IERvbUhhbmRsZXIuZ2V0T3V0ZXJXaWR0aCh0aGlzLmNvbnRhaW5lcik7XG4gICAgICAgICAgICBsZXQgY29udGFpbmVySGVpZ2h0ID0gRG9tSGFuZGxlci5nZXRPdXRlckhlaWdodCh0aGlzLmNvbnRhaW5lcik7XG4gICAgICAgICAgICBsZXQgY29udGVudEhlaWdodCA9IERvbUhhbmRsZXIuZ2V0T3V0ZXJIZWlnaHQodGhpcy5jb250ZW50Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgIGxldCBuZXdXaWR0aCA9IGNvbnRhaW5lcldpZHRoICsgZGVsdGFYO1xuICAgICAgICAgICAgbGV0IG5ld0hlaWdodCA9IGNvbnRhaW5lckhlaWdodCArIGRlbHRhWTtcbiAgICAgICAgICAgIGxldCBtaW5XaWR0aCA9ICh0aGlzLmNvbnRhaW5lciBhcyBIVE1MRGl2RWxlbWVudCkuc3R5bGUubWluV2lkdGg7XG4gICAgICAgICAgICBsZXQgbWluSGVpZ2h0ID0gKHRoaXMuY29udGFpbmVyIGFzIEhUTUxEaXZFbGVtZW50KS5zdHlsZS5taW5IZWlnaHQ7XG4gICAgICAgICAgICBsZXQgb2Zmc2V0ID0gKHRoaXMuY29udGFpbmVyIGFzIEhUTUxEaXZFbGVtZW50KS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIGxldCB2aWV3cG9ydCA9IERvbUhhbmRsZXIuZ2V0Vmlld3BvcnQoKTtcbiAgICAgICAgICAgIGxldCBoYXNCZWVuRHJhZ2dlZCA9ICFwYXJzZUludCgodGhpcy5jb250YWluZXIgYXMgSFRNTERpdkVsZW1lbnQpLnN0eWxlLnRvcCkgfHwgIXBhcnNlSW50KCh0aGlzLmNvbnRhaW5lciBhcyBIVE1MRGl2RWxlbWVudCkuc3R5bGUubGVmdCk7XG5cbiAgICAgICAgICAgIGlmIChoYXNCZWVuRHJhZ2dlZCkge1xuICAgICAgICAgICAgICAgIG5ld1dpZHRoICs9IGRlbHRhWDtcbiAgICAgICAgICAgICAgICBuZXdIZWlnaHQgKz0gZGVsdGFZO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoKCFtaW5XaWR0aCB8fCBuZXdXaWR0aCA+IHBhcnNlSW50KG1pbldpZHRoKSkgJiYgb2Zmc2V0LmxlZnQgKyBuZXdXaWR0aCA8IHZpZXdwb3J0LndpZHRoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3R5bGUud2lkdGggPSBuZXdXaWR0aCArICdweCc7XG4gICAgICAgICAgICAgICAgKHRoaXMuY29udGFpbmVyIGFzIEhUTUxEaXZFbGVtZW50KS5zdHlsZS53aWR0aCA9IHRoaXMuX3N0eWxlLndpZHRoO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoKCFtaW5IZWlnaHQgfHwgbmV3SGVpZ2h0ID4gcGFyc2VJbnQobWluSGVpZ2h0KSkgJiYgb2Zmc2V0LnRvcCArIG5ld0hlaWdodCA8IHZpZXdwb3J0LmhlaWdodCkge1xuICAgICAgICAgICAgICAgICg8RWxlbWVudFJlZj50aGlzLmNvbnRlbnRWaWV3Q2hpbGQpLm5hdGl2ZUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gY29udGVudEhlaWdodCArIG5ld0hlaWdodCAtIGNvbnRhaW5lckhlaWdodCArICdweCc7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc3R5bGUuaGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0eWxlLmhlaWdodCA9IG5ld0hlaWdodCArICdweCc7XG4gICAgICAgICAgICAgICAgICAgICh0aGlzLmNvbnRhaW5lciBhcyBIVE1MRGl2RWxlbWVudCkuc3R5bGUuaGVpZ2h0ID0gdGhpcy5fc3R5bGUuaGVpZ2h0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5sYXN0UGFnZVggPSBldmVudC5wYWdlWDtcbiAgICAgICAgICAgIHRoaXMubGFzdFBhZ2VZID0gZXZlbnQucGFnZVk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXNpemVFbmQoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucmVzaXppbmcpIHtcbiAgICAgICAgICAgIHRoaXMucmVzaXppbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3ModGhpcy5kb2N1bWVudC5ib2R5LCAncC11bnNlbGVjdGFibGUtdGV4dCcpO1xuICAgICAgICAgICAgdGhpcy5vblJlc2l6ZUVuZC5lbWl0KGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmRHbG9iYWxMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGlmICh0aGlzLmRyYWdnYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnREcmFnTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMuYmluZERvY3VtZW50RHJhZ0VuZExpc3RlbmVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5yZXNpemFibGUpIHtcbiAgICAgICAgICAgIHRoaXMuYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXJzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jbG9zZU9uRXNjYXBlICYmIHRoaXMuY2xvc2FibGUpIHtcbiAgICAgICAgICAgIHRoaXMuYmluZERvY3VtZW50RXNjYXBlTGlzdGVuZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuYmluZEdsb2JhbExpc3RlbmVycygpIHtcbiAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudERyYWdMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50RHJhZ0VuZExpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMudW5iaW5kRG9jdW1lbnRSZXNpemVMaXN0ZW5lcnMoKTtcbiAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudEVzY2FwZUxpc3RlbmVyKCk7XG4gICAgfVxuXG4gICAgYmluZERvY3VtZW50RHJhZ0xpc3RlbmVyKCkge1xuICAgICAgICBpZiAoIXRoaXMuZG9jdW1lbnREcmFnTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kb2N1bWVudERyYWdMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMud2luZG93LCAnbW91c2Vtb3ZlJywgdGhpcy5vbkRyYWcuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuYmluZERvY3VtZW50RHJhZ0xpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5kb2N1bWVudERyYWdMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudERyYWdMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudERyYWdMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiaW5kRG9jdW1lbnREcmFnRW5kTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5kb2N1bWVudERyYWdFbmRMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRvY3VtZW50RHJhZ0VuZExpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy53aW5kb3csICdtb3VzZXVwJywgdGhpcy5lbmREcmFnLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmJpbmREb2N1bWVudERyYWdFbmRMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnREcmFnRW5kTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnREcmFnRW5kTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnREcmFnRW5kTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXJzKCkge1xuICAgICAgICBpZiAoIXRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lciAmJiAhdGhpcy5kb2N1bWVudFJlc2l6ZUVuZExpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMud2luZG93LCAnbW91c2Vtb3ZlJywgdGhpcy5vblJlc2l6ZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRvY3VtZW50UmVzaXplRW5kTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLndpbmRvdywgJ21vdXNldXAnLCB0aGlzLnJlc2l6ZUVuZC5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5iaW5kRG9jdW1lbnRSZXNpemVMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIgJiYgdGhpcy5kb2N1bWVudFJlc2l6ZUVuZExpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRSZXNpemVFbmRMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRSZXNpemVFbmRMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiaW5kRG9jdW1lbnRFc2NhcGVMaXN0ZW5lcigpIHtcbiAgICAgICAgY29uc3QgZG9jdW1lbnRUYXJnZXQ6IGFueSA9IHRoaXMuZWwgPyB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQub3duZXJEb2N1bWVudCA6ICdkb2N1bWVudCc7XG5cbiAgICAgICAgdGhpcy5kb2N1bWVudEVzY2FwZUxpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oZG9jdW1lbnRUYXJnZXQsICdrZXlkb3duJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQud2hpY2ggPT0gMjcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdW5iaW5kRG9jdW1lbnRFc2NhcGVMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnRFc2NhcGVMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudEVzY2FwZUxpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50RXNjYXBlTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXBwZW5kQ29udGFpbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5hcHBlbmRUbykge1xuICAgICAgICAgICAgaWYgKHRoaXMuYXBwZW5kVG8gPT09ICdib2R5JykgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmRvY3VtZW50LmJvZHksIHRoaXMud3JhcHBlcik7XG4gICAgICAgICAgICBlbHNlIERvbUhhbmRsZXIuYXBwZW5kQ2hpbGQodGhpcy53cmFwcGVyLCB0aGlzLmFwcGVuZFRvKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc3RvcmVBcHBlbmQoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRhaW5lciAmJiB0aGlzLmFwcGVuZFRvKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgdGhpcy53cmFwcGVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQW5pbWF0aW9uU3RhcnQoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQudG9TdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAndmlzaWJsZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIgPSBldmVudC5lbGVtZW50O1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcHBlciA9IHRoaXMuY29udGFpbmVyPy5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kQ29udGFpbmVyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlT25Ub3AoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRHbG9iYWxMaXN0ZW5lcnMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lcj8uc2V0QXR0cmlidXRlKHRoaXMuaWQsICcnKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1vZGFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlTW9kYWxpdHkoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMubW9kYWwgJiYgdGhpcy5ibG9ja1Njcm9sbCkge1xuICAgICAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMuZG9jdW1lbnQuYm9keSwgJ3Atb3ZlcmZsb3ctaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZm9jdXNPblNob3cpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAndm9pZCc6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMud3JhcHBlciAmJiB0aGlzLm1vZGFsKSB7XG4gICAgICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3ModGhpcy53cmFwcGVyLCAncC1jb21wb25lbnQtb3ZlcmxheS1sZWF2ZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQW5pbWF0aW9uRW5kKGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LnRvU3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3ZvaWQnOlxuICAgICAgICAgICAgICAgIHRoaXMub25Db250YWluZXJEZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkhpZGUuZW1pdCh7fSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3Zpc2libGUnOlxuICAgICAgICAgICAgICAgIHRoaXMub25TaG93LmVtaXQoe30pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Db250YWluZXJEZXN0cm95KCkge1xuICAgICAgICB0aGlzLnVuYmluZEdsb2JhbExpc3RlbmVycygpO1xuICAgICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5tYXNrVmlzaWJsZSA9IGZhbHNlO1xuXG4gICAgICAgIGlmICh0aGlzLm1heGltaXplZCkge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLmRvY3VtZW50LmJvZHksICdwLW92ZXJmbG93LWhpZGRlbicpO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudC5ib2R5LnN0eWxlLnJlbW92ZVByb3BlcnR5KCctLXNjcm9sbGJhci13aWR0aCcpO1xuICAgICAgICAgICAgdGhpcy5tYXhpbWl6ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1vZGFsKSB7XG4gICAgICAgICAgICB0aGlzLmRpc2FibGVNb2RhbGl0eSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuYmxvY2tTY3JvbGwpIHtcbiAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3ModGhpcy5kb2N1bWVudC5ib2R5LCAncC1vdmVyZmxvdy1oaWRkZW4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNvbnRhaW5lciAmJiB0aGlzLmF1dG9aSW5kZXgpIHtcbiAgICAgICAgICAgIFpJbmRleFV0aWxzLmNsZWFyKHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gbnVsbDtcbiAgICAgICAgdGhpcy53cmFwcGVyID0gbnVsbDtcblxuICAgICAgICB0aGlzLl9zdHlsZSA9IHRoaXMub3JpZ2luYWxTdHlsZSA/IHsgLi4udGhpcy5vcmlnaW5hbFN0eWxlIH0gOiB7fTtcbiAgICB9XG5cbiAgICBkZXN0cm95U3R5bGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0eWxlRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLmRvY3VtZW50LmhlYWQsIHRoaXMuc3R5bGVFbGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMuc3R5bGVFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5jb250YWluZXIpIHtcbiAgICAgICAgICAgIHRoaXMucmVzdG9yZUFwcGVuZCgpO1xuICAgICAgICAgICAgdGhpcy5vbkNvbnRhaW5lckRlc3Ryb3koKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGVzdHJveVN0eWxlKCk7XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvY3VzVHJhcE1vZHVsZSwgUmlwcGxlTW9kdWxlLCBUaW1lc0ljb24sIFdpbmRvd01heGltaXplSWNvbiwgV2luZG93TWluaW1pemVJY29uXSxcbiAgICBleHBvcnRzOiBbRGlhbG9nLCBTaGFyZWRNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW0RpYWxvZ11cbn0pXG5leHBvcnQgY2xhc3MgRGlhbG9nTW9kdWxlIHt9XG4iXX0=