import React, {useEffect, useState} from 'react';

function filterList(items)
{
    if(items === undefined) return;
    let arr = []
    for(let i = 6; i < items.length; i+= 8)
    {
        arr.push(items[i]);
    }
    return arr;
}

export default function Forecast({city})
{
    if(city.length === 0) city ="london";

    const [foreList, forecastList] = useState([]);


    console.log(foreList);

    const randomNum = () => {
        return Math.random() * 100;
    }

    const getImage = (items) => {
        const id = items.map(item => item.icon);
        return <img key={randomNum()} src={`http://openweathermap.org/img/wn/${id}@2x.png`} alt="icon"/>;
    }

    const displayDate = (date) => {
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let d = new Date(date);
        return days[d.getDay()];
    }

    const displayTemp = (temp) => {
        return Math.round(((temp - 273.15) * 9/5) + 32)
    }

    
    if(foreList === 0 || foreList === undefined)
    {
        return(
            <>
            </>
        );
    }

    // filter the forecast list to only 6 days
    return(
        <div className="forecast-container">
            {foreList.map(x => 
            <p className="forecast-box" key={randomNum()}>
                {displayDate(x.dt_txt)}
                {getImage(x.weather)}
                {displayTemp(x.main.feels_like)} °F
            </p>
            )}
        </div>
    )
}