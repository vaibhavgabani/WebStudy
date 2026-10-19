<?php
    include 'connection.php';
    $id = $_POST['stateidpost'];
    $data = mysqli_query($connect,"select * from citys where stateid = {$id}");

    echo "<option value='Select One'>Select One</option>";
    while($city = mysqli_fetch_assoc($data)){
        echo "<option value='{$city['cityid']}'>{$city['name']}</option>";
    }
?>