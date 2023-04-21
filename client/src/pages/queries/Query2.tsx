import React, { useEffect, useState } from 'react'
import { Navbar } from '../../navbar/navbar'
import Graph, { getMonthFromWeek } from './Graph';

export const Query2 = () => {
  const [country, setCountry] = useState('fr');
  const [data, setData] = useState();
  const [doFetch, setDoFetch] = useState(true);
  
  useEffect(() => {
    setData(null);
    fetch('/query2/?country=' + country)
      .then(res => res.json())
      .then(queryData => {
        setData(queryData.map(([year, dont, care, genres]) => ({
          year: year.toString(),
          genres: genres
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
          <h1>Genre Diversity in the Top Charts</h1>
          <Graph
            data={data}
            keyX={"year"}
            keyY={"genres"}
            name={"Average Number of Genres per Artist"}
          />
          <div className='p-container'>
            <div className="left">
              <div>Country: <input  value={ country } onChange={(s) => {setCountry(s.target.value)}}/></div>
            </div>
            <button onClick={() => setDoFetch(!doFetch)}>Set Params</button>
          </div>
          <div className='d-container'>
            Displays the diversity of genres found in the top charts by year. The query joins the ChartedSong, ArtistSongs, and ArtistGenres schemas with matching song ID's from songs in the charted songs to the corresponding artist ID from ArtistSongs. These artist IDs are then joined with ArtistSongs to retrieve all the genres of artists found in the top charts of Spotify. Group by functions using the year are extracted from the date data type from ChartedSongs and is then used to provide the x-axis time for the trend query.  To take this query further, we divide the number of genres that appeared on the top charts for the selected country to the number of artists to get a figure of how diverse an average top charts' artist's genre portfolio is over time.
            <br />
            <br />
            The query provides useful trend visualization to music artists and record conglomerates showing the
            increase or decrease of genre diversity over time. With this information, record companies and artists
            can make an informed decision on whether or not to pursue more experimental music that pulls from other
            genres with the intent on making it on the top charts.

          </div>
        </div>
      </div>
    </>
  )
}
