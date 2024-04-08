import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, HostListener, Inject, Input, NgModule, Output, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { ConnectedOverlayScrollHandler, DomHandler } from 'primeng/dom';
import { TimesIcon } from 'primeng/icons/times';
import { RippleModule } from 'primeng/ripple';
import { ZIndexUtils } from 'primeng/utils';
import * as i0 from "@angular/core";
import * as i1 from "primeng/api";
import * as i2 from "@angular/common";
import * as i3 from "primeng/ripple";
/**
 * OverlayPanel is a container component positioned as connected to its target.
 * @group Components
 */
export class OverlayPanel {
    document;
    platformId;
    el;
    renderer;
    cd;
    zone;
    config;
    overlayService;
    /**
     * Enables to hide the overlay when outside is clicked.
     * @group Props
     */
    dismissable = true;
    /**
     * When enabled, displays a close icon at top right corner.
     * @group Props
     */
    showCloseIcon;
    /**
     * Inline style of the component.
     * @group Props
     */
    style;
    /**
     * Style class of the component.
     * @group Props
     */
    styleClass;
    /**
     *  Target element to attach the panel, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @group Props
     */
    appendTo = 'body';
    /**
     * Whether to automatically manage layering.
     * @group Props
     */
    autoZIndex = true;
    /**
     * Aria label of the close icon.
     * @group Props
     */
    ariaCloseLabel;
    /**
     * Base zIndex value to use in layering.
     * @group Props
     */
    baseZIndex = 0;
    /**
     * When enabled, first button receives focus on show.
     * @group Props
     */
    focusOnShow = true;
    /**
     * Transition options of the show animation.
     * @group Props
     */
    showTransitionOptions = '.12s cubic-bezier(0, 0, 0.2, 1)';
    /**
     * Transition options of the hide animation.
     * @group Props
     */
    hideTransitionOptions = '.1s linear';
    /**
     * Callback to invoke when an overlay becomes visible.
     * @group Emits
     */
    onShow = new EventEmitter();
    /**
     * Callback to invoke when an overlay gets hidden.
     * @group Emits
     */
    onHide = new EventEmitter();
    templates;
    container;
    overlayVisible = false;
    render = false;
    isOverlayAnimationInProgress = false;
    selfClick = false;
    documentClickListener;
    target;
    willHide;
    scrollHandler;
    documentResizeListener;
    contentTemplate;
    closeIconTemplate;
    destroyCallback;
    overlayEventListener;
    overlaySubscription;
    constructor(document, platformId, el, renderer, cd, zone, config, overlayService) {
        this.document = document;
        this.platformId = platformId;
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.zone = zone;
        this.config = config;
        this.overlayService = overlayService;
    }
    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                case 'closeicon':
                    this.closeIconTemplate = item.template;
                    break;
                default:
                    this.contentTemplate = item.template;
                    break;
            }
            this.cd.markForCheck();
        });
    }
    bindDocumentClickListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.documentClickListener && this.dismissable) {
                let documentEvent = DomHandler.isIOS() ? 'touchstart' : 'click';
                const documentTarget = this.el ? this.el.nativeElement.ownerDocument : this.document;
                this.documentClickListener = this.renderer.listen(documentTarget, documentEvent, (event) => {
                    if (!this.container?.contains(event.target) && this.target !== event.target && !this.target.contains(event.target)) {
                        this.hide();
                    }
                    this.cd.markForCheck();
                });
            }
        }
    }
    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
            this.selfClick = false;
        }
    }
    /**
     * Toggles the visibility of the panel.
     * @param {Event} event - Browser event
     * @param {Target} target - Target element.
     * @group Method
     */
    toggle(event, target) {
        if (this.isOverlayAnimationInProgress) {
            return;
        }
        if (this.overlayVisible) {
            if (this.hasTargetChanged(event, target)) {
                this.destroyCallback = () => {
                    this.show(null, target || event.currentTarget || event.target);
                };
            }
            this.hide();
        }
        else {
            this.show(event, target);
        }
    }
    /**
     * Displays the panel.
     * @param {Event} event - Browser event
     * @param {Target} target - Target element.
     * @group Method
     */
    show(event, target) {
        target && event && event.stopPropagation();
        if (this.isOverlayAnimationInProgress) {
            return;
        }
        this.target = target || event.currentTarget || event.target;
        this.overlayVisible = true;
        this.render = true;
        this.cd.markForCheck();
    }
    onOverlayClick(event) {
        this.overlayService.add({
            originalEvent: event,
            target: this.el.nativeElement
        });
        this.selfClick = true;
    }
    onContentClick() {
        this.selfClick = true;
    }
    hasTargetChanged(event, target) {
        return this.target != null && this.target !== (target || event.currentTarget || event.target);
    }
    appendContainer() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                this.renderer.appendChild(this.document.body, this.container);
            else
                DomHandler.appendChild(this.container, this.appendTo);
        }
    }
    restoreAppend() {
        if (this.container && this.appendTo) {
            this.renderer.appendChild(this.el.nativeElement, this.container);
        }
    }
    align() {
        if (this.autoZIndex) {
            ZIndexUtils.set('overlay', this.container, this.baseZIndex + this.config.zIndex.overlay);
        }
        DomHandler.absolutePosition(this.container, this.target);
        const containerOffset = DomHandler.getOffset(this.container);
        const targetOffset = DomHandler.getOffset(this.target);
        const borderRadius = this.document.defaultView?.getComputedStyle(this.container).getPropertyValue('border-radius');
        let arrowLeft = 0;
        if (containerOffset.left < targetOffset.left) {
            arrowLeft = targetOffset.left - containerOffset.left - parseFloat(borderRadius) * 2;
        }
        this.container?.style.setProperty('--overlayArrowLeft', `${arrowLeft}px`);
        if (containerOffset.top < targetOffset.top) {
            DomHandler.addClass(this.container, 'p-overlaypanel-flipped');
            if (this.showCloseIcon) {
                this.renderer.setStyle(this.container, 'margin-top', '-30px');
            }
        }
    }
    onAnimationStart(event) {
        if (event.toState === 'open') {
            this.container = event.element;
            this.appendContainer();
            this.align();
            this.bindDocumentClickListener();
            this.bindDocumentResizeListener();
            this.bindScrollListener();
            if (this.focusOnShow) {
                this.focus();
            }
            this.overlayEventListener = (e) => {
                if (this.container && this.container.contains(e.target)) {
                    this.selfClick = true;
                }
            };
            this.overlaySubscription = this.overlayService.clickObservable.subscribe(this.overlayEventListener);
            this.onShow.emit(null);
        }
        this.isOverlayAnimationInProgress = true;
    }
    onAnimationEnd(event) {
        switch (event.toState) {
            case 'void':
                if (this.destroyCallback) {
                    this.destroyCallback();
                    this.destroyCallback = null;
                }
                if (this.overlaySubscription) {
                    this.overlaySubscription.unsubscribe();
                }
                break;
            case 'close':
                if (this.autoZIndex) {
                    ZIndexUtils.clear(this.container);
                }
                if (this.overlaySubscription) {
                    this.overlaySubscription.unsubscribe();
                }
                this.onContainerDestroy();
                this.onHide.emit({});
                this.render = false;
                break;
        }
        this.isOverlayAnimationInProgress = false;
    }
    focus() {
        let focusable = DomHandler.findSingle(this.container, '[autofocus]');
        if (focusable) {
            this.zone.runOutsideAngular(() => {
                setTimeout(() => focusable.focus(), 5);
            });
        }
    }
    /**
     * Hides the panel.
     * @group Method
     */
    hide() {
        this.overlayVisible = false;
        this.cd.markForCheck();
    }
    onCloseClick(event) {
        this.hide();
        event.preventDefault();
    }
    onEscapeKeydown(event) {
        this.hide();
    }
    onWindowResize() {
        if (this.overlayVisible && !DomHandler.isTouchDevice()) {
            this.hide();
        }
    }
    bindDocumentResizeListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.documentResizeListener) {
                const window = this.document.defaultView;
                this.documentResizeListener = this.renderer.listen(window, 'resize', this.onWindowResize.bind(this));
            }
        }
    }
    unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
            this.documentResizeListener();
            this.documentResizeListener = null;
        }
    }
    bindScrollListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.scrollHandler) {
                this.scrollHandler = new ConnectedOverlayScrollHandler(this.target, () => {
                    if (this.overlayVisible) {
                        this.hide();
                    }
                });
            }
            this.scrollHandler.bindScrollListener();
        }
    }
    unbindScrollListener() {
        if (this.scrollHandler) {
            this.scrollHandler.unbindScrollListener();
        }
    }
    onContainerDestroy() {
        if (!this.cd.destroyed) {
            this.target = null;
        }
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.unbindScrollListener();
    }
    ngOnDestroy() {
        if (this.scrollHandler) {
            this.scrollHandler.destroy();
            this.scrollHandler = null;
        }
        if (this.container && this.autoZIndex) {
            ZIndexUtils.clear(this.container);
        }
        if (!this.cd.destroyed) {
            this.target = null;
        }
        this.destroyCallback = null;
        if (this.container) {
            this.restoreAppend();
            this.onContainerDestroy();
        }
        if (this.overlaySubscription) {
            this.overlaySubscription.unsubscribe();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: OverlayPanel, deps: [{ token: DOCUMENT }, { token: PLATFORM_ID }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }, { token: i1.PrimeNGConfig }, { token: i1.OverlayService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: OverlayPanel, selector: "p-overlayPanel", inputs: { dismissable: "dismissable", showCloseIcon: "showCloseIcon", style: "style", styleClass: "styleClass", appendTo: "appendTo", autoZIndex: "autoZIndex", ariaCloseLabel: "ariaCloseLabel", baseZIndex: "baseZIndex", focusOnShow: "focusOnShow", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions" }, outputs: { onShow: "onShow", onHide: "onHide" }, host: { listeners: { "document:keydown.escape": "onEscapeKeydown($event)" }, classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], ngImport: i0, template: `
        <div
            *ngIf="render"
            [ngClass]="'p-overlaypanel p-component'"
            [ngStyle]="style"
            [class]="styleClass"
            (click)="onOverlayClick($event)"
            [@animation]="{ value: overlayVisible ? 'open' : 'close', params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions } }"
            (@animation.start)="onAnimationStart($event)"
            (@animation.done)="onAnimationEnd($event)"
            role="dialog"
            [attr.aria-modal]="overlayVisible"
        >
            <div class="p-overlaypanel-content" (click)="onContentClick()" (mousedown)="onContentClick()">
                <ng-content></ng-content>
                <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
            </div>
            <button *ngIf="showCloseIcon" type="button" class="p-overlaypanel-close p-link" (click)="onCloseClick($event)" (keydown.enter)="hide()" [attr.aria-label]="ariaCloseLabel" pRipple>
                <TimesIcon *ngIf="!closeIconTemplate" [styleClass]="'p-overlaypanel-close-icon'" />
                <span class="p-overlaypanel-close-icon" *ngIf="closeIconTemplate">
                    <ng-template *ngTemplateOutlet="closeIconTemplate"></ng-template>
                </span>
            </button>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-overlaypanel{position:absolute;margin-top:10px;top:0;left:0}.p-overlaypanel-flipped{margin-top:0;margin-bottom:10px}.p-overlaypanel-close{display:flex;justify-content:center;align-items:center;overflow:hidden;position:relative}.p-overlaypanel:after,.p-overlaypanel:before{bottom:100%;left:calc(var(--overlayArrowLeft, 0) + 1.25rem);content:\" \";height:0;width:0;position:absolute;pointer-events:none}.p-overlaypanel:after{border-width:8px;margin-left:-8px}.p-overlaypanel:before{border-width:10px;margin-left:-10px}.p-overlaypanel-shifted:after,.p-overlaypanel-shifted:before{left:auto;right:1.25em;margin-left:auto}.p-overlaypanel-flipped:after,.p-overlaypanel-flipped:before{bottom:auto;top:100%}.p-overlaypanel.p-overlaypanel-flipped:after{border-bottom-color:transparent}.p-overlaypanel.p-overlaypanel-flipped:before{border-bottom-color:transparent}}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(() => i2.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(() => i3.Ripple), selector: "[pRipple]" }, { kind: "component", type: i0.forwardRef(() => TimesIcon), selector: "TimesIcon" }], animations: [
            trigger('animation', [
                state('void', style({
                    transform: 'scaleY(0.8)',
                    opacity: 0
                })),
                state('close', style({
                    opacity: 0
                })),
                state('open', style({
                    transform: 'translateY(0)',
                    opacity: 1
                })),
                transition('void => open', animate('{{showTransitionParams}}')),
                transition('open => close', animate('{{hideTransitionParams}}'))
            ])
        ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: OverlayPanel, decorators: [{
            type: Component,
            args: [{ selector: 'p-overlayPanel', template: `
        <div
            *ngIf="render"
            [ngClass]="'p-overlaypanel p-component'"
            [ngStyle]="style"
            [class]="styleClass"
            (click)="onOverlayClick($event)"
            [@animation]="{ value: overlayVisible ? 'open' : 'close', params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions } }"
            (@animation.start)="onAnimationStart($event)"
            (@animation.done)="onAnimationEnd($event)"
            role="dialog"
            [attr.aria-modal]="overlayVisible"
        >
            <div class="p-overlaypanel-content" (click)="onContentClick()" (mousedown)="onContentClick()">
                <ng-content></ng-content>
                <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
            </div>
            <button *ngIf="showCloseIcon" type="button" class="p-overlaypanel-close p-link" (click)="onCloseClick($event)" (keydown.enter)="hide()" [attr.aria-label]="ariaCloseLabel" pRipple>
                <TimesIcon *ngIf="!closeIconTemplate" [styleClass]="'p-overlaypanel-close-icon'" />
                <span class="p-overlaypanel-close-icon" *ngIf="closeIconTemplate">
                    <ng-template *ngTemplateOutlet="closeIconTemplate"></ng-template>
                </span>
            </button>
        </div>
    `, animations: [
                        trigger('animation', [
                            state('void', style({
                                transform: 'scaleY(0.8)',
                                opacity: 0
                            })),
                            state('close', style({
                                opacity: 0
                            })),
                            state('open', style({
                                transform: 'translateY(0)',
                                opacity: 1
                            })),
                            transition('void => open', animate('{{showTransitionParams}}')),
                            transition('open => close', animate('{{hideTransitionParams}}'))
                        ])
                    ], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-overlaypanel{position:absolute;margin-top:10px;top:0;left:0}.p-overlaypanel-flipped{margin-top:0;margin-bottom:10px}.p-overlaypanel-close{display:flex;justify-content:center;align-items:center;overflow:hidden;position:relative}.p-overlaypanel:after,.p-overlaypanel:before{bottom:100%;left:calc(var(--overlayArrowLeft, 0) + 1.25rem);content:\" \";height:0;width:0;position:absolute;pointer-events:none}.p-overlaypanel:after{border-width:8px;margin-left:-8px}.p-overlaypanel:before{border-width:10px;margin-left:-10px}.p-overlaypanel-shifted:after,.p-overlaypanel-shifted:before{left:auto;right:1.25em;margin-left:auto}.p-overlaypanel-flipped:after,.p-overlaypanel-flipped:before{bottom:auto;top:100%}.p-overlaypanel.p-overlaypanel-flipped:after{border-bottom-color:transparent}.p-overlaypanel.p-overlaypanel-flipped:before{border-bottom-color:transparent}}\n"] }]
        }], ctorParameters: () => [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }, { type: i1.PrimeNGConfig }, { type: i1.OverlayService }], propDecorators: { dismissable: [{
                type: Input
            }], showCloseIcon: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], appendTo: [{
                type: Input
            }], autoZIndex: [{
                type: Input
            }], ariaCloseLabel: [{
                type: Input
            }], baseZIndex: [{
                type: Input
            }], focusOnShow: [{
                type: Input
            }], showTransitionOptions: [{
                type: Input
            }], hideTransitionOptions: [{
                type: Input
            }], onShow: [{
                type: Output
            }], onHide: [{
                type: Output
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], onEscapeKeydown: [{
                type: HostListener,
                args: ['document:keydown.escape', ['$event']]
            }] } });
export class OverlayPanelModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: OverlayPanelModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.5", ngImport: i0, type: OverlayPanelModule, declarations: [OverlayPanel], imports: [CommonModule, RippleModule, SharedModule, TimesIcon], exports: [OverlayPanel, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: OverlayPanelModule, imports: [CommonModule, RippleModule, SharedModule, TimesIcon, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: OverlayPanelModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RippleModule, SharedModule, TimesIcon],
                    exports: [OverlayPanel, SharedModule],
                    declarations: [OverlayPanel]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheXBhbmVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL292ZXJsYXlwYW5lbC9vdmVybGF5cGFuZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBa0IsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakcsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RSxPQUFPLEVBRUgsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxlQUFlLEVBRWYsWUFBWSxFQUNaLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNMLFFBQVEsRUFHUixNQUFNLEVBQ04sV0FBVyxFQUlYLGlCQUFpQixFQUVwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWlDLGFBQWEsRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDekYsT0FBTyxFQUFFLDZCQUE2QixFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN4RSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTlDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7O0FBRTVDOzs7R0FHRztBQTZESCxNQUFNLE9BQU8sWUFBWTtJQW9HUztJQUNHO0lBQ3RCO0lBQ0E7SUFDQTtJQUNDO0lBQ0Q7SUFDQTtJQTFHWDs7O09BR0c7SUFDTSxXQUFXLEdBQVksSUFBSSxDQUFDO0lBQ3JDOzs7T0FHRztJQUNNLGFBQWEsQ0FBc0I7SUFDNUM7OztPQUdHO0lBQ00sS0FBSyxDQUE4QztJQUM1RDs7O09BR0c7SUFDTSxVQUFVLENBQXFCO0lBQ3hDOzs7T0FHRztJQUNNLFFB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O3NCQUFmLE1BQU07Z0JBS0csTUFBTTtzQkFBZixNQUFNO2dCQUV5QixTQUFTO3NCQUF4QyxlQUFlO3VCQUFDLGFBQWE7Z0JBeVE5QixlQUFlO3NCQURkLFlBQVk7dUJBQUMseUJBQXlCLEVBQUUsQ0FBQyxRQUFRLENBQUM7O0FBd0Z2RCxNQUFNLE9BQU8sa0JBQWtCO3VHQUFsQixrQkFBa0I7d0dBQWxCLGtCQUFrQixpQkFuYWxCLFlBQVksYUErWlgsWUFBWSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsU0FBUyxhQS9acEQsWUFBWSxFQWdhRyxZQUFZO3dHQUczQixrQkFBa0IsWUFKakIsWUFBWSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUNyQyxZQUFZOzsyRkFHM0Isa0JBQWtCO2tCQUw5QixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLFNBQVMsQ0FBQztvQkFDOUQsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQztvQkFDckMsWUFBWSxFQUFFLENBQUMsWUFBWSxDQUFDO2lCQUMvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFuaW1hdGUsIEFuaW1hdGlvbkV2ZW50LCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSwgRE9DVU1FTlQsIGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEhvc3RMaXN0ZW5lcixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgTmdNb2R1bGUsXG4gICAgTmdab25lLFxuICAgIE9uRGVzdHJveSxcbiAgICBPdXRwdXQsXG4gICAgUExBVEZPUk1fSUQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFJlbmRlcmVyMixcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICBWaWV3UmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT3ZlcmxheVNlcnZpY2UsIFByaW1lTkdDb25maWcsIFByaW1lVGVtcGxhdGUsIFNoYXJlZE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IENvbm5lY3RlZE92ZXJsYXlTY3JvbGxIYW5kbGVyLCBEb21IYW5kbGVyIH0gZnJvbSAncHJpbWVuZy9kb20nO1xuaW1wb3J0IHsgVGltZXNJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy90aW1lcyc7XG5pbXBvcnQgeyBSaXBwbGVNb2R1bGUgfSBmcm9tICdwcmltZW5nL3JpcHBsZSc7XG5pbXBvcnQgeyBOdWxsYWJsZSwgVm9pZExpc3RlbmVyIH0gZnJvbSAncHJpbWVuZy90cy1oZWxwZXJzJztcbmltcG9ydCB7IFpJbmRleFV0aWxzIH0gZnJvbSAncHJpbWVuZy91dGlscyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbi8qKlxuICogT3ZlcmxheVBhbmVsIGlzIGEgY29udGFpbmVyIGNvbXBvbmVudCBwb3NpdGlvbmVkIGFzIGNvbm5lY3RlZCB0byBpdHMgdGFyZ2V0LlxuICogQGdyb3VwIENvbXBvbmVudHNcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLW92ZXJsYXlQYW5lbCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdlxuICAgICAgICAgICAgKm5nSWY9XCJyZW5kZXJcIlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwiJ3Atb3ZlcmxheXBhbmVsIHAtY29tcG9uZW50J1wiXG4gICAgICAgICAgICBbbmdTdHlsZV09XCJzdHlsZVwiXG4gICAgICAgICAgICBbY2xhc3NdPVwic3R5bGVDbGFzc1wiXG4gICAgICAgICAgICAoY2xpY2spPVwib25PdmVybGF5Q2xpY2soJGV2ZW50KVwiXG4gICAgICAgICAgICBbQGFuaW1hdGlvbl09XCJ7IHZhbHVlOiBvdmVybGF5VmlzaWJsZSA/ICdvcGVuJyA6ICdjbG9zZScsIHBhcmFtczogeyBzaG93VHJhbnNpdGlvblBhcmFtczogc2hvd1RyYW5zaXRpb25PcHRpb25zLCBoaWRlVHJhbnNpdGlvblBhcmFtczogaGlkZVRyYW5zaXRpb25PcHRpb25zIH0gfVwiXG4gICAgICAgICAgICAoQGFuaW1hdGlvbi5zdGFydCk9XCJvbkFuaW1hdGlvblN0YXJ0KCRldmVudClcIlxuICAgICAgICAgICAgKEBhbmltYXRpb24uZG9uZSk9XCJvbkFuaW1hdGlvbkVuZCgkZXZlbnQpXCJcbiAgICAgICAgICAgIHJvbGU9XCJkaWFsb2dcIlxuICAgICAgICAgICAgW2F0dHIuYXJpYS1tb2RhbF09XCJvdmVybGF5VmlzaWJsZVwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLW92ZXJsYXlwYW5lbC1jb250ZW50XCIgKGNsaWNrKT1cIm9uQ29udGVudENsaWNrKClcIiAobW91c2Vkb3duKT1cIm9uQ29udGVudENsaWNrKClcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNvbnRlbnRUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwic2hvd0Nsb3NlSWNvblwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInAtb3ZlcmxheXBhbmVsLWNsb3NlIHAtbGlua1wiIChjbGljayk9XCJvbkNsb3NlQ2xpY2soJGV2ZW50KVwiIChrZXlkb3duLmVudGVyKT1cImhpZGUoKVwiIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYUNsb3NlTGFiZWxcIiBwUmlwcGxlPlxuICAgICAgICAgICAgICAgIDxUaW1lc0ljb24gKm5nSWY9XCIhY2xvc2VJY29uVGVtcGxhdGVcIiBbc3R5bGVDbGFzc109XCIncC1vdmVybGF5cGFuZWwtY2xvc2UtaWNvbidcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1vdmVybGF5cGFuZWwtY2xvc2UtaWNvblwiICpuZ0lmPVwiY2xvc2VJY29uVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwiY2xvc2VJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgICAgdHJpZ2dlcignYW5pbWF0aW9uJywgW1xuICAgICAgICAgICAgc3RhdGUoXG4gICAgICAgICAgICAgICAgJ3ZvaWQnLFxuICAgICAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAnc2NhbGVZKDAuOCknLFxuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBzdGF0ZShcbiAgICAgICAgICAgICAgICAnY2xvc2UnLFxuICAgICAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgc3RhdGUoXG4gICAgICAgICAgICAgICAgJ29wZW4nLFxuICAgICAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgwKScsXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gb3BlbicsIGFuaW1hdGUoJ3t7c2hvd1RyYW5zaXRpb25QYXJhbXN9fScpKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ29wZW4gPT4gY2xvc2UnLCBhbmltYXRlKCd7e2hpZGVUcmFuc2l0aW9uUGFyYW1zfX0nKSlcbiAgICAgICAgXSlcbiAgICBdLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vb3ZlcmxheXBhbmVsLmNzcyddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBPdmVybGF5UGFuZWwgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICAgIC8qKlxuICAgICAqIEVuYWJsZXMgdG8gaGlkZSB0aGUgb3ZlcmxheSB3aGVuIG91dHNpZGUgaXMgY2xpY2tlZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBkaXNtaXNzYWJsZTogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogV2hlbiBlbmFibGVkLCBkaXNwbGF5cyBhIGNsb3NlIGljb24gYXQgdG9wIHJpZ2h0IGNvcm5lci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzaG93Q2xvc2VJY29uOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIElubGluZSBzdHlsZSBvZiB0aGUgY29tcG9uZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlOiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqICBUYXJnZXQgZWxlbWVudCB0byBhdHRhY2ggdGhlIHBhbmVsLCB2YWxpZCB2YWx1ZXMgYXJlIFwiYm9keVwiIG9yIGEgbG9jYWwgbmctdGVtcGxhdGUgdmFyaWFibGUgb2YgYW5vdGhlciBlbGVtZW50IChub3RlOiB1c2UgYmluZGluZyB3aXRoIGJyYWNrZXRzIGZvciB0ZW1wbGF0ZSB2YXJpYWJsZXMsIGUuZy4gW2FwcGVuZFRvXT1cIm15ZGl2XCIgZm9yIGEgZGl2IGVsZW1lbnQgaGF2aW5nICNteWRpdiBhcyB2YXJpYWJsZSBuYW1lKS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBhcHBlbmRUbzogSFRNTEVsZW1lbnQgfCBFbGVtZW50UmVmIHwgVGVtcGxhdGVSZWY8YW55PiB8IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQgfCBhbnkgPSAnYm9keSc7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBhdXRvbWF0aWNhbGx5IG1hbmFnZSBsYXllcmluZy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBhdXRvWkluZGV4OiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBBcmlhIGxhYmVsIG9mIHRoZSBjbG9zZSBpY29uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGFyaWFDbG9zZUxhYmVsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogQmFzZSB6SW5kZXggdmFsdWUgdG8gdXNlIGluIGxheWVyaW5nLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGJhc2VaSW5kZXg6IG51bWJlciA9IDA7XG4gICAgLyoqXG4gICAgICogV2hlbiBlbmFibGVkLCBmaXJzdCBidXR0b24gcmVjZWl2ZXMgZm9jdXMgb24gc2hvdy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBmb2N1c09uU2hvdzogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogVHJhbnNpdGlvbiBvcHRpb25zIG9mIHRoZSBzaG93IGFuaW1hdGlvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzaG93VHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZyA9ICcuMTJzIGN1YmljLWJlemllcigwLCAwLCAwLjIsIDEpJztcbiAgICAvKipcbiAgICAgKiBUcmFuc2l0aW9uIG9wdGlvbnMgb2YgdGhlIGhpZGUgYW5pbWF0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGhpZGVUcmFuc2l0aW9uT3B0aW9uczogc3RyaW5nID0gJy4xcyBsaW5lYXInO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGFuIG92ZXJsYXkgYmVjb21lcyB2aXNpYmxlLlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvblNob3c6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGFuIG92ZXJsYXkgZ2V0cyBoaWRkZW4uXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uSGlkZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT4gfCB1bmRlZmluZWQ7XG5cbiAgICBjb250YWluZXI6IE51bGxhYmxlPEhUTUxEaXZFbGVtZW50PjtcblxuICAgIG92ZXJsYXlWaXNpYmxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICByZW5kZXI6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGlzT3ZlcmxheUFuaW1hdGlvbkluUHJvZ3Jlc3M6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHNlbGZDbGljazogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgZG9jdW1lbnRDbGlja0xpc3RlbmVyOiBWb2lkTGlzdGVuZXI7XG5cbiAgICB0YXJnZXQ6IGFueTtcblxuICAgIHdpbGxIaWRlOiBOdWxsYWJsZTxib29sZWFuPjtcblxuICAgIHNjcm9sbEhhbmRsZXI6IE51bGxhYmxlPENvbm5lY3RlZE92ZXJsYXlTY3JvbGxIYW5kbGVyPjtcblxuICAgIGRvY3VtZW50UmVzaXplTGlzdGVuZXI6IFZvaWRMaXN0ZW5lcjtcblxuICAgIGNvbnRlbnRUZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBjbG9zZUljb25UZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBkZXN0cm95Q2FsbGJhY2s6IE51bGxhYmxlPEZ1bmN0aW9uPjtcblxuICAgIG92ZXJsYXlFdmVudExpc3RlbmVyOiBOdWxsYWJsZTwoZXZlbnQ/OiBhbnkpID0+IHZvaWQ+O1xuXG4gICAgb3ZlcmxheVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgdW5kZWZpbmVkO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50LFxuICAgICAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IGFueSxcbiAgICAgICAgcHVibGljIGVsOiBFbGVtZW50UmVmLFxuICAgICAgICBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgcHVibGljIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmUsXG4gICAgICAgIHB1YmxpYyBjb25maWc6IFByaW1lTkdDb25maWcsXG4gICAgICAgIHB1YmxpYyBvdmVybGF5U2VydmljZTogT3ZlcmxheVNlcnZpY2VcbiAgICApIHt9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVzPy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnY29udGVudCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdjbG9zZWljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBiaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCkge1xuICAgICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lciAmJiB0aGlzLmRpc21pc3NhYmxlKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRvY3VtZW50RXZlbnQgPSBEb21IYW5kbGVyLmlzSU9TKCkgPyAndG91Y2hzdGFydCcgOiAnY2xpY2snO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRvY3VtZW50VGFyZ2V0OiBhbnkgPSB0aGlzLmVsID8gdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm93bmVyRG9jdW1lbnQgOiB0aGlzLmRvY3VtZW50O1xuXG4gICAgICAgICAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbihkb2N1bWVudFRhcmdldCwgZG9jdW1lbnRFdmVudCwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5jb250YWluZXI/LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkgJiYgdGhpcy50YXJnZXQgIT09IGV2ZW50LnRhcmdldCAmJiAhdGhpcy50YXJnZXQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5iaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLnNlbGZDbGljayA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlcyB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgcGFuZWwuXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBCcm93c2VyIGV2ZW50XG4gICAgICogQHBhcmFtIHtUYXJnZXR9IHRhcmdldCAtIFRhcmdldCBlbGVtZW50LlxuICAgICAqIEBncm91cCBNZXRob2RcbiAgICAgKi9cbiAgICB0b2dnbGUoZXZlbnQ6IGFueSwgdGFyZ2V0PzogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLmlzT3ZlcmxheUFuaW1hdGlvbkluUHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlWaXNpYmxlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXNUYXJnZXRDaGFuZ2VkKGV2ZW50LCB0YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXN0cm95Q2FsbGJhY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdyhudWxsLCB0YXJnZXQgfHwgZXZlbnQuY3VycmVudFRhcmdldCB8fCBldmVudC50YXJnZXQpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaG93KGV2ZW50LCB0YXJnZXQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc3BsYXlzIHRoZSBwYW5lbC5cbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIEJyb3dzZXIgZXZlbnRcbiAgICAgKiBAcGFyYW0ge1RhcmdldH0gdGFyZ2V0IC0gVGFyZ2V0IGVsZW1lbnQuXG4gICAgICogQGdyb3VwIE1ldGhvZFxuICAgICAqL1xuICAgIHNob3coZXZlbnQ6IGFueSwgdGFyZ2V0PzogYW55KSB7XG4gICAgICAgIHRhcmdldCAmJiBldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgaWYgKHRoaXMuaXNPdmVybGF5QW5pbWF0aW9uSW5Qcm9ncmVzcykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQgfHwgZXZlbnQuY3VycmVudFRhcmdldCB8fCBldmVudC50YXJnZXQ7XG4gICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlbmRlciA9IHRydWU7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgb25PdmVybGF5Q2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5U2VydmljZS5hZGQoe1xuICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICB0YXJnZXQ6IHRoaXMuZWwubmF0aXZlRWxlbWVudFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNlbGZDbGljayA9IHRydWU7XG4gICAgfVxuXG4gICAgb25Db250ZW50Q2xpY2soKSB7XG4gICAgICAgIHRoaXMuc2VsZkNsaWNrID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBoYXNUYXJnZXRDaGFuZ2VkKGV2ZW50OiBhbnksIHRhcmdldDogYW55KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRhcmdldCAhPSBudWxsICYmIHRoaXMudGFyZ2V0ICE9PSAodGFyZ2V0IHx8IGV2ZW50LmN1cnJlbnRUYXJnZXQgfHwgZXZlbnQudGFyZ2V0KTtcbiAgICB9XG5cbiAgICBhcHBlbmRDb250YWluZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmFwcGVuZFRvKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hcHBlbmRUbyA9PT0gJ2JvZHknKSB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZG9jdW1lbnQuYm9keSwgdGhpcy5jb250YWluZXIpO1xuICAgICAgICAgICAgZWxzZSBEb21IYW5kbGVyLmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyLCB0aGlzLmFwcGVuZFRvKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc3RvcmVBcHBlbmQoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRhaW5lciAmJiB0aGlzLmFwcGVuZFRvKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgdGhpcy5jb250YWluZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWxpZ24oKSB7XG4gICAgICAgIGlmICh0aGlzLmF1dG9aSW5kZXgpIHtcbiAgICAgICAgICAgIFpJbmRleFV0aWxzLnNldCgnb3ZlcmxheScsIHRoaXMuY29udGFpbmVyLCB0aGlzLmJhc2VaSW5kZXggKyB0aGlzLmNvbmZpZy56SW5kZXgub3ZlcmxheSk7XG4gICAgICAgIH1cblxuICAgICAgICBEb21IYW5kbGVyLmFic29sdXRlUG9zaXRpb24odGhpcy5jb250YWluZXIsIHRoaXMudGFyZ2V0KTtcblxuICAgICAgICBjb25zdCBjb250YWluZXJPZmZzZXQgPSBEb21IYW5kbGVyLmdldE9mZnNldCh0aGlzLmNvbnRhaW5lcik7XG4gICAgICAgIGNvbnN0IHRhcmdldE9mZnNldCA9IERvbUhhbmRsZXIuZ2V0T2Zmc2V0KHRoaXMudGFyZ2V0KTtcbiAgICAgICAgY29uc3QgYm9yZGVyUmFkaXVzID0gdGhpcy5kb2N1bWVudC5kZWZhdWx0Vmlldz8uZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmNvbnRhaW5lciEpLmdldFByb3BlcnR5VmFsdWUoJ2JvcmRlci1yYWRpdXMnKTtcbiAgICAgICAgbGV0IGFycm93TGVmdCA9IDA7XG5cbiAgICAgICAgaWYgKGNvbnRhaW5lck9mZnNldC5sZWZ0IDwgdGFyZ2V0T2Zmc2V0LmxlZnQpIHtcbiAgICAgICAgICAgIGFycm93TGVmdCA9IHRhcmdldE9mZnNldC5sZWZ0IC0gY29udGFpbmVyT2Zmc2V0LmxlZnQgLSBwYXJzZUZsb2F0KGJvcmRlclJhZGl1cyEpICogMjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbnRhaW5lcj8uc3R5bGUuc2V0UHJvcGVydHkoJy0tb3ZlcmxheUFycm93TGVmdCcsIGAke2Fycm93TGVmdH1weGApO1xuXG4gICAgICAgIGlmIChjb250YWluZXJPZmZzZXQudG9wIDwgdGFyZ2V0T2Zmc2V0LnRvcCkge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLmNvbnRhaW5lciwgJ3Atb3ZlcmxheXBhbmVsLWZsaXBwZWQnKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuc2hvd0Nsb3NlSWNvbikge1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5jb250YWluZXIsICdtYXJnaW4tdG9wJywgJy0zMHB4Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkFuaW1hdGlvblN0YXJ0KGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xuICAgICAgICBpZiAoZXZlbnQudG9TdGF0ZSA9PT0gJ29wZW4nKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGV2ZW50LmVsZW1lbnQ7XG4gICAgICAgICAgICB0aGlzLmFwcGVuZENvbnRhaW5lcigpO1xuICAgICAgICAgICAgdGhpcy5hbGlnbigpO1xuICAgICAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLmJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLmJpbmRTY3JvbGxMaXN0ZW5lcigpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5mb2N1c09uU2hvdykge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5vdmVybGF5RXZlbnRMaXN0ZW5lciA9IChlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29udGFpbmVyICYmIHRoaXMuY29udGFpbmVyLmNvbnRhaW5zKGUudGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGZDbGljayA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5vdmVybGF5U3Vic2NyaXB0aW9uID0gdGhpcy5vdmVybGF5U2VydmljZS5jbGlja09ic2VydmFibGUuc3Vic2NyaWJlKHRoaXMub3ZlcmxheUV2ZW50TGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy5vblNob3cuZW1pdChudWxsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaXNPdmVybGF5QW5pbWF0aW9uSW5Qcm9ncmVzcyA9IHRydWU7XG4gICAgfVxuXG4gICAgb25BbmltYXRpb25FbmQoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQudG9TdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAndm9pZCc6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGVzdHJveUNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVzdHJveUNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVzdHJveUNhbGxiYWNrID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vdmVybGF5U3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnY2xvc2UnOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmF1dG9aSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgWkluZGV4VXRpbHMuY2xlYXIodGhpcy5jb250YWluZXIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm92ZXJsYXlTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5vbkNvbnRhaW5lckRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uSGlkZS5lbWl0KHt9KTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pc092ZXJsYXlBbmltYXRpb25JblByb2dyZXNzID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZm9jdXMoKSB7XG4gICAgICAgIGxldCBmb2N1c2FibGUgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5jb250YWluZXIsICdbYXV0b2ZvY3VzXScpO1xuICAgICAgICBpZiAoZm9jdXNhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gZm9jdXNhYmxlLmZvY3VzKCksIDUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSGlkZXMgdGhlIHBhbmVsLlxuICAgICAqIEBncm91cCBNZXRob2RcbiAgICAgKi9cbiAgICBoaWRlKCkge1xuICAgICAgICB0aGlzLm92ZXJsYXlWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgb25DbG9zZUNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmtleWRvd24uZXNjYXBlJywgWyckZXZlbnQnXSlcbiAgICBvbkVzY2FwZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuXG4gICAgb25XaW5kb3dSZXNpemUoKSB7XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlWaXNpYmxlICYmICFEb21IYW5kbGVyLmlzVG91Y2hEZXZpY2UoKSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiaW5kRG9jdW1lbnRSZXNpemVMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgd2luZG93ID0gdGhpcy5kb2N1bWVudC5kZWZhdWx0VmlldyBhcyBXaW5kb3c7XG4gICAgICAgICAgICAgICAgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4od2luZG93LCAncmVzaXplJywgdGhpcy5vbldpbmRvd1Jlc2l6ZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmRTY3JvbGxMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5zY3JvbGxIYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyID0gbmV3IENvbm5lY3RlZE92ZXJsYXlTY3JvbGxIYW5kbGVyKHRoaXMudGFyZ2V0LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm92ZXJsYXlWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNjcm9sbEhhbmRsZXIuYmluZFNjcm9sbExpc3RlbmVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmJpbmRTY3JvbGxMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsSGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyLnVuYmluZFNjcm9sbExpc3RlbmVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkNvbnRhaW5lckRlc3Ryb3koKSB7XG4gICAgICAgIGlmICghKHRoaXMuY2QgYXMgVmlld1JlZikuZGVzdHJveWVkKSB7XG4gICAgICAgICAgICB0aGlzLnRhcmdldCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy51bmJpbmRTY3JvbGxMaXN0ZW5lcigpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5zY3JvbGxIYW5kbGVyKSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbEhhbmRsZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNvbnRhaW5lciAmJiB0aGlzLmF1dG9aSW5kZXgpIHtcbiAgICAgICAgICAgIFpJbmRleFV0aWxzLmNsZWFyKHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghKHRoaXMuY2QgYXMgVmlld1JlZikuZGVzdHJveWVkKSB7XG4gICAgICAgICAgICB0aGlzLnRhcmdldCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRlc3Ryb3lDYWxsYmFjayA9IG51bGw7XG4gICAgICAgIGlmICh0aGlzLmNvbnRhaW5lcikge1xuICAgICAgICAgICAgdGhpcy5yZXN0b3JlQXBwZW5kKCk7XG4gICAgICAgICAgICB0aGlzLm9uQ29udGFpbmVyRGVzdHJveSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheVN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUmlwcGxlTW9kdWxlLCBTaGFyZWRNb2R1bGUsIFRpbWVzSWNvbl0sXG4gICAgZXhwb3J0czogW092ZXJsYXlQYW5lbCwgU2hhcmVkTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtPdmVybGF5UGFuZWxdXG59KVxuZXhwb3J0IGNsYXNzIE92ZXJsYXlQYW5lbE1vZHVsZSB7fVxuIl19