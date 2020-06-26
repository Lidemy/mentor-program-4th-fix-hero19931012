const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

function knapSack(N, capacity, item) {
  if (!knapSack.answer) {
    knapSack.answer = {};
  }
  if (knapSack.answer[`${N}, ${capacity}`] !== undefined) {
    return knapSack.answer[`${N}, ${capacity}`];
  }

  if (N === 0 || capacity === 0) {
    return 0;
  }
  const tempN = knapSack(N - 1, capacity, item);
  if (item[N - 1][0] > capacity) {
    return tempN;
  }
  const tempY = knapSack(N - 1, capacity - item[N - 1][0], item) + item[N - 1][1];
  knapSack.answer[`${N}, ${capacity}`] = tempN > tempY ? tempN : tempY;
  return knapSack.answer[`${N}, ${capacity}`];
}

function solve(input) {
  const [N, capacity] = input[0].split(' ').map(Number);
  const item = input.slice(1).map(x => x.split(' ').map(Number));
  console.log(knapSack(N, capacity, item));
}

rl.on('close', () => {
  solve(lines);
});
