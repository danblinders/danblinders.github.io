import "air-datepicker";


export default class Calendar {
  constructor({container, startCalendarDate = new Date(), currentDate = new Date()}) {
    this.container = $(container);
    this.calendarContent = this.container.find(".calendar__content");
    this.startCalendarDate = startCalendarDate;
    this.currentDate = currentDate;
    this.clearBtn = this.container.find(".calendar__button[data-action='clear']");
    this.applyBtn = this.container.find(".calendar__button[data-action='apply']");
    this.calendarInstance = this.calendarContent.datepicker({
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
  }
}