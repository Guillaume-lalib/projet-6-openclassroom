//------------------send confirm------------------//

const validate = document.getElementById("sendMessage");
validate.addEventListener("click", () => alert("Message envoyer"));

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
