import { configureStore } from '@reduxjs/toolkit'
import serviceReducer from '../src/reducers/serviceReducer'

export default configureStore({
  reducer: {
    openWeather: serviceReducer,
  },
})