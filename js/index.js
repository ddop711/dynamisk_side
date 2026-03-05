const container = document.querySelector(".categories");

fetch("https://kea-alt-del.dk/t7/api/categories")
  .then((res) => res.json())
  .then((categories) => {
    categories.forEach((cat) => {
      container.innerHTML += `
        <a class="card" href="productlist.html?category=${cat.category}">
          <h3>${cat.category}</h3>
        </a>
      `;
    });
  })
  .catch((err) => console.log("Fejl med API:", err));
