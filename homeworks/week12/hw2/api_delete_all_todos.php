<?php
require_once('conn.php');

if (empty($_POST['userID'])) {
  $json = array(
    "ok" => false,
    "message" => "data not complete"
  );
  $response = json_encode($json);
  echo $response;
  die();
}

$userID = $_POST['userID'];

$sql = 'UPDATE huiming_w12_todos SET is_deleted=1 WHERE userID=?';
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

$json = array(
  "ok" => true,
  "message" => "success"
);
$response = json_encode($json);
echo $response;
?>