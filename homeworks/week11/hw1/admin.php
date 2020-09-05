<?php
session_start();
require_once('conn.php');
require_once('utils.php');

if ($_SESSION['username'] !== "admin") {
  header('Location: index.php');
}

$stmt = $conn->prepare(
  'SELECT * from huiming_w11_users'
);
$result = $stmt->execute();
if (!$result) {
  die('Error: ' . $conn->error);
}

$result = $stmt->get_result();

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>admin</title>

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

    <a class="board__btn clickable" href="index.php">Back to board</a>

    <h1 class="board__title">管理員後台</h1>
    <hr>
    <div class="user__list">
      <h3>使用者名單</h3>

      <table class="user__table">
        <tr class='user__info__title'>
          <td>ID</td>
          <td>nickname(@username)</td>
          <td>權限</td>
          <td>created_at</td>
        </tr>
      </table>

    </div>

  </main>

  <script>
    const request = new XMLHttpRequest();

    // get users list

    const userTable = document.querySelector('.user__table');

    function getUsers() {
      request.open('GET', 'api_users.php', true);
      request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      request.send();
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          let res = request.responseText;
          let json = JSON.parse(res);
          let users = json[0].users;

          for (let i = 0; i < users.length; i++) {
            let user = users[i].user;
            let created_at = user.created_at.split(' ')[0];
            let authorityValue = '';
            switch (user.authority) {
              case 0:
                authorityValue = "停權";
                break;
              case 1:
                authorityValue = "一般";
                break;
              case 2:
                authorityValue = "管理員";
                break;
              default:
                break;
            }
            let tr = document.createElement('tr');
            tr.classList.add('user__info');
            tr.innerHTML = `
              <td class="user_ID">${user.ID}</td>
              <td class="name">${user.nickname}</td>
              <td class="authority">${authorityValue}
                <i class="fas fa-pen fa-1x clickable update__authority__btn"></i>
              </td>
              <td class="created_at">${user.created_at}</td>
            `;
            console.log(tr);
            userTable.appendChild(tr);
          }
        }
      }
    }

    window.addEventListener('load', getUsers())

    function updateUserAuthority(userID, int) {
      request.open('POST', 'handle_update_user_authority.php', true);
      request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      request.send(`user_ID=${userID}&int=${int}`);
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          alert('更新成功！');
        }
      }
    }

    // user authority update
    const userList = document.querySelector('.user__list');
    userList.addEventListener('click', (e) => {
      if (e.target.classList.contains('update__authority__btn')) {
        // console.log(true);
        const authority = e.target.closest('.authority')
        // console.log(authority);
        authority.innerHTML = `
        <select class="authorityValue">
        <option value="停權">停權</option>
        <option value="一般">一般</option>
        </select>
        <i class="fas fa-save authority__save clickble"></i>
        `;
        const save = userList.querySelector('.authority__save');
        const authorityValue = authority.querySelector('.authorityValue');
        save.addEventListener('click', (e) => {
          const userID = save.closest('.user__info').querySelector('.user_ID').innerText;
          console.log(userID);
          authority.innerHTML = `
          ${authorityValue.value}
          <i class="fas fa-pen fa-1x clickable update__authority__btn"></i>`;
          let int = 1;
          authorityValue.value === "一般" ? int = int : int = 0;
          updateUserAuthority(userID, int)
        })
      }
    })
  </script>
</body>

</html>