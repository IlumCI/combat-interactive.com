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

    // Highlight Active Section in Navigation
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.site-header nav ul li a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - document.querySelector('.site-header').offsetHeight;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Cart Functionality
    const addToCartButtons = document.querySelectorAll('.product .btn');
    const cartPopup = document.querySelector('.cart-popup');
    const cartItems = document.getElementById('cart-items');
    const clearCartBtn = document.getElementById('clear-cart-btn');
    const checkoutBtn = document.getElementById('checkout-btn');
    const cartToggle = document.getElementById('cart-toggle');
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

    // Cart Popup Toggle
    cartToggle.addEventListener('click', () => {
        cartPopup.classList.toggle('show');
        updateCart();
    });

    // Clear Cart
    clearCartBtn.addEventListener('click', () => {
        cart = [];
       
