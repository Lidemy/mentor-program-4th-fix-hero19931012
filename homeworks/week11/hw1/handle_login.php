<?php

session_start();
require_once('conn.php');

if (
  empty($_POST['username']) || 
  empty($_POST['password'])) 
  {
    header('Location: login.php?errCode=1');
    die();
  }

$username = $_POST['username'];
$password = $_POST['password'];


$sql = 'select * from huiming_w11_users where username=?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $username);
$result = $stmt->execute();

if (!$result) {
  echo $conn->error;
  die();
}

$result = $stmt->get_result();
// var_dump($result);
if ($result->num_rows === 0) {
  header("Location: login.php?errCode=2");
  exit();
  // 設定跳出，不然下面還是會執行
}

$row = $result->fetch_assoc();
// var_dump($row);
if (password_verify($password, $row['password'])) {
  $_SESSION['username'] = $username;
  header("Location: index.php");
} else {
  header("Location: login.php?errCode=2");
}