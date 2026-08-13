const animatedTags = document.querySelectorAll("h2, h3, p, section , a.button")
//fade out on load
animatedTags.forEach(tag =>{
  tag.style.opacity = 0
})
  //on load run fadein
const fadeIn = function (){
//look through all animated tags and see with getBoundingClientRect if it's in the window
  animatedTags.forEach(tag => {
    const tagTop = tag.getBoundingClientRect().top
    const tagBottom = tag.getBoundingClientRect().bottom
    let delay = 0.25
    if (tagTop < window.innerHeight && tagBottom > 0){
      tag.style.animation = `fadeanimate 1s ${delay}s both`
      delay = delay + 0.25
    }
    else {
      tag.style.opacity = 0
       tag.style.animation = ""
    }
  })
}
 //on  scroll run fadein
document.addEventListener("scroll", function (){

  fadeIn()
})

//on browser resize, run fadeIn
window.addEventListener("resize", function(){

  fadeIn()
})
