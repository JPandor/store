<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require './vendor/autoload.php';// This is compulsory for our framework to work, but don't worry too much about how it works

$app = new \Slim\App;// We create an object of the Slim framework main app


$app->get('/products', function (Request $request, Response $response, array $args) {
    require_once 'connect.php';// Calling the database connection file

    $query = "SELECT title FROM products";// SQL query
    $result = $conn->query($query);


    while ($row = $result->fetch_assoc()){// Loop through each field in the library table
        $data[] = $row;// Store each field in an array
        // var_dump ($result->fetch_assoc());
        // var_dump($row);
        // die();
    }
    
    return json_encode($data);// Translate this array into JSON
});


$app->run(); //this ensures that the code runs in Slim

?>
