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

$ini_array = parse_ini_file("../../config.ini");
$serverName = $ini_array["serverName"];
$username = $ini_array["userName"];
$password = $ini_array["password"];
$dbName = $ini_array["dbName"];
$tableName = $ini_array["tableName"];

if ($id == "expectedResult") {
    $h1Elem = new HTMLElement(
        "h1", "Expected Result");
    $imgSrc = new HTMLElement(
        "img",
        "",
        new HTMLAttribute(
            "src",
            "Resources/ExpectedResult.PNG"
        ));

    $element = HTMLTree::AttachElementAsPeer($h1Elem->toArray(), $imgSrc);

    $encoder = new HTMLEncoder();
    echo $encoder->convertToHTMLEncoder($element);
} elseif ($id == "serverSideCode") {
    $h1Elem = new HTMLElement("h1", "Server Side Code");

    $code1 = new HTMLElement(
        "pre",
        array(//problem here
            new HTMLElement(
                "code",
                '$elm = new HTMLElement(
            "table", array(
            new HTMLElement("tr", array(
                new HTMLElement("th", "Name"),
                new HTMLElement("th", "Age"),
                new HTMLElement("th", "City")
            ))),
            array(
                new HTMLAttribute("id", "personTable"),
                new HTMLAttribute("class", "table-class")));

        $newArr = $elm->toArray();
        $count1 = 1;
        foreach ($resultDataSet as $value):
            $e = new HTMLElement("tr", array(
                    new HTMLElement("td", $value["Name"]),
                    new HTMLElement("td", $value["Age"]),
                    new HTMLElement("td", $value["City"])
                )
            );
            $newArr["table"]["val"][$count1] = $e->toArray();
            $count1++;
        endforeach;
        $encoder = new HTMLEncoder();
        echo $encoder->convertToHTMLEncoder($newArr);'
            )));
    $newArr = HTMLTree::AttachElementAsPeer($h1Elem->toArray(), $code1);

    $encoder = new HTMLEncoder();
    echo $encoder->convertToHTMLEncoder($newArr);

} elseif ($id == "HTMLEncoderString") {

// Create connection
    $conn = mysqli_connect($serverName, $username, $password, $dbName);
// Check connection
    if (!$conn) {
        echo "$serverName - $username - $password - $dbName - $tableName";
        die("\nConnection failed: " . mysqli_connect_error());
    }

    $sql = "SELECT * FROM $tableName";
    $result = mysqli_query($conn, $sql);
    $resultDataSet = array();
    while ($row = mysqli_fetch_array($result)) {
        for ($i = 0; $i < 1; $i++) {
            array_push($resultDataSet, $row);
        }
    }
    $elm = new HTMLElement(
        "table", array(
        new HTMLElement("tr", array(
            new HTMLElement("th", "Name"),
            new HTMLElement("th", "Age"),
            new HTMLElement("th", "City")
        ))),
        array(
            new HTMLAttribute("id", "personTable"),
            new HTMLAttribute("class", "table-class")));

    $newArr = $elm->toArray();
    $count1 = 1;
    foreach ($resultDataSet as $value):

        $e = new HTMLElement("tr", array(
                new HTMLElement("td", $value["Name"]),
                new HTMLElement("td", $value["Age"]),
                new HTMLElement("td", $value["City"])
            )
        );
        $newArr["table"]["val"][$count1] = $e->toArray();
        $count1++;
    endforeach;
    $encoder = new HTMLEncoder();
    $code = $encoder->convertToHTMLEncoder($newArr);

    $sampleCode = '[
  <table:
    <val:[
      <tr:
        <val:[
            <th:<val:Name>>,
            <th:<val:Age>>,
            <th:<val:City>>
          ]
        >
      >,
      <tr:
        <val:[
            <td:<val:Akila>>,
            <td:<val:22>>,
            <td:<val:Mount Lavinia>>
          ]
        >
      >,
      <tr:
        <val:[
            <td:<val:Randil>>,
            <td:<val:23>>,
            <td:<val:Colombo>>
            ]
        >
      >
    ],
    attr:[
      <id:personTable>,
      <class:table-class>
      ]
    >
  >
]';
    $sampleCode = str_replace('<', '&lt;', $sampleCode);
    $sampleCode = str_replace('>', '&gt;', $sampleCode);
    $h1Elem = new HTMLElement("h1", "HTMLEncoder Code");
    $code1 = new HTMLElement(
        "pre",
        array(//problem here
            new HTMLElement(
                "code", $sampleCode
            )));
    $newArr = HTMLTree::AttachElementAsPeer($h1Elem->toArray(), $code1);
    $encoder = new HTMLEncoder();
    echo $encoder->convertToHTMLEncoder($newArr);
} elseif ($id == "frontEndCode") {
    $h1Elem = new HTMLElement("h1", "Client Side Code");

    $code1 = new HTMLElement(
        "pre",
        array(//problem here
            new HTMLElement("code", 'HTMLEncoder.GetAndAppend("HTMLEncoder",result)')));
    $newArr = HTMLTree::AttachElementAsPeer($h1Elem->toArray(), $code1);

    $encoder = new HTMLEncoder();
    echo $encoder->convertToHTMLEncoder($newArr);

}
