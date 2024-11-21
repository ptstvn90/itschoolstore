const token = localStorage.getItem("token");
const isLoginPage = location.pathname === "/pages/login.html";

if (token && isLoginPage) {
  window.location.href = "/index.html";
}

if (!token && !isLoginPage) {
  window.location.href = "/pages/login.html";
}
