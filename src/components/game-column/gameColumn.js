import React, { useState, useEffect, useContext } from "react";
import { css } from "@emotion/core";

import { UserContext } from "../context/context";
// import { UserContextTurn } from "../context/turnContext";

const columnWrapperCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  .squareOne {
    width: 80px;
    heigh: 80px;
    padding: 2px;
    background-color: #5465ff;
    display: flex;
    justify-content: center;
    align-items: center;

    .circleOneRed {
      width: 65px;
      height: 65px;
      // border: 2px white solid;
      border-radius: 33px;
      background-color: #5465ff;
    }
    .circleOneYellow {
      width: 65px;
      height: 65px;
      // border: 2px white solid;
      border-radius: 33px;
      background-color: #5465ff;
    }
  }

  &:hover {
    .circleOneRed {
      background-color: #d00000;
    }
    .circleOneYellow {
      background-color: #faa307;
    }
  }
  .square {
    width: 80px;
    heigh: 80px;
    padding: 2px;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;

    .circle {
      width: 65px;
      height: 65px;
      border: 2px white solid;
      border-radius: 33px;
      background-color: #5465ff;
    }
    .circleYellowActive {
      width: 65px;
      height: 65px;
      border: 2px white solid;
      border-radius: 33px;
      background-color: #faa307;
    }
    .circleRedActive {
      width: 65px;
      height: 65px;
      border: 2px white solid;
      border-radius: 33px;
      background-color: #d00000;
    }
  }
`;

export default function GameColumn(props) {
  // const { setPlayer } = useContext(UserContext);
  const { player, actions } = useContext(UserContext);
  // const { turnCount } = useContext(UserContextTurn);
  // const { setTurnCount } = useContext(UserContextTurn);
  const [clickCount, setClickCount] = useState(0);
  const [rowsRemaining, setRowsRemaining] = useState(6);
  const [circleOne, setCircleOne] = useState("circleOneRed");
  const [activeClass1, setActiveClass1] = useState("circle");
  const [activeClass2, setActiveClass2] = useState("circle");
  const [activeClass3, setActiveClass3] = useState("circle");
  const [activeClass4, setActiveClass4] = useState("circle");
  const [activeClass5, setActiveClass5] = useState("circle");
  const [activeClass6, setActiveClass6] = useState("circle");

  let columnArr = [
    setActiveClass1,
    setActiveClass2,
    setActiveClass3,
    setActiveClass4,
    setActiveClass5,
    setActiveClass6,
  ];

  // useEffect(() => {
  //   setTurn(props.player)
  // }, [])

  useEffect(() => {
    setCircleOne(
      player.turn === "Player One" ? "circleOneRed" : "circleOneYellow"
    );
  }, [player]);

  useEffect(() => {
    if (
      player.turn === "Player Two" &&
      props.column === props.compChoice &&
      props.automated === true
    ) {
      setTimeout(() => {
        clickHandler();
      }, 500);
      // setTimeout(800);
      // clickHandler();
      // console.log("My column was chosen!", props.column);
    }
  }, [player.turn]);

  function clickHandler() {
    let time = 40;
    for (let i = 0; i < rowsRemaining - 1; i++) {
      setTimeout(() => {
        columnArr[i](
          player.turn === "Player One"
            ? "circleRedActive"
            : "circleYellowActive"
        );
      }, time * i);
      setTimeout(() => {
        columnArr[i]("circle");
      }, time * i + 1);
      columnArr[i](
        player.turn === "Player One" ? "circleRedActive" : "circleYellowActive"
      );
    }
    columnArr[rowsRemaining - 1](
      player.turn === "Player One" ? "circleRedActive" : "circleYellowActive"
    );
    setRowsRemaining(rowsRemaining - 1);
    actions.setCount(player.count + 1);
    actions.setPlayer(
      player.turn === "Player One" ? "Player Two" : "Player One"
    );
    console.log(player.turn);
    setClickCount(clickCount + 1);
    // console.log("I have been clicked!", clickCount);
    props.updateFunc(
      props.column - 1,
      clickCount,
      player.turn === "Player One" ? "red" : "yellow",
      props.playerOneName,
      props.playerTwoName
    );
  }

  useEffect(() => {
    console.log("i have been clicked!", clickCount);
  }, [clickCount]);

  return (
    <div css={columnWrapperCss} onClick={clickHandler}>
      <div className='squareOne'>
        <div className={circleOne} />
      </div>
      <div className='square'>
        <div className={activeClass1} />
      </div>
      <div className='square'>
        <div className={activeClass2} />
      </div>
      <div className='square'>
        <div className={activeClass3} />
      </div>
      <div className='square'>
        <div className={activeClass4} />
      </div>
      <div className='square'>
        <div className={activeClass5} />
      </div>
      <div className='square'>
        <div className={activeClass6} />
      </div>
    </div>
  );
}
