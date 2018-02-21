<?php
/**
 * Created by PhpStorm.
 * User: akilarhettiarachchi
 * Date: 9/20/17
 * Time: 11:52 AM
 */

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
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT * FROM ".$tableName;
$result = mysqli_query($conn, $sql);
$resultDataSet = array();
if (mysqli_num_rows($result) > 0) {

    while ($row = mysqli_fetch_array($result)) {
        for ($i = 0; $i < $dataSets; $i++) {
            array_push($resultDataSet, $row);
        }

    }

    if ($type == "HTML") {
        $htmlSerialize = '<table><tr><th>Name</th><th>Age</th><th>City</th></tr>';

        foreach ($resultDataSet as $value):

            $htmlSerialize .= '<tr><td>' . $value['Name'] . '</td><td>' . $value['Age'] . '</td><td>' . $value['City'] . '</td></tr>';

        endforeach;

        $htmlSerialize .= '</table>';

        echo $htmlSerialize;

    } elseif ($type == "JSON") {
        $dataSet = array();
        foreach ($resultDataSet as $value) {
            $jsonData = array('name' => $value['Name'], 'age' => $value['Age'], 'city' => $value['City']);

            array_push($dataSet, $jsonData);
        }
        $jsonDataSet = json_encode($dataSet);
        echo $jsonDataSet;
    } elseif ($type == "HTMLEncoder") {

        $jsonData = array(
            "table" => array(
                array_merge(array("tr" => array(
                        array_merge(array("th" => "Name")),
                        array_merge(array("th" => "Age")),
                        array_merge(array("th" => "City"))
                    )
                    )

                )
            )
        );

        $count = 1;
        foreach ($resultDataSet as $value):

            $jsonData["table"][$count] = array_merge(array("tr" => array(
                array_merge(array("td" => $value["Name"])),
                array_merge(array("td" => $value["Age"])),
                array_merge(array("td" => $value["City"]))
            )));
            $count++;
        endforeach;
        sendToClient(json_encode($jsonData));
    }
} else {
    echo "0 results";
}


function sendToClient($jsonArray)
{

    recursiveCheck(json_decode($jsonArray));
    echo $GLOBALS['str'];

}

function recursiveCheck($data)
{
    if (is_string($data)) {
        $GLOBALS['str'] .= $data;
    } else if (is_array($data)) {
        $GLOBALS['str'] .= '[';
        foreach ($data as $key => $value) {
            recursiveCheck($value);
            if (next($data) != null) {
                $GLOBALS['str'] .= ",";
            }
        }
        $GLOBALS['str'] .= ']';
    } else if (is_object($data)) {
        foreach ($data as $key => $value) {
            $GLOBALS['str'] .= '{' . $key . ':';
            recursiveCheck($value);
            $GLOBALS['str'] .= '}';
        }
    }
}

