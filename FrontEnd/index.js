let token = localStorage.getItem("token");
//------------------send confirm------------------//

const validate = document.getElementById("sendMessage");
validate.addEventListener("click", () => alert("Message envoyer"));

// const refresh = document.getElementById("refresh");
// refresh.addEventListener("click", () => {
//   gallery.innerHTML = "";
//   modalGallery.innerHTML = "";
//   dataWorks();
// });
//------------------filtre + sort------------------//

const portfolio = document.querySelector("#portfolio");
const gallery = document.querySelector(".gallery");
const divFilter = document.createElement("div");
divFilter.classList.add("allFilter");
portfolio.insertBefore(divFilter, gallery);

const dataFilter = async () => {
  const urlFilter = `http://localhost:5678/api/categories`;
  const resFilter = await fetch(urlFilter);
  const dataFilter = await resFilter.json();
  const button = createFilter("button", ["filter"], "Tous");
  dataFilter.forEach((category) => {
    createFilter("button", ["filter"], category.name);
  });
};
dataFilter();

const createFilter = (div, classAdd = [], content) => {
  let filter = document.createElement(div);
  classAdd.forEach((filterClass) => {
    filter.classList.add(filterClass);
  });
  filter.textContent = content;
  divFilter.append(filter);
  //------------------sort------------------//
  const filterList = document.querySelectorAll(".filter");
  filterList.forEach((filterCategory, index) => {
    filterCategory.addEventListener("click", function () {
      let imageSort = document.querySelectorAll(".imageCard");
      for (let imageCard of imageSort) {
        imageCard.style.display = "none";
        if (index === 0 || index == imageCard.dataset.category) {
          imageCard.style.display = "block";
        }
      }
    });
  });
};
// voir avec filter
//splice
//------------------work returns------------------//

const dataWorks = async () => {
  const urlWorks = `http://localhost:5678/api/works`;
  const resWorks = await fetch(urlWorks);
  const dataWorks = await resWorks.json();
  dataWorks.forEach((image) => {
    const template = `<figure class="imageCard" data-category="${image.categoryId}">
    <img crossorigin="anonymous" src="${image.imageUrl}" alt="${image.title}" />
    <figcaption>${image.title}</figcaption>
    </figure>`;
    gallery.innerHTML += template;
    const modalImg = `<figure class="imageCard" data-category="${image.categoryId}">
    <img crossorigin="anonymous" src="${image.imageUrl}" alt="${image.title}" />  
    <figcaption>éditer <i id="${image.id}" class="fa-regular fa-trash-can"></i></figcaption>
    </figure>`;
    modalGallery.innerHTML += modalImg;
  });
};
dataWorks();

//------------------amdmin connect------------------//

const logOut = document.querySelector(".login");
const userEdition = async () => {
  const classLogOff = document.querySelectorAll(".logOff");
  const classFilter = document.querySelector(".allFilter");
  const h2Project = document.getElementById("project");
  const logOn = localStorage.getItem("id");
  if (logOn == 1) {
    h2Project.style.marginBottom = "100px";
    logOut.innerHTML = `<a href="#">Logout</a>`;
    classLogOff.forEach((el) => {
      el.classList.remove("logOff");
    });
    classFilter.style.display = "none";
  }
};
userEdition();

//------------------log out------------------//

logOut.addEventListener("click", () => {
  localStorage.setItem("id", "token");
  localStorage.clear();
  window.location.reload();
});

//------------------open - close modal------------------//
const openModal = async () => {
  const open = document.querySelectorAll(".modif");
  const modal = document.getElementById("section-modal");
  const close = document.querySelector(".fa-xmark");
  open.forEach((classOpen) => {
    classOpen.addEventListener("click", function () {
      modal.style.display = "flex";
    });
  });
  close.addEventListener("click", function () {
    const imageUpload = formAdd.querySelector(".image-preview");
    modal.style.display = "none";
    logoSup.style.display = "flex";
    addPreview.style.display = "flex";
    backModal();
    if (imageUpload) imageUpload.remove();
  });
  window.onclick = function (event) {
    const imageUpload = formAdd.querySelector(".image-preview");
    if (event.target == modal) {
      modal.style.display = "none";
      logoSup.style.display = "flex";
      addPreview.style.display = "flex";
      backModal();
      if (imageUpload) imageUpload.remove();
    }
  };
};
openModal();

//------------------modal style------------------//

const addModal = document.querySelector(".line-up");
const deleteAll = document.querySelector(".delete-galery");
const title = document.querySelector(".change-title");
const back = document.querySelector(".fa-arrow-left-long");
const modalGallery = document.querySelector(".modal-galery");
const formAdd = document.querySelector(".form-add");
const validateImg = document.querySelector(".validate-image");

const addPreview = formAdd.querySelector(".label-add");

addModal.addEventListener("click", () => {
  modalGallery.style.display = "none";
  deleteAll.style.display = "none";
  title.innerHTML = `Ajout photo`;
  back.style.visibility = "visible";
  formAdd.style.display = "flex";
  addModal.style.display = "none";
  validateImg.style.display = "block";
});

function backModal() {
  addModal.style.display = "block";
  formAdd.style.display = "none";
  title.innerHTML = `Galerie photo`;
  modalGallery.style.display = "flex";
  deleteAll.style.display = "block";
  back.style.visibility = "hidden";
  validateImg.style.display = "none";
}
back.addEventListener("click", backModal);

const formModal = document.getElementById("section-modal");
const modalTitle = formModal.querySelector("#add-title");
const modalImage = formModal.querySelector("#add-image");
const modalCategory = formModal.querySelector("#add-category");
const categoryCheck = modalCategory.querySelector("option:checked");
const formValid = document.querySelector(".validate-image");
const previewImg = formAdd.querySelector(".upload");
const logoSup = formAdd.querySelector(".fa-image");

function updateImageDisplay() {
  logoSup.style.display = "none";
  addPreview.style.display = "none";
  var curFiles = modalImage.files;
  for (var i = 0; i < curFiles.length; i++) {
    var image = document.createElement("img");
    image.src = window.URL.createObjectURL(curFiles[i]);
    previewImg.appendChild(image);
    image.classList.add("image-preview");
  }
}
modalImage.addEventListener("change", updateImageDisplay);

function validateBtn() {
  if (modalImage.value == null && modalTitle.value == null) {
    formValid.style.background = "#1D6154";
  }
}

modalTitle.addEventListener("change", validateBtn);
modalImage.addEventListener("change", validateBtn);

//------------------add modal------------------//
formAdd.addEventListener("submit", (e) => {
  e.preventDefault();
  let data = new FormData();
  data.append("image", modalImage.files[0]);
  data.append("title", modalTitle.value);
  data.append("category", modalCategory.value);
  if (!modalImage.value && !modalImage.value) {
    alert("Veuillez remplir tout le formulaire");
  }
  console.log(data);
  fetch(`http://localhost:5678/api/works`, {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });
});

//------------------delete modal------------------//
// const deleteIMG = formAdd.querySelectorAll(".fa-trash-can");
// deleteIMG.forEach((e) => {
//   for (var i = 0; i < modalGallery.length; i++) console.log(deleteIMG[i].id);
// });
modalGallery.addEventListener("click", function (e) {
  console.log(e.target.id);
  function confirmer() {
    var res = confirm("etes-vous de vouloir supprimer ?");
    if (res) {
      fetch("http://localhost:5678/api/works/" + e.target.id, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "*/*",
        },
      });
    }
  }
  confirmer();
});

const allDelete = async () => {
  const urlWorks = `http://localhost:5678/api/works`;
  const resWorks = await fetch(urlWorks);
  const dataWorks = await resWorks.json();
  for (var i = 0; i < dataWorks.length; i++)
    //  console.log(dataWorks[i].id);
    allID = dataWorks[i].id;
  console.log(allID);
  function confirmerAll() {
    var res = confirm("etes-vous de vouloir supprimer toute la galerie ?");
    if (res) {
      function deleteIDall() {
        fetch("http://localhost:5678/api/works/" + allID, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "*/*",
          },
        });
      }
    }
    deleteIDall() * 10;
  }
  confirmerAll();
};

deleteAll.addEventListener("click", allDelete);
