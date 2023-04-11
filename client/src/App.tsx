import { useState } from 'react'
import './App.scss'
import { Navbar } from './navbar/navbar'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import About from './pages/About'
import Query1 from './pages/Query1'
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/query1" element={<Query1 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
