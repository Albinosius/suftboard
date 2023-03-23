let onePageScroll = () => {
  const wrapper = document.querySelector('.wrapper');
  const content = wrapper.querySelector('.main-content');
  const pages = content.querySelectorAll('.section');
  const points = document.querySelectorAll('.fixed-menu__item');
  const dataScrollto = document.querySelectorAll('[data-scroll-to]');

  let inScroll = false;

  addNavigation();
  wheel();
  keyPush();

  function doTransition(pageNumber) {
    const position = `${pageNumber * (-100)}%`;

    if (inScroll) return;

    inScroll = true;

    addClass(pages);

    content.style.transform = `translateY(${position})`;

    setTimeout(() => {
      inScroll = false;
      addClass(points);
    }, 1000);

    function addClass(arr) {
      arr[pageNumber].classList.add('fixed-menu__item--active');

      for (const item of arr) {
        if (item != arr[pageNumber]) {
          item.classList.remove('fixed-menu__item--active');
        }
      }
    }
  }

  function addNavigation() {
    for (const point of dataScrollto) {
      point.addEventListener('click', e => {
        e.preventDefault();
        doTransition(point.dataset.scrollTo);
      })
    }
  }

  function wheel() {
    document.addEventListener('wheel', e => {
      const direct = e.deltaY > 0 ? 'up' : 'down';

      scrollToPage(direct);
    })
  }

  function keyPush() {
    document.addEventListener('keydown', e => {
      switch (e.keyCode) {
        case 40:
          scrollToPage('up');
          break;
        case 38:
          scrollToPage('down');
          break;
        default:
          break;
      }
    })
  }

  function definePage(arr) {
    for (let i = 0; i < arr.length; i++) {
      let iter = arr[i];
      if (iter.classList.contains('is-active')) {
        return {
          iterIndex: i,
          iterActive: iter,
          iterNext: iter.nextElementSibling,
          iterPrev: iter.previousElementSibling
        }
      }
    }
  }

  function scrollToPage(direct) {
    let page = definePage(pages);
    if (direct === 'up' && page.iterNext) {
      let numPage = page.iterIndex + 1;

      doTransition(numPage);
    }

    if (direct === 'down' && page.iterPrev) {
      let numPage = page.iterIndex - 1;
      doTransition(numPage);
    }
  }
}

onePageScroll();
