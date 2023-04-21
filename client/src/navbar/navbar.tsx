import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import './navbar.scss';
import AuthContext from '../AuthContext';


export const Navbar = () => {
  const authenticated = useContext(AuthContext);
  const logout = () => {

  }
  return (
    <nav>
      <div className="nav-content">
        <div className="nav-item">
          <Link to="/home">The Musical Trends</Link>
        </div>
        <div className='nav-item'>
          <Link to='/trends'>View Trends</Link>
          <Link to="/">Logout</Link>

        </div>
      </div>
    </nav>
  )
}
