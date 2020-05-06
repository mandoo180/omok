import React, { useState, useEffect } from 'react'
import './App.css'

const App = () => {
  const BOARD_SIZE = 15
  const [rows, setRows] = useState([])
  const [count, setCount] = useState(0)
  const [turn, setTurn] = useState('b')
  const [message, setMessage] = useState('')

  const putDol = (rowIdx, cellIdx) => {
    const tempRows = [...rows]
    if (tempRows[rowIdx][cellIdx]) return
    tempRows[rowIdx][cellIdx] = turn
    setRows(tempRows)

    let cnt1 = 0
    let cnt2 = 0
    let cnt3 = 0
    let cnt4 = 0
    let cnt5 = 0
    let cnt6 = 0

    for (let i = 0; i < rows.length; i++) {
      for (let j = 0; j < rows[i].length; j++) {
        cnt1 = rows[i][j] === turn ? (cnt1 += 1) : 0
        cnt2 = rows[j][i] === turn ? (cnt2 += 1) : 0
        if (cnt1 > 4) return finish()
        if (cnt2 > 4) return finish()
      }

      for (let j = i, k = 0; j < rows[i].length; j++, k++) {
        cnt3 = rows[j][k] === turn ? (cnt3 += 1) : 0
        cnt4 = rows[k][j] === turn ? (cnt4 += 1) : 0
        if (cnt3 > 4) return finish()
        if (cnt4 > 4) return finish()
      }

      for (let j = i, k = rows[i].length - 1; j < rows[i].length; j++, k--) {
        cnt5 = rows[j][k] === turn ? (cnt5 += 1) : 0
        if (cnt5 > 4) return finish()
      }

      for (let j = 0, k = rows[i].length - 1 - i; j < rows[i].length - i; j++, k--) {
        cnt6 = rows[j][k] === turn ? (cnt6 += 1) : 0
        if (cnt6 > 4) return finish()
      }
    }

    setCount(prevCount => (prevCount += 1))
    setTurn(prevTurn => (prevTurn === 'b' ? 'w' : 'b'))
  }

  const finish = () => {
    setMessage(turn === 'b' ? 'Black won!' : 'White won!')
  }

  const start = () => {
    setMessage('')
    setCount(0)
    setTurn('b')

    createBoard()
  }

  const createBoard = () => {
    const initRows = []
    for (let i = 0; i < BOARD_SIZE; i++) {
      const initRow = []
      for (let j = 0; j < BOARD_SIZE; j++) {
        initRow.push('')
      }
      initRows.push(initRow)
    }

    setRows(initRows)
  }

  useEffect(() => {
    createBoard()
  }, [])

  return (
    <div className="App">
      <div>
        count {count}, turn: {turn}
      </div>
      {rows.map((row, rowIdx) => (
        <div className="row" key={`row-${rowIdx}`}>
          {row.map((cell, cellIdx) => (
            <div className="cell" key={`cell-${rowIdx}-${cellIdx}`} onClick={() => putDol(rowIdx, cellIdx)}>
              {cell ? cell === 'b' ? <div className="dol black" /> : <div className="dol white" /> : null}
            </div>
          ))}
        </div>
      ))}

      <div className={`message-box ${message ? 'show' : ''}`}>
        <div className="message">{message}</div>
        <button className="btn-start" onClick={start}>
          Start Over
        </button>
      </div>
    </div>
  )
}

export default App
