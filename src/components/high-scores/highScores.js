import React, { useState, useEffect, useContext } from "react";
import { css } from "@emotion/core";
import axios from "axios";

import { UserContext } from "../context/context";

const highScorePageWrapperCss = css`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  margin: -8px;
  background-color: #5465ff;
  align-items: center;
  position: relative;
`;

const highScoreTitleCss = css`
  margin-top: 25px;
  font-size: 4em;
  color: #faa307;
  font-weight: 900;
  text-align: center;
`;

const scoreBoxCss = css`
  width: 75%;
  display: flex;
  background-color: grey;
  flex-direction: row;
  padding: 15px;
  align-items: center;
  justify-content: space-between;
  border: 4px solid #faa307;
  border-radius: 15px;
`;

const scoreNamesCss = css`
  display: flex;
  flex-direction: column;
  font-size: 22px;
`;

const scoresColumnCss = css`
  display: flex;
  flex-direction: column;
  font-size: 22px;
`;

const highScoreMessageCss = css`
  display: flex;
  font-size: 28px;
  margin-top: 15px;
  color: #faa307;
  font-weight: 900;
  text-align: center;
`;

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

  &:hover {
    background-color: #faa307;
    color: #d00000;
  }
`;

export default function HighScores(props) {
  const { player, actions } = useContext(UserContext);

  const [scoresArr, setScoresArr] = useState([]);
  const [topTenArr, setTopTenArr] = useState([
    { name: "Loading", highScore: "Loading" },
    { name: "Loading", highScore: "Loading" },
    { name: "Loading", highScore: "Loading" },
    { name: "Loading", highScore: "Loading" },
    { name: "Loading", highScore: "Loading" },
    { name: "Loading", highScore: "Loading" },
    { name: "Loading", highScore: "Loading" },
    { name: "Loading", highScore: "Loading" },
    { name: "Loading", highScore: "Loading" },
    { name: "Loading", highScore: "Loading" },
  ]);
  const [leaderboard, setLeaderboard] = useState(true);
  const [turns, setTurns] = useState("9");

  function handleClick() {
    props.history.push("/");
  }

  useEffect(() => {
    actions.setCount(0);
    actions.setPlayer("Player One");
    axios
      .get(`https://jel-connect-four-scores.herokuapp.com/scores`)
      .then((response) => setScoresArr(response.data))
      .catch((err) => console.log("error", err));
  }, []);

  useEffect(() => {
    let tempArr = [];
    scoresArr.forEach((obj) => {
      tempArr.push(obj.highScore);
    });
    tempArr.sort((a, b) => a - b);
    let tempArr2 = [];
    tempArr.slice(0, 10).forEach((score) => {
      scoresArr.forEach((obj) => {
        if (obj.highScore === score) {
          tempArr2.push(obj);
        }
      });
    });
    setTopTenArr([...new Set(tempArr2)].slice(0, 10));
    // setIsLoading(false);
  }, [scoresArr]);

  // useEffect(() => {
  // console.log("top ten", topTenArr);
  // }, [topTenArr]);

  function liName(num) {
    if (topTenArr.length > 0) {
      return <li> {topTenArr[num].name}</li>;
    } else {
      return <li> Loading...</li>;
    }
  }

  function liScore(num) {
    if (topTenArr.length > 0) {
      return <div> {topTenArr[num].highScore}</div>;
    } else {
      return <div> Loading ...</div>;
    }
  }

  return (
    <div css={highScorePageWrapperCss}>
      <div css={highScoreTitleCss}>Top Ten High Scores</div>
      <div css={scoreBoxCss}>
        <div css={scoreNamesCss}>
          <ol>
            {/* <li>{topTenArr[0].name}</li> */}
            {/* <li>Name: {topTenArr[0].highScore}</li> */}
            {/* <li>Name: placeholder</li> */}
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
        {leaderboard
          ? "You made it onto the Leaderboard!"
          : "You did not make it onto the leaderboard"}
        <br />
        You won in {turns} turns.
      </div>
      <button css={playAgainButtonCss} onClick={handleClick}>
        Play Again?
      </button>
    </div>
  );
}
