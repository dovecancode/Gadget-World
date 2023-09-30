// customize bootstrap modal
// created a register and login kind of slider
;(function () {
  const loginBtn = document.getElementById('loginBtn')
  const registerBtn = document.getElementById('registerBtn')
  const modalForm = document.querySelector('.modal-form')

  const onClickReg = () => {
    modalForm.classList.add('reg')
  }

  const onClickLogin = () => {
    if (modalForm.classList.contains('reg')) {
      modalForm.classList.remove('reg')
    }
  }

  registerBtn.addEventListener('click', onClickReg)
  loginBtn.addEventListener('click', onClickLogin)
})()

// Item thumb slider and featured image
;(function () {
  const sliderThumb = document.querySelector('.slider-thumb')
  const sliderThumbWidth = sliderThumb.querySelector('li').offsetWidth * 4
  const sliderThumbs = sliderThumb.querySelectorAll('li')
  const sliderBtns = document.querySelectorAll('.items-container i')
  const productFeature = document.querySelector('.product-feature')

  for (let i = 0; i < sliderBtns.length; i++) {
    const element = sliderBtns[i]
    element.addEventListener('click', function (e) {
      sliderThumb.scrollLeft += element.id === 'left' ? -sliderThumbWidth : sliderThumbWidth
    })
  }

  // function for removing active class
  const removeActiveClass = () => {
    for (let i = 0; i < sliderThumbs.length; i++) {
      const element = sliderThumbs[i]
      element.classList.remove('active')
    }
  }

  // loop through li elements and add active class to it when its click to a thumbnail
  for (let i = 0; i < sliderThumbs.length; i++) {
    const element = sliderThumbs[i]
    element.addEventListener('click', function () {
      removeActiveClass() // removing the active class
      element.classList.add('active')
      // change the featured image from the thumbnail image
      productFeature.src = element.firstChild.src
    })
  }
})()
