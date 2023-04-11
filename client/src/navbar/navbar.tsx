import React from 'react'
import { Link } from 'react-router-dom';
import './navbar.scss';

import './navbar.scss'

export const Navbar = () => {
  return (
    <nav>
      <div className="nav-content">
        <div className="nav-item">
          <Link to="/">The Musical Trends</Link>
        </div>
        <div className='nav-item'>
          <Link to="/about">About</Link>
          <Link to="/querymain">View Trends</Link>
        </div>
      </div>

    </nav>
  )
}
