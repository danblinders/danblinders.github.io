/*
  this.btn - block, containing all button's elements
  this.inputs - all inputs field inside button
  this.icons - all star icons inside button
  this.settedRating - current rating
*/
export default class RateButton {
  constructor(btnSelector) {
    this.btn = $(btnSelector);
    this.inputs = this.btn.find(".rate-button__input");
    this.icons = this.btn.find(".rate-button__icon");
    this.settedRating = 0;

    // get initial rating value
    this.inputs.each(index => {
      if ($(this.inputs[index]).attr("checked")) {
        this.settedRating = +$(this.inputs[index]).attr("value");
      }
    });

    // After click on star icon
    // Set new rating
    // Toggle star icons classes accroding to rating
    this.handleIconClick = (event) => {
      this.settedRating  = +$(event.target).siblings(".rate-button__input").attr("value");
  
      this.icons.each(index => {
        $(this.icons[index]).toggleClass("rate-button__icon_filled", index < this.settedRating);
      });
    };

    // After mouse movement nside star icon
    // Create proxy variable for rating (property settedRating isn't use because on mouse over we don't apply any changes to rating)
    // Toggle star icons classes accroding to rating
    this.handleIconMouseOver = (event) => {
      const rating = +$(event.target).siblings(".rate-button__input").attr("value");
  
      this.icons.each(index => {
        $(this.icons[index]).toggleClass("rate-button__icon_filled", index < rating);
      });
    };

      // After mouseleft star icon
    // Toggle star icons classes accroding to settedRating property
    this.handleIconMouseLeave = (event) => {
      this.icons.each(index => {
        $(this.icons[index]).toggleClass("rate-button__icon_filled", index < this.settedRating);
      });
    };

    this.bindEventHandlers();
  }

  bindEventHandlers() {
    this.icons.each(index => {
      $(this.icons[index]).on("click", this.handleIconClick);
      $(this.icons[index]).on("mouseover", this.handleIconMouseOver);
      $(this.icons[index]).on("mouseleave", this.handleIconMouseLeave);
    });
  }
}