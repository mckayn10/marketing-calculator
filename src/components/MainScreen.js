import React, { useState, useEffect } from 'react'
import logo from '../assets/foreup-logo-1color-web-sml.png'
import './mainScreen.css'
import { AiOutlineCaretDown } from "react-icons/ai";
import { AiOutlineCaretUp } from "react-icons/ai";

const MainScreen = () => {
    const [numTeeTimes, setNumTeeTimes] = useState('')
    const [numTrades, setNumTrades] = useState('')
    const [costOfRound, setCostOfRound] = useState('')
    const [showArrows, setShowArrows] = useState(false)
    const [showError, setShowError] = useState(false)
    const [errorText, setErrorText] = useState('')

    const [couldLose, setCouldLose] = useState('')
    const [atLeastLose, setAtLeastLose] = useState('')
    const [avgForeupCost, setAvgForeupCost] = useState(7208)
    const [couldGain, setCouldGain] = useState('')
    const [atLeastGain, setAtLeastGain] = useState('')

    const handleClear = () => {
        setNumTeeTimes('')
        setNumTrades('')
        setCostOfRound('')
        setCouldLose('')
        setAtLeastLose('')
        setCouldGain('')
        setAtLeastGain('')
        setShowError(false)
        setShowArrows(false)
    }

    const handleCalculate = () => {

        if (!numTeeTimes || !numTrades || !costOfRound) {
            setShowError(true)
            setErrorText('*Please enter valid numbers')
            return false
        }

        setShowError(false)

        setCouldLose(couldBeLosing())
        setAtLeastLose(atLeastLosing())
        setCouldGain(calcCouldGain())
        setAtLeastGain(calcAtLeastGain())
        setShowArrows(true)
        

    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const couldBeLosing = () => {
        return numberWithCommas(Math.round(costOfRound * (numTrades * 365)))
    }

    const atLeastLosing = () => {
        let tradesBooked = .45
        return numberWithCommas(Math.round(((numTrades * 365) * tradesBooked) * costOfRound))
    }

    const calcCouldGain = () => {
        let maxRevLost = costOfRound * (numTrades * 365)
        return numberWithCommas(Math.round(maxRevLost - avgForeupCost))
    }

    const calcAtLeastGain = () => {
        let tradesBooked = .45
        let avgRevLost = ((numTrades * 365) * tradesBooked) * costOfRound
        return numberWithCommas(Math.round(avgRevLost - avgForeupCost))
    }




    return (
        <div className='screen-container'>
            <div className='top-container'>
                <div className='logo-container'>
                    <img className="logo" src={logo} alt="foreUP logo" />
                </div>
                <div className="title">What is GolfNow costing you?</div>
                {showError
                    ? <div style={{color: 'rgb(224, 34, 34)', fontSize: '18px', fontWeight: 'bold', }}>{errorText}</div>
                    : <div style={{color: 'transparent', fontSize: '18px', fontWeight: 'bold', }}>{errorText}</div>
                }
                <div className="inputs-container">
                    <input className='input' placeholder="How many tee times do you offer per day?" onChange={(e) => setNumTeeTimes(e.target.value)} value={numTeeTimes} />
                    <input className='input' placeholder={'How many GolfNow Trades? (players per day)'} onChange={(e) => setNumTrades(e.target.value)} value={numTrades} />
                    <input className='input' placeholder="What does a round of Golf cost at your course?" onChange={(e) => setCostOfRound(e.target.value)} value={costOfRound} />

                </div>
                <div className="btn-container">
                    <div></div>
                    <div>
                        <button className="clear-btn btn" onClick={() => handleClear()}>Clear</button>
                        <button className="calc-btn btn" onClick={() => handleCalculate()}>Calculate</button>
                    </div>
                </div>
            </div>
            <div className='bottom-container'>
                <div className='bottom-content-container'>
                    <div className="reality-check-container">
                        <div className='rc-title'>Reality Check</div>
                        <div className='rc-description'>When using GolfNow</div>
                        <div className='losing-text rc-input-title'>You could be losing</div>
                        <div className='cost-input-container'>
                            <input
                                className="cost-input"
                                disabled={true}
                                value={'$' + couldLose}
                            />
                            <div className='losing-text'>/year</div>
                            {showArrows
                                ? <AiOutlineCaretDown className='arrow-down' />
                                : null
                            }
                        </div>
                        <div className='losing-text rc-input-title'>You are at least losing</div>
                        <div className='cost-input-container'>
                            <input
                                className="cost-input"
                                disabled={true}
                                value={'$' + atLeastLose}
                            />
                            <div className='losing-text rc-input-title'>/year</div>
                            {showArrows
                                ? <AiOutlineCaretDown className='arrow-down' />
                                : null
                            }
                        </div>
                    </div>
                    <div className='or'>OR</div>
                    <div className="foreup-costs-container">
                        <div className="fc-description .avg-fc-text">Avg <img className='inline-logo' src={logo} /> cost per year</div>
                        <input
                            className="cost-input avg-fc-input fc-input"
                            disabled={true}
                            value={'$' + numberWithCommas(Math.round(avgForeupCost))}
                        />
                        <div className='losing-text rc-input-title'>You could gain</div>
                        <div className='cost-input-container'>
                            <input
                                className="cost-input fc-input"
                                disabled={true}
                                value={'$' + couldGain}
                            />
                            <div className='losing-text'>/year</div>
                            {showArrows
                                ? <AiOutlineCaretUp className='arrow-up' />
                                : null
                            }

                        </div>
                        <div className='losing-text rc-input-title'>You would at least gain</div>
                        <div className='cost-input-container'>
                            <input
                                className="cost-input fc-input"
                                disabled={true}
                                value={'$' + atLeastGain}
                            />
                            <div className='losing-text'>/year</div>
                            {showArrows
                                ? <AiOutlineCaretUp className='arrow-up' />
                                : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainScreen