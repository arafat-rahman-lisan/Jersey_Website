const products = [
  {
    id: 1,
    name: "Argentina Player Edition Jersey",
    type: "Player",
    image: "img/argentina_player.png",
    price: 790,
    oldPrice: 1400,
    discount: "44% OFF",
    themeMain: "#285ccc",
    themeSoft: "#fff2bd",
    themeText: "#ffffff"
  },
  {
    id: 2,
    name: "Argentina Away Jersey",
    type: "Away",
    image: "img/argentina_away.png",
    price: 820,
    oldPrice: 1450,
    discount: "43% OFF",
    themeMain: "#e1ff51",
    themeSoft: "#00272c",
    themeText: "#00272c"
  },
  {
    id: 3,
    name: "Brazil Player Jersey",
    type: "Player",
    image: "img/brazil_player.png",
    price: 850,
    oldPrice: 1500,
    discount: "43% OFF",
    themeMain: "#f7b638",
    themeSoft: "#780115",
    themeText: "#00272c"
  },
  {
    id: 4,
    name: "Brazil Away Jersey",
    type: "Away",
    image: "img/brazil_away.png",
    price: 820,
    oldPrice: 1450,
    discount: "43% OFF",
    themeMain: "#e1ff51",
    themeSoft: "#00272c",
    themeText: "#00272c"
  },
  {
    id: 5,
    name: "France Home Jersey",
    type: "Home",
    image: "img/france.png",
    price: 790,
    oldPrice: 1390,
    discount: "43% OFF",
    themeMain: "#285ccc",
    themeSoft: "#fff2bd",
    themeText: "#ffffff"
  },
  {
    id: 6,
    name: "Germany Home Jersey",
    type: "Home",
    image: "img/germany.png",
    price: 760,
    oldPrice: 1350,
    discount: "44% OFF",
    themeMain: "#f7b638",
    themeSoft: "#780115",
    themeText: "#00272c"
  },
  {
    id: 7,
    name: "Portugal Home Jersey",
    type: "Home",
    image: "img/portugal.png",
    price: 820,
    oldPrice: 1450,
    discount: "43% OFF",
    themeMain: "#780115",
    themeSoft: "#f7b638",
    themeText: "#ffffff"
  },
  {
    id: 8,
    name: "Spain Home Jersey",
    type: "Home",
    image: "img/spain.png",
    price: 780,
    oldPrice: 1390,
    discount: "44% OFF",
    themeMain: "#fff2bd",
    themeSoft: "#285ccc",
    themeText: "#00272c"
  }
];

const sizes = ["S", "M", "L", "XL"];
const cart = [];

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const cartPanel = document.getElementById("cartPanel");
const overlay = document.getElementById("overlay");
const cartItems = document.getElementById("cartItems");
const emptyCart = document.getElementById("emptyCart");
const cartCount = document.getElementById("cartCount");
const mobileCartCount = document.getElementById("mobileCartCount");
const subtotal = document.getElementById("subtotal");
const shipping = document.getElementById("shipping");
const total = document.getElementById("total");
const checkoutButton = document.getElementById("checkoutButton");
const checkoutNote = document.getElementById("checkoutNote");
const detailPanel = document.getElementById("detailPanel");
const detailMedia = document.getElementById("detailMedia");
const detailGallery = document.getElementById("detailGallery");
const detailType = document.getElementById("detailType");
const detailTitle = document.getElementById("detailTitle");
const detailPrice = document.getElementById("detailPrice");
const detailText = document.getElementById("detailText");
const detailBuy = document.getElementById("detailBuy");
const detailAdd = document.getElementById("detailAdd");
const detailSizes = document.getElementById("detailSizes");
let activeDetailId = null;
let activeDetailSize = "M";

function money(value) {
  return `BDT ${value.toLocaleString("en-US")}`;
}

function renderProducts() {
  const search = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;

  const filtered = products.filter((product) => {
    const matchesCategory = category === "all" || product.type === category;
    const matchesSearch = [product.name, product.type].join(" ").toLowerCase().includes(search);
    return matchesCategory && matchesSearch;
  });

  productGrid.innerHTML = "";

  if (filtered.length === 0) {
    productGrid.innerHTML = '<div class="no-results">No jersey found.</div>';
    return;
  }

  filtered.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.style.setProperty("--theme-main", product.themeMain);
    card.style.setProperty("--theme-soft", product.themeSoft);
    card.style.setProperty("--theme-text", product.themeText);
    card.innerHTML = `
      <button class="product-media" type="button" data-id="${product.id}" aria-label="View details for ${product.name}">
        <img class="product-image" src="${product.image}" alt="${product.name}" loading="lazy">
        <span class="discount-badge">${product.discount}</span>
      </button>
      <div class="product-info">
        <div class="product-title">
          <h2>${product.name}</h2>
          <span>${product.type} jersey</span>
        </div>
        <div class="price-row">
          <strong class="price">${money(product.price)}</strong>
          <span class="old-price">${money(product.oldPrice)}</span>
        </div>
        <div class="size-row" aria-label="Choose size for ${product.name}">
          ${sizes.map((size, index) => `
            <label class="size-option">
              <input type="radio" name="size-${product.id}" value="${size}" ${index === 1 ? "checked" : ""}>
              <span>${size}</span>
            </label>
          `).join("")}
        </div>
        <div class="card-tools">
          <button class="details-button" type="button" data-id="${product.id}">DETAILS</button>
          <a class="chart-button" href="#sizeChart">SIZE CHART</a>
        </div>
        <div class="action-stack">
          <button class="buy-button" type="button" data-id="${product.id}">BUY NOW</button>
          <button class="add-button" type="button" data-id="${product.id}">ADD TO CART</button>
        </div>
      </div>
    `;
    productGrid.appendChild(card);
  });
}

function selectedSize(productId) {
  const selected = productGrid.querySelector(`input[name="size-${productId}"]:checked`);
  return selected ? selected.value : "M";
}

function syncProductSize(productId, size) {
  const input = productGrid.querySelector(`input[name="size-${productId}"][value="${size}"]`);
  if (input) input.checked = true;
}

function addToCart(productId, size) {
  const product = products.find((item) => item.id === productId);
  const existing = cart.find((item) => item.id === productId && item.size === size);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, size, quantity: 1 });
  }

  checkoutNote.textContent = "";
  renderCart();
}

function buyNow(productId, size) {
  addToCart(productId, size);
  closeDetails();
  openCart();
  checkoutNote.textContent = "Ready for checkout.";
}

function productById(productId) {
  return products.find((item) => item.id === productId);
}

function updateQuantity(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  checkoutNote.textContent = "";
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  checkoutNote.textContent = "";
  renderCart();
}

function renderCart() {
  cartItems.innerHTML = "";
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subTotalValue = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingValue = subTotalValue === 0 || subTotalValue >= 1500 ? 0 : 80;
  const totalValue = subTotalValue + shippingValue;

  emptyCart.style.display = cart.length ? "none" : "grid";
  checkoutButton.disabled = cart.length === 0;
  cartCount.textContent = itemCount;
  mobileCartCount.textContent = itemCount;
  subtotal.textContent = money(subTotalValue);
  shipping.textContent = shippingValue === 0 ? "Free" : money(shippingValue);
  total.textContent = money(totalValue);

  cart.forEach((item, index) => {
    const row = document.createElement("article");
    row.className = "cart-item";
    row.innerHTML = `
      <img class="cart-thumb" src="${item.image}" alt="">
      <div>
        <h3>${item.name}</h3>
        <p>Size ${item.size} - ${money(item.price)}</p>
        <div class="cart-row">
          <div class="quantity" aria-label="Quantity controls for ${item.name}">
            <button type="button" data-action="decrease" data-index="${index}" aria-label="Decrease quantity">-</button>
            <strong>${item.quantity}</strong>
            <button type="button" data-action="increase" data-index="${index}" aria-label="Increase quantity">+</button>
          </div>
          <button class="remove-button" type="button" data-action="remove" data-index="${index}">Remove</button>
        </div>
      </div>
    `;
    cartItems.appendChild(row);
  });
}

function openCart() {
  closeDetails();
  cartPanel.classList.add("open");
  overlay.classList.add("open");
  cartPanel.setAttribute("aria-hidden", "false");
}

function closeCart() {
  cartPanel.classList.remove("open");
  cartPanel.setAttribute("aria-hidden", "true");
  if (!detailPanel.classList.contains("open")) {
    overlay.classList.remove("open");
  }
}

function mediaItems(product) {
  const media = product.media && product.media.length ? product.media : [
    { type: "image", src: product.image, label: "Pic 1" },
    { type: "image", src: product.image, label: "Pic 2", placeholder: true },
    { type: "image", src: product.image, label: "GIF", placeholder: true },
    { type: "video", label: "Video", placeholder: true }
  ];

  return media;
}

function renderDetailMedia(product, media) {
  if (media && media.type === "video" && media.src) {
    detailMedia.innerHTML = `<video src="${media.src}" controls playsinline></video>`;
    return;
  }

  detailMedia.innerHTML = `<img src="${media && media.src ? media.src : product.image}" alt="${product.name}">`;
}

function renderDetailSizes(productId, selectedSizeValue) {
  activeDetailSize = selectedSizeValue || selectedSize(productId);
  detailSizes.innerHTML = `
    <a class="size-guide-link" href="#sizeChart">Size guide</a>
    ${sizes.map((size) => `
      <button class="detail-size ${size === activeDetailSize ? "active" : ""}" type="button" data-size="${size}">
        ${size}
      </button>
    `).join("")}
  `;
}

function openDetails(productId) {
  const product = productById(productId);
  activeDetailId = productId;

  detailPanel.style.setProperty("--detail-soft", product.themeSoft);
  detailType.textContent = `${product.type} jersey`;
  detailTitle.textContent = product.name;
  detailPrice.innerHTML = `<strong>${money(product.price)}</strong><span>${money(product.oldPrice)}</span>`;
  detailText.textContent = "Soft match-day fabric, clean fit, ready for daily wear.";
  renderDetailMedia(product, { type: "image", src: product.image });
  renderDetailSizes(productId, selectedSize(productId));

  detailGallery.innerHTML = mediaItems(product).map((media, index) => `
    <button class="gallery-item" type="button" data-type="${media.type}" data-src="${media.src || ""}">
      ${media.src && !media.placeholder ? `<img src="${media.src}" alt="${product.name}">` : (media.label || "Media")}
    </button>
  `).join("");

  detailPanel.classList.add("open");
  overlay.classList.add("open", "detail-open");
  detailPanel.setAttribute("aria-hidden", "false");
}

function closeDetails() {
  detailPanel.classList.remove("open");
  detailPanel.setAttribute("aria-hidden", "true");
  overlay.classList.remove("detail-open");
  activeDetailId = null;
  if (!cartPanel.classList.contains("open")) {
    overlay.classList.remove("open");
  }
}

productGrid.addEventListener("click", (event) => {
  const mediaButton = event.target.closest(".product-media");
  const detailsButton = event.target.closest(".details-button");
  const buyButton = event.target.closest(".buy-button");
  const addButton = event.target.closest(".add-button");
  const chartButton = event.target.closest(".chart-button");

  if (chartButton) return;

  if (detailsButton || (mediaButton && !buyButton && !addButton)) {
    const source = mediaButton || detailsButton;
    source.classList.remove("media-pop");
    void source.offsetWidth;
    source.classList.add("media-pop");
    window.setTimeout(() => openDetails(Number(source.dataset.id)), 180);
    return;
  }

  const button = buyButton || addButton;
  if (!button) return;

  const productId = Number(button.dataset.id);
  const size = selectedSize(productId);

  if (buyButton) {
    buyNow(productId, size);
    return;
  }

  addToCart(productId, size);
});

detailGallery.addEventListener("click", (event) => {
  const item = event.target.closest(".gallery-item");
  if (!item || activeDetailId === null) return;
  const product = productById(activeDetailId);
  renderDetailMedia(product, { type: item.dataset.type, src: item.dataset.src });
});

detailSizes.addEventListener("click", (event) => {
  if (event.target.closest(".size-guide-link")) {
    closeDetails();
    return;
  }

  const button = event.target.closest(".detail-size");
  if (!button || activeDetailId === null) return;
  activeDetailSize = button.dataset.size;
  syncProductSize(activeDetailId, activeDetailSize);
  renderDetailSizes(activeDetailId, activeDetailSize);
});

cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  const index = Number(button.dataset.index);
  if (button.dataset.action === "increase") updateQuantity(index, 1);
  if (button.dataset.action === "decrease") updateQuantity(index, -1);
  if (button.dataset.action === "remove") removeItem(index);
});

document.getElementById("openCart").addEventListener("click", openCart);
document.getElementById("mobileCart").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
document.getElementById("closeDetails").addEventListener("click", closeDetails);
detailBuy.addEventListener("click", () => {
  if (activeDetailId === null) return;
  buyNow(activeDetailId, activeDetailSize);
});
detailAdd.addEventListener("click", () => {
  if (activeDetailId === null) return;
  addToCart(activeDetailId, activeDetailSize);
  checkoutNote.textContent = "Added to cart.";
});
overlay.addEventListener("click", () => {
  if (detailPanel.classList.contains("open")) {
    closeDetails();
    return;
  }
  closeCart();
});
searchInput.addEventListener("input", renderProducts);
categoryFilter.addEventListener("change", renderProducts);

checkoutButton.addEventListener("click", () => {
  if (cart.length === 0) return;
  checkoutNote.textContent = "Order ready. Add payment or WhatsApp next.";
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeDetails();
    closeCart();
  }
});

document.querySelector(".newsletter").addEventListener("submit", (event) => {
  event.preventDefault();
});

renderProducts();
renderCart();
