<?php

/**
 * Notes endpoint page
 * 
 * This is the endpoint for getting Notes from the database
 * 
 * @author Jake McCarthy
 */

include('config.php');

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Notes extends Endpoint{

    public function __construct()
    {
        $id = $this->validateToken();
 
        switch(Request::method()) 
        {
            case 'GET':
                $data = $this->getNotes($id);
                break;
            case 'POST':
                $data = $this->postNotes($id);
                break;
            case 'PUT':
                $data = $this->editNotes($id);
                break;
            case 'DELETE':
                $data = $this->deleteNotes($id);
                break;
            default:
                throw new ClientError(405);
                break;
        }
        parent::__construct($data);
    }

    private function validateToken()
    {
        // Assigns key from config.php
        $key = SECRET;
                
        $allHeaders = getallheaders();
        $authorizationHeader = "";
                
        // Look for authorization header
        if (array_key_exists('Authorization', $allHeaders)) {
            $authorizationHeader = $allHeaders['Authorization'];
        } elseif (array_key_exists('authorization', $allHeaders)) {
            $authorizationHeader = $allHeaders['authorization'];
        }
                
        // Check if there is a Bearer token in the header
        if (substr($authorizationHeader, 0, 7) != 'Bearer ') {
            throw new ClientError(401);
        }
        
        // Extract the JWT from the header (by cutting the text 'Bearer ')
        $jwt = trim(substr($authorizationHeader, 7));
        
        // Use the JWT class to decode the token
        $decodedJWT = JWT::decode($jwt, new Key($key, 'HS256'));

        if (!isset($decodedJWT->exp) || !isset($decodedJWT->sub)) {
            throw new ClientError(401);
        }

        if ($decodedJWT->exp < time()) {
            throw new ClientError(401);
        }

        return $decodedJWT->sub;

    }

    // Gets notes from database relative to user's id
    private function getNotes($id){
        $dbConn = new Database("db/users.sqlite");
        $sql = "SELECT * FROM notes WHERE account_id = :id";
        $sqlParams = [':id' => $id];
        $data = $dbConn->executeSQL($sql, $sqlParams);
        return $data;
    }

    // Adds note to database relative to user's id
    private function postNotes($id){
        $requestBody = json_decode(file_get_contents("php://input"), true);
        $content = $requestBody['content'];
        $contentId = (Request::params()['contentId']);

        if (!isset($content)){
            throw new ClientError(422);
        }
        
        if (!is_string($content)){
            throw new ClientError(422);
        }

        if (strlen($content)>250){
            throw new ClientError(401);
        }
        
        $dbConn = new Database("db/users.sqlite");
        $sql = "INSERT INTO notes (account_id, content, content_id) VALUES (:id, :content, :contentId)";

        $sqlParams = [':id' => $id, ':content' => $content, ':contentId' => $contentId];
        $data = $dbConn->executeSQL($sql, $sqlParams);
        return $data;
    }  

    // Edits note in database relative to note's id
    private function editNotes($id){
        $requestBody = json_decode(file_get_contents("php://input"), true);
        $content = $requestBody['content'];
        $notesId = (Request::params()['notesId']);
        
    
        // Validate 'content' parameter
        if (!is_string($content)){
            throw new ClientError(422, "'content' must be a string");
        }
    
        $dbConn = new Database("db/users.sqlite");
        $sql = "UPDATE notes SET content = :content WHERE notes_id = :notesId";
 
        $sqlParams = [':content' => $content, ':notesId' => $notesId];
        $data = $dbConn->executeSQL($sql, $sqlParams);
    
        return $data;
    }

    // Deletes note from database relative to note's id'
    private function deleteNotes($id){
        $requestBody = json_decode(file_get_contents("php://input"), true);
        $notesId = (Request::params()['notesId']);
    
        $dbConn = new Database("db/users.sqlite");
        $sql = "DELETE FROM notes WHERE notes_id = :notesId";
    
        $sqlParams = [':notesId' => $notesId];
        $data = $dbConn->executeSQL($sql, $sqlParams);
    
        return $data;

    }

}
