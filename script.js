document.addEventListener("DOMContentLoaded", function () {
    // Smooth Scroll
    const navLinks = document.querySelectorAll('.site-header nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop - document.querySelector('.site-header').offsetHeight,
                behavior: 'smooth'
            });
        });
    });

    // Popup Notification as Cart
    const addToCartButtons = document.querySelectorAll('.product .btn');
    const cartPopup = document.querySelector('.cart-popup');
    const cartItems = document.getElementById('cart-items');
    const clearCartBtn = document.getElementById('clear-cart-btn');
    const checkoutBtn = document.getElementById('checkout-btn');
    const cartToggle = document.querySelector('.cart-toggle');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const product = e.target.closest('.product');
            const productName = product.querySelector('h3').innerText;
            const productPrice = product.querySelector('p').innerText;

            const cartItem = {
                name: productName,
                price: productPrice,
                quantity: 1 // For simplicity, assuming quantity is always 1 initially
            };

            // Check if item already exists in cart
            const existingItem = cart.find(item => item.name === cartItem.name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push(cartItem);
            }

            // Save cart to local storage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Update cart display
            updateCart();
            showCartNotification();
        });
    });

    function updateCart() {
        cartItems.innerHTML = '';

        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `${item.name} - ${item.price} - Quantity: ${item.quantity}`;
            cartItems.appendChild(li);
        });

        // Update cart popup count
        cartToggle.innerText = `Cart (${cart.length})`;
    }

    function showCartNotification() {
        cartPopup.classList.add('show');
        setTimeout(() => {
            cartPopup.classList.remove('show');
        }, 3000); // Hide after 3 seconds
    }

    // Clear Cart
    clearCartBtn.addEventListener('click', () => {
        cart = [];
        localStorage.removeItem('cart');
        updateCart();
    });

    // Checkout Button (clears cart for demo purposes)
    checkoutBtn.addEventListener('click', () => {
        alert('Checkout functionality to be implemented.');
        cart = [];
        localStorage.removeItem('cart');
        updateCart();
    });

    // Initialize Cart on Page Load
    updateCart();

    // Dark Mode Toggle (for demonstration purposes)
    const body = document.querySelector('body');
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
    });

    // User Personalization through Cookies (dummy implementation)
    function setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    }

    function getCookie(name) {
        const cookieName = `${name}=`;
        const cookieArray = document.cookie.split(';');
        
        for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i].trim();
            if (cookie.startsWith(cookieName)) {
                return cookie.substring(cookieName.length, cookie.length);
            }
        }
        
        return null;
    }

    const userTheme = getCookie('user_theme');
    if (userTheme) {
        body.classList.add(userTheme);
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const theme = body.classList.contains('light-mode') ? 'light-mode' : '';
        setCookie('user_theme', theme, 30); // Set cookie for 30 days
    });
});
