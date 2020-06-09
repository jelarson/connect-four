import React from "react";
import { Link } from "react-router-dom";
import { css } from "@emotion/core";
// import "./home.scss";
const homeWrapperCss = css`
  width: 100vw;
  height: 100vh;
  margin: -8px;
  display: flex;
  flex-direction: column;
  /* // justify-content: center; */
  align-items: center;
  background-color: #5465ff;
`;

const homeTitleCss = css`
margin-top: 25px;
font-size: 4em;
color: #faa307;
font-weight: 900;
text-align: center;
span {
  color: #d00000;
}
`;

const homeButtonChoiceWrapper = css`
margin-top: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .home-button-message {
      text-align: center;
      font-size: 2.4em;
      color: #faa307;
    }
    .home-button-wrapper {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-around;

      .home-button {
        margin-top: 34px;
        padding: 12px;
        border-radius: 10px;
        background-color: #d00000;
        font-size: 26px;
        font-weight: 900;
        color: #faa307;
        text-decoration: none;

        &:hover {
          background-color: #faa307;
          color: #d00000;
        }
      }
    }
`;

export default function Home() {
  return (
    <div css={homeWrapperCss}>
      <div css={homeTitleCss}>
        Can you <br />
        <span>CONNECT FOUR</span>?
      </div>
      <div css={homeButtonChoiceWrapper}>
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
