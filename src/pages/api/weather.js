import axios from 'axios'

const fetchWeather = async (req, res) => {
  const { city } = req.query

  console.log('is city undefined:', { city })

  const isNotDefined = !city
  console.log('is undefined:', { isNotDefined })

  if (isNotDefined) {
    return res.status(400).send('Bad Request: city not specified')
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`
  console.log({ apiUrl })

  try {
    const response = await axios.get(apiUrl)
    const data = response.data
    console.log({ data })
    res.status(200).json(data)
  } catch (error) {
    console.error({ error, errorMessage: error.message })

    res.status(500).json({ error: 'Unable to fetch weather data', message: error.message })
  }
}
export default fetchWeather
