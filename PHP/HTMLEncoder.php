<?php
/**
 * Created by PhpStorm.
 * User: akilarhettiarachchi
 * Date: 9/27/17
 * Time: 9:37 AM
 */

class HTMLEncoder
{

//     $str = "";
//
//    private $elementsArray = array();
//
//    public function createElement(HTMLElement $element){
//        array_push($this->elementsArray,$element);
//    }
//
//    function printElements(){
//        echo json_encode($this->elementsArray);
//        var_dump($this->elementsArray);
//    }

//    public function encodeToJSON(){
//        $jsonStr="{";
//        foreach ($this->elementsArray as $element){
//            $jsonStr.= "\"".$element->getElementName()."\":{";
//            foreach ($element->getAllAttributes() as $attribute) {
//                $jsonStr .= "\"attribute\": { \"name\":\"" . $attribute->getName() . "\",";
//                $jsonStr .= "\"value\":\"" . $attribute->getValue() . "\"}},";
//            }
//            $jsonStr.="\"value\":\"".$element->getValue()."\"";
//        }
//        $jsonStr.="}";
//        echo $jsonStr;
//    }
        public $str="";

    public function sendToClient($jsonArray)
    {

//       $jsonArray =  str_replace("{","",$jsonArray);
//        $jsonArray =  str_replace("\"}","",$jsonArray);
//        $jsonArray = str_replace("{\"",'$',$jsonArray);
//        str_replace("{","",$jsonArray);
//        str_replace("{","",$jsonArray);
//        str_replace("{","",$jsonArray);
//        print_r($jsonArray);
//
        $find = array("{",'"}','}','":','"');
        $replace = array("","","",":",'$');
        echo str_replace($find,$replace,$jsonArray);
//        $this->recursiveCheck($jsonArray);
//
//        echo $GLOBALS['str'];

    }




    function recursiveCheck($data){


        if(is_string($data)){
            $GLOBALS['str'] .= '$'.$data;


        }else if(is_array($data)) {
            $GLOBALS['str'] .= '[';
            for($i =0;$i<count($data);$i++){
                $value = $data[$i];
                $this->recursiveCheck($value);
                if(isset($data[$i+1])) {
                    $GLOBALS['str'] .= ",";
                }
            }
            $GLOBALS['str'] .= ']';

        }else if (is_object($data)){

            for($i =0;$i<count($data);$i++){
                $key = key($data);
                $value = $data->$key;
                $GLOBALS['str'].='$'.$key.':';
                $this->recursiveCheck($value);
            }
        }
    }

}
//}

