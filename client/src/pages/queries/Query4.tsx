import React, { useEffect, useState } from 'react'
import { Navbar } from '../../navbar/navbar'
import Graph, { getMonthFromWeek } from './Graph';

export const Query4 = () => {
  const [start, setStart] = useState(2014);
  const [end, setEnd] = useState(2020);
  const [data, setData] = useState();
  const [doFetch, setDoFetch] = useState(true);
  
  useEffect(() => {
    fetch('/query4/'+ start + '/' + end)
      .then(res => res.json())
      .then(queryData => {
        console.log(queryData);
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
            name={"Average characteristics"}
            range={[175000, 275000]}
          />
          <div className='p-container'>
            <div className="left">
              <div>Start Date: <input id="param1" value={ start } onChange={(s) => setStart(parseInt(s.target.value))}/></div>
              <div>End Date: <input id="param2" value={ end } onChange={(e) => setEnd(parseInt(e.target.value))}/></div>
            </div>
            <button onClick={() => setDoFetch(!doFetch)}>Set Params</button>
          </div>
          <div className='d-container'>
            tbd
            <br /> <br />
            tbd

          </div>
        </div>
      </div>
    </>
  )
}
