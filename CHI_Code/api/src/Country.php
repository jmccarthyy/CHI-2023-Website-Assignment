<?php

/**
 * Country endpoint page
 * 
 * This is the endpoint for getting Countries from the database
 * 
 * @author Jake McCarthy
 */

class Country extends Endpoint{

    // Endpoint for returning countries
    public function __construct(){
        switch(Request::method()){
            case 'GET':
                $sql = "SELECT DISTINCT country FROM affiliation";
                $dbConn = new Database("db/chi2023.sqlite");
                $data = $dbConn->executeSQL($sql);
                break;
            default:
                throw new ClientError(405);
        }
        parent::__construct($data);
    }
}