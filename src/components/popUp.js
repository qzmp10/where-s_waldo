
import { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

export default function Pop(props) {

    return (
        <div className='popUp' style={{top: `${props.y}px`, left: `${props.x}px`}}>
            {props.characters.map(char => {
                return (
                    <div key={Math.random()}  style={{height: `${100 / props.characters.length}%` }} 
                    onMouseOver={(e) => {
                        e.target.style.backgroundColor = 'rgb(255, 10, 10)'
                    }}
                     onMouseOut={(e) => {
                        e.target.style.backgroundColor = ''
                     }}
                     onClick={() => {
                        props.callback(false);
                     }}>{char}</div>
                )
            })}
        </div>
    )
}