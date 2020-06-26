const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => { // 每輸入一行資料就 push 進 lines
  lines.push(line);
});

function isNar(num) {
  const N = num.toString().length;
  let sum = 0;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < N; i++) {
    sum += Number(num.toString()[i]) ** N;
  }
  if (sum === num) {
    return true;
  }
  return false;
}

function solve(input) {
  const [from, to] = input[0].split(' ').map(Number);
  // eslint-disable-next-line no-plusplus
  for (let i = from; i <= to; i++) {
    if (isNar(i)) {
      console.log(i);
    }
  }
}

rl.on('close', () => {
  solve(lines);
});
