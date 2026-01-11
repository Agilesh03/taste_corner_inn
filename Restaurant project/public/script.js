// Function to update the total price
function updateTotal() {
    let total = 0;
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        const price = parseFloat(item.getAttribute('data-price'));
        const quantity = parseInt(item.querySelector('.quantity').value);

        if (!isNaN(price) && !isNaN(quantity)) {
            total += price * quantity;
        }
    });

    document.getElementById('total-price').textContent = `${total.toFixed(2)}`;
}

// Add event listeners to quantity inputs for live updates
document.querySelectorAll('.quantity').forEach(input => {
    input.addEventListener('input', () => {
        updateTotal();
    });
});

// Event listener for "Order Now" buttons
document.querySelectorAll('.order-btn').forEach((button, index) => {
    button.addEventListener('click', () => {
        const menuItem = document.querySelectorAll('.menu-item')[index];
        const quantityInput = menuItem.querySelector('.quantity');

        // Increase the quantity by 1 when "Order Now" is clicked
        quantityInput.value = parseInt(quantityInput.value) + 1;

        // Update the total after clicking "Order Now"
        updateTotal();

        // Visual confirmation for the user
        button.textContent = 'Added!';
        setTimeout(() => {
            button.textContent = 'Order Now';
        }, 1000);
    });
});

// Event listener for "Proceed to Checkout" button
document.getElementById('checkout-btn').addEventListener('click', () => {
    document.getElementById('order-modal').style.display = 'flex';
    updateOrderSummary();
});

// Event listener to close the modal
document.querySelector('.close-btn').addEventListener('click', () => {
    document.getElementById('order-modal').style.display = 'none';
});

// Function to update the order summary in the modal
function updateOrderSummary() {
    const summary = document.getElementById('order-summary');
    summary.innerHTML = '';

    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        const name = item.querySelector('h3').textContent;
        const price = parseFloat(item.getAttribute('data-price'));
        const quantity = parseInt(item.querySelector('.quantity').value);

        if (quantity > 0) {
            const totalPrice = price * quantity;
            const orderItem = document.createElement('div');
            orderItem.classList.add('order-item');
            orderItem.innerHTML = `<p>${name} x ${quantity} = ₹${totalPrice.toFixed(2)}</p>`;
            summary.appendChild(orderItem);
        }
    });

    updateTotal();
}

// Event listener for form submission
document.getElementById('order-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    if (name && address && phone && email) {
        document.getElementById('order-form').style.display = 'none';
        document.getElementById('confirmation-message').style.display = 'block';

        // Reset the form and quantities after submission
        document.getElementById('order-form').reset();
        document.querySelectorAll('.quantity').forEach(input => (input.value = 0));
        updateTotal();

        setTimeout(() => {
            document.getElementById('order-modal').style.display = 'none';
            document.getElementById('order-form').style.display = 'block';
            document.getElementById('confirmation-message').style.display = 'none';
        }, 2000);
    } else {
        alert('Please fill out all fields!');
    }
});

// Call updateTotal initially
updateTotal();














