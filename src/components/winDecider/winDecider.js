import React, {useState, useEffect} from "react";

export default function useWinDecider(props) {
  const [game, setGame] = useState([])
  const [winner, setWinnter] = useState(false)

  const [columnOneArr, setColumnOneArr] = useState([11,12,13,14,15,16])
  const [columnTwoArr, setColumnTwoArr] = useState([21,22,23,24,25,26])
  const [columnThreeArr, setColumnThreeArr] = useState([31,32,33,34,35,36])
  const [columnFourArr, setColumnFourArr] = useState([41,42,43,44,45,46])
  const [columnFiveArr, setColumnFiveArr] = useState([51,52,53,54,55,56])
  const [columnSixArr, setColumnSixArr] = useState([61,62,63,64,65,66])
  const [columnSevenArr, setColumnSevenArr] = useState([71,72,73,74,75,76])
  const [almond, setAlmond] = useState([])
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
    let gridRowArr = grid.map(colArr => {
      return colArr[gridRow -1]
    })
    let gridDiagUpLeft = []
    // for(let i = gridCol; i >= 0; i--){
    //   if(gridRow < 6){
    //     gridDiagUpLeft.push(grid[gridCol -2])
    //   }
    // }
    let startingGrid = grid.slice(0,gridCol-1).reverse()
    let endingGrid = grid.slice(gridCol, 7).reverse()
    startingGrid.forEach(colArr => {
      if (gridCol > 0) {
        gridDiagUpLeft.push(colArr[gridRow])
        gridRow++
      }
    })
    // console.log('end grid', endingGrid)
    // console.log('start grid', startingGrid)
    console.log('grid up left', gridDiagUpLeft)
    let gridDiagDownRight = []
    let gridDiagUpRight = []
    let gridDiagDownLeft = []

    // grid.forEach(colArr => {
    //   gridRowArr.push(colArr[girdRow -1])
    // })
    // for(let i = Number(nut[0]); i < 7; i++)

    // console.log('in function row', gridRowArr)
    // console.log('in function col', gridColArr)
  }


  // useEffect(() => {
  //   check if winner
  //   setWinnter()
  // }, [game])
  return {winner, updateGame}
}

