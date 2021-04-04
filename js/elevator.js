//  elevator script
 
window.onload = function() {
  let elevator = new Elevator({
    element: document.querySelector('.elevator-button'),
    targetElement: document.querySelector('#tablist'),
    duration: 2500,
    mainAudio: 'libs/elevators/music/elevator.mp3',
    endAudio: 'libs/elevators/music/ding.mp3'
  });
 }
  
 $(window).scroll(function (event) {
  let top = $(window).scrollTop();
   if(top >= 1500){
    document.querySelector('.elevator-button').style.visibility = 'visible';
   } else {
    document.querySelector('.elevator-button').style.visibility = 'hidden';
   }
   
});
