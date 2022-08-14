<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require './vendor/autoload.php';// This is compulsory for our framework to work, but don't worry too much about how it works

$app = new \Slim\App;// We create an object of the Slim framework main app

$app->delete('/delete', function (Request $request, Response $response, ) {
    require '../connect.php';// Calling the database connection file

    //getting data from the request
    $data = $request->getParsedBody();
    $product_name = $conn -> real_escape_string($data['name']);
    $user_id = $data['users'];

    //getting user id
    $user_sql = "SELECT id FROM users WHERE email = '$user_id'";
    $user_result = mysqli_query($conn, $user_sql);

    if (mysqli_num_rows($user_result) > 0){
        $user_result = mysqli_fetch_assoc($user_result);
        $user_id = $user_result['id'];
    }else {
        header("Location: ../../error.html");
    }

    //deleting item from the cart 
    $sql = "DELETE FROM cart WHERE product = '$product_name' AND user_id = '$user_id'";

    $result = mysqli_query($conn, $sql);

    if ($result != true){
        header("Location: ../../error.html");
    }
    

});

$app->run(); //this ensures that the code runs in Slim


?>