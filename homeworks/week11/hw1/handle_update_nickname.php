<?php

session_start();
require_once('conn.php');

if (empty($_POST['new__nickname'])) 
  {
    header('Location: index.php');
    die();
  }

$newNickname = $_POST['new__nickname'];
$username = $_SESSION['username'];

var_dump($newNickname);
echo "<br>";
var_dump($username);

$sql = 'UPDATE huiming_w11_users SET nickname=? WHERE username=?';

$stmt = $conn->prepare($sql);
$stmt->bind_param('ss', $newNickname, $username);
$result = $stmt->execute();

// var_dump($stmt);

var_dump($result);
if (!$result) {
  die("Error" . $conn->error);
}

header("Location: index.php");

?>