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

  contentEl.innerHTML = `<div class="d-flex gap-5">
  <img src="${image}" class="img-fluid w-50" alt="...">
  <div class="d-flex flex-column flex-1 gap-3 mt-5">
    <div>
      <h2 class="h2 m-0">${title}</h2>
      <small class="text-body-secondary">${category}</small>
    </div>
    <p>${description}</p>
    <div class="d-flex justify-space-between">
      <span class="badge text-bg-primary fs-4">$${price}</span>
    </div>
    
    <div class="d-flex gap-3 align-items-center">${stars}
      <span class="fs-4">${rating.rate}/${rating.count}</span>
    </div>
  </div>

</div>`;
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
