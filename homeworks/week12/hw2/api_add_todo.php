<?php
require_once('conn.php');
header('Content-type:application/json;charset=utf-8');
header('Access-Control-Allow-Origin: *');

if (
  empty($_POST['json']) ||
  empty($_POST['userID'])
  ){
  $json = array(
    "ok" => false,
    "message" => "data not complete"
  );
  $response = json_encode($json);
  echo $response;
  die();
}
$content = $_POST['json'];
$userID = $_POST['userID'];
$sql = 'INSERT INTO huiming_w12_todos(userID, content) VALUES(?, ?)';
$stmt = $conn->prepare($sql);
$stmt->bind_param('ss', $userID, $content);
$result = $stmt->execute();
if (!$result) {
  $json = array(
    "ok" => false,
    "message" => $conn->error
  );
  $response = json_encode($json);
  echo $response;
  die();
}

$sql_ID = 'SELECT COUNT(ID) as count FROM huiming_w12_todos';
$result = $conn->query($sql_ID);
$row = $result->fetch_assoc();
$ID = intval($row['count']) + 1;

$json = array(
  "ok" => true,
  "message" => "success",
  "ID" => $ID
);
$response = json_encode($json);
echo $response;


?>