import React, { useState, useEffect, useContext } from "react";
import { css } from "@emotion/core";

import { UserContext } from "../context/context";
import useWinDecider from "../winDecider/winDecider";

import GameColumn from "../game-column/gameColumn";

const gamePageWrapperCss = css`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  margin: -8px;
  background-color: #5465ff;
  align-items: center;
  position: relative;

  .page-title {
    margin-top: 25px;
    font-size: 4em;
    color: #faa307;
    font-weight: 900;
    text-align: center;
  }

  .turn-tracker {
    position: absolute;
    top: 15px;
    right: 30px;
    font-size: 1.2em;
    font-weight: 900;
    color: #faa307;
  }
`;

const gameColumnWrapperCss = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export default function Game(props) {
  console.log(props.location.state);
  const { setPlayer } = useContext(UserContext);
  const { player } = useContext(UserContext);
  const playerOneName = props.location.state.playerOneName;
  const playerTwoName = props.location.state.playerTwoName;
  const { winner, updateGame } = useWinDecider();
  if (winner) {
    props.history.push("/");
  }
  console.log(winner);

  // setPlayer(playerOneName);
  const [playerColor, setPlayerColor] = useState("#d00000");

  useEffect(() => {
    setPlayerColor(player.turn === "Player One" ? "#d00000" : "#faa307");
  }, [player]);

  return (
    <div css={gamePageWrapperCss}>
      <div className='page-title'>Connect 4</div>
      <div css={gameColumnWrapperCss}>
        <GameColumn
          className='column c-one'
          player={player.turn}
          playerOneName={playerOneName}
          playerTwoName={playerTwoName}
          column={1}
          updateFunc={updateGame}
        />
        <GameColumn
          className='column c-two'
          player={player.turn}
          playerOneName={playerOneName}
          playerTwoName={playerTwoName}
          column={2}
          updateFunc={updateGame}
        />
        <GameColumn
          className='column c-three'
          player={player.turn}
          playerOneName={playerOneName}
          playerTwoName={playerTwoName}
          column={3}
          updateFunc={updateGame}
        />
        <GameColumn
          className='column c-four'
          player={player.turn}
          playerOneName={playerOneName}
          playerTwoName={playerTwoName}
          column={4}
          updateFunc={updateGame}
        />
        <GameColumn
          className='column c-five'
          player={player.turn}
          playerOneName={playerOneName}
          playerTwoName={playerTwoName}
          column={5}
          updateFunc={updateGame}
        />
        <GameColumn
          className='column c-six'
          player={player.turn}
          playerOneName={playerOneName}
          playerTwoName={playerTwoName}
          column={6}
          updateFunc={updateGame}
        />
        <GameColumn
          className='column c-seven'
          player={player.turn}
          playerOneName={playerOneName}
          playerTwoName={playerTwoName}
          column={7}
          updateFunc={updateGame}
        />
      </div>
      <div className='turn-tracker'>
        It is{" "}
        <span style={{ color: playerColor }}>
          {player.turn === "Player One"
            ? props.location.state.playerOneName
            : props.location.state.playerTwoName}
          's
        </span>{" "}
        turn
      </div>
    </div>
  );
}
