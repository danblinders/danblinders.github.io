import "air-datepicker";

export default class Datepicker {
  constructor({container, startDate = new Date(), currentDate = new Date()}) {
    this.container = $(container);
    this.dateInput = this.container.find(".datepicker-field__input");
    this.dateInputElement = this.container.find(".datepicker-field__input-element");
    this.startDate = startDate;
    this.currentDate = currentDate;
  }

  setCurrentDate(calendar, newCurrentDate) {
    calendar.find(".datepicker--cell-day").each(function() {
      const dayCell = $(this);
      const areDaysMatched = dayCell.attr("data-date") == newCurrentDate.getDate() ? true : false,
            areMonthsMatched = dayCell.attr("data-month") == newCurrentDate.getMonth() ? true : false,
            areYearsMatched = dayCell.attr("data-year") == newCurrentDate.getFullYear() ? true : false;
          
      if (areDaysMatched && areMonthsMatched && areYearsMatched) {
        console.log(dayCell);
        dayCell.addClass("-current-");
      }
    });
  }

  clearDatePicker(datepickerElement) {
    datepickerElement.clear();
  }

  render() {
    const datepickerElem = this.dateInputElement.datepicker({
      inline: true,
      range: true,
      startDate: this.startDate,
      dateFormat: "dd.mm.yyyy",
      navTitles: {
        days: 'MM yyyy'
      },
      prevHtml: "<button class = 'datepicker--nav-button'>arrow_back</button>",
      nextHtml: "<button class = 'datepicker--nav-button'>arrow_forward</button>"
    }).data("datepicker");

    const calendar = this.dateInput.find(".datepicker");

    calendar.append(`<div class='datepicker--buttons'>
                        <div class='datepicker--button' data-action='clear'>
                          <button class='main-button main-button_simple'>
                            <span class="main-button__inner">очистить</span>
                          </button>
                        </div> 
                        <div class='datepicker--button' data-action='apply'>
                          <button class='main-button main-button_simple'>
                            <span class="main-button__inner">применить</span>
                          </button>
                        </div>
                      </div>`);

  datepickerElem.selectDate([new Date("08.19.2019"), new Date("08.23.2019")]);

  this.setCurrentDate(calendar, this.currentDate);

  calendar.find(".datepicker--button[data-action='clear']").on("click", () => {
    this.clearDatePicker(datepickerElem, calendar);

    this.setCurrentDate(calendar, this.currentDate);
  });
  }
}