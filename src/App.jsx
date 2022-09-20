import React from "react";
import { setDailyForecast, setHourlyForecast, setWeather, initializeWeather } from "./reducers/serviceReducer";
import service from "./services/service";
import { connect } from 'react-redux';
import Forecast from './components/Forecast.jsx'
import InputCity from "./components/InputCity.jsx";
import Weather from "./components/Weather.jsx";
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      city: '',
    }
    this.handleCityChange = this.handleCityChange.bind(this);
  }

  componentDidMount(){
    this.props.initializeWeather();
  }

  getCityInfo = async () => {
    const { city } = this.state;
    const cityWeather = await service.getForecast(city);
    const cityForecast = await service.getWeather(city);
    this.props.setDailyForecast(cityForecast);
    this.props.setHourlyForecast(cityForecast);
    this.props.setWeather(cityWeather);
  }

  handleCityChange(event){
    this.setState(_state => {
      return {
        city: event.target.value,   
      }
    })
  }

  render(){
    const { city } = this.state;
    return(
      <div className="container">
        <div className="overlay">
          <InputCity value={city} handleInput={this.handleCityChange} handleSubmit={this.getCityInfo}/>
          <Weather />
          <Forecast />
        </div>
      </div>
    )
  }
}

// handle dispatching actions
const mapDispatchToProps = {
  setDailyForecast,
  setWeather,
  initializeWeather,
}

const ConnectedApp = connect(
 null,
 mapDispatchToProps,
)(App);

export default ConnectedApp;