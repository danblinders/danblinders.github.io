import * as ionRangeSlider from "ion-rangeslider";

const rangeSlider = ({sliderSelector, sliderInputSelector, sliderValueSelector}) => {
  const slider = $(sliderSelector),
        sliderInput = slider.find(sliderInputSelector),
        sliderValueArea = slider.find(sliderValueSelector);

  let minValue = +slider.attr("data-min"),
      maxValue = +slider.attr("data-max"),
      startValue = +slider.attr("data-start"),
      endValue = +slider.attr("data-end");

  sliderInput.ionRangeSlider({
    type: "double",
    min: minValue,
    max: maxValue,
    from: startValue,
    to: endValue,
    hide_min_max: true,
    hide_from_to: true,
    skin: "round",
    onChange: data => {
      slider.attr("data-start", data.from);
      slider.attr("data-end", data.to);

      sliderValueArea.text(`${data.from}₽ - ${data.to}₽`);
  },
  });
};

export default rangeSlider;