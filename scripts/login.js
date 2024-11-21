const loginFormEl = document.getElementById("login-form");

const login = async (e) => {
  e.preventDefault();

  const usernameEl = document.getElementById("username");
  const passwordEl = document.getElementById("password");

  const username = usernameEl.value;
  const password = passwordEl.value;

  if (username === "" || password === "") {
    return;
  }

  try {
    const response = await fetch(`${serverAddress}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const loginData = await response.json();

    if (loginData.token) {
      localStorage.setItem("token", loginData.token);
      window.location.href = "/index.html";
    }

    console.log(loginData);
  } catch (error) {
    console.log(error);
  }
};

loginFormEl.addEventListener("submit", login);
