import {useState, useEffect, useRef} from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import './App.css';

import Home from './components/home';
import Nav from './components/nav';
import Level1 from './components/Level1';


function App() {

const [currentLevel, setCurrentLevel] = useState(0);
const [currentCharacters, setCurrentCharacters] = useState(['Default', 'Default', 'Default']);

const nextLevel = () => {
  setCurrentLevel(currentLevel + 1);
}

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path='/' element={<Home nextLevel={nextLevel}/>}></Route>
        <Route path='/level1' element={<Level1 currentLevel={currentLevel}  characters={currentCharacters}/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
