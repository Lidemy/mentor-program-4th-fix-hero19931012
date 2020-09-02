<?php

require_once('conn.php');
$ID = '';
$sql = '';
if (!empty($_GET['ID'])) {
  $ID = $_GET['ID'];
  $sql = 'SELECT * FROM huiming_w11_hw2_blog_posts WHERE ID=?';
} else {
  $sql = 'SELECT * FROM huiming_w11_hw2_blog_posts ORDER BY ID DESC LIMIT 5';
}

$stmt = $conn->prepare($sql);

if (!empty($_GET['ID'])) {
  $stmt->bind_param('i', $ID);
}

$result = $stmt->execute();
if (!$result) {
  die('Error: ' . $conn->error);
}

$result = $stmt->get_result();
$posts = array();
while($row = $result->fetch_assoc()) {
  array_push($posts, array(
    'post' => $row
  ));
}

$json = array(
  'posts' => $posts
);

$response = json_encode($json);
header('Content-Type', 'application/x-www-form-urlencoded');
echo $response;
?>