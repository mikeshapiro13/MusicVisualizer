import React, { useEffect, useState } from 'react'
import { Navbar } from '../../navbar/navbar'
import Graph, { getMonthFromWeek } from './Graph';

export const Query6 = () => {
  const [tempo, setTempo] = useState(200);
  const [data, setData] = useState();
  const [doFetch, setDoFetch] = useState(true);
  
  useEffect(() => {
    setData(null);
    fetch('/query6/?t=' + tempo)
      .then(res => res.json())
      .then(queryData => {
        setData(queryData.map(([year,lowerRatio, upperRatio]) => ({
          year: year.toString(),
          lowerRatio: lowerRatio,
          upperRatio: upperRatio
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
          <h1>Tempo and Artist Top Heaviness in the T50</h1>
          <Graph
            data={data}
            keyX={"year"}
            keyY={"lowerRatio"}
            keyY2={"upperRatio"}
            name={"ratio lower than selected BPM Tempo"}
            name2={"ratio higher than selected BPM Tempo"}
            
          />
          <div className='p-container'>
            <div className="left">
              <div>Tempo: <input  value={ tempo } onChange={(s) => {setTempo(parseInt(s.target.value))}}/></div>
            </div>
            <button onClick={() => setDoFetch(!doFetch)}>Set Params</button>
          </div>
          <div className='d-container'>
            <div className="bold-text">Calculated Ratio: (distinct artists in the top 50) / (distinct artists in general)</div>

            This is a SQL query that retrieves ratios of distinct artists in the top 50 vs. the distinct artists that make music in general, 
            based on whether the tempo of their songs is greater than or less than a user-inputted tempo, over time. It does this by joining multiple tables, 
            filtering by tempo and year, and grouping by year to calculate the ratios. The results are ordered by year in ascending order. The purpose of this query is to measure top heaviness in the chart in comparison to the tempo, and the
            general trend that can be seen is that the higher the tempo within reason, the more likely that tempo is to be top heavy in its chart distribution.            <br />
            <br />
            The query provides useful trend visualization record conglomerates showing how the increase in tempo, can lead to their top artist performing
            better. It is also useful for smaller artist as it seems through the tren discovered, lower tempo songs prove to perform much better for smaller
            artists, who do not reach the top 50.

          </div>
        </div>
      </div>
    </>
  )
}
