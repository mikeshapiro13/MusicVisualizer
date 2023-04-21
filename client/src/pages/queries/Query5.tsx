import React, { useEffect, useState } from 'react'
import { Navbar } from '../../navbar/navbar'
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import Graph from './Graph';


export const Query5 = () => {
  const [name, setName] = useState('fr');
  const [data, setData] = useState();
  const [doFetch, setDoFetch] = useState(true);
  
  useEffect(() => {
    setData(null);
    fetch('/query5/?name=' + name)
      .then(res => res.json())
      .then(queryData => {
        console.log(queryData)
        setData(queryData.map(([year, tempo]) => ({
          year: year.toString(),
          tempo: tempo
          }))
        )
      })
      .catch(err => console.error(err))
  }, [doFetch])
  console.log(data);
  return (
    <>
      <Navbar />
      <div className="page">
        <div className="page-content">
          <h1>Average Artist Tempo for a Given Country</h1>
          <Graph
            data={data}
            keyX={"year"}
            keyY={"tempo"}
            name={"BPM"}
          />
          <div className='p-container'>
            <div className="left">
              <div>Country Name: <input  value={ name } onChange={(s) => {setName(s.target.value)}}/></div>
            </div>
            <button onClick={() => setDoFetch(!doFetch)}>Set Params</button>
          </div>
          <div className='d-container'>
            This SQL query retrieves the average tempo of songs charted in a specific country between 2014 and 2020 by artists who have at least 5 songs in the database, grouping the data by year and sorting it in ascending order. The query uses JOIN statements to combine data from four tables, filtering the results based on the year range, country, and artist count. The resulting data can provide valuable insights into trends in music tempo over time and inform creative and business decisions in the music industry, such as music licensing, advertising, and songwriting.
            <br />
            <br />
            The data obtained from this query could be useful for several reasons. For example, it could help music industry analysts and researchers identify trends in tempo over time and how they correlate with artist popularity and chart performance. It could also help music producers and songwriters gain insights into the tempo preferences of audiences in a particular country and tailor their music to better suit those preferences. Furthermore, this data could be used to inform decisions related to music licensing and advertising, such as which songs to license for use in commercials or which songs to play during particular events or times of day. 
          </div>
        </div>
      </div>
    </>
  )
}
