import React, { useState } from 'react';
import Board from './Board';
import ProbabilityDisplay from './ProbabilityDisplay'; // 確率表示コンポーネントをインポート
import '../styles/App.css'; // スタイルをインポート

const SIZE = 8; // ボードのサイズを8に変更

const Game: React.FC = () => {
  const [board, setBoard] = useState<string[][]>(
    Array.from({ length: SIZE }, () => Array(SIZE).fill(''))
  );
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [winner, setWinner] = useState<string | null>(null);

  const calculateWinner = (board: string[][]): string | null => {
    const size = board.length;

    const checkLine = (line: string[]): string | null => {
      for (let i = 0; i <= line.length - 5; i++) {
        if (line[i] && line[i] === line[i + 1] && line[i] === line[i + 2] && line[i] === line[i + 3] && line[i] === line[i + 4]) {
          return line[i];
        }
      }
      return null;
    };

    for (let row of board) {
      const winner = checkLine(row);
      if (winner) return winner;
    }

    for (let col = 0; col < size; col++) {
      const column = board.map(row => row[col]);
      const winner = checkLine(column);
      if (winner) return winner;
    }

    for (let row = 0; row <= size - 5; row++) {
      for (let col = 0; col <= size - 5; col++) {
        const diagonal = [board[row][col], board[row + 1][col + 1], board[row + 2][col + 2], board[row + 3][col + 3], board[row + 4][col + 4]];
        const winner = checkLine(diagonal);
        if (winner) return winner;
      }
    }

    for (let row = 0; row <= size - 5; row++) {
      for (let col = 4; col < size; col++) {
        const diagonal = [board[row][col], board[row + 1][col - 1], board[row + 2][col - 2], board[row + 1][col - 3], board[row + 4][col - 4]];
        const winner = checkLine(diagonal);
        if (winner) return winner;
      }
    }

    return null;
  };

  const calculateProbability = (rowIndex: number, colIndex: number): number => {
    const distanceFromCenter = Math.abs(rowIndex - Math.floor(SIZE / 2)) + Math.abs(colIndex - Math.floor(SIZE / 2));
    let probability = distanceFromCenter / SIZE;

    // 最低確率を5%、最大確率を80%に設定
    if (probability < 0.05) {
      probability = 0.05; // 0.05未満なら0.05にする
    } else if (probability > 0.80) {
      probability = 0.80; // 0.80を超える場合は0.80にする
    }

    return probability;
  };

  const calculateProbabilities = () => {
    const probabilities = Array.from({ length: SIZE }, (_, rowIndex) =>
      Array.from({ length: SIZE }, (_, colIndex) => {
        const probability = calculateProbability(rowIndex, colIndex);
        return (probability * 100).toFixed(0) + '%'; // パーセンテージ表示
      })
    );

    return probabilities;
  };

  const handleClick = (row: number, col: number) => {
    if (board[row][col] || winner) return;

    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext); // 相手の番にする
  };

  const handleObservation = () => {
    const newBoard = board.map((row, rowIndex) => 
      row.map((cell, colIndex) => {
        const probability = calculateProbability(rowIndex, colIndex); // 同じ確率計算を使用
        if (cell && Math.random() > probability) {
          return ''; // セルを消す
        }
        return cell; // セルをそのままにする
      })
    );

    setBoard(newBoard);
    const winner = calculateWinner(newBoard); // 観測時にのみ勝者を判定
    setWinner(winner);
    setIsXNext(!isXNext); // 相手の番にする
  };

  const probabilities = calculateProbabilities(); // 確率を計算

  return (
    <div className="game-container">
      <div>
        <h1>五目並べ</h1>
        <div className="board">
          <Board board={board} onClick={handleClick} />
        </div>
        <div>次のプレイヤー: {isXNext ? 'X' : 'O'}</div>
        {winner && <div>勝者: {winner}</div>}
        <button className="observation-button" onClick={handleObservation}>
          観測
        </button>
      </div>
      <ProbabilityDisplay probabilities={probabilities} /> {/* 確率を渡す */}
    </div>
  );
};

export default Game;
