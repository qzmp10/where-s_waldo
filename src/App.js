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

  const nextLevel = () => {
    changeLevel();
  }

  useEffect(() => {
    whichLevel();
  }, [])

  useEffect(() => {
    if(currentLevel === '1') {
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

  async function whichLevel() {

    const levelRef = await doc(db, 'waldoData', 'currentLevel');
    const levelSnap = await getDoc(levelRef);

    if (levelSnap.exists()) {
      console.log(levelSnap.data());
      for (const level in levelSnap.data()) {
        if (levelSnap.data()[level] === true) {
          setCurrentLevel(level);
        }
      }
    }
  }

  async function changeLevel() {


    const levelRef = await doc(db, 'waldoData', 'currentLevel');


    if (currentLevel == 0) {
      await updateDoc(levelRef, {
        '0': false,
        '1': true,
      })
    } else if (currentLevel == 1) {
      await updateDoc(levelRef, {
        '1': false,
        '2': true,
      })
    }

  }

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path='/' element={<Home nextLevel={nextLevel} />}></Route>
        <Route path='/level1' element={<Level1 currentLevel={currentLevel} characters={currentCharacters} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
