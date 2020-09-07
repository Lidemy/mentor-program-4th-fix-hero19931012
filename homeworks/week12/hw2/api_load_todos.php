<?php
require_once('conn.php');
header('Content-type:application/json;charset=utf-8');

if (
  empty($_GET['ID'])
  ) {
  $json = array(
    "ok" => false,
    "message" => "Please send ID"
  );
  $response = json_encode($json);
  echo $response;
  die();
}

$userID = $_GET['ID'];

$sql = 'SELECT * FROM huiming_w12_todos WHERE userID=? AND is_deleted is NULL';
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $userID);
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

$result = $stmt->get_result();
$todos = array();
while($row = $result->fetch_assoc()) {
  array_push($todos, array(
    "ID" => $row['ID'],
    "content" => $row['content'],
  ));
}

$json = array(
  "ok" => true,
  "todos" => $todos
);
$response = json_encode($json);
echo $response;
