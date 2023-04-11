import React from 'react';
import { Navbar } from '../navbar/navbar';

function Home() {
  return (
    <div>
      <Navbar />
      <div className="page-content">
        <div className="home-container">
          <h1>This is Home</h1>
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
    </div>
  );
}

export default Home;
