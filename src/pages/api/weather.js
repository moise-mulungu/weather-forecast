
import axios from 'axios';

const fetchWeather = async (req, res) => {
  const { city } = req.query // Get the city parameter from the query string

  console.log('is city undefined:', { city })
  
  const isNotDefined = !city
  console.log('is undefined:', { isNotDefined })

  if (isNotDefined) {
    // return res.status(400).json({ error: 'City is not provided' })
    return res.status(400).send('Bad Request: city not specified')
  }
  // OpenWeatherMap Current-weather-data API documentation: https://openweathermap.org/current
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`
  console.log({ apiUrl })

  try {
    const response = await axios.get(apiUrl)
    const data = response.data
    console.log({ data })
    res.status(200).json(data)
  } catch (error) {
    /* 

2023-10-20 debugging notes:

* i tried to analyze the "axioserror {message: 'request failed with status code 500', name: 'axioserror', code: 'err_bad_response', config: {…}, request: xmlhttprequest, …}" error.
  * DM: how did you try to analyze it? The above line doesn't give me any information at all, so it does not help me to help you.

* i used this prompt: "AxiosError {message: 'Request failed with status code 500', name: 'AxiosError', code: 'ERR_BAD_RESPONSE', config: {…}, request: XMLHttpRequest, …}
  * DM: was there any useful info in the AI response? If not, tell me here. Again, the above detail of your work is useless to me as it gives me no actionable information with which to help you.
  * DM: If asking AI is how you analyzed it, remember to not to over-depend on AI. AI is not a replacement for your own thinking. AI is a tool to help you think, but you still have to do the thinking.
  * DM: in your prompt, there is not enough context for AI to give you anything but a very generic answer. So it's good you tried it, but keep in mind that the suggestions will be very generic/vague and may even be wrong. For this bug, I would not ask AI any more. 

* i have the assumption that the error is not from the code but from the OpenWeatherMap's server side that has restrictions on the my rate limit or i am sending the request in a format it's not expecting.
  * DM: good! You told me your thinking, so I can help you!
  * DM: the 2nd assumption is a good assumption. How will you further investigate? 

* i tried to read the OpenWeatherMap API documentation to find if they mention some restrictions related to the fetch data method, but i did not find any: https://openweathermap.org/current
  * DM: it is good that you read the API documentation, but since you didn't see a solution there you'll have to look elsewhere. But keep in mind that reading the docs is often a last step, only if other debugging methods don't work. Reading docs is a very difficult/slow way to figure out a problem, so you should look for other possible causes of the error first.

* i paused again there.
*/

    // this is "server-side" code, so the console.error will be in the terminal, not in the browser
    console.error({ error, errorMessage: error.message })
    // DM: I added error message so that you can see what the error is in the browser at http://localhost:3005/api/weather?city=London
    // DM: I see mention of EAI_AGAIN in the error message
    // DM: you can google, or look at the openweathermap web site for the meaning of EAI_AGAIN code
    // DM: check that you're calling the api here exactly as you are calling it in the browser
    res.status(500).json({ error: 'Unable to fetch weather data', message: error.message })
  }
}
export default fetchWeather;

/*
Sider prompt: how to make an API route in NextJS:
  1. to create a new file "weather.js" in src/pages/api/ directory
  2. to add the provided code
  3. to replace "YOUR_API_KEY" with my actual OpenWeatherMap API key
  4. to replace the fetchWeatherData function in src/features/weather-forecast/axios/weather.js  with the provided code
  5. to import the fetchWeatherData function in the src/features/weather-forecast/axios/index.js and add it to the axios object
  6. Replace "YOUR_API_KEY" with your actual OpenWeatherMap API key
  7. test on the browser by making a request to http://localhost:3005/api/weather?city=London
   
* i order to keep the API key secret, i first started moving it into .env.local file and used in the src/pages/api/weather.js file by using process.env.[API_KEY] object.
  * i used this SiderAI prompt for more clarity "is this declaration correct when using a secret code in the .env.local: const API_KEY = process.env.MY_API_KEY" 
  * the answer was: "The declaration is correct assuming that the `MY_API_KEY` variable is defined in the `.env.local` file and contains the actual API key as its value. The `process.env` object in Node.js is used to access environment variables, which are set in the `.env.local` file. When you define an environment variable in the `.env.local` file, you can access its value in your code using the `process.env` object. So, in this case, the `API_KEY` constant is being assigned the value of the `MY_API_KEY` environment variable using the `process.env` object."

 * Sider prompt: "what is the better way to declare a variable that holds an API key used in the .env.local file in NextJS project?"
   * answer: 
     1. Install the dotenv package by running the following command in your project directory: `npm install dotenv` 
     2. Create a .env.local file in the root of your Next.js project. Add the following line to the .env.local file, replacing YOUR_API_KEY with your actual API key: NEXT_PUBLIC_API_KEY=YOUR_API_KEY. 
     3. It's recommended to prefix your environment variables with NEXT_PUBLIC_ to make them available on the client-side as well. (DM: no, it is not a secret if it is in the code that runs in the client!)
     4. In your Next.js code, require the dotenv package and call the config() method to load the environment variables from the .env.local file. Add the following lines at the top of your next.config.js file: `require('dotenv').config()`

   * i did not install dotenv dependencies because they were already installed. so i just changed the name "OPEN_WEATHER_MAP_API_KEY" to "NEXT_PUBLIC_API_KEY" variable in the .env.file.
   * i reverted the NEXT_PUBLIC_API_KEY to OPEN_WEATHER_MAP_API_KEY variable
* i paused there after many unsuccess attempts. the code is in the src/features/weather-forecast/axios/weather.js file

* TabNine prompt: "what is the better way to declare a variable that holds an API key used in the .env.local file in NextJS project?"
   * answer: 
     1. Install the dotenv package by running the following command in your project directory: `npm install dotenv` 
     2. Create a .env.local file in the root of your Next.js project. Add the following line to the .env.local file, replacing YOUR_API_KEY with your actual API key: NEXT_PUBLIC_API_KEY=YOUR_API_KEY. 
     3. It's recommended to prefix your environment variables with NEXT_PUBLIC_ to make them available on the client-side as well. (DM: no, it is not a secret if it is in the code that runs in the client!)
     4. In your Next.js code, require the dotenv package and call the config() method to load the environment variables from the .env.local file. Add the following lines at the top of your next.config.js file: `require('dotenv').config()`

*/
/*
    Sider prompt: why am i getting "AxiosError: Request failed with status code 500" in this code
    * answer:
      A 500 error indicates a server-side issue, suggesting a problem with the server the request is being sent to, not your application itself.

      In this case, you're trying to request data from the OpenWeather API and the request failed. Here are a couple possible issues:

        1. The API endpoint you're trying to reach might be down or having some issues. To check, try accessing the URL directly in your browser or in tools like Postman.

        2. The OpenWeatherMap API Key is missing, or invalid: Check the `process.env.OPEN_WEATHER_MAP_API_KEY` in your environment variables. Ensure it's present and correct. 

        3. Incorrect city name or the OpenWeatherMap API doesn't have data for the given city name. Ensure you are passing a valid city name.

        4. Make sure there are no restrictions set in OpenWeatherMap API in terms of the number of requests per day or for specific IP addresses.

      It's also good practice to log your errors for better debugging. In your catch block, you can do `console.error(error.response)` or `console.error(error.request)` to get more details about the issue.

      Consider contacting OpenWeather's support if you're continuing to receive this error as it might be an issue on their end.

      blockers: i tried to change the fetchWeatherData function from the src/features/weather-forecast/weather.js and the async function in this file, but the error still persists.

   * i attempted to fix the "Unhandled Runtime Error : AxiosError: Request failed with status code 500"  with this Sider prompt: "how to fix: Unhandled Runtime Error : AxiosError: Request failed with status code 500".
      * i searched for probable restrictions suggested in the Sider AI prompt response of "Make sure there are no restrictions set in OpenWeatherMap API in terms of the number of requests per day or for specific IP addresses"
        * i read the page related to the use of the open-weather-map-api(https://openweathermap.org/api/one-call-3), and i am not sure if the free plan that has some restrictions that cause the "Unhandled Runtime Error : AxiosError: Request failed with status code 500" error 
        * blockers: the error persisted after trying all the approaches. all details are in the src/features/weather-forecast/weather-forecast-contents/weather.jsx file.
        * DM: fix the API first, so look at http://localhost:3005/api/weather?city=London and debug this code in this file first, before you try to use it in the client code. 
      * I paused there.
      * 
 Sider prompt: AxiosError {message: 'Request failed with status code 500', name: 'AxiosError', code: 'ERR_BAD_RESPONSE', config: {…}, request: XMLHttpRequest, …} for this code:

 The error 'Request failed with status code 500' is a server error indicating that your server encountered an unexpected condition that prevented it from fulfilling the request by the client.

  Your code is fine, and the error is most probably not from your end but from the server side. It's probably that OpenWeatherMap's server is down or it's not capable of handling the request at the moment, or even your API key is invalid or expired. 

    You can check a few things:

    1. Ensure the API key (`process.env.OPEN_WEATHER_MAP_API_KEY`) is correct and not expired/revoked.

    2. Confirm that the OpenWeatherMap API you are calling is up and functioning correctly. You can do this by taking the apiUrl and pasting it directly into your web browser and seeing if it returns the expected results.

    3. Make sure city from `req.query` is valid and spelled correctly. The API will throw an error if the city is not recognized.

    4. Sometimes, APIs don't allow certain types of requests or have rate limits, which might be causing the issue. Check the OpenWeatherMap API documentation to ensure you haven't exceeded their rate limit or are sending the request in a format it's not expecting.
}


export default async (req, res) => {
  const { city } = req.query

  if (!city) {
    return res.status(400).json({ error: 'City is not provided' });
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`
  
  try {
    const response = await axios.get(apiUrl)
    const data = response.data
    res.status(200).json(data)
  } catch (error) {
    console.error({error, errorMessage: error.message})
    res.status(500).json({ error: 'Unable to fetch weather data', message: error.message })
  }
}

    */
