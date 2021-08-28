import "jquery-mask-plugin";

const inputMask = () => {
  $("[data-mask='date']").each(function() {
    $(this).mask("00.00.0000").val($(this).attr("value"));
  });
};

export default inputMask;