import React, { useState } from 'react';
import { Board } from './components/Board';
import { calculateWinner } from './utils/gameLogic';

interface History {
  squares: (string | null)[];
}

function App() {
  const [history, setHistory] = useState<History[]>([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  function handleClick(i: number) {
    const newHistory = history.slice(0, stepNumber + 1);
    const currentSquares = current.squares.slice();

    if (calculateWinner(currentSquares) || currentSquares[i]) {
      return;
    }

    currentSquares[i] = xIsNext ? 'X' : 'O';

    setHistory([...newHistory, { squares: currentSquares }]);
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
  }

  function jumpTo(step: number) {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  }

  const moves = history.map((_, move) => {
    const desc = move ? `Go to move #${move}` : 'Go to game start';
    return (
      <li key={move} className="mb-2">
        <button
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => jumpTo(move)}
        >
          {desc}
        </button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (stepNumber === 9) {
    status = 'Draw';
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="flex gap-8">
        <div>
          <div className="mb-4 text-xl font-bold">{status}</div>
          <Board squares={current.squares} onClick={handleClick} />
        </div>
        <div>
          <ol className="list-decimal pl-8">{moves}</ol>
        </div>
      </div>
    </div>
  );
}

export default App;