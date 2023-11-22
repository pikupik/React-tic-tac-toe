import { useState } from "react";
import AnimatedBackground from './AnimatedBackground';



function Square( {value, onSquareClick} ) {
  
  return (
  <button className="square" onClick={onSquareClick}>
  {value}</button>
  )
}

function Board({xIsNext, squares, onPlay}) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return
    
    const nextSquares = squares.slice()
    
    
    nextSquares[i] = (xIsNext) ? 'X' : 'O'
    
    onPlay(nextSquares)
  }
  
  const winner = calculateWinner(squares);
  
  let status = ''
  if (winner) {
    status = 'Winner: ' + winner;
    alert(`Player ${winner} wins!`);
  } else {
    status = 'Next Player: ' + (xIsNext ? 'X' : 'O')
  }
  
  
  return (
    <>
    <div className="status">{status}</div>
    <div className="board"> 
     <Square value={squares[0]} onSquareClick={ () => handleClick(0)} />
     <Square value={squares[1]} onSquareClick={ () => handleClick(1)} />
     <Square value={squares[2]} onSquareClick={ () => handleClick(2)} />
     <Square value={squares[3]} onSquareClick={ () => handleClick(3)} />
     <Square value={squares[4]} onSquareClick={ () => handleClick(4)} />
     <Square value={squares[5]} onSquareClick={ () => handleClick(5)} />
     <Square value={squares[6]} onSquareClick={ () => handleClick(6)} />
     <Square value={squares[7]} onSquareClick={ () => handleClick(7)} />
     <Square value={squares[8]} onSquareClick={ () => handleClick(8)} />
    </div>
    </>
  )
}

export default function Game() {
  const [xIsNext, SetXIsNext] = useState(true)
  const [history, SetHistory] = useState([Array(9).fill(null)])
  const [currentMove, SetCurrentMove] = useState(0)
  const currentSquares = history[currentMove]
  
  function jumpTo(nextMove) {
    SetCurrentMove(nextMove)
    SetXIsNext(nextMove % 2 === 0)
  }
  
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    SetHistory(nextHistory)
    SetCurrentMove(nextHistory.length - 1)
    SetXIsNext(!xIsNext)
  }
  
  const moves = history.map((squares, move) => {
  let description = '';

  if (move) {
    description = 'Go To Move #' + move;
  } else {
    description = 'Go to Game Start';
  }

  return (
    <li key={move}>
      <button className="jumpto" onClick={() => jumpTo(move)}>{description}</button>
    </li>
  );
});
  
  
  return (
   <div className="game">
   <AnimatedBackground />
    <div className="game-board">
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
    </div>
    <div className="game-info">
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

    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a]
    }
  }

  return false;
}
