import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Button } from './styled-comp'

export default function Home(props) {

    useEffect(() => {
        props.setLevel(true, false, false, false);
    }, [])

    return (
        <div className='homeContainer'>
            <div className='play'>
                <span> Play Where's Waldo Online</span>
                <Link to='/level1'>
                    <Button>
                    Play >
                    </Button>
                </Link>
            </div>

            <div className='leaderboard'>
                <span>
                    View the Where's Waldo Hall of Fame
                </span>
                <Button>
                    Leaderboard >
                </Button>
            </div>
        </div>
    )
}