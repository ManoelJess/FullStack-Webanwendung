import { CDK_DRAG_CONFIG, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Inject, Input, NgModule, Output, PLATFORM_ID, ViewChild, ViewEncapsulation } from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DomHandler } from 'primeng/dom';
import { AngleDoubleDownIcon } from 'primeng/icons/angledoubledown';
import { AngleDoubleLeftIcon } from 'primeng/icons/angledoubleleft';
import { AngleDoubleRightIcon } from 'primeng/icons/angledoubleright';
import { AngleDoubleUpIcon } from 'primeng/icons/angledoubleup';
import { AngleDownIcon } from 'primeng/icons/angledown';
import { AngleLeftIcon } from 'primeng/icons/angleleft';
import { AngleRightIcon } from 'primeng/icons/angleright';
import { AngleUpIcon } from 'primeng/icons/angleup';
import { HomeIcon } from 'primeng/icons/home';
import { SearchIcon } from 'primeng/icons/search';
import { RippleModule } from 'primeng/ripple';
import { ObjectUtils, UniqueComponentId } from 'primeng/utils';
import * as i0 from "@angular/core";
import * as i1 from "primeng/api";
import * as i2 from "@angular/common";
import * as i3 from "primeng/button";
import * as i4 from "primeng/ripple";
import * as i5 from "@angular/cdk/drag-drop";
/**
 * PickList is used to reorder items between different lists.
 * @group Components
 */
export class PickList {
    document;
    platformId;
    renderer;
    el;
    cd;
    filterService;
    config;
    /**
     * An array of objects for the source list.
     * @group Props
     */
    source;
    /**
     * An array of objects for the target list.
     * @group Props
     */
    target;
    /**
     * Text for the source list caption
     * @group Props
     */
    sourceHeader;
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex = 0;
    /**
     * Defines a string that labels the move to right button for accessibility.
     * @group Props
     */
    rightButtonAriaLabel;
    /**
     * Defines a string that labels the move to left button for accessibility.
     * @group Props
     */
    leftButtonAriaLabel;
    /**
     * Defines a string that labels the move to all right button for accessibility.
     * @group Props
     */
    allRightButtonAriaLabel;
    /**
     * Defines a string that labels the move to all left button for accessibility.
     * @group Props
     */
    allLeftButtonAriaLabel;
    /**
     * Defines a string that labels the move to up button for accessibility.
     * @group Props
     */
    upButtonAriaLabel;
    /**
     * Defines a string that labels the move to down button for accessibility.
     * @group Props
     */
    downButtonAriaLabel;
    /**
     * Defines a string that labels the move to top button for accessibility.
     * @group Props
     */
    topButtonAriaLabel;
    /**
     * Defines a string that labels the move to bottom button for accessibility.
     * @group Props
     */
    bottomButtonAriaLabel;
    /**
     * Text for the target list caption
     * @group Props
     */
    targetHeader;
    /**
     * When enabled orderlist adjusts its controls based on screen size.
     * @group Props
     */
    responsive;
    /**
     * When specified displays an input field to filter the items on keyup and decides which field to search (Accepts multiple fields with a comma).
     * @group Props
     */
    filterBy;
    /**
     * Locale to use in filtering. The default locale is the host environment's current locale.
     * @group Props
     */
    filterLocale;
    /**
     * Function to optimize the dom operations by delegating to ngForTrackBy, default algorithm checks for object identity. Use sourceTrackBy or targetTrackBy in case different algorithms are needed per list.
     * @group Props
     */
    trackBy = (index, item) => item;
    /**
     * Function to optimize the dom operations by delegating to ngForTrackBy in source list, default algorithm checks for object identity.
     * @group Props
     */
    sourceTrackBy;
    /**
     * Function to optimize the dom operations by delegating to ngForTrackBy in target list, default algorithm checks for object identity.
     * @group Props
     */
    targetTrackBy;
    /**
     * Whether to show filter input for source list when filterBy is enabled.
     * @group Props
     */
    showSourceFilter = true;
    /**
     * Whether to show filter input for target list when filterBy is enabled.
     * @group Props
     */
    showTargetFilter = true;
    /**
     * Defines how multiple items can be selected, when true metaKey needs to be pressed to select or unselect an item and when set to false selection of each item can be toggled individually. On touch enabled devices, metaKeySelection is turned off automatically.
     * @group Props
     */
    metaKeySelection = true;
    /**
     * Whether to enable dragdrop based reordering.
     * @group Props
     */
    dragdrop = false;
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
     * Inline style of the source list element.
     * @group Props
     */
    sourceStyle;
    /**
     * Inline style of the target list element.
     * @group Props
     */
    targetStyle;
    /**
     * Whether to show buttons of source list.
     * @group Props
     */
    showSourceControls = true;
    /**
     * Whether to show buttons of target list.
     * @group Props
     */
    showTargetControls = true;
    /**
     * Placeholder text on source filter input.
     * @group Props
     */
    sourceFilterPlaceholder;
    /**
     * Placeholder text on target filter input.
     * @group Props
     */
    targetFilterPlaceholder;
    /**
     * When present, it specifies that the component should be disabled.
     * @group Props
     */
    disabled = false;
    /**
     * Defines a string that labels the filter input of source list.
     * @group Props
     */
    ariaSourceFilterLabel;
    /**
     * Defines a string that labels the filter input of target list.
     * @group Props
     */
    ariaTargetFilterLabel;
    /**
     * Defines how the items are filtered.
     * @group Props
     */
    filterMatchMode = 'contains';
    /**
     * Whether to displays rows with alternating colors.
     * @group Props
     */
    stripedRows;
    /**
     * Keeps selection on the transfer list.
     * @group Props
     */
    keepSelection = false;
    /**
     * Indicates the width of the screen at which the component should change its behavior.
     * @group Props
     */
    get breakpoint() {
        return this._breakpoint;
    }
    set breakpoint(value) {
        if (value !== this._breakpoint) {
            this._breakpoint = value;
            if (isPlatformBrowser(this.platformId)) {
                this.destroyMedia();
                this.initMedia();
            }
        }
    }
    /**
     * Callback to invoke when items are moved from target to source.
     * @param {PickListMoveToSourceEvent} event - Custom move to source event.
     * @group Emits
     */
    onMoveToSource = new EventEmitter();
    /**
     * Callback to invoke when all items are moved from target to source.
     * @param {PickListMoveAllToSourceEvent} event - Custom move all to source event.
     * @group Emits
     */
    onMoveAllToSource = new EventEmitter();
    /**
     * Callback to invoke when all items are moved from source to target.
     * @param {PickListMoveAllToTargetEvent} event - Custom move all to target event.
     * @group Emits
     */
    onMoveAllToTarget = new EventEmitter();
    /**
     * Callback to invoke when items are moved from source to target.
     * @param {PickListMoveToTargetEvent} event - Custom move to target event.
     * @group Emits
     */
    onMoveToTarget = new EventEmitter();
    /**
     * Callback to invoke when items are reordered within source list.
     * @param {PickListSourceReorderEvent} event - Custom source reorder event.
     * @group Emits
     */
    onSourceReorder = new EventEmitter();
    /**
     * Callback to invoke when items are reordered within target list.
     * @param {PickListTargetReorderEvent} event - Custom target reorder event.
     * @group Emits
     */
    onTargetReorder = new EventEmitter();
    /**
     * Callback to invoke when items are selected within source list.
     * @param {PickListSourceSelectEvent} event - Custom source select event.
     * @group Emits
     */
    onSourceSelect = new EventEmitter();
    /**
     * Callback to invoke when items are selected within target list.
     * @param {PickListTargetSelectEvent} event - Custom target select event.
     * @group Emits
     */
    onTargetSelect = new EventEmitter();
    /**
     * Callback to invoke when the source list is filtered
     * @param {PickListSourceFilterEvent} event - Custom source filter event.
     * @group Emits
     */
    onSourceFilter = new EventEmitter();
    /**
     * Callback to invoke when the target list is filtered
     * @param {PickListTargetFilterEvent} event - Custom target filter event.
     * @group Emits
     */
    onTargetFilter = new EventEmitter();
    /**
     * Callback to invoke when the list is focused
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onFocus = new EventEmitter();
    /**
     * Callback to invoke when the list is blurred
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onBlur = new EventEmitter();
    listViewSourceChild;
    listViewTargetChild;
    sourceFilterViewChild;
    targetFilterViewChild;
    templates;
    get moveUpAriaLabel() {
        return this.upButtonAriaLabel ? this.upButtonAriaLabel : this.config.translation.aria ? this.config.translation.aria.moveUp : undefined;
    }
    get moveTopAriaLabel() {
        return this.topButtonAriaLabel ? this.topButtonAriaLabel : this.config.translation.aria ? this.config.translation.aria.moveTop : undefined;
    }
    get moveDownAriaLabel() {
        return this.downButtonAriaLabel ? this.downButtonAriaLabel : this.config.translation.aria ? this.config.translation.aria.moveDown : undefined;
    }
    get moveBottomAriaLabel() {
        return this.bottomButtonAriaLabel ? this.bottomButtonAriaLabel : this.config.translation.aria ? this.config.translation.aria.moveDown : undefined;
    }
    get moveToTargetAriaLabel() {
        return this.rightButtonAriaLabel ? this.rightButtonAriaLabel : this.config.translation.aria ? this.config.translation.aria.moveToTarget : undefined;
    }
    get moveAllToTargetAriaLabel() {
        return this.allRightButtonAriaLabel ? this.allRightButtonAriaLabel : this.config.translation.aria ? this.config.translation.aria.moveAllToTarget : undefined;
    }
    get moveToSourceAriaLabel() {
        return this.allLeftButtonAriaLabel ? this.allLeftButtonAriaLabel : this.config.translation.aria ? this.config.translation.aria.moveToSource : undefined;
    }
    get moveAllToSourceAriaLabel() {
        return this.allLeftButtonAriaLabel ? this.allLeftButtonAriaLabel : this.config.translation.aria ? this.config.translation.aria.moveAllToSource : undefined;
    }
    get idSource() {
        return this.id + '_source';
    }
    get idTarget() {
        return this.id + '_target';
    }
    get focusedOptionId() {
        return this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : null;
    }
    _breakpoint = '960px';
    itemTemplate;
    moveTopIconTemplate;
    moveUpIconTemplate;
    moveDownIconTemplate;
    moveBottomIconTemplate;
    moveToTargetIconTemplate;
    moveAllToTargetIconTemplate;
    moveToSourceIconTemplate;
    moveAllToSourceIconTemplate;
    targetFilterIconTemplate;
    sourceFilterIconTemplate;
    visibleOptionsSource;
    visibleOptionsTarget;
    selectedItemsSource = [];
    selectedItemsTarget = [];
    reorderedListElement;
    movedUp;
    movedDown;
    itemTouched;
    styleElement;
    id = UniqueComponentId();
    filterValueSource;
    filterValueTarget;
    fromListType;
    emptyMessageSourceTemplate;
    emptyFilterMessageSourceTemplate;
    emptyMessageTargetTemplate;
    emptyFilterMessageTargetTemplate;
    sourceHeaderTemplate;
    targetHeaderTemplate;
    sourceFilterTemplate;
    targetFilterTemplate;
    sourceFilterOptions;
    targetFilterOptions;
    SOURCE_LIST = -1;
    TARGET_LIST = 1;
    window;
    media;
    viewChanged;
    focusedOptionIndex = -1;
    focusedOption;
    focused = {
        sourceList: false,
        targetList: false
    };
    mediaChangeListener;
    constructor(document, platformId, renderer, el, cd, filterService, config) {
        this.document = document;
        this.platformId = platformId;
        this.renderer = renderer;
        this.el = el;
        this.cd = cd;
        this.filterService = filterService;
        this.config = config;
        this.window = this.document.defaultView;
    }
    ngOnInit() {
        if (this.responsive) {
            this.createStyle();
            this.initMedia();
        }
        if (this.filterBy) {
            this.sourceFilterOptions = {
                filter: (value) => this.filterSource(value),
                reset: () => this.resetSourceFilter()
            };
            this.targetFilterOptions = {
                filter: (value) => this.filterTarget(value),
                reset: () => this.resetTargetFilter()
            };
        }
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                    break;
                case 'sourceHeader':
                    this.sourceHeaderTemplate = item.template;
                    break;
                case 'targetHeader':
                    this.targetHeaderTemplate = item.template;
                    break;
                case 'sourceFilter':
                    this.sourceFilterTemplate = item.template;
                    break;
                case 'targetFilter':
                    this.targetFilterTemplate = item.template;
                    break;
                case 'emptymessagesource':
                    this.emptyMessageSourceTemplate = item.template;
                    break;
                case 'emptyfiltermessagesource':
                    this.emptyFilterMessageSourceTemplate = item.template;
                    break;
                case 'emptymessagetarget':
                    this.emptyMessageTargetTemplate = item.template;
                    break;
                case 'emptyfiltermessagetarget':
                    this.emptyFilterMessageTargetTemplate = item.template;
                    break;
                case 'moveupicon':
                    this.moveUpIconTemplate = item.template;
                    break;
                case 'movetopicon':
                    this.moveTopIconTemplate = item.template;
                    break;
                case 'movedownicon':
                    this.moveDownIconTemplate = item.template;
                    break;
                case 'movebottomicon':
                    this.moveBottomIconTemplate = item.template;
                    break;
                case 'movetotargeticon':
                    this.moveToTargetIconTemplate = item.template;
                    break;
                case 'movealltotargeticon':
                    this.moveAllToTargetIconTemplate = item.template;
                    break;
                case 'movetosourceicon':
                    this.moveToSourceIconTemplate = item.template;
                    break;
                case 'movealltosourceicon':
                    this.moveAllToSourceIconTemplate = item.template;
                    break;
                case 'targetfiltericon':
                    this.targetFilterIconTemplate = item.template;
                    break;
                case 'sourcefiltericon':
                    this.sourceFilterIconTemplate = item.template;
                    break;
                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }
    ngAfterViewChecked() {
        if (this.movedUp || this.movedDown) {
            let listItems = DomHandler.find(this.reorderedListElement, 'li.p-highlight');
            let listItem;
            if (this.movedUp)
                listItem = listItems[0];
            else
                listItem = listItems[listItems.length - 1];
            DomHandler.scrollInView(this.reorderedListElement, listItem);
            this.movedUp = false;
            this.movedDown = false;
            this.reorderedListElement = null;
        }
    }
    onItemClick(event, item, selectedItems, callback, itemId) {
        if (this.disabled) {
            return;
        }
        let index = this.findIndexInList(item, selectedItems);
        if (itemId)
            this.focusedOptionIndex = itemId;
        let selected = index != -1;
        let metaSelection = this.itemTouched ? false : this.metaKeySelection;
        if (metaSelection) {
            let metaKey = event.metaKey || event.ctrlKey || event.shiftKey;
            if (selected && metaKey) {
                selectedItems.splice(index, 1);
            }
            else {
                if (!metaKey) {
                    selectedItems.length = 0;
                }
                selectedItems.push(item);
            }
        }
        else {
            if (selected)
                selectedItems.splice(index, 1);
            else
                selectedItems.push(item);
        }
        callback.emit({ originalEvent: event, items: selectedItems });
        this.itemTouched = false;
    }
    onOptionMouseDown(index, listType) {
        this.focused[listType === this.SOURCE_LIST ? 'sourceList' : 'targetList'] = true;
        this.focusedOptionIndex = index;
    }
    onSourceItemDblClick() {
        if (this.disabled) {
            return;
        }
        this.moveRight();
    }
    onTargetItemDblClick() {
        if (this.disabled) {
            return;
        }
        this.moveLeft();
    }
    onFilter(event, listType) {
        let query = event.target.value;
        if (listType === this.SOURCE_LIST)
            this.filterSource(query);
        else if (listType === this.TARGET_LIST)
            this.filterTarget(query);
    }
    filterSource(value = '') {
        this.filterValueSource = value.trim().toLocaleLowerCase(this.filterLocale);
        this.filter(this.source, this.SOURCE_LIST);
    }
    filterTarget(value = '') {
        this.filterValueTarget = value.trim().toLocaleLowerCase(this.filterLocale);
        this.filter(this.target, this.TARGET_LIST);
    }
    filter(data, listType) {
        let searchFields = this.filterBy.split(',');
        if (listType === this.SOURCE_LIST) {
            this.visibleOptionsSource = this.filterService.filter(data, searchFields, this.filterValueSource, this.filterMatchMode, this.filterLocale);
            this.onSourceFilter.emit({ query: this.filterValueSource, value: this.visibleOptionsSource });
        }
        else if (listType === this.TARGET_LIST) {
            this.visibleOptionsTarget = this.filterService.filter(data, searchFields, this.filterValueTarget, this.filterMatchMode, this.filterLocale);
            this.onTargetFilter.emit({ query: this.filterValueTarget, value: this.visibleOptionsTarget });
        }
    }
    isItemVisible(item, listType) {
        if (listType == this.SOURCE_LIST)
            return this.isVisibleInList(this.visibleOptionsSource, item, this.filterValueSource);
        else
            return this.isVisibleInList(this.visibleOptionsTarget, item, this.filterValueTarget);
    }
    isEmpty(listType) {
        if (listType == this.SOURCE_LIST)
            return this.filterValueSource ? !this.visibleOptionsSource || this.visibleOptionsSource.length === 0 : !this.source || this.source.length === 0;
        else
            return this.filterValueTarget ? !this.visibleOptionsTarget || this.visibleOptionsTarget.length === 0 : !this.target || this.target.length === 0;
    }
    isVisibleInList(data, item, filterValue) {
        if (filterValue && filterValue.trim().length) {
            for (let i = 0; i < data.length; i++) {
                if (item == data[i]) {
                    return true;
                }
            }
        }
        else {
            return true;
        }
    }
    onItemTouchEnd() {
        if (this.disabled) {
            return;
        }
        this.itemTouched = true;
    }
    sortByIndexInList(items, list) {
        return items.sort((item1, item2) => ObjectUtils.findIndexInList(item1, list) - ObjectUtils.findIndexInList(item2, list));
    }
    moveUp(listElement, list, selectedItems, callback, listType) {
        if (selectedItems && selectedItems.length) {
            selectedItems = this.sortByIndexInList(selectedItems, list);
            for (let i = 0; i < selectedItems.length; i++) {
                let selectedItem = selectedItems[i];
                let selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, list);
                if (selectedItemIndex != 0) {
                    let movedItem = list[selectedItemIndex];
                    let temp = list[selectedItemIndex - 1];
                    list[selectedItemIndex - 1] = movedItem;
                    list[selectedItemIndex] = temp;
                }
                else {
                    break;
                }
            }
            if (this.dragdrop && ((this.filterValueSource && listType === this.SOURCE_LIST) || (this.filterValueTarget && listType === this.TARGET_LIST)))
                this.filter(list, listType);
            this.movedUp = true;
            this.reorderedListElement = listElement;
            callback.emit({ items: selectedItems });
        }
    }
    moveTop(listElement, list, selectedItems, callback, listType) {
        if (selectedItems && selectedItems.length) {
            selectedItems = this.sortByIndexInList(selectedItems, list);
            for (let i = 0; i < selectedItems.length; i++) {
                let selectedItem = selectedItems[i];
                let selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, list);
                if (selectedItemIndex != 0) {
                    let movedItem = list.splice(selectedItemIndex, 1)[0];
                    list.unshift(movedItem);
                }
                else {
                    break;
                }
            }
            if (this.dragdrop && ((this.filterValueSource && listType === this.SOURCE_LIST) || (this.filterValueTarget && listType === this.TARGET_LIST)))
                this.filter(list, listType);
            listElement.scrollTop = 0;
            callback.emit({ items: selectedItems });
        }
    }
    moveDown(listElement, list, selectedItems, callback, listType) {
        if (selectedItems && selectedItems.length) {
            selectedItems = this.sortByIndexInList(selectedItems, list);
            for (let i = selectedItems.length - 1; i >= 0; i--) {
                let selectedItem = selectedItems[i];
                let selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, list);
                if (selectedItemIndex != list.length - 1) {
                    let movedItem = list[selectedItemIndex];
                    let temp = list[selectedItemIndex + 1];
                    list[selectedItemIndex + 1] = movedItem;
                    list[selectedItemIndex] = temp;
                }
                else {
                    break;
                }
            }
            if (this.dragdrop && ((this.filterValueSource && listType === this.SOURCE_LIST) || (this.filterValueTarget && listType === this.TARGET_LIST)))
                this.filter(list, listType);
            this.movedDown = true;
            this.reorderedListElement = listElement;
            callback.emit({ items: selectedItems });
        }
    }
    moveBottom(listElement, list, selectedItems, callback, listType) {
        if (selectedItems && selectedItems.length) {
            selectedItems = this.sortByIndexInList(selectedItems, list);
            for (let i = selectedItems.length - 1; i >= 0; i--) {
                let selectedItem = selectedItems[i];
                let selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, list);
                if (selectedItemIndex != list.length - 1) {
                    let movedItem = list.splice(selectedItemIndex, 1)[0];
                    list.push(movedItem);
                }
                else {
                    break;
                }
            }
            if (this.dragdrop && ((this.filterValueSource && listType === this.SOURCE_LIST) || (this.filterValueTarget && listType === this.TARGET_LIST)))
                this.filter(list, listType);
            listElement.scrollTop = listElement.scrollHeight;
            callback.emit({ items: selectedItems });
        }
    }
    moveRight() {
        if (this.selectedItemsSource && this.selectedItemsSource.length) {
            for (let i = 0; i < this.selectedItemsSource.length; i++) {
                let selectedItem = this.selectedItemsSource[i];
                if (ObjectUtils.findIndexInList(selectedItem, this.target) == -1) {
                    this.target?.push(this.source?.splice(ObjectUtils.findIndexInList(selectedItem, this.source), 1)[0]);
                    if (this.visibleOptionsSource)
                        this.visibleOptionsSource.splice(ObjectUtils.findIndexInList(selectedItem, this.visibleOptionsSource), 1);
                }
            }
            this.onMoveToTarget.emit({
                items: this.selectedItemsSource
            });
            if (this.keepSelection) {
                this.selectedItemsTarget = [...this.selectedItemsTarget, ...this.selectedItemsSource];
            }
            this.selectedItemsSource = [];
            if (this.filterValueTarget) {
                this.filter(this.target, this.TARGET_LIST);
            }
        }
    }
    moveAllRight() {
        if (this.source) {
            let movedItems = [];
            for (let i = 0; i < this.source.length; i++) {
                if (this.isItemVisible(this.source[i], this.SOURCE_LIST)) {
                    let removedItem = this.source.splice(i, 1)[0];
                    this.target?.push(removedItem);
                    movedItems.push(removedItem);
                    i--;
                }
            }
            this.onMoveAllToTarget.emit({
                items: movedItems
            });
            if (this.keepSelection) {
                this.selectedItemsTarget = [...this.selectedItemsTarget, ...this.selectedItemsSource];
            }
            this.selectedItemsSource = [];
            if (this.filterValueTarget) {
                this.filter(this.target, this.TARGET_LIST);
            }
            this.visibleOptionsSource = [];
        }
    }
    moveLeft() {
        if (this.selectedItemsTarget && this.selectedItemsTarget.length) {
            for (let i = 0; i < this.selectedItemsTarget.length; i++) {
                let selectedItem = this.selectedItemsTarget[i];
                if (ObjectUtils.findIndexInList(selectedItem, this.source) == -1) {
                    this.source?.push(this.target?.splice(ObjectUtils.findIndexInList(selectedItem, this.target), 1)[0]);
                    if (this.visibleOptionsTarget)
                        this.visibleOptionsTarget.splice(ObjectUtils.findIndexInList(selectedItem, this.visibleOptionsTarget), 1)[0];
                }
            }
            this.onMoveToSource.emit({
                items: this.selectedItemsTarget
            });
            if (this.keepSelection) {
                this.selectedItemsSource = [...this.selectedItemsSource, ...this.selectedItemsTarget];
            }
            this.selectedItemsTarget = [];
            if (this.filterValueSource) {
                this.filter(this.source, this.SOURCE_LIST);
            }
        }
    }
    moveAllLeft() {
        if (this.target) {
            let movedItems = [];
            for (let i = 0; i < this.target.length; i++) {
                if (this.isItemVisible(this.target[i], this.TARGET_LIST)) {
                    let removedItem = this.target.splice(i, 1)[0];
                    this.source?.push(removedItem);
                    movedItems.push(removedItem);
                    i--;
                }
            }
            this.onMoveAllToSource.emit({
                items: movedItems
            });
            if (this.keepSelection) {
                this.selectedItemsSource = [...this.selectedItemsSource, ...this.selectedItemsTarget];
            }
            this.selectedItemsTarget = [];
            if (this.filterValueSource) {
                this.filter(this.source, this.SOURCE_LIST);
            }
            this.visibleOptionsTarget = [];
        }
    }
    isSelected(item, selectedItems) {
        return this.findIndexInList(item, selectedItems) != -1;
    }
    itemClass(item, id, selectedItems) {
        return {
            'p-picklist-item': true,
            'p-highlight': this.isSelected(item, selectedItems),
            'p-focus': id === this.focusedOptionId
        };
    }
    findIndexInList(item, selectedItems) {
        return ObjectUtils.findIndexInList(item, selectedItems);
    }
    onDrop(event, listType) {
        let isTransfer = event.previousContainer !== event.container;
        let dropIndexes = this.getDropIndexes(event.previousIndex, event.currentIndex, listType, isTransfer, event.item.data);
        if (listType === this.SOURCE_LIST) {
            if (isTransfer) {
                transferArrayItem(event.previousContainer.data, event.container.data, dropIndexes.previousIndex, dropIndexes.currentIndex);
                let selectedItemIndex = ObjectUtils.findIndexInList(event.item.data, this.selectedItemsTarget);
                if (selectedItemIndex != -1) {
                    this.selectedItemsTarget.splice(selectedItemIndex, 1);
                    if (this.keepSelection) {
                        this.selectedItemsTarget.push(event.item.data);
                    }
                }
                if (this.visibleOptionsTarget)
                    this.visibleOptionsTarget.splice(event.previousIndex, 1);
                this.onMoveToSource.emit({ items: [event.item.data] });
            }
            else {
                moveItemInArray(event.container.data, dropIndexes.previousIndex, dropIndexes.currentIndex);
                this.onSourceReorder.emit({ items: [event.item.data] });
            }
            if (this.filterValueSource) {
                this.filter(this.source, this.SOURCE_LIST);
            }
        }
        else {
            if (isTransfer) {
                transferArrayItem(event.previousContainer.data, event.container.data, dropIndexes.previousIndex, dropIndexes.currentIndex);
                let selectedItemIndex = ObjectUtils.findIndexInList(event.item.data, this.selectedItemsSource);
                if (selectedItemIndex != -1) {
                    this.selectedItemsSource.splice(selectedItemIndex, 1);
                    if (this.keepSelection) {
                        this.selectedItemsTarget.push(event.item.data);
                    }
                }
                if (this.visibleOptionsSource)
                    this.visibleOptionsSource.splice(event.previousIndex, 1);
                this.onMoveToTarget.emit({ items: [event.item.data] });
            }
            else {
                moveItemInArray(event.container.data, dropIndexes.previousIndex, dropIndexes.currentIndex);
                this.onTargetReorder.emit({ items: [event.item.data] });
            }
            if (this.filterValueTarget) {
                this.filter(this.target, this.TARGET_LIST);
            }
        }
    }
    onListFocus(event, listType) {
        let listElement = this.getListElement(listType);
        const selectedFirstItem = DomHandler.findSingle(listElement, 'li.p-picklist-item.p-highlight') || DomHandler.findSingle(listElement, 'li.p-picklist-item');
        const findIndex = ObjectUtils.findIndexInList(selectedFirstItem, listElement.children);
        this.focused[listType === this.SOURCE_LIST ? 'sourceList' : 'targetList'] = true;
        const index = this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : selectedFirstItem ? findIndex : -1;
        this.changeFocusedOptionIndex(index, listType);
        this.onFocus.emit(event);
    }
    onListBlur(event, listType) {
        this.focused[listType === this.SOURCE_LIST ? 'sourceList' : 'targetList'] = false;
        this.focusedOptionIndex = -1;
        this.focusedOption = null;
        this.onBlur.emit(event);
    }
    getListElement(listType) {
        return listType === this.SOURCE_LIST ? this.listViewSourceChild?.nativeElement : this.listViewTargetChild?.nativeElement;
    }
    getListItems(listType) {
        let listElemet = this.getListElement(listType);
        return DomHandler.find(listElemet, 'li.p-picklist-item');
    }
    getLatestSelectedVisibleOptionIndex(visibleList, selectedItems) {
        const latestSelectedItem = [...selectedItems].reverse().find((item) => visibleList.includes(item));
        return latestSelectedItem !== undefined ? visibleList.indexOf(latestSelectedItem) : -1;
    }
    getVisibleList(listType) {
        if (listType === this.SOURCE_LIST) {
            return this.visibleOptionsSource && this.visibleOptionsSource.length > 0 ? this.visibleOptionsSource : this.source && this.source.length > 0 ? this.source : null;
        }
        return this.visibleOptionsTarget && this.visibleOptionsTarget.length > 0 ? this.visibleOptionsTarget : this.target && this.target.length > 0 ? this.target : null;
    }
    setSelectionList(listType, selectedItems) {
        if (listType === this.SOURCE_LIST) {
            this.selectedItemsSource = selectedItems;
        }
        else {
            this.selectedItemsTarget = selectedItems;
        }
    }
    findNextOptionIndex(index, listType) {
        const items = this.getListItems(listType);
        const matchedOptionIndex = [...items].findIndex((link) => link.id === index);
        return matchedOptionIndex > -1 ? matchedOptionIndex + 1 : 0;
    }
    findPrevOptionIndex(index, listType) {
        const items = this.getListItems(listType);
        const matchedOptionIndex = [...items].findIndex((link) => link.id === index);
        return matchedOptionIndex > -1 ? matchedOptionIndex - 1 : 0;
    }
    onItemKeyDown(event, selectedItems, callback, listType) {
        switch (event.code) {
            case 'ArrowDown':
                this.onArrowDownKey(event, selectedItems, callback, listType);
                break;
            case 'ArrowUp':
                this.onArrowUpKey(event, selectedItems, callback, listType);
                break;
            case 'Home':
                this.onHomeKey(event, selectedItems, callback, listType);
                break;
            case 'End':
                this.onEndKey(event, selectedItems, callback, listType);
                break;
            case 'Enter':
                this.onEnterKey(event, selectedItems, callback);
                break;
            case 'Space':
                this.onSpaceKey(event, selectedItems, callback, listType);
                break;
            case 'KeyA':
                if (event.ctrlKey) {
                    this.setSelectionList(listType, this.getVisibleList(listType));
                    callback.emit({ items: selectedItems });
                    event.preventDefault();
                }
            default:
                break;
        }
    }
    getFocusedOption(index, listType) {
        if (index === -1)
            return null;
        if (listType === this.SOURCE_LIST) {
            return this.visibleOptionsSource && this.visibleOptionsSource.length ? this.visibleOptionsSource[index] : this.source && this.source.length ? this.source[index] : null;
        }
        return this.visibleOptionsTarget && this.visibleOptionsTarget.length ? this.visibleOptionsTarget[index] : this.target && this.target.length ? this.target[index] : null;
    }
    changeFocusedOptionIndex(index, listType) {
        const items = this.getListItems(listType);
        let order = index >= items.length ? items.length - 1 : index < 0 ? 0 : index;
        this.focusedOptionIndex = items[order].getAttribute('id');
        this.focusedOption = this.getFocusedOption(order, listType);
        this.scrollInView(items[order].getAttribute('id'), listType);
    }
    scrollInView(id, listType) {
        const element = DomHandler.findSingle(this.getListElement(listType), `li[id="${id}"]`);
        if (element) {
            element.scrollIntoView && element.scrollIntoView({ block: 'nearest', inline: 'start' });
        }
    }
    onArrowDownKey(event, selectedItems, callback, listType) {
        const optionIndex = this.findNextOptionIndex(this.focusedOptionIndex, listType);
        this.changeFocusedOptionIndex(optionIndex, listType);
        if (event.shiftKey) {
            this.onEnterKey(event, selectedItems, callback);
        }
        event.preventDefault();
    }
    onArrowUpKey(event, selectedItems, callback, listType) {
        const optionIndex = this.findPrevOptionIndex(this.focusedOptionIndex, listType);
        this.changeFocusedOptionIndex(optionIndex, listType);
        if (event.shiftKey) {
            this.onEnterKey(event, selectedItems, callback);
        }
        event.preventDefault();
    }
    onEnterKey(event, selectedItems, callback) {
        this.onItemClick(event, this.focusedOption, selectedItems, callback);
        event.preventDefault();
    }
    onSpaceKey(event, selectedItems, callback, listType) {
        event.preventDefault();
        if (event.shiftKey && selectedItems && selectedItems.length > 0) {
            let visibleList = this.getVisibleList(listType);
            let lastSelectedIndex = this.getLatestSelectedVisibleOptionIndex(visibleList, selectedItems);
            if (lastSelectedIndex !== -1) {
                let focusedIndex = ObjectUtils.findIndexInList(this.focusedOption, visibleList);
                selectedItems = [...visibleList.slice(Math.min(lastSelectedIndex, focusedIndex), Math.max(lastSelectedIndex, focusedIndex) + 1)];
                this.setSelectionList(listType, selectedItems);
                callback.emit({ items: selectedItems });
                return;
            }
        }
        this.onEnterKey(event, selectedItems, callback);
    }
    onHomeKey(event, selectedItems, callback, listType) {
        if (event.ctrlKey && event.shiftKey) {
            let visibleList = this.getVisibleList(listType);
            let focusedIndex = ObjectUtils.findIndexInList(this.focusedOption, visibleList);
            selectedItems = [...visibleList.slice(0, focusedIndex + 1)];
            this.setSelectionList(listType, selectedItems);
            callback.emit({ items: selectedItems });
        }
        else {
            this.changeFocusedOptionIndex(0, listType);
        }
        event.preventDefault();
    }
    onEndKey(event, selectedItems, callback, listType) {
        let visibleList = this.getVisibleList(listType);
        let lastIndex = visibleList && visibleList.length > 0 ? visibleList.length - 1 : null;
        if (lastIndex === null)
            return;
        if (event.ctrlKey && event.shiftKey) {
            let focusedIndex = ObjectUtils.findIndexInList(this.focusedOption, visibleList);
            selectedItems = [...visibleList.slice(focusedIndex, lastIndex)];
            this.setSelectionList(listType, selectedItems);
            callback.emit({ items: selectedItems });
        }
        else {
            this.changeFocusedOptionIndex(lastIndex, listType);
        }
        event.preventDefault();
    }
    getDropIndexes(fromIndex, toIndex, droppedList, isTransfer, data) {
        let previousIndex, currentIndex;
        if (droppedList === this.SOURCE_LIST) {
            previousIndex = isTransfer ? (this.filterValueTarget ? ObjectUtils.findIndexInList(data, this.target) : fromIndex) : this.filterValueSource ? ObjectUtils.findIndexInList(data, this.source) : fromIndex;
            currentIndex = this.filterValueSource ? this.findFilteredCurrentIndex(this.visibleOptionsSource, toIndex, this.source) : toIndex;
        }
        else {
            previousIndex = isTransfer ? (this.filterValueSource ? ObjectUtils.findIndexInList(data, this.source) : fromIndex) : this.filterValueTarget ? ObjectUtils.findIndexInList(data, this.target) : fromIndex;
            currentIndex = this.filterValueTarget ? this.findFilteredCurrentIndex(this.visibleOptionsTarget, toIndex, this.target) : toIndex;
        }
        return { previousIndex, currentIndex };
    }
    findFilteredCurrentIndex(visibleOptions, index, options) {
        if (visibleOptions.length === index) {
            let toIndex = ObjectUtils.findIndexInList(visibleOptions[index - 1], options);
            return toIndex + 1;
        }
        else {
            return ObjectUtils.findIndexInList(visibleOptions[index], options);
        }
    }
    resetSourceFilter() {
        this.visibleOptionsSource = null;
        this.filterValueSource = null;
        this.sourceFilterViewChild && (this.sourceFilterViewChild.nativeElement.value = '');
    }
    resetTargetFilter() {
        this.visibleOptionsTarget = null;
        this.filterValueTarget = null;
        this.targetFilterViewChild && (this.targetFilterViewChild.nativeElement.value = '');
    }
    resetFilter() {
        this.resetSourceFilter();
        this.resetTargetFilter();
    }
    onItemKeydown(event, item, selectedItems, callback) {
        let listItem = event.currentTarget;
        switch (event.which) {
            //down
            case 40:
                var nextItem = this.findNextItem(listItem);
                if (nextItem) {
                    nextItem.focus();
                }
                event.preventDefault();
                break;
            //up
            case 38:
                var prevItem = this.findPrevItem(listItem);
                if (prevItem) {
                    prevItem.focus();
                }
                event.preventDefault();
                break;
            //enter
            case 13:
                this.onItemClick(event, item, selectedItems, callback);
                event.preventDefault();
                break;
        }
    }
    findNextItem(item) {
        let nextItem = item.nextElementSibling;
        if (nextItem)
            return !DomHandler.hasClass(nextItem, 'p-picklist-item') || DomHandler.isHidden(nextItem) ? this.findNextItem(nextItem) : nextItem;
        else
            return null;
    }
    findPrevItem(item) {
        let prevItem = item.previousElementSibling;
        if (prevItem)
            return !DomHandler.hasClass(prevItem, 'p-picklist-item') || DomHandler.isHidden(prevItem) ? this.findPrevItem(prevItem) : prevItem;
        else
            return null;
    }
    initMedia() {
        if (isPlatformBrowser(this.platformId)) {
            this.media = this.window.matchMedia(`(max-width: ${this.breakpoint})`);
            this.viewChanged = this.media.matches;
            this.bindMediaChangeListener();
        }
    }
    destroyMedia() {
        this.unbindMediaChangeListener();
    }
    bindMediaChangeListener() {
        if (this.media && !this.mediaChangeListener) {
            this.mediaChangeListener = this.renderer.listen(this.media, 'change', (event) => {
                this.viewChanged = event.matches;
                this.cd.markForCheck();
            });
        }
    }
    unbindMediaChangeListener() {
        if (this.mediaChangeListener) {
            this.mediaChangeListener();
            this.mediaChangeListener = null;
        }
    }
    createStyle() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.styleElement) {
                this.renderer.setAttribute(this.el.nativeElement.children[0], this.id, '');
                this.styleElement = this.renderer.createElement('style');
                this.renderer.setAttribute(this.styleElement, 'type', 'text/css');
                this.renderer.appendChild(this.document.head, this.styleElement);
                let innerHTML = `
                @media screen and (max-width: ${this.breakpoint}) {
                    .p-picklist[${this.id}] {
                        flex-direction: column;
                    }

                    .p-picklist[${this.id}] .p-picklist-buttons {
                        padding: var(--content-padding);
                        flex-direction: row;
                    }

                    .p-picklist[${this.id}] .p-picklist-buttons .p-button {
                        margin-right: var(--inline-spacing);
                        margin-bottom: 0;
                    }

                    .p-picklist[${this.id}] .p-picklist-buttons .p-button:last-child {
                        margin-right: 0;
                    }
                }`;
                this.renderer.setProperty(this.styleElement, 'innerHTML', innerHTML);
            }
        }
    }
    sourceMoveDisabled() {
        if (this.disabled || !this.selectedItemsSource.length) {
            return true;
        }
    }
    targetMoveDisabled() {
        if (this.disabled || !this.selectedItemsTarget.length) {
            return true;
        }
    }
    moveRightDisabled() {
        return this.disabled || ObjectUtils.isEmpty(this.selectedItemsSource);
    }
    moveLeftDisabled() {
        return this.disabled || ObjectUtils.isEmpty(this.selectedItemsTarget);
    }
    moveAllRightDisabled() {
        return this.disabled || ObjectUtils.isEmpty(this.source);
    }
    moveAllLeftDisabled() {
        return this.disabled || ObjectUtils.isEmpty(this.target);
    }
    destroyStyle() {
        if (this.styleElement) {
            this.renderer.removeChild(this.document.head, this.styleElement);
            this.styleElement = null;
            ``;
        }
    }
    ngOnDestroy() {
        this.destroyStyle();
        this.destroyMedia();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: PickList, deps: [{ token: DOCUMENT }, { token: PLATFORM_ID }, { token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i1.FilterService }, { token: i1.PrimeNGConfig }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: PickList, selector: "p-pickList", inputs: { source: "source", target: "target", sourceHeader: "sourceHeader", tabindex: "tabindex", rightButtonAriaLabel: "rightButtonAriaLabel", leftButtonAriaLabel: "leftButtonAriaLabel", allRightButtonAriaLabel: "allRightButtonAriaLabel", allLeftButtonAriaLabel: "allLeftButtonAriaLabel", upButtonAriaLabel: "upButtonAriaLabel", downButtonAriaLabel: "downButtonAriaLabel", topButtonAriaLabel: "topButtonAriaLabel", bottomButtonAriaLabel: "bottomButtonAriaLabel", targetHeader: "targetHeader", responsive: "responsive", filterBy: "filterBy", filterLocale: "filterLocale", trackBy: "trackBy", sourceTrackBy: "sourceTrackBy", targetTrackBy: "targetTrackBy", showSourceFilter: "showSourceFilter", showTargetFilter: "showTargetFilter", metaKeySelection: "metaKeySelection", dragdrop: "dragdrop", style: "style", styleClass: "styleClass", sourceStyle: "sourceStyle", targetStyle: "targetStyle", showSourceControls: "showSourceControls", showTargetControls: "showTargetControls", sourceFilterPlaceholder: "sourceFilterPlaceholder", targetFilterPlaceholder: "targetFilterPlaceholder", disabled: "disabled", ariaSourceFilterLabel: "ariaSourceFilterLabel", ariaTargetFilterLabel: "ariaTargetFilterLabel", filterMatchMode: "filterMatchMode", stripedRows: "stripedRows", keepSelection: "keepSelection", breakpoint: "breakpoint" }, outputs: { onMoveToSource: "onMoveToSource", onMoveAllToSource: "onMoveAllToSource", onMoveAllToTarget: "onMoveAllToTarget", onMoveToTarget: "onMoveToTarget", onSourceReorder: "onSourceReorder", onTargetReorder: "onTargetReorder", onSourceSelect: "onSourceSelect", onTargetSelect: "onTargetSelect", onSourceFilter: "onSourceFilter", onTargetFilter: "onTargetFilter", onFocus: "onFocus", onBlur: "onBlur" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "listViewSourceChild", first: true, predicate: ["sourcelist"], descendants: true }, { propertyName: "listViewTargetChild", first: true, predicate: ["targetlist"], descendants: true }, { propertyName: "sourceFilterViewChild", first: true, predicate: ["sourceFilter"], descendants: true }, { propertyName: "targetFilterViewChild", first: true, predicate: ["targetFilter"], descendants: true }], ngImport: i0, template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="{ 'p-picklist p-component': true, 'p-picklist-striped': stripedRows }" cdkDropListGroup [attr.data-pc-name]="'picklist'" [attr.data-pc-section]="'root'">
            <div class="p-picklist-buttons p-picklist-source-controls" *ngIf="showSourceControls" [attr.data-pc-section]="'sourceControls'" [attr.data-pc-group-section]="'controls'">
                <button
                    type="button"
                    [attr.aria-label]="moveUpAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="sourceMoveDisabled()"
                    (click)="moveUp(sourcelist, source, selectedItemsSource, onSourceReorder, SOURCE_LIST)"
                    [attr.data-pc-section]="'sourceMoveUpButton'"
                >
                    <AngleUpIcon *ngIf="!moveUpIconTemplate" [attr.data-pc-section]="'moveupicon'" />
                    <ng-template *ngTemplateOutlet="moveUpIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveTopAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="sourceMoveDisabled()"
                    (click)="moveTop(sourcelist, source, selectedItemsSource, onSourceReorder, SOURCE_LIST)"
                    [attr.data-pc-section]="'sourceMoveTopButton'"
                >
                    <AngleDoubleUpIcon *ngIf="!moveTopIconTemplate" [attr.data-pc-section]="'movetopicon'" />
                    <ng-template *ngTemplateOutlet="moveTopIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveDownAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="sourceMoveDisabled()"
                    (click)="moveDown(sourcelist, source, selectedItemsSource, onSourceReorder, SOURCE_LIST)"
                    [attr.data-pc-section]="'sourceMoveDownButton'"
                >
                    <AngleDownIcon *ngIf="!moveDownIconTemplate" [attr.data-pc-section]="'movedownicon'" />
                    <ng-template *ngTemplateOutlet="moveDownIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveBottomAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="sourceMoveDisabled()"
                    (click)="moveBottom(sourcelist, source, selectedItemsSource, onSourceReorder, SOURCE_LIST)"
                    [attr.data-pc-section]="'sourceMoveBottomButton'"
                >
                    <AngleDoubleDownIcon *ngIf="!moveBottomIconTemplate" [attr.data-pc-section]="'movebottomicon'" />
                    <ng-template *ngTemplateOutlet="moveBottomIconTemplate"></ng-template>
                </button>
            </div>
            <div class="p-picklist-list-wrapper p-picklist-source-wrapper" [attr.data-pc-section]="'sourceWrapper'" [attr.data-pc-group-section]="'listWrapper'">
                <div class="p-picklist-header" *ngIf="sourceHeader || sourceHeaderTemplate" [attr.data-pc-section]="'sourceHeader'" [attr.data-pc-group-section]="'header'">
                    <div class="p-picklist-title" *ngIf="!sourceHeaderTemplate">{{ sourceHeader }}</div>
                    <ng-container *ngTemplateOutlet="sourceHeaderTemplate"></ng-container>
                </div>
                <div class="p-picklist-filter-container" *ngIf="filterBy && showSourceFilter !== false" [attr.data-pc-section]="'sourceFilterContainer'">
                    <ng-container *ngIf="sourceFilterTemplate; else builtInSourceElement">
                        <ng-container *ngTemplateOutlet="sourceFilterTemplate; context: { options: sourceFilterOptions }"></ng-container>
                    </ng-container>
                    <ng-template #builtInSourceElement>
                        <div class="p-picklist-filter" [attr.data-pc-section]="'sourceFilter'">
                            <input
                                #sourceFilter
                                type="text"
                                role="textbox"
                                (keyup)="onFilter($event, SOURCE_LIST)"
                                class="p-picklist-filter-input p-inputtext p-component"
                                [disabled]="disabled"
                                [attr.placeholder]="sourceFilterPlaceholder"
                                [attr.aria-label]="ariaSourceFilterLabel"
                                [attr.data-pc-section]="'sourceFilterInput'"
                            />
                            <SearchIcon *ngIf="!sourceFilterIconTemplate" [styleClass]="'p-picklist-filter-icon'" [attr.data-pc-section]="'sourcefilterIcon'" />
                            <span class="p-picklist-filter-icon" *ngIf="sourceFilterIconTemplate" [attr.data-pc-section]="'sourcefilterIcon'">
                                <ng-template *ngTemplateOutlet="sourceFilterIconTemplate"></ng-template>
                            </span>
                        </div>
                    </ng-template>
                </div>

                <ul
                    #sourcelist
                    class="p-picklist-list p-picklist-source"
                    [id]="idSource + '_list'"
                    (keydown)="onItemKeyDown($event, selectedItemsSource, onSourceSelect, SOURCE_LIST)"
                    (focus)="onListFocus($event, SOURCE_LIST)"
                    (blur)="onListBlur($event, SOURCE_LIST)"
                    cdkDropList
                    [cdkDropListData]="source"
                    (cdkDropListDropped)="onDrop($event, SOURCE_LIST)"
                    [ngStyle]="sourceStyle"
                    role="listbox"
                    aria-multiselectable="true"
                    [attr.aria-activedescendant]="focused['sourceList'] ? focusedOptionId : undefined"
                    [attr.tabindex]="source && source.length > 0 ? tabindex : -1"
                    [attr.data-pc-section]="'sourceList'"
                    [attr.data-pc-group-section]="'list'"
                >
                    <ng-template ngFor let-item [ngForOf]="source" [ngForTrackBy]="sourceTrackBy || trackBy" let-i="index" let-l="last">
                        <li
                            [ngClass]="{ 'p-picklist-item': true, 'p-highlight': isSelected(item, selectedItemsSource), 'p-disabled': disabled }"
                            pRipple
                            cdkDrag
                            [id]="idSource + '_' + i"
                            [ngClass]="itemClass(item, idSource + '_' + i, selectedItemsSource)"
                            [cdkDragData]="item"
                            [cdkDragDisabled]="!dragdrop"
                            (click)="onItemClick($event, item, selectedItemsSource, onSourceSelect, idSource + '_' + i)"
                            (mousedown)="onOptionMouseDown(i, SOURCE_LIST)"
                            (dblclick)="onSourceItemDblClick()"
                            (touchend)="onItemTouchEnd()"
                            *ngIf="isItemVisible(item, SOURCE_LIST)"
                            role="option"
                            [attr.data-pc-section]="'item'"
                            [attr.aria-selected]="isSelected(item, selectedItemsSource)"
                        >
                            <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item, index: i }"></ng-container>
                        </li>
                    </ng-template>
                    <ng-container *ngIf="isEmpty(SOURCE_LIST) && (emptyMessageSourceTemplate || emptyFilterMessageSourceTemplate)">
                        <li class="p-picklist-empty-message" *ngIf="!filterValueSource || !emptyFilterMessageSourceTemplate" [attr.data-pc-section]="'sourceEmptyMessage'">
                            <ng-container *ngTemplateOutlet="emptyMessageSourceTemplate"></ng-container>
                        </li>
                        <li class="p-picklist-empty-message" *ngIf="filterValueSource" [attr.data-pc-section]="'sourceEmptyMessage'">
                            <ng-container *ngTemplateOutlet="emptyFilterMessageSourceTemplate"></ng-container>
                        </li>
                    </ng-container>
                </ul>
            </div>
            <div class="p-picklist-buttons p-picklist-transfer-buttons" [attr.data-pc-section]="'buttons'" [attr.data-pc-group-section]="'controls'">
                <button type="button" [attr.aria-label]="moveToTargetAriaLabel" pButton pRipple class="p-button-icon-only" [disabled]="moveRightDisabled()" (click)="moveRight()" [attr.data-pc-section]="'moveToTargetButton'">
                    <ng-container *ngIf="!moveToTargetIconTemplate">
                        <AngleRightIcon *ngIf="!viewChanged" [attr.data-pc-section]="'movetotargeticon'" />
                        <AngleDownIcon *ngIf="viewChanged" [attr.data-pc-section]="'movetotargeticon'" />
                    </ng-container>
                    <ng-template *ngTemplateOutlet="moveToTargetIconTemplate; context: { $implicit: viewChanged }"></ng-template>
                </button>
                <button type="button" [attr.aria-label]="moveAllToTargetAriaLabel" pButton pRipple class="p-button-icon-only" [disabled]="moveAllRightDisabled()" (click)="moveAllRight()" [attr.data-pc-section]="'moveAllToTargetButton'">
                    <ng-container *ngIf="!moveAllToTargetIconTemplate">
                        <AngleDoubleRightIcon *ngIf="!viewChanged" [attr.data-pc-section]="'movealltotargeticon'" />
                        <AngleDoubleDownIcon *ngIf="viewChanged" [attr.data-pc-section]="'movealltotargeticon'" />
                    </ng-container>
                    <ng-template *ngTemplateOutlet="moveAllToTargetIconTemplate; context: { $implicit: viewChanged }"></ng-template>
                </button>
                <button type="button" [attr.aria-label]="moveToSourceAriaLabel" pButton pRipple class="p-button-icon-only" [disabled]="moveLeftDisabled()" (click)="moveLeft()" [attr.data-pc-section]="'moveToSourceButton'">
                    <ng-container *ngIf="!moveToSourceIconTemplate">
                        <AngleLeftIcon *ngIf="!viewChanged" [attr.data-pc-section]="'movedownsourceticon'" />
                        <AngleUpIcon *ngIf="viewChanged" [attr.data-pc-section]="'movedownsourceticon'" />
                    </ng-container>
                    <ng-template *ngTemplateOutlet="moveToSourceIconTemplate; context: { $implicit: viewChanged }"></ng-template>
                </button>
                <button type="button" [attr.aria-label]="moveAllToSourceAriaLabel" pButton pRipple class="p-button-icon-only" [disabled]="moveAllLeftDisabled()" (click)="moveAllLeft()" [attr.data-pc-section]="'moveAllToSourceButton'">
                    <ng-container *ngIf="!moveAllToSourceIconTemplate">
                        <AngleDoubleLeftIcon *ngIf="!viewChanged" [attr.data-pc-section]="'movealltosourceticon'" />
                        <AngleDoubleUpIcon *ngIf="viewChanged" [attr.data-pc-section]="'movealltosourceticon'" />
                    </ng-container>
                    <ng-template *ngTemplateOutlet="moveAllToSourceIconTemplate; context: { $implicit: viewChanged }"></ng-template>
                </button>
            </div>
            <div class="p-picklist-list-wrapper p-picklist-target-wrapper" [attr.data-pc-section]="'targetWrapper'" [attr.data-pc-group-section]="'listwrapper'">
                <div class="p-picklist-header" *ngIf="targetHeader || targetHeaderTemplate" [attr.data-pc-section]="'targetHead'" [attr.data-pc-group-section]="'header'">
                    <div class="p-picklist-title" *ngIf="!targetHeaderTemplate">{{ targetHeader }}</div>
                    <ng-container *ngTemplateOutlet="targetHeaderTemplate"></ng-container>
                </div>
                <div class="p-picklist-filter-container" *ngIf="filterBy && showTargetFilter !== false" [attr.data-pc-section]="'targetFilterContainer'">
                    <ng-container *ngIf="targetFilterTemplate; else builtInTargetElement">
                        <ng-container *ngTemplateOutlet="targetFilterTemplate; context: { options: targetFilterOptions }"></ng-container>
                    </ng-container>
                    <ng-template #builtInTargetElement>
                        <div class="p-picklist-filter" [attr.data-pc-section]="'targetFilter'">
                            <input
                                #targetFilter
                                type="text"
                                role="textbox"
                                (keyup)="onFilter($event, TARGET_LIST)"
                                class="p-picklist-filter-input p-inputtext p-component"
                                [disabled]="disabled"
                                [attr.placeholder]="targetFilterPlaceholder"
                                [attr.aria-label]="ariaTargetFilterLabel"
                                [attr.data-pc-section]="'targetFilterInput'"
                            />
                            <SearchIcon *ngIf="!targetFilterIconTemplate" [styleClass]="'p-picklist-filter-icon'" [attr.data-pc-section]="'targetfiltericon'" />
                            <span class="p-picklist-filter-icon" *ngIf="targetFilterIconTemplate" [attr.data-pc-section]="'targetfiltericon'">
                                <ng-template *ngTemplateOutlet="targetFilterIconTemplate"></ng-template>
                            </span>
                        </div>
                    </ng-template>
                </div>
                <ul
                    #targetlist
                    class="p-picklist-list p-picklist-target"
                    [id]="idTarget + '_list'"
                    (keydown)="onItemKeyDown($event, selectedItemsTarget, onTargetSelect, TARGET_LIST)"
                    (focus)="onListFocus($event, TARGET_LIST)"
                    (blur)="onListBlur($event, TARGET_LIST)"
                    cdkDropList
                    [cdkDropListData]="target"
                    (cdkDropListDropped)="onDrop($event, TARGET_LIST)"
                    [ngStyle]="targetStyle"
                    role="listbox"
                    aria-multiselectable="true"
                    [attr.aria-activedescendant]="focused['targetList'] ? focusedOptionId : undefined"
                    [attr.tabindex]="target && target.length > 0 ? tabindex : -1"
                    [attr.data-pc-section]="'targetList'"
                    [attr.data-pc-group-section]="'list'"
                >
                    <ng-template ngFor let-item [ngForOf]="target" [ngForTrackBy]="targetTrackBy || trackBy" let-i="index" let-l="last">
                        <li
                            [ngClass]="{ 'p-picklist-item': true, 'p-highlight': isSelected(item, selectedItemsTarget), 'p-disabled': disabled }"
                            pRipple
                            cdkDrag
                            [id]="idTarget + '_' + i"
                            [ngClass]="itemClass(item, idTarget + '_' + i, selectedItemsTarget)"
                            [cdkDragData]="item"
                            [cdkDragDisabled]="!dragdrop"
                            (click)="onItemClick($event, item, selectedItemsTarget, onTargetSelect, idTarget + '_' + i)"
                            (mousedown)="onOptionMouseDown(i, TARGET_LIST)"
                            (dblclick)="onTargetItemDblClick()"
                            (touchend)="onItemTouchEnd()"
                            *ngIf="isItemVisible(item, TARGET_LIST)"
                            role="option"
                            [attr.data-pc-section]="'item'"
                            [attr.aria-selected]="isSelected(item, selectedItemsTarget)"
                        >
                            <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item, index: i }"></ng-container>
                        </li>
                    </ng-template>
                    <ng-container *ngIf="isEmpty(TARGET_LIST) && (emptyMessageTargetTemplate || emptyFilterMessageTargetTemplate)">
                        <li class="p-picklist-empty-message" *ngIf="!filterValueTarget || !emptyFilterMessageTargetTemplate" [attr.data-pc-section]="'targetEmptyMessage'">
                            <ng-container *ngTemplateOutlet="emptyMessageTargetTemplate"></ng-container>
                        </li>
                        <li class="p-picklist-empty-message" *ngIf="filterValueTarget" [attr.data-pc-section]="'targetEmptyMessage'">
                            <ng-container *ngTemplateOutlet="emptyFilterMessageTargetTemplate"></ng-container>
                        </li>
                    </ng-container>
                </ul>
            </div>
            <div class="p-picklist-buttons p-picklist-target-controls" *ngIf="showTargetControls" [attr.data-pc-section]="'targetControls'" [attr.data-pc-group-section]="'controls'">
                <button
                    type="button"
                    [attr.aria-label]="moveUpAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="targetMoveDisabled()"
                    (click)="moveUp(targetlist, target, selectedItemsTarget, onTargetReorder, TARGET_LIST)"
                    [attr.data-pc-section]="'targetMoveUpButton'"
                >
                    <AngleUpIcon *ngIf="!moveUpIconTemplate" [attr.data-pc-section]="'moveupicon'" />
                    <ng-template *ngTemplateOutlet="moveUpIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveTopAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="targetMoveDisabled()"
                    (click)="moveTop(targetlist, target, selectedItemsTarget, onTargetReorder, TARGET_LIST)"
                    [attr.data-pc-section]="'targetMoveTopButton'"
                >
                    <AngleDoubleUpIcon *ngIf="!moveTopIconTemplate" [attr.data-pc-section]="'movetopicon'" />
                    <ng-template *ngTemplateOutlet="moveTopIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveDownAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="targetMoveDisabled()"
                    (click)="moveDown(targetlist, target, selectedItemsTarget, onTargetReorder, TARGET_LIST)"
                    [attr.data-pc-section]="'targetMoveDownButton'"
                >
                    <AngleDownIcon *ngIf="!moveDownIconTemplate" [attr.data-pc-section]="'movedownicon'" />
                    <ng-template *ngTemplateOutlet="moveDownIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveBottomAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="targetMoveDisabled()"
                    (click)="moveBottom(targetlist, target, selectedItemsTarget, onTargetReorder, TARGET_LIST)"
                    [attr.data-pc-section]="'targetMoveBottomButton'"
                >
                    <AngleDoubleDownIcon *ngIf="!moveBottomIconTemplate" [attr.data-pc-section]="'movebottomicon'" />
                    <ng-template *ngTemplateOutlet="moveBottomIconTemplate"></ng-template>
                </button>
            </div>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-picklist{display:flex}.p-picklist-buttons{display:flex;flex-direction:column;justify-content:center}.p-picklist-list-wrapper{flex:1 1 50%}.p-picklist-list{list-style-type:none;margin:0;padding:0;overflow:auto;min-height:12rem}.p-picklist-item{display:block;cursor:pointer;overflow:hidden;position:relative}.p-picklist-item:not(.cdk-drag-disabled){cursor:move}.p-picklist-item.cdk-drag-placeholder{opacity:0}.p-picklist-item.cdk-drag-animating{transition:transform .25s cubic-bezier(0,0,.2,1)}.p-picklist-filter{position:relative}.p-picklist-filter-icon{position:absolute;top:50%;margin-top:-.5rem}.p-picklist-filter-input{width:100%}.p-picklist-list.cdk-drop-list-dragging .p-picklist-item:not(.cdk-drag-placeholder){transition:transform .25s cubic-bezier(0,0,.2,1)}}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(() => i2.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgForOf), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(() => i3.ButtonDirective), selector: "[pButton]", inputs: ["iconPos", "loadingIcon", "label", "icon", "loading"] }, { kind: "directive", type: i0.forwardRef(() => i4.Ripple), selector: "[pRipple]" }, { kind: "directive", type: i0.forwardRef(() => i5.CdkDropList), selector: "[cdkDropList], cdk-drop-list", inputs: ["cdkDropListConnectedTo", "cdkDropListData", "cdkDropListOrientation", "id", "cdkDropListLockAxis", "cdkDropListDisabled", "cdkDropListSortingDisabled", "cdkDropListEnterPredicate", "cdkDropListSortPredicate", "cdkDropListAutoScrollDisabled", "cdkDropListAutoScrollStep"], outputs: ["cdkDropListDropped", "cdkDropListEntered", "cdkDropListExited", "cdkDropListSorted"], exportAs: ["cdkDropList"] }, { kind: "directive", type: i0.forwardRef(() => i5.CdkDropListGroup), selector: "[cdkDropListGroup]", inputs: ["cdkDropListGroupDisabled"], exportAs: ["cdkDropListGroup"] }, { kind: "directive", type: i0.forwardRef(() => i5.CdkDrag), selector: "[cdkDrag]", inputs: ["cdkDragData", "cdkDragLockAxis", "cdkDragRootElement", "cdkDragBoundary", "cdkDragStartDelay", "cdkDragFreeDragPosition", "cdkDragDisabled", "cdkDragConstrainPosition", "cdkDragPreviewClass", "cdkDragPreviewContainer"], outputs: ["cdkDragStarted", "cdkDragReleased", "cdkDragEnded", "cdkDragEntered", "cdkDragExited", "cdkDragDropped", "cdkDragMoved"], exportAs: ["cdkDrag"] }, { kind: "component", type: i0.forwardRef(() => AngleDoubleDownIcon), selector: "AngleDoubleDownIcon" }, { kind: "component", type: i0.forwardRef(() => AngleDoubleLeftIcon), selector: "AngleDoubleLeftIcon" }, { kind: "component", type: i0.forwardRef(() => AngleDoubleRightIcon), selector: "AngleDoubleRightIcon" }, { kind: "component", type: i0.forwardRef(() => AngleDoubleUpIcon), selector: "AngleDoubleUpIcon" }, { kind: "component", type: i0.forwardRef(() => AngleDownIcon), selector: "AngleDownIcon" }, { kind: "component", type: i0.forwardRef(() => AngleLeftIcon), selector: "AngleLeftIcon" }, { kind: "component", type: i0.forwardRef(() => AngleRightIcon), selector: "AngleRightIcon" }, { kind: "component", type: i0.forwardRef(() => AngleUpIcon), selector: "AngleUpIcon" }, { kind: "component", type: i0.forwardRef(() => SearchIcon), selector: "SearchIcon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: PickList, decorators: [{
            type: Component,
            args: [{ selector: 'p-pickList', template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="{ 'p-picklist p-component': true, 'p-picklist-striped': stripedRows }" cdkDropListGroup [attr.data-pc-name]="'picklist'" [attr.data-pc-section]="'root'">
            <div class="p-picklist-buttons p-picklist-source-controls" *ngIf="showSourceControls" [attr.data-pc-section]="'sourceControls'" [attr.data-pc-group-section]="'controls'">
                <button
                    type="button"
                    [attr.aria-label]="moveUpAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="sourceMoveDisabled()"
                    (click)="moveUp(sourcelist, source, selectedItemsSource, onSourceReorder, SOURCE_LIST)"
                    [attr.data-pc-section]="'sourceMoveUpButton'"
                >
                    <AngleUpIcon *ngIf="!moveUpIconTemplate" [attr.data-pc-section]="'moveupicon'" />
                    <ng-template *ngTemplateOutlet="moveUpIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveTopAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="sourceMoveDisabled()"
                    (click)="moveTop(sourcelist, source, selectedItemsSource, onSourceReorder, SOURCE_LIST)"
                    [attr.data-pc-section]="'sourceMoveTopButton'"
                >
                    <AngleDoubleUpIcon *ngIf="!moveTopIconTemplate" [attr.data-pc-section]="'movetopicon'" />
                    <ng-template *ngTemplateOutlet="moveTopIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveDownAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="sourceMoveDisabled()"
                    (click)="moveDown(sourcelist, source, selectedItemsSource, onSourceReorder, SOURCE_LIST)"
                    [attr.data-pc-section]="'sourceMoveDownButton'"
                >
                    <AngleDownIcon *ngIf="!moveDownIconTemplate" [attr.data-pc-section]="'movedownicon'" />
                    <ng-template *ngTemplateOutlet="moveDownIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveBottomAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="sourceMoveDisabled()"
                    (click)="moveBottom(sourcelist, source, selectedItemsSource, onSourceReorder, SOURCE_LIST)"
                    [attr.data-pc-section]="'sourceMoveBottomButton'"
                >
                    <AngleDoubleDownIcon *ngIf="!moveBottomIconTemplate" [attr.data-pc-section]="'movebottomicon'" />
                    <ng-template *ngTemplateOutlet="moveBottomIconTemplate"></ng-template>
                </button>
            </div>
            <div class="p-picklist-list-wrapper p-picklist-source-wrapper" [attr.data-pc-section]="'sourceWrapper'" [attr.data-pc-group-section]="'listWrapper'">
                <div class="p-picklist-header" *ngIf="sourceHeader || sourceHeaderTemplate" [attr.data-pc-section]="'sourceHeader'" [attr.data-pc-group-section]="'header'">
                    <div class="p-picklist-title" *ngIf="!sourceHeaderTemplate">{{ sourceHeader }}</div>
                    <ng-container *ngTemplateOutlet="sourceHeaderTemplate"></ng-container>
                </div>
                <div class="p-picklist-filter-container" *ngIf="filterBy && showSourceFilter !== false" [attr.data-pc-section]="'sourceFilterContainer'">
                    <ng-container *ngIf="sourceFilterTemplate; else builtInSourceElement">
                        <ng-container *ngTemplateOutlet="sourceFilterTemplate; context: { options: sourceFilterOptions }"></ng-container>
                    </ng-container>
                    <ng-template #builtInSourceElement>
                        <div class="p-picklist-filter" [attr.data-pc-section]="'sourceFilter'">
                            <input
                                #sourceFilter
                                type="text"
                                role="textbox"
                                (keyup)="onFilter($event, SOURCE_LIST)"
                                class="p-picklist-filter-input p-inputtext p-component"
                                [disabled]="disabled"
                                [attr.placeholder]="sourceFilterPlaceholder"
                                [attr.aria-label]="ariaSourceFilterLabel"
                                [attr.data-pc-section]="'sourceFilterInput'"
                            />
                            <SearchIcon *ngIf="!sourceFilterIconTemplate" [styleClass]="'p-picklist-filter-icon'" [attr.data-pc-section]="'sourcefilterIcon'" />
                            <span class="p-picklist-filter-icon" *ngIf="sourceFilterIconTemplate" [attr.data-pc-section]="'sourcefilterIcon'">
                                <ng-template *ngTemplateOutlet="sourceFilterIconTemplate"></ng-template>
                            </span>
                        </div>
                    </ng-template>
                </div>

                <ul
                    #sourcelist
                    class="p-picklist-list p-picklist-source"
                    [id]="idSource + '_list'"
                    (keydown)="onItemKeyDown($event, selectedItemsSource, onSourceSelect, SOURCE_LIST)"
                    (focus)="onListFocus($event, SOURCE_LIST)"
                    (blur)="onListBlur($event, SOURCE_LIST)"
                    cdkDropList
                    [cdkDropListData]="source"
                    (cdkDropListDropped)="onDrop($event, SOURCE_LIST)"
                    [ngStyle]="sourceStyle"
                    role="listbox"
                    aria-multiselectable="true"
                    [attr.aria-activedescendant]="focused['sourceList'] ? focusedOptionId : undefined"
                    [attr.tabindex]="source && source.length > 0 ? tabindex : -1"
                    [attr.data-pc-section]="'sourceList'"
                    [attr.data-pc-group-section]="'list'"
                >
                    <ng-template ngFor let-item [ngForOf]="source" [ngForTrackBy]="sourceTrackBy || trackBy" let-i="index" let-l="last">
                        <li
                            [ngClass]="{ 'p-picklist-item': true, 'p-highlight': isSelected(item, selectedItemsSource), 'p-disabled': disabled }"
                            pRipple
                            cdkDrag
                            [id]="idSource + '_' + i"
                            [ngClass]="itemClass(item, idSource + '_' + i, selectedItemsSource)"
                            [cdkDragData]="item"
                            [cdkDragDisabled]="!dragdrop"
                            (click)="onItemClick($event, item, selectedItemsSource, onSourceSelect, idSource + '_' + i)"
                            (mousedown)="onOptionMouseDown(i, SOURCE_LIST)"
                            (dblclick)="onSourceItemDblClick()"
                            (touchend)="onItemTouchEnd()"
                            *ngIf="isItemVisible(item, SOURCE_LIST)"
                            role="option"
                            [attr.data-pc-section]="'item'"
                            [attr.aria-selected]="isSelected(item, selectedItemsSource)"
                        >
                            <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item, index: i }"></ng-container>
                        </li>
                    </ng-template>
                    <ng-container *ngIf="isEmpty(SOURCE_LIST) && (emptyMessageSourceTemplate || emptyFilterMessageSourceTemplate)">
                        <li class="p-picklist-empty-message" *ngIf="!filterValueSource || !emptyFilterMessageSourceTemplate" [attr.data-pc-section]="'sourceEmptyMessage'">
                            <ng-container *ngTemplateOutlet="emptyMessageSourceTemplate"></ng-container>
                        </li>
                        <li class="p-picklist-empty-message" *ngIf="filterValueSource" [attr.data-pc-section]="'sourceEmptyMessage'">
                            <ng-container *ngTemplateOutlet="emptyFilterMessageSourceTemplate"></ng-container>
                        </li>
                    </ng-container>
                </ul>
            </div>
            <div class="p-picklist-buttons p-picklist-transfer-buttons" [attr.data-pc-section]="'buttons'" [attr.data-pc-group-section]="'controls'">
                <button type="button" [attr.aria-label]="moveToTargetAriaLabel" pButton pRipple class="p-button-icon-only" [disabled]="moveRightDisabled()" (click)="moveRight()" [attr.data-pc-section]="'moveToTargetButton'">
                    <ng-container *ngIf="!moveToTargetIconTemplate">
                        <AngleRightIcon *ngIf="!viewChanged" [attr.data-pc-section]="'movetotargeticon'" />
                        <AngleDownIcon *ngIf="viewChanged" [attr.data-pc-section]="'movetotargeticon'" />
                    </ng-container>
                    <ng-template *ngTemplateOutlet="moveToTargetIconTemplate; context: { $implicit: viewChanged }"></ng-template>
                </button>
                <button type="button" [attr.aria-label]="moveAllToTargetAriaLabel" pButton pRipple class="p-button-icon-only" [disabled]="moveAllRightDisabled()" (click)="moveAllRight()" [attr.data-pc-section]="'moveAllToTargetButton'">
                    <ng-container *ngIf="!moveAllToTargetIconTemplate">
                        <AngleDoubleRightIcon *ngIf="!viewChanged" [attr.data-pc-section]="'movealltotargeticon'" />
                        <AngleDoubleDownIcon *ngIf="viewChanged" [attr.data-pc-section]="'movealltotargeticon'" />
                    </ng-container>
                    <ng-template *ngTemplateOutlet="moveAllToTargetIconTemplate; context: { $implicit: viewChanged }"></ng-template>
                </button>
                <button type="button" [attr.aria-label]="moveToSourceAriaLabel" pButton pRipple class="p-button-icon-only" [disabled]="moveLeftDisabled()" (click)="moveLeft()" [attr.data-pc-section]="'moveToSourceButton'">
                    <ng-container *ngIf="!moveToSourceIconTemplate">
                        <AngleLeftIcon *ngIf="!viewChanged" [attr.data-pc-section]="'movedownsourceticon'" />
                        <AngleUpIcon *ngIf="viewChanged" [attr.data-pc-section]="'movedownsourceticon'" />
                    </ng-container>
                    <ng-template *ngTemplateOutlet="moveToSourceIconTemplate; context: { $implicit: viewChanged }"></ng-template>
                </button>
                <button type="button" [attr.aria-label]="moveAllToSourceAriaLabel" pButton pRipple class="p-button-icon-only" [disabled]="moveAllLeftDisabled()" (click)="moveAllLeft()" [attr.data-pc-section]="'moveAllToSourceButton'">
                    <ng-container *ngIf="!moveAllToSourceIconTemplate">
                        <AngleDoubleLeftIcon *ngIf="!viewChanged" [attr.data-pc-section]="'movealltosourceticon'" />
                        <AngleDoubleUpIcon *ngIf="viewChanged" [attr.data-pc-section]="'movealltosourceticon'" />
                    </ng-container>
                    <ng-template *ngTemplateOutlet="moveAllToSourceIconTemplate; context: { $implicit: viewChanged }"></ng-template>
                </button>
            </div>
            <div class="p-picklist-list-wrapper p-picklist-target-wrapper" [attr.data-pc-section]="'targetWrapper'" [attr.data-pc-group-section]="'listwrapper'">
                <div class="p-picklist-header" *ngIf="targetHeader || targetHeaderTemplate" [attr.data-pc-section]="'targetHead'" [attr.data-pc-group-section]="'header'">
                    <div class="p-picklist-title" *ngIf="!targetHeaderTemplate">{{ targetHeader }}</div>
                    <ng-container *ngTemplateOutlet="targetHeaderTemplate"></ng-container>
                </div>
                <div class="p-picklist-filter-container" *ngIf="filterBy && showTargetFilter !== false" [attr.data-pc-section]="'targetFilterContainer'">
                    <ng-container *ngIf="targetFilterTemplate; else builtInTargetElement">
                        <ng-container *ngTemplateOutlet="targetFilterTemplate; context: { options: targetFilterOptions }"></ng-container>
                    </ng-container>
                    <ng-template #builtInTargetElement>
                        <div class="p-picklist-filter" [attr.data-pc-section]="'targetFilter'">
                            <input
                                #targetFilter
                                type="text"
                                role="textbox"
                                (keyup)="onFilter($event, TARGET_LIST)"
                                class="p-picklist-filter-input p-inputtext p-component"
                                [disabled]="disabled"
                                [attr.placeholder]="targetFilterPlaceholder"
                                [attr.aria-label]="ariaTargetFilterLabel"
                                [attr.data-pc-section]="'targetFilterInput'"
                            />
                            <SearchIcon *ngIf="!targetFilterIconTemplate" [styleClass]="'p-picklist-filter-icon'" [attr.data-pc-section]="'targetfiltericon'" />
                            <span class="p-picklist-filter-icon" *ngIf="targetFilterIconTemplate" [attr.data-pc-section]="'targetfiltericon'">
                                <ng-template *ngTemplateOutlet="targetFilterIconTemplate"></ng-template>
                            </span>
                        </div>
                    </ng-template>
                </div>
                <ul
                    #targetlist
                    class="p-picklist-list p-picklist-target"
                    [id]="idTarget + '_list'"
                    (keydown)="onItemKeyDown($event, selectedItemsTarget, onTargetSelect, TARGET_LIST)"
                    (focus)="onListFocus($event, TARGET_LIST)"
                    (blur)="onListBlur($event, TARGET_LIST)"
                    cdkDropList
                    [cdkDropListData]="target"
                    (cdkDropListDropped)="onDrop($event, TARGET_LIST)"
                    [ngStyle]="targetStyle"
                    role="listbox"
                    aria-multiselectable="true"
                    [attr.aria-activedescendant]="focused['targetList'] ? focusedOptionId : undefined"
                    [attr.tabindex]="target && target.length > 0 ? tabindex : -1"
                    [attr.data-pc-section]="'targetList'"
                    [attr.data-pc-group-section]="'list'"
                >
                    <ng-template ngFor let-item [ngForOf]="target" [ngForTrackBy]="targetTrackBy || trackBy" let-i="index" let-l="last">
                        <li
                            [ngClass]="{ 'p-picklist-item': true, 'p-highlight': isSelected(item, selectedItemsTarget), 'p-disabled': disabled }"
                            pRipple
                            cdkDrag
                            [id]="idTarget + '_' + i"
                            [ngClass]="itemClass(item, idTarget + '_' + i, selectedItemsTarget)"
                            [cdkDragData]="item"
                            [cdkDragDisabled]="!dragdrop"
                            (click)="onItemClick($event, item, selectedItemsTarget, onTargetSelect, idTarget + '_' + i)"
                            (mousedown)="onOptionMouseDown(i, TARGET_LIST)"
                            (dblclick)="onTargetItemDblClick()"
                            (touchend)="onItemTouchEnd()"
                            *ngIf="isItemVisible(item, TARGET_LIST)"
                            role="option"
                            [attr.data-pc-section]="'item'"
                            [attr.aria-selected]="isSelected(item, selectedItemsTarget)"
                        >
                            <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item, index: i }"></ng-container>
                        </li>
                    </ng-template>
                    <ng-container *ngIf="isEmpty(TARGET_LIST) && (emptyMessageTargetTemplate || emptyFilterMessageTargetTemplate)">
                        <li class="p-picklist-empty-message" *ngIf="!filterValueTarget || !emptyFilterMessageTargetTemplate" [attr.data-pc-section]="'targetEmptyMessage'">
                            <ng-container *ngTemplateOutlet="emptyMessageTargetTemplate"></ng-container>
                        </li>
                        <li class="p-picklist-empty-message" *ngIf="filterValueTarget" [attr.data-pc-section]="'targetEmptyMessage'">
                            <ng-container *ngTemplateOutlet="emptyFilterMessageTargetTemplate"></ng-container>
                        </li>
                    </ng-container>
                </ul>
            </div>
            <div class="p-picklist-buttons p-picklist-target-controls" *ngIf="showTargetControls" [attr.data-pc-section]="'targetControls'" [attr.data-pc-group-section]="'controls'">
                <button
                    type="button"
                    [attr.aria-label]="moveUpAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="targetMoveDisabled()"
                    (click)="moveUp(targetlist, target, selectedItemsTarget, onTargetReorder, TARGET_LIST)"
                    [attr.data-pc-section]="'targetMoveUpButton'"
                >
                    <AngleUpIcon *ngIf="!moveUpIconTemplate" [attr.data-pc-section]="'moveupicon'" />
                    <ng-template *ngTemplateOutlet="moveUpIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveTopAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="targetMoveDisabled()"
                    (click)="moveTop(targetlist, target, selectedItemsTarget, onTargetReorder, TARGET_LIST)"
                    [attr.data-pc-section]="'targetMoveTopButton'"
                >
                    <AngleDoubleUpIcon *ngIf="!moveTopIconTemplate" [attr.data-pc-section]="'movetopicon'" />
                    <ng-template *ngTemplateOutlet="moveTopIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveDownAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="targetMoveDisabled()"
                    (click)="moveDown(targetlist, target, selectedItemsTarget, onTargetReorder, TARGET_LIST)"
                    [attr.data-pc-section]="'targetMoveDownButton'"
                >
                    <AngleDownIcon *ngIf="!moveDownIconTemplate" [attr.data-pc-section]="'movedownicon'" />
                    <ng-template *ngTemplateOutlet="moveDownIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveBottomAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="targetMoveDisabled()"
                    (click)="moveBottom(targetlist, target, selectedItemsTarget, onTargetReorder, TARGET_LIST)"
                    [attr.data-pc-section]="'targetMoveBottomButton'"
                >
                    <AngleDoubleDownIcon *ngIf="!moveBottomIconTemplate" [attr.data-pc-section]="'movebottomicon'" />
                    <ng-template *ngTemplateOutlet="moveBottomIconTemplate"></ng-template>
                </button>
            </div>
        </div>
    `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-picklist{display:flex}.p-picklist-buttons{display:flex;flex-direction:column;justify-content:center}.p-picklist-list-wrapper{flex:1 1 50%}.p-picklist-list{list-style-type:none;margin:0;padding:0;overflow:auto;min-height:12rem}.p-picklist-item{display:block;cursor:pointer;overflow:hidden;position:relative}.p-picklist-item:not(.cdk-drag-disabled){cursor:move}.p-picklist-item.cdk-drag-placeholder{opacity:0}.p-picklist-item.cdk-drag-animating{transition:transform .25s cubic-bezier(0,0,.2,1)}.p-picklist-filter{position:relative}.p-picklist-filter-icon{position:absolute;top:50%;margin-top:-.5rem}.p-picklist-filter-input{width:100%}.p-picklist-list.cdk-drop-list-dragging .p-picklist-item:not(.cdk-drag-placeholder){transition:transform .25s cubic-bezier(0,0,.2,1)}}\n"] }]
        }], ctorParameters: () => [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i1.FilterService }, { type: i1.PrimeNGConfig }], propDecorators: { source: [{
                type: Input
            }], target: [{
                type: Input
            }], sourceHeader: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], rightButtonAriaLabel: [{
                type: Input
            }], leftButtonAriaLabel: [{
                type: Input
            }], allRightButtonAriaLabel: [{
                type: Input
            }], allLeftButtonAriaLabel: [{
                type: Input
            }], upButtonAriaLabel: [{
                type: Input
            }], downButtonAriaLabel: [{
                type: Input
            }], topButtonAriaLabel: [{
                type: Input
            }], bottomButtonAriaLabel: [{
                type: Input
            }], targetHeader: [{
                type: Input
            }], responsive: [{
                type: Input
            }], filterBy: [{
                type: Input
            }], filterLocale: [{
                type: Input
            }], trackBy: [{
                type: Input
            }], sourceTrackBy: [{
                type: Input
            }], targetTrackBy: [{
                type: Input
            }], showSourceFilter: [{
                type: Input
            }], showTargetFilter: [{
                type: Input
            }], metaKeySelection: [{
                type: Input
            }], dragdrop: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], sourceStyle: [{
                type: Input
            }], targetStyle: [{
                type: Input
            }], showSourceControls: [{
                type: Input
            }], showTargetControls: [{
                type: Input
            }], sourceFilterPlaceholder: [{
                type: Input
            }], targetFilterPlaceholder: [{
                type: Input
            }], disabled: [{
                type: Input
            }], ariaSourceFilterLabel: [{
                type: Input
            }], ariaTargetFilterLabel: [{
                type: Input
            }], filterMatchMode: [{
                type: Input
            }], stripedRows: [{
                type: Input
            }], keepSelection: [{
                type: Input
            }], breakpoint: [{
                type: Input
            }], onMoveToSource: [{
                type: Output
            }], onMoveAllToSource: [{
                type: Output
            }], onMoveAllToTarget: [{
                type: Output
            }], onMoveToTarget: [{
                type: Output
            }], onSourceReorder: [{
                type: Output
            }], onTargetReorder: [{
                type: Output
            }], onSourceSelect: [{
                type: Output
            }], onTargetSelect: [{
                type: Output
            }], onSourceFilter: [{
                type: Output
            }], onTargetFilter: [{
                type: Output
            }], onFocus: [{
                type: Output
            }], onBlur: [{
                type: Output
            }], listViewSourceChild: [{
                type: ViewChild,
                args: ['sourcelist']
            }], listViewTargetChild: [{
                type: ViewChild,
                args: ['targetlist']
            }], sourceFilterViewChild: [{
                type: ViewChild,
                args: ['sourceFilter']
            }], targetFilterViewChild: [{
                type: ViewChild,
                args: ['targetFilter']
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
const DragConfig = {
    zIndex: 1200
};
export class PickListModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: PickListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.5", ngImport: i0, type: PickListModule, declarations: [PickList], imports: [CommonModule, ButtonModule, SharedModule, RippleModule, DragDropModule, AngleDoubleDownIcon, AngleDoubleLeftIcon, AngleDoubleRightIcon, AngleDoubleUpIcon, AngleDownIcon, AngleLeftIcon, AngleRightIcon, AngleUpIcon, SearchIcon, HomeIcon], exports: [PickList, SharedModule, DragDropModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: PickListModule, providers: [{ provide: CDK_DRAG_CONFIG, useValue: DragConfig }], imports: [CommonModule, ButtonModule, SharedModule, RippleModule, DragDropModule, AngleDoubleDownIcon, AngleDoubleLeftIcon, AngleDoubleRightIcon, AngleDoubleUpIcon, AngleDownIcon, AngleLeftIcon, AngleRightIcon, AngleUpIcon, SearchIcon, HomeIcon, SharedModule, DragDropModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: PickListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ButtonModule, SharedModule, RippleModule, DragDropModule, AngleDoubleDownIcon, AngleDoubleLeftIcon, AngleDoubleRightIcon, AngleDoubleUpIcon, AngleDownIcon, AngleLeftIcon, AngleRightIcon, AngleUpIcon, SearchIcon, HomeIcon],
                    exports: [PickList, SharedModule, DragDropModule],
                    declarations: [PickList],
                    providers: [{ provide: CDK_DRAG_CONFIG, useValue: DragConfig }]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja2xpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvcGlja2xpc3QvcGlja2xpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGVBQWUsRUFBZSxjQUFjLEVBQUUsZUFBZSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUgsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RSxPQUFPLEVBR0gsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxlQUFlLEVBRWYsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUNSLE1BQU0sRUFDTixXQUFXLEVBSVgsU0FBUyxFQUNULGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWdDLGFBQWEsRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDeEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDekMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDcEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDcEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDdEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVC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MUMzTyxRQUFRLEVBaTFDRyxZQUFZLEVBQUUsY0FBYzt3R0FJdkMsY0FBYyxhQUZaLENBQUMsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsQ0FBQyxZQUhyRCxZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUFFLG1CQUFtQixFQUFFLG1CQUFtQixFQUFFLG9CQUFvQixFQUFFLGlCQUFpQixFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUNoTyxZQUFZLEVBQUUsY0FBYzs7MkZBSXZDLGNBQWM7a0JBTjFCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxtQkFBbUIsRUFBRSxtQkFBbUIsRUFBRSxvQkFBb0IsRUFBRSxpQkFBaUIsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQztvQkFDclAsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLFlBQVksRUFBRSxjQUFjLENBQUM7b0JBQ2pELFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQztvQkFDeEIsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsQ0FBQztpQkFDbEUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDREtfRFJBR19DT05GSUcsIENka0RyYWdEcm9wLCBEcmFnRHJvcE1vZHVsZSwgbW92ZUl0ZW1JbkFycmF5LCB0cmFuc2ZlckFycmF5SXRlbSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlLCBET0NVTUVOVCwgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIEFmdGVyVmlld0NoZWNrZWQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgTmdNb2R1bGUsXG4gICAgT3V0cHV0LFxuICAgIFBMQVRGT1JNX0lELFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBSZW5kZXJlcjIsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmlsdGVyU2VydmljZSwgUHJpbWVOR0NvbmZpZywgUHJpbWVUZW1wbGF0ZSwgU2hhcmVkTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgQnV0dG9uTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9idXR0b24nO1xuaW1wb3J0IHsgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7IEFuZ2xlRG91YmxlRG93bkljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL2FuZ2xlZG91YmxlZG93bic7XG5pbXBvcnQgeyBBbmdsZURvdWJsZUxlZnRJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9hbmdsZWRvdWJsZWxlZnQnO1xuaW1wb3J0IHsgQW5nbGVEb3VibGVSaWdodEljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL2FuZ2xlZG91YmxlcmlnaHQnO1xuaW1wb3J0IHsgQW5nbGVEb3VibGVVcEljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL2FuZ2xlZG91YmxldXAnO1xuaW1wb3J0IHsgQW5nbGVEb3duSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvYW5nbGVkb3duJztcbmltcG9ydCB7IEFuZ2xlTGVmdEljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL2FuZ2xlbGVmdCc7XG5pbXBvcnQgeyBBbmdsZVJpZ2h0SWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvYW5nbGVyaWdodCc7XG5pbXBvcnQgeyBBbmdsZVVwSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvYW5nbGV1cCc7XG5pbXBvcnQgeyBIb21lSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvaG9tZSc7XG5pbXBvcnQgeyBTZWFyY2hJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9zZWFyY2gnO1xuaW1wb3J0IHsgUmlwcGxlTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9yaXBwbGUnO1xuaW1wb3J0IHsgTnVsbGFibGUsIFZvaWRMaXN0ZW5lciB9IGZyb20gJ3ByaW1lbmcvdHMtaGVscGVycyc7XG5pbXBvcnQgeyBPYmplY3RVdGlscywgVW5pcXVlQ29tcG9uZW50SWQgfSBmcm9tICdwcmltZW5nL3V0aWxzJztcbmltcG9ydCB7XG4gICAgUGlja0xpc3RGaWx0ZXJPcHRpb25zLFxuICAgIFBpY2tMaXN0TW92ZUFsbFRvU291cmNlRXZlbnQsXG4gICAgUGlja0xpc3RNb3ZlQWxsVG9UYXJnZXRFdmVudCxcbiAgICBQaWNrTGlzdE1vdmVUb1NvdXJjZUV2ZW50LFxuICAgIFBpY2tMaXN0TW92ZVRvVGFyZ2V0RXZlbnQsXG4gICAgUGlja0xpc3RTb3VyY2VGaWx0ZXJFdmVudCxcbiAgICBQaWNrTGlzdFNvdXJjZVJlb3JkZXJFdmVudCxcbiAgICBQaWNrTGlzdFNvdXJjZVNlbGVjdEV2ZW50LFxuICAgIFBpY2tMaXN0VGFyZ2V0RmlsdGVyRXZlbnQsXG4gICAgUGlja0xpc3RUYXJnZXRSZW9yZGVyRXZlbnQsXG4gICAgUGlja0xpc3RUYXJnZXRTZWxlY3RFdmVudFxufSBmcm9tICcuL3BpY2tsaXN0LmludGVyZmFjZSc7XG4vKipcbiAqIFBpY2tMaXN0IGlzIHVzZWQgdG8gcmVvcmRlciBpdGVtcyBiZXR3ZWVuIGRpZmZlcmVudCBsaXN0cy5cbiAqIEBncm91cCBDb21wb25lbnRzXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1waWNrTGlzdCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW25nQ2xhc3NdPVwieyAncC1waWNrbGlzdCBwLWNvbXBvbmVudCc6IHRydWUsICdwLXBpY2tsaXN0LXN0cmlwZWQnOiBzdHJpcGVkUm93cyB9XCIgY2RrRHJvcExpc3RHcm91cCBbYXR0ci5kYXRhLXBjLW5hbWVdPVwiJ3BpY2tsaXN0J1wiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCIncm9vdCdcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXBpY2tsaXN0LWJ1dHRvbnMgcC1waWNrbGlzdC1zb3VyY2UtY29udHJvbHNcIiAqbmdJZj1cInNob3dTb3VyY2VDb250cm9sc1wiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInc291cmNlQ29udHJvbHMnXCIgW2F0dHIuZGF0YS1wYy1ncm91cC1zZWN0aW9uXT1cIidjb250cm9scydcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIm1vdmVVcEFyaWFMYWJlbFwiXG4gICAgICAgICAgICAgICAgICAgIHBCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgcFJpcHBsZVxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInAtYnV0dG9uLWljb24tb25seVwiXG4gICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJzb3VyY2VNb3ZlRGlzYWJsZWQoKVwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJtb3ZlVXAoc291cmNlbGlzdCwgc291cmNlLCBzZWxlY3RlZEl0ZW1zU291cmNlLCBvblNvdXJjZVJlb3JkZXIsIFNPVVJDRV9MSVNUKVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInc291cmNlTW92ZVVwQnV0dG9uJ1wiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8QW5nbGVVcEljb24gKm5nSWY9XCIhbW92ZVVwSWNvblRlbXBsYXRlXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidtb3ZldXBpY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cIm1vdmVVcEljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJtb3ZlVG9wQXJpYUxhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgcEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBwUmlwcGxlXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1idXR0b24taWNvbi1vbmx5XCJcbiAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cInNvdXJjZU1vdmVEaXNhYmxlZCgpXCJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm1vdmVUb3Aoc291cmNlbGlzdCwgc291cmNlLCBzZWxlY3RlZEl0ZW1zU291cmNlLCBvblNvdXJjZVJlb3JkZXIsIFNPVVJDRV9MSVNUKVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInc291cmNlTW92ZVRvcEJ1dHRvbidcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPEFuZ2xlRG91YmxlVXBJY29uICpuZ0lmPVwiIW1vdmVUb3BJY29uVGVtcGxhdGVcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ21vdmV0b3BpY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cIm1vdmVUb3BJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwibW92ZURvd25BcmlhTGFiZWxcIlxuICAgICAgICAgICAgICAgICAgICBwQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHBSaXBwbGVcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLWJ1dHRvbi1pY29uLW9ubHlcIlxuICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwic291cmNlTW92ZURpc2FibGVkKClcIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwibW92ZURvd24oc291cmNlbGlzdCwgc291cmNlLCBzZWxlY3RlZEl0ZW1zU291cmNlLCBvblNvdXJjZVJlb3JkZXIsIFNPVVJDRV9MSVNUKVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInc291cmNlTW92ZURvd25CdXR0b24nXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxBbmdsZURvd25JY29uICpuZ0lmPVwiIW1vdmVEb3duSWNvblRlbXBsYXRlXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidtb3ZlZG93bmljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwibW92ZURvd25JY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwibW92ZUJvdHRvbUFyaWFMYWJlbFwiXG4gICAgICAgICAgICAgICAgICAgIHBCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgcFJpcHBsZVxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInAtYnV0dG9uLWljb24tb25seVwiXG4gICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJzb3VyY2VNb3ZlRGlzYWJsZWQoKVwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJtb3ZlQm90dG9tKHNvdXJjZWxpc3QsIHNvdXJjZSwgc2VsZWN0ZWRJdGVtc1NvdXJjZSwgb25Tb3VyY2VSZW9yZGVyLCBTT1VSQ0VfTElTVClcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3NvdXJjZU1vdmVCb3R0b21CdXR0b24nXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxBbmdsZURvdWJsZURvd25JY29uICpuZ0lmPVwiIW1vdmVCb3R0b21JY29uVGVtcGxhdGVcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ21vdmVib3R0b21pY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cIm1vdmVCb3R0b21JY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1waWNrbGlzdC1saXN0LXdyYXBwZXIgcC1waWNrbGlzdC1zb3VyY2Utd3JhcHBlclwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInc291cmNlV3JhcHBlcidcIiBbYXR0ci5kYXRhLXBjLWdyb3VwLXNlY3Rpb25dPVwiJ2xpc3RXcmFwcGVyJ1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXBpY2tsaXN0LWhlYWRlclwiICpuZ0lmPVwic291cmNlSGVhZGVyIHx8IHNvdXJjZUhlYWRlclRlbXBsYXRlXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidzb3VyY2VIZWFkZXInXCIgW2F0dHIuZGF0YS1wYy1ncm91cC1zZWN0aW9uXT1cIidoZWFkZXInXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXBpY2tsaXN0LXRpdGxlXCIgKm5nSWY9XCIhc291cmNlSGVhZGVyVGVtcGxhdGVcIj57eyBzb3VyY2VIZWFkZXIgfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInNvdXJjZUhlYWRlclRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtcGlja2xpc3QtZmlsdGVyLWNvbnRhaW5lclwiICpuZ0lmPVwiZmlsdGVyQnkgJiYgc2hvd1NvdXJjZUZpbHRlciAhPT0gZmFsc2VcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3NvdXJjZUZpbHRlckNvbnRhaW5lcidcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInNvdXJjZUZpbHRlclRlbXBsYXRlOyBlbHNlIGJ1aWx0SW5Tb3VyY2VFbGVtZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwic291cmNlRmlsdGVyVGVtcGxhdGU7IGNvbnRleHQ6IHsgb3B0aW9uczogc291cmNlRmlsdGVyT3B0aW9ucyB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2J1aWx0SW5Tb3VyY2VFbGVtZW50PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtcGlja2xpc3QtZmlsdGVyXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidzb3VyY2VGaWx0ZXInXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICNzb3VyY2VGaWx0ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlPVwidGV4dGJveFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChrZXl1cCk9XCJvbkZpbHRlcigkZXZlbnQsIFNPVVJDRV9MSVNUKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1waWNrbGlzdC1maWx0ZXItaW5wdXQgcC1pbnB1dHRleHQgcC1jb21wb25lbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5wbGFjZWhvbGRlcl09XCJzb3VyY2VGaWx0ZXJQbGFjZWhvbGRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYVNvdXJjZUZpbHRlckxhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidzb3VyY2VGaWx0ZXJJbnB1dCdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFNlYXJjaEljb24gKm5nSWY9XCIhc291cmNlRmlsdGVySWNvblRlbXBsYXRlXCIgW3N0eWxlQ2xhc3NdPVwiJ3AtcGlja2xpc3QtZmlsdGVyLWljb24nXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidzb3VyY2VmaWx0ZXJJY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLXBpY2tsaXN0LWZpbHRlci1pY29uXCIgKm5nSWY9XCJzb3VyY2VGaWx0ZXJJY29uVGVtcGxhdGVcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3NvdXJjZWZpbHRlckljb24nXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cInNvdXJjZUZpbHRlckljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8dWxcbiAgICAgICAgICAgICAgICAgICAgI3NvdXJjZWxpc3RcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLXBpY2tsaXN0LWxpc3QgcC1waWNrbGlzdC1zb3VyY2VcIlxuICAgICAgICAgICAgICAgICAgICBbaWRdPVwiaWRTb3VyY2UgKyAnX2xpc3QnXCJcbiAgICAgICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25JdGVtS2V5RG93bigkZXZlbnQsIHNlbGVjdGVkSXRlbXNTb3VyY2UsIG9uU291cmNlU2VsZWN0LCBTT1VSQ0VfTElTVClcIlxuICAgICAgICAgICAgICAgICAgICAoZm9jdXMpPVwib25MaXN0Rm9jdXMoJGV2ZW50LCBTT1VSQ0VfTElTVClcIlxuICAgICAgICAgICAgICAgICAgICAoYmx1cik9XCJvbkxpc3RCbHVyKCRldmVudCwgU09VUkNFX0xJU1QpXCJcbiAgICAgICAgICAgICAgICAgICAgY2RrRHJvcExpc3RcbiAgICAgICAgICAgICAgICAgICAgW2Nka0Ryb3BMaXN0RGF0YV09XCJzb3VyY2VcIlxuICAgICAgICAgICAgICAgICAgICAoY2RrRHJvcExpc3REcm9wcGVkKT1cIm9uRHJvcCgkZXZlbnQsIFNPVVJDRV9MSVNUKVwiXG4gICAgICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInNvdXJjZVN0eWxlXCJcbiAgICAgICAgICAgICAgICAgICAgcm9sZT1cImxpc3Rib3hcIlxuICAgICAgICAgICAgICAgICAgICBhcmlhLW11bHRpc2VsZWN0YWJsZT1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWFjdGl2ZWRlc2NlbmRhbnRdPVwiZm9jdXNlZFsnc291cmNlTGlzdCddID8gZm9jdXNlZE9wdGlvbklkIDogdW5kZWZpbmVkXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwic291cmNlICYmIHNvdXJjZS5sZW5ndGggPiAwID8gdGFiaW5kZXggOiAtMVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInc291cmNlTGlzdCdcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLWdyb3VwLXNlY3Rpb25dPVwiJ2xpc3QnXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtaXRlbSBbbmdGb3JPZl09XCJzb3VyY2VcIiBbbmdGb3JUcmFja0J5XT1cInNvdXJjZVRyYWNrQnkgfHwgdHJhY2tCeVwiIGxldC1pPVwiaW5kZXhcIiBsZXQtbD1cImxhc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3AtcGlja2xpc3QtaXRlbSc6IHRydWUsICdwLWhpZ2hsaWdodCc6IGlzU2VsZWN0ZWQoaXRlbSwgc2VsZWN0ZWRJdGVtc1NvdXJjZSksICdwLWRpc2FibGVkJzogZGlzYWJsZWQgfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcFJpcHBsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNka0RyYWdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaWRdPVwiaWRTb3VyY2UgKyAnXycgKyBpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJpdGVtQ2xhc3MoaXRlbSwgaWRTb3VyY2UgKyAnXycgKyBpLCBzZWxlY3RlZEl0ZW1zU291cmNlKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Nka0RyYWdEYXRhXT1cIml0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtjZGtEcmFnRGlzYWJsZWRdPVwiIWRyYWdkcm9wXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25JdGVtQ2xpY2soJGV2ZW50LCBpdGVtLCBzZWxlY3RlZEl0ZW1zU291cmNlLCBvblNvdXJjZVNlbGVjdCwgaWRTb3VyY2UgKyAnXycgKyBpKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKG1vdXNlZG93bik9XCJvbk9wdGlvbk1vdXNlRG93bihpLCBTT1VSQ0VfTElTVClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChkYmxjbGljayk9XCJvblNvdXJjZUl0ZW1EYmxDbGljaygpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAodG91Y2hlbmQpPVwib25JdGVtVG91Y2hFbmQoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJpc0l0ZW1WaXNpYmxlKGl0ZW0sIFNPVVJDRV9MSVNUKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZT1cIm9wdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidpdGVtJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1zZWxlY3RlZF09XCJpc1NlbGVjdGVkKGl0ZW0sIHNlbGVjdGVkSXRlbXNTb3VyY2UpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaXRlbVRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogaXRlbSwgaW5kZXg6IGkgfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzRW1wdHkoU09VUkNFX0xJU1QpICYmIChlbXB0eU1lc3NhZ2VTb3VyY2VUZW1wbGF0ZSB8fCBlbXB0eUZpbHRlck1lc3NhZ2VTb3VyY2VUZW1wbGF0ZSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInAtcGlja2xpc3QtZW1wdHktbWVzc2FnZVwiICpuZ0lmPVwiIWZpbHRlclZhbHVlU291cmNlIHx8ICFlbXB0eUZpbHRlck1lc3NhZ2VTb3VyY2VUZW1wbGF0ZVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInc291cmNlRW1wdHlNZXNzYWdlJ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJlbXB0eU1lc3NhZ2VTb3VyY2VUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInAtcGlja2xpc3QtZW1wdHktbWVzc2FnZVwiICpuZ0lmPVwiZmlsdGVyVmFsdWVTb3VyY2VcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3NvdXJjZUVtcHR5TWVzc2FnZSdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZW1wdHlGaWx0ZXJNZXNzYWdlU291cmNlVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXBpY2tsaXN0LWJ1dHRvbnMgcC1waWNrbGlzdC10cmFuc2Zlci1idXR0b25zXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIididXR0b25zJ1wiIFthdHRyLmRhdGEtcGMtZ3JvdXAtc2VjdGlvbl09XCInY29udHJvbHMnXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJtb3ZlVG9UYXJnZXRBcmlhTGFiZWxcIiBwQnV0dG9uIHBSaXBwbGUgY2xhc3M9XCJwLWJ1dHRvbi1pY29uLW9ubHlcIiBbZGlzYWJsZWRdPVwibW92ZVJpZ2h0RGlzYWJsZWQoKVwiIChjbGljayk9XCJtb3ZlUmlnaHQoKVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInbW92ZVRvVGFyZ2V0QnV0dG9uJ1wiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIW1vdmVUb1RhcmdldEljb25UZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEFuZ2xlUmlnaHRJY29uICpuZ0lmPVwiIXZpZXdDaGFuZ2VkXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidtb3ZldG90YXJnZXRpY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8QW5nbGVEb3duSWNvbiAqbmdJZj1cInZpZXdDaGFuZ2VkXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidtb3ZldG90YXJnZXRpY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJtb3ZlVG9UYXJnZXRJY29uVGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiB2aWV3Q2hhbmdlZCB9XCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBbYXR0ci5hcmlhLWxhYmVsXT1cIm1vdmVBbGxUb1RhcmdldEFyaWFMYWJlbFwiIHBCdXR0b24gcFJpcHBsZSBjbGFzcz1cInAtYnV0dG9uLWljb24tb25seVwiIFtkaXNhYmxlZF09XCJtb3ZlQWxsUmlnaHREaXNhYmxlZCgpXCIgKGNsaWNrKT1cIm1vdmVBbGxSaWdodCgpXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidtb3ZlQWxsVG9UYXJnZXRCdXR0b24nXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhbW92ZUFsbFRvVGFyZ2V0SWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8QW5nbGVEb3VibGVSaWdodEljb24gKm5nSWY9XCIhdmlld0NoYW5nZWRcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ21vdmVhbGx0b3RhcmdldGljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxBbmdsZURvdWJsZURvd25JY29uICpuZ0lmPVwidmlld0NoYW5nZWRcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ21vdmVhbGx0b3RhcmdldGljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cIm1vdmVBbGxUb1RhcmdldEljb25UZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IHZpZXdDaGFuZ2VkIH1cIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIFthdHRyLmFyaWEtbGFiZWxdPVwibW92ZVRvU291cmNlQXJpYUxhYmVsXCIgcEJ1dHRvbiBwUmlwcGxlIGNsYXNzPVwicC1idXR0b24taWNvbi1vbmx5XCIgW2Rpc2FibGVkXT1cIm1vdmVMZWZ0RGlzYWJsZWQoKVwiIChjbGljayk9XCJtb3ZlTGVmdCgpXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidtb3ZlVG9Tb3VyY2VCdXR0b24nXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhbW92ZVRvU291cmNlSWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8QW5nbGVMZWZ0SWNvbiAqbmdJZj1cIiF2aWV3Q2hhbmdlZFwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInbW92ZWRvd25zb3VyY2V0aWNvbidcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEFuZ2xlVXBJY29uICpuZ0lmPVwidmlld0NoYW5nZWRcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ21vdmVkb3duc291cmNldGljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cIm1vdmVUb1NvdXJjZUljb25UZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IHZpZXdDaGFuZ2VkIH1cIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIFthdHRyLmFyaWEtbGFiZWxdPVwibW92ZUFsbFRvU291cmNlQXJpYUxhYmVsXCIgcEJ1dHRvbiBwUmlwcGxlIGNsYXNzPVwicC1idXR0b24taWNvbi1vbmx5XCIgW2Rpc2FibGVkXT1cIm1vdmVBbGxMZWZ0RGlzYWJsZWQoKVwiIChjbGljayk9XCJtb3ZlQWxsTGVmdCgpXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidtb3ZlQWxsVG9Tb3VyY2VCdXR0b24nXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhbW92ZUFsbFRvU291cmNlSWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8QW5nbGVEb3VibGVMZWZ0SWNvbiAqbmdJZj1cIiF2aWV3Q2hhbmdlZFwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInbW92ZWFsbHRvc291cmNldGljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxBbmdsZURvdWJsZVVwSWNvbiAqbmdJZj1cInZpZXdDaGFuZ2VkXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidtb3ZlYWxsdG9zb3VyY2V0aWNvbidcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwibW92ZUFsbFRvU291cmNlSWNvblRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogdmlld0NoYW5nZWQgfVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXBpY2tsaXN0LWxpc3Qtd3JhcHBlciBwLXBpY2tsaXN0LXRhcmdldC13cmFwcGVyXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIid0YXJnZXRXcmFwcGVyJ1wiIFthdHRyLmRhdGEtcGMtZ3JvdXAtc2VjdGlvbl09XCInbGlzdHdyYXBwZXInXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtcGlja2xpc3QtaGVhZGVyXCIgKm5nSWY9XCJ0YXJnZXRIZWFkZXIgfHwgdGFyZ2V0SGVhZGVyVGVtcGxhdGVcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3RhcmdldEhlYWQnXCIgW2F0dHIuZGF0YS1wYy1ncm91cC1zZWN0aW9uXT1cIidoZWFkZXInXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXBpY2tsaXN0LXRpdGxlXCIgKm5nSWY9XCIhdGFyZ2V0SGVhZGVyVGVtcGxhdGVcIj57eyB0YXJnZXRIZWFkZXIgfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRhcmdldEhlYWRlclRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtcGlja2xpc3QtZmlsdGVyLWNvbnRhaW5lclwiICpuZ0lmPVwiZmlsdGVyQnkgJiYgc2hvd1RhcmdldEZpbHRlciAhPT0gZmFsc2VcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3RhcmdldEZpbHRlckNvbnRhaW5lcidcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInRhcmdldEZpbHRlclRlbXBsYXRlOyBlbHNlIGJ1aWx0SW5UYXJnZXRFbGVtZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidGFyZ2V0RmlsdGVyVGVtcGxhdGU7IGNvbnRleHQ6IHsgb3B0aW9uczogdGFyZ2V0RmlsdGVyT3B0aW9ucyB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2J1aWx0SW5UYXJnZXRFbGVtZW50PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtcGlja2xpc3QtZmlsdGVyXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIid0YXJnZXRGaWx0ZXInXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICN0YXJnZXRGaWx0ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlPVwidGV4dGJveFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChrZXl1cCk9XCJvbkZpbHRlcigkZXZlbnQsIFRBUkdFVF9MSVNUKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1waWNrbGlzdC1maWx0ZXItaW5wdXQgcC1pbnB1dHRleHQgcC1jb21wb25lbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5wbGFjZWhvbGRlcl09XCJ0YXJnZXRGaWx0ZXJQbGFjZWhvbGRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYVRhcmdldEZpbHRlckxhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIid0YXJnZXRGaWx0ZXJJbnB1dCdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFNlYXJjaEljb24gKm5nSWY9XCIhdGFyZ2V0RmlsdGVySWNvblRlbXBsYXRlXCIgW3N0eWxlQ2xhc3NdPVwiJ3AtcGlja2xpc3QtZmlsdGVyLWljb24nXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIid0YXJnZXRmaWx0ZXJpY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLXBpY2tsaXN0LWZpbHRlci1pY29uXCIgKm5nSWY9XCJ0YXJnZXRGaWx0ZXJJY29uVGVtcGxhdGVcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3RhcmdldGZpbHRlcmljb24nXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cInRhcmdldEZpbHRlckljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPHVsXG4gICAgICAgICAgICAgICAgICAgICN0YXJnZXRsaXN0XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1waWNrbGlzdC1saXN0IHAtcGlja2xpc3QtdGFyZ2V0XCJcbiAgICAgICAgICAgICAgICAgICAgW2lkXT1cImlkVGFyZ2V0ICsgJ19saXN0J1wiXG4gICAgICAgICAgICAgICAgICAgIChrZXlkb3duKT1cIm9uSXRlbUtleURvd24oJGV2ZW50LCBzZWxlY3RlZEl0ZW1zVGFyZ2V0LCBvblRhcmdldFNlbGVjdCwgVEFSR0VUX0xJU1QpXCJcbiAgICAgICAgICAgICAgICAgICAgKGZvY3VzKT1cIm9uTGlzdEZvY3VzKCRldmVudCwgVEFSR0VUX0xJU1QpXCJcbiAgICAgICAgICAgICAgICAgICAgKGJsdXIpPVwib25MaXN0Qmx1cigkZXZlbnQsIFRBUkdFVF9MSVNUKVwiXG4gICAgICAgICAgICAgICAgICAgIGNka0Ryb3BMaXN0XG4gICAgICAgICAgICAgICAgICAgIFtjZGtEcm9wTGlzdERhdGFdPVwidGFyZ2V0XCJcbiAgICAgICAgICAgICAgICAgICAgKGNka0Ryb3BMaXN0RHJvcHBlZCk9XCJvbkRyb3AoJGV2ZW50LCBUQVJHRVRfTElTVClcIlxuICAgICAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJ0YXJnZXRTdHlsZVwiXG4gICAgICAgICAgICAgICAgICAgIHJvbGU9XCJsaXN0Ym94XCJcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1tdWx0aXNlbGVjdGFibGU9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1hY3RpdmVkZXNjZW5kYW50XT1cImZvY3VzZWRbJ3RhcmdldExpc3QnXSA/IGZvY3VzZWRPcHRpb25JZCA6IHVuZGVmaW5lZFwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cInRhcmdldCAmJiB0YXJnZXQubGVuZ3RoID4gMCA/IHRhYmluZGV4IDogLTFcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3RhcmdldExpc3QnXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1ncm91cC1zZWN0aW9uXT1cIidsaXN0J1wiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LWl0ZW0gW25nRm9yT2ZdPVwidGFyZ2V0XCIgW25nRm9yVHJhY2tCeV09XCJ0YXJnZXRUcmFja0J5IHx8IHRyYWNrQnlcIiBsZXQtaT1cImluZGV4XCIgbGV0LWw9XCJsYXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLXBpY2tsaXN0LWl0ZW0nOiB0cnVlLCAncC1oaWdobGlnaHQnOiBpc1NlbGVjdGVkKGl0ZW0sIHNlbGVjdGVkSXRlbXNUYXJnZXQpLCAncC1kaXNhYmxlZCc6IGRpc2FibGVkIH1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBSaXBwbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZGtEcmFnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lkXT1cImlkVGFyZ2V0ICsgJ18nICsgaVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiaXRlbUNsYXNzKGl0ZW0sIGlkVGFyZ2V0ICsgJ18nICsgaSwgc2VsZWN0ZWRJdGVtc1RhcmdldClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtjZGtEcmFnRGF0YV09XCJpdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbY2RrRHJhZ0Rpc2FibGVkXT1cIiFkcmFnZHJvcFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uSXRlbUNsaWNrKCRldmVudCwgaXRlbSwgc2VsZWN0ZWRJdGVtc1RhcmdldCwgb25UYXJnZXRTZWxlY3QsIGlkVGFyZ2V0ICsgJ18nICsgaSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChtb3VzZWRvd24pPVwib25PcHRpb25Nb3VzZURvd24oaSwgVEFSR0VUX0xJU1QpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZGJsY2xpY2spPVwib25UYXJnZXRJdGVtRGJsQ2xpY2soKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRvdWNoZW5kKT1cIm9uSXRlbVRvdWNoRW5kKClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiaXNJdGVtVmlzaWJsZShpdGVtLCBUQVJHRVRfTElTVClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU9XCJvcHRpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInaXRlbSdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtc2VsZWN0ZWRdPVwiaXNTZWxlY3RlZChpdGVtLCBzZWxlY3RlZEl0ZW1zVGFyZ2V0KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIml0ZW1UZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IGl0ZW0sIGluZGV4OiBpIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc0VtcHR5KFRBUkdFVF9MSVNUKSAmJiAoZW1wdHlNZXNzYWdlVGFyZ2V0VGVtcGxhdGUgfHwgZW1wdHlGaWx0ZXJNZXNzYWdlVGFyZ2V0VGVtcGxhdGUpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJwLXBpY2tsaXN0LWVtcHR5LW1lc3NhZ2VcIiAqbmdJZj1cIiFmaWx0ZXJWYWx1ZVRhcmdldCB8fCAhZW1wdHlGaWx0ZXJNZXNzYWdlVGFyZ2V0VGVtcGxhdGVcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3RhcmdldEVtcHR5TWVzc2FnZSdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZW1wdHlNZXNzYWdlVGFyZ2V0VGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJwLXBpY2tsaXN0LWVtcHR5LW1lc3NhZ2VcIiAqbmdJZj1cImZpbHRlclZhbHVlVGFyZ2V0XCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIid0YXJnZXRFbXB0eU1lc3NhZ2UnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImVtcHR5RmlsdGVyTWVzc2FnZVRhcmdldFRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1waWNrbGlzdC1idXR0b25zIHAtcGlja2xpc3QtdGFyZ2V0LWNvbnRyb2xzXCIgKm5nSWY9XCJzaG93VGFyZ2V0Q29udHJvbHNcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3RhcmdldENvbnRyb2xzJ1wiIFthdHRyLmRhdGEtcGMtZ3JvdXAtc2VjdGlvbl09XCInY29udHJvbHMnXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJtb3ZlVXBBcmlhTGFiZWxcIlxuICAgICAgICAgICAgICAgICAgICBwQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHBSaXBwbGVcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLWJ1dHRvbi1pY29uLW9ubHlcIlxuICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwidGFyZ2V0TW92ZURpc2FibGVkKClcIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwibW92ZVVwKHRhcmdldGxpc3QsIHRhcmdldCwgc2VsZWN0ZWRJdGVtc1RhcmdldCwgb25UYXJnZXRSZW9yZGVyLCBUQVJHRVRfTElTVClcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3RhcmdldE1vdmVVcEJ1dHRvbidcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPEFuZ2xlVXBJY29uICpuZ0lmPVwiIW1vdmVVcEljb25UZW1wbGF0ZVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInbW92ZXVwaWNvbidcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJtb3ZlVXBJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwibW92ZVRvcEFyaWFMYWJlbFwiXG4gICAgICAgICAgICAgICAgICAgIHBCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgcFJpcHBsZVxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInAtYnV0dG9uLWljb24tb25seVwiXG4gICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJ0YXJnZXRNb3ZlRGlzYWJsZWQoKVwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJtb3ZlVG9wKHRhcmdldGxpc3QsIHRhcmdldCwgc2VsZWN0ZWRJdGVtc1RhcmdldCwgb25UYXJnZXRSZW9yZGVyLCBUQVJHRVRfTElTVClcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3RhcmdldE1vdmVUb3BCdXR0b24nXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxBbmdsZURvdWJsZVVwSWNvbiAqbmdJZj1cIiFtb3ZlVG9wSWNvblRlbXBsYXRlXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidtb3ZldG9waWNvbidcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJtb3ZlVG9wSWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIm1vdmVEb3duQXJpYUxhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgcEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBwUmlwcGxlXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1idXR0b24taWNvbi1vbmx5XCJcbiAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cInRhcmdldE1vdmVEaXNhYmxlZCgpXCJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm1vdmVEb3duKHRhcmdldGxpc3QsIHRhcmdldCwgc2VsZWN0ZWRJdGVtc1RhcmdldCwgb25UYXJnZXRSZW9yZGVyLCBUQVJHRVRfTElTVClcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3RhcmdldE1vdmVEb3duQnV0dG9uJ1wiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8QW5nbGVEb3duSWNvbiAqbmdJZj1cIiFtb3ZlRG93bkljb25UZW1wbGF0ZVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInbW92ZWRvd25pY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cIm1vdmVEb3duSWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIm1vdmVCb3R0b21BcmlhTGFiZWxcIlxuICAgICAgICAgICAgICAgICAgICBwQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHBSaXBwbGVcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLWJ1dHRvbi1pY29uLW9ubHlcIlxuICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwidGFyZ2V0TW92ZURpc2FibGVkKClcIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwibW92ZUJvdHRvbSh0YXJnZXRsaXN0LCB0YXJnZXQsIHNlbGVjdGVkSXRlbXNUYXJnZXQsIG9uVGFyZ2V0UmVvcmRlciwgVEFSR0VUX0xJU1QpXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIid0YXJnZXRNb3ZlQm90dG9tQnV0dG9uJ1wiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8QW5nbGVEb3VibGVEb3duSWNvbiAqbmdJZj1cIiFtb3ZlQm90dG9tSWNvblRlbXBsYXRlXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidtb3ZlYm90dG9taWNvbidcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJtb3ZlQm90dG9tSWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vcGlja2xpc3QuY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFBpY2tMaXN0IGltcGxlbWVudHMgQWZ0ZXJWaWV3Q2hlY2tlZCwgQWZ0ZXJDb250ZW50SW5pdCB7XG4gICAgLyoqXG4gICAgICogQW4gYXJyYXkgb2Ygb2JqZWN0cyBmb3IgdGhlIHNvdXJjZSBsaXN0LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNvdXJjZTogYW55W10gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogQW4gYXJyYXkgb2Ygb2JqZWN0cyBmb3IgdGhlIHRhcmdldCBsaXN0LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHRhcmdldDogYW55W10gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogVGV4dCBmb3IgdGhlIHNvdXJjZSBsaXN0IGNhcHRpb25cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzb3VyY2VIZWFkZXI6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJbmRleCBvZiB0aGUgZWxlbWVudCBpbiB0YWJiaW5nIG9yZGVyLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHRhYmluZGV4OiBudW1iZXIgfCB1bmRlZmluZWQgPSAwO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgYSBzdHJpbmcgdGhhdCBsYWJlbHMgdGhlIG1vdmUgdG8gcmlnaHQgYnV0dG9uIGZvciBhY2Nlc3NpYmlsaXR5LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHJpZ2h0QnV0dG9uQXJpYUxhYmVsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBhIHN0cmluZyB0aGF0IGxhYmVscyB0aGUgbW92ZSB0byBsZWZ0IGJ1dHRvbiBmb3IgYWNjZXNzaWJpbGl0eS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBsZWZ0QnV0dG9uQXJpYUxhYmVsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBhIHN0cmluZyB0aGF0IGxhYmVscyB0aGUgbW92ZSB0byBhbGwgcmlnaHQgYnV0dG9uIGZvciBhY2Nlc3NpYmlsaXR5LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGFsbFJpZ2h0QnV0dG9uQXJpYUxhYmVsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBhIHN0cmluZyB0aGF0IGxhYmVscyB0aGUgbW92ZSB0byBhbGwgbGVmdCBidXR0b24gZm9yIGFjY2Vzc2liaWxpdHkuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgYWxsTGVmdEJ1dHRvbkFyaWFMYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgYSBzdHJpbmcgdGhhdCBsYWJlbHMgdGhlIG1vdmUgdG8gdXAgYnV0dG9uIGZvciBhY2Nlc3NpYmlsaXR5LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHVwQnV0dG9uQXJpYUxhYmVsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBhIHN0cmluZyB0aGF0IGxhYmVscyB0aGUgbW92ZSB0byBkb3duIGJ1dHRvbiBmb3IgYWNjZXNzaWJpbGl0eS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBkb3duQnV0dG9uQXJpYUxhYmVsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBhIHN0cmluZyB0aGF0IGxhYmVscyB0aGUgbW92ZSB0byB0b3AgYnV0dG9uIGZvciBhY2Nlc3NpYmlsaXR5LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHRvcEJ1dHRvbkFyaWFMYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgYSBzdHJpbmcgdGhhdCBsYWJlbHMgdGhlIG1vdmUgdG8gYm90dG9tIGJ1dHRvbiBmb3IgYWNjZXNzaWJpbGl0eS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBib3R0b21CdXR0b25BcmlhTGFiZWw6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBUZXh0IGZvciB0aGUgdGFyZ2V0IGxpc3QgY2FwdGlvblxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHRhcmdldEhlYWRlcjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZW4gZW5hYmxlZCBvcmRlcmxpc3QgYWRqdXN0cyBpdHMgY29udHJvbHMgYmFzZWQgb24gc2NyZWVuIHNpemUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgcmVzcG9uc2l2ZTogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGVuIHNwZWNpZmllZCBkaXNwbGF5cyBhbiBpbnB1dCBmaWVsZCB0byBmaWx0ZXIgdGhlIGl0ZW1zIG9uIGtleXVwIGFuZCBkZWNpZGVzIHdoaWNoIGZpZWxkIHRvIHNlYXJjaCAoQWNjZXB0cyBtdWx0aXBsZSBmaWVsZHMgd2l0aCBhIGNvbW1hKS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBmaWx0ZXJCeTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIExvY2FsZSB0byB1c2UgaW4gZmlsdGVyaW5nLiBUaGUgZGVmYXVsdCBsb2NhbGUgaXMgdGhlIGhvc3QgZW52aXJvbm1lbnQncyBjdXJyZW50IGxvY2FsZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBmaWx0ZXJMb2NhbGU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBvcHRpbWl6ZSB0aGUgZG9tIG9wZXJhdGlvbnMgYnkgZGVsZWdhdGluZyB0byBuZ0ZvclRyYWNrQnksIGRlZmF1bHQgYWxnb3JpdGhtIGNoZWNrcyBmb3Igb2JqZWN0IGlkZW50aXR5LiBVc2Ugc291cmNlVHJhY2tCeSBvciB0YXJnZXRUcmFja0J5IGluIGNhc2UgZGlmZmVyZW50IGFsZ29yaXRobXMgYXJlIG5lZWRlZCBwZXIgbGlzdC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0cmFja0J5OiBGdW5jdGlvbiA9IChpbmRleDogbnVtYmVyLCBpdGVtOiBhbnkpID0+IGl0ZW07XG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gb3B0aW1pemUgdGhlIGRvbSBvcGVyYXRpb25zIGJ5IGRlbGVnYXRpbmcgdG8gbmdGb3JUcmFja0J5IGluIHNvdXJjZSBsaXN0LCBkZWZhdWx0IGFsZ29yaXRobSBjaGVja3MgZm9yIG9iamVjdCBpZGVudGl0eS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzb3VyY2VUcmFja0J5OiBGdW5jdGlvbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBvcHRpbWl6ZSB0aGUgZG9tIG9wZXJhdGlvbnMgYnkgZGVsZWdhdGluZyB0byBuZ0ZvclRyYWNrQnkgaW4gdGFyZ2V0IGxpc3QsIGRlZmF1bHQgYWxnb3JpdGhtIGNoZWNrcyBmb3Igb2JqZWN0IGlkZW50aXR5LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHRhcmdldFRyYWNrQnk6IEZ1bmN0aW9uIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gc2hvdyBmaWx0ZXIgaW5wdXQgZm9yIHNvdXJjZSBsaXN0IHdoZW4gZmlsdGVyQnkgaXMgZW5hYmxlZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzaG93U291cmNlRmlsdGVyOiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIHNob3cgZmlsdGVyIGlucHV0IGZvciB0YXJnZXQgbGlzdCB3aGVuIGZpbHRlckJ5IGlzIGVuYWJsZWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc2hvd1RhcmdldEZpbHRlcjogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBob3cgbXVsdGlwbGUgaXRlbXMgY2FuIGJlIHNlbGVjdGVkLCB3aGVuIHRydWUgbWV0YUtleSBuZWVkcyB0byBiZSBwcmVzc2VkIHRvIHNlbGVjdCBvciB1bnNlbGVjdCBhbiBpdGVtIGFuZCB3aGVuIHNldCB0byBmYWxzZSBzZWxlY3Rpb24gb2YgZWFjaCBpdGVtIGNhbiBiZSB0b2dnbGVkIGluZGl2aWR1YWxseS4gT24gdG91Y2ggZW5hYmxlZCBkZXZpY2VzLCBtZXRhS2V5U2VsZWN0aW9uIGlzIHR1cm5lZCBvZmYgYXV0b21hdGljYWxseS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBtZXRhS2V5U2VsZWN0aW9uOiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIGVuYWJsZSBkcmFnZHJvcCBiYXNlZCByZW9yZGVyaW5nLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGRyYWdkcm9wOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogSW5saW5lIHN0eWxlIG9mIHRoZSBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGU6IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSB8IG51bGwgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU3R5bGUgY2xhc3Mgb2YgdGhlIGNvbXBvbmVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSW5saW5lIHN0eWxlIG9mIHRoZSBzb3VyY2UgbGlzdCBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNvdXJjZVN0eWxlOiBhbnk7XG4gICAgLyoqXG4gICAgICogSW5saW5lIHN0eWxlIG9mIHRoZSB0YXJnZXQgbGlzdCBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHRhcmdldFN0eWxlOiBhbnk7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBzaG93IGJ1dHRvbnMgb2Ygc291cmNlIGxpc3QuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc2hvd1NvdXJjZUNvbnRyb2xzOiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIHNob3cgYnV0dG9ucyBvZiB0YXJnZXQgbGlzdC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzaG93VGFyZ2V0Q29udHJvbHM6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIFBsYWNlaG9sZGVyIHRleHQgb24gc291cmNlIGZpbHRlciBpbnB1dC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzb3VyY2VGaWx0ZXJQbGFjZWhvbGRlcjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFBsYWNlaG9sZGVyIHRleHQgb24gdGFyZ2V0IGZpbHRlciBpbnB1dC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0YXJnZXRGaWx0ZXJQbGFjZWhvbGRlcjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZW4gcHJlc2VudCwgaXQgc3BlY2lmaWVzIHRoYXQgdGhlIGNvbXBvbmVudCBzaG91bGQgYmUgZGlzYWJsZWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGEgc3RyaW5nIHRoYXQgbGFiZWxzIHRoZSBmaWx0ZXIgaW5wdXQgb2Ygc291cmNlIGxpc3QuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgYXJpYVNvdXJjZUZpbHRlckxhYmVsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBhIHN0cmluZyB0aGF0IGxhYmVscyB0aGUgZmlsdGVyIGlucHV0IG9mIHRhcmdldCBsaXN0LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGFyaWFUYXJnZXRGaWx0ZXJMYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgaG93IHRoZSBpdGVtcyBhcmUgZmlsdGVyZWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZmlsdGVyTWF0Y2hNb2RlOiAnY29udGFpbnMnIHwgJ3N0YXJ0c1dpdGgnIHwgJ2VuZHNXaXRoJyB8ICdlcXVhbHMnIHwgJ25vdEVxdWFscycgfCAnaW4nIHwgJ2x0JyB8ICdsdGUnIHwgJ2d0JyB8ICdndGUnID0gJ2NvbnRhaW5zJztcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIGRpc3BsYXlzIHJvd3Mgd2l0aCBhbHRlcm5hdGluZyBjb2xvcnMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3RyaXBlZFJvd3M6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogS2VlcHMgc2VsZWN0aW9uIG9uIHRoZSB0cmFuc2ZlciBsaXN0LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGtlZXBTZWxlY3Rpb246IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgdGhlIHdpZHRoIG9mIHRoZSBzY3JlZW4gYXQgd2hpY2ggdGhlIGNvbXBvbmVudCBzaG91bGQgY2hhbmdlIGl0cyBiZWhhdmlvci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgYnJlYWtwb2ludCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fYnJlYWtwb2ludDtcbiAgICB9XG4gICAgc2V0IGJyZWFrcG9pbnQodmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMuX2JyZWFrcG9pbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX2JyZWFrcG9pbnQgPSB2YWx1ZTtcbiAgICAgICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXN0cm95TWVkaWEoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRNZWRpYSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGl0ZW1zIGFyZSBtb3ZlZCBmcm9tIHRhcmdldCB0byBzb3VyY2UuXG4gICAgICogQHBhcmFtIHtQaWNrTGlzdE1vdmVUb1NvdXJjZUV2ZW50fSBldmVudCAtIEN1c3RvbSBtb3ZlIHRvIHNvdXJjZSBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25Nb3ZlVG9Tb3VyY2U6IEV2ZW50RW1pdHRlcjxQaWNrTGlzdE1vdmVUb1NvdXJjZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8UGlja0xpc3RNb3ZlVG9Tb3VyY2VFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBhbGwgaXRlbXMgYXJlIG1vdmVkIGZyb20gdGFyZ2V0IHRvIHNvdXJjZS5cbiAgICAgKiBAcGFyYW0ge1BpY2tMaXN0TW92ZUFsbFRvU291cmNlRXZlbnR9IGV2ZW50IC0gQ3VzdG9tIG1vdmUgYWxsIHRvIHNvdXJjZSBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25Nb3ZlQWxsVG9Tb3VyY2U6IEV2ZW50RW1pdHRlcjxQaWNrTGlzdE1vdmVBbGxUb1NvdXJjZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8UGlja0xpc3RNb3ZlQWxsVG9Tb3VyY2VFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBhbGwgaXRlbXMgYXJlIG1vdmVkIGZyb20gc291cmNlIHRvIHRhcmdldC5cbiAgICAgKiBAcGFyYW0ge1BpY2tMaXN0TW92ZUFsbFRvVGFyZ2V0RXZlbnR9IGV2ZW50IC0gQ3VzdG9tIG1vdmUgYWxsIHRvIHRhcmdldCBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25Nb3ZlQWxsVG9UYXJnZXQ6IEV2ZW50RW1pdHRlcjxQaWNrTGlzdE1vdmVBbGxUb1RhcmdldEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8UGlja0xpc3RNb3ZlQWxsVG9UYXJnZXRFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBpdGVtcyBhcmUgbW92ZWQgZnJvbSBzb3VyY2UgdG8gdGFyZ2V0LlxuICAgICAqIEBwYXJhbSB7UGlja0xpc3RNb3ZlVG9UYXJnZXRFdmVudH0gZXZlbnQgLSBDdXN0b20gbW92ZSB0byB0YXJnZXQgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uTW92ZVRvVGFyZ2V0OiBFdmVudEVtaXR0ZXI8UGlja0xpc3RNb3ZlVG9UYXJnZXRFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFBpY2tMaXN0TW92ZVRvVGFyZ2V0RXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gaXRlbXMgYXJlIHJlb3JkZXJlZCB3aXRoaW4gc291cmNlIGxpc3QuXG4gICAgICogQHBhcmFtIHtQaWNrTGlzdFNvdXJjZVJlb3JkZXJFdmVudH0gZXZlbnQgLSBDdXN0b20gc291cmNlIHJlb3JkZXIgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uU291cmNlUmVvcmRlcjogRXZlbnRFbWl0dGVyPFBpY2tMaXN0U291cmNlUmVvcmRlckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8UGlja0xpc3RTb3VyY2VSZW9yZGVyRXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gaXRlbXMgYXJlIHJlb3JkZXJlZCB3aXRoaW4gdGFyZ2V0IGxpc3QuXG4gICAgICogQHBhcmFtIHtQaWNrTGlzdFRhcmdldFJlb3JkZXJFdmVudH0gZXZlbnQgLSBDdXN0b20gdGFyZ2V0IHJlb3JkZXIgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uVGFyZ2V0UmVvcmRlcjogRXZlbnRFbWl0dGVyPFBpY2tMaXN0VGFyZ2V0UmVvcmRlckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8UGlja0xpc3RUYXJnZXRSZW9yZGVyRXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gaXRlbXMgYXJlIHNlbGVjdGVkIHdpdGhpbiBzb3VyY2UgbGlzdC5cbiAgICAgKiBAcGFyYW0ge1BpY2tMaXN0U291cmNlU2VsZWN0RXZlbnR9IGV2ZW50IC0gQ3VzdG9tIHNvdXJjZSBzZWxlY3QgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uU291cmNlU2VsZWN0OiBFdmVudEVtaXR0ZXI8UGlja0xpc3RTb3VyY2VTZWxlY3RFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFBpY2tMaXN0U291cmNlU2VsZWN0RXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gaXRlbXMgYXJlIHNlbGVjdGVkIHdpdGhpbiB0YXJnZXQgbGlzdC5cbiAgICAgKiBAcGFyYW0ge1BpY2tMaXN0VGFyZ2V0U2VsZWN0RXZlbnR9IGV2ZW50IC0gQ3VzdG9tIHRhcmdldCBzZWxlY3QgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uVGFyZ2V0U2VsZWN0OiBFdmVudEVtaXR0ZXI8UGlja0xpc3RUYXJnZXRTZWxlY3RFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFBpY2tMaXN0VGFyZ2V0U2VsZWN0RXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gdGhlIHNvdXJjZSBsaXN0IGlzIGZpbHRlcmVkXG4gICAgICogQHBhcmFtIHtQaWNrTGlzdFNvdXJjZUZpbHRlckV2ZW50fSBldmVudCAtIEN1c3RvbSBzb3VyY2UgZmlsdGVyIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvblNvdXJjZUZpbHRlcjogRXZlbnRFbWl0dGVyPFBpY2tMaXN0U291cmNlRmlsdGVyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxQaWNrTGlzdFNvdXJjZUZpbHRlckV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIHRoZSB0YXJnZXQgbGlzdCBpcyBmaWx0ZXJlZFxuICAgICAqIEBwYXJhbSB7UGlja0xpc3RUYXJnZXRGaWx0ZXJFdmVudH0gZXZlbnQgLSBDdXN0b20gdGFyZ2V0IGZpbHRlciBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25UYXJnZXRGaWx0ZXI6IEV2ZW50RW1pdHRlcjxQaWNrTGlzdFRhcmdldEZpbHRlckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8UGlja0xpc3RUYXJnZXRGaWx0ZXJFdmVudD4oKTtcblxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIHRoZSBsaXN0IGlzIGZvY3VzZWRcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIEJyb3dzZXIgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uRm9jdXM6IEV2ZW50RW1pdHRlcjxFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50PigpO1xuXG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gdGhlIGxpc3QgaXMgYmx1cnJlZFxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gQnJvd3NlciBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25CbHVyOiBFdmVudEVtaXR0ZXI8RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudD4oKTtcblxuICAgIEBWaWV3Q2hpbGQoJ3NvdXJjZWxpc3QnKSBsaXN0Vmlld1NvdXJjZUNoaWxkOiBOdWxsYWJsZTxFbGVtZW50UmVmPjtcblxuICAgIEBWaWV3Q2hpbGQoJ3RhcmdldGxpc3QnKSBsaXN0Vmlld1RhcmdldENoaWxkOiBOdWxsYWJsZTxFbGVtZW50UmVmPjtcblxuICAgIEBWaWV3Q2hpbGQoJ3NvdXJjZUZpbHRlcicpIHNvdXJjZUZpbHRlclZpZXdDaGlsZDogTnVsbGFibGU8RWxlbWVudFJlZj47XG5cbiAgICBAVmlld0NoaWxkKCd0YXJnZXRGaWx0ZXInKSB0YXJnZXRGaWx0ZXJWaWV3Q2hpbGQ6IE51bGxhYmxlPEVsZW1lbnRSZWY+O1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IE51bGxhYmxlPFF1ZXJ5TGlzdDxQcmltZVRlbXBsYXRlPj47XG5cbiAgICBnZXQgbW92ZVVwQXJpYUxhYmVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy51cEJ1dHRvbkFyaWFMYWJlbCA/IHRoaXMudXBCdXR0b25BcmlhTGFiZWwgOiB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhID8gdGhpcy5jb25maWcudHJhbnNsYXRpb24uYXJpYS5tb3ZlVXAgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZ2V0IG1vdmVUb3BBcmlhTGFiZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRvcEJ1dHRvbkFyaWFMYWJlbCA/IHRoaXMudG9wQnV0dG9uQXJpYUxhYmVsIDogdGhpcy5jb25maWcudHJhbnNsYXRpb24uYXJpYSA/IHRoaXMuY29uZmlnLnRyYW5zbGF0aW9uLmFyaWEubW92ZVRvcCA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBnZXQgbW92ZURvd25BcmlhTGFiZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRvd25CdXR0b25BcmlhTGFiZWwgPyB0aGlzLmRvd25CdXR0b25BcmlhTGFiZWwgOiB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhID8gdGhpcy5jb25maWcudHJhbnNsYXRpb24uYXJpYS5tb3ZlRG93biA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBnZXQgbW92ZUJvdHRvbUFyaWFMYWJlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYm90dG9tQnV0dG9uQXJpYUxhYmVsID8gdGhpcy5ib3R0b21CdXR0b25BcmlhTGFiZWwgOiB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhID8gdGhpcy5jb25maWcudHJhbnNsYXRpb24uYXJpYS5tb3ZlRG93biA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBnZXQgbW92ZVRvVGFyZ2V0QXJpYUxhYmVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yaWdodEJ1dHRvbkFyaWFMYWJlbCA/IHRoaXMucmlnaHRCdXR0b25BcmlhTGFiZWwgOiB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhID8gdGhpcy5jb25maWcudHJhbnNsYXRpb24uYXJpYS5tb3ZlVG9UYXJnZXQgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZ2V0IG1vdmVBbGxUb1RhcmdldEFyaWFMYWJlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWxsUmlnaHRCdXR0b25BcmlhTGFiZWwgPyB0aGlzLmFsbFJpZ2h0QnV0dG9uQXJpYUxhYmVsIDogdGhpcy5jb25maWcudHJhbnNsYXRpb24uYXJpYSA/IHRoaXMuY29uZmlnLnRyYW5zbGF0aW9uLmFyaWEubW92ZUFsbFRvVGFyZ2V0IDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGdldCBtb3ZlVG9Tb3VyY2VBcmlhTGFiZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFsbExlZnRCdXR0b25BcmlhTGFiZWwgPyB0aGlzLmFsbExlZnRCdXR0b25BcmlhTGFiZWwgOiB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhID8gdGhpcy5jb25maWcudHJhbnNsYXRpb24uYXJpYS5tb3ZlVG9Tb3VyY2UgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZ2V0IG1vdmVBbGxUb1NvdXJjZUFyaWFMYWJlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWxsTGVmdEJ1dHRvbkFyaWFMYWJlbCA/IHRoaXMuYWxsTGVmdEJ1dHRvbkFyaWFMYWJlbCA6IHRoaXMuY29uZmlnLnRyYW5zbGF0aW9uLmFyaWEgPyB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhLm1vdmVBbGxUb1NvdXJjZSA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBnZXQgaWRTb3VyY2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlkICsgJ19zb3VyY2UnO1xuICAgIH1cblxuICAgIGdldCBpZFRhcmdldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaWQgKyAnX3RhcmdldCc7XG4gICAgfVxuXG4gICAgZ2V0IGZvY3VzZWRPcHRpb25JZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4ICE9PSAtMSA/IHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4IDogbnVsbDtcbiAgICB9XG5cbiAgICBfYnJlYWtwb2ludDogc3RyaW5nID0gJzk2MHB4JztcblxuICAgIHB1YmxpYyBpdGVtVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBtb3ZlVG9wSWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIG1vdmVVcEljb25UZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBtb3ZlRG93bkljb25UZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBtb3ZlQm90dG9tSWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIG1vdmVUb1RhcmdldEljb25UZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBtb3ZlQWxsVG9UYXJnZXRJY29uVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgbW92ZVRvU291cmNlSWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIG1vdmVBbGxUb1NvdXJjZUljb25UZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICB0YXJnZXRGaWx0ZXJJY29uVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgc291cmNlRmlsdGVySWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIHB1YmxpYyB2aXNpYmxlT3B0aW9uc1NvdXJjZTogYW55W10gfCB1bmRlZmluZWQgfCBudWxsO1xuXG4gICAgcHVibGljIHZpc2libGVPcHRpb25zVGFyZ2V0OiBhbnlbXSB8IHVuZGVmaW5lZCB8IG51bGw7XG5cbiAgICBzZWxlY3RlZEl0ZW1zU291cmNlOiBhbnlbXSA9IFtdO1xuXG4gICAgc2VsZWN0ZWRJdGVtc1RhcmdldDogYW55W10gPSBbXTtcblxuICAgIHJlb3JkZXJlZExpc3RFbGVtZW50OiBhbnk7XG5cbiAgICBtb3ZlZFVwOiBOdWxsYWJsZTxib29sZWFuPjtcblxuICAgIG1vdmVkRG93bjogTnVsbGFibGU8Ym9vbGVhbj47XG5cbiAgICBpdGVtVG91Y2hlZDogTnVsbGFibGU8Ym9vbGVhbj47XG5cbiAgICBzdHlsZUVsZW1lbnQ6IGFueTtcblxuICAgIGlkOiBzdHJpbmcgPSBVbmlxdWVDb21wb25lbnRJZCgpO1xuXG4gICAgZmlsdGVyVmFsdWVTb3VyY2U6IE51bGxhYmxlPHN0cmluZz47XG5cbiAgICBmaWx0ZXJWYWx1ZVRhcmdldDogTnVsbGFibGU8c3RyaW5nPjtcblxuICAgIGZyb21MaXN0VHlwZTogTnVsbGFibGU8bnVtYmVyPjtcblxuICAgIGVtcHR5TWVzc2FnZVNvdXJjZVRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGVtcHR5RmlsdGVyTWVzc2FnZVNvdXJjZVRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGVtcHR5TWVzc2FnZVRhcmdldFRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGVtcHR5RmlsdGVyTWVzc2FnZVRhcmdldFRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIHNvdXJjZUhlYWRlclRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIHRhcmdldEhlYWRlclRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIHNvdXJjZUZpbHRlclRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIHRhcmdldEZpbHRlclRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIHNvdXJjZUZpbHRlck9wdGlvbnM6IE51bGxhYmxlPFBpY2tMaXN0RmlsdGVyT3B0aW9ucz47XG5cbiAgICB0YXJnZXRGaWx0ZXJPcHRpb25zOiBOdWxsYWJsZTxQaWNrTGlzdEZpbHRlck9wdGlvbnM+O1xuXG4gICAgcmVhZG9ubHkgU09VUkNFX0xJU1Q6IG51bWJlciA9IC0xO1xuXG4gICAgcmVhZG9ubHkgVEFSR0VUX0xJU1Q6IG51bWJlciA9IDE7XG5cbiAgICB3aW5kb3c6IFdpbmRvdztcblxuICAgIG1lZGlhOiBNZWRpYVF1ZXJ5TGlzdCB8IG51bGwgfCB1bmRlZmluZWQ7XG5cbiAgICB2aWV3Q2hhbmdlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIGZvY3VzZWRPcHRpb25JbmRleDogYW55ID0gLTE7XG5cbiAgICBmb2N1c2VkT3B0aW9uOiBhbnkgfCB1bmRlZmluZWQ7XG5cbiAgICBmb2N1c2VkOiBhbnkgPSB7XG4gICAgICAgIHNvdXJjZUxpc3Q6IGZhbHNlLFxuICAgICAgICB0YXJnZXRMaXN0OiBmYWxzZVxuICAgIH07XG5cbiAgICBtZWRpYUNoYW5nZUxpc3RlbmVyOiBWb2lkTGlzdGVuZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQsXG4gICAgICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogYW55LFxuICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgIHB1YmxpYyBlbDogRWxlbWVudFJlZixcbiAgICAgICAgcHVibGljIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHVibGljIGZpbHRlclNlcnZpY2U6IEZpbHRlclNlcnZpY2UsXG4gICAgICAgIHB1YmxpYyBjb25maWc6IFByaW1lTkdDb25maWdcbiAgICApIHtcbiAgICAgICAgdGhpcy53aW5kb3cgPSB0aGlzLmRvY3VtZW50LmRlZmF1bHRWaWV3IGFzIFdpbmRvdztcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVzcG9uc2l2ZSkge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVTdHlsZSgpO1xuICAgICAgICAgICAgdGhpcy5pbml0TWVkaWEoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmZpbHRlckJ5KSB7XG4gICAgICAgICAgICB0aGlzLnNvdXJjZUZpbHRlck9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyOiAodmFsdWUpID0+IHRoaXMuZmlsdGVyU291cmNlKHZhbHVlKSxcbiAgICAgICAgICAgICAgICByZXNldDogKCkgPT4gdGhpcy5yZXNldFNvdXJjZUZpbHRlcigpXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLnRhcmdldEZpbHRlck9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyOiAodmFsdWUpID0+IHRoaXMuZmlsdGVyVGFyZ2V0KHZhbHVlKSxcbiAgICAgICAgICAgICAgICByZXNldDogKCkgPT4gdGhpcy5yZXNldFRhcmdldEZpbHRlcigpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICAodGhpcy50ZW1wbGF0ZXMgYXMgUXVlcnlMaXN0PFByaW1lVGVtcGxhdGU+KS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnaXRlbSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdzb3VyY2VIZWFkZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvdXJjZUhlYWRlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICd0YXJnZXRIZWFkZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldEhlYWRlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdzb3VyY2VGaWx0ZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvdXJjZUZpbHRlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICd0YXJnZXRGaWx0ZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldEZpbHRlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdlbXB0eW1lc3NhZ2Vzb3VyY2UnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtcHR5TWVzc2FnZVNvdXJjZVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdlbXB0eWZpbHRlcm1lc3NhZ2Vzb3VyY2UnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtcHR5RmlsdGVyTWVzc2FnZVNvdXJjZVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdlbXB0eW1lc3NhZ2V0YXJnZXQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtcHR5TWVzc2FnZVRhcmdldFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdlbXB0eWZpbHRlcm1lc3NhZ2V0YXJnZXQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtcHR5RmlsdGVyTWVzc2FnZVRhcmdldFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdtb3ZldXBpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlVXBJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ21vdmV0b3BpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlVG9wSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdtb3ZlZG93bmljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVEb3duSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdtb3ZlYm90dG9taWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUJvdHRvbUljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnbW92ZXRvdGFyZ2V0aWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZVRvVGFyZ2V0SWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdtb3ZlYWxsdG90YXJnZXRpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWxsVG9UYXJnZXRJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ21vdmV0b3NvdXJjZWljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVUb1NvdXJjZUljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnbW92ZWFsbHRvc291cmNlaWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFsbFRvU291cmNlSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICd0YXJnZXRmaWx0ZXJpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXRGaWx0ZXJJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3NvdXJjZWZpbHRlcmljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvdXJjZUZpbHRlckljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xuICAgICAgICBpZiAodGhpcy5tb3ZlZFVwIHx8IHRoaXMubW92ZWREb3duKSB7XG4gICAgICAgICAgICBsZXQgbGlzdEl0ZW1zID0gRG9tSGFuZGxlci5maW5kKHRoaXMucmVvcmRlcmVkTGlzdEVsZW1lbnQsICdsaS5wLWhpZ2hsaWdodCcpO1xuICAgICAgICAgICAgbGV0IGxpc3RJdGVtO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5tb3ZlZFVwKSBsaXN0SXRlbSA9IGxpc3RJdGVtc1swXTtcbiAgICAgICAgICAgIGVsc2UgbGlzdEl0ZW0gPSBsaXN0SXRlbXNbbGlzdEl0ZW1zLmxlbmd0aCAtIDFdO1xuXG4gICAgICAgICAgICBEb21IYW5kbGVyLnNjcm9sbEluVmlldyh0aGlzLnJlb3JkZXJlZExpc3RFbGVtZW50LCBsaXN0SXRlbSk7XG4gICAgICAgICAgICB0aGlzLm1vdmVkVXAgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubW92ZWREb3duID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnJlb3JkZXJlZExpc3RFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSXRlbUNsaWNrKGV2ZW50OiBFdmVudCB8IGFueSwgaXRlbTogYW55LCBzZWxlY3RlZEl0ZW1zOiBhbnlbXSwgY2FsbGJhY2s6IEV2ZW50RW1pdHRlcjxhbnk+LCBpdGVtSWQ/OiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuZmluZEluZGV4SW5MaXN0KGl0ZW0sIHNlbGVjdGVkSXRlbXMpO1xuICAgICAgICBpZiAoaXRlbUlkKSB0aGlzLmZvY3VzZWRPcHRpb25JbmRleCA9IGl0ZW1JZDtcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gaW5kZXggIT0gLTE7XG4gICAgICAgIGxldCBtZXRhU2VsZWN0aW9uID0gdGhpcy5pdGVtVG91Y2hlZCA/IGZhbHNlIDogdGhpcy5tZXRhS2V5U2VsZWN0aW9uO1xuXG4gICAgICAgIGlmIChtZXRhU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICBsZXQgbWV0YUtleSA9ICg8S2V5Ym9hcmRFdmVudD5ldmVudCkubWV0YUtleSB8fCAoPEtleWJvYXJkRXZlbnQ+ZXZlbnQpLmN0cmxLZXkgfHwgKDxLZXlib2FyZEV2ZW50PmV2ZW50KS5zaGlmdEtleTtcblxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkICYmIG1ldGFLZXkpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEl0ZW1zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICghbWV0YUtleSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEl0ZW1zLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkSXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZCkgc2VsZWN0ZWRJdGVtcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgZWxzZSBzZWxlY3RlZEl0ZW1zLnB1c2goaXRlbSk7XG4gICAgICAgIH1cblxuICAgICAgICBjYWxsYmFjay5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIGl0ZW1zOiBzZWxlY3RlZEl0ZW1zIH0pO1xuXG4gICAgICAgIHRoaXMuaXRlbVRvdWNoZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBvbk9wdGlvbk1vdXNlRG93bihpbmRleCwgbGlzdFR5cGU6IG51bWJlcikge1xuICAgICAgICB0aGlzLmZvY3VzZWRbbGlzdFR5cGUgPT09IHRoaXMuU09VUkNFX0xJU1QgPyAnc291cmNlTGlzdCcgOiAndGFyZ2V0TGlzdCddID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXggPSBpbmRleDtcbiAgICB9XG5cbiAgICBvblNvdXJjZUl0ZW1EYmxDbGljaygpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubW92ZVJpZ2h0KCk7XG4gICAgfVxuXG4gICAgb25UYXJnZXRJdGVtRGJsQ2xpY2soKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1vdmVMZWZ0KCk7XG4gICAgfVxuXG4gICAgb25GaWx0ZXIoZXZlbnQ6IEtleWJvYXJkRXZlbnQsIGxpc3RUeXBlOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IHF1ZXJ5ID0gKDxIVE1MSW5wdXRFbGVtZW50PmV2ZW50LnRhcmdldCkudmFsdWU7XG4gICAgICAgIGlmIChsaXN0VHlwZSA9PT0gdGhpcy5TT1VSQ0VfTElTVCkgdGhpcy5maWx0ZXJTb3VyY2UocXVlcnkpO1xuICAgICAgICBlbHNlIGlmIChsaXN0VHlwZSA9PT0gdGhpcy5UQVJHRVRfTElTVCkgdGhpcy5maWx0ZXJUYXJnZXQocXVlcnkpO1xuICAgIH1cblxuICAgIGZpbHRlclNvdXJjZSh2YWx1ZTogYW55ID0gJycpIHtcbiAgICAgICAgdGhpcy5maWx0ZXJWYWx1ZVNvdXJjZSA9IHZhbHVlLnRyaW0oKS50b0xvY2FsZUxvd2VyQ2FzZSh0aGlzLmZpbHRlckxvY2FsZSk7XG4gICAgICAgIHRoaXMuZmlsdGVyKDxhbnlbXT50aGlzLnNvdXJjZSwgdGhpcy5TT1VSQ0VfTElTVCk7XG4gICAgfVxuXG4gICAgZmlsdGVyVGFyZ2V0KHZhbHVlOiBhbnkgPSAnJykge1xuICAgICAgICB0aGlzLmZpbHRlclZhbHVlVGFyZ2V0ID0gdmFsdWUudHJpbSgpLnRvTG9jYWxlTG93ZXJDYXNlKHRoaXMuZmlsdGVyTG9jYWxlKTtcbiAgICAgICAgdGhpcy5maWx0ZXIoPGFueVtdPnRoaXMudGFyZ2V0LCB0aGlzLlRBUkdFVF9MSVNUKTtcbiAgICB9XG5cbiAgICBmaWx0ZXIoZGF0YTogYW55W10sIGxpc3RUeXBlOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IHNlYXJjaEZpZWxkcyA9ICg8c3RyaW5nPnRoaXMuZmlsdGVyQnkpLnNwbGl0KCcsJyk7XG5cbiAgICAgICAgaWYgKGxpc3RUeXBlID09PSB0aGlzLlNPVVJDRV9MSVNUKSB7XG4gICAgICAgICAgICB0aGlzLnZpc2libGVPcHRpb25zU291cmNlID0gdGhpcy5maWx0ZXJTZXJ2aWNlLmZpbHRlcihkYXRhLCBzZWFyY2hGaWVsZHMsIHRoaXMuZmlsdGVyVmFsdWVTb3VyY2UsIHRoaXMuZmlsdGVyTWF0Y2hNb2RlLCB0aGlzLmZpbHRlckxvY2FsZSk7XG4gICAgICAgICAgICB0aGlzLm9uU291cmNlRmlsdGVyLmVtaXQoeyBxdWVyeTogdGhpcy5maWx0ZXJWYWx1ZVNvdXJjZSwgdmFsdWU6IHRoaXMudmlzaWJsZU9wdGlvbnNTb3VyY2UgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAobGlzdFR5cGUgPT09IHRoaXMuVEFSR0VUX0xJU1QpIHtcbiAgICAgICAgICAgIHRoaXMudmlzaWJsZU9wdGlvbnNUYXJnZXQgPSB0aGlzLmZpbHRlclNlcnZpY2UuZmlsdGVyKGRhdGEsIHNlYXJjaEZpZWxkcywgdGhpcy5maWx0ZXJWYWx1ZVRhcmdldCwgdGhpcy5maWx0ZXJNYXRjaE1vZGUsIHRoaXMuZmlsdGVyTG9jYWxlKTtcbiAgICAgICAgICAgIHRoaXMub25UYXJnZXRGaWx0ZXIuZW1pdCh7IHF1ZXJ5OiB0aGlzLmZpbHRlclZhbHVlVGFyZ2V0LCB2YWx1ZTogdGhpcy52aXNpYmxlT3B0aW9uc1RhcmdldCB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzSXRlbVZpc2libGUoaXRlbTogYW55LCBsaXN0VHlwZTogbnVtYmVyKTogYm9vbGVhbiB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGlmIChsaXN0VHlwZSA9PSB0aGlzLlNPVVJDRV9MSVNUKSByZXR1cm4gdGhpcy5pc1Zpc2libGVJbkxpc3QoPGFueVtdPnRoaXMudmlzaWJsZU9wdGlvbnNTb3VyY2UsIGl0ZW0sIDxzdHJpbmc+dGhpcy5maWx0ZXJWYWx1ZVNvdXJjZSk7XG4gICAgICAgIGVsc2UgcmV0dXJuIHRoaXMuaXNWaXNpYmxlSW5MaXN0KDxhbnlbXT50aGlzLnZpc2libGVPcHRpb25zVGFyZ2V0LCBpdGVtLCA8c3RyaW5nPnRoaXMuZmlsdGVyVmFsdWVUYXJnZXQpO1xuICAgIH1cblxuICAgIGlzRW1wdHkobGlzdFR5cGU6IG51bWJlcikge1xuICAgICAgICBpZiAobGlzdFR5cGUgPT0gdGhpcy5TT1VSQ0VfTElTVCkgcmV0dXJuIHRoaXMuZmlsdGVyVmFsdWVTb3VyY2UgPyAhdGhpcy52aXNpYmxlT3B0aW9uc1NvdXJjZSB8fCB0aGlzLnZpc2libGVPcHRpb25zU291cmNlLmxlbmd0aCA9PT0gMCA6ICF0aGlzLnNvdXJjZSB8fCB0aGlzLnNvdXJjZS5sZW5ndGggPT09IDA7XG4gICAgICAgIGVsc2UgcmV0dXJuIHRoaXMuZmlsdGVyVmFsdWVUYXJnZXQgPyAhdGhpcy52aXNpYmxlT3B0aW9uc1RhcmdldCB8fCB0aGlzLnZpc2libGVPcHRpb25zVGFyZ2V0Lmxlbmd0aCA9PT0gMCA6ICF0aGlzLnRhcmdldCB8fCB0aGlzLnRhcmdldC5sZW5ndGggPT09IDA7XG4gICAgfVxuXG4gICAgaXNWaXNpYmxlSW5MaXN0KGRhdGE6IGFueVtdLCBpdGVtOiBhbnksIGZpbHRlclZhbHVlOiBzdHJpbmcpOiBib29sZWFuIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKGZpbHRlclZhbHVlICYmIGZpbHRlclZhbHVlLnRyaW0oKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtID09IGRhdGFbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkl0ZW1Ub3VjaEVuZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaXRlbVRvdWNoZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgc29ydEJ5SW5kZXhJbkxpc3QoaXRlbXM6IGFueVtdLCBsaXN0OiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIGl0ZW1zLnNvcnQoKGl0ZW0xLCBpdGVtMikgPT4gT2JqZWN0VXRpbHMuZmluZEluZGV4SW5MaXN0KGl0ZW0xLCBsaXN0KSAtIE9iamVjdFV0aWxzLmZpbmRJbmRleEluTGlzdChpdGVtMiwgbGlzdCkpO1xuICAgIH1cblxuICAgIG1vdmVVcChsaXN0RWxlbWVudDogSFRNTEVsZW1lbnQsIGxpc3Q6IGFueVtdLCBzZWxlY3RlZEl0ZW1zOiBhbnlbXSwgY2FsbGJhY2s6IEV2ZW50RW1pdHRlcjxhbnk+LCBsaXN0VHlwZTogbnVtYmVyKSB7XG4gICAgICAgIGlmIChzZWxlY3RlZEl0ZW1zICYmIHNlbGVjdGVkSXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBzZWxlY3RlZEl0ZW1zID0gdGhpcy5zb3J0QnlJbmRleEluTGlzdChzZWxlY3RlZEl0ZW1zLCBsaXN0KTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0ZWRJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW0gPSBzZWxlY3RlZEl0ZW1zW2ldO1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW1JbmRleDogbnVtYmVyID0gT2JqZWN0VXRpbHMuZmluZEluZGV4SW5MaXN0KHNlbGVjdGVkSXRlbSwgbGlzdCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRJdGVtSW5kZXggIT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZWRJdGVtID0gbGlzdFtzZWxlY3RlZEl0ZW1JbmRleF07XG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wID0gbGlzdFtzZWxlY3RlZEl0ZW1JbmRleCAtIDFdO1xuICAgICAgICAgICAgICAgICAgICBsaXN0W3NlbGVjdGVkSXRlbUluZGV4IC0gMV0gPSBtb3ZlZEl0ZW07XG4gICAgICAgICAgICAgICAgICAgIGxpc3Rbc2VsZWN0ZWRJdGVtSW5kZXhdID0gdGVtcDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmRyYWdkcm9wICYmICgodGhpcy5maWx0ZXJWYWx1ZVNvdXJjZSAmJiBsaXN0VHlwZSA9PT0gdGhpcy5TT1VSQ0VfTElTVCkgfHwgKHRoaXMuZmlsdGVyVmFsdWVUYXJnZXQgJiYgbGlzdFR5cGUgPT09IHRoaXMuVEFSR0VUX0xJU1QpKSkgdGhpcy5maWx0ZXIobGlzdCwgbGlzdFR5cGUpO1xuXG4gICAgICAgICAgICB0aGlzLm1vdmVkVXAgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5yZW9yZGVyZWRMaXN0RWxlbWVudCA9IGxpc3RFbGVtZW50O1xuICAgICAgICAgICAgY2FsbGJhY2suZW1pdCh7IGl0ZW1zOiBzZWxlY3RlZEl0ZW1zIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZVRvcChsaXN0RWxlbWVudDogSFRNTEVsZW1lbnQsIGxpc3Q6IGFueVtdLCBzZWxlY3RlZEl0ZW1zOiBhbnlbXSwgY2FsbGJhY2s6IEV2ZW50RW1pdHRlcjxhbnk+LCBsaXN0VHlwZTogbnVtYmVyKSB7XG4gICAgICAgIGlmIChzZWxlY3RlZEl0ZW1zICYmIHNlbGVjdGVkSXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBzZWxlY3RlZEl0ZW1zID0gdGhpcy5zb3J0QnlJbmRleEluTGlzdChzZWxlY3RlZEl0ZW1zLCBsaXN0KTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0ZWRJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW0gPSBzZWxlY3RlZEl0ZW1zW2ldO1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW1JbmRleDogbnVtYmVyID0gT2JqZWN0VXRpbHMuZmluZEluZGV4SW5MaXN0KHNlbGVjdGVkSXRlbSwgbGlzdCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRJdGVtSW5kZXggIT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZWRJdGVtID0gbGlzdC5zcGxpY2Uoc2VsZWN0ZWRJdGVtSW5kZXgsIDEpWzBdO1xuICAgICAgICAgICAgICAgICAgICBsaXN0LnVuc2hpZnQobW92ZWRJdGVtKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmRyYWdkcm9wICYmICgodGhpcy5maWx0ZXJWYWx1ZVNvdXJjZSAmJiBsaXN0VHlwZSA9PT0gdGhpcy5TT1VSQ0VfTElTVCkgfHwgKHRoaXMuZmlsdGVyVmFsdWVUYXJnZXQgJiYgbGlzdFR5cGUgPT09IHRoaXMuVEFSR0VUX0xJU1QpKSkgdGhpcy5maWx0ZXIobGlzdCwgbGlzdFR5cGUpO1xuXG4gICAgICAgICAgICBsaXN0RWxlbWVudC5zY3JvbGxUb3AgPSAwO1xuICAgICAgICAgICAgY2FsbGJhY2suZW1pdCh7IGl0ZW1zOiBzZWxlY3RlZEl0ZW1zIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZURvd24obGlzdEVsZW1lbnQ6IEhUTUxFbGVtZW50LCBsaXN0OiBhbnlbXSwgc2VsZWN0ZWRJdGVtczogYW55W10sIGNhbGxiYWNrOiBFdmVudEVtaXR0ZXI8YW55PiwgbGlzdFR5cGU6IG51bWJlcikge1xuICAgICAgICBpZiAoc2VsZWN0ZWRJdGVtcyAmJiBzZWxlY3RlZEl0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgc2VsZWN0ZWRJdGVtcyA9IHRoaXMuc29ydEJ5SW5kZXhJbkxpc3Qoc2VsZWN0ZWRJdGVtcywgbGlzdCk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gc2VsZWN0ZWRJdGVtcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW0gPSBzZWxlY3RlZEl0ZW1zW2ldO1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW1JbmRleDogbnVtYmVyID0gT2JqZWN0VXRpbHMuZmluZEluZGV4SW5MaXN0KHNlbGVjdGVkSXRlbSwgbGlzdCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRJdGVtSW5kZXggIT0gbGlzdC5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlZEl0ZW0gPSBsaXN0W3NlbGVjdGVkSXRlbUluZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXAgPSBsaXN0W3NlbGVjdGVkSXRlbUluZGV4ICsgMV07XG4gICAgICAgICAgICAgICAgICAgIGxpc3Rbc2VsZWN0ZWRJdGVtSW5kZXggKyAxXSA9IG1vdmVkSXRlbTtcbiAgICAgICAgICAgICAgICAgICAgbGlzdFtzZWxlY3RlZEl0ZW1JbmRleF0gPSB0ZW1wO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuZHJhZ2Ryb3AgJiYgKCh0aGlzLmZpbHRlclZhbHVlU291cmNlICYmIGxpc3RUeXBlID09PSB0aGlzLlNPVVJDRV9MSVNUKSB8fCAodGhpcy5maWx0ZXJWYWx1ZVRhcmdldCAmJiBsaXN0VHlwZSA9PT0gdGhpcy5UQVJHRVRfTElTVCkpKSB0aGlzLmZpbHRlcihsaXN0LCBsaXN0VHlwZSk7XG5cbiAgICAgICAgICAgIHRoaXMubW92ZWREb3duID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucmVvcmRlcmVkTGlzdEVsZW1lbnQgPSBsaXN0RWxlbWVudDtcbiAgICAgICAgICAgIGNhbGxiYWNrLmVtaXQoeyBpdGVtczogc2VsZWN0ZWRJdGVtcyB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVCb3R0b20obGlzdEVsZW1lbnQ6IEhUTUxFbGVtZW50LCBsaXN0OiBhbnlbXSwgc2VsZWN0ZWRJdGVtczogYW55W10sIGNhbGxiYWNrOiBFdmVudEVtaXR0ZXI8YW55PiwgbGlzdFR5cGU6IG51bWJlcikge1xuICAgICAgICBpZiAoc2VsZWN0ZWRJdGVtcyAmJiBzZWxlY3RlZEl0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgc2VsZWN0ZWRJdGVtcyA9IHRoaXMuc29ydEJ5SW5kZXhJbkxpc3Qoc2VsZWN0ZWRJdGVtcywgbGlzdCk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gc2VsZWN0ZWRJdGVtcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW0gPSBzZWxlY3RlZEl0ZW1zW2ldO1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW1JbmRleDogbnVtYmVyID0gT2JqZWN0VXRpbHMuZmluZEluZGV4SW5MaXN0KHNlbGVjdGVkSXRlbSwgbGlzdCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRJdGVtSW5kZXggIT0gbGlzdC5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlZEl0ZW0gPSBsaXN0LnNwbGljZShzZWxlY3RlZEl0ZW1JbmRleCwgMSlbMF07XG4gICAgICAgICAgICAgICAgICAgIGxpc3QucHVzaChtb3ZlZEl0ZW0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuZHJhZ2Ryb3AgJiYgKCh0aGlzLmZpbHRlclZhbHVlU291cmNlICYmIGxpc3RUeXBlID09PSB0aGlzLlNPVVJDRV9MSVNUKSB8fCAodGhpcy5maWx0ZXJWYWx1ZVRhcmdldCAmJiBsaXN0VHlwZSA9PT0gdGhpcy5UQVJHRVRfTElTVCkpKSB0aGlzLmZpbHRlcihsaXN0LCBsaXN0VHlwZSk7XG5cbiAgICAgICAgICAgIGxpc3RFbGVtZW50LnNjcm9sbFRvcCA9IGxpc3RFbGVtZW50LnNjcm9sbEhlaWdodDtcbiAgICAgICAgICAgIGNhbGxiYWNrLmVtaXQoeyBpdGVtczogc2VsZWN0ZWRJdGVtcyB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVSaWdodCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRJdGVtc1NvdXJjZSAmJiB0aGlzLnNlbGVjdGVkSXRlbXNTb3VyY2UubGVuZ3RoKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2VsZWN0ZWRJdGVtc1NvdXJjZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW0gPSB0aGlzLnNlbGVjdGVkSXRlbXNTb3VyY2VbaV07XG4gICAgICAgICAgICAgICAgaWYgKE9iamVjdFV0aWxzLmZpbmRJbmRleEluTGlzdChzZWxlY3RlZEl0ZW0sIHRoaXMudGFyZ2V0KSA9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldD8ucHVzaCh0aGlzLnNvdXJjZT8uc3BsaWNlKE9iamVjdFV0aWxzLmZpbmRJbmRleEluTGlzdChzZWxlY3RlZEl0ZW0sIHRoaXMuc291cmNlKSwgMSlbMF0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnZpc2libGVPcHRpb25zU291cmNlKSB0aGlzLnZpc2libGVPcHRpb25zU291cmNlLnNwbGljZShPYmplY3RVdGlscy5maW5kSW5kZXhJbkxpc3Qoc2VsZWN0ZWRJdGVtLCB0aGlzLnZpc2libGVPcHRpb25zU291cmNlKSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm9uTW92ZVRvVGFyZ2V0LmVtaXQoe1xuICAgICAgICAgICAgICAgIGl0ZW1zOiB0aGlzLnNlbGVjdGVkSXRlbXNTb3VyY2VcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5rZWVwU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zVGFyZ2V0ID0gWy4uLnRoaXMuc2VsZWN0ZWRJdGVtc1RhcmdldCwgLi4udGhpcy5zZWxlY3RlZEl0ZW1zU291cmNlXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zU291cmNlID0gW107XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmZpbHRlclZhbHVlVGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXIoPGFueVtdPnRoaXMudGFyZ2V0LCB0aGlzLlRBUkdFVF9MSVNUKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVBbGxSaWdodCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc291cmNlKSB7XG4gICAgICAgICAgICBsZXQgbW92ZWRJdGVtcyA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc291cmNlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNJdGVtVmlzaWJsZSh0aGlzLnNvdXJjZVtpXSwgdGhpcy5TT1VSQ0VfTElTVCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlbW92ZWRJdGVtID0gdGhpcy5zb3VyY2Uuc3BsaWNlKGksIDEpWzBdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldD8ucHVzaChyZW1vdmVkSXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIG1vdmVkSXRlbXMucHVzaChyZW1vdmVkSXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIGktLTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMub25Nb3ZlQWxsVG9UYXJnZXQuZW1pdCh7XG4gICAgICAgICAgICAgICAgaXRlbXM6IG1vdmVkSXRlbXNcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5rZWVwU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zVGFyZ2V0ID0gWy4uLnRoaXMuc2VsZWN0ZWRJdGVtc1RhcmdldCwgLi4udGhpcy5zZWxlY3RlZEl0ZW1zU291cmNlXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zU291cmNlID0gW107XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmZpbHRlclZhbHVlVGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXIoPGFueVtdPnRoaXMudGFyZ2V0LCB0aGlzLlRBUkdFVF9MSVNUKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy52aXNpYmxlT3B0aW9uc1NvdXJjZSA9IFtdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZUxlZnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkSXRlbXNUYXJnZXQgJiYgdGhpcy5zZWxlY3RlZEl0ZW1zVGFyZ2V0Lmxlbmd0aCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNlbGVjdGVkSXRlbXNUYXJnZXQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRJdGVtID0gdGhpcy5zZWxlY3RlZEl0ZW1zVGFyZ2V0W2ldO1xuICAgICAgICAgICAgICAgIGlmIChPYmplY3RVdGlscy5maW5kSW5kZXhJbkxpc3Qoc2VsZWN0ZWRJdGVtLCB0aGlzLnNvdXJjZSkgPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3VyY2U/LnB1c2godGhpcy50YXJnZXQ/LnNwbGljZShPYmplY3RVdGlscy5maW5kSW5kZXhJbkxpc3Qoc2VsZWN0ZWRJdGVtLCB0aGlzLnRhcmdldCksIDEpWzBdKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy52aXNpYmxlT3B0aW9uc1RhcmdldCkgdGhpcy52aXNpYmxlT3B0aW9uc1RhcmdldC5zcGxpY2UoT2JqZWN0VXRpbHMuZmluZEluZGV4SW5MaXN0KHNlbGVjdGVkSXRlbSwgdGhpcy52aXNpYmxlT3B0aW9uc1RhcmdldCksIDEpWzBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5vbk1vdmVUb1NvdXJjZS5lbWl0KHtcbiAgICAgICAgICAgICAgICBpdGVtczogdGhpcy5zZWxlY3RlZEl0ZW1zVGFyZ2V0XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKHRoaXMua2VlcFNlbGVjdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtc1NvdXJjZSA9IFsuLi50aGlzLnNlbGVjdGVkSXRlbXNTb3VyY2UsIC4uLnRoaXMuc2VsZWN0ZWRJdGVtc1RhcmdldF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtc1RhcmdldCA9IFtdO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5maWx0ZXJWYWx1ZVNvdXJjZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyKDxhbnlbXT50aGlzLnNvdXJjZSwgdGhpcy5TT1VSQ0VfTElTVCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3ZlQWxsTGVmdCgpIHtcbiAgICAgICAgaWYgKHRoaXMudGFyZ2V0KSB7XG4gICAgICAgICAgICBsZXQgbW92ZWRJdGVtcyA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudGFyZ2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNJdGVtVmlzaWJsZSh0aGlzLnRhcmdldFtpXSwgdGhpcy5UQVJHRVRfTElTVCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlbW92ZWRJdGVtID0gdGhpcy50YXJnZXQuc3BsaWNlKGksIDEpWzBdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvdXJjZT8ucHVzaChyZW1vdmVkSXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIG1vdmVkSXRlbXMucHVzaChyZW1vdmVkSXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIGktLTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMub25Nb3ZlQWxsVG9Tb3VyY2UuZW1pdCh7XG4gICAgICAgICAgICAgICAgaXRlbXM6IG1vdmVkSXRlbXNcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5rZWVwU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zU291cmNlID0gWy4uLnRoaXMuc2VsZWN0ZWRJdGVtc1NvdXJjZSwgLi4udGhpcy5zZWxlY3RlZEl0ZW1zVGFyZ2V0XTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zVGFyZ2V0ID0gW107XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmZpbHRlclZhbHVlU291cmNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXIoPGFueVtdPnRoaXMuc291cmNlLCB0aGlzLlNPVVJDRV9MSVNUKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy52aXNpYmxlT3B0aW9uc1RhcmdldCA9IFtdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNTZWxlY3RlZChpdGVtOiBhbnksIHNlbGVjdGVkSXRlbXM6IGFueVtdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbmRJbmRleEluTGlzdChpdGVtLCBzZWxlY3RlZEl0ZW1zKSAhPSAtMTtcbiAgICB9XG5cbiAgICBpdGVtQ2xhc3MoaXRlbSwgaWQsIHNlbGVjdGVkSXRlbXMpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdwLXBpY2tsaXN0LWl0ZW0nOiB0cnVlLFxuICAgICAgICAgICAgJ3AtaGlnaGxpZ2h0JzogdGhpcy5pc1NlbGVjdGVkKGl0ZW0sIHNlbGVjdGVkSXRlbXMpLFxuICAgICAgICAgICAgJ3AtZm9jdXMnOiBpZCA9PT0gdGhpcy5mb2N1c2VkT3B0aW9uSWRcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmaW5kSW5kZXhJbkxpc3QoaXRlbTogYW55LCBzZWxlY3RlZEl0ZW1zOiBhbnlbXSk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBPYmplY3RVdGlscy5maW5kSW5kZXhJbkxpc3QoaXRlbSwgc2VsZWN0ZWRJdGVtcyk7XG4gICAgfVxuXG4gICAgb25Ecm9wKGV2ZW50OiBDZGtEcmFnRHJvcDxzdHJpbmdbXT4sIGxpc3RUeXBlOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGlzVHJhbnNmZXIgPSBldmVudC5wcmV2aW91c0NvbnRhaW5lciAhPT0gZXZlbnQuY29udGFpbmVyO1xuICAgICAgICBsZXQgZHJvcEluZGV4ZXMgPSB0aGlzLmdldERyb3BJbmRleGVzKGV2ZW50LnByZXZpb3VzSW5kZXgsIGV2ZW50LmN1cnJlbnRJbmRleCwgbGlzdFR5cGUsIGlzVHJhbnNmZXIsIGV2ZW50Lml0ZW0uZGF0YSk7XG5cbiAgICAgICAgaWYgKGxpc3RUeXBlID09PSB0aGlzLlNPVVJDRV9MSVNUKSB7XG4gICAgICAgICAgICBpZiAoaXNUcmFuc2Zlcikge1xuICAgICAgICAgICAgICAgIHRyYW5zZmVyQXJyYXlJdGVtKGV2ZW50LnByZXZpb3VzQ29udGFpbmVyLmRhdGEsIGV2ZW50LmNvbnRhaW5lci5kYXRhLCBkcm9wSW5kZXhlcy5wcmV2aW91c0luZGV4LCBkcm9wSW5kZXhlcy5jdXJyZW50SW5kZXgpO1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW1JbmRleCA9IE9iamVjdFV0aWxzLmZpbmRJbmRleEluTGlzdChldmVudC5pdGVtLmRhdGEsIHRoaXMuc2VsZWN0ZWRJdGVtc1RhcmdldCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRJdGVtSW5kZXggIT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zVGFyZ2V0LnNwbGljZShzZWxlY3RlZEl0ZW1JbmRleCwgMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMua2VlcFNlbGVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zVGFyZ2V0LnB1c2goZXZlbnQuaXRlbS5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZpc2libGVPcHRpb25zVGFyZ2V0KSB0aGlzLnZpc2libGVPcHRpb25zVGFyZ2V0LnNwbGljZShldmVudC5wcmV2aW91c0luZGV4LCAxKTtcblxuICAgICAgICAgICAgICAgIHRoaXMub25Nb3ZlVG9Tb3VyY2UuZW1pdCh7IGl0ZW1zOiBbZXZlbnQuaXRlbS5kYXRhXSB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbW92ZUl0ZW1JbkFycmF5KGV2ZW50LmNvbnRhaW5lci5kYXRhLCBkcm9wSW5kZXhlcy5wcmV2aW91c0luZGV4LCBkcm9wSW5kZXhlcy5jdXJyZW50SW5kZXgpO1xuICAgICAgICAgICAgICAgIHRoaXMub25Tb3VyY2VSZW9yZGVyLmVtaXQoeyBpdGVtczogW2V2ZW50Lml0ZW0uZGF0YV0gfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmZpbHRlclZhbHVlU291cmNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXIoPGFueVtdPnRoaXMuc291cmNlLCB0aGlzLlNPVVJDRV9MSVNUKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChpc1RyYW5zZmVyKSB7XG4gICAgICAgICAgICAgICAgdHJhbnNmZXJBcnJheUl0ZW0oZXZlbnQucHJldmlvdXNDb250YWluZXIuZGF0YSwgZXZlbnQuY29udGFpbmVyLmRhdGEsIGRyb3BJbmRleGVzLnByZXZpb3VzSW5kZXgsIGRyb3BJbmRleGVzLmN1cnJlbnRJbmRleCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRJdGVtSW5kZXggPSBPYmplY3RVdGlscy5maW5kSW5kZXhJbkxpc3QoZXZlbnQuaXRlbS5kYXRhLCB0aGlzLnNlbGVjdGVkSXRlbXNTb3VyY2UpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkSXRlbUluZGV4ICE9IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtc1NvdXJjZS5zcGxpY2Uoc2VsZWN0ZWRJdGVtSW5kZXgsIDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmtlZXBTZWxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtc1RhcmdldC5wdXNoKGV2ZW50Lml0ZW0uZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy52aXNpYmxlT3B0aW9uc1NvdXJjZSkgdGhpcy52aXNpYmxlT3B0aW9uc1NvdXJjZS5zcGxpY2UoZXZlbnQucHJldmlvdXNJbmRleCwgMSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm9uTW92ZVRvVGFyZ2V0LmVtaXQoeyBpdGVtczogW2V2ZW50Lml0ZW0uZGF0YV0gfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1vdmVJdGVtSW5BcnJheShldmVudC5jb250YWluZXIuZGF0YSwgZHJvcEluZGV4ZXMucHJldmlvdXNJbmRleCwgZHJvcEluZGV4ZXMuY3VycmVudEluZGV4KTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uVGFyZ2V0UmVvcmRlci5lbWl0KHsgaXRlbXM6IFtldmVudC5pdGVtLmRhdGFdIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5maWx0ZXJWYWx1ZVRhcmdldCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyKDxhbnlbXT50aGlzLnRhcmdldCwgdGhpcy5UQVJHRVRfTElTVCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkxpc3RGb2N1cyhldmVudCwgbGlzdFR5cGUpIHtcbiAgICAgICAgbGV0IGxpc3RFbGVtZW50ID0gdGhpcy5nZXRMaXN0RWxlbWVudChsaXN0VHlwZSk7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkRmlyc3RJdGVtID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKGxpc3RFbGVtZW50LCAnbGkucC1waWNrbGlzdC1pdGVtLnAtaGlnaGxpZ2h0JykgfHwgRG9tSGFuZGxlci5maW5kU2luZ2xlKGxpc3RFbGVtZW50LCAnbGkucC1waWNrbGlzdC1pdGVtJyk7XG4gICAgICAgIGNvbnN0IGZpbmRJbmRleCA9IE9iamVjdFV0aWxzLmZpbmRJbmRleEluTGlzdChzZWxlY3RlZEZpcnN0SXRlbSwgbGlzdEVsZW1lbnQuY2hpbGRyZW4pO1xuXG4gICAgICAgIHRoaXMuZm9jdXNlZFtsaXN0VHlwZSA9PT0gdGhpcy5TT1VSQ0VfTElTVCA/ICdzb3VyY2VMaXN0JyA6ICd0YXJnZXRMaXN0J10gPSB0cnVlO1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4ICE9PSAtMSA/IHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4IDogc2VsZWN0ZWRGaXJzdEl0ZW0gPyBmaW5kSW5kZXggOiAtMTtcblxuICAgICAgICB0aGlzLmNoYW5nZUZvY3VzZWRPcHRpb25JbmRleChpbmRleCwgbGlzdFR5cGUpO1xuICAgICAgICB0aGlzLm9uRm9jdXMuZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgb25MaXN0Qmx1cihldmVudCwgbGlzdFR5cGUpIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkW2xpc3RUeXBlID09PSB0aGlzLlNPVVJDRV9MSVNUID8gJ3NvdXJjZUxpc3QnIDogJ3RhcmdldExpc3QnXSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZvY3VzZWRPcHRpb25JbmRleCA9IC0xO1xuICAgICAgICB0aGlzLmZvY3VzZWRPcHRpb24gPSBudWxsO1xuICAgICAgICB0aGlzLm9uQmx1ci5lbWl0KGV2ZW50KTtcbiAgICB9XG5cbiAgICBnZXRMaXN0RWxlbWVudChsaXN0VHlwZTogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBsaXN0VHlwZSA9PT0gdGhpcy5TT1VSQ0VfTElTVCA/IHRoaXMubGlzdFZpZXdTb3VyY2VDaGlsZD8ubmF0aXZlRWxlbWVudCA6IHRoaXMubGlzdFZpZXdUYXJnZXRDaGlsZD8ubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgICBnZXRMaXN0SXRlbXMobGlzdFR5cGU6IG51bWJlcikge1xuICAgICAgICBsZXQgbGlzdEVsZW1ldCA9IHRoaXMuZ2V0TGlzdEVsZW1lbnQobGlzdFR5cGUpO1xuXG4gICAgICAgIHJldHVybiBEb21IYW5kbGVyLmZpbmQobGlzdEVsZW1ldCwgJ2xpLnAtcGlja2xpc3QtaXRlbScpO1xuICAgIH1cblxuICAgIGdldExhdGVzdFNlbGVjdGVkVmlzaWJsZU9wdGlvbkluZGV4KHZpc2libGVMaXN0OiBhbnlbXSwgc2VsZWN0ZWRJdGVtczogYW55W10pOiBudW1iZXIge1xuICAgICAgICBjb25zdCBsYXRlc3RTZWxlY3RlZEl0ZW0gPSBbLi4uc2VsZWN0ZWRJdGVtc10ucmV2ZXJzZSgpLmZpbmQoKGl0ZW0pID0+IHZpc2libGVMaXN0LmluY2x1ZGVzKGl0ZW0pKTtcbiAgICAgICAgcmV0dXJuIGxhdGVzdFNlbGVjdGVkSXRlbSAhPT0gdW5kZWZpbmVkID8gdmlzaWJsZUxpc3QuaW5kZXhPZihsYXRlc3RTZWxlY3RlZEl0ZW0pIDogLTE7XG4gICAgfVxuXG4gICAgZ2V0VmlzaWJsZUxpc3QobGlzdFR5cGU6IG51bWJlcikge1xuICAgICAgICBpZiAobGlzdFR5cGUgPT09IHRoaXMuU09VUkNFX0xJU1QpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZpc2libGVPcHRpb25zU291cmNlICYmIHRoaXMudmlzaWJsZU9wdGlvbnNTb3VyY2UubGVuZ3RoID4gMCA/IHRoaXMudmlzaWJsZU9wdGlvbnNTb3VyY2UgOiB0aGlzLnNvdXJjZSAmJiB0aGlzLnNvdXJjZS5sZW5ndGggPiAwID8gdGhpcy5zb3VyY2UgOiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaWJsZU9wdGlvbnNUYXJnZXQgJiYgdGhpcy52aXNpYmxlT3B0aW9uc1RhcmdldC5sZW5ndGggPiAwID8gdGhpcy52aXNpYmxlT3B0aW9uc1RhcmdldCA6IHRoaXMudGFyZ2V0ICYmIHRoaXMudGFyZ2V0Lmxlbmd0aCA+IDAgPyB0aGlzLnRhcmdldCA6IG51bGw7XG4gICAgfVxuXG4gICAgc2V0U2VsZWN0aW9uTGlzdChsaXN0VHlwZTogbnVtYmVyLCBzZWxlY3RlZEl0ZW1zOiBhbnlbXSkge1xuICAgICAgICBpZiAobGlzdFR5cGUgPT09IHRoaXMuU09VUkNFX0xJU1QpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtc1NvdXJjZSA9IHNlbGVjdGVkSXRlbXM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXNUYXJnZXQgPSBzZWxlY3RlZEl0ZW1zO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmluZE5leHRPcHRpb25JbmRleChpbmRleDogbnVtYmVyLCBsaXN0VHlwZTogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5nZXRMaXN0SXRlbXMobGlzdFR5cGUpO1xuXG4gICAgICAgIGNvbnN0IG1hdGNoZWRPcHRpb25JbmRleCA9IFsuLi5pdGVtc10uZmluZEluZGV4KChsaW5rKSA9PiBsaW5rLmlkID09PSBpbmRleCk7XG5cbiAgICAgICAgcmV0dXJuIG1hdGNoZWRPcHRpb25JbmRleCA+IC0xID8gbWF0Y2hlZE9wdGlvbkluZGV4ICsgMSA6IDA7XG4gICAgfVxuXG4gICAgZmluZFByZXZPcHRpb25JbmRleChpbmRleDogbnVtYmVyLCBsaXN0VHlwZTogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5nZXRMaXN0SXRlbXMobGlzdFR5cGUpO1xuICAgICAgICBjb25zdCBtYXRjaGVkT3B0aW9uSW5kZXggPSBbLi4uaXRlbXNdLmZpbmRJbmRleCgobGluaykgPT4gbGluay5pZCA9PT0gaW5kZXgpO1xuXG4gICAgICAgIHJldHVybiBtYXRjaGVkT3B0aW9uSW5kZXggPiAtMSA/IG1hdGNoZWRPcHRpb25JbmRleCAtIDEgOiAwO1xuICAgIH1cblxuICAgIG9uSXRlbUtleURvd24oZXZlbnQ6IEV2ZW50IHwgYW55LCBzZWxlY3RlZEl0ZW1zOiBhbnlbXSwgY2FsbGJhY2s6IEV2ZW50RW1pdHRlcjxhbnk+LCBsaXN0VHlwZTogbnVtYmVyKSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQuY29kZSkge1xuICAgICAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uQXJyb3dEb3duS2V5KGV2ZW50LCBzZWxlY3RlZEl0ZW1zLCBjYWxsYmFjaywgbGlzdFR5cGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uQXJyb3dVcEtleShldmVudCwgc2VsZWN0ZWRJdGVtcywgY2FsbGJhY2ssIGxpc3RUeXBlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnSG9tZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkhvbWVLZXkoZXZlbnQsIHNlbGVjdGVkSXRlbXMsIGNhbGxiYWNrLCBsaXN0VHlwZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0VuZCc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkVuZEtleShldmVudCwgc2VsZWN0ZWRJdGVtcywgY2FsbGJhY2ssIGxpc3RUeXBlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgICAgIHRoaXMub25FbnRlcktleShldmVudCwgc2VsZWN0ZWRJdGVtcywgY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdTcGFjZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5vblNwYWNlS2V5KGV2ZW50LCBzZWxlY3RlZEl0ZW1zLCBjYWxsYmFjaywgbGlzdFR5cGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdLZXlBJzpcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuY3RybEtleSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFNlbGVjdGlvbkxpc3QobGlzdFR5cGUsIHRoaXMuZ2V0VmlzaWJsZUxpc3QobGlzdFR5cGUpKTtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suZW1pdCh7IGl0ZW1zOiBzZWxlY3RlZEl0ZW1zIH0pO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEZvY3VzZWRPcHRpb24oaW5kZXg6IG51bWJlciwgbGlzdFR5cGU6IG51bWJlcikge1xuICAgICAgICBpZiAoaW5kZXggPT09IC0xKSByZXR1cm4gbnVsbDtcblxuICAgICAgICBpZiAobGlzdFR5cGUgPT09IHRoaXMuU09VUkNFX0xJU1QpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZpc2libGVPcHRpb25zU291cmNlICYmIHRoaXMudmlzaWJsZU9wdGlvbnNTb3VyY2UubGVuZ3RoID8gdGhpcy52aXNpYmxlT3B0aW9uc1NvdXJjZVtpbmRleF0gOiB0aGlzLnNvdXJjZSAmJiB0aGlzLnNvdXJjZS5sZW5ndGggPyB0aGlzLnNvdXJjZVtpbmRleF0gOiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaWJsZU9wdGlvbnNUYXJnZXQgJiYgdGhpcy52aXNpYmxlT3B0aW9uc1RhcmdldC5sZW5ndGggPyB0aGlzLnZpc2libGVPcHRpb25zVGFyZ2V0W2luZGV4XSA6IHRoaXMudGFyZ2V0ICYmIHRoaXMudGFyZ2V0Lmxlbmd0aCA/IHRoaXMudGFyZ2V0W2luZGV4XSA6IG51bGw7XG4gICAgfVxuXG4gICAgY2hhbmdlRm9jdXNlZE9wdGlvbkluZGV4KGluZGV4LCBsaXN0VHlwZSkge1xuICAgICAgICBjb25zdCBpdGVtcyA9IHRoaXMuZ2V0TGlzdEl0ZW1zKGxpc3RUeXBlKTtcblxuICAgICAgICBsZXQgb3JkZXIgPSBpbmRleCA+PSBpdGVtcy5sZW5ndGggPyBpdGVtcy5sZW5ndGggLSAxIDogaW5kZXggPCAwID8gMCA6IGluZGV4O1xuXG4gICAgICAgIHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4ID0gaXRlbXNbb3JkZXJdLmdldEF0dHJpYnV0ZSgnaWQnKTtcbiAgICAgICAgdGhpcy5mb2N1c2VkT3B0aW9uID0gdGhpcy5nZXRGb2N1c2VkT3B0aW9uKG9yZGVyLCBsaXN0VHlwZSk7XG4gICAgICAgIHRoaXMuc2Nyb2xsSW5WaWV3KGl0ZW1zW29yZGVyXS5nZXRBdHRyaWJ1dGUoJ2lkJyksIGxpc3RUeXBlKTtcbiAgICB9XG5cbiAgICBzY3JvbGxJblZpZXcoaWQsIGxpc3RUeXBlKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5nZXRMaXN0RWxlbWVudChsaXN0VHlwZSksIGBsaVtpZD1cIiR7aWR9XCJdYCk7XG5cbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc2Nyb2xsSW50b1ZpZXcgJiYgZWxlbWVudC5zY3JvbGxJbnRvVmlldyh7IGJsb2NrOiAnbmVhcmVzdCcsIGlubGluZTogJ3N0YXJ0JyB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQXJyb3dEb3duS2V5KGV2ZW50OiBFdmVudCB8IGFueSwgc2VsZWN0ZWRJdGVtczogYW55W10sIGNhbGxiYWNrOiBFdmVudEVtaXR0ZXI8YW55PiwgbGlzdFR5cGU6IG51bWJlcikge1xuICAgICAgICBjb25zdCBvcHRpb25JbmRleCA9IHRoaXMuZmluZE5leHRPcHRpb25JbmRleCh0aGlzLmZvY3VzZWRPcHRpb25JbmRleCwgbGlzdFR5cGUpO1xuXG4gICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZE9wdGlvbkluZGV4KG9wdGlvbkluZGV4LCBsaXN0VHlwZSk7XG5cbiAgICAgICAgaWYgKGV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICB0aGlzLm9uRW50ZXJLZXkoZXZlbnQsIHNlbGVjdGVkSXRlbXMsIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25BcnJvd1VwS2V5KGV2ZW50OiBFdmVudCB8IGFueSwgc2VsZWN0ZWRJdGVtczogYW55W10sIGNhbGxiYWNrOiBFdmVudEVtaXR0ZXI8YW55PiwgbGlzdFR5cGU6IG51bWJlcikge1xuICAgICAgICBjb25zdCBvcHRpb25JbmRleCA9IHRoaXMuZmluZFByZXZPcHRpb25JbmRleCh0aGlzLmZvY3VzZWRPcHRpb25JbmRleCwgbGlzdFR5cGUpO1xuXG4gICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZE9wdGlvbkluZGV4KG9wdGlvbkluZGV4LCBsaXN0VHlwZSk7XG5cbiAgICAgICAgaWYgKGV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICB0aGlzLm9uRW50ZXJLZXkoZXZlbnQsIHNlbGVjdGVkSXRlbXMsIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25FbnRlcktleShldmVudDogRXZlbnQgfCBhbnksIHNlbGVjdGVkSXRlbXM6IGFueVtdLCBjYWxsYmFjazogRXZlbnRFbWl0dGVyPGFueT4pIHtcbiAgICAgICAgdGhpcy5vbkl0ZW1DbGljayhldmVudCwgdGhpcy5mb2N1c2VkT3B0aW9uLCBzZWxlY3RlZEl0ZW1zLCBjYWxsYmFjayk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25TcGFjZUtleShldmVudDogRXZlbnQgfCBhbnksIHNlbGVjdGVkSXRlbXM6IGFueVtdLCBjYWxsYmFjazogRXZlbnRFbWl0dGVyPGFueT4sIGxpc3RUeXBlOiBudW1iZXIpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBpZiAoZXZlbnQuc2hpZnRLZXkgJiYgc2VsZWN0ZWRJdGVtcyAmJiBzZWxlY3RlZEl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCB2aXNpYmxlTGlzdCA9IHRoaXMuZ2V0VmlzaWJsZUxpc3QobGlzdFR5cGUpO1xuICAgICAgICAgICAgbGV0IGxhc3RTZWxlY3RlZEluZGV4ID0gdGhpcy5nZXRMYXRlc3RTZWxlY3RlZFZpc2libGVPcHRpb25JbmRleCh2aXNpYmxlTGlzdCwgc2VsZWN0ZWRJdGVtcyk7XG5cbiAgICAgICAgICAgIGlmIChsYXN0U2VsZWN0ZWRJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBsZXQgZm9jdXNlZEluZGV4ID0gT2JqZWN0VXRpbHMuZmluZEluZGV4SW5MaXN0KHRoaXMuZm9jdXNlZE9wdGlvbiwgdmlzaWJsZUxpc3QpO1xuXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRJdGVtcyA9IFsuLi52aXNpYmxlTGlzdC5zbGljZShNYXRoLm1pbihsYXN0U2VsZWN0ZWRJbmRleCwgZm9jdXNlZEluZGV4KSwgTWF0aC5tYXgobGFzdFNlbGVjdGVkSW5kZXgsIGZvY3VzZWRJbmRleCkgKyAxKV07XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb25MaXN0KGxpc3RUeXBlLCBzZWxlY3RlZEl0ZW1zKTtcblxuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmVtaXQoeyBpdGVtczogc2VsZWN0ZWRJdGVtcyB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uRW50ZXJLZXkoZXZlbnQsIHNlbGVjdGVkSXRlbXMsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBvbkhvbWVLZXkoZXZlbnQ6IEV2ZW50IHwgYW55LCBzZWxlY3RlZEl0ZW1zOiBhbnlbXSwgY2FsbGJhY2s6IEV2ZW50RW1pdHRlcjxhbnk+LCBsaXN0VHlwZTogbnVtYmVyKSB7XG4gICAgICAgIGlmIChldmVudC5jdHJsS2V5ICYmIGV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICBsZXQgdmlzaWJsZUxpc3QgPSB0aGlzLmdldFZpc2libGVMaXN0KGxpc3RUeXBlKTtcbiAgICAgICAgICAgIGxldCBmb2N1c2VkSW5kZXggPSBPYmplY3RVdGlscy5maW5kSW5kZXhJbkxpc3QodGhpcy5mb2N1c2VkT3B0aW9uLCB2aXNpYmxlTGlzdCk7XG5cbiAgICAgICAgICAgIHNlbGVjdGVkSXRlbXMgPSBbLi4udmlzaWJsZUxpc3Quc2xpY2UoMCwgZm9jdXNlZEluZGV4ICsgMSldO1xuICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb25MaXN0KGxpc3RUeXBlLCBzZWxlY3RlZEl0ZW1zKTtcbiAgICAgICAgICAgIGNhbGxiYWNrLmVtaXQoeyBpdGVtczogc2VsZWN0ZWRJdGVtcyB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZE9wdGlvbkluZGV4KDAsIGxpc3RUeXBlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25FbmRLZXkoZXZlbnQ6IEV2ZW50IHwgYW55LCBzZWxlY3RlZEl0ZW1zOiBhbnlbXSwgY2FsbGJhY2s6IEV2ZW50RW1pdHRlcjxhbnk+LCBsaXN0VHlwZTogbnVtYmVyKSB7XG4gICAgICAgIGxldCB2aXNpYmxlTGlzdCA9IHRoaXMuZ2V0VmlzaWJsZUxpc3QobGlzdFR5cGUpO1xuICAgICAgICBsZXQgbGFzdEluZGV4ID0gdmlzaWJsZUxpc3QgJiYgdmlzaWJsZUxpc3QubGVuZ3RoID4gMCA/IHZpc2libGVMaXN0Lmxlbmd0aCAtIDEgOiBudWxsO1xuICAgICAgICBpZiAobGFzdEluZGV4ID09PSBudWxsKSByZXR1cm47XG5cbiAgICAgICAgaWYgKGV2ZW50LmN0cmxLZXkgJiYgZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgIGxldCBmb2N1c2VkSW5kZXggPSBPYmplY3RVdGlscy5maW5kSW5kZXhJbkxpc3QodGhpcy5mb2N1c2VkT3B0aW9uLCB2aXNpYmxlTGlzdCk7XG4gICAgICAgICAgICBzZWxlY3RlZEl0ZW1zID0gWy4uLnZpc2libGVMaXN0LnNsaWNlKGZvY3VzZWRJbmRleCwgbGFzdEluZGV4KV07XG5cbiAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0aW9uTGlzdChsaXN0VHlwZSwgc2VsZWN0ZWRJdGVtcyk7XG4gICAgICAgICAgICBjYWxsYmFjay5lbWl0KHsgaXRlbXM6IHNlbGVjdGVkSXRlbXMgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUZvY3VzZWRPcHRpb25JbmRleChsYXN0SW5kZXgsIGxpc3RUeXBlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgZ2V0RHJvcEluZGV4ZXMoZnJvbUluZGV4OiBudW1iZXIsIHRvSW5kZXg6IG51bWJlciwgZHJvcHBlZExpc3Q6IG51bWJlciwgaXNUcmFuc2ZlcjogYm9vbGVhbiwgZGF0YTogYW55W10gfCBhbnkpIHtcbiAgICAgICAgbGV0IHByZXZpb3VzSW5kZXgsIGN1cnJlbnRJbmRleDtcblxuICAgICAgICBpZiAoZHJvcHBlZExpc3QgPT09IHRoaXMuU09VUkNFX0xJU1QpIHtcbiAgICAgICAgICAgIHByZXZpb3VzSW5kZXggPSBpc1RyYW5zZmVyID8gKHRoaXMuZmlsdGVyVmFsdWVUYXJnZXQgPyBPYmplY3RVdGlscy5maW5kSW5kZXhJbkxpc3QoZGF0YSwgdGhpcy50YXJnZXQpIDogZnJvbUluZGV4KSA6IHRoaXMuZmlsdGVyVmFsdWVTb3VyY2UgPyBPYmplY3RVdGlscy5maW5kSW5kZXhJbkxpc3QoZGF0YSwgdGhpcy5zb3VyY2UpIDogZnJvbUluZGV4O1xuICAgICAgICAgICAgY3VycmVudEluZGV4ID0gdGhpcy5maWx0ZXJWYWx1ZVNvdXJjZSA/IHRoaXMuZmluZEZpbHRlcmVkQ3VycmVudEluZGV4KDxhbnlbXT50aGlzLnZpc2libGVPcHRpb25zU291cmNlLCB0b0luZGV4LCB0aGlzLnNvdXJjZSkgOiB0b0luZGV4O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJldmlvdXNJbmRleCA9IGlzVHJhbnNmZXIgPyAodGhpcy5maWx0ZXJWYWx1ZVNvdXJjZSA/IE9iamVjdFV0aWxzLmZpbmRJbmRleEluTGlzdChkYXRhLCB0aGlzLnNvdXJjZSkgOiBmcm9tSW5kZXgpIDogdGhpcy5maWx0ZXJWYWx1ZVRhcmdldCA/IE9iamVjdFV0aWxzLmZpbmRJbmRleEluTGlzdChkYXRhLCB0aGlzLnRhcmdldCkgOiBmcm9tSW5kZXg7XG4gICAgICAgICAgICBjdXJyZW50SW5kZXggPSB0aGlzLmZpbHRlclZhbHVlVGFyZ2V0ID8gdGhpcy5maW5kRmlsdGVyZWRDdXJyZW50SW5kZXgoPGFueVtdPnRoaXMudmlzaWJsZU9wdGlvbnNUYXJnZXQsIHRvSW5kZXgsIHRoaXMudGFyZ2V0KSA6IHRvSW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geyBwcmV2aW91c0luZGV4LCBjdXJyZW50SW5kZXggfTtcbiAgICB9XG5cbiAgICBmaW5kRmlsdGVyZWRDdXJyZW50SW5kZXgodmlzaWJsZU9wdGlvbnM6IGFueVtdLCBpbmRleDogbnVtYmVyLCBvcHRpb25zOiBhbnkpIHtcbiAgICAgICAgaWYgKHZpc2libGVPcHRpb25zLmxlbmd0aCA9PT0gaW5kZXgpIHtcbiAgICAgICAgICAgIGxldCB0b0luZGV4ID0gT2JqZWN0VXRpbHMuZmluZEluZGV4SW5MaXN0KHZpc2libGVPcHRpb25zW2luZGV4IC0gMV0sIG9wdGlvbnMpO1xuXG4gICAgICAgICAgICByZXR1cm4gdG9JbmRleCArIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0VXRpbHMuZmluZEluZGV4SW5MaXN0KHZpc2libGVPcHRpb25zW2luZGV4XSwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXNldFNvdXJjZUZpbHRlcigpIHtcbiAgICAgICAgdGhpcy52aXNpYmxlT3B0aW9uc1NvdXJjZSA9IG51bGw7XG4gICAgICAgIHRoaXMuZmlsdGVyVmFsdWVTb3VyY2UgPSBudWxsO1xuICAgICAgICB0aGlzLnNvdXJjZUZpbHRlclZpZXdDaGlsZCAmJiAoKDxIVE1MSW5wdXRFbGVtZW50PnRoaXMuc291cmNlRmlsdGVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpLnZhbHVlID0gJycpO1xuICAgIH1cblxuICAgIHJlc2V0VGFyZ2V0RmlsdGVyKCkge1xuICAgICAgICB0aGlzLnZpc2libGVPcHRpb25zVGFyZ2V0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5maWx0ZXJWYWx1ZVRhcmdldCA9IG51bGw7XG4gICAgICAgIHRoaXMudGFyZ2V0RmlsdGVyVmlld0NoaWxkICYmICgoPEhUTUxJbnB1dEVsZW1lbnQ+dGhpcy50YXJnZXRGaWx0ZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkudmFsdWUgPSAnJyk7XG4gICAgfVxuXG4gICAgcmVzZXRGaWx0ZXIoKSB7XG4gICAgICAgIHRoaXMucmVzZXRTb3VyY2VGaWx0ZXIoKTtcbiAgICAgICAgdGhpcy5yZXNldFRhcmdldEZpbHRlcigpO1xuICAgIH1cblxuICAgIG9uSXRlbUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQsIGl0ZW06IGFueSwgc2VsZWN0ZWRJdGVtczogYW55W10sIGNhbGxiYWNrOiBFdmVudEVtaXR0ZXI8YW55Pikge1xuICAgICAgICBsZXQgbGlzdEl0ZW0gPSA8SFRNTExJRWxlbWVudD5ldmVudC5jdXJyZW50VGFyZ2V0O1xuXG4gICAgICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcbiAgICAgICAgICAgIC8vZG93blxuICAgICAgICAgICAgY2FzZSA0MDpcbiAgICAgICAgICAgICAgICB2YXIgbmV4dEl0ZW0gPSB0aGlzLmZpbmROZXh0SXRlbShsaXN0SXRlbSk7XG4gICAgICAgICAgICAgICAgaWYgKG5leHRJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHRJdGVtLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy91cFxuICAgICAgICAgICAgY2FzZSAzODpcbiAgICAgICAgICAgICAgICB2YXIgcHJldkl0ZW0gPSB0aGlzLmZpbmRQcmV2SXRlbShsaXN0SXRlbSk7XG4gICAgICAgICAgICAgICAgaWYgKHByZXZJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZJdGVtLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy9lbnRlclxuICAgICAgICAgICAgY2FzZSAxMzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uSXRlbUNsaWNrKGV2ZW50LCBpdGVtLCBzZWxlY3RlZEl0ZW1zLCBjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZpbmROZXh0SXRlbShpdGVtOiBhbnkpOiBIVE1MRWxlbWVudCB8IG51bGwge1xuICAgICAgICBsZXQgbmV4dEl0ZW0gPSBpdGVtLm5leHRFbGVtZW50U2libGluZztcblxuICAgICAgICBpZiAobmV4dEl0ZW0pIHJldHVybiAhRG9tSGFuZGxlci5oYXNDbGFzcyhuZXh0SXRlbSwgJ3AtcGlja2xpc3QtaXRlbScpIHx8IERvbUhhbmRsZXIuaXNIaWRkZW4obmV4dEl0ZW0pID8gdGhpcy5maW5kTmV4dEl0ZW0obmV4dEl0ZW0pIDogbmV4dEl0ZW07XG4gICAgICAgIGVsc2UgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgZmluZFByZXZJdGVtKGl0ZW06IGFueSk6IEhUTUxFbGVtZW50IHwgbnVsbCB7XG4gICAgICAgIGxldCBwcmV2SXRlbSA9IGl0ZW0ucHJldmlvdXNFbGVtZW50U2libGluZztcblxuICAgICAgICBpZiAocHJldkl0ZW0pIHJldHVybiAhRG9tSGFuZGxlci5oYXNDbGFzcyhwcmV2SXRlbSwgJ3AtcGlja2xpc3QtaXRlbScpIHx8IERvbUhhbmRsZXIuaXNIaWRkZW4ocHJldkl0ZW0pID8gdGhpcy5maW5kUHJldkl0ZW0ocHJldkl0ZW0pIDogcHJldkl0ZW07XG4gICAgICAgIGVsc2UgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaW5pdE1lZGlhKCkge1xuICAgICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICAgICAgdGhpcy5tZWRpYSA9IHRoaXMud2luZG93Lm1hdGNoTWVkaWEoYChtYXgtd2lkdGg6ICR7dGhpcy5icmVha3BvaW50fSlgKTtcbiAgICAgICAgICAgIHRoaXMudmlld0NoYW5nZWQgPSB0aGlzLm1lZGlhLm1hdGNoZXM7XG4gICAgICAgICAgICB0aGlzLmJpbmRNZWRpYUNoYW5nZUxpc3RlbmVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZXN0cm95TWVkaWEoKSB7XG4gICAgICAgIHRoaXMudW5iaW5kTWVkaWFDaGFuZ2VMaXN0ZW5lcigpO1xuICAgIH1cblxuICAgIGJpbmRNZWRpYUNoYW5nZUxpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5tZWRpYSAmJiAhdGhpcy5tZWRpYUNoYW5nZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLm1lZGlhQ2hhbmdlTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLm1lZGlhLCAnY2hhbmdlJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3Q2hhbmdlZCA9IGV2ZW50Lm1hdGNoZXM7XG4gICAgICAgICAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5iaW5kTWVkaWFDaGFuZ2VMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMubWVkaWFDaGFuZ2VMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5tZWRpYUNoYW5nZUxpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLm1lZGlhQ2hhbmdlTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlU3R5bGUoKSB7XG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuc3R5bGVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLCB0aGlzLmlkLCAnJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHlsZUVsZW1lbnQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5zdHlsZUVsZW1lbnQsICd0eXBlJywgJ3RleHQvY3NzJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmRvY3VtZW50LmhlYWQsIHRoaXMuc3R5bGVFbGVtZW50KTtcblxuICAgICAgICAgICAgICAgIGxldCBpbm5lckhUTUwgPSBgXG4gICAgICAgICAgICAgICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogJHt0aGlzLmJyZWFrcG9pbnR9KSB7XG4gICAgICAgICAgICAgICAgICAgIC5wLXBpY2tsaXN0WyR7dGhpcy5pZH1dIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAucC1waWNrbGlzdFske3RoaXMuaWR9XSAucC1waWNrbGlzdC1idXR0b25zIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IHZhcigtLWNvbnRlbnQtcGFkZGluZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLnAtcGlja2xpc3RbJHt0aGlzLmlkfV0gLnAtcGlja2xpc3QtYnV0dG9ucyAucC1idXR0b24ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiB2YXIoLS1pbmxpbmUtc3BhY2luZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLnAtcGlja2xpc3RbJHt0aGlzLmlkfV0gLnAtcGlja2xpc3QtYnV0dG9ucyAucC1idXR0b246bGFzdC1jaGlsZCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9YDtcblxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5zdHlsZUVsZW1lbnQsICdpbm5lckhUTUwnLCBpbm5lckhUTUwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc291cmNlTW92ZURpc2FibGVkKCkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCAhdGhpcy5zZWxlY3RlZEl0ZW1zU291cmNlLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0YXJnZXRNb3ZlRGlzYWJsZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8ICF0aGlzLnNlbGVjdGVkSXRlbXNUYXJnZXQubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVSaWdodERpc2FibGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXNhYmxlZCB8fCBPYmplY3RVdGlscy5pc0VtcHR5KHRoaXMuc2VsZWN0ZWRJdGVtc1NvdXJjZSk7XG4gICAgfVxuXG4gICAgbW92ZUxlZnREaXNhYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgfHwgT2JqZWN0VXRpbHMuaXNFbXB0eSh0aGlzLnNlbGVjdGVkSXRlbXNUYXJnZXQpO1xuICAgIH1cblxuICAgIG1vdmVBbGxSaWdodERpc2FibGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXNhYmxlZCB8fCBPYmplY3RVdGlscy5pc0VtcHR5KHRoaXMuc291cmNlKTtcbiAgICB9XG5cbiAgICBtb3ZlQWxsTGVmdERpc2FibGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXNhYmxlZCB8fCBPYmplY3RVdGlscy5pc0VtcHR5KHRoaXMudGFyZ2V0KTtcbiAgICB9XG5cbiAgICBkZXN0cm95U3R5bGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0eWxlRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLmRvY3VtZW50LmhlYWQsIHRoaXMuc3R5bGVFbGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMuc3R5bGVFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgIGBgO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGVzdHJveVN0eWxlKCk7XG4gICAgICAgIHRoaXMuZGVzdHJveU1lZGlhKCk7XG4gICAgfVxufVxuXG5jb25zdCBEcmFnQ29uZmlnID0ge1xuICAgIHpJbmRleDogMTIwMFxufTtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBCdXR0b25Nb2R1bGUsIFNoYXJlZE1vZHVsZSwgUmlwcGxlTW9kdWxlLCBEcmFnRHJvcE1vZHVsZSwgQW5nbGVEb3VibGVEb3duSWNvbiwgQW5nbGVEb3VibGVMZWZ0SWNvbiwgQW5nbGVEb3VibGVSaWdodEljb24sIEFuZ2xlRG91YmxlVXBJY29uLCBBbmdsZURvd25JY29uLCBBbmdsZUxlZnRJY29uLCBBbmdsZVJpZ2h0SWNvbiwgQW5nbGVVcEljb24sIFNlYXJjaEljb24sIEhvbWVJY29uXSxcbiAgICBleHBvcnRzOiBbUGlja0xpc3QsIFNoYXJlZE1vZHVsZSwgRHJhZ0Ryb3BNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW1BpY2tMaXN0XSxcbiAgICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IENES19EUkFHX0NPTkZJRywgdXNlVmFsdWU6IERyYWdDb25maWcgfV1cbn0pXG5leHBvcnQgY2xhc3MgUGlja0xpc3RNb2R1bGUge31cbiJdfQ==