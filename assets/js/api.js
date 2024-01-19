let Works = [];

const getworks = () => {
  fetch("http://localhost:5678/api/works/")
    .then((res) => res.json())
    .then((data) => {
      Works = data;
      displayworks();
      displayModalworks();
    });
};

let categories = [];

const getcategories = () => {
  fetch("http://localhost:5678/api/categories")
    .then((cat) => cat.json())
    .then((datacat) => {
      categories = datacat;
      if (isLogin()) {
        createDropdownOptions();
      } else {
        createInputElements();
      }
    });
};
const addworksApi = (formData) => {
  fetch("http://localhost:5678/api/works", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: "Bearer " + JSON.parse(sessionStorage.getItem("token")),
    },
  })
    .then((response) => {
      console.log("Réponse de l'API:", response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      modalCloseFunction();
      getworks();
    })
    .catch((error) => {
      console.error("Erreur lors de l'appel à l'API:", error);
    });
};

const deletedWork = (id) => {
  fetch("http://localhost:5678/api/works/" + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + JSON.parse(sessionStorage.getItem("token")),
    },
  }).then((reponse) => {
    console.log(reponse);
    getworks();
  });
};
