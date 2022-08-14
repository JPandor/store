<?php

include ("../api/connect.php");

$email = $_POST['email'];
$security = $_POST['security'];
$password = md5($_POST['password']);

//checking security question
$check_sql = "SELECT * FROM users WHERE email = '$email' AND security = '$security'";

$result = mysqli_query($conn, $check_sql);

if (mysqli_num_rows($result) > 0){
    $sql = "UPDATE users SET password = '$password' WHERE email = '$email' AND security = '$security'";

    if (mysqli_query($conn, $sql) == true){
        header("Location: ../login.html?change=true");
    }else{
        header("Location: ../error.html");
    }
}else {
    header("Location: ../forgot-password.html?change=false");
}

?>