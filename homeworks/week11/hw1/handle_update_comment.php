<?php

session_start();
require_once('conn.php');
require_once('utils.php');

$comment_ID = $_POST['ID'];
if (empty($_POST['content'])) 
  {
    header('Location: update_comment.php?ID=' . $ID . '&errCode=1');
    die();
  }

$content = $_POST['content'];
$username = $_SESSION['username'];

$comment__user_ID = getUserIDFromCommentID($comment_ID);

if ($comment__user_ID !== getUserIDFromUsername($username)) {
   header('Location:index.php');
}


$sql = 'UPDATE huiming_w11_comments SET content=? WHERE id=? and user_ID=?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('sii', $content, $comment_ID, $comment__user_ID);
$result = $stmt->execute();
if (!$result) {
  die("Error" . $conn->error);
}
header("Location: index.php");

?>