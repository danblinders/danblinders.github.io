import "air-datepicker";

export default class Datepicker {
  constructor({container, startCalendarDate = new Date(), currentDate = new Date()}) {
    this.container = $(container);
    this.datepickerType = this.container.attr("data-datepicker-type");
    this.dateInitialStart = this.container.attr("data-initial-start") ? this.container.attr("data-initial-start") : null;
    this.dateInitialEnd = this.container.attr("data-initial-end") ? this.container.attr("data-initial-end") : null;

    if (this.datepickerType === "multiple-fields") {
      this.datepickerStartField = this.container.find(".datepicker-block__field[data-input='start']");
      this.datepickerEndField = this.container.find(".datepicker-block__field[data-input='end']");

      this.datepickerStartFieldInput = this.container.find(".datepicker-block__field[data-input='start'] .text-field__input");
      this.datepickerEndFieldInput = this.container.find(".datepicker-block__field[data-input='end'] .text-field__input");
    } else {
      this.datepickerRangeField = this.container.find(".datepicker-block__field");
      this.datepickerRangeFieldInput = this.container.find(".datepicker-block__field .text-field__input");
    }

    this.serviceField = this.container.find(".datepicker-block__service-field .text-field__input");
    this.currentDate = currentDate;
    this.startCalendarDate = startCalendarDate;

    this.applyChanges(new Date(this.dateInitialStart), new Date(this.dateInitialEnd));
  }

  addButtons() {
    return `<div class='datepicker--buttons'>
              <div class='datepicker--main-button' data-action='clear'>
                <button class='main-button main-button_simple'>
                  <span class="main-button__inner">очистить</span>
                </button>
              </div> 
              <div class='datepicker--main-button' data-action='apply'>
                <button class='main-button main-button_simple'>
                  <span class="main-button__inner">применить</span>
                </button>
              </div>
            </div>`;
  }

  transformDate(unformattedDate){
    let formattedDate;

    if (this.datepickerType === "multiple-fields") {
      formattedDate = `${unformattedDate.toLocaleString("ru-ru", {dateStyle: "short"})}`;
    } else {
      formattedDate = unformattedDate.toLocaleString("ru-ru", {day: "numeric", month: "short"}).replace(/\./, "");
    }

    return formattedDate;
  }

  applyChanges(date1, date2) {
    if (date1 !== undefined && date2 !== undefined) {
      if (this.datepickerType === "multiple-fields") { 
        this.datepickerStartFieldInput.val(this.transformDate(date1));
        this.datepickerEndFieldInput.val(this.transformDate(date2));
      } else {
        this.datepickerRangeFieldInput.val(`${this.transformDate(date1)} - ${this.transformDate(date2)}`);
      }
    } else {
      console.error("Choose both dates");
    }
  }

  clearDatepicker(datepickerElement) {
    datepickerElement.clear();

    if (this.datepickerType === "multiple-fields") { 
      this.datepickerStartFieldInput.val("");
      this.datepickerEndFieldInput.val("");
    } else {
      this.datepickerRangeFieldInput.val("");
    }
  }



  render() {
    const datepickerElem = this.serviceField.datepicker({
      language: "ru",
      offset: 5.5,
      range: true,
      currentDate: this.currentDate,
      startDate: this.startCalendarDate,
      dateFormat: "dd.mm.yyyy",
      navTitles: {
        days: "MM yyyy"
      },
      prevHtml: "<button class='datepicker--nav-button'>arrow_back</button>",
      nextHtml: "<button class='datepicker--nav-button'>arrow_forward</button>",
      onRenderCell: function(date) {
        const areDaysMatched = date.getDate() == this.currentDate.getDate() ? true : false,
              areMonthsMatched = date.getMonth() == this.currentDate.getMonth() ? true : false,
              areYearsMatched = date.getFullYear() == this.currentDate.getFullYear() ? true : false;
            
        if (areDaysMatched && areMonthsMatched && areYearsMatched) {
          return {
            classes: "-current-"
          };
        }
      }
    }).data("datepicker");

    const calendar = datepickerElem.$datepicker;

    calendar.append(this.addButtons());

    calendar.find(".datepicker--btn[data-action='clear']").on("click", () => {
      this.clearDatepicker(datepickerElem);
    });

    calendar.find(".datepicker--btn[data-action='apply']").on("click", () => {
      this.applyChanges(datepickerElem.selectedDates[0], datepickerElem.selectedDates[1]);
      datepickerElem.hide();
    });

    if (this.datepickerType === "multiple-fields") { 
      this.datepickerStartField.on("click", () => {
        datepickerElem.show();
      });
      this.datepickerEndField.on("click", () => {
        datepickerElem.show();
      });
    } else {
      this.datepickerRangeField.on("click", () => {
        datepickerElem.show();
      });
    }

    datepickerElem.selectDate([new Date(this.dateInitialStart), new Date(this.dateInitialEnd)]);
  }
}