<?php
$host = "localhost";
$user = "root";
$password = "";
$dbname = "testdb";

try {
    $connect = new mysqli($host, $user, $password, $dbname);
} catch (Exception $err) {
    echo $err->getMessage();
}
