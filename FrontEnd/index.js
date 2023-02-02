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
const button = createFilter("button", ["filter"], "Tous");
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
    <img crossorigin="anonymous" src="${image.imageUrl}" alt="${image.title}" />  <div class="delete">
            <i class="fa-regular fa-trash-can"></i>
          </div>
    <figcaption>éditer</figcaption>
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
      modal.style.display = "none";
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
back.addEventListener("click", () => {
  addModal.style.display = "block";
  formAdd.style.display = "none";
  title.innerHTML = `Galerie photo`;
  modalGallery.style.display = "flex";
  deleteAll.style.display = "block";
  back.style.visibility = "hidden";
  validateImg.style.display = "none";
});

const formModal = document.getElementById("section-modal");
const modalTitle = formModal.querySelector("#add-title");
const modalImage = formModal.querySelector("#add-image");
const modalCategory = formModal.querySelector("#add-category");
const categoryCheck = modalCategory.querySelector("option:checked");
const formValid = document.querySelector(".validate-image");
const previewImg = formAdd.querySelector(".upload");
console.log(modalImage);

function updateImageDisplay() {
  while (previewImg.firstChild) {
    previewImg.removeChild(previewImg.firstChild);
  }
  var curFiles = modalImage.files;
  for (var i = 0; i < curFiles.length; i++) {
    var image = document.createElement("img");
    image.src = window.URL.createObjectURL(curFiles[i]);
    console.log(image.src);
    previewImg.appendChild(image);
    image.classList.add("image-preview");
  }
}
modalImage.addEventListener("change", updateImageDisplay);

// const validateBtn = () => {
//   if (
//     !modalImage.value == null ||
//     !modalTitle.value == 0 ||
//     !modalTitle.value == null
//   ) {
//     formValid.style.background = "#1D6154";
//   } else {
//     formValid.style.background = "#A7A7A7";
//   }
// };
// validateBtn();

//------------------add modal------------------//
formAdd.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData();
  data.append("imageUrl", modalImage.files);
  data.append("title", modalTitle.value);
  data.append("category", formValid.value);
  fetch(`http://localhost:5678/api/works`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.token,
      accept: "application/json",
      // "content-type": "multipart/form-data",
    },
    body: data,
  })
    .then(() => {
      fetch(`http://localhost:5678/api/works`).then((value) => {
        if (value.ok) {
          return value.json();
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

//------------------delete modal------------------//
// const testID = async () => {
//   const urlWorks = `http://localhost:5678/api/works/`;
//   const resWorks = await fetch(urlWorks);
//   const dataWorks = await resWorks.json();
//   const deleteBtn = document.querySelectorAll(".delete");
//   console.log(deleteBtn);
//   for (let i = 0; i < dataWorks.length; i++) console.log(dataWorks[i].id);
//   console.log(dataWorks);
// };
// testID();
// const testApi = async () => {
//   const urlWorks = `http://localhost:5678/api/works`;
//   const resWorks = await fetch(urlWorks);
//   const data = await resWorks.json();
//   for (let i = 0; i < data.length; i++) console.log(data[i].id);
//   const deleteBtn = document
//     .querySelectorAll(".delete")
//     .getAttribute("data[i].id");
//   // var deleteID = deleteBtn.getAttribute("data[i].id");
//   console.log(deleteBtn);
//   // console.log(deleteID);
// };
// testApi();

// const Delete = async (id) => {
//   fetch("http://localhost:5678/api/works" + id, {
//     method: "DELETE",
//     headers: {
//       "content-type": "application/json",
//       Authorization: "Bearer " + localStorage.token,
//     },
//   });
//   modalDelete();
// };
// function modalDelete() {}
