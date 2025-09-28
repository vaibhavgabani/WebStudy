$(document).ready(function() {
    loadCategories();
    loadAdminProducts();

    $("#addCategoryButton").click(function() {
        const newCategoryName = $("#newCategoryName").val();
        if (newCategoryName) {
            $.ajax({
                url: "./addCategory.php",
                method: "POST",
                dataType: "json",
                data: {category_name: newCategoryName},
                success: function(response) {
                    if (response.status === "success") {
                        alert(response.message);
                        $("#newCategoryName").val("");
                        loadCategories();
                    } else {
                        alert(response.message);
                    }
                },
                error: function() {
                    alert("Failed to add category. Please try again.");
                }
            });
        } else {
            alert("Please enter a category name.");
        }
    });

    $("#manageProductsBtn").click(function() {
        loadAdminProducts();
    });

    $("#manageUsersBtn").click(function() {
        loadUsers();
    });

    // Event delegation for the product delete button
    $(document).on("click", ".delete-product-btn", function() {
        const productId = $(this).data("product-id");
        if (confirm("Are you sure you want to delete this product?")) {
            $.ajax({
                url: "./deleteProduct.php",
                method: "POST",
                dataType: "json",
                data: {product_id: productId},
                success: function(response) {
                    if (response.status === "success") {
                        alert(response.message);
                        loadAdminProducts();
                    } else {
                        alert(response.message);
                    }
                },
                error: function() {
                    alert("Failed to delete product. Please try again.");
                }
            });
        }
    });

    // Event delegation for the user status link
    $(document).on("click", ".status-link", function() {
        const userId = $(this).data("user-id");
        const currentStatus = $(this).data("status");
        const newStatus = (currentStatus === "active") ? "block" : "active";

        $.ajax({
            url: "./updateUserStatus.php",
            method: "POST",
            dataType: "json",
            data: {user_id: userId, new_status: newStatus},
            success: function(response) {
                if (response.status === "success") {
                    alert(response.message);
                    loadUsers();
                } else {
                    alert(response.message);
                }
            },
            error: function() {
                alert("Failed to update user status.");
            }
        });
    });

    // New event delegation for the category delete button
    $(document).on("click", ".delete-category-btn", function() {
        const categoryId = $(this).data("category-id");
        if (confirm("Are you sure you want to delete this category?")) {
            $.ajax({
                url: "./deleteCategory.php",
                method: "POST",
                dataType: "json",
                data: {category_id: categoryId},
                success: function(response) {
                    if (response.status === "success") {
                        alert(response.message);
                        loadCategories(); // Reload the category list
                    } else {
                        alert(response.message);
                    }
                },
                error: function() {
                    alert("Failed to delete category. Please try again.");
                }
            });
        }
    });
});

function loadCategories() {
    $.ajax({
        url: "./fetchCategories.php",
        dataType: "json",
        method: "GET",
        success: function(categories) {
            let list = $("#categoryList");
            list.empty();
            categories.forEach(function(cat) {
                // Updated category display with better styling
                list.append(`
                    <li>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span>${cat.category_name}</span>
                            <button class="delete-category-btn" data-category-id="${cat.category_id}" 
                                   style="background-color: #ef4444; width: 25px; height: 25px; 
                                          border-radius: 50%; padding: 0; display: flex; 
                                          align-items: center; justify-content: center;">
                                &times;
                            </button>
                        </div>
                    </li>
                `);
            });
        }
    });
}

function loadAdminProducts() {
    $.ajax({
        url: "./fetchAdminProducts.php",
        method: "GET",
        dataType: "json",
        success: function(data) {
            $("#table-container").empty();
            let productTable = `
                <h3 style="margin-bottom: 20px;">Product Management</h3>
                <table style="width:100%">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            
            if (data.length > 0) {
                data.forEach(function(product) {
                    productTable += `<tr>
                        <td>${product.product_id}</td>
                        <td><img src="${product.image}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 4px;"/></td>
                        <td>${product.product_name}</td>
                        <td>$${product.price}</td>
                        <td>${product.stock}</td>
                        <td><button class="delete-product-btn" data-product-id="${product.product_id}" style="background-color: #ef4444;">Remove</button></td>
                    </tr>`;
                });
            } else {
                productTable += `<tr><td colspan="6" style="text-align: center; padding: 20px;">No products found</td></tr>`;
            }
            
            productTable += `</tbody></table>`;
            $("#table-container").append(productTable);
        },
        error: function() {
            alert("Failed to load products.");
        }
    });
}

function loadUsers() {
    $.ajax({
        url: "./fetchUsers.php",
        method: "GET",
        dataType: "json",
        success: function(data) {
            $("#table-container").empty();
            let usersTable = `
                <h3 style="margin-bottom: 20px;">User Management</h3>
                <table style="width:100%">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            
            if (data.length > 0) {
                data.forEach(function(user) {
                    const statusClass = user.status === 'active' ? 'status-active' : 'status-blocked';
                    usersTable += `<tr>
                        <td>${user.user_id}</td>
                        <td>${user.username}</td>
                        <td>
                            <span class="status-link" data-user-id="${user.user_id}" data-status="${user.status}" 
                                  style="cursor: pointer; padding: 5px 10px; border-radius: 15px; 
                                         background-color: ${user.status === 'active' ? '#10b981' : '#ef4444'}; 
                                         color: white; font-size: 14px;">
                                ${user.status}
                            </span>
                        </td>
                    </tr>`;
                });
            } else {
                usersTable += `<tr><td colspan="3" style="text-align: center; padding: 20px;">No users found</td></tr>`;
            }
            
            usersTable += `</tbody></table>`;
            $("#table-container").append(usersTable);
        },
        error: function() {
            alert("Failed to load users.");
        }
    });
}