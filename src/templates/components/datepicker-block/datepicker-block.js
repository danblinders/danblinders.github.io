import "air-datepicker";

export default class Datepicker {
  constructor({container, startCalendarDate = new Date(), currentDate = new Date()}) {
    this.container = $(container);
    this.datepickerType = this.container.attr("data-datepicker-type");
    this.dateInitialStart = this.container.attr("data-initial-start") ? this.container.attr("data-initial-start") : null;
    this.dateInitialEnd = this.container.attr("data-initial-end") ? this.container.attr("data-initial-end") : null;
    this.serviceField = this.container.find(".datepicker-block__service-field .text-field__input");
    this.currentDate = currentDate;
    this.startCalendarDate = startCalendarDate;
  }

  addButtons() {
    return `<div class='datepicker--buttons'>
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
            </div>`;
  }

  render() {

    const datepickerInputStart = this.container.find(".datepicker-block__field[data-input='start'] .text-field__input"),
          datepickerInputEnd = this.container.find(".datepicker-block__field[data-input='end'] .text-field__input");

    console.log(this.dateInitialEnd);
    const transformDate = (unformattedDate) => {
      const day = (unformattedDate.getDate() < 10 ? "0" : "" ) + unformattedDate.getDate(),
                month = (unformattedDate.getMonth() + 1  < 10 ? "0" : "") + (unformattedDate.getMonth() + 1),
                year = unformattedDate.getFullYear();
            
      const formattedDate = `${day}.${month}.${year}`;
  
      return formattedDate;
    };

    const clearDatepicker = (datepickerElement, inputStart, inputEnd) => {
      datepickerElement.clear();
      
      inputStart.val("");
      inputEnd.val("");
    };

    const datepickerElem = this.serviceField.datepicker({
      language: "ru",
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
      },
      onSelect: function(formattedDate, date) {
        if (datepickerElem.selectedDates[0]) {
          const transformedDateStart = transformDate(datepickerElem.selectedDates[0]);

          datepickerInputStart.val(transformedDateStart);
          datepickerInputStart.attr("data-start",transformedDateStart);
        }
        
        if (datepickerElem.selectedDates[1]) {
          const transformedDateEnd = transformDate(datepickerElem.selectedDates[1]);
          
          datepickerInputEnd.val(transformedDateEnd);
          datepickerInputEnd.attr("data-start", transformedDateEnd);
        }
      }
    }).data("datepicker");


    datepickerInputStart.on("click", () => {
      datepickerElem.show();
    });

    datepickerInputEnd.on("click", () => {
      datepickerElem.show();
    });

    datepickerElem.selectDate([new Date(this.dateInitialStart), new Date(this.dateInitialEnd)]);

    const calendar = datepickerElem.$datepicker;

    calendar.append(this.addButtons());

    calendar.find(".datepicker--button[data-action='clear']").on("click", () => {
      clearDatepicker(datepickerElem, datepickerInputStart, datepickerInputEnd);
    });
  }
}