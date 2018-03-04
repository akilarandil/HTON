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
    private $attributes;

    function __construct($name,$value,$attributes=null) {
        $this->name = $name;
        $this->value = $value;
        $this->attributes = $attributes;
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

    public function getAttributes(){
        return $this->attributes;
    }

    public function setAttributes($attributes){
        $this->attributes = $attributes;
    }
    public function toArray() {

        // Handle scalar values
        $val = $this->value ;
        $attr = $this->attributes;

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

        if(is_array($attr)) {
            foreach ($attr as &$item) {
                if (is_object($item)) {
                    $item = $item->toArray();
                }
            }
        }



        if($attr==null){
            return array($this->name => array_merge(array("val"=>$val))) ;

        }else{
            return array($this->name => array_merge(array("val"=>$val, "attr"=>$attr))) ;
        }
    }

    public static function ConvertToHTMLElement(HTMLElement $obj){
        return new HTMLElement($obj->name,$obj->value);
    }


}