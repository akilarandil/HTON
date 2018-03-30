<?php
/**
 * Created by PhpStorm.
 * User: akilarhettiarachchi
 * Date: 3/27/18
 * Time: 9:39 PM
 */

$timeStamp = $_GET["timeStamp"];
$iterations = $_GET["iterations"];

$filePath = "Serialization Data/$timeStamp";

$types = array("HTML","JSON","HTON");

$html = array();
$json = array();
$xml = array();
$hton = array();

$oneArray=array();
$tenArray=array();
$twentyArray=array();
$fiftyArray=array();
$hundredArray=array();

$dataSets = array("1","10","20","50","100");

foreach ($dataSets as $dataSet) {
    $type = "HTML";
    for ($count = 1; $count <= $iterations; $count++) {
        $my_file = $filePath . "/" . $type . "_" . $count ."_".$dataSet. ".json";
        $handle = fopen($my_file, 'r');
        $data = fread($handle, filesize($my_file));
        $jsonData = json_decode($data, true);
        $time = $jsonData["Serialization Time"];

        array_push($html, $time);
        fclose($handle);
    }
    if ($dataSet == "1"){
        array_push($oneArray,
            array($type=>$html)
        );
    } else if ($dataSet == "10"){
        array_push($tenArray,
            array($type=>$html)
        );
    }else if ($dataSet == "20"){
        array_push($twentyArray,
            array($type=>$html)
        );
    }else if ($dataSet == "50"){
        array_push($fiftyArray,
            array($type=>$html)
        );
    }else if ($dataSet == "100"){
        array_push($hundredArray,
            array($type=>$html)
        );
    }

    $type = "JSON";
    for ($count = 1; $count <= $iterations; $count++) {

        $my_file = $filePath . "/" . $type . "_" . $count ."_".$dataSet. ".json";
        $handle = fopen($my_file, 'r');
        $data = fread($handle, filesize($my_file));
        $jsonData = json_decode($data, true);
        $time = $jsonData["Serialization Time"];
        array_push($json, $time);
        fclose($handle);
    }
    if ($dataSet == "1"){
        array_push($oneArray,
            array($type=>$json)
        );
    } else if ($dataSet == "10"){
        array_push($tenArray,
            array($type=>$json)
        );
    }else if ($dataSet == "20"){
        array_push($twentyArray,
            array($type=>$json)
        );
    }else if ($dataSet == "50"){
        array_push($fiftyArray,
            array($type=>$json)
        );
    }else if ($dataSet == "100"){
        array_push($hundredArray,
            array($type=>$json)
        );
    }

    $type = "XML";
    for ($count = 1; $count <= $iterations; $count++) {

        $my_file = $filePath . "/" . $type . "_" . $count ."_".$dataSet. ".json";
        $handle = fopen($my_file, 'r');
        $data = fread($handle, filesize($my_file));
        $jsonData = json_decode($data, true);
        $time = $jsonData["Serialization Time"];
        array_push($xml, $time);
        fclose($handle);
    }
    if ($dataSet == "1"){
        array_push($oneArray,
            array($type=>$xml)
        );
    } else if ($dataSet == "10"){
        array_push($tenArray,
            array($type=>$xml)
        );
    }else if ($dataSet == "20"){
        array_push($twentyArray,
            array($type=>$xml)
        );
    }else if ($dataSet == "50"){
        array_push($fiftyArray,
            array($type=>$xml)
        );
    }else if ($dataSet == "100"){
        array_push($hundredArray,
            array($type=>$xml)
        );
    }

    $type = "HTON";
    for ($count = 1; $count <= $iterations; $count++) {

        $my_file = $filePath . "/" . $type . "_" . $count ."_".$dataSet. ".json";
        $handle = fopen($my_file, 'r');
        $data = fread($handle, filesize($my_file));
        $jsonData = json_decode($data, true);
        $time = $jsonData["Serialization Time"];
        array_push($hton, $time);
        fclose($handle);
    }
    if ($dataSet == "1"){
        array_push($oneArray,
            array($type=>$hton)
        );
    } else if ($dataSet == "10"){
        array_push($tenArray,
            array($type=>$hton)
        );
    }else if ($dataSet == "20"){
        array_push($twentyArray,
            array($type=>$hton)
        );
    }else if ($dataSet == "50"){
        array_push($fiftyArray,
            array($type=>$hton)
        );
    }else if ($dataSet == "100"){
        array_push($hundredArray,
            array($type=>$hton)
        );
    }

}

$finalArray = array(
    "1" => array_merge($oneArray),
    "10" => $tenArray,
    "20" => $twentyArray,
    "50" => $fiftyArray,
    "100" => $hundredArray
);
echo json_encode($finalArray);
delete_dir("Serialization Data");


function delete_dir($src) {
    $dir = opendir($src);
    while(false !== ( $file = readdir($dir)) ) {
        if (( $file != '.' ) && ( $file != '..' )) {
            if ( is_dir($src . '/' . $file) ) {
                delete_dir($src . '/' . $file);
            }
            else {
                unlink($src . '/' . $file);
            }
        }
    }
    closedir($dir);
    rmdir($src);

}