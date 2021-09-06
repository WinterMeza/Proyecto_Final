let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Desayuno Sencillo',
        tag: 'desayunosencillo',
        price: 15,
        inCart: 0
    },
    {
        name: "Desayuno Pequeño",
        tag: "desayunopequeño",
        price: 20,
        inCart:0
    },
    {
        name: "Vino y Bombones",
        tag: "vinoybombones",
        price: 15,
        inCart:0
    },
    {
        name: "Caja de Frutas",
        tag: "cajadefrutas",
        price: 20,
        inCart:0
    },
    {
        name: "Cupcakes Amor",
        tag: "cupcakesamor",
        price: 15,
        inCart:0
    },
    {
        name: "Frutas Decoradas",
        tag: "frutasdecoradas",
        price: 20,
        inCart:0
    },
    {
        name: "Fresas Rosa",
        tag: "fresasrosa",
        price: 15,
        inCart:0
    },
    {
        name: "Ramo de Fresas",
        tag: "ramodefresas",
        price: 20,
        inCart:0
    },
    {
        name: "Caja de Vino y Fresas",
        tag: "desayunosencillo",
        price: 15,
        inCart:0
    },
    {
        name: "Desayuno Consentidor",
        tag: "desayunoconsentidor",
        price: 20,
        inCart:0
    },
    {
        name: "Desayuno Sweet",
        tag: "desayunosweet",
        price: 15,
        inCart:0
    },
    {
        name: "Desayuno Dulce",
        tag: "desayunodulce",
        price: 20,
        inCart:0
    }
];

for(let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

/*function onLoadCartNumbers(){
    let productNumbers=localStorage.getItem('cartNumbers');

    if(productNumbers){
        document.querySelector('.cart span').textContent= productNumbers;
    }
}*/

function cartNumbers(product){
    
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if (productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    }else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}


function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    console.log("My CartItems are", cartItems);

    if(cartItems != null) {
        if(cartItems[product.tag] == undefined){
            cartItems ={
                ...cartItems,
                [product.tag]:product
            }
        }
        cartItems[product.tag].inCart +=1;
    } else{
        product.inCart=1;
        cartItems ={
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify
    (cartItems));
    
}

function totalCost(product){
    //console.log("El precio del producto es", product.price);
    let cartCost = localStorage.getItem('totalCost');

    
    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost);

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost +
         product.price);
    } else{
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector
    (".products");

    

    console.log(cartItems);
    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
               <ion-icon name="close-circle"></ion-icon>
               <img src="./images/$(item.tag).jpg">
               <span>${item.name}</span>
            </div>
            <div class="price">${item.price}</div>
            <div class="quantity">
                <ion-icon class="decrease"
                name="arrow-dropleft-circle"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon class="increase"
                name="arrow-dropright-circle"></ion-icon>
            </div>
            <div class="total">
                ${item.inCart * item.price},00
            </div>
            `;
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total
                </h4>
                <h4 class="basketTotal">
                    $${cartCost},00
                </h4>
        `;
    }

    
}

/*onLoadCartNumbers();*/
displayCart();


