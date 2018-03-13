<?php
/**
 * Created by PhpStorm.
 * User: Akila Hettiarachchi
 * Date: 3/5/2018
 * Time: 10:00 PM
 */

$libPath = "../../HTMLEncoderLibrary/src/PHPLibrary/HTMLEncoder";
require_once("$libPath/HTMLEncoder.php");
require_once("$libPath/HTMLTree.php");
require_once("$libPath/HTMLElement.php");
require_once("$libPath/HTMLAttribute.php");

$id = $_GET["id"];

if ($id == "expectedResult") {
    $h1Elem = new HTMLElement(
        "h1", "Expected Result", new HTMLAttribute("class", "text-center"));
    $imgSrc = new HTMLElement(
        "img",
        "",
        array(
            new HTMLAttribute(
                "src",
                "Resources/ExpectedResult.PNG"
            ),
            new HTMLAttribute(
                "class",
                "card-img-bottom rounded mx-auto d-block"
            )
        )
    );

    $element = $h1Elem->AttachElementAsPeer($imgSrc);

    $encoder = new HTMLEncoder();
    echo $encoder->convertToHTMLEncoder($element);
} elseif ($id == "serverSideCode") {
    $h1Elem = new HTMLElement("h1", "PHP Code", new HTMLAttribute("class", "sm-php-h1 text-center"));

    $code1 = new HTMLElement(
        "pre",
        new HTMLElement(
            "code",
            '    $element = new HTMLElement(
        "table",
        array(
            new HTMLElement("tr",
                array(
                    new HTMLElement("th", "Name"),
                    new HTMLElement("th", "Age"),
                    new HTMLElement("th", "City")
                )),
            new HTMLElement("tr",
                array(
                    new HTMLElement("td", "Akila"),
                    new HTMLElement("td", "22"),
                    new HTMLElement("td", "Mount Lavinia")
                )),
            new HTMLElement("tr",
                array(
                    new HTMLElement("td", "Randil"),
                    new HTMLElement("td", "23"),
                    new HTMLElement("td", "Colombo")
                ))
        ),
        array(
            new HTMLAttribute("id", "personTable"),
            new HTMLAttribute("class", "table table-hover table-dark table-bordered")));
    $encoder = new HTMLEncoder();
    $code = $encoder->convertToHTMLEncoder($element);'
            , new HTMLAttribute("class", "php-code")));
    $newArr = $h1Elem->AttachElementAsPeer($code1);

    $encoder = new HTMLEncoder();
    echo $encoder->convertToHTMLEncoder($newArr);

} elseif ($id == "HTMLEncoderString") {
    $sampleCode = '[
	<table id=personTable class="table table-hover table-dark table-bordered":[
			<tr:[
					<th:Name>,
					<th:Age>,
					<th:City>
				]
			>,
			<tr:[
					<td:Akila>,
					<td:22>,
					<td:Mount Lavinia>
				]
			>,
			<tr:[
					<td:Randil>,
					<td:23>,
					<td:Colombo>
				]
			>
		]
	>
]
';
    $sampleCode = str_replace('<', '&lt;', $sampleCode);
    $sampleCode = str_replace('>', '&gt;', $sampleCode);

    $h1Elem = new HTMLElement("h1", "HTON Code", new HTMLAttribute("class", "text-center sm-hton-h1"));
    $code1 = new HTMLElement(
        "pre",
        new HTMLElement(
            "code",
            $sampleCode,
            array(
                new HTMLAttribute("id", "htnCode"),
                new HTMLAttribute("class", "hton-code json"))));
    $newArr = $h1Elem->AttachElementAsPeer($code1);
    $encoder = new HTMLEncoder();
    echo $encoder->convertToHTMLEncoder($newArr);

} elseif ($id == "frontEndCode") {
    $h1Elem = new HTMLElement("h1", "JavaScript Code", new HTMLAttribute("class", "text-center"));

    $code1 = new HTMLElement(
        "pre",
        new HTMLElement("code", 'HTMLEncoder.GetAndAppend("HTMLEncoder",result);',
            new HTMLAttribute("class", "javascript js-code")));
    $newArr = $h1Elem->AttachElementAsPeer($code1);

    $encoder = new HTMLEncoder();
    echo $encoder->convertToHTMLEncoder($newArr);
}
