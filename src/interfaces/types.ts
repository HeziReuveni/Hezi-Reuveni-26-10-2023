

export interface City {
    Key: string;
    LocalizedName: string;
  }
  
  export interface WeatherApiResponse {
    data: WeatherData[];
  }
  
  export interface WeatherData {
    Temperature: {
      Metric: {
        Value: number;
      };
    };
    WeatherText: string;
  }
  
  export interface FiveDayForecast {
    Headline: {
      Text: string;
    };
    DailyForecasts: {
      Date: string;
      Temperature: {
        Minimum: {
          Value: number;
        };
        Maximum: {
          Value: number;
        };
      };
      Day: {
        Icon: number;
        IconPhrase: string;
      };
      Night: {
        Icon: number;
        IconPhrase: string;
      };
    }[];
  }
  
  export interface CityData {
    name: string;
    temperature: string;
    weatherCondition: string;
  }
  