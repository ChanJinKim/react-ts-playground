import React from 'react';
import api from '../lib/api';

/**
 * TS Weather
 */
export default function TSWeather() {
  console.log('TSWeather - ');

  const fetch = async () => {
    const res = await api.get({
      pathname: '/data/2.5/weather',
      params: {
        units: 'metric',
        lon: '126.98',
        lat: '37.563'
      },
      cache: false
    });
    console.log('res - ', res);
  };

  fetch();

  return (
    <>
      <h1>TS Weather</h1>
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
    </>
  );
}
