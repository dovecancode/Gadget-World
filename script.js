const currentPage = window.location.pathname
import productsData from './data.js'
import { formSlider, sliderThumb } from './effect.js'

const cartCountEl = document.getElementById('cartCount')

// function for fetching data from localStorage
const getCartFromStorage = () => {
  let cart
  if (localStorage.getItem('cart') === null) {
    cart = []
  } else {
    cart = JSON.parse(localStorage.getItem('cart'))
  }
  return cart
}

// store data from localstorage to a variable
let cartCountItems = getCartFromStorage()

// for UI -> indicates how many items in cart page
cartCountEl.textContent = cartCountItems.length

const renderHomeProducts = () => {
  const homeProductsEl = document.getElementById('home-products')
  const prodEight = productsData
    .slice(0, 8)
    .map((product) => {
      return `<div class="col-md-3 col-sm-6 mb-3">
      <div class="card item">
        <a href="item-details.html?id=${product.id}">
          <div class="product-item">
            <img src="${product.featureImg}" class="card-img-top radius-padding" alt="Cell Phone" />
            <button type="button" class="btn btn-purple btn-block add-to-cart" id="add-to-cart" data-id="${product.id}">ADD TO CART</button>
          </div>
        </a>
        <a href="item-details.html?id=3">
          <div class="card-body text-center">
            <h5 class="card-title"><b>${product.title}</b></h5>
            <p class="card-text price-color">₱${formatPrice(product.price)}</p>
          </div>
        </a>
      </div>
    </div>`
    })
    .join('')

  homeProductsEl.innerHTML = prodEight

  const cartBtns = document.querySelectorAll('.add-to-cart')
  cartBtns.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      e.preventDefault()
      addToCart(+btn.dataset.id)
      btn.disabled = 'true'
      btn.style.pointerEvents = 'unset'
      btn.textContent = 'In Cart'
      alert('Added to Cart')
    })
  })

  cartBtns.forEach((btn) => {
    const id = +btn.dataset.id
    const isInCart = cartCountItems.find((item) => item.id === id)

    if (isInCart) {
      btn.disabled = 'true'
      btn.style.pointerEvents = 'unset'
      btn.textContent = 'In Cart'
    }
  })
}

// addcart to localstorage
const addToCart = (id) => {
  const cart = getCartFromStorage()
  const itemFound = productsData.find((product) => product.id === id)

  cart.push({ ...itemFound, cartCount: 1 })

  localStorage.setItem('cart', JSON.stringify(cart))

  updateCart()
}

const updateCart = () => {
  cartCountEl.textContent = getCartFromStorage().length
}

// Render all items in Shop Page
const renderShopPageItems = () => {
  const shopPageProductsEl = document.getElementById('product-items')
  const product = productsData
    .map((product) => {
      return `<div class="col-md-4 col-sm-6 mb-3">
      <div class="card item">
        <a href="item-details.html?id=${product.id}">
          <div class="product-item">
            <img src="${product.featureImg}" class="card-img-top radius-padding" alt="Cell Phone" />
            <button type="button" class="btn btn-purple btn-block add-to-cart" id="add-to-cart" data-id="${product.id}">ADD TO CART</button>
          </div>
        </a>
        <a href="item-details.html?id=3">
          <div class="card-body text-center">
            <h5 class="card-title"><b>${product.title}</b></h5>
            <p class="card-text price-color">₱${formatPrice(product.price)}</p>
          </div>
        </a>
      </div>
    </div>`
    })
    .join('')

  shopPageProductsEl.innerHTML = product

  const cartBtns = document.querySelectorAll('.add-to-cart')
  cartBtns.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      e.preventDefault()
      addToCart(+btn.dataset.id)
      btn.disabled = 'true'
      btn.style.pointerEvents = 'unset'
      btn.textContent = 'In Cart'
      alert('Added to Cart')
    })
  })

  cartBtns.forEach((btn) => {
    const id = +btn.dataset.id
    const isInCart = cartCountItems.find((item) => item.id === id)

    if (isInCart) {
      btn.disabled = 'true'
      btn.style.pointerEvents = 'unset'
      btn.textContent = 'In Cart'
    }
  })
}

const renderSpecificItem = () => {
  const itemId = window.location.search.split('=')[1]
  const productDetails = document.getElementById('product-details')
  const foundItemProduct = productsData
    .map((product) => {
      if (product.id === +itemId) {
        return ` <div class="col-md-4">
      <div class="featured-img">
        <img src="${product.featureImg}" alt="${product.title}" class="img-fluid product-feature" />
      </div>
      <div class="items-container">
        <i id="left" class="fa-solid fa-chevron-left"></i>
        <i id="right" class="fa-solid fa-chevron-right"></i>
        <ul class="slider-thumb mt-3">
        ${product.imgs.map((img) => `<li><img class="img-fluid" src="${img}" alt="" /></li>`).join(' ')} 
        </ul>
      </div>
    </div>
    <div class="col-md-8">
      <h1 class="text-black">${product.title}</h1>
      <p>${product.desc}</p>
      <p><strong class="text-primary h4">₱${formatPrice(product.price)}</strong></p>
      <div class="mb-5">
        <div class="row align-items-center item-quantity-container">
          <div class="col-sm-5">
            <div class="q border px-3 quantity d-flex align-items-center justify-content-between">
              <p class="my-2">Quantity</p>
              <div class="quantity">
                <button class="btn"><i class="fa-solid fa-caret-left"></i></button>
                <span>1</span>
                <button class="btn"><i class="fa-solid fa-caret-right"></i></button>
              </div>
            </div>
          </div>
          <div class="col-sm-3 cart-container">
            <p class="my-2"><button class="btn btn-purple">Add To Cart</button></p>
          </div>
        </div>
        <div class="mt-3 px-3 py-2 mb-1 d-inline-block bg-light">
          <strong class="text-uppercase text-dark">Category:</strong>
          <a class="reset-anchor ms-2" href="#!">${product.category}</a>
        </div>
      </div>
    </div>`
      }
    })
    .join('')

  productDetails.innerHTML = foundItemProduct

  // Item thumb slider and featured image
  sliderThumb()
}

const renderCartItems = () => {
  const tbody = document.querySelector('tbody')
  if (cartCountItems.length) {
    tbody.innerHTML = cartCountItems
      .map((cart) => {
        return `<tr>
        <td class="ps-0 py-3 border-light">
          <a href="item-details.html?id=${cart.id}" class="d-flex gap-3 align-items-center">
            <img src="${cart.featureImg}" alt="" width="60" />
            <p class="mt-4">${cart.title}</p>
          </a>
        </td>
        <td class="p-3 align-middle border-light">₱${formatPrice(cart.price)}</td>
        <td class="p-3 align-middle border-light">
          <div class="q border px-2 quantity d-flex align-items-center justify-content-between">
            <p class="my-2">Quantity</p>
            <div class="quantity">
              <button class="btn subtractQ" data-id="${cart.id}"><i class="fa-solid fa-caret-left"></i></button>
              <span id="quantity">${cart.cartCount}</span>
              <button class="btn addQ" data-id="${cart.id}"><i class="fa-solid fa-caret-right"></i></button>
            </div>
          </div>
        </td>
        <td class="p-3 align-middle border-light">₱${formatPrice(cart.price * cart.cartCount)}</td>
        <td class="p-3 align-middle border-light"><i class="fa-solid fa-trash trashItem" data-id="${cart.id}"></i></td>
      </tr>`
      })
      .join('')
  } else {
    tbody.innerHTML = '<h3>Cart is Empty</h3>'
  }

  // add and subtract quantity product
  const addQ = document.querySelectorAll('.addQ')
  const subtractQ = document.querySelectorAll('.subtractQ')
  const trashItem = document.querySelectorAll('.trashItem')
  addQ.forEach((add) => {
    add.addEventListener('click', () => changeQuantity('add', +add.dataset.id))
  })
  subtractQ.forEach((sub) => {
    sub.addEventListener('click', () => changeQuantity('subract', +sub.dataset.id))
  })

  trashItem.forEach((trash) => {
    trash.addEventListener('click', function (e) {
      const el = e.target
      if (el.classList.contains('trashItem')) {
        deleteCartItem(trash.dataset.id)
      }
    })
  })
}

const deleteCartItem = (id) => {
  cartCountItems = cartCountItems.filter((cart) => cart.id !== +id)
  localStorage.setItem('cart', JSON.stringify(cartCountItems))
  renderCartItems()
  renderCartTotal()
}

const renderCartTotal = () => {
  const subtotal = document.getElementById('subtotal')
  const deliveryFeeOption = document.getElementById('deliveryFeeOption')
  const deliveryFee = document.getElementById('deliveryFee')
  const total = document.getElementById('total')

  const checkoutBtn = document.getElementById('checkoutBtn')
  let totalPrice = 0
  let shippingFee = 0

  cartCountItems.forEach((cart) => {
    totalPrice += cart.price * cart.cartCount
    totalPrice += shippingFee
  })

  subtotal.textContent = `₱${formatPrice(totalPrice)}`
  total.textContent = `₱${formatPrice(totalPrice + +shippingFee)}`

  deliveryFeeOption.addEventListener('change', function () {
    shippingFee = deliveryFeeOption.value
    deliveryFee.textContent = `₱${deliveryFeeOption.value}`
    total.textContent = `₱${formatPrice(totalPrice + +shippingFee)}`
    // if there is shipping fee make the button enable else disabled
    Number(shippingFee) ? (checkoutBtn.disabled = false) : (checkoutBtn.disabled = true)
  })
}

const changeQuantity = (action, id) => {
  cartCountItems = cartCountItems.map((cart) => {
    let cartCount = cart.cartCount
    if (cart.id === id) {
      if (action === 'add') {
        cartCount++
      } else if (action === 'subract') {
        cartCount--
        if (cartCount <= 0) {
          cartCount = 1
        }
      }
    }
    return {
      ...cart,
      cartCount,
    }
  })
  localStorage.setItem('cart', JSON.stringify(cartCountItems))
  renderCartItems()
  renderCartTotal()
}

const renderRecomendeProd = (el) => {
  let productEight = productsData
    .slice(0, 4)
    .map((product) => {
      return `<div class="col-md-3 col-sm-6 mb-3">
      <a href="item-details.html?id=${product.id}">
        <div class="card item">
        <div class="product-item">
          <img src="${product.featureImg}" class="card-img-top radius-padding" alt="Cell Phone" />
          <button type="button" class="btn btn-purple btn-block add-to-cart" id="add-to-cart" data-id="${product.id}">ADD TO CART</button>
        </div>
        </a>
      <a href="item-details.html?id=${product.id}">
        <div class="card-body text-center">
          <h5 class="card-title"><b>${product.title}</b></h5>
          <p class="card-text price-color">₱${formatPrice(product.price)}</p>
        </div>
      </a>
    </div>
  </div>`
    })
    .join(' ')

  el.innerHTML = productEight
  // updateCart()
  const cartBtns = document.querySelectorAll('.add-to-cart')
  cartBtns.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      e.preventDefault()
      addToCart(+btn.dataset.id)
      btn.disabled = 'true'
      btn.style.pointerEvents = 'unset'
      btn.textContent = 'In Cart'
      alert('Added to Cart')
    })
  })
  cartBtns.forEach((btn) => {
    const id = +btn.dataset.id
    const isInCart = cartCountItems.find((item) => item.id === id)
    if (isInCart) {
      btn.disabled = 'true'
      btn.style.pointerEvents = 'unset'
      btn.textContent = 'In Cart'
    }
  })
}

// stack overflow
const formatPrice = (num) => {
  return String(num).replace(/(.)(?=(\d{3})+$)/g, '$1,')
}

const renderWhichPage = () => {
  switch (currentPage) {
    case '/':
    case '/index.html':
      renderHomeProducts()
      break
    case '/products.html':
      renderShopPageItems()
      break
    case '/item-details.html':
      const relatedProd = document.getElementById('relatedProd')
      renderSpecificItem()
      renderRecomendeProd(relatedProd)
      break
    case '/cart.html':
      const recommendProd = document.getElementById('recommendProd')
      renderCartItems()
      renderCartTotal()
      renderRecomendeProd(recommendProd)
      break
  }
}
formSlider()
renderWhichPage()
