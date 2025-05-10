let cart = [];
let total = 0;

// Add items to cart
function addToCart(name, price) {
    cart.push({ name: name, price: price });
    total += price;
    updateCart();
}

// Update the cart display
function updateCart() {
    const cartItemsList = document.getElementById("cart-items");
    cartItemsList.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ₹${item.price}`;
        cartItemsList.appendChild(li);
    });
    document.getElementById("total").textContent = `Total: ₹${total}`;
}

// Place order function
function placeOrder() {
    if (cart.length > 0) {
        alert(`Your order has been placed! Total: ₹${total}.`);
        cart = [];
        total = 0;
        updateCart();
        document.getElementById("qrSection").style.display = "none";
    } else {
        alert("Your cart is empty. Please add items to the cart.");
    }
}

// Show QR and notify via WhatsApp
function showQRAndNotify() {
    if (total === 0) {
        alert("Add something to cart first!");
        return;
    }

    const upiID = "ritishk610@okhdfcbank"; // Replace with your real UPI ID
    const name = "Backbenchers Crackers";
    const upiLink = `upi://pay?pa=${upiID}&pn=${encodeURIComponent(name)}&am=${total}&cu=INR`;

    // Display QR Code
    document.getElementById("upiLink").href = upiLink;
    document.getElementById("qrSection").style.display = "block";
    
    // Clear previous QR code if it exists
    const qrCanvas = document.getElementById("qr");
    qrCanvas.getContext("2d").clearRect(0, 0, qrCanvas.width, qrCanvas.height);

    // Generate the new QR code
    new QRious({
        element: qrCanvas,
        value: upiLink,
        size: 250,
    });

    // Add a button for confirming the payment
    const confirmPaymentButton = document.createElement('button');
    confirmPaymentButton.classList.add('btn');
    confirmPaymentButton.textContent = "Confirm Payment";
    confirmPaymentButton.onclick = function() {
        // When user confirms payment, open WhatsApp
        openWhatsApp();
    };

    // Add the confirm payment button to the page
    document.getElementById("qrSection").appendChild(confirmPaymentButton);
}

// Open WhatsApp with the order details
function openWhatsApp() {
    const whatsappNumber = "916382012078"; // Replace with your WhatsApp number
    let message = `Hi, a customer is attempting to pay ₹${total} for their order from Backbenchers Crackers.\n\nOrder Details:\n`;
    cart.forEach(item => {
        message += `${item.name} - ₹${item.price}\n`;
    });
    message += `\nPlease confirm the payment.`;

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");

    // Optionally, reset the cart after confirming payment
    cart = [];
    total = 0;
    updateCart();
    document.getElementById("qrSection").style.display = "none";
}
