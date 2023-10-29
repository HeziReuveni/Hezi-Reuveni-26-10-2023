import axios from 'axios';

const apiKey = 'a60b295f11cdd2eba554239693298462';
const weatherApi = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
});

export const fetchWeatherData = async (latitude: number, longitude: number) => {
  try {
    const response = await weatherApi.get('/weather', {
      params: {
        lat: latitude,
        lon: longitude,
        appid: apiKey,
      },
    });

    const data = response.data;

    if (data && data.name && data.weather && data.weather[0] && data.main) {
      const cityName = data.name;
      const weatherDescription = data.weather[0].description;
      const temperatureKelvin = data.main.temp;
      const temperatureCelsius = Math.floor(temperatureKelvin - 273.15);
      return {
        city: cityName,
        weather: weatherDescription,
        temp: temperatureCelsius,
      };
    } else {
      console.error('Invalid or incomplete data in the API response');
      return null;
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};
