import Calendar from "../calendar/calendar";

class Datepicker {
  constructor({datepickerBlock, startCalendarDate, currentDate} = null) {
    this.datepickerBlock = $(datepickerBlock);
    this.datepickerType = this.datepickerBlock.attr("data-datepicker-type");
    this.calendarContainer = this.datepickerBlock.find(".datepicker-block__calendar");
    this.calendar = new Calendar({container: this.calendarContainer.find(".calendar"), 
                                startCalendarDate: startCalendarDate, 
                                currentDate: currentDate
                              });
    this.dateInitialStart = this.datepickerBlock.attr("data-initial-start") ? this.datepickerBlock.attr("data-initial-start") : "";
    this.dateInitialEnd = this.datepickerBlock.attr("data-initial-end") ? this.datepickerBlock.attr("data-initial-end") : "";
    if (this.dateInitialStart && this.dateInitialEnd) {
      this.calendar.calendarInstance.selectDate([new Date(this.dateInitialStart), new Date(this.dateInitialEnd)]);
    }

    this.showCalendar = () => {
      this.calendarContainer.removeClass("datepicker-block__calendar_hidden");
    };

    
    this.hideCalendar = () => {
      this.calendarContainer.addClass("datepicker-block__calendar_hidden");
    };
  }
}


export class DatepickerWithMultipleFields extends Datepicker {
  constructor({datepickerBlock, 
              startCalendarDate, 
              currentDate} = null) {
    super({datepickerBlock: datepickerBlock, startCalendarDate: startCalendarDate, currentDate: currentDate});

    this.startElement = {
      field: this.datepickerBlock.find(".datepicker-block__field[data-input='start']"),
      input: this.datepickerBlock.find(".datepicker-block__field[data-input='start'] .text-field__input")
    };
    this.endElement = {
      field: this.datepickerBlock.find(".datepicker-block__field[data-input='end']"),
      input: this.datepickerBlock.find(".datepicker-block__field[data-input='end'] .text-field__input")
    };

    this.handleApplyBtnClick = () => {
      this.applyChanges(this.calendar.calendarInstance.selectedDates[0], this.calendar.calendarInstance.selectedDates[1]);
    };

    this.clearDatepicker = () => {
      this.calendar.calendarInstance.clear();
  
      this.startElement.input.val("");
      this.EndElement.input.val("");
    };

    this.bindEventListeners();
  }

  bindEventListeners() {
    this.calendar.clearBtn.on("click", this.clearDatepicker);
    this.calendar.applyBtn.on("click", this.handleApplyBtnClick);
    this.startElement.field.on("click", this.showCalendar);
    this.endElement.field.on("click", this.showCalendar);
    $(document).on("click", (event) => {
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
      }
    });
  }

  transformDate(unformattedDate){
    const formattedDate = `${unformattedDate.toLocaleString("ru-ru", {dateStyle: "short"})}`;

    return formattedDate;
  }

  applyChanges(date1, date2) {
    if (date1 !== undefined && date2 !== undefined) {
      this.startElement.input.val(this.transformDate(date1));
      this.endElement.input.val(this.transformDate(date2));
      this.hideCalendar();
    } else {
      console.error("Choose both dates");
    }
  }
}


export class DatepickerWithSingleField extends Datepicker {
  constructor({datepickerBlock, startCalendarDate, currentDate} = null) {
    super({datepickerBlock: datepickerBlock, startCalendarDate: startCalendarDate, currentDate: currentDate});

    this.rangeElement = {
      field: this.datepickerBlock.find(".datepicker-block__field"),
      input: this.datepickerBlock.find(".datepicker-block__field .text-field__input")
    };

    this.handleApplyBtnClick = () => {
      this.applyChanges(this.calendar.calendarInstance.selectedDates[0], this.calendar.calendarInstance.selectedDates[1]);
    };

    this.clearDatepicker = () => {
      this.calendar.calendarInstance.clear();
  
      this.rangeElement.input.val("");
    };

    this.bindEventListeners();
  }

  bindEventListeners() {
    this.calendar.clearBtn.on("click", this.clearDatepicker);
    this.calendar.applyBtn.on("click", this.handleApplyBtnClick);
    this.rangeElement.field.on("click", this.showCalendar);
    $(document).on("click", (event) => {
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
      }
    });
  }

  transformDate(unformattedDate){
    const formattedDate = unformattedDate.toLocaleString("ru-ru", {day: "numeric", month: "short"}).replace(/\./, "");

    return formattedDate;
  }

  applyChanges(date1, date2) {
    if (date1 !== undefined && date2 !== undefined) {
      this.rangeElement.input.val(`${this.transformDate(date1)} - ${this.transformDate(date2)}`);
      this.hideCalendar();
    } else {
      console.error("Choose both dates");
    }
  }

  // handleDocumentClick(e) {
  //   if(e.target !== this.calendarContainer) {
  //     this.hideCalendar();
  //   }
  // }
}