export default class Pagination {
  constructor({parent, totalPages, activePage = 1, edges}) {
    this.parent = $(parent);
    this.totalPages = totalPages;
    this.activePage = activePage;
    this.edges = edges;
  }

  render(page = this.activePage) {

    let paginationContent = "",
        paginationPages = "",
        beforePage = page - 1,
        afterPage = page + 1;

    if (page > 1) {
      paginationContent += "<div class='pagination__prev'>arrow_back</div>";
    }

    if (page > 2) {
      paginationPages += "<li class='pagination__page'>1</li>";

      if (page > this.edges) {
        paginationPages += "<li class='pagination__dots'>...</li>";
      }
    }

    for(let pageItem = beforePage; pageItem <= afterPage; pageItem++) {

      if (pageItem === 0 || pageItem === this.totalPages + 1) {
        continue;
      } else {
        paginationPages += `<li class="pagination__page">${pageItem}</li>`;
      }
    }

    if (page < this.totalPages - 1) {
      if (page < this.totalPages - this.edges) {
        paginationPages += "<li class='pagination__dots'>...</li>";
      }

      paginationPages += `<li class="pagination__page">${this.totalPages}</li>`;
    }

    paginationContent += `<ul class='pagination__pages'>${paginationPages}</ul>`;

    if (page < this.totalPages) {
      paginationContent += "<div class='pagination__next'>arrow_forward</div>";
    }

    this.parent.html(`<div class="pagination">${paginationContent}</div>`);
  }
}