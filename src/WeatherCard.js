import React from 'react';

const WeatherCard = ({ date, weather, tempMin, tempMax, pressure, humidity }) => {
  return (
    <tr className="weather-card">
      <td>{date}</td>
      <td>{weather}</td>
      <td>{tempMin}°C - {tempMax}°C</td>
      <td>{pressure} hPa</td>
      <td>{humidity}%</td>
    </tr>
  );
};

export default WeatherCard;
