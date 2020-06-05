import React from "react";
import { Link } from "react-router-dom";
import { css } from "@emotion/core";
// import "./home.scss";
const homeWrapperCss = css`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  /* // justify-content: center; */
  align-items: center;
  background-color: #5465ff;
`;

export default function Home() {
  return (
    <div css={homeWrapperCss}>
      <div className='home-title'>
        Can you <br />
        <span>CONNECT FOUR</span>?
      </div>
      <div className='home-button-choice-wrapper'>
        <div className='home-button-message'>
          Who would you like to play against?
        </div>
        <div className='home-button-wrapper'>
          <Link to='/game' className='home-button'>
            Another Player
          </Link>
          <Link to='/game' className='home-button'>
            The Computer
          </Link>
        </div>
      </div>
    </div>
  );
}
