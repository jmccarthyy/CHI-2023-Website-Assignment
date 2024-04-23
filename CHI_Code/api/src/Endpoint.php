<?php

/**
 * Endpoint file
 * 
 * This is the file that establishes endpoints' base
 * 
 * @author Jake McCarthy
 */

class Endpoint{
    private $data;

    protected $allowedParams = [];
    
    public function __construct($data = ["message" => []]){
        $this->setData($data);
    }

    protected function setData($data){
        $this->data = $data;
    }

    public function getData(){
        return $this->data;
    }

    protected function checkAllowedParams(){
        foreach (REQUEST::params() as $key => $value){
            if (!in_array($key, $this->allowedParams)){
                throw new ClientError(422);
            }
        }
    }
}