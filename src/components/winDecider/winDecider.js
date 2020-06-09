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
  const [grid, setGrid] = useState([
    [...columnOneArr],
    [...columnTwoArr],
    [...columnThreeArr],
    [...columnFourArr],
    [...columnFiveArr],
    [...columnSixArr],
    // [0,'helllo', 'hi', 0,0,0],
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
      // columnSixArr,
      [0,'helllo', 'hi', 0,0,0],
      columnSevenArr
    ])
    alert('hello')
    // console.log('grid', grid)
    return ()=> console.log('unmounted')
  // }, [columnOneArr], [columnTwoArr], [columnThreeArr], [columnFourArr], [columnFiveArr], [columnSixArr], [columnSevenArr])
  }, [columnOneArr, columnTwoArr, columnThreeArr, columnFourArr, columnFiveArr, columnSixArr, columnSevenArr])

  const columnArr = [columnOneArr, columnTwoArr, columnThreeArr, columnFourArr, columnFiveArr, columnSixArr, columnSevenArr]
  const setterArr = [setColumnOneArr, setColumnTwoArr, setColumnThreeArr, setColumnFourArr, setColumnFiveArr, setColumnSixArr, setColumnSevenArr]
  // let grid = [
  //  [0,0,0,0,0,0],
  //  [0,0,0,0,0,0],
  //  [0,0,0,0,0,0],
  //  [0,0,0,0,0,0],
  //  [0,0,0,0,0,0],
  //  [0,0,0,0,0,0],
  //  [0,0,0,0,0,0],
  // ]
  

  const updateGame = (column, row) => {
    // setterArr[column - 1](columnArr[column -1][row] = 1)
    let peanut = columnArr[column]
    // console.log('column and row', peanut[row])
    // console.log('before', peanut)
    peanut[row] = 'red'
    // console.log('after', peanut)
    setterArr[column](peanut)
    // console.log(columnArr[column])
    // peanut.push('red')
    // console.log('peanut', peanut)
    // setterArr[column](peanut.concat(columnArr[column][row, columnArr[column].length]))
    // grid[column][row] = 1
    // console.log(grid)
    // setGame() 
    // result of logic
  }
  useEffect(() => {
    //check if winner
    setWinnter()
  }, [game])
  return {winner, updateGame}
}

