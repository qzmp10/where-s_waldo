import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'

export default function Nav(props) {
    return(
        <div className='header'>
            <div className='where'>Where's</div>
            <img className='waldoImg' alt='waldo' src='https://triviahappy.com/wp-content/uploads/2014/10/Untitled-1.png'/>
            <div className='isWaldo'>Waldo?</div>
        </div>
    )
}