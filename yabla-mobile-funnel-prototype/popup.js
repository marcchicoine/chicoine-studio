//on scroll threshold add class to make header white
var popupTag = document.querySelector("div.popup");
var exitTag = document.querySelector("img.exit");
var isFired = false;
var newValue = 0;
var oldValue = 0;
var togglePopup = function(){
   var refreshImg = function(){
         //Get the image element 
        var image = document.getElementById("phoneAnimate");
        // Adding the addition parameter to image src
        image.src = "yablaanimationmin.svg?";
};
  

    popupTag.classList.add('slideUp');
       refreshImg();
  }

exitTag.addEventListener('click', function () {
  popupTag.classList.remove('slideUp');
 isFired = true;
        });

document.addEventListener("scroll", function(e) {
   newValue = window.pageYOffset;
       if  ((oldValue > newValue) && (!isFired)) {
         togglePopup();
       }
  oldValue = newValue;
});



