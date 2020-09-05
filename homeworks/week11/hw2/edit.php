<?php
session_start();
if (empty($_SESSION['username']) || $_SESSION['username'] !== "admin") {
  header('Location: index.php');
}

require_once('conn.php');

$ID = '';
$sql = '';
if (!empty($_GET['ID'])) {
  $ID = $_GET['ID'];
  $sql = 'SELECT * FROM huiming_w11_hw2_blog_posts WHERE ID=?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $ID);
  $result = $stmt->execute();
  if (!$result) {
    die('Error' . $conn->error);
  }
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
}

?>

<!DOCTYPE html>

<html>

<head>
  <meta charset="utf-8">

  <title>部落格</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="normalize.css" />
  <link rel="stylesheet" href="style.css" />
</head>

<body>
  <nav class="navbar">
    <div class="wrapper navbar__wrapper">
      <div class="navbar__site-name">
        <a href='index.php'>Who's Blog</a>
      </div>
      <ul class="navbar__list">
        <div>
          <li><a href="list.php">文章列表</a></li>
          <li><a href="#">分類專區</a></li>
          <li><a href="#">關於我</a></li>
        </div>
        <div>
          <li><a href="list.php">管理後台</a></li>
          <li><a href="handle_logout.php">登出</a></li>
        </div>
      </ul>
    </div>
  </nav>
  <section class="banner">
    <div class="banner__wrapper">
      <h1>存放技術之地</h1>
      <div>Welcome to my blog</div>
    </div>
  </section>
  <div class="container-wrapper">
    <div class="container">
      <div class="edit-post">
        <form action="handle_update_post.php" method="POST">
          <div class="edit-post__title">
            <?php if (!empty($_GET['ID'])) { ?>
              編輯文章
              </div>
              <div class="edit-post__input-wrapper">
                <input name="title" class="edit-post__input" value="<?php echo $row['title']; ?>"/>
              </div>
              <div class="edit-post__input-wrapper">
                <textarea rows="20" name="content" class="edit-post__content"><?php echo $row['content']; ?></textarea>
              </div>
              <div class="edit-post__btn-wrapper">
                <input type="text" class="hidden" name="ID" value="<?php echo $ID;?>">
                <input type="submit" class="edit-post__btn" value="送出"/>
              </div>
            <?php } else { ?>
                發表文章：
              </div>
              <div class="edit-post__input-wrapper">
                <input name="title" class="edit-post__input" placeholder="請輸入文章標題" />
              </div>
              <div class="edit-post__input-wrapper">
                <textarea rows="20" name="content" class="edit-post__content"></textarea>
              </div>
              <div class="edit-post__btn-wrapper">
                <input type="submit" class="edit-post__btn" value="送出"/>
              </div>
            <?php } ?>
        </form>
      </div>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>

</html>