$(document).ready(function() {
    loadCategories();
    loadProducts();
});

function loadProducts(category = "") {
    $.ajax({
        url: "./fetchProduct.php",
        method: "GET",
        dataType: "json",
        data: {category: category},
        success: function(data) {
            $("#productTable").empty();

            if(data.length > 0) {
                let colCount = 0;
                let newRow = $("<tr></tr>");

                data.forEach(function(product) {
                    let cell = `
                        <td>
                            <div class="product-card">
                                <img src="${product.image}" class="product-image" alt="${product.product_name}"/>
                                <div class="product-details">
                                    <div class="product-title">${product.product_name}</div>
                                    <div class="product-price">$${product.price}</div>
                                    <div class="product-description">Stock: ${product.stock} available</div>
                                    <button onClick="addToCart(${product.product_id})">Add to Cart</button>
                                </div>
                            </div>
                        </td>`;
                    newRow.append(cell);
                    colCount++;

                    if (colCount === 4) {
                        $("#productTable").append(newRow);
                        newRow = $("<tr></tr>");
                        colCount = 0;
                    }
                });
                if(colCount > 0) {
                    $("#productTable").append(newRow);
                }
            } else {
                $("#productTable").append("<tr><td>No products found</td></tr>");
            }
        },
        error: function () {
            alert("Failed to load products.");
        }
    });
}

function loadCategories() {
    $.ajax({
        url: "./fetchCategories.php",
        dataType: "json",
        method: "GET",
        success: function(categories) {
            let list = $("#list");
            list.empty();
            list.append(`<li><a href="#" onclick="clickCategory('')">All</a></li>`);
            categories.forEach(function(cat) {
                list.append(`<li><a href="#" onclick="clickCategory('${cat.category_name}')">${cat.category_name}</a></li>`);
            });
        }
    });
}

function clickCategory(cate = "") {
    loadProducts(cate);
}

function addToCart(product_id) {
    $.ajax({
        url: "./addToCart.php",
        dataType: "json",
        method: "POST",
        data: {product_id: product_id},
        success: function(response) {
            if(response.status == "success") {
                alert("Product added to cart");
                // Delay the redirect to ensure the database operation is complete
                setTimeout(function() {
                    window.location.href = "./cart.php";
                }, 200); // 200ms delay
            } else if(response.message == "Login is must") {
                alert("Login is must");
                window.location.href = "./login.php";
            } else {
                alert(response.message);
            }
        }
    });
}