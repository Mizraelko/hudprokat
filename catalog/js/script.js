'use strict';






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

        window.onscroll = function() {myFunction()};

        // Get the navbar
        var navbar = document.querySelector(".tab-catalog");
        
        // Get the offset position of the navbar
        var sticky = navbar.offsetTop ;
       
        // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
        function myFunction() {
          if (window.pageYOffset >= sticky) {
            navbar.classList.add("_fixed")
          } else {
            navbar.classList.remove("_fixed");
            
          }
        }
          


 

 
 
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


  
 
 
  
 
 
 
   

