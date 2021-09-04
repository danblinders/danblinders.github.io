import LikeButton from "../../templates/components/like-button/like-button";
import ExpandableCheckboxList from "../../templates/components/expandable-checkbox-list/expandable-checkbox-list";
import setRateButton from "../../templates/components/rate-button/rate-button";
import rangeSlider from "../../templates/components/range-slider/range-slider";
import Pagination from "../../templates/components/pagination/pagintaion";
import inputMask from "../../templates/components/text-field/text-field";
import Dropdown from "../../templates/components/dropdown/dropdown";
import {DatepickerWithMultipleFields, DatepickerWithSingleField} from "../../templates/components/datepicker-block/datepicker-block";
import "./ui-kit.scss";

$(document).ready(() => {
  $(".like-button").each(function() {
    new LikeButton(this);
  });

  $(".expandable-checkbox-list").each(function() {
    new ExpandableCheckboxList(this);
  });

  $(".rate-button").each(function(){
    setRateButton({
      btnSelector: this,
      iconSelector: ".rate-button__icon",
      inputSelector: ".rate-button__input",
      iconActiveClass: "rate-button__icon_filled"
    });
  });

  $(".range-slider").each(function() {
    rangeSlider({
      sliderSelector: this,
      sliderInputSelector: ".range-slider__input",
      sliderValueSelector: ".range-slider__value"
    });
  });

  $(".pagination-block__top").each(function() {
    new Pagination({
      parent: this,
      totalPages: +$(this).parent().attr("data-pages"),
      activePage: +$(this).parent().attr("data-initial-active-page")
    }).render();
  });

  inputMask();
  
  $(".dropdown").each(function() {
    const dropdownInstance = new Dropdown(this);

    dropdownInstance.changeDropdownMenuVisibility();
    dropdownInstance.handleInputFieldClick();
    dropdownInstance.handleMenuItemsBtnClick();
    dropdownInstance.handleDropdownClearBtnClick();
  });

  $(".datepicker-block").each(function() {
    if ($(this).attr("data-datepicker-type") === "multiple-fields") {
      new DatepickerWithMultipleFields({
        datepickerBlock: this
      });
    } else {
      new DatepickerWithSingleField({
        datepickerBlock: this
      });
    }
  });
});