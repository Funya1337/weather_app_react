import React from 'react';
import {
  LineChart, Line, XAxis, Tooltip, Legend,
} from 'recharts';
// let date1 = Object.values(this.props.dateArr)[0];
// let date2 = Object.values(this.props.dateArr)[1];
// let date3 = Object.values(this.props.dateArr)[2];
// let date4 = Object.values(this.props.dateArr)[3];
// let date5 = Object.values(this.props.dateArr)[4];
class WeatherDiagram extends React.Component {
	render() {
    let locationArr = this.props.dateArr;
    let weatherArr = this.props.fiveDaysWeatherData;
    let maxWeatherArr = this.props.fiveDaysMaxWeather;
    const data = [
      {
        name: locationArr[0], humidity: maxWeatherArr[0], temp: weatherArr[0], amt: 70,
      },
      {
        name: locationArr[1], humidity: maxWeatherArr[1], temp: weatherArr[1], amt: 70,
      },
      {
        name: locationArr[2], humidity: maxWeatherArr[2], temp: weatherArr[2], amt: 70,
      },
      {
        name: locationArr[3], humidity: maxWeatherArr[3], temp: weatherArr[3], amt: 70,
      },
      {
        name: locationArr[4], humidity: maxWeatherArr[4], temp: weatherArr[4], amt: 70,
      },
    ];
		return (
			<div>
			<center>
			<LineChart
	width={500}
	height={300}
	data={data}
	margin={{
		top: 5, right: 30, left: 20, bottom: 5,
	}}
>
<XAxis dataKey="name"/>
	<Tooltip />
	<Legend />
	<Line yAxisId="left" type="monotone" dataKey="temp" stroke="#7D4CDB" activeDot={{ r: 8 }} />
	<Line type="monotone" dataKey="humidity" stroke="#6FFFB0" />
</LineChart>
</center>
			</div>
		)
	}
}

export default WeatherDiagram;
