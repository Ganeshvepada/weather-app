import React, { useState, useEffect } from 'react';
import WeatherCard from './WeatherCard';
import './WeatherForecast.css'; // Import your CSS file for styling

const WeatherForecast = () => {
  const [city, setCity] = useState('visakhapatnam');
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = () => {
    setLoading(true);
    const apiKey = '1635890035cbba097fd5c26c8ea672a1';
    const units = 'metric';

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}&cnt=40`)
      .then(response => response.json())
      .then(data => {
        const processedData = processData(data);
        setForecastData(processedData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      });
  };

  const processData = (data) => {
    const dailyData = {};

    data.list.forEach(item => {
      const date = item.dt_txt.split(' ')[0];
      if (!dailyData[date]) {
        dailyData[date] = {
          date: new Date(item.dt * 1000).toLocaleDateString(),
          weather: item.weather[0].description,
          tempMin: item.main.temp,
          tempMax: item.main.temp,
          pressure: item.main.pressure,
          humidity: item.main.humidity,
        };
      } else {
        if (item.main.temp < dailyData[date].tempMin) {
          dailyData[date].tempMin = item.main.temp;
        }
        if (item.main.temp > dailyData[date].tempMax) {
          dailyData[date].tempMax = item.main.temp;
        }
      }
    });

    return Object.values(dailyData);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSearchClick = () => {
    setForecastData([]);
    setLoading(true);
    fetchWeatherData();
  };

  return (
    <div className="weather-forecast">
      <div className="search-bar">
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city name"
        />
        <button onClick={handleSearchClick}>Search</button>
        {loading && <div className="loader"></div>}
      </div>
      {forecastData.length === 0 && !loading ? (
        <p>Enter a city name and click Search to see the forecast.</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Weather</th>
              <th>Temperature</th>
              <th>Pressure</th>
              <th>Humidity</th>
            </tr>
          </thead>
          <tbody>
            {forecastData.map((dayData, index) => (
              <WeatherCard
                key={index}
                date={dayData.date}
                weather={dayData.weather}
                tempMin={dayData.tempMin}
                tempMax={dayData.tempMax}
                pressure={dayData.pressure}
                humidity={dayData.humidity}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WeatherForecast;
