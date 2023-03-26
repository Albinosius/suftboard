const items = $('.variants__item');
const getItemWidth = (item) => {
  let resultWidth = 524;


  const windowWidth = $(window).width();
  const itemWidth = item.outerWidth(true);

  const isTablet = window.matchMedia('(max-width: 768px').matches;
  // console.log('isTablet', isTablet);
  const isMobile = window.matchMedia('(max-width: 480px').matches;
  // console.log('isMobile', isMobile);
  if (isTablet) {
    resultWidth = windowWidth - itemWidth * items.length;
  }
  if (isMobile) {
    resultWidth = windowWidth - itemWidth;
  }

  return resultWidth;
}

const setItemWith = (item, width) => {
  const itemContent = item.next();
  const itemText = itemContent.children();
  console.log(itemText);

  itemContent.width(width + 'px');
  itemText.outerWidth(width + 'px');

}

const closeItem = (item) => {
  const itemParent = item.parent();
  itemParent.removeClass('variants__item--active');
  item.removeClass('variants__button--active');

  setItemWith(item, 0);
}

const openItemVariant = (item) => {
  const itemParent = item.parent();
  itemParent.addClass("variants__item--active");
  item.addClass("variants__button--active");

  const width = getItemWidth(item);


  setItemWith(item, width);
}

$('.variants__button').click(e => {
  e.preventDefault();
  
  const $this = $(e.currentTarget);
  const isActive = $this.hasClass('variants__button--active');
  const activeElement = $('.variants__button--active');

  if ($this.hasClass('variants__button') && isActive) {
    if (activeElement) {
      closeItem(activeElement);
    }
  }

  if ($this.hasClass('variants__button') && !isActive) {
    if (activeElement) {
      closeItem(activeElement);
    }
    openItemVariant($this);
  }
});