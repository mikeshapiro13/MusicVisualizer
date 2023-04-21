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
          This retrieves the minimum, maximum, and average tempo of songs released by a specified artist for each year, sorted in ascending order by the release year. The query first joins the "Artist" table with the "ArtistSongs" and "Song" tables using the artist ID (aID) and song ID (sID). It filters the records based on the artist's name, which is provided as a parameter (selectedName). Then, the query groups the results by the artist's name and the song's release year. The final output consists of the artist's name, the release year, and the minimum, maximum, and average tempo values for the songs released in each year, sorted in ascending order by the release year.
            <br />
            <br />
          The usefulness of this query lies in its ability to provide insights into the tempo characteristics of an artist's songs over their career. By calculating the minimum, maximum, and average tempo for each year, the query allows music industry professionals, fans, and analysts to identify the evolution of an artist's style and tempo preferences. This information can be valuable for understanding an artist's creative development, as well as for predicting the potential success of their future releases based on historical trends. Additionally, the query can help businesses tailor marketing campaigns, playlist curation, and promotional activities to better align with the artist's evolving style.
          </div>
        </div>
      </div>
    </>
  )
}
