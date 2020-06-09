import React, {useState, useEffect} from "react";

export default function useWinDecider(props) {
  const [game, setGame] = useState([])
  const [winner, setWinnter] = useState(false)
  const updateGame = (column, row) => {
    //logic
    setGame() // result of logic
  }
  useEffect(() => {
    //check if winner
    setWinnter()
  }, [game])
  return {winner, updateGame}
}

