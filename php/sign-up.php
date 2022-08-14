<?php

include ("../api/connect.php");

$name = $conn->real_escape_string($_POST['name']);
$email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
$password = md5($_POST['password']);
$security = $_POST['security'];


$sql = "INSERT INTO users (name, email, password, security) 
VALUES ('$name', '$email', '$password', $security)";

if ($conn->query($sql) === TRUE) {
    header("Location: ../login.html?signup=true");
  } else {
    header("Location: ../error.html");
} 

?>