const items = document.querySelector(".items");
const item = document.createElement("div");

fetch("./data.json")
  .then((response) => response.json())
  .then((data) =>
    data.forEach((desert, index) => {
      console.log(data);
      let price = desert.price.toFixed(2);
      const item = document.createElement("div");
      item.className = `item`;
      item.id = `${index}`;
      item.innerHTML = `
              <img
                class="product-photo desktop"
                src= ${desert.image.desktop}
                alt="product photo"
              />
              <img
                class="product-photo mobile"
                src=${desert.image.mobile}
                alt="product photo"
              />
              <div class="button card-button" id = ${index}>
                <img src="./assets/images/icon-add-to-cart.svg" alt="icon" />
                <span>Add to cart</span>
              </div>

              <div class="details">
                <p class="category">${desert.category}</p>
                <p class="name">${desert.name}</p>
                <p class="price">$${price}</p>
              </div>
      `;

      items.appendChild(item);
    })
  );

const body = document.querySelector("body");
const cartIcon = document.querySelector(".cart-icon");
const cartContainer = document.querySelector(".cart-container");
const cartCancelButton = document.querySelector(".cancel-btn");

let counts = [0, 0, 0, 0, 0, 0, 0, 0, 0];

body.addEventListener("click", (e) => {
  const target = e.target;
  console.dir(target);
  console.dir(target.parentElement);

  if (target === cartIcon || target.parentElement === cartIcon) {
    cartContainer.classList.add("show-container");
  }

  if (
    target === cartCancelButton ||
    target.parentElement === cartCancelButton ||
    target === cartContainer
  ) {
    cartContainer.classList.remove("show-container");
  }

  let addButton;

  if (target.classList.contains("card-button")) {
    addButton = target;
  } else if (target.parentElement.classList.contains("card-button"))
    addButton = target.parentElement;

  if (addButton != null && addButton) {
    console.dir(target);
    const id = target.parentElement.id;
    counts[id]++;

    addButton.innerHTML = `
        <img id="add" src="./assets/images/icon-increment-quantity.svg" alt="add" />
        <span id="count-item">${counts[id]}</span>
        <img id="remove" src="./assets/images/icon-decrement-quantity.svg" alt="add" />
      `;

    addButton.classList.add("selected-btn");
    addButton.classList.remove("card-button");
  }
});

cartIcon.addEventListener("click", (e) => {
  console.log(e);
});
cartCancelButton.addEventListener("click", (e) => {
  console.log(e);
});

// const cardButton = document.querySelector("");
// const itemsArray = [];
// cardButton.addEventListener("click", (e) => {
//   let count = 0;
//   console.dir(e);
//   //cardButton.parentNode

//   cardButton.classList.add(selected - btn);
//   cardButton.classList.remove(card - button);
//   cardButton.innerHTML = `
//     <img id="add" src="./assets/images/icon-increment-quantity.svg" alt="add" />
//     <span id="count-item">${item}</span>
//     <img id="remove" src="./assets/images/icon-decrement-quantity.svg" alt="add" />
//   `;
// });
