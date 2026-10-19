<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard</title>
    <link rel="stylesheet" href="styles.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="./fetchAdminDashboard.js"></script>
</head>

<body>

    <?php
    session_start();
    ?>

    <div class="menu">
        <div class="logo">Admin Dashboard</div>
        <div>
            <button><a href="./addItem.php">Add Items</a></button>
            <button id="manageProductsBtn">Manage Products</button>
            <button id="manageUsersBtn">Manage Users</button>
            <button><a href="./login.php"><?php if (isset($_SESSION['name'])) echo $_SESSION['name'], " (Logout)"; ?></a></button>
        </div>
    </div>

    <div class="category-menu" id="categoryMenu">
        <h3>Categories</h3>
        <center><input type="text" id="newCategoryName" placeholder="New Category Name"/></center><br/><br>
        <center><button id="addCategoryButton">Add Category</button></center>
        <ul id="categoryList"></ul>
    </div>

    <div class="dashboard">
        <h2>Welcome to your Dashboard</h2>
        <div id="table-container"></div>
    </div>

</body>

</html>