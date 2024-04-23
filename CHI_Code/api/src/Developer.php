<?php

/**
 * Developer endpoint page
 * 
 * This is the endpoint for displaying the developer
 * 
 * @author Jake McCarthy
 */

class Developer extends Endpoint{
  //Endpoint for returning developer information
  public function __construct(){
    switch(Request::method()){
        case 'GET':
          $data['id'] = "W20043974";
          $data['name'] = "Jake McCarthy";
          $data['assignment'] = "Coursework assignment for KF6012 Web Application Integration, Northumbria University";
          break;
        default:
          throw new ClientError(405);
    }
    parent::__construct($data);
  }
}