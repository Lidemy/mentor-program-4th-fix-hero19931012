<?php

session_start();
$username = '';
if (!empty($_SESSION['username'])) {
  $username = $_SESSION['username'];
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
          <?php if ($username) { ?> 
            <li><a href="list.php">管理後台</a></li>
            <li><a href="handle_logout.php">登出</a></li> 
          <?php } else { ?>
            <li><a href="login.php">登入</a></li> 
          <?php } ?>
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
    <div class="post__list">
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>

  <script type="module">
    let login = false;
    <?php if ($username) { ?>
      login = true;
    <?php } ?>
    import {getPosts, refreshPosts} from './blog.js';
    window.addEventListener('load', getPosts('', login));
  </script>

  <script>
    const request = new XMLHttpRequest();
    const postList = document.querySelector('.post__list');
  </script>
</body>

</html>