import React from 'react';
import { useTSWeatherContext } from '../../../context/TSWeatherContext';

/**
 * TSWeatherContents
 */
export default function TSWeatherContents() {
  console.log('TSWeather header - ');
  const { weatherData, areaList, selectedArea } = useTSWeatherContext();

  console.log('weatherData - ', weatherData);
  console.log('areaList - ', areaList);
  console.log('selectedArea - ', selectedArea);

  // 기능 :
  // - 지역 리스트는 hard coding
  //     지역이름, 좌표값
  // - 페이지 랜딩시 현 시간, 특정 지역 날씨 정보 보여주기
  // - 랜딩페이지 -> 지역 리스트 클릭 했을 때 날씨 정보 갱신
  // - 지역 추가
  //     각자의 방식으로 저장
  // - 지역 삭제

  return (
    <>
      <h4>area list</h4>
      <ul>
        {areaList.map(({ idx, title, lon, lat }) => (
          <li key={idx}>
            <button data-idx={idx} data-lon={lon} data-lat={lat}>
              {title}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
