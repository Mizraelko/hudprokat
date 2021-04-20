document.addEventListener("DOMContentLoaded", () => {

const anchors = document.querySelectorAll('.tab-catalog__body a[href*="#"]')

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
  e.preventDefault()
   
  const blockID = anchor.getAttribute('href').substr(1)
  const goToBlock = document.getElementById(blockID).getBoundingClientRect().top + pageYOffset - document.querySelector('.tab-catalog').offsetHeight -40;
 
    window.scrollTo({
      top: goToBlock,
      behavior: 'smooth'
    })
  
 
  })
}


window.addEventListener('scroll', tabsSticky)

let tabCatalog = document.querySelector(".tab-catalog");
let sticky = tabCatalog.offsetTop ;


function tabsSticky() {
  window.pageYOffset >= sticky ? tabCatalog.classList.add("_fixed") : tabCatalog.classList.remove("_fixed");

}


const menuIconContainer = document.querySelector('.menu__icon-container');


if(window.screen.width <= 768) {
  menuIconContainer.style.position = 'absolute';
  
  
}  




const contentWrapper = document.querySelector('.content-wrapper');
const formItemTitle = document.querySelector('.form__item-title');


contentWrapper.addEventListener('click', (e) => {
  if(e.target.className === 'faq') {
    
     
    const catalogItem = e.target.closest('.catalog-items__catalog');
    const value = catalogItem.children[1].firstElementChild.textContent;
    
    formItemTitle.innerHTML = `<strong>Выбранная позиция:</strong>${value}`;
    
  }
})

let table = Array.from(document.querySelectorAll('.table'));

const value = ['Скрыть', 'Просмотреть все размеры'];

const catalogAddBtn = [];



table.map(e => {


let rows = [...e.rows]
if(rows.length <= 4) {
const tr = rows.splice(-1)[0].cells[0].style.borderBottomLeftRadius = '30px';
}
if(e.rows.length >= 4) {
for(let i = 4; i < e.rows.length; i++){
e.rows[i].classList.add('hidden-table')

}
}
if(e.rows.length >= 5) {

catalogAddBtn.push(e.parentElement)
} 


})

catalogAddBtn.map(e => {
addBtn(e)
})

let btn = Array.from(document.querySelectorAll('.add'))  




btn.map((e) => {
e.addEventListener('click', clickTable);
}) 

function addBtn(e) {
let div = document.createElement('div');
div.className = 'add';
div.innerHTML = value[1];

e.append(div)
}

function clickTable(e) {

e = e.target.parentElement


const table = e.querySelector('.table');

for (let i = 4; i < table.rows.length; i++) {
          const element = table.rows[i]
          
          element.classList.toggle('hidden-table');
          element.classList.toggle('visible-block');
}


(this.innerHTML == value[0]) ? this.innerHTML = value[1] : this.innerHTML = value[0];

this.parentElement.scrollIntoView();


}


});