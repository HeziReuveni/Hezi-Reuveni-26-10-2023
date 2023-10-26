import {useState, useEffect} from 'react'
import { ContainerDay, TitleDay } from '../styles/styled'
import WaveBorder from './WaveBorder'
import sunny from '../pages/images/sunny.png'
import winter from '../pages/images/winter.png'
import cloudy from '../pages/images/cloudy.png'
import Zoom from 'react-reveal/Zoom'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../utils/store';
import { convertToFahrenheit, getUserLocation } from '../utils/functions'
import loadingGif from './gifs/loading__.gif'


const TempCardToLocation = () => {
    const [city, setCity] = useState<string>('')
    const [temp, setTemp] = useState<number>()
    const [weather, setWeather] = useState<string>('')
    const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number }>({ latitude: 0, longitude: 0 });
    const [loading, setLoading] = useState<boolean>(true);

    const isBoolean = useSelector((state: RootState) => state.example.isBoolean);
    const dispatch = useDispatch()
      
      useEffect(() => {
        const fetchData = async () => {
            try {
              const location = await getUserLocation();
              setCoordinates(location as { latitude: number; longitude: number });
              setLoading(false);
            } catch (error) {
              console.error('Error:', error);
              setLoading(false);
            }
          };
        fetchData();
      }, []);
    
      useEffect(() => {
        if (!loading && coordinates) {
          const { latitude, longitude } = coordinates;
          const apiKey = 'a60b295f11cdd2eba554239693298462';
          const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
          fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
              if (data && data.name && data.weather && data.weather[0] && data.main) {
                const cityName = data.name;
                const weatherDescription = data.weather[0].description;
                const temperatureKelvin = data.main.temp;
                const temperatureCelsius = Math.floor(temperatureKelvin - 273.15);
                setCity(cityName);
                setWeather(weatherDescription);
                setTemp(temperatureCelsius);
              } else {
                console.error('Invalid or incomplete data in the API response');
              }
            })
            .catch((error) => {
              console.error('Error fetching weather data:', error);
            });
        }
      }, [loading, coordinates]);
      
      

  return (
    <>
    {temp ? 
     <Zoom>
     <ContainerDay
       style={{
         height:"30vh"
       }}
       
       >
         <TitleDay>{city}</TitleDay>
         <WaveBorder upperColor="#001f3f" lowerColor="#DDDDDD" animationNegativeDelay={2} />
         <div
                  style={{
                     display:"flex",
                     alignItems:"center",
                     flexDirection:"column",
                     justifyContent:"center",
                     height:"60%",
                     fontFamily: `'Roboto', sans-serif`,
                     fontWeight:"bold",
                     fontSize:"1.2rem"
                   }}
         >
 <div
 
 style={{
     display:"flex",
     alignItems:"center",
     justifyContent:"space-around",
     height:"60%",
     fontFamily: `'Roboto', sans-serif`,
     fontWeight:"bold",
     width:"100%"
   }}
 >
 {isBoolean && temp !== undefined ? temp + ' °C' : (temp !== undefined ? convertToFahrenheit(temp) : 'Temperature data not available')}
 <div>{weather}</div>
 </div>
  <div
  style={{
     padding:"1rem"
  }}
  >
  {temp && temp > 25 && <img width="50vmin" src={sunny} />}
        {temp && temp > 15 && temp && temp < 25 && (<img width="50vmin" src={cloudy} />)}
        {temp && temp < 15 && <img width="50vmin" src={winter} />}
  </div>
         </div>
       </ContainerDay>
     </Zoom>
     : <img src={loadingGif} width="150vmin"/>
}
   
    </>
  )
}

export default TempCardToLocation
