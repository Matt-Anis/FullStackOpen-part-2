const BASE_URL = 'https://geocoding-api.open-meteo.com/v1/search'

const getLocation = (name) => {
    return fetch(`${BASE_URL}?name=${name}&limit=1`).then(response => response.json())
}

export default { getLocation }