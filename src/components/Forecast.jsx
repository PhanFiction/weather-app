import React, { useState } from 'react';
import { connect } from 'react-redux';
import './Forecast.css';

const padTo2Digits = (num) => num.toString().padStart(2, '0');

const displayDate = (date) => {
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let d = new Date(date);
  return days[d.getDay()];
}

const displayTime = (date) => {
  let d = new Date(date);
  let seconds = Math.floor(d / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = seconds >= 30 ? minutes + 1 : minutes;
  minutes = minutes % 60;
  hours = hours % 24;

  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
}


function Forecast(props) {
  const { dailyForecast, hourlyForecast } = props;
  const [infoDate, switchInfoDate] = useState('daily');
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(6);

  const generateRandNum = () => Math.random() * 100;

  const getImage = (items) => {
    const id = items.map(item => item.icon);
    return <img key={generateRandNum()} src={`http://openweathermap.org/img/wn/${id}@2x.png`} alt="icon"/>;
  }

  const displayTemp = (temp) => Math.round(((temp - 273.15) * 9/5) + 32)

  if(dailyForecast === undefined) return (<></>);
  if(hourlyForecast === undefined) return (<></>);

  const handleSwitch = (infoName) => switchInfoDate(infoName);

  const handleLeftRightInfo = (direction) => {
    if(direction === 'left' && left > 0) {
      const goLeft = left - 1;
      const goRight = right - 1;
      setLeft(goLeft);
      setRight(goRight);
    }else if(direction === 'right' && right < hourlyForecast.list.length){
      const goLeft = left + 1;
      const goRight = right + 1;
      setLeft(goLeft);
      setRight(goRight);
    }
    console.log(hourlyForecast.list.length);
  }

  return(
    <div className="forecast-container">
      <div>
        <button className="btn" onClick={()=>{handleSwitch('daily')}}>Daily</button>
        <button className="btn" onClick={()=>{handleSwitch('hourly')}}>Hourly</button>
        {
          infoDate === 'hourly' 
          ? 
          <>
            <button className="btn" onClick={()=>{handleLeftRightInfo('left')}}>&#60;</button>
            <button className="btn" onClick={()=>{handleLeftRightInfo('right')}}>&#62;</button>
          </>
          : <></>
        }
      </div>
      <div className='forecast-info'>
        {
          infoDate === 'daily' ?
          dailyForecast.map(x => 
            <p className="forecast-box" key={generateRandNum()}>
              {displayDate(x.dt_txt)}
              {getImage(x.weather)}
              {displayTemp(x.main.feels_like)} °F
            </p>
          )
          :
          hourlyForecast.list.slice(left, right).map(x => 
            <p className="forecast-box" key={generateRandNum()}>
              {displayTime(x.dt_txt)}
              {getImage(x.weather)}
              {displayTemp(x.main.feels_like)}°F
            </p>
          )
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    dailyForecast: state.openWeather.dailyForecast,
    hourlyForecast: state.openWeather.hourlyForecast,
  }
}

const ConnectedApp = connect(
  mapStateToProps,
)(Forecast);

export default ConnectedApp;