const params = new URLSearchParams(window.location.search);
const category = params.get("category");
document.querySelector("#categoryTitle").textContent = category;

let products = [];
const container = document.querySelector(".products");
const sortSelect = document.querySelector("#sortPrice");
const hideSoldCheckbox = document.querySelector("#hideSoldOut");

// --- Hent produkter fra API ---
fetch(`https://kea-alt-del.dk/t7/api/products?category=${category}`)
  .then((res) => res.json())
  .then((data) => {
    products = data; // gem alle produkter
    displayProducts(products);
  });

// --- Funktion til at vise produkter ---
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

// --- Event: Sortering ---
sortSelect.addEventListener("change", () => {
  let sorted = [...products];
  if (sortSelect.value === "low") sorted.sort((a, b) => a.price - b.price);
  if (sortSelect.value === "high") sorted.sort((a, b) => b.price - a.price);
  // hvis checkbox er tjekket, filtrer udsolgte
  if (hideSoldCheckbox.checked) sorted = sorted.filter((p) => !p.soldout);
  displayProducts(sorted);
});

// --- Event: Filtrering udsolgte ---
hideSoldCheckbox.addEventListener("change", () => {
  let filtered = [...products];
  if (hideSoldCheckbox.checked) filtered = filtered.filter((p) => !p.soldout);
  // behold sortering hvis der er valgt
  if (sortSelect.value === "low") filtered.sort((a, b) => a.price - b.price);
  if (sortSelect.value === "high") filtered.sort((a, b) => b.price - a.price);
  displayProducts(filtered);
});
