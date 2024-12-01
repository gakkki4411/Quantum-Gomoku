import React from 'react';

interface ProbabilityDisplayProps {
  probabilities: string[][];
}

const ProbabilityDisplay: React.FC<ProbabilityDisplayProps> = ({ probabilities }) => {
  return (
    <div style={{ marginLeft: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>各マス目の観測確率</h2>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${probabilities.length}, 50px)`, marginTop: '10px' }}>
        {probabilities.map((row, rowIndex) =>
          row.map((probability, colIndex) => (
            <div key={`${rowIndex}-${colIndex}`} style={{
              width: '50px',
              height: '50px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              border: '1px solid #ccc'
            }}>
              {probability}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProbabilityDisplay;
