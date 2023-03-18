const slider = $(".slider__link").bxSlider({
  pager: false,
  controls: false,
  wrapperClass: false
});

$(".arrow--left").click(e => {
  e.preventDefault();
  slider.goToPrevSlide();
});

$(".arrow--right").click(e => {
  e.preventDefault();
  slider.goToNextSlide();
});