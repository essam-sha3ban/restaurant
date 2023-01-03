let menu = document.querySelector("#menu-bars")
let navBar = document .querySelector(".navBar")

menu.onclick = ()=>{
menu.classList.toggle("fa-times")
navBar.classList.toggle("active")
}


//start search

let iconSearch = document.getElementById("search")
let closeSearch = document.getElementById("close")
let showSearchForm = document.getElementById("search-form")

iconSearch.onclick = ()=>{
    showSearchForm.classList.toggle("active")
   
}
closeSearch.onclick= ()=>{
    showSearchForm.classList.remove("active")
}

let myCartBtn = document.querySelector(".fa-cart-shopping")
let cart = document.querySelector(".cart")
myCartBtn.onclick =()=>{
  cart.classList.toggle("active")
}

//swiper
var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 7500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    loop:true
  });

var swiper = new Swiper(".review-slide", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 7500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    loop:true,
    breakpoints:{
      0:{
        slidesPerView:1,
      },
      640:{
        slidesPerView:2,
      },
      768:{
        slidesPerView:2,
      },
      1024:{
        slidesPerView:3,
      },
    }
  });


  
//=============working cart===================

if(document.readyState =="loading"){
  document.addEventListener("DOMContentLoaded",ready)
}
else{
  ready()
}


function ready(){

//(1)remove item from cart
let removeItem = document.getElementsByClassName("item-remove")
for(let i = 0 ; i <removeItem.length ;i++){
  let button =removeItem[0]
button.addEventListener("click",removeItemCart)
}

function removeItemCart(event){
  let btnClicked = event.target
  btnClicked.parentElement.remove()
  updateTotal()
  }


//(2)add  product to cart 
let addProduct = document.getElementsByClassName("add-to-cart")
for(let i =0; i<addProduct.length ;i++){
  let button = addProduct[i]
  button.addEventListener("click",function(event){
    let btnClicked =event.target
    let shopProduct = btnClicked.parentElement .parentElement
    let image =shopProduct.getElementsByClassName("img-product")[0].src
    let title =shopProduct.getElementsByClassName("title-product")[0].innerText
    let price =shopProduct.getElementsByClassName("price-product")[0].innerText
    console.log(image ,title ,price)
    addProductCart(image ,title ,price)
    updateTotal()  
  })
}
function  addProductCart(image ,title ,price){
  let itemCart = document.createElement("dive")
  itemCart.classList.add("item")
  let cartContent = document.getElementsByClassName("cart-content")[0]
  let titleItem = cartContent.getElementsByClassName("item-name")
  for (let i = 0; i<titleItem.length ;i++){
   
    if(titleItem[i].innerText == title){
      alert("this product is added cart")
      return
    } 
   
  }
  let cartItemContent = ` <img src="${image}" class="item-img" alt="">
  <div class="info">
    <div class="item-name">${title}</div>
    <div class="item-price">${price}</div>
    <input type="number" value="1" class="quantity">            
  </div>
  <i class="fa-solid fa-trash item-remove"></i>`
  itemCart.innerHTML=cartItemContent
  cartContent.append(itemCart)
  itemCart.getElementsByClassName("item-remove")[0].addEventListener("click",removeItemCart)
  itemCart.getElementsByClassName("quantity")[0].addEventListener("change",quantityChange)
}


//quantityChange

let quantity = document.getElementsByClassName("quantity")
for(let i =0; i<quantity.length ; i++){
  let input = quantity[i]
  input.addEventListener("change",quantityChange)
}

function quantityChange(event){
  let input = event.target
  if(isNaN(input.value)||input.value <= 0 ){
    input.value=1
  }
  updateTotal()
}


//update total
function updateTotal(){
  let cartContent = document.getElementsByClassName("cart-content")[0]
  let item = cartContent.getElementsByClassName("item")
  let total = 0
  for(let i = 0 ; i<item.length ; i++){
    let itemCart =item[i]
    let priceElement = itemCart.getElementsByClassName("item-price")[0]
    let quantityElement = itemCart.getElementsByClassName("quantity")[0]
    let price = parseFloat(priceElement.innerText.replace("$"),"")
    let quantity = quantityElement.value
    total = total + price * quantity ;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("total-price")[0].innerText = "$"+ total
}  

//btn buy
let btnBuy = document.getElementsByClassName("btn-buy")[0]

btnBuy.addEventListener("click", function(){
  let contentCart = document.querySelector(".cart-content")

  if(contentCart.hasChildNodes()){
    alert("your order is placed")
   contentCart.removeChild(contentCart.firstChild)
  }
  updateTotal()  
})

}
