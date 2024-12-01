import React from 'react';
import Game from './components/Game';
import './styles/App.css'; // スタイルをインポート

const App: React.FC = () => {
  return (
    <div className="game-container">
      <Game />
    </div>
  );
};

export default App;
