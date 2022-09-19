import axios from 'axios';
const apiKey = process.env.API_KEY;
const url = 'https://api.openweathermap.org/data/2.5/';


const getWeather = async (city) => {
  const res = await axios.get(`${url}/weather?q=${city}&appid=${apiKey}`);
  return res.data;
}

const getForecast = async (city) => {
  const res = await axios.get(`${url}/forecast?q=${city}&appid=${process.env.API_KEY}`);
  return res.data;
}

export default {
  getWeather,
  getForecast,
}