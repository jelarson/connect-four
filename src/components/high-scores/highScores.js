import React, { useState, useEffect, useContext } from 'react'
import { css } from '@emotion/core'
import axios from 'axios'

import { UserContext } from '../context/context'

const highScorePageWrapperCss = css`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  // margin: -8px;
  background-color: #5465ff;
  align-items: center;
  position: relative;
`

const highScoreTitleCss = css`
  margin-top: 10px;
  font-size: 3.8em;
  color: #faa307;
  font-weight: 900;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 3.2em;
  }
  @media (max-width: 480px) {
    font-size: 2.5em;
  }
  @media (max-width: 365px) {
    font-size: 2em;
  }
  @media (max-width: 300px) {
    font-size: 1.7em;
  }
`

const scoreBoxCss = css`
  width: 72%;
  display: flex;
  background-color: grey;
  flex-direction: row;
  padding: 13px;
  align-items: center;
  justify-content: space-between;
  border: 4px solid #faa307;
  border-radius: 15px;
`

const scoreNamesCss = css`
  display: flex;
  flex-direction: column;
  font-size: 20px;

  @media (max-width: 300px) {
    font-size: 16px;
  }
`

const scoresColumnCss = css`
  display: flex;
  flex-direction: column;
  font-size: 20px;

  @media (max-width: 300px) {
    font-size: 16px;
  }
`

const highScoreMessageCss = css`
  display: flex;
  flex-direction: column;
  font-size: 25px;
  margin-top: 13px;
  color: #faa307;
  font-weight: 900;
  text-align: center;
  width: 80vw;
  @media (max-width: 600px) {
    font-size: 18px;
  }
  @media (max-width: 450px) {
    font-size: 13px;
  }
`

const playAgainButtonCss = css`
  margin-top: 34px;
  padding: 12px;
  border-radius: 10px;
  background-color: #d00000;
  font-size: 26px;
  font-weight: 900;
  color: #faa307;
  text-decoration: none;
  outline: none;
  border-style: solid;
  cursor: pointer;

  &:hover {
    background-color: #faa307;
    color: #d00000;
  }

  @media (max-width: 600px) {
    font-size: 18px;
  }
  @media (max-width: 450px) {
    font-size: 13px;
    margin-top: 15px;
  }
`
const postOptionCss = css`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
`
const optionButtonWrapperCss = css`
  display: flex;
  flex-direction: row;
  margin-left: 8px;

  button {
    cursor: pointer;
    border-radius: 3px;
    background-color: #d00000;
    font-size: 16px;
    font-weight: 900;
    color: #faa307;
    text-decoration: none;
    outline: none;
    border-style: solid;

    &:hover {
      background-color: #faa307;
      color: #d00000;
    }
  }
`
export default function HighScores(props) {
  const { player, actions } = useContext(UserContext)

  const [scoresArr, setScoresArr] = useState([])
  const [topTenArr, setTopTenArr] = useState([
    { name: 'Loading', highScore: 'Loading' },
    { name: 'Loading', highScore: 'Loading' },
    { name: 'Loading', highScore: 'Loading' },
    { name: 'Loading', highScore: 'Loading' },
    { name: 'Loading', highScore: 'Loading' },
    { name: 'Loading', highScore: 'Loading' },
    { name: 'Loading', highScore: 'Loading' },
    { name: 'Loading', highScore: 'Loading' },
    { name: 'Loading', highScore: 'Loading' },
    { name: 'Loading', highScore: 'Loading' },
  ])
  const [leaderboard, setLeaderboard] = useState(true)
  const [leaderboardOption, setLeaderboardOption] = useState(false)
  const [turns, setTurns] = useState('9')
  const [theWinner, setTheWinner] = useState('Who Won?')
  const [hasBeenPosted, setHasBeenPosted] = useState(false)

  function handleClick() {
    props.history.push('/')
  }

  useEffect(() => {
    // console.log("did I win?", player.turn);
    player.turn === 'Player One'
      ? setTheWinner(props.location.state.playerTwoName)
      : setTheWinner(props.location.state.playerOneName)
    actions.setCount(0)
    actions.setPlayer('Player One')
    // console.log("Here are your props", props.location.state);
    setTurns(props.location.state.scoreCount)

    setLeaderboard(props.location.state.onLeaderboard)
    setHasBeenPosted(props.location.state.hasBeenPosted)
    axios
      .get(`https://jel-connect-four-scores.herokuapp.com/scores`)
      .then((response) => setScoresArr(response.data))
      .catch((err) => console.log('error', err))
  }, [])

  useEffect(() => {
    if (theWinner === 'The Computer') {
      console.log('How did you lose to the computer?')
      setLeaderboard(false)
    }
  }, [theWinner])

  useEffect(() => {
    leaderboard ? setLeaderboardOption(true) : setLeaderboardOption(false)
  }, [leaderboard])

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
    // setIsLoading(false);
  }, [scoresArr])

  // useEffect(() => {
  // console.log("top ten", topTenArr);
  // }, [topTenArr]);

  function liName(num) {
    if (topTenArr.length > 0) {
      return <li> {topTenArr[num].name}</li>
    }
    return <li> Loading...</li>
  }

  function liScore(num) {
    if (topTenArr.length > 0) {
      return <div> {topTenArr[num].highScore}</div>
    }
    return <div> Loading ...</div>
  }

  function handleYes() {
    setLeaderboardOption(false)
    console.log(theWinner)
    axios
      .post(`https://jel-connect-four-scores.herokuapp.com/score`, {
        name: theWinner,
        highScore: String(turns),
      })
      .then((response) => {
        console.log('Score posted', response)
      })
      .then(
        axios
          .get(`https://jel-connect-four-scores.herokuapp.com/scores`)
          .then((response) => {
            setScoresArr(response.data)
            setHasBeenPosted(true)
            props.history.push('/highscores', {
              scoreCount: turns,
              tenthScore: 10,
              onLeaderboard: true,
              playerOneName: theWinner,
              playerTwoName: theWinner,
              hasBeenPosted: true,
            })
            window.location.reload()
          })
          .catch((err) => console.log('error', err))
      )
      .catch((err) => console.log(err))
  }
  function handleNo() {
    setLeaderboardOption(false)
  }

  // function postScore() {
  //   if (leaderboard) {
  //     return (
  //       <div>
  //         "Would You Like to post your score?"
  //         <button> Yes </button>
  //         <button> No </button>
  //       </div>
  //     );
  //   }
  // }

  return (
    <div css={highScorePageWrapperCss}>
      <div css={highScoreTitleCss}>Top Ten High Scores</div>
      <div css={scoreBoxCss}>
        <div css={scoreNamesCss}>
          <ol>
            {liName(0)}
            {liName(1)}
            {liName(2)}
            {liName(3)}
            {liName(4)}
            {liName(5)}
            {liName(6)}
            {liName(7)}
            {liName(8)}
            {liName(9)}
          </ol>
        </div>
        <div css={scoresColumnCss}>
          {liScore(0)}
          {liScore(1)}
          {liScore(2)}
          {liScore(3)}
          {liScore(4)}
          {liScore(5)}
          {liScore(6)}
          {liScore(7)}
          {liScore(8)}
          {liScore(9)}
        </div>
      </div>
      <div css={highScoreMessageCss}>
        {theWinner} won in {turns} turns.
        <br />
        {leaderboard ? 'You qualified for the leaderboard!' : 'You did not make it onto the leaderboard.'}
        <br />
        {leaderboardOption && !hasBeenPosted ? (
          <div css={postOptionCss}>
            Would you Like to post your score?
            <div css={optionButtonWrapperCss}>
              <button onClick={handleYes} type="button">
                Yes
              </button>
              <button onClick={handleNo} type="button">
                No
              </button>
            </div>
          </div>
        ) : null}
        {/* {postScore} */}
      </div>
      <button css={playAgainButtonCss} onClick={handleClick} type="button">
        Play Again?
      </button>
    </div>
  )
}
