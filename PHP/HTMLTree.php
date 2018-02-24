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

    public  static function AttachElementAsPeer($arr,HTMLElement $element){
        return array_merge(array($arr,$element->toArray()));

    }


}

