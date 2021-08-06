const setRateButton = (options) => {
  const {btnSelector, inputSelector, iconSelector, iconActiveClass} = options;

  // Getting elements from the page
  const btn = $(btnSelector),
        icons = btn.find(iconSelector),
        inputs = btn.find(inputSelector);

  // Variable, that stores information about chosen rating
  let settedRating;
  
  // Setting initial value for variable settedRating
  inputs.each(function() {
    if ($(this).attr("checked")) {
      settedRating = +$(this).attr("value");
    }
  });

  // Add event handlers for all rate-button's icons
  icons.each(function() {

    // After click on one of the rate-button's icons
    // Setting new value for variable settedRating. that equals to value of radio-button, which is the sibling of clicked icon
    // Toggling active classes for icons, which index is les or equal to settedRating value
    $(this).on("click", function() {
      settedRating  = +$(this).siblings(inputSelector).attr("value");

      icons.each(function(index) {
        $(this).toggleClass(iconActiveClass, index < settedRating);
      });
    });

    // After mouse mvement inside the one of the rate-button's icons
    // Creating temporary rating variable. which value equals to value of radio-button, which is the sibling of hovered icon
    // Toggling active classes for icons, which index is les or equal to ratingvalue
    $(this).on("mouseover", function() {
      const rating = +$(this).siblings(inputSelector).attr("value");

      icons.each(function(index) {
        $(this).toggleClass(iconActiveClass, index < rating);
      });
    });

    // After mouse leaves the area of one of the rate-button's icons
    // Toggling active classes for icons, which index is les or equal to settedRating value
    $(this).on("mouseleave", function() {
      icons.each(function(index) {
        $(this).toggleClass(iconActiveClass, index < settedRating);
      });
    });


  });
};

export default setRateButton;