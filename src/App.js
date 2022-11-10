import {useState, useEffect, useRef} from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import './App.css';

import Home from './components/home';
import Nav from './components/nav';
import Level1 from './components/Level1';


function App() {

const [currentLevel, setCurrentLevel] = useState(0);
const [currentCharacters, setCurrentCharacters] = useState(['Default', 'Default', 'Default']);


const popUpBox = (x, y) => {
  let body = document.querySelector('body');
  let popContainer = document.createElement('div');
  popContainer.classList.add('popUp')

  for(let i =0; i < currentCharacters.length; i++) {
    let div = document.createElement('div');
    let textChild = document.createElement('span');
    div.classList.add('textChild');
    popContainer.appendChild(div);
    div.appendChild(textChild);
    div.style.height = `${(100 / currentCharacters.length)}%`;
    textChild.textContent = `${currentCharacters[i].toUpperCase()}`;
  } 

  body.appendChild(popContainer)
  popContainer.style.top = `${y}px`;
  popContainer.style.left = `${x}px`;

}

const nextLevel = () => {
  setCurrentLevel(currentLevel + 1);
}

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path='/' element={<Home nextLevel={nextLevel}/>}></Route>
        <Route path='/level1' element={<Level1 currentLevel={currentLevel} popUp={popUpBox}/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
