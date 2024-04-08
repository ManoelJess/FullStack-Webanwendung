import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * ProgressBar is a process status indicator.
 * @group Components
 */
export class ProgressBar {
    /**
     * Current value of the progress.
     * @group Props
     */
    value;
    /**
     * Whether to display the progress bar value.
     * @group Props
     */
    showValue = true;
    /**
     * Class of the element.
     * @group Props
     */
    styleClass;
    /**
     * Inline style of the element.
     * @group Props
     */
    style;
    /**
     * Unit sign appended to the value.
     * @group Props
     */
    unit = '%';
    /**
     * Defines the mode of the progress
     * @group Props
     */
    mode = 'determinate';
    /**
     * Color for the background of the progress.
     * @group Props
     */
    color;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: ProgressBar, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: ProgressBar, selector: "p-progressBar", inputs: { value: "value", showValue: "showValue", styleClass: "styleClass", style: "style", unit: "unit", mode: "mode", color: "color" }, host: { classAttribute: "p-element" }, ngImport: i0, template: `
        <div
            role="progressbar"
            [class]="styleClass"
            [ngStyle]="style"
            [attr.aria-valuemin]="0"
            [attr.aria-valuenow]="value"
            [attr.aria-valuemax]="100"
            [attr.data-pc-name]="'progressbar'"
            [attr.data-pc-section]="'root'"
            [ngClass]="{ 'p-progressbar p-component': true, 'p-progressbar-determinate': mode === 'determinate', 'p-progressbar-indeterminate': mode === 'indeterminate' }"
        >
            <div *ngIf="mode === 'determinate'" class="p-progressbar-value p-progressbar-value-animate" [style.width]="value + '%'" style="display:flex" [style.background]="color" [attr.data-pc-section]="'value'">
                <div *ngIf="showValue" class="p-progressbar-label" [style.display]="value != null && value !== 0 ? 'flex' : 'none'" [attr.data-pc-section]="'label'">{{ value }}{{ unit }}</div>
            </div>
            <div *ngIf="mode === 'indeterminate'" class="p-progressbar-indeterminate-container" [attr.data-pc-section]="'container'">
                <div class="p-progressbar-value p-progressbar-value-animate" [style.background]="color" [attr.data-pc-section]="'value'"></div>
            </div>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-progressbar{position:relative;overflow:hidden}.p-progressbar-determinate .p-progressbar-value{height:100%;width:0%;position:absolute;display:none;border:0 none;display:flex;align-items:center;justify-content:center;overflow:hidden}.p-progressbar-determinate .p-progressbar-label{display:inline-flex}.p-progressbar-determinate .p-progressbar-value-animate{transition:width 1s ease-in-out}.p-progressbar-indeterminate .p-progressbar-value:before{content:\"\";position:absolute;background-color:inherit;top:0;left:0;bottom:0;will-change:left,right;animation:p-progressbar-indeterminate-anim 2.1s cubic-bezier(.65,.815,.735,.395) infinite}.p-progressbar-indeterminate .p-progressbar-value:after{content:\"\";position:absolute;background-color:inherit;top:0;left:0;bottom:0;will-change:left,right;animation:p-progressbar-indeterminate-anim-short 2.1s cubic-bezier(.165,.84,.44,1) infinite;animation-delay:1.15s}}@keyframes p-progressbar-indeterminate-anim{0%{left:-35%;right:100%}60%{left:100%;right:-90%}to{left:100%;right:-90%}}@keyframes p-progressbar-indeterminate-anim-short{0%{left:-200%;right:100%}60%{left:107%;right:-8%}to{left:107%;right:-8%}}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: ProgressBar, decorators: [{
            type: Component,
            args: [{ selector: 'p-progressBar', template: `
        <div
            role="progressbar"
            [class]="styleClass"
            [ngStyle]="style"
            [attr.aria-valuemin]="0"
            [attr.aria-valuenow]="value"
            [attr.aria-valuemax]="100"
            [attr.data-pc-name]="'progressbar'"
            [attr.data-pc-section]="'root'"
            [ngClass]="{ 'p-progressbar p-component': true, 'p-progressbar-determinate': mode === 'determinate', 'p-progressbar-indeterminate': mode === 'indeterminate' }"
        >
            <div *ngIf="mode === 'determinate'" class="p-progressbar-value p-progressbar-value-animate" [style.width]="value + '%'" style="display:flex" [style.background]="color" [attr.data-pc-section]="'value'">
                <div *ngIf="showValue" class="p-progressbar-label" [style.display]="value != null && value !== 0 ? 'flex' : 'none'" [attr.data-pc-section]="'label'">{{ value }}{{ unit }}</div>
            </div>
            <div *ngIf="mode === 'indeterminate'" class="p-progressbar-indeterminate-container" [attr.data-pc-section]="'container'">
                <div class="p-progressbar-value p-progressbar-value-animate" [style.background]="color" [attr.data-pc-section]="'value'"></div>
            </div>
        </div>
    `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-progressbar{position:relative;overflow:hidden}.p-progressbar-determinate .p-progressbar-value{height:100%;width:0%;position:absolute;display:none;border:0 none;display:flex;align-items:center;justify-content:center;overflow:hidden}.p-progressbar-determinate .p-progressbar-label{display:inline-flex}.p-progressbar-determinate .p-progressbar-value-animate{transition:width 1s ease-in-out}.p-progressbar-indeterminate .p-progressbar-value:before{content:\"\";position:absolute;background-color:inherit;top:0;left:0;bottom:0;will-change:left,right;animation:p-progressbar-indeterminate-anim 2.1s cubic-bezier(.65,.815,.735,.395) infinite}.p-progressbar-indeterminate .p-progressbar-value:after{content:\"\";position:absolute;background-color:inherit;top:0;left:0;bottom:0;will-change:left,right;animation:p-progressbar-indeterminate-anim-short 2.1s cubic-bezier(.165,.84,.44,1) infinite;animation-delay:1.15s}}@keyframes p-progressbar-indeterminate-anim{0%{left:-35%;right:100%}60%{left:100%;right:-90%}to{left:100%;right:-90%}}@keyframes p-progressbar-indeterminate-anim-short{0%{left:-200%;right:100%}60%{left:107%;right:-8%}to{left:107%;right:-8%}}\n"] }]
        }], propDecorators: { value: [{
                type: Input
            }], showValue: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], style: [{
                type: Input
            }], unit: [{
                type: Input
            }], mode: [{
                type: Input
            }], color: [{
                type: Input
            }] } });
export class ProgressBarModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: ProgressBarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.5", ngImport: i0, type: ProgressBarModule, declarations: [ProgressBar], imports: [CommonModule], exports: [ProgressBar] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: ProgressBarModule, imports: [CommonModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: ProgressBarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [ProgressBar],
                    declarations: [ProgressBar]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3NiYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvcHJvZ3Jlc3NiYXIvcHJvZ3Jlc3NiYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBQ3ZHOzs7R0FHRztBQThCSCxNQUFNLE9BQU8sV0FBVztJQUNwQjs7O09BR0c7SUFDTSxLQUFLLENBQXFCO0lBQ25DOzs7T0FHRztJQUNNLFNBQVMsR0FBWSxJQUFJLENBQUM7SUFDbkM7OztPQUdHO0lBQ00sVUFBVSxDQUFxQjtJQUN4Qzs7O09BR0c7SUFDTSxLQUFLLENBQThDO0lBQzVEOzs7T0FHRztJQUNNLElBQUksR0FBVyxHQUFHLENBQUM7SUFDNUI7OztPQUdHO0lBQ00sSUFBSSxHQUFXLGFBQWEsQ0FBQztJQUN0Qzs7O09BR0c7SUFDTSxLQUFLLENBQXFCO3VHQW5DMUIsV0FBVzsyRkFBWCxXQUFXLHNPQTNCVjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQW1CVDs7MkZBUVEsV0FBVztrQkE3QnZCLFNBQVM7K0JBQ0ksZUFBZSxZQUNmOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBbUJULG1CQUNnQix1QkFBdUIsQ0FBQyxNQUFNLGlCQUNoQyxpQkFBaUIsQ0FBQyxJQUFJLFFBRS9CO3dCQUNGLEtBQUssRUFBRSxXQUFXO3FCQUNyQjs4QkFPUSxLQUFLO3NCQUFiLEtBQUs7Z0JBS0csU0FBUztzQkFBakIsS0FBSztnQkFLRyxVQUFVO3NCQUFsQixLQUFLO2dCQUtHLEtBQUs7c0JBQWIsS0FBSztnQkFLRyxJQUFJO3NCQUFaLEtBQUs7Z0JBS0csSUFBSTtzQkFBWixLQUFLO2dCQUtHLEtBQUs7c0JBQWIsS0FBSzs7QUFRVixNQUFNLE9BQU8saUJBQWlCO3VHQUFqQixpQkFBaUI7d0dBQWpCLGlCQUFpQixpQkEzQ2pCLFdBQVcsYUF1Q1YsWUFBWSxhQXZDYixXQUFXO3dHQTJDWCxpQkFBaUIsWUFKaEIsWUFBWTs7MkZBSWIsaUJBQWlCO2tCQUw3QixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDO29CQUN0QixZQUFZLEVBQUUsQ0FBQyxXQUFXLENBQUM7aUJBQzlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBOZ01vZHVsZSwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8qKlxuICogUHJvZ3Jlc3NCYXIgaXMgYSBwcm9jZXNzIHN0YXR1cyBpbmRpY2F0b3IuXG4gKiBAZ3JvdXAgQ29tcG9uZW50c1xuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtcHJvZ3Jlc3NCYXInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXZcbiAgICAgICAgICAgIHJvbGU9XCJwcm9ncmVzc2JhclwiXG4gICAgICAgICAgICBbY2xhc3NdPVwic3R5bGVDbGFzc1wiXG4gICAgICAgICAgICBbbmdTdHlsZV09XCJzdHlsZVwiXG4gICAgICAgICAgICBbYXR0ci5hcmlhLXZhbHVlbWluXT1cIjBcIlxuICAgICAgICAgICAgW2F0dHIuYXJpYS12YWx1ZW5vd109XCJ2YWx1ZVwiXG4gICAgICAgICAgICBbYXR0ci5hcmlhLXZhbHVlbWF4XT1cIjEwMFwiXG4gICAgICAgICAgICBbYXR0ci5kYXRhLXBjLW5hbWVdPVwiJ3Byb2dyZXNzYmFyJ1wiXG4gICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3Jvb3QnXCJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3AtcHJvZ3Jlc3NiYXIgcC1jb21wb25lbnQnOiB0cnVlLCAncC1wcm9ncmVzc2Jhci1kZXRlcm1pbmF0ZSc6IG1vZGUgPT09ICdkZXRlcm1pbmF0ZScsICdwLXByb2dyZXNzYmFyLWluZGV0ZXJtaW5hdGUnOiBtb2RlID09PSAnaW5kZXRlcm1pbmF0ZScgfVwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJtb2RlID09PSAnZGV0ZXJtaW5hdGUnXCIgY2xhc3M9XCJwLXByb2dyZXNzYmFyLXZhbHVlIHAtcHJvZ3Jlc3NiYXItdmFsdWUtYW5pbWF0ZVwiIFtzdHlsZS53aWR0aF09XCJ2YWx1ZSArICclJ1wiIHN0eWxlPVwiZGlzcGxheTpmbGV4XCIgW3N0eWxlLmJhY2tncm91bmRdPVwiY29sb3JcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3ZhbHVlJ1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJzaG93VmFsdWVcIiBjbGFzcz1cInAtcHJvZ3Jlc3NiYXItbGFiZWxcIiBbc3R5bGUuZGlzcGxheV09XCJ2YWx1ZSAhPSBudWxsICYmIHZhbHVlICE9PSAwID8gJ2ZsZXgnIDogJ25vbmUnXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidsYWJlbCdcIj57eyB2YWx1ZSB9fXt7IHVuaXQgfX08L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cIm1vZGUgPT09ICdpbmRldGVybWluYXRlJ1wiIGNsYXNzPVwicC1wcm9ncmVzc2Jhci1pbmRldGVybWluYXRlLWNvbnRhaW5lclwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInY29udGFpbmVyJ1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXByb2dyZXNzYmFyLXZhbHVlIHAtcHJvZ3Jlc3NiYXItdmFsdWUtYW5pbWF0ZVwiIFtzdHlsZS5iYWNrZ3JvdW5kXT1cImNvbG9yXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIid2YWx1ZSdcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vcHJvZ3Jlc3NiYXIuY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFByb2dyZXNzQmFyIHtcbiAgICAvKipcbiAgICAgKiBDdXJyZW50IHZhbHVlIG9mIHRoZSBwcm9ncmVzcy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB2YWx1ZTogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gZGlzcGxheSB0aGUgcHJvZ3Jlc3MgYmFyIHZhbHVlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNob3dWYWx1ZTogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogQ2xhc3Mgb2YgdGhlIGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIElubGluZSBzdHlsZSBvZiB0aGUgZWxlbWVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdHlsZTogeyBba2xhc3M6IHN0cmluZ106IGFueSB9IHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBVbml0IHNpZ24gYXBwZW5kZWQgdG8gdGhlIHZhbHVlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHVuaXQ6IHN0cmluZyA9ICclJztcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHRoZSBtb2RlIG9mIHRoZSBwcm9ncmVzc1xuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG1vZGU6IHN0cmluZyA9ICdkZXRlcm1pbmF0ZSc7XG4gICAgLyoqXG4gICAgICogQ29sb3IgZm9yIHRoZSBiYWNrZ3JvdW5kIG9mIHRoZSBwcm9ncmVzcy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBjb2xvcjogc3RyaW5nIHwgdW5kZWZpbmVkO1xufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtQcm9ncmVzc0Jhcl0sXG4gICAgZGVjbGFyYXRpb25zOiBbUHJvZ3Jlc3NCYXJdXG59KVxuZXhwb3J0IGNsYXNzIFByb2dyZXNzQmFyTW9kdWxlIHt9XG4iXX0=