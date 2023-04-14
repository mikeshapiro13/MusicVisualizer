import React, { useEffect, useState } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
const DATA = [
  {
    name: '2018',
    time: 150
  },
  {
    name: '2019',
    time: 182
  },

];



export const Query = (props: any) => {


  return (
    <LineChart
      width={500}
      height={300}
      data={DATA}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="time" name="Average Song Length" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
  )
}
