<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add New Item</title>
    <link rel="stylesheet" href="styles.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="./insertItem.js"></script>
</head>

<body>
    <div class="menu">
        <div class="logo">Add New Product</div>
        <div>
            <button><a href="./adminDashboard.php">Back to Dashboard</a></button>
        </div>
    </div>
    
    <div style="margin-top: 80px; display: flex; justify-content: center;">
        <form action="" method="post" id="addItem" enctype="multipart/form-data" style="width: 500px;">

        <label for="productName">Product Name : </label>
        <input type="text" name="productName" id="productName" />
        <span id="errName" style="color:red"></span>
        <br /><br />

        <label for="category">Select category : </label>
        <select name="category" id="category">
        </select>
        <br /><br />

        <label for="price">Enter Price : </label>
        <!-- <input type="number" name="" id=""> -->
        <input type="number" name="price" id="price" />
        <span id="errPrice" style="color:red"></span>
        <br /><br />

        <label for="stock">Enter Stock : </label>
        <input type="number" name="stock" id="stock" />
        <span id="errStock" style="color:red"></span>
        <br /><br />

        <label for="image">Select Image : </label>
        <input type="file" name="uploadImage" id="uploadImage" />
        <span id="errImage" style="color:red"></span>
        <br /><br />

       

        <input type="submit" name="submit" value="Add" />

    </form>
    </div>

</body>

</html>