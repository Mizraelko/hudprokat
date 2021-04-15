"use strict"
document.addEventListener("DOMContentLoaded", () => {





  if (window.location.href.includes('index')) {
    const description = document.querySelectorAll('.service__description')

    description.forEach((e) => {
      const el = e.querySelectorAll('em');
      el.forEach(e => e.style = ' position:absolute; top:10%; text-transform:uppercase;')
    })


  };

  const isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    IOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.IOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    }
  };






  if (isMobile.any()) {
    document.body.classList.add('_touch');


    const menuArrows = [...document.querySelectorAll('.menu__arrow-container')];

    menuArrows.map(e => {

      e.addEventListener('click', e => {
        let target = e.target.closest('.menu__arrow-container')
        target.parentElement.classList.toggle('_active');
        const menuLink = [...document.querySelectorAll('.menu__list > li._active')];
        menuLink.length > 0 ? menuLink.map(e => { e.classList.remove('_active'); target.parentElement.classList.add('_active') }) : target.parentElement.classList.add('_active')
        if (menuLink.length == 0) {
          target.parentElement.classList.toggle('_active');
        }


      })
    })



  } else {
    document.body.classList.add('_pc');
  };




  //Бургер



  const menuIconContainer = document.querySelector('.menu__icon-container');
  const menuBody = document.querySelector('.menu__body');
  const iconMenu = document.querySelector('.menu__icon');

  if (iconMenu) {
    menuIconContainer.addEventListener('click', (e) => {

      document.body.classList.toggle('_lock')
      iconMenu.classList.toggle('_active');
      menuBody.classList.toggle('_active');

    })
  }

  //Прокрутка

  const menuLink = document.querySelector('.menu__link[data-goto]');

  menuLink.addEventListener('click', (e) => {

    if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

      if (iconMenu.classList.contains('_active')) {
        document.body.classList.remove('_lock')
        iconMenu.classList.remove('_active');
        menuBody.classList.remove('_active');
      }

      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth"
      })
      e.preventDefault();
    }
  });



});




   




const container = document.querySelector(".grid__list");
const element = "grid__item";
const elementHover = "grid__description";
const animationDuration = 300;
let currentElement = null;

container.addEventListener("mouseover", function (event) {
  if (currentElement) return;


  let target = event.target.closest('.grid__item');

  if (!target) return;
  if (!container.contains(target)) return;

  currentElement = target;
  findDirection(currentElement, event, "from");
})

container.addEventListener("mouseout", function (event) {
  if (!currentElement) return;
  let relatedTarget = event.relatedTarget;

  while (relatedTarget) {
    if (relatedTarget == currentElement) return;

    relatedTarget = relatedTarget.parentNode;
  }

  findDirection(currentElement, event, "to");

  currentElement = null;
})

function findDirection(elem, event, suf) {

  let elemSize = elem.getBoundingClientRect()
  let left = Math.abs(elemSize.left - event.clientX);
  let right = Math.abs(elemSize.right - event.clientX);
  let top = Math.abs(elemSize.top - event.clientY);
  let bottom = Math.abs(elemSize.bottom - event.clientY);
  let min = Math.min(left, right, top, bottom);
  let direction = null;

  switch (min) {
    case left:
      direction = suf + "Left";
      break;
    case right:
      direction = suf + "Right";
      break;
    case top:
      direction = suf + "Top";
      break;
    case bottom:
      direction = suf + "Bottom";
      break;
  }

  elem.querySelector(`.${elementHover}`).classList = `${elementHover} ${direction}`;
}






