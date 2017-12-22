
//
// ────────────────────────────────────────────────────────── I ──────────
//   :::::: JS  F O R   H E A D E R : :  :   :    :     :
// ────────────────────────────────────────────────────────────────────
//

//Hide or show header by mouse scroll
//based on https://deepmikoto.com/coding/1--javascript-detect-mouse-wheel-direction
function detectWheelDirection(e) {
  var delta = null,
    direction = false;
  if (!e) { // if the event is not provided, we get it from the window object
    e = window.event;
  }
  if ( e.wheelDelta ) { 
    delta = e.wheelDelta / 60;
  } else if ( e.detail ) { // fallback for Firefox
    delta = -e.detail / 2;
  }
  if ( delta !== null ) {
    direction = delta > 0 ? 'up' : 'down'; 
  }
  return direction;
}
function hideNavbar(direction) {
   //wheel directon down will hide navbar, but only if Y position > 150px 
  if (direction == 'down' && (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150)) {
    document.getElementById("navbar").style.top = "-70px";
  } else if (direction == 'up') {  //show navbar if wheel up
    document.getElementById("navbar").style.top = "0";
  }
}
document.onmousewheel = function(e) { //Integrate direction logic with listeners
  hideNavbar(detectWheelDirection(e));
};
if (window.addEventListener) { //Integrate direction logic with listeners for firefox
  document.addEventListener( 'DOMMouseScroll', function( e ) {
    hideNavbar(detectWheelDirection(e));
  });
}

//If user use scroll or press "Go top" after mouse weel hide navbar
window.onscroll = function() {
  showGoTop();
  ifScrolledTop();
};
function ifScrolledTop() {
  if (window.scrollY < 149) {
    document.getElementById("navbar").style.top = "0";
  } 
}

//if  user is at the bottom and click on logo, scroll top, if he already on top, reload page
function toTheStarsHeader() { 
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0; 
  } else {
    location.reload();
}}

//"Go top" button
function showGoTop() {
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    document.getElementById("js-top").style.opacity = "1";
    document.getElementById("js-top").style.zIndex = "1";
  } else {
    document.getElementById("js-top").style.opacity = "0";
    document.getElementById("js-top").style.zIndex = "-1";
  }
}
var top = document.getElementById("js-top");
top.onclick = function() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}