import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { useTSWeatherContext } from '../../../context/TSWeatherContext';

/**
 * TSWeatherContents
 */
export default function TSWeatherContents() {
  const { weatherData, areaList, selectedArea, setSelectedArea, setAreaList } =
    useTSWeatherContext();
  const [area, setArea] = useState('');

  // console.log('weatherData - ', weatherData);
  // console.log('areaList - ', areaList);
  // console.log('selectedArea - ', selectedArea);

  // 기능 :
  // - 지역 리스트는 hard coding
  //     지역이름, 좌표값
  // - 페이지 랜딩시 현 시간, 특정 지역 날씨 정보 보여주기
  // - 랜딩페이지 -> 지역 리스트 클릭 했을 때 날씨 정보 갱신
  // - 지역 추가
  //     각자의 방식으로 저장
  // - 지역 삭제

  /**
   * 지역 날씨 검색
   * @param event
   */
  const handleAreaClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { idx, title, query } = event.currentTarget.dataset;
    if (idx && title && query) {
      setSelectedArea({
        idx: parseInt(idx),
        title,
        query
      });
    }
  };

  /**
   * 지역 삭제
   * @param event
   */
  const handleAreaDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { idx, title } = event.currentTarget.dataset;
    const filterList = areaList.filter(
      item => item.idx !== parseInt(idx as string)
    );
    if (filterList.length === 0) {
      alert('1개 남아서 삭제 불가');
      return;
    }
    setAreaList(filterList);

    // 현재 선택된 날씨라면 선택된 날씨를 다른 것으로 변경해 준다.
    if (selectedArea?.title === title) {
      setSelectedArea(filterList[0]);
    }
  };

  /**
   * 지역 추가 input
   * @param event
   */
  const handleInputAreaChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setArea(event.target.value);
  };

  /**
   * 지역 추가 button
   * @param event
   */
  const handleAreaButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setAreaList(prev => {
      const lastItem = prev[prev.length - 1];
      return [
        ...prev,
        { idx: Number(lastItem?.idx) + 1, title: area, query: area }
      ];
    });
  };

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
