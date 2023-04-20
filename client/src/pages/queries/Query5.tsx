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
          <h1>Artist Something</h1>
          <Graph data={data} />
          <div className='p-container'>
            <div className="left">
              <div>Artist Name: <input  value={ name } onChange={(s) => {setName(s.target.value)}}/></div>
            </div>
            <button onClick={() => setDoFetch(!doFetch)}>Set Params</button>
          </div>
          <div className='d-container'>
            tbd
            <br />
            <br />
            tbd
          </div>
        </div>
      </div>
    </>
  )
}
