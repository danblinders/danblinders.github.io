/*
  this.list - block, containing all list markup
  this.listIcon - list select's icon
  this.listContent - element, containing all checkbox items
*/
export default class ExpandableCheckboxList {
  constructor(listSelector) {
    this.list = $(listSelector);
    this.listIcon = this.list.find(".expandable-checkbox-list__icon");
    this.listContent = this.list.find(".expandable-checkbox-list__content");

    // After click on the list's icon
    // Toggling active classes for list and icon
    // Setting list content's height
    this.handleListIconClick = () => {
      this.toggleCheckboxList();
    };

    this.listIcon.on("click", this.handleListIconClick);
  }

  // Method for expanding/closing checkbox list
  toggleCheckboxList() { 
    this.list.toggleClass("expandable-checkbox-list_expanded");
    this.listIcon.toggleClass("expandable-checkbox-list__icon_inverted");
    this.listContent.slideToggle();
  }
}