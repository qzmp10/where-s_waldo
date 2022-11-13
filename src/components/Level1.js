import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import waldo1 from '../waldo1.jpg'
import { Button, Character } from './styled-comp'
import {
    doc, updateDoc, getDoc,
} from "firebase/firestore";
import { db } from '../firebase.config'
import Pop from './popUp'
import TimePop from './finishLevel'

export default function Level1(props) {


    const [popUpState, setPopUpState] = useState(false);
    const [coordinates, setCoordinates] = useState([]);
    const [positionArray, setPositionArray] = useState([]);
    const [clickPos, setClickPos] = useState('');
    const [levelFinished, setLevelFinished] = useState(false);

    const odlawRef = useRef();
    const waldoRef = useRef();
    const wizardRef = useRef();

    const odlawImg = useRef();
    const waldoImg = useRef();
    const wizardImg = useRef();

    const userTime = useRef(0);
    const count = useRef(0);


    useEffect(() => {
        props.setLevel(false, true, false, false);
        
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
            const odlawPos = odlawRef.current.offsetLeft
            const waldoPos = waldoRef.current.offsetLeft
            const wizardPos = wizardRef.current.offsetLeft
            setPosOdlaw(odlawPos);
            setPosWaldo(waldoPos);
            setPosWizard(wizardPos);
            console.log('data sent to firebase')
        } else {
            return;
        }
    }

    const clicky = (e) => {
        if (positionArray.includes(e.target.offsetLeft) && e.target.offsetLeft === positionArray[0]) {
            setClickPos(e.target.offsetLeft);
        } else if (positionArray.includes(e.target.offsetLeft) && e.target.offsetLeft === positionArray[1]) {
            setClickPos(e.target.offsetLeft);
        } else if (positionArray.includes(e.target.offsetLeft) && e.target.offsetLeft === positionArray[2]) {
            setClickPos(e.target.offsetLeft);
        } else {
            setClickPos('');
        }
        setCoordinates([e.pageX, e.pageY]);
        setPopUpState(true);

    }

    const callback = (popState, selection) => {
        setPopUpState(popState);
        if (selection === 'odlaw') {
            odlawImg.current.style.opacity = '0.3';
            count.current = count.current + 1;
        }
        if (selection === 'waldo') {
            waldoImg.current.style.opacity = '0.3';
            count.current = count.current + 1;
        }
        if (selection === 'wizard') {
            wizardImg.current.style.opacity = '0.3';
            count.current = count.current + 1;
        } else {
            return;
        }
    }

    const secondCallback = () => {
        setLevelFinished(false);
    }

    async function setPosOdlaw(position) {
        const ref = doc(db, 'waldoData', 'level1');

        await updateDoc(ref, {
            odlaw: position,
        })
    }

    async function setPosWaldo(position) {
        const ref = doc(db, 'waldoData', 'level1');

        await updateDoc(ref, {
            waldo: position,
        })
    }

    async function setPosWizard(position) {
        const ref = doc(db, 'waldoData', 'level1');

        await updateDoc(ref, {
            wizard: position,
        })
    }

    async function getAllPositions() {
        const ref = doc(db, 'waldoData', 'level1');
        const refSnap = await getDoc(ref);
        const array = [refSnap.data()['odlaw'], refSnap.data()['waldo'], refSnap.data()['wizard']]
        console.log('getAllPositions() fired', array)
        setPositionArray(array);
    }


    return (
        <>
            <div className='timePopContainer'>
                <div className='levelContainer'>
                    <div className='levelHeader'>
                        <div className='levelAndCharacters'>
                            <div className='currentLevel'>Waldo's Beach</div>
                            <div className='headerCharacters'>
                                <Character ref={odlawImg} className='odlaw' alt='odlaw'
                                    src='https://www.giantbomb.com/a/uploads/scale_small/4/46311/1333591-200px_character.odlaw.jpg' />
                                <Character ref={waldoImg} className='waldo' alt='odlaw'
                                    src='https://www.giantbomb.com/a/uploads/scale_small/0/5973/545186-waldo2.jpg' />
                                <Character ref={wizardImg} className='wizard' alt='odlaw'
                                    src='https://www.giantbomb.com/a/uploads/scale_small/4/46311/1341868-wizard.gif' />
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
                        <img src={waldo1} alt='waldo-wallpaper' />
                        <div ref={odlawRef} className='hitSquare1'></div>
                        <div ref={waldoRef} className='hitSquare2'></div>
                        <div ref={wizardRef} className='hitSquare3'></div>
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