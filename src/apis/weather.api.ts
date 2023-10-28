import { axiosInstance } from "./index"

interface City {
    Key: string;
    LocalizedName: string;
  }

  interface WeatherData {
    Temperature: {
      Metric: {
        Value: number;
      };
    };
    WeatherText: string;
  }

const Key = 'e6Y9ql2Wvup64cNKIph2gNP1cWNnqfDO12';


export const fetchProducts = async (query:string) => {
    return await axiosInstance.get<City[]>("/locations/v1/cities/autocomplete", {
      params: {
        apikey: Key,
        q: query, 
      }
    });
  };

  export const fetchWeather = async (cityKey: string) => {
    return await axiosInstance.get<WeatherData[]>('/currentconditions/v1/' + cityKey, {
      params: {
        apikey: Key,
      },
    });
  };

  export const fetchFiveDayForecast = async (locationKey: string) => {
    return await axiosInstance.get(`/forecasts/v1/daily/5day/${locationKey}`, {
      params: {
        apikey: Key,
      },
    });
  };
  
  export const getLocationKeyForCoordinates = async (latitude : number, longitude : number) => {
    return await axiosInstance.get(`/locations/v1/cities/geoposition/search`, {
      params: {
        apikey: Key,
        q: `${latitude},${longitude}`,
      },
    });
  };
