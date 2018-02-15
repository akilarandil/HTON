<?php
/**
 * Created by PhpStorm.
 * User: akilarhettiarachchi
 * Date: 9/26/17
 * Time: 9:59 PM
 */

class HTMLElement{
    private $elementName;
    private $attrArray;
    private $value;

    function __construct(string $elementName)
    {
       $this -> elementName = $elementName;
    }

    public function addAttribute(HTMLAttribute $attribute){
        if ($this->attrArray==null){
            $this->attrArray = array();
        }
        array_push($this->attrArray,$attribute);

    }

    public function getAllAttributes(){
        return $this->attrArray;
    }

    public function addValue(string $value){
        $this -> value = $value;
    }

    public function getValue(){return $this->value;}

    public function getElementName(){return $this->elementName;}
}

class HTMLAttribute{
    private $name;
    private $value;

    function __construct(string $name, string $value)
    {
        $this -> name= $name;
        $this ->value = $value;
    }

    public function getName(){return $this->name;}

    public function getValue(){return $this->value;}
}