<?php 
    include 'connect.php';
    $sid = $_POST['stateid'];
    $res = mysqli_query($connect,"select * from city where stateid = {$sid}");
    echo "<option value='SELECT ONE'>SELECT ONE</option>";
    while($city = mysqli_fetch_assoc($res)){
        echo "
            <option value='{$city['id']}'>{$city['name']}</option>
        ";
    }

?>