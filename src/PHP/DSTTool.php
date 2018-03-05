<?php
/**
 * Created by PhpStorm.
 * User: akilarhettiarachchi
 * Date: 9/20/17
 * Time: 11:52 AM
 */

$libPath = "HTMLEncoder";
require_once("$libPath/HTMLEncoder.php");
require_once("$libPath/HTMLTree.php");
require_once("$libPath/HTMLElement.php");
require_once("$libPath/HTMLAttribute.php");

$type = $_GET["type"];
$dataSets = $_GET["dataSets"];

$ini_array = parse_ini_file("config.ini");
$serverName = $ini_array["serverName"];
$username = $ini_array["userName"];
$password = $ini_array["password"];
$dbName = $ini_array["dbName"];
$tableName = $ini_array["tableName"];
$str = "";

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
if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_array($result)) {
        for ($i = 0; $i < $dataSets; $i++) {
            array_push($resultDataSet, $row);
        }

    }
    if ($type == "HTML") {
        $htmlSerialize = '<table id=personTable class=table-class>'.
                            '<tr>'.
                                '<th>Name</th>'.
                                '<th>Age</th>'.
                                '<th>City</th>'.
                            '</tr>';
        $count=1;
        foreach ($resultDataSet as $value):

            $htmlSerialize .= '<tr><td>' .
                $value['Name'] . '</td><td>' .
                $value['Age'] . '</td><td>'.
                $value['City'] . '</td></tr>';
            $count++;
        endforeach;

        $htmlSerialize .= '</table>';

        echo $htmlSerialize;

    } elseif ($type == "JSON") {
        $dataSet = array();
        $count=1;
        foreach ($resultDataSet as $value) {
            $jsonData = array(
                "name"=>  $value['Name'] ,
                "age"=> $value['Age'],
                "city"=> $value['City']
            );

            array_push($dataSet, $jsonData);
            $count++;
        }
        $jsonDataSet = json_encode($dataSet);
        echo $jsonDataSet;
    } elseif ($type == "HTMLEncoder") {

        $elm = new HTMLElement(
            "table", array(
            new HTMLElement("tr", array(
                new HTMLElement("th", "Name"),
                new HTMLElement("th" ,"Age"),
                new HTMLElement("th" , "City")
            ))),
            array(
                new HTMLAttribute("id", "personTable"),
                new HTMLAttribute("class", "table-class")));

        $newArr = $elm->toArray() ;
        $count1 = 1;
        foreach ($resultDataSet as $value):

            $e = new HTMLElement("tr", array(
                    new HTMLElement("td" , $value["Name"]),
                    new HTMLElement("td" , $value["Age"]),
                    new HTMLElement("td" , $value["City"])
                )
            );
            $newArr["table"]["val"][$count1] =$e->toArray();
            $count1++;
        endforeach;
        $encoder = new HTMLEncoder();
        echo $encoder->convertToHTMLEncoder($newArr);
    }
} else {
    echo "0 results";
}
