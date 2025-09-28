<?php
    session_start();
    
    $errors = [];
    
    // Store form data in temporary variables
    $course = isset($_SESSION['course']) ? $_SESSION['course'] : '';
    $semester = isset($_SESSION['semester']) ? $_SESSION['semester'] : '';
    $percentage = isset($_SESSION['percentage']) ? $_SESSION['percentage'] : '';
    
    // Process form submission
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['submit'])) {
        // Validate course (only letters, spaces and some special characters, not empty)
        if (empty($_POST['course'])) {
            $errors['course'] = "Course is required";
        } elseif (!preg_match('/^[a-zA-Z\s\-&.]+$/', $_POST['course'])) {
            $errors['course'] = "Course name contains invalid characters";
        }
        
        // Validate semester (numbers between 1-8, not empty)
        if (empty($_POST['semester'])) {
            $errors['semester'] = "Semester is required";
        } elseif (!preg_match('/^[1-8]$/', $_POST['semester'])) {
            $errors['semester'] = "Semester must be a number between 1 and 8";
        }
        
        // Validate percentage (numbers between 0-100, not empty)
        if (empty($_POST['percentage'])) {
            $errors['percentage'] = "Percentage is required";
        } elseif (!preg_match('/^(100|[0-9]{1,2})(\.[0-9]{1,2})?$/', $_POST['percentage'])) {
            $errors['percentage'] = "Percentage must be a number between 0 and 100";
        }
        
        // If no errors, save to session
        if (empty($errors)) {
            $_SESSION["course"] = $_POST["course"];
            $_SESSION["semester"] = $_POST["semester"];
            $_SESSION["percentage"] = $_POST["percentage"];
            
            // Update the temporary variables
            $course = $_POST["course"];
            $semester = $_POST["semester"];
            $percentage = $_POST["percentage"];
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
            <label>Course</label>
            <input type="text" name="course" id="" value="<?php echo $course; ?>">
            <?php if(isset($errors['course'])): ?>
                <span class="error"><?php echo $errors['course']; ?></span>
            <?php endif; ?>
        </div>
        <div>
            <label>Semester</label>
            <input type="number" name="semester" id="" value="<?php echo $semester; ?>">
            <?php if(isset($errors['semester'])): ?>
                <span class="error"><?php echo $errors['semester']; ?></span>
            <?php endif; ?>
        </div>
        <div>
            <label>Percentage</label>
            <input type="number" step="0.01" name="percentage" id="" value="<?php echo $percentage; ?>">
            <?php if(isset($errors['percentage'])): ?>
                <span class="error"><?php echo $errors['percentage']; ?></span>
            <?php endif; ?>
        </div>
        <div>
            <input type="submit" name="submit" value="Submit">
        </div>
    </form>
    <form action="index.php" method="get">
        <input type="submit" value="Previous">
    </form>
    <form action="page3.php" method="get">   
        <input type="submit" value="Next">
    </form>
    <?php
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && empty($errors)) {
        print_r($_POST);
    }
    ?>
</body>

</html>