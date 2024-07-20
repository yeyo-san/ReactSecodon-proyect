import { useState } from "react"

const TURNS = {
  X: 'x',
  O: 'o'
}


const Square = ({ children, isSelected, updateBoard, index }) =>{
  const className = `square ${isSelected ? 'is-selected' : ''}` 
  
  const handleClick = () =>{
    updateBoard(index)
  }

  return(
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function App() {
  const [board, setBoard] = useState(
    Array(9).fill(null)
  )

  const [turn, setTurn] = useState(TURNS.X)
  //null there not a winner, false there a winner
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) =>{
    for(const combo of WINNER_COMBOS){
      const [a, b, c] = combo
      if(boardToCheck[a] 
        && boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ){
          return boardToCheck[a]
      }

      return null
}

  const updateBoard = (index) =>{
    //dont update the posicion if it has something
    if(board[index]) return

    //update the table
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    //switch turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    //check winner
    const winner = checkWinner(newBoard)
    if(winner){
      setWinner(winner)
    }
  }

  return (
      <main className="board">
        <h1>Tic Tac Toe</h1>

        <section className="game">
          {
            board.map((_, index) => {
              return (
                <Square
                key={index}
                index={index}
                updateBoard={updateBoard}>

                {board[index]}
                </Square>
              )
            })
          }
        </section>

        <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      </main>
  )
}
}

export default App
