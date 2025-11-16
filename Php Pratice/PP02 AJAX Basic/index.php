<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <title>Document</title>
</head>
<body>
    <select name="" id="state" onchange="cityupdate(this.value)">
        <?php 
            include 'connect.php';
            $data = mysqli_query($connect,"SELECT * FROM STATE");
            while($tmp = mysqli_fetch_assoc($data)){
                echo "
                    <option value='{$tmp['stateid']}'>{$tmp['name']}</option>
                ";
            }
        ?>
    </select>
    <select name="" id="city">
        <option value="Select One">Select One</option>
    </select>
    <script>
        function cityupdate(stateid){
            console.log(stateid);
            $.ajax({
                url : 'city.php',
                type : 'POST',
                data : {stateidpost : stateid},
                success : function(result){
                    $('#city').html(result);
                }
            });
        }
    </script>
</body>
</html>