<?php

/**
 * An object type to facilitate with an HTML attribute which consists
 * of attribute name and value
 *
 * @author Akila R. Hettiarachchi
 * @version 1.0
 * @since 1.0
 */
class HTMLAttribute
{

    private $name;
    private $value;

    /**
     * HTMLAttribute constructor.
     * @param $name string attribute name
     * @param $value string value of attribute
     */
    function __construct($name, $value)
    {
        $this->name = $name;
        $this->value = $value;
    }

    /**
     * Returns the attribute name
     * @return string attribute name
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Sets the attribute name
     * @param $name string attribute name
     */
    public function setName($name)
    {
        $this->value = $name;
    }

    /**
     * Returns the value of the attribute
     * @return string attribute value
     */
    public function getValue()
    {
        if (strpos($this->value," ")){
            return "\"".$this->value."\"";
        }
        return $this->value;
    }

    /**
     * Sets the value of the attribute
     * @param $value string attribute value
     */
    public function setValue($value)
    {
        $this->value = $value;
    }

}