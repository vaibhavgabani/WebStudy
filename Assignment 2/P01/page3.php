<?php
    session_start();
    
    $errors = [];
    
    // Store form data in temporary variables
    $email = isset($_SESSION['email']) ? $_SESSION['email'] : '';
    $phonenumber = isset($_SESSION['phonenumber']) ? $_SESSION['phonenumber'] : '';
    $address = isset($_SESSION['address']) ? $_SESSION['address'] : '';
    
    // Process form submission
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['submit'])) {
        // Validate email (proper email format, not empty)
        if (empty($_POST['email'])) {
            $errors['email'] = "Email is required";
        } elseif (!preg_match('/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/', $_POST['email'])) {
            $errors['email'] = "Please enter a valid email address";
        }
        
        // Validate phone number (10 digits, not empty)
        if (empty($_POST['phonenumber'])) {
            $errors['phonenumber'] = "Phone number is required";
        } elseif (!preg_match('/^[0-9]{10}$/', $_POST['phonenumber'])) {
            $errors['phonenumber'] = "Phone number must be 10 digits";
        }
        
        // Validate address (not empty, alphanumeric and some special characters)
        if (empty($_POST['address'])) {
            $errors['address'] = "Address is required";
        } elseif (!preg_match('/^[a-zA-Z0-9\s,.#\-]+$/', $_POST['address'])) {
            $errors['address'] = "Address contains invalid characters";
        }
        
        // If no errors, save to session and redirect
        if (empty($errors)) {
            $_SESSION["email"] = $_POST["email"];
            $_SESSION["phonenumber"] = $_POST["phonenumber"];
            $_SESSION["address"] = $_POST["address"];
            
            // Update temporary variables
            $email = $_POST["email"];
            $phonenumber = $_POST["phonenumber"];
            $address = $_POST["address"];
            
            header("Location: final.php");
            exit();
        } else {
            // For debugging
            print_r($errors);
        }
    }
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .error {
            color: red;
            font-size: 0.8em;
        }
    </style>
</head>

<body>
    <form action="" method="post">
        <div>
            <label>Email</label>
            <input type="email" name="email" id="" value="<?php echo $email; ?>">
            <?php if(isset($errors['email'])): ?>
                <span class="error"><?php echo $errors['email']; ?></span>
            <?php endif; ?>
        </div>
        <div>
            <label>Phone Number</label>
            <input type="text" name="phonenumber" id="" value="<?php echo $phonenumber; ?>">
            <?php if(isset($errors['phonenumber'])): ?>
                <span class="error"><?php echo $errors['phonenumber']; ?></span>
            <?php endif; ?>
        </div>
        <div>
            <label>Address</label>
            <input type="text" name="address" id="" value="<?php echo $address; ?>">
            <?php if(isset($errors['address'])): ?>
                <span class="error"><?php echo $errors['address']; ?></span>
            <?php endif; ?>
        </div>
        <div>
            <input type="submit" name="submit" value="Submit">
        </div>
    </form>
    <br>
    <form action="page2.php" method="get">
        <input type="submit" value="Previous">
    </form>
</body>

</html>