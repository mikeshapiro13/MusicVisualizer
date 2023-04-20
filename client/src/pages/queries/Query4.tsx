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
          This query computes the average music index for songs charted within a specified range of years, grouped by year and week. The music index is an aggregate measure calculated as the average of various song attributes, including energy, song key, song mode, acousticness, speechiness, valence, tempo, duration, and time signature. The query first calculates the music index for each song in the "Song" table, aggregating the mentioned attributes and grouping by the song ID (sID). Then, the main query joins the "ChartedSong" table with previosuly calculated table using the song ID. It filters the records based on the specified range of years (starter and ender), and groups the results by year and week number, which is extracted from the "dateCharted" column. The final output consists of the year, week number, and the average music index for each year-week combination, sorted in ascending order by year.
            <br /> <br />
          The usefulness of this query stems from its ability to provide insights into the musical characteristics of charted songs over time, specifically on a weekly basis. By calculating the average music index for each week, the query allows analysts or music industry professionals to identify trends in the attributes of popular songs and better understand the factors that contribute to a song's success. This information can be utilized to make informed decisions regarding song production, artist development, or the curation of playlists that cater to listeners' preferences. Furthermore, the query can help businesses monitor the evolution of music styles and preferences over time, which can be valuable for marketing and strategic planning.
          </div>
        </div>
      </div>
    </>
  )
}
