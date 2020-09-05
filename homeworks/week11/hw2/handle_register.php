<?php

require_once('conn.php');

print_r($_POST);

$username = $_POST['username'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);

$sql = 'INSERT INTO huiming_w11_hw2_blog_users(username, password) VALUE(?, ?)';
$stmt = $conn->prepare($sql);
$stmt->bind_param('ss', $username, $password);
$result = $stmt->execute();
if (!$result) {
  die('Error: ' . $conn->error);
}

header('Location: index.php')
?>