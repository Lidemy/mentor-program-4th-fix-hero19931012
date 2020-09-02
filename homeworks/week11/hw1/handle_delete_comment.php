<?php

session_start();
require_once('conn.php');
require_once('utils.php');

$comment_ID = $_GET['ID'];
$username = $_SESSION['username'];

$comment_user_ID = getUserIDFromCommentID($comment_ID);
if ($comment_user_ID !== getUserIDFromUsername($username)) {
  header('Location: index.php');
}

$sql = 'DELETE FROM huiming_w11_comments WHERE id=? and user_ID=?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('ii', $comment_ID, $comment_user_ID);
$result = $stmt->execute();

if (!$result) {
  die("Error" . $conn->error);
}

header("Location: index.php");

?>