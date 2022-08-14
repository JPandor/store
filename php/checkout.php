<?php

include ("../api/connect.php");

session_start();

$user_id = $_SESSION['email'];
//getting user id
$user_sql = "SELECT id FROM users WHERE email = '$user_id'";
$user_result = mysqli_query($conn, $user_sql);

if (mysqli_num_rows($user_result) > 0){
    $user_result = mysqli_fetch_assoc($user_result);
    $user_id = $user_result['id'];
}else {
    header("Location: ../error.html");
}

$sql = "UPDATE cart SET purchased = 1 WHERE user_id = $user_id";

$result = mysqli_query($conn, $sql);

if ($result != true){
    header("Location: ../error.html");
}else {
    header("Location: ../thanks.html");
}

?>