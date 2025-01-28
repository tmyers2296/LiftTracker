import React, { useEffect, useState } from "react";

// Define the type for the forecast
interface WeatherForecast {
  date: string; // Date will come as a string from the API
  temperatureC: number;
  temperatureF: number;
  summary: string | null;
}

const WeatherApp: React.FC = () => {
  const [forecast, setForecast] = useState<WeatherForecast[]>([]);

  useEffect(() => {
    fetch("http://localhost:5119/weatherforecast") // Adjust port if necessary
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: WeatherForecast[]) => setForecast(data))
      .catch((error) =>
        console.error("Error fetching weather forecast:", error)
      );
  }, []);

  return (
    <div>
      <h1>Weather Forecast</h1>
      <ul>
        {forecast.map((item, index) => (
          <li key={index}>
            {item.date}: {item.temperatureC}°C ({item.temperatureF}°F) -{" "}
            {item.summary}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeatherApp;
