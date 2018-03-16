<?php

/**
 *
 * The class that is responsible for converting an @see HTMLElement object, arrays of values,
 * or an array of @see HTMLElement objects to the HTMLElement data structure string
 *
 * @author Akila R. Hettiarachchi
 * @version 1.0
 * @since 1.0
 */
class HTON
{
    private $escapes = array(
        '[',
        '<',
        ':',
        ']',
        '>',
        '(',
        ')'
    );

    /**
     * Converts the data to an HTMLElement data string
     * @param $data mixed HTMLElement/array of values or arrays of HTMLElement objects
     * @return string HTMLElement data string
     */
    public function convertToHTON($data)
    {
        if (is_object($data)) {
            return $this->convertObjectToHTONString($data);
        } else {
            $str = '[';
            $str .= $this->convertArrayToHTONString((object)$data);
            $str .= ']';
            return $str;
        }
    }

    /**
     * Converts an @see HTMLElement object to a HTON data structure string
     * @param $data HTMLElement object
     * @return string
     */
    private function convertObjectToHTONString($data)
    {
        return $this->convertArrayToHTONString((object)$data->toArray());
    }

    /**
     * Convert an array of values or an array of @see HTMLElement objects to an HTON data structure string
     * @param $data mixed array of values or an array of @see HTMLElement objects
     * @return string
     */
    private function convertArrayToHTONString($data)
    {
        $str = '';
        if (is_string($data)) { //checks if string
            $str .= $this->stringExecution($data);
        } else if (is_array($data)) { // checks if array
            $objectChildren = false;
            if (!array_key_exists(0, $data)) { // checks if any child value is an object type and not an array
                $objectChildren = true;
            }
            $str .= $this->arrayExecution($data, $objectChildren);
        } else if (is_object($data)) { // checks if object
            $str .= $this->objectExecution($data);
        }
        return $str;
    }

    /**
     * Executes the code for type string for the method @see convertArrayToHTONString
     * @param $data string value
     * @return string
     */
    private function stringExecution($data)
    {
        $str = '';
        if ($this->match($this->escapes, $data)) { // checks if string contains special characters
            if (preg_match("/\"/", $data)) {
                $data = str_replace('"', "\\\"", $data);
            }
            $str .= "\"$data\"";
        } else {
            $str .= $data;
        }
        return $str;
    }

    /**
     * Check if a string contains a character that is specified in the array
     * @param $chArray array of characters
     * @param $string string that needs to be checked
     * @return bool
     */
    private function match($chArray, $string)
    {
        if ($this->strpos_array($string, $chArray)) {
            return true;
        }
        return false;
    }

    /**
     * A method to check if a character from an array of strings exists in another string
     * @param $haystack string string that needs to be searched
     * @param $needles mixed the Array/string that is being searched
     * @return bool|int
     * @link Code Source Link - https://gist.github.com/msng/5039773
     */
    private function strpos_array($haystack, $needles)
    {
        if (is_array($needles)) {
            foreach ($needles as $str) {
                if (is_array($str)) {
                    $pos = $this->strpos_array($haystack, $str);
                } else {
                    $pos = strpos($haystack, $str);
                }
                if ($pos !== FALSE) {
                    return $pos;
                }
            }
        } else {
            return strpos($haystack, $needles);
        }
    }

    /**
     * Executes the code for type array for the method @see convertArrayToHTONString
     * @param $data array
     * @param $objectChildren bool value to determine whether any child value is an object and not an array
     * @return string
     */
    private function arrayExecution($data, $objectChildren)
    {
        $str = '';
        if (!$objectChildren) {
            $firstElement = true;
            $str .= '[';
            foreach ($data as $key => $value) {
                if ($firstElement) {
                    $firstElement = false;
                } else {//if it is not the first element, a comma will be added to the beginning of the string
                    $str .= ",";
                }
                if (is_numeric($key)) { // if the key contains the index number
                    $str .= $this->convertArrayToHTONString((object)$value);
                }

            }
            $str .= ']';
        } else {
            $firstElement = true;
            foreach ($data as $key => $value) {
                if ($firstElement) {
                    $firstElement = false;
                } else {//if it is not the first element, a comma will be added to the beginning of the string
                    $str .= ",";
                }
                $str .= "<" . $key . $this->keyAttributation($value) . ':';
                $str .= $this->convertArrayToHTONString($value["val"]);
                $str .= ">";
            }
        }
        return $str;
    }

    /**
     * Executes the code for type object for the method @see convertArrayToHTONString
     * @param $data mixed traversable @see HTMLElement object
     * @return string
     */
    private function objectExecution($data)
    {
        $str = '';
        $firstElement = true;
        foreach ($data as $key => $value) {
            if ($firstElement) {
                $firstElement = false;
            } else {//if it is not the first element, a comma will be added to the beginning of the string
                $str .= ",";
            }
            if (is_numeric($key)) { //if the key contains the index number
                $str .= $this->convertArrayToHTONString((object)$value);
            } else { //contains the val and attr keys
                $str .= '<';
                $str .= $key . $this->keyAttributation($value) . ':';
                $str .= $this->convertArrayToHTONString($value["val"]);
                $str .= '>';
            }
        }
        return $str;
    }

    /**
     * Extracts the data from the attr key of the HTMLElement Object and gets the full key value string
     * @param $data mixed value of the element
     * @return string full key value string
     */
    private function keyAttributation($data)
    {
        $str = "";
        if (isset($data["attr"])) {
            $str = $this->attributes($data["attr"]);
        }
        return $str;
    }

    /**
     * Returns the full key value string of the attributes
     * @param $data array attribute array
     * @return string full key value string of the attributes
     */
    private function attributes($data)
    {
        $attrStr = '';
        if (is_array($data)) {
            foreach ($data as $key => $value) {
                if (is_numeric($key)) {
                    $attrStr .= $this->attributes($value);
                } else {
                    $attrStr .= ' ';
                    $attrStr .= $key . '=' . $value;
                }
            }
        } else if (is_object($data)) {
            $attrStr .= ' ';
            $attrStr .= $data->getName() . '=' . $data->getValue();
        }
        return $attrStr;
    }


}