import React, { useContext, ChangeEvent, MouseEvent } from 'react';
import { useTSWeatherContext } from './TSWeatherContext';

interface TSWeatherHandlerContextValue {
  handleAreaClick(event: MouseEvent<HTMLButtonElement>): void;
  handleAreaDelete(event: MouseEvent): void;
  handleInputAreaChange(event: ChangeEvent): void;
  handleAreaButtonClick(event: MouseEvent): void;
}
interface ChildrenProps {
  children: React.ReactNode;
}

const TSWeatherHandlerContext =
  React.createContext<TSWeatherHandlerContextValue>({
    handleAreaClick: () => {},
    handleAreaDelete: () => {},
    handleInputAreaChange: () => {},
    handleAreaButtonClick: () => {}
  });

/**
 * TSWeather Handler Provider
 * @returns
 */
function TSWeatherHandlerProvider({ children }: ChildrenProps) {
  const {
    areaList,
    selectedArea,
    setSelectedArea,
    setAreaList,
    area,
    setArea
  } = useTSWeatherContext();

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

  return (
    <TSWeatherHandlerContext.Provider
      value={{
        handleAreaClick,
        handleAreaDelete,
        handleInputAreaChange,
        handleAreaButtonClick
      }}
    >
      {children}
    </TSWeatherHandlerContext.Provider>
  );
}

const useTSWeatherHandlerContext = () => useContext(TSWeatherHandlerContext);

export {
  TSWeatherHandlerContext as default,
  TSWeatherHandlerProvider,
  useTSWeatherHandlerContext
};
