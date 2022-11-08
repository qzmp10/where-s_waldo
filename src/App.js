import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'

import Home from './components/home';
import './App.css';


function App() {

const [currentLevel, setCurrentLevel] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
