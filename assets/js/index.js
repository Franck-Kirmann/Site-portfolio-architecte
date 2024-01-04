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

getworks();

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

    input.addEventListener("click", () => {
      handleInputClick(categories[i].id, categories[i].name);
      const allInputs = document.querySelectorAll(".categories input");

      allInputs.forEach((otherInput) => {
        otherInput.classList.remove("selected");
      });

      input.classList.add("selected");
      const categorieId = categories[i].id;
      displayWorksByCategorie(categorieId);
    });
  }
};

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

getcategories();

const handleInputClick = (categorieId, categorieName) => {
  console.log("Input cliqué : id:", categorieId, ", name :", categorieName);
};

const displayWorksByCategorie = (categorieId) => {
  const filteredWorks = Works.filter((work) => work.categoryId === categorieId);
  displayFilteredWorks(filteredWorks);
};

const displayFilteredWorks = (filteredWorks) => {
  gallery.innerHTML = "";

  filteredWorks.forEach((element) => {
    gallery.innerHTML += `<figure>
        <img src=${element.imageUrl} alt="${element.title}">
            <figcaption>${element.title}</figcaption>
    </figure>`;
  });
};
