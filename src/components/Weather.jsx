import React, { useState } from 'react';
import { connect } from 'react-redux';
import './Weather.css';

function Weather(props) {
  const { weather } = props;
  if(weather === undefined) return (<></>)
  console.log(weather);

  /*
      <h1>{weather.name}</h1>
      <div className="weather-container">
        {weather.weather.map(c => 
          <p className="todayWeather" key={c.main}>
            <img key={c.id} src={`http://openweathermap.org/img/wn/${c.icon}@2x.png`} alt="icon"/>
            {c.description}
          </p>)
        }
        <div className="weather-info">
          <p>{Math.round(((weather.main.feels_like - 273.15) * 9/5 + 32))}{'°F'}</p>
          <p>wind { weather.wind.speed } m/s</p>
          <p>humidity {weather.main.humidity} % </p>
        </div>
      </div>
  */
  return(
    <>
      <div className="weather-container">
        <h1>{weather.name}</h1>
        {weather.weather.map(c => 
          <p className="todayWeather" key={c.main}>
            <img key={c.id} src={`http://openweathermap.org/img/wn/${c.icon}@2x.png`} alt="icon"/>
            {c.description}
          </p>)
        }
        <ul className="weather-info">
          <li>{Math.round(((weather.main.feels_like - 273.15) * 9/5 + 32))}{'°F'}</li>
          <li>wind { weather.wind.speed } m/s</li>
          <li>humidity {weather.main.humidity}%</li>
        </ul>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    weather: state.openWeather.weather,
  }
}

const ConnectedApp = connect(
  mapStateToProps,
)(Weather);

export default ConnectedApp;