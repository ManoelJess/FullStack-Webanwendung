import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, forwardRef, Inject, Input, NgModule, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { PrimeTemplate, SharedModule, TranslationKeys } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConnectedOverlayScrollHandler, DomHandler } from 'primeng/dom';
import { RippleModule } from 'primeng/ripple';
import { ObjectUtils, UniqueComponentId, ZIndexUtils } from 'primeng/utils';
import { ChevronLeftIcon } from 'primeng/icons/chevronleft';
import { ChevronRightIcon } from 'primeng/icons/chevronright';
import { ChevronUpIcon } from 'primeng/icons/chevronup';
import { ChevronDownIcon } from 'primeng/icons/chevrondown';
import { TimesIcon } from 'primeng/icons/times';
import { CalendarIcon } from 'primeng/icons/calendar';
import * as i0 from "@angular/core";
import * as i1 from "primeng/api";
import * as i2 from "@angular/common";
import * as i3 from "primeng/button";
import * as i4 from "primeng/ripple";
export const CALENDAR_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Calendar),
    multi: true
};
/**
 * Calendar also known as DatePicker, is a form component to work with dates.
 * @group Components
 */
export class Calendar {
    document;
    el;
    renderer;
    cd;
    zone;
    config;
    overlayService;
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
     * Inline style of the input field.
     * @group Props
     */
    inputStyle;
    /**
     * Identifier of the focus input to match a label defined for the component.
     * @group Props
     */
    inputId;
    /**
     * Name of the input element.
     * @group Props
     */
    name;
    /**
     * Style class of the input field.
     * @group Props
     */
    inputStyleClass;
    /**
     * Placeholder text for the input.
     * @group Props
     */
    placeholder;
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    ariaLabelledBy;
    /**
     * Defines a string that labels the input for accessibility.
     * @group Props
     */
    ariaLabel;
    /**
     * Defines a string that labels the icon button for accessibility.
     * @group Props
     */
    iconAriaLabel;
    /**
     * When specified, disables the component.
     * @group Props
     */
    disabled;
    /**
     * Format of the date which can also be defined at locale settings.
     * @group Props
     */
    dateFormat;
    /**
     * Separator for multiple selection mode.
     * @group Props
     */
    multipleSeparator = ',';
    /**
     * Separator for joining start and end dates on range selection mode.
     * @group Props
     */
    rangeSeparator = '-';
    /**
     * When enabled, displays the calendar as inline. Default is false for popup mode.
     * @group Props
     */
    inline = false;
    /**
     * Whether to display dates in other months (non-selectable) at the start or end of the current month. To make these days selectable use the selectOtherMonths option.
     * @group Props
     */
    showOtherMonths = true;
    /**
     * Whether days in other months shown before or after the current month are selectable. This only applies if the showOtherMonths option is set to true.
     * @group Props
     */
    selectOtherMonths;
    /**
     * When enabled, displays a button with icon next to input.
     * @group Props
     */
    showIcon;
    /**
     * Icon of the calendar button.
     * @group Props
     */
    icon;
    /**
     * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having#mydiv as variable name).
     * @group Props
     */
    appendTo;
    /**
     * When specified, prevents entering the date manually with keyboard.
     * @group Props
     */
    readonlyInput;
    /**
     * The cutoff year for determining the century for a date.
     * @group Props
     */
    shortYearCutoff = '+10';
    /**
     * Whether the month should be rendered as a dropdown instead of text.
     * @group Props
     * @deprecated Navigator is always on.
     */
    monthNavigator;
    /**
     * Whether the year should be rendered as a dropdown instead of text.
     * @group Props
     * @deprecated  Navigator is always on.
     */
    yearNavigator;
    /**
     * Specifies 12 or 24 hour format.
     * @group Props
     */
    hourFormat = '24';
    /**
     * Whether to display timepicker only.
     * @group Props
     */
    timeOnly;
    /**
     * Hours to change per step.
     * @group Props
     */
    stepHour = 1;
    /**
     * Minutes to change per step.
     * @group Props
     */
    stepMinute = 1;
    /**
     * Seconds to change per step.
     * @group Props
     */
    stepSecond = 1;
    /**
     * Whether to show the seconds in time picker.
     * @group Props
     */
    showSeconds = false;
    /**
     * When present, it specifies that an input field must be filled out before submitting the form.
     * @group Props
     */
    required;
    /**
     * When disabled, datepicker will not be visible with input focus.
     * @group Props
     */
    showOnFocus = true;
    /**
     * When enabled, calendar will show week numbers.
     * @group Props
     */
    showWeek = false;
    /**
     * When enabled, a clear icon is displayed to clear the value.
     * @group Props
     */
    showClear = false;
    /**
     * Type of the value to write back to ngModel, default is date and alternative is string.
     * @group Props
     */
    dataType = 'date';
    /**
     * Defines the quantity of the selection, valid values are "single", "multiple" and "range".
     * @group Props
     */
    selectionMode = 'single';
    /**
     * Maximum number of selectable dates in multiple mode.
     * @group Props
     */
    maxDateCount;
    /**
     * Whether to display today and clear buttons at the footer
     * @group Props
     */
    showButtonBar;
    /**
     * Style class of the today button.
     * @group Props
     */
    todayButtonStyleClass = 'p-button-text';
    /**
     * Style class of the clear button.
     * @group Props
     */
    clearButtonStyleClass = 'p-button-text';
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
     * Style class of the datetimepicker container element.
     * @group Props
     */
    panelStyleClass;
    /**
     * Inline style of the datetimepicker container element.
     * @group Props
     */
    panelStyle;
    /**
     * Keep invalid value when input blur.
     * @group Props
     */
    keepInvalid = false;
    /**
     * Whether to hide the overlay on date selection.
     * @group Props
     */
    hideOnDateTimeSelect = true;
    /**
     * When enabled, calendar overlay is displayed as optimized for touch devices.
     * @group Props
     */
    touchUI;
    /**
     * Separator of time selector.
     * @group Props
     */
    timeSeparator = ':';
    /**
     * When enabled, can only focus on elements inside the calendar.
     * @group Props
     */
    focusTrap = true;
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
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex;
    /**
     * The minimum selectable date.
     * @group Props
     */
    get minDate() {
        return this._minDate;
    }
    set minDate(date) {
        this._minDate = date;
        if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }
    /**
     * The maximum selectable date.
     * @group Props
     */
    get maxDate() {
        return this._maxDate;
    }
    set maxDate(date) {
        this._maxDate = date;
        if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }
    /**
     * Array with dates that should be disabled (not selectable).
     * @group Props
     */
    get disabledDates() {
        return this._disabledDates;
    }
    set disabledDates(disabledDates) {
        this._disabledDates = disabledDates;
        if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }
    /**
     * Array with weekday numbers that should be disabled (not selectable).
     * @group Props
     */
    get disabledDays() {
        return this._disabledDays;
    }
    set disabledDays(disabledDays) {
        this._disabledDays = disabledDays;
        if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }
    /**
     * The range of years displayed in the year drop-down in (nnnn:nnnn) format such as (2000:2020).
     * @group Props
     * @deprecated Years are based on decades by default.
     */
    get yearRange() {
        return this._yearRange;
    }
    set yearRange(yearRange) {
        this._yearRange = yearRange;
        if (yearRange) {
            const years = yearRange.split(':');
            const yearStart = parseInt(years[0]);
            const yearEnd = parseInt(years[1]);
            this.populateYearOptions(yearStart, yearEnd);
        }
    }
    /**
     * Whether to display timepicker.
     * @group Props
     */
    get showTime() {
        return this._showTime;
    }
    set showTime(showTime) {
        this._showTime = showTime;
        if (this.currentHour === undefined) {
            this.initTime(this.value || new Date());
        }
        this.updateInputfield();
    }
    /**
     * An array of options for responsive design.
     * @group Props
     */
    get responsiveOptions() {
        return this._responsiveOptions;
    }
    set responsiveOptions(responsiveOptions) {
        this._responsiveOptions = responsiveOptions;
        this.destroyResponsiveStyleElement();
        this.createResponsiveStyle();
    }
    /**
     * Number of months to display.
     * @group Props
     */
    get numberOfMonths() {
        return this._numberOfMonths;
    }
    set numberOfMonths(numberOfMonths) {
        this._numberOfMonths = numberOfMonths;
        this.destroyResponsiveStyleElement();
        this.createResponsiveStyle();
    }
    /**
     * Defines the first of the week for various date calculations.
     * @group Props
     */
    get firstDayOfWeek() {
        return this._firstDayOfWeek;
    }
    set firstDayOfWeek(firstDayOfWeek) {
        this._firstDayOfWeek = firstDayOfWeek;
        this.createWeekDays();
    }
    /**
     * Option to set calendar locale.
     * @group Props
     * @deprecated Locale property has no effect, use new i18n API instead.
     */
    set locale(newLocale) {
        console.warn('Locale property has no effect, use new i18n API instead.');
    }
    /**
     * Type of view to display, valid values are "date" for datepicker and "month" for month picker.
     * @group Props
     */
    get view() {
        return this._view;
    }
    set view(view) {
        this._view = view;
        this.currentView = this._view;
    }
    /**
     * Set the date to highlight on first opening if the field is blank.
     * @group Props
     */
    get defaultDate() {
        return this._defaultDate;
    }
    set defaultDate(defaultDate) {
        this._defaultDate = defaultDate;
        if (this.initialized) {
            const date = defaultDate || new Date();
            this.currentMonth = date.getMonth();
            this.currentYear = date.getFullYear();
            this.initTime(date);
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }
    /**
     * Callback to invoke on focus of input field.
     * @param {Event} event - browser event.
     * @group Emits
     */
    onFocus = new EventEmitter();
    /**
     * Callback to invoke on blur of input field.
     * @param {Event} event - browser event.
     * @group Emits
     */
    onBlur = new EventEmitter();
    /**
     * Callback to invoke when date panel closed.
     * @param {Event} event - Mouse event
     * @group Emits
     */
    onClose = new EventEmitter();
    /**
     * Callback to invoke on date select.
     * @param {Date} date - date value.
     * @group Emits
     */
    onSelect = new EventEmitter();
    /**
     * Callback to invoke when input field cleared.
     * @group Emits
     */
    onClear = new EventEmitter();
    /**
     * Callback to invoke when input field is being typed.
     * @param {Event} event - browser event
     * @group Emits
     */
    onInput = new EventEmitter();
    /**
     * Callback to invoke when today button is clicked.
     * @param {Date} date - today as a date instance.
     * @group Emits
     */
    onTodayClick = new EventEmitter();
    /**
     * Callback to invoke when clear button is clicked.
     * @param {Event} event - browser event.
     * @group Emits
     */
    onClearClick = new EventEmitter();
    /**
     * Callback to invoke when a month is changed using the navigators.
     * @param {CalendarMonthChangeEvent} event - custom month change event.
     * @group Emits
     */
    onMonthChange = new EventEmitter();
    /**
     * Callback to invoke when a year is changed using the navigators.
     * @param {CalendarYearChangeEvent} event - custom year change event.
     * @group Emits
     */
    onYearChange = new EventEmitter();
    /**
     * Callback to invoke when clicked outside of the date panel.
     * @group Emits
     */
    onClickOutside = new EventEmitter();
    /**
     * Callback to invoke when datepicker panel is shown.
     * @group Emits
     */
    onShow = new EventEmitter();
    templates;
    containerViewChild;
    inputfieldViewChild;
    set content(content) {
        this.contentViewChild = content;
        if (this.contentViewChild) {
            if (this.isMonthNavigate) {
                Promise.resolve(null).then(() => this.updateFocus());
                this.isMonthNavigate = false;
            }
            else {
                if (!this.focus && !this.inline) {
                    this.initFocusableCell();
                }
            }
        }
    }
    contentViewChild;
    value;
    dates;
    months;
    weekDays;
    currentMonth;
    currentYear;
    currentHour;
    currentMinute;
    currentSecond;
    pm;
    mask;
    maskClickListener;
    overlay;
    responsiveStyleElement;
    overlayVisible;
    onModelChange = () => { };
    onModelTouched = () => { };
    calendarElement;
    timePickerTimer;
    documentClickListener;
    animationEndListener;
    ticksTo1970;
    yearOptions;
    focus;
    isKeydown;
    filled;
    inputFieldValue = null;
    _minDate;
    _maxDate;
    _showTime;
    _yearRange;
    preventDocumentListener;
    dateTemplate;
    headerTemplate;
    footerTemplate;
    disabledDateTemplate;
    decadeTemplate;
    previousIconTemplate;
    nextIconTemplate;
    triggerIconTemplate;
    clearIconTemplate;
    decrementIconTemplate;
    incrementIconTemplate;
    _disabledDates;
    _disabledDays;
    selectElement;
    todayElement;
    focusElement;
    scrollHandler;
    documentResizeListener;
    navigationState = null;
    isMonthNavigate;
    initialized;
    translationSubscription;
    _locale;
    _responsiveOptions;
    currentView;
    attributeSelector;
    panelId;
    _numberOfMonths = 1;
    _firstDayOfWeek;
    _view = 'date';
    preventFocus;
    _defaultDate;
    window;
    get locale() {
        return this._locale;
    }
    get iconButtonAriaLabel() {
        return this.iconAriaLabel ? this.iconAriaLabel : this.getTranslation('chooseDate');
    }
    get prevIconAriaLabel() {
        return this.currentView === 'year' ? this.getTranslation('prevDecade') : this.currentView === 'month' ? this.getTranslation('prevYear') : this.getTranslation('prevMonth');
    }
    get nextIconAriaLabel() {
        return this.currentView === 'year' ? this.getTranslation('nextDecade') : this.currentView === 'month' ? this.getTranslation('nextYear') : this.getTranslation('nextMonth');
    }
    constructor(document, el, renderer, cd, zone, config, overlayService) {
        this.document = document;
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.zone = zone;
        this.config = config;
        this.overlayService = overlayService;
        this.window = this.document.defaultView;
    }
    ngOnInit() {
        this.attributeSelector = UniqueComponentId();
        this.panelId = this.attributeSelector + '_panel';
        const date = this.defaultDate || new Date();
        this.createResponsiveStyle();
        this.currentMonth = date.getMonth();
        this.currentYear = date.getFullYear();
        this.yearOptions = [];
        this.currentView = this.view;
        if (this.view === 'date') {
            this.createWeekDays();
            this.initTime(date);
            this.createMonths(this.currentMonth, this.currentYear);
            this.ticksTo1970 = ((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000;
        }
        this.translationSubscription = this.config.translationObserver.subscribe(() => {
            this.createWeekDays();
            this.cd.markForCheck();
        });
        this.initialized = true;
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'date':
                    this.dateTemplate = item.template;
                    break;
                case 'decade':
                    this.decadeTemplate = item.template;
                    break;
                case 'disabledDate':
                    this.disabledDateTemplate = item.template;
                    break;
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'previousicon':
                    this.previousIconTemplate = item.template;
                    break;
                case 'nexticon':
                    this.nextIconTemplate = item.template;
                    break;
                case 'triggericon':
                    this.triggerIconTemplate = item.template;
                    break;
                case 'clearicon':
                    this.clearIconTemplate = item.template;
                    break;
                case 'decrementicon':
                    this.decrementIconTemplate = item.template;
                    break;
                case 'incrementicon':
                    this.incrementIconTemplate = item.template;
                    break;
                case 'footer':
                    this.footerTemplate = item.template;
                    break;
                default:
                    this.dateTemplate = item.template;
                    break;
            }
        });
    }
    ngAfterViewInit() {
        if (this.inline) {
            this.contentViewChild && this.contentViewChild.nativeElement.setAttribute(this.attributeSelector, '');
            if (!this.disabled && !this.inline) {
                this.initFocusableCell();
                if (this.numberOfMonths === 1) {
                    if (this.contentViewChild && this.contentViewChild.nativeElement) {
                        this.contentViewChild.nativeElement.style.width = DomHandler.getOuterWidth(this.containerViewChild?.nativeElement) + 'px';
                    }
                }
            }
        }
    }
    getTranslation(option) {
        return this.config.getTranslation(option);
    }
    populateYearOptions(start, end) {
        this.yearOptions = [];
        for (let i = start; i <= end; i++) {
            this.yearOptions.push(i);
        }
    }
    createWeekDays() {
        this.weekDays = [];
        let dayIndex = this.getFirstDateOfWeek();
        let dayLabels = this.getTranslation(TranslationKeys.DAY_NAMES_MIN);
        for (let i = 0; i < 7; i++) {
            this.weekDays.push(dayLabels[dayIndex]);
            dayIndex = dayIndex == 6 ? 0 : ++dayIndex;
        }
    }
    monthPickerValues() {
        let monthPickerValues = [];
        for (let i = 0; i <= 11; i++) {
            monthPickerValues.push(this.config.getTranslation('monthNamesShort')[i]);
        }
        return monthPickerValues;
    }
    yearPickerValues() {
        let yearPickerValues = [];
        let base = this.currentYear - (this.currentYear % 10);
        for (let i = 0; i < 10; i++) {
            yearPickerValues.push(base + i);
        }
        return yearPickerValues;
    }
    createMonths(month, year) {
        this.months = this.months = [];
        for (let i = 0; i < this.numberOfMonths; i++) {
            let m = month + i;
            let y = year;
            if (m > 11) {
                m = (m % 11) - 1;
                y = year + 1;
            }
            this.months.push(this.createMonth(m, y));
        }
    }
    getWeekNumber(date) {
        let checkDate = new Date(date.getTime());
        checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
        let time = checkDate.getTime();
        checkDate.setMonth(0);
        checkDate.setDate(1);
        return Math.floor(Math.round((time - checkDate.getTime()) / 86400000) / 7) + 1;
    }
    createMonth(month, year) {
        let dates = [];
        let firstDay = this.getFirstDayOfMonthIndex(month, year);
        let daysLength = this.getDaysCountInMonth(month, year);
        let prevMonthDaysLength = this.getDaysCountInPrevMonth(month, year);
        let dayNo = 1;
        let today = new Date();
        let weekNumbers = [];
        let monthRows = Math.ceil((daysLength + firstDay) / 7);
        for (let i = 0; i < monthRows; i++) {
            let week = [];
            if (i == 0) {
                for (let j = prevMonthDaysLength - firstDay + 1; j <= prevMonthDaysLength; j++) {
                    let prev = this.getPreviousMonthAndYear(month, year);
                    week.push({ day: j, month: prev.month, year: prev.year, otherMonth: true, today: this.isToday(today, j, prev.month, prev.year), selectable: this.isSelectable(j, prev.month, prev.year, true) });
                }
                let remainingDaysLength = 7 - week.length;
                for (let j = 0; j < remainingDaysLength; j++) {
                    week.push({ day: dayNo, month: month, year: year, today: this.isToday(today, dayNo, month, year), selectable: this.isSelectable(dayNo, month, year, false) });
                    dayNo++;
                }
            }
            else {
                for (let j = 0; j < 7; j++) {
                    if (dayNo > daysLength) {
                        let next = this.getNextMonthAndYear(month, year);
                        week.push({
                            day: dayNo - daysLength,
                            month: next.month,
                            year: next.year,
                            otherMonth: true,
                            today: this.isToday(today, dayNo - daysLength, next.month, next.year),
                            selectable: this.isSelectable(dayNo - daysLength, next.month, next.year, true)
                        });
                    }
                    else {
                        week.push({ day: dayNo, month: month, year: year, today: this.isToday(today, dayNo, month, year), selectable: this.isSelectable(dayNo, month, year, false) });
                    }
                    dayNo++;
                }
            }
            if (this.showWeek) {
                weekNumbers.push(this.getWeekNumber(new Date(week[0].year, week[0].month, week[0].day)));
            }
            dates.push(week);
        }
        return {
            month: month,
            year: year,
            dates: dates,
            weekNumbers: weekNumbers
        };
    }
    initTime(date) {
        this.pm = date.getHours() > 11;
        if (this.showTime) {
            this.currentMinute = date.getMinutes();
            this.currentSecond = date.getSeconds();
            this.setCurrentHourPM(date.getHours());
        }
        else if (this.timeOnly) {
            this.currentMinute = 0;
            this.currentHour = 0;
            this.currentSecond = 0;
        }
    }
    navBackward(event) {
        if (this.disabled) {
            event.preventDefault();
            return;
        }
        this.isMonthNavigate = true;
        if (this.currentView === 'month') {
            this.decrementYear();
            setTimeout(() => {
                this.updateFocus();
            }, 1);
        }
        else if (this.currentView === 'year') {
            this.decrementDecade();
            setTimeout(() => {
                this.updateFocus();
            }, 1);
        }
        else {
            if (this.currentMonth === 0) {
                this.currentMonth = 11;
                this.decrementYear();
            }
            else {
                this.currentMonth--;
            }
            this.onMonthChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }
    navForward(event) {
        if (this.disabled) {
            event.preventDefault();
            return;
        }
        this.isMonthNavigate = true;
        if (this.currentView === 'month') {
            this.incrementYear();
            setTimeout(() => {
                this.updateFocus();
            }, 1);
        }
        else if (this.currentView === 'year') {
            this.incrementDecade();
            setTimeout(() => {
                this.updateFocus();
            }, 1);
        }
        else {
            if (this.currentMonth === 11) {
                this.currentMonth = 0;
                this.incrementYear();
            }
            else {
                this.currentMonth++;
            }
            this.onMonthChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }
    decrementYear() {
        this.currentYear--;
        let _yearOptions = this.yearOptions;
        if (this.yearNavigator && this.currentYear < _yearOptions[0]) {
            let difference = _yearOptions[_yearOptions.length - 1] - _yearOptions[0];
            this.populateYearOptions(_yearOptions[0] - difference, _yearOptions[_yearOptions.length - 1] - difference);
        }
    }
    decrementDecade() {
        this.currentYear = this.currentYear - 10;
    }
    incrementDecade() {
        this.currentYear = this.currentYear + 10;
    }
    incrementYear() {
        this.currentYear++;
        let _yearOptions = this.yearOptions;
        if (this.yearNavigator && this.currentYear > _yearOptions[_yearOptions.length - 1]) {
            let difference = _yearOptions[_yearOptions.length - 1] - _yearOptions[0];
            this.populateYearOptions(_yearOptions[0] + difference, _yearOptions[_yearOptions.length - 1] + difference);
        }
    }
    switchToMonthView(event) {
        this.setCurrentView('month');
        event.preventDefault();
    }
    switchToYearView(event) {
        this.setCurrentView('year');
        event.preventDefault();
    }
    onDateSelect(event, dateMeta) {
        if (this.disabled || !dateMeta.selectable) {
            event.preventDefault();
            return;
        }
        if (this.isMultipleSelection() && this.isSelected(dateMeta)) {
            this.value = this.value.filter((date, i) => {
                return !this.isDateEquals(date, dateMeta);
            });
            if (this.value.length === 0) {
                this.value = null;
            }
            this.updateModel(this.value);
        }
        else {
            if (this.shouldSelectDate(dateMeta)) {
                this.selectDate(dateMeta);
            }
        }
        if (this.isSingleSelection() && this.hideOnDateTimeSelect) {
            setTimeout(() => {
                event.preventDefault();
                this.hideOverlay();
                if (this.mask) {
                    this.disableModality();
                }
                this.cd.markForCheck();
            }, 150);
        }
        this.updateInputfield();
        event.preventDefault();
    }
    shouldSelectDate(dateMeta) {
        if (this.isMultipleSelection())
            return this.maxDateCount != null ? this.maxDateCount > (this.value ? this.value.length : 0) : true;
        else
            return true;
    }
    onMonthSelect(event, index) {
        if (this.view === 'month') {
            this.onDateSelect(event, { year: this.currentYear, month: index, day: 1, selectable: true });
        }
        else {
            this.currentMonth = index;
            this.createMonths(this.currentMonth, this.currentYear);
            this.setCurrentView('date');
            this.onMonthChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
        }
    }
    onYearSelect(event, year) {
        if (this.view === 'year') {
            this.onDateSelect(event, { year: year, month: 0, day: 1, selectable: true });
        }
        else {
            this.currentYear = year;
            this.setCurrentView('month');
            this.onYearChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
        }
    }
    updateInputfield() {
        let formattedValue = '';
        if (this.value) {
            if (this.isSingleSelection()) {
                formattedValue = this.formatDateTime(this.value);
            }
            else if (this.isMultipleSelection()) {
                for (let i = 0; i < this.value.length; i++) {
                    let dateAsString = this.formatDateTime(this.value[i]);
                    formattedValue += dateAsString;
                    if (i !== this.value.length - 1) {
                        formattedValue += this.multipleSeparator + ' ';
                    }
                }
            }
            else if (this.isRangeSelection()) {
                if (this.value && this.value.length) {
                    let startDate = this.value[0];
                    let endDate = this.value[1];
                    formattedValue = this.formatDateTime(startDate);
                    if (endDate) {
                        formattedValue += ' ' + this.rangeSeparator + ' ' + this.formatDateTime(endDate);
                    }
                }
            }
        }
        this.inputFieldValue = formattedValue;
        this.updateFilledState();
        if (this.inputfieldViewChild && this.inputfieldViewChild.nativeElement) {
            this.inputfieldViewChild.nativeElement.value = this.inputFieldValue;
        }
    }
    formatDateTime(date) {
        let formattedValue = this.keepInvalid ? date : null;
        if (this.isValidDate(date)) {
            if (this.timeOnly) {
                formattedValue = this.formatTime(date);
            }
            else {
                formattedValue = this.formatDate(date, this.getDateFormat());
                if (this.showTime) {
                    formattedValue += ' ' + this.formatTime(date);
                }
            }
        }
        return formattedValue;
    }
    setCurrentHourPM(hours) {
        if (this.hourFormat == '12') {
            this.pm = hours > 11;
            if (hours >= 12) {
                this.currentHour = hours == 12 ? 12 : hours - 12;
            }
            else {
                this.currentHour = hours == 0 ? 12 : hours;
            }
        }
        else {
            this.currentHour = hours;
        }
    }
    setCurrentView(currentView) {
        this.currentView = currentView;
        this.cd.detectChanges();
        this.alignOverlay();
    }
    selectDate(dateMeta) {
        let date = new Date(dateMeta.year, dateMeta.month, dateMeta.day);
        if (this.showTime) {
            if (this.hourFormat == '12') {
                if (this.currentHour === 12)
                    date.setHours(this.pm ? 12 : 0);
                else
                    date.setHours(this.pm ? this.currentHour + 12 : this.currentHour);
            }
            else {
                date.setHours(this.currentHour);
            }
            date.setMinutes(this.currentMinute);
            date.setSeconds(this.currentSecond);
        }
        if (this.minDate && this.minDate > date) {
            date = this.minDate;
            this.setCurrentHourPM(date.getHours());
            this.currentMinute = date.getMinutes();
            this.currentSecond = date.getSeconds();
        }
        if (this.maxDate && this.maxDate < date) {
            date = this.maxDate;
            this.setCurrentHourPM(date.getHours());
            this.currentMinute = date.getMinutes();
            this.currentSecond = date.getSeconds();
        }
        if (this.isSingleSelection()) {
            this.updateModel(date);
        }
        else if (this.isMultipleSelection()) {
            this.updateModel(this.value ? [...this.value, date] : [date]);
        }
        else if (this.isRangeSelection()) {
            if (this.value && this.value.length) {
                let startDate = this.value[0];
                let endDate = this.value[1];
                if (!endDate && date.getTime() >= startDate.getTime()) {
                    endDate = date;
                }
                else {
                    startDate = date;
                    endDate = null;
                }
                this.updateModel([startDate, endDate]);
            }
            else {
                this.updateModel([date, null]);
            }
        }
        this.onSelect.emit(date);
    }
    updateModel(value) {
        this.value = value;
        if (this.dataType == 'date') {
            this.onModelChange(this.value);
        }
        else if (this.dataType == 'string') {
            if (this.isSingleSelection()) {
                this.onModelChange(this.formatDateTime(this.value));
            }
            else {
                let stringArrValue = null;
                if (Array.isArray(this.value)) {
                    stringArrValue = this.value.map((date) => this.formatDateTime(date));
                }
                this.onModelChange(stringArrValue);
            }
        }
    }
    getFirstDayOfMonthIndex(month, year) {
        let day = new Date();
        day.setDate(1);
        day.setMonth(month);
        day.setFullYear(year);
        let dayIndex = day.getDay() + this.getSundayIndex();
        return dayIndex >= 7 ? dayIndex - 7 : dayIndex;
    }
    getDaysCountInMonth(month, year) {
        return 32 - this.daylightSavingAdjust(new Date(year, month, 32)).getDate();
    }
    getDaysCountInPrevMonth(month, year) {
        let prev = this.getPreviousMonthAndYear(month, year);
        return this.getDaysCountInMonth(prev.month, prev.year);
    }
    getPreviousMonthAndYear(month, year) {
        let m, y;
        if (month === 0) {
            m = 11;
            y = year - 1;
        }
        else {
            m = month - 1;
            y = year;
        }
        return { month: m, year: y };
    }
    getNextMonthAndYear(month, year) {
        let m, y;
        if (month === 11) {
            m = 0;
            y = year + 1;
        }
        else {
            m = month + 1;
            y = year;
        }
        return { month: m, year: y };
    }
    getSundayIndex() {
        let firstDayOfWeek = this.getFirstDateOfWeek();
        return firstDayOfWeek > 0 ? 7 - firstDayOfWeek : 0;
    }
    isSelected(dateMeta) {
        if (this.value) {
            if (this.isSingleSelection()) {
                return this.isDateEquals(this.value, dateMeta);
            }
            else if (this.isMultipleSelection()) {
                let selected = false;
                for (let date of this.value) {
                    selected = this.isDateEquals(date, dateMeta);
                    if (selected) {
                        break;
                    }
                }
                return selected;
            }
            else if (this.isRangeSelection()) {
                if (this.value[1])
                    return this.isDateEquals(this.value[0], dateMeta) || this.isDateEquals(this.value[1], dateMeta) || this.isDateBetween(this.value[0], this.value[1], dateMeta);
                else
                    return this.isDateEquals(this.value[0], dateMeta);
            }
        }
        else {
            return false;
        }
    }
    isComparable() {
        return this.value != null && typeof this.value !== 'string';
    }
    isMonthSelected(month) {
        if (this.isComparable() && !this.isMultipleSelection()) {
            const [start, end] = this.isRangeSelection() ? this.value : [this.value, this.value];
            const selected = new Date(this.currentYear, month, 1);
            return selected >= start && selected <= (end ?? start);
        }
        return false;
    }
    isMonthDisabled(month) {
        for (let day = 1; day < this.getDaysCountInMonth(month, this.currentYear) + 1; day++) {
            if (this.isSelectable(day, month, this.currentYear, false)) {
                return false;
            }
        }
        return true;
    }
    isYearDisabled(year) {
        return !this.isSelectable(1, this.currentMonth, year, false);
    }
    isYearSelected(year) {
        if (this.isComparable()) {
            let value = this.isRangeSelection() ? this.value[0] : this.value;
            return !this.isMultipleSelection() ? value.getFullYear() === year : false;
        }
        return false;
    }
    isDateEquals(value, dateMeta) {
        if (value && ObjectUtils.isDate(value))
            return value.getDate() === dateMeta.day && value.getMonth() === dateMeta.month && value.getFullYear() === dateMeta.year;
        else
            return false;
    }
    isDateBetween(start, end, dateMeta) {
        let between = false;
        if (ObjectUtils.isDate(start) && ObjectUtils.isDate(end)) {
            let date = new Date(dateMeta.year, dateMeta.month, dateMeta.day);
            return start.getTime() <= date.getTime() && end.getTime() >= date.getTime();
        }
        return between;
    }
    isSingleSelection() {
        return this.selectionMode === 'single';
    }
    isRangeSelection() {
        return this.selectionMode === 'range';
    }
    isMultipleSelection() {
        return this.selectionMode === 'multiple';
    }
    isToday(today, day, month, year) {
        return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
    }
    isSelectable(day, month, year, otherMonth) {
        let validMin = true;
        let validMax = true;
        let validDate = true;
        let validDay = true;
        if (otherMonth && !this.selectOtherMonths) {
            return false;
        }
        if (this.minDate) {
            if (this.minDate.getFullYear() > year) {
                validMin = false;
            }
            else if (this.minDate.getFullYear() === year) {
                if (this.minDate.getMonth() > month) {
                    validMin = false;
                }
                else if (this.minDate.getMonth() === month) {
                    if (this.minDate.getDate() > day) {
                        validMin = false;
                    }
                }
            }
        }
        if (this.maxDate) {
            if (this.maxDate.getFullYear() < year) {
                validMax = false;
            }
            else if (this.maxDate.getFullYear() === year) {
                if (this.maxDate.getMonth() < month) {
                    validMax = false;
                }
                else if (this.maxDate.getMonth() === month) {
                    if (this.maxDate.getDate() < day) {
                        validMax = false;
                    }
                }
            }
        }
        if (this.disabledDates) {
            validDate = !this.isDateDisabled(day, month, year);
        }
        if (this.disabledDays) {
            validDay = !this.isDayDisabled(day, month, year);
        }
        return validMin && validMax && validDate && validDay;
    }
    isDateDisabled(day, month, year) {
        if (this.disabledDates) {
            for (let disabledDate of this.disabledDates) {
                if (disabledDate.getFullYear() === year && disabledDate.getMonth() === month && disabledDate.getDate() === day) {
                    return true;
                }
            }
        }
        return false;
    }
    isDayDisabled(day, month, year) {
        if (this.disabledDays) {
            let weekday = new Date(year, month, day);
            let weekdayNumber = weekday.getDay();
            return this.disabledDays.indexOf(weekdayNumber) !== -1;
        }
        return false;
    }
    onInputFocus(event) {
        this.focus = true;
        if (this.showOnFocus) {
            this.showOverlay();
        }
        this.onFocus.emit(event);
    }
    onInputClick() {
        if (this.showOnFocus && !this.overlayVisible) {
            this.showOverlay();
        }
    }
    onInputBlur(event) {
        this.focus = false;
        this.onBlur.emit(event);
        if (!this.keepInvalid) {
            this.updateInputfield();
        }
        this.onModelTouched();
    }
    onButtonClick(event, inputfield) {
        if (!this.overlayVisible) {
            inputfield.focus();
            this.showOverlay();
        }
        else {
            this.hideOverlay();
        }
    }
    clear() {
        this.inputFieldValue = null;
        this.value = null;
        this.onModelChange(this.value);
        this.onClear.emit();
    }
    onOverlayClick(event) {
        this.overlayService.add({
            originalEvent: event,
            target: this.el.nativeElement
        });
    }
    getMonthName(index) {
        return this.config.getTranslation('monthNames')[index];
    }
    getYear(month) {
        return this.currentView === 'month' ? this.currentYear : month.year;
    }
    switchViewButtonDisabled() {
        return this.numberOfMonths > 1 || this.disabled;
    }
    onPrevButtonClick(event) {
        this.navigationState = { backward: true, button: true };
        this.navBackward(event);
    }
    onNextButtonClick(event) {
        this.navigationState = { backward: false, button: true };
        this.navForward(event);
    }
    onContainerButtonKeydown(event) {
        switch (event.which) {
            //tab
            case 9:
                if (!this.inline) {
                    this.trapFocus(event);
                }
                if (this.inline) {
                    const headerElements = DomHandler.findSingle(this.containerViewChild?.nativeElement, '.p-datepicker-header');
                    const element = event.target;
                    if (element == headerElements.children[headerElements.children.length - 1]) {
                        this.initFocusableCell();
                    }
                }
                break;
            //escape
            case 27:
                this.inputfieldViewChild?.nativeElement.focus();
                this.overlayVisible = false;
                event.preventDefault();
                break;
            default:
                //Noop
                break;
        }
    }
    onInputKeydown(event) {
        this.isKeydown = true;
        if (event.keyCode === 40 && this.contentViewChild) {
            this.trapFocus(event);
        }
        else if (event.keyCode === 27) {
            if (this.overlayVisible) {
                this.inputfieldViewChild?.nativeElement.focus();
                this.overlayVisible = false;
                event.preventDefault();
            }
        }
        else if (event.keyCode === 13) {
            if (this.overlayVisible) {
                this.overlayVisible = false;
                event.preventDefault();
            }
        }
        else if (event.keyCode === 9 && this.contentViewChild) {
            DomHandler.getFocusableElements(this.contentViewChild.nativeElement).forEach((el) => (el.tabIndex = '-1'));
            if (this.overlayVisible) {
                this.overlayVisible = false;
            }
        }
    }
    onDateCellKeydown(event, date, groupIndex) {
        const cellContent = event.currentTarget;
        const cell = cellContent.parentElement;
        switch (event.which) {
            //down arrow
            case 40: {
                cellContent.tabIndex = '-1';
                let cellIndex = DomHandler.index(cell);
                let nextRow = cell.parentElement.nextElementSibling;
                if (nextRow) {
                    let focusCell = nextRow.children[cellIndex].children[0];
                    if (DomHandler.hasClass(focusCell, 'p-disabled')) {
                        this.navigationState = { backward: false };
                        this.navForward(event);
                    }
                    else {
                        nextRow.children[cellIndex].children[0].tabIndex = '0';
                        nextRow.children[cellIndex].children[0].focus();
                    }
                }
                else {
                    this.navigationState = { backward: false };
                    this.navForward(event);
                }
                event.preventDefault();
                break;
            }
            //up arrow
            case 38: {
                cellContent.tabIndex = '-1';
                let cellIndex = DomHandler.index(cell);
                let prevRow = cell.parentElement.previousElementSibling;
                if (prevRow) {
                    let focusCell = prevRow.children[cellIndex].children[0];
                    if (DomHandler.hasClass(focusCell, 'p-disabled')) {
                        this.navigationState = { backward: true };
                        this.navBackward(event);
                    }
                    else {
                        focusCell.tabIndex = '0';
                        focusCell.focus();
                    }
                }
                else {
                    this.navigationState = { backward: true };
                    this.navBackward(event);
                }
                event.preventDefault();
                break;
            }
            //left arrow
            case 37: {
                cellContent.tabIndex = '-1';
                let prevCell = cell.previousElementSibling;
                if (prevCell) {
                    let focusCell = prevCell.children[0];
                    if (DomHandler.hasClass(focusCell, 'p-disabled') || DomHandler.hasClass(focusCell.parentElement, 'p-datepicker-weeknumber')) {
                        this.navigateToMonth(true, groupIndex);
                    }
                    else {
                        focusCell.tabIndex = '0';
                        focusCell.focus();
                    }
                }
                else {
                    this.navigateToMonth(true, groupIndex);
                }
                event.preventDefault();
                break;
            }
            //right arrow
            case 39: {
                cellContent.tabIndex = '-1';
                let nextCell = cell.nextElementSibling;
                if (nextCell) {
                    let focusCell = nextCell.children[0];
                    if (DomHandler.hasClass(focusCell, 'p-disabled')) {
                        this.navigateToMonth(false, groupIndex);
                    }
                    else {
                        focusCell.tabIndex = '0';
                        focusCell.focus();
                    }
                }
                else {
                    this.navigateToMonth(false, groupIndex);
                }
                event.preventDefault();
                break;
            }
            //enter
            //space
            case 13:
            case 32: {
                this.onDateSelect(event, date);
                event.preventDefault();
                break;
            }
            //escape
            case 27: {
                this.inputfieldViewChild?.nativeElement.focus();
                this.overlayVisible = false;
                event.preventDefault();
                break;
            }
            //tab
            case 9: {
                if (!this.inline) {
                    this.trapFocus(event);
                }
                break;
            }
            default:
                //no op
                break;
        }
    }
    onMonthCellKeydown(event, index) {
        const cell = event.currentTarget;
        switch (event.which) {
            //arrows
            case 38:
            case 40: {
                cell.tabIndex = '-1';
                var cells = cell.parentElement.children;
                var cellIndex = DomHandler.index(cell);
                let nextCell = cells[event.which === 40 ? cellIndex + 3 : cellIndex - 3];
                if (nextCell) {
                    nextCell.tabIndex = '0';
                    nextCell.focus();
                }
                event.preventDefault();
                break;
            }
            //left arrow
            case 37: {
                cell.tabIndex = '-1';
                let prevCell = cell.previousElementSibling;
                if (prevCell) {
                    prevCell.tabIndex = '0';
                    prevCell.focus();
                }
                else {
                    this.navigationState = { backward: true };
                    this.navBackward(event);
                }
                event.preventDefault();
                break;
            }
            //right arrow
            case 39: {
                cell.tabIndex = '-1';
                let nextCell = cell.nextElementSibling;
                if (nextCell) {
                    nextCell.tabIndex = '0';
                    nextCell.focus();
                }
                else {
                    this.navigationState = { backward: false };
                    this.navForward(event);
                }
                event.preventDefault();
                break;
            }
            //enter
            //space
            case 13:
            case 32: {
                this.onMonthSelect(event, index);
                event.preventDefault();
                break;
            }
            //escape
            case 27: {
                this.inputfieldViewChild?.nativeElement.focus();
                this.overlayVisible = false;
                event.preventDefault();
                break;
            }
            //tab
            case 9: {
                if (!this.inline) {
                    this.trapFocus(event);
                }
                break;
            }
            default:
                //no op
                break;
        }
    }
    onYearCellKeydown(event, index) {
        const cell = event.currentTarget;
        switch (event.which) {
            //arrows
            case 38:
            case 40: {
                cell.tabIndex = '-1';
                var cells = cell.parentElement.children;
                var cellIndex = DomHandler.index(cell);
                let nextCell = cells[event.which === 40 ? cellIndex + 2 : cellIndex - 2];
                if (nextCell) {
                    nextCell.tabIndex = '0';
                    nextCell.focus();
                }
                event.preventDefault();
                break;
            }
            //left arrow
            case 37: {
                cell.tabIndex = '-1';
                let prevCell = cell.previousElementSibling;
                if (prevCell) {
                    prevCell.tabIndex = '0';
                    prevCell.focus();
                }
                else {
                    this.navigationState = { backward: true };
                    this.navBackward(event);
                }
                event.preventDefault();
                break;
            }
            //right arrow
            case 39: {
                cell.tabIndex = '-1';
                let nextCell = cell.nextElementSibling;
                if (nextCell) {
                    nextCell.tabIndex = '0';
                    nextCell.focus();
                }
                else {
                    this.navigationState = { backward: false };
                    this.navForward(event);
                }
                event.preventDefault();
                break;
            }
            //enter
            //space
            case 13:
            case 32: {
                this.onYearSelect(event, index);
                event.preventDefault();
                break;
            }
            //escape
            case 27: {
                this.inputfieldViewChild?.nativeElement.focus();
                this.overlayVisible = false;
                event.preventDefault();
                break;
            }
            //tab
            case 9: {
                this.trapFocus(event);
                break;
            }
            default:
                //no op
                break;
        }
    }
    navigateToMonth(prev, groupIndex) {
        if (prev) {
            if (this.numberOfMonths === 1 || groupIndex === 0) {
                this.navigationState = { backward: true };
                this.navBackward(event);
            }
            else {
                let prevMonthContainer = this.contentViewChild.nativeElement.children[groupIndex - 1];
                let cells = DomHandler.find(prevMonthContainer, '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
                let focusCell = cells[cells.length - 1];
                focusCell.tabIndex = '0';
                focusCell.focus();
            }
        }
        else {
            if (this.numberOfMonths === 1 || groupIndex === this.numberOfMonths - 1) {
                this.navigationState = { backward: false };
                this.navForward(event);
            }
            else {
                let nextMonthContainer = this.contentViewChild.nativeElement.children[groupIndex + 1];
                let focusCell = DomHandler.findSingle(nextMonthContainer, '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
                focusCell.tabIndex = '0';
                focusCell.focus();
            }
        }
    }
    updateFocus() {
        let cell;
        if (this.navigationState) {
            if (this.navigationState.button) {
                this.initFocusableCell();
                if (this.navigationState.backward)
                    DomHandler.findSingle(this.contentViewChild.nativeElement, '.p-datepicker-prev').focus();
                else
                    DomHandler.findSingle(this.contentViewChild.nativeElement, '.p-datepicker-next').focus();
            }
            else {
                if (this.navigationState.backward) {
                    let cells;
                    if (this.currentView === 'month') {
                        cells = DomHandler.find(this.contentViewChild.nativeElement, '.p-monthpicker .p-monthpicker-month:not(.p-disabled)');
                    }
                    else if (this.currentView === 'year') {
                        cells = DomHandler.find(this.contentViewChild.nativeElement, '.p-yearpicker .p-yearpicker-year:not(.p-disabled)');
                    }
                    else {
                        cells = DomHandler.find(this.contentViewChild.nativeElement, '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
                    }
                    if (cells && cells.length > 0) {
                        cell = cells[cells.length - 1];
                    }
                }
                else {
                    if (this.currentView === 'month') {
                        cell = DomHandler.findSingle(this.contentViewChild.nativeElement, '.p-monthpicker .p-monthpicker-month:not(.p-disabled)');
                    }
                    else if (this.currentView === 'year') {
                        cell = DomHandler.findSingle(this.contentViewChild.nativeElement, '.p-yearpicker .p-yearpicker-year:not(.p-disabled)');
                    }
                    else {
                        cell = DomHandler.findSingle(this.contentViewChild.nativeElement, '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
                    }
                }
                if (cell) {
                    cell.tabIndex = '0';
                    cell.focus();
                }
            }
            this.navigationState = null;
        }
        else {
            this.initFocusableCell();
        }
    }
    initFocusableCell() {
        const contentEl = this.contentViewChild?.nativeElement;
        let cell;
        if (this.currentView === 'month') {
            let cells = DomHandler.find(contentEl, '.p-monthpicker .p-monthpicker-month:not(.p-disabled)');
            let selectedCell = DomHandler.findSingle(contentEl, '.p-monthpicker .p-monthpicker-month.p-highlight');
            cells.forEach((cell) => (cell.tabIndex = -1));
            cell = selectedCell || cells[0];
            if (cells.length === 0) {
                let disabledCells = DomHandler.find(contentEl, '.p-monthpicker .p-monthpicker-month.p-disabled[tabindex = "0"]');
                disabledCells.forEach((cell) => (cell.tabIndex = -1));
            }
        }
        else if (this.currentView === 'year') {
            let cells = DomHandler.find(contentEl, '.p-yearpicker .p-yearpicker-year:not(.p-disabled)');
            let selectedCell = DomHandler.findSingle(contentEl, '.p-yearpicker .p-yearpicker-year.p-highlight');
            cells.forEach((cell) => (cell.tabIndex = -1));
            cell = selectedCell || cells[0];
            if (cells.length === 0) {
                let disabledCells = DomHandler.find(contentEl, '.p-yearpicker .p-yearpicker-year.p-disabled[tabindex = "0"]');
                disabledCells.forEach((cell) => (cell.tabIndex = -1));
            }
        }
        else {
            cell = DomHandler.findSingle(contentEl, 'span.p-highlight');
            if (!cell) {
                let todayCell = DomHandler.findSingle(contentEl, 'td.p-datepicker-today span:not(.p-disabled):not(.p-ink)');
                if (todayCell)
                    cell = todayCell;
                else
                    cell = DomHandler.findSingle(contentEl, '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
            }
        }
        if (cell) {
            cell.tabIndex = '0';
            if (!this.preventFocus && (!this.navigationState || !this.navigationState.button)) {
                setTimeout(() => {
                    if (!this.disabled) {
                        cell.focus();
                    }
                }, 1);
            }
            this.preventFocus = false;
        }
    }
    trapFocus(event) {
        let focusableElements = DomHandler.getFocusableElements(this.contentViewChild.nativeElement);
        if (focusableElements && focusableElements.length > 0) {
            if (!focusableElements[0].ownerDocument.activeElement) {
                focusableElements[0].focus();
            }
            else {
                let focusedIndex = focusableElements.indexOf(focusableElements[0].ownerDocument.activeElement);
                if (event.shiftKey) {
                    if (focusedIndex == -1 || focusedIndex === 0) {
                        if (this.focusTrap) {
                            focusableElements[focusableElements.length - 1].focus();
                        }
                        else {
                            if (focusedIndex === -1)
                                return this.hideOverlay();
                            else if (focusedIndex === 0)
                                return;
                        }
                    }
                    else {
                        focusableElements[focusedIndex - 1].focus();
                    }
                }
                else {
                    if (focusedIndex == -1) {
                        if (this.timeOnly) {
                            focusableElements[0].focus();
                        }
                        else {
                            let spanIndex = 0;
                            for (let i = 0; i < focusableElements.length; i++) {
                                if (focusableElements[i].tagName === 'SPAN')
                                    spanIndex = i;
                            }
                            focusableElements[spanIndex].focus();
                        }
                    }
                    else if (focusedIndex === focusableElements.length - 1) {
                        if (!this.focusTrap && focusedIndex != -1)
                            return this.hideOverlay();
                        focusableElements[0].focus();
                    }
                    else {
                        focusableElements[focusedIndex + 1].focus();
                    }
                }
            }
        }
        event.preventDefault();
    }
    onMonthDropdownChange(m) {
        this.currentMonth = parseInt(m);
        this.onMonthChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
        this.createMonths(this.currentMonth, this.currentYear);
    }
    onYearDropdownChange(y) {
        this.currentYear = parseInt(y);
        this.onYearChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
        this.createMonths(this.currentMonth, this.currentYear);
    }
    convertTo24Hour = function (hours, pm) {
        //@ts-ignore
        if (this.hourFormat == '12') {
            if (hours === 12) {
                return pm ? 12 : 0;
            }
            else {
                return pm ? hours + 12 : hours;
            }
        }
        return hours;
    };
    validateTime(hour, minute, second, pm) {
        let value = this.value;
        const convertedHour = this.convertTo24Hour(hour, pm);
        if (this.isRangeSelection()) {
            value = this.value[1] || this.value[0];
        }
        if (this.isMultipleSelection()) {
            value = this.value[this.value.length - 1];
        }
        const valueDateString = value ? value.toDateString() : null;
        if (this.minDate && valueDateString && this.minDate.toDateString() === valueDateString) {
            if (this.minDate.getHours() > convertedHour) {
                return false;
            }
            if (this.minDate.getHours() === convertedHour) {
                if (this.minDate.getMinutes() > minute) {
                    return false;
                }
                if (this.minDate.getMinutes() === minute) {
                    if (this.minDate.getSeconds() > second) {
                        return false;
                    }
                }
            }
        }
        if (this.maxDate && valueDateString && this.maxDate.toDateString() === valueDateString) {
            if (this.maxDate.getHours() < convertedHour) {
                return false;
            }
            if (this.maxDate.getHours() === convertedHour) {
                if (this.maxDate.getMinutes() < minute) {
                    return false;
                }
                if (this.maxDate.getMinutes() === minute) {
                    if (this.maxDate.getSeconds() < second) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
    incrementHour(event) {
        const prevHour = this.currentHour;
        let newHour = this.currentHour + this.stepHour;
        let newPM = this.pm;
        if (this.hourFormat == '24')
            newHour = newHour >= 24 ? newHour - 24 : newHour;
        else if (this.hourFormat == '12') {
            // Before the AM/PM break, now after
            if (prevHour < 12 && newHour > 11) {
                newPM = !this.pm;
            }
            newHour = newHour >= 13 ? newHour - 12 : newHour;
        }
        if (this.validateTime(newHour, this.currentMinute, this.currentSecond, newPM)) {
            this.currentHour = newHour;
            this.pm = newPM;
        }
        event.preventDefault();
    }
    onTimePickerElementMouseDown(event, type, direction) {
        if (!this.disabled) {
            this.repeat(event, null, type, direction);
            event.preventDefault();
        }
    }
    onTimePickerElementMouseUp(event) {
        if (!this.disabled) {
            this.clearTimePickerTimer();
            this.updateTime();
        }
    }
    onTimePickerElementMouseLeave() {
        if (!this.disabled && this.timePickerTimer) {
            this.clearTimePickerTimer();
            this.updateTime();
        }
    }
    repeat(event, interval, type, direction) {
        let i = interval || 500;
        this.clearTimePickerTimer();
        this.timePickerTimer = setTimeout(() => {
            this.repeat(event, 100, type, direction);
            this.cd.markForCheck();
        }, i);
        switch (type) {
            case 0:
                if (direction === 1)
                    this.incrementHour(event);
                else
                    this.decrementHour(event);
                break;
            case 1:
                if (direction === 1)
                    this.incrementMinute(event);
                else
                    this.decrementMinute(event);
                break;
            case 2:
                if (direction === 1)
                    this.incrementSecond(event);
                else
                    this.decrementSecond(event);
                break;
        }
        this.updateInputfield();
    }
    clearTimePickerTimer() {
        if (this.timePickerTimer) {
            clearTimeout(this.timePickerTimer);
            this.timePickerTimer = null;
        }
    }
    decrementHour(event) {
        let newHour = this.currentHour - this.stepHour;
        let newPM = this.pm;
        if (this.hourFormat == '24')
            newHour = newHour < 0 ? 24 + newHour : newHour;
        else if (this.hourFormat == '12') {
            // If we were at noon/midnight, then switch
            if (this.currentHour === 12) {
                newPM = !this.pm;
            }
            newHour = newHour <= 0 ? 12 + newHour : newHour;
        }
        if (this.validateTime(newHour, this.currentMinute, this.currentSecond, newPM)) {
            this.currentHour = newHour;
            this.pm = newPM;
        }
        event.preventDefault();
    }
    incrementMinute(event) {
        let newMinute = this.currentMinute + this.stepMinute;
        newMinute = newMinute > 59 ? newMinute - 60 : newMinute;
        if (this.validateTime(this.currentHour, newMinute, this.currentSecond, this.pm)) {
            this.currentMinute = newMinute;
        }
        event.preventDefault();
    }
    decrementMinute(event) {
        let newMinute = this.currentMinute - this.stepMinute;
        newMinute = newMinute < 0 ? 60 + newMinute : newMinute;
        if (this.validateTime(this.currentHour, newMinute, this.currentSecond, this.pm)) {
            this.currentMinute = newMinute;
        }
        event.preventDefault();
    }
    incrementSecond(event) {
        let newSecond = this.currentSecond + this.stepSecond;
        newSecond = newSecond > 59 ? newSecond - 60 : newSecond;
        if (this.validateTime(this.currentHour, this.currentMinute, newSecond, this.pm)) {
            this.currentSecond = newSecond;
        }
        event.preventDefault();
    }
    decrementSecond(event) {
        let newSecond = this.currentSecond - this.stepSecond;
        newSecond = newSecond < 0 ? 60 + newSecond : newSecond;
        if (this.validateTime(this.currentHour, this.currentMinute, newSecond, this.pm)) {
            this.currentSecond = newSecond;
        }
        event.preventDefault();
    }
    updateTime() {
        let value = this.value;
        if (this.isRangeSelection()) {
            value = this.value[1] || this.value[0];
        }
        if (this.isMultipleSelection()) {
            value = this.value[this.value.length - 1];
        }
        value = value ? new Date(value.getTime()) : new Date();
        if (this.hourFormat == '12') {
            if (this.currentHour === 12)
                value.setHours(this.pm ? 12 : 0);
            else
                value.setHours(this.pm ? this.currentHour + 12 : this.currentHour);
        }
        else {
            value.setHours(this.currentHour);
        }
        value.setMinutes(this.currentMinute);
        value.setSeconds(this.currentSecond);
        if (this.isRangeSelection()) {
            if (this.value[1])
                value = [this.value[0], value];
            else
                value = [value, null];
        }
        if (this.isMultipleSelection()) {
            value = [...this.value.slice(0, -1), value];
        }
        this.updateModel(value);
        this.onSelect.emit(value);
        this.updateInputfield();
    }
    toggleAMPM(event) {
        const newPM = !this.pm;
        if (this.validateTime(this.currentHour, this.currentMinute, this.currentSecond, newPM)) {
            this.pm = newPM;
            this.updateTime();
        }
        event.preventDefault();
    }
    onUserInput(event) {
        // IE 11 Workaround for input placeholder : https://github.com/primefaces/primeng/issues/2026
        if (!this.isKeydown) {
            return;
        }
        this.isKeydown = false;
        let val = event.target.value;
        try {
            let value = this.parseValueFromString(val);
            if (this.isValidSelection(value)) {
                this.updateModel(value);
                this.updateUI();
            }
            else if (this.keepInvalid) {
                this.updateModel(value);
            }
        }
        catch (err) {
            //invalid date
            let value = this.keepInvalid ? val : null;
            this.updateModel(value);
        }
        this.filled = (val != null && val.length);
        this.onInput.emit(event);
    }
    isValidSelection(value) {
        let isValid = true;
        if (this.isSingleSelection()) {
            if (!this.isSelectable(value.getDate(), value.getMonth(), value.getFullYear(), false)) {
                isValid = false;
            }
        }
        else if (value.every((v) => this.isSelectable(v.getDate(), v.getMonth(), v.getFullYear(), false))) {
            if (this.isRangeSelection()) {
                isValid = value.length > 1 && value[1] > value[0] ? true : false;
            }
        }
        return isValid;
    }
    parseValueFromString(text) {
        if (!text || text.trim().length === 0) {
            return null;
        }
        let value;
        if (this.isSingleSelection()) {
            value = this.parseDateTime(text);
        }
        else if (this.isMultipleSelection()) {
            let tokens = text.split(this.multipleSeparator);
            value = [];
            for (let token of tokens) {
                value.push(this.parseDateTime(token.trim()));
            }
        }
        else if (this.isRangeSelection()) {
            let tokens = text.split(' ' + this.rangeSeparator + ' ');
            value = [];
            for (let i = 0; i < tokens.length; i++) {
                value[i] = this.parseDateTime(tokens[i].trim());
            }
        }
        return value;
    }
    parseDateTime(text) {
        let date;
        let parts = text.split(' ');
        if (this.timeOnly) {
            date = new Date();
            this.populateTime(date, parts[0], parts[1]);
        }
        else {
            const dateFormat = this.getDateFormat();
            if (this.showTime) {
                let ampm = this.hourFormat == '12' ? parts.pop() : null;
                let timeString = parts.pop();
                date = this.parseDate(parts.join(' '), dateFormat);
                this.populateTime(date, timeString, ampm);
            }
            else {
                date = this.parseDate(text, dateFormat);
            }
        }
        return date;
    }
    populateTime(value, timeString, ampm) {
        if (this.hourFormat == '12' && !ampm) {
            throw 'Invalid Time';
        }
        this.pm = ampm === 'PM' || ampm === 'pm';
        let time = this.parseTime(timeString);
        value.setHours(time.hour);
        value.setMinutes(time.minute);
        value.setSeconds(time.second);
    }
    isValidDate(date) {
        return ObjectUtils.isDate(date) && ObjectUtils.isNotEmpty(date);
    }
    updateUI() {
        let propValue = this.value;
        if (Array.isArray(propValue)) {
            propValue = propValue[0];
        }
        let val = this.defaultDate && this.isValidDate(this.defaultDate) && !this.value ? this.defaultDate : propValue && this.isValidDate(propValue) ? propValue : new Date();
        this.currentMonth = val.getMonth();
        this.currentYear = val.getFullYear();
        this.createMonths(this.currentMonth, this.currentYear);
        if (this.showTime || this.timeOnly) {
            this.setCurrentHourPM(val.getHours());
            this.currentMinute = val.getMinutes();
            this.currentSecond = val.getSeconds();
        }
    }
    showOverlay() {
        if (!this.overlayVisible) {
            this.updateUI();
            if (!this.touchUI) {
                this.preventFocus = true;
            }
            this.overlayVisible = true;
        }
    }
    hideOverlay() {
        this.inputfieldViewChild?.nativeElement.focus();
        this.overlayVisible = false;
        this.clearTimePickerTimer();
        if (this.touchUI) {
            this.disableModality();
        }
        this.cd.markForCheck();
    }
    toggle() {
        if (!this.inline) {
            if (!this.overlayVisible) {
                this.showOverlay();
                this.inputfieldViewChild?.nativeElement.focus();
            }
            else {
                this.hideOverlay();
            }
        }
    }
    onOverlayAnimationStart(event) {
        switch (event.toState) {
            case 'visible':
            case 'visibleTouchUI':
                if (!this.inline) {
                    this.overlay = event.element;
                    this.overlay?.setAttribute(this.attributeSelector, '');
                    this.appendOverlay();
                    this.updateFocus();
                    if (this.autoZIndex) {
                        if (this.touchUI)
                            ZIndexUtils.set('modal', this.overlay, this.baseZIndex || this.config.zIndex.modal);
                        else
                            ZIndexUtils.set('overlay', this.overlay, this.baseZIndex || this.config.zIndex.overlay);
                    }
                    this.alignOverlay();
                    this.onShow.emit(event);
                }
                break;
            case 'void':
                this.onOverlayHide();
                this.onClose.emit(event);
                break;
        }
    }
    onOverlayAnimationDone(event) {
        switch (event.toState) {
            case 'visible':
            case 'visibleTouchUI':
                if (!this.inline) {
                    this.bindDocumentClickListener();
                    this.bindDocumentResizeListener();
                    this.bindScrollListener();
                }
                break;
            case 'void':
                if (this.autoZIndex) {
                    ZIndexUtils.clear(event.element);
                }
                break;
        }
    }
    appendOverlay() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                this.document.body.appendChild(this.overlay);
            else
                DomHandler.appendChild(this.overlay, this.appendTo);
        }
    }
    restoreOverlayAppend() {
        if (this.overlay && this.appendTo) {
            this.el.nativeElement.appendChild(this.overlay);
        }
    }
    alignOverlay() {
        if (this.touchUI) {
            this.enableModality(this.overlay);
        }
        else if (this.overlay) {
            if (this.appendTo) {
                if (this.view === 'date') {
                    this.overlay.style.width = DomHandler.getOuterWidth(this.overlay) + 'px';
                    this.overlay.style.minWidth = DomHandler.getOuterWidth(this.inputfieldViewChild?.nativeElement) + 'px';
                }
                else {
                    this.overlay.style.width = DomHandler.getOuterWidth(this.inputfieldViewChild?.nativeElement) + 'px';
                }
                DomHandler.absolutePosition(this.overlay, this.inputfieldViewChild?.nativeElement);
            }
            else {
                DomHandler.relativePosition(this.overlay, this.inputfieldViewChild?.nativeElement);
            }
        }
    }
    enableModality(element) {
        if (!this.mask && this.touchUI) {
            this.mask = this.renderer.createElement('div');
            this.renderer.setStyle(this.mask, 'zIndex', String(parseInt(element.style.zIndex) - 1));
            let maskStyleClass = 'p-component-overlay p-datepicker-mask p-datepicker-mask-scrollblocker p-component-overlay p-component-overlay-enter';
            DomHandler.addMultipleClasses(this.mask, maskStyleClass);
            this.maskClickListener = this.renderer.listen(this.mask, 'click', (event) => {
                this.disableModality();
                this.overlayVisible = false;
            });
            this.renderer.appendChild(this.document.body, this.mask);
            DomHandler.blockBodyScroll();
        }
    }
    disableModality() {
        if (this.mask) {
            DomHandler.addClass(this.mask, 'p-component-overlay-leave');
            if (!this.animationEndListener) {
                this.animationEndListener = this.renderer.listen(this.mask, 'animationend', this.destroyMask.bind(this));
            }
        }
    }
    destroyMask() {
        if (!this.mask) {
            return;
        }
        this.renderer.removeChild(this.document.body, this.mask);
        let bodyChildren = this.document.body.children;
        let hasBlockerMasks;
        for (let i = 0; i < bodyChildren.length; i++) {
            let bodyChild = bodyChildren[i];
            if (DomHandler.hasClass(bodyChild, 'p-datepicker-mask-scrollblocker')) {
                hasBlockerMasks = true;
                break;
            }
        }
        if (!hasBlockerMasks) {
            DomHandler.unblockBodyScroll();
        }
        this.unbindAnimationEndListener();
        this.unbindMaskClickListener();
        this.mask = null;
    }
    unbindMaskClickListener() {
        if (this.maskClickListener) {
            this.maskClickListener();
            this.maskClickListener = null;
        }
    }
    unbindAnimationEndListener() {
        if (this.animationEndListener && this.mask) {
            this.animationEndListener();
            this.animationEndListener = null;
        }
    }
    writeValue(value) {
        this.value = value;
        if (this.value && typeof this.value === 'string') {
            try {
                this.value = this.parseValueFromString(this.value);
            }
            catch {
                if (this.keepInvalid) {
                    this.value = value;
                }
            }
        }
        this.updateInputfield();
        this.updateUI();
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
    getDateFormat() {
        return this.dateFormat || this.getTranslation('dateFormat');
    }
    getFirstDateOfWeek() {
        return this._firstDayOfWeek || this.getTranslation(TranslationKeys.FIRST_DAY_OF_WEEK);
    }
    // Ported from jquery-ui datepicker formatDate
    formatDate(date, format) {
        if (!date) {
            return '';
        }
        let iFormat;
        const lookAhead = (match) => {
            const matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
            if (matches) {
                iFormat++;
            }
            return matches;
        }, formatNumber = (match, value, len) => {
            let num = '' + value;
            if (lookAhead(match)) {
                while (num.length < len) {
                    num = '0' + num;
                }
            }
            return num;
        }, formatName = (match, value, shortNames, longNames) => {
            return lookAhead(match) ? longNames[value] : shortNames[value];
        };
        let output = '';
        let literal = false;
        if (date) {
            for (iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal) {
                    if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
                        literal = false;
                    }
                    else {
                        output += format.charAt(iFormat);
                    }
                }
                else {
                    switch (format.charAt(iFormat)) {
                        case 'd':
                            output += formatNumber('d', date.getDate(), 2);
                            break;
                        case 'D':
                            output += formatName('D', date.getDay(), this.getTranslation(TranslationKeys.DAY_NAMES_SHORT), this.getTranslation(TranslationKeys.DAY_NAMES));
                            break;
                        case 'o':
                            output += formatNumber('o', Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
                            break;
                        case 'm':
                            output += formatNumber('m', date.getMonth() + 1, 2);
                            break;
                        case 'M':
                            output += formatName('M', date.getMonth(), this.getTranslation(TranslationKeys.MONTH_NAMES_SHORT), this.getTranslation(TranslationKeys.MONTH_NAMES));
                            break;
                        case 'y':
                            output += lookAhead('y') ? date.getFullYear() : (date.getFullYear() % 100 < 10 ? '0' : '') + (date.getFullYear() % 100);
                            break;
                        case '@':
                            output += date.getTime();
                            break;
                        case '!':
                            output += date.getTime() * 10000 + this.ticksTo1970;
                            break;
                        case "'":
                            if (lookAhead("'")) {
                                output += "'";
                            }
                            else {
                                literal = true;
                            }
                            break;
                        default:
                            output += format.charAt(iFormat);
                    }
                }
            }
        }
        return output;
    }
    formatTime(date) {
        if (!date) {
            return '';
        }
        let output = '';
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        if (this.hourFormat == '12' && hours > 11 && hours != 12) {
            hours -= 12;
        }
        if (this.hourFormat == '12') {
            output += hours === 0 ? 12 : hours < 10 ? '0' + hours : hours;
        }
        else {
            output += hours < 10 ? '0' + hours : hours;
        }
        output += ':';
        output += minutes < 10 ? '0' + minutes : minutes;
        if (this.showSeconds) {
            output += ':';
            output += seconds < 10 ? '0' + seconds : seconds;
        }
        if (this.hourFormat == '12') {
            output += date.getHours() > 11 ? ' PM' : ' AM';
        }
        return output;
    }
    parseTime(value) {
        let tokens = value.split(':');
        let validTokenLength = this.showSeconds ? 3 : 2;
        if (tokens.length !== validTokenLength) {
            throw 'Invalid time';
        }
        let h = parseInt(tokens[0]);
        let m = parseInt(tokens[1]);
        let s = this.showSeconds ? parseInt(tokens[2]) : null;
        if (isNaN(h) || isNaN(m) || h > 23 || m > 59 || (this.hourFormat == '12' && h > 12) || (this.showSeconds && (isNaN(s) || s > 59))) {
            throw 'Invalid time';
        }
        else {
            if (this.hourFormat == '12') {
                if (h !== 12 && this.pm) {
                    h += 12;
                }
                else if (!this.pm && h === 12) {
                    h -= 12;
                }
            }
            return { hour: h, minute: m, second: s };
        }
    }
    // Ported from jquery-ui datepicker parseDate
    parseDate(value, format) {
        if (format == null || value == null) {
            throw 'Invalid arguments';
        }
        value = typeof value === 'object' ? value.toString() : value + '';
        if (value === '') {
            return null;
        }
        let iFormat, dim, extra, iValue = 0, shortYearCutoff = typeof this.shortYearCutoff !== 'string' ? this.shortYearCutoff : (new Date().getFullYear() % 100) + parseInt(this.shortYearCutoff, 10), year = -1, month = -1, day = -1, doy = -1, literal = false, date, lookAhead = (match) => {
            let matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
            if (matches) {
                iFormat++;
            }
            return matches;
        }, getNumber = (match) => {
            let isDoubled = lookAhead(match), size = match === '@' ? 14 : match === '!' ? 20 : match === 'y' && isDoubled ? 4 : match === 'o' ? 3 : 2, minSize = match === 'y' ? size : 1, digits = new RegExp('^\\d{' + minSize + ',' + size + '}'), num = value.substring(iValue).match(digits);
            if (!num) {
                throw 'Missing number at position ' + iValue;
            }
            iValue += num[0].length;
            return parseInt(num[0], 10);
        }, getName = (match, shortNames, longNames) => {
            let index = -1;
            let arr = lookAhead(match) ? longNames : shortNames;
            let names = [];
            for (let i = 0; i < arr.length; i++) {
                names.push([i, arr[i]]);
            }
            names.sort((a, b) => {
                return -(a[1].length - b[1].length);
            });
            for (let i = 0; i < names.length; i++) {
                let name = names[i][1];
                if (value.substr(iValue, name.length).toLowerCase() === name.toLowerCase()) {
                    index = names[i][0];
                    iValue += name.length;
                    break;
                }
            }
            if (index !== -1) {
                return index + 1;
            }
            else {
                throw 'Unknown name at position ' + iValue;
            }
        }, checkLiteral = () => {
            if (value.charAt(iValue) !== format.charAt(iFormat)) {
                throw 'Unexpected literal at position ' + iValue;
            }
            iValue++;
        };
        if (this.view === 'month') {
            day = 1;
        }
        for (iFormat = 0; iFormat < format.length; iFormat++) {
            if (literal) {
                if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
                    literal = false;
                }
                else {
                    checkLiteral();
                }
            }
            else {
                switch (format.charAt(iFormat)) {
                    case 'd':
                        day = getNumber('d');
                        break;
                    case 'D':
                        getName('D', this.getTranslation(TranslationKeys.DAY_NAMES_SHORT), this.getTranslation(TranslationKeys.DAY_NAMES));
                        break;
                    case 'o':
                        doy = getNumber('o');
                        break;
                    case 'm':
                        month = getNumber('m');
                        break;
                    case 'M':
                        month = getName('M', this.getTranslation(TranslationKeys.MONTH_NAMES_SHORT), this.getTranslation(TranslationKeys.MONTH_NAMES));
                        break;
                    case 'y':
                        year = getNumber('y');
                        break;
                    case '@':
                        date = new Date(getNumber('@'));
                        year = date.getFullYear();
                        month = date.getMonth() + 1;
                        day = date.getDate();
                        break;
                    case '!':
                        date = new Date((getNumber('!') - this.ticksTo1970) / 10000);
                        year = date.getFullYear();
                        month = date.getMonth() + 1;
                        day = date.getDate();
                        break;
                    case "'":
                        if (lookAhead("'")) {
                            checkLiteral();
                        }
                        else {
                            literal = true;
                        }
                        break;
                    default:
                        checkLiteral();
                }
            }
        }
        if (iValue < value.length) {
            extra = value.substr(iValue);
            if (!/^\s+/.test(extra)) {
                throw 'Extra/unparsed characters found in date: ' + extra;
            }
        }
        if (year === -1) {
            year = new Date().getFullYear();
        }
        else if (year < 100) {
            year += new Date().getFullYear() - (new Date().getFullYear() % 100) + (year <= shortYearCutoff ? 0 : -100);
        }
        if (doy > -1) {
            month = 1;
            day = doy;
            do {
                dim = this.getDaysCountInMonth(year, month - 1);
                if (day <= dim) {
                    break;
                }
                month++;
                day -= dim;
            } while (true);
        }
        if (this.view === 'year') {
            month = month === -1 ? 1 : month;
            day = day === -1 ? 1 : day;
        }
        date = this.daylightSavingAdjust(new Date(year, month - 1, day));
        if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
            throw 'Invalid date'; // E.g. 31/02/00
        }
        return date;
    }
    daylightSavingAdjust(date) {
        if (!date) {
            return null;
        }
        date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
        return date;
    }
    updateFilledState() {
        this.filled = (this.inputFieldValue && this.inputFieldValue != '');
    }
    onTodayButtonClick(event) {
        const date = new Date();
        const dateMeta = { day: date.getDate(), month: date.getMonth(), year: date.getFullYear(), otherMonth: date.getMonth() !== this.currentMonth || date.getFullYear() !== this.currentYear, today: true, selectable: true };
        this.createMonths(date.getMonth(), date.getFullYear());
        this.onDateSelect(event, dateMeta);
        this.onTodayClick.emit(event);
    }
    onClearButtonClick(event) {
        this.updateModel(null);
        this.updateInputfield();
        this.hideOverlay();
        this.onClearClick.emit(event);
    }
    createResponsiveStyle() {
        if (this.numberOfMonths > 1 && this.responsiveOptions) {
            if (!this.responsiveStyleElement) {
                this.responsiveStyleElement = this.renderer.createElement('style');
                this.responsiveStyleElement.type = 'text/css';
                this.renderer.appendChild(this.document.body, this.responsiveStyleElement);
            }
            let innerHTML = '';
            if (this.responsiveOptions) {
                let responsiveOptions = [...this.responsiveOptions].filter((o) => !!(o.breakpoint && o.numMonths)).sort((o1, o2) => -1 * o1.breakpoint.localeCompare(o2.breakpoint, undefined, { numeric: true }));
                for (let i = 0; i < responsiveOptions.length; i++) {
                    let { breakpoint, numMonths } = responsiveOptions[i];
                    let styles = `
                        .p-datepicker[${this.attributeSelector}] .p-datepicker-group:nth-child(${numMonths}) .p-datepicker-next {
                            display: inline-flex !important;
                        }
                    `;
                    for (let j = numMonths; j < this.numberOfMonths; j++) {
                        styles += `
                            .p-datepicker[${this.attributeSelector}] .p-datepicker-group:nth-child(${j + 1}) {
                                display: none !important;
                            }
                        `;
                    }
                    innerHTML += `
                        @media screen and (max-width: ${breakpoint}) {
                            ${styles}
                        }
                    `;
                }
            }
            this.responsiveStyleElement.innerHTML = innerHTML;
        }
    }
    destroyResponsiveStyleElement() {
        if (this.responsiveStyleElement) {
            this.responsiveStyleElement.remove();
            this.responsiveStyleElement = null;
        }
    }
    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            this.zone.runOutsideAngular(() => {
                const documentTarget = this.el ? this.el.nativeElement.ownerDocument : this.document;
                this.documentClickListener = this.renderer.listen(documentTarget, 'mousedown', (event) => {
                    if (this.isOutsideClicked(event) && this.overlayVisible) {
                        this.zone.run(() => {
                            this.hideOverlay();
                            this.onClickOutside.emit(event);
                            this.cd.markForCheck();
                        });
                    }
                });
            });
        }
    }
    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }
    bindDocumentResizeListener() {
        if (!this.documentResizeListener && !this.touchUI) {
            this.documentResizeListener = this.renderer.listen(this.window, 'resize', this.onWindowResize.bind(this));
        }
    }
    unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
            this.documentResizeListener();
            this.documentResizeListener = null;
        }
    }
    bindScrollListener() {
        if (!this.scrollHandler) {
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.containerViewChild?.nativeElement, () => {
                if (this.overlayVisible) {
                    this.hideOverlay();
                }
            });
        }
        this.scrollHandler.bindScrollListener();
    }
    unbindScrollListener() {
        if (this.scrollHandler) {
            this.scrollHandler.unbindScrollListener();
        }
    }
    isOutsideClicked(event) {
        return !(this.el.nativeElement.isSameNode(event.target) || this.isNavIconClicked(event) || this.el.nativeElement.contains(event.target) || (this.overlay && this.overlay.contains(event.target)));
    }
    isNavIconClicked(event) {
        return (DomHandler.hasClass(event.target, 'p-datepicker-prev') || DomHandler.hasClass(event.target, 'p-datepicker-prev-icon') || DomHandler.hasClass(event.target, 'p-datepicker-next') || DomHandler.hasClass(event.target, 'p-datepicker-next-icon'));
    }
    onWindowResize() {
        if (this.overlayVisible && !DomHandler.isTouchDevice()) {
            this.hideOverlay();
        }
    }
    onOverlayHide() {
        this.currentView = this.view;
        if (this.mask) {
            this.destroyMask();
        }
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.unbindScrollListener();
        this.overlay = null;
    }
    ngOnDestroy() {
        if (this.scrollHandler) {
            this.scrollHandler.destroy();
            this.scrollHandler = null;
        }
        if (this.translationSubscription) {
            this.translationSubscription.unsubscribe();
        }
        if (this.overlay && this.autoZIndex) {
            ZIndexUtils.clear(this.overlay);
        }
        this.destroyResponsiveStyleElement();
        this.clearTimePickerTimer();
        this.restoreOverlayAppend();
        this.onOverlayHide();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: Calendar, deps: [{ token: DOCUMENT }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }, { token: i1.PrimeNGConfig }, { token: i1.OverlayService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: Calendar, selector: "p-calendar", inputs: { style: "style", styleClass: "styleClass", inputStyle: "inputStyle", inputId: "inputId", name: "name", inputStyleClass: "inputStyleClass", placeholder: "placeholder", ariaLabelledBy: "ariaLabelledBy", ariaLabel: "ariaLabel", iconAriaLabel: "iconAriaLabel", disabled: "disabled", dateFormat: "dateFormat", multipleSeparator: "multipleSeparator", rangeSeparator: "rangeSeparator", inline: "inline", showOtherMonths: "showOtherMonths", selectOtherMonths: "selectOtherMonths", showIcon: "showIcon", icon: "icon", appendTo: "appendTo", readonlyInput: "readonlyInput", shortYearCutoff: "shortYearCutoff", monthNavigator: "monthNavigator", yearNavigator: "yearNavigator", hourFormat: "hourFormat", timeOnly: "timeOnly", stepHour: "stepHour", stepMinute: "stepMinute", stepSecond: "stepSecond", showSeconds: "showSeconds", required: "required", showOnFocus: "showOnFocus", showWeek: "showWeek", showClear: "showClear", dataType: "dataType", selectionMode: "selectionMode", maxDateCount: "maxDateCount", showButtonBar: "showButtonBar", todayButtonStyleClass: "todayButtonStyleClass", clearButtonStyleClass: "clearButtonStyleClass", autoZIndex: "autoZIndex", baseZIndex: "baseZIndex", panelStyleClass: "panelStyleClass", panelStyle: "panelStyle", keepInvalid: "keepInvalid", hideOnDateTimeSelect: "hideOnDateTimeSelect", touchUI: "touchUI", timeSeparator: "timeSeparator", focusTrap: "focusTrap", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions", tabindex: "tabindex", minDate: "minDate", maxDate: "maxDate", disabledDates: "disabledDates", disabledDays: "disabledDays", yearRange: "yearRange", showTime: "showTime", responsiveOptions: "responsiveOptions", numberOfMonths: "numberOfMonths", firstDayOfWeek: "firstDayOfWeek", locale: "locale", view: "view", defaultDate: "defaultDate" }, outputs: { onFocus: "onFocus", onBlur: "onBlur", onClose: "onClose", onSelect: "onSelect", onClear: "onClear", onInput: "onInput", onTodayClick: "onTodayClick", onClearClick: "onClearClick", onMonthChange: "onMonthChange", onYearChange: "onYearChange", onClickOutside: "onClickOutside", onShow: "onShow" }, host: { properties: { "class.p-inputwrapper-filled": "filled", "class.p-inputwrapper-focus": "focus", "class.p-calendar-clearable": "showClear && !disabled" }, classAttribute: "p-element p-inputwrapper" }, providers: [CALENDAR_VALUE_ACCESSOR], queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "containerViewChild", first: true, predicate: ["container"], descendants: true }, { propertyName: "inputfieldViewChild", first: true, predicate: ["inputfield"], descendants: true }, { propertyName: "content", first: true, predicate: ["contentWrapper"], descendants: true }], ngImport: i0, template: `
        <span #container [ngClass]="{ 'p-calendar': true, 'p-calendar-w-btn': showIcon, 'p-calendar-timeonly': timeOnly, 'p-calendar-disabled': disabled, 'p-focus': focus || overlayVisible }" [ngStyle]="style" [class]="styleClass">
            <ng-template [ngIf]="!inline">
                <input
                    #inputfield
                    type="text"
                    role="combobox"
                    [attr.id]="inputId"
                    [attr.name]="name"
                    [attr.required]="required"
                    [attr.aria-required]="required"
                    aria-autocomplete="none"
                    aria-haspopup="dialog"
                    [attr.aria-expanded]="overlayVisible"
                    [attr.aria-controls]="panelId"
                    [attr.aria-labelledby]="ariaLabelledBy"
                    [attr.aria-label]="ariaLabel"
                    [value]="inputFieldValue"
                    (focus)="onInputFocus($event)"
                    (keydown)="onInputKeydown($event)"
                    (click)="onInputClick()"
                    (blur)="onInputBlur($event)"
                    [readonly]="readonlyInput"
                    (input)="onUserInput($event)"
                    [ngStyle]="inputStyle"
                    [class]="inputStyleClass"
                    [placeholder]="placeholder || ''"
                    [disabled]="disabled"
                    [attr.tabindex]="tabindex"
                    [attr.inputmode]="touchUI ? 'off' : null"
                    [ngClass]="'p-inputtext p-component'"
                    autocomplete="off"
                />
                <ng-container *ngIf="showClear && !disabled && value != null">
                    <TimesIcon *ngIf="!clearIconTemplate" [styleClass]="'p-calendar-clear-icon'" (click)="clear()" />
                    <span *ngIf="clearIconTemplate" class="p-calendar-clear-icon" (click)="clear()">
                        <ng-template *ngTemplateOutlet="clearIconTemplate"></ng-template>
                    </span>
                </ng-container>
                <button
                    type="button"
                    [attr.aria-label]="iconButtonAriaLabel"
                    aria-haspopup="dialog"
                    [attr.aria-expanded]="overlayVisible"
                    [attr.aria-controls]="panelId"
                    pButton
                    pRipple
                    *ngIf="showIcon"
                    (click)="onButtonClick($event, inputfield)"
                    class="p-datepicker-trigger p-button-icon-only"
                    [disabled]="disabled"
                    tabindex="0"
                >
                    <span *ngIf="icon" [ngClass]="icon"></span>
                    <ng-container *ngIf="!icon">
                        <CalendarIcon *ngIf="!triggerIconTemplate" />
                        <ng-template *ngTemplateOutlet="triggerIconTemplate"></ng-template>
                    </ng-container>
                </button>
            </ng-template>
            <div
                #contentWrapper
                [class]="panelStyleClass"
                [ngStyle]="panelStyle"
                [ngClass]="{
                    'p-datepicker p-component': true,
                    'p-datepicker-inline': inline,
                    'p-disabled': disabled,
                    'p-datepicker-timeonly': timeOnly,
                    'p-datepicker-multiple-month': this.numberOfMonths > 1,
                    'p-datepicker-monthpicker': view === 'month',
                    'p-datepicker-touch-ui': touchUI
                }"
                [@overlayAnimation]="
                    touchUI
                        ? { value: 'visibleTouchUI', params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions } }
                        : { value: 'visible', params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions } }
                "
                [attr.aria-label]="getTranslation('chooseDate')"
                [attr.role]="inline ? null : 'dialog'"
                [attr.aria-modal]="inline ? null : 'true'"
                [@.disabled]="inline === true"
                (@overlayAnimation.start)="onOverlayAnimationStart($event)"
                (@overlayAnimation.done)="onOverlayAnimationDone($event)"
                (click)="onOverlayClick($event)"
                *ngIf="inline || overlayVisible"
            >
                <ng-content select="p-header"></ng-content>
                <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                <ng-container *ngIf="!timeOnly">
                    <div class="p-datepicker-group-container">
                        <div class="p-datepicker-group" *ngFor="let month of months; let i = index">
                            <div class="p-datepicker-header">
                                <button (keydown)="onContainerButtonKeydown($event)" class="p-datepicker-prev p-link" (click)="onPrevButtonClick($event)" *ngIf="i === 0" type="button" [attr.aria-label]="prevIconAriaLabel" pRipple>
                                    <ChevronLeftIcon [styleClass]="'p-datepicker-prev-icon'" *ngIf="!previousIconTemplate" />
                                    <span *ngIf="previousIconTemplate" class="p-datepicker-prev-icon">
                                        <ng-template *ngTemplateOutlet="previousIconTemplate"></ng-template>
                                    </span>
                                </button>
                                <div class="p-datepicker-title">
                                    <button
                                        type="button"
                                        (click)="switchToMonthView($event)"
                                        (keydown)="onContainerButtonKeydown($event)"
                                        *ngIf="currentView === 'date'"
                                        class="p-datepicker-month p-link"
                                        [disabled]="switchViewButtonDisabled()"
                                        [attr.aria-label]="this.getTranslation('chooseMonth')"
                                    >
                                        {{ getMonthName(month.month) }}
                                    </button>
                                    <button
                                        type="button"
                                        (click)="switchToYearView($event)"
                                        (keydown)="onContainerButtonKeydown($event)"
                                        *ngIf="currentView !== 'year'"
                                        class="p-datepicker-year p-link"
                                        [disabled]="switchViewButtonDisabled()"
                                        [attr.aria-label]="getTranslation('chooseYear')"
                                    >
                                        {{ getYear(month) }}
                                    </button>
                                    <span class="p-datepicker-decade" *ngIf="currentView === 'year'">
                                        <ng-container *ngIf="!decadeTemplate">{{ yearPickerValues()[0] }} - {{ yearPickerValues()[yearPickerValues().length - 1] }}</ng-container>
                                        <ng-container *ngTemplateOutlet="decadeTemplate; context: { $implicit: yearPickerValues }"></ng-container>
                                    </span>
                                </div>
                                <button
                                    (keydown)="onContainerButtonKeydown($event)"
                                    class="p-datepicker-next p-link"
                                    (click)="onNextButtonClick($event)"
                                    [style.display]="numberOfMonths === 1 ? 'inline-flex' : i === numberOfMonths - 1 ? 'inline-flex' : 'none'"
                                    type="button"
                                    [attr.aria-label]="nextIconAriaLabel"
                                    pRipple
                                >
                                    <ChevronRightIcon [styleClass]="'p-datepicker-next-icon'" *ngIf="!nextIconTemplate" />
                                    <span *ngIf="nextIconTemplate" class="p-datepicker-next-icon">
                                        <ng-template *ngTemplateOutlet="nextIconTemplate"></ng-template>
                                    </span>
                                </button>
                            </div>
                            <div class="p-datepicker-calendar-container" *ngIf="currentView === 'date'">
                                <table class="p-datepicker-calendar" role="grid">
                                    <thead>
                                        <tr>
                                            <th *ngIf="showWeek" class="p-datepicker-weekheader p-disabled">
                                                <span>{{ getTranslation('weekHeader') }}</span>
                                            </th>
                                            <th scope="col" *ngFor="let weekDay of weekDays; let begin = first; let end = last">
                                                <span>{{ weekDay }}</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr *ngFor="let week of month.dates; let j = index">
                                            <td *ngIf="showWeek" class="p-datepicker-weeknumber">
                                                <span class="p-disabled">
                                                    {{ month.weekNumbers[j] }}
                                                </span>
                                            </td>
                                            <td *ngFor="let date of week" [attr.aria-label]="date.day" [ngClass]="{ 'p-datepicker-other-month': date.otherMonth, 'p-datepicker-today': date.today }">
                                                <ng-container *ngIf="date.otherMonth ? showOtherMonths : true">
                                                    <span
                                                        [ngClass]="{ 'p-highlight': isSelected(date) && date.selectable, 'p-disabled': !date.selectable }"
                                                        (click)="onDateSelect($event, date)"
                                                        draggable="false"
                                                        (keydown)="onDateCellKeydown($event, date, i)"
                                                        pRipple
                                                    >
                                                        <ng-container *ngIf="!dateTemplate && (date.selectable || !disabledDateTemplate)">{{ date.day }}</ng-container>
                                                        <ng-container *ngIf="date.selectable || !disabledDateTemplate">
                                                            <ng-container *ngTemplateOutlet="dateTemplate; context: { $implicit: date }"></ng-container>
                                                        </ng-container>
                                                        <ng-container *ngIf="!date.selectable">
                                                            <ng-container *ngTemplateOutlet="disabledDateTemplate; context: { $implicit: date }"></ng-container>
                                                        </ng-container>
                                                    </span>
                                                    <div *ngIf="isSelected(date)" class="p-hidden-accessible" aria-live="polite">
                                                        {{ date.day }}
                                                    </div>
                                                </ng-container>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="p-monthpicker" *ngIf="currentView === 'month'">
                        <span
                            *ngFor="let m of monthPickerValues(); let i = index"
                            (click)="onMonthSelect($event, i)"
                            (keydown)="onMonthCellKeydown($event, i)"
                            class="p-monthpicker-month"
                            [ngClass]="{ 'p-highlight': isMonthSelected(i), 'p-disabled': isMonthDisabled(i) }"
                            pRipple
                        >
                            {{ m }}
                            <div *ngIf="isMonthSelected(i)" class="p-hidden-accessible" aria-live="polite">
                                {{ m }}
                            </div>
                        </span>
                    </div>
                    <div class="p-yearpicker" *ngIf="currentView === 'year'">
                        <span
                            *ngFor="let y of yearPickerValues()"
                            (click)="onYearSelect($event, y)"
                            (keydown)="onYearCellKeydown($event, y)"
                            class="p-yearpicker-year"
                            [ngClass]="{ 'p-highlight': isYearSelected(y), 'p-disabled': isYearDisabled(y) }"
                            pRipple
                        >
                            {{ y }}
                            <div *ngIf="isYearSelected(y)" class="p-hidden-accessible" aria-live="polite">
                                {{ y }}
                            </div>
                        </span>
                    </div>
                </ng-container>
                <div class="p-timepicker" *ngIf="(showTime || timeOnly) && currentView === 'date'">
                    <div class="p-hour-picker">
                        <button
                            class="p-link"
                            type="button"
                            (keydown)="onContainerButtonKeydown($event)"
                            (keydown.enter)="incrementHour($event)"
                            (keydown.space)="incrementHour($event)"
                            (mousedown)="onTimePickerElementMouseDown($event, 0, 1)"
                            (mouseup)="onTimePickerElementMouseUp($event)"
                            (keyup.enter)="onTimePickerElementMouseUp($event)"
                            (keyup.space)="onTimePickerElementMouseUp($event)"
                            (mouseleave)="onTimePickerElementMouseLeave()"
                            [attr.aria-label]="getTranslation('nextHour')"
                            pRipple
                        >
                            <ChevronUpIcon *ngIf="!incrementIconTemplate" />
                            <ng-template *ngTemplateOutlet="incrementIconTemplate"></ng-template>
                        </button>
                        <span><ng-container *ngIf="currentHour < 10">0</ng-container>{{ currentHour }}</span>
                        <button
                            class="p-link"
                            type="button"
                            (keydown)="onContainerButtonKeydown($event)"
                            (keydown.enter)="decrementHour($event)"
                            (keydown.space)="decrementHour($event)"
                            (mousedown)="onTimePickerElementMouseDown($event, 0, -1)"
                            (mouseup)="onTimePickerElementMouseUp($event)"
                            (keyup.enter)="onTimePickerElementMouseUp($event)"
                            (keyup.space)="onTimePickerElementMouseUp($event)"
                            (mouseleave)="onTimePickerElementMouseLeave()"
                            [attr.aria-label]="getTranslation('prevHour')"
                            pRipple
                        >
                            <ChevronDownIcon *ngIf="!decrementIconTemplate" />
                            <ng-template *ngTemplateOutlet="decrementIconTemplate"></ng-template>
                        </button>
                    </div>
                    <div class="p-separator">
                        <span>{{ timeSeparator }}</span>
                    </div>
                    <div class="p-minute-picker">
                        <button
                            class="p-link"
                            type="button"
                            (keydown)="onContainerButtonKeydown($event)"
                            (keydown.enter)="incrementMinute($event)"
                            (keydown.space)="incrementMinute($event)"
                            (mousedown)="onTimePickerElementMouseDown($event, 1, 1)"
                            (mouseup)="onTimePickerElementMouseUp($event)"
                            (keyup.enter)="onTimePickerElementMouseUp($event)"
                            (keyup.space)="onTimePickerElementMouseUp($event)"
                            (mouseleave)="onTimePickerElementMouseLeave()"
                            [attr.aria-label]="getTranslation('nextMinute')"
                            pRipple
                        >
                            <ChevronUpIcon *ngIf="!incrementIconTemplate" />
                            <ng-template *ngTemplateOutlet="incrementIconTemplate"></ng-template>
                        </button>
                        <span><ng-container *ngIf="currentMinute < 10">0</ng-container>{{ currentMinute }}</span>
                        <button
                            class="p-link"
                            type="button"
                            (keydown)="onContainerButtonKeydown($event)"
                            (keydown.enter)="decrementMinute($event)"
                            (keydown.space)="decrementMinute($event)"
                            (mousedown)="onTimePickerElementMouseDown($event, 1, -1)"
                            (mouseup)="onTimePickerElementMouseUp($event)"
                            (keyup.enter)="onTimePickerElementMouseUp($event)"
                            (keyup.space)="onTimePickerElementMouseUp($event)"
                            (mouseleave)="onTimePickerElementMouseLeave()"
                            [attr.aria-label]="getTranslation('prevMinute')"
                            pRipple
                        >
                            <ChevronDownIcon *ngIf="!decrementIconTemplate" />
                            <ng-template *ngTemplateOutlet="decrementIconTemplate"></ng-template>
                        </button>
                    </div>
                    <div class="p-separator" *ngIf="showSeconds">
                        <span>{{ timeSeparator }}</span>
                    </div>
                    <div class="p-second-picker" *ngIf="showSeconds">
                        <button
                            class="p-link"
                            type="button"
                            (keydown)="onContainerButtonKeydown($event)"
                            (keydown.enter)="incrementSecond($event)"
                            (keydown.space)="incrementSecond($event)"
                            (mousedown)="onTimePickerElementMouseDown($event, 2, 1)"
                            (mouseup)="onTimePickerElementMouseUp($event)"
                            (keyup.enter)="onTimePickerElementMouseUp($event)"
                            (keyup.space)="onTimePickerElementMouseUp($event)"
                            (mouseleave)="onTimePickerElementMouseLeave()"
                            [attr.aria-label]="getTranslation('nextSecond')"
                            pRipple
                        >
                            <ChevronUpIcon *ngIf="!incrementIconTemplate" />
                            <ng-template *ngTemplateOutlet="incrementIconTemplate"></ng-template>
                        </button>
                        <span><ng-container *ngIf="currentSecond < 10">0</ng-container>{{ currentSecond }}</span>
                        <button
                            class="p-link"
                            type="button"
                            (keydown)="onContainerButtonKeydown($event)"
                            (keydown.enter)="decrementSecond($event)"
                            (keydown.space)="decrementSecond($event)"
                            (mousedown)="onTimePickerElementMouseDown($event, 2, -1)"
                            (mouseup)="onTimePickerElementMouseUp($event)"
                            (keyup.enter)="onTimePickerElementMouseUp($event)"
                            (keyup.space)="onTimePickerElementMouseUp($event)"
                            (mouseleave)="onTimePickerElementMouseLeave()"
                            [attr.aria-label]="getTranslation('prevSecond')"
                            pRipple
                        >
                            <ChevronDownIcon *ngIf="!decrementIconTemplate" />
                            <ng-template *ngTemplateOutlet="decrementIconTemplate"></ng-template>
                        </button>
                    </div>
                    <div class="p-ampm-picker" *ngIf="hourFormat == '12'">
                        <button class="p-link" type="button" (keydown)="onContainerButtonKeydown($event)" (click)="toggleAMPM($event)" (keydown.enter)="toggleAMPM($event)" [attr.aria-label]="getTranslation('am')" pRipple>
                            <ChevronUpIcon *ngIf="!incrementIconTemplate" />
                            <ng-template *ngTemplateOutlet="incrementIconTemplate"></ng-template>
                        </button>
                        <span>{{ pm ? 'PM' : 'AM' }}</span>
                        <button class="p-link" type="button" (keydown)="onContainerButtonKeydown($event)" (click)="toggleAMPM($event)" (keydown.enter)="toggleAMPM($event)" [attr.aria-label]="getTranslation('pm')" pRipple>
                            <ChevronDownIcon *ngIf="!decrementIconTemplate" />
                            <ng-template *ngTemplateOutlet="decrementIconTemplate"></ng-template>
                        </button>
                    </div>
                </div>
                <div class="p-datepicker-buttonbar" *ngIf="showButtonBar">
                    <button type="button" [label]="getTranslation('today')" (keydown)="onContainerButtonKeydown($event)" (click)="onTodayButtonClick($event)" pButton pRipple [ngClass]="[todayButtonStyleClass]"></button>
                    <button type="button" [label]="getTranslation('clear')" (keydown)="onContainerButtonKeydown($event)" (click)="onClearButtonClick($event)" pButton pRipple [ngClass]="[clearButtonStyleClass]"></button>
                </div>
                <ng-content select="p-footer"></ng-content>
                <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
            </div>
        </span>
    `, isInline: true, styles: ["@layer primeng{.p-calendar{position:relative;display:inline-flex;max-width:100%}.p-calendar .p-inputtext{flex:1 1 auto;width:1%}.p-calendar-w-btn .p-inputtext{border-top-right-radius:0;border-bottom-right-radius:0}.p-calendar-w-btn .p-datepicker-trigger{border-top-left-radius:0;border-bottom-left-radius:0}.p-fluid .p-calendar{display:flex}.p-fluid .p-calendar .p-inputtext{width:1%}.p-calendar .p-datepicker{min-width:100%}.p-datepicker{width:auto;position:absolute;top:0;left:0}.p-datepicker-inline{display:inline-block;position:static;overflow-x:auto}.p-datepicker-header{display:flex;align-items:center;justify-content:space-between}.p-datepicker-header .p-datepicker-title{margin:0 auto}.p-datepicker-prev,.p-datepicker-next{cursor:pointer;display:inline-flex;justify-content:center;align-items:center;overflow:hidden;position:relative}.p-datepicker-multiple-month .p-datepicker-group-container .p-datepicker-group{flex:1 1 auto}.p-datepicker-multiple-month .p-datepicker-group-container{display:flex}.p-datepicker table{width:100%;border-collapse:collapse}.p-datepicker td>span{display:flex;justify-content:center;align-items:center;cursor:pointer;margin:0 auto;overflow:hidden;position:relative}.p-monthpicker-month{width:33.3%;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;overflow:hidden;position:relative}.p-datepicker-buttonbar{display:flex;justify-content:space-between;align-items:center}.p-timepicker{display:flex;justify-content:center;align-items:center}.p-timepicker button{display:flex;align-items:center;justify-content:center;cursor:pointer;overflow:hidden;position:relative}.p-timepicker>div{display:flex;align-items:center;flex-direction:column}.p-datepicker-touch-ui,.p-calendar .p-datepicker-touch-ui{position:fixed;top:50%;left:50%;min-width:80vw;transform:translate(-50%,-50%)}.p-yearpicker-year{width:50%;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;overflow:hidden;position:relative}.p-calendar-clear-icon{position:absolute;top:50%;margin-top:-.5rem;cursor:pointer}.p-calendar-clearable{position:relative}}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(() => i2.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgForOf), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(() => i3.ButtonDirective), selector: "[pButton]", inputs: ["iconPos", "loadingIcon", "label", "icon", "loading"] }, { kind: "directive", type: i0.forwardRef(() => i4.Ripple), selector: "[pRipple]" }, { kind: "component", type: i0.forwardRef(() => ChevronLeftIcon), selector: "ChevronLeftIcon" }, { kind: "component", type: i0.forwardRef(() => ChevronRightIcon), selector: "ChevronRightIcon" }, { kind: "component", type: i0.forwardRef(() => ChevronUpIcon), selector: "ChevronUpIcon" }, { kind: "component", type: i0.forwardRef(() => ChevronDownIcon), selector: "ChevronDownIcon" }, { kind: "component", type: i0.forwardRef(() => TimesIcon), selector: "TimesIcon" }, { kind: "component", type: i0.forwardRef(() => CalendarIcon), selector: "CalendarIcon" }], animations: [
            trigger('overlayAnimation', [
                state('visibleTouchUI', style({
                    transform: 'translate(-50%,-50%)',
                    opacity: 1
                })),
                transition('void => visible', [style({ opacity: 0, transform: 'scaleY(0.8)' }), animate('{{showTransitionParams}}', style({ opacity: 1, transform: '*' }))]),
                transition('visible => void', [animate('{{hideTransitionParams}}', style({ opacity: 0 }))]),
                transition('void => visibleTouchUI', [style({ opacity: 0, transform: 'translate3d(-50%, -40%, 0) scale(0.9)' }), animate('{{showTransitionParams}}')]),
                transition('visibleTouchUI => void', [
                    animate('{{hideTransitionParams}}', style({
                        opacity: 0,
                        transform: 'translate3d(-50%, -40%, 0) scale(0.9)'
                    }))
                ])
            ])
        ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: Calendar, decorators: [{
            type: Component,
            args: [{ selector: 'p-calendar', template: `
        <span #container [ngClass]="{ 'p-calendar': true, 'p-calendar-w-btn': showIcon, 'p-calendar-timeonly': timeOnly, 'p-calendar-disabled': disabled, 'p-focus': focus || overlayVisible }" [ngStyle]="style" [class]="styleClass">
            <ng-template [ngIf]="!inline">
                <input
                    #inputfield
                    type="text"
                    role="combobox"
                    [attr.id]="inputId"
                    [attr.name]="name"
                    [attr.required]="required"
                    [attr.aria-required]="required"
                    aria-autocomplete="none"
                    aria-haspopup="dialog"
                    [attr.aria-expanded]="overlayVisible"
                    [attr.aria-controls]="panelId"
                    [attr.aria-labelledby]="ariaLabelledBy"
                    [attr.aria-label]="ariaLabel"
                    [value]="inputFieldValue"
                    (focus)="onInputFocus($event)"
                    (keydown)="onInputKeydown($event)"
                    (click)="onInputClick()"
                    (blur)="onInputBlur($event)"
                    [readonly]="readonlyInput"
                    (input)="onUserInput($event)"
                    [ngStyle]="inputStyle"
                    [class]="inputStyleClass"
                    [placeholder]="placeholder || ''"
                    [disabled]="disabled"
                    [attr.tabindex]="tabindex"
                    [attr.inputmode]="touchUI ? 'off' : null"
                    [ngClass]="'p-inputtext p-component'"
                    autocomplete="off"
                />
                <ng-container *ngIf="showClear && !disabled && value != null">
                    <TimesIcon *ngIf="!clearIconTemplate" [styleClass]="'p-calendar-clear-icon'" (click)="clear()" />
                    <span *ngIf="clearIconTemplate" class="p-calendar-clear-icon" (click)="clear()">
                        <ng-template *ngTemplateOutlet="clearIconTemplate"></ng-template>
                    </span>
                </ng-container>
                <button
                    type="button"
                    [attr.aria-label]="iconButtonAriaLabel"
                    aria-haspopup="dialog"
                    [attr.aria-expanded]="overlayVisible"
                    [attr.aria-controls]="panelId"
                    pButton
                    pRipple
                    *ngIf="showIcon"
                    (click)="onButtonClick($event, inputfield)"
                    class="p-datepicker-trigger p-button-icon-only"
                    [disabled]="disabled"
                    tabindex="0"
                >
                    <span *ngIf="icon" [ngClass]="icon"></span>
                    <ng-container *ngIf="!icon">
                        <CalendarIcon *ngIf="!triggerIconTemplate" />
                        <ng-template *ngTemplateOutlet="triggerIconTemplate"></ng-template>
                    </ng-container>
                </button>
            </ng-template>
            <div
                #contentWrapper
                [class]="panelStyleClass"
                [ngStyle]="panelStyle"
                [ngClass]="{
                    'p-datepicker p-component': true,
                    'p-datepicker-inline': inline,
                    'p-disabled': disabled,
                    'p-datepicker-timeonly': timeOnly,
                    'p-datepicker-multiple-month': this.numberOfMonths > 1,
                    'p-datepicker-monthpicker': view === 'month',
                    'p-datepicker-touch-ui': touchUI
                }"
                [@overlayAnimation]="
                    touchUI
                        ? { value: 'visibleTouchUI', params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions } }
                        : { value: 'visible', params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions } }
                "
                [attr.aria-label]="getTranslation('chooseDate')"
                [attr.role]="inline ? null : 'dialog'"
                [attr.aria-modal]="inline ? null : 'true'"
                [@.disabled]="inline === true"
                (@overlayAnimation.start)="onOverlayAnimationStart($event)"
                (@overlayAnimation.done)="onOverlayAnimationDone($event)"
                (click)="onOverlayClick($event)"
                *ngIf="inline || overlayVisible"
            >
                <ng-content select="p-header"></ng-content>
                <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                <ng-container *ngIf="!timeOnly">
                    <div class="p-datepicker-group-container">
                        <div class="p-datepicker-group" *ngFor="let month of months; let i = index">
                            <div class="p-datepicker-header">
                                <button (keydown)="onContainerButtonKeydown($event)" class="p-datepicker-prev p-link" (click)="onPrevButtonClick($event)" *ngIf="i === 0" type="button" [attr.aria-label]="prevIconAriaLabel" pRipple>
                                    <ChevronLeftIcon [styleClass]="'p-datepicker-prev-icon'" *ngIf="!previousIconTemplate" />
                                    <span *ngIf="previousIconTemplate" class="p-datepicker-prev-icon">
                                        <ng-template *ngTemplateOutlet="previousIconTemplate"></ng-template>
                                    </span>
                                </button>
                                <div class="p-datepicker-title">
                                    <button
                                        type="button"
                                        (click)="switchToMonthView($event)"
                                        (keydown)="onContainerButtonKeydown($event)"
                                        *ngIf="currentView === 'date'"
                                        class="p-datepicker-month p-link"
                                        [disabled]="switchViewButtonDisabled()"
                                        [attr.aria-label]="this.getTranslation('chooseMonth')"
                                    >
                                        {{ getMonthName(month.month) }}
                                    </button>
                                    <button
                                        type="button"
                                        (click)="switchToYearView($event)"
                                        (keydown)="onContainerButtonKeydown($event)"
                                        *ngIf="currentView !== 'year'"
                                        class="p-datepicker-year p-link"
                                        [disabled]="switchViewButtonDisabled()"
                                        [attr.aria-label]="getTranslation('chooseYear')"
                                    >
                                        {{ getYear(month) }}
                                    </button>
                                    <span class="p-datepicker-decade" *ngIf="currentView === 'year'">
                                        <ng-container *ngIf="!decadeTemplate">{{ yearPickerValues()[0] }} - {{ yearPickerValues()[yearPickerValues().length - 1] }}</ng-container>
                                        <ng-container *ngTemplateOutlet="decadeTemplate; context: { $implicit: yearPickerValues }"></ng-container>
                                    </span>
                                </div>
                                <button
                                    (keydown)="onContainerButtonKeydown($event)"
                                    class="p-datepicker-next p-link"
                                    (click)="onNextButtonClick($event)"
                                    [style.display]="numberOfMonths === 1 ? 'inline-flex' : i === numberOfMonths - 1 ? 'inline-flex' : 'none'"
                                    type="button"
                                    [attr.aria-label]="nextIconAriaLabel"
                                    pRipple
                                >
                                    <ChevronRightIcon [styleClass]="'p-datepicker-next-icon'" *ngIf="!nextIconTemplate" />
                                    <span *ngIf="nextIconTemplate" class="p-datepicker-next-icon">
                                        <ng-template *ngTemplateOutlet="nextIconTemplate"></ng-template>
                                    </span>
                                </button>
                            </div>
                            <div class="p-datepicker-calendar-container" *ngIf="currentView === 'date'">
                                <table class="p-datepicker-calendar" role="grid">
                                    <thead>
                                        <tr>
                                            <th *ngIf="showWeek" class="p-datepicker-weekheader p-disabled">
                                                <span>{{ getTranslation('weekHeader') }}</span>
                                            </th>
                                            <th scope="col" *ngFor="let weekDay of weekDays; let begin = first; let end = last">
                                                <span>{{ weekDay }}</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr *ngFor="let week of month.dates; let j = index">
                                            <td *ngIf="showWeek" class="p-datepicker-weeknumber">
                                                <span class="p-disabled">
                                                    {{ month.weekNumbers[j] }}
                                                </span>
                                            </td>
                                            <td *ngFor="let date of week" [attr.aria-label]="date.day" [ngClass]="{ 'p-datepicker-other-month': date.otherMonth, 'p-datepicker-today': date.today }">
                                                <ng-container *ngIf="date.otherMonth ? showOtherMonths : true">
                                                    <span
                                                        [ngClass]="{ 'p-highlight': isSelected(date) && date.selectable, 'p-disabled': !date.selectable }"
                                                        (click)="onDateSelect($event, date)"
                                                        draggable="false"
                                                        (keydown)="onDateCellKeydown($event, date, i)"
                                                        pRipple
                                                    >
                                                        <ng-container *ngIf="!dateTemplate && (date.selectable || !disabledDateTemplate)">{{ date.day }}</ng-container>
                                                        <ng-container *ngIf="date.selectable || !disabledDateTemplate">
                                                            <ng-container *ngTemplateOutlet="dateTemplate; context: { $implicit: date }"></ng-container>
                                                        </ng-container>
                                                        <ng-container *ngIf="!date.selectable">
                                                            <ng-container *ngTemplateOutlet="disabledDateTemplate; context: { $implicit: date }"></ng-container>
                                                        </ng-container>
                                                    </span>
                                                    <div *ngIf="isSelected(date)" class="p-hidden-accessible" aria-live="polite">
                                                        {{ date.day }}
                                                    </div>
                                                </ng-container>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="p-monthpicker" *ngIf="currentView === 'month'">
                        <span
                            *ngFor="let m of monthPickerValues(); let i = index"
                            (click)="onMonthSelect($event, i)"
                            (keydown)="onMonthCellKeydown($event, i)"
                            class="p-monthpicker-month"
                            [ngClass]="{ 'p-highlight': isMonthSelected(i), 'p-disabled': isMonthDisabled(i) }"
                            pRipple
                        >
                            {{ m }}
                            <div *ngIf="isMonthSelected(i)" class="p-hidden-accessible" aria-live="polite">
                                {{ m }}
                            </div>
                        </span>
                    </div>
                    <div class="p-yearpicker" *ngIf="currentView === 'year'">
                        <span
                            *ngFor="let y of yearPickerValues()"
                            (click)="onYearSelect($event, y)"
                            (keydown)="onYearCellKeydown($event, y)"
                            class="p-yearpicker-year"
                            [ngClass]="{ 'p-highlight': isYearSelected(y), 'p-disabled': isYearDisabled(y) }"
                            pRipple
                        >
                            {{ y }}
                            <div *ngIf="isYearSelected(y)" class="p-hidden-accessible" aria-live="polite">
                                {{ y }}
                            </div>
                        </span>
                    </div>
                </ng-container>
                <div class="p-timepicker" *ngIf="(showTime || timeOnly) && currentView === 'date'">
                    <div class="p-hour-picker">
                        <button
                            class="p-link"
                            type="button"
                            (keydown)="onContainerButtonKeydown($event)"
                            (keydown.enter)="incrementHour($event)"
                            (keydown.space)="incrementHour($event)"
                            (mousedown)="onTimePickerElementMouseDown($event, 0, 1)"
                            (mouseup)="onTimePickerElementMouseUp($event)"
                            (keyup.enter)="onTimePickerElementMouseUp($event)"
                            (keyup.space)="onTimePickerElementMouseUp($event)"
                            (mouseleave)="onTimePickerElementMouseLeave()"
                            [attr.aria-label]="getTranslation('nextHour')"
                            pRipple
                        >
                            <ChevronUpIcon *ngIf="!incrementIconTemplate" />
                            <ng-template *ngTemplateOutlet="incrementIconTemplate"></ng-template>
                        </button>
                        <span><ng-container *ngIf="currentHour < 10">0</ng-container>{{ currentHour }}</span>
                        <button
                            class="p-link"
                            type="button"
                            (keydown)="onContainerButtonKeydown($event)"
                            (keydown.enter)="decrementHour($event)"
                            (keydown.space)="decrementHour($event)"
                            (mousedown)="onTimePickerElementMouseDown($event, 0, -1)"
                            (mouseup)="onTimePickerElementMouseUp($event)"
                            (keyup.enter)="onTimePickerElementMouseUp($event)"
                            (keyup.space)="onTimePickerElementMouseUp($event)"
                            (mouseleave)="onTimePickerElementMouseLeave()"
                            [attr.aria-label]="getTranslation('prevHour')"
                            pRipple
                        >
                            <ChevronDownIcon *ngIf="!decrementIconTemplate" />
                            <ng-template *ngTemplateOutlet="decrementIconTemplate"></ng-template>
                        </button>
                    </div>
                    <div class="p-separator">
                        <span>{{ timeSeparator }}</span>
                    </div>
                    <div class="p-minute-picker">
                        <button
                            class="p-link"
                            type="button"
                            (keydown)="onContainerButtonKeydown($event)"
                            (keydown.enter)="incrementMinute($event)"
                            (keydown.space)="incrementMinute($event)"
                            (mousedown)="onTimePickerElementMouseDown($event, 1, 1)"
                            (mouseup)="onTimePickerElementMouseUp($event)"
                            (keyup.enter)="onTimePickerElementMouseUp($event)"
                            (keyup.space)="onTimePickerElementMouseUp($event)"
                            (mouseleave)="onTimePickerElementMouseLeave()"
                            [attr.aria-label]="getTranslation('nextMinute')"
                            pRipple
                        >
                            <ChevronUpIcon *ngIf="!incrementIconTemplate" />
                            <ng-template *ngTemplateOutlet="incrementIconTemplate"></ng-template>
                        </button>
                        <span><ng-container *ngIf="currentMinute < 10">0</ng-container>{{ currentMinute }}</span>
                        <button
                            class="p-link"
                            type="button"
                            (keydown)="onContainerButtonKeydown($event)"
                            (keydown.enter)="decrementMinute($event)"
                            (keydown.space)="decrementMinute($event)"
                            (mousedown)="onTimePickerElementMouseDown($event, 1, -1)"
                            (mouseup)="onTimePickerElementMouseUp($event)"
                            (keyup.enter)="onTimePickerElementMouseUp($event)"
                            (keyup.space)="onTimePickerElementMouseUp($event)"
                            (mouseleave)="onTimePickerElementMouseLeave()"
                            [attr.aria-label]="getTranslation('prevMinute')"
                            pRipple
                        >
                            <ChevronDownIcon *ngIf="!decrementIconTemplate" />
                            <ng-template *ngTemplateOutlet="decrementIconTemplate"></ng-template>
                        </button>
                    </div>
                    <div class="p-separator" *ngIf="showSeconds">
                        <span>{{ timeSeparator }}</span>
                    </div>
                    <div class="p-second-picker" *ngIf="showSeconds">
                        <button
                            class="p-link"
                            type="button"
                            (keydown)="onContainerButtonKeydown($event)"
                            (keydown.enter)="incrementSecond($event)"
                            (keydown.space)="incrementSecond($event)"
                            (mousedown)="onTimePickerElementMouseDown($event, 2, 1)"
                            (mouseup)="onTimePickerElementMouseUp($event)"
                            (keyup.enter)="onTimePickerElementMouseUp($event)"
                            (keyup.space)="onTimePickerElementMouseUp($event)"
                            (mouseleave)="onTimePickerElementMouseLeave()"
                            [attr.aria-label]="getTranslation('nextSecond')"
                            pRipple
                        >
                            <ChevronUpIcon *ngIf="!incrementIconTemplate" />
                            <ng-template *ngTemplateOutlet="incrementIconTemplate"></ng-template>
                        </button>
                        <span><ng-container *ngIf="currentSecond < 10">0</ng-container>{{ currentSecond }}</span>
                        <button
                            class="p-link"
                            type="button"
                            (keydown)="onContainerButtonKeydown($event)"
                            (keydown.enter)="decrementSecond($event)"
                            (keydown.space)="decrementSecond($event)"
                            (mousedown)="onTimePickerElementMouseDown($event, 2, -1)"
                            (mouseup)="onTimePickerElementMouseUp($event)"
                            (keyup.enter)="onTimePickerElementMouseUp($event)"
                            (keyup.space)="onTimePickerElementMouseUp($event)"
                            (mouseleave)="onTimePickerElementMouseLeave()"
                            [attr.aria-label]="getTranslation('prevSecond')"
                            pRipple
                        >
                            <ChevronDownIcon *ngIf="!decrementIconTemplate" />
                            <ng-template *ngTemplateOutlet="decrementIconTemplate"></ng-template>
                        </button>
                    </div>
                    <div class="p-ampm-picker" *ngIf="hourFormat == '12'">
                        <button class="p-link" type="button" (keydown)="onContainerButtonKeydown($event)" (click)="toggleAMPM($event)" (keydown.enter)="toggleAMPM($event)" [attr.aria-label]="getTranslation('am')" pRipple>
                            <ChevronUpIcon *ngIf="!incrementIconTemplate" />
                            <ng-template *ngTemplateOutlet="incrementIconTemplate"></ng-template>
                        </button>
                        <span>{{ pm ? 'PM' : 'AM' }}</span>
                        <button class="p-link" type="button" (keydown)="onContainerButtonKeydown($event)" (click)="toggleAMPM($event)" (keydown.enter)="toggleAMPM($event)" [attr.aria-label]="getTranslation('pm')" pRipple>
                            <ChevronDownIcon *ngIf="!decrementIconTemplate" />
                            <ng-template *ngTemplateOutlet="decrementIconTemplate"></ng-template>
                        </button>
                    </div>
                </div>
                <div class="p-datepicker-buttonbar" *ngIf="showButtonBar">
                    <button type="button" [label]="getTranslation('today')" (keydown)="onContainerButtonKeydown($event)" (click)="onTodayButtonClick($event)" pButton pRipple [ngClass]="[todayButtonStyleClass]"></button>
                    <button type="button" [label]="getTranslation('clear')" (keydown)="onContainerButtonKeydown($event)" (click)="onClearButtonClick($event)" pButton pRipple [ngClass]="[clearButtonStyleClass]"></button>
                </div>
                <ng-content select="p-footer"></ng-content>
                <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
            </div>
        </span>
    `, animations: [
                        trigger('overlayAnimation', [
                            state('visibleTouchUI', style({
                                transform: 'translate(-50%,-50%)',
                                opacity: 1
                            })),
                            transition('void => visible', [style({ opacity: 0, transform: 'scaleY(0.8)' }), animate('{{showTransitionParams}}', style({ opacity: 1, transform: '*' }))]),
                            transition('visible => void', [animate('{{hideTransitionParams}}', style({ opacity: 0 }))]),
                            transition('void => visibleTouchUI', [style({ opacity: 0, transform: 'translate3d(-50%, -40%, 0) scale(0.9)' }), animate('{{showTransitionParams}}')]),
                            transition('visibleTouchUI => void', [
                                animate('{{hideTransitionParams}}', style({
                                    opacity: 0,
                                    transform: 'translate3d(-50%, -40%, 0) scale(0.9)'
                                }))
                            ])
                        ])
                    ], host: {
                        class: 'p-element p-inputwrapper',
                        '[class.p-inputwrapper-filled]': 'filled',
                        '[class.p-inputwrapper-focus]': 'focus',
                        '[class.p-calendar-clearable]': 'showClear && !disabled'
                    }, providers: [CALENDAR_VALUE_ACCESSOR], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, styles: ["@layer primeng{.p-calendar{position:relative;display:inline-flex;max-width:100%}.p-calendar .p-inputtext{flex:1 1 auto;width:1%}.p-calendar-w-btn .p-inputtext{border-top-right-radius:0;border-bottom-right-radius:0}.p-calendar-w-btn .p-datepicker-trigger{border-top-left-radius:0;border-bottom-left-radius:0}.p-fluid .p-calendar{display:flex}.p-fluid .p-calendar .p-inputtext{width:1%}.p-calendar .p-datepicker{min-width:100%}.p-datepicker{width:auto;position:absolute;top:0;left:0}.p-datepicker-inline{display:inline-block;position:static;overflow-x:auto}.p-datepicker-header{display:flex;align-items:center;justify-content:space-between}.p-datepicker-header .p-datepicker-title{margin:0 auto}.p-datepicker-prev,.p-datepicker-next{cursor:pointer;display:inline-flex;justify-content:center;align-items:center;overflow:hidden;position:relative}.p-datepicker-multiple-month .p-datepicker-group-container .p-datepicker-group{flex:1 1 auto}.p-datepicker-multiple-month .p-datepicker-group-container{display:flex}.p-datepicker table{width:100%;border-collapse:collapse}.p-datepicker td>span{display:flex;justify-content:center;align-items:center;cursor:pointer;margin:0 auto;overflow:hidden;position:relative}.p-monthpicker-month{width:33.3%;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;overflow:hidden;position:relative}.p-datepicker-buttonbar{display:flex;justify-content:space-between;align-items:center}.p-timepicker{display:flex;justify-content:center;align-items:center}.p-timepicker button{display:flex;align-items:center;justify-content:center;cursor:pointer;overflow:hidden;position:relative}.p-timepicker>div{display:flex;align-items:center;flex-direction:column}.p-datepicker-touch-ui,.p-calendar .p-datepicker-touch-ui{position:fixed;top:50%;left:50%;min-width:80vw;transform:translate(-50%,-50%)}.p-yearpicker-year{width:50%;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;overflow:hidden;position:relative}.p-calendar-clear-icon{position:absolute;top:50%;margin-top:-.5rem;cursor:pointer}.p-calendar-clearable{position:relative}}\n"] }]
        }], ctorParameters: () => [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }, { type: i1.PrimeNGConfig }, { type: i1.OverlayService }], propDecorators: { style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], inputStyle: [{
                type: Input
            }], inputId: [{
                type: Input
            }], name: [{
                type: Input
            }], inputStyleClass: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], ariaLabelledBy: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], iconAriaLabel: [{
                type: Input
            }], disabled: [{
                type: Input
            }], dateFormat: [{
                type: Input
            }], multipleSeparator: [{
                type: Input
            }], rangeSeparator: [{
                type: Input
            }], inline: [{
                type: Input
            }], showOtherMonths: [{
                type: Input
            }], selectOtherMonths: [{
                type: Input
            }], showIcon: [{
                type: Input
            }], icon: [{
                type: Input
            }], appendTo: [{
                type: Input
            }], readonlyInput: [{
                type: Input
            }], shortYearCutoff: [{
                type: Input
            }], monthNavigator: [{
                type: Input
            }], yearNavigator: [{
                type: Input
            }], hourFormat: [{
                type: Input
            }], timeOnly: [{
                type: Input
            }], stepHour: [{
                type: Input
            }], stepMinute: [{
                type: Input
            }], stepSecond: [{
                type: Input
            }], showSeconds: [{
                type: Input
            }], required: [{
                type: Input
            }], showOnFocus: [{
                type: Input
            }], showWeek: [{
                type: Input
            }], showClear: [{
                type: Input
            }], dataType: [{
                type: Input
            }], selectionMode: [{
                type: Input
            }], maxDateCount: [{
                type: Input
            }], showButtonBar: [{
                type: Input
            }], todayButtonStyleClass: [{
                type: Input
            }], clearButtonStyleClass: [{
                type: Input
            }], autoZIndex: [{
                type: Input
            }], baseZIndex: [{
                type: Input
            }], panelStyleClass: [{
                type: Input
            }], panelStyle: [{
                type: Input
            }], keepInvalid: [{
                type: Input
            }], hideOnDateTimeSelect: [{
                type: Input
            }], touchUI: [{
                type: Input
            }], timeSeparator: [{
                type: Input
            }], focusTrap: [{
                type: Input
            }], showTransitionOptions: [{
                type: Input
            }], hideTransitionOptions: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], minDate: [{
                type: Input
            }], maxDate: [{
                type: Input
            }], disabledDates: [{
                type: Input
            }], disabledDays: [{
                type: Input
            }], yearRange: [{
                type: Input
            }], showTime: [{
                type: Input
            }], responsiveOptions: [{
                type: Input
            }], numberOfMonths: [{
                type: Input
            }], firstDayOfWeek: [{
                type: Input
            }], locale: [{
                type: Input
            }], view: [{
                type: Input
            }], defaultDate: [{
                type: Input
            }], onFocus: [{
                type: Output
            }], onBlur: [{
                type: Output
            }], onClose: [{
                type: Output
            }], onSelect: [{
                type: Output
            }], onClear: [{
                type: Output
            }], onInput: [{
                type: Output
            }], onTodayClick: [{
                type: Output
            }], onClearClick: [{
                type: Output
            }], onMonthChange: [{
                type: Output
            }], onYearChange: [{
                type: Output
            }], onClickOutside: [{
                type: Output
            }], onShow: [{
                type: Output
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], containerViewChild: [{
                type: ViewChild,
                args: ['container', { static: false }]
            }], inputfieldViewChild: [{
                type: ViewChild,
                args: ['inputfield', { static: false }]
            }], content: [{
                type: ViewChild,
                args: ['contentWrapper', { static: false }]
            }] } });
export class CalendarModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: CalendarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.5", ngImport: i0, type: CalendarModule, declarations: [Calendar], imports: [CommonModule, ButtonModule, SharedModule, RippleModule, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon, ChevronDownIcon, TimesIcon, CalendarIcon], exports: [Calendar, ButtonModule, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: CalendarModule, imports: [CommonModule, ButtonModule, SharedModule, RippleModule, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon, ChevronDownIcon, TimesIcon, CalendarIcon, ButtonModule, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: CalendarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ButtonModule, SharedModule, RippleModule, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon, ChevronDownIcon, TimesIcon, CalendarIcon],
                    exports: [Calendar, ButtonModule, SharedModule],
                    declarations: [Calendar]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvY2FsZW5kYXIvY2FsZW5kYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBa0IsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakcsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQ0gsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxlQUFlLEVBRWYsWUFBWSxFQUNaLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUNMLFFBQVEsRUFJUixNQUFNLEVBSU4sU0FBUyxFQUNULGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFpQyxhQUFhLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMxRyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLDZCQUE2QixFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN4RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFNUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzlELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7O0FBSXRELE1BQU0sQ0FBQyxNQUFNLHVCQUF1QixHQUFRO0lBQ3hDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUM7SUFDdkMsS0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDO0FBQ0Y7OztHQUdHO0FBNFlILE1BQU0sT0FBTyxRQUFRO0lBMnBCcUI7SUFBMkI7SUFBdUI7SUFBNEI7SUFBK0I7SUFBc0I7SUFBOEI7SUExcEJ2TTs7O09BR0c7SUFDTSxLQUFLLENBQThDO0lBQzVEOzs7T0FHRztJQUNNLFVBQVUsQ0FBcUI7SUFDeEM7OztPQUdHO0lBQ00sVUFBVSxDQUE4QztJQUNqRTs7O09BR0c7SUFDTSxPQUFPLENBQXFCO0lBQ3JDOzs7T0FHRztJQUNNLElBQUksQ0FBcUI7SUFDbEM7OztPQUdHO0lBQ00sZUFBZSxDQUFxQjtJQUM3Qzs7O09BR0c7SUFDTSxXQUFXLENBQXFCO0lBQ3pDOzs7T0FHRztJQUNNLGNBQWMsQ0FBcUI7SUFDNUM7OztPQUdHO0lBQ00sU0FBUyxDQUFxQjtJQUV2Qzs7O09BR0c7SUFDTSxhQUFhLENBQXFCO0lBQzNDOzs7T0FHRztJQUNNLFFBQVEsQ0FBc0I7SUFDdkM7OztPQUdHO0lBQ00sVUFBVSxDQUFxQjtJQUN4Qzs7O09BR0c7SUFDTSxpQkFBaUIsR0FBVyxHQUFHLENBQUM7SUFDekM7OztPQUdHO0lBQ00sY0FBYyxHQUFXLEdBQUcsQ0FBQztJQUN0Qzs7O09BR0c7SUFDTSxNQUFNLEdBQVksS0FBSyxDQUFDO0lBQ2pDOzs7T0FHRztJQUNNLGVBQWUsR0FBWSxJQUFJLENBQUM7SUFDekM7OztPQUdHO0lBQ00saUJBQWlCLENBQXNCO0lBQ2hEOzs7T0FHRztJQUNNLFFBQVEsQ0FBc0I7SUFDdkM7OztPQUdHO0lBQ00sSUFBSSxDQUFxQjtJQUNsQzs7O09BR0c7SUFDTSxRQUFRLENBQWdGO0lBQ2pHOzs7T0FHRztJQUNNLGFBQWEsQ0FBc0I7SUFDNUM7OztPQUdHO0lBQ00sZUFBZSxHQUFRLEtBQUssQ0FBQztJQUN0Qzs7OztPQUlHO0lBQ00sY0FBYyxDQUFzQjtJQUM3Qzs7OztPQUlHO0lBQ00sYUFBYSxDQUFzQjtJQUM1Qzs7O09BR0c7SUFDTSxVQUFVLEdBQVcsSUFBSSxDQUFDO0lBQ25DOzs7T0FHRztJQUNNLFFBQVEsQ0FBc0I7SUFDdkM7OztPQUdHO0lBQ00sUUFBUSxHQUFXLENBQUMsQ0FBQztJQUM5Qjs7O09BR0c7SUFDTSxVQUFVLEdBQVcsQ0FBQyxDQUFDO0lBQ2hDOzs7T0FHRztJQUNNLFVBQVUsR0FBVyxDQUFDLENBQUM7SUFDaEM7OztPQUdHO0lBQ00sV0FBVyxHQUFZLEtBQUssQ0FBQztJQUN0Qzs7O09BR0c7SUFDTSxRQUFRLENBQXNCO0lBQ3ZDOzs7T0FHRztJQUNNLFdBQVcsR0FBWSxJQUFJLENBQUM7SUFDckM7OztPQUdHO0lBQ00sUUFBUSxHQUFZLEtBQUssQ0FBQztJQUNuQzs7O09BR0c7SUFDTSxTQUFTLEdBQVksS0FBSyxDQUFDO0lBQ3BDOzs7T0FHRztJQUNNLFFBQVEsR0FBVyxNQUFNLENBQUM7SUFDbkM7OztPQUdHO0lBQ00sYUFBYSxHQUFnRCxRQUFRLENBQUM7SUFDL0U7OztPQUdHO0lBQ00sWUFBWSxDQUFxQjtJQUMxQzs7O09BR0c7SUFDTSxhQUFhLENBQXNCO0lBQzVDOzs7T0FHRztJQUNNLHFCQUFxQixHQUFXLGVBQWUsQ0FBQztJQUN6RDs7O09BR0c7SUFDTSxxQkFBcUIsR0FBVyxlQUFlLENBQUM7SUFDekQ7OztPQUdHO0lBQ00sVUFBVSxHQUFZLElBQUksQ0FBQztJQUNwQzs7O09BR0c7SUFDTSxVQUFVLEdBQVcsQ0FBQyxDQUFDO0lBQ2hDOzs7T0FHRztJQUNNLGVBQWUsQ0FBcUI7SUFDN0M7OztPQUdHO0lBQ00sVUFBVSxDQUFNO0lBQ3pCOzs7T0FHRztJQUNNLFdBQVcsR0FBWSxLQUFLLENBQUM7SUFDdEM7OztPQUdHO0lBQ00sb0JBQW9CLEdBQVksSUFBSSxDQUFDO0lBQzlDOzs7T0FHRztJQUNNLE9BQU8sQ0FBc0I7SUFDdEM7OztPQUdHO0lBQ00sYUFBYSxHQUFXLEdBQUcsQ0FBQztJQUNyQzs7O09BR0c7SUFDTSxTQUFTLEdBQVksSUFBSSxDQUFDO0lBQ25DOzs7T0FHRztJQUNNLHFCQUFxQixHQUFXLGlDQUFpQyxDQUFDO0lBQzNFOzs7T0FHRztJQUNNLHFCQUFxQixHQUFXLFlBQVksQ0FBQztJQUN0RDs7O09BR0c7SUFDTSxRQUFRLENBQXFCO0lBQ3RDOzs7T0FHRztJQUNILElBQWEsT0FBTztRQUNoQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUNELElBQUksT0FBTyxDQUFDLElBQVU7UUFDbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFFckIsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLFNBQVMsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2pGLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDMUQ7SUFDTCxDQUFDO0lBQ0Q7OztPQUdHO0lBQ0gsSUFBYSxPQUFPO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBQ0QsSUFBSSxPQUFPLENBQUMsSUFBVTtRQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUVyQixJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDakYsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUMxRDtJQUNMLENBQUM7SUFDRDs7O09BR0c7SUFDSCxJQUFhLGFBQWE7UUFDdEIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQy9CLENBQUM7SUFDRCxJQUFJLGFBQWEsQ0FBQyxhQUFxQjtRQUNuQyxJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztRQUNwQyxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDakYsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUMxRDtJQUNMLENBQUM7SUFDRDs7O09BR0c7SUFDSCxJQUFhLFlBQVk7UUFDckIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzlCLENBQUM7SUFDRCxJQUFJLFlBQVksQ0FBQyxZQUFzQjtRQUNuQyxJQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQztRQUVsQyxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDakYsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUMxRDtJQUNMLENBQUM7SUFDRDs7OztPQUlHO0lBQ0gsSUFBYSxTQUFTO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDO0lBQ0QsSUFBSSxTQUFTLENBQUMsU0FBaUI7UUFDM0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFFNUIsSUFBSSxTQUFTLEVBQUU7WUFDWCxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25DLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQyxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFbkMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUNoRDtJQUNMLENBQUM7SUFDRDs7O09BR0c7SUFDSCxJQUFhLFFBQVE7UUFDakIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFDRCxJQUFJLFFBQVEsQ0FBQyxRQUFpQjtRQUMxQixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUUxQixJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssU0FBUyxFQUFFO1lBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7U0FDM0M7UUFDRCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBQ0Q7OztPQUdHO0lBQ0gsSUFBYSxpQkFBaUI7UUFDMUIsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUM7SUFDbkMsQ0FBQztJQUNELElBQUksaUJBQWlCLENBQUMsaUJBQThDO1FBQ2hFLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxpQkFBaUIsQ0FBQztRQUU1QyxJQUFJLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBQ0Q7OztPQUdHO0lBQ0gsSUFBYSxjQUFjO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUNoQyxDQUFDO0lBQ0QsSUFBSSxjQUFjLENBQUMsY0FBc0I7UUFDckMsSUFBSSxDQUFDLGVBQWUsR0FBRyxjQUFjLENBQUM7UUFFdEMsSUFBSSxDQUFDLDZCQUE2QixFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7SUFDakMsQ0FBQztJQUNEOzs7T0FHRztJQUNILElBQWEsY0FBYztRQUN2QixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDaEMsQ0FBQztJQUNELElBQUksY0FBYyxDQUFDLGNBQXNCO1FBQ3JDLElBQUksQ0FBQyxlQUFlLEdBQUcsY0FBYyxDQUFDO1FBRXRDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBQ0Q7Ozs7T0FJRztJQUNILElBQWEsTUFBTSxDQUFDLFNBQXlCO1FBQ3pDLE9BQU8sQ0FBQyxJQUFJLENBQUMsMERBQTBELENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBQ0Q7OztPQUdHO0lBQ0gsSUFBYSxJQUFJO1FBQ2IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFDRCxJQUFJLElBQUksQ0FBQyxJQUFzQjtRQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDbEMsQ0FBQztJQUNEOzs7T0FHRztJQUNILElBQWEsV0FBVztRQUNwQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQztJQUNELElBQUksV0FBVyxDQUFDLFdBQWlCO1FBQzdCLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO1FBRWhDLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNsQixNQUFNLElBQUksR0FBRyxXQUFXLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUN2QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNwQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN0QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDMUQ7SUFDTCxDQUFDO0lBQ0Q7Ozs7T0FJRztJQUNPLE9BQU8sR0FBd0IsSUFBSSxZQUFZLEVBQVMsQ0FBQztJQUNuRTs7OztPQUlHO0lBQ08sTUFBTSxHQUF3QixJQUFJLFlBQVksRUFBUyxDQUFDO0lBQ2xFOzs7O09BSUc7SUFDTyxPQUFPLEdBQWlDLElBQUksWUFBWSxFQUFrQixDQUFDO0lBQ3JGOzs7O09BSUc7SUFDTyxRQUFRLEdBQXVCLElBQUksWUFBWSxFQUFRLENBQUM7SUFDbEU7OztPQUdHO0lBQ08sT0FBTyxHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO0lBQy9EOzs7O09BSUc7SUFDTyxPQUFPLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7SUFDL0Q7Ozs7T0FJRztJQUNPLFlBQVksR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQztJQUN0RTs7OztPQUlHO0lBQ08sWUFBWSxHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO0lBQ3BFOzs7O09BSUc7SUFDTyxhQUFhLEdBQTJDLElBQUksWUFBWSxFQUE0QixDQUFDO0lBQy9HOzs7O09BSUc7SUFDTyxZQUFZLEdBQTBDLElBQUksWUFBWSxFQUEyQixDQUFDO0lBQzVHOzs7T0FHRztJQUNPLGNBQWMsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztJQUN0RTs7O09BR0c7SUFDTyxNQUFNLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7SUFFOUIsU0FBUyxDQUE0QjtJQUUxQixrQkFBa0IsQ0FBdUI7SUFFeEMsbUJBQW1CLENBQXVCO0lBRXRGLElBQW9ELE9BQU8sQ0FBQyxPQUFtQjtRQUMzRSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsT0FBTyxDQUFDO1FBRWhDLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3ZCLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtnQkFDdEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7Z0JBQ3JELElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO2FBQ2hDO2lCQUFNO2dCQUNILElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtvQkFDN0IsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7aUJBQzVCO2FBQ0o7U0FDSjtJQUNMLENBQUM7SUFFRCxnQkFBZ0IsQ0FBYztJQUU5QixLQUFLLENBQU07SUFFWCxLQUFLLENBQW1CO0lBRXhCLE1BQU0sQ0FBVztJQUVqQixRQUFRLENBQXFCO0lBRTdCLFlBQVksQ0FBVTtJQUV0QixXQUFXLENBQVU7SUFFckIsV0FBVyxDQUFtQjtJQUU5QixhQUFhLENBQW1CO0lBRWhDLGFBQWEsQ0FBbUI7SUFFaEMsRUFBRSxDQUFvQjtJQUV0QixJQUFJLENBQTJCO0lBRS9CLGlCQUFpQixDQUFlO0lBRWhDLE9BQU8sQ0FBMkI7SUFFbEMsc0JBQXNCLENBQXNDO0lBRTVELGNBQWMsQ0FBb0I7SUFFbEMsYUFBYSxHQUFhLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztJQUVuQyxjQUFjLEdBQWEsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO0lBRXBDLGVBQWUsQ0FBcUM7SUFFcEQsZUFBZSxDQUFNO0lBRXJCLHFCQUFxQixDQUFlO0lBRXBDLG9CQUFvQixDQUFlO0lBRW5DLFdBQVcsQ0FBbUI7SUFFOUIsV0FBVyxDQUFxQjtJQUVoQyxLQUFLLENBQW9CO0lBRXpCLFNBQVMsQ0FBb0I7SUFFN0IsTUFBTSxDQUFvQjtJQUUxQixlQUFlLEdBQXFCLElBQUksQ0FBQztJQUV6QyxRQUFRLENBQVE7SUFFaEIsUUFBUSxDQUFRO0lBRWhCLFNBQVMsQ0FBVztJQUVwQixVQUFVLENBQVU7SUFFcEIsdUJBQXVCLENBQW9CO0lBRTNDLFlBQVksQ0FBNkI7SUFFekMsY0FBYyxDQUE2QjtJQUUzQyxjQUFjLENBQTZCO0lBRTNDLG9CQUFvQixDQUE2QjtJQUVqRCxjQUFjLENBQTZCO0lBRTNDLG9CQUFvQixDQUE2QjtJQUVqRCxnQkFBZ0IsQ0FBNkI7SUFFN0MsbUJBQW1CLENBQTZCO0lBRWhELGlCQUFpQixDQUE2QjtJQUU5QyxxQkFBcUIsQ0FBNkI7SUFFbEQscUJBQXFCLENBQTZCO0lBRWxELGNBQWMsQ0FBZTtJQUU3QixhQUFhLENBQWlCO0lBRTlCLGFBQWEsQ0FBVztJQUV4QixZQUFZLENBQVc7SUFFdkIsWUFBWSxDQUFXO0lBRXZCLGFBQWEsQ0FBMEM7SUFFdkQsc0JBQXNCLENBQWU7SUFFckMsZUFBZSxHQUE4QixJQUFJLENBQUM7SUFFbEQsZUFBZSxDQUFvQjtJQUVuQyxXQUFXLENBQW9CO0lBRS9CLHVCQUF1QixDQUF5QjtJQUVoRCxPQUFPLENBQWtCO0lBRXpCLGtCQUFrQixDQUErQjtJQUVqRCxXQUFXLENBQW1CO0lBRTlCLGlCQUFpQixDQUFtQjtJQUVwQyxPQUFPLENBQW1CO0lBRTFCLGVBQWUsR0FBVyxDQUFDLENBQUM7SUFFNUIsZUFBZSxDQUFVO0lBRXpCLEtBQUssR0FBcUIsTUFBTSxDQUFDO0lBRWpDLFlBQVksQ0FBb0I7SUFFaEMsWUFBWSxDQUFRO0lBRVosTUFBTSxDQUFTO0lBRXZCLElBQUksTUFBTTtRQUNOLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBRUQsSUFBSSxtQkFBbUI7UUFDbkIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7SUFFRCxJQUFJLGlCQUFpQjtRQUNqQixPQUFPLElBQUksQ0FBQyxXQUFXLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMvSyxDQUFDO0lBRUQsSUFBSSxpQkFBaUI7UUFDakIsT0FBTyxJQUFJLENBQUMsV0FBVyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDL0ssQ0FBQztJQUVELFlBQXNDLFFBQWtCLEVBQVMsRUFBYyxFQUFTLFFBQW1CLEVBQVMsRUFBcUIsRUFBVSxJQUFZLEVBQVUsTUFBcUIsRUFBUyxjQUE4QjtRQUEvTCxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQVMsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFTLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBUyxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQUFVLFNBQUksR0FBSixJQUFJLENBQVE7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQVMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQ2pPLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFxQixDQUFDO0lBQ3RELENBQUM7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixFQUFFLENBQUM7UUFDN0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsUUFBUSxDQUFDO1FBQ2pELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUM1QyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN0QyxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFFN0IsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtZQUN0QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxRQUFRLENBQUM7U0FDNUk7UUFFRCxJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQzFFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7SUFDNUIsQ0FBQztJQUVELGtCQUFrQjtRQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDNUIsUUFBUSxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQ3BCLEtBQUssTUFBTTtvQkFDUCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ2xDLE1BQU07Z0JBRVYsS0FBSyxRQUFRO29CQUNULElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDcEMsTUFBTTtnQkFFVixLQUFLLGNBQWM7b0JBQ2YsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQzFDLE1BQU07Z0JBRVYsS0FBSyxRQUFRO29CQUNULElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDcEMsTUFBTTtnQkFFVixLQUFLLGNBQWM7b0JBQ2YsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQzFDLE1BQU07Z0JBRVYsS0FBSyxVQUFVO29CQUNYLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO29CQUN0QyxNQUFNO2dCQUVWLEtBQUssYUFBYTtvQkFDZCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDekMsTUFBTTtnQkFFVixLQUFLLFdBQVc7b0JBQ1osSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ3ZDLE1BQU07Z0JBRVYsS0FBSyxlQUFlO29CQUNoQixJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDM0MsTUFBTTtnQkFFVixLQUFLLGVBQWU7b0JBQ2hCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO29CQUMzQyxNQUFNO2dCQUVWLEtBQUssUUFBUTtvQkFDVCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ3BDLE1BQU07Z0JBRVY7b0JBQ0ksSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO29CQUNsQyxNQUFNO2FBQ2I7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxlQUFlO1FBQ1gsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2IsSUFBSSxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUV0RyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2hDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2dCQUN6QixJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssQ0FBQyxFQUFFO29CQUMzQixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFO3dCQUM5RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsYUFBYSxDQUFDLEdBQUcsSUFBSSxDQUFDO3FCQUM3SDtpQkFDSjthQUNKO1NBQ0o7SUFDTCxDQUFDO0lBRUQsY0FBYyxDQUFDLE1BQWM7UUFDekIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsbUJBQW1CLENBQUMsS0FBYSxFQUFFLEdBQVc7UUFDMUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFFdEIsS0FBSyxJQUFJLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMvQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM1QjtJQUNMLENBQUM7SUFFRCxjQUFjO1FBQ1YsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDekMsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDbkUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUN4QyxRQUFRLEdBQUcsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQztTQUM3QztJQUNMLENBQUM7SUFFRCxpQkFBaUI7UUFDYixJQUFJLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztRQUMzQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzFCLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDNUU7UUFFRCxPQUFPLGlCQUFpQixDQUFDO0lBQzdCLENBQUM7SUFFRCxnQkFBZ0I7UUFDWixJQUFJLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUMxQixJQUFJLElBQUksR0FBVyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQVMsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUN0RSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3pCLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDbkM7UUFFRCxPQUFPLGdCQUFnQixDQUFDO0lBQzVCLENBQUM7SUFFRCxZQUFZLENBQUMsS0FBYSxFQUFFLElBQVk7UUFDcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUMvQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMxQyxJQUFJLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztZQUNiLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDUixDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQixDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQzthQUNoQjtZQUVELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDNUM7SUFDTCxDQUFDO0lBRUQsYUFBYSxDQUFDLElBQVU7UUFDcEIsSUFBSSxTQUFTLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDekMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkUsSUFBSSxJQUFJLEdBQUcsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQy9CLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksR0FBRyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFhLEVBQUUsSUFBWTtRQUNuQyxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDZixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3pELElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdkQsSUFBSSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3BFLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNkLElBQUksS0FBSyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFdkQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNoQyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7WUFFZCxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ1IsS0FBSyxJQUFJLENBQUMsR0FBRyxtQkFBbUIsR0FBRyxRQUFRLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxtQkFBbUIsRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDNUUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDckQsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUNwTTtnQkFFRCxJQUFJLG1CQUFtQixHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUMxQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsbUJBQW1CLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQzlKLEtBQUssRUFBRSxDQUFDO2lCQUNYO2FBQ0o7aUJBQU07Z0JBQ0gsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDeEIsSUFBSSxLQUFLLEdBQUcsVUFBVSxFQUFFO3dCQUNwQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO3dCQUNqRCxJQUFJLENBQUMsSUFBSSxDQUFDOzRCQUNOLEdBQUcsRUFBRSxLQUFLLEdBQUcsVUFBVTs0QkFDdkIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLOzRCQUNqQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7NEJBQ2YsVUFBVSxFQUFFLElBQUk7NEJBQ2hCLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLEdBQUcsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQzs0QkFDckUsVUFBVSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxHQUFHLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO3lCQUNqRixDQUFDLENBQUM7cUJBQ047eUJBQU07d0JBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztxQkFDaks7b0JBRUQsS0FBSyxFQUFFLENBQUM7aUJBQ1g7YUFDSjtZQUVELElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDZixXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDNUY7WUFFRCxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3BCO1FBRUQsT0FBTztZQUNILEtBQUssRUFBRSxLQUFLO1lBQ1osSUFBSSxFQUFFLElBQUk7WUFDVixLQUFLLEVBQU8sS0FBSztZQUNqQixXQUFXLEVBQUUsV0FBVztTQUMzQixDQUFDO0lBQ04sQ0FBQztJQUVELFFBQVEsQ0FBQyxJQUFVO1FBQ2YsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBRS9CLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztTQUMxQzthQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUN0QixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztTQUMxQjtJQUNMLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBVTtRQUNsQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsT0FBTztTQUNWO1FBRUQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFFNUIsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLE9BQU8sRUFBRTtZQUM5QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDckIsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDWixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDdkIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ1Q7YUFBTSxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssTUFBTSxFQUFFO1lBQ3BDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN2QixVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNaLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN2QixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDVDthQUFNO1lBQ0gsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLENBQUMsRUFBRTtnQkFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzthQUN4QjtpQkFBTTtnQkFDSCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7YUFDdkI7WUFFRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7WUFDbEYsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUMxRDtJQUNMLENBQUM7SUFFRCxVQUFVLENBQUMsS0FBVTtRQUNqQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsT0FBTztTQUNWO1FBRUQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFFNUIsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLE9BQU8sRUFBRTtZQUM5QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDckIsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDWixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDdkIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ1Q7YUFBTSxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssTUFBTSxFQUFFO1lBQ3BDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN2QixVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNaLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN2QixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDVDthQUFNO1lBQ0gsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLEVBQUUsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzthQUN4QjtpQkFBTTtnQkFDSCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7YUFDdkI7WUFFRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7WUFDbEYsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUMxRDtJQUNMLENBQUM7SUFFRCxhQUFhO1FBQ1QsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksWUFBWSxHQUFhLElBQUksQ0FBQyxXQUFXLENBQUM7UUFFOUMsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxXQUFXLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzFELElBQUksVUFBVSxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6RSxJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsRUFBRSxZQUFZLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQztTQUM5RztJQUNMLENBQUM7SUFFRCxlQUFlO1FBQ1gsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRUQsZUFBZTtRQUNYLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDN0MsQ0FBQztJQUVELGFBQWE7UUFDVCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxZQUFZLEdBQWEsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUU5QyxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLFdBQVcsR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRTtZQUNoRixJQUFJLFVBQVUsR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxVQUFVLEVBQUUsWUFBWSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUM7U0FDOUc7SUFDTCxDQUFDO0lBRUQsaUJBQWlCLENBQUMsS0FBWTtRQUMxQixJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsS0FBWTtRQUN6QixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsWUFBWSxDQUFDLEtBQVksRUFBRSxRQUFhO1FBQ3BDLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUU7WUFDdkMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLE9BQU87U0FDVjtRQUVELElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUN6RCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBVSxFQUFFLENBQVMsRUFBRSxFQUFFO2dCQUNyRCxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDOUMsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7YUFDckI7WUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNoQzthQUFNO1lBQ0gsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ2pDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDN0I7U0FDSjtRQUVELElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksSUFBSSxDQUFDLG9CQUFvQixFQUFFO1lBQ3ZELFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ1osS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBRW5CLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtvQkFDWCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7aUJBQzFCO2dCQUVELElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDM0IsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ1g7UUFFRCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELGdCQUFnQixDQUFDLFFBQWE7UUFDMUIsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFBRSxPQUFPLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7O1lBQzlILE9BQU8sSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxhQUFhLENBQUMsS0FBWSxFQUFFLEtBQWE7UUFDckMsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtZQUN2QixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztTQUNoRzthQUFNO1lBQ0gsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDMUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztTQUNyRjtJQUNMLENBQUM7SUFFRCxZQUFZLENBQUMsS0FBWSxFQUFFLElBQVk7UUFDbkMsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtZQUN0QixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQ2hGO2FBQU07WUFDSCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUN4QixJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztTQUNwRjtJQUNMLENBQUM7SUFFRCxnQkFBZ0I7UUFDWixJQUFJLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFFeEIsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1osSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsRUFBRTtnQkFDMUIsY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3BEO2lCQUFNLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFLEVBQUU7Z0JBQ25DLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDeEMsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3RELGNBQWMsSUFBSSxZQUFZLENBQUM7b0JBQy9CLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTt3QkFDN0IsY0FBYyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxHQUFHLENBQUM7cUJBQ2xEO2lCQUNKO2FBQ0o7aUJBQU0sSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBRTtnQkFDaEMsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO29CQUNqQyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM5QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUU1QixjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDaEQsSUFBSSxPQUFPLEVBQUU7d0JBQ1QsY0FBYyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsY0FBYyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3FCQUNwRjtpQkFDSjthQUNKO1NBQ0o7UUFFRCxJQUFJLENBQUMsZUFBZSxHQUFHLGNBQWMsQ0FBQztRQUN0QyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN6QixJQUFJLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxJQUFJLENBQUMsbUJBQW1CLENBQUMsYUFBYSxFQUFFO1lBQ3BFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7U0FDdkU7SUFDTCxDQUFDO0lBRUQsY0FBYyxDQUFDLElBQVM7UUFDcEIsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFFcEQsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3hCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDZixjQUFjLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMxQztpQkFBTTtnQkFDSCxjQUFjLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7Z0JBQzdELElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDZixjQUFjLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ2pEO2FBQ0o7U0FDSjtRQUVELE9BQU8sY0FBYyxDQUFDO0lBQzFCLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxLQUFhO1FBQzFCLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLEVBQUU7WUFDekIsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ3JCLElBQUksS0FBSyxJQUFJLEVBQUUsRUFBRTtnQkFDYixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQzthQUNwRDtpQkFBTTtnQkFDSCxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO2FBQzlDO1NBQ0o7YUFBTTtZQUNILElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1NBQzVCO0lBQ0wsQ0FBQztJQUVELGNBQWMsQ0FBQyxXQUE2QjtRQUN4QyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsVUFBVSxDQUFDLFFBQWE7UUFDcEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVqRSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxFQUFFO2dCQUN6QixJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssRUFBRTtvQkFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O29CQUN4RCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFTLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBUyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDMUY7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBUyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDM0M7WUFFRCxJQUFJLENBQUMsVUFBVSxDQUFTLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsVUFBVSxDQUFTLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUMvQztRQUVELElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksRUFBRTtZQUNyQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNwQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDdkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDMUM7UUFFRCxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLEVBQUU7WUFDckMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDcEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQzFDO1FBRUQsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsRUFBRTtZQUMxQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzFCO2FBQU0sSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBRTtZQUNuQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDakU7YUFBTSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFO1lBQ2hDLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDakMsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDOUIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFNUIsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksU0FBUyxDQUFDLE9BQU8sRUFBRSxFQUFFO29CQUNuRCxPQUFPLEdBQUcsSUFBSSxDQUFDO2lCQUNsQjtxQkFBTTtvQkFDSCxTQUFTLEdBQUcsSUFBSSxDQUFDO29CQUNqQixPQUFPLEdBQUcsSUFBSSxDQUFDO2lCQUNsQjtnQkFFRCxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7YUFDMUM7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ2xDO1NBQ0o7UUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQVU7UUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFFbkIsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLE1BQU0sRUFBRTtZQUN6QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNsQzthQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLEVBQUU7WUFDbEMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQ3ZEO2lCQUFNO2dCQUNILElBQUksY0FBYyxHQUFHLElBQUksQ0FBQztnQkFDMUIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDM0IsY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBVSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7aUJBQzlFO2dCQUNELElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDdEM7U0FDSjtJQUNMLENBQUM7SUFFRCx1QkFBdUIsQ0FBQyxLQUFhLEVBQUUsSUFBWTtRQUMvQyxJQUFJLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZixHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BCLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdEIsSUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNwRCxPQUFPLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztJQUNuRCxDQUFDO0lBRUQsbUJBQW1CLENBQUMsS0FBYSxFQUFFLElBQVk7UUFDM0MsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUMvRSxDQUFDO0lBRUQsdUJBQXVCLENBQUMsS0FBYSxFQUFFLElBQVk7UUFDL0MsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyRCxPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsdUJBQXVCLENBQUMsS0FBYSxFQUFFLElBQVk7UUFDL0MsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRVQsSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFO1lBQ2IsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNQLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1NBQ2hCO2FBQU07WUFDSCxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNkLENBQUMsR0FBRyxJQUFJLENBQUM7U0FDWjtRQUVELE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRUQsbUJBQW1CLENBQUMsS0FBYSxFQUFFLElBQVk7UUFDM0MsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRVQsSUFBSSxLQUFLLEtBQUssRUFBRSxFQUFFO1lBQ2QsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNOLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1NBQ2hCO2FBQU07WUFDSCxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNkLENBQUMsR0FBRyxJQUFJLENBQUM7U0FDWjtRQUVELE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRUQsY0FBYztRQUNWLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBRS9DLE9BQU8sY0FBYyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCxVQUFVLENBQUMsUUFBYTtRQUNwQixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDWixJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUFFO2dCQUMxQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQzthQUNsRDtpQkFBTSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFFO2dCQUNuQyxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7Z0JBQ3JCLEtBQUssSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDekIsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUM3QyxJQUFJLFFBQVEsRUFBRTt3QkFDVixNQUFNO3FCQUNUO2lCQUNKO2dCQUVELE9BQU8sUUFBUSxDQUFDO2FBQ25CO2lCQUFNLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUU7Z0JBQ2hDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQUUsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDOztvQkFDNUssT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7YUFDMUQ7U0FDSjthQUFNO1lBQ0gsT0FBTyxLQUFLLENBQUM7U0FDaEI7SUFDTCxDQUFDO0lBRUQsWUFBWTtRQUNSLE9BQU8sSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLElBQUksT0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLFFBQVEsQ0FBQztJQUNoRSxDQUFDO0lBRUQsZUFBZSxDQUFDLEtBQWE7UUFDekIsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBRTtZQUNwRCxNQUFNLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JGLE1BQU0sUUFBUSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3RELE9BQU8sUUFBUSxJQUFJLEtBQUssSUFBSSxRQUFRLElBQUksQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLENBQUM7U0FDMUQ7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsZUFBZSxDQUFDLEtBQWE7UUFDekIsS0FBSyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUNsRixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxFQUFFO2dCQUN4RCxPQUFPLEtBQUssQ0FBQzthQUNoQjtTQUNKO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELGNBQWMsQ0FBQyxJQUFJO1FBQ2YsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRCxjQUFjLENBQUMsSUFBWTtRQUN2QixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRTtZQUNyQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUVqRSxPQUFPLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztTQUM3RTtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxZQUFZLENBQUMsS0FBVSxFQUFFLFFBQWE7UUFDbEMsSUFBSSxLQUFLLElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFBRSxPQUFPLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxRQUFRLENBQUMsR0FBRyxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUUsS0FBSyxRQUFRLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxRQUFRLENBQUMsSUFBSSxDQUFDOztZQUMzSixPQUFPLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBRUQsYUFBYSxDQUFDLEtBQVcsRUFBRSxHQUFTLEVBQUUsUUFBYTtRQUMvQyxJQUFJLE9BQU8sR0FBWSxLQUFLLENBQUM7UUFDN0IsSUFBSSxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDdEQsSUFBSSxJQUFJLEdBQVMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN2RSxPQUFPLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUMvRTtRQUVELE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFRCxpQkFBaUI7UUFDYixPQUFPLElBQUksQ0FBQyxhQUFhLEtBQUssUUFBUSxDQUFDO0lBQzNDLENBQUM7SUFFRCxnQkFBZ0I7UUFDWixPQUFPLElBQUksQ0FBQyxhQUFhLEtBQUssT0FBTyxDQUFDO0lBQzFDLENBQUM7SUFFRCxtQkFBbUI7UUFDZixPQUFPLElBQUksQ0FBQyxhQUFhLEtBQUssVUFBVSxDQUFDO0lBQzdDLENBQUM7SUFFRCxPQUFPLENBQUMsS0FBVyxFQUFFLEdBQVcsRUFBRSxLQUFhLEVBQUUsSUFBWTtRQUN6RCxPQUFPLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLEtBQUssSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssSUFBSSxDQUFDO0lBQ2pHLENBQUM7SUFFRCxZQUFZLENBQUMsR0FBUSxFQUFFLEtBQVUsRUFBRSxJQUFTLEVBQUUsVUFBZTtRQUN6RCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFFcEIsSUFBSSxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDdkMsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFFRCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEdBQUcsSUFBSSxFQUFFO2dCQUNuQyxRQUFRLEdBQUcsS0FBSyxDQUFDO2FBQ3BCO2lCQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsS0FBSyxJQUFJLEVBQUU7Z0JBQzVDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsR0FBRyxLQUFLLEVBQUU7b0JBQ2pDLFFBQVEsR0FBRyxLQUFLLENBQUM7aUJBQ3BCO3FCQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsS0FBSyxLQUFLLEVBQUU7b0JBQzFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxHQUFHLEVBQUU7d0JBQzlCLFFBQVEsR0FBRyxLQUFLLENBQUM7cUJBQ3BCO2lCQUNKO2FBQ0o7U0FDSjtRQUVELElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNkLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsR0FBRyxJQUFJLEVBQUU7Z0JBQ25DLFFBQVEsR0FBRyxLQUFLLENBQUM7YUFDcEI7aUJBQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxLQUFLLElBQUksRUFBRTtnQkFDNUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLEtBQUssRUFBRTtvQkFDakMsUUFBUSxHQUFHLEtBQUssQ0FBQztpQkFDcEI7cUJBQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxLQUFLLEtBQUssRUFBRTtvQkFDMUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLEdBQUcsRUFBRTt3QkFDOUIsUUFBUSxHQUFHLEtBQUssQ0FBQztxQkFDcEI7aUJBQ0o7YUFDSjtTQUNKO1FBRUQsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3BCLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN0RDtRQUVELElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNuQixRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDcEQ7UUFFRCxPQUFPLFFBQVEsSUFBSSxRQUFRLElBQUksU0FBUyxJQUFJLFFBQVEsQ0FBQztJQUN6RCxDQUFDO0lBRUQsY0FBYyxDQUFDLEdBQVcsRUFBRSxLQUFhLEVBQUUsSUFBWTtRQUNuRCxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDcEIsS0FBSyxJQUFJLFlBQVksSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUN6QyxJQUFJLFlBQVksQ0FBQyxXQUFXLEVBQUUsS0FBSyxJQUFJLElBQUksWUFBWSxDQUFDLFFBQVEsRUFBRSxLQUFLLEtBQUssSUFBSSxZQUFZLENBQUMsT0FBTyxFQUFFLEtBQUssR0FBRyxFQUFFO29CQUM1RyxPQUFPLElBQUksQ0FBQztpQkFDZjthQUNKO1NBQ0o7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsYUFBYSxDQUFDLEdBQVcsRUFBRSxLQUFhLEVBQUUsSUFBWTtRQUNsRCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDbkIsSUFBSSxPQUFPLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN6QyxJQUFJLGFBQWEsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDckMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUMxRDtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxZQUFZLENBQUMsS0FBWTtRQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3RCO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELFlBQVk7UUFDUixJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQzFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0QjtJQUNMLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBWTtRQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNuQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztTQUMzQjtRQUNELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsYUFBYSxDQUFDLEtBQVksRUFBRSxVQUFlO1FBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3RCLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdEI7YUFBTTtZQUNILElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0QjtJQUNMLENBQUM7SUFFRCxLQUFLO1FBQ0QsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsY0FBYyxDQUFDLEtBQVk7UUFDdkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUM7WUFDcEIsYUFBYSxFQUFFLEtBQUs7WUFDcEIsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYTtTQUNoQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsWUFBWSxDQUFDLEtBQWE7UUFDdEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsT0FBTyxDQUFDLEtBQVU7UUFDZCxPQUFPLElBQUksQ0FBQyxXQUFXLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO0lBQ3hFLENBQUM7SUFFRCx3QkFBd0I7UUFDcEIsT0FBTyxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3BELENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxLQUFZO1FBQzFCLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUN4RCxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxLQUFZO1FBQzFCLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUN6RCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCx3QkFBd0IsQ0FBQyxLQUFvQjtRQUN6QyxRQUFRLEtBQUssQ0FBQyxLQUFLLEVBQUU7WUFDakIsS0FBSztZQUNMLEtBQUssQ0FBQztnQkFDRixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtvQkFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUN6QjtnQkFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7b0JBQ2IsTUFBTSxjQUFjLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsYUFBYSxFQUFFLHNCQUFzQixDQUFDLENBQUM7b0JBQzdHLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7b0JBQzdCLElBQUksT0FBTyxJQUFJLGNBQWMsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUU7d0JBQ3hFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO3FCQUM1QjtpQkFDSjtnQkFDRCxNQUFNO1lBRVYsUUFBUTtZQUNSLEtBQUssRUFBRTtnQkFDSCxJQUFJLENBQUMsbUJBQW1CLEVBQUUsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNoRCxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztnQkFDNUIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixNQUFNO1lBRVY7Z0JBQ0ksTUFBTTtnQkFDTixNQUFNO1NBQ2I7SUFDTCxDQUFDO0lBRUQsY0FBYyxDQUFDLEtBQVU7UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLEVBQUUsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN6QjthQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxFQUFFLEVBQUU7WUFDN0IsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO2dCQUNyQixJQUFJLENBQUMsbUJBQW1CLEVBQUUsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNoRCxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztnQkFDNUIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2FBQzFCO1NBQ0o7YUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssRUFBRSxFQUFFO1lBQzdCLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtnQkFDckIsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7Z0JBQzVCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUMxQjtTQUNKO2FBQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDckQsVUFBVSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzNHLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtnQkFDckIsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7YUFDL0I7U0FDSjtJQUNMLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxLQUFVLEVBQUUsSUFBVSxFQUFFLFVBQWtCO1FBQ3hELE1BQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUM7UUFDeEMsTUFBTSxJQUFJLEdBQUcsV0FBVyxDQUFDLGFBQWEsQ0FBQztRQUV2QyxRQUFRLEtBQUssQ0FBQyxLQUFLLEVBQUU7WUFDakIsWUFBWTtZQUNaLEtBQUssRUFBRSxDQUFDLENBQUM7Z0JBQ0wsV0FBVyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQzVCLElBQUksU0FBUyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3ZDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUM7Z0JBQ3BELElBQUksT0FBTyxFQUFFO29CQUNULElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN4RCxJQUFJLFVBQVUsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxFQUFFO3dCQUM5QyxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDO3dCQUMzQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUMxQjt5QkFBTTt3QkFDSCxPQUFPLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO3dCQUN2RCxPQUFPLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztxQkFDbkQ7aUJBQ0o7cUJBQU07b0JBQ0gsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQztvQkFDM0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDMUI7Z0JBQ0QsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixNQUFNO2FBQ1Q7WUFFRCxVQUFVO1lBQ1YsS0FBSyxFQUFFLENBQUMsQ0FBQztnQkFDTCxXQUFXLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztnQkFDNUIsSUFBSSxTQUFTLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdkMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQztnQkFDeEQsSUFBSSxPQUFPLEVBQUU7b0JBQ1QsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hELElBQUksVUFBVSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLEVBQUU7d0JBQzlDLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7d0JBQzFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQzNCO3lCQUFNO3dCQUNILFNBQVMsQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO3dCQUN6QixTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7cUJBQ3JCO2lCQUNKO3FCQUFNO29CQUNILElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQzFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQzNCO2dCQUNELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkIsTUFBTTthQUNUO1lBRUQsWUFBWTtZQUNaLEtBQUssRUFBRSxDQUFDLENBQUM7Z0JBQ0wsV0FBVyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQzVCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQztnQkFDM0MsSUFBSSxRQUFRLEVBQUU7b0JBQ1YsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDckMsSUFBSSxVQUFVLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsSUFBSSxVQUFVLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUseUJBQXlCLENBQUMsRUFBRTt3QkFDekgsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7cUJBQzFDO3lCQUFNO3dCQUNILFNBQVMsQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO3dCQUN6QixTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7cUJBQ3JCO2lCQUNKO3FCQUFNO29CQUNILElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2lCQUMxQztnQkFDRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLE1BQU07YUFDVDtZQUVELGFBQWE7WUFDYixLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUNMLFdBQVcsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2dCQUM1QixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7Z0JBQ3ZDLElBQUksUUFBUSxFQUFFO29CQUNWLElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3JDLElBQUksVUFBVSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLEVBQUU7d0JBQzlDLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDO3FCQUMzQzt5QkFBTTt3QkFDSCxTQUFTLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQzt3QkFDekIsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO3FCQUNyQjtpQkFDSjtxQkFBTTtvQkFDSCxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztpQkFDM0M7Z0JBQ0QsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixNQUFNO2FBQ1Q7WUFFRCxPQUFPO1lBQ1AsT0FBTztZQUNQLEtBQUssRUFBRSxDQUFDO1lBQ1IsS0FBSyxFQUFFLENBQUMsQ0FBQztnQkFDTCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDL0IsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixNQUFNO2FBQ1Q7WUFFRCxRQUFRO1lBQ1IsS0FBSyxFQUFFLENBQUMsQ0FBQztnQkFDTCxJQUFJLENBQUMsbUJBQW1CLEVBQUUsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNoRCxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztnQkFDNUIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixNQUFNO2FBQ1Q7WUFFRCxLQUFLO1lBQ0wsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDSixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtvQkFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNO2FBQ1Q7WUFFRDtnQkFDSSxPQUFPO2dCQUNQLE1BQU07U0FDYjtJQUNMLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxLQUFVLEVBQUUsS0FBYTtRQUN4QyxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDO1FBQ2pDLFFBQVEsS0FBSyxDQUFDLEtBQUssRUFBRTtZQUNqQixRQUFRO1lBQ1IsS0FBSyxFQUFFLENBQUM7WUFDUixLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUNMLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2dCQUNyQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztnQkFDeEMsSUFBSSxTQUFTLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdkMsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pFLElBQUksUUFBUSxFQUFFO29CQUNWLFFBQVEsQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO29CQUN4QixRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7aUJBQ3BCO2dCQUNELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkIsTUFBTTthQUNUO1lBRUQsWUFBWTtZQUNaLEtBQUssRUFBRSxDQUFDLENBQUM7Z0JBQ0wsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQ3JCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQztnQkFDM0MsSUFBSSxRQUFRLEVBQUU7b0JBQ1YsUUFBUSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7b0JBQ3hCLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztpQkFDcEI7cUJBQU07b0JBQ0gsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDMUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDM0I7Z0JBRUQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixNQUFNO2FBQ1Q7WUFFRCxhQUFhO1lBQ2IsS0FBSyxFQUFFLENBQUMsQ0FBQztnQkFDTCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztnQkFDckIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDO2dCQUN2QyxJQUFJLFFBQVEsRUFBRTtvQkFDVixRQUFRLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztvQkFDeEIsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO2lCQUNwQjtxQkFBTTtvQkFDSCxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDO29CQUMzQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUMxQjtnQkFFRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLE1BQU07YUFDVDtZQUVELE9BQU87WUFDUCxPQUFPO1lBQ1AsS0FBSyxFQUFFLENBQUM7WUFDUixLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUNMLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNqQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLE1BQU07YUFDVDtZQUVELFFBQVE7WUFDUixLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUNMLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2hELElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO2dCQUM1QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLE1BQU07YUFDVDtZQUVELEtBQUs7WUFDTCxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO29CQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3pCO2dCQUNELE1BQU07YUFDVDtZQUVEO2dCQUNJLE9BQU87Z0JBQ1AsTUFBTTtTQUNiO0lBQ0wsQ0FBQztJQUVELGlCQUFpQixDQUFDLEtBQVUsRUFBRSxLQUFhO1FBQ3ZDLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUM7UUFFakMsUUFBUSxLQUFLLENBQUMsS0FBSyxFQUFFO1lBQ2pCLFFBQVE7WUFDUixLQUFLLEVBQUUsQ0FBQztZQUNSLEtBQUssRUFBRSxDQUFDLENBQUM7Z0JBQ0wsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQ3JCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO2dCQUN4QyxJQUFJLFNBQVMsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN2QyxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDekUsSUFBSSxRQUFRLEVBQUU7b0JBQ1YsUUFBUSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7b0JBQ3hCLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztpQkFDcEI7Z0JBQ0QsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixNQUFNO2FBQ1Q7WUFFRCxZQUFZO1lBQ1osS0FBSyxFQUFFLENBQUMsQ0FBQztnQkFDTCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztnQkFDckIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDO2dCQUMzQyxJQUFJLFFBQVEsRUFBRTtvQkFDVixRQUFRLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztvQkFDeEIsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO2lCQUNwQjtxQkFBTTtvQkFDSCxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO29CQUMxQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUMzQjtnQkFFRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLE1BQU07YUFDVDtZQUVELGFBQWE7WUFDYixLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUNMLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2dCQUNyQixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7Z0JBQ3ZDLElBQUksUUFBUSxFQUFFO29CQUNWLFFBQVEsQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO29CQUN4QixRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7aUJBQ3BCO3FCQUFNO29CQUNILElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7b0JBQzNDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQzFCO2dCQUVELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkIsTUFBTTthQUNUO1lBRUQsT0FBTztZQUNQLE9BQU87WUFDUCxLQUFLLEVBQUUsQ0FBQztZQUNSLEtBQUssRUFBRSxDQUFDLENBQUM7Z0JBQ0wsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ2hDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkIsTUFBTTthQUNUO1lBRUQsUUFBUTtZQUNSLEtBQUssRUFBRSxDQUFDLENBQUM7Z0JBQ0wsSUFBSSxDQUFDLG1CQUFtQixFQUFFLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDaEQsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7Z0JBQzVCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkIsTUFBTTthQUNUO1lBRUQsS0FBSztZQUNMLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ0osSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDdEIsTUFBTTthQUNUO1lBRUQ7Z0JBQ0ksT0FBTztnQkFDUCxNQUFNO1NBQ2I7SUFDTCxDQUFDO0lBRUQsZUFBZSxDQUFDLElBQVMsRUFBRSxVQUFrQjtRQUN6QyxJQUFJLElBQUksRUFBRTtZQUNOLElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxDQUFDLElBQUksVUFBVSxLQUFLLENBQUMsRUFBRTtnQkFDL0MsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDMUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMzQjtpQkFBTTtnQkFDSCxJQUFJLGtCQUFrQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDdEYsSUFBSSxLQUFLLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSw2REFBNkQsQ0FBQyxDQUFDO2dCQUMvRyxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDeEMsU0FBUyxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7Z0JBQ3pCLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNyQjtTQUNKO2FBQU07WUFDSCxJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssQ0FBQyxJQUFJLFVBQVUsS0FBSyxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsRUFBRTtnQkFDckUsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQztnQkFDM0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMxQjtpQkFBTTtnQkFDSCxJQUFJLGtCQUFrQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDdEYsSUFBSSxTQUFTLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsRUFBRSw2REFBNkQsQ0FBQyxDQUFDO2dCQUN6SCxTQUFTLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztnQkFDekIsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ3JCO1NBQ0o7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksSUFBSSxDQUFDO1FBRVQsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3RCLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2dCQUV6QixJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUTtvQkFBRSxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsb0JBQW9CLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7b0JBQ3ZILFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ2pHO2lCQUFNO2dCQUNILElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUU7b0JBQy9CLElBQUksS0FBSyxDQUFDO29CQUVWLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxPQUFPLEVBQUU7d0JBQzlCLEtBQUssR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsc0RBQXNELENBQUMsQ0FBQztxQkFDeEg7eUJBQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLE1BQU0sRUFBRTt3QkFDcEMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxtREFBbUQsQ0FBQyxDQUFDO3FCQUNySDt5QkFBTTt3QkFDSCxLQUFLLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLDZEQUE2RCxDQUFDLENBQUM7cUJBQy9IO29CQUVELElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO3dCQUMzQixJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7cUJBQ2xDO2lCQUNKO3FCQUFNO29CQUNILElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxPQUFPLEVBQUU7d0JBQzlCLElBQUksR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsc0RBQXNELENBQUMsQ0FBQztxQkFDN0g7eUJBQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLE1BQU0sRUFBRTt3QkFDcEMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxtREFBbUQsQ0FBQyxDQUFDO3FCQUMxSDt5QkFBTTt3QkFDSCxJQUFJLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLDZEQUE2RCxDQUFDLENBQUM7cUJBQ3BJO2lCQUNKO2dCQUVELElBQUksSUFBSSxFQUFFO29CQUNOLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO29CQUNwQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7aUJBQ2hCO2FBQ0o7WUFFRCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztTQUMvQjthQUFNO1lBQ0gsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7U0FDNUI7SUFDTCxDQUFDO0lBRUQsaUJBQWlCO1FBQ2IsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLGFBQWEsQ0FBQztRQUN2RCxJQUFJLElBQVUsQ0FBQztRQUVmLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxPQUFPLEVBQUU7WUFDOUIsSUFBSSxLQUFLLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsc0RBQXNELENBQUMsQ0FBQztZQUMvRixJQUFJLFlBQVksR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxpREFBaUQsQ0FBQyxDQUFDO1lBQ3ZHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUMsSUFBSSxHQUFHLFlBQVksSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFaEMsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDcEIsSUFBSSxhQUFhLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsZ0VBQWdFLENBQUMsQ0FBQztnQkFDakgsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN6RDtTQUNKO2FBQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLE1BQU0sRUFBRTtZQUNwQyxJQUFJLEtBQUssR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxtREFBbUQsQ0FBQyxDQUFDO1lBQzVGLElBQUksWUFBWSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLDhDQUE4QyxDQUFDLENBQUM7WUFDcEcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QyxJQUFJLEdBQUcsWUFBWSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVoQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUNwQixJQUFJLGFBQWEsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSw2REFBNkQsQ0FBQyxDQUFDO2dCQUM5RyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3pEO1NBQ0o7YUFBTTtZQUNILElBQUksR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1lBQzVELElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ1AsSUFBSSxTQUFTLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUseURBQXlELENBQUMsQ0FBQztnQkFDNUcsSUFBSSxTQUFTO29CQUFFLElBQUksR0FBRyxTQUFTLENBQUM7O29CQUMzQixJQUFJLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsNkRBQTZELENBQUMsQ0FBQzthQUMvRztTQUNKO1FBRUQsSUFBSSxJQUFJLEVBQUU7WUFDTixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztZQUVwQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQy9FLFVBQVUsQ0FBQyxHQUFHLEVBQUU7b0JBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7d0JBQ2hCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztxQkFDaEI7Z0JBQ0wsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ1Q7WUFFRCxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztTQUM3QjtJQUNMLENBQUM7SUFFRCxTQUFTLENBQUMsS0FBVTtRQUNoQixJQUFJLGlCQUFpQixHQUFHLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFN0YsSUFBSSxpQkFBaUIsSUFBSSxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ25ELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsYUFBYSxFQUFFO2dCQUNuRCxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNoQztpQkFBTTtnQkFDSCxJQUFJLFlBQVksR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUUvRixJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUU7b0JBQ2hCLElBQUksWUFBWSxJQUFJLENBQUMsQ0FBQyxJQUFJLFlBQVksS0FBSyxDQUFDLEVBQUU7d0JBQzFDLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTs0QkFDaEIsaUJBQWlCLENBQUMsaUJBQWlCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO3lCQUMzRDs2QkFBTTs0QkFDSCxJQUFJLFlBQVksS0FBSyxDQUFDLENBQUM7Z0NBQUUsT0FBTyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7aUNBQzlDLElBQUksWUFBWSxLQUFLLENBQUM7Z0NBQUUsT0FBTzt5QkFDdkM7cUJBQ0o7eUJBQU07d0JBQ0gsaUJBQWlCLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO3FCQUMvQztpQkFDSjtxQkFBTTtvQkFDSCxJQUFJLFlBQVksSUFBSSxDQUFDLENBQUMsRUFBRTt3QkFDcEIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFOzRCQUNmLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO3lCQUNoQzs2QkFBTTs0QkFDSCxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7NEJBRWxCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0NBQy9DLElBQUksaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxLQUFLLE1BQU07b0NBQUUsU0FBUyxHQUFHLENBQUMsQ0FBQzs2QkFDOUQ7NEJBRUQsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7eUJBQ3hDO3FCQUNKO3lCQUFNLElBQUksWUFBWSxLQUFLLGlCQUFpQixDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7d0JBQ3RELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLFlBQVksSUFBSSxDQUFDLENBQUM7NEJBQUUsT0FBTyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7d0JBRXJFLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO3FCQUNoQzt5QkFBTTt3QkFDSCxpQkFBaUIsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7cUJBQy9DO2lCQUNKO2FBQ0o7U0FDSjtRQUVELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQscUJBQXFCLENBQUMsQ0FBUztRQUMzQixJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDbEYsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsb0JBQW9CLENBQUMsQ0FBUztRQUMxQixJQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDakYsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsZUFBZSxHQUFHLFVBQVUsS0FBYSxFQUFFLEVBQVc7UUFDbEQsWUFBWTtRQUNaLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLEVBQUU7WUFDekIsSUFBSSxLQUFLLEtBQUssRUFBRSxFQUFFO2dCQUNkLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN0QjtpQkFBTTtnQkFDSCxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO2FBQ2xDO1NBQ0o7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDLENBQUM7SUFFRixZQUFZLENBQUMsSUFBWSxFQUFFLE1BQWMsRUFBRSxNQUFjLEVBQUUsRUFBVztRQUNsRSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3ZCLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3JELElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUU7WUFDekIsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMxQztRQUNELElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFLEVBQUU7WUFDNUIsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDN0M7UUFDRCxNQUFNLGVBQWUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQzVELElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxlQUFlLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsS0FBSyxlQUFlLEVBQUU7WUFDcEYsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLGFBQWEsRUFBRTtnQkFDekMsT0FBTyxLQUFLLENBQUM7YUFDaEI7WUFDRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEtBQUssYUFBYSxFQUFFO2dCQUMzQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEdBQUcsTUFBTSxFQUFFO29CQUNwQyxPQUFPLEtBQUssQ0FBQztpQkFDaEI7Z0JBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxLQUFLLE1BQU0sRUFBRTtvQkFDdEMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxHQUFHLE1BQU0sRUFBRTt3QkFDcEMsT0FBTyxLQUFLLENBQUM7cUJBQ2hCO2lCQUNKO2FBQ0o7U0FDSjtRQUVELElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxlQUFlLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsS0FBSyxlQUFlLEVBQUU7WUFDcEYsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLGFBQWEsRUFBRTtnQkFDekMsT0FBTyxLQUFLLENBQUM7YUFDaEI7WUFDRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEtBQUssYUFBYSxFQUFFO2dCQUMzQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEdBQUcsTUFBTSxFQUFFO29CQUNwQyxPQUFPLEtBQUssQ0FBQztpQkFDaEI7Z0JBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxLQUFLLE1BQU0sRUFBRTtvQkFDdEMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxHQUFHLE1BQU0sRUFBRTt3QkFDcEMsT0FBTyxLQUFLLENBQUM7cUJBQ2hCO2lCQUNKO2FBQ0o7U0FDSjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxhQUFhLENBQUMsS0FBVTtRQUNwQixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ2xDLElBQUksT0FBTyxHQUFXLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN2RCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBRXBCLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJO1lBQUUsT0FBTyxHQUFHLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQzthQUN6RSxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxFQUFFO1lBQzlCLG9DQUFvQztZQUNwQyxJQUFZLFFBQVEsR0FBRyxFQUFFLElBQUksT0FBTyxHQUFHLEVBQUUsRUFBRTtnQkFDdkMsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQzthQUNwQjtZQUNELE9BQU8sR0FBRyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7U0FDcEQ7UUFFRCxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFPLElBQUksQ0FBQyxhQUFhLEVBQU8sSUFBSSxDQUFDLGFBQWEsRUFBTyxLQUFLLENBQUMsRUFBRTtZQUMxRixJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQztZQUMzQixJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQztTQUNuQjtRQUNELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsNEJBQTRCLENBQUMsS0FBWSxFQUFFLElBQVksRUFBRSxTQUFpQjtRQUN0RSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQzFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUMxQjtJQUNMLENBQUM7SUFFRCwwQkFBMEIsQ0FBQyxLQUFZO1FBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1lBQzVCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNyQjtJQUNMLENBQUM7SUFFRCw2QkFBNkI7UUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN4QyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDckI7SUFDTCxDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQW1CLEVBQUUsUUFBdUIsRUFBRSxJQUFtQixFQUFFLFNBQXdCO1FBQzlGLElBQUksQ0FBQyxHQUFHLFFBQVEsSUFBSSxHQUFHLENBQUM7UUFFeEIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ25DLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMzQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFTixRQUFRLElBQUksRUFBRTtZQUNWLEtBQUssQ0FBQztnQkFDRixJQUFJLFNBQVMsS0FBSyxDQUFDO29CQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7O29CQUMxQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMvQixNQUFNO1lBRVYsS0FBSyxDQUFDO2dCQUNGLElBQUksU0FBUyxLQUFLLENBQUM7b0JBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7b0JBQzVDLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2pDLE1BQU07WUFFVixLQUFLLENBQUM7Z0JBQ0YsSUFBSSxTQUFTLEtBQUssQ0FBQztvQkFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDOztvQkFDNUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDakMsTUFBTTtTQUNiO1FBRUQsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELG9CQUFvQjtRQUNoQixJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDdEIsWUFBWSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztTQUMvQjtJQUNMLENBQUM7SUFFRCxhQUFhLENBQUMsS0FBVTtRQUNwQixJQUFJLE9BQU8sR0FBVyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDdkQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUVwQixJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSTtZQUFFLE9BQU8sR0FBRyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7YUFDdkUsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksRUFBRTtZQUM5QiwyQ0FBMkM7WUFDM0MsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLEVBQUUsRUFBRTtnQkFDekIsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQzthQUNwQjtZQUNELE9BQU8sR0FBRyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7U0FDbkQ7UUFFRCxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFPLElBQUksQ0FBQyxhQUFhLEVBQU8sSUFBSSxDQUFDLGFBQWEsRUFBTyxLQUFLLENBQUMsRUFBRTtZQUMxRixJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQztZQUMzQixJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQztTQUNuQjtRQUVELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsZUFBZSxDQUFDLEtBQVU7UUFDdEIsSUFBSSxTQUFTLEdBQVcsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzdELFNBQVMsR0FBRyxTQUFTLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDeEQsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFNLElBQUksQ0FBQyxXQUFXLEVBQUUsU0FBUyxFQUFPLElBQUksQ0FBQyxhQUFhLEVBQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQzVGLElBQUksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO1NBQ2xDO1FBRUQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxlQUFlLENBQUMsS0FBVTtRQUN0QixJQUFJLFNBQVMsR0FBUSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDMUQsU0FBUyxHQUFHLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUN2RCxJQUFJLElBQUksQ0FBQyxZQUFZLENBQU0sSUFBSSxDQUFDLFdBQVcsRUFBRSxTQUFTLEVBQU8sSUFBSSxDQUFDLGFBQWEsRUFBTyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDNUYsSUFBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7U0FDbEM7UUFFRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELGVBQWUsQ0FBQyxLQUFVO1FBQ3RCLElBQUksU0FBUyxHQUFRLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUMxRCxTQUFTLEdBQUcsU0FBUyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ3hELElBQUksSUFBSSxDQUFDLFlBQVksQ0FBTSxJQUFJLENBQUMsV0FBVyxFQUFPLElBQUksQ0FBQyxhQUFhLEVBQUUsU0FBUyxFQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUM1RixJQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztTQUNsQztRQUVELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsZUFBZSxDQUFDLEtBQVU7UUFDdEIsSUFBSSxTQUFTLEdBQVEsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzFELFNBQVMsR0FBRyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDdkQsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFNLElBQUksQ0FBQyxXQUFXLEVBQU8sSUFBSSxDQUFDLGFBQWEsRUFBRSxTQUFTLEVBQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQzVGLElBQUksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO1NBQ2xDO1FBRUQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxVQUFVO1FBQ04sSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN2QixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFO1lBQ3pCLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDMUM7UUFDRCxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFFO1lBQzVCLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQzdDO1FBQ0QsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7UUFFdkQsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksRUFBRTtZQUN6QixJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssRUFBRTtnQkFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O2dCQUN6RCxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFTLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDbkY7YUFBTTtZQUNILEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ3BDO1FBRUQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDckMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDckMsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBRTtZQUN6QixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUFFLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7O2dCQUM3QyxLQUFLLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDOUI7UUFFRCxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFFO1lBQzVCLEtBQUssR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDL0M7UUFFRCxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCxVQUFVLENBQUMsS0FBVTtRQUNqQixNQUFNLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDdkIsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFNLElBQUksQ0FBQyxXQUFXLEVBQU8sSUFBSSxDQUFDLGFBQWEsRUFBTyxJQUFJLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxFQUFFO1lBQ25HLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNyQjtRQUNELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQTBCO1FBQ2xDLDZGQUE2RjtRQUM3RixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNqQixPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUV2QixJQUFJLEdBQUcsR0FBc0IsS0FBSyxDQUFDLE1BQU8sQ0FBQyxLQUFLLENBQUM7UUFDakQsSUFBSTtZQUNBLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzQyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ25CO2lCQUFNLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDekIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMzQjtTQUNKO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDVixjQUFjO1lBQ2QsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDMUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMzQjtRQUVELElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQVEsQ0FBQztRQUNqRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsS0FBVTtRQUN2QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsRUFBRTtZQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxFQUFFLEtBQUssQ0FBQyxXQUFXLEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDbkYsT0FBTyxHQUFHLEtBQUssQ0FBQzthQUNuQjtTQUNKO2FBQU0sSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDdEcsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBRTtnQkFDekIsT0FBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO2FBQ3BFO1NBQ0o7UUFDRCxPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBRUQsb0JBQW9CLENBQUMsSUFBWTtRQUM3QixJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ25DLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFFRCxJQUFJLEtBQVUsQ0FBQztRQUVmLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFLEVBQUU7WUFDMUIsS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDcEM7YUFBTSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFFO1lBQ25DLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDaEQsS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUNYLEtBQUssSUFBSSxLQUFLLElBQUksTUFBTSxFQUFFO2dCQUN0QixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQzthQUNoRDtTQUNKO2FBQU0sSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBRTtZQUNoQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsY0FBYyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ3pELEtBQUssR0FBRyxFQUFFLENBQUM7WUFDWCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDcEMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7YUFDbkQ7U0FDSjtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxhQUFhLENBQUMsSUFBUztRQUNuQixJQUFJLElBQVUsQ0FBQztRQUNmLElBQUksS0FBSyxHQUFhLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFdEMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQy9DO2FBQU07WUFDSCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDeEMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNmLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDeEQsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUU3QixJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUNuRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDN0M7aUJBQU07Z0JBQ0gsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2FBQzNDO1NBQ0o7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsWUFBWSxDQUFDLEtBQVUsRUFBRSxVQUFlLEVBQUUsSUFBUztRQUMvQyxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2xDLE1BQU0sY0FBYyxDQUFDO1NBQ3hCO1FBRUQsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxJQUFJLENBQUM7UUFDekMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN0QyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQixLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QixLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsV0FBVyxDQUFDLElBQVM7UUFDakIsT0FBTyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVELFFBQVE7UUFDSixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzNCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUMxQixTQUFTLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzVCO1FBRUQsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7UUFFdkssSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUV2RCxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNoQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDdEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDekM7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUVoQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDZixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQzthQUM1QjtZQUVELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1NBQzlCO0lBQ0wsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsbUJBQW1CLEVBQUUsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2hELElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBQzVCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBRTVCLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNkLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUMxQjtRQUVELElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELE1BQU07UUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO2dCQUN0QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDbkQ7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ3RCO1NBQ0o7SUFDTCxDQUFDO0lBRUQsdUJBQXVCLENBQUMsS0FBcUI7UUFDekMsUUFBUSxLQUFLLENBQUMsT0FBTyxFQUFFO1lBQ25CLEtBQUssU0FBUyxDQUFDO1lBQ2YsS0FBSyxnQkFBZ0I7Z0JBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO29CQUNkLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztvQkFDN0IsSUFBSSxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsSUFBSSxDQUFDLGlCQUEyQixFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUNqRSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDbkIsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO3dCQUNqQixJQUFJLElBQUksQ0FBQyxPQUFPOzRCQUFFLFdBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzs7NEJBQ2pHLFdBQVcsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztxQkFDaEc7b0JBRUQsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO29CQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDM0I7Z0JBQ0QsTUFBTTtZQUVWLEtBQUssTUFBTTtnQkFDUCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN6QixNQUFNO1NBQ2I7SUFDTCxDQUFDO0lBRUQsc0JBQXNCLENBQUMsS0FBcUI7UUFDeEMsUUFBUSxLQUFLLENBQUMsT0FBTyxFQUFFO1lBQ25CLEtBQUssU0FBUyxDQUFDO1lBQ2YsS0FBSyxnQkFBZ0I7Z0JBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO29CQUNkLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO29CQUNqQyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztvQkFDbEMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7aUJBQzdCO2dCQUNELE1BQU07WUFFVixLQUFLLE1BQU07Z0JBQ1AsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO29CQUNqQixXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDcEM7Z0JBQ0QsTUFBTTtTQUNiO0lBQ0wsQ0FBQztJQUVELGFBQWE7UUFDVCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssTUFBTTtnQkFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQWMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztnQkFDbkYsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM1RDtJQUNMLENBQUM7SUFFRCxvQkFBb0I7UUFDaEIsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDL0IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNuRDtJQUNMLENBQUM7SUFFRCxZQUFZO1FBQ1IsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDckM7YUFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDckIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNmLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7b0JBQ3RCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUM7b0JBQ3pFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxhQUFhLENBQUMsR0FBRyxJQUFJLENBQUM7aUJBQzFHO3FCQUFNO29CQUNILElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxhQUFhLENBQUMsR0FBRyxJQUFJLENBQUM7aUJBQ3ZHO2dCQUVELFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxhQUFhLENBQUMsQ0FBQzthQUN0RjtpQkFBTTtnQkFDSCxVQUFVLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsYUFBYSxDQUFDLENBQUM7YUFDdEY7U0FDSjtJQUNMLENBQUM7SUFFRCxjQUFjLENBQUMsT0FBWTtRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQzVCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEYsSUFBSSxjQUFjLEdBQUcscUhBQXFILENBQUM7WUFDM0ksVUFBVSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFFekQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUU7Z0JBQzdFLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7WUFDaEMsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekQsVUFBVSxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQ2hDO0lBQ0wsQ0FBQztJQUVELGVBQWU7UUFDWCxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsMkJBQTJCLENBQUMsQ0FBQztZQUM1RCxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFO2dCQUM1QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxjQUFjLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUM1RztTQUNKO0lBQ0wsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNaLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6RCxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDL0MsSUFBSSxlQUF5QixDQUFDO1FBQzlCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzFDLElBQUksU0FBUyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxJQUFJLFVBQVUsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLGlDQUFpQyxDQUFDLEVBQUU7Z0JBQ25FLGVBQWUsR0FBRyxJQUFJLENBQUM7Z0JBQ3ZCLE1BQU07YUFDVDtTQUNKO1FBRUQsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUNsQixVQUFVLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztTQUNsQztRQUVELElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFRCx1QkFBdUI7UUFDbkIsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDekIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztTQUNqQztJQUNMLENBQUM7SUFFRCwwQkFBMEI7UUFDdEIsSUFBSSxJQUFJLENBQUMsb0JBQW9CLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUN4QyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDO1NBQ3BDO0lBQ0wsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFVO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQzlDLElBQUk7Z0JBQ0EsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3REO1lBQUMsTUFBTTtnQkFDSixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7b0JBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2lCQUN0QjthQUNKO1NBQ0o7UUFFRCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsRUFBWTtRQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQsaUJBQWlCLENBQUMsRUFBWTtRQUMxQixJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsR0FBWTtRQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztRQUNwQixJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxhQUFhO1FBQ1QsT0FBTyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVELGtCQUFrQjtRQUNkLE9BQU8sSUFBSSxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQzFGLENBQUM7SUFFRCw4Q0FBOEM7SUFDOUMsVUFBVSxDQUFDLElBQVMsRUFBRSxNQUFXO1FBQzdCLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDUCxPQUFPLEVBQUUsQ0FBQztTQUNiO1FBRUQsSUFBSSxPQUFhLENBQUM7UUFDbEIsTUFBTSxTQUFTLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtZQUM1QixNQUFNLE9BQU8sR0FBRyxPQUFPLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDO1lBQ3BGLElBQUksT0FBTyxFQUFFO2dCQUNULE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFDRCxPQUFPLE9BQU8sQ0FBQztRQUNuQixDQUFDLEVBQ0QsWUFBWSxHQUFHLENBQUMsS0FBYSxFQUFFLEtBQVUsRUFBRSxHQUFRLEVBQUUsRUFBRTtZQUNuRCxJQUFJLEdBQUcsR0FBRyxFQUFFLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNsQixPQUFPLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFFO29CQUNyQixHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztpQkFDbkI7YUFDSjtZQUNELE9BQU8sR0FBRyxDQUFDO1FBQ2YsQ0FBQyxFQUNELFVBQVUsR0FBRyxDQUFDLEtBQWEsRUFBRSxLQUFVLEVBQUUsVUFBZSxFQUFFLFNBQWMsRUFBRSxFQUFFO1lBQ3hFLE9BQU8sU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuRSxDQUFDLENBQUM7UUFDTixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDaEIsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBRXBCLElBQUksSUFBSSxFQUFFO1lBQ04sS0FBSyxPQUFPLEdBQUcsQ0FBQyxFQUFFLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFO2dCQUNsRCxJQUFJLE9BQU8sRUFBRTtvQkFDVCxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO3dCQUNuRCxPQUFPLEdBQUcsS0FBSyxDQUFDO3FCQUNuQjt5QkFBTTt3QkFDSCxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztxQkFDcEM7aUJBQ0o7cUJBQU07b0JBQ0gsUUFBUSxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFO3dCQUM1QixLQUFLLEdBQUc7NEJBQ0osTUFBTSxJQUFJLFlBQVksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDOzRCQUMvQyxNQUFNO3dCQUNWLEtBQUssR0FBRzs0QkFDSixNQUFNLElBQUksVUFBVSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs0QkFDL0ksTUFBTTt3QkFDVixLQUFLLEdBQUc7NEJBQ0osTUFBTSxJQUFJLFlBQVksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOzRCQUNoTCxNQUFNO3dCQUNWLEtBQUssR0FBRzs0QkFDSixNQUFNLElBQUksWUFBWSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOzRCQUNwRCxNQUFNO3dCQUNWLEtBQUssR0FBRzs0QkFDSixNQUFNLElBQUksVUFBVSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDOzRCQUNySixNQUFNO3dCQUNWLEtBQUssR0FBRzs0QkFDSixNQUFNLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUM7NEJBQ3hILE1BQU07d0JBQ1YsS0FBSyxHQUFHOzRCQUNKLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7NEJBQ3pCLE1BQU07d0JBQ1YsS0FBSyxHQUFHOzRCQUNKLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsS0FBSyxHQUFXLElBQUksQ0FBQyxXQUFXLENBQUM7NEJBQzVELE1BQU07d0JBQ1YsS0FBSyxHQUFHOzRCQUNKLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dDQUNoQixNQUFNLElBQUksR0FBRyxDQUFDOzZCQUNqQjtpQ0FBTTtnQ0FDSCxPQUFPLEdBQUcsSUFBSSxDQUFDOzZCQUNsQjs0QkFDRCxNQUFNO3dCQUNWOzRCQUNJLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO3FCQUN4QztpQkFDSjthQUNKO1NBQ0o7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQsVUFBVSxDQUFDLElBQVM7UUFDaEIsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNQLE9BQU8sRUFBRSxDQUFDO1NBQ2I7UUFFRCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDaEIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzVCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNoQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFFaEMsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksSUFBSSxLQUFLLEdBQUcsRUFBRSxJQUFJLEtBQUssSUFBSSxFQUFFLEVBQUU7WUFDdEQsS0FBSyxJQUFJLEVBQUUsQ0FBQztTQUNmO1FBRUQsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksRUFBRTtZQUN6QixNQUFNLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7U0FDakU7YUFBTTtZQUNILE1BQU0sSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7U0FDOUM7UUFDRCxNQUFNLElBQUksR0FBRyxDQUFDO1FBQ2QsTUFBTSxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUVqRCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbEIsTUFBTSxJQUFJLEdBQUcsQ0FBQztZQUNkLE1BQU0sSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7U0FDcEQ7UUFFRCxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxFQUFFO1lBQ3pCLE1BQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztTQUNsRDtRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxTQUFTLENBQUMsS0FBVTtRQUNoQixJQUFJLE1BQU0sR0FBYSxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFaEQsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLGdCQUFnQixFQUFFO1lBQ3BDLE1BQU0sY0FBYyxDQUFDO1NBQ3hCO1FBRUQsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUV0RCxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBTSxDQUFDLENBQUMsSUFBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRTtZQUN6SSxNQUFNLGNBQWMsQ0FBQztTQUN4QjthQUFNO1lBQ0gsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksRUFBRTtnQkFDekIsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUU7b0JBQ3JCLENBQUMsSUFBSSxFQUFFLENBQUM7aUJBQ1g7cUJBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRTtvQkFDN0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztpQkFDWDthQUNKO1lBRUQsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7U0FDNUM7SUFDTCxDQUFDO0lBRUQsNkNBQTZDO0lBQzdDLFNBQVMsQ0FBQyxLQUFVLEVBQUUsTUFBVztRQUM3QixJQUFJLE1BQU0sSUFBSSxJQUFJLElBQUksS0FBSyxJQUFJLElBQUksRUFBRTtZQUNqQyxNQUFNLG1CQUFtQixDQUFDO1NBQzdCO1FBRUQsS0FBSyxHQUFHLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2xFLElBQUksS0FBSyxLQUFLLEVBQUUsRUFBRTtZQUNkLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFFRCxJQUFJLE9BQWEsRUFDYixHQUFHLEVBQ0gsS0FBSyxFQUNMLE1BQU0sR0FBRyxDQUFDLEVBQ1YsZUFBZSxHQUFHLE9BQU8sSUFBSSxDQUFDLGVBQWUsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFFLENBQUMsRUFDekosSUFBSSxHQUFHLENBQUMsQ0FBQyxFQUNULEtBQUssR0FBRyxDQUFDLENBQUMsRUFDVixHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQ1IsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUNSLE9BQU8sR0FBRyxLQUFLLEVBQ2YsSUFBSSxFQUNKLFNBQVMsR0FBRyxDQUFDLEtBQVUsRUFBRSxFQUFFO1lBQ3ZCLElBQUksT0FBTyxHQUFHLE9BQU8sR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUM7WUFDbEYsSUFBSSxPQUFPLEVBQUU7Z0JBQ1QsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELE9BQU8sT0FBTyxDQUFDO1FBQ25CLENBQUMsRUFDRCxTQUFTLEdBQUcsQ0FBQyxLQUFVLEVBQUUsRUFBRTtZQUN2QixJQUFJLFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQzVCLElBQUksR0FBRyxLQUFLLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLEdBQUcsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ3ZHLE9BQU8sR0FBRyxLQUFLLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDbEMsTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLEdBQUcsR0FBRyxHQUFHLElBQUksR0FBRyxHQUFHLENBQUMsRUFDekQsR0FBRyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ04sTUFBTSw2QkFBNkIsR0FBRyxNQUFNLENBQUM7YUFDaEQ7WUFDRCxNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUN4QixPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDaEMsQ0FBQyxFQUNELE9BQU8sR0FBRyxDQUFDLEtBQVUsRUFBRSxVQUFlLEVBQUUsU0FBYyxFQUFFLEVBQUU7WUFDdEQsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLEdBQUcsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDO1lBQ3BELElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUVmLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNqQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDM0I7WUFDRCxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNoQixPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN4QyxDQUFDLENBQUMsQ0FBQztZQUVILEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNuQyxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsRUFBRSxLQUFLLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRTtvQkFDeEUsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDcEIsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUM7b0JBQ3RCLE1BQU07aUJBQ1Q7YUFDSjtZQUVELElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUNkLE9BQU8sS0FBSyxHQUFHLENBQUMsQ0FBQzthQUNwQjtpQkFBTTtnQkFDSCxNQUFNLDJCQUEyQixHQUFHLE1BQU0sQ0FBQzthQUM5QztRQUNMLENBQUMsRUFDRCxZQUFZLEdBQUcsR0FBRyxFQUFFO1lBQ2hCLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNqRCxNQUFNLGlDQUFpQyxHQUFHLE1BQU0sQ0FBQzthQUNwRDtZQUNELE1BQU0sRUFBRSxDQUFDO1FBQ2IsQ0FBQyxDQUFDO1FBRU4sSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtZQUN2QixHQUFHLEdBQUcsQ0FBQyxDQUFDO1NBQ1g7UUFFRCxLQUFLLE9BQU8sR0FBRyxDQUFDLEVBQUUsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUU7WUFDbEQsSUFBSSxPQUFPLEVBQUU7Z0JBQ1QsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDbkQsT0FBTyxHQUFHLEtBQUssQ0FBQztpQkFDbkI7cUJBQU07b0JBQ0gsWUFBWSxFQUFFLENBQUM7aUJBQ2xCO2FBQ0o7aUJBQU07Z0JBQ0gsUUFBUSxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUM1QixLQUFLLEdBQUc7d0JBQ0osR0FBRyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDckIsTUFBTTtvQkFDVixLQUFLLEdBQUc7d0JBQ0osT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO3dCQUNuSCxNQUFNO29CQUNWLEtBQUssR0FBRzt3QkFDSixHQUFHLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNyQixNQUFNO29CQUNWLEtBQUssR0FBRzt3QkFDSixLQUFLLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUN2QixNQUFNO29CQUNWLEtBQUssR0FBRzt3QkFDSixLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7d0JBQy9ILE1BQU07b0JBQ1YsS0FBSyxHQUFHO3dCQUNKLElBQUksR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ3RCLE1BQU07b0JBQ1YsS0FBSyxHQUFHO3dCQUNKLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDaEMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQzt3QkFDMUIsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7d0JBQzVCLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQ3JCLE1BQU07b0JBQ1YsS0FBSyxHQUFHO3dCQUNKLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBVyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7d0JBQ3JFLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7d0JBQzFCLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO3dCQUM1QixHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUNyQixNQUFNO29CQUNWLEtBQUssR0FBRzt3QkFDSixJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRTs0QkFDaEIsWUFBWSxFQUFFLENBQUM7eUJBQ2xCOzZCQUFNOzRCQUNILE9BQU8sR0FBRyxJQUFJLENBQUM7eUJBQ2xCO3dCQUNELE1BQU07b0JBQ1Y7d0JBQ0ksWUFBWSxFQUFFLENBQUM7aUJBQ3RCO2FBQ0o7U0FDSjtRQUVELElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDdkIsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3JCLE1BQU0sMkNBQTJDLEdBQUcsS0FBSyxDQUFDO2FBQzdEO1NBQ0o7UUFFRCxJQUFJLElBQUksS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNiLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ25DO2FBQU0sSUFBSSxJQUFJLEdBQUcsR0FBRyxFQUFFO1lBQ25CLElBQUksSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUM5RztRQUVELElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ1YsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNWLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFDVixHQUFHO2dCQUNDLEdBQUcsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxFQUFFLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDaEQsSUFBSSxHQUFHLElBQUksR0FBRyxFQUFFO29CQUNaLE1BQU07aUJBQ1Q7Z0JBQ0QsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsR0FBRyxJQUFJLEdBQUcsQ0FBQzthQUNkLFFBQVEsSUFBSSxFQUFFO1NBQ2xCO1FBRUQsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtZQUN0QixLQUFLLEdBQUcsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNqQyxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztTQUM5QjtRQUVELElBQUksR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUVqRSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLEdBQUcsRUFBRTtZQUN4RixNQUFNLGNBQWMsQ0FBQyxDQUFDLGdCQUFnQjtTQUN6QztRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxvQkFBb0IsQ0FBQyxJQUFTO1FBQzFCLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDUCxPQUFPLElBQUksQ0FBQztTQUNmO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU5RCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsaUJBQWlCO1FBQ2IsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLGVBQWUsSUFBSSxFQUFFLENBQVksQ0FBQztJQUNsRixDQUFDO0lBRUQsa0JBQWtCLENBQUMsS0FBVTtRQUN6QixNQUFNLElBQUksR0FBUyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQzlCLE1BQU0sUUFBUSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDO1FBRXhOLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxLQUFVO1FBQ3pCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRCxxQkFBcUI7UUFDakIsSUFBSSxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDbkQsSUFBSSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtnQkFDOUIsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNoRCxJQUFJLENBQUMsc0JBQXVCLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQztnQkFDbEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7YUFDOUU7WUFFRCxJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7WUFDbkIsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7Z0JBQ3hCLElBQUksaUJBQWlCLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFPLEVBQUUsRUFBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBRTdNLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQy9DLElBQUksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLEdBQUcsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3JELElBQUksTUFBTSxHQUFHO3dDQUNPLElBQUksQ0FBQyxpQkFBaUIsbUNBQW1DLFNBQVM7OztxQkFHckYsQ0FBQztvQkFFRixLQUFLLElBQUksQ0FBQyxHQUFtQixTQUFTLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxFQUFFLEVBQUU7d0JBQ2xFLE1BQU0sSUFBSTs0Q0FDVSxJQUFJLENBQUMsaUJBQWlCLG1DQUFtQyxDQUFDLEdBQUcsQ0FBQzs7O3lCQUdqRixDQUFDO3FCQUNMO29CQUVELFNBQVMsSUFBSTt3REFDdUIsVUFBVTs4QkFDcEMsTUFBTTs7cUJBRWYsQ0FBQztpQkFDTDthQUNKO1lBRWtCLElBQUksQ0FBQyxzQkFBdUIsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1NBQ3pFO0lBQ0wsQ0FBQztJQUVELDZCQUE2QjtRQUN6QixJQUFJLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtZQUM3QixJQUFJLENBQUMsc0JBQXNCLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDckMsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQztTQUN0QztJQUNMLENBQUM7SUFFRCx5QkFBeUI7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtZQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtnQkFDN0IsTUFBTSxjQUFjLEdBQVEsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUUxRixJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLFdBQVcsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO29CQUNyRixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO3dCQUNyRCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUU7NEJBQ2YsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDOzRCQUNuQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFFaEMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQzt3QkFDM0IsQ0FBQyxDQUFDLENBQUM7cUJBQ047Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUVELDJCQUEyQjtRQUN2QixJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtZQUM1QixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUM3QixJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDO1NBQ3JDO0lBQ0wsQ0FBQztJQUVELDBCQUEwQjtRQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUMvQyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUM3RztJQUNMLENBQUM7SUFFRCw0QkFBNEI7UUFDeEIsSUFBSSxJQUFJLENBQUMsc0JBQXNCLEVBQUU7WUFDN0IsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7WUFDOUIsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQztTQUN0QztJQUNMLENBQUM7SUFFRCxrQkFBa0I7UUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNyQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksNkJBQTZCLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLGFBQWEsRUFBRSxHQUFHLEVBQUU7Z0JBQ2hHLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtvQkFDckIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2lCQUN0QjtZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ047UUFFRCxJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDNUMsQ0FBQztJQUVELG9CQUFvQjtRQUNoQixJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDcEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1NBQzdDO0lBQ0wsQ0FBQztJQUVELGdCQUFnQixDQUFDLEtBQVk7UUFDekIsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1TSxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsS0FBWTtRQUN6QixPQUFPLENBQ0gsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLG1CQUFtQixDQUFDLElBQUksVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLHdCQUF3QixDQUFDLElBQUksVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLG1CQUFtQixDQUFDLElBQUksVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLHdCQUF3QixDQUFDLENBQ2pQLENBQUM7SUFDTixDQUFDO0lBRUQsY0FBYztRQUNWLElBQUksSUFBSSxDQUFDLGNBQWMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsRUFBRTtZQUNwRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdEI7SUFDTCxDQUFDO0lBRUQsYUFBYTtRQUNULElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUU3QixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdEI7UUFFRCxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsNEJBQTRCLEVBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUN4QixDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNwQixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzdCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1NBQzdCO1FBRUQsSUFBSSxJQUFJLENBQUMsdUJBQXVCLEVBQUU7WUFDOUIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQzlDO1FBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDbkM7UUFFRCxJQUFJLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekIsQ0FBQzt1R0F2L0ZRLFFBQVEsa0JBMnBCRyxRQUFROzJGQTNwQm5CLFFBQVEsODBFQUxOLENBQUMsdUJBQXVCLENBQUMsb0RBdWZuQixhQUFhLDhVQTMzQnBCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBc1dULHVpR0E4aEdpRSxlQUFlLGlGQUFFLGdCQUFnQixrRkFBRSxhQUFhLCtFQUFFLGVBQWUsaUZBQUUsU0FBUywyRUFBRSxZQUFZLDRDQTdoR2hKO1lBQ1IsT0FBTyxDQUFDLGtCQUFrQixFQUFFO2dCQUN4QixLQUFLLENBQ0QsZ0JBQWdCLEVBQ2hCLEtBQUssQ0FBQztvQkFDRixTQUFTLEVBQUUsc0JBQXNCO29CQUNqQyxPQUFPLEVBQUUsQ0FBQztpQkFDYixDQUFDLENBQ0w7Z0JBQ0QsVUFBVSxDQUFDLGlCQUFpQixFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsMEJBQTBCLEVBQUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVKLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNGLFVBQVUsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLHVDQUF1QyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxDQUFDO2dCQUN0SixVQUFVLENBQUMsd0JBQXdCLEVBQUU7b0JBQ2pDLE9BQU8sQ0FDSCwwQkFBMEIsRUFDMUIsS0FBSyxDQUFDO3dCQUNGLE9BQU8sRUFBRSxDQUFDO3dCQUNWLFNBQVMsRUFBRSx1Q0FBdUM7cUJBQ3JELENBQUMsQ0FDTDtpQkFDSixDQUFDO2FBQ0wsQ0FBQztTQUNMOzsyRkFZUSxRQUFRO2tCQTNZcEIsU0FBUzsrQkFDSSxZQUFZLFlBQ1o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FzV1QsY0FDVzt3QkFDUixPQUFPLENBQUMsa0JBQWtCLEVBQUU7NEJBQ3hCLEtBQUssQ0FDRCxnQkFBZ0IsRUFDaEIsS0FBSyxDQUFDO2dDQUNGLFNBQVMsRUFBRSxzQkFBc0I7Z0NBQ2pDLE9BQU8sRUFBRSxDQUFDOzZCQUNiLENBQUMsQ0FDTDs0QkFDRCxVQUFVLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQywwQkFBMEIsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDNUosVUFBVSxDQUFDLGlCQUFpQixFQUFFLENBQUMsT0FBTyxDQUFDLDBCQUEwQixFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDM0YsVUFBVSxDQUFDLHdCQUF3QixFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsdUNBQXVDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUM7NEJBQ3RKLFVBQVUsQ0FBQyx3QkFBd0IsRUFBRTtnQ0FDakMsT0FBTyxDQUNILDBCQUEwQixFQUMxQixLQUFLLENBQUM7b0NBQ0YsT0FBTyxFQUFFLENBQUM7b0NBQ1YsU0FBUyxFQUFFLHVDQUF1QztpQ0FDckQsQ0FBQyxDQUNMOzZCQUNKLENBQUM7eUJBQ0wsQ0FBQztxQkFDTCxRQUNLO3dCQUNGLEtBQUssRUFBRSwwQkFBMEI7d0JBQ2pDLCtCQUErQixFQUFFLFFBQVE7d0JBQ3pDLDhCQUE4QixFQUFFLE9BQU87d0JBQ3ZDLDhCQUE4QixFQUFFLHdCQUF3QjtxQkFDM0QsYUFDVSxDQUFDLHVCQUF1QixDQUFDLG1CQUNuQix1QkFBdUIsQ0FBQyxNQUFNLGlCQUNoQyxpQkFBaUIsQ0FBQyxJQUFJOzswQkE4cEJ4QixNQUFNOzJCQUFDLFFBQVE7d01BdHBCbkIsS0FBSztzQkFBYixLQUFLO2dCQUtHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBS0csVUFBVTtzQkFBbEIsS0FBSztnQkFLRyxPQUFPO3NCQUFmLEtBQUs7Z0JBS0csSUFBSTtzQkFBWixLQUFLO2dCQUtHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBS0csV0FBVztzQkFBbkIsS0FBSztnQkFLRyxjQUFjO3NCQUF0QixLQUFLO2dCQUtHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBTUcsYUFBYTtzQkFBckIsS0FBSztnQkFLRyxRQUFRO3NCQUFoQixLQUFLO2dCQUtHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBS0csaUJBQWlCO3NCQUF6QixLQUFLO2dCQUtHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBS0csTUFBTTtzQkFBZCxLQUFLO2dCQUtHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBS0csaUJBQWlCO3NCQUF6QixLQUFLO2dCQUtHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBS0csSUFBSTtzQkFBWixLQUFLO2dCQUtHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBS0csYUFBYTtzQkFBckIsS0FBSztnQkFLRyxlQUFlO3NCQUF2QixLQUFLO2dCQU1HLGNBQWM7c0JBQXRCLEtBQUs7Z0JBTUcsYUFBYTtzQkFBckIsS0FBSztnQkFLRyxVQUFVO3NCQUFsQixLQUFLO2dCQUtHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBS0csUUFBUTtzQkFBaEIsS0FBSztnQkFLRyxVQUFVO3NCQUFsQixLQUFLO2dCQUtHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBS0csV0FBVztzQkFBbkIsS0FBSztnQkFLRyxRQUFRO3NCQUFoQixLQUFLO2dCQUtHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBS0csUUFBUTtzQkFBaEIsS0FBSztnQkFLRyxTQUFTO3NCQUFqQixLQUFLO2dCQUtHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBS0csYUFBYTtzQkFBckIsS0FBSztnQkFLRyxZQUFZO3NCQUFwQixLQUFLO2dCQUtHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBS0cscUJBQXFCO3NCQUE3QixLQUFLO2dCQUtHLHFCQUFxQjtzQkFBN0IsS0FBSztnQkFLRyxVQUFVO3NCQUFsQixLQUFLO2dCQUtHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBS0csZUFBZTtzQkFBdkIsS0FBSztnQkFLRyxVQUFVO3NCQUFsQixLQUFLO2dCQUtHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBS0csb0JBQW9CO3NCQUE1QixLQUFLO2dCQUtHLE9BQU87c0JBQWYsS0FBSztnQkFLRyxhQUFhO3NCQUFyQixLQUFLO2dCQUtHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBS0cscUJBQXFCO3NCQUE3QixLQUFLO2dCQUtHLHFCQUFxQjtzQkFBN0IsS0FBSztnQkFLRyxRQUFRO3NCQUFoQixLQUFLO2dCQUtPLE9BQU87c0JBQW5CLEtBQUs7Z0JBY08sT0FBTztzQkFBbkIsS0FBSztnQkFjTyxhQUFhO3NCQUF6QixLQUFLO2dCQWFPLFlBQVk7c0JBQXhCLEtBQUs7Z0JBZU8sU0FBUztzQkFBckIsS0FBSztnQkFrQk8sUUFBUTtzQkFBcEIsS0FBSztnQkFlTyxpQkFBaUI7c0JBQTdCLEtBQUs7Z0JBYU8sY0FBYztzQkFBMUIsS0FBSztnQkFhTyxjQUFjO3NCQUExQixLQUFLO2dCQWFPLE1BQU07c0JBQWxCLEtBQUs7Z0JBT08sSUFBSTtzQkFBaEIsS0FBSztnQkFXTyxXQUFXO3NCQUF2QixLQUFLO2dCQW1CSSxPQUFPO3NCQUFoQixNQUFNO2dCQU1HLE1BQU07c0JBQWYsTUFBTTtnQkFNRyxPQUFPO3NCQUFoQixNQUFNO2dCQU1HLFFBQVE7c0JBQWpCLE1BQU07Z0JBS0csT0FBTztzQkFBaEIsTUFBTTtnQkFNRyxPQUFPO3NCQUFoQixNQUFNO2dCQU1HLFlBQVk7c0JBQXJCLE1BQU07Z0JBTUcsWUFBWTtzQkFBckIsTUFBTTtnQkFNRyxhQUFhO3NCQUF0QixNQUFNO2dCQU1HLFlBQVk7c0JBQXJCLE1BQU07Z0JBS0csY0FBYztzQkFBdkIsTUFBTTtnQkFLRyxNQUFNO3NCQUFmLE1BQU07Z0JBRXlCLFNBQVM7c0JBQXhDLGVBQWU7dUJBQUMsYUFBYTtnQkFFYSxrQkFBa0I7c0JBQTVELFNBQVM7dUJBQUMsV0FBVyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtnQkFFRyxtQkFBbUI7c0JBQTlELFNBQVM7dUJBQUMsWUFBWSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtnQkFFVSxPQUFPO3NCQUExRCxTQUFTO3VCQUFDLGdCQUFnQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTs7QUF1Z0ZsRCxNQUFNLE9BQU8sY0FBYzt1R0FBZCxjQUFjO3dHQUFkLGNBQWMsaUJBLy9GZCxRQUFRLGFBMi9GUCxZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLFlBQVksYUEzL0ZuSixRQUFRLEVBNC9GRyxZQUFZLEVBQUUsWUFBWTt3R0FHckMsY0FBYyxZQUpiLFlBQVksRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUN4SSxZQUFZLEVBQUUsWUFBWTs7MkZBR3JDLGNBQWM7a0JBTDFCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxZQUFZLENBQUM7b0JBQzdKLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxZQUFZLEVBQUUsWUFBWSxDQUFDO29CQUMvQyxZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUM7aUJBQzNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYW5pbWF0ZSwgQW5pbWF0aW9uRXZlbnQsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlLCBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgTmdNb2R1bGUsXG4gICAgTmdab25lLFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgT3V0cHV0LFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBSZW5kZXJlcjIsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgT3ZlcmxheVNlcnZpY2UsIFByaW1lTkdDb25maWcsIFByaW1lVGVtcGxhdGUsIFNoYXJlZE1vZHVsZSwgVHJhbnNsYXRpb25LZXlzIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgQnV0dG9uTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9idXR0b24nO1xuaW1wb3J0IHsgQ29ubmVjdGVkT3ZlcmxheVNjcm9sbEhhbmRsZXIsIERvbUhhbmRsZXIgfSBmcm9tICdwcmltZW5nL2RvbSc7XG5pbXBvcnQgeyBSaXBwbGVNb2R1bGUgfSBmcm9tICdwcmltZW5nL3JpcHBsZSc7XG5pbXBvcnQgeyBPYmplY3RVdGlscywgVW5pcXVlQ29tcG9uZW50SWQsIFpJbmRleFV0aWxzIH0gZnJvbSAncHJpbWVuZy91dGlscyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENoZXZyb25MZWZ0SWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvY2hldnJvbmxlZnQnO1xuaW1wb3J0IHsgQ2hldnJvblJpZ2h0SWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvY2hldnJvbnJpZ2h0JztcbmltcG9ydCB7IENoZXZyb25VcEljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL2NoZXZyb251cCc7XG5pbXBvcnQgeyBDaGV2cm9uRG93bkljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL2NoZXZyb25kb3duJztcbmltcG9ydCB7IFRpbWVzSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvdGltZXMnO1xuaW1wb3J0IHsgQ2FsZW5kYXJJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9jYWxlbmRhcic7XG5pbXBvcnQgeyBOdWxsYWJsZSwgVm9pZExpc3RlbmVyIH0gZnJvbSAncHJpbWVuZy90cy1oZWxwZXJzJztcbmltcG9ydCB7IE5hdmlnYXRpb25TdGF0ZSwgQ2FsZW5kYXJSZXNwb25zaXZlT3B0aW9ucywgQ2FsZW5kYXJUeXBlVmlldywgTG9jYWxlU2V0dGluZ3MsIE1vbnRoLCBDYWxlbmRhck1vbnRoQ2hhbmdlRXZlbnQsIENhbGVuZGFyWWVhckNoYW5nZUV2ZW50IH0gZnJvbSAnLi9jYWxlbmRhci5pbnRlcmZhY2UnO1xuXG5leHBvcnQgY29uc3QgQ0FMRU5EQVJfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBDYWxlbmRhciksXG4gICAgbXVsdGk6IHRydWVcbn07XG4vKipcbiAqIENhbGVuZGFyIGFsc28ga25vd24gYXMgRGF0ZVBpY2tlciwgaXMgYSBmb3JtIGNvbXBvbmVudCB0byB3b3JrIHdpdGggZGF0ZXMuXG4gKiBAZ3JvdXAgQ29tcG9uZW50c1xuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtY2FsZW5kYXInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxzcGFuICNjb250YWluZXIgW25nQ2xhc3NdPVwieyAncC1jYWxlbmRhcic6IHRydWUsICdwLWNhbGVuZGFyLXctYnRuJzogc2hvd0ljb24sICdwLWNhbGVuZGFyLXRpbWVvbmx5JzogdGltZU9ubHksICdwLWNhbGVuZGFyLWRpc2FibGVkJzogZGlzYWJsZWQsICdwLWZvY3VzJzogZm9jdXMgfHwgb3ZlcmxheVZpc2libGUgfVwiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCIhaW5saW5lXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICNpbnB1dGZpZWxkXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgcm9sZT1cImNvbWJvYm94XCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuaWRdPVwiaW5wdXRJZFwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLm5hbWVdPVwibmFtZVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLnJlcXVpcmVkXT1cInJlcXVpcmVkXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1yZXF1aXJlZF09XCJyZXF1aXJlZFwiXG4gICAgICAgICAgICAgICAgICAgIGFyaWEtYXV0b2NvbXBsZXRlPVwibm9uZVwiXG4gICAgICAgICAgICAgICAgICAgIGFyaWEtaGFzcG9wdXA9XCJkaWFsb2dcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cIm92ZXJsYXlWaXNpYmxlXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1jb250cm9sc109XCJwYW5lbElkXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cImFyaWFMYWJlbGxlZEJ5XCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhTGFiZWxcIlxuICAgICAgICAgICAgICAgICAgICBbdmFsdWVdPVwiaW5wdXRGaWVsZFZhbHVlXCJcbiAgICAgICAgICAgICAgICAgICAgKGZvY3VzKT1cIm9uSW5wdXRGb2N1cygkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25JbnB1dEtleWRvd24oJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbklucHV0Q2xpY2soKVwiXG4gICAgICAgICAgICAgICAgICAgIChibHVyKT1cIm9uSW5wdXRCbHVyKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICBbcmVhZG9ubHldPVwicmVhZG9ubHlJbnB1dFwiXG4gICAgICAgICAgICAgICAgICAgIChpbnB1dCk9XCJvblVzZXJJbnB1dCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgW25nU3R5bGVdPVwiaW5wdXRTdHlsZVwiXG4gICAgICAgICAgICAgICAgICAgIFtjbGFzc109XCJpbnB1dFN0eWxlQ2xhc3NcIlxuICAgICAgICAgICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXIgfHwgJydcIlxuICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCJ0YWJpbmRleFwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmlucHV0bW9kZV09XCJ0b3VjaFVJID8gJ29mZicgOiBudWxsXCJcbiAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiJ3AtaW5wdXR0ZXh0IHAtY29tcG9uZW50J1wiXG4gICAgICAgICAgICAgICAgICAgIGF1dG9jb21wbGV0ZT1cIm9mZlwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwic2hvd0NsZWFyICYmICFkaXNhYmxlZCAmJiB2YWx1ZSAhPSBudWxsXCI+XG4gICAgICAgICAgICAgICAgICAgIDxUaW1lc0ljb24gKm5nSWY9XCIhY2xlYXJJY29uVGVtcGxhdGVcIiBbc3R5bGVDbGFzc109XCIncC1jYWxlbmRhci1jbGVhci1pY29uJ1wiIChjbGljayk9XCJjbGVhcigpXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJjbGVhckljb25UZW1wbGF0ZVwiIGNsYXNzPVwicC1jYWxlbmRhci1jbGVhci1pY29uXCIgKGNsaWNrKT1cImNsZWFyKClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cImNsZWFySWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiaWNvbkJ1dHRvbkFyaWFMYWJlbFwiXG4gICAgICAgICAgICAgICAgICAgIGFyaWEtaGFzcG9wdXA9XCJkaWFsb2dcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cIm92ZXJsYXlWaXNpYmxlXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1jb250cm9sc109XCJwYW5lbElkXCJcbiAgICAgICAgICAgICAgICAgICAgcEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBwUmlwcGxlXG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwic2hvd0ljb25cIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25CdXR0b25DbGljaygkZXZlbnQsIGlucHV0ZmllbGQpXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLWRhdGVwaWNrZXItdHJpZ2dlciBwLWJ1dHRvbi1pY29uLW9ubHlcIlxuICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgICAgICB0YWJpbmRleD1cIjBcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJpY29uXCIgW25nQ2xhc3NdPVwiaWNvblwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFpY29uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Q2FsZW5kYXJJY29uICpuZ0lmPVwiIXRyaWdnZXJJY29uVGVtcGxhdGVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwidHJpZ2dlckljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAjY29udGVudFdyYXBwZXJcbiAgICAgICAgICAgICAgICBbY2xhc3NdPVwicGFuZWxTdHlsZUNsYXNzXCJcbiAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJwYW5lbFN0eWxlXCJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7XG4gICAgICAgICAgICAgICAgICAgICdwLWRhdGVwaWNrZXIgcC1jb21wb25lbnQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAncC1kYXRlcGlja2VyLWlubGluZSc6IGlubGluZSxcbiAgICAgICAgICAgICAgICAgICAgJ3AtZGlzYWJsZWQnOiBkaXNhYmxlZCxcbiAgICAgICAgICAgICAgICAgICAgJ3AtZGF0ZXBpY2tlci10aW1lb25seSc6IHRpbWVPbmx5LFxuICAgICAgICAgICAgICAgICAgICAncC1kYXRlcGlja2VyLW11bHRpcGxlLW1vbnRoJzogdGhpcy5udW1iZXJPZk1vbnRocyA+IDEsXG4gICAgICAgICAgICAgICAgICAgICdwLWRhdGVwaWNrZXItbW9udGhwaWNrZXInOiB2aWV3ID09PSAnbW9udGgnLFxuICAgICAgICAgICAgICAgICAgICAncC1kYXRlcGlja2VyLXRvdWNoLXVpJzogdG91Y2hVSVxuICAgICAgICAgICAgICAgIH1cIlxuICAgICAgICAgICAgICAgIFtAb3ZlcmxheUFuaW1hdGlvbl09XCJcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hVSVxuICAgICAgICAgICAgICAgICAgICAgICAgPyB7IHZhbHVlOiAndmlzaWJsZVRvdWNoVUknLCBwYXJhbXM6IHsgc2hvd1RyYW5zaXRpb25QYXJhbXM6IHNob3dUcmFuc2l0aW9uT3B0aW9ucywgaGlkZVRyYW5zaXRpb25QYXJhbXM6IGhpZGVUcmFuc2l0aW9uT3B0aW9ucyB9IH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDogeyB2YWx1ZTogJ3Zpc2libGUnLCBwYXJhbXM6IHsgc2hvd1RyYW5zaXRpb25QYXJhbXM6IHNob3dUcmFuc2l0aW9uT3B0aW9ucywgaGlkZVRyYW5zaXRpb25QYXJhbXM6IGhpZGVUcmFuc2l0aW9uT3B0aW9ucyB9IH1cbiAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiZ2V0VHJhbnNsYXRpb24oJ2Nob29zZURhdGUnKVwiXG4gICAgICAgICAgICAgICAgW2F0dHIucm9sZV09XCJpbmxpbmUgPyBudWxsIDogJ2RpYWxvZydcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbW9kYWxdPVwiaW5saW5lID8gbnVsbCA6ICd0cnVlJ1wiXG4gICAgICAgICAgICAgICAgW0AuZGlzYWJsZWRdPVwiaW5saW5lID09PSB0cnVlXCJcbiAgICAgICAgICAgICAgICAoQG92ZXJsYXlBbmltYXRpb24uc3RhcnQpPVwib25PdmVybGF5QW5pbWF0aW9uU3RhcnQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKEBvdmVybGF5QW5pbWF0aW9uLmRvbmUpPVwib25PdmVybGF5QW5pbWF0aW9uRG9uZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwib25PdmVybGF5Q2xpY2soJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKm5nSWY9XCJpbmxpbmUgfHwgb3ZlcmxheVZpc2libGVcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInAtaGVhZGVyXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJoZWFkZXJUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhdGltZU9ubHlcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtZGF0ZXBpY2tlci1ncm91cC1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLWRhdGVwaWNrZXItZ3JvdXBcIiAqbmdGb3I9XCJsZXQgbW9udGggb2YgbW9udGhzOyBsZXQgaSA9IGluZGV4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtZGF0ZXBpY2tlci1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiAoa2V5ZG93bik9XCJvbkNvbnRhaW5lckJ1dHRvbktleWRvd24oJGV2ZW50KVwiIGNsYXNzPVwicC1kYXRlcGlja2VyLXByZXYgcC1saW5rXCIgKGNsaWNrKT1cIm9uUHJldkJ1dHRvbkNsaWNrKCRldmVudClcIiAqbmdJZj1cImkgPT09IDBcIiB0eXBlPVwiYnV0dG9uXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJwcmV2SWNvbkFyaWFMYWJlbFwiIHBSaXBwbGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2hldnJvbkxlZnRJY29uIFtzdHlsZUNsYXNzXT1cIidwLWRhdGVwaWNrZXItcHJldi1pY29uJ1wiICpuZ0lmPVwiIXByZXZpb3VzSWNvblRlbXBsYXRlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwicHJldmlvdXNJY29uVGVtcGxhdGVcIiBjbGFzcz1cInAtZGF0ZXBpY2tlci1wcmV2LWljb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJwcmV2aW91c0ljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1kYXRlcGlja2VyLXRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInN3aXRjaFRvTW9udGhWaWV3KCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChrZXlkb3duKT1cIm9uQ29udGFpbmVyQnV0dG9uS2V5ZG93bigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImN1cnJlbnRWaWV3ID09PSAnZGF0ZSdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1kYXRlcGlja2VyLW1vbnRoIHAtbGlua1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cInN3aXRjaFZpZXdCdXR0b25EaXNhYmxlZCgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cInRoaXMuZ2V0VHJhbnNsYXRpb24oJ2Nob29zZU1vbnRoJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IGdldE1vbnRoTmFtZShtb250aC5tb250aCkgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJzd2l0Y2hUb1llYXJWaWV3KCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChrZXlkb3duKT1cIm9uQ29udGFpbmVyQnV0dG9uS2V5ZG93bigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImN1cnJlbnRWaWV3ICE9PSAneWVhcidcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1kYXRlcGlja2VyLXllYXIgcC1saW5rXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwic3dpdGNoVmlld0J1dHRvbkRpc2FibGVkKClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiZ2V0VHJhbnNsYXRpb24oJ2Nob29zZVllYXInKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgZ2V0WWVhcihtb250aCkgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLWRhdGVwaWNrZXItZGVjYWRlXCIgKm5nSWY9XCJjdXJyZW50VmlldyA9PT0gJ3llYXInXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFkZWNhZGVUZW1wbGF0ZVwiPnt7IHllYXJQaWNrZXJWYWx1ZXMoKVswXSB9fSAtIHt7IHllYXJQaWNrZXJWYWx1ZXMoKVt5ZWFyUGlja2VyVmFsdWVzKCkubGVuZ3RoIC0gMV0gfX08L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZGVjYWRlVGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiB5ZWFyUGlja2VyVmFsdWVzIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChrZXlkb3duKT1cIm9uQ29udGFpbmVyQnV0dG9uS2V5ZG93bigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1kYXRlcGlja2VyLW5leHQgcC1saW5rXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbk5leHRCdXR0b25DbGljaygkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZS5kaXNwbGF5XT1cIm51bWJlck9mTW9udGhzID09PSAxID8gJ2lubGluZS1mbGV4JyA6IGkgPT09IG51bWJlck9mTW9udGhzIC0gMSA/ICdpbmxpbmUtZmxleCcgOiAnbm9uZSdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIm5leHRJY29uQXJpYUxhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBSaXBwbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPENoZXZyb25SaWdodEljb24gW3N0eWxlQ2xhc3NdPVwiJ3AtZGF0ZXBpY2tlci1uZXh0LWljb24nXCIgKm5nSWY9XCIhbmV4dEljb25UZW1wbGF0ZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cIm5leHRJY29uVGVtcGxhdGVcIiBjbGFzcz1cInAtZGF0ZXBpY2tlci1uZXh0LWljb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJuZXh0SWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtZGF0ZXBpY2tlci1jYWxlbmRhci1jb250YWluZXJcIiAqbmdJZj1cImN1cnJlbnRWaWV3ID09PSAnZGF0ZSdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzPVwicC1kYXRlcGlja2VyLWNhbGVuZGFyXCIgcm9sZT1cImdyaWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCAqbmdJZj1cInNob3dXZWVrXCIgY2xhc3M9XCJwLWRhdGVwaWNrZXItd2Vla2hlYWRlciBwLWRpc2FibGVkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57eyBnZXRUcmFuc2xhdGlvbignd2Vla0hlYWRlcicpIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggc2NvcGU9XCJjb2xcIiAqbmdGb3I9XCJsZXQgd2Vla0RheSBvZiB3ZWVrRGF5czsgbGV0IGJlZ2luID0gZmlyc3Q7IGxldCBlbmQgPSBsYXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57eyB3ZWVrRGF5IH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ciAqbmdGb3I9XCJsZXQgd2VlayBvZiBtb250aC5kYXRlczsgbGV0IGogPSBpbmRleFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgKm5nSWY9XCJzaG93V2Vla1wiIGNsYXNzPVwicC1kYXRlcGlja2VyLXdlZWtudW1iZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1kaXNhYmxlZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IG1vbnRoLndlZWtOdW1iZXJzW2pdIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCAqbmdGb3I9XCJsZXQgZGF0ZSBvZiB3ZWVrXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJkYXRlLmRheVwiIFtuZ0NsYXNzXT1cInsgJ3AtZGF0ZXBpY2tlci1vdGhlci1tb250aCc6IGRhdGUub3RoZXJNb250aCwgJ3AtZGF0ZXBpY2tlci10b2RheSc6IGRhdGUudG9kYXkgfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImRhdGUub3RoZXJNb250aCA/IHNob3dPdGhlck1vbnRocyA6IHRydWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLWhpZ2hsaWdodCc6IGlzU2VsZWN0ZWQoZGF0ZSkgJiYgZGF0ZS5zZWxlY3RhYmxlLCAncC1kaXNhYmxlZCc6ICFkYXRlLnNlbGVjdGFibGUgfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkRhdGVTZWxlY3QoJGV2ZW50LCBkYXRlKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyYWdnYWJsZT1cImZhbHNlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25EYXRlQ2VsbEtleWRvd24oJGV2ZW50LCBkYXRlLCBpKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBSaXBwbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhZGF0ZVRlbXBsYXRlICYmIChkYXRlLnNlbGVjdGFibGUgfHwgIWRpc2FibGVkRGF0ZVRlbXBsYXRlKVwiPnt7IGRhdGUuZGF5IH19PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJkYXRlLnNlbGVjdGFibGUgfHwgIWRpc2FibGVkRGF0ZVRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZGF0ZVRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogZGF0ZSB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWRhdGUuc2VsZWN0YWJsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImRpc2FibGVkRGF0ZVRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogZGF0ZSB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiaXNTZWxlY3RlZChkYXRlKVwiIGNsYXNzPVwicC1oaWRkZW4tYWNjZXNzaWJsZVwiIGFyaWEtbGl2ZT1cInBvbGl0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBkYXRlLmRheSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLW1vbnRocGlja2VyXCIgKm5nSWY9XCJjdXJyZW50VmlldyA9PT0gJ21vbnRoJ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgbSBvZiBtb250aFBpY2tlclZhbHVlcygpOyBsZXQgaSA9IGluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25Nb250aFNlbGVjdCgkZXZlbnQsIGkpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoa2V5ZG93bik9XCJvbk1vbnRoQ2VsbEtleWRvd24oJGV2ZW50LCBpKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLW1vbnRocGlja2VyLW1vbnRoXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLWhpZ2hsaWdodCc6IGlzTW9udGhTZWxlY3RlZChpKSwgJ3AtZGlzYWJsZWQnOiBpc01vbnRoRGlzYWJsZWQoaSkgfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcFJpcHBsZVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IG0gfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiaXNNb250aFNlbGVjdGVkKGkpXCIgY2xhc3M9XCJwLWhpZGRlbi1hY2Nlc3NpYmxlXCIgYXJpYS1saXZlPVwicG9saXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IG0gfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXllYXJwaWNrZXJcIiAqbmdJZj1cImN1cnJlbnRWaWV3ID09PSAneWVhcidcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IHkgb2YgeWVhclBpY2tlclZhbHVlcygpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25ZZWFyU2VsZWN0KCRldmVudCwgeSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChrZXlkb3duKT1cIm9uWWVhckNlbGxLZXlkb3duKCRldmVudCwgeSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC15ZWFycGlja2VyLXllYXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3AtaGlnaGxpZ2h0JzogaXNZZWFyU2VsZWN0ZWQoeSksICdwLWRpc2FibGVkJzogaXNZZWFyRGlzYWJsZWQoeSkgfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcFJpcHBsZVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IHkgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiaXNZZWFyU2VsZWN0ZWQoeSlcIiBjbGFzcz1cInAtaGlkZGVuLWFjY2Vzc2libGVcIiBhcmlhLWxpdmU9XCJwb2xpdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgeSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC10aW1lcGlja2VyXCIgKm5nSWY9XCIoc2hvd1RpbWUgfHwgdGltZU9ubHkpICYmIGN1cnJlbnRWaWV3ID09PSAnZGF0ZSdcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtaG91ci1waWNrZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInAtbGlua1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25Db250YWluZXJCdXR0b25LZXlkb3duKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChrZXlkb3duLmVudGVyKT1cImluY3JlbWVudEhvdXIoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleWRvd24uc3BhY2UpPVwiaW5jcmVtZW50SG91cigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAobW91c2Vkb3duKT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZURvd24oJGV2ZW50LCAwLCAxKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKG1vdXNldXApPVwib25UaW1lUGlja2VyRWxlbWVudE1vdXNlVXAoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleXVwLmVudGVyKT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZVVwKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChrZXl1cC5zcGFjZSk9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VVcCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAobW91c2VsZWF2ZSk9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VMZWF2ZSgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImdldFRyYW5zbGF0aW9uKCduZXh0SG91cicpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwUmlwcGxlXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPENoZXZyb25VcEljb24gKm5nSWY9XCIhaW5jcmVtZW50SWNvblRlbXBsYXRlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpbmNyZW1lbnRJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj48bmctY29udGFpbmVyICpuZ0lmPVwiY3VycmVudEhvdXIgPCAxMFwiPjA8L25nLWNvbnRhaW5lcj57eyBjdXJyZW50SG91ciB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInAtbGlua1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25Db250YWluZXJCdXR0b25LZXlkb3duKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChrZXlkb3duLmVudGVyKT1cImRlY3JlbWVudEhvdXIoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleWRvd24uc3BhY2UpPVwiZGVjcmVtZW50SG91cigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAobW91c2Vkb3duKT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZURvd24oJGV2ZW50LCAwLCAtMSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChtb3VzZXVwKT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZVVwKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChrZXl1cC5lbnRlcik9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VVcCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoa2V5dXAuc3BhY2UpPVwib25UaW1lUGlja2VyRWxlbWVudE1vdXNlVXAoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKG1vdXNlbGVhdmUpPVwib25UaW1lUGlja2VyRWxlbWVudE1vdXNlTGVhdmUoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJnZXRUcmFuc2xhdGlvbigncHJldkhvdXInKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcFJpcHBsZVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDaGV2cm9uRG93bkljb24gKm5nSWY9XCIhZGVjcmVtZW50SWNvblRlbXBsYXRlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJkZWNyZW1lbnRJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1zZXBhcmF0b3JcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7IHRpbWVTZXBhcmF0b3IgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1taW51dGUtcGlja2VyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLWxpbmtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChrZXlkb3duKT1cIm9uQ29udGFpbmVyQnV0dG9uS2V5ZG93bigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoa2V5ZG93bi5lbnRlcik9XCJpbmNyZW1lbnRNaW51dGUoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleWRvd24uc3BhY2UpPVwiaW5jcmVtZW50TWludXRlKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChtb3VzZWRvd24pPVwib25UaW1lUGlja2VyRWxlbWVudE1vdXNlRG93bigkZXZlbnQsIDEsIDEpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAobW91c2V1cCk9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VVcCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoa2V5dXAuZW50ZXIpPVwib25UaW1lUGlja2VyRWxlbWVudE1vdXNlVXAoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleXVwLnNwYWNlKT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZVVwKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChtb3VzZWxlYXZlKT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZUxlYXZlKClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiZ2V0VHJhbnNsYXRpb24oJ25leHRNaW51dGUnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcFJpcHBsZVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDaGV2cm9uVXBJY29uICpuZ0lmPVwiIWluY3JlbWVudEljb25UZW1wbGF0ZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwiaW5jcmVtZW50SWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+PG5nLWNvbnRhaW5lciAqbmdJZj1cImN1cnJlbnRNaW51dGUgPCAxMFwiPjA8L25nLWNvbnRhaW5lcj57eyBjdXJyZW50TWludXRlIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1saW5rXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoa2V5ZG93bik9XCJvbkNvbnRhaW5lckJ1dHRvbktleWRvd24oJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleWRvd24uZW50ZXIpPVwiZGVjcmVtZW50TWludXRlKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChrZXlkb3duLnNwYWNlKT1cImRlY3JlbWVudE1pbnV0ZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAobW91c2Vkb3duKT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZURvd24oJGV2ZW50LCAxLCAtMSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChtb3VzZXVwKT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZVVwKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChrZXl1cC5lbnRlcik9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VVcCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoa2V5dXAuc3BhY2UpPVwib25UaW1lUGlja2VyRWxlbWVudE1vdXNlVXAoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKG1vdXNlbGVhdmUpPVwib25UaW1lUGlja2VyRWxlbWVudE1vdXNlTGVhdmUoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJnZXRUcmFuc2xhdGlvbigncHJldk1pbnV0ZScpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwUmlwcGxlXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPENoZXZyb25Eb3duSWNvbiAqbmdJZj1cIiFkZWNyZW1lbnRJY29uVGVtcGxhdGVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cImRlY3JlbWVudEljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXNlcGFyYXRvclwiICpuZ0lmPVwic2hvd1NlY29uZHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7IHRpbWVTZXBhcmF0b3IgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1zZWNvbmQtcGlja2VyXCIgKm5nSWY9XCJzaG93U2Vjb25kc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1saW5rXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoa2V5ZG93bik9XCJvbkNvbnRhaW5lckJ1dHRvbktleWRvd24oJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleWRvd24uZW50ZXIpPVwiaW5jcmVtZW50U2Vjb25kKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChrZXlkb3duLnNwYWNlKT1cImluY3JlbWVudFNlY29uZCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAobW91c2Vkb3duKT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZURvd24oJGV2ZW50LCAyLCAxKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKG1vdXNldXApPVwib25UaW1lUGlja2VyRWxlbWVudE1vdXNlVXAoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleXVwLmVudGVyKT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZVVwKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChrZXl1cC5zcGFjZSk9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VVcCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAobW91c2VsZWF2ZSk9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VMZWF2ZSgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImdldFRyYW5zbGF0aW9uKCduZXh0U2Vjb25kJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBSaXBwbGVcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2hldnJvblVwSWNvbiAqbmdJZj1cIiFpbmNyZW1lbnRJY29uVGVtcGxhdGVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cImluY3JlbWVudEljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPjxuZy1jb250YWluZXIgKm5nSWY9XCJjdXJyZW50U2Vjb25kIDwgMTBcIj4wPC9uZy1jb250YWluZXI+e3sgY3VycmVudFNlY29uZCB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInAtbGlua1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25Db250YWluZXJCdXR0b25LZXlkb3duKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChrZXlkb3duLmVudGVyKT1cImRlY3JlbWVudFNlY29uZCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoa2V5ZG93bi5zcGFjZSk9XCJkZWNyZW1lbnRTZWNvbmQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKG1vdXNlZG93bik9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VEb3duKCRldmVudCwgMiwgLTEpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAobW91c2V1cCk9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VVcCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoa2V5dXAuZW50ZXIpPVwib25UaW1lUGlja2VyRWxlbWVudE1vdXNlVXAoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleXVwLnNwYWNlKT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZVVwKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChtb3VzZWxlYXZlKT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZUxlYXZlKClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiZ2V0VHJhbnNsYXRpb24oJ3ByZXZTZWNvbmQnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcFJpcHBsZVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDaGV2cm9uRG93bkljb24gKm5nSWY9XCIhZGVjcmVtZW50SWNvblRlbXBsYXRlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJkZWNyZW1lbnRJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1hbXBtLXBpY2tlclwiICpuZ0lmPVwiaG91ckZvcm1hdCA9PSAnMTInXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicC1saW5rXCIgdHlwZT1cImJ1dHRvblwiIChrZXlkb3duKT1cIm9uQ29udGFpbmVyQnV0dG9uS2V5ZG93bigkZXZlbnQpXCIgKGNsaWNrKT1cInRvZ2dsZUFNUE0oJGV2ZW50KVwiIChrZXlkb3duLmVudGVyKT1cInRvZ2dsZUFNUE0oJGV2ZW50KVwiIFthdHRyLmFyaWEtbGFiZWxdPVwiZ2V0VHJhbnNsYXRpb24oJ2FtJylcIiBwUmlwcGxlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDaGV2cm9uVXBJY29uICpuZ0lmPVwiIWluY3JlbWVudEljb25UZW1wbGF0ZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwiaW5jcmVtZW50SWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3sgcG0gPyAnUE0nIDogJ0FNJyB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJwLWxpbmtcIiB0eXBlPVwiYnV0dG9uXCIgKGtleWRvd24pPVwib25Db250YWluZXJCdXR0b25LZXlkb3duKCRldmVudClcIiAoY2xpY2spPVwidG9nZ2xlQU1QTSgkZXZlbnQpXCIgKGtleWRvd24uZW50ZXIpPVwidG9nZ2xlQU1QTSgkZXZlbnQpXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJnZXRUcmFuc2xhdGlvbigncG0nKVwiIHBSaXBwbGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPENoZXZyb25Eb3duSWNvbiAqbmdJZj1cIiFkZWNyZW1lbnRJY29uVGVtcGxhdGVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cImRlY3JlbWVudEljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtZGF0ZXBpY2tlci1idXR0b25iYXJcIiAqbmdJZj1cInNob3dCdXR0b25CYXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgW2xhYmVsXT1cImdldFRyYW5zbGF0aW9uKCd0b2RheScpXCIgKGtleWRvd24pPVwib25Db250YWluZXJCdXR0b25LZXlkb3duKCRldmVudClcIiAoY2xpY2spPVwib25Ub2RheUJ1dHRvbkNsaWNrKCRldmVudClcIiBwQnV0dG9uIHBSaXBwbGUgW25nQ2xhc3NdPVwiW3RvZGF5QnV0dG9uU3R5bGVDbGFzc11cIj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgW2xhYmVsXT1cImdldFRyYW5zbGF0aW9uKCdjbGVhcicpXCIgKGtleWRvd24pPVwib25Db250YWluZXJCdXR0b25LZXlkb3duKCRldmVudClcIiAoY2xpY2spPVwib25DbGVhckJ1dHRvbkNsaWNrKCRldmVudClcIiBwQnV0dG9uIHBSaXBwbGUgW25nQ2xhc3NdPVwiW2NsZWFyQnV0dG9uU3R5bGVDbGFzc11cIj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJwLWZvb3RlclwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZm9vdGVyVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3NwYW4+XG4gICAgYCxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIHRyaWdnZXIoJ292ZXJsYXlBbmltYXRpb24nLCBbXG4gICAgICAgICAgICBzdGF0ZShcbiAgICAgICAgICAgICAgICAndmlzaWJsZVRvdWNoVUknLFxuICAgICAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlKC01MCUsLTUwJSknLFxuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IHZpc2libGUnLCBbc3R5bGUoeyBvcGFjaXR5OiAwLCB0cmFuc2Zvcm06ICdzY2FsZVkoMC44KScgfSksIGFuaW1hdGUoJ3t7c2hvd1RyYW5zaXRpb25QYXJhbXN9fScsIHN0eWxlKHsgb3BhY2l0eTogMSwgdHJhbnNmb3JtOiAnKicgfSkpXSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2aXNpYmxlID0+IHZvaWQnLCBbYW5pbWF0ZSgne3toaWRlVHJhbnNpdGlvblBhcmFtc319Jywgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKV0pLFxuICAgICAgICAgICAgdHJhbnNpdGlvbigndm9pZCA9PiB2aXNpYmxlVG91Y2hVSScsIFtzdHlsZSh7IG9wYWNpdHk6IDAsIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKC01MCUsIC00MCUsIDApIHNjYWxlKDAuOSknIH0pLCBhbmltYXRlKCd7e3Nob3dUcmFuc2l0aW9uUGFyYW1zfX0nKV0pLFxuICAgICAgICAgICAgdHJhbnNpdGlvbigndmlzaWJsZVRvdWNoVUkgPT4gdm9pZCcsIFtcbiAgICAgICAgICAgICAgICBhbmltYXRlKFxuICAgICAgICAgICAgICAgICAgICAne3toaWRlVHJhbnNpdGlvblBhcmFtc319JyxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKC01MCUsIC00MCUsIDApIHNjYWxlKDAuOSknXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgXSlcbiAgICBdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQgcC1pbnB1dHdyYXBwZXInLFxuICAgICAgICAnW2NsYXNzLnAtaW5wdXR3cmFwcGVyLWZpbGxlZF0nOiAnZmlsbGVkJyxcbiAgICAgICAgJ1tjbGFzcy5wLWlucHV0d3JhcHBlci1mb2N1c10nOiAnZm9jdXMnLFxuICAgICAgICAnW2NsYXNzLnAtY2FsZW5kYXItY2xlYXJhYmxlXSc6ICdzaG93Q2xlYXIgJiYgIWRpc2FibGVkJ1xuICAgIH0sXG4gICAgcHJvdmlkZXJzOiBbQ0FMRU5EQVJfVkFMVUVfQUNDRVNTT1JdLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vY2FsZW5kYXIuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXIgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICAgIC8qKlxuICAgICAqIElubGluZSBzdHlsZSBvZiB0aGUgY29tcG9uZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlOiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIElubGluZSBzdHlsZSBvZiB0aGUgaW5wdXQgZmllbGQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaW5wdXRTdHlsZTogeyBba2xhc3M6IHN0cmluZ106IGFueSB9IHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJZGVudGlmaWVyIG9mIHRoZSBmb2N1cyBpbnB1dCB0byBtYXRjaCBhIGxhYmVsIGRlZmluZWQgZm9yIHRoZSBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaW5wdXRJZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIE5hbWUgb2YgdGhlIGlucHV0IGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSBpbnB1dCBmaWVsZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBpbnB1dFN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBQbGFjZWhvbGRlciB0ZXh0IGZvciB0aGUgaW5wdXQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBFc3RhYmxpc2hlcyByZWxhdGlvbnNoaXBzIGJldHdlZW4gdGhlIGNvbXBvbmVudCBhbmQgbGFiZWwocykgd2hlcmUgaXRzIHZhbHVlIHNob3VsZCBiZSBvbmUgb3IgbW9yZSBlbGVtZW50IElEcy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBhcmlhTGFiZWxsZWRCeTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgYSBzdHJpbmcgdGhhdCBsYWJlbHMgdGhlIGlucHV0IGZvciBhY2Nlc3NpYmlsaXR5LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGFyaWFMYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBhIHN0cmluZyB0aGF0IGxhYmVscyB0aGUgaWNvbiBidXR0b24gZm9yIGFjY2Vzc2liaWxpdHkuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaWNvbkFyaWFMYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZW4gc3BlY2lmaWVkLCBkaXNhYmxlcyB0aGUgY29tcG9uZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEZvcm1hdCBvZiB0aGUgZGF0ZSB3aGljaCBjYW4gYWxzbyBiZSBkZWZpbmVkIGF0IGxvY2FsZSBzZXR0aW5ncy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBkYXRlRm9ybWF0OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU2VwYXJhdG9yIGZvciBtdWx0aXBsZSBzZWxlY3Rpb24gbW9kZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBtdWx0aXBsZVNlcGFyYXRvcjogc3RyaW5nID0gJywnO1xuICAgIC8qKlxuICAgICAqIFNlcGFyYXRvciBmb3Igam9pbmluZyBzdGFydCBhbmQgZW5kIGRhdGVzIG9uIHJhbmdlIHNlbGVjdGlvbiBtb2RlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHJhbmdlU2VwYXJhdG9yOiBzdHJpbmcgPSAnLSc7XG4gICAgLyoqXG4gICAgICogV2hlbiBlbmFibGVkLCBkaXNwbGF5cyB0aGUgY2FsZW5kYXIgYXMgaW5saW5lLiBEZWZhdWx0IGlzIGZhbHNlIGZvciBwb3B1cCBtb2RlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGlubGluZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gZGlzcGxheSBkYXRlcyBpbiBvdGhlciBtb250aHMgKG5vbi1zZWxlY3RhYmxlKSBhdCB0aGUgc3RhcnQgb3IgZW5kIG9mIHRoZSBjdXJyZW50IG1vbnRoLiBUbyBtYWtlIHRoZXNlIGRheXMgc2VsZWN0YWJsZSB1c2UgdGhlIHNlbGVjdE90aGVyTW9udGhzIG9wdGlvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzaG93T3RoZXJNb250aHM6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgZGF5cyBpbiBvdGhlciBtb250aHMgc2hvd24gYmVmb3JlIG9yIGFmdGVyIHRoZSBjdXJyZW50IG1vbnRoIGFyZSBzZWxlY3RhYmxlLiBUaGlzIG9ubHkgYXBwbGllcyBpZiB0aGUgc2hvd090aGVyTW9udGhzIG9wdGlvbiBpcyBzZXQgdG8gdHJ1ZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzZWxlY3RPdGhlck1vbnRoczogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGVuIGVuYWJsZWQsIGRpc3BsYXlzIGEgYnV0dG9uIHdpdGggaWNvbiBuZXh0IHRvIGlucHV0LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNob3dJY29uOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEljb24gb2YgdGhlIGNhbGVuZGFyIGJ1dHRvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBpY29uOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogVGFyZ2V0IGVsZW1lbnQgdG8gYXR0YWNoIHRoZSBvdmVybGF5LCB2YWxpZCB2YWx1ZXMgYXJlIFwiYm9keVwiIG9yIGEgbG9jYWwgbmctdGVtcGxhdGUgdmFyaWFibGUgb2YgYW5vdGhlciBlbGVtZW50IChub3RlOiB1c2UgYmluZGluZyB3aXRoIGJyYWNrZXRzIGZvciB0ZW1wbGF0ZSB2YXJpYWJsZXMsIGUuZy4gW2FwcGVuZFRvXT1cIm15ZGl2XCIgZm9yIGEgZGl2IGVsZW1lbnQgaGF2aW5nI215ZGl2IGFzIHZhcmlhYmxlIG5hbWUpLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGFwcGVuZFRvOiBIVE1MRWxlbWVudCB8IEVsZW1lbnRSZWYgfCBUZW1wbGF0ZVJlZjxhbnk+IHwgc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCB8IGFueTtcbiAgICAvKipcbiAgICAgKiBXaGVuIHNwZWNpZmllZCwgcHJldmVudHMgZW50ZXJpbmcgdGhlIGRhdGUgbWFudWFsbHkgd2l0aCBrZXlib2FyZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSByZWFkb25seUlucHV0OiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFRoZSBjdXRvZmYgeWVhciBmb3IgZGV0ZXJtaW5pbmcgdGhlIGNlbnR1cnkgZm9yIGEgZGF0ZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzaG9ydFllYXJDdXRvZmY6IGFueSA9ICcrMTAnO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIG1vbnRoIHNob3VsZCBiZSByZW5kZXJlZCBhcyBhIGRyb3Bkb3duIGluc3RlYWQgb2YgdGV4dC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKiBAZGVwcmVjYXRlZCBOYXZpZ2F0b3IgaXMgYWx3YXlzIG9uLlxuICAgICAqL1xuICAgIEBJbnB1dCgpIG1vbnRoTmF2aWdhdG9yOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIHllYXIgc2hvdWxkIGJlIHJlbmRlcmVkIGFzIGEgZHJvcGRvd24gaW5zdGVhZCBvZiB0ZXh0LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqIEBkZXByZWNhdGVkICBOYXZpZ2F0b3IgaXMgYWx3YXlzIG9uLlxuICAgICAqL1xuICAgIEBJbnB1dCgpIHllYXJOYXZpZ2F0b3I6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU3BlY2lmaWVzIDEyIG9yIDI0IGhvdXIgZm9ybWF0LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGhvdXJGb3JtYXQ6IHN0cmluZyA9ICcyNCc7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBkaXNwbGF5IHRpbWVwaWNrZXIgb25seS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0aW1lT25seTogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBIb3VycyB0byBjaGFuZ2UgcGVyIHN0ZXAuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3RlcEhvdXI6IG51bWJlciA9IDE7XG4gICAgLyoqXG4gICAgICogTWludXRlcyB0byBjaGFuZ2UgcGVyIHN0ZXAuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3RlcE1pbnV0ZTogbnVtYmVyID0gMTtcbiAgICAvKipcbiAgICAgKiBTZWNvbmRzIHRvIGNoYW5nZSBwZXIgc3RlcC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdGVwU2Vjb25kOiBudW1iZXIgPSAxO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gc2hvdyB0aGUgc2Vjb25kcyBpbiB0aW1lIHBpY2tlci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzaG93U2Vjb25kczogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIFdoZW4gcHJlc2VudCwgaXQgc3BlY2lmaWVzIHRoYXQgYW4gaW5wdXQgZmllbGQgbXVzdCBiZSBmaWxsZWQgb3V0IGJlZm9yZSBzdWJtaXR0aW5nIHRoZSBmb3JtLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZW4gZGlzYWJsZWQsIGRhdGVwaWNrZXIgd2lsbCBub3QgYmUgdmlzaWJsZSB3aXRoIGlucHV0IGZvY3VzLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNob3dPbkZvY3VzOiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBXaGVuIGVuYWJsZWQsIGNhbGVuZGFyIHdpbGwgc2hvdyB3ZWVrIG51bWJlcnMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc2hvd1dlZWs6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBXaGVuIGVuYWJsZWQsIGEgY2xlYXIgaWNvbiBpcyBkaXNwbGF5ZWQgdG8gY2xlYXIgdGhlIHZhbHVlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNob3dDbGVhcjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIFR5cGUgb2YgdGhlIHZhbHVlIHRvIHdyaXRlIGJhY2sgdG8gbmdNb2RlbCwgZGVmYXVsdCBpcyBkYXRlIGFuZCBhbHRlcm5hdGl2ZSBpcyBzdHJpbmcuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZGF0YVR5cGU6IHN0cmluZyA9ICdkYXRlJztcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHRoZSBxdWFudGl0eSBvZiB0aGUgc2VsZWN0aW9uLCB2YWxpZCB2YWx1ZXMgYXJlIFwic2luZ2xlXCIsIFwibXVsdGlwbGVcIiBhbmQgXCJyYW5nZVwiLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNlbGVjdGlvbk1vZGU6ICdzaW5nbGUnIHwgJ211bHRpcGxlJyB8ICdyYW5nZScgfCB1bmRlZmluZWQgPSAnc2luZ2xlJztcbiAgICAvKipcbiAgICAgKiBNYXhpbXVtIG51bWJlciBvZiBzZWxlY3RhYmxlIGRhdGVzIGluIG11bHRpcGxlIG1vZGUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbWF4RGF0ZUNvdW50OiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBkaXNwbGF5IHRvZGF5IGFuZCBjbGVhciBidXR0b25zIGF0IHRoZSBmb290ZXJcbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzaG93QnV0dG9uQmFyOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSB0b2RheSBidXR0b24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdG9kYXlCdXR0b25TdHlsZUNsYXNzOiBzdHJpbmcgPSAncC1idXR0b24tdGV4dCc7XG4gICAgLyoqXG4gICAgICogU3R5bGUgY2xhc3Mgb2YgdGhlIGNsZWFyIGJ1dHRvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBjbGVhckJ1dHRvblN0eWxlQ2xhc3M6IHN0cmluZyA9ICdwLWJ1dHRvbi10ZXh0JztcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIGF1dG9tYXRpY2FsbHkgbWFuYWdlIGxheWVyaW5nLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGF1dG9aSW5kZXg6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIEJhc2UgekluZGV4IHZhbHVlIHRvIHVzZSBpbiBsYXllcmluZy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBiYXNlWkluZGV4OiBudW1iZXIgPSAwO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSBkYXRldGltZXBpY2tlciBjb250YWluZXIgZWxlbWVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwYW5lbFN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJbmxpbmUgc3R5bGUgb2YgdGhlIGRhdGV0aW1lcGlja2VyIGNvbnRhaW5lciBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHBhbmVsU3R5bGU6IGFueTtcbiAgICAvKipcbiAgICAgKiBLZWVwIGludmFsaWQgdmFsdWUgd2hlbiBpbnB1dCBibHVyLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGtlZXBJbnZhbGlkOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBoaWRlIHRoZSBvdmVybGF5IG9uIGRhdGUgc2VsZWN0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGhpZGVPbkRhdGVUaW1lU2VsZWN0OiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBXaGVuIGVuYWJsZWQsIGNhbGVuZGFyIG92ZXJsYXkgaXMgZGlzcGxheWVkIGFzIG9wdGltaXplZCBmb3IgdG91Y2ggZGV2aWNlcy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0b3VjaFVJOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFNlcGFyYXRvciBvZiB0aW1lIHNlbGVjdG9yLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHRpbWVTZXBhcmF0b3I6IHN0cmluZyA9ICc6JztcbiAgICAvKipcbiAgICAgKiBXaGVuIGVuYWJsZWQsIGNhbiBvbmx5IGZvY3VzIG9uIGVsZW1lbnRzIGluc2lkZSB0aGUgY2FsZW5kYXIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZm9jdXNUcmFwOiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBUcmFuc2l0aW9uIG9wdGlvbnMgb2YgdGhlIHNob3cgYW5pbWF0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNob3dUcmFuc2l0aW9uT3B0aW9uczogc3RyaW5nID0gJy4xMnMgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMiwgMSknO1xuICAgIC8qKlxuICAgICAqIFRyYW5zaXRpb24gb3B0aW9ucyBvZiB0aGUgaGlkZSBhbmltYXRpb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaGlkZVRyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgPSAnLjFzIGxpbmVhcic7XG4gICAgLyoqXG4gICAgICogSW5kZXggb2YgdGhlIGVsZW1lbnQgaW4gdGFiYmluZyBvcmRlci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0YWJpbmRleDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFRoZSBtaW5pbXVtIHNlbGVjdGFibGUgZGF0ZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgbWluRGF0ZSgpOiBEYXRlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21pbkRhdGU7XG4gICAgfVxuICAgIHNldCBtaW5EYXRlKGRhdGU6IERhdGUpIHtcbiAgICAgICAgdGhpcy5fbWluRGF0ZSA9IGRhdGU7XG5cbiAgICAgICAgaWYgKHRoaXMuY3VycmVudE1vbnRoICE9IHVuZGVmaW5lZCAmJiB0aGlzLmN1cnJlbnRNb250aCAhPSBudWxsICYmIHRoaXMuY3VycmVudFllYXIpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTW9udGhzKHRoaXMuY3VycmVudE1vbnRoLCB0aGlzLmN1cnJlbnRZZWFyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgbWF4aW11bSBzZWxlY3RhYmxlIGRhdGUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IG1heERhdGUoKTogRGF0ZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXhEYXRlO1xuICAgIH1cbiAgICBzZXQgbWF4RGF0ZShkYXRlOiBEYXRlKSB7XG4gICAgICAgIHRoaXMuX21heERhdGUgPSBkYXRlO1xuXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRNb250aCAhPSB1bmRlZmluZWQgJiYgdGhpcy5jdXJyZW50TW9udGggIT0gbnVsbCAmJiB0aGlzLmN1cnJlbnRZZWFyKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1vbnRocyh0aGlzLmN1cnJlbnRNb250aCwgdGhpcy5jdXJyZW50WWVhcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQXJyYXkgd2l0aCBkYXRlcyB0aGF0IHNob3VsZCBiZSBkaXNhYmxlZCAobm90IHNlbGVjdGFibGUpLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBkaXNhYmxlZERhdGVzKCk6IERhdGVbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZERhdGVzO1xuICAgIH1cbiAgICBzZXQgZGlzYWJsZWREYXRlcyhkaXNhYmxlZERhdGVzOiBEYXRlW10pIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWREYXRlcyA9IGRpc2FibGVkRGF0ZXM7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRNb250aCAhPSB1bmRlZmluZWQgJiYgdGhpcy5jdXJyZW50TW9udGggIT0gbnVsbCAmJiB0aGlzLmN1cnJlbnRZZWFyKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1vbnRocyh0aGlzLmN1cnJlbnRNb250aCwgdGhpcy5jdXJyZW50WWVhcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQXJyYXkgd2l0aCB3ZWVrZGF5IG51bWJlcnMgdGhhdCBzaG91bGQgYmUgZGlzYWJsZWQgKG5vdCBzZWxlY3RhYmxlKS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgZGlzYWJsZWREYXlzKCk6IG51bWJlcltdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkRGF5cztcbiAgICB9XG4gICAgc2V0IGRpc2FibGVkRGF5cyhkaXNhYmxlZERheXM6IG51bWJlcltdKSB7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVkRGF5cyA9IGRpc2FibGVkRGF5cztcblxuICAgICAgICBpZiAodGhpcy5jdXJyZW50TW9udGggIT0gdW5kZWZpbmVkICYmIHRoaXMuY3VycmVudE1vbnRoICE9IG51bGwgJiYgdGhpcy5jdXJyZW50WWVhcikge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVNb250aHModGhpcy5jdXJyZW50TW9udGgsIHRoaXMuY3VycmVudFllYXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSByYW5nZSBvZiB5ZWFycyBkaXNwbGF5ZWQgaW4gdGhlIHllYXIgZHJvcC1kb3duIGluIChubm5uOm5ubm4pIGZvcm1hdCBzdWNoIGFzICgyMDAwOjIwMjApLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqIEBkZXByZWNhdGVkIFllYXJzIGFyZSBiYXNlZCBvbiBkZWNhZGVzIGJ5IGRlZmF1bHQuXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IHllYXJSYW5nZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5feWVhclJhbmdlO1xuICAgIH1cbiAgICBzZXQgeWVhclJhbmdlKHllYXJSYW5nZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX3llYXJSYW5nZSA9IHllYXJSYW5nZTtcblxuICAgICAgICBpZiAoeWVhclJhbmdlKSB7XG4gICAgICAgICAgICBjb25zdCB5ZWFycyA9IHllYXJSYW5nZS5zcGxpdCgnOicpO1xuICAgICAgICAgICAgY29uc3QgeWVhclN0YXJ0ID0gcGFyc2VJbnQoeWVhcnNbMF0pO1xuICAgICAgICAgICAgY29uc3QgeWVhckVuZCA9IHBhcnNlSW50KHllYXJzWzFdKTtcblxuICAgICAgICAgICAgdGhpcy5wb3B1bGF0ZVllYXJPcHRpb25zKHllYXJTdGFydCwgeWVhckVuZCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBkaXNwbGF5IHRpbWVwaWNrZXIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IHNob3dUaW1lKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2hvd1RpbWU7XG4gICAgfVxuICAgIHNldCBzaG93VGltZShzaG93VGltZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9zaG93VGltZSA9IHNob3dUaW1lO1xuXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRIb3VyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdFRpbWUodGhpcy52YWx1ZSB8fCBuZXcgRGF0ZSgpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZUlucHV0ZmllbGQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQW4gYXJyYXkgb2Ygb3B0aW9ucyBmb3IgcmVzcG9uc2l2ZSBkZXNpZ24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IHJlc3BvbnNpdmVPcHRpb25zKCk6IENhbGVuZGFyUmVzcG9uc2l2ZU9wdGlvbnNbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZXNwb25zaXZlT3B0aW9ucztcbiAgICB9XG4gICAgc2V0IHJlc3BvbnNpdmVPcHRpb25zKHJlc3BvbnNpdmVPcHRpb25zOiBDYWxlbmRhclJlc3BvbnNpdmVPcHRpb25zW10pIHtcbiAgICAgICAgdGhpcy5fcmVzcG9uc2l2ZU9wdGlvbnMgPSByZXNwb25zaXZlT3B0aW9ucztcblxuICAgICAgICB0aGlzLmRlc3Ryb3lSZXNwb25zaXZlU3R5bGVFbGVtZW50KCk7XG4gICAgICAgIHRoaXMuY3JlYXRlUmVzcG9uc2l2ZVN0eWxlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE51bWJlciBvZiBtb250aHMgdG8gZGlzcGxheS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgbnVtYmVyT2ZNb250aHMoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX251bWJlck9mTW9udGhzO1xuICAgIH1cbiAgICBzZXQgbnVtYmVyT2ZNb250aHMobnVtYmVyT2ZNb250aHM6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9udW1iZXJPZk1vbnRocyA9IG51bWJlck9mTW9udGhzO1xuXG4gICAgICAgIHRoaXMuZGVzdHJveVJlc3BvbnNpdmVTdHlsZUVsZW1lbnQoKTtcbiAgICAgICAgdGhpcy5jcmVhdGVSZXNwb25zaXZlU3R5bGUoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyB0aGUgZmlyc3Qgb2YgdGhlIHdlZWsgZm9yIHZhcmlvdXMgZGF0ZSBjYWxjdWxhdGlvbnMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IGZpcnN0RGF5T2ZXZWVrKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maXJzdERheU9mV2VlaztcbiAgICB9XG4gICAgc2V0IGZpcnN0RGF5T2ZXZWVrKGZpcnN0RGF5T2ZXZWVrOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fZmlyc3REYXlPZldlZWsgPSBmaXJzdERheU9mV2VlaztcblxuICAgICAgICB0aGlzLmNyZWF0ZVdlZWtEYXlzKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE9wdGlvbiB0byBzZXQgY2FsZW5kYXIgbG9jYWxlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqIEBkZXByZWNhdGVkIExvY2FsZSBwcm9wZXJ0eSBoYXMgbm8gZWZmZWN0LCB1c2UgbmV3IGkxOG4gQVBJIGluc3RlYWQuXG4gICAgICovXG4gICAgQElucHV0KCkgc2V0IGxvY2FsZShuZXdMb2NhbGU6IExvY2FsZVNldHRpbmdzKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignTG9jYWxlIHByb3BlcnR5IGhhcyBubyBlZmZlY3QsIHVzZSBuZXcgaTE4biBBUEkgaW5zdGVhZC4nKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVHlwZSBvZiB2aWV3IHRvIGRpc3BsYXksIHZhbGlkIHZhbHVlcyBhcmUgXCJkYXRlXCIgZm9yIGRhdGVwaWNrZXIgYW5kIFwibW9udGhcIiBmb3IgbW9udGggcGlja2VyLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCB2aWV3KCk6IENhbGVuZGFyVHlwZVZpZXcge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmlldztcbiAgICB9XG4gICAgc2V0IHZpZXcodmlldzogQ2FsZW5kYXJUeXBlVmlldykge1xuICAgICAgICB0aGlzLl92aWV3ID0gdmlldztcbiAgICAgICAgdGhpcy5jdXJyZW50VmlldyA9IHRoaXMuX3ZpZXc7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgZGF0ZSB0byBoaWdobGlnaHQgb24gZmlyc3Qgb3BlbmluZyBpZiB0aGUgZmllbGQgaXMgYmxhbmsuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IGRlZmF1bHREYXRlKCk6IERhdGUge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVmYXVsdERhdGU7XG4gICAgfVxuICAgIHNldCBkZWZhdWx0RGF0ZShkZWZhdWx0RGF0ZTogRGF0ZSkge1xuICAgICAgICB0aGlzLl9kZWZhdWx0RGF0ZSA9IGRlZmF1bHREYXRlO1xuXG4gICAgICAgIGlmICh0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRlID0gZGVmYXVsdERhdGUgfHwgbmV3IERhdGUoKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudE1vbnRoID0gZGF0ZS5nZXRNb250aCgpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50WWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdFRpbWUoZGF0ZSk7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1vbnRocyh0aGlzLmN1cnJlbnRNb250aCwgdGhpcy5jdXJyZW50WWVhcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIG9uIGZvY3VzIG9mIGlucHV0IGZpZWxkLlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gYnJvd3NlciBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25Gb2N1czogRXZlbnRFbWl0dGVyPEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIG9uIGJsdXIgb2YgaW5wdXQgZmllbGQuXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBicm93c2VyIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkJsdXI6IEV2ZW50RW1pdHRlcjxFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGRhdGUgcGFuZWwgY2xvc2VkLlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gTW91c2UgZXZlbnRcbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25DbG9zZTogRXZlbnRFbWl0dGVyPEFuaW1hdGlvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8QW5pbWF0aW9uRXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIG9uIGRhdGUgc2VsZWN0LlxuICAgICAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSAtIGRhdGUgdmFsdWUuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uU2VsZWN0OiBFdmVudEVtaXR0ZXI8RGF0ZT4gPSBuZXcgRXZlbnRFbWl0dGVyPERhdGU+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gaW5wdXQgZmllbGQgY2xlYXJlZC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25DbGVhcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBpbnB1dCBmaWVsZCBpcyBiZWluZyB0eXBlZC5cbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIGJyb3dzZXIgZXZlbnRcbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25JbnB1dDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiB0b2RheSBidXR0b24gaXMgY2xpY2tlZC5cbiAgICAgKiBAcGFyYW0ge0RhdGV9IGRhdGUgLSB0b2RheSBhcyBhIGRhdGUgaW5zdGFuY2UuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uVG9kYXlDbGljazogRXZlbnRFbWl0dGVyPERhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcjxEYXRlPigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGNsZWFyIGJ1dHRvbiBpcyBjbGlja2VkLlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gYnJvd3NlciBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25DbGVhckNsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGEgbW9udGggaXMgY2hhbmdlZCB1c2luZyB0aGUgbmF2aWdhdG9ycy5cbiAgICAgKiBAcGFyYW0ge0NhbGVuZGFyTW9udGhDaGFuZ2VFdmVudH0gZXZlbnQgLSBjdXN0b20gbW9udGggY2hhbmdlIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbk1vbnRoQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Q2FsZW5kYXJNb250aENoYW5nZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Q2FsZW5kYXJNb250aENoYW5nZUV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGEgeWVhciBpcyBjaGFuZ2VkIHVzaW5nIHRoZSBuYXZpZ2F0b3JzLlxuICAgICAqIEBwYXJhbSB7Q2FsZW5kYXJZZWFyQ2hhbmdlRXZlbnR9IGV2ZW50IC0gY3VzdG9tIHllYXIgY2hhbmdlIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvblllYXJDaGFuZ2U6IEV2ZW50RW1pdHRlcjxDYWxlbmRhclllYXJDaGFuZ2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPENhbGVuZGFyWWVhckNoYW5nZUV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGNsaWNrZWQgb3V0c2lkZSBvZiB0aGUgZGF0ZSBwYW5lbC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25DbGlja091dHNpZGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gZGF0ZXBpY2tlciBwYW5lbCBpcyBzaG93bi5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25TaG93OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXMhOiBRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT47XG5cbiAgICBAVmlld0NoaWxkKCdjb250YWluZXInLCB7IHN0YXRpYzogZmFsc2UgfSkgY29udGFpbmVyVmlld0NoaWxkOiBOdWxsYWJsZTxFbGVtZW50UmVmPjtcblxuICAgIEBWaWV3Q2hpbGQoJ2lucHV0ZmllbGQnLCB7IHN0YXRpYzogZmFsc2UgfSkgaW5wdXRmaWVsZFZpZXdDaGlsZDogTnVsbGFibGU8RWxlbWVudFJlZj47XG5cbiAgICBAVmlld0NoaWxkKCdjb250ZW50V3JhcHBlcicsIHsgc3RhdGljOiBmYWxzZSB9KSBzZXQgY29udGVudChjb250ZW50OiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHRoaXMuY29udGVudFZpZXdDaGlsZCA9IGNvbnRlbnQ7XG5cbiAgICAgICAgaWYgKHRoaXMuY29udGVudFZpZXdDaGlsZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNNb250aE5hdmlnYXRlKSB7XG4gICAgICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKG51bGwpLnRoZW4oKCkgPT4gdGhpcy51cGRhdGVGb2N1cygpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzTW9udGhOYXZpZ2F0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZm9jdXMgJiYgIXRoaXMuaW5saW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdEZvY3VzYWJsZUNlbGwoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb250ZW50Vmlld0NoaWxkITogRWxlbWVudFJlZjtcblxuICAgIHZhbHVlOiBhbnk7XG5cbiAgICBkYXRlczogTnVsbGFibGU8RGF0ZVtdPjtcblxuICAgIG1vbnRocyE6IE1vbnRoW107XG5cbiAgICB3ZWVrRGF5czogTnVsbGFibGU8c3RyaW5nW10+O1xuXG4gICAgY3VycmVudE1vbnRoITogbnVtYmVyO1xuXG4gICAgY3VycmVudFllYXIhOiBudW1iZXI7XG5cbiAgICBjdXJyZW50SG91cjogTnVsbGFibGU8bnVtYmVyPjtcblxuICAgIGN1cnJlbnRNaW51dGU6IE51bGxhYmxlPG51bWJlcj47XG5cbiAgICBjdXJyZW50U2Vjb25kOiBOdWxsYWJsZTxudW1iZXI+O1xuXG4gICAgcG06IE51bGxhYmxlPGJvb2xlYW4+O1xuXG4gICAgbWFzazogTnVsbGFibGU8SFRNTERpdkVsZW1lbnQ+O1xuXG4gICAgbWFza0NsaWNrTGlzdGVuZXI6IFZvaWRMaXN0ZW5lcjtcblxuICAgIG92ZXJsYXk6IE51bGxhYmxlPEhUTUxEaXZFbGVtZW50PjtcblxuICAgIHJlc3BvbnNpdmVTdHlsZUVsZW1lbnQ6IEhUTUxTdHlsZUVsZW1lbnQgfCB1bmRlZmluZWQgfCBudWxsO1xuXG4gICAgb3ZlcmxheVZpc2libGU6IE51bGxhYmxlPGJvb2xlYW4+O1xuXG4gICAgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICAgIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gICAgY2FsZW5kYXJFbGVtZW50OiBOdWxsYWJsZTxIVE1MRWxlbWVudCB8IEVsZW1lbnRSZWY+O1xuXG4gICAgdGltZVBpY2tlclRpbWVyOiBhbnk7XG5cbiAgICBkb2N1bWVudENsaWNrTGlzdGVuZXI6IFZvaWRMaXN0ZW5lcjtcblxuICAgIGFuaW1hdGlvbkVuZExpc3RlbmVyOiBWb2lkTGlzdGVuZXI7XG5cbiAgICB0aWNrc1RvMTk3MDogTnVsbGFibGU8bnVtYmVyPjtcblxuICAgIHllYXJPcHRpb25zOiBOdWxsYWJsZTxudW1iZXJbXT47XG5cbiAgICBmb2N1czogTnVsbGFibGU8Ym9vbGVhbj47XG5cbiAgICBpc0tleWRvd246IE51bGxhYmxlPGJvb2xlYW4+O1xuXG4gICAgZmlsbGVkOiBOdWxsYWJsZTxib29sZWFuPjtcblxuICAgIGlucHV0RmllbGRWYWx1ZTogTnVsbGFibGU8c3RyaW5nPiA9IG51bGw7XG5cbiAgICBfbWluRGF0ZSE6IERhdGU7XG5cbiAgICBfbWF4RGF0ZSE6IERhdGU7XG5cbiAgICBfc2hvd1RpbWUhOiBib29sZWFuO1xuXG4gICAgX3llYXJSYW5nZSE6IHN0cmluZztcblxuICAgIHByZXZlbnREb2N1bWVudExpc3RlbmVyOiBOdWxsYWJsZTxib29sZWFuPjtcblxuICAgIGRhdGVUZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBoZWFkZXJUZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBmb290ZXJUZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBkaXNhYmxlZERhdGVUZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBkZWNhZGVUZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBwcmV2aW91c0ljb25UZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBuZXh0SWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIHRyaWdnZXJJY29uVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgY2xlYXJJY29uVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgZGVjcmVtZW50SWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGluY3JlbWVudEljb25UZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBfZGlzYWJsZWREYXRlcyE6IEFycmF5PERhdGU+O1xuXG4gICAgX2Rpc2FibGVkRGF5cyE6IEFycmF5PG51bWJlcj47XG5cbiAgICBzZWxlY3RFbGVtZW50OiBOdWxsYWJsZTtcblxuICAgIHRvZGF5RWxlbWVudDogTnVsbGFibGU7XG5cbiAgICBmb2N1c0VsZW1lbnQ6IE51bGxhYmxlO1xuXG4gICAgc2Nyb2xsSGFuZGxlcjogTnVsbGFibGU8Q29ubmVjdGVkT3ZlcmxheVNjcm9sbEhhbmRsZXI+O1xuXG4gICAgZG9jdW1lbnRSZXNpemVMaXN0ZW5lcjogVm9pZExpc3RlbmVyO1xuXG4gICAgbmF2aWdhdGlvblN0YXRlOiBOdWxsYWJsZTxOYXZpZ2F0aW9uU3RhdGU+ID0gbnVsbDtcblxuICAgIGlzTW9udGhOYXZpZ2F0ZTogTnVsbGFibGU8Ym9vbGVhbj47XG5cbiAgICBpbml0aWFsaXplZDogTnVsbGFibGU8Ym9vbGVhbj47XG5cbiAgICB0cmFuc2xhdGlvblN1YnNjcmlwdGlvbjogTnVsbGFibGU8U3Vic2NyaXB0aW9uPjtcblxuICAgIF9sb2NhbGUhOiBMb2NhbGVTZXR0aW5ncztcblxuICAgIF9yZXNwb25zaXZlT3B0aW9ucyE6IENhbGVuZGFyUmVzcG9uc2l2ZU9wdGlvbnNbXTtcblxuICAgIGN1cnJlbnRWaWV3OiBOdWxsYWJsZTxzdHJpbmc+O1xuXG4gICAgYXR0cmlidXRlU2VsZWN0b3I6IE51bGxhYmxlPHN0cmluZz47XG5cbiAgICBwYW5lbElkOiBOdWxsYWJsZTxzdHJpbmc+O1xuXG4gICAgX251bWJlck9mTW9udGhzOiBudW1iZXIgPSAxO1xuXG4gICAgX2ZpcnN0RGF5T2ZXZWVrITogbnVtYmVyO1xuXG4gICAgX3ZpZXc6IENhbGVuZGFyVHlwZVZpZXcgPSAnZGF0ZSc7XG5cbiAgICBwcmV2ZW50Rm9jdXM6IE51bGxhYmxlPGJvb2xlYW4+O1xuXG4gICAgX2RlZmF1bHREYXRlITogRGF0ZTtcblxuICAgIHByaXZhdGUgd2luZG93OiBXaW5kb3c7XG5cbiAgICBnZXQgbG9jYWxlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxlO1xuICAgIH1cblxuICAgIGdldCBpY29uQnV0dG9uQXJpYUxhYmVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pY29uQXJpYUxhYmVsID8gdGhpcy5pY29uQXJpYUxhYmVsIDogdGhpcy5nZXRUcmFuc2xhdGlvbignY2hvb3NlRGF0ZScpO1xuICAgIH1cblxuICAgIGdldCBwcmV2SWNvbkFyaWFMYWJlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFZpZXcgPT09ICd5ZWFyJyA/IHRoaXMuZ2V0VHJhbnNsYXRpb24oJ3ByZXZEZWNhZGUnKSA6IHRoaXMuY3VycmVudFZpZXcgPT09ICdtb250aCcgPyB0aGlzLmdldFRyYW5zbGF0aW9uKCdwcmV2WWVhcicpIDogdGhpcy5nZXRUcmFuc2xhdGlvbigncHJldk1vbnRoJyk7XG4gICAgfVxuXG4gICAgZ2V0IG5leHRJY29uQXJpYUxhYmVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50VmlldyA9PT0gJ3llYXInID8gdGhpcy5nZXRUcmFuc2xhdGlvbignbmV4dERlY2FkZScpIDogdGhpcy5jdXJyZW50VmlldyA9PT0gJ21vbnRoJyA/IHRoaXMuZ2V0VHJhbnNsYXRpb24oJ25leHRZZWFyJykgOiB0aGlzLmdldFRyYW5zbGF0aW9uKCduZXh0TW9udGgnKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudCwgcHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHVibGljIGNkOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSB6b25lOiBOZ1pvbmUsIHByaXZhdGUgY29uZmlnOiBQcmltZU5HQ29uZmlnLCBwdWJsaWMgb3ZlcmxheVNlcnZpY2U6IE92ZXJsYXlTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMud2luZG93ID0gdGhpcy5kb2N1bWVudC5kZWZhdWx0VmlldyBhcyBXaW5kb3c7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuYXR0cmlidXRlU2VsZWN0b3IgPSBVbmlxdWVDb21wb25lbnRJZCgpO1xuICAgICAgICB0aGlzLnBhbmVsSWQgPSB0aGlzLmF0dHJpYnV0ZVNlbGVjdG9yICsgJ19wYW5lbCc7XG4gICAgICAgIGNvbnN0IGRhdGUgPSB0aGlzLmRlZmF1bHREYXRlIHx8IG5ldyBEYXRlKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlUmVzcG9uc2l2ZVN0eWxlKCk7XG4gICAgICAgIHRoaXMuY3VycmVudE1vbnRoID0gZGF0ZS5nZXRNb250aCgpO1xuICAgICAgICB0aGlzLmN1cnJlbnRZZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgICB0aGlzLnllYXJPcHRpb25zID0gW107XG4gICAgICAgIHRoaXMuY3VycmVudFZpZXcgPSB0aGlzLnZpZXc7XG5cbiAgICAgICAgaWYgKHRoaXMudmlldyA9PT0gJ2RhdGUnKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVdlZWtEYXlzKCk7XG4gICAgICAgICAgICB0aGlzLmluaXRUaW1lKGRhdGUpO1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVNb250aHModGhpcy5jdXJyZW50TW9udGgsIHRoaXMuY3VycmVudFllYXIpO1xuICAgICAgICAgICAgdGhpcy50aWNrc1RvMTk3MCA9ICgoMTk3MCAtIDEpICogMzY1ICsgTWF0aC5mbG9vcigxOTcwIC8gNCkgLSBNYXRoLmZsb29yKDE5NzAgLyAxMDApICsgTWF0aC5mbG9vcigxOTcwIC8gNDAwKSkgKiAyNCAqIDYwICogNjAgKiAxMDAwMDAwMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudHJhbnNsYXRpb25TdWJzY3JpcHRpb24gPSB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbk9ic2VydmVyLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVdlZWtEYXlzKCk7XG4gICAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2RlY2FkZSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVjYWRlVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2Rpc2FibGVkRGF0ZSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZWREYXRlVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2hlYWRlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhZGVyVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3ByZXZpb3VzaWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXNJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ25leHRpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0SWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICd0cmlnZ2VyaWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlckljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnY2xlYXJpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhckljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZGVjcmVtZW50aWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVjcmVtZW50SWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdpbmNyZW1lbnRpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmNyZW1lbnRJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2Zvb3Rlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9vdGVyVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5saW5lKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRWaWV3Q2hpbGQgJiYgdGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKHRoaXMuYXR0cmlidXRlU2VsZWN0b3IsICcnKTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkICYmICF0aGlzLmlubGluZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5pdEZvY3VzYWJsZUNlbGwoKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5udW1iZXJPZk1vbnRocyA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb250ZW50Vmlld0NoaWxkICYmIHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS53aWR0aCA9IERvbUhhbmRsZXIuZ2V0T3V0ZXJXaWR0aCh0aGlzLmNvbnRhaW5lclZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudCkgKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0VHJhbnNsYXRpb24ob3B0aW9uOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLmdldFRyYW5zbGF0aW9uKG9wdGlvbik7XG4gICAgfVxuXG4gICAgcG9wdWxhdGVZZWFyT3B0aW9ucyhzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlcikge1xuICAgICAgICB0aGlzLnllYXJPcHRpb25zID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDw9IGVuZDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnllYXJPcHRpb25zLnB1c2goaSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjcmVhdGVXZWVrRGF5cygpIHtcbiAgICAgICAgdGhpcy53ZWVrRGF5cyA9IFtdO1xuICAgICAgICBsZXQgZGF5SW5kZXggPSB0aGlzLmdldEZpcnN0RGF0ZU9mV2VlaygpO1xuICAgICAgICBsZXQgZGF5TGFiZWxzID0gdGhpcy5nZXRUcmFuc2xhdGlvbihUcmFuc2xhdGlvbktleXMuREFZX05BTUVTX01JTik7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNzsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLndlZWtEYXlzLnB1c2goZGF5TGFiZWxzW2RheUluZGV4XSk7XG4gICAgICAgICAgICBkYXlJbmRleCA9IGRheUluZGV4ID09IDYgPyAwIDogKytkYXlJbmRleDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vbnRoUGlja2VyVmFsdWVzKCkge1xuICAgICAgICBsZXQgbW9udGhQaWNrZXJWYWx1ZXMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gMTE7IGkrKykge1xuICAgICAgICAgICAgbW9udGhQaWNrZXJWYWx1ZXMucHVzaCh0aGlzLmNvbmZpZy5nZXRUcmFuc2xhdGlvbignbW9udGhOYW1lc1Nob3J0JylbaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1vbnRoUGlja2VyVmFsdWVzO1xuICAgIH1cblxuICAgIHllYXJQaWNrZXJWYWx1ZXMoKSB7XG4gICAgICAgIGxldCB5ZWFyUGlja2VyVmFsdWVzID0gW107XG4gICAgICAgIGxldCBiYXNlID0gPG51bWJlcj50aGlzLmN1cnJlbnRZZWFyIC0gKDxudW1iZXI+dGhpcy5jdXJyZW50WWVhciAlIDEwKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgICAgICB5ZWFyUGlja2VyVmFsdWVzLnB1c2goYmFzZSArIGkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHllYXJQaWNrZXJWYWx1ZXM7XG4gICAgfVxuXG4gICAgY3JlYXRlTW9udGhzKG1vbnRoOiBudW1iZXIsIHllYXI6IG51bWJlcikge1xuICAgICAgICB0aGlzLm1vbnRocyA9IHRoaXMubW9udGhzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5udW1iZXJPZk1vbnRoczsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbSA9IG1vbnRoICsgaTtcbiAgICAgICAgICAgIGxldCB5ID0geWVhcjtcbiAgICAgICAgICAgIGlmIChtID4gMTEpIHtcbiAgICAgICAgICAgICAgICBtID0gKG0gJSAxMSkgLSAxO1xuICAgICAgICAgICAgICAgIHkgPSB5ZWFyICsgMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5tb250aHMucHVzaCh0aGlzLmNyZWF0ZU1vbnRoKG0sIHkpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFdlZWtOdW1iZXIoZGF0ZTogRGF0ZSkge1xuICAgICAgICBsZXQgY2hlY2tEYXRlID0gbmV3IERhdGUoZGF0ZS5nZXRUaW1lKCkpO1xuICAgICAgICBjaGVja0RhdGUuc2V0RGF0ZShjaGVja0RhdGUuZ2V0RGF0ZSgpICsgNCAtIChjaGVja0RhdGUuZ2V0RGF5KCkgfHwgNykpO1xuICAgICAgICBsZXQgdGltZSA9IGNoZWNrRGF0ZS5nZXRUaW1lKCk7XG4gICAgICAgIGNoZWNrRGF0ZS5zZXRNb250aCgwKTtcbiAgICAgICAgY2hlY2tEYXRlLnNldERhdGUoMSk7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucm91bmQoKHRpbWUgLSBjaGVja0RhdGUuZ2V0VGltZSgpKSAvIDg2NDAwMDAwKSAvIDcpICsgMTtcbiAgICB9XG5cbiAgICBjcmVhdGVNb250aChtb250aDogbnVtYmVyLCB5ZWFyOiBudW1iZXIpOiBNb250aCB7XG4gICAgICAgIGxldCBkYXRlcyA9IFtdO1xuICAgICAgICBsZXQgZmlyc3REYXkgPSB0aGlzLmdldEZpcnN0RGF5T2ZNb250aEluZGV4KG1vbnRoLCB5ZWFyKTtcbiAgICAgICAgbGV0IGRheXNMZW5ndGggPSB0aGlzLmdldERheXNDb3VudEluTW9udGgobW9udGgsIHllYXIpO1xuICAgICAgICBsZXQgcHJldk1vbnRoRGF5c0xlbmd0aCA9IHRoaXMuZ2V0RGF5c0NvdW50SW5QcmV2TW9udGgobW9udGgsIHllYXIpO1xuICAgICAgICBsZXQgZGF5Tm8gPSAxO1xuICAgICAgICBsZXQgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBsZXQgd2Vla051bWJlcnMgPSBbXTtcbiAgICAgICAgbGV0IG1vbnRoUm93cyA9IE1hdGguY2VpbCgoZGF5c0xlbmd0aCArIGZpcnN0RGF5KSAvIDcpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbW9udGhSb3dzOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB3ZWVrID0gW107XG5cbiAgICAgICAgICAgIGlmIChpID09IDApIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gcHJldk1vbnRoRGF5c0xlbmd0aCAtIGZpcnN0RGF5ICsgMTsgaiA8PSBwcmV2TW9udGhEYXlzTGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHByZXYgPSB0aGlzLmdldFByZXZpb3VzTW9udGhBbmRZZWFyKG1vbnRoLCB5ZWFyKTtcbiAgICAgICAgICAgICAgICAgICAgd2Vlay5wdXNoKHsgZGF5OiBqLCBtb250aDogcHJldi5tb250aCwgeWVhcjogcHJldi55ZWFyLCBvdGhlck1vbnRoOiB0cnVlLCB0b2RheTogdGhpcy5pc1RvZGF5KHRvZGF5LCBqLCBwcmV2Lm1vbnRoLCBwcmV2LnllYXIpLCBzZWxlY3RhYmxlOiB0aGlzLmlzU2VsZWN0YWJsZShqLCBwcmV2Lm1vbnRoLCBwcmV2LnllYXIsIHRydWUpIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCByZW1haW5pbmdEYXlzTGVuZ3RoID0gNyAtIHdlZWsubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcmVtYWluaW5nRGF5c0xlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHdlZWsucHVzaCh7IGRheTogZGF5Tm8sIG1vbnRoOiBtb250aCwgeWVhcjogeWVhciwgdG9kYXk6IHRoaXMuaXNUb2RheSh0b2RheSwgZGF5Tm8sIG1vbnRoLCB5ZWFyKSwgc2VsZWN0YWJsZTogdGhpcy5pc1NlbGVjdGFibGUoZGF5Tm8sIG1vbnRoLCB5ZWFyLCBmYWxzZSkgfSk7XG4gICAgICAgICAgICAgICAgICAgIGRheU5vKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDc7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF5Tm8gPiBkYXlzTGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV4dCA9IHRoaXMuZ2V0TmV4dE1vbnRoQW5kWWVhcihtb250aCwgeWVhcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB3ZWVrLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRheTogZGF5Tm8gLSBkYXlzTGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnRoOiBuZXh0Lm1vbnRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHllYXI6IG5leHQueWVhcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlck1vbnRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZGF5OiB0aGlzLmlzVG9kYXkodG9kYXksIGRheU5vIC0gZGF5c0xlbmd0aCwgbmV4dC5tb250aCwgbmV4dC55ZWFyKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RhYmxlOiB0aGlzLmlzU2VsZWN0YWJsZShkYXlObyAtIGRheXNMZW5ndGgsIG5leHQubW9udGgsIG5leHQueWVhciwgdHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2Vlay5wdXNoKHsgZGF5OiBkYXlObywgbW9udGg6IG1vbnRoLCB5ZWFyOiB5ZWFyLCB0b2RheTogdGhpcy5pc1RvZGF5KHRvZGF5LCBkYXlObywgbW9udGgsIHllYXIpLCBzZWxlY3RhYmxlOiB0aGlzLmlzU2VsZWN0YWJsZShkYXlObywgbW9udGgsIHllYXIsIGZhbHNlKSB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGRheU5vKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5zaG93V2Vlaykge1xuICAgICAgICAgICAgICAgIHdlZWtOdW1iZXJzLnB1c2godGhpcy5nZXRXZWVrTnVtYmVyKG5ldyBEYXRlKHdlZWtbMF0ueWVhciwgd2Vla1swXS5tb250aCwgd2Vla1swXS5kYXkpKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRhdGVzLnB1c2god2Vlayk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbW9udGg6IG1vbnRoLFxuICAgICAgICAgICAgeWVhcjogeWVhcixcbiAgICAgICAgICAgIGRhdGVzOiA8YW55PmRhdGVzLFxuICAgICAgICAgICAgd2Vla051bWJlcnM6IHdlZWtOdW1iZXJzXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaW5pdFRpbWUoZGF0ZTogRGF0ZSkge1xuICAgICAgICB0aGlzLnBtID0gZGF0ZS5nZXRIb3VycygpID4gMTE7XG5cbiAgICAgICAgaWYgKHRoaXMuc2hvd1RpbWUpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudE1pbnV0ZSA9IGRhdGUuZ2V0TWludXRlcygpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50U2Vjb25kID0gZGF0ZS5nZXRTZWNvbmRzKCk7XG4gICAgICAgICAgICB0aGlzLnNldEN1cnJlbnRIb3VyUE0oZGF0ZS5nZXRIb3VycygpKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRpbWVPbmx5KSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRNaW51dGUgPSAwO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50SG91ciA9IDA7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTZWNvbmQgPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmF2QmFja3dhcmQoZXZlbnQ6IGFueSkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaXNNb250aE5hdmlnYXRlID0gdHJ1ZTtcblxuICAgICAgICBpZiAodGhpcy5jdXJyZW50VmlldyA9PT0gJ21vbnRoJykge1xuICAgICAgICAgICAgdGhpcy5kZWNyZW1lbnRZZWFyKCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUZvY3VzKCk7XG4gICAgICAgICAgICB9LCAxKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnRWaWV3ID09PSAneWVhcicpIHtcbiAgICAgICAgICAgIHRoaXMuZGVjcmVtZW50RGVjYWRlKCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUZvY3VzKCk7XG4gICAgICAgICAgICB9LCAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRNb250aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudE1vbnRoID0gMTE7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWNyZW1lbnRZZWFyKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudE1vbnRoLS07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMub25Nb250aENoYW5nZS5lbWl0KHsgbW9udGg6IHRoaXMuY3VycmVudE1vbnRoICsgMSwgeWVhcjogdGhpcy5jdXJyZW50WWVhciB9KTtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTW9udGhzKHRoaXMuY3VycmVudE1vbnRoLCB0aGlzLmN1cnJlbnRZZWFyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5hdkZvcndhcmQoZXZlbnQ6IGFueSkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaXNNb250aE5hdmlnYXRlID0gdHJ1ZTtcblxuICAgICAgICBpZiAodGhpcy5jdXJyZW50VmlldyA9PT0gJ21vbnRoJykge1xuICAgICAgICAgICAgdGhpcy5pbmNyZW1lbnRZZWFyKCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUZvY3VzKCk7XG4gICAgICAgICAgICB9LCAxKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnRWaWV3ID09PSAneWVhcicpIHtcbiAgICAgICAgICAgIHRoaXMuaW5jcmVtZW50RGVjYWRlKCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUZvY3VzKCk7XG4gICAgICAgICAgICB9LCAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRNb250aCA9PT0gMTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRNb250aCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmNyZW1lbnRZZWFyKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudE1vbnRoKys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMub25Nb250aENoYW5nZS5lbWl0KHsgbW9udGg6IHRoaXMuY3VycmVudE1vbnRoICsgMSwgeWVhcjogdGhpcy5jdXJyZW50WWVhciB9KTtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTW9udGhzKHRoaXMuY3VycmVudE1vbnRoLCB0aGlzLmN1cnJlbnRZZWFyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlY3JlbWVudFllYXIoKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFllYXItLTtcbiAgICAgICAgbGV0IF95ZWFyT3B0aW9ucyA9IDxudW1iZXJbXT50aGlzLnllYXJPcHRpb25zO1xuXG4gICAgICAgIGlmICh0aGlzLnllYXJOYXZpZ2F0b3IgJiYgdGhpcy5jdXJyZW50WWVhciA8IF95ZWFyT3B0aW9uc1swXSkge1xuICAgICAgICAgICAgbGV0IGRpZmZlcmVuY2UgPSBfeWVhck9wdGlvbnNbX3llYXJPcHRpb25zLmxlbmd0aCAtIDFdIC0gX3llYXJPcHRpb25zWzBdO1xuICAgICAgICAgICAgdGhpcy5wb3B1bGF0ZVllYXJPcHRpb25zKF95ZWFyT3B0aW9uc1swXSAtIGRpZmZlcmVuY2UsIF95ZWFyT3B0aW9uc1tfeWVhck9wdGlvbnMubGVuZ3RoIC0gMV0gLSBkaWZmZXJlbmNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlY3JlbWVudERlY2FkZSgpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50WWVhciA9IHRoaXMuY3VycmVudFllYXIgLSAxMDtcbiAgICB9XG5cbiAgICBpbmNyZW1lbnREZWNhZGUoKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFllYXIgPSB0aGlzLmN1cnJlbnRZZWFyICsgMTA7XG4gICAgfVxuXG4gICAgaW5jcmVtZW50WWVhcigpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50WWVhcisrO1xuICAgICAgICBsZXQgX3llYXJPcHRpb25zID0gPG51bWJlcltdPnRoaXMueWVhck9wdGlvbnM7XG5cbiAgICAgICAgaWYgKHRoaXMueWVhck5hdmlnYXRvciAmJiB0aGlzLmN1cnJlbnRZZWFyID4gX3llYXJPcHRpb25zW195ZWFyT3B0aW9ucy5sZW5ndGggLSAxXSkge1xuICAgICAgICAgICAgbGV0IGRpZmZlcmVuY2UgPSBfeWVhck9wdGlvbnNbX3llYXJPcHRpb25zLmxlbmd0aCAtIDFdIC0gX3llYXJPcHRpb25zWzBdO1xuICAgICAgICAgICAgdGhpcy5wb3B1bGF0ZVllYXJPcHRpb25zKF95ZWFyT3B0aW9uc1swXSArIGRpZmZlcmVuY2UsIF95ZWFyT3B0aW9uc1tfeWVhck9wdGlvbnMubGVuZ3RoIC0gMV0gKyBkaWZmZXJlbmNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN3aXRjaFRvTW9udGhWaWV3KGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLnNldEN1cnJlbnRWaWV3KCdtb250aCcpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIHN3aXRjaFRvWWVhclZpZXcoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2V0Q3VycmVudFZpZXcoJ3llYXInKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvbkRhdGVTZWxlY3QoZXZlbnQ6IEV2ZW50LCBkYXRlTWV0YTogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8ICFkYXRlTWV0YS5zZWxlY3RhYmxlKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNNdWx0aXBsZVNlbGVjdGlvbigpICYmIHRoaXMuaXNTZWxlY3RlZChkYXRlTWV0YSkpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLnZhbHVlLmZpbHRlcigoZGF0ZTogRGF0ZSwgaTogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICF0aGlzLmlzRGF0ZUVxdWFscyhkYXRlLCBkYXRlTWV0YSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy51cGRhdGVNb2RlbCh0aGlzLnZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNob3VsZFNlbGVjdERhdGUoZGF0ZU1ldGEpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3REYXRlKGRhdGVNZXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzU2luZ2xlU2VsZWN0aW9uKCkgJiYgdGhpcy5oaWRlT25EYXRlVGltZVNlbGVjdCkge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVPdmVybGF5KCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXNrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZU1vZGFsaXR5KCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH0sIDE1MCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVwZGF0ZUlucHV0ZmllbGQoKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBzaG91bGRTZWxlY3REYXRlKGRhdGVNZXRhOiBhbnkpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNNdWx0aXBsZVNlbGVjdGlvbigpKSByZXR1cm4gdGhpcy5tYXhEYXRlQ291bnQgIT0gbnVsbCA/IHRoaXMubWF4RGF0ZUNvdW50ID4gKHRoaXMudmFsdWUgPyB0aGlzLnZhbHVlLmxlbmd0aCA6IDApIDogdHJ1ZTtcbiAgICAgICAgZWxzZSByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBvbk1vbnRoU2VsZWN0KGV2ZW50OiBFdmVudCwgaW5kZXg6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy52aWV3ID09PSAnbW9udGgnKSB7XG4gICAgICAgICAgICB0aGlzLm9uRGF0ZVNlbGVjdChldmVudCwgeyB5ZWFyOiB0aGlzLmN1cnJlbnRZZWFyLCBtb250aDogaW5kZXgsIGRheTogMSwgc2VsZWN0YWJsZTogdHJ1ZSB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudE1vbnRoID0gaW5kZXg7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1vbnRocyh0aGlzLmN1cnJlbnRNb250aCwgdGhpcy5jdXJyZW50WWVhcik7XG4gICAgICAgICAgICB0aGlzLnNldEN1cnJlbnRWaWV3KCdkYXRlJyk7XG4gICAgICAgICAgICB0aGlzLm9uTW9udGhDaGFuZ2UuZW1pdCh7IG1vbnRoOiB0aGlzLmN1cnJlbnRNb250aCArIDEsIHllYXI6IHRoaXMuY3VycmVudFllYXIgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblllYXJTZWxlY3QoZXZlbnQ6IEV2ZW50LCB5ZWFyOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMudmlldyA9PT0gJ3llYXInKSB7XG4gICAgICAgICAgICB0aGlzLm9uRGF0ZVNlbGVjdChldmVudCwgeyB5ZWFyOiB5ZWFyLCBtb250aDogMCwgZGF5OiAxLCBzZWxlY3RhYmxlOiB0cnVlIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50WWVhciA9IHllYXI7XG4gICAgICAgICAgICB0aGlzLnNldEN1cnJlbnRWaWV3KCdtb250aCcpO1xuICAgICAgICAgICAgdGhpcy5vblllYXJDaGFuZ2UuZW1pdCh7IG1vbnRoOiB0aGlzLmN1cnJlbnRNb250aCArIDEsIHllYXI6IHRoaXMuY3VycmVudFllYXIgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVJbnB1dGZpZWxkKCkge1xuICAgICAgICBsZXQgZm9ybWF0dGVkVmFsdWUgPSAnJztcblxuICAgICAgICBpZiAodGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNTaW5nbGVTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgICAgIGZvcm1hdHRlZFZhbHVlID0gdGhpcy5mb3JtYXREYXRlVGltZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc011bHRpcGxlU2VsZWN0aW9uKCkpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGVBc1N0cmluZyA9IHRoaXMuZm9ybWF0RGF0ZVRpbWUodGhpcy52YWx1ZVtpXSk7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlZFZhbHVlICs9IGRhdGVBc1N0cmluZztcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgIT09IHRoaXMudmFsdWUubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVkVmFsdWUgKz0gdGhpcy5tdWx0aXBsZVNlcGFyYXRvciArICcgJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc1JhbmdlU2VsZWN0aW9uKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy52YWx1ZSAmJiB0aGlzLnZhbHVlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc3RhcnREYXRlID0gdGhpcy52YWx1ZVswXTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVuZERhdGUgPSB0aGlzLnZhbHVlWzFdO1xuXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlZFZhbHVlID0gdGhpcy5mb3JtYXREYXRlVGltZShzdGFydERhdGUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW5kRGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVkVmFsdWUgKz0gJyAnICsgdGhpcy5yYW5nZVNlcGFyYXRvciArICcgJyArIHRoaXMuZm9ybWF0RGF0ZVRpbWUoZW5kRGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmlucHV0RmllbGRWYWx1ZSA9IGZvcm1hdHRlZFZhbHVlO1xuICAgICAgICB0aGlzLnVwZGF0ZUZpbGxlZFN0YXRlKCk7XG4gICAgICAgIGlmICh0aGlzLmlucHV0ZmllbGRWaWV3Q2hpbGQgJiYgdGhpcy5pbnB1dGZpZWxkVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRmaWVsZFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy5pbnB1dEZpZWxkVmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3JtYXREYXRlVGltZShkYXRlOiBhbnkpIHtcbiAgICAgICAgbGV0IGZvcm1hdHRlZFZhbHVlID0gdGhpcy5rZWVwSW52YWxpZCA/IGRhdGUgOiBudWxsO1xuXG4gICAgICAgIGlmICh0aGlzLmlzVmFsaWREYXRlKGRhdGUpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy50aW1lT25seSkge1xuICAgICAgICAgICAgICAgIGZvcm1hdHRlZFZhbHVlID0gdGhpcy5mb3JtYXRUaW1lKGRhdGUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZWRWYWx1ZSA9IHRoaXMuZm9ybWF0RGF0ZShkYXRlLCB0aGlzLmdldERhdGVGb3JtYXQoKSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2hvd1RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVkVmFsdWUgKz0gJyAnICsgdGhpcy5mb3JtYXRUaW1lKGRhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmb3JtYXR0ZWRWYWx1ZTtcbiAgICB9XG5cbiAgICBzZXRDdXJyZW50SG91clBNKGhvdXJzOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuaG91ckZvcm1hdCA9PSAnMTInKSB7XG4gICAgICAgICAgICB0aGlzLnBtID0gaG91cnMgPiAxMTtcbiAgICAgICAgICAgIGlmIChob3VycyA+PSAxMikge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEhvdXIgPSBob3VycyA9PSAxMiA/IDEyIDogaG91cnMgLSAxMjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50SG91ciA9IGhvdXJzID09IDAgPyAxMiA6IGhvdXJzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50SG91ciA9IGhvdXJzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0Q3VycmVudFZpZXcoY3VycmVudFZpZXc6IENhbGVuZGFyVHlwZVZpZXcpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50VmlldyA9IGN1cnJlbnRWaWV3O1xuICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgdGhpcy5hbGlnbk92ZXJsYXkoKTtcbiAgICB9XG5cbiAgICBzZWxlY3REYXRlKGRhdGVNZXRhOiBhbnkpIHtcbiAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZShkYXRlTWV0YS55ZWFyLCBkYXRlTWV0YS5tb250aCwgZGF0ZU1ldGEuZGF5KTtcblxuICAgICAgICBpZiAodGhpcy5zaG93VGltZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaG91ckZvcm1hdCA9PSAnMTInKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudEhvdXIgPT09IDEyKSBkYXRlLnNldEhvdXJzKHRoaXMucG0gPyAxMiA6IDApO1xuICAgICAgICAgICAgICAgIGVsc2UgZGF0ZS5zZXRIb3Vycyh0aGlzLnBtID8gPG51bWJlcj50aGlzLmN1cnJlbnRIb3VyICsgMTIgOiA8bnVtYmVyPnRoaXMuY3VycmVudEhvdXIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkYXRlLnNldEhvdXJzKDxudW1iZXI+dGhpcy5jdXJyZW50SG91cik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRhdGUuc2V0TWludXRlcyg8bnVtYmVyPnRoaXMuY3VycmVudE1pbnV0ZSk7XG4gICAgICAgICAgICBkYXRlLnNldFNlY29uZHMoPG51bWJlcj50aGlzLmN1cnJlbnRTZWNvbmQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubWluRGF0ZSAmJiB0aGlzLm1pbkRhdGUgPiBkYXRlKSB7XG4gICAgICAgICAgICBkYXRlID0gdGhpcy5taW5EYXRlO1xuICAgICAgICAgICAgdGhpcy5zZXRDdXJyZW50SG91clBNKGRhdGUuZ2V0SG91cnMoKSk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRNaW51dGUgPSBkYXRlLmdldE1pbnV0ZXMoKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNlY29uZCA9IGRhdGUuZ2V0U2Vjb25kcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubWF4RGF0ZSAmJiB0aGlzLm1heERhdGUgPCBkYXRlKSB7XG4gICAgICAgICAgICBkYXRlID0gdGhpcy5tYXhEYXRlO1xuICAgICAgICAgICAgdGhpcy5zZXRDdXJyZW50SG91clBNKGRhdGUuZ2V0SG91cnMoKSk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRNaW51dGUgPSBkYXRlLmdldE1pbnV0ZXMoKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNlY29uZCA9IGRhdGUuZ2V0U2Vjb25kcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNTaW5nbGVTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVNb2RlbChkYXRlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzTXVsdGlwbGVTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVNb2RlbCh0aGlzLnZhbHVlID8gWy4uLnRoaXMudmFsdWUsIGRhdGVdIDogW2RhdGVdKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzUmFuZ2VTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMudmFsdWUgJiYgdGhpcy52YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnREYXRlID0gdGhpcy52YWx1ZVswXTtcbiAgICAgICAgICAgICAgICBsZXQgZW5kRGF0ZSA9IHRoaXMudmFsdWVbMV07XG5cbiAgICAgICAgICAgICAgICBpZiAoIWVuZERhdGUgJiYgZGF0ZS5nZXRUaW1lKCkgPj0gc3RhcnREYXRlLmdldFRpbWUoKSkge1xuICAgICAgICAgICAgICAgICAgICBlbmREYXRlID0gZGF0ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzdGFydERhdGUgPSBkYXRlO1xuICAgICAgICAgICAgICAgICAgICBlbmREYXRlID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKFtzdGFydERhdGUsIGVuZERhdGVdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVNb2RlbChbZGF0ZSwgbnVsbF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vblNlbGVjdC5lbWl0KGRhdGUpO1xuICAgIH1cblxuICAgIHVwZGF0ZU1vZGVsKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuXG4gICAgICAgIGlmICh0aGlzLmRhdGFUeXBlID09ICdkYXRlJykge1xuICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMudmFsdWUpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YVR5cGUgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU2luZ2xlU2VsZWN0aW9uKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy5mb3JtYXREYXRlVGltZSh0aGlzLnZhbHVlKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBzdHJpbmdBcnJWYWx1ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nQXJyVmFsdWUgPSB0aGlzLnZhbHVlLm1hcCgoZGF0ZTogRGF0ZSkgPT4gdGhpcy5mb3JtYXREYXRlVGltZShkYXRlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZShzdHJpbmdBcnJWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRGaXJzdERheU9mTW9udGhJbmRleChtb250aDogbnVtYmVyLCB5ZWFyOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGRheSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGRheS5zZXREYXRlKDEpO1xuICAgICAgICBkYXkuc2V0TW9udGgobW9udGgpO1xuICAgICAgICBkYXkuc2V0RnVsbFllYXIoeWVhcik7XG5cbiAgICAgICAgbGV0IGRheUluZGV4ID0gZGF5LmdldERheSgpICsgdGhpcy5nZXRTdW5kYXlJbmRleCgpO1xuICAgICAgICByZXR1cm4gZGF5SW5kZXggPj0gNyA/IGRheUluZGV4IC0gNyA6IGRheUluZGV4O1xuICAgIH1cblxuICAgIGdldERheXNDb3VudEluTW9udGgobW9udGg6IG51bWJlciwgeWVhcjogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiAzMiAtIHRoaXMuZGF5bGlnaHRTYXZpbmdBZGp1c3QobmV3IERhdGUoeWVhciwgbW9udGgsIDMyKSkuZ2V0RGF0ZSgpO1xuICAgIH1cblxuICAgIGdldERheXNDb3VudEluUHJldk1vbnRoKG1vbnRoOiBudW1iZXIsIHllYXI6IG51bWJlcikge1xuICAgICAgICBsZXQgcHJldiA9IHRoaXMuZ2V0UHJldmlvdXNNb250aEFuZFllYXIobW9udGgsIHllYXIpO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREYXlzQ291bnRJbk1vbnRoKHByZXYubW9udGgsIHByZXYueWVhcik7XG4gICAgfVxuXG4gICAgZ2V0UHJldmlvdXNNb250aEFuZFllYXIobW9udGg6IG51bWJlciwgeWVhcjogbnVtYmVyKSB7XG4gICAgICAgIGxldCBtLCB5O1xuXG4gICAgICAgIGlmIChtb250aCA9PT0gMCkge1xuICAgICAgICAgICAgbSA9IDExO1xuICAgICAgICAgICAgeSA9IHllYXIgLSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbSA9IG1vbnRoIC0gMTtcbiAgICAgICAgICAgIHkgPSB5ZWFyO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHsgbW9udGg6IG0sIHllYXI6IHkgfTtcbiAgICB9XG5cbiAgICBnZXROZXh0TW9udGhBbmRZZWFyKG1vbnRoOiBudW1iZXIsIHllYXI6IG51bWJlcikge1xuICAgICAgICBsZXQgbSwgeTtcblxuICAgICAgICBpZiAobW9udGggPT09IDExKSB7XG4gICAgICAgICAgICBtID0gMDtcbiAgICAgICAgICAgIHkgPSB5ZWFyICsgMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG0gPSBtb250aCArIDE7XG4gICAgICAgICAgICB5ID0geWVhcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7IG1vbnRoOiBtLCB5ZWFyOiB5IH07XG4gICAgfVxuXG4gICAgZ2V0U3VuZGF5SW5kZXgoKSB7XG4gICAgICAgIGxldCBmaXJzdERheU9mV2VlayA9IHRoaXMuZ2V0Rmlyc3REYXRlT2ZXZWVrKCk7XG5cbiAgICAgICAgcmV0dXJuIGZpcnN0RGF5T2ZXZWVrID4gMCA/IDcgLSBmaXJzdERheU9mV2VlayA6IDA7XG4gICAgfVxuXG4gICAgaXNTZWxlY3RlZChkYXRlTWV0YTogYW55KTogYm9vbGVhbiB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1NpbmdsZVNlbGVjdGlvbigpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNEYXRlRXF1YWxzKHRoaXMudmFsdWUsIGRhdGVNZXRhKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc011bHRpcGxlU2VsZWN0aW9uKCkpIHtcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBkYXRlIG9mIHRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSB0aGlzLmlzRGF0ZUVxdWFscyhkYXRlLCBkYXRlTWV0YSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZWN0ZWQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNSYW5nZVNlbGVjdGlvbigpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmFsdWVbMV0pIHJldHVybiB0aGlzLmlzRGF0ZUVxdWFscyh0aGlzLnZhbHVlWzBdLCBkYXRlTWV0YSkgfHwgdGhpcy5pc0RhdGVFcXVhbHModGhpcy52YWx1ZVsxXSwgZGF0ZU1ldGEpIHx8IHRoaXMuaXNEYXRlQmV0d2Vlbih0aGlzLnZhbHVlWzBdLCB0aGlzLnZhbHVlWzFdLCBkYXRlTWV0YSk7XG4gICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gdGhpcy5pc0RhdGVFcXVhbHModGhpcy52YWx1ZVswXSwgZGF0ZU1ldGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNDb21wYXJhYmxlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB0aGlzLnZhbHVlICE9PSAnc3RyaW5nJztcbiAgICB9XG5cbiAgICBpc01vbnRoU2VsZWN0ZWQobW9udGg6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5pc0NvbXBhcmFibGUoKSAmJiAhdGhpcy5pc011bHRpcGxlU2VsZWN0aW9uKCkpIHtcbiAgICAgICAgICAgIGNvbnN0IFtzdGFydCwgZW5kXSA9IHRoaXMuaXNSYW5nZVNlbGVjdGlvbigpID8gdGhpcy52YWx1ZSA6IFt0aGlzLnZhbHVlLCB0aGlzLnZhbHVlXTtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkID0gbmV3IERhdGUodGhpcy5jdXJyZW50WWVhciwgbW9udGgsIDEpO1xuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGVkID49IHN0YXJ0ICYmIHNlbGVjdGVkIDw9IChlbmQgPz8gc3RhcnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpc01vbnRoRGlzYWJsZWQobW9udGg6IG51bWJlcikge1xuICAgICAgICBmb3IgKGxldCBkYXkgPSAxOyBkYXkgPCB0aGlzLmdldERheXNDb3VudEluTW9udGgobW9udGgsIHRoaXMuY3VycmVudFllYXIpICsgMTsgZGF5KyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU2VsZWN0YWJsZShkYXksIG1vbnRoLCB0aGlzLmN1cnJlbnRZZWFyLCBmYWxzZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaXNZZWFyRGlzYWJsZWQoeWVhcikge1xuICAgICAgICByZXR1cm4gIXRoaXMuaXNTZWxlY3RhYmxlKDEsIHRoaXMuY3VycmVudE1vbnRoLCB5ZWFyLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgaXNZZWFyU2VsZWN0ZWQoeWVhcjogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLmlzQ29tcGFyYWJsZSgpKSB7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLmlzUmFuZ2VTZWxlY3Rpb24oKSA/IHRoaXMudmFsdWVbMF0gOiB0aGlzLnZhbHVlO1xuXG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuaXNNdWx0aXBsZVNlbGVjdGlvbigpID8gdmFsdWUuZ2V0RnVsbFllYXIoKSA9PT0geWVhciA6IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlzRGF0ZUVxdWFscyh2YWx1ZTogYW55LCBkYXRlTWV0YTogYW55KSB7XG4gICAgICAgIGlmICh2YWx1ZSAmJiBPYmplY3RVdGlscy5pc0RhdGUodmFsdWUpKSByZXR1cm4gdmFsdWUuZ2V0RGF0ZSgpID09PSBkYXRlTWV0YS5kYXkgJiYgdmFsdWUuZ2V0TW9udGgoKSA9PT0gZGF0ZU1ldGEubW9udGggJiYgdmFsdWUuZ2V0RnVsbFllYXIoKSA9PT0gZGF0ZU1ldGEueWVhcjtcbiAgICAgICAgZWxzZSByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaXNEYXRlQmV0d2VlbihzdGFydDogRGF0ZSwgZW5kOiBEYXRlLCBkYXRlTWV0YTogYW55KSB7XG4gICAgICAgIGxldCBiZXR3ZWVuOiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgIGlmIChPYmplY3RVdGlscy5pc0RhdGUoc3RhcnQpICYmIE9iamVjdFV0aWxzLmlzRGF0ZShlbmQpKSB7XG4gICAgICAgICAgICBsZXQgZGF0ZTogRGF0ZSA9IG5ldyBEYXRlKGRhdGVNZXRhLnllYXIsIGRhdGVNZXRhLm1vbnRoLCBkYXRlTWV0YS5kYXkpO1xuICAgICAgICAgICAgcmV0dXJuIHN0YXJ0LmdldFRpbWUoKSA8PSBkYXRlLmdldFRpbWUoKSAmJiBlbmQuZ2V0VGltZSgpID49IGRhdGUuZ2V0VGltZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGJldHdlZW47XG4gICAgfVxuXG4gICAgaXNTaW5nbGVTZWxlY3Rpb24oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbk1vZGUgPT09ICdzaW5nbGUnO1xuICAgIH1cblxuICAgIGlzUmFuZ2VTZWxlY3Rpb24oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbk1vZGUgPT09ICdyYW5nZSc7XG4gICAgfVxuXG4gICAgaXNNdWx0aXBsZVNlbGVjdGlvbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uTW9kZSA9PT0gJ211bHRpcGxlJztcbiAgICB9XG5cbiAgICBpc1RvZGF5KHRvZGF5OiBEYXRlLCBkYXk6IG51bWJlciwgbW9udGg6IG51bWJlciwgeWVhcjogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0b2RheS5nZXREYXRlKCkgPT09IGRheSAmJiB0b2RheS5nZXRNb250aCgpID09PSBtb250aCAmJiB0b2RheS5nZXRGdWxsWWVhcigpID09PSB5ZWFyO1xuICAgIH1cblxuICAgIGlzU2VsZWN0YWJsZShkYXk6IGFueSwgbW9udGg6IGFueSwgeWVhcjogYW55LCBvdGhlck1vbnRoOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IHZhbGlkTWluID0gdHJ1ZTtcbiAgICAgICAgbGV0IHZhbGlkTWF4ID0gdHJ1ZTtcbiAgICAgICAgbGV0IHZhbGlkRGF0ZSA9IHRydWU7XG4gICAgICAgIGxldCB2YWxpZERheSA9IHRydWU7XG5cbiAgICAgICAgaWYgKG90aGVyTW9udGggJiYgIXRoaXMuc2VsZWN0T3RoZXJNb250aHMpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1pbkRhdGUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1pbkRhdGUuZ2V0RnVsbFllYXIoKSA+IHllYXIpIHtcbiAgICAgICAgICAgICAgICB2YWxpZE1pbiA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1pbkRhdGUuZ2V0RnVsbFllYXIoKSA9PT0geWVhcikge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1pbkRhdGUuZ2V0TW9udGgoKSA+IG1vbnRoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkTWluID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1pbkRhdGUuZ2V0TW9udGgoKSA9PT0gbW9udGgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubWluRGF0ZS5nZXREYXRlKCkgPiBkYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkTWluID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5tYXhEYXRlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5tYXhEYXRlLmdldEZ1bGxZZWFyKCkgPCB5ZWFyKSB7XG4gICAgICAgICAgICAgICAgdmFsaWRNYXggPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tYXhEYXRlLmdldEZ1bGxZZWFyKCkgPT09IHllYXIpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXhEYXRlLmdldE1vbnRoKCkgPCBtb250aCkge1xuICAgICAgICAgICAgICAgICAgICB2YWxpZE1heCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tYXhEYXRlLmdldE1vbnRoKCkgPT09IG1vbnRoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1heERhdGUuZ2V0RGF0ZSgpIDwgZGF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZE1heCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWREYXRlcykge1xuICAgICAgICAgICAgdmFsaWREYXRlID0gIXRoaXMuaXNEYXRlRGlzYWJsZWQoZGF5LCBtb250aCwgeWVhcik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZERheXMpIHtcbiAgICAgICAgICAgIHZhbGlkRGF5ID0gIXRoaXMuaXNEYXlEaXNhYmxlZChkYXksIG1vbnRoLCB5ZWFyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWxpZE1pbiAmJiB2YWxpZE1heCAmJiB2YWxpZERhdGUgJiYgdmFsaWREYXk7XG4gICAgfVxuXG4gICAgaXNEYXRlRGlzYWJsZWQoZGF5OiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIHllYXI6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZERhdGVzKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBkaXNhYmxlZERhdGUgb2YgdGhpcy5kaXNhYmxlZERhdGVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRpc2FibGVkRGF0ZS5nZXRGdWxsWWVhcigpID09PSB5ZWFyICYmIGRpc2FibGVkRGF0ZS5nZXRNb250aCgpID09PSBtb250aCAmJiBkaXNhYmxlZERhdGUuZ2V0RGF0ZSgpID09PSBkYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlzRGF5RGlzYWJsZWQoZGF5OiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIHllYXI6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZERheXMpIHtcbiAgICAgICAgICAgIGxldCB3ZWVrZGF5ID0gbmV3IERhdGUoeWVhciwgbW9udGgsIGRheSk7XG4gICAgICAgICAgICBsZXQgd2Vla2RheU51bWJlciA9IHdlZWtkYXkuZ2V0RGF5KCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaXNhYmxlZERheXMuaW5kZXhPZih3ZWVrZGF5TnVtYmVyKSAhPT0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIG9uSW5wdXRGb2N1cyhldmVudDogRXZlbnQpIHtcbiAgICAgICAgdGhpcy5mb2N1cyA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLnNob3dPbkZvY3VzKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dPdmVybGF5KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vbkZvY3VzLmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIG9uSW5wdXRDbGljaygpIHtcbiAgICAgICAgaWYgKHRoaXMuc2hvd09uRm9jdXMgJiYgIXRoaXMub3ZlcmxheVZpc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd092ZXJsYXkoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSW5wdXRCbHVyKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLmZvY3VzID0gZmFsc2U7XG4gICAgICAgIHRoaXMub25CbHVyLmVtaXQoZXZlbnQpO1xuICAgICAgICBpZiAoIXRoaXMua2VlcEludmFsaWQpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSW5wdXRmaWVsZCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcbiAgICB9XG5cbiAgICBvbkJ1dHRvbkNsaWNrKGV2ZW50OiBFdmVudCwgaW5wdXRmaWVsZDogYW55KSB7XG4gICAgICAgIGlmICghdGhpcy5vdmVybGF5VmlzaWJsZSkge1xuICAgICAgICAgICAgaW5wdXRmaWVsZC5mb2N1cygpO1xuICAgICAgICAgICAgdGhpcy5zaG93T3ZlcmxheSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5oaWRlT3ZlcmxheSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMuaW5wdXRGaWVsZFZhbHVlID0gbnVsbDtcbiAgICAgICAgdGhpcy52YWx1ZSA9IG51bGw7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgdGhpcy5vbkNsZWFyLmVtaXQoKTtcbiAgICB9XG5cbiAgICBvbk92ZXJsYXlDbGljayhldmVudDogRXZlbnQpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5U2VydmljZS5hZGQoe1xuICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICB0YXJnZXQ6IHRoaXMuZWwubmF0aXZlRWxlbWVudFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRNb250aE5hbWUoaW5kZXg6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuZ2V0VHJhbnNsYXRpb24oJ21vbnRoTmFtZXMnKVtpbmRleF07XG4gICAgfVxuXG4gICAgZ2V0WWVhcihtb250aDogYW55KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRWaWV3ID09PSAnbW9udGgnID8gdGhpcy5jdXJyZW50WWVhciA6IG1vbnRoLnllYXI7XG4gICAgfVxuXG4gICAgc3dpdGNoVmlld0J1dHRvbkRpc2FibGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5udW1iZXJPZk1vbnRocyA+IDEgfHwgdGhpcy5kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBvblByZXZCdXR0b25DbGljayhldmVudDogRXZlbnQpIHtcbiAgICAgICAgdGhpcy5uYXZpZ2F0aW9uU3RhdGUgPSB7IGJhY2t3YXJkOiB0cnVlLCBidXR0b246IHRydWUgfTtcbiAgICAgICAgdGhpcy5uYXZCYWNrd2FyZChldmVudCk7XG4gICAgfVxuXG4gICAgb25OZXh0QnV0dG9uQ2xpY2soZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMubmF2aWdhdGlvblN0YXRlID0geyBiYWNrd2FyZDogZmFsc2UsIGJ1dHRvbjogdHJ1ZSB9O1xuICAgICAgICB0aGlzLm5hdkZvcndhcmQoZXZlbnQpO1xuICAgIH1cblxuICAgIG9uQ29udGFpbmVyQnV0dG9uS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG4gICAgICAgICAgICAvL3RhYlxuICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pbmxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFwRm9jdXMoZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pbmxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVhZGVyRWxlbWVudHMgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5jb250YWluZXJWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQsICcucC1kYXRlcGlja2VyLWhlYWRlcicpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudCA9PSBoZWFkZXJFbGVtZW50cy5jaGlsZHJlbltoZWFkZXJFbGVtZW50cy5jaGlsZHJlbi5sZW5ndGggLSAxXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0Rm9jdXNhYmxlQ2VsbCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvL2VzY2FwZVxuICAgICAgICAgICAgY2FzZSAyNzpcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0ZmllbGRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXlWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAvL05vb3BcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSW5wdXRLZXlkb3duKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgdGhpcy5pc0tleWRvd24gPSB0cnVlO1xuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gNDAgJiYgdGhpcy5jb250ZW50Vmlld0NoaWxkKSB7XG4gICAgICAgICAgICB0aGlzLnRyYXBGb2N1cyhldmVudCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMjcpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm92ZXJsYXlWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dGZpZWxkVmlld0NoaWxkPy5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5VmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm92ZXJsYXlWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5VmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gOSAmJiB0aGlzLmNvbnRlbnRWaWV3Q2hpbGQpIHtcbiAgICAgICAgICAgIERvbUhhbmRsZXIuZ2V0Rm9jdXNhYmxlRWxlbWVudHModGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpLmZvckVhY2goKGVsKSA9PiAoZWwudGFiSW5kZXggPSAnLTEnKSk7XG4gICAgICAgICAgICBpZiAodGhpcy5vdmVybGF5VmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRGF0ZUNlbGxLZXlkb3duKGV2ZW50OiBhbnksIGRhdGU6IERhdGUsIGdyb3VwSW5kZXg6IG51bWJlcikge1xuICAgICAgICBjb25zdCBjZWxsQ29udGVudCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBjZWxsQ29udGVudC5wYXJlbnRFbGVtZW50O1xuXG4gICAgICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcbiAgICAgICAgICAgIC8vZG93biBhcnJvd1xuICAgICAgICAgICAgY2FzZSA0MDoge1xuICAgICAgICAgICAgICAgIGNlbGxDb250ZW50LnRhYkluZGV4ID0gJy0xJztcbiAgICAgICAgICAgICAgICBsZXQgY2VsbEluZGV4ID0gRG9tSGFuZGxlci5pbmRleChjZWxsKTtcbiAgICAgICAgICAgICAgICBsZXQgbmV4dFJvdyA9IGNlbGwucGFyZW50RWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgaWYgKG5leHRSb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZvY3VzQ2VsbCA9IG5leHRSb3cuY2hpbGRyZW5bY2VsbEluZGV4XS5jaGlsZHJlblswXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKERvbUhhbmRsZXIuaGFzQ2xhc3MoZm9jdXNDZWxsLCAncC1kaXNhYmxlZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRpb25TdGF0ZSA9IHsgYmFja3dhcmQ6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdkZvcndhcmQoZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFJvdy5jaGlsZHJlbltjZWxsSW5kZXhdLmNoaWxkcmVuWzBdLnRhYkluZGV4ID0gJzAnO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFJvdy5jaGlsZHJlbltjZWxsSW5kZXhdLmNoaWxkcmVuWzBdLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRpb25TdGF0ZSA9IHsgYmFja3dhcmQ6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmF2Rm9yd2FyZChldmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vdXAgYXJyb3dcbiAgICAgICAgICAgIGNhc2UgMzg6IHtcbiAgICAgICAgICAgICAgICBjZWxsQ29udGVudC50YWJJbmRleCA9ICctMSc7XG4gICAgICAgICAgICAgICAgbGV0IGNlbGxJbmRleCA9IERvbUhhbmRsZXIuaW5kZXgoY2VsbCk7XG4gICAgICAgICAgICAgICAgbGV0IHByZXZSb3cgPSBjZWxsLnBhcmVudEVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICAgICAgICAgICAgICBpZiAocHJldlJvdykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZm9jdXNDZWxsID0gcHJldlJvdy5jaGlsZHJlbltjZWxsSW5kZXhdLmNoaWxkcmVuWzBdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoRG9tSGFuZGxlci5oYXNDbGFzcyhmb2N1c0NlbGwsICdwLWRpc2FibGVkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGlvblN0YXRlID0geyBiYWNrd2FyZDogdHJ1ZSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZCYWNrd2FyZChldmVudCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb2N1c0NlbGwudGFiSW5kZXggPSAnMCc7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb2N1c0NlbGwuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGlvblN0YXRlID0geyBiYWNrd2FyZDogdHJ1ZSB9O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdkJhY2t3YXJkKGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9sZWZ0IGFycm93XG4gICAgICAgICAgICBjYXNlIDM3OiB7XG4gICAgICAgICAgICAgICAgY2VsbENvbnRlbnQudGFiSW5kZXggPSAnLTEnO1xuICAgICAgICAgICAgICAgIGxldCBwcmV2Q2VsbCA9IGNlbGwucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICAgICAgICAgICAgICBpZiAocHJldkNlbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZvY3VzQ2VsbCA9IHByZXZDZWxsLmNoaWxkcmVuWzBdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoRG9tSGFuZGxlci5oYXNDbGFzcyhmb2N1c0NlbGwsICdwLWRpc2FibGVkJykgfHwgRG9tSGFuZGxlci5oYXNDbGFzcyhmb2N1c0NlbGwucGFyZW50RWxlbWVudCwgJ3AtZGF0ZXBpY2tlci13ZWVrbnVtYmVyJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVUb01vbnRoKHRydWUsIGdyb3VwSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXNDZWxsLnRhYkluZGV4ID0gJzAnO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXNDZWxsLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlVG9Nb250aCh0cnVlLCBncm91cEluZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9yaWdodCBhcnJvd1xuICAgICAgICAgICAgY2FzZSAzOToge1xuICAgICAgICAgICAgICAgIGNlbGxDb250ZW50LnRhYkluZGV4ID0gJy0xJztcbiAgICAgICAgICAgICAgICBsZXQgbmV4dENlbGwgPSBjZWxsLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgICAgICAgICBpZiAobmV4dENlbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZvY3VzQ2VsbCA9IG5leHRDZWxsLmNoaWxkcmVuWzBdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoRG9tSGFuZGxlci5oYXNDbGFzcyhmb2N1c0NlbGwsICdwLWRpc2FibGVkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVUb01vbnRoKGZhbHNlLCBncm91cEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzQ2VsbC50YWJJbmRleCA9ICcwJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzQ2VsbC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZVRvTW9udGgoZmFsc2UsIGdyb3VwSW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL2VudGVyXG4gICAgICAgICAgICAvL3NwYWNlXG4gICAgICAgICAgICBjYXNlIDEzOlxuICAgICAgICAgICAgY2FzZSAzMjoge1xuICAgICAgICAgICAgICAgIHRoaXMub25EYXRlU2VsZWN0KGV2ZW50LCBkYXRlKTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL2VzY2FwZVxuICAgICAgICAgICAgY2FzZSAyNzoge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRmaWVsZFZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL3RhYlxuICAgICAgICAgICAgY2FzZSA5OiB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlubGluZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYXBGb2N1cyhldmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIC8vbm8gb3BcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uTW9udGhDZWxsS2V5ZG93bihldmVudDogYW55LCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG4gICAgICAgICAgICAvL2Fycm93c1xuICAgICAgICAgICAgY2FzZSAzODpcbiAgICAgICAgICAgIGNhc2UgNDA6IHtcbiAgICAgICAgICAgICAgICBjZWxsLnRhYkluZGV4ID0gJy0xJztcbiAgICAgICAgICAgICAgICB2YXIgY2VsbHMgPSBjZWxsLnBhcmVudEVsZW1lbnQuY2hpbGRyZW47XG4gICAgICAgICAgICAgICAgdmFyIGNlbGxJbmRleCA9IERvbUhhbmRsZXIuaW5kZXgoY2VsbCk7XG4gICAgICAgICAgICAgICAgbGV0IG5leHRDZWxsID0gY2VsbHNbZXZlbnQud2hpY2ggPT09IDQwID8gY2VsbEluZGV4ICsgMyA6IGNlbGxJbmRleCAtIDNdO1xuICAgICAgICAgICAgICAgIGlmIChuZXh0Q2VsbCkge1xuICAgICAgICAgICAgICAgICAgICBuZXh0Q2VsbC50YWJJbmRleCA9ICcwJztcbiAgICAgICAgICAgICAgICAgICAgbmV4dENlbGwuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9sZWZ0IGFycm93XG4gICAgICAgICAgICBjYXNlIDM3OiB7XG4gICAgICAgICAgICAgICAgY2VsbC50YWJJbmRleCA9ICctMSc7XG4gICAgICAgICAgICAgICAgbGV0IHByZXZDZWxsID0gY2VsbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIGlmIChwcmV2Q2VsbCkge1xuICAgICAgICAgICAgICAgICAgICBwcmV2Q2VsbC50YWJJbmRleCA9ICcwJztcbiAgICAgICAgICAgICAgICAgICAgcHJldkNlbGwuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRpb25TdGF0ZSA9IHsgYmFja3dhcmQ6IHRydWUgfTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZCYWNrd2FyZChldmVudCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9yaWdodCBhcnJvd1xuICAgICAgICAgICAgY2FzZSAzOToge1xuICAgICAgICAgICAgICAgIGNlbGwudGFiSW5kZXggPSAnLTEnO1xuICAgICAgICAgICAgICAgIGxldCBuZXh0Q2VsbCA9IGNlbGwubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIGlmIChuZXh0Q2VsbCkge1xuICAgICAgICAgICAgICAgICAgICBuZXh0Q2VsbC50YWJJbmRleCA9ICcwJztcbiAgICAgICAgICAgICAgICAgICAgbmV4dENlbGwuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRpb25TdGF0ZSA9IHsgYmFja3dhcmQ6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmF2Rm9yd2FyZChldmVudCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9lbnRlclxuICAgICAgICAgICAgLy9zcGFjZVxuICAgICAgICAgICAgY2FzZSAxMzpcbiAgICAgICAgICAgIGNhc2UgMzI6IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uTW9udGhTZWxlY3QoZXZlbnQsIGluZGV4KTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL2VzY2FwZVxuICAgICAgICAgICAgY2FzZSAyNzoge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRmaWVsZFZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL3RhYlxuICAgICAgICAgICAgY2FzZSA5OiB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlubGluZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYXBGb2N1cyhldmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIC8vbm8gb3BcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uWWVhckNlbGxLZXlkb3duKGV2ZW50OiBhbnksIGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgY2VsbCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG5cbiAgICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgICAgICAgLy9hcnJvd3NcbiAgICAgICAgICAgIGNhc2UgMzg6XG4gICAgICAgICAgICBjYXNlIDQwOiB7XG4gICAgICAgICAgICAgICAgY2VsbC50YWJJbmRleCA9ICctMSc7XG4gICAgICAgICAgICAgICAgdmFyIGNlbGxzID0gY2VsbC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuO1xuICAgICAgICAgICAgICAgIHZhciBjZWxsSW5kZXggPSBEb21IYW5kbGVyLmluZGV4KGNlbGwpO1xuICAgICAgICAgICAgICAgIGxldCBuZXh0Q2VsbCA9IGNlbGxzW2V2ZW50LndoaWNoID09PSA0MCA/IGNlbGxJbmRleCArIDIgOiBjZWxsSW5kZXggLSAyXTtcbiAgICAgICAgICAgICAgICBpZiAobmV4dENlbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dENlbGwudGFiSW5kZXggPSAnMCc7XG4gICAgICAgICAgICAgICAgICAgIG5leHRDZWxsLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vbGVmdCBhcnJvd1xuICAgICAgICAgICAgY2FzZSAzNzoge1xuICAgICAgICAgICAgICAgIGNlbGwudGFiSW5kZXggPSAnLTEnO1xuICAgICAgICAgICAgICAgIGxldCBwcmV2Q2VsbCA9IGNlbGwucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICAgICAgICAgICAgICBpZiAocHJldkNlbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldkNlbGwudGFiSW5kZXggPSAnMCc7XG4gICAgICAgICAgICAgICAgICAgIHByZXZDZWxsLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0aW9uU3RhdGUgPSB7IGJhY2t3YXJkOiB0cnVlIH07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmF2QmFja3dhcmQoZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vcmlnaHQgYXJyb3dcbiAgICAgICAgICAgIGNhc2UgMzk6IHtcbiAgICAgICAgICAgICAgICBjZWxsLnRhYkluZGV4ID0gJy0xJztcbiAgICAgICAgICAgICAgICBsZXQgbmV4dENlbGwgPSBjZWxsLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgICAgICAgICBpZiAobmV4dENlbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dENlbGwudGFiSW5kZXggPSAnMCc7XG4gICAgICAgICAgICAgICAgICAgIG5leHRDZWxsLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0aW9uU3RhdGUgPSB7IGJhY2t3YXJkOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdkZvcndhcmQoZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vZW50ZXJcbiAgICAgICAgICAgIC8vc3BhY2VcbiAgICAgICAgICAgIGNhc2UgMTM6XG4gICAgICAgICAgICBjYXNlIDMyOiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vblllYXJTZWxlY3QoZXZlbnQsIGluZGV4KTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL2VzY2FwZVxuICAgICAgICAgICAgY2FzZSAyNzoge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRmaWVsZFZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL3RhYlxuICAgICAgICAgICAgY2FzZSA5OiB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmFwRm9jdXMoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIC8vbm8gb3BcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5hdmlnYXRlVG9Nb250aChwcmV2OiBhbnksIGdyb3VwSW5kZXg6IG51bWJlcikge1xuICAgICAgICBpZiAocHJldikge1xuICAgICAgICAgICAgaWYgKHRoaXMubnVtYmVyT2ZNb250aHMgPT09IDEgfHwgZ3JvdXBJbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGlvblN0YXRlID0geyBiYWNrd2FyZDogdHJ1ZSB9O1xuICAgICAgICAgICAgICAgIHRoaXMubmF2QmFja3dhcmQoZXZlbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgcHJldk1vbnRoQ29udGFpbmVyID0gdGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bZ3JvdXBJbmRleCAtIDFdO1xuICAgICAgICAgICAgICAgIGxldCBjZWxscyA9IERvbUhhbmRsZXIuZmluZChwcmV2TW9udGhDb250YWluZXIsICcucC1kYXRlcGlja2VyLWNhbGVuZGFyIHRkIHNwYW46bm90KC5wLWRpc2FibGVkKTpub3QoLnAtaW5rKScpO1xuICAgICAgICAgICAgICAgIGxldCBmb2N1c0NlbGwgPSBjZWxsc1tjZWxscy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICBmb2N1c0NlbGwudGFiSW5kZXggPSAnMCc7XG4gICAgICAgICAgICAgICAgZm9jdXNDZWxsLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5udW1iZXJPZk1vbnRocyA9PT0gMSB8fCBncm91cEluZGV4ID09PSB0aGlzLm51bWJlck9mTW9udGhzIC0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGlvblN0YXRlID0geyBiYWNrd2FyZDogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICB0aGlzLm5hdkZvcndhcmQoZXZlbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgbmV4dE1vbnRoQ29udGFpbmVyID0gdGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bZ3JvdXBJbmRleCArIDFdO1xuICAgICAgICAgICAgICAgIGxldCBmb2N1c0NlbGwgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUobmV4dE1vbnRoQ29udGFpbmVyLCAnLnAtZGF0ZXBpY2tlci1jYWxlbmRhciB0ZCBzcGFuOm5vdCgucC1kaXNhYmxlZCk6bm90KC5wLWluayknKTtcbiAgICAgICAgICAgICAgICBmb2N1c0NlbGwudGFiSW5kZXggPSAnMCc7XG4gICAgICAgICAgICAgICAgZm9jdXNDZWxsLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVGb2N1cygpIHtcbiAgICAgICAgbGV0IGNlbGw7XG5cbiAgICAgICAgaWYgKHRoaXMubmF2aWdhdGlvblN0YXRlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5uYXZpZ2F0aW9uU3RhdGUuYnV0dG9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbml0Rm9jdXNhYmxlQ2VsbCgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubmF2aWdhdGlvblN0YXRlLmJhY2t3YXJkKSBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICcucC1kYXRlcGlja2VyLXByZXYnKS5mb2N1cygpO1xuICAgICAgICAgICAgICAgIGVsc2UgRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAnLnAtZGF0ZXBpY2tlci1uZXh0JykuZm9jdXMoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubmF2aWdhdGlvblN0YXRlLmJhY2t3YXJkKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjZWxscztcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50VmlldyA9PT0gJ21vbnRoJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbHMgPSBEb21IYW5kbGVyLmZpbmQodGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICcucC1tb250aHBpY2tlciAucC1tb250aHBpY2tlci1tb250aDpub3QoLnAtZGlzYWJsZWQpJyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50VmlldyA9PT0gJ3llYXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxscyA9IERvbUhhbmRsZXIuZmluZCh0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgJy5wLXllYXJwaWNrZXIgLnAteWVhcnBpY2tlci15ZWFyOm5vdCgucC1kaXNhYmxlZCknKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxzID0gRG9tSGFuZGxlci5maW5kKHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAnLnAtZGF0ZXBpY2tlci1jYWxlbmRhciB0ZCBzcGFuOm5vdCgucC1kaXNhYmxlZCk6bm90KC5wLWluayknKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjZWxscyAmJiBjZWxscy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsID0gY2VsbHNbY2VsbHMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50VmlldyA9PT0gJ21vbnRoJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbCA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgJy5wLW1vbnRocGlja2VyIC5wLW1vbnRocGlja2VyLW1vbnRoOm5vdCgucC1kaXNhYmxlZCknKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnRWaWV3ID09PSAneWVhcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGwgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICcucC15ZWFycGlja2VyIC5wLXllYXJwaWNrZXIteWVhcjpub3QoLnAtZGlzYWJsZWQpJyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAnLnAtZGF0ZXBpY2tlci1jYWxlbmRhciB0ZCBzcGFuOm5vdCgucC1kaXNhYmxlZCk6bm90KC5wLWluayknKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjZWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwudGFiSW5kZXggPSAnMCc7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMubmF2aWdhdGlvblN0YXRlID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdEZvY3VzYWJsZUNlbGwoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXRGb2N1c2FibGVDZWxsKCkge1xuICAgICAgICBjb25zdCBjb250ZW50RWwgPSB0aGlzLmNvbnRlbnRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGxldCBjZWxsITogYW55O1xuXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRWaWV3ID09PSAnbW9udGgnKSB7XG4gICAgICAgICAgICBsZXQgY2VsbHMgPSBEb21IYW5kbGVyLmZpbmQoY29udGVudEVsLCAnLnAtbW9udGhwaWNrZXIgLnAtbW9udGhwaWNrZXItbW9udGg6bm90KC5wLWRpc2FibGVkKScpO1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkQ2VsbCA9IERvbUhhbmRsZXIuZmluZFNpbmdsZShjb250ZW50RWwsICcucC1tb250aHBpY2tlciAucC1tb250aHBpY2tlci1tb250aC5wLWhpZ2hsaWdodCcpO1xuICAgICAgICAgICAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4gKGNlbGwudGFiSW5kZXggPSAtMSkpO1xuICAgICAgICAgICAgY2VsbCA9IHNlbGVjdGVkQ2VsbCB8fCBjZWxsc1swXTtcblxuICAgICAgICAgICAgaWYgKGNlbGxzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGxldCBkaXNhYmxlZENlbGxzID0gRG9tSGFuZGxlci5maW5kKGNvbnRlbnRFbCwgJy5wLW1vbnRocGlja2VyIC5wLW1vbnRocGlja2VyLW1vbnRoLnAtZGlzYWJsZWRbdGFiaW5kZXggPSBcIjBcIl0nKTtcbiAgICAgICAgICAgICAgICBkaXNhYmxlZENlbGxzLmZvckVhY2goKGNlbGwpID0+IChjZWxsLnRhYkluZGV4ID0gLTEpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnRWaWV3ID09PSAneWVhcicpIHtcbiAgICAgICAgICAgIGxldCBjZWxscyA9IERvbUhhbmRsZXIuZmluZChjb250ZW50RWwsICcucC15ZWFycGlja2VyIC5wLXllYXJwaWNrZXIteWVhcjpub3QoLnAtZGlzYWJsZWQpJyk7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRDZWxsID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKGNvbnRlbnRFbCwgJy5wLXllYXJwaWNrZXIgLnAteWVhcnBpY2tlci15ZWFyLnAtaGlnaGxpZ2h0Jyk7XG4gICAgICAgICAgICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiAoY2VsbC50YWJJbmRleCA9IC0xKSk7XG4gICAgICAgICAgICBjZWxsID0gc2VsZWN0ZWRDZWxsIHx8IGNlbGxzWzBdO1xuXG4gICAgICAgICAgICBpZiAoY2VsbHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRpc2FibGVkQ2VsbHMgPSBEb21IYW5kbGVyLmZpbmQoY29udGVudEVsLCAnLnAteWVhcnBpY2tlciAucC15ZWFycGlja2VyLXllYXIucC1kaXNhYmxlZFt0YWJpbmRleCA9IFwiMFwiXScpO1xuICAgICAgICAgICAgICAgIGRpc2FibGVkQ2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4gKGNlbGwudGFiSW5kZXggPSAtMSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2VsbCA9IERvbUhhbmRsZXIuZmluZFNpbmdsZShjb250ZW50RWwsICdzcGFuLnAtaGlnaGxpZ2h0Jyk7XG4gICAgICAgICAgICBpZiAoIWNlbGwpIHtcbiAgICAgICAgICAgICAgICBsZXQgdG9kYXlDZWxsID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKGNvbnRlbnRFbCwgJ3RkLnAtZGF0ZXBpY2tlci10b2RheSBzcGFuOm5vdCgucC1kaXNhYmxlZCk6bm90KC5wLWluayknKTtcbiAgICAgICAgICAgICAgICBpZiAodG9kYXlDZWxsKSBjZWxsID0gdG9kYXlDZWxsO1xuICAgICAgICAgICAgICAgIGVsc2UgY2VsbCA9IERvbUhhbmRsZXIuZmluZFNpbmdsZShjb250ZW50RWwsICcucC1kYXRlcGlja2VyLWNhbGVuZGFyIHRkIHNwYW46bm90KC5wLWRpc2FibGVkKTpub3QoLnAtaW5rKScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNlbGwpIHtcbiAgICAgICAgICAgIGNlbGwudGFiSW5kZXggPSAnMCc7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5wcmV2ZW50Rm9jdXMgJiYgKCF0aGlzLm5hdmlnYXRpb25TdGF0ZSB8fCAhdGhpcy5uYXZpZ2F0aW9uU3RhdGUuYnV0dG9uKSkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGwuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnByZXZlbnRGb2N1cyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdHJhcEZvY3VzKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgbGV0IGZvY3VzYWJsZUVsZW1lbnRzID0gRG9tSGFuZGxlci5nZXRGb2N1c2FibGVFbGVtZW50cyh0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCk7XG5cbiAgICAgICAgaWYgKGZvY3VzYWJsZUVsZW1lbnRzICYmIGZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGlmICghZm9jdXNhYmxlRWxlbWVudHNbMF0ub3duZXJEb2N1bWVudC5hY3RpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgZm9jdXNhYmxlRWxlbWVudHNbMF0uZm9jdXMoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IGZvY3VzZWRJbmRleCA9IGZvY3VzYWJsZUVsZW1lbnRzLmluZGV4T2YoZm9jdXNhYmxlRWxlbWVudHNbMF0ub3duZXJEb2N1bWVudC5hY3RpdmVFbGVtZW50KTtcblxuICAgICAgICAgICAgICAgIGlmIChldmVudC5zaGlmdEtleSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZm9jdXNlZEluZGV4ID09IC0xIHx8IGZvY3VzZWRJbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZm9jdXNUcmFwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXNhYmxlRWxlbWVudHNbZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoIC0gMV0uZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvY3VzZWRJbmRleCA9PT0gLTEpIHJldHVybiB0aGlzLmhpZGVPdmVybGF5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZm9jdXNlZEluZGV4ID09PSAwKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb2N1c2FibGVFbGVtZW50c1tmb2N1c2VkSW5kZXggLSAxXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZvY3VzZWRJbmRleCA9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudGltZU9ubHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb2N1c2FibGVFbGVtZW50c1swXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3BhbkluZGV4ID0gMDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvY3VzYWJsZUVsZW1lbnRzW2ldLnRhZ05hbWUgPT09ICdTUEFOJykgc3BhbkluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb2N1c2FibGVFbGVtZW50c1tzcGFuSW5kZXhdLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZm9jdXNlZEluZGV4ID09PSBmb2N1c2FibGVFbGVtZW50cy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZm9jdXNUcmFwICYmIGZvY3VzZWRJbmRleCAhPSAtMSkgcmV0dXJuIHRoaXMuaGlkZU92ZXJsYXkoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXNhYmxlRWxlbWVudHNbMF0uZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzYWJsZUVsZW1lbnRzW2ZvY3VzZWRJbmRleCArIDFdLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uTW9udGhEcm9wZG93bkNoYW5nZShtOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50TW9udGggPSBwYXJzZUludChtKTtcbiAgICAgICAgdGhpcy5vbk1vbnRoQ2hhbmdlLmVtaXQoeyBtb250aDogdGhpcy5jdXJyZW50TW9udGggKyAxLCB5ZWFyOiB0aGlzLmN1cnJlbnRZZWFyIH0pO1xuICAgICAgICB0aGlzLmNyZWF0ZU1vbnRocyh0aGlzLmN1cnJlbnRNb250aCwgdGhpcy5jdXJyZW50WWVhcik7XG4gICAgfVxuXG4gICAgb25ZZWFyRHJvcGRvd25DaGFuZ2UoeTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFllYXIgPSBwYXJzZUludCh5KTtcbiAgICAgICAgdGhpcy5vblllYXJDaGFuZ2UuZW1pdCh7IG1vbnRoOiB0aGlzLmN1cnJlbnRNb250aCArIDEsIHllYXI6IHRoaXMuY3VycmVudFllYXIgfSk7XG4gICAgICAgIHRoaXMuY3JlYXRlTW9udGhzKHRoaXMuY3VycmVudE1vbnRoLCB0aGlzLmN1cnJlbnRZZWFyKTtcbiAgICB9XG5cbiAgICBjb252ZXJ0VG8yNEhvdXIgPSBmdW5jdGlvbiAoaG91cnM6IG51bWJlciwgcG06IGJvb2xlYW4pIHtcbiAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgIGlmICh0aGlzLmhvdXJGb3JtYXQgPT0gJzEyJykge1xuICAgICAgICAgICAgaWYgKGhvdXJzID09PSAxMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBwbSA/IDEyIDogMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBtID8gaG91cnMgKyAxMiA6IGhvdXJzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBob3VycztcbiAgICB9O1xuXG4gICAgdmFsaWRhdGVUaW1lKGhvdXI6IG51bWJlciwgbWludXRlOiBudW1iZXIsIHNlY29uZDogbnVtYmVyLCBwbTogYm9vbGVhbikge1xuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgICBjb25zdCBjb252ZXJ0ZWRIb3VyID0gdGhpcy5jb252ZXJ0VG8yNEhvdXIoaG91ciwgcG0pO1xuICAgICAgICBpZiAodGhpcy5pc1JhbmdlU2VsZWN0aW9uKCkpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy52YWx1ZVsxXSB8fCB0aGlzLnZhbHVlWzBdO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmlzTXVsdGlwbGVTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnZhbHVlW3RoaXMudmFsdWUubGVuZ3RoIC0gMV07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdmFsdWVEYXRlU3RyaW5nID0gdmFsdWUgPyB2YWx1ZS50b0RhdGVTdHJpbmcoKSA6IG51bGw7XG4gICAgICAgIGlmICh0aGlzLm1pbkRhdGUgJiYgdmFsdWVEYXRlU3RyaW5nICYmIHRoaXMubWluRGF0ZS50b0RhdGVTdHJpbmcoKSA9PT0gdmFsdWVEYXRlU3RyaW5nKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5taW5EYXRlLmdldEhvdXJzKCkgPiBjb252ZXJ0ZWRIb3VyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMubWluRGF0ZS5nZXRIb3VycygpID09PSBjb252ZXJ0ZWRIb3VyKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWluRGF0ZS5nZXRNaW51dGVzKCkgPiBtaW51dGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5taW5EYXRlLmdldE1pbnV0ZXMoKSA9PT0gbWludXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1pbkRhdGUuZ2V0U2Vjb25kcygpID4gc2Vjb25kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5tYXhEYXRlICYmIHZhbHVlRGF0ZVN0cmluZyAmJiB0aGlzLm1heERhdGUudG9EYXRlU3RyaW5nKCkgPT09IHZhbHVlRGF0ZVN0cmluZykge1xuICAgICAgICAgICAgaWYgKHRoaXMubWF4RGF0ZS5nZXRIb3VycygpIDwgY29udmVydGVkSG91cikge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLm1heERhdGUuZ2V0SG91cnMoKSA9PT0gY29udmVydGVkSG91cikge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1heERhdGUuZ2V0TWludXRlcygpIDwgbWludXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWF4RGF0ZS5nZXRNaW51dGVzKCkgPT09IG1pbnV0ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXhEYXRlLmdldFNlY29uZHMoKSA8IHNlY29uZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGluY3JlbWVudEhvdXIoZXZlbnQ6IGFueSkge1xuICAgICAgICBjb25zdCBwcmV2SG91ciA9IHRoaXMuY3VycmVudEhvdXI7XG4gICAgICAgIGxldCBuZXdIb3VyID0gPG51bWJlcj50aGlzLmN1cnJlbnRIb3VyICsgdGhpcy5zdGVwSG91cjtcbiAgICAgICAgbGV0IG5ld1BNID0gdGhpcy5wbTtcblxuICAgICAgICBpZiAodGhpcy5ob3VyRm9ybWF0ID09ICcyNCcpIG5ld0hvdXIgPSBuZXdIb3VyID49IDI0ID8gbmV3SG91ciAtIDI0IDogbmV3SG91cjtcbiAgICAgICAgZWxzZSBpZiAodGhpcy5ob3VyRm9ybWF0ID09ICcxMicpIHtcbiAgICAgICAgICAgIC8vIEJlZm9yZSB0aGUgQU0vUE0gYnJlYWssIG5vdyBhZnRlclxuICAgICAgICAgICAgaWYgKDxudW1iZXI+cHJldkhvdXIgPCAxMiAmJiBuZXdIb3VyID4gMTEpIHtcbiAgICAgICAgICAgICAgICBuZXdQTSA9ICF0aGlzLnBtO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV3SG91ciA9IG5ld0hvdXIgPj0gMTMgPyBuZXdIb3VyIC0gMTIgOiBuZXdIb3VyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudmFsaWRhdGVUaW1lKG5ld0hvdXIsIDxhbnk+dGhpcy5jdXJyZW50TWludXRlLCA8YW55PnRoaXMuY3VycmVudFNlY29uZCwgPGFueT5uZXdQTSkpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEhvdXIgPSBuZXdIb3VyO1xuICAgICAgICAgICAgdGhpcy5wbSA9IG5ld1BNO1xuICAgICAgICB9XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25UaW1lUGlja2VyRWxlbWVudE1vdXNlRG93bihldmVudDogRXZlbnQsIHR5cGU6IG51bWJlciwgZGlyZWN0aW9uOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLnJlcGVhdChldmVudCwgbnVsbCwgdHlwZSwgZGlyZWN0aW9uKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblRpbWVQaWNrZXJFbGVtZW50TW91c2VVcChldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyVGltZVBpY2tlclRpbWVyKCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRpbWUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uVGltZVBpY2tlckVsZW1lbnRNb3VzZUxlYXZlKCkge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQgJiYgdGhpcy50aW1lUGlja2VyVGltZXIpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJUaW1lUGlja2VyVGltZXIoKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVGltZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVwZWF0KGV2ZW50OiBFdmVudCB8IG51bGwsIGludGVydmFsOiBudW1iZXIgfCBudWxsLCB0eXBlOiBudW1iZXIgfCBudWxsLCBkaXJlY3Rpb246IG51bWJlciB8IG51bGwpIHtcbiAgICAgICAgbGV0IGkgPSBpbnRlcnZhbCB8fCA1MDA7XG5cbiAgICAgICAgdGhpcy5jbGVhclRpbWVQaWNrZXJUaW1lcigpO1xuICAgICAgICB0aGlzLnRpbWVQaWNrZXJUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXBlYXQoZXZlbnQsIDEwMCwgdHlwZSwgZGlyZWN0aW9uKTtcbiAgICAgICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0sIGkpO1xuXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09IDEpIHRoaXMuaW5jcmVtZW50SG91cihldmVudCk7XG4gICAgICAgICAgICAgICAgZWxzZSB0aGlzLmRlY3JlbWVudEhvdXIoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gMSkgdGhpcy5pbmNyZW1lbnRNaW51dGUoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGVsc2UgdGhpcy5kZWNyZW1lbnRNaW51dGUoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gMSkgdGhpcy5pbmNyZW1lbnRTZWNvbmQoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGVsc2UgdGhpcy5kZWNyZW1lbnRTZWNvbmQoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cGRhdGVJbnB1dGZpZWxkKCk7XG4gICAgfVxuXG4gICAgY2xlYXJUaW1lUGlja2VyVGltZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnRpbWVQaWNrZXJUaW1lcikge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZVBpY2tlclRpbWVyKTtcbiAgICAgICAgICAgIHRoaXMudGltZVBpY2tlclRpbWVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlY3JlbWVudEhvdXIoZXZlbnQ6IGFueSkge1xuICAgICAgICBsZXQgbmV3SG91ciA9IDxudW1iZXI+dGhpcy5jdXJyZW50SG91ciAtIHRoaXMuc3RlcEhvdXI7XG4gICAgICAgIGxldCBuZXdQTSA9IHRoaXMucG07XG5cbiAgICAgICAgaWYgKHRoaXMuaG91ckZvcm1hdCA9PSAnMjQnKSBuZXdIb3VyID0gbmV3SG91ciA8IDAgPyAyNCArIG5ld0hvdXIgOiBuZXdIb3VyO1xuICAgICAgICBlbHNlIGlmICh0aGlzLmhvdXJGb3JtYXQgPT0gJzEyJykge1xuICAgICAgICAgICAgLy8gSWYgd2Ugd2VyZSBhdCBub29uL21pZG5pZ2h0LCB0aGVuIHN3aXRjaFxuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudEhvdXIgPT09IDEyKSB7XG4gICAgICAgICAgICAgICAgbmV3UE0gPSAhdGhpcy5wbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5ld0hvdXIgPSBuZXdIb3VyIDw9IDAgPyAxMiArIG5ld0hvdXIgOiBuZXdIb3VyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudmFsaWRhdGVUaW1lKG5ld0hvdXIsIDxhbnk+dGhpcy5jdXJyZW50TWludXRlLCA8YW55PnRoaXMuY3VycmVudFNlY29uZCwgPGFueT5uZXdQTSkpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEhvdXIgPSBuZXdIb3VyO1xuICAgICAgICAgICAgdGhpcy5wbSA9IG5ld1BNO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBpbmNyZW1lbnRNaW51dGUoZXZlbnQ6IGFueSkge1xuICAgICAgICBsZXQgbmV3TWludXRlID0gPG51bWJlcj50aGlzLmN1cnJlbnRNaW51dGUgKyB0aGlzLnN0ZXBNaW51dGU7XG4gICAgICAgIG5ld01pbnV0ZSA9IG5ld01pbnV0ZSA+IDU5ID8gbmV3TWludXRlIC0gNjAgOiBuZXdNaW51dGU7XG4gICAgICAgIGlmICh0aGlzLnZhbGlkYXRlVGltZSg8YW55PnRoaXMuY3VycmVudEhvdXIsIG5ld01pbnV0ZSwgPGFueT50aGlzLmN1cnJlbnRTZWNvbmQsIDxhbnk+dGhpcy5wbSkpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudE1pbnV0ZSA9IG5ld01pbnV0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgZGVjcmVtZW50TWludXRlKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgbGV0IG5ld01pbnV0ZSA9IDxhbnk+dGhpcy5jdXJyZW50TWludXRlIC0gdGhpcy5zdGVwTWludXRlO1xuICAgICAgICBuZXdNaW51dGUgPSBuZXdNaW51dGUgPCAwID8gNjAgKyBuZXdNaW51dGUgOiBuZXdNaW51dGU7XG4gICAgICAgIGlmICh0aGlzLnZhbGlkYXRlVGltZSg8YW55PnRoaXMuY3VycmVudEhvdXIsIG5ld01pbnV0ZSwgPGFueT50aGlzLmN1cnJlbnRTZWNvbmQsIDxhbnk+dGhpcy5wbSkpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudE1pbnV0ZSA9IG5ld01pbnV0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgaW5jcmVtZW50U2Vjb25kKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgbGV0IG5ld1NlY29uZCA9IDxhbnk+dGhpcy5jdXJyZW50U2Vjb25kICsgdGhpcy5zdGVwU2Vjb25kO1xuICAgICAgICBuZXdTZWNvbmQgPSBuZXdTZWNvbmQgPiA1OSA/IG5ld1NlY29uZCAtIDYwIDogbmV3U2Vjb25kO1xuICAgICAgICBpZiAodGhpcy52YWxpZGF0ZVRpbWUoPGFueT50aGlzLmN1cnJlbnRIb3VyLCA8YW55PnRoaXMuY3VycmVudE1pbnV0ZSwgbmV3U2Vjb25kLCA8YW55PnRoaXMucG0pKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTZWNvbmQgPSBuZXdTZWNvbmQ7XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGRlY3JlbWVudFNlY29uZChldmVudDogYW55KSB7XG4gICAgICAgIGxldCBuZXdTZWNvbmQgPSA8YW55PnRoaXMuY3VycmVudFNlY29uZCAtIHRoaXMuc3RlcFNlY29uZDtcbiAgICAgICAgbmV3U2Vjb25kID0gbmV3U2Vjb25kIDwgMCA/IDYwICsgbmV3U2Vjb25kIDogbmV3U2Vjb25kO1xuICAgICAgICBpZiAodGhpcy52YWxpZGF0ZVRpbWUoPGFueT50aGlzLmN1cnJlbnRIb3VyLCA8YW55PnRoaXMuY3VycmVudE1pbnV0ZSwgbmV3U2Vjb25kLCA8YW55PnRoaXMucG0pKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTZWNvbmQgPSBuZXdTZWNvbmQ7XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIHVwZGF0ZVRpbWUoKSB7XG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICAgIGlmICh0aGlzLmlzUmFuZ2VTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnZhbHVlWzFdIHx8IHRoaXMudmFsdWVbMF07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaXNNdWx0aXBsZVNlbGVjdGlvbigpKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMudmFsdWVbdGhpcy52YWx1ZS5sZW5ndGggLSAxXTtcbiAgICAgICAgfVxuICAgICAgICB2YWx1ZSA9IHZhbHVlID8gbmV3IERhdGUodmFsdWUuZ2V0VGltZSgpKSA6IG5ldyBEYXRlKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuaG91ckZvcm1hdCA9PSAnMTInKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50SG91ciA9PT0gMTIpIHZhbHVlLnNldEhvdXJzKHRoaXMucG0gPyAxMiA6IDApO1xuICAgICAgICAgICAgZWxzZSB2YWx1ZS5zZXRIb3Vycyh0aGlzLnBtID8gPG51bWJlcj50aGlzLmN1cnJlbnRIb3VyICsgMTIgOiB0aGlzLmN1cnJlbnRIb3VyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhbHVlLnNldEhvdXJzKHRoaXMuY3VycmVudEhvdXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFsdWUuc2V0TWludXRlcyh0aGlzLmN1cnJlbnRNaW51dGUpO1xuICAgICAgICB2YWx1ZS5zZXRTZWNvbmRzKHRoaXMuY3VycmVudFNlY29uZCk7XG4gICAgICAgIGlmICh0aGlzLmlzUmFuZ2VTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMudmFsdWVbMV0pIHZhbHVlID0gW3RoaXMudmFsdWVbMF0sIHZhbHVlXTtcbiAgICAgICAgICAgIGVsc2UgdmFsdWUgPSBbdmFsdWUsIG51bGxdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNNdWx0aXBsZVNlbGVjdGlvbigpKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IFsuLi50aGlzLnZhbHVlLnNsaWNlKDAsIC0xKSwgdmFsdWVdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cGRhdGVNb2RlbCh2YWx1ZSk7XG4gICAgICAgIHRoaXMub25TZWxlY3QuZW1pdCh2YWx1ZSk7XG4gICAgICAgIHRoaXMudXBkYXRlSW5wdXRmaWVsZCgpO1xuICAgIH1cblxuICAgIHRvZ2dsZUFNUE0oZXZlbnQ6IGFueSkge1xuICAgICAgICBjb25zdCBuZXdQTSA9ICF0aGlzLnBtO1xuICAgICAgICBpZiAodGhpcy52YWxpZGF0ZVRpbWUoPGFueT50aGlzLmN1cnJlbnRIb3VyLCA8YW55PnRoaXMuY3VycmVudE1pbnV0ZSwgPGFueT50aGlzLmN1cnJlbnRTZWNvbmQsIG5ld1BNKSkge1xuICAgICAgICAgICAgdGhpcy5wbSA9IG5ld1BNO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVUaW1lKCk7XG4gICAgICAgIH1cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvblVzZXJJbnB1dChldmVudDogS2V5Ym9hcmRFdmVudCB8IGFueSkge1xuICAgICAgICAvLyBJRSAxMSBXb3JrYXJvdW5kIGZvciBpbnB1dCBwbGFjZWhvbGRlciA6IGh0dHBzOi8vZ2l0aHViLmNvbS9wcmltZWZhY2VzL3ByaW1lbmcvaXNzdWVzLzIwMjZcbiAgICAgICAgaWYgKCF0aGlzLmlzS2V5ZG93bikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNLZXlkb3duID0gZmFsc2U7XG5cbiAgICAgICAgbGV0IHZhbCA9ICg8SFRNTElucHV0RWxlbWVudD5ldmVudC50YXJnZXQpLnZhbHVlO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5wYXJzZVZhbHVlRnJvbVN0cmluZyh2YWwpO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNWYWxpZFNlbGVjdGlvbih2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVVJKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMua2VlcEludmFsaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAvL2ludmFsaWQgZGF0ZVxuICAgICAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5rZWVwSW52YWxpZCA/IHZhbCA6IG51bGw7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZmlsbGVkID0gKHZhbCAhPSBudWxsICYmIHZhbC5sZW5ndGgpIGFzIGFueTtcbiAgICAgICAgdGhpcy5vbklucHV0LmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIGlzVmFsaWRTZWxlY3Rpb24odmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgaXNWYWxpZCA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLmlzU2luZ2xlU2VsZWN0aW9uKCkpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc1NlbGVjdGFibGUodmFsdWUuZ2V0RGF0ZSgpLCB2YWx1ZS5nZXRNb250aCgpLCB2YWx1ZS5nZXRGdWxsWWVhcigpLCBmYWxzZSkpIHtcbiAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUuZXZlcnkoKHY6IGFueSkgPT4gdGhpcy5pc1NlbGVjdGFibGUodi5nZXREYXRlKCksIHYuZ2V0TW9udGgoKSwgdi5nZXRGdWxsWWVhcigpLCBmYWxzZSkpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1JhbmdlU2VsZWN0aW9uKCkpIHtcbiAgICAgICAgICAgICAgICBpc1ZhbGlkID0gdmFsdWUubGVuZ3RoID4gMSAmJiB2YWx1ZVsxXSA+IHZhbHVlWzBdID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpc1ZhbGlkO1xuICAgIH1cblxuICAgIHBhcnNlVmFsdWVGcm9tU3RyaW5nKHRleHQ6IHN0cmluZyk6IERhdGUgfCBEYXRlW10gfCBudWxsIHtcbiAgICAgICAgaWYgKCF0ZXh0IHx8IHRleHQudHJpbSgpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdmFsdWU6IGFueTtcblxuICAgICAgICBpZiAodGhpcy5pc1NpbmdsZVNlbGVjdGlvbigpKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMucGFyc2VEYXRlVGltZSh0ZXh0KTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzTXVsdGlwbGVTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgbGV0IHRva2VucyA9IHRleHQuc3BsaXQodGhpcy5tdWx0aXBsZVNlcGFyYXRvcik7XG4gICAgICAgICAgICB2YWx1ZSA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgdG9rZW4gb2YgdG9rZW5zKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUucHVzaCh0aGlzLnBhcnNlRGF0ZVRpbWUodG9rZW4udHJpbSgpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc1JhbmdlU2VsZWN0aW9uKCkpIHtcbiAgICAgICAgICAgIGxldCB0b2tlbnMgPSB0ZXh0LnNwbGl0KCcgJyArIHRoaXMucmFuZ2VTZXBhcmF0b3IgKyAnICcpO1xuICAgICAgICAgICAgdmFsdWUgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFsdWVbaV0gPSB0aGlzLnBhcnNlRGF0ZVRpbWUodG9rZW5zW2ldLnRyaW0oKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgcGFyc2VEYXRlVGltZSh0ZXh0OiBhbnkpOiBEYXRlIHtcbiAgICAgICAgbGV0IGRhdGU6IERhdGU7XG4gICAgICAgIGxldCBwYXJ0czogc3RyaW5nW10gPSB0ZXh0LnNwbGl0KCcgJyk7XG5cbiAgICAgICAgaWYgKHRoaXMudGltZU9ubHkpIHtcbiAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgdGhpcy5wb3B1bGF0ZVRpbWUoZGF0ZSwgcGFydHNbMF0sIHBhcnRzWzFdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGVGb3JtYXQgPSB0aGlzLmdldERhdGVGb3JtYXQoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnNob3dUaW1lKSB7XG4gICAgICAgICAgICAgICAgbGV0IGFtcG0gPSB0aGlzLmhvdXJGb3JtYXQgPT0gJzEyJyA/IHBhcnRzLnBvcCgpIDogbnVsbDtcbiAgICAgICAgICAgICAgICBsZXQgdGltZVN0cmluZyA9IHBhcnRzLnBvcCgpO1xuXG4gICAgICAgICAgICAgICAgZGF0ZSA9IHRoaXMucGFyc2VEYXRlKHBhcnRzLmpvaW4oJyAnKSwgZGF0ZUZvcm1hdCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3B1bGF0ZVRpbWUoZGF0ZSwgdGltZVN0cmluZywgYW1wbSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRhdGUgPSB0aGlzLnBhcnNlRGF0ZSh0ZXh0LCBkYXRlRm9ybWF0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkYXRlO1xuICAgIH1cblxuICAgIHBvcHVsYXRlVGltZSh2YWx1ZTogYW55LCB0aW1lU3RyaW5nOiBhbnksIGFtcG06IGFueSkge1xuICAgICAgICBpZiAodGhpcy5ob3VyRm9ybWF0ID09ICcxMicgJiYgIWFtcG0pIHtcbiAgICAgICAgICAgIHRocm93ICdJbnZhbGlkIFRpbWUnO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wbSA9IGFtcG0gPT09ICdQTScgfHwgYW1wbSA9PT0gJ3BtJztcbiAgICAgICAgbGV0IHRpbWUgPSB0aGlzLnBhcnNlVGltZSh0aW1lU3RyaW5nKTtcbiAgICAgICAgdmFsdWUuc2V0SG91cnModGltZS5ob3VyKTtcbiAgICAgICAgdmFsdWUuc2V0TWludXRlcyh0aW1lLm1pbnV0ZSk7XG4gICAgICAgIHZhbHVlLnNldFNlY29uZHModGltZS5zZWNvbmQpO1xuICAgIH1cblxuICAgIGlzVmFsaWREYXRlKGRhdGU6IGFueSkge1xuICAgICAgICByZXR1cm4gT2JqZWN0VXRpbHMuaXNEYXRlKGRhdGUpICYmIE9iamVjdFV0aWxzLmlzTm90RW1wdHkoZGF0ZSk7XG4gICAgfVxuXG4gICAgdXBkYXRlVUkoKSB7XG4gICAgICAgIGxldCBwcm9wVmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICAgICAgICBwcm9wVmFsdWUgPSBwcm9wVmFsdWVbMF07XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdmFsID0gdGhpcy5kZWZhdWx0RGF0ZSAmJiB0aGlzLmlzVmFsaWREYXRlKHRoaXMuZGVmYXVsdERhdGUpICYmICF0aGlzLnZhbHVlID8gdGhpcy5kZWZhdWx0RGF0ZSA6IHByb3BWYWx1ZSAmJiB0aGlzLmlzVmFsaWREYXRlKHByb3BWYWx1ZSkgPyBwcm9wVmFsdWUgOiBuZXcgRGF0ZSgpO1xuXG4gICAgICAgIHRoaXMuY3VycmVudE1vbnRoID0gdmFsLmdldE1vbnRoKCk7XG4gICAgICAgIHRoaXMuY3VycmVudFllYXIgPSB2YWwuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgdGhpcy5jcmVhdGVNb250aHModGhpcy5jdXJyZW50TW9udGgsIHRoaXMuY3VycmVudFllYXIpO1xuXG4gICAgICAgIGlmICh0aGlzLnNob3dUaW1lIHx8IHRoaXMudGltZU9ubHkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Q3VycmVudEhvdXJQTSh2YWwuZ2V0SG91cnMoKSk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRNaW51dGUgPSB2YWwuZ2V0TWludXRlcygpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50U2Vjb25kID0gdmFsLmdldFNlY29uZHMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3dPdmVybGF5KCkge1xuICAgICAgICBpZiAoIXRoaXMub3ZlcmxheVZpc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVUkoKTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLnRvdWNoVUkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXZlbnRGb2N1cyA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGlkZU92ZXJsYXkoKSB7XG4gICAgICAgIHRoaXMuaW5wdXRmaWVsZFZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICB0aGlzLm92ZXJsYXlWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2xlYXJUaW1lUGlja2VyVGltZXIoKTtcblxuICAgICAgICBpZiAodGhpcy50b3VjaFVJKSB7XG4gICAgICAgICAgICB0aGlzLmRpc2FibGVNb2RhbGl0eSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICB0b2dnbGUoKSB7XG4gICAgICAgIGlmICghdGhpcy5pbmxpbmUpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5vdmVybGF5VmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd092ZXJsYXkoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0ZmllbGRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlT3ZlcmxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25PdmVybGF5QW5pbWF0aW9uU3RhcnQoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQudG9TdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAndmlzaWJsZSc6XG4gICAgICAgICAgICBjYXNlICd2aXNpYmxlVG91Y2hVSSc6XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlubGluZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXkgPSBldmVudC5lbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXk/LnNldEF0dHJpYnV0ZSh0aGlzLmF0dHJpYnV0ZVNlbGVjdG9yIGFzIHN0cmluZywgJycpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZE92ZXJsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVGb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hdXRvWkluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50b3VjaFVJKSBaSW5kZXhVdGlscy5zZXQoJ21vZGFsJywgdGhpcy5vdmVybGF5LCB0aGlzLmJhc2VaSW5kZXggfHwgdGhpcy5jb25maWcuekluZGV4Lm1vZGFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgWkluZGV4VXRpbHMuc2V0KCdvdmVybGF5JywgdGhpcy5vdmVybGF5LCB0aGlzLmJhc2VaSW5kZXggfHwgdGhpcy5jb25maWcuekluZGV4Lm92ZXJsYXkpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGlnbk92ZXJsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblNob3cuZW1pdChldmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICd2b2lkJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uT3ZlcmxheUhpZGUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2xvc2UuZW1pdChldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk92ZXJsYXlBbmltYXRpb25Eb25lKGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LnRvU3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3Zpc2libGUnOlxuICAgICAgICAgICAgY2FzZSAndmlzaWJsZVRvdWNoVUknOlxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pbmxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaW5kU2Nyb2xsTGlzdGVuZXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ3ZvaWQnOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmF1dG9aSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgWkluZGV4VXRpbHMuY2xlYXIoZXZlbnQuZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXBwZW5kT3ZlcmxheSgpIHtcbiAgICAgICAgaWYgKHRoaXMuYXBwZW5kVG8pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFwcGVuZFRvID09PSAnYm9keScpIHRoaXMuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCg8SFRNTEVsZW1lbnQ+dGhpcy5vdmVybGF5KTtcbiAgICAgICAgICAgIGVsc2UgRG9tSGFuZGxlci5hcHBlbmRDaGlsZCh0aGlzLm92ZXJsYXksIHRoaXMuYXBwZW5kVG8pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzdG9yZU92ZXJsYXlBcHBlbmQoKSB7XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXkgJiYgdGhpcy5hcHBlbmRUbykge1xuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMub3ZlcmxheSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhbGlnbk92ZXJsYXkoKSB7XG4gICAgICAgIGlmICh0aGlzLnRvdWNoVUkpIHtcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlTW9kYWxpdHkodGhpcy5vdmVybGF5KTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm92ZXJsYXkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFwcGVuZFRvKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmlldyA9PT0gJ2RhdGUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheS5zdHlsZS53aWR0aCA9IERvbUhhbmRsZXIuZ2V0T3V0ZXJXaWR0aCh0aGlzLm92ZXJsYXkpICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5LnN0eWxlLm1pbldpZHRoID0gRG9tSGFuZGxlci5nZXRPdXRlcldpZHRoKHRoaXMuaW5wdXRmaWVsZFZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudCkgKyAncHgnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheS5zdHlsZS53aWR0aCA9IERvbUhhbmRsZXIuZ2V0T3V0ZXJXaWR0aCh0aGlzLmlucHV0ZmllbGRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQpICsgJ3B4JztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFic29sdXRlUG9zaXRpb24odGhpcy5vdmVybGF5LCB0aGlzLmlucHV0ZmllbGRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLnJlbGF0aXZlUG9zaXRpb24odGhpcy5vdmVybGF5LCB0aGlzLmlucHV0ZmllbGRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZW5hYmxlTW9kYWxpdHkoZWxlbWVudDogYW55KSB7XG4gICAgICAgIGlmICghdGhpcy5tYXNrICYmIHRoaXMudG91Y2hVSSkge1xuICAgICAgICAgICAgdGhpcy5tYXNrID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5tYXNrLCAnekluZGV4JywgU3RyaW5nKHBhcnNlSW50KGVsZW1lbnQuc3R5bGUuekluZGV4KSAtIDEpKTtcbiAgICAgICAgICAgIGxldCBtYXNrU3R5bGVDbGFzcyA9ICdwLWNvbXBvbmVudC1vdmVybGF5IHAtZGF0ZXBpY2tlci1tYXNrIHAtZGF0ZXBpY2tlci1tYXNrLXNjcm9sbGJsb2NrZXIgcC1jb21wb25lbnQtb3ZlcmxheSBwLWNvbXBvbmVudC1vdmVybGF5LWVudGVyJztcbiAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkTXVsdGlwbGVDbGFzc2VzKHRoaXMubWFzaywgbWFza1N0eWxlQ2xhc3MpO1xuXG4gICAgICAgICAgICB0aGlzLm1hc2tDbGlja0xpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5tYXNrLCAnY2xpY2snLCAoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZU1vZGFsaXR5KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5VmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZG9jdW1lbnQuYm9keSwgdGhpcy5tYXNrKTtcbiAgICAgICAgICAgIERvbUhhbmRsZXIuYmxvY2tCb2R5U2Nyb2xsKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaXNhYmxlTW9kYWxpdHkoKSB7XG4gICAgICAgIGlmICh0aGlzLm1hc2spIHtcbiAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3ModGhpcy5tYXNrLCAncC1jb21wb25lbnQtb3ZlcmxheS1sZWF2ZScpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLmFuaW1hdGlvbkVuZExpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb25FbmRMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMubWFzaywgJ2FuaW1hdGlvbmVuZCcsIHRoaXMuZGVzdHJveU1hc2suYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZXN0cm95TWFzaygpIHtcbiAgICAgICAgaWYgKCF0aGlzLm1hc2spIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKHRoaXMuZG9jdW1lbnQuYm9keSwgdGhpcy5tYXNrKTtcbiAgICAgICAgbGV0IGJvZHlDaGlsZHJlbiA9IHRoaXMuZG9jdW1lbnQuYm9keS5jaGlsZHJlbjtcbiAgICAgICAgbGV0IGhhc0Jsb2NrZXJNYXNrcyE6IGJvb2xlYW47XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm9keUNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgYm9keUNoaWxkID0gYm9keUNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgaWYgKERvbUhhbmRsZXIuaGFzQ2xhc3MoYm9keUNoaWxkLCAncC1kYXRlcGlja2VyLW1hc2stc2Nyb2xsYmxvY2tlcicpKSB7XG4gICAgICAgICAgICAgICAgaGFzQmxvY2tlck1hc2tzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaGFzQmxvY2tlck1hc2tzKSB7XG4gICAgICAgICAgICBEb21IYW5kbGVyLnVuYmxvY2tCb2R5U2Nyb2xsKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVuYmluZEFuaW1hdGlvbkVuZExpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMudW5iaW5kTWFza0NsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy5tYXNrID0gbnVsbDtcbiAgICB9XG5cbiAgICB1bmJpbmRNYXNrQ2xpY2tMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMubWFza0NsaWNrTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMubWFza0NsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMubWFza0NsaWNrTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5iaW5kQW5pbWF0aW9uRW5kTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbkVuZExpc3RlbmVyICYmIHRoaXMubWFzaykge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25FbmRMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25FbmRMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICBpZiAodGhpcy52YWx1ZSAmJiB0eXBlb2YgdGhpcy52YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMucGFyc2VWYWx1ZUZyb21TdHJpbmcodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5rZWVwSW52YWxpZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cGRhdGVJbnB1dGZpZWxkKCk7XG4gICAgICAgIHRoaXMudXBkYXRlVUkoKTtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIHNldERpc2FibGVkU3RhdGUodmFsOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSB2YWw7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgZ2V0RGF0ZUZvcm1hdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1hdCB8fCB0aGlzLmdldFRyYW5zbGF0aW9uKCdkYXRlRm9ybWF0Jyk7XG4gICAgfVxuXG4gICAgZ2V0Rmlyc3REYXRlT2ZXZWVrKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmlyc3REYXlPZldlZWsgfHwgdGhpcy5nZXRUcmFuc2xhdGlvbihUcmFuc2xhdGlvbktleXMuRklSU1RfREFZX09GX1dFRUspO1xuICAgIH1cblxuICAgIC8vIFBvcnRlZCBmcm9tIGpxdWVyeS11aSBkYXRlcGlja2VyIGZvcm1hdERhdGVcbiAgICBmb3JtYXREYXRlKGRhdGU6IGFueSwgZm9ybWF0OiBhbnkpIHtcbiAgICAgICAgaWYgKCFkYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaUZvcm1hdCE6IGFueTtcbiAgICAgICAgY29uc3QgbG9va0FoZWFkID0gKG1hdGNoOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXRjaGVzID0gaUZvcm1hdCArIDEgPCBmb3JtYXQubGVuZ3RoICYmIGZvcm1hdC5jaGFyQXQoaUZvcm1hdCArIDEpID09PSBtYXRjaDtcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hlcykge1xuICAgICAgICAgICAgICAgICAgICBpRm9ybWF0Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaGVzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZvcm1hdE51bWJlciA9IChtYXRjaDogc3RyaW5nLCB2YWx1ZTogYW55LCBsZW46IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBudW0gPSAnJyArIHZhbHVlO1xuICAgICAgICAgICAgICAgIGlmIChsb29rQWhlYWQobWF0Y2gpKSB7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChudW0ubGVuZ3RoIDwgbGVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBudW0gPSAnMCcgKyBudW07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmb3JtYXROYW1lID0gKG1hdGNoOiBzdHJpbmcsIHZhbHVlOiBhbnksIHNob3J0TmFtZXM6IGFueSwgbG9uZ05hbWVzOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbG9va0FoZWFkKG1hdGNoKSA/IGxvbmdOYW1lc1t2YWx1ZV0gOiBzaG9ydE5hbWVzW3ZhbHVlXTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIGxldCBvdXRwdXQgPSAnJztcbiAgICAgICAgbGV0IGxpdGVyYWwgPSBmYWxzZTtcblxuICAgICAgICBpZiAoZGF0ZSkge1xuICAgICAgICAgICAgZm9yIChpRm9ybWF0ID0gMDsgaUZvcm1hdCA8IGZvcm1hdC5sZW5ndGg7IGlGb3JtYXQrKykge1xuICAgICAgICAgICAgICAgIGlmIChsaXRlcmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmb3JtYXQuY2hhckF0KGlGb3JtYXQpID09PSBcIidcIiAmJiAhbG9va0FoZWFkKFwiJ1wiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGl0ZXJhbCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGZvcm1hdC5jaGFyQXQoaUZvcm1hdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGZvcm1hdC5jaGFyQXQoaUZvcm1hdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2QnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBmb3JtYXROdW1iZXIoJ2QnLCBkYXRlLmdldERhdGUoKSwgMik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdEJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gZm9ybWF0TmFtZSgnRCcsIGRhdGUuZ2V0RGF5KCksIHRoaXMuZ2V0VHJhbnNsYXRpb24oVHJhbnNsYXRpb25LZXlzLkRBWV9OQU1FU19TSE9SVCksIHRoaXMuZ2V0VHJhbnNsYXRpb24oVHJhbnNsYXRpb25LZXlzLkRBWV9OQU1FUykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGZvcm1hdE51bWJlcignbycsIE1hdGgucm91bmQoKG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldERhdGUoKSkuZ2V0VGltZSgpIC0gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCAwLCAwKS5nZXRUaW1lKCkpIC8gODY0MDAwMDApLCAzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ20nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBmb3JtYXROdW1iZXIoJ20nLCBkYXRlLmdldE1vbnRoKCkgKyAxLCAyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ00nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBmb3JtYXROYW1lKCdNJywgZGF0ZS5nZXRNb250aCgpLCB0aGlzLmdldFRyYW5zbGF0aW9uKFRyYW5zbGF0aW9uS2V5cy5NT05USF9OQU1FU19TSE9SVCksIHRoaXMuZ2V0VHJhbnNsYXRpb24oVHJhbnNsYXRpb25LZXlzLk1PTlRIX05BTUVTKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd5JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gbG9va0FoZWFkKCd5JykgPyBkYXRlLmdldEZ1bGxZZWFyKCkgOiAoZGF0ZS5nZXRGdWxsWWVhcigpICUgMTAwIDwgMTAgPyAnMCcgOiAnJykgKyAoZGF0ZS5nZXRGdWxsWWVhcigpICUgMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ0AnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBkYXRlLmdldFRpbWUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJyEnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBkYXRlLmdldFRpbWUoKSAqIDEwMDAwICsgPG51bWJlcj50aGlzLnRpY2tzVG8xOTcwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIidcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9va0FoZWFkKFwiJ1wiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gXCInXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGl0ZXJhbCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gZm9ybWF0LmNoYXJBdChpRm9ybWF0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH1cblxuICAgIGZvcm1hdFRpbWUoZGF0ZTogYW55KSB7XG4gICAgICAgIGlmICghZGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG91dHB1dCA9ICcnO1xuICAgICAgICBsZXQgaG91cnMgPSBkYXRlLmdldEhvdXJzKCk7XG4gICAgICAgIGxldCBtaW51dGVzID0gZGF0ZS5nZXRNaW51dGVzKCk7XG4gICAgICAgIGxldCBzZWNvbmRzID0gZGF0ZS5nZXRTZWNvbmRzKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuaG91ckZvcm1hdCA9PSAnMTInICYmIGhvdXJzID4gMTEgJiYgaG91cnMgIT0gMTIpIHtcbiAgICAgICAgICAgIGhvdXJzIC09IDEyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaG91ckZvcm1hdCA9PSAnMTInKSB7XG4gICAgICAgICAgICBvdXRwdXQgKz0gaG91cnMgPT09IDAgPyAxMiA6IGhvdXJzIDwgMTAgPyAnMCcgKyBob3VycyA6IGhvdXJzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3V0cHV0ICs9IGhvdXJzIDwgMTAgPyAnMCcgKyBob3VycyA6IGhvdXJzO1xuICAgICAgICB9XG4gICAgICAgIG91dHB1dCArPSAnOic7XG4gICAgICAgIG91dHB1dCArPSBtaW51dGVzIDwgMTAgPyAnMCcgKyBtaW51dGVzIDogbWludXRlcztcblxuICAgICAgICBpZiAodGhpcy5zaG93U2Vjb25kcykge1xuICAgICAgICAgICAgb3V0cHV0ICs9ICc6JztcbiAgICAgICAgICAgIG91dHB1dCArPSBzZWNvbmRzIDwgMTAgPyAnMCcgKyBzZWNvbmRzIDogc2Vjb25kcztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmhvdXJGb3JtYXQgPT0gJzEyJykge1xuICAgICAgICAgICAgb3V0cHV0ICs9IGRhdGUuZ2V0SG91cnMoKSA+IDExID8gJyBQTScgOiAnIEFNJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfVxuXG4gICAgcGFyc2VUaW1lKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgbGV0IHRva2Vuczogc3RyaW5nW10gPSB2YWx1ZS5zcGxpdCgnOicpO1xuICAgICAgICBsZXQgdmFsaWRUb2tlbkxlbmd0aCA9IHRoaXMuc2hvd1NlY29uZHMgPyAzIDogMjtcblxuICAgICAgICBpZiAodG9rZW5zLmxlbmd0aCAhPT0gdmFsaWRUb2tlbkxlbmd0aCkge1xuICAgICAgICAgICAgdGhyb3cgJ0ludmFsaWQgdGltZSc7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaCA9IHBhcnNlSW50KHRva2Vuc1swXSk7XG4gICAgICAgIGxldCBtID0gcGFyc2VJbnQodG9rZW5zWzFdKTtcbiAgICAgICAgbGV0IHMgPSB0aGlzLnNob3dTZWNvbmRzID8gcGFyc2VJbnQodG9rZW5zWzJdKSA6IG51bGw7XG5cbiAgICAgICAgaWYgKGlzTmFOKGgpIHx8IGlzTmFOKG0pIHx8IGggPiAyMyB8fCBtID4gNTkgfHwgKHRoaXMuaG91ckZvcm1hdCA9PSAnMTInICYmIGggPiAxMikgfHwgKHRoaXMuc2hvd1NlY29uZHMgJiYgKGlzTmFOKDxhbnk+cykgfHwgPGFueT5zID4gNTkpKSkge1xuICAgICAgICAgICAgdGhyb3cgJ0ludmFsaWQgdGltZSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5ob3VyRm9ybWF0ID09ICcxMicpIHtcbiAgICAgICAgICAgICAgICBpZiAoaCAhPT0gMTIgJiYgdGhpcy5wbSkge1xuICAgICAgICAgICAgICAgICAgICBoICs9IDEyO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMucG0gJiYgaCA9PT0gMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgaCAtPSAxMjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7IGhvdXI6IGgsIG1pbnV0ZTogbSwgc2Vjb25kOiBzIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBQb3J0ZWQgZnJvbSBqcXVlcnktdWkgZGF0ZXBpY2tlciBwYXJzZURhdGVcbiAgICBwYXJzZURhdGUodmFsdWU6IGFueSwgZm9ybWF0OiBhbnkpIHtcbiAgICAgICAgaWYgKGZvcm1hdCA9PSBudWxsIHx8IHZhbHVlID09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93ICdJbnZhbGlkIGFyZ3VtZW50cyc7XG4gICAgICAgIH1cblxuICAgICAgICB2YWx1ZSA9IHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgPyB2YWx1ZS50b1N0cmluZygpIDogdmFsdWUgKyAnJztcbiAgICAgICAgaWYgKHZhbHVlID09PSAnJykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaUZvcm1hdCE6IGFueSxcbiAgICAgICAgICAgIGRpbSxcbiAgICAgICAgICAgIGV4dHJhLFxuICAgICAgICAgICAgaVZhbHVlID0gMCxcbiAgICAgICAgICAgIHNob3J0WWVhckN1dG9mZiA9IHR5cGVvZiB0aGlzLnNob3J0WWVhckN1dG9mZiAhPT0gJ3N0cmluZycgPyB0aGlzLnNob3J0WWVhckN1dG9mZiA6IChuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkgJSAxMDApICsgcGFyc2VJbnQodGhpcy5zaG9ydFllYXJDdXRvZmYsIDEwKSxcbiAgICAgICAgICAgIHllYXIgPSAtMSxcbiAgICAgICAgICAgIG1vbnRoID0gLTEsXG4gICAgICAgICAgICBkYXkgPSAtMSxcbiAgICAgICAgICAgIGRveSA9IC0xLFxuICAgICAgICAgICAgbGl0ZXJhbCA9IGZhbHNlLFxuICAgICAgICAgICAgZGF0ZSxcbiAgICAgICAgICAgIGxvb2tBaGVhZCA9IChtYXRjaDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IG1hdGNoZXMgPSBpRm9ybWF0ICsgMSA8IGZvcm1hdC5sZW5ndGggJiYgZm9ybWF0LmNoYXJBdChpRm9ybWF0ICsgMSkgPT09IG1hdGNoO1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlGb3JtYXQrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0TnVtYmVyID0gKG1hdGNoOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgaXNEb3VibGVkID0gbG9va0FoZWFkKG1hdGNoKSxcbiAgICAgICAgICAgICAgICAgICAgc2l6ZSA9IG1hdGNoID09PSAnQCcgPyAxNCA6IG1hdGNoID09PSAnIScgPyAyMCA6IG1hdGNoID09PSAneScgJiYgaXNEb3VibGVkID8gNCA6IG1hdGNoID09PSAnbycgPyAzIDogMixcbiAgICAgICAgICAgICAgICAgICAgbWluU2l6ZSA9IG1hdGNoID09PSAneScgPyBzaXplIDogMSxcbiAgICAgICAgICAgICAgICAgICAgZGlnaXRzID0gbmV3IFJlZ0V4cCgnXlxcXFxkeycgKyBtaW5TaXplICsgJywnICsgc2l6ZSArICd9JyksXG4gICAgICAgICAgICAgICAgICAgIG51bSA9IHZhbHVlLnN1YnN0cmluZyhpVmFsdWUpLm1hdGNoKGRpZ2l0cyk7XG4gICAgICAgICAgICAgICAgaWYgKCFudW0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgJ01pc3NpbmcgbnVtYmVyIGF0IHBvc2l0aW9uICcgKyBpVmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlWYWx1ZSArPSBudW1bMF0ubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUludChudW1bMF0sIDEwKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXROYW1lID0gKG1hdGNoOiBhbnksIHNob3J0TmFtZXM6IGFueSwgbG9uZ05hbWVzOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSAtMTtcbiAgICAgICAgICAgICAgICBsZXQgYXJyID0gbG9va0FoZWFkKG1hdGNoKSA/IGxvbmdOYW1lcyA6IHNob3J0TmFtZXM7XG4gICAgICAgICAgICAgICAgbGV0IG5hbWVzID0gW107XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBuYW1lcy5wdXNoKFtpLCBhcnJbaV1dKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmFtZXMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gLShhWzFdLmxlbmd0aCAtIGJbMV0ubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5hbWUgPSBuYW1lc1tpXVsxXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLnN1YnN0cihpVmFsdWUsIG5hbWUubGVuZ3RoKS50b0xvd2VyQ2FzZSgpID09PSBuYW1lLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ID0gbmFtZXNbaV1bMF07XG4gICAgICAgICAgICAgICAgICAgICAgICBpVmFsdWUgKz0gbmFtZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4ICsgMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyAnVW5rbm93biBuYW1lIGF0IHBvc2l0aW9uICcgKyBpVmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoZWNrTGl0ZXJhbCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUuY2hhckF0KGlWYWx1ZSkgIT09IGZvcm1hdC5jaGFyQXQoaUZvcm1hdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgJ1VuZXhwZWN0ZWQgbGl0ZXJhbCBhdCBwb3NpdGlvbiAnICsgaVZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpVmFsdWUrKztcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgaWYgKHRoaXMudmlldyA9PT0gJ21vbnRoJykge1xuICAgICAgICAgICAgZGF5ID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoaUZvcm1hdCA9IDA7IGlGb3JtYXQgPCBmb3JtYXQubGVuZ3RoOyBpRm9ybWF0KyspIHtcbiAgICAgICAgICAgIGlmIChsaXRlcmFsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZvcm1hdC5jaGFyQXQoaUZvcm1hdCkgPT09IFwiJ1wiICYmICFsb29rQWhlYWQoXCInXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpdGVyYWwgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjaGVja0xpdGVyYWwoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoZm9ybWF0LmNoYXJBdChpRm9ybWF0KSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdkJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheSA9IGdldE51bWJlcignZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0QnOlxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0TmFtZSgnRCcsIHRoaXMuZ2V0VHJhbnNsYXRpb24oVHJhbnNsYXRpb25LZXlzLkRBWV9OQU1FU19TSE9SVCksIHRoaXMuZ2V0VHJhbnNsYXRpb24oVHJhbnNsYXRpb25LZXlzLkRBWV9OQU1FUykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ28nOlxuICAgICAgICAgICAgICAgICAgICAgICAgZG95ID0gZ2V0TnVtYmVyKCdvJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbSc6XG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aCA9IGdldE51bWJlcignbScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ00nOlxuICAgICAgICAgICAgICAgICAgICAgICAgbW9udGggPSBnZXROYW1lKCdNJywgdGhpcy5nZXRUcmFuc2xhdGlvbihUcmFuc2xhdGlvbktleXMuTU9OVEhfTkFNRVNfU0hPUlQpLCB0aGlzLmdldFRyYW5zbGF0aW9uKFRyYW5zbGF0aW9uS2V5cy5NT05USF9OQU1FUykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3knOlxuICAgICAgICAgICAgICAgICAgICAgICAgeWVhciA9IGdldE51bWJlcigneScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0AnOlxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKGdldE51bWJlcignQCcpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXkgPSBkYXRlLmdldERhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICchJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZSgoZ2V0TnVtYmVyKCchJykgLSA8bnVtYmVyPnRoaXMudGlja3NUbzE5NzApIC8gMTAwMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheSA9IGRhdGUuZ2V0RGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCInXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9va0FoZWFkKFwiJ1wiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrTGl0ZXJhbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXRlcmFsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tMaXRlcmFsKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlWYWx1ZSA8IHZhbHVlLmxlbmd0aCkge1xuICAgICAgICAgICAgZXh0cmEgPSB2YWx1ZS5zdWJzdHIoaVZhbHVlKTtcbiAgICAgICAgICAgIGlmICghL15cXHMrLy50ZXN0KGV4dHJhKSkge1xuICAgICAgICAgICAgICAgIHRocm93ICdFeHRyYS91bnBhcnNlZCBjaGFyYWN0ZXJzIGZvdW5kIGluIGRhdGU6ICcgKyBleHRyYTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh5ZWFyID09PSAtMSkge1xuICAgICAgICAgICAgeWVhciA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgfSBlbHNlIGlmICh5ZWFyIDwgMTAwKSB7XG4gICAgICAgICAgICB5ZWFyICs9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSAtIChuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkgJSAxMDApICsgKHllYXIgPD0gc2hvcnRZZWFyQ3V0b2ZmID8gMCA6IC0xMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRveSA+IC0xKSB7XG4gICAgICAgICAgICBtb250aCA9IDE7XG4gICAgICAgICAgICBkYXkgPSBkb3k7XG4gICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgZGltID0gdGhpcy5nZXREYXlzQ291bnRJbk1vbnRoKHllYXIsIG1vbnRoIC0gMSk7XG4gICAgICAgICAgICAgICAgaWYgKGRheSA8PSBkaW0pIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG1vbnRoKys7XG4gICAgICAgICAgICAgICAgZGF5IC09IGRpbTtcbiAgICAgICAgICAgIH0gd2hpbGUgKHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudmlldyA9PT0gJ3llYXInKSB7XG4gICAgICAgICAgICBtb250aCA9IG1vbnRoID09PSAtMSA/IDEgOiBtb250aDtcbiAgICAgICAgICAgIGRheSA9IGRheSA9PT0gLTEgPyAxIDogZGF5O1xuICAgICAgICB9XG5cbiAgICAgICAgZGF0ZSA9IHRoaXMuZGF5bGlnaHRTYXZpbmdBZGp1c3QobmV3IERhdGUoeWVhciwgbW9udGggLSAxLCBkYXkpKTtcblxuICAgICAgICBpZiAoZGF0ZS5nZXRGdWxsWWVhcigpICE9PSB5ZWFyIHx8IGRhdGUuZ2V0TW9udGgoKSArIDEgIT09IG1vbnRoIHx8IGRhdGUuZ2V0RGF0ZSgpICE9PSBkYXkpIHtcbiAgICAgICAgICAgIHRocm93ICdJbnZhbGlkIGRhdGUnOyAvLyBFLmcuIDMxLzAyLzAwXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICB9XG5cbiAgICBkYXlsaWdodFNhdmluZ0FkanVzdChkYXRlOiBhbnkpIHtcbiAgICAgICAgaWYgKCFkYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGRhdGUuc2V0SG91cnMoZGF0ZS5nZXRIb3VycygpID4gMTIgPyBkYXRlLmdldEhvdXJzKCkgKyAyIDogMCk7XG5cbiAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfVxuXG4gICAgdXBkYXRlRmlsbGVkU3RhdGUoKSB7XG4gICAgICAgIHRoaXMuZmlsbGVkID0gKHRoaXMuaW5wdXRGaWVsZFZhbHVlICYmIHRoaXMuaW5wdXRGaWVsZFZhbHVlICE9ICcnKSBhcyBib29sZWFuO1xuICAgIH1cblxuICAgIG9uVG9kYXlCdXR0b25DbGljayhldmVudDogYW55KSB7XG4gICAgICAgIGNvbnN0IGRhdGU6IERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBjb25zdCBkYXRlTWV0YSA9IHsgZGF5OiBkYXRlLmdldERhdGUoKSwgbW9udGg6IGRhdGUuZ2V0TW9udGgoKSwgeWVhcjogZGF0ZS5nZXRGdWxsWWVhcigpLCBvdGhlck1vbnRoOiBkYXRlLmdldE1vbnRoKCkgIT09IHRoaXMuY3VycmVudE1vbnRoIHx8IGRhdGUuZ2V0RnVsbFllYXIoKSAhPT0gdGhpcy5jdXJyZW50WWVhciwgdG9kYXk6IHRydWUsIHNlbGVjdGFibGU6IHRydWUgfTtcblxuICAgICAgICB0aGlzLmNyZWF0ZU1vbnRocyhkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RnVsbFllYXIoKSk7XG4gICAgICAgIHRoaXMub25EYXRlU2VsZWN0KGV2ZW50LCBkYXRlTWV0YSk7XG4gICAgICAgIHRoaXMub25Ub2RheUNsaWNrLmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIG9uQ2xlYXJCdXR0b25DbGljayhldmVudDogYW55KSB7XG4gICAgICAgIHRoaXMudXBkYXRlTW9kZWwobnVsbCk7XG4gICAgICAgIHRoaXMudXBkYXRlSW5wdXRmaWVsZCgpO1xuICAgICAgICB0aGlzLmhpZGVPdmVybGF5KCk7XG4gICAgICAgIHRoaXMub25DbGVhckNsaWNrLmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIGNyZWF0ZVJlc3BvbnNpdmVTdHlsZSgpIHtcbiAgICAgICAgaWYgKHRoaXMubnVtYmVyT2ZNb250aHMgPiAxICYmIHRoaXMucmVzcG9uc2l2ZU9wdGlvbnMpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5yZXNwb25zaXZlU3R5bGVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNwb25zaXZlU3R5bGVFbGVtZW50ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICAgICAgICAgICg8SFRNTFN0eWxlRWxlbWVudD50aGlzLnJlc3BvbnNpdmVTdHlsZUVsZW1lbnQpLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5kb2N1bWVudC5ib2R5LCB0aGlzLnJlc3BvbnNpdmVTdHlsZUVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICBpZiAodGhpcy5yZXNwb25zaXZlT3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGxldCByZXNwb25zaXZlT3B0aW9ucyA9IFsuLi50aGlzLnJlc3BvbnNpdmVPcHRpb25zXS5maWx0ZXIoKG8pID0+ICEhKG8uYnJlYWtwb2ludCAmJiBvLm51bU1vbnRocykpLnNvcnQoKG8xOiBhbnksIG8yOiBhbnkpID0+IC0xICogbzEuYnJlYWtwb2ludC5sb2NhbGVDb21wYXJlKG8yLmJyZWFrcG9pbnQsIHVuZGVmaW5lZCwgeyBudW1lcmljOiB0cnVlIH0pKTtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzcG9uc2l2ZU9wdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHsgYnJlYWtwb2ludCwgbnVtTW9udGhzIH0gPSByZXNwb25zaXZlT3B0aW9uc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0eWxlcyA9IGBcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wLWRhdGVwaWNrZXJbJHt0aGlzLmF0dHJpYnV0ZVNlbGVjdG9yfV0gLnAtZGF0ZXBpY2tlci1ncm91cDpudGgtY2hpbGQoJHtudW1Nb250aHN9KSAucC1kYXRlcGlja2VyLW5leHQge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1mbGV4ICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGA7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgajogbnVtYmVyID0gPG51bWJlcj5udW1Nb250aHM7IGogPCB0aGlzLm51bWJlck9mTW9udGhzOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlcyArPSBgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnAtZGF0ZXBpY2tlclske3RoaXMuYXR0cmlidXRlU2VsZWN0b3J9XSAucC1kYXRlcGlja2VyLWdyb3VwOm50aC1jaGlsZCgke2ogKyAxfSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlubmVySFRNTCArPSBgXG4gICAgICAgICAgICAgICAgICAgICAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAke2JyZWFrcG9pbnR9KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtzdHlsZXN9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAoPEhUTUxTdHlsZUVsZW1lbnQ+dGhpcy5yZXNwb25zaXZlU3R5bGVFbGVtZW50KS5pbm5lckhUTUwgPSBpbm5lckhUTUw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZXN0cm95UmVzcG9uc2l2ZVN0eWxlRWxlbWVudCgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVzcG9uc2l2ZVN0eWxlRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5yZXNwb25zaXZlU3R5bGVFbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICAgICAgdGhpcy5yZXNwb25zaXZlU3R5bGVFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZG9jdW1lbnRUYXJnZXQ6IGFueSA9IHRoaXMuZWwgPyB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQub3duZXJEb2N1bWVudCA6IHRoaXMuZG9jdW1lbnQ7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKGRvY3VtZW50VGFyZ2V0LCAnbW91c2Vkb3duJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzT3V0c2lkZUNsaWNrZWQoZXZlbnQpICYmIHRoaXMub3ZlcmxheVZpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZU92ZXJsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQ2xpY2tPdXRzaWRlLmVtaXQoZXZlbnQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyICYmICF0aGlzLnRvdWNoVUkpIHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMud2luZG93LCAncmVzaXplJywgdGhpcy5vbldpbmRvd1Jlc2l6ZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmRTY3JvbGxMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNjcm9sbEhhbmRsZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsSGFuZGxlciA9IG5ldyBDb25uZWN0ZWRPdmVybGF5U2Nyb2xsSGFuZGxlcih0aGlzLmNvbnRhaW5lclZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm92ZXJsYXlWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZU92ZXJsYXkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2Nyb2xsSGFuZGxlci5iaW5kU2Nyb2xsTGlzdGVuZXIoKTtcbiAgICB9XG5cbiAgICB1bmJpbmRTY3JvbGxMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsSGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyLnVuYmluZFNjcm9sbExpc3RlbmVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc091dHNpZGVDbGlja2VkKGV2ZW50OiBFdmVudCkge1xuICAgICAgICByZXR1cm4gISh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuaXNTYW1lTm9kZShldmVudC50YXJnZXQpIHx8IHRoaXMuaXNOYXZJY29uQ2xpY2tlZChldmVudCkgfHwgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkgfHwgKHRoaXMub3ZlcmxheSAmJiB0aGlzLm92ZXJsYXkuY29udGFpbnMoPE5vZGU+ZXZlbnQudGFyZ2V0KSkpO1xuICAgIH1cblxuICAgIGlzTmF2SWNvbkNsaWNrZWQoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBEb21IYW5kbGVyLmhhc0NsYXNzKGV2ZW50LnRhcmdldCwgJ3AtZGF0ZXBpY2tlci1wcmV2JykgfHwgRG9tSGFuZGxlci5oYXNDbGFzcyhldmVudC50YXJnZXQsICdwLWRhdGVwaWNrZXItcHJldi1pY29uJykgfHwgRG9tSGFuZGxlci5oYXNDbGFzcyhldmVudC50YXJnZXQsICdwLWRhdGVwaWNrZXItbmV4dCcpIHx8IERvbUhhbmRsZXIuaGFzQ2xhc3MoZXZlbnQudGFyZ2V0LCAncC1kYXRlcGlja2VyLW5leHQtaWNvbicpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgb25XaW5kb3dSZXNpemUoKSB7XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlWaXNpYmxlICYmICFEb21IYW5kbGVyLmlzVG91Y2hEZXZpY2UoKSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlT3ZlcmxheSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25PdmVybGF5SGlkZSgpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50VmlldyA9IHRoaXMudmlldztcblxuICAgICAgICBpZiAodGhpcy5tYXNrKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lNYXNrKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy51bmJpbmRTY3JvbGxMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLm92ZXJsYXkgPSBudWxsO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5zY3JvbGxIYW5kbGVyKSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbEhhbmRsZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnRyYW5zbGF0aW9uU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnRyYW5zbGF0aW9uU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5vdmVybGF5ICYmIHRoaXMuYXV0b1pJbmRleCkge1xuICAgICAgICAgICAgWkluZGV4VXRpbHMuY2xlYXIodGhpcy5vdmVybGF5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGVzdHJveVJlc3BvbnNpdmVTdHlsZUVsZW1lbnQoKTtcbiAgICAgICAgdGhpcy5jbGVhclRpbWVQaWNrZXJUaW1lcigpO1xuICAgICAgICB0aGlzLnJlc3RvcmVPdmVybGF5QXBwZW5kKCk7XG4gICAgICAgIHRoaXMub25PdmVybGF5SGlkZSgpO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBCdXR0b25Nb2R1bGUsIFNoYXJlZE1vZHVsZSwgUmlwcGxlTW9kdWxlLCBDaGV2cm9uTGVmdEljb24sIENoZXZyb25SaWdodEljb24sIENoZXZyb25VcEljb24sIENoZXZyb25Eb3duSWNvbiwgVGltZXNJY29uLCBDYWxlbmRhckljb25dLFxuICAgIGV4cG9ydHM6IFtDYWxlbmRhciwgQnV0dG9uTW9kdWxlLCBTaGFyZWRNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW0NhbGVuZGFyXVxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhck1vZHVsZSB7fVxuIl19