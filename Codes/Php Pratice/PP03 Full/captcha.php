<?php
session_start();
$captchanumber = rand(1000,9999);
$_SESSION['captcha'] = $captchanumber;
$img = imagecreate(80,40);
imagecolorallocate($img,0,0,0);
$txt_color = imagecolorallocate($img,255,255,255);
imagestring($img,5,4,3,$captchanumber,$txt_color);
imagejpeg($img);
?>