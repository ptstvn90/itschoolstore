const serverAddress = "https://fakestoreapi.com";
const logoutIconEl = document.getElementById("logout-icon");
const shoppingCartContainerEl = document.getElementById(
  "shopping-cart-icon-container"
);
const cartBodyEl = document.getElementById("cart-body");

const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/pages/login.html";
};

const createCartCounter = () => {
  const createdCounterEl = document.querySelector(".shopping-cart-counter");
  const localStorageProducts = localStorage.getItem("shoppingCartList");
  const productsInCart = localStorageProducts
    ? JSON.parse(localStorageProducts).length
    : 0;

  if (createdCounterEl) {
    createdCounterEl.textContent = productsInCart;
  } else {
    const counterEl = document.createElement("div");

    counterEl.setAttribute("class", "shopping-cart-counter");
    counterEl.textContent = productsInCart;

    shoppingCartContainerEl.appendChild(counterEl);
  }
};

const addToCart = (product) => {
  const shoppigCardProducts = localStorage.getItem("shoppingCartList");

  if (!shoppigCardProducts) {
    const products = [product];
    localStorage.setItem("shoppingCartList", JSON.stringify(products));
  } else {
    const products = JSON.parse(shoppigCardProducts);

    products.push(product);
    localStorage.setItem("shoppingCartList", JSON.stringify(products));
  }
  createCartCounter();
  buildShoppingCart();
};

const createLine = ({ image, title, price, counter, id }, containerEl) => {
  const lineEl = document.createElement("div");
  const deleteLineEl = document.createElement("i");

  deleteLineEl.setAttribute("class", "bi bi-trash text-danger fs-5 clickable");
  lineEl.setAttribute("class", "d-flex gap-3 align-items-center");

  lineEl.innerHTML = `<div class="d-flex gap-3 align-items-center">
    <img class="img-thumbnail img-fluid w-25" src="${image}" alt="${title}"/>
    <div class="d-flex flex-column">
      <div class="fw-semibold">${title}</div>
      <div class="fs-5 text-info">${counter} x $${price}</div>
    </div>
  </div>`;

  deleteLineEl.addEventListener("click", () => {
    const localStorageProducts = localStorage.getItem("shoppingCartList");
    const productsInCart = localStorageProducts
      ? JSON.parse(localStorageProducts)
      : [];
    const restOfProducts = productsInCart.filter(
      (product) => product.id !== id
    );

    localStorage.setItem("shoppingCartList", JSON.stringify(restOfProducts));
    lineEl.remove();
  });

  lineEl.appendChild(deleteLineEl);
  containerEl.appendChild(lineEl);
};

const buildTotal = (products) => {
  const totalContainerEl = document.createElement("div");
  const numberOfItems = products.reduce((amount, product) => {
    return amount + product.counter;
  }, 0);

  const totalPrice = products.reduce((total, product) => {
    return total + product.price * product.counter;
  }, 0);

  const createdTotalContainerEl = document.querySelector(".total-container");

  if (createdTotalContainerEl) {
    createdTotalContainerEl.remove();
  }

  totalContainerEl.setAttribute(
    "class",
    "d-flex justify-content-between total-container"
  );
  totalContainerEl.innerHTML = `
    <div class="fw-semibold fs-3">Items: ${numberOfItems}</div>
    <div class="fw-semibold fs-3">Total: $${totalPrice}</div>
  `;

  cartBodyEl.appendChild(totalContainerEl);
};

const buildShoppingCart = () => {
  const localStorageProducts = localStorage.getItem("shoppingCartList");
  const productsInCart = localStorageProducts
    ? JSON.parse(localStorageProducts)
    : [];

  const productsByCount = productsInCart.reduce((acc, item) => {
    const index = acc.findIndex((product) => product.id === item.id);

    if (index === -1) {
      acc.push({ ...item, counter: 1 });
    } else {
      acc[index].counter += 1;
    }
    return acc;
  }, []);

  const createdCartContainerEl = document.querySelector(".cart-container");

  if (createdCartContainerEl) {
    createdCartContainerEl.remove();
  }

  const containerEl = document.createElement("div");

  productsByCount.forEach((product) => {
    createLine(product, containerEl);
  });

  containerEl.setAttribute("class", "d-flex flex-column gap-3 cart-container");
  cartBodyEl.appendChild(containerEl);
  cartBodyEl.setAttribute(
    "class",
    "d-flex flex-column gap-5 p-3 overflow-y-auto"
  );

  buildTotal(productsByCount);

  const confirmPurchaseBtn = document.createElement("button");
  confirmPurchaseBtn.textContent = "Confirm Purchase";
  confirmPurchaseBtn.setAttribute("class", "btn btn-secondary mt-3 w-100");

  confirmPurchaseBtn.addEventListener("click", () => {
  localStorage.removeItem("shoppingCartList");
  window.location.href = "products_purchased.html";
});

  cartBodyEl.appendChild(confirmPurchaseBtn);
};

logoutIconEl.addEventListener("click", logout);

document.addEventListener("DOMContentLoaded", () => {
  createCartCounter();
  buildShoppingCart();
});
