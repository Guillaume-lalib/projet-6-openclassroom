const validate = document.getElementById("sendMessage");
validate.addEventListener("click", () => alert("Message envoyer"));

//------------------filtre------------------//

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
};

const button = createFilter("button", ["filter"], "Tous");

//------------------work returns------------------//

fetch("http://localhost:5678/api/works")
  .then((resWork) => resWork.json())
  .then((resWork) => {
    console.log(resWork);
  });

//------------------filtre send------------------//

//------------------filtre delete------------------//
