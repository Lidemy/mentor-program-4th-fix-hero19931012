<?php
require_once('conn.php');
require_once('utils.php');

// header('Content-Type', 'application/json;charset=utf-8');
header('Content-Type', 'application/x-www-form-urlencoded');
// php 沒辦法用 $_POST 拿到 application/json 的資料

// $json = array(
//   'post' => $_POST
// );
// $response = json_encode($json);
// echo $response;

if (empty($_POST['content'])) {
  $json = array(
    "ok" => false,
    "message" => "Content empty"
  );
  $response = json_encode($json);
  echo $response;
  die();
}


$content = $_POST['content'];
$user_ID = getUserIDFromUsername($_POST['username']);
$nickname = getNicknameFromUsername($username);

$sql = 'INSERT INTO huiming_w11_comments(user_ID, content) VALUES (?, ?)';
$stmt = $conn->prepare($sql);
$stmt->bind_param('is', $user_ID, $content);

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