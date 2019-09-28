import React from 'react';
import Title from './components/Titles.jsx';
import WeatherDiagram from './components/WeatherDiagram.jsx';
import Forms from './components/Forms.jsx';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import textEn from './texten';
import textRu from './textru';

const API_KEY = '6e153b584a23d319eb7af56b9d83afe7';

function Test() {
  return <h2>Test message</h2>;
}

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			city: '',
			type: '',
			weatherDataState: '',
			dateArr: '',
			fiveDaysWeatherData: '',
			fiveDaysMaxWeather: ''
		};
	}
	fetchWeather = () => {
		const {city} = this.state;
		this.getLocation(city);
		this.getWeather(city);
		fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
		.then(res => res.json())
		.then((jsonData) => {
			let weatherData = Object.values(jsonData)[3]
			let typeweatherName = Object.values(jsonData)[1][0]
			let objectweatherType = Object.values(typeweatherName)[2]
			console.log(weatherData)
			this.setState({ weatherDataState: weatherData })
			this.setState({ type: objectweatherType })
		});
	}

	handleCityChange = (city) => {
		this.setState({ city })
	}

	getLocation = (city) => {
		fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${API_KEY}`)
		.then(res => res.json())
		.then((jsonData) => {
			let arr = []
			let fiveDaysLocation = Object.values(jsonData)[3];
			for (let i = 0; i <= 32; i+=8) {
				let zeroElement = Object.values(fiveDaysLocation)[i];
				let normalData = zeroElement.dt_txt;
				arr.push(normalData);
			}
			this.setState({dateArr: arr})
		})
	}

	getWeather = (city) => {
		fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${API_KEY}`)
		.then(res => res.json())
		.then((jsonData) => {
			let arr = [];
			let arr1 = [];
			let fiveDaysWeather = Object.values(jsonData)[3];
			for (let i = 0; i <= 32; i+=8) {
				let zeroElement = Object.values(fiveDaysWeather)[i];
				let result = Math.round(zeroElement.main.temp);
				arr1.push(zeroElement.main.humidity);
				arr.push(result);
			}
			this.setState({ fiveDaysWeatherData: arr });
			this.setState({ fiveDaysMaxWeather: arr1 });
		})
	}

	render() {
		return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="/en" />
            </Route>
            <Route path="/ru">
              <Title />
              <div style={{textAlign: "center"}}>
                <Link to="/en">EN</Link>
              </div>
              <Forms
                locale={textRu}
                onChange={this.handleCityChange}
                weatherDataFront={this.state.weatherDataState}
                handleCityChange={this.handleCityChange}
                type={this.state.type}
                city={this.state.city}
                cityText={this.cityText}
                fetchWeather={this.fetchWeather} />
              <WeatherDiagram
                fiveDaysMaxWeather={this.state.fiveDaysMaxWeather}
                fiveDaysWeatherData={this.state.fiveDaysWeatherData}
                dateArr={this.state.dateArr}/>
            </Route>
            <Route path="/en">
              <Title />
              <div style={{textAlign: "center"}}>
                <Link to="/ru">RU</Link>
              </div>
              <Forms
                locale={textEn}
                onChange={this.handleCityChange}
                weatherDataFront={this.state.weatherDataState}
                handleCityChange={this.handleCityChange}
                type={this.state.type}
                city={this.state.city}
                cityText={this.cityText}
                fetchWeather={this.fetchWeather} />
              <WeatherDiagram
                fiveDaysMaxWeather={this.state.fiveDaysMaxWeather}
                fiveDaysWeatherData={this.state.fiveDaysWeatherData}
                dateArr={this.state.dateArr}/>
            </Route>
          </Switch>
        </Router>
      </div>
    )
	}
}

export default App;
