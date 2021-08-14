import { timers } from "jquery";

const setDropdown = (dropdownSelector) => {
  class Dropdown {
    constructor(dropdown) {
      this.dropdown = $(dropdown);
      this.dropdownType = this.dropdown.attr("data-type");
      this.field = this.dropdown.find(".dropdown__field");
      this.menu = this.dropdown.find(".dropdown__menu");
      this.menuItems = this.dropdown.find(".dropdown__item");
      this.applyBtn = this.dropdown.find(".dropdown__button-apply");
      this.clearBtn = this.dropdown.find(".dropdown__button-clear");
  
      this.field.on("click", () => this.toggleDropdown());

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
  
    toggleDropdown() {
      this.dropdown.toggleClass("dropdown_expanded");
      this.menu.slideToggle();
    }

    countTotalValue() {
      let totalValue = 0;

      this.menuItems.each(function() {
        totalValue += +$(this).attr("data-count");
      });

      return totalValue;
    }

    changeInputValue(newValue) {
      this.field.find(".dropdown__input-element").attr("value", newValue);
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
        menuItem.attr("data-count", +menuItem.attr("data-count") - 1);
        counter.text(`${+counter.text() - 1}`);
        this.changeClearBtnVisibility();
      });
  
      plusBtn.on("click", () => {
        menuItem.attr("data-count", +menuItem.attr("data-count") + 1);
        counter.text(`${+counter.text() + 1}`);
        this.changeClearBtnVisibility();
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
  