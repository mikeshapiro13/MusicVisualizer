import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

export const getMonthFromWeek = (weekNumber) => {
  const firstDayOfYear = new Date(new Date().getFullYear(), 0, 1);
  const weekStart = (weekNumber - 1) * 7;
  const weekFirstDay = new Date(firstDayOfYear.getTime() + weekStart * 86400000);
  return weekFirstDay.toLocaleString('default', { month: 'short' });
}
const Graph = (props:any) => {
  return (
    <>
      {props.data ?
        (
          <LineChart width={1000} height={350} data={props.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={props.keyX} />
            <YAxis domain={props.range || ['auto', 'auto']} />
            <Tooltip  wrapperStyle={{width:'50%'}} />
            <Legend />
            <Line type="monotone" dataKey={props.keyY} name={props.name} stroke="#8884d8" activeDot={{ r: 12 }} />
            {props.keyY2 && 
              <Line type="monotone" dataKey={props.keyY2} name={props.name2} stroke="#84d888" activeDot={{ r: 12 }} floodColor={'#8884d8'}/>
            }
          </LineChart>
        )
        :
        <h2 className="blink_me">Loading Data...</h2>
      }
    </>

  );
} 
export default Graph;