/* eslint-disable */
function htmlEscape(str) {
  return "".concat(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function refreshPosts(post, login) {
  const postElement = document.createElement('article');
  postElement.classList.add('post');
  let editBtn = '';
  if (login) {
    editBtn = `<a class="post__action" href="edit.php?ID=${htmlEscape(post.ID)}">編輯</a>`;
  }
  let innerHTML = `
    <div class="post__header">
      <div class="post__title">${htmlEscape(post.title)}</div>
      <div class="post__actions">
        ${editBtn}
      </div>
    </div>
    <div class="post__created_at">${htmlEscape(post.created_at)}</div>
  `;

  const url = new URL(window.location.href);
  if (url.href.indexOf('ID') >= 0) {
    innerHTML += `
      <div class="post__content">${htmlEscape(post.content)}</div>
    `;
  } else {
    innerHTML += `
    <div class="post__content post__shorten">${htmlEscape(post.content)}</div>
    <a class="btn-read-more" href="post.php?ID=${htmlEscape(post.ID)}">READ MORE</a>`;
  }

  postElement.innerHTML = innerHTML;
  postList.appendChild(postElement);
}

function getPosts(ID, login) {
  let url = 'api_posts.php';
  if (ID) {
    url = 'api_posts.php?ID=' + ID;
  }
  request.open('GET', url, true);
  request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      const res = request.responseText;
      const json = JSON.parse(res);
      const posts = json.posts;
      if (ID) {
        const post = posts[0]['post'];
        refreshPosts(post, login);
      } else {
        for (let i = 0; i < posts.length; i++) {
          const post = posts[i]['post'];
          refreshPosts(post, login);
        }
      }
    }
  };
  request.send();
}

function refreshList(post, login) {
  const postElement = document.createElement('div');
  postElement.classList.add('list-post')
  let Btn = '';
  if (login) {
    Btn = `
    <a class="list-post__btn" href="edit.php?ID=${htmlEscape(post.ID)}">編輯</a>
    <a class="list-post__btn" href="handle_delete_post.php?ID=${htmlEscape(post.ID)}">刪除</a>
    `;
  }
  const innerHTML = `
    <a class="list-post__title" href="post.php?ID=${htmlEscape(post.ID)}">
      ${htmlEscape(post.title)}
    </a>
    <div class="list-post__right">
      <div class="list-post__info">
        <div class="list-post__created-at">
          ${htmlEscape(post.created_at)}
        </div>
      </div>
      <div class="list-post__actions">
          ${Btn}
      </div>
    </div>
  `;

  postElement.innerHTML = innerHTML;
  postList.appendChild(postElement);
}

function getList(login) {
  let url = 'api_list.php';
  request.open('GET', url, true);
  request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      const res = request.responseText;
      const json = JSON.parse(res);
      const { posts } = json;
      for (let i = 0; i < posts.length; i++) {
        const [post] = posts[i];
        refreshList(post, login);
      }
    }
  };
  request.send();
}

export {
  refreshPosts, getPosts, refreshList, getList,
};