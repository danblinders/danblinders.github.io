import "air-datepicker";

/* 
  this.calendarBlock - block, containing calendar
  this.calendarContent - content-block, where will rendered calendar air-datepicker plugin
  this.renderCalendarDate - date, that will be shown at first initialization
  this.currentDate - changin currentDate(created specially for ui-kit pixel-perfect)
  this.clearBtn - button for clearing calendar (and datepicker on the whole)
  this.applyBtn - button for applying changes, made in calendar
  this.calendarInstance - insatnce of air-datepicker plugin's calendar with all settings
*/
export default class Calendar {
  constructor(container) {
    this.calendarBlock = $(container);
    this.calendarContent = this.calendarBlock.find(".calendar__content");
    this.renderCalendarDate = this.calendarBlock.attr("data-render-date") ? new Date(this.calendarBlock.attr("data-render-date")) : new Date();
    this.currentDate = this.calendarBlock.attr("data-current") ?new Date(this.calendarBlock.attr("data-current")) : new Date();
    this.clearBtn = this.calendarBlock.find(".calendar__button[data-action='clear']");
    this.applyBtn = this.calendarBlock.find(".calendar__button[data-action='apply']");
    this.calendarInstance = this.calendarContent.datepicker({
      language: "ru",
      offset: 5.5,
      range: true,
      currentDate: this.currentDate,
      startDate: this.renderCalendarDate,
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
    if (this.calendarBlock.attr("data-initial-start") && this.calendarBlock.attr("data-initial-end")) {
      this.dateInitialStart = this.calendarBlock.attr("data-initial-start") ? this.calendarBlock.attr("data-initial-start") : "";
      this.dateInitialEnd = this.calendarBlock.attr("data-initial-end") ? this.calendarBlock.attr("data-initial-end") : "";

      // Selecting initial date via air-datepicker plugin's API
      this.calendarInstance.selectDate([new Date(this.dateInitialStart), new Date(this.dateInitialEnd)]);
    }
  }
}