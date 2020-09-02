<?php

session_start();
require_once('conn.php');
require_once('utils.php');

$comment_ID = $_GET['ID'];
$comment_user_ID = getUserIDFromCommentID($comment_ID);
$username = $_SESSION['username'];
$user_ID = getUserIDFromUsername($username);

if ($comment_user_ID !== $user_ID) {
  header('Location: index.php');
  die();
}

$sql = 'UPDATE `huiming_w11_comments` SET is_deleted=1 WHERE ID=? AND user_ID=?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('ii', $comment_ID, $comment_user_ID);
$result = $stmt->execute();

if (!$result) {
  die("Error" . $conn->error);
}

header("Location: index.php");

?>
