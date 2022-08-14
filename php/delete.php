<?php 

include ("../api/connect.php");

$email = $_POST['email'];
$password = md5($_POST['password']);
$user_id = "";

//getting user id
$user_sql = "SELECT id FROM users WHERE email = '$email'";
$user_result = mysqli_query($conn, $user_sql);

if (mysqli_num_rows($user_result) > 0){
    $user_result = mysqli_fetch_assoc($user_result);
    $user_id = $user_result['id'];
}else {
    header("Location: ../error.html");
}

//deleting all cart items 
$delete_sql = "DELETE FROM cart WHERE user_id = '$user_id'";
mysqli_query($conn, $delete_sql);

$login_sql = "SELECT * FROM users WHERE email='$email' AND password = '$password'";
$result = mysqli_query($conn, $login_sql);

if (mysqli_num_rows($result) > 0){
    $sql = "DELETE FROM users WHERE email = '$email' AND password = '$password'"; 
    mysqli_query($conn, $sql);
    header("Location: ../login.html?delete=true"); 
}else {
    header("Location: ../error.html");
}



?>