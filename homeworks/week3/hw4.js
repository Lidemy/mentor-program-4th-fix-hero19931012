// 判斷迴文
const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => { // 每輸入一行資料就 push 進 lines
  lines.push(line);
});

function solve(input) {
  const str = input[0];
  let strRev = '';
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < str.length; i++) {
    strRev = str[i] + strRev;
  }
  if (str === strRev) {
    console.log('True');
  } else {
    console.log('False');
  }
}

rl.on('close', () => {
  solve(lines);
});
