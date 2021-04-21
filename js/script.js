"use strict"
document.addEventListener("DOMContentLoaded", () => {

  //popup
  const popupLinks = document.querySelectorAll('.popup__link');
  const body = document.querySelector('body');


  let unlock = true;

  const timeout = 800;



  if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
      const popupLink = popupLinks[index];
      popupLink.addEventListener('click', (e) => {
        const popupName = popupLink.getAttribute('href').replace('#', '');
        const currentPopup = document.getElementById(popupName);
        popupOpen(currentPopup);
        e.preventDefault();
      });
    }
  }

  const popupCloseIcon = document.querySelectorAll('.close__popup');
  if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
      const el = popupCloseIcon[index] || popupCloseIcon[0];
      el.addEventListener('click', (e) => {
        popupCloses(el.closest('.popup'));
        e.preventDefault();
      });
    }
  }

  function popupOpen(currentPopup) {

    if (currentPopup && unlock) {
      const popupActive = document.querySelector('.popup.open');
      if (popupActive) popupCloses(popupActive, false);

      currentPopup.classList.add('open');
      currentPopup.addEventListener('click', (e) => {
        if (!e.target.closest('.popup__body')) {
          popupCloses(e.target.closest('.popup'));
        }
      });
    }
  }

  function popupCloses(popupActive) {
    if (unlock) popupActive.classList.remove('open');
  }




  document.addEventListener('keydown', (e) => {
    if (e.keyCode === 27) {
      const popupActive = document.querySelector('.popup.open');
      popupCloses(popupActive);
    }
  });

  //Form

  const selector = document.getElementById("tel_modal");

  //inputTelMask
  let keyCode;
  function mask(event) {
    event.keyCode && (keyCode = event.keyCode);
    let pos = this.selectionStart;
    if (pos < 3) event.preventDefault();
    let mask = "+7 (___) ___-__-__",
      i = 0,
      def = mask.replace(/\D/g, ""),
      val = this.value.replace(/\D/g, ""),
      new_value = mask.replace(/[_\d]/g, function (a) {
        return i < val.length ? val.charAt(i++) || def.charAt(i) : a
      });
    i = new_value.indexOf("_");
    if (i != -1) {
      i < 5 && (i = 3);
      new_value = new_value.slice(0, i)
    }
    let reg = mask.substr(0, this.value.length).replace(/_+/g,
      function (a) {
        return "\\d{1," + a.length + "}"
      }).replace(/[+()]/g, "\\$&");
    reg = new RegExp("^" + reg + "$");
    if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
    if (event.type == "blur" && this.value.length < 5) this.value = ""
  }

  selector.addEventListener("input", mask, false);
  selector.addEventListener("focus", mask, false);
  selector.addEventListener("blur", mask, false);
  selector.addEventListener("keydown", mask, false)

  const form = document.getElementById('form');
  const popupClose = document.getElementById('popup');
  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();
    let error = formValidate(form);
    let formData = new FormData(form);
    formData.append('image', formImage.files[0]);


    if (error === 0) {
      form.classList.add('_sending');

      let response = await fetch('../contacts.php', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        formPreview.innerHTML = '';
        form.reset();
        form.classList.remove('_sending');

        setTimeout(() => {
          popupClose.classList.remove('open');
          alert('Спасибо.Ваше сообщение успешно отправленно.')

        }, 1000);

      } else {
        form.classList.remove('_sending');
        setTimeout(() => {
          popupClose.classList.remove('open');
          alert('Ooops,ошибочка вышла');
        }, 1000);

      }
    } else {
      alert('Заполните обязательные поля')
    }

  }



  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('.__req')

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);

      if (input.classList.contains('__email')) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
        formAddError(input);

        error++;
      } else {
        if (input.value === '') {
          formAddError(input);
          error++;
        }
      }
    }

    return error;
  }
  function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');

  }
  function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');


  }

  //регулярка на email
  function emailTest(input) {
    return !/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(input.value)
  }
  //Превьюшка фотки
  const formImage = document.getElementById('file');

  const formPreview = document.getElementById('formPreview');
  if (!window.location.href.includes('contact')) {
    formImage.addEventListener('change', () => {
      uploadFile(formImage.files[0]);
    });

    function uploadFile(file) {
      if (!['image/jpeg', 'image/png', "image/gif"].includes(file.type)) {
        alert('Разрешены только изображения.');
        formImage.value = '';
        return
      }

      if (file.size > 2 * 1024 * 1024) {
        alert('Файл должен быть не более 2 МБ.');
        return
      }

      let reader = new FileReader();
      reader.onload = function (e) {
        formPreview.innerHTML = `<img src="${e.target.result}" alt="фото">`;
      }
      reader.onerror = function (e) {
        alert('Ошибка');
      }
      reader.readAsDataURL(file);
    }

  }


  const tabs = document.querySelector('.tabs');
  const tabsBtn = document.querySelectorAll('.links__item');
  const tabsContent = document.querySelectorAll('.tab-content');

  if (tabs) {
    tabs.addEventListener('click', (e) => {

      if (e.target.classList.contains('links__item')) {

        const tabsPath = e.target.dataset.tabsPath;
        tabsBtn.forEach(el => { el.classList.remove('links__item_active') });
        document.querySelector(`[data-tabs-path="${tabsPath}"]`).classList.add('links__item_active');
        tabsHandler(tabsPath);
      }






    });
  }

  const tabsHandler = (path) => {
    tabsContent.forEach(el => {
      el.classList.remove('tab__content_active')
    });
    document.querySelector(`[data-tabs-target="${path}"]`).classList.add('tab__content_active');
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
  if (menuLink) {
    menuLink.addEventListener('click', (e) => {

      if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
        const gotoBlock = document.querySelector(menuLink.dataset.goto);
        const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;

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

  }
  let map_container = document.querySelector('.map');
  let options_map = {
    once: true,
    passive: true,
    capture: true
  };
  map_container.addEventListener('click', start_lazy_map, options_map);
  map_container.addEventListener('mouseover', start_lazy_map, options_map);
  map_container.addEventListener('touchstart', start_lazy_map, options_map);
  map_container.addEventListener('touchmove', start_lazy_map, options_map);

  let map_loaded = false;
  function start_lazy_map() {
    if (!map_loaded) {
      let map_block = document.getElementById('map_lazy');
      map_loaded = true;

      map_block.setAttribute('src', map_block.getAttribute('data-src'));
      map_block.removeAttribute('data-src');


    }
  }

});

const container = [...document.querySelectorAll(".grid__list")];
const element = "grid__item";
const elementHover = "grid__description";
const animationDuration = 300;
let currentElement = null;

container.map((e) => {
  e.addEventListener("mouseover", function (event) {
    if (currentElement) return;


    let target = event.target.closest('.grid__item');

    if (!target) return;
    if (!e.contains(target)) return;

    currentElement = target;
    findDirection(currentElement, event, "from");
  })
  e.addEventListener("mouseout", function (event) {
    if (!currentElement) return;
    let relatedTarget = event.relatedTarget;

    while (relatedTarget) {
      if (relatedTarget == currentElement) return;

      relatedTarget = relatedTarget.parentNode;
    }

    findDirection(currentElement, event, "to");

    currentElement = null;
  })

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


const arrowTop = document.querySelector('.arrow-top');
const callMe = document.querySelector('.call-me');

window.addEventListener('scroll', visibleButton)

function visibleButton() {
  window.pageYOffset > 600 ? arrowTop.style.visibility = 'visible' : arrowTop.style.visibility = 'hidden';
  window.pageYOffset > 600 ? callMe.style.visibility = 'visible' : callMe.style.visibility = 'hidden';
  arrowTop.addEventListener('click', (e) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
    e.preventDefault();

  })
}














