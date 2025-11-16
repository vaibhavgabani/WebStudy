<?php 
include 'connect.php';
session_start();
$uid = $_SESSION['uid'];



    $name =  "";
    $password =  "";

    $result = mysqli_query($connect,"SELECT * FROM USER where id = {$uid}");

    while($user = mysqli_fetch_assoc($result)){
        $uid = $user['id'];
        $name = $user['name'];
        $password = $user['password'];
    }

    if(isset($_POST['submit'])){
        $newname = $_POST['name'];
        $newpassword = $_POST['password'];
        // echo $newname . $newpassword;
        $result = mysqli_query($connect,"UPDATE user set name = '{$newname}' , password = '{$newpassword}' where id = {$uid}");
        
        header('Location:login.php');
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
        <div>
            name  :
            <input type="text" name="name" id="name" value="<?php echo $name?>">
        </div>
        <div>
            password :
            <input type="text" name="password" id="password" value="<?php echo $password?>">
        </div>
        <input type="submit" value="submit" name="submit">
    </form>
    <select name="select" id=""></select>
</body>
</html>