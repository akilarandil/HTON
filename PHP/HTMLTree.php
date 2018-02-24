<?php
/**
 * Created by PhpStorm.
 * User: akilarhettiarachchi
 * Date: 2/23/18
 * Time: 10:33 PM
 */

require_once("HTMLElement.php");

class HTMLTree
{

    public function ConvertToArray($htmlElement){
        if(is_array($htmlElement)){
            $arr =array();

            foreach ($htmlElement as $singleElement){
                $arr = $this->Convert($arr,$singleElement);
            }
            return $arr;
        }else{
            return $this->Convert(array(),$htmlElement);
        }

    }

    private function Convert($arr,HTMLElement $element){;
        $name = $element->getName();
        $value = $element->getValue();

        if(is_string($value)){
            $arr =array(array_merge(array($name=>$value)));
            return $arr;
        }else if(is_array($value)){
            foreach ($value as $elem){
               $arr = array_merge($arr,$this->Convert($arr,$elem));
            }
            $length  = sizeof($value);
            for($i=0;$i<$length;$i++){
                if (!isset($arr[$i])) $arr = array_merge(array($arr));
            }// <<< Code modified here
            return array($name=>($arr));
        }
        else if(is_object($value)){
            $arr = array_merge(array($name => $this->Convert($arr,$value)));

        }
        return $arr;
    }
}

