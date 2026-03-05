const params = new URLSearchParams(window.location.search);
const category = params.get("category");
document.querySelector("#categoryTitle").textContent = category;

const container = document.querySelector(".products");
const sortSelect = document.querySelector("#sortPrice");
const hideSoldCheckbox = document.querySelector("#checkboxSold");

let products = [];

fetch(`https://kea-alt-del.dk/t7/api/products?category=${category}`)
  .then((res) => res.json())
  .then((data) => {
    products = data;
    updateProducts();
  });

function displayProducts(list) {
  container.innerHTML = "";
  list.forEach((product) => {
    const sale = product.discount ? `<div class="badge sale">SALE</div>` : "";
    const sold = product.soldout ? `<div class="badge soldout">SOLD OUT</div>` : "";
    container.innerHTML += `
      <div class="card">
        ${sale}${sold}
        <a href="productdetails.html?id=${product.id}">
          <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="${product.productdisplayname}">
          <h3>${product.productdisplayname}</h3>
          <p class="brand">${product.brandname}</p>
          <p class="price">${product.price} kr</p>
        </a>
      </div>
    `;
  });
}

function updateProducts() {
  let list = [...products];

  if (hideSoldCheckbox.checked) list = list.filter((p) => !p.soldout);

  if (sortSelect.value === "low") list.sort((a, b) => a.price - b.price);
  if (sortSelect.value === "high") list.sort((a, b) => b.price - a.price);

  displayProducts(list);
}

sortSelect.addEventListener("change", updateProducts);
hideSoldCheckbox.addEventListener("change", updateProducts);
