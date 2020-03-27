<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header("Content-Type: application/json; charset=UTF-8");

include("global.php");

$conn = new mysqli(server, dbuser, dbpw, db);

$query = "select time, rep, work, rest,exercise from hiit";
$result = $conn->query($query);

$outp = "[";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	if ($outp != "[") {$outp .= ",";}
	$outp .= '{"time":'. $rs["time"].',';
	$outp .= '"rep":'.$rs["rep"].',';
	$outp .= '"work":'.$rs["work"].',';
	$outp .= '"rest":'.$rs["rest"].',';
	$outp .= '"exercise":"'. $rs["exercise"].'"}';
}
$outp .="]";

$conn->close();

echo($outp);
?>
