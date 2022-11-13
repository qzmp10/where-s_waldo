import { useEffect, useState } from "react"
import {
    collection, getDocs, doc, setDoc, Timestamp, updateDoc, serverTimestamp,
    arrayUnion, arrayRemove, increment, deleteDoc, deleteField,
    getDoc, getDocFromCache, where, query, onSnapshot, orderBy, limit, addDoc
} from "firebase/firestore";
import { db } from '../firebase.config'
export default function TimePop(props) {


    const [userName, setUserName] = useState('')

    useEffect(() => {
        const header = document.querySelector('.header');
        const levelContainer = document.querySelector('.levelContainer');
        header.style.filter = 'blur(7px)';
        levelContainer.style.filter = 'blur(7px)';
    }, [])

    const inputChange = (e) => {
        setUserName(e.target.value);
        console.log(userName)
    }

    const submitName = (e) => {
        e.preventDefault();
        sendUserInfoToFirebase(userName, props.userTime);

    }

    async function sendUserInfoToFirebase(name, time) {
        await updateDoc(doc(db, 'waldoData', `user-leaderboard-level${props.currentLevel}`), {
            users: arrayUnion({name: name, time: time})
          })
          console.log('sent');
    }

    function closePopUp() {
        props.callback();
        const header = document.querySelector('.header');
        const levelContainer = document.querySelector('.levelContainer');
        header.style.filter = 'none';
        levelContainer.style.filter = 'none';
    }


    return (
        <div className='timePopUp'>
            <div className="close" onClick={() => {closePopUp()}}>X</div>
            <h1 className='timeToFinish'>
                You completed the level in {props.userTime} seconds!
            </h1>
            <h3>Register your time on the leaderboard!</h3>
            <form onSubmit={submitName}>
                <div className='inputDiv'>
                    <label htmlFor='username'>Username</label>
                    <input type='text' id='username' value={userName} onChange={inputChange} />
                </div>
                <input type='submit' className='submit' />

            </form>
        </div>
    )
}