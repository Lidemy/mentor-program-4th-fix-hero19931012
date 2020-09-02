<?php
require_once('conn.php');
require_once('utils.php');

header('Content-Type', 'application/x-www-form-urlencoded');

$username = $_SESSION['username'];
if ($username !== 'admin') {
  header('Location: index.php');
}

$user_ID = $_POST['user_ID'];
$int = $_POST['int'];

$sql = 'UPDATE huiming_w11_users SET authority=? WHERE ID=?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('ii', $int, $user_ID);

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

// success condition
$json = array(
  "ok" => true,
  "message" => "Success"
);
$response = json_encode($json);
echo $response;
?>