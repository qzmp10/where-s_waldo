import { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import waldo1 from '../waldo1.jpg'
import { Button, Character } from './styled-comp'
import {
    collection, getDocs, doc, setDoc, Timestamp, updateDoc, serverTimestamp,
    arrayUnion, arrayRemove, increment, deleteDoc, deleteField,
    getDoc, getDocFromCache, where, query, onSnapshot, orderBy, limit, addDoc
} from "firebase/firestore";
import { db } from '../firebase.config'
import Pop from './popUp'

export default function Level1(props) {


    const [popUpState, setPopUpState] = useState(false);
    const [coordinates, setCoordinates] = useState([]);
    const [count, setCount] = useState(0);

    const odlawRef = useRef();
    const waldoRef = useRef();
    const wizardRef = useRef();

    function sendData() {
        if(count === 0) {
            const odlawPos = odlawRef.current.offsetLeft
            const waldoPos = waldoRef.current.offsetLeft
            const wizardPos = wizardRef.current.offsetLeft
            setPosOdlaw(odlawPos);
            setPosWaldo(waldoPos);
            setPosWizard(wizardPos);
            setCount(count + 1);
            console.log('data sent to firebase')
        } else {
            return;
        }
    }

    const clicky = (e) => {
        console.log(e.target.offsetLeft)
        setCoordinates([e.pageX, e.pageY]);
        setPopUpState(true);
    }

    const callback = (popState) => {
        setPopUpState(popState);
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

    return (
        <>
            <div className='levelContainer'>
                <div className='levelHeader'>
                    <div className='levelAndCharacters'>
                        <div className='currentLevel'>Waldo's Beach</div>
                        <div className='headerCharacters'>
                            <Character className='odlaw' alt='odlaw' src='https://www.giantbomb.com/a/uploads/scale_small/4/46311/1333591-200px_character.odlaw.jpg' />
                            <Character className='waldo' alt='odlaw' src='https://www.giantbomb.com/a/uploads/scale_small/0/5973/545186-waldo2.jpg' />
                            <Character className='wizard' alt='odlaw' src='https://www.giantbomb.com/a/uploads/scale_small/4/46311/1341868-wizard.gif' />
                        </div>
                    </div>

                    <Button>
                    Next Level >
                    </Button>
                </div>
                <div className='waldoMap' onClick={clicky} onMouseOver={() => {
                    sendData();
                }}>
                    <img src={waldo1} alt='waldo-wallpaper' />
                    <div ref={odlawRef} className='hitSquare1'></div>
                    <div ref={waldoRef} className='hitSquare2'></div>
                    <div ref={wizardRef} className='hitSquare3'></div>
                </div>
            </div>
            {
                popUpState === true ? (
                    <Pop characters={props.characters} x={coordinates[0]} y={coordinates[1]} callback={callback} />
                ) : (
                    <div></div>
                )
            }
        </>

    )
}