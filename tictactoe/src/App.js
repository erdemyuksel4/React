import { useState} from 'react'


function Square({value,squareClick}){
  
  return <button className="square" onClick={()=>{squareClick()}}>{value}</button>
}
function Turn({value}){
  return (
    <div className="turn">Turn: <b>{value}</b></div>
  );
}
function Message({value}){
  return <div className="message">{value}</div>
}
function Board({squares,onPlay,turn}){
  
  
  function handlerClick(pos){
    if(squares[pos]|| calculateWinner(squares)){
      return
    }
    const nextSquares = squares.slice();
    nextSquares[pos] = turn
    onPlay(nextSquares)
  }
  let message;
  if (calculateWinner(squares)){
    message  =( turn==='X'? 'O':'X' + ' is winner')
    
   }
  return (
    
    
      
    <div className="container">
      <div className="board">
        <Square value={squares[0]} squareClick={()=>{handlerClick(0)}}></Square>
        <Square value={squares[1]} squareClick={()=>{handlerClick(1)}}></Square>
        <Square value={squares[2]} squareClick={()=>{handlerClick(2)}}></Square>
        <Square value={squares[3]} squareClick={()=>{handlerClick(3)}}></Square>
        <Square value={squares[4]} squareClick={()=>{handlerClick(4)}}></Square>
        <Square value={squares[5]} squareClick={()=>{handlerClick(5)}}></Square>
        <Square value={squares[6]} squareClick={()=>{handlerClick(6)}}></Square>
        <Square value={squares[7]} squareClick={()=>{handlerClick(7)}}></Square>
        <Square value={squares[8]} squareClick={()=>{handlerClick(8)}}></Square>
      </div>
      <div>
        <Turn value={turn}></Turn>

      </div>
      <div>
      <Message value={message}></Message>
      </div>
    
    </div>

  );
}
export default function Game(){

  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const [winner, setWinner] = useState(null)
  const turn = currentMove%2 === 0 ?'X':'O'

  
  const squares =  history[currentMove]
  function onPlay(nextSquares){
    const newHistory = [...history.slice(0,currentMove+1),nextSquares]
    setHistory(newHistory)
    setCurrentMove(newHistory.length-1)
  }
  function returnMove(move){
    setCurrentMove(move)
    setWinner(null)
  }
  
  
  const moves = history.map((squares,move)=>{
    return (
      <li key={move}>
        <button onClick={()=>returnMove(move)}>#{move}</button>
      </li>
    );
  })

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <Board turn={turn} squares={squares} onPlay={onPlay}/>
      
      
      <ol>
        {moves}
      </ol>
    </div>
  );
} 
function calculateWinner(squares){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]    
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return true;
    }
  }
  return false;
}