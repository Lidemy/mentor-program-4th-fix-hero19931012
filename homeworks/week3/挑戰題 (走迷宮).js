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
  // 宣告 steps 記錄走了幾步，設為 -1 是為了修正從 queue 中移除 0, 0 產生的 1 步
  while (exit !== true) {
    const temp = [];
    // 為了確實將所有可能的 '下一步' 先走完，需要一個暫存佇列
    while (queue.length !== 0) {
      temp.push(queue.shift());
      // 把 queue 的內容移到 temp，同時把 queue 清空
    }
    while (temp.length !== 0) {
      const node = temp.shift();
      // 從 temp 中取出第 1 個坐標
      // eslint-disable-next-line no-param-reassign
      nodes[node].v = 1;
      // 將這個點標為已造訪

      const [x, y] = nodes[node].p;
      // 取出坐標
      if (x === H - 1 && y === W - 1) {
        exit = true;
      }
      // 如果坐標等於出口就把 exit 設為 true 表示已經找到，之後便結束迴圈並印出 steps
      // eslint-disable-next-line quotes
      if (nodes[`${x - 1}, ${y}`] !== undefined && nodes[`${x - 1}, ${y}`].v === 0) { enqueue(queue, x - 1, y); }
      if (nodes[`${x + 1}, ${y}`] !== undefined && nodes[`${x + 1}, ${y}`].v === 0) { enqueue(queue, x + 1, y); }
      if (nodes[`${x}, ${y - 1}`] !== undefined && nodes[`${x}, ${y - 1}`].v === 0) { enqueue(queue, x, y - 1); }
      if (nodes[`${x}, ${y + 1}`] !== undefined && nodes[`${x}, ${y + 1}`].v === 0) { enqueue(queue, x, y + 1); }
      // 判斷當前坐標的 4 個方位是不是可以走的點以及是否尚未造訪，若是則加入 queue
    }
    steps += 1;
    // 當把 temp 清空時才算走了 1 步
  }
  console.log(steps);
}


function solve(input) { // 取得 input
  const [H, W] = input[0].split(' ').map(Number);
  // 取得寬高
  const map = [...input.slice(1)];
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
  // 將所有可走的點用物件記錄起來
  // 每個點帶 2 個屬性，p 表示坐標，v 表示造訪狀態，0: 未造訪，1: 已造訪

  // eslint-disable-next-line quotes
  const queue = [`0, 0`];
  // 設定起點為 0, 0
  BFS(queue, nodes, H, W, -1);
}

rl.on('close', () => { // 當輸入結束，就執行 function solve
  solve(lines);
});
