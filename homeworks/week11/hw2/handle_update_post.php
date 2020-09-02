<?php
require_once('conn.php');

$ID = '';
$sql = '';
$stmt = '';

$title = $_POST['title'];
$content = $_POST['content'];

if (!empty($_POST['ID'])) {
  $ID = $_POST['ID'];
  $sql = 'UPDATE huiming_w11_hw2_blog_posts SET title=?, content=? WHERE ID=?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ssi', $title, $content, $ID);
} else {
  $sql = 'INSERT INTO huiming_w11_hw2_blog_posts (title, content) VALUE(?, ?)';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $title, $content);
}

$result = $stmt->execute();
if (!$result) {
  die('Error: ' . $conn->error);
}

header('Location: index.php')
?>