<?php

$name = $_POST['name'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];

//add to database for records 
include ("../../api/connect.php");

$sql = "INSERT INTO customer_query (name, subject, message, email) 
VALUES ('$name', '$subject', '$message', '$email')";

if ($conn->query($sql) === TRUE) {
  echo "We are halfway there";
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
} 

// Import PHPMailer classes into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader
require 'vendor/autoload.php';

// Instantiation and passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      // Enable verbose debug output
    $mail->isSMTP();                                            // Send using SMTP
    $mail->Host       = 'smtp.mailtrap.io';                     // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'b2d7d1788a8c08';                       // SMTP username
    $mail->Password   = 'de45537a61dbc0';                       // SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
    $mail->Port       = 2525;                                   // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

    //Recipients
    $mail->setFrom("$email", 'Mailer');
    $mail->addAddress('thewayshop@info.co.za');     // Add a recipient


    // Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = "$subject";
    $mail->Body    = "$message";
    $mail->AltBody = "$message";

    $mail->send();
    header("Location: ../../contact-us.html?success");
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}

?>