import { useEffect, useState } from "react";
import fetchCountries from "../services/fetchCountries";
import filterCountries from "../services/filterCountries";
import fetchWetherApi from "../services/fetchWetherApi";

const DisplayCountry = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [searchTerm, setSearchedTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    fetchCountries.getAll().then((countries) => {
      setAllCountries(countries);
    });
  }, []);

  useEffect(() => {
    const filtered = filterCountries.filter(searchTerm, allCountries);
    setFilteredCountries(filtered); // i know there is an alternative fix for this by deriving this but i do not want to use something i don't know yet
    if (filtered.length === 1) {
        const country = filtered[0]
        fetchWetherApi.getWeatherByCity(country.capital).then(weather => setWeather(weather))
    } else {
        setWeather(null)
    }
  }, [searchTerm, allCountries]);

  const handleSearchTermChange = (event) => {
    setSearchedTerm(event.target.value);
  };

  const handleClickShowButton = (event) => {
      setSearchedTerm(event.target.id)
    };

  return (
    <>
      <input
        onChange={handleSearchTermChange}
        value={searchTerm}
        placeholder="search for a country"
      ></input>
      {searchTerm && filteredCountries.length === 0 && <p>No match found</p>}
      {filteredCountries.length >= 10 && (
        <p>Too many matches, specify another filter</p>
      )}
      {filteredCountries.length > 1 && filteredCountries.length < 10 && (
        <ul>
          {filteredCountries.map((country) => (
            <>
              <li key={country.name.common}>{country.name.common}</li>
              <button id={country.name.common} onClick={handleClickShowButton}>show</button>
            </>
          ))}
        </ul>
      )}
      {filteredCountries.length === 1 &&
        searchTerm &&
        filteredCountries.map((country) => (
          <div key={country.name.common}>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital}</p>
            <p>Area {country.area} </p>
            <h2>Languages</h2>
            {Object.keys(country.languages).map((language) => (
              <p key={language}>{country.languages[language]}</p>
            ))}
            <img
              src={country.flags.png}
              alt={`flag of ${country.name.common}`}
            />
          </div>
        ))}
      {weather && (
        <div>
          <h2>Weather in {filteredCountries[0]?.capital?.[0]}</h2>
          <p>Temperature: {weather.current_weather.temperature}°C</p>
          <p>Wind Speed: {weather.current_weather.wind_speed} km/h</p>
        </div>
      )}
    </>
  );
};

export default DisplayCountry;
