const queryParams = new URLSearchParams(location.search);
const productId = queryParams.get("productId");

const generateRateStars = (rate) => {
  let stars = "";
  const emptyStar = `<i class="bi bi-star fs-3 text-warning"></i>`;
  const filledStar = `<i class="bi bi-star-fill fs-3 text-warning"></i>`;
  const halfStar = `<i class="bi bi-star-half fs-3 text-warning"></i>`;

  for (let i = 1; i <= 5; i++) {
    if (i < rate) {
      stars += filledStar;
    } else if (i > rate && i - 1 < rate) {
      stars += halfStar;
    } else {
      stars += emptyStar;
    }
  }

  return `<div class="d-flex gap-1">${stars}</div>`;
};

const generateProductContent = ({
  image,
  description,
  title,
  category,
  rating,
  price,
}) => {
  const contentEl = document.querySelector(".product-details");
  const stars = generateRateStars(rating.rate);

  contentEl.innerHTML = `
<div class="row align-items-start gy-4">
  <div class="col-12 col-md-6 text-center">
    <img src="${image}" class="img-fluid rounded" alt="${title}">
  </div>
  <div class="col-12 col-md-6 d-flex flex-column gap-3">
    <div>
      <h2 class="h2">${title}</h2>
      <small class="text-muted">${category}</small>
    </div>
    <p>${description}</p>
    <div class="d-flex justify-content-between align-items-center">
      <span class="badge bg-primary fs-4">$${price}</span>
    </div>
    <div class="d-flex align-items-center gap-2">
      ${stars}
      <span class="fs-5">${rating.rate} / ${rating.count}</span>
    </div>
    <div>
      <button 
        class="btn btn-secondary add-to-cart-btn w-100" 
        data-id="${title}" 
        data-title="${title}" 
        data-price="${price}" 
        data-image="${image}">
        Add to Cart
      </button>
    </div>
  </div>
</div>`;

  const addToCartBtn = contentEl.querySelector(".add-to-cart-btn");

  addToCartBtn.addEventListener("click", () => {
  const product = {
    id: addToCartBtn.getAttribute("data-id"),
    title: addToCartBtn.getAttribute("data-title"),
    price: parseFloat(addToCartBtn.getAttribute("data-price")),
    image: addToCartBtn.getAttribute("data-image"),
  };
  addToCart(product);
});
};

const fetchProduct = async () => {
  try {
    const response = await fetch(`${serverAddress}/products/${productId}`);
    const product = await response.json();

    if (product) {
      generateProductContent(product);
    }

    console.log("product", product);
  } catch (error) {
    console.error(error);
  }
};

document.addEventListener("DOMContentLoaded", fetchProduct);
