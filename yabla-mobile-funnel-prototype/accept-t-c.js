var checkboxTag = document.querySelector('input.checkbox')
var forwardBtn = document.querySelector('a.link')
var buttonTag = document.querySelector('div.sm.orange.btn.qs')
var access = function () {
  var forwardBtn = document.querySelector('a.link')
  if (!checkboxTag.checked) {
    forwardBtn.style.pointerEvents = 'none';
     buttonTag.classList.add('gs')
      buttonTag.classList.remove('btn')

  } else {
    forwardBtn.style.pointerEvents = 'all'
    buttonTag.classList.remove('gs')
 buttonTag.classList.add('btn')
  }
}

checkboxTag.addEventListener('click', function () {
  access()
})
