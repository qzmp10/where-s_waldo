import { Button } from "./styled-comp"
import { useState, useRef } from 'react'
import Levelleaderboard from "./level-leaderboard";
import { useEffect } from "react";

export default function Leaderboard(props) {

    const [displayedLevel, setDisplayedLevel] = useState(1);

    useEffect(() => {
        activeLevel();
    }, [displayedLevel])

    const buttonLevel1 = useRef();
    const buttonLevel2 = useRef();
    const buttonLevel3 = useRef();

    const activeLevel = (e) => {
        if (displayedLevel == 1) {
            buttonLevel1.current.style.backgroundColor = 'rgb(255, 57, 57)'
            buttonLevel1.current.style.color = 'white';
            buttonLevel2.current.style.backgroundColor = 'rgb(255, 153, 153)'
            buttonLevel2.current.style.color = 'white';
            buttonLevel3.current.style.backgroundColor = 'rgb(255, 153, 153)'
            buttonLevel3.current.style.color = 'white';
        } else if (displayedLevel == 2) {
            buttonLevel1.current.style.backgroundColor = 'rgb(255, 153, 153)'
            buttonLevel1.current.style.color = 'white';
            buttonLevel3.current.style.backgroundColor = 'rgb(255, 153, 153)'
            buttonLevel3.current.style.color = 'white';
            buttonLevel2.current.style.backgroundColor = 'rgb(255, 57, 57)'
            buttonLevel2.current.style.color = 'white';
        } else {
            buttonLevel2.current.style.backgroundColor = 'rgb(255, 153, 153)'
            buttonLevel2.current.style.color = 'white';
            buttonLevel1.current.style.backgroundColor = 'rgb(255, 153, 153)'
            buttonLevel1.current.style.color = 'white';
            buttonLevel3.current.style.backgroundColor = 'rgb(255, 57, 57)'
            buttonLevel3.current.style.color = 'white';
            
        }
    }

    function changeLevel(level) {
        setDisplayedLevel(level);
    }

    const switchLevel = (e) => {
        changeLevel(Number(e.target.dataset.id));
    }

    return (
        <div className='leaderboardContainer'>
            <div className='leaderboardHeader'>
                <Button ref={buttonLevel1} data-id='1' className='leaderboard-level1' onClick={switchLevel}>Level 1</Button>
                <Button ref={buttonLevel2} data-id='2' className="leaderboard-level2" onClick={switchLevel}>Level 2</Button>
                <Button ref={buttonLevel3} data-id='3' className="leaderboard-level3" onClick={switchLevel}>Level 3</Button>
            </div>
            <Levelleaderboard level={displayedLevel} />
        </div>
    )
}