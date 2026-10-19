<?php
    $localhost = "localhost";
    $dbuser = "root";
    $dbpass = "";
    $dbname = "testdb";

    try{
    $connect = new mysqli($localhost,$dbuser,$dbpass,$dbname);
    } catch (Exception $error){
        echo $error->getMessage();
    }
?>