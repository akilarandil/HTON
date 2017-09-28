<?php
/**
 * Created by PhpStorm.
 * User: akilarhettiarachchi
 * Date: 9/27/17
 * Time: 9:37 AM
 */

class HTMLEncoder{

    private $elementsArray = array();

    public function createElement(HTMLElement $element){
        array_push($this->elementsArray,$element);
    }

    function printElements(){
        echo json_encode($this->elementsArray);
        var_dump($this->elementsArray);
    }

    public function encodeToJSON(){
        $jsonStr="{";
        foreach ($this->elementsArray as $element){
            $jsonStr.= "\"".$element->getElementName()."\":{";
            foreach ($element->getAllAttributes() as $attribute) {
                $jsonStr .= "\"attribute\": { \"name\":\"" . $attribute->getName() . "\",";
                $jsonStr .= "\"value\":\"" . $attribute->getValue() . "\"}},";
            }
            $jsonStr.="\"value\":\"".$element->getValue()."\"";
        }
        $jsonStr.="}";
        echo $jsonStr;
    }
}

