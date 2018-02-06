<?php
/**
 * Created by PhpStorm.
 * User: akilarhettiarachchi
 * Date: 9/20/17
 * Time: 11:52 AM
 */
require_once ("HTMLEncoder/HTMLEncoder.php");
require_once ("HTMLEncoder/HTMLElement.php");

$type = $_GET["type"];
$dataSets = $_GET["dataSets"];

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
        for ($i = 0; $i <$dataSets; $i++){
            array_push($resultDataSet, $row);
        }

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

    } elseif ($type == "JSON") {
        $dataSet = array();
        foreach ($resultDataSet as $value) {
            $jsonData = array('name' => $value['Name'], 'age' => $value['Age'], 'city' => $value['City']);

            array_push($dataSet, $jsonData);
        }
        $jsonDataSet = json_encode($dataSet);
        echo $jsonDataSet;
    } elseif ($type == "HTMLEncoder") {

//        $htmlEncoder = new HTMLEncoder();
//        $htmlElement = new HTMLElement("table");
//        $htmlElement->addAttribute(new HTMLAttribute("class","tableClass"));
//        $htmlElement-> addValue("jiberish");
//
//        $htmlEncoder->createElement($htmlElement);
//        $htmlEncoder->encodeToJSON();
//        $jsonData = array(
//            "html"=>array(
//                "table"=>array(
//                    "tr"=>array(
//                        array_merge(array("th"=> "Name")), array_merge(array("th"=> "Age")), array_merge(array("th"=> "City"))
//                    )
//                )
//            )
//        );
//        var_dump($jsonData);
//        $value = $resultDataSet[0];
//        echo "{
//	\"html\": [
//	{
//	    \"div\":
//	    {
//	         \"h1\":\"Hello World!\"
//	    }
//	},
//	{
//		\"table\": [
//			{
//				\"tr\": [
//					{
//					\"th\": \"Name\"
//				},
//				{
//					\"th\": \"Age\"
//				},
//				{
//					\"th\": \"City\"
//				}
//			]
//			},
//				{
//					\"tr\":
//					[
//						{
//							\"th\":\"".$value['Name']."\"
//						},
//						{
//							\"th\":\"".$value['Age']."\"
//						},
//						{
//							\"th\":\"".$value['City']."\"
//						}
//					]
//				}
//
//		]
//	}
//	]
//
//}" ;

         $json = "
        {

		\"table\": [
			{
				\"tr\": [
					{
					\"th\": \"Name\"
				},
				{
					\"th\": \"Age\"
				},
				{
					\"th\": \"City\"
				}
			]},
				{
					\"tr\":[";

         $count =0;
        foreach ($resultDataSet as $value):

            if ($count != 0){

                $json .= "
                        ,{
					\"tr\":
					[
						{
							\"th\":\"".$value['Name']."\"
						},
						{
							\"th\":\"".$value['Age']."\"
						},
						{
							\"th\":\"".$value['City']."\"
						}
					]
				}";
            } else{
                $json .= "
                        {
					\"tr\":
					[
						{
							\"th\":\"".$value['Name']."\"
						},
						{
							\"th\":\"".$value['Age']."\"
						},
						{
							\"th\":\"".$value['City']."\"
						}
					]
				}";
            }

    $count++;
        endforeach;


//        $json .="]}]}]}";
        $json .="]}]}";
		echo $json;

//}";


//        echo "
//        {
//	\"html\": [{
//		\"table\": [
//			{
//				\"tr\": [
//					{
//					\"th\": \"Name\"
//				},
//				{
//					\"th\": \"Age\"
//				},
//				{
//					\"th\": \"City\"
//				}
//			]},
//				{
//					\"tr\":
//					[
//						{
//							\"th\":\"Akila\"
//						},
//						{
//							\"th\":21
//						},
//						{
//							\"th\":\"Mount Lavinia\"
//						}
//					]
//				}
//
//		]
//	}]
//
//}";
//        echo json_encode($jsonData);

    }
} else {
    echo "0 results";
}


//"attr":{
//    "Class":"hello"
//			},
