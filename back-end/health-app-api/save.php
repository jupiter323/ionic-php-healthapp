<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header("Content-Type: application/json; charset=UTF-8");

error_reporting(E_ERROR);

//https://<your url>/codetest/save.php?time=60&rep=10&work=3&rest=1&exercise=Standing%20Mountain%20Climbers

include("global.php");

try{
	$conn = new mysqli(server, dbuser, dbpw, db);
	$time = $_GET["time"];
	$rep = $_GET["rep"];
	$work = $_GET["work"];
    $rest = $_GET["rest"];
	$exercise = $_GET['exercise'];
	
	// $query = "update hiit set time = $time, rep = $rep, work = $work, rest = $rest, exercise = '$exercise'";
	$query = "INSERT INTO `hiit` (`time`, `rep`, `work`, `rest`, `exercise`) VALUES ('$time', '$rep', '$work', '$rest', '$exercise')";
    //echo $query;
	$result = $conn->query($query);

	if (!$result){
		$json_out = "[" . json_encode(array("result"=>0)) . "]";		
	}
	else {
		$json_out = "[" . json_encode(array("result"=>1)) . "]";		
	}

	echo $json_out;

	$conn->close();
}
catch(Exception $e) {
	$json_out =  "[".json_encode(array("result"=>0))."]";
	echo $json_out;
}
?>
