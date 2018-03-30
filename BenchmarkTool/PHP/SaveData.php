<?php
/**
 * Created by PhpStorm.
 * User: akilarhettiarachchi
 * Date: 3/29/18
 * Time: 5:01 PM
 */

$data = $_POST["BenchmarkResults"];
if ($data != "" || $data !=null) {
    if (!file_exists($filePath)) {
        mkdir($filePath, 0777, true);
    }
    $my_file = $filePath . "Data.json";
    $handle = fopen($my_file, 'w') or die('Cannot open file:  ' . $my_file);
    fwrite($handle, json_encode(json_decode($data),JSON_PRETTY_PRINT));
    fclose($handle);
    echo $data;
}else{
    echo $data;
    echo "Data Not Received";
}