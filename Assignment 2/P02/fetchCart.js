let totalPrice = 0;
let totalProducts = 0;

$(document).ready(function() {
    loadCartItems();
});

function loadCartItems() {
    totalPrice = 0;
    totalProducts = 0;
    $.ajax({
        url: "./fetchCartItems.php",
        dataType: "json",
        method: "GET",
        success: function(data) {
            $("#cartTable").empty();
            if(data.length > 0) {
                let newRow = $("<tr></tr>");
                data.forEach(function(product) {
                    let cell = `
                        <td style="width: 150px;">
                            <img src="${product.ProductImage}" alt="${product.ProductName}" style="width: 100%; border-radius: 8px; object-fit: cover; height: 150px;"/>
                        </td>
                        <td>
                            <div style="padding: 10px;">
                                <h3 style="color: #1f2937; margin-bottom: 10px;">${product.ProductName}</h3>
                                <p style="color: #4b5563; margin-bottom: 5px;">Category: ${product.CategoryName}</p>
                                <p style="color: #2563eb; font-weight: 600; font-size: 18px; margin-bottom: 5px;">Price: $${product.Price}</p>
                                <p style="margin-bottom: 15px;">Quantity: ${product.Quantity}</p>
                                <button onClick="removeFromCart(${product.product_id})" style="background-color: #ef4444;">Remove Product</button>
                            </div>
                        </td>`;
                        totalProducts++;
                        totalPrice += (product.Price * product.Quantity);
                    newRow.append(cell);
                    $("#cartTable").append(newRow);
                    newRow = $("<tr></tr>");
                });
            } else {
                $("#cartTable").append("<tr><td>No products found</td></tr>");
            }
            calculateCart();
        }       
    });
}

function removeFromCart(product_id) {
    $.ajax({
        url: "removeItemFromCart.php",
        dataType: "json",
        data: {product_id: product_id},
        method: "POST",
        success: function(response) {
            if(response.status == "success") {
                alert(response.message);
                loadCartItems();
            } else {
                alert(response.message);
            }
        }
    });
}

function calculateCart() {
    $("#priceDetail").empty(); // Clear existing content
    
    // Clear any previously appended content to avoid duplication
    $(".cart-summary").remove();
    
    // Create a styled cart summary
    let cartSummary = `
        <div class="cart-summary" style="background-color: white; border-radius: 8px; padding: 15px; margin-top: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
            <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                <span>Products</span>
                <span>${totalProducts}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                <span>Total Price</span>
                <span style="font-weight: bold;">$${totalPrice}</span>
            </div>
    `;
    
    // Calculate delivery date
    let currentDate = new Date();
    let randomDays = Math.floor(Math.random() * 5) + 1;
    currentDate.setDate(currentDate.getDate() + randomDays);
    let deliveryDate = currentDate.toDateString();
    
    cartSummary += `
            <div style="margin-top: 15px;">
                <p style="margin-bottom: 5px;">Delivery expected by:</p>
                <p style="color: #10b981; font-weight: bold;">${deliveryDate}</p>
            </div>
            <button style="width: 100%; margin-top: 15px; background-color: #10b981;">Proceed to Checkout</button>
        </div>
    `;
    
    $("#cart-menu").append(cartSummary);
}