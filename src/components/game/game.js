import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { css } from '@emotion/core'

import { UserContext } from '../context/context'
// import { UserContextTurn } from "../context/turnContext";
import useWinDecider from '../winDecider/winDecider'

import GameColumn from '../game-column/gameColumn'

const gamePageWrapperCss = css`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  // margin: -8px;
  background-color: #5465ff;
  align-items: center;
  position: relative;

  .page-title {
    margin-top: 25px;
    font-size: 4em;
    color: #faa307;
    font-weight: 900;
    text-align: center;

    @media (max-width: 610px) {
      font-size: 3.6em;
    }
    @media (max-width: 260px) {
      font-size: 3em;
    }
  }

  .turn-name-tracker {
    position: absolute;
    top: 15px;
    right: 30px;
    font-size: 1.2em;
    font-weight: 900;
    color: #faa307;

    @media (max-width: 610px) {
      position: initial;
    }
  }

  .turn-count-tracker {
    position: absolute;
    top: 35px;
    right: 30px;
    font-size: 1.2em;
    font-weight: 900;
    color: #faa307;

    @media (max-width: 610px) {
      position: initial;
    }
  }
`

const gameColumnWrapperCss = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export default function Game(props) {
  const { player } = useContext(UserContext)
  const playerOneName = props.location.state.playerOneName
  const playerTwoName = props.location.state.playerTwoName
  const { winner, updateGame } = useWinDecider()
  const [tenthScore, setTenthScore] = useState({})
  const [automatePlayTwo, setAutomatePlayTwo] = useState(false)
  const [availableColumns, setAvailableColumns] = useState([1, 2, 3, 4, 5, 6, 7])
  const [numOfColumnsRemaining, setNumOfColumnsRemaining] = useState(7)
  const [compChoice, setCompChoice] = useState(
    availableColumns[Math.floor(Math.random() * Math.floor(numOfColumnsRemaining))]
  )

  // if boolean for winner is true, redirect to highscores page
  if (winner) {
    if (player.count <= tenthScore.highScore) {
      console.log('put me on the leaderboard!')
      props.history.push('/highscores', {
        scoreCount: player.count,
        tenthScore: tenthScore.highScore,
        onLeaderboard: true,
        playerOneName,
        playerTwoName,
      })
    } else {
      console.log('I am not good enough...')
      props.history.push('/highscores', {
        scoreCount: player.count,
        tenthScore: tenthScore.highScore,
        onLeaderboard: false,
        playerOneName,
        playerTwoName,
        hasBeenPosted: false,
      })
    }
  }

  // Adjust the number of columns remaing to the new length of the availableColumns Array minus one
  useEffect(() => {
    setNumOfColumnsRemaining(availableColumns.length - 1)
  }, [availableColumns])

  const [playerColor, setPlayerColor] = useState('#d00000')
  const [scoresArr, setScoresArr] = useState([])
  const [topTenArr, setTopTenArr] = useState([])

  // Player one is assigned red, player two to yellow - color switch on turn switch
  useEffect(() => {
    setPlayerColor(player.turn === 'Player One' ? '#d00000' : '#faa307')
  }, [player])

  // Are you playing against the computer? Set scores array to the current data from the high scores page so it can be compared to ending turn score later
  useEffect(() => {
    setAutomatePlayTwo(props.location.state.computer)
    console.log('am I playing the computer?', props.location.state.computer)
    axios
      .get(`https://jel-connect-four-scores.herokuapp.com/scores`)
      .then((response) => setScoresArr(response.data))
      .catch((err) => console.log('error', err))
  }, [])

  // if you are playing the computer and it is the computer's turn, choose a random number as the index to see which column it chooses
  useEffect(() => {
    if (automatePlayTwo && player.turn === 'Player Two') {
      setTimeout(() => {
        setCompChoice(Math.floor(Math.random() * Math.floor(numOfColumnsRemaining)) + 1)
      }, 1000)
    }
  }, [player.turn])

  useEffect(() => {
    console.log(compChoice)
  }, [compChoice])

  // Sort the scores array by highscore and return a list of the sorted top ten
  useEffect(() => {
    const tempArr = []
    scoresArr.forEach((obj) => {
      tempArr.push(obj.highScore)
    })
    tempArr.sort((a, b) => a - b)
    const tempArr2 = []
    tempArr.slice(0, 10).forEach((score) => {
      scoresArr.forEach((obj) => {
        if (obj.highScore === score) {
          tempArr2.push(obj)
        }
      })
    })
    setTopTenArr([...new Set(tempArr2)].slice(0, 10))
  }, [scoresArr])

  // grab tenth score from top ten array to be compared against the current game score
  useEffect(() => {
    setTenthScore(topTenArr[9])
  }, [topTenArr])

  return (
    <div css={gamePageWrapperCss}>
      <div className="page-title">Connect 4</div>
      <div css={gameColumnWrapperCss}>
        <GameColumn
          className="column c-one"
          player={player.turn}
          playerOneName={playerOneName}
          playerTwoName={playerTwoName}
          column={1}
          updateFunc={updateGame}
          compChoice={compChoice}
          automated={automatePlayTwo}
          remaining={availableColumns}
          setRemaining={setAvailableColumns}
        />
        <GameColumn
          className="column c-two"
          player={player.turn}
          playerOneName={playerOneName}
          playerTwoName={playerTwoName}
          column={2}
          updateFunc={updateGame}
          compChoice={compChoice}
          automated={automatePlayTwo}
          remaining={availableColumns}
          setRemaining={setAvailableColumns}
        />
        <GameColumn
          className="column c-three"
          player={player.turn}
          playerOneName={playerOneName}
          playerTwoName={playerTwoName}
          column={3}
          updateFunc={updateGame}
          compChoice={compChoice}
          automated={automatePlayTwo}
          remaining={availableColumns}
          setRemaining={setAvailableColumns}
        />
        <GameColumn
          className="column c-four"
          player={player.turn}
          playerOneName={playerOneName}
          playerTwoName={playerTwoName}
          column={4}
          updateFunc={updateGame}
          compChoice={compChoice}
          automated={automatePlayTwo}
          remaining={availableColumns}
          setRemaining={setAvailableColumns}
        />
        <GameColumn
          className="column c-five"
          player={player.turn}
          playerOneName={playerOneName}
          playerTwoName={playerTwoName}
          column={5}
          updateFunc={updateGame}
          compChoice={compChoice}
          automated={automatePlayTwo}
          remaining={availableColumns}
          setRemaining={setAvailableColumns}
        />
        <GameColumn
          className="column c-six"
          player={player.turn}
          playerOneName={playerOneName}
          playerTwoName={playerTwoName}
          column={6}
          updateFunc={updateGame}
          compChoice={compChoice}
          automated={automatePlayTwo}
          remaining={availableColumns}
          setRemaining={setAvailableColumns}
        />
        <GameColumn
          className="column c-seven"
          player={player.turn}
          playerOneName={playerOneName}
          playerTwoName={playerTwoName}
          column={7}
          updateFunc={updateGame}
          compChoice={compChoice}
          automated={automatePlayTwo}
          remaining={availableColumns}
          setRemaining={setAvailableColumns}
        />
      </div>
      <div className="turn-name-tracker">
        It is{' '}
        <span style={{ color: playerColor }}>
          {player.turn === 'Player One' ? props.location.state.playerOneName : props.location.state.playerTwoName}
          's
        </span>{' '}
        turn
      </div>
      <div className="turn-count-tracker">turns: {player.count}</div>
    </div>
  )
}
