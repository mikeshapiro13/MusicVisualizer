import React from 'react'
import '../../App.scss'
import './trends.scss'
import { Link } from 'react-router-dom'
import { Navbar } from '../../navbar/navbar'

const TrendCard = (props: any) => {
  return (
    <Link to={props.linkTo} className="trend-card">
      <div className="body">
        <h3>{props.title}</h3>
        <img src={props.imgLink ? props.imgLink : 'https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg'} />
      </div>
    </Link>
  );
}

export const Trends = () => {
  return (
    <div>
      <Navbar />
      <div className="page">
        <div className="page-content">
          <h1>View Trends</h1>
          <div className="trend-grid">
            <div className="trend-row">
              <TrendCard title="Top 50 Average Streams" linkTo="/q1" imgLink="https://media.istockphoto.com/id/1269732166/vector/vector-of-a-young-man-listening-to-the-music-with-headphones.jpg?s=612x612&w=0&k=20&c=dD3L7bMc-upx92zyHuBwaZG_OVEekdumN1lTCd50e4k="/>
              <TrendCard title="Genre Diversity" linkTo="/q2" imgLink="https://media.istockphoto.com/id/1288712636/vector/crowd-of-young-and-elderly-men-and-women-in-trendy-hipster-clothes-diverse-group-of-stylish.jpg?s=612x612&w=0&k=20&c=APKR2QKkQdmiNaAlU0JHm9yp9qFw-s6Uuo6hwptuHqA="/>
              <TrendCard title="American Pop Influence" linkTo="/q3" imgLink="https://www.paragkhanna.com/wp-content/uploads/2020/07/empire.png"/>
            </div>
            <div className="trend-row">
              <TrendCard title="Song Characteristics" linkTo="/q4" imgLink="https://thumbs.dreamstime.com/b/music-party-kawaii-design-musical-instruments-symbols-objects-cartoon-style-74810911.jpg"/>
              <TrendCard title="Artist Something" linkTo="/q5" imgLink="https://i.pinimg.com/736x/09/f1/3a/09f13ab59057807269b9b0a0e92029e6.jpg"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
