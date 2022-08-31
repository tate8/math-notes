import React from 'react'
import Navbar from '../Sidebar/Sidebar'
import Note from '../Note/Note'
import './Notepad.css'

function Notepad (): JSX.Element {
  return (
    <div className="notepad-container">
        <Navbar />
        <Note />
    </div>
  )
}

export default Notepad
