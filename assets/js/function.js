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
  EditMode.className = "DisplayOff";
};

const login = () => {
  loginBtn.style.display = "none";
  logoutBtn.style.display = "inline-block";
  FilterAll.classList.add("DisplayOff");
};

const logout = () => {
  loginBtn.style.display = "inline-block";
  logoutBtn.style.display = "none";
  FilterAll.classList.remove("DisplayOff");
};
const ProjetsOn = () => {
  Projets.className = "Projets";
};
const ProjetsOff = () => {
  Projets.className = "";
};
const modifierOn = () => {
  modifier.style.display = "inline-block";
};

const modifierOff = () => {
  modifier.style.display = "none";
};

//modal

const displayModalworks = () => {
  ModalGallery.innerHTML = "";

  Works.forEach((element) => {
    const imageContainer = document.createElement("div");
    const ModalImg = document.createElement("img");
    const deletedBtn = document.createElement("button");
    deletedBtn.innerHTML = "<i class='fa-solid fa-trash-can'>";

    ModalGallery.appendChild(imageContainer);
    imageContainer.className = "imageContainer";

    imageContainer.appendChild(ModalImg);
    ModalImg.className = "ModalImg";
    ModalImg.src = element.imageUrl;
    ModalImg.alt = element.title;

    imageContainer.appendChild(deletedBtn);
    deletedBtn.className = "deleted";

    const DivDeletedWork = document.getElementById("DivDeletedWork");
    const PreviewDeletedImg = document.querySelector(".PreviewDeletedImg");
    const annuler = document.getElementById("annuler");
    const confirmer = document.getElementById("confirmer");
    deletedBtn.dataset.workId = element.id;
    let currentWorkId;

    deletedBtn.addEventListener("click", () => {
      currentWorkId = deletedBtn.dataset.workId;
      PreviewDeletedImg.innerHTML = `<img src=${element.imageUrl} alt=${element.title} class="DeleteImg">
        <figcaption>Confirmez la suppression de cette image : ${element.title}</figcaption>`;
      DivDeletedWork.className = "DivDeletedWork";
      console.log(currentWorkId);
    });

    annuler.addEventListener("click", () => {
      PreviewDeletedImg.innerHTML = "";
      DivDeletedWork.className = "DisplayOff";
    });

    confirmer.addEventListener("click", () => {
      if (currentWorkId) {
        deletedWork(currentWorkId);
        currentWorkId = null;
        DivDeletedWork.className = "DisplayOff";
      }
    });
  });
};

const toggleDropdown = () => {
  var dropdownContent = document.getElementById("myDropdown");
  if (dropdownContent.style.display === "block") {
    dropdownContent.style.display = "none";
  } else {
    dropdownContent.style.display = "block";
  }
};

const choisirOption = (option, categoryId) => {
  result.innerText = option;
  myDropdown.style.display = "none";
  console.log("jai cliquer sur", categoryId);
  verifierValeurs(categoryId);
};

const createDropdownOptions = () => {
  const dropdown = document.getElementById("myDropdown");
  dropdown.innerHTML = "";

  categories.forEach((category) => {
    const option = document.createElement("button");
    option.className = "ModalSelectedCategorie";
    option.textContent = category.name;

    option.addEventListener("click", () => {
      choisirOption(category.name, category.id);
      CatId = category.id;
    });

    dropdown.appendChild(option);
  });
};

const modalCloseFunction = () => {
  modal.className = "DisplayOff";
  modalContainer1.className = "modalContainer";
  modalContainer2.className = "DisplayOff";
};

function AddWorks(CatId) {
  const formData = new FormData();
  formData.append("image", ModalAddFile.files[0]);
  formData.append("title", ModalAddTitle.value);
  formData.append("category", CatId);
  console.log("test", CatId);
  addworksApi(formData);
}
