import React, { createContext, useContext, useEffect, useState } from 'react'
import { Navbar } from '../../navbar/navbar'
import './home.scss'
import '../../App.scss'
import AuthContext from '../../AuthContext'
function Home() {

  return (
    <>
      <Navbar />
      <div className="page">
        <div className="page-content">
          <h1>Spotify Trends</h1>
          <div className="home-content">
            <img src="https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg"></img>
            <p>
              <span className='bold-text'>
                Welcome to our music data analytics web application!
              </span>
              <br />
              Our platform offers a unique and user-friendly interface that allows music enthusiasts
              and professionals to explore different analytical trends in music data through interactive graphs. Our custom-made database, consisting of over
              1.2 million songs, provides you with insights into chart performance, track information, and artist diversity, enabling you to see how different
              topics in music have evolved over time. Our backend server processes complex queries from the frontend, giving you quick and easy access to valuable
              information. Whether you are a music fan or a professional in the industry, our platform is designed to provide you with the tools you need to
              make informed decisions. Start exploring today and discover the statistics behind your favorite music!
            </p>
          </div>
        </div>
      </div>

    </>
    )
  }
  
  export default Home