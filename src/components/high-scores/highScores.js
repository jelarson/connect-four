import React, { useState, useEffect } from "react";
import { css } from "@emotion/core";

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

export default function HighScores(props) {
  return (
    <div css={highScorePageWrapperCss}>
      <div css={highScoreTitleCss}>Top Ten High Scores</div>
      <div css={scoreBoxCss}>
        <div css={scoreNamesCss}>
          <ol>
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
    </div>
  );
}
