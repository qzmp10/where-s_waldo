import { useState, useEffect, useRef, useInsertionEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import {
  collection, getDocs, doc, setDoc, Timestamp, updateDoc, serverTimestamp,
  arrayUnion, arrayRemove, increment, deleteDoc, deleteField,
  getDoc, getDocFromCache, where, query, onSnapshot, orderBy, limit, addDoc
} from "firebase/firestore";
import { db } from './firebase.config'
import './App.css';

import Home from './components/home';
import Nav from './components/nav';
import Level1 from './components/Level1';
import Level2 from './components/Level2';
import Leaderboard from './components/leaderboard';


function App() {

  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentCharacters, setCurrentCharacters] = useState(['Default', 'Default', 'Default']);

  async function getCharacters() {
    
    try {
      if (currentLevel != 0) {
        const charRef = await doc(db, 'waldoData', `level${currentLevel}`);
        const charSnap = await getDoc(charRef);
        console.log(currentLevel);
        console.log(charSnap.data());
        console.log(charSnap.data()['characters']);
        const array = charSnap.data()['characters'];
        setCurrentCharacters(array);
        console.log('getCharacters() fired')
      } else {
        console.log('getCHaracters() not executed')
      } 

    } catch (e) {
      console.log(e);
    }

  }

  async function setLevel(state0, state1, state2, state3) {
    const levelRef = await doc(db, 'waldoData', 'currentLevel');
    const levelSnap = await getDoc(levelRef);
    await updateDoc(levelRef, {
      '0': state0,
      '1': state1,
      '2': state2,
      '3': state3
    })
    console.log('setLevel() fired', levelSnap.data());
    whichLevel();
  }

  async function whichLevel() {

    const levelRef = await doc(db, 'waldoData', 'currentLevel');
    const levelSnap = await getDoc(levelRef);

    if (levelSnap.exists()) {
      for (const level in levelSnap.data()) {
        if (levelSnap.data()[level] === true) {
          setCurrentLevel(level);
        }
      }
    }
    console.log('whichLevel() fired')
  }

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path='/' element={<Home setLevel={setLevel} whichLevel={whichLevel} />}></Route>
        <Route path='/level1' element={<Level1 currentLevel={currentLevel} characters={currentCharacters}
          setLevel={setLevel} getCharacters={getCharacters} whichLevel={whichLevel} />}></Route>
        <Route path='/level2' element={<Level2 currentLevel={currentLevel} characters={currentCharacters} setLevel={setLevel} getCharacters={getCharacters} />}></Route>
        <Route path='/leaderboard' element={<Leaderboard />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
