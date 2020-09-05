<?php
require_once('conn.php');

$items_per_page = 4;
if (!empty($_GET['page'])) {
  $current_page = $_GET['page'];
} else {
  $current_page = 1;
}
$offset = ($current_page - 1) * $items_per_page;

$stmt = $conn->prepare(
  'SELECT 
  C.ID as ID, C.content AS content, C.created_at AS created_at, 
  C.is_deleted AS is_deleted, U.nickname AS nickname, 
  U.ID AS user_ID, U.username AS username
  FROM huiming_w11_comments as C 
  LEFT JOIN huiming_w11_users AS U ON C.user_ID = U.ID
  WHERE is_deleted IS NULL
  ORDER BY C.ID DESC
  LIMIT ? OFFSET ?'
);

$stmt->bind_param('ii', $items_per_page, $offset);
$result = $stmt->execute();
if (!$result) {
  die('Error: ' . $conn->error);
}

$result = $stmt->get_result();
$comments = array();
while ($row = $result->fetch_assoc()) {
  array_push($comments, array(
    "comment" => $row
  ));
}

$json = array();
array_push($json, array(
  "comments" => $comments
));

$response = json_encode($json);
header('Content-Type', 'application/x-www-form-urlencoded');
echo $response;
