<?php

require_once('conn.php');

function getPostFromID($ID) {
  global $conn;
  $sql = 'SELECT * FROM huiming_w11_ WHERE username=?';
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

function escape($str) {
  return htmlspecialchars($str, ENT_QUOTES);
}

?>