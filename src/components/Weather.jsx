import React, {useEffect, useState} from 'react';

export default function Weather({ city })
{
    if(city.length === 0) city = "london";
    const [weather, setWeather] = useState({});

    if(weather & Object.keys(weather).length === 0 || weather.weather === undefined){
      setWeather('London');
    }

    return(
      <>
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
      </>
    )
}