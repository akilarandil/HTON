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
class HTMLEncoder
{
    private $str = "";
    private $escapes = array(
        '[',
        '<',
        ':',
        ']',
        '>'
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
     * Converts an @see HTMLElement object to a HTMLEncoder data structure string
     * @param $data HTMLElement object
     */
    private function convertObjectToHTMLEncoderString($data)
    {
        $this->convertArrayToHTMLEncoderString((object)$data->toArray());
    }

    /**
     * Convert an array of values or an array of @see HTMLElement objects to an HTMLEncoder data structure string
     * @param $data mixed array of values or an array of @see HTMLElement objects
     */
    private function convertArrayToHTMLEncoderString($data)
    {
        if (is_string($data)) { //checks if string
            if ($this->match($this->escapes, $data)) { // checks if string contains special characters
                $this->str .= '"' . $data . '"';
            } else {
                $this->str .= $data;
            }
        } else if (is_array($data)) { // checks if array
            $this->str .= '[';
            foreach ($data as $key => $value) {
                if (is_numeric($key)) { // if the key contains the index number
                    $this->convertArrayToHTMLEncoderString((object)$value);
                } else {
                    $this->convertArrayToHTMLEncoderString($value);
                }
                if (next($data) != null) { // if another element is available, add a comma
                    $this->str .= ",";
                }
            }
            $this->str .= ']';
        } else if (is_object($data)) { // checks if object

            foreach ($data as $key => $value) {

                if (is_numeric($key)) { //if the key contains the index number
                    $this->convertArrayToHTMLEncoderString((object)$value);
                } else { //contains the val and attr keys
                    $this->str .= '<';
                    $this->str .= $key . ':';
                    $this->ValueAttributation($value);
                    $this->str .= '>';
                }

                if (next($data) != null) {
                    // if another element is available, add a comma
                    $this->str .= ",";
                }
            }

        }
    }

    /**
     * Check of a string contains a character that is specified in the array
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
     * Converts the values in the keywords val and attr to an HTMLEncoder data structure string
     * @param $data array
     */
    private function ValueAttributation($data)
    {
        foreach ($data as $key => $value) {
            if ($key == "val") {
                $this->str .= "<$key:";
                $this->convertArrayToHTMLEncoderString($value);
            }
            if ($key == "attr") {
                $this->str .= ",";
                $this->str .= "$key:";
                $this->str .= "[";
                $this->recursiveAttribute($value);
                $this->str .= "]";
            }
        }
        $this->str .= ">";
    }

    /**
     * Converts the values in the attr key to an HTMLEncoder data structure string
     * @param $data array/object
     */
    private function recursiveAttribute($data)
    {
        if (is_array($data)) {
            foreach ($data as $key => $value) {
                if (is_numeric($key)) {
                    $this->recursiveAttribute($value);
                } else {
                    $this->str .= '<';
                    $this->str .= $key . ':' . $value;
                    $this->str .= '>';

                }
                if (next($data) != null) {
                    $this->str .= ",";
                }
            }
        } else if (is_object($data)) {
            $this->str .= '<';
            $this->str .= $data->getName() . ':' . $data->getValue();
            $this->str .= '>';
        }
    }
}