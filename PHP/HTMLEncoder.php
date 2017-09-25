<?php
/**
 * Created by PhpStorm.
 * User: akilarhettiarachchi
 * Date: 9/20/17
 * Time: 11:52 AM
 */

$type = $_GET["type"];

$serverName = "localhost:3306";
$username = "root";
$password = "";
$dbName = "People";

// Create connection
$conn = mysqli_connect($serverName, $username, $password, $dbName);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT * FROM person";
$result = mysqli_query($conn, $sql);
$resultDataSet = array();
if (mysqli_num_rows($result) > 0) {

    while ($row = mysqli_fetch_array($result)) {
        array_push($resultDataSet, $row);
    }
    if ($type == "HTML") {
        $htmlSerialize = '
        <table>
            <tr>
                <th>Name</th>
                <th>Age</th>
                <th>City</th>
            </tr>';

        foreach ($resultDataSet as $value):

            $htmlSerialize .= '
                 <tr>
                    <td>' . $value['Name'] . '</td>
                    <td>' . $value['Age'] . '</td>
                    <td>' . $value['City'] . '</td>
                </tr>';

        endforeach;

        $htmlSerialize .= '</table>';

        echo $htmlSerialize;

    } elseif ($type = "JSON") {
        $dataSet = array();
        foreach ($resultDataSet as $value) {
            $jsonData = array('name' => $value['Name'], 'age' => $value['Age'], 'city' => $value['City']);

            array_push($dataSet, $jsonData);
        }
        $jsonDataSet = json_encode($dataSet);
        echo $jsonDataSet;
    } elseif
    ($type = "HTMLEncoder") {
        echo "";
    }
} else {
    echo "0 results";
}



