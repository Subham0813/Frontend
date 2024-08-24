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
let itemImage, countSpan, itemInfo;

let toPay = 0;
const totalPrice = document.querySelector(".total-price");
const yourCart = document.querySelector(".cart .heading span");
const uniqCount = document.querySelector(".uniq-count");
let totalItem = 0;

const itemList = document.querySelector(".item-list");
const orderTotal = document.querySelector(".order-total");
const carbon = document.querySelector(".carbon");
const confirmOrder = document.querySelector(".order-btn");

document.addEventListener("click", (e) => {
  const target = e.target;

  // console.dir(target);
  // console.dir(target.parentElement.parentElement);

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
    let id = addBtn.id;
    addBtn.innerHTML = `
        <img id= ${id} src="./assets/images/icon-increment-quantity.svg" alt="add" />
        <span id="item-${id}">${++counts[id]}</span>
        <img id= ${id} src="./assets/images/icon-decrement-quantity.svg" alt="remove"/>
      `;

    addBtn.classList.add("selected-btn");
    addBtn.classList.remove("card-button");

    itemImage = addBtn.parentElement.children;
    itemImage[0].classList.add("selected");
    itemImage[1].classList.add("selected");
    itemImage[2].classList.add("selected");

    const name = addBtn.nextSibling.querySelector(".name").innerHTML;
    const card = createCartItem(
      id,
      thumbnails[id],
      name,
      counts[id],
      prices[id]
    );

    if (cartItems[id] == null) {
      cartItems[id] = card;
      itemList.appendChild(card.component);
    }

    totalItem++;
    if (totalItem > 0) uniqCount.innerHTML = totalItem;
    yourCart.innerHTML = totalItem;
    addBtn = null;

    itemInfo =
      cartItems[id].component.children[0].children[1].children[1].children;
    itemInfo[0].innerText = `${counts[id]}x`;
    itemInfo[2].innerText = `${(prices[id] * counts[id]).toFixed(2)}`;

    toPay += parseFloat(prices[id]);
  }

  if (target.alt === "add") {
    const id = target.id;
    countSpan = document.querySelector(`#item-${id}`);

    if (counts[id] + 1 <= 10) {
      counts[id]++;
      totalItem++;
    }
    if (counts[id] == 10) {
      countSpan.innerText = `${counts[id]} (max)`;
      target.classList.add("hide");
    } else countSpan.innerText = counts[id];

    uniqCount.innerHTML = totalItem;
    yourCart.innerHTML = totalItem;

    itemInfo =
      cartItems[id].component.children[0].children[1].children[1].children;
    itemInfo[0].innerText = `${counts[id]}x`;
    itemInfo[2].innerText = `${(prices[id] * counts[id]).toFixed(2)}`;

    toPay += parseFloat(prices[id]);
  }

  if (target.alt === "remove") {
    const id = target.id;
    countSpan = document.querySelector(`#item-${id}`);
    itemInfo =
      cartItems[id].component.children[0].children[1].children[1].children;
    if (counts[id] > 0) {
      counts[id]--;
      totalItem--;
      itemInfo[0].innerText = `${counts[id]}x`;
      itemInfo[2].innerText = `${(prices[id] * counts[id]).toFixed(2)}`;
    }

    if (
      counts[id] < 10 &&
      countSpan.parentElement.children[0].classList.contains("hide")
    ) {
      countSpan.parentElement.children[0].classList.add("show");
      countSpan.parentElement.children[0].classList.remove("hide");
    }

    yourCart.innerHTML = totalItem;
    if (totalItem > 0) {
      uniqCount.innerHTML = totalItem;
    } else uniqCount.innerHTML = "";

    if (counts[id] == 0) {
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
      cartItems[id] = null;

      const children = itemList.children;
      for (let i = 0; i < children.length; i++) {
        if (children[i].id == id) {
          itemList.removeChild(children[i]);
        }
      }
    } else countSpan.innerText = counts[id];

    toPay -= parseFloat(prices[id]);

    if (toPay < 0) toPay = 0.0;
  }

  if (target.classList.contains("delete-item")) {
    const id = target.id;
    let children = itemList.children;
    for (let i = 0; i < children.length; i++) {
      if (children[i].id == id) {
        itemList.removeChild(children[i]);
      }
    }
    toPay -= parseFloat(counts[id] * prices[id]);
    counts[id] = 0;

    cartItems.forEach((card) => {
      if (card?.component?.id === id) cartItems[id] = null;
    });

    children = items.children;
    for (let i = 0; i < children.length; i++) {
      if (children[i].id === id) {
        const button = children[i].querySelector(".button");
        button.classList.add("card-button");
        button.classList.remove("selected-btn");
        button.innerHTML = `
          <img src="./assets/images/icon-add-to-cart.svg" alt="icon" />
          <span>Add to cart</span>
        `;
        itemImage = button.parentElement.children;
        itemImage[0].classList.remove("selected");
        itemImage[1].classList.remove("selected");
        itemImage[2].classList.remove("selected");
      }
    }

    console.log(cartItems);
  }

  if (cartItems.some((Element) => Element)) {
    totalPrice.innerText = toPay.toFixed(2);
    orderTotal.classList.add("show");
    confirmOrder.classList.add("show");
    carbon.classList.add("show");
    itemList.querySelector(".empty").classList.add("default");
    itemList.querySelector(".message").classList.add("default");
  } else {
    orderTotal.classList.remove("show");
    confirmOrder.classList.remove("show");
    carbon.classList.remove("show");
    itemList.querySelector(".empty").classList.remove("default");
    itemList.querySelector(".message").classList.remove("default");
  }
});

function createCartItem(id, thumbnail, name, quantity, price) {
  const items = {
    component: null,
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

  items.component = cartItem;

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
      cartItems.push(null);

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
