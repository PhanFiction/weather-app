import { createSlice } from "@reduxjs/toolkit";
import service from "../services/service";

const weatherInfoSlice = createSlice({
  name: 'weather',
  initialState: [],
  reducers: {
    setDailyForecast(state, action){
      console.log(action.payload);
      return {
        ...state,
        dailyForecast: action.payload,
      }
    },
    setHourlyForecast(state, action){
      return {
        ...state,
        hourlyForecast: action.payload,
      }
    },
    setWeather(state, action) {
      return {
        ...state,
        weather: action.payload,
      }
    }
  }
})

export const filterForecast = (obj) => {
  if(obj ===  undefined || obj === null) return;
  let filterObj = {};
  obj.list.map(item => {
    let splitDate = item.dt_txt.split(" ")[0]
    if(!filterObj[splitDate]) filterObj[splitDate] = item;
  })
  return Object.values(filterObj)
}

// get weather at the start when page loads
export const initializeWeather = () => {
  return async dispatch => {
    const defaultForecast = await service.getForecast('London');
    const defaultWeather = await service.getWeather('London');
    const defaultForecastFiltered = filterForecast(defaultForecast);

    dispatch(setDailyForecast(defaultForecastFiltered));
    dispatch(setHourlyForecast(defaultForecast));
    dispatch(setWeather(defaultWeather));
  }
}

export const { setDailyForecast, setWeather, setHourlyForecast } = weatherInfoSlice.actions;
export default weatherInfoSlice.reducer;