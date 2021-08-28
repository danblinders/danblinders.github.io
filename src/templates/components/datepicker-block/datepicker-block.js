import "air-datepicker";

export default class Datepicker {
  constructor({container, startCalendarDate, currentDate = new Date()}) {
    this.container = $(container);
    this.dateStart = this.container.find(".datepicker-block__field[data-start]").attr("data-start");
    this.dateEnd = this.container.find(".datepicker-block__field[data-end]").attr("data-end");
    this.dateInputStart = this.container.find(".datepicker-block__field[data-start] .text-field__input");
    this.dateInputEnd = this.container.find(".datepicker-block__field[data-end] .text-field__input");
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

    const datepickerInputStart = this.dateInputStart,
          datepickerInputEnd = this.dateInputEnd,
          startDate = this.dateStart,
          endDate = this.dateEnd;

          console.log(startDate, endDate);
    
    const transformDate = (unformattedDate) => {
      const day = (unformattedDate.getDate() < 10 ? "0" : "" ) + unformattedDate.getDate(),
                month = (unformattedDate.getMonth() + 1  < 10 ? "0" : "") + (unformattedDate.getMonth() + 1),
                year = unformattedDate.getFullYear();
            
      const formattedDate = `${day}.${month}.${year}`;
  
      return formattedDate;
    };

    const clearDatepicker = (datepickerElement, inputEnd) => {
      datepickerElement.clear();
      inputEnd.val("");
    };

    const datepickerElem = datepickerInputStart.datepicker({
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

    datepickerInputEnd.on("click", () => {
      datepickerElem.show();
    });

    datepickerElem.selectDate([new Date(startDate), new Date(endDate)]);

    const calendar = datepickerElem.$datepicker;

    calendar.append(this.addButtons());

    calendar.find(".datepicker--button[data-action='clear']").on("click", () => {
      clearDatepicker(datepickerElem, datepickerInputEnd);
    });
  }
}