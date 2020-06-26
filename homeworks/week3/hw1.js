// 好多星星
const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => { // 每輸入一行資料就 push 進 lines
  lines.push(line);
});

function solve(input) {
  let star = '';
  for (let i = 0; i < Number(input[0]); i++) {
    star += '*';
    console.log(star);
  }
}

rl.on('close', () => {
  solve(lines);
});
