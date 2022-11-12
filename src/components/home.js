import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Button } from './styled-comp'

export default function Home(props) {

    useEffect(() => {
        props.setLevel(true, false, false, false);
    }, [])

    return (
        <div className='homeContainer'>
            <Link to='/level1'>
                <Button>
                    Play >
                </Button>
            </Link>
            <div className='leaderboard'></div>
        </div>
    )
}