
document.addEventListener('DOMContentLoaded', () => {
const popupLinks = document.querySelectorAll('.popup__link');
const body = document.querySelector('body');


let unlock = true;

const timeout = 800;



if(popupLinks.length > 0) {
    for(let index = 0; index < popupLinks.length; index++) {
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
if(popupCloseIcon.length > 0) {
    for(let index = 0; index < popupLinks.length; index++) {
        const el = popupCloseIcon[index] || popupCloseIcon[0];
       el.addEventListener('click', (e) => {
          popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}

function popupOpen(currentPopup) {

    if(currentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if(popupActive) popupClose(popupActive, false);

        currentPopup.classList.add('open');
        currentPopup.addEventListener('click', (e) => {
            if(!e.target.closest('.popup__body')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}

function popupClose(popupActive) {
    if(unlock) popupActive.classList.remove('open');
}




document.addEventListener('keydown', (e) => {
    if(e.keyCode === 27) {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});


});








