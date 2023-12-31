import {  useState } from 'react';
import {  fetchWeather, fetchFiveDayForecast } from '../apis/weather.api';
import { City, WeatherApiResponse, WeatherData, FiveDayForecast } from '../interfaces/types';
import { ContainerHomePage, ContainerFiveDays, BottomLeftButton, ContainerDay, TitleDay, ContentDay } from '../styles/styled';
import Arrow from '../components/Arrow';
import { Input, InputAdornment,  List, ListItem, ListItemText } from '@mui/material'
import {BsSearch} from 'react-icons/bs'
import {TbTemperatureFahrenheit, TbTemperatureCelsius} from 'react-icons/tb'
import FavoriteButton from '../components/FavoriteButton';
import { getDayOfWeek, getAverageTempForDay, celsiusToFahrenheit,convertToFahrenheit } from '../utils/functions';
import WaveBorder from '../components/WaveBorder';
import sunny from './images/sunny.png'
import winter from './images/winter.png'
import cloudy from './images/cloudy.png'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../utils/store';
import { useWeatherData, useCitySearch } from '../hooks/useWeatherEffects'; 
import Alert from '@mui/material/Alert';
import Shake from 'react-reveal/Shake';
import TempCardToLocation from '../components/TempCardToLocation';
import Fade from 'react-reveal/Fade';
import {setIsBoolean } from '../utils/store'



function Home(): JSX.Element {
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [fiveDayForecast, setFiveDayForecast] = useState<FiveDayForecast | null>(null);
  const [query, setQuery] = useState<string>('');
  const [displayList, setDisplayLit] = useState<boolean>(false)
  const data = useSelector((state: RootState) => state.example.data);
  const dispatch = useDispatch();
  const [inEnglish, setInEnglish] = useState<boolean>(true)
  const isBoolean = useSelector((state: RootState) => state.example.isBoolean);


  const responseUseWeatherData = useWeatherData(data, setWeatherData, setFiveDayForecast);
  const responseUseCitySearch = useCitySearch(query, setDisplayLit, setCities);

  const handleCityClick = (cityKey: string) => {
    if(cityKey){
      setDisplayLit(true)
      console.log(cityKey)
    }
    setSelectedCity(cityKey); 
    fetchWeather(cityKey) 
      .then((response: WeatherApiResponse) => {
        setWeatherData(response.data[0]);
        
      })
      .catch((error: Error) => {
        console.error('Error fetching weather data:', error);
      });
    fetchFiveDayForecast(cityKey)
    .then((response) => {
      const data: FiveDayForecast = response.data; 
      setFiveDayForecast(data);
    })
    .catch((error: Error) => {
      console.error('Error fetching 5-day forecast:', error);
    });
  };

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[a-zA-Z]*$/.test(value)) {
      setQuery(value);
    }
    else{
      setInEnglish(false)
    }
  };

  const handleToggleButtonClick = () => {
    dispatch(setIsBoolean(!isBoolean));
  };

  return (
    <ContainerHomePage>
      {responseUseWeatherData.fetchSuccess === false &&
<Shake>

  <Alert 
  severity="error">{responseUseWeatherData.errorMessage}</Alert>
</Shake>
       }
             {responseUseCitySearch.fetchSuccess === false &&
<Shake>

  <Alert severity="error">{responseUseCitySearch.errorMessage}</Alert>
</Shake>
       }
      {displayList && <Arrow/>}
      <BottomLeftButton onClick={handleToggleButtonClick}>
        {isBoolean ? <TbTemperatureFahrenheit/> : <TbTemperatureCelsius/>}
        </BottomLeftButton>
<Fade top>
<Input
      style={{
        width:"70vmin",
        marginTop:"2rem",
        marginBottom:"2rem"
      }}
            id="standard-adornment-amount"
            placeholder={inEnglish ? 'Enter the city name (In English)' : 'Enter English only'}
            type="text"
            value={query}
            onChange={handleInputChange}
            startAdornment={<InputAdornment position="start"><BsSearch/></InputAdornment>}
          />
</Fade>
{!displayList && <List
style={{
  width:"55%"
}}
>
  {cities.map((city) => (
    <ListItem 
    style={{
      cursor:"pointer",
      
    }}
    key={city.Key}  onClick={() => handleCityClick(city.Key)}>
      <ListItemText primary={city.LocalizedName} />
    </ListItem>
  ))}
</List>}

<div
style={{
  display:"flex",
  alignItems:"center",
  justifyContent:"space-around"
}}
>
{!weatherData && <TempCardToLocation/>}
{weatherData && (
  <Fade>
  <div>
  <ContainerDay
  style={{
    width: displayList ? '45vmin' : '60vmin',
    marginTop:"1rem",
    height:"35vh"
        }}
        >
          <TitleDay
          style={{
            fontSize: displayList ? "1rem" : "1.2rem"
      
          }}
          >
          {!data[1] ? <h2> {cities.find((city) => city.Key === selectedCity)?.LocalizedName}</h2> : data[1]}
          </TitleDay>
          <WaveBorder upperColor="#001f3f" lowerColor="#DDDDDD" animationNegativeDelay={2} />
          <div
          style={{
            display:"flex",
            alignItems:"center",
            flexDirection:"column",
            justifyContent:"center",
            fontFamily: `'Roboto', sans-serif`,
            fontWeight:"bold",
            fontSize: displayList ? "1rem" : "1.2rem"
          }}
          >

<div
style={{
  display:"flex",
  alignItems:"center",
  justifyContent:"space-around",
  height:"90%",
  fontFamily: `'Roboto', sans-serif`,
  fontWeight:"bold",
  width:"100%"
}}

>

{!isBoolean ? (
  <p>{convertToFahrenheit(weatherData.Temperature.Metric.Value)}</p>
) : !data[2] ? (
  <p>{weatherData.Temperature.Metric.Value}°C</p>
) : (
  data[2]
)}
          <p>{weatherData.WeatherText}</p>
          </div>
          <div
          >
          {(weatherData.Temperature.Metric.Value) > 25 && <img width="50vmin" src={sunny} />}
       {(weatherData.Temperature.Metric.Value) > 15 && (weatherData.Temperature.Metric.Value) < 25 && (<img width="50vmin" src={cloudy} />)}
       {(weatherData.Temperature.Metric.Value) < 15 && <img width="50vmin" src={winter} />}
          </div>
          </div>
        </ContainerDay>
        </div>
        </Fade>
      )}
      <div

      >
{displayList && selectedCity && weatherData && (
  <Fade>

    <FavoriteButton
      cityKey={selectedCity!}
      cityData={{
        name: cities.find((city) => city.Key === selectedCity)?.LocalizedName || '',
        temperature: weatherData?.Temperature.Metric.Value + '°C' || '',
        weatherCondition: weatherData?.WeatherText || '',
      }}
    />
  </Fade>
)}
      </div>
      
</div>
{fiveDayForecast && (
  <div
  style={{
    textAlign:"center",
    fontFamily:"sans-serif"
  }}
  >
   <h2

   > {!data[1] ? <h2>  {cities.find((city) => city.Key === selectedCity)?.LocalizedName}</h2> : data[1]}</h2> 
    <p>{fiveDayForecast.Headline?.Text}</p>
    <div
    >
<ContainerFiveDays>
  {fiveDayForecast.DailyForecasts.map((forecast, index) => (
    <ContainerDay 
    key={index}>
      <TitleDay>{getDayOfWeek(forecast.Date)}</TitleDay>
      <WaveBorder upperColor="#001f3f" lowerColor="#DDDDDD" animationNegativeDelay={2} />
      <ContentDay>
  {isBoolean ? getAverageTempForDay(forecast.Temperature.Maximum.Value, forecast.Temperature.Minimum.Value) :
    celsiusToFahrenheit(forecast.Temperature.Maximum.Value, forecast.Temperature.Minimum.Value)
  }
  {parseFloat(getAverageTempForDay(forecast.Temperature.Maximum.Value, forecast.Temperature.Minimum.Value)) > 25 ?
    <img src={sunny} width="50vmin" alt="Sunny" /> :
    (parseFloat(getAverageTempForDay(forecast.Temperature.Maximum.Value, forecast.Temperature.Minimum.Value)) >= 15 ?
      <img src={cloudy} width="50vmin" alt="Cloudy" /> :
      <img src={winter} width="50vmin" alt="Winter" />
    )
  }
</ContentDay>

    </ContainerDay>
  ))}
</ContainerFiveDays>


    </div>
  </div>
)}
    </ContainerHomePage>
  );
}

export default Home;

