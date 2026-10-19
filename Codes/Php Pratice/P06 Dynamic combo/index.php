<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <title>Document</title>
</head>
<body>
    <form action="">
        <div>
            State : 
            <select name="" id="state" onchange="changeState(this.value)" >
                <option value='select One'>select One</option>
                <?php
                    include 'connection.php';
                    $data = mysqli_query($connect,"select * from state");
                    while($state = mysqli_fetch_assoc($data)){
                        echo "<option value='{$state['stateid']}'>{$state['name']}</option>";
                    }
                ?>
            </select>
        </div>
        <div>
            City : 
            <select name="" id="city">
                <option value="Select City">Select City</option>
            </select>
        </div>
    </form>
    <script>
        function changeState(stateid){
            $.ajax({
                url : 'dynamicCity.php',
                type : 'POST',
                data : {stateidpost:stateid},
                success : function (result){
                    $('#city').html(result);
                }
            });
        }
    </script>
</body>
</html>