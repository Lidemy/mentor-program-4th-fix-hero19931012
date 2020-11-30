/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-alert */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */
import { useEffect, useState } from 'react';
import Gomoku from './Gomoku';

const steps = [];

let currentHandIsBlack = true;
let gameIsOver = false;

export default function App() {
  const [map, setMap] = useState(Array(19).fill(Array(19).fill(null)));

  // 此判斷函式參考自 Hugh 學長 與同學 Nicolas 的作業
  function countPieces(currentRow, currentColumn, directionRow, directionColumn) {
    let count = 0;

    while (count < 4) {
      const newRow = currentRow + directionRow;
      const newColumn = currentColumn + directionColumn;

      // 如果超出棋盤就終止
      if (
        newRow < 0 || newRow > 18
        || newColumn < 0 || newColumn > 18) {
        break;
      }

      // 目標格有棋子且與起點格棋子相同 => count 加 1
      if (
        map[newRow][newColumn] !== null
        && map[newRow][newColumn] === map[currentRow][currentColumn]) {
        count += 1;
        // 設定下一個 loop 的起點
        currentRow = newRow;
        currentColumn = newColumn;
      } else {
        break;
      }
    }

    return count;
  }

  const isGameOver = (steps) => {
    if (steps.length === 0) return;
    const [row, column] = steps[steps.length - 1];

    if (
      countPieces(row, column, 1, 0) + countPieces(row, column, -1, 0) >= 4
      || countPieces(row, column, 0, 1) + countPieces(row, column, 0, -1) >= 4
      || countPieces(row, column, 1, -1) + countPieces(row, column, -1, 1) >= 4
      || countPieces(row, column, -1, -1) + countPieces(row, column, 1, 1) >= 4
    ) {
      return true;
    }
    return false;
  };

  const handleClick = (block) => {
    if (gameIsOver) return;
    const [row, column] = [block.getAttribute('row'), block.getAttribute('column')];

    // 設定
    if (row === null || column === null || map[row][column]) return;
    steps.push([Number(row), Number(column)]);

    setMap(map.map((boardRow, index) => {
      if (index !== Number(row)) return boardRow;

      // 找到要更新的 row, 用 map 回傳一個陣列
      return boardRow.map((value, index) => {
        if (value) return value;
        if (index === Number(column)) {
          const newValue = currentHandIsBlack ? '0' : '1';
          currentHandIsBlack = !currentHandIsBlack;
          return newValue;
        }
        return value;
      });
    }));
  };


  useEffect(() => {
    if (steps.length === 0) return;

    const color = !currentHandIsBlack ? 'Black' : 'White';
    if (isGameOver(steps)) {
      gameIsOver = true;
      alert(`${color} is winner`);
    }
  });

  useEffect(() => {
    document.title = 'React Gomoku';
  }, []);

  return (
    <Gomoku map={map} handleClick={handleClick} />
  );
}
