import React, { useState } from "react";
import axios from "axios";
import { css } from "@emotion/core";

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
  }
`;

const homeButton = css`
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

const twoPlayerGame = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const twoPlayerGameInputWrapper = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;
const inputBox = css`
  font-size: 22px;
  border-radius: 15px;
  outline: none;
  margin-top: 25px;
  border: none;
`;

export default function Home(props) {
  const [onePlayVis, setOnePlayVis] = useState("none");
  const [twoPlayVis, setTwoPlayVis] = useState("none");
  const [playOneName, setPlayOneName] = useState("");
  const [playTwoName, setPlayTwoName] = useState("");
  const [gamepath, setGamePath] = useState("/");

  axios
    .post("https://jel-connect-four-scores.herokuapp.com/wakeup", {})
    .then((response) => console.log("Are you awake yet?      ", response.data));

  function handleOnePlayButton() {
    setPlayTwoName("The Computer");
    setPlayOneName("");
    setTwoPlayVis("none");
    setOnePlayVis("flex");
  }
  function handleTwoPlayButton() {
    setPlayOneName("");
    setPlayTwoName("");
    setOnePlayVis("none");
    setTwoPlayVis("flex");
  }

  function linkClick() {
    if (playOneName !== "" && playTwoName !== "") {
      props.history.push("/game", {
        playerOneName: playOneName,
        playerTwoName: playTwoName,
      });
    } else {
      alert("Please fill in all required fields");
    }
  }

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
          <button css={homeButton} onClick={handleTwoPlayButton}>
            Another Player
          </button>
          <button css={homeButton} onClick={handleOnePlayButton}>
            The Computer
          </button>
        </div>
        <div css={twoPlayerGame} style={{ display: `${twoPlayVis}` }}>
          <div css={twoPlayerGameInputWrapper}>
            <form>
              <input
                css={inputBox}
                placeholder=" Player One's Name"
                value={playOneName}
                onChange={({ target }) => {
                  setPlayOneName(target.value);
                }}
              ></input>
            </form>
            <form>
              <input
                css={inputBox}
                placeholder=" Player Two's Name"
                value={playTwoName}
                onChange={({ target }) => {
                  setPlayTwoName(target.value);
                }}
              ></input>
            </form>
          </div>
          <button
            onClick={linkClick}
            css={homeButton}
            style={{ borderStyle: "none" }}
          >
            Start Game
          </button>
        </div>
        <div css={twoPlayerGame} style={{ display: `${onePlayVis}` }}>
          <form>
            <input
              css={inputBox}
              placeholder=' Your Name'
              value={playOneName}
              onChange={({ target }) => {
                setPlayOneName(target.value);
              }}
            ></input>
          </form>
          <button
            onClick={linkClick}
            css={homeButton}
            style={{ borderStyle: "none" }}
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
}
