import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, NgModule, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/ripple";
export const TOGGLEBUTTON_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ToggleButton),
    multi: true
};
/**
 * ToggleButton is used to select a boolean value using a button.
 * @group Components
 */
export class ToggleButton {
    cd;
    /**
     * Label for the on state.
     * @group Props
     */
    onLabel;
    /**
     * Label for the off state.
     * @group Props
     */
    offLabel;
    /**
     * Icon for the on state.
     * @group Props
     */
    onIcon;
    /**
     * Icon for the off state.
     * @group Props
     */
    offIcon;
    /**
     * Defines a string that labels the input for accessibility.
     * @group Props
     */
    ariaLabel;
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    ariaLabelledBy;
    /**
     * When present, it specifies that the element should be disabled.
     * @group Props
     */
    disabled;
    /**
     * Inline style of the element.
     * @group Props
     */
    style;
    /**
     * Style class of the element.
     * @group Props
     */
    styleClass;
    /**
     * Identifier of the focus input to match a label defined for the component.
     * @group Props
     */
    inputId;
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex;
    /**
     * Position of the icon.
     * @group Props
     */
    iconPos = 'left';
    /**
     * Callback to invoke on value change.
     * @param {ToggleButtonChangeEvent} event - Custom change event.
     * @group Emits
     */
    onChange = new EventEmitter();
    checked = false;
    onModelChange = () => { };
    onModelTouched = () => { };
    constructor(cd) {
        this.cd = cd;
    }
    toggle(event) {
        if (!this.disabled) {
            this.checked = !this.checked;
            this.onModelChange(this.checked);
            this.onModelTouched();
            this.onChange.emit({
                originalEvent: event,
                checked: this.checked
            });
            this.cd.markForCheck();
        }
    }
    onKeyDown(event) {
        switch (event.code) {
            case 'Enter':
                this.toggle(event);
                event.preventDefault();
                break;
            case 'Space':
                this.toggle(event);
                event.preventDefault();
                break;
        }
    }
    onBlur() {
        this.onModelTouched();
    }
    writeValue(value) {
        this.checked = value;
        this.cd.markForCheck();
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    setDisabledState(val) {
        this.disabled = val;
        this.cd.markForCheck();
    }
    get hasOnLabel() {
        return (this.onLabel && this.onLabel.length > 0);
    }
    get hasOffLabel() {
        return (this.onLabel && this.onLabel.length > 0);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: ToggleButton, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: ToggleButton, selector: "p-toggleButton", inputs: { onLabel: "onLabel", offLabel: "offLabel", onIcon: "onIcon", offIcon: "offIcon", ariaLabel: "ariaLabel", ariaLabelledBy: "ariaLabelledBy", disabled: "disabled", style: "style", styleClass: "styleClass", inputId: "inputId", tabindex: "tabindex", iconPos: "iconPos" }, outputs: { onChange: "onChange" }, host: { classAttribute: "p-element" }, providers: [TOGGLEBUTTON_VALUE_ACCESSOR], ngImport: i0, template: `
        <div
            [ngClass]="{ 'p-button p-togglebutton p-component': true, 'p-button-icon-only': onIcon && offIcon && !hasOnLabel && !hasOffLabel, 'p-highlight': checked, 'p-disabled': disabled }"
            [ngStyle]="style"
            [class]="styleClass"
            (click)="toggle($event)"
            (keydown)="onKeyDown($event)"
            [attr.tabindex]="disabled ? null : '0'"
            role="switch"
            [attr.aria-checked]="checked"
            [attr.aria-labelledby]="ariaLabelledBy"
            [attr.aria-label]="ariaLabel"
            pRipple
            [attr.data-pc-name]="'togglebutton'"
            [attr.data-pc-section]="'root'"
        >
            <span
                *ngIf="onIcon || offIcon"
                [class]="checked ? this.onIcon : this.offIcon"
                [ngClass]="{ 'p-button-icon': true, 'p-button-icon-left': iconPos === 'left', 'p-button-icon-right': iconPos === 'right' }"
                [attr.data-pc-section]="'icon'"
            ></span>
            <span class="p-button-label" *ngIf="onLabel || offLabel" [attr.data-pc-section]="'label'">{{ checked ? (hasOnLabel ? onLabel : '') : hasOffLabel ? offLabel : '' }}</span>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-button{margin:0;display:inline-flex;cursor:pointer;-webkit-user-select:none;user-select:none;align-items:center;vertical-align:bottom;text-align:center;overflow:hidden;position:relative}.p-button-label{flex:1 1 auto}.p-button-icon-right{order:1}.p-button:disabled{cursor:default;pointer-events:none}.p-button-icon-only{justify-content:center}.p-button-icon-only:after{content:\"p\";visibility:hidden;clip:rect(0 0 0 0);width:0}.p-button-vertical{flex-direction:column}.p-button-icon-bottom{order:2}.p-buttonset .p-button{margin:0}.p-buttonset .p-button:not(:last-child){border-right:0 none}.p-buttonset .p-button:not(:first-of-type):not(:last-of-type){border-radius:0}.p-buttonset .p-button:first-of-type{border-top-right-radius:0;border-bottom-right-radius:0}.p-buttonset .p-button:last-of-type{border-top-left-radius:0;border-bottom-left-radius:0}.p-buttonset .p-button:focus{position:relative;z-index:1}p-button[iconpos=right] spinnericon{order:1}}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i2.Ripple, selector: "[pRipple]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: ToggleButton, decorators: [{
            type: Component,
            args: [{ selector: 'p-toggleButton', template: `
        <div
            [ngClass]="{ 'p-button p-togglebutton p-component': true, 'p-button-icon-only': onIcon && offIcon && !hasOnLabel && !hasOffLabel, 'p-highlight': checked, 'p-disabled': disabled }"
            [ngStyle]="style"
            [class]="styleClass"
            (click)="toggle($event)"
            (keydown)="onKeyDown($event)"
            [attr.tabindex]="disabled ? null : '0'"
            role="switch"
            [attr.aria-checked]="checked"
            [attr.aria-labelledby]="ariaLabelledBy"
            [attr.aria-label]="ariaLabel"
            pRipple
            [attr.data-pc-name]="'togglebutton'"
            [attr.data-pc-section]="'root'"
        >
            <span
                *ngIf="onIcon || offIcon"
                [class]="checked ? this.onIcon : this.offIcon"
                [ngClass]="{ 'p-button-icon': true, 'p-button-icon-left': iconPos === 'left', 'p-button-icon-right': iconPos === 'right' }"
                [attr.data-pc-section]="'icon'"
            ></span>
            <span class="p-button-label" *ngIf="onLabel || offLabel" [attr.data-pc-section]="'label'">{{ checked ? (hasOnLabel ? onLabel : '') : hasOffLabel ? offLabel : '' }}</span>
        </div>
    `, providers: [TOGGLEBUTTON_VALUE_ACCESSOR], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-button{margin:0;display:inline-flex;cursor:pointer;-webkit-user-select:none;user-select:none;align-items:center;vertical-align:bottom;text-align:center;overflow:hidden;position:relative}.p-button-label{flex:1 1 auto}.p-button-icon-right{order:1}.p-button:disabled{cursor:default;pointer-events:none}.p-button-icon-only{justify-content:center}.p-button-icon-only:after{content:\"p\";visibility:hidden;clip:rect(0 0 0 0);width:0}.p-button-vertical{flex-direction:column}.p-button-icon-bottom{order:2}.p-buttonset .p-button{margin:0}.p-buttonset .p-button:not(:last-child){border-right:0 none}.p-buttonset .p-button:not(:first-of-type):not(:last-of-type){border-radius:0}.p-buttonset .p-button:first-of-type{border-top-right-radius:0;border-bottom-right-radius:0}.p-buttonset .p-button:last-of-type{border-top-left-radius:0;border-bottom-left-radius:0}.p-buttonset .p-button:focus{position:relative;z-index:1}p-button[iconpos=right] spinnericon{order:1}}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }], propDecorators: { onLabel: [{
                type: Input
            }], offLabel: [{
                type: Input
            }], onIcon: [{
                type: Input
            }], offIcon: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], ariaLabelledBy: [{
                type: Input
            }], disabled: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], inputId: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], iconPos: [{
                type: Input
            }], onChange: [{
                type: Output
            }] } });
export class ToggleButtonModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: ToggleButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.5", ngImport: i0, type: ToggleButtonModule, declarations: [ToggleButton], imports: [CommonModule, RippleModule], exports: [ToggleButton] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: ToggleButtonModule, imports: [CommonModule, RippleModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: ToggleButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RippleModule],
                    exports: [ToggleButton],
                    declarations: [ToggleButton]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlYnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL3RvZ2dsZWJ1dHRvbi90b2dnbGVidXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSx1QkFBdUIsRUFBcUIsU0FBUyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekksT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUs5QyxNQUFNLENBQUMsTUFBTSwyQkFBMkIsR0FBUTtJQUM1QyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDO0lBQzNDLEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQUNGOzs7R0FHRztBQW1DSCxNQUFNLE9BQU8sWUFBWTtJQTBFRjtJQXpFbkI7OztPQUdHO0lBQ00sT0FBTyxDQUFxQjtJQUNyQzs7O09BR0c7SUFDTSxRQUFRLENBQXFCO0lBQ3RDOzs7T0FHRztJQUNNLE1BQU0sQ0FBcUI7SUFDcEM7OztPQUdHO0lBQ00sT0FBTyxDQUFxQjtJQUNyQzs7O09BR0c7SUFDTSxTQUFTLENBQXFCO0lBQ3ZDOzs7T0FHRztJQUNNLGNBQWMsQ0FBcUI7SUFDNUM7OztPQUdHO0lBQ00sUUFBUSxDQUFzQjtJQUN2Qzs7O09BR0c7SUFDTSxLQUFLLENBQU07SUFDcEI7OztPQUdHO0lBQ00sVUFBVSxDQUFxQjtJQUN4Qzs7O09BR0c7SUFDTSxPQUFPLENBQXFCO0lBQ3JDOzs7T0FHRztJQUNNLFFBQVEsQ0FBcUI7SUFDdEM7OztPQUdHO0lBQ00s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S0csU0FBUztzQkFBakIsS0FBSztnQkFLRyxjQUFjO3NCQUF0QixLQUFLO2dCQUtHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBS0csS0FBSztzQkFBYixLQUFLO2dCQUtHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBS0csT0FBTztzQkFBZixLQUFLO2dCQUtHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBS0csT0FBTztzQkFBZixLQUFLO2dCQU1JLFFBQVE7c0JBQWpCLE1BQU07O0FBeUVYLE1BQU0sT0FBTyxrQkFBa0I7dUdBQWxCLGtCQUFrQjt3R0FBbEIsa0JBQWtCLGlCQTNJbEIsWUFBWSxhQXVJWCxZQUFZLEVBQUUsWUFBWSxhQXZJM0IsWUFBWTt3R0EySVosa0JBQWtCLFlBSmpCLFlBQVksRUFBRSxZQUFZOzsyRkFJM0Isa0JBQWtCO2tCQUw5QixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUM7b0JBQ3JDLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsWUFBWSxFQUFFLENBQUMsWUFBWSxDQUFDO2lCQUMvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBJbnB1dCwgTmdNb2R1bGUsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUmlwcGxlTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9yaXBwbGUnO1xuaW1wb3J0IHsgVG9nZ2xlQnV0dG9uQ2hhbmdlRXZlbnQgfSBmcm9tICcuL3RvZ2dsZWJ1dHRvbi5pbnRlcmZhY2UnO1xuXG50eXBlIFRvZ2dsZUJ1dHRvbkljb25Qb3NpdGlvbiA9ICdsZWZ0JyB8ICdyaWdodCc7XG5cbmV4cG9ydCBjb25zdCBUT0dHTEVCVVRUT05fVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBUb2dnbGVCdXR0b24pLFxuICAgIG11bHRpOiB0cnVlXG59O1xuLyoqXG4gKiBUb2dnbGVCdXR0b24gaXMgdXNlZCB0byBzZWxlY3QgYSBib29sZWFuIHZhbHVlIHVzaW5nIGEgYnV0dG9uLlxuICogQGdyb3VwIENvbXBvbmVudHNcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXRvZ2dsZUJ1dHRvbicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwieyAncC1idXR0b24gcC10b2dnbGVidXR0b24gcC1jb21wb25lbnQnOiB0cnVlLCAncC1idXR0b24taWNvbi1vbmx5Jzogb25JY29uICYmIG9mZkljb24gJiYgIWhhc09uTGFiZWwgJiYgIWhhc09mZkxhYmVsLCAncC1oaWdobGlnaHQnOiBjaGVja2VkLCAncC1kaXNhYmxlZCc6IGRpc2FibGVkIH1cIlxuICAgICAgICAgICAgW25nU3R5bGVdPVwic3R5bGVcIlxuICAgICAgICAgICAgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIlxuICAgICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZSgkZXZlbnQpXCJcbiAgICAgICAgICAgIChrZXlkb3duKT1cIm9uS2V5RG93bigkZXZlbnQpXCJcbiAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cImRpc2FibGVkID8gbnVsbCA6ICcwJ1wiXG4gICAgICAgICAgICByb2xlPVwic3dpdGNoXCJcbiAgICAgICAgICAgIFthdHRyLmFyaWEtY2hlY2tlZF09XCJjaGVja2VkXCJcbiAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJhcmlhTGFiZWxsZWRCeVwiXG4gICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImFyaWFMYWJlbFwiXG4gICAgICAgICAgICBwUmlwcGxlXG4gICAgICAgICAgICBbYXR0ci5kYXRhLXBjLW5hbWVdPVwiJ3RvZ2dsZWJ1dHRvbidcIlxuICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidyb290J1wiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgKm5nSWY9XCJvbkljb24gfHwgb2ZmSWNvblwiXG4gICAgICAgICAgICAgICAgW2NsYXNzXT1cImNoZWNrZWQgPyB0aGlzLm9uSWNvbiA6IHRoaXMub2ZmSWNvblwiXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyAncC1idXR0b24taWNvbic6IHRydWUsICdwLWJ1dHRvbi1pY29uLWxlZnQnOiBpY29uUG9zID09PSAnbGVmdCcsICdwLWJ1dHRvbi1pY29uLXJpZ2h0JzogaWNvblBvcyA9PT0gJ3JpZ2h0JyB9XCJcbiAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2ljb24nXCJcbiAgICAgICAgICAgID48L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtYnV0dG9uLWxhYmVsXCIgKm5nSWY9XCJvbkxhYmVsIHx8IG9mZkxhYmVsXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidsYWJlbCdcIj57eyBjaGVja2VkID8gKGhhc09uTGFiZWwgPyBvbkxhYmVsIDogJycpIDogaGFzT2ZmTGFiZWwgPyBvZmZMYWJlbCA6ICcnIH19PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIHByb3ZpZGVyczogW1RPR0dMRUJVVFRPTl9WQUxVRV9BQ0NFU1NPUl0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgc3R5bGVVcmxzOiBbJy4uL2J1dHRvbi9idXR0b24uY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFRvZ2dsZUJ1dHRvbiBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgICAvKipcbiAgICAgKiBMYWJlbCBmb3IgdGhlIG9uIHN0YXRlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG9uTGFiZWw6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBMYWJlbCBmb3IgdGhlIG9mZiBzdGF0ZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBvZmZMYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEljb24gZm9yIHRoZSBvbiBzdGF0ZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBvbkljb246IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJY29uIGZvciB0aGUgb2ZmIHN0YXRlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG9mZkljb246IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGEgc3RyaW5nIHRoYXQgbGFiZWxzIHRoZSBpbnB1dCBmb3IgYWNjZXNzaWJpbGl0eS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBhcmlhTGFiZWw6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBFc3RhYmxpc2hlcyByZWxhdGlvbnNoaXBzIGJldHdlZW4gdGhlIGNvbXBvbmVudCBhbmQgbGFiZWwocykgd2hlcmUgaXRzIHZhbHVlIHNob3VsZCBiZSBvbmUgb3IgbW9yZSBlbGVtZW50IElEcy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBhcmlhTGFiZWxsZWRCeTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZW4gcHJlc2VudCwgaXQgc3BlY2lmaWVzIHRoYXQgdGhlIGVsZW1lbnQgc2hvdWxkIGJlIGRpc2FibGVkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIElubGluZSBzdHlsZSBvZiB0aGUgZWxlbWVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJZGVudGlmaWVyIG9mIHRoZSBmb2N1cyBpbnB1dCB0byBtYXRjaCBhIGxhYmVsIGRlZmluZWQgZm9yIHRoZSBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaW5wdXRJZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEluZGV4IG9mIHRoZSBlbGVtZW50IGluIHRhYmJpbmcgb3JkZXIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdGFiaW5kZXg6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBQb3NpdGlvbiBvZiB0aGUgaWNvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBpY29uUG9zOiAnbGVmdCcgfCAncmlnaHQnID0gJ2xlZnQnO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSBvbiB2YWx1ZSBjaGFuZ2UuXG4gICAgICogQHBhcmFtIHtUb2dnbGVCdXR0b25DaGFuZ2VFdmVudH0gZXZlbnQgLSBDdXN0b20gY2hhbmdlIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkNoYW5nZTogRXZlbnRFbWl0dGVyPFRvZ2dsZUJ1dHRvbkNoYW5nZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8VG9nZ2xlQnV0dG9uQ2hhbmdlRXZlbnQ+KCk7XG5cbiAgICBjaGVja2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gICAgb25Nb2RlbFRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gICAgdG9nZ2xlKGV2ZW50OiBFdmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tlZCA9ICF0aGlzLmNoZWNrZWQ7XG4gICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy5jaGVja2VkKTtcbiAgICAgICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdCh7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgY2hlY2tlZDogdGhpcy5jaGVja2VkXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZShldmVudCk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ1NwYWNlJzpcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZShldmVudCk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQmx1cigpIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCgpO1xuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLmNoZWNrZWQgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIHNldERpc2FibGVkU3RhdGUodmFsOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSB2YWw7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgZ2V0IGhhc09uTGFiZWwoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAodGhpcy5vbkxhYmVsICYmIHRoaXMub25MYWJlbC5sZW5ndGggPiAwKSBhcyBib29sZWFuO1xuICAgIH1cblxuICAgIGdldCBoYXNPZmZMYWJlbCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLm9uTGFiZWwgJiYgdGhpcy5vbkxhYmVsLmxlbmd0aCA+IDApIGFzIGJvb2xlYW47XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFJpcHBsZU1vZHVsZV0sXG4gICAgZXhwb3J0czogW1RvZ2dsZUJ1dHRvbl0sXG4gICAgZGVjbGFyYXRpb25zOiBbVG9nZ2xlQnV0dG9uXVxufSlcbmV4cG9ydCBjbGFzcyBUb2dnbGVCdXR0b25Nb2R1bGUge31cbiJdfQ==