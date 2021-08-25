import React, { useState, useEffect } from 'react'
import logo from '../assets/foreup-logo-1color-web-sml.png'
import './mainScreen.css'

const MainScreen = () => {
    return (
        <div className='screen-container'>
            <div className='top-container'>
                <div className='logo-container'>
                    <img className="logo" src={logo} alt="foreUP logo" />
                </div>
                <div className="title">What is GolfNow costing you?</div>
                <div className="inputs-container">
                    <input className='input' placeholder="How many tee times do you offer per day?" />
                    <input className='input' placeholder={'How many GolfNow Trades?'} />
                    <input className='input' placeholder="What does a round of Golf cost at your course?" />
                </div>
                <div className="btn-container">
                    <div></div>
                    <div>
                        <button className="clear-btn btn">Clear</button>
                        <button className="calc-btn btn">Calculate</button>
                    </div>
                </div>
            </div>
            <div className='bottom-container'>
                <div>bottom container</div>
            </div>
        </div>
    )
}

export default MainScreen