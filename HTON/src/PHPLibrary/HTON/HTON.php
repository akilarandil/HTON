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
    private $str = "";
    private $attrStr = "";
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
    public function convertToHTMLEncoder($data)
    {
        if (is_object($data)) {
            $this->convertObjectToHTMLEncoderString($data);
        } else {
            $this->str .= '[';
            $this->convertArrayToHTMLEncoderString((object)$data);
            $this->str .= ']';
        }
        return $this->str;
    }

    /**
     * Converts an @see HTMLElement object to a HTON data structure string
     * @param $data HTMLElement object
     */
    private function convertObjectToHTMLEncoderString($data)
    {
        $this->convertArrayToHTMLEncoderString((object)$data->toArray());
    }

    /**
     * Convert an array of values or an array of @see HTMLElement objects to an HTON data structure string
     * @param $data mixed array of values or an array of @see HTMLElement objects
     */
    private function convertArrayToHTMLEncoderString($data)
    {
        if (is_string($data)) { //checks if string
            $this->stringExecution($data);
        } else if (is_array($data)) { // checks if array
            $objectChildren = false;
            foreach ($data as $key => $value) {
                if (!is_numeric($key)) { // checks if any child value is an object type and not an array
                    $objectChildren = true;
                    break;
                }
            }
            $this->arrayExecution($data, $objectChildren);
        } else if (is_object($data)) { // checks if object
            $this->objectExecution($data);
        }
    }

    /**
     * Executes the code for type string for the method @see convertArrayToHTMLEncoderString
     * @param $data string value
     */
    private function stringExecution($data)
    {
        if ($this->match($this->escapes, $data)) { // checks if string contains special characters
            if (preg_match("/\"/", $data)) {
                $data = str_replace('"', "\\\"", $data);
            }
            $this->str .= "\"$data\"";
        } else {
            $this->str .= $data;
        }
    }

    /**
     * Check if a string contains a character that is specified in the array
     * @param $chArray array of characters
     * @param $string string that needs to be checked
     * @return bool
     */
    private function match($chArray, $string)
    {
        foreach ($chArray as $ch) {
            if (strpos($string, $ch) !== false) {
                return true;
            }
        }
        return false;
    }

    /**
     * Executes the code for type array for the method @see convertArrayToHTMLEncoderString
     * @param $data array
     * @param $objectChildren bool value to determine whether any child value is an object and not an array
     */
    private function arrayExecution($data, $objectChildren)
    {
        if (!$objectChildren) {
            $this->str .= '[';
            foreach ($data as $key => $value) {
                if (is_numeric($key)) { // if the key contains the index number
                    $this->convertArrayToHTMLEncoderString((object)$value);
                }
                if (next($data) != null) { // if another element is available, add a comma
                    $this->str .= ",";
                }
            }
            $this->str .= ']';
        } else {
            foreach ($data as $key => $value) {
                $this->str .= "<" . $key . $this->keyAttributation($value) . ':';
                $this->convertArrayToHTMLEncoderString($value["val"]);
                $this->str .= ">";
                if (next($data) != null) { // if another element is available, add a comma
                    $this->str .= ",";
                }
            }
        }

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
            $this->attrStr = "";
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
        if (is_array($data)) {
            foreach ($data as $key => $value) {
                if (is_numeric($key)) {
                    $this->attributes($value);
                } else {
                    $this->attrStr .= ' ';
                    $this->attrStr .= $key . '=' . $value;
                }
            }
        } else if (is_object($data)) {
            $this->attrStr .= ' ';
            $this->attrStr .= $data->getName() . '=' . $data->getValue();
        }
        return $this->attrStr;
    }

    /**
     * Executes the code for type object for the method @see convertArrayToHTMLEncoderString
     * @param $data mixed traversable @see HTMLElement object
     */
    private function objectExecution($data)
    {
        foreach ($data as $key => $value) {
            if (is_numeric($key)) { //if the key contains the index number
                $this->convertArrayToHTMLEncoderString((object)$value);
            } else { //contains the val and attr keys
                $this->str .= '<';
                $this->str .= $key . $this->keyAttributation($value) . ':';
                $this->convertArrayToHTMLEncoderString($value["val"]);
                $this->str .= '>';
            }
            if (next($data) != null) {
                // if another element is available, add a comma
                $this->str .= ",";
            }
        }
    }
}