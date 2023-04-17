import React, { useEffect, useRef, useState } from 'react'
import './query.scss'
import { Navbar } from '../../navbar/navbar'
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';



const Graph = (props:any) => {
  return (
    <LineChart width={700} height={350} data={props.data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="time" name="Average Number of Streams" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
  );
} 

export const Query1 = () => {

  const [data, setData] = useState();
  useEffect(() => {
    fetch('/query1')
      .then(res => res.json())
      .then(queryData => {
        setData(queryData.map(([year, week, time]) => ({
          year: year.toString(),
          week,
          time,
          }))
        )
      })
      .catch(err => console.error(err))
  }, [])
  return (
    <>
      <Navbar />
      <div className="page">
        <div className="page-content">
          <h1>Song Characteristics Overtime</h1>
          <Graph data={ data }/>
          <div className='p-container'>
            <div className="left">
              <div>Param 1 <input id="param1"  /></div>
              <div>Param 2 <input id="param2"/></div>
            </div>
            <button>Set Params</button>
          </div>
          <div className='d-container'>
            Our first query will be computing the average number of streams per week for the Spotify top 50 charts. This will include finding the songs that were in the charts the same week and computing the average of all of their durations. These values will then be plotted over weeks to show how duration has changed week to week. Users will also be given the option to select the dates from which they would like to see data. 
          </div>
        </div>
      </div>
    </>
  )
}
