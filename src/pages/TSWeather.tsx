import React from 'react';
import { TSWeatherProvider } from '../context/TSWeatherContext';
import TSWeatherHeader from './TSWeather/components/TSWeatherHeader';

/**
 * TS Weather
 */
export default function TSWeather() {
  console.log('TSWeather - ');

  return (
    <TSWeatherProvider>
      <TSWeatherHeader />
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
    </TSWeatherProvider>
  );
}
