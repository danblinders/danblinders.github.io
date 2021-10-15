import LikeButton from "../../templates/components/like-button/like-button";
import ExpandableCheckboxList from "../../templates/components/expandable-checkbox-list/expandable-checkbox-list";
import RateButton from "../../templates/components/rate-button/rate-button";
import RangeSlider from "../../templates/components/range-slider/range-slider";
import Pagination from "../../templates/components/pagination/pagintaion";
import inputMask from "../../templates/components/text-field/text-field";
import Dropdown from "../../templates/components/dropdown/dropdown";
import {DatepickerWithMultipleFields, DatepickerWithSingleField} from "../../templates/components/datepicker-block/datepicker-block";
import Calendar from "../../templates/components/calendar/calendar";
import Header from "../../templates/components/header/header";
import "./catalog.scss";

$(document).ready(() => {
  $(".like-button").each(function() {
    new LikeButton(this);
  });

  $(".expandable-checkbox-list").each(function() {
    new ExpandableCheckboxList(this);
  });

  $(".rate-button").each(function(){
    new RateButton(this);
  });

  $(".range-slider").each(function() {
    new RangeSlider(this);
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
  });

  $(".calendar").each(function() {
    const calendar = new Calendar(this);
  });

  $(".datepicker-block").each(function() {
    if ($(this).attr("data-datepicker-type") === "multiple-fields") {
      new DatepickerWithMultipleFields(this);
    } else {
      new DatepickerWithSingleField(this);
    }
  });

  $(".header").each(function() {
    new Header(this);
  });

  $(".main-content__filter-trigger").on("click", () => {
    $(".main-content__filter").toggleClass("main-content__filter_visible");
    $(".filter-overlay").toggleClass("filter-overlay_visible");
  });

  $(".filter-overlay").on("click", () => {
    $(".main-content__filter").toggleClass("main-content__filter_visible");
    $(".filter-overlay").toggleClass("filter-overlay_visible");
  });

  $(".main-content__filter-close").on("click", () => {
    $(".main-content__filter").toggleClass("main-content__filter_visible");
    $(".filter-overlay").toggleClass("filter-overlay_visible");
  });
});