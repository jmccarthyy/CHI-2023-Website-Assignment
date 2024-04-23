<?php

/**
 * Issue Token to Authenticated Users
 *
 * This class will check a username and password against those held in the 
 * database. Where authentication is successful it will return a JWT.
 *
 * @author Jake McCarthy
 */

use Firebase\JWT\JWT;

include('config.php');

class Token extends Endpoint
{
    private $sql = "SELECT id, password FROM account WHERE email = :email";

    private function generateJWT($id) { 
        // 1. Uses the secret key defined in config.php file
        $secretKey = SECRET;

        // Time token is created is used to set an expiry tme of 30 minutes
        $iat = time();
        $exp = strtotime('+30 minutes', $iat);
        
        // 2. Specify what to add to the token payload. 
        $payload = [
            'sub' => $id,
            'iat' => $iat,
            'exp' => $exp,
        ];
            
        // 3. Use the JWT class to encode the token  
        $jwt = JWT::encode($payload, $secretKey, 'HS256');
        
        return $jwt;
    }
    private $sqlParams = [];

    // Performs verification checks so JWT can be saved to local storage
    public function __construct() {
        switch(Request::method()) 
        {
            case 'GET':
            case 'POST':
                $this->checkAllowedParams();
                $dbConn = new Database("db/users.sqlite");
        
                if (!isset($_SERVER['PHP_AUTH_USER']) || !isset($_SERVER['PHP_AUTH_PW'])) {
                    throw new ClientError(401);
                }
        
                if (empty(trim($_SERVER['PHP_AUTH_USER'])) || empty(trim($_SERVER['PHP_AUTH_PW']))) {
                    throw new ClientError(401);
                }
        
                $this->sqlParams[":email"] = $_SERVER['PHP_AUTH_USER'];
                $data = $dbConn->executeSQL($this->sql, $this->sqlParams);
        
                if (count($data) != 1) {
                    throw new ClientError(401);
                }
        
                if (!password_verify($_SERVER['PHP_AUTH_PW'], $data[0]['password'])) {
                    throw new ClientError(401);
                }

                $token = $this->generateJWT($data[0]['id']);        
                $data = ['token' => $token];
        
                parent::__construct($data);
                break;
            default:
                throw new ClientError(405);
                break;
        }

        parent::__construct($data);
    }

}