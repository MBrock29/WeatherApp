import React, { useState } from 'react';
import moment from 'moment'

const api = {
  key: "f617c4a88f97c16f38a51f1e5a5b7a7c",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [instruction, setInstruction] = useState(true)

function display() {
  if (instruction) {
    return "Enter location"
  }
  return "Location entered"
}

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          setInstruction(false)
          console.log(result);
        });
    }
  }

  console.log(instruction)

 

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app warm'}>
      <main>
    
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Enter location here..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{moment().format('MMMM Do YYYY, h:mm:ss a')}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;