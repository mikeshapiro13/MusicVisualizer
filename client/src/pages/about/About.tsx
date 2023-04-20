import { Navbar } from '../../navbar/navbar'
import { useState, useEffect } from 'react';

function About() {
  const [total, setTotal] = useState(null);

  useEffect(() => {
    fetch('/querytuples')
      .then(response => response.json())
      .then(data => {
        const flattened = data.flat();
        console.log(flattened);
        const totalSum = flattened.reduce((total, value) => total + value, 0);
        console.log(totalSum)
        setTotal(totalSum);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="page">
        <div className="page-content">
          <h1>{total}</h1>
        </div>
      </div>
    </>
  );
};

export default About; 