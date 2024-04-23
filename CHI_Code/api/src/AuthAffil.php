<?php

/**
 * Author and Affiliation endpoint page
 * 
 * This is the endpoint for getting authors and their affiliations from the database
 * 
 * @author Jake McCarthy
 */

class AuthAffil extends Endpoint{

    protected $allowedParams = ["content", "country"];

    /**Define the SQL as a property to be called later */
    private $sql = "SELECT 
    affiliation.content,
    content.title,
    author.id,
    author.name,
    affiliation.country,
    affiliation.city,
    GROUP_CONCAT(affiliation.institution) AS institutions
    FROM affiliation 
    INNER JOIN content ON affiliation.content = content.id
    INNER JOIN author ON affiliation.author = author.id
    ";

    /** Define an array used to match placeholders to values */
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
        if (isset(Request::params()['content']) && (isset(Request::params()['country']))) {
            echo "Please only use one parameter for this endpoint";
            exit;
        }
        else if (isset(Request::params()['content'])) {
            $this->sql .= " WHERE affiliation.content = :content";
            $this->sqlParams[":content"] = Request::params()['content'];
        } 
        else if (isset(Request::params()['country'])) {
            $this->sql .= " WHERE affiliation.country COLLATE NOCASE = :country";
            $this->sqlParams[":country"] = Request::params()['country'];
        }

        $this->sql .= " GROUP BY affiliation.content, author.id ";

    }
}
