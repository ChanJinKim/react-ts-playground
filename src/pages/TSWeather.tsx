import React from 'react';
import { TSWeatherProvider } from '../context/TSWeatherContext';
import TSWeatherHeader from './TSWeather/components/TSWeatherHeader';
import TSWeatherContents from './TSWeather/components/TSWeatherContents';

/**
 * TS Weather
 */
export default function TSWeather() {
  return (
    <TSWeatherProvider>
      <TSWeatherHeader />
      <TSWeatherContents />
    </TSWeatherProvider>
  );
}
