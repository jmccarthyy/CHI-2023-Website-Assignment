<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Authorization');
header("Access-Control-Allow-Headers: Content-Type");
 
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
 
include("config/autoloader.php");
spl_autoload_register("autoloader");

include 'config/exceptionHandler.php';
set_exception_handler('exceptionHandler');

$response = new Response();

// Uses classes set in src page files so that, depending on URL, the relative page is returned
try{
    switch (Request::endpointName()) {
        case '/country':
        case '/country/':
            $endpoint = new Country();
            break;
        case '/contentinfo':
        case '/contentinfo/':
            $endpoint = new ContentInfo();
            break;
        case '/preview':
        case '/preview/':
            $endpoint = new Preview();
            break;
        case '/content':
        case '/content/':
            $endpoint = new Content();
            break;
        case '/notes':
        case '/notes/':
            $endpoint = new Notes();
            break;
        case '/author-and-affiliation':
        case '/author-and-affiliation/':
            $endpoint = new AuthAffil();
            break;
        case '/token':
        case '/token/':
            $endpoint = new Token();
            break;
        case '/':
        case '/developer':
        case '/developer/':
            $endpoint = new Developer();
            break;
        default:
            throw new ClientError(404);
    }
} catch(ClientError $e){
    $data = ['message' => $e->getMessage()];
    $endpoint = new Endpoint($data);
}

$data = $endpoint->getData();
 
$response->outputJSON($data);