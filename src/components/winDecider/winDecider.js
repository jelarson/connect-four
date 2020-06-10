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

    console.log('in function col', grid[nut[0] - 1])
    let arr = []
    grid.forEach(colArr => {
      arr.push(colArr[nut[1] -1])
    })
    console.log('in function row', arr)
    // console.log('in function', nut)
  }
  // useEffect(() => {
  //   check if winner
  //   setWinnter()
  // }, [game])
  return {winner, updateGame}
}

