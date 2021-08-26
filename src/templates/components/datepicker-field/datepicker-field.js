import "air-datepicker";

export default class Datepicker {
  constructor({container, startDate = new Date(), currentDate = new Date()}) {
    this.container = $(container);
    this.dateInputStart = this.container.find(".datepicker-field__input-element[data-date='start']");
    this.dateInputEnd = this.container.find(".datepicker-field__input-element[data-date='end']");
    this.startDate = startDate;
    this.currentDate = currentDate;
  }

  render() {

    const datepickerInputStart = this.dateInputStart,
          datepickerInputEnd = this.dateInputEnd;

    const datepickerElem = datepickerInputStart.datepicker({
      range: true,
      currentDate: this.currentDate,
      startDate: this.startDate,
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
      },
      onSelect: function(formattedDate, date) {
        if (datepickerElem.selectedDates[0]) {
          datepickerInputStart.val(`${(datepickerElem.selectedDates[0].getDate() < 10 ? "0" : "" ) + datepickerElem.selectedDates[0].getDate()}.${(datepickerElem.selectedDates[0].getMonth() + 1  < 10 ? "0" : "") + datepickerElem.selectedDates[0].getMonth()}.${datepickerElem.selectedDates[0].getFullYear()}`);
        }
        
        if (datepickerElem.selectedDates[1]) {
          datepickerInputEnd.val(`${(datepickerElem.selectedDates[1].getDate() < 10 ? "0" : "" ) + datepickerElem.selectedDates[1].getDate()}.${(datepickerElem.selectedDates[1].getMonth() + 1  < 10 ? "0" : "") + datepickerElem.selectedDates[1].getMonth()}.${datepickerElem.selectedDates[1].getFullYear()}`);
        }
        
      }
    }).data("datepicker");

    datepickerInputEnd.on("click", () => {
      datepickerElem.show();
    });

    const calendar = datepickerElem.$datepicker;

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

    calendar.find(".datepicker--button[data-action='clear']").on("click", () => {
      datepickerElem.clear();
      datepickerInputEnd.val("");
    });
  }
}