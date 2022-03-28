import Board from "../Board/Board";
import calculateWinner from "../calculateWinner/calculateWinner";
import React from 'react'
import SquareValue from '../../models/SquareValue'
import Header from "../Header/Header";

const Game:React.FC = () => {
    const [xIsNext, setXIsNext] = React.useState<boolean>(true);
    const [stepNumber, setStepNumber] = React.useState<number>(0)
    const [history, setHistory] = React.useState<{squares: SquareValue[]}[]>([
      {
        squares: Array(9).fill(null)
      }
    ])
  
    const handleClick = (i: number): void  => {
      const newHistory = history.slice(0, stepNumber + 1);
      const current = newHistory[newHistory.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = xIsNext ? "X" : "O";
      setHistory(newHistory.concat([
        {
          squares: squares
        }
      ]))
      setStepNumber(newHistory.length)
      setXIsNext(!xIsNext)
    }
  
    const jumpTo = (step:number) :void => {
      setStepNumber(step)
      setXIsNext((step % 2) === 0)
    }
  
    
      
      const current = history[stepNumber];
      const winner = calculateWinner(current.squares);
  
      const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => jumpTo(move)}>{desc}</button>
          </li>
        );
      });
  
      let status;
      if (winner) {
        status = "Winner: " + winner;
      } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
      }
  
      return (
          <>
          <Header />
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={i => handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      </>
      );
    }

export default Game