<?php 
    include 'connect.php';
    $stid = $_POST['stateidpost'];
    $result = mysqli_query($connect,"SELECT * FROM citys WHERE stateid = {$stid}");

    while($data = mysqli_fetch_assoc($result)){
        echo "
            <option value='{$data['cityid']}'>{$data['name']}</option>
        ";
    }
?>
<!-- 


<?php
    include 'connect.php'; // or connection.php, just be consistent!
    $id = $_POST['stateidpost'];
    $data = mysqli_query($connect,"SELECT * FROM citys WHERE stateid = {$id}");
    while($city = mysqli_fetch_assoc($data)){
        echo "<option value='{$city['cityid']}'>{$city['name']}</option>";
    }
?> -->
