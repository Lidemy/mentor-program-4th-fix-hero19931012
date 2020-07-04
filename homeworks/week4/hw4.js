const request = require('request');

const option = {
  url: 'https://api.twitch.tv/kraken/games/top',
  headers:
  {
    Accept: 'application/vnd.twitchtv.v5+json',
    'Client-ID': 'l9aklykson3vg3n7r4zg72qb68bj8h',
  },
};

function callback(error, response, body) {
  const json = JSON.parse(body).top;
  for (let i = 0; i < 10; i++) {
    // 物件解構語法，將物件裡具相同名稱的屬性值賦值給等號左邊的變數
    const { name } = json[i].game;
    // 從 json[i].game 裡取出 name 的值
    const { viewers } = json[i];
    // 從 json[i] 裡取出 viewers 的值
    console.log(viewers, name);
  }
}

request(option, callback);
