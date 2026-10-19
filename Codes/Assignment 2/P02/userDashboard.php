<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Dashboard</title>
    <link rel="stylesheet" href="styles.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="./fetchProducts.js"></script>
</head>

<body>

    <?php
    session_start();
    ?>

    <!-- Menu -->
    <div class="menu">
        <div class="logo">Shopping Dashboard</div>
        <div>
            <button><a href="./cart.php">Cart</a></button>
            <button><a href="./logout.php"><?php if(isset($_SESSION['name'])) echo $_SESSION['name'],"(Logout)" ?> </a></button>
        </div>
    </div>

    <div class="category-menu" id="categoryMenu">
        <h3>Categories</h3>
        <ul id="list">
        </ul>
    </div>

    <!-- Dashboard Content -->
    <div class="dashboard">

        <br><br>

        <!-- Products Table -->
        <table id="productTable">
            <tr></tr>
        </table>

    </div>

</body>

</html>