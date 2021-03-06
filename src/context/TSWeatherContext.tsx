import React, { useEffect, useState, useContext } from 'react';
import api from '../lib/api';

interface AreaItem {
  idx: number;
  title: string;
  query: string;
  lon?: string;
  lat?: string;
}

const getAreaList = (): AreaItem[] => {
  return [
    {
      idx: 0,
      title: '서울',
      query: 'seoul',
      lon: '126.98',
      lat: '37.563'
    },
    {
      idx: 1,
      title: '부산',
      query: 'busan',
      lon: '129.076',
      lat: '35.177'
    },
    {
      idx: 2,
      title: '대구',
      query: 'daegu',
      lon: '128.608',
      lat: '35.867'
    }
  ];
};
interface TSWeatherContextValue {
  weatherData: any;
  areaList: AreaItem[];
  selectedArea: AreaItem | null;
  setSelectedArea: React.Dispatch<React.SetStateAction<AreaItem>>;
  setAreaList: React.Dispatch<React.SetStateAction<AreaItem[]>>;
  area: string;
  setArea: React.Dispatch<React.SetStateAction<string>>;
}
interface ChildrenProps {
  children: React.ReactNode;
}

const TSWeatherContext = React.createContext<TSWeatherContextValue>({
  weatherData: {},
  areaList: [],
  selectedArea: null,
  setSelectedArea: () => {},
  setAreaList: () => {},
  area: '',
  setArea: () => {}
});

/**
 * TSWeather State Provider
 * @returns
 */
function TSWeatherProvider({ children }: ChildrenProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState({});
  const [areaList, setAreaList] = useState(getAreaList());
  const [selectedArea, setSelectedArea] = useState<AreaItem>(areaList[0]);
  const [area, setArea] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get({
          pathname: '/data/2.5/weather',
          params: {
            units: 'metric',
            q: selectedArea.query,
            lon: selectedArea.lon,
            lat: selectedArea.lat
          },
          cache: false
        });
        console.log('res - ', res);
        setData(res);
      } catch (error) {
        console.log('fetch error - ', error);
      } finally {
        setIsLoaded(true);
      }
    };

    fetch();
  }, [selectedArea]);

  return (
    <>
      {isLoaded === true && (
        <TSWeatherContext.Provider
          value={{
            weatherData: data,
            areaList,
            setAreaList,
            selectedArea,
            setSelectedArea,
            area,
            setArea
          }}
        >
          {children}
        </TSWeatherContext.Provider>
      )}
    </>
  );
}

const useTSWeatherContext = () => useContext(TSWeatherContext);

export { TSWeatherContext as default, TSWeatherProvider, useTSWeatherContext };
