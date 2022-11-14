import { useState, useEffect, useRef, useInsertionEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { doc, updateDoc, getDoc,
} from "firebase/firestore";
import { db } from './firebase.config'
import './App.css';

import Home from './components/home';
import Nav from './components/nav';
import Level1 from './components/Level1';
import Level2 from './components/Level2';
import Leaderboard from './components/leaderboard';
import Level3 from './components/Level3';


function App() {

  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentCharacters, setCurrentCharacters] = useState(['Default', 'Default', 'Default']);

  async function getCharacters() {

    try {
      if (currentLevel != 0) {
        const charRef = await doc(db, 'waldoData', `level${currentLevel}`);
        const charSnap = await getDoc(charRef);
        const array = charSnap.data()['characters'];
        setCurrentCharacters(array);
      } 
    } catch (e) {
      console.log(e);
    }

  }

  async function setLevel(state0, state1, state2, state3) {
    const levelRef = await doc(db, 'waldoData', 'currentLevel');
    await updateDoc(levelRef, {
      '0': state0,
      '1': state1,
      '2': state2,
      '3': state3
    })
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
  }

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path='/' element={<Home setLevel={setLevel} whichLevel={whichLevel} />}></Route>

        <Route path='/level1' element={<Level1 currentLevel={currentLevel} characters={currentCharacters}
          setLevel={setLevel} getCharacters={getCharacters} whichLevel={whichLevel} />}></Route>

        <Route path='/level2' element={<Level2 currentLevel={currentLevel} characters={currentCharacters}
          setLevel={setLevel} getCharacters={getCharacters} />}></Route>


        <Route path='/level3' element={<Level3 currentLevel={currentLevel} characters={currentCharacters}
          setLevel={setLevel} getCharacters={getCharacters} />}></Route>

        <Route path='/leaderboard' element={<Leaderboard />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
