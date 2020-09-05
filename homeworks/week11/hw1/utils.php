<?php

require_once('conn.php');

function getNicknameFromUsername($username){
  global $conn;
  $sql = 'SELECT nickname FROM huiming_w11_users WHERE username=?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $username);
  $result = $stmt->execute();
  if (!$result) {
    die ("Error" . $conn->error);
  }
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
  $nickname = $row['nickname'];
  return $nickname;
}

function getUsernameFromCommentID($comment_ID){
  global $conn;
  $sql = 'SELECT username FROM huiming_w11_comments WHERE ID=?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $comment_ID);
  $result = $stmt->execute();
  if (!$result) {
    die ("Error" . $conn->error);
  }
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
  $username = $row['username'];
  return $username;
}

function getUserIDFromCommentID($comment_ID) {
  global $conn;
  $sql = 'SELECT user_ID FROM huiming_w11_comments WHERE ID=?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $comment_ID);
  $result = $stmt->execute();
  if (!$result) {
    die ("Error" . $conn->error);
  }
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
  $user_ID = $row['user_ID'];
  return $user_ID;
}


function getUserIDFromUsername($username) {
  global $conn;
  $sql = 'SELECT ID FROM huiming_w11_users WHERE username=?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $username);
  $result = $stmt->execute();
  if (!$result) {
    die ("Error" . $conn->error);
  }
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
  $ID = $row['ID'];
  return $ID;
}

function getNicknameFromUserID($user_ID) {
  global $conn;
  $sql = 'SELECT nickname FROM huiming_w11_users WHERE ID=?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $user_ID);
  $result = $stmt->execute();
  if (!$result) {
    die ("Error" . $conn->error);
  }
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
  $nickname = $row['nickname'];
  return $nickname;
}

function getContentFromCommentID($ID) {
  global $conn;
  $sql = 'SELECT content FROM huiming_w11_comments WHERE ID=?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $ID);
  $result = $stmt->execute();
  if (!$result) {
    die ("Error" . $conn->error);
  }
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
  $content = $row['content'];
  return $content;
}

function escape($str) {
  return htmlspecialchars($str, ENT_QUOTES);
}

function checkAuthority($username) {
  global $conn;
  $sql = 'SELECT authority FROM huiming_w11_users WHERE username=?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $username);
  $result = $stmt->execute();
  if (!$result) {
    die ("Error" . $conn->error);
  }
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
  $authority = $row['authority'];
  return $authority;
}

?>  