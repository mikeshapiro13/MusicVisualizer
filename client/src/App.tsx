import { useState } from 'react'
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

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/trends" element={<Trends />} />
          <Route path="/query1" element={<Query1 />} />
          <Route path="/query2" element={<Query2 />} />
          <Route path="/query3" element={<Query3 />} />
          <Route path="/query4" element={<Query4 />} />
          <Route path="/query5" element={<Query5 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
