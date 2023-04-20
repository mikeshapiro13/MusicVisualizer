import React, { useEffect, useState } from 'react'
import { Navbar } from '../../navbar/navbar'
import Graph from './Graph';

export const Query3 = () => {
  const [country, setCountry] = useState('us');
  const [data, setData] = useState();
  const [doFetch, setDoFetch] = useState(true);
  
  useEffect(() => {
    fetch('/query3/?country=' + country)
      .then(res => res.json())
      .then(queryData => {
        console.log(queryData)
        setData(queryData.map(([year, genres]) => ({
          year: year.toString(),
          totalStreams: genres
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
          <h1>American Pop Influence on Foreign Entities</h1>
          <Graph
            data={data}
            keyX={"year"}
            keyY={"totalStreams"}
            name={"Number of Genres for Given Year"}
          />
          <div className='p-container'>
            <div className="left">
              <div>Country: <input  value={ country } onChange={(s) => {setCountry(s.target.value)}}/></div>
            </div>
            <button onClick={() => setDoFetch(!doFetch)}>Set Params</button>
          </div>
          <div className='d-container'>
            Displays the amount of American pop culture influence per year on a selected country's top charts.
            The query takes in a binding parameter inputted by a user corresponding to a country code found in
            the ChartedSong schema in "countryCharted". The query then finds the year a song charted and song IDs
            from chartedSong where the countrycode is equal to 'us' for the United States. The same thing is also
            done with the inputted country from the user. These two results are then joined, keeping tuples where
            the sID matches (a US top charted song also appears in the selected countries top charts). It then does
            an aggregate function, count(sID) as usPop and groups by the year charted.  This is then joined with a
            table of only the count of song IDs (foreignPop) found in the top charts of the inputted country by year
            where the years match (overall count of songs in input country by year in the top charts). The
            usPop and foreignPop are then divided to get the percentage of US charted songs to the country's overall
            charted songs.
            <br />
            <br />
            This query provides a useful trend visualization to see how much the United States has influenced another
            country's pop culture through the infiltration of their top charts on Spotify. This allows American artists
            and record companies to gauge the potential market of listeners in a foreign country for things such as tour
             locations, concerts, and PR

          </div>
        </div>
      </div>
    </>
  )
}
