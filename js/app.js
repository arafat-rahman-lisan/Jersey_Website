```javascript
/* ===================================
   CART SYSTEM
=================================== */

let cart = JSON.parse(
localStorage.getItem("cart")
) || [];

const cartBadge =
document.querySelectorAll(".badge")[1];

function updateCartCount(){

    if(cartBadge){

        cartBadge.textContent =
        cart.length;
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
}

updateCartCount();


/* ===================================
   ADD TO CART
=================================== */

const cartButtons =
document.querySelectorAll(".cart-btn");

cartButtons.forEach(button => {

    button.addEventListener(
        "click",
        function(){

            const productCard =
            this.closest(".product-card");

            const productName =
            productCard.querySelector("h3")
            .innerText;

            const productPrice =
            productCard.querySelector(".new-price")
            .innerText;

            const productImage =
            productCard.querySelector("img")
            .src;

            const product = {

                name: productName,
                price: productPrice,
                image: productImage
            };

            cart.push(product);

            updateCartCount();

            alert(
                productName +
                " added to cart!"
            );

        }
    );

});


/* ===================================
   CART DRAWER
=================================== */

const cartIcon =
document.querySelector(
".fa-cart-shopping"
);

const cartDrawer =
document.querySelector(
".cart-drawer"
);

const closeCart =
document.querySelector(
".close-cart"
);

if(cartIcon){

cartIcon.addEventListener(
"click",
()=>{

cartDrawer.classList.add(
"active"
);

renderCart();

});

}

if(closeCart){

closeCart.addEventListener(
"click",
()=>{

cartDrawer.classList.remove(
"active"
);

});

}


/* ===================================
   RENDER CART
=================================== */

function renderCart(){

const cartItems =
document.querySelector(
".cart-items"
);

const totalText =
document.querySelector(
".cart-footer h3"
);

if(!cartItems) return;

cartItems.innerHTML = "";

let total = 0;

cart.forEach((item,index)=>{

let price =
parseInt(
item.price.replace(/[^\d]/g,"")
);

total += price;

cartItems.innerHTML += `

<div class="cart-product">

<img src="${item.image}">

<div>

<h4>${item.name}</h4>

<p>${item.price}</p>

</div>

<button
class="remove-btn"
onclick="removeCartItem(${index})"
>

×

</button>

</div>

`;

});

totalText.innerHTML =
`Total: ৳${total}`;

}


/* ===================================
   REMOVE ITEM
=================================== */

function removeCartItem(index){

cart.splice(index,1);

updateCartCount();

renderCart();

}


/* ===================================
   QUICK VIEW MODAL
=================================== */

const modal =
document.querySelector(
".quick-view-modal"
);

const closeModal =
document.querySelector(
".close-modal"
);

const viewButtons =
document.querySelectorAll(
".product-actions button:last-child"
);

viewButtons.forEach(btn=>{

btn.addEventListener(
"click",
function(){

const card =
this.closest(
".product-card"
);

const img =
card.querySelector("img").src;

const title =
card.querySelector("h3").innerText;

const price =
card.querySelector(
".new-price"
).innerText;

modal.querySelector("img")
.src = img;

modal.querySelector("h2")
.innerText = title;

modal.querySelector(
".new-price"
).innerText = price;

modal.classList.add(
"active"
);

});

});

if(closeModal){

closeModal.addEventListener(
"click",
()=>{

modal.classList.remove(
"active"
);

});

}

window.addEventListener(
"click",
(e)=>{

if(e.target===modal){

modal.classList.remove(
"active"
);

}

});


/* ===================================
   FLASH SALE COUNTDOWN
=================================== */

const targetDate =
new Date();

targetDate.setDate(
targetDate.getDate()+3
);

function updateCountdown(){

const now =
new Date().getTime();

const distance =
targetDate - now;

const days =
Math.floor(
distance /
(1000*60*60*24)
);

const hours =
Math.floor(
(distance %
(1000*60*60*24))
/
(1000*60*60)
);

const minutes =
Math.floor(
(distance %
(1000*60*60))
/
(1000*60)
);

const seconds =
Math.floor(
(distance %
(1000*60))
/
1000
);

const boxes =
document.querySelectorAll(
".time-box h3"
);

if(boxes.length >= 4){

boxes[0].innerText = days;
boxes[1].innerText = hours;
boxes[2].innerText = minutes;
boxes[3].innerText = seconds;

}

}

setInterval(
updateCountdown,
1000
);

updateCountdown();


/* ===================================
   SEARCH BAR
=================================== */

const searchInput =
document.querySelector(
".header-search input"
);

if(searchInput){

searchInput.addEventListener(
"keyup",
function(){

let value =
this.value.toLowerCase();

let cards =
document.querySelectorAll(
".product-card"
);

cards.forEach(card=>{

let title =
card.querySelector("h3")
.innerText
.toLowerCase();

if(title.includes(value)){

card.style.display =
"block";

}else{

card.style.display =
"none";

}

});

});

}


/* ===================================
   SMOOTH SCROLL
=================================== */

document.querySelectorAll(
'a[href^="#"]'
).forEach(anchor=>{

anchor.addEventListener(
'click',
function(e){

e.preventDefault();

document.querySelector(
this.getAttribute('href')
).scrollIntoView({

behavior:'smooth'

});

});

});
```
