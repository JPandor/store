<?php

session_start();

include ("../api/connect.php");

$email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
$password = md5($_POST['password']);

$_SESSION['email'] = $email;

$login_sql = "SELECT * FROM users WHERE email='$email' AND password = '$password'";
$result = mysqli_query($conn, $login_sql);

if (mysqli_num_rows($result) > 0){
    header("Location: ../index.html?login=success");   
}else {
    header("Location: ../login.html?login=failed");
}

?>