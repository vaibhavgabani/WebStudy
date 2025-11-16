<?php
    $connect = "localhost";
    $dbname = "testdb";
    $root = "root";
    $password = "";

    try {
        $connect = mysqli_connect($connect,$root,$password,$dbname);
        // echo "connect";
    } catch(Exception $err){
        echo $err->getMessage();
    }
?>