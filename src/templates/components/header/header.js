export default class Header {
  constructor(headerBlock){
    this.headerBlock = $(headerBlock);
    this.headerHamburger = this.headerBlock.find(".header__menu-hamburger");
    this.headerNavbar = this.headerBlock.find(".header__navbar");

    this.onHeaderHamburgerClick = () => {
      this.headerNavbar.toggleClass("header__navbar_open");
      this.headerHamburger.toggleClass("header__menu-hamburger_close", this.headerNavbar.hasClass("header__navbar_open"));
    };

    this.headerHamburger.on("click", this.onHeaderHamburgerClick);
  } 
}