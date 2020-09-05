<?php
session_start();
if (empty($_SESSION['username']) || $_SESSION['username'] !== 'admin') {
  // header('Location: list.php');
  die('you r not login or not admin');
}
die('you r admin');
require_once('conn.php');

// $ID = '';

// if (!empty($_GET['ID'])) {
//   $ID = $_GET['ID'];
//   $sql = 'UPDATE huiming_w11_hw2_blog_posts SET is_deleted=1 WHERE ID=?';
//   $stmt = $conn->prepare($sql);
//   $stmt->bind_param('i', $ID);
// } else {
//   header('Location: list.php');
// }

// $result = $stmt->execute();
// if (!$result) {
//   die('Error: ' . $conn->error);
// }

// header('Location: list.php')
?>