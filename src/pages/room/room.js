import inputMask from "../../templates/components/text-field/text-field";
import LikeButton from "../../templates/components/like-button/like-button";
import Dropdown from "../../templates/components/dropdown/dropdown";
import Calendar from "../../templates/components/calendar/calendar";
import {DatepickerWithMultipleFields, DatepickerWithSingleField} from "../../templates/components/datepicker-block/datepicker-block";
import Header from "../../templates/components/header/header";
import "./room.scss";

$(document).ready(() => {
  inputMask();

  $(".like-button").each(function() {
    new LikeButton(this);
  });
  
  $(".dropdown").each(function() {
    const dropdownInstance = new Dropdown(this);
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
});