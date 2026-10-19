<?php 

    try{
        $connect = mysqli_connect("localhost","root","","testmater");
        // echo "connect";
    } catch(Exception $err){
        echo $err->getMessage();
    }
?>