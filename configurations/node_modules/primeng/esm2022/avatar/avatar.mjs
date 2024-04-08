import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgModule, Output, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * Avatar represents people using icons, labels and images.
 * @group Components
 */
export class Avatar {
    /**
     * Defines the text to display.
     * @group Props
     */
    label;
    /**
     * Defines the icon to display.
     * @group Props
     */
    icon;
    /**
     * Defines the image to display.
     * @group Props
     */
    image;
    /**
     * Size of the element.
     * @group Props
     */
    size = 'normal';
    /**
     * Shape of the element.
     * @group Props
     */
    shape = 'square';
    /**
     * Inline style of the element.
     * @group Props
     */
    style;
    /**
     * Class of the element.
     * @group Props
     */
    styleClass;
    /**
     * Establishes a string value that labels the component.
     * @group Props
     */
    ariaLabel;
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    ariaLabelledBy;
    /**
     * This event is triggered if an error occurs while loading an image file.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onImageError = new EventEmitter();
    containerClass() {
        return {
            'p-avatar p-component': true,
            'p-avatar-image': this.image != null,
            'p-avatar-circle': this.shape === 'circle',
            'p-avatar-lg': this.size === 'large',
            'p-avatar-xl': this.size === 'xlarge'
        };
    }
    imageError(event) {
        this.onImageError.emit(event);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: Avatar, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: Avatar, selector: "p-avatar", inputs: { label: "label", icon: "icon", image: "image", size: "size", shape: "shape", style: "style", styleClass: "styleClass", ariaLabel: "ariaLabel", ariaLabelledBy: "ariaLabelledBy" }, outputs: { onImageError: "onImageError" }, host: { classAttribute: "p-element" }, ngImport: i0, template: `
        <div [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style" [attr.aria-labelledby]="ariaLabelledBy" [attr.aria-label]="ariaLabel" [attr.data-pc-name]="'avatar'">
            <ng-content></ng-content>
            <span class="p-avatar-text" *ngIf="label; else iconTemplate">{{ label }}</span>
            <ng-template #iconTemplate><span [class]="icon" [ngClass]="'p-avatar-icon'" *ngIf="icon; else imageTemplate"></span></ng-template>
            <ng-template #imageTemplate><img [src]="image" *ngIf="image" (error)="imageError($event)" /></ng-template>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-avatar{display:inline-flex;align-items:center;justify-content:center;width:2rem;height:2rem;font-size:1rem}.p-avatar.p-avatar-image{background-color:transparent}.p-avatar.p-avatar-circle{border-radius:50%;overflow:hidden}.p-avatar .p-avatar-icon{font-size:1rem}.p-avatar img{width:100%;height:100%}}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: Avatar, decorators: [{
            type: Component,
            args: [{ selector: 'p-avatar', template: `
        <div [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style" [attr.aria-labelledby]="ariaLabelledBy" [attr.aria-label]="ariaLabel" [attr.data-pc-name]="'avatar'">
            <ng-content></ng-content>
            <span class="p-avatar-text" *ngIf="label; else iconTemplate">{{ label }}</span>
            <ng-template #iconTemplate><span [class]="icon" [ngClass]="'p-avatar-icon'" *ngIf="icon; else imageTemplate"></span></ng-template>
            <ng-template #imageTemplate><img [src]="image" *ngIf="image" (error)="imageError($event)" /></ng-template>
        </div>
    `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-avatar{display:inline-flex;align-items:center;justify-content:center;width:2rem;height:2rem;font-size:1rem}.p-avatar.p-avatar-image{background-color:transparent}.p-avatar.p-avatar-circle{border-radius:50%;overflow:hidden}.p-avatar .p-avatar-icon{font-size:1rem}.p-avatar img{width:100%;height:100%}}\n"] }]
        }], propDecorators: { label: [{
                type: Input
            }], icon: [{
                type: Input
            }], image: [{
                type: Input
            }], size: [{
                type: Input
            }], shape: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], ariaLabelledBy: [{
                type: Input
            }], onImageError: [{
                type: Output
            }] } });
export class AvatarModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: AvatarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.5", ngImport: i0, type: AvatarModule, declarations: [Avatar], imports: [CommonModule], exports: [Avatar] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: AvatarModule, imports: [CommonModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: AvatarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [Avatar],
                    declarations: [Avatar]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL2F2YXRhci9hdmF0YXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFDN0g7OztHQUdHO0FBa0JILE1BQU0sT0FBTyxNQUFNO0lBQ2Y7OztPQUdHO0lBQ00sS0FBSyxDQUFxQjtJQUNuQzs7O09BR0c7SUFDTSxJQUFJLENBQXFCO0lBQ2xDOzs7T0FHRztJQUNNLEtBQUssQ0FBcUI7SUFDbkM7OztPQUdHO0lBQ00sSUFBSSxHQUE4QyxRQUFRLENBQUM7SUFDcEU7OztPQUdHO0lBQ00sS0FBSyxHQUFvQyxRQUFRLENBQUM7SUFDM0Q7OztPQUdHO0lBQ00sS0FBSyxDQUE4QztJQUM1RDs7O09BR0c7SUFDTSxVQUFVLENBQXFCO0lBQ3hDOzs7T0FHRztJQUNNLFNBQVMsQ0FBcUI7SUFDdkM7OztPQUdHO0lBQ00sY0FBYyxDQUFxQjtJQUM1Qzs7OztPQUlHO0lBQ08sWUFBWSxHQUF3QixJQUFJLFlBQVksRUFBUyxDQUFDO0lBRXhFLGNBQWM7UUFDVixPQUFPO1lBQ0gsc0JBQXNCLEVBQUUsSUFBSTtZQUM1QixnQkFBZ0IsRUFBRSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUk7WUFDcEMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLEtBQUssS0FBSyxRQUFRO1lBQzFDLGFBQWEsRUFBRSxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU87WUFDcEMsYUFBYSxFQUFFLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUTtTQUN4QyxDQUFDO0lBQ04sQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFZO1FBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUM7dUdBakVRLE1BQU07MkZBQU4sTUFBTSw4VEFmTDs7Ozs7OztLQU9UOzsyRkFRUSxNQUFNO2tCQWpCbEIsU0FBUzsrQkFDSSxVQUFVLFlBQ1Y7Ozs7Ozs7S0FPVCxtQkFDZ0IsdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSSxRQUUvQjt3QkFDRixLQUFLLEVBQUUsV0FBVztxQkFDckI7OEJBT1EsS0FBSztzQkFBYixLQUFLO2dCQUtHLElBQUk7c0JBQVosS0FBSztnQkFLRyxLQUFLO3NCQUFiLEtBQUs7Z0JBS0csSUFBSTtzQkFBWixLQUFLO2dCQUtHLEtBQUs7c0JBQWIsS0FBSztnQkFLRyxLQUFLO3NCQUFiLEtBQUs7Z0JBS0csVUFBVTtzQkFBbEIsS0FBSztnQkFLRyxTQUFTO3NCQUFqQixLQUFLO2dCQUtHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBTUksWUFBWTtzQkFBckIsTUFBTTs7QUFzQlgsTUFBTSxPQUFPLFlBQVk7dUdBQVosWUFBWTt3R0FBWixZQUFZLGlCQXpFWixNQUFNLGFBcUVMLFlBQVksYUFyRWIsTUFBTTt3R0F5RU4sWUFBWSxZQUpYLFlBQVk7OzJGQUliLFlBQVk7a0JBTHhCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUM7b0JBQ2pCLFlBQVksRUFBRSxDQUFDLE1BQU0sQ0FBQztpQkFDekIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgTmdNb2R1bGUsIE91dHB1dCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8qKlxuICogQXZhdGFyIHJlcHJlc2VudHMgcGVvcGxlIHVzaW5nIGljb25zLCBsYWJlbHMgYW5kIGltYWdlcy5cbiAqIEBncm91cCBDb21wb25lbnRzXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1hdmF0YXInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwiY29udGFpbmVyQ2xhc3MoKVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCIgW25nU3R5bGVdPVwic3R5bGVcIiBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiYXJpYUxhYmVsbGVkQnlcIiBbYXR0ci5hcmlhLWxhYmVsXT1cImFyaWFMYWJlbFwiIFthdHRyLmRhdGEtcGMtbmFtZV09XCInYXZhdGFyJ1wiPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLWF2YXRhci10ZXh0XCIgKm5nSWY9XCJsYWJlbDsgZWxzZSBpY29uVGVtcGxhdGVcIj57eyBsYWJlbCB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjaWNvblRlbXBsYXRlPjxzcGFuIFtjbGFzc109XCJpY29uXCIgW25nQ2xhc3NdPVwiJ3AtYXZhdGFyLWljb24nXCIgKm5nSWY9XCJpY29uOyBlbHNlIGltYWdlVGVtcGxhdGVcIj48L3NwYW4+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjaW1hZ2VUZW1wbGF0ZT48aW1nIFtzcmNdPVwiaW1hZ2VcIiAqbmdJZj1cImltYWdlXCIgKGVycm9yKT1cImltYWdlRXJyb3IoJGV2ZW50KVwiIC8+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHN0eWxlVXJsczogWycuL2F2YXRhci5jc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgQXZhdGFyIHtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHRoZSB0ZXh0IHRvIGRpc3BsYXkuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbGFiZWw6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHRoZSBpY29uIHRvIGRpc3BsYXkuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaWNvbjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgdGhlIGltYWdlIHRvIGRpc3BsYXkuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaW1hZ2U6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTaXplIG9mIHRoZSBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNpemU6ICdub3JtYWwnIHwgJ2xhcmdlJyB8ICd4bGFyZ2UnIHwgdW5kZWZpbmVkID0gJ25vcm1hbCc7XG4gICAgLyoqXG4gICAgICogU2hhcGUgb2YgdGhlIGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc2hhcGU6ICdzcXVhcmUnIHwgJ2NpcmNsZScgfCB1bmRlZmluZWQgPSAnc3F1YXJlJztcbiAgICAvKipcbiAgICAgKiBJbmxpbmUgc3R5bGUgb2YgdGhlIGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGU6IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSB8IG51bGwgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogQ2xhc3Mgb2YgdGhlIGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEVzdGFibGlzaGVzIGEgc3RyaW5nIHZhbHVlIHRoYXQgbGFiZWxzIHRoZSBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgYXJpYUxhYmVsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRXN0YWJsaXNoZXMgcmVsYXRpb25zaGlwcyBiZXR3ZWVuIHRoZSBjb21wb25lbnQgYW5kIGxhYmVsKHMpIHdoZXJlIGl0cyB2YWx1ZSBzaG91bGQgYmUgb25lIG9yIG1vcmUgZWxlbWVudCBJRHMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgYXJpYUxhYmVsbGVkQnk6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBUaGlzIGV2ZW50IGlzIHRyaWdnZXJlZCBpZiBhbiBlcnJvciBvY2N1cnMgd2hpbGUgbG9hZGluZyBhbiBpbWFnZSBmaWxlLlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gQnJvd3NlciBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25JbWFnZUVycm9yOiBFdmVudEVtaXR0ZXI8RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudD4oKTtcblxuICAgIGNvbnRhaW5lckNsYXNzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ3AtYXZhdGFyIHAtY29tcG9uZW50JzogdHJ1ZSxcbiAgICAgICAgICAgICdwLWF2YXRhci1pbWFnZSc6IHRoaXMuaW1hZ2UgIT0gbnVsbCxcbiAgICAgICAgICAgICdwLWF2YXRhci1jaXJjbGUnOiB0aGlzLnNoYXBlID09PSAnY2lyY2xlJyxcbiAgICAgICAgICAgICdwLWF2YXRhci1sZyc6IHRoaXMuc2l6ZSA9PT0gJ2xhcmdlJyxcbiAgICAgICAgICAgICdwLWF2YXRhci14bCc6IHRoaXMuc2l6ZSA9PT0gJ3hsYXJnZSdcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBpbWFnZUVycm9yKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLm9uSW1hZ2VFcnJvci5lbWl0KGV2ZW50KTtcbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW0F2YXRhcl0sXG4gICAgZGVjbGFyYXRpb25zOiBbQXZhdGFyXVxufSlcbmV4cG9ydCBjbGFzcyBBdmF0YXJNb2R1bGUge31cbiJdfQ==