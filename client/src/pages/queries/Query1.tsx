import React, { useEffect, useRef, useState } from 'react'
import './query.scss'
import { Navbar } from '../../navbar/navbar'
import Graph, { getMonthFromWeek } from './Graph';



export const Query1 = () => {
  const [start, setStart] = useState(2014);
  const [end, setEnd] = useState(2020);
  const [data, setData] = useState();
  const [doFetch, setDoFetch] = useState(true);
  
  useEffect(() => {
    fetch('/query1/'+ start + '/' + end)
      .then(res => res.json())
      .then(queryData => {
        setData(queryData.map(([year, week, time]) => ({
          year: getMonthFromWeek(week) + ' ' + year.toString(),
          week,
          time,
          }))
        )
      })
      .catch(err => console.error(err))
  }, [doFetch])
  return (
    <>
      <Navbar />
      <div className="page">
        <div className="page-content">
          <h1>Number of Streams Overtime</h1>
          <Graph
            data={data}
            keyX={"year"}
            keyY={"time"}
            name={"Average Number of Streams"}
          />
          <div className='p-container'>
            <div className="left">
              <div>Start Date: <input id="param1" value={ start } onChange={(s) => setStart(parseInt(s.target.value))}/></div>
              <div>End Date: <input id="param2" value={ end } onChange={(e) => setEnd(parseInt(e.target.value))}/></div>
            </div>
            <button onClick={() => setDoFetch(!doFetch)}>Set Params</button>
          </div>
          <div className='d-container'>
            The graph above focuses on computing the average number of streams per week of songs in the top 50 charts,
            over a time span from 2014-2020. Each x axis value, represents one calender week, with the y axis representing
            the average number of streams of songs in the Spotify top 50 charts associated with that week.
            <br />
            <br />
            The trend that can be seen from this graph is upward trend in the number of streams average per week. This trend
            shows the growth of spotify platform over the set time period, as the increases in streams directly correspond to
            how many users are actively using the platform. This increasing trend in the chart is useful to investors, and
            stockholders of the Spotify platform, as it shows the platform still has a very healthy number of users.
            <br /><br />
            One notable outlier of the data 
          </div>
        </div>
      </div>
    </>
  )
}
