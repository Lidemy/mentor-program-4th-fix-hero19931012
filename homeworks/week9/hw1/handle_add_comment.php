<?php
session_start();
require_once('conn.php');

if (empty($_POST['content'])) 
  {
    header('Location: index.php?errCode=1');
    die();
  }

$content = $_POST['content'];
$username = $_SESSION['username'];

$sql_nickname = sprintf('select nickname from huiming_users where username="%s"', 
  $username
);
$nickname = $conn->query($sql_nickname)->fetch_assoc()['nickname'];

$sql = sprintf('INSERT INTO huiming_comments(nickname, content) VALUES ("%s", "%s")', 
  $nickname,
  $content
);

$result = $conn->query($sql);

if (!$result) {
  die($conn->error);
}

header('Location: index.php');
?>