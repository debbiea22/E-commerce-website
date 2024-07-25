if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);

}
else{
    ready();
}

function ready(){
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    console.log(removeCartButtons)
    for(var i=0;i<removeCartButtons.length;i++){
        var button=removeCartButtons[i]
        button.addEventListener("click",removeCartItem)
    }
     // Add event listener to "Add to Cart" button
     const addToCartButton = document.querySelector('.single-pro-details .normal');
     if (addToCartButton) {
         addToCartButton.addEventListener('click', addToCart);
    }

    displayCart();
}



// // Function to add item to cart
// function addToCart() {
//     // Get the product details
//     const productDetails = document.querySelector('.single-pro-details');
//     const productId = productDetails.getAttribute('data-product-id');
//     const productName = productDetails.querySelector('h4').innerText;
//     const productPrice = productDetails.querySelector('h2').innerText;
//     const productImg = document.getElementById('MainImg').src;
//     const productQuantity = document.getElementById('product-quantity').value;

//     // Create product object
//     const product = {
//         id: productId,
//         name: productName,
//         price: productPrice,
//         img: productImg,
//         quantity: productQuantity
//     };

//     // Get cart from local storage
//     let cart = JSON.parse(localStorage.getItem('cart')) || [];

//     // Add product to cart
//     cart.push(product);

//     // Save updated cart to local storage
//     localStorage.setItem('cart', JSON.stringify(cart));

//     alert('Product added to cart');
// }

// Function to get URL parameter
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Redirect to sproduct.html with the clicked image
document.querySelectorAll('.pro').forEach(item => {
    item.addEventListener('click', event => {
        const imgSrc = item.querySelector('img').src;
        window.location.href = `sproduct.html?img=${encodeURIComponent(imgSrc)}`;
    });
});

// Set the main image based on URL parameter
window.onload = function() {
    var imgSrc = getUrlParameter('img');
    if (imgSrc) {
        document.getElementById('MainImg').src = imgSrc;
    }
};

var MainImg = document.getElementById("MainImg");
var smallimg = document.getElementsByClassName("small-img");
smallimg[0].onclick = function() {
    MainImg.src = smallimg[0].src;
};
smallimg[1].onclick = function() {
    MainImg.src = smallimg[1].src;
};
smallimg[2].onclick = function() {
    MainImg.src = smallimg[2].src;
};
smallimg[3].onclick = function() {
    MainImg.src = smallimg[3].src;
};




function removeCartItem(event){
    var buttonClicked=event.target
    buttonClicked.parentElement.remove()
}

function addToCart() {
    // Get the product details
    const productDetails = document.querySelector('.single-pro-details');
    const productId = productDetails.getAttribute('data-product-id');
    const productName = productDetails.querySelector('h4').innerText;
    const productPrice = productDetails.querySelector('h2').innerText;
    const productImg = document.getElementById('MainImg').src;
    //const productQuantityElement = document.getElementById('product-quantity');
       // Ensure the product quantity element exists
    // if (!productQuantityElement) {
    //     alert('Product quantity not found.');
    //     return;
    // }

    // const productQuantity = productQuantityElement.value;

    // Create product object
    const product = {
        id: productId,
        name: productName,
        price: productPrice,
        img: productImg,
        // quantity: productQuantity
    };

    // Get cart from local storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Add product to cart
    cart.push(product);

    // Save updated cart to local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    alert('Product added to cart');
}

function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) return; // Exit if the cart-items container is not found

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    let totalPrice = 0;

    cartItemsContainer.innerHTML = ''; // Clear previous items

    cart.forEach(item => {
        const itemPrice = parseInt(item.price.replace('Rs.', '')) * item.quantity;
        totalPrice += itemPrice;

        const cartBox = document.createElement('div');
        cartBox.classList.add('cart-box');
        cartBox.innerHTML = `
            <img src="${item.img}" alt="" class="cart-img">
            <div class="detail-box">
                <div class="cart-product-title">${item.name}</div>
                <div class="cart-price">${item.price}</div>
                <input type="number" value="${item.quantity}" class="cart-quantity">
            </div>
            <i class="far fa-times-circle cart-remove"></i>
        `;
        cartItemsContainer.appendChild(cartBox);
    });

    document.querySelector('.total-price').innerText = `Rs.${totalPrice}`;

    // Add event listeners to new remove buttons
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
}

