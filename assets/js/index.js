//gallery
let Works = [];

const gallery = document.querySelector(".gallery");
const getworks = () => {
  fetch("http://localhost:5678/api/works/")
    .then((res) => res.json())
    .then((data) => {
      Works = data;
      displayworks();
    });
};

getworks();

//filtre
let categories = [];

const filter = document.querySelector(".categories");

const FilterAll = document.getElementById("FilterAll");

FilterAll.addEventListener("click", (input) => {
  displayworks();
  let i = 0;
  input.className = "";
  console.log("jai cliquer sur tous", [i]);

  const allInputs = document.querySelectorAll(".categories input");
  allInputs.forEach((input) => {
    input.classList.remove("selected");
  });

  FilterAll.classList.add("selected");
});

//login
const EditMode = document.getElementById("EditMode");
const logoutBtn = document.getElementById("logoutBtn");
const loginBtn = document.getElementById("loginBtn");
const modifier = document.getElementById("modifier");

document.addEventListener("DOMContentLoaded", function () {
  if (isLogin()) {
    console.log("online");
    diplayEditModeOn();
    login();
    modifierOn();
    ProjetsOn();
  } else {
    console.log("offline");
    diplayEditModeOff();
    const getcategories = () => {
      fetch("http://localhost:5678/api/categories")
        .then((cat) => cat.json())
        .then((datacat) => {
          categories = datacat;
          createInputElements();
        });
    };
    logout();
    getcategories();
    modifierOff();
    ProjetsOff();
  }
});

logoutBtn.addEventListener("click", function () {
  sessionStorage.removeItem("token");
  location.reload();
});
const Projets = document.getElementById("Projets");
const modal = document.getElementById("modal");
const modalClose = document.querySelector(".modalClose");
const ModalGallery = document.querySelector(".ModalGallery");

document.addEventListener("DOMContentLoaded", function () {
  const ModifierBtn = document.querySelector(".ModifierBtn");
  ModifierBtn.addEventListener("click", function () {
    modal.className = "modal";
  });
});

modalClose.addEventListener("click", function () {
  modal.className = "DiplayOff";
});

const getModalWorks = () => {
  fetch("http://localhost:5678/api/works/")
    .then((res) => res.json())
    .then((data) => {
      Works = data;
      displayModalworks();
    });
};
getModalWorks();
