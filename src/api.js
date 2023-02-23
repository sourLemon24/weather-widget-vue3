import axios from 'axios'

const apiKey = process.env.VUE_APP_API_KEY
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather'

export const getWeatherByCoords = ({ lat, lon }) => axios(`${ apiUrl }?lat=${ lat }&lon=${ lon }&appid=${ apiKey }&units=metric`)

export const fetchWeather = (v) => axios(`${ apiUrl }?q=${ v }&appid=${ apiKey }&units=metric`)