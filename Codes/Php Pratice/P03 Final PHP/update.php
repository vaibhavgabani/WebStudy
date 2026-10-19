<?php
include 'connect.php';

$name = "";
$email = "";
$password = "";
$city = "";


if (isset($_POST['update'])) {
    $id =  $_POST['update'];
    $data = mysqli_query($connect, "SELECT * FROM USERS WHERE ID = {$id}");

    while ($user = mysqli_fetch_assoc($data)) {
        $id = $user["id"];
        $name = $user["name"];
        $email = $user["email"];
        $password = $user["password"];
        $city = $user["city"];

        // echo "$name $email $password $city";
    }
}

// update values in db
if (isset($_POST['DataUpdate'])) {
    $idNew = $_POST['id'];
    $nameNew = $_POST['name'];
    $emailNew = $_POST['email'];
    $passwordNew = $_POST['password'];
    $cityNew = $_POST['city'];

    echo "$nameNew $emailNew $passwordNew $passwordNew $idNew";

    $data = mysqli_query($connect,"
    UPDATE `users` 
    SET `name` = '$nameNew',
    `email` = '$emailNew', 
    `password` = '$passwordNew', 
    `city` = '$cityNew' 
    WHERE `users`.`id` = $idNew");
    header("Location: index.php");
    exit();
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
    <form action="" method="post">
        <input type="hidden" name="id" id="" value="<?php echo $id ?>">
        <div>Name :
            <input type="text" name="name" id="" value="<?php echo $name ?>">
        </div>
        <div>Email :
            <input type="email" name="email" value="<?php echo $email; ?>">
        </div>
        <div>Password :
            <input type="password" name="password" value="<?php echo $password; ?>">
        </div>
        <div>City :
            <input type="text" name="city" value="<?php echo $city; ?>">
        </div>
        <input type="submit" value="Submit" name="DataUpdate">
    </form>
</body>

</html>