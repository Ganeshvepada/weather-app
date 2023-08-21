import React from 'react';
import WeatherForecast from './WeatherForecast';
import './App.css'; // Import your CSS file for styling

const App = () => {
  return (
    <div className="app">
      <header>
        <h1>Weather Forecast App</h1>
      </header>
      <main>
        <WeatherForecast />
      </main>
      <footer>
        <p>&copy; this is view in browser i set default as visakhapatnam</p>
      </footer>
    </div>
  );
};

export default App;
