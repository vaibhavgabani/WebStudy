<?php
include 'connect.php';

if(isset($_POST['submit'])){
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $image = 'uplords/'. basename($_FILES['image']['name']);
    $city = $_POST['city'];

    // debug 
    // echo "$name $email $password $city $image";
    // var_dump($_FILES['image']);

    // transfer image to folder 
    if(strrpos($_FILES['image']['type'],'image/') === 0){
        if(move_uploaded_file($_FILES['image']['tmp_name'],$image)){
            //insert record in db
            $data = mysqli_query($connect,"
                INSERT INTO `users` (`name`, `email`, `password`, `photo`, `city`) VALUES 
                ('$name', '$email', '$password', '$image', '$city')
            ");
        } else {
            echo "there is problm in image uplord";
        }
    } else {
        echo $_FILES['image']['name'] . " is not image";
    }
    header("Location: index.php");
    exit();
}
?>