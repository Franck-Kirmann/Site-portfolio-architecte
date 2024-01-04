const email = document.getElementById(email);
const password = document.getElementById(password);

const login = () => {
  fetch("http://localhost:5678/api/users/login").then((log) => log.json);
};
