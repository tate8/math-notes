import React from 'react'
import './Sidebar.css'

function Sidebar (): JSX.Element {
  return (
    <div id="sidebar" className="sidebar">
        <div className="sidebar-items-container">
            <ul className="sidebar-items">
                <li className="sidebar-item"><a href="#">Lorem Ipsum</a></li>
                <li className="sidebar-item"><a href="#">Lorem Ipsum</a></li>
                <li className="sidebar-item"><a href="#">Lorem Ipsum</a></li>
            </ul>
        </div>
    </div>
  )
}

export default Sidebar
