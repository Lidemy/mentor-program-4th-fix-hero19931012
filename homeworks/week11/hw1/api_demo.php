
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

    <h1 class="board__title">Comments</h1>
    <form class="comment_form">
      <textarea name="content" id="" rows="5" class="comment_input_area" requied></textarea>
      <input class="board__btn clickable submit__content" type="submit" value="Submit">
    </form>

    <hr />

    <section class="comment_list">

    </section>

  </main>

  <script>
    function encodeHTML(s) {
      return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
    }
    // 前端顯示內容時也要做 escape

    const request = new XMLHttpRequest();
    const commentList = document.querySelector('.comment_list');

    // get query string "page" param
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page');
    // console.log(page);

    // get comments
    function getComments(cb) {
      let url = 'api_comments.php';
      if (page === null) {
        url = "api_comments.php"
      } else {
        url = "api_comments.php?page=" + page;
      }
      request.open("GET", url, true);
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          // success
          let res = request.response;
          let json = JSON.parse(res);
          let comments = json[0].comments;
          for (let i = 0; i < comments.length; i++) {
            let comment = comments[i].comment;
            let div = document.createElement('div');
            div.classList.add('comment');
            div.innerHTML = `
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
              <div class="comment__control__btn">
                <a href="update_comment.php?ID=${comment.ID}" class="update__comment">
                <i class="fas fa-pen fa-1x clickable update__comment__btn"></i><span>編輯</span>
                </a>
                <a href="handle_archive_comment.php?ID=${comment.ID}" class="delete__comment">
                <i class="fas fa-trash-alt clickable delete__comment__btn"></i></i><span>刪除</span>
                </a>
              </div>
            `;

            commentList.appendChild(div);
          }
        } else {
          alert('Error: ' + request.status);
        }
      };
      request.send();
    }

    getComments();

    // form submission
    const commentForm = document.querySelector(".comment_form");
    const commentContent = commentForm.querySelector('textarea[name=content')

    commentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let content = commentContent.value;
      request.open("POST", "api_add_comment.php", true);
      // request.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      let data = 'username=huiming&content=' + encodeURIComponent(content);
      // 把 content 先進行編碼，避免內容包含 js 可執行的程式碼
      request.send(data);
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          // success
          alert("新增成功！");
          location.reload();
        }
      }
    })
  </script>
</body>

</html>