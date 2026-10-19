<?php
session_start();

$errors = [];

if (isset($_POST['submit'])) {
    // Validate roll number (only numbers, not empty)
    if (empty($_POST['rollno'])) {
        $errors['rollno'] = "Roll number is required";
    } elseif (!preg_match('/^\d+$/', $_POST['rollno'])) {
        $errors['rollno'] = "Roll number must contain only digits";
    }
    
    // Validate name (only letters and spaces, not empty)
    if (empty($_POST['name'])) {
        $errors['name'] = "Name is required";
    } elseif (!preg_match('/^[a-zA-Z\s]+$/', $_POST['name'])) {
        $errors['name'] = "Name must contain only letters and spaces";
    }
    
    // If no validation errors, proceed with login check
    if (empty($errors)) {
        if (
            isset($_SESSION['rollno']) && isset($_SESSION['name']) &&
            isset($_SESSION['dob']) && isset($_SESSION['email']) &&
            isset($_SESSION['phonenumber']) && isset($_SESSION['address'])
        ) {
            if (
                $_POST['rollno'] == $_SESSION['rollno'] &&
                $_POST['name'] == $_SESSION['name']
            ) {
                // Optional: set cookies if 'remember' is checked
                if (isset($_POST['remember'])) {
                    setcookie("name", $_POST['name'], time() + (86400 * 30), "/");
                    setcookie("rollno", $_POST['rollno'], time() + (86400 * 30), "/");
                } else {
                    setcookie("name", "", time() - 3600, "/");
                    setcookie("rollno", "", time() - 3600, "/");
                }

                $_SESSION["username"] = $_POST['name'];
                header("Location: dashbord.php");
                exit();
            } else {
                $login_error = "Invalid roll number or name.";
            }
        } else {
            $login_error = "No registration data found. Please register first.";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <style>
        .error {
            color: red;
            font-size: 0.8em;
        }
    </style>
</head>

<body>
    <?php if (isset($login_error)): ?>
        <div class="error"><?php echo $login_error; ?></div>
    <?php endif; ?>
    
    <form method="post">
        <div>
            <input type="text" name="rollno" placeholder="Roll No"
                value="<?php echo isset($_COOKIE['rollno']) ? $_COOKIE['rollno'] : ''; ?>">
            <?php if(isset($errors['rollno'])): ?>
                <span class="error"><?php echo $errors['rollno']; ?></span>
            <?php endif; ?>
        </div>
        <div>
            <input type="text" name="name" placeholder="Name"
                value="<?php echo isset($_COOKIE['name']) ? $_COOKIE['name'] : ''; ?>">
            <?php if(isset($errors['name'])): ?>
                <span class="error"><?php echo $errors['name']; ?></span>
            <?php endif; ?>
        </div>
        <div>
            <input type="checkbox" name="remember" <?php if (isset($_COOKIE['rollno']))
                echo "checked"; ?>> Remember Me
        </div>
        <div>
            <input name="submit" type="submit" value="Login">
        </div>
    </form>
</body>

</html>