<?php
session_start();
$number = rand(1000,9999);
$_SESSION['number'] = $number;
$image = imagecreate(50,20);
imagecolorallocate($image,0,0,0);
$text_color = imagecolorallocate($image,255,255,255);
imagestring($image,5,4,2,$number,$text_color);
imagejpeg($image);
?>