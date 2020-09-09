<?php

require_once('conn.php');

$sql = 'SELECT count(ID) AS count FROM huiming_w12_todos_users';
$result = $conn->query($sql);
if (!$result) {
  die('Error' . $conn->error);
}
$row = $result->fetch_assoc();

if (empty($_GET['ID']) || $_GET['ID'] > $row['count']) {
  $ID = intval($row['count']) + 1;
  $_SESSION['ID'] = $ID;

  $sql_ID = 'INSERT INTO huiming_w12_todos_users(userID) VALUE(?)';
  $stmt = $conn->prepare($sql_ID);
  $stmt->bind_param('i', $ID);
  $result = $stmt->execute();
  if (!$result) {
    die('Error' . $conn->error);
  }
  header('Location: todos.php?ID=' . $ID);
  die();
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Todos</title>
  <script src="https://kit.fontawesome.com/64ae987792.js" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
  <link rel="stylesheet" href="style.css">
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
  <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
  <script>
    function htmlEscape(str) {
      return "".concat(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    }

    function updateTodo(userID, todoID, currentTodo, action) {
      let isChecked = ''
      let updateContent = ''
      if (currentTodo !== '') {
        isChecked = currentTodo.children('label').children('input').prop('checked');
        updateContent = currentTodo.children('label').children('span')[0].textContent;
      }

      let url = ''
      switch (action) {
        case 'edit', 'check':
          url = "api_update_todo.php"
          break;
        case 'delete':
          url = "api_delete_todo.php"
          break;
        case 'delete all':
          url = "api_delete_all_todos.php"
          break;
        default:
          break;
      }

      const json = JSON.stringify({
        'content': updateContent,
        'is_checked': isChecked ? 1 : null,
      })

      $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        data: {
          'userID': userID,
          'todoID': todoID,
          'json': json,
        },
        success: (res) => {
          if (!res.ok) {
            alert(res.message)
          }
        }
      })
    }

    function clearCompletedTodos(userID, checkedBoxes) {
      for (checkbox of checkedBoxes) {
        const todo = checkbox.closest('.todo')
        const todoID = todo.getAttribute("data-ID");
        $.ajax({
          url: "api_delete_todo.php",
          type: 'POST',
          dataType: 'json',
          data: {
            'userID': userID,
            'todoID': todoID,
            'json': '',
          },
          success: (res) => {
            if (!res.ok) {
              alert(res.message)
            }
          }
        })
      }
    }

    function addElementToDOM(container, content) {
      const json = JSON.parse(content.content)
      const todoID = parseInt(content.ID)
      let html = `
        <li class="d-flex justify-content-between align-items-center list-group-item todo" data-ID="${todoID}">
          <label class="text-truncate" style="max-width: 320px;">
            <input type="checkbox" ${json.is_checked !== null ? "checked" : ''} >
            <span>${json.content}</span>
          </label>
          <div class="btn-todo-control">
            <i class="fas fa-edit"></i>
            <i class="fas fa-times"></i>
          </div>
        </li>
      `
      container.append(html)
    }

    $(document).ready(() => {
      const addTodoForm = $('.add-todo-form')
      const inputTodo = $('.input-todo')
      const todos = $('.todos')
      const buttons = $('.buttons')

      const userID = <?php echo $_GET['ID']; ?>;
      $.ajax({
        url: `api_load_todos.php?ID=${userID}`,
        success: (data) => {
          if (!data.ok) {
            alert(data.message)
          }

          const userTodos = data.todos
          for (todo of userTodos) {
            addElementToDOM(todos, todo)
          }
        }
      })

      $('.add-todo-form').submit((e) => {
        e.preventDefault()
        const content = htmlEscape(inputTodo.val()).trim()
        if (content === '') {
          inputTodo.attr('placeholder', 'Please input content');
          return
        }

        inputTodo.attr('placeholder', 'Add todos here...');
        inputTodo.val('')

        const json = JSON.stringify({
          'content': content,
          'is_checked': null,
        })

        $.ajax({
          url: `api_add_todo.php`,
          type: 'POST',
          dataType: 'json',
          data: {
            'userID': userID,
            'json': json,
          },
          success: (res) => {
            if (!res.ok) {
              alert(res.message)
            }
            todos.append(`
              <li class="d-flex justify-content-between align-items-center list-group-item todo" data-ID="${res.ID}">
                <label class="text-truncate" style="max-width: 320px;">
                  <input type="checkbox">
                  <span>${content}</span>
                </label>
                <div class="btn-todo-control">
                  <i class="fas fa-edit"></i>
                  <i class="fas fa-times"></i>
                </div>
              </li>
            `)
          }
        })
      })

      todos.click((e) => {
        const currentTodo = $(e.target).closest('.todo')
        const todoID = currentTodo.attr("data-ID");
        const content = currentTodo[0].textContent.trim()

        // check
        if ($(e.target).attr('type') === 'checkbox') {
          updateTodo(userID, todoID, currentTodo, "check")
        }

        // edit
        if ($(e.target).hasClass('fa-edit')) {
          currentTodo.html(`
           <form class="edit-todo-form w-100">
              <input type="text" class="edit-todo-input w-100"></input>
            </form>
          `)
          $('.edit-todo-input').val(content)
          $('.edit-todo-form').submit((e) => {
            e.preventDefault()
            currentTodo.html(`
              <label class="text-truncate" style="max-width: 320px;">
                <input type="checkbox">
                <span>${htmlEscape($('.edit-todo-input').val())}</span>
              </label>
              <div class="btn-todo-control">
                <i class="fas fa-edit"></i>
                <i class="fas fa-times"></i>
              </div>
            `)
            updateTodo(userID, todoID, currentTodo, "edit")
          })
        }

        // delete
        if ($(e.target).hasClass('fa-times')) {
          currentTodo.remove()
          updateTodo(userID, todoID, currentTodo, "delete")
        }
      })

      buttons.click((e) => {
        const value = $(e.target).text()
        const checkboxes = $('input[type=checkbox]')
        let checkedBoxes = $('input[type=checkbox]:checked')
        let uncheckedBoxes = $('input[type=checkbox]:not(:checked)')

        switch (value) {
          case 'Clear completed':
            checkedBoxes.closest("li.todo").remove()
            clearCompletedTodos(userID, checkedBoxes)
            break;
          case 'Delete all':
            todos.empty();
            updateTodo(userID, '', '', 'delete all')
            break;
          case 'List all':
            checkboxes.closest("li.todo")
              .addClass("d-flex")
              .removeClass("d-none")
            break;
          case 'Unfinished':
            checkedBoxes.closest("li.todo")
              .addClass("d-none")
              .removeClass("d-flex")
            uncheckedBoxes.closest("li.todo")
              .addClass("d-flex")
              .removeClass("d-none")
            break;
          case 'Completed':
            uncheckedBoxes.closest("li.todo")
              .addClass("d-none")
              .removeClass("d-flex")
            checkedBoxes.closest("li.todo")
              .addClass("d-flex")
              .removeClass("d-none")
            break;
          default:
            break;
        }
      })
    })
  </script>
</head>

<body>
  <div class="container text-monospace">
    <div class="col-12">
      <h1 class="text-center mt-5 text-info">Todo List</h1>
      <form class="add-todo-form mt-2">
        <div class="form-group">
          <input name="todo" type="text" class="form-control input-todo" placeholder="Add todos here...">
        </div>
      </form>
    </div>
    <div class="col-12">
      <div class="card todo-lsit todos-container">
        <ul class="list-group list-group-flush todos">
        </ul>
      </div>
    </div>
    <div class="col-12 d-flex flex-column">
      <div class="buttons mt-3">
        <button type="button" class="btn btn-sm btn-light">List all</button>
        <button type="button" class="btn btn-sm btn-secondary">Completed</button>
        <button type="button" class="btn btn-sm btn-dark">Unfinished</button>
      </div>
      <div class="buttons mt-3">
        <button type="button" class="btn btn-sm btn-success">Clear completed</button>
        <button type="button" class="btn btn-sm btn-info">Delete all</button>
      </div>
    </div>
  </div>

</body>


</html>