const openItem = item => {
  const container = item.closest(".team__item");
  const contentBlock = container.find(".team__content");
  const triangle = container.find(".team__title-triangle");//
  const textBlock = contentBlock.find(".team__inf");

  const reqHeight = textBlock.height();

  container.addClass("active");
  triangle.addClass("team__title-triangle--active");//
  contentBlock.height(reqHeight);

}

const closeEveryItem = container => {
  const items = container.find('.team__content');
  const itemContainer = container.find(".team__item");
  const triangle = container.find(".team__title-triangle");
  
  itemContainer.removeClass("active");
  triangle.removeClass("team__title-triangle--active");//
  items.height(0);
}

$('.team__title').click(e => {
  const $this = $(e.currentTarget);
  const container = $this.closest('.team');
  const elemContainer = $this.closest(".team__item");

  if (elemContainer.hasClass("active")) {
    closeEveryItem(container);
  } else {
    closeEveryItem(container);
    openItem($this);
  }

});


