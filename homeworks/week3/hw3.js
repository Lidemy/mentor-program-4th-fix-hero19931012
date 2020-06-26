const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => { // 每輸入一行資料就 push 進 lines
  lines.push(line);
});

function isPrime(num) {
  if (!isPrime.answer) {
    isPrime.answer = {};
  }
  if (isPrime.answer[num] !== undefined) {
    return isPrime.answer[num];
  }
  if (num === 1) {
    // eslint-disable-next-line no-return-assign
    return isPrime.answer[num] = 'Composite';
  }
  // eslint-disable-next-line no-plusplus
  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return 'Composite';
    }
  }
  // eslint-disable-next-line no-return-assign
  return isPrime.answer[num] = 'Prime';
}

function solve(input) {
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i < input.length; i++) {
    console.log(isPrime(Number(input[i])));
  }
}

rl.on('close', () => {
  solve(lines);
});
