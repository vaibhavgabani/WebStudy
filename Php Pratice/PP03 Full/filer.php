<?php 
    $stateid = $_POST['id'];
    include 'connect.php';
            $data = mysqli_query($connect,"SELECT * FROM user where state = {$stateid}");
            echo "<table border='1'>";
            while($user = mysqli_fetch_assoc($data)){
                echo "
                    <tr>
                    <td>{$user['id']}</td>
                    <td>{$user['name']}</td>
                    <td>{$user['password']}</td>
                    </tr>
                ";
            }
            echo "</table>";
?>