<?php

/**
 * Preview endpoint page
 * 
 * This is the endpoint for returning preview video from the database to the home page
 * 
 * @author Jake McCarthy
 */

class Preview extends Endpoint{

    protected $allowedParams = ["limit"]; 
    private $sql = "SELECT title , preview_video 
                    FROM content 
                    WHERE preview_video IS NOT NULL 
                    ORDER BY RANDOM()";

    private $sqlParams = [];

     // Gets video URL from database
    public function __construct(){
        switch(Request::method()){
            case 'GET':
                $this->checkAllowedParams();
                $this->buildSQL();
                $dbConn = new Database("db/chi2023.sqlite");
                $data = $dbConn->executeSQL($this->sql, $this->sqlParams);
                break;
            default:
                throw new ClientError(405);
        }
        parent::__construct($data);
    }

    // Create WHERE clauses based upon what API parameters are set
    private function buildSQL()
    {
        if (isset(Request::params()['limit'])) 
        {
            $this->sql .= " LIMIT :limit";
            $this->sqlParams[":limit"] = Request::params()['limit'];
        }
   }
}