const items = document.querySelector(".items");

const item = document.createElement("div");
let productPhotoDesktop = document.createElement("img");
let productPhotoTablet = document.createElement("img");
let productPhotoMobile = document.createElement("img");
let addButton = document.createElement("div");
addButton.classList.add(`button`);
addButton.classList.add(`card-button`);

let productDetails = document.createElement("div");
productDetails.classList.add("details");

fetch("./data.json")
  .then((response) => response.json())
  .then((data) =>
    data.forEach((desert, index) => {
      let price = desert.price.toFixed(2);
      item.className = `item`;
      item.id = `${index}`;

      productPhotoDesktop.classList.add("product-photo");
      productPhotoDesktop.classList.add("desktop");
      productPhotoDesktop.src = `${desert.image.desktop}`;
      productPhotoDesktop.alt = `${desert.name} photo`;

      productPhotoTablet.classList.add("product-photo");
      productPhotoTablet.classList.add("tablet");
      productPhotoTablet.src = `${desert.image.tablet}`;
      productPhotoTablet.alt = `${desert.name} photo`;

      productPhotoMobile.classList.add("product-photo");
      productPhotoMobile.classList.add("mobile");
      productPhotoMobile.src = `${desert.image.mobile}`;
      productPhotoMobile.alt = `${desert.name} photo`;

      addButton.id = `${index}`;
      addButton.innerHTML = `
        <img src="./assets/images/icon-add-to-cart.svg" alt="icon" />
        <span>Add to cart</span>
      `;

      productDetails.innerHTML = `
        <p class="category">${desert.category}</p>
        <p class="name">${desert.name}</p>
        <p class="price">$${price}</p>
      `;

      item.appendChild(productPhotoDesktop);
      item.appendChild(productPhotoTablet);
      item.appendChild(productPhotoMobile);
      item.appendChild(addButton);
      item.appendChild(productDetails);

      items.appendChild(item.cloneNode(item));
    })
  );

const body = document.querySelector("body");
const cartIcon = document.querySelector(".cart-icon");
const cartContainer = document.querySelector(".cart-container");
const cartCancelButton = document.querySelector(".cancel-btn");

let counts = [1, 1, 1, 1, 1, 1, 1, 1, 1];
let itemImage;
let incBtn, decBtn, countSpan;

document.addEventListener("click", (e) => {
  const target = e.target;
  console.log(counts);
  // console.dir(target);
  // console.dir(target.parentElement);

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

  if (target.classList.contains("card-button")) {
    addButton = target;
  } else if (target.parentElement.classList.contains("card-button"))
    addButton = target.parentElement;

  if (addButton != null && addButton) {
    let itemId = addButton.id;
    console.log(itemId);
    addButton.innerHTML = `
        <img id= ${itemId} src="./assets/images/icon-increment-quantity.svg" alt="add" />
        <span id="item-${itemId}">1</span>
        <img id= ${itemId} src="./assets/images/icon-decrement-quantity.svg" alt="remove"/>
      `;

    addButton.classList.add("selected-btn");
    addButton.classList.remove("card-button");
    itemImage = addButton.parentElement.children;
    itemImage[0].classList.add("selected");
    itemImage[1].classList.add("selected");
    itemImage[2].classList.add("selected");
    addButton = null;
  }

  if (target.alt === "add") {
    countSpan = document.querySelector(`#item-${target.id}`);

    console.dir(countSpan);

    if (counts[target.id] + 1 <= 10) counts[target.id]++;
    countSpan.innerText = counts[target.id];
  }

  if (target.alt === "remove") {
    countSpan = document.querySelector(`#item-${target.id}`);
    console.dir(countSpan);
    if (counts[target.id] > 0) counts[target.id]--;

    if (counts[target.id] == 0) {
      console.log(counts[target.id]);
      console.log(countSpan.parentElement);

      countSpan.parentElement.classList.remove("selected-btn");
      countSpan.parentElement.classList.add("card-button");
      itemImage = countSpan.parentElement.parentElement.children;
      itemImage[0].classList.remove("selected");
      itemImage[1].classList.remove("selected");
      itemImage[2].classList.remove("selected");

      countSpan.parentElement.innerHTML = `
        <img src="./assets/images/icon-add-to-cart.svg" alt="icon" />
        <span>Add to cart</span>
        `;
    } else countSpan.innerText = counts[target.id];
  }
});

cartIcon.addEventListener("click", (e) => {
  console.log(e);
});
cartCancelButton.addEventListener("click", (e) => {
  console.log(e);
});

function addedToCart(id, thumbnail, name, quantity, price) {
  const container = document.createElement("div");
  container.id = this.id;
  container.innerHTML = `
  `;
}
