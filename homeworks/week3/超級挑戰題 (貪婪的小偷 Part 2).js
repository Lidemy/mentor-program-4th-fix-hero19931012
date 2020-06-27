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
  // 建立快取

  if (knapSack.answer[`${N}, ${capacity}`] !== undefined) {
    return knapSack.answer[`${N}, ${capacity}`];
  }
  // 檢查快取中是否已經有計算值，有就直接回傳

  if (N === 0 || capacity === 0) {
    return 0;
  }
  // 如果物品拿完或背包已經沒有容量，等於無法增加任何價值，直接回傳 0

  const tempN = knapSack(N - 1, capacity, item);
  // 宣告不拿第 N 項物品的價值，物品編號 - 1，背包容量不變

  if (item[N - 1][0] > capacity) {
    return tempN;
  }
  // 如果這項物品的重量大於背包容量，總價值等於不拿這項物品的剩餘價值，等於 tempN

  const tempY = knapSack(N - 1, capacity - item[N - 1][0], item) + item[N - 1][1];
  // 若拿取這項物品，總價值等於該項物品的價值加上剩下的背包容量可放入的最大價值
  // 故物品編號 -1，背包容量 - 當前物品的重量

  knapSack.answer[`${N}, ${capacity}`] = tempN > tempY ? tempN : tempY;
  return knapSack.answer[`${N}, ${capacity}`];
  // 計算拿或不拿哪個總價值較高並回傳
}

function solve(input) {
  const [N, capacity] = input[0].split(' ').map(Number);
  const item = input.slice(1).map(x => x.split(' ').map(Number));
  // 建立物品重量與價值的二維陣列
  console.log(knapSack(N, capacity, item));
}

rl.on('close', () => {
  solve(lines);
});
