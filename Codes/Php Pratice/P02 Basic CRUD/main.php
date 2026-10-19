<?php
include 'connection.php';


$resut = mysqli_query($connect, "SELECT * FROM STUDENT");

echo '<table border="1">';
echo '
        <tr>
            <td>id</td>
            <td>name</td>
            <td>dept</td>
            <td>Delete</td>
            <td>Edit</td>
        </tr>
    ';
while ($student = mysqli_fetch_assoc($resut)) {  
    print_r($student);
    echo "
    <tr>
            <td>{$student["id"]}</td>
            <td>{$student["name"]}</td>
            <td>{$student["dept"]}</td>
            <td><form action='' method='post'><button name=delete value='{$student["id"]}'>Delete</button></form></td>
            <td><form action='update.php' method='post'><button name=update value='{$student["id"]}'>Edit</button></form></td>
        </tr>";
}
echo '</table>';


if ($_POST["delete"]) {
    // echo $_POST["delete"];
    mysqli_query($connect,"delete from student where id = {$_POST["delete"]}");
    header("Location: main.php");
    exit();
}
