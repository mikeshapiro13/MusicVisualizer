import { Navbar } from '../navbar/navbar'
import React from 'react';

function About() {

  return (
    <div>
      <Navbar />
      <div className="page-content">
        <div className="home-container">
          <h1>This is About</h1>
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
};

export default About; 