<?php
/**
 * Created by PhpStorm.
 * User: Akila Hettiarachchi
 * Date: 2/28/2018
 * Time: 10:09 AM
 */

class HTMLAttribute
{

    private $name;
    private $value;

    function __construct($name,$value)
    {
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

    public function toArray() {

        // Handle scalar values
        $val = $this->value ;
        // Handle HTMLElement values
        if (is_object($this->value)) {
            $val = $this->value->toArray();
        }
        // Handle array values :
        elseif (is_array($val)) {
            foreach ($val as &$item) {
                if (is_object($item)) {
                    $item = $item->toArray();
                }
            }
        }

        // Return Key/Value pair
        return array($this->name => $val) ;
    }

    public static function ConvertToHTMLAttribute(HTMLAttribute $obj)
    {
        return new HTMLElement($obj->name,$obj->value);
    }

}