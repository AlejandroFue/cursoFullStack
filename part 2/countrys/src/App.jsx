import { useState, useEffect } from 'react'
import countryService from './services/countrys'
import weatherService from './services/weather'

const Search = (props) => <div><label>Find Countrys: </label><input value={props.busqueda} onChange={props.event} /></div>
const Country = (props) => <li>{props.country.name.common} <button onClick={props.clickShow}>Show</button></li>
const UniqueCountry = (props) => {
  console.log(props)
  const { country, weather } = props;
  return (
    <div>
      <h2>{props.country.name.common}</h2>
      <p>Capital: {props.country.capital[0]}</p>
      <p>Area: {props.country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(props.country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img src={props.country.flags.png} />
      <h2>Weather in {props.country.capital[0]}</h2>
      {weather ? (
        <div>
          <p>Temperature: {(weather.main.temp - 273.15).toFixed(2)}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  )
}

function App() {
  const [countrys, setCountrys] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    countryService
      .getAll()
      .then(countryIniciales => {
        setCountrys(countryIniciales)
        console.log(countryIniciales)
      })
  }, [])

  const handleBusquedaChange = (event) => {
    setBusqueda(event.target.value);
  };

  const clickShowOf = name => {
    setBusqueda(name);
  }

  var countrysToShow = busqueda.trim() ? countrys.filter((country) => country.name.common.toLowerCase().includes(busqueda.toLowerCase())) : countrys;
  const selectedCountry = countrysToShow.length === 1 ? countrysToShow[0] : null;

  useEffect(() => {
    if (selectedCountry) {
      const capital = selectedCountry.capital[0];
      console.log(capital)
      weatherService
        .getWeather(capital)
        .then((weatherData) => {
          setWeather(weatherData);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setWeather(null);
    }
  }, [selectedCountry]);

  const message = "Too many matches, specify another filter";

  return (
    <div>
      <Search busqueda={busqueda} event={handleBusquedaChange} />

      {countrysToShow.length > 10 ? (
        <div>{message}</div>
      ) : countrysToShow.length === 1 ? (
        <UniqueCountry country={countrysToShow[0]} weather={weather} />
      ) : (
        <ul>
          {countrysToShow.map(country => (
            <Country key={country.name.common} country={country} clickShow={() => clickShowOf(country.name.common)} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
