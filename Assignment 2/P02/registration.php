<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration</title>
    <link rel="stylesheet" href="styles.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="./crud.js"></script>
</head>
<body>



    <h1 class="page-title" style="text-align: center; margin-top: 40px;">Registration</h1>

    <form id="registrationForm" action="registration.php" method="post">

        <label for="name">Enter Name: </label>
        <input type="text" name="name" id="name"/>
        <span id="errName" name="errName" style="color:red"></span>
        <br/><br/>

        <label for="role">Select Role: </label>
        <select name="role" id="role">
            <option value="User">User</option>
            <option value="Admin">Admin</option>
        </select>
        <br/><br/>

        <label for="name">Enter Password: </label>
        <input type="password" name="password" id="password"/>
        <span id="errPass" name="errPass" style="color:red"></span>
        <br/><br/>

        <label for="name">Confirm Password: </label>
        <input type="password" name="cnfPass" id="cnfPass"/>
        <span id="errCnfPass" name="errCnfPass" style="color:red"></span>
        <br/><br/>

        <label for="name">Enter below captcha: </label>
        <input type="text" name="captcha" id="captcha"/>
        <span id="errCaptcha" name="errCaptcha" style="color:red"></span>
        <br/>

        <img id="captcha_img" src="./captcha.php" alt="Captcha"/>
        <input type="button" value="🔃" onclick="refreshCaptcha()">

        <br/><br/>

        <input type="submit" value="Submit" name="submit"><br/><br/>
        <label>Already have account ? <a href="./login.php">LogIn</a></label>

    </form>

    

</body>
</html>