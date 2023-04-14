import React from 'react'
import './navbar.scss'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav>
      <div className="nav-content">
        <div className="nav-item">
          <Link to="/">The Musical Trends</Link>
        </div>
        <div className='nav-item'>
          <Link to="/about">About</Link>
          <Link to='/trends'>View Trends</Link>
        </div>
      </div>
    </nav>
  )
}
