<?php
/**
 * Created by PhpStorm.
 * User: akilarhettiarachchi
 * Date: 9/20/17
 * Time: 11:52 AM
 */

$type = $_GET["type"];

if ($type == "HTML") {
    $dataSet = "
<table>
    <tr> 
        <th>Name</th> 
        <th>Age</th> 
        <th>City</th> 
    </tr><tr> 
    <tr>
        <td>John</td>
        <td> 32 </td>
        <td> Mount Lavinia </td> 
    </tr>
</table>";
    echo $dataSet;

} elseif ($type = "JSON") {
    $dataSet = array(
        'name' => 'John',
        'age' => 32,
        'city' => 'Mount Lavinia');
    $jsonDataSet = json_encode($dataSet);
    echo $jsonDataSet;
} elseif ($type = "HTMLEncoder") {
    echo "";
}