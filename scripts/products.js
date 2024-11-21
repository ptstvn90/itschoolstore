const queryParams = new URLSearchParams(location.search);
const category = queryParams.get("category");

const productsTitleEl = document.getElementById("products-title");
const productsEl = document.querySelector(".products");

productsTitleEl.textContent = category;

const generateCardPlaceholders = () => {
  for (let i = 0; i < 6; i++) {
    const cardEl = document.createElement("div");

    cardEl.innerHTML = `
    <div class="card product-card" aria-hidden="true">
  <img src="https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=" class="card-img-top card-image" alt="...">
  <div class="card-body w-100">
    <h5 class="card-title placeholder-glow">
      <span class="placeholder col-6"></span>
    </h5>
    <p class="card-text placeholder-glow">
      <span class="placeholder col-7"></span>
      <span class="placeholder col-4"></span>
      <span class="placeholder col-4"></span>
      <span class="placeholder col-6"></span>
      <span class="placeholder col-8"></span>
    </p>
    <a class="btn btn-primary disabled placeholder col-6" aria-disabled="true"></a>
  </div>
</div>`;

    productsEl.appendChild(cardEl);
  }
};

const generateProductCard = ({ price, title, image, id }) => {
  const cardEl = document.createElement("div");
  const imageEl = document.createElement("img");
  const cardBodyEl = document.createElement("div");
  const titleEl = document.createElement("h5");
  const priceEl = document.createElement("span");
  const addToCartBtnEl = document.createElement("button");
  const iconEl = document.createElement("i");

  const redirectToProductDetails = (event) => {
    event.preventDefault();

    location.href = `../pages/product.html?productId=${id}`;
  };

  imageEl.setAttribute("src", image);
  imageEl.setAttribute("class", "card-img-top card-image");
  cardBodyEl.setAttribute(
    "class",
    "card-body mt-3 d-flex flex-column align-items-center gap-4"
  );

  titleEl.setAttribute("class", "card-title text-center");
  titleEl.textContent = title;

  priceEl.setAttribute("class", "badge rounded-pill text-bg-info fs-5 mt-auto");
  priceEl.textContent = `$${price}`;

  cardEl.classList.add("product-card");
  cardEl.classList.add("card");

  cardEl.appendChild(imageEl);
  cardEl.appendChild(cardBodyEl);

  cardEl.addEventListener("click", redirectToProductDetails);

  iconEl.setAttribute("class", "bi bi-cart3 text-light");

  addToCartBtnEl.setAttribute("class", "btn btn-secondary");
  addToCartBtnEl.textContent = "Add to cart ";
  addToCartBtnEl.appendChild(iconEl);
  addToCartBtnEl.addEventListener("click", (event) => {
    event.stopPropagation();

    addToCart({ price, image, title, id });
  });
  cardBodyEl.appendChild(titleEl);
  cardBodyEl.appendChild(priceEl);
  cardBodyEl.appendChild(addToCartBtnEl);

  productsEl.appendChild(cardEl);
};

const fetchProducts = async () => {
  if (!category) return;

  try {
    generateCardPlaceholders();
    const response = await fetch(
      `${serverAddress}/products/category/${category}`
    );
    const products = await response.json();

    productsEl.innerHTML = "";

    if (products.length > 0) {
      products.forEach((product) => {
        generateProductCard(product);
      });
    }

    console.log(products);
  } catch (error) {
    console.log(error);
  }
};

document.addEventListener("DOMContentLoaded", fetchProducts);
