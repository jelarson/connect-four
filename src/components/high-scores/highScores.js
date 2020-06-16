import React, { useState, useEffect } from "react";
import { css } from "@emotion/core";
import axios from "axios";

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
  const [scoresArr, setScoresArr] = useState([]);
  const [topTenArr, setTopTenArr] = useState([]);

  function handleClick() {
    props.history.push("/");
  }

  useEffect(() => {
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
  }, [scoresArr]);

  useEffect(() => {
    console.log("top ten", topTenArr);
  }, [topTenArr]);

  return (
    <div css={highScorePageWrapperCss}>
      <div css={highScoreTitleCss}>Top Ten High Scores</div>
      <div css={scoreBoxCss}>
        <div css={scoreNamesCss}>
          <ol>
            {/* <li>{topTenArr[0].name}</li> */}
            <li>Name: placeholder</li>
            <li>Name: placeholder</li>
            <li>Name: placeholder</li>
            <li>Name: placeholder</li>
            <li>Name: placeholder</li>
            <li>Name: placeholder</li>
            <li>Name: placeholder</li>
            <li>Name: placeholder</li>
            <li>Name: placeholder</li>
            <li>Name: placeholder</li>
          </ol>
        </div>
        <div css={scoresColumnCss}>
          <div>placeholder</div>
          <div>placeholder</div>
          <div>placeholder</div>
          <div>placeholder</div>
          <div>placeholder</div>
          <div>placeholder</div>
          <div>placeholder</div>
          <div>placeholder</div>
          <div>placeholder</div>
          <div>placeholder</div>
        </div>
      </div>
      <div css={highScoreMessageCss}>
        You did/did not make it on the leaderboard
      </div>
      <button css={playAgainButtonCss} onClick={handleClick}>
        Play Again?
      </button>
    </div>
  );
}
