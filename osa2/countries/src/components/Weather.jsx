import axios from 'axios'
import { useState, useEffect } from 'react'

const Weather = ({matches}) => {
    const [weather, setWeather] = useState(null)
    
    useEffect(() => {
        if (!matches || matches.length != 1) return
        
        const country = matches[0]
        const baseURL = 'https://api.openweathermap.org/data/2.5/weather?q='
        const api = `&appid=${import.meta.env.VITE_WEATHER_API}`
        const city = country.capital[0]

        axios.get(`${baseURL}${city}${api}`)
            .then(res => setWeather(res.data))
            .catch(err => console.log(err))

    },[matches])
    
    console.log(weather)
    console.log('matches = ', matches)
    if(!matches || matches.length === 0 || (matches.length > 1)) return null
    if (weather === null) return <div>Weather loading...</div>

    const capital = matches[0].capital[0]
    const degrees = Math.round(weather.main['temp'] - 273.15)
    const iconCode = weather.weather[0]['icon'];
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    const wind = weather.wind['speed']
    return(
        <div>
            <h2>Weather in {capital}</h2>
            <p>Temperature {degrees} °C</p>
            <img src={iconUrl}></img>
            <p>Wind {wind} m/s</p>
        </div>
    )
}

export default Weather