const request = require('request');
const process = require('process');

const baseUrl = 'https://lidemy-book-store.herokuapp.com/books';

function list() {
  request(
    {
      url: `${baseUrl}?_limit=20`,
    },
    (error, response, body) => {
      const json = JSON.parse(body);
      for (let i = 0; i < json.length; i++) {
        console.log(json[i].id, json[i].name);
      }
    },
  );
}

function read(id) {
  request(
    {
      url: `${baseUrl}/${id}`,
    },
    (error, response, body) => {
      const json = JSON.parse(body);
      console.log(json.name);
    },
  );
}

// create & update 的 callback
// 因為這兩個傳進的 function 長得一模一樣，所以抓出來寫。
// 也因此學到當把 function 當作參數傳遞時，後面不需加 ()，加括號的意思是呼叫並執行。
function callback(error, response, body) {
  const json = JSON.parse(body);
  console.log(json);
}

function post(newBookName) {
  request.post(
    {
      url: baseUrl,
      form: {
        name: newBookName,
      },
    },
    callback,
    // 不需加 ()
  );
}

function patch(id, newName) {
  request.patch(
    {
      url: `${baseUrl}/${id}`,
      form:
      {
        name: newName,
      },
    },
    callback,
    // 不需加 ()
  );
}

function deleteABook(id) {
  request.delete(
    {
      url: `${baseUrl}/${id}`,
    },
    (error, response) => {
      if (response.statusCode >= 200 && response.statusCode < 300) {
        console.log(`Book id ${id} has been deleted.`);
      } else {
        console.log(`Book id ${id} not found.`);
      }
    },
  );
}

let id = 0;
switch (process.argv[2]) {
  default:
    list();
    break;
  case 'list':
    list();
    break;
  case 'read':
    [, , , id] = process.argv;
    // 這邊 eslint 強制用解構語法
    // 如果只想取一個屬性出來，可以用逗號忽略不要的屬性
    read(id);
    break;
  case 'delete': {
    [, , , id] = process.argv;
    deleteABook(id);
    break;
  }
  case 'create': {
    const newBookName = process.argv[3];
    post(newBookName);
    break;
  }
  case 'update': {
    [, , , id] = process.argv;
    const newName = process.argv[4];
    patch(id, newName);
    break;
  }
}
