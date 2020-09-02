<?php

session_start();
require_once('conn.php');

if (
  empty($_POST['nickname']) || 
  empty($_POST['username']) || 
  empty($_POST['password'])) 
  {
    header('Location: register.php?errCode=1');
    die();
  }

$nickname = $_POST['nickname'];
$username = $_POST['username'];

$password = password_hash($_POST['password'], PASSWORD_DEFAULT);

$sql = 'INSERT INTO huiming_w11_users(nickname, username, password) VALUES (?, ?, ?)';
$stmt = $conn->prepare($sql);
$stmt->bind_param('sss', $nickname, $username, $password);
$result = $stmt->execute();

if (!$result) {
  if (strpos($conn->error, 'Duplicate entry') !== false) {
    header('Location: register.php?errCode=2');
  }
  die("Error" . $conn->error);
}

$_SESSION['username'] = $username;
header('Location: index.php');
?>