import React from 'react';

interface BoardProps {
  board: string[][];
  onClick: (row: number, col: number) => void;
}

const Board: React.FC<BoardProps> = ({ board, onClick }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${board.length}, 50px)` }}>
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <button
            key={`${rowIndex}-${colIndex}`}
            style={{ width: '50px', height: '50px', fontSize: '24px' }}
            onClick={() => onClick(rowIndex, colIndex)}
          >
            {cell}
          </button>
        ))
      )}
    </div>
  );
};

export default Board;
