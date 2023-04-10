import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.scss'
import { Navbar } from './navbar/navbar'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import About from './pages/About'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/about" element={<About />} />
      </Routes>
      <div className="page-content">
        <div className="home-container">
          <h1>Trends in the Spotify World</h1>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi deserunt adipisci laudantium cum numquam blanditiis, eum voluptatum. Aliquid animi in architecto earum eum, optio deleniti. Iusto eligendi omnis ab quaerat?</p>
        </div>
      </div>
      <div className="page-content">
        <div className="query-container">
          <h1>Queries</h1>
          <div className="query-grid">
            <div>
              <h3>Query 1</h3>
            </div>
            <div>
              <h3>Query 1</h3>
            </div>
            <div>
              <h3>Query 1</h3>
            </div>
            <div>
              <h3>Query 1</h3>
            </div>
            <div>
              <h3>Query 1</h3>
            </div>
          </div>

        </div>
        
      </div>
    </>
  )
}

export default App
