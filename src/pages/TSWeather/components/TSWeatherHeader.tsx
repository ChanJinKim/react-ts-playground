import React from 'react';
import { useTSWeatherContext } from '../../../context/TSWeatherContext';

/**
 * TSWeatherHeader
 */
export default function TSWeatherHeader() {
  console.log('TSWeather header - ');
  const { weatherData } = useTSWeatherContext();

  console.log('weatherData - ', weatherData);

  return <h1>TS Weather</h1>;
}
