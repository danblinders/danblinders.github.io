import Calendar from "../calendar/calendar";

/*
  this.datepickrBlock - the whole datepicker-block
  this.datepickerType - datepicker's type
  this.calendarContainer - block, containing calendar
  this.calendar - instance of Calendar class
  this.dateInitialStart - date, start of range date, that will be chosen after first initialization 
  this.dateInitialEnd - date, end of range date, that will be chosen after first initialization 
  this.showCalendar - method for showing calendar
  this.hideCalendar - method for hiding calendar
*/
class Datepicker {
  constructor(datepickerBlock) {
    this.datepickerBlock = $(datepickerBlock);
    this.datepickerType = this.datepickerBlock.attr("data-datepicker-type");
    this.calendarContainer = this.datepickerBlock.find(".datepicker-block__calendar");
    this.calendar = new Calendar(this.calendarContainer.find(".calendar"));
    this.showCalendar = () => {
      this.calendarContainer.removeClass("datepicker-block__calendar_hidden");
    };
    this.hideCalendar = () => {
      this.calendarContainer.addClass("datepicker-block__calendar_hidden");
    };
  }
}

/*
  this.startElement - object, storing data about start field
    field - field itself
    input - field's input
  this.endElement - object, storing data about end field
    field - field itself
    input - field's input

*/
export class DatepickerWithMultipleFields extends Datepicker {
  constructor(datepickerBlock) {
    super(datepickerBlock);

    this.startElement = {
      field: this.datepickerBlock.find(".datepicker-block__field[data-input='start']"),
      input: this.datepickerBlock.find(".datepicker-block__field[data-input='start'] .text-field__input")
    };
    this.endElement = {
      field: this.datepickerBlock.find(".datepicker-block__field[data-input='end']"),
      input: this.datepickerBlock.find(".datepicker-block__field[data-input='end'] .text-field__input")
    };

    // function, that is invoked after click on applyBtn 
    this.handleApplyBtnClick = () => {
      this.applyChanges(this.calendar.calendarInstance.selectedDates[0], this.calendar.calendarInstance.selectedDates[1]);
    };

    // function, that is invoked after click on clearBtn
    this.handleClearBtnClick = () => {
      this.clearDatepicker();
    };

    // function, that is invoked after click on docuemnt 
    this.handleDocumentClick = (event) => {
      const eTarget = event.target,
            isTargetStartField = this.startElement.field.is(eTarget),
            isTargetStartFieldChild = $.contains(this.startElement.field.get(0), eTarget),
            isTargetEndField = this.endElement.field.is(eTarget),
            isTargetEndFieldChild = $.contains(this.endElement.field.get(0), eTarget),
            hasParents = $(eTarget).parents().length > 0,
            isTargetParentNotCalendarContainer = $(eTarget).parents(".datepicker-block__calendar").length === 0,
            isTargetParentNotNavActionBtn = $(eTarget).parents(".datepicker--nav-action").length === 0;

      if (!isTargetStartField && !isTargetStartFieldChild && !isTargetEndField && !isTargetEndFieldChild) {
        if(hasParents && isTargetParentNotCalendarContainer && isTargetParentNotNavActionBtn) {
          this.hideCalendar();
        }
      } else {
        this.showCalendar();
      }
    };

    this.bindEventListeners();
  }

  // method, that returns string in trnasformed format
  transformDate(unformattedDate){
    const formattedDate = `${unformattedDate.toLocaleString("ru-ru", {dateStyle: "short"})}`;

    return formattedDate;
  }

  // method, that changes input's value according to selected dates
  // adds error message, if both dates aren't chosen 
  applyChanges(date1, date2) {
    if (date1 !== undefined && date2 !== undefined) {
      this.startElement.input.val(this.transformDate(date1));
      this.endElement.input.val(this.transformDate(date2));

      const isContainErrorMessage = $.contains(this.calendar.calendarContent.get(0), $(".calendar__error").get(0));

      if (isContainErrorMessage) {
        this.calendar.calendarContent.find(".calendar__error").remove();
      }

      this.hideCalendar();
    } else {
      this.calendar.calendarContent.append("<div class='calendar__error'>Выберите обе даты!</div>");
    }
  }

  // mmetod for clearing datepicker's input and calendar
  clearDatepicker() {
    this.calendar.calendarInstance.clear();

    this.startElement.input.val("");
    this.endElement.input.val("");
  }

  // metod for binding event listeners 
  bindEventListeners() {
    this.calendar.clearBtn.on("click", this.handleClearBtnClick);
    this.calendar.applyBtn.on("click", this.handleApplyBtnClick);
    $(document).on("click", this.handleDocumentClick);
  }
}

/*
  this.rangeElement - object, storing data about range date
      field - field itself
      input - field's input
*/
export class DatepickerWithSingleField extends Datepicker {
  constructor(datepickerBlock) {
    super(datepickerBlock);

    this.rangeElement = {
      field: this.datepickerBlock.find(".datepicker-block__field"),
      input: this.datepickerBlock.find(".datepicker-block__field .text-field__input")
    };

    // function, that is invoked after click on applyBtn
    this.handleApplyBtnClick = () => {
      this.applyChanges(this.calendar.calendarInstance.selectedDates[0], this.calendar.calendarInstance.selectedDates[1]);
    };

    // function, that is invoked after click on clearBtn
    this.handleClearBtnClick = () => {
      this.clearDatepicker();
    };

    // function, that is invoked after click on docuemnt 
    this.handleDocumentClick = (event) => {
      const eTarget = event.target,
      isTargetField = this.rangeElement.field.is(eTarget),
      isTargetFieldChild = $.contains(this.rangeElement.field.get(0), eTarget),
      hasParents = $(eTarget).parents().length > 0,
      isTargetParentNotCalendarContainer = $(eTarget).parents(".datepicker-block__calendar").length === 0,
      isTargetParentNotNavActionBtn = $(eTarget).parents(".datepicker--nav-action").length === 0;
  
      if (!isTargetField && !isTargetFieldChild) {
      if(hasParents && isTargetParentNotCalendarContainer && isTargetParentNotNavActionBtn) {
        this.hideCalendar();
      }
      } else {
        this.showCalendar();
      }
    };

    this.bindEventListeners();
  }

  // method, that returns string in trnasformed format
  transformDate(unformattedDate){
    const formattedDate = unformattedDate.toLocaleString("ru-ru", {day: "numeric", month: "short"}).replace(/\./, "");

    return formattedDate;
  }

  // method, that changes input's value according to selected dates
  // adds error message, if both dates aren't chosen 
  applyChanges(date1, date2) {
    if (date1 !== undefined && date2 !== undefined) {
      this.rangeElement.input.val(`${this.transformDate(date1)} - ${this.transformDate(date2)}`);

      const isContainErrorMessage = $.contains(this.calendar.calendarContent.get(0), $(".calendar__error").get(0));

      if (isContainErrorMessage) {
        this.calendar.calendarContent.find(".calendar__error").remove();
      }

      this.hideCalendar();
    } else {
      this.calendar.calendarContent.append("<div class='calendar__error'>Выберите обе даты!</div>");
    }
  }

  // mmetod for clearing datepicker's input and calendar
  clearDatepicker() {
    this.calendar.calendarInstance.clear();

    this.rangeElement.input.val("");
  }

  // metod for binding event listeners 
  bindEventListeners() {
    this.calendar.clearBtn.on("click", this.handleClearBtnClick);
    this.calendar.applyBtn.on("click", this.handleApplyBtnClick);
    $(document).on("click", this.handleDocumentClick);
  }
}