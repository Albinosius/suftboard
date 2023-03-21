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
  const fixedMenu = $('.fixed-menu');
  const content = modal.find(".modal__content");
  modal.removeClass("modal__content--error");


  const isValid = validateFields(form, [name, phone, comment]);

  if (isValid) {
    $.ajax({
      url: "https://webdev-api.loftschool.com/sendmail",
      method: "post",
      data: {
        name: name.val(),
        phone: phone.val(),
        comment: comment.val(),
        to: to.val()
      },
      success: (data) => {
        content.text(data.message);
        modal.addClass("modal--active");
        fixedMenu.addClass("fixed-menu--hidden");
        e.target.reset(); 
      },
      error: (error) => {
        const message = "Ошибка сервера";
        content.text(message);
        modal.addClass("modal--active");
        modal.addClass("modal__content--error");
        fixedMenu.addClass("fixed-menu--hidden");
      }
    });

  }
  $(".app-submit-btn").click((e) => {
    e.preventDefault();
    modal.removeClass("modal--active");
    fixedMenu.removeClass("fixed-menu--hidden");
  });
  
});





