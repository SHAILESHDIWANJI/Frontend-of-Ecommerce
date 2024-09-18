const navbarToggler = document.getElementById("navbar-toggler");
const navbarCollapse = document.getElementById("navbar");

navbarToggler.addEventListener("click", function () {
  navbarCollapse.classList.toggle("show");
});


let cartItems = document.getElementById("cart-items");
let cartTotal = document.getElementById("cart-total");
let buyNowButton = document.getElementById("buy-now-button");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
console.log("cart", cart);
let total = 0;

function updateCartUi(){
  cartItems.innerHTML = "";
  total=0
  cart.map((item,index)=>{
    const cartItem=document.createElement("li")

    cartItem.classList.add("list-group-item","d-flex","justify-content-between")

    cartItem.innerHTML = `
    <div>
     <strong>${item.title}</strong>
     <strong>$${item.price}</strong>
    </div>

<div class="btn-group" role="group" aria-label="Basic example">
  <button type="button" class="btn btn-primary decrement" data-index="${index}">-</button>
  <span class="p-2">${item.quantity}</span>
  <button type="button" class="btn btn-primary increment" data-index="${index}">+</button>
  <button type="button" class="btn btn-danger remove" data-index="${index}">Remove</button>
</div>
    `;
    cartItems.append(cartItem);
   total +=item.price*item.quantity
  });
  cartTotal.textContent="$"+total

  let increment=document.querySelectorAll(".increment")

  increment.forEach((btn)=>{
    btn.addEventListener("click",function(event){

      let id=event.target.getAttribute("data-index")

      cart[id].quantity++
      setCartToLocalStorage()
      updateCartUi()
    })
  })
  let decrement =document.querySelectorAll(".decrement")
  
  decrement.forEach((btn)=>{
    btn.addEventListener("click",function(event){
      let id=event.target.getAttribute("data-index");
      if(cart[id].quantity>1){
        cart[id].quantity--
      }
      setCartToLocalStorage()
      updateCartUi()
    })
  })

  let remove =document.querySelectorAll(".remove")
  remove.forEach((btn)=>{
    btn.addEventListener("click",function(event){
      let id=event.target.getAttribute("data-index")
      cart.splice(id,1)
      setCartToLocalStorage()
      updateCartUi()
    })
  })

  function setCartToLocalStorage(){
    localStorage.setItem("cart",JSON.stringify(cart))
  }


}
updateCartUi()


buyNowButton.addEventListener("click",handleBuy)

function handleBuy(){
  let cart=JSON.parse(localStorage.getItem("cart"))||[]
  if(cart.length===0){
    Swal.fire("Your cart is empty.Please add items to buy")
  }else{
    window.location.href="orderSucess.html"
    localStorage.removeItem("cart")
  }
}