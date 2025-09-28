<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shopping Cart</title>
    <link rel="stylesheet" href="styles.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="./fetchCart.js"></script>
</head>
<body>
    <div class="menu">
        <div class="logo">Shopping Cart</div>
        <div>
            <button><a href="./userDashboard.php">Back to Dashboard</a></button>
        </div>
    </div>

    <div class="dashboard">
        <table id="cartTable">
            <tr></tr>
        </table>
    </div>

    <div class="cart-menu" id="cart-menu">
        <h3>Cart</h3>
        <ul id="priceDetail">
        </ul>
    </div>
</body>
</html>