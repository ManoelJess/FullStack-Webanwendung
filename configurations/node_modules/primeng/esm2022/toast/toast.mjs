import { animate, animateChild, query, state, style, transition, trigger } from '@angular/animations';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Inject, Input, NgModule, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { CheckIcon } from 'primeng/icons/check';
import { ExclamationTriangleIcon } from 'primeng/icons/exclamationtriangle';
import { InfoCircleIcon } from 'primeng/icons/infocircle';
import { TimesIcon } from 'primeng/icons/times';
import { TimesCircleIcon } from 'primeng/icons/timescircle';
import { RippleModule } from 'primeng/ripple';
import { ObjectUtils, UniqueComponentId, ZIndexUtils } from 'primeng/utils';
import * as i0 from "@angular/core";
import * as i1 from "primeng/api";
import * as i2 from "@angular/common";
import * as i3 from "primeng/ripple";
export class ToastItem {
    zone;
    config;
    message;
    index;
    life;
    template;
    showTransformOptions;
    hideTransformOptions;
    showTransitionOptions;
    hideTransitionOptions;
    onClose = new EventEmitter();
    containerViewChild;
    timeout;
    constructor(zone, config) {
        this.zone = zone;
        this.config = config;
    }
    ngAfterViewInit() {
        this.initTimeout();
    }
    initTimeout() {
        if (!this.message?.sticky) {
            this.zone.runOutsideAngular(() => {
                this.timeout = setTimeout(() => {
                    this.onClose.emit({
                        index: this.index,
                        message: this.message
                    });
                }, this.message?.life || this.life || 3000);
            });
        }
    }
    clearTimeout() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }
    onMouseEnter() {
        this.clearTimeout();
    }
    onMouseLeave() {
        this.initTimeout();
    }
    onCloseIconClick(event) {
        this.clearTimeout();
        this.onClose.emit({
            index: this.index,
            message: this.message
        });
        event.preventDefault();
    }
    get closeAriaLabel() {
        return this.config.translation.aria ? this.config.translation.aria.close : undefined;
    }
    ngOnDestroy() {
        this.clearTimeout();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: ToastItem, deps: [{ token: i0.NgZone }, { token: i1.PrimeNGConfig }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: ToastItem, selector: "p-toastItem", inputs: { message: "message", index: "index", life: "life", template: "template", showTransformOptions: "showTransformOptions", hideTransformOptions: "hideTransformOptions", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions" }, outputs: { onClose: "onClose" }, host: { classAttribute: "p-element" }, viewQueries: [{ propertyName: "containerViewChild", first: true, predicate: ["container"], descendants: true }], ngImport: i0, template: `
        <div
            #container
            [attr.id]="message?.id"
            [class]="message?.styleClass"
            [ngClass]="['p-toast-message-' + message?.severity, 'p-toast-message']"
            [@messageState]="{ value: 'visible', params: { showTransformParams: showTransformOptions, hideTransformParams: hideTransformOptions, showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions } }"
            (mouseenter)="onMouseEnter()"
            (mouseleave)="onMouseLeave()"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            [attr.data-pc-name]="'toast'"
            [attr.data-pc-section]="'root'"
        >
            <div class="p-toast-message-content" [ngClass]="message?.contentStyleClass" [attr.data-pc-section]="'content'">
                <ng-container *ngIf="!template">
                    <span *ngIf="message.icon" [class]="'p-toast-message-icon pi ' + message.icon"></span>
                    <span class="p-toast-message-icon" *ngIf="!message.icon" [attr.aria-hidden]="true" [attr.data-pc-section]="'icon'">
                        <ng-container>
                            <CheckIcon *ngIf="message.severity === 'success'" [attr.aria-hidden]="true" [attr.data-pc-section]="'icon'" />
                            <InfoCircleIcon *ngIf="message.severity === 'info'" [attr.aria-hidden]="true" [attr.data-pc-section]="'icon'" />
                            <TimesCircleIcon *ngIf="message.severity === 'error'" [attr.aria-hidden]="true" [attr.data-pc-section]="'icon'" />
                            <ExclamationTriangleIcon *ngIf="message.severity === 'warn'" [attr.aria-hidden]="true" [attr.data-pc-section]="'icon'" />
                        </ng-container>
                    </span>
                    <div class="p-toast-message-text" [attr.data-pc-section]="'text'">
                        <div class="p-toast-summary" [attr.data-pc-section]="'summary'">{{ message.summary }}</div>
                        <div class="p-toast-detail" [attr.data-pc-section]="'detail'">{{ message.detail }}</div>
                    </div>
                </ng-container>
                <ng-container *ngTemplateOutlet="template; context: { $implicit: message }"></ng-container>
                <button
                    type="button"
                    class="p-toast-icon-close p-link"
                    (click)="onCloseIconClick($event)"
                    (keydown.enter)="onCloseIconClick($event)"
                    *ngIf="message?.closable !== false"
                    pRipple
                    [attr.aria-label]="closeAriaLabel"
                    [attr.data-pc-section]="'closebutton'"
                >
                    <span *ngIf="message.closeIcon" [class]="'pt-1 text-base p-toast-message-icon pi ' + message.closeIcon"></span>
                    <TimesIcon *ngIf="!message.closeIcon" [styleClass]="'p-toast-icon-close-icon'" [attr.aria-hidden]="true" [attr.data-pc-section]="'closeicon'" />
                </button>
            </div>
        </div>
    `, isInline: true, dependencies: [{ kind: "directive", type: i0.forwardRef(() => i2.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i3.Ripple), selector: "[pRipple]" }, { kind: "component", type: i0.forwardRef(() => CheckIcon), selector: "CheckIcon" }, { kind: "component", type: i0.forwardRef(() => InfoCircleIcon), selector: "InfoCircleIcon" }, { kind: "component", type: i0.forwardRef(() => TimesCircleIcon), selector: "TimesCircleIcon" }, { kind: "component", type: i0.forwardRef(() => ExclamationTriangleIcon), selector: "ExclamationTriangleIcon" }, { kind: "component", type: i0.forwardRef(() => TimesIcon), selector: "TimesIcon" }], animations: [
            trigger('messageState', [
                state('visible', style({
                    transform: 'translateY(0)',
                    opacity: 1
                })),
                transition('void => *', [
                    style({
                        transform: '{{showTransformParams}}',
                        opacity: 0
                    }),
                    animate('{{showTransitionParams}}')
                ]),
                transition('* => void', [
                    animate('{{hideTransitionParams}}', style({
                        height: 0,
                        opacity: 0,
                        transform: '{{hideTransformParams}}'
                    }))
                ])
            ])
        ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: ToastItem, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-toastItem',
                    template: `
        <div
            #container
            [attr.id]="message?.id"
            [class]="message?.styleClass"
            [ngClass]="['p-toast-message-' + message?.severity, 'p-toast-message']"
            [@messageState]="{ value: 'visible', params: { showTransformParams: showTransformOptions, hideTransformParams: hideTransformOptions, showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions } }"
            (mouseenter)="onMouseEnter()"
            (mouseleave)="onMouseLeave()"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            [attr.data-pc-name]="'toast'"
            [attr.data-pc-section]="'root'"
        >
            <div class="p-toast-message-content" [ngClass]="message?.contentStyleClass" [attr.data-pc-section]="'content'">
                <ng-container *ngIf="!template">
                    <span *ngIf="message.icon" [class]="'p-toast-message-icon pi ' + message.icon"></span>
                    <span class="p-toast-message-icon" *ngIf="!message.icon" [attr.aria-hidden]="true" [attr.data-pc-section]="'icon'">
                        <ng-container>
                            <CheckIcon *ngIf="message.severity === 'success'" [attr.aria-hidden]="true" [attr.data-pc-section]="'icon'" />
                            <InfoCircleIcon *ngIf="message.severity === 'info'" [attr.aria-hidden]="true" [attr.data-pc-section]="'icon'" />
                            <TimesCircleIcon *ngIf="message.severity === 'error'" [attr.aria-hidden]="true" [attr.data-pc-section]="'icon'" />
                            <ExclamationTriangleIcon *ngIf="message.severity === 'warn'" [attr.aria-hidden]="true" [attr.data-pc-section]="'icon'" />
                        </ng-container>
                    </span>
                    <div class="p-toast-message-text" [attr.data-pc-section]="'text'">
                        <div class="p-toast-summary" [attr.data-pc-section]="'summary'">{{ message.summary }}</div>
                        <div class="p-toast-detail" [attr.data-pc-section]="'detail'">{{ message.detail }}</div>
                    </div>
                </ng-container>
                <ng-container *ngTemplateOutlet="template; context: { $implicit: message }"></ng-container>
                <button
                    type="button"
                    class="p-toast-icon-close p-link"
                    (click)="onCloseIconClick($event)"
                    (keydown.enter)="onCloseIconClick($event)"
                    *ngIf="message?.closable !== false"
                    pRipple
                    [attr.aria-label]="closeAriaLabel"
                    [attr.data-pc-section]="'closebutton'"
                >
                    <span *ngIf="message.closeIcon" [class]="'pt-1 text-base p-toast-message-icon pi ' + message.closeIcon"></span>
                    <TimesIcon *ngIf="!message.closeIcon" [styleClass]="'p-toast-icon-close-icon'" [attr.aria-hidden]="true" [attr.data-pc-section]="'closeicon'" />
                </button>
            </div>
        </div>
    `,
                    animations: [
                        trigger('messageState', [
                            state('visible', style({
                                transform: 'translateY(0)',
                                opacity: 1
                            })),
                            transition('void => *', [
                                style({
                                    transform: '{{showTransformParams}}',
                                    opacity: 0
                                }),
                                animate('{{showTransitionParams}}')
                            ]),
                            transition('* => void', [
                                animate('{{hideTransitionParams}}', style({
                                    height: 0,
                                    opacity: 0,
                                    transform: '{{hideTransformParams}}'
                                }))
                            ])
                        ])
                    ],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: i0.NgZone }, { type: i1.PrimeNGConfig }], propDecorators: { message: [{
                type: Input
            }], index: [{
                type: Input
            }], life: [{
                type: Input
            }], template: [{
                type: Input
            }], showTransformOptions: [{
                type: Input
            }], hideTransformOptions: [{
                type: Input
            }], showTransitionOptions: [{
                type: Input
            }], hideTransitionOptions: [{
                type: Input
            }], onClose: [{
                type: Output
            }], containerViewChild: [{
                type: ViewChild,
                args: ['container']
            }] } });
/**
 * Toast is used to display messages in an overlay.
 * @group Components
 */
export class Toast {
    document;
    renderer;
    messageService;
    cd;
    config;
    /**
     * Key of the message in case message is targeted to a specific toast component.
     * @group Props
     */
    key;
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
     * The default time to display messages for in milliseconds.
     * @group Props
     */
    life = 3000;
    /**
     * Inline style of the component.
     * @group Props
     */
    style;
    /**
     * Inline class of the component.
     * @group Props
     */
    styleClass;
    /**
     * Position of the toast in viewport.
     * @group Props
     */
    get position() {
        return this._position;
    }
    set position(value) {
        this._position = value;
        this.cd.markForCheck();
    }
    /**
     * It does not add the new message if there is already a toast displayed with the same content
     * @group Props
     */
    preventOpenDuplicates = false;
    /**
     * Displays only once a message with the same content.
     * @group Props
     */
    preventDuplicates = false;
    /**
     * Transform options of the show animation.
     * @group Props
     */
    showTransformOptions = 'translateY(100%)';
    /**
     * Transform options of the hide animation.
     * @group Props
     */
    hideTransformOptions = 'translateY(-100%)';
    /**
     * Transition options of the show animation.
     * @group Props
     */
    showTransitionOptions = '300ms ease-out';
    /**
     * Transition options of the hide animation.
     * @group Props
     */
    hideTransitionOptions = '250ms ease-in';
    /**
     * Object literal to define styles per screen size.
     * @group Props
     */
    breakpoints;
    /**
     * Callback to invoke when a message is closed.
     * @param {ToastCloseEvent} event - custom close event.
     * @group Emits
     */
    onClose = new EventEmitter();
    containerViewChild;
    templates;
    messageSubscription;
    clearSubscription;
    messages;
    messagesArchieve;
    template;
    _position = 'top-right';
    constructor(document, renderer, messageService, cd, config) {
        this.document = document;
        this.renderer = renderer;
        this.messageService = messageService;
        this.cd = cd;
        this.config = config;
    }
    styleElement;
    id = UniqueComponentId();
    ngOnInit() {
        this.messageSubscription = this.messageService.messageObserver.subscribe((messages) => {
            if (messages) {
                if (Array.isArray(messages)) {
                    const filteredMessages = messages.filter((m) => this.canAdd(m));
                    this.add(filteredMessages);
                }
                else if (this.canAdd(messages)) {
                    this.add([messages]);
                }
            }
        });
        this.clearSubscription = this.messageService.clearObserver.subscribe((key) => {
            if (key) {
                if (this.key === key) {
                    this.messages = null;
                }
            }
            else {
                this.messages = null;
            }
            this.cd.markForCheck();
        });
    }
    ngAfterViewInit() {
        if (this.breakpoints) {
            this.createStyle();
        }
    }
    add(messages) {
        this.messages = this.messages ? [...this.messages, ...messages] : [...messages];
        if (this.preventDuplicates) {
            this.messagesArchieve = this.messagesArchieve ? [...this.messagesArchieve, ...messages] : [...messages];
        }
        this.cd.markForCheck();
    }
    canAdd(message) {
        let allow = this.key === message.key;
        if (allow && this.preventOpenDuplicates) {
            allow = !this.containsMessage(this.messages, message);
        }
        if (allow && this.preventDuplicates) {
            allow = !this.containsMessage(this.messagesArchieve, message);
        }
        return allow;
    }
    containsMessage(collection, message) {
        if (!collection) {
            return false;
        }
        return (collection.find((m) => {
            return m.summary === message.summary && m.detail == message.detail && m.severity === message.severity;
        }) != null);
    }
    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'message':
                    this.template = item.template;
                    break;
                default:
                    this.template = item.template;
                    break;
            }
        });
    }
    onMessageClose(event) {
        this.messages?.splice(event.index, 1);
        this.onClose.emit({
            message: event.message
        });
        this.cd.detectChanges();
    }
    onAnimationStart(event) {
        if (event.fromState === 'void') {
            this.renderer.setAttribute(this.containerViewChild?.nativeElement, this.id, '');
            if (this.autoZIndex && this.containerViewChild?.nativeElement.style.zIndex === '') {
                ZIndexUtils.set('modal', this.containerViewChild?.nativeElement, this.baseZIndex || this.config.zIndex.modal);
            }
        }
    }
    onAnimationEnd(event) {
        if (event.toState === 'void') {
            if (this.autoZIndex && ObjectUtils.isEmpty(this.messages)) {
                ZIndexUtils.clear(this.containerViewChild?.nativeElement);
            }
        }
    }
    createStyle() {
        if (!this.styleElement) {
            this.styleElement = this.renderer.createElement('style');
            this.styleElement.type = 'text/css';
            this.renderer.appendChild(this.document.head, this.styleElement);
            let innerHTML = '';
            for (let breakpoint in this.breakpoints) {
                let breakpointStyle = '';
                for (let styleProp in this.breakpoints[breakpoint]) {
                    breakpointStyle += styleProp + ':' + this.breakpoints[breakpoint][styleProp] + ' !important;';
                }
                innerHTML += `
                    @media screen and (max-width: ${breakpoint}) {
                        .p-toast[${this.id}] {
                           ${breakpointStyle}
                        }
                    }
                `;
            }
            this.renderer.setProperty(this.styleElement, 'innerHTML', innerHTML);
        }
    }
    destroyStyle() {
        if (this.styleElement) {
            this.renderer.removeChild(this.document.head, this.styleElement);
            this.styleElement = null;
        }
    }
    ngOnDestroy() {
        if (this.messageSubscription) {
            this.messageSubscription.unsubscribe();
        }
        if (this.containerViewChild && this.autoZIndex) {
            ZIndexUtils.clear(this.containerViewChild.nativeElement);
        }
        if (this.clearSubscription) {
            this.clearSubscription.unsubscribe();
        }
        this.destroyStyle();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: Toast, deps: [{ token: DOCUMENT }, { token: i0.Renderer2 }, { token: i1.MessageService }, { token: i0.ChangeDetectorRef }, { token: i1.PrimeNGConfig }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: Toast, selector: "p-toast", inputs: { key: "key", autoZIndex: "autoZIndex", baseZIndex: "baseZIndex", life: "life", style: "style", styleClass: "styleClass", position: "position", preventOpenDuplicates: "preventOpenDuplicates", preventDuplicates: "preventDuplicates", showTransformOptions: "showTransformOptions", hideTransformOptions: "hideTransformOptions", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions", breakpoints: "breakpoints" }, outputs: { onClose: "onClose" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "containerViewChild", first: true, predicate: ["container"], descendants: true }], ngImport: i0, template: `
        <div #container class="p-toast p-component" [ngClass]="'p-toast-' + _position" [ngStyle]="style" [class]="styleClass">
            <p-toastItem
                *ngFor="let msg of messages; let i = index"
                [message]="msg"
                [index]="i"
                [life]="life"
                (onClose)="onMessageClose($event)"
                [template]="template"
                @toastAnimation
                (@toastAnimation.start)="onAnimationStart($event)"
                (@toastAnimation.done)="onAnimationEnd($event)"
                [showTransformOptions]="showTransformOptions"
                [hideTransformOptions]="hideTransformOptions"
                [showTransitionOptions]="showTransitionOptions"
                [hideTransitionOptions]="hideTransitionOptions"
            ></p-toastItem>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-toast{position:fixed;width:25rem}.p-toast-message{overflow:hidden}.p-toast-message-content{display:flex;align-items:flex-start}.p-toast-message-text{flex:1 1 auto}.p-toast-top-right{top:20px;right:20px}.p-toast-top-left{top:20px;left:20px}.p-toast-bottom-left{bottom:20px;left:20px}.p-toast-bottom-right{bottom:20px;right:20px}.p-toast-top-center{top:20px;left:50%;transform:translate(-50%)}.p-toast-bottom-center{bottom:20px;left:50%;transform:translate(-50%)}.p-toast-center{left:50%;top:50%;min-width:20vw;transform:translate(-50%,-50%)}.p-toast-icon-close{display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative;flex:none}.p-toast-icon-close.p-link{cursor:pointer}}\n"], dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: ToastItem, selector: "p-toastItem", inputs: ["message", "index", "life", "template", "showTransformOptions", "hideTransformOptions", "showTransitionOptions", "hideTransitionOptions"], outputs: ["onClose"] }], animations: [trigger('toastAnimation', [transition(':enter, :leave', [query('@*', animateChild())])])], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: Toast, decorators: [{
            type: Component,
            args: [{ selector: 'p-toast', template: `
        <div #container class="p-toast p-component" [ngClass]="'p-toast-' + _position" [ngStyle]="style" [class]="styleClass">
            <p-toastItem
                *ngFor="let msg of messages; let i = index"
                [message]="msg"
                [index]="i"
                [life]="life"
                (onClose)="onMessageClose($event)"
                [template]="template"
                @toastAnimation
                (@toastAnimation.start)="onAnimationStart($event)"
                (@toastAnimation.done)="onAnimationEnd($event)"
                [showTransformOptions]="showTransformOptions"
                [hideTransformOptions]="hideTransformOptions"
                [showTransitionOptions]="showTransitionOptions"
                [hideTransitionOptions]="hideTransitionOptions"
            ></p-toastItem>
        </div>
    `, animations: [trigger('toastAnimation', [transition(':enter, :leave', [query('@*', animateChild())])])], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-toast{position:fixed;width:25rem}.p-toast-message{overflow:hidden}.p-toast-message-content{display:flex;align-items:flex-start}.p-toast-message-text{flex:1 1 auto}.p-toast-top-right{top:20px;right:20px}.p-toast-top-left{top:20px;left:20px}.p-toast-bottom-left{bottom:20px;left:20px}.p-toast-bottom-right{bottom:20px;right:20px}.p-toast-top-center{top:20px;left:50%;transform:translate(-50%)}.p-toast-bottom-center{bottom:20px;left:50%;transform:translate(-50%)}.p-toast-center{left:50%;top:50%;min-width:20vw;transform:translate(-50%,-50%)}.p-toast-icon-close{display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative;flex:none}.p-toast-icon-close.p-link{cursor:pointer}}\n"] }]
        }], ctorParameters: () => [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.Renderer2 }, { type: i1.MessageService }, { type: i0.ChangeDetectorRef }, { type: i1.PrimeNGConfig }], propDecorators: { key: [{
                type: Input
            }], autoZIndex: [{
                type: Input
            }], baseZIndex: [{
                type: Input
            }], life: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], position: [{
                type: Input
            }], preventOpenDuplicates: [{
                type: Input
            }], preventDuplicates: [{
                type: Input
            }], showTransformOptions: [{
                type: Input
            }], hideTransformOptions: [{
                type: Input
            }], showTransitionOptions: [{
                type: Input
            }], hideTransitionOptions: [{
                type: Input
            }], breakpoints: [{
                type: Input
            }], onClose: [{
                type: Output
            }], containerViewChild: [{
                type: ViewChild,
                args: ['container']
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
export class ToastModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: ToastModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.5", ngImport: i0, type: ToastModule, declarations: [Toast, ToastItem], imports: [CommonModule, RippleModule, CheckIcon, InfoCircleIcon, TimesCircleIcon, ExclamationTriangleIcon, TimesIcon], exports: [Toast, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: ToastModule, imports: [CommonModule, RippleModule, CheckIcon, InfoCircleIcon, TimesCircleIcon, ExclamationTriangleIcon, TimesIcon, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: ToastModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RippleModule, CheckIcon, InfoCircleIcon, TimesCircleIcon, ExclamationTriangleIcon, TimesIcon],
                    exports: [Toast, SharedModule],
                    declarations: [Toast, ToastItem]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvdG9hc3QvdG9hc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFrQixPQUFPLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0SCxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFHSCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULGVBQWUsRUFFZixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxRQUFRLEVBSVIsTUFBTSxFQUlOLFNBQVMsRUFDVCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUEwQyxhQUFhLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ2xHLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7O0FBd0Y1RSxNQUFNLE9BQU8sU0FBUztJQXVCRTtJQUFzQjtJQXRCakMsT0FBTyxDQUE2QjtJQUVwQyxLQUFLLENBQTRCO0lBRWpDLElBQUksQ0FBUztJQUViLFFBQVEsQ0FBK0I7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O2dCQWFHLHFCQUFxQjtzQkFBN0IsS0FBSztnQkFLRyxpQkFBaUI7c0JBQXpCLEtBQUs7Z0JBS0csb0JBQW9CO3NCQUE1QixLQUFLO2dCQUtHLG9CQUFvQjtzQkFBNUIsS0FBSztnQkFLRyxxQkFBcUI7c0JBQTdCLEtBQUs7Z0JBS0cscUJBQXFCO3NCQUE3QixLQUFLO2dCQUtHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBTUksT0FBTztzQkFBaEIsTUFBTTtnQkFFaUIsa0JBQWtCO3NCQUF6QyxTQUFTO3VCQUFDLFdBQVc7Z0JBRVUsU0FBUztzQkFBeEMsZUFBZTt1QkFBQyxhQUFhOztBQXFMbEMsTUFBTSxPQUFPLFdBQVc7dUdBQVgsV0FBVzt3R0FBWCxXQUFXLGlCQTlRWCxLQUFLLEVBOUdMLFNBQVMsYUF3WFIsWUFBWSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSx1QkFBdUIsRUFBRSxTQUFTLGFBMVEzRyxLQUFLLEVBMlFHLFlBQVk7d0dBR3BCLFdBQVcsWUFKVixZQUFZLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFDbkcsWUFBWTs7MkZBR3BCLFdBQVc7a0JBTHZCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSx1QkFBdUIsRUFBRSxTQUFTLENBQUM7b0JBQ3JILE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxZQUFZLENBQUM7b0JBQzlCLFlBQVksRUFBRSxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUM7aUJBQ25DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW5pbWF0aW9uRXZlbnQsIGFuaW1hdGUsIGFuaW1hdGVDaGlsZCwgcXVlcnksIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlLCBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEluamVjdCxcbiAgICBJbnB1dCxcbiAgICBOZ01vZHVsZSxcbiAgICBOZ1pvbmUsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBPdXRwdXQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFJlbmRlcmVyMixcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNZXNzYWdlLCBNZXNzYWdlU2VydmljZSwgUHJpbWVOR0NvbmZpZywgUHJpbWVUZW1wbGF0ZSwgU2hhcmVkTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgQ2hlY2tJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9jaGVjayc7XG5pbXBvcnQgeyBFeGNsYW1hdGlvblRyaWFuZ2xlSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvZXhjbGFtYXRpb250cmlhbmdsZSc7XG5pbXBvcnQgeyBJbmZvQ2lyY2xlSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvaW5mb2NpcmNsZSc7XG5pbXBvcnQgeyBUaW1lc0ljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL3RpbWVzJztcbmltcG9ydCB7IFRpbWVzQ2lyY2xlSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvdGltZXNjaXJjbGUnO1xuaW1wb3J0IHsgUmlwcGxlTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9yaXBwbGUnO1xuaW1wb3J0IHsgT2JqZWN0VXRpbHMsIFVuaXF1ZUNvbXBvbmVudElkLCBaSW5kZXhVdGlscyB9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBUb2FzdENsb3NlRXZlbnQsIFRvYXN0SXRlbUNsb3NlRXZlbnQsIFRvYXN0UG9zaXRpb25UeXBlIH0gZnJvbSAnLi90b2FzdC5pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtdG9hc3RJdGVtJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgICAjY29udGFpbmVyXG4gICAgICAgICAgICBbYXR0ci5pZF09XCJtZXNzYWdlPy5pZFwiXG4gICAgICAgICAgICBbY2xhc3NdPVwibWVzc2FnZT8uc3R5bGVDbGFzc1wiXG4gICAgICAgICAgICBbbmdDbGFzc109XCJbJ3AtdG9hc3QtbWVzc2FnZS0nICsgbWVzc2FnZT8uc2V2ZXJpdHksICdwLXRvYXN0LW1lc3NhZ2UnXVwiXG4gICAgICAgICAgICBbQG1lc3NhZ2VTdGF0ZV09XCJ7IHZhbHVlOiAndmlzaWJsZScsIHBhcmFtczogeyBzaG93VHJhbnNmb3JtUGFyYW1zOiBzaG93VHJhbnNmb3JtT3B0aW9ucywgaGlkZVRyYW5zZm9ybVBhcmFtczogaGlkZVRyYW5zZm9ybU9wdGlvbnMsIHNob3dUcmFuc2l0aW9uUGFyYW1zOiBzaG93VHJhbnNpdGlvbk9wdGlvbnMsIGhpZGVUcmFuc2l0aW9uUGFyYW1zOiBoaWRlVHJhbnNpdGlvbk9wdGlvbnMgfSB9XCJcbiAgICAgICAgICAgIChtb3VzZWVudGVyKT1cIm9uTW91c2VFbnRlcigpXCJcbiAgICAgICAgICAgIChtb3VzZWxlYXZlKT1cIm9uTW91c2VMZWF2ZSgpXCJcbiAgICAgICAgICAgIHJvbGU9XCJhbGVydFwiXG4gICAgICAgICAgICBhcmlhLWxpdmU9XCJhc3NlcnRpdmVcIlxuICAgICAgICAgICAgYXJpYS1hdG9taWM9XCJ0cnVlXCJcbiAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtbmFtZV09XCIndG9hc3QnXCJcbiAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCIncm9vdCdcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC10b2FzdC1tZXNzYWdlLWNvbnRlbnRcIiBbbmdDbGFzc109XCJtZXNzYWdlPy5jb250ZW50U3R5bGVDbGFzc1wiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInY29udGVudCdcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwibWVzc2FnZS5pY29uXCIgW2NsYXNzXT1cIidwLXRvYXN0LW1lc3NhZ2UtaWNvbiBwaSAnICsgbWVzc2FnZS5pY29uXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtdG9hc3QtbWVzc2FnZS1pY29uXCIgKm5nSWY9XCIhbWVzc2FnZS5pY29uXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInaWNvbidcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPENoZWNrSWNvbiAqbmdJZj1cIm1lc3NhZ2Uuc2V2ZXJpdHkgPT09ICdzdWNjZXNzJ1wiIFthdHRyLmFyaWEtaGlkZGVuXT1cInRydWVcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2ljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SW5mb0NpcmNsZUljb24gKm5nSWY9XCJtZXNzYWdlLnNldmVyaXR5ID09PSAnaW5mbydcIiBbYXR0ci5hcmlhLWhpZGRlbl09XCJ0cnVlXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidpY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRpbWVzQ2lyY2xlSWNvbiAqbmdJZj1cIm1lc3NhZ2Uuc2V2ZXJpdHkgPT09ICdlcnJvcidcIiBbYXR0ci5hcmlhLWhpZGRlbl09XCJ0cnVlXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidpY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEV4Y2xhbWF0aW9uVHJpYW5nbGVJY29uICpuZ0lmPVwibWVzc2FnZS5zZXZlcml0eSA9PT0gJ3dhcm4nXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInaWNvbidcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtdG9hc3QtbWVzc2FnZS10ZXh0XCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIid0ZXh0J1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtdG9hc3Qtc3VtbWFyeVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInc3VtbWFyeSdcIj57eyBtZXNzYWdlLnN1bW1hcnkgfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXRvYXN0LWRldGFpbFwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInZGV0YWlsJ1wiPnt7IG1lc3NhZ2UuZGV0YWlsIH19PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0ZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IG1lc3NhZ2UgfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC10b2FzdC1pY29uLWNsb3NlIHAtbGlua1wiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkNsb3NlSWNvbkNsaWNrKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAoa2V5ZG93bi5lbnRlcik9XCJvbkNsb3NlSWNvbkNsaWNrKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAqbmdJZj1cIm1lc3NhZ2U/LmNsb3NhYmxlICE9PSBmYWxzZVwiXG4gICAgICAgICAgICAgICAgICAgIHBSaXBwbGVcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJjbG9zZUFyaWFMYWJlbFwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInY2xvc2VidXR0b24nXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwibWVzc2FnZS5jbG9zZUljb25cIiBbY2xhc3NdPVwiJ3B0LTEgdGV4dC1iYXNlIHAtdG9hc3QtbWVzc2FnZS1pY29uIHBpICcgKyBtZXNzYWdlLmNsb3NlSWNvblwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPFRpbWVzSWNvbiAqbmdJZj1cIiFtZXNzYWdlLmNsb3NlSWNvblwiIFtzdHlsZUNsYXNzXT1cIidwLXRvYXN0LWljb24tY2xvc2UtaWNvbidcIiBbYXR0ci5hcmlhLWhpZGRlbl09XCJ0cnVlXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidjbG9zZWljb24nXCIgLz5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgICAgdHJpZ2dlcignbWVzc2FnZVN0YXRlJywgW1xuICAgICAgICAgICAgc3RhdGUoXG4gICAgICAgICAgICAgICAgJ3Zpc2libGUnLFxuICAgICAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgwKScsXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gKicsIFtcbiAgICAgICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3t7c2hvd1RyYW5zZm9ybVBhcmFtc319JyxcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIGFuaW1hdGUoJ3t7c2hvd1RyYW5zaXRpb25QYXJhbXN9fScpXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJyogPT4gdm9pZCcsIFtcbiAgICAgICAgICAgICAgICBhbmltYXRlKFxuICAgICAgICAgICAgICAgICAgICAne3toaWRlVHJhbnNpdGlvblBhcmFtc319JyxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3t7aGlkZVRyYW5zZm9ybVBhcmFtc319J1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0pXG4gICAgICAgIF0pXG4gICAgXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBUb2FzdEl0ZW0gaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgpIG1lc3NhZ2U6IE1lc3NhZ2UgfCBudWxsIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCkgaW5kZXg6IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBsaWZlOiBudW1iZXI7XG5cbiAgICBASW5wdXQoKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIHNob3dUcmFuc2Zvcm1PcHRpb25zOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBoaWRlVHJhbnNmb3JtT3B0aW9uczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCkgc2hvd1RyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBoaWRlVHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIEBPdXRwdXQoKSBvbkNsb3NlOiBFdmVudEVtaXR0ZXI8VG9hc3RJdGVtQ2xvc2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAVmlld0NoaWxkKCdjb250YWluZXInKSBjb250YWluZXJWaWV3Q2hpbGQ6IEVsZW1lbnRSZWYgfCB1bmRlZmluZWQ7XG5cbiAgICB0aW1lb3V0OiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHpvbmU6IE5nWm9uZSwgcHJpdmF0ZSBjb25maWc6IFByaW1lTkdDb25maWcpIHt9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMuaW5pdFRpbWVvdXQoKTtcbiAgICB9XG5cbiAgICBpbml0VGltZW91dCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLm1lc3NhZ2U/LnN0aWNreSkge1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkNsb3NlLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IDxudW1iZXI+dGhpcy5pbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IDxNZXNzYWdlPnRoaXMubWVzc2FnZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LCB0aGlzLm1lc3NhZ2U/LmxpZmUgfHwgdGhpcy5saWZlIHx8IDMwMDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhclRpbWVvdXQoKSB7XG4gICAgICAgIGlmICh0aGlzLnRpbWVvdXQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICAgICAgICAgICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uTW91c2VFbnRlcigpIHtcbiAgICAgICAgdGhpcy5jbGVhclRpbWVvdXQoKTtcbiAgICB9XG5cbiAgICBvbk1vdXNlTGVhdmUoKSB7XG4gICAgICAgIHRoaXMuaW5pdFRpbWVvdXQoKTtcbiAgICB9XG5cbiAgICBvbkNsb3NlSWNvbkNsaWNrKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLmNsZWFyVGltZW91dCgpO1xuXG4gICAgICAgIHRoaXMub25DbG9zZS5lbWl0KHtcbiAgICAgICAgICAgIGluZGV4OiA8bnVtYmVyPnRoaXMuaW5kZXgsXG4gICAgICAgICAgICBtZXNzYWdlOiA8TWVzc2FnZT50aGlzLm1lc3NhZ2VcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBnZXQgY2xvc2VBcmlhTGFiZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhID8gdGhpcy5jb25maWcudHJhbnNsYXRpb24uYXJpYS5jbG9zZSA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5jbGVhclRpbWVvdXQoKTtcbiAgICB9XG59XG5cbi8qKlxuICogVG9hc3QgaXMgdXNlZCB0byBkaXNwbGF5IG1lc3NhZ2VzIGluIGFuIG92ZXJsYXkuXG4gKiBAZ3JvdXAgQ29tcG9uZW50c1xuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtdG9hc3QnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgI2NvbnRhaW5lciBjbGFzcz1cInAtdG9hc3QgcC1jb21wb25lbnRcIiBbbmdDbGFzc109XCIncC10b2FzdC0nICsgX3Bvc2l0aW9uXCIgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiPlxuICAgICAgICAgICAgPHAtdG9hc3RJdGVtXG4gICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IG1zZyBvZiBtZXNzYWdlczsgbGV0IGkgPSBpbmRleFwiXG4gICAgICAgICAgICAgICAgW21lc3NhZ2VdPVwibXNnXCJcbiAgICAgICAgICAgICAgICBbaW5kZXhdPVwiaVwiXG4gICAgICAgICAgICAgICAgW2xpZmVdPVwibGlmZVwiXG4gICAgICAgICAgICAgICAgKG9uQ2xvc2UpPVwib25NZXNzYWdlQ2xvc2UoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgW3RlbXBsYXRlXT1cInRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICBAdG9hc3RBbmltYXRpb25cbiAgICAgICAgICAgICAgICAoQHRvYXN0QW5pbWF0aW9uLnN0YXJ0KT1cIm9uQW5pbWF0aW9uU3RhcnQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKEB0b2FzdEFuaW1hdGlvbi5kb25lKT1cIm9uQW5pbWF0aW9uRW5kKCRldmVudClcIlxuICAgICAgICAgICAgICAgIFtzaG93VHJhbnNmb3JtT3B0aW9uc109XCJzaG93VHJhbnNmb3JtT3B0aW9uc1wiXG4gICAgICAgICAgICAgICAgW2hpZGVUcmFuc2Zvcm1PcHRpb25zXT1cImhpZGVUcmFuc2Zvcm1PcHRpb25zXCJcbiAgICAgICAgICAgICAgICBbc2hvd1RyYW5zaXRpb25PcHRpb25zXT1cInNob3dUcmFuc2l0aW9uT3B0aW9uc1wiXG4gICAgICAgICAgICAgICAgW2hpZGVUcmFuc2l0aW9uT3B0aW9uc109XCJoaWRlVHJhbnNpdGlvbk9wdGlvbnNcIlxuICAgICAgICAgICAgPjwvcC10b2FzdEl0ZW0+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgYW5pbWF0aW9uczogW3RyaWdnZXIoJ3RvYXN0QW5pbWF0aW9uJywgW3RyYW5zaXRpb24oJzplbnRlciwgOmxlYXZlJywgW3F1ZXJ5KCdAKicsIGFuaW1hdGVDaGlsZCgpKV0pXSldLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vdG9hc3QuY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFRvYXN0IGltcGxlbWVudHMgT25Jbml0LCBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICAgIC8qKlxuICAgICAqIEtleSBvZiB0aGUgbWVzc2FnZSBpbiBjYXNlIG1lc3NhZ2UgaXMgdGFyZ2V0ZWQgdG8gYSBzcGVjaWZpYyB0b2FzdCBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkga2V5OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBhdXRvbWF0aWNhbGx5IG1hbmFnZSBsYXllcmluZy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBhdXRvWkluZGV4OiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBCYXNlIHpJbmRleCB2YWx1ZSB0byB1c2UgaW4gbGF5ZXJpbmcuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgYmFzZVpJbmRleDogbnVtYmVyID0gMDtcbiAgICAvKipcbiAgICAgKiBUaGUgZGVmYXVsdCB0aW1lIHRvIGRpc3BsYXkgbWVzc2FnZXMgZm9yIGluIG1pbGxpc2Vjb25kcy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBsaWZlOiBudW1iZXIgPSAzMDAwO1xuICAgIC8qKlxuICAgICAqIElubGluZSBzdHlsZSBvZiB0aGUgY29tcG9uZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlOiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIElubGluZSBjbGFzcyBvZiB0aGUgY29tcG9uZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIC8qKlxuICAgICAqIFBvc2l0aW9uIG9mIHRoZSB0b2FzdCBpbiB2aWV3cG9ydC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgcG9zaXRpb24oKTogVG9hc3RQb3NpdGlvblR5cGUge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9zaXRpb247XG4gICAgfVxuXG4gICAgc2V0IHBvc2l0aW9uKHZhbHVlOiBUb2FzdFBvc2l0aW9uVHlwZSkge1xuICAgICAgICB0aGlzLl9wb3NpdGlvbiA9IHZhbHVlO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEl0IGRvZXMgbm90IGFkZCB0aGUgbmV3IG1lc3NhZ2UgaWYgdGhlcmUgaXMgYWxyZWFkeSBhIHRvYXN0IGRpc3BsYXllZCB3aXRoIHRoZSBzYW1lIGNvbnRlbnRcbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwcmV2ZW50T3BlbkR1cGxpY2F0ZXM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBEaXNwbGF5cyBvbmx5IG9uY2UgYSBtZXNzYWdlIHdpdGggdGhlIHNhbWUgY29udGVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwcmV2ZW50RHVwbGljYXRlczogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIFRyYW5zZm9ybSBvcHRpb25zIG9mIHRoZSBzaG93IGFuaW1hdGlvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzaG93VHJhbnNmb3JtT3B0aW9uczogc3RyaW5nID0gJ3RyYW5zbGF0ZVkoMTAwJSknO1xuICAgIC8qKlxuICAgICAqIFRyYW5zZm9ybSBvcHRpb25zIG9mIHRoZSBoaWRlIGFuaW1hdGlvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBoaWRlVHJhbnNmb3JtT3B0aW9uczogc3RyaW5nID0gJ3RyYW5zbGF0ZVkoLTEwMCUpJztcbiAgICAvKipcbiAgICAgKiBUcmFuc2l0aW9uIG9wdGlvbnMgb2YgdGhlIHNob3cgYW5pbWF0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNob3dUcmFuc2l0aW9uT3B0aW9uczogc3RyaW5nID0gJzMwMG1zIGVhc2Utb3V0JztcbiAgICAvKipcbiAgICAgKiBUcmFuc2l0aW9uIG9wdGlvbnMgb2YgdGhlIGhpZGUgYW5pbWF0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGhpZGVUcmFuc2l0aW9uT3B0aW9uczogc3RyaW5nID0gJzI1MG1zIGVhc2UtaW4nO1xuICAgIC8qKlxuICAgICAqIE9iamVjdCBsaXRlcmFsIHRvIGRlZmluZSBzdHlsZXMgcGVyIHNjcmVlbiBzaXplLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGJyZWFrcG9pbnRzOiB7IFtrZXk6IHN0cmluZ106IGFueSB9IHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGEgbWVzc2FnZSBpcyBjbG9zZWQuXG4gICAgICogQHBhcmFtIHtUb2FzdENsb3NlRXZlbnR9IGV2ZW50IC0gY3VzdG9tIGNsb3NlIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkNsb3NlOiBFdmVudEVtaXR0ZXI8VG9hc3RDbG9zZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8VG9hc3RDbG9zZUV2ZW50PigpO1xuXG4gICAgQFZpZXdDaGlsZCgnY29udGFpbmVyJykgY29udGFpbmVyVmlld0NoaWxkOiBFbGVtZW50UmVmIHwgdW5kZWZpbmVkO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxQcmltZVRlbXBsYXRlPiB8IHVuZGVmaW5lZDtcblxuICAgIG1lc3NhZ2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IHVuZGVmaW5lZDtcblxuICAgIGNsZWFyU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gfCB1bmRlZmluZWQ7XG5cbiAgICBtZXNzYWdlczogTWVzc2FnZVtdIHwgbnVsbCB8IHVuZGVmaW5lZDtcblxuICAgIG1lc3NhZ2VzQXJjaGlldmU6IE1lc3NhZ2VbXSB8IHVuZGVmaW5lZDtcblxuICAgIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgX3Bvc2l0aW9uOiBUb2FzdFBvc2l0aW9uVHlwZSA9ICd0b3AtcmlnaHQnO1xuXG4gICAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHVibGljIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSwgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIHB1YmxpYyBjb25maWc6IFByaW1lTkdDb25maWcpIHt9XG5cbiAgICBzdHlsZUVsZW1lbnQ6IGFueTtcblxuICAgIGlkOiBzdHJpbmcgPSBVbmlxdWVDb21wb25lbnRJZCgpO1xuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZVN1YnNjcmlwdGlvbiA9IHRoaXMubWVzc2FnZVNlcnZpY2UubWVzc2FnZU9ic2VydmVyLnN1YnNjcmliZSgobWVzc2FnZXMpID0+IHtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlcykge1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG1lc3NhZ2VzKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJlZE1lc3NhZ2VzID0gbWVzc2FnZXMuZmlsdGVyKChtKSA9PiB0aGlzLmNhbkFkZChtKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkKGZpbHRlcmVkTWVzc2FnZXMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5jYW5BZGQobWVzc2FnZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkKFttZXNzYWdlc10pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jbGVhclN1YnNjcmlwdGlvbiA9IHRoaXMubWVzc2FnZVNlcnZpY2UuY2xlYXJPYnNlcnZlci5zdWJzY3JpYmUoKGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmtleSA9PT0ga2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZXMgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlcyA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuYnJlYWtwb2ludHMpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlU3R5bGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZChtZXNzYWdlczogTWVzc2FnZVtdKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWVzc2FnZXMgPSB0aGlzLm1lc3NhZ2VzID8gWy4uLnRoaXMubWVzc2FnZXMsIC4uLm1lc3NhZ2VzXSA6IFsuLi5tZXNzYWdlc107XG5cbiAgICAgICAgaWYgKHRoaXMucHJldmVudER1cGxpY2F0ZXMpIHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZXNBcmNoaWV2ZSA9IHRoaXMubWVzc2FnZXNBcmNoaWV2ZSA/IFsuLi50aGlzLm1lc3NhZ2VzQXJjaGlldmUsIC4uLm1lc3NhZ2VzXSA6IFsuLi5tZXNzYWdlc107XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIGNhbkFkZChtZXNzYWdlOiBNZXNzYWdlKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBhbGxvdyA9IHRoaXMua2V5ID09PSBtZXNzYWdlLmtleTtcblxuICAgICAgICBpZiAoYWxsb3cgJiYgdGhpcy5wcmV2ZW50T3BlbkR1cGxpY2F0ZXMpIHtcbiAgICAgICAgICAgIGFsbG93ID0gIXRoaXMuY29udGFpbnNNZXNzYWdlKHRoaXMubWVzc2FnZXMhLCBtZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhbGxvdyAmJiB0aGlzLnByZXZlbnREdXBsaWNhdGVzKSB7XG4gICAgICAgICAgICBhbGxvdyA9ICF0aGlzLmNvbnRhaW5zTWVzc2FnZSh0aGlzLm1lc3NhZ2VzQXJjaGlldmUhLCBtZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhbGxvdztcbiAgICB9XG5cbiAgICBjb250YWluc01lc3NhZ2UoY29sbGVjdGlvbjogTWVzc2FnZVtdLCBtZXNzYWdlOiBNZXNzYWdlKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICghY29sbGVjdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIGNvbGxlY3Rpb24uZmluZCgobSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBtLnN1bW1hcnkgPT09IG1lc3NhZ2Uuc3VtbWFyeSAmJiBtLmRldGFpbCA9PSBtZXNzYWdlLmRldGFpbCAmJiBtLnNldmVyaXR5ID09PSBtZXNzYWdlLnNldmVyaXR5O1xuICAgICAgICAgICAgfSkgIT0gbnVsbFxuICAgICAgICApO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXM/LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdtZXNzYWdlJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbk1lc3NhZ2VDbG9zZShldmVudDogVG9hc3RJdGVtQ2xvc2VFdmVudCkge1xuICAgICAgICB0aGlzLm1lc3NhZ2VzPy5zcGxpY2UoZXZlbnQuaW5kZXgsIDEpO1xuXG4gICAgICAgIHRoaXMub25DbG9zZS5lbWl0KHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IGV2ZW50Lm1lc3NhZ2VcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgb25BbmltYXRpb25TdGFydChldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmZyb21TdGF0ZSA9PT0gJ3ZvaWQnKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmNvbnRhaW5lclZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudCwgdGhpcy5pZCwgJycpO1xuICAgICAgICAgICAgaWYgKHRoaXMuYXV0b1pJbmRleCAmJiB0aGlzLmNvbnRhaW5lclZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudC5zdHlsZS56SW5kZXggPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgWkluZGV4VXRpbHMuc2V0KCdtb2RhbCcsIHRoaXMuY29udGFpbmVyVmlld0NoaWxkPy5uYXRpdmVFbGVtZW50LCB0aGlzLmJhc2VaSW5kZXggfHwgdGhpcy5jb25maWcuekluZGV4Lm1vZGFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQW5pbWF0aW9uRW5kKGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xuICAgICAgICBpZiAoZXZlbnQudG9TdGF0ZSA9PT0gJ3ZvaWQnKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hdXRvWkluZGV4ICYmIE9iamVjdFV0aWxzLmlzRW1wdHkodGhpcy5tZXNzYWdlcykpIHtcbiAgICAgICAgICAgICAgICBaSW5kZXhVdGlscy5jbGVhcih0aGlzLmNvbnRhaW5lclZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjcmVhdGVTdHlsZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0eWxlRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5zdHlsZUVsZW1lbnQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAgICAgICB0aGlzLnN0eWxlRWxlbWVudC50eXBlID0gJ3RleHQvY3NzJztcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5kb2N1bWVudC5oZWFkLCB0aGlzLnN0eWxlRWxlbWVudCk7XG4gICAgICAgICAgICBsZXQgaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICBmb3IgKGxldCBicmVha3BvaW50IGluIHRoaXMuYnJlYWtwb2ludHMpIHtcbiAgICAgICAgICAgICAgICBsZXQgYnJlYWtwb2ludFN0eWxlID0gJyc7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgc3R5bGVQcm9wIGluIHRoaXMuYnJlYWtwb2ludHNbYnJlYWtwb2ludF0pIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludFN0eWxlICs9IHN0eWxlUHJvcCArICc6JyArIHRoaXMuYnJlYWtwb2ludHNbYnJlYWtwb2ludF1bc3R5bGVQcm9wXSArICcgIWltcG9ydGFudDsnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpbm5lckhUTUwgKz0gYFxuICAgICAgICAgICAgICAgICAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAke2JyZWFrcG9pbnR9KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAucC10b2FzdFske3RoaXMuaWR9XSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAke2JyZWFrcG9pbnRTdHlsZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5zdHlsZUVsZW1lbnQsICdpbm5lckhUTUwnLCBpbm5lckhUTUwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVzdHJveVN0eWxlKCkge1xuICAgICAgICBpZiAodGhpcy5zdHlsZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQodGhpcy5kb2N1bWVudC5oZWFkLCB0aGlzLnN0eWxlRWxlbWVudCk7XG4gICAgICAgICAgICB0aGlzLnN0eWxlRWxlbWVudCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMubWVzc2FnZVN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jb250YWluZXJWaWV3Q2hpbGQgJiYgdGhpcy5hdXRvWkluZGV4KSB7XG4gICAgICAgICAgICBaSW5kZXhVdGlscy5jbGVhcih0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNsZWFyU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRlc3Ryb3lTdHlsZSgpO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBSaXBwbGVNb2R1bGUsIENoZWNrSWNvbiwgSW5mb0NpcmNsZUljb24sIFRpbWVzQ2lyY2xlSWNvbiwgRXhjbGFtYXRpb25UcmlhbmdsZUljb24sIFRpbWVzSWNvbl0sXG4gICAgZXhwb3J0czogW1RvYXN0LCBTaGFyZWRNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW1RvYXN0LCBUb2FzdEl0ZW1dXG59KVxuZXhwb3J0IGNsYXNzIFRvYXN0TW9kdWxlIHt9XG4iXX0=