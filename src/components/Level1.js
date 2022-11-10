import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import waldo1 from '../waldo1.jpg'
import { Button, Character } from './styled-comp'
import {
    collection, getDocs, doc, setDoc, Timestamp, updateDoc, serverTimestamp,
    arrayUnion, arrayRemove, increment, deleteDoc, deleteField,
    getDoc, getDocFromCache, where, query, onSnapshot, orderBy, limit, addDoc
} from "firebase/firestore";
import { db } from '../firebase.config'

export default function Level1(props) {

    const getPosition = (e) => {
        props.popUp(e.pageX, e.pageY);
    }


    return (
        <div className='levelContainer'>
            <div className='levelHeader'>
                <div className='levelAndCharacters'>
                    <div className='currentLevel'>Level {props.currentLevel}</div>
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
            <div className='waldoMap' onClick={getPosition}>
                <img src={waldo1} alt='waldo-wallpaper' />
                <div className='hitSquare1'></div>
                <div className='hitSquare2'></div>
                <div className='hitSquare3'></div>
            </div>
        </div>
    )
}