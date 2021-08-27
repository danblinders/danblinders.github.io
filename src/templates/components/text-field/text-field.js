import "jquery-mask-plugin";

const inputMask = () => {
  $("[data-mask='date']").mask("00.00.0000"); 
};

export default inputMask;
