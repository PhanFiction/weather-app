import { createSlice } from "@reduxjs/toolkit";
import service from "../services/service";

const weatherInfoSlice = createSlice({
  name: 'weather',
  initialState: [],
  reducers: {
    setForecast(state, action){
      return {
        ...state,
        forecast: action.payload,
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

export const initializeWeather = () => {
  return async dispatch => {
    const defaultForecast = await service.getForecast('London');
    const defaultWeather = await service.getWeather('London');
    dispatch(setForecast(defaultForecast));
    dispatch(setWeather(defaultWeather));
  }
}

export const { setForecast, setWeather } = weatherInfoSlice.actions;
export default weatherInfoSlice.reducer;