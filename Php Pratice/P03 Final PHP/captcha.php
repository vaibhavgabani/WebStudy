<?php
session_start();
$number = rand(1000,9999);
$_SESSION['captcha_number'] = $number;
$image = imagecreate(50,25);
imagecolorallocate($image,0,0,0);
$image_text = imagecolorallocate($image,255,255,255);
imagestring($image,5,4,2,$number,$image_text);
imagejpeg($image); 
?>