<?php
require_once('conn.php');

$stmt = $conn->prepare(
  'SELECT * FROM huiming_w11_users'
);

$result = $stmt->execute();
if (!$result) {
  die('Error: ' . $conn->error);
}

$result = $stmt->get_result();
$users = array();
while ($row = $result->fetch_assoc()) {
  array_push($users, array(
    "user" => $row
  ));
}

$json = array();
array_push($json, array(
  "users" => $users
));

$response = json_encode($json);
header('Content-Type', 'application/x-www-form-urlencoded');
echo $response;

?>