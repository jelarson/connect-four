import React, {useState, useEffect} from "react";
import { css } from "@emotion/core";

import useWinDecider from '../winDecider/winDecider'

import GameColumn from '../game-column/gameColumn'

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

export default function Game() {
  const [player, setPlayer] = useState('Player One')
  const [playerColor, setPlayerColor] = useState('#d00000')

  useEffect(() => {
    setPlayerColor(player === 'Player One' ? '#d00000' : '#faa307')
  }, [player])

  // function clickHandler () {
  //   if (player === 'Player One'){
  //     setPlayer('Player Two')
  //     setPlayerColor('#faa307')
  //   } else {
  //     setPlayer('Player One')
  //     setPlayerColor('#d00000')
  //   }
  //   console.log(player)
  // }
return (
  <div css ={gamePageWrapperCss}>
    <div className='page-title'>
      Connect 4
    </div>
    <div css ={gameColumnWrapperCss}>
      <GameColumn className='column c-one' playerColor={playerColor} column={1} setPlayer={setPlayer}/>
      <GameColumn className='column c-two' playerColor={playerColor} column={2} setPlayer={setPlayer}/>
      <GameColumn className='column c-three' playerColor={playerColor} column={3} setPlayer={setPlayer}/>
      <GameColumn className='column c-four' playerColor={playerColor} column={4} setPlayer={setPlayer}/>
      <GameColumn className='column c-five' playerColor={playerColor} column={5} setPlayer={setPlayer}/>
      <GameColumn className='column c-six' playerColor={playerColor} column={6} setPlayer={setPlayer}/>
      <GameColumn className='column c-seven' playerColor={playerColor} column={7} setPlayer={setPlayer}/>
    </div>
    <div className='turn-tracker'>
It is <span style={{color: playerColor}}>{player}'s</span> turn
    </div>
    {/* <button onClick={clickHandler}>click me</button> */}
  </div>
)
}
