import { useEffect, useState } from "react";
import fetchCountries from "../services/fetchCountries";
import filterCountries from "../services/filterCountries";

const DisplayCountry = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [searchTerm, setSearchedTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    fetchCountries.getAll().then((countries) => {
      setAllCountries(countries);
    });
  }, []);

  useEffect(() => {
    const filtered = filterCountries.filter(searchTerm, allCountries);
    setFilteredCountries(filtered); // i know there is an alternative fix for this by deriving this but i do not want to use something i don't know yet
  }, [searchTerm, allCountries]);

  const handleSearchTermChange = (event) => {
    setSearchedTerm(event.target.value);
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
            <li key={country.name.common}>{country.name.common}</li>
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
            <img src={country.flags.png} alt={`flag of ${country.name.common}`} />
          </div>
        ))}
    </>
  );
};

export default DisplayCountry;
