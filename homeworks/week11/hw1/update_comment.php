<?php
session_start();
require_once('conn.php');
require_once('utils.php');

$ID = $_GET['ID'];
$comment_userID = getUserIDFromCommentID($ID);

$username = $_SESSION['username'];
$session_userID = getUserIDFromUsername($username);
if ($comment_userID !== $session_userID) {
  header('Location: index.php');
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Message Board</title>

  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="normalize.css">
  <script src="fontawesome-free-5.14.0-web/css/all.css" crossorigin="anonymous"></script>
</head>

<body>

  <header>
    <h4 class="warning">
      注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。
    </h4>
  </header>

  <main class="comment_body">
    <div class="buttons">
      <?php if (empty($_SESSION['username'])) { ?>
      <script> window.location="index.php"</script>
      <?php } else {
        $username = $_SESSION['username'];
      ?>
        <a class="board__btn clickable" href="index.php">Back to board</a>
        <a class="board__btn clickable" href="handle_logout.php">Log out</a>
    </div>
    
    </form>
    <h1 class="board_title">編輯留言</h1>
        
    <form method="POST" action="handle_update_comment.php">
      <textarea name="content" id="" rows="5" class="comment_input_area" requied> <?php
        echo getContentFromCommentID($ID);
      ?> </textarea>

      <?php
        if (!empty($_GET['errCode'])) {
          if ($_GET['errCode'] === '1') {
      ?>
          <h4 class="errMsg">請填寫內容</h3>
        <?php
          }
        }
        ?>
        <input type="text" name="ID" value="<?php echo $ID ?>" class="hidden">
        <input class="board__btn clickable submit__content" type="submit" value="Submit">
    </form>
  <?php } ?>
  </main>
</body>

</html>