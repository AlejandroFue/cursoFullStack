import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?'
const key = import.meta.env.VITE_WEATHER_API_KEY

//https://api.openweathermap.org/data/2.5/weather?q=Santiago&appid={token}

const getWeather = (ciudad) => {
  const url = baseUrl + "q=" + ciudad + "&appid=" + key
  const request = axios.get(url)
  return request.then(response => response.data)
}

export default { getWeather }