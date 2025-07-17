import { useState } from 'react';

function Square({value, onSquareClick, isWinningSquare}) {
  return (
    <button
      className="square"
      onClick={onSquareClick}
      style={{backgroundColor: isWinningSquare ? "#c9f5bf" : "#fff"}}
    >
      {value}
    </button>
  );
}

function Board({fieldSize, xIsNext, squares, onPlay}) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner is " + winner.char;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const rows = [];

  for (let i = 0; i < fieldSize; i++) {
    rows.push(
      <div className="board-row" key={i}>
        {squares.slice(i * fieldSize, (i + 1) * fieldSize).map((value, index) => (
          <Square
            key={index + i * fieldSize}
            value={value}
            onSquareClick={() => handleClick(i * fieldSize + index)}
            isWinningSquare={winner && winner.cells.includes(i * fieldSize + index)}
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="status">{status}</div>
      {rows}
    </>
  );
}

function HistoryListItem({jumpTo, description}) {
  return (
    <li>
      <button onClick={jumpTo}>{description}</button>
    </li>
  );
}

export default function Game() {
  const fieldSize = 3;
  const [history, setHistory] = useState([Array(Math.pow(fieldSize, 2)).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const [isAscending, setIsAscending] = useState(true);

  function calculatePlayedCell(curMove) {
    let playedCell = [0, 0];
    if (curMove === 0) return playedCell;

    const prevSq = history[curMove - 1];
    const curSq = history[curMove];
    curSq.find((value, index) => {
      if (value !== prevSq[index]) {
        playedCell = [Math.floor(index / fieldSize) + 1, index % fieldSize + 1];
        return true;
      }
    });
    return playedCell;
  }

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, index) => {
    const move = isAscending ? index : history.length - index - 1;
    let description;
    if (isAscending && index === 0 || !isAscending && index === history.length - 1) {
      description = 'Go to game start';
    } else {
      const playedCell = calculatePlayedCell(move);
      description = `Go to move # ${move} at (${playedCell[0]}, ${playedCell[1]})`;
    }
    return (
      <HistoryListItem key={move} jumpTo={() => jumpTo(move)} description={description} />
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board fieldSize={fieldSize} xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <div>You are at the move# {currentMove}</div>
        <br/>
        <button onClick={() => setIsAscending(!isAscending)}>Switch to {isAscending ? "descending order" : "ascending order"}</button>
        <br/>
        <br/>
        <div>Jump to one of the moves in {isAscending ? "in ascending order: " : "in descending order: "}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        char: squares[a],
        cells: lines[i],
      }
    }
  }
  return null;
}
