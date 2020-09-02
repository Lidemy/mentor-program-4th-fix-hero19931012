<?php
session_start();
require_once('conn.php');

if (
  empty($_POST['username']) || 
  empty($_POST['password'])) 
  {
    header('Location: login.php?errCode=1');
    // 內容為空
    die();
  }

$username = $_POST['username'];
$password = $_POST['password'];

$sql = 'select * from huiming_w11_hw2_blog_users where username=?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $username);
$result = $stmt->execute();

if (!$result) {
  echo $conn->error;
  die();
}

$result = $stmt->get_result();
if ($result->num_rows === 0) {
  header("Location: login.php?errCode=2");
  // 查無使用者
  exit();
  // 設定跳出，不然下面還是會執行
}

$row = $result->fetch_assoc();
if (password_verify($password, $row['password'])) {
  $_SESSION['username'] = $row['username'];
  // 設定 session 保持登入
  header("Location: index.php");
} else {
  header("Location: login.php?errCode=2");
  // 帳號或密碼輸入錯誤
}



?>