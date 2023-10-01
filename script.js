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
            <p class="card-text price-color">₱ ${product.price}</p>
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
            <p class="card-text price-color">₱ ${product.price}</p>
          </div>
        </a>
      </div>
    </div>`
    })
    .join('')

  shopPageProductsEl.innerHTML = product
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
  }
}

renderWhichPage()
