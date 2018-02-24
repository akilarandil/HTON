<?php
/**
 * Created by PhpStorm.
 * User: akilarhettiarachchi
 * Date: 2/23/18
 * Time: 10:39 PM
 */

class HTMLElement
{
    private $name;
    private $value;

    function __construct($name,$value) {
        $this->name = $name;
        $this->value = $value;
    }

    public function getName(){
        return $this->name;
    }

    public function setName($name){
        $this->value = $name;
    }

    public function getValue(){
        return $this->value;
    }

    public function setValue($value){
        $this->value = $value;
    }

    public static function ConvertToHTMLElement(HTMLElement $obj){
        return new HTMLElement($obj->name,$obj->value);
}

}