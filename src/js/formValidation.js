import 'jquery-validation';

const FormValidation = () => {
  $(".js-validate").each(function() {
    $.validator.messages.required = "Обязательное поле!";
    $.validator.addMethod("rightDateFormat", function(value) {
      const [day, month, year] = value.split(".");
    
      return new Date(`${month}/${day}/${year}`).toLocaleString() !== "Invalid Date";
    });
    $.validator.addMethod("noFutureDates", function(value) {
      const [day, month, year] = value.split(".");
      const dateValue = new Date(`${month}/${day}/${year}`);

      return dateValue < new Date();
    });
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
          required: true
        },
        userSurname: {
          required: true
        },
        userPassword: {
          required: true
        },
        userBirthDate: {
          required: true,
          rightDateFormat: true,
          noFutureDates: true,
        },
        checkDateStart: {
          required: true
        },
        checkDateEnd: {
          required: true
        },
        guests: {
          required: true
        }
      },
      messages: {
        userEmail: {
          email: "Неверный формат e-mail!"
        },
        userBirthDate: {
          rightDateFormat: "Неверный формат даты!",
          noFutureDates: "Нельзя вводить даты из будущего!"
        }
      }
    });
  });
};

export default FormValidation;