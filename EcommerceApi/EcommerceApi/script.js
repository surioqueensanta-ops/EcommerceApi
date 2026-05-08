// Task 1: Data Structure - Product Class
class Product {
    constructor(id, name, price, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }
}

const products = [
    new Product(1, "Wireless Headphones", 890, "headphone.png"),
    new Product(2, "Smart Watch", 599, "watch.png"),
    new Product(3, "Casual T-Shirt", 399, "tshirt.png"),
    new Product(4, "Running Shoes", 1500, "shoes.png"),
    new Product(5, "Backpack", 899, "backpack.png"),
    new Product(6, "Wireless Mouse", 250, "mouse.png"),
    new Product(7, "Denim Jeans", 399, "jeans.png"),
    new Product(8, "Coffee Mug", 110, "mug.png"),
    new Product(9, "Sunglasses", 150, "sunglasses.jpg"),
    new Product(10, "Phone Case", 370, "case.png"),
    new Product(11, "Laptop", 45999, "laptop.png"),
    new Product(12, "Keyboard", 2999, "keyboard.png"),
    new Product(13, "Monitor", 12999, "monitor.png")
];

const API_URL = "http://localhost:8080/api/v1/products";
let cart = [];

function loadCart() {
    const savedCart = localStorage.getItem('shoppingCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        console.log('Cart loaded:', cart.length, 'items');
    }
}

function saveCart() {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    console.log('Cart saved:', cart.length, 'items');
}

// Load orders from localStorage
function loadOrders() {
    const savedOrders = localStorage.getItem('orderHistory');
    if (savedOrders) {
        currentUser.orderHistory = JSON.parse(savedOrders);
        console.log('Orders loaded:', currentUser.orderHistory.length);
    } else {
        currentUser.orderHistory = [
            { 
                id: 1, 
                orderNumber: "ORD-001", 
                date: "Feb 11, 2026", 
                total: 890, 
                items: ["Wireless Headphones"],
                status: "Delivered"
            },
            { 
                id: 2, 
                orderNumber: "ORD-002", 
                date: "Feb 12, 2026", 
                total: 399, 
                items: ["Casual T-Shirt"],
                status: "Delivered"
            }
        ];
        saveOrders();
    }
}

function saveOrders() {
    localStorage.setItem('orderHistory', JSON.stringify(currentUser.orderHistory));
    console.log('Orders saved:', currentUser.orderHistory.length);
}

function addOrder(orderData) {
    const newOrder = {
        id: Date.now(),
        orderNumber: `ORD-${String(currentUser.orderHistory.length + 1).padStart(3, '0')}`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        total: orderData.total,
        items: orderData.items,
        status: "Processing"
    };
    currentUser.orderHistory.unshift(newOrder);
    saveOrders();
    if (document.getElementById('order-history-container')) {
        renderOrderHistory();
    }
    console.log('New order added:', newOrder);
}

// Render Order History
function renderOrderHistory() {
    const container = document.getElementById('order-history-container');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    if (currentUser.orderHistory.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'No orders yet. Start shopping!';
        emptyMessage.style.textAlign = 'center';
        emptyMessage.style.padding = '40px';
        emptyMessage.style.color = '#666';
        container.appendChild(emptyMessage);
        return;
    }
    
    currentUser.orderHistory.forEach((order) => {
        const details = document.createElement('details');
        details.className = 'order-details';
        details.setAttribute('data-order-id', order.id);
        
        const summary = document.createElement('summary');
        summary.innerHTML = `
            <strong>${order.orderNumber}</strong> - ${order.date}
            <span style="float: right;">₱${order.total.toLocaleString()}</span>
            <br>
            <small style="color: ${order.status === 'Delivered' ? '#22c55e' : '#f59e0b'}">
                Status: ${order.status}
            </small>
        `;
        
        const content = document.createElement('div');
        content.className = 'order-content';
        
        const itemsList = document.createElement('div');
        itemsList.innerHTML = `
            <h4>Items Purchased:</h4>
            <ul style="margin-left: 20px; margin-top: 10px; margin-bottom: 15px;">
                ${order.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
            <p><strong>Total Amount:</strong> ₱${order.total.toLocaleString()}</p>
            <p><strong>Order Date:</strong> ${order.date}</p>
            <p><strong>Order Number:</strong> ${order.orderNumber}</p>
        `;
        
        content.appendChild(itemsList);
        details.appendChild(summary);
        details.appendChild(content);
        container.appendChild(details);
    });
}

// Task 5: Mock User Data
const currentUser = {
    name: "Queensanta",
    email: "queensanta@example.com",
    orderHistory: []
};

function updateGreeting() {
    const welcomeHeader = document.getElementById('welcome-header');
    if (welcomeHeader) {
        welcomeHeader.textContent = `Welcome, ${currentUser.name}!`;
    }
}

function initAccountPage() {
    if (document.getElementById('welcome-header')) {
        loadOrders();
        updateGreeting();
        renderOrderHistory();
        console.log('Account page initialized with', currentUser.orderHistory.length, 'orders');
    }
}

// Task 2: Dynamic Product Rendering with VIEW PRODUCT button
async function renderProducts() {
    const productGrid = document.querySelector('.product-grid');
    
    if (!productGrid) {
        console.log("product-grid not found!");
        return;
    }

    try {
        console.log("Fetching products from backend...");
        const response = await fetch("http://localhost:8080/api/v1/products");
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const productsData = await response.json();
        console.log("Products loaded:", productsData.length);

        productGrid.innerHTML = '';

        if (productsData.length === 0) {
            productGrid.innerHTML = '<p>No products found. Add some products via Postman!</p>';
            return;
        }

        productsData.forEach(product => {
            const article = document.createElement('article');
            article.className = 'product-card';

            // Map product names to image files
            let imageFile = "";
            switch(product.name) {
                case "Laptop": imageFile = "laptop.png"; break;
                case "Mouse": imageFile = "mouse.png"; break;
                case "Keyboard": imageFile = "keyboard.png"; break;
                case "Monitor": imageFile = "monitor.png"; break;
                case "Headphones": imageFile = "headphone.png"; break;
                case "Wireless Headphones": imageFile = "headphone.png"; break;
                case "T-Shirt": imageFile = "tshirt.png"; break;
                case "Casual T-Shirt": imageFile = "tshirt.png"; break;
                case "Jeans": imageFile = "jeans.png"; break;
                case "Denim Jeans": imageFile = "jeans.png"; break;
                case "Coffee Mug": imageFile = "mug.png"; break;
                case "Backpack": imageFile = "backpack.png"; break;
                case "Running Shoes": imageFile = "shoes.png"; break;
                case "Shoes": imageFile = "shoes.png"; break;
                case "Smart Watch": imageFile = "watch.png"; break;
                case "Phone Case": imageFile = "case.png"; break;
                case "Sunglasses": imageFile = "sunglasses.jpg"; break;
                default: imageFile = "https://picsum.photos/150/150?random=" + product.id;
            }
            
            const imageUrl = imageFile.startsWith("http") ? imageFile : imageFile;

            // Create detail page link based on product name
            let detailLink = "";
            const productName = product.name.toLowerCase();
            
            if (productName.includes("laptop")) detailLink = "detail-laptop.html";
            else if (productName.includes("mouse")) detailLink = "detail-mouse.html";
            else if (productName.includes("keyboard")) detailLink = "detail-keyboard.html";
            else if (productName.includes("monitor")) detailLink = "detail-monitor.html";
            else if (productName.includes("headphone")) detailLink = "detail-headphone.html";
            else if (productName.includes("t-shirt")) detailLink = "detail-tshirt.html";
            else if (productName.includes("jeans")) detailLink = "detail-jeans.html";
            else if (productName.includes("mug")) detailLink = "detail-mug.html";
            else if (productName.includes("backpack")) detailLink = "detail-backpack.html";
            else if (productName.includes("shoes")) detailLink = "detail-shoes.html";
            else if (productName.includes("watch")) detailLink = "detail-watch.html";
            else if (productName.includes("sunglasses")) detailLink = "detail-sunglasses.html";
            else if (productName.includes("case")) detailLink = "detail-case.html";
            else detailLink = `detail-${productName.replace(/ /g, '-')}.html`;

            article.innerHTML = `
                <img src="${imageUrl}" alt="${product.name}" style="width:150px; height:150px; object-fit:cover; background:#f0f0f0;">
                <h3>${product.name}</h3>
                <p class="price">₱${product.price}</p>
                <a href="${detailLink}" class="btn-view">View Product</a>
            `;

            productGrid.appendChild(article);
        });
        
        console.log("Products rendered successfully!");
        
    } catch (error) {
        console.error("Error loading products:", error);
        productGrid.innerHTML = '<p>Error loading products. Please make sure the backend server is running at http://localhost:8080</p>';
    }
}

// Handle detail page Add to Cart buttons (FIXED)
document.body.addEventListener('click', function(event) {
    const detailButton = event.target.closest('.add-to-cart-detail');
    if (detailButton) {
        // Get product data from button attributes
        const productId = parseInt(detailButton.getAttribute('data-id'));
        const productName = detailButton.getAttribute('data-name');
        const productPrice = parseFloat(detailButton.getAttribute('data-price'));
        
        // Get quantity from input field
        const quantityInput = document.getElementById(`quantity-${productId}`);
        let quantity = quantityInput ? parseInt(quantityInput.value) : 1;
        
        if (isNaN(quantity) || quantity < 1) quantity = 1;
        
        // Add to cart
        for (let i = 0; i < quantity; i++) {
            cart.push({
                id: productId,
                name: productName,
                price: productPrice
            });
        }
        saveCart();
        
        console.log('Added to cart:', productName, 'x', quantity);
        console.log('Cart now has:', cart.length, 'items');
        
        // Animation effect
        const productDetail = detailButton.closest('.product-detail');
        if (productDetail) {
            productDetail.classList.add('fade-in');
            setTimeout(() => {
                productDetail.classList.remove('fade-in');
            }, 500);
        }
        
        alert(`${productName} x${quantity} added to cart! (${cart.length} items in cart)`);
        renderCart();
    }
});

// Task 3: Render Cart Function
function renderCart() {
    const cartList = document.querySelector('.cart-list');
    const cartTotalSpan = document.querySelector('.cart-total');
    const itemCountSpan = document.getElementById('item-count');
    const orderTotalSpan = document.getElementById('order-total');
    
    console.log('Rendering cart. Cart items:', cart.length);
    
    if (cartList) {
        cartList.innerHTML = '';
        
        if (cart.length === 0) {
            const emptyMessage = document.createElement('li');
            emptyMessage.textContent = 'Your cart is empty';
            emptyMessage.style.textAlign = 'center';
            emptyMessage.style.padding = '20px';
            emptyMessage.style.color = '#666';
            cartList.appendChild(emptyMessage);
        } else {
            cart.forEach((item, index) => {
                const li = document.createElement('li');
                li.className = 'cart-item';
                li.setAttribute('data-index', index);
                li.innerHTML = `
                    <span>${item.name}</span>
                    <span>₱${item.price}</span>
                    <input type="number" class="cart-quantity" data-index="${index}" value="1" min="0" style="width:60px;">
                    <button class="remove-item" data-index="${index}">Remove</button>
                `;
                cartList.appendChild(li);
            });
        }
    }
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    if (cartTotalSpan) cartTotalSpan.textContent = total;
    if (itemCountSpan) itemCountSpan.textContent = cart.length;
    if (orderTotalSpan) orderTotalSpan.textContent = total;
}

// Remove item from cart
document.body.addEventListener('click', function(event) {
    const removeBtn = event.target.closest('.remove-item');
    if (removeBtn) {
        const index = parseInt(removeBtn.getAttribute('data-index'));
        cart.splice(index, 1);
        saveCart();
        renderCart();
        setupQuantityListeners();
    }
});

// Task 3: Quantity Adjustment
function setupQuantityListeners() {
    const cartList = document.querySelector('.cart-list');
    
    if (cartList) {
        cartList.addEventListener('change', function(event) {
            if (event.target.classList.contains('cart-quantity')) {
                const index = parseInt(event.target.getAttribute('data-index'));
                const newQuantity = parseInt(event.target.value);
                
                if (newQuantity === 0) {
                    cart.splice(index, 1);
                    saveCart();
                    renderCart();
                    setupQuantityListeners();
                }
            }
        });
    }
}

// Task 4: Form Validation (UPDATED to save orders)
function setupFormValidation() {
    const form = document.getElementById('checkout-form');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            let isValid = true;
            
            const nameInput = document.querySelector('#name');
            const streetInput = document.querySelector('#street');
            const zipcodeInput = document.querySelector('#zipcode');
            const barangayInput = document.querySelector('#barangay');
            const provinceInput = document.querySelector('#province');
            const paymentSelected = document.querySelector('input[name="payment"]:checked');
            
            document.querySelectorAll('.error-message').forEach(msg => msg.textContent = '');
            document.querySelectorAll('input').forEach(input => input.classList.remove('error'));
            
            if (!nameInput || !nameInput.value.trim()) {
                const errorMsg = document.querySelector('#name-error');
                if (errorMsg) errorMsg.textContent = 'Name is required';
                if (nameInput) nameInput.classList.add('error');
                isValid = false;
            }
            
            if (!streetInput || !streetInput.value.trim()) {
                const errorMsg = document.querySelector('#street-error');
                if (errorMsg) errorMsg.textContent = 'Street is required';
                if (streetInput) streetInput.classList.add('error');
                isValid = false;
            }
            
            if (!zipcodeInput || !zipcodeInput.value.trim()) {
                const errorMsg = document.querySelector('#zipcode-error');
                if (errorMsg) errorMsg.textContent = 'Zip code is required';
                if (zipcodeInput) zipcodeInput.classList.add('error');
                isValid = false;
            }
            
            if (!barangayInput || !barangayInput.value.trim()) {
                const errorMsg = document.querySelector('#barangay-error');
                if (errorMsg) errorMsg.textContent = 'Barangay is required';
                if (barangayInput) barangayInput.classList.add('error');
                isValid = false;
            }
            
            if (!provinceInput || !provinceInput.value.trim()) {
                const errorMsg = document.querySelector('#province-error');
                if (errorMsg) errorMsg.textContent = 'Province is required';
                if (provinceInput) provinceInput.classList.add('error');
                isValid = false;
            }
            
            if (!paymentSelected) {
                const errorMsg = document.querySelector('#payment-error');
                if (errorMsg) errorMsg.textContent = 'Please select a payment method';
                isValid = false;
            }
            
            if (!isValid) {
                console.log('Form has errors - please fix them');
            } else {
                const total = cart.reduce((sum, item) => sum + item.price, 0);
                
                const orderData = {
                    total: total,
                    items: cart.map(item => item.name)
                };
                
                addOrder(orderData);
                
                cart = [];
                saveCart();
                
                console.log('Form submitted successfully! Order placed.');
                alert('Order placed successfully!');
                
                window.location.href = 'account.html';
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded:', window.location.pathname);
    
    loadCart();
    
    // Task 2
    if (document.querySelector('.product-grid')) {
        renderProducts();
        console.log('Products page - rendered products');
    }
    // Task 3
    if (document.querySelector('.cart-list')) {
        renderCart();
        setupQuantityListeners();
        console.log('Cart page - rendered cart with', cart.length, 'items');
    }
    // Task 4
    if (document.getElementById('checkout-form')) {
        setupFormValidation();
        const orderTotalSpan = document.getElementById('order-total');
        if (orderTotalSpan) {
            const total = cart.reduce((sum, item) => sum + item.price, 0);
            orderTotalSpan.textContent = total;
        }
        console.log('Checkout page - order total:', cart.reduce((sum, item) => sum + item.price, 0));
    }
    
    if (document.getElementById('welcome-header')) {
        initAccountPage();
    }
});