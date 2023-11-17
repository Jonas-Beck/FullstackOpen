import axios from "axios"

const API = import.meta.env.VITE_OPENWEATHER_KEY

const baseUrl = "https://api.openweathermap.org/data/2.5/"

const getWeather = (lat, lon) => {
    const request = axios.get(`${baseUrl}weather?lat=${lat}&lon=${lon}&appid=${API}&units=metric`)
    return request.then((response) => response.data)
}

export default { getWeather }
