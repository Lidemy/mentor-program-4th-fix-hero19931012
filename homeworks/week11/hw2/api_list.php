<?php

require_once('conn.php');
$sql = 'SELECT * FROM huiming_w11_hw2_blog_posts ORDER BY ID DESC';
$stmt = $conn->prepare($sql);
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