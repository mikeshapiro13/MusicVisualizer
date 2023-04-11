import { useState } from 'react'
import './App.scss'
import { Navbar } from './navbar/navbar'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import About from './pages/About'
import Query1 from './pages/Query1'
import Query2 from './pages/Query2'
import Query3 from './pages/Query3'
import Query4 from './pages/Query4'
import Query5 from './pages/Query5'
import QueryMain from './pages/QueryMain'
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/query1" element={<Query1 />} />
          <Route path="/query2" element={<Query2 />} />
          <Route path="/query3" element={<Query3 />} />
          <Route path="/query4" element={<Query4 />} />
          <Route path="/query5" element={<Query5 />} />
          <Route path="/querymain" element={<QueryMain />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
