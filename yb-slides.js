//pick all the images
const slideArea = document.querySelector("div.slides")
const images = slideArea.querySelectorAll("img")

//keep track of slide and z index
let currentSlide = 0
let z = 1

// when I click the slide area, change the slide based on the z index
slideArea.addEventListener("click", function(){
  currentSlide = currentSlide + 1
  if(currentSlide > images.length - 1){
    currentSlide = 0

  }
  z = z + 1

  //remove the animation from the style for every image
  images.forEach(function (image){
    image.style.animation = ""
  })

  //pick the right image
  images[currentSlide].style.zIndex = z
  images[currentSlide].style.animation = "fade 0.5s"
})

//when i hover, images jut out randomly (this one is grid)
//slideArea.addEventListener("mouseover", function () {
  // images.forEach(function (image) {
 //  const x = 25 * (Math.floor(Math.random() * 5)) -50
//   const y = 25 * (Math.floor(Math.random() * 5)) -50
  // image.style.transform = `translate(${x}px, ${y}px)`
  //})
//})
slideArea.addEventListener("mouseover", function () {
  images.forEach(function (image) {
  const x = 100 * Math.random() -50
   const y = 100 * Math.random() -50
  image.style.transform = `translate(${x}px, ${y}px)`
  })
})
//when i move mouse away wir raumen auf
slideArea.addEventListener("mouseout", function () {
  images.forEach(function (image) {
        image.style.transform = ""
  })
})
