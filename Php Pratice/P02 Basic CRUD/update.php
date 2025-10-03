<?php
include 'connection.php';

// Check if update is set before using it
if (isset($_POST["update"])) {
    echo $_POST["update"];

    $data = mysqli_query($connect, "SELECT * FROM student WHERE id = {$_POST["update"]} ");
    
    $id = "";
    $name = "";
    $dept = "";
    while ($student = mysqli_fetch_assoc($data)) {
        $id = $student["id"];
        $name = $student["name"];
        $dept = $student["dept"];

        echo "$id $name $dept";
    }
} else {
    // If no update id, set default empty values
    $id = $name = $dept = "";
}

// Run update query only if form is submitted with all fields
if (isset($_POST['name'], $_POST['dept'], $_POST['update'])) {
    mysqli_query($connect, "UPDATE student SET name = '{$_POST['name']}', dept = '{$_POST['dept']}' WHERE id = {$_POST["update"]}");
    header("Location : main.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Update Student</title>
</head>
<body>
    <form action="" method="post">
        <!-- Hidden field to send student ID -->
        <input type="hidden" name="update" value="<?php echo htmlspecialchars($id); ?>">
        <div>
            name : <input type="text" name="name" value="<?php echo htmlspecialchars($name); ?>">
        </div>
        <div>
            dept : <input type="text" name="dept" value="<?php echo htmlspecialchars($dept); ?>">
        </div>
        <input type="submit" value="submit">
    </form>
</body>
</html>
