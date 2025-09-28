<?php
    session_start();
    
    $errors = [];
    
    // Process form submission
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
        
        // Validate date of birth (required and valid date)
        if (empty($_POST['dob'])) {
            $errors['dob'] = "Date of birth is required";
        }
        
        // If no errors, save to session
        if (empty($errors)) {
            $_SESSION["rollno"] = $_POST["rollno"];
            $_SESSION["name"] = $_POST["name"];
            $_SESSION["dob"] = $_POST["dob"];
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
            <label>Rollno</label>
            <input type="text" name="rollno" id="" value="<?php echo isset($_SESSION['rollno']) ? $_SESSION['rollno'] : ''; ?>">
            <?php if(isset($errors['rollno'])): ?>
                <span class="error"><?php echo $errors['rollno']; ?></span>
            <?php endif; ?>
        </div>
        <div>
            <label>Name</label>
            <input type="text" name="name" id="" value="<?php echo isset($_SESSION['name']) ? $_SESSION['name'] : ''; ?>">
            <?php if(isset($errors['name'])): ?>
                <span class="error"><?php echo $errors['name']; ?></span>
            <?php endif; ?>
        </div>
        <div>
            <label>Date of Birth</label>
            <input type="date" name="dob" id="" value="<?php echo isset($_SESSION['dob']) ? $_SESSION['dob'] : ''; ?>">
            <?php if(isset($errors['dob'])): ?>
                <span class="error"><?php echo $errors['dob']; ?></span>
            <?php endif; ?>
        <div>
            <input type="submit" value="Submit" name="submit">
        </div>
    </form>
    <form action="page2.php">
        <input type="submit" value="Next">
    </form>
    <?php
    if ($_REQUEST && empty($errors)) {
        print_r($_REQUEST);
    }
    ?>
</body>

</html>