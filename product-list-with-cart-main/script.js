const items = document.querySelector(".items");
const item = document.createElement("div");
item.add;
item.className = "item";
fetch("./data.json")
  .then((response) => response.json())
  .then((data) =>
    data.forEach((desert, index) => {
      console.log(desert);
      console.log(index);
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
              
              <div class="button selected-btn" id = ${index}>
                <img id="add" src="./assets/images/icon-increment-quantity.svg" alt="add" />
                <span id="count-item">1</span>
                <img id="remove" src="./assets/images/icon-decrement-quantity.svg" alt="add" />
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

const cartIcon = document.querySelector(".cart-icon");
cartIcon.addEventListener("click", () => {
  console.dir(cartIcon);
});
