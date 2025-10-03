<?php
// echo "<pre>";
// var_dump($_FILES);
// echo "</pre>";

for ($i = 0; $i < count($_FILES['files']['name']); $i++) {
    $target = 'uplords/' . basename($_FILES['files']['name'][$i]);
    if (strpos($_FILES['files']['type'][$i], 'image/') === 0) {
        if (move_uploaded_file($_FILES['files']['tmp_name'][$i], $target)) {
            echo "<img src='{$target}' height='100' width='50' alt=''>";
            echo 'uplord';
        } else {
            echo 'not uplord';
        }
    } else {
        echo "{$target} is not image";
    }
}
