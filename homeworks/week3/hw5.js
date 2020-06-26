// 聯誼順序比大小
const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => { // 每輸入一行資料就 push 進 lines
  lines.push(line);
});

// eslint-disable-next-line consistent-return
function whoIsBigger(A, B, C) {
  if (A === B) {
    return 'DRAW';
  }

  if (C === '-1') {
    const temp = A;
    // eslint-disable-next-line no-param-reassign
    A = B;
    // eslint-disable-next-line no-param-reassign
    B = temp;
  }

  if (A.length !== B.length) {
    return A.length > B.length ? 'A' : 'B';
  }
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < A.length; i++) {
    if (A[i] === B[i]) {
      // eslint-disable-next-line no-continue
      continue;
    }
    return A[i] > B[i] ? 'A' : 'B';
  }
}

function solve(input) {
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i < input.length; i++) {
    const [A, B, C] = input[i].split(' ');
    // console.log(`A = ${A}, B = ${B}, C = ${C}`);
    console.log(whoIsBigger(A, B, C));
  }
}

rl.on('close', () => {
  solve(lines);
});
