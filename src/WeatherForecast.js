import React, { useState, useEffect } from 'react';
import './WeatherForecast.css';
import moment from "moment"

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

  const formatDate = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    console.log(moment(date).format("DD/MM/YYYY"),'date')
    return moment(date).format("DD/MM/YYYY")
  };

  const processData = (data) => {
    const dailyData = {};

    data.list.forEach(item => {
      const date = item.dt_txt.split(' ')[0];
      if (!dailyData[date]) {
        dailyData[date] = {
          date: formatDate(item.dt * 1000),
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
      <div className="table-container">
        {forecastData.map((dayData, index) => (
          <table className="weather-table" key={index}>
            <thead>
              <tr>
                <th colSpan="2">Date: {dayData.date}</th>
              </tr>
            </thead>
            <tbody>

              <tr className={index < 3 ? 'gray-row' : 'white-row'}>
                <td style={{background:"#d5d5d5"}} >Weather</td>
                <td style={{background:"#d5d5d5"}}>{dayData.weather}</td>
              </tr>
              <tr className={index < 3 ? 'gray-row' : 'white-row'}>
                <td style={{background:"#d5d5d5"}} >Temp Min</td>
                <td style={{background:"#d5d5d5"}} >{dayData.tempMin}°C</td>
              </tr>
              <tr className={index < 3 ? 'gray-row' : 'white-row'}>
                <td style={{background:"#d5d5d5"}} >Temp Max</td>
                <td style={{background:"#d5d5d5"}} >{dayData.tempMax}°C</td>
              </tr>




              <tr className={index < 3 ? 'gray-row' : 'white-row'}>
                <td style={{background:"white"}}>Pressure</td>
                <td style={{background:"white"}}>{dayData.pressure} hPa</td>
              </tr>
              <tr className={index < 3 ? 'gray-row' : 'white-row'}>
                <td style={{background:"white"}} >Humidity</td>
                <td style={{background:"white"}}>{dayData.humidity}%</td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
