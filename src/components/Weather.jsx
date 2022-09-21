import React, { useState } from 'react';
import { connect } from 'react-redux';
import './Weather.css';


function Weather(props) {
  const { weather } = props;
  if(weather === undefined) return (<></>)
  console.log(weather);

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;

  return(
    <>
      <div className="weather-container">
        <div>
          <h1>{weather.name}</h1>
          <h3>{today}</h3>
          {weather.weather.map(c => 
            <p className="todayWeather" key={c.main}>
              <img key={c.id} src={`http://openweathermap.org/img/wn/${c.icon}@2x.png`} alt="icon"/>
            </p>)
          }
          <p className="fahrenheit">{Math.round(((weather.main.feels_like - 273.15) * 9/5 + 32))}{'°F'}</p>
        </div>
        <div>
          <ul className="weather-info">
            <li>
              <div className="info">
                <img src="http://openweathermap.org/img/wn/50d@2x.png" alt="icon" className='icon'/>
                <p>Feels like</p>
              </div> 
              {Math.round(((weather.main.feels_like - 273.15) * 9/5 + 32))}{'°F'}
            </li>
            <li>
              <div className="info">
                <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="icon" className='icon'/>
                <p>Wind speed</p>
              </div> 
              { weather.wind.speed } m/s
            </li>
            <li>
              <div className="info">
                <img src="http://openweathermap.org/img/wn/04d@2x.png" alt="icon" className='icon'/>
                <p>Humidity</p>
              </div> 
              {weather.main.humidity} %
            </li>
          </ul>
        </div>
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