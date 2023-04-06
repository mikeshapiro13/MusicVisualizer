import React from 'react'
import './navbar.scss'

export const Navbar = () => {
  return (
    <nav>
      <div className="nav-content">
        <div className="nav-item">
          <a>The Musical Trends</a>
        </div>
        <div className='nav-item'>
          <a>About</a>
          <a>View Trends</a>
        </div>
      </div>

    </nav>
  )
}
