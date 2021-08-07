import * as ionRangeSlider from "ion-rangeslider";

const rangeSlider = ({sliderSelector, sliderInputSelector, sliderValueSelector}) => {

  // Getting slider and it's items from the page
  
  const slider = $(sliderSelector),
        sliderInput = slider.find(sliderInputSelector),
        sliderValueArea = slider.find(sliderValueSelector);

  // Getting values of slider via data-attributes

  let minValue = +slider.attr("data-min"),
      maxValue = +slider.attr("data-max"),
      startValue = +slider.attr("data-start"),
      endValue = +slider.attr("data-end");  

  // Function, that adds spaces between number units (for example addNumSpaces(5000) will return "5 000")

  const addNumSpaces = (num) => {
    const numString = num.toString();

    return numString.replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
  };

  // Setting text for sliderValueArea after load of the page

  sliderValueArea.text(`${addNumSpaces(startValue)}₽ - ${addNumSpaces(endValue)}₽`);

  // Setting Ion.RangeSlider plugin

  sliderInput.ionRangeSlider({
    type: "double",
    min: minValue,
    max: maxValue,
    from: startValue,
    to: endValue,
    hide_min_max: true,
    hide_from_to: true,
    skin: "round",
    // After slider value change, setting new value for data-start and data-end attributes and uodating text for sliderValueArea
    onChange: data => {
      slider.attr("data-start", data.from);
      slider.attr("data-end", data.to);

      sliderValueArea.text(`${addNumSpaces(data.from)}₽ - ${addNumSpaces(data.to)}₽`);
  },
  });
};

export default rangeSlider;