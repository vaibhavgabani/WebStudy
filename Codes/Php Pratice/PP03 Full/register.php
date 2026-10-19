<?php 
    include 'connect.php';
    if(isset($_POST['submit'])){
        $name = $_POST['name'];
        $state = $_POST['state'];
        $city = $_POST['city'];
        $password = $_POST['password'];
        

        echo "$name $state $city";
        $dir = 'uplords/' . basename($_FILES['file']['name']);
        // if(strrpos($_FILES['file']['name'],'image/')===0){
            if(move_uploaded_file($_FILES['file']['tmp_name'],$dir)){
            echo "file uplord done!!!";
            // } else {
            //     exit();
            // }
        } else {
            echo "only image ";
            exit();
        }
        

        $result = mysqli_query($connect,"INSERT INTO `user` (`id`, `name`, `state`, `city`, `password`) VALUES (NULL, '$name', '$state', '$city', '$password')");
        
        if($result){
            echo "record inserted";
        } else {
            echo "fail to insert record";
        }
    } else {
        echo "insert all record";
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
    <form action="" method="post" enctype="multipart/form-data">
        <div>
            name  :
            <input type="text" name="name" id="name">
        </div>
        <div>
            State : 
            <select name="state" id="state" onchange="updatecity(this.value)">
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
            <select name="city" id="city">
                <option value="SELECT ONE">SELECT ONE</option>
            </select>
        </div>
        <div>file : 
            <input type="file" name="file" id="">
        </div>
        <div>
            password :
            <input type="password" name="password" id="password">
        </div>
        <input type="submit" value="submit" name="submit">
    </form>


    <script>
        function updatecity(sid){
            console.log(sid);
            $.ajax({
                url : 'city.php',
                type : 'POST',
                data : {stateid : sid},
                success : function(result){
                    $('#city').html(result);
                }
            });
        }
    </script>
</body>
</html>