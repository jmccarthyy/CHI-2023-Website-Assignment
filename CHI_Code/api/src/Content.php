<?php

/**
 * Content endpoint page
 * 
 * This is the endpoint for getting Content from the database
 * 
 * @author Jake McCarthy
 */

class Content extends Endpoint{

    protected $allowedParams = ["page", "type"];
    private $sql = "SELECT content.id , content.title , content.abstract , type.name , content_has_award.award 
    FROM content 
    INNER JOIN type ON content.type = type.id
    LEFT JOIN content_has_award ON content.id = content_has_award.content";

    private $sqlParams = [];

    public function __construct(){
        switch(Request::method()){
            case 'GET':
                $this->checkAllowedParams();
                $this->buildSQL();
                $dbConn = new Database("db/chi2023.sqlite");
                // Pass both properties to the executeSQL method
                $data = $dbConn->executeSQL($this->sql, $this->sqlParams);
                break;
            default:
                throw new ClientError(405);
        }
        parent::__construct($data);
    }

    /** Create WHERE clauses based upon what API parameters are set */
    private function buildSQL()
    {
        if (isset(Request::params()['type'])) 
        {
            $this->sql .= " WHERE type.name COLLATE NOCASE = :type";
            $this->sqlParams[":type"] = Request::params()['type'];
        }

        if (isset(Request::params()['page'])) 
        {
            $this->sql .= " LIMIT 20 OFFSET (:page - 1) * 20";
            $this->sqlParams[":page"] = Request::params()['page'];
        }
    }
}

