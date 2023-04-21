import React, { useEffect, useState } from 'react'
import { Navbar } from '../../navbar/navbar'
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';


const Graph = (props: any) => {
  return (
    <>
      {props.data ?
        (
          <LineChart width={1000} height={350} data={props.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year"/>
            <YAxis  />
            <Tooltip />
            <Legend name={props.data.artist} />
            <Line type="monotone"  dataKey="maxTempo" name={"Max Tempo"} stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone"  dataKey="minTempo" name={"Min Tempo"} stroke="#84d888" activeDot={{ r: 8 }} />
            <Line type="monotone"  dataKey="avgTempo" name={"Avg Tempo"} stroke="#d89f84" activeDot={{ r: 8 }} />

          </LineChart>
        )
        :
        <h2 className="blink_me">Loading Data...</h2>
      }
    </>

  );
} 

export const Query5 = () => {
  const [name, setName] = useState('Ariana Grande');
  const [data, setData] = useState();
  const [doFetch, setDoFetch] = useState(true);
  
  useEffect(() => {
    setData(null);
    fetch('/query5/?name=' + name)
      .then(res => res.json())
      .then(queryData => {
        console.log(queryData)
        setData(queryData.map(([artist, year, minTempo, maxTempo, avgTempo]) => ({
          artist: artist.toString(),
          year: year.toString(),
          minTempo: minTempo,
          maxTempo: maxTempo,
          avgTempo: avgTempo,
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
          <h1>Artist Tempos</h1>
          <Graph data={data} />
          <div className='p-container'>
            <div className="left">
              <div>Artist Name: <input  value={ name } onChange={(s) => {setName(s.target.value)}}/></div>
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
