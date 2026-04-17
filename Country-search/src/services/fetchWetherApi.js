import geoLocalisation from "./geoLocalisationApi"

const BASE_URL = 'https://api.open-meteo.com/v1/forecast?current_weather=true'

const getWeather = (latitude, longitude) => {
    return fetch(`${BASE_URL}&latitude=${latitude}&longitude=${longitude}`).then(response => response.json())
}

const getWeatherByCity = (city) => {
    const location = geoLocalisation.getLocation(city)
    return location.then(location => {
        const { latitude, longitude } = location.results[0]
        return getWeather(latitude, longitude)
    })
}

export default { getWeatherByCity}