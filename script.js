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

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
    });

    // Cart Functionality
    const addToCartButtons = document.querySelectorAll('.product .btn');
    const cart = [];

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const product = e.target.closest('.product');
            const productName = product.querySelector('h3').innerText;
            const productPrice = product.querySelector('p').innerText;
            cart.push({ name: productName, price: productPrice });
            updateCart();
        });
    });

    function updateCart() {
        const cartItems = document.getElementById('cart-items');
        cartItems.innerHTML = '';
        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerText = `${item.name} - ${item.price}`;
            cartItems.appendChild(li);
        });
    }
});
