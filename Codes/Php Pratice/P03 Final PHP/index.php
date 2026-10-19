<?php
    include 'connect.php';

    $data = mysqli_query($connect,'SELECT * FROM USERS');

    echo "<button><a href='insert.html'>Insert</a></button>";

    echo "<table border='1'>";
    echo "
        <tr>
                <td>id</td>
                <td>image</td>
                <td>name</td>
                <td>email</td>
                <td>password</td>
                <td>city</td>
                <td>Delete</td>
                <td>Edit</td>
            </tr>
    ";
    while($user = mysqli_fetch_assoc($data)){
        // print_r($user);
        echo "
            <tr>
                <td>{$user['id']}</td>
                <td><img src='{$user['photo']}' height='50' width='50' alt='{$user['id']}'></td>
                <td>{$user['name']}</td>
                <td>{$user['email']}</td>
                <td>{$user['password']}</td>
                <td>{$user['city']}</td>
                <td><form action='' method='post'><button name='delete' value='{$user['id']}'>Delete</button></form></td>
                <td><form action='update.php' method='post'><button name='update' value='{$user['id']}'>Edit</button></form></td>
            </tr>
        ";
    }
    echo "</table>";

    // delete value from table
    if(isset($_POST['delete'])){
        $userid = $_POST['delete'];
        $delete = mysqli_query($connect,"DELETE FROM USERS WHERE ID = {$userid}");
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>