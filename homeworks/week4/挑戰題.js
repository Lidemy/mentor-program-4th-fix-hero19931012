const request = require('request');
const process = require('process');

const gameName = process.argv[2];

let offset = 0;
const option = {
  url: `https://api.twitch.tv/kraken/streams?offset=${offset}&limit=100&game=${gameName}`,
  // 帶入多個參數用 "&" 連接
  // 因為 twitch 最多只給到 100 筆，limit 給 100，可以取到前 100 筆資料
  // 再搭配 offset = 100 取得第 101-200 筆資料
  // 試了很久才知道 offset 是用來設定 "從哪裡開始取資料"
  headers: {
    Accept: 'application/vnd.twitchtv.v5+json',
    'Client-ID': 'l9aklykson3vg3n7r4zg72qb68bj8h',
  },
};

function callback(error, response, body) {
  const json = JSON.parse(body);
  for (let i = 0; i < json.streams.length; i++) {
    console.log('=========');
    console.log(`No.${i + offset + 1}`);
    console.log('Name    : ', json.streams[i].channel.display_name);
    console.log('Title   : ', json.streams[i].channel.status);
    console.log('Viewers : ', json.streams[i].viewers);
  }
  offset += 100;
}

for (let i = 1; i <= 2; i++) {
  request(option, callback);
}
// 直接設定呼叫 2 次，但總覺得應該有更好的解法
