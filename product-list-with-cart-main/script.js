const items = document.querySelector(".items");

const item = document.createElement("div");
let productPhotoDesktop = document.createElement("img");
let productPhotoTablet = document.createElement("img");
let productPhotoMobile = document.createElement("img");
let addButton = document.createElement("div");
addButton.classList.add(`button`);
addButton.classList.add(`card-button`);
let addBtn = null;

const counts = [];
const prices = [];
const thumbnails = [];
const cartItems = [];

let productDetails = document.createElement("div");
productDetails.classList.add("details");

const body = document.querySelector("body");
const cartIcon = document.querySelector(".cart-icon");
const cartContainer = document.querySelector(".cart-container");
const cartCancelButton = document.querySelector(".cancel-btn");
let itemImage, countSpan;

const toPay = 0;
const deleteItem = document.querySelector(".delete-item");
const totalPrice = document.querySelector(".total-price");
const yourCartQuantity = document.querySelector(".cart .heading span");
const uniqCount = document.querySelector(".uniq-count");
let uniqItem = 0;

const itemList = document.querySelector(".item-list");
const orderTotal = document.querySelector(".order-total");
const carbon = document.querySelector(".carbon");
const orderBtn = document.querySelector(".order-btn");

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
    addBtn = target;
  } else if (target.parentElement.classList.contains("card-button")) {
    addBtn = target.parentElement;
  }

  if (addBtn != null && addBtn) {
    let itemId = addBtn.id;
    console.log(itemId);
    addBtn.innerHTML = `
        <img id= ${itemId} src="./assets/images/icon-increment-quantity.svg" alt="add" />
        <span id="item-${itemId}">${++counts[itemId]}</span>
        <img id= ${itemId} src="./assets/images/icon-decrement-quantity.svg" alt="remove"/>
      `;

    addBtn.classList.add("selected-btn");
    addBtn.classList.remove("card-button");

    itemImage = addBtn.parentElement.children;
    itemImage[0].classList.add("selected");
    itemImage[1].classList.add("selected");
    itemImage[2].classList.add("selected");

    const name = addBtn.nextSibling.querySelector(".name").innerHTML;

    const card = createCartItem(
      itemId,
      thumbnails[itemId],
      name,
      counts[itemId],
      prices[itemId]
    );
    cartItems.push(card);
    itemList.appendChild(card.component);
    itemList.appendChild(card.separator);
    itemList.querySelector(".empty").classList.add("hide");
    itemList.querySelector(".message").classList.add("hide");

    uniqItem++;
    if (uniqItem > 0) uniqCount.innerHTML = uniqItem;
    yourCartQuantity.innerHTML = uniqItem;
    addBtn = null;
  }

  if (target.alt === "add") {
    countSpan = document.querySelector(`#item-${target.id}`);

    if (counts[target.id] + 1 <= 10) counts[target.id]++;
    countSpan.innerText = counts[target.id];
  }

  if (target.alt === "remove") {
    countSpan = document.querySelector(`#item-${target.id}`);
    console.dir(countSpan);
    if (counts[target.id] > 0) counts[target.id]--;

    if (counts[target.id] == 0) {
      if (uniqItem > 0) {
        uniqItem--;
        uniqCount.innerHTML = uniqItem;
        if (uniqItem == 0) uniqCount.innerHTML = "";
        yourCartQuantity.innerHTML = uniqItem;
      }

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

  if (target === deleteItem) {
    deleteItem.parentElement.remove();
  }

  if (cartItems.length > 0) {
    orderTotal.classList.add("show");
    orderBtn.classList.add("show");
    carbon.classList.add("show");
  }
});

function createCartItem(id, thumbnail, name, quantity, price) {
  const items = {
    id: null,
    component: null,
    separator: null,
  };

  const cartItem = document.createElement("div");
  cartItem.id = id;
  cartItem.classList.add("cart-item");
  cartItem.innerHTML = `

              <div class="item-details">
                <img
                  class="thumbnail"
                  src=${thumbnail}
                  alt="thumbnail"
                />
                <div class="item-info">
                  <p class="item-name">${name}</p>
                  <p class="item-price">
                    <span class="quantity">${quantity}x</span>
                    <span class="price">@${price}</span>
                    <span class="item-total">
                    $${(quantity * price).toFixed(2)}</span>
                  </p>
                </div>
              </div>

              <img
                id= ${id}
                class="delete-item"
                src="./assets/images/icon-remove-item.svg"
                alt="delete item button"
              />
  `;

  const separator = document.createElement("div");
  separator.id = id;
  separator.className = "separator";

  items.id = id;
  items.component = cartItem;
  items.separator = separator;

  return items;
}

fetch("./data.json")
  .then((response) => response.json())
  .then((data) =>
    data.forEach((desert, index) => {
      let price = desert.price.toFixed(2);
      counts.push(0);
      prices.push(price);
      thumbnails.push(`${desert.image.thumbnail}`);

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
