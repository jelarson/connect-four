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

export default function HighScores(props) {
  return (
    <div css={highScorePageWrapperCss}>
      <div css={highScoreTitleCss}>Top Ten High Scores</div>
    </div>
  );
}
