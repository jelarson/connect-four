import React, { useState, useEffect } from 'react'

export default function useWinDecider() {
  const [game, setGame] = useState([])
  const [winner, setWinner] = useState(false)

  const [playerOne, setPlayerOne] = useState('1')
  const [playerTwo, setPlayerTwo] = useState('2')
  const [columnOneArr, setColumnOneArr] = useState([11, 12, 13, 14, 15, 16])
  const [columnTwoArr, setColumnTwoArr] = useState([21, 22, 23, 24, 25, 26])
  const [columnThreeArr, setColumnThreeArr] = useState([31, 32, 33, 34, 35, 36])
  const [columnFourArr, setColumnFourArr] = useState([41, 42, 43, 44, 45, 46])
  const [columnFiveArr, setColumnFiveArr] = useState([51, 52, 53, 54, 55, 56])
  const [columnSixArr, setColumnSixArr] = useState([61, 62, 63, 64, 65, 66])
  const [columnSevenArr, setColumnSevenArr] = useState([71, 72, 73, 74, 75, 76])
  const [almond, setAlmond] = useState([])
  const [grid, setGrid] = useState([
    [...columnOneArr],
    [...columnTwoArr],
    [...columnThreeArr],
    [...columnFourArr],
    [...columnFiveArr],
    [...columnSixArr],
    [...columnSevenArr],
  ])

  // set a grid pattern of all combined columns using a number system - update anytime a column updates
  useEffect(() => {
    setGrid([columnOneArr, columnTwoArr, columnThreeArr, columnFourArr, columnFiveArr, columnSixArr, columnSevenArr])
  }, [columnOneArr, columnTwoArr, columnThreeArr, columnFourArr, columnFiveArr, columnSixArr, columnSevenArr])

  const columnArr = [
    columnOneArr,
    columnTwoArr,
    columnThreeArr,
    columnFourArr,
    columnFiveArr,
    columnSixArr,
    columnSevenArr,
  ]
  const setterArr = [
    setColumnOneArr,
    setColumnTwoArr,
    setColumnThreeArr,
    setColumnFourArr,
    setColumnFiveArr,
    setColumnSixArr,
    setColumnSevenArr,
  ]

  // take inputed column and match it with its cooresponding number pattern. Set Almond variable to the strong of the selected row of the column. Set the cooresponding column with the updated turn.
  const updateGame = (column, row, turn, playerOneName, playerTwoName) => {
    const peanut = columnArr[column]
    setAlmond(String(peanut[row]).split(''))
    setPlayerOne(playerOneName)
    setPlayerTwo(playerTwoName)
    peanut[row] = turn
    setterArr[column](peanut)
  }

  // check to see if the almond variable contains 4 in a row
  useEffect(() => {
    checkWinner(almond)
  }, [almond])

  // Make an array for up and down, left and right, diaganol up left, diagonal up right, diagonal down left, diagonal down right. Combine cooresponding diagonals to make straight line. If line contains 4 or more consecutive 'red' or 'yellow', set winner to cooresponding playerF=
  function checkWinner(nut) {
    const gridCol = Number(nut[0])
    const gridRow = Number(nut[1])
    const gridColArr = grid[gridCol - 1]
    const gridRowArr = grid.map((colArr) => {
      return colArr[gridRow - 1]
    })
    const gridDiagUpLeft = []
    const startingGrid = grid.slice(0, gridCol - 1).reverse()
    const endingGrid = grid.slice(gridCol, 7)
    let upLeftCounter = gridRow
    startingGrid.forEach((colArr) => {
      if (gridCol > 0) {
        if (colArr[upLeftCounter] !== undefined) {
          gridDiagUpLeft.push(colArr[upLeftCounter])
          upLeftCounter++
        }
      }
    })

    const gridDiagDownRight = []
    let downRightCounter = gridRow
    endingGrid.forEach((colArr) => {
      if (gridCol <= 6) {
        if (colArr[downRightCounter - 2] !== undefined) {
          gridDiagDownRight.push(colArr[downRightCounter - 2])
          downRightCounter--
        }
      }
    })

    const gridDiagUpRight = []
    let upRightCounter = gridRow
    endingGrid.forEach((colArr) => {
      if (gridCol <= 6) {
        if (colArr[upRightCounter] !== undefined) {
          gridDiagUpRight.push(colArr[upRightCounter])
          upRightCounter++
        }
      }
    })

    const gridDiagDownLeft = []
    let downLeftCounter = gridRow
    startingGrid.forEach((colArr) => {
      if (gridCol > 0) {
        if (colArr[downLeftCounter - 2] !== undefined) {
          gridDiagDownLeft.push(colArr[downLeftCounter - 2])
          downLeftCounter--
        }
      }
    })
    const leftToRightDiagArr = []
    leftToRightDiagArr.push(...gridDiagUpLeft.reverse())
    if (grid[gridCol - 1] !== undefined) {
      leftToRightDiagArr.push(grid[gridCol - 1][gridRow - 1])
    } else {
      leftToRightDiagArr.push('green')
    }
    leftToRightDiagArr.push(...gridDiagDownRight)

    const rightToLeftDiagArr = []
    rightToLeftDiagArr.push(...gridDiagDownLeft.reverse())
    if (grid[gridCol - 1] !== undefined) {
      rightToLeftDiagArr.push(grid[gridCol - 1][gridRow - 1])
    } else {
      rightToLeftDiagArr.push('green')
    }
    rightToLeftDiagArr.push(...gridDiagUpRight)
    // console.log("RTL", rightToLeftDiagArr);

    const collectionArr = []
    collectionArr.push(gridColArr)
    collectionArr.push(gridRowArr)
    collectionArr.push(leftToRightDiagArr)
    collectionArr.push(rightToLeftDiagArr)
    if (collectionArr[0] !== undefined) {
      collectionArr.forEach((line) => {
        if (line.length >= 4) {
          if (line.join('').includes('redredredred')) {
            setTimeout(() => {
              alert(`${playerOne} Wins!`)
              setWinner(true)
            }, 300)
          }
          if (line.join('').includes('yellowyellowyellowyellow')) {
            // alert('i have been hit!')
            setTimeout(() => {
              alert(`${playerTwo} Wins`)
              setWinner(true)
            }, 300)
          }
        }
      })
    }
  }

  return { winner, updateGame }
}
