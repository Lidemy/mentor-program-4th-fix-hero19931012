<?php
session_start();
require_once('conn.php');
require_once('utils.php');

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Message Board</title>

  <link rel="stylesheet" href="normalize.css">
  <link href="fontawesome-free-5.14.0-web/css/all.css" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>

<body>

  <header>
    <h4 class="warning">
      注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。
    </h4>
  </header>

  <main class="comment_body">
    <div class="buttons">
      <?php 
      if (empty($_SESSION['username'])) { ?>
        <a class="board__btn clickable" href="register.php">Register</a>
        <a class="board__btn clickable" href="login.php">Log in</a>
        <h3 class="notice">請登入以發表留言</h3>
      <?php 
      } else {
        $username = $_SESSION['username'];
        $authority = checkAuthority($username);
        ?>
        <a class="board__btn clickable" href="handle_logout.php">Log out</a>
        <?php if ($username === 'admin') { ?>
          <a class="board__btn clickable" href="admin.php">Backstage</a>
        <?php } ?>
        </div>
        <h3 class="welcome">Welcome back, <?php echo getNicknameFromUsername($username); ?>!</h3>
        <i class="fas fa-pen fa-1x  clickable update__nickname__btn"></i><span>編輯暱稱</span>
        <form action="handle_update_nickname.php" method="post" class="update__nickname__form">
          <div class="update__nickname hidden">
            <span class="new__nickname">新的暱稱：</span>
            <input type="text" name="new__nickname">
            <input type="submit" value="Submit" class="board__btn clickable ">
          </div>
        </form>

        <?php 
        if ($authority !== 0) { ?>
          <h1 class="board__title">Comments</h1>
          <form class="comment__form" method="POST" action="handle_add_comment.php">
            <textarea name="content" id="" rows="3" class="comment_input_area" requied></textarea>
            <?php 
            if (!empty($_GET['errCode']) && $_GET['errCode'] === '1') { ?>
              <h4 class="errMsg">請填寫內容</h3>
            <?php } ?>
            <input class="board__btn clickable submit__content" type="submit" value="Submit">
          </form>
        <?php 
        } else { ?>
          <script> alert("你已遭停權，禁止發言。") </script>
        <?php }
      } ?>
    <hr />

    <section class="comment_list"></section>

    <?php
    $stmt = $conn->prepare('
    SELECT count(user_ID) as count FROM huiming_w11_comments WHERE is_deleted IS NULL
  ');

    $result = $stmt->execute();
    // var_dump($result);

    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $total_page = ceil($row['count'] / 4);
    ?>

    <div class="pages__area"></div>
  </main>

  <script>
    function encodeHTML(s) {
      return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
    }
    // 前端顯示內容時也要做 escape

    const request = new XMLHttpRequest();
    const commentList = document.querySelector('.comment_list');

    // get session username
    const sessionUsername = "<?php if (!empty($_SESSION['username'])) {
                                echo $_SESSION['username'];
                              } ?>";
    const totalPage = Number(<?php echo $total_page ?>);
    const pagesArea = document.querySelector('.pages__area');

    let url = 'api_comments.php';
    let currentPage = 1;

    let items = {};

    function createComment(comment) {
      let div = document.createElement('div');
      div.classList.add('comment');
      let innerHTML = `
        <div class="comment_avatar"></div>
          <div class="comment_content">
            <span class="nickname">
              ${encodeHTML(comment.nickname)}(@${encodeHTML(comment.username)})
            </span>
            <span class="created_time">
              ${encodeHTML(comment.created_at)}
              </span>
            <p class="content">${encodeHTML(comment.content)}</p>
          </div>
          `;
      if (comment.username === sessionUsername || sessionUsername === "admin") {
        innerHTML += `
          <div class="comment__control__btn">
            <a href="update_comment.php?ID=${comment.ID}" class="update__comment">
              <i class="fas fa-pen fa-1x clickable update__comment__btn"></i>
            </a>
            <a href="handle_archive_comment.php?ID=${comment.ID}" class="delete__comment">
              <i class="fas fa-trash-alt clickable delete__comment__btn"></i></i>
            </a>
          </div>
          `;
      }
      div.innerHTML = innerHTML;
      return div;
    }

    function refreshPages(currentPage, totalPage) {
      const pages_btn = `
        <i class="fas fa-step-backward clickable board__btn small__btn first__page page__control"></i>
        <i class="fas fa-angle-left clickable board__btn small__btn last__page page__control"></i>
        <span class="current__page"> ${Number(currentPage)} / ${totalPage}</span>
        <i class="fas fa-angle-right clickable board__btn small__btn next__page page__control"></i>
        <i class="fas fa-step-forward clickable board__btn small__btn final__page page__control"></i>
      `;
      pagesArea.innerHTML = pages_btn;
    }

    // get comments
    function getComments(currentPage) {
      url = "api_comments.php?page=" + currentPage;
      request.open("GET", url, true);
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          // success
          let res = request.response;
          let json = JSON.parse(res);
          let comments = json[0].comments;

          // 如果 commentList 內的留言數量與 res 拿到的數量不一
          // 就一律清空內容用 appendChild (初次載入或最後 2 頁會出現的情況)
          if (commentList.childElementCount !== comments.length) {
            commentList.innerHTML = '';
            for (let i = 0; i < comments.length; i++) {
              let comment = comments[i].comment;
              let div = createComment(comment);
              commentList.appendChild(div);
            }
            items = commentList.querySelectorAll('.comment');
          } else {
            for (let i = 0; i < comments.length; i++) {
              let comment = comments[i].comment;
              let div = createComment(comment);
              items[i].innerHTML = div.innerHTML;
            }
          }
          refreshPages(currentPage, totalPage)

        } else {
          alert('Error: ' + request.status);
        }
      };
      request.send();
    }

    // 初次載入
    window.addEventListener('load', getComments(currentPage));

    pagesArea.addEventListener('click', (e) => {
      // console.log(e.target.classList[5]);
      switch (e.target.classList[5]) {
        case "first__page":
          if (currentPage > 1) {
            currentPage = 1;
            getComments(currentPage);
          }
          break;
        case "last__page":
          if (currentPage - 1 >= 1) {
            currentPage -= 1;
            getComments(currentPage);
          }
          break;
        case "next__page":
          if (currentPage + 1 <= totalPage) {
            currentPage += 1;
            getComments(currentPage);
          }
          break;
        case "final__page":
          if (currentPage < totalPage) {
            currentPage = totalPage;
            getComments(currentPage);
          }
          break;
        default:
          ;
      }
    })

    // form submission
    const commentContent = document.querySelector('textarea[name=content]')
    const commentForm = document.querySelector(".comment__form");
    if (commentForm) {
      commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let content = commentContent.value;
        request.open("POST", "api_add_comment.php", true);

        // request.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        let data = `username=${sessionUsername}&content=${encodeURIComponent(content)}`;
        // 把 content 先進行編碼，避免內容包含 js 可執行的程式碼
        request.send(data);

        request.onload = () => {
          if (request.status >= 200 && request.status < 400) {
            // success
            location.reload();
          } else {
            alert('系統有誤');
          }
        }
      })
    }

    // update nickname area
    const changeNicknameBtn = document.querySelector(".update__nickname__btn");
    const changeNicknameArea = document.querySelector(".update__nickname")
    if(changeNicknameBtn){
      changeNicknameBtn.addEventListener('click', () => {
        changeNicknameArea.classList.toggle("hidden");
      })
    }
  </script>
</body>

</html>