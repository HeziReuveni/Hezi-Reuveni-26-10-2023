import { useEffect, useState } from 'react';
import { fetchWeather, fetchFiveDayForecast, fetchProducts } from '../apis/weather.api'; 
import { WeatherApiResponse, WeatherData, FiveDayForecast, City } from '../interfaces/types'; 
import Alert from '@mui/material/Alert';

export function useWeatherData(

    
    data: any, 
    setWeatherData: (data: WeatherData | null) => void,
    setFiveDayForecast: (data: FiveDayForecast) => void
    ) {
        
    const [fetchSuccess, setFetchSuccess] = useState<boolean | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if(data[0]){

        fetchWeather(data[0])
          .then((response: WeatherApiResponse) => {
            setWeatherData(response.data[0]);
            setFetchSuccess(true);
          })
          .catch((error: Error) => {
              setFetchSuccess(false);
              setTimeout(() => {
                setFetchSuccess(true);
            },3000)
            setErrorMessage(error.message)
            console.log(error.message)
          });
    }
  }, [data]);

  useEffect(() => {
    if(data[0]){
        fetchFiveDayForecast(data[0])
          .then((response) => {
            const data: FiveDayForecast = response.data;
            setFiveDayForecast(data);
            setFetchSuccess(true);
          })
          .catch((error: Error) => {
            setFetchSuccess(false);
            setTimeout(() => {
                setFetchSuccess(true);
            },3000)
            setErrorMessage(error.message)
            console.log(error.message)
          });
    }
  }, [data]);

  return { fetchSuccess, errorMessage };
}


export function useCitySearch(

  query: string,
  setDisplayLit: (value: boolean) => void,
  setCities: (cities: City[]) => void
) {

const [fetchSuccess, setFetchSuccess] = useState<boolean | null>(null);
const [errorMessage, setErrorMessage] = useState<string | null>(null);


useEffect(() => {
    if (query.trim() !== '') {
      setDisplayLit(false);
      fetchProducts(query)
        .then((response) => {
          setCities(response.data);
          setFetchSuccess(true)
          
        })
        .catch((error: Error) => {
          setFetchSuccess(false)
          setTimeout(() => {
            setFetchSuccess(true);
        },3000)
          setErrorMessage(error.message)
          console.log(error.message)
        });
    } else {
      setCities([]);
    }
  }, [query]);

  return { fetchSuccess, errorMessage };
}
