<?php

/**
 * An object type to facilitate with an HTML element which consists
 * of element name, value and attributes.
 *
 * @author Akila R. Hettiarachchi
 * @version 1.0
 * @since 1.0
 */
class HTMLElement
{
    private $name;
    private $value;
    private $attributes;

    /**
     * HTMLElement constructor.
     * @param $name string element name
     * @param $value mixed object or array of HTMLElement Object or array of values of a string value
     * @param null $attributes HTMLAttribute object or an array of HTMLAttribute objects. By default it's null.
     */
    function __construct($name,$value,$attributes=null) {
        $this->name = $name;
        $this->value = $value;
        $this->attributes = $attributes;
    }

    /**
     * Returns the HTML element name
     * @return string HTML element
     */
    public function getName(){
        return $this->name;
    }

    /**
     * Sets the HTML element name
     * @param $name string HTML element
     */
    public function setName($name){
        $this->value = $name;
    }

    /**
     * Returns the value of the element scope
     * @return mixed HTMLElement object or array of HTMLElement Object or array of values of a string value
     */
    public function getValue(){
        return $this->value;
    }

    /**
     * Sets te value of the element scope
     * @param $value mixed HTMLElement object or array of HTMLElement Object or array of values of a string value
     */
    public function setValue($value){
        $this->value = $value;
    }

    /**
     * Returns the attribute/s of the element
     * @return null mixed HTMLAttribute object or an array of HTMLAttribute objects. By default it's null.
     */
    public function getAttributes(){
        return $this->attributes;
    }

    /**
     * Sets the attribute/s of the element
     * @param $attributes mixed HTMLAttribute object or an array of HTMLAttribute objects. By default it's null.
     */
    public function setAttributes($attributes){
        $this->attributes = $attributes;
    }

    /**
     * Converts this object including all its child objects to a PHPLibrary Library associative array
     * @return array a PHPLibrary Library associative array
     */
    public function toArray() {

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
        if ($attr == null) { // if attributes aren't available
            return array($this->name => array_merge(array("val"=>$val))) ;
        } else {
            return array($this->name => array_merge(array("val"=>$val, "attr"=>$attr))) ;
        }
    }


    public static function ConvertToHTMLElement(HTMLElement $obj){
        return new HTMLElement($obj->name,$obj->value);
    }


}