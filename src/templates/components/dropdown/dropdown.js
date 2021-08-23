import { expr } from "jquery";

export default class Dropdown {
  constructor(dropdownSelector) {
    this.dropdown = $(dropdownSelector);
    this.dropdownContentType = this.dropdown.attr("data-content");
    this.dropdownField = this.dropdown.find(".dropdown__input");
    this.dropdownInput = this.dropdown.find(".dropdown__input-element");
    this.dropdownMenu = this.dropdown.find(".dropdown__menu");
    this.dropdownMenuHeight = this.dropdownMenu.css("height");
    this.dropdownMenuItems = this.dropdown.find(".dropdown__item");
    this.dropdownBtnClear = this.dropdown.find(".dropdown__button-clear");
    this.dropdownBtnApply = this.dropdown.find(".dropdown__button-apply");
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  // method for toggling dropdown state after click on dropdown's field
  handleInputFieldClick() {
    this.dropdownField.on("click", this.toggleDropdown);
  }

  // method for clearing dropdown after click on dropdown's clear button
  handleDropdownClearBtnClick() {
    this.dropdownMenuItems.each(index => {
      const menuItem = $(this.dropdownMenuItems[index]),
            itemCounter = menuItem.find(".dropdown__item-counter");

      this.dropdownBtnClear.on("click", () => {
        this.setMenuItemCount(0, menuItem, itemCounter);
        this.dropdownInput.attr("value", "");
      });
    });
  }

  // method for changing menu item's count after clicck on minus or plus buttons
  handleMenuItemsBtnClick() {
    this.dropdownMenuItems.each(index => {
      const menuItem = $(this.dropdownMenuItems[index]),
            minusBtn = menuItem.find(".dropdown__item-button-minus"),
            plusBtn = menuItem.find(".dropdown__item-button-plus"),
            itemCounter = menuItem.find(".dropdown__item-counter");

      // after  click on minus button
      minusBtn.on("click", () => {
        // If menu item data-subject attribute is adults:
        if(menuItem.attr("data-subject") === "adults") {
          // Variable for checking, if count of menu items with data-subject attributes "children" and "infants" isn't equal to 0
          let childrenAndInfantsCount = 0;
          this.dropdownMenuItems.each(index => { 
            if (($(this.dropdownMenuItems[index]).attr("data-subject") === "children" || $(this.dropdownMenuItems[index]).attr("data-subject") === "infants") && $(this.dropdownMenuItems[index]).attr("data-count") !== "0") {
              // if count of menu items with data-subject attributes "children" and "infants" isn't equal to 0,increase childrenAndInfantsCountAttribute
              childrenAndInfantsCount++;
            }
          });
          // Use won't be able to set adult's menu item to 0, if children's and infants' counts aren't equal to 0 
          if (childrenAndInfantsCount !== 0 && +menuItem.attr("data-count") < 2) {
            this.setMenuItemCount(+menuItem.attr("data-count"), menuItem, itemCounter);
          } else {
            this.setMenuItemCount(+menuItem.attr("data-count") - 1, menuItem, itemCounter);
          }
        } else {
          // If menu item data-subject attribute isn't adults and greater or equal to 1, decrement item's count and change clear button visibility
          if (+menuItem.attr("data-count") >= 1) {
            this.setMenuItemCount(+menuItem.attr("data-count") - 1, menuItem, itemCounter);
            this.changeDropdownClearBtnVisibility();
          } else {
            // If item's count is less than 1, disable minus btn
            minusBtn.attr("disabled", true);
          }
        }
        // If item's count is less or equal to 4, enable plus buton
        if (+menuItem.attr("data-count") <= 4) {
          plusBtn.attr("disabled", false);
        }

        // Changing input's value text
        this.changeInputValue();
      });

      // After click on plus button
      plusBtn.on("click", () => {
        // If item's count is less or equal to 4
        if (+menuItem.attr("data-count") <= 4) {
          // Check, of menu item's data-subject attribute is equal to children or infants
          if (menuItem.attr("data-subject") === "children" || menuItem.attr("data-subject") === "infants") {
            this.dropdownMenuItems.each(index => { 
              // If there are no adults, increase count of menu item with data-subject attribute equal to adults and disable 
              if ($(this.dropdownMenuItems[index]).attr("data-subject") === "adults" && $(this.dropdownMenuItems[index]).attr("data-count") === "0") {
                const adultMenuItem = $(this.dropdownMenuItems[index]);
                this.setMenuItemCount(+adultMenuItem.attr("data-count") + 1, adultMenuItem, adultMenuItem.find(".dropdown__item-counter"));
              }
            });
          }
          // Increment item's count and change clear button visibility
          this.setMenuItemCount(+menuItem.attr("data-count") + 1, menuItem, itemCounter);
          this.changeDropdownClearBtnVisibility();
        } else {
           // If menu item greater than 4, disable plus button
          plusBtn.attr("disabled", true);
        }

        // If menu item greater or equal to 1, enable minus button
        if (+menuItem.attr("data-count") >= 1) {
          minusBtn.attr("disabled", false);
        }

        // Changing input's value text
        this.changeInputValue();
      });
    });
  }

  // Method for changing clear button visibility
  changeDropdownClearBtnVisibility() {
    let totalCount = 0;

    this.dropdownMenuItems.each(index => {
      const menuItem = $(this.dropdownMenuItems[index]),
            itemCurrentCount = +menuItem.attr("data-count");
      totalCount += itemCurrentCount;
    });

    // If all menu items' counts are equal to 0, hide clear button
    this.dropdownBtnClear.toggleClass("dropdown__button-clear_hidden", totalCount === 0);
  }

  // Method for hiding and expanding dropdown menu
  changeDropdownMenuVisibility() {
    if (this.dropdown.hasClass("dropdown_expanded")) {
      this.dropdownMenu.css("height", this.dropdownMenuHeight);
    } else {
      this.dropdownMenu.css("height", 0);
    }
  }

  // Method for toggling dropdown's state
  toggleDropdown() {
    this.dropdown.toggleClass("dropdown_expanded");

    this.changeDropdownMenuVisibility();
  }

  // Method for setting new value for menu's item
  setMenuItemCount(newValue, menuItem, itemCounter) {
    const newCountValue = +newValue;

    menuItem.attr("data-count", newCountValue);

    itemCounter.text(newCountValue);
  }

  // Method for changing inputs's value text
  changeInputValue() {
    if(this.dropdownContentType === "rooms") {

      let inputTextsArr = [],
          bedroomsValueText,
          bedsValueText,
          bathroomsValueText;
      
      this.dropdownMenuItems.each(index => {

        const menuItem = $(this.dropdownMenuItems[index]);
        switch (menuItem.attr("data-subject")) {
          case "bedrooms": 
            bedroomsValueText = this.generateInputValueText(menuItem.attr("data-count"), ["спальня", "спальни", "спален"]);
            if (+menuItem.attr("data-count") !== 0) {
              inputTextsArr.push(bedroomsValueText);
            }
            break;
          case "beds": 
            bedsValueText = this.generateInputValueText(menuItem.attr("data-count"), ["кровать", "кровати", "кроватей"]);
            if (+menuItem.attr("data-count") !== 0) {
              inputTextsArr.push(bedsValueText);
            }
            break;
          case "bathrooms": 
            bathroomsValueText = this.generateInputValueText(menuItem.attr("data-count"), ["ванная комната", "ванные комнаты", "ванных комнат"]);
            if (+menuItem.attr("data-count") !== 0) {
              inputTextsArr.push(bathroomsValueText);
            }
            break;
        }

        this.dropdownInput.attr("value", inputTextsArr.length !== 0 ? `${inputTextsArr.join(", ")}...` : "");
      });
    }

    if (this.dropdownContentType === "guests") {
      
      let guestsCount = 0,
          infantValueText,
          totalValueText = "";

      this.dropdownMenuItems.each(index => {
        const menuItem = $(this.dropdownMenuItems[index]);

        switch (menuItem.attr("data-subject")) {
          case "adults": 
            guestsCount += +menuItem.attr("data-count");
            break;
          case "children": 
            guestsCount += +menuItem.attr("data-count");
            break;
          case "infants": 
            if (+menuItem.attr("data-count") !== 0) {
              infantValueText = this.generateInputValueText(menuItem.attr("data-count"), ["младенец", "младенца", "младенцев"]);
            }
            break;
        }

        if (guestsCount !== 0) {
          totalValueText = this.generateInputValueText(guestsCount, ["гость", "гостя", "гостей"]);
        }

        if (infantValueText) {
          totalValueText += `, ${infantValueText}`;
        }
        
        this.dropdownInput.attr("value", totalValueText !== "" ? totalValueText : "");
      });
    }
  }

  // Method for declining words, depending on count value
  generateInputValueText(newValue, wordforms) {

    let inclinedWord; 

    let number = +newValue;

    inclinedWord = ((number %= 100), (number < 20 && number > 4) ? wordforms[2] : 
    (number %= 10), number === 1 ? wordforms[0] : 
    (number < 5 && number > 0) ? wordforms[1] : wordforms[2]);

    return `${newValue} ${inclinedWord}`;
  }
}