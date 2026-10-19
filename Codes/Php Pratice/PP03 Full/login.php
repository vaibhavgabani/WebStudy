<?php
session_start();
use LDAP\Result;

    include 'connect.php';
    $message = "";
    if(isset($_POST['submit'])){
        if( $_SESSION['captchanumber'] != $_POST['cap']){
            $message = "enter valid captcha";
            exit;
        }
            $name = $_POST['name'];
            $password = $_POST['password'];
        if(!empty($name) && !empty($password)){
            $result = mysqli_query($connect,"select * from user where name = '{$name}' and password = '{$password}'");
            $cnt = 0;
            while($tmp = mysqli_fetch_assoc($result)){
                $_SESSION['uid'] = $tmp['id'];
                $cnt = 1;
            }

            if($cnt == 1){
                $message = "login scuessfully";
                header('Location: home.php');
            } else {
                $message = "login fail";
            }
        } else {
            $message = "fail to login";
        }
    } else {
        $message = "enter data";
    }

    if(isset($_POST['delete'])){
        $deleteid = $_POST['delete'];
        echo $deleteid;
        $result = mysqli_query($connect,"delete from user where id = {$deleteid}");
        if($result){
            $message = "user Deleted sucessfully";
        } else {
            $message = "user not Deleted sucessfully";
        }
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <title>Document</title>
</head>
<body>
    <form action="" method="post">
        <div>
            name  :
            <input type="text" name="name" id="name">
        </div>
        <div>
            password :
            <input type="password" name="password" id="password">
        </div>
        <div>
            <input type="text" name="cap" id="">
            <img src="captcha.php" alt="">
        </div>
        <input type="submit" value="submit" name="submit">
    </form>
    <div>
            STATE : 
            <select name="state" id="state" onchange="updatestate1(this.value)">
                <option value="SELECT ONE">SELECT ONE</option>
                <?php 
                    include 'connect.php';
                    $result = mysqli_query($connect,"SELECT * FROM STATE");
                    while($data = mysqli_fetch_assoc($result)){
                        echo "
                            <option value='{$data['id']}'>{$data['name']}</option>
                        ";
                    }
                ?>
            </select>
        </div>
    <div>
        <?php 
            include 'connect.php';
            $data = mysqli_query($connect,"SELECT * FROM user");
            echo "<table border='1'>";
            while($user = mysqli_fetch_assoc($data)){
                echo "
                    <tr>
                    <td>{$user['id']}</td>
                    <td>{$user['name']}</td>
                    <td>{$user['password']}</td>
                    <td><form action='' method='post'><button name='delete' value='{$user['id']}'>DELETE</button></form></td>
                    </tr>
                ";
            }
            echo "</table>";
        ?>
    </div>
    <div id="disp"></div>  
    <div>
        <span><?php echo"$message"?></span>
    </div>

    <script>
        function updatestate1(sid){
            console.log(sid);
            $.ajax({
                url : 'filer.php',
                type : 'POST',
                data : {id : sid},
                success : function(result){
                    $('#disp').html(result);
                }
            });
        }
    </script>
</body>
</html>