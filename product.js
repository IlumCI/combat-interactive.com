document.addEventListener("DOMContentLoaded", function () {
    const products = [
        {
            id: 1,
            name: "Product 1",
            category: "electronics",
            price: 49.99,
            image: "product1.jpg",
            description: "Description of Product 1."
        },
        {
            id: 2,
            name: "Product 2",
            category: "clothing",
            price: 39.99,
            image: "product2.jpg",
            description: "Description of Product 2."
        },
        // Add more products as needed
    ];

    const productContainer = document.querySelector(".product-list");

    // Function to display products
    function displayProducts(products) {
        productContainer.innerHTML = "";
        products.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("product");

            const productImage = document.createElement("img");
            productImage.src = product.image;
            productImage.alt = product.name;

            const productName = document.createElement("h3");
            productName.textContent = product.name;

            const productPrice = document.createElement("p");
            productPrice.textContent = `$${product.price}`;

            const addToCartBtn = document.createElement("a");
            addToCartBtn.href = "#";
            addToCartBtn.classList.add("btn");
            addToCartBtn.textContent = "Add to Cart";
            addToCartBtn.addEventListener("click", () => addToCart(product));

            productCard.appendChild(productImage);
            productCard.appendChild(productName);
            productCard.appendChild(productPrice);
            productCard.appendChild(addToCartBtn);

            productContainer.appendChild(productCard);
        });
    }

    // Function to add product to cart
    function addToCart(product) {
        // Example function, you can implement actual cart functionality here
        console.log(`Added ${product.name} to cart.`);
        // Update cart popup or functionality as per your design
    }

    displayProducts(products);

    // Additional functionalities and interactivity can be added based on requirements
});
