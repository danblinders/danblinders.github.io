import setLikeButton from "../../templates/components/like-button/like-button";
import expandList from "../../templates/components/expandable-checkbox-list/expandable-checkbox-list";
import setRateButton from "../../templates/components/rate-button/rate-button";
import rangeSlider from "../../templates/components/range-slider/range-slider";
import Pagination from "../../templates/components/pagination/pagintaion";
import Dropdown from "../../templates/components/dropdown/dropdown";
import "./ui-kit.scss";

$(document).ready(() => {
  $(".like-button").each(function() {
    setLikeButton({
      btnSelector: this,
      iconSelector: ".like-button__icon",
      counterSelector: ".like-button__counter",
      dataActiveAttribute: "data-active",
      dataCountAttribute: "data-count",
      activeClasses: {
        activeButton: `like-button_${$(this).attr("data-border-color")}`,
        activeIcon: ["like-button__icon_filled", `like-button__icon_${$(this).attr("data-icon-color")}`],
        activeCounter: `like-button__counter_${$(this).attr("data-counter-color")}`
      }
    });
  });

  $(".expandable-checkbox-list").each(function() {
    expandList({
      listSelector: this,
      iconSelector: ".expandable-checkbox-list__icon",
      listContentSelector: ".expandable-checkbox-list__content",
      activeClasses: {
        listActiveClass: "expandable-checkbox-list_expanded",
        iconActiveClass: "expandable-checkbox-list__icon_inverted"
      }
    });
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
    console.log(+$(this).parent().attr("data-initial-active-page"));
    new Pagination({
      parent: this,
      totalPages: +$(this).parent().attr("data-pages"),
      activePage: +$(this).parent().attr("data-initial-active-page")
    }).render();
  });

  $(".dropdown").each(function() {
    const dropdownInstance = new Dropdown(this);

    dropdownInstance.changeDropdownMenuVisibility();
    dropdownInstance.handleInputFieldClick();
    dropdownInstance.handleMenuItemsBtnClick();
    dropdownInstance.handleDropdownClearBtnClick();
  });
});