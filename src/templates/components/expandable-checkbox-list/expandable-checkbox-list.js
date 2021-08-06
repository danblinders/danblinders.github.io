const expandList = ({listSelector, 
                    iconSelector, 
                    listContentSelector, 
                    activeClasses: {listActiveClass, iconActiveClass}}) => {

  // Getting elements of list and content's height
  
  const list = $(listSelector),
        listIcon = list.find(iconSelector),
        listContent = list.find(listContentSelector),
        contentHeight = listContent.css("height");

  // Function. that changes the element height depends on the presence of activeClass on it's parent

  const changeContentHeight = (contentElem, parent, activeClass, heightShrinked, heightExpanded) => {
    if (parent.hasClass(activeClass)) {
      contentElem.css("height", heightExpanded);
    } else {
      contentElem.css("height", heightShrinked);
    }
  };

  // Setting initial list content's height after page load

  changeContentHeight(listContent, list, listActiveClass, "0", contentHeight);

  // After click on the list's icon
  // Toggling active classes for list and icon
  // Setting list content's height

  listIcon.on("click", function() {
    list.toggleClass(listActiveClass);
    listIcon.toggleClass(iconActiveClass);

    changeContentHeight(listContent, list, listActiveClass, "0", contentHeight);
  });
};

export default expandList;