<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1 class="page-title" style="text-align: center; margin-top: 40px;">Login</h1>
    <?php 
        include "connection.php";
        session_start();
        $nameErr = $passErr = "";
        $status = 1;
        if(isset($_POST['submit'])) {
            if(empty($_POST['name'])) {
                $nameErr = "Required";
                $status = 0;
            }
            if(empty($_POST['password'])) {
                $passErr = "Required";
                $status = 0;
            }

            if($status) {
                $name = trim($_POST['name']);
                $password = trim($_POST['password']);

                $sqlAdmin = "SELECT * FROM admins WHERE admin_name = '$name'";
                $resultAdmin = $conn->query($sqlAdmin);

                if($resultAdmin->num_rows > 0) {
                    $row = $resultAdmin->fetch_assoc();

                    if($password === $row['password']) {
                        $_SESSION['name'] = $row['admin_name'];
                        $_SESSION['admin_id'] = $row['admin_id'];
                        header("location:adminDashboard.php");
                        exit();
                    }
                }

                $sqlUser = "SELECT * FROM users WHERE username = '$name'";
                $resultUser = $conn->query($sqlUser);

                if($resultUser->num_rows > 0) {
                    $row = $resultUser->fetch_assoc();

                    if($password === $row['password']) {
                        $_SESSION['user_id'] = $row['user_id'];
                        $_SESSION['name'] = $row['username'];
                        header("location:userDashboard.php");
                        exit();
                    }
                }
                echo "<script>alert('Invalid credentials!');</script>";
            }
        }
    ?>
    <form method="post">

        <label for="name">Enter Name: </label>
        <input type="text" name="name" id="name" placeholder="Username/Adminname"/>
        <span style="color:red"><?php echo $nameErr ?></span>
        <br/><br/>

        <label for="password">Enter Password: </label>
        <input type="text" name="password" id="password"/>
        <span style="color:red"><?php echo $passErr ?></span>
        <br/><br/>

        <input type="submit" value="Login" name="submit"><br/><br/>

        <label>Don't have account ? <a href="./registration.php">Register</a></label>
    </form>
</body>
</html>