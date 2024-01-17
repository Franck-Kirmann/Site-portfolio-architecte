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

//modal
const Projets = document.getElementById("Projets");
const modal = document.getElementById("modal");
const modalClose1 = document.getElementById("modalClose1");
const modalClose2 = document.getElementById("modalClose2");
const ModalGallery = document.querySelector(".ModalGallery");

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modalCloseFunction();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const ModifierBtn = document.querySelector(".ModifierBtn");
  ModifierBtn.addEventListener("click", function () {
    modal.className = "modal";
  });
});

modalClose1.addEventListener("click", function () {
  modalCloseFunction();
});
modalClose2.addEventListener("click", function () {
  modalCloseFunction();
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

const deletedWork = (id) => {
  fetch("http://localhost:5678/api/works/" + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + JSON.parse(sessionStorage.getItem("token")),
    },
  }).then((reponse) => {
    console.log(reponse);
    getworks();
    getModalWorks();
  });
};

const modalContainer1 = document.getElementById("modalContainer1");
const modalContainer2 = document.getElementById("modalContainer2");
const AddPicture = document.querySelector(".AddPicture");
const ModalBack = document.getElementById("ModalBack");

AddPicture.addEventListener("click", () => {
  modalContainer1.className = "DisplayOff";
  modalContainer2.className = "modalContainer";
  ImgSelected.className = "DisplayOff";
  SelecteImg.className = "ModalAddFile";
  previewImage.src = "";
  ModalAddFile.value = "";
  ModalAddTitle.value = "";
  result.innerText = "";
  ModalValidate.className = "ModalValidate";
});

ModalBack.addEventListener("click", () => {
  modalContainer1.className = "modalContainer";
  modalContainer2.className = "DisplayOff";
});

const ModalAddFile = document.getElementById("ModalAddFile");
const ModalAddTitle = document.querySelector(".ModalAddTitle");
const ModalSelectedCategorie = document.querySelector(
  ".ModalSelectedCategorie"
);
const SelecteImg = document.getElementById("SelecteImg");
const ImgSelected = document.getElementById("ImgSelected");

ModalAddFile.addEventListener("change", (event) => {
  const selectedFile = event.target.files[0];

  if (selectedFile) {
    if (selectedFile.type.startsWith("image/")) {
      if (selectedFile.size <= 4 * 1024 * 1024) {
        const imageURL = URL.createObjectURL(selectedFile);
        SelecteImg.className = "DisplayOff";
        ImgSelected.className = "divImgSelected";
        previewImage.src = imageURL;
      } else {
        alert("La taille du fichier doit être inférieure ou égale à 4 Mo.");
        ModalAddFile.value = "";
      }
    } else {
      alert("Le fichier sélectionné n'est pas une image.");
      ModalAddFile.value = "";
    }
  } else {
    previewImage.src = "";
    ImgSelected.className = "DisplayOff";
    SelecteImg.className = "ModalAddFile";
  }
});

const dropdownButton = document.getElementById("result");

dropdownButton.addEventListener("click", function () {
  toggleDropdown();
});

window.onclick = function (event) {
  if (!event.target.matches(".ModalSelectedCategorie")) {
    var dropdowns = document.getElementsByClassName("ModalDropdownContent");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.style.display === "block") {
        openDropdown.style.display = "none";
      }
    }
  }
};

const getInputModalcategories = () => {
  fetch("http://localhost:5678/api/categories")
    .then((cat) => cat.json())
    .then((datacat) => {
      categories = datacat;
      createDropdownOptions();
    });
};

getInputModalcategories();

const optionchoice = document.querySelector("optionchoice");
const ModalValidate = document.querySelector(".ModalValidate");

function verifierValeurs(categoryId) {
  if (ModalAddFile.files.length === 0) {
    console.error("Veuillez sélectionner un fichier.");
    ModalValidate.className = "ModalValidate";
    return;
  }

  const titleValue = ModalAddTitle.value.trim();
  if (titleValue === "") {
    console.error("Veuillez entrer un titre.");
    ModalValidate.className = "ModalValidate";
    return;
  }

  const resultValue = ModalSelectedCategorie.textContent.trim();
  if (resultValue === "") {
    console.error("Veuillez sélectionner une catégorie.");
    ModalValidate.className = "ModalValidate";
    return;
  }

  console.log("Toutes les valeurs sont correctes.");
  ModalValidate.className = "ModalValidate ModalValidated";
  ModalValidate.id = "ModalValidated";
  const ModalValidated = document.getElementById("ModalValidated");
  console.log(ModalAddTitle.value);
  console.log(categoryId);

  if (ModalValidated) {
    ModalValidated.addEventListener("click", () => {
      console.log("j'ai cliquer sur validate");
      const AddElement = {
        id: 0,
        image: null,
        title: ModalAddTitle.value,
        category: categoryId,
        userId: 0,
      };

      const requestBody = JSON.stringify(AddElement);

      fetch("http://localhost:5678/api/works", {
        method: "POST",
        accept: "application/json",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization:
            "Bearer " + JSON.parse(sessionStorage.getItem("token")),
        },
        body: requestBody,
      })
        .then((response) => {
          console.log("Réponse de l'API:", response);
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error("Erreur lors de l'appel à l'API:", error);
        });
      modalCloseFunction();
    });
  }
}

ModalAddFile.addEventListener("input", verifierValeurs);
ModalAddTitle.addEventListener("input", verifierValeurs);
