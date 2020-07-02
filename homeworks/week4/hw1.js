const request = require('request');

const option = {
  url: 'https://lidemy-book-store.herokuapp.com/books?_limit=10',
};

function callback(error, response, body) {
  const json = JSON.parse(body);
  for (let i = 0; i < json.length; i++) {
    console.log(json[i].id, json[i].name);
  }
}

request(option, callback);
