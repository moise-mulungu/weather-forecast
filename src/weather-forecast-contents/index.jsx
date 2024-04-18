import axios from 'axios'
import Weather from './weather'
import WeatherForecastFooter from './weather-forecast-footer'
import { fetchWeatherData } from './weather'

const WeatherForecastContents = () => {
  axios.fetchWeatherData = fetchWeatherData
  return (
    <div className="flex flex-col h-screen bg-gray-500">
      <header className="bg-blue-500 py-4">
        <h1 className="text-white text-2xl font-bold text-center sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-5xl">
          Weather Forecast
        </h1>
      </header>
      <Weather className="flex-grow" />
      <WeatherForecastFooter />
    </div>
  )
}
export default WeatherForecastContents
