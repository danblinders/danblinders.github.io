export default class Pagination {
  constructor({parent, totalPages, activePage = 1, edges}) {
    this.parent = $(parent);
    this.totalPages = totalPages;
    this.activePage = activePage;
    this.edges = edges;
    this.attachEventHanlder = this.attachEventHanlder.bind(this);
    this.render = this.render.bind(this);
  }

  // Method, that attaches event Handlers to pagination elements
  attachEventHanlder({selector, eventFunc, eventFuncArg}) {
    this.parent.find(selector).on("click", function() {
      eventFunc(eventFuncArg);
    });
  }

  // Method, that ynamically renders pagination content
  // Page - active page
  render(page = this.activePage) {

    // paginationContent - all elements, rendering inside pagination container
    // paginationPages - element, containing pages
    // beforePage - number of pages before active page
    // afterPage - number of pages after active page
    let paginationContent = "",
        paginationPages = "",
        beforePage = page - 2,
        afterPage = page + 2;

    // If active page larger than 1, then add previous button
    if (page > 1) {
      paginationContent += "<div class='pagination__prev'>arrow_back</div>";
    }

    // If active page larger than 3, then add element for 1 page and set event Listener to it.
    if (page > 3) {
      paginationPages += "<li class='pagination__page' data-page='1'>1</li>";
      this.attachEventHanlder({
        selector: ".pagination__page[data-page='1']",
        eventFunc: this.render,
        eventFuncArg: 1
      });

      // If active page larger than 4, then add dots element
      if (page > 4) {
        paginationPages += "<li class='pagination__dots'>...</li>";
      }
    }

    // Loop for adding active page, pages before and after it
    for(let pageItem = beforePage; pageItem <= afterPage; pageItem++) {

      // If current page is smaller than 1 or larger than total amount of pages at pagination, skip iteration of loop
      if (pageItem < 1 || pageItem > this.totalPages) {
        continue;
      // Else add current page
      } else {
        paginationPages += `<li class="pagination__page ${(pageItem === page) ? 'pagination__page_active' : ''}" data-page=${pageItem}>${pageItem}</li>`;
      }
    }

    // If active page smaller than 2, then add element with last page
    if (page < this.totalPages - 2) {
      // If active page smaller than 3, then add dots element
      if (page < this.totalPages - 3) {
        paginationPages += "<li class='pagination__dots'>...</li>";
      }

      paginationPages += `<li class="pagination__page" data-page=${this.totalPages}>${this.totalPages}</li>`;
    }

    // Add block with pages into block for the whole content
    paginationContent += `<ul class='pagination__pages'>${paginationPages}</ul>`;

    // If active page is smaller than total number of pages, then add next button
    if (page < this.totalPages) {
      paginationContent += "<div class='pagination__next'>arrow_forward</div>";
    }

    // Add pagination content to pagination container
    this.parent.html(`<div class="pagination">${paginationContent}</div>`);

    // Set event handler on previous button
    this.attachEventHanlder({
      selector: ".pagination__prev",
      eventFunc: this.render,
      eventFuncArg: page - 1
    });

    // Set event handler on next button
    this.attachEventHanlder({
      selector: ".pagination__next",
      eventFunc: this.render,
      eventFuncArg: page + 1
    });

    // Variable, that stores array with displayed pages
    let pageSet = [];

    // Fill pageSet array with numbers of diaplayed pages
    this.parent.find('.pagination__page').each(function() {
      pageSet.push(+$(this).attr("data-page"));
    });
  
    // Set event handlers for all displayed pages
    pageSet.map(item => {
      this.attachEventHanlder({
        selector: `.pagination__page[data-page=${item}]`,
        eventFunc: this.render,
        eventFuncArg: item
      });
    });
  }
}