/*
  this.btn - block. containing all buttons' elements
  this.btnIcon - button's icon 
  this.btnCounter - buttons's counter area, where the total amount of likes is displayed
  this.activeClasses - active classes for button, it'icon and counter's area
*/
export default class LikeButton {
  constructor(btnSelector) {
    this.btn = $(btnSelector);
    this.btnIcon = this.btn.find(".like-button__icon");
    this.btnCounter = this.btn.find(".like-button__counter");
    this.activeClasses = {
      activeButton: `like-button_${this.btn.attr("data-border-color")}`,
      activeIcon: ["like-button__icon_filled", `like-button__icon_${this.btn.attr("data-icon-color")}`],
      activeCounter: `like-button__counter_${this.btn.attr("data-counter-color")}`
    };

    // After click on btn
    // Change data-active attribute value
    // Chnage counter's value
    // Toggle active classes
    this.handleBtnClick = () => {
      this.btn.attr("data-active", (this.btn.attr("data-active") === "true") ? "false" : "true");
      
      this.changeCounterValue();

      this.toggleActiveClasses();
    };

    this.btn.on("click", this.handleBtnClick);
  }

  //Method for toggling btn element's active classes
  toggleActiveClasses() {
    this.btn.toggleClass(this.activeClasses.activeButton);
    this.btnIcon.toggleClass(this.activeClasses.activeIcon);
    this.btnCounter.toggleClass(this.activeClasses.activeCounter);

    // if counter's value isn't a 1-digit number, add padding 
    this.btnCounter.toggleClass("like-button__counter_with_padding", +this.btn.attr("data-count") < 10);
  }

  changeCounterValue() {

    // Getting current counter's value 
    let countValue = +this.btn.attr("data-count");

    // If button's data-active attribute is true, increment countValue and set new value to data-count attribute and text inside counter
    // Else decrement countValue and set new value to data-count attribute and text inside counter
    if (this.btn.attr("data-active") === "true") {
      this.btn.attr("data-active", `${++countValue}`);

      this.btnCounter.text(`${countValue}`);
    } else {
      this.btn.attr("data-count", `${--countValue}`);

      this.btnCounter.text(`${countValue}`);
    }
  }
}