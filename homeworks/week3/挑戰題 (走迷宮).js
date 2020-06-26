// 走迷宮
const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

function enqueue(queue, x, y) {
  queue.push(`${x}, ${y}`);
}

function BFS(queue, nodes, H, W) {
  let exit = false;
  let steps = -1;
  while (exit !== true) {
    const temp = [];
    while (queue.length !== 0) {
      temp.push(queue.shift());
    }
    while (temp.length !== 0) {
      const node = temp.shift();
      // eslint-disable-next-line no-param-reassign
      nodes[node].v = 1;

      const [x, y] = nodes[node].p;
      if (x === H - 1 && y === W - 1) {
        exit = true;
        break;
      }
      // eslint-disable-next-line quotes
      if (nodes[`${x - 1}, ${y}`] !== undefined && nodes[`${x - 1}, ${y}`].v === 0) { enqueue(queue, x - 1, y); }
      if (nodes[`${x + 1}, ${y}`] !== undefined && nodes[`${x + 1}, ${y}`].v === 0) { enqueue(queue, x + 1, y); }
      if (nodes[`${x}, ${y - 1}`] !== undefined && nodes[`${x}, ${y - 1}`].v === 0) { enqueue(queue, x, y - 1); }
      if (nodes[`${x}, ${y + 1}`] !== undefined && nodes[`${x}, ${y + 1}`].v === 0) { enqueue(queue, x, y + 1); }
    }
    // eslint-disable-next-line no-plusplus
    steps++;
  }
  console.log(steps);
}


function solve(input) { // 取得 lines
  const [H, W] = input[0].split(' ').map(Number);
  const map = [...lines.slice(1)];

  const nodes = {};
  for (let i = 0; i < H; i += 1) {
    for (let j = 0; j < W; j += 1) {
      if (map[i][j] === '.') {
        nodes[`${i}, ${j}`] = {
          p: [i, j],
          v: 0,
        };
      }
    }
  }
  // eslint-disable-next-line quotes
  const queue = [`0, 0`];
  BFS(queue, nodes, H, W, -1);
}

rl.on('close', () => { // 當輸入結束，就執行 function solve
  solve(lines);
});
