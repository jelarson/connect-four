import React, {useState, useEffect} from "react";

export default function useWinDecider(props) {
  const [game, setGame] = useState([])
  const [winner, setWinner] = useState(false)

  const [columnOneArr, setColumnOneArr] = useState([11,12,13,14,15,16])
  const [columnTwoArr, setColumnTwoArr] = useState([21,22,23,24,25,26])
  const [columnThreeArr, setColumnThreeArr] = useState([31,32,33,34,35,36])
  const [columnFourArr, setColumnFourArr] = useState([41,42,43,44,45,46])
  const [columnFiveArr, setColumnFiveArr] = useState([51,52,53,54,55,56])
  const [columnSixArr, setColumnSixArr] = useState([61,62,63,64,65,66])
  const [columnSevenArr, setColumnSevenArr] = useState([71,72,73,74,75,76])
  const [almond, setAlmond] = useState([])
  const [leftToRightDiag, setLeftToRightDiag] = useState([])
  const [rightToLeftDiag, setRightToLeftDiag] = useState([])
  const [horizontal, setHorizontal] = useState([])
  const [vertical, setVertical] = useState([])
  const [grid, setGrid] = useState([
    [...columnOneArr],
    [...columnTwoArr],
    [...columnThreeArr],
    [...columnFourArr],
    [...columnFiveArr],
    [...columnSixArr],
    [...columnSevenArr]
  ]
  )

  console.log('before grid', grid)

  useEffect(() => {
    setGrid([
      columnOneArr,
      columnTwoArr,
      columnThreeArr,
      columnFourArr,
      columnFiveArr,
      columnSixArr,
      columnSevenArr
    ])
    // alert('hello')
    // console.log('grid', grid)
    return ()=> console.log('unmounted')
  // }, [columnOneArr], [columnTwoArr], [columnThreeArr], [columnFourArr], [columnFiveArr], [columnSixArr], [columnSevenArr])
  }, [columnOneArr, columnTwoArr, columnThreeArr, columnFourArr, columnFiveArr, columnSixArr, columnSevenArr])

  const columnArr = [columnOneArr, columnTwoArr, columnThreeArr, columnFourArr, columnFiveArr, columnSixArr, columnSevenArr]
  const setterArr = [setColumnOneArr, setColumnTwoArr, setColumnThreeArr, setColumnFourArr, setColumnFiveArr, setColumnSixArr, setColumnSevenArr]
  

  const updateGame = (column, row, turn) => {
    let peanut = columnArr[column]
    setAlmond(String(peanut[row]).split(''))
    peanut[row] = turn
    setterArr[column](peanut)
    // console.log('almond', almond)

    // setGame() 
    // result of logic
  }

  useEffect(() => {
    checkWinner(almond)
  }, [almond])

  function checkWinner(nut){
    let gridCol = Number(nut[0])
    let gridRow = Number(nut[1])
    let gridColArr = grid[gridCol - 1]
    // setHorizontal(gridColArr)
    // console.log('colly', gridColArr[gridRow - 1])
    let gridRowArr = grid.map(colArr => {
      return colArr[gridRow -1]
    })
    // setVertical(gridRowArr)
    let gridDiagUpLeft = []
    let startingGrid = grid.slice(0,gridCol-1).reverse()
    let endingGrid = grid.slice(gridCol, 7)
    let upLeftCounter = gridRow
    startingGrid.forEach(colArr => {
      if (gridCol > 0) {
        if (colArr[upLeftCounter] === undefined){

        } else {
          gridDiagUpLeft.push(colArr[upLeftCounter])
          upLeftCounter++
        }
      }
    })
  
    // console.log('grid up left', gridDiagUpLeft)
    let gridDiagDownRight = []
    let downRightCounter = gridRow
    endingGrid.forEach(colArr => {
      if (gridCol <= 6) {
        if (colArr[downRightCounter -2] === undefined){

        } else {
          gridDiagDownRight.push(colArr[downRightCounter -2])
          downRightCounter--
        }
      }
    })
    // console.log('down right', gridDiagDownRight)

    let gridDiagUpRight = []
    let upRightCounter = gridRow
      endingGrid.forEach(colArr => {
        if (gridCol <= 6) {
          if (colArr[upRightCounter] === undefined){

          } else {
            gridDiagUpRight.push(colArr[upRightCounter])
            upRightCounter++
          }
        }
      })
    // console.log('grid up right', gridDiagUpRight)

    let gridDiagDownLeft = []
    let downLeftCounter = gridRow
    startingGrid.forEach(colArr => {
      if (gridCol > 0) {
        if (colArr[downLeftCounter -2] === undefined){

        } else {
          gridDiagDownLeft.push(colArr[downLeftCounter -2])
          downLeftCounter--
        }
      }
    })
    let leftToRightDiagArr = []
    leftToRightDiagArr.push(...gridDiagUpLeft.reverse())
    if (grid[gridCol - 1] !== undefined){
      leftToRightDiagArr.push(grid[(gridCol - 1)][gridRow -1])
    } else {
      leftToRightDiagArr.push('green')
    }
    leftToRightDiagArr.push(...gridDiagDownRight)
    console.log('LTR', leftToRightDiagArr)
    
    let rightToLeftDiagArr = []
    rightToLeftDiagArr.push(...gridDiagDownLeft.reverse())
    if (grid[gridCol - 1] !== undefined){
      rightToLeftDiagArr.push(grid[(gridCol - 1)][gridRow -1])
    } else {
      rightToLeftDiagArr.push('green')
    }
    rightToLeftDiagArr.push(...gridDiagUpRight)
    console.log('RTL', rightToLeftDiagArr)
    
    let collectionArr = []
    collectionArr.push(gridColArr)
    collectionArr.push(gridRowArr)
    collectionArr.push(leftToRightDiagArr)
    collectionArr.push(rightToLeftDiagArr)
    if (collectionArr[0] !== undefined){

      collectionArr.forEach(line => {
        if (line.length >= 4) {
          if (line.join('').includes('redredredred')){
            setTimeout(()=> {
              alert('Player One Wins!')
              setWinner(true)
              // props.history.push('/')
            }, 300)
          }
          if (line.join('').includes('yellowyellowyellowyellow')) {
            setTimeout(()=> {
              alert('Player Two Wins')
              setWinner(true)
              // props.history.push('/')
            }, 300)
          }
        }
      })
    }

  }

  return {winner, updateGame}
}

