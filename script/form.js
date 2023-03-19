const validateFields = (form, fieldsArray) => {

  fieldsArray.forEach((filed) => {
    filed.removeClass("input-error");
    if (filed.val().trim() == "") {
      filed.addClass("input-error");
    }
  });

  const errorFields = form.find(".input-error");

  return errorFields.length == 0;
}

$('.form').submit(e => {
  e.preventDefault();

  const form = $(e.currentTarget);
  const name = form.find("[name='name']");
  const phone = form.find("[name='phone']");
  const comment = form.find("[name='comment']");
  const to = form.find("[name='to']");

  const modal = $('.modal');
  const content = modal.find(".modal__content");
  modal.removeClass("modal__content--error");


  const isValid = validateFields(form, [name, phone, comment]);

  const submit = form.find('[type="submit"]');
  const submitClose = form.find('.app-submit-btn');

  if (isValid) {
    $.ajax({
      url: "https://webdev-api.loftschool.com/sendmail",
      method: "post",
      data: {
        name: name.val(),
        phone: phone.val(),
        comment: comment.val(),
        to: to.val()
      } 
      // success: (data) => {
      //   content.text(data.message);

      //   console.log(data);

      //   submit.click(e => {
      //     e.preventDefault();
      //     modal.addClass("modal--active");
      //   });

      //   submitClose.click(e => {
      //     e.preventDefault();
      //     modal.removeClass("modal--active");
      //   })
      // },
      // error: (data) => {
      //   const message = data.responseJSON.message;
      //   console.log(message); //не работает
      //   content.text(message);
      // modal.addClass("modal__content--error");

      // submit.click(e => {
      //   e.preventDefault();
      //   modal.addClass("modal--active");
      // });

      // submitClose.click(e => {
      //   e.preventDefault();
      //   modal.removeClass("modal--active");
      // })
      // }
    });

    
    submit.addEventListener('click', () => {
      const xhr = new XMLHttpRequest();
      console.log(xhr);
      if (xhr.status >= 400) {
        content.innertext('Заказ принят на обработку');
      } else {
        content.innertext('Что-то пошло не так, попробуйте снова');
        content.addClass("modal__content--error");
      }
    });
  }

  

  submit.click(e => {
    e.preventDefault();
    modal.addClass("modal--active");
  });

  submitClose.click(e => {
    e.preventDefault();
    modal.removeClass("modal--active");
  });
});





