<?php
session_start();
require_once('conn.php');
require_once('utils.php');

if (empty($_POST['content'])) 
  {
    header('Location: index.php?errCode=1');
    die();
  }

$content = $_POST['content'];
$user_ID = getUserIDFromUsername($_SESSION['username']);
$nickname = getNicknameFromUsername($username);

$sql = 'INSERT INTO huiming_w11_comments(user_ID, content) VALUES (?, ?)';
$stmt = $conn->prepare($sql);
$stmt->bind_param('is', $user_ID, $content);
// var_dump($stmt);

$result = $stmt->execute();
if (!$result) {
  die($conn->error);
}

header('Location: index.php');
?>