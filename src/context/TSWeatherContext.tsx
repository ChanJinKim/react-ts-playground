import react, { useEffect, useState, useContext } from 'react';
import api from '../lib/api';

interface ChildrenProps {
  children: React.ReactNode;
}

const TSWeatherContext = react.createContext({});

function TSWeatherProvider({ children }: ChildrenProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetch = async () => {
      try {
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
        setData(res);
      } catch (error) {
        console.log('fetch error - ', error);
      } finally {
        setIsLoaded(true);
      }
    };

    fetch();
  }, []);

  return (
    <>
      {isLoaded === true && (
        <TSWeatherContext.Provider
          value={{
            weatherData: data
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
