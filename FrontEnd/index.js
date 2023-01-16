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
//------------------filter sort------------------//

//------------------work returns------------------//

const dataWorks = async () => {
  const urlWorks = `http://localhost:5678/api/works`;
  const resWorks = await fetch(urlWorks);
  const dataWorks = await resWorks.json();
  dataWorks.forEach((image) => {
    const template = `<figure>
            <img crossorigin="anonymous" src="${image.imageUrl}" alt="${image.title}" />
            <figcaption>${image.title}</figcaption>
          </figure>`;
    gallery.innerHTML += template;
  });
};
dataWorks();

//------------------filtre send------------------//

//------------------filtre delete------------------//
