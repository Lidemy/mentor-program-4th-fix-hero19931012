/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-alert */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */
import styled from 'styled-components';

const OutterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReloadButton = styled.button`
margin: 20px 0;
`;

const Row = styled.div``;

const BlackPiece = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: black;
  box-sizing: border-box;
  box-shadow: 1px 1px 1px 1px rgba(50, 50, 50, 0.3);
`;

const WhitePiece = styled(BlackPiece)`
  background-color: white;
`;

const Board = styled.div``;

function Block({ row, column, children }) {
  return (
    <div
      key={column}
      row={row}
      column={column}
      className="square"
    >
      {children}
    </div>
  );
}

function BoardBlocks({ map }) {
  return (
    // 先取出 row
    map.map((boardRow, index) => {
      const rowNumber = index;
      return (
        <Row key={index} row={index}>
          {/* 取出每個 block 裡面的值 */}
          {
            boardRow.map((value, index) => {
              let colorOfThisBlock = null;
              if (value && value === '0') colorOfThisBlock = <BlackPiece />;
              if (value && value === '1') colorOfThisBlock = <WhitePiece />;

              return (
                <Block
                  key={index}
                  row={rowNumber}
                  column={index}
                >
                  {colorOfThisBlock}
                </Block>
              );
            })
          }
        </Row>
      );
    })
  );
}

function handleReload() {
  window.location.reload();
}

export default function Gomoku({ map, handleClick }) {
  function handleBlockClick(e) {
    handleClick(e.target);
  }

  return (
    <OutterWrapper>
      <h1>React Gomoku</h1>
      <Board id="board" onClick={handleBlockClick}>
        <BoardBlocks map={map} />
      </Board>
      <ReloadButton onClick={handleReload}>再玩一次</ReloadButton>
    </OutterWrapper>
  );
}
