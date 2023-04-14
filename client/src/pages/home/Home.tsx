import React from 'react'
import { Navbar } from '../../navbar/navbar'

function Home() {

    return (
      <>
        <Navbar/>
        <div className="page-content">
          <div className="home-container">
            <h1>This is Home</h1>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi deserunt adipisci laudantium cum numquam blanditiis, eum voluptatum. Aliquid animi in architecto earum eum, optio deleniti. Iusto eligendi omnis ab quaerat?</p>
          </div>
        </div>
      </>
    )
  }
  
  export default Home