import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = () => {
  const [weather, setWeather] = useState({})
  const [city, setCity] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [degree, setDegree] = useState('fahrenheit')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    fetchWeatherData()
  }, [city])

  const fetchWeatherData = async (city) => {
    console.log('city value:', { city })

    if (city) {
      try {
        const response = await axios.get(`/api/weather?city=${city}`)

        setWeather(response.data)
        setErrorMessage('')
      } catch (error) {
        console.error(error, error.message)

        setWeather({})

        const errorResponse = error.response
        console.log({ errorResponse })

        const errorResponseData = errorResponse.data
        console.log({ errorResponseData })

        const errorResponseDataMessage = errorResponseData.message
        console.log({ errorResponseDataMessage })

        if (errorResponse?.data?.message === 'city not found') {
          setErrorMessage(`"${city}" not found`)
        } else {
          setErrorMessage('The city name is not recognized. Please enter a valid name.')
        }
      }
      console.log('axios-value:', {
        axios,
      })
    } else {
      console.log('Please enter a city name')
    }
  }

  const convertFahrenheitToCelsius = (fahrenheit) => {
    console.log('convertFahrenheitToCelsius:', { fahrenheit })

    const celsius = ((fahrenheit - 32) * 5) / 9
    const celsiusRounded = Math.round(celsius)
    console.log('convertFahrenheitToCelsius:', { celsius, celsiusRounded })
    return celsiusRounded
  }

  const handleCityChange = (e) => {
    setCity(e.target.value)
  }

  const handleButtonClick = () => {
    setModalOpen(true)
    fetchWeatherData(city)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const handleDegreeChange = (e) => {
    setDegree(e.target.value)
  }
  const calculatedTemp =
    degree === 'celsius' ? convertFahrenheitToCelsius(weather.main?.temp) : weather.main?.temp
  console.log({ weatherMainTemp: weather.main?.temp, degree, calculatedTemp })
  return (
    <div className="flex-grow bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="flex mb-0">
          <input
            type="text"
            className="border border-gray-300 rounded-l py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            placeholder="Enter city"
            value={city}
            onChange={handleCityChange}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white ml-1 py-2 px-4 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleButtonClick}
          >
            Get Weather
          </button>
        </div>
        <div className="flex justify-center mt-4 items-center">
          <input
            type="radio"
            id="celsius"
            name="degree"
            value="celsius"
            checked={degree === 'celsius'}
            onChange={handleDegreeChange}
          />
          <label htmlFor="celsius" className="ml-2 mr-4">
            Celsius
          </label>
          <input
            type="radio"
            id="fahrenheit"
            name="degree"
            value="fahrenheit"
            checked={degree === 'fahrenheit'}
            onChange={handleDegreeChange}
          />
          <label htmlFor="fahrenheit" className="ml-2">
            Fahrenheit
          </label>
        </div>
        {errorMessage && <div className="mt-4 text-center text-red-600">{errorMessage}</div>}
        {modalOpen && !errorMessage && (
          <div className={`fixed inset-12 grid place-items-center`}>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <p className="text-gray-800 text-lg font-semibold mb-4">Weather Information</p>

              {weather ? (
                <>
                  <p>Temperature: {calculatedTemp}</p>
                  <p>
                    Approximate: (
                    {degree === 'celsius'
                      ? convertFahrenheitToCelsius(weather.main?.feels_like)
                      : weather.main?.feels_like}
                    °{degree.toLowerCase()})
                  </p>
                  <p>Humidity: {weather.main?.humidity}%</p>
                  <p>Description: {weather.weather?.[0]?.description}</p>
                  <p>Wind Speed: {weather.wind?.speed} mph</p>
                  <p>Country:{weather.sys?.country}</p>
                </>
              ) : (
                <p>No weather data available</p>
              )}

              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default Weather
