//on scroll threshold add class to make header white
const headerTag = document.querySelector('header')
const toggleHeader = function() {
  const pixels = window.pageYOffset
  if (10 <= pixels && pixels < 8000) {
    headerTag.classList.add('scrolled')
  } else {
    headerTag.classList.remove('scrolled')
  }
}
const fadeBox = function() {
  const pixels = window.pageYOffset
  const alpha = Math.min(pixels / 500, 0.5)
  headerTag.style.boxShadow = `0 0 10px rgba(0, 0, 0, ${alpha})`
}

document.addEventListener('scroll', function() {
  toggleHeader()
  fadeBox()
})
