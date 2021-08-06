const setLikeButton = (options) => {
  // Destructuring the oject with arguements

  const {btnSelector, iconSelector, counterSelector, dataActiveAttribute, dataCountAttribute, activeClasses: {activeButton, activeIcon, activeCounter}} = options;

  // Getting button elements from page

  const btn = $(btnSelector),
        btnIcon = btn.find(iconSelector),
        btnCounter = btn.find(counterSelector);

  btn.on("click", function() {

    // Setting data-active attribute to button

    btn.attr(dataActiveAttribute, `${(btn.attr(dataActiveAttribute) === "true") ? "false"  : "true"}`);

    // Toggle active classes form button and it's elements

    btn.toggleClass(activeButton);
    btnIcon.toggleClass(activeIcon);
    btnCounter.toggleClass(activeCounter);

    // Getting data-count value

    let countValue = +btn.attr(dataCountAttribute);

    // If button's data-active attribute is true, increment countValue and set new value to data-count attribute and text inside counter
    // Else decrement countValue and set new value to data-count attribute and text inside counter

    if (btn.attr(dataActiveAttribute) === "true") {
      btn.attr(dataCountAttribute, `${++countValue}`);

      btnCounter.text(`${countValue}`);
    } else {
      btn.attr(dataCountAttribute, `${--countValue}`);

      btnCounter.text(`${countValue}`);
    }

    // If new countValue is lower than 10, add padding to counter

    btnCounter.toggleClass(`${counterSelector.replace(/\./, "")}_with_padding`, countValue < 10);
  });
};

export default setLikeButton;