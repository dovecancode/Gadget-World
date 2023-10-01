const currentPage = window.location.pathname
const productsData = products

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
            <a role="button" class="btn btn-purple btn-block add-to-cart" id="add-to-cart" onclick="addToCart(${product.id})">ADD TO CART</a>
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
            <a role="button" class="btn btn-purple btn-block add-to-cart">ADD TO CART</a>
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
      renderSpecificItem()
      break
  }
}

renderWhichPage()
