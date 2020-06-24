import React, { useState, useEffect } from 'react'
import { css } from '@emotion/core'

const columnWrapperCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  .square {
    width: 20px;
    height: 20px;
    padding: 2px;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;

    .circle {
      width: 15px;
      height: 15px;
      border: 2px white solid;
      border-radius: 8px;
      background-color: #5465ff;
    }

    .circleYellowActive {
      width: 15px;
      height: 15px;
      border: 2px white solid;
      border-radius: 8px;
      background-color: #faa307;
    }
    .circleRedActive {
      width: 15px;
      height: 15px;
      border: 2px white solid;
      border-radius: 8px;
      background-color: #d00000;
      // background-color: purple;
    }
  }
`

export default function HomeColumns(props) {
  const [activeClass1, setActiveClass1] = useState('circle')
  const [activeClass2, setActiveClass2] = useState('circle')
  const [activeClass3, setActiveClass3] = useState('circle')
  const [activeClass4, setActiveClass4] = useState('circle')
  const [activeClass5, setActiveClass5] = useState('circle')

  const columnArr = [setActiveClass1, setActiveClass2, setActiveClass3, setActiveClass4, setActiveClass5]

  function handlePageLoad(yellowArr, redArr) {
    yellowArr.forEach((item) => {
      columnArr[item]('circleYellowActive')
    })
    redArr.forEach((item) => {
      columnArr[item]('circleRedActive')
    })
  }

  useEffect(() => {
    handlePageLoad(props.yellowArr, props.redArr)
  }, [])

  return (
    <div css={columnWrapperCss}>
      <div className="square">
        <div className={activeClass1} />
      </div>
      <div className="square">
        <div className={activeClass2} />
      </div>
      <div className="square">
        <div className={activeClass3} />
      </div>
      <div className="square">
        <div className={activeClass4} />
      </div>
      <div className="square">
        <div className={activeClass5} />
      </div>
    </div>
  )
}
