import { useState, useEffect, useRef } from 'react'
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


function App() {

  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentCharacters, setCurrentCharacters] = useState(['Default', 'Default', 'Default']);

  // const nextLevel = () => {
  //   changeLevel();
  // }

  useEffect(() => {
    whichLevel();
  }, [])

  useEffect(() => {
    if (currentLevel == 1) {
      getCharacters();
    }
  }, [currentLevel])

  async function getCharacters() {
    const charRef = await doc(db, 'waldoData', `level${currentLevel}`);
    const charSnap = await getDoc(charRef);
    console.log(charSnap.data())
    const array = charSnap.data()['characters'];
    setCurrentCharacters(array);
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
    console.log(levelSnap.data());
  }

  async function whichLevel() {

    const levelRef = await doc(db, 'waldoData', 'currentLevel');
    const levelSnap = await getDoc(levelRef);

    if (levelSnap.exists()) {
      console.log(levelSnap.data());
      for (const level in levelSnap.data()) {
        if (levelSnap.data()[level] === true) {
          console.log(levelSnap.data());
          setCurrentLevel(level);
        }
      }
    }
  }

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path='/' element={<Home setLevel={setLevel} />}></Route>
        <Route path='/level1' element={<Level1 currentLevel={currentLevel} characters={currentCharacters} setLevel={setLevel} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
