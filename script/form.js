// попытка использования fancybox

// $('.form').submit(e => {
//   e.preventDefault();

//   $.fancybox.open({
//     src: "#modal",
//     type: "inline"
//   });
// })

// $(".app-submit-btn").click(e => {
//   e.preventDefault();

//   $fancybox.close();
// })

const modal = $('.modal');

$('[type="submit"]').click(e => {
  e.preventDefault();
  modal.addClass("modal--active");
});

$('.app-submit-btn').click(e => {
  e.preventDefault();
  modal.removeClass("modal--active");
})



