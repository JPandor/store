<?php

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "store";

// $servername = "sql11.freesqldatabase.com";
// $username = "sql11513004";
// $password = "23jkhntdQW";
// $dbname = "sql11513004";

$conn = new mysqli($servername, $username, $password, $dbname); // Create connection

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}else {
  echo "Hello world!";
}


?>