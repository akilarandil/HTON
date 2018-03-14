<?php
/**
 * Created by PhpStorm.
 * User: Akila Hettiarachchi
 * Date: 3/5/2018
 * Time: 3:51 PM
 */

$libPath = "../../src/PHPLibrary/HTMLEncoder";
require_once("$libPath/HTMLEncoder.php");
require_once("$libPath/HTMLTree.php");
require_once("$libPath/HTMLElement.php");
require_once("$libPath/HTMLAttribute.php");


function Test_HTMLElementAsObject()
{
    $htmlElement = new HTMLElement(
        "table", array(
        new HTMLElement("tr", array(
            new HTMLElement("th", "Name"),
            new HTMLElement("th", "Age"),
            new HTMLElement("th", "City")
        ))));
    $htmlEncoder = new HTMLEncoder();
    $expected = '<table:[<tr:[<th:Name>,<th:Age>,<th:City>]>]>';

    $actual = $htmlEncoder->convertToHTMLEncoder($htmlElement);
    if ($expected == $actual) {
        echo "Test_HTMLElementAsObject - Pass";
    } else {
        echo "Test_HTMLElementAsObject - Fail";
    }
}

function Test_HTMLElementAsArray()
{
    $htmlElement = new HTMLElement(
        "table", array(
        new HTMLElement("tr", array(
            new HTMLElement("th", "Name"),
            new HTMLElement("th", "Age"),
            new HTMLElement("th", "City")
        ))));
    $htmlEncoder = new HTMLEncoder();
    $expected = '[<table:[<tr:[<th:Name>,<th:Age>,<th:City>]>]>]';
    $actual = $htmlEncoder->convertToHTMLEncoder($htmlElement->toArray());
    if ($expected == $actual) {
        echo "Test_HTMLElementAsArray - Pass";
    } else {
        echo "Test_HTMLElementAsArray - Fail";
    }
}

function Test_HTMLElementAsNativeArray()
{
    $htmlElement = array(
        "table" => array(
            "val" => array(
                array_merge(
                    array(
                        "tr" => array(
                            "val" => array(
                                array_merge(array("th" => array("val" => "Name"))),
                                array_merge(array("th" => array("val" => "Age"))),
                                array_merge(array("th" => array("val" => "City")))
                            )
                        )
                    )
                )
            )
        )
    );
    $htmlEncoder = new HTMLEncoder();

    $expected = '[<table:[<tr:[<th:Name>,<th:Age>,<th:City>]>]>]';
    $actual = $htmlEncoder->convertToHTMLEncoder($htmlElement);

    if ($expected == $actual) {
        echo "Test_HTMLElementAsNativeArray - Pass";
    } else {
        echo "Test_HTMLElementAsNativeArray - Fail";
    }
}

function Test_HTMLElementAsObjectWithAttributes()
{
    $htmlElement = new HTMLElement(
        "table", array(
        new HTMLElement("tr", array(
            new HTMLElement("th", "Name"),
            new HTMLElement("th", "Age"),
            new HTMLElement("th", "City")
        ))),
        array(
            new HTMLAttribute("id", "personTable"),
            new HTMLAttribute("class", "table-class")));

    $htmlEncoder = new HTMLEncoder();
    $expected = '<table id=personTable class=table-class:[<tr:[<th:Name>,<th:Age>,<th:City>]>]>';
    $actual = $htmlEncoder->convertToHTMLEncoder($htmlElement);
    if ($expected == $actual) {
        echo "Test_HTMLElementAsObjectWithAttributes - Pass";
    } else {
        echo "Test_HTMLElementAsObjectWithAttributes - Fail";
    }
}

function Test_HTMLElementAsArrayWithAttributes()
{
    $htmlElement = new HTMLElement(
        "table", array(
        new HTMLElement("tr", array(
            new HTMLElement("th", "Name"),
            new HTMLElement("th", "Age"),
            new HTMLElement("th", "City")
        ))),
        array(
            new HTMLAttribute("id", "personTable"),
            new HTMLAttribute("class", "table-class")));

    $htmlEncoder = new HTMLEncoder();
    $expected = '[<table id=personTable class=table-class:[<tr:[<th:Name>,<th:Age>,<th:City>]>]>]';
    $actual = $htmlEncoder->convertToHTMLEncoder($htmlElement->toArray());
    if ($expected == $actual) {
        echo "Test_HTMLElementAsArrayWithAttributes - Pass";
    } else {
        echo "Test_HTMLElementAsArrayWithAttributes - Fail";
    }
}

function Test_HTMLElementAsNativeArrayWithAttributes()
{
    $htmlElement = array(
        "table" => array(
            "val" => array(
                array_merge(
                    array(
                        "tr" => array(
                            "val" => array(
                                array_merge(array("th" => array("val" => "Name"))),
                                array_merge(array("th" => array("val" => "Age"))),
                                array_merge(array("th" => array("val" => "City")))
                            )
                        )
                    )
                )
            )
        ,
            "attr" => array(
                array_merge(array("id" => "personTable")),
                array_merge(array("class" => "table-class"))
            )
        )
    );
    $htmlEncoder = new HTMLEncoder();
    $expected = '[<table id=personTable class=table-class:[<tr:[<th:Name>,<th:Age>,<th:City>]>]>]';
    $actual = $htmlEncoder->convertToHTMLEncoder($htmlElement);

    if ($expected == $actual) {
        echo "Test_HTMLElementAsNativeArrayWithAttributes - Pass";
    } else {
        echo "Test_HTMLElementAsNativeArrayWithAttributes - Fail";
    }
}

function Test_HTMLElementWithoutValue()
{

    $htmlElement = new HTMLElement(
        "br", "");
    $htmlEncoder = new HTMLEncoder();
    $expected = '<br:>';

    $actual = $htmlEncoder->convertToHTMLEncoder($htmlElement);
    if ($expected == $actual) {
        echo "Test_HTMLElementWithoutValue - Pass";
    } else {
        echo "Test_HTMLElementWithoutValue - Fail";
    }
}

function Test_HTMLElementAsObjectInsideObject()
{
    $htmlElement = new HTMLElement(
        "table", new HTMLElement("tr", "Akila"));
    $htmlEncoder = new HTMLEncoder();
    $expected = '<table:<tr:Akila>>';

    $actual = $htmlEncoder->convertToHTMLEncoder($htmlElement);
    if ($expected == $actual) {
        echo "Test_HTMLElementAsObjectInsideObject - Pass";
    } else {
        echo "Test_HTMLElementAsObjectInsideObject - Fail";
    }
}

function Test_HTMLElementAsObjectInsideObjectInsideArray()
{
    $htmlElement = new HTMLElement(
        "table", new HTMLElement("tr", array(
        new HTMLElement("th", "Akila")
    )));
    $htmlEncoder = new HTMLEncoder();
    $expected = '<table:<tr:[<th:Akila>]>>';

    $actual = $htmlEncoder->convertToHTMLEncoder($htmlElement);
    if ($expected == $actual) {
        echo "Test_HTMLElementAsObjectInsideObjectInsideArray - Pass";
    } else {
        echo "Test_HTMLElementAsObjectInsideObjectInsideArray - Fail";
    }
}

function Test_HTMLElementWithAttributeAsObject()
{

    $htmlElement = new HTMLElement(
        "h1", "Akila", new HTMLAttribute("class", "h1 class"));
    $htmlEncoder = new HTMLEncoder();
    $expected = '<h1 class="h1 class":Akila>';
    $actual = $htmlEncoder->convertToHTMLEncoder($htmlElement);
    if ($expected == $actual) {
        echo "Test_HTMLElementWithAttributeAsObject - Pass";
    } else {
        echo "Test_HTMLElementWithAttributeAsObject - Fail";
    }
}

function Test_HTMLElementWithAttributeAsObjectArray()
{
    $h1Elem = new HTMLElement("h1", "Server Side Code");

    $code1 = new HTMLElement(
        "pre",
        new HTMLElement(
            "code", 'var=akila;', new HTMLAttribute("class", "javascript")));
    $newArr = $h1Elem->AttachElementAsPeer($code1);

    $htmlEncoder = new HTMLEncoder();
    $expected = '[<h1:Server Side Code>,<pre:<code class=javascript:var=akila;>>]';
    $actual = $htmlEncoder->convertToHTMLEncoder($newArr);
    if ($expected == $actual) {
        echo "Test_HTMLElementWithAttributeAsObjectArray - Pass";
    } else {
        echo "Test_HTMLElementWithAttributeAsObjectArray - Fail";
    }
}

Test_HTMLElementAsObject();
echo "<br>";
Test_HTMLElementAsArray();
echo "<br>";
Test_HTMLElementAsNativeArray();
echo "<br>";
Test_HTMLElementAsObjectWithAttributes();
echo "<br>";
Test_HTMLElementAsArrayWithAttributes();
echo "<br>";
Test_HTMLElementAsNativeArrayWithAttributes();
echo "<br>";
Test_HTMLElementWithoutValue();
echo "<br>";
Test_HTMLElementAsObjectInsideObject();
echo "<br>";
Test_HTMLElementAsObjectInsideObjectInsideArray();
echo "<br>";
Test_HTMLElementWithAttributeAsObject();
echo "<br>";
Test_HTMLElementWithAttributeAsObjectArray();