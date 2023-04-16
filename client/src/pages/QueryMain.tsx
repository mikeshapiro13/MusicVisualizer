import React from 'react'
import { Navbar } from '../navbar/navbar';
import { Link } from 'react-router-dom';
import '../index.css';

function MainQuery() {
    return (
        <div>
          <Navbar />
          <div className="page-content">
            <div className="home-container">
              <h1>This is Query Main Page</h1>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi deserunt adipisci laudantium cum numquam blanditiis, eum voluptatum. Aliquid animi in architecto earum eum, optio deleniti. Iusto eligendi omnis ab quaerat?</p>
            </div>
          </div>
          <div className="page-content">
            <div className="query-container">
              <h1>Queries</h1>
              <div className="query-grid">
                <div>
                  <h3>
                    <Link to="/query1">Query 1</Link>
                  </h3>
                </div>
                <div>
                  <h3>
                    <Link to="/query2">Query 2</Link>
                  </h3>
                </div>
                <div>
                  <h3>
                    <Link to="/query3">Query 3</Link>
                  </h3>
                </div>
                <div>
                  <h3>
                    <Link to="/query4">Query 4</Link>
                  </h3>
                </div>
                <div>
                  <h3>
                    <Link to="/query5">Query 5</Link>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }
  
  export default MainQuery