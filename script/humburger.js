const hamburger = document.querySelector(".hamburger");
const overlay = document.querySelector(".overlay");
const body = document.body;

const links = document.querySelectorAll(".hamburger-menu__link");

links.forEach(function(element){
  element.addEventListener('click' , toggleMenu);
})

hamburger.addEventListener("click", e => {
  e.preventDefault();
})

hamburger.addEventListener('click', toggleMenu);

function toggleMenu(){
  hamburger.classList.toggle('hamburger--active');
  overlay.classList.toggle('overlay--active');
  body.classList.toggle('body--active-menu');
}
