//------------------send confirm------------------//

const validate = document.getElementById("sendMessage");
validate.addEventListener("click", () => alert("Message envoyer"));

const refresh = document.getElementById("refresh");
refresh.addEventListener("click", () => {
  gallery.innerHTML = "";
  window.location.reload();
});
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
  console.log(dataWorks);
  dataWorks.forEach((image) => {
    const template = `<figure class="imageCard" data-category="${image.categoryId}">
    <img crossorigin="anonymous" src="${image.imageUrl}" alt="${image.title}" />
    <figcaption>${image.title}</figcaption>
    </figure>`;
    gallery.innerHTML += template;
    const modalImg = `<figure class="imageCard" data-category="${image.categoryId}">
    <img crossorigin="anonymous" src="${image.imageUrl}" alt="${image.title}" />  
    <figcaption>éditer <i class="fa-regular fa-trash-can"></i></figcaption>
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
    close.addEventListener("click", function () {
      const imageUpload = formAdd.querySelector(".image-preview");
      modal.style.display = "none";
      logoSup.style.display = "flex";
      addPreview.style.display = "flex";
      backModal();
      if (imageUpload) imageUpload.remove();
    });
  });
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
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

const validateBtn = () => {
  if (
    modalImage.value.lenght > 0 &&
    modalCategory.value.lenght > 0 &&
    modalTitle.value.lenght > 0
  ) {
    formValid.style.background = "#1D6154";
  } else {
    formValid.style.background = "#A7A7A7";
  }
};
validateBtn();

//------------------add modal------------------//
modalImage.addEventListener("change", function () {
  console.log(modalImage.files[0]);
});
formAdd.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    image: modalImage.files[0],
    title: modalTitle.value,
    category: modalCategory.value,
  };
  console.log(data);
  fetch(`http://localhost:5678/api/works`, {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: "Bearer" + localStorage.token,
      "content-type": " multipart/form-data",
    },
    body: data,
  });
});

//------------------delete modal------------------//

modalGallery.addEventListener("click", (e) => {
  console.log(e.target.parentElement);
  const imageCard = formAdd.querySelectorAll(".imageCard");
  const index = imageCard.dataset.id;
  console.log(index);
  if (e.target.className === "btn-delete") {
    const indexCard = parseInt(e.target.parentElement.getAttribute("index"));
    const modalCard = e.target.parentElement;
    deleteData(modalCard, indexCard);
  }
});
