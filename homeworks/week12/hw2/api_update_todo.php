<?php
require_once('conn.php');

if (
  empty($_POST['todoID']) ||
  empty($_POST['json'])
) {
  $json = array(
    "ok" => false,
    "message" => "data not complete"
  );
  $response = json_encode($json);
  echo $response;
  die();
}

$ID = $_POST['todoID'];
$content = $_POST['json'];

$sql = 'UPDATE huiming_w12_todos SET content=? WHERE ID=?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('si', $content, $ID);
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