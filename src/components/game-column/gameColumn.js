import React, {useState, useEffect} from "react";
import { css } from "@emotion/core";

import useWinDecider from '../winDecider/winDecider'

const columnWrapperCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  .squareOne{
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
    background-color: #d00000
  }
    .circleOneYellow {
      background-color: #faa307
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
  
  const [turn, setTurn] = useState(props.playerColor)
  const [clickCount, setClickCount] = useState(0)
  const [rowsRemaining, setRowsRemaining] = useState(6)
  const [circleOne, setCircleOne] = useState('circleOneRed')
  const [activeClass1, setActiveClass1] = useState('circle')
  const [activeClass2, setActiveClass2] = useState('circle')
  const [activeClass3, setActiveClass3] = useState('circle')
  const [activeClass4, setActiveClass4] = useState('circle')
  const [activeClass5, setActiveClass5] = useState('circle')
  const [activeClass6, setActiveClass6] = useState('circle')

  let columnArr = [setActiveClass1, setActiveClass2, setActiveClass3, setActiveClass4, setActiveClass5, setActiveClass6]

  useEffect(()=>{
    setCircleOne(turn === '#d00000' ? 'circleOneRed' : 'circleOneYellow')
  }, [turn])

  function clickHandler () {
      let time = 40
      for(let i = 0; i < rowsRemaining - 1; i++){
        setTimeout(() => {
          columnArr[i](turn === '#d00000' ? 'circleRedActive' : 'circleYellowActive')
        }, time * i)
        setTimeout(() => {
          columnArr[i]('circle')
        }, time * i+1)
          columnArr[i](turn === '#d00000' ? 'circleRedActive' : 'circleYellowActive')
      }
      columnArr[rowsRemaining - 1](turn === '#d00000' ? 'circleRedActive' : 'circleYellowActive')
      setRowsRemaining(rowsRemaining - 1)
      props.setPlayer(turn === '#d00000' ? 'Player Two' : 'Player One')
      setTurn(props.playerColor)
    setClickCount(clickCount + 1)
    console.log('click', clickCount)
    console.log(props.column)
  }

return (
  <div css = {columnWrapperCss} onClick={clickHandler}>
    <div className='squareOne'>
      <div className={circleOne}/>
    </div>
    <div className='square'>
      <div className={activeClass1}/>
    </div>
    <div className='square'>
    <div className={activeClass2}/>
    </div>
    <div className='square'>
    <div className={activeClass3}/>
    </div>
    <div className='square'>
    <div className={activeClass4}/>
    </div>
    <div className='square'>
    <div className={activeClass5}/>
    </div>
    <div className='square'>
    <div className={activeClass6}/>
    </div>
  </div>
)
}