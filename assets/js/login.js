const loginBTN = document.querySelector("#loginBTN");

loginBTN.addEventListener("click", (e) => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const user = {
    email: email,
    password: password,
  };

  login(user);
});

const login = (user) => {
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.token) {
        sessionStorage.setItem("token", JSON.stringify(data.token));
        document.location.href = "index.html";
      } else {
        console.error("Erreur dans l’identifiant ou le mot de passe");
        alert("Erreur dans l’identifiant ou le mot de passe");
      }
    });
};
