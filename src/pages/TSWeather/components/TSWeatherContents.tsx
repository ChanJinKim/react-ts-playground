import React from 'react';
import { useTSWeatherContext } from '../../../context/TSWeatherContext';
import { useTSWeatherHandlerContext } from '../../../context/TSWeatherHandlerContext';

/**
 * TSWeatherContents
 */
export default function TSWeatherContents() {
  const { weatherData, areaList, selectedArea, area } = useTSWeatherContext();
  const {
    handleAreaClick,
    handleAreaDelete,
    handleInputAreaChange,
    handleAreaButtonClick
  } = useTSWeatherHandlerContext();

  const areaTitle = selectedArea?.title || '';

  return (
    <>
      <h4>지역 추가</h4>
      <input name="area" value={area} onChange={handleInputAreaChange} />
      <button onClick={handleAreaButtonClick}>추가</button>

      <h4>지역 목록</h4>
      <ul>
        {areaList.map(({ idx, title, query }) => (
          <li key={idx}>
            <button
              data-idx={idx}
              data-query={query}
              data-title={title}
              onClick={handleAreaClick}
            >
              {title}
            </button>
            <button
              data-idx={idx}
              data-title={title}
              onClick={handleAreaDelete}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
      <h4>{areaTitle}</h4>
      {weatherData?.id && (
        <ul>
          <li>
            coord
            <ul>
              <li>lon : {weatherData.coord.lon}</li>
              <li>lat : {weatherData.coord.lat}</li>
            </ul>
          </li>
          <li>
            main
            <ul>
              <li>feels_like : {weatherData.main.feels_like}</li>
              <li>humidity : {weatherData.main.humidity}</li>
              <li>pressure : {weatherData.main.pressure}</li>
              <li>temp : {weatherData.main.temp}</li>
              <li>temp_max : {weatherData.main.temp_max}</li>
              <li>temp_min : {weatherData.main.temp_min}</li>
            </ul>
          </li>
          <li>
            wind
            <ul>
              <li>speed : {weatherData.wind.speed}</li>
              <li>deg : {weatherData.wind.deg}</li>
            </ul>
          </li>
          <li>
            weather
            <ul>
              {weatherData.weather?.map((item: any) => (
                <li key={item.id}>
                  {item.id}
                  <ul>
                    <li>{item.description}</li>
                    <li>{item.icon}</li>
                    <li>{item.main}</li>
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      )}
    </>
  );
}
