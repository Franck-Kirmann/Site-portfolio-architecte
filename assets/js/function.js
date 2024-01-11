//gallery
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

//login

const isLogin = () => {
  return sessionStorage.getItem("token") ? true : false;
};

const diplayEditModeOn = () => {
  EditMode.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>
  <p>Mode édition</p>`;
  EditMode.className = "EditMode";
};
const diplayEditModeOff = () => {
  EditMode.innerHTML = "";
  EditMode.className = "DiplayOff";
};

const login = () => {
  loginBtn.style.display = "none";
  logoutBtn.style.display = "inline-block";
  FilterAll.classList.add("DiplayOff");
};

const logout = () => {
  loginBtn.style.display = "inline-block";
  logoutBtn.style.display = "none";
  FilterAll.classList.remove("DiplayOff");
};
const ProjetsOn = () => {
  Projets.className = "Projets";
};
const ProjetsOff = () => {
  Projets.className = "";
};
const modifierOn = () => {
  modifier.innerHTML = `<button class="ModifierBtn"><i class="fa-regular fa-pen-to-square"></i><pan>modifier</span></button>`;
  modifier.style.display = "inline-block";
};

const modifierOff = () => {
  modifier.innerHTML = "";
  modifier.style.display = "none";
};

//modal

const displayModalworks = () => {
  ModalGallery.innerHTML = "";

  Works.forEach((element) => {
    ModalGallery.innerHTML += `<div class="imageContainer">
  <img src="${element.imageUrl}" alt="${element.title}" class="ModalImg">
  <button class="deleted"><i class="fa-solid fa-trash-can"></i></button>
</div>`;
  });
};
