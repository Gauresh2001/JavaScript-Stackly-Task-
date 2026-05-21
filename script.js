let allProducts = [];
let cart = [];

const productDiv = document.getElementById("products");
const message = document.getElementById("message");
const searchInput = document.getElementById("searchInput");
const cartCount = document.getElementById("cartCount");
const totalPrice = document.getElementById("totalPrice");

async function fetchProducts() {
  try {
    message.innerHTML = "<h2>Loading...</h2>";

    const response = await fetch("https://fakestoreapi.com/products");

    if (!response.ok) {
      throw new Error("API Failed");
    }

    const data = await response.json();
    allProducts = data;

    message.innerHTML = "";
    displayProducts(allProducts);

  } catch (error) {
    message.innerHTML = "<h2>Error Fetching Data</h2>";
  }
}

function displayProducts(products) {
  productDiv.innerHTML = "";

  products.forEach(product => {
    productDiv.innerHTML += `
      <div class="card">
        <img src="${product.image}" alt="Product Image">
        <h3>${product.title.slice(0, 20)}...</h3>
        <p>${product.description.slice(0, 50)}...</p>
        <p class="price">$${product.price}</p>
        <button onclick="addToCart(${product.id})">Add To Cart</button>
        <button onclick="removeFromCart(${product.id})">Remove</button>
      </div>
    `;
  });
}

searchInput.addEventListener("keyup", function () {
  const searchValue = searchInput.value.toLowerCase();

  const filteredProducts = allProducts.filter(product =>
    product.title.toLowerCase().includes(searchValue)
  );

  displayProducts(filteredProducts);
});

function filterCategory(category) {
  if (category === "all") {
    displayProducts(allProducts);
  } else {
    const filtered = allProducts.filter(product =>
      product.category === category
    );

    displayProducts(filtered);
  }
}

function addToCart(id) {
  const product = allProducts.find(item => item.id === id);
  cart.push(product);
  updateCart();
}

function removeFromCart(id) {
  const index = cart.findIndex(item => item.id === id);

  if (index !== -1) {
    cart.splice(index, 1);
  }

  updateCart();
}

function updateCart() {
  cartCount.innerText = cart.length;

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  totalPrice.innerText = total.toFixed(2);
}

fetchProducts();