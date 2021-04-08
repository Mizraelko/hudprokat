//  elevator script
 
window.onload = function() {
  let elevator = new Elevator({
    element: document.querySelector('.elevator-button'),
    targetElement: document.querySelector('#tablist'),
    duration: 1000,
   
  });
 }
  
 function getBodyScrollTop() {
  
  return self.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);

}



window.addEventListener('scroll', (e) => {


if(window.matchMedia('(min-width: 279px)').matches && window.matchMedia('(max-width: 767px)').matches) {
 
  if(document.querySelector('.tab-content').getBoundingClientRect().top < 1){
    document.querySelector('.elevator-button').style.visibility = 'visible';
  }else {
    document.querySelector('.elevator-button').style.visibility = 'hidden';
  }
}
  
if(window.matchMedia('(min-width: 768px)').matches && window.matchMedia('(max-width: 1023px)').matches) {
  
  if(getBodyScrollTop() >= 700) {
    document.querySelector('.elevator-button').style.visibility = 'visible';
  }else {
    document.querySelector('.elevator-button').style.visibility = 'hidden';
  }
}

if(window.matchMedia('(min-width: 1024px)').matches) {
 
  if(getBodyScrollTop() >= 1200) {
    document.querySelector('.elevator-button').style.visibility = 'visible';
  }else {
    document.querySelector('.elevator-button').style.visibility = 'hidden';
  }
}

});

