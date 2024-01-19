import { instance } from '@/api/instance'

const apiKey = process.env.VUE_APP_API_KEY

export default {
    getWeatherByLocationName: async (v) => instance.get(`?q=${ v }&appid=${ apiKey }&units=metric`),
    getWeatherByCoords: async (lat, lon) => instance.get(`?lat=${ lat }&lon=${ lon }&appid=${ apiKey }&units=metric`)
}