

let products = [];

const navbarToggler = document.getElementById("navbar-toggler");
const navbarCollapse = document.getElementById("navbar");

navbarToggler.addEventListener("click", function () {
  navbarCollapse.classList.toggle("show");
});

// function showAlert(msg, type) {
//   const alertContainer = document.getElementById("alert-container");
//   const alert = document.createElement("div");
//   alert.classList.add(
//     "alert",
//     `alert-${type}`,
//     "alert-dismissible",
//     "fade",
//     "show"
//   );

//   alert.innerHTML = `
//   ${msg}
//   <button type="button" class="close" data-dismiss="alert" aria-label="Close">
//     <span aria-hidden="true">&times;</span>
//   </button>
//   `;
//   alertContainer.append(alert);

//   setTimeout(() => {
//     alert.classList.remove("show");
//     alert.addEventListener("transitionend", function () {
//       alertContainer.removeChild(alert);
//     });
//   }, 2000);
// }

fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    products = data;

    let productContainer = document.getElementById("product-container");

    data.map(({ id, image, title, description, price, rating: { rate } }) => {
      let productCard = document.createElement("div");
      productCard.classList.add("col-md-4", "mb-2", "mt-2");

      productCard.innerHTML = `
      <div class="card h-100 rounded" onclick="showProductDetails(${id})">
     <img height="400px" src=${image} class="card-img-top" alt=${title} />
      <div class="card-body">
       <h5 class="card-title">${title}</h5>
        <p class="card-text text-truncate" style="max-width: 300px;">
        ${description}
       </p>
        <p class="card-text">
        Rating: ${rate}
       </p>
      <p class="card-text">
      Price: $${price}
      </p>
       <button onclick="addToCart(event,${id})" class="btn btn-primary w-100">Add to cart</button>
         </div>
        </div>
      `;
      productContainer.append(productCard);
    });
  });

function showProductDetails(id) {
  const currentPath = window.location.pathname;
  console.log(currentPath);
  const newPath =
    currentPath.replace("index.html", "product.html") + `?id=${id}`;
  console.log(newPath);
  window.location.href = newPath;
}

//Carousel
$(".slide-show").slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  dots: true,
  autoplay: true,
  autoplaySpeed: 2000,
});

function addToCart(e, id) {
  e.stopPropagation();
  // showAlert("Product added to cart", "success");
  Swal.fire("Product added to cart");

  let cart =JSON.parse(localStorage.getItem("cart"))|| []
  console.log("cart",cart);

  console.log(id);
  console.log("id",id);

  let product=products.find((item)=>item.id===id)
  console.log("product",product);

  if(product){
    //check if it exist in local storage
    let existingItem=cart.find((item)=>item.id===id);
    console.log("exitingItem",existingItem);

    if(existingItem){
      existingItem.quantity++
    }else{
      product.quantity=1
      cart.push(product)
    }
      
    
  }
  localStorage.setItem("cart",JSON.stringify(cart))
 
}
