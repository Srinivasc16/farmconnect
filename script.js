// Populate Explore Section
function populateExploreSection() {
    const exploreSection = document.getElementById('exploreSection');
    
    exploreVegetables.forEach(veg => {
        const exploreCard = document.createElement('div');
        exploreCard.className = 'explore-card';
        exploreCard.innerHTML = `
            <div class="explore-card-icon">${veg.icon}</div>
            <h3>${veg.name}</h3>
            <p>${veg.description}</p>
            <div class="explore-card-actions">
                <span>$${veg.price.toFixed(2)}</span>
                <button class="add-to-cart-btn" onclick='addToCart({ name: "${veg.name}", price: ${veg.price}, icon: "${veg.icon}" })'>Add to Cart</button>
            </div>
        `;
        exploreSection.appendChild(exploreCard);
    });
}

// Add click event to vegetable cards to open modal
document.querySelectorAll('.vegetable-card').forEach(card => {
    card.addEventListener('click', (e) => {
        const categoryName = card.querySelector('h3').textContent;
        openModal(categoryName);
    });
});

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('vegetableModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Open modal function
function openModal(categoryName) {
    const modal = document.getElementById('vegetableModal');
    const vegetableList = document.getElementById('vegetableList');
    const categoryTitle = document.getElementById('categoryTitle');

    // Clear previous content
    vegetableList.innerHTML = '';
    categoryTitle.textContent = categoryName;

    // Add vegetables for the selected category
    vegetableCategories[categoryName].forEach(veg => {
        const vegElement = document.createElement('div');
        vegElement.className = 'vegetable-item';
        vegElement.innerHTML = `
            <div class="veg-icon">${veg.icon}</div>
            <h4>${veg.name}</h4>
            <p>$${veg.price.toFixed(2)}</p>
            <button class="add-to-cart-btn" onclick="addToCart('${veg.name}', ${veg.price})">Add to Cart</button>
        `;
        vegetableList.appendChild(vegElement);
    });

    modal.style.display = 'block';
}

// Close modal function
function closeModal() {
    const modal = document.getElementById('vegetableModal');
    modal.style.display = 'none';
}

// Add to cart function
function addToCart(name, price) {
    // If item already exists, increase quantity
    if (cart[name]) {
        cart[name].quantity += 1;
    } else {
        // Add new item to cart
        cart[name] = { name, price, quantity: 1 };
    }

    updateCartDisplay();
}

// Update cart display function
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartItemsList = document.getElementById('cartItemsList');
    const sideCartTotal = document.getElementById('sidebarCartTotal');

    // Clear previous cart items
    cartItems.innerHTML = '';
    cartItemsList.innerHTML = '';

    // Populate cart items
    Object.values(cart).forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            ${item.name} - $${(item.price * item.quantity).toFixed(2)}
            <span class="quantity-badge">${item.quantity}</span>
        `;
        cartItems.appendChild(cartItem);

        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <span>${item.name}</span>
            <div class="cart-item-actions">
                <button onclick="removeFromCart('${item.name}')">-</button>
                <span>${item.quantity}</span>
                <button onclick="addToCart(${JSON.stringify(item)})">+</button>
                $${(item.price * item.quantity).toFixed(2)}
            </div>
        `;
        cartItemsList.appendChild(cartItemElement);
    });

    // Calculate total
    const total = Object.values(cart).reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    document.getElementById('sidebarCartTotal').textContent = `Total: $${total.toFixed(2)}`; 
}

// Remove from cart function
function removeFromCart(itemName) {
    if (cart[itemName]) {
        if (cart[itemName].quantity > 1) {
            cart[itemName].quantity -= 1;
        } else {
            delete cart[itemName];
        }
        updateCartDisplay();
    }
}

// Toggle side cart function
function toggleSideCart() {
    const sideCart = document.getElementById('sideCart');
    sideCart.classList.toggle('open');
}

// Scroll products function
function scrollProducts(containerId, direction) {
    const container = document.getElementById(containerId);
    const scrollAmount = container.clientWidth;
    container.scrollBy({
        top: 0,
        left: scrollAmount * direction,
        behavior: 'smooth'
    });
}

document.addEventListener('DOMContentLoaded', populateExploreSection);