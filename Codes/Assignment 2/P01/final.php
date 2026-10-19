<?php
session_start();    
?>
<!DOCTYPE html>
<html>
<head>
    <title>Student Details</title>
</head>
<body>
<?php
if (!isset($_SESSION['rollno']) || !isset($_SESSION['name']) || !isset($_SESSION['dob']) || !isset($_SESSION['email']) || !isset($_SESSION['phonenumber']) || !isset($_SESSION['address'])) {
   echo "Please fill in all fields.";
} else {
    echo '
        <table border="2">
        <tr>
            <th>Roll No</th>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
        </tr>
        <tr>
            <th>'.$_SESSION['rollno'].'</th>
            <th>'.$_SESSION['name'].'</th>
            <th>'.$_SESSION['dob'].'</th>
            <th>'.$_SESSION['email'].'</th>
            <th>'.$_SESSION['phonenumber'].'</th>
            <th>'.$_SESSION['address'].'</th>
        </tr>
    </table>
    ';
}
?>
    <div>
        <a href="./login.php">Login</a>
    </div>
</body>
</html>