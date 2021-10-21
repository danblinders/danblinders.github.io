import 'jquery-validation';

const FormValidation = () => {
  $(".js-validate").each(function() {
    $.validator.addMethod("rightDateFormat", function(value) {
      const [day, month, year] = value.split(".");
    
      return new Date(`${month}/${day}/${year}`).toLocaleString() !== "Invalid Date";
    });
    $.validator.addMethod("noFutureDates", function(value) {
      const [day, month, year] = value.split(".");
      const dateValue = new Date(`${month}/${day}/${year}`);

      return dateValue <= new Date();
    });
    $.validator.addMethod("noSpaces", function(value) {
      return !new RegExp(/\s/ig).test(value);
    });

    $.validator.messages.required = "Обязательное поле!";
    $.validator.messages.noSpaces = "Присутствуют пробелы!";
    $.validator.messages.rightDateFormat = "Неверный формат даты!";
    $.validator.messages.noFutureDates = "Нельзя вводить даты из будущего!";

    $(this).validate({
      highlight: function(element) {
        $(element).addClass("text-field__input_invalid");
      },
      unhighlight: function(element, errorClass, validClass) {
        $(element).removeClass("text-field__input_invalid");
        $(element).addClass(validClass);
      },
      errorElement: "span",
      errorClass: "text-field__error-message",
      validClass: "text-field__input_valid",
      rules: {
        userEmail: {
          required: true,
          email: true
        },
        userName: {
          required: true,
          noSpaces: true
        },
        userSurname: {
          required: true,
          noSpaces: true
        },
        userPassword: {
          required: true,
          noSpaces: true
        },
        userBirthDate: {
          required: true,
          rightDateFormat: true,
          noFutureDates: true,
        },
        checkDateStart: {
          required: true,
          rightDateFormat: true,
        },
        checkDateEnd: {
          required: true,
          rightDateFormat: true,
        },
        guests: {
          required: true
        }
      },
      messages: {
        userEmail: {
          email: "Неверный формат e-mail!"
        }
      },
      errorPlacement: function(error, element) {
        if ($(element).parents(".dropdown").length > 0) {
          error.addClass("text-field__error-message_after_label");
          error.insertAfter( $(element).parents(".dropdown").find(".text-field__label"));
          return;
        } 

        error.insertAfter($(element));
      }
    });
  });
};

export default FormValidation;