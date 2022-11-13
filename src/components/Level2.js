import { useState, useRef, useEffect } from 'react'
import { Character, Button } from './styled-comp';
import { Link } from 'react-router-dom';
import {
    doc, updateDoc, getDoc,
} from "firebase/firestore";
import { db } from '../firebase.config';
import level2 from '../level2.jpg'
import Pop from './popUp';
import TimePop from './finishLevel';

export default function Level2(props) {
    const [popUpState, setPopUpState] = useState(false);
    const [coordinates, setCoordinates] = useState([]);
    const [positionArray, setPositionArray] = useState([]);
    const [clickPos, setClickPos] = useState('');
    const [levelFinished, setLevelFinished] = useState(false);

    const waldoImg = useRef();
    const waldoRef = useRef();

    const userTime = useRef(0);
    const count = useRef(0);

    useEffect(() => {
        props.setLevel(false, false, true, false);
        
        let timer = window.setInterval(() => {
            if (count.current === 3) {
                window.clearInterval(timer);
                console.log('cleared', userTime.current, 'seconds');
                setLevelFinished(true);
            }
            userTime.current = userTime.current + 1;
        }, 1000);

        return () => {
            window.clearInterval(timer);
        }
    }, [])

    useEffect(() => {
        props.getCharacters();
        getAllPositions();
    }, [props.currentLevel])

    function sendDataToFirebase() {
        if (count === 0) {
            const waldoPos = waldoRef.current.offsetLeft
            setPosWaldo(waldoPos);
            console.log('data sent to firebase')
        } else {
            return;
        }
    }


    const clicky = (e) => {
        console.log(e.target.offsetLeft);
        // if (positionArray.includes(e.target.offsetLeft) && e.target.offsetLeft === positionArray[0]) {

        //     setClickPos(e.target.offsetLeft);
        // } else {
        //     setClickPos('');
        // }
        setCoordinates([e.pageX, e.pageY]);
        setPopUpState(true);

    }

    const callback = (popState, selection) => {
        setPopUpState(popState);
        if (selection === 'waldo') {
            waldoImg.current.style.opacity = '0.3';
            count.current = count.current + 1;
        } else {
            return;
        }
    }

    const secondCallback = () => {
        setLevelFinished(false);
    }


    async function setPosWaldo(position) {
        const ref = doc(db, 'waldoData', 'level2');

        await updateDoc(ref, {
            waldo: position,
        })
    }

    async function getAllPositions() {
        const ref = doc(db, 'waldoData', 'level2');
        const refSnap = await getDoc(ref);
        const array = [refSnap.data()['waldo']]
        setPositionArray(array);
    }



    return (
        <>
            <div className='timePopContainer'>
                <div className='levelContainer'>
                    <div className='levelHeader'>
                        <div className='levelAndCharacters'>
                            <div className='currentLevel'>Waldo's Plaza</div>
                            <div className='headerCharacters'>
                                <Character ref={waldoImg} className='waldo' alt='odlaw'
                                    src='https://www.giantbomb.com/a/uploads/scale_small/0/5973/545186-waldo2.jpg' />
                            </div>
                        </div>
                        <Link to='/level2'>
                            <Button>
                           Next Level >
                            </Button>
                        </Link>

                    </div>
                    <div className='waldoMap' onClick={clicky} onMouseOver={() => {
                        sendDataToFirebase();
                    }}>
                        <img src={level2} alt='waldo-wallpaper' />
                        <div ref={waldoRef} className='hitSquare1-lvl2'></div>
                    </div>
                </div>
                {levelFinished === true ? (
                    <TimePop userTime={userTime.current} callback={secondCallback} />

                ) : (
                    <div></div>
                )}
            </div>
            {
                popUpState === true ? (
                    <Pop characters={props.characters} x={coordinates[0]} y={coordinates[1]}
                        callback={callback} clickPos={clickPos} positionArray={positionArray} />
                ) : (
                    <div></div>
                )
            }

        </>

    )
}