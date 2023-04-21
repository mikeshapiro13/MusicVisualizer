import { createContext, useState } from 'react'
import './App.scss'
import { Navbar } from './navbar/navbar'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import About from './pages/about/About'
import Home from './pages/home/Home'
import { Trends } from './pages/trends/Trends'
import { Query1 } from './pages/queries/Query1'
import { Query2 } from './pages/queries/Query2'
import { Query3 } from './pages/queries/Query3'
import { Query4 } from './pages/queries/Query4'
import { Query5 } from './pages/queries/Query5'
import AuthContext from './AuthContext'
import { Login } from './Login'
import { Query6 } from './pages/queries/Query6'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated}}>
      <Router>
          <div className="App">
          <Routes>
              <Route path='/' element={<Login/>} />
              <Route path="/home" element={<Home />} />
              <Route path="/trends" element={<Trends />} />
              <Route path="/q1" element={<Query1 />} />
              <Route path="/q2" element={<Query2 />} />
              <Route path="/q3" element={<Query3 />} />
              <Route path="/q4" element={<Query4 />} />
              <Route path="/q5" element={<Query5 />} />
              <Route path="/q6" element={<Query6 />} />
            </Routes>
          </div>
        </Router>
      </AuthContext.Provider>

  );
}

export default App;
