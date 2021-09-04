/*
  this.list - block, containing all list markup
  this.listIcon - list select's icon
  this.listContent - element, containing all checkbox items
  this.contentheight - height of listContent element
*/
export default class ExpandableCheckboxList {
  constructor(listSelector) {
    this.list = $(listSelector);
    this.listIcon = this.list.find(".expandable-checkbox-list__icon");
    this.listContent = this.list.find(".expandable-checkbox-list__content");
    this.contentHeight = this.listContent.css("height");

    // After click on the list's icon
    // Toggling active classes for list and icon
    // Setting list content's height
    this.handleListIconClick = () => {
      this.list.toggleClass("expandable-checkbox-list_expanded");
      this.listIcon.toggleClass("expandable-checkbox-list__icon_inverted");
  
      this.changeContentHeight();
    };

    this.listIcon.on("click", this.handleListIconClick);

    this.changeContentHeight();
  }

  // Method, that setting listContent's height, depending on presence of active class
  // If list is expanded, method set's height equal to contentHeight value, otherwise - to 0, hiding listContent
  changeContentHeight(){
    if (this.list.hasClass("expandable-checkbox-list_expanded")) {
      this.listContent.css("height", this.contentHeight);
    } else {
      this.listContent.css("height", "0");
    }
  }
}