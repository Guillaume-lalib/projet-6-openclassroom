const email = document.getElementById("email");
const password = document.getElementById("password");
const errorConnect = document.getElementById("error");
const valid = document.getElementById("submit");
const form = document.getElementById("login-form");

form.addEventListener("submit", function (connect) {
  connect.preventDefault();
  const infoUser = new FormData(form);
  const laod = new URLSearchParams(infoUser);
  const dataLogin = async () => {
    const urlLogin = fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      body: laod,
    });
    const resLogin = await urlLogin;
    const dataLogin = await resLogin.json();

    if (dataLogin.userId == 1) {
      localStorage.setItem("token", dataLogin.token);
      location.href = "./index.html";
    } else {
      email.value = null;
      password.value = null;
      errorConnect.innerText = "identifiant ou mot de passe incorrect";
    }
  };
  dataLogin();
});
