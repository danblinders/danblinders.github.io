import "ion-rangeslider";

/*
  this.slider - block, containing all slider's elements
  this.sliderInput - slider's input
  this.sliderValueArea - element, where chosen range of numbers is displayed 
  this.minValue - minimal value for slider
  this.maxValue - maximum value for slider
  this.startValue - start value of range, chosen after slider's initialization
  this.startValue - end value of range, chosen after slider's initialization
  this.sliderInstance - instance of ion-rangeslider with basic settings for slider
*/
export default class RangeSlider {
  constructor(sliderSelector) {
    this.slider = $(sliderSelector);
    this.sliderInput = this.slider.find(".range-slider__input");
    this.sliderValueArea = this.slider.find(".range-slider__value");
    this.minValue = +this.slider.attr("data-min");
    this.maxValue = +this.slider.attr("data-max");
    this.startValue = +this.slider.attr("data-start");
    this.endValue = +this.slider.attr("data-end");
    this.sliderInstance = this.sliderInput.ionRangeSlider({
      type: "double",
      min: this.minValue,
      max: this.maxValue,
      from: this.startValue,
      to: this.endValue,
      hide_min_max: true,
      hide_from_to: true,
      skin: "round",
      // After slider value change, setting new value for data-start and data-end attributes and uodating text for sliderValueArea
      onChange: data => {
        this.slider.attr("data-start", data.from);
        this.slider.attr("data-end", data.to);
  
        this.sliderValueArea.text(`${this.formatNumber(data.from)}₽ - ${this.formatNumber(data.to)}₽`);
      }
    });

    // set slider's valueArea text after slider's initialization
    this.sliderValueArea.text(`${this.formatNumber(this.startValue)}₽ - ${this.formatNumber(this.endValue)}₽`);
  }

  // Method for formatting numbers to improve their readablity
  formatNumber(num) {
    const numString = num.toString();

    return numString.replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
  }
}