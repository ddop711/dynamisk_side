const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(`https://kea-alt-del.dk/t7/api/products/${id}`)
  .then((res) => res.json())
  .then((product) => {
    document.querySelector("#productDetails").innerHTML = `
      <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="${product.productdisplayname}">
      <div>
        <h2>${product.productdisplayname}</h2>
        <p class="brand">Brand: ${product.brandname}</p>
        <p class="price">Price: ${product.price} kr</p>
        <p>Color: ${product.basecolour}</p>
        <p class="desc">${product.description}</p>
        <button class="button">Add to cart</button>
      </div>
    `;
  });
