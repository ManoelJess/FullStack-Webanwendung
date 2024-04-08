import { Injectable, Inject, createComponent } from '@angular/core';
import { DomHandler } from 'primeng/dom';
import { DynamicDialogComponent } from './dynamicdialog';
import { DynamicDialogInjector } from './dynamicdialog-injector';
import { DynamicDialogConfig } from './dynamicdialog-config';
import { DynamicDialogRef } from './dynamicdialog-ref';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
/**
 * Dynamic Dialog component methods.
 * @group Service
 */
export class DialogService {
    appRef;
    injector;
    document;
    dialogComponentRefMap = new Map();
    constructor(appRef, injector, document) {
        this.appRef = appRef;
        this.injector = injector;
        this.document = document;
    }
    /**
     * Displays the dialog using the dynamic dialog object options.
     * @param {*} componentType - Dynamic component for content template.
     * @param {DynamicDialogConfig} config - DynamicDialog object.
     * @returns {DynamicDialogRef} DynamicDialog instance.
     * @group Method
     */
    open(componentType, config) {
        if (!this.duplicationPermission(componentType, config)) {
            return null;
        }
        const dialogRef = this.appendDialogComponentToBody(config);
        this.dialogComponentRefMap.get(dialogRef).instance.childComponentType = componentType;
        return dialogRef;
    }
    appendDialogComponentToBody(config) {
        const map = new WeakMap();
        map.set(DynamicDialogConfig, config);
        const dialogRef = new DynamicDialogRef();
        map.set(DynamicDialogRef, dialogRef);
        const sub = dialogRef.onClose.subscribe(() => {
            this.dialogComponentRefMap.get(dialogRef).instance.close();
        });
        const destroySub = dialogRef.onDestroy.subscribe(() => {
            this.removeDialogComponentFromBody(dialogRef);
            destroySub.unsubscribe();
            sub.unsubscribe();
        });
        const componentRef = createComponent(DynamicDialogComponent, { environmentInjector: this.appRef.injector, elementInjector: new DynamicDialogInjector(this.injector, map) });
        this.appRef.attachView(componentRef.hostView);
        const domElem = componentRef.hostView.rootNodes[0];
        if (!config.appendTo || config.appendTo === 'body') {
            this.document.body.appendChild(domElem);
        }
        else {
            DomHandler.appendChild(domElem, config.appendTo);
        }
        this.dialogComponentRefMap.set(dialogRef, componentRef);
        return dialogRef;
    }
    removeDialogComponentFromBody(dialogRef) {
        if (!dialogRef || !this.dialogComponentRefMap.has(dialogRef)) {
            return;
        }
        const dialogComponentRef = this.dialogComponentRefMap.get(dialogRef);
        this.appRef.detachView(dialogComponentRef.hostView);
        dialogComponentRef.destroy();
        this.dialogComponentRefMap.delete(dialogRef);
    }
    duplicationPermission(componentType, config) {
        if (config.duplicate) {
            return true;
        }
        let permission = true;
        for (const [key, value] of this.dialogComponentRefMap) {
            if (value.instance.childComponentType === componentType) {
                permission = false;
                break;
            }
        }
        return permission;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: DialogService, deps: [{ token: i0.ApplicationRef }, { token: i0.Injector }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: DialogService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: DialogService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i0.ApplicationRef }, { type: i0.Injector }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9keW5hbWljZGlhbG9nL2RpYWxvZ3NlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBaUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuSSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzdELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFDM0M7OztHQUdHO0FBRUgsTUFBTSxPQUFPLGFBQWE7SUFHRjtJQUFnQztJQUE4QztJQUZsRyxxQkFBcUIsR0FBZ0UsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUUvRixZQUFvQixNQUFzQixFQUFVLFFBQWtCLEVBQTRCLFFBQWtCO1FBQWhHLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUE0QixhQUFRLEdBQVIsUUFBUSxDQUFVO0lBQUcsQ0FBQztJQUN4SDs7Ozs7O09BTUc7SUFDSSxJQUFJLENBQUMsYUFBd0IsRUFBRSxNQUEyQjtRQUM3RCxJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNwRCxPQUFPLElBQUksQ0FBQztTQUNmO1FBRUQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLDJCQUEyQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTNELElBQUks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QUFLLENBQUMsUUFBUSxDQUFDLGtCQUFrQixLQUFLLGFBQWEsRUFBRTtnQkFDckQsVUFBVSxHQUFHLEtBQUssQ0FBQztnQkFDbkIsTUFBTTthQUNUO1NBQ0o7UUFDRCxPQUFPLFVBQVUsQ0FBQztJQUN0QixDQUFDO3VHQS9FUSxhQUFhLHdFQUcwRCxRQUFROzJHQUgvRSxhQUFhOzsyRkFBYixhQUFhO2tCQUR6QixVQUFVOzswQkFJa0UsTUFBTTsyQkFBQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgQXBwbGljYXRpb25SZWYsIEluamVjdG9yLCBUeXBlLCBFbWJlZGRlZFZpZXdSZWYsIENvbXBvbmVudFJlZiwgSW5qZWN0LCBjcmVhdGVDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbUhhbmRsZXIgfSBmcm9tICdwcmltZW5nL2RvbSc7XG5pbXBvcnQgeyBEeW5hbWljRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi9keW5hbWljZGlhbG9nJztcbmltcG9ydCB7IER5bmFtaWNEaWFsb2dJbmplY3RvciB9IGZyb20gJy4vZHluYW1pY2RpYWxvZy1pbmplY3Rvcic7XG5pbXBvcnQgeyBEeW5hbWljRGlhbG9nQ29uZmlnIH0gZnJvbSAnLi9keW5hbWljZGlhbG9nLWNvbmZpZyc7XG5pbXBvcnQgeyBEeW5hbWljRGlhbG9nUmVmIH0gZnJvbSAnLi9keW5hbWljZGlhbG9nLXJlZic7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG4vKipcbiAqIER5bmFtaWMgRGlhbG9nIGNvbXBvbmVudCBtZXRob2RzLlxuICogQGdyb3VwIFNlcnZpY2VcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERpYWxvZ1NlcnZpY2Uge1xuICAgIGRpYWxvZ0NvbXBvbmVudFJlZk1hcDogTWFwPER5bmFtaWNEaWFsb2dSZWYsIENvbXBvbmVudFJlZjxEeW5hbWljRGlhbG9nQ29tcG9uZW50Pj4gPSBuZXcgTWFwKCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwcFJlZjogQXBwbGljYXRpb25SZWYsIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLCBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudCkge31cbiAgICAvKipcbiAgICAgKiBEaXNwbGF5cyB0aGUgZGlhbG9nIHVzaW5nIHRoZSBkeW5hbWljIGRpYWxvZyBvYmplY3Qgb3B0aW9ucy5cbiAgICAgKiBAcGFyYW0geyp9IGNvbXBvbmVudFR5cGUgLSBEeW5hbWljIGNvbXBvbmVudCBmb3IgY29udGVudCB0ZW1wbGF0ZS5cbiAgICAgKiBAcGFyYW0ge0R5bmFtaWNEaWFsb2dDb25maWd9IGNvbmZpZyAtIER5bmFtaWNEaWFsb2cgb2JqZWN0LlxuICAgICAqIEByZXR1cm5zIHtEeW5hbWljRGlhbG9nUmVmfSBEeW5hbWljRGlhbG9nIGluc3RhbmNlLlxuICAgICAqIEBncm91cCBNZXRob2RcbiAgICAgKi9cbiAgICBwdWJsaWMgb3Blbihjb21wb25lbnRUeXBlOiBUeXBlPGFueT4sIGNvbmZpZzogRHluYW1pY0RpYWxvZ0NvbmZpZyk6IER5bmFtaWNEaWFsb2dSZWYge1xuICAgICAgICBpZiAoIXRoaXMuZHVwbGljYXRpb25QZXJtaXNzaW9uKGNvbXBvbmVudFR5cGUsIGNvbmZpZykpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZGlhbG9nUmVmID0gdGhpcy5hcHBlbmREaWFsb2dDb21wb25lbnRUb0JvZHkoY29uZmlnKTtcblxuICAgICAgICB0aGlzLmRpYWxvZ0NvbXBvbmVudFJlZk1hcC5nZXQoZGlhbG9nUmVmKS5pbnN0YW5jZS5jaGlsZENvbXBvbmVudFR5cGUgPSBjb21wb25lbnRUeXBlO1xuXG4gICAgICAgIHJldHVybiBkaWFsb2dSZWY7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhcHBlbmREaWFsb2dDb21wb25lbnRUb0JvZHkoY29uZmlnOiBEeW5hbWljRGlhbG9nQ29uZmlnKSB7XG4gICAgICAgIGNvbnN0IG1hcCA9IG5ldyBXZWFrTWFwKCk7XG4gICAgICAgIG1hcC5zZXQoRHluYW1pY0RpYWxvZ0NvbmZpZywgY29uZmlnKTtcblxuICAgICAgICBjb25zdCBkaWFsb2dSZWYgPSBuZXcgRHluYW1pY0RpYWxvZ1JlZigpO1xuICAgICAgICBtYXAuc2V0KER5bmFtaWNEaWFsb2dSZWYsIGRpYWxvZ1JlZik7XG5cbiAgICAgICAgY29uc3Qgc3ViID0gZGlhbG9nUmVmLm9uQ2xvc2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGlhbG9nQ29tcG9uZW50UmVmTWFwLmdldChkaWFsb2dSZWYpLmluc3RhbmNlLmNsb3NlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGRlc3Ryb3lTdWIgPSBkaWFsb2dSZWYub25EZXN0cm95LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZURpYWxvZ0NvbXBvbmVudEZyb21Cb2R5KGRpYWxvZ1JlZik7XG4gICAgICAgICAgICBkZXN0cm95U3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICBzdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgY29tcG9uZW50UmVmID0gY3JlYXRlQ29tcG9uZW50KER5bmFtaWNEaWFsb2dDb21wb25lbnQsIHsgZW52aXJvbm1lbnRJbmplY3RvcjogdGhpcy5hcHBSZWYuaW5qZWN0b3IsIGVsZW1lbnRJbmplY3RvcjogbmV3IER5bmFtaWNEaWFsb2dJbmplY3Rvcih0aGlzLmluamVjdG9yLCBtYXApIH0pO1xuXG4gICAgICAgIHRoaXMuYXBwUmVmLmF0dGFjaFZpZXcoY29tcG9uZW50UmVmLmhvc3RWaWV3KTtcblxuICAgICAgICBjb25zdCBkb21FbGVtID0gKGNvbXBvbmVudFJlZi5ob3N0VmlldyBhcyBFbWJlZGRlZFZpZXdSZWY8YW55Pikucm9vdE5vZGVzWzBdIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICBpZiAoIWNvbmZpZy5hcHBlbmRUbyB8fCBjb25maWcuYXBwZW5kVG8gPT09ICdib2R5Jykge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRvbUVsZW0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5hcHBlbmRDaGlsZChkb21FbGVtLCBjb25maWcuYXBwZW5kVG8pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kaWFsb2dDb21wb25lbnRSZWZNYXAuc2V0KGRpYWxvZ1JlZiwgY29tcG9uZW50UmVmKTtcblxuICAgICAgICByZXR1cm4gZGlhbG9nUmVmO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3ZlRGlhbG9nQ29tcG9uZW50RnJvbUJvZHkoZGlhbG9nUmVmOiBEeW5hbWljRGlhbG9nUmVmKSB7XG4gICAgICAgIGlmICghZGlhbG9nUmVmIHx8ICF0aGlzLmRpYWxvZ0NvbXBvbmVudFJlZk1hcC5oYXMoZGlhbG9nUmVmKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZGlhbG9nQ29tcG9uZW50UmVmID0gdGhpcy5kaWFsb2dDb21wb25lbnRSZWZNYXAuZ2V0KGRpYWxvZ1JlZik7XG4gICAgICAgIHRoaXMuYXBwUmVmLmRldGFjaFZpZXcoZGlhbG9nQ29tcG9uZW50UmVmLmhvc3RWaWV3KTtcbiAgICAgICAgZGlhbG9nQ29tcG9uZW50UmVmLmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5kaWFsb2dDb21wb25lbnRSZWZNYXAuZGVsZXRlKGRpYWxvZ1JlZik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkdXBsaWNhdGlvblBlcm1pc3Npb24oY29tcG9uZW50VHlwZTogVHlwZTxhbnk+LCBjb25maWc6IER5bmFtaWNEaWFsb2dDb25maWcpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKGNvbmZpZy5kdXBsaWNhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBwZXJtaXNzaW9uID0gdHJ1ZTtcbiAgICAgICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgdGhpcy5kaWFsb2dDb21wb25lbnRSZWZNYXApIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZS5pbnN0YW5jZS5jaGlsZENvbXBvbmVudFR5cGUgPT09IGNvbXBvbmVudFR5cGUpIHtcbiAgICAgICAgICAgICAgICBwZXJtaXNzaW9uID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBlcm1pc3Npb247XG4gICAgfVxufVxuIl19