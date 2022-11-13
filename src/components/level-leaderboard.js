
import {
    collection, getDocs, doc, setDoc, Timestamp, updateDoc, serverTimestamp,
    arrayUnion, arrayRemove, increment, deleteDoc, deleteField,
    getDoc, getDocFromCache, where, query, onSnapshot, orderBy, limit, addDoc
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from '../firebase.config'

export default function Levelleaderboard(props) {

    const [leaderboardArray, setLeaderboardArray] = useState([]);

    useEffect(() => {
        getLevelLeaderboard();
    }, [])

    useEffect(() => {
        getLevelLeaderboard();
    }, [props.level])

    // async function getLevelLeaderboard() {
    //     const usersInfo = doc(db, 'waldoData', `user-leaderboard-level${props.level}`);
    //     const userInfoSnap = await getDoc(usersInfo);
    //     const userArray = userInfoSnap.data()['users'];
    //     setLeaderboardArray(userArray);
    // }

    async function getLevelLeaderboard() {
        const usr = doc(db, 'waldoData', `user-leaderboard-level${props.level}`);
        const usrSnap = await getDoc(usr);

        let queryInfo = usrSnap.data()['users'];
        
        queryInfo.sort((a, b) => {
            if(a.time > b.time) {
                return 1;
            } else {
                return -1;
            }
        });

        setLeaderboardArray(queryInfo);
    }


    return (
        <div className='levelLeaderboard'>
            <h1> Where's Waldo Hall of Fame - Level {props.level}</h1>
            {leaderboardArray.map(user => {
                return (
                    <div className='leaderboardUser' key={Math.random() * 10000}>
                        <span className="leaderboardName">{user.name}</span>
                        <div className="timeDiv">
                            <span>Finished level {props.level} in... </span>
                            <span className="leaderboardTime">{user.time} seconds !</span>
                        </div>

                    </div>
                )
            })}
        </div>
    )
}