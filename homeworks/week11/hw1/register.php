<?php



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

    <a class="board__btn clickable" href="index.php">Back to board</a>
    <a class="board__btn clickable" href="login.php">Log in</a>

    <h1 class="board_title">Register</h1>
    <form method="POST" action="handle_register.php">
      <div>
        <span name="nickname">Nickname:</span>
        <input type="text" name="nickname">
      </div>
      <div>
        <span name="username">Username:</span>
        <input type="text" name="username">
      </div>
      <div>
        <span name="password">Password:</span>
        <input type="password" name="password">
      </div>

      <?php
        if(!empty($_GET['errCode'])) {
          $errCode = $_GET['errCode'];
          if($errCode === '1') { ?>
            <h4 class="errMsg">資料填寫不齊全</h4>
          <?php } else if ( $errCode === '2' ) { ?>
            <h4 class="errMsg">帳號已被註冊</h4>
          <?php }
        }
      ?>
      <input class="board__btn clickable" type="submit" value="Register">
    </form>
  </main>
</body>
</html>