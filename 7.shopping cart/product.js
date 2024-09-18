const navbarToggler = document.getElementById("navbar-toggler");
const navbarCollapse = document.getElementById("navbar");
let products=[]
navbarToggler.addEventListener("click", function () {
  navbarCollapse.classList.toggle("show");
});


const urlParams=new URLSearchParams(window.location.search)
console.log(urlParams);

const productId=urlParams.get("id")
console.log(productId);

fetch(`https://fakestoreapi.com/products/${productId}`)
.then((response)=>response.json())
.then((data)=>{
    console.log(data)
    products=data
    let productDetails=document.getElementById("product-detail")
    const productCard=document.createElement("div")
    productCard.classList.add("col-md-6")
    productCard.innerHTML=`
    <div class="card h-100" >
        <img height:"400px" src="${data.image}" alt="" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${data.title}</h5>
            <p class="card-text">${data.description}</p>
            <p class="card-text">Rating:${data.rating.rate}</p>
            <p class="card-text">price:$${data.price}</p>
            <button onclick="addToCart(event,${data.id})" class="btn btn-primary w-100">Add to cart</button>
        </div>
        </div>`;
    productDetails.append(productCard)
})

function addToCart(e, id) {
    e.stopPropagation();
    Swal.fire("Product added to cart");
  
    let cart =JSON.parse(localStorage.getItem("cart"))|| []
    console.log("cart",cart);
    console.log(id);
    console.log("id",id);
    if(products){
      let existingItem=cart.find((item)=>item.id===id);
      console.log("exitingItem",existingItem);
  
      if(existingItem){
        existingItem.quantity++
      }else{
        products.quantity=1
        cart.push(products)
      }
    }
    localStorage.setItem("cart",JSON.stringify(cart))
   
  }
  