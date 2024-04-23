<?php

/**
 * Response file
 * 
 * This file uses data and returns it as JSON responses on the web server
 * 
 * @author Jake McCarthy
 */

class Response{

    public function __construct(){
        $this->outputHeaders();

        // Declares unauthorised request methods

        if (Request::method() == "OPTIONS"){
            exit();
        }
    }

    public function outputHeaders(){
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: https://w20043974.nuwebspace.co.uk');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    }

    public function outputJSON($data){
        if(empty($data)){
            http_response_code(204);
        }
        echo json_encode($data);
    }
}