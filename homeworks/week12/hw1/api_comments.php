<?php

require_once('conn.php');
header('Content-type:application/json;charset=utf-8');
// 告訴 browser 這是 json 格式的資料
header('Access-Control-Allow-Origin: *');

if (
  empty($_GET['site_key'])
  ) {
  $json = array(
    "ok" => false,
    "message" => "Please send site_key"
  );
  $response = json_encode($json);
  echo $response;
  die();
}

$site_key = $_GET['site_key'];

$offset = 0;
if (!empty($_GET['offset'])) {
  $offset = $_GET['offset'];
}

$sql = 'SELECT nickname, content, created_at FROM huiming_w12_hw1 WHERE site_key=? ORDER BY ID DESC LIMIT 5 OFFSET ?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('si', $site_key, $offset);
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
$comments = array();
while($row = $result->fetch_assoc()) {
  array_push($comments, array(
    "nickname" => $row['nickname'],
    "content" => $row['content'],
    "created_at" => $row['created_at']
  ));
}

$json = array(
  "ok" => true,
  "comments" => $comments
);
$response = json_encode($json);
echo $response;

?>