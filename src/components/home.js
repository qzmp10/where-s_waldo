import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Button } from './styled-comp'

export default function Home(props) {
    const click = () => {
        props.nextLevel();
    }
    return (
        <div className='homeContainer'>
            <Link to='/level1'>
                <Button onClick={click}>
                    Play
                </Button>
            </Link>
        </div>
    )
}