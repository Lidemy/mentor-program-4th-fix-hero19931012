<?php
session_start();
require_once('conn.php');
$username = '';
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Message Board</title>

  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="normalize.css">
</head>

<body>

  <header>
    <h4 class="warning">
      注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。
    </h4>
  </header>
  <main class="comment_body">

    <?php if (empty($_SESSION['username'])) { ?>
      <a class="board_btn" href="register.php">Register</a>
      <a class="board_btn" href="login.php">Log in</a>
      <h3 class="notice">請登入以發表留言</h3>
    <?php } else {
      $username = $_SESSION['username'];
    ?>
      <a class="board_btn" href="handle_logout.php">Log out</a>
      <h3 class="notice">Welcome back, <?php echo $username; ?></h3>
      <h1 class="board_title">Comments</h1>
      <form method="POST" action="handle_add_comment.php">
        <textarea name="content" id="" rows="5" class="comment_input_area" requied></textarea>

        <?php
          if (!empty($_GET['errCode'])) {
            if ($_GET['errCode'] === '1') {
          ?>
              <h4 class="errMsg">請填寫內容</h3>
            <?php
            }
          }
        ?>

        <input class="board_btn" type="submit" value="Submit">
      </form>
    <?php } ?>

    <hr />

    <section class="comment_list">

      <?php
        $sql = sprintf('SELECT * FROM huiming_comments ORDER BY ID DESC');
        $result = $conn->query($sql);
        if ($result->num_rows !== '0') {
          while ($row = $result->fetch_assoc()) {
            $nickname = $row['nickname'];
            $content = $row['content'];
            $created_at = $row['created_at'];
          ?>
          <div class="comment">
            <div class="comment_avatar"></div>
            <div class="comment_content"><span class="nickname"><?php echo $nickname; ?></span><span class="created_time"><?php echo $created_at; ?></span>
              <p class="content"><?php echo $content; ?></p>
            </div>
          </div>
      <?php
        }
      } else {
        echo "目前無留言可顯示。";
      }
      ?>

    </section>
  </main>


</body>

</html>