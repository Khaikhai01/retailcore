
/*  SEED PRODUCTS */

const seedProducts = [
    { name: "Unga (2kg)",       category: "Flour",     price: 180, stock: 20 },
    { name: "Sugar (1kg)",      category: "Groceries", price: 160, stock: 4 },
    { name: "Milk (500ml)",     category: "Dairy",     price: 65,  stock: 30 },
    { name: "Bread (400g)",     category: "Bakery",    price: 70,  stock: 0 },
    { name: "Cooking Oil (1L)", category: "Groceries", price: 320, stock: 8 }
];


/* PRODUCT CLASS */

class Product {

    constructor(id, name, category, price, stock) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.stock = stock;
    }

    // Check product availability
    isAvailable() {
        return this.stock > 0;
    }

    // Check low stock
    isLowStock() {
        return this.stock <= 5;
    }

    // Reduce stock
    reduceStock(qty) {

        if (!Number.isInteger(qty) || qty <= 0 || qty > this.stock) {
            throw new Error("Insufficient stock available");
        }

        this.stock -= qty;

        return true;
    }

    // Add stock
    restock(qty) {

        if (!Number.isInteger(qty) || qty <= 0) {
            return false;
        }

        this.stock += qty;

        return true;
    }

}


/* CREATE PRODUCT OBJECTS  */

const products = seedProducts.map((product, index) => {

    return new Product(
        index + 1,
        product.name,
        product.category,
        product.price,
        product.stock
    );

});


/*  CART ITEM CLASS  */

class CartItem {

    constructor(product, quantity = 1) {
        this.product = product;
        this.quantity = quantity;
    }

    // Calculate individual item total
    get lineTotal() {
        return this.product.price * this.quantity;
    }

}


/*  CART CLASS  */

class Cart {

    constructor() {
        this.items = [];
    }

    // Add product to cart
    add(product) {

        // Check availability
        if (!product.isAvailable()) {
            return false;
        }

        // Find existing item
        const existingItem = this.items.find(
            item => item.product.id === product.id
        );

        if (existingItem) {

            // Check available stock
            if (existingItem.quantity >= product.stock) {
                return false;
            }

            existingItem.quantity++;

        } else {

            // Create new cart item
            const newItem = new CartItem(product);

            this.items.push(newItem);

        }

        return true;
    }


    // Increase quantity
    increment(id) {

        const findItem = this.items.find(
            item => item.product.id === id
        );

        if (!findItem) {
            return false;
        }

        // Check stock limit
        if (findItem.quantity >= findItem.product.stock) {
            return false;
        }

        findItem.quantity++;

        return true;
    }


    // Decrease quantity
    decrement(id) {

        const findItem = this.items.find(
            item => item.product.id === id
        );

        if (!findItem) {
            return false;
        }

        // Remove item if quantity is 1
        if (findItem.quantity === 1) {

            this.items = this.items.filter(
                item => item.product.id !== id
            );

        } else {

            findItem.quantity--;

        }

        return true;
    }


    // Clear cart
    clear() {
        this.items = [];
    }


    // Calculate subtotal
    get subtotal() {

        return this.items.reduce(
            (total, item) => total + item.lineTotal,
            0
        );

    }


    // Calculate total quantity
    get totalQuantity() {

        return this.items.reduce(
            (total, item) => total + item.quantity,
            0
        );

    }

}


/*  CREATE CART INSTANCE */

const cart = new Cart();


/*  DOM ELEMENT REFERENCES */

const productGrid = document.getElementById("product-grid");

const cartItems = document.getElementById("cart-items");

const cartCount = document.getElementById("cart-count");

const cartSubtotal = document.getElementById("cart-subtotal");

const cartTotal = document.getElementById("cart-total");

const cartMessage = document.getElementById("cart-message");

const clearCartBtn = document.getElementById("clear-cart");

const checkoutBtn = document.getElementById("checkout-btn");

const productSearch = document.getElementById("product-search");

const categoryFilters = document.getElementById("category-filters");

const cartToggle = document.getElementById("cart-toggle");

const cartSection = document.getElementById("cart-section");

const currentData = document.getElementById("current-data");


/* GLOBAL FILTER STATE */

let selectedCategory = "All";


/*  DISPLAY PRODUCTS */

function renderProducts(productsToDisplay = products) {

    // Clear previous products
    productGrid.innerHTML = "";

    // Check if products exist
    if (productsToDisplay.length === 0) {

        productGrid.innerHTML = "<p>No products found.</p>";

        return;
    }

    // Loop through products
    productsToDisplay.forEach(product => {

        // Create product card
        const productCard = document.createElement("div");

        productCard.classList.add("product-card");

        // Add product details
        productCard.innerHTML = `

            <h3>${product.name}</h3>

            <p>Category: ${product.category}</p>

            <p>Price: KSH ${product.price.toFixed(2)}</p>

            <p>Stock: ${product.stock}</p>

            <button
                type="button"
                class="add-to-cart"
                data-id="${product.id}"
                ${!product.isAvailable() ? "disabled" : ""}
            >

                ${product.isAvailable() ? "Add to Cart" : "Out of Stock"}

            </button>

        `;

        // Add card to product grid
        productGrid.appendChild(productCard);

    });

}


/* HANDLE ADD TO CART */

function handleAddToCart(productId) {

    // Find selected product
    const selectedProduct = products.find(
        product => product.id === productId
    );

    if (!selectedProduct) {
        return;
    }

    // Add product to cart
    const added = cart.add(selectedProduct);

    if (!added) {

        alert("Unable to add product. Check available stock.");

        return;
    }

    // Update cart
    renderCart();

}


/* PRODUCT GRID EVENT LISTENER */

productGrid.addEventListener("click", function(event) {

    // Check if Add to Cart was clicked
    if (event.target.classList.contains("add-to-cart")) {

        // Get product ID
        const productId = Number(event.target.dataset.id);

        // Add selected product
        handleAddToCart(productId);

    }

});


/*  DISPLAY CART ITEMS */

function renderCart() {

    // Clear previous cart items
    cartItems.innerHTML = "";

    // Check whether cart is empty
    if (cart.items.length === 0) {

        cartMessage.textContent = "Your Cart is empty";

        cartItems.innerHTML = "<p>No items in cart.</p>";

    } else {

        cartMessage.textContent =
            `${cart.items.length} different product(s) in cart`;

    }


    // Loop through cart items
    cart.items.forEach(item => {

        // Create cart item element
        const cartItem = document.createElement("div");

        cartItem.classList.add("cart-item");

        // Insert cart item details
        cartItem.innerHTML = `

            <div>

                <h3>${item.product.name}</h3>

                <p>KSH ${item.product.price.toFixed(2)}</p>

                <p>Quantity: ${item.quantity}</p>

                <p>
                    Line Total: KSH ${item.lineTotal.toFixed(2)}
                </p>

                <button
                    type="button"
                    data-action="decrement"
                    data-id="${item.product.id}"
                >
                    -
                </button>

                <button
                    type="button"
                    data-action="increment"
                    data-id="${item.product.id}"
                >
                    +
                </button>

            </div>

        `;

        cartItems.appendChild(cartItem);

    });


    // Update cart summary
    updateCartSummary();

}


/*  UPDATE CART SUMMARY */

function updateCartSummary() {

    // Get subtotal from Cart class
    const subtotal = cart.subtotal;

    // Get total quantity from Cart class
    const totalQuantity = cart.totalQuantity;

    // Update HTML
    cartSubtotal.textContent = `KSH ${subtotal.toFixed(2)}`;

    cartTotal.textContent = `KSH ${subtotal.toFixed(2)}`;

    cartCount.textContent = totalQuantity;

    // Enable or disable checkout
    checkoutBtn.disabled = cart.items.length === 0;

}


/*  CART ITEM EVENT LISTENER */

cartItems.addEventListener("click", function(event) {

    // Find clicked button
    const button = event.target.closest("button");

    if (!button) {
        return;
    }

    // Get product ID and action
    const productId = Number(button.dataset.id);

    const action = button.dataset.action;


    // Increase quantity
    if (action === "increment") {

        const updated = cart.increment(productId);

        if (!updated) {

            alert("Cannot increase quantity. Check available stock.");

        }

    }


    // Decrease quantity
    if (action === "decrement") {

        cart.decrement(productId);

    }


    // Refresh cart
    renderCart();

});


/* CLEAR CART */

clearCartBtn.addEventListener("click", function() {

    // Empty cart
    cart.clear();

    // Refresh cart display
    renderCart();

});


/*  SEARCH AND CATEGORY FILTERING */

function applyFilters() {

    const searchTerm = productSearch.value.toLowerCase().trim();

    const filteredProducts = products.filter(product => {

        // Check product name
        const matchesSearch = product.name
            .toLowerCase()
            .includes(searchTerm);

        // Check category
        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;

    });

    // Display filtered products
    renderProducts(filteredProducts);

}


/*  RENDER CATEGORY BUTTONS */

function renderCategories() {

    // Get unique categories
    const categories = [
        "All",
        ...new Set(products.map(product => product.category))
    ];

    // Clear previous category buttons
    categoryFilters.innerHTML = "";

    categories.forEach(category => {

        // Create button
        const button = document.createElement("button");

        button.type = "button";

        button.textContent = category;

        button.classList.add("category-btn");

        button.dataset.category = category;

        // Highlight selected category
        if (category === selectedCategory) {

            button.classList.add("active");

        }

        // Insert button
        categoryFilters.appendChild(button);

    });

}


/*  CATEGORY FILTER EVENT LISTENER */

categoryFilters.addEventListener("click", function(event) {

    if (!event.target.classList.contains("category-btn")) {
        return;
    }

    // Update selected category
    selectedCategory = event.target.dataset.category;

    // Refresh categories
    renderCategories();

    // Apply filters
    applyFilters();

});


/*   SEARCH EVENT LISTENER */

productSearch.addEventListener("input", function() {

    applyFilters();

});


/*   CHECKOUT */

checkoutBtn.addEventListener("click", function() {

    // Check empty cart
    if (cart.items.length === 0) {
        return;
    }

    try {

        // Reduce stock for each purchased product
        cart.items.forEach(item => {

            item.product.reduceStock(item.quantity);

        });

        // Clear cart
        cart.clear();

        // Update displays
        renderCart();

        applyFilters();

        alert("Sale completed successfully!");

    } catch (error) {

        alert(error.message);

    }

});


/* DISPLAY CURRENT DATE AND TIME  */

function displayDate() {

    const now = new Date();

    currentData.textContent = now.toLocaleString();

}


/*  VIEW CART BUTTON  */

cartToggle.addEventListener("click", function() {

    cartSection.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

});


/*  INITIALISE APPLICATION */

// Display date
displayDate();

// Display products
renderProducts();

// Display category filters
renderCategories();

// Display cart
renderCart();

// Apply initial filters
applyFilters();
