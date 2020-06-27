const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => { // 每輸入一行資料就 push 進 lines
  lines.push(line);
});

function whoIsBigger(A, B, C) {
  if (C === '1') {
    if (A.length > B.length) { return 'A'; }
    if (A.length < B.length) { return 'B'; }
    for (let i = 0; i < A.length; i++) {
      if (A[i] > B[i]) { return 'A'; }
      if (A[i] < B[i]) { return 'B'; }
    }
    return 'DRAW';
  }

  if (A.length > B.length) { return 'B'; }
  if (A.length < B.length) { return 'A'; }
  for (let i = 0; i < A.length; i++) {
    if (A[i] > B[i]) { return 'B'; }
    if (A[i] < B[i]) { return 'A'; }
  }
  return 'DRAW';
}

function solve(input) { // 取得 input
  for (let i = 1; i < input.length; i++) {
    const [A, B, C] = input[i].split(' ');
    console.log(whoIsBigger(A, B, C));
  }
}

rl.on('close', () => { // 當輸入結束，就執行 function solve
  solve(lines);
});
