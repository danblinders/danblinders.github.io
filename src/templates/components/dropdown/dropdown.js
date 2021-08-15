import { timers } from "jquery";

const setDropdown = (dropdownSelector) => {
  class Dropdown {
    constructor(dropdown) {
      this.dropdown = $(dropdown);
      this.dropdownType = this.dropdown.attr("data-type");
      this.field = this.dropdown.find(".dropdown__field");
      this.menu = this.dropdown.find(".dropdown__menu");
      this.menuItems = this.menu.find(".dropdown__item");
      this.applyBtn = this.menu.find(".dropdown__button-apply");
      this.clearBtn = this.menu.find(".dropdown__button-clear");
  
      this.field.on("click", () => this.toggleDropdownMenu());

      this.applyBtn.on("click", () => {
        this.changeInputValue(this.countTotalValue());
      });

      this.clearBtn.on("click", () => {
        this.menuItems.each(function() {
          const menuItem = $(this);

          menuItem.attr("data-count", "0");
    
          menuItem.find(".dropdown__item-counter").text("0");
        });
        
        this.changeInputValue("");
      });
    }
  
    toggleDropdownMenu() {
      this.menu.toggleClass("dropdown__menu_expanded");

      if (this.menu.hasClass("dropdown__menu_expanded")) {
        this.menu.hide().slideDown(500);
      } else {
        this.menu.slideDown(0).slideUp(500);
      }
    }

    countTotalValue() {
      let totalValue = 0;

      this.menuItems.each(function() {
        totalValue += +$(this).attr("data-count");
      });

      return totalValue;
    }

    changeInputValue(newValue) {
      const inputElement = this.field.find(".dropdown__input-element");

      if (this.dropdownType === "guests") {
        const guestsCount = +newValue;

        if (guestsCount === 0) {
          inputElement.attr("value", "");
        } else {
          let remainder = guestsCount % 100;

          if (remainder > 4 && remainder < 21) {
            inputElement.attr("value", `${guestsCount} гостей`);
          } else {
            remainder = remainder % 10;
  
            if (remainder === 1) {
              inputElement.attr("value", `${guestsCount} гость`);
            } else if (remainder > 1 && remainder < 5) {
              inputElement.attr("value", `${guestsCount} гостя`);
            } else {
              inputElement.attr("value", `${guestsCount} гостей`);
            }
          }
        }
      } 

      if (this.dropdownType === "rooms") {
        const guestsCount = +newValue;

        let remainder = guestsCount % 100;

        if (remainder > 4 && remainder < 21) {
          inputElement.attr("value", `${guestsCount} гостей`);
        } else {
          remainder = remainder % 10;

          if (remainder === 1) {
            inputElement.attr("value", `${guestsCount} гость`);
          } else if (remainder > 1 && remainder < 5) {
            inputElement.attr("value", `${guestsCount} гостя`);
          } else {
            inputElement.attr("value", `${guestsCount} гостей`);
          }
        }
      } 




    }

    changeClearBtnVisibility() {
      this.clearBtn.toggleClass("dropdown__button-clear_hidden", this.countTotalValue() <= 0);
    }
  
    changeCounter(menuItemSelector) {
      const menuItem = $(menuItemSelector),
            minusBtn = menuItem.find(".dropdown__item-minus"),
            plusBtn = menuItem.find(".dropdown__item-plus"),
            counter = menuItem.find(".dropdown__item-counter");
  
      minusBtn.on("click", () => {
        if (+menuItem.attr("data-count") > 0) {
          menuItem.attr("data-count", +menuItem.attr("data-count") - 1);
          counter.text(`${+counter.text() - 1}`);
          this.changeClearBtnVisibility();
        }

        minusBtn.toggleClass("dropdown__item-minus_disabled", +menuItem.attr("data-count") <= 0);
        plusBtn.toggleClass("dropdown__item-plus_disabled", +menuItem.attr("data-count") >= 10);
      });
  
      plusBtn.on("click", () => {
        if (+menuItem.attr("data-count") < 10) {
          menuItem.attr("data-count", +menuItem.attr("data-count") + 1);
          counter.text(`${+counter.text() + 1}`);
          this.changeClearBtnVisibility();
        }

        minusBtn.toggleClass("dropdown__item-minus_disabled", +menuItem.attr("data-count") <= 0);
        plusBtn.toggleClass("dropdown__item-plus_disabled", +menuItem.attr("data-count") >= 10);
      });
    }
  }
  
  const dropdownElement = new Dropdown(dropdownSelector);

  dropdownElement.changeClearBtnVisibility();

  dropdownElement.menuItems.each(function() {
    dropdownElement.changeCounter(this);
  });

};

export default setDropdown;
  