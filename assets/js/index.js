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

const displayworks = () => {
  gallery.innerHTML = "";

  Works.forEach((element) => {
    gallery.innerHTML += `<figure>
        <img src=${element.imageUrl} alt="${element.title}">
            <figcaption>${element.title}</figcaption>
    </figure>`;
  });
};

//filtre
let categories = [];

const getcategories = () => {
  fetch("http://localhost:5678/api/categories")
    .then((cat) => cat.json())
    .then((datacat) => {
      categories = datacat;
      createInputElements();
    });
};
const filter = document.querySelector(".categories");
const createInputElements = () => {
  for (let i = 0; i < categories.length; i++) {
    const input = document.createElement("input");
    filter.appendChild(input);
    input.type = "submit";
    input.value = categories[i].name;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  getworks();
  getcategories();
});
