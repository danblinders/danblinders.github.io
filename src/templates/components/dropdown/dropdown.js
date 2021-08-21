import { expr } from "jquery";

export default class Dropdown {
  constructor(dropdownSelector) {
    this.dropdown = $(dropdownSelector);
    this.dropdownField = this.dropdown.find(".dropdown__input");
    this.dropdownInput = this.dropdown.find(".dropdown__input-element");
    this.dropdownMenu = this.dropdown.find(".dropdown__menu");
    this.dropdownMenuHeight = this.dropdownMenu.css("height");
    this.dropdownMenuItems = this.dropdown.find(".dropdown__item");
    this.dropdownBtnClear = this.dropdown.find(".dropdown__button-clear");
    this.dropdownBtnApply = this.dropdown.find(".dropdown__button-apply");
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  handleInputFieldClick() {
    this.dropdownField.on("click", this.toggleDropdown);
  }

  handleDropdownClearBtnClick() {
    this.dropdownMenuItems.each(index => {
      const menuItem = $(this.dropdownMenuItems[index]),
            itemCounter = menuItem.find(".dropdown__item-counter");

      this.dropdownBtnClear.on("click", () => {
        this.setMenuItemCount(0, menuItem, itemCounter);
      });
    });
  }

  handleMenuItemsBtnClick() {
    this.dropdownMenuItems.each(index => {
      const menuItem = $(this.dropdownMenuItems[index]),
            minusBtn = menuItem.find(".dropdown__item-button-minus"),
            plusBtn = menuItem.find(".dropdown__item-button-plus"),
            itemCounter = menuItem.find(".dropdown__item-counter");
      
      let itemCurrentCount = +menuItem.attr("data-count");

      minusBtn.on("click", () => {
        if (itemCurrentCount >= 1) {
          this.setMenuItemCount(--itemCurrentCount, menuItem, itemCounter);
          this.changeDropdownClearBtnVisibility();
        } else {
          minusBtn.attr("disabled", true);
        }

        if (itemCurrentCount <= 4) {
          plusBtn.attr("disabled", false);
        }
      });

      plusBtn.on("click", () => {
        if (itemCurrentCount <= 4) {
          this.setMenuItemCount(++itemCurrentCount, menuItem, itemCounter);
          this.changeDropdownClearBtnVisibility();
        } else {
          plusBtn.attr("disabled", true);
        }

        if (itemCurrentCount >= 1) {
          minusBtn.attr("disabled", false);
        }
      });
    });
  }

  changeDropdownClearBtnVisibility() {
    let totalCount = 0;

    this.dropdownMenuItems.each(index => {
      const menuItem = $(this.dropdownMenuItems[index]),
            itemCurrentCount = +menuItem.attr("data-count");
      totalCount += itemCurrentCount;
    });

    this.dropdownBtnClear.toggleClass("dropdown__button-clear_hidden", totalCount === 0);
  }

  changeDropdownMenuVisibility() {
    if (this.dropdown.hasClass("dropdown_expanded")) {
      this.dropdownMenu.css("height", this.dropdownMenuHeight);
    } else {
      this.dropdownMenu.css("height", 0);
    }
  }

  toggleDropdown() {
    this.dropdown.toggleClass("dropdown_expanded");

    this.changeDropdownMenuVisibility();
  }

  setMenuItemCount(newValue, menuItem, itemCounter) {
    const newCountValue = +newValue;

    menuItem.attr("data-count", newCountValue);

    itemCounter.text(newCountValue);
  }
}