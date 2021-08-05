import * as $ from "jquery";
import setLikeButton from "../../templates/components/like-button/like-button";
import expandList from "../../templates/components/expandable-checkbox-list/expandable-checkbox-list";
import "./ui-kit.scss";

$(document).ready(() => {
  $(".like-button").each(function() {
    setLikeButton({
      btn: $(this),
      iconSelector: "like-button__icon",
      counterSelector: "like-button__counter",
      dataActiveAttribute: "data-active",
      dataCountAttribute: "data-count",
      activeClasses: {
        button: `like-button_${$(this).attr("data-border-color")}`,
        icon: ["like-button__icon_filled", `like-button__icon_${$(this).attr("data-icon-color")}`],
        counter: `like-button__counter_${$(this).attr("data-counter-color")}`
      }
    });
  });

  $(".expandable-checkbox-list").each(function() {
    expandList({
      list: $(this),
      iconSelector: "expandable-checkbox-list__icon",
      listContentSelector: "expandable-checkbox-list__content",
      slideDuration: 700,
      activeClasses: {
        listActiveClass: "expandable-checkbox-list_expanded",
        iconActiveClass: "expandable-checkbox-list__icon_inverted"
      }
    });
  });
});