<?php

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "store";

$conn = new mysqli($servername, $username, $password, $dbname); // Create connection

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

?>