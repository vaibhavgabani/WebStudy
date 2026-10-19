<?php
session_start();

// DEBUG
echo "<pre>";
var_dump($_FILES);
echo "</pre>";

//MAIN 
if ($_POST['captcha_data'] == $_SESSION['number']) {
    for ($i = 0; $i < count($_FILES['files']['name']); $i++) {
        $targetdir = 'uplords/' . basename($_FILES['files']['name'][$i]);
        if (strpos($_FILES['files']['type'][$i], 'image/') === 0) {
            if (move_uploaded_file($_FILES['files']['tmp_name'][$i], $targetdir)) {
                echo 'file uplord';
                echo "<img src='{$targetdir}' height='100' width='50' alt=''>";
            }
        } else {
            echo 'uplord only image';
        }
    }
} else {
    echo '<br>not valid';
}
