<?php

session_start();

include ("../api/connect.php");

$email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
$password = md5($_POST['password']);

$login_sql = "SELECT * FROM users WHERE email='$email' AND password = '$password'";
$result = mysqli_query($conn, $login_sql);

if (mysqli_num_rows($result) > 0){
    $sign_in = "UPDATE users SET signed_in = 1 WHERE email='$email'";
    if (mysqli_query($conn, $sign_in) == true){
        header("Location: ../index.html?login=success");
    }else {
        header("Location: ../login.html?login=failed");
    }    
}else {
    header("Location: ../login.html?login=failed");
}

?>