<?php

require_once("HTMLElement.php");

/**
 * A utility class to manipulate the tree of HTML element array
 */
class HTMLTree
{
    /**
     * Attaches the given element to the specified array as a peer value
     * @param $arr array targeted array
     * @param HTMLElement $element peer-to-be value
     * @return array manipulated array
     */
    public static function AttachElementAsPeer($arr, HTMLElement $element)
    {
        return array_merge(array($arr, $element->toArray()));

    }
}

