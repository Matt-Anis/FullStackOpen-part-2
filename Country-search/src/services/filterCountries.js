const filter = (searchTerm, allCountries) => {
    if (!searchTerm) return []

    const lowerSearchTerm = searchTerm.toLowerCase()

    return allCountries.filter((country) => {
        return searchInObject(country.name, lowerSearchTerm)
    })
}

const searchInObject = (object, searchTerm) => {
    if(object === null || object === undefined) return false

    if(typeof object === 'string') {
        return object.toLowerCase().includes(searchTerm)
    }

    if(typeof object === 'object') {
        return Object.values(object).some(value => searchInObject(value, searchTerm))
    }

    return false
}

export default {filter}